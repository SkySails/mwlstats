import * as React from "react";

function ShareOutline(props) {
  return (
    <svg height="1.5em" width="1.5em" viewBox="0 0 512 512" {...props}>
      <path d="M392 80H232a56.06 56.06 0 00-56 56v104h153.37l-52.68-52.69a16 16 0 0122.62-22.62l80 80a16 16 0 010 22.62l-80 80a16 16 0 01-22.62-22.62L329.37 272H176v104c0 32.05 33.79 56 64 56h152a56.06 56.06 0 0056-56V136a56.06 56.06 0 00-56-56zM80 240a16 16 0 000 32h96v-32z" />
    </svg>
  );
}

const MemoShareOutline = React.memo(ShareOutline);
export default MemoShareOutline;
