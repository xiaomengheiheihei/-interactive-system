import React, { Component } from 'react'
import '../../likes/createlikes/index.scss'
import Breadcrumb from '../../components/breadcrumb/index.js'
import { Select, Table, Button, Input, DatePicker,TimePicker, Modal } from 'antd'
import moment from 'moment';


const Option = Select.Option;

class CreateLuckDraw extends Component {

    state = {
        likesTypeOption: [
            {
                name: '文字列表形式',
                key: 'text'
            },
            {
                name: '头像列表形式',
                key: 'img'
            }
        ],
        visible: false
    }

    handleChange = (value) => {
        console.log(value)
    }
    startTimeonChange = (date, dateString) => {
        console.log(date, dateString);
    }
    startTimechangeTime = (time, timeString) => {
        console.log(time, timeString);
    }
    setLikesOk = (e) => {
        
    }
    setLikeCancel = (e) => {
        this.setState({
            visible: false,
        });
    }
    setLikes = (bol) => {
        this.setState({
            visible: bol
        })
    }
    render () {
        return (
            <div>
                <Breadcrumb 
                    title={['点赞管理','新建点赞']} 
                />
                <div className="create-like-wrap">
                    <div className="create-like-top">
                        <section className="item">
                            <i>*</i>
                            <span>项目名称：</span>
                            <Input style={{ width: 320 }} placeholder="请输入项目名称" />
                        </section>
                        <section className="item">
                            <i>*</i>
                            <span>开始时间：</span>
                            <DatePicker style={{ width: 150, marginRight: 20 }} 
                                onChange={this.startTimeonChange} 
                                placeholder={'请选择开始日期'}
                            />
                            <TimePicker style={{ width: 150 }} 
                                onChange={this.startTimechangeTime} 
                                placeholder={'请选择开始时间'}
                                defaultOpenValue={moment('00:00:00', 'HH:mm:ss')} 
                            />
                        </section>
                        <section className="item">
                            <i>*</i>
                            <span>结束时间：</span>
                            <DatePicker style={{ width: 150, marginRight: 20 }} 
                                onChange={this.startTimeonChange} 
                                placeholder={'请选择开始日期'}
                            />
                            <TimePicker style={{ width: 150 }} 
                                onChange={this.startTimechangeTime} 
                                placeholder={'请选择开始时间'}
                                defaultOpenValue={moment('00:00:00', 'HH:mm:ss')} 
                            />
                        </section>
                        <section className="item">
                            <i>*</i>
                            <span>点赞形式：</span>
                            <Select placeholder="请选择"
                                style={{ width: 320 }} 
                                onChange={this.handleChange}
                            >
                                {this.state.likesTypeOption.map((v, i) => 
                                    <Option key={v.key} value={v.key}>{v.name}</Option>
                                )}
                            </Select>
                            <Button className="add-likes" type="primary">添加一个点赞项</Button>
                        </section>
                    </div>
                    <MyTable setLikes={bol => this.setLikes(bol)} />
                    <Button className="submit-btn" type="primary">提交</Button>
                    <Button>取消</Button>
                    <Modal
                        title="虚拟点赞数设置"
                        centered={true}
                        okText="确定"
                        cancelText="取消"
                        className="modal-wrap"
                        getContainer={() => document.querySelector('.create-like-wrap')}
                        visible={this.state.visible}
                        onOk={this.setLikesOk}
                        onCancel={this.setLikeCancel}
                        >
                        <p>请输入虚拟点赞的数字：</p>
                        <Input style={{ width: 150 }} size="small" placeholder="请输入" /> <span>(虚拟点赞数在项目结束之前可以随时修改)</span>
                    </Modal>
                </div>
            </div>
        )
    }
}

function MyTable (props) {
    const columns = [
        {
            title: '序号',
            dataIndex: 'num'
        },
        {
            title: '点赞列表',
            dataIndex: 'likesList'
        },
        {
            title: '真实点赞数',
            dataIndex: 'reallNum'
        },
        {
            title: '虚拟点赞数',
            dataIndex: 'vNum'
        },
        {
            title: '总点赞数',
            dataIndex: 'allNum'
        },
        {
            title: '操作',
            dataIndex: '',
            render: (record) => <div>
                <Button className="set-likes" 
                    onClick={() => setLikes(record)} 
                    type="primary">设置虚拟数
                </Button>
                <Button type="danger">移除</Button>
            </div>
        }
    ]
    const data = [
        {
            num: 1,
            likesList: '春晚',
            reallNum: 180,
            vNum: 123455,
            allNum: 2433545
        }
    ]
    function setLikes (record) {
        props.setLikes(true);
    }
    return (
        <Table columns={columns} dataSource={data} rowKey={record => record.num} /> 
    )
}

export default CreateLuckDraw