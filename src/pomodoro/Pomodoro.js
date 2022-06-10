import React, { useState } from "react";
import PlayStop from "./PlayStop";
import SetTimes from "./SetTimes";
import Subtitle from "./Subtitles";

function Pomodoro() {
/*
Timer defaulf object,
*/

  const timerDefault = {
    focusTime: 25,
    breakTime: 5,
    focusSecs: 1500,
    breakSecs: 300,
    count: 0,
    label: "Focusing",
    defaultSession: true,
  };

  /*
  HOOKS
  */

  const [isTimerRunning, setIsTimerRunning] = useState(false);// boolean state to keep track if session is running or not shared with all children components
  const [disableBtn, setDisableBtn] = useState(false);// state boolean used to determine if a button should be disabled or not
  const [hideSubtitle, setHideSubtitle] = useState(true);// used in the 'Subtitles' Child Component to reveal and hide subtitles via boolean 
  const [TimerData, setTimerData] = useState({ ...timerDefault });//state object that keeps track of the timer's information, defaulted with the 'timerDefault' object

/**
 * function used as a prop for the 'PlayStop' Child Component, used to handle play/pause button, essentially toggling between a session running or not
 */
  function playPause() {
    setIsTimerRunning((prevState) => !prevState); // toggles the 'setIsTimerRunning 'state if the play/plause button is pressed between true and false
    setDisableBtn(true);//disables a button
    setHideSubtitle(false);//reveals subtitles
  }
/**
 * function used as a prop for the 'PlayStop' Child Component, used to handle stop button, essentially resetting a session to default parameters
 */
  function handleStop() {/// this is he stop button handler that essentially resets a session
    setTimerData({ ...timerDefault });//if stop is clicked reset the timer
    setIsTimerRunning(false);// stops the current session
    setDisableBtn(false);// the button becomes ' enabled' and is eentially reset
    setHideSubtitle(true);//hides the subtitles
  }

  return <div className="pomodoro">
      <SetTimes 
        TimerData={TimerData}
        isTimerRunning={isTimerRunning}
        setTimerData={setTimerData}
        disableBtn = {disableBtn}
      />
     <PlayStop
        playPause={playPause}
        isTimerRunning={isTimerRunning}
        handleStop={handleStop}
       disableBtn = {!disableBtn}
      />
      <Subtitle
        TimerData={TimerData}
        isTimerRunning={isTimerRunning}
        setTimerData={setTimerData}
        hideSubtitle={hideSubtitle}
      />
    </div>
}

export default Pomodoro;
