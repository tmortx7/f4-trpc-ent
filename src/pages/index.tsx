import MainLayout from "~/components/MainLayout";
import { api } from "~/utils/api";


const HomePage = () => {
  const {data, error} = api.example.getHello.useQuery()

  if(error){
    return <div>error</div>
  }
  
  return(
    <div>
      {data?.message}
    </div>
  )
}



HomePage.getLayout = function getLayout(page: React.ReactElement) {
  return <MainLayout>{page}</MainLayout>;
};

export default HomePage;
