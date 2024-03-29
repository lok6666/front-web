import Vue from 'vue'
import Router from 'vue-router'
import store from '@/store'
const hashList = ['#/beijing', '#/shijingshan', '#/chaoyang'];
const routerPush = Router.prototype.push;
Router.prototype.isBeijing = function isBeijing(path) {
  let locationhash = hashList.find(e => window.location.hash.includes(e));
  // return window.location.hash.includes('beijing')
  return locationhash;
}
Router.prototype.changelocation = function push(path, target) {
  let oirgin = window.location.hash;
  for (let i = 0;i < hashList.length; i++) {
    if(oirgin.includes(hashList[i])) {
      oirgin = hashList[i];
      break;
    }
  }
  try {
    return routerPush.call(this, window.location.hash.replace(oirgin, target).replace('#', ''));
  } catch (error) {
    console.log('error', error);
  }
  // routerPush.call(this, '/:status');
}

Router.prototype.push = function push(path) {
  // router-link跳转
  if(typeof path === 'object') {
    path = path.path;
  };
  if(window.location.hash.includes('beijing')) {
    return routerPush.call(this, `/beijing/${path.substring(1)}`).catch(error => {
      console.log('error--', error);
    })
  }
  else if(window.location.hash.includes('shijingshan')) {
    return routerPush.call(this, `/shijingshan/${path.substring(1)}`).catch(error => {
      console.log('error--', error);
    })
  }
  else if(window.location.hash.includes('chaoyang')) {
    return routerPush.call(this, `/chaoyang/${path.substring(1)}`).catch(error => {
      console.log('error--', error);
    })
  }
  return routerPush.call(this, path).catch(error => {
    console.log('error--', error);
  })
}
Vue.use(Router)
/* Layout */
import Layout from '@/layout'
/**
 *
 *
 * hidden: true                   如果设置了true，则不在左边导航栏显示,即不是后台管理的页面
 * alwaysShow: true               如果设置了true，则总在根菜单显示
 *
 * redirect: noRedirect           设置noRedirect，则面包屑路径不可点
 * name:'router-name'             名称在 <keep-alive> 用到，后台管理必须设置！！！
 * meta : {
    roles: ['admin','test']      页面角色控制，可多角色
    title: 'title'               标题
    icon: 'svg-name'             导航栏图标
    breadcrumb: false            false，将不显示面包屑
    activeMenu: '/example/list'  如果设置，则导航栏将高亮显示
  }
 */

/**
 * 常量路由，所有用户可见
 */
