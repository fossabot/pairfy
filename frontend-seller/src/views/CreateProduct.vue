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

                    <div v-if="editor" class="editor container" :class="{ invalid: formErrors.features }">
                        <div class="editor-control">
                            <div class="editor-control-group">
                                <button @click="editor.chain().focus().toggleBold().run()"
                                    :disabled="!editor.can().chain().focus().toggleBold().run()"
                                    :class="{ 'is-active': editor.isActive('bold') }">

                                    <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24"
                                        stroke-width="1.5" stroke="currentColor" class="size-6">
                                        <path stroke-linejoin="round"
                                            d="M6.75 3.744h-.753v8.25h7.125a4.125 4.125 0 0 0 0-8.25H6.75Zm0 0v.38m0 16.122h6.747a4.5 4.5 0 0 0 0-9.001h-7.5v9h.753Zm0 0v-.37m0-15.751h6a3.75 3.75 0 1 1 0 7.5h-6m0-7.5v7.5m0 0v8.25m0-8.25h6.375a4.125 4.125 0 0 1 0 8.25H6.75m.747-15.38h4.875a3.375 3.375 0 0 1 0 6.75H7.497v-6.75Zm0 7.5h5.25a3.75 3.75 0 0 1 0 7.5h-5.25v-7.5Z" />
                                    </svg>
                                </button>

                                <button @click="editor.chain().focus().toggleItalic().run()"
                                    :disabled="!editor.can().chain().focus().toggleItalic().run()"
                                    :class="{ 'is-active': editor.isActive('italic') }">
                                    <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24"
                                        stroke-width="1.5" stroke="currentColor" class="size-6">
                                        <path stroke-linecap="round" stroke-linejoin="round"
                                            d="M5.248 20.246H9.05m0 0h3.696m-3.696 0 5.893-16.502m0 0h-3.697m3.697 0h3.803" />
                                    </svg>
                                </button>

                                <button @click="editor.chain().focus().toggleStrike().run()"
                                    :disabled="!editor.can().chain().focus().toggleStrike().run()"
                                    :class="{ 'is-active': editor.isActive('strike') }">
                                    <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24"
                                        stroke-width="1.5" stroke="currentColor" class="size-6">
                                        <path stroke-linecap="round" stroke-linejoin="round"
                                            d="M12 12a8.912 8.912 0 0 1-.318-.079c-1.585-.424-2.904-1.247-3.76-2.236-.873-1.009-1.265-2.19-.968-3.301.59-2.2 3.663-3.29 6.863-2.432A8.186 8.186 0 0 1 16.5 5.21M6.42 17.81c.857.99 2.176 1.812 3.761 2.237 3.2.858 6.274-.23 6.863-2.431.233-.868.044-1.779-.465-2.617M3.75 12h16.5" />
                                    </svg>
                                </button>
                            </div>

                            <div class="editor-control-group">
                                <button @click="editor.chain().focus().toggleHeading({ level: 1 }).run()"
                                    :class="{ 'is-active': editor.isActive('heading', { level: 1 }) }">
                                    <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24"
                                        stroke-width="1.5" stroke="currentColor" class="size-6">
                                        <path stroke-linecap="round" stroke-linejoin="round"
                                            d="M2.243 4.493v7.5m0 0v7.502m0-7.501h10.5m0-7.5v7.5m0 0v7.501m4.501-8.627 2.25-1.5v10.126m0 0h-2.25m2.25 0h2.25" />
                                    </svg>

                                </button>
                                <button @click="editor.chain().focus().toggleHeading({ level: 2 }).run()"
                                    :class="{ 'is-active': editor.isActive('heading', { level: 2 }) }">
                                    <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24"
                                        stroke-width="1.5" stroke="currentColor" class="size-6">
                                        <path stroke-linecap="round" stroke-linejoin="round"
                                            d="M21.75 19.5H16.5v-1.609a2.25 2.25 0 0 1 1.244-2.012l2.89-1.445c.651-.326 1.116-.955 1.116-1.683 0-.498-.04-.987-.118-1.463-.135-.825-.835-1.422-1.668-1.489a15.202 15.202 0 0 0-3.464.12M2.243 4.492v7.5m0 0v7.502m0-7.501h10.5m0-7.5v7.5m0 0v7.501" />
                                    </svg>

                                </button>

                                <button @click="editor.chain().focus().toggleHeading({ level: 3 }).run()"
                                    :class="{ 'is-active': editor.isActive('heading', { level: 3 }) }">
                                    <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24"
                                        stroke-width="1.5" stroke="currentColor" class="size-6">
                                        <path stroke-linecap="round" stroke-linejoin="round"
                                            d="M20.905 14.626a4.52 4.52 0 0 1 .738 3.603c-.154.695-.794 1.143-1.504 1.208a15.194 15.194 0 0 1-3.639-.104m4.405-4.707a4.52 4.52 0 0 0 .738-3.603c-.154-.696-.794-1.144-1.504-1.209a15.19 15.19 0 0 0-3.639.104m4.405 4.708H18M2.243 4.493v7.5m0 0v7.502m0-7.501h10.5m0-7.5v7.5m0 0v7.501" />
                                    </svg>
                                </button>
                            </div>

                            <div class="editor-control-group">
                                <button @click="editor.chain().focus().toggleBulletList().run()"
                                    :class="{ 'is-active': editor.isActive('bulletList') }">
                                    <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24"
                                        stroke-width="1.5" stroke="currentColor" class="size-6">
                                        <path stroke-linecap="round" stroke-linejoin="round"
                                            d="M8.25 6.75h12M8.25 12h12m-12 5.25h12M3.75 6.75h.007v.008H3.75V6.75Zm.375 0a.375.375 0 1 1-.75 0 .375.375 0 0 1 .75 0ZM3.75 12h.007v.008H3.75V12Zm.375 0a.375.375 0 1 1-.75 0 .375.375 0 0 1 .75 0Zm-.375 5.25h.007v.008H3.75v-.008Zm.375 0a.375.375 0 1 1-.75 0 .375.375 0 0 1 .75 0Z" />
                                    </svg>

                                </button>
                                <button @click="editor.chain().focus().toggleOrderedList().run()"
                                    :class="{ 'is-active': editor.isActive('orderedList') }">
                                    <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24"
                                        stroke-width="1.5" stroke="currentColor" class="size-6">
                                        <path stroke-linecap="round" stroke-linejoin="round"
                                            d="M8.242 5.992h12m-12 6.003H20.24m-12 5.999h12M4.117 7.495v-3.75H2.99m1.125 3.75H2.99m1.125 0H5.24m-1.92 2.577a1.125 1.125 0 1 1 1.591 1.59l-1.83 1.83h2.16M2.99 15.745h1.125a1.125 1.125 0 0 1 0 2.25H3.74m0-.002h.375a1.125 1.125 0 0 1 0 2.25H2.99" />
                                    </svg>
                                </button>
                            </div>

                            <span class="editor-control-counter">
                                {{ editor.storage.characterCount.characters() }} / {{ editorLimit }}
                            </span>
                        </div>

                        <editor-content :editor="editor" />
                    </div>

                    <!--/////////////////////////////-->
                    <div class="uploader">
                        <div class="uploader-wrap">
                            <Toast />
                            <FileUpload name="image" mode="advanced" url="https://pairfy.dev/api/media/create-image"
                                @upload="onTemplatedUpload($event)" :withCredentials="true" :multiple="true"
                                accept="image/*" :maxFileSize="1000000" @select="onSelectedFiles">
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
                                                    <span style="margin-left: 0.5rem;"> The first image is the preview
                                                        thumbnail.</span>
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
                                        {{ uploadedFiles }}
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


                                        <div v-show="uploadedFiles.length > 0">
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
                                aria-labelledby="basic" :invalid="formErrors.quality" />
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
import StarterKit from '@tiptap/starter-kit'
import ListItem from '@tiptap/extension-list-item'
import TextStyle from '@tiptap/extension-text-style'
import Placeholder from '@tiptap/extension-placeholder'
import CharacterCount from '@tiptap/extension-character-count'
import { onMounted, ref, nextTick } from 'vue';
import { useToast } from "primevue/usetoast";
import { usePrimeVue } from 'primevue/config';
import { useMutation } from '@vue/apollo-composable'
import { Editor, EditorContent } from '@tiptap/vue-3'
import dashboardAPI from '@/views/api/index';

