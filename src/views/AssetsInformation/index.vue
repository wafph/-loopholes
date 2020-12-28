<template>
  <div> 
      <!-- <el-breadcrumb separator-class="el-icon-arrow-right" class="tags-breadcrumb-list">
        <el-breadcrumb-item :to="{ path: '/' }">自查风险信息</el-breadcrumb-item>
        <el-breadcrumb-item>资产信息</el-breadcrumb-item>    
      </el-breadcrumb> -->
    <div class="topButton" style="white-space: nowrap;min-width:800px">
        <el-row  :gutter="50">
          <el-col :span="4">
              <el-tooltip content="模板下载" placement="top" >
                    <el-button icon ="el-icon-download" type="warning" size ="small" @click="downloadTemplate" round>模板下载</el-button> 
              </el-tooltip>
          </el-col>
        <el-col :span="4" >
            <el-tooltip content="批量导入" placement="top" >
                  <el-button icon ="el-icon-upload2" type="primary" size ="small" @click="importButton" round>批量导入</el-button> 
            </el-tooltip>
        </el-col>
        <el-col :span="6"  >
          <el-button  icon ="el-icon-document-add" @click="handleAdd" type="primary" size ="small" round plain  v-waves >新增</el-button>
          <el-button icon ="el-icon-edit"  @click="handleEdit"  plain  v-waves type="warning"  size ="small" round>修改</el-button>
          <el-button  icon ="el-icon-delete" @click="deleteAsset" plain  v-waves type="danger"  size ="small" round>删除</el-button>
          <el-button  icon ="el-icon-delete" plain  v-waves type="danger"  size ="small" round v-if="multipleSelectionFlag" @click="popDelete()">批量删除</el-button>
        </el-col>      
      </el-row> 
      <el-row class="search" :gutter="20">
          <el-col :span ="4" :offset="4">
            <el-input
            placeholder="请输入资产名称"
            v-model="t.assetName"    >
          </el-input>
        </el-col>
         <el-col :span ="4">
          <el-select v-model="t.id" placeholder="请选择资产类型"  @change="assetTypeClass(t.id)" class="size-full">
            <el-option v-for="item in assetTypeClassArr"
              :key="item.id"
              :value="item.id"
              :label="item.assetsTypeName" >
            </el-option>
          </el-select>
        </el-col>
       <el-col :span ="4">
          <el-select v-model="t.assetSubtype" placeholder="请选择子级类型" class="size-full">
            <el-option v-for="item in assetSubtypeClassArr"
              :key="item.id"
              :value="item.id"
              :label="item.assetsTypeName" >
            </el-option>
          </el-select>               
        </el-col>
        <addAssets :show.sync="show" @addData="addData"></addAssets>
          <!-- <updateAssets :show1.sync="show1" :getAssetLibraryId ="AssetLibraryId" > </updateAssets>   -->
        </el-row>
        <el-row class="search" :gutter="20">
          <el-col :span ="4" :offset="4">
              <el-select v-model="t.assetStatus" placeholder="请选择资产运行状态">
                <el-option   v-for="item in options3"
                  :key="item.value"
                  :label="item.label"
                  :value="item.value"
                  :disabled="item.disabled">                   
                  </el-option>                
              </el-select>
        </el-col>    
          <el-col :span ="4">
            <el-input
            placeholder="请输入资产负责人"                  
            v-model="t.assetPerson"      >
          </el-input>                 
        </el-col>   
          <el-col :span ="4" >
          <el-select v-model="t.assetClass" placeholder="请选择资产分类">
              <el-option   v-for="item in options"
                :key="item.value"
                :label="item.label"
                :value="item.value"
                :disabled="item.disabled">                   
            </el-option>     
          </el-select>
        </el-col>               
          <el-col :span ="3" >
              <el-button type="primary" plain  icon="el-icon-search" v-waves   @click="searched()" size ="medium"  >查询</el-button>
          </el-col> 
            <el-col :span ="2">
              <el-button  icon="el-icon-refresh"  type="danger" plain  v-waves   @click="reset()" size ="medium"  >重置</el-button>                    
          </el-col>                     
        </el-row>    
    </div>
      <div class="main_list">
        <el-table stripe  border
        ref="multipleTable"
        :data="tableData"
        tooltip-effect="dark"
        style="width: 100%"
        @row-click="checkedselect"
        :row-class-name="tableRowClassName"
        @selection-change="handleSelectionChange"
      >
        
        <el-table-column type="selection"></el-table-column>
          <el-table-column align=center  prop="assetClass" label="资产分类"> <template slot-scope="scope">{{scope.row.assetClass=="0"?"第三方组件":"自研应用"}}</template></el-table-column>
        <!-- <el-table-column align=center  prop="AssetNumber" label="资产编号" show-overflow-tooltip>               
        </el-table-column> -->
          <el-table-column align=center  prop="assetCreateMode" label="资产创建方式"><template slot-scope="scope">{{scope.row.assetCreateMode==1?"人工":"扫描"}}</template>  </el-table-column> 
        <el-table-column align=center  prop="assetName" label="资产名称">
            <template slot-scope="scope">{{scope.row.assetName}}</template>
        </el-table-column>
        <el-table-column align=center  prop="assetVersion" label="版本">
          <template slot-scope="scope">{{scope.row.assetVersion}}</template>
        </el-table-column>
        <el-table-column align=center  prop="assetType" label="资产类型"> <template slot-scope="scope">{{scope.row.assetType | getAssetType}}</template></el-table-column>
          <el-table-column align=center  prop="assetSubtype" label="资产子类型"> <template slot-scope="scope">{{scope.row.assetSubtype | getSubType }}</template></el-table-column>
        <el-table-column align=center  prop="assetDesc" label="资产描述"><template slot-scope="scope">{{scope.row.assetDesc}}</template>  </el-table-column>            
        <el-table-column align=center  prop="assetLocation" label="资产位置"><template slot-scope="scope">{{scope.row.assetLocation}}</template>  </el-table-column>
        <el-table-column align=center  prop="assetPerson" label="资产负责人"><template slot-scope="scope">{{scope.row.assetPerson}}</template>  </el-table-column>
          <el-table-column align=center  prop="assetStatus" label="资产运行状态"><template slot-scope="scope">{{scope.row.assetStatus==0?"正在运行":"已停止"}}</template>  </el-table-column>
        <el-table-column align=center  prop="assetPersonMail" label="资产负责人邮箱"><template slot-scope="scope">{{scope.row.assetPersonMail}}</template> </el-table-column>
            <el-table-column align=center  prop="assetPersonPhone" label="资产负责人电话"><template slot-scope="scope">{{scope.row.assetPersonPhone}}</template> </el-table-column>
            
        <el-table-column align=center  prop="LookOver" label="查看">
          <template slot-scope="scope"> 
              <el-tooltip class="item" effect="dark" content="点击查看" placement="top">
                  <i class="el-icon-view" @click="lookover(scope.$index, scope.row)"> </i>
              </el-tooltip> 
            </template>
        </el-table-column>
        <el-table-column align=center  prop="Scan" label="扫描">
            <template slot-scope="scope"> 
              <el-tooltip class="item" effect="dark" content="点击扫描" placement="top">
                  <i class="el-icon-search" @click="Scan(scope.$index, scope.row)"> </i>
              </el-tooltip> 
            </template>
          </el-table-column>
      </el-table>
      <div class="block">
        <el-pagination
            v-show="total>0"
            @size-change="handleSizeChange" background
            @current-change="handleCurrentChange"
            :current-page="currpage"
            :page-sizes="[5,10,20,50]"
            :page-size="pageSize"
            layout="total, sizes, prev, pager, next, jumper"
            :total="total"
          ></el-pagination>
      </div>
        <el-dialog
        :title="text"   center
        :visible.sync="importTrue">
        <div style="margin-top: -20px;">
          <p class="eTitle">{{text}} <span>(请先下载导入模板)</span>
            <!-- <el-button class="fr" type="text" @click="downloadTemplate()">下载模板</el-button> -->
          </p>
          <el-col :span="24" style="padding: 20px 0;">
            <el-col :span="6" align="center" style="line-height: 36px"> <label for="">选择文件：</label></el-col>
            <el-col :span="12"><el-input v-model="fileName" placeholder="请选择.xls格式文件"></el-input></el-col>
            <el-col :span="6" align="center">
              <el-upload
                class="upload-demo"
                action='/woc/uploadFile'
                :before-upload="beforeUpload"      
                :show-file-list="false"  :file-list="fileList"  ref="uploadfile"  >
                <el-button type="primary" size ="medium" plain  v-waves> 浏览</el-button>        
              </el-upload>
            </el-col>
          </el-col>
        </div>
        <span slot="footer" class="dialog-footer">
          <el-button type="success" size ="medium" @click="importUserInfo" :disabled="formClick">确 定</el-button>
          <el-button size ="medium" @click="importTrue = false">取 消</el-button>
        </span>
      </el-dialog>
        <!-- 修改弹窗 -->

     <el-dialog :title="title1" width="900px"  :visible.sync="dialogformVisible" :close-on-click-modal="false" center >
        <el-row >
          <el-col :span="12">
            <el-form :model="ruleForm">
              <el-form-item label="资产名称:" :label-width="formLabelWidth">
                <el-input v-model="ruleForm.assetName"  placeholder="请输入资产名称" autocomplete="off" ></el-input>
              </el-form-item>
            <el-form-item label="资产类型:" :label-width="formLabelWidth">
                <el-select v-model="ruleForm.assetType==1?'主机':ruleForm.assetType==2?'中间件':ruleForm.assetType==3?'数据库':'应用系统'" placeholder="请选择资产类型" class="size-full" :disabled ="disable">
                </el-select>
              </el-form-item>
              </el-form-item>
              <el-form-item label="资产分类" :label-width="formLabelWidth" prop="assetClass" >
                  <el-select v-model="ruleForm.assetClass" placeholder="请选择漏洞分类"   class="size-full">            
                      <el-option   v-for="item in assetClass"
                        :key="item.value"
                        :label="item.label"
                        :value="item.value"
                        :disabled="item.disabled">                   
                        </el-option>                
                    </el-select>
              </el-form-item> 
              <el-form-item label="资产位置:" :label-width="formLabelWidth">
                <el-input v-model="ruleForm.assetLocation" autocomplete="off"   placeholder="请输入资产位置"  ></el-input>
              </el-form-item>
              <el-form-item label="资产负责人:" :label-width="formLabelWidth"  prop="assetPerson">
                <el-input v-model="ruleForm.assetPerson" autocomplete="off"   placeholder="请输入资产负责人"></el-input>
            </el-form-item>
              
            </el-form>
          </el-col>
          <el-col :span="12">
            <el-form :model="ruleForm">
            <el-form-item label="资产版本:" :label-width="formLabelWidth">
              <el-input v-model="ruleForm.assetVersion"  placeholder="请输入资产版本"  autocomplete="off" ></el-input>
            </el-form-item>
            <el-form-item label="子级类型:" :label-width="formLabelWidth">
                  <el-select v-model="ruleForm.assetSubtype==5?'mysql':ruleForm.assetSubtype=='6'?'redis':ruleForm.assetSubtype==7?'rabbitMQ':ruleForm.assetSubtype==8?'activeMQ':ruleForm.assetSubtype==9?'centos':ruleForm.assetSubtype==9?'centos':'xx管理系统'" placeholder="请选择子级类型" :disabled ="disable" class="size-full">
                </el-select>
              </el-form-item>
              <el-form-item label="资产状态:" :label-width="formLabelWidth" >                    
                 <el-select v-model="ruleForm.assetStatus" placeholder="请选择资产运行状态" class="size-full">            
                    <el-option   v-for="item in options3"
                      :key="item.value"
                      :label="item.label"
                      :value="item.value"
                     >                   
                      </el-option>                
                  </el-select>
            </el-form-item>
              <el-form-item label="负责人邮箱:" :label-width="formLabelWidth"  prop="assetPersonMail">
                <el-input v-model="ruleForm.assetPersonMail" autocomplete="off"   placeholder="请输入资产负责人邮箱"></el-input>
            </el-form-item>
            <el-form-item label="资产负责人电话:" :label-width="formLabelWidth"  prop="assetPersonPhone">
                <el-input v-model="ruleForm.assetPersonPhone" autocomplete="off"   placeholder="请输入资产负责人电话"></el-input>
            </el-form-item>
          </el-form>
          </el-col>
        </el-row>
        <el-row>
            <el-col>
              <el-form>
                <el-form-item label="资产描述:" :label-width="formLabelWidth">
                  <el-input  class="textWidth"
                        type="textarea"
                        placeholder="请输入资产描述内容"
                        v-model="ruleForm.assetDesc"
                        maxlength="30"    
                        show-word-limit
                      >
                  </el-input>
                </el-form-item>
              </el-form>
            </el-col>
        </el-row>
        <div slot="footer" class="dialog-footer">
          <el-button type="danger" size="small" icon="el-icon-refresh" @click="dialogformVisible = false">取 消</el-button>
          <el-button type="primary"  size="small" icon ="el-icon-edit"  @click="updateAsset()">修改</el-button>
        </div> 
      </el-dialog>
      <!-- 查看弹框 -->
      <el-dialog :title="title2"  width="900px" :visible.sync="dialogFormVisible" center  @close="$emit('update:show', false)" :show="show" >
        <el-row >
          <el-col :span="11">
            <el-form :model="ruleForm">
              <el-form-item label="资产名称:" :label-width="formLabelWidth">
                <el-input v-model="ruleForm.assetName"  placeholder="请输入资产名称" autocomplete="off" :disabled ="disable"></el-input>
              </el-form-item>
              <el-form-item label="资产类型:" :label-width="formLabelWidth">
                <el-select v-model="ruleForm.assetType" placeholder="请选择资产类型" class="size-full" :disabled ="disable">
                </el-select>
              </el-form-item>
              <el-form-item label="资产分类" :label-width="formLabelWidth" prop="assetClass" >
                  <el-select v-model="ruleForm.assetClass" placeholder="请选择漏洞分类"  :disabled ="disable" class="size-full">            
                      <el-option   v-for="item in assetClass"
                        :key="item.value"
                        :label="item.label"
                        :value="item.value"
                        :disabled="item.disabled">                   
                        </el-option>                
                    </el-select>
                    
              </el-form-item> 
              <el-form-item label="资产位置:" :label-width="formLabelWidth">
                <el-input v-model="ruleForm.assetLocation" autocomplete="off"   placeholder="请输入资产位置" :disabled ="disable" ></el-input>
              </el-form-item>
              <el-form-item label="资产负责人:" :label-width="formLabelWidth"  prop="assetPerson">
                <el-input v-model="ruleForm.assetPerson" autocomplete="off" :disabled ="disable"  placeholder="请输入资产负责人"></el-input>
            </el-form-item>
              
            </el-form>
          </el-col>
          <el-col :span="12">
            <el-form :model="ruleForm">
            <el-form-item label="资产版本:" :label-width="formLabelWidth">
              <el-input v-model="ruleForm.assetVersion"  placeholder="请输入资产版本"  autocomplete="off" :disabled ="disable"></el-input>
            </el-form-item>
                <el-form-item label="子级类型:" :label-width="formLabelWidth">
                  <el-select v-model="ruleForm.assetSubtype==5?'mysql':ruleForm.assetSubtype=='6'?'redis':ruleForm.assetSubtype==7?'rabbitMQ':ruleForm.assetSubtype==8?'activeMQ':ruleForm.assetSubtype==9?'centos':ruleForm.assetSubtype==9?'centos':'xx管理系统'" placeholder="请选择子级类型" :disabled ="disable" class="size-full">
                </el-select>
              </el-form-item>
          
              <el-form-item label="资产状态:" :label-width="formLabelWidth" >                    
                  <el-select v-model="ruleForm.assetStatus" placeholder="请选择资产运行状态" :disabled ="disable" class="size-full">                                  
                  </el-select>
            </el-form-item>
              <el-form-item label="负责人邮箱:" :label-width="formLabelWidth"  prop="assetPersonMail">
                <el-input v-model="ruleForm.assetPersonMail" autocomplete="off" :disabled ="disable"  placeholder="请输入资产负责人邮箱"></el-input>
            </el-form-item>
            <el-form-item label="资产负责人电话:" :label-width="formLabelWidth"  prop="assetPersonPhone">
                <el-input v-model="ruleForm.assetPersonPhone" autocomplete="off"  :disabled ="disable" placeholder="请输入资产负责人电话"></el-input>
            </el-form-item>
          </el-form>
          </el-col>
        </el-row>
        <el-row>
            <el-col>
              <el-form>
                <el-form-item label="资产描述:" :label-width="formLabelWidth">
                  <el-input  class="textWidth"
                        type="textarea"
                        placeholder="请输入资产描述内容"
                        v-model="ruleForm.assetDesc"
                        maxlength="30"    
                        :disabled ="disable" show-word-limit
                      >
                  </el-input>
                </el-form-item>
              </el-form>
            </el-col>
        </el-row>
        <div slot="footer" class="dialog-footer">
          <el-button type="danger" @click="dialogFormVisible = false">关闭</el-button>
      
        </div>
      </el-dialog>          
    </div>
  </div>
