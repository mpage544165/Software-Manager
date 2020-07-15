import React, {Component} from 'react';
//import {Link} from 'react-router-dom';
//import axios from'axios';
import CalendarDay from "./calendar-day.component";

const monthNames = ['January', 'February', 'March', 'April', 'May', 'June', 
                    'July', 'August', 'September', 'October', 'November', 'December'];

const numDaysInMonth = {
    0: 31,
    1: 28,
    2: 31,
    3: 30,
    4: 31,
    5: 30,
    6: 31,
    7: 31,
    8: 30,
    9: 31,
    10: 30,
    11: 31
}

export default class Calendar extends Component {
    constructor(props) {
        super(props);

        this.setCalendarDays = this.setCalendarDays.bind(this);

        this.state = {
            currentDate: new Date(),
            days: [],
            breakPoint: 4
        } 
        
        
    }

    componentDidMount() {
        this.setCalendarDays(this.state.currentDate.getMonth(), this.state.currentDate.getFullYear());
    }

    setCalendarDays(month, year) {
        if (month > 11) {
            month = 0;
            year++;
        }
        else if (month < 0) {
            month = 11;
            year--;
        }

        let startDay = new Date(year, month, 1).getDay();
        console.log(startDay);
        console.log(Date(year, month, 1));

        let nextMonthCounter = 1;
        let lastMonthCounter = numDaysInMonth[(month + 11) % 12];

        let newDays = []
        for (let i = 0; i < 42; i++) {
            if(i < startDay) {
                newDays.push(<CalendarDay dayNum={lastMonthCounter - (startDay - i) + 1} key={i}/>)
            }
            else if (i > (numDaysInMonth[month] + startDay - 1)){
                newDays.push(<CalendarDay dayNum={nextMonthCounter} key={i}/>)
                nextMonthCounter++;
            }
            else {
                newDays.push(<CalendarDay dayNum={i - startDay + 1} key={i}/>)
            }
            
        }

        this.setState({
            currentDate: new Date(year, month, 1),
            days: newDays
        })
        console.log(this.state.currentDate)
    }

    render() {

        return (
            <div className="container">
                <h2>Sprint Calendar</h2>

                <nav aria-label="Page navigation example">
  <ul className="pagination">
    <li className="page-item">
      <a className="page-link" href="#" aria-label="Previous" onClick={() => this.setCalendarDays(this.state.currentDate.getMonth() - 1, this.state.currentDate.getFullYear())}>
        <span aria-hidden="true">&laquo;</span>
        <span className="sr-only">Previous</span>
      </a>
    </li>
        <li className="page-item"><a className="page-link" href="#">{monthNames[this.state.currentDate.getMonth()]} {this.state.currentDate.getFullYear()}</a></li>
    <li className="page-item">
      <a className="page-link" href="#" aria-label="Next" onClick={() => this.setCalendarDays(this.state.currentDate.getMonth() + 1, this.state.currentDate.getFullYear())}>
        <span aria-hidden="true">&raquo;</span>
        <span className="sr-only">Next</span>
      </a>
    </li>
  </ul>
</nav>

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