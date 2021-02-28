<template>
  <client-only>
    <div>
      <h1 class="flex justify-center my-2 font-extrabold">表單系統</h1>
      <div class="grid grid-cols-5 mt-20">
        <table class="col-start-2 col-span-3 ">
          <tr class="bg-green-100">
            <th class="border-2 border-black">表單名稱</th>
            <th class="border-2 border-black">科系</th>
            <th class="border-2 border-black">管理者</th>
          </tr>
          <tr v-for="t in tableInfo" :key="t.id">
            <td class="border-2 border-black p-2 font-bold underline"><nuxt-link :to="`/documents/${t.tableName}`">{{t.tableName}}</nuxt-link> </td>
            <td class="border-2 border-black p-2">{{t.tableType}} </td>
            <td class="border-2 border-black p-2">{{t.editor}} </td>
          </tr>
        </table>
      </div>
    </div>
  </client-only>
</template>

<script>
import { mapGetters } from 'vuex'
export default {
    async asyncData({ $axios, store }) {
        const userInfo = store.getters["token/getUserInfo"]
        const tableInfo = await $axios.get("/api/table", { params: {uid: userInfo.uid} })
        store.commit("setTableInfo", tableInfo.data)
        return {tableInfo: tableInfo.data}
    },
    computed: {
      v() {
        console.log(this. tableInfo)
      }
    }
}
</script>

<style>

</style>