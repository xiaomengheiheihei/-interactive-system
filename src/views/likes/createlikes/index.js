import React, { Component } from 'react'
import './index.scss'
import Breadcrumb from '../../components/breadcrumb/index.js'
import { Select, Table, Button, Input, DatePicker, Modal, message, Upload, Icon, Spin } from 'antd'
import locale from 'antd/lib/date-picker/locale/zh_CN'
import * as PROGRAM_LIST_action from '../../../store/progarmList/action'
import { bindActionCreators } from 'redux'
import http from '../../../utils/http'
import { connect } from 'react-redux'

const Option = Select.Option;
const confirm = Modal.confirm;

const createLikes = {
    id: '',
    name: '',
    title: '开开心心',
    index: '',
    img: '',
    beginTime: '',
    endTime: '',
    type: '',
    realNum: 0,
    sumNum: 0,
    virtualNum: 0,
}

class CreateLikes extends Component {

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
        visible: false,
        likesList: [],
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
        createLikes.id = value
    }
    typeHandleChange = (value) => {
        createLikes.type = value
    }
    setVerLikes = (e) => {
        const { value } = e.target
        let temp = {
            sumNum: value,
            virtualNum: value
        }
        let data = { ...this.state.currentItem, ...temp}
        this.setState((state) => {state.currentItem = data})
    }
    setLikesOk = (e) => {
        let data = this.state.likesList.map((item, i) => 
            item.index === this.state.currentItem.index ? {...item, ...this.state.currentItem} : item
        )
        this.setState({
            visible: false,
            likesList: data
        })
    }
    selectBeginDate = (value, dateString) => {
        createLikes.beginTime = dateString
    }
    selectEndDate = (value, dateString) => {
        createLikes.endTime = dateString
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
        this.setState({
            visible: bol,
        })
        this.setState(state => {state.currentItem = record})
    }
    removeLikes = (record) => {
        let arr = [...this.state.likesList]
        for (let i = 0; i < arr.length; i++) {
            if (arr[i].index === record.index) {
                arr.splice(i, 1)
            }
        }
        this.setState({
            likesList: arr
        })
    }
    addLikes = () => {
        for (let key in createLikes) {
            switch (key) {
                case 'id':
                    if (createLikes[key] === '') {
                        message.error(`请填写节目名称`) 
                        return;
                    }
                    break;
                case 'beginTime':
                    if (createLikes[key] === '') {
                        message.error(`请选择开始时间`)  
                        return;
                    }
                    break;
                case 'endTime':
                    if (createLikes[key] === '') {
                        message.error(`请选择结束时间`)
                        return;
                    }
                    break;
                case 'type':
                    if (createLikes[key] === '') {
                        message.error(`请选择点赞形式`)
                        return;
                    }
                    break;
                default:
                    break;
            }
            if(key === 'name') {
                createLikes.name = this.props.Program_list.find(i => i.id === createLikes.id).name
            }
        }
        createLikes.index = new Date().getTime()
        this.setState((state) => state.likesList.push(JSON.parse(JSON.stringify(createLikes))))
        this.setState(state => {state.currentItem = createLikes})
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
                        likesList: []
                    })
                    resolve()
                }, 1000);
              }).catch(() => '');
            },
            onCancel() {},
        });
    }
    submitLikes = () => {
        console.log(this.state.likesList)
        const params = {
            beginTime: '',
            endTime: '',
            programId: '',
            type: '',
            thumbsItemList: []
        }
        // let likeArr = []
        // for (let item of this.state.likesList) {
        //     params.beginTime = item.beginTime;
        //     params.endTime = item.endTime;
        //     params.programId = item.id
        //     params.type = item.type
        //     for (let value of params.thumbsItemList) {
        //         value.name = item.title;
        //         value.imageUrl = item.img;
        //         value.virtualNum = item.virtualNum;
        //     }
        //     likeArr.push(params);
        // }
        params.beginTime = this.state.likesList[this.state.likesList.length-1].beginTime;
        params.endTime = this.state.likesList[this.state.likesList.length-1].endTime;
        params.programId = this.state.likesList[this.state.likesList.length-1].id
        params.type = this.state.likesList[this.state.likesList.length-1].type
        for (let item of this.state.likesList) {
            let obj = {
                name: '',
                imageUrl: '',
                virtualNum: ''
            }
            obj.name = item.title;
            obj.imageUrl = item.img;
            obj.virtualNum = item.virtualNum;
            params.thumbsItemList.push(obj);
        }
        
        http.post(`/thumbsProgram/add`, params)
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
    getName = (e) => {
        const { value } = e.target
        this.setState((state) => {state.currentItem.title = value})
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
                            <span>点赞形式：</span>
                            <Select placeholder="请选择"
                                style={{ width: 320 }} 
                                onChange={this.typeHandleChange}
                            >
                                {this.state.likesTypeOption.map((v, i) => 
                                    <Option key={v.key} value={v.key}>{v.name}</Option>
                                )}
                            </Select>
                            <Button onClick={this.addLikes} className="add-likes" type="primary">添加一个点赞项</Button>
                        </section>
                    </div>
                    <MyTable 
                        setLikes={(bol, record) => this.setLikes(bol, record)} 
                        removeLikes={record => this.removeLikes(record)}
                        likesList={this.state.likesList} />
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
                            <span>点赞项名称：</span>
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
                            <span style={{display: 'block'}} className="tips">(如果点赞是文字列表，则不需要添加图片)</span>
                        </div>
                        <div className="create-item">
                            <span>虚拟点赞数量：</span>
                            <Input 
                                type="number" 
                                style={{ width: '70%' }} 
                                onChange={this.setVerLikes} 
                                placeholder="请输入" 
                            /> <span className="tips">(虚拟点赞数在项目结束之前可以随时修改)</span>
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
            title: '点赞项',
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
            title: '真实点赞数',
            dataIndex: 'realNum'
        },
        {
            title: '虚拟点赞数',
            dataIndex: 'virtualNum'
        },
        {
            title: '总点赞数',
            dataIndex: 'sumNum'
        },
        {
            title: '操作',
            dataIndex: '',
            render: (record) => <div>
                <Button className="set-likes" 
                    onClick={() => setLikes(record)} 
                    type="primary">设置虚拟数
                </Button>
                <Button onClick={() => removeLikes(record)}  type="danger">移除</Button>
            </div>
        }
    ]
    function setLikes (record) {
        props.setLikes(true, record);
    }
    function removeLikes (record) {
        confirm({
            title: '温馨提示',
            content: '点赞数据将不再保留，确定要移除这一行吗？',
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
        <Table columns={columns} dataSource={props.likesList} rowKey={record => record.index} /> 
    )
}


CreateLikes = connect(
    state => ({ ...state.PROGRAM_LIST }),
    dispatch => bindActionCreators({...PROGRAM_LIST_action}, dispatch)
) (CreateLikes)

export default CreateLikes