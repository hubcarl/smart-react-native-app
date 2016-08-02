/**
 * Sample React Native App
 * https://github.com/facebook/react-native
 */
'use strict';

var React = require('react');
var {
  StyleSheet,
  Text,
  View,
  Alert,
  TouchableHighlight,
  Platform,
  ActivityIndicator
} = require('react-native');

var ListViewPullRefresh= require('../common/ListViewPullRefresh');
var DEFAULT_MARGIN_TOP = 0;
var ListViewPullRefreshExample = React.createClass({
  propTypes: {
      marginTop : React.PropTypes.number
  },

  getDefaultProps () {
     return {
       marginTop: DEFAULT_MARGIN_TOP
     };
  },
  /**
   * Will be called when refreshing
   * Should be replaced by your own logic
   * @param {number} page Requested page to fetch
   * @param {function} callback Should pass the rows
   * @param {object} options Inform if first load
   */
  _onFetch(page = 1, callback, options) {
    setTimeout(() => {
      var header = 'Header '+page;
      var rows = {};
      var list=[];
      for(var i=1;i<=10;i++){
        list.push({key:(page - 1) * 10 + i, value:'row '+((page - 1) * 10 + i)});
      }
      rows[header] = list;
      if (page === 5) {
        callback(rows, {
          allLoaded: true, // the end of the list is reached
        });
      } else if(page<5){
        callback(rows);
      }
    }, 1000);
  },


  /**
   * When a row is touched
   * @param {object} rowData Row data
   */
  _onPress(rowData) {
    Alert.alert(JSON.stringify(rowData)+' pressed');
  },

  /**
   * Render a row
   * @param {object} rowData Row data
   */
  _renderRowView(rowData) {
    return (
      <View style={customStyles.rowContainer}>
        <TouchableHighlight
          style={customStyles.row}
          underlayColor='#c8c7cc'
          onPress={() => this._onPress(rowData)}
        >
          <Text>{rowData.value}</Text>
        </TouchableHighlight>
      </View>

    );
  },

  /**
   * Render a row
   * @param {object} rowData Row data
   */
  _renderSectionHeaderView(sectionData, sectionID) {
    return (
      <View style={customStyles.header}>
        <Text style={customStyles.headerTitle}>
          {sectionID}
        </Text>
      </View>
    );
  },

  /**
   * Render the refreshable view when waiting for refresh
   * On Android, the view should be touchable to trigger the refreshCallback
   * @param {function} refreshCallback The function to call to refresh the listview
   */
  _renderRefreshableWaitingView(refreshCallback) {
    if (Platform.OS !== 'android') {
      return (
        <View style={customStyles.refreshableView}>
          <Text style={customStyles.actionsLabel}>
            ↓
          </Text>
        </View>
      );
    } else {
      return (
        <TouchableHighlight
          underlayColor='#c8c7cc'
          onPress={refreshCallback}
          style={customStyles.refreshableView}
        >
          <Text style={customStyles.actionsLabel}>
            ↻
          </Text>
        </TouchableHighlight>
      );
    }
  },

  /**
   * Render the refreshable view when the pull to refresh has been activated
   * @platform ios
   */
  _renderRefreshableWillRefreshView() {
    return (
      <View style={customStyles.refreshableView}>
        <Text style={customStyles.actionsLabel}>
          ↻
        </Text>
      </View>
    );
  },

  /**
   * Render the refreshable view when fetching
   */
  _renderRefreshableFetchingView() {
    return (
      <View style={customStyles.refreshableView}>
      <ActivityIndicator
        animating={true}
        size="small"
        {...this.props}
        />
      </View>
    );
  },

  /**
   * Render the pagination view when waiting for touch
   * @param {function} paginateCallback The function to call to load more rows
   */
  _renderPaginationWaitingView(paginateCallback) {
    return (
      <TouchableHighlight
        underlayColor='#c8c7cc'
        onPress={paginateCallback}
        style={customStyles.paginationView}
      >
        <Text style={[customStyles.actionsLabel, {fontSize: 13}]}>
          Load more
        </Text>
      </TouchableHighlight>
    );
  },

  /**
   * Render the pagination view when fetching
   */
  _renderPaginationFetchigView() {
    return (
      <View style={customStyles.paginationView}>
        <ActivityIndicator
          animating={true}
          size="small"
          {...this.props}
          />
      </View>
    );
  },

  /**
   * Render the pagination view when end of list is reached
   */
  _renderPaginationAllLoadedView() {
    return (
      <View style={customStyles.paginationView}>
        <Text style={customStyles.actionsLabel}>
          ~
        </Text>
      </View>
    );
  },

  /**
   * Render a view when there is no row to display at the first fetch
   * @param {function} refreshCallback The function to call to refresh the listview
   */
  _renderEmptyView(refreshCallback) {
    return (
      <View style={customStyles.defaultView}>
        <Text style={customStyles.defaultViewTitle}>
          Sorry, there is no content to display
        </Text>

        <TouchableHighlight
          underlayColor='#c8c7cc'
          onPress={refreshCallback}
        >
          <Text>
            ↻
          </Text>
        </TouchableHighlight>
      </View>
    );
  },

  /**
   * Render a separator between rows
   */
  _renderSeparatorView(sectionID, rowID, adjacentRowHighlighted) {
    return (
      <View style={customStyles.separator} key={`${sectionID}-${rowID}`} />
    );
  },

  render() {
    return (
      <View style={{marginTop:this.props.marginTop,flex: 1, backgroundColor: '#FFF'}}>

        <ListViewPullRefresh
          rowView={this._renderRowView}
          onFetch={this._onFetch}
          initialListSize={8} // the maximum number of rows displayable without scrolling (height of the listview / height of row)
          pagingEnabled = {false}
          firstLoader={true} // display a loader for the first fetching
          pagination={true} // enable infinite scrolling using touch to load more
          paginationFetchigView={this._renderPaginationFetchigView}
          paginationAllLoadedView={this._renderPaginationAllLoadedView}
          paginationWaitingView={this._renderPaginationWaitingView}

          refreshable={true} // enable pull-to-refresh for iOS and touch-to-refresh for Android
          refreshableViewHeight={50} // correct height is mandatory
          refreshableDistance={40} // the distance to trigger the pull-to-refresh - better to have it lower than refreshableViewHeight
          refreshableFetchingView={this._renderRefreshableFetchingView}
          refreshableWillRefreshView={this._renderRefreshableWillRefreshView}
          refreshableWaitingView={this._renderRefreshableWaitingView}

          emptyView={this._renderEmptyView}

          //renderSeparator={this._renderSeparatorView}

          withSections={true} // enable sections
          // sectionHeaderView={this._renderSectionHeaderView}

          PullToRefreshViewAndroidProps={{
            colors: ['#fff'],
            progressBackgroundColor: '#003e82',
          }}

          rowHasChanged={(r1,r2)=>{
            r1.id !== r2.id
          }}
          distinctRows={(rows)=>{
            var indentitis = {};
            var newRows = [];
            for(var i = 0;i<rows.length; i++){
              if(indentitis[rows[i].id]){

              }else{
                indentitis[rows[i].id]=true;
                newRows.push(rows[i]);
              }
            }
            return newRows;
          }}
        />
      </View>
    );
  }
});


