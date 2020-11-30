import React from 'react'

export const Logo: React.FC<React.SVGProps<SVGSVGElement>> = React.memo(
  props => {
    return (
      <svg
        xmlns="http://www.w3.org/2000/svg"
        viewBox="0 0 370.1 512"
        {...props}
      >
        <path
          fill="#4b6fff"
          d="M243.57 295.5L370.11 512H252.35L130.96 303.54h-27.82V512H-.04V0h174.12C288.19 0 348.9 54.13 348.9 145.55c0 81.92-36.57 131.66-105.33 149.95zM103.14 87v129.5h70.94c48.28 0 71.69-15.36 71.69-68 0-36.57-23.41-61.44-71.69-61.44z"
        />
      </svg>
    )
  }
)
