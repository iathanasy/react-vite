import Login from "@/pages/Login";
import Layout from "@/pages/Layout/index.jsx";
import AuthRoute from "@/components/AuthRoute";

const router = [
    {
        path: '/',
        element: <AuthRoute><Layout /></AuthRoute>
    },
    {
        path: '/login',
        element: <Login />
    }
]

export default router
