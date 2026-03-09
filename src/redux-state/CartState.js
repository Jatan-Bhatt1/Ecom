import { configureStore } from "@reduxjs/toolkit";
import { createSlice } from "@reduxjs/toolkit";

const cartSlice = createSlice({
    name: "cart",
    initialState: {
        items: [],
        totalQuantity: 0,
        totalAmount: 0,
    },
    reducers: {
        addItemToCart(state, action) {
            const newItem = action.payload;
            const existingItem = state.items.find(
                (item) =>
                    item.id === newItem.id &&
                    item.selectedSize === newItem.selectedSize &&
                    item.selectedColor === newItem.selectedColor
            );
            state.totalQuantity++;

            if (!existingItem) {
                state.items.push({
                    id: newItem.id,
                    price: newItem.price,
                    quantity: 1,
                    totalPrice: newItem.price,
                    name: newItem.title,
                    picture: newItem.image,
                    brand: newItem.brand,
                    selectedSize: newItem.selectedSize || null,
                    selectedColor: newItem.selectedColor || null,
                });
            } else {
                existingItem.quantity++;
                existingItem.totalPrice = existingItem.totalPrice + newItem.price;
            }
            // Recalculate total amount
            state.totalAmount = state.items.reduce(
                (sum, item) => sum + item.totalPrice,
                0
            );
        },

        removeItemFromCart(state, action) {
            const { id, selectedSize, selectedColor } = action.payload;
            const existingItem = state.items.find(
                (item) =>
                    item.id === id &&
                    item.selectedSize === selectedSize &&
                    item.selectedColor === selectedColor
            );
            if (!existingItem) return;
            state.totalQuantity--;
            if (existingItem.quantity === 1) {
                state.items = state.items.filter(
                    (item) =>
                        !(
                            item.id === id &&
                            item.selectedSize === selectedSize &&
                            item.selectedColor === selectedColor
                        )
                );
            } else {
                existingItem.quantity--;
                existingItem.totalPrice =
                    existingItem.totalPrice - existingItem.price;
            }
            state.totalAmount = state.items.reduce(
                (sum, item) => sum + item.totalPrice,
                0
            );
        },

        removeEntireItem(state, action) {
            const { id, selectedSize, selectedColor } = action.payload;
            const existingItem = state.items.find(
                (item) =>
                    item.id === id &&
                    item.selectedSize === selectedSize &&
                    item.selectedColor === selectedColor
            );
            if (!existingItem) return;
            state.totalQuantity -= existingItem.quantity;
            state.items = state.items.filter(
                (item) =>
                    !(
                        item.id === id &&
                        item.selectedSize === selectedSize &&
                        item.selectedColor === selectedColor
                    )
            );
            state.totalAmount = state.items.reduce(
                (sum, item) => sum + item.totalPrice,
                0
            );
        },

        clearCart(state) {
            state.items = [];
            state.totalQuantity = 0;
            state.totalAmount = 0;
        },
    },
});

const wishlistSlice = createSlice({
    name: "wishlist",
    initialState: {
        items: [],
    },
    reducers: {
        toggleWishlist(state, action) {
            const id = action.payload;
            const exists = state.items.find((item) => item === id);
            if (exists) {
                state.items = state.items.filter((item) => item !== id);
            } else {
                state.items.push(id);
            }
        },
    },
});

const filterSlice = createSlice({
    name: "filters",
    initialState: {
        category: "all",
        priceRange: [0, 500],
        sizes: [],
        brands: [],
        sortBy: "featured",
        searchQuery: "",
    },
    reducers: {
        setCategory(state, action) {
            state.category = action.payload;
        },
        setPriceRange(state, action) {
            state.priceRange = action.payload;
        },
        toggleSize(state, action) {
            const size = action.payload;
            if (state.sizes.includes(size)) {
                state.sizes = state.sizes.filter((s) => s !== size);
            } else {
                state.sizes.push(size);
            }
        },
        toggleBrand(state, action) {
            const brand = action.payload;
            if (state.brands.includes(brand)) {
                state.brands = state.brands.filter((b) => b !== brand);
            } else {
                state.brands.push(brand);
            }
        },
        setSortBy(state, action) {
            state.sortBy = action.payload;
        },
        setSearchQuery(state, action) {
            state.searchQuery = action.payload;
        },
        resetFilters(state) {
            state.category = "all";
            state.priceRange = [0, 500];
            state.sizes = [];
            state.brands = [];
            state.sortBy = "featured";
            state.searchQuery = "";
        },
    },
});

const store = configureStore({
    reducer: {
        cart: cartSlice.reducer,
        wishlist: wishlistSlice.reducer,
        filters: filterSlice.reducer,
    },
});

export default store;
export const cartActions = cartSlice.actions;
export const wishlistActions = wishlistSlice.actions;
export const filterActions = filterSlice.actions;
