import img404 from '@/assets/error.png'
import {useEffect, useState} from "react";
import useChannels from "@/hooks/useChannels.jsx";
import {Card, Breadcrumb, Form, Button, Radio, DatePicker, Select, Popconfirm} from 'antd'
import { Table, Tag, Space } from 'antd'
import locale from 'antd/lib/locale/zh_CN'
import { EditOutlined, DeleteOutlined,ExclamationCircleOutlined } from '@ant-design/icons'
import {getArticleList, deleteArticle} from "@/apis/article.jsx";
import {Link, useNavigate} from "react-router-dom";

const { Option } = Select
const { RangePicker } = DatePicker
export default function Article(){
    const navigate = useNavigate()
    const [tableList, setTableList] = useState([])//表格数据
    const [count, setCount] = useState(0) //表格数据总数
    const [loading, setLoading] = useState(false);
    const channels = useChannels()

    const articleStatus = {
        0: { text: '草稿', color: 'gold' },
        1: { text: '待审核', color: 'lime' },
        2: { text: '审核通过', color: 'green' },
        3: { text: '审核失败', color: 'red' },
    }
    // 准备列数据
    const columns = [
        {
            title: '封面',
            dataIndex: 'cover',
            width: 120,
            render: cover => {
                return <img src={cover.images[0] || img404} width={80} height={60} alt="" />
            }
        },
        {
            title: '标题',
            dataIndex: 'title',
            width: 220
        },
        {
            title: '状态',
            dataIndex: 'status',
            render: data => <Tag color={articleStatus[data].color}>{articleStatus[data].text}</Tag>
        },
        {
            title: '发布时间',
            dataIndex: 'pubdate'
        },
        {
            title: '阅读数',
            dataIndex: 'read_count'
        },
        {
            title: '评论数',
            dataIndex: 'comment_count'
        },
        {
            title: '点赞数',
            dataIndex: 'like_count'
        },
        {
            title: '操作',
            render: data => {
                return (
                    <Space size="middle">
                        <Button type="primary" shape="circle" icon={<EditOutlined />} onClick={() => navigate(`/publish?id=${data.id}`)}/>
                        <Popconfirm title="删除文章" description="确认要删除当前文章吗？" onConfirm={() => handleDelete(data)} okText="确认" cancelText="取消">
                            <Button type="primary" danger shape="circle" icon={<DeleteOutlined />} />
                        </Popconfirm>
                    </Space>
                )
            }
        }
    ]

    // 搜索
    const [reqData, setReqData] = useState({
        status: '',
        channel_id: '',
        begin_pubdate: '',
        end_pubdate: '',
        page: 1,
        per_page: 4
    })


    useEffect(() => {
        setLoading(true)
        const fetchArticleList = async () => {
            const res = await getArticleList(reqData)
            setLoading(false)
            setTableList(res.data.results)
            setCount(res.data.total_count)
        }
        fetchArticleList()
    }, [reqData])

    const onFinish = (value) => {
        console.log(value)
        // 处理日期
        let begin = '', end = ''
        if(value.date){
            begin = value.date[0].format('YYYY-MM-DD')
            end = value.date[1].format('YYYY-MM-DD')
        }
        setReqData({
            ...reqData,
            channel_id: value.channel_id,
            status: value.status,
            begin_pubdate: begin,
            end_pubdate: end,
        })
    }

    const onPageChange = (page) => {
        setReqData({
            ...reqData,
            page
        })
    }

    // 设置初始值
    const initialValues = {
        status: '',
        channel_id: ''
    }

    // 删除确认
    const handleDelete = async (data) =>{
        console.log(data)
        // 发送请求进行删除
        await deleteArticle(data.id)
        setReqData({
            ...reqData
        })
    }

    return (
        <div>
            <Card
                title={
                    <Breadcrumb items={[
                        { title: <Link to={'/'}>首页</Link> },
                        { title: '文章列表' },
                    ]} />
                }
                style={{ marginBottom: 20 }}
            >
                <Form initialValues={initialValues} onFinish={onFinish}>
                    <Form.Item label="状态" name="status">
                        <Radio.Group>
                            <Radio value={''}>全部</Radio>
                            <Radio value={0}>草稿</Radio>
                            <Radio value={1}>待审核</Radio>
                            <Radio value={2}>审核通过</Radio>
                            <Radio value={3}>审核失败</Radio>
                        </Radio.Group>
                    </Form.Item>

                    <Form.Item label="频道" name="channel_id">
                        <Select
                            placeholder="请选择文章频道"
                            style={{ width: 120 }}
                        >
                            <Option value={''} key=''>全部</Option>
                            {channels.map(item => (<Option value={item.id} key={item.id}>{item.name}</Option>))}
                        </Select>
                    </Form.Item>

                    <Form.Item label="日期" name="date">
                        {/* 传入locale属性 控制中文显示*/}
                        <RangePicker locale={locale}></RangePicker>
                    </Form.Item>

                    <Form.Item>
                        <Button type="primary" htmlType="submit" style={{ marginLeft: 40 }}>
                            筛选
                        </Button>
                    </Form.Item>
                </Form>
            </Card>

            <div>
                {/*        */}
                <Card title={`根据筛选条件共查询到 ${count} 条结果：`}>
                    <Table rowKey="id"
                           columns={columns}
                           dataSource={tableList}
                           loading={loading}
                           pagination={{ position: ['bottomCenter'], current: reqData.page, total: count, pageSize: reqData.per_page, onChange: onPageChange }}/>
                </Card>
            </div>

        </div>

    )
}
