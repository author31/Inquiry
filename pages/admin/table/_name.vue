<template>
  <client-only>
    <div class="grid md:grid-cols-5 mt-20 sm:grid-cols-12">
      <h1 class="md:col-start-2 md:mx-2 mb-4 font-bold">{{tableInfo.tableName}}</h1>
      <table class="md:mx-2 md:col-span-3 md:col-start-2 sm:col-start-4">
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
            <td :data-label=item[1] class="border-2 border-black" v-for="(item, key, index) in filter(rec)" :key="index">{{ rec[key+1] }}</td>
            <td data-label="修改"><nuxt-link class="flex md:justify-center" :to="`/admin/table/update/${name}-${rec.id}`"><i class="far fa-edit text-blue-800"></i></nuxt-link></td>
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
        return {name: params.name, tableInfo: extracted[0], userInfo: userInfo, records: records.data}
    },
    methods: {
        filter() {
          return Object.entries(this.tableInfo.columnsNames)
        }
    }

}
</script>

<style>

</style>