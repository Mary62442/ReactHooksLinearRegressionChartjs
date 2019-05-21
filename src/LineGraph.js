import React, { useEffect, useRef, useState } from 'react';
import './App.scss';
import Chart from "chart.js";
let myChart;

function LineGraph(props) {
    const graphLineRef = useRef();
    const xAxisRef = useRef();
    const yAxisRef = useRef();
    const [xAxisLabel, setXAxisLabel ] = useState("X Axis");
    const [yAxisLabel, setYAxisLabel] = useState("Y Axis");
    
    

    useEffect(() => {      
        if (typeof myChart !== "undefined") myChart.destroy();      
        let canvasTDContext = graphLineRef.current.getContext('2d');
        myChart = new Chart(canvasTDContext, {
        type: 'scatter',
        data: {
            datasets: [{                      
                data: props.data,        
                label: "Original Data",
                borderColor: "lime",
                backgroundColor: "lime",
                fill: false,  
                pointStyle: "crossRot", 
                borderWidth:0.001,
                pointBorderWidth:3,
                hoverBorderWidth:3,                
                pointHoverRadius:7,
                pointRadius: 7,           
                animation:false,
                lineTension:0,
                showLine: false           
            },
            {                 
                data: props.regData,
                label: "Linear Regression (Line of Best Fit)",
                borderColor: "red",
                backgroundColor: "red",
                fill: false,           
                borderWidth: 2,
                pointRadius: 5,    
                hoverBorderWidth:2,                
                pointHoverRadius:5,       
                animation:false,
                lineTension:0,
                showLine: true                
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
                        beginAtZero:true,
                        min: 0,          
                        //max: props.y[props.y.length+1],
                        stepSize:10                     
                    },
                    scaleLabel: {
                        display: true,
                        labelString: yAxisLabel
                    }
                }],
                xAxes: [{                    
                    type: 'linear',
                    position: 'bottom',
                    gridLines: {
                        color:"rgba(255,255,255,0.3)",
                    },
                    ticks: {  
                        suggestedMin: 0,                                      
                        beginAtZero:true,
                       // maxTicksLimit: props.x[props.x.length+1],
                        min: 0,
                        stepSize:1                          
                    },
                    scaleLabel: {
                        display: true,                       
                        labelString: xAxisLabel
                    }
                }],              
                
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
        
    },[props.data,props.regData,xAxisLabel,yAxisLabel]);

    return (
        <div className = "linear-regression-chart-container">
           
            <input ref={xAxisRef} type="text"></input>
            <button onClick = {() => setXAxisLabel(xAxisRef.current.value)}>Set X Axis Label</button>
        
            <input ref={yAxisRef} type="text"></input>
            <button onClick = {() => setYAxisLabel(yAxisRef.current.value)}>Set X Axis Label</button>
            
            <canvas height="400" width="800" ref={graphLineRef}></canvas>
        </div>
        
    );
}

export default LineGraph;
