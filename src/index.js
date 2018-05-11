import React, { Component } from 'react';
import ReactDOM from 'react-dom';
import logo from './logo.svg';
import './index.css';
import getRouter from './router/index.js';
import {Provider} from 'react-redux';
import store from './redux/store';
import { Form, Icon, Input, Button, Checkbox } from 'antd';
import registerServiceWorker from "./registerServiceWorker";

const FormItem = Form.Item;
class App extends React.Component {
    handleSubmit = (e) => {
        e.preventDefault();
        this.props.form.validateFields((err, values) => {
            if (!err) {
                console.log('Received values of form: ', values);
            }
        });
      }
      render() {
            {/*/!*<header className="App-header">*!/*/}
              {/*/!*<img src={logo} className="App-logo" alt="logo" />*!/*/}
              {/*/!*<h1 className="App-title">Welcome to React</h1>*!/*/}
            {/*/!*</header>*!/*/}
            {/*/!*<p className="App-intro">*!/*/}
              {/*/!*To get started, edit s<code>src/index.js</code> and save to reload.*!/*/}
            {/*/!*</p>*!/*/}
              {/*<Provider store={store}>*/}
                  {/*{*/}
                      {/*getRouter()*/}
                  {/*}*/}
              {/*</Provider>*/}
              const { getFieldDecorator } = this.props.form;
              return (
                  <div className="App">
                      <Form onSubmit={this.handleSubmit} className="login-form">
                          <FormItem>
                              {getFieldDecorator('userName', {
                                  rules: [{ required: true, message: 'Please input your username!' }],
                              })(
                                  <Input prefix={<Icon type="user" style={{ color: 'rgba(0,0,0,.25)' }} />} placeholder="Username" />
                              )}
                          </FormItem>
                          <FormItem>
                              {getFieldDecorator('password', {
                                  rules: [{ required: true, message: 'Please input your Password!' }],
                              })(
                                  <Input prefix={<Icon type="lock" style={{ color: 'rgba(0,0,0,.25)' }} />} type="password" placeholder="Password" />
                              )}
                          </FormItem>
                          <FormItem>
                              {getFieldDecorator('remember', {
                                  valuePropName: 'checked',
                                  initialValue: true,
                              })(
                                  <Checkbox>Remember me</Checkbox>
                              )}
                              <a className="login-form-forgot" href="">Forgot password</a>
                              <Button type="primary" htmlType="submit" className="login-form-button">
                                  Log in
                              </Button>
                              Or <a href="">register now!</a>
                          </FormItem>
                      </Form>
                  </div>
              );
              }
}
const WrappedNormalLoginForm = Form.create()(App);
ReactDOM.render(<WrappedNormalLoginForm />, document.getElementById('root'));
registerServiceWorker();
