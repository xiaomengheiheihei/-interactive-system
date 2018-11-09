import React, { Component } from 'react';
import { Layout } from 'antd';
import Menu from '../components/menu/menu'
import MyContent from '../components/content/content'
import Logo from '../components/header/logo/index'
import UserInfos from '../components/header/userInfos/index'

const { Header, Sider, Content } = Layout;


class Home extends Component {
    render () {
        return (
            <Layout>
                <Header style={{ background: 'rgb(102, 102, 102)', padding: 0, color: '#fff' }}>
                    <Logo />
                    <UserInfos />
                </Header>
                <Layout>
                    <Sider theme="light"><Menu /></Sider>
                    <Content><MyContent /></Content>
                </Layout>
            </Layout>
        )
    }
}

export default Home