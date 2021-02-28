<template>
  <div class="mt-2 mx-4 flex justify-center">
      <div class="bg-green-200 w-96 p-3">
        <h1 class="font-bold">修改欄位名稱</h1>
        <div class="my-2 grid md:grid-cols-5" v-for="(item, key, index) in columns" :key="index">
          <label class="md:col-start-1 md:col-span-2 mt-1" for="`${key}`">{{item}} <i class="fas fa-arrow-right"></i> </label>
          <input class="md:col-start-3 col-span-3 border-2 border-black p-1 xs:p-2" type="text" v-model="records[key]">
        </div>
        <button class="bg-blue-400 p-1 hover:bg-gray-50" @click="update">確定</button>
        <button class="bg-red-400 p-1 hover:bg-gray-50" @click="cancel">取消</button>
      </div>
  </div>
</template>

<script>
import { extractTable } from '../../../controller/extractTable'
export default {
    async asyncData({ params, store }) {
      const tableName = params.name
      const tableInfo = store.getters["getTableInfo"]
      const userInfo = store.getters["token/getUserInfo"]
      const extracted = extractTable(tableInfo, tableName) 
      return {columns: extracted[0].columnsNames, userInfo: userInfo, tableName: tableName}
    },
    data() {
      return {
        records: [],
      }
    },
    methods: {
        update() {
            var updateInfo = []
            updateInfo["editor"] = this.userInfo.username
            updateInfo["tableType"] = this.userInfo.department
            updateInfo["tableName"] = this.tableName
            updateInfo["columnsNames"] = {...this.records}
            this.$axios.post(`/api/admin/update/${this.tableName}`, {updated: {...updateInfo}})
            .then(() => {
              alert("Updated successfully")
              this.$router.go(`/admin`)
            })
            .catch((err) => {
              alert("Something went wrong, please try again")
              this.$router.go(`/admin`)
            })
        },
        cancel() {
          this.$router.go(-1)
        }
        
    }
}
</script>

<style>

</style>