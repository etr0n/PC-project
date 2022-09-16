import Grid from '@mui/material/Grid';
import Button from '@mui/material/Button';
import Typography from '@mui/material/Typography';
import TextField from '@mui/material/TextField';
import Box from '@mui/material/Box';
import { useState } from 'react';
import { Link } from "react-router-dom";
import { createAPIEndpoint, ENDPOINTS } from '../api';
import BackIcon from '@mui/icons-material/KeyboardBackspaceOutlined';
import Alert from '@mui/material/Alert';

const AddDataForm = () => {
    const initialState = {
        manufacturer: "",
        category: "",
        model: "",
        speed: "",
        type: "",
        price: "",
        color: ""
    }

    const [values, setValues] = useState(initialState)
    const [alert, setAlert] = useState(false)

    const onSubmit = (e) => {
        e.preventDefault();
        createAPIEndpoint(ENDPOINTS.product)
            .post(values)
            .then(
                setValues(initialState),
                setAlert(true),
                setTimeout(() => {
                    setAlert(false);
                }, 2000)
            )
            .catch(err => console.log(err))
    }

    const handleChange = (e) => {
        setValues({ ...values, [e.target.name]: e.target.value })
    }

    return (
        <>
            <form onSubmit={onSubmit}>
                <Grid container justify="center" spacing={2}>
                    <Grid item xs={6} sm={6} md={12}>
                        <Button component={Link} to="/" variant="text" size="small" startIcon={<BackIcon />}>
                            Back
                        </Button>
                    </Grid>
                    <Grid item xs={12} sm={12} md={12}>
                        <Typography variant="h5">Add new record</Typography>
                    </Grid>
                    {alert ?
                        <Grid item xs={12} sm={12} md={12}>
                            <Alert severity="success">New record added</Alert>
                        </Grid> : ""}
                    <Grid item xs={12} sm={6} md={6}>
                        <TextField
                            required
                            style={{ width: '100%' }}
                            inputProps={{
                                maxLength: 35,
                            }}
                            id="outlined-basic"
                            label="Manufacturer"
                            variant="outlined"
                            name="manufacturer"
                            value={values.manufacturer}
                            onChange={handleChange}
                        />
                    </Grid>
                    <Grid item xs={12} sm={6} md={6}>
                        <TextField
                            required
                            style={{ width: '100%' }}
                            inputProps={{
                                maxLength: 35,
                            }}
                            id="outlined-basic"
                            label="Model"
                            variant="outlined"
                            name="model"
                            value={values.model}
                            onChange={handleChange}
                        />
                    </Grid>
                    <Grid item xs={12} sm={6} md={6}>
                        <TextField
                            required
                            style={{ width: '100%' }}
                            inputProps={{
                                maxLength: 35,
                            }}
                            id="outlined-basic"
                            label="Category"
                            variant="outlined"
                            name="category"
                            value={values.category}
                            onChange={handleChange}
                        />
                    </Grid>
                    <Grid item xs={12} sm={6} md={6}>
                        <TextField
                            required
                            style={{ width: '100%' }}
                            inputProps={{
                                maxLength: 35,
                            }}
                            id="outlined-basic"
                            label="Type"
                            variant="outlined"
                            name="type"
                            value={values.type}
                            onChange={handleChange}
                        />
                    </Grid>
                    <Grid item xs={12} sm={6} md={4}>
                        <TextField
                            required
                            style={{ width: '100%' }}
                            inputProps={{
                                maxLength: 35,
                                inputmode: 'numeric',
                                pattern: '[0-9]*'
                            }}
                            id="outlined-basic"
                            label="Price"
                            variant="outlined"
                            name="price"
                            value={values.price}
                            onChange={handleChange}
                        />
                    </Grid>
                    <Grid item xs={12} sm={6} md={4}>
                        <TextField
                            required
                            style={{ width: '100%' }}
                            inputProps={{
                                maxLength: 35,
                            }}
                            id="outlined-basic"
                            label="Speed"
                            variant="outlined"
                            name="speed"
                            value={values.speed}
                            onChange={handleChange}
                        />
                    </Grid>
                    <Grid item xs={12} sm={6} md={4}>
                        <TextField
                            required
                            style={{ width: '100%' }}
                            inputProps={{
                                maxLength: 35,
                            }}
                            id="outlined-basic"
                            label="Color"
                            variant="outlined"
                            name="color"
                            value={values.color}
                            onChange={handleChange}
                        />
                    </Grid>
                    <Grid item
                        xs={12} sm={12} md={12}>
                        <Box display="flex" justifyContent="center">
                            <Button variant="contained" style={{ width: 168 }} type='submit'>Create</Button>
                        </Box>
                    </Grid>
                </Grid>
            </form>
        </>
    )
}

export default AddDataForm