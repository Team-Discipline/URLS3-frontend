import React, {useEffect, useState} from "react";
import {useSelector} from "react-redux";
import {ArcElement, Chart as ChartJS, Legend, Tooltip} from "chart.js";
import styled from "styled-components";
import {RootState} from "../../../redux/store";
import AnalyticsSidebar from "./AnalyticsSidebar";
import {DoughnutChart} from "./DoughnutChart";
import {useTranslation} from "react-i18next";

ChartJS.register(ArcElement, Tooltip, Legend);
const Analytics = () => {
    const {t} = useTranslation();
    const [users, setUsers] = useState(['']);
    const [userData, setUserData] = useState([]);
    const country = useSelector((state: RootState) => state.Country.countries);
    useEffect(() => {
        setUsers(Object.keys(country));
        setUserData(Object.values(country));
        console.log(users, userData);
    }, [country]);
    const data = {
        labels: users,
        datasets: [
            {
                label: "users",
                data: userData,
                backgroundColor: [
                    "rgba(255, 99, 132, 0.2)",
                    "rgba(54, 162, 235, 0.2)",
                    "rgba(255, 206, 86, 0.2)",
                    "rgba(75, 192, 192, 0.2)",
                    "rgba(153, 102, 255, 0.2)",
                    "rgba(255, 159, 64, 0.2)",
                ],
                borderColor: [
                    "rgba(255, 99, 132, 1)",
                    "rgba(54, 162, 235, 1)",
                    "rgba(255, 206, 86, 1)",
                    "rgba(75, 192, 192, 1)",
                    "rgba(153, 102, 255, 1)",
                    "rgba(255, 159, 64, 1)",
                ],
                borderWidth: 1,
            },
        ],
    };

    return (
        <Container>
            <AnalyticsSidebar/>
            <Chart>
                <h2>{t('Number of URL visitors by country')}</h2>
                {userData.toString() !== [].toString() ? <DoughnutChart data={data} key={JSON.stringify(data)}/> :
                    <NoData>
                        <h3>{t(`No data in here`)}</h3>
                    </NoData>}
            </Chart>
        </Container>
    );
};

export default Analytics;

const Container = styled.div`
  display: flex;
  justify-content: center;
  align-items: center;
  height: 80vh;
`;
const Chart = styled.div`
  display: flex;
  flex-direction: column;
  justify-content: center;
  align-items: center;
  margin-top: 5%;
  margin-left: 20%;
  width: 80%;
  height: 90%;
`;
const NoData = styled.div`
  width: 100%;
  height: 100%;
  display: flex;
  text-align: center;
  flex-direction: column;
  margin-top: 20%;
  max-width: 60%;
`;
