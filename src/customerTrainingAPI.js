export const getCustomers = () => {
    return fetch("https://customerrestservice-personaltraining.rahtiapp.fi/api/customers").then((response) => {
      if (!response.ok) throw new Error("Error in fetch" + response.statusText);
  
      return response.json();
    });
  };
 

  export const getTraining = () => {
    return fetch("https://customerrestservice-personaltraining.rahtiapp.fi/api/trainings").then((response) => {
      if (!response.ok) throw new Error("Error in fetch" + response.statusText);
  
      return response.json();
    });
  };