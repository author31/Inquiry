<template>
  <div class="mt-2 mx-4 flex justify-center">
      <div class="bg-green-200 w-96 p-3">
        <div class="flex float-right space-x-2 text-xl">
            <button class="" @click="add('text')"><i class="far fa-file-word"></i></button>
            <button class="" @click="add('file')"><i class="fas fa-upload text-xl"></i></button>
            <button class="" @click="add('date')"><i class="far fa-calendar"></i></button>
        </div>
        <h1 class="font-bold">新增表單</h1>
        <label for="tableName">新表單名稱: </label>
        <input class="border-2 border-black p-1 xs:p-2 my-4" type="text" v-model="tableName">
        <div class="my-2 grid md:grid-cols-12" v-for="(items, key) in columns" :key="key">
            <label class="md:col-start-1 md:col-span-3" for="">新欄位 {{items.name}}: </label>
            <input class="md:col-start-4 col-end-10 border-2 border-black p-1 xs:p-2" type="text" v-model="records[key]">
            <button class="md:col-start-11 col-span-1" @click="deleteEl(key)"><i class="fas fa-trash"></i></button>
        </div>
        <div class="flex space-x-2">
            <button class="bg-blue-400 p-1 hover:bg-gray-50" @click="save">確定</button>
            <button class="bg-red-400 p-1 hover:bg-gray-50" @click="cancel">取消</button>       
        </div>
      </div>
  </div>
</template>

<script>
export default {
    asyncData({params, store}) {
        const userInfo = store.getters["token/getUserInfo"] 
        return {userInfo: userInfo}
      
    },
    data() {
      return {
        tableName: "",
        columns: [],
        records: [],
      }
    },
    methods: {
        async save() {
            var feat = {}
            this.columns.forEach(el => feat[el.id] = el.name)
            const newRecord = Object.assign({}, {
                columnsNames: {...this.records},
                features: feat, 
                editor: this.userInfo.username, 
                tableType: this.userInfo.department,
                tableName: this.tableName
            })
            if(Object.values(feat).includes("file")) {
                const folderId = await this.$axios.get(`/api/folderCreate/${this.tableName}-folder`, {headers: {uid: this.userInfo.uid}})
                newRecord["folderId"] = folderId.data.id
            }
            this.$axios.post(`api/admin/add`, {newRecord: newRecord})
            .then((res) => {
                alert("建立成功")
                this.$router.go(-1)
            })
            .catch((err) => {
                alert("發生錯誤，請稍後重試")
                this.$router.go(-1)
            })
        },
        add(inputType) {
            var colId = this.columns.length + 1
            var col = Object.assign({}, {id: colId, name: `${inputType}`})
            this.columns.push(col)
        },
        deleteEl(id) {
            this.columns.splice(id, 1)
        },
        cancel() {
            this.$router.go(-1)
        }
    },
}
</script>

<style>

</style>
