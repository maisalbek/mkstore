import "./App.css";
import MyRoutes from "./MyRoutes";
import ProductContextProvider from "./components/context/ProductContextProvider";
import FavoriteContextProvider from "./components/context/FavoriteContextProvider";
import CartContextProvider from "./components/context/CartContextProvider";
import SearchContextProvider from "./components/context/SearchContextProvider";

function App() {
  return (
    <div className="App">
      <SearchContextProvider>
        <CartContextProvider>
          <FavoriteContextProvider>
            <ProductContextProvider>
              <MyRoutes />
            </ProductContextProvider>
          </FavoriteContextProvider>
        </CartContextProvider>
      </SearchContextProvider>
    </div>
  );
}

export default App;
