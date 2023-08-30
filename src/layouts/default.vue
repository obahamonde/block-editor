<template>
  <Auth>
    <Notifier />
    <main class="row center p-4 max-h-100vh">
      <RouterView />
      <QueueFeed/>
      <NavBar />
    </main>
  </Auth>
</template>
