package com.react.smart;

import android.app.Activity;
import android.app.DownloadManager;
import android.content.BroadcastReceiver;
import android.content.Context;
import android.content.Intent;
import android.content.IntentFilter;
import android.net.Uri;
import android.os.Bundle;
import android.os.Environment;
import android.os.Handler;
import android.util.Log;
import android.view.KeyEvent;
import android.widget.Toast;

import com.facebook.react.JSCConfig;
import com.facebook.react.LifecycleState;
import com.facebook.react.ReactInstanceManager;
import com.facebook.react.ReactRootView;
import com.facebook.react.modules.core.DefaultHardwareBackBtnHandler;
import com.facebook.react.shell.MainReactPackage;
import com.react.smart.componet.IntentPackage;
import com.react.smart.utils.FileAssetUtils;

import java.io.File;
import java.lang.reflect.Field;
import java.lang.reflect.InvocationTargetException;
import java.lang.reflect.Method;
/**
 * Created by sky on 16/7/15.
 * https://github.com/hubcarl
 */
/**
 * Created by sky on 16/9/4.
 *
 */
public class UpdateReactActivity extends Activity implements DefaultHardwareBackBtnHandler {

    private static final String TAG = "UpdateReactActivity";

    public static final String JS_BUNDLE_REMOTE_URL = "https://raw.githubusercontent.com/hubcarl/smart-react-native-app/debug/app/src/main/assets/index.android.bundle";
    public static final String JS_BUNDLE_LOCAL_FILE = "debug.android.bundle";
    public static final String JS_BUNDLE_REACT_UPDATE_PATH = Environment.getExternalStorageDirectory().toString() + File.separator + "react_native_update";
    public static final String JS_BUNDLE_LOCAL_PATH = JS_BUNDLE_REACT_UPDATE_PATH + File.separator + JS_BUNDLE_LOCAL_FILE;

    private ReactInstanceManager mReactInstanceManager;
    private ReactRootView mReactRootView;
    private CompleteReceiver mDownloadCompleteReceiver;
    private long mDownloadId;

    @Override
    protected void onCreate(Bundle savedInstanceState) {
        super.onCreate(savedInstanceState);
        iniReactRootView(true);
        initDownloadManager();
        updateJSBundle(true);
    }

    // 如果bundle在sd卡【 比如bundle在file://sdcard/react_native_update/index.android.bundle 那么图片目录在file://sdcard/react_native_update/drawable-mdpi】
    // 如果你的bundle在assets里，图片资源要放到res文件夹里,例如res/drawable-mdpi
    private void iniReactRootView(boolean isRelease) {
        Log.i("ReactNativeJS",">>>react react start:"+System.currentTimeMillis());
        ReactInstanceManager.Builder builder = ReactInstanceManager.builder()
                .setCurrentActivity(this)
                .setApplication(getApplication())
                .setJSMainModuleName(JS_BUNDLE_LOCAL_FILE)
                .addPackage(new MainReactPackage())
                .addPackage(new IntentPackage())
                .setInitialLifecycleState(LifecycleState.RESUMED);

        File file = new File(JS_BUNDLE_LOCAL_PATH);
        if (isRelease && file != null && file.exists()) {
            builder.setJSBundleFile(JS_BUNDLE_LOCAL_PATH);
            Log.i(TAG, "load bundle from local cache");
        } else {
            builder.setBundleAssetName(JS_BUNDLE_LOCAL_FILE);
            Log.i(TAG, "load bundle from asset");
        }

        mReactRootView = new ReactRootView(this);
        mReactInstanceManager = builder.build();
        mReactRootView.startReactApplication(mReactInstanceManager, "SmartReactApp", null);
        setContentView(mReactRootView);
        Log.i("ReactNativeJS", ">>>react react end:"+System.currentTimeMillis());
    }

