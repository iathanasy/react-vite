import React, { useState } from 'react';
import { HomeOutlined, DiffOutlined, EditOutlined, LogoutOutlined, MenuFoldOutlined, MenuUnfoldOutlined, UserOutlined } from '@ant-design/icons'
import {Popconfirm, Button, Layout, Menu, theme, Avatar, Popover, Space} from 'antd';
const { Header, Sider, Content, Footer } = Layout;

import './index.scss'
import {Outlet, useLocation, useNavigate} from "react-router-dom";
import {clearToken} from "@/utils/token";

const items = [
    {
        label: '首页',
        key: '/',
        icon: <HomeOutlined />,
    },
    {
        label: '文章管理',
        key: '/article',
        icon: <DiffOutlined />,
    },
    {
        label: '创建文章',
        key: '/publish',
        icon: <EditOutlined />,
    },
]


export default function GeekLayout(){
    const [collapsed, setCollapsed] = useState(false);
    const {
        token: { colorBgContainer, borderRadiusLG },
    } = theme.useToken();

    const navigate = useNavigate()
    const onMenuClick = ( value ) => {
        navigate( value.key )
    }

    // 菜单高亮
    const location = useLocation()
    const selectedKey = location.pathname

    const mobile = '123'

    // 确认退出登录 - 点击事件
    const onConfirm = () => {
        clearToken();
        navigate( '/login' )
    }

    return (
        <div className="layout">
            <Layout style={{
                minHeight: '100vh',
            }}>
                <Sider trigger={null} collapsible collapsed={collapsed}>
                    <Menu
                        theme="dark"
                        mode="inline"
                        defaultSelectedKeys={['/article']}
                        selectedKeys={ selectedKey }
                        style={{ height: '100%', borderRight: 0 }}
                        onClick={ onMenuClick }
                        items={items}
                    />
                </Sider>
                <Layout>
                    <Header className="header"
                        style={{
                            padding: 0,
                            background: colorBgContainer,
                        }}
                    >

                        <Button className="collapsed"
                            type="text"
                            icon={collapsed ? <MenuUnfoldOutlined /> : <MenuFoldOutlined />}
                            onClick={() => setCollapsed(!collapsed)}
                            style={{
                                fontSize: '16px',
                                width: 64,
                                height: 64,
                            }}
                        />
                        <div className="profile">
                            <Popconfirm title={'[' + mobile + ']是否确认退出？'} okText="退出" cancelText="取消" onConfirm={ onConfirm }>
                                <Avatar size={40} icon={<UserOutlined />}  />
                            </Popconfirm>
                        </div>
                    </Header>
                    <Content
                        style={{
                            margin: '24px 16px',
                            padding: 24,
                            minHeight: 280,
                            background: colorBgContainer,
                            borderRadius: borderRadiusLG,
                        }}
                    >
                        {/* 二级路由出口 */}
                        <Outlet />
                    </Content>

                    <Footer
                        style={{
                            textAlign: 'center',
                        }}
                    >
                        Ant Design ©{new Date().getFullYear()} Created by Ant UED
                    </Footer>
                </Layout>
            </Layout>
        </div>
    )

}
