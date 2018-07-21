import React, { Component } from 'react';
import ReactDOM from 'react-dom';
import {  Form,Table, Icon, Input,Upload,Button,Modal,message} from 'antd';
import db from '@/lib/datastore';
import moment from 'moment';
import {getinfo} from '@/renderer/redux/actions/login';
import {connect} from 'react-redux';
var fs =window.require('fs');
const FormItem = Form.Item;

class App extends React.Component {
      constructor(props) {
        super(props);
        this.state = {
          data:[],
          visible: false,
        };
      }

      componentDidMount(){
        let data = db.read().get('drugstore').value();
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
      onClick(){
        this.setState({
            visible: true,
        })
      }
      handleok(record) {
        let name = this.refs.name.input.value;
        let price = this.refs.price.input.value;
        let path = this.refs.uploader.input.files[0].path;

        let file = this.refs.uploader.input.files[0];
        let reader = new FileReader();
        reader.readAsDataURL(file);

        let rimg = path.split('\\');
        let r = rimg[rimg.length-1].split('.');
        let src = '';
        if(typeof FileReader==='undefined'){ 
          console.log("抱歉，你的浏览器不支持 FileReader"); 
      }
        // await fs.readFile(path, 'binary', function (err, data) {
        //   src = new Buffer(data).toString('base64');  
        //   console.log(src);
        reader.onload = function(e){
          db.get('drugstore').insert({ 
            type: name,
            // src:'./img/'+name+'.'+r[r.length-1],
            src: this.result ,
            price:price
          }).write();
          // result.innerHTML = '<img src="'+this.result+'" alt=""/>'
      }
          
        //   // fs.writeFile('./public/img/'+name+'.'+r[r.length-1], data,'binary', function (err) {
        //   //       if (!err)
        //   //         console.log("写入成功！")
        //   //     })
        //   // if (err) return console.log(err);
        // });
        let data = db.get('drugstore').value();
        message.success('添加成功！',1);
        this.refs.name.input.value = ''; 
        this.refs.price.input.value ='';
        this.refs.uploader.input.value = '';
        this.setState({
          visible: false,
          data:data
        })
      }
      
      del(record){
        db.get('drugstore').remove({ id: record.id }).write();
        // let path = record.src.slice(1);
        // fs.unlink('./public'+path);
        let data = db.get('drugstore').value();
        message.success('删除成功！',1);
        this.setState({
            data:data
        })
      }

      render() {
        let columns = [{
            title: '药名',
            dataIndex: 'type',
          }, {
            title: '价格',
            dataIndex: 'price'
          }, {
            title: '操作',
            render: (text, record) => 
                  <a href="javascript:;" onClick={()=>this.del(record)}>删除</a>
          }];
              return (
                    <div>  
                       <Table columns={columns} dataSource={this.state.data} 
                       pagination = {{pageSize:5}} rowKey={(record)=>record.id}/>
                       <Button type="primary" onClick={this.onClick.bind(this)}>添加</Button>
                       <Modal
                        title="床位信息"
                        visible={this.state.visible}
                        onCancel={this.handleCancel}
                        bodyStyle={{marginTop:'-20px'}}
                        footer={[
                          <Button key="back" onClick={this.handleCancel}>取消</Button>,
                          <Button key="submit" type="primary" onClick={this.handleok.bind(this)}>
                            添加
                          </Button>
                        ]}
                      >
                        <Input ref='name' placeholder="药品名字" defaultValue='' />
                        <Input ref='price' placeholder="价格" defaultValue=''/>
                        <Input  type='file' ref='uploader' defaultValue=''/>
                      </Modal>
                     </div>     
            );
        }
}
export default connect(
  (state) => ({login: state.login}), 
  {getinfo}
)(App);

