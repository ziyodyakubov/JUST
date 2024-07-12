import React, { useState, useEffect } from "react";
import { styled } from "@mui/material/styles";
import Table from "@mui/material/Table";
import TableBody from "@mui/material/TableBody";
import TableCell, { tableCellClasses } from "@mui/material/TableCell";
import Notification from "../../utils/notification";
import TableContainer from "@mui/material/TableContainer";
import TableHead from "@mui/material/TableHead";
import DeleteIcon from "@mui/icons-material/Delete";
import EditIcon from "@mui/icons-material/Edit";
import TableRow from "@mui/material/TableRow";
import Paper from "@mui/material/Paper";
import Button from "@mui/material/Button";
import Pagination from '@mui/material/Pagination';
import category from "../../service/category";
import { CategoryModal } from "@modal";

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
  const [categories, setCategory] = useState([]);
  const [edit, setEdit] = useState(null);
  const [open, setOpen] = useState(false);
  const [error, setError] = useState(null);

  const fetchData = async () => {
    try {
      const response = await category.get();
      if (response.status === 200) {
        setCategory(response.data.categories);
      }
    } catch (error) {
      setError("Error fetching data");
      console.error("Error fetching data:", error);
    }
  };

  useEffect(() => {
    fetchData();
  }, []);

  const [page, setPage] = useState(1);
  const handleChange = (event, value) => {
    setPage(value);
  };

  const deleteItem = async (id) => {
    try {
      const response = await category.delete(id);
      if (response.status === 200) {
        Notification({
          title: "Successfully deleted",
          type: "success",
        });

        setTimeout(function () {
          window.location.reload();
        }, 2000);
      } else {
        console.error("Error deleting item, response status:", response.status);
        Notification({
          title: "Error deleting item",
          type: "error",
        });
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

  const handleAddCategory = () => {
    setEdit(null);
    setOpen(true);
  };

  return (
    <div>
      <div className="flex w-full justify-between items-center mb-6">
        <h1 className="text-2xl">Category</h1>
        <Button id="gray" onClick={handleAddCategory} variant="contained">
          Add Category
        </Button>
      </div>

      <TableContainer component={Paper}>
        <Table sx={{ minWidth: 700 }} aria-label="customized table">
          <StyledTableHead>
            <TableRow>
              <StyledTableCell>Checkbox</StyledTableCell>
              <StyledTableCell>S/N</StyledTableCell>
              <StyledTableCell>Name</StyledTableCell>
              <StyledTableCell>Action</StyledTableCell>
            </TableRow>
          </StyledTableHead>
          <TableBody>
            {categories && categories.map((row, index) => (
              <StyledTableRow key={row.category_id}>
                <StyledTableCell>
                  <form>
                    <input type="checkbox" />
                  </form>
                </StyledTableCell>
                <StyledTableCell>{index + 1}</StyledTableCell>
                <StyledTableCell>{row.category_name}</StyledTableCell>
                <StyledTableCell align="center">
                  <div style={{ display: "flex", justifyContent: "flex-center", gap: "12px" }}>
                    <EditIcon className="text-gray-500 cursor-pointer" onClick={() => editItem(row)} />
                    <DeleteIcon className="text-gray-500 cursor-pointer" onClick={() => deleteItem(row.category_id)} />
                  </div>
                </StyledTableCell>
              </StyledTableRow>
            ))}
          </TableBody>
        </Table>
      </TableContainer>

      <Pagination className="flex justify-center mt-4 text-[#fff]" count={5} page={page} onChange={handleChange} />

      <CategoryModal open={open} handleClose={handleClose} edit={edit} fetchData={fetchData} />
    </div>
  );
};

export default Index;
