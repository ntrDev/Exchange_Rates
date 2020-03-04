import React from 'react';
import {LineChart, Line, XAxis, YAxis, CartesianGrid, Tooltip, Legend} from 'recharts';

const Charts = (props) => {
   
    console.log(props);
    // const arrCurrentValueForCharts = props.currentValue.map() => {
    //     return  
    // }];
    //let currentOfficialRate = this.props.currentValue.currentOfficialRate
    

    return(
        
        <section>
            <LineChart
                width={900}
                height={300}
                data={props.currentValue}
                margin={{
                top: 5, right: 30, left: 20, bottom: 5,
                }}
            >
                <CartesianGrid stroke="#ccc" strokeDasharray="5 5" />
                <XAxis dataKey={"currentDate"}/>
                <YAxis domain={["dataMin", "dataMax"]}/>
                <Tooltip />
               
                <Line type="monotone" dataKey={"currentOfficialRate"} stroke="#8884d8" activeDot={{ r: 8 }}/>
                
            </LineChart>
        </section>
        
    )
}

export default Charts;


