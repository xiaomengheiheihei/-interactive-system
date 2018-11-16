import React, { Component } from 'react'
import Breadcrumb from '../../components/breadcrumb/index.js'
import Retrieval from '../../components/retrieval/index'
import MyList from '../../components/list/index'
import './index.scss'
import { Button, Divider } from 'antd'

const data = [
    {
        avatar: 'https://ps.ssl.qhmsg.com/t01ba00c77e08a37419.jpg',
        name: '幸运67',
        createTime: '2018-10-23 18:22:30',
        text: '2017-11-22',
        img: ['https://wallpapers.wallhaven.cc/wallpapers/full/wallhaven-705949.jpg',
            'https://wallpapers.wallhaven.cc/wallpapers/full/wallhaven-708975.png',
            'https://wallpapers.wallhaven.cc/wallpapers/full/wallhaven-706214.jpg'],
        statuis: '0'
    }
]

const imgStyle = {
    width: '100px',
    height: '100px',
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
            dataIndex: 'avatar',
            render: (text) => <img style={imgStyle} src={text} alt="" />
        },{
            title: '用户昵称',
            dataIndex: 'name',
        },{
            title: '留言时间',
            dataIndex: 'createTime',
        },{
            title: '留言文本',
            dataIndex: 'text',
        },{
            title: '留言图片',
            dataIndex: 'img',
            render:(text) => <div className="msgImg-wrap">
                {text.map((item, i) => 
                    <img src={item} alt="" key={i} />
                )}
                <p>（每用户每次最多上传三张图片）</p>
            </div>
        },{
            title: '状态',
            dataIndex: 'statuis',
            width: 200
        },{
            title: '操作',
            dataIndex: '',
            key: 'op',
            render: (record) => <div className="option-btn-wrap">
                            <Button type="primary">审核通过</Button>
                            <Button type="danger">不通过</Button>
                            <Button >回收</Button>
                            <Button type="danger">删除</Button>
                            <p>(回收后留言将不在前端显示)</p>
                        </div>
        }]
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
                <MyList columns={this.state.columns} data={data} />
            </div>
        )
    }
}

export default MessageDetailList