<template>
  <div class="main-column main-column--sbtwn height-100">
    <div class="main-column padding-10">
      <div class="header-grid">
        <slot name="header-grid"></slot>
      </div>

      <slot name="image"></slot>
      <slot name="title"></slot>
      <slot name="description"></slot>
    </div>

    <div class="main-column padding-0 width-100">
      <div class="width-100 padding-10">
        <slot name="other-info"></slot>
      </div>

      <div class="nav__links">
        <slot name="links"></slot>
      </div>
    </div>
  </div>
</template>

<style scoped>
.nav__links {
  width: 100%;
}
</style>
