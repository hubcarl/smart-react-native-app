
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

