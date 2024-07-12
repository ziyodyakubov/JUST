import http from "./config";

const product = {
  get: (params) => http.get("/products", { params }),
  add: (data) => http.post("/product", data),
  edit: (data) => http.put(`/product/${data.product_id}`, data),
  delete: (id) => http.delete(`/product/${id}`)
};

export default product;
