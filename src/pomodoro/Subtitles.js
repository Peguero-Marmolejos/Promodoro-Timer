import React from "react";
import { secondsToDuration, minutesToDuration } from "../utils/duration";
import useInterval from "../utils/useInterval";

function Subtitle ({ TimerData, setTimerData, isTimerRunning, hideSubtitle }) {
  
  let { defaultSession, focusTime, focusSecs, breakTime, breakSecs, count, label } = TimerData;
  let currentSession = defaultSession ? { mins: focusTime, secs: focusSecs,} : { mins: breakTime, secs: breakSecs };// if defaultSession property in the TimerData is set to true current session is focus , otherwise current session is break
  let progressNum = `${(count / currentSession.secs) * 100}`;
  let nextLabel = (defaultSession) ? "On Break" : "Focusing";// if defaultSession property inTimerData is set to true the the next Label will be "On Break", otherwise it willbe "Focusing"

  useInterval(() => {
      setTimerData((now) => {
        if (( now.count >= now.focusSecs && now.label === "Focusing" ) || ( now.count >= now.breakSecs && now.label === "On Break")) {
          now.count = 0;
          now.label = nextLabel;
          now.defaultSession = !now.defaultSession;
          new Audio(`https://bigsoundbank.com/UPLOAD/mp3/1482.mp3`).play();
        }
        return { ...now, count: now.count + 1 };
  })},
    isTimerRunning ? 1000 : null
  );

 return (!hideSubtitle) ? (
  <div>
      <div className="row mb-2">
        <div className="col">
          <h2 data-testid="session-title">
            {label} for {minutesToDuration(currentSession.mins)} minutes
          </h2>
          <p className="lead" data-testid="session-sub-title">
            {secondsToDuration(currentSession.secs - count)} remaining
          </p>
        </div>
      </div>
      <div>
        <h3>PAUSED</h3>
      </div>
      <div className="row mb-2">
        <div className="col">
          <div className="progress">
            <div
              className="progress-bar"
              role="progressbar"
              aria-valuemin="0"
              aria-valuemax="100"
              aria-valuenow={progressNum}
              style={{ width: `${progressNum}%` }}
            />
          </div>
        </div>
      </div>
    </div>
  ) : (<div></div>)
}
export default Subtitle
