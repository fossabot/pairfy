import { useStore } from "vuex";
import { computed } from "vue";

const dashboardAPI = () => {
  const store = useStore();

  const loginUser = async (params) =>
    await store.dispatch("dashboard/loginUser", params);

  const getUser = async (params) =>
    await store.dispatch("dashboard/getUser", params);

  const createUser = async (params) =>
    await store.dispatch("dashboard/createUser", params);

  const sleep = (timeInMs) =>
    new Promise((resolve) => setTimeout(() => resolve(false), timeInMs));

  return {
    loginUser,
    getUserData: computed(() => store.getters["dashboard/getUserData"]),
    createUser,
    getUser,
    sleep,
  };
};

export default dashboardAPI;
