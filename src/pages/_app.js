// src/pages/_app.js
import "@/styles/globals.css";
import { useEffect } from "react";
import { useRouter } from "next/router";
import localFont from "next/font/local";
import { Provider, useDispatch, useSelector } from "react-redux";
import { store } from "@/redux/store";
import AuthLayout from "@/components/layouts/auth";
import MainLayout from "@/components/layouts/main";
import { logout, setAuthData, setMenu } from "@/redux/slices/authSlice";
import { TooltipProvider } from "@/components/ui/Tooltip";
import Head from "next/head";
import Loader from "@/components/Loader";
import { refreshAccessToken, scheduleTokenRefresh } from "@/utils/refreshToken";

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
  const { loading } = useSelector((state) => state.globalState);

  useEffect(() => {
    const handleStart = () => {
      store.dispatch({ type: "globalState/setLoading", payload: true });
    };
    const handleComplete = () => {
      store.dispatch({ type: "globalState/setLoading", payload: false });
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
      const authData = localStorage.getItem("auth_data");
      const menu = localStorage.getItem("menu");
      const flatMenu = localStorage.getItem("flat_menu");

      if (authData) {
        dispatch(setAuthData(JSON.parse(authData)));

        dispatch(
          setMenu({
            nestedMenu: JSON.parse(menu),
            flatMenu: JSON.parse(flatMenu),
          })
        );

        const now = Date.now();
        scheduleTokenRefresh(
          refreshAccessToken,
          (JSON.parse(authData).token.expiresIn - now) / 1000 -
            Number(process.env.NEXT_PUBLIC_TOKEN_REFRESH_EVERY ?? 30)
        );
      } else {
        // dispatch(logout());
      }
    } catch {}
  }, [dispatch]);

  const pageTitle = `PML - Kalbe Farma`;
  const Layout = Component.layout === "auth" ? AuthLayout : MainLayout;
  return (
    <>
      <style jsx global>{`
        html {
          font-family: ${poppinsFont.style.fontFamily};
        }
      `}</style>
      <Head>
        <title>{pageTitle}</title>
        <meta property="og:title" content={pageTitle} key="title" />
        <meta name="viewport" content="width=device-width, initial-scale=1" />
        <link rel="icon" href="/favicon.ico" />
      </Head>
      <Layout>{loading ? <Loader /> : <Component {...pageProps} />}</Layout>
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
