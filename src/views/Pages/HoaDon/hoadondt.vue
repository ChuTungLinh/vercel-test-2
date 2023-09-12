<template>
	<div class="phathanhhoadondientu">
		<div class="col-md-12 form-row pt-2">
			<div class="col-md-2 flex">
				<Label text="Tháng:" />
				<el-date-picker
					v-model="searchForm.dThang"
					class="item-date-control"
					type="month"
					@change="findBill"
					value-format="dd/MM/yyyy"
					format="MM/yyyy"
					placeholder="Chọn tháng"
				>
				</el-date-picker>
			</div>

			<div class="col-md-5 flex">
				<Label text="Tên KH:" />
				<Input
					placeholder="Nhập tên khách hàng"
					@change="findBill"
					v-model="searchForm.cTenKhachHang"
				/>
			</div>
			<div class="col-md-5 flex">
				<Label text="Mã CQT:" />
				<Input placeholder="Nhập mã cơ quan thuế" @change="findBill" />
			</div>
		</div>
		<div class="col-md-12 form-row pt-2">
			<div class="col-md-6 flex">
				<Label text="Địa chỉ:" />
				<Input
					placeholder="Nhập địa chỉ khách hàng"
					@change="findBill"
					v-model="searchForm.cDiaChi"
				/>
			</div>

			<div class="col-md-6 flex">
				<Label text="Trạng thái:" />
				<DropdownList
					placeholder="Chọn trạng thái"
					@change="findBill"
					v-model="searchForm.cTinhTrang"
				>
					<el-option label="Tất cả" value="10"></el-option>
					<el-option label="Chưa phát hành" value="0"></el-option>
					<el-option label="Chờ ký" value="1"></el-option>
					<el-option label="Chờ cấp mã" value="2"></el-option>
					<el-option label="Đã ký" value="3"></el-option>
					<el-option label="Đã gửi" value="4"></el-option>
					<el-option label="CQT đã nhận" value="5"></el-option>
					<el-option label="CQT không tiếp nhận HĐ" value="6"></el-option>
				</DropdownList>
				<base-button
					type="primary"
					native-type="submit"
					style="margin-top: 0px; margin-left: 5px"
					@click="findBill"
				>
					<span class="btn-inner--icon"><i class="fas fa-search"></i></span>
					<span class="btn-inner--text">&nbsp;Tìm kiếm</span>
				</base-button>
			</div>
		</div>

		<el-card class="box-card">
      <div class="loadingscreen" v-show="showLoading">
					<div class="flower-spinner">
						<div class="dots-container">
							<div class="bigger-dot">
								<div class="smaller-dot"></div>
							</div>
						</div>
					</div>
					<h4>Đang xử lý</h4>
				</div>
			<template #header class="el-card-header">
				<div style="padding: 5px 10px" class="form-row justify-content-center">
					<div class="col-md-6" style="text-align: start">
						<base-button
							v-if="showButtonRelease == 'single'"
							type="primary"
							outline
							native-type="submit"
							@click="handleReleaseBill"
						>
							<span class="btn-inner--icon"><i class="fas fa-file-invoice-dollar"></i></span>
							<span class="btn-inner--text">&nbsp;Phát hành hóa đơn chỉ định</span>
						</base-button>
						<base-button
							v-if="showButtonRelease == 'multiple'"
							type="primary"
							outline
							native-type="submit"
							@click="handleReleaseBill"
						>
							<span class="btn-inner--icon"><i class="el-icon-circle-plus"></i></span>
							<span class="btn-inner--text">&nbsp;Phát toàn bộ hóa đơn chỉ định</span>
						</base-button>
					</div>
					<div class="col-md-6" style="text-align: end">
						<base-button
							type="success"
							native-type="submit"
							@click="handleSync"
						>
							<span class="btn-inner--icon"><i class="fas fa-sync"></i></span>
							<span class="btn-inner--text"
								>Đồng bộ trạng thái</span
							>
						</base-button>
						<base-button
							:type="cInvoice ? 'primary' : 'danger'"
							outline
							disabled
							native-type="submit"
							@click="handleAdd"
						>
							<span class="btn-inner--icon"><i class="el-icon-circle-plus"></i></span>
							<span class="btn-inner--text" v-if="cInvoice"
								>&nbsp;Ký hiệu hóa đơn: {{ cInvoice }}</span
							>
							<span class="btn-inner--text" v-if="!cInvoice">&nbsp;Chưa đăng ký mẫu hóa đơn</span>
						</base-button>
					</div>
				</div>
			</template>

			<div class="col-md-12 tbl">
				
				<el-table
					:data="listBill.content"
					header-row-class-name="thead-light"
					:border="true"
					height="100%"
					size="mini"
					@selection-change="handleSelectionChange"
					stripe
				>
					<el-table-column type="selection" min-width="45" :selectable="canSelectRow">
					</el-table-column>

					<el-table-column label="Tên khách hàng" prop="c_ten_khach_hang" min-width="165px">
					</el-table-column>
					<el-table-column label="Mã số thuế" prop="cTenKhachHang" min-width="120px">
					</el-table-column>

					<el-table-column label="Ngày tạo" header-align="center" prop="dNgayTao" min-width="115px">
					</el-table-column>
					<el-table-column
						label="Chỉ số cũ"
						header-align="center"
						prop="n_chi_so_cu"
						align="right"
						min-width="115px"
					>
					</el-table-column>
					<el-table-column
						label="Chỉ số mới"
						header-align="center"
						prop="n_chi_so_moi"
						align="right"
						min-width="115px"
					>
					</el-table-column>
					<el-table-column
						label="Lượng tiêu dùng"
						header-align="center"
						prop="n_so_luong_tieu_thu"
						align="right"
						min-width="140px"
					>
					</el-table-column>

					<el-table-column
						label="Tổng tiền(VND)"
						header-align="center"
						prop="n_tong_tien"
						align="right"
						min-width="145px"
					>
					</el-table-column>
					<el-table-column
						label="Thuế GTGT"
						header-align="center"
						prop="n_vat"
						align="right"
						min-width="115px"
					>
					</el-table-column>

					<el-table-column
						label="Trạng Thái"
						header-align="center"
						prop="n_tinh_trang"
						min-width="140px"
						align="center"
					>
						<template slot-scope="scope">
							<el-tag type="danger" v-if="scope.row.n_tinh_trang_hddt == 0"> Chưa phát hành</el-tag>
							<el-tag type="warning" v-if="scope.row.n_tinh_trang_hddt == 1"> Chờ ký</el-tag>
							<el-tag type="warning" v-if="scope.row.n_tinh_trang_hddt == 2"> Chờ cấp mã</el-tag>
							<el-tag type="success" v-if="scope.row.n_tinh_trang_hddt == 3"> Đã ký</el-tag>
							<el-tag type="success" v-if="scope.row.n_tinh_trang_hddt == 4"> Đã gửi</el-tag>
							<el-tag type="success" v-if="scope.row.n_tinh_trang_hddt == 5"> CQT đã nhận</el-tag>
							<el-tag type="danger" v-if="scope.row.n_tinh_trang_hddt == 6">
								CQT không tiếp nhận HĐ</el-tag
							>
						</template>
					</el-table-column>

					<el-table-column min-width="240px" align="center" label="Hành động">
						<template slot-scope="scope">
							<el-button
								size="mini"
								type="success"
								@click="handleReleasebyButton(scope.$index, scope.row)"
								v-if="scope.row.n_tinh_trang_hddt == 0"
							>
								<i class="fas fa-money-bill"></i>
								Phát hành hóa đơn điện tử
							</el-button>
							<el-button
								size="mini"
								type="primary"
								outline
								@click="handleDowloadInvoice(scope.$index, scope.row)"
								v-if="scope.row.n_tinh_trang_hddt != 0"
							>
								<i class="fas fa-download"></i>
								Tải xuống hóa đơn
							</el-button>
						</template>
					</el-table-column>
				</el-table>
			</div>
			<div class="col-12 py-2 pagination" style="justify-content: end">
				<el-pagination
					@size-change="handleSizeChange"
					@current-change="handleCurrentChange"
					:current-page.sync="listBill.pageNum"
					:page-size="listBill.pageSize"
					:total="listBill.totalSize"
					:page-sizes="[5, 10, 20, 30, 40]"
					layout="total, sizes, prev, pager, next, jumper"
				>
				</el-pagination>
			</div>
		</el-card>

		<modal :show.sync="showResultModal" class="modal-phathanh">
			<h6>Thông tin phát hành hóa đơn điện tử</h6>
			<fieldset>
				<legend>Thông tin</legend>
				<el-alert title="Thành công" type="success" :closable="false" show-icon>
					Phát hành thành công {{ resultHD.success }} hóa đơn !
				</el-alert>
				<el-alert class="mt-3" title="Thất bại" type="error" :closable="false" show-icon>
					Phát hành thất bại {{ resultHD.fail }} hóa đơn !
				</el-alert>
				<div class="tbl-re">
					<el-table
						:data="listFailDetail"
						header-row-class-name="thead-light release-header"
						:border="true"
						height="100%"
						size="mini"
						stripe
					>
						<el-table-column
							label="Tên khách hàng"
							header-align="center"
							prop="c_ten_khach_hang"
							min-width="140px"
							align="center"
						>
						</el-table-column>
						<el-table-column
							label="Chỉ số cũ"
							header-align="center"
							prop="n_chi_so_cu"
							min-width="140px"
							align="center"
						>
						</el-table-column>
						<el-table-column
							label="Chỉ số mới"
							header-align="center"
							prop="n_chi_so_moi"
							min-width="140px"
							align="center"
						>
						</el-table-column>
						<el-table-column
							label="Thanh toán (VNĐ)"
							header-align="center"
							prop="n_tong_tien"
							min-width="140px"
							align="center"
						>
						</el-table-column>
						<el-table-column
							label="Lỗi phát sinh"
							header-align="center"
							prop="failMsg"
							min-width="250px"
						>
						</el-table-column>
					</el-table>
				</div>
			</fieldset>
			<el-button
				type="primary"
				size="mini"
				class="mt-3 ml-2 float-right"
				@click="showResultModal = false"
			>
				Xác nhận
			</el-button>
		</modal>
	</div>
