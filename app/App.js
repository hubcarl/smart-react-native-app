import React from 'react';
import {
  StyleSheet,
  Navigator,
  StatusBar,
  BackAndroid,
  View
} from 'react-native';


import Main from './pages/home/MainScreen';

let tempNavigator;
let isRemoved = false;

class App extends React.Component {
  static configureScene() {
    return Navigator.SceneConfigs.PushFromRight;
  }

  constructor(props) {
    super(props);
    this.renderScene = this.renderScene.bind(this);
    BackAndroid.addEventListener('hardwareBackPress', this.goBack);
  }

  goBack() {
    if (tempNavigator && tempNavigator.getCurrentRoutes().length > 1) {
      tempNavigator.pop();
      return true;
    }
    return false;
  }

  renderScene(route, navigator) {
    const Component = route.component;
    tempNavigator = navigator;
    if (route.name === 'Detail') {
      BackAndroid.removeEventListener('hardwareBackPress', this.goBack);
      isRemoved = true;
    } else if (isRemoved) {
      BackAndroid.addEventListener('hardwareBackPress', this.goBack);
    }
    return (
      <Component navigator={navigator} route={route} />
    );
  }

  render() {
    return (
      <View style={{ flex: 1 }}>
        <StatusBar
          backgroundColor="#3e9ce9"
          barStyle="light-content"
        />
        <Navigator
          style={styles.navigator}
          configureScene={this.configureScene}
          renderScene={this.renderScene}
          initialRoute={{
            component: Main,
            name: 'Main'
          }}
        />
      </View>
    );
  }
}

const styles = StyleSheet.create({
  navigator: {
    flex: 1
  }
});

export default App;
