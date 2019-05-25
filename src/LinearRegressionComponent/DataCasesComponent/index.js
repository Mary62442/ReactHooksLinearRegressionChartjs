import React, { useRef } from 'react';
import './styles.scss';


function DataCases(props) { 
    
    const formUpload = useRef();
    const salesAdsArr = [{x:11,y:345},{x:15,y:565},{x:20,y:605},{x:23,y:645},{x:26,y:789},{x:32,y:874},{x:34,y:1123},{x:37,y:1356},{x:48,y:1876},{x:52,y:2034},{x:55,y:2344},{x:57,y:2436},{x:59,y:2537},{x:63,y:2687},{x:68,y:2978},{x:70,y:3153},{x:74,y:3266},{x:84,y:4021},{x:91,y:4533}];
    const populationArr = [{x:1800,y:1},{x:1927,y:2},{x:1960,y:3},{x:1974,y:4},{x:1987,y:5},{x:1999,y:6},{x:2011,y:7}];

    const acquireJsonData = (e) => {
        let labels = {x:"X Axis", y:"Y Axis"};
        const reader = new FileReader();
        reader.onload = (event) => {
          let dataFromJSON = JSON.parse(event.target.result);  
          props.callbackFromParent(dataFromJSON, labels);
        };
        reader.readAsText(e.target.files[0]); 
    }
    
    const getRandomInt = (max) => Math.floor(Math.random() * Math.floor(max));

    const getRouletteData = () => {
        let ar = [];
        for(let counter = 0; counter < 500; counter ++) ar.push({x:counter,y:getRandomInt(37)});
        let labels = {x:"Spins", y:"Roulette number"};
        props.callbackFromParent(ar, labels);
    };

    const getSalesData = () => {
        let labels = {x:"Advertising (million euros)", y:"Sales (million euros)"};
        props.callbackFromParent(salesAdsArr, labels);
    };

    const getPopulationData = () => {
        let labels = {x:"Year", y:"World population (billions)"};
        props.callbackFromParent(populationArr, labels);
    }
    
    const resetForm = ()=>{ formUpload.current.reset(); }

    return( 
        <div className = "data-cases-main">
            <h3>Linear Regression Cases</h3>
            <div>
            <div className = "data-cases-explanations-container">
                <p><b>The following buttons display different examples of linear regression data:</b></p>
                <ul>
                    <li>To upload a <b>JSON file</b> make sure the data is written according to the syntax:
                        <p>[ &#123; "x":1, "y":2 &#125;, &#123; "x":2, "y":5 &#125;, &#123; "x":3, "y":9 &#125;]</p>
                    </li>
                    <li>The <b>Population Growth </b>example shows the world population growth in billions through the years.</li>
                    <li>The <b>Roulette Spin</b> randomly acquires 500 random numbers between 0 and 36 to simulate Roulette spins and plot a regression line which should ideally remain straight at 18.5 on the Y Axis.</li>
                    <li>The <b>Sales/Advertising</b> example is a simple representation of the increase of sales when more is spent in advertising.</li>
                </ul>
            </div>
            <div className = "data-cases-buttons-container">
                <form ref = {formUpload}>
                    <label className = "json-file-button" htmlFor="files" >Select JSON file</label>         
                    <input hidden id="files" value = "" onChange={acquireJsonData} onClick = {resetForm} type="file" />
                </form>
                <button onClick = {getPopulationData}>Population Growth</button>
                <button onClick = {getRouletteData}>Roulette Spins</button>
                <button onClick = {getSalesData}>Sales/Advertising</button>
            </div>
            </div>
        </div>
    )
};

export default DataCases;