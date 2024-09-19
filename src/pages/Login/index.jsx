import { Component } from 'react'
import {Button, Card, Checkbox, Form, Input, message} from 'antd'
// yarn add sass
import './index.scss'
import logo from '@/assets/vite.svg'
import {login} from "@/apis/user";
//yarn add react-redux
import { useDispatch } from 'react-redux'
import {useLocation} from 'react-router-dom'
import {setToken} from "@/utils/token";

/**
 * 异步方法
 * @param params
 */
const fetchLogin = (params) =>{
    return async (dispatch) =>{
        const res = await login(params)
        console.log(res)
        dispatch(setToken(res.token))
    }
}
class Login extends Component {

    /**
     * 表单注册事件
     * @param values
     * @returns {Promise<void>}
     */
    onFinish = async (values) => {
        console.log(values)
        const res = await login(values)
        console.log(res)
        setToken(res.data.token)
        // 跳转到首页
        location.href = '/'
        message.success('登录成功')
    }
    render() {
        return (
            <div className="login">
                <Card className="login-container">
                    <img className="login-logo" src={logo} alt=""/>
                    {/* 表单 */}
                    <Form name="basic"
                          size="large"
                          initialValues={{
                              mobile: '13888888888',
                              code: '246810',
                              remember: true,
                        }}
                        validateTrigger={['onChange', 'onBlur']}
                        onFinish={this.onFinish}
                    >
                        <Form.Item name="mobile"
                                   rules={[
                                       {
                                           pattern: /^1[3-9]\d{9}$/,
                                           message: '手机号码格式不对',
                                       },
                                       { required: true, message: '请输入手机号' },
                                   ]}
                        >
                            <Input placeholder="请输入手机号" />
                        </Form.Item>

                        <Form.Item name="code"
                                   rules={[
                                       {
                                           pattern: /^\d{6}$/,
                                           message: '验证码格式不对',
                                       },
                                       { required: true, message: '请输入验证码' },
                                   ]}
                        >
                            <Input placeholder="请输入验证码" />
                        </Form.Item>

                        <Form.Item name="remember" valuePropName="checked">
                            <Checkbox>Remember me</Checkbox>
                        </Form.Item>

                        <Form.Item>
                            <Button type="primary" htmlType="submit" block>
                                登录
                            </Button>
                        </Form.Item>
                    </Form>
                </Card>

            </div>
        )
    }
}

export default Login
