import './staffint.css';
import { useState } from "react";
import { useLocation } from 'react-router-dom';
import Header from "./Header/staffHeader";
import Background from './Background/staffBackground';
import Sidebar from './Sidebar/staffSidebar';
import Footer from "./Footer/staffFooter";
import StaffDashboard from "./StaffDashboard/staffDashboard";

function Staff(){
    const [isSidebarOpen, setIsSidebarOpen] = useState(false);

    const toggleSidebar = () => setIsSidebarOpen(!isSidebarOpen);
    const closeSidebar = () => setIsSidebarOpen(false);

    const location = useLocation();
    const data = location.state;
    console.log(data);
    return (
      <>
        <Header name={data.userName} />
        <Background />
        <Sidebar
            isOpen={isSidebarOpen}
            toggleSidebar={toggleSidebar}
            closeSidebar={closeSidebar}
        />
        <StaffDashboard />
        <Footer />
      </>
    );
}

export default Staff;
