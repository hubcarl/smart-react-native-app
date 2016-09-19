/**
* Sample React Native App
* https://github.com/facebook/react-native
*/

import React, {
    Component
} from 'react';

import {
    AppRegistry,
    StyleSheet,
    TouchableOpacity,
    Platform,
    BackAndroid,
    NativeModules,
    Text,
    View
} from 'react-native';


class SmartReactApp extends Component {
    constructor(props){
        super(props);

        this.state = {
            text: 'Welcome to React Native!',
            navigateCount: 0
        };
        console.log('>>>react#constructor', +new Date());
    }

    componentWillMount() {
        console.log('>>>react#componentWillMount', +new Date());
        if (Platform.OS === 'android') {
            BackAndroid.addEventListener('hardwareBackPress', ()=>this._backButton());
        }
     }

    _backButton(){
        const {navigateCount} = this.state;
        if (navigateCount) {
            NativeModules.IntentModule.backActivity(navigateCount)
            return true;
        }
        return false;
    }

    _secondActivity(){
           NativeModules.IntentModule.openSecondActivity();
    }

     _secondReactActivity(){
          NativeModules.IntentModule.openSecondReactActivity();
     }

    _setCache(){
        var arr=[];
        for(var i=0;i<10;i++){
          arr.push({
            "id": 1 + i + (+ new Date()),
            "title": "React Native接口性能测试"+i+ (+ new Date()),
            "summary": "炫斗不停，精彩不断，不要怂就是干的全武将萌化翻转扮演的新式三国策略养成手游《女神三国》邀您..." +i + (+ new Date()),
            "category": "React Native"+i,
            "createTime": "2016-09-09 17:48:0"+i,
            "publicTime": "2016-09-10 17:48:00"+i,
          });
        }
        const str = JSON.stringify(arr);
        const start = +new Date();
        NativeModules.IntentModule.setCache('RN001',str,(msg)=>{
            console.log('>>>>cost[setCache]:', +new Date()-start);
            NativeModules.ToastAndroid.show(msg, 3000);
          },(errorMsg)=>{
            NativeModules.ToastAndroid.show(errorMsg, 3000);
        });
        //NativeModules.IntentModule.finishActivity('我是来自React Native的消息');
    }

    _getCache(){
           const start = +new Date();
           NativeModules.IntentModule.getCache('RN001',(value)=>{
                console.log('>>>>cost[getCache]:'+(+new Date()-start) + ' value:'+value);
                NativeModules.ToastAndroid.show(value, 3000)
           });
    }

    _getJSNativeCost(){
           const start = +new Date();
           NativeModules.IntentModule.getJSNativeCost('JS Native Cost Test',(value)=>{
                const time = +new Date()-start;
                console.log('>>>>cost[getJSNativeCost]:', time);
                NativeModules.ToastAndroid.show(value+' cost:'+ time, 3000)
           });
    }

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

    componentDidMount() {
      console.log('>>>react#componentDidMount', +new Date());
      NativeModules.ToastAndroid.show('Toast 是原生支持的!', 3000);
      console.log('>>>react#componentDidMount#ToastAndroid.show', +new Date());

      NativeModules.IntentModule.getDataFromIntent(
          successMsg => this.setState({text: successMsg, navigateCount: 1}),
          errorMsg => this.setState({text: errorMsg, navigateCount: 1})
      );
    }

    componentWillUnmount() {
        if (Platform.OS === 'android') {
            BackAndroid.removeEventListener('hardwareBackPress', ()=>this._backButton());
        }
    }
}

const styles = StyleSheet.create({
    container: {
        flex: 1,
        justifyContent: 'center',
        alignItems: 'center',
        backgroundColor: '#F5FCFF',
    },
    welcome: {
        fontSize: 20,
        textAlign: 'center',
        margin: 10,
        color: 'red'
    },
    instructions: {
        textAlign: 'center',
        color: '#333333',
        marginTop: 15,
        marginBottom: 5,
        fontSize: 14
    },
});

AppRegistry.registerComponent('SmartReactApp', () => SmartReactApp);
