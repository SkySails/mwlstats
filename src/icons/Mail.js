import * as React from "react";

function Mail(props) {
  return (
    <svg width="1em" height="1em" viewBox="0 0 512 512" {...props}>
      <path d="M424 80H88a56.06 56.06 0 00-56 56v240a56.06 56.06 0 0056 56h336a56.06 56.06 0 0056-56V136a56.06 56.06 0 00-56-56zm-14.18 92.63l-144 112a16 16 0 01-19.64 0l-144-112a16 16 0 1119.64-25.26L256 251.73l134.18-104.36a16 16 0 0119.64 25.26z" />
    </svg>
  );
}

const MemoMail = React.memo(Mail);
export default MemoMail;
