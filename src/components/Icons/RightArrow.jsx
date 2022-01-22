import * as React from "react";

function Icon(props) {
  return (
    <svg
      width={14}
      height={14}
      fill="none"
      xmlns="http://www.w3.org/2000/svg"
      {...props}
    >
      <g clipPath="url(#prefix__clip0_106_29)">
        <path
          fillRule="evenodd"
          clipRule="evenodd"
          d="M.484 13.307c.624.343 1.63.343 2.253 0L13.313 7.49c.497-.273.497-.714 0-.987L2.737.686C2.113.343 1.107.343.484.686c-.623.343-.623.896 0 1.24L9.7 7 .47 12.075c-.61.336-.61.896.013 1.232z"
          fill="#757BC8"
        />
      </g>
      <defs>
        <clipPath id="prefix__clip0_106_29">
          <path fill="#fff" transform="rotate(180 7 7)" d="M0 0h14v14H0z" />
        </clipPath>
      </defs>
    </svg>
  );
}

export default Icon;
