import React, { useEffect, useState } from "react";
import {
  Box,
  Typography,
  Modal,
  Button,
  TextField,
  RadioGroup,
  FormControlLabel,
  Radio,
  MenuItem,
  Select,
  Checkbox,
  ListItemText
} from "@mui/material";
import { ErrorMessage, Field, Form, Formik } from "formik";
import { ProductValidationSchema } from "../../../utils/validation";
import product from "../../../service/product";
import category from "../../../service/category";
import Notification from "../../../utils/notification";
import TextArea from "antd/es/input/TextArea";

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

const colors = ["Red", "Green", "Blue", "Yellow", "Black", "White"];
const sizes = ["S", "M", "L", "XL", "XXL"];

const ProductModal = ({ open, handleClose, edit, fetchData }) => {
  const initialValues = {
    age_max: edit?.age_max || 0,
    age_min: edit?.age_min || 0,
    category_id: edit?.category_id || "",
    color: edit?.color || [],
    cost: edit?.cost || 0,
    count: edit?.count || 0,
    description: edit?.description || "",
    discount: edit?.discount || 0,
    for_gender: edit?.for_gender || "",
    made_in: edit?.made_in || "",
    product_name: edit?.product_name || "",
    size: edit?.size || [],
  };

  const handleSubmit = async (values, { setSubmitting }) => {
    const payload = {
      ...values,
      age_max: parseInt(values.age_max, 10),
      age_min: parseInt(values.age_min, 10),
      cost: parseFloat(values.cost),
      count: parseInt(values.count, 10),
      discount: parseFloat(values.discount),
    };

    try {
      console.log("Submitted values:", payload);
      let response;
      if (edit && edit.category_id) {
        response = await product.edit({ category_id: edit.category_id, ...payload });
          Notification({
            title: "Successfully edited",
            type: "success",
          });
      } else {
          response = await product.add(payload)
          if(response.status === 200 || response.status === 201){
          Notification({
            title: "Successfully added",
            type: "success",
          });
        setTimeout(function () {
          window.location.reload();
        }, 1700);
          }else{
          Notification({
            title: "Unsuccessfully added",
            type: "error",
          });
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

  const [data, setData] = useState([]);
  const getData = async () => {
    try {
      const response = await category.get({page: 1,limit:10});
      if (response.status === 200 && response?.data?.categories) {
        setData(response?.data?.categories);
      }
    } catch (error) {
      console.log(error);
    }
  };

  console.log("data",data)

  useEffect(() => {
    getData();
  }, []);

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
            {edit ? "Edit Product" : "Add Product"}
          </Typography>
          <Formik
            initialValues={initialValues}
            onSubmit={handleSubmit}
            validationSchema={ProductValidationSchema}
            enableReinitialize={true}
          >
            {({ isSubmitting, values, setFieldValue }) => (
              <Form>
                <div className="flex gap-[20px]">
                  <Field
                    name="age_max"
                    type="number"
                    as={TextField}
                    label="Max age"
                    fullWidth
                    margin="normal"
                    variant="outlined"
                    helperText={<ErrorMessage name="age_max" component="span" />}
                  />

                  <Field
                    name="age_min"
                    type="number"
                    as={TextField}
                    label="Min age"
                    fullWidth
                    margin="normal"
                    variant="outlined"
                    helperText={<ErrorMessage name="age_min" component="span" />}
                  />
                </div>

                <div className="flex gap-[20px]">
                  <Field
                    as={Select}
                    name="color"
                    fullWidth
                    label="Color"
                    multiple
                    value={values.color}
                    onChange={(event) => setFieldValue('color', event.target.value)}
                    renderValue={(selected) => Array.isArray(selected) ? selected.join(", ") : ""}
                    helperText={<ErrorMessage name="color" component="span" />}
                  >
                    {colors.map((color) => (
                      <MenuItem key={color} value={color}>
                        <Checkbox checked={values.color.indexOf(color) > -1} />
                        <ListItemText primary={color} />
                      </MenuItem>
                    ))}
                  </Field>

                  <Field
                    as={Select}
                    name="size"
                    fullWidth
                    label="Size"
                    multiple
                    value={values.size}
                    onChange={(event) => setFieldValue('size', event.target.value)}
                    renderValue={(selected) => Array.isArray(selected) ? selected.join(", ") : ""}
                    helperText={<ErrorMessage name="size" component="span" />}
                  >
                    {sizes.map((size) => (
                      <MenuItem key={size} value={size}>
                        <Checkbox checked={values.size.indexOf(size) > -1} />
                        <ListItemText primary={size} />
                      </MenuItem>
                    ))}
                  </Field>
                </div>

                <div className="flex gap-[20px] justify-between items-center">
                  <Field
                    name="count"
                    type="number"
                    as={TextField}
                    label="Count"
                    sx={{ width: 265 }}
                    margin="normal"
                    variant="outlined"
                    helperText={<ErrorMessage name="count" component="span" />}
                  />

                  <Field
                    as={RadioGroup}
                    aria-label="For gender"
                    name="for_gender"
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
                    as="select"
                    name="category_id"
                    className="w-full border py-5 rounded-md px-1"
                  >
                    {data?.map((item) => (
                      <option key={item.category_id} value={item.category_id}>
                        {item.category_name}
                      </option>
                    ))}
                  </Field>

                  <Field
                    as="select"
                    name="made_in"
                    className="w-full border py-5 rounded-md px-1"
                  >
                    {["Uzbekistan", "China", "Turkey"].map((item) => (
                      <option key={item} value={item}>
                        {item}
                      </option>
                    ))}
                  </Field>
                </div>

                <div className="flex gap-[20px]">
                  <Field
                    name="cost"
                    type="number"
                    as={TextField}
                    label="Price"
                    fullWidth
                    margin="normal"
                    variant="outlined"
                    helperText={<ErrorMessage name="cost" component="span" />}
                  />

                  <Field
                    name="discount"
                    type="number"
                    as={TextField}
                    label="Discount"
                    fullWidth
                    margin="normal"
                    variant="outlined"
                    helperText={<ErrorMessage name="discount" component="span" />}
                  />
                </div>

                <Field
                  name="product_name"
                  type="text"
                  as={TextField}
                  label="Name"
                  fullWidth
                  margin="normal"
                  variant="outlined"
                  helperText={<ErrorMessage name="product_name" component="span" />}
                />

                <Field
                  name="description"
                  type="text"
                  as={TextArea}
                  placeholder="Description"
                  className="mb-2"
                  fullWidth
                  rows="5"
                  helperText={<ErrorMessage name="description" component="span" />}
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

export default ProductModal;
