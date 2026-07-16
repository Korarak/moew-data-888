<script setup>
import { ref, watch } from 'vue';

const props = defineProps({
  cat: {
    type: Object,
    default: null
  },
  show: {
    type: Boolean,
    default: false
  }
});

const emit = defineEmits(['save', 'cancel']);

const formData = ref({
  name: '',
  gender: 'ผู้',
  color: '',
  age: '',
  breed: '',
  address: '',
  status: 'ว่าง'
});

const resetForm = () => {
  formData.value = {
    name: '',
    gender: 'ผู้',
    color: '',
    age: '',
    breed: '',
    address: '',
    status: 'ว่าง'
  };
};

watch(() => props.cat, (newCat) => {
  if (newCat) {
    formData.value = { ...newCat };
  } else {
    resetForm();
  }
}, { immediate: true });

const handleSubmit = () => {
  emit('save', { ...formData.value });
};
</script>

<template>
  <dialog class="modal" :class="{'modal-open': show}">
    <div class="modal-box w-11/12 max-w-2xl">
      <h3 class="font-bold text-lg mb-4">{{ cat ? 'แก้ไขข้อมูลแมว' : 'เพิ่มข้อมูลแมวใหม่' }}</h3>
      
      <form @submit.prevent="handleSubmit" class="space-y-4">
        <div class="grid grid-cols-1 md:grid-cols-2 gap-4">
          <div class="form-control w-full">
            <label class="label"><span class="label-text">ชื่อแมว</span></label>
            <input v-model="formData.name" type="text" required class="input input-bordered w-full" />
          </div>
          
          <div class="form-control w-full">
            <label class="label"><span class="label-text">เพศ</span></label>
            <select v-model="formData.gender" required class="select select-bordered w-full">
              <option value="ผู้">ตัวผู้</option>
              <option value="เมีย">ตัวเมีย</option>
            </select>
          </div>
          
          <div class="form-control w-full">
            <label class="label"><span class="label-text">สี</span></label>
            <input v-model="formData.color" type="text" required class="input input-bordered w-full" />
          </div>
          
          <div class="form-control w-full">
            <label class="label"><span class="label-text">อายุ (เช่น 2 เดือน, 1 ปี)</span></label>
            <input v-model="formData.age" type="text" required class="input input-bordered w-full" />
          </div>
          
          <div class="form-control w-full">
            <label class="label"><span class="label-text">พันธุ์</span></label>
            <input v-model="formData.breed" type="text" required class="input input-bordered w-full" />
          </div>
          
          <div class="form-control w-full">
            <label class="label"><span class="label-text">สถานะ</span></label>
            <select v-model="formData.status" required class="select select-bordered w-full">
              <option value="ว่าง">ว่าง</option>
              <option value="หาบ้าน">หาบ้าน</option>
              <option value="มีเจ้าของแล้ว">มีเจ้าของแล้ว</option>
            </select>
          </div>
        </div>
        
        <div class="form-control w-full">
          <label class="label"><span class="label-text">ที่อยู่ปัจจุบัน</span></label>
          <textarea v-model="formData.address" class="textarea textarea-bordered h-24 w-full"></textarea>
        </div>
        
        <div class="modal-action">
          <button type="button" @click="$emit('cancel')" class="btn">ยกเลิก</button>
          <button type="submit" class="btn btn-primary">บันทึกข้อมูล</button>
        </div>
      </form>
    </div>
    <form method="dialog" class="modal-backdrop" @click="$emit('cancel')">
      <button>close</button>
    </form>
  </dialog>
</template>
