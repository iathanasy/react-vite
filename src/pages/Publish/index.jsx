import {Link, useNavigate, useSearchParams} from "react-router-dom";
import {Card, Breadcrumb, Form, Input, Radio, Space, Button, Select, Upload, message} from 'antd'
import { PlusOutlined } from '@ant-design/icons'
// import {Option} from "antd/es/mentions/index.js";
import useChannels from "@/hooks/useChannels.jsx";
// npm install react-quill
import ReactQuill from "react-quill";
import 'react-quill/dist/quill.snow.css';
import './index.scss'
import {getArticleById, publishArticle, updateArticle} from "@/apis/article.jsx";
import {useEffect, useState} from "react";

const { Option } = Select

export default function Publish(){
    const [searchParams] = useSearchParams()
    const articleId = searchParams.get('id')
    const channels = useChannels()
    const navigate = useNavigate()

    const [imageList, setImageList] = useState([])
    const [imageType, setImageType] = useState(0)

    // 图片变化事件
    const onImageChange = (value) => {
        setImageList(value.fileList)
    }

    // 类型 - 变化事件
    const onImageTypeChange = (e) => {
        setImageType(e.target.value)
    }

    const [form] = Form.useForm();

    let op = '发布'
    if(articleId) {
        op = '更新'
    }
    /**
     * 获取文章详情
     * @returns {Promise<void>}
     */
    useEffect(() =>{
        async function fetchArticleDetail(){
            const res = await getArticleById(articleId)
            // 设置表单数据
            form.setFieldsValue({
                ...res.data,
                type: res.data.cover.type
            })
            setImageType(res.data.cover.type)
            setImageList(res.data.cover.images.map(url => {
                return {url}
            }))
        }

        if(articleId){
            fetchArticleDetail()
        }
    },[articleId, form])



    // 发布 - 点击事件
    const onFinish = async (values) => {
        console.log(values)
        handlePublish(values, false)
    }
    /**
     * 草稿 - 点击事件
     * @returns {Promise<void>}
     */
    const onDraft = async () => {
        const values = await form.validateFields()
        console.log(values)
        handlePublish(values, true)
    }

    /**
     * 发布文章
     * @param values
     * @param draft
     * @returns {Promise<void>}
     */
    const handlePublish = async (values, draft) => {
        //发布文章
        const { channel_id, content, title } = values
        const params = {
            channel_id,
            content,
            title,
            cover: {
                type: imageType,
                images: imageList.map(item => {
                    if (item.response) {
                        return item.response.data.url
                    } else {
                        return item.url
                    }
                })
            },
        }
        if(articleId){
            await updateArticle({...params, id: articleId}, draft)
        }else{
            await publishArticle(params, draft)
        }
        message.success(`${op}文章成功`)
        navigate('/article')
    }

    return (
        <div className="publish">
            <Card
                title={
                    <Breadcrumb items={[
                        { title: <Link to={'/'}>首页</Link> },
                        { title: `${op}文章` },
                    ]}
                    />
                }
            >
                <Form
                    labelCol={{ span: 4 }}
                    wrapperCol={{ span: 16 }}
                    initialValues={{ type: 0 }}
                    onFinish={onFinish}
                    form={form}
                >
                    {
                        articleId &&
                        <Form.Item label="ID" name="id">
                            <Input disabled style={{ width: 300 }} />
                        </Form.Item>
                    }
                    <Form.Item
                        label="标题"
                        name="title"
                        rules={[{ required: true, message: '请输入文章标题' }]}
                    >
                        <Input placeholder="请输入文章标题" style={{ width: 400 }} />
                    </Form.Item>
                    <Form.Item
                        label="频道"
                        name="channel_id"
                        rules={[{ required: true, message: '请选择文章频道' }]}
                    >
                        <Select placeholder="请选择文章频道" style={{ width: 200 }}>
                            {channels.map(item => (
                                <Option key={item.id} value={item.id}>
                                    {item.name}
                                </Option>
                            ))}
                        </Select>
                    </Form.Item>
                    <Form.Item label="封面">
                        <Form.Item name="type">
                            <Radio.Group onChange={onImageTypeChange}>
                                <Radio value={0}>无图</Radio>
                                <Radio value={1}>单图</Radio>
                                <Radio value={3}>三图</Radio>
                            </Radio.Group>
                        </Form.Item>
                        {imageType > 0 &&
                            <Upload listType="picture-card" showUploadList action={'http://geek.itheima.net/v1_0/upload'} name='image' onChange={onImageChange} maxCount={imageType} fileList={imageList}>
                                <div style={{ marginTop: 8 }}>
                                    <PlusOutlined />
                                </div>
                            </Upload>
                        }

                    </Form.Item>

                    <Form.Item
                        label="内容"
                        name="content"
                        rules={[{ required: true, message: '请输入文章内容' }]}
                    >
                        <ReactQuill
                            className="publish-quill"
                            theme="snow"
                            placeholder="请输入文章内容"
                        />
                    </Form.Item>

                    {
                        articleId &&
                        <Form.Item label="创建时间" name="pub_date">
                            <Input disabled style={{ width: 300 }} />
                        </Form.Item>
                    }
                    <Form.Item wrapperCol={{ offset: 4 }}>
                        <Space>
                            <Button size="large" type="primary" htmlType="submit">
                                发布文章
                            </Button>
                            <Button size="large" onClick={onDraft}>
                                存入草稿
                            </Button>
                        </Space>
                    </Form.Item>
                </Form>
            </Card>
        </div>
    )
}
