<script setup lang="ts">
const route = useRoute();
const query = route.query;
const router = useRouter();

watch(query, () => {
  if (query.namespace) {
    router.push(`/blog/${query.namespace}`);
  }
});


</script>
<template>
<section class="col center mx-12">
<img src="/logo.png" class="h-24 m-4 sh rf cp scale hover:brightness-200"/>
<h1 class="font-script text-4xl">AioFauna</h1>
<h2 class="font-mono text-lg">An Opinionated Backend Framework that Scales</h2>
<footer class="row center">
  <a href="https://github.com/obahamonde/aiofauna" target="_blank"
    title="GitHub Repository"
  >
    <Icon icon="logos:github-icon" class="x3 m-2 scale invert"/>
  </a>
  <a href="https://pypi.org/project/aiofauna/" target="_blank"
    title="PyPI Package"
    >
    <Icon icon="logos:pypi" class="x3 m-2 scale invert"/>
  </a>
  <a href="https://docs.aiofauna.com" class="m-2 scale invert" 
    title="Documentation">
    <Icon icon="mdi-document" class="x3"/>
  </a>
  <RouterLink to="/chat" class="m-2 scale invert"
    title="Demo Chat">
    <Icon icon="mdi-chat" class="x3"/>
  </RouterLink>
  </footer>
</section>
</template>

<style scoped>
@keyframes glowing {
  0% {
    text-shadow: 0 0 5px #00ffff, 0 0 10px #00ffff, 0 0 15px #fff, 0 0 20px #fff, 0 0 25px #008080, 0 0 30px #008080, 0 0 35px #008080;
  }
  100% {
    text-shadow: 0 0 10px #fff, 0 0 20px #008080, 0 0 30px #00ffff, 0 0 40px #008080, 0 0 50px #008080, 0 0 60px #008080, 0 0 70px #008080;
  }
}

h1 {
  background: linear-gradient(45deg, #fff, #00ffff, #008080);
  -webkit-background-clip: text;
  color: transparent;
  animation: glowing 1s infinite alternate;
}

footer {
  padding: 1rem;
  border-radius: 8px;
}

a {
  transition: transform 0.3s ease;
}

a:hover {
  transform: scale(1.1);
}
</style>
<route lang="yaml">
meta:
  layout: home
</route>
