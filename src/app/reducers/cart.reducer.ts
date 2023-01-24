const intialState: { cart: object[]; totalAmount: number } = {
  cart: [],
  totalAmount: 0,
};

function addCount(cart: Product[], newProduct: Product): any {
  let index = cart.findIndex((data: any) => data?.productId === newProduct?.productId);

  index === -1
    ? cart.push(newProduct)
    : ((cart[index].qty += newProduct.qty),
      (cart[index].subTotal += cart[index].price));

  return cart;
}

// Reduce Product
function reduceCount(cart: Product[], selected: Product): any {
  let index = cart.findIndex((data: Product) => data?.productId === selected.productId);

  cart[index].qty === 1
    ? cart.splice(index, 1)
    : (cart[index].qty--, (cart[index].subTotal -= cart[index].price));

  return cart;
}

// Delete Product
function deleteProduct(cart: Product[], selected: Product): any {
  let index = cart.findIndex((data: Product) => data?.productId === selected.productId);
  cart[index].qty = 0;
  cart[index].subTotal = 0;
  cart.splice(index, 1);

  return cart;
}

export const cartReducer = (state: any = intialState, action: any) => {
  
  let cart = null;
  let localCart = JSON.parse(localStorage.getItem("cart") || "[]");
  localCart = localCart.length === 0 ? state.cart : localCart;

  switch (action.type) {
    case "ADD_TO_CART": {
      if (action.payload?.subTotal === undefined) {
        action.payload.subTotal = action.payload.price;
      } else {

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

      return { ...state, cart: cart };
    }
    default: {
      return state;
    }
  }
};

export const totalAmount = (state: any = intialState, action: any) => {
  let totalAmount = null;
  let localAmount = JSON.parse(localStorage.getItem("totalAmount") || "0");

  localAmount = localAmount === 0 ? state.totalAmount : localAmount;

  switch (action.type) {
    case "ADD_TO_CART": {
      totalAmount = localAmount + action.payload.price;
      localStorage.setItem("totalAmount", JSON.stringify(totalAmount));

      return { ...state, totalAmount: totalAmount };
    }
    case "SUB_FROM_CART": {
      totalAmount = localAmount - action.payload.price;
      localStorage.setItem("totalAmount", JSON.stringify(totalAmount));

      return { ...state, totalAmount: totalAmount };
    }
    case "DELETE_PRODUCT": {
      totalAmount = localAmount - action.payload.subTotal;

      localStorage.setItem("totalAmount", JSON.stringify(totalAmount));
      return { ...state, totalAmount: totalAmount };
    }
    default: {
      return state;
    }
  }
};

interface Product {
  productId: string;
  _org: Object;
  createdAt: string;
  description: string;
  name: string;
  price: number;
  qty: number;
  subTotal: number;
}
