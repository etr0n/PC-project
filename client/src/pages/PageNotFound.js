import { Box, Button, Typography } from '@mui/material';
import { Link } from "react-router-dom";
import HomeIcon from '@mui/icons-material/Home';

const PageNotFound = () => {
    return (
        <>
            <Box
                sx={{
                    display: 'flex',
                    justifyContent: 'center',
                    alignItems: 'center',
                    flexDirection: 'column',
                    minHeight: '100vh',
                }}
            >
                <Typography variant="h1" >
                    404
                </Typography>
                <Typography variant="h6">
                    The page you’re looking for doesn’t exist.
                </Typography>
                <Button
                    component={Link}
                    to="/"
                    variant="contained"
                    style={{ width: 168 }}
                    startIcon={<HomeIcon />}>
                    Back Home
                </Button>
            </Box>
        </>
    )
}

export default PageNotFound