export const constantRoutes = [
  {
    path: '/',
    component: () => import('@/views/index/index'),
    hidden: true,
    redirect: 'beijing',
    meta: {
      keepAlive: true,
    }
  },
  {
    path: '/tag',
    component: () => import('@/views/tag/index'),
    hidden: true
  },
  {
    path: '/category',
    component: () => import('@/views/category/index'),
    hidden: true
  },
  {
    path: '/policy-search',
    component: () => import('@/views/policy-search/index'),
    hidden: true
  },
  {
    path: '/policy-report',
    component: () => import('@/views/policy-report/index'),
    hidden: true
  },
  {
    path: '/policy-match/:type',
    component: () => import('@/views/policy-match/index'),
    hidden: true
  },
  {
    path: '/policy-cul/:type',
    component: () => import('@/views/policy-match/index'),
    hidden: true
  },
  {
    path: '/building',
    component: () => import('@/views/building/index'),
    hidden: true
  },
  {
    path: '/picture-detail',
    component: () => import('@/views/picture-detail/index'),
    hidden: true
  },
  {
    path: '/picture-detail2',
    component: () => import('@/views/picture-detail2/index'),
    hidden: true
  },
  {
    path: '/picture-detail3',
    component: () => import('@/views/picture-detail3/index'),
    hidden: true
  },
  {
    path: '/new-detail/:artId/',
    component: () => import('@/views/new-detail/index'),
    hidden: true
  },
  {
    path: '/collage-detail/:collageId',
    component: () => import('@/views/collage-detail/index'),
    hidden: true
  },
  {
    path: '/teacher-detail',
    component: () => import('@/views/teacher-detail/index'),
    hidden: true
  },
  {
    path: '/policy-detail/:artId/',
    component: () => import('@/views/policy-detail/index'),
    hidden: true
  },
  {
    path: '/new-more',
    component: () => import('@/views/new-more/index'),
    hidden: true
  },
  {
    path: '/business-detail/:id',
    component: () => import('@/views/business-detail/index'),
    hidden: true
  },
  {
    path: '/protect-detail/:id',
    component: () => import('@/views/protect-detail/index'),
    hidden: true
  },
  {
    path: '/finance',
    component: () => import('@/views/finance/index'),
    hidden: true
  },
  {
    path: '/finance-detail/:id',
    component: () => import('@/views/finance-detail/index'),
    hidden: true
  },
  {
    path: '/building-detail/:id',
    component: () => import('@/views/building-detail/index'),
    hidden: true
  },
  {
    path: '/archives',
    component: () => import('@/views/archives/index'),
    hidden: true
  },
  {
    path: '/message',
    component: () => import('@/views/message/index'),
    hidden: true
  },
  {
    path: '/friend-link',
    component: () => import('@/views/friend-link/index'),
    hidden: true
  },
  {
    path: '/article/:id',
    component: () => import('@/views/article/index'),
    hidden: true
  },
  {
    path: '/reset-password',
    component: () => import('@/views/reset-password/index'),
    hidden: true
  },
  {
    path: '/email-validate',
    component: () => import('@/views/email-validate/index'),
    hidden: true
  },
  {
    path: '/rebind-mobile',
    component: () => import('@/views/rebind-mobile/index'),
    hidden: true
  },
  {
    path: '/bind-mobile',
    component: () => import('@/views/bind-mobile/index'),
    hidden: true
  },
  {
    path: '/about',
    component: () => import('@/views/about/index'),
    hidden: true
  },
  {
    path: '/terms',
    component: () => import('@/views/terms/index'),
    hidden: true
  },
  {
    path: '/privacy',
    component: () => import('@/views/privacy/index'),
    hidden: true
  },
  {
    path: '/search',
    component: () => import('@/views/search/index'),
    hidden: true
  },
  {
    path: '/email-bind',
    component: () => import('@/views/404'),
    hidden: true
  },
  {
    path: '/oauth',
    component: () => import('@/views/oauth'),
    hidden: true
  },
  {
    path: '/404',
    component: () => import('@/views/404'),
    hidden: true
  },
  {
    path: '/user',
    hidden: true,
    component: () => import('@/views/user/index'),
  },
  {
    path: '/collect',
    component: Layout,
    children: [{
      path: 'index',
      name: 'collect',
      component: () => import('@/views/collect-manage/index'),
      meta: {
        title: '我的收藏',
        icon: 'collect-manage'
      }
    }]
  }
]
/**
 * 常量路由，所有用户可见
 */
 export const bjRoutes = [
  {
    path: '/:status',
    component: () => import('@/views/index/index'),
    hidden: true,
    meta: {
      keepAlive: true,
    }
  },
  {
    path: '/:status/tag',
    component: () => import('@/views/tag/index'),
    hidden: true
  },
  {
    path: '/:status/category',
    component: () => import('@/views/category/index'),
    hidden: true
  },
  {
    path: '/:status/policy-search',
    component: () => import('@/views/policy-search/index'),
    hidden: true
  },
  {
    path: '/:status/policy-report',
    component: () => import('@/views/policy-report/index'),
    hidden: true
  },
  {
    path: '/:status/policy-match/:type',
    component: () => import('@/views/policy-match/index'),
    hidden: true
  },
  {
    path: '/:status/policy-cul/:type',
    component: () => import('@/views/policy-match/index'),
    hidden: true
  },
  {
    path: '/:status/building',
    component: () => import('@/views/building/index'),
    hidden: true
  },
  {
    path: '/:status/picture-detail',
    component: () => import('@/views/picture-detail/index'),
    hidden: true
  },
  {
    path: '/:status/picture-detail2',
    component: () => import('@/views/picture-detail2/index'),
    hidden: true
  },
  {
    path: '/:status/picture-detail3',
    component: () => import('@/views/picture-detail3/index'),
    hidden: true
  },
  {
    path: '/:status/new-detail/:artId/',
    component: () => import('@/views/new-detail/index'),
    hidden: true
  },
  {
    path: '/:status/collage-detail/:collageId',
    component: () => import('@/views/collage-detail/index'),
    hidden: true
  },
  {
    path: '/:status/teacher-detail',
    component: () => import('@/views/teacher-detail/index'),
    hidden: true
  },
  {
    path: '/:status/policy-detail/:artId/',
    component: () => import('@/views/policy-detail/index'),
    hidden: true
  },
  {
    path: '/:status/new-more',
    component: () => import('@/views/new-more/index'),
    hidden: true
  },
  {
    path: '/:status/business-detail/:id',
    component: () => import('@/views/business-detail/index'),
    hidden: true
  },
  {
    path: '/:status/protect-detail/:id',
    component: () => import('@/views/protect-detail/index'),
    hidden: true
  },
  {
    path: '/:status/finance',
    component: () => import('@/views/finance/index'),
    hidden: true
  },
  {
    path: '/:status/finance-detail/:id',
    component: () => import('@/views/finance-detail/index'),
    hidden: true
  },
  {
    path: '/:status/building-detail/:id',
    component: () => import('@/views/building-detail/index'),
    hidden: true
  },
  {
    path: '/:status/archives',
    component: () => import('@/views/archives/index'),
    hidden: true
  },
  {
    path: '/:status/message',
    component: () => import('@/views/message/index'),
    hidden: true
  },
  {
    path: '/:status/friend-link',
    component: () => import('@/views/friend-link/index'),
    hidden: true
  },
  {
    path: '/:status/article/:id',
    component: () => import('@/views/article/index'),
    hidden: true
  },
  {
    path: '/:status/reset-password',
    component: () => import('@/views/reset-password/index'),
    hidden: true
  },
  {
    path: '/:status/email-validate',
    component: () => import('@/views/email-validate/index'),
    hidden: true
  },
  {
    path: '/:status/rebind-mobile',
    component: () => import('@/views/rebind-mobile/index'),
    hidden: true
  },
  {
    path: '/:status/bind-mobile',
    component: () => import('@/views/bind-mobile/index'),
    hidden: true
  },
  {
    path: '/:status/about',
    component: () => import('@/views/about/index'),
    hidden: true
  },
  {
    path: '/:status/terms',
    component: () => import('@/views/terms/index'),
    hidden: true
  },
  {
    path: '/:status/privacy',
    component: () => import('@/views/privacy/index'),
    hidden: true
  },
  {
    path: '/:status/search',
    component: () => import('@/views/search/index'),
    hidden: true
  },
  {
    path: '/:status/email-bind',
    component: () => import('@/views/404'),
    hidden: true
  },
  {
    path: '/:status/oauth',
    component: () => import('@/views/oauth'),
    hidden: true
  },
  {
    path: '/:status/404',
    component: () => import('@/views/404'),
    hidden: true
  },
  {
    path: '/:status/user',
    // component: Layout,
    hidden: true,
    component: () => import('@/views/user/index'),
    // redirect: '/user/info',
/*     children: [{
      path: 'info',
      name: 'Info',
      component: () => import('@/views/user/index'),
      meta: {
        title: '基本信息',
        icon: 'user'
      }
    }] */
  },
  {
    path: '/:status/collect',
    component: Layout,
    children: [{
      path: 'index',
      name: 'collect',
      component: () => import('@/views/collect-manage/index'),
      meta: {
        title: '我的收藏',
        icon: 'collect-manage'
      }
    }]
  }
]

