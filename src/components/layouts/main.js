import withAuth from "@/utils/withAuth";
import { AppSidebar } from "../AppSidebar";
import { useEffect, useState } from "react";
import { SidebarProvider } from "../ui/Sidebar";
import AppNavbar from "../AppNavbar";
import { useSelector } from "react-redux";
import { Toaster } from "../ui/Toaster";
import { DialogProvider } from "@/context/DialogContext";
import Loader from "../Loader";

const MainLayout = ({ children }) => {
  const { loading, loadingMenu } = useSelector((state) => state.auth);
  const [initialized, setInitialized] = useState(false);
  const [sidebarDefaultOpen, setSidebarDefaultOpen] = useState(true);

  useEffect(() => {
    const sidebarState = document.cookie
      .split("; ")
      .find((row) => row.startsWith("sidebar:state="))
      ?.split("=")[1];

    setSidebarDefaultOpen(sidebarState !== "false");
    setInitialized(true);
  }, []);

  if (loading || loadingMenu) return <Loader />;

  return (
    initialized && (
      <SidebarProvider defaultOpen={sidebarDefaultOpen}>
        <DialogProvider>
          <AppSidebar />
          <main className="w-full px-4 md:px-7 py-5 grid grid-cols-1 gap-6 items-start content-start h-full min-h-screen">
            <AppNavbar />
            {children}
            <Toaster />
          </main>
        </DialogProvider>
      </SidebarProvider>
    )
  );
};

export default withAuth(MainLayout);
