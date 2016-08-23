### JSBundle打包到assets目录

1、生成签名密钥

keytool -genkey -v -keystore my-release-key.keystore -alias my-key-alias -keyalg RSA -keysize 2048 -validity 10000


2. jsbundle生成到asset目录

react-native bundle --entry-file ./index.android.js  --bundle-output ./app/src/main/assets/index.android.bundle --platform android --assets-dest ./app/src/main/res/ --dev false

react-native bundle --entry-file ./debug.android.js  --bundle-output ./app/src/main/assets/release.android.bundle --platform android --assets-dest ./app/src/main/res/ --dev false

react-native bundle --entry-file ./debug.android.js  --bundle-output ./app/src/main/assets/debug.android.bundle --platform android --assets-dest ./app/src/main/res/ --dev true

curl "http://localhost:8081/debug.android.bundle?platform=android" -o  "./app/src/main/assets/debug.android.bundle"

3. 生成apk，在 android/app/build/outputs/apk/ 下，找到打包生成的 app-release.apk

gradlew assembleRelease


http://www.jianshu.com/p/61e27d9b02f2 打包


### React Native与Android原生应用集成(Android Studio, React Native 0.29.1, ES6语法)


### 真机调试，bundle服务连不上,命令行执行以下命令

    adb reverse tcp:8081 tcp:8081

    8081端口占用: lsof -n -i4TCP:8081     kill -9 pid



###  "No target device found."——Android Studio真机测试中遇到的问题

  其实这是在Android Studio初始化的过程中，Android Monitor程序没被启动而无法识别USB线所连接的设备所致。 选择Android Stuido 左下角正方形菜单，然后选Android Mointor选项，Android Studio会帮你自动识别查找设备。这样就完美的解决了这个问题。

### React/React Native 的ES5 ES6写法对照表

https://zhuanlan.zhihu.com/p/20872538
http://bbs.reactnative.cn/topic/15/react-react-native-%E7%9A%84es5-es6%E5%86%99%E6%B3%95%E5%AF%B9%E7%85%A7%E8%A1%A8/10
https://babeljs.io/blog/2015/06/07/react-on-es6-plus
http://reactjs.cn/react/docs/reusable-components.html


### 通信机制

ios 通信机制：

http://c.blog.sina.com.cn/profile.php?blogid=e8e60bc08901ecz7&from=h5

http://taobaofed.org/blog/2015/12/30/the-communication-scheme-of-react-native-in-ios/

http://www.jianshu.com/p/269b21958030

android 通信机制：

http://bugly.qq.com/bbs/forum.php?mod=viewthread&tid=663

http://mobile.51cto.com/aprogram-493549.htm

### React 原理剖析

setState：http://web.jobbole.com/84306/
diff算法：http://www.infoq.com/cn/articles/react-dom-diff
diff算法：https://zhuanlan.zhihu.com/p/20346379

### 学习资料

https://github.com/reactnativecn/react-native-guide

http://reactnative.cn/docs/0.28/native-modules-android.html#content

http://www.alloyteam.com/2015/10/react-native-android-steps-on-tour/

http://www.lcode.org/react-native%E7%A7%BB%E6%A4%8D%E5%8E%9F%E7%94%9Fandroid%E9%A1%B9%E7%9B%AE-%E5%B7%B2%E6%9B%B4%E6%96%B0%E7%89%88%E6%9C%AC/

### import from React 和 import from react-native 0.25版本之后必须分开import

http://bbs.reactnative.cn/topic/981/react-native-0-25-%E6%AD%A3%E5%BC%8F%E7%89%88%E5%8F%91%E5%B8%83
http://bbs.reactnative.cn/topic/15/react-react-native-%E7%9A%84es5-es6%E5%86%99%E6%B3%95%E5%AF%B9%E7%85%A7%E8%A1%A8

#### 0.25版本之前

import React, {
    Component,
    View
} from  'react-native' ;


#### 0.25版本之后，

import React, {
  Component
} from  'react' ;

import {
View
} from  'react-native' ;

#### packages 说明
"react":

Children
Component
PropTypes
createElement
cloneElement
isValidElement
createClass
createFactory
createMixin

"react-native":
hasReactNativeInitialized
findNodeHandle
render
unmountComponentAtNode
unmountComponentAtNodeAndRemoveContainer
unstable_batchedUpdates
View
Text
ListView

### 在线画图

https://www.processon.com

### 远程加载jsbundle文件

远程加载jsbundle文件，需要开启DEBUG模式，host和port是写在PreferenceManager.getDefaultSharedPreferences，key为debug_http_host，查看DevServerHelper.java的getDebugServerHost方法


### 参考资料

https://github.com/Kennytian/embedded
