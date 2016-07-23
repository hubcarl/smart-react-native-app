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


class ThirdReactActivity extends Component {
    constructor(props){
        super(props);

        this.state = {
            text: 'Welcome to Third React Activity!',
            navigateCount: 0
        };
    }

    componentWillMount() {
        if (Platform.OS === 'android') {
            BackAndroid.addEventListener('hardwareBackPress', ()=>this._backButton());
        }
    }


    componentDidMount() {
     NativeModules.RNIntentModule.getDataFromIntent(
                 successMsg => this.setState({text: successMsg, navigateCount: 1}),
                 errorMsg => this.setState({text: errorMsg, navigateCount: 1})
            );
    }

    componentWillUnmount() {
        if (Platform.OS === 'android') {
            BackAndroid.removeEventListener('hardwareBackPress', ()=>this._backButton());
        }
    }

     _backButton(){
             const {navigateCount} = this.state;
             if (navigateCount) {
                 NativeModules.RNIntentModule.backActivity(navigateCount)
                 return true;
             }
             return false;
     }

    render() {
        return (
            <View style={styles.container}>
                <Text style={styles.welcome}>
                    {this.state.text}
                </Text>
                <Text style={styles.instructions}>
                    Shake or press menu button for dev menu
                </Text>
            </View>
        );
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
});

AppRegistry.registerComponent('ThirdReactActivity', () => ThirdReactActivity);
