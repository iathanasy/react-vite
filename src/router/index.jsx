import Login from "../pages/Login/index.jsx";
import Layout from "../pages/Layout/index.jsx";

const router = [
    {
        path: '/',
        element: <Layout />
    },
    {
        path: 'login',
        element: <Login />
    }
]

export default router
