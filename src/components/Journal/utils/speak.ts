/**
 * Synthesizes speech for the given text in the specified language using the browser's built-in SpeechSynthesis API.
 *
 * @param text The text to synthesize as speech.
 * @param language The language code to use for the synthesized speech (e.g. 'en-US').
 * @returns A promise that resolves when speech synthesis is complete.
 */
export async function speak(text: string, language: string): Promise<void> {
    return new Promise((resolve, reject) => {
        const utterance = new SpeechSynthesisUtterance(text);
        utterance.lang = language;
        utterance.onend = () => {
            resolve();
        };
        utterance.onerror = (err) => {
            reject(err);
        };

        utterance.onmark = () => {
            console.log(`onmark`);
        };

        utterance.onboundary = () => {
            console.log(`onboundary`);

            // TODO: !!! mark each word
        };
        window.speechSynthesis.speak(utterance);
    });
}

/*
  
  
  
  function speak(text: string, lang: string): void {
  if (!('speechSynthesis' in window)) {
    console.error('Speech synthesis is not supported by this browser');
    return;
  }

  const synth = window.speechSynthesis;
  const voices = synth.getVoices();
  const voice = voices.find(v => v.lang === lang);

  if (!voice) {
    console.error(`Voice for language ${lang} not found`);
    return;
  }

  const utterance = new SpeechSynthesisUtterance(text);
  utterance.voice = voice;
  synth.speak(utterance);
}
  
  
  */

/**
 * TODO: !!! Allow to stop+play/pause
 * TODO: !!! Allow to destroy
 * TODO: !!! Speech animation around the image avatar
 * TODO: Return some meaningful object
 * TODO: !!! Enforce cs
 * TODO: !!! Test speech/regognition on iPhone
 */
