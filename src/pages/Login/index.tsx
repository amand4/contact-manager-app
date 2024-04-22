import { useContext } from "react";
import { useFormik } from "formik";
import * as yup from "yup";
import { Box, Button, CssBaseline, Divider, Grid, Link, TextField, Typography, useMediaQuery } from "@mui/material";
import { UserContext } from "../../contexts/useAuth";
import SideBanner from './SideBanner';


const Login = () => {
  const { signIn } = useContext(UserContext);
  const matches = useMediaQuery('(min-width:1200px)')

  const validationSchema = yup.object({
    email: yup.string().required('Por favor, insira seu e-mail.'),
    password: yup.string().required('Por favor, insira sua senha.'),
  });

  const initialValues = {
    email: '',
    password: '',
  };

  const formik = useFormik({
    initialValues,
    onSubmit: (values) => signIn(values),
    validationSchema
  });

  const {
    values,
    errors,
    handleBlur,
    handleChange,
    isValid,
    handleSubmit
  } = formik;

  return (

    <Grid container component="main" sx={{ height: '100vh' }}>
      <CssBaseline />
      <Grid item xs={12} sm={12} md={12} lg={6} sx={{
        display: "flex",
        justifyContent: "center",
        alignItems: "center"
      }}>

        <Box
          sx={{
            my: 8,
            mx: 4,
            display: 'flex',
            flexDirection: 'column',
            alignItems: 'center',
            maxWidth: "386px"
          }}
        >
          <Box>
            <Typography variant="h5" fontSize={30} sx={{ fontWeight: 'bold', marginBottom: "1rem" }} >
              Seja bem-vindo
            </Typography>
            <Typography paragraph fontSize={16} sx={{ color: "#71717A", fontWeight: "regular" }}>
              Para acessar o sistema, insira apenas seu usuário e sua senha em seguida
            </Typography>
          </Box>

          <TextField
            label="E-mail"
            type="text"
            placeholder="email"
            name="email"
            fullWidth
            margin="normal"
            variant="outlined"
            onChange={handleChange}
            onBlur={handleBlur}
            error={Boolean(errors?.email)}
            value={values.email}
          />

          <TextField
            onChange={handleChange}
            onBlur={handleBlur}
            label="Password"
            type="password"
            placeholder="password"
            name="password"
            id="password"
            fullWidth
            margin="normal"
            variant="outlined"
            value={values.password}
            error={Boolean(errors?.password)}
          />
          <Button
            type="submit"
            fullWidth
            variant="contained"
            sx={{ mt: 3, mb: 2 }}
            onClick={handleSubmit}
          >
            Acessar Plataforma
          </Button>
          <Divider>
            <Link
              href="/users/register"
              variant="body2"
              sx={{ marginLeft: "5px", marginRight: "5px", cursor: "pointer" }}
            >
              Clique aqui para se cadastrar
            </Link>
          </Divider>
        </Box>
      </Grid>
      {matches &&
        <Grid item xs={false} sm={false} md={false} lg={6} sx={{ height: '100vh' }}>
          <SideBanner />
        </Grid>
      }
    </Grid >

  );
};

export default Login;
