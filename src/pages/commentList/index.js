/**
 * 增删改、样式切换等
*/

import './index.css';
import avatar from '../../assets/images/avatar.png';
import React from 'react';
import { v4 as uuid } from 'uuid';

// 时间格式化
function formDate(time) {
    return `${time.getFullYear()}-${time.getMonth()}-${time.getDate()}`
}

class CommentList extends React.Component {
    state = {
        // hot: 热度排序  time: 时间排序
        tabs: [
            {
                id: 1,
                name: '热度',
                type: 'hot'
            },
            {
                id: 2,
                name: '时间',
                type: 'time'
            }
        ],

        active: 'hot',

        list: [
            {
                id: 1,
                author: '梅西',
                comment: '我踢的还不错吧',
                time: new Date('2021-09-09 09:09:09'),
                attitude: 1 // 1: 点赞 0：无态度 -1:踩
            },
            {
                id: 2,
                author: '内马尔',
                comment: '不错不错',
                time: new Date('2021-08-08 08:08:08'),
                attitude: 0 // 1: 点赞 0：无态度 -1:踩
            },
            {
                id: 3,
                author: '拉莫斯',
                comment: '诶呦 不错哦',
                time: new Date('2021-07-07 07:07:07'),
                attitude: -1 // 1: 点赞 0：无态度 -1:踩
            },
        ],

        commentVal: '',
    }

    // 可直接作为事件函数  public class fields 语法
    switchTab = (type) => {
        console.log('123');
        this.setState({
            active: type
        })
    }

    // 输入
    textareChange = (e) => {
        this.setState({
            commentVal: e.target.value
        })
    }

    // 发表评论，新增列表数据
    submitComment = () => {
        const item = {
            id: uuid(),
            author: 'me',
            comment: this.state.commentVal,
            time: new Date(),
            attitude: 0 // 1: 点赞 0：无态度 -1:踩
        }

        this.setState({
            list: [
                ...this.state.list,
                item
            ],
            commentVal: ''
        })
    }

    // 删除评论，删除列表数据
    delComment = (id) => {
        this.setState({
            list: this.state.list.filter(item => item.id !== id)
        })

        console.log('this', this)
    }

    // 切换喜欢即，修改列表数据
    toggleLike = (curItem) => {
        const {attitude, id} = curItem

        this.setState({
            list: this.state.list.map(item => {
                // return 出去都是新的一个item对象
                if (item.id === id) {
                    return {
                        ...item,
                        attitude: attitude === 1 ? 0 : 1 // 覆盖item里的attitude属性
                    }
                }

                return item
            })
        })
    }

    render() {
        return (
            <div className='comment-container'>
                {/* 评论数 */}
                <div className='comment-head'>
                    <span> 5 评论</span>
                </div>
                {/* 排序 */}
                <div className='tabs-order'>
                    <ul className='sort-container'>
                        {
                            this.state.tabs.map(tab => (
                                <li
                                    key={tab.id}
                                    className={tab.type === this.state.active ? 'on' : ''}
                                    onClick={() => this.switchTab(tab.type)}
                                >
                                    按{tab.name}排序
                                </li>
                            ))
                        }
                    </ul>
                </div>
                {/* 添加评论 */}
                <div className='comment-send'>
                    <div className='user-face'>
                        <img className='user-head' src={avatar} alt="" />
                    </div>
                    <div className='textarea-container'>
                        <textarea
                            cols="80"
                            rows="5"
                            placeholder='发条友善的评论'
                            className='ipt-txt'
                            value={this.state.commentVal}
                            onChange={this.textareChange}
                        />
                        <button className='comment-submit' onClick={this.submitComment}>发表评论</button>
                    </div>
                    <div className='comment-emoji'>
                        <i className='face' />
                        <span className='text'>表情</span>
                    </div>
                </div>
                {/* 评论列表 */}
                <div className='comment-list'>
                    {
                        this.state.list.map(item => (
                            <div className='list-item' key={item.id}>
                                <div className='user-face'>
                                    <img className='user-head' src={avatar} alt="" />
                                </div>
                                <div className='comment'>
                                    <div className='user'>{item.author}</div>
                                    <p className='text'>{item.comment}</p>
                                    <div className='info'>
                                        <span className='time'>{formDate(item.time)}</span>
                                        <span className={item.attitude === 1 ? 'like liked' : 'like'} onClick={()=>this.toggleLike(item)}>
                                            <i className='icon' />
                                        </span>
                                        <span className={item.attitude === -1 ? 'hate hated' : 'hate'}>
                                            <i className='icon' />
                                        </span>
                                        <span className='reply btn-hover' onClick={() => this.delComment(item.id)}>删除</span>
                                    </div>
                                </div>
                            </div>
                        ))
                    }
                </div>
            </div>
        )
    }
}

export default CommentList
