<template>
	<div class="wrapper m-2">
		<div class="form-row col-md-12 pt-2">
			<div class="d-flex col-md-6">
				<Label text="Tháng:" />
				<DatePicker v-model="search.month" />
			</div>
			<div class="d-flex col-md-6">
				<Label text="Cán bộ đọc:" />
				<DropdownList
					placeholder="Chọn cán bộ đọc"
					v-model="search.nMaNhanVien"
					@onChange="getRouteByName"
				>
					<el-option label="Tất cả " value="0" key="0"></el-option>
					<el-option
						v-for="i in employeeList"
						:key="i.id"
						:value="String(i.nMaNhanVien)"
						:label="i.cTenNhanVien"
					></el-option>
				</DropdownList>
			</div>
		</div>
		<div class="form-row col-md-12 pt-2">
			<div class="d-flex col-md-6">
				<Label text="Tuyến đọc:" />
				<DropdownList placeholder="Chọn tuyến đọc" v-model="search.nMaTuyenDoc">
					<el-option label="Tất cả " value="0" key="0"></el-option>
					<el-option
						v-for="i in routeList"
						:key="i.nMaTuyen"
						:value="String(i.nMaTuyen)"
						:label="i.cTenTuyen"
					></el-option>
				</DropdownList>
			</div>

			<div class="d-flex col-md-6">
				<Label text="Tình trạng:" />
				<DropdownList placeholder="Tình trạng" v-model="search.nTinhTrang">
					<el-option value="10" label="Tất cả"></el-option>
					<el-option value="0" label="Chưa thanh toán"></el-option>
					<el-option value="1" label="Đã thanh toán"></el-option>
				</DropdownList>

				<base-button
					type="primary"
					native-type="submit"
					style="margin-top: 0px; margin-left: 5px"
					:loading="isSearchLoading"
					@click="handleSearch"
				>
					<span class="btn-inner--icon"><i class="fas fa-search"></i></span>
					<span class="btn-inner--text">&nbsp;Tìm kiếm</span>
				</base-button>
			</div>
		</div>

		<el-card class="box-card">
			<template #header class="el-card-header">
				<!-- <el-row class="card-header"> -->
				<div style="padding: 5px 10px" class="form-row">
					<div class="col-md-6" style="text-align: start">
						<base-button
							:disabled="showButtonRelease == 'disable'"
							type="primary"
							outline
							native-type="submit"
							@click="handleReleaseBill"
						>
							<span class="btn-inner--icon"><i class="fas fa-file-invoice-dollar"></i></span>
							<span class="btn-inner--text">&nbsp;Xuất hóa đơn chỉ định (.PDF)</span>
						</base-button>
						<base-button
							:disabled="showButtonRelease == 'disable'"
							type="primary"
							outline
							native-type="submit"
							@click="handlePrintBill"
						>
							<span class="btn-inner--icon"><Icon icon="ps:printer" /> </span>
							<span class="btn-inner--text">&nbsp;In hóa đơn chỉ định</span>
						</base-button>
						<!-- <base-button
							v-if="showButtonRelease == 'multiple'"
							type="primary"
							outline
							native-type="submit"
							@click="handleReleaseBill"
						>
							<span class="btn-inner--icon"><i class="el-icon-circle-plus"></i></span>
							<span class="btn-inner--text">&nbsp;Xuất toàn bộ hóa đơn chỉ định (.PDF)</span>
						</base-button>
						<base-button
							v-if="showButtonRelease == 'multiple'"
							type="primary"
							outline
							native-type="submit"
							@click="handlePrintBill"
						>
							<span class="btn-inner--icon"><Icon icon="ps:printer" /></span>
							<span class="btn-inner--text">&nbsp;In toàn bộ hóa đơn chỉ định</span>
						</base-button> -->
					</div>
					<div class="col-md-6" style="text-align: end">
						<base-button
							v-if="!Taxcode"
							type="danger"
							outline
							native-type="submit"
							@click="openAddTaxCode = true"
						>
							<span class="btn-inner--icon"><i class="fas fa-file-invoice-dollar"></i></span>
							<span class="btn-inner--text">Khai báo mã số thuế</span>
						</base-button>
						<base-button v-else type="primary" outline native-type="submit" disabled>
							<span class="btn-inner--text">Mã số thuế doanh nghiệp: </span>
							{{ Taxcode }}
						</base-button>
					</div>
				</div>
				<!-- </el-row> -->
			</template>
			<div class="col-md-12 tbl">
				<el-table
					:data="tableData.content"
					header-row-class-name="thead-light"
					size="mini"
					stripe
					height="100%"
					:border="true"
					highlight-current-row
					@selection-change="handleSelectionChange"
				>
					<el-table-column type="selection" min-width="45" />
					<el-table-column label="Tên khách hàng" prop="cTenKhachHang" width="150">
					</el-table-column>

					<el-table-column label="Địa chỉ" prop="cDiaChi" width="250"></el-table-column>
					<el-table-column label="Cán bộ đọc" prop="cTenNhanVien" width="150"> </el-table-column>

					<el-table-column label="Tuyến đọc" prop="cTenTuyen" width="150"> </el-table-column>

					<el-table-column label="Tháng" prop="dThang">
						<template slot-scope="scope">
							{{ moment(scope.row.dThang).format('MM/YYYY') }}
						</template>
					</el-table-column>

					<el-table-column
						label="Chỉ số cũ"
						prop="nChiSoCu"
						width="100"
						align="right"
					></el-table-column>

					<el-table-column
						label="Chỉ số mới"
						prop="nChiSoMoi"
						width="100"
						align="right"
					></el-table-column>

					<el-table-column label="Số tiêu thụ" prop="nSoLuongTieuThu" width="150" align="right">
					</el-table-column>

					<el-table-column label="VAT" prop="nVat" width="100" align="right"></el-table-column>

					<el-table-column label="Thành tiền" prop="nThanhTien" width="100" align="right">
						<template slot-scope="scope">
							<span>{{ convertToMoney(scope.row.nThanhTien) }}</span>
						</template>
					</el-table-column>

					<el-table-column label="Tổng tiền" prop="nTongTien" width="100" align="right">
						<template slot-scope="scope">
							<span>{{ convertToMoney(scope.row.nTongTien) }}</span>
						</template>
					</el-table-column>

					<el-table-column prop="nTinhTrang" label="Trạng thái" width="130" align="center">
						<template slot-scope="scope">
							<el-tag type="warning" v-if="scope.row.nTinhTrang == 1">Đã thu tiền</el-tag>
							<el-tag type="success" v-if="scope.row.nTinhTrang == 2">Đã nộp tiền</el-tag>
							<el-tag type="danger" v-if="scope.row.nTinhTrang == 0">Chưa thanh toán</el-tag>
						</template>
					</el-table-column>

					<el-table-column width="80" fixed="right" align="center">
						<template slot-scope="scope">
							<el-popover
								placement="left"
								width="250"
								trigger="click"
								popper-class="page-popover"
								:ref="'popover' + scope.$index"
							>
								<table v-show="!openChangPriceObject">
									<tr>
										<td>
											<el-button
												type="text"
												icon="el-icon-download mr-1"
												@click="downDocx(scope.$index, scope.row)"
												>Xuất hóa đơn</el-button
											>
										</td>
									</tr>
									<tr>
										<td>
											<el-button
												type="text"
												icon="el-icon-printer mr-1"
												@click="printBillByRow(scope.$index, scope.row)"
												>In hóa đơn</el-button
											>
										</td>
									</tr>
									<tr>
										<td>
											<el-button
												type="text"
												icon="el-icon-edit mr-1"
												:disabled="scope.row.nTinhTrang != 0 || scope.row.nTinhTrangHddt != 0"
												@click="updateRecordNum(scope.$index, scope.row)"
												>Cập nhật chỉ số nước</el-button
											>
										</td>
									</tr>									
									<tr>
										<td>
											<el-button
												type="text"
												icon="el-icon-money mr-1"
												:disabled="scope.row.nTinhTrang != 0 || scope.row.nTinhTrangHddt != 0"
												@click="openChangePriceObject(scope.$index, scope.row)"
												>Thay đổi đối tượng giá</el-button>
										</td>
									</tr>
									<tr>
										<td>
											<el-button
												type="text"
												icon="el-icon-info mr-1"
												@click="showBillDetail(scope.$index, scope.row)"
												>Chi tiết hóa đơn</el-button
											>
										</td>
									</tr>
								</table>
								<el-button size="mini" slot="reference" outline title="" icon="fas fa-cog">
								</el-button>
							</el-popover>
						</template>
					</el-table-column>
				</el-table>
			</div>
			<div class="col-12 py-2 pagination" style="justify-content: space-between">
				<div
					style="
						width: 70%;
						display: flex;
						align-items: center;
						justify-content: flex-start;
						margin-left: 10px;
					"
				>
					<div id="info1" class="info" style="background-color: #0065cd; color: white">
						<span id="label1"></span><span id="label2"></span><span id="label3"></span>
						<div
							style="
								background-color: white;
								padding: 0px 10px 0px 10px;
								margin-left: 10px;
								border-radius: 5px;
								color: #0065cd;
							"
						>
							{{ convertToMoney(CSAmount) }}
						</div>
					</div>
					<div id="info2" class="info" style="background-color: green; color: white">
						<span id="label1"></span>
						<div
							style="
								background-color: white;
								padding: 0px 10px 0px 10px;
								margin-left: 10px;
								border-radius: 5px;
								color: green;
							"
						>
							{{ convertToMoney(CSTotal) }} đ
						</div>
					</div>
				</div>
				<el-pagination
					:page-sizes="[5, 10, 20, 30, 50]"
					background
					layout="total,sizes,  prev, pager, next"
					:current-page.sync="tableData.pageNum"
					@current-change="handleCurrentPageChange"
					@size-change="handleSizeChange"
					:total="tableData.totalSize"
					:page-size="pageRequest.pageSize"
				>
				</el-pagination>
			</div>
		</el-card>

		<el-drawer
			title="Cập nhật chỉ số nước khách hàng"
			:visible.sync="drawer"
			:direction="direction"
		>
			<div class="col-md-12 pt-2">
				<table>
					<tr>
						<td style="width: 130px"><Label text="Họ tên khách hàng:" /></td>
						<td><Label :text="selectedRow.cTenKhachHang" /></td>
					</tr>
					<tr>
						<td><Label text="Địa chỉ:" /></td>
						<td><Label :text="selectedRow.cDiaChi" /></td>
					</tr>
					<tr>
						<td><Label text="Cán bộ đọc chỉ số:" /></td>
						<td><Label :text="selectedRow.cTenNhanVien" /></td>
					</tr>
					<tr>
						<td><Label text="Tháng:" /></td>
						<td><Label :text="moment(selectedRow.dThang).format('MM/YYYY')" /></td>
					</tr>
					<tr>
						<td><Label text="Chỉ số cũ:" /></td>
						<td><Label :text="selectedRow.nChiSoCu" /></td>
					</tr>
					<tr>
						<td><Label text="Chỉ số mới:" /></td>
						<td>
							<el-input
								size="small"
								type="number"
								v-model="selectedRow.nChiSoMoi"
								style="width: 50%"
							></el-input>
						</td>
					</tr>
					<tr>
						<td></td>
						<td>
							<Label
								text="(*) Việc cập nhật chỉ số mới sẽ làm thay đổi số tiền hóa đơn thanh toán."
								style="font-style: italic"
							/>
						</td>
					</tr>
					<tr>
						<td></td>
						<td style="padding-top: 20px">
							<el-button type="primary" size="mini" @click="handleEdit"
								><i class="el-icon-edit mr-1"></i>Cập nhật</el-button
							>
						</td>
					</tr>
				</table>
			</div>
		</el-drawer>
		<modal class="modal-change-price" :show.sync="openChangPriceObject">
			<h6 slot="header" class="modal-title">Thay đổi đối tượng giá</h6>
			<fieldset class="p-2">
				<div class="choosePriceObject">
					<div class="change-item mt-3 mb-3">
						<el-select
							class="select-price"
							placeholder="Chọn đối tượng giá"
							v-model="changePrice.nMaDoiTuong.value"
						>
							<el-option
								v-for="i in priceObject"
								:key="i.nMaDoiTuong"
								:value="i.nMaDoiTuong"
								:label="i.cTenDoiTuong"
							></el-option>
						</el-select>
					</div>
				</div>
				<div class="warning">
					<h6 class="warn-header">Lưu ý !</h6>
					<i class="p-1">
						Việc thay đổi đối tượng giá sẽ làm thay đổi toàn bộ tiền nước của hóa đơn. Việc thay đổi
						đối tượng giá cho khách hàng này chỉ có tác dụng trong kỳ hiện tại. Vui lòng kiểm tra kỹ
						trước khi thay đổi đối tượng giá.
						<span class="previewBill" @click="previewcurrentBill"><u>Xem hóa đơn hiện tại</u></span>
					</i>
				</div>
			</fieldset>
			<!-- <el-button
				type="danger" size="mini" class="mt-3 float-right"
				@click="openChangPriceObject = false"
			>
				Thoát
			</el-button>
			<el-button
				type="warning" size="mini" class="mt-3 mr-2 float-right" @click="changePriceObject"
			>
				Thay đổi
			</el-button> -->

			<template slot="footer">
				<base-button type="primary" @click="changePriceObject">Thay đổi</base-button>
				<base-button outline type="danger" @click="openChangPriceObject = false">Thoát</base-button>
			</template>

		</modal>

		<modal :show.sync="openAddTaxCode">
			<h6>Khai báo mã số thuế cho doanh nghiệp</h6>
			<Label text="Mã số thuế" />
			<el-input
				v-model="Taxcode"
				placeholder="Nhập mã số thuế"
				style="width: 100%"
				size="mini"
			></el-input>
			<template slot="footer">
				<base-button type="primary" @click="saveTaxCode">Thêm</base-button>
				<base-button outline type="danger" @click="openAddTaxCode = false">Thoát</base-button>
			</template>
		</modal>
		<div id="preview-bill" v-if="showPreview">
			<iframe :src="previewSrc" type="application/json" width="100%" height="600px" />
			<div style="width: 100%; text-align: end;">
				<base-button class="mx-3 mt-1 mb-2" style="align-seft:right" outline type="danger" @click="showPreview = false">Đóng</base-button>
			</div>
			
		</div>
	</div>
