<template>
    <main>
        <Toolbar>
            <template #start>
                <Button icon="pi pi-chevron-left" class="mr-2" severity="secondary" text />
                <Breadcrumb :model="navItems">
                    <template #item="{ item }">
                        <span style="font-weight: 600;">{{ item.label }}</span>
                    </template>
                    <template #separator> / </template>

                </Breadcrumb>


            </template>

            <template #center>

            </template>

            <template #end>

            </template>
        </Toolbar>

        <div class="card">
            <div class="title">
                Create Product
            </div>

            <div class="container">
                <div class="left-column">
                    <InputText v-model="productName" type="text" placeholder="Product Name"
                        v-keyfilter="/^[a-zA-Z0-9-()/+$ ]+$/" :invalid="formErrors.name" />
                    <InputGroup>

                        <InputText v-model="productPrice" type="number" placeholder="Product Price"
                            v-keyfilter="/^[0-9]+$/" style="border-radius: var(--p-inputtext-border-radius)"
                            :invalid="formErrors.price" />

                        <InputText v-model="productCollateral" type="number" placeholder="Product Collateral"
                            style="margin: 0 1rem; border-radius: var(--p-inputtext-border-radius)"
                            v-keyfilter="/^[0-9]+$/" :invalid="formErrors.collateral" />

                        <InputText v-model="productSKU" type="text" placeholder="Product SKU"
                            v-keyfilter="/^[a-zA-Z0-9]+$/" style="border-radius: var(--p-inputtext-border-radius)"
                            :invalid="formErrors.sku" />
                    </InputGroup>

                    <InputGroup>

                        <InputText v-model="productModel" type="text" placeholder="Model"
                            style="margin-right: 1rem; border-radius: var(--p-inputtext-border-radius)"
                            v-keyfilter="/^[a-zA-Z0-9 ]+$/" :invalid="formErrors.model" />

                        <InputText v-model="productBrand" type="text" placeholder="Brand"
                            v-keyfilter="/^[a-zA-Z0-9 ]+$/" style="border-radius: var(--p-inputtext-border-radius)"
                            :invalid="formErrors.brand" />
                    </InputGroup>


                    <Editor v-model="editor" editorStyle="height: 320px" />


                    <div class="uploader">
                        <!--/////////////////////////////-->

                        <div class="uploader-wrap">
                            <Toast />
                            <FileUpload name="demo[]" url="/api/upload" @upload="onTemplatedUpload($event)"
                                :multiple="true" accept="image/*" :maxFileSize="1000000" @select="onSelectedFiles">
                                <template #header="{ chooseCallback, uploadCallback, clearCallback, files }">
                                    <div class="uploader-top">
                                        <div class="uploader-control">
                                            <Button @click="chooseCallback()" icon="pi pi-image" rounded outlined
                                                severity="secondary" />
                                            <Button @click="uploadEvent(uploadCallback)" icon="pi pi-cloud-upload"
                                                rounded outlined severity="success"
                                                :disabled="!files || files.length === 0" />
                                            <Button @click="clearCallback()" icon="pi pi-times" rounded outlined
                                                severity="danger" :disabled="!files || files.length === 0" />

                                            <Message severity="secondary">

                                                <div style="display: flex; align-items: center">

                                                    <i class="pi pi-exclamation-circle" />
                                                    <span style="margin-left: 0.5rem;"> Drag the images to the desired
                                                        order.</span>
                                                </div>

                                            </Message>
                                        </div>
                                        <ProgressBar :value="totalSizePercent" :showValue="false" class="uploader-bar">
                                            <span class="whitespace-nowrap">{{ totalSize }}B / 1Mb</span>
                                        </ProgressBar>
                                    </div>
                                </template>
                                <template
                                    #content="{ files, uploadedFiles, removeUploadedFileCallback, removeFileCallback }">
                                    <div class="uploader-content">

                                        <div v-show="files.length > 0" class="media" id="sortable-media">
                                            <div v-for="(file, index) of files" :key="file.name + file.type + file.size"
                                                class="media-item" :data-id="index">
                                                <div>
                                                    <img role="presentation" :alt="file.name" :src="file.objectURL"
                                                        width="100" height="50" class="media-image" />
                                                </div>

                                                <div class="media-control">
                                                    <div class="media-pending" />
                                                    <button
                                                        @click="onRemoveTemplatingFile(file, removeFileCallback, index)">

                                                        <i class="pi pi-trash" />
                                                    </button>
                                                </div>

                                            </div>
                                        </div>


                                        <div v-if="uploadedFiles.length > 0">
                                            <h5>Completed</h5>
                                            <div class="flex flex-wrap gap-4">
                                                <div v-for="(file, index) of uploadedFiles"
                                                    :key="file.name + file.type + file.size"
                                                    class="p-8 rounded-border flex flex-col border border-surface items-center gap-4">
                                                    <div>
                                                        <img role="presentation" :alt="file.name" :src="file.objectURL"
                                                            width="100" height="50" />
                                                    </div>
                                                    <span
                                                        class="font-semibold text-ellipsis max-w-60 whitespace-nowrap overflow-hidden">{{
                                                            file.name }}</span>
                                                    <div>{{ formatSize(file.size) }}</div>
                                                    <Badge value="Completed" class="mt-4" severity="success" />
                                                    <Button icon="pi pi-times"
                                                        @click="removeUploadedFileCallback(index)" outlined rounded
                                                        severity="danger" />
                                                </div>
                                            </div>
                                        </div>
                                    </div>
                                </template>
                                <template #empty>
                                    <div class="uploader-empty" @click="chooseCallback()">
                                        <i class="pi pi-upload" />
                                        <p>Drag and drop images to here to upload.</p>
                                    </div>
                                </template>
                            </FileUpload>
                        </div>
                    </div>

                </div>
                <div class="right-column">

                    <div class="box">
                        <div class="subtitle">
                            Category
                        </div>

                        <div class="box-content">
                            <Select v-model="productCategory" :options="productCategories" optionLabel="name"
                                placeholder="Select a category" style="font-size: var(--text-size-a)" fluid
                                :invalid="formErrors.category" />
                        </div>
                    </div>

                    <div class="box">
                        <div class="subtitle">
                            Tags
                        </div>

                        <div class="box-content">
                            <AutoComplete v-model="productKeywords" inputId="multiple-ac-2" multiple fluid
                                placeholder="Keywords" :typeahead="false" inputStyle="font-size: var(--text-size-a)"
                                :invalid="formErrors.keywords" />
                        </div>
                    </div>


                    <div class="box">
                        <div class="subtitle">
                            Color
                        </div>

                        <div class="box-content">
                            <ColorPicker v-model="productColor" />

                            <InputText v-model="productColorName" type="text" placeholder="Color Name"
                                v-keyfilter="/^[a-zA-Z0-9 ]+$/" style="margin-left: 1rem;"
                                :invalid="formErrors.color_name" />

                        </div>
                    </div>



                    <div class="box">
                        <div class="subtitle">
                            Condition
                        </div>

                        <div class="box-content">
                            <SelectButton v-model="productQuality" :options="productStateOptions"
                                aria-labelledby="basic" :invalid="formErrors.quality"/>
                        </div>
                    </div>

                    <div class="box">
                        <div class="subtitle">
                            Stock
                        </div>

                        <div class="box-content">
                            <ToggleSwitch v-model="productStock" />
                        </div>
                    </div>

                    <div class="box-buttons">
                        <Button type="button" label="Discard" icon="pi pi-trash" :loading="loading" @click="load"
                            outlined style="font-size: var(--text-size-a)" fluid />

                        <Button type="button" label="Publish" icon="pi pi-check" :loading="loading"
                            @click="createProduct" style="font-size: var(--text-size-a)" fluid />
                    </div>
                </div>
            </div>
        </div>
    </main>
