<template>
  <ion-page>
    <ion-content>
      <img :src="imageUrl" alt="" />
      <div class="main-content ion-padding">
        <header>
          <ion-button @click="router.go(-1)">
            <ion-icon :icon="arrowBack" slot="icon-only"></ion-icon>
          </ion-button>

          <div class="hero">
            <ion-icon :icon="restaurant" size="large"></ion-icon>
            <h1>
              {{ category.charAt(0).toUpperCase() }}{{ category.slice(1) }}
            </h1>
          </div>
        </header>
        <!-- <div class="tagsSection">
          <div class="tagsHeader">
            <p>Filter by tags</p>
            <span class="material-symbols-outlined">filter_list</span>
          </div>
          <div class="tags">
            <div class="tag">
              <p>Zoet</p>
            </div>
          </div>
        </div> -->

        <RecipeList
          :recipes="categoryRecipes(category)"
          v-if="categoryRecipes"
        />
      </div>
    </ion-content>
  </ion-page>
</template>

<script setup lang="ts">
import {
  IonPage,
  IonContent,
  IonButton,
  IonNavLink,
  IonIcon,
  IonBackButton,
} from "@ionic/vue";
import { arrowBack, restaurant } from "ionicons/icons";
import RecipeList from "@/components/recipes/RecipeList.vue";
import { useRouter } from "vue-router";
import { ref } from "vue";
import { useRecipesStore } from "@/stores/recipes";

const props = defineProps<{
  category: string;
}>();

const { categoryRecipes } = useRecipesStore();

const imageUrl = ref<string>(
  new URL(`/src/assets/categories/${props.category}.jpg`, import.meta.url).href
);

const router = useRouter();
</script>

<style lang="css" scoped>
.main-content {
  border-radius: var(--border-radius-l);
  background-image: linear-gradient(#ffffff90, var(--background-color) 80px);
  backdrop-filter: blur(10px);
  transform: translateY(-100px);
}
header {
  padding-bottom: 2rem;
}
.hero {
  text-align: center;
}
h1 {
  font-weight: 900;
}
.hero span {
  color: var(--primary-color);
  font-size: 30px;
}
ion-button {
  --background: transparent;
  padding: 0.5rem;
  --box-shadow: 0;
}
.tag {
  border: 1px solid var(--secondary-color);
  width: fit-content;
  padding: 0.2rem 0.5rem;
  border-radius: 25px;
}
.tagsSection {
  border-bottom: 1px solid #d9d9d9;
  padding: 1rem 0;
  margin-top: 2rem;
}
.tagsHeader {
  display: flex;
  justify-content: space-between;
  font-size: 14px;
  font-weight: 500;
}
img {
  height: 300px;
  object-fit: cover;
  filter: brightness(80%);
}
</style>
