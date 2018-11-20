import React, { Component } from 'react';
import { Layout } from 'antd';
import Menu from '../components/menu/menu'
import MyContent from '../components/content/content'
import Logo from '../components/header/logo/index'
import UserInfos from '../components/header/userInfos/index'
import * as ROOT_action from '../../store/root/action'
import { bindActionCreators } from 'redux'
import { connect } from 'react-redux';

const { Header, Sider, Content } = Layout;


class Home extends Component {
    render () {
        return (
            <Layout style={{ minHeight: '100vh' }}>
                <Header style={{ background: 'rgb(102, 102, 102)', padding: 0, color: '#fff' }}>
                    <Logo />
                    <UserInfos />
                </Header>
                <Layout>
                    <Sider theme="light" collapsed={this.props.ROOT_menuCollapsed}><Menu /></Sider>
                    <Content><MyContent /></Content>
                </Layout>
            </Layout>
        )
    }
}

Home = connect(
    state => ({ ...state.ROOT }),
    dispatch => bindActionCreators({...ROOT_action}, dispatch)
) (Home)

export default Home