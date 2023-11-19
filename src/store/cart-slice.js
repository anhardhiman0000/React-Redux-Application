import { createSlice } from "@reduxjs/toolkit";

// import { uiActions } from "./ui-slice";

const cartSlice = createSlice({
    name: 'cart',
    initialState: {
        items: [],
        totalQuantity: 0,
        //438 video error
        changed: false,
    },
    reducers: {
        //firebase
        replaceCart(state, action) {
            state.totalQuantity = action.payload.totalQuantity;
            state.items = action.payload.items;
        },
        addItemToCart(state, action) {
            const newItem = action.payload;
            //to check the existing item
            const existingItem = state.items.find(item => item.id === newItem.id);
            state.totalQuantity++;
            //438 video error
            state.changed = true;
            if (!existingItem) {
                state.items.push({ //push manupulates the existing array in the existng states. But redux toolkit update the state in immutable way.
                    // itemId: newItem.id,
                    id: newItem.id,
                    price: newItem.price,
                    quantity: 1,
                    totalPrice: newItem.price,
                    name: newItem.title,
                });
            } else {
                existingItem.quantity++;
                // existingItem.totalPrice += newItem.price;
                existingItem.totalPrice = existingItem.totalPrice + newItem.price;
            }
        },
        removeFromCart(state, action) {
            const id = action.payload;
            const existingItem = state.items.find(item => item.id === id);
            state.totalQuantity--;
            state.changed = true;
            if (existingItem.quantity === 1) {
                state.items = state.items.filter(item => item.id !== id);
            } else {
                existingItem.quantity--;
                existingItem.totalPrice = existingItem.totalPrice - existingItem.price;
            }
        }
    }
});

// //action creator thunk [for hhtp req. 2nd way]
// export const sendCartData = (cart) => {
//     // return{type: '', payload: ...}
//     // return (dispatch) => {
//     return async (dispatch) => {
//         dispatch( //firebase async await part
//             uiActions.showNotification({
//                 status: 'pending',
//                 title: 'Sending...',
//                 message: 'Sending cart data!',
//             })
//         );

//         // //code sending the req & handling the response
//         // const response = await fetch('https://react-redux-http-3a9f6-default-rtdb.firebaseio.com/cart.json',  //link from firebase
//         //     {
//         //         method: 'PUT', //POST store new data but PUT override the new data with existing data
//         //         body: JSON.stringify(cart), //convert into json data & send it as a part of the req.
//         //     }
//         // );
//         // if (!response.ok) {
//         //     throw new Error('Sending cart data failed.');

//         //     // dispatch( //firebase async await part
//         //     //   uiActions.showNotification({
//         //     //     status: 'error',
//         //     //     title: 'Error!',
//         //     //     message: 'Sending cart data failed!',
//         //     //   })
//         //     // )
//         // }

//         //to handle potential errors put it in try-catch block
//         const sendRequest = async () => {
//             //code sending the req & handling the response
//             const response = await fetch('https://react-redux-http-3a9f6-default-rtdb.firebaseio.com/cart.json',  //link from firebase
//                 {
//                     method: 'PUT', //POST store new data but PUT override the new data with existing data
//                     body: JSON.stringify(cart), //convert into json data & send it as a part of the req.
//                 }
//             );
//             if (!response.ok) {
//                 throw new Error('Sending cart data failed.');

//                 // dispatch( //firebase async await part
//                 //   uiActions.showNotification({
//                 //     status: 'error',
//                 //     title: 'Error!',
//                 //     message: 'Sending cart data failed!',
//                 //   })
//                 // )
//             }
//         }
//         // await sendRequest(); //it return a promise

//         // dispatch(           //this make it pause if it checked
//         //     uiActions.showNotification({
//         //         status: 'success',
//         //         title: 'Success!',
//         //         message: 'Sent cart data successfully!',
//         //     })
//         // )

//         try {
//             await sendRequest(); //it return a promise
//             dispatch( //firebase async await part
//                 uiActions.showNotification({
//                     status: 'success',
//                     title: 'Success!',
//                     message: 'Sent cart data successfully!',
//                 })
//             )
//         } catch (error) {
//             dispatch( //firebase async await part
//                 uiActions.showNotification({
//                     status: 'error',
//                     title: 'Error!',
//                     message: 'Sending cart data failed!',
//                 })
//             )
//         }
//     }
// }                          //=================> move to cart-action-load.js

export const cartActions = cartSlice.actions;
export default cartSlice;