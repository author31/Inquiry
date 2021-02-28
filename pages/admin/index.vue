<template>
  <client-only>
    <div class="grid md:grid-cols-5 mt-20 sm:grid-cols-12">
      <div class="mb-2 md:col-start-2 xs:col-start-2">
        <nuxt-link class="text-green-500 xl:text-xl ml-1" :to="`/admin/add`">
          <i class="fas fa-plus"> 新增表單</i>
        </nuxt-link>
      </div>
      <table class="mx-2 md:col-span-3 md:col-start-2 sm:col-start-4">
        <tr>
          <th class="border-2 border-black">表單名稱</th>
          <th class="border-2 border-black">科系</th>
          <th class="border-2 border-black">管理者</th>
        </tr>
        <tr v-for="t in tableInfo" :key="t.id">
          <td class="border-2 border-black p-2 font-bold underline">
            <nuxt-link :to="`/admin/table/${t.tableName}`">{{t.tableName}}</nuxt-link>
          </td>
          <td class="border-2 border-black p-2">{{t.tableType}} </td>
          <td class="border-2 border-black p-2">{{t.editor}} </td>
          <td class="text-blue-400 pl-1"><nuxt-link :to="`/admin/update/${t.tableName}`"><i class="far fa-edit"></i></nuxt-link></td>
          <td class="text-blue-400"><nuxt-link :to="`/admin/delete/${t.tableName}`"><i class="fas fa-times text-red-800"></i> </nuxt-link></td>
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