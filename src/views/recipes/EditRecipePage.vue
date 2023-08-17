<template>
  <ion-page>
    <ion-content class="ion-padding">
      <form @submit.prevent="handleSubmit" class="page">
        <h3>Recept aanpassen</h3>
        <fieldset>
          <legend>Informatie</legend>
          <ion-item lines="none">
            <ion-icon :src="title" slot="start"></ion-icon>
            <ion-input
              label="Title:"
              v-model="selectedRecipe.title"
            ></ion-input>
          </ion-item>

          <ion-item lines="none">
            <ion-icon :icon="personOutline" slot="start"></ion-icon>
            <ion-input
              label="Persons:"
              type="number"
              v-model="(selectedRecipe.people as number)"
            ></ion-input>
          </ion-item>

          <ion-item lines="none">
            <ion-icon :icon="timeOutline" slot="start"></ion-icon>
            <ion-input
              label="Minutes:"
              type="number"
              v-model="(selectedRecipe.time as number)"
            ></ion-input>
          </ion-item>

          <ion-item lines="none">
            <ion-icon :src="dish" slot="start"> </ion-icon>
            <ion-select
              label="Category:"
              v-model="selectedRecipe.category"
              placeholder="Select category"
            >
              <ion-select-option value="breakfast">Breakfast</ion-select-option>
              <ion-select-option value="lunch">Lunch</ion-select-option>
              <ion-select-option value="dinner">Dinner</ion-select-option>
              <ion-select-option value="starter">Starter</ion-select-option>
              <ion-select-option value="dessert">Dessert</ion-select-option>
              <ion-select-option value="side">Side dish</ion-select-option>
              <ion-select-option value="snack">Snack</ion-select-option>
              <ion-select-option value="drink">Drink</ion-select-option>
            </ion-select>
          </ion-item>
        </fieldset>
        <fieldset>
          <legend>Beschrijving (optioneel)</legend>
          <ion-item lines="none">
            <ion-textarea
              placeholder="Description"
              v-model="selectedRecipe.description"
              :auto-grow="true"
            ></ion-textarea>
          </ion-item>
        </fieldset>
        <!-- <fieldset>
            <legend>Tags</legend>
          </fieldset> -->
        <fieldset>
          <legend>Afbeelding (optioneel)</legend>
          <div class="image box" v-if="selectedRecipe.imageUrl">
            <img :src="selectedRecipe.imageUrl" />
          </div>
          <div class="addImage">
            <label for="fileInput" class="fileLabel" tabindex="0">
              <ion-icon :icon="cameraOutline"></ion-icon>
              <p>Voeg een afbeelding toe</p>
            </label>
            <label
              class="fileLabel"
              v-if="selectedRecipe.imageUrl"
              @click.prevent="selectedRecipe.imageUrl = ''"
            >
              <ion-icon :icon="refresh"></ion-icon>
              <p>Reset</p>
            </label>
            <input
              id="fileInput"
              type="file"
              accept="image/jpeg, image/png"
              @change="handleChange"
            />
          </div>
        </fieldset>

        <fieldset>
          <legend>Ingredienten</legend>

          <ul class="ingredients">
            <EditIngredientsListItem
              v-for="(ingredient, index) in selectedRecipe.ingredients"
              :key="index"
              :index="index"
              :ingredient="ingredient"
              :edit="true"
            />
          </ul>
          <EditAddIngredients />
        </fieldset>

        <fieldset>
          <legend>Stappen</legend>
          <ul class="steps">
            <EditStepsListItem
              v-for="(step, index) in selectedRecipe.steps"
              :key="index"
              :step="step"
              :index="index"
              :show-edit="true"
            />
          </ul>
          <EditAddSteps />
        </fieldset>
        <ErrorMessage message="U heeft nog niet alles ingevoerd" v-if="error" />

        <div class="buttons">
          <ion-button class="prev" fill="clear" @click="router.go(-1)">
            <ion-icon :icon="chevronBack"></ion-icon>
            Go back
          </ion-button>
          <ion-button type="submit" class="next" fill="outline">
            Save
            <ion-icon :icon="save"></ion-icon>
          </ion-button>
        </div>
      </form>
    </ion-content>
  </ion-page>
</template>

<script setup lang="ts">
// External
import { storeToRefs } from "pinia";
import { ref } from "vue";
import { useRouter } from "vue-router";

// // Composables
import useUpdateDocument from "@/composables/recipes/updateDocument";
import useStorage from "@/composables/recipes/useStorage";

