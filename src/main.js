import Vue from 'vue'

import vueCustomElement from 'vue-custom-element'
Vue.use(vueCustomElement);

// import VueI18n from 'vue-i18n'
// Vue.use(VueI18n);

import VueResource from 'vue-resource';
Vue.use(VueResource);

export const EventBus = new Vue();


import AerisBibliographyDetail from './aeris-bibliography/aeris-bibliography-detail.vue'
import AerisBibliographyAuthors from './aeris-bibliography/aeris-bibliography-authors.vue'
import AerisBibliographyAuthor from './aeris-bibliography/aeris-bibliography-author.vue'
import AerisBibliographyCitation from './aeris-bibliography/aeris-bibliography-citation.vue'


Vue.customElement('aeris-bibliography-detail',AerisBibliographyDetail);
Vue.customElement('aeris-bibliography-authors',AerisBibliographyAuthors);
Vue.customElement('aeris-bibliography-author',AerisBibliographyAuthor);
Vue.customElement('aeris-bibliography-citation',AerisBibliographyCitation);