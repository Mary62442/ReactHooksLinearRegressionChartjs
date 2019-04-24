import React, { useState, useEffect, useRef } from 'react';
import logo from './logo.svg';
import './App.scss';
var Chart = require("chart.js");

function App() {

  const graphRef = useRef();

  const calculateAlpha = (n, sigmaX, sigmaY, sigmaXY, sigmaXpow2) => {
    return ((sigmaY*sigmaXpow2) - (sigmaX*sigmaXY)) / ((n*sigmaXpow2) - Math.pow(sigmaX, 2))
  };

  const calculateBeta = (n,sigmaX, sigmaY, sigmaXY, sigmaXpow2) => {
    return ((n*sigmaXY) - (sigmaX*sigmaY)) / ((n*sigmaXpow2) - Math.pow(sigmaX, 2))
  };

  const buildGraph = (x,y) => {
    let canvasTDContext = graphRef.current.getContext('2d');
    new Chart(canvasTDContext, {
      type: 'line',
      data: {
        labels: x,
        datasets: [{ 
            data: y,
            label: "Graph",
            borderColor: "green",
            fill: false,           
            borderWidth: 1,
            pointRadius: 2,           
            animation:false,
            cubicInterpolationMode:'monotone'  
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
              max: y[y.length-1]
            }
          }],
          xAxes: [{
            display: true,
            ticks: {
              max: x[x.length-1],
              min: 0,
              stepSize: 0.5
            }
          }]
        },
        title: {
          display: true,
          text: 'Graph',        
        },
        responsive: true,
        maintainAspectRatio:false,   
      }
    });
  }


  useEffect(()=> {

    let x = [1,2,3,4,5,6,7,8];

    let y = [12,34,45,55,67,82,94,111];    

    let xyArr = x.reduce((tot,curr,i) => {
      let xy = curr * y[i];
      tot.push(xy);
      return tot;
    }, []);

    let Xpow2Arr = x.reduce((tot, curr) => {
      tot.push(Math.pow(curr, 2));
      return tot;
    }, [])

    let Ypow2Arr = y.reduce((tot, curr) => {
      tot.push(Math.pow(curr, 2));
      return tot;
    }, []);

    let sigmaX = x.reduce((tot,curr) => tot+curr);
    let sigmaY = y.reduce((tot,curr) => tot+curr);    
    let sigmaXY = xyArr.reduce((tot,curr) => tot+curr); 
    let sigmaXpow2 = Xpow2Arr.reduce((tot,curr) => tot+curr);
    let sigmaYpow2 = Ypow2Arr.reduce((tot,curr) => tot+curr);

    let a = calculateAlpha(x.length, sigmaX, sigmaY, sigmaXY, sigmaXpow2);
    let b = calculateBeta(x.length, sigmaX, sigmaY, sigmaXY, sigmaXpow2, sigmaYpow2);

    let linearRegY = x.reduce((tot,curr)=> {
      tot.push((curr*b)+a);
      return tot;
    }, [])

    console.log(sigmaX, sigmaY, xyArr,sigmaXY, Xpow2Arr, Ypow2Arr, sigmaXpow2, sigmaYpow2);
    console.log(a, b);
    console.log(linearRegY); 
    
    buildGraph(x,linearRegY);
    
  })

  return (
    <div>
           
        <canvas height="400" width="400" ref={graphRef}></canvas>
     
    </div>
  );
}

export default App;
