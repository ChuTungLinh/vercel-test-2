<template>
  <div class="wrapper m-2">
    <div class="col-md-12 form-row pt-2">
      <div class="col-md-6 flex">
        <Label text="Tên khách hàng:" />
        <Input placeholder="Nhập tên khách hàng" v-model="searchForm.cTenKhachHang" />
      </div>

      <div class="col-md-6 flex">
        <Label text="Địa chỉ:" />
        <Input placeholder="Nhập địa chỉ khách hàng" v-model="searchForm.cDiaChi" />
      </div>
    </div>

    <div class="col-md-12 form-row pt-2">
      <div class="col-md-6 flex">
        <Label text="Email:" />
        <Input placeholder="Nhập email khách hàng" v-model="searchForm.cEmail" />
      </div>

      <div class="col-md-6 flex">
        <Label text="Số điện thoại:" />
        <Input placeholder="Nhập số điện thoại khách hàng" v-model="searchForm.cDienThoai" />

        <base-button type="primary" native-type="submit" style="margin-top: 0px; margin-left: 5px"
          :loading="isSearchLoading" @click="handleSearch">
          <span class="btn-inner--icon"><i class="fas fa-search"></i></span>
          <span class="btn-inner--text">&nbsp;Tìm kiếm</span>
        </base-button>
      </div>
    </div>

    <el-card class="box-card">
      <template #header class="el-card-header">
        <div class="flex">
          <div style="padding: 5px 10px" class="form-row justify-content-center">
            <div class="col-md-12">
              <base-button type="primary" outline native-type="submit" @click="handleAdd()">
                <span class="btn-inner--icon"><i class="fas fa-plus"></i></span>
                <span class="btn-inner--text">&nbsp;Thêm hợp đồng</span>
              </base-button>
            </div>
          </div>
          <div style="padding: 5px 10px" class="form-row justify-content-center">
            <div class="col-md-12">
              <base-button type="success" outline native-type="submit" @click="handlePick">
                <span class="btn-inner--icon"><i class="fa fa-upload"></i></span>
                <span class="btn-inner--text">&nbsp;Nhập theo danh sách</span>
              </base-button>
            </div>
          </div>
          <div style="padding: 5px 10px" class="form-row justify-content-center">
            <div class="col-md-12">
              <base-button type="success" outline native-type="submit" @click="downloadCustomerTemplate">
                <span class="btn-inner--icon"><i class="fa fa-download"></i></span>
                <span class="btn-inner--text">&nbsp;Tải mẫu nhập theo danh sách</span>
              </base-button>
            </div>
          </div>
        </div>
      </template>

      <div class="col-md-12 tbl tbl1">
        <el-table ref="tableData" @row-click="handleRowClick" :data="listhopdong.content" highlight-current-row stripe
          height="100%" header-align="center" header-row-class-name="thead-light" :border="true" size="mini"
          class="dataTableC">

          <el-table-column label="Mã HĐ" header-align="center" prop="nMaHopDong" width="80">
          </el-table-column>

          <el-table-column label="Tên khách hàng" width="150" header-align="center" prop="cTenKhachHang">
          </el-table-column>

          <el-table-column label="Địa Chỉ" width="250" header-align="center" prop="cDiaChi">
          </el-table-column>

          <el-table-column label="Điện Thoại" header-align="center" prop="cDienThoai" width="120px">
          </el-table-column>

          <el-table-column label="Ngày ký" header-align="center" width="100" prop="dNgayKy">
            <template slot-scope="scope">
              <span>{{ moment(scope.row.dNgayKy).format("DD/MM/YYYY") }}</span>
            </template>
          </el-table-column>

          <el-table-column label="Đối tượng giá" header-align="center" prop="cTenDoiTuong" width="120px">
          </el-table-column>

          <el-table-column label="Phương thức thanh toán" header-align="center" prop="cTenPhuongThuc" width="220">
          </el-table-column>

          <el-table-column label="Serial đồng hồ" header-align="center" prop="cSerial" width="150">
          </el-table-column>

          <el-table-column label="Tuyến đọc" header-align="center" prop="cTenTuyen" width="150">
          </el-table-column>

          <el-table-column label="Tình trạng" header-align="center" prop="cDienThoai" width="120" align="center">
            <template slot-scope="scope">
              <el-tag type="success" v-if="scope.row.nTinhTrang == 1">Bình thường</el-tag>
              <el-tag type="danger" v-if="scope.row.nTinhTrang == 0">Hết hạn</el-tag>
            </template>
          </el-table-column>

          <el-table-column label="Hồ sơ" width="150px">
            <template slot-scope="scope">
              <el-button type="primary" size="mini" @click="handleDocument(scope.$index, scope.row)">
                <i class="el-icon-s-grid"></i>
                Danh sách hồ sơ
              </el-button>
            </template>
          </el-table-column>
        </el-table>
      </div>
      <div class="col-12 py-2 pagination" style="justify-content: space-between">
        <div class="row-btn">
          <el-button :disabled="!selected" type="info" size="mini" class="setting-btn" @click="handleView(selectedRow)">
            <i class="el-icon-view"></i>
            Xem
          </el-button>

          <el-button :disabled="!selected || selectedRow.nTinhTrang == 0" type="primary" size="mini" class="setting-btn"
            @click="handleEdit(selectedRow)">
            <i class="el-icon-edit"></i>
            Sửa
          </el-button>
          <el-button :disabled="!selected || selectedRow.nTinhTrang == 0" size="mini" type="warning" class="setting-btn"
            @click="showChangeClock(selectedRow)"><i class="fas fa-tools"></i>
            Thay ĐH</el-button>
          <el-button :disabled="!selected || selectedRow.nTinhTrang == 0" class="setting-btn" type="danger" size="mini"
            @click="handleDelete(selectedRow)">
            <i class="el-icon-delete"></i>
            Xóa
          </el-button>
        </div>
        <el-pagination @size-change="handleSizeChange" @current-change="handleCurrentChange"
          :current-page.sync="listhopdong.pageNum" :page-sizes="[5, 10, 20, 30, 40]" :page-size="listhopdong.pageSize"
          layout="total, sizes, prev, pager, next, jumper" :total="listhopdong.totalSize">
        </el-pagination>
      </div>
    </el-card>

    <modal :show.sync="centerDialogVisible">
      <h6 slot="header" style="color: black" v-if="editcontract">
        <i class="el-icon-edit"></i> Chỉnh sửa hợp đồng
      </h6>
      <h6 slot="header" style="color: black" v-if="operation">
        <i class="el-icon-plus"></i> Thêm hợp đồng
      </h6>
      <h6 slot="header" style="color: black" v-if="viewcontract">
        <i class="el-icon-view"></i> Xem hợp đồng
      </h6>

      <el-form ref="sizeForm" :rules="rules" :show-message="false" :model="sizeForm" label-width="150px" size="mini">
        <div class="row">
          <div class="col">
            <el-form-item label="Tên khách hàng" v-if="!viewcontract" prop="cTenKhachHang">
              <el-autocomplete style="width: 100%" size="small" v-model="sizeForm.cTenKhachHang"
                :fetch-suggestions="querySearch" placeholder="Vui lòng nhập tên khách hàng"
                @select="handleSelect"></el-autocomplete>
            </el-form-item>

            <el-form-item label="Tên khách hàng" v-if="viewcontract" prop="cTenKhachHang">
              <el-autocomplete :disabled="true" style="width: 100%" size="small" v-model="sizeForm.cTenKhachHang"
                :fetch-suggestions="querySearch" placeholder="Vui lòng nhập tên khách hàng"
                @select="handleSelect"></el-autocomplete>
            </el-form-item>

            <fieldset class="ttkhachhang">
              <legend>Thông tin khách hàng</legend>

              <div class="test">
                <div class="row">
                  <!--<div class="col">
                    <el-form-item label="Mã KH:" prop="nMaKhachHang">
                      <el-input
                        v-model="sizeForm.nMaKhachHang"
                        :disabled="true"
                      ></el-input>
                    </el-form-item>
                  </div>-->
                  <div class="col">
                    <el-form-item label="Điện thoại:">
                      <el-input v-model="sizeForm.cDienThoai" :disabled="viewcontract"></el-input>
                    </el-form-item>
                  </div>
                </div>
              </div>

              <el-form-item class="test1" label="Địa chỉ:" prop="cDiaChi">
                <el-input v-model="sizeForm.cDiaChi" :disabled="viewcontract"></el-input>
              </el-form-item>

              <el-form-item class="test1" label="Email:">
                <el-input v-model="sizeForm.cEmail" :disabled="viewcontract"></el-input>
              </el-form-item>

              <div class="test">
                <div class="row">
                  <div class="col">
                    <el-form-item label="Số CMND:" prop="cCccd">
                      <el-input v-model="sizeForm.cCccd" :disabled="viewcontract"></el-input>
                    </el-form-item>
                  </div>
                  <div class="col">
                    <el-form-item label="Ngày Cấp:" prop="dNgayCapCccd">
                      <el-date-picker :disabled="viewcontract" class="date-input-ngaycap" type="date"
                        placeholder="Chọn ngày cấp" v-model="sizeForm.dNgayCapCccd" format="dd/MM/yyyy"></el-date-picker>
                    </el-form-item>
                  </div>
                </div>
              </div>

              <el-form-item class="test1" label="Nơi cấp:" prop="cNoiCapCccd">
                <el-input v-model="sizeForm.cNoiCapCccd" :disabled="viewcontract"></el-input>
              </el-form-item>

              <el-form-item class="test1" label="Tên ngân hàng:" prop="nMaNganHang">
                <el-select :disabled="viewcontract" v-model="sizeForm.nMaNganHang" filterable style="width: 100%"
                  placeholder="Chọn ngân hàng">

                  <el-option v-for="item in listnganhang" :key="item.nMaNganHang" :label="item.cTenNganHang"
                    :value="item.nMaNganHang">
                    <img style="max-height: 80%; margin: auto;" :src="`/img/banklogo/${item.nMaNganHang}.png`" alt="">{{
                      item.cTenNganHang }}
                  </el-option>
                </el-select>
              </el-form-item>

              <el-form-item class="test1" label="Số TKNH:" prop="cSoTaiKhoanNganHang">
                <el-input v-model="sizeForm.cSoTaiKhoanNganHang" :disabled="viewcontract"></el-input>
              </el-form-item>

              <el-form-item class="test1" label="Tên chủ TKNH:" prop="cTenChuTaiKhoan">
                <el-input v-model="sizeForm.cTenChuTaiKhoan" :disabled="viewcontract"></el-input>
              </el-form-item>
              <el-form-item class="test1" label="Mã số thuế:" prop="cMaSoThue">
                <el-input v-model="sizeForm.cMaSoThue" :disabled="viewcontract"></el-input>
              </el-form-item>
            </fieldset>
          </div>

          <div class="col">
            <fieldset style="padding: 10px">
              <legend>Thông tin hợp đồng</legend>

              <!-- <div class="test1">
                <el-form-item label="Mã KH:" prop="nMaKhachHang">
                  <el-input
                    v-model="sizeForm.nMaKhachHang"
                    :disabled="true"
                  ></el-input>
                </el-form-item>
              </div> -->

              <div class="row">
                <div class="col">
                  <el-form-item class="test1" label="ĐT giá:" prop="nMaDoiTuongGia">
                    <el-select :disabled="viewcontract" v-model="sizeForm.nMaDoiTuongGia" filterable
                      placeholder="Chọn đối tượng giá">
                      <el-option v-for="item in listdoituonggia" :key="item.nMaDoiTuong" :label="item.cTenDoiTuong"
                        :value="item.nMaDoiTuong">
                      </el-option>
                    </el-select>
                  </el-form-item>
                </div>
              </div>
              <div class="row">
                <div class="col">
                  <el-form-item class="test1" label="Phương thức TT:" prop="nMaPhuongThucThanhToan">
                    <el-select :disabled="viewcontract" v-model="sizeForm.nMaPhuongThucThanhToan" filterable
                      placeholder="Chọn phương thức thanh toán">
                      <el-option v-for="item in listphuongthucthanhtoan" :key="item.nMaPhuongThuc"
                        :label="item.cTenPhuongThuc" :value="item.nMaPhuongThuc">
                      </el-option>
                    </el-select>
                  </el-form-item>
                </div>
              </div>

              <el-form-item class="test1" label="Mục đích SD:" prop="cMucDichSuDung">
                <el-input v-model="sizeForm.cMucDichSuDung" :disabled="viewcontract"></el-input>
              </el-form-item>

              <el-form-item label="Ngày Ký:" prop="dNgayKy">
                <el-date-picker class="date-input" type="date" placeholder="Chọn ngày ký" :disabled="viewcontract"
                  v-model="sizeForm.dNgayKy" format="dd/MM/yyyy"></el-date-picker>
              </el-form-item>

              <el-form-item label="Hồ sơ:" class="test1" v-if="operation">
                <el-upload class="upload-contract" drag action="" :auto-upload="false" :on-preview="handlePreview"
                  :on-remove="handleRemove" :file-list="fileList" :on-change="handleChange" multiple>
                  <i class="el-icon-upload"></i>
                  <div class="el-upload__text">
                    Kéo thả hoặc <em>chọn tệp</em> tải lên
                  </div>
                </el-upload>
              </el-form-item>
            </fieldset>

            <fieldset style="padding: 10px">
              <legend>Chi tiết đồng hồ</legend>

              <div class="test" style="display: block">
                <div class="selectForm">
                  <el-form-item label="Đồng hồ:" prop="nMaDongHo">
                    <el-select :disabled="viewcontract || editcontract" v-model="sizeForm.nMaDongHo" @change="showseri"
                      filterable :filter-method="handleFilter" placeholder="Chọn seri đồng hồ">
                      <el-option v-for="item in listseridongho" :key="item.nMaDongHo"
                        :label="item.cSerial + ' ' + item.cTenLoai" :value="item.nMaDongHo">
                      </el-option>
                      <div v-if="overflowed" style="width: 100%; justify-content: center;display: flex;">
                        <el-button size="small" type="primary" @click="clockPageSize += 20, findWaitList()"><i
                            class="fa fa-plus"></i> Tải thêm</el-button>
                      </div>

                    </el-select>
                  </el-form-item>
                </div>
              </div>
              <div class="test" style="display: block">
                <div class="selectForm">
                  <el-form-item label="Tuyến đọc:" prop="nMaTuyen">
                    <el-select :disabled="viewcontract" v-model="sizeForm.nMaTuyen" filterable placeholder="Chọn tuyến">
                      <el-option v-for="item in listroute" :key="item.nMaTuyen" :label="item.cTenTuyen"
                        :value="item.nMaTuyen">
                      </el-option>
                    </el-select>
                  </el-form-item>
                </div>
              </div>

              <div class="test">
                <div class="row">
                  <div class="col">
                    <el-form-item label="Chỉ số đầu">
                      <el-input :disabled="viewcontract || editcontract" v-model="sizeForm.nChiSoDau"></el-input>
                    </el-form-item>
                  </div>
                  <div class="col">
                    <el-form-item label="Chỉ số hiện tại">
                      <el-input :disabled="viewcontract || editcontract" v-model="sizeForm.nChiSoHienTai"></el-input>
                    </el-form-item>
                  </div>
                </div>
              </div>
              <div class="test" style="display: block">
                <div class="row">
                  <div class="col">
                    <el-form-item label="Ngày lắp đặt" prop="dNgayLapDat">
                      <el-date-picker :disabled="viewcontract" type="date" placeholder="Chọn ngày lắp đặt"
                        v-model="sizeForm.dNgayLapDat" format="dd/MM/yyyy" style="width: 100%"></el-date-picker>
                    </el-form-item>
                  </div>
                </div>
              </div>
              <div class="test" style="display: block">
                <div class="row">
                  <div class="col">
                    <el-form-item label="Ngày sử dụng" prop="dNgayHoatDong">
                      <el-date-picker :disabled="viewcontract" type="date" placeholder="Chọn ngày hoạt động"
                        v-model="sizeForm.dNgayHoatDong" format="dd/MM/yyyy" style="width: 100%"></el-date-picker>
                    </el-form-item>
                  </div>
                </div>
              </div>

              <div class="test">
                <div class="row">
                  <div class="col">
                    <el-form-item label="Kinh độ">
                      <el-input :disabled="viewcontract" v-model="sizeForm.nKinhDo"></el-input>
                    </el-form-item>
                  </div>
                  <div class="col">
                    <el-form-item label="Vĩ độ">
                      <el-input :disabled="viewcontract" v-model="sizeForm.nViDo"></el-input>
                    </el-form-item>
                  </div>
                </div>
              </div>

            </fieldset>
          </div>
        </div>
      </el-form>

      <template slot="footer">
        <base-button v-if="operationbuttonadd" type="primary" :loading="isSubmitLoading"
          @click="onSubmit('sizeForm')">Thêm</base-button>
        <base-button v-if="operationbuttonedit" type="primary" :loading="isSubmitLoading"
          @click="onSubmit('sizeForm')">Sửa</base-button>
        <base-button v-if="operationbutton" type="danger" @click="closeForm('sizeForm')">Hủy</base-button>
        <base-button v-if="!operationbutton" type="primary" @click="closeForm('sizeForm')">Đóng</base-button>
      </template>
    </modal>
    <modal class="changeClockContent" :show.sync="showModalChangeClock" :model="clockChange">
      <h6>Thay thế đồng hồ</h6>
      <fieldset>
        <legend>Chọn đồng hồ thay thế</legend>
        <el-form @submit.prevent ref="formChangeClock">
          <div class="row">
            <div class="col">
              <el-form-item class="formChangeClock_item" label="Đồng hồ cũ: ">
                <el-select disabled v-model="clockChange.oldClock">
                  <el-option :value="selectedClock.cSerial" :label="selectedClock.cSerial + ' ' + selectedClock.cTenLoai"
                    :key="selectedClock.cSerial">
                  </el-option>
                </el-select>
              </el-form-item>
            </div>
            <div class="col">
              <el-form-item class="formChangeClock_item" label="Đồng hồ thay thế: ">
                <el-select v-model="clockChange.newClock" placeholder="Chọn serial của đồng hồ mới" filterable
                  :filter-method="handleFilter">
                  <el-option v-for="i in listseridongho" :key="i.cSerial" :value="i.cSerial"
                    :label="i.cSerial + ' ' + i.cTenLoai"></el-option>
                  <div v-if="overflowed" style="width: 100%; justify-content: center;display: flex;">
                    <el-button size="small" type="primary" @click="clockPageSize += 20, findWaitList()"><i
                        class="fa fa-plus"></i> Tải thêm</el-button>
                  </div>
                </el-select>
              </el-form-item>
            </div>
          </div>
          <div class="row">
            <div class="col">
              <el-form-item class="formChangeClock_item" label="Chỉ số ĐH cũ: ">
                <el-input v-model="clockChange.oldClockStatus" placeholder="Chỉ số khi thay thế"></el-input>
              </el-form-item>
            </div>
            <div class="col">
              <el-form-item class="formChangeClock_item" label="Chỉ số ĐH mới: ">
                <el-input v-model="clockChange.newClockStatus" placeholder="Chỉ số khi thay thế"></el-input>
              </el-form-item>
            </div>
          </div>
        </el-form>
      </fieldset>
      <el-button type="danger" size="mini" class="mt-3 ml-2 float-right" @click="showModalChangeClock = false">
        Hủy
      </el-button>
      <el-button type="warning" size="mini" class="mt-3 float-right" @click="handleChangeClock">
        Thay thế
      </el-button>

    </modal>
    <modal :show.sync="documentDialogVisible" :data-backdrop="'static'">
      <h6 slot="header" style="color: black">
        <i class="el-icon-s-grid"></i> Hồ sơ hợp đồng
      </h6>

      <el-form :show-message="false" label-width="150px" size="mini">
        <el-card class="box-card">
          <template #header class="el-card-header">
            <div style="padding: 5px 10px" class="form-row justify-content-center">
              <div class="col-md-12">
                <span>Danh sách hồ sơ</span>
              </div>
            </div>
          </template>

          <div class="col-md-12 py-3 tbl">
            <el-table :data="documentList" highlight-current-row stripe height="100%" header-align="center"
              header-row-class-name="thead-light" :border="true" size="mini" v-loading="downloadDocLoading">
              <el-table-column label="Văn bản" header-align="center" min-width="300" prop="cTenHoSo">
                <template slot-scope="scope">
                  <el-button type="text" @click="downloadDocument(scope.row)">{{ scope.row.cTenHoSo }}</el-button>
                </template>
              </el-table-column>

              <el-table-column label="Ngày tải lên" header-align="center" width="120" prop="dNgayTao">
                <template slot-scope="scope">
                  <span>{{ moment(scope.row.dNgayTao).format("DD/MM/YYYY") }}</span>
                </template>
              </el-table-column>

              <el-table-column label="Hành động" width="150px" align="center">
                <template slot-scope="scope">
                  <el-button type="danger" size="mini" @click="handleDeleteDocument(scope.row)">
                    <i class="el-icon-delete"></i>
                    Xóa
                  </el-button>
                </template>
              </el-table-column>
            </el-table>
          </div>
        </el-card>

        <el-card class="box-card">
          <template #header class="el-card-header">
            <div style="padding: 5px 10px" class="form-row justify-content-center">
              <div class="col-md-12">
                <span>Thêm hồ sơ</span>
              </div>
            </div>
          </template>
          <div class="col-md-12 py-3">
            <el-upload ref="documentFile" class="upload-contract" drag action="" :file-list="documentFileList"
              :auto-upload="false" :on-change="handleAddDocument" :multiple="false" :limit="1">
              <i class="el-icon-upload"></i>
              <div class="el-upload__text">
                Kéo thả hoặc <em>chọn tệp</em> tải lên
              </div>
            </el-upload>
          </div>
        </el-card>
      </el-form>

      <template slot="footer">
        <base-button type="primary" @click="closeDocumentForm()">Đóng</base-button>
      </template>
    </modal>
    <modal :show.sync="showResult" dataBackDrop="static">
      <h6>Kết quả nhập dữ liệu</h6>
      <h6>Nhập thành công <span style="color: green;">{{ success }}</span> hợp đồng, <span style="color: red;">{{ fail
      }}</span> Thất bại !</h6>
      <el-table max-height="400px" :data="resultTable" class="table-result" header-row-class-name="thead-light"
        :border="true" size="mini">
        <el-table-column prop="result" label="Kết quả" />
        <el-table-column prop="cTenKhachHang" label="Tên Khách Hàng" />
        <el-table-column label="Chi Tiết">
          <template #default="scope">
            <div>
              <span style="word-break: break-word;">{{ scope.row.msg }}</span>
            </div>
          </template>
        </el-table-column>
      </el-table>
      <template slot="footer">
        <base-button outline type="success" @click="handleDownloadResult"><i class="fa fa-download"></i>Tải
          xuống</base-button>
        <base-button outline type="danger" @click="showResult = false, type = ''">Thoát</base-button>
      </template>
    </modal>
  </div>
