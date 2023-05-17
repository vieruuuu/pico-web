<template>
  <input type="text" v-model="secret" />

  <button @click="saveSecret">save secret</button>

  <br />

  <button @click="tryApi">PLS TRY</button>

  <h1>{{ resp }}</h1>
</template>

<script setup lang="ts">
import { ref } from "vue";
import { totp } from "native-browser-otp";

const secret = ref("");

const token = ref("");

const resp = ref("");

async function saveSecret() {
  localStorage.setItem("secret", secret.value);

  secret.value = "";
}

async function tryApi() {
  const s = localStorage.getItem("secret");

  if (!s) {
    resp.value = "no_secret";

    return;
  }

  token.value = await totp(s);

  resp.value = "loading";

  const res = await fetch(
    `https://upgrade-pico-https.deno.dev/?key=${token.value}`
  );

  resp.value = await res.text();
}
</script>

<style scoped>
.logo {
  height: 6em;
  padding: 1.5em;
  will-change: filter;
  transition: filter 300ms;
}
.logo:hover {
  filter: drop-shadow(0 0 2em #646cffaa);
}
.logo.vue:hover {
  filter: drop-shadow(0 0 2em #42b883aa);
}
</style>
