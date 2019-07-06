<template>
  <div class="layout">
    <Row type="flex" style="position:absolute;left:0;top:0;width:100%;">
      <Col span="4" class="layout-menu-left">
        <div class="layout-logo-left">
          <img src="../../assets/logo.png">
          <strong>云签</strong>
        </div>
<!--        左侧列表-->
        <Menu active-name="1-2" theme="dark" width="auto" :open-names="['1']" @on-select="m=>{select(m)}">
          <Submenu v-for="pmenu in menuList" :name="pmenu.id" :key="pmenu.id">
            <template slot="title">
              <Icon :type="pmenu.icon"></Icon>
              {{pmenu.name}}
            </template>
            <MenuItem v-for="cmenu in pmenu.children" :name="cmenu.id" :key="cmenu.id">
              <Icon :type="cmenu.icon"></Icon>
              {{cmenu.name}}
            </MenuItem>
          </Submenu>
        </Menu>
      </Col>
<!--      右侧-->
      <Col span="20">
        <div class="layout-header">
          <strong>{{userName}}</strong>
          <Dropdown trigger="click" style="margin-right: 50px" @on-click="m=>{dropdownSelect(m)}">
            <img src="../../images/user.jpg"></img>
            <DropdownMenu class="dropdown-menu" slot="list">
              <DropdownItem>退出</DropdownItem>
            </DropdownMenu>
          </Dropdown>
        </div>

        <div class="layout-breadcrumb">
          <Breadcrumb>
            <BreadcrumbItem to="/base/Home">首页</BreadcrumbItem>
            <BreadcrumbItem v-for="item in breadcrumbData" :to="item.url" :key="item.id">{{item.name}}</BreadcrumbItem>
          </Breadcrumb>
        </div>
        <div class="layout-content">
          <router-view></router-view>
        </div>
        <div class="layout-copy">
          2019-2020 &copy; long
        </div>
      </Col>

    </Row>

  </div>
</template>

<script>
    export default {
      name: "Base",
      data(){
        return {
          /*用户名*/
          userName: "我是用户",
          /*一级菜单*/
          menuList: [
            {
              name:"系统管理",
              id:1,
              url:null,
              icon:"ios-flower",
              children:[
                {
                  name:"用户管理",
                  id:4,
                  url:"user",
                  icon:"ios-person"
                },
                {
                  name:"菜单管理",
                  id:5,
                  url:"menu",
                  icon:"md-card"
                },
                {
                  name:"权限管理",
                  id:6,
                  url:"role",
                  icon:"ios-people"
                },
              ]
            }
          ],
          /*二级菜单*/
          menuSub: [],
          /*面包屑data*/
          breadcrumbData: []
        }
      },
      mounted() {
        var data=JSON.parse(localStorage.getItem("user_data"))
        console.log(data)
        this.userName=data["name"]
        console.log(this.userName)
        // this.axios({
        //   method:'get',
        //   url:'/lesson',
        //
        // }).then(function (response) {
        //
        // }).catch(function (error) {
        //   console.log(error)
        // })
      },

      methods:{
        /*菜单选择事件*/
        select(e){
          for(var i in this.menuList){
            for(var j in this.menuList[i].children){
              this.menuSub.push(this.menuList[i].children[j]);
            }
          }
          var filterMenus = this.menuSub.filter(function(menu){return (menu.url!=null && menu.url!='' && menu.id==e)});
          this.$router.push(filterMenus[0].url);
          this.breadcrumbData.splice(0,1,filterMenus[0]);
        },
        /*下拉菜单选择事件*/
        dropdownSelect(e){
          this.$store.dispatch('users/loginOUt',{"router":this.$router});
        }
      }
    }
</script>

<style scoped>
  .layout{
    border: 1px solid #d7dde4;
    background: #e9eaec;
    /*position: relative;*/
    position:absolute;
    left:0;
    top:0;
    width:100%;
    height:100%;
    overflow:auto;
  }
  .layout-breadcrumb{
    padding: 10px 15px 0;
  }
  .layout-content{
    /*height: 80%;*/
    /*min-height: 100%;*/
    min-height: 200px;
    margin: 15px;
    overflow: hidden;
    background: #f8f8f9;
    border-radius: 4px;
    box-shadow: 1px 1px 1px 1px  rgba(0,0,0,.1);
  }
  .layout-content-main{
    padding: 10px;
  }
  .layout-copy{
    height: 4%;
    text-align: center;
    padding: 10px 0 20px;
    color: #009688;
  }
  .layout-menu-left{
    background: #464c5b;
  }
  .layout-header{
    height: 60px;
    background: #f8f8f9;
    box-shadow: 0 1px 1px rgba(0,0,0,.1);
    text-align: right;
  }
  .layout-header img{
    width: 40px;
    height: 40px;
    line-height: 40px;
    border-radius: 20px;
    margin-top: 10px;
    /*margin-right: 50px;*/
  }
  .layout-header strong{
    color: #ff5722;
    font-size:10px;
  }
  .layout-logo-left{
    width: 90%;
    height: 30px;
    /*background: #5b6270;*/
    border-radius: 3px;
    margin: 15px auto;
  }
  .layout-logo-left img{
    width: 20%;
    height: 100%;
  }
  .layout-logo-left strong{
    color: #00bcd4;
    font-size:10px;
  }
  .dropdown-menu{
    text-align: center;
    /*box-shadow: 0 1px 6px #00BCD4;*/
  }
</style>
