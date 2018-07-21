import React, {Component} from 'react';
import { Menu, Icon, Divider } from 'antd';
import { Router, Route, Switch, Link} from 'react-router-dom';
import { createBrowserHistory  } from 'history'
import './index.css';
import PersonInfo from '@/renderer/pages/PersonInfo/index';
import Record from '@/renderer/pages/Record/index';
import Register from '../Register/index';
import Registration from '@/renderer/pages/Registration/index';
import DestineRoom from '@/renderer/pages/DestineRoom/index';
import Shopping from '@/renderer/pages/Shopping/index';
import AddDrug from '@/renderer/pages/AddDrug/index';
import MangeRoom from '@/renderer/pages/MangeRoom/index';
import LookPerson from '@/renderer/pages/LookPerson/index';
import {getinfo} from '@/renderer/redux/actions/login';
import {connect} from 'react-redux';
const SubMenu = Menu.SubMenu;
const MenuItemGroup = Menu.ItemGroup;
const history = createBrowserHistory();

class App extends Component {
    constructor(props) {
        super(props);
        this.state = {
          type: props.login.userinfo.type
        };
    }
    
    handleClick = (e) => {
        
    }

    render() {
        return (
            <div style={{height:'100%'}}>
                <Router history={history}>
                    <div className='homepage'>
                    {
                         this.state.type === 'users' ?
                         (<Menu
                            onClick={this.handleClick}
                            defaultSelectedKeys={['1']}
                            mode="inline"
                            className='home_menu'
                        >   
                            <Menu.Item key="1"><Link to="/">个人信息</Link></Menu.Item>
                            <Menu.Item key="2"><Link to="/registration">挂号</Link></Menu.Item>
                            <Menu.Item key="3"><Link to="/shopping">药品购买</Link></Menu.Item>
                            <Menu.Item key="4"><Link to="/destineRoom">病房查询</Link></Menu.Item>
                            <Menu.Item key="5"><Link to="/record">消费记录</Link></Menu.Item>    
                        </Menu>):
                        (<Menu
                            onClick={this.handleClick}
                            defaultSelectedKeys={['1']}
                            mode="inline"
                            className='home_menu'
                        >   
                            <Menu.Item key="1"><Link to="/">个人信息</Link></Menu.Item>
                            <Menu.Item key="2"><Link to="/lookPerson">查看病人及叫号</Link></Menu.Item>
                            <Menu.Item key="3"><Link to="/mangeRoom">病房管理</Link></Menu.Item>
                            <Menu.Item key="4"><Link to="/addDrug">药品添加</Link></Menu.Item>
                        </Menu>)
                    }
                        <div className='home_right'>
                            <Switch>
                                            <Route exact path="/" component={PersonInfo}/>
                                            <Route path="/destineRoom" component={DestineRoom}/>
                                            <Route path="/record" component={Record}/>
                                            <Route path="/registration" component={Registration}/>
                                            <Route path="/shopping" component={Shopping}/>
                                            <Route path="/addDrug" component={AddDrug}/>
                                            <Route path="/mangeRoom" component={MangeRoom}/>
                                            <Route path="/lookPerson" component={LookPerson}/>
                            </Switch>
                        </div>
                    </div>
                </Router>
            </div>
        )
    }
}
export default connect((state) => ({login: state.login}))(App);
