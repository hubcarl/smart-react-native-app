package com.react.smart.componet;

import android.app.Activity;
import android.content.Intent;
import android.content.SharedPreferences;
import android.text.TextUtils;

import com.facebook.react.bridge.Callback;
import com.facebook.react.bridge.Promise;
import com.facebook.react.bridge.ReactApplicationContext;
import com.facebook.react.bridge.ReactContextBaseJavaModule;
import com.facebook.react.bridge.ReactMethod;
import com.react.smart.test.ThirdReactActivity;
import com.react.smart.test.SecondNativeActivity;
import com.react.smart.test.SecondReactActivity;
import com.react.smart.test.WebViewActivity;


/**
 * Created by sky on 16/7/15.
 * https://github.com/hubcarl
 */
public class IntentModule extends ReactContextBaseJavaModule {

    private SharedPreferences sharedPreference;

    public IntentModule(ReactApplicationContext reactContext) {
        super(reactContext);
    }

    @Override
    public String getName() {
        return getClass().getSimpleName();
    }

    @ReactMethod
    public void getDataFromIntent(Callback successBack, Callback errorBack) {
        try {
            Activity currentActivity = getCurrentActivity();
            String result = currentActivity.getIntent().getStringExtra("fromAndroid");
            if (TextUtils.isEmpty(result)) {
                result = "注意：数据为空！";
            }
            successBack.invoke(result);
        } catch (Exception e) {
            errorBack.invoke(e.getMessage());
        }
    }

    @ReactMethod
    public void backActivity(int count) {
        if (count > 0) {
            try {
                Activity currentActivity = getCurrentActivity();
                currentActivity.finish();
            } catch (Exception e) {
                e.printStackTrace();
            }
        }
    }

    @ReactMethod
    public void openSecondActivity() {
        Activity currentActivity = getCurrentActivity();
        Intent intent = new Intent(currentActivity, WebViewActivity.class);
        currentActivity.startActivity(intent);
    }

    @ReactMethod
    public void openSecondReactActivity() {
        Activity currentActivity = getCurrentActivity();
        Intent intent = new Intent(currentActivity, SecondReactActivity.class);
        currentActivity.startActivity(intent);
    }

    @ReactMethod
    public void openThirdReactActivity() {
        Activity currentActivity = getCurrentActivity();
        Intent intent = new Intent(currentActivity, ThirdReactActivity.class);
        currentActivity.startActivity(intent);
    }

    @ReactMethod
    public void finishActivity(String result) {
        try {
            Activity currentActivity = getCurrentActivity();
            Intent intent = new Intent();
            intent.putExtra("fromReact", result);
            currentActivity.setResult(0, intent);
            currentActivity.finish();
        } catch (Exception e) {
            e.printStackTrace();
        }
    }

    @ReactMethod
    public void setCache(String key, String value, Callback successCallback, Callback errorCallback) {
        try {
            sharedPreference = getCurrentActivity().getSharedPreferences("rn_cache", 0);
            sharedPreference.edit().putString(key, value).commit();
            successCallback.invoke("save success");
        } catch (Exception e) {
            e.printStackTrace();
            errorCallback.invoke(e.getMessage());
        }
    }

    //Java中的方法需要导出才能给JS使用，要导出Java方法，需要使用@ReactMethod来注解，且方法的返回值只能是void。
    @ReactMethod
    public void getCache(String key, Callback callback) {
        callback.invoke(sharedPreference.getString(key, ""));
    }


    @ReactMethod
    public void setCachePromise(String key, String value, Promise promise) {
        try {
            sharedPreference = getCurrentActivity().getSharedPreferences("rn_cache", 0);
            sharedPreference.edit().putString(key, value).commit();
            promise.resolve("save success");
        } catch (Exception e) {
            e.printStackTrace();
            promise.reject("error",e.getMessage());
        }
    }

    @ReactMethod
    public void getCachePromise(String key, Promise promise) {
        promise.resolve(sharedPreference.getString(key, ""));
    }

    @ReactMethod
    public void getJSNativeCost(String value, Callback callback) {
        callback.invoke(value);
    }
}
