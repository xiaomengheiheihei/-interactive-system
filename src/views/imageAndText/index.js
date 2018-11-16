import React, { Component } from 'react'
import '../likes/index.scss'
import Breadcrumb from '../components/breadcrumb/index.js'
import Retrieval from '../components/retrieval/index'
import { withRouter } from 'react-router-dom'
import MyList from '../components/list/index'
import { Divider, Button, Modal, Select, DatePicker, TimePicker } from 'antd'
import moment from 'moment';


const Option = Select.Option;

const option = [
    {
        name: '全部播报',
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
const data = [
    {
        marking: 'https://ps.ssl.qhmsg.com/t01ba00c77e08a37419.jpg',
        name: '幸运67',
        startTime: '2018-10-23',
        endTime: '2017-11-22',
        type: '图文',
        status: '未开始',
        duteyPerson: '李刚'
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

class Likes extends Component {
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
            title: '播报类型',
            dataIndex: 'type',
        },{
            title: '状态',
            dataIndex: 'status',
        },{
            title: '负责人',
            dataIndex: 'duteyPerson',
        },{
            title: '操作',
            dataIndex: '',
            key: 'op',
            render: (record) => <div>
                            <Button onClick={() => this.gotoDetail(record)}>查看</Button>
                            <Button style={btnStyle} type="primary">编辑</Button>
                            <Button type="danger">删除</Button>
                        </div>
        }],
        option2: [
            {
                name: '默认排序',
                key: 'init',
            },
            {
                name: '按时间正序',
                key: 'timez',
            },
            {
                name: '按时间倒序',
                key: 'timed',
            }
        ],
    }
    isCreateMessgeStart (bol) {
        this.setState({
            visible: bol
        })
    }
    startTimeonChange = () => {

    }
    handleOk = () => {

    }
    gotoDetail =  (record) => {
        this.props.history.push(`/imageAndText/imageAndTextList?imgTextId=${record.name}`);
    }
    render () {
        return (
            <div className="likes-wrap">
                <Breadcrumb 
                    title={['图文播报']} 
                    btn="+ 新建项目" 
                    isCreateMessgeStart={bol => this.isCreateMessgeStart(bol)} 
                />
                <Retrieval option={option} option2={this.state.option2} searchPlaceholder="项目名称"/>
                <Divider />
                <Button className="deleting">批量删除</Button>
                <MyList columns={this.state.columns} data={data} />
                <Modal
                    title="新建项目"
                    centered={true}
                    okText="确定"
                    cancelText="取消"
                    getContainer={() => document.querySelector('.likes-wrap')}
                    visible={this.state.visible}
                    onOk={this.handleOk}
                    onCancel={()=>this.setState({visible: false})}
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
                        <DatePicker size="small" onChange={this.startTimeonChange} />
                        <TimePicker defaultValue={moment('12:08:23', 'HH:mm:ss')} size="small" />
                    </div>
                    <div className="create-item">
                        <i>*</i>
                        <span>结束时间：</span>
                        <DatePicker size="small" onChange={this.startTimeonChange} />
                        <TimePicker defaultValue={moment('12:08:23', 'HH:mm:ss')} size="small" />
                    </div>
                    <div className="create-item">
                        <i>*</i>
                        <span>播报类型：</span>
                        <Select size="small" defaultValue="lucy" style={{ width: 320 }} onChange={this.changeProgram}>
                            <Option value="jack">Jack</Option>
                            <Option value="lucy">Lucy</Option>
                        </Select>
                    </div>
                </Modal>
            </div>
        )
    }
}

export default withRouter(Likes)