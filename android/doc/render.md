# React Native 代码执行跟踪和调试

### 支持远程本地调试

通过创建ReactInstanceManager.builder 设置setUseDeveloperSupport(true)支持远程本地调试。
远程调试时，如果是通过Android studio 打包时，可以先通过npm start启动启动本地服务，启动后服务地址：

http://localhost:8081/debug.android.bundle?platform=android&dev=true&hot=false&minify=false

如果想加载asset下的JSBundle文件，需要先把JSBundle打到本地assets目录下面，可以通过react-native bundle实现。命令自动会分析图片依赖，然后拷贝到res目录下面。

```bash
react-native bundle --entry-file ./index.android.js  --bundle-output ./app/src/main/assets/index.android.jsbundle --platform android --assets-dest ./app/src/main/res/ --dev false
```

然后setUseDeveloperSupport(false)，之后重新打包即可。


### 开启ReactNative日志打印

React Native 增加了关键日志自定义listener回调接口MarkerListener，只要在React Activity onCreate设置ReactMarker.setMarkerListener方法，
实现MarkerListener接口logMarker方法，即可实现控制台日志打印。我们可以记录下每个关键路径的当前时间，即可计算出每个关键路径的执行时间。

```java
ReactMarker.setMarkerListener(new ReactMarker.MarkerListener(){
    @Override
    public void logMarker(String name) {
        Log.i("ReactNativeJS", name.toLowerCase() + " cost:" + System.currentTimeMillis());
    }
});
```

08-28 20:33:47.637 I/ReactNativeJS: process_packages_end cost:1472387627637
08-28 20:33:47.637 I/ReactNativeJS: build_native_module_registry_start cost:1472387627637
08-28 20:33:47.639 I/ReactNativeJS: build_native_module_registry_end cost:1472387627639
08-28 20:33:47.646 I/ReactNativeJS: create_catalyst_instance_start cost:1472387627646
08-28 20:33:47.688 I/ReactNativeJS: create_catalyst_instance_end cost:1472387627688
08-28 20:33:47.688 I/ReactNativeJS: run_js_bundle_start cost:1472387627688
08-28 20:33:47.717 I/ReactNativeJS: loadapplicationscript_startstringconvert cost:1472387627717
08-28 20:33:47.833 I/ReactNativeJS: loadapplicationscript_endstringconvert cost:1472387627832
08-28 20:33:48.787 I/ReactNativeJS: create_react_context_end cost:1472387628786
08-28 20:33:48.787 I/ReactNativeJS: run_js_bundle_end cost:1472387628787


### 简单的React Native View创建流程

