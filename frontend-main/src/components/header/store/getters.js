const getCurrentSeller = (state) => {
  return state.sellerData;
};

const getCurrentUser = (state) => {
  return state.userData;
};

const drawerVisible = (state) => {
  return state.drawerVisible;
};

const getLucid = (state) => {
  return state.lucidClient;
};

export { getCurrentUser, getCurrentSeller, drawerVisible, getLucid };
