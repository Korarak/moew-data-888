<script setup>
import { ref, computed } from 'vue';

const props = defineProps({
  cats: {
    type: Array,
    required: true
  }
});

const emit = defineEmits(['edit', 'delete']);

const viewMode = ref('card'); // 'card' or 'table'

const handleDelete = (id) => {
  if (confirm('คุณแน่ใจหรือไม่ที่จะลบข้อมูลแมวตัวนี้?')) {
    emit('delete', id);
  }
};
</script>

<template>
  <div>
    <!-- View Toggle -->
    <div class="flex justify-end mb-4 gap-2">
      <button 
        @click="viewMode = 'card'" 
        class="btn btn-sm" 
        :class="viewMode === 'card' ? 'btn-primary' : 'btn-outline'">
        Card View
      </button>
      <button 
        @click="viewMode = 'table'" 
        class="btn btn-sm"
        :class="viewMode === 'table' ? 'btn-primary' : 'btn-outline'">
        Table View
      </button>
    </div>

    <!-- Empty State -->
    <div v-if="cats.length === 0" class="text-center py-10 bg-base-100 rounded-box shadow">
      <p class="text-lg text-base-content/70">ไม่พบข้อมูลแมว</p>
    </div>

    <!-- Card View -->
    <div v-else-if="viewMode === 'card'" class="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
      <div v-for="cat in cats" :key="cat.id" class="card bg-base-100 shadow-xl hover:shadow-2xl transition-shadow">
        <div class="card-body">
          <h2 class="card-title text-primary">
            {{ cat.name }}
            <div class="badge badge-secondary" v-if="cat.status === 'หาบ้าน'">หาบ้าน</div>
            <div class="badge badge-accent" v-else-if="cat.status === 'ว่าง'">ว่าง</div>
            <div class="badge badge-neutral" v-else>มีเจ้าของ</div>
          </h2>
          <div class="flex flex-col gap-1 text-sm mt-2">
            <div><span class="font-bold">เพศ:</span> {{ cat.gender }}</div>
            <div><span class="font-bold">อายุ:</span> {{ cat.age }}</div>
            <div><span class="font-bold">พันธุ์:</span> {{ cat.breed }}</div>
            <div><span class="font-bold">สี:</span> {{ cat.color }}</div>
            <div><span class="font-bold">ที่อยู่:</span> <span class="truncate" :title="cat.address">{{ cat.address || '-' }}</span></div>
          </div>
          <div class="card-actions justify-end mt-4">
            <button @click="$emit('edit', cat)" class="btn btn-sm btn-info">แก้ไข</button>
            <button @click="handleDelete(cat.id)" class="btn btn-sm btn-error">ลบ</button>
          </div>
        </div>
      </div>
    </div>

    <!-- Table View -->
    <div v-else class="overflow-x-auto bg-base-100 rounded-box shadow">
      <table class="table table-zebra w-full">
        <thead>
          <tr>
            <th>ID</th>
            <th>ชื่อ</th>
            <th>เพศ</th>
            <th>อายุ</th>
            <th>พันธุ์</th>
            <th>สี</th>
            <th>สถานะ</th>
            <th class="text-right">จัดการ</th>
          </tr>
        </thead>
        <tbody>
          <tr v-for="cat in cats" :key="cat.id">
            <th>{{ cat.id }}</th>
            <td class="font-semibold">{{ cat.name }}</td>
            <td>{{ cat.gender }}</td>
            <td>{{ cat.age }}</td>
            <td>{{ cat.breed }}</td>
            <td>{{ cat.color }}</td>
            <td>
              <span class="badge badge-sm" 
                    :class="{'badge-secondary': cat.status === 'หาบ้าน', 'badge-accent': cat.status === 'ว่าง'}">
                {{ cat.status }}
              </span>
            </td>
            <td class="text-right flex justify-end gap-2">
              <button @click="$emit('edit', cat)" class="btn btn-xs btn-info">แก้ไข</button>
              <button @click="handleDelete(cat.id)" class="btn btn-xs btn-error">ลบ</button>
            </td>
          </tr>
        </tbody>
      </table>
    </div>
  </div>
</template>
