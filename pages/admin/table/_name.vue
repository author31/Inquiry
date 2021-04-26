<template>
  <client-only>
    <div class="grid md:grid-cols-12 mt-5">
      <h1 class="md:col-start-1 md:col-end-12 md:mx-2 mb-4 font-bold">{{tableInfo.tableName}}</h1>
      <table class="md:col-start-1 md:col-end-13 md:mx-2">
        <thead>
        <tr>
            <th class="border-2 border-black">名字</th>
            <th class="border-2 border-black">學號</th>
            <th class="border-2 border-black" v-for="t in tableInfo.columnsNames" :key="t.id">{{t}}</th>
        </tr>
        </thead>
        <tr v-for="rec in records" :key="rec.id" >
            <td data-label="名字" class="border-2 border-black">{{rec.stdName}} 
              <nuxt-link :to="`/documents/delete/${name}-${rec.id}`"><i class="fas fa-times text-red-800"></i></nuxt-link>
            </td>
            <td data-label="學號" class="border-2 border-black">{{rec.stdId}}</td>
            <td :data-label=item[1] class="border-2 border-black" v-for="(item, key, index) in filter(rec)" :key="index">
              <p v-if="features[key+1] != 'file'">{{ rec[key+1] }}</p>
              <a v-if="features[key+1] == 'file'" :href="rec[key+1]" target="_blank" rel="noopener noreferrer">{{ rec[key+1] }}</a>
            </td>
            <td class="w-10" data-label="修改"><nuxt-link class="flex md:justify-center" :to="`/admin/table/update/${name}-${rec.id}`"><i class="far fa-edit text-blue-800"></i></nuxt-link></td>
        </tr>
      </table>
    </div>
  </client-only>
</template>

<script>
import { extractTable } from '../../../controller/extractTable'
export default {
    async asyncData({ params, $axios, store }) {
        const docId = params.name
        const tableInfo = store.getters["getTableInfo"]
        const userInfo = store.getters["token/getUserInfo"]
        const extracted = extractTable(tableInfo, docId) 
        const records = await $axios.get(`/api/admin/record/${params.name}`)
        return {name: params.name, tableInfo: extracted[0], userInfo: userInfo, records: records.data, features: extracted[0].features}
    },
    methods: {
        filter() {
          return Object.entries(this.tableInfo.columnsNames)
        }
    }

}
</script>

<style scoped>
th {
  word-break:break-all;
}
</style>