import React, { useState, useEffect } from 'react';
import './styles.scss';

function InputData(props) { 

    const [dataSet, setDataSet] = useState(props.data);
    const [currentX, setCurrentX] = useState("");
    const [currentY, setCurrentY] = useState("");

    let data = dataSet.map((el,index) => {
        return (
            <div key ={index} className = "input-data-cells">
                <p>{el.x}</p>
                <p>{el.y}</p>               
            </div>
        )
    });

    const pushData = async (e) => {
        setDataSet([...dataSet, {x:currentX === "" ? 0 : currentX, y:currentY === "" ? 0 :currentY}]);
        setCurrentX("");
        setCurrentY("");        
        e.preventDefault();
    };

    useEffect (() => {props.callbackFromParent(dataSet);}, [dataSet]);

    const handleCurrentX = (e) => { setCurrentX(e.target.value); };
    const handleCurrentY = (e) => { setCurrentY(e.target.value); };

    return(
        <div className = "input-data-main">
            <div className = "input-data-container"> 
            <h3>Input Graph Data</h3>   
                <form onSubmit={pushData}>
                    <div className = "labels-inputs-container">
                        <label>X:</label>
                        <input type="text" value={currentX} onChange={handleCurrentX}></input>
                    </div>
                    <div className = "labels-inputs-container">
                        <label>Y:</label>    
                        <input type="text"  value={currentY} onChange={handleCurrentY}></input>   
                    </div>                    
                    <input type="submit"></input>
                </form>  
                <div className ="input-cells-container">
                    {data}
                </div>  
                {dataSet.length > 0 &&
                <button className = "clear-data" onClick = {()=>{setDataSet([])}}>Clear data</button>
            }
        </div>
        </div>
        
    )
}
export default InputData;