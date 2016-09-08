package com.react.smart;

import android.app.Application;
import android.support.annotation.Nullable;

import com.facebook.react.ReactApplication;
import com.facebook.react.ReactNativeHost;
import com.facebook.react.ReactPackage;
import com.facebook.react.shell.MainReactPackage;
import com.react.smart.componet.Package;

import java.util.Arrays;
import java.util.List;

/**
 * Created by sky on 16/7/15.
 */
public class CustomReactApplication extends Application implements ReactApplication {
    private final ReactNativeHost mReactNativeHost = new ReactNativeHost(this) {
        @Override
        public String getJSMainModuleName() {
            return "index.android";
        }

        @Override
        public @Nullable
        String getBundleAssetName() {
            return "index.android.bundle";
        }

        @Override
        protected boolean getUseDeveloperSupport() {
            return true;
        }

        @Override
        protected List<ReactPackage> getPackages() {
            return Arrays.<ReactPackage>asList(
                    new MainReactPackage(),
                    new Package()
            );
        }
    };

    @Override
    public ReactNativeHost getReactNativeHost() {
        return mReactNativeHost;
    }
}

