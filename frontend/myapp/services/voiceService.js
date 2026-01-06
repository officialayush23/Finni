// // // // // // // // // import { SpeechRecognition } from 'expo-speech-recognition';

// // // // // // // // // export const VoiceService = {
// // // // // // // // //   // Check and request permissions
// // // // // // // // //   requestPermissions: async () => {
// // // // // // // // //     const { granted } = await SpeechRecognition.requestPermissionsAsync();
// // // // // // // // //     return granted;
// // // // // // // // //   },

// // // // // // // // //   // Start Listening
// // // // // // // // //   startListening: (onResult, onError) => {
// // // // // // // // //     SpeechRecognition.startListeningAsync({
// // // // // // // // //       lang: "en-US",
// // // // // // // // //       interimResults: true, // Shows text as you speak
// // // // // // // // //     });

// // // // // // // // //     SpeechRecognition.addSpeechRecognitionListener((event) => {
// // // // // // // // //       if (event.type === "result") {
// // // // // // // // //         onResult(event.results[0].transcript);
// // // // // // // // //       }
// // // // // // // // //       if (event.type === "error") {
// // // // // // // // //         onError(event.error);
// // // // // // // // //       }
// // // // // // // // //     });
// // // // // // // // //   },

// // // // // // // // //   // Stop Listening
// // // // // // // // //   stopListening: async () => {
// // // // // // // // //     await SpeechRecognition.stopListeningAsync();
// // // // // // // // //   }
// // // // // // // // // };

// // // // // // // // import Voice from '@react-native-voice/voice';

// // // // // // // // export const VoiceService = {
// // // // // // // //   // 1. Setup listeners
// // // // // // // //   init: (onResult, onError) => {
// // // // // // // //     Voice.onSpeechResults = (e) => {
// // // // // // // //       if (e.value && e.value.length > 0) {
// // // // // // // //         onResult(e.value[0]); // This is the transcript string
// // // // // // // //       }
// // // // // // // //     };
// // // // // // // //     Voice.onSpeechError = (e) => {
// // // // // // // //       console.log("Speech Error:", e);
// // // // // // // //       onError(e);
// // // // // // // //     };
// // // // // // // //   },

// // // // // // // //   // 2. Trigger the Mic
// // // // // // // //   startListening: async () => {
// // // // // // // //     try {
// // // // // // // //       await Voice.start('en-US');
// // // // // // // //     } catch (e) {
// // // // // // // //       console.error("Start Error:", e);
// // // // // // // //     }
// // // // // // // //   },

// // // // // // // //   // 3. Stop and Cleanup
// // // // // // // //   stopListening: async () => {
// // // // // // // //     try {
// // // // // // // //       await Voice.stop();
// // // // // // // //     } catch (e) {
// // // // // // // //       console.error("Stop Error:", e);
// // // // // // // //     }
// // // // // // // //   }
// // // // // // // // };

// // // // // // // import Voice from '@react-native-voice/voice';

// // // // // // // export const VoiceService = {
// // // // // // //   init: (onResult, onError) => {
// // // // // // //     // 🚀 CRITICAL: Remove existing listeners first to avoid memory leaks
// // // // // // //     Voice.destroy().then(Voice.removeAllListeners);

// // // // // // //     Voice.onSpeechResults = (e) => {
// // // // // // //       if (e.value && e.value.length > 0) {
// // // // // // //         onResult(e.value[0]);
// // // // // // //       }
// // // // // // //     };
    
// // // // // // //     Voice.onSpeechError = (e) => {
// // // // // // //       console.log("Speech Error Log:", e);
// // // // // // //       onError(e);
// // // // // // //     };
// // // // // // //   },

// // // // // // //   startListening: async () => {
// // // // // // //     try {
// // // // // // //       // 🚀 Check if Voice is actually available
// // // // // // //       if (Voice) {
// // // // // // //         await Voice.start('en-US');
// // // // // // //       } else {
// // // // // // //         console.error("Voice module not found in this environment");
// // // // // // //       }
// // // // // // //     } catch (e) {
// // // // // // //       console.error("Start Error:", e);
// // // // // // //     }
// // // // // // //   },

// // // // // // //   stopListening: async () => {
// // // // // // //     try {
// // // // // // //       if (Voice) {
// // // // // // //         await Voice.stop();
// // // // // // //       }
// // // // // // //     } catch (e) {
// // // // // // //       // This catches the 'stopSpeech' of null error
// // // // // // //       console.log("Stop Error handled:", e.message);
// // // // // // //     }
// // // // // // //   }
// // // // // // // };


// // // // // // import Voice from '@react-native-voice/voice';

// // // // // // export const VoiceService = {
// // // // // //   setup: (onResult, onError) => {
// // // // // //     // Cleanup any old listeners
// // // // // //     Voice.onSpeechResults = (e) => {
// // // // // //       if (e.value && e.value.length > 0) {
// // // // // //         onResult(e.value[0]);
// // // // // //       }
// // // // // //     };
    
