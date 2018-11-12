import React, { Component } from 'react';
import Breadcrumb from '../components/breadcrumb/index.js'
import Retrieval from '../components/retrieval/index'
import MyList from '../components/list/index'
import { Divider, Button } from 'antd'

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

const columns = [{
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
},{
    title: '是否人审',
    dataIndex: 'manualReview',
},{
    title: '状态',
    dataIndex: 'statuis',
},{
    title: '操作',
    dataIndex: '',
    key: 'op',
    render: () => <div><Button>查看</Button><Button style={btnStyle} type="primary">编辑</Button><Button type="danger">删除</Button></div>
}]

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
    render () {
        return (
            <div className="leave-message-wrap">
                <Breadcrumb title='留言管理' btn="+ 新建留言" />
                <Retrieval option={option} />
                <Divider />
                <MyList columns={columns} data={data} />
            </div>
        )
    }
}

export default LeaveMessage