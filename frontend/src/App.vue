<script setup>
import { ref, onMounted } from 'vue';
import { getCats, createCat, updateCat, deleteCat } from './services/api';
import FilterBar from './components/FilterBar.vue';
import CatList from './components/CatList.vue';
import CatForm from './components/CatForm.vue';

const cats = ref([]);
const loading = ref(false);
const error = ref(null);

const showForm = ref(false);
const currentCat = ref(null);

const fetchCats = async (filters = {}) => {
  loading.value = true;
  error.value = null;
  try {
    cats.value = await getCats(filters);
  } catch (err) {
    error.value = 'ไม่สามารถโหลดข้อมูลแมวได้';
    console.error(err);
  } finally {
    loading.value = false;
  }
};

const handleFilterChanged = (filters) => {
  fetchCats(filters);
};

const openAddForm = () => {
  currentCat.value = null;
  showForm.value = true;
};

const openEditForm = (cat) => {
  currentCat.value = { ...cat };
  showForm.value = true;
};

const handleSave = async (catData) => {
  try {
    if (currentCat.value && currentCat.value.id) {
      await updateCat(currentCat.value.id, catData);
    } else {
      await createCat(catData);
    }
    showForm.value = false;
    fetchCats(); // reload data
  } catch (err) {
    alert('เกิดข้อผิดพลาดในการบันทึกข้อมูล');
    console.error(err);
  }
};

const handleDelete = async (id) => {
  try {
    await deleteCat(id);
    fetchCats(); // reload data
  } catch (err) {
    alert('เกิดข้อผิดพลาดในการลบข้อมูล');
    console.error(err);
  }
};

onMounted(() => {
  fetchCats();
});
</script>

<template>
  <div class="min-h-screen bg-base-200 p-4 md:p-8">
    <div class="max-w-7xl mx-auto">
      <div class="flex justify-between items-center mb-8">
        <div>
          <h1 class="text-4xl font-bold text-primary">Moew Data 🐱</h1>
          <p class="text-base-content/70 mt-2">ระบบบันทึกข้อมูลแมวจร/แมวหาบ้าน</p>
        </div>
        <button @click="openAddForm" class="btn btn-primary">
          + เพิ่มข้อมูลแมว
        </button>
      </div>

      <FilterBar @filter-changed="handleFilterChanged" />

      <div v-if="loading" class="flex justify-center py-20">
        <span class="loading loading-spinner loading-lg text-primary"></span>
      </div>
      
      <div v-else-if="error" class="alert alert-error shadow-lg my-4">
        <span>{{ error }}</span>
        <button @click="fetchCats()" class="btn btn-sm">ลองใหม่</button>
      </div>
      
      <CatList 
        v-else 
        :cats="cats" 
        @edit="openEditForm" 
        @delete="handleDelete" 
      />

      <CatForm 
        :show="showForm" 
        :cat="currentCat" 
        @save="handleSave" 
        @cancel="showForm = false" 
      />
    </div>
  </div>
</template>
