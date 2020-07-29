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
        console.log('Props::', this.props);   
    }

    componentDidMount() {
        this.setCalendarDays(this.state.currentDate.getMonth(), this.state.currentDate.getFullYear());
        
    }

    setCalendarDays(month, year) {
        let prevMonth = 0;
        let nextMonth = 0;

        if (month > 11) {
            month = 0;
            prevMonth = 11;
            nextMonth = 1;
            year++;
        }
        else if (month < 0) {
            month = 11;
            prevMonth = 10;
            nextMonth = 0;
            year--;
        }

        let startDay = new Date(year, month, 1).getDay();
        console.log(startDay);
        console.log(Date(year, month, 1));

        let nextMonthCounter = 1;
        let lastMonthCounter = numDaysInMonth[(month + 11) % 12];

        let isSprintDay = false;
        let sprintDayCounter = 0;
        let activeSprints = this.props.sprints;//.filter(sprint => {if (sprint.startDay.getMonth() === month) return sprint;});
        console.log('Sprint props: ', activeSprints);

        let currentDate = new Date();
        let newDays = [];
        for (let i = 0; i < 42; i++) {

            if (i < startDay) {
                currentDate = new Date(year, prevMonth, lastMonthCounter - (startDay - i) + 1);

                newDays.push(<CalendarDay dayNum={currentDate.getDate()} isSprintDay={isSprintDay} key={i}/>);
            }
            else if (i > (numDaysInMonth[month] + startDay - 1)) {
                currentDate = new Date(year, nextMonth, nextMonthCounter);
                newDays.push(<CalendarDay dayNum={nextMonthCounter} isSprintDay={isSprintDay} key={i}/>);
                nextMonthCounter++;
            }
            else {
                currentDate = new Date(year, month, i - startDay + 1);

                if (this.props.sprints.length != 0) {
                    
                    if (currentDate.toDateString() === new Date(this.props.sprints[0].startDate).toDateString()) {
                            sprintDayCounter = (Math.round((new Date(this.props.sprints[0].endDate) - new Date(this.props.sprints[0].startDate)) / (1000*60*60*24)));
                            console.log(sprintDayCounter);
                    }   
                    else if (sprintDayCounter > 0) {
                        isSprintDay = true;
                        sprintDayCounter--;
                    }
                    else {
                        isSprintDay = false;
                    }
                }
                newDays.push(<CalendarDay dayNum={currentDate.getDate()} isSprintDay={isSprintDay} key={i}/>);
            }

            /*
            // last month
            if(i < startDay) {
                newDays.push(<CalendarDay dayNum={lastMonthCounter - (startDay - i) + 1} isSprintDay={isSprintDay} key={i}/>)
            }
            // next month
            else if (i > (numDaysInMonth[month] + startDay - 1)){
                newDays.push(<CalendarDay dayNum={nextMonthCounter} isSprintDay={isSprintDay} key={i}/>)
                nextMonthCounter++;
            }
            // current month
            else {

                newDays.push(<CalendarDay dayNum={i - startDay + 1} isSprintDay={isSprintDay} key={i}/>)
            }*/
            
        }

        this.setState({
            currentDate: new Date(year, month, 1),
            days: newDays
        })
        console.log(this.state.currentDate)
    }

    render() {

        return (
            <div className="container bg-light">
                <h2>Sprint Calendar</h2>

                <nav aria-label="Page navigation">
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