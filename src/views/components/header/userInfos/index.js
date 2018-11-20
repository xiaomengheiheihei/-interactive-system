import React, { Component } from 'react'
import userInfo from './userInfos.module.scss'
import http from '../../../../utils/http'
import { Drawer, message } from 'antd'
import * as ROOT_action from '../../../../store/root/action'
import { bindActionCreators } from 'redux'
import { connect } from 'react-redux';

const username = JSON.parse(localStorage.getItem('userInfo')).name

class UserInfos extends Component {

    state = {
        visible: false,
        programList: []
    }

    componentDidMount () {
        http.get(`/program/list`, {})
        .then(res => {
            if (res.code === 200) {
                this.setState({
                    programList: res.data
                })
            }
        })
        .catch(error => {
            message.error(`网络连接失败，请稍后重试！`)
        })
    }

    showDrawer = () => {
        this.setState({
          visible: true,
        });
    }
    
    onClose = () => {
        this.setState({
          visible: false,
        })
    }

    shrinkMenu = () => {
        this.props.ROOT_ChangeMenuCollapsed(!this.props.ROOT_menuCollapsed)
    }

    render () {
        return (
            <div className={userInfo.wrap}>
                <div className={userInfo.programList} onClick={this.showDrawer}>
                    节目列表
                    <span className={userInfo.icon}><i className={'iconfont qn-interactive-sort-down'}></i></span>
                </div>
                <span className={userInfo.message}>
                    <i className={'iconfont qn-interactive-xinxi'}></i>
                </span>
                <div className={userInfo.username}>
                    {'你好，' + username}
                </div>
                <span className={userInfo.menuIcon} onClick={this.shrinkMenu}>
                    <i className={'iconfont qn-interactive-caidansandaogang'}></i>
                </span>
                <Drawer
                    title="节目列表"
                    placement="right"
                    closable={false}
                    onClose={this.onClose}
                    visible={this.state.visible}
                >
                    {
                        this.state.programList.map((item, i) => 
                            <p key={item.id}>{item.name}</p>
                        )
                    }
                </Drawer>
            </div>
        )
    }
}
UserInfos = connect(
    state => ({ ...state.ROOT }),
    dispatch => bindActionCreators({...ROOT_action}, dispatch)
) (UserInfos)

export default UserInfos