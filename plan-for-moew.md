# แผนการพัฒนาระบบบันทึกข้อมูล Moew (แมว)

## 🛠 Tech Stack

**Backend:**
- Express.js (Node.js)
- RESTful API
- Database: MySQL (หรือ PostgreSQL)

**Frontend:**
- Vue.js + Vite
- Tailwind CSS
- DaisyUI

---

## ✨ ฟีเจอร์ของระบบ

**1. ระบบ Authentication:**
- **Sign Up**: สมัครสมาชิก
- **Login**: เข้าสู่ระบบด้วย JWT (JSON Web Token)

**2. ระบบจัดการข้อมูลแมว (CRUD Operations):**
- **C**reate: เพิ่มข้อมูลแมวเข้าสู่ระบบ
- **R**ead: ดูข้อมูลแมวทั้งหมด และดูรายละเอียดข้อมูลของแมวแต่ละตัว
- **U**pdate: แก้ไขข้อมูลแมวที่บันทึกไว้แล้ว
- **D**elete: ลบข้อมูลแมวออกจากระบบ

**3. ฟังก์ชันการค้นหาและกรองข้อมูล (Search & Filter):**
- สามารถค้นหาและกรองข้อมูลแมวได้จาก:
  - เพศ
  - สี
  - อายุ
  - พันธุ์
  - ที่อยู่
  - สถานะ (เช่น ว่าง, หาบ้าน, มีเจ้าของแล้ว)

**4. การแสดงผล (Display Modes):**
- แสดงผลในรูปแบบ **Card** สำหรับการดูข้อมูลแบบสวยงาม
- แสดงผลในรูปแบบ **Table** สำหรับการดูข้อมูลเป็นรายการตาราง

---

## 🐳 Infrastructure & Deployment

- รองรับการรันด้วย **Docker** และ **Docker Compose**
- จัดทำ `Dockerfile` สำหรับทั้งฝั่ง Backend และ Frontend เพื่อความสะดวกในการตั้งค่า environment

---

## 👥 ขั้นตอนการทำงานร่วมกัน (Team Collaboration)

- ใช้งาน **GitHub** เป็น Version Control หลัก
- ทีมมีสมาชิก 2 คน
- มีการแบ่ง Branch ในการทำงานร่วมกันอย่างเป็นระบบ (เช่น `main`, `dev`, `feature/*`, `bugfix/*`)
- การนำโค้ดมารวมกันจะผ่านการสร้าง Pull Request เพื่อตรวจทานการเปลี่ยนแปลง