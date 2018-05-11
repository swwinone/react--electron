import React from 'react';

import {BrowserRouter as Router, Route, Switch, Link} from 'react-router-dom';

import Home from '../pages/Home/index';
import Page1 from '../pages/Page1/index';
import Counter from '../pages/Counter/index';
import UserInfo from '../pages/UserInfo/index';


const getRouter = () => (
    <Router>
        <div>
            <ul>
                <li><Link to="/">首页</Link></li>
                <li><Link to="/page1">Page1</Link></li>
                <li><Link to="/counter">counter</Link></li>
                <li><Link to="/userInfo">userInfo</Link></li>
            </ul>
            <Switch>
                <Route exact path="/" component={Home}/>
                <Route path="/page1" component={Page1}/>
                <Route path="/counter" component={Counter}/>
                <Route path="/userInfo" component={UserInfo}/>
            </Switch>
        </div>
    </Router>
);

export default getRouter;