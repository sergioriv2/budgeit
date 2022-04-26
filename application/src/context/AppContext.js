import React from "react";

export const AppContext = React.createContext({
  refetchBudget: () => {},
  refetchOperations: () => {},
  removeToken: () => {},
  categories: [],
});
