<template>
    <div class="flex justify-center">
        <div class="bg-gray-200 shadow-md mt-32 lg:w-4/12 px-4 py-4">
            <h1 class="font-bold mb-2">輸入資料</h1>
            <div class="grid md:grid-cols-12">
                <label class="col-start-1 col-span-2" for="username">姓名: </label> 
                <input class="col-start-3 col-end-12 border-2 border-black mb-2 ml-4" type="text" name="username" v-model="userInfo.username"><br/>

                <label class="col-start-1 col-span-2" for="deparment">班級: </label>
                <input class="col-start-3 col-end-12 border-2 border-black mb-2 ml-4" type="text" name="deparment" v-model="userInfo.department"><br/>

                <label class="col-start-1 col-span-2" for="grade">科系: </label>
                <select class="col-start-3 col-end-12 border-2 mb-2 ml-4" v-model="userInfo.grade">
                    <option disabled value="">請選擇科系</option>
                    <option value="sport">運動管理學系</option>
                </select>

                <label class="col-start-1 col-span-2" for="gender">性別: </label>
                <select class="col-start-3 col-end-12 border-2 ml-4" v-model="userInfo.gender">
                    <option disabled value="">請選擇</option>
                    <option value="male">男</option>
                    <option value="female">女</option>
                </select>
                
            </div>
            <button class="bg-red-400 px-2 mt-2" @click="signUp"> 註冊 </button> 
        </div>  
  </div>
</template>

<script>
export default {
    data() {
        return {
            userInfo: {
                username: "",
                department: "",
                grade: "",
                gener: "",
            }
        }
    },
    methods: {
        signUp() {
            this.$store.dispatch('token/signUp', this.userInfo)
        }
    },

}
</script>

<style>

</style>