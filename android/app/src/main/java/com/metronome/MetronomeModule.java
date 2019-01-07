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
}
