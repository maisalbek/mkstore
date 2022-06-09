import "./App.css";
import MyRoutes from "./MyRoutes";
import ProductContextProvider from "./components/context/ProductContextProvider";
import FavoriteContextProvider from "./components/context/FavoriteContextProvider";
import CartContextProvider from "./components/context/CartContextProvider";

function App() {
  return (
    <div className="App">
      <CartContextProvider>
        <FavoriteContextProvider>
          <ProductContextProvider>
            <MyRoutes />
          </ProductContextProvider>
        </FavoriteContextProvider>
      </CartContextProvider>
    </div>
  );
}

export default App;