</template>

<script>
import Input from '../components/Input.vue';
import Label from '../components/Label.vue';
import DatePicker from '../components/DatePicker.vue';
import DropdownList from '../components/DropdownList.vue';
import moment from 'moment';
import { saveAs } from 'file-saver';
import { convertToMoney } from '../../../util/stringUtils';
import { Icon } from '@iconify/vue2';
import printJS from 'print-js';

export default {
	components: {
		Label,
		DatePicker,
		DropdownList,
		Icon,
	},
	data() {
		return {
			CSTotal: 0,
			CSAmount: 0,
			previewSrc: '',
			showPreview: false,
			changePrice: {
				nMaDoiTuong: { value: '' },
			},
			currentBill: null,
			priceObject: [],
			openAddTaxCode: false,
			openChangPriceObject: false,
			isSearchLoading: false,
			tableData: [],
			employeeList: [],
			routeList: [],
			Taxcode: '',
			pageRequest: { pageNum: 1, pageSize: 30 },
			listPrint: [],
			dialogForm: false,
			search: {
				month: new Date(),
				nMaNhanVien: '0',
				nMaTuyenDoc: '0',
				nTinhTrang: '10',
			},

			formData: {
				month: new Date(),
				date: new Date(),
			},
			multipleSelection: [],
			drawer: false,
			direction: 'rtl',
			selectedRow: {},
			billInfo: null,
			showButtonRelease: 'disable',
		};
	},
	watch: {
		openChangPriceObject() {
			if (!this.openChangPriceObject) this.showPreview = false;
		},
	},
	methods: {
		saveTaxCode() {
			if (this.Taxcode == '') {
				this.$message({ message: 'Mã số thuế không được để trống', type: 'error' });
				return;
			} else {
				this.$api.company.saveTaxCode({ code: this.Taxcode }).then((res) => {
					if (res.code == 200) {
						this.$message({ message: 'Thêm mã số thuế thành công', type: 'success' });
						this.openAddTaxCode = false;
					} else {
						this.$message({ message: 'Thêm mã số thuế thất bại', type: 'error' });
					}
				});
			}
		},
		changePriceObject() {
			if (!this.changePrice.nMaDoiTuong.value)
				this.$message({ message: 'Chưa chọn đối tượng giá', type: 'error' });
			else {
				this.changePrice.nMaHoaDonHd = { value: '' };
				this.changePrice.nMaHoaDonHd.value = this.currentBill.nMaHoaDonHd;
				const pageRequest = { columnFilters: this.changePrice };
				this.$api.bill
					.changePriceObject(pageRequest)
					.then((res) => {
						if (res.code == 200) {
							this.$message({
								message: 'Cập nhật đối tượng giá thành công, hóa đơn đã thay đổi',
								type: 'success',
							});
							this.findPage();
						} else this.$message({ message: res.msg, type: 'error' });
						this.openChangPriceObject = false;
					})
					.catch((err) => {});
			}
		},
		getTaxCode() {
			this.$api.company.getTaxCode().then((res) => {
				this.Taxcode = res.msg;
			});
		},
		handleReleaseBill() {
			let s = '';
			this.billInfo.forEach((i) => {
				s += `,${i.nMaHoaDonHd}`;
			});
			s = s.substring(1);
			const pageRequest = {
				columnFilters: {
					nMaHoaDon: { value: s },
				},
			};
			this.$api.bill.dowloadPaymentPDF(pageRequest).then((res) => {
				saveAs(new Blob([res]), 'Hoa_don_tien_nuoc.pdf');
			});
			// console.log(pageRequest);
		},
		handlePrintBill() {
			let s = '';
			this.billInfo.forEach((i) => {
				s += `,${i.nMaHoaDonHd}`;
			});
			s = s.substring(1);
			const pageRequest = {
				columnFilters: {
					nMaHoaDon: { value: s },
				},
			};
			this.$api.bill.dowloadPaymentPDF(pageRequest).then((res) => {
				const blob = new Blob([res], { type: 'application/pdf' });
				const blobURL = URL.createObjectURL(blob);
				printJS({ printable: blobURL, type: 'pdf', showModal: true });
			});
			// console.log(pageRequest);
		},
		handleSearch() {
			this.findPage();
		},

		findPage(pageNum, pageSize) {
			this.isSearchLoading = true;
			if (typeof pageNum == 'number') this.pageRequest.pageNum = pageNum;
			else this.pageRequest.pageNum = 1;

			if (typeof pageSize == 'number') this.pageRequest.pageSize = pageSize;
			else this.pageRequest.pageSize = 30;

			this.pageRequest.columnFilters = {
				dThang: { value: moment(this.search.month).format('01/MM/YYYY') },
				nMaNhanVien: { value: this.search.nMaNhanVien },
				nMaTuyenDoc: { value: this.search.nMaTuyenDoc },
				nTinhTrang: { value: this.search.nTinhTrang },
			};

			this.$api.bill.findPagePrintBill(this.pageRequest).then((res) => {
				this.isSearchLoading = false;
				if (res.code == 200) {
					this.tableData = res.data;
					this.findInfo();
				}
			});
		},
		findInfo() {
			this.CSAmount = 0;
			this.CSTotal = 0;
			this.pageRequest.columnFilters = {
				dThang: { value: moment(this.search.month).format('01/MM/YYYY') },
				nMaNhanVien: { value: this.search.nMaNhanVien },
				nMaTuyenDoc: { value: this.search.nMaTuyenDoc },
				nTinhTrang: { value: this.search.nTinhTrang },
			};

			this.$api.bill
				.findPagePrintBill({ ...this.pageRequest, pageSize: 1000000, pageNum: 1 })
				.then((res) => {
					if (res.code == 200) {
						let test = res.data.content;
						for (let i = 0; i < test.length; i++) {
							this.CSAmount += test[i].nSoLuongTieuThu;
							this.CSTotal += test[i].nTongTien;
						}
					}
				});
		},

		downPDF() {
			this.pageRequest.columnFilters = {
				dThang: { value: moment(this.search.month).format('01/MM/YYYY') },
				nMaNhanVien: { value: this.search.nMaNhanVien },
				nMaTuyenDoc: { value: this.search.nMaTuyenDoc },
				nTinhTrang: { value: this.search.nTinhTrang },
			};
			this.$api.bill.billdPDF(this.pageRequest).then((response) => {
				saveAs(
					new Blob([response]),
					'Hoa_don_tien_nuoc_' + moment(this.search.month).format('MM.YYYY') + '.PDF'
				);
			});
		},

		downXlsx() {
			this.pageRequest.columnFilters = {
				dThang: { value: moment(this.search.month).format('01/MM/YYYY') },
				nMaNhanVien: { value: this.search.nMaNhanVien },
				nMaTuyenDoc: { value: this.search.nMaTuyenDoc },
				nTinhTrang: { value: this.search.nTinhTrang },
			};
			this.$api.bill.billXlsx(this.pageRequest).then((response) => {
				saveAs(
					new Blob([response]),
					'Hoa_don_tien_nuoc_' + moment(this.search.month).format('MM.YYYY') + '.xlsx'
				);
			});
		},
		openChangePriceObject(index, item) {
			this.$refs['popover' + index].doClose();
			this.openChangPriceObject = true;
			this.currentBill = item;
			this.$api.priceobject
				.findAll({})
				.then((result) => {
					this.priceObject = result.data;
				})
				.catch((err) => {
					this.$message({ message: 'Lấy đối tượng giá thất bại', type: 'error' });
				});
		},
		downDocx(index, item) {
			this.billInfo = [item];
			this.handleReleaseBill();
			this.$refs['popover' + index].doClose();
		},

		printBillByRow(index, item) {
			this.billInfo = [item];
			this.handlePrintBill();
			this.$refs['popover' + index].doClose();
		},

		updateRecordNum(index, item) {
			this.$refs['popover' + index].doClose();
			this.drawer = true;
			this.selectedRow = Object.assign({}, item);
		},

		showBillDetail(index, item) {
			this.$refs['popover' + index].doClose();
			this.currentBill = item;
			this.previewcurrentBill()
		},

		handleEdit() {
			try {
				this.$confirm('Bạn có muốn cập nhật chỉ số mới không?', 'Xác nhận', {
					confirmButtonText: 'Xác nhận',
					cancelButtonText: 'Hủy',
					type: 'warning',
				})
					.then(() => {
						const data = this.row;
						this.$api.bill.updateRecord(this.selectedRow).then((res) => {
							if (res.code == 200) {
								this.$message({ message: res.msg, type: 'success' });
								this.findPage(this.pageRequest.pageNum, this.pageRequest.pageSize);
								this.drawer = false;
							} else {
								this.$message({ message: 'Cập nhật chỉ số thất bại! ' + res.msg, type: 'error' });
							}
						});
					})
					.catch(() => {});
			} catch (ex) {
				console.log(ex);
			}
		},

		previewcurrentBill() {
			// console.log(this.currentBill);
			const body = {
				columnFilters: {
					nMaHoaDon: { value: this.currentBill.nMaHoaDonHd },
				},
			};
			if (!this.showPreview) {
				this.$api.bill.dowloadPaymentPDF(body).then((res) => {
					const blob = new Blob([res], { type: 'application/pdf' });
					const blobURL = URL.createObjectURL(blob);
					const preview = document.getElementById('preview-bill');
					this.showPreview = true;
					this.previewSrc = blobURL;
				});
			}
		},
		handleSelectionChange(val) {
			this.billInfo = val;
			if (val.length > 0) this.showButtonRelease = 'enable';
			else this.showButtonRelease = 'disable';
			// if (val.length > 1) this.showButtonRelease = 'multiple';
			// else if (val.length == 1) {
			// 	this.showButtonRelease = 'single';
			// } else {
			// 	this.showButtonRelease = 'disable';
			// }
		},

		handleCurrentPageChange: function (val) {
			this.findPage(val, this.pageRequest.pageSize);
		},

		handleSizeChange: function (val) {
			this.findPage(this.pageRequest.pageNum, val);
		},
		getEmployee() {
			const data = {};
			this.$api.employee.findAll(data).then((res) => {
				this.employeeList = res.data;
			});
		},
		getRouteByName(id) {
			this.$api.route.showById({ nMaNhanVien: id }).then((res) => {
				this.routeList = res.data;
				this.searchForm.nMaTuyenDoc = '0';
			});
		},

		convertToMoney(number) {
			return convertToMoney(number);
		},
	},

	mounted() {
		this.findPage();
		this.getEmployee();
		this.getTaxCode();
	},
};
</script>


