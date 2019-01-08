package com.metronome;

import com.facebook.react.bridge.ReactApplicationContext;
import com.facebook.react.bridge.ReactContextBaseJavaModule;
import com.facebook.react.bridge.ReactMethod;

public class MetronomeModule extends ReactContextBaseJavaModule {
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
    }

    @ReactMethod
    public void pressPlay() {
        System.out.println("play button pressed");
    }

    @ReactMethod
    public void pressStop() {
        System.out.println("stop button pressed");
    }

    @ReactMethod
    public void onTempoChange(int value) {
        System.out.println("tempo: " + value);
    }

    @ReactMethod
    public void onMeterChange(int value) {
        System.out.println("meter: " + value);
    }
}
