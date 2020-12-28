<template>
  <div>
    <!-- <el-breadcrumb separator-class="el-icon-arrow-right" class="bread">
      <el-breadcrumb-item :to="{ path: '/workOrder/Orderdetails/index' }">工单管理</el-breadcrumb-item>
      <el-breadcrumb-item >工单信息</el-breadcrumb-item>
    </el-breadcrumb> -->
      <div class= "topButton" style="white-space: nowrap;min-width:800px">
        <el-row >
          <el-col :span="6">
            <el-tooltip content="点击终止" placement="top" >
                <el-button  icon ="el-icon-close-notification"  @click="stop()"  type="warning" size ="small" round>终止</el-button>
            </el-tooltip>
                <el-tooltip content="点击查看"  placement="top"> 
                  <el-button icon = "el-icon-thumb" @click="seeWatch()"  type="primary" size ="small" round>查看</el-button>
            </el-tooltip>

             </el-tooltip>
            <el-tooltip content="点击删除"  placement="top"> 
                <el-button  icon ="el-icon-delete" plain  v-waves type="danger"  size ="small" round v-if="multipleSelectionFlag" @click="delallOrder()">批量删除</el-button>
                  <!-- <el-button icon = "el-icon-delete" @click="delallOrder()"  type="danger" size ="small" round>删除</el-button> -->
            </el-tooltip>
          </el-col>                       
      </el-row>
      <el-row class="search" :gutter="20">
        <el-col :span ="4">
          <el-select v-model="t.id" placeholder="请选择资产类型"  @change="assetTypeClass(t.id)" class="size-full">
            <el-option v-for="item in assetTypeClassArr"
              :key="item.id"
              :value="item.id"
              :label="item.assetsTypeName" >
            </el-option>
          </el-select>
        </el-col>
       <!-- <el-col :span ="4">
          <el-select v-model="t.assetSubtype" placeholder="请选择资产子级类型" class="size-full">
            <el-option v-for="item in assetSubtypeClassArr"
              :key="item.id"
              :value="item.superclassId"
              :label="item.assetsTypeName" >
            </el-option>
          </el-select>               
        </el-col> -->
         <el-col :span ="4">
          <el-select v-model="t.assetSubtype" placeholder="请选择资产子级类型" class="size-full">
            <el-option v-for="item in assetSubtypeClassArr"
              :key="item.id"
              :value="item.id"
              :label="item.assetsTypeName" >
            </el-option>
          </el-select>               
        </el-col>
        <el-col :span ="4">
          <el-input
          placeholder="请输入工单名称"
          v-model="t.workOrderName"    >
        </el-input>
      </el-col>
      <el-col :span ="4">
          <el-input
          placeholder="请输入工单编号"                  
          v-model="t.workOrderNumber"      >
        </el-input>
      </el-col>              
      </el-row>
      <el-row class="search" :gutter="20">
        <el-col :span ="4">
          <el-input
          placeholder="请输入工单负责人"                
          v-model="t.workOrderPerson"      >
        </el-input>
      </el-col>    
        <el-col :span ="4">             
        <el-select v-model="t.workOrderSource" placeholder="请选择工单来源">
            <el-option   v-for="item in options4"
                :key="item.value"
                :label="item.label"
                :value="item.value"
                :disabled="item.disabled">                   
                </el-option>                
            </el-select>
      </el-col>
        <el-col :span ="4">
          <el-select v-model="t.workOrderState" placeholder="请选择工单状态">
              <el-option   v-for="item in options3"
                :key="item.value"
                :label="item.label"
                :value="item.value"
                :disabled="item.disabled">                   
                </el-option>                
            </el-select>
      </el-col>              
        <el-col :span ="4">
            <el-select v-model="t.workOrderType" placeholder="请选择工单类型"  >
          <el-option
            v-for="item in optionWorkOrderType"
            :key="item.value"
            :label="item.label"
            :value="item.value" >
          </el-option>
        </el-select>  
      </el-col> 
        <el-col :span ="3">
            <el-button type="primary" plain  icon="el-icon-search" v-waves   @click="selected()" size ="medium"  >查询</el-button>
        </el-col> 
          <el-col :span ="2" >
            <el-button  icon="el-icon-refresh"  type="danger" plain  v-waves   @click="reset()" size ="medium"  >重置</el-button>                    
        </el-col>                     
      </el-row> 
  </div>
    <div class="main_list">
        <el-table stripe  border
        ref="multipleTable"
        :data="tableData"
        tooltip-effect="dark"
        style="width: 100%;marginTop:10px"
        :row-class-name="tableRowClassName"
        @selection-change="handleSelectionChange" :cell-style="rowClass" :header-cell-style="headClass">
  
          <el-table-column type="selection"  ></el-table-column>
          <el-table-column   fixed prop="workOrderName" label="工单名称" > <template slot-scope="scope">{{scope.row.workOrderName}}</template></el-table-column>
          <el-table-column   prop="workOrderNumber" label="工单编号" > <template slot-scope="scope">{{scope.row.workOrderNumber}}</template></el-table-column>
          <el-table-column     prop="workOrderType" label="工单类型"><template slot-scope="scope">{{scope.row.workOrderType |workOrderTypes}}</template></el-table-column>
          <el-table-column    prop="isRescan" label="复扫状态"> <template slot-scope="scope">{{scope.row.isRescan==0?"已通过":"未通过"}}</template> </el-table-column> 
          <el-table-column   prop="workOrderState" label="工单状态"><template slot-scope="scope">{{scope.row.workOrderState==1?"进行中":"已终止"}}</template>  </el-table-column>      
          <el-table-column   prop="workOrderSource" label="工单来源"><template slot-scope="scope">{{scope.row.workOrderSource==1?"系统派发":"人工派发"}}</template>  </el-table-column>          
          <el-table-column     prop="workOrderPerson" label="工单负责人"><template slot-scope="scope">{{scope.row.workOrderPerson}}</template>  </el-table-column>
          <el-table-column    prop="personMail" label="工单负责人邮箱"><template slot-scope="scope">{{scope.row.personMail}}</template>  </el-table-column>
          <el-table-column   prop="personPhone" label="工单负责人电话"><template slot-scope="scope">{{scope.row.personPhone}}</template>  </el-table-column>
          <el-table-column    prop="workOrderDesc" label="工单描述"><template slot-scope="scope">{{scope.row.workOrderDesc}}</template>  </el-table-column>
             <el-table-column align="center"   prop="createTime" label="创建时间"><template slot-scope="scope">{{scope.row.createTime}}</template></el-table-column>
          <!-- <el-table-column    prop="repairDesc" label="修复方案描述"><template slot-scope="scope">{{scope.row.repairDesc}}</template></el-table-column> -->
          <el-table-column   prop="workOrderProgress" label="工单进度"><template slot-scope="scope">{{scope.row.workOrderProgress}}</template></el-table-column>
          <el-table-column   prop="Scan" label="操作">
          <template slot-scope="scope"> 
            <el-tooltip class="item" effect="dark" content="点击操作" placement="right">
                <i class="el-icon-search" @click="handleEdit(scope.$index, scope.row)"></i>
            </el-tooltip>  
          </template>
        </el-table-column>
      </el-table>
        <div class="block" style="textAlign:center;">
          <el-pagination
          v-show="total>0"
          @size-change="handleSizeChange" background
          @current-change="handleCurrentChange"
          :current-page="currpage"
          :page-sizes="[10,20,50,100]"
          :page-size="pageSize"
          layout="total, sizes, prev, pager, next, jumper"
          :total="total"
        ></el-pagination>
        </div>
      </div>
