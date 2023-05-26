import router from './router'
import store from './store'
import { Message } from 'element-ui'
import NProgress from 'nprogress'
import 'nprogress/nprogress.css'
import { getAccessToken } from '@/utils/auth'
import getPageTitle from '@/utils/get-page-title'
import pathToRegexp from 'path-to-regexp'
import { bindEmail } from '@/api/user.js'

NProgress.configure({ showSpinner: false })
// 免登录白名单
const whiteList = ['/', '/tag', '/category', '/archives', '/finance', '/building', '/use', '/policy-search', '/policy-report', '/policy-cul/:type','/policy-match/:type', '/user/info', '/finance-detail/:id','/building-detail/:id',
'/picture-detail', '/picture-detail2', '/picture-detail3', '/new-detail', '/new-more', '/teacher-detail', '/new-detail/:artId', '/policy-detail/:artId', '/collage-detail/:collageId', '/business-detail/:id', '/protect-detail/:id', 
'/message', '/friend-link', '/article/:id', '/reset-password', '/about', '/search', '/terms', '/privacy', '/email-bind', '/404', '/oauth', '/beijing', '/beijing/tag', '/beijing/category', '/beijing/archives', '/beijing/finance', '/beijing/building', '/beijing/use', '/beijing/policy-search', '/beijing/policy-report', '/beijing/policy-cul/:type','/beijing/policy-match/:type', '/beijing/user/info', '/beijing/finance-detail/:id','/beijing/building-detail/:id',
'/beijing/picture-detail', '/beijing/picture-detail2', '/beijing/picture-detail3', '/beijing/new-detail', '/beijing/new-more', '/beijing/teacher-detail', '/beijing/new-detail/:artId', '/beijing/policy-detail/:artId', '/beijing/collage-detail/:collageId', '/beijing/business-detail/:id', '/beijing/protect-detail/:id', 
'/beijing/message', '/beijing/friend-link', '/beijing/article/:id', '/beijing/reset-password', '/beijing/about', '/beijing/search', '/beijing/terms', '/beijing/privacy', '/beijing/email-bind', '/shijingshan', '/shijingshan/tag', '/shijingshan/category', '/shijingshan/archives', '/shijingshan/finance', '/shijingshan/building', '/shijingshan/use', '/shijingshan/policy-search', '/shijingshan/policy-report', '/shijingshan/policy-cul/:type','/shijingshan/policy-match/:type', '/shijingshan/user/info', '/shijingshan/finance-detail/:id','/shijingshan/building-detail/:id',
'/shijingshan/picture-detail', '/shijingshan/picture-detail2', '/shijingshan/picture-detail3', '/shijingshan/new-detail', '/shijingshan/new-more', '/shijingshan/teacher-detail', '/shijingshan/new-detail/:artId', '/shijingshan/policy-detail/:artId', '/shijingshan/collage-detail/:collageId', '/shijingshan/business-detail/:id', '/shijingshan/protect-detail/:id', 
'/shijingshan/message', '/shijingshan/friend-link', '/shijingshan/article/:id', '/shijingshan/reset-password', '/shijingshan/about', '/shijingshan/search', '/shijingshan/terms', '/shijingshan/privacy', '/shijingshan/email-bind','/chaoyang', '/chaoyang/tag', '/chaoyang/category', '/chaoyang/archives', '/chaoyang/finance', '/chaoyang/building', '/chaoyang/use', '/chaoyang/policy-search', '/chaoyang/policy-report', '/chaoyang/policy-cul/:type','/chaoyang/policy-match/:type', '/chaoyang/user/info', '/chaoyang/finance-detail/:id','/chaoyang/building-detail/:id',
'/chaoyang/picture-detail', '/chaoyang/picture-detail2', '/chaoyang/picture-detail3', '/chaoyang/new-detail', '/chaoyang/new-more', '/chaoyang/teacher-detail', '/chaoyang/new-detail/:artId', '/chaoyang/policy-detail/:artId', '/chaoyang/collage-detail/:collageId', '/chaoyang/business-detail/:id', '/chaoyang/protect-detail/:id', 
'/chaoyang/message', '/chaoyang/friend-link', '/chaoyang/article/:id', '/chaoyang/reset-password', '/chaoyang/about', '/chaoyang/search', '/chaoyang/terms', '/chaoyang/privacy', '/chaoyang/email-bind']

