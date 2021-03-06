<template>
  <client-only>
    <div class="grid md:grid-cols-5 mt-20">
      <div class="mb-2 md:col-start-2">
        <nuxt-link class="text-green-500 xl:text-xl ml-1" :to="`/admin/add`">
          <i class="fas fa-plus"> 新增表單</i>
        </nuxt-link>
      </div>
      <table class="md:mx-2 md:col-span-3 md:col-start-2">
        <thead>
        <tr>
          <th class="border-2 border-black">表單名稱</th>
          <th class="border-2 border-black">科系</th>
          <th class="border-2 border-black">管理者</th>
        </tr>
        </thead>
        <tr v-for="t in tableInfo" :key="t.id">
          <td data-label ="表單名稱" class="border-2 border-black font-bold underline">
            <nuxt-link :to="`/admin/table/${t.id}`">{{t.tableName}}</nuxt-link>
          </td>
          <td data-label ="科系" class="border-2 border-black">{{t.tableType}} </td>
          <td data-label ="管理者" class="border-2 border-black">{{t.editor}} </td>
          <td data-label ="修改"><nuxt-link :to="`/admin/update/${t.id}`"><i class="text-blue-400 far fa-edit"></i></nuxt-link></td>
          <td data-label ="刪除"><nuxt-link :to="`/admin/delete/${t.id}`"><i class="fas fa-times text-red-800"></i> </nuxt-link></td>
        </tr>
      </table>
    </div>
  </client-only>
</template>

<script>
export default {
    async asyncData({ $axios, store }) {
        const userInfo = store.getters["token/getUserInfo"]
        const tableInfo = await $axios.get("/api/admin/table", { params: {uid: userInfo.uid} })
        store.commit("setTableInfo", tableInfo.data)
        return {tableInfo: tableInfo.data}
    }
}
</script>

<style>

</style>