
```java
ReactInstanceManagerImpl.builder

ReactRootView.startReactApplication

ReactInstanceManagerImpl.createReactContextInBackground

    1. recreateReactContextInBackgroundInner

    2. recreateReactContextInBackgroundFromBundleFile

       1. recreateReactContextInBackground(JavaScriptExecutor.Factory jsExecutorFactory,JSBundleLoader jsBundleLoader)

           jsExecutorFactory: new JSCJavaScriptExecutor.Factory()
           jsBundleLoader: JSBundleLoader.createFileLoader

       2. ReactContextInitAsyncTask.execute  读取JSBundle文件

       3. ReactContextInitAsyncTask.createReactContext(JavaScriptExecutor jsExecutor,JSBundleLoader jsBundleLoader)

            1. private ReactApplicationContext createReactContext(JavaScriptExecutor jsExecutor, JSBundleLoader jsBundleLoader) {

               NativeModuleRegistry.Builder nativeRegistryBuilder = new NativeModuleRegistry.Builder();
               JavaScriptModuleRegistry.Builder jsModulesBuilder = new JavaScriptModuleRegistry.Builder();


               // 注册CoreModulesPackage
               // Package defining core framework modules (e.g. UIManager). It should be used for modules that require special integration with other framework parts
               ReactInstanceManagerImpl.processPackage(coreModulesPackage, reactContext, nativeRegistryBuilder, jsModulesBuilder);

                    1. createNativeModules

                    2. createJSModules

               // 注册ReactPackage
               ReactInstanceManagerImpl.processPackage(reactPackage, reactContext, nativeRegistryBuilder, jsModulesBuilder);

               NativeModuleRegistry.build

               CatalystInstanceImpl.build

                    1. ReactQueueConfigurationImpl.create

                          MessageQueueThreadImpl mUIQueueThread;
                          MessageQueueThreadImpl mNativeModulesQueueThread;
                          MessageQueueThreadImpl mJSQueueThread;

                    2. initializeBridge

                            初始化：ReactBridge

                            JNI调用： native void initialize(JavaScriptExecutor jsExecutor,ReactCallback callback, MessageQueueThread nativeModulesQueueThread);

                                     OnLoad.cpp: java 调用 native 接口实现

                                     JSLoader.cpp 从asset和file bundle内容

                            回调：CatalystInstanceImpl.NativeModulesReactCallback implements ReactCallback

                                public void call(ExecutorToken executorToken, int moduleId, int methodId, ReadableNativeArray parameters)

                                     1. CatalystInstanceImpl.this.mJavaRegistry.call(CatalystInstanceImpl.this, executorToken, moduleId, methodId, parameters)

                                     2. NativeModuleRegistry.ModuleDefinition.call(catalystInstance, executorToken, methodId, parameters)

                                     3. ((NativeModuleRegistry.MethodRegistration)this.methods.get(methodId)).method.invoke(catalystInstance, executorToken, parameters);

                                public void onBatchComplete()

                                     1. CatalystInstanceImpl.this.mJavaRegistry.onBatchComplete();

                                     2. NativeModuleRegistry.onBatchComplete() {
                                                for(int i = 0; i < this.mBatchCompleteListenerModules.size(); ++i) {
                                                    ((OnBatchCompleteListener)this.mBatchCompleteListenerModules.get(i)).onBatchComplete();
                                                }

                                        }

                                        mBatchCompleteListenerModules:

                                        public class NativeAnimatedModule extends ReactContextBaseJavaModule implements OnBatchCompleteListener, LifecycleEventListener

                                        public class UIManagerModule extends ReactContextBaseJavaModule implements OnBatchCompleteListener, LifecycleEventListener


                    3. buildModulesConfigJSONProperty: remoteModuleConfig

                    4. NativeModuleRegistry.writeModuleDescriptions

                    5. fbBatchedBridgeConfig 和 RCTProfileIsProfiling 全局JS变量 （ReactBridge）

                    6. notifyReactBridgeInitialized
               }

               2. CatalystInstanceImpl.getReactQueueConfiguration().getJSQueueThread().callOnQueue

               3. CatalystInstanceImpl.getJSQueueThread().callOnQueue.runJSBundle(); --JS bundle was already loaded

                    JSBundleLoader.loadScript(ReactBridge)

                    ReactApplicationContext.initializeWithInstance(CatalystInstanceImpl)

                    JNI:

                        ReactBridge.java -> OnLoad.cpp(node_modules/react-native/ReactAndroid/src/main/jni/react/jni/OnLoad.cpp)

       4. ReactContextInitAsyncTask.setupReactContext

            1. CatalystInstanceImpl.initialize();

            2. void attachMeasuredRootViewToInstance(ReactRootView rootView, CatalystInstance catalystInstance)

            3.  ((AppRegistry)catalystInstance.getJSModule(AppRegistry.class)).runApplication(jsAppModuleName, appParams);
```

