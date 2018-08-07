// import './report';
import React from 'react';
import ReactDOM from 'react-dom';
import Sidebar from '../components/sidebar/sidebar';
import Emoji from '../components/emoji/emoji';
import Header from '../components/header/header';
import BiasBar from '../components/bias-bar/bias-bar';
import TimeSpent from '../components/time-spent/time-spent';
import Topic from '../components/topic/topic';
import Footer from '../components/footer/footer';
import '../style.css';

if (module.hot) {
    module.hot.accept();
    module.hot.dispose(()=>{
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
        this.state = {};
    }

    render() {
        return (
            <div id = 'app'>
                <div className="app-container">
                    <Header />
                    <div className="row">
                        <Emoji />
                        <BiasBar />
                    </div>
                    <TimeSpent />
                    <Topic />
                    <Footer/>
                </div>
            </div>
        );
    }
}

ReactDOM.render(
    <Root />,
    document.getElementById('root')
);

