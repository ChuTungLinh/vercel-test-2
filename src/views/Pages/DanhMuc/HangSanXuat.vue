<template>
	<div class="wrapper m-2">
		<div class="col-md-12 form-row pt-2">
			<div class="col-md-6 d-flex">
				<Label text="Hãng sản xuất:" />
				<Input placeholder="Nhập tên hãng sản xuất" v-model="search" />
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
		<el-card class="box-card">
			<template #header class="el-card-header">
				<div style="padding: 5px 10px" class="form-row">
					<div class="col-md-6">
						<base-button type="primary" native-type="submit" outline @click="handleAdd">
							<span class="btn-inner--icon"><i class="fas fa-plus"></i></span>
							<span class="btn-inner--text">&nbsp;Thêm hãng sản xuất</span>
						</base-button>
					</div>
				</div>				
			</template>

			<div class="col-md-12 pt-2 tbl">
					<el-table
						:data="tableData.content"
						fit
						header-row-class-name="thead-light"
						height="100%"
						:border="true"
						stripe
					>
						<el-table-column label="Mã hãng sản xuất" prop="nMaHang" header-align="center">
						</el-table-column>
						<el-table-column label="Hãng sản xuất" prop="cTenHang" header-align="center">
						</el-table-column>
						<el-table-column label="Mô tả" prop="cMoTa" header-align="center"> </el-table-column>
						<el-table-column
							label="Trạng thái"
							prop="nTinhTrang"
							header-align="center"
							align="center"
						>
							<template slot-scope="scope">
								<el-tag type="success" v-if="scope.row.nTinhTrang == 1">Hoạt động</el-tag>
								<el-tag type="danger" v-if="scope.row.nTinhTrang == 0">Đã xóa</el-tag>
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
			<h6 slot="header" class="modal-title" v-if="!operation">Thêm hãng sản xuất</h6>
			<h6 slot="header" class="modal-title" v-if="operation">Cập nhật hãng sản xuất</h6>
			<el-form :model="dataForm" label-width="150px" ref="dataForm" size="mini">
				<el-form-item
					label="Hãng sản xuất"
					prop="cTenHang"
					:rules="[{ required: true, message: 'Bạn chưa nhập tên hãng sản xuất' }]"
				>
					<el-input v-model="dataForm.cTenHang"></el-input>
				</el-form-item>
				<el-form-item label="Mô tả" prop="cMoTa">
					<el-input v-model="dataForm.cMoTa"></el-input>
				</el-form-item>
			</el-form>
			<template slot="footer">
				<base-button v-if="!operation" type="primary" @click="save">Thêm</base-button>
				<base-button v-if="operation" type="primary" @click="update">Lưu</base-button>
				<base-button outline type="danger" @click="close">Thoát</base-button>
			</template>
		</modal>
	</div>
</template>
<script>
import Label from '../components/Label.vue';
import Input from '../components/Input.vue';
export default {
	components: {
		Label,
		Input,
	},
	data() {
		return {
			tableData: [],
			pageRequest: { pageNum: 1, pageSize: 20 },
			dialogForm: false,
			search: '',
			operation: false,
			dataForm: {
				cTenHang: '',
				cMoTa: '',
				nTinhTrang: '',
			},
		};
	},
	methods: {
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
				cTenHang: { value: this.search },
			};
			this.$api.producer.findPage(this.pageRequest).then((res) => {
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
					this.$api.producer
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
					this.$api.producer.update(data).then((res) => {
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
			this.$confirm('Bạn có muốn xóa hãng sản xuất này không?', 'Xác nhận', {
				confirmButtonText: 'Xác nhận',
				cancelButtonText: 'Hủy',
				type: 'warning',
			})
				.then(() => {
					let params = item.nMaHang;
					this.$api.producer.deleteBatch(params).then((res) => {
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

		handleCurrentPageChange(val) {
			this.findPage(val, this.dataForm.pageSize);
		},
		handleSizeChange(val) {
			this.findPage(this.pageRequest.pageNum, val);
		},
	},
	mounted() {
		this.findPage();
	},
};
</script>
<style scoped>
.el-card-header {
	padding: 10px;
}
.tbl {
	height: calc(100vh - 210px);
}

.box-card {
	margin: 10px;
}
</style>
