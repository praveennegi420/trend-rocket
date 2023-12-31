import * as React from 'react';
import {LineChart}  from '@mui/x-charts/LineChart';

const pData = [10,15,25,20,30,35,50,60,85];
const xLabels = [
  'Page A', 
  'Page B',   
  'Page C',
  'Page D', 
  'Page E',
  'Page F',
  'Page G',
];

export default function SimpleLineChart() {
  return (
    <LineChart
      width={230}
      height={153.602}
      series={[
        { data: pData, showMark:false, color:'rgb(18, 183, 106)', area:true, areaOpacity:10},
      ]}
      sx={{'.MuiChartsAxis-directionY': {display: 'none'},'.MuiChartsAxis-directionX': {display: 'none'}, '.css-38iwmo-MuiLineElement-root':{strokeWidth: 4}, '.css-1hp1zkn-MuiAreaElement-root': {fill: '#c8fbe3'}}}
    //   xAxis={[{ scaleType: 'point', data: xLabels }]}
    />
  );
}