import React, { useEffect, useState } from "react";
import { useFormik } from "formik";
import {
  Box,
  Button,
  CardActions,
  Card,
  Typography,
  Divider,
  TextField,
  FormGroup,
  FormControl,
  Select,
  MenuItem,
  InputLabel,
} from "@mui/material";
import { Fragment } from "react/jsx-runtime";

import { UserProps } from "../../interfaces/User";
import { getCep } from "../../services/Users";
import { getLocation } from "../../services/GoogleMaps";
import { countries } from "../../utils";
import { toast } from 'react-toastify';

interface Props {
  handleSave: (values: UserProps, userType: string) => void;
  initialValues: UserProps;
  userType: string;
  goBack: () => void;
}

export const FormRegistration: React.FC<Props> = ({
  handleSave,
  goBack,
  initialValues,
  userType,
}) => {
  const submit = async (values: UserProps) => {
    const addresss = `${values.street},
    ${values.number},
    ${values.neighborhood},
    ${values.city} `

    const location = await getLocation(addresss)

    if (location) {
      values.lat = location.lat
      values.lng = location.lng
      handleSave(values, userType);
    }
  };

  const formik = useFormik({
    initialValues,
    onSubmit: (values) => submit(values)
  });

  const {
    values,
    errors,
    handleBlur,
    handleChange,
    handleSubmit,
    setFieldValue,
  } = formik;

  const setValuesInitialForm = (values: any) => {
    Object.keys(values).forEach(key => {
      setFieldValue(key, values[key]);
    });
  };

  useEffect(() => {
    if (initialValues) {
      setValuesInitialForm(initialValues);
    }
  }, [initialValues])


  const handleSearchAddress = async (value: any) => {
    const data = await getCep(value);
    try {
      if (data) {
        setValuesInitialForm(data)
      }
    } catch (error) {
      toast.error('Ops!! Erro ao buscar endereço, verifique se preencheu o CEP corretamente', {
        autoClose: 1500
      });
      console.error('Erro ao buscar endereço:', error);
    }
  };

  return (
    <Card
      sx={{
        my: 8,
        mx: 4,
        p: 8,
        display: "flex",
        flexDirection: "column",
        maxWidth: "700px",
      }}
    >
      <Box>
        <Typography
          variant="h5"
          fontSize={30}
          sx={{ fontWeight: "bold", marginBottom: "1rem" }}
        >
          Cadastro
        </Typography>
        <Typography
          paragraph
          fontSize={16}
          sx={{ color: "#71717A", fontWeight: "regular" }}
        >
          Para acessar o sistema, insira apenas seu usuário e sua senha em
          seguida
        </Typography>
      </Box>

      <Fragment>
        <Box>
          <FormGroup>
            <FormControl component="fieldset">
              <TextField
                autoFocus
                label="Nome"
                onChange={handleChange}
                onBlur={handleBlur}
                value={values.name}
                name="name"
                fullWidth
                error={Boolean(errors?.name)}
                margin="normal"
              />
            </FormControl>
            <FormControl>
              <TextField
                autoFocus
                label="E-mail"
                onChange={handleChange}
                onBlur={handleBlur}
                value={values.email}
                error={Boolean(errors?.email)}
                name="email"
                fullWidth
                margin="normal"
              />
            </FormControl>
            <FormControl>
              <TextField
                autoFocus
                label="Data Nascimento"
                onChange={handleChange}
                onBlur={handleBlur}
                fullWidth
                margin="normal"
                value={values.dateBirth}
                error={Boolean(errors?.dateBirth)}
                name="dateBirth"
              />
            </FormControl>

            <FormControl>
              <TextField
                autoFocus
                label="Cpf"
                onChange={handleChange}
                onBlur={handleBlur}
                fullWidth
                margin="normal"
                value={values.cpf}
                error={Boolean(errors?.cpf)}
                name="cpf"
              />
            </FormControl>

            <FormControl>
              <TextField
                autoFocus
                label="Telefone"
                onChange={handleChange}
                onBlur={handleBlur}
                fullWidth
                margin="normal"
                value={values.phone}
                error={Boolean(errors?.phone)}
                name="phone"
              />
            </FormControl>
          </FormGroup>

          <TextField
            margin="normal"
            label="CEP"
            fullWidth
            name="zipCode"
            error={!!errors.zipCode}
            onChange={(e) => {
              const { value } = e.target;
              if (value.length === 8) {
                setFieldValue("zipCode", value);
                handleSearchAddress(value);
              }
            }}
          />


          <FormControl fullWidth margin="normal">
            <InputLabel id="country-label">País</InputLabel>
            <Select
              labelId="country-label"
              id="country"
              name="country"
              error={!!errors.country}
              value={values.country}
              onChange={handleChange}
              onBlur={handleBlur}
            >
              {countries.map((country) => (
                <MenuItem key={country} value={country}>
                  {country}
                </MenuItem>
              ))}
            </Select>
          </FormControl>
          <TextField
            label="Rua"
            fullWidth
            name="street"
            error={!!errors.street}
            onChange={handleChange}
            onBlur={handleBlur}
            margin="normal"
            disabled
            value={values.street}
          />

          <TextField
            label="Numero"
            fullWidth
            name="number"
            error={!!errors.number}
            onChange={handleChange}
            onBlur={handleBlur}
            margin="normal"
            value={values.number}
          />
          <TextField
            label="Complemento"
            fullWidth
            name="complement"
            error={!!errors.complement}
            onChange={handleChange}
            onBlur={handleBlur}
            margin="normal"
            value={values.complement}
          />
          <TextField
            label="Cidade"
            name="city"
            onChange={handleChange}
            onBlur={handleBlur}
            error={!!errors.city}
            fullWidth
            margin="normal"
            value={values.city}
            disabled
          />
          <TextField
            label="Estado"
            fullWidth
            name="state"
            error={!!errors.state}
            onChange={handleChange}
            onBlur={handleBlur}
            margin="normal"
            disabled
            value={values.state}
          />

          <TextField
            label="Senha"
            fullWidth
            name="password"
            error={!!errors.password}
            onChange={handleChange}
            onBlur={handleBlur}
            margin="normal"
            value={values.password}
            type="password"
          />
        </Box>
        <Divider sx={{ my: 3 }} />
        <CardActions sx={{ justifyContent: "space-between", px: 0 }}>
          <Button
            onClick={() => goBack()}
            type="submit"
            color="primary"
            variant="outlined"
          >
            Voltar
          </Button>
          <Button
            onClick={(e) => handleSubmit(e)}
            type="submit"
            color="secondary"
            variant="contained"
          >
            Salvar
          </Button>
        </CardActions>
      </Fragment>
    </Card>
  );
};
