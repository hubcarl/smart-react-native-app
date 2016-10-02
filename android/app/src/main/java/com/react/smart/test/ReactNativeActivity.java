package com.react.smart.test;

import com.facebook.react.BuildConfig;
import com.facebook.react.ReactActivity;

/**
 * Created by sky on 16/7/15.
 */
public class ReactNativeActivity extends ReactActivity {
    /**
     * Returns the name of the main component registered from JavaScript.
     * This is used to schedule rendering of the component.
     */
    @Override
    protected String getMainComponentName() {
        return "SmartRectNativeApp";
    }


    /**
     * Returns whether dev mode should be enabled.
     * This enables e.g. the dev menu.
     */
    @Override
    protected boolean getUseDeveloperSupport() {
        return BuildConfig.DEBUG;
    }

}
