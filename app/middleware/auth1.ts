export default defineNuxtRouteMiddleware((to) => {
   if (import.meta.server)return

   const user = localStorage.getItem('google_user')
   const isloggedIn =!!user

   if (to.path === 'login' && isloggedIn) {
    return navigateTo('/')
   }

   if (to.path === 'login' && !isloggedIn) {
    return navigateTo('/login')
   }
})