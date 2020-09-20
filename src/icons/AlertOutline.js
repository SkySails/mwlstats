import * as React from "react";

function AlertOutline(props) {
  return (
    <svg width="1em" height="1em" viewBox="0 0 512 512" {...props}>
      <path
        d="M448 256c0-106-86-192-192-192S64 150 64 256s86 192 192 192 192-86 192-192z"
        fill="none"
        stroke={props.color}
        strokeMiterlimit={10}
        strokeWidth={32}
      />
      <path
        d="M250.26 166.05L256 288l5.73-121.95a5.74 5.74 0 00-5.79-6h0a5.74 5.74 0 00-5.68 6z"
        fill="none"
        stroke={props.color}
        strokeLinecap="round"
        strokeLinejoin="round"
        strokeWidth={32}
      />
      <path
        fill={props.color}
        d="M256 367.91a20 20 0 1120-20 20 20 0 01-20 20z"
      />
    </svg>
  );
}

const MemoAlertOutline = React.memo(AlertOutline);
export default MemoAlertOutline;
