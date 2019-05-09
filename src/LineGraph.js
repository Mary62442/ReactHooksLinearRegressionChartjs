import React, { useEffect, useRef } from 'react';
import './App.scss';
import Chart from "chart.js";
import { whileStatement } from '@babel/types';

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
                borderColor: "lime",
                backgroundColor: "lime",
                fill: false,  
                pointStyle: "cross", 
                borderWidth:0.001,
                pointBorderWidth:3,
                hoverBorderWidth:3,                
                pointHoverRadius:7,
                pointRadius: 7,           
                animation:false,
                lineTension:0                
            },
            { 
                data: props.yReg,
                label: "Linear Regression (Line of Best Fit)",
                borderColor: "red",
                backgroundColor: "red",
                fill: false,           
                borderWidth: 2,
                pointRadius: 5,    
                hoverBorderWidth:2,                
                pointHoverRadius:5,       
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
                    gridLines: {
                        color:"rgba(255,255,255,0.3)",
                    },
                    ticks: {
                        min: 0,          
                        max: props.y[props.y.length-1],
                        
                    }
                }],
                xAxes: [{
                    display: true,
                    gridLines: {
                        color:"rgba(255,255,255,0.3)",
                    },
                    ticks: {
                        max: props.x[props.x.length-1],
                        min: 0,
                        stepSize: 0.5,
                        
                    }
                }]
            },
            title: {
                display: true,
                text: "Linear regression", 
                fontColor:"rgba(255,255,255,0.6)",
                fontSize:20     
            },
            legend: {
                labels: {
                    fontColor:"rgba(255,255,255,0.6)"    
                }
            },
            responsive: true,
            maintainAspectRatio:false            
        }
        });
    },[props.yReg, props.x, props.y]);

    return (
        <div className = "linear-regression-chart-container">
            <canvas height="400" width="800" ref={graphLineRef}></canvas>
        </div>
        
    );
}

export default LineGraph;