<!-- 通过id获取工单及对应历史(历史数据分页)弹框 -->
    <el-dialog :title="title1"  width="80%" :visible.sync="dialogFormVisible"    >
      <div class="main_list">
        <el-table stripe  border
        ref="multipleTable"
        :data="tableDatas"
        tooltip-effect="dark"
        style="width: 100%"              
        :row-class-name="tableRowClassName" :header-cell-style="headClass">
        <el-table-column type="selection"></el-table-column>
        <el-table-column align="center"   prop="WorkOrderNumber" label="工单编号" show-overflow-tooltip><template slot-scope="scope">{{scope.row.workOrderNumber}}</template></el-table-column>
        <el-table-column align="center"  prop="workOrderName" label="工单名称" show-overflow-tooltip><template slot-scope="scope">{{scope.row.workOrderName}}</template></el-table-column>
        <el-table-column  align="center"  prop="workOrderType" label="工单类型"><template slot-scope="scope">{{scope.row.workOrderType==0?"第三方组件":"自研应用"}}</template></el-table-column>
        <el-table-column align="center"   prop="isRescan" label="复扫状态"> <template slot-scope="scope">{{scope.row.isRescan==0?"已通过":"未通过"}}</template> </el-table-column>     
        <el-table-column align="center"   prop="workOrderState" label="工单状态"><template slot-scope="scope">{{scope.row.workOrderState==1?"进行中":"已终止"}}</template>  </el-table-column> 
        <el-table-column  align="center"  prop="workOrderSource" label="工单来源"><template slot-scope="scope">{{scope.row.workOrderSource==1?"系统派发":"人工派发"}}</template>  </el-table-column>         
        <el-table-column align="center"   prop="createTime" label="派发时间"><template slot-scope="scope">{{scope.row.createTime}}</template></el-table-column>
        <el-table-column align="center"   prop="workOrderPerson" label="工单负责人"><template slot-scope="scope">{{scope.row.workOrderPerson}}</template></el-table-column>
        <el-table-column align="center"   prop="personMail" label="负责人邮箱"><template slot-scope="scope">{{scope.row.personMail}}</template></el-table-column>
        <el-table-column align="center"   prop="personPhone" label="负责人电话"><template slot-scope="scope">{{scope.row.personPhone}}</template></el-table-column>
        <el-table-column align="center"   prop="workOrderProgress" label="工单进度"><template slot-scope="scope">{{scope.row.workOrderProgress}}</template></el-table-column>
        <el-table-column align="center"   prop="Scan" label="参考">
          <template slot-scope="scope"> 
            <el-tooltip class="item" effect="dark" content="参考" placement="right">
                <i class="el-icon-search" @click="scanlookover(scope.$index, scope.row)"> </i>
            </el-tooltip> 
          </template>
        </el-table-column>        
    </el-table>
    <div class="block">
        <el-pagination
             v-show="total2>0"
          @size-change="handleSizeChange"
          @current-change="handleCurrentChange"
          :current-page="currpage"
          :page-sizes="[10,20,50,100]"
          :page-size="pageSize"
          layout="total, sizes, prev, pager, next, jumper"
          :total="total2"
        ></el-pagination>
    </div>                    
