import React, { Component } from 'react'
import { Divider } from 'antd'

class Logo extends Component {
    render () {
        const logoStyle = {
            float: 'left',
            paddingLeft: '20px',
            fontSize: '18px'
        }
        return (
            <div style={logoStyle}>七牛云<Divider type="vertical" /><span>中央电视台OJBK频道瞎鸡儿演</span></div>
        )
    }
}

export default Logo