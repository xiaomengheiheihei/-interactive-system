import React, { Component } from 'react';
import './index.scss'
import { Breadcrumb, Button } from 'antd'


class MyBreadcrumb extends Component {

    createMessgeStart = () => {
        this.props.isCreateMessgeStart(true)
    }

    render () {
        return (
            <div className='MyBreadcrumb_wrap'>
                <Breadcrumb>
                    {this.props.title.map((item, i) => 
                        <Breadcrumb.Item key={i}>{item}</Breadcrumb.Item>
                    )}
                </Breadcrumb>
                {
                    this.props.btn && <Button onClick={this.createMessgeStart}>{this.props.btn}</Button>
                }
            </div>
        )
    }
}

export default MyBreadcrumb