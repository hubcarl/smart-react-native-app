package com.react.smart;

import android.app.Activity;
import android.content.Intent;
import android.text.TextUtils;

import com.facebook.react.bridge.Callback;
import com.facebook.react.bridge.ReactApplicationContext;
import com.facebook.react.bridge.ReactContextBaseJavaModule;
import com.facebook.react.bridge.ReactMethod;


/**
 * Created by sky on 16/7/15.
 */
public class RNIntentModule extends ReactContextBaseJavaModule {

    public RNIntentModule(ReactApplicationContext reactContext) {
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
        Intent intent = new Intent(currentActivity, SecondNativeActivity.class);
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
}