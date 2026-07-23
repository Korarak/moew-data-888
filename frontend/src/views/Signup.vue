<script setup>
import { ref } from 'vue';
import { useRouter } from 'vue-router';
import { signup } from '../services/api';

const router = useRouter();
const username = ref('');
const password = ref('');
const confirmPassword = ref('');
const error = ref('');
const loading = ref(false);
const successMessage = ref('');

const handleSignup = async () => {
  error.value = '';
  successMessage.value = '';
  
  if (password.value !== confirmPassword.value) {
    error.value = 'รหัสผ่านไม่ตรงกัน';
    return;
  }

  loading.value = true;
  try {
    await signup(username.value, password.value);
    successMessage.value = 'สมัครสมาชิกสำเร็จ! กำลังพาไปหน้าเข้าสู่ระบบ...';
    setTimeout(() => {
      router.push('/login');
    }, 2000);
  } catch (err) {
    error.value = 'เกิดข้อผิดพลาดในการสมัครสมาชิก (อาจมีชื่อผู้ใช้นี้แล้ว)';
  } finally {
    loading.value = false;
  }
};
</script>

<template>
  <div class="max-w-md mx-auto mt-10">
    <div class="card bg-base-100 shadow-xl">
      <div class="card-body">
        <h2 class="card-title text-2xl font-bold mb-4 justify-center">สมัครสมาชิก</h2>
        <form @submit.prevent="handleSignup">
          <div class="form-control mb-4">
            <label class="label"><span class="label-text">ชื่อผู้ใช้</span></label>
            <input v-model="username" type="text" class="input input-bordered w-full" required minlength="3" />
          </div>
          <div class="form-control mb-4">
            <label class="label"><span class="label-text">รหัสผ่าน</span></label>
            <input v-model="password" type="password" class="input input-bordered w-full" required minlength="6" />
          </div>
          <div class="form-control mb-6">
            <label class="label"><span class="label-text">ยืนยันรหัสผ่าน</span></label>
            <input v-model="confirmPassword" type="password" class="input input-bordered w-full" required minlength="6" />
          </div>
          
          <div v-if="error" class="alert alert-error mb-4 shadow-sm text-sm p-3">
            <span>{{ error }}</span>
          </div>
          <div v-if="successMessage" class="alert alert-success mb-4 shadow-sm text-sm p-3">
            <span>{{ successMessage }}</span>
          </div>
          
          <div class="form-control mt-2">
            <button class="btn btn-primary w-full" :disabled="loading || !!successMessage">
              <span v-if="loading" class="loading loading-spinner"></span>
              สมัครสมาชิก
            </button>
          </div>
          
          <p class="text-center mt-4 text-sm">
            มีบัญชีอยู่แล้ว? <router-link to="/login" class="link link-primary">เข้าสู่ระบบ</router-link>
          </p>
        </form>
      </div>
    </div>
  </div>
</template>
