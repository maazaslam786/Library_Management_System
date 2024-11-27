import React, { useState } from "react";
import { createBrowserRouter, RouterProvider } from "react-router-dom";
import { AuthProvider } from "./Auth/auth.jsx";
import ProtectedRoute from "./Auth/protectedRoutes.jsx";
import Login from "./Login/login.jsx";
import Background from "./Background/background.jsx";
import Header from "./Header/header.jsx";
import Footer from "./Footer/footer.jsx";
import Sidebar from "./Sidebar/sidebar.jsx";
import StaffDashboard from "./StaffDashboard/staffDashboard.jsx";
import BookIssueApproval from "./BookIssueApproval/bookIssueApproval.jsx";
import Report from "./Report/report.jsx";

function App() {
    const [isSidebarOpen, setIsSidebarOpen] = useState(false);

    const toggleSidebar = () => setIsSidebarOpen(!isSidebarOpen);
    const closeSidebar = () => setIsSidebarOpen(false);

    const router = createBrowserRouter([
        {
            path: "/login",
            element: <Login />,
        },
        {
            path: "/staff",
            element: (
                <ProtectedRoute>
                    <Sidebar
                        isOpen={isSidebarOpen}
                        toggleSidebar={toggleSidebar}
                        closeSidebar={closeSidebar}
                    />
                    <Header />
                    <Background />
                    <StaffDashboard />
                    <Footer />
                </ProtectedRoute>
            ),
        },
        {
            path: "/book-issue-approval",
            element: (
                <ProtectedRoute>
                    <Sidebar
                        isOpen={isSidebarOpen}
                        toggleSidebar={toggleSidebar}
                        closeSidebar={closeSidebar}
                    />
                    <Header />
                    <div style={{ margin: "20px", textAlign: "center" }}>
                        <BookIssueApproval />
                    </div>
                    <Footer />
                </ProtectedRoute>
            ),
        },
        {
            path: "/generate-report",
            element: (
                <ProtectedRoute>
                    <Sidebar
                        isOpen={isSidebarOpen}
                        toggleSidebar={toggleSidebar}
                        closeSidebar={closeSidebar}
                    />
                    <Header />
                    <div style={{ margin: "20px", textAlign: "center" }}>
                        <Report />
                    </div>
                    <Footer />
                </ProtectedRoute>
            ),
        },
    ]);

    return (
        <AuthProvider>
            <RouterProvider router={router} />
        </AuthProvider>
    );
}

export default App;
