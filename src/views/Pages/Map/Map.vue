<template>
  <div style="overflow:hidden;">
    <div class="content" id="content">
      <div class="" id="loading-screen">
        <div class="" id="loader"></div>
      </div>
      <div class="navbar-map" id="nav">
        <div class="menu-map">
          <Button :class="{ 'active-btn': menuState === 'filter' }" @click="menuState = 'filter'">Bộ lọc</Button>
          <Button :class="{ 'active-btn': menuState === 'props' }" @click="menuState = 'props'"
            :disabled="clockDisplay == null && geoData == null && PipeDisplay == null">Thông tin</Button>
        </div>
        <!-- Tab hiện thông tin đồng hồ -->
        <div class="props" v-if="menuState === 'props'">

          <!-- Thông tin đồng hồ -->
          <div v-if="selectType == 1" class="tb-title">
            <div>Thông tin đồng hồ</div>
            <div @click="handleClosePoint(1)"><i class="fa fa-times"></i></div>
          </div>
          <table v-if="selectType == 1">
            <tr>
              <td class="title">Nhân viên đọc</td>
              <td>{{ clockDisplay.cNhanVienDoc }}</td>
            </tr>
            <tr>
              <td class="title">Tên khách hàng</td>
              <td v-if="!edit">{{ clockDisplay.cTenKhachHang }}</td>
              <td style="padding:0" v-else><input class="edit-input" v-model="dataForm.cTenKhachHang"></td>
            </tr>
            <tr>
              <td class="title">Mã khách hàng</td>
              <td>{{ clockDisplay.nMaKhachHang }}</td>
            </tr>
            <tr>
              <td class="title">Địa chỉ</td>
              <td v-if="!edit">{{ clockDisplay.cDiaChi }}</td>
              <td style="padding:0" v-else><input class="edit-input" v-model="dataForm.cDiaChi"></td>
            </tr>
            <tr v-if="edit">
              <td>Tuyến đọc</td>
              <td style="padding:0">
                <el-select v-model="dataForm.nMaTuyen">
                  <el-option v-for="item in listroute" :key="item.nMaTuyen" :label="item.cTenTuyen"
                    :value="item.nMaTuyen">
                  </el-option>
                </el-select>
              </td>
            </tr>
            <tr>
              <td class="title">Loại đồng hồ</td>
              <td>{{ clockDisplay.cTenLoai }}</td>
            </tr>
            <tr>
              <td class="title">Serial</td>
              <td>{{ clockDisplay.cSerial }}</td>
            </tr>
            <tr>
              <td class="title">Kinh độ</td>
              <td v-if="!edit">{{ parseFloat(clockDisplay.nKinhDo).toFixed(7) }}</td>
              <td style="padding:0" v-else><input class="edit-input" v-model="dataForm.nKinhDo"></td>
            </tr>
            <tr>
              <td class="title">Vĩ độ</td>
              <td v-if="!edit">{{ parseFloat(clockDisplay.nViDo).toFixed(7) }}</td>
              <td style="padding:0" v-else><input class="edit-input" v-model="dataForm.nViDo"></td>
            </tr>
            <tr>
              <td class="title">Tình trạng đồng hồ</td>
              <td>
                <strong v-if="clockDisplay.cTinhTrangDongHo == 'Đang hoạt động'" style="color: #67c23a">{{
                  clockDisplay.cTinhTrangDongHo }}</strong>
                <strong v-else style="color: #f56c6c">{{
                  clockDisplay.cTinhTrangDongHo
                }}</strong>
              </td>
            </tr>
          </table>
          <div v-if="selectType == 1"
            style="display: flex; margin-top: 10px; width: 100%; justify-content: center;align-items: center;">
            <el-button v-if="!edit" type="danger" @click="handleDelete"><i style="padding-right:10px"
                class="fa fa-trash" />Xóa</el-button>
            <el-button v-if="!edit" type="primary" @click="handleOpenEdit"><i class="fa fa-edit"
                style="padding-right:10px" />Sửa</el-button>
            <el-button v-if="edit" type="danger" @click="edit = false"><i class="fa fa-times"
                style="padding-right:10px" />Hủy</el-button>
            <el-button v-if="edit" type="primary" @click="handleEdit"><i class="fa fa-edit"
                style="padding-right:10px" />Xác nhận</el-button>
          </div>

          <!-- Thông tin vị trí -->
          <div v-if="geoData != null && selectType == 0">
            <div class="tb-title">
              <div>Thông tin vị trí</div>
              <div @click="handleClosePoint(2)"><i class="fa fa-times"></i></div>
            </div>
            <table>
              <tr>
                <td>Tỉnh thành</td>
                <td>{{ geoResult.city }}</td>
              </tr>
              <tr>
                <td>Quận huyện</td>
                <td>{{ geoResult.district }}</td>
              </tr>
              <tr>
                <td>Xã phường</td>
                <td>{{ geoResult.ward }}</td>
              </tr>
              <tr>
                <td>Kinh độ</td>
                <td>{{ geoResult.lon }}</td>
              </tr>
              <tr>
                <td>Vĩ độ</td>
                <td>{{ geoResult.lat }}</td>
              </tr>
            </table>
          </div>

          <!-- Thông tin ống nước -->
          <div v-if="selectType == 2">
            <div class="tb-title">
              <div>Thông tin ống nước</div>
              <div @click="handleClosePoint"><i class="fa fa-times"></i></div>
            </div>
            <!-- <el-form ref="pipeForm" :show-message="false" :model="pipeDataform" label-width="130px" size="mini"> -->
              <table>
                <tr>
                  <td>Tên tuyến ống</td>
                  <td v-if="!PipeEdit || PipeEdit && EditType == 2">{{ PipeDisplay.c_ten_tuyen_ong }}</td>
                  <td style="padding:0" v-if="PipeEdit && EditType == 1">
                    <el-input v-model="PipeName" :disabled="true"></el-input>
                  </td>
                </tr>
                <tr>
                  <td>Loại ống</td>
                  <td v-if="!PipeEdit || PipeEdit && EditType == 2">{{ PipeDisplay.c_ten_loai_ong }}</td>
                  <td v-if="PipeEdit && EditType == 1" style="padding:0">
                    <el-select v-model="PipeType">
                      <el-option v-for="item in PipeTypes" :key="item.n_ma_loai_ong" :label="item.c_ten_loai_ong"
                        :value="item.n_ma_loai_ong">
                      </el-option>
                    </el-select>
                  </td>
                </tr>
                <tr v-if="!PipeEdit || PipeEdit && EditType == 2">
                  <td>Kích thước (mm)</td>
                  <td>{{ PipeDisplay.n_kich_thuoc_ong }}</td>
                </tr>
                <tr v-if="!PipeEdit || PipeEdit && EditType == 2">
                  <td><span>Độ dài <span v-if="PipeDisplay.n_don_vi_do_dai == 0">(m)</span><span
                        v-if="PipeDisplay.n_don_vi_do_dai == 1">(Km)</span></span></td>
                  <td>{{ PipeDisplay.n_do_dai.toFixed(3) }}</td>
                </tr>
                <tr v-if="PipeEdit && EditType == 1">
                  <td><span>Độ dài <span v-if="unit == 0">(m)</span><span v-if="unit == 1">(Km)</span></span></td>
                  <td style="padding:0">
                    <el-input size="small" v-model="displayResult" :readonly="true">
                    </el-input>
                  </td>
                </tr>
                <tr v-if="!PipeEdit">
                  <td>
                    <span>Tình trạng </span>
                  </td>
                  <td>
                    <span v-if="PipeDisplay.n_tinh_trang == 1">Hoạt động</span>
                    <span v-if="PipeDisplay.n_tinh_trang == 2">Đang sửa</span>
                  </td>
                </tr>
                <tr v-if="PipeEdit && EditType == 2">
                  <td>
                    <span>Độ dài đoạn thay(m)</span>
                  </td>
                  <td style="padding:0">
                      <el-input size="small" v-model="MLength" type="number" step="0.01">
                      </el-input>
                  </td>
                </tr>
              </table>
            <!-- </el-form> -->

            <div style="display: flex; margin-top: 10px; width: 100%; justify-content: center;align-items: center;">
              <el-button v-if="!PipeEdit" type="danger" @click="handlePipeDelete(PipeDisplay)"><i
                  style="padding-right:10px" class="fa fa-trash" />Xóa</el-button>
              <el-button v-if="!PipeEdit" type="primary" @click="handleOpenPipeEdit(PipeDisplay)"><i class="fa fa-edit"
                  style="padding-right:10px" />Sửa</el-button>
              <el-button v-if="PipeEdit && EditType == 1" type="danger" @click="handleClosePipeEdit"><i
                  class="fa fa-times" style="padding-right:10px" />Hủy</el-button>
              <el-button v-if="PipeEdit && EditType == 1" type="primary" @click="handlePipeEdit"><i class="fa fa-edit"
                  style="padding-right:10px" />Xác
                nhận</el-button>
            </div>
            <div class="tb-title" style="width:100%;">
                <div>Sửa ống nước</div>
              </div>
            <div style="display: flex; width: 100%; padding:0 10px 10px 10px; justify-content: center;align-items: center; flex-wrap: nowrap;">
              <el-button v-if="!PipeEdit && (PipeDisplay.n_tinh_trang == 1)" type="primary"
                @click="handleOpenMaintenance(PipeDisplay)"><i class="fa fa-wrench" style="padding-right:10px" />Yêu cầu
                thay ống</el-button>

              <el-button v-if="!PipeEdit && (PipeDisplay.n_tinh_trang == 2)" type="danger"
                @click="handleCancelMaintenance(PipeDisplay)"><i class="fa fa-times"
                  style="padding-right:10px" />Hủy</el-button>

              <el-button v-if="!PipeEdit && (PipeDisplay.n_tinh_trang == 2)" type="success"
                @click="handleFinishMaintenance(PipeDisplay)"><i class="fa fa-check" style="padding-right:10px" />Hoàn
                thành</el-button>

              <el-button v-if="PipeEdit && EditType == 2" type="danger"
                @click="PipeEdit = false, EditType = 0, MLength = 0"><i class="fa fa-times"
                  style="padding-right:10px" />Hủy</el-button>

              <el-button v-if="PipeEdit && EditType == 2" type="success" @click=" handleRequestMaintenance()"><i
                  class="fa fa-check" style="padding-right:10px" />Xác nhận</el-button>
            </div>
          </div>
        </div>
        <!-- Tab hiện thông tin bộ lọc -->
        <div class="filter" v-if="menuState === 'filter'">
          <div class="control">
            <h4 style="display: flex;justify-content: space-between;">Đồng hồ<div><i @mouseover="guide = true"
                  @mouseout="guide = false" class="fa fa-question question"></i></div>
            </h4>
            <div class="guide" v-if="guide">
              <span>Hướng dẫn tìm kiếm:</span>
              <div style="margin-left: 10px;">-<span style="padding-left: 5px;">Để tìm kiếm theo tuyến hãy chọn nhân viên
                  viên đọc trước để hiển thị danh sách tuyến của nhân viên tương ứng</span>
              </div>
              <div style="margin-left: 10px;">-<span style="padding-left: 5px;">Tìm kiếm chi tiết sẽ tìm theo tên hoặc số
                  series</span>
              </div>
              <div style="margin-left: 10px;">-<span style="padding-left: 5px;">Chọn một đối tượng trong danh sách để di
                  chuyển đến vị trí của đối tượng đó</span></div>
              <div style="margin-left: 10px;">-<span style="padding-left: 5px;color:red">Hiển thị danh sách có quá nhiều
                  Đồng hồ có thể làm trang web bị chậm</span></div>
            </div>
            <div class="filter-input">
              <el-select style="width: 100%;" v-model="filterTemp.employee" @change="handleFindRoutesFilter();"
                placeholder="Chọn nhân viên">
                <el-option value="" label="Chọn nhân viên"></el-option>
                <el-option v-for="item in employeeList" :key="item.nMaNhanVien" :label="item.cTenNhanVien"
                  :value="item.nMaNhanVien"></el-option>
              </el-select>
            </div>
            <div class="filter-input">
              <el-select style="width: 100%;" v-model="filterTemp.route" placeholder="Chọn tuyến">
                <el-option value="" label="Chọn tuyến"></el-option>
                <el-option v-for="item in listRouteFilter" :key="item.nMaTuyen" :label="item.cTenTuyen"
                  :value="item.nMaTuyen">
                </el-option>
              </el-select>
            </div>
            <div class="filter-input">
              <el-select style="width: 100%;" v-model="filterTemp.clockType" placeholder="Chọn loại đồng hồ">
                <el-option value="" label="Chọn loại đồng hồ"></el-option>
                <el-option v-for="item in clockTypes" :key="item.nMaLoai" :label="item.cTenLoai" :value="item.cTenLoai">
                </el-option>
              </el-select>
            </div>
            <div class="filter-input" style="display: flex;">
              <el-input v-model="filterTemp.data" placeholder="Tìm kiếm chi tiết" clearable name="filterData" />
              <el-button type="primary" @click="handleFilter"><i class="fa fa-search" /></el-button>
            </div>
            <div>
              <input type="checkbox" v-model="filter.clockState.stopped" name="clock-status" @change="showList = false" />
              <label for="">&nbsp; Tạm ngưng</label>
            </div>
            <h4>Loại đồng hồ</h4>
          </div>
          <div class="filter-pill"
            style="display: flex; justify-content: center; align-items: center; flex-direction: column;">
            <div class="pill" v-if="filter.clockState.working">
              <button @click="filter.clockState.working = false">
                <i class="fa-solid fa-xmark"></i>
              </button>
              Trạng thái: Đang hoạt động
            </div>
            <div class="pill" v-if="filter.clockState.stopped">
              <button @click="filter.clockState.stopped = false">
                <i class="fa-solid fa-xmark"></i>
              </button>
              Trạng thái: Tạm ngưng
            </div>
          </div>
          <div class="info">
            Đang hiển thị <strong>{{ filtedMarkers.length }}</strong> đồng hồ
          </div>
          <div style="display: flex;justify-content: center; flex-direction: column;">
            <el-button type="primary" size="small" style="margin: 5px;" v-if="!showList" @click="handleShowList">Hiện danh
              sách</el-button>

            <el-table v-else size="small" stripe :border=true highlight-current-row
              :data="showList ? filtedMarkers : dummyData" @row-click="handleJump" max-height="300px"
              cell-class-name="data-display" row-class-name="data-row" empty-text="">
              <el-table-column label="Tên" prop="cTenKhachHang"></el-table-column>
              <el-table-column label="Đồng hồ" prop="cSerial"></el-table-column>
            </el-table>

          </div>
        </div>
      </div>
      <!-- Chức năng -->
      <div class="functions">
        <div class="select-n-result">
          <div class="selectors">
            <el-select style="margin-top:10px" v-model="MapType" @change="ChangeMapType">
              <el-option v-for="item in tileProviders" :key="item.id" :label="item.name" :value="item.id">
              </el-option>
            </el-select>
            <el-select class="function" style="margin-top:10px" v-model="action" @change="clearMapper"
              :disabled="this.PipeEdit">
              <el-option key="0" label="Tiện ích bản đồ" value="0">
              </el-option>
              <el-option key="1" label="Tính diện tích" value="1">
              </el-option>
              <el-option key="2" label="Tính khoảng cách" value="2">
              </el-option>
              <el-option key="3" label="Thông tin vị trí" value="3">
              </el-option>
              <el-option key="4" label="Vẽ ống nước" value="4">
              </el-option>
            </el-select>
          </div>
          <!-- Tính toán -->
          <div v-if="action == 1 || action == 2" class="result">
            <div>
              <span v-if="action == 1">Diện tích: {{ this.result }} <span v-if="unit == 1">(km<sup>2</sup>)</span><span
                  v-if="unit == 0">(m<sup>2</sup>)</span></span>
              <span v-if="action == 2">Khoảng cách: {{ this.displayResult }} <span v-if="unit == 1">(km)</span><span
                  v-if="unit == 0">(m)</span></span>
            </div>
            <div></div>
            <div @click="handleCloseResult" style="margin-left:10px">
              <i class="fa fa-times"></i>
            </div>
          </div>
        </div>
        <!-- Vẽ ống nước -->
        <div class="PipeForm">
          <div v-if="action == 4" class="addPipe">
            <div class="AddInfo">
              <div
                style="display: flex; flex-direction: column; justify-content: flex-start; width: 100%; padding-bottom: 10px;">
                <Label text="Tên ống nước:" />
                <el-input size="small" v-model="PipeName" placeholder="Tên ống nước"></el-input>
              </div>
              <div
                style="display: flex; flex-direction: column; justify-content: flex-start; width: 100%; padding-bottom: 10px;">
                <Label text="Loại ống nước:" />
                <el-select size="small" v-model="PipeType" placeholder="Chọn loại ống">
                  <el-option v-for="item in PipeTypes" :key="item.n_ma_loai_ong" :label="item.c_ten_loai_ong"
                    :value="item.n_ma_loai_ong"></el-option>
                </el-select>
              </div>
              <div
                style="display: flex; flex-direction: column; justify-content: flex-start; width: 100%; padding-bottom: 10px;">
                <Label text="Độ dài(m):" v-if="unit == 0" />
                <Label text="Độ dài(Km):" v-if="unit == 1" />
                <el-input size="small" v-model="displayResult" :readonly="true"></el-input>
              </div>
            </div>
            <div>
              <el-button @click="handleSavePipe" type="primary" size="small" style="margin-left:10px">Thêm</el-button>
              <el-button @click="handleCloseResult" type="danger" size="small" style="margin-left:10px">Hủy</el-button>

            </div>
          </div>

        </div>

        <div class="utility-btn">
          <el-button class="util-btn" @click="handleUndo" title="Hoàn tác" v-if="this.drawnMarkers.length > 0"><i
              class="fa fa-undo" />
          </el-button>
          <el-button class="util-btn" style="font-size: 1.5rem;z-index: 500;" @click="handleScreenShot"
            title="Chụp mành hình"><i class="fa fa-camera" /></el-button>
          <el-button class="util-btn" style="font-size: 1.5rem;z-index: 500;" @click="fullscreen = !fullscreen"
            title="Mở Rộng màn hình"><i class="fa fa-arrows-alt" /></el-button>
        </div>
      </div>
      <div id="mapID">
      </div>
    </div>
  </div>
