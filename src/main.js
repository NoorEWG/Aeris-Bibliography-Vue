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
import AerisBibliographyList from './aeris-bibliography/aeris-bibliography-list.vue'
import AerisBibliographyBox from './aeris-bibliography/aeris-bibliography-box.vue'
import AerisBibliographySearch from './aeris-bibliography/aeris-bibliography-search.vue'
import AerisBibliographySearchbutton from './aeris-bibliography/aeris-bibliography-searchbutton.vue'
import AerisBibliographyAbstract from './aeris-bibliography/aeris-bibliography-abstract.vue'
import AerisBibliographyTags from './aeris-bibliography/aeris-bibliography-tags.vue'
import AerisDisponibilityCalendarYearly from './aeris-disponibility-calendar-yearly/aeris-disponibility-calendar-yearly.vue'
import AerisYearCalendar from './aeris-disponibility-calendar-yearly/aeris-year-calendar.vue'

Vue.customElement('aeris-bibliography-detail',AerisBibliographyDetail);
Vue.customElement('aeris-bibliography-authors',AerisBibliographyAuthors);
Vue.customElement('aeris-bibliography-author',AerisBibliographyAuthor);
Vue.customElement('aeris-bibliography-citation',AerisBibliographyCitation);
Vue.customElement('aeris-bibliography-list',AerisBibliographyList);
Vue.customElement('aeris-bibliography-box',AerisBibliographyBox);
Vue.customElement('aeris-bibliography-search',AerisBibliographySearch);
Vue.customElement('aeris-bibliography-searchbutton',AerisBibliographySearchbutton);
Vue.customElement('aeris-bibliography-abstract',AerisBibliographyAbstract);
Vue.customElement('aeris-bibliography-tags',AerisBibliographyTags);
Vue.customElement('aeris-disponibility-calendar-yearly',AerisDisponibilityCalendarYearly);
Vue.customElement('aeris-year-calendar',AerisYearCalendar);
