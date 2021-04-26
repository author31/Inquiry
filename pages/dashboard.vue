<template>
  <client-only>
    <div>
      <h1 class="flex justify-center my-4 font-extrabold">表單系統</h1>
      <div class="grid md:grid-cols-12 mt-4">
        <table class="md:col-start-2 md:col-end-12 ">
          <thead>
          <tr class="bg-green-100">
            <th class="">表單名稱</th>
            <th class="">科系</th>
            <th class="">管理者</th>
          </tr>
          </thead>
          <tr v-for="t in tableInfo" :key="t.id">
            <td data-label="表單名稱" class=" underline"><nuxt-link :to="`/documents/${t.id}`">{{t.tableName}}</nuxt-link> </td>
            <td data-label="科系" class="">{{t.tableType}} </td>
            <td data-label="管理者" class="">{{t.editor}} </td>
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
}
</script>

<style>

</style>