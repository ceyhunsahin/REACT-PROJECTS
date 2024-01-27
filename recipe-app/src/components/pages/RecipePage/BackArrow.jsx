import * as React from "react"
const BackArrow = (props) => (
    <div style = {{width : '48px'}}>
        <svg
            xmlns="http://www.w3.org/2000/svg"
            fill="none"
            stroke="currentColor"
            strokeWidth={1.5}
            className="w-6 h-6"
            viewBox="0 0 24 24"
            {...props}
        >
            <path
            strokeLinecap="round"
            strokeLinejoin="round"
            d="M10.5 19.5 3 12m0 0 7.5-7.5M3 12h18"
            />
        </svg>
  </div>
)
export default BackArrow