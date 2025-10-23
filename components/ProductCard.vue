<template>
  <div
    class="card h-100 product-card"
    @click="handleClick"
    :class="{ 'opacity-75': product.status !== 'available' }"
  >
    <div class="position-relative">
      <img :src="product.image" :alt="product.name" class="card-img-top" style="height: 200px; object-fit: cover;" />
      <span v-if="product.status !== 'available'" class="position-absolute top-0 end-0 m-2 badge bg-danger">
        Hết hàng
      </span>
    </div>

    <div class="card-body d-flex flex-column">
      <h5 class="card-title">{{ product.name }}</h5>
      <p class="card-text fs-4 fw-bold text-primary mb-2">${{ formatPrice(product.price) }}</p>
      <p class="card-text text-muted mb-3">
        Tồn kho: <span :class="stockClass">{{ product.stock }}</span>
      </p>
      <button
        class="btn btn-primary mt-auto"
        @click.stop="handleViewDetails"
        :disabled="product.status !== 'available'"
      >
        Xem chi tiết
      </button>
    </div>
  </div>
</template>

<script setup lang="ts">
interface Product {
  id: number
  name: string
  price: number
  stock: number
  status: string
  image: string
}

const props = defineProps<{
  product: Product
}>()

const emit = defineEmits<{
  select: [product: Product]
  'view-details': [product: Product]
}>()

const handleClick = () => {
  emit('select', props.product)
}

const handleViewDetails = () => {
  emit('view-details', props.product)
}

const formatPrice = (price: number): string => {
  return price.toLocaleString('en-US')
}

const stockClass = computed(() => {
  if (props.product.stock === 0) return 'text-danger fw-bold'
  if (props.product.stock < 10) return 'text-warning fw-bold'
  return 'text-success fw-bold'
})
</script>

<style scoped>
.product-card {
  transition: all 0.3s ease;
  cursor: pointer;
}

.product-card:hover {
  transform: translateY(-5px);
  box-shadow: 0 8px 16px rgba(0, 0, 0, 0.15);
}

.card-img-top {
  transition: transform 0.3s ease;
}

.product-card:hover .card-img-top {
  transform: scale(1.05);
}
</style>
