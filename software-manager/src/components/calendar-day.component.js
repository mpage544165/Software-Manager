import React, {Component} from 'react';
//import {Link} from 'react-router-dom';
//import axios from'axios';

export default class Calendar extends Component {
    constructor(props) {
        super(props);

        this.setDay = this.setDay.bind(this);

          this.state = {
              day: 0
          }
    }

    setDay(dayNumber) {
        this.setState({day: dayNumber});
    }

    

    render() {

        return (
            <div className="day col">
                <h3 className="day-number float-right">{this.props.dayNum}</h3>
                <div className="sprint-bar">&nbsp;</div>
            </div>
        );
    }
}