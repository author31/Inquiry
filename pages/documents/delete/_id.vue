<template>
  <div class="ml-4">
      <p class="my-4 font-bold">你是否確定刪除這一筆資料 ?</p>
      <button class="bg-red-900 text-white p-2" @click="deleteRecord">刪除</button>
      <button class="bg-indigo-400 text-white p-2" @click="cancel">取消</button>
  </div>
</template>

<script>
export default {
    asyncData({params}) {
        const tableName = params.id.split("-")[0]
        return {path: params.id, tableName: tableName}
    },
    methods: {  
        deleteRecord() {
            this.$axios.delete(`/api/delete/${this.path}`)
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