// // Components
import EditIngredientsListItem from "@/components/editRecipe/EditIngredientListItem.vue";
import EditAddIngredients from "@/components/editRecipe/EditAddIngredients.vue";
import EditStepsListItem from "@/components/editRecipe/EditStepsListItem.vue";
import EditAddSteps from "@/components/editRecipe/EditAddSteps.vue";
import ErrorMessage from "@/components/error/ErrorMessage.vue";

// // Stores
import { useNewRecipeStore } from "@/stores/newRecipe";
import { useSelectedRecipeStore } from "@/stores/currentRecipe";

// Ionic
import {
  IonInput,
  IonPage,
  IonIcon,
  IonItem,
  IonContent,
  IonSelect,
  IonSelectOption,
  IonButton,
  IonTextarea,
} from "@ionic/vue";

// Icons
import {
  alarm,
  cameraOutline,
  chevronBack,
  chevronForward,
  person,
  personOutline,
  refresh,
  save,
  text,
  timeOutline,
} from "ionicons/icons";
import title from "@/assets/icons/title.svg";
import dish from "@/assets/icons/room_service.svg";

//
const { newRecipe, newRecipeImage } = storeToRefs(useNewRecipeStore());
const { updateRecipeImage } = useSelectedRecipeStore();
const { selectedRecipe, selectedRecipeImage } = storeToRefs(
  useSelectedRecipeStore()
);
const { updateDocument } = useUpdateDocument("recipes");
const { filePath, url, uploadImage } = useStorage();

const imageUrl = ref("");
const file = ref(null);
const router = useRouter();
const error = ref(false);

// Functions
const handleChange = (event: any) => {
  const selected = event.target.files[0];

  if (selected) {
    selectedRecipe.value.imageUrl = URL.createObjectURL(event.target.files[0]);
    updateRecipeImage(selected);
  } else {
    file.value = null;
    imageUrl.value = "";
  }
};

const handleSubmit = async () => {
  // Show error if there are no steps or ingredients
  if (
    !selectedRecipe.value.steps.length ||
    !selectedRecipe.value.ingredients.length
  ) {
    error.value = true;
    return;
  } else {
    // Check if there is an image in store, if so upload it.
    if (selectedRecipeImage.value) {
      await uploadImage(selectedRecipeImage.value as File);

      // Update the new recipe with the returned filePath and url refs
      selectedRecipe.value.filePath = filePath.value;
      selectedRecipe.value.imageUrl = url.value;
    }

    // Add document with the value from newRecipe store
    await updateDocument(selectedRecipe.value);

    // Reset steps and go back to updated recipe page

    router.go(-1);
  }
};
</script>

<style lang="css" scoped>
h3 {
  text-align: center;
}
fieldset {
  padding: 0;
  border: none;
  display: flex;
  flex-direction: column;
  gap: 5px;
  margin: 2rem 0;
}
legend {
  margin: 0 0 0.5rem 0.5rem;
  font-size: 14px;
  font-weight: 500;
}
form {
  font-size: 14px;
  margin: 2rem 0 calc(85px + 2rem);
}
.buttons {
  display: flex;
  justify-content: space-between;
}
#fileInput {
  display: none;
}
label {
  width: max-content;
}
select:first-of-type {
  border: none;
  text-align: end;
  padding: 0 0.5rem;
  outline: transparent;
}
.fileLabel {
  /* background-color: var(--card-color); */
  display: flex;
  align-items: center;
  /* border: 1px solid var(--primary-color); */
  padding: 0.1rem 0.5rem;
  /* width: fit-content; */
  border-radius: var(--border-radius-l);
  font-size: 14px;
  gap: 0.2rem;
  background-color: var(--card-color);
  width: fit-content;
  box-shadow: var(--box-shadow);
  padding: 0.5rem 0.8rem;
}
.fileLabel .material-symbols-outlined {
  font-size: 20px;
}
.image {
  padding: 1rem;
}
.image img {
  border-radius: var(--border-radius-s);
}
.addImage {
  display: flex;
  justify-content: space-between;
  margin-top: 0.5rem;
}
ul.ingredients {
  background-color: var(--card-color);
  border-radius: var(--border-radius-m);
  box-shadow: var(--box-shadow);
  padding-left: 0;
}

.ingredients li:not(:last-child) {
  border-bottom: 3px solid var(--background-color);
}
ion-item::part(native) {
  border-radius: var(--border-radius-m);
}
fieldset ion-icon {
  color: var(--primary-color);
  margin-right: 0.5rem;
}
</style>
