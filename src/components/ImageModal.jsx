import React from 'react';
import { Box, Modal, IconButton, Typography } from '@mui/material';
import CloseIcon from '@mui/icons-material/Close';
import ArrowBackIosIcon from '@mui/icons-material/ArrowBackIos';
import ArrowForwardIosIcon from '@mui/icons-material/ArrowForwardIos';

import { formatImageName } from '../utils/helperMethods';

const modalStyle = {
  position: 'absolute',
  top: '50%',
  left: '50%',
  transform: 'translate(-50%, -50%)',
  width: '80vw',
  height: '80vh',
  bgcolor: 'background.paper',
  boxShadow: 24,
  p: 4,
  outline: 'none',
  display: 'flex',
  flexDirection: 'column',
  alignItems: 'center',
  justifyContent: 'center',
};

const ImageModal = ({
  open,
  selectedImage,
  onClose,
  onPrevious,
  onNext,
  canNavigatePrevious,
  canNavigateNext,
}) => {
  return (
    <Modal
      open={open}
      onClose={onClose}
      aria-labelledby="image-modal-title"
      aria-describedby="image-modal-description"
    >
      <Box sx={modalStyle}>
        <IconButton
          aria-label="close"
          onClick={onClose}
          sx={{
            position: 'absolute',
            top: 8,
            right: 8,
            color: 'grey.500',
          }}
        >
          <CloseIcon />
        </IconButton>

        {canNavigatePrevious && (
          <IconButton
            aria-label="previous image"
            onClick={onPrevious}
            sx={{
              position: 'absolute',
              top: '50%',
              left: '5%',
              transform: 'translateY(-50%)',
              color: 'grey.500',
              zIndex: 'tooltip',
            }}
          >
            <ArrowBackIosIcon />
          </IconButton>
        )}

        {selectedImage && (
          <>
            <img
              src={selectedImage.url}
              alt={selectedImage.name}
              style={{
                maxWidth: '100%',
                maxHeight: '100%',
                objectFit: 'contain',
              }}
            />
            <Typography variant="h5" gutterBottom component="div">
              {formatImageName(selectedImage.name)}
            </Typography>
          </>
        )}

        {canNavigateNext && (
          <IconButton
            aria-label="next image"
            onClick={onNext}
            sx={{
              position: 'absolute',
              top: '50%',
              right: '5%',
              transform: 'translateY(-50%)',
              color: 'grey.500',
              zIndex: 'tooltip',
            }}
          >
            <ArrowForwardIosIcon />
          </IconButton>
        )}
      </Box>
    </Modal>
  );
};

export default ImageModal;
