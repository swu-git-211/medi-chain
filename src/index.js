import React from 'react';
import ReactDOM from 'react-dom/client';
import { BrowserRouter, Routes, Route } from 'react-router-dom'; // เพิ่มการนำเข้า Routes และ Route

import Home from './components/Home'; // คอมโพเนนต์ที่จะแสดงในหน้าแรก
import Input from './components/Input'; 
import Id from './components/ID'; 

// เริ่มการเรนเดอร์ React app และห่อหุ้มด้วย BrowserRouter
const root = ReactDOM.createRoot(document.getElementById('root'));
root.render(
  <BrowserRouter>
    <Routes> {/* ใช้ Routes เพื่อกำหนดเส้นทาง */}
      <Route path="/" element={<Home />} /> 
      <Route path="/input" element={<Input />} /> 
      <Route path="/:name" element={<Id />} /> {/* ใช้ :ID เพื่อรับค่า ID ใน URL */}
    </Routes>
  </BrowserRouter>
);
