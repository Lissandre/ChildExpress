export const state = () => {
  return {
    ranges: [
      { id: 'scale', value: 2 },
      { id: 'position', value: 5 },
      { id: 'rotation', value: 2 },
    ],
    constants: {
      POSITION: 'position',
      SCALE: 'scale',
      ROTATION: 'rotation',
    },
    activeForm: 1,
    totalForms: 2,
    isHealthy: true,
    isFace: true,
  }
}
