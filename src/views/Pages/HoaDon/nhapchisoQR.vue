<template>
	<div>
		<div class="camera">
			<qrcode-stream
				class="qrCam"
				@decode="onDecode"
				v-if="!destroyed && result == ''"
				@init="onInit"
			/>
			<div class="customer-in" v-if="result != ''">
				<div>Nhập chỉ số mới</div>
				<div class="btn-insert">
					<el-input v-model="nChiSoMoi"></el-input>
					<el-button type="primary" @click="save">Nhập chỉ số</el-button>
				</div>
			</div>
			<div class="qrCam" v-if="loading">Tiến hành quét mã QR</div>
			<div class="take-shot" v-show="takeshot">
				<video ref="video" autoplay></video>
				<div><i>Chụp ảnh đồng hồ (có mã QR trong khung hình) để lưu trữ</i></div>
				<el-button class="btn-shot" type="primary" @click="shot" circle>
					<Icon icon="material-symbols:photo-camera-rounded" />
				</el-button>
			</div>
		</div>
		<el-button class="btn-scan" v-if="btnQR" type="primary" @click="stopCamera"
			>Quét mã QR</el-button
		>
		<div class="option" v-if="btnOption">
			<el-button type="primary" @click="getBill">Tính hóa đơn khách hàng này</el-button>
			<el-button type="primary" @click="getBeginState">Trở về</el-button>
		</div>
		<div class="customer-in" v-if="result != ''">
			<div>Tên khách hàng: {{ cTenKH }}</div>
			<div>Địa chỉ: {{ cDiaChi }}</div>
			<div>Chỉ số cũ: {{ nChiSoCu }}</div>
		</div>
	</div>
</template>

