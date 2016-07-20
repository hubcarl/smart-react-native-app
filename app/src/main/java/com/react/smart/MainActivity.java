package com.react.smart;

import android.content.Intent;
import android.graphics.Color;
import android.os.Bundle;
import android.support.v7.app.AppCompatActivity;
import android.view.View;
import android.widget.TextView;

public class MainActivity extends AppCompatActivity implements View.OnClickListener {

    private TextView mReactValue = null;

    @Override
    protected void onCreate(Bundle savedInstanceState) {
        super.onCreate(savedInstanceState);
        setContentView(R.layout.activity_main);

        findViewById(R.id.tv_native).setOnClickListener(this);
        mReactValue = (TextView) findViewById(R.id.tv_react);
    }

    @Override
    public void onClick(View v) {
        Intent intent = new Intent(this, TabReactActivity.class);
        intent.putExtra("fromAndroid", "我是来自Android Intent的消息");
        startActivityForResult(intent, 0);
    }

    @Override
    protected void onActivityResult(int requestCode, int resultCode, Intent data) {
        super.onActivityResult(requestCode, resultCode, data);
        if (requestCode == 0 && data != null) {
            String result = data.getStringExtra("fromReact");
            mReactValue.setText(result);
            mReactValue.setTextColor(Color.RED);
        }
    }
}
