import { Fragment, useEffect } from 'react';
import { useDispatch, useSelector } from 'react-redux';

import Cart from './components/Cart/Cart';
import Layout from './components/Layout/Layout';
import Products from './components/Shop/Products';

import Notification from './components/UI/Notification';

//using action thunk
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


  useEffect(() => {
    dispatch(fetchCartData())
  }, [dispatch]);


  useEffect(() => {
    if (isInitial) {
      isInitial = false;
      return;
    }
    //using action thunk
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
