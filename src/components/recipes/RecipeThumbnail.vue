<template>
  <ion-card
    :router-link="{
      name: 'Recipe',
      params: { id: recipe.id },
    }"
    class="recipeThumb box"
  >
    <img :src="imageUrl" :alt="recipe.title" />
    <div class="text">
      <h3>
        {{ recipe.title.charAt(0).toUpperCase() }}{{ recipe.title.slice(1) }}
      </h3>
      <p class="description">
        {{ recipe.description?.charAt(0).toUpperCase()
        }}{{ recipe.description?.slice(1) }}
      </p>
      <div class="details">
        <div class="time">
          <ion-icon :icon="timeOutline"></ion-icon>

          <p>{{ recipe.time }} min</p>
        </div>
        <div class="time">
          <ion-icon :icon="personOutline"></ion-icon>
          <p>{{ recipe.people }} personen</p>
        </div>
      </div>
    </div>
  </ion-card>
</template>

<script setup lang="ts">
import { IonCard, IonIcon } from "@ionic/vue";
import type { Recipe } from "@/types/Recipe";
import { ref, onMounted } from "vue";
import { timeOutline, personOutline } from "ionicons/icons";

const props = defineProps<{
  recipe: Recipe;
}>();

const imageUrl = ref("");

onMounted(async () => {
  if (props.recipe.imageUrl) {
    imageUrl.value = props.recipe.imageUrl;
  } else {
    const image = await import(
      `../../assets/categories/${props.recipe.category}.jpg`
    );
    imageUrl.value = image.default;
  }
});
</script>

<style lang="css" scoped>
.recipeThumb {
  padding: 0;
  overflow: hidden;
  display: grid;
  grid-template-columns: 1.5fr 3fr;
  min-height: 100px;
  margin-bottom: 1rem;
}
.text {
  padding: 0.7rem;
  max-width: 300px;
  display: flex;
  flex-direction: column;
  justify-content: space-between;
  gap: 0.5rem;
}
h3 {
  font-size: 16px;
  -webkit-line-clamp: 2;
  /* autoprefixer: off */
  -webkit-box-orient: vertical;
  /* autoprefixer: on */
  overflow: hidden;
  text-overflow: ellipsis;
  display: -webkit-box;
  margin: 0;
}
p {
  color: var(--font-color);
}
.description {
  -webkit-line-clamp: 1;
  /* autoprefixer: off */
  -webkit-box-orient: vertical;
  /* autoprefixer: on */
  overflow: hidden;
  text-overflow: ellipsis;
  display: -webkit-box;
  font-size: 12px;
  color: var(--font-color);
}
.time {
  display: flex;
  align-items: center;
  font-size: 12px;
  gap: 0.2rem;
  align-items: center;
}
.time .material-symbols-outlined {
  font-size: 18px;
  color: var(--primary-color);
}
img {
  object-fit: cover;
  object-position: center center;
  height: 100%;
}
a {
  color: inherit;
}
.details {
  display: flex;
  gap: 0.5rem;
}
ion-icon {
  color: var(--primary-color);
}
</style>
