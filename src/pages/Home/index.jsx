import React, { useState } from 'react';
import { Radio, Timeline, Col, Row, Statistic, Descriptions,Avatar   } from 'antd';
import useUserInfo from "@/hooks/useUserInfo.jsx";

export default function Home(){
    const [mode, setMode] = useState('left');
    const onChange = (e) => {
        setMode(e.target.value);
    };
    const profile = useUserInfo();
    const items = [
        {
            key: '1',
            label: 'UserName',
            children: profile.name,
        },
        {
            key: '2',
            label: 'Telephone',
            children: profile.mobile,
        },
        {
            key: '3',
            label: 'BirthDay',
            children: profile.birthday,
        },
        {
            key: '4',
            label: 'Remark',
            children: profile.intro,
        },
        {
            key: '0',
            label: 'Photo',
            children: <Avatar shape="square" src={profile.photo} />,
        },
    ];
    return (
        <>
            <Descriptions title="User Info" items={items} />

            <hr />
            <Radio.Group
                onChange={onChange}
                value={mode}
                style={{
                    marginBottom: 20,
                }}
            >
                <Radio value="left">Left</Radio>
                <Radio value="right">Right</Radio>
                <Radio value="alternate">Alternate</Radio>
            </Radio.Group>
            <Timeline
                mode={mode}
                items={[
                    {
                        label: '2015-09-01',
                        children: 'Create a services',
                    },
                    {
                        label: '2015-09-01 09:12:11',
                        children: 'Solve initial network problems',
                    },
                    {
                        children: 'Technical testing',
                    },
                    {
                        label: '2015-09-01 09:12:11',
                        children: 'Network problems being solved',
                    },
                ]}
            />
        </>
    )
}
