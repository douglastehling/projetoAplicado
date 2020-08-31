import Reactotron from "reactotron-react-js";
import { reactotronRedux } from "reactotron-redux";
import reactotromSaga from "reactotron-redux-saga";

if (process.env.NODE_ENV === "development") {
  const tron = Reactotron.configure()
    .use(reactotronRedux())
    .use(reactotromSaga())
    .connect();

  tron.clear();

  console.tron = tron;
}
