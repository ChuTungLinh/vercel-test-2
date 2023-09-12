<template>
  <div>
    <el-button class="btn-qr" type="primary" @click="openQR" circle>
      <Icon icon="bi:qr-code-scan" />
    </el-button>
    <base-header>
      <!-- Card stats -->
      <div class="row mt-4">
        <div class="col-xl-3 col-md-6">
          <stats-card title="Tổng số đồng hồ"
                      type="gradient-info"
                      :sub-title="nTongDongHo.toString()"
                      icon="el-icon-stopwatch">
          </stats-card>
        </div>
        <div class="col-xl-3 col-md-6">
          <stats-card title="Đồng hồ mới"
                      type="gradient-orange"
                      :sub-title="nTongDongHoMoi.toString()"
                      icon="el-icon-odometer">
          </stats-card>
        </div>
        <div class="col-xl-3 col-md-6">
          <stats-card title="Doanh thu"
                      type="gradient-green"
                      :sub-title="setDoanhThu"
                      icon="el-icon-money">
          </stats-card>

        </div>
        <div class="col-xl-3 col-md-6">
          <stats-card title="Tiêu thụ"
                      type="gradient-red"
                      :sub-title="setTieuThu"
                      icon="el-icon-bottom-left">
          </stats-card>
        </div>
      </div>
    </base-header>

    <div class="container-fluid">
      <div class="row first">
        <div class="col-md-6 tbl">
          <!-- <card> -->
            <el-table :data="tableData"
              header-row-class-name="thead-light" stripe height="100%" align="center"
              :fit="true" :border="true" highlight-current-row>
              <el-table-column label="Tháng" width="65" prop="cThang">
                <template slot-scope="scope">
                  <span>{{ indexFormatting(scope.row.cThang) }}</span>
                </template>
              </el-table-column>
              <el-table-column label="Sản Lượng (m3)" prop="nSanLuong" align="center">
                <template slot-scope="scope">
                  <span>{{ scope.row.nSanLuong }}</span>
                </template>
              </el-table-column>
              <el-table-column label="Tổng Tiền (₫)" prop="nTongTien" align="center">
                <template slot-scope="scope">
                  <span>{{ currencyFormatting(scope.row.nTongTien)}}</span>
                </template>
              </el-table-column>
              <el-table-column label="Phí VAT (₫)" prop="nVat" align="center">
                <template slot-scope="scope">
                  <span>{{ currencyFormatting(scope.row.nVat) }}</span>
                </template>
              </el-table-column>
              <el-table-column label="Thành Tiền (₫)" prop="nThanhTien" align="center">
                <template slot-scope="scope">
                  <span>{{ currencyFormatting(scope.row.nThanhTien) }}</span>
                </template>
              </el-table-column>
            </el-table>
          <!-- </card> -->
        </div>
      
        <!-- Biểu đồ sản lượng -->
        <div class="col-md-6">
          <card class="card-barchart">
            <template slot="header">
              <!-- Title -->
              <h5 class="h5 mb-0">Sản lượng 6 tháng gần nhất</h5>
            </template>
            <!-- <div class="chart sl"> -->
              <bar-chart
                v-if="tableData.length == 6"
                style="position: relative; height:300px"
                :chart-data="getSanLuongChartData"
                :chart-options="barChart.chartOptions">
              </bar-chart>
            <!-- </div> -->
          </card>
        </div>
      </div>
      <!-- Biểu đồ sản lượng theo nhóm khách hàng -->
      <div class="row">
        <div class="col-md-12">
          <card>
            <template slot="header">
              <!-- Title -->
              <h5 class="h5 mb-0">Sản lượng theo nhóm khách hàng 6 tháng gần nhất</h5>
            </template>
            <!-- <div class="chart"> -->
              <bar-chart
                style="height:300px"
                :chart-data="getSanLuongChartDataByGroupCustomer" :chart-options="stackedBarChart.chartOptions">
              </bar-chart>
            <!-- </div> -->
          </card>
        </div>
      </div>
    </div>
  </div>
</template>

