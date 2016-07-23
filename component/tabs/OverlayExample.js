import React from 'react';
import {
  View,
  StyleSheet,
  ScrollView,
} from 'react-native';

import ScrollableTabView, { DefaultTabBar, } from 'react-native-scrollable-tab-view';
import Icon from 'react-native-vector-icons/Ionicons';
import Category from '../home/Category'

// Using tabBarPosition='overlayTop' or 'overlayBottom' lets the content show through a
// semitransparent tab bar. Note that if you build a custom tab bar component, its outer container
// must consume a 'style' prop (e.g. <View style={this.props.style}) to support this feature.
export default React.createClass({
  render() {
    return <ScrollableTabView
      style={styles.container}
      tabBarUnderlineColor='#1E90FF' tabBarActiveTextColor='#1E90FF'
      renderTabBar={()=><DefaultTabBar backgroundColor='rgba(255, 255, 255, 0.7)' />}
      tabBarPosition='overlayTop'
    >
    <ScrollView tabLabel='Android'>
      <View style={styles.category}></View>
      <Category/>
      <View style={styles.category}></View>
    </ScrollView>
    <ScrollView tabLabel='iOS'>
      <Icon name='logo-android' color='#A4C639' size={300} style={styles.icon} />
      <Icon name='logo-android' color='black' size={300} style={styles.icon} />
      <Icon name='logo-android' color='brown' size={300} style={styles.icon} />
    </ScrollView>
    </ScrollableTabView>;
  },
});

const styles = StyleSheet.create({
  category: {
    height:48
  },
  container: {
    marginTop: 0,
  },
  icon: {
    width: 300,
    height: 300,
    alignSelf: 'center',
  },
});
