<script setup lang="ts">
interface RouteLink {
  to: string;
  text: string;
  icon: string;
}
const routes = ref<RouteLink[]>([
  {
    to: "/",
    text: "Chat",
    icon: "mdi-chat",
  },
  {
    to: "/blog",
    text: "Blog",
    icon: "mdi-post",
  },
  {
    to: "/profile",
    text: "Profile",
    icon: "mdi-account-circle",
  },
  {
    to: "/notes",
    text: "Notes",
    icon: "mdi-notebook",
  },
]);
</script>
<template>
  <ul class="row right-0 absolute nav-bar m-6 w-80 gap-4 text-xs px-8 py-4">
    <li class="" v-for="route in routes">
      <RouterLink :to="route.to">
        <span class="col center">
          <Icon :icon="route.icon" class="x2" />
        </span>
        <span class="">
          {{ route.text }}
        </span>
      </RouterLink>
    </li>
  </ul>
</template>