</template>
<script>
import Input from "../components/Input.vue"
import Label from "../components/Label.vue"
import { saveAs } from "file-saver"
import {
  Table,
  Button,
  TableColumn,
  Pagination,
  Card,
  Option,
} from "element-ui";

export default {
  components: {
    [Button.name]: Button,
    Input,
    Label,
    [Table.name]: Table,
    [TableColumn.name]: TableColumn,
    [Pagination.name]: Pagination,
    [Card.name]: Card,
    [Option.name]: Option,
  },
  data() {
    return {
      rules: {
        cTenKhachHang: [{ required: true }],
        nMaDoiTuongGia: [{ required: true }],
        nMaPhuongThucThanhToan: [{ required: true }],
        cTen: [{ required: true }],
        // cTenTuyen:[
        //   { required: true,},
        // ],
        cDienThoai: [{ required: true }],
        cDiaChi: [{ required: true }],
        cCccd: [{ required: true }],
        nMaTuyen: [{ required: true }],
        dNgayKy: [{ required: true, message: "Bạn chọn ngày ký" }],
        nMaDongHo: [{ required: true, message: "Chọn đồng hồ" }],
      },
      isSearchLoading: false,
      isSubmitLoading: false,
      documentDialogVisible: false,
      downloadDocLoading: false,
      links: [],
      listtenkhachhang: [],
      customerList: [],
      listseridongho: [],
      clockChange: {},
      tenkhachhang: [],
      listhopdong: {},
      listemployee: [],
      listchitietdongho: [],
      listroute: [],
      listdoituonggia: [],
      listnganhang: [],
      listphuongthucthanhtoan: [],

      showByIdmanhanvien: "",
      centerDialogVisible: false,
      showModalChangeClock: false,
      tuyendoc: true,
      sizeForm: {
        nMaKhachHang: "",
        cTenKhachHang: "",
        cMaSoThue: "",
        cDiaChi: "",
        cEmail: "",
        dNgayKy: "",
        cDienThoai: "",
        cCccd: "",
        dNgayCapCccd: "",
        cNoiCapCccd: "",
        nMaNganHang: "",
        cTenChuTaiKhoan: "",
        cSoTaiKhoanNganHang: "",
        nMaDoiTuongGia: "",
        cMucDichSuDung: "",
        nMaPhuongThucThanhToan: "",
        cSerial: "",
        dNgayHoatDong: "",
        nMaLoaiDongHo: "",
        nTinhTrang: "",
        nMaNhanVien: "",
        cTen: "",
        nMaTuyen: "",
        cTenNhanVien: "",
        cTenTuyen: "",
        nChiSoDau: "",
        nChiSoHienTai: "",
        serichi: "",
        dNgayLapDat: "",
        nKinhDo: "",
        nViDo: "",
        nMaDongHo: null,
      },
      clockStatus: 1,
      clockPageSize: 20,
      clockListTotal: 0,
      WLSerial: '',
      operationbutton: false,
      viewcontract: false,
      operation: false,
      editcontract: false,
      operationbuttonadd: false,
      operationbuttonedit: false,
      searchForm: {
        cTenKhachHang: "",
        cDiaChi: "",
        cDienThoai: "",
        cEmail: "",
      },
      pageRequest: { pageNum: 1, pageSize: 30 },
      id: "",
      fileList: [],
      documentList: [],
      uploadedCount: 0,
      documentFileList: [],
      selectedRow: null,
      showResult: false,
      resultTable: [],
      success: 0,
      fail: 1,
      test: [],
      selectedClock: {}
    };
  },
  watch: {
    centerDialogVisible() {
      if (this.centerDialogVisible == false) {
        this.clockPageSize = 20
      }
    }
  },
  computed: {
    overflowed() {
      if (this.listseridongho.length < this.clockListTotal) {
        return true
      }
      else {
        return false
      }
    },
    selected() {
      if (this.selectedRow != null) {
        return true
      }
      else {
        return false
      }
    }
  },
  methods: {

    handlePick() {
      let input = document.createElement('input');
      input.type = 'file';
      input.accept = 'application/vnd.openxmlformats-officedocument.spreadsheetml.sheet'
      input.onchange = _ => {
        let files = Array.from(input.files);
        this.$confirm("Bạn có chắc muốn nhập danh sách " + files[0].name + " này ", "Thông báo", {
          confirmButtonText: "Đồng ý",
          cancelButtonText: "Hủy bỏ",
          type: "warning",
        }).then(() => {
          this.handleUpdateCustomer(files[0])
        })

      };
      input.click();
    },
    handleUpdateCustomer(val) {
      const formData = new FormData();
      formData.append("file", val);
      formData.append("id", 0);
      this.$api.company.updateCustomerExcel(formData).then(res => {
        if (res.code == 200) {
          this.success = 0;
          this.fail = 0;
          this.resultTable = res.data;
          for (let i = 0; i < this.resultTable.length; i++) {
            this.resultTable[i].serial = ""
          }
          this.showResult = true;
          res.data.forEach(item => {
            if (item.result == 'Thành công')
              this.success++;
            else
              this.fail++;
          });
          this.findContractDetail();
        }
        else
          this.$message({ message: res.msg, type: "error" });
      })
    },
    handleDownloadResult() {
      this.$api.company.downloadResult(this.resultTable).then(res => {
        saveAs(new Blob([res]), 'Ket_qua_nhap.xlsx')
      })
        .catch(err => {
          console.log("failed")
          console.log(err)
        })

    },
    downloadCustomerTemplate() {
      this.$api.company.downloadCustomerTemplate({ id: this.currCompany }).then(res => {
        if (res.status == 500) {
          this.$message({ message: "Xảy ra lỗi khi tải file", type: "error" });
        }
        else {
          try {
            const blob = new Blob([res], { type: 'application/vnd.openxmlformats-officedocument.spreadsheetml.sheet' });
            saveAs(blob, 'customer_template.xlsx');
          } catch (error) {
            this.$message({ message: "Xảy ra lỗi khi tải file", type: "error" });
          }
        }
      })
    },
    delay(time) {
      return new Promise(resolve => setTimeout(resolve, time));
    },
    handleRowClick(val) {
      this.WLSerial = val.cSerial
      this.clockStatus = 2;
      this.findWaitList()
      this.selectedRow = val
      this.delay(300).then(() => {
        this.selectedClock = this.listseridongho[0]

      })

    },
    showChangeClock(val) {
      this.WLSerial = ''
      this.clockStatus = 1;
      this.findWaitList();
      this.showModalChangeClock = true;
      this.clockChange = {
        oldClock: this.selectedClock.cSerial,
        newClock: null,
        nMaHopDongDongHo: val.nMaHopDongDongHo
      }
    },
    handleChangeClock() {
      if (!this.clockChange.newClock)
        this.$message({ message: "Vui lòng chọn serial của đồng hồ thay thế !", type: "error" });
      else if (!this.clockChange.oldClockStatus)
        this.$message({ message: "Vui lòng nhập chỉ số trên đồng hồ cũ", type: "error" });
      else {
        const rBody = {
          columnFilters: {
            oldClock: { value: this.clockChange.oldClock },
            newClock: { value: this.clockChange.newClock },
            nMaHopDongDongHo: { value: this.clockChange.nMaHopDongDongHo },
            oldClockStatus: { value: parseInt(this.clockChange.oldClockStatus) },
            newClockStatus: { value: parseInt(this.clockChange.newClockStatus) }
          }
        };
        this.$api.contract.changeClock(rBody).then(res => {
          if (res.code != 200)
            this.$message({ message: res.msg, type: "error" });
          else
            this.$message({ message: "Thay đổi đồng hồ thành công!", type: "success" });
          this.showModalChangeClock = false;
          this.findContractDetail();
        })
        // console.log(rBody);
      }
    },
    handleSizeChange(val) {
      // this.viewchucnang(this.pageRequest.pageNum, val)
      this.findContractDetail(this.pageRequest.pageNum, val);
    },
    handleCurrentChange(val) {
      // this.viewchucnang(val, this.pageRequest.pageSize)
      this.findContractDetail(val, this.pageRequest.pageSize);
    },
    findContractDetail(pageNum, pageSize) {
      try {
        this.isSearchLoading = true
        if (typeof pageNum == "number") this.pageRequest.pageNum = pageNum;
        else this.pageRequest.pageNum = 1;

        if (typeof pageSize == "number") this.pageRequest.pageSize = pageSize;
        else this.pageRequest.pageSize = 30;

        this.pageRequest.columnFilters = {
          cTenKhachHang: { value: this.searchForm.cTenKhachHang },
          cDiaChi: { value: this.searchForm.cDiaChi },
          cDienThoai: { value: this.searchForm.cDienThoai },
          cEmail: { value: this.searchForm.cEmail },
        };

        this.$api.contract.findContractDetail(this.pageRequest).then((res) => {
          if (res.code == 200 && res.data) this.listhopdong = res.data;
          else this.listhopdong = {};
          this.isSearchLoading = false
        });
      }
      catch (ex) {
        this.isSearchLoading = false
      }
    },

    handleAdd() {
      this.clockStatus = 1,
        this.WLSerial = '',
        this.findWaitList()
      this.$refs["sizeForm"].resetFields();
      this.centerDialogVisible = true;
      this.operation = true;
      this.editcontract = false;
      this.operationbutton = true;
      this.viewcontract = false;
      this.operationbuttonadd = true;
      this.operationbuttonedit = false;
      this.tuyendoc = true;
      this.showByIdmanhanvien = "";
      this.fileList = [];
      this.sizeForm = {
        nMaKhachHang: "",
        cTenKhachHang: "",
        cMaSoThue: "",
        cDiaChi: "",
        cEmail: "",
        dNgayKy: "",
        cDienThoai: "",
        cCccd: "",
        dNgayCapCccd: "",
        cNoiCapCccd: "",
        nMaNganHang: "",
        cTenChuTaiKhoan: "",
        cSoTaiKhoanNganHang: "",
        nMaDoiTuongGia: "",
        cMucDichSuDung: "",
        nMaPhuongThucThanhToan: "",
        cSerial: "",
        dNgayHoatDong: "",
        nMaLoaiDongHo: "",
        nTinhTrang: "",
        nMaNhanVien: "",
        cTen: "",
        nMaTuyen: "",
        cTenNhanVien: "",
        cTenTuyen: "",
        nChiSoDau: "",
        nChiSoHienTai: "",
        serichi: "",
        dNgayLapDat: "",
        nKinhDo: "",
        nViDo: "",
        oDongHo: "",
        nMaDongHo: null
      };
    },

    handleFindRoutes() {
      this.$api.contract.findRoutes().then(res => {
        //console.log(res)
        if (res.code == 200) {
          this.listroute = res.data
        }
        else {
          this.$message({
            message: "Lấy danh sách tuyến thất bại",
            type: "error",
          });
        }
      })
    },
    handleEdit(item) {
      this.operationbuttonadd = false
      this.operationbuttonedit = true
      this.operationbutton = true
      this.centerDialogVisible = true
      this.editcontract = true
      this.operation = false
      this.viewcontract = false
      this.tuyendoc = true
      this.sizeForm = Object.assign({}, item)
      /* this.showlistemployee(0) */
    },

    handleView(item) {
      (this.operationbuttonadd = false),
        (this.operationbuttonedit = false),
        (this.centerDialogVisible = true),
        (this.operationbutton = false),
        (this.tuyendoc = true),
        (this.viewcontract = true),
        (this.operation = false);
      (this.editcontract = false), (this.sizeForm = Object.assign({}, item));
    },

    onSubmit() {
      this.$refs.sizeForm.validate((valid) => {
        try {
          if (valid) {
            this.isSubmitLoading = true;
            const formData = new FormData();
            if (this.fileList != null && this.fileList.length > 0) {
              for (let i = 0; i < this.fileList.length; i++) {
                formData.append("file[]", this.fileList[i].raw);
              }
            }

            formData.append(
              "data",
              new Blob([JSON.stringify(this.sizeForm)], {
                type: "application/json",
              })
            );

            this.$api.contract.addqlhopdong(formData).then((res) => {
              if (res.code == 200) {
                this.findContractDetail();
                this.centerDialogVisible = false;
                if (this.operationbuttonadd === true) {
                  this.$message({
                    message: "Thêm hợp đồng thành công",
                    type: "success",
                  });
                } else if (this.operationbuttonedit === true) {
                  this.$message({
                    message: "Sửa hợp đồng thành công",
                    type: "success",
                  });
                }
              } else {
                if (this.operationbuttonadd === true) {
                  this.$message({
                    message: res.msg,
                    type: "error",
                  });
                } else if (this.operationbuttonedit === true) {
                  this.$message({
                    message: "Sửa hợp đồng không thành công",
                    type: "error",
                  });
                }
              }
              this.isSubmitLoading = false;
            });
          }
        } catch (ex) {
          console.log(ex);
          this.isSubmitLoading = false;
        }
      });
    },

    handleDelete(itemDelete) {
      let panma = { nMaHopDong: itemDelete.nMaHopDong };
      this.$confirm("Bạn có muốn xóa hợp đồng này không", "Thông báo", {
        confirmButtonText: "Đồng ý",
        cancelButtonText: "Hủy bỏ",
        type: "warning",
      })
        .then(() => {
          this.$api.contract.deletehopdong([panma]).then((res) => {
            if (res.code == 200) {
              this.$message({
                message: `Xóa thành công hợp đồng `,
                type: "success",
              });
              this.findContractDetail();
            } else[
              this.$message({
                message: res.msg,
                type: "error",
              })
            ]

          });
        })
        .catch(() => { });
    },

    closeForm(formName) {
      this.$refs[formName].resetFields();
      this.centerDialogVisible = false;

    },
    querySearch(queryString, cb) {
      var links = this.links;
      var results = queryString
        ? links.filter(this.createFilter(queryString))
        : links;
      // call callback function to return suggestions
      cb(results);
    },
    createFilter(queryString) {
      return (link) => {
        return link.value.toLowerCase().indexOf(queryString.toLowerCase()) > -1;
      };
    },

    loadAll() {
      let data = {};
      this.$api.khachhang.findAll(data).then((res) => {
        if (res.code == 200) {
          for (let i = 0; i < res.data.length; i++) {
            this.listtenkhachhang = res.data[i];
            this.tenkhachhang.push({
              value: this.listtenkhachhang.cTenKhachHang,
              test: this.listtenkhachhang,
            });
          }
        }
      });
      return this.tenkhachhang;
    },
    handleFilter(query) {
      if (query.length >= 3 || query.length == 0) {
        this.clockPageSize = 20
        this.WLSerial = query
        this.findWaitList()
      }
    },
    findWaitList() {
      let pageRequest = { pageSize: this.clockPageSize }
      pageRequest.columnFilters = {
        status: { value: this.clockStatus },
        cSerial: { value: this.WLSerial }
      }
      this.$api.clock.findClockRemain(pageRequest).then((res) => {
        if (res.code == 200) {
          this.clockListTotal = res.data.totalSize
          this.listseridongho = res.data.content;
        }
      });
    },
    showemployee() {
      this.$api.employee.findAll().then((res) => {
        if (res.code == 200) {
          this.listemployee = res.data;
        }
      });
    },
    bankShow() {
      this.$api.bank.bankShow({}).then((res) => {
        if (res.code == 200) {
          this.listnganhang = res.data;
        }
      });
    },
    showPrice() {

      this.$api.priceobject.findAll({}).then((res) => {
        if (res.code == 200) {
          this.listdoituonggia = res.data;
        }
      });
    },

    showPayment() {
      this.$api.paymentmethod.findAll({}).then((res) => {
        if (res.code == 200) {
          this.listphuongthucthanhtoan = res.data;
        }
      });
    },

    handleSearch: function () {
      this.findContractDetail();
    },

    handleSelect: function (item) {
      this.sizeForm = Object.assign(this.sizeForm, item.test);
    },

    showlistroute: function (val) {
      this.sizeForm = Object.assign(this.sizeForm, val);
    },

    showseri: function (val) {
      this.sizeForm = Object.assign(this.sizeForm, val);
    },

    /* showlistemployee: function (val) {
      this.$api.route.showById({ nMaNhanVien: val }).then((res) => {
        console.log(res)
        if (res.code == 200) {
          console.log(res)
          this.listroute = res.data;
          if (this.listroute.length >= 1) {
            this.tuyendoc = false;
          } else {
            this.tuyendoc = true;
          }
        }
      });
    }, */

    getCustomer() {
      this.$api.khachhang.findAll({}).then((res) => {
        this.customerList = res.data;
      });
    },

    handlePreview() { },

    handleRemove(file, fileList) {
      this.fileList = fileList;
    },

    handleChange(file, fileList) {
      this.fileList = fileList;
    },

    closeDocumentForm() {
      this.documentDialogVisible = false;

    },

    handleDocument(index, item) {
      this.documentDialogVisible = true;
      this.sizeForm = Object.assign(this.sizeForm, item);
      this.documentList = item.documentList;
    },

    handleDeleteDocument(item) {
      this.$api.contract.deleteDocument(item).then((res) => {
        if (res.code == 200) {
          this.$message({ message: "Xóa hồ sơ thành công", type: "success" });
          this.$api.contract
            .findDocumentList({ nMaHopDong: this.sizeForm.nMaHopDong })
            .then((result) => {
              if (result.code == 200) this.documentList = result.data;
            });
          this.findContractDetail();
        } else {
          this.$message({
            message: "Xóa hồ sơ thất bại. " + res.msg,
            type: "error",
          });
        }
      });
    },

    handleAddDocument(file, fileList) {
      try {
        if (fileList.length == this.$refs.documentFile.uploadFiles.length) {
          this.documentFileList = []
          const formData = new FormData();
          for (let i = 0; i < fileList.length; i++) {
            formData.append("file[]", fileList[i].raw);
          }
          formData.append(
            "data",
            new Blob([JSON.stringify(this.sizeForm)], {
              type: "application/json",
            })
          );

          this.$api.contract.addDocument(formData).then((res) => {
            if (res.code == 200) {
              this.$message({
                message: "Thêm hồ sơ thành công",
                type: "success",
              });
              this.$api.contract
                .findDocumentList({ nMaHopDong: this.sizeForm.nMaHopDong })
                .then((result) => {
                  if (result.code == 200) this.documentList = result.data;
                });
              this.findContractDetail();
            } else {
              this.$message({
                message: "Thêm hồ sơ thất bại. " + res.msg,
                type: "error",
              });
            }
          });
        }
      } catch (ex) {
        console.log(ex);
      }
    },

    downloadDocument(item) {
      this.downloadDocLoading = true
      this.$api.contract.downloadDocument(item.nMaHoSo).then((res) => {
        saveAs(new Blob([res]), item.cTenHoSo)
        this.downloadDocLoading = false
      })
    },

  },
  mounted() {
    this.findContractDetail();
    this.showPrice();
    this.showPayment();
    this.bankShow();
    this.showemployee();
    this.handleFindRoutes();
    // this.getCustomer();
    // this.links = this.loadAll();
  },
};
</script>

