import {useSearchParams} from "react-router-dom";

export default function Publish(){
    const [searchParams] = useSearchParams()
    const articleId = searchParams.get('id')
    return (
        <div>发布 {articleId}</div>
    )
}