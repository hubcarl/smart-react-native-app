package com.react.smart.test;

import android.content.Context;
import android.content.SharedPreferences;
import android.webkit.JavascriptInterface;

/**
 * Created by sky on 16/9/17.
 */
public class WebViewJavaScriptInterface {

    private SharedPreferences sharedPreference;

    private Context context;

    public WebViewJavaScriptInterface(Context context){
        this.context = context;
    }

    @JavascriptInterface
    public void setCache(String key, String value) {
        try {
            sharedPreference = context.getSharedPreferences("rn_cache", 0);
            sharedPreference.edit().putString(key, value).commit();
        } catch (Exception e) {
            e.printStackTrace();
        }
    }

    @JavascriptInterface
    public String getCache(String key) {
        return sharedPreference.getString(key, "");
    }
}