</template>

<script>

import area from '@turf/area';
import L from "leaflet";
import 'leaflet-editable';
import "leaflet/dist/leaflet.css";
import "leaflet-draw"
import "leaflet-draw/dist/leaflet.draw.css"
import { SimpleMapScreenshoter } from 'leaflet-simple-map-screenshoter';
import { saveAs } from 'file-saver';
import Label from "../components/Label.vue";

export default {
  components: {
    SimpleMapScreenshoter, Label
  },

  data() {
    return {
      editableLayer: null,
      currentLayer: null,
      edit: false,
      showList: false,
      MapType: 3,
      map: null,
      iconSize: 64,
      markerGroup: null,
      popupGroup: null,
      markers: [],
      searchValue: "",
      /*       LocationIQ: {
              TOKEN: "pk.7e54728e97d6aa824fd3717530aed0f8",
              RESERVESEARCHURL: "https://eu1.locationiq.com/v1/reverse.php?format=json&",
              data: null,
            }, */
      geoData: null,
      geoResult: {
        city: '',
        district: '',
        ward: '',
        lat: '',
        long: '',
      },
      tileProviders: [
        {
          id: 1,
          name: "StreetMap",
          visible: true,
          url: "https://tile.jawg.io/76f5bc5e-b403-46b9-8d30-32c1e9620887/{z}/{x}/{y}{r}.png?access-token=mFRUnZzAJbYPRTWPiXSTvggfOdywPTAzKfi2X8pwOAuI4AmE7L8Hqdbpy79eM3Dq",
          attribution:
            '&copy; <a href="https://www.jawg.io" target="_blank">&copy; Jawg</a> - <a href="https://www.openstreetmap.org" target="_blank">&copy; OpenStreetMap</a>&nbsp;contributors',
        },
        {
          id: 2,
          name: "Ảnh vệ tinh",
          visible: false,
          url: "https://server.arcgisonline.com/ArcGIS/rest/services/World_Imagery/MapServer/tile/{z}/{y}/{x}",
          attribution:
            '&copy; <a href="https://www.jawg.io" target="_blank">&copy; Jawg</a> - <a href="https://www.openstreetmap.org" target="_blank">&copy; OpenStreetMap</a>&nbsp;contributors',
        },
        {
          id: 3,
          name: "Open Street map",
          visible: false,
          url: "https://tile.openstreetmap.org/{z}/{x}/{y}.png",
          attribution:
            '&copy; <a href="https://www.jawg.io" target="_blank">&copy; Jawg</a> - <a href="https://www.openstreetmap.org" target="_blank">&copy; OpenStreetMap</a>&nbsp;contributors',
        }
      ],
      filterType: '',
      filterEmployee: '',
      filterData: '',
      filterRoute: '',
      filterClockType: '',
      filterTemp: {
        data: '',
        type: "",
        employee: "",
        route: '',
        clockType: '',
      },
      fakeClock: [
        {
          cDiaChi: "khu 1",
          cSerial: "VN011",
          cTenKhachHang: "Nguyễn Văn A",
          cTenLoai: "Đồng hồ  van điện tử",
          cTenTuyen: "Khu 1",
          cTinhTrangDongHo: "Đang hoạt động",
          id: 14,
          nKinhDo: 106.69057890795659,
          nViDo: 20.833006638583466,
          nMaKhachHang: 17,
        },
        {
          cDiaChi: "khu 1",
          cSerial: "VN011",
          cTenKhachHang: "Nguyễn Văn A",
          cTenLoai: "Đồng hồ  van điện tử",
          cTenTuyen: "Khu 1",
          cTinhTrangDongHo: "Đang hoạt động",
          id: 14,
          nKinhDo: 106.69148013017112,
          nViDo: 20.833728609277433,
          nMaKhachHang: 17,
        },
        {
          cDiaChi: "khu 1",
          cSerial: "VN011",
          cTenKhachHang: "Nguyễn Văn A",
          cTenLoai: "Đồng hồ  van điện tử",
          cTenTuyen: "Khu 1",
          cTinhTrangDongHo: "Đang hoạt động",
          id: 14,
          nKinhDo: 106.693110913226,
          nViDo: 20.8335280622097,
          nMaKhachHang: 17,
        },
        {
          cDiaChi: "khu 1",
          cSerial: "VN011",
          cTenKhachHang: "Nguyễn Văn A",
          cTenLoai: "Đồng hồ  van điện tử",
          cTenTuyen: "Khu 1",
          cTinhTrangDongHo: "Đang hoạt động",
          id: 14,
          nKinhDo:
            106.69392630475342,
          nViDo:
            20.830961036151457,
          nMaKhachHang: 17,
        },
        {
          cDiaChi: "khu 1",
          cSerial: "VN011",
          cTenKhachHang: "Nguyễn Văn A",
          cTenLoai: "Đồng hồ  van điện tử",
          cTenTuyen: "Khu 1",
          cTinhTrangDongHo: "Tạm ngưng",
          id: 14,
          nKinhDo: 106.69148013017112,
          nViDo:
            20.830961036151457,
          nMaKhachHang: 17,
        },
        {
          cDiaChi: "khu 1",
          cSerial: "VN011",
          cTenKhachHang: "Nguyễn Văn A",
          cTenLoai: "Đồng hồ  van điện tử",
          cTenTuyen: "Khu 1",
          cTinhTrangDongHo: "Tạm ngưng",
          id: 14,
          nKinhDo: 106.69148013017112,
          nViDo: 20.833006638583466,
          nMaKhachHang: 17,
        },
      ],
      filter: {
        clockState: {
          working: true,
          stopped: false,
        },
      },
      lat: 20.843552,
      lng: 106.710024,
      zoom: 17,
      currentPlace: null,
      menuState: "filter",
      clockDisplay: null,
      drawingMarkers: [],
      drawnMarkers: [],
      polygon: null,
      polygoneMap: [],
      markerMap: [],
      lineMap: [],
      action: "0",
      result: 0,
      unit: 1,
      distance: 0,
      displayResult: 0,
      guide: false,
      dummyData: [],
      listroute: [],
      listRouteFilter: [],
      employeeList: [],
      dataForm: {},
      bounds: [
        [19.25189, 104.715942],
        [22.019453, 108.119202]
      ],
      fullscreen: false,
      loading: false,
      selectType: 0,
      displayMarker: [],
      TypePageRequest: {},
      clockTypes: [],

      PipeName: "",
      PipeInfo: "",
      PipeTypes: [],
      PipeType: null,
      PipeTemp: [],
      PipeDisplay: null,
      pipeColor: "#4B00E0",
      Pipes: [],
      PipeList: [],
      pageRequest: {},
      pipeDataform: {},
      highlighted: null,
      PipeEdit: false,
      EditType: 1,
      PipeID: null,
      OldPipeType: null,
      TempLayer: null,
      TempMarkers: null,
      MLength: 0
    };
  },

  mounted() {
    this.handleFindRoutes();
    this.handleFindClockType();
    this.handleFindPipeType();
    this.handleFindPipe();
    this.getEmployee();
    this.loadData();
    this.setupMap();
    this.setUpScreenShot();
    this.drawingMarkers = L.layerGroup().addTo(this.map);
    this.markerGroup = L.layerGroup().addTo(this.map);
    this.popupGroup = L.layerGroup().addTo(this.map);
    // this.fakeMarker(1000);
    // this.drawClock(this.filtedMarkers);
    L.control.scale({ metric: true, updateWhenIdle: true }).addTo(this.map);
    this.map.on('zoomend', () => {

      if (this.map.getZoom() === 17)
        this.drawName(this.filtedMarkers);
      if (this.map.getZoom() < 17)
        this.popupGroup.clearLayers();
    });
    this.map.on('moveend', () => {
      if (this.map.getZoom() >= 17)
        this.drawName(this.filtedMarkers);
    });
    this.map.on('click', (res) => {
      this.drawMarkers(res);
      this.drawingMarkers = L.layerGroup().addTo(this.map)
      this.delay(200).then(() => {
        if (this.action == 3) {
          this.map.removeLayer(this.displayMarker)

          this.reverseGeoCoding(res.latlng)
          this.delay(300).then(() => {

            var myIcon = L.icon({
              iconUrl: '/img/marker.png',
              iconSize: [38, 65],
              iconAnchor: [20, 64],
              popupAnchor: [-3, -76],
              shadowUrl: '/img/marker-shadow.png',
              shadowSize: [68, 65],
              shadowAnchor: [21, 64]
            });
            this.displayMarker = L.marker(res.latlng, { icon: myIcon }).addTo(this.map)
            this.menuState = "props";
          })
        }
      })

      if (this.map.getZoom() >= 17)
        this.drawName(this.filtedMarkers);
    });
    /* this.map.locate({setView: true,watch:true, maxZoom:16})
    this.map.on('locationfound', this.onLocationFound);
    this.map.on('locationerror', this.onLocationError); */
  },
  updated() {
  },
  watch: {
    filtedMarkers() {
      this.drawClock(this.filtedMarkers);
    },
    fullscreen() {
      if (this.fullscreen) {
        document.getElementById("nav").classList.add("fullscreen")
      }
      else {
        document.getElementById("nav").classList.remove("fullscreen")
      }
      this.delay(1000).then(() => {
        this.map.invalidateSize()
      })
    },
    loading() {
      if (this.loading) {
        document.getElementById("loading-screen").classList.add("loading-screen")
        document.getElementById("loader").classList.add("loader")
      }

      else {
        document.getElementById("loading-screen").classList.remove("loading-screen")
        document.getElementById("loader").classList.remove("loader")
      }
    },
    action() {
      if (this.action == 4) {
        this.pipeDataform.columnFilters = {
          PipeName: { value: null },
          PipeInfo: { value: null },
          PipeType: { value: null }
        }
        this.PipeName = ""
        this.PipeInfo = ""
        this.PipeType = null
      }
    }
  },
  computed: {
    filtedMarkers() {
      let r = [];
      //dữ liệu thật
      if (this.filter.clockState.working)
        r = this.markers.filter((i) => i.cTinhTrangDongHo === "Đang hoạt động");
      if (this.filter.clockState.stopped)
        r = r.concat(
          this.markers.filter((i) => i.cTinhTrangDongHo === "Tạm ngưng")
        );
      if (this.filterRoute != '') {
        r = r.filter((i) => (i.nMaTuyen == this.filterRoute))
      }
      if (this.filterEmployee != '') {
        r = r.filter((i) => (i.nMaNhanVien == this.filterEmployee))
      }
      if (this.filterClockType != '') {
        r = r.filter((i) => (i.cTenLoai == this.filterClockType))
      }
      r = r.filter((i) => (i.cTenKhachHang.toLowerCase()).indexOf(this.filterData.toLowerCase()) >= 0 || (i.cSerial.toLowerCase()).indexOf(this.filterData.toLowerCase()) >= 0)

      // //dữ liệu fake
      // if (this.filter.clockState.working)
      //   r = this.fakeClock.filter((i) => i.cTinhTrangDongHo === "Đang hoạt động");
      // if (this.filter.clockState.stopped)
      //   r = r.concat(
      //     this.fakeClock.filter((i) => i.cTinhTrangDongHo === "Tạm ngưng")
      //   );
      return r;
    },
  },
  methods: {

    //Đóng thông tin
    handleClosePoint() {
      if(this.PipeEdit){
        this.handleClosePipeEdit()
      }
      if (this.highlighted != null) {
        console.log("running")
        this.highlighted.setStyle({ color: this.pipeColor, })
      }
      this.PipeName = ""
      this.PipeType = null
      this.PipeInfo = ""

      this.map.removeLayer(this.displayMarker)
      this.geoData = null
      this.geoResult = {
        city: '',
        district: '',
        ward: '',
        lat: '',
        long: '',
      }
      this.selectType = 0
      this.clockDisplay = null

      this.menuState = "filter"
      if (this.currentLayer != null) {
        this.currentLayer.disableEdit()
      }
      this.highlighted = null
      this.PipeEdit = false
      this.PipeDisplay = null
    },

    //xử lý thông tin vị trí
    handleResult() {
      this.geoResult = {
        city: '',
        district: '',
        ward: ''
      }
      let temp = this.geoData.localityInfo.administrative
      for (let i = 0; i < temp.length; i++) {
        if (temp[i].adminLevel == 4) {
          this.geoResult.city = temp[i].name
        }
        else if (temp[i].adminLevel == 6) {
          this.geoResult.district = temp[i].name
        }
        else if (temp[i].adminLevel == 8) {
          this.geoResult.ward = temp[i].name
        }
      }
      this.geoResult.lat = parseFloat(this.geoData.latitude).toFixed(7)
      this.geoResult.lon = parseFloat(this.geoData.longitude).toFixed(7)
    },

    //tìm thông tin vị trí
    reverseGeoCoding(val) {
      this.selectType = 0
      this.geoData = null
      let lat = val.lat
      let lng = val.lng
      if (lat == null || lng == null) return false;
      let url = `https://api-bdc.net/data/reverse-geocode?latitude=${lat}&longitude=${lng}&localityLanguage=vi&key=bdc_62348b9a89334a0abdf97d5a85a637e6`
      fetch(url)
        .then((res) => {
          if (!res.ok) throw new Error(res.statusText);
          return res.json()
        })
        .then((data) => {
          this.delay(200).then(() => {
            this.geoData = data
            this.handleResult()
          })
          this.menuState = "props";
          this.fullscreen = false;
        })
        .catch((err) => {
          console.error(err);
        });

    },

    //đợi
    delay(time) {
      return new Promise(resolve => setTimeout(resolve, time));
    },

    //chụp màn hình
    setUpScreenShot() {
      let pluginOptions = {
        cropImageByInnerWH: true,
        hidden: true,
        preventDownload: false,
        domtoimageOptions: {},
        position: 'topleft',
        screenName: 'screen',
        iconUrl: null,
        hideElementsWithSelectors: ['.leaflet-control-container'],
        mimeType: 'image/png',
        caption: null,
        captionFontSize: 15,
        captionFont: 'Arial',
        captionColor: 'black',
        captionBgColor: 'white',
        captionOffset: 5,
        onPixelDataFail: async function ({ node, plugin, error, mapPane, domtoimageOptions }) {
          return plugin._getPixelDataOfNormalMap(domtoimageOptions)
        }
      }
      SimpleMapScreenshoter = L.simpleMapScreenshoter(pluginOptions).addTo(this.map)
    },
    handleScreenShot() {
      this.loading = true
      let format = 'blob'
      let overridedPluginOptions = {
        mimeType: 'image/jng'
      }
      SimpleMapScreenshoter.takeScreen(format, overridedPluginOptions).then(blob => {
        saveAs(new Blob([blob]), 'Screen.png');
        this.loading = false
      }).catch(e => {
        alert(e)
        this.loading = false
      })
    },

    //chỉnh sửa
    handleOpenEdit() {
      this.edit = true;
      this.dataForm = Object.assign({}, this.clockDisplay)
    },
    handleEdit() {
      this.$confirm("Bạn có chắc muốn sửa thông tin khách hàng này", "Thông báo", {
        confirmButtonText: "Đồng ý",
        cancelButtonText: "Hủy bỏ",
        type: "warning",
      })
        .then(() => {
          this.$api.map.updateFromMap({
            route: this.dataForm.nMaTuyen,
            kinhDo: parseFloat(this.dataForm.nKinhDo),
            viDo: parseFloat(this.dataForm.nViDo),
            HDID: this.dataForm.id,
            CSName: this.dataForm.cTenKhachHang,
            diaChi: this.dataForm.cDiaChi,
            CSID: this.dataForm.nMaKhachHang,
          }).then(res => {
            if (res.code == 200) {
              this.clockDisplay = this.dataForm
              this.loadData()
              /* this.drawClock(this.filtedMarkers) */
              this.edit = false;
            }
          })
        })

    },

    //xóa
    handleDelete() {
      let panma = { nMaHopDong: this.clockDisplay.id };
      this.$confirm("Bạn có chắc muốn xóa", "Thông báo", {
        confirmButtonText: "Đồng ý",
        cancelButtonText: "Hủy bỏ",
        type: "warning",
      })
        .then(() => {
          this.$api.contract.deletehopdong([panma]).then((res) => {
            this.$message({
              message: `Xóa thành công`,
              type: "success",
            });
            this.loadData();
            this.drawClock(this.filtedMarkers)
          });
        })
        .catch(() => { });
    },

    //danh sách đồng hồ
    handleShowList() {
      if (this.filtedMarkers.length > 1000) {
        this.$confirm('Danh sách hiện có 1 lượng lớn đồng hồ bạn có chác muốn hiển thị danh sách?', 'Xác nhận', {
          confirmButtonText: 'Xác nhận',
          cancelButtonText: 'Hủy',
          type: 'warning',
        }).then(() => {
          this.showList = true
        })
      }
      else {
        this.showList = true
      }
    },

    //đi đến vị trí
    handleJump(val) {
      this.selectType = 1
      this.map.setView([val.nViDo, val.nKinhDo])
      this.delay(500).then(() => {
        this.map.setZoom(18)
      })
      this.menuState = "props";
      this.clockDisplay = val;
    },

    //đóng kết quả tính toán
    handleCloseResult() {
      this.action = '0'
      this.clearMapper()
      this.handleClosePoint()
    },

    //xử lý bộ lọc
    handleFilter() {
      this.showList = false
      this.filterData = this.filterTemp.data
      this.filterRoute = this.filterTemp.route
      this.filterEmployee = this.filterTemp.employee
      this.filterClockType = this.filterTemp.clockType
    },

  //Khoảng cách
    //tính khoảng cách
    handleCalculateDistance(coord, type) {
      let length = coord.length
      let lat1 = coord[length - 2].lat
      let lat2 = coord[length - 1].lat
      let lon1 = coord[length - 2].lng
      let lon2 = coord[length - 1].lng
      const R = 6371e3; // metres
      const φ1 = lat1 * Math.PI / 180; // φ, λ in radians
      const φ2 = lat2 * Math.PI / 180;
      const Δφ = (lat2 - lat1) * Math.PI / 180;
      const Δλ = (lon2 - lon1) * Math.PI / 180;

      const a = Math.sin(Δφ / 2) * Math.sin(Δφ / 2) +
        Math.cos(φ1) * Math.cos(φ2) *
        Math.sin(Δλ / 2) * Math.sin(Δλ / 2);
      const c = 2 * Math.atan2(Math.sqrt(a), Math.sqrt(1 - a));

      const d = R * c; // in metres
      if (type == 1)
        this.result += d;
      else if (type == 2)
        this.result -= d;
      this.unit = 0
      if (this.action == 1) {
      }
      if (this.result > 1000) {
        this.displayResult = (this.result / 1000).toFixed(3)
        this.unit = 1
      }
      else {
        this.displayResult = this.result.toFixed(3)
      }
    },

    //tính diện tích
    handleCalculate() {

      let coord = this.drawnMarkers

      const path = coord.map(coord => [coord.lat, coord.lng]);
      var polygon = L.polygon(path)

      let j = coord.length - 1
      /*  let calc = 0; 
          for (let i = 0; i < coord.length; i++) {
          
          let a = coord[j]
          let b = coord[i]
          this.handleCalculateDistance([a,b])
          calc += (a.lng*b.lat-a.lat*b.lng)
          j = i
        } */
      var calc = area(polygon.toGeoJSON(), { units: 'meter' })
      this.result = Math.abs(calc)
      this.unit = 0

      if (this.result > 1000000) {
        this.result /= 1000000

        this.unit = 1
      }
      this.result = this.result.toFixed(3)
    },

    //hoàn tác
    handleUndo() {
      let temp = this.drawnMarkers
      if (this.drawnMarkers.length > 0) {
        this.drawnMarkers.splice(this.drawnMarkers.length - 1, 1)
      }
      if (this.action == 2) {
        if (temp.length >= 2) {
          this.handleCalculateDistance(temp, 2)
        } else {
          this.result = 0
          this.displayResult = 0
        }

        if (this.lineMap.length >= 1) {
          for (var n = 0; n < this.lineMap.length; n++) {
            this.map.removeLayer(this.lineMap[n]);
          }
        }
        var line = L.polyline(this.drawnMarkers, {
          color: 'blue',
          weight: 1,
          opacity: 0.5,
          smoothFactor: 1
        }).addTo(this.map)
        this.lineMap.push(line)
      }

      if (this.markerMap.length > 0) {
        this.map.removeLayer(this.markerMap[this.markerMap.length - 1])
        this.markerMap.splice(this.markerMap.length - 1, 1)
      }
      if (this.action == 1) {
        this.map.removeLayer(this.polygoneMap[this.polygoneMap.length - 1])
        if (this.drawnMarkers.length >= 2) {
          this.result = 0
          var polygon = L.polygon(this.drawnMarkers, {
            color: 'blue',
            weight: 1,
            opacity: 0.5,
            smoothFactor: 1
          }).addTo(this.map)
          this.polygoneMap.push(polygon);
          if (this.drawnMarkers.length > 2) {
            this.result = 0
            this.handleCalculate();
          }

        }
      }
      if (this.action == 4) {
        if (this.PipeTemp.length >= 1) {
          for (var n = 0; n < this.PipeTemp.length; n++) {
            this.map.removeLayer(this.PipeTemp[n]);
          }
        }
        this.pipeColor = "#4B00E0"
        var line = L.polyline(this.drawnMarkers, {
          color: this.pipeColor,
          weight: 3,
          opacity: 1,
          smoothFactor: 1
        }).addTo(this.map)
        this.PipeTemp.push(line)
      }
    },

    //clear hình vẽ
    clearMapper() {
      for (var n = 0; n < this.polygoneMap.length; n++) {
        this.map.removeLayer(this.polygoneMap[n]);
      }
      for (var n = 0; n < this.markerMap.length; n++) {
        this.map.removeLayer(this.markerMap[n]);
      }
      for (var n = 0; n < this.lineMap.length; n++) {
        this.map.removeLayer(this.lineMap[n]);
      }
      for (var n = 0; n < this.PipeTemp.length; n++) {
        this.map.removeLayer(this.PipeTemp[n]);
      }
      this.PipeEdit = false
      this.drawnMarkers = []
      this.result = 0
      this.displayResult = 0
      this.unit = 1
      if (this.action != "0") {
        L.DomUtil.addClass(this.map._container, 'calc-enabled')
      }
      else {
        L.DomUtil.removeClass(this.map._container, 'calc-enabled');
      }
    },


    //Ống nước

    //vẽ ống nước
    clearPipeLine() {
      for (var n = 0; n < this.PipeList.length; n++) {
        this.map.removeLayer(this.PipeList[n]);
      }
    },
    handleDrawPipe() {
      this.clearPipeLine()
      this.PipeList = []
      for (let i = 0; i < this.Pipes.length; i++) {
        let Markers = JSON.parse(this.Pipes[i].c_thong_tin_ve_tuyen_ong)
        var line = L.polyline(Markers, {
          color: this.pipeColor,
          weight: 5,
          opacity: 1,
          smoothFactor: 1
        }).on("click", (e) => {
          this.delay(100).then(() => {
            var layer = e.target;
            if (this.action == "3" || this.action == "0") {
              if (this.highlighted != layer) {
                if (this.highlighted != null) {
                  this.highlighted.setStyle({ color: this.pipeColor, })
                }
                layer.setStyle({ color: "red", })
                this.highlighted = layer
                this.TempMarkers = Markers
                this.PipeDisplay = this.Pipes[i];
                this.menuState = "props";
                this.fullscreen = false;
                this.delay(300).then(() => {
                  this.selectType = 2;
                })
              }
              else {
                layer.setStyle({ color: this.pipeColor, })
                this.highlighted = null
                this.handleClosePoint()
              }
            }

          })
        }).addTo(this.map)
        this.PipeList.push(line)
      }
    },

    //tìm ống nước
    handleFindPipe() {
      this.pageRequest = {
        columnFilters:{
          PipeName:{value:""},
          Status:{value:-2},
          SearchType:{value:0}
        },
        pageNum: 1,
        pageSize: 10000
      },
        this.$api.pipes.findPipePage(this.pageRequest).then(res => {
          if (res.code == 200) {
            this.Pipes = res.data.content;
            this.handleDrawPipe();
          } else {
            this.$message({ message: "Tải dữ liệu loại thất bại ", type: "error" });
          }
        })
    },

    //Lưu ống nước
    handleSavePipe() {
      this.PipeInfo = JSON.stringify(this.drawnMarkers)
      if (this.PipeName == "") {
        this.$message({ message: "Xin vui lòng nhập tên ống", type: "error" })
      } else if (this.PipeType == null) {
        this.$message({ message: "Xin vui lòng chọn loại", type: "error" })
      } else if (this.PipeInfo == "") {
        this.$message({ message: "Xin vui lòng vẽ ống", type: "error" })
      } else {
        this.pipeDataform.columnFilters = {
          PipeName: { value: this.PipeName },
          PipeInfo: { value: this.PipeInfo },
          PipeType: { value: this.PipeType },
          PipeLength: { value: this.displayResult },
          LengthUnit: { value: this.unit },
        }
        this.$api.pipes.addPipe(this.pipeDataform).then(res => {
          if (res.code == 200) {
            this.$message({ message: res.msg, type: "success" })
            let ReportForm = {
              columnFilters: {
                RType: { value: "create" },
                PipeName: { value: this.PipeName },
                OldType: { value: -1 },
                NewType: { value: -1 }
              }
            }
            this.$api.pipes.createPipeReport(ReportForm).then(res => { })
            this.handleClosePoint();
            this.handleCloseResult()
            this.handleFindPipe()
          } else {
            this.$message({ message: res.msg, type: "error" })
          }
        })
      }

    },

    //Xóa ống nước
    handlePipeDelete(val) {
      this.$confirm("Bạn có muốn xóa ống nước này không?", 'Xác nhận', {
        confirmButtonText: 'Xác nhận',
        cancelButtonText: 'Hủy',
        type: 'warning'
      }).then(() => {
        this.pipeDataform.columnFilters = {
          ID: { value: val.n_ma_tuyen_ong },
        }
        this.$api.pipes.deletePipe(this.pipeDataform).then((res) => {
          if (res.code == 200) {
            this.$message({ message: res.msg, type: 'success' })
            let ReportForm = {
              columnFilters: {
                RType: { value: "delete" },
                PipeName: { value: val.c_ten_tuyen_ong },
                OldType: { value: -1 },
                NewType: { value: -1 }
              }
            }
            this.$api.pipes.createPipeReport(ReportForm).then(res => { })
            this.handleClosePoint()
            this.handleCloseResult()
            this.handleFindPipe()
          } else {
            this.$message({ message: res.msg, type: 'error' })
          }
        })

      })
        .catch(() => {
          this.$message({
            type: 'info',
            message: 'Hủy xóa'
          });
        });

    },

    //Sửa ống nước
    //Bắt đầu sửa
    handleOpenPipeEdit(val) {
      this.clearMapper()
      this.action = "0"
      this.PipeName = val.c_ten_tuyen_ong
      this.PipeType = val.n_ma_loai_ong
      this.PipeInfo = val.c_thong_tin_ve_tuyen_ong
      this.PipeID = val.n_ma_tuyen_ong
      this.unit = val.n_don_vi_do_dai
      this.OldPipeType = val.n_ma_loai_ong
      if (this.unit == 1) {
        this.displayResult = val.n_do_dai.toFixed(3)
      }
      else if (this.unit == 0) {
        this.displayResult = val.n_do_dai.toFixed(3)
      }
      this.EditType = 1
      this.PipeEdit = true
      this.highlighted.setStyle({ color: "transparent" })
      this.TempLayer = L.polyline(this.TempMarkers, { color: "red", weight: 5 }).addTo(this.map)

      this.currentLayer = L.polyline(this.highlighted._latlngs).addTo(this.map)
      this.currentLayer.enableEdit();
      this.currentLayer.on("editable:editing", res => {
        this.result = 0
        for (let i = 1; i < res.layer._latlngs.length; i++) {
          let cords = [res.layer._latlngs[i - 1], res.layer._latlngs[i]]
          this.handleCalculateDistance(cords, 1)
        }
      })
    },
    //Hủy sửa
    handleClosePipeEdit() {
      this.PipeEdit = false
      this.map.removeLayer(this.TempLayer)
      this.highlighted.setLatLngs(this.TempMarkers)
      this.highlighted.setStyle({ color: "red" })
      this.currentLayer.disableEdit()
      this.map.removeLayer(this.currentLayer)
    },
    //Sửa
    handlePipeEdit() {
      const n = this.currentLayer._latlngs
      let newPipeInfo = []
      for (let i = 0; i < n.length; i++) {
        newPipeInfo[i] = {
          lat: n[i].lat,
          lng: n[i].lng
        }
      }
      this.pipeDataform.columnFilters = {
        PipeName: { value: this.PipeName },
        PipeInfo: { value: JSON.stringify(newPipeInfo) },
        PipeType: { value: this.PipeType },
        PipeLength: { value: this.displayResult },
        LengthUnit: { value: this.unit },
        ID: { value: this.PipeID }
      }
      this.$api.pipes.updatePipe(this.pipeDataform).then(res => {
        if (res.code == 200) {
          let ReportForm = {
            columnFilters: {
              RType: { value: "edit" },
              PipeName: { value: this.PipeName },
              OldType: { value: this.OldPipeType },
              NewType: { value: this.PipeType }
            }
          }
          this.$api.pipes.createPipeReport(ReportForm).then(res => { })

          this.$message({ message: res.msg, type: "success" })
          this.handleClosePipeEdit();
          this.handleCloseResult();
          this.handleFindPipe();
          this.PipeEdit = false;

        } else {
          this.$message({ message: res.msg, type: "error" })
        }
      })
    },

    //Tìm loại ống
    handleFindPipeType() {
      this.TypePageRequest.columnFilters = {
        TypeName: { value: "" },
        nTinhTrang: { value: 1 },
      }
      this.TypePageRequest.pageSize = 100
      this.TypePageRequest.pageNum = 1
      this.$api.pipes.findPage(this.TypePageRequest).then((res) => {

        if (res.code == 200) {
          this.PipeTypes = res.data.content;

        } else {
          this.$message({ message: "Tải dữ liệu loại thất bại ", type: "error" });
        }
      })
    },

    //Bảo trì ống
    handleOpenMaintenance(val) {

      this.PipeID = val.n_ma_tuyen_ong
      this.PipeName = val.c_ten_tuyen_ong
      this.PipeEdit = true
      this.EditType = 2
    },
    //Yêu cầu thay ống
    handleRequestMaintenance() {
      this.pipeDataform.columnFilters = {
        ID: { value: this.PipeID }
      }
      if (this.MLength <= 0) {
        this.$message({ message: "Độ dài đoạn thay không hợp lệ", type: "error" })
      }
      else {
        this.$api.pipes.requestMaintenance(this.pipeDataform).then(res => {
          if (res.code == 200) {
            let ReportForm = {
              columnFilters: {
                RType: { value: "maintenance" },
                PipeName: { value: this.PipeName },
                MLength: { value: this.MLength }
              }
            }
            this.$api.pipes.createPipeReport(ReportForm).then(res => { })
            this.$message({ message: "Yêu cầu thành công", type: "success" })
            this.handleCloseResult();
            this.handleFindPipe();
          }
        })
      }
    },
    //Hủy thay ống
    handleCancelMaintenance(val) {
      this.$confirm("Bạn có muốn hủy yêu cầu thay ống này không?", 'Xác nhận', {
        confirmButtonText: 'Xác nhận',
        cancelButtonText: 'Hủy',
        type: 'warning'
      }).then(() => {
        this.pipeDataform.columnFilters = {
          ID: { value: val.n_ma_tuyen_ong }
        }
        this.$api.pipes.cancelRequest(this.pipeDataform).then(res => {
          if (res.code == 200) {
            let ReportForm = {
              columnFilters: {
                RType: { value: "cancel" },
                PipeName: { value: val.c_ten_tuyen_ong },
              }
            }
            this.$api.pipes.createPipeReport(ReportForm).then(res => { })
            this.$message({ message: "Hủy yêu cầu thành công", type: "success" })
            this.handleCloseResult();
            this.handleFindPipe();
          }
        })
      })


    },
    //Hoàn thành thay ống
    handleFinishMaintenance(val) {
      this.$confirm("Bạn có muốn xác nhận yêu cầu thay ống này đã hoàn thành này không?", 'Xác nhận', {
        confirmButtonText: 'Xác nhận',
        cancelButtonText: 'Hủy',
        type: 'warning'
      }).then(() => {
        this.pipeDataform.columnFilters = {
          ID: { value: val.n_ma_tuyen_ong }
        }
        this.$api.pipes.completeRequest(this.pipeDataform).then(res => {
          if (res.code == 200) {
            let ReportForm = {
              columnFilters: {
                RType: { value: "finish" },
                PipeName: { value: val.c_ten_tuyen_ong },
              }
            }
            this.$api.pipes.createPipeReport(ReportForm).then(res => { })
            this.$message({ message: "Hoàn thành yêu cầu thành công", type: "success" })
            this.handleClosePoint();
            this.handleCloseResult();
            this.handleFindPipe();
          }
        })
      })



    },
  //Bản đồ
    //vẽ điểm
    drawMarkers(i) {
      //vẽ ống
      if (this.action == 4) {
        this.drawnMarkers.push(i.latlng)
        var marker = L.circleMarker(i.latlng, {
          radius: 5,
          color: "black",
          fillColor: "white",
          weight: 3,
          opacity: 1,
        }).addTo(this.drawingMarkers)
        this.markerMap.push(marker)
        if (this.drawnMarkers.length >= 2) {
          if (this.PipeTemp.length >= 1) {
            for (var n = 0; n < this.PipeTemp.length; n++) {
              this.map.removeLayer(this.PipeTemp[n]);
            }
          }
          var line = L.polyline(this.drawnMarkers, {
            color: this.pipeColor,
            weight: 3,
            opacity: 1,
            smoothFactor: 1,
            edit_with_drag: true
          }).addTo(this.map)
          this.PipeTemp.push(line)
          this.handleCalculateDistance(this.drawnMarkers, 1);
        }
      }
      else {
        //tính diện tích
        if (this.polygoneMap.length >= 1 && this.action == 1) {
          for (var n = 0; n < this.polygoneMap.length; n++) {
            this.map.removeLayer(this.polygoneMap[n]);
          }
        }
        if (this.action == 1 || this.action == 2) {
          this.drawnMarkers.push(i.latlng)
          var marker = L.circleMarker(i.latlng, {
            radius: 4,
            fillColor: "#64c7de",
            color: "#063970",
            weight: 2,
            opacity: 1,
          }).addTo(this.drawingMarkers)
          this.markerMap.push(marker)
          if (this.drawnMarkers.length >= 2) {
            if (this.action == 1) {
              this.result = 0
              var polygon = L.polygon(this.drawnMarkers, {
                color: 'blue',
                weight: 1,
                opacity: 0.5,
                smoothFactor: 1
              }).addTo(this.map)
              this.polygoneMap.push(polygon);
              if (this.drawnMarkers.length > 2)
                this.result = 0
              this.handleCalculate();
            }
            else if (this.action == 2) {
              if (this.lineMap.length >= 1) {
                for (var n = 0; n < this.lineMap.length; n++) {
                  this.map.removeLayer(this.lineMap[n]);
                }
              }
              var line = L.polyline(this.drawnMarkers, {
                color: 'blue',
                weight: 1,
                opacity: 0.5,
                smoothFactor: 1
              }).addTo(this.map)
              this.lineMap.push(line)
              this.handleCalculateDistance(this.drawnMarkers, 1);
            }
          }
        }
      }
    },
    //đổi loại bản đồ
    ChangeMapType() {
      L.tileLayer(
        this.tileProviders[this.MapType - 1].url,
        {
          bounds: this.bounds,
          maxZoom: 19,
          minZoom: 10,
          attribution: this.tileProviders[this.MapType - 1].attribution,
          visible: this.tileProviders[this.MapType - 1].visible,
        }
      ).addTo(this.map);
    },
    //setup bản đồ
    setupMap() {
      this.map = L.map("mapID", { editable: true }).setView([20.843552, 106.710024], 16);
      L.tileLayer(
        this.tileProviders[this.MapType - 1].url,
        {
          bounds: this.bounds,
          maxZoom: 19,
          minZoom: 10,
          attribution:
            this.tileProviders[this.MapType - 1].attribution,
          visible: this.tileProviders[this.MapType - 1].visible,
        }
      ).addTo(this.map);
      this.map.setMaxBounds(this.bounds)

      this.editableLayers = new L.FeatureGroup();
      this.map.addLayer(this.editableLayers);
    },
    //tìm vị trí hiện tại(chưa dùng)
    onLocationFound(e) {
      var radius = e.accuracy;

      var myIcon = L.icon({
        iconUrl: '/img/marker.png',
        iconSize: [38, 65],
        iconAnchor: [19, 64],
        popupAnchor: [-3, -76],
        shadowUrl: '/img/marker-shadow.png',
        shadowSize: [68, 65],
        shadowAnchor: [19, 64]
      });
      L.marker(e.latlng, { icon: myIcon }).addTo(this.map)
        .bindPopup("Bạn đang ở trong khoảng " + Math.round(radius) + "m từ điểm này").openPopup();

      L.circle(e.latlng, { fillOpacity: 0.1, radius: radius }).addTo(this.map);
    },
    onLocationError(e) {
      alert(e.message);
    },

    //vẽ tên khách hàng
    drawName(clock) {
      this.popupGroup.clearLayers();
      const c = this.map.getCenter();
      clock = clock.filter(i => { return (Math.abs(c.lng - i.nKinhDo) < 0.007 && Math.abs(c.lat - i.nViDo) < 0.005) });
      clock.forEach(i => {
        L.tooltip({ direction: 'bottom', className: 'cName' }).setContent(i.cTenKhachHang).setLatLng([i.nViDo, i.nKinhDo])
          .addTo(this.popupGroup);
      })

    },
    //vẽ đồng hồ
    drawClock(clocks) {
      //xóa toàn bộ marker
      this.markerGroup.clearLayers();
      clocks.forEach((i) => {
        // i.nKinhDo+=0.1*Math.random();
        if (i.cColor == null) {
          i.cColor = "#ff77007e"
        }
        var test = L.circleMarker([i.nViDo, i.nKinhDo], {
          radius: 4,
          fillColor: i.cColor,
          color: i.cColor,
          weight: 2,
          opacity: 1,
        })
          .on("click", () => {
            this.delay(100).then(() => {
              this.clockDisplay = i;
              this.menuState = "props";
              this.fullscreen = false;
              this.delay(300).then(() => {
                this.selectType = 1;
              })

            })

          })
          .addTo(this.markerGroup);
      });
    },

    //Tuyến & nhân viên & đồng hồ
    //tìm tuyến
    handleFindRoutes() {
      this.$api.contract.findRoutes().then(res => {
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

    //tìm tuyến theo nhân viên
    handleFindRoutesFilter() {
      this.filterTemp.route = ""
      if (this.filterTemp.employee == "") {
        this.listRouteFilter = []
      } else
        this.$api.map.findRoutesForMap(this.filterTemp.employee).then(res => {
          if (res.code == 200) {
            this.listRouteFilter = res.data
          }
          else {
            this.$message({
              message: "Lấy danh sách tuyến thất bại",
              type: "error",
            });
          }
        })
    },

    //tìm nhân viên
    getEmployee() {
      const data = {};
      this.$api.employee.findAll(data).then((res) => {
        this.employeeList = res.data;
      });
    },

    //tải dữ liệu
    loadData() {
      this.$api.map.findClockForMap({}).then((res) => {
        if (res.code == 200) this.markers = res.data.content;
        else this.markers = [];
      });
    },

    //Tìm loại đồng hồ
    handleFindClockType() {
      this.$api.clocktype.findAll().then((res) => {
        if (res.code == 200) {
          this.clockTypes = res.data
        } else {
          this.$message({ message: "Tải dữ liệu thất bại lỗi code  ", type: "error" });
        }
      })
    },
  },
};


</script>
<style scoped>
.map {
  /* margin: auto; */
  width: 80%;
  /* float: right; */
  height: calc(100vh - 70px);
  border: 2px solid #e1e1e1;
}

.searchPlace {
  margin-bottom: 20px;
  padding: 10px 5px;
  width: 30%;
  border: 2px solid #e1e1e1;
  border-radius: 10px;
}

.content {
  display: flex;
  flex-direction: row;
  height: calc(100vh - 70px);
  max-width: 100%;
  overflow: hidden;
}

.navbar-map {

  display: flex;
  width: 250px;
  height: calc(100vh - 70px);
  border: 1px solid #f1f1f1;
  background: #fff;
  flex-direction: column;
  min-width: 250px;
  max-width: 250px;
  transition: ease-in 0.5s;
}

.menu-map {
  height: 50px;
  width: 100%;
  display: flex;
  flex-direction: row;
  background-color: #f1f1f1;
}

.menu-map button {
  flex: 1;
  background-color: transparent;
  border: none;
  cursor: pointer;
}

.menu-map button:hover {
  background-color: #e7e7e7;
}

.active-btn {
  border-bottom: 3px solid green !important;
  background-color: #e5e5e5;
}

#mapID {
  height: 100%;
  width: 100vw;
}

.props {
  display: flex;
  flex-direction: column;
  justify-content: center;
}

.prop-line {
  display: flex;
  flex-direction: row;
}

.prop-line div {
  flex: 1;
  /* min-width: 50%; */
  border: 1px solid #f1f1f1;
  padding: 15px 5px;
  word-wrap: break-word;
}

tr:nth-child(even) {
  background-color: #d6eeee;
}

td:nth-child(odd) {
  font-weight: bold;
}

td {
  padding: 10px 0;
  word-wrap: break-word;
}

table {
  table-layout: fixed;
  width: 100%;
  font-size: small;
}

.tb-title {
  font-weight: bold;
  padding: 10px;
  border: 3px #d6eeee;
  display: flex;
  justify-content: space-between;
}

table,
th,
td {
  border: 1px solid #c0c0c0;
  border-collapse: collapse;
  padding-left: 5px;
}

.markerLabel {
  margin-top: 70px;
  background-color: #d6eeee;
  /* font-size: 5px; */
}

.pill {
  font-size: smaller;
  background-color: aquamarine;
  padding: 10px 5px;
  width: fit-content;
  border-radius: 10px;
  margin: 5px 5px;
  /* display: flex; */
}

.pill button {
  background-color: transparent;
  border: none;
  /* margin-bottom: 10px; */
  position: relative;
  top: -7px;
  cursor: pointer;
}

.filter {
  padding: 10px;
}

.filter-input {
  margin: 5px
}

.headline {
  background-color: antiquewhite;
  width: 100px;
  position: relative;
  top: 50px;
  right: 40px;
  font-weight: 800;
  text-align: center;
}

.result {
  z-index: 500;
  height: fit-content;
  padding: 10px;
  background-color: white;
  display: flex;
  justify-content: center;
  align-items: center;
  flex-direction: row;
  flex-wrap: nowrap;
}

.addPipe {
  z-index: 500;
  height: fit-content;
  padding: 10px;
  background-color: white;
  display: flex;
  justify-content: center;
  align-items: center;
  flex-direction: column;
  flex-wrap: nowrap;
  border: 2px solid grey;
  border-radius: 5px;
}

.AddInfo {
  display: flex;
  justify-content: center;
  align-items: center;
  flex-direction: column;
}

.PipeForm {
  padding-right: 10px;
  width: 100%;
  display: flex;
  justify-content: flex-end;
}

.question {
  font-size: medium;
  height: 28px;
  width: 28px;
  border-radius: 14px;
  border: 3px solid;
  display: flex;
  align-items: center;
  justify-content: center;
}

.guide {
  position: absolute;
  z-index: 100;
  border: 1px solid;
  border-radius: 10px;
  background: #f0f8ffeb;
  padding: 5px;
  width: 15%;
  font-weight: bold;
  min-width: 230px;
  max-width: 230px;
}

.util-btn {
  z-index: 500;
  width: 42px;
  height: 42px;
  border-radius: 21px;
  display: flex;
  justify-content: center;
  align-items: center;
  color: white;
  background-color: #409EFF;
}

.edit-input {
  height: 40.5px;
  padding-left: 5px;
  width: 100%;
}

.fullscreen {
  margin-left: -250px;
  transition: ease-in 0.5s;
}

.loading-screen {
  display: flex;
  align-items: center;
  justify-content: center;
  position: absolute;
  z-index: 1049;
  height: calc(100vh - 60px);
  width: calc(100vw - 60px);
  background-color: rgba(128, 128, 128, 0.438);
}

.loader {
  border: 8px solid #f3f3f3;
  border-top: 8px solid #3498db;
  border-radius: 50%;
  width: 120px;
  height: 120px;
  animation: spin 2s linear infinite;
}

@keyframes spin {
  0% {
    transform: rotate(0deg);
  }

  100% {
    transform: rotate(360deg);
  }
}

.utility-btn {
  display: flex;
  justify-content: flex-end;
  padding: 10px;
  width: 100%;

}

.functions {
  position: absolute;
  right: 0;
  height: calc(100vh - 80px);
  flex-direction: column;
  display: flex;
  justify-content: space-between;
  align-items: center;
}

.select-n-result {
  display: flex;
  width: 50vw;
  justify-content: space-between;
  flex-direction: row-reverse;
  align-items: center;
}

.selectors {
  display: flex;
  z-index: 500;
  flex-direction: column;
  padding: 10px;
}

.info-title {
  font-weight: bold;
}

.title {
  width: 40%;

}

td {
  padding: 3px 0;
  padding-left: 3px;
}
</style>

<style>
.cName {
  font-weight: 800 !important;
  padding: 0;
  margin-top: 10px;
  background-color: rgb(195, 205, 250);
}

.leaflet-control-scale-line {
  background: rgb(255 255 255 / 50%);
}

.leaflet-container.calc-enabled {
  cursor: pointer !important;
}

.leaflet-container {
  cursor: default;
}

.data-display {
  padding: 0.5rem !important
}

.data-display .cell {
  word-break: break-word;
}

.el-table--striped .el-table__body tr.el-table__row--striped .data-display {
  background: #d6eeee !important;
}
</style>
<style>
.function .el-input__inner {
  height: 40px !important;
}
</style>
