import { Box } from '@chakra-ui/react';
import React, { useState, useEffect } from 'react';
import { Line } from 'react-chartjs-2';
import Chart from 'chart.js/auto';

const ChartPatient = ({ chartData }) => {
    const [graph, setGraph] = useState({
        labels: [],
        patient: [],
    });

    useEffect(() => {
        const labels = [];
        const patient = [];

        chartData?.map((item) => {
            labels.push(item?.label);
            patient.push(item?.patient);

        });

        setGraph({
            labels: labels,
            patient: patient,
        });

    }, []);

    const data = {
        labels: graph.labels,
        datasets: [
            {
                label: 'Pasien',
                data: graph.patient,
                fill: true,
                backgroundColor: '#2FEDD654',
                borderColor: '#2F80ED',
            },
        ],
    };

    const options = {
        scales: {
            y: {
                beginAtZero: true
            }
        }
    };

    return (
        <Line
            data={data}
            options={options}
            w='100%'
            height='auto'
        />

    );
}

export default ChartPatient;
