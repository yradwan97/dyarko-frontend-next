import React from 'react';

function WalletQuestionMark({setShowPrizes, ...rest}) {
  return (
    <div onClick={() => setShowPrizes(true)}>
    <svg
      xmlns="http://www.w3.org/2000/svg"
      width="38"
      height="38"
      viewBox="0 0 38 38"
      {...rest} 
    >
      <path
        d="M19,0L19,0A19,19 0,0 1,38 19L38,19A19,19 0,0 1,19 38L19,38A19,19 0,0 1,0 19L0,19A19,19 0,0 1,19 0z"
        fill="#FBB040"
      />
      <path
        d="M24,16C24,14.674 23.473,13.402 22.535,12.465C21.598,11.527 20.326,11 19,11C17.674,11 16.402,11.527 15.465,12.465C14.527,13.402 14,14.674 14,16C14,16.265 14.105,16.52 14.293,16.707C14.48,16.895 14.735,17 15,17C15.265,17 15.52,16.895 15.707,16.707C15.895,16.52 16,16.265 16,16C16,15.407 16.176,14.827 16.506,14.333C16.835,13.84 17.304,13.455 17.852,13.228C18.4,13.001 19.003,12.942 19.585,13.058C20.167,13.173 20.702,13.459 21.121,13.879C21.541,14.298 21.827,14.833 21.942,15.415C22.058,15.997 21.999,16.6 21.772,17.148C21.545,17.696 21.16,18.165 20.667,18.494C20.173,18.824 19.593,19 19,19C18.735,19 18.48,19.105 18.293,19.293C18.105,19.48 18,19.735 18,20V22C18,22.265 18.105,22.52 18.293,22.707C18.48,22.895 18.735,23 19,23C19.265,23 19.52,22.895 19.707,22.707C19.895,22.52 20,22.265 20,22V20.9C21.129,20.67 22.144,20.056 22.873,19.163C23.602,18.27 24,17.153 24,16Z"
        fill="#ffffff"
      />
      <path
        d="M19,27C19.552,27 20,26.552 20,26C20,25.448 19.552,25 19,25C18.448,25 18,25.448 18,26C18,26.552 18.448,27 19,27Z"
        fill="#ffffff"
      />
    </svg>
    </div>
  );
}

export default WalletQuestionMark;
