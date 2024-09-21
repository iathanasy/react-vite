import React, { useState } from 'react';
import { Radio, Timeline, Col, Row, Statistic  } from 'antd';
const { Countdown } = Statistic;
const deadline = Date.now() + 1000 * 60 * 60 * 24 * 2 + 1000 * 30; // Dayjs is also OK

const onFinish = () => {
    console.log('finished!');
};
const onChange = (val) => {
    if (typeof val === 'number' && 4.95 * 1000 < val && val < 5 * 1000) {
        console.log('changed!');
    }
};

export default function Home(){
    const [mode, setMode] = useState('left');
    const onChange = (e) => {
        setMode(e.target.value);
    };
    return (
        <>
            <Row gutter={16}>
                <Col span={12}>
                    <Countdown title="Countdown" value={deadline} onFinish={onFinish} />
                </Col>
                <Col span={12}>
                    <Countdown title="Million Seconds" value={deadline} format="HH:mm:ss:SSS" />
                </Col>
                <Col
                    span={24}
                    style={{
                        marginTop: 32,
                    }}
                >
                    <Countdown title="Day Level" value={deadline} format="D 天 H 时 m 分 s 秒" />
                </Col>
                <Col span={12}>
                    <Countdown title="Countdown" value={Date.now() + 10 * 1000} onChange={onChange} />
                </Col>
            </Row>
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