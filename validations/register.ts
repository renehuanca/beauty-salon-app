import * as yup from 'yup'

export const registerSchema = yup.object().shape({
  name: yup
    .string()
    .required('El nombre es requerido'),
  email: yup
    .string()
    .email('El correo no es válido')
    .required('El correo es requerido'),
  phone_number: yup
    .string()
    .min(8, 'El número de celular debe tener 8 dígitos')
    .required('Nro de celular es requerido'),
  address: yup
    .string(),
  password: yup
    .string()
    .required('La contraseña es requerida')
    .min(8, 'La contraseña debe tener al menos 8 caracteres'),
  password_confirmation: yup
    .string()
    .required('La contraseña es requerida')
    .min(8, 'La contraseña debe tener al menos 8 caracteres')
    .oneOf([yup.ref('password')], 'La contraseña debe coincidir')
})