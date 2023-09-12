<template>
  <div class="phathanhhoadondientu">
    <div class="header-phathanhhoadondientu">
        <el-row :gutter="20" style="margin:6px 0px;display: flex;align-items: center;width:99%">
            <el-col :span="6" style="display:flex; float:left">
                <span style="width:130px">Chọn tháng: </span>
                <el-date-picker
                   
                    type="month"
                    size="mini"
                    placeholder="Pick a day">
                </el-date-picker>
            </el-col>

            <el-col :span="9" style="display:flex; float:left">
                <span style="width:95px">Tên phiên: </span>
                <el-input input-classes="input-fix" label="Cán bộ đọc:"
                    @input="findContract"
                    size="mini"
                    placeholder="Nhập cán bộ đọc"
                    >
                </el-input>
            </el-col>

            <el-col :span="9" style="display:flex; float:left">
                <span style="width:105px">Tuyến đọc: </span>
                <el-input input-classes="input-fix" label="Tuyến đọc:"
                    @input="findContract"
                    size="mini"
                    placeholder="Nhập tuyến đọc"
                >
                </el-input>
            </el-col>
      </el-row>
    </div>

    <div class="container-phathanhhoadondientu">
        <div class="container-phathanhhoadondientu-table">
            <el-table
        :data="test"
        header-row-class-name="thead-light"
        :border="true"
        size="mini"
        @selection-change="handleSelectionChange"
        stripe>

        <el-table-column
          type="selection"
          min-width="55">
          
        </el-table-column>

        <el-table-column
          label="Tuyến đọc"
          header-align="center"
          prop="cTuyenDoc">
          
        </el-table-column>

        <el-table-column
          label="Tên phiên"
          prop="cTenPhien"
          >
        </el-table-column>

        <el-table-column
          label="Ngày tạo"
          header-align="center"
          prop="dNgayTao"
          >
          
        </el-table-column>

        <el-table-column
          label="Ngày lập HĐ"
          header-align="center"
          prop="dNgayLapHD">
          <!-- <template slot-scope="scope">
            <el-tag
              effect="dark"
              :type="scope.row.nLoai === 1? '' : scope.row.nLoai === 2?'success': scope.row.nLoai === 3?'danger':'info'"
              disable-transitions
              >
              {{scope.row.nLoai === 1 ? 'Menu gốc' : scope.row.nLoai === 2 ? 'Menu' : scope.row.nLoai === 3 ? 'Button' : 'Liên kết ngoài'}}
              </el-tag>
          </template> -->
        </el-table-column>

        <el-table-column
          label="Seri"
          header-align="center"
          prop="cSeri">
          <!-- <template slot-scope="scope">
						<i :class="scope.row.cIcon"></i> 
		      </template> -->
        </el-table-column>

        <el-table-column
          label="Số HĐ BĐ"
          header-align="center"
          prop="nSoHdBD">
          
        </el-table-column>

        <el-table-column
          label="Số HĐ KT"
          header-align="center"
          prop="nSoHDKT">
          
        </el-table-column>

        <el-table-column
          label="Số HĐ"
          header-align="center"
          prop="nSoHD">
          
        </el-table-column>

        <el-table-column
          label="Tình trạng"
          header-align="center"
          prop="nTinhTrang">
          
        </el-table-column>

        <!-- <el-table-column width="200px"
          label="Hành động">
          <template slot-scope="scope">
            <el-button
              size="mini"
              @click="handleEdit(scope.$index, scope.row)">Sửa</el-button>
            <el-button
              size="mini"
              type="danger"
              @click="handleDelete(scope.$index, scope.row)">Xóa</el-button>
          </template>
        </el-table-column> -->
      </el-table>

        <el-row style="margin: 6px; position:absolute; bottom: 40px;">
            <el-pagination

            @size-change="handleSizeChange"
            @current-change="handleCurrentChange"

            :page-sizes="[5, 10, 20, 30, 40]"

            layout="total, sizes, prev, pager, next, jumper"

            >
            </el-pagination>
        </el-row>
        </div>

    </div>
    <div style="margin-top:6px">
        <el-button type="primary" size="mini" @click="centerDialogVisible = true" icon="el-icon-printer">phát hành hóa đơn điện tử</el-button>
    </div>

    <div>
      <el-dialog
        :visible.sync="centerDialogVisible"
        width="90%"
        top ="0"
      >
      <h6>Phát hành hóa đơn điện tử</h6>
      <el-form ref="sizeForm" :rules="rules"  :model="sizeForm" label-width="120px" size="mini">
          <div>
            <el-row :gutter="20" style="margin-left:6px;display: flex;align-items: center;width:99%">
              <el-col :span="7" style="display:flex; float:left">
                    <span style="width:100px">Chọn tháng: </span>
                    <el-date-picker
                      
                        type="month"
                        size="mini"
                        placeholder="Pick a day">
                    </el-date-picker>
                </el-col>
                <el-col :span="8" style="display:flex; float:left">
                    <span style="width:115px">Cán bộ đọc: </span>
                    <el-input input-classes="input-fix" label="Cán bộ đọc:"
                        @input="findContract"
                        size="mini"
                        placeholder="Nhập cán bộ đọc"
                        >
                    </el-input>
                </el-col>

                <el-col :span="9" style="display:flex; float:left">
                    <span style="width:100px">Tuyến đọc: </span>
                    <el-input input-classes="input-fix" label="Tuyến đọc:"
                        @input="findContract"
                        size="mini"
                        placeholder="Nhập tuyến đọc"
                    >
                    </el-input>
              </el-col>
            </el-row>

            <el-row :gutter="20" style="margin-left:6px;margin-top:6px;display: flex;align-items: center;width:99%">
              <el-col :span="7" style="display:flex; float:left">
                <span style="width:150px">Số hợp đồng: </span>
                <el-input input-classes="input-fix" label="Số hợp đồng:"
                    @input="findContract"
                    size="mini"
                    placeholder="Nhập số hợp đồng"
                >
                </el-input>
              </el-col>

              <el-col :span="8" style="display:flex; float:left">
                <div style="width:160px" class="title">Thanh Toán:</div>
                <el-select style="width: 100%"  @input="findMenu"  placeholder="Chọn thanh toán">
                    <!-- <el-option label="Tất cả loại chức năng" value="5"></el-option> -->
                    <el-option label="Chưa ghi" value="1"></el-option>
                    <el-option label="Đã ghi" value="2"></el-option>
                    <el-option label="ĐH cắt" value="3"></el-option>
                    <el-option label="ĐH không sử dụng" value="4"></el-option>
                    <el-option label="Vắng chủ" value="5"></el-option>
                    <el-option label="Tạm thu" value="6"></el-option>
                    <el-option label="Tạm ngưng" value="7"></el-option>
                </el-select>
              </el-col>

              <el-col :span="9" style="display:flex; float:left">
                  <span style="width:180px">Tên hoặc mã KH: </span>
                  <el-input input-classes="input-fix" label="Tên hoặc mã khách hàng:"
                      @input="findContract"
                      size="mini"
                      placeholder="Nhập tên hoặc mã khách hàng"
                  >
                  </el-input>
              </el-col>
                      
            </el-row>

            <div style="border: double #cccccc 5px;height: 400px; margin-top: 12px;">
              <el-table
                :data="test"
                style="width: 100%"
                height="350px"
                header-row-class-name="thead-light"
                :border="true"
                size="mini"
                @selection-change="handleSelectionChange"
                stripe>

                <el-table-column
                  type="selection"
                  min-width="55">
                  
                </el-table-column>

                <el-table-column
                  label="Tuyến đọc"
                  header-align="center"
                  min-width="100px"
                  prop="cTuyenDoc">
                  
                </el-table-column>

                <el-table-column
                  label="Số HĐ"
                  prop="cTenChucNang"
                  >
                </el-table-column>

                <el-table-column
                  label="Seri ĐH"
                  header-align="center"
                  prop="cUrl"
                  >
                  
                </el-table-column>

                <el-table-column
                  label="Tên khách hàng"
                  header-align="center"
                  min-width="130px"
                  prop="nLoai">
                </el-table-column>

                <el-table-column
                  label="Địa chỉ"
                  header-align="center"
                  prop="cIcon">
                  <!-- <template slot-scope="scope">
                    <i :class="scope.row.cIcon"></i> 
                  </template> -->
                </el-table-column>

                <el-table-column
                  label="T.Thu"
                  header-align="center"
                  prop="nMaChucNang">
                  
                </el-table-column>

                <el-table-column
                  label="Thành tiền"
                  header-align="center"
                  min-width="100px"
                  prop="nMaChucNang">
                  
                </el-table-column>

                <el-table-column
                  label="Phí VAT"
                  header-align="center"
                  prop="nMaChucNang">
                  
                </el-table-column>

                <el-table-column
                  label="Phí BVMT"
                  header-align="center"
                  min-width="90px"
                  prop="nMaChucNang">
                  
                </el-table-column>

                <el-table-column
                  label="Tổng tiền"
                  header-align="center"
                  min-width="100px"
                  prop="nMaChucNang">
                  
                </el-table-column>

                <el-table-column
                  label="Ghi chú"
                  header-align="center"
                  prop="nMaChucNang">
                  
                </el-table-column>
              </el-table>
            </div>

          
          <el-row style="margin: 12px 12px 10px 10px; position:absolute; bottom:138px;">
            <el-pagination

              @size-change="handleSizeChange"
              @current-change="handleCurrentChange"

              :page-sizes="[5, 10, 20, 30, 40]"

              layout="total, sizes, prev, pager, next, jumper"

              >
            </el-pagination>
          </el-row> 
          <el-col style="display:flex; float:left;margin: 6px 0px;">
                <span style="width:100px">Tên phiên: </span>
                <el-input label="tên phiên:"
                    size="mini"
                    placeholder="Nhập tên phiên"
                    >
                </el-input>
            </el-col>
          <el-row :gutter="20" style="margin-left:6px;width: 97%;margin-left: 18px;display: flex;align-items: center;width:99%">
            <el-col :span="7" style="display:flex; float:left">
                <span style="width:100px">Chọn ngày: </span>
                <el-date-picker
                    type="date"
                    size="mini"
                    placeholder="Chọn ngày">
                </el-date-picker>
            </el-col>
            <el-col :span="8" style="display:flex; float:left">
                <span style="width:115px">Mẫu HĐ: </span>
                <el-input input-classes="input-fix" label="Mã HĐ:"
                    size="mini"
                    placeholder="Nhập mẫ HĐ"
                    >
                </el-input>
            </el-col>

            <el-col :span="9" style="display:flex; float:left">
                <span style="width:100px">Seri ĐH: </span>
                <el-input input-classes="input-fix" label="Seri ĐH"
                    size="mini"
                    placeholder="Nhập seri ĐH"
                >
                </el-input>
            </el-col>
      </el-row>
          <div class="col left-col" style="display:grid;left: 68%;margin-top: 12px;">

              <el-form-item size="large" class="button-addhopdong">
                <el-button @click="closeForm()">Đóng</el-button>
                <el-button type="primary" @click="onSubmit('sizeForm')">Phát hành</el-button>
              
              </el-form-item>
          </div>
        </div>  
        
        
        </el-form> 
                                 
      </el-dialog>
    </div>

  </div>
