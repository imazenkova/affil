import React from "react";

import { ThemedLayoutV2 } from "@refinedev/antd";

import { Header } from "./header";
import { ThemedTitleV2 } from "./title";
import { CurrentUser } from "./current-user";

export const Layout = ({ children }: React.PropsWithChildren) => {
  return (
    <>
      <ThemedLayoutV2
        Header={Header}
        Title={ThemedTitleV2}
        // Title={(titleProps) => {
        //   return <ThemedTitleV2 {...titleProps} text="Bruxt" />;
        // }}
      >
        {children}
        {/* <CurrentUser/> */}
      </ThemedLayoutV2>
    </>
  );
};
