import React, { Component } from 'react';
import ReactDOM from 'react-dom';
import './index.css';
import { Form, Icon, Input, Button, Checkbox,Switch,message} from 'antd';
import db from '@/lib/datastore';
import { Router, Route, Link} from 'react-router-dom';
import {getinfo} from '@/renderer/redux/actions/login';
import {connect} from 'react-redux';

const FormItem = Form.Item;
class App extends React.Component {
    constructor(props) {
        super(props);
        this.state = {
          edit:false,
          type:props.login.userinfo.type,
          data:[]
        };
      }
  
    componentDidMount(){
        let user = this.props.login.userinfo;
        let userdata =[];
        let data = db.get(user.type).find({userName:user.userName}).value();
        this.setState({
            data:data
        })
    }

    renderUsers(){
        let {edit,data} = this.state; 
        return (<div>
            <div className='person-item' style={{marginBottom: '15px'}}>
                用户姓名：
            {
                edit?
                (<Input 
                prefix={<Icon type="user" style={{ color: 'rgba(0,0,0,.25)' }} />} 
                placeholder="UserName" ref='userName' defaultValue={data.userName}/>)
                :data.userName
            }
            </div>
            <div className='person-item' style={{marginBottom: '15px'}}>
                用户密码：
            {
                edit?
                (<Input 
                prefix={<Icon type="user" style={{ color: 'rgba(0,0,0,.25)' }} />} 
                placeholder="passWord"  ref='passWord'  defaultValue={data.passWord} />)
                :'***'
            }
            </div>
            <div className='person-item' style={{marginBottom: '15px'}}>
                真实姓名：
            {
                edit?
                (<Input 
                prefix={<Icon type="user" style={{ color: 'rgba(0,0,0,.25)' }} />} 
                placeholder="reallyName" ref='reaName' defaultValue={data.reaName}/>)
                :(data.reaName?data.reaName : '')
            }
            </div>
            <div className='person-item' style={{marginBottom: '15px'}}>
                家庭住址：
            {
                edit?
                (<Input 
                prefix={<Icon type="user" style={{ color: 'rgba(0,0,0,.25)' }} />} 
                placeholder="address" ref='address' defaultValue={data.address}/>)
                :(data.address?data.address : '')
            }
            </div>
            <div className='person-item' style={{marginBottom: '15px'}}>
                个人电话：
            {
                edit?
                (<Input 
                prefix={<Icon type="user" style={{ color: 'rgba(0,0,0,.25)' }} />} 
                placeholder="phone" ref='phone' defaultValue={data.phone}/>)
                :(data.phone?data.phone : '')
            }
            </div>
        </div>)
    }

    renderDoctors(){
        let {edit,data} = this.state; 
        return (<div>
            <div className='person-item' style={{marginBottom: '15px'}}>
                用户姓名：
            {
                edit?
                (<Input 
                prefix={<Icon type="user" style={{ color: 'rgba(0,0,0,.25)' }} />} 
                placeholder="UserName" ref='userName' defaultValue={data.userName}/>)
                :data.userName
            }
            </div>
            <div className='person-item' style={{marginBottom: '15px'}}>
                用户密码：
            {
                edit?
                (<Input 
                prefix={<Icon type="user" style={{ color: 'rgba(0,0,0,.25)' }} />} 
                placeholder="passWord"  ref='passWord'  defaultValue={data.passWord} />)
                :'***'
            }
            </div>
            <div className='person-item' style={{marginBottom: '15px'}}>
                真实姓名：
            {
                edit?
                (<Input 
                prefix={<Icon type="user" style={{ color: 'rgba(0,0,0,.25)' }} />} 
                placeholder="reallyName" ref='reaName' defaultValue={data.reaName}/>)
                :(data.reaName?data.reaName : '')
            }
            </div>
            <div className='person-item' style={{marginBottom: '15px'}}>
                医生类型：
            {
                edit?
                (<Input 
                prefix={<Icon type="user" style={{ color: 'rgba(0,0,0,.25)' }} />} 
                placeholder="type" ref='type' defaultValue={data.type}/>)
                :(data.type?data.type : '')
            }
            </div>
            <div className='person-item' style={{marginBottom: '15px'}}>
                个人电话：
            {
                edit?
                (<Input 
                prefix={<Icon type="user" style={{ color: 'rgba(0,0,0,.25)' }} />} 
                placeholder="phone" ref='phone' defaultValue={data.phone}/>)
                :(data.phone?data.phone : '')
            }
            </div>
        </div>)
    }

    onEdit(){
        this.setState({
            edit:true
        })
    }

    onClick(){
        let {type,data} = this.state; 
        if(data.userName!==this.refs.userName.input.value&&db.get(type).find({ userName: this.refs.userName.input.value }).value()){
            message.error('该用户名已经存在！');
            return ;
        }else{
            if(type==='users'){
                db.get('users').find({ userName: data.userName }).assign({
                    userName: this.refs.userName.input.value ,
                    passWord:this.refs.passWord.input.value ,
                    reaName:this.refs.reaName.input.value ,
                    address:this.refs.address.input.value ,
                    phone:this.refs.phone.input.value ,
                }).write();
                message.success('保存成功！',1);
            }else{
                db.get('doctors').find({ userName: data.userName }).assign({
                    userName: this.refs.userName.input.value ,
                    passWord:this.refs.passWord.input.value ,
                    reaName:this.refs.reaName.input.value ,
                    type:this.refs.type.input.value ,
                    phone:this.refs.phone.input.value ,
                }).write();
                message.success('保存成功！',1);
            }
            this.setState({
                data:db.get(type).find({ userName: this.refs.userName.input.value  }).value(),
                edit:false
            })
            // console.log(db.get(type).find({ userName: this.refs.userName.input.value  }).value());
        }
        
    }

    render() {
          let {edit,type} = this.state; 
              return (
                  <div className="userInfo" style={{width: '250px',margin:'0 auto',marginTop:'100px'}}>
                    {
                        type === 'users'? this.renderUsers():this.renderDoctors()
                    }
                    <div>
                    <Button type="primary" icon="edit" onClick={this.onEdit.bind(this)}/>
                      {
                          edit?<Button type="primary" className='person-btn' 
                          onClick={this.onClick.bind(this)} style={{marginLeft: '154px'}}>保存</Button>:''
                      }
                    </div>
                  </div>
              );
            }
}
export default connect(
    (state) => ({login: state.login}), 
    {getinfo}
)(App);
