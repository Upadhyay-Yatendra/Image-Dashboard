import React, { useState, useEffect } from "react";
import ImageUpload from "../components/ImageUpload";
import ImageSearch from "../components/ImageSearch";
import ImageList from "../components/ImageList";
import {
  getImagesFromLocalStorage,
  mockApiCall,
  saveImagesToLocalStorage,
} from "../utils/mockApi";
import {
  Grid,
  Typography,
  Container,
  CircularProgress,
  Box,
} from "@mui/material";
import ImageModal from "../components/ImageModal";
import DeleteDialog from "../components/DeleteDialog";

const ImageDashboard = () => {
  const [isLoading, setIsLoading] = useState(true);
  const [images, setImages] = useState([]);
  const [searchTerm, setSearchTerm] = useState("");
  const [openImageModal, setOpenImageModal] = useState(false);
  const [openDeleteDialog, setOpenDeleteDialog] = useState(false);
  const [selectedImage, setSelectedImage] = useState(null);
  const [currentPage, setCurrentPage] = useState(1);
  const itemsPerPage = 6;
  const currentIndex = selectedImage
    ? images.findIndex((image) => image.id === selectedImage.id)
    : -1;

  useEffect(() => {
    const fetchData = async () => {
      const storedImages = getImagesFromLocalStorage();
      await mockApiCall(storedImages);
      setImages(storedImages);
      setIsLoading(false);
    };
    fetchData();
  }, []);

  const handleSearchChange = async (term) => {
    setIsLoading(true);
    await mockApiCall(term);
    setSearchTerm(term);
    setIsLoading(false);
  };

  const handleOpenImageModal = (image) => {
    setSelectedImage(image);
    setOpenImageModal(true);
  };

  const handleCloseImageModal = () => {
    setOpenImageModal(false);
  };

  const handlePrevious = () => {
    const currentIndex = images.findIndex((image) => image === selectedImage);
    if (currentIndex > 0) {
      const newSelectedImage = images[currentIndex - 1];
      setSelectedImage(newSelectedImage);
      setCurrentPage(Math.ceil(currentIndex / itemsPerPage));
    }
  };

  const handleNext = () => {
    const currentIndex = images.findIndex((image) => image === selectedImage);
    if (currentIndex < images.length - 1) {
      const newSelectedImage = images[currentIndex + 1];
      setSelectedImage(newSelectedImage);
      setCurrentPage(Math.ceil((currentIndex + 2) / itemsPerPage));
    }
  };

  const handleOpenDeleteDialog = (image) => {
    setSelectedImage(image);
    setOpenDeleteDialog(true);
  };

  const handleConfirmDelete = () => {
    if (selectedImage) {
      const newImages = images.filter((img) => img.id !== selectedImage.id);
      setImages(newImages);
      saveImagesToLocalStorage(newImages);
      setOpenDeleteDialog(false);
      if (
        newImages.length <= (currentPage - 1) * itemsPerPage &&
        currentPage > 1
      ) {
        setCurrentPage(currentPage - 1);
      }
    }
  };

  const filteredImages = images.filter((image) =>
    image.name.toLowerCase().includes(searchTerm.toLowerCase())
  );

  return (
    <Container>
      <Typography variant="h3" component="h1" align="center" gutterBottom>
        Image Dashboard
      </Typography>

      <Box mt={4}>
        <Grid container spacing={2} justifyContent="center" alignItems="center">
          <Grid item style={{ height: "100%" }}>
            <ImageSearch onSearch={handleSearchChange} />
          </Grid>
          <Grid item style={{ height: "100%" }}>
            <ImageUpload setImages={setImages} />
          </Grid>
        </Grid>
      </Box>
      <Box mt={4}>
        {isLoading ? (
          <Box
            display="flex"
            flexDirection="column"
            justifyContent="center"
            alignItems="center"
            sx={{ width: "100%", my: 4 }}
          >
            <CircularProgress />
            <Typography>Loading...</Typography>
          </Box>
        ) : (
          <ImageList
            images={images}
            onView={handleOpenImageModal}
            onDelete={handleOpenDeleteDialog}
            currentPage={currentPage}
            setCurrentPage={setCurrentPage}
            itemsPerPage={itemsPerPage}
            // onDragEnd={onDragEnd}
          />
        )}
      </Box>

      <ImageModal
        open={openImageModal}
        selectedImage={selectedImage}
        onClose={handleCloseImageModal}
        onPrevious={handlePrevious}
        onNext={handleNext}
        canNavigatePrevious={currentIndex > 0}
        canNavigateNext={currentIndex < images.length - 1}
      />
      <DeleteDialog
        open={openDeleteDialog}
        image={selectedImage}
        onClose={() => setOpenDeleteDialog(false)}
        onConfirmDelete={handleConfirmDelete}
      />
    </Container>
  );
};

export default ImageDashboard;
