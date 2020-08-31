import React from "react";
import { Switch } from "react-router-dom";
import Route from "./Route";

//import ContactsPage from "~/pages/ContactsPage";
import HomePage from "~/pages/HomePage";
import CheckoutPage from "~/pages/CheckoutPage";
import SalesPage from "~/pages/SalesPage";

import DefaultLayout from "~/pages/__layouts/default";

export default function Routes() {
  return (
    <Switch>
      <Route path="/" exact component={HomePage} layout={DefaultLayout} />
      <Route
        path="/checkout"
        exact
        component={CheckoutPage}
        layout={DefaultLayout}
      />
      <Route path="/sales" exact component={SalesPage} layout={DefaultLayout} />
    </Switch>
  );
}
