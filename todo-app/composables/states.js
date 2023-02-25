
    

  console.log("prr", process.server);
  // let user = {}
  if (!process.server) {
    const user = JSON.parse(localStorage.getItem("USER") || "{}") 
    console.log("user auth ", user);
  }
export const useAuth = () => 
  useState(() => ({
    isAuthenticated: false
  }));
  
