<template>
  <div>
      <!-- 工单详情页面下载 -->         
    <div class ="workorderDetail">
        <el-form  ref ="form" :model="formData" label-width="130px" label-position ="left">
          <el-row>
             <el-col :span ="12" >
              <el-form-item  >
                    <!-- <i class="el-icon-download" click ="downLoad()" ></i> -->
                    <el-button  type="primary"  plain size ="small"   v-waves @click ="back()"> 返回上一页面</el-button>
                </el-form-item>
            </el-col>
            <el-col :span ="12"  >
              <el-form-item  >
                    <!-- <i class="el-icon-download" click ="downLoad()" ></i> -->
                    <el-button  type="primary"  plain size ="small"   v-waves @click ="downLoad()"> <i class="el-icon-download"  ></i>点击下载附件</el-button>
                </el-form-item>
            </el-col>
          </el-row>
          <el-row > 
            <el-col :span ="8" :offset="5">
              <el-form-item label="工单类型:" prop="type">
                  <!-- <el-input v-model="formDialog.workOrder.workOrderType" :disabled ="disable"></el-input> -->
                  <span>{{formDialog.workOrder.workOrderType}}</span>
                </el-form-item>
            </el-col>
              <el-col :span ="8" >
                <el-form-item label="漏洞位置:" prop="leakTargetLocaltion">
                    <!-- <el-input v-model="formDialog.repairLoopholeLibrary.leakTargetLocaltion" :disabled ="disable"></el-input> -->
                    <span>{{formDialog.repairLoopholeLibrary.leakTargetLocaltion}}</span>
                  </el-form-item>
              </el-col>
          </el-row>
          <el-row>
              <el-col :span ="8" :offset="5">
                <el-form-item label="漏洞等级:" prop="leakLevel">
                    <!-- <el-input v-model="formDialog.repairLoopholeLibrary.leakLevel" :disabled ="disable"></el-input>
                     -->
                     <span>{{formDialog.repairLoopholeLibrary.leakLevel}}</span>
                  </el-form-item>
              </el-col>
                  <el-col :span ="8" >
                <el-form-item label="资产名称:" prop="assetName">
                    <!-- <el-input v-model="formDialog.repairLoopholeLibrary.assetName" :disabled ="disable"></el-input> -->
                    <span>{{formDialog.repairLoopholeLibrary.assetName}}</span>
                  </el-form-item>
              </el-col>
              
          </el-row>                   
          <el-row >
          
            <el-col :span ="8" :offset="5">
              <el-form-item label="漏洞修复人:" prop="restorer">
                  <!-- <el-input v-model="formDialog.repairLoopholeLibrary.restorer" :disabled ="disable"></el-input> -->
                  <span>{{formDialog.repairLoopholeLibrary.restorer}}</span>
                </el-form-item>
            </el-col>
              <el-col :span ="8">
              <el-form-item label="修复人邮箱:" prop="restorerMail">
                  <!-- <el-input v-model="formDialog.repairLoopholeLibrary.restorerMail" :disabled ="disable"></el-input> -->
                  <span>{{formDialog.repairLoopholeLibrary.restorerMail}}</span>
                </el-form-item>
            </el-col>
            </el-row>    
            <el-row >

          </el-row>
          <el-row>
            <el-col :span ="8" :offset="5">
            <el-form-item label="资产版本:" prop="assetVersion">
                <!-- <el-input v-model="formDialog.repairLoopholeLibrary.assetVersion" :disabled ="disable"></el-input> -->
                <span>{{formDialog.repairLoopholeLibrary.assetVersion}}</span>
              </el-form-item>
          </el-col>
          <el-col :span ="8">
            <el-form-item label="修复人电话:" prop="restorerPhone">
                <!-- <el-input v-model="formDialog.repairLoopholeLibrary.restorerPhone" :disabled ="disable"></el-input> -->
                <span>{{formDialog.repairLoopholeLibrary.restorerPhone}}</span>
              </el-form-item>
          </el-col>
          <el-col :span ="8" :offset="5">
            <el-form-item label="漏洞编号:" prop="cevNumber">
                <!-- <el-input v-model="formDialog.repairLoopholeLibrary.cevNumber" :disabled ="disable"></el-input> -->
               <span> {{formDialog.repairLoopholeLibrary.cevNumber}}</span>
              </el-form-item>
          </el-col>
            <el-col :span ="8">
            <el-form-item label="漏洞名称:" prop="leakName">
                <!-- <el-input v-model="formDialog.repairLoopholeLibrary.leakName" :disabled ="disable"></el-input> -->
                <span>{{formDialog.repairLoopholeLibrary.leakName}}</span>
              </el-form-item>
          </el-col>
        
          </el-row>
            <el-col :span ="8"  :offset="5">
            <el-form-item label="修复意见:" prop="repairOpinion">
                <!-- <el-input v-model="formDialog.repairLoopholeLibrary.repairOpinion" :disabled ="disable"></el-input> -->
                <span>{{formDialog.repairLoopholeLibrary.repairOpinion}}</span>
              </el-form-item>
          </el-col>
          <el-col :span ="8">
            <el-form-item label="修复状态:" prop="repairStatus">
                <!-- <el-input v-model="formDialog.repairLoopholeLibrary.repairStatus" :disabled ="disable"></el-input>
                 -->
               <span>{{formDialog.repairLoopholeLibrary.repairStatus}}</span>
              </el-form-item>
          </el-col>
          </el-row>
          </el-row>
          <el-col :span ="8" :offset="5">
            <el-form-item label="工单名称:" prop="workOrderName">
                <!-- <el-input v-model="formDialog.workOrder.workOrderName" :disabled ="disable"></el-input> -->
                <span>{{formDialog.workOrder.workOrderName}}</span>
              </el-form-item>
          </el-col>
          <el-col :span ="8">
            <el-form-item label="工单负责人:" prop="workOrderPerson">
                <!-- <el-input v-model="formDialog.workOrder.workOrderPerson" :disabled ="disable"></el-input> -->
                <span>{{formDialog.workOrder.workOrderPerson}}</span>
              </el-form-item>
          </el-col>
          </el-row>
            </el-row>
          <el-col :span ="8" :offset="5">
            <el-form-item label="负责人电话:" prop="personPhone">
                <!-- <el-input v-model="formDialog.workOrder.personPhone" :disabled ="disable"></el-input> -->
                <span>{{formDialog.workOrder.personPhone}}</span>
              </el-form-item>
          </el-col>
          <el-col :span ="8">
            <el-form-item label="负责人邮箱:" prop="personMail">
                <!-- <el-input v-model="formDialog.workOrder.personMail" :disabled ="disable"></el-input> -->
                <span>{{formDialog.workOrder.personMail}}</span>
              </el-form-item>
          </el-col>
          </el-row>
          <el-row :gutter="30">
                <el-col :span="8" :offset="5">                       
                <el-form-item   label="复扫状态:" prop ="isRescan"> 
                  <!-- <el-select v-model="formDialog.workOrder.isRescan"  :disabled ="disable" clearable placeholder="请选择">
                    <el-option
                      v-for="item in options1"
                      :key="item.value"
                      :label="item.label"
                      :value="item.value">
                    </el-option>
                  </el-select> -->
                  <span>{{formDialog.workOrder.isRescan}}</span>
                </el-form-item>   
            </el-col>
              <el-col :span="8" :offset="5">                        
                <el-form-item   label="修复进度:" prop="workOrderProgress">  
                  <!-- <el-select v-model="formDialog.workOrder.workOrderProgress"  :disabled ="disable" clearable placeholder="请选择">
                    <el-option
                      v-for="item in options2"
                      :key="item.value"
                      :label="item.label"
                      :value="item.value">
                    </el-option>
                  </el-select> -->
                  <span>{{formDialog.workOrder.workOrderProgress}}</span>
                </el-form-item>   
            </el-col>
          </el-row>
        <el-row >
          <el-col  :span="16" :offset="5">           
              <el-form-item  label="修复方案方案描述:"> 
                <!-- <el-input
                  type="textarea"
                  placeholder="请输入内容"
                  v-model="formDialog.repairLoopholeLibrary.repairDesc"
                  maxlength="30"
                :disabled ="disable"  show-word-limit>
                </el-input> -->
                <span>{{formDialog.repairLoopholeLibrary.repairDesc}}</span>
              </el-form-item>
          </el-col>
      </el-row>           
      </el-form>                 
      </div>
  </div>
