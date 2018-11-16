import React, { Component } from 'react'
import './index.scss'
import Breadcrumb from '../components/breadcrumb/index.js'
import Retrieval from '../components/retrieval/index'
import { withRouter } from 'react-router-dom'
import MyList from '../components/list/index'
import { Divider, Button } from 'antd'

const option = [
    {
        name: '全部答题',
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
        answerNum: '1223',
        answerType: '常规',
        duteyPerson: '李刚',
        statuis: '0'
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

class Answer extends Component {
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
            title: '题目数量',
            dataIndex: 'answerNum',
            width: 200
        },{
            title: '答题类型',
            dataIndex: 'answerType',
            width: 200
        },{
            title: '负责人',
            dataIndex: 'duteyPerson',
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
        if (bol) {
            this.props.history.push(`/answerManage/createAnswer`);
        }
    }
    render () {
        return (
            <div className="answer-wrap">
                <Breadcrumb 
                    title={['答题管理']} 
                    btn="+ 新建答题" 
                    isCreateMessgeStart={bol => this.isCreateMessgeStart(bol)} 
                />
                <Retrieval option={option} option2={this.state.option2} searchPlaceholder="项目名称"/>
                <Divider />
                <Button className="deleting">批量删除</Button>
                <MyList columns={this.state.columns} data={data} />
            </div>
        )
    }
}

export default withRouter(Answer)