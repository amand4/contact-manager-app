import * as Yup from "yup";

const userSchema = () =>
  Yup.object().shape({
    name: Yup.string().required("This field is required"),
    email: Yup.string().email().required("This field is required"),
    dateBirth: Yup.string().required("This field is required"),
    cpf: Yup.string().required("This field is required"),
    phone: Yup.number().required("This field is required"),
    zipCode: Yup.string()
    .required('Campo obrigatório')
    .matches(/^\d{5}-?\d{3}$/, 'CEP inválido'),
    number: Yup.number().required("This field is required"),
    country: Yup.string().required("This field is required"),
    street: Yup.string().required("This field is required"),
    state: Yup.string().required("This field is required"),
    neighborhood: Yup.string().required("This field is required"),
    city: Yup.string().required("This field is required"),
    complement: Yup.string().required("This field is required"),
    password: Yup.string().required("This field is required"),
  });

export default userSchema;
