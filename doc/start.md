
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

```JavaScript
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

JSCExecutor.cpp 通过installGlobalFunction 定义 nativeFlushQueueImmediate方法

m_context = JSGlobalContextCreateInGroup(nullptr, nullptr);
s_globalContextRefToJSCExecutor[m_context] = this;
installGlobalFunction(m_context, "nativeFlushQueueImmediate", nativeFlushQueueImmediate);
installGlobalFunction(m_context, "nativePerformanceNow", nativePerformanceNow);
installGlobalFunction(m_context, "nativeStartWorker", nativeStartWorker);
installGlobalFunction(m_context, "nativePostMessageToWorker", nativePostMessageToWorker);
installGlobalFunction(m_context, "nativeTerminateWorker", nativeTerminateWorker);
installGlobalFunction(m_context, "nativeInjectHMRUpdate", nativeInjectHMRUpdate);
```

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
｝

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
