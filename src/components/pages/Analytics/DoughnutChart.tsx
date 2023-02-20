import { Doughnut } from 'react-chartjs-2';
import React from 'react';
import styled from 'styled-components';

export const DoughnutChart = ({ data }: any) => {
  return (
        <BarBox>
            <Doughnut data={data} />
        </BarBox>
  );
};

const BarBox = styled.div`
  margin-left: 25%;
  width: 200vw;
  height: 100vw;
  max-width: 45%;
`;
