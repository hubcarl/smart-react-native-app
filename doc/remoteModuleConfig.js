{
  "remoteModuleConfig": {
  "FrescoModule": {
    "moduleID": 0,
      "supportsWebWorkers": false,
      "methods": {}
  },
  "RNIntentModule": {
    "moduleID": 1,
      "supportsWebWorkers": false,
      "methods": {
      "openThirdReactActivity": {
        "methodID": 0,
          "type": "remote"
      },
      "openSecondReactActivity": {
        "methodID": 1,
          "type": "remote"
      },
      "getDataFromIntent": {
        "methodID": 2,
          "type": "remote"
      },
      "finishActivity": {
        "methodID": 3,
          "type": "remote"
      },
      "backActivity": {
        "methodID": 4,
          "type": "remote"
      },
      "openSecondActivity": {
        "methodID": 5,
          "type": "remote"
      }
    }
  },
  "RKTiming": {
    "moduleID": 2,
      "supportsWebWorkers": true,
      "methods": {
      "deleteTimer": {
        "methodID": 0,
          "type": "remote"
      },
      "createTimer": {
        "methodID": 1,
          "type": "remote"
      }
    }
  },
  "RCTNetworking": {
    "moduleID": 3,
      "supportsWebWorkers": true,
      "methods": {
      "clearCookies": {
        "methodID": 0,
          "type": "remote"
      },
      "abortRequest": {
        "methodID": 1,
          "type": "remote"
      },
      "sendRequest": {
        "methodID": 2,
          "type": "remote"
      }
    }
  },
  "RKCameraRollManager": {
    "moduleID": 4,
      "supportsWebWorkers": false,
      "methods": {
      "saveToCameraRoll": {
        "methodID": 0,
          "type": "remoteAsync"
      },
      "getPhotos": {
        "methodID": 1,
          "type": "remoteAsync"
      }
    }
  },
  "DeviceEventManager": {
    "moduleID": 5,
      "supportsWebWorkers": false,
      "methods": {
      "invokeDefaultBackPressHandler": {
        "methodID": 0,
          "type": "remote"
      }
    }
  },
  "AndroidConstants": {
    "moduleID": 6,
      "supportsWebWorkers": false,
      "methods": {},
    "constants": {
      "Version": 22,
        "ServerHost": "localhost:8081"
    }
  },
  "IntentAndroid": {
    "moduleID": 7,
      "supportsWebWorkers": false,
      "methods": {
      "openURL": {
        "methodID": 0,
          "type": "remoteAsync"
      },
      "getInitialURL": {
        "methodID": 1,
          "type": "remoteAsync"
      },
      "canOpenURL": {
        "methodID": 2,
          "type": "remoteAsync"
      }
    }
  },
  "AsyncSQLiteDBStorage": {
    "moduleID": 8,
      "supportsWebWorkers": false,
      "methods": {
      "multiRemove": {
        "methodID": 0,
          "type": "remote"
      },
      "getAllKeys": {
        "methodID": 1,
          "type": "remote"
      },
      "multiSet": {
        "methodID": 2,
          "type": "remote"
      },
      "clear": {
        "methodID": 3,
          "type": "remote"
      },
      "multiMerge": {
        "methodID": 4,
          "type": "remote"
      },
      "multiGet": {
        "methodID": 5,
          "type": "remote"
      }
    }
  },
  "DebugComponentOwnershipModule": {
    "moduleID": 9,
      "supportsWebWorkers": false,
      "methods": {
      "receiveOwnershipHierarchy": {
        "methodID": 0,
          "type": "remote"
      }
    }
  },
  "RKExceptionsManager": {
    "moduleID": 10,
      "supportsWebWorkers": false,
      "methods": {
      "reportSoftException": {
        "methodID": 0,
          "type": "remote"
      },
      "dismissRedbox": {
        "methodID": 1,
          "type": "remote"
      },
      "updateExceptionMessage": {
        "methodID": 2,
          "type": "remote"
      },
      "reportFatalException": {
        "methodID": 3,
          "type": "remote"
      }
    }
  },
  "ImageLoader": {
    "moduleID": 11,
      "supportsWebWorkers": false,
      "methods": {
      "prefetchImage": {
        "methodID": 0,
          "type": "remoteAsync"
      },
      "getSize": {
        "methodID": 1,
          "type": "remoteAsync"
      }
    }
  },
  "DialogManagerAndroid": {
    "moduleID": 12,
      "supportsWebWorkers": false,
      "methods": {
      "showAlert": {
        "methodID": 0,
          "type": "remote"
      }
    },
    "constants": {
      "buttonNegative": -2,
        "dismissed": "dismissed",
        "buttonNeutral": -3,
        "buttonClicked": "buttonClicked",
        "buttonPositive": -1
    }
  },
  "ToastAndroid": {
    "moduleID": 13,
      "supportsWebWorkers": false,
      "methods": {
      "show": {
        "methodID": 0,
          "type": "remote"
      }
    },
    "constants": {
      "LONG": 1,
        "SHORT": 0
    }
  },
  "AnimationsDebugModule": {
    "moduleID": 14,
      "supportsWebWorkers": false,
      "methods": {
      "stopRecordingFps": {
        "methodID": 0,
          "type": "remote"
      },
      "startRecordingFps": {
        "methodID": 1,
          "type": "remote"
      }
    }
  },
  "Vibration": {
    "moduleID": 15,
      "supportsWebWorkers": false,
      "methods": {
      "cancel": {
        "methodID": 0,
          "type": "remote"
      },
      "vibrateByPattern": {
        "methodID": 1,
          "type": "remote"
      },
      "vibrate": {
        "methodID": 2,
          "type": "remote"
      }
    }
  },
  "LocationObserver": {
    "moduleID": 16,
      "supportsWebWorkers": false,
      "methods": {
      "getCurrentPosition": {
        "methodID": 0,
          "type": "remote"
      },
      "stopObserving": {
        "methodID": 1,
          "type": "remote"
      },
      "startObserving": {
        "methodID": 2,
          "type": "remote"
      }
    }
  },
  "NetInfo": {
    "moduleID": 17,
      "supportsWebWorkers": false,
      "methods": {
      "getCurrentConnectivity": {
        "methodID": 0,
          "type": "remoteAsync"
      },
      "isConnectionMetered": {
        "methodID": 1,
          "type": "remoteAsync"
      }
    }
  },
  "AndroidPermissions": {
    "moduleID": 18,
      "supportsWebWorkers": false,
      "methods": {
      "shouldShowRequestPermissionRationale": {
        "methodID": 0,
          "type": "remote"
      },
      "requestPermission": {
        "methodID": 1,
          "type": "remote"
      },
      "checkPermission": {
        "methodID": 2,
          "type": "remote"
      }
    }
  },
  "ImageStoreManager": {
    "moduleID": 19,
      "supportsWebWorkers": false,
      "methods": {
      "getBase64ForTag": {
        "methodID": 0,
          "type": "remote"
      }
    }
  },
  "AppState": {
    "moduleID": 20,
      "supportsWebWorkers": false,
      "methods": {
      "getCurrentAppState": {
        "methodID": 0,
          "type": "remote"
      }
    }
  },
  "RKImageEditingManager": {
    "moduleID": 21,
      "supportsWebWorkers": false,
      "methods": {
      "cropImage": {
        "methodID": 0,
          "type": "remote"
      }
    }
  },
  "JSCHeapCapture": {
    "moduleID": 22,
      "supportsWebWorkers": false,
      "methods": {
      "operationComplete": {
        "methodID": 0,
          "type": "remote"
      }
    }
  },
  "RCTSourceCode": {
    "moduleID": 23,
      "supportsWebWorkers": false,
      "methods": {},
    "constants": {
      "scriptURL": "http://localhost:8081/debug.android.bundle?platform=android&dev=true&hot=false&minify=false"
    }
  },
  "RKUIManager": {
    "moduleID": 24,
      "supportsWebWorkers": false,
      "methods": {
      "setJSResponder": {
        "methodID": 0,
          "type": "remote"
      },
      "manageChildren": {
        "methodID": 1,
          "type": "remote"
      },
      "showPopupMenu": {
        "methodID": 2,
          "type": "remote"
      },
      "dispatchViewManagerCommand": {
        "methodID": 3,
          "type": "remote"
      },
      "findSubviewIn": {
        "methodID": 4,
          "type": "remote"
      },
      "setLayoutAnimationEnabledExperimental": {
        "methodID": 5,
          "type": "remote"
      },
      "measureLayoutRelativeToParent": {
        "methodID": 6,
          "type": "remote"
      },
      "sendAccessibilityEvent": {
        "methodID": 7,
          "type": "remote"
      },
      "removeSubviewsFromContainerWithID": {
        "methodID": 8,
          "type": "remote"
      },
      "setChildren": {
        "methodID": 9,
          "type": "remote"
      },
      "measureLayout": {
        "methodID": 10,
          "type": "remote"
      },
      "replaceExistingNonRootView": {
        "methodID": 11,
          "type": "remote"
      },
      "updateView": {
        "methodID": 12,
          "type": "remote"
      },
      "clearJSResponder": {
        "methodID": 13,
          "type": "remote"
      },
      "configureNextLayoutAnimation": {
        "methodID": 14,
          "type": "remote"
      },
      "removeRootView": {
        "methodID": 15,
          "type": "remote"
      },
      "measureInWindow": {
        "methodID": 16,
          "type": "remote"
      },
      "measure": {
        "methodID": 17,
          "type": "remote"
      },
      "createView": {
        "methodID": 18,
          "type": "remote"
      }
    },
    "constants": {
      "customBubblingEventTypes": {
        "topTouchStart": {
          "phasedRegistrationNames": {
            "captured": "onTouchStartCapture",
              "bubbled": "onTouchStart"
          }
        },
        "topEndEditing": {
          "phasedRegistrationNames": {
            "captured": "onEndEditingCapture",
              "bubbled": "onEndEditing"
          }
        },
        "topBlur": {
          "phasedRegistrationNames": {
            "captured": "onBlurCapture",
              "bubbled": "onBlur"
          }
        },
        "topTouchEnd": {
          "phasedRegistrationNames": {
            "captured": "onTouchEndCapture",
              "bubbled": "onTouchEnd"
          }
        },
        "topSelect": {
          "phasedRegistrationNames": {
            "captured": "onSelectCapture",
              "bubbled": "onSelect"
          }
        },
        "topTextInput": {
          "phasedRegistrationNames": {
            "captured": "onTextInputCapture",
              "bubbled": "onTextInput"
          }
        },
        "topChange": {
          "phasedRegistrationNames": {
            "captured": "onChangeCapture",
              "bubbled": "onChange"
          }
        },
        "topFocus": {
          "phasedRegistrationNames": {
            "captured": "onFocusCapture",
              "bubbled": "onFocus"
          }
        },
        "topSubmitEditing": {
          "phasedRegistrationNames": {
            "captured": "onSubmitEditingCapture",
              "bubbled": "onSubmitEditing"
          }
        },
        "topTouchMove": {
          "phasedRegistrationNames": {
            "captured": "onTouchMoveCapture",
              "bubbled": "onTouchMove"
          }
        }
      },
      "AndroidRecyclerViewBackedScrollView": {
        "NativeProps": {
          "opacity": "number",
            "renderToHardwareTextureAndroid": "boolean",
            "borderBottomWidth": "number",
            "scaleY": "number",
            "minWidth": "number",
            "position": "String",
            "paddingTop": "number",
            "borderWidth": "number",
            "marginLeft": "number",
            "marginHorizontal": "number",
            "paddingBottom": "number",
            "paddingHorizontal": "number",
            "scaleX": "number",
            "onLayout": "boolean",
            "flexWrap": "String",
            "borderTopWidth": "number",
            "borderRightWidth": "number",
            "marginTop": "number",
            "translateX": "number",
            "rotation": "number",
            "accessibilityLiveRegion": "String",
            "alignItems": "String",
            "accessibilityComponentType": "String",
            "paddingVertical": "number",
            "flex": "number",
            "marginBottom": "number",
            "bottom": "number",
            "maxWidth": "number",
            "justifyContent": "String",
            "padding": "number",
            "onContentSizeChange": "boolean",
            "elevation": "number",
            "minHeight": "number",
            "maxHeight": "number",
            "alignSelf": "String",
            "backgroundColor": "Color",
            "right": "number",
            "borderLeftWidth": "number",
            "height": "number",
            "left": "number",
            "translateY": "number",
            "paddingRight": "number",
            "transform": "Map",
            "flexDirection": "String",
            "importantForAccessibility": "String",
            "marginVertical": "number",
            "accessibilityLabel": "String",
            "width": "number",
            "paddingLeft": "number",
            "top": "number",
            "margin": "number",
            "decomposedMatrix": "Map",
            "marginRight": "number",
            "testID": "String"
        }
      },
      "RCTScrollView": {
        "Commands": {
          "scrollTo": 1
        },
        "NativeProps": {
          "opacity": "number",
            "renderToHardwareTextureAndroid": "boolean",
            "borderBottomWidth": "number",
            "scaleY": "number",
            "minWidth": "number",
            "position": "String",
            "paddingTop": "number",
            "borderWidth": "number",
            "marginLeft": "number",
            "removeClippedSubviews": "boolean",
            "marginHorizontal": "number",
            "paddingBottom": "number",
            "paddingHorizontal": "number",
            "scaleX": "number",
            "onLayout": "boolean",
            "flexWrap": "String",
            "borderTopWidth": "number",
            "borderRightWidth": "number",
            "marginTop": "number",
            "translateX": "number",
            "rotation": "number",
            "accessibilityLiveRegion": "String",
            "alignItems": "String",
            "accessibilityComponentType": "String",
            "paddingVertical": "number",
            "flex": "number",
            "scrollPerfTag": "String",
            "marginBottom": "number",
            "bottom": "number",
            "maxWidth": "number",
            "sendMomentumEvents": "boolean",
            "justifyContent": "String",
            "padding": "number",
            "scrollEnabled": "boolean",
            "elevation": "number",
            "minHeight": "number",
            "maxHeight": "number",
            "alignSelf": "String",
            "backgroundColor": "Color",
            "right": "number",
            "borderLeftWidth": "number",
            "showsVerticalScrollIndicator": "boolean",
            "height": "number",
            "left": "number",
            "translateY": "number",
            "paddingRight": "number",
            "transform": "Map",
            "endFillColor": "Color",
            "flexDirection": "String",
            "importantForAccessibility": "String",
            "marginVertical": "number",
            "accessibilityLabel": "String",
            "width": "number",
            "paddingLeft": "number",
            "top": "number",
            "margin": "number",
            "decomposedMatrix": "Map",
            "marginRight": "number",
            "testID": "String"
        }
      },
      "customDirectEventTypes": {
        "topRequestClose": {
          "registrationName": "onRequestClose"
        },
        "topScroll": {
          "registrationName": "onScroll"
        },
        "topDrawerStateChanged": {
          "registrationName": "onDrawerStateChanged"
        },
        "topScrollAnimationEnd": {
          "registrationName": "onScrollAnimationEnd"
        },
        "topLoadStart": {
          "registrationName": "onLoadStart"
        },
        "topContentSizeChange": {
          "registrationName": "onContentSizeChange"
        },
        "topLoadingError": {
          "registrationName": "onLoadingError"
        },
        "topLoadingFinish": {
          "registrationName": "onLoadingFinish"
        },
        "topPageScroll": {
          "registrationName": "onPageScroll"
        },
        "topPageSelected": {
          "registrationName": "onPageSelected"
        },
        "topLoadEnd": {
          "registrationName": "onLoadEnd"
        },
        "topScrollEndDrag": {
          "registrationName": "onScrollEndDrag"
        },
        "topSlidingComplete": {
          "registrationName": "onSlidingComplete"
        },
        "topSelectionChange": {
          "registrationName": "onSelectionChange"
        },
        "topLoadingStart": {
          "registrationName": "onLoadingStart"
        },
        "topDrawerClosed": {
          "registrationName": "onDrawerClose"
        },
        "topRefresh": {
          "registrationName": "onRefresh"
        },
        "topDrawerOpened": {
          "registrationName": "onDrawerOpen"
        },
        "topMomentumScrollBegin": {
          "registrationName": "onMomentumScrollBegin"
        },
        "topDrawerSlide": {
          "registrationName": "onDrawerSlide"
        },
        "topPageScrollStateChanged": {
          "registrationName": "onPageScrollStateChanged"
        },
        "topLayout": {
          "registrationName": "onLayout"
        },
        "topScrollBeginDrag": {
          "registrationName": "onScrollBeginDrag"
        },
        "topLoad": {
          "registrationName": "onLoad"
        },
        "topShow": {
          "registrationName": "onShow"
        },
        "topMomentumScrollEnd": {
          "registrationName": "onMomentumScrollEnd"
        }
      },
      "RCTWebView": {
        "Commands": {
          "goForward": 2,
            "reload": 3,
            "stopLoading": 4,
            "goBack": 1
        },
        "NativeProps": {
          "opacity": "number",
            "source": "Map",
            "renderToHardwareTextureAndroid": "boolean",
            "borderBottomWidth": "number",
            "scaleY": "number",
            "minWidth": "number",
            "position": "String",
            "paddingTop": "number",
            "borderWidth": "number",
            "javaScriptEnabled": "boolean",
            "marginLeft": "number",
            "marginHorizontal": "number",
            "paddingBottom": "number",
            "paddingHorizontal": "number",
            "scaleX": "number",
            "onLayout": "boolean",
            "flexWrap": "String",
            "borderTopWidth": "number",
            "borderRightWidth": "number",
            "marginTop": "number",
            "translateX": "number",
            "rotation": "number",
            "accessibilityLiveRegion": "String",
            "alignItems": "String",
            "accessibilityComponentType": "String",
            "paddingVertical": "number",
            "flex": "number",
            "marginBottom": "number",
            "bottom": "number",
            "maxWidth": "number",
            "scalesPageToFit": "boolean",
            "justifyContent": "String",
            "padding": "number",
            "mediaPlaybackRequiresUserAction": "boolean",
            "elevation": "number",
            "domStorageEnabled": "boolean",
            "minHeight": "number",
            "maxHeight": "number",
            "alignSelf": "String",
            "backgroundColor": "Color",
            "right": "number",
            "borderLeftWidth": "number",
            "height": "number",
            "left": "number",
            "translateY": "number",
            "paddingRight": "number",
            "transform": "Map",
            "injectedJavaScript": "String",
            "flexDirection": "String",
            "importantForAccessibility": "String",
            "marginVertical": "number",
            "accessibilityLabel": "String",
            "width": "number",
            "paddingLeft": "number",
            "top": "number",
            "margin": "number",
            "decomposedMatrix": "Map",
            "marginRight": "number",
            "userAgent": "String",
            "testID": "String"
        }
      },
      "RCTTextInlineImage": {
        "NativeProps": {
          "marginBottom": "number",
            "bottom": "number",
            "maxWidth": "number",
            "borderBottomWidth": "number",
            "minWidth": "number",
            "position": "String",
            "paddingTop": "number",
            "justifyContent": "String",
            "padding": "number",
            "src": "Array",
            "borderWidth": "number",
            "minHeight": "number",
            "marginLeft": "number",
            "maxHeight": "number",
            "marginHorizontal": "number",
            "alignSelf": "String",
            "right": "number",
            "borderLeftWidth": "number",
            "paddingBottom": "number",
            "paddingHorizontal": "number",
            "height": "number",
            "left": "number",
            "onLayout": "boolean",
            "paddingRight": "number",
            "flexWrap": "String",
            "borderTopWidth": "number",
            "borderRightWidth": "number",
            "marginTop": "number",
            "flexDirection": "String",
            "marginVertical": "number",
            "width": "number",
            "paddingLeft": "number",
            "top": "number",
            "margin": "number",
            "alignItems": "String",
            "paddingVertical": "number",
            "marginRight": "number",
            "flex": "number"
        }
      },
      "AndroidSwipeRefreshLayout": {
        "NativeProps": {
          "opacity": "number",
            "renderToHardwareTextureAndroid": "boolean",
            "size": "number",
            "progressViewOffset": "number",
            "borderBottomWidth": "number",
            "scaleY": "number",
            "minWidth": "number",
            "position": "String",
            "paddingTop": "number",
            "borderWidth": "number",
            "marginLeft": "number",
            "refreshing": "boolean",
            "progressBackgroundColor": "Color",
            "marginHorizontal": "number",
            "paddingBottom": "number",
            "paddingHorizontal": "number",
            "scaleX": "number",
            "onLayout": "boolean",
            "flexWrap": "String",
            "borderTopWidth": "number",
            "borderRightWidth": "number",
            "marginTop": "number",
            "translateX": "number",
            "rotation": "number",
            "accessibilityLiveRegion": "String",
            "alignItems": "String",
            "accessibilityComponentType": "String",
            "paddingVertical": "number",
            "flex": "number",
            "marginBottom": "number",
            "bottom": "number",
            "maxWidth": "number",
            "enabled": "boolean",
            "justifyContent": "String",
            "padding": "number",
            "elevation": "number",
            "minHeight": "number",
            "maxHeight": "number",
            "alignSelf": "String",
            "backgroundColor": "Color",
            "right": "number",
            "borderLeftWidth": "number",
            "height": "number",
            "left": "number",
            "translateY": "number",
            "paddingRight": "number",
            "transform": "Map",
            "flexDirection": "String",
            "colors": "ColorArray",
            "importantForAccessibility": "String",
            "marginVertical": "number",
            "accessibilityLabel": "String",
            "width": "number",
            "paddingLeft": "number",
            "top": "number",
            "margin": "number",
            "decomposedMatrix": "Map",
            "marginRight": "number",
            "testID": "String"
        },
        "Constants": {
          "SIZE": {
            "DEFAULT": 1,
              "LARGE": 0
          }
        }
      },
      "RCTText": {
        "NativeProps": {
          "opacity": "number",
            "renderToHardwareTextureAndroid": "boolean",
            "numberOfLines": "number",
            "borderBottomWidth": "number",
            "scaleY": "number",
            "minWidth": "number",
            "paddingTop": "number",
            "position": "String",
            "borderWidth": "number",
            "color": "number",
            "lineBreakMode": "String",
            "marginLeft": "number",
            "fontFamily": "String",
            "marginHorizontal": "number",
            "fontStyle": "String",
            "paddingHorizontal": "number",
            "paddingBottom": "number",
            "scaleX": "number",
            "onLayout": "boolean",
            "borderTopWidth": "number",
            "flexWrap": "String",
            "borderRightWidth": "number",
            "marginTop": "number",
            "translateX": "number",
            "textShadowColor": "Color",
            "rotation": "number",
            "accessibilityLiveRegion": "String",
            "alignItems": "String",
            "accessibilityComponentType": "String",
            "paddingVertical": "number",
            "flex": "number",
            "bottom": "number",
            "marginBottom": "number",
            "maxWidth": "number",
            "textAlign": "String",
            "textShadowRadius": "number",
            "textAlignVertical": "String",
            "justifyContent": "String",
            "fontWeight": "String",
            "padding": "number",
            "elevation": "number",
            "textShadowOffset": "Map",
            "minHeight": "number",
            "alignSelf": "String",
            "maxHeight": "number",
            "backgroundColor": "number",
            "borderLeftWidth": "number",
            "right": "number",
            "height": "number",
            "textDecorationLine": "String",
            "left": "number",
            "translateY": "number",
            "paddingRight": "number",
            "transform": "Map",
            "lineHeight": "number",
            "flexDirection": "String",
            "importantForAccessibility": "String",
            "fontSize": "number",
            "marginVertical": "number",
            "accessibilityLabel": "String",
            "text": "String",
            "paddingLeft": "number",
            "width": "number",
            "margin": "number",
            "top": "number",
            "decomposedMatrix": "Map",
            "marginRight": "number",
            "testID": "String"
        }
      },
      "AndroidTextInput": {
        "Commands": {
          "blurTextInput": 2,
            "focusTextInput": 1
        },
        "NativeProps": {
          "opacity": "number",
            "numberOfLines": "number",
            "renderToHardwareTextureAndroid": "boolean",
            "borderBottomWidth": "number",
            "autoCorrect": "boolean",
            "scaleY": "number",
            "minWidth": "number",
            "position": "String",
            "paddingTop": "number",
            "placeholderTextColor": "Color",
            "borderWidth": "number",
            "selectionColor": "Color",
            "onSelectionChange": "boolean",
            "color": "number",
            "marginLeft": "number",
            "editable": "boolean",
            "returnKeyLabel": "String",
            "fontFamily": "String",
            "underlineColorAndroid": "Color",
            "secureTextEntry": "boolean",
            "marginHorizontal": "number",
            "fontStyle": "String",
            "paddingBottom": "number",
            "paddingHorizontal": "number",
            "scaleX": "number",
            "onLayout": "boolean",
            "flexWrap": "String",
            "borderTopWidth": "number",
            "borderRightWidth": "number",
            "maxLength": "number",
            "marginTop": "number",
            "translateX": "number",
            "textShadowColor": "Color",
            "autoCapitalize": "number",
            "rotation": "number",
            "accessibilityLiveRegion": "String",
            "alignItems": "String",
            "accessibilityComponentType": "String",
            "paddingVertical": "number",
            "returnKeyType": "String",
            "flex": "number",
            "keyboardType": "String",
            "marginBottom": "number",
            "bottom": "number",
            "maxWidth": "number",
            "textAlign": "String",
            "textShadowRadius": "number",
            "textAlignVertical": "String",
            "justifyContent": "String",
            "selectTextOnFocus": "boolean",
            "fontWeight": "String",
            "padding": "number",
            "multiline": "boolean",
            "elevation": "number",
            "textShadowOffset": "Map",
            "minHeight": "number",
            "blurOnSubmit": "boolean",
            "maxHeight": "number",
            "alignSelf": "String",
            "backgroundColor": "number",
            "right": "number",
            "borderLeftWidth": "number",
            "height": "number",
            "textDecorationLine": "String",
            "left": "number",
            "translateY": "number",
            "paddingRight": "number",
            "transform": "Map",
            "lineHeight": "number",
            "mostRecentEventCount": "number",
            "flexDirection": "String",
            "importantForAccessibility": "String",
            "marginVertical": "number",
            "placeholder": "String",
            "fontSize": "number",
            "accessibilityLabel": "String",
            "width": "number",
            "paddingLeft": "number",
            "text": "String",
            "top": "number",
            "margin": "number",
            "decomposedMatrix": "Map",
            "marginRight": "number",
            "testID": "String"
        },
        "Constants": {
          "AutoCapitalizationType": {
            "words": 8192,
              "none": 0,
              "sentences": 16384,
              "characters": 4096
          }
        }
      },
      "StyleConstants": {
        "PointerEventsValues": {
          "none": 0,
            "unspecified": 3,
            "boxNone": 1,
            "boxOnly": 2
        }
      },
      "AndroidViewPager": {
        "Commands": {
          "setPage": 1,
            "setPageWithoutAnimation": 2
        },
        "NativeProps": {
          "opacity": "number",
            "renderToHardwareTextureAndroid": "boolean",
            "borderBottomWidth": "number",
            "scaleY": "number",
            "minWidth": "number",
            "position": "String",
            "paddingTop": "number",
            "borderWidth": "number",
            "marginLeft": "number",
            "marginHorizontal": "number",
            "paddingBottom": "number",
            "paddingHorizontal": "number",
            "scaleX": "number",
            "pageMargin": "number",
            "onLayout": "boolean",
            "flexWrap": "String",
            "borderTopWidth": "number",
            "borderRightWidth": "number",
            "marginTop": "number",
            "translateX": "number",
            "rotation": "number",
            "accessibilityLiveRegion": "String",
            "alignItems": "String",
            "accessibilityComponentType": "String",
            "paddingVertical": "number",
            "flex": "number",
            "marginBottom": "number",
            "bottom": "number",
            "maxWidth": "number",
            "justifyContent": "String",
            "padding": "number",
            "scrollEnabled": "boolean",
            "elevation": "number",
            "minHeight": "number",
            "maxHeight": "number",
            "alignSelf": "String",
            "backgroundColor": "Color",
            "right": "number",
            "borderLeftWidth": "number",
            "height": "number",
            "left": "number",
            "translateY": "number",
            "paddingRight": "number",
            "transform": "Map",
            "flexDirection": "String",
            "importantForAccessibility": "String",
            "marginVertical": "number",
            "accessibilityLabel": "String",
            "width": "number",
            "paddingLeft": "number",
            "top": "number",
            "margin": "number",
            "decomposedMatrix": "Map",
            "marginRight": "number",
            "testID": "String"
        }
      },
      "PopupMenu": {
        "itemSelected": "itemSelected",
          "dismissed": "dismissed"
      },
      "Dimensions": {
        "screenPhysicalPixels": {
          "densityDpi": 480,
            "height": 1920,
            "width": 1080,
            "scale": 3,
            "fontScale": 3
        },
        "windowPhysicalPixels": {
          "densityDpi": 480,
            "height": 1776,
            "width": 1080,
            "scale": 3,
            "fontScale": 3
        }
      },
      "RCTSlider": {
        "NativeProps": {
          "opacity": "number",
            "renderToHardwareTextureAndroid": "boolean",
            "borderBottomWidth": "number",
            "scaleY": "number",
            "minWidth": "number",
            "paddingTop": "number",
            "position": "String",
            "borderWidth": "number",
            "value": "number",
            "marginLeft": "number",
            "marginHorizontal": "number",
            "minimumValue": "number",
            "paddingHorizontal": "number",
            "paddingBottom": "number",
            "scaleX": "number",
            "onLayout": "boolean",
            "borderTopWidth": "number",
            "flexWrap": "String",
            "borderRightWidth": "number",
            "marginTop": "number",
            "translateX": "number",
            "maximumValue": "number",
            "rotation": "number",
            "accessibilityLiveRegion": "String",
            "alignItems": "String",
            "accessibilityComponentType": "String",
            "paddingVertical": "number",
            "flex": "number",
            "bottom": "number",
            "marginBottom": "number",
            "maxWidth": "number",
            "enabled": "boolean",
            "justifyContent": "String",
            "padding": "number",
            "elevation": "number",
            "minHeight": "number",
            "step": "number",
            "alignSelf": "String",
            "maxHeight": "number",
            "backgroundColor": "Color",
            "borderLeftWidth": "number",
            "right": "number",
            "height": "number",
            "left": "number",
            "translateY": "number",
            "paddingRight": "number",
            "transform": "Map",
            "flexDirection": "String",
            "importantForAccessibility": "String",
            "marginVertical": "number",
            "accessibilityLabel": "String",
            "paddingLeft": "number",
            "width": "number",
            "margin": "number",
            "top": "number",
            "decomposedMatrix": "Map",
            "marginRight": "number",
            "testID": "String"
        }
      },
      "AndroidHorizontalScrollView": {
        "NativeProps": {
          "opacity": "number",
            "renderToHardwareTextureAndroid": "boolean",
            "borderBottomWidth": "number",
            "scaleY": "number",
            "minWidth": "number",
            "position": "String",
            "paddingTop": "number",
            "borderWidth": "number",
            "marginLeft": "number",
            "removeClippedSubviews": "boolean",
            "marginHorizontal": "number",
            "paddingBottom": "number",
            "paddingHorizontal": "number",
            "scaleX": "number",
            "onLayout": "boolean",
            "flexWrap": "String",
            "borderTopWidth": "number",
            "showsHorizontalScrollIndicator": "boolean",
            "borderRightWidth": "number",
            "marginTop": "number",
            "translateX": "number",
            "rotation": "number",
            "accessibilityLiveRegion": "String",
            "alignItems": "String",
            "accessibilityComponentType": "String",
            "paddingVertical": "number",
            "flex": "number",
            "scrollPerfTag": "String",
            "marginBottom": "number",
            "bottom": "number",
            "maxWidth": "number",
            "sendMomentumEvents": "boolean",
            "pagingEnabled": "boolean",
            "justifyContent": "String",
            "padding": "number",
            "scrollEnabled": "boolean",
            "elevation": "number",
            "minHeight": "number",
            "maxHeight": "number",
            "alignSelf": "String",
            "backgroundColor": "Color",
            "right": "number",
            "borderLeftWidth": "number",
            "height": "number",
            "left": "number",
            "translateY": "number",
            "paddingRight": "number",
            "transform": "Map",
            "endFillColor": "Color",
            "flexDirection": "String",
            "importantForAccessibility": "String",
            "marginVertical": "number",
            "accessibilityLabel": "String",
            "width": "number",
            "paddingLeft": "number",
            "top": "number",
            "margin": "number",
            "decomposedMatrix": "Map",
            "marginRight": "number",
            "testID": "String"
        }
      },
      "ARTGroup": {
        "NativeProps": {
          "clipping": "Array",
            "opacity": "number",
            "transform": "Array"
        }
      },
      "AndroidProgressBar": {
        "NativeProps": {
          "opacity": "number",
            "renderToHardwareTextureAndroid": "boolean",
            "borderBottomWidth": "number",
            "scaleY": "number",
            "minWidth": "number",
            "paddingTop": "number",
            "position": "String",
            "borderWidth": "number",
            "color": "Color",
            "marginLeft": "number",
            "marginHorizontal": "number",
            "paddingHorizontal": "number",
            "paddingBottom": "number",
            "scaleX": "number",
            "onLayout": "boolean",
            "borderTopWidth": "number",
            "flexWrap": "String",
            "borderRightWidth": "number",
            "marginTop": "number",
            "translateX": "number",
            "indeterminate": "boolean",
            "animating": "boolean",
            "rotation": "number",
            "accessibilityLiveRegion": "String",
            "alignItems": "String",
            "accessibilityComponentType": "String",
            "paddingVertical": "number",
            "flex": "number",
            "bottom": "number",
            "marginBottom": "number",
            "maxWidth": "number",
            "progress": "number",
            "justifyContent": "String",
            "padding": "number",
            "elevation": "number",
            "minHeight": "number",
            "alignSelf": "String",
            "maxHeight": "number",
            "backgroundColor": "Color",
            "borderLeftWidth": "number",
            "right": "number",
            "height": "number",
            "left": "number",
            "translateY": "number",
            "paddingRight": "number",
            "transform": "Map",
            "flexDirection": "String",
            "importantForAccessibility": "String",
            "marginVertical": "number",
            "accessibilityLabel": "String",
            "paddingLeft": "number",
            "width": "number",
            "margin": "number",
            "top": "number",
            "decomposedMatrix": "Map",
            "marginRight": "number",
            "testID": "String",
            "styleAttr": "String"
        }
      },
      "RCTVirtualText": {
        "NativeProps": {
          "opacity": "number",
            "renderToHardwareTextureAndroid": "boolean",
            "numberOfLines": "number",
            "borderBottomWidth": "number",
            "scaleY": "number",
            "minWidth": "number",
            "paddingTop": "number",
            "position": "String",
            "borderWidth": "number",
            "color": "number",
            "lineBreakMode": "String",
            "marginLeft": "number",
            "fontFamily": "String",
            "marginHorizontal": "number",
            "fontStyle": "String",
            "paddingHorizontal": "number",
            "paddingBottom": "number",
            "scaleX": "number",
            "onLayout": "boolean",
            "borderTopWidth": "number",
            "flexWrap": "String",
            "borderRightWidth": "number",
            "marginTop": "number",
            "translateX": "number",
            "textShadowColor": "Color",
            "rotation": "number",
            "accessibilityLiveRegion": "String",
            "alignItems": "String",
            "accessibilityComponentType": "String",
            "paddingVertical": "number",
            "flex": "number",
            "bottom": "number",
            "marginBottom": "number",
            "maxWidth": "number",
            "textAlign": "String",
            "textShadowRadius": "number",
            "textAlignVertical": "String",
            "justifyContent": "String",
            "fontWeight": "String",
            "padding": "number",
            "elevation": "number",
            "textShadowOffset": "Map",
            "minHeight": "number",
            "alignSelf": "String",
            "maxHeight": "number",
            "backgroundColor": "number",
            "borderLeftWidth": "number",
            "right": "number",
            "height": "number",
            "textDecorationLine": "String",
            "left": "number",
            "translateY": "number",
            "paddingRight": "number",
            "transform": "Map",
            "lineHeight": "number",
            "flexDirection": "String",
            "importantForAccessibility": "String",
            "fontSize": "number",
            "marginVertical": "number",
            "accessibilityLabel": "String",
            "text": "String",
            "paddingLeft": "number",
            "width": "number",
            "margin": "number",
            "top": "number",
            "decomposedMatrix": "Map",
            "marginRight": "number",
            "testID": "String"
        }
      },
      "ARTText": {
        "NativeProps": {
          "frame": "Map",
            "strokeCap": "number",
            "opacity": "number",
            "stroke": "Array",
            "d": "Array",
            "strokeDash": "Array",
            "strokeWidth": "number",
            "fill": "Array",
            "strokeJoin": "number",
            "alignment": "number",
            "transform": "Array"
        }
      },
      "AccessibilityEventTypes": {
        "typeViewClicked": 1,
          "typeWindowStateChanged": 32
      },
      "AndroidDialogPicker": {
        "NativeProps": {
          "opacity": "number",
            "renderToHardwareTextureAndroid": "boolean",
            "borderBottomWidth": "number",
            "scaleY": "number",
            "minWidth": "number",
            "position": "String",
            "paddingTop": "number",
            "borderWidth": "number",
            "color": "Color",
            "marginLeft": "number",
            "marginHorizontal": "number",
            "paddingBottom": "number",
            "paddingHorizontal": "number",
            "scaleX": "number",
            "onLayout": "boolean",
            "flexWrap": "String",
            "borderTopWidth": "number",
            "borderRightWidth": "number",
            "items": "Array",
            "marginTop": "number",
            "translateX": "number",
            "rotation": "number",
            "accessibilityLiveRegion": "String",
            "alignItems": "String",
            "accessibilityComponentType": "String",
            "paddingVertical": "number",
            "flex": "number",
            "marginBottom": "number",
            "bottom": "number",
            "maxWidth": "number",
            "prompt": "String",
            "enabled": "boolean",
            "justifyContent": "String",
            "padding": "number",
            "elevation": "number",
            "minHeight": "number",
            "maxHeight": "number",
            "alignSelf": "String",
            "backgroundColor": "Color",
            "selected": "number",
            "right": "number",
            "borderLeftWidth": "number",
            "height": "number",
            "left": "number",
            "translateY": "number",
            "paddingRight": "number",
            "transform": "Map",
            "flexDirection": "String",
            "importantForAccessibility": "String",
            "marginVertical": "number",
            "accessibilityLabel": "String",
            "width": "number",
            "paddingLeft": "number",
            "top": "number",
            "margin": "number",
            "decomposedMatrix": "Map",
            "marginRight": "number",
            "testID": "String"
        }
      },
      "RCTModalHostView": {
        "NativeProps": {
          "opacity": "number",
            "renderToHardwareTextureAndroid": "boolean",
            "borderBottomWidth": "number",
            "scaleY": "number",
            "minWidth": "number",
            "paddingTop": "number",
            "position": "String",
            "borderWidth": "number",
            "marginLeft": "number",
            "marginHorizontal": "number",
            "paddingHorizontal": "number",
            "paddingBottom": "number",
            "scaleX": "number",
            "onLayout": "boolean",
            "borderTopWidth": "number",
            "flexWrap": "String",
            "borderRightWidth": "number",
            "marginTop": "number",
            "translateX": "number",
            "rotation": "number",
            "accessibilityLiveRegion": "String",
            "alignItems": "String",
            "accessibilityComponentType": "String",
            "paddingVertical": "number",
            "transparent": "boolean",
            "flex": "number",
            "bottom": "number",
            "marginBottom": "number",
            "maxWidth": "number",
            "justifyContent": "String",
            "padding": "number",
            "elevation": "number",
            "minHeight": "number",
            "alignSelf": "String",
            "maxHeight": "number",
            "backgroundColor": "Color",
            "borderLeftWidth": "number",
            "right": "number",
            "height": "number",
            "left": "number",
            "translateY": "number",
            "paddingRight": "number",
            "transform": "Map",
            "flexDirection": "String",
            "importantForAccessibility": "String",
            "marginVertical": "number",
            "accessibilityLabel": "String",
            "paddingLeft": "number",
            "width": "number",
            "margin": "number",
            "top": "number",
            "animationType": "String",
            "decomposedMatrix": "Map",
            "marginRight": "number",
            "testID": "String"
        },
        "Constants": {
          "StatusBarHeight": 25
        }
      },
      "AndroidSwitch": {
        "NativeProps": {
          "opacity": "number",
            "renderToHardwareTextureAndroid": "boolean",
            "on": "boolean",
            "borderBottomWidth": "number",
            "scaleY": "number",
            "minWidth": "number",
            "paddingTop": "number",
            "position": "String",
            "borderWidth": "number",
            "marginLeft": "number",
            "marginHorizontal": "number",
            "paddingHorizontal": "number",
            "paddingBottom": "number",
            "scaleX": "number",
            "onLayout": "boolean",
            "borderTopWidth": "number",
            "flexWrap": "String",
            "borderRightWidth": "number",
            "marginTop": "number",
            "translateX": "number",
            "rotation": "number",
            "accessibilityLiveRegion": "String",
            "alignItems": "String",
            "accessibilityComponentType": "String",
            "paddingVertical": "number",
            "flex": "number",
            "bottom": "number",
            "marginBottom": "number",
            "maxWidth": "number",
            "enabled": "boolean",
            "justifyContent": "String",
            "padding": "number",
            "elevation": "number",
            "minHeight": "number",
            "alignSelf": "String",
            "maxHeight": "number",
            "backgroundColor": "Color",
            "borderLeftWidth": "number",
            "right": "number",
            "height": "number",
            "left": "number",
            "translateY": "number",
            "paddingRight": "number",
            "transform": "Map",
            "flexDirection": "String",
            "importantForAccessibility": "String",
            "marginVertical": "number",
            "accessibilityLabel": "String",
            "paddingLeft": "number",
            "width": "number",
            "margin": "number",
            "top": "number",
            "decomposedMatrix": "Map",
            "marginRight": "number",
            "testID": "String"
        }
      },
      "RCTRawText": {
        "NativeProps": {
          "opacity": "number",
            "numberOfLines": "number",
            "renderToHardwareTextureAndroid": "boolean",
            "borderBottomWidth": "number",
            "scaleY": "number",
            "minWidth": "number",
            "paddingTop": "number",
            "position": "String",
            "borderWidth": "number",
            "color": "number",
            "lineBreakMode": "String",
            "marginLeft": "number",
            "fontFamily": "String",
            "marginHorizontal": "number",
            "fontStyle": "String",
            "paddingHorizontal": "number",
            "paddingBottom": "number",
            "scaleX": "number",
            "onLayout": "boolean",
            "borderTopWidth": "number",
            "flexWrap": "String",
            "borderRightWidth": "number",
            "marginTop": "number",
            "translateX": "number",
            "textShadowColor": "Color",
            "rotation": "number",
            "accessibilityLiveRegion": "String",
            "alignItems": "String",
            "accessibilityComponentType": "String",
            "paddingVertical": "number",
            "flex": "number",
            "bottom": "number",
            "marginBottom": "number",
            "maxWidth": "number",
            "textAlign": "String",
            "textShadowRadius": "number",
            "textAlignVertical": "String",
            "justifyContent": "String",
            "fontWeight": "String",
            "padding": "number",
            "elevation": "number",
            "textShadowOffset": "Map",
            "minHeight": "number",
            "alignSelf": "String",
            "maxHeight": "number",
            "backgroundColor": "number",
            "borderLeftWidth": "number",
            "right": "number",
            "height": "number",
            "textDecorationLine": "String",
            "left": "number",
            "translateY": "number",
            "paddingRight": "number",
            "transform": "Map",
            "lineHeight": "number",
            "flexDirection": "String",
            "importantForAccessibility": "String",
            "fontSize": "number",
            "marginVertical": "number",
            "accessibilityLabel": "String",
            "text": "String",
            "paddingLeft": "number",
            "width": "number",
            "margin": "number",
            "top": "number",
            "decomposedMatrix": "Map",
            "marginRight": "number",
            "testID": "String"
        }
      },
      "ARTSurfaceView": {
        "NativeProps": {
          "opacity": "number",
            "renderToHardwareTextureAndroid": "boolean",
            "borderBottomWidth": "number",
            "scaleY": "number",
            "minWidth": "number",
            "paddingTop": "number",
            "position": "String",
            "borderWidth": "number",
            "marginLeft": "number",
            "marginHorizontal": "number",
            "paddingHorizontal": "number",
            "paddingBottom": "number",
            "scaleX": "number",
            "onLayout": "boolean",
            "borderTopWidth": "number",
            "flexWrap": "String",
            "borderRightWidth": "number",
            "marginTop": "number",
            "translateX": "number",
            "rotation": "number",
            "accessibilityLiveRegion": "String",
            "alignItems": "String",
            "accessibilityComponentType": "String",
            "paddingVertical": "number",
            "flex": "number",
            "bottom": "number",
            "marginBottom": "number",
            "maxWidth": "number",
            "justifyContent": "String",
            "padding": "number",
            "elevation": "number",
            "minHeight": "number",
            "alignSelf": "String",
            "maxHeight": "number",
            "backgroundColor": "Color",
            "borderLeftWidth": "number",
            "right": "number",
            "height": "number",
            "left": "number",
            "translateY": "number",
            "paddingRight": "number",
            "transform": "Map",
            "flexDirection": "String",
            "importantForAccessibility": "String",
            "marginVertical": "number",
            "accessibilityLabel": "String",
            "paddingLeft": "number",
            "width": "number",
            "margin": "number",
            "top": "number",
            "decomposedMatrix": "Map",
            "marginRight": "number",
            "testID": "String"
        }
      },
      "UIView": {
        "ContentMode": {
          "ScaleAspectFill": 6,
            "ScaleAspectFit": 3,
            "ScaleAspectCenter": 7
        }
      },
      "RCTView": {
        "Commands": {
          "setPressed": 2,
            "hotspotUpdate": 1
        },
        "NativeProps": {
          "opacity": "number",
            "renderToHardwareTextureAndroid": "boolean",
            "borderBottomLeftRadius": "number",
            "borderBottomWidth": "number",
            "scaleY": "number",
            "minWidth": "number",
            "position": "String",
            "paddingTop": "number",
            "borderWidth": "number",
            "hitSlop": "Map",
            "marginLeft": "number",
            "removeClippedSubviews": "boolean",
            "borderRightColor": "Color",
            "marginHorizontal": "number",
            "borderTopLeftRadius": "number",
            "paddingBottom": "number",
            "paddingHorizontal": "number",
            "scaleX": "number",
            "onLayout": "boolean",
            "flexWrap": "String",
            "borderTopWidth": "number",
            "collapsable": "boolean",
            "borderRightWidth": "number",
            "marginTop": "number",
            "translateX": "number",
            "accessible": "boolean",
            "rotation": "number",
            "accessibilityLiveRegion": "String",
            "alignItems": "String",
            "accessibilityComponentType": "String",
            "paddingVertical": "number",
            "pointerEvents": "String",
            "flex": "number",
            "marginBottom": "number",
            "bottom": "number",
            "maxWidth": "number",
            "borderTopColor": "Color",
            "borderRadius": "number",
            "justifyContent": "String",
            "padding": "number",
            "borderColor": "Color",
            "elevation": "number",
            "minHeight": "number",
            "borderStyle": "String",
            "borderLeftColor": "Color",
            "maxHeight": "number",
            "alignSelf": "String",
            "backgroundColor": "Color",
            "right": "number",
            "borderLeftWidth": "number",
            "height": "number",
            "left": "number",
            "translateY": "number",
            "paddingRight": "number",
            "transform": "Map",
            "needsOffscreenAlphaCompositing": "boolean",
            "flexDirection": "String",
            "importantForAccessibility": "String",
            "nativeBackgroundAndroid": "Map",
            "borderBottomColor": "Color",
            "marginVertical": "number",
            "accessibilityLabel": "String",
            "width": "number",
            "paddingLeft": "number",
            "top": "number",
            "margin": "number",
            "borderBottomRightRadius": "number",
            "borderTopRightRadius": "number",
            "decomposedMatrix": "Map",
            "marginRight": "number",
            "testID": "String"
        }
      },
      "ToolbarAndroid": {
        "NativeProps": {
          "opacity": "number",
            "renderToHardwareTextureAndroid": "boolean",
            "borderBottomWidth": "number",
            "scaleY": "number",
            "subtitle": "String",
            "minWidth": "number",
            "position": "String",
            "paddingTop": "number",
            "borderWidth": "number",
            "rtl": "boolean",
            "marginLeft": "number",
            "titleColor": "Color",
            "marginHorizontal": "number",
            "paddingBottom": "number",
            "paddingHorizontal": "number",
            "scaleX": "number",
            "onLayout": "boolean",
            "flexWrap": "String",
            "borderTopWidth": "number",
            "borderRightWidth": "number",
            "nativeActions": "Array",
            "marginTop": "number",
            "translateX": "number",
            "rotation": "number",
            "accessibilityLiveRegion": "String",
            "alignItems": "String",
            "accessibilityComponentType": "String",
            "paddingVertical": "number",
            "logo": "Map",
            "flex": "number",
            "marginBottom": "number",
            "bottom": "number",
            "maxWidth": "number",
            "contentInsetStart": "number",
            "justifyContent": "String",
            "padding": "number",
            "elevation": "number",
            "minHeight": "number",
            "subtitleColor": "Color",
            "overflowIcon": "Map",
            "maxHeight": "number",
            "alignSelf": "String",
            "backgroundColor": "Color",
            "right": "number",
            "borderLeftWidth": "number",
            "navIcon": "Map",
            "height": "number",
            "left": "number",
            "translateY": "number",
            "paddingRight": "number",
            "transform": "Map",
            "flexDirection": "String",
            "title": "String",
            "importantForAccessibility": "String",
            "marginVertical": "number",
            "accessibilityLabel": "String",
            "width": "number",
            "paddingLeft": "number",
            "top": "number",
            "margin": "number",
            "contentInsetEnd": "number",
            "decomposedMatrix": "Map",
            "marginRight": "number",
            "testID": "String"
        },
        "Constants": {
          "ShowAsAction": {
            "always": 2,
              "never": 0,
              "ifRoom": 1
          }
        }
      },
      "RCTImageView": {
        "NativeProps": {
          "tintColor": "Color",
            "opacity": "number",
            "renderToHardwareTextureAndroid": "boolean",
            "borderBottomLeftRadius": "number",
            "borderBottomWidth": "number",
            "scaleY": "number",
            "minWidth": "number",
            "position": "String",
            "paddingTop": "number",
            "borderWidth": "number",
            "marginLeft": "number",
            "marginHorizontal": "number",
            "borderTopLeftRadius": "number",
            "paddingBottom": "number",
            "paddingHorizontal": "number",
            "scaleX": "number",
            "onLayout": "boolean",
            "flexWrap": "String",
            "borderTopWidth": "number",
            "borderRightWidth": "number",
            "marginTop": "number",
            "translateX": "number",
            "rotation": "number",
            "accessibilityLiveRegion": "String",
            "alignItems": "String",
            "accessibilityComponentType": "String",
            "paddingVertical": "number",
            "overlayColor": "number",
            "flex": "number",
            "marginBottom": "number",
            "bottom": "number",
            "maxWidth": "number",
            "shouldNotifyLoadEvents": "boolean",
            "borderRadius": "number",
            "justifyContent": "String",
            "resizeMode": "String",
            "loadingIndicatorSrc": "String",
            "padding": "number",
            "src": "Array",
            "fadeDuration": "number",
            "borderColor": "Color",
            "elevation": "number",
            "minHeight": "number",
            "maxHeight": "number",
            "alignSelf": "String",
            "backgroundColor": "Color",
            "right": "number",
            "borderLeftWidth": "number",
            "height": "number",
            "left": "number",
            "translateY": "number",
            "paddingRight": "number",
            "transform": "Map",
            "flexDirection": "String",
            "progressiveRenderingEnabled": "boolean",
            "importantForAccessibility": "String",
            "marginVertical": "number",
            "accessibilityLabel": "String",
            "width": "number",
            "paddingLeft": "number",
            "top": "number",
            "margin": "number",
            "borderBottomRightRadius": "number",
            "borderTopRightRadius": "number",
            "decomposedMatrix": "Map",
            "marginRight": "number",
            "testID": "String"
        }
      },
      "AndroidDropdownPicker": {
        "NativeProps": {
          "opacity": "number",
            "renderToHardwareTextureAndroid": "boolean",
            "borderBottomWidth": "number",
            "scaleY": "number",
            "minWidth": "number",
            "position": "String",
            "paddingTop": "number",
            "borderWidth": "number",
            "color": "Color",
            "marginLeft": "number",
            "marginHorizontal": "number",
            "paddingBottom": "number",
            "paddingHorizontal": "number",
            "scaleX": "number",
            "onLayout": "boolean",
            "flexWrap": "String",
            "borderTopWidth": "number",
            "borderRightWidth": "number",
            "items": "Array",
            "marginTop": "number",
            "translateX": "number",
            "rotation": "number",
            "accessibilityLiveRegion": "String",
            "alignItems": "String",
            "accessibilityComponentType": "String",
            "paddingVertical": "number",
            "flex": "number",
            "marginBottom": "number",
            "bottom": "number",
            "maxWidth": "number",
            "prompt": "String",
            "enabled": "boolean",
            "justifyContent": "String",
            "padding": "number",
            "elevation": "number",
            "minHeight": "number",
            "maxHeight": "number",
            "alignSelf": "String",
            "backgroundColor": "Color",
            "selected": "number",
            "right": "number",
            "borderLeftWidth": "number",
            "height": "number",
            "left": "number",
            "translateY": "number",
            "paddingRight": "number",
            "transform": "Map",
            "flexDirection": "String",
            "importantForAccessibility": "String",
            "marginVertical": "number",
            "accessibilityLabel": "String",
            "width": "number",
            "paddingLeft": "number",
            "top": "number",
            "margin": "number",
            "decomposedMatrix": "Map",
            "marginRight": "number",
            "testID": "String"
        }
      },
      "ARTShape": {
        "NativeProps": {
          "strokeCap": "number",
            "opacity": "number",
            "stroke": "Array",
            "strokeDash": "Array",
            "d": "Array",
            "strokeWidth": "number",
            "strokeJoin": "number",
            "fill": "Array",
            "transform": "Array"
        }
      },
      "AndroidDrawerLayout": {
        "Commands": {
          "openDrawer": 1,
            "closeDrawer": 2
        },
        "NativeProps": {
          "opacity": "number",
            "renderToHardwareTextureAndroid": "boolean",
            "borderBottomWidth": "number",
            "scaleY": "number",
            "minWidth": "number",
            "position": "String",
            "paddingTop": "number",
            "borderWidth": "number",
            "marginLeft": "number",
            "marginHorizontal": "number",
            "paddingBottom": "number",
            "paddingHorizontal": "number",
            "scaleX": "number",
            "onLayout": "boolean",
            "flexWrap": "String",
            "borderTopWidth": "number",
            "borderRightWidth": "number",
            "marginTop": "number",
            "drawerPosition": "number",
            "translateX": "number",
            "rotation": "number",
            "accessibilityLiveRegion": "String",
            "alignItems": "String",
            "accessibilityComponentType": "String",
            "paddingVertical": "number",
            "flex": "number",
            "marginBottom": "number",
            "bottom": "number",
            "maxWidth": "number",
            "drawerWidth": "number",
            "justifyContent": "String",
            "drawerLockMode": "String",
            "padding": "number",
            "elevation": "number",
            "minHeight": "number",
            "maxHeight": "number",
            "alignSelf": "String",
            "backgroundColor": "Color",
            "right": "number",
            "borderLeftWidth": "number",
            "height": "number",
            "left": "number",
            "translateY": "number",
            "paddingRight": "number",
            "transform": "Map",
            "flexDirection": "String",
            "importantForAccessibility": "String",
            "marginVertical": "number",
            "accessibilityLabel": "String",
            "width": "number",
            "paddingLeft": "number",
            "top": "number",
            "margin": "number",
            "decomposedMatrix": "Map",
            "marginRight": "number",
            "testID": "String"
        },
        "Constants": {
          "DrawerPosition": {
            "Right": 8388613,
              "Left": 8388611
          }
        }
      }
    }
  },
  "WebSocketModule": {
    "moduleID": 25,
      "supportsWebWorkers": false,
      "methods": {
      "sendBinary": {
        "methodID": 0,
          "type": "remote"
      },
      "connect": {
        "methodID": 1,
          "type": "remote"
      },
      "send": {
        "methodID": 2,
          "type": "remote"
      },
      "close": {
        "methodID": 3,
          "type": "remote"
      }
    }
  },
  "StatusBarManager": {
    "moduleID": 26,
      "supportsWebWorkers": false,
      "methods": {
      "setTranslucent": {
        "methodID": 0,
          "type": "remoteAsync"
      },
      "setHidden": {
        "methodID": 1,
          "type": "remoteAsync"
      },
      "setColor": {
        "methodID": 2,
          "type": "remoteAsync"
      }
    },
    "constants": {
      "HEIGHT": 25
    }
  },
  "TimePickerAndroid": {
    "moduleID": 27,
      "supportsWebWorkers": false,
      "methods": {
      "open": {
        "methodID": 0,
          "type": "remoteAsync"
      }
    }
  },
  "Clipboard": {
    "moduleID": 28,
      "supportsWebWorkers": false,
      "methods": {
      "setString": {
        "methodID": 0,
          "type": "remote"
      },
      "getString": {
        "methodID": 1,
          "type": "remoteAsync"
      }
    }
  },
  "DatePickerAndroid": {
    "moduleID": 29,
      "supportsWebWorkers": false,
      "methods": {
      "open": {
        "methodID": 0,
          "type": "remoteAsync"
      }
    }
  }
}
}