</template>
<script>
  import addAssets from './addAssets'
  // import updateAssets from './updateAssets'
  import waves from '@/directive/waves/index.js' // 水波纹指令
  import {addAsset,assetLibraryPageCondition,getAssetLibrary,getAssetAllType,updateAsset,deleteAsset,delleteAssetLibrary,batchImport,scanning} from "@/api/addAssets"
  import {getAssetSubType,getAssetParentType,getAssetAllTypes} from "@/api/assetsType"

  export default {
    name:'',
    data () {
      return {
          text:"批量导入资产",
          title1:"修改资产",
          title2:"资产详情",
          content:"",
          disable:true,
          multipleSelectionFlag:false,
          show:false,
          searchDisable:true,
          assetId:"",
          assetIds:"",
          show1:false,
          show2:false,
          formLabelWidth:"120px",
          dialogFormVisible:false,
          fileList:[],
          formClick:false,
          leakEnclosurefileList:[],  
          fileName:'',
          fileData:{},
          importTrue:false,
          assetTypeClassArr:[],
          assetSubtypeClassArr:[],
          dialogImport: false, // 导入弹窗
          t: {
            id:null,
            assetClass: null,
            assetCreateMode: null,
            assetName: null,
            assetPerson: null,
            assetStatus: null,
            assetSubtype: null,
            // assetType: null,
          },
          assetStatus: null,
          options:[
              {
              value: '0',
              label: '第三方组件'
            }, {
              value: '1',
              label: '自研应用'
            }
          ],
            assetClass:[
              {
                value: '0',
                label: '第三方组件'
              },
              {
                value: '1',
                label: '自研应用'
              },
            ],
          options2:[
              {
              value: '1',
              label: '主机'
            }, {
              value: '2',
              label: '中间件'
            },
             {
              value: '3',
              label: '数据库'
            }, {
              value: '4',
              label: '应用系统'
            }
          ],
          options3:[
            {
              value: '0',
              label: '正在运行'
            }, {
              value: '1',
              label: '已停止'
            },
          ],
          // assetTypeClass:[],
          // assetSubtypeClass:[],
          ruleForm: {
            id:"",
            assetClass:"",
            assetName: '',
            assetType:"",
            assetVersion:"",
            assetPerson:"",
            assetLocation:"",
            assetStatus:"",
            assetDesc:"" ,
            assetPersonMail:"", 
            assetPersonPhone:"", 
            assetsTypeName:"",
            assetSubtype:"" ,
            dept:""
          },
          value:"",
          pageSize: 10,  //每页显示条数
          currpage:1,    //当前页
          total:0,
          dialogformVisible:false,
          multipleSelection:[],
          tableData:[
     
          ],
          dataSlection:[],
          AssetLibraryId:1,


      };
    },
    created(){
           this.getTableData();
           this.getAssetAllTypeArr()
           this.getAssetsTypeArr()
    },
    components: {
     addAssets
    },
    
    computed: {},
    mounted() {

    },
    filters:{
     getSubType:function(status){ 
      const AssetSubType = {
            5:'mysql',
            6:'redis',
            7:'rabbitMQ',
            8:'activeMQ',
            9:"centos",
            10:"xx管理系统"
      }
       return AssetSubType[status]
     },
     getAssetType:function(status){
         const AssetType = {
            1:'主机',
            2:'中间件',
            3:'数据库',
            4:'应用系统' 
      }
       return AssetType[status]
     }


    },
    
    directives:{
      waves
    },
    methods: {
      // clickLink(path) {
      //   this.$router.push({
      //     path,
      //     query: {
      //       t: +new Date() //保证每次点击路由的query项都是不一样的，确保会重新刷新view
      //     }
      //   })
      // },
      getAssetsTypeArr(){
          getAssetParentType().then(res =>{
          // console.log("res父级类型",res.data.data)
          this.assetTypeClassArr = res.data.data
          
        })
      },
      getAssetAllTypeArr(){
          getAssetAllTypes().then(res =>{
            // console.log("res",res)
          })
      },
      getTableData(){
        assetLibraryPageCondition({pageNum: this.currpage,pageSize: this.pageSize*1,t:{}}).then(res => {
              // console.log('资产条件分页查询',res)
              this.tableData =res.data.datas
              // console.log(res.data.totalNum)
              this.total = res.data.totalNum
              // for (let i = 0; i < this.tableData.length; i++) {
              //   // console.log(this.tableData[i].assetType)
              //   if(this.tableData[i].assetType ==1){
              //     this.tableData[i].assetType ="主机系统"
              //     }else if(this.tableData[i].assetType ==2){
              //       this.tableData[i].assetType ="中间件"
              //     }else if(this.tableData[i].assetType ==3){
              //       this.tableData[i].assetType ="数据库"
              //     }else{
              //       this.tableData[i].assetType="应用系统"
              //     }
              // } 
          })
      },
      //重置
      reset(){    
          this.t.id =null;
          this.t.assetClass =null;
          this.t.assetName =null;
          this.t.assetPerson =null;
          this.t.assetStatus =null;
          this.t.assetSubtype =null;
          this.$message({
                  type: 'success',
                  message: '所有搜索项已为空'
           }); 
    },
       beforeUpload:function (file) {
        // console.log(file);
        this.fileName = file.name;
        this.fileData = file;
        this.fileType = file.type;
        return false
      },
    
     // 将文件信息传给后台
    importUserInfo() {
      if(this.fileName !== "") {
        let transData = new FormData()
        transData.append("file", this.fileData)
        this.importInfoNormal(transData)
      } else {
       
        this.$message.error('请选择要导入的文件')
      }      
    },
     // 将数据传给后台
    importInfoNormal(transData) {
      //后台接口
      batchImport(transData).then(res =>{
        // console.log(res)
        if(res.data.code ==0){
          // this.getTableData()
          // this.$alert(res.data.msg,'提示', {
          //   confirmButtonText: '确定',
          //     type: 'success'       
          //  }).then( ()=>{
          //     // this.importTrue =false;
          //     // location.reload(
          //     this.getTableData()
          //   // this.$refs.uploadfile.clearFiles()
          //     this.fileName =""
          //  })
          this.$message.success(res.data.msg)
          this.getTableData()
          this.fileName =""
                          
        }else if(res.data.code ==1){
           this.$alert(res.data.msg,'提示', {
              confirmButtonText: '确定',
              type: 'error'       
           }) 
        }
      })
  },
    //批量删除
      popDelete(){
           this.$confirm('此操作将永久删除这些资产, 是否继续?', '提示', {
              confirmButtonText: '确定',
              cancelButtonText: '取消',
              type: 'warning'       
           }).then(()=>{
               this.dataSlection = this.dataSlection.join(",")
              //  console.log(this.dataSlection)
              this.assetIds = this.dataSlection 
              console.log(this.assetIds)
                delleteAssetLibrary({assetIds:this.assetIds}).then(res =>{
                  // console.log(res) 
                  if(res.data.code==0){
                        this.getTableData()
                        this.$message.success(res.data.msg)
                  }else{
                      this.$message.error(res.data.msg)
                  }
                })
           })
        
      },
      addData() {
        this.getTableData();
      },
    // 下载导入模板
      downloadTemplate () {
        var self = this;
        window.location.href = "/alc/exportTemplate";
      },
       // 导入按钮
      importButton () {
        this.importTrue = true;
      },
      // 添加搜索
      searched(){
            // this.searchDisable =false
          if (this.t.assetClass||this.t.assetName||this.t.assetPerson||this.t.assetStatus||this.t.assetSubtype||this.t.id) {
            assetLibraryPageCondition({pageNum: this.currpage,pageSize: this.pageSize*1,t:{
                assetClass:this.t.assetClass,
                assetName:this.t.assetName,
                assetPerson:this.t.assetPerson,
                assetStatus:this.t.assetStatus,
                assetSubtype:this.t.assetSubtype,
                assetType:this.t.id,
            }}).then(res => {
                // console.log('资产条件分页查询',res)
                this.tableData =res.data.datas 
                this.total = res.data.totalNum       
              })
          }else{
            this.getTableData()
            //  this.$message.info("你搜索的是全部内容")
          }
      },
       //获取子级列表
      assetTypeClass(params){
        // console.log(this.assetSubtypeClassArr)
          this.t.assetSubtype =null
          this.ruleForm.assetSubtype = ""       
        // console.log(params)
        getAssetSubType({superclassId:params}).then(res =>{
          // console.log("res",res.data.data)
          this.assetSubtypeClassArr = res.data.data; 
         
        })
        
      },

     

      handleAdd () {
        this.show = true;
      },
      //回显修改
      handleEdit () {
        if(this.multipleSelection.length <= 0) {
          this.$message.warning("请选择要修改的数据");
          return;
        } else if(this.multipleSelection.length > 1) {
          this.$message.warning("只能选择一条数据进行修改");
        } else {
            this.dialogformVisible = true;
            // console.log("this.dataSlection",this.dataSlection[0])
            // console.log("this.multipleSelection",this.multipleSelection)
              this.AssetLibraryId =this.dataSlection[0]
              getAssetLibrary({AssetLibraryId:this.AssetLibraryId}).then(res=>{
                console.log(res)
                if(res.data.code =="0"){
                   this.ruleForm.assetVersion =  res.data.data.assetVersion;
                  this.ruleForm.assetLocation =  res.data.data.assetLocation;
                  this.ruleForm.assetType = res.data.data.assetType;
                  this.ruleForm.assetClass = res.data.data.assetClass;
                  this.ruleForm.assetSubtype =  res.data.data.assetSubtype;
                  this.ruleForm.assetStatus =  res.data.data.assetStatus;
                  this.ruleForm.leakDesc =res.data.data.leakDesc;
                  this.ruleForm.assetPerson =res.data.data.assetPerson
                  this.ruleForm.assetPersonPhone =res.data.data.assetPersonPhone
                  this.ruleForm.assetPersonMail =res.data.data.assetPersonMail
                  this.ruleForm.assetDesc =res.data.data.assetDesc
                  this.ruleForm.assetName = res.data.data.assetName;
             
                }
               
              })
                
        }         
      },
      //确定修改
      updateAsset(){
        this.AssetLibraryId =this.dataSlection[0]
         this.dialogformVisible = false;
        updateAsset(
          {  
              id:this.AssetLibraryId,
              assetName: this.ruleForm.assetName,
              assetVersion: this.ruleForm.assetVersion,
              assetClass: this.ruleForm.assetClass,
              assetType: this.ruleForm.assetType,
              assetSubtype: this.ruleForm.assetSubtype,
              assetPerson: this.ruleForm.assetPerson,
              assetPersonPhone: this.ruleForm.assetPersonPhone,
              assetPersonMail: this.ruleForm.assetPersonMail,
              assetLocation: this.ruleForm.assetLocation,
              assetStatus:this.ruleForm.assetStatus,
              assetDesc: this.ruleForm.assetDesc,
           }
        ).then(res =>{
          //  console.log(res)
           if(res.data.code=="0"){
            this.$message.success("修改成功")
             this.getTableData()
           }else{
               this.$message.error("res.data.msg")
           }
        })
      },
      deleteAsset(){
        if(this.multipleSelection.length <= 0) {
          this.$message.warning("请选择要删除的数据");
          return;
        } else if(this.multipleSelection.length > 1) {
           this.$message.warning("只能选择一条数据进行删除");
         }
        else{
           this.$confirm('此操作将永久删除该资产, 是否继续?', '提示', {
              confirmButtonText: '确定',
              cancelButtonText: '取消',
              type: 'warning'
              
           }).then(() => {      
               this.AssetLibraryId =this.dataSlection[0] 
              //  console.log("this.dataSlection[0] ",this.dataSlection[0] )
                deleteAsset({id:this.AssetLibraryId}).then(res =>{
                  //  console.log(res.data);  
                  //  console.log(res); 
                  if(res.data.code ==0){
                     this.getTableData();
                     this.$message.success(res.data.msg)                                      
                  } else{
                     this.$message.error(res.data.msg)          
                  }              
                })  
           
          })   
        }
        
      },

      lookover(index,row){
        // console.log(index,row) //index 对应索引，row该行所有信息
          this.dialogFormVisible = true;
          this.AssetLibraryId=row.id
          getAssetLibrary({
            AssetLibraryId:this.AssetLibraryId}).then(res=>{
              // console.log("AssetLibraryId",res);
              // console.log(res.data.data.assetStatus);
              this.ruleForm.assetVersion =  res.data.data.assetVersion;
              this.ruleForm.assetLocation =  res.data.data.assetLocation;
              this.ruleForm.assetType = res.data.data.assetType;
              this.ruleForm.assetClass = res.data.data.assetClass;

              this.ruleForm.assetSubtype =  res.data.data.assetSubtype;
              this.ruleForm.assetStatus =  res.data.data.assetStatus;

              this.ruleForm.leakDesc =res.data.data.leakDesc;
              this.ruleForm.assetPerson =res.data.data.assetPerson
              this.ruleForm.assetPersonPhone =res.data.data.assetPersonPhone
              this.ruleForm.assetPersonMail =res.data.data.assetPersonMail
              this.ruleForm.assetDesc =res.data.data.assetDesc
              this.ruleForm.assetName = res.data.data.assetName;
              if(this.ruleForm.assetType ==1){
                this.ruleForm.assetType ="主机"
              }else if(this.ruleForm.assetType ==2){
                this.ruleForm.assetType ="中间件"
              }else if(this.ruleForm.assetType ==3){
                this.ruleForm.assetType ="数据库"
              }else if(this.ruleForm.assetType ==4){
                this.ruleForm.assetType ="应用系统"
              }
              // if (res.data.data.assetClass == 0) {
              //       this.ruleForm.assetClass = '第三方组件'
              // } else {
              //     this.ruleForm.assetClass = '自研应用'
              // }
              if (res.data.data.assetStatus == 0) {
                    this.ruleForm.assetStatus = '正在运行'
              } else {
                  this.ruleForm.assetStatus = '已停止'
              } 
          })
      },      
      Scan(index,row){
          // console.log(index,row)
          this.assetId = row.id;
          // console.log(this.assetId);
          scanning({assetId:this.assetId}).then(res =>{
            // console.log(res.data)
            if(res.data.code ==1){
             this.$confirm(res.data.msg, '提示', {
                confirmButtonText: '确定',
                cancelButtonText: '取消',
                type: 'warning'
              })
            }else if(res.data.code =="0"){
             this.$confirm(res.data.msg, '告警提示', {
                confirmButtonText: '跳转',
                cancelButtonText: '取消',
                type: 'warning',  
              }).then(()=>{
                this.$router.push({path:"/workOrder/Orderdetails/index"})
              })
            }
          })
      },
      //改变页码
    handleSizeChange(val) {
    this.pageSize = val;
    this.getTableData();
    this.searched()
      // console.log(`每页 ${val} 条`);
    },
     handleCurrentChange(val) {
      this.currpage = val;
      this.getTableData();
      this.searched()
      // console.log(`当前页: ${val}`);
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
        //行选中
    checkedselect(row) {
      this.$refs.multipleTable.toggleRowSelection(row);
    },

    handleSelectionChange(val) {
        // console.log("val",val)  //选中的行所有数据
      // this.multipleSelection = val;
          // console.log(this.multipleSelection)
      if (this.multipleSelection.length > 1) {   
        // 如不进行判断则勾选完毕后批量删除按钮还是会在
        this.multipleSelectionFlag = true;
      }else{
            this.multipleSelectionFlag = false;
      }  
      this.dataSlection = [];
      this.multipleSelection = [];
      val.forEach( item =>{
        this.dataSlection.push(item.id) //每条多选的id
        console.log(this.dataSlection)
        this.multipleSelection.push(item)  //选中的每条多选
      })
        // console.log(this.multipleSelection);        
    },
  },

    watch: {}

  }

</script>
<style lang='scss' scoped>
  .block{
    text-align: center;
  }
 .search{
    margin:15px ;
    
  }
  .topButton{
    margin-top: 50px;
  }
  .size-full{
    width:100%
  }
   .textWidth{
    width: 91%;
  }
</style>