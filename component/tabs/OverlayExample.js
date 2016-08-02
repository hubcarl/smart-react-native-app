import React from 'react';
import {
  View,
  StyleSheet,
  ScrollView,
} from 'react-native';

import ScrollableTabView, { DefaultTabBar, } from 'react-native-scrollable-tab-view';
import Icon from 'react-native-vector-icons/Ionicons';
import Category from '../home/Category'
import RefreshControlExample from '../test/pullrefresh'
import ListViewPullRefreshExample from '../test/ListViewPullRefreshExample'
import ListViewRefreshExample from '../test/ListViewRefreshExample'

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
    <View tabLabel='ListViewPullRefresh' style={{ flex: 1 }}>
      <ListViewPullRefreshExample marginTop={48} />
    </View>
    <View tabLabel='ListViewRefreshExample' style={{ flex: 1 }}>
      <View style={styles.category}></View>
      <ListViewRefreshExample/>
      <View style={styles.category}></View>
    </View>
    </ScrollableTabView>;
  },
});

const styles = StyleSheet.create({
  category: {
    height:48
  },
  container: {
    marginTop: 0,
    marginBottom: 0
  },
  icon: {
    width: 300,
    height: 300,
    alignSelf: 'center',
  },
});
