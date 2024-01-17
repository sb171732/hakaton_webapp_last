<template>
    <div class="main">
        <h3 class="w3-margin">Выберите дату чтобы посмотреть меню</h3>
        <el-date-picker
            v-model="sel_date"
           
            type="date"
            placeholder="Выбрать">
        </el-date-picker>
        <div style="margin: auto;">
            <ul v-for="m in SubMenu" :key="m.id">
                <el-card style="width: 500px;height: 200px;" :body-style="{ padding: '0px' }">
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
                        <el-button @click="del(m.id)"><i class="el-icon-delete"></i></el-button>
                    </div>
                    </el-col>
                   </el-row>
                   
                    
                    </el-card>
            </ul>
        </div>
    </div>
</template>

<script>
import {store} from '../store';
export default {
    data(){
        return{
            sel_date:'',
            sel_id:'',
        new_menu:{
          description:'',
          foodprovider_id:'',
          img_url:'',
          name:'',
          type:'',
          price:''
          }
        }
    },
    computed:{
    Menu(){
      return store.state.menu
    },
    SubMenu(){
        return store.state.subCollection
    }
   
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
        del(id){
            store.dispatch('delSubMenu',{ docId: this.sel_id,subdocID:id })
        }
    },
    watch:{
        sel_date(to){
            let id = this.Menu.filter((n)=>{return n.date.match(this.formatDate(to))})
            if (id.length!=0){
               this.sel_id = id[0].id 
               store.dispatch('bindSubCollection',id[0].id)
               console.log(this.SubMenu)
            } else {
                store.commit('SET_SubMenu',[])
            }
        },
      
    
    },
    async created(){
   const curr_user = await store.state.user
   if (curr_user!=null) 
      if(curr_user.emailVerified!=true) {
                this.$router.push('/verif')
              } 
        
  },
  
   
  
}
</script>

<style scoped>

.time {
    font-size: 13px;
    color: #999;
  }
</style>