</div>
</el-dialog> 
<!-- 操作修改工单页面 -->
<el-dialog :title="title" center   :visible.sync="dialogformVisible"   width ="900px" >
  <el-form  ref ="form" :model="formDialog" label-width="100px">
      <el-row>
        <el-col :span ="12" :offset="12">
          <el-form-item label="附件下载:" >
                <!-- <i class="el-icon-download" click ="downLoad()" ></i> -->
                <el-button  type="primary"  plain size ="small"   v-waves @click ="downLoad()"> <i class="el-icon-download"  ></i>点击下载</el-button>
            </el-form-item>
        </el-col>
      </el-row>
      <el-row >          
      </el-row>
      <el-row>
          <el-col :span ="12">
            <el-form-item label="工单类型:" prop="workOrderType">
                <el-input v-model="formDialog.workOrder.workOrderType==0?'第三方组件':'自研应用'" :disabled ="disable"></el-input>
                 <!-- <span>{{ formDialog.workOrder.workOrderType | workOrderTypes }}</span> -->
              </el-form-item>
          </el-col>
          <el-col :span ="12">
            <el-form-item label="工单名称:" prop="workOrderName">
                <el-input v-model="formDialog.workOrder.workOrderName"  :disabled ="disable"></el-input>
              </el-form-item>
          </el-col>    
      </el-row> 
      <el-row>
        <el-col :span ="12">
          <el-form-item label="工单编号:" prop="workOrderNumber">
              <el-input v-model="formDialog.workOrder.workOrderNumber" :disabled ="disable"></el-input>
            </el-form-item>
        </el-col>
        <el-col :span ="12">
          <el-form-item label="工单描述:" prop="workOrderDesc">
              <el-input v-model="formDialog.workOrder.workOrderDesc" :disabled ="disable" ></el-input>
            </el-form-item>
        </el-col>
      </el-row> 
       <el-row>
        <el-col :span ="12">
          <el-form-item label="漏洞名称:" prop="leakName">
              <el-input v-model="formDialog.repairLoopholeLibrary.leakName" :disabled ="disable"></el-input>
            </el-form-item>
        </el-col>
        <el-col :span ="12">
          <el-form-item label="漏洞发现人:" prop="leakDiscoverer">
              <el-input v-model="formDialog.repairLoopholeLibrary.leakDiscoverer" :disabled ="disable"></el-input>
            </el-form-item>
        </el-col>           
      </el-row> 
                  
      <el-row >
          <el-col :span ="12">
            <el-form-item label="漏洞位置:" prop="leakTargetLocaltion">
                <el-input v-model="formDialog.repairLoopholeLibrary.leakTargetLocaltion" :disabled ="disable"></el-input>
              </el-form-item>
          </el-col>
        <el-col :span ="12">
          <el-form-item label="漏洞等级:" prop="leakLevel">
              <el-input v-model="formDialog.repairLoopholeLibrary.leakLevel" :disabled ="disable"></el-input>
            </el-form-item>
        </el-col>
      </el-row>
      <el-row>
        <el-col :span ="12">
          <el-form-item label="漏洞修复人:" prop="repairOpinion">
              <el-input v-model="formDialog.repairLoopholeLibrary.repairOpinion" :disabled ="disable"></el-input>
            </el-form-item>
        </el-col>
        <el-col :span ="12">
          <el-form-item label="负责人邮箱:" prop="restorerMail">
              <el-input v-model="formDialog.workOrder.personMail" :disabled ="disable"></el-input>
            </el-form-item>
        </el-col>
      </el-row>
      <el-row>
        <el-col :span ="12">
          <el-form-item label="资产版本:" prop="assetVersion">
              <el-input v-model="formDialog.repairLoopholeLibrary.assetVersion" :disabled ="disable"></el-input>
            </el-form-item>
        </el-col>
        <el-col :span ="12">
          <el-form-item label="负责人电话:" prop="personPhone">
              <el-input v-model="formDialog.workOrder.personPhone" :disabled ="disable"></el-input>
            </el-form-item>
        </el-col>
      </el-row>
       <el-row>
          <el-col :span ="12">
            <el-form-item label="修复状态:" prop="repairStatus">
              <el-input v-model="formDialog.repairLoopholeLibrary.repairStatus" :disabled ="disable"></el-input>
            </el-form-item>
         </el-col>
    
        <el-col :span ="12">
          <el-form-item label="漏洞附件名称:" prop="leakEnclosureName">
              <el-input v-model="formDialog.repairLoopholeLibrary.leakEnclosureName" :disabled ="disable"></el-input>
            </el-form-item>
        </el-col>           
      </el-row> 
       <el-row>
     
    
      </el-row> 
      <el-row >
            <el-col :span="12">                       
            <el-form-item   label="复扫状态:" prop ="isRescan"> 
                  <el-select v-model="formDialog.workOrder.isRescan"  placeholder="请选择">
                    <el-option
                      v-for="item in options1"
                      :key="item.value"
                      :label="item.label"
                      :value="item.value">
                    </el-option>
                  </el-select>
            </el-form-item>   
        </el-col>
          <el-col :span="12">                       
            <el-form-item   label="修复进度:" prop ="workOrderProgress">  
              <el-select v-model="formDialog.workOrder.workOrderProgress"  placeholder="请选择">
                <el-option
                  v-for="item in options2"
                  :key="item.label"
                  :label="item.label"
                  :value="item.value">
                </el-option>
              </el-select>
              <!-- <el-input v-model="formDialog.workOrder.workOrderProgress" ></el-input> -->
            </el-form-item>   
        </el-col>
      </el-row>
    <el-row >
      <el-col >           
          <el-form-item  label="修复方案描述:"  prop ="repairDesc"> 
            <el-input
              type="textarea"
              placeholder="请输入内容"
              v-model="formDialog.repairLoopholeLibrary.repairDesc"
              maxlength="60"
              show-word-limit
            >
            </el-input>
          </el-form-item>
      </el-col>
  </el-row>
      <el-row  style="textAlign:center">
      <el-col >           
            <el-button type ="primary"   size="medium" class="y-btns save" @click="submitForm()" >保存</el-button>
            <el-button type ="danger"  size ="medium" class="y-btns reset" @click="resetForm()">重置</el-button>
          
      </el-col>
  </el-row>                
  </el-form>                       
