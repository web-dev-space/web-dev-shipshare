import React from 'react';

const ShippingStatusBar = ({
                             phaseNumber = 3,
                             animationWidth = 250,
                             circleRadius = 4.5,
                             largecircleRadius = 28,
                             orangeColor = '#F9C662',
                             grayColor = '#ECECEC',
                             dimmedOrangeColor = '#fffaf1',
                           }) => {
  const barWidth = (animationWidth - largecircleRadius * 2) / 3;

  return <svg width={animationWidth} height="56" view-box={`0 0 ${animationWidth} 2`}>
    {/*light yellow circle*/}
    {phaseNumber === 0 && <circle cx={largecircleRadius} cy="0" r={29} fill={dimmedOrangeColor}/>}
    {phaseNumber === 1 && <circle cx={largecircleRadius + barWidth} cy="0" r={29} fill={dimmedOrangeColor}/>}
    {phaseNumber === 2 && <circle cx={largecircleRadius + barWidth * 2} cy="0" r={29} fill={dimmedOrangeColor}/>}
    {phaseNumber === 3 && <circle cx={largecircleRadius + barWidth * 3} cy="0" r={29} fill={dimmedOrangeColor}/>}

    {/*bar*/}
    <rect x={largecircleRadius} y="0" width={barWidth * 3} height="2" fill={grayColor}/>
    <rect x={largecircleRadius} y="0" width={barWidth * phaseNumber} height="2" fill={orangeColor}/>

    {/*small dots*/}
    <circle cx={largecircleRadius} cy="0" r={circleRadius} fill="#F9C662"/>
    <circle cx={largecircleRadius + barWidth} cy="0" r={circleRadius}
            fill={phaseNumber <= 0 ? grayColor : orangeColor}/>
    <circle cx={largecircleRadius + barWidth * 2} cy="0" r={circleRadius}
            fill={phaseNumber <= 1 ? grayColor : orangeColor}/>
    <circle cx={largecircleRadius + barWidth * 3} cy="0" r={circleRadius} fill={grayColor}/>

    {/*orange large circle*/}
    {phaseNumber === 0 && <circle cx={largecircleRadius} cy="0" r={17} fill={orangeColor}/>}
    {phaseNumber === 1 && <circle cx={largecircleRadius + barWidth} cy="0" r={17} fill={orangeColor}/>}
    {phaseNumber === 2 &&
      <circle cx={largecircleRadius + barWidth * 2} cy="0" r={17} fill={orangeColor}/>}
    {phaseNumber === 3 &&
      <circle cx={largecircleRadius + barWidth * 3} cy="0" r={17} fill={orangeColor}/>}

    {/*icons*/}
    {phaseNumber === 0 &&
        <div style={{top: 16}}>
          <svg fill="none">
            <rect x={17 + 5} y={4} width={12} height={15} rx={2} stroke="white"/>
            <path x={17} y={0} d="M9 9H13" stroke="white" stroke-linecap="round"/>
            <path x={17} y={0} d="M9 12H13" stroke="white" stroke-linecap="round"/>
            <path x={17} y={0} d="M9 15H13" stroke="white" stroke-linecap="round"/>
          </svg>
        </div>
    }

    {phaseNumber === 1 &&
        <div style={{top: 18}}>
          <svg>
            <path
              d="M15.8005 4.67995L9.1851 1.04744C9.06986 0.984187 8.93014 0.984187 8.8149 1.04744L6.32722 2.41342C6.27103 2.42905 6.2186 2.45774 6.17413 2.49741L2.19952 4.67995C2.07647 4.74756 2 4.87676 2 5.01709V5.80345V6.57268V7.95729C2 7.95729 2 8.51423 2 8.72652V10.7265V11.4958V12.2823C2 12.4226 2.07647 12.5518 2.19952 12.6194L8.8149 16.2519C8.8726 16.2836 8.9363 16.2994 9 16.2994C9.0637 16.2994 9.1274 16.2836 9.1851 16.2519L15.8005 12.6194C15.9235 12.5518 16 12.4226 16 12.2823V10.5599C16 10.3476 15.8278 10.1753 15.6154 10.1753C15.4029 10.1753 15.2308 10.3476 15.2308 10.5599V12.0546L9.38462 15.2648V8.87721L11.2438 7.85633V9.47652C11.2438 9.61264 11.3157 9.73854 11.4327 9.80765C11.4929 9.84326 11.5607 9.86114 11.6285 9.86114C11.6922 9.86114 11.756 9.84536 11.8139 9.81351L13.2315 9.03331C13.3543 8.96571 13.4306 8.83665 13.4306 8.69633V6.65561L15.2308 5.66718V7.48298C15.2308 7.69542 15.4029 7.8676 15.6154 7.8676C15.8278 7.8676 16 7.69542 16 7.48298V5.01709C16 4.87676 15.9235 4.74756 15.8005 4.67995ZM8.61539 15.2648L2.76923 12.0546V5.66718L8.61539 8.87721V15.2648ZM9 8.2109L3.18374 5.01709L5.01172 4.01333L10.8281 7.20714L9 8.2109ZM11.6273 6.76829L5.81085 3.57448L6.44141 3.22833L12.2577 6.42214L11.6273 6.76829ZM12.6614 8.46901L12.0131 8.82583V7.43401L12.6614 7.07794V8.46901ZM13.0568 5.98328L7.24054 2.78948L9 1.82343L14.8163 5.01709L13.0568 5.98328Z"
              x={largecircleRadius + barWidth - 9} y={0} fill="white" stroke="white"
              width="0.2"/>
            <path
              d="M15.6153 8.63696C15.5142 8.63696 15.4149 8.67768 15.3434 8.74964C15.2719 8.82116 15.2307 8.92002 15.2307 9.02158C15.2307 9.12269 15.2719 9.222 15.3434 9.29351C15.4149 9.36503 15.5142 9.40619 15.6153 9.40619C15.7164 9.40619 15.8158 9.36503 15.8873 9.29351C15.9588 9.222 15.9999 9.12269 15.9999 9.02158C15.9999 8.92002 15.9588 8.82116 15.8873 8.74964C15.8158 8.67768 15.7164 8.63696 15.6153 8.63696Z"
              x={largecircleRadius + barWidth - 9} y={0} fill="white" stroke="white"
              stroke-width="0.2"/>
          </svg>
        </div>
    }

    {phaseNumber === 2 && <path
      d="M0.625 3.24992H8.75L9.375 4.49992H1.25L0.625 3.24992ZM1.45833 5.74992H9.58333L10.2083 6.99992H2.08333L1.45833 5.74992ZM15 12.4166C15.6917 12.4166 16.25 11.8583 16.25 11.1666C16.25 10.4749 15.6917 9.91658 15 9.91658C14.3083 9.91658 13.75 10.4749 13.75 11.1666C13.75 11.8583 14.3083 12.4166 15 12.4166ZM16.25 4.91658H14.1667V6.99992H17.8833L16.25 4.91658ZM6.66667 12.4166C7.35833 12.4166 7.91667 11.8583 7.91667 11.1666C7.91667 10.4749 7.35833 9.91658 6.66667 9.91658C5.975 9.91658 5.41667 10.4749 5.41667 11.1666C5.41667 11.8583 5.975 12.4166 6.66667 12.4166ZM16.6667 3.66658L19.1667 6.99992V11.1666H17.5C17.5 12.5499 16.3833 13.6666 15 13.6666C13.6167 13.6666 12.5 12.5499 12.5 11.1666H9.16667C9.16667 12.5499 8.04167 13.6666 6.66667 13.6666C5.28333 13.6666 4.16667 12.5499 4.16667 11.1666H2.5V8.24992H4.16667V9.49992H4.8C5.25833 8.99158 5.925 8.66658 6.66667 8.66658C7.40833 8.66658 8.075 8.99158 8.53333 9.49992H12.5V1.99992H2.5C2.5 1.07492 3.24167 0.333252 4.16667 0.333252H14.1667V3.66658H16.6667Z"
      x={largecircleRadius + barWidth * 2 - 10} y={-7} fill="white"/>}

    {phaseNumber === 3 && <path x={largecircleRadius + barWidth * 3 - 9} y={-9}
                                d="M8.99169 0.666748C4.39169 0.666748 0.666687 4.40008 0.666687 9.00008C0.666687 13.6001 4.39169 17.3334 8.99169 17.3334C13.6 17.3334 17.3334 13.6001 17.3334 9.00008C17.3334 4.40008 13.6 0.666748 8.99169 0.666748ZM12.525 14.0001L9.00002 11.8751L5.47502 14.0001L6.40835 9.99175L3.30002 7.30008L7.40002 6.95008L9.00002 3.16675L10.6 6.94175L14.7 7.29175L11.5917 9.98342L12.525 14.0001Z"
                                fill="white"/>}


  </svg>
}

export default ShippingStatusBar;
