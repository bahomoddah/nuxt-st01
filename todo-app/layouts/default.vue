<template>
  <div>
    <Navbar/>
    <main>
      <slot />
    </main>
  </div>
</template>

<script setup>
import Navbar from "~/components/Navbar"
</script>
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

