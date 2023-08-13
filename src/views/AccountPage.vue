<template>
  <ion-page>
    <ion-header class="ion-no-border">
      <ion-toolbar>
        <ion-title>Mijn Account</ion-title>
        <ion-button id="click-trigger" slot="end">
          <ion-icon :icon="ellipsisVertical"></ion-icon>
        </ion-button>
        <ion-popover trigger="click-trigger" trigger-action="click">
          <ion-content class="ion-padding" @click="openModal()">
            <ion-icon :icon="trashBin"></ion-icon>
            Delete account
          </ion-content>
        </ion-popover>
      </ion-toolbar>

      <!-- <AccountOptions @click="openModal" v-if="moreOptions" /> -->
    </ion-header>
    <ion-content :fullscreen="true" class="ion-padding">
      <div class="profile">
        <ion-icon :icon="personCircle" size="large"></ion-icon>
        <p class="displayName">{{ currentUser?.displayName }}</p>
        <p class="title">Hobby Cook</p>
      </div>

      <ion-list>
        <ion-list-header>
          <ion-label>Preferences</ion-label>
          <ion-button>Edit</ion-button>
        </ion-list-header>
        <ion-item>
          <ion-icon :icon="moonOutline"></ion-icon>
          <ion-toggle>Dark Mode</ion-toggle>
        </ion-item>
        <ion-item>
          <ion-icon :icon="globeOutline"></ion-icon>
          <ion-label>Language</ion-label>
        </ion-item>
      </ion-list>
      <ion-button @click="handleSignOut">
        Logout
        <ion-icon :icon="logOutOutline"></ion-icon>
      </ion-button>

      <DeleteModal v-if="modal" @delete="handleDelete" @cancel="closeModal" />
    </ion-content>
  </ion-page>
</template>

<script setup lang="ts">
import {
  IonPage,
  IonContent,
  IonIcon,
  IonHeader,
  IonTitle,
  IonButton,
  IonToolbar,
  IonPopover,
  IonItem,
  IonLabel,
  IonListHeader,
  IonList,
  IonToggle,
} from "@ionic/vue";
import {
  personCircle,
  ellipsisVertical,
  trashBin,
  moonOutline,
  logOut,
  logOutOutline,
  globeOutline,
} from "ionicons/icons";
// External
import { useRouter } from "vue-router";
import { ref } from "vue";

// // Stores
import { useCurrentUserStore } from "@/stores/currentUser";
import { useNewRecipeStore } from "@/stores/newRecipe";

// // Functions
import useDeleteUser from "@/composables/auth/deleteUser";
import useSignOut from "@/composables/auth/useSignOut";

// // Components
import AccountOptions from "@/components/AccountOptions.vue";
import DeleteModal from "@/components/DeleteModal.vue";

const moreOptions = ref<boolean>(false);
const modal = ref<boolean>(false);
const router = useRouter();

const { currentUser, resetCurrentUser } = useCurrentUserStore();
const { signout, error } = useSignOut();
const { resetRecipe } = useNewRecipeStore();

const handleSignOut = async () => {
  await signout().then(() => {
    router.push({ name: "Login" });
    resetCurrentUser();
    resetRecipe();
  });
};

const openModal = () => {
  modal.value = true;
  moreOptions.value = false;
};

const closeModal = () => {
  modal.value = false;
};

const handleDelete = async () => {
  await useDeleteUser().then(() => {
    console.log("succes from handleDelete");
    modal.value = false;
    resetCurrentUser();
    router.push({ name: "Login" });
  });
};
</script>

<style lang="css" scoped>
ion-header {
  display: flex;
  justify-content: center;
}
ion-button {
  --background: translucent;
  --box-shadow: 0;
}
.profile {
  text-align: center;
  margin: 2rem;
}
.profile .material-symbols-outlined {
  font-size: 100px;
  color: var(--font-inactive);
}
.displayName {
  font-weight: bold;
  font-size: 1.3rem;
}
.title {
  font-size: 14px;
  margin-top: 0.2rem;
  color: var(--font-inactive);
}
li {
  display: flex;
  justify-content: start;
  gap: 0.5rem;
  align-items: center;
}
label {
  margin-left: auto;
}

ion-list-header {
  font-size: 18px;
  font-weight: 500;
}
.logout {
  display: flex;
  justify-content: space-between;
  padding-left: 1rem;
  align-items: center;
  margin-top: 2rem;
}
ion-icon {
  color: var(--primary-color);
}
ion-toggle {
  --handle-width: 18px;
  --handle-height: 18px;
}
ion-toggle::part(track) {
  height: 24px;
  width: 40px;

  /* Required for iOS handle to overflow the height of the track */
  overflow: visible;
}
</style>
