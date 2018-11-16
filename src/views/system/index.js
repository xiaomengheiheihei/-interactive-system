import React, { Component } from 'react';
import Breadcrumb from '../components/breadcrumb/index.js'
import Retrieval from '../components/retrieval/index'
import { withRouter } from 'react-router-dom'
import MyList from '../components/list/index'
import { Divider, Button, Modal, Select, TimePicker } from 'antd'
import moment from 'moment';
import '../leaveMessage/index.scss'

const Option = Select.Option;

const option = [
    {
        name: '全部节目',
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
        createPerson: '李刚',
        pTime: '周三 22:33:22',
    }
]

class SystemSetting extends Component {
    state = {
        visible: false,
        columns: [{
            title: '节目标识',
            dataIndex: 'marking',
            render: (text) => <img style={imgStyle} src={text} alt="" />
        },{
            title: '节目名称',
            dataIndex: 'name',
        },{
            title: '创建时间',
            dataIndex: 'startTime',
        },{
            title: '创建人',
            dataIndex: 'createPerson',
        },{
            title: '播出时间',
            dataIndex: 'pTime',
        },{
            title: '操作',
            dataIndex: '',
            key: 'op',
            render: (record) => <div>
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
                    title={['系统设置']} 
                    btn="+ 添加节目" 
                    isCreateMessgeStart={bol => this.isCreateMessgeStart(bol)} 
                />
                <Retrieval option={option} searchPlaceholder="节目名称"/>
                <Divider />
                <Button className="deleting">批量删除</Button>
                <MyList columns={this.state.columns} data={data} />
                <Modal
                    title="添加节目"
                    centered={true}
                    okText="确定"
                    cancelText="取消"
                    getContainer={() => document.querySelector('.leave-message-wrap')}
                    visible={this.state.visible}
                    onOk={this.handleOk}
                    onCancel={this.handleCancel}
                >
                    <div className="create-item">
                        <span>节目标识：</span>
                        <Select size="small" defaultValue="lucy" style={{ width: 320 }} onChange={this.changeProgram}>
                            <Option value="jack">Jack</Option>
                            <Option value="lucy">Lucy</Option>
                        </Select>
                    </div>
                    <div className="create-item">
                        <span>节目名称：</span>
                        <TimePicker defaultValue={moment('12:08:23', 'HH:mm:ss')} size="small" />
                    </div>
                    <div className="create-item">
                        <span>播出时间：</span>
                    </div>
                </Modal>
            </div>
        )
    }
}

export default withRouter(SystemSetting)