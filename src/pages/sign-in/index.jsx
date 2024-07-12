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

const Index = () => {
  const initialValues = {
    email: "xasannosirov094@gmail.com",
    password: "Sehtols@01",
  };
  const navigate = useNavigate();
  const [showPassword, setShowPassword] = useState(false);
  
  const handleSubmit = async (values) => {
    try {
      const response = await auth.login(values);
      if (response.status === 200) {
        console.log(response)
        localStorage.setItem("access_token", response?.data?.access_token);
        localStorage.setItem("refresh_token",response?.data?.refresh_token)
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
        <h1 className="text-[35px] text-gray-600 font-normal sm:text-[36px] md:text-[56px]">
          Sign In
        </h1>
        <div className="max-w-[400px]">
          <Formik initialValues={initialValues} onSubmit={handleSubmit} validationSchema={signInValidationSchema}>
            {({ isSubmitting }) => (
              <Form>
                <Field
                  name="email"
                  type="email"
                  as={TextField}
                  label="Email address"
                  fullWidth
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
                <Field
                  name="password"
                  type={showPassword ? "text" : "password"}
                  as={TextField}
                  label="Password"
                  fullWidth
                  margin="normal"
                  variant="outlined"
                  helperText={
                    <ErrorMessage
                      name="password"
                      component="span"
                      className="text-gray-500 text-[15px]"
                    />
                  }
                  InputProps={{
                    endAdornment: (
                      <InputAdornment position="end" sx={{backgroundColor: "white"}}>
                        <IconButton
                          onClick={() => setShowPassword(!showPassword)}
                          edge="end"
                        >
                          {showPassword ? <VisibilityOff /> : <Visibility />}
                        </IconButton>
                      </InputAdornment>
                    ),
                  }}
                />
               
                 <Button
                id="gray"
                  type="submit"
                  variant="contained"
                  color="primary"
                  fullWidth
                  disabled={isSubmitting}
                >
                  {isSubmitting ? "Submitting" : "Submit"}
                </Button>


              </Form>
            )}
          </Formik>
        </div>
      </div>
    </>
  );
};

export default Index;
