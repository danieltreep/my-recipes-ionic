<template>
  <ion-page>
    <div class="startPage">
      <div class="container">
        <img src="@/assets/logo.svg" alt="" />
        <form @submit.prevent="handleSubmit">
          <div class="inputs">
            <ion-item>
              <ion-input
                placeholder="Enter username"
                v-model="displayName"
                type="text"
              ></ion-input>
              <ion-icon :icon="personCircle"></ion-icon>
            </ion-item>
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

          <ion-button type="submit" expand="block" fill="outline">
            Signup
          </ion-button>
          <p>
            Heb je al een account?
            <router-link :to="{ name: 'Login' }">Login</router-link>
          </p>
        </form>
      </div>
    </div>
  </ion-page>
</template>

<script setup lang="ts">
import { IonPage, IonItem, IonInput, IonIcon, IonButton } from "@ionic/vue";
import { lockClosed, mail, personCircle } from "ionicons/icons";
import useSignup from "@/composables/auth/useSignup";
import { ref } from "vue";
import { useRouter } from "vue-router";

const { signup, error, isPending } = useSignup();
const router = useRouter();

const displayName = ref<string>("");
const email = ref<string>("");
const password = ref<string>("");

const handleSubmit = async () => {
  await signup(email.value, password.value, displayName.value);

  if (!error.value) {
    router.push({ name: "Recipes" });
  }
};
</script>

<style lang="css" scoped>
.inputs {
  border-radius: 15px;
  overflow: hidden;
}
ion-input {
  --color: white;
  --placeholder-color: #ddd;
  --highlight-color-focused: black;
}
ion-item {
  --background: #ffffff15;
}
ion-icon {
  color: var(--primary-color);
}
.startPage {
  background-image: url("../../assets/start.jpg");
  background-size: cover;
  background-position: center center;
  height: 100vh;
  /* filter: brightness(50%); */
  background-blend-mode: darken;
  display: flex;
  flex-direction: column;
  justify-content: space-around;
}
.container {
  /* max-width: 280px; */
  /* margin: 0 auto; */
  text-align: center;
  padding: 3rem;
  color: var(--font-light);
}
.inputField {
  background-color: #ffffff15;
  display: flex;
  border-radius: var(--border-radius-l);
  justify-content: space-between;
  margin-top: 10px;
  padding: 0.5rem;
  box-shadow: var(--box-shadow);
}
::placeholder {
  color: var(--font-light);
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
p:nth-of-type(1) {
  font-weight: 500;
}
span {
  color: var(--primary-color);
}
ion-button {
  margin: 2rem 0 3rem;
  --border-radius: 10px;
}

a {
  text-decoration: underline;
  color: var(--secondary-color);
}
</style>
