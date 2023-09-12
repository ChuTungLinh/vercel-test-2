<template>
	<div class="wrapper m-2">
		<div class="col-md-12 form-row pt-2">
			<div class="col-md-6 d-flex">
				<Label text="Serial:" />
				<Input placeholder="Nhập số serial" v-model="search.cSerial" />
			</div>
			<div class="col-md-6 d-flex">
				<Label text="Loại đồng hồ:" />
				<DropdownList placeholder="Chọn loại đồng hồ" v-model="search.nMaLoaiDongHo">
					<el-option
						v-for="item in clockType"
						:key="item.id"
						:label="item.cTenLoai"
						:value="item.nMaLoai"
					></el-option>
				</DropdownList>
			</div>

			<div class="col-md-12 form-row pt-2">
				<div class="col-md-6 d-flex">
					<Label text="Chỉ số đầu:" />
					<Input placeholder="Nhập chỉ số đầu" v-model="search.nChiSoDau" />
				</div>

				<div class="col-md-6 d-flex">
					<Label text="Chỉ số hiện tại:" />
					<Input placeholder="Nhập chỉ số hiện tại" v-model="search.nChiSoHienTai" />
					<base-button
						type="primary"
						native-type="submit"
						style="margin-top: 0px; margin-left: 5px"
						@click="handleSearch"
					>
						<span class="btn-inner--icon"><i class="fas fa-search"></i></span>
						<span class="btn-inner--text">&nbsp;Tìm kiếm</span>
					</base-button>
				</div>
			</div>
		</div>
		<el-card class="box-card">
			<template #header class="el-card-header">
				<div style="padding: 5px 10px" class="form-row">
					<div class="col-md-6">
						<base-button type="primary" outline native-type="submit" @click="handleAdd">
							<span class="btn-inner--icon"><i class="fas fa-plus"></i></span>
							<span class="btn-inner--text">&nbsp;Thêm đồng hồ</span>
						</base-button>
					</div>
					<div class="col-md-6">
						<div class="mc-status" v-if="optionMC == 0">
							<el-tag type="danger">Chưa khai báo phương thức quản lý </el-tag>
							<el-button
								size="mini"
								@click="showOptionMCInfo = true"
								class="ml-2"
								type="primary"
								circle
								><Icon icon="clarity:help-info-solid"
							/></el-button>
							<modal :show.sync="showOptionMCInfo">
								<h6>Đồng hồ tổng</h6>
								<fieldset>
									<i
										><strong style="color: red">Đồng hồ tổng</strong> có thể quản lý các
										<strong style="color: green">đồng hồ nước</strong> theo tuyến hoặc chọn cụ thể
										nhiều <strong style="color: green">đồng hồ</strong>. Sau mỗi kì,
										<strong style="color: red">đồng hồ tổng</strong> sẽ được ghi nhận chỉ số riêng
										được coi như lượng nước cung cấp và so sánh với tổng lượng nước trên các
										<strong style="color: green">đồng hồ</strong> mà nó quản lý để tính toán lượng
										nước thất thoát.
									</i>
								</fieldset>
							</modal>
							<el-button
								@click="openChooseOptionMC = true"
								class="ml-2"
								plain
								type="primary"
								size="mini"
							>
								<span><Icon icon="iconoir:one-finger-select-hand-gesture"></Icon></span>
								Chọn phương thức quản lý</el-button
							>
							<modal class="modal-change-price" :show.sync="openChooseOptionMC">
								<h6>Chọn phương thức quản lý</h6>
								<fieldset class="p-2">
									<div class="choosePriceObject">
										<div class="change-item mt-3 mb-3">
											<span class="mr-3">Chọn phương thức quản lý cho đồng hồ tổng:</span>
											<el-select
												class="select-price"
												placeholder="Chọn đối tượng giá"
												v-model="chooseOptionMC"
											>
												<el-option
													value="0"
													label="Chọn quản phương thức quản lý"
													disabled
												></el-option>
												<el-option value="1" label="Quản lý theo tuyến"></el-option>
												<el-option value="2" label="Quản lý theo đồng hồ"></el-option>
											</el-select>
										</div>
									</div>
								</fieldset>
								<el-button
									type="danger"
									size="mini"
									class="mt-3 float-right"
									@click="openChooseOptionMC = false"
								>
									Thoát
								</el-button>
								<el-button
									type="warning"
									size="mini"
									class="mt-3 mr-2 float-right"
									@click="changeOptionMC"
								>
									Xác nhận
								</el-button>
							</modal>
						</div>
						<div class="mc-status-success" v-if="optionMC == 1">
						<el-tag type="success">Quản lý đồng hồ tổng theo tuyến</el-tag>
						</div>
						<div class="mc-status-success" v-if="optionMC == 2">
						<el-tag type="success">
							Quản lý đồng hồ tổng theo đồng hồ
						</el-tag>
						</div>
					</div>
				</div>

				<div class="col-md-12 tbl">
					<el-table
						:data="tableData.content"
						fit
						header-row-class-name="thead-light"
						height="100%"
						:border="true"
						stripe
					>
						<el-table-column label="Số Serial" prop="c_serial"> </el-table-column>
						<el-table-column label="Chỉ số đầu" prop="n_chi_so_dau"> </el-table-column>
						<el-table-column label="Chỉ số hiện tại" prop="n_chi_so_hien_tai"> </el-table-column>

						<el-table-column label="Số đồng hồ quản lý" prop="n_so_dong_ho_con"> </el-table-column>
						<el-table-column
							label="Trạng thái"
							prop="nTinhTrang"
							header-align="center"
							align="center"
						>
							<template slot-scope="scope">
								<el-tag type="warning" v-if="scope.row.n_tinh_trang == 1">Chưa sử dụng</el-tag>
								<el-tag type="success" v-if="scope.row.n_tinh_trang == 2">Đang sử dụng</el-tag>
								<el-tag type="danger" v-if="scope.row.n_tinh_trang == 0">Đã xóa</el-tag>
							</template>
						</el-table-column>

						<el-table-column width="220" align="center">
							<template slot-scope="scope">
								<div class="row-btn">
									<el-button
									type="warning"
									size="mini"
									:disabled="scope.row.n_tinh_trang == 0"
									@click="handleEdit(scope.$index, scope.row)"
								>
									<i class="el-icon-edit mr-1"></i>
									Sửa
								</el-button>
								<el-button
									type="danger"
									size="mini"
									:disabled="scope.row.n_tinh_trang == 0"
									@click="deleteBatch(scope.$index, scope.row)"
								>
									<i class="el-icon-delete mr-1"></i>
									Xóa
								</el-button>
								</div>
								<div class="row-btn">
									<el-button
									type="success"
									size="mini"
									:disabled="scope.row.n_tinh_trang == 0"
									@click="handleopenSetupMC(scope.$index, scope.row)"
								>
								<i class="fas fa-cog"></i>
									Cài đặt
								</el-button>
								<el-button
									type="primary"
									size="mini"
									:disabled="scope.row.n_tinh_trang == 0"
									@click="deleteBatch(scope.$index, scope.row)"
								>
								<i class="fas fa-info"></i>
									Xem
								</el-button>
								</div>
							</template>
						</el-table-column>
					</el-table>
				</div>
				<div class="col-12 py-2 pagination" style="justify-content: end">
					<el-pagination
						:page-sizes="[5, 10, 20, 30, 50]"
						background
						layout="total,sizes,  prev, pager, next"
						:page-size="10"
						:current-page.sync="tableData.pageNum"
						@current-change="handleCurrentPageChange"
						@size-change="handleSizeChange"
						:total="tableData.totalSize"
					>
					</el-pagination>
				</div>
			</template>
		</el-card>
		<modal :show.sync="dialogForm">
			<h6 slot="header" class="modal-title" v-if="!operation">Thêm đồng hồ</h6>
			<h6 slot="header" class="modal-title" v-if="operation">Cập nhật thông tin đồng hồ</h6>
			<el-form :model="dataForm" label-width="150px" ref="dataForm" size="mini">
				<el-form-item
					label="Số serial"
					prop="cSerial"
					:rules="[{ required: true, message: 'Bạn chưa nhập số serial' }]"
				>
					<el-input v-model="dataForm.cSerial"></el-input>
				</el-form-item>
				<el-form-item
					label="Chỉ số đầu"
					prop="nChiSoDau"
					:rules="[{ required: true, message: 'Bạn chưa nhập chỉ số đầu' }]"
				>
					<el-input v-model="dataForm.nChiSoDau"></el-input>
				</el-form-item>
				<el-form-item
					label="Chỉ số hiện tại"
					prop="nChiSoHienTai"
					:rules="[{ required: true, message: 'Bạn chưa nhập chỉ số hiện tại' }]"
				>
					<el-input v-model="dataForm.nChiSoHienTai"></el-input>
				</el-form-item>
				<el-form-item label="Chọn loại đồng hồ " prop="nMaLoaiDongHo">
					<el-select placeholder="Chọn loại đồng hồ" v-model="dataForm.nMaLoaiDongHo">
						<el-option
							v-for="item in clockType"
							:key="item.id"
							:label="item.cTenLoai"
							:value="item.nMaLoai"
						></el-option>
					</el-select>
				</el-form-item>
			</el-form>
			<template slot="footer">
				<base-button v-if="!operation" type="primary" @click="save">Thêm</base-button>
				<base-button v-if="operation" type="primary" @click="update">Lưu</base-button>
				<base-button outline type="danger" @click="close">Thoát</base-button>
			</template>
		</modal>
		<modal :show.sync="openSetupMC">
			<h6 slot="header" class="modal-title">Cài đặt đồng hồ tổng</h6>
			<fieldset>
				<legend v-if="optionMC==1">Chọn tuyến cài đặt</legend>
					<div class="setup-mc mb-3" v-if="optionMC==1">
						<div class="">
							<label class="mr-3" for="">Chọn tuyến:</label>
						<el-select v-model="setupForm.setupRoute"
						placeholder="Chọn tuyến cài đặt">
							<el-option v-for="item in dataRoute" :value="item.nMaTuyen"
							:label="item.cTenTuyen"
							></el-option>
						</el-select>
						</div>
					</div>
				<legend v-if="optionMC==2">Thêm đồng hồ con </legend>
				<div class="setup-mc mb-3" v-if="optionMC==2">
						<div class="">
							<label class="mr-3" for="">Chọn đồng hồ:</label>
						<el-select v-model="setupForm.setupRoute"
						placeholder="Chọn đồng hồ con cần quản lý">
							<el-option v-for="item in dataClock" :value="item.nMaDongHo"
							:label="item.cSerial"
							></el-option>
						</el-select>
						</div>
					</div>
			</fieldset>
			<fieldset class="mc-info">
				<legend>Cài đặt thông tin đồng hồ tổng</legend>
				<div class="mc-info-body">
					<div class="row mb-3">
						<div class="col-md-6">
							<label class="mr-3" for="">Chỉ số hiện tại:</label>
						<el-input type="text"  v-model="setupForm.nChiSoHienTai"></el-input>
						</div>
						<div class="col-md-6">
							<label class="mr-3" for="">Ghi chú:</label>
						<el-input type="text"  v-model="setupForm.c"></el-input>
						</div>
					</div>
					<div class="row mb-3">
						<div class="col-md-6">
							<label class="mr-5" for="">Kinh độ:</label>
						<el-input type="text"  v-model="setupForm.fKinhdo"></el-input>
						</div>
						<div class="col-md-6">
							<label class="mr-4" for="">Vĩ độ:</label>
						<el-input type="text"  v-model="setupForm.fViDo"></el-input>
						</div>
					</div>
				</div>
			</fieldset>
			<template slot="footer">
				<base-button
          type="primary"
					@click="handleSetupMC"
          >Xác nhận</base-button
        >
				<base-button
          type="danger"
					@click="openSetupMC=false"
          >Hủy</base-button
        >
			</template>
		</modal>
	</div>
