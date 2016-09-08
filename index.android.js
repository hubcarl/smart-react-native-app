/**
 * Sample React Native App
 * https://github.com/facebook/react-native
 */
'use strict';

import React,{Component} from 'react';

import {
    AppRegistry,
    Navigator,
    StyleSheet,
    TouchableOpacity,
    BackAndroid,
    Text
} from 'react-native';

import MainScreen from './component/home/MainScreen';
import CustomWebView from './component/home/WebView';

class ReactTabApp extends Component {
    render() {
        return (
           <Navigator
               ref = {(navigator) => this.navigator = navigator}
               initialRoute={{name: 'main', index: 0, id:'main'}}
               configureScene={(route, routeStack) =>Navigator.SceneConfigs.FadeAndroid}
               renderScene={(route, navigator) => ReactTabApp._renderPage(route,navigator)}
           />
        )
    }

    static _renderPage(route, nav) {
        switch (route.id) {
            case 'main':
                return (<MainScreen nav={nav}/>);
                break;
            case 'webview':
                return (<CustomWebView url={route.url}/>);
                break;
        }
    }

    componentDidMount() {
        console.log('>>>react#componentDidMount', +new Date());
        var navigator = this.navigator;
        BackAndroid.addEventListener('hardwareBackPress', function() {
            if (navigator && navigator.getCurrentRoutes().length > 1) {
              navigator.pop();
              return true;
            }
            return false;
        });
    }

    componentWillUnmount() {
      BackAndroid.removeEventListener('hardwareBackPress');
    }
}

AppRegistry.registerComponent('SmartReactApp', () => ReactTabApp);
