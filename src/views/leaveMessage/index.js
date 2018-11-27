import React, { Component } from 'react';
import Breadcrumb from '../components/breadcrumb/index.js'
import Retrieval from '../components/retrieval/index'
import { withRouter } from 'react-router-dom'
import MyList from '../components/list/index'
import http from '../../utils/http'
import { Divider, Button, Modal, Select, Switch, DatePicker, TimePicker, message } from 'antd'
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

const btnStyle = {
    margin: '0 20px'
}
const imgStyle = {
    width: '100px',
    height: '100px',
    display: 'inline-block'
}

class LeaveMessage extends Component {
    state = {
        visible: false,
        columns: [{
            title: '节目标示',
            dataIndex: 'program.iconUrl',
            render: (text) => <img style={imgStyle} src={text} alt="" />
        },{
            title: '节目名称',
            dataIndex: 'program.name',
            render: (text) => <p>{text}</p>
        },{
            title: '开始时间',
            dataIndex: 'beginTime',
        },{
            title: '结束时间',
            dataIndex: 'endTime',
        },{
            title: '是否机审',
            dataIndex: 'mCheckFlag',
            render: (text) => text === '1' ? '是' : '否'
        },{
            title: '是否人审',
            dataIndex: 'hCheckFlag',
            render: (text) => text === '1' ? '是' : '否'
        },{
            title: '状态',
            dataIndex: 'programId',
        },{
            title: '操作',
            dataIndex: '',
            key: 'op',
            render: (record) => <div>
                            <Button onClick={() => this.gotoDetail(record)}>查看</Button>
                            <Button onClick={() => this.gotoDetail(record)} style={btnStyle} type="primary">编辑</Button>
                            <Button onClick={() => this.deleteMessage(record)} type="danger">删除</Button>
                        </div>
        }],
        data: [],
        programList: [],
        startDate: '',
        endDate: '',
        startTime: '12:08:23',
        endTime: '12:08:23',
        params: {
            beginTime: '',
            endTime: '',
            hCheckFlag: '1',
            id: '',
            mCheckFlag: '1',
            programId: ''
        }
    }
    componentDidMount () {
        // 获取配置可留言节目列表
        this.getList()
        // 获取节目列表
        http.get(`/program/list`, {current: 1, size: 10})
        .then(res => {
            if (res.code === 200) {
                this.setState({
                    programList: res.data.rows
                })
            } else {
                message.error(res.message)
            }
        })
        .catch(error => {
            message.error(`网络连接失败，请稍后重试！`)
        })
    }
    isCreateMessgeStart (bol) {
        this.setState({
            visible: bol
        })
    }
    getList () {
        http.get(`/messageProgram/list`, {current: 1, size: 10})
        .then(res => {
            if (res.code === 200) {
                this.setState({data: res.data.rows})
            } else {
                message.error(res.message)
            }
        })
        .catch(error => {
            message.error(`网络链接失败，请稍后重试！`)
        })
    }
    handleOk = () => {      // 新增配置留言
        let params = new FormData()
        for (let item of Object.keys(this.state.params)) {
            if (item === 'beginTime') {
                params.append('beginTime', this.state.startDate + ' ' + this.state.startTime)
                continue;
            }
            if (item === 'endTime') {
                params.append('endTime', this.state.endDate + ' ' + this.state.endTime)
                continue;
            }
            params.append(item, this.state.params[item])
        }
        http.post(`/messageProgram/add`, params)
        .then(res => {
            if (res.code === 200) {
                message.success('添加成功')
                this.getList()
                this.setState({
                    visible: false
                })
            } else {
                message.error(res.message)
            }
        })
        .catch(error => {
            message.error(`网络连接失败，请稍后重试！`)
        })
    }
    handleCancel = () => {
        this.setState({
            visible: false
        })
    }
    changeProgram = (value) => {
        this.setState((state) => {state.params.programId = value})
    }
    startDateOnChange = (date, dateString) => {
        this.setState({startDate: dateString})
    }
    startTimeOnchange = (date, dateString) => {
        this.setState({startTime: dateString})
    }
    endDateOnChange = (date, dateString) => {
        this.setState({endDate: dateString})
    }
    endTimeOnChange = (date, dateString) => {
        this.setState({endTime: dateString})
    }
    changeSwitchH = (value) => {
        this.setState((state) => {state.params.hCheckFlag = value})
    }
    changeSwitchM = (value) => {
        this.setState((state) => {state.params.mCheckFlag = value})
    }
    gotoDetail =  (record) => {
        this.props.history.push(`/messageManage/MessageDetailList?messageId=${record.id}`);
    }
    deleteMessage = (record) => {
        http.delete(`/messageProgram/delete`, {messageProgramId: record.id})
        .then(res => {
            if (res.code === 200) {
                message.error(`删除成功！`)
                this.getList()
            } else {
                message.error(res.message)
            }
        }) 
        .catch(error => {
            message.error(`网络连接失败，请稍后重试！`)
        })
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
                <MyList columns={this.state.columns} data={this.state.data} />
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
                        <Select size="small" placeholder="请选择" style={{ width: 320 }} onChange={this.changeProgram}>
                            {
                                this.state.programList.map((item, i) => (
                                    <Option key={item.id} value={item.id}>{item.name}</Option>
                                ))
                            }
                        </Select>
                    </div>
                    <div className="create-item">
                        <i>*</i>
                        <span>开始时间：</span>
                        <DatePicker style={{ width: 150 }} size="small" onChange={this.startDateOnChange} />
                        <TimePicker style={{ width: 150 }} onChange={this.startTimeOnchange} defaultValue={moment('12:08:23', 'HH:mm:ss')} size="small" />
                    </div>
                    <div className="create-item">
                        <i>*</i>
                        <span>结束时间：</span>
                        <DatePicker style={{ width: 150 }} size="small" onChange={this.endDateOnChange} />
                        <TimePicker style={{ width: 150 }} onChange={this.endTimeOnChange} defaultValue={moment('12:08:23', 'HH:mm:ss')} size="small" />
                    </div>
                    <div className="create-item switch-wrap">
                        <span>是否机器审核：</span>
                        <Switch size="small" onChange={this.changeSwitch} defaultChecked={this.state.params.hCheckFlag === '1' ? true : false } />
                        <Divider type="vertical" />
                        <span>是否人员审核：</span>
                        <Switch size="small" onChange={this.changeSwitch}  defaultChecked={this.state.params.mCheckFlag === '1' ? true : false} />
                    </div>
                </Modal>
            </div>
        )
    }
}

export default withRouter(LeaveMessage)