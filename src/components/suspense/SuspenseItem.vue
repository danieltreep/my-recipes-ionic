<template>
  <div class="recipeThumb box">
    <div class="fill"></div>
    <div class="text">
      <div class="fill"></div>
      <div class="fill"></div>
      <div class="fill"></div>
    </div>
  </div>
</template>

<script setup lang="ts"></script>

<style lang="css" scoped>
.recipeThumb {
  padding: 0;
  overflow: hidden;
  display: grid;
  grid-template-columns: 1.5fr 3fr;
  max-height: 110px;
  min-height: 100px;
  margin-bottom: 1rem;
  box-shadow: var(--element-box-shadow);
}
.text {
  padding: 1rem;
  display: flex;
  flex-direction: column;
  justify-content: space-between;

  .fill:first-of-type {
    height: 20px;
  }
}
.fill {
  background-color: #f0f0f0;
  width: 100%;
  min-height: 10px;
}
</style>