var customStyles = {
  separator: {
    height: 1,
    backgroundColor: '#CCC'
  },
  refreshableView: {
    height: 50,
    backgroundColor: '#fff',
    justifyContent: 'center',
    alignItems: 'center',
  },
  actionsLabel: {
    fontSize: 20,
    color: '#007aff',
  },
  paginationView: {
    height: 44,
    justifyContent: 'center',
    alignItems: 'center',
    backgroundColor: '#FFF',
  },
  defaultView: {
    justifyContent: 'center',
    alignItems: 'center',
    padding: 20,
  },
  defaultViewTitle: {
    fontSize: 16,
    fontWeight: 'bold',
    marginBottom: 15,
  },
  rowContainer:{
    borderBottomColor:'#CCC',
    borderBottomWidth:1
  },
  row: {
    padding: 10,
    height: 44,
  },
  header: {
    backgroundColor: '#50a4ff',
    padding: 10,
  },
  headerTitle: {
    color: '#fff',
  },
};

var screenStyles = {
  container: {
    flex: 1,
    backgroundColor: '#FFF',
  },
  navBar: {
    height: 64,
    backgroundColor: '#007aff',

    justifyContent: 'center',
    alignItems: 'center',
  },
  navBarTitle: {
    color: '#fff',
    fontSize: 16,
    marginTop: 12,
  }
};

module.exports = ListViewPullRefreshExample;
