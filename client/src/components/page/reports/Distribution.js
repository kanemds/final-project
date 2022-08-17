import React, { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import { AgChartsReact } from 'ag-charts-react';

import { api_base } from 'config'

const Distribution = ({scores}) => {
  const navigate = useNavigate();
  const  options = {
    title: {
      text: 'Scores',
    },
    data: scores,
    series: [
      {
        type: 'histogram',
        xKey: 'score',
        xName: 'Score',
        binCount: 20,
      },
    ],
    legend: {
      enabled: false,
    },
    axes: [
      {
        type: 'number',
        position: 'bottom',
        // title: { text: 'Scores' },
      },
      {
        type: 'number',
        position: 'left',
        title: { text: 'Number of attempts' },
      },
    ],
  };
  return (
    <AgChartsReact options={options} />
  )
}
export default Distribution;