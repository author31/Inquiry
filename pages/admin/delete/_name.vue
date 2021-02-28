<template>
  <div class="ml-4">
      <p class="my-4 font-bold">你是否確定刪除這一筆資料 ?</p>
      <button class="bg-red-900 text-white p-2" @click="deleteTable">刪除</button>
      <button class="bg-indigo-400 text-white p-2" @click="cancel">取消</button>
  </div>
</template>

<script>
export default {
    asyncData({params}) {
        return {tableName: params.name}
    },
    methods: {  
        deleteTable() {
            this.$axios.delete(`/api/admin/delete/${this.tableName}`)
            .then(() => {
                alert("Deleted")
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