<script>
  import BarChart from '@/components/Charts/BarChart.vue';
  import {Icon} from '@iconify/vue2';
  import BaseHeader from '@/components/BaseHeader';
  import StatsCard from '@/components/Cards/StatsCard';

  export default {
    components: {
      StatsCard,
      Icon,
      BaseHeader,
      BarChart,
    },
    data() {
      return {
        nTongDoanhThu: 0,
        nTongDongHoMoi: 0,
        nTongDongHo: 0,
        nTongTieuThu: 0,

        tableData: [],
        top6MonthsRevenueByGroupCustomer: [],

        barChart: {
          chartData: {
            labels: ["09/2022", "08/2022", "07/2022", "06/2022", "05/2022", "04/2022"],
            datasets: [
              {
                label: 'Sản lượng',
                data: [5, 20, 10, 30, 15, 40, 20, 60, 60],
                backgroundColor: '#FF8787',
                yAxisID: 'y'
              },
              {
                label: 'Doanh thu',
                data: [6000, 34000, 12000, 40000, 15000, 54500, 26500, 86500, 86500],
                backgroundColor: '#BCE29E',
                yAxisID: 'y1'
              }
            ],
          },
          chartOptions: {
            scales: {
              y: {
                title: {
                  display: true,
                  text: "Sản lượng (m3)",
                  font: {
                    family: "Arial",
                    size: 20,
                    style: "normal",
                    lineHeight: 1.2,
                  },
                },
                display: true,
                position: "left",
                grid: {
                  display: true,
                }
              },
              y1: {
                title: {
                  display: true,
                  text: "Doanh thu (₫)",
                  font: {
                    family: "Arial",
                    size: 20,
                    style: "normal",
                    lineHeight: 1.2,
                  },
                },
                display: true,
                position: "right",
                grid: {
                  display: false,
                },
              },
            },
            responsive: true,
            maintainAspectRatio: false,
          }
        },

        stackedBarChart: {
          chartData: {
            labels: ["09/2022", "08/2022", "07/2022", "06/2022", "05/2022", "04/2022"],
            datasets: [
              {
                label: "Sinh hoạt",
                backgroundColor: '#FF8787',
                data: [50, 70, 34, 89, 56, 12],
              },
              {
                label: "Kinh doanh",
                backgroundColor: '#BCE29E',
                data: [139, 120, 300, 345, 231, 768],
              },
            ],
          },
          chartOptions: {
            scales: {
              x: {
                stacked: true,
              },
              y: {
                stacked: true,
              },
            },
            responsive: true,
            maintainAspectRatio: false,
          }
        },
      }
    },
    methods: {
      openQR(){
        this.$router.push({name: 'nhapchisoQR'});
      },
      getTop4Criteria() {
        this.$api.dashboard.top4Criteria().then((res) => {
          if (res.code == 200) {
            this.nTongDoanhThu = res.data.nTongDoanhThu
            this.nTongDongHoMoi = res.data.nTongDongHoMoi
            this.nTongDongHo = res.data.nTongDongHo
            this.nTongTieuThu = res.data.nTongTieuThu
          }
        })
      },
      async getTop6MonthsRevenue() {
        await this.$api.dashboard.top6MonthsRevenue().then((res) => {
          if (res.code == 200) {
            const data = JSON.parse(res.data)
            for (var i in data) {
              this.tableData.push(data[i])
            }
          }
        })
      },
      async getTop6MonthsRevenueByGroupCustomer() {
        await this.$api.dashboard.top6MonthsRevenueByGroupCustomer().then((res) => {
          if (res.code == 200) {
            const data = JSON.parse(res.data)
            for (var i in data) {
              this.top6MonthsRevenueByGroupCustomer.push(data[i])
            }
          }
        })
      },
      indexFormatting(value) {
        return value.substring(3)
      },
      currencyFormatting(value) {
        return value.toString().replace(/\B(?=(\d{3})+(?!\d))/g, ".");
      },
    },
    async created() {
      this.getTop4Criteria()
      await this.getTop6MonthsRevenue()
      await this.getTop6MonthsRevenueByGroupCustomer()
    },
    computed: {
      setDoanhThu() {
        const value = new Intl.NumberFormat('vi-VN', {
          style: 'currency',
          currency: 'VND' 
        }).format(this.nTongDoanhThu)
        return value
      },
      setTieuThu() {
        const value = new Intl.NumberFormat({
          style: 'unit',
          unit: 'volume-cubic-meter'
        }).format(this.nTongTieuThu)
        return value + ' (m3)'
      },
      getSanLuongChartData() {
        var nSanLuong = []
        var nDoanhThu = []
        var labels = []
        for (var i = 0; i < 6; i++) {
          nSanLuong.push(this.tableData[i].nSanLuong)
          nDoanhThu.push(this.tableData[i].nTongTien)
          labels.push(this.tableData[i].cThang.substring(3))
        }
        return {
          labels: labels,
          datasets: [
            {
              label: 'Sản lượng',
              data: nSanLuong,
              backgroundColor: '#FF8787',
              yAxisID: 'y',
            },
            {
              label: 'Doanh thu',
              data: nDoanhThu,
              backgroundColor: '#BCE29E',
              yAxisID: 'y1',
            }
          ],
        }
      },
      getSanLuongChartDataByGroupCustomer() {
        var nSanLuong = {}
        var labels = []
        for (var i = 0; i < this.top6MonthsRevenueByGroupCustomer.length; i++) {
          const temp_cDoiTuongGia = this.top6MonthsRevenueByGroupCustomer[i].cDoiTuongGia
          const temp_nSanLuong = this.top6MonthsRevenueByGroupCustomer[i].nSanLuong

          if (temp_cDoiTuongGia in nSanLuong) {
            nSanLuong[temp_cDoiTuongGia].push(temp_nSanLuong)
          } else {
            nSanLuong[temp_cDoiTuongGia] = [temp_nSanLuong]
          }

          const temp_label = this.top6MonthsRevenueByGroupCustomer[i].cThang.substring(3)
          if (!labels.includes(temp_label)) {
            labels.push(temp_label)
          }
        }
        return {
          labels: labels,
          datasets: [
            {
              label: 'Sản lượng',
              data: nSanLuong['Kinh doanh'],
              backgroundColor: '#FF8787',
            },
            {
              label: 'Doanh thu',
              data: nSanLuong['Sinh hoạt'],
              backgroundColor: '#BCE29E',
            }
          ],
        }
      }
    },
  }
</script>

<style lang="scss">
  .card-header {
    padding: 0.55rem 1.25rem;
  }

  .card-barchart {
    margin-bottom: 0px;
  }

  .row.first {
    margin-bottom: 30px;
  }
  .btn-qr{
    display: none;
    position: fixed;
    z-index: 999;
    bottom: 20px;
    right: 20px;
    padding: 20px;
    svg{
      width: 20px;
      height: 20px;
    }
  }
</style>
