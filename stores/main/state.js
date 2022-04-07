export const state = () => {
  return {
    ranges: [
      { id: 'scale', value: 2 },
      { id: 'position', value: 5 },
      { id: 'rotation', value: 2 },
      { id: 'noseSize', value: 0 },
    ],
    constants: {
      POSITION: 'position',
      SCALE: 'scale',
      ROTATION: 'rotation',

      NOSESIZE: 'noseSize',
      EARSIZE: 'earsSize',
      HANDSIZE: 'handsSize',
      OVERALLSIZE: 'overallSize',
    },
    activeForm: 1,
    totalForms: 2,
    health: true,
    face: true,
  }
}