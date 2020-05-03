/*!
 * Needful things vnull
 * Copyright 2020 Florian Weber - ppm visuals & internet GmbH
 * Released under the MIT License.
*/
"use strict";Object.defineProperty(exports,"__esModule",{value:!0});var t=require("vue-property-decorator"),e=function(t,o){return(e=Object.setPrototypeOf||{__proto__:[]}instanceof Array&&function(t,e){t.__proto__=e}||function(t,e){for(var o in e)e.hasOwnProperty(o)&&(t[o]=e[o])})(t,o)};
/*! *****************************************************************************
Copyright (c) Microsoft Corporation. All rights reserved.
Licensed under the Apache License, Version 2.0 (the "License"); you may not use
this file except in compliance with the License. You may obtain a copy of the
License at http://www.apache.org/licenses/LICENSE-2.0

THIS CODE IS PROVIDED ON AN *AS IS* BASIS, WITHOUT WARRANTIES OR CONDITIONS OF ANY
KIND, EITHER EXPRESS OR IMPLIED, INCLUDING WITHOUT LIMITATION ANY IMPLIED
WARRANTIES OR CONDITIONS OF TITLE, FITNESS FOR A PARTICULAR PURPOSE,
MERCHANTABLITY OR NON-INFRINGEMENT.

See the Apache Version 2.0 License for specific language governing permissions
and limitations under the License.
***************************************************************************** */function o(t,o){function n(){this.constructor=t}e(t,o),t.prototype=null===o?Object.create(o):(n.prototype=o.prototype,new n)}function n(t,e,o,n){var i,r=arguments.length,a=r<3?e:null===n?n=Object.getOwnPropertyDescriptor(e,o):n;if("object"==typeof Reflect&&"function"==typeof Reflect.decorate)a=Reflect.decorate(t,e,o,n);else for(var p=t.length-1;p>=0;p--)(i=t[p])&&(a=(r<3?i(a):r>3?i(e,o,a):i(e,o))||a);return r>3&&a&&Object.defineProperty(e,o,a),a}function i(t,e,o,n,i,r,a,p,s,c){"boolean"!=typeof a&&(s=p,p=a,a=!1);const l="function"==typeof o?o.options:o;let d;if(t&&t.render&&(l.render=t.render,l.staticRenderFns=t.staticRenderFns,l._compiled=!0,i&&(l.functional=!0)),n&&(l._scopeId=n),r?(d=function(t){(t=t||this.$vnode&&this.$vnode.ssrContext||this.parent&&this.parent.$vnode&&this.parent.$vnode.ssrContext)||"undefined"==typeof __VUE_SSR_CONTEXT__||(t=__VUE_SSR_CONTEXT__),e&&e.call(this,s(t)),t&&t._registeredComponents&&t._registeredComponents.add(r)},l._ssrRegister=d):e&&(d=a?function(t){e.call(this,c(t,this.$root.$options.shadowRoot))}:function(t){e.call(this,p(t))}),d)if(l.functional){const t=l.render;l.render=function(e,o){return d.call(o),t(e,o)}}else{const t=l.beforeCreate;l.beforeCreate=t?[].concat(t,d):[d]}return o}const r=function(e){function i(){return null!==e&&e.apply(this,arguments)||this}return o(i,e),Object.defineProperty(i.prototype,"splittedEmail",{get:function(){return this.email.split("@")},enumerable:!0,configurable:!0}),i.prototype.sendMail=function(){window.location.href="mailto:"+this.email},n([t.Prop({required:!0})],i.prototype,"email",void 0),i=n([t.Component],i)}(t.Vue);var a=function(){var t=this,e=t.$createElement,o=t._self._c||e;return o("a",{attrs:{href:"","aria-label":"E-Mail senden"},on:{click:function(e){return e.preventDefault(),t.sendMail(e)}}},[t.$slots.default?t._t("default"):o("span",[t._v("\n    "+t._s(t.splittedEmail[0])),o("span",{staticClass:"hidden"}),t._v("(at)"),o("span",{staticClass:"hidden"}),t._v(t._s(t.splittedEmail[1])+"\n  ")])],2)};a._withStripped=!0;const p=i({render:a,staticRenderFns:[]},void 0,r,void 0,!1,void 0,!1,void 0,void 0,void 0);const s=function(e){function i(){return null!==e&&e.apply(this,arguments)||this}return o(i,e),Object.defineProperty(i.prototype,"callableTel",{get:function(){return this.tel.replace(/[\s\/-]/g,"").replace(/\(.*\)/g,"")},enumerable:!0,configurable:!0}),i.prototype.call=function(){window.location.href="tel:"+this.callableTel},n([t.Prop({required:!0})],i.prototype,"tel",void 0),n([t.Prop()],i.prototype,"doNotShowTel",void 0),i=n([t.Component],i)}(t.Vue);var c=function(){var t=this,e=t.$createElement,o=t._self._c||e;return o("a",{attrs:{href:"","aria-label":"Die Nummer "+t.tel+" anrufen"},on:{click:function(e){return e.preventDefault(),t.call(e)}}},[t.doNotShowTel?t._e():o("span",{domProps:{textContent:t._s(t.tel)}}),t._v(" "),t._t("default")],2)};c._withStripped=!0;const l=i({render:c,staticRenderFns:[]},void 0,s,void 0,!1,void 0,!1,void 0,void 0,void 0);exports.EmailLink=p,exports.TelLink=l,exports.applyFacebookMetaTags=function(t){void 0===t&&(t={});var e=t.type,o=void 0===e?"":e,n=t.title,i=void 0===n?"":n,r=t.description,a=void 0===r?"":r,p=t.image,s=void 0===p?"":p,c=t.siteName,l=void 0===c?"":c,d=t.url;return[{property:"og:type",content:o},{property:"og:title",content:i},{property:"og:description",content:a},{property:"og:image",content:s},{property:"og:site_name",content:l},{property:"og:url",content:void 0===d?"":d}]},exports.applyFaviconLinks=function(t){void 0===t&&(t={});var e=t.path,o=void 0===e?"/static/icons":e,n=t.manifestPath,i=void 0===n?"/static/manifest.json":n,r=t.color;return[{rel:"apple-touch-icon",sizes:"180x180",href:o+"/apple-touch-icon.png"},{rel:"icon",type:"image/png",href:o+"/favicon-32x32.png",sizes:"32x32"},{rel:"icon",type:"image/png",href:o+"/favicon-16x16.png",sizes:"16x16"},{rel:"manifest",href:""+i},{rel:"mask-icon",href:o+"/safari-pinned-tab.svg",color:void 0===r?"#FFFFFF":r},{rel:"shortcut icon",href:o+"/favicon.ico"}]},exports.applyFaviconMetaTags=function(t){void 0===t&&(t={});var e=t.name,o=void 0===e?"":e,n=t.path,i=void 0===n?"/static/icons":n,r=t.color,a=void 0===r?"#FFFFFF":r,p=t.statusBarStyle;return[{name:"msapplication-TileColor",content:a},{name:"msapplication-config",content:i+"/browserconfig.xml"},{name:"theme-color",content:a},{name:"apple-mobile-web-app-status-bar-style",content:void 0===p?"default":p},{name:"apple-mobile-web-app-capable",content:"yes"},{name:"apple-mobile-web-app-title",content:o},{name:"application-name",content:o}]},exports.applySplashscreenLinks=function(t,e){void 0===t&&(t="/static/splashscreens"),void 0===e&&(e=[]);for(var o=[],n=0,i=function(){for(var t=0,e=0,o=arguments.length;e<o;e++)t+=arguments[e].length;var n=Array(t),i=0;for(e=0;e<o;e++)for(var r=arguments[e],a=0,p=r.length;a<p;a++,i++)n[i]=r[a];return n}([{width:320,height:568,ratio:2,orientation:"portrait",href:t+"/iphone5_splash.png"},{width:375,height:667,ratio:2,orientation:"portrait",href:t+"/iphone6_splash.png"},{width:621,height:1104,ratio:3,orientation:"portrait",href:t+"/iphoneplus_splash.png"},{width:375,height:812,ratio:3,orientation:"portrait",href:t+"/iphonex_splash.png"},{width:414,height:896,ratio:2,orientation:"portrait",href:t+"/iphonexr_splash.png"},{width:414,height:896,ratio:3,orientation:"portrait",href:t+"/iphonexsmax_splash.png"},{width:768,height:1024,ratio:2,orientation:"portrait",href:t+"/ipad_splash.png"},{width:834,height:1112,ratio:2,orientation:"portrait",href:t+"/ipadpro1_splash.png"},{width:834,height:1194,ratio:2,orientation:"portrait",href:t+"/ipadpro3_splash.png"},{width:1024,height:1366,ratio:2,orientation:"portrait",href:t+"/ipadpro2_splash.png"}],e);n<i.length;n++){var r=i[n],a=r.width,p=r.height,s=r.ratio,c=r.orientation,l=r.href;o.push({rel:"apple-touch-startup-image",media:"(device-width: "+a+"px) and (device-height: "+p+"px) and (-webkit-device-pixel-ratio: "+s+") and (orientation: "+c+")",href:l})}return o},exports.applyTwitterMetaTags=function(t){void 0===t&&(t={});var e=t.title,o=void 0===e?"":e,n=t.description,i=void 0===n?"":n,r=t.image,a=void 0===r?"":r,p=t.site,s=void 0===p?"":p,c=t.creator;return[{property:"twitter:title",content:o},{property:"twitter:description",content:i},{property:"twitter:image",content:a},{property:"twitter:site",content:s},{property:"twitter:creator",content:void 0===c?"":c}]};
//# sourceMappingURL=index.js.map
