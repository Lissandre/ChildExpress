import Helpers from '@/helpers/helpers';

export default ({ app }, inject) => {
  const helpers = new Helpers()
  inject('helpers', helpers)
}