<style lang="scss" scoped>
.info {
	display: flex;
	padding: 2px 2px 2px 10px;
	border-radius: 7px;
	font-weight: bold;
	margin-right: 10px;
}
#info1 {
	#label1::after {
		font-family: 'Font Awesome 5 Free';
		content: '\f043'+ ' Tiêu thụ (m';
	}
	#label2::after {
		content: '3';
		font-size: 0.7rem;
		position: relative;
		top: -0.3rem;
	}
	#label3::after {
		content: ')';
	}
}
/* #info1:hover{
	#label1::after{
		font-family: "Font Awesome 5 Free";
		content: "\f043" + " Tổng số nước tiêu thụ";
	}
} */
#info2 {
	#label1::after {
		font-family: 'Font Awesome 5 Free';
		content: '\f155'' Tổng tiền';
	}
}
/* #info2:hover{
	#label2::after{
		font-family: "Font Awesome 5 Free";
		content: "\f155" " Tổng tiền";
	}
} */
</style>
<style scoped>
#preview-bill {
	position: absolute;
	width: 500px;
	/* height: calc(100vh - 300px); */
	top: 0px;
	left: 0;
	left: 50%;
	margin-top: 50px;
	transform: translate(-50%, 0);
	z-index: 9999999;
	background-color: #ebeef5;
}
.previewBill {
	cursor: pointer;
}
.warn-header {
	text-align: center;
	color: red;
	font-weight: 600;
}
.choosePriceObject {
	display: flex;
	justify-content: center;
}
.select-price {
	max-width: 200px;
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
.tbl {
	height: calc(100vh - 250px);
}
.select-item {
	width: 100%;
}
.date-item {
	width: 100%;
}
.box-card {
	margin: 10px;
}

.page-popover table {
	width: 100%;
}

.page-popover table tr {
	border-bottom: 1px solid #ebeef5;
}
</style>

<style>
.modal-show .modal-dialog {
	justify-content: center;
}

.modal-show .modal-content {
	max-width: 600px;
}

.box-card {
	margin: 10px;
}

.item-date-control .el-input__inner {
	color: #000;
	border: 1px solid #b1b4b8;
	height: 1.6rem;
}

.item-date-control .el-input__icon {
	line-height: 1.6rem;
	height: 1.6rem;
}
.page-popover .el-button--text {
	/* color: #606266; */
	font-weight: normal;
}

.page-popover {
	padding: 0px 12px;
}
</style>
<style>
.modal-change-price div:nth-child(1) {
	max-width: 700px;
}
</style>


