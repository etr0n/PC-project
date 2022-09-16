import Container from '@mui/material/Container';
import Box from '@mui/material/Box';
import Grid from '@mui/material/Grid'
import TextField from '@mui/material/TextField';
import Button from '@mui/material/Button';
import Table from '@mui/material/Table';
import TableBody from '@mui/material/TableBody';
import TableContainer from '@mui/material/TableContainer';
import TableHead from '@mui/material/TableHead';
import TableRow from '@mui/material/TableRow';
import Paper from '@mui/material/Paper';
import { Link } from "react-router-dom";
import Typography from '@mui/material/Typography';
import Pagination from '@mui/material/Pagination';
import Stack from '@mui/material/Stack';
import InputLabel from '@mui/material/InputLabel';
import MenuItem from '@mui/material/MenuItem';
import FormControl from '@mui/material/FormControl';
import Select from '@mui/material/Select';
import OutlinedInput from "@mui/material/OutlinedInput";
import { useState, useEffect } from 'react';
import { useNavigate } from "react-router-dom";
import { createAPIEndpoint } from './../api/index';
import AddIcon from '@mui/icons-material/Add';
import ClearIcon from '@mui/icons-material/Clear';
import StyledTableCell from '../muiStyles/styledTableCell';

const ListPage = () => {
    const navigate = useNavigate();

    const goRouteId = (id) => {
        navigate(`/details/${id}`, { state: id });
    }

    const [sort, setSort] = useState("manufacturer_asc");
    const [products, setProducts] = useState([]);
    const [search, setSearch] = useState("");
    const [pageNumber, setPageNumber] = useState(1)
    const [totalPages, setTotalPages] = useState(0)

    const handleChangeSearch = (e) => {
        setPageNumber(1);
        setSearch(e.target.value);
    };

    const handleChangeSort = (e) => {
        setSort(e.target.value);
    };

    const handleChangePageNumber = (e, value) => {
        setPageNumber(value)
    }

    const clearFilters = () => {
        setSort("manufacturer_asc");
        setSearch("");
        setPageNumber(1);
    };

    const getAllProducts = () => {
        createAPIEndpoint(`Product?search=${search}&sort=${sort}&pageNumber=${pageNumber}`)
            .fetch(search, pageNumber)
            .then(res => {
                setProducts(res.data.item1.value);
                setTotalPages(res.data.item2);
            })
            .catch(err => console.log(err));
    }

    useEffect(() => {
        getAllProducts()
    }, [pageNumber, search, sort])

    return (
        <Container maxWidth="lg">
            <Box sx={{
                bgcolor: 'white',
                borderRadius: '0.25rem',
                p: 5,
                m: 5,
            }}>
                <form>
                    <Grid container spacing={2}>
                        <Grid item xs={12} sm={12} md={12}>
                            <Typography variant="h5">Search form</Typography>
                        </Grid>
                        <Grid item xs={12} sm={6} md={4}>
                            <TextField
                                inputProps={{
                                    maxLength: 35,
                                }}
                                style={{ width: '100%' }}
                                id="outlined-basic"
                                label="Search"
                                variant="outlined"
                                name="search"
                                value={search}
                                onChange={handleChangeSearch}
                            />
                        </Grid>
                        <Grid item xs={12} sm={6} md={4}>
                            <FormControl fullWidth>
                                {sort ? <InputLabel id="demo-simple-select-label">Sort by manufacturer</InputLabel> : ""}
                                <Select
                                    labelId={sort ? "demo-simple-select-label" : ""}
                                    id="demo-simple-select"
                                    displayEmpty
                                    value={sort}
                                    input={<OutlinedInput notched label="Sort by manufacturer" />}
                                    onChange={handleChangeSort}
                                >
                                    <MenuItem value="manufacturer_asc">a-z</MenuItem>
                                    <MenuItem value="manufacturer_des">z-a</MenuItem>
                                </Select>
                            </FormControl>
                        </Grid>
                        <Grid item xs={12} sm={4} md={3} alignItems="stretch" style={{ display: "flex" }}>
                            <Button
                                variant="contained"
                                style={{ width: 168 }}
                                color="error"
                                type='button'
                                startIcon={<ClearIcon />}
                                onClick={() => clearFilters()}>
                                Clear filters
                            </Button>
                        </Grid>
                    </Grid>
                </form>
            </Box >
            <Box sx={{
                bgcolor: 'white',
                borderRadius: '0.25rem',
                p: 5,
                m: 5,
            }}>
                <Grid container spacing={2}>
                    <Grid item xs={6} sm={6} md={6}>
                        <Typography variant="h5">List of products</Typography>
                    </Grid>
                    <Grid item xs={6} sm={6} md={6}>
                        <Box display="flex" justifyContent="flex-end">
                            <Button component={Link} to="/addRecord" variant="contained" style={{ width: 168 }} startIcon={<AddIcon />}>
                                Create new
                            </Button>
                        </Box>
                    </Grid>
                    {products.length > 0 ? (
                        <>
                            <Grid item xs={12} sm={12} md={12}>
                                <TableContainer component={Paper}>
                                    <Table
                                        sx={{
                                            minWidth: 700,
                                            "& .MuiTableRow-root:hover": {
                                                backgroundColor: '#edf5fd'
                                            }
                                        }}
                                        aria-label="customized table">
                                        <TableHead>
                                            <TableRow>
                                                <StyledTableCell>Manufacturer</StyledTableCell>
                                                <StyledTableCell>Model</StyledTableCell>
                                                <StyledTableCell>Category</StyledTableCell>
                                                <StyledTableCell>Type</StyledTableCell>
                                            </TableRow>
                                        </TableHead>
                                        <TableBody>
                                            {products.map((row) => (
                                                <TableRow
                                                    key={row.id}
                                                    onClick={() => goRouteId(row.id)}
                                                    sx={{ "&:last-child td, &:last-child th": { border: 0 } }}>
                                                    <StyledTableCell component="th" scope="row">
                                                        {row.manufacturer}
                                                    </StyledTableCell>
                                                    <StyledTableCell>{row.model}</StyledTableCell>
                                                    <StyledTableCell>{row.category}</StyledTableCell>
                                                    <StyledTableCell>{row.type}</StyledTableCell>
                                                </TableRow>
                                            ))}
                                        </TableBody>
                                    </Table>
                                </TableContainer>
                            </Grid>
                            <Grid item xs={12} sm={12} md={12}>
                                <Stack spacing={2} alignItems="center" pt={3}>
                                    <Pagination count={totalPages} page={pageNumber} shape="rounded" onChange={handleChangePageNumber} />
                                </Stack>
                            </Grid>
                        </>
                    ) :
                        <Grid item xs={12} sm={12} md={12}>
                            <Typography>No products to display...</Typography>
                        </Grid>}
                </Grid>
            </Box>
        </Container >
    )
}

export default ListPage