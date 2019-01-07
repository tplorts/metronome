package com.metronome;

import com.facebook.react.ReactActivity;
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

        metroTask.doInBackground(); // this make beep start on startup

//        final Button playButton = (Button)findViewById(R.id.playButton);
//        final TextView tempoDisplay = (TextView)findViewById(R.id.tempoDisplay);
//        final TextView meterDisplay = (TextView)findViewById(R.id.meterDisplay);
//        final SeekBar tempoSlider = (SeekBar)findViewById(R.id.tempoSlider);
//        final SeekBar meterSlider = (SeekBar)findViewById(R.id.meterSlider);

//        tempoDisplay.setText(Integer.toString(bpm));
//        tempoSlider.setProgress((short)bpm);
//        meterDisplay.setText(Integer.toString(meter));
//        meterSlider.setProgress((short)meter);

//        playButton.setOnClickListener(new View.OnClickListener() {
//            public void onClick(View v) {
//                onStartStopClick(v);
//            }
//        });

//        tempoSlider.setOnSeekBarChangeListener(new SeekBar.OnSeekBarChangeListener() {
//            @Override
//            public void onProgressChanged(SeekBar seekBar, int progress, boolean fromUser) {
//                System.out.println(progress);
//                bpm = progress;
//                tempoSlider.setProgress(progress);
//                tempoDisplay.setText(Integer.toString(progress));
//                metroTask.setBpm((short)progress);
//            }
//
//            @Override
//            public void onStartTrackingTouch(SeekBar seekBar) {
//
//            }
//
//            @Override
//            public void onStopTrackingTouch(SeekBar seekBar) {
//
//            }
//        });

//        meterSlider.setOnSeekBarChangeListener(new SeekBar.OnSeekBarChangeListener() {
//            @Override
//            public void onProgressChanged(SeekBar seekBar, int progress, boolean fromUser) {
//                System.out.println(progress);
//                meter = progress;
//                meterSlider.setProgress(progress);
//                meterDisplay.setText(Integer.toString(progress));
//                metroTask.setBeat((short)progress);
//            }
//
//            @Override
//            public void onStartTrackingTouch(SeekBar seekBar) {
//
//            }
//
//            @Override
//            public void onStopTrackingTouch(SeekBar seekBar) {
//
//            }
//        });

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

        MetronomeAsyncTask() {
            mHandler = getHandler();
            metronome = new Metronome(mHandler);
        }

        protected String doInBackground(Void... params) {
            metronome.setBeat(meter);
//            metronome.setNoteValue(16);
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
