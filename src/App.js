import { useEffect, useState } from "react";
import { BrowserRouter as Router, Routes, Route, Navigate, useLocation } from "react-router-dom";
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
import { LOGIN, REGISTER, CONTACTS, BAR, PIE, LINE, FORM, INVOICES, TEAM, CALENDAR, GEOGRAPHY, DASHBOARD, FAQROUTE } from "./data/routes";
import { ChakraBaseProvider } from "@chakra-ui/react";

function App() {

  //theme hooks
  const [theme, colorMode] = useMode();
  const [isSidebar, setIsSidebar] = useState(true);

  //check if user is logged in
  const {user, isLoading} = useAuth();
  const {pathname} = useLocation();



  return (

    <ColorModeContext.Provider value={colorMode}>
      <ThemeProvider theme={theme}>
        <CssBaseline />
        <div className="app">
          { user ? <Sidebar isSidebar={isSidebar} /> : null}
          <main className="content">
            { user ? <Topbar setIsSidebar={setIsSidebar} /> : null}
            
              <Routes>
                <Route path="/" element={<Root/>} />
                
                <Route path={LOGIN} element={!user ? <Login/> : <Navigate to={DASHBOARD}/>} />
                <Route path={REGISTER} element={!user ? <Register/> : <Navigate to={DASHBOARD}/>} />
                
                <Route path={DASHBOARD} element={user ? <Dashboard/> : <Navigate to={LOGIN}/>} />
                <Route path={TEAM} element={user ? <Team/> : <Navigate to={LOGIN}/>} />
                <Route path={CONTACTS} element={user ? <Contacts/> : <Navigate to={LOGIN}/>} />
                <Route path={INVOICES} element={user ? <Invoices/> : <Navigate to={LOGIN}/>} />
                <Route path={FORM} element={user ? <Form/> : <Navigate to={LOGIN}/>} />
                <Route path={BAR} element={user ? <Bar/> : <Navigate to={LOGIN}/>} />
                <Route path={PIE} element={user ? <Pie/> : <Navigate to={LOGIN}/>} />
                <Route path={LINE} element={user ? <Line/> : <Navigate to={LOGIN}/>} />
                <Route path={FAQROUTE} element={user ? <FAQ/> : <Navigate to={LOGIN}/>} />
                <Route path={CALENDAR} element={user ? <Calendar/> : <Navigate to={LOGIN}/>} />
                <Route path={GEOGRAPHY} element={user ? <Geography/> : <Navigate to={LOGIN}/>} />
              </Routes>
            
          </main>
        </div>
      </ThemeProvider>
    </ColorModeContext.Provider>
  );
}

export default App;
