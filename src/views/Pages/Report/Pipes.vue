<template>
  <div class="wrapper m-2">
    <div class="col-md-12 form-row pt-2" style="margin-bottom: 10px;">
      <div class="d-flex" style="max-width: none; align-items: center; margin-right: 20px;">
        <Label text="Tháng:" />
        <el-date-picker size="mini" v-model="search.Month" type="month" placeholder="Chọn tháng" format="MM/yyyy" />
      </div>
      <div class="d-flex" style="max-width: none; align-items: center; margin-right: 20px;">
        <Label text="Loại:" />
        <el-select size="mini" placeholder="Chọn loại" v-model="search.RType">
          <el-option label="Toàn bộ" value="0" key="0"></el-option>
          <el-option label="Tạo mới" value="create" key="create"></el-option>
          <el-option label="Chỉnh sửa" value="edit" key="edit"></el-option>
          <el-option label="Xóa" value="delete" key="delete"></el-option>
        </el-select>
      </div>
      <div class="d-flex" style="max-width: none; align-items: center; margin-right: 20px;">
        <Label text="Tên ống:" style="white-space: nowrap;" />
        <el-input size="mini" v-model="search.PipeName" />
      </div>
      <base-button type="primary" native-type="submit" style="margin-top: 0px; margin-left: 5px"
        :loading="isLoadingReport" @click="handleFindPage">
        <span class="btn-inner--icon"><i class="fas fa-search"></i></span>
        <span class="btn-inner--text">&nbsp;Tìm kiếm</span>
      </base-button>
    </div>
    <el-card style="margin-top: 10px">
      <template #header class="el-card-header">
        <div style="padding: 5px 10px;" class="form-row">
          <div class="col-md-6">
            <base-button type="primary" outline native-type="submit" @click="downloadReport">
              <span class="btn-inner--icon"><i class="el-icon-download"></i></span>
              <span class="btn-inner--text">&nbsp;Xuất báo cáo</span>
            </base-button>
          </div>
        </div>
      </template>
      <div class="col-md-12 pt-2 tbl">
        <el-table :data="tableData.content" fit header-row-class-name="thead-light" height="100%" :border="true" stripe>
          <el-table-column label="STT" type="index"></el-table-column>
          <el-table-column label="Ngày tạo" align="center" width="150" prop="d_ngay_tao" header-align="center">
            <template slot-scope="scope">
              <span>{{ moment(scope.row.d_ngay_tao).format('DD/MM/YYYY HH:mm:ss') }}</span>
            </template>
          </el-table-column>
          <el-table-column label="Người tạo" width="150" prop="c_nguoi_tao" header-align="center">
          </el-table-column>
          <el-table-column label="Tên ống" width="150" prop="c_ten_tuyen_ong" header-align="center">
          </el-table-column>
          <el-table-column label="Loại" width="150" prop="c_loai_bao_cao" header-align="center" align="center">
            <template slot-scope="scope">
              <el-tag type="success" v-if="scope.row.c_loai_bao_cao == 'create'">Thêm ống</el-tag>
              <el-tag type="warning" v-if="scope.row.c_loai_bao_cao == 'edit'">Sửa ống</el-tag>
              <el-tag type="danger" v-if="scope.row.c_loai_bao_cao == 'delete'">Xóa ống</el-tag>
              <el-tag type="warning" v-if="scope.row.c_loai_bao_cao == 'maintenance'">Thay ống</el-tag>
              <el-tag type="success" v-if="scope.row.c_loai_bao_cao == 'finish'">Hoàn thành thay</el-tag>
              <el-tag type="danger" v-if="scope.row.c_loai_bao_cao == 'cancel'">Hủy thay</el-tag>
            </template>
          </el-table-column>
          <el-table-column label="Chi tiết" prop="c_chi_tiet_bao_cao" header-align="center">
          </el-table-column>
        </el-table>
      </div>
      <div class="col-12 py-2 pagination" style="justify-content: end;">
        <el-pagination :page-sizes="[10, 20, 30, 50]" background layout="total,sizes,  prev, pager, next"
          :page-size="pageRequest.pageSize" :current-page.sync="pageRequest.pageNum"
          @current-change="handleCurrentPageChange" @size-change="handleSizeChange" :total="total">
        </el-pagination>
      </div>
    </el-card>
  </div>
</template>
<script>
import Label from "../components/Label.vue";
import Input from "../components/Input.vue";
import DropdownList from "../components/DropdownList.vue";
import { saveAs } from "file-saver";
import moment from "moment";

export default {
  components: {
    Label,
    Input,
    DropdownList,
  },
  data() {
    return {
      tableData: [],
      isLoadingReport: false,
      total: 0,
      search: {
        RType: "0",
        PipeName: '',
        Month: new Date()
      },
      pageRequest: {
        columnFilters: {
        },
        pageSize: 20,
        pageNum: 1,
      }
    }
  },
  methods: {
    handleFindPage() {
      console.log(moment(new Date(this.search.Month)).format("01/MM/YYYY") )
      this.isLoadingReport = true
      let SearchType = 0
      let PipeName = this.search.PipeName
      if (PipeName.indexOf('"') != -1) {
        PipeName = PipeName.substring(1, PipeName.length - 1)
        SearchType = 1
      } else {
        PipeName = this.search.PipeName
        SearchType = 0
      }
      this.pageRequest.columnFilters = {
        RType: { value: this.search.RType },
        PipeName: { value: PipeName },
        SearchType: { value: SearchType },
        Month: { value: moment(new Date(this.search.Month)).format("01/MM/YYYY") }
      }

      this.$api.pipes.findPipeReport(this.pageRequest).then(res => {
        if (res.code == 200) {
          this.isLoadingReport = false
          this.tableData = res.data
          this.total = res.data.totalSize
        }
      })
    },
    handleCurrentPageChange(val) {
      this.pageRequest.pageNum = val
      this.handleFindPage()
    },

    handleSizeChange(val) {
      this.pageRequest.pageSize = val
      this.handleFindPage()
    },
    downloadReport() {
      this.$api.pipes.downloadPipeReport(this.pageRequest).then((response) => {
        saveAs(
          new Blob([response]),
          "Bao_cao_ong_nuoc_thang_" +
          moment(new Date(this.search.Month)).format("YYYY") + ".xlsx"
        );
      });
    },
  },
  mounted() {
    this.handleFindPage()
  }
}
</script>
<style scoped>
.tbl {
  height: calc(100vh - 210px);
}
</style>