const { createImage } = dashboardAPI();

const navItems = ref([
    { label: 'Dashboard' },
    { label: 'Create Product' }
]);


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

const editor = ref(null)

const editorLimit = ref(6000);

onMounted(async () => {
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

    await nextTick();

    editor.value = new Editor({
        extensions: [
            StarterKit,
            Placeholder.configure({
                placeholder: 'Write something …',
            }),
            CharacterCount.configure({
                limit: editorLimit.value,
            }),
            TextStyle.configure({ types: [ListItem.name] }),
        ],
        editorProps: {
            attributes: {
                class: 'editor-class',
            },
        },
        content: ``,
    })
})


const showSuccess = (content) => {
    toast.add({ severity: 'success', summary: 'Success Message', detail: content, life: 5000 });
};

const showError = (content) => {
    toast.add({ severity: 'error', summary: 'Error Message', detail: content, life: 3000 });
};


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

const uploadEvent = async (callback) => {
    totalSizePercent.value = totalSize.value / 10;
    callback();
};

const onTemplatedUpload = (data) => {
    console.log(data);
    showSuccess('Images Uploaded');
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
    console.log(editor.value.storage.characterCount.characters());

    formErrors.value.name = productName.value === null;
    formErrors.value.price = productPrice.value === null;
    formErrors.value.collateral = productCollateral.value === null;
    formErrors.value.sku = productSKU.value === null;
    formErrors.value.model = productModel.value === null;
    formErrors.value.brand = productBrand.value === null;
    formErrors.value.features = editor.value.storage.characterCount.characters() === 0;
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
        return showError('Mandatory Fields');
    };

    sendMessage({
        "createProductVariable": {
            "name": productName.value,
            "price": parseInt(productPrice.value),
            "collateral": parseInt(productCollateral.value),
            "sku": productSKU.value,
            "model": productModel.value,
            "brand": productBrand.value,
            "features": JSON.stringify(editor.value.getJSON()),
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
    background: var(--background-b);
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

::v-deep(.editor-class) {

    height: 250px;
    overflow-y: scroll;
    overflow-x: hidden;
    padding: 1rem;
    color: var(--text-a);
    font-size: var(--text-size-a);
    outline: none;
    box-sizing: border-box;
}

::v-deep(.editor-class::-webkit-scrollbar) {
    width: 13px;
}

::v-deep(.editor-class::-webkit-scrollbar-track) {
    background: transparent;
}

::v-deep(.editor-class::-webkit-scrollbar-thumb) {
    background-color: #888;
    border-radius: 4px;
    border: 2px solid #f1f1f1;
    cursor: pointer;
}

::v-deep(.editor-class::-webkit-scrollbar-thumb:hover) {
    background-color: #3b3b3b;
}

::v-deep(.is-editor-empty:first-child::before) {
    color: var(--text-b);
    content: attr(data-placeholder);
    float: left;
    height: 0;
    pointer-events: none;
}

.editor {
    overflow: auto;
    height: 320px;
    border: 1px solid var(--border-a);
    border-radius: 5px 5px 0 0;
    display: block;
}

.editor.invalid {
    border: 1px solid var(--p-red-400);
}

.editor-control {
    display: flex;
    align-items: center;
    padding: 0.5rem;
    border-bottom: 1px solid var(--border-a);
}

.editor-control-group {
    display: flex;
    margin-right: 1rem
}

.editor-control button {
    background: transparent;
    border: 1px solid var(--border-a);
    border-radius: 4px;
    display: flex;
    align-items: center;
    justify-content: center;
    width: 30px;
    height: 30px;
    color: var(--text-b);
    margin-right: 0.5rem;
}


.editor-control button.is-active {
    border: 1px solid gray;
}

.editor-control-counter {
    font-size: var(--text-size-a);
    color: var(--text-b);
}



/* Extra small devices (phones, 320px and up) */
@media (min-width: 320px) {}

/* Small devices (landscape phones, 480px and up) */
@media (min-width: 480px) {}

/* Medium devices (tablets, 768px and up) */
@media (max-width: 768px) {
    .container {
        grid-template-columns: 1fr;
    }

    ::v-deep(.editor-class) {
        width: 700px;
    }
}

/* Large devices (laptops/desktops, 1024px and up) */
@media (min-width: 1024px) {}

/* Extra large devices (large laptops/desktops, 1200px and up) */
@media (min-width: 1200px) {}

/* Ultra-wide screens (1440px and up) */
@media (min-width: 1440px) {}

/* 4K screens (2560px and up) */
@media (min-width: 2560px) {}
</style>