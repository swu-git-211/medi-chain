import React, { useState } from 'react';
import { Button, TextField, Container, Typography, Box } from '@mui/material';
import { useNavigate } from 'react-router-dom';
import { addMedicine } from '../contract';

const Input = () => {
  const [medicineData, setMedicineData] = useState({
    commonName: '',        // ชื่อสามัญ
    tradeName: '',         // ชื่อการค้า
    dosageForm: '',        // รูปแบบยา
    usage: '',             // วิธีการใช้ยา
    doctorInfo: '',        // สิ่งที่ควรแจ้งให้แพทย์หรือเภสัชกรทราบ
    missedDose: '',        // วิธีการทำอย่างไรหากลืมรับประทานยา
    commonSideEffects: '', // อาการไม่พึงประสงค์ทั่วไป
    immediateSideEffects: '', // อาการไม่พึงประสงค์ที่ต้องแจ้งแพทย์หรือเภสัชกรทันที
    storage: ''            // การเก็บรักษายา
  });

  const navigate = useNavigate();

  const handleChange = (e) => {
    const { name, value } = e.target;
    setMedicineData({ ...medicineData, [name]: value });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    
    // ตรวจสอบว่ามีฟิลด์ใดที่ว่าง
    for (const key in medicineData) {
      if (medicineData[key] === '') {
        alert(`กรุณากรอกข้อมูลในฟิลด์ ${key}`);
        return;
      }
    }

    try {
      // เรียกฟังก์ชันเพิ่มข้อมูลยาใน smart contract
      await addMedicine(medicineData);

      // แสดงข้อความยืนยันการเพิ่มข้อมูลยา
      alert('เพิ่มข้อมูลยาสำเร็จ!');

      // นำทางกลับไปหน้า Home หรือหน้าแสดงข้อมูลยา
      navigate('/'); // สามารถเปลี่ยนเป็น navigate('/:id') เพื่อไปหน้า ID ที่แสดงข้อมูลยา

    } catch (error) {
      // จัดการข้อผิดพลาดหากเกิดขึ้น
      alert('ไม่สามารถเพิ่มข้อมูลยาได้ กรุณาลองใหม่');
    }
  };

  return (
    <Container
      maxWidth="lg"  // เพิ่มความกว้างของ Container
      sx={{
        display: 'flex',
        flexDirection: 'column',
        justifyContent: 'center',
        alignItems: 'center',
        minHeight: '100vh',
        backgroundColor: '#F6F5F2', // สีพื้นหลังของ Container
        padding: 3,
        borderRadius: 4,
        boxShadow: 3,
      }}
    >
      <Typography
        variant="h4"
        gutterBottom
        sx={{ 
          fontWeight: 'bold',
          textAlign: 'center',
          marginBottom: 3,
        }}
      >
        เพิ่มข้อมูลยา
      </Typography>
      <form onSubmit={handleSubmit} style={{ width: '100%' }}>
        <Box
          sx={{
            display: 'flex',
            flexDirection: 'column',
            gap: 2,
          }}
        >
          <TextField
            label="ชื่อสามัญ"
            variant="outlined"
            fullWidth
            name="commonName"
            value={medicineData.commonName}
            onChange={handleChange}
            margin="normal"
            multiline
            sx={{
              borderRadius: 2,
              backgroundColor: '#FFEFEF', // สีพื้นหลังของ TextField
              '& .MuiOutlinedInput-root': {
                '& fieldset': {
                  borderColor: '#F0EBE3', // สีขอบของ TextField
                },
                '&:hover fieldset': {
                  borderColor: '#F0EBE3', // สีขอบเมื่อ hover
                },
              },
            }}
          />
          <TextField
            label="ชื่อการค้า"
            variant="outlined"
            fullWidth
            name="tradeName"
            value={medicineData.tradeName}
            onChange={handleChange}
            margin="normal"
            multiline
            sx={{
              borderRadius: 2,
              backgroundColor: '#FFEFEF',
              '& .MuiOutlinedInput-root': {
                '& fieldset': {
                  borderColor: '#F0EBE3',
                },
                '&:hover fieldset': {
                  borderColor: '#F0EBE3',
                },
              },
            }}
          />
          <TextField
            label="รูปแบบยา"
            variant="outlined"
            fullWidth
            name="dosageForm"
            value={medicineData.dosageForm}
            onChange={handleChange}
            margin="normal"
            sx={{
              borderRadius: 2,
              backgroundColor: '#FFEFEF',
              '& .MuiOutlinedInput-root': {
                '& fieldset': {
                  borderColor: '#F0EBE3',
                },
                '&:hover fieldset': {
                  borderColor: '#F0EBE3',
                },
              },
            }}
          />
          <TextField
            label="วิธีการใช้ยา"
            variant="outlined"
            fullWidth
            name="usage"
            value={medicineData.usage}
            onChange={handleChange}
            margin="normal"
            multiline
            sx={{
              borderRadius: 2,
              backgroundColor: '#FFEFEF',
              '& .MuiOutlinedInput-root': {
                '& fieldset': {
                  borderColor: '#F0EBE3',
                },
                '&:hover fieldset': {
                  borderColor: '#F0EBE3',
                },
              },
            }}
          />
          <TextField
            label="สิ่งที่ควรแจ้งให้แพทย์หรือเภสัชกรทราบ"
            variant="outlined"
            fullWidth
            name="doctorInfo"
            value={medicineData.doctorInfo}
            onChange={handleChange}
            margin="normal"
            multiline
            sx={{
              borderRadius: 2,
              backgroundColor: '#FFEFEF',
              '& .MuiOutlinedInput-root': {
                '& fieldset': {
                  borderColor: '#F0EBE3',
                },
                '&:hover fieldset': {
                  borderColor: '#F0EBE3',
                },
              },
            }}
          />
          <TextField
            label="วิธีการทำอย่างไรหากลืมรับประทานยา"
            variant="outlined"
            fullWidth
            name="missedDose"
            value={medicineData.missedDose}
            onChange={handleChange}
            margin="normal"
            multiline
            sx={{
              borderRadius: 2,
              backgroundColor: '#FFEFEF',
              '& .MuiOutlinedInput-root': {
                '& fieldset': {
                  borderColor: '#F0EBE3',
                },
                '&:hover fieldset': {
                  borderColor: '#F0EBE3',
                },
              },
            }}
          />
          <TextField
            label="อาการไม่พึงประสงค์ทั่วไป"
            variant="outlined"
            fullWidth
            name="commonSideEffects"
            value={medicineData.commonSideEffects}
            onChange={handleChange}
            margin="normal"
            multiline
            sx={{
              borderRadius: 2,
              backgroundColor: '#FFEFEF',
              '& .MuiOutlinedInput-root': {
                '& fieldset': {
                  borderColor: '#F0EBE3',
                },
                '&:hover fieldset': {
                  borderColor: '#F0EBE3',
                },
              },
            }}
          />
          <TextField
            label="อาการไม่พึงประสงค์ที่ต้องแจ้งแพทย์หรือเภสัชกรทันที"
            variant="outlined"
            fullWidth
            name="immediateSideEffects"
            value={medicineData.immediateSideEffects}
            onChange={handleChange}
            margin="normal"
            multiline
            sx={{
              borderRadius: 2,
              backgroundColor: '#FFEFEF',
              '& .MuiOutlinedInput-root': {
                '& fieldset': {
                  borderColor: '#F0EBE3',
                },
                '&:hover fieldset': {
                  borderColor: '#F0EBE3',
                },
              },
            }}
          />
          <TextField
            label="การเก็บรักษายา"
            variant="outlined"
            fullWidth
            name="storage"
            value={medicineData.storage}
            onChange={handleChange}
            margin="normal"
            multiline
            sx={{
              borderRadius: 2,
              backgroundColor: '#FFEFEF',
              '& .MuiOutlinedInput-root': {
                '& fieldset': {
                  borderColor: '#F0EBE3',
                },
                '&:hover fieldset': {
                  borderColor: '#F0EBE3',
                },
              },
            }}
          />
        </Box>
        
        <Button
          type="submit"
          variant="contained"
          color="primary"
          fullWidth
          sx={{
            marginTop: 3,
            padding: '10px',
            borderRadius: 4,
            backgroundColor: '#F3D0D7', // ปรับสีปุ่ม
            '&:hover': {
              backgroundColor: '#F0EBE3', // สีเมื่อ hover
            },
          }}
        >
          เพิ่มข้อมูลยา
        </Button>

        {/* ปุ่มกลับไปหน้า Home */}
        <Button
          variant="outlined"
          color="secondary"
          fullWidth
          sx={{
            marginTop: 2,
            padding: '10px',
            borderRadius: 4,
            borderColor: '#F0EBE3', // สีของขอบปุ่ม
            '&:hover': {
              backgroundColor: '#FFEFEF', // สีเมื่อ hover
            },
          }}
          onClick={() => navigate('/')} // นำทางกลับไปหน้า Home
        >
          กลับไปหน้าแรก
        </Button>
      </form>
    </Container>
  );
};

export default Input;
