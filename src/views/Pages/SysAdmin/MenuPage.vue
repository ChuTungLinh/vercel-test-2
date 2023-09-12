<template>
  <div>

    <!-- <div class="col-md-12 form-row pt-2">
        <div class="col-md-6 flex">
           <Label text="Tên chức năng:" />
           <Input placeholder="Nhập tên chức năng" v-model="searchForm.cTenChucNang" />            
        </div>
        <div class="col-md-6 flex">
           <Label text="Tìm kiếm theo loại:" />
            <DropdownList v-model="searchForm.nLoai" size="mini"  >
              <el-option label="Menu gốc" value="1"></el-option>
              <el-option label="Menu" value="2"></el-option>
              <el-option label="Button" value="3"></el-option>
          </DropdownList>
          <base-button type="primary" native-type="submit" style="margin-top:0px; margin-left: 5px;"  @click="findMenu()">
            <span class="btn-inner--icon"><i class="fas fa-search"></i></span>
            <span class="btn-inner--text">&nbsp;Tìm kiếm</span>
          </base-button>            
        </div>           
    </div> -->

  <el-card class="box-card">
    <template #header class="el-card-header">
        <div style="padding: 5px 10px;" class="form-row justify-content-center">
        <!-- <div class="col-md-6"> -->
          <div class="col-md-12">
            <base-button type="primary" outline native-type="submit"  @click="handleAdd('desserts')">
                <span class="btn-inner--icon"><i class="fas fa-plus"></i></span>
                <span class="btn-inner--text">&nbsp;Thêm chức năng</span>
            </base-button>
          </div>
          <!-- </div> -->
        </div>
    </template>
    <div class="col-md-12 tbl">
   
      <el-table
        :data="listchucnang"
        header-row-class-name="thead-light"
        row-key="nMaChucNang"
        :border="true"
        size="mini"
        stripe
        height="100%"
        >
        <el-table-column
          label="Mã chức năng"
          prop="nMaChucNang"
          min-width="100px">
          
        </el-table-column>

        <el-table-column
          label="Tên chức năng"
          prop="cTenChucNang"
          
          width="250px"
          >
          
        </el-table-column>

        <el-table-column
          label="Url"
          prop="cUrl"
          >
          
        </el-table-column>

        <el-table-column
          label="Loại"
          prop="nLoai">
           
          <template slot-scope="scope">
            <el-tag
              effect="dark"
              :type="scope.row.nLoai === 1? 'success' : scope.row.nLoai === 2?'danger': scope.row.nLoai === 3?'info':''"
              disable-transitions
              >
              {{scope.row.nLoai === 1 ? 'Menu gốc' : scope.row.nLoai === 2 ? 'Menu' :  scope.row.nLoai === 3? 'Button':''}}
              </el-tag>
          </template>
          
        </el-table-column>

        <el-table-column
          label="Thứ tự"
          header-align="center"
          prop="nThuTu"
          min-width="50px">
          
        </el-table-column>

        <el-table-column
          label="Icon"
          prop="Icon">
          <template slot-scope="scope">
						<i :class="scope.row.cIcon"></i> 
		      </template>
        </el-table-column>
        <el-table-column 
        width="160px"
          label="Hành động"
          style="font-family:Arial, Helvetica, sans-serif !important"
          >
          <template slot-scope="scope">
            <el-button
              type="primary"
              size="mini"

              @click="handleEdit(scope.$index, scope.row)" ><i class="el-icon-edit"></i> Sửa</el-button>
            <el-button
              type="danger"
              size="mini"
              @click="handleDelete(scope.$index, scope.row)"><i class="el-icon-delete"></i> Xóa</el-button>
          </template>
        </el-table-column>
      </el-table>
    </div>
  </el-card>

    <modal 
      :show.sync="centerDialogVisible">
      <h6 slot="header" style="color: black" v-if="!operation"><i class="fa fa-edit" style="margin-right: 3px;"></i> Chỉnh sửa chức năng</h6>
      <h6 slot="header" style="color: black" v-if="operation"><i class="fa fa-plus" style="margin-right: 3px;"></i> Thêm mới chức năng</h6>
      <el-form size="mini"
          :model="desserts" :rules="rules" ref="desserts" label-width="150px" class="col-md-12 pt-2">
        <el-form-item label="Loại" prop="nLoai">
          <el-radio-group @change="radio" v-model="desserts.nLoai">
            <el-radio key="1"  :label="1">Menu gốc</el-radio>
            <el-radio key="2"  :label="2">Menu</el-radio>
            <el-radio key="3"  :label="3">Button</el-radio>
          </el-radio-group>
        </el-form-item>
        
        <el-form-item
          label="Tên chức năng"
          prop="cTenChucNang"
        >
        <el-input v-model="desserts.cTenChucNang" autocomplete="off"></el-input>
        </el-form-item>

        <div>
          <el-form-item
          label="Menu cha"
          
          >
            <div>
              <el-popover ref="popover" trigger="click"  >
                <el-tree
                style="opacity:1"
                :data="menuData"
                node-key="id"
                @node-click="handleNodeClick"
                :render-content="renderContent">
              </el-tree>
              </el-popover>
              <el-input v-popover:popover :readonly="true"  style="cursor:pointer;" label="valuetree" v-model="desserts.parentName"></el-input>
            </div>
          </el-form-item>
        </div>
        <el-form-item
          label="Đường dẫn"
          prop="cUrl"
          v-if="!operation1"
        >
        <el-input v-model="desserts.cUrl" autocomplete="off"></el-input>
        </el-form-item>
        
        <el-form-item
          label="Quyền"
          prop="cQuyen"
          v-if="oparationquyen"
          :rules="[{  required: true, message: 'Xin vui lòng nhập quyền', trigger: 'blur' }]"
        >
          <el-input v-model="desserts.cQuyen" autocomplete="off"></el-input>
        </el-form-item>
        
        <el-form-item
          label="Quyền"
          prop="cQuyen"
          v-if="!oparationquyen"
        >
          <el-input v-model="desserts.cQuyen" autocomplete="off"></el-input>
        </el-form-item>

        <el-form-item
          label="Icon"
          prop="cIcon"
        >
        <el-input v-model="desserts.cIcon" autocomplete="off"></el-input>
        </el-form-item>

        <el-form-item
          label="Thứ tự"
          prop="nThuTu"
        >
        <el-input v-model.number="desserts.nThuTu" autocomplete="off"></el-input>
        </el-form-item>

        </el-form>   
        <template slot="footer">
        <base-button type="primary"  @click="submitForm('desserts')">Lưu</base-button>
        <base-button type="danger" v-if="operation"  @click="resetForm('desserts')">Làm mới</base-button>
        <base-button type="danger" @click="closeForm('desserts')">Hủy</base-button>
        </template>
                                       
    </modal>
 </div>
