import React, { Component } from 'react';
import { Route, withRouter, Switch } from 'react-router-dom'
import myContentStyle from './content.module.scss'
import routers from '../../../config/router'
import Loading from '../loading/index'


// function RouteWithSubRoutes(route) {
//     return (
//     <Route
//     path={route.path}
//     render={props => (
//         // pass the sub-routes down to keep nesting
//         <route.component {...props} routes={route.routes} />
//     )}
//     />
// );
// }

class MyContent extends Component {
    render () {
        return (
            <div className={myContentStyle.wrap}>
                <Loading>
                    <Switch>
                    {routers.map((item, i) => 
                        <Route key={i} 
                            path={item.path} 
                            component={item.component} 
                            exact
                        /> 
                    )}
                    </Switch>
                </Loading>
            </div>
        )
    }
}

export default withRouter(MyContent)