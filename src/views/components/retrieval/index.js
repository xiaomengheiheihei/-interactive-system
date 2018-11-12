import React, { Component } from 'react';
import { Button, Select, Input } from 'antd'
import './index.scss'

const Option = Select.Option;
const Search = Input.Search;


function handleChange(value) {
    console.log(`selected ${value}`);
}

class Retrieval extends Component {

    
    renderOptions () {
        return this.props.option.map((v, i) => 
            <Option key={v.key} value={v.key}>{v.name}</Option>
        )
    }
    render () {
        return (
            <div className="retrieval-wrap">
                <Select defaultValue="lucy" style={{ width: 120 }} onChange={handleChange}>
                    {this.renderOptions()}
                </Select>
                <Search
                    placeholder="节目名称"
                    onSearch={value => console.log(value)}
                    style={{ width: 200 }}
                />
                <Button>搜索</Button>
            </div>
        )
    }
}

export default Retrieval
