import React, { Component } from 'react';
import ReactDOM from 'react-dom';
import './index.css';
import store from '@/renderer/redux/store';
import { Collapse , Icon, Input, Button, Checkbox,message,List, Avatar,Popconfirm} from 'antd';
import db from '@/lib/datastore';
import moment from 'moment';
import {connect} from 'react-redux';

const Panel = Collapse.Panel;
const item = ['神经科','泌尿科','骨科','呼吸科','耳鼻喉科','超声科','妇科','小儿科']
class App extends React.Component {
      constructor(props) {
        super(props);
        this.state = {
          color: props.initialColor,
          data:[]
        };
      }
      componentDidMount(){
        let data = db.get('doctors').value();
        this.setState({
            data:data
        })
      }
      renderFirst(){
        let data = db.get('doctors').value();
        return  item.map((item,index)=> {
             let rdata=[];
                if(data){
                  data.map((value,index)=>{
                    if(value.type===item){
                      rdata.push(value);
                   }
                  })
                }
              return (
              <Panel header = {item} key={index}>
                {
                  this.renderSecond(rdata)
                }
              </Panel>)
          })
      }

      renderSecond(data){
        return (<List
          itemLayout="horizontal"
          dataSource={data}
          renderItem={item => (
          <List.Item>
              <List.Item.Meta
              avatar={<Avatar src="https://zos.alipayobjects.com/rmsportal/ODTLcjxAfvqbxHnVXCYX.png" />}
              title={<a href="https://ant.design">{item.userName}</a>}
              description={item.type}
              />
              <Popconfirm title="您需要支付6元挂号费！" okText="确认支付" cancelText="取消" onConfirm={()=>this.register(item)}>
                  <Button type="primary">挂号</Button>
              </Popconfirm>
          </List.Item>
          )}
      />)
      }
      
      register(record){
        let date = moment().format('YYYY-MM-DD');
        let time = moment().format('HH:mm:ss');
        db.get('record').insert({ 
                    userName: this.props.login.userinfo.userName,
                    doctor:record.userName,
                    action:'挂号',
                    date:date,
                    time: time,
                    price: 6,
                    on:true
                  }).write();
                  message.success('挂号成功！',1);
      }      

      render() {
              return (
                    <div>
                       <Collapse accordion>
                          {
                            this.renderFirst()
                          }
                        </Collapse>
                     </div>    
            );
        }
}
export default connect((state) => ({login: state.login}))(App);
