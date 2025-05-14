import Vue from 'vue';
import VueRouter from 'vue-router';

Vue.use(VueRouter);

import Layout from '@/layouts';
import mainLayout from '@/layouts/mainLayout';
import echartRouter from './modules/echarts';
import componentsRouter from './modules/components';
import nestRouter from './modules/nest';

//基础路由
export const baseRoute = [
  {
    name: 'login',
    path: '/login',
    component: () => import('@/views/login/index'),
    hidden: true
  },
  {
    path: '/403',
    component: () => import('@/views/error/403'),
    hidden: true
  },
  {
    path: '/404',
    component: () => import('@/views/error/404'),
    hidden: true
  },
  {
    path: '/500',
    component: () => import('@/views/error/500'),
    hidden: true
  }
];

export const asyncRoutes = [
  {
    path: '/',
    component: Layout,
    redirect: '/index',
    hidden: true,
    children: [
      {
        name: 'index',
        path: '/index',
        component: () => import('@/views/index/index'),
        meta: {
          role: 1,
          title: '综合信息',
          icon: 'visualAnalysis'
        }
      },
      {
        name: 'deviceMonitor',
        path: '/deviceMonitor',
        component: () => import('@/views/deviceMonitor/index'),
        meta: {
          role: 2,
          title: '设备监控',
          icon: 'monitor'
        }
      },
      {
        name: '/camera-home',
        path: '/camera-home',
        component: () => import('@/views/camera/CameraHome.vue'),
        meta: {
          role: 4,
          title: '摄像',
          icon: 'webGl'
        },
        children: [
          {
            name: 'camera',
            path: '/camera',
            component: () => import('@/views/camera/index.vue'),
            meta: {
              role: 6,
              title: '监控摄像',
              icon: 'webGl'
            }
          },
          {
            name: 'camera-page',
            path: '/camera-page',
            component: () => import('@/views/camera/CameraPage.vue'),
            meta: {
              role: 6,
              title: '详细摄像',
              icon: 'webGl'
            }
          },
          {
            name: 'accident-detection',
            path: '/accident-detection',
            component: () => import('@/views/camera/AccidentDetection.vue'),
            meta: {
              role: 6,
              title: '事故处理',
              icon: 'webGl'
            }
          }
        ],
      },
      {
        name: 'eventsPage',
        component: () => import('@/views/eventsPage/index.vue'),
        path: '/eventsPage',
        meta: {
          role: 3,
          title: '事件管理',
          icon: 'taskManage'
        }
      },
      {
        name: 'warningProcess',
        path: '/warningProcess',
        component: () => import('@/views/warningProcess/index'),
        meta: {
          role: 5,
          title: '预警处理',
          icon: 'warningprocess'
        }
      },
      
      /*       {
        name: 'correlation',
        path: '/correlation',
        component: () => import('@/views/correlation/index'),
        meta: {
          role: 3,
          title: '关联分析',
          icon: 'correlation'
        }
      }, */
      /*       {
        name: 'taskManage',
        path: '/taskManage',
        component: () => import('@/views/taskManage/index'),
        meta: {
          role: 4,
          title: '交通事件管理', //taskManage
          icon: 'taskManage'
        }
      }, */

      /*       {
        name: 'webGl',
        component: () => import('@/views/webGl/ArcGis/index'),
        path: '/webGl',
        meta: {
          role: 4,
          title: '地图',
          icon: 'webGl'
        }
      } */
    ]
  },
  { path: '*', redirect: '/404', hidden: true }
];

const createRouter = function () {
  return new VueRouter({
    routes: baseRoute,
    scrollBehavior: () => ({ y: 0 })
  });
};

const router = createRouter();

export function resetRouter() {
  router.matcher = createRouter().matcher;
}

//重定向时报错，用这个不让他报错
const originalPush = VueRouter.prototype.push;
VueRouter.prototype.push = function push(location, onResolve, onReject) {
  if (onResolve || onReject) return originalPush.call(this, location, onResolve, onReject);
  return originalPush.call(this, location).catch(err => err);
};

export default router;
