import React, { Component } from 'react';
import DatePicker from "react-datepicker";
import './getCurrents.css';
import "react-datepicker/dist/react-datepicker.css";

import InputData from '../InputData/inputData';
import Charts from '../Charts/charts';

export default class GetCurrents extends Component{
    
    constructor(props){
        super(props);{
        this.state = {
                currencies : [],
                cur_id: null,
                curSelect: null,
                сur_parentId: null,
                cur_OfficialRate: null,
                currentValue: [],
                currentDate: [],
                currentCurrency: null,
                startDate: new Date(),
                endDate: new Date()
            };
        }
        
    }

    componentDidMount(){
        this.getData();
    }
    
    chooseSelect = e => {
        console.log(e.target.value);
        this.setState({
                curSelect: e.target.value,
            },
            () => {
                const currentCurrency = this.state.currencies.find(
                    cur => cur.Cur_Abbreviation === this.state.curSelect
                );
                
                // console.log(currentCurrency);

                
                this.setState({currentCurrency: currentCurrency});
            }
        );
    }

    convertDate = (d) => {
        let year = new Date(d).getFullYear();
        let month = new Date(d).getMonth() + 1;
        let dayMonth = new Date(d).getDate();
        return `${year}-${month}-${dayMonth}`;
    }
    
    getData = async() => {
        const curData = await fetch(`http://www.nbrb.by/API/ExRates/Currencies`);
        const response = await curData.json();
        // console.log(response);
        this.setState({
            currencies : response
            
        });
    }

    getCurrent = async() => {
        const сur_parentId = this.state.currentCurrency.Cur_ParentID;
        const start = this.convertDate(this.state.startDate);
        const end = this.convertDate(this.state.endDate);
        
        const curData = await fetch(`http://www.nbrb.by/API/ExRates/Rates/Dynamics/${сur_parentId}?startDate=${start}&endDate=${end}`);
        const currentValue = await curData.json();
        this.setState(
            {
                currentValue: currentValue.map(el => {
                    return {
                        currentDate: this.convertDate(el.Date),
                        currentOfficialRate :el.Cur_OfficialRate
                    }
                })
            }
        );
        // console.log(currentValue);
        
    }

    setStartDate = (startDate) => {
        this.setState({ startDate: startDate });
    };

    setEndDate = endDate => {
        this.setState({ endDate: endDate });
    };

    render(){
        const {currencies,curSelect,cur_id,сur_parentId,cur_OfficialRate,convertDate,startDate,endDate,currentValue} = this.state;
        console.log(this.state);
        
        return(
            <section>
                <div style={{paddingTop: '75px'}}>
                    <DatePicker
                        dateFormat="yyyy-MM-dd"
                        selected={this.state.startDate} 
                        onChange={this.setStartDate}
                    />
                </div>
                <div style={{paddingTop: '25px'}}>
                    <DatePicker
                        dateFormat="yyyy-MM-dd"
                        selected={this.state.endDate} 
                        onChange={this.setEndDate}
                    />
                    
                </div>
                <div>
                    <select 
                        onChange={this.chooseSelect}>
                        {
                            ['USD','AUD','CHF'].map(currency => {
                                return <option 
                                            key={currency}
                                            value={currency}>{currency}</option>
                            })

                        }
                    </select>
                    
                </div>
                <button onClick={this.getCurrent}>запрос</button>
                <Charts 
                    
                    currentValue={this.state.currentValue}
                    currentName={this.state.currentCurrency}
                />
            </section>
        );
    }
}