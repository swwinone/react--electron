import React, { Component } from 'react';
import ReactDOM from 'react-dom';
import { DatePicker,Table, Icon, Divider,Popconfirm } from 'antd';
import db from '@/lib/datastore';
import moment from 'moment';
import {getinfo} from '@/renderer/redux/actions/login';
import {connect} from 'react-redux';

class App extends React.Component {
      constructor(props) {
        super(props);
        this.state = {
          color: props.initialColor,
          data:[],
        };
      }

      componentDidMount(){
        let data = db.read().get('record').value();
        let dateData = [];
        data.map((value,index)=>{
          if(value.doctor===this.props.login.userinfo.userName&&value.on){
            dateData.push(value);
         }
        })
        this.setState({
            data:dateData
        })
      }

      onClick(record) {
        db.get('record').find({ id: record.id }).assign({
            on:false
        }).write();
        let data = db.get('record').value();
        let dateData = [];
        data.map((value,index)=>{
          if(value.doctor===this.props.login.userinfo.userName&&value.on){
            dateData.push(value);
         }
        })
        this.setState({
            data:dateData
        })
      }
   
      render() {
        let columns = [{
            title: '姓名',
            dataIndex: 'userName',
          }, {
            title: '时间',
            render: (text, record) => (
              <span>{record.date + ' ' + record.time }</span>
            )
          }, {
            title: '操作',
            render: (text, record) => 
                  <a href="javascript:;" onClick={()=>this.onClick(record)}>叫号</a>
          }];
              return (
                    <div>  
                       <Table columns={columns} dataSource={this.state.data} 
                       pagination = {{pageSize:5}} rowKey={(record)=>record.id}/>
                     </div>     
            );
        }
}
export default connect(
  (state) => ({login: state.login}), 
  {getinfo}
)(App);
