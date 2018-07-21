import React, { Component } from 'react';
import ReactDOM from 'react-dom';
import { DatePicker,Table, Icon,Popconfirm,Modal,Button,message } from 'antd';
import db from '@/lib/datastore';
import moment from 'moment';
import {getinfo} from '@/renderer/redux/actions/login';
import {connect} from 'react-redux';

class App extends React.Component {
      constructor(props) {
        super(props);
        this.state = {
          visible: false,
          data:[],
          roomid:'',
          bedData:[],
        };
      }

      componentDidMount(){
        let data = db.read().get('rooms').value();
        this.setState({
            data:data
        })
      }

      handleCancel = (e) => {
        console.log(e);
        this.setState({
          visible: false,
        });
      }

      onClick(record) {
        this.setState({
          visible: true,
          bedData:record.bed,
          roomid:record.roomNumber
        });
      }

      onConfirm(index,type){
        let data=db.get('rooms').find({roomNumber:this.state.roomid}).value().bed;
        data[index-1] ={
          bedNumber:index,
          isbed:type,
        }
        db.get('rooms').find({roomNumber:this.state.roomid}).assign({
          bed:data
        }).write();
        this.setState({
          data: db.get('rooms').value(),
        });
        let date = moment().format('YYYY-MM-DD');
        let time = moment().format('HH:mm:ss');
        db.get('record').insert({ 
                    userName: this.props.login.userinfo.userName,
                    action:'预定病房',
                    date:date,
                    time: time,
                    price: 100,
                    on:false
                  }).write();
                  message.success('操作成功！',1);
      }

    
      render() {
        let roomcolumns = [{
            title: '房间号',
            dataIndex: 'roomNumber',
          }, {
            title: '房间状态',
            dataIndex: 'isroom',
            render: (text, record) => text?<span>房间未满</span>:<span>房间满员</span>
          }, {
            title: '房间具体信息',
            render: (text, record) => (
              <span>
              {
                <a href="javascript:;" onClick={()=>this.onClick(record)}>查看信息</a>
              }
              </span>
          ),
          }];
        let bedcolumns = [{
            title: '床号',
            dataIndex: 'bedNumber',
          }, {
            title: '床位状态',
            dataIndex: 'isbed',
          render: (text, record) => text?(<span>空床</span>):(<span>已预订</span>)
          }, {
            title: '床位预定',
            render: (text, record) => record.isbed?(
              <Popconfirm title="预约床位需付100元！" okText="确认" cancelText="取消" onConfirm={()=>this.onConfirm(record.bedNumber,false)}>
                  <Button type="primary">预定</Button>
                </Popconfirm>
          ):<Button type="primary" onClick={()=>this.onConfirm(record.bedNumber,true)}>清房</Button>
          }];
              return (
                    <div>
                       <Table columns={roomcolumns} dataSource={this.state.data} 
                       pagination = {{pageSize:5}} rowKey={(record)=>record.roomNumber}/>
                       <Modal
                        title="床位信息"
                        visible={this.state.visible}
                        footer={null}
                        onCancel={this.handleCancel}
                        bodyStyle={{marginTop:'-20px'}}
                      >
                        <Table columns={bedcolumns} dataSource={this.state.bedData} 
                         pagination={false} rowKey={(record)=>record.bedNumber}/>
                      </Modal>
                     </div>     
            );
        }
}
export default connect(
  (state) => ({login: state.login}), 
  {getinfo}
)(App);
