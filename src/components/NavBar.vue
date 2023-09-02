<script setup lang="ts">
interface RouteLink {
  to: string;
  text: string;
  icon: string;
  visible?: boolean;
}
const routes = ref<RouteLink[]>([
  {
    to: "/",
    text: "Chat",
    icon: "mdi-chat",
    visible: false,
  },
  {
    to: "/blog",
    text: "Blog",
    icon: "mdi-post",
    visible: false,
  },
  {
    to: "/profile",
    text: "Profile",
    icon: "mdi-account-circle",
    visible: false,
  },
  {
    to: "/notes",
    text: "Notes",
    icon: "mdi-notebook",
    visible: false,
  },
]);

const routerVisible = ref(false);

</script>
<template>

  <div
    class="col center right-4 top-0 bottom-0 absolute animate-slide-in-right"
    v-if="routerVisible"
  >
    <p class="decoration-none text-white" v-for="route in routes">
      <RouterLink
        :to="route.to"
        class="no-underline cp hover:brightness-200"
        @mouseover="route.visible = true"
        @mouseleave="route.visible = false"
      >
        <span class="col center">
          <Icon :icon="route.icon" class="x2" />
        </span>
        <span :class="route.visible ? '' : 'opacity-0'">
          {{ route.text }}
        </span>
      </RouterLink>
    </p>
  </div>

  <Icon  icon="mdi-menu" class="text-white hover:text-success tr fixed m-4 z-50 scale cp x2"
  @click="routerVisible = !routerVisible"
  />
</template>
<style scoped lang="scss">
.router-link-active {
  @apply text-success;
}

</style>