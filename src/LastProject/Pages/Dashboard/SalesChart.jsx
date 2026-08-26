import { useEffect, useRef, useState } from 'react';
import Chart from 'chart.js/auto';

const SalesChart = () => {
    const canvasRef = useRef(null);
    const [isDark, setIsDark] = useState(() => document.body.classList.contains('dark'));

    useEffect(() => {
        const observer = new MutationObserver(() => {
            setIsDark(document.body.classList.contains('dark'));
        });
        observer.observe(document.body, { attributes: true, attributeFilter: ['class'] });
        return () => observer.disconnect();
    }, []);

    useEffect(() => {
        const labels = ["فروردین", "اردیبهشت", "خرداد", "تیر", "مرداد", "شهریور", "مهر", "آبان", "آذر", "دی", "بهمن", "اسفند"];
        const datapoints = [0, 20, 34, 12, 16, 62, 13, 8, 4, 2, 7, 17];
        const textColor = isDark ? '#cbd5e1' : '#334155';
        const gridColor = isDark ? '#334155' : '#e2e8f0';

        const chart = new Chart(canvasRef.current, {
            type: 'line',
            data: {
                labels,
                datasets: [
                    {
                        label: "فروش ماه",
                        data: datapoints,
                        borderColor: "#6366f1",
                        backgroundColor: "rgba(99, 102, 241, 0.15)",
                        fill: true,
                        cubicInterpolationMode: 'monotone',
                        tension: 0.4,
                    },
                ],
            },
            options: {
                responsive: true,
                maintainAspectRatio: false,
                plugins: {
                    title: {
                        display: true,
                        text: 'نمودار فروش یک سال',
                        color: textColor,
                    },
                    legend: {
                        labels: { color: textColor },
                    },
                },
                interaction: {
                    intersect: false,
                },
                scales: {
                    x: {
                        display: true,
                        ticks: { color: textColor },
                        grid: { color: gridColor },
                    },
                    y: {
                        display: true,
                        title: {
                            display: true,
                            text: 'میلیون تومان',
                            color: textColor,
                        },
                        ticks: { color: textColor },
                        grid: { color: gridColor },
                    },
                },
            },
        });

        return () => chart.destroy();
    }, [isDark]);

    return (
        <div className="w-full h-full min-h-72 card-surface p-4">
            <canvas ref={canvasRef}></canvas>
        </div>
    );
};

export default SalesChart;
