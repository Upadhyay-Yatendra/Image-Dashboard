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
  // onDragEnd,
}) => {
  const handleChangePage = (event, page) => {
    setCurrentPage(page);
  };
  // console.log(images);
  // Initial state and useEffect hook to initialize the state from localStorage
  const [imagesState, setImages] = useState(images || []);

  // Handler function for drag-and-drop
  const onDragEnd = (result) => {
    const { source, destination } = result;
    console.log("On Dragend is called");

    // Check if the drag-and-drop operation was successful and if the destination index is different from the source index
    if (destination && source.index !== destination.index) {
      const newImages = Array.from(imagesState);
      const [removed] = newImages.splice(source.index, 1); // Remove the dragged item from its original position
      newImages.splice(destination.index, 0, removed); // Insert the dragged item into the new position

      // Update state with the new reordered images array
      setImages(newImages);

      // Update layout configuration in localStorage
      updateLayoutConfiguration(newImages);
    }
  };
  // Function to update the layout configuration
  const updateLayoutConfiguration = (newConfiguration) => {
    saveLayoutConfiguration(newConfiguration); // Save configuration to localStorage
    setImages(newConfiguration); // Update state with the new configuration
    // ****** there is an issue with the above line 
  };
  useEffect(() => {
    // Call updateLayoutConfiguration whenever imagesState changes
    updateLayoutConfiguration(imagesState);
  }, [imagesState]);
  // Update imagesState when the images prop changes
  useEffect(() => {
    setImages(images || []);
  }, [images]);

  // console.log("\n\n\n", imagesState.length);
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
              <Grid container spacing={2}>
                {imagesState.map((image, index) => (
                  <Draggable
                    key={image.id}
                    draggableId={image.id.toString()}
                    index={index}
                    onDragEnd={onDragEnd}
                  >
                    {(provided) => (
                      <Grid
                        item
                        xs={4}
                        sm={4}
                        md={4}
                        lg={4}
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
                  bottom: 0,
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
