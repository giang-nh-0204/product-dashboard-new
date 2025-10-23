<template>
  <div class="container-fluid py-4">
    <div class="text-center mb-5 p-5 bg-gradient rounded-3" style="background: linear-gradient(135deg, #667eea 0%, #764ba2 100%);">
      <h1 class="display-3 fw-bold text-white mb-2">Product Dashboard</h1>
      <p class="lead text-white-50">Quản lý và theo dõi sản phẩm của bạn</p>
    </div>

    <div v-if="selectedProduct" class="alert alert-primary d-flex align-items-center justify-content-between mb-4">
      <div>
        <strong>Đã chọn:</strong> <span class="fs-5">{{ selectedProduct.name }}</span>
      </div>
      <button @click="clearSelection" class="btn btn-sm btn-light">✕</button>
    </div>

    <div class="mb-5">
      <h2 class="h3 fw-bold mb-4">Tổng quan doanh số</h2>
      <div class="row g-4">
        <div class="col-12 col-sm-6 col-lg-3">
          <div class="card border-start border-success border-4 h-100 shadow-sm">
            <div class="card-body">
              <div class="d-flex align-items-center">
                <div class="fs-1 me-3">📦</div>
                <div class="flex-grow-1">
                  <p class="text-muted text-uppercase small mb-1 fw-semibold">Sản phẩm có sẵn</p>
                  <h3 class="h2 fw-bold mb-0">{{ availableProductsCount }}</h3>
                  <p class="text-muted small mb-0">trên tổng {{ products.length }} sản phẩm</p>
                </div>
              </div>
            </div>
          </div>
        </div>

        <div class="col-12 col-sm-6 col-lg-3">
          <div class="card border-start border-primary border-4 h-100 shadow-sm">
            <div class="card-body">
              <div class="d-flex align-items-center">
                <div class="fs-1 me-3">💰</div>
                <div class="flex-grow-1">
                  <p class="text-muted text-uppercase small mb-1 fw-semibold">Tổng giá trị</p>
                  <h3 class="h2 fw-bold mb-0">${{ formatPrice(totalAvailablePrice) }}</h3>
                  <p class="text-muted small mb-0">giá trị sản phẩm available</p>
                </div>
              </div>
            </div>
          </div>
        </div>

        <div class="col-12 col-sm-6 col-lg-3">
          <div class="card border-start border-warning border-4 h-100 shadow-sm">
            <div class="card-body">
              <div class="d-flex align-items-center">
                <div class="fs-1 me-3">📊</div>
                <div class="flex-grow-1">
                  <p class="text-muted text-uppercase small mb-1 fw-semibold">Giá trung bình</p>
                  <h3 class="h2 fw-bold mb-0">${{ formatPrice(averagePrice) }}</h3>
                  <p class="text-muted small mb-0">của sản phẩm có sẵn</p>
                </div>
              </div>
            </div>
          </div>
        </div>

        <div class="col-12 col-sm-6 col-lg-3">
          <div class="card border-start border-info border-4 h-100 shadow-sm">
            <div class="card-body">
              <div class="d-flex align-items-center">
                <div class="fs-1 me-3">📈</div>
                <div class="flex-grow-1">
                  <p class="text-muted text-uppercase small mb-1 fw-semibold">Tổng tồn kho</p>
                  <h3 class="h2 fw-bold mb-0">{{ totalStock }}</h3>
                  <p class="text-muted small mb-0">đơn vị trong kho</p>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>

    <div class="mb-4">
      <h2 class="h3 fw-bold mb-4">Danh sách sản phẩm</h2>

      <div v-if="loading" class="text-center py-5">
        <div class="spinner-border text-primary" role="status">
          <span class="visually-hidden">Loading...</span>
        </div>
        <p class="mt-3">Đang tải sản phẩm...</p>
      </div>

      <div v-else-if="error" class="alert alert-warning">
        ❌ Lỗi: {{ error }}
      </div>

      <div v-else class="row row-cols-1 row-cols-md-2 row-cols-lg-3 row-cols-xl-4 g-4">
        <div v-for="product in products" :key="product.id" class="col">
          <ProductCard
            :product="product"
            @select="handleSelectProduct"
            @view-details="handleViewDetails"
          />
        </div>
      </div>
    </div>

    <div v-if="showModal" class="modal fade show d-block" tabindex="-1" @click="closeModal">
      <div class="modal-dialog modal-dialog-centered modal-lg" @click.stop>
        <div class="modal-content">
          <div class="modal-header">
            <h5 class="modal-title fw-bold">Chi tiết sản phẩm</h5>
            <button type="button" class="btn-close" @click="closeModal"></button>
          </div>
          <div v-if="modalProduct" class="modal-body">
            <img :src="modalProduct.image" :alt="modalProduct.name" class="img-fluid rounded mb-3" />
            <h2 class="h3 mb-4">{{ modalProduct.name }}</h2>

            <div class="table-responsive">
              <table class="table">
                <tbody>
                  <tr>
                    <td class="fw-semibold">Mã sản phẩm:</td>
                    <td>#{{ modalProduct.id }}</td>
                  </tr>
                  <tr>
                    <td class="fw-semibold">Giá:</td>
                    <td class="text-primary fs-5 fw-bold">${{ formatPrice(modalProduct.price) }}</td>
                  </tr>
                  <tr>
                    <td class="fw-semibold">Tồn kho:</td>
                    <td>{{ modalProduct.stock }} đơn vị</td>
                  </tr>
                  <tr>
                    <td class="fw-semibold">Trạng thái:</td>
                    <td>
                      <span
                        class="badge"
                        :class="modalProduct.status === 'available' ? 'bg-success' : 'bg-danger'"
                      >
                        {{ modalProduct.status === 'available' ? 'Còn hàng' : 'Hết hàng' }}
                      </span>
                    </td>
                  </tr>
                </tbody>
              </table>
            </div>
          </div>
          <div class="modal-footer">
            <button type="button" class="btn btn-primary" @click="closeModal">Đóng</button>
          </div>
        </div>
      </div>
    </div>
    <div v-if="showModal" class="modal-backdrop fade show"></div>
  </div>
