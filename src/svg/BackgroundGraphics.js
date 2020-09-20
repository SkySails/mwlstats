import * as React from "react";
import { useColorScheme } from "@Context/ThemeContext";

function BackgroundGraphics(props) {
  const { colorScheme } = useColorScheme();
  if (colorScheme) {
    let color = colorScheme === "dark" ? "#001D40" : "#fff";
    return (
      <div id="bg-graphics">
        <svg
          xmlns="http://www.w3.org/2000/svg"
          width="100%"
          height="100%"
          viewBox="0 0 654.851 534.486"
        >
          <defs>
            <style>{`.transition {transition: .2s; fill: ${
              colorScheme === "dark" ? "#001D40" : "#fff"
            } }`}</style>
          </defs>
          <g
            id="Group_260"
            data-name="Group 260"
            transform="translate(-1489.523 292.197)"
          >
            <rect
              id="Rectangle_8"
              className="transition"
              data-name="Rectangle 8"
              width="51"
              height="474"
              rx="25.5"
              transform="matrix(0.719, 0.695, -0.695, 0.719, 1818.791, -292.197)"
              fill={color}
            />
            <rect
              id="Rectangle_10"
              className="transition"
              data-name="Rectangle 10"
              width="87"
              height="508"
              rx="43.5"
              transform="matrix(0.719, 0.695, -0.695, 0.719, 2081.791, -247.197)"
              fill={color}
            />
            <rect
              id="Rectangle_9"
              data-name="Rectangle 9"
              width="90"
              height="474"
              rx="45"
              transform="matrix(0.719, 0.695, -0.695, 0.719, 1827.791, -161.197)"
              fill="#0067ee"
            />
          </g>
        </svg>
      </div>
    );
  }

  return null;
}

const MemoBackgroundGraphics = React.memo(BackgroundGraphics);
export default MemoBackgroundGraphics;
