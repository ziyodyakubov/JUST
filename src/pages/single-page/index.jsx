import React, { useEffect, useState } from "react";
import { useParams } from "react-router-dom";
import product from "../../service/product";
import { Card, CardContent, Typography, CircularProgress, Grid, Divider, IconButton, Tooltip,CardMedia } from "@mui/material";
import { Tag } from "antd";
import DeleteIcon from "@mui/icons-material/Delete";
import EditIcon from "@mui/icons-material/Edit";
import AddPhotoAlternateIcon from "@mui/icons-material/AddPhotoAlternate";

const SinglePage = () => {
  const { id } = useParams();
  const [products, setProduct] = useState(null);

  useEffect(() => {
    const fetchProduct = async () => {
      try {
        const response = await product.single(id);
        setProduct(response.data);
      } catch (error) {
        console.log(error);
      }
    };

    fetchProduct();
  }, [id]);


  if (!products) {
    return (
      <div className="loading-container flex justify-center mt-[25%] ">
        <CircularProgress className="graychi"/>
      </div>
    );
  }

  const handleEdit = () => {
    console.log("Edit action");
  };

  const handleDelete = () => {
    console.log("Delete action");
  };

  const handleUpload = () => {
    console.log("Upload action");
  };

  return (
    <Grid container spacing={2} justifyContent="center" className="single-page-container">
      <Grid item xs={12} md={10}>
        <Card className="mt-[100px] rounded-[20px]">
          <CardContent>
            <Grid container spacing={3} className="p-[20px]">
                <Grid item xs={12} md={6}>
                <Typography variant="h4" component="div" gutterBottom className="text-[#000]">
                  {products.product_name}
                </Typography>
                <Typography variant="body1" sx={{ fontSize: '1.2rem', color: 'rgb(110, 126, 142) ' }}>
                  <strong className="text-[#000000c5]">Description:</strong> {products.description}
                </Typography>
                <Typography variant="body1" sx={{ fontSize: '1.2rem', color: 'rgb(110, 126, 142) ' }}>
                  <strong className="text-[#000000c5]">Made In:</strong> {products.made_in}
                </Typography>
                <Typography variant="body1" sx={{ fontSize: '1.2rem', color: 'rgb(110, 126, 142) ' }}>
                  <strong className="text-[#000000c5]">Color:</strong> {Array.isArray(products.color) ? products.color.join(", ") : "N/A"}
                </Typography>
                <Typography variant="body1" sx={{ fontSize: '1.2rem', color: 'rgb(110, 126, 142) ' }}>
                  <strong className="text-[#000000c5]">Size:</strong> {Array.isArray(products.size) ? products.size.join(", ") : "N/A"}
                </Typography>
                <Typography variant="body1" sx={{ fontSize: '1.2rem', color: 'rgb(110, 126, 142) ' }}>
                  <strong className="text-[#000000c5]">Count:</strong> {products.count}
                </Typography>
                <Typography variant="body1" sx={{ fontSize: '1.2rem', color: 'rgb(110, 126, 142) ' }}>
                  <strong className="text-[#000000c5]">Price:</strong> ${products.cost}
                </Typography>
                <Typography variant="body1" sx={{ fontSize: '1.2rem', color: 'rgb(110, 126, 142) ' }}>
                  <strong className="text-[#000000c5]">Discount:</strong> {products.discount}%
                </Typography>
                <Typography variant="body1" sx={{ fontSize: '1.2rem', color: 'rgb(110, 126, 142) ' }}>
                  <strong className="text-[#000000c5]">Age Range:</strong> {products.age_min} - {products.age_max} years
                </Typography>
                <Typography variant="body1" sx={{ fontSize: '1.2rem', color: 'rgb(110, 126, 142) ' }}>
                  <strong className="text-[#000000c5]">For Gender:</strong> {products.for_gender}
                </Typography>

                <div className="actions mt-[20px]">
                <Tooltip title="Delete" arrow>
                    <IconButton  onClick={handleDelete} color="rgb(110, 126, 142)">
                      <DeleteIcon />
                    </IconButton>
                  </Tooltip>
                  <Tooltip title="Edit" arrow>
                    <IconButton onClick={handleEdit} color="rgb(110, 126, 142)">
                      <EditIcon />
                    </IconButton>
                  </Tooltip>
                  <Tooltip title="Upload Image" arrow>
                    <IconButton onClick={handleUpload} color="default">
                      <AddPhotoAlternateIcon sx={{ color: "rgb(110, 126, 142)" }} />
                    </IconButton>
                  </Tooltip>
                </div>
              </Grid>
              <Grid item xs={12} md={6}>
                {products.image_url && (
                  <CardMedia
                    component="img"
                    height="auto"
                    image={products.image_url}
                    alt="product image"
                  />
                )}
              </Grid>
            </Grid>
          </CardContent>
        </Card>
      </Grid>
    </Grid>
  );
};

export default SinglePage;
