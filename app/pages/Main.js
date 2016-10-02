/**
 *
 * Copyright 2016-present reading
 *
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 * http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 *
 */
import React, { PropTypes } from 'react';
import {
  StyleSheet,
  ListView,
  RefreshControl,
  ScrollView,
  Text,
  TouchableOpacity,
  InteractionManager,
  ActivityIndicator,
  DrawerLayoutAndroid,
  RecyclerViewBackedScrollView,
  Image,
  Dimensions,
  Platform,
  View,
  DeviceEventEmitter
} from 'react-native';

import DrawerLayout from 'react-native-drawer-layout';
import ScrollableTabView, { DefaultTabBar } from 'react-native-scrollable-tab-view';
import LoadingView from '../components/LoadingView';
import ReadingToolbar from '../components/ReadingToolbar';
import List from './List';
import About from './About';
import Feedback from './Feedback';

const homeImg = require('../images/home.png');
const categoryImg = require('../images/category.png');
const inspectionImg = require('../images/inspection.png');
const infoImg = require('../images/info.png');

class Main extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      dataSource: new ListView.DataSource({
        rowHasChanged: (row1, row2) => row1 !== row2,
      }),
      list: {}
    };
    this.renderItem = this.renderItem.bind(this);
    this.renderFooter = this.renderFooter.bind(this);
    this.renderNavigationView = this.renderNavigationView.bind(this);
    this.onIconClicked = this.onIconClicked.bind(this);
  }

  componentDidMount() {
    InteractionManager.runAfterInteractions(() => {

    });
  }

  componentWillReceiveProps(nextProps) {

  }

  componentWillUnmount() {

  }

  onScroll() {

  }

  onRefresh(id) {

  }

  onPress(item) {

  }

  onPressDrawerItem(index) {
    const { navigator } = this.props;
    this.drawer.closeDrawer();
    switch (index) {
      case 1:
        navigator.push({
          component: List,
          name: 'List'
        });
        break;
      case 2:
        navigator.push({
          component: Feedback,
          name: 'Feedback'
        });
        break;
      case 3:
        navigator.push({
          component: About,
          name: 'About'
        });
        break;
      default:
        break;
    }
  }

  onIconClicked() {
    this.drawer.openDrawer();
  }

  onEndReached(typeId) {

  }

  renderFooter() {
    return <View />;
  }

  renderItem(item) {
    return (
      <TouchableOpacity onPress={() => this.onPress(item)}>
        <View style={styles.containerItem}>
          <Image
            style={styles.itemImg}
            source={{ uri: item.contentImg }}
          />
          <View style={styles.itemRightContent} >
            <Text style={styles.title}>
              {item.title}
            </Text>
            <View style={styles.itemRightBottom} >
              <Text style={styles.userName} >
                {item.userName}
              </Text>
            </View>
          </View>
        </View>
      </TouchableOpacity>
    );
  }

  renderContent(dataSource, typeId) {
    const isEmpty = true;
    if (isEmpty) {
      return (
        <ScrollView
          automaticallyAdjustContentInsets={false}
          horizontal={false}
          contentContainerStyle={styles.no_data}
          style={styles.base}
          refreshControl={
            <RefreshControl
              style={styles.refreshControlBase}
              onRefresh={() => this.onRefresh(typeId)}
              title="Loading..."
              colors={['#ffaa66cc', '#ff00ddff', '#ffffbb33', '#ffff4444']}
            />
          }
        >
          <View style={{ alignItems: 'center' }}>
            <Text style={{ fontSize: 16 }}>
              目前没有数据，请刷新重试……
            </Text>
          </View>
        </ScrollView>
      );
    }
    return (
      <ListView
        initialListSize={1}
        dataSource={dataSource}
        renderRow={this.renderItem}
        style={styles.listView}
        onEndReached={() => this.onEndReached(typeId)}
        onEndReachedThreshold={10}
        onScroll={this.onScroll}
        renderFooter={this.renderFooter}
        renderScrollComponent={props => <RecyclerViewBackedScrollView {...props} />}
        refreshControl={
          <RefreshControl
            style={styles.refreshControlBase}
            onRefresh={() => this.onRefresh(typeId)}
            title="Loading..."
            colors={['#ffaa66cc', '#ff00ddff', '#ffffbb33', '#ffff4444']}
          />
        }
      />
    );
  }

  renderNavigationViewItem(image, title, index) {
    return (
      <TouchableOpacity
        style={styles.drawerContent}
        onPress={() => this.onPressDrawerItem(index)}
      >
        <Image
          style={styles.drawerIcon}
          source={image}
        />
        <Text style={styles.drawerText}>
          {title}
        </Text>
      </TouchableOpacity>
    );
  }

  renderNavigationView() {
    return (
      <View style={[styles.container, { backgroundColor: '#fcfcfc' }]}>
        <View style={styles.drawerTitleContent} >
          <Text style={styles.drawerTitle}>
            SmartApp
          </Text>
          <Text style={styles.drawerTitle}>
            让生活更精彩
          </Text>
        </View>
        {this.renderNavigationViewItem(homeImg, '首页', 0)}
        {this.renderNavigationViewItem(categoryImg, '分类', 1)}
        {this.renderNavigationViewItem(inspectionImg, '建议', 2)}
        {this.renderNavigationViewItem(infoImg, '关于', 3)}
      </View>
    );
  }

  render() {
    const { navigator } = this.props;
    return (
      <DrawerLayout
        ref={(ref) => { this.drawer = ref; }}
        drawerWidth={Dimensions.get('window').width / 5 * 3}
        drawerPosition={Platform.OS === 'android' ? DrawerLayoutAndroid.positions.Left : 'left'}
        renderNavigationView={this.renderNavigationView}
      >
        <View style={styles.container}>
          <ReadingToolbar
            title="ReactNative"
            navigator={navigator}
            onIconClicked={this.onIconClicked}
            navIconName="md-menu"
          />
          <ScrollableTabView
            renderTabBar={() =>
              <DefaultTabBar
                tabStyle={styles.tab}
                textStyle={styles.tabText}
              />
            }
            tabBarBackgroundColor="#fcfcfc"
            tabBarUnderlineStyle={styles.tabBarUnderline}
            tabBarActiveTextColor="#3e9ce9"
            tabBarInactiveTextColor="#aaaaaa"
          >
          <View />
          </ScrollableTabView>
        </View>
      </DrawerLayout>
    );
  }
}

