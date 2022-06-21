import generatedValues from './generated'
import { userState } from './userState'

export const state = () => {
  return {
    userState,
    ...generatedValues,
    activeForm: 1,
    totalForms: 5,
    health: true,
    face: 'body',
    babyName: 'Margauxxx', // to remove
    job: 'none',
    IQ: 122,
    newJob: 'test',
    subtitle: '',
    currentMoney: '',
    overallSize: 4,
  }
}
