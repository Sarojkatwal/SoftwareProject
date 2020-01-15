import React, { Component } from 'react';
import './ihomepage.css';
import Logo from './logo.png';
import Logout from './logout.png';
import { Route, NavLink, Switch } from 'react-router-dom';
import Home from './Home.js';
import Chatbox from './Chatbox.js';
import Pdetail from './Pdetail.js';
import Notfound from './Notfound.js';
import Submitfile from './Submitfile.js';
import Completedproject from './Completedproject.js';
import Otherlinks from './Otherlinks.js';

class Ihomepage extends Component {
    render() {
        return (
            <div className="grid-container">
                <div className="header">
                    <img src={Logo} alt={Logo} />
                    <img src={Logout} alt={Logout} className="lout" />
                    <h2> LICT Intern Management</h2>
                </div>
                <div className="left" >
                    <ul className="Sidebar">
                        <li>
                            <NavLink to="/" exact activeStyle={
                                { color: 'red' }
                            }>Home</NavLink>
                        </li>
                        <li>
                            <NavLink to="/pdetail" exact activeStyle={
                                { color: 'red' }
                            }>ProjectDetail</NavLink>
                        </li>
                        <li>
                            <NavLink to="/chatbox" exact activeStyle={
                                { color: 'red' }
                            }>Chatbox</NavLink>
                        </li>
                        <li>
                            <NavLink to="/submitfile" exact activeStyle={
                                { color: 'red' }
                            }>SubmitFile</NavLink>
                        </li>
                        <li>
                            <NavLink to="/completedproject" exact activeStyle={
                                { color: 'red' }
                            }>Completed Project</NavLink>
                        </li>
                        <li>
                            <NavLink to="/otherlinks" exact activeStyle={
                                { color: 'red'}
                            }>Other Links</NavLink>
                        </li>
                    </ul>
                </div>
                <div className="middle" >
                    <Switch>
                        <Route exact path="/" component={Home} />
                        <Route path="/pdetail" component={Pdetail} />
                        <Route path="/chatbox" component={Chatbox} />
                        <Route path="/submitfile" component={Submitfile} />
                        <Route path="/completedproject" component={Completedproject} />
                        <Route path="/otherlinks" component={Otherlinks} />
                        <Route component={Notfound}/>
                    </Switch>
                </div>
                <div className="footer" id="saroj" >
                    <p>Footer</p>
                </div>
            </div>
        );
    }
}

export default Ihomepage;