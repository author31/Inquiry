<template>
  <client-only>
    <div class="grid md:grid-cols-5 mt-20 sm:grid-cols-12">
      <div class="mb-2 md:col-start-2 xs:col-start-2">
        <nuxt-link class="text-green-500 xl:text-xl" :to="`/documents/add/${this.name}`">
          <i class="fas fa-plus"> 新增一筆</i>
        </nuxt-link>
      </div>
      <table class="mx-2 md:col-span-3 md:col-start-2 sm:col-start-4">
        <tr>
            <th class="border-2 border-black">名字</th>
            <th class="border-2 border-black">學號</th>
            <th class="border-2 border-black" v-for="t in tableInfo.columnsNames" :key="t.id">{{t}}</th>
        </tr>
        <tr v-for="rec in records" :key="rec.id" >
            <td class="border-2 border-black">{{rec.stdName}} 
              <nuxt-link :to="`/documents/delete/${name}-${rec.id}`"><i class="fas fa-times text-red-800"></i></nuxt-link>
            </td>
            <td class="border-2 border-black">{{rec.stdId}}</td>
            <td class="border-2 border-black" v-for="fil in filter(rec)" :key="fil">{{rec[fil]}}</td>
            <td class="text-blue-800"><nuxt-link :to="`/documents/update/${name}-${rec.id}`"><i class="far fa-edit"></i></nuxt-link></td>
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
        filter(record) {
            const keys = Object.keys(this.tableInfo.columnsNames)
            return keys
        }
    }

}
</script>

<style>

</style>