</template>
<script>
  import Input from "../components/Input.vue"
  import Label from "../components/Label.vue"
  import { Table,Button, TableColumn, Pagination, Card, Option } from 'element-ui'
  import DatePicker from "../components/DatePicker.vue"
  import DropdownList from "../components/DropdownList.vue"
export default {
  components:{
    [Button.name]: Button,
    Input, Label, DropdownList, 
    [Table.name]: Table,
    [TableColumn.name]: TableColumn,
    [Pagination.name]: Pagination,
    [Card.name]: Card,
    [Option.name]: Option

  },
  data(){
    return {
      defaultProps: {
        children: 'children',
        label: 'label'
      },
      searchForm: {
        cTenChucNang: '',
        nLoai: '1',
      },
      loading: false,
      dialogVisible: false,
      operation1: false,
      centerDialogVisible: false,
      oparationquyen:false,
      listchucnang:[],
      pageRequest: {pageNum: 1, pageSize: 10},
      nametree:'',
      valuetree:'',
      desserts:{
        level: 0,
        parentName: "",
        cTenChucNang:"",
        nMaChucNangCha:"",
        cUrl:"",
        cQuyen:"",
        nLoai:"",
        cIcon:"",
        nThuTu:"",
        nTinhTrang:"",
        cNguoiTao:"",
        dNgayTao:"",
        cNguoiCapNhatCuoi:"",
        dNgayCapNhatCuoi:"",
      },

      rules: {
          cTenChucNang: [
            { required: true, message: 'Xin vui lòng nhập tên chức năng', trigger: 'blur' },
          ],
          cUrl: [
            {  required: true, message: 'Xin vui lòng nhập cUrl', trigger: 'blur' }
          ],
          // nQuyen: [
          //   {  required: true, message: 'Xin vui lòng nhập quyền', trigger: 'blur' }
          // ],
          nLoai: [
            {  required: true, message: 'Xin vui lòng chọn loại chức năng', trigger: 'blur' }
          ],
          nThuTu: [
            {  required: true, message: 'Xin vui lòng nhập thứ tự', trigger: 'blur' }
          ],
          nTinhTrang: [
            {  required: true, message: 'Xin vui lòng nhập trình trạng', trigger: 'blur' }
          ],
          cNguoiTao: [
            {  required: true, message: 'Xin vui lòng nhập người tạo', trigger: 'blur' },
            { min: 3, message: 'Độ dài tối thiểu là 3 chữ', trigger: 'blur' }
          ],
          dNgayTao: [
            { type: 'date', required: true, message: 'Xin vui lòng chọn ngày tạo', trigger: 'change' }
          ],
          dNgayCapNhatCuoi: [
            { type: 'date', required: true, message: 'Xin vui lòng chọn ngày cập nhật cuối', trigger: 'change' }
          ],
        },
        menuLoading: false,
        operation: false,
        menuData:[],
    }
  },
   
  methods:{
    handleSizeChange(val) {
      // this.viewchucnang(this.pageRequest.pageNum, val)
      this.findMenu(this.pageRequest.pageNum, val)
    },
    handleCurrentChange(val) {    
      // this.viewchucnang(val, this.pageRequest.pageSize)
      this.findMenu(val, this.pageRequest.pageSize)
    },
    findMenuTree(){
    this.menuLoading = true
    this.$api.menu.findMenuTree().then((res) => {
      this.menuData = res.data;
      this.menuLoading = false
    })
    },
    findMenu(){
        this.pageRequest.columnFilters = {
          cTenChucNang: {value: this.searchForm.cTenChucNang},
          nLoai: {value: this.searchForm.nLoai}
        }
        this.$api.menu.findMenu(this.pageRequest).then((res) => {
          if(res.code == 200 && res.data)
              this.listchucnang = res.data
        })
        this.findMenuTree()
    },

    radio(){
      if(this.desserts.nLoai==1 || this.desserts.nLoai==3)
      {
        this.operation1= true
        if(this.desserts.nLoai==3)
        {
          this.oparationquyen=true
        }
        else{
          this.oparationquyen=false
        }
      }
      else
        {
          this.operation1= false
          this.oparationquyen=false
        }
    },

    handleAdd (formName) {
      this.centerDialogVisible= true,
      this.$refs[formName].resetFields();
      this.operation = true;
      this.desserts={
        level: 0,
        parentName: "",
        cTenChucNang:"",
        nMaChucNangCha:'',
        cUrl:"",
        cQuyen:"",
        nLoai:"",
        cIcon:"",
        nThuTu:"",
        nTinhTrang:"",
        cNguoiTao:"",
        dNgayTao:"",
        cNguoiCapNhatCuoi:"",
        dNgayCapNhatCuoi:"",
      },
      this.nametree='',
      this.valuetree=''
      },
    submitForm(check) {
      this.desserts.nMaChucNangCha = this.valuetree
        this.$refs[check].validate((valid) => {
          if (valid) 
          {
            // let params = Object.assign({}, this.desserts)
            this.$api.menu.addchucnang(this.desserts).then((res) => {
            if (res.code == 200) 
            {
              if(this.operation === true){
                this.$message({message: 'Thêm chức năng thành công', type: 'success'})
              }
              else
              {
                this.$message({message: 'Sửa chức năng thành công', type: 'success'})
              }
              this.$refs[check].resetFields();
              // this.viewchucnang() 
              this.findMenu() 
               this.centerDialogVisible=false
            }
            else
            {
              if(this.operation === true){
                this.$message({message: 'Thêm chức năng không thành công', type: 'error'})
              }
              else
              {
                this.$message({message: 'Sửa chức năng không thành công', type: 'error'})
              }
              return false;
            }
          })
            this.desserts={
              cTenChucNang:"",
              nMaChucNangCha:"",
              cUrl:"",
              cQuyen:"",
              nLoai:"",
              cIcon:"",
              nThuTu:"",
              nTinhTrang:"",
              cNguoiTao:"",
              dNgayTao:"",
              cNguoiCapNhatCuoi:"",
              dNgayCapNhatCuoi:"",
            }
            this.nametree='',
            this.valuetree=''
          } else 
          {
            return false;
          }
        });
      },
    resetForm(formName) {
        this.$refs[formName].resetFields();
        this.desserts={
        cTenChucNang:"",
        nMaChucNangCha:"",
        cUrl:"",
        cQuyen:"",
        nLoai:'',
        cIcon:"",
        nThuTu:"",
        nTinhTrang:"",
        cNguoiTao:"",
        dNgayTao:"",
        cNguoiCapNhatCuoi:"",
        dNgayCapNhatCuoi:"",
       },
       this.nametree='',
       this.valuetree=''
      },
    handleEdit(index,item) {
         this.centerDialogVisible= true,
         this.operation = false
         this.operation1= false
         this.desserts = Object.assign({},item)
         this.radio()
        this.valuetree = item.nMaChucNangCha
      },
    handleDelete(index,itemDelete){
      let panma = {nMaChucNang: itemDelete.nMaChucNang}
      this.$confirm('Bạn có muốn xóa chức năng này không', 'Thông báo', {
          confirmButtonText: 'Đồng ý',
          cancelButtonText: 'Hủy bỏ',
          type: 'warning'
        }).then(()=>{
          this.$api.menu.deletechucnang([panma]).then((res) => {    
          this.$message({message: `Xóa thành công chức năng ${itemDelete.cTenChucNang}`, type:'success'})
          // this.viewchucnang()  
          this.findMenu()  
          })
        }).catch(() => {
          this.$message({
            type: 'info',
            message: 'Xóa chức năng không thành công'
          }); 
        });      
    },
    renderContent(h, { node, data, store }) {
        return (
          <span class="custom-tree-node">
            <span>{data.cTenChucNang}</span>
          </span>);
      },
    handleNodeClick(data) {
      this.desserts.parentName=data.cTenChucNang
      this.valuetree=data.nMaChucNang
      if(this.desserts.cTenChucNang==this.desserts.parentName)
      {
        this.$message({message: `Không chọn ${data.cTenChucNang} làm chức năng con của ${data.cTenChucNang}`, type:'warning'})
      }
    },
    closeForm(formName){
      this.$refs[formName].resetFields();
      this.centerDialogVisible = false
    },
    // handleSearch: function() {
    //   this.findMenu()
    // },  
  },
  mounted() {
    // this.viewchucnang()
    this.findMenu()
    this.findMenuTree()
    this.radio()
  },
}
</script>
<style scoped>
.flex {
    display:flex;
}
.box-card {
    margin: 10px;
}

.card-header {
    padding: 0px;
}

button.el-dialog__headerbtn {
    margin-top: -12px;
}
.tbl {
  height: calc(100vh - 275px);
}
  
.modalTemp .modal-footer{
        justify-self: start;
    }

</style>

