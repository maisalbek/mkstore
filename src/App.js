import "./App.css";
import MyRoutes from "./MyRoutes";
import ProductContextProvider from "./components/context/ProductContextProvider";
import FavoriteContextProvider from "./components/context/FavoriteContextProvider";
import CartContextProvider from "./components/context/CartContextProvider";
import SearchContextProvider from "./components/context/SearchContextProvider";
import AuthContextProvider from "./components/context/AuthContextProvider";

function App() {
  return (
    <div className="App">
      <AuthContextProvider>
        <SearchContextProvider>
          <CartContextProvider>
            <FavoriteContextProvider>
              <ProductContextProvider>
                <MyRoutes />
              </ProductContextProvider>
            </FavoriteContextProvider>
          </CartContextProvider>
        </SearchContextProvider>
      </AuthContextProvider>
    </div>
  );
}

export default App;
