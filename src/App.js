import React, { useState, useEffect } from 'react';
import './App.scss';
import LineGraph from './LineGraph';


function App() {

  let x = [1,2,3,4,5,6,7,8];
  let y = [12,44,45,55,57,82,94,131]; 
  const [a, setA] = useState(0);
  const [b, setB] = useState(0);  
  const [linearRegY, setLinearRegY] = useState([])
 
  const calculateAlpha = (n, sigmaX, sigmaY, sigmaXY, sigmaXpow2) => {
    return ((sigmaY*sigmaXpow2) - (sigmaX*sigmaXY)) / ((n*sigmaXpow2) - Math.pow(sigmaX, 2))
  };

  const calculateBeta = (n,sigmaX, sigmaY, sigmaXY, sigmaXpow2) => {
    return ((n*sigmaXY) - (sigmaX*sigmaY)) / ((n*sigmaXpow2) - Math.pow(sigmaX, 2))
  };

  useEffect(()=> {
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

    setA(calculateAlpha(x.length, sigmaX, sigmaY, sigmaXY, sigmaXpow2));
    setB(calculateBeta(x.length, sigmaX, sigmaY, sigmaXY, sigmaXpow2, sigmaYpow2));

    let regY = x.reduce((tot,curr)=> {
      tot.push((curr*b)+a);
      return tot;
    }, []); 

    setLinearRegY(regY)    
  }, [a, b, x, y])

  return (
    <div>        
      <LineGraph x={x} y={y} yReg={linearRegY} />  
      <h1>Y = {a.toFixed(3)} + {b.toFixed(3)}X</h1> 
    </div>
  );
}

export default App;
