<template>
  <ion-card
    :router-link="{
      name: 'Recipe',
      params: { id: recipe.id },
    }"
    class="recipeThumb"
  >
    <img :src="imageUrl" :alt="recipe.title" />
    <div class="text">
      <div class="time">
        <ion-icon :icon="timeOutline"></ion-icon>

        <p>{{ recipe.time }} MIN</p>
      </div>
      <p class="category">
        {{ recipe.category.charAt(0).toUpperCase()
        }}{{ recipe.category.slice(1) }}
      </p>
      <h2>
        {{ recipe.title.charAt(0).toUpperCase() }}{{ recipe.title.slice(1) }}
      </h2>
      <!-- <p class="description" v-if="recipe.description">
        {{ recipe.description?.charAt(0).toUpperCase()
        }}{{ recipe.description?.slice(1) }}
      </p> -->
    </div>
    <div class="favorite-indicator" v-if="recipe.favorite">
      <ion-icon :icon="heart" class="favorite"></ion-icon>
    </div>
  </ion-card>
</template>

<script setup lang="ts">
import { IonCard, IonIcon } from "@ionic/vue";
import type { Recipe } from "@/types/Recipe";
import { ref, onMounted } from "vue";
import { timeOutline, personOutline, heart } from "ionicons/icons";

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
  margin-bottom: 1rem;
  aspect-ratio: 9 / 5;
  position: relative;
  box-shadow: none;
  border-radius: var(--border-radius-m);
}
.text {
  padding: 1rem;
  /* max-width: 300px; */
  display: flex;
  flex-direction: column;
  justify-content: end;
  /* gap: 0.5rem; */
}
h2 {
  font-size: 24px;
  -webkit-line-clamp: 2;
  /* autoprefixer: off */
  -webkit-box-orient: vertical;
  /* autoprefixer: on */
  overflow: hidden;
  text-overflow: ellipsis;
  display: -webkit-box;
  margin: 0;
}
.category {
  color: var(--secondary-color);
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
  color: var(--font-light);
  /* color: #e5e5e5; */
  margin-top: 0.5rem;
}
.time {
  display: flex;
  align-items: center;
  font-size: 10px;
  gap: 0.2rem;
  align-items: center;
  background-color: var(--overlay-color);
  width: fit-content;
  border-radius: 12px;
  padding: 0.2rem 0.4rem;
  margin-bottom: auto;
  color: var(--font-light);
}
img {
  object-fit: cover;
  object-position: top center;
  position: absolute;
  z-index: -1;
}
.text::after {
  content: "";
  inset: 0 0 0 0;
  height: 100%;
  width: 100%;
  background-image: linear-gradient(#00000010, #00000099 70%);
  position: fixed;
  z-index: -1;
}
a {
  /* color: inherit; */
}
ion-icon {
  font-size: 12px;
}

.favorite-indicator {
  background-color: var(--overlay-color);
  position: absolute;
  top: 0;
  right: 1.5rem;
  height: 45px;
  width: 23px;
  display: flex;
  clip-path: polygon(100% 0, 100% 100%, 50% 70%, 0 100%, 0 0);
}
.favorite {
  font-size: 16px;
  margin: 0.5rem auto;
  color: #db1f35;
}
</style>
