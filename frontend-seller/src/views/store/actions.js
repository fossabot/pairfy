import { HOST } from "@/api";
import axiosAPI from "@/api/axios";

const createUser = async (_, params) => {
  try {
    const response = await axiosAPI.post("/api/seller/create-seller", params);

    console.log(response);

    return { ok: true, response: response.data };
  } catch (error) {
    return { ok: false, response: error.response.data };
  }
};

const loginUser = async ({ commit }, params) => {
  try {
    const response = await axiosAPI.post("/api/seller/login-seller", params);

    console.log(response);

    commit("userData", response.data);

    return { ok: true, response: response.data };
  } catch (error) {
    return { ok: false, response: error.response.data };
  }
};

const getUser = async ({ commit }) => {
  try {
    const response = await axiosAPI.get("/api/seller/current-seller");

    commit("userData", response.data.sellerData);

    return { ok: true, response: response.data };
  } catch (error) {
    return { ok: false, response: error.response.data };
  }
};


const createImage = async (_, params) => {
  try {
    const response = await fetch(HOST + "/api/media/create-image", {
      method: "POST",
      body: params,
      credentials: "include",
    });


    return { ok: true, response: await response.json() };
  } catch (error) {
    return { ok: false, response: error.response };
  }
};

export { createUser, loginUser, getUser, createImage };
