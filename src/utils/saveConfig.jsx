// Function to save the layout configuration to localStorage
export const saveLayoutConfiguration = (configuration) => {
    localStorage.setItem('layoutConfiguration', JSON.stringify(configuration));
  };
  
  // Function to retrieve the layout configuration from localStorage
  export const getLayoutConfiguration = () => {
    const configurationString = localStorage.getItem('layoutConfiguration');
    return configurationString ? JSON.parse(configurationString) : null;
  };
  

  