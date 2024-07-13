import * as Yup from "yup";

//========== LOGIN ==================

export const signInValidationSchema = Yup.object().shape({
    email: Yup.string().email("Invalid email").required("Email is required"),
    password: Yup.string().matches(/^(?=.*[a-z])(?=.*[A-Z]).{6,}$/, "Password must be at least 6 characters").required("Password is required"),
})


//========== CATEGORY ================


export const CategoryValidationSchema = Yup.object().shape({
  category_name: Yup.string()
    .min(2, 'Category name is too short!')
    .max(50, 'Category name is too long!')
    .required('Category name is required'),
});


// =========== PRODUCTS ================

export const ProductValidationSchema = Yup.object().shape({
  age_max: Yup.number()
    .integer('Max age must be an integer')
    .min(0, 'Max age must be at least 0')
    .required('Max age is required'),
  age_min: Yup.number()
    .integer('Min age must be an integer')
    .min(0, 'Min age must be at least 0')
    .required('Min age is required'),
  category_id: Yup.string()
    .required('Category is required'),
  color: Yup.array()
    .of(Yup.string().required('Color is required'))
    .min(1, 'At least one color is required'),
  cost: Yup.number()
    .positive('Cost must be positive')
    .required('Cost is required'),
  count: Yup.number()
    .integer('Count must be an integer')
    .min(0, 'Count must be at least 0')
    .required('Count is required'),
  description: Yup.string()
    .required('Description is required'),
  discount: Yup.number()
    .min(0, 'Discount must be at least 0')
    .max(100, 'Discount must be at most 100')
    .required('Discount is required'),
  for_gender: Yup.string()
    .oneOf(['male', 'female'], 'Gender must be either male or female')
    .required('Gender is required'),
  made_in: Yup.string()
    .required('Made in is required'),
  product_name: Yup.string()
    .required('Product name is required'),
  size: Yup.array()
    .of(Yup.string().required('Size is required'))
    .min(1, 'At least one size is required'),
});



// ========== WORKER ==================

export const WorkerValidationSchema = Yup.object().shape({
  first_name: Yup.string()
    .min(2, 'First name is too short!')
    .max(50, 'First name is too long!')
    .required('First name is required'),
  last_name: Yup.string()
    .min(2, 'Last name is too short!')
    .max(50, 'Last name is too long!')
    .required('Last name is required'),
  age: Yup.number()
    .min(9, 'Age must be at least 18')
    .max(205, 'Age must be at most 65')
    .required('Age is required'),
  email: Yup.string()
    .email('Invalid email address')
    .required('Email is required'),
  phone_number: Yup.string()
    .matches(/^\+?[1-9]\d{1,14}$/, 'Invalid phone number')
    .required('Phone number is required'),
  gender: Yup.string()
    .oneOf(['male', 'female'], 'Invalid gender')
    .required('Gender is required'),
  password: Yup.string()
    .min(8, 'Password is too short!')
    .required('Password is required'),
});