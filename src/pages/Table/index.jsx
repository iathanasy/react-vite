import {Card, Breadcrumb, Form, Input, Button, Radio, Select, DatePicker, Table, Flex} from 'antd'
const { RangePicker } = DatePicker
import {Link} from "react-router-dom";
import {useEffect, useState} from "react";
import qs from 'qs';
export default function Article(){
    const columns = [
        {
            title: 'Name',
            dataIndex: 'name',
            sorter: true,
            render: (name) => `${name.first} ${name.last}`,
            width: '20%',
        },
        {
            title: 'Gender',
            dataIndex: 'gender',
            filters: [
                {
                    text: 'Male',
                    value: 'male',
                },
                {
                    text: 'Female',
                    value: 'female',
                },
            ],
            width: '20%',
        },
        {
            title: 'Email',
            dataIndex: 'email',
        },
    ];

    const getRandomuserParams = (params) => ({
        results: params.pagination?.pageSize,
        page: params.pagination?.current,
        ...params,
    });


    const [selectedRowKeys, setSelectedRowKeys] = useState([]);
    const [loading, setLoading] = useState(false);
    const [dataLoading, setDataLoading] = useState(false);
    const [data, setData] = useState();
    const [tableParams, setTableParams] = useState({
        pagination: {
            current: 1,
            pageSize: 10,
        },
    });

    const start = () => {
        setLoading(true);
        // ajax request after empty completing
        setTimeout(() => {
            setSelectedRowKeys([]);
            setLoading(false);
        }, 1000);
    };
    const onSelectChange = (newSelectedRowKeys) => {
        console.log('selectedRowKeys changed: ', newSelectedRowKeys);
        setSelectedRowKeys(newSelectedRowKeys);
    };
    const rowSelection = {
        selectedRowKeys,
        onChange: onSelectChange,
    };
    const hasSelected = selectedRowKeys.length > 0;

    // 加载数据
    const fetchData = () => {
        setDataLoading(true);
        fetch(`https://randomuser.me/api?${qs.stringify(getRandomuserParams(tableParams))}`)
            .then((result) => result.json())
            .then(({ results }) => {
                console.log(results)
                setData(results);
                setDataLoading(false);
                setTableParams({
                    ...tableParams,
                    pagination: {
                        ...tableParams.pagination,
                        total: 200,
                        // 200 is mock data, you should read it from server
                        // total: data.totalCount,
                    },
                });
            });

    }

    useEffect(() => {
        fetchData();
    }, [
        tableParams.pagination?.current,
        tableParams.pagination?.pageSize,
        tableParams?.sortOrder,
        tableParams?.sortField,
        JSON.stringify(tableParams.filters),
    ]);
    const handleTableChange = (pagination, filters, sorter) => {
        setTableParams({
            pagination,
            filters,
            sortOrder: Array.isArray(sorter) ? undefined : sorter.order,
            sortField: Array.isArray(sorter) ? undefined : sorter.field,
        });

        // `dataSource` is useless since `pageSize` changed
        if (pagination.pageSize !== tableParams.pagination?.pageSize) {
            setData([]);
        }
    };

    return (
        <div className="tableList">
            <Card
                title={
                    <Breadcrumb separator="/">
                        <Breadcrumb.Item>
                            <Link to="/">首页</Link>
                        </Breadcrumb.Item>
                        <Breadcrumb.Item>Table列表</Breadcrumb.Item>
                    </Breadcrumb>
                }
            >
                <Flex gap="middle" vertical>
                    <Flex align="center" gap="middle">
                        <Button type="primary" onClick={start} disabled={!hasSelected} loading={loading}>
                            Reload
                        </Button>
                        {hasSelected ? `Selected ${selectedRowKeys.length} items` : null}
                    </Flex>
                    <Table dataSource={data}
                           columns={columns}
                           rowKey={(record) => record.login.uuid}
                           rowSelection={rowSelection}
                           size={"large"}
                           loading={dataLoading}
                           pagination={tableParams.pagination}
                           onChange={handleTableChange}
                           scroll={{
                               y: 240,
                           }} />
                </Flex>

            </Card>
        </div>
    )
}