import axios from "axios";
import RootLayout from "./components/Layout/RootLayout";
import { useReduxUserToken } from "./utils/hooks";

const App = () => {
  // redux
  const userToken = useReduxUserToken();

  // set default token - when refresh
  axios.defaults.headers.common["Authorization"] = `Bearer ${userToken}`;

  return (
    <>
      <RootLayout />
    </>
  );
};

export default App;
