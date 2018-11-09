import React, { Component } from 'react';
import { Route, withRouter } from 'react-router-dom'
import myContentStyle from './content.module.scss'
import routers from '../../../config/router'
import Loading from '../loading/index'


class MyContent extends Component {
    render () {
        return (
            <div className={myContentStyle.wrap}>
                <Loading>
                    {routers.map((item, i) => 
                        <Route key={i} path={item.path} component={item.component} exact />
                    )}
                </Loading>
            </div>
        )
    }
}

export default withRouter(MyContent)