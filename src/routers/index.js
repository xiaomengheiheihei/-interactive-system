import React, { Component } from 'react';
import {Route, Switch, withRouter} from 'react-router-dom';
import IndexBox from '../views/index';
import Login from '../views/login';
import Cookies from 'js-cookie';
// import store from '../store';

class Routers extends Component {
    constructor(props) {
        super(props)
        this.pathname = this.props.location.pathname;
    }
    checkLogin = () => {   
        if(this.props.location.pathname !== '/login') {
            if (!Cookies.get('Authorization')) {
                this.props.history.replace('/login');
            }
        } else {
            if (Cookies.get('Authorization')) {
                this.props.history.replace('/index');
            }
        }
    }
    componentWillMount () {
        if (this.pathname === '/') {
            if (Cookies.get('Authorization')) {
                this.props.history.replace('/index');
            } else {
                this.props.history.replace('/login');
            }
        } else {
            this.checkLogin();
        }
    }
    componentWillReceiveProps (){
        this.checkLogin()
    }
    render () {
        return (
            <Switch>
                <Route path="/login" component={Login}/>
                <Route path='/' component={IndexBox}/>
            </Switch>
        )
    }
}

export default withRouter(Routers)
