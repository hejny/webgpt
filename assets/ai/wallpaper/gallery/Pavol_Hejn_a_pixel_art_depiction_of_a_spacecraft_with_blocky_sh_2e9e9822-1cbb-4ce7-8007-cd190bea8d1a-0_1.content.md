<!--font:Barlow Condensed-->

# Most interesting browser APIs _(in 2023)_

[`Saturday, June 17 • 5:00pm - 5:35pm`](https://devconfcz2023.sched.com/event/1MYeB)

At DevConf 2020 I gave a talk about the most useful browser APIs.
Now I will talk about the most interesting, unexpected and unusual things you can do directly in the browser app.

-   **Web Speech API**: For using the user's voice to control the web apps.
-   **Sensor APIs**: Provides access to different sensors on a user's device, such as an accelerometer or gyroscope.
-   **WebXR**: Allows developers to create virtual and augmented reality experiences in the browser.
-   **Internationalisation API**: Provides a way to format dates, times, numbers, currencies, and more.
-   **Offscreen Canvas API**: Allows developers to perform graphics operations outside of the main thread, improving performance.
-   **File system access API**: Provides a way for web applications to read and write files on a user's device.

## Web Speech API

The Web Speech API provides two distinct areas of functionality — speech recognition, and speech synthesis (also known as text to speech, or tts) — which open up interesting new possibilities for accessibility, and control mechanisms.

### Speech recognition

The SpeechRecognition interface of the Web Speech API is the controller interface for the recognition service; this also handles the SpeechRecognitionEvent sent from the recognition service.

```js
const SpeechRecognition = window.SpeechRecognition || window.webkitSpeechRecognition;
const recognition = new SpeechRecognition();
recognition.lang = 'en-US';
recognition.interimResults = false;
recognition.maxAlternatives = 1;

recognition.start();
```

### Speech synthesis