router.beforeEach(async(to, from, next) => {
  // debugger;
  /* try {

    let ip4 = await publicIp.v4();
    // console.log('ip45----', ip4);
    window.handleResponse = function (response) {
      let {x, y} = response.content.point;
      console.log('data---', response.content.point);
      var script = document.createElement('script');
      script.src = `https://api.map.baidu.com/place/v2/search?query=区&region=北京&output=json&center=${y},${x}&ak=wG6VDtVecU2vdgXQmNIswVrNHnl3oKNv&callback=handleResponse1`;
      document.body.insertBefore(script, document.body.firstChild);
    };
    window.handleResponse1 = function (response) {
      console.log('data1---', response);
    }
    var script = document.createElement('script');
    script.src = `https://api.map.baidu.com/location/ip?ak=wG6VDtVecU2vdgXQmNIswVrNHnl3oKNv&ip=${ip4}&coor=bd09ll&callback=handleResponse`;
    document.body.insertBefore(script, document.body.firstChild);
  } catch (error) {
    console.log('error---', error);
  } */

  // 百度统计
  if (window.location.hostname === 'www.poile.cn' && to.path) {
    if (window._hmt) {
        window._hmt.push(['_trackPageview', '/#' + to.fullPath]);
    } else {
        var _hmt = [];
        window._hmt = _hmt;
        (function () {
            let hm = document.createElement('script');
            hm.src = 'https://hm.baidu.com/hm.js?0365897af075de8b1b3ba64f3cc7b423';
            let s = document.getElementsByTagName('script')[0];
            s.parentNode.insertBefore(hm, s);
      })();
    }
  }

  // 进度条开始
  NProgress.start()

  // 获取AccessToken，判断是否已登录
  const hasAccessToken = getAccessToken()

  // 是否邮箱绑定路由, 邮箱绑定成功如果有token则刷新用户信息
  // 并且跳转用户信息页，没token跳回首页，绑定失败或没获取到code跳404
  if (pathToRegexp('/email-bind').exec(to.path)) {
    const code = to.query.code
    if (code) {
      const params = { code: code }
      let result = true
      await bindEmail(params).then(
        res => {
          result = true
        },
        error => {
          result = false
        }
      )
      if (!result) {
        next('/404')
        NProgress.done()
      }
      if (result && hasAccessToken) {
         // 获取用户线信息，从用户信息中获取角色
        const { roles } = await store.dispatch('user/getUserInfo')
        // 根据角色动态加载路由
        const accessRoutes = await store.dispatch('permission/generateRoutes', ["ordinary"])
        // 添加动态路由
        router.addRoutes(accessRoutes)
        next('/user/info')
        NProgress.done()
      }
      if (result && !hasAccessToken) {
        next('/')
        NProgress.done()
      }
    }
  }

  // 页面标题
  document.title = getPageTitle(to.meta.title)

  if (hasAccessToken) {
      // 获取角色，判断是否已调获取用户信息接口
      const hasRoles = store.getters.roles && store.getters.roles.length > 0
      if (hasRoles) {
        next()
      } else {
        try {
          // 获取用户线信息，从用户信息中获取角色
          const { roles } = await store.dispatch('user/getUserInfo')

          // 根据角色动态加载路由
          const accessRoutes = await store.dispatch('permission/generateRoutes', ["ordinary"])

          // 添加动态路由
          router.addRoutes(accessRoutes)

          next({ ...to, replace: true })
        } catch (error) {
          // 获取用户信息失败重置登录信息
          await store.dispatch('user/resetToken')
          Message.error(error || 'Has Error')
          // 跳回首页
          next('/')
          NProgress.done()
        }
      }
  } else {
    // 未登录，并且路径存在免登录白名单中
    const included = whiteList.some( ele => pathToRegexp(ele).exec(to.path) )
    if (included) {
      next()
    } else {
      const path = to.matched.length === 0 ? '/404' : '/'
      next(path)
      NProgress.done()
    }
  }
})

router.afterEach(() => {
  // 进度条结束
  NProgress.done()
})
