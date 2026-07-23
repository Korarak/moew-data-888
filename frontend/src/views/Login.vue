<script setup>
import { ref } from 'vue';
import { useRouter } from 'vue-router';
import { login } from '../services/api';

const router = useRouter();
const username = ref('');
const password = ref('');
const error = ref('');
const loading = ref(false);

const handleLogin = async () => {
  error.value = '';
  loading.value = true;
  try {
    const res = await login(username.value, password.value);
    localStorage.setItem('token', res.token);
    router.push('/');
  } catch (err) {
    error.value = 'ชื่อผู้ใช้หรือรหัสผ่านไม่ถูกต้อง';
  } finally {
    loading.value = false;
  }
};
</script>

<template>
  <div class="max-w-md mx-auto mt-10">
    <div class="card bg-base-100 shadow-xl">
      <div class="card-body">
        <h2 class="card-title text-2xl font-bold mb-4 justify-center">เข้าสู่ระบบ</h2>
        <form @submit.prevent="handleLogin">
          <div class="form-control mb-4">
            <label class="label"><span class="label-text">ชื่อผู้ใช้</span></label>
            <input v-model="username" type="text" class="input input-bordered w-full" required />
          </div>
          <div class="form-control mb-6">
            <label class="label"><span class="label-text">รหัสผ่าน</span></label>
            <input v-model="password" type="password" class="input input-bordered w-full" required />
          </div>
          
          <div v-if="error" class="alert alert-error mb-4 shadow-sm text-sm p-3">
            <span>{{ error }}</span>
          </div>
          
          <div class="form-control mt-2">
            <button class="btn btn-primary w-full" :disabled="loading">
              <span v-if="loading" class="loading loading-spinner"></span>
              เข้าสู่ระบบ
            </button>
          </div>
          
          <p class="text-center mt-4 text-sm">
            ยังไม่มีบัญชี? <router-link to="/signup" class="link link-primary">สมัครสมาชิก</router-link>
          </p>
        </form>
      </div>
    </div>
  </div>
</template>
