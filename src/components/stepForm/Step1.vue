<template>
  <form @submit.prevent="handleSubmit">
    <!-- <button>Volgende</button> -->
    <fieldset>
      <legend>Informatie</legend>
      <ul>
        <ion-item lines="full">
          <ion-icon :src="title" slot="start"></ion-icon>
          <ion-input
            label="Title:"
            v-model="newRecipe.title"
            placeholder="Enter title"
            required
          ></ion-input>
        </ion-item>

        <ion-item lines="full">
          <ion-icon :icon="personOutline" slot="start"></ion-icon>
          <ion-input
            label="People:"
            type="number"
            v-model="(newRecipe.people as number)"
            placeholder="0"
            required
          ></ion-input>
        </ion-item>

        <ion-item lines="full">
          <ion-icon :icon="timeOutline" slot="start"></ion-icon>
          <ion-input
            label="Minutes:"
            type="number"
            v-model="(newRecipe.time as number)"
            placeholder="0"
            required
          ></ion-input>
        </ion-item>

        <ion-item lines="full">
          <ion-icon :src="dish" slot="start"></ion-icon>
          <ion-select
            label="Category:"
            v-model="newRecipe.category"
            placeholder="Select category"
            required
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
      </ul>
    </fieldset>
    <fieldset>
      <legend>Beschrijving (optioneel)</legend>
      <ion-item lines="none" class="textarea">
        <ion-textarea
          placeholder="Description"
          v-model="newRecipe.description"
          :auto-grow="true"
        ></ion-textarea>
      </ion-item>
    </fieldset>
    <!-- <fieldset>
            <legend>Tags</legend>
        </fieldset> -->
    <fieldset>
      <legend>Afbeelding (optioneel)</legend>
      <div class="image box" v-if="imageUrl">
        <img :src="imageUrl" />
      </div>
      <div class="addImage">
        <label for="fileInput" class="fileLabel" tabindex="0">
          <ion-icon :icon="cameraOutline"></ion-icon>
          <p>Voeg een afbeelding toe</p>
        </label>
        <label class="fileLabel" v-if="imageUrl" @click.prevent="imageUrl = ''">
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
    <div class="buttons">
      <ion-button disabled class="prev" fill="clear">
        <ion-icon :icon="chevronBack"></ion-icon>
        Previous
      </ion-button>
      <ion-button type="submit" class="next" fill="outline">
        Next
        <ion-icon :icon="chevronForward"></ion-icon>
      </ion-button>
    </div>
  </form>
</template>

<script setup lang="ts">
import {
  IonInput,
  IonIcon,
  IonItem,
  IonSelect,
  IonSelectOption,
  IonButton,
  IonTextarea,
} from "@ionic/vue";
import { useNewRecipeStore } from "@/stores/newRecipe";
import { useStepStore } from "@/stores/step";

import { storeToRefs } from "pinia";
import { ref } from "vue";
import {
  alarm,
  cameraOutline,
  chevronBack,
  chevronForward,
  personOutline,
  refresh,
  text,
  timeOutline,
} from "ionicons/icons";
import title from "@/assets/icons/title.svg";
import dish from "@/assets/icons/room_service.svg";
import personIcon from "@/assets/icons/person.svg";

const { increment } = useStepStore();
const { newRecipe, newRecipeImage } = storeToRefs(useNewRecipeStore());
const { updateRecipeImage } = useNewRecipeStore();

const imageUrl = ref("");
const file = ref(null);

const handleSubmit = () => {
  increment();
};

const handleChange = (event: any) => {
  const selected = event.target.files[0];

  if (selected) {
    imageUrl.value = URL.createObjectURL(event.target.files[0]);
    updateRecipeImage(selected);
  } else {
    file.value = null;
    imageUrl.value = "";
  }
};
</script>

<style lang="css" scoped>
#fileInput {
  display: none;
}
label {
  width: max-content;
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
  box-shadow: var(--element-box-shadow);
  padding: 0.8rem;
}
.fileLabel .material-symbols-outlined {
  font-size: 20px;
}
.image {
  padding: 1rem;
  box-shadow: var(--element-box-shadow);
}
.image img {
  border-radius: var(--border-radius-s);
}
.addImage {
  display: flex;
  justify-content: space-between;
  margin-top: 0.5rem;
}
.addImage ion-icon {
  font-size: 20px;
}
ul {
  border-radius: var(--border-radius-m);
  box-shadow: var(--element-box-shadow);
  overflow: hidden;
}
fieldset ion-icon {
  color: var(--primary-color);
  margin-right: 0.5rem;
}
ion-button,
.textarea {
  --border-radius: var(--border-radius-m);
  border-radius: var(--border-radius-m);
}
</style>
