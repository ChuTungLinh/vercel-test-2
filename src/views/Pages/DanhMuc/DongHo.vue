<template>
	<div class="wrapper m-2">
		<div class="col-md-12 form-row pt-2">
			<div class="col-md-6 d-flex">
				<Label text="Serial:" />
				<Input placeholder="Nhập số serial" v-model="search.cSerial" />
			</div>
			<div class="col-md-6 d-flex">
				<Label text="Loại đồng hộ:" />
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
				<div style="display: flex">
					<div style="padding: 5px 10px" class="form-row">
						<div class="col-md-12">
							<base-button type="primary" outline native-type="submit" @click="handleAdd">
								<span class="btn-inner--icon"><i class="fas fa-plus"></i></span>
								<span class="btn-inner--text">&nbsp;Thêm đồng hồ</span>
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
							<base-button
								type="success"
								outline
								native-type="submit"
								@click="downloadClockTemplate"
							>
								<span class="btn-inner--icon"><i class="fa fa-download"></i></span>
								<span class="btn-inner--text">&nbsp;Tải mẫu nhập theo danh sách</span>
							</base-button>
						</div>
					</div>
				</div>
			</template>
			<div class="col-md-12 tbl">
				<el-table
					:data="tableData.content"
					fit
					header-row-class-name="thead-light"
					height="100%"
					:border="true"
					stripe
				>
					<el-table-column label="Số Serial" prop="cSerial"> </el-table-column>
					<el-table-column label="Chỉ số đầu" prop="nChiSoDau"> </el-table-column>
					<el-table-column label="Chỉ số hiện tại" prop="nChiSoHienTai"> </el-table-column>

					<el-table-column label="Loại đồng hồ" prop="cTenLoai"> </el-table-column>
					<el-table-column
						label="Trạng thái"
						prop="nTinhTrang"
						header-align="center"
						align="center"
					>
						<template slot-scope="scope">
							<el-tag type="warning" v-if="scope.row.nTinhTrang == 1">Chưa sử dụng</el-tag>
							<el-tag type="success" v-if="scope.row.nTinhTrang == 2">Đang sử dụng</el-tag>
							<el-tag type="danger" v-if="scope.row.nTinhTrang == 0">Đã xóa</el-tag>
						</template>
					</el-table-column>
					<el-table-column label="Mã QR" align="center">
						<template slot-scope="scope">
							<el-button type="primary" size="mini" @click="getQRCode(scope.row)">
								<Icon icon="material-symbols:qr-code-scanner-rounded" />
								Xuất mã QR
							</el-button>
						</template>
					</el-table-column>

					<el-table-column width="180" align="center">
						<template slot-scope="scope">
							<el-button
								type="primary"
								size="mini"
								:disabled="scope.row.nTinhTrang == 0"
								@click="handleEdit(scope.$index, scope.row)"
							>
								<i class="el-icon-edit mr-1"></i>
								Sửa
							</el-button>
							<el-button
								type="danger"
								size="mini"
								:disabled="scope.row.nTinhTrang == 0"
								@click="deleteBatch(scope.$index, scope.row)"
							>
								<i class="el-icon-delete mr-1"></i>
								Xóa
							</el-button>
						</template>
					</el-table-column>
				</el-table>
			</div>
			<div class="col-12 py-2 pagination" style="justify-content: end">
				<el-pagination
					:page-sizes="[5, 10, 20, 30, 50]"
					background
					layout="total,sizes,  prev, pager, next"
					:page-size="20"
					:current-page.sync="tableData.pageNum"
					@current-change="handleCurrentPageChange"
					@size-change="handleSizeChange"
					:total="tableData.totalSize"
				>
				</el-pagination>
			</div>
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
		<modal :show.sync="showResult" dataBackDrop="static">
			<h6>Kết quả nhập dữ liệu</h6>
			<h6>
				Nhập thành công <span style="color: green">{{ success }}</span> đồng hồ,
				<span style="color: red">{{ fail }}</span> thất bại !
			</h6>
			<el-table
				max-height="400px"
				:data="resultTable"
				class="table-result"
				header-row-class-name="thead-light"
				:border="true"
				size="mini"
			>
				<el-table-column prop="result" label="Kết quả" />
				<el-table-column prop="serial" label="Serial" />
				<el-table-column label="Chi Tiết">
					<template #default="scope">
						<div>
							<span style="word-break: break-word">{{ scope.row.msg }}</span>
						</div>
					</template>
				</el-table-column>
			</el-table>
			<template slot="footer">
				<base-button outline type="success" @click="handleDownloadResult"><i class="fa fa-download"></i>Tải xuống</base-button>
				<base-button outline type="danger" @click="(showResult = false), (type = '')">Thoát</base-button>
			</template>
		</modal>
	</div>