</el-dialog>                      
</div>
</template>

<script>
  import axios from "axios"
  import waves from '@/directive/waves/index.js' // 水波纹指令
  import { getWorkOrderOrHistory,getWorkOrderRepair,endTermination,workOrderPageCondition,operation,downloadAttachment,delallworkOrder} from "@/api/workOrder"
  import {getAssetSubType,getAssetParentType} from "@/api/assetsType"
  export default {
    name:'',
    data () {
      return {
          content:"",
          title1:"历史解决方案",
          title:"工单操作",
          show:false,
          content:"",
          disabled:false,
          searchDisable:true,
          WorkOrderId:"",
          WorkOrderIds:"",
          dialogformVisible:false,
          dialogFormVisible:false,
          multipleSelectionFlag:false,
          repairLoopholeLibrary:{},
          pageNum:"",
          textarea:'',
          dataSlection:[],
          assetTypeClassArr:[],
         assetSubtypeClassArr:[],
          disable:true,
          value:"",
           form: {
            name:"",
            address:'',
            stadus:"",
            type: [],
            resource: '',
            desc: '',
            re:''
        },
           optionWorkOrderType:[
              {
              value:"0",
              label: '第三方组件'
            }, {
              value:"1",
              label: '自研应用'
            },
            
          ],
          t:{
            id:null,
            assetSubtype:null,
            assetType:null,
            workOrderName:null,
            workOrderNumber: null,
            workOrderPerson: null,
            workOrderSource: null,
            workOrderState: null,
            workOrderType: null
          },
          formDialog:{
              repairLoopholeLibrary:{
                    assetClass:null, //资产分类
                    assetSubtype:null,  //资产应用子类型
                    leakTargetLocaltion:null,  //漏洞目标位置
                    assetType:null,   //资产类型
                    leakLevel:null,   //漏洞等级
                    restorer:null,  //修复人
                    restorerMail:null,  //"修复人邮箱
                    assetVersion:null,  //资产版本
                    restorerPhone:null,  //修复人电话
                    repairDesc:null,  //修复方案描述
                    repairStatus:null, //修复状态（结果
              },
              workOrder:{
                isRescan:"",
                workOrderProgress:"",
                workOrderType:"",
                workOrderName:"" ,//工单名称
                workOrderDesc:"", //工单描述
                workOrderNumber:"",//工单编号
                workOrderPerson:"", //工单你负责人
                personMail:"" ,//工单你负责人邮箱
                personPhone:"" //工单负责人电话
              }

          },
           options3:[
            {
              value: '1',
              label: '进行中'
            }, {
              value: '2',
              label: '已终止'
            },
          ],
            options4:[
            {
              value: '1',
              label: '系统派发'
            }, {
              value: '2',
              label: '人工派发'
            },
          ],
           options1:[
             {
              value: '0',
              label: '已通过'
            },
             {
              value: '1',
              label: '未通过'
            }, 
          ],
            options2:[      
             {
              value: '10%',
              label: '10%'
            }, 
             {
              value: '20%',
              label: '20%'
            }, 
             {
              value: '30%',
              label: '30%'
            }, 
             {
              value: '40%',
              label: '40%'
            }, 
             {
              value: '50%',
              label: '50%'
            }, 
             {
              value: '60%',
              label: '60%'
            }, 
             {
              value: '70%',
              label: '70%'
            }, 
             {
              value: '80%',
              label: '80%'
            }, 
             {
              value: '90%',
              label: '90%'
            }, 
             {
              value: '100%',
              label: '100%'
            }, 
          ],
        ftdsPath:"",
        attachmentName:"",
        pageSize: 10,  //每页显示条数
        currpage:1,    //当前页
        pageNum:1, //当前页
        total:0,
        total2:0,
        multipleSelection:[],
        formLabelWidth: '120px',
        textarea:'',
        tableDatas:[],
        tableData:[
        ]

      };
    },

    components: {
      // watchWorkOrder
    },

    computed: {

    },
    filters:{
       workOrderTypes(status){
         const workOrderTypes = {
            0:"第三方组件",
            1:"自研应用"
        }
        return workOrderTypes[status]
     },
      leakLevel(status){
        const leakLevel = {
            1:"低",
            2:"中",
            3:"高"
        }
        return leakLevel[status]
     }
    },
     directives: {
      waves
    },
    mounted() {   
       getAssetParentType().then(res =>{
          // console.log("res父级类型",res.data.data)
          this.assetTypeClassArr = res.data.data
          
        })
    },
    created(){
     this.gettableData()
     
    },
    methods: { 
      gettableData(){
          workOrderPageCondition({pageNum: this.currpage,pageSize: this.pageSize*1,t:{}}).then( res=>{
          this.tableData =res.data.datas;
          this.total = res.data.totalNum
      
        
        })
      }, 
      //批量删除工单
      delallOrder(){
            this.$confirm('此操作将永久删除这些工单, 是否继续?', '提示', {
              confirmButtonText: '确定',
              cancelButtonText: '取消',
              type: 'warning'       
           }).then(()=>{
                delallworkOrder({workOrderIds:this.WorkOrderIds}).then(res =>{
                  if(res.data.code==0){
                        this.gettableData()
                        this.$message.success(res.data.msg)
                  }else{
                      this.$message.error(res.data.msg)
                  }
                })
           })
      },

       //获取子级列表
      assetTypeClass(params){
         this.t.assetSubtype =null
        getAssetSubType({superclassId:params}).then(res =>{
          this.assetSubtypeClassArr = res.data.data;  
        })
        
      },
        reset(){          
            this.t.assetSubtype=null;
            this.t.id=null;
            this.t.workOrderName=null
            this.t.workOrderNumber= null
            this.t.workOrderPerson=null
            this.t.workOrderSource= null
            this.t. workOrderState=null
            this.t. workOrderType=null
            this.$message({
                  type: 'success',
                  message: '所有搜索项已为空'
              }); 
        },
         headClass() { //表头居中显示
                    return "text-align:center"
        },
        rowClass() { //表头居中显示
                    return "text-align:center"
       },
        selected(){
           this.searchDisable =false
          if (this.t.assetSubtype||this.t.id||this.t.workOrderName||this.t.workOrderNumber||this.t.workOrderPerson||this.t.workOrderSource||this.t. workOrderState||this.t.workOrderType) {
              workOrderPageCondition({pageNum:this.currpage,pageSize: this.pageSize*1,t:{
              assetType:this.t.id,  //资产类型
              assetSubtype:this.t.assetSubtype,  //资产应用子类型
              workOrderName:this.t.workOrderName,  //工单名称
              workOrderNumber: this.t.workOrderNumber, //工单编号
              workOrderPerson: this.t.workOrderPerson, //工单负责人
              workOrderSource: this.t.workOrderSource,  //工单来源：1、系统派发，2、人工派发",
              workOrderState: this.t.workOrderState, //工单状态：1、进行中，2、已终止",
              workOrderType: this.t.workOrderType  //工单类型：1、第三方组件，2、自研应用"
            }}).then( res=>{
              this.tableData =res.data.datas
              this.total = res.data.totalNum
        
          })
            
          }else{
            this.gettableData()
          }
        
        },
        handleSizeChange(val) {
          this.pageSize = val;
          // console.log(`每页 ${val} 条`);
           this.gettableData()
           this.selected()
        },
        handleCurrentChange(val) {
          this.currpage = val;
          this.pageNum = val
          this.gettableData()
          // this.selected()
          // console.log(`当前页: ${val}`);
        },
        tableRowClassName({ row, rowIndex }) {
          for (var i = 0; i < this.multipleSelection.length; i++) {
            if (this.multipleSelection[i] == row) {
              return "warning-row";
            }
          }
          return "";
        },
//表格每行选中的数据
      handleSelectionChange(val) {
        this.multipleSelection = val;
        if (this.multipleSelection.length > 1) {   
        // 如不进行判断则勾选完毕后批量删除按钮还是会在
          this.multipleSelectionFlag = true;
        }else{
              this.multipleSelectionFlag = false;
        }  
        this.dataSlection = [];
        val.forEach( item =>{
          this.dataSlection.push(item.id)
        })
        this.WorkOrderId = this.dataSlection
        this.WorkOrderIds = this.dataSlection.join(",")          
      }, 
    //参考页面按钮
      scanlookover(index,row){
        this.WorkOrderId =row.id;
        this.$router.push({path:"/workOrder/Orderdetails/Solution",query:{WorkOrderId:this.WorkOrderId}})  
      },
      // 查看按钮 
      seeWatch(){
        if(this.dataSlection.length <= 0) {
          this.$message.info("请选择要查看的数据");
          return;
        } else if(this.dataSlection.length > 1) {
          this.$message.error("只能选择一条数据进行查看");
        } else {
           //通过id获取工单及对应历史(历史数据分页）  
            this.dialogFormVisible = true;     
              getWorkOrderOrHistory({
                WorkOrderId:this.WorkOrderId*1, 
                currentPage:this.pageNum,       
                pageSize:this.pageSize}).then(res=>{
               if(res.data.code =="0"){
                  this.tableDatas = res.data.data.workOrders
                 this.total2 =res.data.totalNum
               }
            })
        }          
      },
       //终止按钮
      stop(){ 
         if (this.dataSlection.length <= 0) {
          this.$message.warning("至少一个工单才能终止！");
         } else {
           
            this.$confirm('此操作将终止该工单, 是否继续?', '提示', {
              confirmButtonText: '确定',
              cancelButtonText: '取消',
              type: 'warning'
              
           }).then(()=>{
                endTermination({WorkOrderIds:this.WorkOrderIds}).then(res =>{
                // if( res.data.msg=="操作成功！终止了0条工单！"){
                //     this.$alert('此工单已经被终止', '提示', {
                //       confirmButtonText: '确定',
                //       type: 'warning'
                      
                //   })
                // }
                if(res.data.code =="0"){
                  this.gettableData()
                  this.$message({
                    showClose: true,
                    message: res.data.msg,
                    type: 'success'
                  });
                }
              })
           })
        
         }
        },
      // 操作选项
      handleEdit(index,row){
        this.dialogformVisible = true;
        this.WorkOrderId =row.id;
        //回显接口
        getWorkOrderRepair({ WorkOrderId:this.WorkOrderId*1}).then(res =>{
          this.formDialog.workOrder.isRescan =res.data.data.workOrder.isRescan;
          this.formDialog.workOrder.workOrderProgress = res.data.data.workOrder.workOrderProgress;
          this.formDialog.workOrder.workOrderType = res.data.data.workOrder.workOrderType; 
          this.formDialog.workOrder.workOrderName =res.data.data.workOrder.workOrderName; 
          this.formDialog.workOrder.workOrderDesc =res.data.data.workOrder.workOrderDesc; 
          this.formDialog.workOrder.workOrderNumber =res.data.data.workOrder.workOrderNumber; 
          this.formDialog.workOrder.workOrderPerson =res.data.data.workOrder.workOrderPerson;
          this.formDialog.workOrder.personMail =res.data.data.workOrder.personMail;
          this.formDialog.workOrder.personPhone =res.data.data.workOrder.personPhone;
           
          this.formDialog.repairLoopholeLibrary.repairDesc =res.data.data.repairLoopholeLibrary.repairDesc;
          this.formDialog.repairLoopholeLibrary.repairOpinion =res.data.data.repairLoopholeLibrary.repairOpinion;
          this.formDialog.repairLoopholeLibrary.assetClass =res.data.data.repairLoopholeLibrary.assetClass;
          this.formDialog.repairLoopholeLibrary.repairStatus =res.data.data.repairLoopholeLibrary.repairStatus=="0"?"已完成":"未完成";
          this.formDialog.repairLoopholeLibrary.leakTargetLocaltion = res.data.data.repairLoopholeLibrary.leakTargetLocaltion;
          this.formDialog.repairLoopholeLibrary.leakLevel =  res.data.data.repairLoopholeLibrary.leakLevel 
          this.formDialog.repairLoopholeLibrary.leakName =  res.data.data.repairLoopholeLibrary.leakName 
          this.formDialog.repairLoopholeLibrary.leakDiscoverer =  res.data.data.repairLoopholeLibrary.leakDiscoverer 
          this.formDialog.repairLoopholeLibrary.leakEnclosure =  res.data.data.repairLoopholeLibrary.leakEnclosure 
          this.formDialog.repairLoopholeLibrary.leakEnclosureName =  res.data.data.repairLoopholeLibrary.leakEnclosureName 
          if(res.data.data.repairLoopholeLibrary.leakLevel==1 ){
                this.formDialog.repairLoopholeLibrary.leakLevel ="低"
          }else if(res.data.data.repairLoopholeLibrary.leakLevel==2){
            this.formDialog.repairLoopholeLibrary.leakLevel ="中"
          }else{
               this.formDialog.repairLoopholeLibrary.leakLevel ="高"
          }
          // if( res.data.data.workOrder.workOrderType==0){
          //    this.formDialog.workOrder.workOrderType ="第三方组件"
          // }else{
          //    this.formDialog.workOrder.workOrderType ="自研应用"
          // }
          this.formDialog.repairLoopholeLibrary.restorer = res.data.data.repairLoopholeLibrary.restorer;
          this.formDialog.repairLoopholeLibrary.restorerMail = res.data.data.repairLoopholeLibrary.restorerMail;
          this.formDialog.repairLoopholeLibrary.assetVersion = res.data.data.repairLoopholeLibrary.assetVersion;
          this.formDialog.repairLoopholeLibrary.restorerPhone = res.data.data.repairLoopholeLibrary.restorerPhone;
       })
      },
      // 保存修改
      submitForm(){
        this.dialogformVisible =false;
            operation({
              repairLoopholeLibrary: { 
                repairDesc: this.formDialog.repairLoopholeLibrary.repairDesc,
                repairStatus:this.formDialog.repairLoopholeLibrary.repairStatus
                
            },
              workOrder: {        
                id: this.WorkOrderId,
                isRescan: this.formDialog.workOrder.isRescan,
                workOrderProgress: this.formDialog.workOrder.workOrderProgress              
              }
          }).then(res =>{
            this.gettableData() 
          //  this.formDialog.repairLoopholeLibrary.repairDesc = this.formDialog.repairLoopholeLibrary.repairDesc
           
          })
      },
      resetForm(){
        this.formDialog.workOrder.isRescan =null;
        this.formDialog.workOrder.workOrderProgress =null;
        this.formDialog.repairLoopholeLibrary.repairDesc =null;
      },
     downLoad(){ 
        downloadAttachment({
          ftdsPath: this.formDialog.repairLoopholeLibrary.leakEnclosure,
          attachmentName:this.formDialog.repairLoopholeLibrary.leakEnclosureName}).then(res =>{
        })
          window.location.href =`/woc/downloadAttachment?ftdsPath=${this.formDialog.repairLoopholeLibrary.leakEnclosure}&&attachmentName=${this.formDialog.repairLoopholeLibrary.leakEnclosureName}`         
     }
      
      },
    watch: {
    
      
    }

  }

</script>
<style lang='scss' scoped>
  .search{
    margin:15px ;
  }
  .block{
    text-align: center ;
    margin-top: 20px;
  }
  .topButton{
   margin-top: 50px;
  }


  

</style>