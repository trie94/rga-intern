// import './report';
import React from 'react';
import ReactDOM from 'react-dom';
import Emoji from '../components/emoji/emoji';
import Header from '../components/header/header';
import BiasBar from '../components/bias-bar/bias-bar';
import TimeSpent from '../components/time-spent/time-spent';
import Topic from '../components/topic/topic';

if (module.hot) {
    module.hot.accept();
}

class Root extends React.Component {
    constructor(props) {
        super(props);
        this.state = {};
    }

    render() {
        return (
            <div>
                <Header />
                <Emoji />
                <BiasBar />
                <TimeSpent />
                <Topic />
            </div>
        );
    }
}

ReactDOM.render(
    <Root />,
    document.getElementById('root')
);

