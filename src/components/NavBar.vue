<script setup></script>

<template>
  <header class="nav">
    <div class="logo">
      <div class="logo__image">
        <img src="../assets/images/flat-map-compass-background.png " alt="Compass Logo" />
      </div>
      <h1 class="heading">ParkPlanners</h1>
    </div>
    <slot></slot>
  </header>
</template>

<style scoped>
header {
  margin: 10px auto;
  width: 80%;
}

.logo {
  display: flex;
  align-items: center;
}
.logo__image {
  width: 80px;
}
</style>
