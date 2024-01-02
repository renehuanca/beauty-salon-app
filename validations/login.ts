import * as yup from 'yup'

export const loginSchema = yup.object().shape({
  email: yup.string().email().required('El correo es requerido'),
  password: yup.string().required().min(6),
})