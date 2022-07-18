


import CustomIcon from '../../components/CustomIcon';
import s from './style.module.less'
import { Cell, Input, Checkbox, Button, Toast } from "zarm";
import { useState } from 'react';
import { post } from '@/utils';
import cx from "classnames";

const Login = () => {

  const [username, setUsername] = useState('')
  const [password, setPassword] = useState('')
  const [type, setType] = useState('login')

  const onSubmit = async () => {
    if (!username) {
      Toast.show("请输入账号")
      return
    }
    if (!password) {
      Toast.show("请输入密码")
      return
    }
    try {
      // 判断是否登录
      if (type == 'login') {
        const { data } = await post('/api/user/login', {
          username,
          password,
        })
        // 保存 token
        localStorage.setItem('token', data.token)
      }else {
        const { data } = await post('/api/user/register', {
          username,
          password,
        })
        Toast.show("注册成功")
        // 注册成功后 自动将type切换为login
        setType("login")
      }
    } catch (error) {
      Toast.show("系统错误")
    }
  }

  return (
    <div className={s.auto}>

      <div className={s.head} />

      <div className={s.tab}>
        <span className={cx({ [s.active]: type == 'login' })} onClick={() => setType('login')} >登录</span>
        <span className={cx({ [s.active]: type == 'register' })} onClick={() => setType('register')} >注册</span>
      </div>

      <div className={s.form}>
        <Cell icon={<CustomIcon type='zhanghao' />}>
          <Input clearable type='text' placeholder='请输入账号' onChange={(value) => setUsername(value)} />
        </Cell>
        <Cell icon={<CustomIcon type='mima' />}>
          <Input clearable type='password' placeholder='请输入密码' onChange={(value) => setPassword(value)} />
        </Cell>
      </div>

      <div className={s.operation}>
        {
          type == "register" ? (<div className={s.agree}>
          <Checkbox />
          <label className='text-light'>同意并阅读<a>《xxx条款》</a></label>
        </div>) : null
        }
        <Button onClick={onSubmit} block theme="primary">{type == 'login' ? '登录' : '注册' }</Button>
      </div>

    </div>
  )
}


export default Login;