const styles = StyleSheet.create({
  base: {
    flex: 1
  },
  container: {
    flex: 1,
    flexDirection: 'column',
    backgroundColor: '#FFF'
  },
  containerItem: {
    flexDirection: 'row',
    justifyContent: 'center',
    alignItems: 'center',
    backgroundColor: '#fcfcfc',
    padding: 10,
    borderBottomColor: '#ddd',
    borderBottomWidth: 1
  },
  title: {
    fontSize: 18,
    textAlign: 'left',
    color: 'black'
  },
  listView: {
    backgroundColor: '#eeeeec'
  },
  no_data: {
    flex: 1,
    alignItems: 'center',
    justifyContent: 'center',
    paddingBottom: 100
  },
  drawerContent: {
    flexDirection: 'row',
    alignItems: 'center',
    padding: 15,
    borderBottomWidth: 1,
    borderBottomColor: '#ddd'
  },
  drawerTitleContent: {
    height: 120,
    justifyContent: 'flex-end',
    padding: 20,
    backgroundColor: '#3e9ce9'
  },
  drawerIcon: {
    width: 30,
    height: 30,
    marginLeft: 5
  },
  drawerTitle: {
    fontSize: 20,
    textAlign: 'left',
    color: '#fcfcfc'
  },
  drawerText: {
    fontSize: 18,
    marginLeft: 15,
    textAlign: 'center',
    color: 'black'
  },
  footerContainer: {
    flex: 1,
    flexDirection: 'row',
    justifyContent: 'center',
    alignItems: 'center',
    padding: 5
  },
  footerText: {
    textAlign: 'center',
    fontSize: 16,
    marginLeft: 10
  },
  itemImg: {
    width: 88,
    height: 66,
    marginRight: 10
  },
  itemRightContent: {
    flex: 1,
    flexDirection: 'column'
  },
  itemRightBottom: {
    flex: 1,
    flexDirection: 'row',
    alignItems: 'center'
  },
  userName: {
    flex: 1,
    fontSize: 14,
    color: '#87CEFA',
    marginTop: 5,
    marginRight: 5
  },
  timeAgo: {
    fontSize: 14,
    color: '#aaaaaa',
    marginTop: 5
  },
  refreshControlBase: {
    backgroundColor: 'transparent'
  },
  tab: {
    paddingBottom: 0
  },
  tabText: {
    fontSize: 16
  },
  tabBarUnderline: {
    backgroundColor: '#3e9ce9',
    height: 2
  }
});

export default Main;
