import React, { useState } from 'react';
import CostBarChart from './CostBarChart';
import CostRollingBarChart from './CostRollingBarChart';

const ChartContainer = () => {
    const [selectedChart, setSelectedChart] = useState('bar');

    const handleTabClick = (chartType) => {
        setSelectedChart(chartType);
    };

    const renderChart = () => {
        switch (selectedChart) {
            case 'bar':
                return <BarChart data={barChartData} options={barChartOptions} />;
            case 'line':
                return <LineChart data={lineChartData} options={lineChartOptions} />;
            case 'pie':
                return <PieChart data={pieChartData} options={pieChartOptions} />;
            default:
                return null;
        }
    };

    return (
        <div>
            <div>
                <button onClick={() => handleTabClick('bar')}>Bar Chart</button>
                <button onClick={() => handleTabClick('line')}>Line Chart</button>
                <button onClick={() => handleTabClick('pie')}>Pie Chart</button>
            </div>
            {renderChart()}
        </div>
    );
};

export default ChartContainer;
