import React, { Component } from 'react'
import PubSub from 'pubsub-js'
import './index.css'

export default class List extends Component {

  state = {   //初始化状态 
    users:[],  //users初始值为数组
    isFirst:true, //是否为第一次打开页面
    isLoading:false, //标识是否处于加载中
    err:'',
  } 

  componentDidMount() {
    this.token = PubSub.subscribe('amir',(_,stateObj)=> {
        this.setState(stateObj)
    })
  }

  componentWillUnmount(){
      PubSub.unsubscribe(this.token)
  }

  render() {
    const {users, isFirst,isLoading,err} = this.state
    return (
		<div className="row">
            {
                isFirst ? <h2>欢迎光临，输入关键词搜索</h2> :
                isLoading ? <h2>Loading......</h2> :
                err ? <h2>{err}</h2> :
                users.map((userObj)=>{
                  return (
                    <div key={userObj.id} className="card">
                        <a rel="noreferrer" href={userObj.html_url} target="_blank">
                          <img alt='head_pic' src={userObj.avatar_url} style={{width: '100px'}}/>
                        </a>
                        <p className="card-text">{userObj.login}</p>
                    </div>
                    )
                })
            }

		</div>
    )
  }
}
