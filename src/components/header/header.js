import React from 'react';
import './header.css';
import logo_colored from '../../assets/logo_colored.png';

import { generateProfile } from '../../js/generative-profile-system';

class Header extends React.Component {
    constructor(props) {
        super(props);
        this.state = {};

        this.today = new Date();
        this.weekAgo = new Date();
        this.calcDate = this.calcDate.bind(this);
        this.parseDate = this.parseMonth.bind(this);
        this.refresh = this.refresh.bind(this);
        this.getProfile = this.getProfile.bind(this);

        this.buttonStyle = {
            margin: "5px 5px 5px 0",
            height: 30,
            color: "#000",
            backgroundColor: "#fff"
        };
    }

    calcDate() {
        this.weekAgo.setDate(this.today.getDate() - 7);
        // console.log(this.weekAgo);
        return this.weekAgo;
    }

    parseMonth(month_index) {

        let month = "";

        switch (month_index) {
            case 0: month = "Jan"
                break;
            case 1: month = "Feb"
                break;
            case 2: month = "Mar"
                break;
            case 3: month = "Apr"
                break;
            case 4: month = "May"
                break;
            case 5: month = "June"
                break;
            case 6: month = "July"
                break;
            case 7: month = "Aug"
                break;
            case 8: month = "Sept"
                break;
            case 9: month = "Oct"
                break;
            case 10: month = "Nov"
                break;
            case 11: month = "Dec"
                break;
        }

        return month;
    }

    refresh() {
        console.log("do refresh");
        location.reload();
    };

    getProfile() {
        // pass value when a button clicked
        console.log("get profile");
    }

    render() {
        return (
            <div>
                <div className="personas component-container">
                    <div>
                        <button style={this.buttonStyle} onClick={this.refresh}>
                            Get Another Report
                    </button>
                        <button style={this.buttonStyle} onClick={this.getProfile}>
                            person1
                    </button>
                        <button style={this.buttonStyle} onClick={this.getProfile}>
                            person2
                    </button>
                        <button style={this.buttonStyle} onClick={this.getProfile}>
                            person3
                    </button>
                        <button style={this.buttonStyle} onClick={this.getProfile}>
                            person4
                    </button>
                    </div>
                </div>
                <div className="logo component-container">
                    <img src={logo_colored} className="logo-img" />
                    <p>TILT WEEKLY REPORT</p>
                </div>
                <div className="date component-container">
                    <p>{this.parseMonth(this.calcDate().getMonth())} {this.calcDate().getDate()}, {this.calcDate().getFullYear()} - {this.parseMonth(this.today.getMonth())} {this.today.getDate()}, {this.today.getFullYear()}</p>
                </div>
            </div>
        );
    }
}

export default Header;