<template>
  <div>
    <el-dialog :title="title"   width="900px" :visible.sync="dialogFormVisible"  center @close="closeDialog()" :close-on-click-modal="false" :show="show" center >
      <el-form :model="ruleForm" :rules="rules" ref="ruleForm"  >
        <el-row :span ="24">
          <el-col :span="12">
            <el-form-item label="资产名称:" :label-width="formLabelWidth"  prop="assetName">
              <el-input v-model="ruleForm.assetName" placeholder="请输入资产名称" autocomplete="off" width="100px"></el-input>
            </el-form-item>
            <el-form-item label="资产类型:" :label-width="formLabelWidth" prop="id" >
              <el-select v-model="ruleForm.id" placeholder="请选择资产类型"  @change="assetTypeClass(ruleForm.id)" class="size-full">
                <el-option v-for="item in assetTypeClassArr"
                  :key="item.id"
                  :value="item.id"
                  :label="item.assetsTypeName" >
                </el-option>
              </el-select>
            </el-form-item>
               <el-form-item label="资产分类" :label-width="formLabelWidth" prop="assetClass" >
                 <el-select v-model="ruleForm.assetClass" placeholder="请选择漏洞分类" class="size-full">            
                    <el-option   v-for="item in assetClass"
                      :key="item.value"
                      :label="item.label"
                      :value="item.value"
                      :disabled="item.disabled">                   
                      </el-option>                
                  </el-select>
             </el-form-item> 
            <el-form-item label="资产位置:" :label-width="formLabelWidth"  prop="assetLocation">
                <el-input v-model="ruleForm.assetLocation" autocomplete="off"   placeholder="请输入资产位置"></el-input>
            </el-form-item>
             <el-form-item label="资产负责人:" :label-width="formLabelWidth"  prop="assetPerson">
                <el-input v-model="ruleForm.assetPerson" autocomplete="off"   placeholder="请输入资产负责人"></el-input>
            </el-form-item>
             
          </el-col>
          <el-col :span="12">
            <el-form-item label="资产版本:" :label-width="formLabelWidth" prop="assetVersion">
              <el-input v-model="ruleForm.assetVersion"   placeholder="请输入资产版本"  autocomplete="off"></el-input>
            </el-form-item>
            <el-form-item label="子级类型:" :label-width="formLabelWidth" prop="assetSubtype">
              <el-select v-model="ruleForm.assetSubtype" placeholder="请选择子级类型" class="size-full">
                <el-option v-for="item in assetSubtypeClassArr"
                  :key="item.id"
                  :value="item.id"
                  :label="item.assetsTypeName">
                </el-option>
              </el-select>
            </el-form-item>
            <el-form-item label="资产状态:" :label-width="formLabelWidth" prop="assetStatus" >
                 <el-select v-model="ruleForm.assetStatus" placeholder="请选择资产运行状态" class="size-full">            
                    <el-option   v-for="item in options"
                      :key="item.value"
                      :label="item.label"
                      :value="item.value"
                      :disabled="item.disabled">                   
                      </el-option>                
                  </el-select>
            </el-form-item>  
              <el-form-item label="负责人邮箱:" :label-width="formLabelWidth"  prop="assetPersonMail">
                <el-input v-model="ruleForm.assetPersonMail" autocomplete="off"   placeholder="请输入资产负责人邮箱"></el-input>
            </el-form-item>
             <el-form-item label="资产负责人电话:" :label-width="formLabelWidth"  prop="assetPersonPhone">
                <el-input v-model="ruleForm.assetPersonPhone" autocomplete="off"   placeholder="请输入资产负责人电话"></el-input>
            </el-form-item>
          </el-col>
         </el-row>
          <el-row>
            <el-col :span ="24">
              <el-form-item label="资产描述:" :label-width="formLabelWidth"  prop="assetDesc"  >
                <el-input class="textWidth"
                      type="textarea"
                      placeholder="请输入资产描述内容"
                      v-model="ruleForm.assetDesc"
                      maxlength="30"
                      show-word-limit
                    >
                </el-input>
              </el-form-item>
          </el-col>
          </el-row>
    </el-form>
    <div slot="footer" class="dialog-footer">
      <el-button type="danger" size="small" icon="el-icon-refresh"  @click="resetForm('ruleForm')" >重置</el-button>
      <el-button type="primary"  size="small" icon ="el-icon-circle-plus-outline"  @click="getaddassets('ruleForm')">新增</el-button>
    </div>
  </el-dialog>
  </div>
</template>

<script>
import {addAsset} from "@/api/addAssets"
import {getAssetSubType,getAssetParentType} from "@/api/assetsType"
  //   };