</template>

<script setup>
import Sortable from 'sortablejs';
import gql from 'graphql-tag'
import { onMounted, ref } from 'vue';
import { useToast } from "primevue/usetoast";
import { usePrimeVue } from 'primevue/config';
import { useMutation } from '@vue/apollo-composable'


const navItems = ref([
    { label: 'Dashboard' },
    { label: 'Create Product' }
]);

const editor = ref();

const productName = ref(null);
const productPrice = ref(null);
const productCollateral = ref(null);
const productSKU = ref(null);
const productModel = ref(null);
const productBrand = ref(null);
const productKeywords = ref(null);


const productCategory = ref(null);

const productCategories = ref([
    { name: "Electronics", code: "electronics" },
    { name: "Books", code: "books" },
    { name: "Music", code: "music" },
    { name: "Movies", code: "movies" },
    { name: "Games", code: "games" },
    { name: "Clothing & Accessories", code: "clothing" },
    { name: "Home & Garden", code: "home" },
    { name: "Beauty & Personal Care", code: "beauty" },
    { name: "Health & Household", code: "health" },
    { name: "Grocery & Gourmet Food", code: "food" },
    { name: "Toys, Hobbies & Collectibles", code: "toys" },
    { name: "Sports & Outdoors", code: "sports" },
    { name: "Automotive & Industrial", code: "industrial" },
    { name: "Pet Supplies", code: "pets" },
    { name: "Office Supplies & Equipment", code: "office" },
    { name: "Digital Content & Software", code: "software" },
]);

