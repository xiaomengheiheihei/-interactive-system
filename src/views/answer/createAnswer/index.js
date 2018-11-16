import React, { Component } from 'react'
import './index.scss'
import Breadcrumb from '../../components/breadcrumb/index.js'
import { Select, Table, Button, Input, DatePicker,TimePicker, Modal, Checkbox } from 'antd'
import moment from 'moment';


const Option = Select.Option;

class CreateAnswer extends Component {

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
    editAnswerchange = (e) => {
        console.log(`checked = ${e.target.checked}`);
    }
    render () {
        return (
            <div>
                <Breadcrumb 
                    title={['答题管理','新建答题']} 
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
                            <span>答题类型：</span>
                            <Select placeholder="请选择"
                                style={{ width: 320 }} 
                                onChange={this.handleChange}
                            >
                                {this.state.likesTypeOption.map((v, i) => 
                                    <Option key={v.key} value={v.key}>{v.name}</Option>
                                )}
                            </Select>
                        </section>
                        <section className="item">
                            <i>*</i>
                            <span>题目数量：</span>
                            <Select placeholder="请选择"
                                style={{ width: 320 }} 
                                onChange={this.handleChange}
                            >
                                {this.state.likesTypeOption.map((v, i) => 
                                    <Option key={v.key} value={v.key}>{v.name}</Option>
                                )}
                            </Select>
                        </section>
                        <section className="item">
                            <i>*</i>
                            <span>答题数量：</span>
                            <Select placeholder="请选择"
                                style={{ width: 320 }} 
                                onChange={this.handleChange}
                            >
                                {this.state.likesTypeOption.map((v, i) => 
                                    <Option key={v.key} value={v.key}>{v.name}</Option>
                                )}
                            </Select>
                            <Button className="add-likes" type="primary">添加一个答题项</Button>
                        </section>
                    </div>
                    <MyTable setLikes={bol => this.setLikes(bol)} />
                    <Button className="submit-btn" type="primary">提交</Button>
                    <Button>取消</Button>
                    <Modal
                        title="编辑题目信息"
                        centered={true}
                        okText="确定"
                        cancelText="取消"
                        className="modal-wrap"
                        getContainer={() => document.querySelector('.create-like-wrap')}
                        visible={this.state.visible}
                        onOk={this.setLikesOk}
                        onCancel={this.setLikeCancel}
                        >
                        <div className="item">
                            <span className="item-title">请输入题目1</span>
                            <Input style={{ width: 180 }} size="small" placeholder="请输入题目" />
                        </div>
                        <div className="item">
                            <span className="item-title">请输入答案A</span>
                            <Input style={{ width: 180 }} size="small" placeholder="请输入答案" />
                            <Checkbox onChange={this.editAnswerchange}></Checkbox>
                            <span>(正确答案)</span>
                        </div>
                        <div className="item">
                            <span className="item-title">请输入答案B</span>
                            <Input style={{ width: 180 }} size="small" placeholder="请输入答案" />
                            <Checkbox onChange={this.editAnswerchange}></Checkbox>
                            <span>(正确答案)</span>
                        </div>
                        <div className="item">
                            <span className="item-title">请输入答案C</span>
                            <Input style={{ width: 180 }} size="small" placeholder="请输入答案" />
                            <Checkbox onChange={this.editAnswerchange}></Checkbox>
                            <span>(正确答案)</span>
                        </div>
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
            title: '题目',
            dataIndex: 'likesList'
        },
        {
            title: '选项',
            dataIndex: 'reallNum',
            render: (text) => (
                <ul className="answer-detail-wrap">
                    {text.map((item, i) => 
                        <li key={item.key}>
                            <span className="title">{`${item.key}.${item.content}`}</span>
                            <div>
                                <Checkbox onChange={editAnswerchange}></Checkbox>
                                <span className="isright">正确答案</span>
                            </div>
                        </li>
                    )}
                </ul>
            )
        },
        {
            title: '参与人数',
            dataIndex: 'vNum'
        },
        {
            title: '统计数据',
            dataIndex: 'allNum'
        },
        {
            title: '操作',
            dataIndex: '',
            render: (record) => <div>
                <Button className="set-likes" 
                    onClick={() => setLikes(record)} 
                    type="primary">编辑
                </Button>
                <Button type="danger">清空</Button>
            </div>
        }
    ]
    const data = [
        {
            num: 1,
            likesList: '请点击右侧编辑按钮输入题目',
            reallNum: [
                {
                    key: 'A',
                    content: '是永驻',
                    isRight: true
                },
                {
                    key: 'B',
                    content: 'yaoming',
                    isRight: false
                },
                {
                    key: 'C',
                    content: 'wo',
                    isRight: false
                }
            ],
            vNum: 0,
            allNum: 0
        }
    ]
    function setLikes (record) {
        props.setLikes(true);
    }
    function editAnswerchange (e) {

    }
    return (
        <Table columns={columns} dataSource={data} rowKey={record => record.num} /> 
    )
}

export default CreateAnswer