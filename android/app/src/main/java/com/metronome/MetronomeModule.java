package com.metronome;

import android.os.AsyncTask;
import android.os.Build;
import android.os.Handler;
import android.os.Message;

import com.facebook.react.bridge.ReactApplicationContext;
import com.facebook.react.bridge.ReactContextBaseJavaModule;
import com.facebook.react.bridge.ReactMethod;

public class MetronomeModule extends ReactContextBaseJavaModule {

    private Handler mHandler;
    private MetronomeAsyncTask metroTask;

    private int bpm = 120;
    private int meter = 4;
    private int eighthVolume = 0;

    public MetronomeModule(ReactApplicationContext reactContext) {
        super(reactContext);
    }

    @Override
    public String getName() {
        return "Metronome";
    }

    @ReactMethod
    public void prepareToPlay() {
        System.out.println("preparing to play");
        metroTask = new MetronomeAsyncTask();
    }

    @ReactMethod
    public void pressPlay() {
        if (Build.VERSION.SDK_INT >= Build.VERSION_CODES.HONEYCOMB)
            metroTask.executeOnExecutor(AsyncTask.THREAD_POOL_EXECUTOR, (Void[])null);
        else
            metroTask.execute();
        System.out.println("play button pressed");
    }

    @ReactMethod
    public void pressStop() {
        metroTask.stop();
        metroTask = new MetronomeAsyncTask();
        System.out.println("stop button pressed");
    }

    @ReactMethod
    public void onTempoChange(int value) {
        bpm = value;
        metroTask.setBpm((short)value);
        System.out.println("tempo: " + value);
    }

    @ReactMethod
    public void onMeterChange(int value) {
        meter = value;
        metroTask.setBeat((short)meter);
        System.out.println("meter: " + value);
    }

    @ReactMethod
    public void onEighthNoteVolumeChange(int value) {
        eighthVolume = value;
        System.out.println("eighth note volume: " + value);
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
            }
        };
    }

    private class MetronomeAsyncTask extends AsyncTask<Void,Void,String> {

        Metronome metronome;

        MetronomeAsyncTask() {
            mHandler = getHandler();
            metronome = new Metronome(mHandler);
        }

        protected String doInBackground(Void... params) {
            metronome.setBeat(meter);
            metronome.setBpm(bpm);
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

        public void setBpm(short bpm) {
            metronome.setBpm(bpm);
            metronome.calcSilence();
        }

        public void setBeat(short beat) {
            if(metronome != null)
                metronome.setBeat(beat);
        }
    }
}
