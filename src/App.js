import { Fragment, useEffect } from 'react';
import { useDispatch, useSelector } from 'react-redux';

import Cart from './components/Cart/Cart';
import Layout from './components/Layout/Layout';
import Products from './components/Shop/Products';

// import { uiActions } from './store/ui-slice'; //firebase async await part
import Notification from './components/UI/Notification';

//using action thunk
// import { sendCartData } from './store/cart-slice';
import { sendCartData, fetchCartData } from './store/cart-actions-load';

//in order to stop show notification at the starting of app.js
let isInitial = true;

function App() {
  //firebase async await part
  const dispatch = useDispatch();

  //that's how we extract that values
  const showCart = useSelector(state => state.ui.cartIsVisible);

  //firebase,i will do async req. her rather than in productItem.js comp. to get hold the overall cart bcoz as this root comp
  const cart = useSelector((state) => state.cart);

  //notification comp use
  const notification = useSelector(state => state.ui.notification);

  // useEffect(() => {
  // // fetch('https://react-redux-http-3a9f6-default-rtdb.firebaseio.com/cart.json',  //link from firebase
  // //   {
  // //     method: 'PUT', //POST store new data but PUT override the new data with existing data
  // //     body: JSON.stringify(cart), //convert into json data & send it as a part of the req.
  // //   }
  // // );

  // // in order to handle error & put asyn await 
  // const sendCartData = async () => {

  //   dispatch( //firebase async await part
  //     uiActions.showNotification({
  //       status: 'pending',
  //       title: 'Sending...',
  //       message: 'Sending cart data!',
  //     })
  //   );

  //   //code sending the req & handling the response
  //   const response = await fetch('https://react-redux-http-3a9f6-default-rtdb.firebaseio.com/cart.json',  //link from firebase
  //     {
  //       method: 'PUT', //POST store new data but PUT override the new data with existing data
  //       body: JSON.stringify(cart), //convert into json data & send it as a part of the req.
  //     }
  //   );
  //   if (!response.ok) {
  //     throw new Error('Sending cart data failed.');

  //     // dispatch( //firebase async await part
  //     //   uiActions.showNotification({
  //     //     status: 'error',
  //     //     title: 'Error!',
  //     //     message: 'Sending cart data failed!',
  //     //   })
  //     // )
  //   }
  //   // const responseData = await response.json();

  //   dispatch( //firebase async await part
  //     uiActions.showNotification({
  //       status: 'success',
  //       title: 'Success!',
  //       message: 'Sent cart data successfully!',
  //     })
  //   )
  // }

  // in order to handle error & put asyn await 
  // if (isInitial) {
  //   isInitial = false;
  //   return;
  // }

  // sendCartData().catch((error) => {
  //   dispatch( //firebase async await part
  //     uiActions.showNotification({
  //       status: 'error',
  //       title: 'Error!',
  //       message: 'Sending cart data failed!',
  //     })
  //   )
  // })                       //==========> move to cart-slice.js
  // }, [cart, dispatch]);

  useEffect(() => {
    dispatch(fetchCartData())
  }, [dispatch]);


  useEffect(() => {
    if (isInitial) {
      isInitial = false;
      return;
    }
    //using action thunk
    // dispatch(sendCartData(cart));  //go in cart-slice & execute dispatch

    //438 video error
    if (cart.changed) {
      dispatch(sendCartData(cart)); //go in cart-slice & execute dispatch
    }
    
  }, [cart, dispatch]); 

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
