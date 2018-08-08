import React from 'react';
import './header.css';
import logo from '../../assets/logo.png';
import logo_colored from '../../assets/logo_colored.png';
import logo_white from '../../assets/logo_white.png';

class Header extends React.Component {
    constructor(props) {
        super(props);
        this.state = {};

        this.today = new Date();
        this.weekAgo = new Date();
        this.calcDate = this.calcDate.bind(this);
        this.parseDate = this.parseMonth.bind(this);
    }

    calcDate(){
        this.weekAgo.setDate(this.today.getDate() - 7);
        console.log(this.weekAgo);
        return this.weekAgo;
    }

    parseMonth(month_index){
        
        let month = "";

        switch (month_index){
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

    render() {
        return (
            <div>
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