import React, { useState, useEffect } from 'react';
import './styles.scss';
import LineGraph from './LineGraphComponent/index';
import InputData from './InputDataComponent/index';
import PredictValue from './PredictValueComponent/index';
import DataCases from './DataCasesComponent/index';

function LinearRegression() {

  const [dataSet, setDataSet] = useState([{x:0, y:2}, {x:5, y:12}, {x:7, y:44}, {x:8, y:45}, {x:11, y:55}, {x:17, y:57}, {x:20, y:82}, {x:24, y:90},{x:32, y:111}])
  const [a, setA] = useState(0);
  const [b, setB] = useState(0);  
  const [linearReg, setLinearReg] = useState([]);
  const [labels, setLabels] = useState();

 
  const calculateAlpha = (n, sigmaX, sigmaY, sigmaXY, sigmaXpow2) => {
    return ((sigmaY*sigmaXpow2) - (sigmaX*sigmaXY)) / ((n*sigmaXpow2) - Math.pow(sigmaX, 2))
  };

  const calculateBeta = (n,sigmaX, sigmaY, sigmaXY, sigmaXpow2) => {
    return ((n*sigmaXY) - (sigmaX*sigmaY)) / ((n*sigmaXpow2) - Math.pow(sigmaX, 2))
  };

  const findLinRegEquation = async () => {     

    let xyArr = await dataSet.reduce((tot,curr,i) => {
      let xy = curr.x * curr.y;
      tot.push(xy);
      return tot;
    },[]);   
       
    let Xpow2Arr = await dataSet.reduce((tot, curr) => {
      tot.push(Math.pow(curr.x, 2));
      return tot;
    }, []); 

    let sigmaX = await dataSet.reduce((tot,curr) => +tot + +curr.x,[]);
    let sigmaY = await dataSet.reduce((tot,curr) => +tot + +curr.y,[]);  
    let sigmaXY = await xyArr.reduce((tot,curr) => tot+curr); 
    let sigmaXpow2 = await Xpow2Arr.reduce((tot,curr) => tot+curr); 
    
    let alpha =  calculateAlpha(dataSet.length, sigmaX, sigmaY, sigmaXY, sigmaXpow2);
    let beta =  calculateBeta(dataSet.length, sigmaX, sigmaY, sigmaXY, sigmaXpow2);

    return { a: alpha, b:beta};    
  };

  const updateLinRegGraph = async () => {
    let eq = await findLinRegEquation();   
    let regressionData = await dataSet.reduce((tot,curr)=> {
      tot.push({x:curr.x, y:((curr.x*eq.b)+eq.a).toFixed(3)});
      return tot;
    }, []);  
      setA(eq.a);
      setB(eq.b);
      setLinearReg(regressionData);           
  };

  const inputDataCallback = (data, labels) => { 
    if (typeof labels !== 'undefined') {
      setLabels(labels);
    }
      setDataSet(data);  
  };

  useEffect(()=> {
    if (dataSet.length === 0) {
      setLinearReg([]);
      setA(0);
      setB(0);
      setLabels({x:"X Axis", y:"Y Axis"});
      return;
    }
    updateLinRegGraph();     
  }, [dataSet]);

  return (
    <div className = "linear-regression-component-outer">
      <div className = "linear-regression-component-container">  
        <h1>Linear Regression</h1>
        <p>A case study employing Chart.js for the visualisation of scattered data and linear regression line of best fit.</p>    
        <p>The user can input data, change the axes' labels and find out the likely outcome of a value given the linear regression equation.</p>      
        <DataCases callbackFromParent = {inputDataCallback}/>
        <div className = "graph-input-container">
        <InputData  data = {dataSet} callbackFromParent = {inputDataCallback}/>      
        <LineGraph  data = {dataSet} regData={linearReg} labels={labels}/>  
        </div>
        <h2>Linear Regression Equation: Y = {a.toFixed(3)} + {b.toFixed(3)}X</h2>
        <PredictValue a = {a} b = {b}/> 
      </div>
    </div>
  );
}

export default LinearRegression;
