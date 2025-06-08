import "@/styles/globals.css";
import { useEffect } from "react";
import { useRouter } from "next/router";
import localFont from "next/font/local";
import { Provider, useDispatch } from "react-redux";
import { store } from "@/redux/store";
import AuthLayout from "@/components/layouts/auth";
import MainLayout from "@/components/layouts/main";
import { logout, setAuthData, setMenu } from "@/redux/slices/authSlice";
import { TooltipProvider } from "@/components/ui/Tooltip";

const poppinsFont = localFont({
  src: [
    {
      path: "../assets/fonts/Poppins-Light.ttf",
      weight: "300",
      style: "normal",
    },
    {
      path: "../assets/fonts/Poppins-LightItalic.ttf",
      weight: "300",
      style: "italic",
    },
    {
      path: "../assets/fonts/Poppins-Regular.ttf",
      weight: "400",
      style: "normal",
    },
    {
      path: "../assets/fonts/Poppins-Italic.ttf",
      weight: "400",
      style: "italic",
    },
    {
      path: "../assets/fonts/Poppins-Medium.ttf",
      weight: "500",
      style: "normal",
    },
    {
      path: "../assets/fonts/Poppins-MediumItalic.ttf",
      weight: "500",
      style: "italic",
    },
    {
      path: "../assets/fonts/Poppins-SemiBold.ttf",
      weight: "600",
      style: "normal",
    },
    {
      path: "../assets/fonts/Poppins-SemiBoldItalic.ttf",
      weight: "600",
      style: "italic",
    },
    {
      path: "../assets/fonts/Poppins-Bold.ttf",
      weight: "700",
      style: "normal",
    },
    {
      path: "../assets/fonts/Poppins-BoldItalic.ttf",
      weight: "700",
      style: "italic",
    },
  ],
  display: "swap",
  variable: "--font-poppins",
});

function LoadingWrapper({ Component, pageProps }) {
  const router = useRouter();
  const dispatch = useDispatch();

  useEffect(() => {
    const handleStart = () => {
      store.dispatch({ type: "auth/setLoading", payload: true });
    };
    const handleComplete = () => {
      store.dispatch({ type: "auth/setLoading", payload: false });
    };

    router.events.on("routeChangeStart", handleStart);
    router.events.on("routeChangeComplete", handleComplete);
    router.events.on("routeChangeError", handleComplete);

    return () => {
      router.events.off("routeChangeStart", handleStart);
      router.events.off("routeChangeComplete", handleComplete);
      router.events.off("routeChangeError", handleComplete);
    };
  }, [router]);

  useEffect(() => {
    try {
      const accessToken = sessionStorage.getItem("access_token");
      const refreshToken = sessionStorage.getItem("refresh_token");
      const userData = sessionStorage.getItem("user_data");
      const menu = sessionStorage.getItem("menu");

      if (accessToken) {
        dispatch(
          setAuthData({
            token: accessToken,
            refresh_token: refreshToken,
            user_data: JSON.parse(userData),
          })
        );

        // const menu = JSON.parse(storedMenu);
        dispatch(setMenu(JSON.parse(menu)));
      } else {
        dispatch(logout());
      }
    } catch {}
  }, [dispatch]);

  const Layout = Component.layout === "auth" ? AuthLayout : MainLayout;
  return (
    <>
      <style jsx global>{`
        html {
          font-family: ${poppinsFont.style.fontFamily};
        }
      `}</style>
      <Layout>
        <Component {...pageProps} />
      </Layout>
    </>
  );
}

function App({ Component, pageProps }) {
  return (
    <Provider store={store}>
      <TooltipProvider>
        <LoadingWrapper Component={Component} pageProps={pageProps} />
      </TooltipProvider>
    </Provider>
  );
}

export default App;
