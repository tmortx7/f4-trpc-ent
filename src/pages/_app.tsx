import type { AppProps } from "next/app";
type NextPageWithLayout = NextPage & {
  getLayout?: (page: ReactElement) => ReactNode;
};

type AppPropsWithLayout = AppProps & {
  Component: NextPageWithLayout;
};
import { api } from "~/utils/api";

import "~/styles/globals.css";
import type { NextPage } from "next";
import type { ReactElement, ReactNode } from "react";

const MyApp = ({
  Component,
  pageProps: { ...pageProps },
}: AppPropsWithLayout) => {
  const getLayout = Component.getLayout ?? ((page) => page);
  const layout = getLayout(<Component {...pageProps} />);

  return <div>{layout}</div>
};

export default api.withTRPC(MyApp);
