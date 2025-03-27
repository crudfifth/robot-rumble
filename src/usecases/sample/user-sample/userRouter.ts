import UserList from './views/UserList.vue'
import UserUpdate from './views/UserUpdate.vue'

export const userRouter = [
  {
    path: '/sample/users',
    name: 'Users',
    component: UserList,
  },
  {
    path: '/users/:id/update',
    name: 'UserUpdate',
    component: UserUpdate,
  },
]
