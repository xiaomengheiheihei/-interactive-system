import React, { Component } from 'react';
import { Menu } from 'antd';
import { withRouter } from 'react-router-dom'
import menuConfig from '../../../config/slider'
import './menu.css'


const SubMenu = Menu.SubMenu;

class MyMenu extends Component {  
    state = {
        keys: []
    }
    selectKey = () =>{
        let keys = []
        if ((menuConfig.find(i => i.key === this.props.history.location.pathname)) === undefined) {
            keys.push('/' + this.props.history.location.pathname.split('/')[1])
            this.setState({keys:keys})
            return
        }
        keys.push(this.props.history.location.pathname)
        this.setState({keys:keys})
    }
    componentWillMount() {
        this.selectKey()
    }
    onSelect = ({ key }) =>{
        this.props.history.push(key)
    }
    componentWillReceiveProps (nextProps){
        if (this.props.location.pathname !== nextProps.location.pathname) {
            this.selectKey()
        }
    }
    render() {
        const menuIcon = {
            marginRight: '20px'
        }
        const menuItem = {
            height: '50px',
            lineHeight: '50px'
        }
        return (
            <div className={'menu-wrap'}>
                <Menu mode="inline" onSelect={this.onSelect} selectedKeys={this.state.keys}>
                    {  
                        menuConfig.map((item, i) => 
                            item.list && item.list.length > 0 ?
                            <SubMenu  key={item.key} title={<span><i style={menuIcon} className={'iconfont qn-interactive-' + item.icon}></i><span>{item.title}</span></span>}>
                                {item.list.map((listItem,ii)=>
                                    <Menu.Item key={item.key+listItem.key}>
                                        <span>{listItem.title}</span>
                                    </Menu.Item>
                                )}
                            </SubMenu>
                            :
                            <Menu.Item style={menuItem} key={item.key}>
                                <i style={menuIcon} className={'iconfont qn-interactive-' + item.icon}></i>
                                <span>{item.title}</span>
                            </Menu.Item>
                        )
                    }
                </Menu>
            </div>
        )
    }
}

export default withRouter(MyMenu)