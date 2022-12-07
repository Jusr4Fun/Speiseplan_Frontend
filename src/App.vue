<template>
  <router-view />
</template>

<script>
export default {};
</script>

<style>
.container {
  background-color: #b0bec5;
}
.card {
  background-color: #b0bec5;
}
.container.fill-height {
  flex-direction: column !important;
  align-items: unset !important;
}

.theme--dark.v-application {
  background-color: var(--v-background-base, #121212) !important;
}
.theme--light.v-application {
  background-color: var(--v-background-base, white) !important;
}
</style>
