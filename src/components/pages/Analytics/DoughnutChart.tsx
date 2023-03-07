import {Doughnut} from 'react-chartjs-2';
import React from 'react';
import styled from 'styled-components';

export const DoughnutChart = ({data}: any) => {
    return (
        <BarBox>
            <Doughnut data={data}/>
        </BarBox>
    );
};

const BarBox = styled.div`
  width: 100%;
  height: 100%;
  max-width: 45%;
`;
