import { Fragment, useEffect } from "react";
import Cart from "./components/Cart/Cart";
import Layout from "./components/Layout/Layout";
import Products from "./components/Shop/Products";
import { useSelector, useDispatch } from "react-redux";

import Notification from "./components/UI/Notification";
import { fetchCardData, sendCartData } from "./store/cart-actions";
let isInitial = true;

function App() {
  const dispach = useDispatch();
  const showCart = useSelector((state) => state.ui.cartIsVisible);
  const cart = useSelector((state) => state.cart);
  const notification = useSelector((state) => state.ui.notification);

  useEffect(() => {
    dispach(fetchCardData());
  }, [dispach]);

  useEffect(() => {
    if (isInitial) {
      isInitial = false;
      return;
    }

    if (cart.changed) {
      //არ გააგზავნის რექვესთს სერვერზე როცა რეფრეშს ვაკეთებ
      dispach(sendCartData(cart));
    }
  }, [cart, dispach]);

  return (
    <Fragment>
      {notification && (
        <Notification
          status={notification.status}
          title={notification.title}
          message={notification.message}
        />
      )}
      <Layout>
        {showCart && <Cart />}
        <Products />
      </Layout>
    </Fragment>
  );
}

export default App;