</template>

<script setup lang="ts">
import productsData from '~/data/products.json'

interface Product {
  id: number
  name: string
  price: number
  stock: number
  status: string
  image: string
}

const products = ref<Product[]>([])
const selectedProduct = ref<Product | null>(null)
const loading = ref(true)
const error = ref<string | null>(null)
const showModal = ref(false)
const modalProduct = ref<Product | null>(null)

const availableProductsCount = computed(() => {
  return products.value.filter(product => product.status === 'available').length
})

const totalAvailablePrice = computed(() => {
  return products.value
    .filter(product => product.status === 'available')
    .reduce((sum, product) => sum + product.price, 0)
})

const averagePrice = computed(() => {
  if (availableProductsCount.value === 0) return 0
  return totalAvailablePrice.value / availableProductsCount.value
})

const totalStock = computed(() => {
  return products.value.reduce((sum, product) => sum + product.stock, 0)
})

const handleSelectProduct = (product: Product) => {
  selectedProduct.value = product
}

const handleViewDetails = (product: Product) => {
  modalProduct.value = product
  showModal.value = true
}

const closeModal = () => {
  showModal.value = false
  setTimeout(() => {
    modalProduct.value = null
  }, 300)
}

const clearSelection = () => {
  selectedProduct.value = null
}

const formatPrice = (price: number): string => {
  return price.toLocaleString('en-US', {
    minimumFractionDigits: 0,
    maximumFractionDigits: 0
  })
}

onMounted(() => {
  try {
    setTimeout(() => {
      products.value = productsData as Product[]
      loading.value = false
    }, 500)
  } catch (e) {
    error.value = 'Không thể tải dữ liệu sản phẩm'
    loading.value = false
  }
})
</script>

<style scoped>
.modal.show {
  background-color: rgba(0, 0, 0, 0.5);
}
</style>
