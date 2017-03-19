## React Native 学习研究


### 1.运行android

npm run android 
或者
react-native run-android


### 2.运行ios

npm run ios
或者
react-native run-ios


### 3.功能实现


#### Tab实现


#### 抽屉侧边栏


#### 下拉刷新


#### 分页下拉加载更多


#### 动态更新

[React Native Android热更新实现](http://codehelp.cn/blog/2016/09/15/react-native-update/)


### 4.adb文件下载和上传

**adb pull  就是从真机上拷贝文件到您的PC**

```bash
adb pull /sdcard/react-native-update.mp4   /Users/sky/dev/react/native/SmartReactNativeApp/images
```
**adb push  就是从PC上复制一份文件到您的真机上**

```bash
adb push /Users/sky/dev/react/native/SmartReactNativeApp/images/home.png  /sdcard
```

### 5.真机调试，bundle服务连不上,命令行执行以下命令

```bash
adb reverse tcp:8081 tcp:8081
```

8081端口占用:

```bash
lsof -n -i4TCP:8081
kill -9 pid
```


### 6.签名密钥

```bash
keytool -genkey -v -keystore my-release-key.keystore -alias my-key-alias -keyalg RSA -keysize 2048 -validity 10000
```

### 7.jsbundle生成到asset目录

```bash
react-native bundle --entry-file ./index.android.js  --bundle-output ./app/src/main/assets/index.android.bundle --platform android --assets-dest ./app/src/main/res/ --dev false
```

```bash
curl "http://localhost:8081/debug.android.bundle?platform=android" -o  "./app/src/main/assets/debug.android.bundle"
```


#### 8.adb 截屏和视频录播

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

### 9.Android 系列学习总结

1. [React Native, Hybrid App, H5 简单对比分析](http://codehelp.cn/blog/2016/08/07/react-native-compare/)

2. [React Native Android 自定义插件](http://codehelp.cn/blog/2016/08/13/react-native-plugin)

3. [React Native Android APK包大小分析](http://codehelp.cn/blog/2016/08/21/react-native-size/)

4. [React Native Android源码解读和交互原理分析](http://codehelp.cn/blog/2016/08/28/react-native-js/)

5. [React Native Android代码执行跟踪和调试](http://codehelp.cn/blog/2016/09/04/react-native-debug/)

6. [React Native Android热更新实现](http://codehelp.cn/blog/2016/09/15/react-native-update/)
