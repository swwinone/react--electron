import React, { Component } from 'react';
import ReactDOM from 'react-dom';
import { Menu, Icon, Divider } from 'antd';
import getRouter from './router/index.js';
import {Provider} from 'react-redux';
import store from './redux/store';
import registerServiceWorker from "./registerServiceWorker";
const {ipcRenderer} = window.require("electron");
class App extends React.Component {

    onClick(type){
        if(type==='minus'){
            ipcRenderer.send('minus-window');
        }
        if(type==='close'){
            ipcRenderer.send('close-window');
        }
    }

    render() {
        return (
            <div style={{height:'100%',overflow:'hidden',border:'2px solid #1890ff'}}>
                <div style={{width:'100%',position:'relative',fontSize:'16px',fontWeight:'bold',
                height:'18px',borderBottom:'2px solid #1890ff',textAlign:'center',lineHeight:'18px',color:"#1890ff"}}>
                医疗保健
                <div style={{position:'absolute',right:'0px',top:'0px'}}>
                <span onClick={()=>this.onClick('minus')}><Icon type="minus" /></span>&nbsp;
                <span onClick={()=>this.onClick('close')}><Icon type="close" /></span></div>
                </div> 
                <Provider store={store}>
                    {
                        getRouter()
                    }
                </Provider>
            </div>
        );
    }
}
ReactDOM.render(<App />, document.getElementById('root'));
registerServiceWorker();
