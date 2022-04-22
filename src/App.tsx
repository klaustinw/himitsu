import { lazy, Suspense, useEffect, useState } from "react";
import { BrowserRouter as Router } from "react-router-dom";
import { Spinner, Container } from "react-bootstrap";
import { StoreContext } from "./utils/contexts";
import { BASE_URL, DefaultValue } from "./utils/constants";
import { QueryClient, QueryClientProvider } from "react-query"
import { AppTheme, Alert, ErrorKind, UserActionInfo } from "./utils/types";
import { applyTheme, parseToTheme } from "./theme";

import "bootstrap/scss/bootstrap.scss";
import "./stylings/index.scss";
import "bootstrap-icons/font/bootstrap-icons.css";
import "react-loading-skeleton/dist/skeleton.css";

import Navigation from "./components/Navigation";
import AppRoutes from "./RoutesConfig";
const Alerts = lazy(() => import("./components/Alerts"));
const NewNoteModal = lazy(() => import("./components/note/NewNoteModal"));

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

        return await response.json();
      },
      keepPreviousData: true,
      retry: (failureCount) => {
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
  const [passphrase, setPassphrase] = useState<string | null>(null);
  const [alertsContext, setAlertsContext] = useState<ErrorKind | UserActionInfo>(DefaultValue.Alerts);
  const [propAlerts, setPropAlerts] = useState<Alert>(DefaultValue.Alerts);
  const [theme, setTheme] = useState<AppTheme>(AppTheme.Normal);
  const [mqIsDark] = useState(window.matchMedia("(prefers-color-scheme: dark)"));

  useEffect(() => {
    const savedThemeStr = window.localStorage.getItem("theme");
    const savedTheme = parseToTheme(savedThemeStr);
    setTheme(savedTheme);
  }, [setTheme]);

  useEffect(() => {
    if (theme === AppTheme.System) {
      applyTheme(mqIsDark.matches ? AppTheme.Normal : AppTheme.Light);
      mqIsDark.addEventListener("change", ({ matches, media }) => {
        matches ? applyTheme(AppTheme.Normal) : applyTheme(AppTheme.Light);
      });
    } else {
      mqIsDark.removeEventListener("change", () => { });
      applyTheme(theme);
    }

    return () => {
      mqIsDark.removeEventListener("change", () => { });
    };
  }, [theme, mqIsDark]);

  useEffect(() => {
    setPropAlerts(prev => {
      return {
        ...prev,
        ...alertsContext,
      };
    });
  }, [alertsContext]);

  return (
    <Router>
      <StoreContext.Provider
        value={{
          setPassphrase,
          alerts: propAlerts,
          setAlerts: setAlertsContext,
          passphrase
        }}
      >
        <QueryClientProvider client={queryClient}>
          <Navigation theme={theme === AppTheme.System ? (mqIsDark.matches ? theme : AppTheme.Light) : theme} />
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
            <Alerts alerts={propAlerts} setAlerts={setPropAlerts} />
            <Container className="himitsu">
              {
                window.localStorage.getItem(DefaultValue.Pages.NewNote.RESULT_STATE_NAME)
                  ? <NewNoteModal
                    data={JSON.parse(
                      window.localStorage.getItem(
                        DefaultValue.Pages.NewNote.RESULT_STATE_NAME
                      ) || "There's got to be something here!"
                    )} />
                  : null
              }
              <AppRoutes theme={theme} setTheme={setTheme} />
            </Container>
          </Suspense>
        </QueryClientProvider>
      </StoreContext.Provider >
    </Router>
  );
}

export default App;
