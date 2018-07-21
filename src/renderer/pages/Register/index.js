import React, { Component } from 'react';
import ReactDOM from 'react-dom';
import './index.css';
import store from '@/renderer/redux/store';
import { Form, Icon, Input, Button, Checkbox,Switch} from 'antd';
import db from '@/lib/datastore';
import { Router, Route, Link} from 'react-router-dom';
import {getinfo} from '@/renderer/redux/actions/login';
import {connect} from 'react-redux';

const FormItem = Form.Item;
class App extends React.Component {
    constructor(props) {
        super(props);
        this.state = {
          type: true,
          confirmDirty: false,
          autoCompleteResult: [],
        };
      }

     onChange(type){
         debugger
         this.setState({
             type:type
         })
     }
    handleSubmit = (e) => {
        e.preventDefault();
        this.props.form.validateFields((err, values) => {
            if (!err) {
                let type = this.state.type ? 'users' : 'doctors';
                db.get(type).insert({ 
                    userName: values.userName,
                    passWord: values.passWord
                  }).write();
                values.type = type; 
                this.props.history.push('/home',values);
                this.props.getinfo(values);
                // db.get('users').insert(values).write();
                // db.get('users').remove({  userName: '11',
                //  }).write();
                //  db.get('users').find({ userName: '11' }).assign({userName: '2222'}).write();
                // db.get('users').remove({ title: 'low!' });
                // db.get('users').remove({ title: 'low!' });
            }
        });
      }
      
      confirmName = (rule, value, callback) => {
            let name = db.get('users').find({ userName: value }).value()
            if(name){
                callback("用户名已经被注册!");
            }else{
                callback();
            }
      }

      handleConfirmBlur = (e) => {
        const value = e.target.value;
        this.setState({ confirmDirty: this.state.confirmDirty || !!value });
      }

      compareToFirstPassword = (rule, value, callback) => {
        const form = this.props.form;
        if (value && value !== form.getFieldValue('passWord')) {
          callback('两次输入的密码不一样!');
        } else {
          callback();
        }
      }

      validateToNextPassword = (rule, value, callback) => {
        const form = this.props.form;
        if (value && this.state.confirmDirty) {
          form.validateFields(['ConfirmpassWord'], { force: true });
        }
        callback();
      }

      render() {
              const { getFieldDecorator } = this.props.form;
              return (
                  <div className="App">
                      <Form onSubmit={this.handleSubmit} className="login-form">
                      <img src='./img/logo.jpg' className='register-img'/>
                          <FormItem>
                              {getFieldDecorator('userName', {
                                  rules: [{ required: true, message: '用户名不能为空!' }
                                  ,{whitespace:true,message: '用户名不能有空格!'}
                                  , {
                                    validator: this.confirmName,
                                  }
                                ],
                              })(
                                  <Input prefix={<Icon type="user" style={{ color: 'rgba(0,0,0,.25)' }} />} placeholder="UserName" />
                              )}
                          </FormItem>
                          <FormItem>
                              {getFieldDecorator('passWord', {
                                  rules: [{ required: true, message: '密码不能为空!' }
                                  ,{whitespace:true,message: '密码不能有空格!'}
                                  , {
                                    validator: this.validateToNextPassword,
                                  }
                                ],
                              })(
                                  <Input prefix={<Icon type="lock" style={{ color: 'rgba(0,0,0,.25)' }} />} type="password" placeholder="Password" />
                              )}
                          </FormItem>
                          <FormItem>
                              {getFieldDecorator('ConfirmpassWord', {
                                  rules: [{ required: true, message: '请再输入一遍密码！' }
                                  ,{whitespace:true,message: '密码不能有空格！'}
                                  ,{
                                    validator: this.compareToFirstPassword,
                                  }
                                ],
                              })(
                                  <Input prefix={<Icon type="lock" style={{ color: 'rgba(0,0,0,.25)' }} />} 
                                  type="password" placeholder="Password" onBlur={this.handleConfirmBlur}/>
                              )}
                          </FormItem>
                          <FormItem>
                              <Button type="primary" htmlType="submit" className="login-form-button app-button">
                                  Log in
                              </Button>
                              Or <Link to="/">login now!</Link> 
                              <Switch ref='switch' checkedChildren="病人" unCheckedChildren="医生" 
                               style={{marginLeft:'179px'}} defaultChecked onChange={this.onChange.bind(this)}/>  
                          </FormItem>
                      </Form>
                  </div>
              );
              }
}
const WrappedNormalLoginForm = Form.create()( connect(
    (state) => ({login: state.login}), 
    {getinfo}
)(App));
export default WrappedNormalLoginForm ;