// // // // // //     Voice.onSpeechError = (e) => {
// // // // // //       console.log("Mic Error:", e);
// // // // // //       onError(e);
// // // // // //     };
// // // // // //   },

// // // // // //   start: async () => {
// // // // // //     try {
// // // // // //       await Voice.start('en-US');
// // // // // //     } catch (e) {
// // // // // //       console.error("Mic Start Fail:", e);
// // // // // //     }
// // // // // //   },

// // // // // //   stop: async () => {
// // // // // //     try {
// // // // // //       // Standard stop sequence
// // // // // //       await Voice.stop();
// // // // // //     } catch (e) {
// // // // // //       console.log("Mic Stop handled:", e.message);
// // // // // //     }
// // // // // //   },

// // // // // //   destroy: async () => {
// // // // // //     try {
// // // // // //       await Voice.destroy();
// // // // // //       Voice.removeAllListeners();
// // // // // //     } catch (e) {
// // // // // //       console.error(e);
// // // // // //     }
// // // // // //   }
// // // // // // };

// // // // // import Voice from '@react-native-voice/voice';

// // // // // export const VoiceService = {
// // // // //   setup: (onResult, onError) => {
// // // // //     if (!Voice) {
// // // // //       console.warn("🎙️ Voice module not found. Are you in Expo Go? Standard Mic needs a Dev Build.");
// // // // //       return;
// // // // //     }
    
// // // // //     Voice.onSpeechResults = (e) => {
// // // // //       if (e.value && e.value.length > 0) {
// // // // //         onResult(e.value[0]);
// // // // //       }
// // // // //     };
    
// // // // //     Voice.onSpeechError = (e) => {
// // // // //       console.log("Mic Error:", e);
// // // // //       onError(e);
// // // // //     };
// // // // //   },

// // // // //   start: async () => {
// // // // //     if (!Voice) return;
// // // // //     try {
// // // // //       await Voice.start('en-US');
// // // // //     } catch (e) {
// // // // //       console.error("Mic Start Fail:", e);
// // // // //     }
// // // // //   },

// // // // //   stop: async () => {
// // // // //     if (!Voice) return;
// // // // //     try {
// // // // //       await Voice.stop();
// // // // //     } catch (e) {
// // // // //       console.log("Mic Stop handled (Safe):", e.message);
// // // // //     }
// // // // //   },

// // // // //   destroy: async () => {
// // // // //     if (!Voice) return;
// // // // //     try {
// // // // //       await Voice.destroy();
// // // // //       Voice.removeAllListeners();
// // // // //     } catch (e) {
// // // // //       console.error(e);
// // // // //     }
// // // // //   }
// // // // // };

// // // // import { Audio } from 'expo-av';

// // // // let recording = null;

// // // // export const VoiceService = {
// // // //   setup: async () => {
// // // //     await Audio.requestPermissionsAsync();
// // // //     await Audio.setAudioModeAsync({
// // // //       allowsRecordingIOS: true,
// // // //       playsInSilentModeIOS: true,
// // // //     });
// // // //   },

// // // //   start: async () => {
// // // //     try {
// // // //       const { recording: newRecording } = await Audio.Recording.createAsync(
// // // //         Audio.RecordingOptionsPresets.HIGH_QUALITY
// // // //       );
// // // //       recording = newRecording;
// // // //     } catch (err) {
// // // //       console.error('Failed to start recording', err);
// // // //     }
// // // //   },

// // // //   stop: async () => {
// // // //     if (!recording) return null;
// // // //     try {
// // // //       await recording.stopAndUnloadAsync();
// // // //       const uri = recording.getURI();
// // // //       recording = null;
// // // //       return uri; // This is the path to your voice file
// // // //     } catch (err) {
// // // //       console.error('Failed to stop recording', err);
// // // //       return null;
// // // //     }
// // // //   },

// // // //   destroy: () => {
// // // //     recording = null;
// // // //   }
// // // // };


// // // import { Audio } from 'expo-av';

// // // let recordingInstance = null;
// // // let isPreparing = false;

// // // export const VoiceService = {
// // //   setup: async () => {
// // //     try {
// // //       await Audio.requestPermissionsAsync();
// // //       await Audio.setAudioModeAsync({
// // //         allowsRecordingIOS: true,
// // //         playsInSilentModeIOS: true,
// // //       });
// // //     } catch (e) {
// // //       console.error("Setup Error", e);
// // //     }
// // //   },

// // //   start: async () => {
// // //     if (recordingInstance || isPreparing) return; // Prevent "Only one Recording" error
    
