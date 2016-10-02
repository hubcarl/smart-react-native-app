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
    View,
    Image,
    Navigator,
    DrawerLayoutAndroid,
    ScrollView,
    ListView

  } from 'react-native';

  import {
      Card, Button, Avatar, Drawer, Divider, COLOR, TYPO
  } from 'react-native-material-design';

class DrawReactApp extends Component {
    constructor(props){
        super(props);

        var ds = new ListView.DataSource( {rowHasChanged: (r1, r2) => r1 !== r2} );

        this.state = {
            route: 'home',
            theme:null,
            text: 'Welcome to React Native!',
            navigateCount: 0,
            dataSource : ds.cloneWithRows(['CLOTHES','PACKAGES','SHOES',])
        };
    }

    componentWillMount() {
        if (Platform.OS === 'android') {
            BackAndroid.addEventListener('hardwareBackPress', ()=>this._backButton());
        }
     }

    onNavPress(target) {
        this.navigator.push({
            name: target
        });

        this.setState({
            route: target
        });

        //关闭drawer
        this.refs['DRAWER'].closeDrawer();
    }

    render() {
     var navigationView = (
         <Drawer theme='light'>
             <Drawer.Header image={<Image source={{ uri: "http://facebook.github.io/react-native/img/opengraph.png?2" }}  />}>
                 <View style={styles.header}>
                     <Avatar size={80} image={<Image source={require('./images/search.png')}/>} />
                     <Text style={[styles.text, COLOR.paperGrey50, TYPO.paperFontSubhead]}>React Native</Text>
                 </View>
             </Drawer.Header>
             <Drawer.Section
                 items={[{
                     icon: 'home',
                     value: '首页',
                     active: !this.state.route || this.state.route  === 'home',
                     onPress: () => this.onNavPress('home'),
                     onLongPress: () => this.onNavPress('home')
                 },
                 {
                     icon: 'message',
                     value: '消息',
                     active: !this.state.route  || this.state.route  === 'message',
                     onPress: () => this.onNavPress('message'),
                     onLongPress: () => this.onNavPress('message')
                 },
                 {
                     icon: 'search',
                     value: '发现',
                     active: !this.state.route  || this.state.route  === 'discover',
                     onPress: () => this.onNavPress('discover'),
                     onLongPress: () => this.onNavPress('discover')
                 },
                 {
                     icon: 'settings',
                     value: '我的',
                     active: !this.state.route  || this.state.route  === 'user',
                     onPress: () => this.onNavPress('user'),
                     onLongPress: () => this.onNavPress('user')
                 }]}
             />
         </Drawer>
     );

     return (
         <DrawerLayoutAndroid
             ref={'DRAWER'}
             drawerWidth = {200}
             drawerPosition={Platform.OS === 'android' ? DrawerLayoutAndroid.positions.Left : 'left'}
             renderNavigationView={() => navigationView}>
             <Navigator
                ref={(navigator) => { this.navigator = navigator }}
                initialRoute ={{name: 'home'}}
                configureScene={(route, routeStack) =>
                    Navigator.SceneConfigs.FloatFromLeft}
                renderScene={(route, navigator) =><Text>Hello {route.name}!</Text>}
                >
            </Navigator>
         </DrawerLayoutAndroid>
     )
   }


    componentDidMount() {

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
        fontSize: 14,
    },
    contentContainer: {

     },
     listItem:{

     },
     photoRow:{
       flexDirection:'row',
       justifyContent: 'space-between',
       paddingLeft: 20,
       paddingRight: 20,
       marginTop:10,
     },
     photoItem:{
       height: 120,
       width:90 ,
       alignItems: 'stretch' ,
       alignSelf:'center'
     },
     photoName:{
       fontSize:14,
       color:'#f39d7f',
       alignSelf:'center',
     },
     photoPrice:{
       fontSize:12,  color:'#484848', alignSelf:'center'
     }
});

AppRegistry.registerComponent('DrawReactApp', () => DrawReactApp);
