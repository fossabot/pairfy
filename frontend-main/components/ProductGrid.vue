<template>
  <div class="ProductGrid">

    <div class="ProductGrid-body">
      <div class="title flex">
        <span>{{ title }}</span>
        <div class="icon flex">

        </div>
      </div>

      <div class="grid">
        <ProductCard v-for="item, index in content" :key="index" :data="item" />
      </div>
    </div>

  </div>
</template>

<script setup>
defineProps(['title'])
  
const content = ref([{
  id: "Asdas",
  name: `Acer Aspire 3 A315-24P-R7VH Slim Laptop | 15.6" Full HD IPS Display | AMD Ryzen 3 7320U Quad-Core Processor | AMD Radeon Graphics | 8GB LPDDR5 | 128GB NVMe SSD | Wi-Fi 6 | Windows 11 Home in S Model`,
  image: "https://m.media-amazon.com/images/I/41ico-u74tL._MCnd_AC_.jpg",
  price: 1000,
  discount: true,
  discount_percent: 100,
  discount_value: 34
},
{
  id: "Asdas",
  name: `Acer Aspire 3 A315-24P-R7VH Slim Laptop | 15.6" Full HD IPS Display | AMD Ryzen 3 7320U Quad-Core Processor | AMD Radeon Graphics | 8GB LPDDR5 | 128GB NVMe SSD | Wi-Fi 6 | Windows 11 Home in S Model`,
  image: "https://m.media-amazon.com/images/I/61gKkYQn6lL._AC_UY218_.jpg",
  price: 2323,
  discount: true,
  discount_percent: 100,
  discount_value: 15
},
{
  id: "Asdas",
  name: `Acer Aspire 3 A315-24P-R7VH Slim Laptop | 15.6" Full HD IPS Display | AMD Ryzen 3 7320U Quad-Core Processor | AMD Radeon Graphics | 8GB LPDDR5 | 128GB NVMe SSD | Wi-Fi 6 | Windows 11 Home in S Model`,
  image: "https://m.media-amazon.com/images/I/61gKkYQn6lL._AC_UY218_.jpg",
  price: 2323,
  discount: true,
  discount_percent: 100,
  discount_value: 19
},
{
  id: "Asdas",
  name: `Acer Aspire 3 A315-24P-R7VH Slim Laptop | 15.6" Full HD IPS Display | AMD Ryzen 3 7320U Quad-Core Processor | AMD Radeon Graphics | 8GB LPDDR5 | 128GB NVMe SSD | Wi-Fi 6 | Windows 11 Home in S Model`,
  image: "https://m.media-amazon.com/images/I/61gKkYQn6lL._AC_UY218_.jpg",
  price: 2323,
  discount: true,
  discount_percent: 100,
  discount_value: 20
},
{
  id: "Asdas",
  name: `Acer Aspire 3 A315-24P-R7VH Slim Laptop | 15.6" Full HD IPS Display | AMD Ryzen 3 7320U Quad-Core Processor | AMD Radeon Graphics | 8GB LPDDR5 | 128GB NVMe SSD | Wi-Fi 6 | Windows 11 Home in S Model`,
  image: "https://m.media-amazon.com/images/I/61gKkYQn6lL._AC_UY218_.jpg",
  price: 2323,
  discount: true,
  discount_percent: 100,
  discount_value: 50
},
{
  id: "Asdas",
  name: `Acer Aspire 3 A315-24P-R7VH Slim Laptop | 15.6" Full HD IPS Display | AMD Ryzen 3 7320U Quad-Core Processor | AMD Radeon Graphics | 8GB LPDDR5 | 128GB NVMe SSD | Wi-Fi 6 | Windows 11 Home in S Model`,
  image: "https://m.media-amazon.com/images/I/61gKkYQn6lL._AC_UY218_.jpg",
  price: 2323,
  discount: true,
  discount_percent: 100,
  discount_value: 18
},
{
  id: "Asdas",
  name: `Acer Aspire 3 A315-24P-R7VH Slim Laptop | 15.6" Full HD IPS Display | AMD Ryzen 3 7320U Quad-Core Processor | AMD Radeon Graphics | 8GB LPDDR5 | 128GB NVMe SSD | Wi-Fi 6 | Windows 11 Home in S Model`,
  image: "https://m.media-amazon.com/images/I/61gKkYQn6lL._AC_UY218_.jpg",
  price: 2323,
  discount: true,
  discount_percent: 100,
  discount_value: 65
}, {
  id: "Asdas",
  name: `Acer Aspire 3 A315-24P-R7VH Slim Laptop | 15.6" Full HD IPS Display | AMD Ryzen 3 7320U Quad-Core Processor | AMD Radeon Graphics | 8GB LPDDR5 | 128GB NVMe SSD | Wi-Fi 6 | Windows 11 Home in S Model`,
  image: "https://m.media-amazon.com/images/I/61gKkYQn6lL._AC_UY218_.jpg",
  price: 2323,
  discount: true,
  discount_percent: 100,
  discount_value: 23
}, {
  id: "Asdas",
  name: `Acer Aspire 3 A315-24P-R7VH Slim Laptop | 15.6" Full HD IPS Display | AMD Ryzen 3 7320U Quad-Core Processor | AMD Radeon Graphics | 8GB LPDDR5 | 128GB NVMe SSD | Wi-Fi 6 | Windows 11 Home in S Model`,
  image: "https://m.media-amazon.com/images/I/61gKkYQn6lL._AC_UY218_.jpg",
  price: 2323,
  discount: true,
  discount_percent: 100,
  discount_value: 33
}, {
  id: "Asdas",
  name: `Acer Aspire 3 A315-24P-R7VH Slim Laptop | 15.6" Full HD IPS Display | AMD Ryzen 3 7320U Quad-Core Processor | AMD Radeon Graphics | 8GB LPDDR5 | 128GB NVMe SSD | Wi-Fi 6 | Windows 11 Home in S Model`,
  image: "https://m.media-amazon.com/images/I/61gKkYQn6lL._AC_UY218_.jpg",
  price: 2323,
  discount: true,
  discount_percent: 100,
  discount_value: 78
},

{
  id: "Asdas",
  name: `Acer Aspire 3 A315-24P-R7VH Slim Laptop | 15.6" Full HD IPS Display | AMD Ryzen 3 7320U Quad-Core Processor | AMD Radeon Graphics | 8GB LPDDR5 | 128GB NVMe SSD | Wi-Fi 6 | Windows 11 Home in S Model`,
  image: "https://m.media-amazon.com/images/I/61gKkYQn6lL._AC_UY218_.jpg",
  price: 2323,
  discount: true,
  discount_percent: 100,
  discount_value: 90
},

{
  id: "Asdas",
  name: `Acer Aspire 3 A315-24P-R7VH Slim Laptop | 15.6" Full HD IPS Display | AMD Ryzen 3 7320U Quad-Core Processor | AMD Radeon Graphics | 8GB LPDDR5 | 128GB NVMe SSD | Wi-Fi 6 | Windows 11 Home in S Model`,
  image: "https://m.media-amazon.com/images/I/61gKkYQn6lL._AC_UY218_.jpg",
  price: 2323,
  discount: true,
  discount_percent: 100,
  discount_value: 166
},

{
  id: "Asdas",
  name: `Acer Aspire 3 A315-24P-R7VH Slim Laptop | 15.6" Full HD IPS Display | AMD Ryzen 3 7320U Quad-Core Processor | AMD Radeon Graphics | 8GB LPDDR5 | 128GB NVMe SSD | Wi-Fi 6 | Windows 11 Home in S Model`,
  image: "https://m.media-amazon.com/images/I/61gKkYQn6lL._AC_UY218_.jpg",
  price: 2323,
  discount: true,
  discount_percent: 100,
  discount_value: 23
},

{
  id: "Asdas",
  name: `Acer Aspire 3 A315-24P-R7VH Slim Laptop | 15.6" Full HD IPS Display | AMD Ryzen 3 7320U Quad-Core Processor | AMD Radeon Graphics | 8GB LPDDR5 | 128GB NVMe SSD | Wi-Fi 6 | Windows 11 Home in S Model`,
  image: "https://m.media-amazon.com/images/I/61gKkYQn6lL._AC_UY218_.jpg",
  price: 2323,
  discount: true,
  discount_percent: 100,
  discount_value: 55
}

])

