import React, { Component } from 'react'
import { Table } from 'antd'

const pagination = {
    showQuickJumper: true,
    showSizeChanger: true
}

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
                    pagination={pagination} 
                    rowKey={record => record.id}
                    dataSource={this.props.data} 
                />
            </div>
        )
    }
}

export default MyList