<template>
  <div class="bottom-1/2 pb-4 text-gray-500 left-1/3 pointer-events-auto">
    <fieldset :class="`${input.class} animate-bounce-in`">
      <label class="text-white">{{ locale.label1 }}</label>
      <div class="mr-5">
        <input
          :type="input.type"
          :id="input.name"
          :name="input.name"
          :min="input.from"
          :max="input.to"
          :step="input.step"
          @input="(e) => update(e)"
          :value="input.value"
        />
        <span></span>
      </div>
    </fieldset>
  </div>
</template>

<script>
export default {
  name: 'InputSelect',
  props: ['input', 'locale'],

  data() {
    return {}
  },
  mounted() {
  },
  methods: {
    update(e) {
      this.$emit(
        'updateInput',
        this.input.type,
        this.input.name,
        e.target.value
      )
    },

    setOptions (el) {
    let input = el.querySelector('select')
    let options = Array.from(input.options)
    let list = document.createElement('ul')
    list.classList.add('custom-options')

    // console.log(el)
    options.map((elm, i) => {
      if (el.input.classList.contains('b__nav-dropdown')) {
        if (!elm.selected) {
          let li = document.createElement('li')
          let span = document.createElement('span')
          li.appendChild(span)
          let text = document.createTextNode(elm.innerHTML.replace('&amp;', '&'))
          span.appendChild(text)
          span.dataset.value = elm.value
          li.dataset.value = elm.value
          li.classList.add('custom-option')
          li.classList.add('links__more')
          // li.style.transitionDelay = i * 0.05 + 's'
          list.appendChild(li)
        }
      } else {
        let li = document.createElement('li')
        let span = document.createElement('span')
        li.appendChild(span)
        let text = document.createTextNode(elm.innerHTML.replace('&amp;', '&'))
        span.appendChild(text)
        span.dataset.value = elm.value
        li.dataset.value = elm.value
        li.classList.add('custom-option')
        li.classList.add('links__more')
        // li.style.transitionDelay = i * 0.05 + 's'
        list.appendChild(li)
      }
    })

    let value = document.createElement('div')
    value.classList.add('custom-select__trigger')

    //  let text = (isNaN(parseInt(el.input.value))) ? document.createTextNode(el.input.value) : document.createTextNode(options[0].innerHTML)

    let text = document.createTextNode(options[0].innerHTML)

    if (el.input.querySelector('option[selected]')) {
      text = document.createTextNode(el.input.querySelector('option[selected]').textContent)
    }
    // console.log(text)

    value.appendChild(text)
    value.dataset.value = options[0].value
    el.appendChild(value)
    el.appendChild(list)
  }  
  },
}

</script>


<style scoped>

.custom-select-wrapper {
  position: relative;
  background-color: transparent;

}

  .custom-select-wrapper select {
    position: absolute;
    display: none;
  }

  .custom-select-wrapper select.open {
    z-index: 1000;
    border: 0;
  }

    .custom-select-wrapper select.open .custom-option {
      opacity: 1;
      visibility: visible;
      transform: translate3d(0, 0, 0);
      pointer-events: all;
      line-height: auto;
      background-color: transparent;
    }

    .custom-select-wrapper select.open .custom-options {
      opacity: 1;
      pointer-events: auto;
      border: 1px solid black;
      border-top: 0;
      margin-top: -3px;
    }

      .custom-select-wrapper select.open .custom-options li {
        background-color: @white;
      }
        .custom-select-wrapper select.open .custom-options li span {
          position: relative;
        }

    .custom-select__trigger {
      border: 1px solid black;

    }
      .custom-select__trigger::before {
        transform: translate3D(-10px, 0, 0);
      }

      .custom-select__trigger:after {
        transform: translateY(-50%) rotate(180deg);
      }

  .custom-select__trigger {
    white-space: pre;
    overflow: hidden;
    text-overflow: ellipsis;
    position: relative;
    display: block;
    font-size: 14 / @px;
    color: @black;

    line-height: 60px;
    cursor: pointer;
    border-color: @black;
    transform: translate3D(0px, 0, 0);
    transition: all 0.2s ease;
    padding-left: 20px;
    line-height: 47px;
    padding-right: 40px;
    margin: 0 auto;
    min-height: 40px;
    border: 1px solid black;

  }
    .custom-select__trigger:after {
      content: "\e91d";
      font-family: "icomoon";
      font-size: 8px;
      display: block;
      position: absolute;
      right: 20px;
      top: 50%;
      transform-origin: 50% 50%;
      transform: translateY(-50%) rotate(0deg);
      transition: transform 0.3s @custom-ease;
    
  }

  .custom-options {
    position: absolute;
    display: inline-block;
    top: 100%;
    left: 0;
    right: 0;
    transition: opacity 0.1s ease-out;
    opacity: 0;
    pointer-events: none;
    background-color: transparent;
    border-top: none;
    z-index: 1000;
    margin: 0 auto;
    max-height: 290px;
    overflow: scroll;
  }

  .custom-option {
    position: relative;
    display: block;
    padding: 0;
    opacity: 0;
    font-size: 14px;
    padding: 10px;
    cursor: pointer;
    padding-left: 20px;

  }
    .custom-option.selected{
      display: none;
    }

    .custom-option:last-child {
      border-bottom: none;
  }

</style>


