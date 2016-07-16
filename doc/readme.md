adb reverse tcp:8081 tcp:8081


#### "No target device found."——Android Studio真机测试中遇到的问题

  其实这是在Android Studio初始化的过程中，Android Monitor程序没被启动而无法识别USB线所连接的设备所致。 选择Android Stuido 左下角正方形菜单，然后选Android Mointor选项，Android Studio会帮你自动识别查找设备。这样就完美的解决了这个问题。

### React/React Native 的ES5 ES6写法对照表

https://zhuanlan.zhihu.com/p/20872538
http://bbs.reactnative.cn/topic/15/react-react-native-%E7%9A%84es5-es6%E5%86%99%E6%B3%95%E5%AF%B9%E7%85%A7%E8%A1%A8/10

### 学习资料

https://github.com/reactnativecn/react-native-guide

http://reactnative.cn/docs/0.28/native-modules-android.html#content

### 通信机制

ios 通信机制：

http://c.blog.sina.com.cn/profile.php?blogid=e8e60bc08901ecz7&from=h5

http://taobaofed.org/blog/2015/12/30/the-communication-scheme-of-react-native-in-ios/

### import from React 和 import from react-native 0.25版本之后必须分开import


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
