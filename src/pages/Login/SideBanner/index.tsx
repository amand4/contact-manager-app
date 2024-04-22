import { Box, Card, CardContent, CardMedia, Typography, alpha } from "@mui/material"
import image from "../../../assets/images/login-bg.jpg"

function SideBanner() {
    return (
        <Card>
            <Box sx={{ position: "relative", }}>
                <CardContent
                    sx={{
                        position: "absolute",
                        width: "100%",
                        height: "100%",
                        color: "white",
                        alignContent: "center",
                        justifyContent: "center",
                        backgroundColor: alpha("#049150", 0.4),
                    }}
                >
                    <Box
                        sx={{
                            maxWidth: "25em",
                            margin: "0 auto"
                        }}
                    >
                        <Typography variant="h5" fontSize={48} sx={{ fontWeight: 'bold' }} >
                            Seja bem vindo a Plataforma
                        </Typography>
                        <Typography variant="subtitle1" paragraph>
                            Você poderá gerenciar a sua lista de contatos com facilidade
                        </Typography>
                    </Box>
                </CardContent>
                <CardMedia
                    component="img"
                    sx={{ display: { xs: 'none', sm: 'block', }, objectFit: 'cover', height: '100vh' }}
                    image={image}
                    title="Contemplative Reptile"
                />
            </Box >
        </Card >
    )
}

export default SideBanner