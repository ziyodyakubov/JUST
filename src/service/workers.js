import http from "./config";

const worker = {
  get: (params) => http.get("/workers", { params }),
  add: (data) => http.post("/worker", data),
  edit: (data) => http.put("/worker", data),
  delete: (id) => http.delete(`/worker/${id}`),
};

export default worker;
