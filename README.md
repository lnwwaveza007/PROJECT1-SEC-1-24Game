# 24Game

## Scope
เกม 24 คือเกมที่จะสุ่มเลขมา 4 ตัว และผู้เล่นจะต้องทำยังไงก็ได้ ให้เลขทั้ง 4 ตัวกลายเป็นเลข 24 ด้วยการ +, -, × หรือ ÷ นี่คือพื้นฐานของเกมเรา แต่ว่านอกเหนือจากนั้นแล้ว เรายังมีการวางถึงระบบต่างๆ เพิ่มเติม ดังนี้
- ระบบเนื้อเรื่อง อธิบายเล่าเรื่อง
- ระบบเลือกด่าน ตามเนื้อเรื่อง

## รายชื่อ
- 66130500004 ก้องภพ กองแสน
- 66130500012 จรณะ สุขโรจน์
- 66130500015 จิราพัชร สมพรรัตน์พันธ์
- 66130500024 ชิชา อัศวเสวี
- 66130500045 ธีรกานต์ ชูชาติ

## Flow
- ในการทำงานเราจะแบ่งแยก Branch กัน และเมื่อถึงเวลาที่จะต้องรวมผลเราจะใช้การ Pull Request และให้รหัส 012 เป็นผู้ตรวจสอบ และคอยแก้ Merge Conflict ต่างๆ (เนื่องจากเราใช้ไฟล์เดียว app.vue ดังนั้นจึงเกิดขึ้นอยู่บ่อยครั้ง)

## หน้าที่
- 004 [ 20 % ]
  - ดูแลเกมหลักการของตัวเกม 24 ( Logic และ ตัวเกมหลัก )
- 012 [ 20 % ]
  - ดูแลเรื่องการจัดการ Scene ( จัดการฉากหรือเมนูใดที่จะแสดงผล )
  - ดูแลในส่วนของการทำ Responsive สำหรับทุกหน้า
  - สนับสนุนฝ่ายที่ติดปัญหาและประสานโค้ดแต่ละส่วนเข้าด้วยกัน
- 015 [ 20 % ]
  - ดูแลหน้าการเลือกด่าน
  - การออกแบบและกราฟฟิค
- 024 [ 20 % ]
  - ดูแล Main Menu
  - การออกแบบและกราฟฟิค
  - ดูแลหน้า result (เพิ่มเติมงานจาก consult)
  - ระบบหัวใจหน้าใน main game (เพิ่มเติมงานจาก consult)
- 045 [ 20 % ]
  - ดูแลระบบ Story
  - ดูแลระบบเสียงทั้งเกม
  - และการจัดเก็บข้อมูล

## Update
| รหัส | สัปดาห์ที่ 2 | สัปดาห์ที่ 3 | สัปดาห์ที่ 4 | สัปดาห์ที่ 5 |
|------|---------|---------|---------|---------|
| 004  | - ออกแบบระบบการเล่นเกมและ Design หน้า Main game | - ทดสอบ function ของเกมจริงๆว่าตรงกับ Require ของทีมหรือไม่ | - แก้ไข function บางอย่างให้ตรงกับ Require ของทีม | เสร็จงานแล้ว |
| 012  | - ออกแบบระบบการเปลี่ยนหน้าและทดสอบ | - ทดสอบระบบการเปลี่ยนหน้ากับหน้าจริงๆ </br>-ทำระบบโยงเส้นในหน้าเลือกด่าน | - ทำ Responsive ให้กับหน้า Main Game</br>- ปรับเปลี่ยน Design หน้า Main game ให้เหมาะกับการทำ Reponsive  | - ปรับเปลี่ยน Design ของ Main Game เพิ่มเติม</br> - เพิ่มระบบ Timer ให้ตัวเกม เพื่อใช้ต่อกับระบบคะแนน</br> - เชื่อมต่อระบบทุกหน้าเข้าด้วยกัน ให้ตัวเกมทำงานได้จริง </br> - ปรับเปลี่ยน Design หน้า Level ให้เหมาะกับการทำ Responsive  |
| 015  | -ออกแบบDesignหน้าLevelUp  </br> -วางโครงสร้างStarsแต่ละดวง  |สร้างfunction rocket player โดยการทำให้มันขยับได้ทุกที่ที่กด | Update function rocket player ให้ไปแค่ตำแหน่งดาวที่กดเท่านั้น | -เพิ่มfunction ปุ่ม Showplay ให้แสดงแค่เวลาที่กดไปที่ดาวแต่ละดวง </br> -เพิ่มfunction selectLevel ให้แสดงLv1-8 บนดาว|
| 024  | - ออกแบบหน้า main menu | - ทำหน้า main menu |  - ทำหน้า main menu </br> - วางแผนระบบหัวใจเพิ่มเติม  </br> - ออกแบบหน้า result | - ทำระบบหัวใจในหน้า main game </br> - ทำหน้า result |
| 045  | - ออกแบบ logic และหน้า story | - ทำหน้า story พร้อมทั้งระบบ next story | - แก้ไข path and next story method | - ทำระบบ check localStorage เพื่อสร้างเงื่อนไขในการแสดง story เมืื่อ unlocked |

## Features
- กำลังเตรียมข้อมูล

## Manual
- กำลังเตรียมข้อมูล

## Gameplay Video
- กำลังเตรียมข้อมูล

## Reference
- กำลังเตรียมข้อมูล
