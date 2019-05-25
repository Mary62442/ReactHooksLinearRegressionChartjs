import React, { useEffect, useRef, useState } from 'react';
import './styles.scss';
import Chart from "chart.js";
let myChart;

function LineGraph(props) {
    const graphLineRef = useRef();
    const xAxisRef = useRef();
    const yAxisRef = useRef();
    const [xAxisLabel, setXAxisLabel ] = useState("X Axis");
    const [yAxisLabel, setYAxisLabel] = useState("Y Axis");
    
    
    const findStepSize = (data, z) => {
        if (data.length === 0) return 1;
        let zArray = data.reduce((tot,curr) => {
            tot.push(+curr[z]);
            return tot;
        },[]);
        let maxZ = Math.max(...zArray);  
        let minZ = Math.min(...zArray);            
        let zRange = maxZ-minZ;   
        let zStepSize = Math.ceil(zRange/(zArray.length > 10 ? 10 : zArray.length));       
        return zStepSize;
    }

    useEffect(() => {
        if (typeof props.labels !== 'undefined') {
            setXAxisLabel(props.labels.x);
            setYAxisLabel(props.labels.y);
        }        
    },[props.labels]);
    

    useEffect(() => {   
       
        if (typeof myChart !== "undefined") myChart.destroy();      
        let canvasTDContext = graphLineRef.current.getContext('2d');
        myChart = new Chart(canvasTDContext, {
        type: 'scatter',
        data: {
            datasets: [{                      
                data: props.data,        
                label: "Original Data",
                borderColor: "#039800",
                backgroundColor: "#039800",
                fill: false,  
                pointStyle: "crossRot", 
                borderWidth:0.001,
                pointBorderWidth:3,                
                pointRadius: 6,           
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
                borderWidth: props.data.length > 100 ? 1 : 2,
                pointRadius: props.data.length > 100 ? 1 : 3, 
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
                        color:"rgba(0,0,0,0.3)",
                    },
                    ticks: {
                        stepSize:findStepSize(props.data, "y")                     
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
                        color:"rgba(0,0,0,0.3)",
                    },
                    ticks: {
                        stepSize:findStepSize(props.data, "x")                          
                    },
                    scaleLabel: {
                        display: true,                       
                        labelString: xAxisLabel
                    }
                }],              
                
            },
            legend: {
                labels: {
                    fontColor:"rgba(0,0,0,0.6)"    
                }
            },
            responsive: true,
            maintainAspectRatio:false            
        }
        });
        
    },[props.data,props.regData,xAxisLabel,yAxisLabel]);

    return (
        <div className = "linear-regression-chart-container">
           <h3>Set Axes Labels</h3>
           <div className = "set-axis-container">
            <input ref={xAxisRef} type="text"></input>
            <button onClick = {() => setXAxisLabel(xAxisRef.current.value)}>Set X Axis Label</button>        
            <input ref={yAxisRef} type="text"></input>
            <button onClick = {() => setYAxisLabel(yAxisRef.current.value)}>Set Y Axis Label</button>
            
           </div>
            <div className = "graph-canvas-container">
            <canvas height="350" width="800" ref={graphLineRef}></canvas>
            </div>
            
        </div>
        
    );
}

export default LineGraph;
