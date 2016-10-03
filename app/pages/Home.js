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
import React from 'react';
import {
  StyleSheet,
  Image,
  Text,
  Linking,
  View
} from 'react-native';

import ReadingToolbar from '../components/ReadingToolbar';
import Button from '../components/Button';

const aboutLogo = require('../images/about_logo.png');

class Home extends React.Component {
  onPress(url) {
    Linking.openURL(url);
  }

  render() {
    const { navigator } = this.props;
    return (
      <View style={styles.container}>
        <ReadingToolbar
          title="关于"
          navigator={navigator}
        />
        <View style={styles.content}>
          <View style={styles.center}>
            <Image
              style={styles.logo}
              source={aboutLogo}
            />
            <Text style={styles.version}>

            </Text>
            <Text style={styles.title}>
              SmartApp
            </Text>
            <Text style={styles.subtitle}>
              让生活更精彩
            </Text>
          </View>
        </View>
      </View>
    );
  }
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    flexDirection: 'column',
  },
  content: {
    flex: 1,
    backgroundColor: '#fcfcfc',
    justifyContent: 'center',
    paddingBottom: 10
  },
  center: {
    flex: 1,
    alignItems: 'center'
  },
  logo: {
    width: 110,
    height: 110,
    marginTop: 50
  },
  version: {
    fontSize: 16,
    textAlign: 'center',
    color: '#aaaaaa',
    marginTop: 5
  },
  title: {
    fontSize: 28,
    textAlign: 'center',
    color: '#313131',
    marginTop: 10
  },
  subtitle: {
    fontSize: 18,
    textAlign: 'center',
    color: '#4e4e4e'
  },
  disclaimerContent: {
    flexDirection: 'column'
  },
  disclaimer: {
    fontSize: 14,
    textAlign: 'center'
  },
  sourceContent: {
    flexDirection: 'row',
    marginTop: 8
  },
  source: {
    fontSize: 12,
    textAlign: 'center'
  },
  bottomContainer: {
    alignItems: 'center'
  }
});

export default Home;
