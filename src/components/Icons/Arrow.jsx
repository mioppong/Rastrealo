import * as React from "react";

function Icon({ size = 50 }) {
  return (
    <svg
      width={size}
      height={size}
      viewBox="0 0 24 24"
      fill="none"
      xmlns="http://www.w3.org/2000/svg"
    >
      <path
        fillRule="evenodd"
        clipRule="evenodd"
        d="M6.82 17h10.36c.79 0 1.27-.87.84-1.54l-5.18-8.14a1 1 0 00-1.69 0l-5.17 8.14c-.43.67.05 1.54.84 1.54z"
        fill="#1D1D1D"
      />
    </svg>
  );
}

export default Icon;
