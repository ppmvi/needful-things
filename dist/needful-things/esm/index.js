/*!
 * Needful things vnull
 * Copyright 2020 Florian Weber - ppm visuals & internet GmbH
 * Released under the MIT License.
*/
import { Prop, Component, Vue } from 'vue-property-decorator';

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
***************************************************************************** */
/* global Reflect, Promise */

var extendStatics = function(d, b) {
    extendStatics = Object.setPrototypeOf ||
        ({ __proto__: [] } instanceof Array && function (d, b) { d.__proto__ = b; }) ||
        function (d, b) { for (var p in b) if (b.hasOwnProperty(p)) d[p] = b[p]; };
    return extendStatics(d, b);
};

function __extends(d, b) {
    extendStatics(d, b);
    function __() { this.constructor = d; }
    d.prototype = b === null ? Object.create(b) : (__.prototype = b.prototype, new __());
}

function __decorate(decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
}

function __spreadArrays() {
    for (var s = 0, i = 0, il = arguments.length; i < il; i++) s += arguments[i].length;
    for (var r = Array(s), k = 0, i = 0; i < il; i++)
        for (var a = arguments[i], j = 0, jl = a.length; j < jl; j++, k++)
            r[k] = a[j];
    return r;
}

var EmailLink = /** @class */ (function (_super) {
    __extends(EmailLink, _super);
    function EmailLink() {
        return _super !== null && _super.apply(this, arguments) || this;
    }
    Object.defineProperty(EmailLink.prototype, "splittedEmail", {
        get: function () {
            return this.email.split('@');
        },
        enumerable: true,
        configurable: true
    });
    EmailLink.prototype.sendMail = function () {
        window.location.href = "mailto:" + this.email;
    };
    __decorate([
        Prop({ required: true })
    ], EmailLink.prototype, "email", void 0);
    EmailLink = __decorate([
        Component
    ], EmailLink);
    return EmailLink;
}(Vue));

function normalizeComponent(template, style, script, scopeId, isFunctionalTemplate, moduleIdentifier /* server only */, shadowMode, createInjector, createInjectorSSR, createInjectorShadow) {
    if (typeof shadowMode !== 'boolean') {
        createInjectorSSR = createInjector;
        createInjector = shadowMode;
        shadowMode = false;
    }
    // Vue.extend constructor export interop.
    const options = typeof script === 'function' ? script.options : script;
    // render functions
    if (template && template.render) {
        options.render = template.render;
        options.staticRenderFns = template.staticRenderFns;
        options._compiled = true;
        // functional template
        if (isFunctionalTemplate) {
            options.functional = true;
        }
    }
    // scopedId
    if (scopeId) {
        options._scopeId = scopeId;
    }
    let hook;
    if (moduleIdentifier) {
        // server build
        hook = function (context) {
            // 2.3 injection
            context =
                context || // cached call
                    (this.$vnode && this.$vnode.ssrContext) || // stateful
                    (this.parent && this.parent.$vnode && this.parent.$vnode.ssrContext); // functional
            // 2.2 with runInNewContext: true
            if (!context && typeof __VUE_SSR_CONTEXT__ !== 'undefined') {
                context = __VUE_SSR_CONTEXT__;
            }
            // inject component styles
            if (style) {
                style.call(this, createInjectorSSR(context));
            }
            // register component module identifier for async chunk inference
            if (context && context._registeredComponents) {
                context._registeredComponents.add(moduleIdentifier);
            }
        };
        // used by ssr in case component is cached and beforeCreate
        // never gets called
        options._ssrRegister = hook;
    }
    else if (style) {
        hook = shadowMode
            ? function (context) {
                style.call(this, createInjectorShadow(context, this.$root.$options.shadowRoot));
            }
            : function (context) {
                style.call(this, createInjector(context));
            };
    }
    if (hook) {
        if (options.functional) {
            // register for functional component in vue file
            const originalRender = options.render;
            options.render = function renderWithStyleInjection(h, context) {
                hook.call(context);
                return originalRender(h, context);
            };
        }
        else {
            // inject component registration as beforeCreate hook
            const existing = options.beforeCreate;
            options.beforeCreate = existing ? [].concat(existing, hook) : [hook];
        }
    }
    return script;
}

/* script */
const __vue_script__ = EmailLink;

