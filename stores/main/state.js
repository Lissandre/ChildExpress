import generatedValues from './generated'

export const state = () => {
  return {
    ...generatedValues,
    // ranges: [
    //   { id: 'scale', value: 2 },
    //   { id: 'position', value: 5 },
    //   { id: 'rotation', value: 2 },
    //   // << BEGIN RANGES >>

    //   // << END RANGES >>
    // ],
    // constants: {
    //   POSITION: 'position',
    //   SCALE: 'scale',
    //   ROTATION: 'rotation',
    //   // << BEGIN CONSTANTS >>

    //   // << END CONSTANTS >>
    // },5
    activeForm: 4,
    totalForms: 5,
    health: true,
    face: 'body',
    babyName: 'Margauxxx', // to remove
    job: 'none',
    newJob: 'test',
    subtitle: '',
  }
}
