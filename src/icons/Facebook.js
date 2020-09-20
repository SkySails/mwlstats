import * as React from "react";

function Facebook(props) {
  return (
    <svg data-name="Group 249" width={11.274} height={22.997} {...props}>
      <path
        data-name="Path 237"
        d="M10.829 11.512H7.441v11.481H2.387V11.512H0V7.464h2.388V4.836a5.418 5.418 0 01.389-2.076A4.066 4.066 0 014.304.841 5.554 5.554 0 017.47 0l3.749.026v3.942H8.498a1.118 1.118 0 00-.694.21 1.077 1.077 0 00-.361.894v2.392h3.827z"
        fill="#096cee"
      />
    </svg>
  );
}

const MemoFacebook = React.memo(Facebook);
export default MemoFacebook;