/* template */
var __vue_render__ = function() {
  var _vm = this;
  var _h = _vm.$createElement;
  var _c = _vm._self._c || _h;
  return _c(
    "a",
    {
      attrs: { href: "", "aria-label": "E-Mail senden" },
      on: {
        click: function($event) {
          $event.preventDefault();
          return _vm.sendMail($event)
        }
      }
    },
    [
      !_vm.$slots.default
        ? _c("span", [
            _vm._v("\n    " + _vm._s(_vm.splittedEmail[0])),
            _c("span", { staticClass: "hidden" }),
            _vm._v("(at)"),
            _c("span", { staticClass: "hidden" }),
            _vm._v(_vm._s(_vm.splittedEmail[1]) + "\n  ")
          ])
        : _vm._t("default")
    ],
    2
  )
};
var __vue_staticRenderFns__ = [];
__vue_render__._withStripped = true;

  /* style */
  const __vue_inject_styles__ = undefined;
  /* scoped */
  const __vue_scope_id__ = undefined;
  /* module identifier */
  const __vue_module_identifier__ = undefined;
  /* functional template */
  const __vue_is_functional_template__ = false;
  /* style inject */
  
  /* style inject SSR */
  
  /* style inject shadow dom */
  

  
  const __vue_component__ = normalizeComponent(
    { render: __vue_render__, staticRenderFns: __vue_staticRenderFns__ },
    __vue_inject_styles__,
    __vue_script__,
    __vue_scope_id__,
    __vue_is_functional_template__,
    __vue_module_identifier__,
    false,
    undefined,
    undefined,
    undefined
  );

var TelLink = /** @class */ (function (_super) {
    __extends(TelLink, _super);
    function TelLink() {
        return _super !== null && _super.apply(this, arguments) || this;
    }
    TelLink.prototype.call = function () {
        var tel = this.tel.replace(/[\s\/-]/g, '').replace(/\(.*\)/g, '');
        window.location.href = "tel:" + tel;
    };
    __decorate([
        Prop({ required: true })
    ], TelLink.prototype, "tel", void 0);
    __decorate([
        Prop()
    ], TelLink.prototype, "wrapper", void 0);
    TelLink = __decorate([
        Component
    ], TelLink);
    return TelLink;
}(Vue));

/* script */
const __vue_script__$1 = TelLink;

/* template */
var __vue_render__$1 = function() {
  var _vm = this;
  var _h = _vm.$createElement;
  var _c = _vm._self._c || _h;
  return _c(
    "a",
    {
      attrs: { href: "", "aria-label": "Die Nummer " + _vm.tel + " anrufen" },
      on: {
        click: function($event) {
          $event.preventDefault();
          return _vm.call($event)
        }
      }
    },
    [
      !_vm.wrapper
        ? _c("span", { domProps: { textContent: _vm._s(_vm.tel) } })
        : _vm._e(),
      _vm._v(" "),
      _vm._t("default")
    ],
    2
  )
};
var __vue_staticRenderFns__$1 = [];
__vue_render__$1._withStripped = true;

  /* style */
  const __vue_inject_styles__$1 = undefined;
  /* scoped */
  const __vue_scope_id__$1 = undefined;
  /* module identifier */
  const __vue_module_identifier__$1 = undefined;
  /* functional template */
  const __vue_is_functional_template__$1 = false;
  /* style inject */
  
  /* style inject SSR */
  
  /* style inject shadow dom */
  

  
  const __vue_component__$1 = normalizeComponent(
    { render: __vue_render__$1, staticRenderFns: __vue_staticRenderFns__$1 },
    __vue_inject_styles__$1,
    __vue_script__$1,
    __vue_scope_id__$1,
    __vue_is_functional_template__$1,
    __vue_module_identifier__$1,
    false,
    undefined,
    undefined,
    undefined
  );

function applyFacebookMetaTags(meta) {
    if (meta === void 0) { meta = {}; }
    var _a = meta.type, type = _a === void 0 ? '' : _a, _b = meta.title, title = _b === void 0 ? '' : _b, _c = meta.description, description = _c === void 0 ? '' : _c, _d = meta.image, image = _d === void 0 ? '' : _d, _e = meta.siteName, siteName = _e === void 0 ? '' : _e, _f = meta.url, url = _f === void 0 ? '' : _f;
    return [
        type && { property: 'og:type', content: type },
        title && { property: 'og:title', content: title },
        description && { property: 'og:description', content: description },
        image && { property: 'og:image', content: image },
        siteName && { property: 'og:site_name', content: siteName },
        url && { property: 'og:url', content: url },
    ].filter(function (tag) { return tag; });
}
function applyTwitterMetaTags(meta) {
    if (meta === void 0) { meta = {}; }
    var _a = meta.title, title = _a === void 0 ? '' : _a, _b = meta.description, description = _b === void 0 ? '' : _b, _c = meta.image, image = _c === void 0 ? '' : _c, _d = meta.site, site = _d === void 0 ? '' : _d, _e = meta.creator, creator = _e === void 0 ? '' : _e;
    return [
        title && { property: 'twitter:title', content: title },
        description && { property: 'twitter:description', content: description },
        image && { property: 'twitter:image', content: image },
        site && { property: 'twitter:site', content: site },
        creator && { property: 'twitter:creator', content: creator },
    ].filter(function (tag) { return tag; });
}

