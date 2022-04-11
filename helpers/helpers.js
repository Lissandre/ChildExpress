import { useStore } from '@/stores'

export default class Helpers {
    constructor() {
        this.store = useStore()
    }

    updateInput(type, name, value) {
        console.log(type, name, value)
        switch (type) {
            case 'range':
                this.store.changeRange(this.store.constants[name.toUpperCase()], value)
                break;
            case 'color':
                this.store.changePicker(this.store.constants[name.toUpperCase()], value)
            default:
                break;
        }
    }
}

