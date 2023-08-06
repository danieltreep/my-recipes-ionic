<template>
  <form @submit.prevent="handleSubmit">
    <!-- <button>Volgende</button> -->
    <fieldset>
      <legend>Informatie</legend>
      <ion-item lines="none">
        <ion-icon :icon="text" slot="start"></ion-icon>
        <ion-input label="Title:" v-model="newRecipe.title"></ion-input>
      </ion-item>

      <ion-item lines="none">
        <ion-icon :icon="person" slot="start"></ion-icon>
        <ion-input
          label="Persons:"
          type="number"
          v-model="newRecipe.people"
        ></ion-input>
      </ion-item>

      <ion-item lines="none">
        <ion-icon :icon="alarm" slot="start"></ion-icon>
        <ion-input
          label="Minutes:"
          type="number"
          v-model="newRecipe.time"
        ></ion-input>
      </ion-item>

      <ion-item lines="none">
        <ion-icon :icon="alarm" slot="start"> </ion-icon>
        <ion-select
          label="Minutes:"
          v-model="newRecipe.category"
          placeholder="Select category"
        >
          <ion-select-option value="ontbijt">Ontbijt</ion-select-option>
          <ion-select-option value="lunch">Lunch</ion-select-option>
          <ion-select-option value="hoofdgerecht"
            >Hoofdgerecht</ion-select-option
          >
          <ion-select-option value="voorgerecht">Voorgerecht</ion-select-option>
          <ion-select-option value="desserts">Desserts</ion-select-option>
          <ion-select-option value="bijgerecht">Bijgerecht</ion-select-option>
          <ion-select-option value="tussendoor">Tussendoor</ion-select-option>
          <ion-select-option value="drinken">Drinken</ion-select-option>
        </ion-select>
      </ion-item>
    </fieldset>
    <fieldset>
      <legend>Beschrijving (optioneel)</legend>
      <ion-item lines="none">
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
          <span class="material-symbols-outlined">refresh</span>
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
  person,
  refresh,
  text,
} from "ionicons/icons";

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
.inputGroup,
textarea {
  background-color: var(--card-color);
  box-shadow: var(--box-shadow);
  border-radius: var(--border-radius-m);
  display: flex;
  justify-content: space-between;
  align-items: center;
  padding: 0.5rem;
  width: 100%;
  border: none;
  gap: 0.5rem;
  outline: transparent;
  resize: vertical;
}
.field {
  display: flex;
  gap: 0.5rem;
  align-items: center;
}
.material-symbols-outlined {
  color: var(--primary-color);
}
input {
  outline: transparent;
  border: none;
  border-bottom: 1px solid var(--background-color);
  text-align: end;
  width: 100%;
}
#fileInput {
  display: none;
}
label {
  width: max-content;
}
select {
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
ion-item::part(native) {
  border-radius: var(--border-radius-m);
}
</style>