</template>
<script>
  import axios from "axios"
  import waves from '@/directive/waves/index.js' // 水波纹指令
  import { getWorkOrderOrHistory,getWorkOrderRepair,endTermination,workOrderPageCondition,operation,downloadAttachment} from "@/api/workOrder"
  export default {
    name:'',
    data () {
      return {
          content:"",
          show:false,
          show1:false,
          show2:false,
          disable:true,
          WorkOrderId:"",
          content:"",
          ftdsPath:'',      
          attachmentName:"",
          WorkOrderIds:[],
          formData:{
          
          },
          formDialog:{
              repairLoopholeLibrary:{
                    assetSubtype:"",
                    leakTargetLocaltion:"",
                    assetType:"",
                    leakLevel:"",
                    restorer:"",
                    restorerMail:"",
                    assetVersion:"",
                    restorerPhone:"",
                    repairDesc:"",
                    repairStatus:"",
              },
              workOrder:{
                isRescan:0,
                workOrderType:1,
                workOrderProgress:"80%"
              }
          },
          value:"",
              options:[
              {
              value: '选项1',
              label: '第三方组件'
            }, {
              value: '选项2',
              label: '自研应用'
            }
          ],
          pageSize: 5,  //每页显示条数
          currpage:1,    //当前页
          total:24,
          multipleSelection:[],
          formLabelWidth: '80px',
          options1:[
            //   {
            //   value: '1',
            //   label: '--复扫--'
            // }, {
            //   value: '2',
            //   label: '已通过'
            // },
            //  {
            //   value: '3',
            //   label: '未通过'
            // }, 
          ],
             options2:[
            //   {
            //   value: '1',
            //   label: '进度'
            // }, {
            //   value: '2',
            //   label: '8%'
            // },
            //  {
            //   value: '3',
            //   label: '20%'
            // }, 
          ],
          // textarea:'',
          tableData:[
      
          ]

      };
    },
   directives: {
      waves
    },
    components: {
     
    },

    computed: {},

    mounted() {
      console.log(this.$route.query.WorkOrderId)  
     
        getWorkOrderRepair({ WorkOrderId:this.$route.query.WorkOrderId*1}).then(res =>{
          console.log("res修复库信息",res);
          

         this.formDialog.workOrder.isRescan =res.data.data.workOrder.isRescan;
         if(this.formDialog.workOrder.isRescan ==0){
           this.formDialog.workOrder.isRescan ="是"
         }else{
           this.formDialog.workOrder.isRescan ="否"
         }
         
          this.formDialog.workOrder.workOrderName =res.data.data.workOrder.workOrderName;
          this.formDialog.workOrder.workOrderPerson = res.data.data.workOrder.workOrderPerson;
          this.formDialog.workOrder.personPhone = res.data.data.workOrder.personPhone;
          this.formDialog.workOrder.personMail = res.data.data.workOrder.personMail;
          this.formDialog.workOrder.workOrderProgress = res.data.data.workOrder.workOrderProgress;
          this.formDialog.workOrder.workOrderType =res.data.data.workOrder.workOrderType; 
          this.formDialog.repairLoopholeLibrary.leakLevel =  res.data.data.repairLoopholeLibrary.leakLevel ;
         
          if(res.data.data.repairLoopholeLibrary.leakLevel==1 ){
                this.formDialog.repairLoopholeLibrary.leakLevel ="低"
          }else if(res.data.data.repairLoopholeLibrary.leakLevel==2){
            this.formDialog.repairLoopholeLibrary.leakLevel ="中"
          }else{
              this.formDialog.repairLoopholeLibrary.leakLevel ="高"
          }
          if( res.data.data.workOrder.workOrderType==0){
            this.formDialog.workOrder.workOrderType ="第三方组件"
          }else{
            this.formDialog.workOrder.workOrderType ="自研应用"
          }
          console.log(this.formDialog.repairLoopholeLibrary.leakLevel)

          this.formDialog.repairLoopholeLibrary.leakTargetLocaltion = res.data.data.repairLoopholeLibrary.leakTargetLocaltion;
          this.formDialog.repairLoopholeLibrary.restorer = res.data.data.repairLoopholeLibrary.restorer;
          this.formDialog.repairLoopholeLibrary.restorerMail = res.data.data.repairLoopholeLibrary.restorerMail;
          this.formDialog.repairLoopholeLibrary.assetVersion = res.data.data.repairLoopholeLibrary.assetVersion;
          this.formDialog.repairLoopholeLibrary.restorerPhone = res.data.data.repairLoopholeLibrary.restorerPhone;
          this.formDialog.repairLoopholeLibrary.repairDesc =res.data.data.repairLoopholeLibrary.repairDesc;
          this.formDialog.repairLoopholeLibrary.leakName =res.data.data.repairLoopholeLibrary.leakName;
          this.formDialog.repairLoopholeLibrary.repairStatus =res.data.data.repairLoopholeLibrary.repairStatus;

          this.formDialog.repairLoopholeLibrary.leakEnclosure =  res.data.data.repairLoopholeLibrary.leakEnclosure 
          this.formDialog.repairLoopholeLibrary.leakEnclosureName =  res.data.data.repairLoopholeLibrary.leakEnclosureName 
          this.formDialog.repairLoopholeLibrary.assetName =res.data.data.repairLoopholeLibrary.assetName;
          this.formDialog.repairLoopholeLibrary.cevNumber =res.data.data.repairLoopholeLibrary.cevNumber;
          this.formDialog.repairLoopholeLibrary.repairOpinion =res.data.data.repairLoopholeLibrary.repairOpinion;
          this.formDialog.repairLoopholeLibrary.leakDiscoverer =res.data.data.repairLoopholeLibrary.leakDiscoverer;

          
        
          console.log("this.formDialog",this.formDialog)
       })
      
     
    },

    methods: {
        back(){
           this.$router.go("-1")
        },
        handleSizeChange(val) {
            this.pageSize = val;
          console.log(`每页 ${val} 条`);
        },
        handleCurrentChange(val) {
          this.currpage = val;
          console.log(`当前页: ${val}`);
        },
        //行选中样式
        tableRowClassName({ row, rowIndex }) {
          for (var i = 0; i < this.multipleSelection.length; i++) {
            if (this.multipleSelection[i] == row) {
              return "warning-row";
            }
          }
          return "";
        },
       downLoad(){ 
        console.log(this)
        downloadAttachment({
          ftdsPath: this.formDialog.repairLoopholeLibrary.leakEnclosure,
          attachmentName:this.formDialog.repairLoopholeLibrary.leakEnclosureName}).then(res =>{
            // console.log(res.data)
     
                window.location.href =`/woc/downloadAttachment?ftdsPath=${this.formDialog.repairLoopholeLibrary.leakEnclosure}&&attachmentName=${this.formDialog.repairLoopholeLibrary.leakEnclosureName}`
            
        })
        
           
     },
        checkedselect(row) {
          this.$refs.multipleTable.toggleRowSelection(row);
        },

        handleSelectionChange(val) {
          console.log(val)
          for (var i = 0; i < this.tableData.length; i++) {
            for (var j = 0; j < val.length; j++) {
              if (this.tableData[i] == val[j]) {
                val[j]["index"] = i + 1;
              }
            }
          }
        this.multipleSelection = val;
    },
        updateorder () {
          this.show1 = true;
        },
         delorder () {
           this.show2 = true;
        },
        seeWatch(){
             this.show = true;
        }

        

    },

    watch: {
       show () {
          this.dialogFormVisible = this.show;
       }
    }

  }

</script>
<style  lang='scss' scoped>
 .workorderDetail{
   margin-top: 60px;
 }
</style>