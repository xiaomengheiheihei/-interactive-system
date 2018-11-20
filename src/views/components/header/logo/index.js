import React, { Component } from 'react'
import { Divider, message } from 'antd'
import http from '../../../../utils/http'

class Logo extends Component {

    state = {
        title: ''
    }

    componentDidMount () {
        http.get(`/channel/detail/${JSON.parse(localStorage.getItem('userInfo')).id}`, {})
        .then(res => {
            if (res.code === 200) {
                this.setState({
                    title: res.data.name
                })
            }
        })
        .catch(error => {
            message.error(); 
        })
    }

    render () {
        const logoStyle = {
            float: 'left',
            paddingLeft: '20px',
            fontSize: '18px'
        }
        return (
            <div style={logoStyle}>七牛云<Divider type="vertical" /><span>{this.state.title}</span></div>
        )
    }
}

export default Logo