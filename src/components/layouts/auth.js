const AuthLayout = ({ children, className, ...props }) => {
  return (
    <div
      className={`flex justify-center h-screen items-center min-h-[700px] overflow-auto p-5 md:p-0 ${className}`}
      {...props}
    >
      {children}
    </div>
  );
};

export default AuthLayout;
