import React, { useEffect, useState } from 'react';
import { Container, Typography, Grid, Card, CardContent, Button, Box } from '@mui/material';
import { useNavigate, useParams } from 'react-router-dom';
import Fuse from 'fuse.js';  // นำเข้า Fuse.js
import { getMedicineCount, getMedicine } from '../contract';

const MedicineList = () => {
  const { name } = useParams();  // ดึงชื่อยา (commonName) จาก URL
  const navigate = useNavigate();  // ใช้ในการนำทางไปหน้าอื่น
  const [medicines, setMedicines] = useState([]);
  const [filteredMedicines, setFilteredMedicines] = useState([]); // สร้าง state สำหรับยาที่ถูกค้นหา
  const [medicineCount, setMedicineCount] = useState(0);

  // ดึงจำนวนข้อมูลยาจาก Smart Contract
  const fetchMedicineCount = async () => {
    const count = await getMedicineCount();
    setMedicineCount(count);
  };

  // ดึงข้อมูลยา
  const fetchMedicines = async () => {
    let medicineArray = [];
    for (let i = 1; i <= medicineCount; i++) {
      const medicine = await getMedicine(i);  // ดึงข้อมูลยา
      medicineArray.push(medicine);
    }
    setMedicines(medicineArray);
  };

  // ฟังก์ชันการค้นหาโดยใช้ Fuse.js เพื่อทำ fuzzy search
  const searchMedicine = () => {
    if (name && medicines.length > 0) {
      const fuse = new Fuse(medicines, {
        keys: ['commonName', 'tradeName'], // ค้นหาจากทั้ง commonName และ tradeName
        threshold: 0.4, // ค่า threshold สำหรับควบคุมระดับความคล้ายคลึง (ยิ่งน้อยยิ่งต้องใกล้เคียง)
      });

      const result = fuse.search(name);
      if (result.length > 0) {
        setFilteredMedicines(result.map(res => res.item));  // แสดงผลลัพธ์ที่ค้นพบ
      } else {
        setFilteredMedicines([]);  // ถ้าไม่พบข้อมูลยา
      }
    } else {
      setFilteredMedicines(medicines); // ถ้าไม่มีการค้นหา ให้แสดงทั้งหมด
    }
  };

  useEffect(() => {
    fetchMedicineCount();
  }, []);

  useEffect(() => {
    if (medicineCount > 0) {
      fetchMedicines();
    }
    // eslint-disable-next-line
  }, [medicineCount]);

  useEffect(() => {
    if (medicines.length > 0) {
      console.log("กำลังค้นหาข้อมูลสำหรับชื่อ:", name); // ตรวจสอบชื่อที่ใช้ค้นหา
      console.log("รายการยาที่ใช้ในการค้นหา:", medicines); // ตรวจสอบรายการยา
      searchMedicine(); // เรียกใช้งานฟังก์ชันการค้นหา
    }
    // eslint-disable-next-line
  }, [name, medicines]);

  return (
    <Container maxWidth="lg" sx={{ paddingTop: 3 }}>
      <Typography
        variant="h4"
        gutterBottom
        sx={{
          textAlign: 'center',
          marginBottom: 3,
          color: '#89A8B2',  // สีของหัวข้อ
          fontWeight: 'bold',
        }}
      >
        {name ? `ผลการค้นหาสำหรับ: ${name}` : 'รายการยา'}
      </Typography>
      <Grid container spacing={3} justifyContent="center">
        {filteredMedicines.length > 0 ? (
          filteredMedicines.map((medicine, index) => (
            <Grid item xs={12} sm={6} md={8} lg={6} key={index}>
              <Card sx={{ padding: 3, boxShadow: 3, borderRadius: 3, width: '100%', maxWidth: '800px', backgroundColor: '#E5E1DA' }}>
                <CardContent>
                  {/* แสดงข้อมูลยาอย่างละเอียด */}
                  <Grid container spacing={2}>
                    <Grid item xs={4}>
                      <Typography variant="body1" fontWeight="bold">ชื่อสามัญ:</Typography>
                    </Grid>
                    <Grid item xs={8}>
                      <Typography variant="body1" sx={{ whiteSpace: 'normal', wordWrap: 'break-word' }}>
                        {medicine.commonName}
                      </Typography>
                    </Grid>

                    <Grid item xs={4}>
                      <Typography variant="body1" fontWeight="bold">ชื่อการค้า:</Typography>
                    </Grid>
                    <Grid item xs={8}>
                      <Typography variant="body1" sx={{ whiteSpace: 'normal', wordWrap: 'break-word' }}>
                        {medicine.tradeName}
                      </Typography>
                    </Grid>

                    <Grid item xs={4}>
                      <Typography variant="body1" fontWeight="bold">รูปแบบยา:</Typography>
                    </Grid>
                    <Grid item xs={8}>
                      <Typography variant="body1" sx={{ whiteSpace: 'normal', wordWrap: 'break-word' }}>
                        {medicine.dosageForm}
                      </Typography>
                    </Grid>

                    <Grid item xs={4}>
                      <Typography variant="body1" fontWeight="bold">วิธีการใช้:</Typography>
                    </Grid>
                    <Grid item xs={8}>
                      <Typography variant="body1" sx={{ whiteSpace: 'normal', wordWrap: 'break-word' }}>
                        {medicine.usage}
                      </Typography>
                    </Grid>

                    <Grid item xs={4}>
                      <Typography variant="body1" fontWeight="bold">สิ่งที่ควรแจ้งให้แพทย์ทราบ:</Typography>
                    </Grid>
                    <Grid item xs={8}>
                      <Typography variant="body1" sx={{ whiteSpace: 'normal', wordWrap: 'break-word' }}>
                        {medicine.doctorInfo}
                      </Typography>
                    </Grid>

                    <Grid item xs={4}>
                      <Typography variant="body1" fontWeight="bold">อาการไม่พึงประสงค์ทั่วไป:</Typography>
                    </Grid>
                    <Grid item xs={8}>
                      <Typography variant="body1" sx={{ whiteSpace: 'normal', wordWrap: 'break-word' }}>
                        {medicine.commonSideEffects}
                      </Typography>
                    </Grid>

                    <Grid item xs={4}>
                      <Typography variant="body1" fontWeight="bold">อาการที่ต้องแจ้งแพทย์ทันที:</Typography>
                    </Grid>
                    <Grid item xs={8}>
                      <Typography variant="body1" sx={{ whiteSpace: 'normal', wordWrap: 'break-word' }}>
                        {medicine.immediateSideEffects}
                      </Typography>
                    </Grid>

                    <Grid item xs={4}>
                      <Typography variant="body1" fontWeight="bold">การเก็บรักษา:</Typography>
                    </Grid>
                    <Grid item xs={8}>
                      <Typography variant="body1" sx={{ whiteSpace: 'normal', wordWrap: 'break-word' }}>
                        {medicine.storageMethod}
                      </Typography>
                    </Grid>
                  </Grid>
                </CardContent>
              </Card>
            </Grid>
          ))
        ) : (
          <Typography variant="h6" sx={{ textAlign: 'center', marginTop: 3, color: '#B3C8CF' }}>
            ไม่พบข้อมูลยา
          </Typography>
        )}
      </Grid>

      {/* ปุ่มกลับไปหน้าแรก */}
      <Box sx={{ textAlign: 'center', marginTop: 4 }}>
        <Button
          variant="outlined"
          color="primary"
          onClick={() => navigate('/')}  // นำทางกลับไปหน้าแรก
          sx={{
            padding: '10px 20px',
            borderRadius: 3,
            borderColor: '#89A8B2',
            color: '#89A8B2',
            '&:hover': {
              backgroundColor: '#B3C8CF',
              borderColor: '#89A8B2',
            },
          }}
        >
          กลับไปหน้าแรก
        </Button>
      </Box>
    </Container>
  );
};

export default MedicineList;