const productColor = ref("000000");

const productColorName = ref(null);

const productStock = ref(false);

const productQuality = ref(null);

const productStateOptions = ref(['New', 'Used']);

const $primevue = usePrimeVue();

const toast = useToast();

const totalSize = ref(0);

const totalSizePercent = ref(0);

const files = ref([]);


onMounted(() => {
    new Sortable(document.getElementById('sortable-media'), {
        animation: 150,
        ghostClass: 'sortable-ghost',
        onEnd: function (evt) {
            var items = document.querySelectorAll('.media-item');
            var orderArray = [];

            items.forEach(function (item) {
                orderArray.push(item.getAttribute('data-id'));
            });

            console.log('Final Order:', orderArray);
        }
    });
})


const onRemoveTemplatingFile = (file, removeFileCallback, index) => {
    removeFileCallback(index);
    totalSize.value -= parseInt(formatSize(file.size));
    totalSizePercent.value = totalSize.value / 10;
};

const onClearTemplatingUpload = (clear) => {
    clear();
    totalSize.value = 0;
    totalSizePercent.value = 0;
};

const onSelectedFiles = (event) => {
    files.value = event.files;
    files.value.forEach((file) => {
        totalSize.value += parseInt(formatSize(file.size));
    });
};

const uploadEvent = (callback) => {
    totalSizePercent.value = totalSize.value / 10;
    callback();
};

const onTemplatedUpload = () => {
    toast.add({ severity: "info", summary: "Success", detail: "File Uploaded", life: 3000 });
};

const formatSize = (bytes) => {
    const k = 1024;
    const dm = 3;
    const sizes = $primevue.config.locale.fileSizeTypes;

    if (bytes === 0) {
        return `0 ${sizes[0]}`;
    }

    const i = Math.floor(Math.log(bytes) / Math.log(k));
    const formattedSize = parseFloat((bytes / Math.pow(k, i)).toFixed(dm));

    return `${formattedSize} ${sizes[i]}`;
};


const showSuccess = (content) => {
    toast.add({ severity: 'success', summary: 'Success Message', detail: content, life: 5000 });
};

const showError = (content) => {
    toast.add({ severity: 'error', summary: 'Error Message', detail: content, life: 3000 });
};

const { mutate: sendMessage, onError, onDone } = useMutation(gql`
mutation($createProductVariable: CreateProductInput!){
    createProduct(createProductInput: $createProductVariable){
        success
    }
}
`)

onError(error => {
    showError(error);
})

onDone(result => {
    showSuccess("Product Created");
})

const formErrors = ref({
    "name": false,
    "price": false,
    "collateral": false,
    "sku": false,
    "model": false,
    "brand": false,
    "features": false,
    "category": false,
    "keywords": false,
    "stock": false,
    "color": false,
    "color_name": false,
    "quality": false,
    "image_set": false,
    "video_set": false
});

const checkMandatory = () => {
    formErrors.value.name = productName.value === null;
    formErrors.value.price = productPrice.value === null;
    formErrors.value.collateral = productCollateral.value === null;
    formErrors.value.sku = productSKU.value === null;
    formErrors.value.model = productModel.value === null;
    formErrors.value.brand = productBrand.value === null;
    formErrors.value.features = false;
    formErrors.value.category = productCategory.value === null;
    formErrors.value.keywords = productKeywords.value === null;
    formErrors.value.color = productColor.value === null;
    formErrors.value.color_name = productColorName.value === null;
    formErrors.value.quality = productQuality.value === null;
    formErrors.value.image_set = false;
    formErrors.value.video_set = false;

    return Object.values(formErrors.value).some(value => value === true);
}

