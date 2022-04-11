import App from '@/scene';

export default ({ app }, inject) => {
  const Scene = new App()
  inject('scene', Scene)
}