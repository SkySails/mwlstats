import React from "react";

export default function Gradient({ className }) {
  return (
    <div className={`gradient-graphics ${className}`.trim()}>
      <svg
        xmlns="http://www.w3.org/2000/svg"
        width="100%"
        height="100%"
        preserveAspectRatio="none"
        viewBox="0 0 618 446"
      >
        <defs>
          <linearGradient id="grad2" x1="0%" y1="0%" x2="0%" y2="100%">
            <stop
              offset="0%"
              style="stop-color:var(--bg-primary);stop-opacity:0"
            />
            <stop
              offset="100%"
              style="stop-color:var(--bg-primary);stop-opacity:1"
            />
          </linearGradient>
        </defs>
        <rect class="a" width="100%" height="100%" />
      </svg>
    </div>
  );
}
