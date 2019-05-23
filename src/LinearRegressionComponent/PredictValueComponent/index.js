import React, { useState, useEffect } from 'react';
import './styles.scss';

function PredictValue(props) {

    const [x, setX] = useState();
    const [predictedValue, setPredictedValue] = useState();

    useEffect(() => {
        if (typeof x === "undefined") return;
        if (x === "") {setPredictedValue("");return;}
        setPredictedValue((props.a + (x*props.b)).toFixed(3));
    }, [props.a, props.b, x]);

    return(
        <div className = "predict-value-container">
            <h4>Find the predicted value of: </h4>
            <input type="text" value = {x} onChange={(e) => setX(e.target.value)}></input>
            <h4> = {predictedValue}</h4>
        </div>
    );
}

export default PredictValue;