const routers = [
    //根据每个人的不同权限 动态添加路由
     {
        path: "/index",
        component: () => import('../views/Home/Home.vue'),
        
    }, 
    {
        path: "/center",
        component: () => import('../views/Center/Center.vue')
    },
    {
        path: "/user-manage/adduser",
        component: () => import('../views/user-manage/UserAdd.vue'),
        requireAdmin:true
    },
    {
        path: "/user-manage/userlist",
        component: () => import('../views/user-manage/UserList.vue'),
        requireAdmin:true
    },
    {
        path: "/news-manage/addnews",
        component: () => import('../views/news-manage/NewsAdd.vue')
    },
    {
        path: "/news-manage/newslist",
        component: () => import('../views/news-manage/NewsList.vue')
    },
    {
        path: "/news-manage/editnews/:id",
        component: () => import('../views/news-manage/NewsEditor.vue')
    },
    {
        path: "/product-manage/addproduct",
        component: () => import('../views/product-manage/ProductAdd.vue')
    },
    {
        path: "/product-manage/productlist",
        component: () => import('../views/product-manage/ProductList.vue')
    },
    {
        path: "/product-manage/editproduct/:id",
        component: () => import('../views/product-manage/ProductEditor.vue')
    },
    {
        path: "/",
        redirect: '/index'
    },
    {
        path:"/:pathMatch(.*)*",
        component: () => import('../views/NotFound/NotFound.vue')
    }
]
export default routers