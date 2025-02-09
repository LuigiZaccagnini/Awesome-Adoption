import React, { Fragment } from "react";
import { Container } from "react-bootstrap";
import {
  BrowserRouter as Router,
  Switch,
  Route,
  Redirect,
} from "react-router-dom";
import Home from "./components/home/Home";
import NavigationBar from "./components/layout/NavigationBar";
import "./App.css";
import Pets from "./components/pets/Pets";
import PetType from "./components/pets/PetType";
import PetInfo from "./components/pets/PetInfo";
import Footer from "./components/layout/Footer";
import About from "./components/about/About";
import Resources from "./components/resources/Resources";
import Stories from "./components/stories/Stories";
import NotFound from "./components/NotFound/NotFound";
import Donate from "./components/donate/Donate";
import Register from "./components/accounts/Register";
import { supabase } from "./utils/SupaBaseUtils";
import SLogin from "./components/accounts/SLogin";
import { Provider } from "react-supabase";
import { AuthProvider, useAuth } from "./context/SupaContext";
import ForgotPassword from "./components/accounts/ForgotPassword";
import PetAuthProvider, { usePetAuth } from "./context/TokenContext";
import ResetPassword from "./components/accounts/settings/resetPassword";
import PrivateRoute from "./utils/PrivateRoute";
import Profile from "./components/accounts/profile/Profile";
import LoaderComponent from "./utils/LoaderComponent";

export default function App() {
  return (
    <Fragment>
      <PetAuthProvider>
        <Provider value={supabase}>
          <AuthProvider>
            <Router>
              <NavigationBar />
              <Container className="pawhub">
                <Switch>
                  <Route path="/animal/:id">
                    <PetLoading>
                      <PetInfo />
                    </PetLoading>
                  </Route>
                  <Route path="/pets/:type">
                    <PetLoading>
                      <PetType />
                    </PetLoading>
                  </Route>
                  <Route path="/pets">
                    <Pets />
                  </Route>
                  <Route path="/about">
                    <About />
                  </Route>
                  <Route path="/resources">
                    <Resources />
                  </Route>
                  <Route path="/donate">
                    <Donate />
                  </Route>
                  <Route path="/stories">
                    <Stories />
                  </Route>
                  <Route path="/register" component={Register} />
                  <Route exact path="/login" component={SLogin} />
                  <Route
                    exact
                    path="/forgot-password"
                    component={ForgotPassword}
                  />
                  <PrivateRoute
                    exact
                    path="/reset-password"
                    component={ResetPassword}
                  />
                  <Route exact path="/profile">
                    <SupaLoading>
                      <Profile />
                    </SupaLoading>
                  </Route>
                  <Route path="/" exact>
                    <PetLoading>
                      <Home />
                    </PetLoading>
                  </Route>
                  <Route path="/404">
                    <NotFound />
                  </Route>
                  <Redirect to="/404" />
                </Switch>
              </Container>
              <Footer />
            </Router>
          </AuthProvider>
        </Provider>
      </PetAuthProvider>
    </Fragment>
  );
}

const PetLoading = ({ children }) => {
  const { loading, errors } = usePetAuth();

  return (
    <LoaderComponent isLoading={loading} serverError={errors}>
      {children}
    </LoaderComponent>
  );
};
const SupaLoading = ({ children }) => {
  const { isLoading, error } = useAuth();
  return (
    <LoaderComponent isLoading={isLoading} serverError={error}>
      {children}
    </LoaderComponent>
  );
};
