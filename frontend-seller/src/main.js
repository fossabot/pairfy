import './assets/main.css'
import 'primeicons/primeicons.css'

import { createApp } from 'vue'
import App from './App.vue'
import router from './router'
import { stores } from "./store";

import PrimeVue from 'primevue/config';
import Lara from '@primevue/themes/lara';
import { definePreset } from '@primevue/themes';

import Button from "primevue/button"
import Toolbar from 'primevue/toolbar';
import IconField from 'primevue/iconfield'
import InputIcon from 'primevue/inputicon'
import InputText from 'primevue/inputtext'
import SplitButton from 'primevue/splitbutton';
import Breadcrumb from 'primevue/breadcrumb';
import Editor from 'primevue/editor';
import InputGroup from 'primevue/inputgroup';
import InputGroupAddon from 'primevue/inputgroupaddon';
import KeyFilter from 'primevue/keyfilter';
import Checkbox from 'primevue/checkbox';
import Select from 'primevue/select';
import ColorPicker from 'primevue/colorpicker';
import ToggleSwitch from 'primevue/toggleswitch';
import AutoComplete from 'primevue/autocomplete';
import FileUpload from 'primevue/fileupload';
import ProgressBar from 'primevue/progressbar';
import Badge from 'primevue/badge';
import OverlayBadge from 'primevue/overlaybadge';
import Message from 'primevue/message';
import SelectButton from 'primevue/selectbutton';
import Fluid from 'primevue/fluid';
import Password from 'primevue/password';
import IftaLabel from 'primevue/iftalabel';
import Divider from 'primevue/divider';


import ConfirmationService from 'primevue/confirmationservice'
import DialogService from 'primevue/dialogservice'
import ToastService from 'primevue/toastservice';

const app = createApp(App)

app.use(stores);
app.use(router);


const MyPreset = definePreset(Lara, {
    semantic: {
        primary: {
            50: '{blue.50}',
            100: '{blue.100}',
            200: '{blue.200}',
            300: '{blue.300}',
            400: '{blue.400}',
            500: '{blue.500}',
            600: '{blue.600}',
            700: '{blue.700}',
            800: '{blue.800}',
            900: '{blue.900}',
            950: '{blue.950}'
        }
    }
});


app.use(PrimeVue, {
    theme: {
        preset: MyPreset
    }
});

app.use(ConfirmationService);
app.use(ToastService);
app.use(DialogService);

app.component('Button', Button);
app.component('Toolbar', Toolbar);
app.component('IconField', IconField);
app.component('InputIcon', InputIcon);
app.component('InputText', InputText);
app.component('SplitButton', SplitButton);
app.component('Breadcrumb', Breadcrumb);
app.component('Editor', Editor);
app.component('InputGroup', InputGroup);
app.component('InputGroupAddon', InputGroupAddon);
app.component('Checkbox', Checkbox);
app.component('Select', Select);
app.component('ColorPicker', ColorPicker);
app.component('ToggleSwitch', ToggleSwitch);
app.component('AutoComplete', AutoComplete);
app.component('FileUpload', FileUpload);
app.component('ProgressBar', ProgressBar);
app.component('Badge', Badge);
app.component('OverlayBadge', OverlayBadge);
app.component('Message', Message);
app.component('SelectButton', SelectButton);
app.component('Fluid', Fluid);
app.component('Password', Password);
app.component('IftaLabel', IftaLabel);
app.component('Divider', Divider);


app.directive('keyfilter', KeyFilter);

app.mount('#app')
