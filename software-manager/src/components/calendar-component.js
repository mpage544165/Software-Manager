import React, {Component} from 'react';
//import {Link} from 'react-router-dom';
//import axios from'axios';
import CalendarDay from "./calendar-day.component";

const numDaysInMonth = {
    "jan": 31,
    "feb": 28,
    "mar": 31,
    "apr": 30,
    "may": 31,
    "june": 30,
    "july": 31,
    "aug": 31,
    "sept": 30,
    "oct": 31,
    "nov": 30,
    "dec": 31
}

export default class Calendar extends Component {
    constructor(props) {
        super(props);

        this.state = {
            date: new Date(),
            days: [],
            breakPoint: 4
        }

        let startDay = new Date(`${this.state.date.getFullYear()}-${this.state.date.getMonth() + 1}-01`).getDay();
        console.log(startDay);

        let nextMonthCounter = 1;
        let lastMonthCounter = numDaysInMonth['june'];
        for (let i = 0; i < 42; i++) {
            if(i < startDay) {
                this.state.days.push(<CalendarDay dayNum={lastMonthCounter - (startDay - i) + 1} key={i}/>)
            }
            else if (i > (numDaysInMonth['july'] + startDay - 1)){
                this.state.days.push(<CalendarDay dayNum={nextMonthCounter} key={i}/>)
                nextMonthCounter++;
            }
            else {
                this.state.days.push(<CalendarDay dayNum={i - startDay + 1} key={i}/>)
            }
            
        }   
    }

    render() {

        return (
            <div className="container">
                <h2>Sprint Calendar</h2>
                <div className="row">
                    <div className="col border">Sunday</div>
                    <div className="col border">Monday</div>
                    <div className="col border">Tuesday</div>
                    <div className="col border">Wednesday</div>
                    <div className="col border">Thrursday</div>
                    <div className="col border">Friday</div>
                    <div className="col border">Saturday</div>
                </div>
                <div className="row">
                    {this.state.days.slice(0, 7)}
                </div>
                <div className="row">
                    {this.state.days.slice(7, 14)}
                </div>
                <div className="row">
                    {this.state.days.slice(14, 21)}
                </div>
                <div className="row">
                    {this.state.days.slice(21, 28)}
                </div>
                <div className="row">
                    {this.state.days.slice(28, 35)}
                </div>
                <div className="row">
                    {this.state.days.slice(35, 42)}
                </div>
            </div>
        );
    }
}