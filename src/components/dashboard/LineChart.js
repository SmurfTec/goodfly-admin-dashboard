import React, { useEffect, useState } from 'react';
import ReactApexChart from 'react-apexcharts';

const LineChart = ({ reservations, orders }) => {
  const [chartData, setChartData] = useState({
    series: [
      // {
      //   name: 'Reservations',
      //   data: [28, 29, 33, 36, 32, 32, 33],
      // },
      // {
      //   name: 'Orders',
      //   data: [12, 11, 14, 18, 17, 13, 13],
      // },
    ],
    options: {
      chart: {
        height: 200,
        type: 'line',
        dropShadow: {
          enabled: true,
          color: '#000',
          top: 18,
          left: 7,
          blur: 10,
          opacity: 0.2,
        },
        toolbar: {
          show: false,
        },
      },
      colors: ['#77B6EA', '#15ab92'],
      dataLabels: {
        enabled: false,
      },
      stroke: {
        curve: 'smooth',
      },
      // title: {
      //   text: 'Average High & Low Temperature',
      //   align: 'left',
      // },
      grid: {
        borderColor: '#f2f2f2',
        row: {
          colors: ['#f2f2f2', 'transparent'], // takes an array which will be repeated on columns
          opacity: 0.5,
        },
      },
      // markers: {
      //   size: 1,
      // },
      xaxis: {
        categories: [
          'Jan',
          'Feb',
          'Mar',
          'Apr',
          'May',
          'Jun',
          'Jul',
          'Aug',
          'Sep',
          'Oct',
          'Nov',
          'Dec',
        ],
        // title: {
        //   text: 'Months',
        // },
      },
      yaxis: {
        // title: {
        //   text: 'Temperature',
        // },
        min: 0,
        max: 40,
      },
      legend: {
        position: 'top',
        horizontalAlign: 'right',
        // floating: true,
        // offsetY: -25,
        // offsetX: -5,
        show: true,
      },
    },
  });

  const currentYear = new Date().getFullYear();

  useEffect(() => {
    let orderSeries = [0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0]; // * Jan 0 , Feb 0 ,..
    let reservationSeries = [0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0]; // * Jan 0 , Feb 0 ,..
    // * we have to group reservations in months

    if (reservations?.length > 0) {
      console.log('here');
      reservations?.forEach((reservation) => {
        console.log('inside forEach');
        let reservationMonth = new Date(
          reservation.createdAt
        ).getMonth();
        let reservationYear = new Date(
          reservation.createdAt
        ).getFullYear();
        console.log(`reservationMonth`, reservationMonth);
        console.log(`reservationYear`, reservationYear);
        if (reservationYear === currentYear)
          reservationSeries[reservationMonth]++;
      });
    }
    if (orders?.length > 0 && orders !== 'loading') {
      // * we have to group orders in months
      orders.forEach((order) => {
        let orderMonth = new Date(order.createdAt).getMonth();
        let orderYear = new Date(order.createdAt).getFullYear();

        console.log(`orderMonth`, orderMonth);
        console.log(`orderYear`, orderYear);
        if (orderYear === currentYear) orderSeries[orderMonth]++;
      });
    }
    console.log(`reservationSeries`, reservationSeries);
    console.log(`orderSeries`, orderSeries);
    setChartData((st) => ({
      ...st,
      series: [
        {
          name: 'Reservations',
          data: reservationSeries,
        },
        {
          name: 'Orders',
          data: orderSeries,
        },
      ],
    }));
  }, [orders, reservations]);

  return (
    <ReactApexChart
      options={chartData.options}
      series={chartData.series.length > 0 ? chartData.series : []}
      type='line'
      height={280}
    />
  );
};

export default LineChart;
