
ReactInstanceManagerImpl.builder

ReactRootView.startReactApplication

ReactInstanceManagerImpl。createReactContextInBackground

    1. recreateReactContextInBackgroundInner

    2. recreateReactContextInBackgroundFromBundleFile

       1. recreateReactContextInBackground(JavaScriptExecutor.Factory jsExecutorFactory,JSBundleLoader jsBundleLoader)

       2. ReactContextInitAsyncTask.execute  读取JSBundle文件

       3. ReactContextInitAsyncTask.createReactContext(JavaScriptExecutor jsExecutor,JSBundleLoader jsBundleLoader)

       4. ReactContextInitAsyncTask.setupReactContext

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

                        回调：NativeModulesReactCallback

                3. buildModulesConfigJSONProperty: remoteModuleConfig

                4. NativeModuleRegistry.writeModuleDescriptions

                5. __fbBatchedBridgeConfig 和 __RCTProfileIsProfiling 全局JS变量 （ReactBridge）

                6. notifyReactBridgeInitialized

           CatalystInstanceImpl.getReactQueueConfiguration().getJSQueueThread().callOnQueue

           CatalystInstanceImpl.getJSQueueThread().callOnQueue.runJSBundle(); --JS bundle was already loaded

                JSBundleLoader.loadScript(ReactBridge)

                ReactApplicationContext.initializeWithInstance(CatalystInstanceImpl)

                JNI:

                    ReactBridge.java -> OnLoad.cpp(node_modules/react-native/ReactAndroid/src/main/jni/react/jni/OnLoad.cpp)

ReactRootView::attachToReactInstanceManager



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



callFunction调用流程:


java调用

1. JavaScriptModuleRegistry.JavaScriptModuleInvocationHandler.invoke 中调用CatalystInstanceImpl.callFunction

2. CatalystInstanceImpl调用 ReactBridge.callFunction

3. ReactBridge.callFunction 调用 JNI


jni调用:

1. OnLoad.cpp:

static void callFunction(JNIEnv* env, jobject obj, JExecutorToken::jhybridobject jExecutorToken, jstring module, jstring method,


2. Bridge.cpp

void Bridge::callFunction(ExecutorToken executorToken,const std::string& moduleId,const std::string& methodId,const folly::dynamic& arguments,const std::string& tracingName) 


3. JSCExecutor.cpp 

void JSCExecutor::callFunction(const std::string& moduleId, const std::string& methodId, const folly::dynamic& arguments) 


// 确保__fbBatchedBridge 有定义
bool JSCExecutor::ensureBatchedBridgeObject() 

// 执行 __fbBatchedBridge 中js方法
void JSCExecutor::callFunction(const std::string& moduleId, const std::string& methodId, const folly::dynamic& arguments) {

执行js  __fbBatchedBridge.callFunctionReturnFlushedQueue 返回queue队列

执行Bridge.cpp : void Bridge::callNativeModules(JSExecutor& executor, const std::string& callJSON, bool isEndOfBatch) 

执行 m_callback->onCallNativeModules(getTokenForExecutor(executor), callJSON, isEndOfBatch);

m_callback 为OnLoad.cpp 中的 class PlatformBridgeCallback : public BridgeCallback 

相当于执行 PlatformBridgeCallback.onCallNativeModules

最后调用 makeJavaCall方法调用java方法


bundle.js

MessageQueue：

JS-N: __nativeCall  queue队列

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

N->js : __callFunction 和 __invokeCallback

JSCExecutor.cpp

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

JS：

window.__fbBatchedBridge 方法定义(BatchedBridge对象)

['invokeCallbackAndReturnFlushedQueue','callFunctionReturnFlushedQueue','flushedQueue'].
forEach(function (fn) {
  return _this[fn] = _this[fn].bind(_this);
});