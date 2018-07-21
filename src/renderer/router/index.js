import React from 'react';

import { Router, Route, Switch, Link} from 'react-router-dom';
import { createBrowserHistory, createHashHistory } from 'history'
import Login from '../pages/Login/index';
import Home from '../pages/Home/index';
import Register from '../pages/Register/index';

const history = createHashHistory();
const getRouter = () => (
    <Router history={history}>
        <div style={{height:'100%'}}>
            {/* <ul>
                <li><Link to="/">首页</Link></li>
                <li><Link to="/page1">Page1</Link></li>
                <li><Link to="/counter">counter</Link></li>
                <li><Link to="/userInfo">userInfo</Link></li>
            </ul> */}
            <Switch>
                <Route exact path="/" component={Login}/>
                <Route path="/register" component={Register}/>
                <Route path="/home" component={Home}/>
            </Switch>
        </div>
    </Router>
);

export default getRouter;