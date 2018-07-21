import React, { Component } from 'react';
import ReactDOM from 'react-dom';
import './index.css';
import store from '@/renderer/redux/store';
import { Form, Icon, Input, Button, Checkbox,message,Switch} from 'antd';
import {Link} from 'react-router-dom';
import db from '@/lib/datastore';
import {getinfo} from '@/renderer/redux/actions/login';
import {connect} from 'react-redux';

const FormItem = Form.Item;
class App extends React.Component {
     constructor(props) {
        super(props);
        this.state = {
          type: true
        };
      }

     onChange(type){
         this.setState({
             type:type
         })
     }


     handleSubmit = (e) => {
        e.preventDefault();
        this.props.form.validateFields((err, values) => {
            if (!err) {
                let type = this.state.type ? 'users' : 'doctors';
                let data = db.get(type).find({ userName: values.userName }).value(); 
                if(data)
                {
                    if(data.passWord !== values.passWord){
                        message.error('用户密码错误！');
                        return;
                    }
                    values.type = type; 
                    this.props.history.push('/home',values);
                    
                }else{
                    message.error('该用户不存在！');
                    return;
                }
                // db.get('users').insert({ // 对数组进行insert操作
                //     username: 'xxx',
                //     password: 'xxxx'
                //   }).write();
                
                // db.get('users').remove({  userName: '11',
                //  }).write();
                // db.get('users').find({ userName: '11' }).assign({userName: '2222'}).write();
                // db.get('users').remove({ title: 'low!' });
                // db.get('users').remove({ title: 'low!' });
                // console.log('Received values of form: ', values);
                // console.log(db.get('users').value());
                this.props.getinfo(values);
            }
        });
      }
      render() {
              const { getFieldDecorator } = this.props.form;
              return (
                  <div className="App">
                      <Form onSubmit={this.handleSubmit} className="login-form">
                      <img src='./img/logo.jpg' className='login-img'/>
                          <FormItem >
                              {getFieldDecorator('userName', {
                                  rules: [{ required: true, message: '用户名不能为空!' },
                                  {whitespace:true,message: '用户名不能有空格!'}
                                ],
                              })(
                                  <Input prefix={<Icon type="user" style={{ color: 'rgba(0,0,0,.25)' }} />} placeholder="Username" />
                              )}
                          </FormItem>
                          <FormItem>
                              {getFieldDecorator('passWord', {
                                  rules: [{ required: true, message: '密码不能为空!' }
                                  ,{whitespace:true,message: '密码不能有空格!'}
                                ],
                              })(
                                  <Input prefix={<Icon type="lock" style={{ color: 'rgba(0,0,0,.25)' }} />} type="password" placeholder="Password" />
                              )}
                          </FormItem>
                          <FormItem>
                              <Button type="primary" htmlType="submit" className="login-form-button app-button">
                                  Log in
                              </Button>
                             Or <Link to="/register">register now!</Link> 
                             <Switch ref='switch' checkedChildren="病人" unCheckedChildren="医生" 
                               style={{marginLeft:'163px'}} defaultChecked onChange={this.onChange.bind(this)}/> 
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
