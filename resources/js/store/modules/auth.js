import axios from "axios";

import {
  AUTH_REQUEST,
  AUTH_ERROR,
  AUTH_SUCCESS,
  AUTH_LOGOUT,
  AUTH_LOGEDOUT
} from "../actions/auth";

import { USER_REQUEST } from "../actions/user";


const state = {
  token: localStorage.getItem("access_token") || "",
  status: "",
  hasLoadedOnce: false
};

const getters = {
  isAuthenticated: state => !!state.token,
  authStatus: state => state.status
};

const actions = {
  [AUTH_REQUEST]: ({ commit, dispatch }, user) => {
    return new Promise((resolve, reject) => {
      commit(AUTH_REQUEST);
      axios.post("/api/login", user)
        .then(resp => {
          localStorage.setItem("access_token", resp.data.access_token);
          // Here set the header of your ajax library to the token value.
          axios.defaults.headers.common['Authorization'] = 'Bearer ' + resp.data.access_token
          commit(AUTH_SUCCESS, resp);
          dispatch(USER_REQUEST);
          resolve(resp);
        })
        .catch(err => {
          commit(AUTH_ERROR, err);
          localStorage.removeItem("access_token");
          reject(err);
        });
    });
  },
  [AUTH_LOGOUT]: ({ commit, dispatch }) => {
    return new Promise((resolve, reject) => {
      commit(AUTH_LOGOUT);
      axios.post("/api/logout")
        .then(resp => {
          dispatch(AUTH_LOGEDOUT);
          resolve();
        })
        .catch(err => {
          commit(AUTH_ERROR, err);
          localStorage.removeItem("access_token");
          delete axios.defaults.headers.common['Authorization']
          reject(err);
        });
    });
  },
  [AUTH_LOGEDOUT]: ({ commit }) => {
    return new Promise(resolve => {
      commit(AUTH_LOGEDOUT);
      localStorage.removeItem("access_token");
      delete axios.defaults.headers.common['Authorization']
      resolve();
    });
  }
};

const mutations = {
  [AUTH_REQUEST]: state => {
    state.status = "loading";
  },
  [AUTH_SUCCESS]: (state, resp) => {
    state.status = "success";
    state.token = resp.data.access_token;
    state.hasLoadedOnce = true;
  },
  [AUTH_ERROR]: state => {
    state.status = "error";
    state.hasLoadedOnce = true;
  },
  [AUTH_LOGOUT]: state => {
    state.status = "loading";
  },
  [AUTH_LOGEDOUT]: state => {
    state.status = "logedout";
    state.token = "";
  }
};

export default {
  state,
  getters,
  actions,
  mutations
};