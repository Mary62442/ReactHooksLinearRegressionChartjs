import React, { useState, useEffect } from 'react';
import './App.scss';
import LineGraph from './LineGraph';
import InputData from './InputData';

function App() {

  const [x, setX] = useState([1,2,3,4,5,6,7,8]);
  const [y, setY] = useState([12,44,45,55,57,82,94,131]); 
  const [dataSet, setDataSet] = useState([])
  const [a, setA] = useState(0);
  const [b, setB] = useState(0);  
  const [linearRegY, setLinearRegY] = useState([]);
 
  const calculateAlpha = (n, sigmaX, sigmaY, sigmaXY, sigmaXpow2) => {
    return ((sigmaY*sigmaXpow2) - (sigmaX*sigmaXY)) / ((n*sigmaXpow2) - Math.pow(sigmaX, 2))
  };

  const calculateBeta = (n,sigmaX, sigmaY, sigmaXY, sigmaXpow2) => {
    return ((n*sigmaXY) - (sigmaX*sigmaY)) / ((n*sigmaXpow2) - Math.pow(sigmaX, 2))
  };

  const findLinRegEquation = async (x,y) => {

    let xyArr = await x.reduce((tot,curr,i) => {
      let xy = curr * y[i];
      tot.push(xy);
      return tot;
    }, []);

    let Xpow2Arr = await x.reduce((tot, curr) => {
      tot.push(Math.pow(curr, 2));
      return tot;
    }, [])
    

    let sigmaX = await x.reduce((tot,curr) => tot+curr);
    let sigmaY = await y.reduce((tot,curr) => tot+curr);    
    let sigmaXY = await xyArr.reduce((tot,curr) => tot+curr); 
    let sigmaXpow2 = await Xpow2Arr.reduce((tot,curr) => tot+curr);    
    let alpha =  calculateAlpha(x.length, sigmaX, sigmaY, sigmaXY, sigmaXpow2);
    let beta =  calculateBeta(x.length, sigmaX, sigmaY, sigmaXY, sigmaXpow2);

    return { a: alpha, b:beta};    
  };

  const updateLinRegGraph = async () => {
    let eq = await findLinRegEquation(x,y); 
    let regY = await x.reduce((tot,curr)=> {
      tot.push((curr*eq.b)+eq.a);
      return tot;
    }, []); 

    if (linearRegY.length === 0) {
      setA(eq.a);
      setB(eq.b);
      setLinearRegY(regY);
    }  
  };

  const inputDataCallback = (data) => {
    setDataSet(data);    
  }
  useEffect(() => {
    if(dataSet.length >=2) {
      let findNewX = dataSet.reduce((tot, curr) => {tot.push(parseFloat(curr.x)); return tot}, []);
      let findNewY = dataSet.reduce((tot, curr) => {tot.push(parseFloat(curr.y)); return tot}, []);
      console.log(findNewX, findNewY)
    }
    //########################################    

  }, [dataSet])

  useEffect(()=> {
    updateLinRegGraph();    
  }, [linearRegY, a, b, x, y]);


  return (
    <div>  
       <InputData callbackFromParent = {inputDataCallback}/>      
      <LineGraph x={x} y={y} yReg={linearRegY} a={a}/>  
     
      <h1>Y = {a.toFixed(3)} + {b.toFixed(3)}X</h1> 
    </div>
  );
}

export default App;
