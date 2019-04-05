//
//
//
//
//
//
//
//
//
//
//
//
var script = {
  props: {
    email: {
      type: String,
      required: true
    }
  },
  data: function data() {
    return {
      splittedEmail: ''
    };
  },
  mounted: function mounted() {
    this.splittedEmail = this.email.split('@');
  },
  methods: {
    sendMail: function sendMail() {
      window.location.href = "mailto:".concat(this.email);
    }
  }
};

function normalizeComponent(template, style, script, scopeId, isFunctionalTemplate, moduleIdentifier
/* server only */
, shadowMode, createInjector, createInjectorSSR, createInjectorShadow) {
  if (typeof shadowMode !== 'boolean') {
    createInjectorSSR = createInjector;
    createInjector = shadowMode;
    shadowMode = false;
  } // Vue.extend constructor export interop.


  var options = typeof script === 'function' ? script.options : script; // render functions

  if (template && template.render) {
    options.render = template.render;
    options.staticRenderFns = template.staticRenderFns;
    options._compiled = true; // functional template

    if (isFunctionalTemplate) {
      options.functional = true;
    }
  } // scopedId


  if (scopeId) {
    options._scopeId = scopeId;
  }

  var hook;

  if (moduleIdentifier) {
    // server build
    hook = function hook(context) {
      // 2.3 injection
      context = context || // cached call
      this.$vnode && this.$vnode.ssrContext || // stateful
      this.parent && this.parent.$vnode && this.parent.$vnode.ssrContext; // functional
      // 2.2 with runInNewContext: true

      if (!context && typeof __VUE_SSR_CONTEXT__ !== 'undefined') {
        context = __VUE_SSR_CONTEXT__;
      } // inject component styles


      if (style) {
        style.call(this, createInjectorSSR(context));
      } // register component module identifier for async chunk inference


      if (context && context._registeredComponents) {
        context._registeredComponents.add(moduleIdentifier);
      }
    }; // used by ssr in case component is cached and beforeCreate
    // never gets called


    options._ssrRegister = hook;
  } else if (style) {
    hook = shadowMode ? function () {
      style.call(this, createInjectorShadow(this.$root.$options.shadowRoot));
    } : function (context) {
      style.call(this, createInjector(context));
    };
  }

  if (hook) {
    if (options.functional) {
      // register for functional component in vue file
      var originalRender = options.render;

      options.render = function renderWithStyleInjection(h, context) {
        hook.call(context);
        return originalRender(h, context);
      };
    } else {
      // inject component registration as beforeCreate hook
      var existing = options.beforeCreate;
      options.beforeCreate = existing ? [].concat(existing, hook) : [hook];
    }
  }

  return script;
}

var normalizeComponent_1 = normalizeComponent;

/* script */
var __vue_script__ = script;
/* template */

var __vue_render__ = function __vue_render__() {
  var _vm = this;

  var _h = _vm.$createElement;

  var _c = _vm._self._c || _h;

  return _c("a", {
    attrs: {
      href: "",
      "aria-label": "E-Mail senden an " + _vm.email
    },
    on: {
      click: function click($event) {
        $event.preventDefault();
        return _vm.sendMail($event);
      }
    }
  }, [_c("span", [_vm._v("\n    " + _vm._s(_vm.splittedEmail[0])), _c("span", {
    staticClass: "d-none"
  }), _vm._v("@"), _c("span", {
    staticClass: "d-none"
  }), _vm._v(_vm._s(_vm.splittedEmail[1]) + "\n  ")])]);
};

var __vue_staticRenderFns__ = [];
__vue_render__._withStripped = true;
/* style */

var __vue_inject_styles__ = undefined;
/* scoped */

var __vue_scope_id__ = undefined;
/* module identifier */

var __vue_module_identifier__ = undefined;
/* functional template */

var __vue_is_functional_template__ = false;
/* style inject */

/* style inject SSR */

