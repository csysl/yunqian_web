<template>
 <div style="margin-bottom: 20px;">
   <div>
     <ul>
       <li>
         <Button type="primary" icon="md-add" @click="openNewModal()">新建</Button>
         <Button type="success" icon="md-build" @click="">修改</Button>
         <Button type="error" icon="md-trash" @click="">删除</Button>
       </li>
       <li>
         <div style="padding: 10px 0;">
           <Table border :columns="columns1" :data="data1" :height="400" @on-selection-change="s=>{change(s)}" @on-row-dblclick="s=>{dblclick(s)}"></Table>
         </div>
       </li>
       <li>
         <div style="text-align: right;">
           <Page :total="total" :page-size="pageInfo.pageSize" show-elevator show-total @on-change="e=>{pageSearch(e)}"></Page>
         </div>
       </li>
     </ul>
   </div>
   <!--添加modal-->
   <Modal :mask-closable="false" :visible.sync="newModal" :loading = "loading" v-model="newModal" width="600" title="新建" @on-ok="newOk('userNew')" @on-cancel="cancel()">
     <Form ref="userNew" :model="userNew" :rules="ruleNew" :label-width="80" >
       <Row>
         <Col span="12">
           <Form-item label="登录名:" prop="loginName">
             <Input v-model="userNew.loginName" style="width: 204px"/>
           </Form-item>
         </Col>
         <Col span="12">
           <Form-item label="用户名:" prop="name">
             <Input v-model="userNew.name" style="width: 204px"/>
           </Form-item>
         </Col>
       </Row>
       <Row>
         <Col span="12">
           <Form-item label="密码:" prop="password">
             <Input v-model="userNew.password" type="password" style="width: 204px"/>
           </Form-item>
         </Col>
         <Col span="12">
           <Form-item label="确认密码:" prop="passwordAgain">
             <Input v-model="userNew.passwordAgain" type="password" style="width: 204px"/>
           </Form-item>
         </Col>
       </Row>
       <Row>
         <Col span="12">
           <Form-item label="邮箱:" prop="email">
             <Input v-model="userNew.email" style="width: 204px"/>
           </Form-item>
         </Col>
         <Col span="12">
           <Form-item label="手机:" prop="">
             <Input v-model="userNew.phone" style="width: 204px"/>
           </Form-item>
         </Col>
       </Row>
     </Form>
   </Modal>
   <Modal :mask-closable="false" :visible.sync="modifyModal" :loading = "loading" v-model="modifyModal" width="600" title="修改" @on-ok="modifyOk('userModify')" @on-cancel="cancel()">
     <Form ref="userModify" :model="userModify" :rules="ruleModify" :label-width="80" >
       <Row>
         <Col span="12">
           <Form-item label="登录名:" prop="loginName">
             <Input v-model="userModify.loginName" style="width: 204px"/>
           </Form-item>
         </Col>
         <Col span="12">
           <Form-item label="用户名:" prop="name">
             <Input v-model="userModify.name" style="width: 204px"/>
           </Form-item>
         </Col>
       </Row>
       <Row>
         <Col span="12">
           <Form-item label="密码:" prop="password">
             <Input v-model="userModify.password" type="password" style="width: 204px"/>
           </Form-item>
         </Col>
       </Row>
       <Row>
         <Col span="12">
           <Form-item label="邮箱:" prop="email">
             <Input v-model="userModify.email" style="width: 204px"/>
           </Form-item>
         </Col>
       </Row>
     </Form>
   </Modal>
   <Modal :mask-closable="false" :visible.sync="delModal" :loading = "loading" v-model="delModal" width="600" title="删除" @on-ok="newOk('userNew')" @on-cancel="cancel()">
     <div>
       <Table border :columns="columns2" :data="data1" :height="260"  @on-selection-change="s=>{change2(s)}"></Table>
     </div>
   </Modal>
 </div>
</template>

