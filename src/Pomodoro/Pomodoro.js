import React, { Component } from 'react';
import './Pomodoro.css';

// User should be able to manage session time: allowed range 1 - 59 mins. Default: 25 min - Done
// User should be able to manage break time: allowed range 1 - 15 mins. Default: 5 min - Done
// User can start session by clicking on Start button, can pause it and restart it. Disable session and break selection - Done
// User can reset session any time. Enable session and break selection - Done
// Start with Session time, then count till the break time. - Done

class Pomodoro extends Component {
    constructor(props) {
        super(props);
        this.state = {
            breakTime: 5,
            sessionTime: 25,
            countdownMin: 0,
            countdownSec: 0,
            countdownName: 'Session',
            isStart: false,
            isPaused: false,
            startBtnClass: 'green',
            clockState: 'start',
            isSessionOver: false,
            isBreakOver: false,
            countdownClass: 'greener'
        };
        this.handleChange = this.handleChange.bind(this);
        this.handleClick = this.handleClick.bind(this);
    }

    handleClick(event) {
        const target = event.target;
        const name = target.name;

        if(name === 'start') {
            if(!this.state.isPaused) {
                this.setState({
                    countdownMin: this.state.sessionTime,
                });
            }

            this.setState({
                isStart: true,
                clockState: 'pause',
                startBtnClass: 'red',
            });

            this.counterID = setInterval(
                () => this.startCounter(),
                1000
            );
        }

        if(name === 'reset') {
            clearInterval(this.counterID);
            this.setState({
                countdownMin: 0,
                countdownSec: 0,
                isStart: false,
                clockState: 'start',
                startBtnClass: 'green',
                countdownClass: 'greener'
            });
        }

        if(name === 'pause') {
            this.setState({
                clockState: 'start',
                startBtnClass: 'green',
                isPaused: true
            });
            clearInterval(this.counterID);
        }
    }

    startCounter() {
        const currentCountdownMins = this.state.countdownMin;
        const currentCountdownSecs = this.state.countdownSec;

        if(currentCountdownMins === 0 && currentCountdownSecs === 0) {
            if(!this.state.isSessionOver) {
                this.setState({
                    isSessionOver: true,
                    countdownMin: this.state.breakTime,
                    countdownName: 'Break!',
                    countdownClass: 'radish'
                });
            } else if(!this.state.isBreakOver) {
                clearInterval(this.counterID);
                this.setState({
                    isBreakOver: true,
                    countdownMin: 0,
                    countdownSec: 0,
                    countdownName: 'Session',
                    isStart: false,
                    clockState: 'start',
                    startBtnClass: 'green',
                    countdownClass: 'greener'
                });
            }
        } else if(currentCountdownSecs === 0) {
            this.setState((prevState, props) => ({
                countdownMin: prevState.countdownMin - 1,
                countdownSec: 59
            }));
        } else {
            this.setState((prevState, props) => ({
                countdownSec: prevState.countdownSec - 1
            }));
        }
    }

    handleChange(event) {
        const target = event.target;
        const value = target.value;
        const name = target.name;

        this.setState({
            [name]: value
        });

        if (name === 'sessionTime') {
            this.setState({
                countdownMin: value
            });
        }
    }

    render() {
        return (
        <main>
            <div className="header center-align">
                <h1>Pomodoro Clock</h1>
            </div>
            <div className="container">
                <div className="row">
                    <div className="col m4 s12 center-align">
                        <h4 className="content-title">Break Length</h4>
                        <p className="range-field">
                            <input type="range" name="breakTime" min="1" max="100" value={this.state.breakTime} onChange={this.handleChange} disabled={this.state.isStart} />
                        </p>
                    </div>
                    <div className="col push-m4 m4 s12 center-align">
                        <h4 className="content-title">Session Length</h4>
                        <p className="range-field">
                            <input type="range" name="sessionTime" min="1" max="100" value={this.state.sessionTime} onChange={this.handleChange} disabled={this.state.isStart} />
                        </p>
                    </div>
                    <div className="col pull-m4 m4 s12 center-align">
                        <div className="row">
                            <div className="col s6 center-align">
                                <button name="reset" className="btn-floating btn-large waves-effect waves-light btn-control blue" onClick={this.handleClick} >Reset</button>
                            </div>
                            <div className="col s6 center-align">
                                <button name={this.state.clockState} className={`btn-floating btn-large waves-effect waves-light btn-control ${this.state.startBtnClass}`} onClick={this.handleClick} >{this.state.clockState}</button>
                            </div>
                        </div>
                    </div>
                    <div className="col s12 right-align">
                        <small>Note: Break and Session time is in mins</small>
                    </div>
                </div>
                <div className="row">
                    <div className="col s12">
                        <div className={`countdown ${this.state.countdownClass}`} >
                            <h2 className="countdown-name">
                                {this.state.countdownName}
                            </h2>
                            <h1 className="countdown-timer">{this.state.countdownMin}:{this.state.countdownSec}</h1>
                        </div>
                    </div>
                </div>
            </div>
        </main>
    );
  }
}

export default Pomodoro;
