<template>
  <div>
    <Navbar/>
    <main>
      <slot />
    </main>
  </div>
</template>
<script>
export default defineComponent({
    setup() {
      
// const route = useRoute();
// const inlogin = computed(() => route.path.includes("login"));
// return { inlogin }
    },
    created() {}
});
</script>

