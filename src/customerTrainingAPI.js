export const getCustomers = () => {
    return fetch(import.meta.env.VITE_API_URL + "/api/customers").then((response) => {
      if (!response.ok) throw new Error("Error in fetch" + response.statusText);
  
      return response.json();
    });
  };
 

  export const getTraining = () => {
    return fetch(import.meta.env.VITE_API_URL + "/gettrainings").then((response) => {
      if (!response.ok) throw new Error("Error in fetch" + response.statusText);
  
      return response.json();
    });
  };

  // export const getCustomerTraining = () => {
  //   return fetch(
  //     "https://customerrestservice-personaltraining.rahtiapp.fi/api/trainings/{id}/customer"
  //   ).then((response) => {
  //     if (!response.ok) {
  //       throw new Error("Error in fetch " + response.statusText);
  //     } else {
  //       return response.json();
  //     }
  //   });
  // };