import http from "./config";

const category = {
  get: () => http.get("/categories", { params: { page: 1, limit: 10 } }),
  add: (data) => http.post('/category', data),
  edit: (data) => http.put('/category', data),
  delete: (id) => http.delete(`/category/${id}`)
};

export default category;