<script>
    export default {
        name: "user",
      data () {
        return {
          /*用于查找的登录名*/
          loginName:null,
          /*选择的数量*/
          count:null,
          /*选中的组数据*/
          groupId:null,
          /*新建modal的显示参数*/
          newModal:false,
          /*修改modal的显示参数*/
          modifyModal:false,
          /*删除modal的显示参数*/
          delModal:false,
          /*角色配置modal的显示参数*/
          roleModal:false,
          /*分页total属性绑定值*/
          total:0,
          /*loading*/
          loading: true,
          /*pageInfo实体*/
          pageInfo:{
            page:0,
            pageSize:10
          },
          /*user实体*/
          user:{
            id:null,
            name:null,
            loginName:null,
            password:null,
            passwordAgain:null,
            email:null,
            phone:null
          },
          /*用于添加的user实体*/
          userNew:{
            id:null,
            name:null,
            loginName:null,
            password:null,
            passwordAgain:null,
            email:null,
            phone:null
          },
          /*用于修改的user实体*/
          userModify:{
            id:null,
            name:null,
            loginName:null,
            password:null,
            email:null,
            phone:null
          },
          /*新建验证*/
          ruleNew:{
            name: [
              { type:'string',required: true, message: '输入用户名', trigger: 'blur' }
            ],
            loginName: [
              { type:'string',required: true, message: '输入登录名', trigger: 'blur' }
            ],
            password: [
              { type:'string',required: true, message: '输入密码', trigger: 'blur' }
            ],
            passwordAgain: [
              { type:'string',required: true, message: '输入再次密码', trigger: 'blur' }
            ],
            email: [
              { required: true, message: '输入邮箱', trigger: 'blur' },
              { type:'email', message: '输入正确的邮箱格式', trigger: 'blur' }
            ],
            phone: [
              { required: true, message: '输入手机', trigger: 'blur' },
              { type:'phone', message: '输入正确的手机号', trigger: 'blur' }
            ],
          },
          /*修改验证*/
          ruleModify:{
            name: [
              { type:'string',required: true, message: '输入用户名', trigger: 'blur' }
            ],
            loginName: [
              { type:'string',required: true, message: '输入登录名', trigger: 'blur' }
            ],
            password: [
              { type:'string',required: true, message: '输入密码', trigger: 'blur' }
            ],
            email: [
              { required: true, message: '输入邮箱', trigger: 'blur' },
              { type:'email', message: '输入正确的邮箱格式', trigger: 'blur' }
            ],
            phone: [
              { required: true, message: '输入手机', trigger: 'blur' },
              { type:'phone', message: '输入正确的手机号', trigger: 'blur' }
            ],
          },
          /*表显示字段*/
          columns1: [
            {
              type: 'selection',
              width: 60,
              align: 'center'
            },
            {
              title: '用户名',
              key: 'name'
            },
            {
              title: '手机',
              key: 'phone'
            },
            {
              title: '邮箱',
              key: 'email'
            },

          ],
          /*表数据*/
          data1: [],
          /*表显示字段*/
          columns2: [
            {
              type: 'selection',
              width: 60,
              align: 'center'
            },
            {
              title: '角色名称',
              width: 120,
              key: 'name'
            },
            {
              title: '描述',
              key: 'describe'
            }
          ],
          /*表数据*/
          data2: [],
          /*data2的临时存储*/
          data2Temp:[],
          /*用户与角色关系列表*/
          relationList:null
        }
      },
      mounted() {
          //初始化表数据
        this.getTable()

      },
      methods:{
        /*pageInfo实体初始化*/
        initPageInfo(){
          this.pageInfo.page = 0;
          this.pageInfo.pageSize = 10;
        },
        /*user实体初始化*/
        initUser(){
          this.user.id = null;
          this.user.name = null;
          this.user.loginName = null;
          this.user.password = null;
          this.user.email = null;
          this.user.phone=null;
        },
        /*userNew实体初始化*/
        initUserNew(){
          this.userNew.id = null;
          this.userNew.name = null;
          this.userNew.loginName = null;
          this.userNew.password = null;
          this.userNew.passwordAgain = null;
          this.userNew.email = null;
          this.userNew.phone=null;
        },
        /*userModify实体初始化*/
        initUserModify(){
          this.userModify.id = null;
          this.userModify.name = null;
          this.userModify.loginName = null;
          this.userModify.password = null;
          this.userModify.email = null;
          this.userModify.phone=null;
        },
        /*userNew设置*/
        userSet(e){
          this.user.id = e.id;
          this.user.name = e.name;
          this.user.loginName = e.loginName;
          this.user.password = e.password;
          this.user.email = e.email;
          this.user.phone=e.phone;
        },
        /*userNew设置*/
        userNewSet(e){
          this.userNew.id = e.id;
          this.userNew.name = e.name;
          this.userNew.loginName = e.loginName;
          this.userNew.password = e.password;
          this.userNew.passwordAgain = e.password;
          this.userNew.email = e.email;
          this.userNew.phone=e.phone;
        },
        /*userModify设置*/
        userModifySet(e){
          this.userModify.id = e.id;
          this.userModify.name = e.name;
          this.userModify.loginName = e.loginName;
          this.userModify.password = e.password;
          this.userModify.email = e.email;
          this.userModify.phone=e.phone;
        },
        /*得到表数据*/
        getTable(){
          this.axios({
            method:'get',
            url:'/lesson/user',
            params:{

            }
          }).then(function (res) {
            this.data1=res.data;
            this.total=res.data.totalCount;
            console.log(res)

          }.bind(this)).catch(function (error) {
            alert(error);
          });
        },
        /*新建用户*/
        openNewModal(){
          this.newModal = true;
          this.initUserNew();
          this.data1.sort();
          this.count = 0;
          this.groupId = null;
        },
        /*todo 新建modal的newOk点击事件*/
        newOk (userNew) {
          this.$refs[userNew].validate((valid) => {
            if (valid) {
              if(this.userNew.password == this.userNew.passwordAgain){
                this.initUser();
                this.userSet(this.userNew);
                let data={
                  no:"11",
                  name:this.userNew.name,
                  roleId:3,
                  phone:this.userNew.phone,
                  email:this.userNew.email,
                  password:this.userNew.password,
                  sex:"男"
                }
                this.axios.post('lesson/user/create',data).then(function (response) {
                  this.initUserNew();
                  this.getTable();
                  this.$Message.info('新建成功');
                }.bind(this)).catch(function (error) {
                  alert(error);
                });
                this.newModal = false;
              }else{
                this.$Message.error('两次输入的密码不相同！');
                this.loading = false;
                this.$nextTick(() => {
                  this.loading = true;
                });
              }
            }else {
              this.$Message.error('表单验证失败!');
              setTimeout(() => {
                this.loading = false;
                this.$nextTick(() => {
                  this.loading = true;
                });
              }, 1000);
            }
          })
        },
        /*todo 修改modal的modifyOk点击事件*/
        modifyOk (userModify) {
          this.$refs[userModify].validate((valid) => {
            if (valid) {
              this.initUser();
              this.userSet(this.userModify);
              this.axios({
                method: 'post',
                url: 'lesson/user/edit',
                data: {
                  id:3,
                  no:"",
                  name:this.user.name,
                  roleId:2,
                  phone:this.user.phone,
                  email:this.user.email
                }
              }).then(function (response) {
                this.initUserNew();
                this.$Message.info('修改成功');
              }.bind(this)).catch(function (error) {
                alert(error);
              });
              this.modifyModal = false;
            }else {
              this.$Message.error('表单验证失败!');
              setTimeout(() => {
                this.loading = false;
                this.$nextTick(() => {
                  this.loading = true;
                });
              }, 1000);
            }
          })
        },
        /*todo 删除modal的modifyOk点击事件*/
        delOk (userModify) {
          this.$refs[userModify].validate((valid) => {
            if (valid) {
              this.initUser();
              this.userSet(this.userModify);
              this.axios({
                method: 'put',
                url: 'lesson/user/edit',
                data: {
                  id:3,
                  no:"",
                  name:this.user.name,
                  roleId:2,
                  phone:this.user.phone,
                  email:this.user.email
                }
              }).then(function (response) {
                this.initUserNew();
                this.$Message.info('修改成功');
              }.bind(this)).catch(function (error) {
                alert(error);
              });
              this.modifyModal = false;
            }else {
              this.$Message.error('表单验证失败!');
              setTimeout(() => {
                this.loading = false;
                this.$nextTick(() => {
                  this.loading = true;
                });
              }, 1000);
            }
          })
        },
        /*modal的cancel点击事件*/
        cancel () {
          this.$Message.info('点击了取消');
        },
      }
    }
</script>

<style scoped>

</style>
