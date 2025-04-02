<script setup></script>

<template>
  <div class="container">
    <header class="nav">
      <div class="logo">
        <div class="logo__image">
          <img src="../assets/images/flat-map-compass-background.png " alt="Compass Logo" />
        </div>
        <h1 class="heading">ParkPlanners</h1>
      </div>
      <slot></slot>
    </header>
  </div>
</template>

<style scoped>
.logo {
  display: flex;
  align-items: center;
}
.logo__image {
  width: 80px;
}
</style>
