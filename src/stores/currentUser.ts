import { ref } from "vue";
import { defineStore } from "pinia";
import getUser from "@/composables/auth/getUser";
import { onAuthStateChanged, type User } from "firebase/auth";

export const useCurrentUserStore = defineStore("currentUser", () => {
  const { user }: any = getUser();

  const currentUser = ref<any>(user);

  const resetCurrentUser = () => {
    currentUser.value = null;
  };

  return { currentUser, resetCurrentUser };
});
