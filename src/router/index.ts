import { createRouter, createWebHistory } from "@ionic/vue-router";
import { RouteRecordRaw } from "vue-router";
import TabsView from "../views/TabsView.vue";
import LoginPage from "../views/auth/LoginPage.vue";

// Route guard
import { auth } from "@/firebase/config";

const requireAuth = (to: any, from: any, next: Function) => {
  let user = auth.currentUser;
  if (!user) {
    next({ name: "Login" });
  } else {
    next();
  }
};

const routes: Array<RouteRecordRaw> = [
  {
    path: "/",
    redirect: "/recipes",
    component: TabsView,
    beforeEnter: requireAuth,
    children: [
      {
        path: "recipes",
        name: "Recipes",
        component: () => import("@/views/recipes/RecipesPage.vue"),
      },
      {
        path: "/recipes/:id",
        name: "Recipe",
        component: () => import("@/views/recipes/RecipePage.vue"),
        props: true,
      },
      {
        path: "recipes/:id/edit",
        name: "Edit",
        component: () => import("@/views/recipes/EditRecipePage.vue"),
      },
      {
        path: "account",
        name: "Account",
        component: () => import("@/views/AccountPage.vue"),
      },
      {
        path: "new",
        name: "NewRecipe",
        component: () => import("@/views/recipes/NewRecipePage.vue"),
      },
      {
        path: "favorites",
        name: "Favorites",
        component: () => import("@/views/recipes/FavoritesPage.vue"),
      },
    ],
  },
  {
    path: "/login",
    name: "Login",
    component: LoginPage,
  },
  {
    path: "/signup",
    name: "Signup",
    component: () => import("@/views/auth/SignupPage.vue"),
  },
];

const router = createRouter({
  history: createWebHistory(import.meta.env.BASE_URL),
  routes,
});

export default router;
