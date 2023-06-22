import { cartActions } from "./cart-slice";
import { uiActions } from "./ui-slice";

export const fetchCardData = () => {
  return async (dispach) => {
    const fetchData = async () => {
      const response = await fetch(
        "https://meals-http-c4252-default-rtdb.firebaseio.com/cart.json"
      );

      if (!response.ok) {
        throw new Error("Fetching cart data faild");
      }

      const data = await response.json();
      return data;
    };

    try {
      const cartData = await fetchData();
      dispach(
        cartActions.replaceCart({
          items: cartData.items || [],
          totalquantity: cartData.totalquantity || 0,
        })
      );
    } catch (error) {
      dispach(
        uiActions.showNotification({
          status: "error",
          title: "Error . . .",
          message: "fetching cart data failed !",
        })
      );
    }
  };
};

////////////////////send///////////////////////////

export const sendCartData = (cart) => {
  return async (dispach) => {
    dispach(
      uiActions.showNotification({
        status: "pending",
        title: "Sending . . .",
        message: "Sending cart data!",
      })
    );

    const sendRequest = async () => {
      const response = await fetch(
        "https://meals-http-c4252-default-rtdb.firebaseio.com/cart.json",
        {
          method: "PUT",
          body: JSON.stringify({
            items: cart.items,
            totalquantity: cart.totalquantity,
          }),
        }
      );

      if (!response.ok) {
        throw new Error("Sending cart data faild");
      }

      dispach(
        uiActions.showNotification({
          status: "success",
          title: "Success . . .",
          message: "Sent cart successfully",
        })
      );

      // const responseData = await response.json();
    };

    sendRequest().catch((error) => {
      dispach(
        uiActions.showNotification({
          status: "error",
          title: "Error . . .",
          message: "Sending cart data failed !",
        })
      );
    });
  };
};
