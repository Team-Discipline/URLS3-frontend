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
    const [users, setUsers] = useState(['a', 'b', 'c', 'd']);
    const [userData, setUserData] = useState([10, 20, 30, 40]);
    const [visited, setVisited] = useState(true);
    const country = useSelector((state: RootState) => state.Country.countries);
    useEffect(() => {
        setUsers(Object.keys(country));
        setUserData(Object.values(country));
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
            <h2>{t('Number of URL visitors by country')}</h2>
            {visited ? <DoughnutChart data={data}/> : <h1>No data in here</h1>}
        </Container>
    );
};

export default Analytics;

const Container = styled.div`
  display: flex;
  flex-direction: column;
  justify-content: center;
  align-items: center;
  height: 100vh;
`;
