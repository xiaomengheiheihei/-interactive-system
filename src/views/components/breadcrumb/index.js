import React, { Component } from 'react';
import './index.scss'
import { Breadcrumb, Button } from 'antd'


class MyBreadcrumb extends Component {
    render () {
        return (
            <div className='MyBreadcrumb_wrap'>
                <Breadcrumb>
                    <Breadcrumb.Item>{this.props.title}</Breadcrumb.Item>
                </Breadcrumb>
                {
                    this.props.btn && <Button>{this.props.btn}</Button>
                }
            </div>
        )
    }
}

export default MyBreadcrumb