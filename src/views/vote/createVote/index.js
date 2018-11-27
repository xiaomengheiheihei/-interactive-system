import React, { Component } from 'react'
import './index.scss'
import Breadcrumb from '../../components/breadcrumb/index.js'
import { Select, Table, Button, Input, DatePicker, Modal, message, Icon, Upload, Spin } from 'antd'
import locale from 'antd/lib/date-picker/locale/zh_CN'
import http from '../../../utils/http'
import { connect } from 'react-redux'
import * as PROGRAM_LIST_action from '../../../store/progarmList/action'
import { bindActionCreators } from 'redux'

const Option = Select.Option;
const confirm = Modal.confirm;
class CreateVote extends Component {

    state = {
        likesTypeOption: [
            {
                name: '文字列表形式',
                key: '1'
            },
            {
                name: '头像列表形式',
                key: '2'
            }
        ],
        likesTypeOption1: [
            {
                name: '每人每天1票',
                key: 1,
            },
            {
                name: '每人每天多票',
                key: 2
            },
            {
                name: '每人每天不限次数',
                key: 3
            }
        ],
        visible: false,
        createVoteData: {
            beginTime: '',
            endTime: '',
            id: '',
            name: '',
            type: '',
            voteRule: '',
            frequency: 2,
            itemNum: 1,
            realNum: 0,
            virtualNum: 0,
            sumNum: 0,
            index: '',
            img: '',
            title: '开心每一天'
        },
        voteList: [],
        currentItem: '',
        uploadData: {
            name: 'file',
            action: '/upload',
            accept: 'image/jpeg, image/png, image/jpg',
            showUploadList: false
        },
        loading: false
    }

