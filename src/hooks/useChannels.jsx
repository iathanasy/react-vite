//自定义hook，用于频道列表（一处获取多处使用）
import {useEffect, useState} from "react";
import {getChannels} from "@/apis/article.jsx";

export default function useChannels(){
    const [channels, setChannels] = useState([])
    useEffect(() =>{
        const fetchChannels = async () => {
            const res = await getChannels()
            console.log(res)
            setChannels(res.data.channels)
        }
        fetchChannels()
    }, []);
    return (
        channels
    )

}
