## React Native 学习研究

### Android 系列学习总结

1. [React Native, Hybrid App, H5 简单对比分析](http://codehelp.cn/blog/2016/08/07/react-native-compare/)

2. [React Native Android 自定义插件](http://codehelp.cn/blog/2016/08/13/react-native-plugin)

3. [React Native Android APK包大小分析](http://codehelp.cn/blog/2016/08/21/react-native-size/)

4. [React Native Android源码解读和交互原理分析](http://codehelp.cn/blog/2016/08/28/react-native-js/)

5. [React Native Android代码执行跟踪和调试](http://codehelp.cn/blog/2016/09/04/react-native-debug/)

6. [React Native Android热更新实现](http://codehelp.cn/blog/2016/09/15/react-native-update/)

### iOS 系列学习总结

参考 https://github.com/attentiveness/reading 项目实现


### React Native 学习杂记

1. 生成签名密钥

```bash
keytool -genkey -v -keystore my-release-key.keystore -alias my-key-alias -keyalg RSA -keysize 2048 -validity 10000
```

2. jsbundle生成到asset目录

```bash
react-native bundle --entry-file ./index.android.js  --bundle-output ./app/src/main/assets/index.android.bundle --platform android --assets-dest ./app/src/main/res/ --dev false
```

```bash
curl "http://localhost:8081/debug.android.bundle?platform=android" -o  "./app/src/main/assets/debug.android.bundle"
```

3. 生成apk，在 android/app/build/outputs/apk/ 下，找到打包生成的 app-release.apk

```bash
gradlew assembleRelease
```

http://www.jianshu.com/p/61e27d9b02f2 打包


4. adb 截屏和视频录播

```bash
adb shell screenrecord /sdcard/react-native-update.mp4
```
http://note.rpsh.net/posts/2015/04/21/mac-osx-ffmpeg-mp4-gif-convert/

```bash
ffmpeg -i  /Users/sky/dev/react/native/SmartReactNativeApp/images/react-native-update.mp4 /Users/sky/dev/react/native/SmartReactNativeApp/images/react-native-update.gif
```

从视频中第9秒开始，截取时长为8秒的片段转化为 gif

```bash
ffmpeg -t 8  -ss 00:00:09 -i /Users/sky/dev/react/native/SmartReactNativeApp/images/react-native-update.mp4 /Users/sky/dev/react/native/SmartReactNativeApp/images/react-native-update.gif
```

5. adb文件下载和上传

**adb pull  就是从真机上拷贝文件到您的PC**

```bash
adb pull /sdcard/react-native-update.mp4   /Users/sky/dev/react/native/SmartReactNativeApp/images
```
**adb push  就是从PC上复制一份文件到您的真机上**

```bash
adb push /Users/sky/dev/react/native/SmartReactNativeApp/images/home.png  /sdcard
```

6. 真机调试，bundle服务连不上,命令行执行以下命令

```bash
adb reverse tcp:8081 tcp:8081
```

8081端口占用:

```bash
lsof -n -i4TCP:8081     
kill -9 pid
```

No target device found ——Android Studio真机测试中遇到的问题

  其实这是在Android Studio初始化的过程中，Android Monitor程序没被启动而无法识别USB线所连接的设备所致。 选择Android Stuido 左下角正方形菜单，然后选Android Mointor选项，Android Studio会帮你自动识别查找设备。这样就完美的解决了这个问题。

7. React/React Native 的ES5 ES6写法对照表

https://zhuanlan.zhihu.com/p/20872538
http://bbs.reactnative.cn/topic/15/react-react-native-%E7%9A%84es5-es6%E5%86%99%E6%B3%95%E5%AF%B9%E7%85%A7%E8%A1%A8/10
https://babeljs.io/blog/2015/06/07/react-on-es6-plus
http://reactjs.cn/react/docs/reusable-components.html


8. 通信机制

ios 通信机制：

http://c.blog.sina.com.cn/profile.php?blogid=e8e60bc08901ecz7&from=h5

http://taobaofed.org/blog/2015/12/30/the-communication-scheme-of-react-native-in-ios/

http://www.jianshu.com/p/269b21958030

android 通信机制：

http://bugly.qq.com/bbs/forum.php?mod=viewthread&tid=663

http://mobile.51cto.com/aprogram-493549.htm

9. React 原理剖析

setState：http://web.jobbole.com/84306/
diff算法：http://www.infoq.com/cn/articles/react-dom-diff
diff算法：https://zhuanlan.zhihu.com/p/20346379

10. 学习资料

https://github.com/reactnativecn/react-native-guide

http://reactnative.cn/docs/0.28/native-modules-android.html#content

http://www.alloyteam.com/2015/10/react-native-android-steps-on-tour/

http://www.lcode.org/react-native%E7%A7%BB%E6%A4%8D%E5%8E%9F%E7%94%9Fandroid%E9%A1%B9%E7%9B%AE-%E5%B7%B2%E6%9B%B4%E6%96%B0%E7%89%88%E6%9C%AC/

11. import from React 和 import from react-native 0.25版本之后必须分开import

http://bbs.reactnative.cn/topic/981/react-native-0-25-%E6%AD%A3%E5%BC%8F%E7%89%88%E5%8F%91%E5%B8%83
http://bbs.reactnative.cn/topic/15/react-react-native-%E7%9A%84es5-es6%E5%86%99%E6%B3%95%E5%AF%B9%E7%85%A7%E8%A1%A8

12. 0.25版本之前

import React, {
    Component,
    View
} from  'react-native' ;


13. 0.25版本之后，

import React, {
  Component
} from  'react' ;

import {
View
} from  'react-native' ;

14. packages 说明

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

165. 在线画图

https://www.processon.com

16. unrecognized font family ionicons 错误

http://www.cnblogs.com/moxiaoyan33/p/5482024.html

17. ios图片不显示

https://segmentfault.com/q/1010000005882935?_ea=938052
