import React, { useEffect, useRef } from 'react';
import './App.scss';
import Chart from "chart.js";

function LineGraph(props) {
    const graphLineRef = useRef();

    useEffect(() => {
        let canvasTDContext = graphLineRef.current.getContext('2d');
        let lineGraph = new Chart(canvasTDContext, {
        type: 'line',
        data: {
            labels: props.x,
            datasets: [{ 
                data: props.y,
                label: "Original Data",
                borderColor: "green",
                fill: false,  
                pointStyle: "cross", 
                borderWidth:0.001,
                pointBorderWidth:3,
                pointHoverRadius:5,
                pointRadius: 5,           
                animation:false,
                lineTension:0                
            },
            { 
                data: props.yReg,
                label: "Linear Regression (Line of Best Fit)",
                borderColor: "red",
                fill: false,           
                borderWidth: 1,
                pointRadius: 3,           
                animation:false,
                lineTension:0                
            }]
        },
        options: {            
            animation: {
                duration: 0,
            },
            hover: {
                animationDuration: 0,
            },
            responsiveAnimationDuration: 0,     
            scales: {        
                yAxes: [{
                    display: true,
                    ticks: {
                    min: 0,
                    //stepSize: 15,              
                    max: props.y[props.y.length-1]
                    }
                }],
                xAxes: [{
                    display: true,
                    ticks: {
                    max: props.x[props.x.length-1],
                    min: 0,
                    stepSize: 0.5
                    }
                }]
            },
            title: {
                display: true,
                text: "Linear regression",        
            },
            responsive: false,
            maintainAspectRatio:true            
        }
        }, [props.x,props.y]);
    });

    return (
        <canvas height="400" width="800" ref={graphLineRef}></canvas>
    );
}

export default LineGraph;
