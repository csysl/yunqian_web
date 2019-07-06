<template>
  <div style="margin: 20px;">
    <div>
      <ul>
        <li>
          <Button type="success" icon="wrench" @click="openModifyModal()">修改</Button>
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
  </div>

</template>

<script>
    export default {
        name: "role",
      data () {
        return {
          /*选择的数量*/
          count:null,
          /*选中的组数据*/
          groupId:null,
          /*新建modal的显示参数*/
          newModal:false,
          /*修改modal的显示参数*/
          modifyModal:false,
          /*权限modal的显示参数*/
          settingModal:false,
          /*分页total属性绑定值*/
          total:0,
          /*loading*/
          loading: true,
          /*pageInfo实体*/
          pageInfo:{
            page:0,
            pageSize:10
          },
          /*role实体*/
          role:{
            id:null,
            name:null,
            modules:null,
            describe:null
          },
          /*用于添加的role实体*/
          roleNew:{
            id:null,
            name:null,
            modules:null,
            describe:null
          },
          /*用于修改的role实体*/
          roleModify:{
            id:null,
            name:null,
            modules:null,
            describe:null
          },
          /*新建验证*/
          ruleNew:{
            name: [
              { type:'string',required: true, message: '输入角色名', trigger: 'blur' }
            ]
          },
          /*修改验证*/
          ruleModify:{
            name: [
              { type:'string',required: true, message: '输入角色名', trigger: 'blur' }
            ]
          },
          /*表显示字段*/
          columns1: [
            {
              type: 'selection',
              width: 60,
              align: 'center'
            },
            {
              title: '角色名',
              key: 'name'
            },
            {
              title: '描述',
              key: 'roleId'
            },
            {   title: '操作',
              key: 'action',
              width: 180,
              align: 'center',
              render: (h, params) => {
                return h('div', [ h('Button',
                  {
                    props: { icon:'ios-arrow-dropright' },
                    style: {border:'none',background:'none' },
                    on: {
                      click: () => {
                        this.setting(params.row);
                      }
                    }
                  }, )
                ]);
              }
            }
          ],
          /*表数据*/
          data1: [],
          /*表显示字段*/
          columns2: [
            {
              title: '权限',
              key: 'name'
            },
            {
              title: '操作',
              align: 'center',
              render: (h, params) => {
                return h('div',[
                  h('i-switch',{
                    attrs:{
                      'value' : params.row.value
                    },
                    on:{
                      'on-change':(val)=>{
                        var i = this.moduleArr.indexOf(params.row.id+'');
                        if(val){
                          if(i == -1){
                            this.moduleArr.push(params.row.id+'');
                          }
                        }else{
                          if(i != -1){
                            this.moduleArr.splice(i,1);
                          }
                        }
                      }
                    }
                  })
                ]);
              }
            }
          ],
          /*表数据*/
          data2: [],
          /*临时存储权限的数组*/
          moduleArr:[],
          /*二级菜单列表*/
          submenusList:[]
        }
      },
      mounted() {
          this.getTable()
      },
      methods:{
        /*得到表数据*/
        getTable(){
          this.axios({
            method:'get',
            url:'/lesson/user',
            params:{

            }
          }).then(function (res) {
            this.data1=res.data;
            for(let i in this.data1){
              switch (this.data1[i]["roleId"]) {
                case 1:
                  this.data1[i]["roleId"]="教师";
                  break;
                case 2:
                  this.data1[i]["roleId"]="学生";
                  break;
                case 3:
                  this.data1[i]["roleId"]="管理员";
              }
              console.log(this.data1[i]["roleId"])
            }
            this.total=res.data.totalCount;
            console.log(res)

          }.bind(this)).catch(function (error) {
            alert(error);
          });
        },
      }
    }
</script>

<style scoped>

</style>
