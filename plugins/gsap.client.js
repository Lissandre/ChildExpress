import gsap from 'gsap'
import { ScrollTrigger } from 'gsap/dist/ScrollTrigger'

export default ({ app }, inject) => {
  gsap.registerPlugin(ScrollTrigger)
  ScrollTrigger.config({
    limitCallbacks: true,
    // syncInterval: 10,
  })

  inject('gsap', gsap)
  inject('ScrollTrigger', ScrollTrigger)
}
