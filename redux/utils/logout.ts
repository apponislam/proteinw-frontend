import store, { persistor } from "../stote";
import { logOut } from "../features/auth/authSlice";
import { baseApi } from "../api/baseApi";

export const performFullLogout = () => {
    try {
        // 1. Clear auth state in Redux
        store.dispatch(logOut());

        // 2. Reset all RTK Query cache (clears all groups, campaigns, products, orders, etc.)
        store.dispatch(baseApi.util.resetApiState());

        // 3. Clear local & session storage
        if (typeof window !== "undefined") {
            localStorage.clear();
            sessionStorage.clear();
        }

        // 4. Purge persisted Redux storage
        persistor.purge();
    } catch (err) {
        console.error("Error during full logout:", err);
    }
};
