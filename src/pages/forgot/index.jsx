import {
  Button,
  IconButton,
  InputAdornment,
  TextField,
  Typography,
} from "@mui/material";
import { useNavigate } from "react-router-dom";
import { useEffect, useState } from "react";
import { ErrorMessage, Field, Form, Formik } from "formik";
import { Visibility, VisibilityOff } from "@mui/icons-material";
import { auth } from "../../service/index";
import { Notification } from "../../utils/index";
import {signInValidationSchema} from "../../utils/validation"
import {SignInModal} from "../../components/modal"

const Index = () => {
  const initialValues = {
    email: "",
    password: "",
  };
  const navigate = useNavigate();
  const [email, setEmail] = useState("");
  const [showPassword, setShowPassword] = useState(false);

  const handleSubmit = async (values) => {
    try {
      const response = await auth.sign_in(values);
      if (response.status === 200) {
        localStorage.setItem("access_token", response?.data?.access_token);
        Notification({
          title: "Sign In Successfuly",
          type: "success",
        });
        setTimeout(() => {
          navigate("/");
        }, 2300);
      }
    } catch (error) {
      console.error(error);
      Notification({
        title: "Sign In Failed",
        type: "error",
      })
    }
  };
  useEffect(() => {
    if (localStorage.getItem("access_token")) {
      navigate("/");
    }
  }, []);
  return (
    <>
      <div className="h-screen flex-col flex items-center justify-center p-5">
        <h1 className="text-[25px] text-gray-600 font-normal sm:text-[26px] md:text-[36px]">
          Enter email
        </h1>
        <div className="max-w-[500px]">
          <Formik initialValues={initialValues} onSubmit={handleSubmit} validationSchema={signInValidationSchema}>
            {({ isSubmitting }) => (
              <Form>
                <Field
                  name="email"
                  type="email"
                  as={TextField}
                  label="Email"
                  sx={{width: "400px"}}
                  margin="normal"
                  variant="outlined"
                  helperText={
                    <ErrorMessage
                      name="email"
                      component="span"
                      className="text-gray-500 text-[15px]"
                    />
                  }
                />
               <div className="flex justify-between">
                 <Button
                id="gray"
                  type="submit"
                  variant="contained"
                  color="primary"
                  fullWidth
                  disabled={isSubmitting}
                  sx={{ marginBottom: "8px",width:"400px" }}
                >
                  {isSubmitting ? "Submitting" : "Submit"}
                </Button>

               </div>

              </Form>
            )}
          </Formik>
        </div>
      </div>
    </>
  );
};

export default Index;
