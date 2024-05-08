const LoadingCool = () => {
  return (
    <div
      role="status"
      className="absolute inset-0 flex w-full h-full items-center justify-center"
    >
      <svg
        xmlns="http://www.w3.org/2000/svg"
        viewBox="0 0 100 100"
        preserveAspectRatio="xMidYMid"
        width="63"
        height="63"
        className="block"
        xmlns:xlink="http://www.w3.org/1999/xlink"
      >
        <g>
          <circle cx="84" cy="50" r="10" fill="#5be1d3">
            <animate
              attributeName="r"
              repeatCount="indefinite"
              dur="0.25s"
              calcMode="spline"
              keyTimes="0;1"
              values="10;0"
              keySplines="0 0.5 0.5 1"
              begin="0s"
            ></animate>
            <animate
              attributeName="fill"
              repeatCount="indefinite"
              dur="1s"
              calcMode="discrete"
              keyTimes="0;0.25;0.5;0.75;1"
              values="#5be1d3;#8350ca;#f86af2;#e5f460;#5be1d3"
              begin="0s"
            ></animate>
          </circle>
          <circle cx="16" cy="50" r="10" fill="#5be1d3">
            <animate
              attributeName="r"
              repeatCount="indefinite"
              dur="1s"
              calcMode="spline"
              keyTimes="0;0.25;0.5;0.75;1"
              values="0;0;10;10;10"
              keySplines="0 0.5 0.5 1;0 0.5 0.5 1;0 0.5 0.5 1;0 0.5 0.5 1"
              begin="0s"
            ></animate>
            <animate
              attributeName="cx"
              repeatCount="indefinite"
              dur="1s"
              calcMode="spline"
              keyTimes="0;0.25;0.5;0.75;1"
              values="16;16;16;50;84"
              keySplines="0 0.5 0.5 1;0 0.5 0.5 1;0 0.5 0.5 1;0 0.5 0.5 1"
              begin="0s"
            ></animate>
          </circle>
          <circle cx="50" cy="50" r="10" fill="#e5f460">
            <animate
              attributeName="r"
              repeatCount="indefinite"
              dur="1s"
              calcMode="spline"
              keyTimes="0;0.25;0.5;0.75;1"
              values="0;0;10;10;10"
              keySplines="0 0.5 0.5 1;0 0.5 0.5 1;0 0.5 0.5 1;0 0.5 0.5 1"
              begin="-0.25s"
            ></animate>
            <animate
              attributeName="cx"
              repeatCount="indefinite"
              dur="1s"
              calcMode="spline"
              keyTimes="0;0.25;0.5;0.75;1"
              values="16;16;16;50;84"
              keySplines="0 0.5 0.5 1;0 0.5 0.5 1;0 0.5 0.5 1;0 0.5 0.5 1"
              begin="-0.25s"
            ></animate>
          </circle>
          <circle cx="84" cy="50" r="10" fill="#f86af2">
            <animate
              attributeName="r"
              repeatCount="indefinite"
              dur="1s"
              calcMode="spline"
              keyTimes="0;0.25;0.5;0.75;1"
              values="0;0;10;10;10"
              keySplines="0 0.5 0.5 1;0 0.5 0.5 1;0 0.5 0.5 1;0 0.5 0.5 1"
              begin="-0.5s"
            ></animate>
            <animate
              attributeName="cx"
              repeatCount="indefinite"
              dur="1s"
              calcMode="spline"
              keyTimes="0;0.25;0.5;0.75;1"
              values="16;16;16;50;84"
              keySplines="0 0.5 0.5 1;0 0.5 0.5 1;0 0.5 0.5 1;0 0.5 0.5 1"
              begin="-0.5s"
            ></animate>
          </circle>
          <circle cx="16" cy="50" r="10" fill="#8350ca">
            <animate
              attributeName="r"
              repeatCount="indefinite"
              dur="1s"
              calcMode="spline"
              keyTimes="0;0.25;0.5;0.75;1"
              values="0;0;10;10;10"
              keySplines="0 0.5 0.5 1;0 0.5 0.5 1;0 0.5 0.5 1;0 0.5 0.5 1"
              begin="-0.75s"
            ></animate>
            <animate
              attributeName="cx"
              repeatCount="indefinite"
              dur="1s"
              calcMode="spline"
              keyTimes="0;0.25;0.5;0.75;1"
              values="16;16;16;50;84"
              keySplines="0 0.5 0.5 1;0 0.5 0.5 1;0 0.5 0.5 1;0 0.5 0.5 1"
              begin="-0.75s"
            ></animate>
          </circle>
          <g></g>
        </g>
      </svg>
      <span className="font-medium text-base text-gray-700">
        Adding your post ...
      </span>
    </div>
  );
};
export default LoadingCool;
