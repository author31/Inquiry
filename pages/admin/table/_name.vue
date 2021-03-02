<template>
  <client-only>
    <div class="grid md:grid-cols-5 mt-20 sm:grid-cols-12">
      <h1 class="md:col-start-2 mx-2 font-bold">{{name}}</h1>
      <table class="mx-2 md:col-span-3 md:col-start-2 sm:col-start-4">
        <tr>
            <th class="border-2 border-black">名字</th>
            <th class="border-2 border-black">學號</th>
            <th class="border-2 border-black" v-for="t in tableInfo.columnsNames" :key="t.id">{{t}}</th>
        </tr>
        <tr v-for="rec in records" :key="rec.id" >
            <td class="border-2 border-black">{{rec.stdName}}</td>
            <td class="border-2 border-black">{{rec.stdId}}</td>
            <td class="border-2 border-black" v-for="fil in filter(rec)" :key="fil">{{rec[fil]}}</td>
        </tr>
      </table>
    </div>
  </client-only>
</template>

<script>
export default {
    async asyncData({ params, $axios, store }) {
        const tableInfo = store.getters["getTableInfo"]
        const userInfo = store.getters["token/getUserInfo"]
        const records = await $axios.get(`/api/admin/record/${params.name}`) 
        return {name: params.name, tableInfo: tableInfo[0], userInfo: userInfo, records: records.data}
    },
    methods: {
        filter(record) {
            const keys = Object.keys(this.tableInfo.columnsNames)
            return keys
        }
    }

}
</script>

<style>

</style>