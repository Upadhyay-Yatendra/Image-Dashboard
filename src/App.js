import React, { useEffect, useState } from "react";
import Container from "@mui/material/Container";
import ImageDashboard from "./pages/ImageDashboard";
import { DragDropContext } from "react-beautiful-dnd";
import {
  getImagesFromLocalStorage,
  mockApiCall,
  saveImagesToLocalStorage,
} from "./utils/mockApi";

const App = () => {
  const [images, setImages] = useState([]);
  const [isLoading, setIsLoading] = useState(true);

  useEffect(() => {
    const fetchData = async () => {
      const storedImages = getImagesFromLocalStorage();
      await mockApiCall(storedImages);
      setImages(storedImages);
      setIsLoading(false);
    };
    fetchData();
  }, []);

  // Handler function for drag-and-drop
  const onDragEnd = (result) => {
    const { source, destination } = result;

    // Check if the drag-and-drop operation was successful and if the destination index is different from the source index
    if (destination && source.index !== destination.index) {
      const newImages = Array.from(images);
      const [removed] = newImages.splice(source.index, 1);
      newImages.splice(destination.index, 0, removed);

      // Update layout configuration in localStorage
      saveImagesToLocalStorage(newImages);
      setImages(newImages); // Update state with the new order of images
    }
  };

  return (
    <DragDropContext onDragEnd={onDragEnd}>
      <Container maxWidth="sm">
        <ImageDashboard images={images} setImages={setImages} />
      </Container>
    </DragDropContext>
  );
};

export default App;
