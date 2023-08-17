<template>
  <ion-page>
    <ion-content>
      <img :src="imageUrl" alt="" />
      <div class="page ion-padding">
        <header>
          <ion-button
            router-link="/recipes"
            router-direction="back"
            class="ion-no-padding"
          >
            <ion-icon :icon="arrowBack" slot="icon-only"></ion-icon>
          </ion-button>
          <ion-button
            class="fav ion-no-padding"
            @click="handleFav"
            @keydown.enter="handleFav"
            v-if="!selectedRecipe.favorite"
          >
            <ion-icon :icon="heartOutline" slot="icon-only"></ion-icon>
          </ion-button>
          <ion-button
            @click="handleFav"
            @keydown.enter="handleFav"
            v-if="selectedRecipe.favorite"
            class="fav faved ion-no-padding"
          >
            <ion-icon :icon="heart" slot="icon-only"></ion-icon>
          </ion-button>
          <ion-button
            id="options-trigger"
            slot="icon-only"
            class="ion-no-padding"
          >
            <ion-icon :icon="ellipsisVertical" id="options-trigger"></ion-icon>
          </ion-button>
          <ion-popover trigger="options-trigger" trigger-action="click">
            <ion-content class="ion-padding">
              <ion-item
                @click="handleDelete"
                @keydown.enter="handleDelete"
                class="option"
                tabindex="0"
              >
                <ion-icon :icon="trashBin"></ion-icon>
                <p>Verwijderen</p>
              </ion-item>
              <ion-item
                class="option"
                @click="handleEdit"
                @keydown.enter="handleEdit"
                tabindex="0"
              >
                <ion-icon :icon="pencil"></ion-icon>
                <p>Aanpassen</p>
              </ion-item>
            </ion-content>
          </ion-popover>
        </header>
        <SingleRecipe :recipe="selectedRecipe" v-if="selectedRecipe" />
      </div>
    </ion-content>
  </ion-page>
</template>

<script setup lang="ts">
import {
  IonPage,
  IonButton,
  IonIcon,
  IonContent,
  IonItem,
  IonPopover,
  onIonViewWillEnter,
} from "@ionic/vue";
import getDocument from "@/composables/recipes/getDocument";
import setFavorite from "@/composables/recipes/setFavorite";
import SingleRecipe from "@/components/recipes/SingleRecipe.vue";

import { useSelectedRecipeStore } from "@/stores/currentRecipe";
import { ref, onMounted } from "vue";
import { useRouter } from "vue-router";
import { storeToRefs } from "pinia";

import useDeleteDocument from "@/composables/recipes/deleteDocument";
import { useRecipesStore } from "@/stores/recipes";
import {
  arrowBack,
  ellipsisVertical,
  heart,
  pencil,
  heartOutline,
  trashBin,
} from "ionicons/icons";

const { selectedRecipe } = storeToRefs(useSelectedRecipeStore());
const { fetchRecipes } = useRecipesStore();

const props = defineProps<{
  id: string;
}>();

// Store image url
const imageUrl = ref("");
const category = ref("breakfast");

onIonViewWillEnter(async () => {
  await getDocument(props.id);

  if (selectedRecipe.value.imageUrl) {
    imageUrl.value = selectedRecipe.value.imageUrl;
  } else if (!selectedRecipe.value.imageUrl) {
    // imageUrl.value = new URL(
    //   `/src/assets/categories/${selectedRecipe.value.category}.jpg`,
    //   import.meta.url
    // ).href;
    imageUrl.value = `/src/assets/categories/${selectedRecipe.value.category}.jpg`;
  }
});

const router = useRouter();
const { setFavoriteStore } = useRecipesStore();

const handleFav = async () => {
  setFavoriteStore(props.id, !selectedRecipe.value.favorite);
  selectedRecipe.value.favorite = !selectedRecipe.value.favorite;
  await setFavorite(props.id, selectedRecipe.value.favorite);
};
const handleEdit = () => {
  router.push({ name: "Edit" });
};

const handleDelete = async () => {
  console.log("deleted");
  await useDeleteDocument(selectedRecipe.value.id);
  await fetchRecipes();
  router.push({ name: "Recipes" });
};
</script>

<style lang="css" scoped>
.page {
  border-radius: var(--border-radius-l);
  background-image: linear-gradient(#ffffff90, var(--background-color) 80px);
  backdrop-filter: blur(10px);
  transform: translateY(-100px);
  min-height: 50vh;
  padding: 1.5rem;
}

img {
  height: 300px;
  object-fit: cover;
  position: relative;
  filter: brightness(80%);
}
header {
  display: flex;
}
ion-button {
  --background: transparent;
  --box-shadow: 0;
}
.fav {
  margin: 0 1.5rem 0 auto;
}
.faved {
  color: rgb(247, 63, 63);
}
</style>
