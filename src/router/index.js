import Vue from 'vue'
import Router from 'vue-router'

Vue.use(Router)

/* Layout */
import Layout from '@/layout'

/**
 * Note: sub-menu only appear when route children.length >= 1
 * Detail see: https://panjiachen.github.io/vue-element-admin-site/guide/essentials/router-and-nav.html
 *
 * hidden: true                   if set true, item will not show in the sidebar(default is false)
 * alwaysShow: true               if set true, will always show the root menu
 *                                if not set alwaysShow, when item has more than one children route,
 *                                it will becomes nested mode, otherwise not show the root menu
 * redirect: noRedirect           if set noRedirect will no redirect in the breadcrumb
 * name:'router-name'             the name is used by <keep-alive> (must set!!!)
 * meta : {
    roles: ['admin','editor']    control the page roles (you can set multiple roles)
    title: 'title'               the name show in sidebar and breadcrumb (recommend set)
    icon: 'svg-name'/'el-icon-x' the icon show in the sidebar
    breadcrumb: false            if set false, the item will hidden in breadcrumb(default is true)
    activeMenu: '/example/list'  if set path, the sidebar will highlight the path you set
  }
 */

/**
 * constantRoutes
 * a base page that does not have permission requirements
 * all roles can be accessed
 */
export const constantRoutes = [
  {
    path: '/login',
    component: () => import('@/views/login/index'),
    hidden: true
  },

  {
    path: '/404',
    component: () => import('@/views/404'),
    hidden: true
  },

  {
    path: '/',
    component: Layout,
    redirect: '/dashboard',
    children: [{
      path: 'dashboard',
      name: 'Dashboard',
      component: () => import('@/views/dashboard/index'),
      meta: { title: 'Dashboard', icon: 'dashboard' }
    }]
  },

  {
    path: '/shop',
    component: Layout,
    redirect: '/shop/category',
    name: 'Shop',
    meta: { title: '商品管理', icon: 'el-icon-s-shop' },
    children: [
      {
        path: 'category',
        name: 'ShopManager',
        component: () => import('@/views/category/index'),
        meta: { title: '商品类目管理', icon: 'el-icon-s-order' }
      },
      {
        path: 'product',
        name: 'ProductTable',
        component: () => import('@/views/producttable/index'),
        meta: { title: '商品管理', icon: 'el-icon-goods' }
      },
      {
        path: 'addproduct',
        name: 'AddProduct',
        component: () => import('@/views/addproduct/index'),
        meta: { title: '商品添加', icon: 'el-icon-circle-plus' }
      }
    ]
  },

  {
    path: '/user',
    component: Layout,
    redirect: '/user/userlist',
    name: 'User',
    meta: { title: '用户管理', icon: 'el-icon-user' },
    children: [
      {
        path: 'userlist',
        name: 'userlist',
        component: () => import('@/views/user/index'),
        meta: { title: '用户管理', icon: 'el-icon-user' }
      },
      {
        path: 'adduser',
        name: 'adduser',
        component: () => import('@/views/adduser/index'),
        meta: { title: '添加用户', icon: 'el-icon-circle-plus-outline' }
      },
    ]
  },

  {
    path: '/cart',
    component: Layout,
    redirect: '/cart/cartlist',
    name: 'Cart',
    meta: { title: '购物车管理', icon: 'el-icon-shopping-cart-1' },
    children: [
      {
        path: 'cartlist',
        name: 'cartlist',
        component: () => import('@/views/cart/index'),
        meta: { title: '购物车管理', icon: 'el-icon-shopping-cart-2' }
      },
    ]
  },

  {
    path: '/order',
    component: Layout,
    redirect: '/order/orderlist',
    name: 'Order',
    meta: {title: '订单管理', icon: 'el-icon-s-order'},
    children: [
      {
        path: 'orderlist',
        name: 'orderlist',
        component: () => import('@/views/order/index'),
        meta: { title: '订单管理', icon: 'el-icon-s-order' }
      },
      {
        path: 'addorder',
        name: 'addorder',
        component: () => import('@/views/addorder/index'),
        meta: {title: '添加订单', icon: 'el-icon-s-release'}
      }
    ]
  },

  {
    path: '/payinfo',
    component: Layout,
    redirect: '/payinfo/payinfolist',
    name: 'Payinfo',
    meta: {title: '支付管理', icon: 'el-icon-s-finance'},
    children: [
      {
        path: 'payinfolist',
        name: 'payinfolist',
        component: () => import('@/views/payinfo/index'),
        meta: { title: '支付管理', icon: 'el-icon-s-finance' }
      },
      {
        path: 'addpayinfo',
        name: 'addpayinfo',
        component: () => import('@/views/addpayinfo/index'),
        meta: {title: '添加支付信息', icon: 'el-icon-document'}
      }
    ]
  },

  {
    path: '/advert',
    component: Layout,
    redirect: '/advert/advertlist',
    name: 'Advert',
    meta: {title: '轮播图管理', icon: 'el-icon-picture'},
    children: [
      {
        path: 'advertlist',
        name: 'advertlist',
        component: () => import('@/views/advert/index'),
        meta: {title: '轮播图管理', icon: 'el-icon-picture'}
      },
      {
        path: 'addadvert',
        name: 'addadvert',
        component: () => import('@/views/addadvert/index'),
        meta: {title: '添加轮播图', icon: 'el-icon-upload2'}
      },
    ]
  },

  // 404 page must be placed at the end !!!
  { path: '*', redirect: '/404', hidden: true }
]

const createRouter = () => new Router({
  // mode: 'history', // require service support
  scrollBehavior: () => ({ y: 0 }),
  routes: constantRoutes
})

const router = createRouter()

// Detail see: https://github.com/vuejs/vue-router/issues/1234#issuecomment-357941465
export function resetRouter() {
  const newRouter = createRouter()
  router.matcher = newRouter.matcher // reset router
}

export default router
