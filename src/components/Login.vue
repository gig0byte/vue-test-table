<template>
  <v-row align="center">
    <v-col cols="12" md="6" align="center" justify="center">
      <v-text-field
        v-model="username"
        label="Username"
        :error="authStatus === 'error'"
        required
      />
    </v-col>

    <v-col cols="12" md="6" align="center" justify="center">
      <v-text-field
        v-model="password"
        label="Password"
        :type="showPass ? 'text' : 'password'"
        :append-icon="showPass ? 'mdi-eye' : 'mdi-eye-off'"
        @click:append="showPass = !showPass"
        :error="authStatus === 'error'"
        required
      />
    </v-col>
    <v-col cols="12" justify="center" align="center">
      <v-btn
        @click="login"
        :disabled="!username || !password"
        :loading="authStatus === 'loading'"
      >
        Login
      </v-btn>
    </v-col>
    <v-col cols="12">
      <v-alert v-if="authStatus === 'error'" type="error">
        {{ authError }}
      </v-alert>
    </v-col>
  </v-row>
</template>

<script>
import { mapGetters, mapActions } from "vuex";

export default {
  data() {
    return {
      username: "",
      password: "",
      showPass: false,
    };
  },
  computed: {
    ...mapGetters({
      authStatus: "authStatus",
      authError: "authError",
      isLogined: "isLogined",
    }),
  },
  methods: {
    ...mapActions({
      auth: "login",
    }),

    login: function () {
      let username = this.username,
        password = this.password;

      this.auth({ username, password })
        .then(() => {
            this.$router.push("/table");
        })
        .catch((err) => {
          console.error(err);
        });
    },
  },
};
</script>