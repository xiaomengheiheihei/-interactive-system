import React, { Component } from 'react'
import './index.scss'
import Breadcrumb from '../components/breadcrumb/index.js'
import Retrieval from '../components/retrieval/index'
import { withRouter } from 'react-router-dom'
import MyList from '../components/list/index'
import { Divider, Button, message } from 'antd'
import http from '../../utils/http'

const option = [
    {
        name: '全部点赞',
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
    width: '50px',
    height: '50px',
    display: 'inline-block'
}

class Likes extends Component {
    state = {
        visible: false,
        columns: [{
            title: '节目标示',
            dataIndex: 'program.iconUrl',
            render: (text) => <img style={imgStyle} src={text} alt="" />
        },{
            title: '节目名称',
            dataIndex: 'program.name',
        },{
            title: '开始时间',
            dataIndex: 'beginTime',
        },{
            title: '结束时间',
            dataIndex: 'endTime',
        },{
            title: '参与人数',
            dataIndex: 'programId',
        },{
            title: '负责人',
            dataIndex: 'userAccount',
        },{
            title: '操作',
            dataIndex: '',
            key: 'op',
            render: (record) => <div>
                            <Button onClick={() => this.gotoDetail(record)}>查看</Button>
                            <Button onClick={() => this.editItem(record)} style={btnStyle} type="primary">编辑</Button>
                            <Button onClick={() => this.deleteLikes(record)} type="danger">删除</Button>
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
        data: []
    }
    componentDidMount () {
        this.getList()
    }
    gotoDetail = (record) => {

    }
    editItem = (record) => {
        
    }
    deleteLikes = (record) => {
        http.delete(`/thumbsProgram/delete`, {thumbsProgramId: record.id})
        .then(res => {
            if (res.code === 200) {
                message.success(`删除成功！`)
                this.getList()
            } else {
                message.error(res.message)
            }
        })
        .catch(error => {
            message.error(`网络连接失败，请稍后重试！`)
        })
    }
    isCreateMessgeStart (bol) {
        if (bol) {
            this.props.history.push(`/likesManage/createLikes`);
        }
    }
    getList (current=1, size=10) {
        http.get(`/thumbsProgram/list`, {current: current, size: size})
        .then(res => {
            if (res.code === 200) {
                this.setState({data: res.data.rows})
            } else {
                message.error(`获取列表信息失败，请稍后重试！`)
            }
        })
        .catch(error => {
            message.error(`网络连接失败，请稍后重试！`)
        })
    }
    render () {
        return (
            <div className="likes-wrap">
                <Breadcrumb 
                    title={['点赞管理']} 
                    btn="+ 新建点赞" 
                    isCreateMessgeStart={bol => this.isCreateMessgeStart(bol)} 
                />
                <Retrieval option={option} option2={this.state.option2} searchPlaceholder="项目名称"/>
                <Divider />
                <Button className="deleting">批量删除</Button>
                <MyList columns={this.state.columns} data={this.state.data} />
            </div>
        )
    }
}

export default withRouter(Likes)