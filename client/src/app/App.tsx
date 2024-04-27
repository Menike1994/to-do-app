import { Provider } from "react-redux";
import { store } from "./store";
import "./App.scss";
import { RouterProvider } from "react-router-dom";
import { Router } from "../router";
import { ConfigProvider } from "antd";

function App() {
  const theme = {
    components: {
      Layout: {
        bodyBg: "white",
        headerBg: "white",
        footerBg: "white",
      },
      Text: {
        fontSize: "18px",
      },
    },
    token: {
      fontFamily: "Inter, sans-serif",
    },
  };

  return (
    <>
      <Provider store={store}>
        <ConfigProvider theme={theme}>
          <RouterProvider router={Router} />
        </ConfigProvider>
      </Provider>
    </>
  );
}

export default App;
