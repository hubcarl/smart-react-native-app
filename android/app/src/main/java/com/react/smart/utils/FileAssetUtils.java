package com.react.smart.utils;

import android.content.Context;
import android.content.res.AssetManager;
import android.util.Log;

import java.io.*;

/**
 * Created by sky on 16/9/19.
 */
public class FileAssetUtils {

    public static void copyAssets(Context context, String src, String dist) {
        AssetManager assetManager = context.getAssets();
        String[] files = null;
        try {
            files = assetManager.list(src);
        } catch (IOException e) {
            Log.e("tag", "Failed to get asset file list.", e);
        }
        for(String filename : files) {
            InputStream in = null;
            OutputStream out = null;
            try {
                in = assetManager.open(src + File.separator + filename);
                File outFile = new File(dist + File.separator + src, filename);
                out = new FileOutputStream(outFile);
                copyFile(in, out);
                in.close();
                in = null;
                out.flush();
                out.close();
                out = null;
            } catch(IOException e) {
                Log.e("tag", "Failed to copy asset file: " + filename, e);
            }
        }
    }

    public static void copyFile(InputStream in, OutputStream out) throws IOException {
        byte[] buffer = new byte[1024];
        int read;
        while((read = in.read(buffer)) != -1){
            out.write(buffer, 0, read);
        }
    }
}
