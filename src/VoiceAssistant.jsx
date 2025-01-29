import "regenerator-runtime/runtime"; // Important: Ensure this is the first import
import { useState, useEffect } from "react";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import {
  faMicrophone,
  faMicrophoneSlash,
  faArrowRight,
  faArrowLeft,
} from "@fortawesome/free-solid-svg-icons";
import "./VoiceAssistant.css";
import SpeechRecognition, {
  useSpeechRecognition,
} from "react-speech-recognition";
import PropTypes from "prop-types"; // Import PropTypes
const VoiceAssistant = ({ isSpeechMode, setIsSpeechMode }) => {
  const [isStartClicked, setIsStartClicked] = useState(false);
  const [isStopClicked, setIsStopClicked] = useState(false);
  const { transcript, browserSupportsSpeechRecognition } =
    useSpeechRecognition();
  const commands = {
    "open youtube": () => window.open("https://www.youtube.com", "_blank"),
    "open github": () => window.open("https://www.github.com", "_blank"),
    "open twitter": () => window.open("https://www.twitter.com", "_blank"),
    "open spotify": () => window.open("https://open.spotify.com", "_blank"),
    "open facebook": () => window.open("https://www.facebook.com", "_blank"),
    "open instagram": () => window.open("https://www.instagram.com", "_blank"),
    "clear text": () => {
      const textBox = document.querySelector(".SpeechTextBox .text");
      if (textBox) {
        textBox.textContent = ""; // Clear the text content
      }
    },
  };
  useEffect(() => {
    if (transcript) handleCommand(transcript);
  });
  const handleCommand = (input) => {
    input = input.toLowerCase().trim();

    if (commands[input]) {
      commands[input]();
    } else if (input.startsWith("search google for ")) {
      const query = input.replace("search google for ", "").trim();
      if (query)
        window.open(
          `https://www.google.com/search?q=${encodeURIComponent(query)}`,
          "_blank"
        );
    }
  };

  const handleStartClick = () => {
    if (browserSupportsSpeechRecognition) {
      SpeechRecognition.startListening({ continuous: true, language: "en-IN" });
      setIsStartClicked(true);
      setIsStopClicked(false);
    } else {
      console.error("Browser doesn't support speech recognition.");
    }
  };
  const handleStopClick = () => {
    setIsStartClicked(false);
    setIsStopClicked(true);
    // Stop speech recognition
    SpeechRecognition.stopListening();
  };

  return (
    <div className="Container">
      {" "}
      <div className="SpeechRecognition">
        <h1>Voice Assistant</h1>
        <section className="SpeechTextBox">
          <p className="text">{transcript}</p>
        </section>
        <div className="Buttons">
          <button
            type="button"
            className="btn Start"
            onClick={handleStartClick}
          >
            <FontAwesomeIcon icon={faMicrophone} />
            {isStartClicked && <div className="Status-dot1"></div>}
          </button>
          <button type="button" className="btn Stop" onClick={handleStopClick}>
            <FontAwesomeIcon icon={faMicrophoneSlash} />
            {isStopClicked && <div className="Status-dot2"></div>}
          </button>
        </div>
        <button
          className="ArrowButton"
          onClick={() => setIsSpeechMode(!isSpeechMode)}
        >
          <FontAwesomeIcon icon={isSpeechMode ? faArrowRight : faArrowLeft} />
        </button>
      </div>
    </div>
  );
};
// Add PropTypes validation
VoiceAssistant.propTypes = {
  isSpeechMode: PropTypes.bool.isRequired,
  setIsSpeechMode: PropTypes.func.isRequired,
};
export default VoiceAssistant;
