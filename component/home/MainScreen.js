/**
 * Created by sky on 16/7/17.
 */
'use strict';
import React,{Component} from 'react';

import {
    StyleSheet,
    Image,
    Text,
    View,
    Alert,
    Navigator
} from 'react-native';

import Header from './Header';
import HomePage from './HomePage';
import TabNavigator from 'react-native-tab-navigator';

import Category from './Category'
import TabsExample from '../tabs/index'
import TabOverlayExample from '../tabs/OverlayExample'

const TAB_HOME = 'tab_home';
const TAB_HOME_NORMAL = require('../../images/tabs/widget_bar_news_nor.png');
const TAB_HOME_FOCUS = require('../../images/tabs/widget_bar_news_over.png');

const TAB_TWEET = 'tab_tweet';
const TAB_TWEET_NORMAL = require('../../images/tabs/widget_bar_tweet_nor.png');
const TAB_TWEET_FOCUS = require('../../images/tabs/widget_bar_tweet_over.png');

const TAB_FIND = 'tab_find';
const TAB_FIND_NORMAL = require('../../images/tabs/widget_bar_explore_nor.png');
const TAB_FIND_FOCUS = require('../../images/tabs/widget_bar_explore_over.png');

const TAB_ME = 'tab_me';
const TAB_ME_NORMAL = require('../../images/tabs/widget_bar_me_nor.png');
const TAB_ME_FOCUS = require('../../images/tabs/widget_bar_me_over.png');

export default class MainScreen extends Component {

    constructor(props) {
        super(props);
        this.state = {selectedTab: TAB_HOME}
    }

    _renderTabItem(img, selectedImg, tag, childView) {
        return (
            <TabNavigator.Item
                selected={this.state.selectedTab === tag}
                renderIcon={() => <Image style={styles.tabIcon} source={img}/>}
                renderSelectedIcon={() => <Image style={styles.tabIcon} source={selectedImg}/>}
                onPress={() => this.setState({ selectedTab: tag })}>
                {childView}
            </TabNavigator.Item>
        );
    }

    static _createChildView(tag) {
        //Alert.alert('提示', 'tag:' + tag);
        if(tag === TAB_TWEET){
          return <TabOverlayExample />
        }else if(tag === TAB_FIND){
          return <TabsExample />
        }else if(tag === TAB_ME){
            return <Category />
        }else{
          return (
              <View style={{flex:1,backgroundColor:'#ffffff',alignItems:'center',justifyContent:'center'}}>
                  <Text style={{fontSize:22}}>{tag}</Text>
              </View>
          )
        }
    }

    render() {
        return (
            <View style={{flex: 1}}>
                <Header />
                <TabNavigator hidesTabTouch={true} tabBarStyle={styles.tab}>
                    {this._renderTabItem(TAB_HOME_NORMAL, TAB_HOME_FOCUS, TAB_HOME, <HomePage nav={this.props.nav}/>)}
                    {this._renderTabItem(TAB_TWEET_NORMAL, TAB_TWEET_FOCUS, TAB_TWEET, MainScreen._createChildView(TAB_TWEET))}
                    {this._renderTabItem(TAB_FIND_NORMAL, TAB_FIND_FOCUS, TAB_FIND, MainScreen._createChildView(TAB_FIND))}
                    {this._renderTabItem(TAB_ME_NORMAL, TAB_ME_FOCUS, TAB_ME, MainScreen._createChildView(TAB_ME))}
                </TabNavigator>
            </View >
        );
    }
}

const styles = StyleSheet.create({
    tab: {
        height: 48,
        backgroundColor: '#ffffff',
        alignItems: 'center',
    },
    tabIcon: {
        width: 30,
        height: 36,
        resizeMode: 'stretch',
        marginTop: 6
    }
});
