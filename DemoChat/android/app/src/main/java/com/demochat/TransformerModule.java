package com.demochat;

//import com.facebook.react.bridge.Callback;
import com.facebook.react.bridge.Arguments;
import com.facebook.react.bridge.Promise;
import com.facebook.react.bridge.ReactContextBaseJavaModule;

import com.facebook.react.bridge.NativeModule;
import com.facebook.react.bridge.ReactApplicationContext;
import com.facebook.react.bridge.ReactContext;
import com.facebook.react.bridge.ReactMethod;
import com.facebook.react.bridge.WritableMap;
import com.facebook.react.uimanager.IllegalViewOperationException;

import java.util.Base64;

public class TransformerModule extends ReactContextBaseJavaModule {

    private static ReactApplicationContext reactContext;

    public TransformerModule(ReactApplicationContext context) {
        super(reactContext); //required by React Native
        reactContext = context;
    }

    @Override
    //getName is required to define the name of the module represented in JavaScript
    public String getName() {
        return "TransformerText";
    }

//    @ReactMethod
//    public void encode(String message, Callback errorCallback, Callback successCallback) {
//        try {
//            String messageEncode = message.substring(0,5);
//            System.out.println("JAVD from Java " + messageEncode);
//            successCallback.invoke("Callback : " + messageEncode);
//        } catch (IllegalViewOperationException e) {
//            errorCallback.invoke(e.getMessage());
//        }
//    }

    @ReactMethod
    public void encode(String message, Promise promise) {
        try {

            Base64.Encoder encoder = Base64.getEncoder();
            String messageEncode = encoder.encodeToString(message.getBytes());

            System.out.println("JAVD from Java " + messageEncode);

            WritableMap map = Arguments.createMap();
            map.putString("source", message);
            map.putString("target", messageEncode);

            promise.resolve(map);
        } catch (IllegalViewOperationException e) {
            promise.reject(message, e);
        }
    }

}
