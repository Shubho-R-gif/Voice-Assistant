import "regenerator-runtime/runtime"; // Important: Ensure this is the first import
import { useState } from "react";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import {
  faCopy,
  faMicrophone,
  faMicrophoneSlash,
  faArrowRight,
  faArrowLeft,
} from "@fortawesome/free-solid-svg-icons";
import "./SpeechRecog.css";
import SpeechRecognition, {
  useSpeechRecognition,
} from "react-speech-recognition";
import PropTypes from "prop-types"; // Import PropTypes
const SpeechRecog = ({ isSpeechMode, setIsSpeechMode }) => {
  const { transcript, browserSupportsSpeechRecognition } =
    useSpeechRecognition();
  const [copyMessage, setCopyMessage] = useState("");
  const [isStartClicked, setIsStartClicked] = useState(false);
  const [isStopClicked, setIsStopClicked] = useState(false);

  const handleStartClick = () => {
    setIsStartClicked(true);
    setIsStopClicked(false);
    // Start speech recognition
    SpeechRecognition.startListening({ continuous: true, language: "en-IN" });
  };

  const handleStopClick = () => {
    setIsStartClicked(false);
    setIsStopClicked(true);
    // Stop speech recognition
    SpeechRecognition.stopListening();
  };

  const handleCopy = () => {
    const textToCopy = document.querySelector(
      ".SpeechTextBox .text"
    ).textContent;
    navigator.clipboard.writeText(textToCopy);
    setCopyMessage("Text has been copied");
    setTimeout(() => setCopyMessage(""), 3000);
  };

  if (!browserSupportsSpeechRecognition) {
    return <span>Browser doesnot support speech recognition.</span>;
  }
  return (
    <div className="Container">
      {" "}
      <div className="SpeechRecognition">
        <h1>Voice Speech Recognition</h1>
        <section className="SpeechTextBox">
          <p className="text">{transcript}</p>
        </section>
        <div className="Buttons">
          <button type="button" className="btn Copy" onClick={handleCopy}>
            <FontAwesomeIcon icon={faCopy} />
          </button>
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
        {copyMessage && <p className="CopyMessage">{copyMessage}</p>}
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
SpeechRecog.propTypes = {
  isSpeechMode: PropTypes.bool.isRequired,
  setIsSpeechMode: PropTypes.func.isRequired,
};
export default SpeechRecog;
