<template>
  <div class="">
    <h2>Страница заказов</h2>
    <table class="w3-table">
        <tr>
            <td>UserId</td>
            <td>Статус заказа</td>
            <td>Сумма</td>
            <td></td>
        </tr>
        <tr v-for="o in orders" :key="o.id">
            <td><i>{{ o.userUid }}</i></td>
            <td>
                <el-select v-model="o.status">
                    <el-option v-for="s in status" :key="s" :value="s">{{ s }}</el-option>
                </el-select>
            </td>
            <td></td>
            <td><el-button @click="view()" type="text">подробнее</el-button></td>
        </tr>
    </table> 
    

  </div>
</template>

<script>
import {store} from '../store'
export default {
    data(){
        return{
            status:['принят','на готовке','готов к доставке','в пути','доставлен']
            
        }
    },
   computed:{
      orders(){
        return store.state.orderList
      }
   },
   view(){

   }
}
</script>

<style>

</style>