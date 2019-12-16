import React, { Component } from 'react';

import DayPickerInput from "react-day-picker/DayPickerInput";
import "react-day-picker/lib/style.css";

export default class GetCurrents extends Component{

    constructor(props){
        super(props);{
            this.state = {
                currencies : [],
                cur_id: null,
                cur_full_name: null,
                curSelect: null,
                selectFirstDay: null,
                selectEndDay : null
            };
        }
        
    }

    componentDidMount(){
        this.getData();
        
    }
    
    chooseSelect = e =>{
        this.setState({
            curSelect: e.target.value
        });
        const currentCurrency = this.state.currencies.Find(Cur_Abbreviation => this.state.currentSelect);
    } 
    
    getData = async() => {
        const curData = await fetch(`http://www.nbrb.by/API/ExRates/Currencies`);
        const response = await curData.json();
        console.log(response);
        this.setState({
            currencies : response.currencies
            
        });
        console.log(response.currencies);
        
    }

    // getCurrent = async() => {
    //     const curData = await fetch(`http://www.nbrb.by/API/ExRates/Currencies/170`);
    //     const response = await curData.json();
    //     this.setState({
    //         cur_id: response.Cur_ID,
    //         cur_full_name : response.Cur_Name,
    //         cur_abreviat: response.Cur_Abbreviation
    //     });
        
    // }

    changeFirstDay = day => {
        this.setState({ selectFirstDay: day.toLocaleDateString() });
    };

    changeEndDay = day => {
        this.setState({ selectEndDay: day.toLocaleDateString() });
    };

    render(){
        const {currencies,cur_full_name,curSelect,startDate} = this.state;
        console.log(this.state);
        
        return(
            <React.Fragment>
                <div>
                    <DayPickerInput onDayChange={this.changeFirstDay} />
                        по {this.state.selectedDayTwo}
                </div>
                <div>
                    <DayPickerInput onDayChange={this.changeEndDay} />
                </div>
                
                <ul>
                    <li>{cur_full_name}</li>
                    <li>{curSelect}</li>
                    <li>{startDate}</li>
                    <li>{currencies}</li>
                </ul>
                <div>
                    <select 
                        onChange={this.chooseSelect}>
                        {
                            ['USD','RUB','EUR'].map(currency => {
                                return <option 
                                            key={currency}
                                            value={currency}>{currency}</option>
                            })

                        }
                    </select>
                </div>
                <button onClick={this.getCurrent}>запрос</button>
            
            </React.Fragment>
        );
    }
}