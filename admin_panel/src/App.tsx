import { MemoryRouter as Router } from "react-router-dom";
import { userRoutes } from "./Routes";
import { useAuth } from "./hooks/auth.hook";
import { AuthContext } from "./context/AuthContext";
import Loader from "./components/Loader";
import Navbar from "./components/Navbar";

function App() {
  const {token,ready,enter,out} = useAuth()
  const routes = userRoutes(!!token)
  if(!ready){
    return <Loader/>
  }
  return (
    <AuthContext.Provider value={{
      enter, out, token, ready
    }}>
      <Router>
        <Navbar/>
        <div>
          {routes}
        </div>
      </Router>
    </AuthContext.Provider>
  );
}

export default App;
