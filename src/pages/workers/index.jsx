import React, { useState, useEffect } from "react";
import { styled } from "@mui/material/styles";
import Table from "@mui/material/Table";
import TableBody from "@mui/material/TableBody";
import TableCell, { tableCellClasses } from "@mui/material/TableCell";
import Notification from "../../utils/notification";
import TableContainer from "@mui/material/TableContainer";
import TableHead from "@mui/material/TableHead";
import DeleteIcon from "@mui/icons-material/Delete";
import TableRow from "@mui/material/TableRow";
import Paper from "@mui/material/Paper";
import Button from "@mui/material/Button";
import Pagination from "@mui/material/Pagination";
import product from "../../service/product";
import { UploadOutlined } from '@ant-design/icons';
import { message, Upload } from 'antd';
import ProductModal from "../../components/modal/product-modal";
import PermMediaIcon from '@mui/icons-material/PermMedia';
import InfoIcon from '@mui/icons-material/Info';

const StyledTableHead = styled(TableHead)(({ theme }) => ({
  backgroundColor: 'rgb(110, 126, 142)',
  color: theme.palette.common.white,
}));

const StyledTableCell = styled(TableCell)(({ theme }) => ({
  [`&.${tableCellClasses.head}`]: {
    backgroundColor: 'rgb(110, 126, 142)',
    color: theme.palette.common.white,
  },
  [`&.${tableCellClasses.body}`]: {
    fontSize: 14,
  },
}));

const StyledTableRow = styled(TableRow)(({ theme }) => ({
  '&:nth-of-type(odd)': {
    backgroundColor: theme.palette.action.hover,
  },
  '&:last-child td, &:last-child th': {
    border: 0,
  },
}));

const Index = () => {
  const [products, setProducts] = useState([]);
  const [edit, setEdit] = useState(null);
  const [open, setOpen] = useState(false);
  const [error, setError] = useState(null);
  const [page, setPage] = useState(1);

  const fetchData = async () => {
    try {
      const response = await product.get({ page, limit: 10 });
      if (response.status === 200) {
        setProducts(response.data.products);
      }
    } catch (error) {
      setError("Error fetching data");
      console.error("Error fetching data:", error);
    }
  };

  useEffect(() => {
    fetchData();
  }, [page]);

  const handleChange = (event, value) => {
    setPage(value);
  };

  const deleteItem = async (id) => {
    try {
      const response = await product.delete(id);
      if (response.status === 200) {
        Notification({
          title: "Successfully deleted",
          type: "success",
        });
        fetchData();
      }
    } catch (error) {
      console.error("Error deleting item:", error);
      Notification({
        title: "Error deleting item",
        type: "error",
      });
    }
  };

  const editItem = (row) => {
    setEdit(row);
    setOpen(true);
  };

  const handleClose = () => {
    setOpen(false);
    setEdit(null);
  };

  const handleAddProduct = () => {
    setEdit(null);
    setOpen(true);
  };

  const props = {
    beforeUpload: (file) => {
      const isPNG = file.type === 'image/png';
      if (!isPNG) {
        message.error(`${file.name} is not a png file`);
      }
      return isPNG || Upload.LIST_IGNORE;
    },
    onChange: (info) => {
      console.log(info.fileList);
    },
  };

  return (
    <div>
      <div className="flex w-full justify-between items-center mb-6">
        <h1 className="text-2xl">Workers</h1>
        <Button id="gray" onClick={handleAddWorker} variant="contained">
          Add Worker
        </Button>
      </div>

      <TableContainer component={Paper}>
        <Table sx={{ minWidth: 700 }} aria-label="customized table">
          <TableHead>
            <TableRow>
              <StyledTableCell>Checkbox</StyledTableCell>
              <StyledTableCell>S/N</StyledTableCell>
              <StyledTableCell>First Name</StyledTableCell>
              <StyledTableCell>Last Name</StyledTableCell>
              <StyledTableCell>Gender</StyledTableCell>
              <StyledTableCell align="right">Age</StyledTableCell>
              <StyledTableCell align="right">Action</StyledTableCell>
            </TableRow>
          </TableHead>
          <TableBody>
            {workers &&
              workers.map((row, index) => (
                <StyledTableRow key={row.id}>
                  <StyledTableCell>
                    <form>
                      <input type="checkbox" />
                    </form>
                  </StyledTableCell>
                  <StyledTableCell>{index + 1}</StyledTableCell>
                  <StyledTableCell align="start">{row.amount}</StyledTableCell>
                  <StyledTableCell align="right">{row.client_name}</StyledTableCell>
                  <StyledTableCell align="right">{row.client_phone_number}</StyledTableCell>
                  <StyledTableCell align="right">{row.status}</StyledTableCell>
                  <StyledTableCell align="right">
                    <div style={{ display: "flex", justifyContent: "flex-end", gap: "12px" }}>

                      <EditIcon className="text-gray-500"
                        style={{ cursor: "pointer" }}
                        onClick={() => editItem(row)} />

                      <DeleteIcon className="text-gray-500"
                        style={{ cursor: "pointer" }}
                        onClick={() => deleteItem(row.id)}
                      />

                    </div>
                  </StyledTableCell>
                </StyledTableRow>
              ))}
          </TableBody>
        </Table>
      </TableContainer>

      <Pagination className="flex justify-center mt-4 text-[#fff]" count={5} page={page} onChange={handleChange} />

      {/* <OrderModal open={open} handleClose={handleClose} edit={edit} fetchData={fetchData} /> */}
    </div>
  );
};

export default Index;
