package com.metronome;

import com.facebook.react.ReactActivity;
import com.facebook.react.bridge.ReactApplicationContext;
import com.facebook.react.bridge.ReactContext;

import android.os.AsyncTask;
import android.os.Build;
import android.os.Message;
import android.os.Bundle;
import android.view.View;
import android.widget.Button;
import android.widget.SeekBar;
import android.widget.TextView;
import android.os.Handler;

public class MainActivity extends ReactActivity {

    private Handler mHandler;

//    private TextView tempoDisplay;
//    private TextView meterDisplay;
//
//    private SeekBar tempoSlider;
//    private SeekBar meterSlider;

    private MetronomeAsyncTask metroTask;

    private boolean isPlaying;

    private int bpm = 120;
    private int meter = 4;

    @Override
    protected void onCreate(Bundle savedInstanceState) {
        super.onCreate(savedInstanceState);
//        setContentView(R.layout.activity_metronome);

        metroTask = new MetronomeAsyncTask();
//        metroTask.doInBackground(); // this make beep start on startup

    }

    public synchronized void onStartStopClick(View view) {
        Button playButton = (Button) view;
        String buttonText = playButton.getText().toString();
        if (buttonText.equalsIgnoreCase("start")) {
            playButton.setText("stop");
            if (Build.VERSION.SDK_INT >= Build.VERSION_CODES.HONEYCOMB)
                metroTask.executeOnExecutor(AsyncTask.THREAD_POOL_EXECUTOR, (Void[])null);
            else
                metroTask.execute();
        } else {
            playButton.setText("start");
            metroTask.stop();
            metroTask = new MetronomeAsyncTask();
        }
    }

    @Override
    protected String getMainComponentName() {
        return "metronome";
    }

    private Handler getHandler() {
        return new Handler() {
            @Override
            public void handleMessage(Message msg) {
                String message = (String)msg.obj;
                if(message.equals("1"))
                    System.out.println("1");
                else
                    System.out.println("not 1");
//                tempoDisplay.setText(message);
            }
        };
    }


    private class MetronomeAsyncTask extends AsyncTask<Void,Void,String> {
        Metronome metronome;

        ReactApplicationContext reactContext;

        MetronomeAsyncTask() {
            mHandler = getHandler();
            metronome = new Metronome(reactContext, mHandler);
        }

        protected String doInBackground(Void... params) {
            metronome.onMeterChange(meter);
            metronome.onTempoChange(bpm);
            metronome.setBeatSound(440.0);
            metronome.setSound(880.0);

            metronome.play();

            return null;
        }

        public void play() {
            metronome.play();
        }

        public void stop() {
            metronome.stop();
            metronome = null;
        }

        public void onTempoChange(short bpm) {
            metronome.onTempoChange(bpm);
            metronome.calcSilence();
        }

        public void onMeterChange(short beat) {
            if(metronome != null)
                metronome.onMeterChange(beat);
        }
    }
}
