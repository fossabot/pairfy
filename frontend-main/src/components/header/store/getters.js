const getCurrentSeller = (state) => {
  return state.sellerData;
};

const getCurrentUser = (state) => {
  return state.userData;
};

const panelVisible = (state) => {
  return state.panelVisible;
};

const destinationsVisible = (state) => {
  return state.destinationsVisible;
};

const getLucid = (state) => {
  return state.lucidClient;
};

const getADAprice = (state) => {
  return state.ADAprice;
};

export { getCurrentUser, getCurrentSeller, panelVisible, destinationsVisible, getLucid, getADAprice};
