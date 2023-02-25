export default defineNuxtRouteMiddleware(() => {
  if (!process.server) {
    const user = JSON.parse(localStorage.getItem("USER") || "{}")
    if (user.id) {
      return true
    } else {
      navigateTo("/login");
    }
  }
});