<style>
.changeClockContent div:nth-child(1) {
  max-width: 800px;
}

.formChangeClock_item {
  display: flex;
  justify-content: center;
  align-items: center;
}

.row-btn {
  padding-left: 20px;
  width: 50%;
  display: flex;
  flex-direction: row;
  justify-content: space-around;
  margin-bottom: 10px;
}

.setting-btn {
  width: 40%;
}

.upload-contract .el-upload {
  width: 100%;
}

.upload-contract .el-upload-dragger {
  height: auto !important;
  width: 100%;
  background-color: #d9d9d9;
}

.upload-contract .el-icon-upload {
  font-size: 50px;
  margin: 0px;
}

.dialog .el-dialog .el-dialog__header {
  padding: 0;
}

h4 {
  padding-top: 15px;
}

label.form-control-label {
  display: flex;
  float: left;
  margin-right: 6px;
  margin-top: 3px;
}

.form-control[data-v-95bf2d3a] {
  height: 25px;
  font-size: 12px;
  color: #000;
  padding-left: 6px;
}

button.btn.base-button.btn-primary {
  margin-top: 0 !important;
  height: 25px;
  margin: 0px 3px;
  width: auto;
  align-items: center;
  display: flex;
  float: left;
}

button.el-button.btn.btn-neutral.el-button--primary {
  padding: 0 12px;
  font-size: 13px;
}

.date-input-ngaycap,
.date-input {
  width: 100% !important;
}

.date-input {
  padding-right: 12px;
}

.selectForm .el-select {
  width: calc(100% - 130px);
}

.selectForm .el-form-item__content {
  width: 100%;
}

.dataTableC .el-table__body tr.current-row {
  background-color: #ecf5ff !important;
}
</style>

<style scoped >
.flex {
  display: flex;
}

.box-card {
  margin: 10px;
}

.card-header {
  padding: 0px;
}

.tbl1 {
  height: calc(100vh - 255px);
}

.modalTemp .modal-footer {
  justify-self: start;
}

fieldset {
  border: 1px solid rgb(223, 215, 215) !important;
  font-size: 13px !important;
}

fieldset.ttkhachhang {
  height: calc(100% - 36px);
}

legend {
  width: auto !important;
  font-size: 13px !important;
  margin-left: 32px !important;
}

.test {
  display: flex;
  margin-right: 12px;
}

.el-form-item.el-form-item--mini {
  margin: 0;
}

.test1 {
  margin-right: 12px !important;
}
</style>