<script>
import { Icon } from '@iconify/vue2';
import { QrcodeStream } from 'vue-qrcode-reader';
export default {
	data() {
		return {
			error: '',
			result: '',
			destroyed: true,
			btnQR: true,
			btnOption: false,
			loading: true,
			takeshot: false,
			cTenKH: '',
			cDiaChi: '',
			nChiSoCu: 0,
			nChiSoMoi: 0,
			nMaSoChiSoDT: null,
			stream: null,
			long: 0,
			lat: 0,
		};
	},
	watch: {
		error: function (val) {
			if (val) {
				this.$message({
					message: val,
					type: 'error',
				});
			}
		},
	},
	methods: {
		getBill() {
			this.$api.record.getBill({nMaSoChiSoDt: this.nMaSoChiSoDT}).then((res) => {
				if (res.code == 200) {
					this.$message({
						message: 'Tính hóa đơn thành công',
						type: 'success',
					});
				}
			});
		},
		getBeginState() {
			this.btnOption = false;
			this.btnQR = true;
			this.result = '';
			this.cDiaChi = '';
			this.nChiSoCu = 0;
			this.nChiSoMoi = 0;
			this.nMaSoChiSoDT = null;
			this.cTenKH = '';
			this.takeshot = false;
			this.loading = true;
			this.destroyed = true;
		},
		turnOffCamera() {
			if (this.stream) {
				this.stream.getTracks().forEach((track) => track.stop());
			}
		},
		shot() {
			const video = this.$refs.video;
			const canvas = document.createElement('canvas');
			canvas.width = video.videoWidth / 2;
			canvas.height = video.videoHeight / 2;
			canvas.getContext('2d').drawImage(video, 0, 0, canvas.width, canvas.height);
			const dataURL = canvas.toDataURL('image/png',0.5);
			const byteString = atob(dataURL.split(',')[1]);
			const mimeString = dataURL.split(',')[0].split(':')[1].split(';')[0];
			const ab = new ArrayBuffer(byteString.length);
			const ia = new Uint8Array(ab);
			for (let i = 0; i < byteString.length; i++) {
				ia[i] = byteString.charCodeAt(i);
			}
			const blob = new Blob([ab], { type: mimeString });

			// create a new File object from the Blob
			const file = new File([blob], 'image.png', { type: mimeString });

			// create a new FormData object and append the file
			const formData = new FormData();
			formData.append('image', file);

			formData.append('cTenKH', this.cTenKH);
			formData.append('nChiSoCu', this.nChiSoCu);
			formData.append('nChiSoMoi', this.nChiSoMoi);
			formData.append('long', this.long);
			formData.append('lat', this.lat);
			formData.append('nMaSoChiSoDT', this.nMaSoChiSoDT);
			if (dataURL)
				this.$api.record.sendProof(formData).then((res) => {
					if (res.code == 200) {
						this.$message({
							message: 'Gửi ảnh thành công',
							type: 'success',
						});
						this.turnOffCamera();
						this.takeshot = false;
						// this.btnQR = true;
						this.btnOption = true;
						this.long = 0;
						this.lat = 0;
					}
				});
		},
		save() {
			// this.$api.record
			// 	.saveRecord({
			// 		nChiSoMoi: parseInt(this.nChiSoMoi),
			// 		nChiSoCu: this.nChiSoCu,
			// 		nMaSoChiSoDt: this.nMaSoChiSoDT,
			// 	})
		
			this.nChiSoMoi = parseInt(this.nChiSoMoi);
			this.takeshot = true;
			this.result = '';
			this.cDiaChi = '';
			this.result = '';
			this.destroyed = true;
			this.loading = false;
			this.$refs.video.setAttribute('autoplay', '');
			this.$refs.video.setAttribute('muted', '');
			this.$refs.video.setAttribute('playsinline', '');
			this.btnQR = false;
			navigator.mediaDevices
				.getUserMedia({
					video: {
						facingMode: { exact: 'environment' },
					},
				})
				.then((stream) => {
					this.stream = stream;
					this.$refs.video.srcObject = stream;
				})
				.catch((error) =>
					this.$message({
						message: 'Không thể truy cập camera',
						type: 'error',
					})
				);
				navigator.geolocation.getCurrentPosition(position => {
					this.long = position.coords.longitude;
					this.lat = position.coords.latitude;
				}, error => {
					this.$message({
						message: 'Không thể truy cập vị trí, quy trình ghi chỉ số bằng QR được đặt lại',
						type: 'error',
					})
					this.btnQR = true;
					this.turnOffCamera();
						this.takeshot = false;
						this.loading = true;
				});
		},
		onDecode(decodedText) {
			this.result = decodedText;
			// const d = JSON.parse(decodedText);
			// this.cTenKH = d.cTenKhachHang;
			// this.cDiaChi = d.cDiaChi;
			this.$api.khachhang
				.getCustomerInfo(decodedText)
				.then((res) => {
					if (!res.data) {
						this.$message({
							message: 'Đồng hồ này đang không được sử dụng',
							type: 'error',
						});
						this.getBeginState();
					}
					else{

						this.cTenKH = res.data.cTenKhachHang;
						this.cDiaChi = res.data.cDiaChi;
						this.nChiSoCu = res.data.nChiSoCu;
						this.nChiSoMoi = res.data.nChiSoMoi;
						this.nMaSoChiSoDT = res.data.nMaSoChiSoDT;
					}
				})
				.catch((err) => {
					this.$message({
						message: err.response.data.message,
						type: 'error',
					});
				});
		},
		stopCamera() {
			if (this.destroyed) {
				this.destroyed = false;
				this.result = '';
				this.loading = false;
			} else {
				this.destroyed = true;
				this.loading = true;
			}
		},
		async onInit(promise) {
			try {
				await promise;
			} catch (error) {
				if (error.name === 'NotAllowedError') {
					this.error = 'ERROR: you need to grant camera access permission';
				} else if (error.name === 'NotFoundError') {
					this.error = 'ERROR: no camera on this device';
				} else if (error.name === 'NotSupportedError') {
					this.error = 'ERROR: secure context required (HTTPS, localhost)';
				} else if (error.name === 'NotReadableError') {
					this.error = 'ERROR: is the camera already in use?';
				} else if (error.name === 'OverconstrainedError') {
					this.error = 'ERROR: installed cameras are not suitable';
				} else if (error.name === 'StreamApiNotSupportedError') {
					this.error = 'ERROR: Stream API is not supported in this browser';
				} else if (error.name === 'InsecureContextError') {
					this.error =
						'ERROR: Camera access is only permitted in secure context. Use HTTPS or localhost rather than HTTP.';
				} else {
					this.error = `ERROR: Camera error (${error.name})`;
				}
			}
		},
	},
	components: { QrcodeStream, Icon },
	mounted() {
		//
	},
};
</script>

<style lang="scss" scoped>
.option {
	display: flex;
	flex-direction: column;
	justify-content: center;
	align-items: center;
	.el-button {
		margin: 10px 0;
	}
}
.camera {
	// width: 80%;
	height: 400px;
	margin: 50px 20px 20px 20px;
	border: 1px solid #7a7b7c;
}
video {
	height: 100%;
	margin: 0;
	width: 100%;
}
.btn-scan {
	position: relative;
	left: 50%;
	transform: translateX(-50%);
}
.customer-in {
	margin: 20px 20px 20px 20px;
}
.btn-insert {
	display: flex;
	flex-direction: column;
	justify-content: center;
	align-items: center;
	height: 100px;
	div {
		flex: 1;
	}
	position: relative;
	margin-top: 200px;
	left: 50%;
	top: 50%;
	transform: translate(-50%, -50%);
}
.el-input {
	font-size: larger;
}
.btn-shot {
	svg {
		font-size: 30px;
	}
	position: relative;
	left: 50%;
	transform: translateX(-50%);
	margin-top: 20px;
}
</style>
