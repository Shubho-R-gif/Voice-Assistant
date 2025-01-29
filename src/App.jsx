import { useState } from "react";
import SpeechRecog from "./SpeechRecog";
import VoiceAssistant from "./VoiceAssistant";
const App = () => {
  const [isSpeechMode, setIsSpeechMode] = useState(true);

  return (
    <>
      {isSpeechMode ? (
        <SpeechRecog
          isSpeechMode={isSpeechMode}
          setIsSpeechMode={setIsSpeechMode}
        />
      ) : (
        <VoiceAssistant
          isSpeechMode={isSpeechMode}
          setIsSpeechMode={setIsSpeechMode}
        />
      )}
    </>
  );
};

export default App;
