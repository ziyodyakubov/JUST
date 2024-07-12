import http from "./config";

const category = {
  get: (params) => http.get("/categories", { params }),
  add: (data) => http.post('/category', data),
  edit: (data) => http.put('/category', data),
  delete: (id) => http.delete(`/category/${id}`)
};

export default category;