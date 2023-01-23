import { createContext, useReducer } from 'react';
// Criando o createContext.
export const Store = createContext();

const initialState = {
  userInfo: localStorage.getItem('userInfo')
    ? JSON.parse(localStorage.getItem('userInfo'))
    : null,

  cart: {
    shippingAddress: localStorage.getItem('shippingAddress')
      ? JSON.parse(localStorage.getItem('shippingAddress'))
      : {},
    paymentMethod: localStorage.getItem('paymentMethod')
      ? localStorage.getItem('paymentMethod')
      : '',
    cartItems: localStorage.getItem('cartItems')
      ? JSON.parse(localStorage.getItem('cartItems'))
      : [],
  },
};
function reducer(state, action) {
  switch (action.type) {
    case 'CART_ADD_ITEM':
      // add to cart
      // Está salvando o número que vamos adicionar no cart em newItem.
      const newItem = action.payload;
      // Está procurando o item existente com base no critério abaixo.
      const existItem = state.cart.cartItems.find(
        (item) => item._id === newItem._id
      );
      // Se já tivermos este item no carrinho, temos que utilizar o map para atualizar o item atual com o novo item que obtemos do payload. Caso contrario, mantenha o item anterior no cart.
      const cartItems = existItem
        ? state.cart.cartItems.map((item) =>
            item._id === existItem._id ? newItem : item
          )
        : [...state.cart.cartItems, newItem];
      // Atualiza o item do cart com base do valor de cartItems.
      return { ...state, cart: { ...state.cart, cartItems } };
    case 'CART_REMOVE_ITEM': {
      const cartItems = state.cart.cartItems.filter(
        (item) => item._id !== action.payload._id
      );
      localStorage.setItem('cartItems', JSON.stringify(cartItems));
      return { ...state, cart: { ...state.cart, cartItems } };
    }
    case 'CART_CLEAR':
      return { ...state, cart: { ...state.cart, cartItems: [] } };
      
    case 'USER_SIGNIN':
      return { ...state, userInfo: action.payload };
    case 'USER_SIGNOUT':
      return {
        ...state,
        userInfo: null,
        cart: {
          cartItems: [],
          shippingAddress: {},
          paymentMethod: '',
        },
      };
    case 'SAVE_SHIPPING_ADDRESS':
      return {
        ...state,
        cart: {
          ...state.cart,
          shippingAddress: action.payload,
        },
      };
    case 'SAVE_PAYMENT_METHOD':
      return {
        ...state,
        cart: { ...state.cart, paymentMethod: action.payload },
      };
    default:
      return state;
  }
}

// Ele esta envolvendo o aplicativo react, e está passando adereços globais para os childrens.
export function StoreProvider(props) {
  // O useReducer aceita dois parâmetros o primeiro é o reducer, e o segundo e o estado inicial.
  const [state, dispatch] = useReducer(reducer, initialState);
  const value = { state, dispatch };
  // Store está vindo do cotexto do react. O value contem o estado atua no contexto, e o dispatch para atualizar o estado no contexto.
  return <Store.Provider value={value}>{props.children}</Store.Provider>;
}