![image](https://raw.githubusercontent.com/hubcarl/hubcarl.github.io/master/_posts/images/react/rn-simple-view.jpg)


#### view源码

```
render() {
    return (
        <View style={styles.container}>
            <Text style={styles.welcome}>
                {this.state.text}
            </Text>
            <TouchableOpacity activeOpacity={0.8} onPress={this._getJSNativeCost}>
                <Text style={styles.instructions}>
                    点击我，测试JS调用Native性能
                </Text>
            </TouchableOpacity>
             <TouchableOpacity activeOpacity={0.8} onPress={this._setCache}>
                <Text style={styles.instructions}>
                    点击我，设置缓存测试
                </Text>
              </TouchableOpacity>
             <TouchableOpacity activeOpacity={0.8} onPress={this._getCache}>
              <Text style={styles.instructions}>
                  点击我，获取缓存值
              </Text>
             </TouchableOpacity>
            <TouchableOpacity activeOpacity={0.8} onPress={this._secondActivity}>
                <Text style={styles.instructions}>
                    点击我，打开Android Native Activity页面
                </Text>
            </TouchableOpacity>
            <TouchableOpacity activeOpacity={0.8} onPress={this._secondReactActivity}>
                <Text style={styles.instructions}>
                    点击我，打开Android Second React Activity页面
                </Text>
            </TouchableOpacity>
            <Text style={styles.instructions}>
                Shake or press menu button for dev menu
            </Text>
        </View>
    );
}
```

#### react bundle.js 打包构建后
```
{key:'render',value:function render()

{
return(
_react2.default.createElement(_reactNative.View,{style:styles.container},
_react2.default.createElement(_reactNative.Text,{style:styles.welcome},
this.state.text),

_react2.default.createElement(_reactNative.TouchableOpacity,{activeOpacity:0.8,onPress:this._getJSNativeCost},
_react2.default.createElement(_reactNative.Text,{style:styles.instructions},'点击我，测试JS调用Native性能')),

_react2.default.createElement(_reactNative.TouchableOpacity,{activeOpacity:0.8,onPress:this._setCache},
_react2.default.createElement(_reactNative.Text,{style:styles.instructions},'点击我，设置缓存测试')),

_react2.default.createElement(_reactNative.TouchableOpacity,{activeOpacity:0.8,onPress:this._getCache},
_react2.default.createElement(_reactNative.Text,{style:styles.instructions},'点击我，获取缓存值')),

_react2.default.createElement(_reactNative.TouchableOpacity,{activeOpacity:0.8,onPress:this._secondActivity},
_react2.default.createElement(_reactNative.Text,{style:styles.instructions},'点击我，打开Android Native Activity页面')),

_react2.default.createElement(_reactNative.TouchableOpacity,{activeOpacity:0.8,onPress:this._secondReactActivity},
_react2.default.createElement(_reactNative.Text,{style:styles.instructions},'点击我，打开Android Second React Activity页面')),

_react2.default.createElement(_reactNative.Text,{style:styles.instructions},'Shake or press menu button for dev menu')));
}}
```

#### view调用

08-28 20:19:19.462  Running application "SmartDebugReactApp" with appParams: {"initialProps":{},"rootTag":1}. __DEV__ === true, development-level warning are ON, performance optimizations are OFF
08-28 20:19:19.526  'JS->N : ', 8, 18, 'NaN.createView([2,"RCTView",1,{"flex":1}])'
08-28 20:19:19.545  'JS->N : ', 8, 18, 'NaN.createView([3,"RCTView",1,{"collapsable":true,"flex":1}])'
08-28 20:19:19.584  'JS->N : ', 28, 1, 'NaN.createTimer([2,1,1472386759583,false])'
08-28 20:19:19.706  'JS->N : ', 8, 18, 'NaN.createView([4,"RCTView",1,{"flex":1,"justifyContent":"center","alignItems":"center","backgroundColor":-656129}])'
08-28 20:19:19.721  'JS->N : ', 8, 18, 'NaN.createView([5,"RCTText",1,{"fontSize":20,"textAlign":"center","margin":10,"color":-65536,"accessible":true,"allowFontScaling":true,"ellipsizeMode":"tail"}])'
08-28 20:19:19.732  'JS->N : ', 8, 18, 'NaN.createView([6,"RCTRawText",1,{"text":"Welcome to React Native!"}])'
08-28 20:19:19.738  'JS->N : ', 8, 9, 'NaN.setChildren([5,[6]])'
08-28 20:19:19.768  'JS->N : ', 8, 18, 'NaN.createView([7,"RCTView",1,{"accessible":true,"opacity":1}])'
08-28 20:19:19.777  'JS->N : ', 8, 18, 'NaN.createView([8,"RCTText",1,{"textAlign":"center","color":-13421773,"marginTop":15,"marginBottom":5,"fontSize":14,"accessible":true,"allowFontScaling":true,"ellipsizeMode":"tail"}])'
08-28 20:19:19.779  'JS->N : ', 8, 18, 'NaN.createView([9,"RCTRawText",1,{"text":"点击我，测试JS调用Native性能"}])'
08-28 20:19:19.782  'JS->N : ', 8, 9, 'NaN.setChildren([8,[9]])'
08-28 20:19:19.783  'JS->N : ', 8, 9, 'NaN.setChildren([7,[8]])'
08-28 20:19:19.801  'JS->N : ', 8, 18, 'NaN.createView([10,"RCTView",1,{"accessible":true,"opacity":1}])'
08-28 20:19:19.810  'JS->N : ', 8, 18, 'NaN.createView([12,"RCTText",1,{"textAlign":"center","color":-13421773,"marginTop":15,"marginBottom":5,"fontSize":14,"accessible":true,"allowFontScaling":true,"ellipsizeMode":"tail"}])'
08-28 20:19:19.812  'JS->N : ', 8, 18, 'NaN.createView([13,"RCTRawText",1,{"text":"点击我，设置缓存测试"}])'
08-28 20:19:19.813  'JS->N : ', 8, 9, 'NaN.setChildren([12,[13]])'
08-28 20:19:19.814  'JS->N : ', 8, 9, 'NaN.setChildren([10,[12]])'
08-28 20:19:19.834  'JS->N : ', 8, 18, 'NaN.createView([14,"RCTView",1,{"accessible":true,"opacity":1}])'
08-28 20:19:19.849  'JS->N : ', 8, 18, 'NaN.createView([15,"RCTText",1,{"textAlign":"center","color":-13421773,"marginTop":15,"marginBottom":5,"fontSize":14,"accessible":true,"allowFontScaling":true,"ellipsizeMode":"tail"}])'
08-28 20:19:19.851  'JS->N : ', 8, 18, 'NaN.createView([16,"RCTRawText",1,{"text":"点击我，获取缓存值"}])'
08-28 20:19:19.851  'JS->N : ', 8, 9, 'NaN.setChildren([15,[16]])'
08-28 20:19:19.854  'JS->N : ', 8, 9, 'NaN.setChildren([14,[15]])'
08-28 20:19:19.881  'JS->N : ', 8, 18, 'NaN.createView([17,"RCTView",1,{"accessible":true,"opacity":1}])'
08-28 20:19:19.890  'JS->N : ', 8, 18, 'NaN.createView([18,"RCTText",1,{"textAlign":"center","color":-13421773,"marginTop":15,"marginBottom":5,"fontSize":14,"accessible":true,"allowFontScaling":true,"ellipsizeMode":"tail"}])'
08-28 20:19:19.894  'JS->N : ', 8, 18, 'NaN.createView([19,"RCTRawText",1,{"text":"点击我，打开Android Native Activity页面"}])'
08-28 20:19:19.895  'JS->N : ', 8, 9, 'NaN.setChildren([18,[19]])'
08-28 20:19:19.896  'JS->N : ', 8, 9, 'NaN.setChildren([17,[18]])'
08-28 20:19:19.914  'JS->N : ', 8, 18, 'NaN.createView([20,"RCTView",1,{"accessible":true,"opacity":1}])'
08-28 20:19:19.924  'JS->N : ', 8, 18, 'NaN.createView([22,"RCTText",1,{"textAlign":"center","color":-13421773,"marginTop":15,"marginBottom":5,"fontSize":14,"accessible":true,"allowFontScaling":true,"ellipsizeMode":"tail"}])'
08-28 20:19:19.927  'JS->N : ', 8, 18, 'NaN.createView([23,"RCTRawText",1,{"text":"点击我，打开Android Second React Activity页面"}])'
08-28 20:19:19.932  'JS->N : ', 8, 9, 'NaN.setChildren([22,[23]])'
08-28 20:19:19.935  'JS->N : ', 8, 9, 'NaN.setChildren([20,[22]])'
08-28 20:19:19.941  'JS->N : ', 8, 18, 'NaN.createView([24,"RCTText",1,{"textAlign":"center","color":-13421773,"marginTop":15,"marginBottom":5,"fontSize":14,"accessible":true,"allowFontScaling":true,"ellipsizeMode":"tail"}])'
08-28 20:19:19.945  'JS->N : ', 8, 18, 'NaN.createView([25,"RCTRawText",1,{"text":"Shake or press menu button for dev menu"}])'
08-28 20:19:19.946  'JS->N : ', 8, 9, 'NaN.setChildren([24,[25]])'
08-28 20:19:19.950  'JS->N : ', 8, 9, 'NaN.setChildren([4,[5,7,10,14,17,20,24]])'
08-28 20:19:19.951  'JS->N : ', 8, 9, 'NaN.setChildren([3,[4]])'
08-28 20:19:19.962  'JS->N : ', 8, 18, 'NaN.createView([26,"RCTView",1,{"collapsable":true,"position":"absolute"}])'
08-28 20:19:19.963  'JS->N : ', 8, 9, 'NaN.setChildren([2,[3,26]])'
08-28 20:19:19.964  'JS->N : ', 8, 9, 'NaN.setChildren([1,[2]])'
08-28 20:19:19.976  'JS->N : ', 24, 0, 'NaN.getDataFromIntent([0,1])'
08-28 20:19:19.978  'JS->N : ', 1, 1, 'NaN.show(["Toast 是原生支持的!",3000])'
08-28 20:19:20.056  'JS->N : ', 8, 12, 'NaN.updateView([6,"RCTRawText",{"text":"注意：数据为空！"}])'



#### React Native 首次加载性能测试


##### Nexus5 5.0系统测试

第一次:

09-08 20:41:39.002  12023-12023/com.react.smart I/ReactNativeJS﹕ >>>react performance react start:1473338499002
09-08 20:41:39.081  12023-12023/com.react.smart I/ReactNativeJS﹕ >>>react performance react end:1473338499081
09-08 20:41:39.601  12023-12052/com.react.smart I/ReactNativeJS﹕ >>>react[runApplication]:1473338499600
09-08 20:41:39.618  12023-12052/com.react.smart I/ReactNativeJS﹕ >>>react#constructor, 1473338499616
09-08 20:41:39.618  12023-12052/com.react.smart I/ReactNativeJS﹕ >>>react#componentWillMount, 1473338499618
09-08 20:41:39.711  12023-12052/com.react.smart I/ReactNativeJS﹕ >>>react#componentDidMount, 1473338499711

cost:1473338499711-1473338499002=709

09-08 20:45:42.774  14935-14935/com.react.smart I/ReactNativeJS﹕ >>>react performance react start:1473338742774
09-08 20:45:42.806  14935-14935/com.react.smart I/ReactNativeJS﹕ >>>react performance react end:1473338742806
09-08 20:45:43.300  14935-14965/com.react.smart I/ReactNativeJS﹕ >>>react[runApplication]:1473338743299
09-08 20:45:43.320  14935-14965/com.react.smart I/ReactNativeJS﹕ >>>react#constructor, 1473338743319
09-08 20:45:43.321  14935-14965/com.react.smart I/ReactNativeJS﹕ >>>react#componentWillMount, 1473338743321
09-08 20:45:43.471  14935-14965/com.react.smart I/ReactNativeJS﹕ >>>react#componentDidMount, 1473338743471

cost:1473338743471-1473338742774=697

第二次:
09-08 20:41:39.002  12023-12023/com.react.smart I/ReactNativeJS﹕ >>>react performance react start:1473338499002
09-08 20:41:39.081  12023-12023/com.react.smart I/ReactNativeJS﹕ >>>react performance react end:1473338499081
09-08 20:41:39.601  12023-12052/com.react.smart I/ReactNativeJS﹕ >>>react[runApplication]:1473338499600
09-08 20:41:39.618  12023-12052/com.react.smart I/ReactNativeJS﹕ >>>react#constructor, 1473338499616
09-08 20:41:39.618  12023-12052/com.react.smart I/ReactNativeJS﹕ >>>react#componentWillMount, 1473338499618
09-08 20:41:39.711  12023-12052/com.react.smart I/ReactNativeJS﹕ >>>react#componentDidMount, 1473338499711

cost:1473338499711-1473338499002=709

09-08 20:50:46.781  14935-14935/com.react.smart I/ReactNativeJS﹕ >>>react performance react start:1473339046781
09-08 20:50:46.789  14935-14935/com.react.smart I/ReactNativeJS﹕ >>>react performance react end:1473339046789
09-08 20:50:47.213  14935-18051/com.react.smart I/ReactNativeJS﹕ >>>react[runApplication]:1473339047213
09-08 20:50:47.231  14935-18051/com.react.smart I/ReactNativeJS﹕ >>>react#constructor, 1473339047229
09-08 20:50:47.231  14935-18051/com.react.smart I/ReactNativeJS﹕ >>>react#componentWillMount, 1473339047231
09-08 20:50:47.327  14935-18051/com.react.smart I/ReactNativeJS﹕ >>>react#componentDidMount, 1473339047327

cost:1473339047327-1473339046781=546

09-08 20:51:31.920  18784-18784/com.react.smart I/ReactNativeJS﹕ >>>react performance react start:1473339091920
09-08 20:51:31.956  18784-18784/com.react.smart I/ReactNativeJS﹕ >>>react performance react end:1473339091956
09-08 20:51:32.456  18784-18820/com.react.smart I/ReactNativeJS﹕ >>>react[runApplication]:1473339092456
09-08 20:51:32.474  18784-18820/com.react.smart I/ReactNativeJS﹕ >>>react#constructor, 1473339092471
09-08 20:51:32.474  18784-18820/com.react.smart I/ReactNativeJS﹕ >>>react#componentWillMount, 1473339092474
09-08 20:51:32.565  18784-18820/com.react.smart I/ReactNativeJS﹕ >>>react#componentDidMount, 1473339092565

cost:1473339092565-1473339091920=645ms

从测试结果来看, Nexus5 时间稳定在500ms-700ms之间, 时间可以接受.

##### MX3 5.0系统测试


**第一次测试**

09-11 16:51:36.967  10179-10179/com.react.smart I/ReactNativeJS﹕ >>>react performance react start:1473583896967
09-11 16:51:37.091  10179-10179/com.react.smart I/ReactNativeJS﹕ >>>react performance react end:1473583897091
09-11 16:51:38.349  10179-10209/com.react.smart I/ReactNativeJS﹕ '>>>react#constructor', 1473583898342
09-11 16:51:38.350  10179-10209/com.react.smart I/ReactNativeJS﹕ '>>>react#componentWillMount', 1473583898349
09-11 16:51:38.523  10179-10209/com.react.smart I/ReactNativeJS﹕ '>>>react#componentDidMount', 1473583898523
09-11 16:51:38.528  10179-10209/com.react.smart I/ReactNativeJS﹕ '>>>react#componentDidMount#ToastAndroid.show', 1473583898527

cost:1473583898527-1473583896967=1560

**第二次测试**

09-11 16:53:48.688  11260-11260/com.react.smart I/ReactNativeJS﹕ >>>react performance react start:1473584028688
09-11 16:53:48.887  11260-11260/com.react.smart I/ReactNativeJS﹕ >>>react performance react end:1473584028887
09-11 16:53:50.345  11260-11292/com.react.smart I/ReactNativeJS﹕ '>>>react#constructor', 1473584030342
09-11 16:53:50.346  11260-11292/com.react.smart I/ReactNativeJS﹕ '>>>react#componentWillMount', 1473584030345
09-11 16:53:50.500  11260-11292/com.react.smart I/ReactNativeJS﹕ '>>>react#componentDidMount', 1473584030500
09-11 16:53:50.504  11260-11292/com.react.smart I/ReactNativeJS﹕ '>>>react#componentDidMount#ToastAndroid.show', 1473584030503

cost:1473584030503-1473584028688=1815

**第三次测试**


09-11 17:10:20.694  18623-18623/com.react.smart I/ReactNativeJS﹕ >>>react performance react start:1473585020694
09-11 17:10:20.894  18623-18623/com.react.smart I/ReactNativeJS﹕ >>>react performance react end:1473585020894
09-11 17:10:22.225  18623-18657/com.react.smart I/ReactNativeJS﹕ '>>>react#constructor', 1473585022222
09-11 17:10:22.226  18623-18657/com.react.smart I/ReactNativeJS﹕ '>>>react#componentWillMount', 1473585022225
09-11 17:10:22.405  18623-18657/com.react.smart I/ReactNativeJS﹕ '>>>react#componentDidMount', 1473585022405
09-11 17:10:22.409  18623-18657/com.react.smart I/ReactNativeJS﹕ '>>>react#componentDidMount#ToastAndroid.show', 1473585022408

cost:1473585022408-1473585020694=1714

**第四次测试**

09-11 17:11:25.690  19167-19167/com.react.smart I/ReactNativeJS﹕ >>>react performance react start:1473585085690
09-11 17:11:25.865  19167-19167/com.react.smart I/ReactNativeJS﹕ >>>react performance react end:1473585085865
09-11 17:11:27.173  19167-19199/com.react.smart I/ReactNativeJS﹕ '>>>react#constructor', 1473585087169
09-11 17:11:27.173  19167-19199/com.react.smart I/ReactNativeJS﹕ '>>>react#componentWillMount', 1473585087173
09-11 17:11:27.336  19167-19199/com.react.smart I/ReactNativeJS﹕ '>>>react#componentDidMount', 1473585087335
09-11 17:11:27.340  19167-19199/com.react.smart I/ReactNativeJS﹕ '>>>react#componentDidMount#ToastAndroid.show', 1473585087339

cost: 1473585087339-1473585085690=1649

从测试结果来看, MX3 时间稳定在1500ms-1800ms之间, 明显比Nexus5要慢




######

--首次安装打开

09-08 21:13:50.182    4541-4541/com.react.smart I/ReactNativeJS﹕ >>>react performance react start:1473340430182
09-08 21:13:50.215    4541-4541/com.react.smart I/ReactNativeJS﹕ >>>react performance react end:1473340430215
09-08 21:13:51.413    4541-4576/com.react.smart I/ReactNativeJS﹕ >>>react#componentDidMount, 1473340431411

1473340431411-1473340430182=1229

--再次打开

09-08 21:08:05.495  31311-31311/com.react.smart I/ReactNativeJS﹕ >>>react performance react start:1473340085495
09-08 21:08:06.704  31311-31351/com.react.smart I/ReactNativeJS﹕ >>>react#componentDidMount, 1473340086701

1473340086701-1473340085495=1206

09-08 21:08:27.371  31768-31768/com.react.smart I/ReactNativeJS﹕ >>>react performance react start:1473340107371
09-08 21:08:28.515  31768-31813/com.react.smart I/ReactNativeJS﹕ >>>react#componentDidMount, 1473340108513

1473340108513-1473340107371=1142


09-08 21:11:27.119    2485-2485/com.react.smart I/ReactNativeJS﹕ >>>react performance react start:1473340287119
09-08 21:11:28.295    2485-2522/com.react.smart I/ReactNativeJS﹕ >>>react#componentDidMount, 1473340288294

1473340288294-1473340287119=1175


MX3 5.0系统

复杂页面:

09-11 16:32:09.830  31176-31176/com.react.smart I/ReactNativeJS﹕ >>>react performance react start:1473582729830
09-11 16:32:10.108  31176-31176/com.react.smart I/ReactNativeJS﹕ >>>react performance react end:1473582730108
09-11 16:32:12.555  31176-31250/com.react.smart I/ReactNativeJS﹕ >>>react#componentDidMount, 1473582732551

1473582732551-1473582729830=2721


09-11 16:34:30.688  32703-32703/com.react.smart I/ReactNativeJS﹕ >>>react performance react start:1473582870688
09-11 16:34:30.978  32703-32703/com.react.smart I/ReactNativeJS﹕ >>>react performance react end:1473582870978
09-11 16:34:33.409  32703-316/  com.react.smart I/ReactNativeJS﹕ >>>react#componentDidMount, 1473582873405

1473582873405-1473582870688=2717

09-11 16:39:21.912    3978-3978/com.react.smart I/ReactNativeJS﹕ >>>react performance react start:1473583161912
09-11 16:39:22.115    3978-3978/com.react.smart I/ReactNativeJS﹕ >>>react performance react end:1473583162115
09-11 16:39:24.393    3978-4010/com.react.smart I/ReactNativeJS﹕ >>>react#componentDidMount, 1473583164390

1473583164390-1473583161912=2478


##### WebView addJavascriptInterface 测试




