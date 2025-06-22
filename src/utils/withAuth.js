import { useEffect, useState } from "react";
import { useRouter } from "next/router";
import Loader from "@/components/Loader";

const withAuth = (WrappedComponent) => {
  const Wrapper = (props) => {
    const router = useRouter();
    const [loading, setLoading] = useState(true);

    useEffect(() => {
      const authData =
        typeof window !== "undefined" && localStorage.getItem("auth_data");

      if (!authData) {
        router.replace("/auth/login");
      } else if (authData && router.pathname === "/auth/login") {
        router.replace("/");
      } else {
        setLoading(false);
      }
    }, []);

    if (loading) {
      return <Loader fullHeight loadingText="Checking authentication..." />;
    }

    return <WrappedComponent {...props} />;
  };

  return Wrapper;
};

export default withAuth;
