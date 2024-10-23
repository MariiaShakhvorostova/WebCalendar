import React, { useEffect, useState } from "react";
import "./CurrentTimeLine.css";

const CurrentTimeLine = () => {
  const [timePosition, setTimePosition] = useState(getTimePosition());

  useEffect(() => {
    const intervalId = setInterval(() => {
      setTimePosition(getTimePosition());
    }, 60000);

    return () => clearInterval(intervalId);
  }, []);

  function getTimePosition() {
    const now = new Date();
    const hours = now.getHours();
    const minutes = now.getMinutes();
    return { hours, minutes };
  }

  return (
    <div
      className="current-time-line"
      style={{ top: `${(timePosition.minutes / 60) * 100}%` }}
    >
      <div className="line"></div>
      <div className="circle"></div>
    </div>
  );
};

export default CurrentTimeLine;