function applySplashscreenLinks(url, additional) {
    if (url === void 0) { url = '/static/splashscreens'; }
    if (additional === void 0) { additional = []; }
    var splashscreens = [];
    var rel = 'apple-touch-startup-image';
    var screens = __spreadArrays([
        {
            width: 320,
            height: 568,
            ratio: 2,
            orientation: 'portrait',
            href: url + "/iphone5_splash.png",
        },
        {
            width: 375,
            height: 667,
            ratio: 2,
            orientation: 'portrait',
            href: url + "/iphone6_splash.png",
        },
        {
            width: 621,
            height: 1104,
            ratio: 3,
            orientation: 'portrait',
            href: url + "/iphoneplus_splash.png",
        },
        {
            width: 375,
            height: 812,
            ratio: 3,
            orientation: 'portrait',
            href: url + "/iphonex_splash.png",
        },
        {
            width: 414,
            height: 896,
            ratio: 2,
            orientation: 'portrait',
            href: url + "/iphonexr_splash.png",
        },
        {
            width: 414,
            height: 896,
            ratio: 3,
            orientation: 'portrait',
            href: url + "/iphonexsmax_splash.png",
        },
        {
            width: 768,
            height: 1024,
            ratio: 2,
            orientation: 'portrait',
            href: url + "/ipad_splash.png",
        },
        {
            width: 834,
            height: 1112,
            ratio: 2,
            orientation: 'portrait',
            href: url + "/ipadpro1_splash.png",
        },
        {
            width: 834,
            height: 1194,
            ratio: 2,
            orientation: 'portrait',
            href: url + "/ipadpro3_splash.png",
        },
        {
            width: 1024,
            height: 1366,
            ratio: 2,
            orientation: 'portrait',
            href: url + "/ipadpro2_splash.png",
        }
    ], additional);
    for (var _i = 0, screens_1 = screens; _i < screens_1.length; _i++) {
        var _a = screens_1[_i], width = _a.width, height = _a.height, ratio = _a.ratio, orientation_1 = _a.orientation, href = _a.href;
        splashscreens.push({
            rel: rel,
            media: "(device-width: " + width + "px) and (device-height: " + height + "px) and (-webkit-device-pixel-ratio: " + ratio + ") and (orientation: " + orientation_1 + ")",
            href: href,
        });
    }
    return splashscreens;
}

function applyFaviconLinks(options) {
    if (options === void 0) { options = {}; }
    var _a = options.url, url = _a === void 0 ? '/static/icons' : _a, _b = options.manifest, manifest = _b === void 0 ? {} : _b, _c = options.color, color = _c === void 0 ? '#FFFFFF' : _c;
    var _d = manifest.url, manifestUrl = _d === void 0 ? '/static' : _d, _e = manifest.name, manifestName = _e === void 0 ? 'manifest.json' : _e;
    return [
        {
            rel: 'apple-touch-icon',
            sizes: '180x180',
            href: url + "/apple-touch-icon.png",
        },
        {
            rel: 'icon',
            type: 'image/png',
            href: url + "/favicon-32x32.png",
            sizes: '32x32',
        },
        {
            rel: 'icon',
            type: 'image/png',
            href: url + "/favicon-16x16.png",
            sizes: '16x16',
        },
        { rel: 'manifest', href: manifestUrl + "/" + manifestName },
        { rel: 'mask-icon', href: url + "/safari-pinned-tab.svg", color: color },
        { rel: 'shortcut icon', href: url + "/favicon.ico" },
    ];
}
function applyFaviconMetaTags(options) {
    if (options === void 0) { options = {}; }
    var _a = options.url, url = _a === void 0 ? '/static/icons' : _a, _b = options.color, color = _b === void 0 ? '#FFFFFF' : _b, _c = options.statusBarStyle, statusBarStyle = _c === void 0 ? 'default' : _c;
    return [
        { name: 'msapplication-TileColor', content: color },
        { name: 'msapplication-config', content: url + "/browserconfig.xml" },
        { name: 'theme-color', content: color },
        { name: 'apple-mobile-web-app-status-bar-style', content: statusBarStyle },
        { name: 'apple-mobile-web-app-capable', content: 'yes' },
    ];
}

export { __vue_component__ as EmailLink, __vue_component__$1 as TelLink, applyFacebookMetaTags, applyFaviconLinks, applyFaviconMetaTags, applySplashscreenLinks, applyTwitterMetaTags };
//# sourceMappingURL=index.js.map
