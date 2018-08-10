import React from 'react';
import ReactDOM from 'react-dom';
import Header from '../components/header/header';
import Emoji from '../components/emoji/emoji';
import BiasBar from '../components/bias-bar/bias-bar';
import TimeSpent from '../components/time-spent/time-spent';
import { profiles_template } from '../data/user-data-template';
import { getAvgScore } from '../js/report';

import '../style.css';

if (process.env.NODE_ENV !== 'production') { console.log("dev mode"); }

if (module.hot) {
    module.hot.accept();
    module.hot.dispose(() => {
        const oldRootElem = document.querySelector('body');
        const newRootElem = oldRootElem.cloneNode(false);
        oldRootElem.parentNode.insertBefore(newRootElem, oldRootElem);
        oldRootElem.parentNode.removeChild(oldRootElem);
    });
} else {
    enableProdMode();
}

class Root extends React.Component {
    constructor(props) {
        super(props);
        this.state = {
            doUpdate: false,
            bias: profiles_template.p1.bias,
            cred: profiles_template.p1.cred,
            score: getAvgScore(profiles_template.p1.profile),
            totalNum: profiles_template.p1.totalNum,
            profile: profiles_template.p1.profile,
            backgroundColor: "#000",
            isActive: false
        };

        this.buttonStyle = {
            margin: "20px 15px",
            width: 60,
            height: 40,
            color: "#fff",
            backgroundColor: this.state.isActive ? "#AE10CA" : "#000",
            fontFamily: "PT Mono",
            fontSize: "16px",
            borderColor: "#000",
            borderWidth: "2px"
        }

        this.refresh = this.refresh.bind(this);
        this.getProfile = this.getProfile.bind(this);
    }

    refresh() {
        location.reload();
    };

    getProfile(id) {
        if (id === null || id === undefined) { id = "p1"; }
        this.setState({
            bias: profiles_template[id].bias,
            cred: profiles_template[id].cred,
            score: getAvgScore(profiles_template[id].profile),
            totalNum: profiles_template[id].totalNum,
            profile: profiles_template[id].profile
        });

        this.setState({isActive:true});
        // console.log("is active");
    }

    render() {

        // let button_color = this.state.isActive ? "#AE10CA" : "#000"

        return (
            <div id='app'>
                <div className="personas component-container">
                    <div>
                        <button id="p1" style={this.buttonStyle} onClick={(id) => this.getProfile(id.target.id)}>
                            C/H
                            </button>
                        <button id="p2" style={this.buttonStyle} onClick={(id) => this.getProfile(id.target.id)}>
                            L/M
                            </button>
                        <button id="p3" style={this.buttonStyle} onClick={(id) => this.getProfile(id.target.id)}>
                            FR/L
                            </button>
                        <button id="p4" style={this.buttonStyle} onClick={(id) => this.getProfile(id.target.id)}>
                            C/M
                            </button>
                        <button id="p5" style={this.buttonStyle} onClick={(id) => this.getProfile(id.target.id)}>
                            ML/M
                            </button>
                        <button id="p6" style={this.buttonStyle} onClick={(id) => this.getProfile(id.target.id)}>
                            R/L
                            </button>
                    </div>
                </div>
                <div className="app-container">
                    <Header />
                    <div className="row">
                        <Emoji bias={this.state.bias} score={this.state.score} />
                        <BiasBar bias={this.state.bias} cred={this.state.cred} totalNum={this.state.totalNum} />
                    </div>
                    <TimeSpent profile={this.state.profile} />
                </div>
            </div>
        );
    }
}

ReactDOM.render(
    <Root />,
    document.getElementById('root')
);

