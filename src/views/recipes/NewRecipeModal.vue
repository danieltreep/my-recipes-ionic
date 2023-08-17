<template>
  <ion-fab slot="fixed" horizontal="end" vertical="bottom">
    <ion-fab-button @click="setOpen(true)">
      <ion-icon :icon="add" size="large"></ion-icon>
    </ion-fab-button>
  </ion-fab>

  <ion-modal :is-open="isOpen" name="New Recipe">
    <ion-page>
      <ion-header>
        <ion-toolbar>
          <ion-buttons slot="start">
            <ion-button @click="setOpen(false)">
              <ion-icon :icon="close" slot="icon-only"></ion-icon>
            </ion-button>
          </ion-buttons>
          <h3>Nieuw recept</h3>
          <ion-buttons slot="end">
            <ion-button
              :strong="true"
              :disabled="!newRecipe.steps.length"
              @click="handleSubmit"
            >
              <ion-icon :icon="save" slot="icon-only"></ion-icon>
            </ion-button>
          </ion-buttons>
        </ion-toolbar>
      </ion-header>
      <ion-content class="ion-padding">
        <StepIndicators />

        <StepForm @submit="handleSubmit" />
      </ion-content>
    </ion-page>
  </ion-modal>
</template>

<script setup lang="ts">
import {
  IonPage,
  IonContent,
  IonModal,
  IonButton,
  IonHeader,
  IonFab,
  IonFabButton,
  IonTitle,
  IonIcon,
  IonButtons,
  IonToolbar,
} from "@ionic/vue";
import StepForm from "@/components/stepForm/StepForm.vue";
import StepIndicators from "@/components/stepForm/StepIndicators.vue";
import { ref } from "vue";
import { add, save, close } from "ionicons/icons";

// External
import { storeToRefs } from "pinia";
import { useStepStore } from "@/stores/step";

import { useRouter } from "vue-router";

// Composables
import useCollection from "@/composables/recipes/useCollection";
import useStorage from "@/composables/recipes/useStorage";

// Stores
import { useNewRecipeStore } from "@/stores/newRecipe";

// Functions
const { addDocument, isPending } = useCollection();
const { resetRecipe } = useNewRecipeStore();
const { decrement, resetStep } = useStepStore();
const { filePath, url, uploadImage } = useStorage();

// Refs
const { newRecipe, newRecipeImage } = storeToRefs(useNewRecipeStore());
const error = ref(false);

const isOpen = ref(false);
const router = useRouter();

const setOpen = (open: boolean) => (isOpen.value = open);
const handleSubmit = async () => {
  // Check if there is an image in store, if so upload it.
  if (newRecipeImage.value) {
    await uploadImage(newRecipeImage.value);

    // Update the new recipe with the returned filePath and url refs
    newRecipe.value.filePath = filePath.value;
    newRecipe.value.imageUrl = url.value;
  }

  // Add document with the value from newRecipe store
  const recipeId = await addDocument(newRecipe.value);

  // // Reset steps and go to newly added recipe page

  resetStep();
  resetRecipe();
  router.push({
    name: "Recipe",
    params: { id: recipeId },
  });
  setOpen(false);
};
</script>

<style lang="css" scoped>
ion-content {
  --padding-top: 3rem;
}
h3 {
  text-align: center;
  margin: 0.5rem;
}
ion-fab {
  margin: 1rem;
}
ion-fab-button {
  --color: white;
  font-size: 20px;
}
</style>
