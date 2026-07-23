import { createRouter, createWebHistory } from 'vue-router';
import Dashboard from '../views/Dashboard.vue';
import Login from '../views/Login.vue';
import Signup from '../views/Signup.vue';

const routes = [
  {
    path: '/',
    name: 'Dashboard',
    component: Dashboard,
  },
  {
    path: '/login',
    name: 'Login',
    component: Login,
  },
  {
    path: '/signup',
    name: 'Signup',
    component: Signup,
  }
];

const router = createRouter({
  history: createWebHistory(),
  routes,
});

router.beforeEach((to, from, next) => {
  const token = localStorage.getItem('token');
  // ตัวอย่าง Middleware: ถ้าเข้าหน้า login/signup แต่มี token แล้ว ให้เด้งกลับไปหน้าแรก
  if ((to.name === 'Login' || to.name === 'Signup') && token) {
    next({ name: 'Dashboard' });
  } else {
    next();
  }
});

export default router;
