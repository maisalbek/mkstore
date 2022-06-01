import "./App.css";
import MyRoutes from "./MyRoutes";
import ProductContextProvider from "./components/context/ProductContextProvider";

function App() {
  return (
    <div className="App">
      <ProductContextProvider>
        <MyRoutes />
      </ProductContextProvider>
    </div>
  );
}

export default App;
