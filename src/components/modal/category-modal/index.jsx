import React, { useEffect } from "react";
import { Box, Typography, Modal, Button, TextField } from "@mui/material";
import { ErrorMessage, Field, Form, Formik } from "formik";
import { CategoryValidationSchema } from "../../../utils/validation";
import category from "../../../service/category";
import Notification from "../../../utils/notification";

const style = {
  position: "absolute",
  top: "50%",
  left: "50%",
  borderRadius: 1.3,
  transform: "translate(-50%, -50%)",
  width: 400,
  bgcolor: "background.paper",
  border: "2px solid #fff",
  boxShadow: 24,
  p: 3,
  outline: "none",
};

const CategoryModal = ({ open, handleClose, edit, fetchData }) => {
  const initialValues = {
    category_name: edit ? edit.category_name : "",
  };

  const handleSubmit = async (values, { setSubmitting }) => {
    try {
      console.log("Submitted values:", values);
      let response;
      if (edit && edit.category_id) {
        response = await category.edit({ category_id: edit.category_id, ...values });
        Notification({
          title: "Successfully edited",
          type: "success",
        });
      } else {
        response = await category.add(values);
        Notification({
          title: "Successfully added",
          type: "success",
        });
      }

      if (response.status === 200 || response.status === 201) {
        fetchData();
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
            {edit ? "Edit Category" : "Add Category"}
          </Typography>
          <Formik
            initialValues={initialValues}
            onSubmit={handleSubmit}
            validationSchema={CategoryValidationSchema}
            enableReinitialize={true}
          >
            {({ isSubmitting }) => (
              <Form>
                <Field
                  name="category_name"
                  type="text"
                  as={TextField}
                  label="Category Name"
                  fullWidth
                  margin="normal"
                  variant="outlined"
                  helperText={<ErrorMessage name="category_name" component="span" />}
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

export default CategoryModal;
