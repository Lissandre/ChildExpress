export const state = () => {
  return {
    ranges: [
      { id: 'noseSize', value: 0 },
      { id: 'earsSize', value: 0 },
      { id: 'handsSize', value: 0 },
      { id: 'overallSize', value: 0 },
    ],
    constants: {
      NOSESIZE: 'noseSize',
      EARSSIZE: 'earsSize',
      HANDSSIZE: 'handsSize',
      OVERALLSIZE: 'overallSize',
    },
    activeForm: 1,
    totalForms: 2,
    health: true,
    face: true,
  }
}