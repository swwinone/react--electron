import React, { Component } from 'react';
import ReactDOM from 'react-dom';
import './index.css';
import { Card,Table, Icon,Popconfirm,Modal,Button, Input,message } from 'antd';
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
          carData:[],
        };
      }

      componentDidMount(){
        let data = db.read().get('drugstore').value();
        debugger
        let sdata = db.get('shopcar').value();
        let dateData = [];
        sdata.map((value,index)=>{
          if(value.userName===this.props.login.userinfo.userName){
            dateData.push(value);
         }
        })
        this.setState({
            data:data,
            carData:dateData,
        })
      }
      renderDrug(){
        let gridStyle = {
            width: '25%',
            textAlign: 'center',
          };
        let data =this.state.data;
        return data.map((item,index)=>{
            // let imgurl = require('../../../../public'+item.src.slice(1));
            // console.log(imgurl);
            return (<Card.Grid style={gridStyle}>
            <img src={item.src} style={{width:'100px',height:'100px'}} alt={item.type}/>
            <span>{item.type}</span>&nbsp;
            <span>{item.price}</span>
            <div style={{marginTop:'5px'}}>
            <Button type="primary" shape="circle" 
            onClick={()=>this.buy(item)} style={{width:'20px',height:'20px',fontSize:'13px'}}>买</Button>&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;
            <Button type="primary" shape="circle" icon="plus" 
            onClick={()=>this.changeNumber(item,'add')} style={{width:'20px',height:'20px',fontSize:'13px'}}></Button>
            </div>
            </Card.Grid>)
        })
      }

      handleCancel = (e) => {
        console.log(e);
        this.setState({
          visible: false,
        });
      }

      onClick() {
        this.setState({
          visible: true,
        });
      }

      buy(item,type){
        let date = moment().format('YYYY-MM-DD');
        let time = moment().format('HH:mm:ss');
        if(type){
          let price = 0,action='购买';
          item.map((value,index)=>{
              price = price +parseInt(value.price)*parseInt(value.number);
              action = action + value.type + value.number +'个';
          })
          db.get('record').insert({ 
            userName: this.props.login.userinfo.userName,
            action:action,
            date:date,
            time: time,
            price: price,
            on:false
          }).write();
          db.get('shopcar').remove({  userName: this.props.login.userinfo.userName,
             }).write();
        }else{
          db.get('record').insert({ 
                    userName: this.props.login.userinfo.userName,
                    action:'购买'+item.type,
                    date:date,
                    time: time,
                    price: parseInt(item.price),
                    on:false
                  }).write();
        }
        let sdata = db.get('shopcar').value();
        let dateData = [];
          sdata.map((value,index)=>{
            if(value.userName===this.props.login.userinfo.userName){
              dateData.push(value);
          }
          })
          this.setState({
            visible: false,
            carData:dateData,
          });
        message.success('购买成功！',1);
      }

      changeNumber(record,action){
        let data = db.get('shopcar').find({
          userName: this.props.login.userinfo.userName,
          type:record.type,
        }).value();
        let number = 1;
        if(data&&action==='add'){
           number = data.number+1;
        }
        if(data&&action==='minus'){
           number = data.number-1;
           if(number===0){
            message.error('数量已经为1',1);
            return;
           }
        }
        if(data){
          db.get('shopcar').find({
            userName: this.props.login.userinfo.userName,
            type:record.type,
          }).assign({number:number}).write();
        }else{
          db.get('shopcar').insert({ 
            userName: this.props.login.userinfo.userName,
            type:record.type,
            price: record.price,
            number:number,
          }).write();
          }
          let sdata = db.get('shopcar').value();
          let dateData = [];
          sdata.map((value,index)=>{
            if(value.userName===this.props.login.userinfo.userName){
              dateData.push(value);
          }
          })
          this.setState({
            carData:dateData,
          });
      }
         
      del(record){
        db.get('shopcar').remove({  userName: this.props.login.userinfo.userName,
          type:record.type, }).write();
          let sdata = db.get('shopcar').value();
          message.error('删除成功',1);
          let dateData = [];
          sdata.map((value,index)=>{
            if(value.userName===this.props.login.userinfo.userName){
              dateData.push(value);
          }
          })
          this.setState({
            carData:dateData,
          });
      }

      sum(record){
        let sum=0;
        record.map((item,idex)=>{
          sum =sum + parseInt(item.price)*parseInt(item.number);
        })
        return '您需要支付'+ sum +'元';
      }

      render() {
        let carcolumns = [{
            title: '类型',
            dataIndex: 'type',
          }, {
            title: '价格',
            dataIndex: 'price',
          }, {
            title: '数量',
            render: (text, record) => (
              <span>
                <Button type="primary" shape="circle" icon="minus" 
                 onClick={()=>this.changeNumber(record,'minus')} style={{width:'15px',height:'15px',fontSize:'11px'}}></Button>&nbsp;
                  {
                    record.number
                  }&nbsp;
                <Button type="primary" shape="circle" icon="plus" 
                onClick={()=>this.changeNumber(record,'add')} style={{width:'15px',height:'15px',fontSize:'11px'}}></Button>
              </span>
          ),
          }, {
            title: '操作',
            render: (text, record) => <a href="javascript:;" onClick={()=>this.del(record)} 
            style={{color:'red'}}>删除</a>
          }];
              return (
                    <div>
                       <Card title="药品商店">
                       {
                           this.renderDrug()
                       }
                       </Card>
                       <Modal
                        title="购物车"
                        visible={this.state.visible}
                        onCancel={this.handleCancel}
                        bodyStyle={{marginTop:'-20px'}}
                        footer={[
                          <Button key="back" onClick={this.handleCancel}>取消</Button>,
                          <Popconfirm title={this.sum(this.state.carData)} okText="确认" cancelText="取消" onConfirm={()=>this.buy(this.state.carData,'car')}>
                            <Button key="submit" type="primary" >
                              购买
                            </Button>
                          </Popconfirm>,
                        ]}
                      >
                        <Table columns={carcolumns} dataSource={this.state.carData} 
                         pagination={false} rowKey={(record)=>record.userName}/>
                      </Modal>
                      <Button type="primary" onClick={this.onClick.bind(this)} style={{marginLeft:'250px'}}>购物车</Button>
                     </div>     
            );
        }
}
export default connect(
  (state) => ({login: state.login}), 
  {getinfo}
)(App);
