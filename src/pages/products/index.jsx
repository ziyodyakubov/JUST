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
import { useNavigate } from "react-router-dom";
import http from "../../service/config"

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
  const navigate = useNavigate()
  const [count,setCount] = useState(0)
  const [params,setParams] = useState({
    limit:5,
    page: 1
  })

  const fetchData = async () => {
    try {
      const response = await product.get(params);
      if (response.status === 200) {
        setProducts(response.data.products); 
        let total = Math.ceil(response.data.total_count / params.limit)
        setCount(total)
      }
    } catch (error) {
      setError("Error fetching data");
      console.error("Error fetching data:", error);
    }
  };

  useEffect(() => {
    fetchData();
  }, [params]);

  const handleChange = (event, value) => {
    setParams((prevParams) => ({
      ...prevParams,
      page: value,
    }));
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

  const infoItem = (id)=>{
    navigate(`/products/${id}`);
  }


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
    const isJPG = file.type === 'image/jpg';
    const isSVG = file.type === 'image/svg';

    const id = "cf3dab8f-7e01-4c8e-bd98-99821071e2cf"

    if (!isPNG || !isJPG || !isSVG) {
      console.log(file)
      const files = new FormData()
      files.append("file",file)
      http.post(`media/upload-photo?id=${id}`,files)

      message.success(`${file.name} added`);
    }
    return Upload.LIST_IGNORE;
  },
  onChange: (info) => {
    console.log(info.fileList);
  },
};

  return (
    <div>
      <div className="flex w-full justify-between items-center mb-6">
        <h1 className="text-2xl">Products</h1>
        <Button id="gray" onClick={handleAddProduct} variant="contained">
          Add Product
        </Button>
      </div>

      <TableContainer component={Paper}>
        <Table sx={{ minWidth: 700 }} aria-label="customized table">
          <StyledTableHead>
            <TableRow>
              <StyledTableCell>Checkbox</StyledTableCell>
              <StyledTableCell>S/N</StyledTableCell>
              <StyledTableCell>Name</StyledTableCell>
              <StyledTableCell>Color</StyledTableCell>
              <StyledTableCell>Size</StyledTableCell>
              <StyledTableCell>Count</StyledTableCell>
              <StyledTableCell align="center">Price</StyledTableCell>
              <StyledTableCell align="right">Action</StyledTableCell>
            </TableRow>
          </StyledTableHead>
          <TableBody>
            {products && products.map((row, index) => (
              <StyledTableRow key={row.product_id}>
                <StyledTableCell>
                  <form>
                    <input type="checkbox" />
                  </form>
                </StyledTableCell>
                <StyledTableCell>{index + 1}</StyledTableCell>
                <StyledTableCell>{row.product_name}</StyledTableCell>
                <StyledTableCell>{row.color[0]}</StyledTableCell>
                <StyledTableCell>{row.size[0]}</StyledTableCell>
                <StyledTableCell>{row.count}</StyledTableCell>
                <StyledTableCell align="center">{`${row.cost} USD`}</StyledTableCell>
                <StyledTableCell>
                  <div style={{ display: "flex", justifyContent: "flex-end", gap: "12px" }}>
                    <DeleteIcon className="text-gray-500 cursor-pointer" onClick={() => deleteItem(row.product_id)} />
                      <Upload {...props}>
                  <PermMediaIcon className="cursor-pointer text-gray-500" icon={<UploadOutlined />}/>
                  </Upload>
                    <InfoIcon className="text-gray-500 cursor-pointer" onClick={() => infoItem(row.product_id)} />
                  </div>
                </StyledTableCell>
              </StyledTableRow>
            ))}
          </TableBody>
        </Table>
      </TableContainer>

      <Pagination className="flex justify-center mt-4 text-[#fff]" count={count} page={params.page} onChange={handleChange}  />

      <ProductModal open={open} handleClose={handleClose} edit={edit} fetchData={fetchData} />
    </div>
  );
};

export default Index;
