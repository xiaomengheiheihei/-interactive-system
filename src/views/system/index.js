import React, { Component } from 'react';
import Breadcrumb from '../components/breadcrumb/index.js'
import Retrieval from '../components/retrieval/index'
import { withRouter } from 'react-router-dom'
import MyList from '../components/list/index'
import { Divider, Button, Modal, Input, DatePicker, message, Upload, Icon } from 'antd'
import moment from 'moment';
import http from '../../utils/http'
import locale from 'antd/lib/date-picker/locale/zh_CN';
import '../leaveMessage/index.scss'


const { RangePicker } = DatePicker;

const option = [
    {
        name: '全部节目',
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

class SystemSetting extends Component {
    state = {
        visible: false,
        columns: [{
            title: '节目标识',
            dataIndex: 'iconUrl',
            render: (text) => <img style={imgStyle} src={text} alt="" />
        },{
            title: '节目名称',
            dataIndex: 'name',
        },{
            title: '创建时间',
            dataIndex: 'createTime',
        },{
            title: '创建人',
            dataIndex: 'createPerson',
        },{
            title: '播出时间',
            dataIndex: 'beginTime',
        },{
            title: '操作',
            dataIndex: '',
            key: 'op',
            render: (record) => <div>
                            <Button style={btnStyle} type="primary">编辑</Button>
                            <Button onClick={() => this.deleteItem(record)} type="danger">删除</Button>
                        </div>
        }],
        data: [],
        createProgramData: {
            beginTime: '',
            endTime: '',
            iconUrl: '',
            name: '',
        },
        uploadData: {
            name: 'file',
            action: '/upload',
            accept: 'image/jpeg, image/png, image/jpg',
            showUploadList: false
        }
    }
    componentDidMount () {
        this.getList()
    }
    getList () {
        http.get(`/program/list`, {})
        .then(res => {
            if (res.code === 200) {
                this.setState({data: res.data})
            } else {
                message.error(res.message)
            }
        })
        .catch (error => {
            message.error(`网络连接失败，请稍后重试！`)
        })
    }
    isCreateMessgeStart (bol) {
        this.setState({
            visible: bol
        })
    }
    deleteItem = (record) => {
        http.delete(`/program/delete`, {programId: record.id})
        .then(res => {
            if (res.code === 200) {
                message.success('删除成功！')
                this.getList()
            } else {
                message.error('删除失败，请稍后重试！')
            }
        }) 
        .catch(error => {
            message.error('网络连接失败，请稍后重试！')
        })
    }
    handleOk = () => {
        let params = new FormData()
        Object.keys(this.state.createProgramData).map((item, i) => {
            return params.append(item, this.state.createProgramData[item])
        })
        http.post('/program/add', params)
        .then(res => {
            if (res.code === 200) {
                message.success('新增节目成功！')
                this.getList()
                this.setState({visible: false})
            } else {
                message.error(res.message)
                this.setState({visible: false})
            }
        })
        .catch(error => {
            message.error(`网络连接失败，请稍后重试！`)
            this.setState({visible: false})
        })
    }
    handleCancel = () => {
        this.setState({
            visible: false
        })
    }
    gotoDetail =  (record) => {
        this.props.history.push(`/messageManage/MessageDetailList?messageId=${record.name}`);
    }
    selectDate = (value, dateString) => {
        this.setState((state, props) => {
            return state.createProgramData.beginTime = dateString[0]
        })
        this.setState((state, props) => {
            return state.createProgramData.endTime = dateString[1]
        })
    }
    uploadonChange = (info) => {
        if (info.file.status === 'done') {
            message.success(`${info.file.name} 图片上传成功！`);
            this.setState((state, props) => {
                return state.createProgramData.iconUrl = info.file.response.data;
            })
        } else if (info.file.status === 'error') {
            message.error(`${info.file.name} 图片上传失败!`);
        }
    }
    getName = (e) => {
        const { value } = e.target;
        this.setState((state, props) => {
            return state.createProgramData.name = value
        })
    }
    render () {
        return (
            <div className="leave-message-wrap">
                <Breadcrumb 
                    title={['系统设置']} 
                    btn="+ 添加节目" 
                    isCreateMessgeStart={bol => this.isCreateMessgeStart(bol)} 
                />
                <Retrieval option={option} searchPlaceholder="节目名称"/>
                <Divider />
                <Button className="deleting">批量删除</Button>
                <MyList columns={this.state.columns} data={this.state.data} />
                <Modal
                    title="添加节目"
                    centered={true}
                    okText="确定"
                    cancelText="取消"
                    getContainer={() => document.querySelector('.leave-message-wrap')}
                    visible={this.state.visible}
                    onOk={this.handleOk}
                    onCancel={this.handleCancel}
                >
                    <div className="create-item">
                        <span>节目标识：</span>
                        <Upload {...this.state.uploadData} onChange={this.uploadonChange}>
                            <Button>
                            <Icon type="upload" /> 添加图片
                            </Button>
                        </Upload>
                    </div>
                    <div className="create-item">
                        <span>节目名称：</span>
                        <Input type="text" onChange={this.getName} style={{width: '80%'}} placeholder="请输入节目名称" />
                    </div>
                    <div className="create-item">
                        <span>播出时间：</span>
                        <RangePicker
                            style={{width: '80%', marginRight: 0}}
                            locale={locale}
                            onChange={this.selectDate}
                            showTime={{
                                defaultValue: [moment('00:00:00', 'HH:mm:ss'), moment('12:00:00', 'HH:mm:ss')],
                            }}
                            format="YYYY-MM-DD HH:mm:ss"
                        />
                    </div>
                </Modal>
            </div>
        )
    }
}

export default withRouter(SystemSetting)