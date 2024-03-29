import { createAction, props } from "@ngrx/store";

// let demo = createAction('ADD_TO_CART',props<{product: any}>);

export const addToCart = (action: any) => {
    console.log(action)
    return {
        type: "ADD_TO_CART",
        payload: action
    }
};

export const deleteProduct = (action: any) => {

    return {
        type: "DELETE_PRODUCT",
        payload: action
    }
}

export const subProduct = (action: any) => {

    return {
        type: "SUB_FROM_CART",
        payload: action
    }
}