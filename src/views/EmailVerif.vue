<template>
    <div class="about">
      <h1>Авторизация</h1>
      <el-col v-if="user==null">
        <el-input v-model="authInput.txtEmail" class="w3-margin" placeholder="Email"></el-input>
        <el-input v-model="authInput.txtPassword" class="w3-margin" placeholder="Пароль" type="password"></el-input>
        <el-button @click="login()" type="success">Войти</el-button>
        <el-button @click="signIn()" type="warning">Зарегистрироваться</el-button>
        <hr>
      </el-col>
      <span v-if="user!=null">
         <div v-if="user.emailVerified!=true">
            <h4>Выполнен вход с email: {{ user.email }} </h4>
            <span >но Email не верифицирован</span> 
            <br>
            <b>Пожалуйста подтвердите email!</b>
         </div>
      </span>
      
    </div>
</template>
<script>
import {store} from '../store'
export default{
  data(){
    return{
      authInput: {
                    txtEmail: '',
                    txtPassword: ''
                }
    }
  },
  computed:{
    user(){ return store.state.user }
  },
  methods:{
    async login(){
      try {
        await store.dispatch('login', { email:this.authInput.txtEmail, password:this.authInput.txtPassword })
        if (this.user!=null){
          if(this.user.emailVerified) {
            this.$router.push('/admin')
          } else {
            this.$message({
              showClose: true,
              message: 'Email не верифицирован',
              type: 'warning'
            });
          }
        }
        
      } catch (error) {
        console.log(error.code)
        if (error.code=='auth/internal-error'){
          this.$message({
              showClose: true,
              message: 'Email или пароль неверен!',
              type: 'warning'
            });
        }
      }
     
    },
    async signIn(){
      try {
        await store.dispatch('signIn', { email:this.authInput.txtEmail, password:this.authInput.txtPassword })
        if (this.user!=null){
          if (this.user!=null){
          if(this.user.emailVerified) {
            this.$router.push('/admin')
          } else {
            this.$message({
              showClose: true,
              message: 'Email не верифицирован',
              type: 'warning'
            });
          }
        }
        }
        
      } catch (error) {
        console.log(error.code)
        if (error.code=='auth/internal-error'){
          this.$message({
              showClose: true,
              message: 'Email или пароль неверен!',
              type: 'warning'
            });
        }
        // console.error(error)
      }
     
    }
  },
 async created(){
   const curr_user = await store.state.user
   if (curr_user!=null) 
      if(curr_user.emailVerified) {
                this.$router.push('/admin')
              } else {
                if (curr_user.sendEmailVerification()) {
                    this.$message({
                        showClose: true,
                        message: 'На вашу почту отправлен запрос на верификацию',
                        type: 'warning'
                        });
                }
                
                
              }
        
  }
}

</script>
<style>
   .about{

     text-align: center;
     width: 50%;
     margin: auto;
   }
</style>