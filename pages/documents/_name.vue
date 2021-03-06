<template>
  <client-only>
    <div class="grid md:grid-cols-12 mt-20">
      <div class="md:col-start-2 md:col-end-10 mx-2 font-bold mb-4 text-2xl">
        <h1 class="">{{tableInfo.tableName}}</h1>
      </div>
      <div class="mb-2 mx-2 md:col-start-2 md:col-end-10 xs:col-start-2">
        <nuxt-link class="text-green-500 md:text-xl" :to="`/documents/add/${this.name}`">
          <i class="fas fa-plus"> 新增一筆 </i>
        </nuxt-link>
      </div>
      <table class="md:mx-2 md:col-start-2 md:col-end-12">
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
            <td data-label="修改"><nuxt-link class="flex lg:justify-center" :to="`/documents/update/${name}-${rec.id}`"><i class="far fa-edit text-blue-800"></i></nuxt-link></td>
        </tr>
      </table>
    </div>
  </client-only>
</template>

<script>
import { extractTable } from '../../controller/extractTable'
export default {
    async asyncData({ params, $axios, store }) {
        const tableInfo = store.getters["getTableInfo"]
        const userInfo = store.getters["token/getUserInfo"]
        const extracted = extractTable(tableInfo, params.name)
        const records = await $axios.get(`/api/document/${params.name}-${userInfo.stdId}`)
        return {name: params.name, tableInfo: extracted[0], userInfo: userInfo, records: records.data}
    },
    methods: {
        filter() {
          return Object.entries(this.tableInfo.columnsNames)
        }
    },
}
</script>

<style>


</style>