</template>
<script>
import Input from '../components/Input.vue';
import Label from '../components/Label.vue';
import { saveAs } from 'file-saver';
import { Table, Button, TableColumn, Pagination, Card, Option } from 'element-ui';
import DatePicker from '../components/DatePicker.vue';
import DropdownList from '../components/DropdownList.vue';

export default {
	components: {
		[Button.name]: Button,
		Input,
		Label,
		DropdownList,
		[Table.name]: Table,
		[TableColumn.name]: TableColumn,
		[Pagination.name]: Pagination,
		[Card.name]: Card,
		[Option.name]: Option,
	},
	data() {
		return {
			showLoading: false,
			listFailDetail: [],
			listFail: {},
			resultHD: {},
			showResultModal: false,
			billInfo: null,
			centerDialogVisible: false,
			invoiceprinting: false,
			operation: false,
			showButtonRelease: 'disable',
			listBill: [],
			pageRequest: { pageNum: 1, pageSize: 30 },
			searchForm: {
				dThang: new Date(),
				cTenKhachHang: '',
				cTinhTrang: '10',
				cDiaChi: '',
			},
			test2: [
				{
					tongtientruocthue: '12.000.000',
					thuevat: '10%',
					tongtiensauthue: '12.000.000',
					tongtienthanhtoan: '12.000.000',
					sotienbangchu: 'Mười hai triệu đồng',
				},
			],
			rows: [
				{
					cTen: '',
					cMota: '',
					nTuso: '',
					nDenso: '',
					nGiavat: '',
					nDongia: '',
				},
			],
			cInvoice: null,
		};
	},
	methods: {
		toggleLoading() {
			this.showLoading = !this.showLoading;
		},
		handleDowloadInvoice(index, item) {
			const pageRequest = {
				columnFilters: {
					nMaHoaDon: { value: item.n_ma_hoa_don_hd },
				},
			};
			this.$api.invoice.downloadHDDT(pageRequest).then((res) => {
				saveAs(
					new Blob([res]),
					'Hoa_don_tien_nuoc_' + item.n_ma_hoa_don_hd + '_' + item.d_ngay_tao.split('T')[0] + '.pdf'
				);
			});
		},
		canSelectRow(row, i) {
			if (row.n_tinh_trang_hddt == 1) return false;
			else return true;
		},
		findInvoiceSymbol() {
			this.$api.invoice.findInvoiceSymbol().then((res) => {
				if (res.code == 200 && res.msg) this.cInvoice = res.msg;
			});
		},
		handleReleaseBill() {
			this.showLoading = true;
			if (!this.cInvoice) {
				this.$message({
					showClose: true,
					message: 'Chưa đăng ký ký hiệu hóa đơn ! Không thể phát hành hóa đơn',
					type: 'error',
				});
				this.showLoading = false;
			} else {
				let s = '';
				this.billInfo.forEach((i) => {
					s += `,${i.n_ma_hoa_don_hd}`;
				});
				s = s.substring(1);
				const pageRequest = {
					columnFilters: {
						nMaHoaDon: { value: s },
					},
				};
				// console.log(pageRequest);
				this.$api.invoice.releaseHDDT(pageRequest).then((res) => {
					// console.log(res);
					if (res.code == 200) {
						const data = res.data;
						this.resultHD = {
							success: 0,
							fail: 0,
						};
						this.listFail = {
							nMaHoaDon: [],
							msg: [],
						};
						data.forEach((i) => {
							if (!i.success) {
								this.resultHD.fail++;
								this.listFail.nMaHoaDon.push(i.nMaHoaDon);
								this.listFail.msg.push(i.msg);
							} else this.resultHD.success++;
						});
						if (this.resultHD.success == data.length) {
							this.$message({
								message: `Phát hành thành công ${data.length} hóa đơn`,
								type: 'success',
							});
							this.showLoading = false;
						} else {
							this.listFailDetail = [];
							this.listBill.content.forEach((i) => {
								const index = this.listFail.nMaHoaDon.indexOf(i.n_ma_hoa_don_hd);
								if (index >= 0) {
									const r = {
										...i,
										failMsg: this.listFail.msg[index],
									};
									this.listFailDetail.push(r);
								}
							});
							this.showLoading = false;
							this.showResultModal = true;
							// console.log(this.listFailDetail);
						}
						this.findBill();
					} else {
						this.$message({ message: res.msg, type: 'error' });
						this.showLoading = false;
					}
				});
			}
			// console.log(pageRequest);
		},
		handleSizeChange(val) {
			this.findBill(this.pageRequest.pageNum, val);
		},
		handleCurrentChange(val) {
			this.findBill(val, this.pageRequest.pageSize);
		},
    handleSync(){
      this.showLoading = true;
      this.$api.invoice.syncEBill(this.pageRequest).then((res) => {
				if (res.code == 200) {
					this.$message({message: `Cập nhật thành công ! Trạng thái ${res.data} hóa đơn thay đổi`, type: 'success'});
          this.findBill(this.pageRequest.pageNum,this.pageRequest.pageSize);
          this.showLoading = false;
			}});
    },
		findBill(pageNum, pageSize) {
      this.showLoading = true;
			if (typeof pageNum == 'number') this.pageRequest.pageNum = pageNum;
			else this.pageRequest.pageNum = 1;

			if (typeof pageSize == 'number') this.pageRequest.pageSize = pageSize;
			else this.pageRequest.pageSize = 30;
			if (typeof this.searchForm.dThang === 'object')
				this.searchForm.dThang = `01/${
					this.searchForm.dThang.getMonth() + 1
				}/${this.searchForm.dThang.getFullYear()}`;
			this.pageRequest.columnFilters = {
				cTenKhachHang: { value: this.searchForm.cTenKhachHang },
				dThang: { value: this.searchForm.dThang },
				cTinhTrang: { value: this.searchForm.cTinhTrang },
			};
			// console.log(this.pageRequest);
			this.$api.invoice.findEBill(this.pageRequest).then((res) => {
				if (res.code == 200 && res.data) {
					this.listBill = res.data;
					// console.log(this.listBill);
					this.listBill.content.forEach(
						(i) => (i.n_tong_tien = i.n_tong_tien.toString().replace(/\B(?=(\d{3})+(?!\d))/g, ','))
					);
				} else this.listBill = {};
        this.showLoading = false;
			});
		},

		handleSelectionChange: function (val) {
			// this.multipleSelection = val;
			this.billInfo = val;
			if (val.length > 1) this.showButtonRelease = 'multiple';
			else if (val.length == 1) {
				this.showButtonRelease = 'single';
			} else {
				this.showButtonRelease = 'disable';
			}
		},
		handleAdd() {
			this.operation = true;
			this.centerDialogVisible = true;
		},
		handleEdit(index, item) {
			(this.operation = false),
				(this.centerDialogVisible = true),
				(this.sizeForm = Object.assign({}, item));
			this.showdongho = Array(item);
		},
		handleView(index, item) {
			this.invoiceprinting = true;
		},
		handleReleasebyButton(index, item) {
			this.billInfo = [item];
			// console.log(this.billInfo);
			this.handleReleaseBill();
		},
		closeForm1() {
			this.invoiceprinting = false;
		},
		closeForm() {
			this.centerDialogVisible = false;
		},
	},
	mounted() {
		this.findBill();
		this.findInvoiceSymbol();
	},
};
</script>

