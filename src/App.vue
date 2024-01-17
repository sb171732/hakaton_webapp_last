<template>
   <div id="app">
    <el-button type="text" @click="signout()" v-if="user!=null">выход</el-button>
    <div v-if="user!=null" >
      <el-menu v-if="user.emailVerified!=false" :default-active="$route.name" class="nav" router mode="horizontal" background-color="#545c64" text-color="#fff"
  active-text-color="#ffd04b">
      <el-menu-item  index="admin" route="/admin">Меню</el-menu-item>
      <el-menu-item index="menu" route="/admin/menu">Редактор меню</el-menu-item>
      <el-menu-item index="menumodels" route="/admin/menumodels">Блюда</el-menu-item>
      <el-menu-item index="orders" route="/admin/orders">Заказы</el-menu-item>
     
      </el-menu>
    </div>
        <router-view></router-view>
   </div>
</template>

<script>
import {store} from './store'
export default {
  name: 'app',
  data() {
    return{
      activeIndex:'1',
     
    }
  },
  computed:{
    user(){
      return store.state.user
    }
  },
  methods:{
    signout(){
      store.dispatch('signout')
      this.$router.push('/')
    }
  },
  async created(){
   const curr_user = await store.state.user
   if (curr_user!=null) 
      if(this.user.emailVerified!=true) {
                this.$router.push('/verif')
              } 
        
  },
  
}
</script>

<style>
@import url('https://fonts.googleapis.com/css2?family=Alata&family=Kanit&family=Poppins&display=swap');
body {
  font-family: 'Alata';
  /* background-image: radial-gradient( circle farthest-corner at 6.6% 12%,  rgba(64,0,126,1) 20.8%, rgba(0,255,160,1) 100.2% );  */
}
.nav {
  display: flex;
  justify-content: space-between;
}
#app {
  font-family: 'Alata';
  -webkit-font-smoothing: antialiased;
  -moz-osx-font-smoothing: grayscale;
  text-align: center;
  color: black;
  margin-top: 10px;
}
</style>
