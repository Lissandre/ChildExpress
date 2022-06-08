<template>
  <div class="pointer-events-auto">
    <fieldset :class="`${input.class} animate-bounce-in`">
      <label class="text-white">{{ locale.label1 }}</label>
      <div class="mr-5 custom-select-wrapper" ref="wrapper">
        <select
          :type="input.type"
          :id="input.name"
          :name="input.name"
          :min="input.from"
          :max="input.to"
          :step="input.step"
          @input="(e) => update(e)"
          :value="input.value"
          ref="select"
        ></select>
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
    return {
      select: {},
    }
  },
  mounted() {
    this.select = this.$refs['wrapper']
    let slct = this.$refs['select']
    // this.select.classList.add('custom-select-wrapper')

    for (let i = 50; i < 200; i++) {
      const option = document.createElement('option')
      option.value = `${i}`
      option.text = `${i}`
      slct.add(option)
    }

    window.addEventListener('click', function (e) {
      const select = document.querySelectorAll('.custom-select-wrapper')
      if (select) {
        select.forEach((el) => {
          el.classList.remove('open')
        })
      }
    })
    this.select.input = this.select.querySelector('select')
    this.setOptions(this.select)
    this.eventClickSelect = () => {
      if (!this.select.classList.contains('open')) {
        requestAnimationFrame(() => {
          this.select.classList.toggle('open')
        })
      }
    }
    this.select.addEventListener('click', this.eventClickSelect)

    this.select
      .querySelector('.custom-options')
      .childNodes[0].classList.add('selected')

    this.select.querySelectorAll('.custom-options li').forEach((option) => {
      option.addEventListener('click', (e) => {
        var entry = ''
        if (e.srcElement.tagName === 'SPAN') {
          entry = e.srcElement.parentElement
        } else {
          entry = e.srcElement
        }

        setTimeout(() => {
          this.select.classList.remove('open')
        }, 100)

        // console.log('ENTRY : ', entry, entry.classList, entry && !entry.classList.contains('selected'))
        if (entry && !entry.classList.contains('selected')) {
          Array.from(this.select.getElementsByClassName('selected')).forEach(
            (item) => {
              item.classList.remove('selected')
            }
          )
          entry.classList.add('selected')
          this.select.querySelector('.custom-select__trigger ').textContent =
            entry.textContent
          // el.querySelector('.custom-select__trigger ').dataset.value = entry.dataset.value
          this.select.input.value = entry.dataset.value
          this.select.input.dispatchEvent(
            new CustomEvent('navigation', { detail: this.select.input.value })
          )
          this.select.input.dispatchEvent(
            new CustomEvent('change', {
              bubbles: true,
              detail: this.select.input.value,
            })
          )

          if (entry.dataset.value !== '') {
            if (
              !this.select
                .querySelector('.custom-select__trigger')
                .classList.contains('bold')
            ) {
              this.select
                .querySelector('.custom-select__trigger')
                .classList.add('bold')
            }
          } else {
            this.select
              .querySelector('.custom-select__trigger')
              .classList.remove('bold')
          }
        }
        console.log(entry.dataset.value)
        this.soundEvents(entry.dataset.value)
      })
    })

    if (this.select.input.value) {
      const trigger = this.select.querySelector('.custom-select__trigger')
      trigger.classList.add('bold')
      trigger.innerHTML = this.select.input.value + ' ans'
    }
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

    soundEvents(value) {
      $nuxt.$emit(
        'updateSound',
        'form1',
        this.input.type,
        this.input.name,
        value
      )
    },
    setOptions(el) {
      let input = this.$refs['select']
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
            let text = document.createTextNode(
              elm.innerHTML.replace('&amp;', '&')
            )
            span.appendChild(text)
            span.dataset.value = elm.value
            span.innerText = elm.value + ' ans'
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
          let text = document.createTextNode(
            elm.innerHTML.replace('&amp;', '&')
          )
          span.appendChild(text)
          span.dataset.value = elm.value
          span.innerText = elm.value + ' ans'
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
        text =
          document.createTextNode(
            el.input.querySelector('option[selected]').textContent
          ) + ' ans'
      }
      // console.log(text)

      value.appendChild(text)
      value.dataset.value = options[0].value
      el.appendChild(value)
      el.appendChild(list)
    },
  },
}
</script>


<style>
.custom-select-wrapper {
  position: relative;
  background-color: transparent;
}

.custom-select-wrapper select {
  position: absolute;
  display: none;
}

.custom-select-wrapper.open select {
  z-index: 1000;
  border: 0;
}

.custom-select-wrapper.open .custom-option {
  opacity: 1;
  visibility: visible;
  transform: translate3d(0, 0, 0);
  pointer-events: all;
  line-height: auto;
  background-color: transparent;
}

.custom-select-wrapper.open .custom-options {
  opacity: 1;
  pointer-events: auto;
  border: none;
  border-top: 0;
  margin-top: -3px;
}

.custom-select-wrapper.open .custom-options li {
  background-color: white;
}
.custom-select-wrapper.open .custom-options li span {
  position: relative;
}

.custom-select__trigger {
  border: none;
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
  font-size: 16px;
  color: white;
  line-height: 60px;
  cursor: pointer;
  border-color: white;
  transform: translate3D(0px, 0, 0);
  transition: all 0.2s ease;
  padding-left: 20px;
  line-height: 47px;
  padding-right: 40px;
  margin: 0 auto;
  min-height: 40px;
  border-bottom: 2px solid white;
}
.custom-select__trigger:after {
  content: '>';
  font-size: 18px;
  display: block;
  position: absolute;
  right: 20px;
  top: 50%;
  transform-origin: 50% 50%;
  transform: translateY(-50%) rotate(90deg);
  transition: transform 0.3s ease;
}

.custom-options {
  position: relative;
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
  width: 100%;
}

.custom-option {
  position: relative;
  display: block;
  padding: 0;
  opacity: 0;
  font-size: 14px;
  padding: 10px;
  cursor: pointer;
  text-align: center;
}
.custom-option.selected {
  display: block;
}

.custom-option:last-child {
  border-bottom: none;
}

.custom-options::-webkit-scrollbar {
  -webkit-overflow-scrolling: auto;
  width: 1px;
  height: 2px;
  background-color: rgba(0, 0, 0, 0.1);
}

.custom-options::-webkit-scrollbar-thumb {
  border-radius: 4px;
  background-color: rgba(0, 0, 0, 1);
  -webkit-box-shadow: 0 0 1px rgba(255, 255, 255, 1);
}

.custom-options::-webkit-scrollbar-track {
  -webkit-box-shadow: inset 0 0 6px rgba(0, 0, 0, 0.4);
  border-radius: 8px;
  -webkit-border-radius: 8px;
}

label {
  font-size: 14px;
}
</style>


