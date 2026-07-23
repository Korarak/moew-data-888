const { pool } = require('./db');

const mockCats = [
  { name: 'ส้มจี๊ด', gender: 'ผู้', color: 'ส้ม', age: '1 ปี', breed: 'แมวไทย', address: 'กรุงเทพมหานคร', status: 'ว่าง' },
  { name: 'นวล', gender: 'เมีย', color: 'ขาว', age: '2 ปี', breed: 'เปอร์เซีย', address: 'เชียงใหม่', status: 'หาบ้าน' },
  { name: 'ดำดอทคอม', gender: 'ผู้', color: 'ดำ', age: '3 เดือน', breed: 'แมวไทย', address: 'ภูเก็ต', status: 'ว่าง' },
  { name: 'ทองกวาว', gender: 'เมีย', color: 'น้ำตาล', age: '5 ปี', breed: 'วิเชียรมาศ', address: 'ระยอง', status: 'มีเจ้าของแล้ว' },
  { name: 'มัฟฟิน', gender: 'เมีย', color: 'สามสี', age: '1.5 ปี', breed: 'สก็อตติช โฟลด์', address: 'ขอนแก่น', status: 'หาบ้าน' },
  { name: 'เสือ', gender: 'ผู้', color: 'ลายสลิด', age: '2 เดือน', breed: 'แมวไทย', address: 'กรุงเทพมหานคร', status: 'หาบ้าน' },
  { name: 'กะทิ', gender: 'ผู้', color: 'ขาว', age: '3 ปี', breed: 'ขาวมณี', address: 'ชลบุรี', status: 'ว่าง' },
  { name: 'ชิโร่', gender: 'ผู้', color: 'ขาว', age: '4 เดือน', breed: 'อเมริกันชอร์ตแฮร์', address: 'กรุงเทพมหานคร', status: 'มีเจ้าของแล้ว' },
  { name: 'คุโระ', gender: 'ผู้', color: 'ดำ', age: '1 ปี 2 เดือน', breed: 'บริติชชอร์ตแฮร์', address: 'เชียงใหม่', status: 'ว่าง' },
  { name: 'ชาเย็น', gender: 'เมีย', color: 'ส้ม-ขาว', age: '5 เดือน', breed: 'สก็อตติช โฟลด์', address: 'นนทบุรี', status: 'หาบ้าน' },
  { name: 'มีมี่', gender: 'เมีย', color: 'ขาว-ดำ', age: '2 ปี', breed: 'แมวไทย', address: 'สมุทรปราการ', status: 'มีเจ้าของแล้ว' },
  { name: 'ปุยฝ้าย', gender: 'เมีย', color: 'ขาว', age: '1 เดือน', breed: 'เปอร์เซีย', address: 'ปทุมธานี', status: 'หาบ้าน' },
  { name: 'ลัคกี้', gender: 'ผู้', color: 'ส้ม', age: '8 เดือน', breed: 'เอ็กโซติก ชอร์ตแฮร์', address: 'นครราชสีมา', status: 'หาบ้าน' },
  { name: 'ลูน่า', gender: 'เมีย', color: 'เทา', age: '3 ปี', breed: 'รัสเซียนบลู', address: 'สงขลา', status: 'มีเจ้าของแล้ว' },
  { name: 'ซาบะ', gender: 'ผู้', color: 'เทา-ขาว', age: '1 ปี', breed: 'แมวไทย', address: 'อุดรธานี', status: 'ว่าง' }
];

async function seed() {
  try {
    for (const cat of mockCats) {
      await pool.query(
        'INSERT INTO cats (name, gender, color, age, breed, address, status) VALUES (?, ?, ?, ?, ?, ?, ?)',
        [cat.name, cat.gender, cat.color, cat.age, cat.breed, cat.address, cat.status]
      );
    }
    console.log('Mock data inserted successfully!');
    process.exit(0);
  } catch (error) {
    console.error('Error seeding data:', error);
    process.exit(1);
  }
}

seed();