var EmailLink = normalizeComponent_1({
  render: __vue_render__,
  staticRenderFns: __vue_staticRenderFns__
}, __vue_inject_styles__, __vue_script__, __vue_scope_id__, __vue_is_functional_template__, __vue_module_identifier__, undefined, undefined);

//
//
//
//
//
//
//
//
//
//
//
//
//
//
var script$1 = {
  props: {
    tel: {
      type: String,
      required: true
    },
    wrapper: Boolean
  },
  methods: {
    call: function call() {
      // eslint-disable-next-line no-useless-escape
      var tel = this.tel.replace(/[\s\/-]/g, '');
      window.location.href = "tel:".concat(tel);
    }
  }
};

/* script */
var __vue_script__$1 = script$1;
/* template */

var __vue_render__$1 = function __vue_render__() {
  var _vm = this;

  var _h = _vm.$createElement;

  var _c = _vm._self._c || _h;

  return _c("a", {
    attrs: {
      href: "",
      "aria-label": "Die Nummer " + _vm.tel + " anrufen"
    },
    on: {
      click: function click($event) {
        $event.preventDefault();
        return _vm.call($event);
      }
    }
  }, [!_vm.wrapper ? _c("span", {
    domProps: {
      textContent: _vm._s(_vm.tel)
    }
  }) : _vm._e(), _vm._v(" "), _vm._t("default")], 2);
};

var __vue_staticRenderFns__$1 = [];
__vue_render__$1._withStripped = true;
/* style */

var __vue_inject_styles__$1 = undefined;
/* scoped */

var __vue_scope_id__$1 = undefined;
/* module identifier */

var __vue_module_identifier__$1 = undefined;
/* functional template */

var __vue_is_functional_template__$1 = false;
/* style inject */

/* style inject SSR */

var TelLink = normalizeComponent_1({
  render: __vue_render__$1,
  staticRenderFns: __vue_staticRenderFns__$1
}, __vue_inject_styles__$1, __vue_script__$1, __vue_scope_id__$1, __vue_is_functional_template__$1, __vue_module_identifier__$1, undefined, undefined);

function applyFacebookMetaTags() {
  var meta = arguments.length > 0 && arguments[0] !== undefined ? arguments[0] : {};
  var _meta$type = meta.type,
      type = _meta$type === void 0 ? '' : _meta$type,
      _meta$title = meta.title,
      title = _meta$title === void 0 ? '' : _meta$title,
      _meta$description = meta.description,
      description = _meta$description === void 0 ? '' : _meta$description,
      _meta$image = meta.image,
      image = _meta$image === void 0 ? '' : _meta$image,
      _meta$siteName = meta.siteName,
      siteName = _meta$siteName === void 0 ? '' : _meta$siteName;
  return [type && {
    property: 'og:type',
    content: type
  }, title && {
    property: 'og:title',
    content: title
  }, description && {
    property: 'og:description',
    content: description
  }, image && {
    property: 'og:image',
    content: image
  }, siteName && {
    property: 'og:site_name',
    content: siteName
  }].filter(function (tag) {
    return tag;
  });
}
function applyTwitterMetaTags() {
  var meta = arguments.length > 0 && arguments[0] !== undefined ? arguments[0] : {};
  var _meta$title2 = meta.title,
      title = _meta$title2 === void 0 ? '' : _meta$title2,
      _meta$description2 = meta.description,
      description = _meta$description2 === void 0 ? '' : _meta$description2,
      _meta$image2 = meta.image,
      image = _meta$image2 === void 0 ? '' : _meta$image2,
      _meta$site = meta.site,
      site = _meta$site === void 0 ? '' : _meta$site,
      _meta$creator = meta.creator,
      creator = _meta$creator === void 0 ? '' : _meta$creator;
  return [title && {
    property: 'twitter:title',
    content: title
  }, description && {
    property: 'twitter:description',
    content: description
  }, image && {
    property: 'twitter:image',
    content: image
  }, site && {
    property: 'twitter:site',
    content: site
  }, creator && {
    property: 'twitter:creator',
    content: creator
  }].filter(function (tag) {
    return tag;
  });
}