    private void updateJSBundle(boolean isRelease) {

        final File file = new File(JS_BUNDLE_LOCAL_PATH);
        if (isRelease && file != null && file.exists()) {
            Log.i(TAG, "new bundle exists !");
            new Handler().postDelayed(new Runnable() {
                @Override
                public void run() {
                    file.delete();
                    Log.i(TAG, "js bundle file delete success");
                }
            }, 5000);
            return;
        }


        File rootDir = new File(JS_BUNDLE_REACT_UPDATE_PATH);
        if (rootDir != null && !rootDir.exists()) {
            rootDir.mkdir();
        }

        File res = new File(JS_BUNDLE_REACT_UPDATE_PATH + File.separator + "drawable-mdpi");
        if (res != null && !res.exists()) {
            res.mkdir();
        }

        FileAssetUtils.copyAssets(this, "drawable-mdpi", JS_BUNDLE_REACT_UPDATE_PATH);


        DownloadManager.Request request = new DownloadManager.Request(Uri.parse(JS_BUNDLE_REMOTE_URL));
        request.setAllowedNetworkTypes(DownloadManager.Request.NETWORK_WIFI);
        request.setDestinationUri(Uri.parse("file://" + JS_BUNDLE_LOCAL_PATH));
        DownloadManager dm = (DownloadManager) getSystemService(Context.DOWNLOAD_SERVICE);
        mDownloadId = dm.enqueue(request);

        Log.i(TAG, "start download remote js bundle file");
    }

    private void initDownloadManager() {
        mDownloadCompleteReceiver = new CompleteReceiver();
        registerReceiver(mDownloadCompleteReceiver, new IntentFilter(DownloadManager.ACTION_DOWNLOAD_COMPLETE));
    }

    private class CompleteReceiver extends BroadcastReceiver {

        @Override
        public void onReceive(Context context, Intent intent) {
            long completeDownloadId = intent.getLongExtra(DownloadManager.EXTRA_DOWNLOAD_ID, -1);
            if (completeDownloadId == mDownloadId) {
                onJSBundleLoadedFromServer();
            }
        }
    }

    private void onJSBundleLoadedFromServer() {
        final File file = new File(JS_BUNDLE_LOCAL_PATH);
        if (file == null || !file.exists()) {
            Log.i(TAG, "js bundle file download error, check URL or network state");
            return;
        }

        Log.i(TAG, "js bundle file file success, reload js bundle");

        Toast.makeText(UpdateReactActivity.this, "download bundle complete", Toast.LENGTH_SHORT).show();
        try {

            Class<?> RIManagerClazz = mReactInstanceManager.getClass();

            Field f = RIManagerClazz.getDeclaredField("mJSCConfig");
            f.setAccessible(true);
            JSCConfig jscConfig = (JSCConfig)f.get(mReactInstanceManager);

            Method method = RIManagerClazz.getDeclaredMethod("recreateReactContextInBackground",
                    com.facebook.react.cxxbridge.JavaScriptExecutor.Factory.class,
                    com.facebook.react.cxxbridge.JSBundleLoader.class);
            method.setAccessible(true);
            method.invoke(mReactInstanceManager,
                    new com.facebook.react.cxxbridge.JSCJavaScriptExecutor.Factory(jscConfig.getConfigMap()),
                    com.facebook.react.cxxbridge.JSBundleLoader.createFileLoader(getApplicationContext(), JS_BUNDLE_LOCAL_PATH));
        } catch (NoSuchMethodException e) {
            e.printStackTrace();
        } catch (IllegalAccessException e) {
            e.printStackTrace();
        } catch (InvocationTargetException e) {
            e.printStackTrace();
        } catch (IllegalArgumentException e) {
            e.printStackTrace();
        } catch (NoSuchFieldException e){
            e.printStackTrace();
        }
    }


    @Override
    protected void onDestroy() {
        super.onDestroy();
        unregisterReceiver(mDownloadCompleteReceiver);
    }

    @Override
    public boolean onKeyUp(int keyCode, KeyEvent event) {
        if (keyCode == KeyEvent.KEYCODE_MENU && mReactInstanceManager != null) {
            mReactInstanceManager.showDevOptionsDialog();
            return true;
        }
        return super.onKeyUp(keyCode, event);
    }

    @Override
    public void onBackPressed() {
        if (mReactInstanceManager != null) {
            mReactInstanceManager.onBackPressed();
        } else {
            super.onBackPressed();
        }
    }

    @Override
    public void invokeDefaultOnBackPressed() {
        super.onBackPressed();
    }

    @Override
    protected void onPause() {
        super.onPause();
    }

    @Override
    protected void onResume() {
        super.onResume();
    }
}