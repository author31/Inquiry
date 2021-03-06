<template>
  <div class="mt-2 mx-4 flex justify-center">
      <div class="bg-green-200 w-96 p-3">
        <h1 class="font-bold">新增表單</h1>
        <label for="tableName">新表單名稱: </label>
        <input class="border-2 border-black p-1 xs:p-2" type="text" v-model="tableName">
        <button class="bg-indigo-300" @click="add"> 添加欄位 </button>
        <div class="my-2 grid md:grid-cols-5" v-for="c in columns" :key="c.id">
            <label class="md:col-start-1 md:col-span-1" for="">新欄位 {{c.id}}: </label>
            <input class="md:col-start-3 col-span-3 border-2 border-black p-1 xs:p-2" type="text" v-model="records[c.id]">
        </div>
        <button class="bg-blue-400 p-1 hover:bg-gray-50" @click="save">確定</button>
      <button class="bg-red-400 p-1 hover:bg-gray-50" @click="cancel">取消</button>
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
        records:[],
      }
    },
    methods: {
        save() {
            const newRecord = Object.assign({}, {
                columnsNames: {...this.records}, 
                editor: this.userInfo.username, 
                tableType: this.userInfo.department,
                tableName: this.tableName
            })  
            this.$axios.post(`api/admin/add`, {newRecord: newRecord})
            .then((res) => {
                alert("Created successfully")
                this.$router.go(-1)
            })
            .catch((err) => {
                alert("Failed, try again")
                this.$router.go(-1)
            })
        },
        add() {
            var colId = this.columns.length + 1
            var col = Object.assign({}, {id: colId, name: ""})
            this.columns.push(col)
        },
        cancel() {
            this.$router.go(-1)
        }
    },
}
</script>

<style>

</style>
