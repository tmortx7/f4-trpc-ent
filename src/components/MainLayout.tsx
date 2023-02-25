
const MainLayout = ({ children }: { children: React.ReactNode }) => {
  return (
    <div className="flex w-full flex-row justify-center h-[100vh]">
      <div className="">
        {children}
      </div>
    </div>
  );
};

export default MainLayout;