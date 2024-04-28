const QuestionButtonIcon = ({ isFlipped = false }: { isFlipped?: boolean }) => {
  return (
    <svg
      width="33"
      height="33"
      viewBox="0 0 33 33"
      fill="none"
      xmlns="http://www.w3.org/2000/svg"
      className={`${isFlipped ? "question-button-svg-flip" : null}`}
    >
      <path
        d="M31.75 16.375C31.75 14.3559 31.3523 12.3566 30.5796 10.4912C29.807 8.62586 28.6745 6.93093 27.2468 5.50323C25.8191 4.07553 24.1241 2.94302 22.2588 2.17035C20.3934 1.39769 18.3941 1 16.375 1C14.3559 1 12.3566 1.39769 10.4912 2.17035C8.62586 2.94302 6.93093 4.07553 5.50323 5.50323C4.07553 6.93093 2.94302 8.62586 2.17035 10.4912C1.39769 12.3566 1 14.3559 1 16.375C1 20.4527 2.61986 24.3634 5.50323 27.2468C8.3866 30.1301 12.2973 31.75 16.375 31.75C20.4527 31.75 24.3634 30.1301 27.2468 27.2468C30.1301 24.3634 31.75 20.4527 31.75 16.375Z"
        fill="url(#paint0_linear_4204_1306)"
        stroke="#EFE8D8"
        strokeWidth="1.5"
        strokeLinecap="round"
        strokeLinejoin="round"
      />
      <path
        d="M18.13 21.25L13 16.125L18.13 11"
        stroke="#EFE8D8"
        strokeLinecap="round"
        strokeLinejoin="round"
      />
      <defs>
        <linearGradient
          id="paint0_linear_4204_1306"
          x1="3.69063"
          y1="31.7368"
          x2="31.6731"
          y2="31.7368"
          gradientUnits="userSpaceOnUse"
        >
          <stop stopColor="#9A793D" />
          <stop offset="1" stopColor="#FFDA91" />
        </linearGradient>
      </defs>
    </svg>
  );
};

export default QuestionButtonIcon;
