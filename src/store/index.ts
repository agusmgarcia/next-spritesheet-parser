import { createStore } from "@agusmgarcia/react-core";

const { ...reactStore } = createStore();

export const StoreProvider = reactStore.StoreProvider;
