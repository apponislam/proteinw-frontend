import { createSlice, PayloadAction } from "@reduxjs/toolkit";

export type TCartItem = {
    productId: string;
    quantity: number;
    price: number;
    name: string;
};

interface CartState {
    items: TCartItem[];
}

const initialState: CartState = {
    items: [],
};

const cartSlice = createSlice({
    name: "cart",
    initialState,
    reducers: {
        updateQuantity(state, action: PayloadAction<{ productId: string; quantity: number; price: number; name: string }>) {
            const { productId, quantity, price, name } = action.payload;
            const existingItem = state.items.find((item) => item.productId === productId);
            if (existingItem) {
                if (quantity <= 0) {
                    state.items = state.items.filter((item) => item.productId !== productId);
                } else {
                    existingItem.quantity = quantity;
                }
            } else if (quantity > 0) {
                state.items.push({ productId, quantity, price, name });
            }
        },
        clearCart(state) {
            state.items = [];
        },
    },
});

export const { updateQuantity, clearCart } = cartSlice.actions;
export default cartSlice.reducer;
