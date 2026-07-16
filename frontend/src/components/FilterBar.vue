<script setup>
import { ref } from 'vue';

const props = defineProps({
  initialFilters: {
    type: Object,
    default: () => ({ search: '', gender: '', status: '' })
  }
});

const emit = defineEmits(['filter-changed']);

const filters = ref({ ...props.initialFilters });

const applyFilters = () => {
  emit('filter-changed', { ...filters.value });
};

const clearFilters = () => {
  filters.value = { search: '', gender: '', status: '' };
  applyFilters();
};
</script>

<template>
  <div class="bg-base-100 p-4 rounded-box shadow flex flex-col md:flex-row gap-4 mb-6">
    <div class="form-control flex-1">
      <input 
        v-model="filters.search" 
        @keyup.enter="applyFilters"
        type="text" 
        placeholder="ค้นหาชื่อ, พันธุ์, หรือสี..." 
        class="input input-bordered w-full" 
      />
    </div>
    
    <select v-model="filters.gender" @change="applyFilters" class="select select-bordered w-full md:w-auto">
      <option value="">ทุกเพศ</option>
      <option value="ผู้">ตัวผู้</option>
      <option value="เมีย">ตัวเมีย</option>
    </select>
    
    <select v-model="filters.status" @change="applyFilters" class="select select-bordered w-full md:w-auto">
      <option value="">ทุกสถานะ</option>
      <option value="ว่าง">ว่าง</option>
      <option value="หาบ้าน">หาบ้าน</option>
      <option value="มีเจ้าของแล้ว">มีเจ้าของแล้ว</option>
    </select>
    
    <div class="flex gap-2">
      <button @click="applyFilters" class="btn btn-primary">ค้นหา</button>
      <button @click="clearFilters" class="btn btn-ghost">ล้าง</button>
    </div>
  </div>
</template>
