<template>
    <div class="">
        <el-menu class="nav" :default-active="activeIndex" router mode="horizontal">
      <el-menu-item index="1" route="/admin/providers">Поставщики</el-menu-item>
      <el-menu-item index="2" route="/admin/menu">Список товаров</el-menu-item>
      
    </el-menu>
          <h2>Поставщики еды</h2>
          <el-button @click="drawer = true">Добавить поставщика</el-button>
        <ul>
            <li class="prov" v-for="f in FP" :key="f.id">
                {{ f.name }}
                <!-- <img width="50px" :src="f.logo_path" alt=""> -->
            </li>
        </ul>
        <el-drawer
        size="40%"
            title="I am the title"
            :visible.sync="drawer"
            :with-header="false">
            <span></span>
            <div class="w3-padding">
                <el-input class="w3-margin" v-model="new_fp.name" placeholder="Название поставщика"></el-input>
                <el-input class="w3-margin" v-model="new_fp.logo_path" placeholder="Ссылка на лого"></el-input>
                <el-button @click="add()">Добавить</el-button>
            </div>  


        </el-drawer>
    </div>
</template>

<script>
import {store} from '../store'
export default {
    data(){
       return{
        drawer:false,
        new_fp:{
            name:'',logo_path:''
        }
       }
    },
    computed:{
        FP(){
            return store.state.food_provider
        }
    },
    methods:{
        add(){
            store.dispatch('addFP', this.new_fp)
        }
    }
}
</script> 

<style scoped>
.prov {
    list-style-type: none;
    text-align: left;
    border: 2px solid;
    border-radius: 5px;
    padding: 10px;
    gap: 15px;
    margin-top: 20px;
    width: 100px;
  }
</style>