</template>

<script>
import Label from '../components/Label.vue';
import Input from '../components/Input.vue';
import DropdownList from '../components/DropdownList.vue';
import { saveAs } from 'file-saver';
export default {
	components: {
		Label,
		Input,
		DropdownList,
	},
	data() {
		return {
			tableData: [],
			clockType: [],
			pageRequest: { pageNum: 1, pageSize: 20 },
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
			resultTable: [],
			showResult: false,
			success: 0,
			fail: 0,
		};
	},
	methods: {
		handlePick() {
			let input = document.createElement('input');
			input.type = 'file';
			input.accept = 'application/vnd.openxmlformats-officedocument.spreadsheetml.sheet';
			input.onchange = (_) => {
				let files = Array.from(input.files);
				//console.log(files[0].name)
				this.$confirm('Bạn có chắc muốn nhập danh sách ' + files[0].name + ' này ', 'Thông báo', {
					confirmButtonText: 'Đồng ý',
					cancelButtonText: 'Hủy bỏ',
					type: 'warning',
				}).then(() => {
					this.handleUpdateClock(files[0]);
				});
			};
			input.click();
		},
		handleUpdateClock(val) {
			const formData = new FormData();
			formData.append('file', val);
			formData.append('id', 0);
			this.$api.company.updateClockExcel(formData).then((res) => {
				if (res.code == 200) {
					this.success = 0;
					this.fail = 0;
					this.resultTable = res.data;
					for (let i = 0; i < this.resultTable.length; i++) {
						this.resultTable[i].cTenKhachHang = '';
					}
					this.showResult = true;
					res.data.forEach((item) => {
						if (item.result == 'Thành công') this.success++;
						else this.fail++;
					});
				} else {
					this.$message({ message: res.msg, type: 'error' });
				}
				this.findPage()
			});
		},
		handleDownloadResult() {
			this.$api.company
				.downloadResult(this.resultTable)
				.then((res) => {
					saveAs(new Blob([res]), 'Ket_qua_nhap.xlsx');
				})
				.catch((err) => {
					console.log(err);
				});
		},
		downloadClockTemplate() {
			this.$api.company.downloadClockTemplate({ id: this.currCompany }).then((res) => {
				if (res.status == 500) {
					this.$message({ message: 'Xảy ra lỗi khi tải file', type: 'error' });
				} else {
					try {
						const blob = new Blob([res], {
							type: 'application/vnd.openxmlformats-officedocument.spreadsheetml.sheet',
						});
						saveAs(blob, 'clock_template.xlsx');
					} catch (error) {
						this.$message({ message: 'Xảy ra lỗi khi tải file', type: 'error' });
					}
				}
			});
		},

		getQRCode(item) {
			this.$api.contract.getQRClock(item.cSerial).then((res) => {
				saveAs(new Blob([res]), `QRCode_${item.cSerial}.png`);
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
			this.dataForm = Object.assign({}, item);
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
			else this.pageRequest.pageSize = 20;

			this.pageRequest.columnFilters = {
				cSerial: { value: this.search.cSerial },
				nChiSoHienTai: { value: this.search.nChiSoHienTai },
				nChiSoDau: { value: this.search.nChiSoDau },
				nMaLoaiDongHo: { value: this.search.nMaLoaiDongHo },
			};
			this.$api.clock.findPage(this.pageRequest).then((res) => {
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
						.insert(data)
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
					this.$api.clock.update(data).then((res) => {
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
					let params = item.nMaDongHo;
					this.$api.clock.deleteBatch(params).then((res) => {
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
	},
	mounted() {
		this.findPage();
		this.getclockType();
	},
};
</script>
<style scoped>
.el-card-header {
	padding: 10px;
}

.box-card {
	margin: 10px;
}
.tbl {
	height: calc(100vh - 255px);
}
</style>
