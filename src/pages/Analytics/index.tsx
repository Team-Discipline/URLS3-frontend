
import React, { useState, useEffect } from 'react';
import AnalyticsSidebar from '../../components/AnalyticsSidebar';
import styled from 'styled-components';
import { Bar } from 'react-chartjs-2';
import { Chart as ChartJS, CategoryScale, LinearScale, BarElement, Title, Tooltip, Legend } from 'chart.js';
ChartJS.register(CategoryScale, LinearScale, BarElement, Title, Tooltip, Legend);

const Analytics = () => {
  const [countries] = useState(['1st', '2nd', '3rd', '4th']);
  // 서버에서 country들의 순위 특정 수까지 가져오기
  const [countryData] = useState([20, 15, 10, 5]);
  const [chartData, setChartData] = useState({});
  const [chartOptions, setChartOptions] = useState({});

  useEffect(() => {
    setChartData({
      labels: countries,
      datasets: [
        {
          label: 'Member',
          data: countryData,
          borderColor: 'rgb(53, 162, 235)',
          backgroundColor: 'rgb(53, 162, 235, 0.4)'
        }]
    });
    setChartOptions({
      responsive: true,
      plugins: {
        legend: {
          position: 'top'
        },
        title: {
          display: true,
          text: 'Country'
        }
      }
    });
  }, []);
  return (
            <Container>
                <AnalyticsSidebar/>
                <BarBox>
                    <Bar options={chartOptions} data={chartData}/>
                </BarBox>
                </Container>

  );
};

export default Analytics;

const Container = styled.div`
    display: flex;
`;

const BarBox = styled.div`
  margin-left: 25%;
  width: 90vw;
  max-width: 900px;
`;
