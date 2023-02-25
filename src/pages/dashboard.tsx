import MainLayout from "~/components/MainLayout";
import { api } from "~/utils/api";

const DashboardPage = () => {
  // const {mutate} = api.admin.sensitive.useMutation()
  return(
    <div className="flex flex-col mt-[200px] ">
      <button className="btn btn-info w-[100px] ">Admin</button>
    </div>
  )
}
DashboardPage.getLayout = function getLayout(page: React.ReactElement) {
  return <MainLayout>{page}</MainLayout>;
};
export default DashboardPage