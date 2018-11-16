import React, { Component } from 'react';
import Breadcrumb from '../components/breadcrumb/index.js'
import './index_content.scss'
import { List, Radio, Select, Divider, Button } from 'antd'

const RadioGroup = Radio.Group;
const Option = Select.Option;
const listData = [
    'Racing car sprays burning fuel into crowd.',
    'Japanese princess to wed commoner.',
    'Australian walks 100km after outback crash.',
    'Man charged over missing wedding girl.',
    'Los Angeles battles huge wildfires.',
];

const codeImg = '';

function handleChange(value) {
    console.log(`selected ${value}`);
}

class IndedContent extends Component {

    state = {
        value: 1,
    }

    onChange = (e) => {
        console.log('radio checked', e.target.value);
        this.setState({
          value: e.target.value,
        });
    }

    render () {
        return (
            <div className="home_content_wrap">
                <Breadcrumb title={['首页']} />
                <section className="section1">
                    <div className="section1-item">
                        <h3 className="item-colo-1">粉丝总数</h3>
                        <span>10288239</span>
                    </div>
                    <div className="section1-item">
                        <h3 className="item-colo-2">昨日新增</h3>
                        <span>188232323</span>
                    </div>
                    <div className="section1-item">
                        <h3 className="item-colo-3">昨日取关</h3>
                        <span>19823</span>
                    </div>
                </section> 
                <section className="section2">
                <List
                    header={<div>系统公告</div>}
                    footer={<div>加载更多>></div>}
                    bordered
                    dataSource={listData}
                    renderItem={item => (<List.Item extra={<span>2018-10-29</span>}>{item}</List.Item>)}
                />
                </section>
                <section className="section3">
                    <div className="step-01">
                        <p>1. 获取直播流：</p>
                        <RadioGroup onChange={this.onChange} value={this.state.value}>
                            <Radio value={1}>有现成的直播流</Radio>
                            <Radio value={2}>没有直播流（自己推流）</Radio>
                        </RadioGroup>
                    </div>
                    <div className="step-02">
                        <p>2. 配置互动模块：</p>
                        <Select defaultValue="message" style={{ width: 120, marginRight: 20 }} onChange={handleChange}>
                            <Option value="message">留言管理</Option>
                            <Option value="like">点赞管理</Option>
                            <Option value="vote">投票管理</Option>
                            <Option value="answer">答题管理</Option>
                        </Select>
                        <Select defaultValue="lucy" style={{ width: 120 }} onChange={handleChange}>
                            <Option value="jack">Jack</Option>
                            <Option value="lucy">Lucy</Option>
                            <Option value="disabled" disabled>Disabled</Option>
                            <Option value="Yiminghe">yiminghe</Option>
                        </Select>
                    </div>
                </section>
                <Divider />
                <section className="section4 section3">
                    <div className="step-02">
                        <p>3. 预览效果：</p>
                        <div className="img-wrap">
                            {codeImg === '' ? 
                                <i className={'iconfont qn-interactive-zhanwei'}></i> 
                                : <img alt="" src={codeImg} />
                            }
                        </div>
                        <Button>生成预览二维码</Button>
                    </div>
                    <div className="step-02">
                        <p>4. 生成链接地址：</p>
                        <Button>生成链接地址</Button>
                    </div>
                </section>
            </div>
        )
    }
}

export default IndedContent