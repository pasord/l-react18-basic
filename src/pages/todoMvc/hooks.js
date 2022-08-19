import { Input, Table, Space, Popconfirm } from 'antd';
import axios from 'axios';
import React, {useEffect, useState} from 'react';
import './index.css'
import noUseWindowScroll, {useLocalStorage, useWindowScroll} from '../../hooks';

const { Search } = Input

let count = 0

function TodoMvcHooks () {
    const [list, setList] = useState([])
    // const [y, setY] = useState(0)
    const [query, setQuery] = useLocalStorage('query' + count++, '')
    const [y] = useWindowScroll()

    console.log('---TodoMvcHooks');

    console.log('---scroll-y', y)
    // console.log('---no', noUseWindowScroll.getY());


    const loadList = async () => {
        const res = await axios.get(`http://localhost:3001/data`)
        setList(res.data)
    }

    const onSearch = async (value) => {
        console.log('---Search', value);
        setQuery(value)
        const res = await axios.get(`http://localhost:3001/data?q=${value}`)
        setList(res.data)
        console.log('---query', query);
    }

    const handleDelete = async(id) => {
        await axios.delete(`http://localhost:3001/data/${id}`)
        loadList()
    }

    useEffect(()=> {
        console.log('---useEffect');
        loadList()
    }, [])

    // useEffect(() => {
    //     console.log('---scroll');
    //     window.addEventListener('scroll', () => {
    //       const h = document.documentElement.scrollTop
    //       setY(h)
    //     })
    // }, [])

    const columns = [
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
                        onConfirm={() => handleDelete(record.id)}
                    >
                        <button>删除</button>
                    </Popconfirm>
                </Space>
            )
        }
    ]

    return (
        <div className='container'>
            <div className='search-box'>
                <Search
                    placeholder='请输入关键词'
                    allowClear
                    enterButton="搜索"
                    size='large'
                    onSearch={onSearch}
                />
            </div>

            <Table 
                bordered
                rowKey="id"
                dataSource={list}
                columns={columns}
                pagination={false}
            />
        </div>
    )
}

export default TodoMvcHooks