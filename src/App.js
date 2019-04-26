import React, { useState, useEffect } from 'react';
import './App.scss';
import LineGraph from './LineGraph';

function App() {

  let x = [1,2,3,4,5,6,7,8];
  let y = [12,44,45,55,57,82,94,131]; 
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

    let Ypow2Arr = await y.reduce((tot, curr) => {
      tot.push(Math.pow(curr, 2));
      return tot;
    }, []);

    let sigmaX = await x.reduce((tot,curr) => tot+curr);
    let sigmaY = await y.reduce((tot,curr) => tot+curr);    
    let sigmaXY = await xyArr.reduce((tot,curr) => tot+curr); 
    let sigmaXpow2 = await Xpow2Arr.reduce((tot,curr) => tot+curr);
    let sigmaYpow2 = await Ypow2Arr.reduce((tot,curr) => tot+curr);   
    let alpha = await calculateAlpha(x.length, sigmaX, sigmaY, sigmaXY, sigmaXpow2);
    let beta = await calculateBeta(x.length, sigmaX, sigmaY, sigmaXY, sigmaXpow2, sigmaYpow2);

    return { a: alpha, b:beta};    
  }

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
  }

  useEffect(()=> {
    updateLinRegGraph();    
  }, [linearRegY, a, b, x, y])


  return (
    <div>        
      <LineGraph x={x} y={y} yReg={linearRegY} a={a}/>  
      <h1>Y = {a.toFixed(3)} + {b.toFixed(3)}X</h1> 
    </div>
  );
}

export default App;
