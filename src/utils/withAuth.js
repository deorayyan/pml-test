import { useEffect, useState } from "react";
import { useRouter } from "next/router";

const withAuth = (WrappedComponent) => {
  const Wrapper = (props) => {
    const router = useRouter();
    const [loading, setLoading] = useState(true);

    useEffect(() => {
      const token =
        typeof window !== "undefined" &&
        (localStorage.getItem("access_token") ||
          sessionStorage.getItem("access_token"));

      if (!token) {
        router.replace("/auth/login");
      } else {
        setLoading(false);
      }
    }, []);

    if (loading) {
      return (
        <div className="text-center mt-10">Checking authentication...</div>
      );
    }

    return <WrappedComponent {...props} />;
  };

  return Wrapper;
};

export default withAuth;
