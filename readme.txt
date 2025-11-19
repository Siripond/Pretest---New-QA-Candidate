1) วิธีการติดตั้งเครื่องมือหรือ dependency

==== เช็คว่ามี Node หรือไม่ ====
ดาวน์โหลด Node.js >> https://nodejs.org/
ขั้นตอนใน Windows:
1. กด Next
2. ติ๊ก "Install"
3. รอ
4. เสร็จ

เปิด Command Prompt เพื่อเช็คว่า มี Node แล้วหรือยัง
node -v

====  A. กรณี เริ่มใหม่ ====
1. ติดตั้ง Cypress
npm init -y
npm install cypress --save-dev

2. เปิด Cypress
npx cypress open

3. เริ่มต้นเขียนคำสั่ง

ฺ==== B. กรณี Pull จาก git ====
1. git clone https://github.com/Siripond/Pretest---New-QA-Candidate.git

2. เปิด Cypress
npx cypress open


2) คำสั่งในการรันสคริปต์ทดสอบ
2.1 >> เปิด Cypress
npx cypress open


3) วิธีการดูผลการทดสอบ / รายงานผล (Test Report)
3.1  ใช้ npx cypress open เพื่อดูผลการทดสอบเบื้องต้น
3.2  ผลแคปหน้าจอ อยู่ในโฟลเดอร์ "screenshots"
3.3  ผลการทดสอบ https://cloud.cypress.io/projects/gh9pou/runs/1
3.4  หรือดูจาก npx cypress run --record --key c613ab4e-5d2f-461e-a6cc-b9fc530ba892
3.5  ไฟล์ testcase & test result อยู่ใน โฟล์เดอร์ e2e >> Pretest_New_QA_Candidate_TestCases.xlsx