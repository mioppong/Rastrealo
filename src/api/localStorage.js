export const loadToken = () => {
    try {
      const serializedToken = localStorage.getItem("token");
      if (serializedToken === null) {
        return undefined;
      }
      return JSON.parse(serializedToken);
    } catch (err) {
      return undefined;
    }
  };
  
  
  export const saveToken = token => {
    try {
      const serializedToken = JSON.stringify(token);
      localStorage.setItem("token", serializedToken);
    } catch (err) {
      //ignoring write erros
    }
  };