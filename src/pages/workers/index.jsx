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
import Pagination from "@mui/material/Pagination";
import worker from "../../service/workers";
import WorkerModal from "../../components/modal/worker-modal";

const StyledTableHead = styled(TableHead)(({ theme }) => ({
  backgroundColor: "rgb(110, 126, 142)",
  color: theme.palette.common.white,
}));

const StyledTableCell = styled(TableCell)(({ theme }) => ({
  [`&.${tableCellClasses.head}`]: {
    backgroundColor: "rgb(110, 126, 142)",
    color: theme.palette.common.white,
  },
  [`&.${tableCellClasses.body}`]: {
    fontSize: 14,
  },
}));

const StyledTableRow = styled(TableRow)(({ theme }) => ({
  "&:nth-of-type(odd)": {
    backgroundColor: theme.palette.action.hover,
  },
  "&:last-child td, &:last-child th": {
    border: 0,
  },
}));

const Index = () => {
  const [workers, setWorkers] = useState([]);
  const [edit, setEdit] = useState(null);
  const [open, setOpen] = useState(false);
  const [count,setCount] = useState(0)
  const [params,setParams] = useState({
    limit:5,
    page: 1
  })

  const getData = async () => {
    try {
      const response = await worker.get(params);
      if (response.status === 200 && response.data.user) {
        setWorkers(response.data.user);
        let total = Math.ceil(response.data.totcal_count / params.limit)
        setCount(total)
      }
    } catch (error) {
      console.log(error);
    }
  };

  useEffect(() => {
    getData();
  }, [params]);

    const handleChange = (event, value) => {
     setParams((prevParams) => ({
      ...prevParams,
      page: value,
    }));
  };


  const deleteItem = async (id) => {
    try {
      const response = await worker.delete(id);
      if (response.status === 200) {
        Notification({
          title: "Successfully deleted",
          type: "success",
        });
        getData();
        setTimeout(() => {
          window.location.reload();
        }, 1600);
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

  const handleAddWorker = () => {
    setEdit(null);
    setOpen(true);
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
                  <StyledTableCell align="start">{row.first_name}</StyledTableCell>
                  <StyledTableCell align="start">{row.last_name}</StyledTableCell>
                  <StyledTableCell align="start">{row.gender}</StyledTableCell>
                  <StyledTableCell align="right">{row.age}</StyledTableCell>
                  <StyledTableCell align="right">
                    <div style={{ display: "flex", justifyContent: "flex-end", gap: "12px" }}>
                      <EditIcon
                        className="text-gray-500"
                        style={{ cursor: "pointer" }}
                        onClick={() => editItem(row)}
                      />
                      <DeleteIcon
                        className="text-gray-500"
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

      <Pagination
        className="flex justify-center mt-4 text-[#fff]"
        count={count} page={params.page} onChange={handleChange}
      />

      <WorkerModal open={open} handleClose={handleClose} edit={edit} getData={getData} />
    </div>
  );
};

export default Index;