var checkPhone = (rule, value, callback) => {
    const phoneReg = /^1[3|4|5|7|8][0-9]{9}$/
    if (!value) {
      return callback(new Error('电话号码不能为空'))
    }
    setTimeout(() => {
      // Number.isInteger是es6验证数字是否为整数的方法,但是我实际用的时候输入的数字总是识别成字符串
      // 所以我就在前面加了一个+实现隐式转换

      if (!Number.isInteger(+value)) {
        callback(new Error('请输入数字值'))
      } else {
        if (phoneReg.test(value)) {
          callback()
        } else {
          callback(new Error('电话号码格式不正确'))
        }
      }
    }, 100)
  }
    var assetVersions = (rule, value, callback) => {
      const reg = /^\d+.?\d{0,5}$/
      if (!value) {
        callback(new Error('请输入数字'))
      } else if (!Number(value)) {
        callback(new Error('请输入数字值'))
      } else {
        if (reg.test(value)) {
          callback()
        } else {
          // callback(new Error('小数点后最多只能输入5位'))
        }
      }
    }

  export default {
    name:'addAssets',
    data () {
      return {
        title:'新增资产',
        dialogFormVisible: this.show,
        formLabelWidth: '110px',
        formLabelWidth:"110px",
        textarea:'',
        assetTypeClassArr:[],
        assetSubtypeClassArr:[],
        superclassId:"",
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
          assetSubtype:"" ,
          dept:"",
         
      },
       options:[
        {
          value: '0',
          label: '正在运行'
        },
        {
          value: '1',
          label: '已终止'
        },
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
      rules: {
          assetName: [
            { required: true, message: '请输入资产名称', trigger: 'blur' }
          ],
          id: [
            { required: true, message: '请选择资产类型', trigger: 'change' }
          ],
          assetClass:[
            {required: true, message: '请选择资产分类', trigger: 'change'}
          ],
          assetVersion: [
              { required: true, validator: assetVersions,trigger: 'blur'},
            
          ],
          assetSubtype: [
            { required: true, message: '请选择子级类型', trigger: 'change' }
          ],
          assetLocation:[
             {required: true, message: '请输入资产位置', trigger: 'blur' }
          ],
          assetPersonMail:[
              { required: true, message: '请输入邮箱地址', trigger: 'blur' },
              { type: 'email', message: '邮箱地址不正确', trigger: ['blur', 'change'] }
          ],
           assetPerson:[
             {required: true, message: '请输入资产负责人', trigger: 'blur' }
          ],
          assetStatus:[
             {required: true, message: '请输入资产状态', trigger: 'blur' }
          ],
          assetDesc:[
             {required: true, message: '请输入资产描述内容', trigger: 'blur' }
          ],
          assetPersonPhone: [
            { required: true,message: "请输入手机号码"  },
            { validator: checkPhone,trigger: 'blur',}
          ]
        }
    };
  },
    props: {
            show: {
                type: Boolean,
                default: false
            }
        },
    components: {},

    computed: {},

    mounted() {
       this.getAssetParentType()
    },

    methods: {
        closeDialog(){
          this.$refs["ruleForm"].resetFields();
          this.$emit("update:show",false)
        },

        getAssetParentType(){
            getAssetParentType().then(res =>{
              // console.log("res",res.data.data)
              this.assetTypeClassArr = res.data.data
              
            })
        
        },

   //获取子级列表
      assetTypeClass(params){
        this.ruleForm.assetSubtype = ""
        // console.log(this.assetSubtypeClassArr)
        // console.log(params);
        getAssetSubType({superclassId:params}).then(res =>{
          // console.log("resgetAssetSubType",res.data.data)
          this.assetSubtypeClassArr = res.data.data;
        
        })
        
      },

      // 新增资产
     getaddassets(formName){
      //  console.log(formName);
       this.$refs[formName].validate((valid) => {
          if (valid) {
            // alert('submit!')
            this.dialogFormVisible =false;
          addAsset({
              assetClass: this.ruleForm.assetClass,
              assetDesc: this.ruleForm.assetDesc,
              assetLocation: this.ruleForm.assetLocation,
              assetName: this.ruleForm.assetName,
              assetPerson: this.ruleForm.assetPerson,
              assetPersonMail: this.ruleForm.assetPersonMail,
              assetPersonPhone: this.ruleForm.assetPersonPhone,
              assetStatus:this.ruleForm.assetStatus,
              assetSubtype: this.ruleForm.assetSubtype,
              assetType:this.ruleForm.id,
              assetVersion: this.ruleForm.assetVersion,
              dept: this.ruleForm.dept,
              }).then(res =>{
                // console.log("138",res);
                if(res.status ==200){
                  // this.$router.go(0);
                  this.$emit('addData');         
                  this.$message({
                    showClose: true,
                    message: res.data.msg,
                    type: 'success',
                    center:true
                  });
                this.$refs[formName].resetFields();
                }
              })
       
          } else {
            // console.log('error submit!!');
            return false;
          }
        });
        
     },
     resetForm(formName){
         this.$refs[formName].resetFields();
     }
     
    },
    watch: {
      show () {
          this.dialogFormVisible = this.show;
       }
    }

  }

</script>
<style lang='scss' scoped>
  .size-full{
    width: 100%;
  }
  .textWidth{
    width: 91%;
  }
</style>