    handleChange = (value) => {
        this.setState((state) => state.createVoteData.id = value)
        for (let item of this.props.Program_list) {
            if (item.id === value) {
                this.setState((state) => state.createVoteData.name = item.name)
                break;
            }
        }
    }
    changeVoteRule = (value) => {
        this.setState((state) => state.createVoteData.voteRule = value)
    }
    changeVoteType = (value) => {
        this.setState((state) => state.createVoteData.type = value)
    }
    selectBeginDate = (value, dateString) => {
        this.setState((state) => state.createVoteData.beginTime = dateString)
    }
    selectEndDate = (value, dateString) => {
        this.setState((state) => state.createVoteData.endTime = dateString)
    }
    addVote = () => {
        this.setState((state) => {
            state.createVoteData.index = new Date().getTime()
            return state.voteList.push(JSON.parse(JSON.stringify(state.createVoteData)))
        })
        this.setState(state => {state.currentItem = state.createVoteData})
    }
    setLikesOk = (e) => {
        let data = this.state.voteList.map((item, i) => 
            item.index === this.state.currentItem.index ? {...item, ...this.state.currentItem} : item
        )
        this.setState({
            visible: false,
            voteList: data
        })
    }
    getName = (e) => {
        const { value } = e.target
        this.setState((state) => {state.currentItem.title = value})
    }
    setVerVote = (e) => {
        const { value } = e.target
        let temp = {
            sumNum: value,
            virtualNum: value
        }
        let data = { ...this.state.currentItem, ...temp}
        this.setState((state) => {state.currentItem = data})
    }
    uploadonChange = (info) => {
        this.setState({
            loading: true
        })
        if (info.file.status === 'done') {
            message.success(`${info.file.name} 图片上传成功！`);
            this.setState((state) => {state.currentItem.img = info.file.response.data})
            this.setState({
                loading: false
            })
        } else if (info.file.status === 'error') {
            message.error(`${info.file.name} 图片上传失败!`);
            this.setState({
                loading: false
            })
        }
    }
    setLikeCancel = (e) => {
        let temp = {
            sumNum: 0,
            virtualNum: 0,
            title: '投票',
            img: ''
        }
        let data = { ...this.state.currentItem, ...temp}
        this.setState((state) => {state.currentItem = data})
        this.setState({
            visible: false,
        });
    }
    setLikes = (bol, record) => {
        this.setState(state => {state.currentItem = record})
        this.setState({
            visible: bol
        })
    }
    removeLikes = (record) => {
        let arr = [...this.state.voteList]
        for (let i = 0; i < arr.length; i++) {
            if (arr[i].index === record.index) {
                arr.splice(i, 1)
            }
        }
        this.setState({
            voteList: arr
        })
    }
    voteNumchange = (e) => {
        const { value } = e.target
        this.setState((state) => state.createVoteData.frequency = Number(value))
    } 
    voteproNumchange = (e) => {
        const { value } = e.target
        this.setState((state) => state.createVoteData.itemNum = Number(value))
    }
    submitLikes = () => {
        console.log(this.state.voteList);
        const params = {
            beginTime: '',
            endTime: '',
            programId: '',
            type: '',
            itemsPerPerson: '',
            userAccount: JSON.parse(localStorage.getItem('userInfo')).name,
            userId: parseInt(JSON.parse(localStorage.getItem('userInfo')).id),
            votesPerPerson: '',
            voteItemList: [
                // {
                //     name: '',
                //     imageUrl: '',
                //     virtualNum: ''
                // }
            ]
        }
        // let voteArr = []
        // for (let item of this.state.voteList) {
        //     params.beginTime = item.beginTime;
        //     params.endTime = item.endTime;
        //     params.programId = item.id
        //     params.type = item.type
        //     params.itemsPerPerson = item.itemNum
        //     params.votesPerPerson = item.frequency
        //     for (let value of params.voteItemList) {
        //         value.name = item.title;
        //         value.imageUrl = item.img;
        //         value.virtualNum = parseInt(item.virtualNum)
        //     }
        //     voteArr.push(params);
        // }
        for (let item of this.state.voteList) {
            params.beginTime = this.state.voteList[this.state.voteList.length-1].beginTime;
            params.endTime = this.state.voteList[this.state.voteList.length-1].endTime;
            params.programId = this.state.voteList[this.state.voteList.length-1].id
            params.type = this.state.voteList[this.state.voteList.length-1].type
            params.itemsPerPerson = this.state.voteList[this.state.voteList.length-1].itemNum
            params.votesPerPerson = this.state.voteList[this.state.voteList.length-1].frequency
            let obj = {
                name: '',
                imageUrl: '',
                virtualNum: ''
            }
            obj.name = item.title;
            obj.imageUrl = item.img;
            obj.virtualNum = parseInt(item.virtualNum)
            params.voteItemList.push(obj);
        }
        http.post(`/voteProgram/add`, params)
        .then(res => {
            if (res.code === 200) {
                message.success(`添加成功！`)
            } else {
                message.error(res.message)
            }
        })
        .catch(error => {
            message.error('网络链接失败，请稍后重试！')
        })
    }
    cancelSubmit = () => {
        let _this = this
        confirm({
            title: '温馨提示',
            content: '本次操作数据没有保存，确定要取消吗？',
            okText: '确认',
            cancelText: '取消',
            onOk() {
              return new Promise((resolve, reject) => {
                setTimeout(() => {
                    _this.setState({
                        voteList: []
                    })
                    resolve()
                }, 1000);
              }).catch(() => '');
            },
            onCancel() {},
        });
    }
    render () {
        return (
            <div>
                <Breadcrumb 
                    title={['投票管理','新建投票']} 
                />
                <div className="create-like-wrap">
                    <div className="create-like-top">
                        <section className="item">
                            <i>*</i>
                            <span>节目名称：</span>
                            <Select placeholder="请选择"
                                style={{ width: 320 }} 
                                onChange={this.handleChange}
                            >
                                {this.props.Program_list && this.props.Program_list.map((v, i) => 
                                    <Option key={v.id} value={v.id}>{v.name}</Option>
                                )}
                            </Select>
                        </section>
                        <section className="item">
                            <i>*</i>
                            <span>开始时间：</span>
                            <DatePicker
                                style={{width: 320, marginRight: 0}}
                                showTime
                                locale={locale}
                                format="YYYY-MM-DD HH:mm:ss"
                                placeholder="选择开始时间"
                                onChange={this.selectBeginDate}
                            />
                        </section>
                        <section className="item">
                            <i>*</i>
                            <span>结束时间：</span>
                            <DatePicker
                                style={{width: 320, marginRight: 0}}
                                showTime
                                locale={locale}
                                format="YYYY-MM-DD HH:mm:ss"
                                placeholder="选择结束时间"
                                onChange={this.selectEndDate}
                            />
                        </section>
                        <section className="item">
                            <i>*</i>
                            <span>投票方式：</span>
                            <Select placeholder="请选择"
                                style={{ width: 320 }} 
                                onChange={this.changeVoteType}
                            >
                                {this.state.likesTypeOption.map((v, i) => 
                                    <Option key={v.key} value={v.key}>{v.name}</Option>
                                )}
                            </Select>
                        </section>
                        <section className="item">
                            <i>*</i>
                            <span>投票规则：</span>
                            <Select placeholder="请选择"
                                style={{ width: 320 }} 
                                onChange={this.changeVoteRule}
                            >
                                {this.state.likesTypeOption1.map((v, i) => 
                                    <Option key={v.key} value={v.key}>{v.name}</Option>
                                )}
                            </Select>
                            <span className="vote-num">每人每天限投 <Input 
                                value={this.state.createVoteData.frequency} 
                                style={{ width: 30 }} 
                                onChange={this.voteNumchange}
                                size="small" /> 次</span>
                            <span className="vote-num votepro-num">每人每天限投 <Input 
                                value={this.state.createVoteData.itemNum} 
                                style={{ width: 30 }} 
                                onChange={this.voteproNumchange}
                                size="small" /> 项</span>
                            <Button onClick={this.addVote} className="add-likes" type="primary">添加一个投票项</Button>
                        </section>
                    </div>
                    <MyTable 
                        data={this.state.voteList} 
                        setLikes={(bol, record )=> this.setLikes(bol, record)}
                        removeLikes={record => this.removeLikes(record)} />
                    <Button onClick={this.submitLikes} className="submit-btn" type="primary">提交</Button>
                    <Button onClick={this.cancelSubmit}>取消</Button>
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
                        <Spin spinning={this.state.loading}>
                         <div className="create-item">
                            <span>投票项名称：</span>
                            <Input 
                                type="text" 
                                onChange={this.getName} 
                                style={{width: '70%'}} 
                                placeholder="请输入名称" 
                            />
                        </div>
                        <div className="create-item">
                            <span>节目标识：</span>
                            <Upload 
                                {...this.state.uploadData} 
                                disabled={this.state.currentItem.type === 1 ? true : false}
                                onChange={this.uploadonChange}>
                                <Button>
                                <Icon type="upload" /> 添加图片
                                </Button>
                            </Upload>
                            <span style={{display: 'block'}} className="tips">(如果投票是文字列表，则不需要添加图片)</span>
                        </div>
                        <div className="create-item">
                            <span>虚拟投票数量：</span>
                            <Input 
                                type="number" 
                                style={{ width: '70%' }} 
                                onChange={this.setVerVote} 
                                placeholder="请输入" 
                            /> <span className="tips">(虚拟投票数在项目结束之前可以随时修改)</span>
                        </div>
                        </Spin>
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
            dataIndex: '',
            render: (text, record, index) => <p>{++index}</p>
        },
        {
            title: '投票项',
            dataIndex: 'title'
        },
        {
            title: '图片',
            dataIndex: 'img',
            render: (text) => {
                return text === '' ? 
                <i style={{fontSize: 25, verticalAlign: 'middle'}} className={'iconfont qn-interactive-zhanwei'}></i> :
                <img style={{width: 50, height: 50}} src={text} alt="" />
            }
        },
        {
            title: '真实票数',
            dataIndex: 'realNum'
        },
        {
            title: '虚拟票数',
            dataIndex: 'virtualNum'
        },
        {
            title: '总票数',
            dataIndex: 'sumNum'
        },
        {
            title: '操作',
            dataIndex: '',
            render: (record) => <div>
                <Button className="set-likes" 
                    onClick={() => setLikes(record)} 
                    type="primary">编辑
                </Button>
                <Button onClick={() => removeLikes(record)} type="danger">移除</Button>
            </div>
        }
    ]
    function setLikes (record) {
        props.setLikes(true, record);
    }

    function removeLikes (record) {
        confirm({
            title: '温馨提示',
            content: '投票数据将不再保留，确定要移除这一行吗？',
            okText: '确认',
            cancelText: '取消',
            onOk() {
              return new Promise((resolve, reject) => {
                setTimeout(() => {
                    props.removeLikes(record)
                    resolve()
                }, 1000);
              }).catch(() => '');
            },
            onCancel() {},
        });
    }

    return (
        <Table columns={columns} dataSource={props.data} rowKey={record => record.index} /> 
    )
}

CreateVote = connect(
    state => ({ ...state.PROGRAM_LIST }),
    dispatch => bindActionCreators({...PROGRAM_LIST_action}, dispatch)
) (CreateVote)

export default CreateVote