</script>

<style lang="css" scoped>
.ProductGrid {
  display: flex;
  width: inherit;
  justify-content: center;
}

.ProductGrid-body {
  display: flex;
  flex-direction: column;
  box-sizing: border-box;
  max-width: var(--body-a);
  border-radius: var(--radius-a);
  background: var(--background-a);

}

.title {
  width: inherit;
  font-weight: 700;
  text-align: start;
  font-size: var(--text-size-5);
}

.grid {
  grid-template-columns: repeat(auto-fill, minmax(250px, 1fr));
  justify-content: center;
  max-width: inherit;
  display: grid;
  gap: 1rem;
}

.icon {
  justify-content: center;
  align-items: center;
  border-radius: 50%;
  display: flex;
  width: 3rem;
}

.icon img {
  width: 2rem;
}


@media (max-width: 480px) {
  .ProductGrid-body {
    padding: 0 0.5rem;
  }

  .title {
    font-size: var(--text-size-3);
    margin: 1rem 0;
  }

  .grid {
    grid-template-columns: 1fr 1fr;
    gap: 0.5rem;
    row-gap: 1rem;
  }
}

/* Large phones and small tablets (481px - 767px) */
@media (min-width: 481px) and (max-width: 767px) {
  /* Styles for larger phones */
}

/* Tablets (768px - 1024px) */
@media (min-width: 768px) and (max-width: 1024px) {
  /* Styles for tablets */
}

/* Laptops and small desktops (1025px - 1440px) */
@media (min-width: 1025px) and (max-width: 1440px) {
  /* Styles for laptops */
}

/* Large desktops (1441px and up) */
@media (min-width: 1441px) {
  /* Styles for large screens */
}
</style>