import { Authenticated, Refine } from "@refinedev/core";
import { RefineKbar, RefineKbarProvider } from "@refinedev/kbar";

import { useNotificationProvider } from "@refinedev/antd";
import "@refinedev/antd/dist/reset.css";

import routerBindings, {
  CatchAllNavigate,
  DocumentTitleHandler,
  UnsavedChangesNotifier,
} from "@refinedev/react-router-v6";
import dataProvider from "@refinedev/simple-rest";
import { App as AntdApp } from "antd";
import { BrowserRouter, Outlet, Route, Routes } from "react-router-dom";
import { Layout } from "./components";
import { resources } from "./config/resources";
import { EmailChange, EmailVerification, ForgotPassword, Login, PasswordChange, Register } from "./pages";
import { API_BASE_URL, authProvider } from "./providers";
import { DashboardPage } from "./routes/dashboard";
import { TrafficListPage } from "./routes/traffic";

function App() {
  return (
    <BrowserRouter>
      {/* <GitHubBanner /> */}
      <RefineKbarProvider>
   
          <AntdApp>
            {/* <DevtoolsProvider> */}
              <Refine
                dataProvider={dataProvider(API_BASE_URL)}
                notificationProvider={useNotificationProvider}
                resources={resources}
                routerProvider={routerBindings}
                authProvider={authProvider}
                options={{
                  syncWithLocation: true,
                  warnWhenUnsavedChanges: true,
                  useNewQueryKeys: true,
                  projectId: "RJc3Rh-aIARwA-0ZxJMe",
                  breadcrumb:null
                }}
                
              >
                 {/* <ThemedLayoutV2  Title={ThemedTitleV2}>
                 </ThemedLayoutV2> */}
                <Routes>
                        <Route
                          element={
                            <Authenticated
                              key="authenticated-layout"
                              fallback={<CatchAllNavigate to="/login" />}
                            >
                              <Layout>
                                <Outlet />
                              </Layout>
                            </Authenticated>
                          }
                        >     
                              <Route index element={<DashboardPage />} />
                              <Route path='/traffic' element={<TrafficListPage />} />
                        </Route>
                      <Route path='/verify' element={<EmailVerification />} />
                      <Route path='/reset-password' element={<PasswordChange />} />
                      <Route path='/login' element={<Login />} />
                      <Route path='/forgot-password' element={<ForgotPassword />} />
                      <Route path='/change-password' element={<ForgotPassword />} />
                      <Route path='/register' element={<Register />} />
                      <Route path='/change-email' element={<EmailChange />} />
                </Routes>
                <RefineKbar />
                <UnsavedChangesNotifier />
                <DocumentTitleHandler />
              </Refine>
              {/* <DevtoolsPanel /> */}
            {/* </DevtoolsProvider> */}
          </AntdApp>
  
      </RefineKbarProvider>
    </BrowserRouter>
  );
}

export default App;
