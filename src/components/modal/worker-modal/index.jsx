import React, { useEffect } from "react";
import { Box, Typography, Modal, Button, TextField, RadioGroup, FormControlLabel, Radio } from "@mui/material";
import { ErrorMessage, Field, Form, Formik } from "formik";
import { WorkerValidationSchema } from "../../../utils/validation";
import worker from "../../../service/workers";
import Notification from "../../../utils/notification";

const style = {
  position: "absolute",
  top: "50%",
  left: "50%",
  borderRadius: 1.3,
  transform: "translate(-50%, -50%)",
  width: 600,
  bgcolor: "background.paper",
  border: "2px solid #fff",
  boxShadow: 24,
  p: 3,
  outline: "none",
};

const WorkerModal = ({ open, handleClose, edit, getData }) => {
  const initialValues = {
    age: edit ? edit.age : 0,
    email: edit ? edit.email : "",
    first_name: edit ? edit.first_name : "",
    gender: edit ? edit.gender : "",
    last_name: edit ? edit.last_name : "",
    phone_number: edit ? edit.phone_number : "",
    password: edit ? edit.password : "",
  };

  const handleSubmit = async (values, { setSubmitting }) => {
    try {
      console.log("Submitted values:", values);
      let response;
      if (edit && edit.id) {
        response = await worker.edit({ id: edit.id, ...values });
        Notification({
          title: "Successfully edited",
          type: "success",
        });
      } else {
        response = await worker.add({ ...values });
        console.log("Add worker response:", response); // Debugging log
        if (response.status === 200 || response.status === 201) {
          Notification({
            title: "Successfully added",
            type: "success",
          });
          setTimeout(() => {
            window.location.reload();
          }, 1600);
        } else {
          console.error("Error: ", response.statusText, response.data);
        }
      }

      if (response.status === 200 || response.status === 201) {
        getData();
        handleClose();
      } else {
        console.error("Error: ", response.statusText, response.data);
      }
    } catch (err) {
      console.error("Error submitting form: ", err.response ? err.response.data : err);
    } finally {
      setSubmitting(false);
    }
  };

  useEffect(() => {
    if (edit) {
      console.log("Edit mode enabled", edit);
    }
  }, [edit]);

  return (
    <Modal
      open={open}
      onClose={handleClose}
      aria-labelledby="modal-modal-title"
      aria-describedby="modal-modal-description"
    >
      <Box sx={style}>
        <div>
          <Typography id="modal-modal-title" variant="h6" component="h2">
            {edit ? "Edit Worker" : "Add Worker"}
          </Typography>
          <Formik
            initialValues={initialValues}
            onSubmit={handleSubmit}
            validationSchema={WorkerValidationSchema}
            enableReinitialize={true}
          >
            {({ isSubmitting }) => (
              <Form>
                <div className="flex gap-[20px]">
                  <Field
                    name="first_name"
                    type="text"
                    as={TextField}
                    label="First name"
                    fullWidth
                    margin="normal"
                    variant="outlined"
                    helperText={<ErrorMessage name="first_name" component="span" />}
                  />

                  <Field
                    name="last_name"
                    type="text"
                    as={TextField}
                    label="Last name"
                    fullWidth
                    margin="normal"
                    variant="outlined"
                    helperText={<ErrorMessage name="last_name" component="span" />}
                  />
                </div>

                <div className="flex gap-[20px] items-center">
                  <Field
                    name="age"
                    type="number"
                    as={TextField}
                    label="Age"
                    fullWidth
                    margin="normal"
                    variant="outlined"
                    helperText={<ErrorMessage name="age" component="span" />}
                  />

                  <Field
                    as={RadioGroup}
                    aria-label="Gender"
                    name="gender"
                    className="flex items-center py-[10px] mr-[30px]"
                    helperText={<ErrorMessage name="for_gender" component="span" />}
                  >
                    <div className="flex items-center justify-between">
                      <FormControlLabel
                        value="male"
                        control={<Radio />}
                        label="Male"
                      />
                      <FormControlLabel
                        value="female"
                        control={<Radio />}
                        label="Female"
                      />
                    </div>
                  </Field>
                </div>

                <div className="flex gap-[20px]">
                  <Field
                    name="email"
                    type="text"
                    as={TextField}
                    label="Email"
                    fullWidth
                    margin="normal"
                    variant="outlined"
                    helperText={<ErrorMessage name="email" component="span" />}
                  />

                  <Field
                    name="phone_number"
                    type="text"
                    as={TextField}
                    label="Phone number"
                    fullWidth
                    margin="normal"
                    variant="outlined"
                    helperText={<ErrorMessage name="phone_number" component="span" />}
                  />
                </div>

                <Field
                  name="password"
                  type="text"
                  as={TextField}
                  label="Password"
                  fullWidth
                  margin="normal"
                  variant="outlined"
                  helperText={<ErrorMessage name="password" component="span" />}
                />

                <div
                  style={{
                    display: "flex",
                    justifyContent: "end",
                    gap: "12px",
                    marginTop: "5px",
                  }}
                >
                  <Button
                    onClick={handleClose}
                    type="button"
                    variant="contained"
                    color="warning"
                  >
                    Close
                  </Button>
                  <Button
                    id="gray"
                    type="submit"
                    variant="contained"
                    color="success"
                    disabled={isSubmitting}
                  >
                    {edit ? "Update" : "Add"}
                  </Button>
                </div>
              </Form>
            )}
          </Formik>
        </div>
      </Box>
    </Modal>
  );
};

export default WorkerModal;
