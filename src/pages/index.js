import withAuth from "@/utils/withAuth";

const Home = () => {
  return <div className="grid">Welcome to the dashboard</div>;
};

export default withAuth(Home);
