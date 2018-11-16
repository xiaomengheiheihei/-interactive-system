import React, { Component } from 'react';
import Breadcrumb from '../components/breadcrumb/index.js'
import Retrieval from '../components/retrieval/index'
import { withRouter } from 'react-router-dom'
import MyList from '../components/list/index'
import { Divider, Button, Modal, Select, Switch, DatePicker, TimePicker } from 'antd'
import moment from 'moment';
import './index.scss'

const Option = Select.Option;

const option = [
    {
        name: '全部留言',
        key: 'all',
    },
    {
        name: '未开始',
        key: 'nostart'
    },
    {
        name: '进行中',
        key: 'inhand'
    },
    {
        name: '已结束',
        key: 'finish'
    }
]

function onChange(date, dateString) {
    console.log(date, dateString);
  }

const btnStyle = {
    margin: '0 20px'
}
const imgStyle = {
    width: '100px',
    height: '100px',
    display: 'inline-block'
}

const data = [
    {
        marking: 'https://ps.ssl.qhmsg.com/t01ba00c77e08a37419.jpg',
        name: '幸运67',
        startTime: '2018-10-23',
        endTime: '2017-11-22',
        machineAudits: '1',
        manualReview: '0',
        statuis: '0'
    }
]

class LeaveMessage extends Component {
    state = {
        visible: false,
        columns: [{
            title: '节目标示',
            dataIndex: 'marking',
            render: (text) => <img style={imgStyle} src={text} alt="" />
        },{
            title: '节目名称',
            dataIndex: 'name',
        },{
            title: '开始时间',
            dataIndex: 'startTime',
        },{
            title: '结束时间',
            dataIndex: 'endTime',
        },{
            title: '是否机审',
            dataIndex: 'machineAudits',
            width: 200
        },{
            title: '是否人审',
            dataIndex: 'manualReview',
            width: 200
        },{
            title: '状态',
            dataIndex: 'statuis',
            width: 200
        },{
            title: '操作',
            dataIndex: '',
            key: 'op',
            render: (record) => <div>
                            <Button onClick={() => this.gotoDetail(record)}>查看</Button>
                            <Button style={btnStyle} type="primary">编辑</Button>
                            <Button type="danger">删除</Button>
                        </div>
        }]
    }
    isCreateMessgeStart (bol) {
        this.setState({
            visible: bol
        })
    }
    handleOk = () => {
        alert('ok')
    }
    handleCancel = () => {
        this.setState({
            visible: false
        })
    }
    changeProgram = (value) => {
        
    }
    gotoDetail =  (record) => {
        this.props.history.push(`/messageManage/MessageDetailList?messageId=${record.name}`);
    }
    render () {
        return (
            <div className="leave-message-wrap">
                <Breadcrumb 
                    title={['留言管理']} 
                    btn="+ 新建留言" 
                    isCreateMessgeStart={bol => this.isCreateMessgeStart(bol)} 
                />
                <Retrieval option={option} searchPlaceholder="节目名称"/>
                <Divider />
                <Button className="deleting">批量删除</Button>
                <MyList columns={this.state.columns} data={data} />
                <Modal
                    title="新建留言"
                    centered={true}
                    okText="确定"
                    cancelText="取消"
                    getContainer={() => document.querySelector('.leave-message-wrap')}
                    visible={this.state.visible}
                    onOk={this.handleOk}
                    onCancel={this.handleCancel}
                >
                    <div className="create-item">
                        <i></i>
                        <span>节目名称：</span>
                        <Select size="small" defaultValue="lucy" style={{ width: 320 }} onChange={this.changeProgram}>
                            <Option value="jack">Jack</Option>
                            <Option value="lucy">Lucy</Option>
                        </Select>
                    </div>
                    <div className="create-item">
                        <i>*</i>
                        <span>开始时间：</span>
                        <DatePicker size="small" onChange={onChange} />
                        <TimePicker defaultValue={moment('12:08:23', 'HH:mm:ss')} size="small" />
                    </div>
                    <div className="create-item">
                        <i>*</i>
                        <span>结束时间：</span>
                    </div>
                    <div className="create-item switch-wrap">
                        <span>是否机器审核：</span>
                        <Switch size="small" defaultChecked />
                        <Divider type="vertical" />
                        <span>是否人员审核：</span>
                        <Switch size="small" defaultChecked />
                    </div>
                </Modal>
            </div>
        )
    }
}

export default withRouter(LeaveMessage)