// // //     try {
// // //       isPreparing = true;
// // //       const { recording } = await Audio.Recording.createAsync(
// // //         Audio.RecordingOptionsPresets.HIGH_QUALITY
// // //       );
// // //       recordingInstance = recording;
// // //       isPreparing = false;
// // //     } catch (err) {
// // //       isPreparing = false;
// // //       console.error('Failed to start', err);
// // //     }
// // //   },

// // //   stop: async () => {
// // //     if (!recordingInstance) return null;
    
// // //     try {
// // //       const status = await recordingInstance.getStatusAsync();
// // //       if (!status.canRecord) return null;

// // //       await recordingInstance.stopAndUnloadAsync();
// // //       const uri = recordingInstance.getURI();
// // //       recordingInstance = null; // Reset for next time
// // //       return uri;
// // //     } catch (err) {
// // //       console.error('Stop error handled', err.message);
// // //       recordingInstance = null;
// // //       return null;
// // //     }
// // //   }
// // // };


// // import { SpeechRecognition } from 'expo-speech-recognition';

// // export const VoiceService = {
// //   // Request permissions before starting
// //   init: async () => {
// //     const result = await SpeechRecognition.requestPermissionsAsync();
// //     return result.granted;
// //   },

// //   start: async (onResult, onError) => {
// //     try {
// //       // 1. Listen for results AS you speak
// //       const listener = SpeechRecognition.addSpeechRecognitionListener((event) => {
// //         if (event.type === 'result') {
// //           onResult(event.results[0].transcript);
// //         } else if (event.type === 'error') {
// //           onError(event.error);
// //         }
// //       });

// //       // 2. Actually start the mic engine
// //       await SpeechRecognition.startListeningAsync({
// //         lang: 'en-US',
// //         interimResults: true, // Shows text as you talk
// //         continuous: false,
// //       });

// //       return listener;
// //     } catch (e) {
// //       console.error("Mic Start Error:", e);
// //       onError(e);
// //     }
// //   },

// //   stop: async () => {
// //     try {
// //       await SpeechRecognition.stopListeningAsync();
// //     } catch (e) {
// //       console.log("Stop Error handled:", e.message);
// //     }
// //   }
// // };

// // 🚀 FIX: Import the specific Module and the hook-friendly API
// import { ExpoSpeechRecognitionModule, SpeechRecognition } from "expo-speech-recognition";

// export const VoiceService = {
//   init: async () => {
//     // 🚀 Check if the native module actually exists first
//     if (!ExpoSpeechRecognitionModule) {
//       console.error("❌ Native Speech Module is UNDEFINED. Check your Dev Build!");
//       return false;
//     }
//     const result = await SpeechRecognition.requestPermissionsAsync();
//     return result.granted;
//   },

//   start: async (onResult, onError) => {
//     try {
//       // 🚀 Ensure we are clean before starting
//       await SpeechRecognition.stopListeningAsync();

//       const listener = SpeechRecognition.addSpeechRecognitionListener((event) => {
//         if (event.type === "result") {
//           onResult(event.results[0].transcript);
//         } else if (event.type === "error") {
//           console.log("Recognition Error:", event.error);
//           onError(event.error);
//         }
//       });

//       await SpeechRecognition.startListeningAsync({
//         lang: "en-US",
//         interimResults: true,
//       });

//       return listener;
//     } catch (e) {
//       console.error("Start Failure:", e);
//       onError(e);
//     }
//   },

//   stop: async () => {
//     try {
//       // 🚀 Use the Module directly to ensure it hits the native side
//       if (ExpoSpeechRecognitionModule) {
//         await SpeechRecognition.stopListeningAsync();
//       }
//     } catch (e) {
//       console.log("Safe Stop:", e.message);
//     }
//   }
// };



import { ExpoSpeechRecognitionModule, SpeechRecognition } from "expo-speech-recognition";

export const VoiceService = {
  init: async () => {
    // Check if Android Studio actually included the module
    if (!ExpoSpeechRecognitionModule) {
      console.error("❌ Native Mic Module Missing. Please run 'npx expo prebuild' and rebuild in Android Studio.");
      return false;
    }
    try {
      const result = await SpeechRecognition.requestPermissionsAsync();
      return result.granted;
    } catch (e) {
      return false;
    }
  },

  start: async (onResult, onError) => {
    if (!ExpoSpeechRecognitionModule) return;
    try {
      const listener = SpeechRecognition.addSpeechRecognitionListener((event) => {
        if (event.type === "result") {
          onResult(event.results[0].transcript);
        } else if (event.type === "error") {
          onError(event.error);
        }
      });

      await SpeechRecognition.startListeningAsync({
        lang: "en-US",
        interimResults: true,
      });
      return listener;
    } catch (e) {
      onError(e);
    }
  },

  stop: async () => {
    if (!ExpoSpeechRecognitionModule) return;
    try {
      await SpeechRecognition.stopListeningAsync();
    } catch (e) {
      console.log("Safe Stop:", e.message);
    }
  }
};