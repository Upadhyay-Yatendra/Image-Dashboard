export const mockApiCall = (data) => {
    return new Promise((resolve) => {
      setTimeout(() => {
        resolve(data);
      }, 1000);
    });
  };
  
  export const saveImagesToLocalStorage = (images) => {
    localStorage.setItem('images', JSON.stringify(images));
  };
  
  export const getImagesFromLocalStorage = () => {
    const images = localStorage.getItem('images');
    return images ? JSON.parse(images) : [];
  };
  