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
                <Select defaultValue="all" style={{ width: 120, marginRight: 20 }} onChange={handleChange}>
                    {this.renderOptions()}
                </Select>
                {
                    this.props.option1 && 
                    <Select defaultValue="default" style={{ width: 120, marginRight: '20px' }} onChange={handleChange}>
                        {this.props.option1.map((v, i) => 
                            <Option key={v.key} value={v.key}>{v.name}</Option>
                        )}
                    </Select>
                }
                {
                    this.props.option2 && 
                    <Select defaultValue="init" style={{ width: 120 }} onChange={handleChange}>
                        {this.props.option2.map((v, i) => 
                            <Option key={v.key} value={v.key}>{v.name}</Option>
                        )}
                    </Select>
                }
                <Search
                    placeholder={this.props.searchPlaceholder}
                    onSearch={value => console.log(value)}
                    style={{ width: 260 }}
                />
                <Button>搜索</Button>
            </div>
        )
    }
}

export default Retrieval
