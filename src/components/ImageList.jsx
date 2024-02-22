import React, { useState, useEffect } from "react";
import Grid from "@mui/material/Grid";
import Pagination from "@mui/material/Pagination";
import Box from "@mui/material/Box";
import Typography from "@mui/material/Typography";
import { Droppable, Draggable } from "react-beautiful-dnd";
import ImageCard from "./ImageCard";
import {
  saveLayoutConfiguration,
  getLayoutConfiguration,
} from "../utils/saveConfig";

const ImageList = ({
  images,
  onView,
  onDelete,
  currentPage,
  setCurrentPage,
  itemsPerPage,
}) => {
  const handleChangePage = (event, page) => {
    setCurrentPage(page);
  };

  // Initial state and useEffect hook to initialize the state from props
  const [imagesState, setImages] = useState(images || []);

  // Call updateLayoutConfiguration whenever images prop changes
  useEffect(() => {
    setImages(images || []);
  }, [images]);
  // console.log("images->", images);
  return (
    <Droppable droppableId="imageList">
      {(provided) => (
        <Box
          ref={provided.innerRef}
          {...provided.droppableProps}
          sx={{
            width: "100%",
            position: "relative",
            mb: 10,
          }}
        >
          {imagesState.length > 0 ? (
            <>
              <Grid container spacing={2} justifyContent="center">
                {imagesState.map((image, index) => (
                  <Draggable
                    key={image.id}
                    draggableId={image.id.toString()}
                    index={index}
                  >
                    {(provided) => (
                      <Grid
                        item
                        xs={12} // Full width on extra small screens
                        sm={6} // Half width on small screens
                        md={4} // One-third width on medium screens
                        lg={4} // One-fourth width on large screens
                        xl={4} // One-sixth width on extra large screens (optional)
                        ref={provided.innerRef}
                        {...provided.draggableProps}
                        {...provided.dragHandleProps}
                      >
                        <ImageCard
                          image={image}
                          onView={() => onView(image)}
                          onDelete={() => onDelete(image)}
                        />
                      </Grid>
                    )}
                  </Draggable>
                ))}
              </Grid>

              <Pagination
                count={Math.ceil(imagesState.length / itemsPerPage)}
                page={currentPage}
                onChange={handleChangePage}
                color="primary"
                sx={{
                  position: "absolute",
                  // bottom: 0,
                  left: "50%",
                  transform: "translateX(-50%)",
                }}
              />
            </>
          ) : (
            <Typography variant="subtitle1" align="center">
              No Images Found
            </Typography>
          )}
          {provided.placeholder}
        </Box>
      )}
    </Droppable>
  );
};

export default ImageList;
