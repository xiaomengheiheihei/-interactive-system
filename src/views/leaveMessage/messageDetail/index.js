import React, { Component } from 'react'
import Breadcrumb from '../../components/breadcrumb/index.js'
import Retrieval from '../../components/retrieval/index'
import MyList from '../../components/list/index'
import { withRouter } from 'react-router-dom'
import './index.scss'
import { Button, Divider, message } from 'antd'
import http from '../../../utils/http'

const imgStyle = {
    width: '50px',
    height: '50px',
    display: 'inline-block'
}

class MessageDetailList extends Component {

    state = {
        option: [
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
        ],
        option1: [
            {
                name: '筛选条件',
                key: 'default',
            },
            {
                name: '纯文字留言',
                key: 'text',
            },
            {
                name: '纯图片留言',
                key: 'img',
            },
            {
                name: '文字和图片留言',
                key: 'textAndImg',
            },
        ],
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
                name: '案时间倒序',
                key: 'timed',
            }
        ],
        columns: [{
            title: '用户头像',
            dataIndex: 'userPhoto',
            render: (text) => <img style={imgStyle} src={text} alt="" />
        },{
            title: '用户昵称',
            dataIndex: 'nickname',
        },{
            title: '留言时间',
            dataIndex: 'createTime',
        },{
            title: '留言文本',
            dataIndex: 'content',
        },{
            title: '留言图片',
            dataIndex: 'imageUrl',
            render:(text) => <div className="msgImg-wrap">
                {text.map((item, i) => 
                    <img src={item} alt="" key={i} />
                )}
                <p>（每用户每次最多上传三张图片）</p>
            </div>
        },{
            title: '状态',
            dataIndex: 'status',
        },{
            title: '操作',
            dataIndex: '',
            key: 'op',
            render: (record) => <div className="option-btn-wrap">
                            <Button size="small" type="primary">审核通过</Button>
                            <Button size="small" type="danger">不通过</Button>
                            <Button size="small" >回收</Button>
                            <Button size="small" onClick={() => this.deleteMessage(record)} type="danger">删除</Button>
                            <p>(回收后留言将不在前端显示)</p>
                        </div>
        }],
        data: []
    }

    componentDidMount () {
        this.getList()
    }

    getList () {
        http.get('/messageItem/list', {messageProgramId: this.props.location.search.split('=')[1]})
        .then(res => {
            if (res.code === 200) {
                this.setState({data: res.data})
            } else {
                message.error(res.message)
            }
        })
        .catch(error => {
            message.error('网络连接失败，请稍后重试！')
        })
    }

    deleteMessage = (record) => {
        let obj = {messageItemId: record.id}
        http.delete('/messageItem/delete', obj)
        .then(res => {
            if (res.code === 200) {
                this.setState({data: res.data})
                message.success('删除成功！')
                this.getList()
            } else {
                message.error(res.message)
            }
        })
        .catch(error => {
            message.error('网络连接失败，请稍后重试！')
        })
    }
    
    render () {
        return (
            <div className="message-detail-list">
                <Breadcrumb 
                    title={['留言管理','留言列表']}
                    btn="导出Excel表" 
                />
                <Retrieval 
                    option={this.state.option}
                    option1={this.state.option1} 
                    option2={this.state.option2}
                    searchPlaceholder="请输入关键字（昵称或留言内容）"
                />
                <Divider />
                <Button className="deleting">批量删除</Button>
                <MyList columns={this.state.columns} data={this.state.data} />
            </div>
        )
    }
}

export default withRouter(MessageDetailList)