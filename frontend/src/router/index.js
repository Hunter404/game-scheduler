import { createRouter, createWebHashHistory } from 'vue-router'

const routes = [
  {
    name: 'schedule',
    path: '/schedule',
    children: [
      {
        name: 'schedule.create',
        path: 'create',
        component: () => import("@/views/Create.vue"),
      },
      {
        name: 'schedule.register',
        path: ':id/register',
        component: () => import("@/views/Register.vue"),
      },
      {
        name: 'schedule.results',
        path: ':id',
        component: () => import("@/views/Results.vue"),
      }
    ]
  }
]

const router = createRouter({
  history: createWebHashHistory(),
  routes,
})

export default router
