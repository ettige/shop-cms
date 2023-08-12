export { default } from 'next-auth/middleware'

//protected path user will be able to access them when they singed in.
export const config={matcher:[
    '/account',
]}