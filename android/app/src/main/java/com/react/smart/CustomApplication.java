package com.react.smart;

import android.app.Application;
import android.support.annotation.Nullable;

import android.util.Log;
import com.facebook.react.ReactApplication;
import com.facebook.react.ReactNativeHost;
import com.facebook.react.ReactPackage;
import com.facebook.react.bridge.ReactMarker;
import com.facebook.react.modules.network.OkHttpClientProvider;
import com.facebook.react.modules.network.ReactCookieJarContainer;
import com.facebook.react.shell.MainReactPackage;
import com.facebook.stetho.Stetho;
import com.facebook.stetho.okhttp3.StethoInterceptor;

import java.util.Arrays;
import java.util.List;
import java.util.concurrent.TimeUnit;

import okhttp3.OkHttpClient;

/**
 * Created by sky on 16/7/15.
 * https://github.com/hubcarl
 */
public class CustomApplication extends Application {

    public void onCreate(){
        Log.i("ReactNativeJS", ">>>react Application start:" + System.currentTimeMillis());


        // 开启ReactNative日志答应
        ReactMarker.setMarkerListener(new ReactMarker.MarkerListener(){
            @Override
            public void logMarker(String name) {
                Log.i("ReactNativeJS", name.toLowerCase() + " cost:" + System.currentTimeMillis());
            }
        });

        super.onCreate();
//        Stetho.initializeWithDefaults(this);
//        OkHttpClient client = new OkHttpClient.Builder()
//                .connectTimeout(0, TimeUnit.MILLISECONDS)
//                .readTimeout(0, TimeUnit.MILLISECONDS)
//                .writeTimeout(0, TimeUnit.MILLISECONDS)
//                .cookieJar(new ReactCookieJarContainer())
//                .addNetworkInterceptor(new StethoInterceptor())
//                .build();
//        OkHttpClientProvider.replaceOkHttpClient(client);
    }
}

