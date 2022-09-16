import { useLocation } from 'react-router-dom';
import { useEffect, useState } from 'react';
import { createAPIEndpoint, ENDPOINTS } from './../api/index';
import Table from '@mui/material/Table';
import TableBody from '@mui/material/TableBody';
import TableContainer from '@mui/material/TableContainer';
import TableHead from '@mui/material/TableHead';
import TableRow from '@mui/material/TableRow';
import Paper from '@mui/material/Paper';
import Container from '@mui/material/Container';
import Box from '@mui/material/Box';
import Grid from '@mui/material/Grid';
import Button from '@mui/material/Button';
import Typography from '@mui/material/Typography';
import { Link } from "react-router-dom";
import BackIcon from '@mui/icons-material/KeyboardBackspaceOutlined';
import StyledTableCell from '../muiStyles/styledTableCell';

const DetailsPage = () => {
    const location = useLocation();
    const id = location.state;

    const [productDetails, setProductDetails] = useState([])

    useEffect(() => {
        createAPIEndpoint(ENDPOINTS.product)
            .fetchById(id)
            .then(res => {
                setProductDetails(res.data)
            })
            .catch(err => console.log(err))
    }, [])

    return (
        <>
            <Container maxWidth="lg">
                <Box sx={{
                    bgcolor: 'white',
                    borderRadius: '0.25rem',
                    p: 5,
                    m: 5
                }}>
                    <Grid container justify="center" spacing={2}>
                        <Grid item xs={6} sm={6} md={12}>
                            <Button component={Link} to="/" variant="text" size="small" startIcon={<BackIcon />}>
                                Back
                            </Button>
                        </Grid>
                        <Grid item xs={12} sm={12} md={12}>
                            <Typography variant="h5">Details Page</Typography>
                        </Grid>
                        <Grid item xs={12} sm={12} md={12}>
                            <TableContainer component={Paper}>
                                <Table
                                    sx={{
                                        minWidth: 700,
                                    }}
                                    aria-label="customized table">
                                    <TableHead>
                                        <TableRow>
                                            <StyledTableCell>Speed</StyledTableCell>
                                            <StyledTableCell>Price €</StyledTableCell>
                                            <StyledTableCell>Color</StyledTableCell>
                                        </TableRow>
                                    </TableHead>
                                    <TableBody>
                                        <TableRow
                                            key={productDetails.id}
                                            sx={{ "&:last-child td, &:last-child th": { border: 0 } }}>
                                            <StyledTableCell component="th" scope="row">
                                                {productDetails.speed}
                                            </StyledTableCell>
                                            <StyledTableCell >{productDetails.price}</StyledTableCell>
                                            <StyledTableCell>{productDetails.color}</StyledTableCell>
                                        </TableRow>
                                    </TableBody>
                                </Table>
                            </TableContainer>
                        </Grid>
                    </Grid>
                </Box>
            </Container>
        </>
    )
}

export default DetailsPage