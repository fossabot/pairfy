import './assets/main.css'
import 'primeicons/primeicons.css'

import { createApp } from 'vue'
import App from './App.vue'
import router from './router'

import PrimeVue from 'primevue/config';
import Aura from '@primevue/themes/aura';
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

const app = createApp(App)

app.use(router)

app.use(PrimeVue, {
    theme: {
        preset: Aura
    }
});

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

app.directive('keyfilter', KeyFilter);

app.mount('#app')