<style>
.release-header th {
	background-color: #28527a !important;
	color: #fff !important;
}
.modal-phathanh div:nth-child(1) {
	/* max-height: 60vh; */
	height: fit-content;
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
@import '../../../../src/assets/css/nucleo/css/phathanhhoadondientu.css';
</style>

<style scoped>
.flower-spinner,
.flower-spinner * {
	box-sizing: border-box;
}

.flower-spinner {
	height: 70px;
	width: 70px;
	display: flex;
	flex-direction: row;
	align-items: center;
	justify-content: center;
}

.flower-spinner .dots-container {
	height: calc(70px / 7);
	width: calc(70px / 7);
}

.flower-spinner .smaller-dot {
	background: #28527a;
	height: 100%;
	width: 100%;
	border-radius: 50%;
	animation: flower-spinner-smaller-dot-animation 2.5s 0s infinite both;
}

.flower-spinner .bigger-dot {
	background: #28527a;
	height: 100%;
	width: 100%;
	padding: 10%;
	border-radius: 50%;
	animation: flower-spinner-bigger-dot-animation 2.5s 0s infinite both;
}

@keyframes flower-spinner-bigger-dot-animation {
	0%,
	100% {
		box-shadow: rgb(40, 82, 122) 0px 0px 0px, rgb(40, 82, 122) 0px 0px 0px,
			rgb(40, 82, 122) 0px 0px 0px, rgb(40, 82, 122) 0px 0px 0px, rgb(40, 82, 122) 0px 0px 0px,
			rgb(40, 82, 122) 0px 0px 0px, rgb(40, 82, 122) 0px 0px 0px, rgb(40, 82, 122) 0px 0px 0px;
	}

	50% {
		transform: rotate(180deg);
	}

	25%,
	75% {
		box-shadow: rgb(40, 82, 122) 26px 0px 0px, rgb(40, 82, 122) -26px 0px 0px,
			rgb(40, 82, 122) 0px 26px 0px, rgb(40, 82, 122) 0px -26px 0px, rgb(40, 82, 122) 19px -19px 0px,
			rgb(40, 82, 122) 19px 19px 0px, rgb(40, 82, 122) -19px -19px 0px,
			rgb(40, 82, 122) -19px 19px 0px;
	}

	100% {
		transform: rotate(360deg);
		box-shadow: rgb(40, 82, 122) 0px 0px 0px, rgb(40, 82, 122) 0px 0px 0px,
			rgb(40, 82, 122) 0px 0px 0px, rgb(40, 82, 122) 0px 0px 0px, rgb(40, 82, 122) 0px 0px 0px,
			rgb(40, 82, 122) 0px 0px 0px, rgb(40, 82, 122) 0px 0px 0px, rgb(40, 82, 122) 0px 0px 0px;
	}
}

@keyframes flower-spinner-smaller-dot-animation {
	0%,
	100% {
		box-shadow: rgb(40, 82, 122) 0px 0px 0px, rgb(40, 82, 122) 0px 0px 0px,
			rgb(40, 82, 122) 0px 0px 0px, rgb(40, 82, 122) 0px 0px 0px, rgb(40, 82, 122) 0px 0px 0px,
			rgb(40, 82, 122) 0px 0px 0px, rgb(40, 82, 122) 0px 0px 0px, rgb(40, 82, 122) 0px 0px 0px;
	}

	25%,
	75% {
		box-shadow: rgb(40, 82, 122) 14px 0px 0px, rgb(40, 82, 122) -14px 0px 0px,
			rgb(40, 82, 122) 0px 14px 0px, rgb(40, 82, 122) 0px -14px 0px, rgb(40, 82, 122) 10px -10px 0px,
			rgb(40, 82, 122) 10px 10px 0px, rgb(40, 82, 122) -10px -10px 0px,
			rgb(40, 82, 122) -10px 10px 0px;
	}

	100% {
		box-shadow: rgb(40, 82, 122) 0px 0px 0px, rgb(40, 82, 122) 0px 0px 0px,
			rgb(40, 82, 122) 0px 0px 0px, rgb(40, 82, 122) 0px 0px 0px, rgb(40, 82, 122) 0px 0px 0px,
			rgb(40, 82, 122) 0px 0px 0px, rgb(40, 82, 122) 0px 0px 0px, rgb(40, 82, 122) 0px 0px 0px;
	}
}
.loadingscreen {
	position: absolute;
	width: 100%;
	height: 100vh;
	top: 0;
	left: 0;
	right: 0;
	bottom: 0;
	display: flex;
	justify-content: center;
	align-items: center;
	flex-direction: column;
	background-color: rgba(0, 0, 0, 0.2);
	z-index: 2;
	cursor: pointer;
}
.loadingscreen i {
	font-size: 50px;
}
fieldset {
	border-radius: 5px;
}
.flex {
	display: flex;
}

.box-card {
	margin: 10px;
}

.card-header {
	padding: 0px;
}
.release-header th {
	background-color: #28527a !important;
}
.tbl-re {
	height: calc(100vh - 350px);
}
.tbl {
	height: calc(100vh - 245px);
	/* height: 100vh; */
}
</style>
