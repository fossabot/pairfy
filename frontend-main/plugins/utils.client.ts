import { truncateByWords } from '~/utils/utils'


export default defineNuxtPlugin(() => {
  return {
    provide: {
      truncateByWords
    }
  }
})