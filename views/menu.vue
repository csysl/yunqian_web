<template>
  <div style="margin: 20px;">
    <div>
      <Row style="margin-bottom: 25px;">
      </Row>
    </div>
    <div>
      <ul>
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
        name: "menu",
      data () {
        return {
          /*用于查找的菜单id*/
          menuId:null,
          /*选择的数量*/
          count:null,
          /*选中的组数据*/
          groupId:null,
          /*新建modal的显示参数*/
          newModal:false,
          /*修改modal的显示参数*/
          modifyModal:false,
          /*分页total属性绑定值*/
          total:0,
          /*loading*/
          loading: true,
          /*pageInfo实体*/
          pageInfo:{
            page:0,
            pageSize:10
          },
          /*menu实体*/
          menu:{
            id:null,
            name:null,
            url:null,
            parentId:null,
            sort:null,
            remark:null,
            icon:null
          },
          /*用于添加的menu实体*/
          menuNew:{
            id:null,
            name:null,
            url:null,
            parentId:null,
            sort:null,
            remark:null,
            icon:null
          },
          /*用于修改的menu实体*/
          menuModify:{
            id:null,
            name:null,
            url:null,
            parentId:null,
            sort:null,
            remark:null,
            icon:null
          },
          /*新建验证*/
          ruleNew:{
            name: [
              { type:'string',required: true, message: '输入菜单名', trigger: 'blur' }
            ],
            url: [
              { type:'string',required: true, message: '输入路径', trigger: 'blur' }
            ],
            parentId: [
              { required: true, message: '输入父类ID', trigger: 'blur' },
              {validator(rule, value, callback) {
                  if (!Number.isInteger(+value)) {
                    callback(new Error('请输入数字'));
                  } else {
                    callback();
                  }

                }, trigger: 'blur'}
            ],
            sort: [
              { required: true, message: '输入排序', trigger: 'blur' },
              {validator(rule, value, callback) {
                  if (!Number.isInteger(+value)) {
                    callback(new Error('请输入数字'));
                  } else {
                    callback();
                  }

                }, trigger: 'blur'}
            ],
            icon: [
              { type:'string',required: true, message: '输入图标', trigger: 'blur' }
            ]
          },
          /*修改验证*/
          ruleModify:{
            name: [
              { type:'string',required: true, message: '输入菜单名', trigger: 'blur' }
            ],
            url: [
              { type:'string',required: true, message: '输入路径', trigger: 'blur' }
            ],
            parentId: [
              { required: true, message: '输入父类ID', trigger: 'blur' },
              {validator(rule, value, callback) {
                  if (!Number.isInteger(+value)) {
                    callback(new Error('请输入数字'));
                  } else {
                    callback();
                  }

                }, trigger: 'blur'}
            ],
            sort: [
              { required: true, message: '输入排序', trigger: 'blur' },
              {validator(rule, value, callback) {
                  if (!Number.isInteger(+value)) {
                    callback(new Error('请输入数字'));
                  } else {
                    callback();
                  }

                }, trigger: 'blur'}
            ],
            icon: [
              { type:'string',required: true, message: '输入图标', trigger: 'blur' }
            ]
          },
          /*菜单列表*/
          menuList:[],
          /*生产类型表显示字段*/
          columns1: [
            {
              type: 'selection',
              width: 60,
              align: 'center'
            },
            {
              title: '菜单ID',
              key: 'id'
            },
            {
              title: '菜单名称',
              key: 'name'
            },
            {
              title: '地址',
              key: 'url'
            },
            {
              title: '上级菜单id',
              key: 'parentId'
            },
            {
              title: '排序',
              key: 'sort'
            },
            {
              title: '图标',
              key: 'icon'
            }
          ],
          /*生产类型表数据*/
          data1: []
        }
      },
      mounted() {
      },
      methods:{

      }
    }
</script>

<style scoped>

</style>
