<template>
  <div class="chatbot-wrapper h-fit w-fit">

    <div class="chatbot-logo" @click="toggle"></div>
    <div class="chatbot-comments open" ref="comments" id="comments"></div>
  </div>
</template>

<script>

import gsap from 'gsap'
export default {
  name: 'Chatbot',
  nuxtI18n: {
    paths: {
      en: '/oops',
      fr: '/mince',
    },
  },
  mounted() {
    setTimeout(() => {
      this.createChatlist()
    },1000)
  },
  methods: {

    createChatlist() {

    const commentsList = document.getElementById('comments')

    const datas = this.$i18n.t('chatbot')

    var texts = JSON.parse(JSON.stringify(datas))
      // je répéte plein de fois la même chose, mais la flemme de refacto
    for (const [key, value] of Object.entries(texts)) {

      setTimeout(() => {

        if(value.text) {
          let commentDiv = document.createElement('div')
          commentDiv.classList.add('chatbot-comment')

          const comment = document.createElement('p')
          comment.classList.add('chatbot-text')
          comment.innerText = this.$i18n.t(`chatbot.${key}.text`)

          const button = document.createElement('a')
          button.classList ='chatbot-button z-[1] bg-blue px-20 py-4 flex justify-center rounded shadow cursor-pointer hover:shadow-hoverState hover:bg-white hover:text-grey transition neueBit text-2xl'
          button.innerText = this.$i18n.t(`chatbot.${key}.button`)
          button.href = this.$i18n.t(`chatbot.${key}.link`)


          commentDiv.appendChild(comment)
          commentDiv.appendChild(button)
          commentsList.appendChild(commentDiv)

        } else if(value.image) {
          let commentDiv = document.createElement('div')
          commentDiv.classList.add('chatbot-comment')

          const image = document.createElement('div')
          image.classList.add('chatbot-image')

          if(value.image.includes('aldous'))
            image.classList.add('aldous') 
          else 
            image.classList.add('gattaca') 
          commentDiv.appendChild(image)
          commentsList.appendChild(commentDiv)

        } else if(value.linked) {
          let commentDiv = document.createElement('div')
          commentDiv.classList.add('chatbot-comment')

          const link = document.createElement('a')
          link.classList.add('chatbot-text')
          link.innerText = this.$i18n.t(`chatbot.${key}.linked`)
          link.href = this.$i18n.t(`chatbot.${key}.linked`)

          commentDiv.appendChild(link)
          commentsList.appendChild(commentDiv)
          } else {
          let commentDiv = document.createElement('p')
          commentDiv.classList.add('chatbot-text')
          commentDiv.innerText = this.$i18n.t(`chatbot.${key}`)

          commentsList.appendChild(commentDiv)
        }

        commentsList.scrollTop = 2000
      }, 4000 * key)
    }
    },
    toggle() {
      const commentsList = document.getElementById('comments')
      commentsList.classList.contains('open') ? commentsList.classList.remove('open') : commentsList.classList.add('open')
    },
    getUrlImage(key) {
      return this.$i18n.t(`chatbot.${key}.image`)
    }
  }
}
</script>

<style>

.chatbot-wrapper {
  background: black;
  }
.chatbot-logo{
  position: fixed;
  right: 15px;
  bottom: 15px;
  width: 200px;
  height: 200px;
  background: no-repeat center center url('@/assets/images/chatbot.png');
  z-index: 2;
  transform: scale3d(0.75, 0.75, 0.75);
  cursor: pointer;
}

.chatbot-comments{
  position: fixed;
  right: 150px;
  bottom: 15px;
  width: fit-content;
  height: fit-content;
  word-break: break-word;
  z-index: 5;
  overflow-y: scroll;
  max-height: 100%;
  display: flex;
  flex-direction: column;
  align-items: flex-end;
  opacity: 0;
  transition: opacity ease-in 0.5s;
  border-radius: 30px;
  padding: 25px;
  background: #222;
  max-height: 80%;
}

.chatbot-comments::-webkit-scrollbar {
  -webkit-overflow-scrolling: auto;
  width: 6px;
  right: 4px;
  height: 2px;
  border-radius: 4px;
  background-color: transparent;
}

.chatbot-comments::-webkit-scrollbar-thumb {
  border-radius: 10px;
  background-color: #3D3D3B;
  -webkit-box-shadow: 0 0 1px transparent;
}

.chatbot-comments::-webkit-scrollbar-track {
  border-radius: 8px;
  -webkit-border-radius: 8px;
}

.open {
  opacity: 1;
}


.chatbot-comment {
  display: block;
  position: relative;
}

.chatbot-button {
  position: relative;
  left: 50%;
  transform: translate3d(-50%, -50%, 0);
}
.chatbot-text {
  color: white;
  font-family: 'NeueBit';
  font-size: 26px;
  padding: 30px 50px;
  box-shadow: inset 0 12px 20px rgba(255, 255, 255, 0.35), inset -6px -4.5px 6.5px rgba(255, 255, 255, 0.35);
  border-radius: 40px;
  width: fit-content;
  max-width: 400px;
  line-height: 26px;
  display: block;
  flex-direction: column;
  align-items: flex-end;
  margin-bottom: 15px;
}

.chatbot-image {
  padding: 30px 50px;
  box-shadow: inset 0 12px 20px rgba(255, 255, 255, 0.35), inset -6px -4.5px 6.5px rgba(255, 255, 255, 0.35);
  border-radius: 40px;
  width: fit-content;
  min-height: 300px;
  min-width: 200px;
  line-height: 26px;
  display: block;
  margin-bottom: 15px;
}

.aldous {
    background: no-repeat center center url('@/assets/images/aldous.png');
}
.gattaca {
    background: no-repeat center center url('@/assets/images/gattaca.png');
    width: 400px;
    background-size: contain;
}

</style>

