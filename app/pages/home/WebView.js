/**
* Created by sky on 16/7/17.
 */
'use strict';
import React,{Component} from 'react';

import {
    View,
    WebView,
    Platform
} from 'react-native';

export default class CustomWebView extends Component {

    constructor(props) {
        super(props);
    }

    render() {
        return (
            <View style={{flex:1,paddingTop:Platform.os==='ios'?20:0}}>
                <WebView startInLoadingState={true}
                         javaScriptEnabled={true}
                         source={{uri:this.props.url,method:'GET'}}/>
            </View>
        )
    }
}
