<script setup>
import { computed } from 'vue';
import { useRouter } from 'vue-router';

const router = useRouter();

const isAuthenticated = computed(() => {
  return !!localStorage.getItem('token');
});

const logout = () => {
  localStorage.removeItem('token');
  router.push('/login');
};
</script>

<template>
  <div class="min-h-screen bg-base-200">
    <div class="navbar bg-base-100 shadow-sm max-w-7xl mx-auto">
      <div class="flex-1">
        <router-link to="/" class="btn btn-ghost text-xl">Moew 🐱</router-link>
      </div>
      <div class="flex-none">
        <ul class="menu menu-horizontal px-1">
          <li v-if="!isAuthenticated"><router-link to="/login">เข้าสู่ระบบ</router-link></li>
          <li v-if="!isAuthenticated"><router-link to="/signup">สมัครสมาชิก</router-link></li>
          <li v-if="isAuthenticated"><a @click="logout" class="text-error">ออกจากระบบ</a></li>
        </ul>
      </div>
    </div>
    
    <div class="p-4 md:p-8">
      <router-view />
    </div>
  </div>
</template>

