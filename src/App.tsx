import { lazy, Suspense, useEffect, useState } from "react";
import { BrowserRouter as Router, Navigate, Route, Routes } from "react-router-dom";
import { Spinner, Container } from "react-bootstrap";
import { AppContext } from "./utils/contexts";
import { BASE_URL, DefaultValue, PATHS } from "./utils/constants";
import { QueryClient, QueryClientProvider } from "react-query"
// import { persistQueryClient } from "react-query/persistQueryClient-experimental"
import { Alert, AppSetting } from "./utils/types";
import { applyTheme } from "./theme";

import "bootstrap/scss/bootstrap.scss";
import "./stylings/index.scss";
import "bootstrap-icons/font/bootstrap-icons.css";
import "react-loading-skeleton/dist/skeleton.css";

import Home from "./pages/Home";
import NewNote from "./pages/notes/NewNote";
import FindNote from "./pages/notes/FindNote";
import Note from "./pages/notes/Note";
import Navigation from "./components/Navigation";
import { local_storage } from "./utils/functions";
import { Toaster } from "react-hot-toast";
const NotFound = lazy(() => import("./pages/404"));
const About = lazy(() => import("./pages/About"));
const Settings = lazy(() => import("./pages/Settings"));
const Notes = lazy(() => import("./pages/notes/Notes"));
const Alerts = lazy(() => import("./components/Alerts"));
const NewNoteModal = lazy(() => import("./components/note/NewNoteModal"));
const Debug = lazy(() => import("./Debug"));

const queryClient = new QueryClient({
  defaultOptions: {
    queries: {
      queryFn: async ({ queryKey }) => {
        let url = BASE_URL + queryKey[0];

        let response = await fetch(url, {
          method: "GET",
          mode: "cors",
          headers: {
            "Content-Type": "application/json"
          },
        });

        if (response.ok) {
          return await response.json();
        } else {
          throw response.status;
        }
      },
      keepPreviousData: true,
      retry: (failureCount, error) => {
        if (error === 400) return false;
        if (failureCount <= 10) return true;
        else return false;
      },
      retryDelay: 6000,
      cacheTime: Infinity,
      staleTime: Infinity,
      refetchOnWindowFocus: false,
      refetchOnMount: false,
    },
  }
});

function App() {
  const [alerts, setAlerts] = useState<Alert>(DefaultValue.alerts);
  const [appSettings, setAppSettings] = useState<AppSetting>(DefaultValue.settings);
  // const [mqIsDark] = useState(window.matchMedia("(prefers-color-scheme: dark)"));

  // App renders twice for no reason in development, so this fire twice
  // but issue does not occur in production, so as expected this should only fire once
  useEffect(() => {
    const saved_settings = local_storage.get("settings");
    if (saved_settings) {
      setAppSettings(saved_settings);
    }
  }, [setAppSettings]);

  useEffect(() => applyTheme(appSettings.preferences.app_theme), [appSettings.preferences.app_theme]);

  return (
    <Router>
      <AppContext.Provider
        value={{
          appSettings,
          setAlerts,
        }}
      >
        <QueryClientProvider client={queryClient}>
          <Navigation />
          <Suspense fallback={
            <Spinner animation="border" role="status"
              style={{
                position: "absolute",
                marginLeft: "auto",
                marginRight: "auto",
                top: "50vh",
                left: 0,
                right: 0,
                textAlign: "center",
              }}
            >
              <span className="visually-hidden">Loading...</span>
            </Spinner>
          }>
            <Container className="himitsu">
              <Alerts alerts={alerts} setAlerts={setAlerts} />
              <Toaster position="bottom-center" toastOptions={{
                style: {
                  borderRadius: '10px',
                  background: '#333',
                  color: '#fff',
                },
              }} />
              {
                (() => {
                  let data = localStorage.getItem(DefaultValue.pages.NewNote.local_storage_name);
                  return data ? <NewNoteModal data={JSON.parse(data)} /> : null;
                })()
              }
              <Routes>
                <Route path={"/404"} element={<NotFound />} />
                <Route path={"/debug"} element={<Debug />} />
                <Route path={PATHS.home} element={<Home />} />
                <Route path={PATHS.about} element={<About />} />
                <Route path={PATHS.new_note} element={<NewNote />} />
                <Route path={PATHS.notes} element={<Notes />} />
                <Route path={PATHS.find_note} element={<FindNote />} />
                <Route path={PATHS.note_detail + "/:_id"} element={<Note />} />
                <Route path={PATHS.settings} element={<Settings setAppSettings={setAppSettings} />} />
                <Route path="*" element={
                  <Navigate to="/404" />
                } />
              </Routes>
            </Container>
          </Suspense>
        </QueryClientProvider>
      </AppContext.Provider >
    </Router>
  );
}

export default App;