</template>
<script>
import Label from '../components/Label.vue';
import Input from '../components/Input.vue';
import DropdownList from '../components/DropdownList.vue';
import { Icon } from '@iconify/vue2';
export default {
	components: {
		Label,
		Input,
		DropdownList,
		Icon,
	},
	data() {
		return {
			openSetupMC: false,
			openChooseOptionMC: false,
			chooseOptionMC: '0',
			showOptionMCInfo: false,
			tableData: [],
			optionMC: 0,
			clockType: [],
			pageRequest: { pageNum: 1, pageSize: 10 },
			dialogForm: false,
			operation: false,
			search: {
				cSerial: '',
				nChiSoHienTai: '',
				nChiSoDau: '',
				nMaLoaiDongHo: '',
			},
			dataForm: {
				cSerial: '',
				nMaLoaiDongHo: '',
				nChiSoDau: '',
				nChiSoHienTai: '',
				nTinhTrang: '',
				nMaLoaiDongHo: '',
			},
			currentMC: null,
			dataRoute: null,
			dataClock: [],
			setupForm: {
				setupRoute: null,
				setupClock: null,
				fKinhdo: null,
				fViDo: null,
				cGhiChu: '',
				nChiSoHienTai: null,
			}
		};
	},
	methods: {
		handleSetupMC(){
			const pageRequest = {
				columnFilters: {
					setupClock: {value: this.setupForm.setupClock},
					setupRoute: {value: this.setupForm.setupRoute},
					fKinhdo: {value: this.setupForm.fKinhdo},
					fViDo: {value: this.setupForm.fViDo},
					cGhiChu: {value: this.setupForm.cGhiChu},
					nChiSoHienTai: {value: this.setupForm.nChiSoHienTai},
					optionMC: {value: this.optionMC},
					nMaDongHoTong: {value: this.currentMC.n_ma_dong_ho_tong}
				}
			}
			this.$api.clock.setupMC(pageRequest).then((res) => {
				this.openSetupMC = false;
				if(res.code == 200) this.$message({message: res.msg, type: 'success'});
				else this.$message({message: res.msg, type: 'error'});
			}).catch((err) => {
				
			});
		},
		handleAdd() {
			this.$refs['dataForm'].resetFields();
			this.dialogForm = true;
			this.operation = false;
		},
		handleEdit(index, item) {
			this.dialogForm = true;
			this.operation = true;
			const ni = {
				cSerial: item.c_serial,
				nMaLoaiDongHo: item.n_ma_loai_dong_ho,
				nChiSoDau: item.n_chi_so_dau,
				nChiSoHienTai: item.n_chi_so_hien_tai,
				nMaDongHo: item.n_ma_dong_ho_tong,
			};
			this.dataForm = Object.assign({}, ni);
		},
		handleopenSetupMC(index,item){
			this.currentMC = item;
			if(this.optionMC==1)
				this.$api.route.findAll({}).then((res) => {
					this.dataRoute = res.data;
				}).catch((err) => {
					
				});
			else
				this.$api.clock.findAll({}).then((res) => {
					this.dataClock = res.data;
				}).catch((err) => {
					
				});
			this.openSetupMC = true;

		},
		handleSearch() {
			this.findPage();
		},

		close() {
			this.$refs['dataForm'].resetFields();
			this.dialogForm = false;
		},

		findPage(pageNum, pageSize) {
			if (typeof pageNum == 'number') this.pageRequest.pageNum = pageNum;
			else this.pageRequest.pageNum = 1;

			if (typeof pageSize == 'number') this.pageRequest.pageSize = pageSize;
			else this.pageRequest.pageSize = 10;

			(this.pageRequest.columnFilters = {
				cSerial: { value: this.search.cSerial },
				nTinhTrang: { value: '-1' },
			}),
				this.$api.clock.findMotherClock(this.pageRequest).then((res) => {
					if (res.code == 200) {
						this.tableData = res.data;
					} else {
						this.$message({ message: 'Tải dữ liệu thất bại', type: 'error' });
					}
				});
		},
		save() {
			this.$refs.dataForm.validate((valid) => {
				if (valid) {
					let data = Object.assign({}, this.dataForm);
					this.$api.clock
						.insertMC(data)
						.then((res) => {
							if (res.code == 200) {
								this.$message({ message: res.msg, type: 'success' });
								this.dialogForm = false;
								this.findPage();
								this.$refs['dataForm'].resetFields();
							} else {
								this.$message({ message: res.msg, type: 'error' });
							}
						})
						.catch(() => {});
				}
			});
		},

		update() {
			this.$refs.dataForm.validate((valid) => {
				if (valid) {
					let data = Object.assign({}, this.dataForm);
					this.$api.clock.updateMC(data).then((res) => {
						if (res.code == 200) {
							this.$message({ message: res.msg, type: 'success' });
							this.dialogForm = false;
							this.findPage();
						} else {
							this.$message({ message: res.msg, type: 'error' });
						}
					});
				}
			});
		},
		deleteBatch(index, item) {
			this.$confirm('Bạn có muốn xóa đồng hồ này không?', 'Xác nhận', {
				confirmButtonText: 'Xác nhận',
				cancelButtonText: 'Hủy',
				type: 'warning',
			})
				.then(() => {
					let params = item.n_ma_dong_ho_tong;
					this.$api.clock.deleteMC(params).then((res) => {
						if (res.code == 200) {
							this.$message({ message: res.msg, type: 'success' });
							this.findPage();
						} else {
							this.$message({ message: res.msg, type: 'error' });
						}
					});
				})
				.catch(() => {
					this.$message({
						type: 'info',
						message: 'Hủy xóa',
					});
				});
		},

		getclockType() {
			let data = {};
			this.$api.clocktype.findAll(data).then((res) => {
				if (res.code == 200) {
					this.clockType = res.data;
				}
			});
		},

		handleCurrentPageChange(val) {
			this.findPage(val, this.dataForm.pageSize);
		},
		handleSizeChange(val) {
			this.findPage(this.pageRequest.pageNum, val);
		},
		getOptionMC() {
			this.$api.company
				.findOptionMC()
				.then((res) => {
					if (res.code == 200) this.optionMC = res.data;
				})
				.catch((err) => {});
		},
		changeOptionMC(){
			const id = parseInt(this.chooseOptionMC);
			this.$api.company.chooseOptionMC(id).then((res) => {
				if(res.code == 200)
					this.$message({message:"Chọn phương thức thành công", type: "success"})
					this.optionMC = res.data;
			}).catch((err) => {
				
			});
			this.openChooseOptionMC = false;
		}
	},
	mounted() {
		this.findPage();
		this.getclockType();
		this.getOptionMC();
	},
};
</script>
<style scoped>
.mc-info-body{
	display: flex;
	flex-direction: column;
	/* justify-content: center; */
	align-items: center;
}
.mc-info-body .col-md-6{
	display: flex;
	align-items: center;
	justify-content: center;
}
.mc-info-body div{
	width: 100%;
}
.mc-info .el-input{
	width: 200px;
}
.setup-mc{
	display: flex;
	justify-content: center;
	align-items: center;
}
.mc-status-success{
	position: relative;
	left: 50%;
}
fieldset {
	border: 1px solid rgb(223, 215, 215) !important;
	font-size: 13px !important;
}

legend {
  width: auto !important;
  font-size: 13px !important;
  margin-left: 32px !important;
}
.el-card-header {
	padding: 10px;
}

.box-card {
	margin: 10px;
}
.tbl {
	height: calc(100vh - 275px);
}
.row-btn{
	display: flex;
	flex-direction: row;
	justify-content: space-around;
	margin-bottom: 5px;
}
.row-btn button{
	width: 40%;
}
</style>
