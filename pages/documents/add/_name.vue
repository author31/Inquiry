<template>
  <div class="mt-2 mx-4 flex justify-center">
    <div class="bg-green-200 w-96 p-3">
      <h1 class="font-bold">新增資料</h1>
      <div class="my-2 grid md:grid-cols-5" v-for="(item, key, index) in columns" :key="key">
        <label class="md:col-start-1 md:col-span-2" for=key>{{item}}: </label>
        <input class="md:col-start-3 col-span-3 border-2 border-black p-1 xs:p-2" :type="features[index+1]" v-model="records[index+1]" v-if="features[index+1] != 'file' ">
        <input class="md:col-start-3 col-span-3" type="file" accept="application/pdf" v-if="features[index+1] =='file'" @change="onFileSelected">
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
      const nonedit = extracted[0].nonedit
      let {[nonedit]:omit, ...columnsNames} = extracted[0].columnsNames
      return {name: params.name, columns: columnsNames, userInfo: userInfo, tableName: tableName, features: {...extracted[0].features}, folderId: extracted[0].folderId}
    },
    data() {
      return {
        records: [],
        file: ''
      }
    },
    methods: {
      async save() {
        if(Object.values(this.features).includes("file")){
          const idx = Object.values(this.features).indexOf("file")
          const fd = new FormData()
          fd.append(`${this.file.name}-${this.userInfo.stdId}-${this.userInfo.username}`, this.file, this.file.name)
          fd.append("folderId", this.folderId)
          const flink = await this.$axios.post(`/api/upload`, fd)
          this.records[idx + 1] = flink.data
        }
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
      },
      onFileSelected(event) {
        this.file = event.target.files[0]
      }
    }
}
</script>

<style>

</style>