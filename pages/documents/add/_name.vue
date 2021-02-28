<template>
  <div class="mt-2 mx-4 flex justify-center">
    <div class="bg-green-200 w-96 p-3">
      <h1 class="font-bold">新增資料</h1>
      <div class="my-2 grid md:grid-cols-5" v-for="(item, key, index) in columns" :key="index">
        <label class="md:col-start-1 md:col-span-2" for=key>{{item}}: </label>
        <input class="md:col-start-3 col-span-3 border-2 border-black p-1 xs:p-2" type="text" v-model="records[key]">
      </div>
      <button class="bg-blue-400 p-1 hover:bg-gray-50" @click="save">確定</button>
      <button class="bg-red-400 p-1 hover:bg-gray-50" @click="cancel">取消</button>
    </div>
  </div>
  
</template>

<script>
import { extractTable } from '../../../controller/extractTable'
export default {
    asyncData({params, store}) {
      const tableName = params.name
      const tableInfo = store.getters["getTableInfo"]
      const userInfo = store.getters["token/getUserInfo"]
      const extracted = extractTable(tableInfo, tableName) 
      return {name: params.name, columns: extracted[0].columnsNames, userInfo: userInfo, tableName: tableName}
    },
    data() {
      return {
        records: []
      }
    },
    methods: {
      save() {
        this.records["stdId"] = this.userInfo.stdId
        this.records["stdName"] = this.userInfo.username
        const newRecord = {...this.records}
        this.$axios.post(`/api/add/${this.tableName}`, {newRecord: newRecord})
        .then((res) => {
          alert("Created successfully")
          this.$router.go(-1)
        })
        .catch((err) => {
          alert("Something went wrong, try again")
          this.$router.go(-1)
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