import React, { useEffect, useRef } from 'react';
import './App.scss';
import Chart from "chart.js";

function ScatterGraph(props) {
    const graphScatterRef = useRef();
    return (
        <canvas height="400" width="400" ref={graphScatterRef}></canvas>
    );
}
export default ScatterGraph;