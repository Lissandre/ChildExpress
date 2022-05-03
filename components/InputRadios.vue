<template>
  <div
    class="pb-4 text-gray-500 pointer-events-auto relative left-1/3 mt-[100px] test"
  >
    <fieldset
      :id="input.name"
      :class="`flex justify-around items-center ${input.class}`"
      @click="(e) => emitJob(e, fieldsetIndex)"
      :key="fieldsetIndex"
    >
      <p class="w-20">{{ locale.label1 }}</p>
      <input
        :type="input.type"
        :id="input.name"
        :length="input.length"
        :name="input.name"
        @input="(e) => update(e)"
        :value="(index - 1) / (input.length - 1)"
        v-for="index in input.length"
        :key="index"
        required="required"
        class="w-10 z-[1] cursor-pointer"
      />
      <span class="checkmark"></span>
      <p class="w-20">{{ locale.label2 }}</p>
    </fieldset>
  </div>
</template>

<script>
export default {
  name: 'InputRadio',
  props: ['input', 'locale', 'fieldsetIndex'],

  data() {
    return {}
  },
  mounted() {
    // console.log('')
  },
  methods: {
    update(e) {
      // console.log(this.input.name)
      this.$emit(
        'updateInput',
        this.input.type,
        this.input.name,
        e.target.value
      )
    },
    emitJob(e, fieldsetIndex) {
      if (e.target.value === undefined) return
      const value = Math.round(e.target.value)
      this.$emit('updateJob', value, fieldsetIndex)
    },
  },
}
</script>

<style scoped>
 p{
   width: max-content;
 }
/* Customize the label (the container)
.container {
  display: block;
  position: relative;
  padding-left: 35px;
  margin-bottom: 12px;
  cursor: pointer;
  font-size: 22px;
  -webkit-user-select: none;
  -moz-user-select: none;
  -ms-user-select: none;
  user-select: none;
}

input {
  position: absolute;
  opacity: 0;
  cursor: pointer;
  height: 20px;
  width: 20px;
}

.checkmark {
  position: absolute;
  /*top: 0;
  left: 0;*/
  /*
  height: 25px;
  width: 25px;
  background-color: #eee;
  border-radius: 50%;
}

:hover input ~ .checkmark {
  background-color: #ccc;
}

input:checked ~ .checkmark {
  background-color: #2196f3;
}

.checkmark:after {
  content: '';
  position: absolute;
  display: none;
}

input:checked ~ .checkmark:after {
  display: block;
}

.checkmark:after {
  top: 9px;
  left: 9px;
  width: 8px;
  height: 8px;
  border-radius: 50%;
  background: white;
} */
</style>