### loadScript 流程

1. CatalystInstanceImpl.getJSQueueThread().callOnQueue.runJSBundle();

2. CatalystInstanceImpl.java:JSBundleLoader.loadScript(ReactBridge)

3. ReactBridge.java:public native void loadScriptFromFile(@Nullable String var1, @Nullable String var2);

4. OnLoad.cpp: static void loadScriptFromFile(JNIEnv* env, jobject obj, jstring fileName, jstring sourceURL)

5. OnLoad.cpp: static void loadApplicationScript(const RefPtr<CountableBridge>& bridge,const std::string& script,const std::string& sourceUri)

6. Bridge.cpp:void Bridge::loadApplicationScript(const std::string& script, const std::string& sourceURL)

7. JSCExecutor.cpp:void JSCExecutor::loadApplicationScript(const std::string& script,const std::string& sourceURL)

8. JSCHelper.cpp:JSValueRef evaluateScript(JSContextRef context, JSStringRef script, JSStringRef source)


### Native调用JS getJSModule详细流程说明

#### java调用简要说明：

1. JavaScriptModuleRegistry.JavaScriptModuleInvocationHandler.invoke 中调用CatalystInstanceImpl.callFunction

2. CatalystInstanceImpl调用 ReactBridge.callFunction

3. ReactBridge.callFunction 调用 JNI

#### java调用详细说明：


---com/facebook/react/bridge/CatalystInstanceImpl.java

catalystInstance.getJSModule(AppRegistry.class).runApplication('SmartDebugReactApp', appParams);

@Override
public <T extends JavaScriptModule> T getJSModule(ExecutorToken executorToken, Class<T> jsInterface) {
 return Assertions.assertNotNull(mJSModuleRegistry).getJavaScriptModule(this, executorToken, jsInterface);
}


---com/facebook/react/bridge/JavaScriptModuleRegistry.java

Proxy.newProxyInstance()方法有三个参数：

1. 类加载器(Class Loader)

2. 需要实现的接口数组

3. InvocationHandler接口。所有动态代理类的方法调用，都会交由InvocationHandler接口实现类里的invoke()方法去处理。这是动态代理的关键所在。

```java
(JavaScriptModule)Proxy.newProxyInstance(moduleInterface.getClassLoader(), new Class[]{moduleInterface},

new JavaScriptModuleRegistry.JavaScriptModuleInvocationHandler(executorToken, instance, registration));

private static class JavaScriptModuleInvocationHandler implements InvocationHandler {
    @Nullable
    public Object invoke(Object proxy, Method method, @Nullable Object[] args) throws Throwable {
        ExecutorToken executorToken = (ExecutorToken)this.mExecutorToken.get();
        if(executorToken == null) {
            FLog.w("React", "Dropping JS call, ExecutorToken went away...");
            return null;
        } else {
            String tracingName = this.mModuleRegistration.getTracingName(method);
            WritableNativeArray jsArgs = args != null?Arguments.fromJavaArgs(args):new WritableNativeArray();
            this.mCatalystInstance.callFunction(executorToken, this.mModuleRegistration.getName(), method.getName(), jsArgs, tracingName);
            return null;
        }
    }
}
```


