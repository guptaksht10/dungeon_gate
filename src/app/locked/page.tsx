import {Box, Paper, Typography} from "@mui/material";


export default function Locked() {
    return (<Box p={4}
        maxWidth={500}
        mx="auto"
        mt={6}>
        <Paper sx={
            {
                p: 4,
                textAlign: "center"
            }
        }>
            <Typography>🔒 LOCKED</Typography>
            <Typography mt={2}
                fontSize={12}>
                Your last answers are being reviewed.
            </Typography>
        </Paper>
    </Box>);
}
