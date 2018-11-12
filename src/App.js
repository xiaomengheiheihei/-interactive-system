import React, { Component } from 'react';
import 'reset-css';
import '../node_modules/antd/dist/antd.css';
import { BrowserRouter} from 'react-router-dom';
import Routers from './routers';
import { Provider } from 'react-redux'
import { loadStyle } from './utils/util'
import store from './store/index'

loadStyle('//at.alicdn.com/t/font_910901_5czi85akjq.css')

class App extends Component {
    render() {
        return (
            <Provider store={store}>
                <BrowserRouter>
                    <Routers />
                </BrowserRouter>
            </Provider>
        );
    }
}

export default App;