</template>
<script>
import {Button} from "element-ui";


export default {
  components:{
    [Button.name]: Button,
    // Addhopdong,

  },
  data(){
    return{
      centerDialogVisible: false,
      test:[
        {
          cTuyenDoc:'Hải phòng',
          cTenPhien:'ca1',
          dNgayTao:'22/7/2022',
          dNgayLapHD:'22/7/2022',
          cSeri:'1234',
          nSoHdBD:'123',
          nSoHDKT:'122',
          nSoHD:'1',
          nTinhTrang:'1'
        },
        {
          cTuyenDoc:'Hà nội',
          cTenPhien:'ca2',
          dNgayTao:'21/7/2022',
          dNgayLapHD:'22/7/2022',
          cSeri:'1243',
          nSoHdBD:'12',
          nSoHDKT:'13',
          nSoHD:'2',
          nTinhTrang:'2'
        },
      ]
    }
  },
  methods:{
    closeForm(){
      this.centerDialogVisible = false
    },
    handleSelectionChange:function(val) {
        // this.multipleSelection = val;
      }
  }
}
</script>

<style>
.container-phathanhhoadondientu{
    height: 495px;
    border: 1px solid #ccc;
}
.container-phathanhhoadondientu-table{
    height: 450px;
    margin: 3px;
    border: 1px solid #ccc;
}

</style>
