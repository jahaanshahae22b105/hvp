import { useEffect, useState } from "react";
import { Routes, Route, Navigate, useLocation } from "react-router-dom";
import Topbar from "./scenes/global/Topbar";
import Sidebar from "./scenes/global/Sidebar";
import Dashboard from "./scenes/dashboard";
import Team from "./scenes/team";
import Invoices from "./scenes/invoices";
import Contacts from "./scenes/contacts";
import Bar from "./scenes/bar";
import Form from "./scenes/form";
import Line from "./scenes/line";
import Pie from "./scenes/pie";
import FAQ from "./scenes/faq";
import Geography from "./scenes/geography";
import { CssBaseline, ThemeProvider } from "@mui/material";
import { ColorModeContext, useMode } from "./theme";
import Calendar from "./scenes/calendar/calendar";
import Root from "./scenes/root";
import Login from "./scenes/login";
import Register from "./scenes/register";
import { useAuth } from "./hooks/auth";

function App() {

  //theme hooks
  const [theme, colorMode] = useMode();
  const [isSidebar, setIsSidebar] = useState(true);

  //check if user is logged in
  
  const {user, isLoading} = useAuth();
  const auth = user;
  const {pathname} = useLocation();
    useEffect(() => {

      
        
    }, [pathname, user, isLoading])


  return (
    <ColorModeContext.Provider value={colorMode}>
      <ThemeProvider theme={theme}>
        <CssBaseline />
        <div className="app">
          { auth ? <Sidebar isSidebar={isSidebar} /> : null}
          <main className="content">
            { auth ? <Topbar setIsSidebar={setIsSidebar} /> : null}
            <Routes>
              <Route path="/" element={<Root/>} />
              <Route path="/login" element={!auth ? <Login/> : <Navigate to="/dashboard"/>} />
              <Route path="/register" element={!auth ? <Register/> : <Navigate to="/dashboard"/>} />
              <Route path="/dashboard" element={auth ? <Dashboard/> : <Navigate to="/login"/>} />
              <Route path="/team" element={auth ? <Team/> : <Navigate to="/login"/>} />
              <Route path="/contacts" element={auth ? <Contacts/> : <Navigate to="/login"/>} />
              <Route path="/invoices" element={auth ? <Invoices/> : <Navigate to="/login"/>} />
              <Route path="/form" element={auth ? <Form/> : <Navigate to="/login"/>} />
              <Route path="/bar" element={auth ? <Bar/> : <Navigate to="/login"/>} />
              <Route path="/pie" element={auth ? <Pie/> : <Navigate to="/login"/>} />
              <Route path="/line" element={auth ? <Line/> : <Navigate to="/login"/>} />
              <Route path="/faq" element={auth ? <FAQ/> : <Navigate to="/login"/>} />
              <Route path="/calendar" element={auth ? <Calendar/> : <Navigate to="/login"/>} />
              <Route path="/geography" element={auth ? <Geography/> : <Navigate to="/login"/>} />
            </Routes>
          </main>
        </div>
      </ThemeProvider>
    </ColorModeContext.Provider>
  );
}

export default App;
