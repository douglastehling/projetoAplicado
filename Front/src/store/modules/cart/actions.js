export function addItem(itens) {
  return {
    type: "@cart/UPDATE_CART",
    payload: { itens },
  };
}

export function updateQtd(id, type) {
  return {
    type: "@cart/UPDATE_QTD",
    payload: { id, type },
  };
}

export function clearCart() {
  return {
    type: "@cart/CLEAR_CART",
  };
}
