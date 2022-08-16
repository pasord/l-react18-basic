import { Input, Table, Space, Popconfirm } from 'antd';
import axios from 'axios';
import React from 'react';
import './index.css'

const { Search } = Input

class TodoMvc extends React.Component {
    state = {
        keyword: '',
        list: [],

        columns: [
            {
                title: '任务编号',
                dataIndex: 'id',
                key: 'id'
            },
            {
                title: '任务名称',
                dataIndex: 'name',
                key: 'name'
            },
            {
                title: '任务描述',
                dataIndex: 'des',
                key: 'des'
            },
            {
                title: '操作',
                dataIndex: 'do',
                key: 'do',
                render: (text, record) => (
                    <Space size="middle">
                        <Popconfirm 
                            title="确认要删除吗" 
                            onConfirm={() => this.handleDelete(record.id)}
                        >
                            {/* <a href='javascript:void(0);'>删除</a> */}
                        </Popconfirm>
                    </Space>
                )
            }
        ]
    }

    onSearch = async (value) => {
        const res = await axios.get(`http://localhost:3001/data?q=${value}`)
        this.setState({
            list: res.data
        })
    }

    handleDelete = async(id) => {
        await axios.delete(`http://localhost:3001/data/${id}`)
        this.loadList()
    }

    inputChange = (e) => {
        this.setState({
            keyword: e.target.value
        })
    }

    loadList = async () => {
        const res = await axios.get(`http://localhost:3001/data`)
        this.setState({
            list: res.data
        })
    }

    componentDidMount () {
        this.loadList()
    }

    render () {
        return (
            <div className='container'>
                <div className='search-box'>
                    <Search
                        placeholder='请输入关键词'
                        allowClear
                        enterButton="搜索"
                        size='large'
                        value={this.state.keyword}
                        onChange={this.inputChange}
                        onSearch={this.onSearch}
                    />
                </div>

                <Table 
                    bordered
                    rowKey="id"
                    dataSource={this.state.list}
                    columns={this.state.columns}
                    pagination={false}
                />
            </div>
        )
    }
}

export default TodoMvc