<template>
  <div class="h-screen w-screen flex justify-center items-center flex-col">
    <div v-for="(item, index) in response" :key="index" class="w-1/6 m-2">
      <h2 class="font-bold">{{ item.properties.Name.title[0].plain_text }}</h2>
      <span>Hands: {{ item.properties.Hands.number }}</span>
      <span>Eyes: {{ item.properties.Eyes.number }}</span>
    </div>
  </div>
</template>

<script>
export default {
  async asyncData({$notion}) {
    const dbId = process.env.dbId
    const response = await $notion.databases
      .query({ database_id: dbId })
      .then((res) => {return res.results})
    return { response }
  },
  mounted() {
    // console.log(this.response);
  }
}
</script>