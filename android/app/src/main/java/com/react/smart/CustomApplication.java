package com.react.smart;

import android.app.Application;
import android.util.Log;
import com.facebook.react.bridge.ReactMarker;



/**
 * Created by sky on 16/7/15.
 * https://github.com/hubcarl
 */
public class CustomApplication extends Application {

    @Override
    public void onCreate(){
        super.onCreate();
        Log.i("ReactNativeJS", ">>>react Application start:" + System.currentTimeMillis());


        // 开启ReactNative日志答应
        ReactMarker.setMarkerListener(new ReactMarker.MarkerListener(){
            @Override
            public void logMarker(String name) {
                Log.i("ReactNativeJS", name.toLowerCase() + " cost:" + System.currentTimeMillis());
            }
        });
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

