import { createRouter, createWebHistory } from 'vue-router'
import Login from '@/usecases/common/login/views/Login.vue'
import PasswordReset from '@/usecases/common/password-reset/views/PasswordReset.vue'
import Dashboard from '@/usecases/common/dashboard/views/Dashboard.vue'
import { useAuthStore } from '@/usecases/shared/stores/authStore'
import { ROUTE_NAMES } from '@/usecases/shared/router/routeNames'
import UserList from '@/usecases/sample/users/views/UserList.vue'
import UserDetail from '@/usecases/sample/users/views/UserDetail.vue'
import UserCreate from '@/usecases/sample/users/views/UserCreate.vue'
import Home from '@/usecases/common/home/views/Home.vue'
import { fileRouter } from '@/usecases/sample/file-sample/fileRouter'
import { userRouter } from '@/usecases/sample/user-sample/userRouter'
const baseRoutes = [
  {
    path: '/',
    redirect: '/login',
  },
  {
    path: '/login',
    name: ROUTE_NAMES.LOGIN,
    component: Login,
    meta: { title: 'ログイン', requiresAuth: false },
  },
  {
    path: '/password-reset',
    name: ROUTE_NAMES.PASSWORD_RESET,
    component: PasswordReset,
    meta: { title: 'パスワードリセット', requiresAuth: false },
  },
  {
    path: '/dashboard',
    name: ROUTE_NAMES.DASHBOARD,
    component: Dashboard,
    meta: { title: 'ホーム', requiresAuth: true },
  },
  {
    path: '/users',
    name: ROUTE_NAMES.USER_LIST,
    component: UserList,
    meta: { title: 'ユーザー一覧', requiresAuth: true },
  },
  {
    path: '/users/:id',
    name: ROUTE_NAMES.USER_DETAIL,
    component: UserDetail,
    meta: { title: 'ユーザー詳細', requiresAuth: true },
    props: true,
  },
  {
    path: '/users/create',
    name: ROUTE_NAMES.USER_CREATE,
    component: UserCreate,
    meta: { title: 'ユーザー作成', requiresAuth: true },
  },
]

const sampleRouter = [
  {
    path: '/sample',
    name: 'Home',
    component: Home,
    meta: { title: 'サンプル', requiresAuth: true },
  },
  {
    path: '/sample/files',
    children: fileRouter,
    meta: { title: 'ファイル管理', requiresAuth: true },
  },
  {
    path: '/sample/users',
    children: userRouter,
    meta: { title: 'ユーザ管理', requiresAuth: true },
  },
]
const appRouters = [...baseRoutes, ...sampleRouter]
const router = createRouter({
  history: createWebHistory(),
  routes: appRouters,
})

router.beforeEach((to, _from, next) => {
  const authStore = useAuthStore()
  if (to.meta.requiresAuth && !authStore.token) {
    next('/login')
  } else {
    next()
  }
})

export default router
