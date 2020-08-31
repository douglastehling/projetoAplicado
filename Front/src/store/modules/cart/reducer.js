import produce from "immer";

const INITIAL_STATE = {
  itens: [],
};
export default function auth(state = INITIAL_STATE, action) {
  return produce(state, (draft) => {
    switch (action.type) {
      case "@cart/UPDATE_CART": {
        draft.itens = action.payload.itens;
        break;
      }
      case "@cart/UPDATE_QTD": {
        const { id, type } = action.payload;

        draft.itens = draft.itens
          .map((x) => {
            if (x.id == id) {
              return {
                ...x,
                quantity:
                  type == "increase"
                    ? x.quantity < x.quantityStock
                      ? x.quantity + 1
                      : x.quantity
                    : x.quantity > 0
                    ? x.quantity - 1
                    : x.quantity,
              };
            } else {
              return { ...x };
            }
          })
          .filter((y) => y.quantity > 0);

        break;
      }
      case "@cart/CLEAR_CART": {
        draft.itens = [];
        break;
      }

      default:
    }
  });
}
