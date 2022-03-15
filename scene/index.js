// IMPORT TOOLS
import Sizes from './Tools/Sizes'
import Time from './Tools/Time'

// IMPORT APP
import App from './App'

// SET TOOLS
const time = new Time()
const sizes = new Sizes()

// SET APP
const Scene = new App({
  canvas: document.querySelector('#_canvas'),
  time: time,
  sizes: sizes,
})

export default Scene