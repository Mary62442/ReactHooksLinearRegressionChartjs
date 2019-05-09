import React, { useState, useEffect } from 'react';
import './App.scss';

function InputData(props) { 

    const [dataSet, setDataSet] = useState([]);
    const [currentX, setCurrentX] = useState("");
    const [currentY, setCurrentY] = useState("");


    let data = dataSet.map((el,index) => {
        return (
            <div key ={index}><span>{el.x}</span>---<span>{el.y}</span></div>
        )
    });

    const pushData = async (e) => {
        setDataSet([...dataSet, {x:currentX === "" ? 0 : currentX, y:currentY === "" ? 0 :currentY}]);
        setCurrentX("");
        setCurrentY("");        
        e.preventDefault();
    }

    useEffect (() => {props.callbackFromParent(dataSet);}, [dataSet])

    const handleCurrentX = (e) => { setCurrentX(e.target.value); }
    const handleCurrentY = (e) => { setCurrentY(e.target.value); }


    
    return(
        <div>
            <form onSubmit={pushData}>
            <label>X:
            <input type="text" value={currentX} onChange={handleCurrentX}></input>
            </label>
            <label>Y:
            <input type="text"  value={currentY} onChange={handleCurrentY}></input>
            </label>
            
            <input type="submit"></input>
            </form>
        
        {data}
        </div>
    )
}
export default InputData;