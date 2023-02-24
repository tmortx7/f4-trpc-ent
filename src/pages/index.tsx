import MainLayout from "~/components/MainLayout";

const HomePage = () => {
  return <div>hello world</div>;
};
HomePage.getLayout = function getLayout(page: React.ReactElement) {
  return <MainLayout>{page}</MainLayout>;
};

export default HomePage;
