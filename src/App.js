import React, { useState, useEffect } from 'react';
import './App.scss';
import LineGraph from './LineGraph';
import InputData from './InputData';

function App() {

  const [dataSet, setDataSet] = useState([{x:0, y:2}, {x:5, y:12}, {x:7, y:44}, {x:8, y:45}, {x:11, y:55}, {x:17, y:57}, {x:20, y:82}])
  const [a, setA] = useState(0);
  const [b, setB] = useState(0);  
  const [linearReg, setLinearReg] = useState([]);
 
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
      tot.push({x:curr.x, y:(curr.x*eq.b)+eq.a});
      return tot;
    }, []);  

      setA(eq.a);
      setB(eq.b);
      setLinearReg(regressionData);     
  };

  const inputDataCallback = (data) => {
    if(data.length >=1) {
      setDataSet(data);   
    }     
  };

  useEffect(()=> {
    updateLinRegGraph();    
  }, [dataSet]);


  return (
    <div>  
      <div className = "graph-input-container">
      <InputData className = "input-data-container" callbackFromParent = {inputDataCallback}/>      
      <LineGraph className = "graph-container" data = {dataSet} regData={linearReg} />  
      </div>
      
     
      <h1>Y = {a.toFixed(3)} + {b.toFixed(3)}X</h1> 
    </div>
  );
}

export default App;
