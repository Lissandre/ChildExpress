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
    // },
    activeForm: 3,
    totalForms: 5,
    health: true,
    face: 'body',
    job: 'none',
    newJob: 'test',
    subtitle: '',
  }
}
