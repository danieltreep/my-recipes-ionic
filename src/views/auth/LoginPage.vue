<template>
  <ion-page>
    <ion-content>
      <div class="startPage">
        <div class="container">
          <img src="@/assets/logo.svg" alt="" />
          <form @submit.prevent="handleSubmit" v-if="!recover">
            <!-- <ion-item> -->
            <div class="inputs">
              <ion-item>
                <ion-input
                  placeholder="Enter email"
                  v-model="email"
                  type="email"
                ></ion-input>
                <ion-icon :icon="mail"></ion-icon>
              </ion-item>

              <ion-item>
                <ion-input
                  placeholder="Enter password"
                  v-model="password"
                  type="password"
                ></ion-input>
                <ion-icon :icon="lockClosed"></ion-icon>
              </ion-item>
            </div>

            <!-- </ion-item> -->
            <p class="vergeten" @click="recover = !recover">
              Wachtwoord vergeten?
            </p>

            <ion-button
              type="submit"
              expand="block"
              shape="round"
              fill="outline"
            >
              Login
            </ion-button>

            <p>
              Heb je nog geen account?
              <router-link :to="{ name: 'Signup' }">Signup</router-link>
            </p>
          </form>
          <ForgotPassword v-if="recover" />
        </div>
      </div>
    </ion-content>
  </ion-page>
</template>

<script setup lang="ts">
import {
  IonPage,
  IonInput,
  IonIcon,
  IonItem,
  IonContent,
  IonButton,
} from "@ionic/vue";
import { lockClosed, mail } from "ionicons/icons";
import ForgotPassword from "@/components/ForgotPassword.vue";
import useLogin from "@/composables/auth/useLogin";
import { ref } from "vue";
import { useRouter } from "vue-router";

const { login, error, isPending } = useLogin();
const email = ref<string>("");
const password = ref<string>("");

const router = useRouter();
const recover = ref(false);

const handleSubmit = async () => {
  await login(email.value, password.value);

  if (!error.value) {
    router.push({ name: "Recipes" });
  }
};
</script>

<style lang="css" scoped>
ion-input {
  --color: white;
  --placeholder-color: #ddd;
  --highlight-color-focused: black;
  text-align: start;
}
ion-item {
  --background: #ffffff15;
}
ion-icon {
  color: var(--primary-color);
}
.inputs {
  border-radius: 15px;
  overflow: hidden;
}
ion-button {
  --border-radius: 10px;
  margin: 2rem 0;
}
.startPage {
  background-image: url("@/assets/start.jpg");
  background-size: cover;
  background-position: center center;
  height: 100vh;
  /* filter: brightness(50%); */
  /* background-blend-mode: darken; */
  display: flex;
  flex-direction: column;
  justify-content: space-around;
}
.container {
  padding: 3rem;
  color: var(--font-light);
  text-align: center;
}
img {
  width: 160px;
  margin-bottom: 2rem;
}

.vergeten {
  text-align: left;
  margin: 0.5rem;
  font-size: 12px;
}
p:nth-of-type(2) {
  font-weight: 500;
}

button span {
  position: absolute;
  right: 0.5rem;
}
a {
  text-decoration: underline;
  color: var(--secondary-color);
}
</style>
