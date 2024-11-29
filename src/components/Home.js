import React, { useState } from 'react';
import { Button, TextField, Container, Typography, Box } from '@mui/material';
import { useNavigate } from 'react-router-dom';

const Home = () => {
  const [name, setName] = useState('');
  const navigate = useNavigate();

  const handleChange = (e) => {
    setName(e.target.value);
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    if (name) {
      navigate(`/${name}`);
    }
  };

  return (
    <Container
      maxWidth="false"
      style={{
        display: 'flex',
        flexDirection: 'column',
        alignItems: 'center',
        justifyContent: 'center',
        minHeight: '100vh',
        padding: 0,
        margin: 0,
      }}
    >
      <Box
        component="div"
        style={{
          backgroundColor: '#1976D2', // สีพื้นหลังของ Box (สีน้ำเงิน)
          padding: '30px',
          borderRadius: '12px',
          boxShadow: '0 4px 10px rgba(0, 0, 0, 0.1)',
          textAlign: 'center',
          width: '100%',
          maxWidth: '700px',
        }}
      >
        <Typography variant="h4" gutterBottom style={{ fontWeight: 'bold', color: '#FFFFFF' }}>
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
              backgroundColor: '#E3F2FD', // สีพื้นหลังของ TextField (สีฟ้าอ่อน)
              borderRadius: '8px',
            }}
          />
          <Button
            type="submit"
            variant="contained"
            fullWidth
            style={{
              marginTop: '15px',
              backgroundColor: '#42A5F5', // สีของปุ่ม "ไปยังข้อมูลยา" (สีน้ำเงิน)
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
            backgroundColor: '#42A5F5', // สีของปุ่ม "เพิ่มข้อมูลยาใหม่" (สีน้ำเงินอ่อน)
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