#### callFunction JNI调用流程详细流程:

1. OnLoad.cpp:

static void callFunction(JNIEnv* env, jobject obj, JExecutorToken::jhybridobject jExecutorToken, jstring module, jstring method,


2. Bridge.cpp

void Bridge::callFunction(ExecutorToken executorToken,const std::string& moduleId,const std::string& methodId,const folly::dynamic& arguments,const std::string& tracingName)


3. JSCExecutor.cpp

    1. void JSCExecutor::callFunction(const std::string& moduleId, const std::string& methodId, const folly::dynamic& arguments)

    // 确保fbBatchedBridge 有定义
    2. bool JSCExecutor::ensureBatchedBridgeObject()

    // 执行fbBatchedBridge中js方法

    3. void JSCExecutor::callFunction(const std::string& moduleId, const std::string& methodId, const folly::dynamic& arguments) {

    4. 执行js  fbBatchedBridge.callFunctionReturnFlushedQueue 返回queue队列

    5. 执行Bridge.cpp : void Bridge::callNativeModules(JSExecutor& executor, const std::string& callJSON, bool isEndOfBatch)

    6. 执行 m_callback->onCallNativeModules(getTokenForExecutor(executor), callJSON, isEndOfBatch);

        m_callback 为OnLoad.cpp 中的 class PlatformBridgeCallback : public BridgeCallback

        相当于执行 PlatformBridgeCallback.onCallNativeModules

    7. 最后调用 makeJavaCall方法调用java方法





### JS-N: nativeCall  MessageQueue queue队列

####  JS调用Native流程

例如：NativeModules.RNIntentModule.finishActivity('我是来自React Native的消息');

1. BatchedBridge, MessageQueue, NativeModules初始化

  MessageQueue定义RemoteModules对象

  function MessageQueue(configProvider) {
    lazyProperty(this, 'RemoteModules', function () {
      var _configProvider =configProvider();
      var remoteModuleConfig = _configProvider.remoteModuleConfig;
      var modulesConfig = this._genModulesConfig(remoteModuleConfig);
      // 初始化所有JS调用Native模块
      var modules = this._genModules(modulesConfig);
      return modules;
    });
  }

  var BatchedBridge = new MessageQueue(function () {return global.__fbBatchedBridgeConfig;});

   __fbBatchedBridgeConfig 由Native层注入的全局对象，数据格式如下,包含remoteModuleConfig节点：

  {
    "remoteModuleConfig": {
    "FrescoModule": {
      "moduleID": 0,
        "supportsWebWorkers": false,
        "methods": {}
    },
    "RNIntentModule": {
      "moduleID": 1,
        "supportsWebWorkers": false,
        "methods": {
        "openThirdReactActivity": {
          "methodID": 0,
            "type": "remote"
        },
        "openSecondReactActivity": {
          "methodID": 1,
            "type": "remote"
        },
        "getDataFromIntent": {
          "methodID": 2,
            "type": "remote"
        },
        "finishActivity": {
          "methodID": 3,
            "type": "remote"
        },
        "backActivity": {
          "methodID": 4,
            "type": "remote"
        },
        "openSecondActivity": {
          "methodID": 5,
            "type": "remote"
        }
      }
    }
  }

  define(60 /* NativeModules */, function (global, require, module, exports) {

    'use strict';

    var BatchedBridge = require(61 /* BatchedBridge */);
    var RemoteModules = BatchedBridge.RemoteModules;

    function normalizePrefix(moduleName) {
      return moduleName.replace(/^(RCT|RK)/, '');
    }

    Object.keys(RemoteModules).forEach(function (moduleName) {
      var strippedName = normalizePrefix(moduleName);
      if (RemoteModules['RCT' + strippedName] && RemoteModules['RK' + strippedName]) {
        throw new Error(
          'Module cannot be registered as both RCT and RK: ' + moduleName);

      }
      if (strippedName !== moduleName) {
        RemoteModules[strippedName] = RemoteModules[moduleName];
        delete RemoteModules[moduleName];
      }
    });


    var NativeModules = {};
    Object.keys(RemoteModules).forEach(function (moduleName) {
      Object.defineProperty(NativeModules, moduleName, {
        configurable: true,
        enumerable: true,
        get: function get() {
          var module = RemoteModules[moduleName];
          if (module && typeof module.moduleID === 'number' && global.nativeRequireModuleConfig) {
            var json = global.nativeRequireModuleConfig(moduleName);
            var config = json && JSON.parse(json);
            module = config && BatchedBridge.processModuleConfig(config, module.moduleID);
            RemoteModules[moduleName] = module;
          }
          Object.defineProperty(NativeModules, moduleName, {
            configurable: true,
            enumerable: true,
            value: module
          });

          return module;
        }
      });

    });

    module.exports = NativeModules;
  }, "NativeModules");


3. _genModules 调用 _genModule

function _genModules(remoteModules) {
  var _this5 = this;
  var modules = {};

  remoteModules.forEach(function (config, moduleID) {
    var info = _this5._genModule(config, moduleID);
    if (info) {
      modules[info.name] = info.module;
    }
  });

  return modules;
}  

4. _genModule 调用 _genMethod

function _genModule(config, moduleID) {
    module[methodName] = _this6._genMethod(moduleID, methodID, methodType);
    return { name: moduleName, module: module };
}

5. _genMethod 调用  __nativeCall  返回 Promise或function

function _genMethod 调用 (module, method, type) {

  var fn = null;
  var self = this;
  if (type === MethodTypes.remoteAsync) {
    fn = function fn() {
      for (var _len = arguments.length, args = Array(_len), _key = 0; _key < _len; _key++) {
        args[_key] = arguments[_key];
      }
      return new Promise(function (resolve, reject) {
        self.__nativeCall(
          module,
          method,
          args,
          function (data) {
            resolve(data);
          },
          function (errorData) {
            var error = createErrorFromErrorData(errorData);
            reject(error);
          });
      });
    };
  } else if (type === MethodTypes.syncHook) {
    return function () {
      for (var _len2 = arguments.length, args = Array(_len2), _key2 = 0; _key2 < _len2; _key2++) {
        args[_key2] = arguments[_key2];
      }
      return global.nativeCallSyncHook(module, method, args);
    };
  } else {
    fn = function fn() {
      for (var _len3 = arguments.length, args = Array(_len3), _key3 = 0; _key3 < _len3; _key3++) {
        args[_key3] = arguments[_key3];
      }
      var lastArg = args.length > 0 ? args[args.length - 1] : null;
      var secondLastArg = args.length > 1 ? args[args.length - 2] : null;
      var hasSuccCB = typeof lastArg === 'function';
      var hasErrorCB = typeof secondLastArg === 'function';
      hasErrorCB && invariant(
        hasSuccCB,
        'Cannot have a non-function arg after a function arg.');

      var numCBs = hasSuccCB + hasErrorCB;
      var onSucc = hasSuccCB ? lastArg : null;
      var onFail = hasErrorCB ? secondLastArg : null;
      args = args.slice(0, args.length - numCBs);
      return self.__nativeCall(module, method, args, onFail, onSucc);
    };
  }
  fn.type = type;
  return fn;
}

6. function __nativeCall(module, method, params, onFail, onSucc) {
  this._queue[MODULE_IDS].push(module);
  this._queue[METHOD_IDS].push(method);
  this._queue[PARAMS].push(params);

  var now = new Date().getTime();
  if (global.nativeFlushQueueImmediate &&
  now - this._lastFlush >= MIN_TIME_BETWEEN_FLUSHES_MS) {
      global.nativeFlushQueueImmediate(this._queue);
      this._queue = [[], [], [], this._callID];
      this._lastFlush = now;
  }
}

7. JSCExecutor.cpp 通过installGlobalFunction 定义 nativeFlushQueueImmediate方法

m_context = JSGlobalContextCreateInGroup(nullptr, nullptr);
s_globalContextRefToJSCExecutor[m_context] = this;
installGlobalFunction(m_context, "nativeFlushQueueImmediate", nativeFlushQueueImmediate);
installGlobalFunction(m_context, "nativePerformanceNow", nativePerformanceNow);
installGlobalFunction(m_context, "nativeStartWorker", nativeStartWorker);
installGlobalFunction(m_context, "nativePostMessageToWorker", nativePostMessageToWorker);
installGlobalFunction(m_context, "nativeTerminateWorker", nativeTerminateWorker);
installGlobalFunction(m_context, "nativeInjectHMRUpdate", nativeInjectHMRUpdate);
```

8. nativeFlushQueueImmediate 获取 JS队列数据执行Native调用：
JSValueRef JSCExecutor::nativeFlushQueueImmediate(
    JSContextRef ctx,
    JSObjectRef function,
    JSObjectRef thisObject,
    size_t argumentCount,
    const JSValueRef arguments[],
    JSValueRef *exception) {

  std::string resStr = Value(ctx, arguments[0]).toJSONString();

  executor->flushQueueImmediate(resStr);

  return JSValueMakeUndefined(ctx);
}

9. flushQueueImmediate获取JS队列执行队列数据调用Native接口：

void JSCExecutor::flushQueueImmediate(std::string queueJSON) {
  m_bridge->callNativeModules(*this, queueJSON, false);
}


10. callNativeModules 调用Native java方法


class BridgeCallback {
public:
  virtual ~BridgeCallback() {};

  virtual void onCallNativeModules(
      ExecutorToken executorToken,
      const std::string& callJSON,
      bool isEndOfBatch) = 0;

  virtual void onExecutorUnregistered(ExecutorToken executorToken) = 0;
};

void Bridge::callNativeModules(JSExecutor& executor, const std::string& callJSON, bool isEndOfBatch) {
  m_callback->onCallNativeModules(getTokenForExecutor(executor), callJSON, isEndOfBatch);
}

BridgeCallback::m_callback 为OnLoad.cpp 中的 class PlatformBridgeCallback : public BridgeCallback

virtual void onCallNativeModules(
    ExecutorToken executorToken,
    const std::string& callJSON,
    bool isEndOfBatch) override {
  executeCallbackOnCallbackQueueThread([executorToken, callJSON, isEndOfBatch] (ResolvedWeakReference& callback) {
    JNIEnv* env = Environment::current();
    for (auto& call : react::parseMethodCalls(callJSON)) {
      makeJavaCall(env, executorToken, callback, call);
      if (env->ExceptionCheck()) {
        return;
      }
    }
    if (isEndOfBatch) {
      signalBatchComplete(env, callback);
    }
  });
}

相当于执行 PlatformBridgeCallback.onCallNativeModules，最后调用 makeJavaCall方法调用java方法

OnLoad.cpp 中 makeJavaCall 定义,  c++通过CallVoidMethod调用java非静态方法：

static void makeJavaCall(JNIEnv* env, ExecutorToken executorToken, jobject callback, const MethodCall& call) {

  auto newArray = ReadableNativeArray::newObjectCxxArgs(std::move(call.arguments));
  env->CallVoidMethod(
      callback,
      gCallbackMethod,
      static_cast<JExecutorTokenHolder*>(executorToken.getPlatformExecutorToken().get())->getJobj(),
      call.moduleId,
      call.methodId,
      newArray.get());
}



### N->js : `__callFunction` 和 `__invokeCallback`

#### JSCExecutor.cpp:

```JavaScript
m_batchedBridge = folly::make_unique<Object>(batchedBridgeValue.asObject());

m_flushedQueueObj = folly::make_unique<Object>(m_batchedBridge->getProperty("flushedQueue").asObject());
void JSCExecutor::flush() {
  std::string calls = m_flushedQueueObj->callAsFunction().toJSONString();
  m_bridge->callNativeModules(*this, calls, true);
}

m_callFunctionObj = folly::make_unique<Object>(m_batchedBridge->getProperty("callFunctionReturnFlushedQueue").asObject());
void JSCExecutor::callFunction(const std::string& moduleId, const std::string& methodId, const folly::dynamic& arguments) {
  String argsString = String(folly::toJson(std::move(arguments)).c_str());
  String moduleIdStr(moduleId.c_str());
  String methodIdStr(methodId.c_str());
  JSValueRef args[] = {
      JSValueMakeString(m_context, moduleIdStr),
      JSValueMakeString(m_context, methodIdStr),
      Value::fromJSON(m_context, argsString)
  };
  auto result = m_callFunctionObj->callAsFunction(3, args);
  m_bridge->callNativeModules(*this, result.toJSONString(), true);
}

m_invokeCallbackObj = folly::make_unique<Object>(m_batchedBridge->getProperty("invokeCallbackAndReturnFlushedQueue").asObject());

void JSCExecutor::invokeCallback(const double callbackId, const folly::dynamic& arguments) {
  String argsString = String(folly::toJson(std::move(arguments)).c_str());
  JSValueRef args[] = {
      JSValueMakeNumber(m_context, callbackId),
      Value::fromJSON(m_context, argsString)
  };
  auto result = m_invokeCallbackObj->callAsFunction(2, args);
  m_bridge->callNativeModules(*this, result.toJSONString(), true);
}
```


#### bundle.js

```JavaScript
window.__fbBatchedBridge 方法定义(BatchedBridge对象)

['invokeCallbackAndReturnFlushedQueue','callFunctionReturnFlushedQueue','flushedQueue'].
forEach(function (fn) {
  return _this[fn] = _this[fn].bind(_this);
});

NativeModuleRegistry.build()

return new NativeModuleRegistry(moduleTable, moduleInstances);
```


#### 一. Native 端启动流程

private void attachMeasuredRootViewToInstance(ReactRootView rootView,CatalystInstance catalystInstance) {
   WritableNativeMap appParams = new WritableNativeMap();
   appParams.putDouble("rootTag", rootTag);
   appParams.putMap("initialProps", initialProps);
   catalystInstance.getJSModule(AppRegistry.class).runApplication('SmartDebugReactApp', appParams);
}

#### 二. bundle.js 启动流程

1. require(0 /* SmartRectNativeApp/debug.android.js */)

  _reactNative.AppRegistry.registerComponent('SmartDebugReactApp', function () {
    return SmartDebugReactApp;
  });

2. require(466 /* AppRegistry */);

  registerComponent: function registerComponent(appKey, getComponentFunc) {
    runnables[appKey] = {
      run: function run(appParameters) {
        return (
          renderApplication(getComponentFunc(), appParameters.initialProps, appParameters.rootTag));
      }
    };
    return appKey;
  },

  runApplication: function runApplication(appKey, appParameters) {
      runnables[appKey].run(appParameters);
  }  

  BatchedBridge.registerCallableModule('AppRegistry',AppRegistry);
  =>MessageQueue:  this._callableModules[name] = methods;

3. renderApplication 实现

ReactNative.render(
  React.createElement(AppContainer, { __source: { fileName: _jsxFileName, lineNumber: 34 } },
    React.createElement(RootComponent, babelHelpers.extends({},
      initialProps, {
        rootTag: rootTag, __source: { fileName: _jsxFileName, lineNumber: 35 }
      }))),
  rootTag);
}

4. ReactNative.render实现

function render(element, mountInto, callback) {
  return ReactNativeMount.renderComponent(element, mountInto, callback);
};

5. ReactNativeMount.renderComponent 实现

function renderComponent(nextElement, containerTag, callback) {
  var nextWrappedElement = new ReactElement(TopLevelWrapper, null, null, null, null, null, nextElement);

  var topRootNodeID = containerTag;
  var prevComponent = ReactNativeMount._instancesByContainerID[topRootNodeID];
  if (prevComponent) {
    var prevWrappedElement = prevComponent._currentElement;
    var prevElement = prevWrappedElement.props;
    if (shouldUpdateReactComponent(prevElement, nextElement)) {
      ReactUpdateQueue.enqueueElementInternal(prevComponent, nextWrappedElement);
      if (callback) {
        ReactUpdateQueue.enqueueCallbackInternal(prevComponent, callback);
      }
      return prevComponent;
    } else {
      ReactNativeMount.unmountComponentAtNode(containerTag);
    }
  }

  if (!ReactNativeTagHandles.reactTagIsNativeTopRootID(containerTag)) {
    console.error('You cannot render into anything but a top root');
    return null;
  }

  ReactNativeTagHandles.assertRootTag(containerTag);

  var instance = instantiateReactComponent(nextWrappedElement);
  ReactNativeMount._instancesByContainerID[containerTag] = instance;

  if (process.env.NODE_ENV !== 'production') {


    instance._debugID = 0;

    if (process.env.NODE_ENV !== 'production') {
      ReactInstrumentation.debugTool.onBeginFlush();
    }
  }


  ReactUpdates.batchedUpdates(batchedMountComponentIntoNode, instance, containerTag);
  if (process.env.NODE_ENV !== 'production') {

    ReactInstrumentation.debugTool.onMountRootComponent(instance._renderedComponent._debugID);
    ReactInstrumentation.debugTool.onEndFlush();
  }
  var component = instance.getPublicInstance();
  if (callback) {
    callback.call(component);
  }
  return component;
},


_mountImageIntoNode: function _mountImageIntoNode(mountImage, containerID) {


  var childTag = mountImage;
  UIManager.setChildren(containerID, [childTag]);
},




### 流程关键路径

ReactPackage:

    MainReactPackage
    CoreModulesPackage

    createReactContext


    NativeModuleRegistry.Builder nativeRegistryBuilder = new NativeModuleRegistry.Builder();

        initializeBridge

    JavaScriptModuleRegistry.Builder jsModulesBuilder = new JavaScriptModuleRegistry.Builder();




bundle.js

全局变量
__fbBatchedBridge (MessageQueue)

require(61 /* BatchedBridge */);
require(62 /* MessageQueue */);




public class ReactContext extends ContextWrapper {
    ReactContext.initializeWithInstance(CatalystInstance catalystInstance);
}

public class ReactApplicationContext extends ReactContext {
    public ReactApplicationContext(Context context) {
        super(context.getApplicationContext());
    }
}

public abstract class ReactContextBaseJavaModule extends BaseJavaModule {

    protected final ReactApplicationContext getReactApplicationContext() {
            return this.mReactApplicationContext;
    }

    public ReactContextBaseJavaModule(ReactApplicationContext reactContext) {
            this.mReactApplicationContext = reactContext;
    }
}   

public class AppStateModule extends ReactContextBaseJavaModule implements LifecycleEventListener {

    public void onHostResume() {
        this.mAppState = "active";
        this.sendAppStateChangeEvent();
    }

    public void onHostPause() {
        this.mAppState = "background";
        this.sendAppStateChangeEvent();
    }

    private void sendAppStateChangeEvent() {
           ((RCTDeviceEventEmitter)this.getReactApplicationContext().getJSModule(RCTDeviceEventEmitter.class)).emit("appStateDidChange", this.createAppStateEventMap());
    }
}

---com/facebook/react/modules/****Module.java::getJSModule

getReactApplicationContext().getJSModule(RCTDeviceEventEmitter.class).emit("networkStatusDidChange", createConnectivityEventMap());
getReactApplicationContext().getJSModule(RCTDeviceEventEmitter.class).emit("appStateDidChange", createAppStateEventMap());
getReactApplicationContext().getJSModule(RCTDeviceEventEmitter.class).emit("geolocationDidChange", locationToMap(location));
.........
