import React, { useState } from 'react';
import { Button, TextField, Container, Typography, Box } from '@mui/material';
import { useNavigate } from 'react-router-dom';

const Home = () => {
  const [name, setName] = useState('');  // ใช้ชื่อยาแทน id
  const navigate = useNavigate();

  const handleChange = (e) => {
    setName(e.target.value);
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    if (name) {
      navigate(`/${name}`); // นำทางไปหน้า MedicineList โดยใช้ชื่อยา
    }
  };

  return (
    <Container
      maxWidth="false" // ทำให้ container กว้างเต็มจอ
      style={{
        display: 'flex',
        flexDirection: 'column',
        alignItems: 'center',
        justifyContent: 'center',
        minHeight: '100vh',
        padding: 0, // ลบ padding ของ container
        margin: 0,  // ลบ margin ของ container
      }}
    >
      <Box
        component="div"
        style={{
          backgroundColor: '#9B7EBD', // สีพื้นหลังของ Box
          padding: '30px',
          borderRadius: '12px',
          boxShadow: '0 4px 10px rgba(0, 0, 0, 0.1)',
          textAlign: 'center',
          width: '100%',
          maxWidth: '700px',
        }}
      >
        <Typography variant="h4" gutterBottom style={{ fontWeight: 'bold', color: '#333' }}>
          ใส่ชื่อยาที่ต้องการค้นหา
        </Typography>

        <form onSubmit={handleSubmit}>
          <TextField
            label="ชื่อยา"
            variant="outlined"
            fullWidth
            value={name}
            onChange={handleChange}
            margin="normal"
            style={{
              backgroundColor: '#EEEEEE', // สีพื้นหลังของ TextField
              borderRadius: '8px',
            }}
          />
          <Button
            type="submit"
            variant="contained"
            fullWidth
            style={{
              marginTop: '15px',
              backgroundColor: '#D4BEE4', // สีของปุ่ม "ไปยังข้อมูลยา"
              color: 'white',
              borderRadius: '8px',
              padding: '12px',
              textTransform: 'none',
              fontWeight: 'bold',
            }}
          >
            ไปยังข้อมูลยา
          </Button>
        </form>

        <Button
          variant="contained"
          fullWidth
          onClick={() => navigate('/input')}
          style={{
            marginTop: '20px',
            backgroundColor: '#E4B1F0',
            color: 'white',
            borderRadius: '8px',
            padding: '12px',
            textTransform: 'none',
            fontWeight: 'bold',
          }}
        >
          เพิ่มข้อมูลยาใหม่
        </Button>
      </Box>
    </Container>
  );
};

export default Home;