const createProduct = () => {
    if (checkMandatory()) {
        showError('Mandatory Fields');
    };

    sendMessage({
        "createProductVariable": {
            "name": productName.value,
            "price": parseInt(productPrice.value),
            "collateral": parseInt(productCollateral.value),
            "sku": productSKU.value,
            "model": productModel.value,
            "brand": productBrand.value,
            "features": "a",
            "category": productCategory.value.code,
            "keywords": productKeywords.value.join(','),
            "stock": productStock.value ? 1 : 0,
            "color": productColor.value,
            "color_name": productColorName.value,
            "quality": productQuality.value,
            "image_set": "1,2,3,4",
            "video_set": ""
        }
    })
}


</script>

<style scoped>
::v-deep(.p-progressbar) {
    height: 0.4rem;
}

::v-deep(.p-inputtext) {
    font-size: var(--text-size-a);
}

::v-deep(.p-select-label) {
    font-size: var(--text-size-a);
}

::v-deep(.p-toolbar) {
    padding: 0 1rem;
    padding-left: 0.5rem;
    background: #ffffff;
}

::v-deep(.p-colorpicker-preview) {
    border-radius: 50%;
}

::v-deep(.p-chip) {
    font-size: var(--text-size-a);
}

::v-deep(.p-message-text) {
    font-size: var(--text-size-a);
}

::v-deep(.p-togglebutton) {
    font-size: var(--text-size-a);
}



main {
    padding: 2rem;
    flex: 1 1 auto;
    position: relative;
}




.card {
    display: flex;
    flex-direction: column;
    border: 1px solid var(--border-a);
    border-radius: 1rem;
    padding: 1.5rem;
    margin-top: 1rem;
}

.title {
    margin-bottom: 1.5rem;
    font-weight: 700;
}

.container {
    display: grid;
    grid-template-columns: 70% 30%;
}

.left-column {
    display: grid;
    gap: 1rem;
}

.right-column {
    padding: 0 1rem;
    display: flex;
    flex-direction: column;
}

.input {
    width: 100%;
    margin-bottom: 1rem;
}

.box {
    border: 1px solid var(--border-a);
    border-radius: .25rem;
    margin-bottom: 1rem
}

.subtitle {
    border-bottom: 1px solid var(--border-a);
    font-size: var(--text-size-a);
    font-weight: 700;
    padding: 1rem;
}

.box-content {
    padding: 1rem;
}


.box-buttons {
    display: flex;
    justify-content: space-between;
    gap: 1rem;
}

.media {
    display: grid;
    grid-template-columns: repeat(5, 1fr);
    gap: 1rem;
    border: 1px solid var(--border-a);
    padding: 1rem;
}

.media-item {
    background: #f1f5f9;
    overflow: hidden;
    height: 150px;
    text-align: center;
    border: 1px solid var(--border-a);
    cursor: grab;
    border-radius: 1rem;
    display: flex;
    justify-content: center;
    align-items: center;
    flex-direction: column;
}

.media-item button {
    border-radius: 4px;
    background: transparent;
    color: var(--text-b);
    font-size: var(--text-size-a);
    display: flex;
    justify-content: center;
    align-items: center;
    padding: 0.25rem 0.5rem;
    margin-left: 0.5rem;
    border: 1px solid var(--border-a);
    cursor: pointer;
}

.media-item button i {
    font-size: 12px;
}

.media-image {
    height: 80px;
    width: 80px;
    object-fit: contain;
}

.media-control {
    display: flex;
    align-items: center;
}

.media-pending {
    background: orange;
    font-size: var(--text-size-a);
    width: 10px;
    height: 10px;
    border-radius: 50%;
}

.media-preview {
    width: 100px;
    height: 100px;
    object-fit: contain;
}

.uploader-top {
    display: flex;
    flex-direction: column;
    width: 100%;
}

.uploader-control {
    display: flex;
    gap: 1rem;
}

.uploader-bar {
    margin-top: 1rem;
}

.uploader-empty {
    height: 320px;
    display: flex;
    justify-content: center;
    flex-direction: column;
    align-items: center;
    font-size: var(--text-size-b);
    color: var(--text-b);
}

.uploader-empty i {
    font-size: 3rem;
}

.uploader-empty p {
    font-size: 1rem;
    margin-top: 1rem;
}

.uploader-content {
    display: flex;
    flex-direction: column;
}

/* Responsive design for smaller screens */
@media (max-width: 768px) {
    .container {
        grid-template-columns: 1fr;
    }
}
</style>