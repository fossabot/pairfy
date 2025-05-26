<template>
    <SearchSection1 />
    <FooterComp />
</template>

<script setup>
const testResult = ref(

    [
        {
            "id": "PRD-250522-RWMS6HR",
            "thumbnail_url": "https://m.media-amazon.com/images/I/61j3uzJvVLL._AC_UY218_.jpg",
            "name": "Razer Blade 15 Gaming Laptop: NVIDIA GeForce RTX 3070-10th Gen Intel 8-Core i7 CPU - 15.6 FHD 360Hz - 16GB RAM - 1TB SSD - CNC Aluminum - Chroma RGB - THX Spatial Audio - Thunderbolt 3",
            "price": 1000,
            "sku": "RAZER16-I9-3070",
            "model": "RAZER16",
            "brand": "Razer",
            "category": "ELECTRONICS_DEVICES",
            "bullet_list": [
                "GeForce RTX 3070: NVIDIA’s 2nd gen RTX—with new RT Cores, Tensor Cores, and streaming multiprocessors to give the most realistic ray-traced graphics and improved performance",
                "More Power, More Cores: The 8-Core 10th Gen Intel Core i7-10875H processor provides the ultimate level of performance with up to 5.1GHz Max Turbo",
                "Thin and Compact: The CNC aluminum unibody frame houses incredible performance in the most compact footprint possible, while remaining remarkably durable and just 0.7\" thin",
                "Innovative Cooling: A unique vacuum sealed, liquid filled copper vapor chamber spans the heat generating components and is the key to getting maximum performance and user comfort in a compact, thin design"
            ],
            "color": "#757575",
            "condition_": "new",
            "origin": "JO",
            "city": "Los angeles",
            "postal": "341001",
            "discount": true,
            "discount_value": 75,
            "discount_percent": 10,
            "created_at": 1747953104123
        },
        {
            "id": "PRD-250522-RWMS6HR",
            "thumbnail_url": "https://m.media-amazon.com/images/I/614Jk1dIoGL._AC_UY218_.jpg",
            "name": "Razer Blade 15 Gaming Laptop: NVIDIA GeForce RTX 3070-10th Gen Intel 8-Core i7 CPU - 15.6 FHD 360Hz - 16GB RAM - 1TB SSD - CNC Aluminum - Chroma RGB - THX Spatial Audio - Thunderbolt 3",
            "price": 1000,
            "sku": "RAZER16-I9-3070",
            "model": "RAZER16",
            "brand": "Razer",
            "category": "ELECTRONICS_DEVICES",
            "bullet_list": [
                "GeForce RTX 3070: NVIDIA’s 2nd gen RTX—with new RT Cores, Tensor Cores, and streaming multiprocessors to give the most realistic ray-traced graphics and improved performance",
                "More Power, More Cores: The 8-Core 10th Gen Intel Core i7-10875H processor provides the ultimate level of performance with up to 5.1GHz Max Turbo",
                "Thin and Compact: The CNC aluminum unibody frame houses incredible performance in the most compact footprint possible, while remaining remarkably durable and just 0.7\" thin",
                "Innovative Cooling: A unique vacuum sealed, liquid filled copper vapor chamber spans the heat generating components and is the key to getting maximum performance and user comfort in a compact, thin design"
            ],
            "color": "#757575",
            "condition_": "new",
            "origin": "JO",
            "city": "Los angeles",
            "postal": "341001",
            "discount": true,
            "discount_value": 34,
            "discount_percent": 10,
            "created_at": 1747953104123
        },
        {
            "id": "PRD-250522-RWMS6HR",
            "thumbnail_url": "https://m.media-amazon.com/images/I/81-QcFPVt-L._AC_UY218_.jpg",
            "name": "Razer Blade 15 Gaming Laptop: NVIDIA GeForce RTX 3070-10th Gen Intel 8-Core i7 CPU - 15.6 FHD 360Hz - 16GB RAM - 1TB SSD - CNC Aluminum - Chroma RGB - THX Spatial Audio - Thunderbolt 3",
            "price": 1000,
            "sku": "RAZER16-I9-3070",
            "model": "RAZER16",
            "brand": "Razer",
            "category": "ELECTRONICS_DEVICES",
            "bullet_list": [
                "GeForce RTX 3070: NVIDIA’s 2nd gen RTX—with new RT Cores, Tensor Cores, and streaming multiprocessors to give the most realistic ray-traced graphics and improved performance",
                "More Power, More Cores: The 8-Core 10th Gen Intel Core i7-10875H processor provides the ultimate level of performance with up to 5.1GHz Max Turbo",
                "Thin and Compact: The CNC aluminum unibody frame houses incredible performance in the most compact footprint possible, while remaining remarkably durable and just 0.7\" thin",
                "Innovative Cooling: A unique vacuum sealed, liquid filled copper vapor chamber spans the heat generating components and is the key to getting maximum performance and user comfort in a compact, thin design"
            ],
            "color": "#757575",
            "condition_": "new",
            "origin": "JO",
            "city": "Los angeles",
            "postal": "341001",
            "discount": true,
            "discount_value": 146,
            "discount_percent": 10,
            "created_at": 1747953104123
        },
        {
            "id": "PRD-250522-RWMS6HR",
            "thumbnail_url": "https://m.media-amazon.com/images/I/61j3uzJvVLL._AC_UY218_.jpg",
            "name": "Razer Blade 15 Gaming Laptop: NVIDIA GeForce RTX 3070-10th Gen Intel 8-Core i7 CPU - 15.6 FHD 360Hz - 16GB RAM - 1TB SSD - CNC Aluminum - Chroma RGB - THX Spatial Audio - Thunderbolt 3",
            "price": 1000,
            "sku": "RAZER16-I9-3070",
            "model": "RAZER16",
            "brand": "Razer",
            "category": "ELECTRONICS_DEVICES",
            "bullet_list": [
                "GeForce RTX 3070: NVIDIA’s 2nd gen RTX—with new RT Cores, Tensor Cores, and streaming multiprocessors to give the most realistic ray-traced graphics and improved performance",
                "More Power, More Cores: The 8-Core 10th Gen Intel Core i7-10875H processor provides the ultimate level of performance with up to 5.1GHz Max Turbo",
                "Thin and Compact: The CNC aluminum unibody frame houses incredible performance in the most compact footprint possible, while remaining remarkably durable and just 0.7\" thin",
                "Innovative Cooling: A unique vacuum sealed, liquid filled copper vapor chamber spans the heat generating components and is the key to getting maximum performance and user comfort in a compact, thin design"
            ],
            "color": "#757575",
            "condition_": "new",
            "origin": "JO",
            "city": "Los angeles",
            "postal": "341001",
            "discount": true,
            "discount_value": 900,
            "discount_percent": 10,
            "created_at": 1747953104123
        },
        {
            "id": "PRD-250522-RWMS6HR",
            "thumbnail_url": "https://m.media-amazon.com/images/I/61j3uzJvVLL._AC_UY218_.jpg",
            "name": "Razer Blade 15 Gaming Laptop: NVIDIA GeForce RTX 3070-10th Gen Intel 8-Core i7 CPU - 15.6 FHD 360Hz - 16GB RAM - 1TB SSD - CNC Aluminum - Chroma RGB - THX Spatial Audio - Thunderbolt 3",
            "price": 1000,
            "sku": "RAZER16-I9-3070",
            "model": "RAZER16",
            "brand": "Razer",
            "category": "ELECTRONICS_DEVICES",
            "bullet_list": [
                "GeForce RTX 3070: NVIDIA’s 2nd gen RTX—with new RT Cores, Tensor Cores, and streaming multiprocessors to give the most realistic ray-traced graphics and improved performance",
                "More Power, More Cores: The 8-Core 10th Gen Intel Core i7-10875H processor provides the ultimate level of performance with up to 5.1GHz Max Turbo",
                "Thin and Compact: The CNC aluminum unibody frame houses incredible performance in the most compact footprint possible, while remaining remarkably durable and just 0.7\" thin",
                "Innovative Cooling: A unique vacuum sealed, liquid filled copper vapor chamber spans the heat generating components and is the key to getting maximum performance and user comfort in a compact, thin design"
            ],
            "color": "#757575",
            "condition_": "new",
            "origin": "JO",
            "city": "Los angeles",
            "postal": "341001",
            "discount": true,
            "discount_value": 900,
            "discount_percent": 10,
            "created_at": 1747953104123
        },
        {
            "id": "PRD-250522-RWMS6HR",
            "thumbnail_url": "https://m.media-amazon.com/images/I/61j3uzJvVLL._AC_UY218_.jpg",
            "name": "Razer Blade 15 Gaming Laptop: NVIDIA GeForce RTX 3070-10th Gen Intel 8-Core i7 CPU - 15.6 FHD 360Hz - 16GB RAM - 1TB SSD - CNC Aluminum - Chroma RGB - THX Spatial Audio - Thunderbolt 3",
            "price": 1000,
            "sku": "RAZER16-I9-3070",
            "model": "RAZER16",
            "brand": "Razer",
            "category": "ELECTRONICS_DEVICES",
            "bullet_list": [
                "GeForce RTX 3070: NVIDIA’s 2nd gen RTX—with new RT Cores, Tensor Cores, and streaming multiprocessors to give the most realistic ray-traced graphics and improved performance",
                "More Power, More Cores: The 8-Core 10th Gen Intel Core i7-10875H processor provides the ultimate level of performance with up to 5.1GHz Max Turbo",
                "Thin and Compact: The CNC aluminum unibody frame houses incredible performance in the most compact footprint possible, while remaining remarkably durable and just 0.7\" thin",
                "Innovative Cooling: A unique vacuum sealed, liquid filled copper vapor chamber spans the heat generating components and is the key to getting maximum performance and user comfort in a compact, thin design"
            ],
            "color": "#757575",
            "condition_": "new",
            "origin": "JO",
            "city": "Los angeles",
            "postal": "341001",
            "discount": true,
            "discount_value": 900,
            "discount_percent": 10,
            "created_at": 1747953104123
        },
        {
            "id": "PRD-250522-RWMS6HR",
            "thumbnail_url": "https://m.media-amazon.com/images/I/61j3uzJvVLL._AC_UY218_.jpg",
            "name": "Razer Blade 15 Gaming Laptop: NVIDIA GeForce RTX 3070-10th Gen Intel 8-Core i7 CPU - 15.6 FHD 360Hz - 16GB RAM - 1TB SSD - CNC Aluminum - Chroma RGB - THX Spatial Audio - Thunderbolt 3",
            "price": 1000,
            "sku": "RAZER16-I9-3070",
            "model": "RAZER16",
            "brand": "Razer",
            "category": "ELECTRONICS_DEVICES",
            "bullet_list": [
                "GeForce RTX 3070: NVIDIA’s 2nd gen RTX—with new RT Cores, Tensor Cores, and streaming multiprocessors to give the most realistic ray-traced graphics and improved performance",
                "More Power, More Cores: The 8-Core 10th Gen Intel Core i7-10875H processor provides the ultimate level of performance with up to 5.1GHz Max Turbo",
                "Thin and Compact: The CNC aluminum unibody frame houses incredible performance in the most compact footprint possible, while remaining remarkably durable and just 0.7\" thin",
                "Innovative Cooling: A unique vacuum sealed, liquid filled copper vapor chamber spans the heat generating components and is the key to getting maximum performance and user comfort in a compact, thin design"
            ],
            "color": "#757575",
            "condition_": "new",
            "origin": "JO",
            "city": "Los angeles",
            "postal": "341001",
            "discount": true,
            "discount_value": 900,
            "discount_percent": 10,
            "created_at": 1747953104123
        },
        {
            "id": "PRD-250522-RWMS6HR",
            "thumbnail_url": "https://m.media-amazon.com/images/I/61j3uzJvVLL._AC_UY218_.jpg",
            "name": "Razer Blade 15 Gaming Laptop: NVIDIA GeForce RTX 3070-10th Gen Intel 8-Core i7 CPU - 15.6 FHD 360Hz - 16GB RAM - 1TB SSD - CNC Aluminum - Chroma RGB - THX Spatial Audio - Thunderbolt 3",
            "price": 1000,
            "sku": "RAZER16-I9-3070",
            "model": "RAZER16",
            "brand": "Razer",
            "category": "ELECTRONICS_DEVICES",
            "bullet_list": [
                "GeForce RTX 3070: NVIDIA’s 2nd gen RTX—with new RT Cores, Tensor Cores, and streaming multiprocessors to give the most realistic ray-traced graphics and improved performance",
                "More Power, More Cores: The 8-Core 10th Gen Intel Core i7-10875H processor provides the ultimate level of performance with up to 5.1GHz Max Turbo",
                "Thin and Compact: The CNC aluminum unibody frame houses incredible performance in the most compact footprint possible, while remaining remarkably durable and just 0.7\" thin",
                "Innovative Cooling: A unique vacuum sealed, liquid filled copper vapor chamber spans the heat generating components and is the key to getting maximum performance and user comfort in a compact, thin design"
            ],
            "color": "#757575",
            "condition_": "new",
            "origin": "JO",
            "city": "Los angeles",
            "postal": "341001",
            "discount": true,
            "discount_value": 900,
            "discount_percent": 10,
            "created_at": 1747953104123
        },
        {
            "id": "PRD-250522-RWMS6HR",
            "thumbnail_url": "https://m.media-amazon.com/images/I/61j3uzJvVLL._AC_UY218_.jpg",
            "name": "Razer Blade 15 Gaming Laptop: NVIDIA GeForce RTX 3070-10th Gen Intel 8-Core i7 CPU - 15.6 FHD 360Hz - 16GB RAM - 1TB SSD - CNC Aluminum - Chroma RGB - THX Spatial Audio - Thunderbolt 3",
            "price": 1000,
            "sku": "RAZER16-I9-3070",
            "model": "RAZER16",
            "brand": "Razer",
            "category": "ELECTRONICS_DEVICES",
            "bullet_list": [
                "GeForce RTX 3070: NVIDIA’s 2nd gen RTX—with new RT Cores, Tensor Cores, and streaming multiprocessors to give the most realistic ray-traced graphics and improved performance",
                "More Power, More Cores: The 8-Core 10th Gen Intel Core i7-10875H processor provides the ultimate level of performance with up to 5.1GHz Max Turbo",
                "Thin and Compact: The CNC aluminum unibody frame houses incredible performance in the most compact footprint possible, while remaining remarkably durable and just 0.7\" thin",
                "Innovative Cooling: A unique vacuum sealed, liquid filled copper vapor chamber spans the heat generating components and is the key to getting maximum performance and user comfort in a compact, thin design"
            ],
            "color": "#757575",
            "condition_": "new",
            "origin": "JO",
            "city": "Los angeles",
            "postal": "341001",
            "discount": true,
            "discount_value": 900,
            "discount_percent": 10,
            "created_at": 1747953104123
        },
        {
            "id": "PRD-250522-RWMS6HR",
            "thumbnail_url": "https://m.media-amazon.com/images/I/61j3uzJvVLL._AC_UY218_.jpg",
            "name": "Razer Blade 15 Gaming Laptop: NVIDIA GeForce RTX 3070-10th Gen Intel 8-Core i7 CPU - 15.6 FHD 360Hz - 16GB RAM - 1TB SSD - CNC Aluminum - Chroma RGB - THX Spatial Audio - Thunderbolt 3",
            "price": 1000,
            "sku": "RAZER16-I9-3070",
            "model": "RAZER16",
            "brand": "Razer",
            "category": "ELECTRONICS_DEVICES",
            "bullet_list": [
                "GeForce RTX 3070: NVIDIA’s 2nd gen RTX—with new RT Cores, Tensor Cores, and streaming multiprocessors to give the most realistic ray-traced graphics and improved performance",
                "More Power, More Cores: The 8-Core 10th Gen Intel Core i7-10875H processor provides the ultimate level of performance with up to 5.1GHz Max Turbo",
                "Thin and Compact: The CNC aluminum unibody frame houses incredible performance in the most compact footprint possible, while remaining remarkably durable and just 0.7\" thin",
                "Innovative Cooling: A unique vacuum sealed, liquid filled copper vapor chamber spans the heat generating components and is the key to getting maximum performance and user comfort in a compact, thin design"
            ],
            "color": "#757575",
            "condition_": "new",
            "origin": "JO",
            "city": "Los angeles",
            "postal": "341001",
            "discount": true,
            "discount_value": 900,
            "discount_percent": 10,
            "created_at": 1747953104123
        },
        {
            "id": "PRD-250522-RWMS6HR",
            "thumbnail_url": "https://m.media-amazon.com/images/I/61j3uzJvVLL._AC_UY218_.jpg",
            "name": "Razer Blade 15 Gaming Laptop: NVIDIA GeForce RTX 3070-10th Gen Intel 8-Core i7 CPU - 15.6 FHD 360Hz - 16GB RAM - 1TB SSD - CNC Aluminum - Chroma RGB - THX Spatial Audio - Thunderbolt 3",
            "price": 1000,
            "sku": "RAZER16-I9-3070",
            "model": "RAZER16",
            "brand": "Razer",
            "category": "ELECTRONICS_DEVICES",
            "bullet_list": [
                "GeForce RTX 3070: NVIDIA’s 2nd gen RTX—with new RT Cores, Tensor Cores, and streaming multiprocessors to give the most realistic ray-traced graphics and improved performance",
                "More Power, More Cores: The 8-Core 10th Gen Intel Core i7-10875H processor provides the ultimate level of performance with up to 5.1GHz Max Turbo",
                "Thin and Compact: The CNC aluminum unibody frame houses incredible performance in the most compact footprint possible, while remaining remarkably durable and just 0.7\" thin",
                "Innovative Cooling: A unique vacuum sealed, liquid filled copper vapor chamber spans the heat generating components and is the key to getting maximum performance and user comfort in a compact, thin design"
            ],
            "color": "#757575",
            "condition_": "new",
            "origin": "JO",
            "city": "Los angeles",
            "postal": "341001",
            "discount": true,
            "discount_value": 900,
            "discount_percent": 10,
            "created_at": 1747953104123
        },
        {
            "id": "PRD-250508-F5PRQDN",
            "thumbnail_url": "https://m.media-amazon.com/images/I/614Jk1dIoGL._AC_UY218_.jpg",
            "name": "Razer Blade 15 Gaming Laptop: NVIDIA GeForce RTX 3070-10th Gen Intel 8-Core i7 CPU - 15.6 FHD 360Hz - 16GB RAM - 1TB SSD - CNC Aluminum - Chroma RGB - THX Spatial Audio - Thunderbolt 3",
            "price": 2323,
            "sku": "F3F3F3",
            "model": "XASD",
            "brand": "c123xasd",
            "category": "ELECTRONICS_DEVICES",
            "bullet_list": [
                "aaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaa"
            ],
            "color": "#000000",
            "condition_": "new",
            "origin": "AF",
            "city": "ASDXASD",
            "postal": "123123",
            "discount": true,
            "discount_value": 16,
            "discount_percent": 13,
            "created_at": 1746740128046
        },
        {
            "id": "PRD-250508-F5PRQDN",
            "thumbnail_url": "https://m.media-amazon.com/images/I/614Jk1dIoGL._AC_UY218_.jpg",
            "name": "Razer Blade 15 Gaming Laptop: NVIDIA GeForce RTX 3070-10th Gen Intel 8-Core i7 CPU - 15.6 FHD 360Hz - 16GB RAM - 1TB SSD - CNC Aluminum - Chroma RGB - THX Spatial Audio - Thunderbolt 3",
            "price": 2323,
            "sku": "F3F3F3",
            "model": "XASD",
            "brand": "c123xasd",
            "category": "ELECTRONICS_DEVICES",
            "bullet_list": [
                "aaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaa"
            ],
            "color": "#000000",
            "condition_": "new",
            "origin": "AF",
            "city": "ASDXASD",
            "postal": "123123",
            "discount": true,
            "discount_value": 17,
            "discount_percent": 13,
            "created_at": 1746740128046
        },
        {
            "id": "1AEDOD1DVXW13YYAYWEIA",
            "thumbnail_url": "https://m.media-amazon.com/images/I/81-QcFPVt-L._AC_UY218_.jpg",
            "name": "Razer Blade 15 Gaming Laptop: NVIDIA GeForce RTX 3070-10th Gen Intel 8-Core i7 CPU - 15.6 FHD 360Hz - 16GB RAM - 1TB SSD - CNC Aluminum - Chroma RGB - THX Spatial Audio - Thunderbolt 3",
            "price": 2323,
            "sku": "ASDASD",
            "model": "ASDASD",
            "brand": "ASDASD",
            "category": "ELECTRONICS_DEVICES",
            "bullet_list": [
                "AAAAAAAAAAA"
            ],
            "color": "#000000",
            "condition_": "new",
            "origin": "AI",
            "city": "CUCUTA",
            "postal": "540001",
            "discount": true,
            "discount_value": 13,
            "discount_percent": 21,
            "created_at": 1746317044263
        },
        {
            "id": "1AEDOD1DVXW13YYAYWEIA",
            "thumbnail_url": "https://m.media-amazon.com/images/I/61j3uzJvVLL._AC_UY218_.jpg",
            "name": "Razer Blade 15 Gaming Laptop: NVIDIA GeForce RTX 3070-10th Gen Intel 8-Core i7 CPU - 15.6 FHD 360Hz - 16GB RAM - 1TB SSD - CNC Aluminum - Chroma RGB - THX Spatial Audio - Thunderbolt 3",
            "price": 2323,
            "sku": "ASDASD",
            "model": "ASDASD",
            "brand": "ASDASD",
            "category": "ELECTRONICS_DEVICES",
            "bullet_list": [
                "AAAAAAAAAAA"
            ],
            "color": "#000000",
            "condition_": "new",
            "origin": "AI",
            "city": "CUCUTA",
            "postal": "540001",
            "discount": true,
            "discount_value": 6,
            "discount_percent": 21,
            "created_at": 1746317044263
        },
        {
            "id": "PRD-250509-KZ623W7",
            "thumbnail_url": "https://m.media-amazon.com/images/I/81-QcFPVt-L._AC_UY218_.jpg",
            "name": "Razer Blade 15 Gaming Laptop: NVIDIA GeForce RTX 3070-10th Gen Intel 8-Core i7 CPU - 15.6 FHD 360Hz - 16GB RAM - 1TB SSD - CNC Aluminum - Chroma RGB - THX Spatial Audio - Thunderbolt 3",
            "price": 123123,
            "sku": "SXSXSX123",
            "model": "123123",
            "brand": "123123",
            "category": "ELECTRONICS_DEVICES",
            "bullet_list": [
                "asdasd"
            ],
            "color": "#000000",
            "condition_": "new",
            "origin": "AO",
            "city": "ASDASD",
            "postal": "ASDASD",
            "discount": true,
            "discount_value": 65,
            "discount_percent": 17,
            "created_at": 1746755623660
        },
        {
            "id": "PRD-250509-KZ623W7",
            "thumbnail_url": "https://m.media-amazon.com/images/I/81-QcFPVt-L._AC_UY218_.jpg",
            "name": "Razer Blade 15 Gaming Laptop: NVIDIA GeForce RTX 3070-10th Gen Intel 8-Core i7 CPU - 15.6 FHD 360Hz - 16GB RAM - 1TB SSD - CNC Aluminum - Chroma RGB - THX Spatial Audio - Thunderbolt 3",
            "price": 123123,
            "sku": "SXSXSX123",
            "model": "123123",
            "brand": "123123",
            "category": "ELECTRONICS_DEVICES",
            "bullet_list": [
                "asdasd"
            ],
            "color": "#000000",
            "condition_": "new",
            "origin": "AO",
            "city": "ASDASD",
            "postal": "ASDASD",
            "discount": true,
            "discount_value": 47,
            "discount_percent": 17,
            "created_at": 1746755623660
        },
        {
            "id": "PRD-250513-K5GJR47",
            "thumbnail_url": "https://m.media-amazon.com/images/I/81-QcFPVt-L._AC_UY218_.jpg",
            "name": "Razer Blade 15 Gaming Laptop: NVIDIA GeForce RTX 3070-10th Gen Intel 8-Core i7 CPU - 15.6 FHD 360Hz - 16GB RAM - 1TB SSD - CNC Aluminum - Chroma RGB - THX Spatial Audio - Thunderbolt 3",
            "price": 1231,
            "sku": "AASDASD",
            "model": "QWEQWE",
            "brand": "QWEQWE",
            "category": "ELECTRONICS_DEVICES",
            "bullet_list": [
                "ASDASD"
            ],
            "color": "#000000",
            "condition_": "new",
            "origin": "AW",
            "city": "ADAS",
            "postal": "34234",
            "discount": true,
            "discount_value": 48,
            "discount_percent": 100,
            "created_at": 1747169620052
        },
        {
            "id": "PRD-250509-WVBJZVQ",
            "thumbnail_url": "https://m.media-amazon.com/images/I/81-QcFPVt-L._AC_UY218_.jpg",
            "name": "Razer Blade 15 Gaming Laptop: NVIDIA GeForce RTX 3070-10th Gen Intel 8-Core i7 CPU - 15.6 FHD 360Hz - 16GB RAM - 1TB SSD - CNC Aluminum - Chroma RGB - THX Spatial Audio - Thunderbolt 3",
            "price": 123,
            "sku": "ASDASDASD",
            "model": "ASDASDAS",
            "brand": "asdasdasd",
            "category": "ELECTRONICS_DEVICES",
            "bullet_list": [
                "asdasd"
            ],
            "color": "#000000",
            "condition_": "new",
            "origin": "AF",
            "city": "asdasd",
            "postal": "1123123",
            "discount": true,
            "discount_value": 90,
            "discount_percent": 18,
            "created_at": 1746760494047
        },
        {
            "id": "PRD-250509-WVBJZVQ",
            "thumbnail_url": "https://m.media-amazon.com/images/I/81-QcFPVt-L._AC_UY218_.jpg",
            "name": "Razer Blade 15 Gaming Laptop: NVIDIA GeForce RTX 3070-10th Gen Intel 8-Core i7 CPU - 15.6 FHD 360Hz - 16GB RAM - 1TB SSD - CNC Aluminum - Chroma RGB - THX Spatial Audio - Thunderbolt 3",
            "price": 123,
            "sku": "ASDASDASD",
            "model": "ASDASDAS",
            "brand": "asdasdasd",
            "category": "ELECTRONICS_DEVICES",
            "bullet_list": [
                "asdasd"
            ],
            "color": "#000000",
            "condition_": "new",
            "origin": "AF",
            "city": "asdasd",
            "postal": "1123123",
            "discount": true,
            "discount_value": 48,
            "discount_percent": 18,
            "created_at": 1746760494047
        }
    ]

)


const search = useSearchStore()

onMounted(() => {
    search.setResultData(testResult.value)
})
</script>
