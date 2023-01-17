const intialState: { cart: object[], totalAmount: number} = { cart: [] , totalAmount: 0};


function addCount(cart: Product[], newProduct: Product): any {
  let index = cart.findIndex((data: any) => data?._id === newProduct._id);

  index === -1
    ? cart.push(newProduct)
    : ((cart[index].totalCount += 1),
      (cart[index].totalPrice += cart[index].price));

  return cart;
}

// Reduce Product
function reduceCount(cart: Product[], selected: Product): any {
  let index = cart.findIndex((data: Product) => data?._id === selected._id);

  cart[index].totalCount === 1
    ? cart.splice(index, 1)
    : (cart[index].totalCount--, (cart[index].totalPrice -= cart[index].price));

  return cart;
}

// Delete Product
function deleteProduct(cart: Product[], selected: Product): any {
  let index = cart.findIndex((data: Product) => data?._id === selected._id);
  cart[index].totalCount = 0;
  cart[index].totalPrice = 0;
  cart.splice(index, 1);

  return cart;
}

export const cartReducer = (state: any = intialState, action: any) => {
  
  let cart = null;
  let localCart = JSON.parse(localStorage.getItem("cart") || "[]");
  localCart = localCart.length === 0 ? state.cart : localCart;

  switch (action.type) {
    case "ADD_TO_CART": {
      if (action.payload?.totalCount === undefined) {
        action.payload.totalCount = 1;
        action.payload.totalPrice = action.payload.price;
      }

      cart =
        localCart.length === 0
          ? [action.payload]
          : addCount(localCart, action.payload);

      localStorage.setItem("cart", JSON.stringify(cart));
      return { ...state, cart: cart };
    }
    case "SUB_FROM_CART": {
      cart = reduceCount(localCart, action.payload);
      localStorage.setItem("cart", JSON.stringify(cart));
      return { ...state, cart: cart };
    } 
    case "DELETE_PRODUCT": {

      cart = deleteProduct(localCart, action.payload);
      localStorage.setItem("cart", JSON.stringify(cart));

      return {...state,cart: cart};
    }
    default: {
      return state;
    }
  }
};


export const totalAmount = (state: any = intialState, action: any) => {

  let cart = null;
  let totalAmount = null;
  let localCart = JSON.parse(localStorage.getItem("cart") || "[]");
  let localAmount = JSON.parse(localStorage.getItem("totalAmount") || "0");

  localAmount = localAmount === 0 ? state.totalAmount : localAmount;

  switch(action.type) {
    case "ADD_TO_CART": {
      
      totalAmount = localAmount + action.payload.price;
      localStorage.setItem("totalAmount", JSON.stringify(totalAmount));

      return { ...state, totalAmount: totalAmount}
    }
    case "SUB_FROM_CART": {
     
      totalAmount = localAmount - action.payload.price;
      localStorage.setItem("totalAmount", JSON.stringify(totalAmount));

      return { ...state, totalAmount: totalAmount}
    }
    case "DELETE_PRODUCT": {
      
      totalAmount = localAmount - action.payload.totalPrice;
            
      localStorage.setItem("totalAmount", JSON.stringify(totalAmount));
      return { ...state, totalAmount: totalAmount};      
    }
    default: {
      return state;
    } 
  }
}

interface Product {
  _id: string;
  _org: Object;
  createdAt: string;
  description: string;
  name: string;
  price: number;
  totalCount: number;
  totalPrice: number;
}
