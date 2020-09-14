import React from "react";

function SunMoon(props) {
  return (
    <svg
      className="moon"
      xmlns="http://www.w3.org/2000/svg"
      viewBox="-6 -6 12 12"
    >
      <defs>
        <mask id="earth">
          <rect fill="white" x="-5" y="-5" width="10" height="10"></rect>
          <circle className="moon-circle" fill="black" cx="3.141592654" r="5" />
        </mask>
      </defs>
      <circle
        r="5"
        fill="currentColor"
        mask="url(#earth)"
        transform="rotate(-50.5)"
      />
    </svg>
  );
}

export default SunMoon;
