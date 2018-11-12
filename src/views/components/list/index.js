import React, { Component } from 'react'
import { Table } from 'antd'

class MyList extends Component {
    state = {
        selectedRowKeys: [], // Check here to configure the default column
    };


    onSelectChange = (selectedRowKeys) => {
        console.log('selectedRowKeys changed: ', selectedRowKeys);
        this.setState({ selectedRowKeys });
    }
    render () {
        const { selectedRowKeys } = this.state;
        const rowSelection = {
            selectedRowKeys,
            onChange: this.onSelectChange,
        };
        return (
            <div className="my-list-wrap">
                <Table 
                    rowSelection={rowSelection} 
                    columns={this.props.columns} 
                    rowKey={record => record.marking}
                    dataSource={this.props.data} 
                />
            </div>
        )
    }
}

export default MyList