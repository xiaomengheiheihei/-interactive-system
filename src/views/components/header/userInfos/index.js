import React, { Component } from 'react'
import userInfo from './userInfos.module.scss';

const username = '丁冲';

class UserInfos extends Component {
    render () {
        return (
            <div className={userInfo.wrap}>
                <div className={userInfo.programList}>
                    节目列表
                    <span className={userInfo.icon}><i className={'iconfont qn-interactive-sort-down'}></i></span>
                </div>
                <span className={userInfo.message}>
                    <i className={'iconfont qn-interactive-xinxi'}></i>
                </span>
                <div className={userInfo.username}>
                    {'你好，' + username}
                </div>
                <span className={userInfo.menuIcon}>
                    <i className={'iconfont qn-interactive-caidansandaogang'}></i>
                </span>
            </div>
        )
    }
}

export default UserInfos