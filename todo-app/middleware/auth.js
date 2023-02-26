export default defineNuxtRouteMiddleware(() => {
    const user = JSON.parse(localStorage.getItem("USER") || "{}")
    if (user.id) {
      return true
    } else {
      navigateTo("/login");
      // return false
    }
});
