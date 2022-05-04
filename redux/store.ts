/// <reference types="redux-persist" />

import { configureStore } from "@reduxjs/toolkit";
import { rootReducer } from "./rootReducer";
import AsyncStorage from "@react-native-async-storage/async-storage";
import { createTransform, persistReducer } from "redux-persist";
import Flatted from "flatted";
import autoMergeLevel2 from "redux-persist/es/stateReconciler/autoMergeLevel2";

import JSOG from "jsog";

export const JSOGTransform = createTransform(
  (inboundState, key) => JSOG.encode(inboundState),
  (outboundState, key) => JSOG.decode(outboundState)
);

export const transformCircular = createTransform(
  (inboundState, key) => Flatted.stringify(inboundState),
  (outboundState, key) => Flatted.parse(outboundState)
);

const persistConfig = {
  key: "root",
  storage: AsyncStorage,
  // transforms: [JSOGTransform],
};

const persistedReducer = persistReducer(persistConfig, rootReducer);

export const store = configureStore({
  reducer: persistedReducer,
  middleware: (getDefaultMiddleware) =>
    getDefaultMiddleware({
      immutableCheck: { warnAfter: 1000 },
      serializableCheck: false,
    }),
});

export type Dispatch = typeof store.dispatch;
