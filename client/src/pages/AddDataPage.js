import React from 'react'
import ProductForm from '../components/ProductForm';
import Container from '@mui/material/Container';
import Box from '@mui/material/Box';

const AddDataPage = () => {
    return (
        <>
            <Container maxWidth="md">
                <Box sx={{
                    bgcolor: 'white',
                    borderRadius: '0.25rem',
                    p: 5,
                    m: 5,
                }}>
                    <ProductForm />
                </Box>
            </Container>
        </>
    )
}

export default AddDataPage