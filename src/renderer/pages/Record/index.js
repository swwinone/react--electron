import React, { Component } from 'react';
import ReactDOM from 'react-dom';
import './index.css';
import { DatePicker,Table, Icon, Divider,Popconfirm } from 'antd';
import db from '@/lib/datastore';
import moment from 'moment';
import {getinfo} from '@/renderer/redux/actions/login';
import {connect} from 'react-redux';

const {RangePicker } = DatePicker;
class App extends React.Component {
      constructor(props) {
        super(props);
        this.state = {
          color: props.initialColor,
          data:[],
          date:[]
        };
      }

      componentDidMount(){
        let data = db.get('record').value();
        let dateData = [];
        data.map((value,index)=>{
          if(value.userName===this.props.login.userinfo.userName){
            dateData.push(value);
         }
        })
        this.setState({
            data:dateData
        })
      }

      onChange(date, dateString) {
        this.setState({
          date:dateString
       })
      }

      onClick(record) {
        db.get('record').remove({ id: record }).write();
        let data = db.get('record').value();
        let dateData = [];
        data.map((value,index)=>{
          if(value.userName===this.props.login.userinfo.userName){
            dateData.push(value);
         }
        })
        this.setState({
            data:dateData
        })
      }

      onOk(){
        let data =db.get('record').value();
        let dateData = [];
        data.map((value,index)=>{
          if(value.date===this.state.date&&value.userName===this.props.login.userinfo.userName){
            dateData.push(value);
         }
        })
        this.setState({
          data:dateData
        })
        dateData = [];
      }
   
      render() {
        let columns = [{
            title: '操作',
            dataIndex: 'action',
          }, {
            title: '时间',
            render: (text, record) => (
              <span>{record.date + ' ' + record.time }</span>
            )
          }, {
            title: '花费',
            dataIndex: 'price',
            render: text => <span>{text + '元'}</span>
          }, {
            title: '进行状态',
            render: (text, record) => (
              <span>
              {
                  record.on ?(<span>进行中</span>):
                  (<span>已完成</span>)
              }
              {
                record.action ==='挂号'&&record.on? (
                <Popconfirm title={'取消'+ record.action + '!'} okText="确认" cancelText="取消" onConfirm={()=>this.onClick(record.id)}>
                  <a href="javascript:;">&nbsp;&nbsp;&nbsp;&nbsp;取消{record.action }</a>
                </Popconfirm>): ''
              }
              </span>
          ),
          }];
              return (
                    <div>
                       <div className='record_time'>可选时间范围 ：<DatePicker 
                        showTime onChange={this.onChange.bind(this)} placeholder={'选择时间'} onOk={this.onOk.bind(this)}/></div>  
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
