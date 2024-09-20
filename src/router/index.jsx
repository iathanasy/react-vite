import Login from "@/pages/Login";
import AuthRoute from "@/components/AuthRoute";
import GeekLayout from "@/pages/Layout/index.jsx";
import {lazy, Suspense} from "react";

const Home = lazy(() => import('@/pages/Home/index.jsx'))
const Article = lazy(() => import('@/pages/Article/index'))
const Publish = lazy(() => import('@/pages/Publish/index'))

const router = [
    {
        path: '/',
        element: <AuthRoute><GeekLayout /></AuthRoute>,
        children: [
            {
                path: '/',
                element: <Suspense fallback={'加载中'}><Home /></Suspense>
            },
            {
                path: 'article',
                element: <Suspense fallback={'加载中'}><Article /></Suspense>
            },
            {
                path: 'publish',
                element: <Suspense fallback={'加载中'}><Publish /></Suspense>
            }
        ]

    },
    {
        path: '/login',
        element: <Login />
    }
]

export default router