function _toConsumableArray(arr) {
  return _arrayWithoutHoles(arr) || _iterableToArray(arr) || _nonIterableSpread();
}

function _arrayWithoutHoles(arr) {
  if (Array.isArray(arr)) {
    for (var i = 0, arr2 = new Array(arr.length); i < arr.length; i++) arr2[i] = arr[i];

    return arr2;
  }
}

function _iterableToArray(iter) {
  if (Symbol.iterator in Object(iter) || Object.prototype.toString.call(iter) === "[object Arguments]") return Array.from(iter);
}

function _nonIterableSpread() {
  throw new TypeError("Invalid attempt to spread non-iterable instance");
}

function applySplashscreenMetaTags() {
  var url = arguments.length > 0 && arguments[0] !== undefined ? arguments[0] : '/static/splashscreens';
  var additional = arguments.length > 1 && arguments[1] !== undefined ? arguments[1] : [];
  var splashscreens = [];
  var rel = 'apple-touch-startup-image';
  var screens = [{
    width: 320,
    height: 568,
    ratio: 2,
    orientation: 'portrait',
    href: "".concat(url, "/iphone5_splash.png")
  }, {
    width: 375,
    height: 667,
    ratio: 2,
    orientation: 'portrait',
    href: "".concat(url, "/iphone6_splash.png")
  }, {
    width: 621,
    height: 1104,
    ratio: 3,
    orientation: 'portrait',
    href: "".concat(url, "/iphoneplus_splash.png")
  }, {
    width: 375,
    height: 812,
    ratio: 3,
    orientation: 'portrait',
    href: "".concat(url, "/iphonex_splash.png")
  }, {
    width: 414,
    height: 896,
    ratio: 2,
    orientation: 'portrait',
    href: "".concat(url, "/iphonexr_splash.png")
  }, {
    width: 414,
    height: 896,
    ratio: 3,
    orientation: 'portrait',
    href: "".concat(url, "/iphonexsmax_splash.png")
  }, {
    width: 768,
    height: 1024,
    ratio: 2,
    orientation: 'portrait',
    href: "".concat(url, "/ipad_splash.png")
  }, {
    width: 834,
    height: 1112,
    ratio: 2,
    orientation: 'portrait',
    href: "".concat(url, "/ipadpro1_splash.png")
  }, {
    width: 834,
    height: 1194,
    ratio: 2,
    orientation: 'portrait',
    href: "".concat(url, "/ipadpro3_splash.png")
  }, {
    width: 1024,
    height: 1366,
    ratio: 2,
    orientation: 'portrait',
    href: "".concat(url, "/ipadpro2_splash.png")
  }].concat(_toConsumableArray(additional));
  var _iteratorNormalCompletion = true;
  var _didIteratorError = false;
  var _iteratorError = undefined;

  try {
    for (var _iterator = screens[Symbol.iterator](), _step; !(_iteratorNormalCompletion = (_step = _iterator.next()).done); _iteratorNormalCompletion = true) {
      var _step$value = _step.value,
          width = _step$value.width,
          height = _step$value.height,
          ratio = _step$value.ratio,
          orientation = _step$value.orientation,
          href = _step$value.href;
      splashscreens.push({
        rel: rel,
        media: "(device-width: ".concat(width, "px) and (device-height: ").concat(height, "px) and (-webkit-device-pixel-ratio: ").concat(ratio, ") and (orientation: ").concat(orientation, ")"),
        href: href
      });
    }
  } catch (err) {
    _didIteratorError = true;
    _iteratorError = err;
  } finally {
    try {
      if (!_iteratorNormalCompletion && _iterator["return"] != null) {
        _iterator["return"]();
      }
    } finally {
      if (_didIteratorError) {
        throw _iteratorError;
      }
    }
  }

  return splashscreens;
}

export { EmailLink, TelLink, applyFacebookMetaTags, applySplashscreenMetaTags, applyTwitterMetaTags };
