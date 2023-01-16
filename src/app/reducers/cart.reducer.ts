const intialState: { cart: object[] } = { cart: [] };

function checkPresence(cart: Product[], newProduct: Product): any {
  console.log("Cart: ", cart);
  let index = cart.findIndex((data: any) => data?._id === newProduct._id);

  if (index !== -1) {
    cart[index].totalCount++;
  } else {
    // newProduct.totalCount = 1;
    cart.push(newProduct);
  }

  return cart;
}

// Reduce Product
function reduceCount(cart: (Product)[], selected: Product): any {
  let index = cart.findIndex((data: Product) => data?._id === selected._id);

  if (cart[index].totalCount === 1) {
    cart.splice(index, 1);
  } else {
    cart[index].totalCount--;
  }

  return cart;
}

// Delete Product
function deleteProduct(cart: Product[], selected: Product): any {
  let index = cart.findIndex((data: Product) => data?._id === selected._id);
  cart.splice(index, 1);

  return cart;
}

export const cartReducer = (state: any = intialState, action: any) => {
  switch (action.type) {
    case "ADD_TO_CART":
      action.payload.totalCount = 1;
      let cart =
        state.cart.length === 0
          ? [action.payload]
          : checkPresence(state.cart, action.payload);
      console.log(cart);
      return { ...state, cart: cart};
    case "SUB_FROM_CART":
        return { ...state, cart: reduceCount(state.cart, action.payload) };
    case "DELETE_PRODUCT":
      return { ...state, cart: deleteProduct(state.cart, action.payload) };
    default:
      return state;
  }
};

interface Product {
  _id: string;
  _org: Object;
  createdAt: string;
  description: string;
  name: string;
  price: number;
  totalCount: number;
}