/**
 * 根据用户角色动态加载路由
 */
export const asyncRoutes = [
  {
    path: '/user-manage',
    component: Layout,
    children: [{
      path: 'index',
      name: 'UserManage',
      component: () => import('@/views/user-manage/index'),
      meta: {
        title: '用户管理',
        icon: 'user-manage',
        roles: ['admin']
      }
    }]
  },
  {
    path: '/art-manage',
    component: Layout,
    redirect: 'noRedirect',
    meta: {
      title: '文章管理',
      icon: 'art-manage',
      roles: ['admin']
    },
    children: [{
        path: 'edit',
        name: 'Edit',
        component: () => import('@/views/article-manage/edit'),
        meta: {
          title: '编辑',
          icon: 'art-edit'
        }
      },
      {
        path: 'list',
        name: 'List',
        component: () => import('@/views/article-manage/list'),
        meta: {
          title: '文章',
          icon: 'art-list',
        }
      }
    ]
  },
  {
    path: '/recommend',
    component: Layout,
    children: [{
      path: 'index',
      name: 'RecommendManage',
      component: () => import('@/views/recommend-manage/index'),
      meta: {
        title: '推荐管理',
        icon: 'recommend-manage',
        roles: ['admin']
      }
    }]
  },
  {
    path: '/tag-manage',
    component: Layout,
    children: [{
      path: 'index',
      name: 'TagManage',
      component: () => import('@/views/tag-manage/index'),
      meta: {
        title: '标签管理',
        icon: 'tag-manage',
        roles: ['admin']
      }
    }]
  },
  {
    path: '/category-manage',
    component: Layout,
    children: [{
      path: 'index',
      name: 'CategoryManage',
      component: () => import('@/views/category-manage/index'),
      meta: {
        title: '分类管理',
        icon: 'category-manage',
        roles: ['admin']
      }
    }]
  },
  {
    path: '/friend-link/manage',
    component: Layout,
    children: [{
      path: 'index',
      name: 'FriendChainManage',
      component: () => import('@/views/friend-link-manage/index'),
      meta: {
        title: '友链管理',
        icon: 'friend-chain-manage',
        roles: ['admin']
      }
    }]
  },
  {
    path: '/client',
    component: Layout,
    children: [{
      path: 'index',
      name: 'client',
      component: () => import('@/views/client-manage/index'),
      meta: {
        title: '客户端管理',
        icon: 'client-manage',
        roles: ['admin']
      }
    }]
  },
  {
    path: '/file',
    component: Layout,
    children: [{
      path: 'index',
      name: 'File',
      component: () => import('@/views/file-manage/index'),
      meta: {
        title: '文件管理',
        icon: 'file-manage',
        roles: ['admin']
      }
    }]
  },
  // 404 页面必须放到最后！！！
  {
    path: '*',
    redirect: '/404',
    hidden: true
  }
]

const createRouter = () => new Router({
  // mode: 'history', // require service support
  // 路由滚动位置
  scrollBehavior(to, from, savedPosition) {
    if (savedPosition) {
      return savedPosition
    } else {
      return { x: 0, y: 0 }
    }
  },
  routes: constantRoutes.concat(bjRoutes)
})

const router = createRouter()

/**
 * 重置路由
 */
export function resetRouter() {
  const newRouter = createRouter()
  router.matcher = newRouter.matcher
}

export default router
