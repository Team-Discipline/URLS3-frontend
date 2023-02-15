import React, { useEffect, useState } from "react";
import { useSelector } from "react-redux";
import { ArcElement, Chart as ChartJS, Legend, Tooltip } from "chart.js";
import styled from "styled-components";
import { RootState } from "../../../redux/store";
import AnalyticsSidebar from "../../blocks/Analytics/AnalyticsSidebar";
import { DoughnutChart } from "../../atoms/Analytics/DoughnutChart";

ChartJS.register(ArcElement, Tooltip, Legend);
const Analytics = () => {
    const [users, setUsers] = useState(["country"]);
    const [userDatas, setUserDatas] = useState([1]);
    const country = useSelector((state: RootState) => state.Country.countries);
    useEffect(() => {
        setUsers(Object.keys(country));
        setUserDatas(Object.values(country));
    }, []);
    const data = {
        labels: users,
        datasets: [
            {
                label: "user",
                data: userDatas,
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
            <AnalyticsSidebar />
            <DoughnutChart data={data} />
        </Container>

    );
};

export default Analytics;

const Container = styled.div`
  display: flex;
`;