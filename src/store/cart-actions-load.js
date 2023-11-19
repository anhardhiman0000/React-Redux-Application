import { uiActions } from "./ui-slice";

import { cartActions } from "./cart-slice";

//in order to fetch data after loading
export const fetchCartData = () => {
    return async (dispatch) => {
        const fetchData = async () => {
            const response = await fetch('https://react-redux-http-3a9f6-default-rtdb.firebaseio.com/cart.json');
            //by default get so no need to do configuration

            if (!response.ok) {
                throw new Error('Could not fetch cart data!');
            }
            const data = await response.jason();
            return data;
        };
        try {
            const cartData = await fetchData();
            dispatch(cartActions.replaceCart({
                items: cartData.items || [],
                totalQuantity: cartData.totalQuantity,
            }));
        } catch (error) {
            dispatch(
                uiActions.showNotification({
                    status: 'error',
                    title: 'Error!',
                    message: 'Fetching cart data failed!',
                })
            )
        }
    };
};


//action creator thunk [for hhtp req. 2nd way]
export const sendCartData = (cart) => {
    // return{type: '', payload: ...}
    // return (dispatch) => {
    return async (dispatch) => {
        dispatch( //firebase async await part
            uiActions.showNotification({
                status: 'pending',
                title: 'Sending...',
                message: 'Sending cart data!',
            })
        );

        // //code sending the req & handling the response
        // const response = await fetch('https://react-redux-http-3a9f6-default-rtdb.firebaseio.com/cart.json',  //link from firebase
        //     {
        //         method: 'PUT', //POST store new data but PUT override the new data with existing data
        //         body: JSON.stringify(cart), //convert into json data & send it as a part of the req.
        //     }
        // );
        // if (!response.ok) {
        //     throw new Error('Sending cart data failed.');

        //     // dispatch( //firebase async await part
        //     //   uiActions.showNotification({
        //     //     status: 'error',
        //     //     title: 'Error!',
        //     //     message: 'Sending cart data failed!',
        //     //   })
        //     // )
        // }

        //to handle potential errors put it in try-catch block
        const sendRequest = async () => {
            //code sending the req & handling the response
            const response = await fetch('https://react-redux-http-3a9f6-default-rtdb.firebaseio.com/cart.json',  //link from firebase
                {
                    method: 'PUT', //POST store new data but PUT override the new data with existing data
                    // body: JSON.stringify(cart), //convert into json data & send it as a part of the req.
                    // error in video 438
                    body: JSON.stringify({
                        items: cart.items,
                        totalQuantity: cart.totalQuantity,
                    }),
                }
            );
            if (!response.ok) {
                throw new Error('Sending cart data failed.');

                // dispatch( //firebase async await part
                //   uiActions.showNotification({
                //     status: 'error',
                //     title: 'Error!',
                //     message: 'Sending cart data failed!',
                //   })
                // )
            }
        }
        // await sendRequest(); //it return a promise

        // dispatch(           //this make it pause if it checked
        //     uiActions.showNotification({
        //         status: 'success',
        //         title: 'Success!',
        //         message: 'Sent cart data successfully!',
        //     })
        // )

        try {
            await sendRequest(); //it return a promise
            dispatch( //firebase async await part
                uiActions.showNotification({
                    status: 'success',
                    title: 'Success!',
                    message: 'Sent cart data successfully!',
                })
            )
        } catch (error) {
            dispatch( //firebase async await part
                uiActions.showNotification({
                    status: 'error',
                    title: 'Error!',
                    message: 'Sending cart data failed!',
                })
            )
        }
    }
}