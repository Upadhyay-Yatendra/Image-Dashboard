import React from "react";
import Container from "@mui/material/Container";
import ImageDashboard from "./pages/ImageDashboard";
import { DragDropContext } from "react-beautiful-dnd";

const App = () => {

  return (
    <DragDropContext>
      <Container maxWidth="sm">
        <ImageDashboard />
      </Container>
    </DragDropContext> 
  );
};

export default App;
