import React, { Component } from 'react'
import Breadcrumb from '../../components/breadcrumb/index.js'
import Retrieval from '../../components/retrieval/index'
import MyList from '../../components/list/index'
import './index.scss'
import { Button, Divider } from 'antd'

const data = [
    {
        num: 1,
        avatar: 'https://ps.ssl.qhmsg.com/t01ba00c77e08a37419.jpg',
        name: '幸运67',
        createTime: '2018-10-23 18:22:30',
        text: '萨达姆看什么地方看见难道今年房',
        img: ['https://wallpapers.wallhaven.cc/wallpapers/full/wallhaven-705949.jpg',
            'https://wallpapers.wallhaven.cc/wallpapers/full/wallhaven-708975.png',
            'https://wallpapers.wallhaven.cc/wallpapers/full/wallhaven-706214.jpg'],
        statuis: '0'
    }
]

const imgStyle = {
    width: '60px',
    height: '60px',
    display: 'inline-block'
}

class ImageAndTextList extends Component {

    state = {
        option: [
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
            title: '序号',
            dataIndex: 'num'
        },{
            title: '发布时间',
            dataIndex: 'createTime',
        },{
            title: '文字内容',
            dataIndex: 'text',
        },{
            title: '图片内容',
            dataIndex: 'img',
            render:(text) => <div className="msgImg-wrap">
                {text.map((item, i) => 
                    <img src={item} alt="" key={i} />
                )}
            </div>
        },{
            title: '音视频内容',
            dataIndex: 'avatar',
            render: (text) => <img style={imgStyle} src={text} alt="" />
        },{
            title: '状态',
            dataIndex: 'statuis',
        },{
            title: '操作',
            dataIndex: '',
            key: 'op',
            render: (record) => <div className="option-btn-wrap">
                            <Button type="primary">发布</Button>
                            <Button type="primary">编辑</Button>
                            <Button >回收</Button>
                            <Button type="danger">删除</Button>
                            <p>(回收后将不在前端显示)</p>
                        </div>
        }]
    }
    
    render () {
        return (
            <div className="message-detail-list">
                <Breadcrumb 
                    title={['图文播报','图文信息列表']}
                    btn="导出Excel表" 
                />
                <Retrieval 
                    option={this.state.option}
                    option1={this.state.option1} 
                    option2={this.state.option2}
                    searchPlaceholder="请输入关键字（昵称或留言内容）"
                />
                <Divider />
                <Button className="deleting">批量发布</Button>
                <Button className="deleting">批量回收</Button>
                <Button className="deleting">批量删除</Button>
                <MyList columns={this.state.columns} data={data} />
            </div>
        )
    }
}

export default ImageAndTextList