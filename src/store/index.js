import Vue from "vue"
import Vuex from "vuex"
import axios from "axios"

Vue.use(Vuex)

export default new Vuex.Store({
  state: {
    status: "",
    error: "",
    loggedUser: localStorage.getItem("loggedUser") || ""
  },

  mutations: {
    auth_request(state) {
      state.status = "loading";
    },

    auth_success(state, user) {
      localStorage.setItem("loggedUser", user);

      state.status = "success";
      state.loggedUser = user;
    },

    auth_error(state, error) {
      state.status = "error";
      state.error = error;
    },

    logout(state) {
      state.status = "";
      state.loggedUser = false;
    },
  },

  actions: {
    login({ commit  }, credentials) {
      return new Promise((resolve, reject) => {
        // переданные логин/пароль
        let sUserName = credentials.username,
          sPassword = credentials.password;

        // Заготовка под тексты ошибок
        let oErrorTexts = {
          "empty": "Login and/or password is empty",
          "wrong": "Login and/or password is wrong"
        };

        commit("auth_request");

        // если переданы и юзернейм, и пароль
        if (sUserName && sPassword) {
          // запрос к mock
          axios({ url: "/mock/users.json" })
            .then(resp => {
              let oData = resp.data,
                aUserNames = Object.keys(oData);
              
              // находим пользователя в ответе от mock
              let sFindedUsername = aUserNames.find(sName => sName === sUserName);
              
              // если юзер был найден
              if (sFindedUsername) {
                let oFindedUser = oData[sFindedUsername],
                  sFindedPassword = oFindedUser.pass;
                
                // если совпали пароли
                if (sFindedPassword === sPassword) {
                  commit("auth_success", sFindedUsername);
                  resolve();
                } else {
                  commit("auth_error", oErrorTexts["wrong"]);
                  reject(oErrorTexts["wrong"]);
                }

              } else {
                commit("auth_error", oErrorTexts["wrong"]);
                reject(oErrorTexts["wrong"]);
              }
            })
            .catch(err => {
              commit("auth_error", err);

              reject(err);
            });
        } else {
          commit("auth_error", oErrorTexts["empty"]);
        }

      })
    },

    logout({ commit }) {
      return new Promise((resolve) => {
        commit("logout");

        localStorage.removeItem("loggedUser");

        resolve()
      })
    }
  },

  getters: {
    isLogined: state => !!state.loggedUser,
    authStatus: state => state.status,
    authError: state => state.error,
    userName: state => state.loggedUser ? state.loggedUser : false
  }
})