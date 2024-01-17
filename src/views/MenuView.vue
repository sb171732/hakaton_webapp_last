<template>
    <div class="">
      
          <h1>Список меню</h1> <el-button @click="drawer2=true">Добавить меню</el-button>
          

         <table class="w3-table">
            <tr v-for="m in Menu" :key="m.id">
                <td>{{ m.date }}</td> 
                
                <td><el-button @click="open(m.id,m.date)"><i class="el-icon-plus"></i></el-button></td>
                <!-- <td><el-button @click="del(m.id)"><i class="el-icon-delete"></i></el-button></td> -->
            </tr>
         </table>
 
          <el-drawer
        size="95%"
            title="I am the title"
            :visible.sync="drawer"
             :with-header="false">
           <el-row>
            <el-col :span="12">
              <span>Меню на {{ sel_date }}</span>
            <div class="w3-padding">
              <ul v-for="m in subMenu" :key="m.id">
                <el-card style="width: 500px;height: 150px;" :body-style="{ padding: '0px' }">
                    <!-- <img height="100px" src="https://shadow.elemecdn.com/app/element/hamburger.9cf7b091-55e9-11e9-a976-7f4d0b07eef6.png" class="image"> -->
                   <el-row>
                     <el-col :span="12" class="">
                     <img :src="m.img_url" width="100%">
                     
                    </el-col>
                     <el-col :span="12">
                        <div style="padding: 14px;">
                        <span>{{ m.name }}</span>
                        <div class="bottom clearfix">
                        <time class="time">{{ m.type }}</time>
                        <el-button class="w3-margin-left" type="text" >{{m.price}} руб</el-button>
                        </div>
                        <el-button @click="delSubMenu(m.id)"><i class="el-icon-delete w3-text-red"></i></el-button>
                    </div>
                    </el-col>
                   </el-row>
                   
                    
                    </el-card>
            </ul>
            </div>  
            
            </el-col>
            
            <el-col :span="12" class="w3-border-left"  style="overflow-y: scroll;">
              <span>Все блюда</span>
            <div class="w3-padding" >
              <ul v-for="m in menu_model" :key="m.id" >
                <el-card style="width: 500px;height: 150px;" :body-style="{ padding: '0px' }">
                    <!-- <img height="100px" src="https://shadow.elemecdn.com/app/element/hamburger.9cf7b091-55e9-11e9-a976-7f4d0b07eef6.png" class="image"> -->
                   <el-row>
                     <el-col :span="12" class="">
                     <img :src="m.img_url" width="100%">
                     
                    </el-col>
                     <el-col :span="12">
                        <div style="padding: 14px;">
                        <span>{{ m.name }}</span>
                        <div class="bottom clearfix">
                        <time class="time">{{ m.type }}</time>
                        <el-button class="w3-margin-left" type="text" >{{m.price}} руб</el-button>
                        </div>
                        <el-button @click="add(m)"><i class="el-icon-plus"></i></el-button>
                    </div>
                    </el-col>
                   </el-row>
                   
                    
                    </el-card>
            </ul>
            </div>  
            
            </el-col>
           </el-row>


           


        </el-drawer>

        <el-drawer
        size="45%"
            direction="ltr"
            title="I am the title"
            :visible.sync="drawer3"
            :with-header="false">
            <span>Меню на {{ sel_date }}</span>
            <div class="w3-padding">
              <ul v-for="m in subMenu" :key="m.id">
                <el-card style="width: 500px;height: 150px;" :body-style="{ padding: '0px' }">
                    <!-- <img height="100px" src="https://shadow.elemecdn.com/app/element/hamburger.9cf7b091-55e9-11e9-a976-7f4d0b07eef6.png" class="image"> -->
                   <el-row>
                     <el-col :span="12" class="">
                     <img :src="m.img_url" width="100%">
                     
                    </el-col>
                     <el-col :span="12">
                        <div style="padding: 14px;">
                        <span>{{ m.name }}</span>
                        <div class="bottom clearfix">
                        <time class="time">{{ m.type }}</time>
                        <el-button class="w3-margin-left" type="text" >{{m.price}} руб</el-button>
                        </div>
                        <el-button @click="add(m)"><i class="el-icon-plus"></i></el-button>
                    </div>
                    </el-col>
                   </el-row>
                   
                    
                    </el-card>
            </ul>
            </div>  


        </el-drawer>
        <el-drawer
  title="Выберите дату"
  :visible.sync="drawer2"
  direction="ltr"
  >
  <span></span>
  <el-date-picker
            v-model="sel_date"
            format="dd.MM.yyyy"
            type="date"
            placeholder="Выбрать">
        </el-date-picker>
        <el-button class="w3-margin-top" type="success" @click="add_menu()">Добавить новое меню</el-button>
</el-drawer>
    </div>
</template>

<script>
import {store} from '../store'
export default {
  data(){
    return{
       drawer:false,
       drawer2:false,
       drawer3:false,
       cur_id:'',
       sel_date:'',
       new_submenu:{
          dishId:'',
          img_url:'',
          description:'',
          name:'',
          type:'',
          price:''
       }
    }
  },
  computed:{
    subMenu(){ return store.state.subCollection},
    menu_model(){ return store.state.menu_model },
    Menu(){
      return store.state.menu
    }    ,
    
  },
  methods:{
    formatDate(date) {
            var d = new Date(date),
                month = '' + (d.getMonth() + 1),
                day = '' + d.getDate(),
                year = d.getFullYear();

            if (month.length < 2) 
                month = '0' + month;
            if (day.length < 2) 
                day = '0' + day;

            return [day, month, year].join('.');
        },
    open(id,d){
      this.sel_date = d
      this.cur_id = id
      this.drawer = true
      store.dispatch('bindSubCollection',id)
      // this.drawer3 = true
    },
    add(m){
      //  this.new_submenu.price = parseInt(this.new_submenu.price)
       this.new_submenu.dishId = m.id
       this.new_submenu.img_url = m.img_url
       this.new_submenu.description = m.description
       this.new_submenu.name = m.name
       this.new_submenu.type = m.type
       this.new_submenu.price = m.price
       if (store.dispatch('addSubMenu', {id:this.cur_id,payload:this.new_submenu} )){
        this.$notify({
          title: 'Success',
          message: 'Добавлено в меню!',
          type: 'success'
        });
       }
    },
    add_menu(){
      if (store.dispatch('addMenu',{ date: this.formatDate(this.sel_date) })){
        this.$notify({
          title: 'Success',
          message: 'Добавлено новое меню!',
          type: 'success'
        });
      }
      
    },
    del(id){
      store.dispatch('delMenu',id)
    },
    delSubMenu(id){
      store.dispatch('delSubMenu',{ docId: this.cur_id,subdocID:id })
    }
  },
 created(){
   const curr_user = store.state.user
   console.log(curr_user)
   if (curr_user!=null) 
      if(curr_user.emailVerified!=true) {
                this.$router.push('/verif')
              } 
        
  },
  $route (to, from){
        console.log(to)
        console.log(from)
    }
}
</script>

<style scoped>
  h1 {
    text-align: left;
  }
  li {
    list-style-type: none;
    text-align: left;
  }
  .provadd {
    color: black;
  }
</style>