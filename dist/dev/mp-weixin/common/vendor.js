"use strict";
const _export_sfc = (sfc, props) => {
  const target = sfc.__vccOpts || sfc;
  for (const [key, val] of props) {
    target[key] = val;
  }
  return target;
};
function makeMap(str, expectsLowerCase) {
  const map = /* @__PURE__ */ Object.create(null);
  const list = str.split(",");
  for (let i = 0; i < list.length; i++) {
    map[list[i]] = true;
  }
  return expectsLowerCase ? (val) => !!map[val.toLowerCase()] : (val) => !!map[val];
}
function normalizeStyle(value) {
  if (isArray$1(value)) {
    const res = {};
    for (let i = 0; i < value.length; i++) {
      const item = value[i];
      const normalized = isString$1(item) ? parseStringStyle(item) : normalizeStyle(item);
      if (normalized) {
        for (const key in normalized) {
          res[key] = normalized[key];
        }
      }
    }
    return res;
  } else if (isString$1(value)) {
    return value;
  } else if (isObject$2(value)) {
    return value;
  }
}
const listDelimiterRE = /;(?![^(]*\))/g;
const propertyDelimiterRE = /:([^]+)/;
const styleCommentRE = /\/\*.*?\*\//gs;
function parseStringStyle(cssText) {
  const ret = {};
  cssText.replace(styleCommentRE, "").split(listDelimiterRE).forEach((item) => {
    if (item) {
      const tmp = item.split(propertyDelimiterRE);
      tmp.length > 1 && (ret[tmp[0].trim()] = tmp[1].trim());
    }
  });
  return ret;
}
function normalizeClass(value) {
  let res = "";
  if (isString$1(value)) {
    res = value;
  } else if (isArray$1(value)) {
    for (let i = 0; i < value.length; i++) {
      const normalized = normalizeClass(value[i]);
      if (normalized) {
        res += normalized + " ";
      }
    }
  } else if (isObject$2(value)) {
    for (const name in value) {
      if (value[name]) {
        res += name + " ";
      }
    }
  }
  return res.trim();
}
const toDisplayString$1 = (val) => {
  return isString$1(val) ? val : val == null ? "" : isArray$1(val) || isObject$2(val) && (val.toString === objectToString$1 || !isFunction$1(val.toString)) ? JSON.stringify(val, replacer, 2) : String(val);
};
const replacer = (_key, val) => {
  if (val && val.__v_isRef) {
    return replacer(_key, val.value);
  } else if (isMap(val)) {
    return {
      [`Map(${val.size})`]: [...val.entries()].reduce((entries, [key, val2]) => {
        entries[`${key} =>`] = val2;
        return entries;
      }, {})
    };
  } else if (isSet(val)) {
    return {
      [`Set(${val.size})`]: [...val.values()]
    };
  } else if (isObject$2(val) && !isArray$1(val) && !isPlainObject$2(val)) {
    return String(val);
  }
  return val;
};
const EMPTY_OBJ = Object.freeze({});
const EMPTY_ARR = Object.freeze([]);
const NOOP = () => {
};
const NO = () => false;
const onRE = /^on[^a-z]/;
const isOn = (key) => onRE.test(key);
const isModelListener = (key) => key.startsWith("onUpdate:");
const extend = Object.assign;
const remove = (arr, el) => {
  const i = arr.indexOf(el);
  if (i > -1) {
    arr.splice(i, 1);
  }
};
const hasOwnProperty$3 = Object.prototype.hasOwnProperty;
const hasOwn$2 = (val, key) => hasOwnProperty$3.call(val, key);
const isArray$1 = Array.isArray;
const isMap = (val) => toTypeString$1(val) === "[object Map]";
const isSet = (val) => toTypeString$1(val) === "[object Set]";
const isFunction$1 = (val) => typeof val === "function";
const isString$1 = (val) => typeof val === "string";
const isSymbol = (val) => typeof val === "symbol";
const isObject$2 = (val) => val !== null && typeof val === "object";
const isPromise = (val) => {
  return isObject$2(val) && isFunction$1(val.then) && isFunction$1(val.catch);
};
const objectToString$1 = Object.prototype.toString;
const toTypeString$1 = (value) => objectToString$1.call(value);
const toRawType = (value) => {
  return toTypeString$1(value).slice(8, -1);
};
const isPlainObject$2 = (val) => toTypeString$1(val) === "[object Object]";
const isIntegerKey = (key) => isString$1(key) && key !== "NaN" && key[0] !== "-" && "" + parseInt(key, 10) === key;
const isReservedProp = /* @__PURE__ */ makeMap(
  // the leading comma is intentional so empty string "" is also included
  ",key,ref,ref_for,ref_key,onVnodeBeforeMount,onVnodeMounted,onVnodeBeforeUpdate,onVnodeUpdated,onVnodeBeforeUnmount,onVnodeUnmounted"
);
const isBuiltInDirective = /* @__PURE__ */ makeMap("bind,cloak,else-if,else,for,html,if,model,on,once,pre,show,slot,text,memo");
const cacheStringFunction = (fn) => {
  const cache2 = /* @__PURE__ */ Object.create(null);
  return (str) => {
    const hit = cache2[str];
    return hit || (cache2[str] = fn(str));
  };
};
const camelizeRE = /-(\w)/g;
const camelize = cacheStringFunction((str) => {
  return str.replace(camelizeRE, (_, c) => c ? c.toUpperCase() : "");
});
const hyphenateRE = /\B([A-Z])/g;
const hyphenate = cacheStringFunction((str) => str.replace(hyphenateRE, "-$1").toLowerCase());
const capitalize = cacheStringFunction((str) => str.charAt(0).toUpperCase() + str.slice(1));
const toHandlerKey = cacheStringFunction((str) => str ? `on${capitalize(str)}` : ``);
const hasChanged = (value, oldValue) => !Object.is(value, oldValue);
const invokeArrayFns$1 = (fns, arg) => {
  for (let i = 0; i < fns.length; i++) {
    fns[i](arg);
  }
};
const def = (obj, key, value) => {
  Object.defineProperty(obj, key, {
    configurable: true,
    enumerable: false,
    value
  });
};
const looseToNumber = (val) => {
  const n2 = parseFloat(val);
  return isNaN(n2) ? val : n2;
};
const LINEFEED = "\n";
const SLOT_DEFAULT_NAME = "d";
const ON_SHOW = "onShow";
const ON_HIDE = "onHide";
const ON_LAUNCH = "onLaunch";
const ON_ERROR = "onError";
const ON_THEME_CHANGE = "onThemeChange";
const ON_PAGE_NOT_FOUND = "onPageNotFound";
const ON_UNHANDLE_REJECTION = "onUnhandledRejection";
const ON_LOAD = "onLoad";
const ON_READY = "onReady";
const ON_UNLOAD = "onUnload";
const ON_INIT = "onInit";
const ON_SAVE_EXIT_STATE = "onSaveExitState";
const ON_RESIZE = "onResize";
const ON_BACK_PRESS = "onBackPress";
const ON_PAGE_SCROLL = "onPageScroll";
const ON_TAB_ITEM_TAP = "onTabItemTap";
const ON_REACH_BOTTOM = "onReachBottom";
const ON_PULL_DOWN_REFRESH = "onPullDownRefresh";
const ON_SHARE_TIMELINE = "onShareTimeline";
const ON_ADD_TO_FAVORITES = "onAddToFavorites";
const ON_SHARE_APP_MESSAGE = "onShareAppMessage";
const ON_NAVIGATION_BAR_BUTTON_TAP = "onNavigationBarButtonTap";
const ON_NAVIGATION_BAR_SEARCH_INPUT_CLICKED = "onNavigationBarSearchInputClicked";
const ON_NAVIGATION_BAR_SEARCH_INPUT_CHANGED = "onNavigationBarSearchInputChanged";
const ON_NAVIGATION_BAR_SEARCH_INPUT_CONFIRMED = "onNavigationBarSearchInputConfirmed";
const ON_NAVIGATION_BAR_SEARCH_INPUT_FOCUS_CHANGED = "onNavigationBarSearchInputFocusChanged";
const customizeRE = /:/g;
function customizeEvent(str) {
  return camelize(str.replace(customizeRE, "-"));
}
function hasLeadingSlash(str) {
  return str.indexOf("/") === 0;
}
function addLeadingSlash(str) {
  return hasLeadingSlash(str) ? str : "/" + str;
}
const invokeArrayFns = (fns, arg) => {
  let ret;
  for (let i = 0; i < fns.length; i++) {
    ret = fns[i](arg);
  }
  return ret;
};
function once(fn, ctx = null) {
  let res;
  return (...args) => {
    if (fn) {
      res = fn.apply(ctx, args);
      fn = null;
    }
    return res;
  };
}
function getValueByDataPath(obj, path) {
  if (!isString$1(path)) {
    return;
  }
  path = path.replace(/\[(\d+)\]/g, ".$1");
  const parts = path.split(".");
  let key = parts[0];
  if (!obj) {
    obj = {};
  }
  if (parts.length === 1) {
    return obj[key];
  }
  return getValueByDataPath(obj[key], parts.slice(1).join("."));
}
function sortObject(obj) {
  let sortObj = {};
  if (isPlainObject$2(obj)) {
    Object.keys(obj).sort().forEach((key) => {
      const _key = key;
      sortObj[_key] = obj[_key];
    });
  }
  return !Object.keys(sortObj) ? obj : sortObj;
}
const encode = encodeURIComponent;
function stringifyQuery(obj, encodeStr = encode) {
  const res = obj ? Object.keys(obj).map((key) => {
    let val = obj[key];
    if (typeof val === void 0 || val === null) {
      val = "";
    } else if (isPlainObject$2(val)) {
      val = JSON.stringify(val);
    }
    return encodeStr(key) + "=" + encodeStr(val);
  }).filter((x) => x.length > 0).join("&") : null;
  return res ? `?${res}` : "";
}
const PAGE_HOOKS = [
  ON_INIT,
  ON_LOAD,
  ON_SHOW,
  ON_HIDE,
  ON_UNLOAD,
  ON_BACK_PRESS,
  ON_PAGE_SCROLL,
  ON_TAB_ITEM_TAP,
  ON_REACH_BOTTOM,
  ON_PULL_DOWN_REFRESH,
  ON_SHARE_TIMELINE,
  ON_SHARE_APP_MESSAGE,
  ON_ADD_TO_FAVORITES,
  ON_SAVE_EXIT_STATE,
  ON_NAVIGATION_BAR_BUTTON_TAP,
  ON_NAVIGATION_BAR_SEARCH_INPUT_CLICKED,
  ON_NAVIGATION_BAR_SEARCH_INPUT_CHANGED,
  ON_NAVIGATION_BAR_SEARCH_INPUT_CONFIRMED,
  ON_NAVIGATION_BAR_SEARCH_INPUT_FOCUS_CHANGED
];
function isRootHook(name) {
  return PAGE_HOOKS.indexOf(name) > -1;
}
const UniLifecycleHooks = [
  ON_SHOW,
  ON_HIDE,
  ON_LAUNCH,
  ON_ERROR,
  ON_THEME_CHANGE,
  ON_PAGE_NOT_FOUND,
  ON_UNHANDLE_REJECTION,
  ON_INIT,
  ON_LOAD,
  ON_READY,
  ON_UNLOAD,
  ON_RESIZE,
  ON_BACK_PRESS,
  ON_PAGE_SCROLL,
  ON_TAB_ITEM_TAP,
  ON_REACH_BOTTOM,
  ON_PULL_DOWN_REFRESH,
  ON_SHARE_TIMELINE,
  ON_ADD_TO_FAVORITES,
  ON_SHARE_APP_MESSAGE,
  ON_SAVE_EXIT_STATE,
  ON_NAVIGATION_BAR_BUTTON_TAP,
  ON_NAVIGATION_BAR_SEARCH_INPUT_CLICKED,
  ON_NAVIGATION_BAR_SEARCH_INPUT_CHANGED,
  ON_NAVIGATION_BAR_SEARCH_INPUT_CONFIRMED,
  ON_NAVIGATION_BAR_SEARCH_INPUT_FOCUS_CHANGED
];
const MINI_PROGRAM_PAGE_RUNTIME_HOOKS = /* @__PURE__ */ (() => {
  return {
    onPageScroll: 1,
    onShareAppMessage: 1 << 1,
    onShareTimeline: 1 << 2
  };
})();
function isUniLifecycleHook(name, value, checkType = true) {
  if (checkType && !isFunction$1(value)) {
    return false;
  }
  if (UniLifecycleHooks.indexOf(name) > -1) {
    return true;
  } else if (name.indexOf("on") === 0) {
    return true;
  }
  return false;
}
let vueApp;
const createVueAppHooks = [];
function onCreateVueApp(hook) {
  if (vueApp) {
    return hook(vueApp);
  }
  createVueAppHooks.push(hook);
}
function invokeCreateVueAppHook(app) {
  vueApp = app;
  createVueAppHooks.forEach((hook) => hook(app));
}
const invokeCreateErrorHandler = once((app, createErrorHandler2) => {
  if (isFunction$1(app._component.onError)) {
    return createErrorHandler2(app);
  }
});
const E = function() {
};
E.prototype = {
  on: function(name, callback, ctx) {
    var e2 = this.e || (this.e = {});
    (e2[name] || (e2[name] = [])).push({
      fn: callback,
      ctx
    });
    return this;
  },
  once: function(name, callback, ctx) {
    var self2 = this;
    function listener() {
      self2.off(name, listener);
      callback.apply(ctx, arguments);
    }
    listener._ = callback;
    return this.on(name, listener, ctx);
  },
  emit: function(name) {
    var data = [].slice.call(arguments, 1);
    var evtArr = ((this.e || (this.e = {}))[name] || []).slice();
    var i = 0;
    var len = evtArr.length;
    for (i; i < len; i++) {
      evtArr[i].fn.apply(evtArr[i].ctx, data);
    }
    return this;
  },
  off: function(name, callback) {
    var e2 = this.e || (this.e = {});
    var evts = e2[name];
    var liveEvents = [];
    if (evts && callback) {
      for (var i = 0, len = evts.length; i < len; i++) {
        if (evts[i].fn !== callback && evts[i].fn._ !== callback)
          liveEvents.push(evts[i]);
      }
    }
    liveEvents.length ? e2[name] = liveEvents : delete e2[name];
    return this;
  }
};
var E$1 = E;
const LOCALE_ZH_HANS = "zh-Hans";
const LOCALE_ZH_HANT = "zh-Hant";
const LOCALE_EN = "en";
const LOCALE_FR = "fr";
const LOCALE_ES = "es";
function include(str, parts) {
  return !!parts.find((part) => str.indexOf(part) !== -1);
}
function startsWith(str, parts) {
  return parts.find((part) => str.indexOf(part) === 0);
}
function normalizeLocale(locale, messages) {
  if (!locale) {
    return;
  }
  locale = locale.trim().replace(/_/g, "-");
  if (messages && messages[locale]) {
    return locale;
  }
  locale = locale.toLowerCase();
  if (locale === "chinese") {
    return LOCALE_ZH_HANS;
  }
  if (locale.indexOf("zh") === 0) {
    if (locale.indexOf("-hans") > -1) {
      return LOCALE_ZH_HANS;
    }
    if (locale.indexOf("-hant") > -1) {
      return LOCALE_ZH_HANT;
    }
    if (include(locale, ["-tw", "-hk", "-mo", "-cht"])) {
      return LOCALE_ZH_HANT;
    }
    return LOCALE_ZH_HANS;
  }
  let locales = [LOCALE_EN, LOCALE_FR, LOCALE_ES];
  if (messages && Object.keys(messages).length > 0) {
    locales = Object.keys(messages);
  }
  const lang = startsWith(locale, locales);
  if (lang) {
    return lang;
  }
}
function getBaseSystemInfo() {
  return wx.getSystemInfoSync();
}
function validateProtocolFail(name, msg) {
  console.warn(`${name}: ${msg}`);
}
function validateProtocol(name, data, protocol, onFail) {
  if (!onFail) {
    onFail = validateProtocolFail;
  }
  for (const key in protocol) {
    const errMsg = validateProp$1(key, data[key], protocol[key], !hasOwn$2(data, key));
    if (isString$1(errMsg)) {
      onFail(name, errMsg);
    }
  }
}
function validateProtocols(name, args, protocol, onFail) {
  if (!protocol) {
    return;
  }
  if (!isArray$1(protocol)) {
    return validateProtocol(name, args[0] || /* @__PURE__ */ Object.create(null), protocol, onFail);
  }
  const len = protocol.length;
  const argsLen = args.length;
  for (let i = 0; i < len; i++) {
    const opts = protocol[i];
    const data = /* @__PURE__ */ Object.create(null);
    if (argsLen > i) {
      data[opts.name] = args[i];
    }
    validateProtocol(name, data, { [opts.name]: opts }, onFail);
  }
}
function validateProp$1(name, value, prop, isAbsent) {
  if (!isPlainObject$2(prop)) {
    prop = { type: prop };
  }
  const { type, required, validator } = prop;
  if (required && isAbsent) {
    return 'Missing required args: "' + name + '"';
  }
  if (value == null && !required) {
    return;
  }
  if (type != null) {
    let isValid = false;
    const types = isArray$1(type) ? type : [type];
    const expectedTypes = [];
    for (let i = 0; i < types.length && !isValid; i++) {
      const { valid, expectedType } = assertType$1(value, types[i]);
      expectedTypes.push(expectedType || "");
      isValid = valid;
    }
    if (!isValid) {
      return getInvalidTypeMessage$1(name, value, expectedTypes);
    }
  }
  if (validator) {
    return validator(value);
  }
}
const isSimpleType$1 = /* @__PURE__ */ makeMap("String,Number,Boolean,Function,Symbol");
function assertType$1(value, type) {
  let valid;
  const expectedType = getType$1(type);
  if (isSimpleType$1(expectedType)) {
    const t2 = typeof value;
    valid = t2 === expectedType.toLowerCase();
    if (!valid && t2 === "object") {
      valid = value instanceof type;
    }
  } else if (expectedType === "Object") {
    valid = isObject$2(value);
  } else if (expectedType === "Array") {
    valid = isArray$1(value);
  } else {
    {
      valid = value instanceof type;
    }
  }
  return {
    valid,
    expectedType
  };
}
function getInvalidTypeMessage$1(name, value, expectedTypes) {
  let message = `Invalid args: type check failed for args "${name}". Expected ${expectedTypes.map(capitalize).join(", ")}`;
  const expectedType = expectedTypes[0];
  const receivedType = toRawType(value);
  const expectedValue = styleValue$1(value, expectedType);
  const receivedValue = styleValue$1(value, receivedType);
  if (expectedTypes.length === 1 && isExplicable$1(expectedType) && !isBoolean$2(expectedType, receivedType)) {
    message += ` with value ${expectedValue}`;
  }
  message += `, got ${receivedType} `;
  if (isExplicable$1(receivedType)) {
    message += `with value ${receivedValue}.`;
  }
  return message;
}
function getType$1(ctor) {
  const match = ctor && ctor.toString().match(/^\s*function (\w+)/);
  return match ? match[1] : "";
}
function styleValue$1(value, type) {
  if (type === "String") {
    return `"${value}"`;
  } else if (type === "Number") {
    return `${Number(value)}`;
  } else {
    return `${value}`;
  }
}
function isExplicable$1(type) {
  const explicitTypes = ["string", "number", "boolean"];
  return explicitTypes.some((elem) => type.toLowerCase() === elem);
}
function isBoolean$2(...args) {
  return args.some((elem) => elem.toLowerCase() === "boolean");
}
function tryCatch(fn) {
  return function() {
    try {
      return fn.apply(fn, arguments);
    } catch (e2) {
      console.error(e2);
    }
  };
}
let invokeCallbackId = 1;
const invokeCallbacks = {};
function addInvokeCallback(id, name, callback, keepAlive = false) {
  invokeCallbacks[id] = {
    name,
    keepAlive,
    callback
  };
  return id;
}
function invokeCallback(id, res, extras) {
  if (typeof id === "number") {
    const opts = invokeCallbacks[id];
    if (opts) {
      if (!opts.keepAlive) {
        delete invokeCallbacks[id];
      }
      return opts.callback(res, extras);
    }
  }
  return res;
}
const API_SUCCESS = "success";
const API_FAIL = "fail";
const API_COMPLETE = "complete";
function getApiCallbacks(args) {
  const apiCallbacks = {};
  for (const name in args) {
    const fn = args[name];
    if (isFunction$1(fn)) {
      apiCallbacks[name] = tryCatch(fn);
      delete args[name];
    }
  }
  return apiCallbacks;
}
function normalizeErrMsg$1(errMsg, name) {
  if (!errMsg || errMsg.indexOf(":fail") === -1) {
    return name + ":ok";
  }
  return name + errMsg.substring(errMsg.indexOf(":fail"));
}
function createAsyncApiCallback(name, args = {}, { beforeAll, beforeSuccess } = {}) {
  if (!isPlainObject$2(args)) {
    args = {};
  }
  const { success, fail, complete } = getApiCallbacks(args);
  const hasSuccess = isFunction$1(success);
  const hasFail = isFunction$1(fail);
  const hasComplete = isFunction$1(complete);
  const callbackId = invokeCallbackId++;
  addInvokeCallback(callbackId, name, (res) => {
    res = res || {};
    res.errMsg = normalizeErrMsg$1(res.errMsg, name);
    isFunction$1(beforeAll) && beforeAll(res);
    if (res.errMsg === name + ":ok") {
      isFunction$1(beforeSuccess) && beforeSuccess(res, args);
      hasSuccess && success(res);
    } else {
      hasFail && fail(res);
    }
    hasComplete && complete(res);
  });
  return callbackId;
}
const HOOK_SUCCESS = "success";
const HOOK_FAIL = "fail";
const HOOK_COMPLETE = "complete";
const globalInterceptors = {};
const scopedInterceptors = {};
function wrapperHook(hook, params) {
  return function(data) {
    return hook(data, params) || data;
  };
}
function queue$1(hooks, data, params) {
  let promise = false;
  for (let i = 0; i < hooks.length; i++) {
    const hook = hooks[i];
    if (promise) {
      promise = Promise.resolve(wrapperHook(hook, params));
    } else {
      const res = hook(data, params);
      if (isPromise(res)) {
        promise = Promise.resolve(res);
      }
      if (res === false) {
        return {
          then() {
          },
          catch() {
          }
        };
      }
    }
  }
  return promise || {
    then(callback) {
      return callback(data);
    },
    catch() {
    }
  };
}
function wrapperOptions(interceptors2, options = {}) {
  [HOOK_SUCCESS, HOOK_FAIL, HOOK_COMPLETE].forEach((name) => {
    const hooks = interceptors2[name];
    if (!isArray$1(hooks)) {
      return;
    }
    const oldCallback = options[name];
    options[name] = function callbackInterceptor(res) {
      queue$1(hooks, res, options).then((res2) => {
        return isFunction$1(oldCallback) && oldCallback(res2) || res2;
      });
    };
  });
  return options;
}
function wrapperReturnValue(method, returnValue) {
  const returnValueHooks = [];
  if (isArray$1(globalInterceptors.returnValue)) {
    returnValueHooks.push(...globalInterceptors.returnValue);
  }
  const interceptor = scopedInterceptors[method];
  if (interceptor && isArray$1(interceptor.returnValue)) {
    returnValueHooks.push(...interceptor.returnValue);
  }
  returnValueHooks.forEach((hook) => {
    returnValue = hook(returnValue) || returnValue;
  });
  return returnValue;
}
function getApiInterceptorHooks(method) {
  const interceptor = /* @__PURE__ */ Object.create(null);
  Object.keys(globalInterceptors).forEach((hook) => {
    if (hook !== "returnValue") {
      interceptor[hook] = globalInterceptors[hook].slice();
    }
  });
  const scopedInterceptor = scopedInterceptors[method];
  if (scopedInterceptor) {
    Object.keys(scopedInterceptor).forEach((hook) => {
      if (hook !== "returnValue") {
        interceptor[hook] = (interceptor[hook] || []).concat(scopedInterceptor[hook]);
      }
    });
  }
  return interceptor;
}
function invokeApi(method, api, options, params) {
  const interceptor = getApiInterceptorHooks(method);
  if (interceptor && Object.keys(interceptor).length) {
    if (isArray$1(interceptor.invoke)) {
      const res = queue$1(interceptor.invoke, options);
      return res.then((options2) => {
        return api(wrapperOptions(getApiInterceptorHooks(method), options2), ...params);
      });
    } else {
      return api(wrapperOptions(interceptor, options), ...params);
    }
  }
  return api(options, ...params);
}
function hasCallback(args) {
  if (isPlainObject$2(args) && [API_SUCCESS, API_FAIL, API_COMPLETE].find((cb) => isFunction$1(args[cb]))) {
    return true;
  }
  return false;
}
function handlePromise(promise) {
  return promise;
}
function promisify$1(name, fn) {
  return (args = {}, ...rest) => {
    if (hasCallback(args)) {
      return wrapperReturnValue(name, invokeApi(name, fn, args, rest));
    }
    return wrapperReturnValue(name, handlePromise(new Promise((resolve2, reject) => {
      invokeApi(name, fn, extend(args, { success: resolve2, fail: reject }), rest);
    })));
  };
}
function formatApiArgs(args, options) {
  const params = args[0];
  if (!options || !isPlainObject$2(options.formatArgs) && isPlainObject$2(params)) {
    return;
  }
  const formatArgs = options.formatArgs;
  const keys = Object.keys(formatArgs);
  for (let i = 0; i < keys.length; i++) {
    const name = keys[i];
    const formatterOrDefaultValue = formatArgs[name];
    if (isFunction$1(formatterOrDefaultValue)) {
      const errMsg = formatterOrDefaultValue(args[0][name], params);
      if (isString$1(errMsg)) {
        return errMsg;
      }
    } else {
      if (!hasOwn$2(params, name)) {
        params[name] = formatterOrDefaultValue;
      }
    }
  }
}
function invokeSuccess(id, name, res) {
  return invokeCallback(id, extend(res || {}, { errMsg: name + ":ok" }));
}
function invokeFail(id, name, errMsg, errRes) {
  return invokeCallback(id, extend({ errMsg: name + ":fail" + (errMsg ? " " + errMsg : "") }, errRes));
}
function beforeInvokeApi(name, args, protocol, options) {
  {
    validateProtocols(name, args, protocol);
  }
  if (options && options.beforeInvoke) {
    const errMsg2 = options.beforeInvoke(args);
    if (isString$1(errMsg2)) {
      return errMsg2;
    }
  }
  const errMsg = formatApiArgs(args, options);
  if (errMsg) {
    return errMsg;
  }
}
function normalizeErrMsg(errMsg) {
  if (!errMsg || isString$1(errMsg)) {
    return errMsg;
  }
  if (errMsg.stack) {
    console.error(errMsg.message + LINEFEED + errMsg.stack);
    return errMsg.message;
  }
  return errMsg;
}
function wrapperTaskApi(name, fn, protocol, options) {
  return (args) => {
    const id = createAsyncApiCallback(name, args, options);
    const errMsg = beforeInvokeApi(name, [args], protocol, options);
    if (errMsg) {
      return invokeFail(id, name, errMsg);
    }
    return fn(args, {
      resolve: (res) => invokeSuccess(id, name, res),
      reject: (errMsg2, errRes) => invokeFail(id, name, normalizeErrMsg(errMsg2), errRes)
    });
  };
}
function wrapperSyncApi(name, fn, protocol, options) {
  return (...args) => {
    const errMsg = beforeInvokeApi(name, args, protocol, options);
    if (errMsg) {
      throw new Error(errMsg);
    }
    return fn.apply(null, args);
  };
}
function wrapperAsyncApi(name, fn, protocol, options) {
  return wrapperTaskApi(name, fn, protocol, options);
}
function defineSyncApi(name, fn, protocol, options) {
  return wrapperSyncApi(name, fn, protocol, options);
}
function defineAsyncApi(name, fn, protocol, options) {
  return promisify$1(name, wrapperAsyncApi(name, fn, protocol, options));
}
const API_UPX2PX = "upx2px";
const Upx2pxProtocol = [
  {
    name: "upx",
    type: [Number, String],
    required: true
  }
];
const EPS = 1e-4;
const BASE_DEVICE_WIDTH = 750;
let isIOS = false;
let deviceWidth = 0;
let deviceDPR = 0;
function checkDeviceWidth() {
  const { platform, pixelRatio, windowWidth } = getBaseSystemInfo();
  deviceWidth = windowWidth;
  deviceDPR = pixelRatio;
  isIOS = platform === "ios";
}
const upx2px = defineSyncApi(API_UPX2PX, (number2, newDeviceWidth) => {
  if (deviceWidth === 0) {
    checkDeviceWidth();
  }
  number2 = Number(number2);
  if (number2 === 0) {
    return 0;
  }
  let width = newDeviceWidth || deviceWidth;
  let result = number2 / BASE_DEVICE_WIDTH * width;
  if (result < 0) {
    result = -result;
  }
  result = Math.floor(result + EPS);
  if (result === 0) {
    if (deviceDPR === 1 || !isIOS) {
      result = 1;
    } else {
      result = 0.5;
    }
  }
  return number2 < 0 ? -result : result;
}, Upx2pxProtocol);
const API_ADD_INTERCEPTOR = "addInterceptor";
const API_REMOVE_INTERCEPTOR = "removeInterceptor";
const AddInterceptorProtocol = [
  {
    name: "method",
    type: [String, Object],
    required: true
  }
];
const RemoveInterceptorProtocol = AddInterceptorProtocol;
function mergeInterceptorHook(interceptors2, interceptor) {
  Object.keys(interceptor).forEach((hook) => {
    if (isFunction$1(interceptor[hook])) {
      interceptors2[hook] = mergeHook(interceptors2[hook], interceptor[hook]);
    }
  });
}
function removeInterceptorHook(interceptors2, interceptor) {
  if (!interceptors2 || !interceptor) {
    return;
  }
  Object.keys(interceptor).forEach((name) => {
    const hooks = interceptors2[name];
    const hook = interceptor[name];
    if (isArray$1(hooks) && isFunction$1(hook)) {
      remove(hooks, hook);
    }
  });
}
function mergeHook(parentVal, childVal) {
  const res = childVal ? parentVal ? parentVal.concat(childVal) : isArray$1(childVal) ? childVal : [childVal] : parentVal;
  return res ? dedupeHooks(res) : res;
}
function dedupeHooks(hooks) {
  const res = [];
  for (let i = 0; i < hooks.length; i++) {
    if (res.indexOf(hooks[i]) === -1) {
      res.push(hooks[i]);
    }
  }
  return res;
}
const addInterceptor = defineSyncApi(API_ADD_INTERCEPTOR, (method, interceptor) => {
  if (isString$1(method) && isPlainObject$2(interceptor)) {
    mergeInterceptorHook(scopedInterceptors[method] || (scopedInterceptors[method] = {}), interceptor);
  } else if (isPlainObject$2(method)) {
    mergeInterceptorHook(globalInterceptors, method);
  }
}, AddInterceptorProtocol);
const removeInterceptor = defineSyncApi(API_REMOVE_INTERCEPTOR, (method, interceptor) => {
  if (isString$1(method)) {
    if (isPlainObject$2(interceptor)) {
      removeInterceptorHook(scopedInterceptors[method], interceptor);
    } else {
      delete scopedInterceptors[method];
    }
  } else if (isPlainObject$2(method)) {
    removeInterceptorHook(globalInterceptors, method);
  }
}, RemoveInterceptorProtocol);
const interceptors = {};
const API_ON = "$on";
const OnProtocol = [
  {
    name: "event",
    type: String,
    required: true
  },
  {
    name: "callback",
    type: Function,
    required: true
  }
];
const API_ONCE = "$once";
const OnceProtocol = OnProtocol;
const API_OFF = "$off";
const OffProtocol = [
  {
    name: "event",
    type: [String, Array]
  },
  {
    name: "callback",
    type: Function
  }
];
const API_EMIT = "$emit";
const EmitProtocol = [
  {
    name: "event",
    type: String,
    required: true
  }
];
const emitter = new E$1();
const $on = defineSyncApi(API_ON, (name, callback) => {
  emitter.on(name, callback);
  return () => emitter.off(name, callback);
}, OnProtocol);
const $once = defineSyncApi(API_ONCE, (name, callback) => {
  emitter.once(name, callback);
  return () => emitter.off(name, callback);
}, OnceProtocol);
const $off = defineSyncApi(API_OFF, (name, callback) => {
  if (!name) {
    emitter.e = {};
    return;
  }
  if (!isArray$1(name))
    name = [name];
  name.forEach((n2) => emitter.off(n2, callback));
}, OffProtocol);
const $emit = defineSyncApi(API_EMIT, (name, ...args) => {
  emitter.emit(name, ...args);
}, EmitProtocol);
let cid;
let cidErrMsg;
let enabled;
function normalizePushMessage(message) {
  try {
    return JSON.parse(message);
  } catch (e2) {
  }
  return message;
}
function invokePushCallback(args) {
  if (args.type === "enabled") {
    enabled = true;
  } else if (args.type === "clientId") {
    cid = args.cid;
    cidErrMsg = args.errMsg;
    invokeGetPushCidCallbacks(cid, args.errMsg);
  } else if (args.type === "pushMsg") {
    const message = {
      type: "receive",
      data: normalizePushMessage(args.message)
    };
    for (let i = 0; i < onPushMessageCallbacks.length; i++) {
      const callback = onPushMessageCallbacks[i];
      callback(message);
      if (message.stopped) {
        break;
      }
    }
  } else if (args.type === "click") {
    onPushMessageCallbacks.forEach((callback) => {
      callback({
        type: "click",
        data: normalizePushMessage(args.message)
      });
    });
  }
}
const getPushCidCallbacks = [];
function invokeGetPushCidCallbacks(cid2, errMsg) {
  getPushCidCallbacks.forEach((callback) => {
    callback(cid2, errMsg);
  });
  getPushCidCallbacks.length = 0;
}
const API_GET_PUSH_CLIENT_ID = "getPushClientId";
const getPushClientId = defineAsyncApi(API_GET_PUSH_CLIENT_ID, (_, { resolve: resolve2, reject }) => {
  Promise.resolve().then(() => {
    if (typeof enabled === "undefined") {
      enabled = false;
      cid = "";
      cidErrMsg = "uniPush is not enabled";
    }
    getPushCidCallbacks.push((cid2, errMsg) => {
      if (cid2) {
        resolve2({ cid: cid2 });
      } else {
        reject(errMsg);
      }
    });
    if (typeof cid !== "undefined") {
      invokeGetPushCidCallbacks(cid, cidErrMsg);
    }
  });
});
const onPushMessageCallbacks = [];
const onPushMessage = (fn) => {
  if (onPushMessageCallbacks.indexOf(fn) === -1) {
    onPushMessageCallbacks.push(fn);
  }
};
const offPushMessage = (fn) => {
  if (!fn) {
    onPushMessageCallbacks.length = 0;
  } else {
    const index2 = onPushMessageCallbacks.indexOf(fn);
    if (index2 > -1) {
      onPushMessageCallbacks.splice(index2, 1);
    }
  }
};
const SYNC_API_RE = /^\$|getLocale|setLocale|sendNativeEvent|restoreGlobal|requireGlobal|getCurrentSubNVue|getMenuButtonBoundingClientRect|^report|interceptors|Interceptor$|getSubNVueById|requireNativePlugin|upx2px|hideKeyboard|canIUse|^create|Sync$|Manager$|base64ToArrayBuffer|arrayBufferToBase64|getDeviceInfo|getAppBaseInfo|getWindowInfo|getSystemSetting|getAppAuthorizeSetting/;
const CONTEXT_API_RE = /^create|Manager$/;
const CONTEXT_API_RE_EXC = ["createBLEConnection"];
const ASYNC_API = ["createBLEConnection"];
const CALLBACK_API_RE = /^on|^off/;
function isContextApi(name) {
  return CONTEXT_API_RE.test(name) && CONTEXT_API_RE_EXC.indexOf(name) === -1;
}
function isSyncApi(name) {
  return SYNC_API_RE.test(name) && ASYNC_API.indexOf(name) === -1;
}
function isCallbackApi(name) {
  return CALLBACK_API_RE.test(name) && name !== "onPush";
}
function shouldPromise(name) {
  if (isContextApi(name) || isSyncApi(name) || isCallbackApi(name)) {
    return false;
  }
  return true;
}
if (!Promise.prototype.finally) {
  Promise.prototype.finally = function(onfinally) {
    const promise = this.constructor;
    return this.then((value) => promise.resolve(onfinally && onfinally()).then(() => value), (reason) => promise.resolve(onfinally && onfinally()).then(() => {
      throw reason;
    }));
  };
}
function promisify(name, api) {
  if (!shouldPromise(name)) {
    return api;
  }
  if (!isFunction$1(api)) {
    return api;
  }
  return function promiseApi(options = {}, ...rest) {
    if (isFunction$1(options.success) || isFunction$1(options.fail) || isFunction$1(options.complete)) {
      return wrapperReturnValue(name, invokeApi(name, api, options, rest));
    }
    return wrapperReturnValue(name, handlePromise(new Promise((resolve2, reject) => {
      invokeApi(name, api, extend({}, options, {
        success: resolve2,
        fail: reject
      }), rest);
    })));
  };
}
const CALLBACKS = ["success", "fail", "cancel", "complete"];
function initWrapper(protocols2) {
  function processCallback(methodName, method, returnValue) {
    return function(res) {
      return method(processReturnValue(methodName, res, returnValue));
    };
  }
  function processArgs(methodName, fromArgs, argsOption = {}, returnValue = {}, keepFromArgs = false) {
    if (isPlainObject$2(fromArgs)) {
      const toArgs = keepFromArgs === true ? fromArgs : {};
      if (isFunction$1(argsOption)) {
        argsOption = argsOption(fromArgs, toArgs) || {};
      }
      for (const key in fromArgs) {
        if (hasOwn$2(argsOption, key)) {
          let keyOption = argsOption[key];
          if (isFunction$1(keyOption)) {
            keyOption = keyOption(fromArgs[key], fromArgs, toArgs);
          }
          if (!keyOption) {
            console.warn(`微信小程序 ${methodName} 暂不支持 ${key}`);
          } else if (isString$1(keyOption)) {
            toArgs[keyOption] = fromArgs[key];
          } else if (isPlainObject$2(keyOption)) {
            toArgs[keyOption.name ? keyOption.name : key] = keyOption.value;
          }
        } else if (CALLBACKS.indexOf(key) !== -1) {
          const callback = fromArgs[key];
          if (isFunction$1(callback)) {
            toArgs[key] = processCallback(methodName, callback, returnValue);
          }
        } else {
          if (!keepFromArgs && !hasOwn$2(toArgs, key)) {
            toArgs[key] = fromArgs[key];
          }
        }
      }
      return toArgs;
    } else if (isFunction$1(fromArgs)) {
      fromArgs = processCallback(methodName, fromArgs, returnValue);
    }
    return fromArgs;
  }
  function processReturnValue(methodName, res, returnValue, keepReturnValue = false) {
    if (isFunction$1(protocols2.returnValue)) {
      res = protocols2.returnValue(methodName, res);
    }
    return processArgs(methodName, res, returnValue, {}, keepReturnValue);
  }
  return function wrapper(methodName, method) {
    if (!hasOwn$2(protocols2, methodName)) {
      return method;
    }
    const protocol = protocols2[methodName];
    if (!protocol) {
      return function() {
        console.error(`微信小程序 暂不支持${methodName}`);
      };
    }
    return function(arg1, arg2) {
      let options = protocol;
      if (isFunction$1(protocol)) {
        options = protocol(arg1);
      }
      arg1 = processArgs(methodName, arg1, options.args, options.returnValue);
      const args = [arg1];
      if (typeof arg2 !== "undefined") {
        args.push(arg2);
      }
      const returnValue = wx[options.name || methodName].apply(wx, args);
      if (isSyncApi(methodName)) {
        return processReturnValue(methodName, returnValue, options.returnValue, isContextApi(methodName));
      }
      return returnValue;
    };
  };
}
const getLocale = () => {
  const app = isFunction$1(getApp) && getApp({ allowDefault: true });
  if (app && app.$vm) {
    return app.$vm.$locale;
  }
  return normalizeLocale(wx.getSystemInfoSync().language) || LOCALE_EN;
};
const setLocale = (locale) => {
  const app = isFunction$1(getApp) && getApp();
  if (!app) {
    return false;
  }
  const oldLocale = app.$vm.$locale;
  if (oldLocale !== locale) {
    app.$vm.$locale = locale;
    onLocaleChangeCallbacks.forEach((fn) => fn({ locale }));
    return true;
  }
  return false;
};
const onLocaleChangeCallbacks = [];
const onLocaleChange = (fn) => {
  if (onLocaleChangeCallbacks.indexOf(fn) === -1) {
    onLocaleChangeCallbacks.push(fn);
  }
};
if (typeof global !== "undefined") {
  global.getLocale = getLocale;
}
const UUID_KEY = "__DC_STAT_UUID";
let deviceId;
function useDeviceId(global2 = wx) {
  return function addDeviceId(_, toRes) {
    deviceId = deviceId || global2.getStorageSync(UUID_KEY);
    if (!deviceId) {
      deviceId = Date.now() + "" + Math.floor(Math.random() * 1e7);
      wx.setStorage({
        key: UUID_KEY,
        data: deviceId
      });
    }
    toRes.deviceId = deviceId;
  };
}
function addSafeAreaInsets(fromRes, toRes) {
  if (fromRes.safeArea) {
    const safeArea = fromRes.safeArea;
    toRes.safeAreaInsets = {
      top: safeArea.top,
      left: safeArea.left,
      right: fromRes.windowWidth - safeArea.right,
      bottom: fromRes.screenHeight - safeArea.bottom
    };
  }
}
function populateParameters(fromRes, toRes) {
  const { brand = "", model = "", system = "", language = "", theme, version: version2, platform, fontSizeSetting, SDKVersion, pixelRatio, deviceOrientation } = fromRes;
  let osName = "";
  let osVersion = "";
  {
    osName = system.split(" ")[0] || "";
    osVersion = system.split(" ")[1] || "";
  }
  let hostVersion = version2;
  let deviceType = getGetDeviceType(fromRes, model);
  let deviceBrand = getDeviceBrand(brand);
  let _hostName = getHostName(fromRes);
  let _deviceOrientation = deviceOrientation;
  let _devicePixelRatio = pixelRatio;
  let _SDKVersion = SDKVersion;
  const hostLanguage = language.replace(/_/g, "-");
  const parameters = {
    appId: "wxdde27f8eb91d7f16",
    appName: "裕农通旅游微信小程序",
    appVersion: "3.1.06",
    appVersionCode: "100",
    appLanguage: getAppLanguage(hostLanguage),
    uniCompileVersion: "3.8.4",
    uniRuntimeVersion: "3.8.4",
    uniPlatform: "mp-weixin",
    deviceBrand,
    deviceModel: model,
    deviceType,
    devicePixelRatio: _devicePixelRatio,
    deviceOrientation: _deviceOrientation,
    osName: osName.toLocaleLowerCase(),
    osVersion,
    hostTheme: theme,
    hostVersion,
    hostLanguage,
    hostName: _hostName,
    hostSDKVersion: _SDKVersion,
    hostFontSizeSetting: fontSizeSetting,
    windowTop: 0,
    windowBottom: 0,
    // TODO
    osLanguage: void 0,
    osTheme: void 0,
    ua: void 0,
    hostPackageName: void 0,
    browserName: void 0,
    browserVersion: void 0
  };
  extend(toRes, parameters);
}
function getGetDeviceType(fromRes, model) {
  let deviceType = fromRes.deviceType || "phone";
  {
    const deviceTypeMaps = {
      ipad: "pad",
      windows: "pc",
      mac: "pc"
    };
    const deviceTypeMapsKeys = Object.keys(deviceTypeMaps);
    const _model = model.toLocaleLowerCase();
    for (let index2 = 0; index2 < deviceTypeMapsKeys.length; index2++) {
      const _m = deviceTypeMapsKeys[index2];
      if (_model.indexOf(_m) !== -1) {
        deviceType = deviceTypeMaps[_m];
        break;
      }
    }
  }
  return deviceType;
}
function getDeviceBrand(brand) {
  let deviceBrand = brand;
  if (deviceBrand) {
    deviceBrand = deviceBrand.toLocaleLowerCase();
  }
  return deviceBrand;
}
function getAppLanguage(defaultLanguage) {
  return getLocale ? getLocale() : defaultLanguage;
}
function getHostName(fromRes) {
  const _platform = "WeChat";
  let _hostName = fromRes.hostName || _platform;
  {
    if (fromRes.environment) {
      _hostName = fromRes.environment;
    } else if (fromRes.host && fromRes.host.env) {
      _hostName = fromRes.host.env;
    }
  }
  return _hostName;
}
const getSystemInfo = {
  returnValue: (fromRes, toRes) => {
    addSafeAreaInsets(fromRes, toRes);
    useDeviceId()(fromRes, toRes);
    populateParameters(fromRes, toRes);
  }
};
const getSystemInfoSync = getSystemInfo;
const redirectTo = {};
const previewImage = {
  args(fromArgs, toArgs) {
    let currentIndex = parseInt(fromArgs.current);
    if (isNaN(currentIndex)) {
      return;
    }
    const urls = fromArgs.urls;
    if (!isArray$1(urls)) {
      return;
    }
    const len = urls.length;
    if (!len) {
      return;
    }
    if (currentIndex < 0) {
      currentIndex = 0;
    } else if (currentIndex >= len) {
      currentIndex = len - 1;
    }
    if (currentIndex > 0) {
      toArgs.current = urls[currentIndex];
      toArgs.urls = urls.filter((item, index2) => index2 < currentIndex ? item !== urls[currentIndex] : true);
    } else {
      toArgs.current = urls[0];
    }
    return {
      indicator: false,
      loop: false
    };
  }
};
const showActionSheet = {
  args(fromArgs, toArgs) {
    toArgs.alertText = fromArgs.title;
  }
};
const getDeviceInfo = {
  returnValue: (fromRes, toRes) => {
    const { brand, model } = fromRes;
    let deviceType = getGetDeviceType(fromRes, model);
    let deviceBrand = getDeviceBrand(brand);
    useDeviceId()(fromRes, toRes);
    toRes = sortObject(extend(toRes, {
      deviceType,
      deviceBrand,
      deviceModel: model
    }));
  }
};
const getAppBaseInfo = {
  returnValue: (fromRes, toRes) => {
    const { version: version2, language, SDKVersion, theme } = fromRes;
    let _hostName = getHostName(fromRes);
    let hostLanguage = language.replace(/_/g, "-");
    toRes = sortObject(extend(toRes, {
      hostVersion: version2,
      hostLanguage,
      hostName: _hostName,
      hostSDKVersion: SDKVersion,
      hostTheme: theme,
      appId: "wxdde27f8eb91d7f16",
      appName: "裕农通旅游微信小程序",
      appVersion: "3.1.06",
      appVersionCode: "100",
      appLanguage: getAppLanguage(hostLanguage)
    }));
  }
};
const getWindowInfo = {
  returnValue: (fromRes, toRes) => {
    addSafeAreaInsets(fromRes, toRes);
    toRes = sortObject(extend(toRes, {
      windowTop: 0,
      windowBottom: 0
    }));
  }
};
const getAppAuthorizeSetting = {
  returnValue: function(fromRes, toRes) {
    const { locationReducedAccuracy } = fromRes;
    toRes.locationAccuracy = "unsupported";
    if (locationReducedAccuracy === true) {
      toRes.locationAccuracy = "reduced";
    } else if (locationReducedAccuracy === false) {
      toRes.locationAccuracy = "full";
    }
  }
};
const baseApis = {
  $on,
  $off,
  $once,
  $emit,
  upx2px,
  interceptors,
  addInterceptor,
  removeInterceptor,
  onCreateVueApp,
  invokeCreateVueAppHook,
  getLocale,
  setLocale,
  onLocaleChange,
  getPushClientId,
  onPushMessage,
  offPushMessage,
  invokePushCallback
};
function initUni(api, protocols2, platform = wx) {
  const wrapper = initWrapper(protocols2);
  const UniProxyHandlers = {
    get(target, key) {
      if (hasOwn$2(target, key)) {
        return target[key];
      }
      if (hasOwn$2(api, key)) {
        return promisify(key, api[key]);
      }
      if (hasOwn$2(baseApis, key)) {
        return promisify(key, baseApis[key]);
      }
      return promisify(key, wrapper(key, platform[key]));
    }
  };
  return new Proxy({}, UniProxyHandlers);
}
function initGetProvider(providers) {
  return function getProvider2({ service, success, fail, complete }) {
    let res;
    if (providers[service]) {
      res = {
        errMsg: "getProvider:ok",
        service,
        provider: providers[service]
      };
      isFunction$1(success) && success(res);
    } else {
      res = {
        errMsg: "getProvider:fail:服务[" + service + "]不存在"
      };
      isFunction$1(fail) && fail(res);
    }
    isFunction$1(complete) && complete(res);
  };
}
const objectKeys = [
  "qy",
  "env",
  "error",
  "version",
  "lanDebug",
  "cloud",
  "serviceMarket",
  "router",
  "worklet"
];
const singlePageDisableKey = ["lanDebug", "router", "worklet"];
const launchOption = wx.getLaunchOptionsSync ? wx.getLaunchOptionsSync() : null;
function isWxKey(key) {
  if (launchOption && launchOption.scene === 1154 && singlePageDisableKey.includes(key)) {
    return false;
  }
  return objectKeys.indexOf(key) > -1 || typeof wx[key] === "function";
}
function initWx() {
  let global2 = wx;
  if (typeof globalThis !== "undefined" && globalThis.wx && wx !== globalThis.wx) {
    global2 = globalThis.wx;
  }
  const newWx = {};
  for (const key in global2) {
    if (isWxKey(key)) {
      newWx[key] = global2[key];
    }
  }
  if (typeof globalThis !== "undefined") {
    globalThis.wx = newWx;
  }
  return newWx;
}
const mocks$1 = ["__route__", "__wxExparserNodeId__", "__wxWebviewId__"];
const getProvider = initGetProvider({
  oauth: ["weixin"],
  share: ["weixin"],
  payment: ["wxpay"],
  push: ["weixin"]
});
function initComponentMocks(component) {
  const res = /* @__PURE__ */ Object.create(null);
  mocks$1.forEach((name) => {
    res[name] = component[name];
  });
  return res;
}
function createSelectorQuery() {
  const query = wx$2.createSelectorQuery();
  const oldIn = query.in;
  query.in = function newIn(component) {
    return oldIn.call(this, initComponentMocks(component));
  };
  return query;
}
const wx$2 = initWx();
let baseInfo = wx$2.getAppBaseInfo && wx$2.getAppBaseInfo();
if (!baseInfo) {
  baseInfo = wx$2.getSystemInfoSync();
}
const host = baseInfo ? baseInfo.host : null;
const shareVideoMessage = host && host.env === "SAAASDK" ? wx$2.miniapp.shareVideoMessage : wx$2.shareVideoMessage;
var shims = /* @__PURE__ */ Object.freeze({
  __proto__: null,
  createSelectorQuery,
  getProvider,
  shareVideoMessage
});
const compressImage = {
  args(fromArgs, toArgs) {
    if (fromArgs.compressedHeight && !toArgs.compressHeight) {
      toArgs.compressHeight = fromArgs.compressedHeight;
    }
    if (fromArgs.compressedWidth && !toArgs.compressWidth) {
      toArgs.compressWidth = fromArgs.compressedWidth;
    }
  }
};
var protocols = /* @__PURE__ */ Object.freeze({
  __proto__: null,
  compressImage,
  getAppAuthorizeSetting,
  getAppBaseInfo,
  getDeviceInfo,
  getSystemInfo,
  getSystemInfoSync,
  getWindowInfo,
  previewImage,
  redirectTo,
  showActionSheet
});
const wx$1 = initWx();
var index = initUni(shims, protocols, wx$1);
function warn$1(msg, ...args) {
  console.warn(`[Vue warn] ${msg}`, ...args);
}
let activeEffectScope;
class EffectScope {
  constructor(detached = false) {
    this.detached = detached;
    this._active = true;
    this.effects = [];
    this.cleanups = [];
    this.parent = activeEffectScope;
    if (!detached && activeEffectScope) {
      this.index = (activeEffectScope.scopes || (activeEffectScope.scopes = [])).push(this) - 1;
    }
  }
  get active() {
    return this._active;
  }
  run(fn) {
    if (this._active) {
      const currentEffectScope = activeEffectScope;
      try {
        activeEffectScope = this;
        return fn();
      } finally {
        activeEffectScope = currentEffectScope;
      }
    } else {
      warn$1(`cannot run an inactive effect scope.`);
    }
  }
  /**
   * This should only be called on non-detached scopes
   * @internal
   */
  on() {
    activeEffectScope = this;
  }
  /**
   * This should only be called on non-detached scopes
   * @internal
   */
  off() {
    activeEffectScope = this.parent;
  }
  stop(fromParent) {
    if (this._active) {
      let i, l;
      for (i = 0, l = this.effects.length; i < l; i++) {
        this.effects[i].stop();
      }
      for (i = 0, l = this.cleanups.length; i < l; i++) {
        this.cleanups[i]();
      }
      if (this.scopes) {
        for (i = 0, l = this.scopes.length; i < l; i++) {
          this.scopes[i].stop(true);
        }
      }
      if (!this.detached && this.parent && !fromParent) {
        const last = this.parent.scopes.pop();
        if (last && last !== this) {
          this.parent.scopes[this.index] = last;
          last.index = this.index;
        }
      }
      this.parent = void 0;
      this._active = false;
    }
  }
}
function effectScope(detached) {
  return new EffectScope(detached);
}
function recordEffectScope(effect, scope = activeEffectScope) {
  if (scope && scope.active) {
    scope.effects.push(effect);
  }
}
function getCurrentScope() {
  return activeEffectScope;
}
function onScopeDispose(fn) {
  if (activeEffectScope) {
    activeEffectScope.cleanups.push(fn);
  } else {
    warn$1(`onScopeDispose() is called when there is no active effect scope to be associated with.`);
  }
}
const createDep = (effects) => {
  const dep = new Set(effects);
  dep.w = 0;
  dep.n = 0;
  return dep;
};
const wasTracked = (dep) => (dep.w & trackOpBit) > 0;
const newTracked = (dep) => (dep.n & trackOpBit) > 0;
const initDepMarkers = ({ deps }) => {
  if (deps.length) {
    for (let i = 0; i < deps.length; i++) {
      deps[i].w |= trackOpBit;
    }
  }
};
const finalizeDepMarkers = (effect) => {
  const { deps } = effect;
  if (deps.length) {
    let ptr = 0;
    for (let i = 0; i < deps.length; i++) {
      const dep = deps[i];
      if (wasTracked(dep) && !newTracked(dep)) {
        dep.delete(effect);
      } else {
        deps[ptr++] = dep;
      }
      dep.w &= ~trackOpBit;
      dep.n &= ~trackOpBit;
    }
    deps.length = ptr;
  }
};
const targetMap = /* @__PURE__ */ new WeakMap();
let effectTrackDepth = 0;
let trackOpBit = 1;
const maxMarkerBits = 30;
let activeEffect;
const ITERATE_KEY = Symbol("iterate");
const MAP_KEY_ITERATE_KEY = Symbol("Map key iterate");
class ReactiveEffect {
  constructor(fn, scheduler = null, scope) {
    this.fn = fn;
    this.scheduler = scheduler;
    this.active = true;
    this.deps = [];
    this.parent = void 0;
    recordEffectScope(this, scope);
  }
  run() {
    if (!this.active) {
      return this.fn();
    }
    let parent = activeEffect;
    let lastShouldTrack = shouldTrack;
    while (parent) {
      if (parent === this) {
        return;
      }
      parent = parent.parent;
    }
    try {
      this.parent = activeEffect;
      activeEffect = this;
      shouldTrack = true;
      trackOpBit = 1 << ++effectTrackDepth;
      if (effectTrackDepth <= maxMarkerBits) {
        initDepMarkers(this);
      } else {
        cleanupEffect(this);
      }
      return this.fn();
    } finally {
      if (effectTrackDepth <= maxMarkerBits) {
        finalizeDepMarkers(this);
      }
      trackOpBit = 1 << --effectTrackDepth;
      activeEffect = this.parent;
      shouldTrack = lastShouldTrack;
      this.parent = void 0;
      if (this.deferStop) {
        this.stop();
      }
    }
  }
  stop() {
    if (activeEffect === this) {
      this.deferStop = true;
    } else if (this.active) {
      cleanupEffect(this);
      if (this.onStop) {
        this.onStop();
      }
      this.active = false;
    }
  }
}
function cleanupEffect(effect) {
  const { deps } = effect;
  if (deps.length) {
    for (let i = 0; i < deps.length; i++) {
      deps[i].delete(effect);
    }
    deps.length = 0;
  }
}
let shouldTrack = true;
const trackStack = [];
function pauseTracking() {
  trackStack.push(shouldTrack);
  shouldTrack = false;
}
function resetTracking() {
  const last = trackStack.pop();
  shouldTrack = last === void 0 ? true : last;
}
function track(target, type, key) {
  if (shouldTrack && activeEffect) {
    let depsMap = targetMap.get(target);
    if (!depsMap) {
      targetMap.set(target, depsMap = /* @__PURE__ */ new Map());
    }
    let dep = depsMap.get(key);
    if (!dep) {
      depsMap.set(key, dep = createDep());
    }
    const eventInfo = { effect: activeEffect, target, type, key };
    trackEffects(dep, eventInfo);
  }
}
function trackEffects(dep, debuggerEventExtraInfo) {
  let shouldTrack2 = false;
  if (effectTrackDepth <= maxMarkerBits) {
    if (!newTracked(dep)) {
      dep.n |= trackOpBit;
      shouldTrack2 = !wasTracked(dep);
    }
  } else {
    shouldTrack2 = !dep.has(activeEffect);
  }
  if (shouldTrack2) {
    dep.add(activeEffect);
    activeEffect.deps.push(dep);
    if (activeEffect.onTrack) {
      activeEffect.onTrack(Object.assign({ effect: activeEffect }, debuggerEventExtraInfo));
    }
  }
}
function trigger(target, type, key, newValue, oldValue, oldTarget) {
  const depsMap = targetMap.get(target);
  if (!depsMap) {
    return;
  }
  let deps = [];
  if (type === "clear") {
    deps = [...depsMap.values()];
  } else if (key === "length" && isArray$1(target)) {
    const newLength = Number(newValue);
    depsMap.forEach((dep, key2) => {
      if (key2 === "length" || key2 >= newLength) {
        deps.push(dep);
      }
    });
  } else {
    if (key !== void 0) {
      deps.push(depsMap.get(key));
    }
    switch (type) {
      case "add":
        if (!isArray$1(target)) {
          deps.push(depsMap.get(ITERATE_KEY));
          if (isMap(target)) {
            deps.push(depsMap.get(MAP_KEY_ITERATE_KEY));
          }
        } else if (isIntegerKey(key)) {
          deps.push(depsMap.get("length"));
        }
        break;
      case "delete":
        if (!isArray$1(target)) {
          deps.push(depsMap.get(ITERATE_KEY));
          if (isMap(target)) {
            deps.push(depsMap.get(MAP_KEY_ITERATE_KEY));
          }
        }
        break;
      case "set":
        if (isMap(target)) {
          deps.push(depsMap.get(ITERATE_KEY));
        }
        break;
    }
  }
  const eventInfo = { target, type, key, newValue, oldValue, oldTarget };
  if (deps.length === 1) {
    if (deps[0]) {
      {
        triggerEffects(deps[0], eventInfo);
      }
    }
  } else {
    const effects = [];
    for (const dep of deps) {
      if (dep) {
        effects.push(...dep);
      }
    }
    {
      triggerEffects(createDep(effects), eventInfo);
    }
  }
}
function triggerEffects(dep, debuggerEventExtraInfo) {
  const effects = isArray$1(dep) ? dep : [...dep];
  for (const effect of effects) {
    if (effect.computed) {
      triggerEffect(effect, debuggerEventExtraInfo);
    }
  }
  for (const effect of effects) {
    if (!effect.computed) {
      triggerEffect(effect, debuggerEventExtraInfo);
    }
  }
}
function triggerEffect(effect, debuggerEventExtraInfo) {
  if (effect !== activeEffect || effect.allowRecurse) {
    if (effect.onTrigger) {
      effect.onTrigger(extend({ effect }, debuggerEventExtraInfo));
    }
    if (effect.scheduler) {
      effect.scheduler();
    } else {
      effect.run();
    }
  }
}
function getDepFromReactive(object, key) {
  var _a2;
  return (_a2 = targetMap.get(object)) === null || _a2 === void 0 ? void 0 : _a2.get(key);
}
const isNonTrackableKeys = /* @__PURE__ */ makeMap(`__proto__,__v_isRef,__isVue`);
const builtInSymbols = new Set(
  /* @__PURE__ */ Object.getOwnPropertyNames(Symbol).filter((key) => key !== "arguments" && key !== "caller").map((key) => Symbol[key]).filter(isSymbol)
);
const get$1 = /* @__PURE__ */ createGetter();
const shallowGet = /* @__PURE__ */ createGetter(false, true);
const readonlyGet = /* @__PURE__ */ createGetter(true);
const shallowReadonlyGet = /* @__PURE__ */ createGetter(true, true);
const arrayInstrumentations = /* @__PURE__ */ createArrayInstrumentations();
function createArrayInstrumentations() {
  const instrumentations = {};
  ["includes", "indexOf", "lastIndexOf"].forEach((key) => {
    instrumentations[key] = function(...args) {
      const arr = toRaw(this);
      for (let i = 0, l = this.length; i < l; i++) {
        track(arr, "get", i + "");
      }
      const res = arr[key](...args);
      if (res === -1 || res === false) {
        return arr[key](...args.map(toRaw));
      } else {
        return res;
      }
    };
  });
  ["push", "pop", "shift", "unshift", "splice"].forEach((key) => {
    instrumentations[key] = function(...args) {
      pauseTracking();
      const res = toRaw(this)[key].apply(this, args);
      resetTracking();
      return res;
    };
  });
  return instrumentations;
}
function hasOwnProperty$2(key) {
  const obj = toRaw(this);
  track(obj, "has", key);
  return obj.hasOwnProperty(key);
}
function createGetter(isReadonly2 = false, shallow = false) {
  return function get2(target, key, receiver) {
    if (key === "__v_isReactive") {
      return !isReadonly2;
    } else if (key === "__v_isReadonly") {
      return isReadonly2;
    } else if (key === "__v_isShallow") {
      return shallow;
    } else if (key === "__v_raw" && receiver === (isReadonly2 ? shallow ? shallowReadonlyMap : readonlyMap : shallow ? shallowReactiveMap : reactiveMap).get(target)) {
      return target;
    }
    const targetIsArray = isArray$1(target);
    if (!isReadonly2) {
      if (targetIsArray && hasOwn$2(arrayInstrumentations, key)) {
        return Reflect.get(arrayInstrumentations, key, receiver);
      }
      if (key === "hasOwnProperty") {
        return hasOwnProperty$2;
      }
    }
    const res = Reflect.get(target, key, receiver);
    if (isSymbol(key) ? builtInSymbols.has(key) : isNonTrackableKeys(key)) {
      return res;
    }
    if (!isReadonly2) {
      track(target, "get", key);
    }
    if (shallow) {
      return res;
    }
    if (isRef(res)) {
      return targetIsArray && isIntegerKey(key) ? res : res.value;
    }
    if (isObject$2(res)) {
      return isReadonly2 ? readonly(res) : reactive(res);
    }
    return res;
  };
}
const set$1 = /* @__PURE__ */ createSetter();
const shallowSet = /* @__PURE__ */ createSetter(true);
function createSetter(shallow = false) {
  return function set2(target, key, value, receiver) {
    let oldValue = target[key];
    if (isReadonly(oldValue) && isRef(oldValue) && !isRef(value)) {
      return false;
    }
    if (!shallow) {
      if (!isShallow(value) && !isReadonly(value)) {
        oldValue = toRaw(oldValue);
        value = toRaw(value);
      }
      if (!isArray$1(target) && isRef(oldValue) && !isRef(value)) {
        oldValue.value = value;
        return true;
      }
    }
    const hadKey = isArray$1(target) && isIntegerKey(key) ? Number(key) < target.length : hasOwn$2(target, key);
    const result = Reflect.set(target, key, value, receiver);
    if (target === toRaw(receiver)) {
      if (!hadKey) {
        trigger(target, "add", key, value);
      } else if (hasChanged(value, oldValue)) {
        trigger(target, "set", key, value, oldValue);
      }
    }
    return result;
  };
}
function deleteProperty(target, key) {
  const hadKey = hasOwn$2(target, key);
  const oldValue = target[key];
  const result = Reflect.deleteProperty(target, key);
  if (result && hadKey) {
    trigger(target, "delete", key, void 0, oldValue);
  }
  return result;
}
function has$1(target, key) {
  const result = Reflect.has(target, key);
  if (!isSymbol(key) || !builtInSymbols.has(key)) {
    track(target, "has", key);
  }
  return result;
}
function ownKeys(target) {
  track(target, "iterate", isArray$1(target) ? "length" : ITERATE_KEY);
  return Reflect.ownKeys(target);
}
const mutableHandlers = {
  get: get$1,
  set: set$1,
  deleteProperty,
  has: has$1,
  ownKeys
};
const readonlyHandlers = {
  get: readonlyGet,
  set(target, key) {
    {
      warn$1(`Set operation on key "${String(key)}" failed: target is readonly.`, target);
    }
    return true;
  },
  deleteProperty(target, key) {
    {
      warn$1(`Delete operation on key "${String(key)}" failed: target is readonly.`, target);
    }
    return true;
  }
};
const shallowReactiveHandlers = /* @__PURE__ */ extend({}, mutableHandlers, {
  get: shallowGet,
  set: shallowSet
});
const shallowReadonlyHandlers = /* @__PURE__ */ extend({}, readonlyHandlers, {
  get: shallowReadonlyGet
});
const toShallow = (value) => value;
const getProto = (v) => Reflect.getPrototypeOf(v);
function get(target, key, isReadonly2 = false, isShallow2 = false) {
  target = target[
    "__v_raw"
    /* ReactiveFlags.RAW */
  ];
  const rawTarget = toRaw(target);
  const rawKey = toRaw(key);
  if (!isReadonly2) {
    if (key !== rawKey) {
      track(rawTarget, "get", key);
    }
    track(rawTarget, "get", rawKey);
  }
  const { has: has2 } = getProto(rawTarget);
  const wrap = isShallow2 ? toShallow : isReadonly2 ? toReadonly : toReactive;
  if (has2.call(rawTarget, key)) {
    return wrap(target.get(key));
  } else if (has2.call(rawTarget, rawKey)) {
    return wrap(target.get(rawKey));
  } else if (target !== rawTarget) {
    target.get(key);
  }
}
function has(key, isReadonly2 = false) {
  const target = this[
    "__v_raw"
    /* ReactiveFlags.RAW */
  ];
  const rawTarget = toRaw(target);
  const rawKey = toRaw(key);
  if (!isReadonly2) {
    if (key !== rawKey) {
      track(rawTarget, "has", key);
    }
    track(rawTarget, "has", rawKey);
  }
  return key === rawKey ? target.has(key) : target.has(key) || target.has(rawKey);
}
function size(target, isReadonly2 = false) {
  target = target[
    "__v_raw"
    /* ReactiveFlags.RAW */
  ];
  !isReadonly2 && track(toRaw(target), "iterate", ITERATE_KEY);
  return Reflect.get(target, "size", target);
}
function add(value) {
  value = toRaw(value);
  const target = toRaw(this);
  const proto = getProto(target);
  const hadKey = proto.has.call(target, value);
  if (!hadKey) {
    target.add(value);
    trigger(target, "add", value, value);
  }
  return this;
}
function set$2(key, value) {
  value = toRaw(value);
  const target = toRaw(this);
  const { has: has2, get: get2 } = getProto(target);
  let hadKey = has2.call(target, key);
  if (!hadKey) {
    key = toRaw(key);
    hadKey = has2.call(target, key);
  } else {
    checkIdentityKeys(target, has2, key);
  }
  const oldValue = get2.call(target, key);
  target.set(key, value);
  if (!hadKey) {
    trigger(target, "add", key, value);
  } else if (hasChanged(value, oldValue)) {
    trigger(target, "set", key, value, oldValue);
  }
  return this;
}
function deleteEntry(key) {
  const target = toRaw(this);
  const { has: has2, get: get2 } = getProto(target);
  let hadKey = has2.call(target, key);
  if (!hadKey) {
    key = toRaw(key);
    hadKey = has2.call(target, key);
  } else {
    checkIdentityKeys(target, has2, key);
  }
  const oldValue = get2 ? get2.call(target, key) : void 0;
  const result = target.delete(key);
  if (hadKey) {
    trigger(target, "delete", key, void 0, oldValue);
  }
  return result;
}
function clear() {
  const target = toRaw(this);
  const hadItems = target.size !== 0;
  const oldTarget = isMap(target) ? new Map(target) : new Set(target);
  const result = target.clear();
  if (hadItems) {
    trigger(target, "clear", void 0, void 0, oldTarget);
  }
  return result;
}
function createForEach(isReadonly2, isShallow2) {
  return function forEach(callback, thisArg) {
    const observed = this;
    const target = observed[
      "__v_raw"
      /* ReactiveFlags.RAW */
    ];
    const rawTarget = toRaw(target);
    const wrap = isShallow2 ? toShallow : isReadonly2 ? toReadonly : toReactive;
    !isReadonly2 && track(rawTarget, "iterate", ITERATE_KEY);
    return target.forEach((value, key) => {
      return callback.call(thisArg, wrap(value), wrap(key), observed);
    });
  };
}
function createIterableMethod(method, isReadonly2, isShallow2) {
  return function(...args) {
    const target = this[
      "__v_raw"
      /* ReactiveFlags.RAW */
    ];
    const rawTarget = toRaw(target);
    const targetIsMap = isMap(rawTarget);
    const isPair = method === "entries" || method === Symbol.iterator && targetIsMap;
    const isKeyOnly = method === "keys" && targetIsMap;
    const innerIterator = target[method](...args);
    const wrap = isShallow2 ? toShallow : isReadonly2 ? toReadonly : toReactive;
    !isReadonly2 && track(rawTarget, "iterate", isKeyOnly ? MAP_KEY_ITERATE_KEY : ITERATE_KEY);
    return {
      // iterator protocol
      next() {
        const { value, done } = innerIterator.next();
        return done ? { value, done } : {
          value: isPair ? [wrap(value[0]), wrap(value[1])] : wrap(value),
          done
        };
      },
      // iterable protocol
      [Symbol.iterator]() {
        return this;
      }
    };
  };
}
function createReadonlyMethod(type) {
  return function(...args) {
    {
      const key = args[0] ? `on key "${args[0]}" ` : ``;
      console.warn(`${capitalize(type)} operation ${key}failed: target is readonly.`, toRaw(this));
    }
    return type === "delete" ? false : this;
  };
}
function createInstrumentations() {
  const mutableInstrumentations2 = {
    get(key) {
      return get(this, key);
    },
    get size() {
      return size(this);
    },
    has,
    add,
    set: set$2,
    delete: deleteEntry,
    clear,
    forEach: createForEach(false, false)
  };
  const shallowInstrumentations2 = {
    get(key) {
      return get(this, key, false, true);
    },
    get size() {
      return size(this);
    },
    has,
    add,
    set: set$2,
    delete: deleteEntry,
    clear,
    forEach: createForEach(false, true)
  };
  const readonlyInstrumentations2 = {
    get(key) {
      return get(this, key, true);
    },
    get size() {
      return size(this, true);
    },
    has(key) {
      return has.call(this, key, true);
    },
    add: createReadonlyMethod(
      "add"
      /* TriggerOpTypes.ADD */
    ),
    set: createReadonlyMethod(
      "set"
      /* TriggerOpTypes.SET */
    ),
    delete: createReadonlyMethod(
      "delete"
      /* TriggerOpTypes.DELETE */
    ),
    clear: createReadonlyMethod(
      "clear"
      /* TriggerOpTypes.CLEAR */
    ),
    forEach: createForEach(true, false)
  };
  const shallowReadonlyInstrumentations2 = {
    get(key) {
      return get(this, key, true, true);
    },
    get size() {
      return size(this, true);
    },
    has(key) {
      return has.call(this, key, true);
    },
    add: createReadonlyMethod(
      "add"
      /* TriggerOpTypes.ADD */
    ),
    set: createReadonlyMethod(
      "set"
      /* TriggerOpTypes.SET */
    ),
    delete: createReadonlyMethod(
      "delete"
      /* TriggerOpTypes.DELETE */
    ),
    clear: createReadonlyMethod(
      "clear"
      /* TriggerOpTypes.CLEAR */
    ),
    forEach: createForEach(true, true)
  };
  const iteratorMethods = ["keys", "values", "entries", Symbol.iterator];
  iteratorMethods.forEach((method) => {
    mutableInstrumentations2[method] = createIterableMethod(method, false, false);
    readonlyInstrumentations2[method] = createIterableMethod(method, true, false);
    shallowInstrumentations2[method] = createIterableMethod(method, false, true);
    shallowReadonlyInstrumentations2[method] = createIterableMethod(method, true, true);
  });
  return [
    mutableInstrumentations2,
    readonlyInstrumentations2,
    shallowInstrumentations2,
    shallowReadonlyInstrumentations2
  ];
}
const [mutableInstrumentations, readonlyInstrumentations, shallowInstrumentations, shallowReadonlyInstrumentations] = /* @__PURE__ */ createInstrumentations();
function createInstrumentationGetter(isReadonly2, shallow) {
  const instrumentations = shallow ? isReadonly2 ? shallowReadonlyInstrumentations : shallowInstrumentations : isReadonly2 ? readonlyInstrumentations : mutableInstrumentations;
  return (target, key, receiver) => {
    if (key === "__v_isReactive") {
      return !isReadonly2;
    } else if (key === "__v_isReadonly") {
      return isReadonly2;
    } else if (key === "__v_raw") {
      return target;
    }
    return Reflect.get(hasOwn$2(instrumentations, key) && key in target ? instrumentations : target, key, receiver);
  };
}
const mutableCollectionHandlers = {
  get: /* @__PURE__ */ createInstrumentationGetter(false, false)
};
const shallowCollectionHandlers = {
  get: /* @__PURE__ */ createInstrumentationGetter(false, true)
};
const readonlyCollectionHandlers = {
  get: /* @__PURE__ */ createInstrumentationGetter(true, false)
};
const shallowReadonlyCollectionHandlers = {
  get: /* @__PURE__ */ createInstrumentationGetter(true, true)
};
function checkIdentityKeys(target, has2, key) {
  const rawKey = toRaw(key);
  if (rawKey !== key && has2.call(target, rawKey)) {
    const type = toRawType(target);
    console.warn(`Reactive ${type} contains both the raw and reactive versions of the same object${type === `Map` ? ` as keys` : ``}, which can lead to inconsistencies. Avoid differentiating between the raw and reactive versions of an object and only use the reactive version if possible.`);
  }
}
const reactiveMap = /* @__PURE__ */ new WeakMap();
const shallowReactiveMap = /* @__PURE__ */ new WeakMap();
const readonlyMap = /* @__PURE__ */ new WeakMap();
const shallowReadonlyMap = /* @__PURE__ */ new WeakMap();
function targetTypeMap(rawType) {
  switch (rawType) {
    case "Object":
    case "Array":
      return 1;
    case "Map":
    case "Set":
    case "WeakMap":
    case "WeakSet":
      return 2;
    default:
      return 0;
  }
}
function getTargetType(value) {
  return value[
    "__v_skip"
    /* ReactiveFlags.SKIP */
  ] || !Object.isExtensible(value) ? 0 : targetTypeMap(toRawType(value));
}
function reactive(target) {
  if (isReadonly(target)) {
    return target;
  }
  return createReactiveObject(target, false, mutableHandlers, mutableCollectionHandlers, reactiveMap);
}
function shallowReactive(target) {
  return createReactiveObject(target, false, shallowReactiveHandlers, shallowCollectionHandlers, shallowReactiveMap);
}
function readonly(target) {
  return createReactiveObject(target, true, readonlyHandlers, readonlyCollectionHandlers, readonlyMap);
}
function shallowReadonly(target) {
  return createReactiveObject(target, true, shallowReadonlyHandlers, shallowReadonlyCollectionHandlers, shallowReadonlyMap);
}
function createReactiveObject(target, isReadonly2, baseHandlers, collectionHandlers, proxyMap) {
  if (!isObject$2(target)) {
    {
      console.warn(`value cannot be made reactive: ${String(target)}`);
    }
    return target;
  }
  if (target[
    "__v_raw"
    /* ReactiveFlags.RAW */
  ] && !(isReadonly2 && target[
    "__v_isReactive"
    /* ReactiveFlags.IS_REACTIVE */
  ])) {
    return target;
  }
  const existingProxy = proxyMap.get(target);
  if (existingProxy) {
    return existingProxy;
  }
  const targetType = getTargetType(target);
  if (targetType === 0) {
    return target;
  }
  const proxy = new Proxy(target, targetType === 2 ? collectionHandlers : baseHandlers);
  proxyMap.set(target, proxy);
  return proxy;
}
function isReactive(value) {
  if (isReadonly(value)) {
    return isReactive(value[
      "__v_raw"
      /* ReactiveFlags.RAW */
    ]);
  }
  return !!(value && value[
    "__v_isReactive"
    /* ReactiveFlags.IS_REACTIVE */
  ]);
}
function isReadonly(value) {
  return !!(value && value[
    "__v_isReadonly"
    /* ReactiveFlags.IS_READONLY */
  ]);
}
function isShallow(value) {
  return !!(value && value[
    "__v_isShallow"
    /* ReactiveFlags.IS_SHALLOW */
  ]);
}
function isProxy(value) {
  return isReactive(value) || isReadonly(value);
}
function toRaw(observed) {
  const raw = observed && observed[
    "__v_raw"
    /* ReactiveFlags.RAW */
  ];
  return raw ? toRaw(raw) : observed;
}
function markRaw(value) {
  def(value, "__v_skip", true);
  return value;
}
const toReactive = (value) => isObject$2(value) ? reactive(value) : value;
const toReadonly = (value) => isObject$2(value) ? readonly(value) : value;
function trackRefValue(ref2) {
  if (shouldTrack && activeEffect) {
    ref2 = toRaw(ref2);
    {
      trackEffects(ref2.dep || (ref2.dep = createDep()), {
        target: ref2,
        type: "get",
        key: "value"
      });
    }
  }
}
function triggerRefValue(ref2, newVal) {
  ref2 = toRaw(ref2);
  const dep = ref2.dep;
  if (dep) {
    {
      triggerEffects(dep, {
        target: ref2,
        type: "set",
        key: "value",
        newValue: newVal
      });
    }
  }
}
function isRef(r) {
  return !!(r && r.__v_isRef === true);
}
function ref(value) {
  return createRef(value, false);
}
function createRef(rawValue, shallow) {
  if (isRef(rawValue)) {
    return rawValue;
  }
  return new RefImpl(rawValue, shallow);
}
class RefImpl {
  constructor(value, __v_isShallow) {
    this.__v_isShallow = __v_isShallow;
    this.dep = void 0;
    this.__v_isRef = true;
    this._rawValue = __v_isShallow ? value : toRaw(value);
    this._value = __v_isShallow ? value : toReactive(value);
  }
  get value() {
    trackRefValue(this);
    return this._value;
  }
  set value(newVal) {
    const useDirectValue = this.__v_isShallow || isShallow(newVal) || isReadonly(newVal);
    newVal = useDirectValue ? newVal : toRaw(newVal);
    if (hasChanged(newVal, this._rawValue)) {
      this._rawValue = newVal;
      this._value = useDirectValue ? newVal : toReactive(newVal);
      triggerRefValue(this, newVal);
    }
  }
}
function unref(ref2) {
  return isRef(ref2) ? ref2.value : ref2;
}
const shallowUnwrapHandlers = {
  get: (target, key, receiver) => unref(Reflect.get(target, key, receiver)),
  set: (target, key, value, receiver) => {
    const oldValue = target[key];
    if (isRef(oldValue) && !isRef(value)) {
      oldValue.value = value;
      return true;
    } else {
      return Reflect.set(target, key, value, receiver);
    }
  }
};
function proxyRefs(objectWithRefs) {
  return isReactive(objectWithRefs) ? objectWithRefs : new Proxy(objectWithRefs, shallowUnwrapHandlers);
}
function toRefs(object) {
  if (!isProxy(object)) {
    console.warn(`toRefs() expects a reactive object but received a plain one.`);
  }
  const ret = isArray$1(object) ? new Array(object.length) : {};
  for (const key in object) {
    ret[key] = toRef(object, key);
  }
  return ret;
}
class ObjectRefImpl {
  constructor(_object, _key, _defaultValue) {
    this._object = _object;
    this._key = _key;
    this._defaultValue = _defaultValue;
    this.__v_isRef = true;
  }
  get value() {
    const val = this._object[this._key];
    return val === void 0 ? this._defaultValue : val;
  }
  set value(newVal) {
    this._object[this._key] = newVal;
  }
  get dep() {
    return getDepFromReactive(toRaw(this._object), this._key);
  }
}
function toRef(object, key, defaultValue) {
  const val = object[key];
  return isRef(val) ? val : new ObjectRefImpl(object, key, defaultValue);
}
var _a;
class ComputedRefImpl {
  constructor(getter, _setter, isReadonly2, isSSR) {
    this._setter = _setter;
    this.dep = void 0;
    this.__v_isRef = true;
    this[_a] = false;
    this._dirty = true;
    this.effect = new ReactiveEffect(getter, () => {
      if (!this._dirty) {
        this._dirty = true;
        triggerRefValue(this);
      }
    });
    this.effect.computed = this;
    this.effect.active = this._cacheable = !isSSR;
    this[
      "__v_isReadonly"
      /* ReactiveFlags.IS_READONLY */
    ] = isReadonly2;
  }
  get value() {
    const self2 = toRaw(this);
    trackRefValue(self2);
    if (self2._dirty || !self2._cacheable) {
      self2._dirty = false;
      self2._value = self2.effect.run();
    }
    return self2._value;
  }
  set value(newValue) {
    this._setter(newValue);
  }
}
_a = "__v_isReadonly";
function computed$1(getterOrOptions, debugOptions, isSSR = false) {
  let getter;
  let setter;
  const onlyGetter = isFunction$1(getterOrOptions);
  if (onlyGetter) {
    getter = getterOrOptions;
    setter = () => {
      console.warn("Write operation failed: computed value is readonly");
    };
  } else {
    getter = getterOrOptions.get;
    setter = getterOrOptions.set;
  }
  const cRef = new ComputedRefImpl(getter, setter, onlyGetter || !setter, isSSR);
  if (debugOptions && !isSSR) {
    cRef.effect.onTrack = debugOptions.onTrack;
    cRef.effect.onTrigger = debugOptions.onTrigger;
  }
  return cRef;
}
const stack = [];
function pushWarningContext(vnode) {
  stack.push(vnode);
}
function popWarningContext() {
  stack.pop();
}
function warn$2(msg, ...args) {
  pauseTracking();
  const instance = stack.length ? stack[stack.length - 1].component : null;
  const appWarnHandler = instance && instance.appContext.config.warnHandler;
  const trace = getComponentTrace();
  if (appWarnHandler) {
    callWithErrorHandling(appWarnHandler, instance, 11, [
      msg + args.join(""),
      instance && instance.proxy,
      trace.map(({ vnode }) => `at <${formatComponentName(instance, vnode.type)}>`).join("\n"),
      trace
    ]);
  } else {
    const warnArgs = [`[Vue warn]: ${msg}`, ...args];
    if (trace.length && // avoid spamming console during tests
    true) {
      warnArgs.push(`
`, ...formatTrace(trace));
    }
    console.warn(...warnArgs);
  }
  resetTracking();
}
function getComponentTrace() {
  let currentVNode = stack[stack.length - 1];
  if (!currentVNode) {
    return [];
  }
  const normalizedStack = [];
  while (currentVNode) {
    const last = normalizedStack[0];
    if (last && last.vnode === currentVNode) {
      last.recurseCount++;
    } else {
      normalizedStack.push({
        vnode: currentVNode,
        recurseCount: 0
      });
    }
    const parentInstance = currentVNode.component && currentVNode.component.parent;
    currentVNode = parentInstance && parentInstance.vnode;
  }
  return normalizedStack;
}
function formatTrace(trace) {
  const logs = [];
  trace.forEach((entry, i) => {
    logs.push(...i === 0 ? [] : [`
`], ...formatTraceEntry(entry));
  });
  return logs;
}
function formatTraceEntry({ vnode, recurseCount }) {
  const postfix = recurseCount > 0 ? `... (${recurseCount} recursive calls)` : ``;
  const isRoot = vnode.component ? vnode.component.parent == null : false;
  const open = ` at <${formatComponentName(vnode.component, vnode.type, isRoot)}`;
  const close = `>` + postfix;
  return vnode.props ? [open, ...formatProps(vnode.props), close] : [open + close];
}
function formatProps(props) {
  const res = [];
  const keys = Object.keys(props);
  keys.slice(0, 3).forEach((key) => {
    res.push(...formatProp(key, props[key]));
  });
  if (keys.length > 3) {
    res.push(` ...`);
  }
  return res;
}
function formatProp(key, value, raw) {
  if (isString$1(value)) {
    value = JSON.stringify(value);
    return raw ? value : [`${key}=${value}`];
  } else if (typeof value === "number" || typeof value === "boolean" || value == null) {
    return raw ? value : [`${key}=${value}`];
  } else if (isRef(value)) {
    value = formatProp(key, toRaw(value.value), true);
    return raw ? value : [`${key}=Ref<`, value, `>`];
  } else if (isFunction$1(value)) {
    return [`${key}=fn${value.name ? `<${value.name}>` : ``}`];
  } else {
    value = toRaw(value);
    return raw ? value : [`${key}=`, value];
  }
}
const ErrorTypeStrings = {
  [
    "sp"
    /* LifecycleHooks.SERVER_PREFETCH */
  ]: "serverPrefetch hook",
  [
    "bc"
    /* LifecycleHooks.BEFORE_CREATE */
  ]: "beforeCreate hook",
  [
    "c"
    /* LifecycleHooks.CREATED */
  ]: "created hook",
  [
    "bm"
    /* LifecycleHooks.BEFORE_MOUNT */
  ]: "beforeMount hook",
  [
    "m"
    /* LifecycleHooks.MOUNTED */
  ]: "mounted hook",
  [
    "bu"
    /* LifecycleHooks.BEFORE_UPDATE */
  ]: "beforeUpdate hook",
  [
    "u"
    /* LifecycleHooks.UPDATED */
  ]: "updated",
  [
    "bum"
    /* LifecycleHooks.BEFORE_UNMOUNT */
  ]: "beforeUnmount hook",
  [
    "um"
    /* LifecycleHooks.UNMOUNTED */
  ]: "unmounted hook",
  [
    "a"
    /* LifecycleHooks.ACTIVATED */
  ]: "activated hook",
  [
    "da"
    /* LifecycleHooks.DEACTIVATED */
  ]: "deactivated hook",
  [
    "ec"
    /* LifecycleHooks.ERROR_CAPTURED */
  ]: "errorCaptured hook",
  [
    "rtc"
    /* LifecycleHooks.RENDER_TRACKED */
  ]: "renderTracked hook",
  [
    "rtg"
    /* LifecycleHooks.RENDER_TRIGGERED */
  ]: "renderTriggered hook",
  [
    0
    /* ErrorCodes.SETUP_FUNCTION */
  ]: "setup function",
  [
    1
    /* ErrorCodes.RENDER_FUNCTION */
  ]: "render function",
  [
    2
    /* ErrorCodes.WATCH_GETTER */
  ]: "watcher getter",
  [
    3
    /* ErrorCodes.WATCH_CALLBACK */
  ]: "watcher callback",
  [
    4
    /* ErrorCodes.WATCH_CLEANUP */
  ]: "watcher cleanup function",
  [
    5
    /* ErrorCodes.NATIVE_EVENT_HANDLER */
  ]: "native event handler",
  [
    6
    /* ErrorCodes.COMPONENT_EVENT_HANDLER */
  ]: "component event handler",
  [
    7
    /* ErrorCodes.VNODE_HOOK */
  ]: "vnode hook",
  [
    8
    /* ErrorCodes.DIRECTIVE_HOOK */
  ]: "directive hook",
  [
    9
    /* ErrorCodes.TRANSITION_HOOK */
  ]: "transition hook",
  [
    10
    /* ErrorCodes.APP_ERROR_HANDLER */
  ]: "app errorHandler",
  [
    11
    /* ErrorCodes.APP_WARN_HANDLER */
  ]: "app warnHandler",
  [
    12
    /* ErrorCodes.FUNCTION_REF */
  ]: "ref function",
  [
    13
    /* ErrorCodes.ASYNC_COMPONENT_LOADER */
  ]: "async component loader",
  [
    14
    /* ErrorCodes.SCHEDULER */
  ]: "scheduler flush. This is likely a Vue internals bug. Please open an issue at https://new-issue.vuejs.org/?repo=vuejs/core"
};
function callWithErrorHandling(fn, instance, type, args) {
  let res;
  try {
    res = args ? fn(...args) : fn();
  } catch (err) {
    handleError(err, instance, type);
  }
  return res;
}
function callWithAsyncErrorHandling(fn, instance, type, args) {
  if (isFunction$1(fn)) {
    const res = callWithErrorHandling(fn, instance, type, args);
    if (res && isPromise(res)) {
      res.catch((err) => {
        handleError(err, instance, type);
      });
    }
    return res;
  }
  const values = [];
  for (let i = 0; i < fn.length; i++) {
    values.push(callWithAsyncErrorHandling(fn[i], instance, type, args));
  }
  return values;
}
function handleError(err, instance, type, throwInDev = true) {
  const contextVNode = instance ? instance.vnode : null;
  if (instance) {
    let cur = instance.parent;
    const exposedInstance = instance.proxy;
    const errorInfo = ErrorTypeStrings[type] || type;
    while (cur) {
      const errorCapturedHooks = cur.ec;
      if (errorCapturedHooks) {
        for (let i = 0; i < errorCapturedHooks.length; i++) {
          if (errorCapturedHooks[i](err, exposedInstance, errorInfo) === false) {
            return;
          }
        }
      }
      cur = cur.parent;
    }
    const appErrorHandler = instance.appContext.config.errorHandler;
    if (appErrorHandler) {
      callWithErrorHandling(appErrorHandler, null, 10, [err, exposedInstance, errorInfo]);
      return;
    }
  }
  logError(err, type, contextVNode, throwInDev);
}
function logError(err, type, contextVNode, throwInDev = true) {
  {
    const info = ErrorTypeStrings[type] || type;
    if (contextVNode) {
      pushWarningContext(contextVNode);
    }
    warn$2(`Unhandled error${info ? ` during execution of ${info}` : ``}`);
    if (contextVNode) {
      popWarningContext();
    }
    if (throwInDev) {
      console.error(err);
    } else {
      console.error(err);
    }
  }
}
let isFlushing = false;
let isFlushPending = false;
const queue = [];
let flushIndex = 0;
const pendingPostFlushCbs = [];
let activePostFlushCbs = null;
let postFlushIndex = 0;
const resolvedPromise = /* @__PURE__ */ Promise.resolve();
let currentFlushPromise = null;
const RECURSION_LIMIT = 100;
function nextTick$1(fn) {
  const p2 = currentFlushPromise || resolvedPromise;
  return fn ? p2.then(this ? fn.bind(this) : fn) : p2;
}
function findInsertionIndex(id) {
  let start = flushIndex + 1;
  let end = queue.length;
  while (start < end) {
    const middle = start + end >>> 1;
    const middleJobId = getId(queue[middle]);
    middleJobId < id ? start = middle + 1 : end = middle;
  }
  return start;
}
function queueJob(job) {
  if (!queue.length || !queue.includes(job, isFlushing && job.allowRecurse ? flushIndex + 1 : flushIndex)) {
    if (job.id == null) {
      queue.push(job);
    } else {
      queue.splice(findInsertionIndex(job.id), 0, job);
    }
    queueFlush();
  }
}
function queueFlush() {
  if (!isFlushing && !isFlushPending) {
    isFlushPending = true;
    currentFlushPromise = resolvedPromise.then(flushJobs);
  }
}
function hasQueueJob(job) {
  return queue.indexOf(job) > -1;
}
function invalidateJob(job) {
  const i = queue.indexOf(job);
  if (i > flushIndex) {
    queue.splice(i, 1);
  }
}
function queuePostFlushCb(cb) {
  if (!isArray$1(cb)) {
    if (!activePostFlushCbs || !activePostFlushCbs.includes(cb, cb.allowRecurse ? postFlushIndex + 1 : postFlushIndex)) {
      pendingPostFlushCbs.push(cb);
    }
  } else {
    pendingPostFlushCbs.push(...cb);
  }
  queueFlush();
}
function flushPreFlushCbs(seen, i = isFlushing ? flushIndex + 1 : 0) {
  {
    seen = seen || /* @__PURE__ */ new Map();
  }
  for (; i < queue.length; i++) {
    const cb = queue[i];
    if (cb && cb.pre) {
      if (checkRecursiveUpdates(seen, cb)) {
        continue;
      }
      queue.splice(i, 1);
      i--;
      cb();
    }
  }
}
function flushPostFlushCbs(seen) {
  if (pendingPostFlushCbs.length) {
    const deduped = [...new Set(pendingPostFlushCbs)];
    pendingPostFlushCbs.length = 0;
    if (activePostFlushCbs) {
      activePostFlushCbs.push(...deduped);
      return;
    }
    activePostFlushCbs = deduped;
    {
      seen = seen || /* @__PURE__ */ new Map();
    }
    activePostFlushCbs.sort((a, b) => getId(a) - getId(b));
    for (postFlushIndex = 0; postFlushIndex < activePostFlushCbs.length; postFlushIndex++) {
      if (checkRecursiveUpdates(seen, activePostFlushCbs[postFlushIndex])) {
        continue;
      }
      activePostFlushCbs[postFlushIndex]();
    }
    activePostFlushCbs = null;
    postFlushIndex = 0;
  }
}
const getId = (job) => job.id == null ? Infinity : job.id;
const comparator = (a, b) => {
  const diff2 = getId(a) - getId(b);
  if (diff2 === 0) {
    if (a.pre && !b.pre)
      return -1;
    if (b.pre && !a.pre)
      return 1;
  }
  return diff2;
};
function flushJobs(seen) {
  isFlushPending = false;
  isFlushing = true;
  {
    seen = seen || /* @__PURE__ */ new Map();
  }
  queue.sort(comparator);
  const check = (job) => checkRecursiveUpdates(seen, job);
  try {
    for (flushIndex = 0; flushIndex < queue.length; flushIndex++) {
      const job = queue[flushIndex];
      if (job && job.active !== false) {
        if (check(job)) {
          continue;
        }
        callWithErrorHandling(
          job,
          null,
          14
          /* ErrorCodes.SCHEDULER */
        );
      }
    }
  } finally {
    flushIndex = 0;
    queue.length = 0;
    flushPostFlushCbs(seen);
    isFlushing = false;
    currentFlushPromise = null;
    if (queue.length || pendingPostFlushCbs.length) {
      flushJobs(seen);
    }
  }
}
function checkRecursiveUpdates(seen, fn) {
  if (!seen.has(fn)) {
    seen.set(fn, 1);
  } else {
    const count = seen.get(fn);
    if (count > RECURSION_LIMIT) {
      const instance = fn.ownerInstance;
      const componentName = instance && getComponentName(instance.type);
      warn$2(`Maximum recursive updates exceeded${componentName ? ` in component <${componentName}>` : ``}. This means you have a reactive effect that is mutating its own dependencies and thus recursively triggering itself. Possible sources include component template, render function, updated hook or watcher source function.`);
      return true;
    } else {
      seen.set(fn, count + 1);
    }
  }
}
let devtools$1;
let buffer = [];
let devtoolsNotInstalled = false;
function emit$1(event, ...args) {
  if (devtools$1) {
    devtools$1.emit(event, ...args);
  } else if (!devtoolsNotInstalled) {
    buffer.push({ event, args });
  }
}
function setDevtoolsHook(hook, target) {
  var _a2, _b;
  devtools$1 = hook;
  if (devtools$1) {
    devtools$1.enabled = true;
    buffer.forEach(({ event, args }) => devtools$1.emit(event, ...args));
    buffer = [];
  } else if (
    // handle late devtools injection - only do this if we are in an actual
    // browser environment to avoid the timer handle stalling test runner exit
    // (#4815)
    typeof window !== "undefined" && // some envs mock window but not fully
    // eslint-disable-next-line no-restricted-globals
    window.HTMLElement && // also exclude jsdom
    // eslint-disable-next-line no-restricted-globals
    !((_b = (_a2 = window.navigator) === null || _a2 === void 0 ? void 0 : _a2.userAgent) === null || _b === void 0 ? void 0 : _b.includes("jsdom"))
  ) {
    const replay = target.__VUE_DEVTOOLS_HOOK_REPLAY__ = target.__VUE_DEVTOOLS_HOOK_REPLAY__ || [];
    replay.push((newHook) => {
      setDevtoolsHook(newHook, target);
    });
    setTimeout(() => {
      if (!devtools$1) {
        target.__VUE_DEVTOOLS_HOOK_REPLAY__ = null;
        devtoolsNotInstalled = true;
        buffer = [];
      }
    }, 3e3);
  } else {
    devtoolsNotInstalled = true;
    buffer = [];
  }
}
function devtoolsInitApp(app, version2) {
  emit$1("app:init", app, version2, {
    Fragment,
    Text,
    Comment,
    Static
  });
}
const devtoolsComponentAdded = /* @__PURE__ */ createDevtoolsComponentHook(
  "component:added"
  /* DevtoolsHooks.COMPONENT_ADDED */
);
const devtoolsComponentUpdated = /* @__PURE__ */ createDevtoolsComponentHook(
  "component:updated"
  /* DevtoolsHooks.COMPONENT_UPDATED */
);
const _devtoolsComponentRemoved = /* @__PURE__ */ createDevtoolsComponentHook(
  "component:removed"
  /* DevtoolsHooks.COMPONENT_REMOVED */
);
const devtoolsComponentRemoved = (component) => {
  if (devtools$1 && typeof devtools$1.cleanupBuffer === "function" && // remove the component if it wasn't buffered
  !devtools$1.cleanupBuffer(component)) {
    _devtoolsComponentRemoved(component);
  }
};
function createDevtoolsComponentHook(hook) {
  return (component) => {
    emit$1(
      hook,
      component.appContext.app,
      component.uid,
      // fixed by xxxxxx
      // 为 0 是 App，无 parent 是 Page 指向 App
      component.uid === 0 ? void 0 : component.parent ? component.parent.uid : 0,
      component
    );
  };
}
const devtoolsPerfStart = /* @__PURE__ */ createDevtoolsPerformanceHook(
  "perf:start"
  /* DevtoolsHooks.PERFORMANCE_START */
);
const devtoolsPerfEnd = /* @__PURE__ */ createDevtoolsPerformanceHook(
  "perf:end"
  /* DevtoolsHooks.PERFORMANCE_END */
);
function createDevtoolsPerformanceHook(hook) {
  return (component, type, time) => {
    emit$1(hook, component.appContext.app, component.uid, component, type, time);
  };
}
function devtoolsComponentEmit(component, event, params) {
  emit$1("component:emit", component.appContext.app, component, event, params);
}
function emit(instance, event, ...rawArgs) {
  if (instance.isUnmounted)
    return;
  const props = instance.vnode.props || EMPTY_OBJ;
  {
    const { emitsOptions, propsOptions: [propsOptions] } = instance;
    if (emitsOptions) {
      if (!(event in emitsOptions) && true) {
        if (!propsOptions || !(toHandlerKey(event) in propsOptions)) {
          warn$2(`Component emitted event "${event}" but it is neither declared in the emits option nor as an "${toHandlerKey(event)}" prop.`);
        }
      } else {
        const validator = emitsOptions[event];
        if (isFunction$1(validator)) {
          const isValid = validator(...rawArgs);
          if (!isValid) {
            warn$2(`Invalid event arguments: event validation failed for event "${event}".`);
          }
        }
      }
    }
  }
  let args = rawArgs;
  const isModelListener2 = event.startsWith("update:");
  const modelArg = isModelListener2 && event.slice(7);
  if (modelArg && modelArg in props) {
    const modifiersKey = `${modelArg === "modelValue" ? "model" : modelArg}Modifiers`;
    const { number: number2, trim } = props[modifiersKey] || EMPTY_OBJ;
    if (trim) {
      args = rawArgs.map((a) => isString$1(a) ? a.trim() : a);
    }
    if (number2) {
      args = rawArgs.map(looseToNumber);
    }
  }
  {
    devtoolsComponentEmit(instance, event, args);
  }
  {
    const lowerCaseEvent = event.toLowerCase();
    if (lowerCaseEvent !== event && props[toHandlerKey(lowerCaseEvent)]) {
      warn$2(`Event "${lowerCaseEvent}" is emitted in component ${formatComponentName(instance, instance.type)} but the handler is registered for "${event}". Note that HTML attributes are case-insensitive and you cannot use v-on to listen to camelCase events when using in-DOM templates. You should probably use "${hyphenate(event)}" instead of "${event}".`);
    }
  }
  let handlerName;
  let handler = props[handlerName = toHandlerKey(event)] || // also try camelCase event handler (#2249)
  props[handlerName = toHandlerKey(camelize(event))];
  if (!handler && isModelListener2) {
    handler = props[handlerName = toHandlerKey(hyphenate(event))];
  }
  if (handler) {
    callWithAsyncErrorHandling(handler, instance, 6, args);
  }
  const onceHandler = props[handlerName + `Once`];
  if (onceHandler) {
    if (!instance.emitted) {
      instance.emitted = {};
    } else if (instance.emitted[handlerName]) {
      return;
    }
    instance.emitted[handlerName] = true;
    callWithAsyncErrorHandling(onceHandler, instance, 6, args);
  }
}
function normalizeEmitsOptions(comp, appContext, asMixin = false) {
  const cache2 = appContext.emitsCache;
  const cached = cache2.get(comp);
  if (cached !== void 0) {
    return cached;
  }
  const raw = comp.emits;
  let normalized = {};
  let hasExtends = false;
  if (!isFunction$1(comp)) {
    const extendEmits = (raw2) => {
      const normalizedFromExtend = normalizeEmitsOptions(raw2, appContext, true);
      if (normalizedFromExtend) {
        hasExtends = true;
        extend(normalized, normalizedFromExtend);
      }
    };
    if (!asMixin && appContext.mixins.length) {
      appContext.mixins.forEach(extendEmits);
    }
    if (comp.extends) {
      extendEmits(comp.extends);
    }
    if (comp.mixins) {
      comp.mixins.forEach(extendEmits);
    }
  }
  if (!raw && !hasExtends) {
    if (isObject$2(comp)) {
      cache2.set(comp, null);
    }
    return null;
  }
  if (isArray$1(raw)) {
    raw.forEach((key) => normalized[key] = null);
  } else {
    extend(normalized, raw);
  }
  if (isObject$2(comp)) {
    cache2.set(comp, normalized);
  }
  return normalized;
}
function isEmitListener(options, key) {
  if (!options || !isOn(key)) {
    return false;
  }
  key = key.slice(2).replace(/Once$/, "");
  return hasOwn$2(options, key[0].toLowerCase() + key.slice(1)) || hasOwn$2(options, hyphenate(key)) || hasOwn$2(options, key);
}
let currentRenderingInstance = null;
function setCurrentRenderingInstance(instance) {
  const prev = currentRenderingInstance;
  currentRenderingInstance = instance;
  instance && instance.type.__scopeId || null;
  return prev;
}
function provide(key, value) {
  if (!currentInstance) {
    {
      warn$2(`provide() can only be used inside setup().`);
    }
  } else {
    let provides = currentInstance.provides;
    const parentProvides = currentInstance.parent && currentInstance.parent.provides;
    if (parentProvides === provides) {
      provides = currentInstance.provides = Object.create(parentProvides);
    }
    provides[key] = value;
    if (currentInstance.type.mpType === "app") {
      currentInstance.appContext.app.provide(key, value);
    }
  }
}
function inject(key, defaultValue, treatDefaultAsFactory = false) {
  const instance = currentInstance || currentRenderingInstance;
  if (instance) {
    const provides = instance.parent == null ? instance.vnode.appContext && instance.vnode.appContext.provides : instance.parent.provides;
    if (provides && key in provides) {
      return provides[key];
    } else if (arguments.length > 1) {
      return treatDefaultAsFactory && isFunction$1(defaultValue) ? defaultValue.call(instance.proxy) : defaultValue;
    } else {
      warn$2(`injection "${String(key)}" not found.`);
    }
  } else {
    warn$2(`inject() can only be used inside setup() or functional components.`);
  }
}
function watchEffect(effect, options) {
  return doWatch(effect, null, options);
}
const INITIAL_WATCHER_VALUE = {};
function watch(source, cb, options) {
  if (!isFunction$1(cb)) {
    warn$2(`\`watch(fn, options?)\` signature has been moved to a separate API. Use \`watchEffect(fn, options?)\` instead. \`watch\` now only supports \`watch(source, cb, options?) signature.`);
  }
  return doWatch(source, cb, options);
}
function doWatch(source, cb, { immediate, deep, flush, onTrack, onTrigger } = EMPTY_OBJ) {
  if (!cb) {
    if (immediate !== void 0) {
      warn$2(`watch() "immediate" option is only respected when using the watch(source, callback, options?) signature.`);
    }
    if (deep !== void 0) {
      warn$2(`watch() "deep" option is only respected when using the watch(source, callback, options?) signature.`);
    }
  }
  const warnInvalidSource = (s2) => {
    warn$2(`Invalid watch source: `, s2, `A watch source can only be a getter/effect function, a ref, a reactive object, or an array of these types.`);
  };
  const instance = getCurrentScope() === (currentInstance === null || currentInstance === void 0 ? void 0 : currentInstance.scope) ? currentInstance : null;
  let getter;
  let forceTrigger = false;
  let isMultiSource = false;
  if (isRef(source)) {
    getter = () => source.value;
    forceTrigger = isShallow(source);
  } else if (isReactive(source)) {
    getter = () => source;
    deep = true;
  } else if (isArray$1(source)) {
    isMultiSource = true;
    forceTrigger = source.some((s2) => isReactive(s2) || isShallow(s2));
    getter = () => source.map((s2) => {
      if (isRef(s2)) {
        return s2.value;
      } else if (isReactive(s2)) {
        return traverse(s2);
      } else if (isFunction$1(s2)) {
        return callWithErrorHandling(
          s2,
          instance,
          2
          /* ErrorCodes.WATCH_GETTER */
        );
      } else {
        warnInvalidSource(s2);
      }
    });
  } else if (isFunction$1(source)) {
    if (cb) {
      getter = () => callWithErrorHandling(
        source,
        instance,
        2
        /* ErrorCodes.WATCH_GETTER */
      );
    } else {
      getter = () => {
        if (instance && instance.isUnmounted) {
          return;
        }
        if (cleanup) {
          cleanup();
        }
        return callWithAsyncErrorHandling(source, instance, 3, [onCleanup]);
      };
    }
  } else {
    getter = NOOP;
    warnInvalidSource(source);
  }
  if (cb && deep) {
    const baseGetter = getter;
    getter = () => traverse(baseGetter());
  }
  let cleanup;
  let onCleanup = (fn) => {
    cleanup = effect.onStop = () => {
      callWithErrorHandling(
        fn,
        instance,
        4
        /* ErrorCodes.WATCH_CLEANUP */
      );
    };
  };
  let oldValue = isMultiSource ? new Array(source.length).fill(INITIAL_WATCHER_VALUE) : INITIAL_WATCHER_VALUE;
  const job = () => {
    if (!effect.active) {
      return;
    }
    if (cb) {
      const newValue = effect.run();
      if (deep || forceTrigger || (isMultiSource ? newValue.some((v, i) => hasChanged(v, oldValue[i])) : hasChanged(newValue, oldValue)) || false) {
        if (cleanup) {
          cleanup();
        }
        callWithAsyncErrorHandling(cb, instance, 3, [
          newValue,
          // pass undefined as the old value when it's changed for the first time
          oldValue === INITIAL_WATCHER_VALUE ? void 0 : isMultiSource && oldValue[0] === INITIAL_WATCHER_VALUE ? [] : oldValue,
          onCleanup
        ]);
        oldValue = newValue;
      }
    } else {
      effect.run();
    }
  };
  job.allowRecurse = !!cb;
  let scheduler;
  if (flush === "sync") {
    scheduler = job;
  } else if (flush === "post") {
    scheduler = () => queuePostRenderEffect$1(job, instance && instance.suspense);
  } else {
    job.pre = true;
    if (instance)
      job.id = instance.uid;
    scheduler = () => queueJob(job);
  }
  const effect = new ReactiveEffect(getter, scheduler);
  {
    effect.onTrack = onTrack;
    effect.onTrigger = onTrigger;
  }
  if (cb) {
    if (immediate) {
      job();
    } else {
      oldValue = effect.run();
    }
  } else if (flush === "post") {
    queuePostRenderEffect$1(effect.run.bind(effect), instance && instance.suspense);
  } else {
    effect.run();
  }
  const unwatch = () => {
    effect.stop();
    if (instance && instance.scope) {
      remove(instance.scope.effects, effect);
    }
  };
  return unwatch;
}
function instanceWatch(source, value, options) {
  const publicThis = this.proxy;
  const getter = isString$1(source) ? source.includes(".") ? createPathGetter(publicThis, source) : () => publicThis[source] : source.bind(publicThis, publicThis);
  let cb;
  if (isFunction$1(value)) {
    cb = value;
  } else {
    cb = value.handler;
    options = value;
  }
  const cur = currentInstance;
  setCurrentInstance(this);
  const res = doWatch(getter, cb.bind(publicThis), options);
  if (cur) {
    setCurrentInstance(cur);
  } else {
    unsetCurrentInstance();
  }
  return res;
}
function createPathGetter(ctx, path) {
  const segments = path.split(".");
  return () => {
    let cur = ctx;
    for (let i = 0; i < segments.length && cur; i++) {
      cur = cur[segments[i]];
    }
    return cur;
  };
}
function traverse(value, seen) {
  if (!isObject$2(value) || value[
    "__v_skip"
    /* ReactiveFlags.SKIP */
  ]) {
    return value;
  }
  seen = seen || /* @__PURE__ */ new Set();
  if (seen.has(value)) {
    return value;
  }
  seen.add(value);
  if (isRef(value)) {
    traverse(value.value, seen);
  } else if (isArray$1(value)) {
    for (let i = 0; i < value.length; i++) {
      traverse(value[i], seen);
    }
  } else if (isSet(value) || isMap(value)) {
    value.forEach((v) => {
      traverse(v, seen);
    });
  } else if (isPlainObject$2(value)) {
    for (const key in value) {
      traverse(value[key], seen);
    }
  }
  return value;
}
function defineComponent(options) {
  return isFunction$1(options) ? { setup: options, name: options.name } : options;
}
const isKeepAlive = (vnode) => vnode.type.__isKeepAlive;
function onActivated(hook, target) {
  registerKeepAliveHook(hook, "a", target);
}
function onDeactivated(hook, target) {
  registerKeepAliveHook(hook, "da", target);
}
function registerKeepAliveHook(hook, type, target = currentInstance) {
  const wrappedHook = hook.__wdc || (hook.__wdc = () => {
    let current = target;
    while (current) {
      if (current.isDeactivated) {
        return;
      }
      current = current.parent;
    }
    return hook();
  });
  injectHook(type, wrappedHook, target);
  if (target) {
    let current = target.parent;
    while (current && current.parent) {
      if (isKeepAlive(current.parent.vnode)) {
        injectToKeepAliveRoot(wrappedHook, type, target, current);
      }
      current = current.parent;
    }
  }
}
function injectToKeepAliveRoot(hook, type, target, keepAliveRoot) {
  const injected = injectHook(
    type,
    hook,
    keepAliveRoot,
    true
    /* prepend */
  );
  onUnmounted(() => {
    remove(keepAliveRoot[type], injected);
  }, target);
}
function injectHook(type, hook, target = currentInstance, prepend = false) {
  if (target) {
    if (isRootHook(type)) {
      target = target.root;
    }
    const hooks = target[type] || (target[type] = []);
    const wrappedHook = hook.__weh || (hook.__weh = (...args) => {
      if (target.isUnmounted) {
        return;
      }
      pauseTracking();
      setCurrentInstance(target);
      const res = callWithAsyncErrorHandling(hook, target, type, args);
      unsetCurrentInstance();
      resetTracking();
      return res;
    });
    if (prepend) {
      hooks.unshift(wrappedHook);
    } else {
      hooks.push(wrappedHook);
    }
    return wrappedHook;
  } else {
    const apiName = toHandlerKey((ErrorTypeStrings[type] || type.replace(/^on/, "")).replace(/ hook$/, ""));
    warn$2(`${apiName} is called when there is no active component instance to be associated with. Lifecycle injection APIs can only be used during execution of setup().`);
  }
}
const createHook$1 = (lifecycle) => (hook, target = currentInstance) => (
  // post-create lifecycle registrations are noops during SSR (except for serverPrefetch)
  (!isInSSRComponentSetup || lifecycle === "sp") && injectHook(lifecycle, (...args) => hook(...args), target)
);
const onBeforeMount = createHook$1(
  "bm"
  /* LifecycleHooks.BEFORE_MOUNT */
);
const onMounted = createHook$1(
  "m"
  /* LifecycleHooks.MOUNTED */
);
const onBeforeUpdate = createHook$1(
  "bu"
  /* LifecycleHooks.BEFORE_UPDATE */
);
const onUpdated = createHook$1(
  "u"
  /* LifecycleHooks.UPDATED */
);
const onBeforeUnmount = createHook$1(
  "bum"
  /* LifecycleHooks.BEFORE_UNMOUNT */
);
const onUnmounted = createHook$1(
  "um"
  /* LifecycleHooks.UNMOUNTED */
);
const onServerPrefetch = createHook$1(
  "sp"
  /* LifecycleHooks.SERVER_PREFETCH */
);
const onRenderTriggered = createHook$1(
  "rtg"
  /* LifecycleHooks.RENDER_TRIGGERED */
);
const onRenderTracked = createHook$1(
  "rtc"
  /* LifecycleHooks.RENDER_TRACKED */
);
function onErrorCaptured(hook, target = currentInstance) {
  injectHook("ec", hook, target);
}
function validateDirectiveName(name) {
  if (isBuiltInDirective(name)) {
    warn$2("Do not use built-in directive ids as custom directive id: " + name);
  }
}
const COMPONENTS = "components";
function resolveComponent(name, maybeSelfReference) {
  return resolveAsset(COMPONENTS, name, true, maybeSelfReference) || name;
}
function resolveAsset(type, name, warnMissing = true, maybeSelfReference = false) {
  const instance = currentRenderingInstance || currentInstance;
  if (instance) {
    const Component2 = instance.type;
    if (type === COMPONENTS) {
      const selfName = getComponentName(
        Component2,
        false
        /* do not include inferred name to avoid breaking existing code */
      );
      if (selfName && (selfName === name || selfName === camelize(name) || selfName === capitalize(camelize(name)))) {
        return Component2;
      }
    }
    const res = (
      // local registration
      // check instance[type] first which is resolved for options API
      resolve(instance[type] || Component2[type], name) || // global registration
      resolve(instance.appContext[type], name)
    );
    if (!res && maybeSelfReference) {
      return Component2;
    }
    if (warnMissing && !res) {
      const extra = type === COMPONENTS ? `
If this is a native custom element, make sure to exclude it from component resolution via compilerOptions.isCustomElement.` : ``;
      warn$2(`Failed to resolve ${type.slice(0, -1)}: ${name}${extra}`);
    }
    return res;
  } else {
    warn$2(`resolve${capitalize(type.slice(0, -1))} can only be used in render() or setup().`);
  }
}
function resolve(registry, name) {
  return registry && (registry[name] || registry[camelize(name)] || registry[capitalize(camelize(name))]);
}
const getPublicInstance = (i) => {
  if (!i)
    return null;
  if (isStatefulComponent(i))
    return getExposeProxy(i) || i.proxy;
  return getPublicInstance(i.parent);
};
const publicPropertiesMap = (
  // Move PURE marker to new line to workaround compiler discarding it
  // due to type annotation
  /* @__PURE__ */ extend(/* @__PURE__ */ Object.create(null), {
    $: (i) => i,
    // fixed by xxxxxx vue-i18n 在 dev 模式，访问了 $el，故模拟一个假的
    // $el: i => i.vnode.el,
    $el: (i) => i.__$el || (i.__$el = {}),
    $data: (i) => i.data,
    $props: (i) => shallowReadonly(i.props),
    $attrs: (i) => shallowReadonly(i.attrs),
    $slots: (i) => shallowReadonly(i.slots),
    $refs: (i) => shallowReadonly(i.refs),
    $parent: (i) => getPublicInstance(i.parent),
    $root: (i) => getPublicInstance(i.root),
    $emit: (i) => i.emit,
    $options: (i) => resolveMergedOptions(i),
    $forceUpdate: (i) => i.f || (i.f = () => queueJob(i.update)),
    // $nextTick: i => i.n || (i.n = nextTick.bind(i.proxy!)),// fixed by xxxxxx
    $watch: (i) => instanceWatch.bind(i)
  })
);
const isReservedPrefix = (key) => key === "_" || key === "$";
const hasSetupBinding = (state, key) => state !== EMPTY_OBJ && !state.__isScriptSetup && hasOwn$2(state, key);
const PublicInstanceProxyHandlers = {
  get({ _: instance }, key) {
    const { ctx, setupState, data, props, accessCache, type, appContext } = instance;
    if (key === "__isVue") {
      return true;
    }
    let normalizedProps;
    if (key[0] !== "$") {
      const n2 = accessCache[key];
      if (n2 !== void 0) {
        switch (n2) {
          case 1:
            return setupState[key];
          case 2:
            return data[key];
          case 4:
            return ctx[key];
          case 3:
            return props[key];
        }
      } else if (hasSetupBinding(setupState, key)) {
        accessCache[key] = 1;
        return setupState[key];
      } else if (data !== EMPTY_OBJ && hasOwn$2(data, key)) {
        accessCache[key] = 2;
        return data[key];
      } else if (
        // only cache other properties when instance has declared (thus stable)
        // props
        (normalizedProps = instance.propsOptions[0]) && hasOwn$2(normalizedProps, key)
      ) {
        accessCache[key] = 3;
        return props[key];
      } else if (ctx !== EMPTY_OBJ && hasOwn$2(ctx, key)) {
        accessCache[key] = 4;
        return ctx[key];
      } else if (shouldCacheAccess) {
        accessCache[key] = 0;
      }
    }
    const publicGetter = publicPropertiesMap[key];
    let cssModule, globalProperties;
    if (publicGetter) {
      if (key === "$attrs") {
        track(instance, "get", key);
      }
      return publicGetter(instance);
    } else if (
      // css module (injected by vue-loader)
      (cssModule = type.__cssModules) && (cssModule = cssModule[key])
    ) {
      return cssModule;
    } else if (ctx !== EMPTY_OBJ && hasOwn$2(ctx, key)) {
      accessCache[key] = 4;
      return ctx[key];
    } else if (
      // global properties
      globalProperties = appContext.config.globalProperties, hasOwn$2(globalProperties, key)
    ) {
      {
        return globalProperties[key];
      }
    } else if (currentRenderingInstance && (!isString$1(key) || // #1091 avoid internal isRef/isVNode checks on component instance leading
    // to infinite warning loop
    key.indexOf("__v") !== 0)) {
      if (data !== EMPTY_OBJ && isReservedPrefix(key[0]) && hasOwn$2(data, key)) {
        warn$2(`Property ${JSON.stringify(key)} must be accessed via $data because it starts with a reserved character ("$" or "_") and is not proxied on the render context.`);
      } else if (instance === currentRenderingInstance) {
        warn$2(`Property ${JSON.stringify(key)} was accessed during render but is not defined on instance.`);
      }
    }
  },
  set({ _: instance }, key, value) {
    const { data, setupState, ctx } = instance;
    if (hasSetupBinding(setupState, key)) {
      setupState[key] = value;
      return true;
    } else if (setupState.__isScriptSetup && hasOwn$2(setupState, key)) {
      warn$2(`Cannot mutate <script setup> binding "${key}" from Options API.`);
      return false;
    } else if (data !== EMPTY_OBJ && hasOwn$2(data, key)) {
      data[key] = value;
      return true;
    } else if (hasOwn$2(instance.props, key)) {
      warn$2(`Attempting to mutate prop "${key}". Props are readonly.`);
      return false;
    }
    if (key[0] === "$" && key.slice(1) in instance) {
      warn$2(`Attempting to mutate public property "${key}". Properties starting with $ are reserved and readonly.`);
      return false;
    } else {
      if (key in instance.appContext.config.globalProperties) {
        Object.defineProperty(ctx, key, {
          enumerable: true,
          configurable: true,
          value
        });
      } else {
        ctx[key] = value;
      }
    }
    return true;
  },
  has({ _: { data, setupState, accessCache, ctx, appContext, propsOptions } }, key) {
    let normalizedProps;
    return !!accessCache[key] || data !== EMPTY_OBJ && hasOwn$2(data, key) || hasSetupBinding(setupState, key) || (normalizedProps = propsOptions[0]) && hasOwn$2(normalizedProps, key) || hasOwn$2(ctx, key) || hasOwn$2(publicPropertiesMap, key) || hasOwn$2(appContext.config.globalProperties, key);
  },
  defineProperty(target, key, descriptor) {
    if (descriptor.get != null) {
      target._.accessCache[key] = 0;
    } else if (hasOwn$2(descriptor, "value")) {
      this.set(target, key, descriptor.value, null);
    }
    return Reflect.defineProperty(target, key, descriptor);
  }
};
{
  PublicInstanceProxyHandlers.ownKeys = (target) => {
    warn$2(`Avoid app logic that relies on enumerating keys on a component instance. The keys will be empty in production mode to avoid performance overhead.`);
    return Reflect.ownKeys(target);
  };
}
function createDevRenderContext(instance) {
  const target = {};
  Object.defineProperty(target, `_`, {
    configurable: true,
    enumerable: false,
    get: () => instance
  });
  Object.keys(publicPropertiesMap).forEach((key) => {
    Object.defineProperty(target, key, {
      configurable: true,
      enumerable: false,
      get: () => publicPropertiesMap[key](instance),
      // intercepted by the proxy so no need for implementation,
      // but needed to prevent set errors
      set: NOOP
    });
  });
  return target;
}
function exposePropsOnRenderContext(instance) {
  const { ctx, propsOptions: [propsOptions] } = instance;
  if (propsOptions) {
    Object.keys(propsOptions).forEach((key) => {
      Object.defineProperty(ctx, key, {
        enumerable: true,
        configurable: true,
        get: () => instance.props[key],
        set: NOOP
      });
    });
  }
}
function exposeSetupStateOnRenderContext(instance) {
  const { ctx, setupState } = instance;
  Object.keys(toRaw(setupState)).forEach((key) => {
    if (!setupState.__isScriptSetup) {
      if (isReservedPrefix(key[0])) {
        warn$2(`setup() return property ${JSON.stringify(key)} should not start with "$" or "_" which are reserved prefixes for Vue internals.`);
        return;
      }
      Object.defineProperty(ctx, key, {
        enumerable: true,
        configurable: true,
        get: () => setupState[key],
        set: NOOP
      });
    }
  });
}
function createDuplicateChecker() {
  const cache2 = /* @__PURE__ */ Object.create(null);
  return (type, key) => {
    if (cache2[key]) {
      warn$2(`${type} property "${key}" is already defined in ${cache2[key]}.`);
    } else {
      cache2[key] = type;
    }
  };
}
let shouldCacheAccess = true;
function applyOptions$1(instance) {
  const options = resolveMergedOptions(instance);
  const publicThis = instance.proxy;
  const ctx = instance.ctx;
  shouldCacheAccess = false;
  if (options.beforeCreate) {
    callHook$1(
      options.beforeCreate,
      instance,
      "bc"
      /* LifecycleHooks.BEFORE_CREATE */
    );
  }
  const {
    // state
    data: dataOptions,
    computed: computedOptions,
    methods,
    watch: watchOptions,
    provide: provideOptions,
    inject: injectOptions,
    // lifecycle
    created,
    beforeMount,
    mounted,
    beforeUpdate,
    updated,
    activated,
    deactivated,
    beforeDestroy,
    beforeUnmount,
    destroyed,
    unmounted,
    render,
    renderTracked,
    renderTriggered,
    errorCaptured,
    serverPrefetch,
    // public API
    expose,
    inheritAttrs,
    // assets
    components,
    directives,
    filters
  } = options;
  const checkDuplicateProperties = createDuplicateChecker();
  {
    const [propsOptions] = instance.propsOptions;
    if (propsOptions) {
      for (const key in propsOptions) {
        checkDuplicateProperties("Props", key);
      }
    }
  }
  if (injectOptions) {
    resolveInjections(injectOptions, ctx, checkDuplicateProperties, instance.appContext.config.unwrapInjectedRef);
  }
  if (methods) {
    for (const key in methods) {
      const methodHandler = methods[key];
      if (isFunction$1(methodHandler)) {
        {
          Object.defineProperty(ctx, key, {
            value: methodHandler.bind(publicThis),
            configurable: true,
            enumerable: true,
            writable: true
          });
        }
        {
          checkDuplicateProperties("Methods", key);
        }
      } else {
        warn$2(`Method "${key}" has type "${typeof methodHandler}" in the component definition. Did you reference the function correctly?`);
      }
    }
  }
  if (dataOptions) {
    if (!isFunction$1(dataOptions)) {
      warn$2(`The data option must be a function. Plain object usage is no longer supported.`);
    }
    const data = dataOptions.call(publicThis, publicThis);
    if (isPromise(data)) {
      warn$2(`data() returned a Promise - note data() cannot be async; If you intend to perform data fetching before component renders, use async setup() + <Suspense>.`);
    }
    if (!isObject$2(data)) {
      warn$2(`data() should return an object.`);
    } else {
      instance.data = reactive(data);
      {
        for (const key in data) {
          checkDuplicateProperties("Data", key);
          if (!isReservedPrefix(key[0])) {
            Object.defineProperty(ctx, key, {
              configurable: true,
              enumerable: true,
              get: () => data[key],
              set: NOOP
            });
          }
        }
      }
    }
  }
  shouldCacheAccess = true;
  if (computedOptions) {
    for (const key in computedOptions) {
      const opt = computedOptions[key];
      const get2 = isFunction$1(opt) ? opt.bind(publicThis, publicThis) : isFunction$1(opt.get) ? opt.get.bind(publicThis, publicThis) : NOOP;
      if (get2 === NOOP) {
        warn$2(`Computed property "${key}" has no getter.`);
      }
      const set2 = !isFunction$1(opt) && isFunction$1(opt.set) ? opt.set.bind(publicThis) : () => {
        warn$2(`Write operation failed: computed property "${key}" is readonly.`);
      };
      const c = computed({
        get: get2,
        set: set2
      });
      Object.defineProperty(ctx, key, {
        enumerable: true,
        configurable: true,
        get: () => c.value,
        set: (v) => c.value = v
      });
      {
        checkDuplicateProperties("Computed", key);
      }
    }
  }
  if (watchOptions) {
    for (const key in watchOptions) {
      createWatcher(watchOptions[key], ctx, publicThis, key);
    }
  }
  {
    if (provideOptions) {
      const provides = isFunction$1(provideOptions) ? provideOptions.call(publicThis) : provideOptions;
      Reflect.ownKeys(provides).forEach((key) => {
        provide(key, provides[key]);
      });
    }
  }
  {
    if (created) {
      callHook$1(
        created,
        instance,
        "c"
        /* LifecycleHooks.CREATED */
      );
    }
  }
  function registerLifecycleHook(register, hook) {
    if (isArray$1(hook)) {
      hook.forEach((_hook) => register(_hook.bind(publicThis)));
    } else if (hook) {
      register(hook.bind(publicThis));
    }
  }
  registerLifecycleHook(onBeforeMount, beforeMount);
  registerLifecycleHook(onMounted, mounted);
  registerLifecycleHook(onBeforeUpdate, beforeUpdate);
  registerLifecycleHook(onUpdated, updated);
  registerLifecycleHook(onActivated, activated);
  registerLifecycleHook(onDeactivated, deactivated);
  registerLifecycleHook(onErrorCaptured, errorCaptured);
  registerLifecycleHook(onRenderTracked, renderTracked);
  registerLifecycleHook(onRenderTriggered, renderTriggered);
  registerLifecycleHook(onBeforeUnmount, beforeUnmount);
  registerLifecycleHook(onUnmounted, unmounted);
  registerLifecycleHook(onServerPrefetch, serverPrefetch);
  if (isArray$1(expose)) {
    if (expose.length) {
      const exposed = instance.exposed || (instance.exposed = {});
      expose.forEach((key) => {
        Object.defineProperty(exposed, key, {
          get: () => publicThis[key],
          set: (val) => publicThis[key] = val
        });
      });
    } else if (!instance.exposed) {
      instance.exposed = {};
    }
  }
  if (render && instance.render === NOOP) {
    instance.render = render;
  }
  if (inheritAttrs != null) {
    instance.inheritAttrs = inheritAttrs;
  }
  if (components)
    instance.components = components;
  if (directives)
    instance.directives = directives;
  if (instance.ctx.$onApplyOptions) {
    instance.ctx.$onApplyOptions(options, instance, publicThis);
  }
}
function resolveInjections(injectOptions, ctx, checkDuplicateProperties = NOOP, unwrapRef = false) {
  if (isArray$1(injectOptions)) {
    injectOptions = normalizeInject(injectOptions);
  }
  for (const key in injectOptions) {
    const opt = injectOptions[key];
    let injected;
    if (isObject$2(opt)) {
      if ("default" in opt) {
        injected = inject(
          opt.from || key,
          opt.default,
          true
          /* treat default function as factory */
        );
      } else {
        injected = inject(opt.from || key);
      }
    } else {
      injected = inject(opt);
    }
    if (isRef(injected)) {
      if (unwrapRef) {
        Object.defineProperty(ctx, key, {
          enumerable: true,
          configurable: true,
          get: () => injected.value,
          set: (v) => injected.value = v
        });
      } else {
        {
          warn$2(`injected property "${key}" is a ref and will be auto-unwrapped and no longer needs \`.value\` in the next minor release. To opt-in to the new behavior now, set \`app.config.unwrapInjectedRef = true\` (this config is temporary and will not be needed in the future.)`);
        }
        ctx[key] = injected;
      }
    } else {
      ctx[key] = injected;
    }
    {
      checkDuplicateProperties("Inject", key);
    }
  }
}
function callHook$1(hook, instance, type) {
  callWithAsyncErrorHandling(isArray$1(hook) ? hook.map((h2) => h2.bind(instance.proxy)) : hook.bind(instance.proxy), instance, type);
}
function createWatcher(raw, ctx, publicThis, key) {
  const getter = key.includes(".") ? createPathGetter(publicThis, key) : () => publicThis[key];
  if (isString$1(raw)) {
    const handler = ctx[raw];
    if (isFunction$1(handler)) {
      watch(getter, handler);
    } else {
      warn$2(`Invalid watch handler specified by key "${raw}"`, handler);
    }
  } else if (isFunction$1(raw)) {
    watch(getter, raw.bind(publicThis));
  } else if (isObject$2(raw)) {
    if (isArray$1(raw)) {
      raw.forEach((r) => createWatcher(r, ctx, publicThis, key));
    } else {
      const handler = isFunction$1(raw.handler) ? raw.handler.bind(publicThis) : ctx[raw.handler];
      if (isFunction$1(handler)) {
        watch(getter, handler, raw);
      } else {
        warn$2(`Invalid watch handler specified by key "${raw.handler}"`, handler);
      }
    }
  } else {
    warn$2(`Invalid watch option: "${key}"`, raw);
  }
}
function resolveMergedOptions(instance) {
  const base = instance.type;
  const { mixins, extends: extendsOptions } = base;
  const { mixins: globalMixins, optionsCache: cache2, config: { optionMergeStrategies } } = instance.appContext;
  const cached = cache2.get(base);
  let resolved;
  if (cached) {
    resolved = cached;
  } else if (!globalMixins.length && !mixins && !extendsOptions) {
    {
      resolved = base;
    }
  } else {
    resolved = {};
    if (globalMixins.length) {
      globalMixins.forEach((m) => mergeOptions(resolved, m, optionMergeStrategies, true));
    }
    mergeOptions(resolved, base, optionMergeStrategies);
  }
  if (isObject$2(base)) {
    cache2.set(base, resolved);
  }
  return resolved;
}
function mergeOptions(to, from, strats, asMixin = false) {
  const { mixins, extends: extendsOptions } = from;
  if (extendsOptions) {
    mergeOptions(to, extendsOptions, strats, true);
  }
  if (mixins) {
    mixins.forEach((m) => mergeOptions(to, m, strats, true));
  }
  for (const key in from) {
    if (asMixin && key === "expose") {
      warn$2(`"expose" option is ignored when declared in mixins or extends. It should only be declared in the base component itself.`);
    } else {
      const strat = internalOptionMergeStrats[key] || strats && strats[key];
      to[key] = strat ? strat(to[key], from[key]) : from[key];
    }
  }
  return to;
}
const internalOptionMergeStrats = {
  data: mergeDataFn,
  props: mergeObjectOptions,
  emits: mergeObjectOptions,
  // objects
  methods: mergeObjectOptions,
  computed: mergeObjectOptions,
  // lifecycle
  beforeCreate: mergeAsArray$1,
  created: mergeAsArray$1,
  beforeMount: mergeAsArray$1,
  mounted: mergeAsArray$1,
  beforeUpdate: mergeAsArray$1,
  updated: mergeAsArray$1,
  beforeDestroy: mergeAsArray$1,
  beforeUnmount: mergeAsArray$1,
  destroyed: mergeAsArray$1,
  unmounted: mergeAsArray$1,
  activated: mergeAsArray$1,
  deactivated: mergeAsArray$1,
  errorCaptured: mergeAsArray$1,
  serverPrefetch: mergeAsArray$1,
  // assets
  components: mergeObjectOptions,
  directives: mergeObjectOptions,
  // watch
  watch: mergeWatchOptions,
  // provide / inject
  provide: mergeDataFn,
  inject: mergeInject
};
function mergeDataFn(to, from) {
  if (!from) {
    return to;
  }
  if (!to) {
    return from;
  }
  return function mergedDataFn() {
    return extend(isFunction$1(to) ? to.call(this, this) : to, isFunction$1(from) ? from.call(this, this) : from);
  };
}
function mergeInject(to, from) {
  return mergeObjectOptions(normalizeInject(to), normalizeInject(from));
}
function normalizeInject(raw) {
  if (isArray$1(raw)) {
    const res = {};
    for (let i = 0; i < raw.length; i++) {
      res[raw[i]] = raw[i];
    }
    return res;
  }
  return raw;
}
function mergeAsArray$1(to, from) {
  return to ? [...new Set([].concat(to, from))] : from;
}
function mergeObjectOptions(to, from) {
  return to ? extend(extend(/* @__PURE__ */ Object.create(null), to), from) : from;
}
function mergeWatchOptions(to, from) {
  if (!to)
    return from;
  if (!from)
    return to;
  const merged = extend(/* @__PURE__ */ Object.create(null), to);
  for (const key in from) {
    merged[key] = mergeAsArray$1(to[key], from[key]);
  }
  return merged;
}
function initProps$1(instance, rawProps, isStateful, isSSR = false) {
  const props = {};
  const attrs = {};
  instance.propsDefaults = /* @__PURE__ */ Object.create(null);
  setFullProps(instance, rawProps, props, attrs);
  for (const key in instance.propsOptions[0]) {
    if (!(key in props)) {
      props[key] = void 0;
    }
  }
  {
    validateProps(rawProps || {}, props, instance);
  }
  if (isStateful) {
    instance.props = isSSR ? props : shallowReactive(props);
  } else {
    if (!instance.type.props) {
      instance.props = attrs;
    } else {
      instance.props = props;
    }
  }
  instance.attrs = attrs;
}
function isInHmrContext(instance) {
  while (instance) {
    if (instance.type.__hmrId)
      return true;
    instance = instance.parent;
  }
}
function updateProps(instance, rawProps, rawPrevProps, optimized) {
  const { props, attrs, vnode: { patchFlag } } = instance;
  const rawCurrentProps = toRaw(props);
  const [options] = instance.propsOptions;
  let hasAttrsChanged = false;
  if (
    // always force full diff in dev
    // - #1942 if hmr is enabled with sfc component
    // - vite#872 non-sfc component used by sfc component
    !isInHmrContext(instance) && (optimized || patchFlag > 0) && !(patchFlag & 16)
  ) {
    if (patchFlag & 8) {
      const propsToUpdate = instance.vnode.dynamicProps;
      for (let i = 0; i < propsToUpdate.length; i++) {
        let key = propsToUpdate[i];
        if (isEmitListener(instance.emitsOptions, key)) {
          continue;
        }
        const value = rawProps[key];
        if (options) {
          if (hasOwn$2(attrs, key)) {
            if (value !== attrs[key]) {
              attrs[key] = value;
              hasAttrsChanged = true;
            }
          } else {
            const camelizedKey = camelize(key);
            props[camelizedKey] = resolvePropValue(
              options,
              rawCurrentProps,
              camelizedKey,
              value,
              instance,
              false
              /* isAbsent */
            );
          }
        } else {
          if (value !== attrs[key]) {
            attrs[key] = value;
            hasAttrsChanged = true;
          }
        }
      }
    }
  } else {
    if (setFullProps(instance, rawProps, props, attrs)) {
      hasAttrsChanged = true;
    }
    let kebabKey;
    for (const key in rawCurrentProps) {
      if (!rawProps || // for camelCase
      !hasOwn$2(rawProps, key) && // it's possible the original props was passed in as kebab-case
      // and converted to camelCase (#955)
      ((kebabKey = hyphenate(key)) === key || !hasOwn$2(rawProps, kebabKey))) {
        if (options) {
          if (rawPrevProps && // for camelCase
          (rawPrevProps[key] !== void 0 || // for kebab-case
          rawPrevProps[kebabKey] !== void 0)) {
            props[key] = resolvePropValue(
              options,
              rawCurrentProps,
              key,
              void 0,
              instance,
              true
              /* isAbsent */
            );
          }
        } else {
          delete props[key];
        }
      }
    }
    if (attrs !== rawCurrentProps) {
      for (const key in attrs) {
        if (!rawProps || !hasOwn$2(rawProps, key) && true) {
          delete attrs[key];
          hasAttrsChanged = true;
        }
      }
    }
  }
  if (hasAttrsChanged) {
    trigger(instance, "set", "$attrs");
  }
  {
    validateProps(rawProps || {}, props, instance);
  }
}
function setFullProps(instance, rawProps, props, attrs) {
  const [options, needCastKeys] = instance.propsOptions;
  let hasAttrsChanged = false;
  let rawCastValues;
  if (rawProps) {
    for (let key in rawProps) {
      if (isReservedProp(key)) {
        continue;
      }
      const value = rawProps[key];
      let camelKey;
      if (options && hasOwn$2(options, camelKey = camelize(key))) {
        if (!needCastKeys || !needCastKeys.includes(camelKey)) {
          props[camelKey] = value;
        } else {
          (rawCastValues || (rawCastValues = {}))[camelKey] = value;
        }
      } else if (!isEmitListener(instance.emitsOptions, key)) {
        if (!(key in attrs) || value !== attrs[key]) {
          attrs[key] = value;
          hasAttrsChanged = true;
        }
      }
    }
  }
  if (needCastKeys) {
    const rawCurrentProps = toRaw(props);
    const castValues = rawCastValues || EMPTY_OBJ;
    for (let i = 0; i < needCastKeys.length; i++) {
      const key = needCastKeys[i];
      props[key] = resolvePropValue(options, rawCurrentProps, key, castValues[key], instance, !hasOwn$2(castValues, key));
    }
  }
  return hasAttrsChanged;
}
function resolvePropValue(options, props, key, value, instance, isAbsent) {
  const opt = options[key];
  if (opt != null) {
    const hasDefault = hasOwn$2(opt, "default");
    if (hasDefault && value === void 0) {
      const defaultValue = opt.default;
      if (opt.type !== Function && isFunction$1(defaultValue)) {
        const { propsDefaults } = instance;
        if (key in propsDefaults) {
          value = propsDefaults[key];
        } else {
          setCurrentInstance(instance);
          value = propsDefaults[key] = defaultValue.call(null, props);
          unsetCurrentInstance();
        }
      } else {
        value = defaultValue;
      }
    }
    if (opt[
      0
      /* BooleanFlags.shouldCast */
    ]) {
      if (isAbsent && !hasDefault) {
        value = false;
      } else if (opt[
        1
        /* BooleanFlags.shouldCastTrue */
      ] && (value === "" || value === hyphenate(key))) {
        value = true;
      }
    }
  }
  return value;
}
function normalizePropsOptions(comp, appContext, asMixin = false) {
  const cache2 = appContext.propsCache;
  const cached = cache2.get(comp);
  if (cached) {
    return cached;
  }
  const raw = comp.props;
  const normalized = {};
  const needCastKeys = [];
  let hasExtends = false;
  if (!isFunction$1(comp)) {
    const extendProps = (raw2) => {
      hasExtends = true;
      const [props, keys] = normalizePropsOptions(raw2, appContext, true);
      extend(normalized, props);
      if (keys)
        needCastKeys.push(...keys);
    };
    if (!asMixin && appContext.mixins.length) {
      appContext.mixins.forEach(extendProps);
    }
    if (comp.extends) {
      extendProps(comp.extends);
    }
    if (comp.mixins) {
      comp.mixins.forEach(extendProps);
    }
  }
  if (!raw && !hasExtends) {
    if (isObject$2(comp)) {
      cache2.set(comp, EMPTY_ARR);
    }
    return EMPTY_ARR;
  }
  if (isArray$1(raw)) {
    for (let i = 0; i < raw.length; i++) {
      if (!isString$1(raw[i])) {
        warn$2(`props must be strings when using array syntax.`, raw[i]);
      }
      const normalizedKey = camelize(raw[i]);
      if (validatePropName(normalizedKey)) {
        normalized[normalizedKey] = EMPTY_OBJ;
      }
    }
  } else if (raw) {
    if (!isObject$2(raw)) {
      warn$2(`invalid props options`, raw);
    }
    for (const key in raw) {
      const normalizedKey = camelize(key);
      if (validatePropName(normalizedKey)) {
        const opt = raw[key];
        const prop = normalized[normalizedKey] = isArray$1(opt) || isFunction$1(opt) ? { type: opt } : Object.assign({}, opt);
        if (prop) {
          const booleanIndex = getTypeIndex(Boolean, prop.type);
          const stringIndex = getTypeIndex(String, prop.type);
          prop[
            0
            /* BooleanFlags.shouldCast */
          ] = booleanIndex > -1;
          prop[
            1
            /* BooleanFlags.shouldCastTrue */
          ] = stringIndex < 0 || booleanIndex < stringIndex;
          if (booleanIndex > -1 || hasOwn$2(prop, "default")) {
            needCastKeys.push(normalizedKey);
          }
        }
      }
    }
  }
  const res = [normalized, needCastKeys];
  if (isObject$2(comp)) {
    cache2.set(comp, res);
  }
  return res;
}
function validatePropName(key) {
  if (key[0] !== "$") {
    return true;
  } else {
    warn$2(`Invalid prop name: "${key}" is a reserved property.`);
  }
  return false;
}
function getType(ctor) {
  const match = ctor && ctor.toString().match(/^\s*(function|class) (\w+)/);
  return match ? match[2] : ctor === null ? "null" : "";
}
function isSameType(a, b) {
  return getType(a) === getType(b);
}
function getTypeIndex(type, expectedTypes) {
  if (isArray$1(expectedTypes)) {
    return expectedTypes.findIndex((t2) => isSameType(t2, type));
  } else if (isFunction$1(expectedTypes)) {
    return isSameType(expectedTypes, type) ? 0 : -1;
  }
  return -1;
}
function validateProps(rawProps, props, instance) {
  const resolvedValues = toRaw(props);
  const options = instance.propsOptions[0];
  for (const key in options) {
    let opt = options[key];
    if (opt == null)
      continue;
    validateProp(key, resolvedValues[key], opt, !hasOwn$2(rawProps, key) && !hasOwn$2(rawProps, hyphenate(key)));
  }
}
function validateProp(name, value, prop, isAbsent) {
  const { type, required, validator } = prop;
  if (required && isAbsent) {
    warn$2('Missing required prop: "' + name + '"');
    return;
  }
  if (value == null && !prop.required) {
    return;
  }
  if (type != null && type !== true) {
    let isValid = false;
    const types = isArray$1(type) ? type : [type];
    const expectedTypes = [];
    for (let i = 0; i < types.length && !isValid; i++) {
      const { valid, expectedType } = assertType(value, types[i]);
      expectedTypes.push(expectedType || "");
      isValid = valid;
    }
    if (!isValid) {
      warn$2(getInvalidTypeMessage(name, value, expectedTypes));
      return;
    }
  }
  if (validator && !validator(value)) {
    warn$2('Invalid prop: custom validator check failed for prop "' + name + '".');
  }
}
const isSimpleType = /* @__PURE__ */ makeMap("String,Number,Boolean,Function,Symbol,BigInt");
function assertType(value, type) {
  let valid;
  const expectedType = getType(type);
  if (isSimpleType(expectedType)) {
    const t2 = typeof value;
    valid = t2 === expectedType.toLowerCase();
    if (!valid && t2 === "object") {
      valid = value instanceof type;
    }
  } else if (expectedType === "Object") {
    valid = isObject$2(value);
  } else if (expectedType === "Array") {
    valid = isArray$1(value);
  } else if (expectedType === "null") {
    valid = value === null;
  } else {
    valid = value instanceof type;
  }
  return {
    valid,
    expectedType
  };
}
function getInvalidTypeMessage(name, value, expectedTypes) {
  let message = `Invalid prop: type check failed for prop "${name}". Expected ${expectedTypes.map(capitalize).join(" | ")}`;
  const expectedType = expectedTypes[0];
  const receivedType = toRawType(value);
  const expectedValue = styleValue(value, expectedType);
  const receivedValue = styleValue(value, receivedType);
  if (expectedTypes.length === 1 && isExplicable(expectedType) && !isBoolean$1(expectedType, receivedType)) {
    message += ` with value ${expectedValue}`;
  }
  message += `, got ${receivedType} `;
  if (isExplicable(receivedType)) {
    message += `with value ${receivedValue}.`;
  }
  return message;
}
function styleValue(value, type) {
  if (type === "String") {
    return `"${value}"`;
  } else if (type === "Number") {
    return `${Number(value)}`;
  } else {
    return `${value}`;
  }
}
function isExplicable(type) {
  const explicitTypes = ["string", "number", "boolean"];
  return explicitTypes.some((elem) => type.toLowerCase() === elem);
}
function isBoolean$1(...args) {
  return args.some((elem) => elem.toLowerCase() === "boolean");
}
function createAppContext() {
  return {
    app: null,
    config: {
      isNativeTag: NO,
      performance: false,
      globalProperties: {},
      optionMergeStrategies: {},
      errorHandler: void 0,
      warnHandler: void 0,
      compilerOptions: {}
    },
    mixins: [],
    components: {},
    directives: {},
    provides: /* @__PURE__ */ Object.create(null),
    optionsCache: /* @__PURE__ */ new WeakMap(),
    propsCache: /* @__PURE__ */ new WeakMap(),
    emitsCache: /* @__PURE__ */ new WeakMap()
  };
}
let uid$1 = 0;
function createAppAPI(render, hydrate) {
  return function createApp2(rootComponent, rootProps = null) {
    if (!isFunction$1(rootComponent)) {
      rootComponent = Object.assign({}, rootComponent);
    }
    if (rootProps != null && !isObject$2(rootProps)) {
      warn$2(`root props passed to app.mount() must be an object.`);
      rootProps = null;
    }
    const context = createAppContext();
    const installedPlugins = /* @__PURE__ */ new Set();
    const app = context.app = {
      _uid: uid$1++,
      _component: rootComponent,
      _props: rootProps,
      _container: null,
      _context: context,
      _instance: null,
      version,
      get config() {
        return context.config;
      },
      set config(v) {
        {
          warn$2(`app.config cannot be replaced. Modify individual options instead.`);
        }
      },
      use(plugin2, ...options) {
        if (installedPlugins.has(plugin2)) {
          warn$2(`Plugin has already been applied to target app.`);
        } else if (plugin2 && isFunction$1(plugin2.install)) {
          installedPlugins.add(plugin2);
          plugin2.install(app, ...options);
        } else if (isFunction$1(plugin2)) {
          installedPlugins.add(plugin2);
          plugin2(app, ...options);
        } else {
          warn$2(`A plugin must either be a function or an object with an "install" function.`);
        }
        return app;
      },
      mixin(mixin) {
        {
          if (!context.mixins.includes(mixin)) {
            context.mixins.push(mixin);
          } else {
            warn$2("Mixin has already been applied to target app" + (mixin.name ? `: ${mixin.name}` : ""));
          }
        }
        return app;
      },
      component(name, component) {
        {
          validateComponentName(name, context.config);
        }
        if (!component) {
          return context.components[name];
        }
        if (context.components[name]) {
          warn$2(`Component "${name}" has already been registered in target app.`);
        }
        context.components[name] = component;
        return app;
      },
      directive(name, directive) {
        {
          validateDirectiveName(name);
        }
        if (!directive) {
          return context.directives[name];
        }
        if (context.directives[name]) {
          warn$2(`Directive "${name}" has already been registered in target app.`);
        }
        context.directives[name] = directive;
        return app;
      },
      // fixed by xxxxxx
      mount() {
      },
      // fixed by xxxxxx
      unmount() {
      },
      provide(key, value) {
        if (key in context.provides) {
          warn$2(`App already provides property with key "${String(key)}". It will be overwritten with the new value.`);
        }
        context.provides[key] = value;
        return app;
      }
    };
    return app;
  };
}
let supported;
let perf;
function startMeasure(instance, type) {
  if (instance.appContext.config.performance && isSupported()) {
    perf.mark(`vue-${type}-${instance.uid}`);
  }
  {
    devtoolsPerfStart(instance, type, isSupported() ? perf.now() : Date.now());
  }
}
function endMeasure(instance, type) {
  if (instance.appContext.config.performance && isSupported()) {
    const startTag = `vue-${type}-${instance.uid}`;
    const endTag = startTag + `:end`;
    perf.mark(endTag);
    perf.measure(`<${formatComponentName(instance, instance.type)}> ${type}`, startTag, endTag);
    perf.clearMarks(startTag);
    perf.clearMarks(endTag);
  }
  {
    devtoolsPerfEnd(instance, type, isSupported() ? perf.now() : Date.now());
  }
}
function isSupported() {
  if (supported !== void 0) {
    return supported;
  }
  if (typeof window !== "undefined" && window.performance) {
    supported = true;
    perf = window.performance;
  } else {
    supported = false;
  }
  return supported;
}
const queuePostRenderEffect$1 = queuePostFlushCb;
const Fragment = Symbol("Fragment");
const Text = Symbol("Text");
const Comment = Symbol("Comment");
const Static = Symbol("Static");
function isVNode(value) {
  return value ? value.__v_isVNode === true : false;
}
const InternalObjectKey = `__vInternal`;
function guardReactiveProps(props) {
  if (!props)
    return null;
  return isProxy(props) || InternalObjectKey in props ? extend({}, props) : props;
}
const emptyAppContext = createAppContext();
let uid = 0;
function createComponentInstance(vnode, parent, suspense) {
  const type = vnode.type;
  const appContext = (parent ? parent.appContext : vnode.appContext) || emptyAppContext;
  const instance = {
    uid: uid++,
    vnode,
    type,
    parent,
    appContext,
    root: null,
    next: null,
    subTree: null,
    effect: null,
    update: null,
    scope: new EffectScope(
      true
      /* detached */
    ),
    render: null,
    proxy: null,
    exposed: null,
    exposeProxy: null,
    withProxy: null,
    provides: parent ? parent.provides : Object.create(appContext.provides),
    accessCache: null,
    renderCache: [],
    // local resolved assets
    components: null,
    directives: null,
    // resolved props and emits options
    propsOptions: normalizePropsOptions(type, appContext),
    emitsOptions: normalizeEmitsOptions(type, appContext),
    // emit
    emit: null,
    emitted: null,
    // props default value
    propsDefaults: EMPTY_OBJ,
    // inheritAttrs
    inheritAttrs: type.inheritAttrs,
    // state
    ctx: EMPTY_OBJ,
    data: EMPTY_OBJ,
    props: EMPTY_OBJ,
    attrs: EMPTY_OBJ,
    slots: EMPTY_OBJ,
    refs: EMPTY_OBJ,
    setupState: EMPTY_OBJ,
    setupContext: null,
    // suspense related
    suspense,
    suspenseId: suspense ? suspense.pendingId : 0,
    asyncDep: null,
    asyncResolved: false,
    // lifecycle hooks
    // not using enums here because it results in computed properties
    isMounted: false,
    isUnmounted: false,
    isDeactivated: false,
    bc: null,
    c: null,
    bm: null,
    m: null,
    bu: null,
    u: null,
    um: null,
    bum: null,
    da: null,
    a: null,
    rtg: null,
    rtc: null,
    ec: null,
    sp: null
  };
  {
    instance.ctx = createDevRenderContext(instance);
  }
  instance.root = parent ? parent.root : instance;
  instance.emit = emit.bind(null, instance);
  if (vnode.ce) {
    vnode.ce(instance);
  }
  return instance;
}
let currentInstance = null;
const getCurrentInstance = () => currentInstance || currentRenderingInstance;
const setCurrentInstance = (instance) => {
  currentInstance = instance;
  instance.scope.on();
};
const unsetCurrentInstance = () => {
  currentInstance && currentInstance.scope.off();
  currentInstance = null;
};
const isBuiltInTag = /* @__PURE__ */ makeMap("slot,component");
function validateComponentName(name, config2) {
  const appIsNativeTag = config2.isNativeTag || NO;
  if (isBuiltInTag(name) || appIsNativeTag(name)) {
    warn$2("Do not use built-in or reserved HTML elements as component id: " + name);
  }
}
function isStatefulComponent(instance) {
  return instance.vnode.shapeFlag & 4;
}
let isInSSRComponentSetup = false;
function setupComponent(instance, isSSR = false) {
  isInSSRComponentSetup = isSSR;
  const {
    props
    /*, children*/
  } = instance.vnode;
  const isStateful = isStatefulComponent(instance);
  initProps$1(instance, props, isStateful, isSSR);
  const setupResult = isStateful ? setupStatefulComponent(instance, isSSR) : void 0;
  isInSSRComponentSetup = false;
  return setupResult;
}
function setupStatefulComponent(instance, isSSR) {
  const Component2 = instance.type;
  {
    if (Component2.name) {
      validateComponentName(Component2.name, instance.appContext.config);
    }
    if (Component2.components) {
      const names = Object.keys(Component2.components);
      for (let i = 0; i < names.length; i++) {
        validateComponentName(names[i], instance.appContext.config);
      }
    }
    if (Component2.directives) {
      const names = Object.keys(Component2.directives);
      for (let i = 0; i < names.length; i++) {
        validateDirectiveName(names[i]);
      }
    }
    if (Component2.compilerOptions && isRuntimeOnly()) {
      warn$2(`"compilerOptions" is only supported when using a build of Vue that includes the runtime compiler. Since you are using a runtime-only build, the options should be passed via your build tool config instead.`);
    }
  }
  instance.accessCache = /* @__PURE__ */ Object.create(null);
  instance.proxy = markRaw(new Proxy(instance.ctx, PublicInstanceProxyHandlers));
  {
    exposePropsOnRenderContext(instance);
  }
  const { setup } = Component2;
  if (setup) {
    const setupContext = instance.setupContext = setup.length > 1 ? createSetupContext(instance) : null;
    setCurrentInstance(instance);
    pauseTracking();
    const setupResult = callWithErrorHandling(setup, instance, 0, [shallowReadonly(instance.props), setupContext]);
    resetTracking();
    unsetCurrentInstance();
    if (isPromise(setupResult)) {
      setupResult.then(unsetCurrentInstance, unsetCurrentInstance);
      {
        warn$2(`setup() returned a Promise, but the version of Vue you are using does not support it yet.`);
      }
    } else {
      handleSetupResult(instance, setupResult, isSSR);
    }
  } else {
    finishComponentSetup(instance, isSSR);
  }
}
function handleSetupResult(instance, setupResult, isSSR) {
  if (isFunction$1(setupResult)) {
    {
      instance.render = setupResult;
    }
  } else if (isObject$2(setupResult)) {
    if (isVNode(setupResult)) {
      warn$2(`setup() should not return VNodes directly - return a render function instead.`);
    }
    {
      instance.devtoolsRawSetupState = setupResult;
    }
    instance.setupState = proxyRefs(setupResult);
    {
      exposeSetupStateOnRenderContext(instance);
    }
  } else if (setupResult !== void 0) {
    warn$2(`setup() should return an object. Received: ${setupResult === null ? "null" : typeof setupResult}`);
  }
  finishComponentSetup(instance, isSSR);
}
let compile;
const isRuntimeOnly = () => !compile;
function finishComponentSetup(instance, isSSR, skipOptions) {
  const Component2 = instance.type;
  if (!instance.render) {
    instance.render = Component2.render || NOOP;
  }
  {
    setCurrentInstance(instance);
    pauseTracking();
    applyOptions$1(instance);
    resetTracking();
    unsetCurrentInstance();
  }
  if (!Component2.render && instance.render === NOOP && !isSSR) {
    if (Component2.template) {
      warn$2(
        `Component provided template option but runtime compilation is not supported in this build of Vue. Configure your bundler to alias "vue" to "vue/dist/vue.esm-bundler.js".`
        /* should not happen */
      );
    } else {
      warn$2(`Component is missing template or render function.`);
    }
  }
}
function createAttrsProxy(instance) {
  return new Proxy(
    instance.attrs,
    {
      get(target, key) {
        track(instance, "get", "$attrs");
        return target[key];
      },
      set() {
        warn$2(`setupContext.attrs is readonly.`);
        return false;
      },
      deleteProperty() {
        warn$2(`setupContext.attrs is readonly.`);
        return false;
      }
    }
  );
}
function createSetupContext(instance) {
  const expose = (exposed) => {
    {
      if (instance.exposed) {
        warn$2(`expose() should be called only once per setup().`);
      }
      if (exposed != null) {
        let exposedType = typeof exposed;
        if (exposedType === "object") {
          if (isArray$1(exposed)) {
            exposedType = "array";
          } else if (isRef(exposed)) {
            exposedType = "ref";
          }
        }
        if (exposedType !== "object") {
          warn$2(`expose() should be passed a plain object, received ${exposedType}.`);
        }
      }
    }
    instance.exposed = exposed || {};
  };
  let attrs;
  {
    return Object.freeze({
      get attrs() {
        return attrs || (attrs = createAttrsProxy(instance));
      },
      get slots() {
        return shallowReadonly(instance.slots);
      },
      get emit() {
        return (event, ...args) => instance.emit(event, ...args);
      },
      expose
    });
  }
}
function getExposeProxy(instance) {
  if (instance.exposed) {
    return instance.exposeProxy || (instance.exposeProxy = new Proxy(proxyRefs(markRaw(instance.exposed)), {
      get(target, key) {
        if (key in target) {
          return target[key];
        }
        return instance.proxy[key];
      },
      has(target, key) {
        return key in target || key in publicPropertiesMap;
      }
    }));
  }
}
const classifyRE = /(?:^|[-_])(\w)/g;
const classify = (str) => str.replace(classifyRE, (c) => c.toUpperCase()).replace(/[-_]/g, "");
function getComponentName(Component2, includeInferred = true) {
  return isFunction$1(Component2) ? Component2.displayName || Component2.name : Component2.name || includeInferred && Component2.__name;
}
function formatComponentName(instance, Component2, isRoot = false) {
  let name = getComponentName(Component2);
  if (!name && Component2.__file) {
    const match = Component2.__file.match(/([^/\\]+)\.\w+$/);
    if (match) {
      name = match[1];
    }
  }
  if (!name && instance && instance.parent) {
    const inferFromRegistry = (registry) => {
      for (const key in registry) {
        if (registry[key] === Component2) {
          return key;
        }
      }
    };
    name = inferFromRegistry(instance.components || instance.parent.type.components) || inferFromRegistry(instance.appContext.components);
  }
  return name ? classify(name) : isRoot ? `App` : `Anonymous`;
}
const computed = (getterOrOptions, debugOptions) => {
  return computed$1(getterOrOptions, debugOptions, isInSSRComponentSetup);
};
const version = "3.2.47";
function unwrapper(target) {
  return unref(target);
}
const ARRAYTYPE = "[object Array]";
const OBJECTTYPE = "[object Object]";
function diff(current, pre) {
  const result = {};
  syncKeys(current, pre);
  _diff(current, pre, "", result);
  return result;
}
function syncKeys(current, pre) {
  current = unwrapper(current);
  if (current === pre)
    return;
  const rootCurrentType = toTypeString$1(current);
  const rootPreType = toTypeString$1(pre);
  if (rootCurrentType == OBJECTTYPE && rootPreType == OBJECTTYPE) {
    for (let key in pre) {
      const currentValue = current[key];
      if (currentValue === void 0) {
        current[key] = null;
      } else {
        syncKeys(currentValue, pre[key]);
      }
    }
  } else if (rootCurrentType == ARRAYTYPE && rootPreType == ARRAYTYPE) {
    if (current.length >= pre.length) {
      pre.forEach((item, index2) => {
        syncKeys(current[index2], item);
      });
    }
  }
}
function _diff(current, pre, path, result) {
  current = unwrapper(current);
  if (current === pre)
    return;
  const rootCurrentType = toTypeString$1(current);
  const rootPreType = toTypeString$1(pre);
  if (rootCurrentType == OBJECTTYPE) {
    if (rootPreType != OBJECTTYPE || Object.keys(current).length < Object.keys(pre).length) {
      setResult(result, path, current);
    } else {
      for (let key in current) {
        const currentValue = unwrapper(current[key]);
        const preValue = pre[key];
        const currentType = toTypeString$1(currentValue);
        const preType = toTypeString$1(preValue);
        if (currentType != ARRAYTYPE && currentType != OBJECTTYPE) {
          if (currentValue != preValue) {
            setResult(result, (path == "" ? "" : path + ".") + key, currentValue);
          }
        } else if (currentType == ARRAYTYPE) {
          if (preType != ARRAYTYPE) {
            setResult(result, (path == "" ? "" : path + ".") + key, currentValue);
          } else {
            if (currentValue.length < preValue.length) {
              setResult(result, (path == "" ? "" : path + ".") + key, currentValue);
            } else {
              currentValue.forEach((item, index2) => {
                _diff(item, preValue[index2], (path == "" ? "" : path + ".") + key + "[" + index2 + "]", result);
              });
            }
          }
        } else if (currentType == OBJECTTYPE) {
          if (preType != OBJECTTYPE || Object.keys(currentValue).length < Object.keys(preValue).length) {
            setResult(result, (path == "" ? "" : path + ".") + key, currentValue);
          } else {
            for (let subKey in currentValue) {
              _diff(currentValue[subKey], preValue[subKey], (path == "" ? "" : path + ".") + key + "." + subKey, result);
            }
          }
        }
      }
    }
  } else if (rootCurrentType == ARRAYTYPE) {
    if (rootPreType != ARRAYTYPE) {
      setResult(result, path, current);
    } else {
      if (current.length < pre.length) {
        setResult(result, path, current);
      } else {
        current.forEach((item, index2) => {
          _diff(item, pre[index2], path + "[" + index2 + "]", result);
        });
      }
    }
  } else {
    setResult(result, path, current);
  }
}
function setResult(result, k, v) {
  result[k] = v;
}
function hasComponentEffect(instance) {
  return queue.includes(instance.update);
}
function flushCallbacks(instance) {
  const ctx = instance.ctx;
  const callbacks = ctx.__next_tick_callbacks;
  if (callbacks && callbacks.length) {
    const copies = callbacks.slice(0);
    callbacks.length = 0;
    for (let i = 0; i < copies.length; i++) {
      copies[i]();
    }
  }
}
function nextTick(instance, fn) {
  const ctx = instance.ctx;
  if (!ctx.__next_tick_pending && !hasComponentEffect(instance)) {
    return nextTick$1(fn && fn.bind(instance.proxy));
  }
  let _resolve;
  if (!ctx.__next_tick_callbacks) {
    ctx.__next_tick_callbacks = [];
  }
  ctx.__next_tick_callbacks.push(() => {
    if (fn) {
      callWithErrorHandling(
        fn.bind(instance.proxy),
        instance,
        14
        /* ErrorCodes.SCHEDULER */
      );
    } else if (_resolve) {
      _resolve(instance.proxy);
    }
  });
  return new Promise((resolve2) => {
    _resolve = resolve2;
  });
}
function clone(src, seen) {
  src = unwrapper(src);
  const type = typeof src;
  if (type === "object" && src !== null) {
    let copy = seen.get(src);
    if (typeof copy !== "undefined") {
      return copy;
    }
    if (isArray$1(src)) {
      const len = src.length;
      copy = new Array(len);
      seen.set(src, copy);
      for (let i = 0; i < len; i++) {
        copy[i] = clone(src[i], seen);
      }
    } else {
      copy = {};
      seen.set(src, copy);
      for (const name in src) {
        if (hasOwn$2(src, name)) {
          copy[name] = clone(src[name], seen);
        }
      }
    }
    return copy;
  }
  if (type !== "symbol") {
    return src;
  }
}
function deepCopy$1(src) {
  return clone(src, typeof WeakMap !== "undefined" ? /* @__PURE__ */ new WeakMap() : /* @__PURE__ */ new Map());
}
function getMPInstanceData(instance, keys) {
  const data = instance.data;
  const ret = /* @__PURE__ */ Object.create(null);
  keys.forEach((key) => {
    ret[key] = data[key];
  });
  return ret;
}
function patch(instance, data, oldData) {
  if (!data) {
    return;
  }
  data = deepCopy$1(data);
  const ctx = instance.ctx;
  const mpType = ctx.mpType;
  if (mpType === "page" || mpType === "component") {
    data.r0 = 1;
    const mpInstance = ctx.$scope;
    const keys = Object.keys(data);
    const diffData = diff(data, oldData || getMPInstanceData(mpInstance, keys));
    if (Object.keys(diffData).length) {
      ctx.__next_tick_pending = true;
      mpInstance.setData(diffData, () => {
        ctx.__next_tick_pending = false;
        flushCallbacks(instance);
      });
      flushPreFlushCbs();
    } else {
      flushCallbacks(instance);
    }
  }
}
function initAppConfig(appConfig) {
  appConfig.globalProperties.$nextTick = function $nextTick(fn) {
    return nextTick(this.$, fn);
  };
}
function onApplyOptions(options, instance, publicThis) {
  instance.appContext.config.globalProperties.$applyOptions(options, instance, publicThis);
  const computedOptions = options.computed;
  if (computedOptions) {
    const keys = Object.keys(computedOptions);
    if (keys.length) {
      const ctx = instance.ctx;
      if (!ctx.$computedKeys) {
        ctx.$computedKeys = [];
      }
      ctx.$computedKeys.push(...keys);
    }
  }
  delete instance.ctx.$onApplyOptions;
}
function setRef$1(instance, isUnmount = false) {
  const { setupState, $templateRefs, ctx: { $scope, $mpPlatform } } = instance;
  if ($mpPlatform === "mp-alipay") {
    return;
  }
  if (!$templateRefs || !$scope) {
    return;
  }
  if (isUnmount) {
    return $templateRefs.forEach((templateRef) => setTemplateRef(templateRef, null, setupState));
  }
  const check = $mpPlatform === "mp-baidu" || $mpPlatform === "mp-toutiao";
  const doSetByRefs = (refs) => {
    const mpComponents = (
      // 字节小程序 selectAllComponents 可能返回 null
      // https://github.com/dcloudio/uni-app/issues/3954
      ($scope.selectAllComponents(".r") || []).concat($scope.selectAllComponents(".r-i-f") || [])
    );
    return refs.filter((templateRef) => {
      const refValue = findComponentPublicInstance(mpComponents, templateRef.i);
      if (check && refValue === null) {
        return true;
      }
      setTemplateRef(templateRef, refValue, setupState);
      return false;
    });
  };
  const doSet = () => {
    const refs = doSetByRefs($templateRefs);
    if (refs.length && instance.proxy && instance.proxy.$scope) {
      instance.proxy.$scope.setData({ r1: 1 }, () => {
        doSetByRefs(refs);
      });
    }
  };
  if ($scope._$setRef) {
    $scope._$setRef(doSet);
  } else {
    nextTick(instance, doSet);
  }
}
function toSkip(value) {
  if (isObject$2(value)) {
    markRaw(value);
  }
  return value;
}
function findComponentPublicInstance(mpComponents, id) {
  const mpInstance = mpComponents.find((com) => com && (com.properties || com.props).uI === id);
  if (mpInstance) {
    const vm = mpInstance.$vm;
    if (vm) {
      return getExposeProxy(vm.$) || vm;
    }
    return toSkip(mpInstance);
  }
  return null;
}
function setTemplateRef({ r, f: f2 }, refValue, setupState) {
  if (isFunction$1(r)) {
    r(refValue, {});
  } else {
    const _isString = isString$1(r);
    const _isRef = isRef(r);
    if (_isString || _isRef) {
      if (f2) {
        if (!_isRef) {
          return;
        }
        if (!isArray$1(r.value)) {
          r.value = [];
        }
        const existing = r.value;
        if (existing.indexOf(refValue) === -1) {
          existing.push(refValue);
          if (!refValue) {
            return;
          }
          onBeforeUnmount(() => remove(existing, refValue), refValue.$);
        }
      } else if (_isString) {
        if (hasOwn$2(setupState, r)) {
          setupState[r] = refValue;
        }
      } else if (isRef(r)) {
        r.value = refValue;
      } else {
        warnRef(r);
      }
    } else {
      warnRef(r);
    }
  }
}
function warnRef(ref2) {
  warn$2("Invalid template ref type:", ref2, `(${typeof ref2})`);
}
var MPType;
(function(MPType2) {
  MPType2["APP"] = "app";
  MPType2["PAGE"] = "page";
  MPType2["COMPONENT"] = "component";
})(MPType || (MPType = {}));
const queuePostRenderEffect = queuePostFlushCb;
function mountComponent(initialVNode, options) {
  const instance = initialVNode.component = createComponentInstance(initialVNode, options.parentComponent, null);
  {
    instance.ctx.$onApplyOptions = onApplyOptions;
    instance.ctx.$children = [];
  }
  if (options.mpType === "app") {
    instance.render = NOOP;
  }
  if (options.onBeforeSetup) {
    options.onBeforeSetup(instance, options);
  }
  {
    pushWarningContext(initialVNode);
    startMeasure(instance, `mount`);
  }
  {
    startMeasure(instance, `init`);
  }
  setupComponent(instance);
  {
    endMeasure(instance, `init`);
  }
  {
    if (options.parentComponent && instance.proxy) {
      options.parentComponent.ctx.$children.push(getExposeProxy(instance) || instance.proxy);
    }
  }
  setupRenderEffect(instance);
  {
    popWarningContext();
    endMeasure(instance, `mount`);
  }
  return instance.proxy;
}
const getFunctionalFallthrough = (attrs) => {
  let res;
  for (const key in attrs) {
    if (key === "class" || key === "style" || isOn(key)) {
      (res || (res = {}))[key] = attrs[key];
    }
  }
  return res;
};
function renderComponentRoot(instance) {
  const { type: Component2, vnode, proxy, withProxy, props, propsOptions: [propsOptions], slots, attrs, emit: emit2, render, renderCache, data, setupState, ctx, uid: uid2, appContext: { app: { config: { globalProperties: { pruneComponentPropsCache: pruneComponentPropsCache2 } } } }, inheritAttrs } = instance;
  instance.$templateRefs = [];
  instance.$ei = 0;
  pruneComponentPropsCache2(uid2);
  instance.__counter = instance.__counter === 0 ? 1 : 0;
  let result;
  const prev = setCurrentRenderingInstance(instance);
  try {
    if (vnode.shapeFlag & 4) {
      fallthroughAttrs(inheritAttrs, props, propsOptions, attrs);
      const proxyToUse = withProxy || proxy;
      result = render.call(proxyToUse, proxyToUse, renderCache, props, setupState, data, ctx);
    } else {
      fallthroughAttrs(inheritAttrs, props, propsOptions, Component2.props ? attrs : getFunctionalFallthrough(attrs));
      const render2 = Component2;
      result = render2.length > 1 ? render2(props, { attrs, slots, emit: emit2 }) : render2(
        props,
        null
        /* we know it doesn't need it */
      );
    }
  } catch (err) {
    handleError(
      err,
      instance,
      1
      /* ErrorCodes.RENDER_FUNCTION */
    );
    result = false;
  }
  setRef$1(instance);
  setCurrentRenderingInstance(prev);
  return result;
}
function fallthroughAttrs(inheritAttrs, props, propsOptions, fallthroughAttrs2) {
  if (props && fallthroughAttrs2 && inheritAttrs !== false) {
    const keys = Object.keys(fallthroughAttrs2).filter((key) => key !== "class" && key !== "style");
    if (!keys.length) {
      return;
    }
    if (propsOptions && keys.some(isModelListener)) {
      keys.forEach((key) => {
        if (!isModelListener(key) || !(key.slice(9) in propsOptions)) {
          props[key] = fallthroughAttrs2[key];
        }
      });
    } else {
      keys.forEach((key) => props[key] = fallthroughAttrs2[key]);
    }
  }
}
const updateComponentPreRender = (instance) => {
  pauseTracking();
  flushPreFlushCbs();
  resetTracking();
};
function componentUpdateScopedSlotsFn() {
  const scopedSlotsData = this.$scopedSlotsData;
  if (!scopedSlotsData || scopedSlotsData.length === 0) {
    return;
  }
  const mpInstance = this.ctx.$scope;
  const oldData = mpInstance.data;
  const diffData = /* @__PURE__ */ Object.create(null);
  scopedSlotsData.forEach(({ path, index: index2, data }) => {
    const oldScopedSlotData = getValueByDataPath(oldData, path);
    const diffPath = isString$1(index2) ? `${path}.${index2}` : `${path}[${index2}]`;
    if (typeof oldScopedSlotData === "undefined" || typeof oldScopedSlotData[index2] === "undefined") {
      diffData[diffPath] = data;
    } else {
      const diffScopedSlotData = diff(data, oldScopedSlotData[index2]);
      Object.keys(diffScopedSlotData).forEach((name) => {
        diffData[diffPath + "." + name] = diffScopedSlotData[name];
      });
    }
  });
  scopedSlotsData.length = 0;
  if (Object.keys(diffData).length) {
    mpInstance.setData(diffData);
  }
}
function toggleRecurse({ effect, update }, allowed) {
  effect.allowRecurse = update.allowRecurse = allowed;
}
function setupRenderEffect(instance) {
  const updateScopedSlots = componentUpdateScopedSlotsFn.bind(instance);
  instance.$updateScopedSlots = () => nextTick$1(() => queueJob(updateScopedSlots));
  const componentUpdateFn = () => {
    if (!instance.isMounted) {
      onBeforeUnmount(() => {
        setRef$1(instance, true);
      }, instance);
      {
        startMeasure(instance, `patch`);
      }
      patch(instance, renderComponentRoot(instance));
      {
        endMeasure(instance, `patch`);
      }
      {
        devtoolsComponentAdded(instance);
      }
    } else {
      const { next, bu, u } = instance;
      {
        pushWarningContext(next || instance.vnode);
      }
      toggleRecurse(instance, false);
      updateComponentPreRender();
      if (bu) {
        invokeArrayFns$1(bu);
      }
      toggleRecurse(instance, true);
      {
        startMeasure(instance, `patch`);
      }
      patch(instance, renderComponentRoot(instance));
      {
        endMeasure(instance, `patch`);
      }
      if (u) {
        queuePostRenderEffect(u);
      }
      {
        devtoolsComponentUpdated(instance);
      }
      {
        popWarningContext();
      }
    }
  };
  const effect = instance.effect = new ReactiveEffect(
    componentUpdateFn,
    () => queueJob(instance.update),
    instance.scope
    // track it in component's effect scope
  );
  const update = instance.update = effect.run.bind(effect);
  update.id = instance.uid;
  toggleRecurse(instance, true);
  {
    effect.onTrack = instance.rtc ? (e2) => invokeArrayFns$1(instance.rtc, e2) : void 0;
    effect.onTrigger = instance.rtg ? (e2) => invokeArrayFns$1(instance.rtg, e2) : void 0;
    update.ownerInstance = instance;
  }
  update();
}
function unmountComponent(instance) {
  const { bum, scope, update, um } = instance;
  if (bum) {
    invokeArrayFns$1(bum);
  }
  scope.stop();
  if (update) {
    update.active = false;
  }
  if (um) {
    queuePostRenderEffect(um);
  }
  queuePostRenderEffect(() => {
    instance.isUnmounted = true;
  });
  {
    devtoolsComponentRemoved(instance);
  }
}
const oldCreateApp = createAppAPI();
function getTarget() {
  if (typeof window !== "undefined") {
    return window;
  }
  if (typeof globalThis !== "undefined") {
    return globalThis;
  }
  if (typeof global !== "undefined") {
    return global;
  }
  if (typeof my !== "undefined") {
    return my;
  }
}
function createVueApp(rootComponent, rootProps = null) {
  const target = getTarget();
  target.__VUE__ = true;
  {
    setDevtoolsHook(target.__VUE_DEVTOOLS_GLOBAL_HOOK__, target);
  }
  const app = oldCreateApp(rootComponent, rootProps);
  const appContext = app._context;
  initAppConfig(appContext.config);
  const createVNode2 = (initialVNode) => {
    initialVNode.appContext = appContext;
    initialVNode.shapeFlag = 6;
    return initialVNode;
  };
  const createComponent2 = function createComponent3(initialVNode, options) {
    return mountComponent(createVNode2(initialVNode), options);
  };
  const destroyComponent = function destroyComponent2(component) {
    return component && unmountComponent(component.$);
  };
  app.mount = function mount() {
    rootComponent.render = NOOP;
    const instance = mountComponent(createVNode2({ type: rootComponent }), {
      mpType: MPType.APP,
      mpInstance: null,
      parentComponent: null,
      slots: [],
      props: null
    });
    app._instance = instance.$;
    {
      devtoolsInitApp(app, version);
    }
    instance.$app = app;
    instance.$createComponent = createComponent2;
    instance.$destroyComponent = destroyComponent;
    appContext.$appInstance = instance;
    return instance;
  };
  app.unmount = function unmount() {
    warn$2(`Cannot unmount an app.`);
  };
  return app;
}
function createVNode() {
}
function injectLifecycleHook(name, hook, publicThis, instance) {
  if (isFunction$1(hook)) {
    injectHook(name, hook.bind(publicThis), instance);
  }
}
function initHooks$1(options, instance, publicThis) {
  const mpType = options.mpType || publicThis.$mpType;
  if (!mpType || mpType === "component") {
    return;
  }
  Object.keys(options).forEach((name) => {
    if (isUniLifecycleHook(name, options[name], false)) {
      const hooks = options[name];
      if (isArray$1(hooks)) {
        hooks.forEach((hook) => injectLifecycleHook(name, hook, publicThis, instance));
      } else {
        injectLifecycleHook(name, hooks, publicThis, instance);
      }
    }
  });
}
function applyOptions$2(options, instance, publicThis) {
  initHooks$1(options, instance, publicThis);
}
function set$3(target, key, val) {
  return target[key] = val;
}
function createErrorHandler(app) {
  return function errorHandler(err, instance, _info) {
    if (!instance) {
      throw err;
    }
    const appInstance = app._instance;
    if (!appInstance || !appInstance.proxy) {
      throw err;
    }
    {
      appInstance.proxy.$callHook(ON_ERROR, err);
    }
  };
}
function mergeAsArray(to, from) {
  return to ? [...new Set([].concat(to, from))] : from;
}
function initOptionMergeStrategies(optionMergeStrategies) {
  UniLifecycleHooks.forEach((name) => {
    optionMergeStrategies[name] = mergeAsArray;
  });
}
let realAtob;
const b64 = "ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz0123456789+/=";
const b64re = /^(?:[A-Za-z\d+/]{4})*?(?:[A-Za-z\d+/]{2}(?:==)?|[A-Za-z\d+/]{3}=?)?$/;
if (typeof atob !== "function") {
  realAtob = function(str) {
    str = String(str).replace(/[\t\n\f\r ]+/g, "");
    if (!b64re.test(str)) {
      throw new Error("Failed to execute 'atob' on 'Window': The string to be decoded is not correctly encoded.");
    }
    str += "==".slice(2 - (str.length & 3));
    var bitmap;
    var result = "";
    var r1;
    var r2;
    var i = 0;
    for (; i < str.length; ) {
      bitmap = b64.indexOf(str.charAt(i++)) << 18 | b64.indexOf(str.charAt(i++)) << 12 | (r1 = b64.indexOf(str.charAt(i++))) << 6 | (r2 = b64.indexOf(str.charAt(i++)));
      result += r1 === 64 ? String.fromCharCode(bitmap >> 16 & 255) : r2 === 64 ? String.fromCharCode(bitmap >> 16 & 255, bitmap >> 8 & 255) : String.fromCharCode(bitmap >> 16 & 255, bitmap >> 8 & 255, bitmap & 255);
    }
    return result;
  };
} else {
  realAtob = atob;
}
function b64DecodeUnicode(str) {
  return decodeURIComponent(realAtob(str).split("").map(function(c) {
    return "%" + ("00" + c.charCodeAt(0).toString(16)).slice(-2);
  }).join(""));
}
function getCurrentUserInfo() {
  const token = index.getStorageSync("uni_id_token") || "";
  const tokenArr = token.split(".");
  if (!token || tokenArr.length !== 3) {
    return {
      uid: null,
      role: [],
      permission: [],
      tokenExpired: 0
    };
  }
  let userInfo;
  try {
    userInfo = JSON.parse(b64DecodeUnicode(tokenArr[1]));
  } catch (error) {
    throw new Error("获取当前用户信息出错，详细错误信息为：" + error.message);
  }
  userInfo.tokenExpired = userInfo.exp * 1e3;
  delete userInfo.exp;
  delete userInfo.iat;
  return userInfo;
}
function uniIdMixin(globalProperties) {
  globalProperties.uniIDHasRole = function(roleId) {
    const { role } = getCurrentUserInfo();
    return role.indexOf(roleId) > -1;
  };
  globalProperties.uniIDHasPermission = function(permissionId) {
    const { permission } = getCurrentUserInfo();
    return this.uniIDHasRole("admin") || permission.indexOf(permissionId) > -1;
  };
  globalProperties.uniIDTokenValid = function() {
    const { tokenExpired } = getCurrentUserInfo();
    return tokenExpired > Date.now();
  };
}
function initApp(app) {
  const appConfig = app._context.config;
  appConfig.errorHandler = invokeCreateErrorHandler(app, createErrorHandler);
  initOptionMergeStrategies(appConfig.optionMergeStrategies);
  const globalProperties = appConfig.globalProperties;
  {
    uniIdMixin(globalProperties);
  }
  {
    globalProperties.$set = set$3;
    globalProperties.$applyOptions = applyOptions$2;
  }
  {
    index.invokeCreateVueAppHook(app);
  }
}
const propsCaches = /* @__PURE__ */ Object.create(null);
function renderProps(props) {
  const { uid: uid2, __counter } = getCurrentInstance();
  const propsId = (propsCaches[uid2] || (propsCaches[uid2] = [])).push(guardReactiveProps(props)) - 1;
  return uid2 + "," + propsId + "," + __counter;
}
function pruneComponentPropsCache(uid2) {
  delete propsCaches[uid2];
}
function findComponentPropsData(up) {
  if (!up) {
    return;
  }
  const [uid2, propsId] = up.split(",");
  if (!propsCaches[uid2]) {
    return;
  }
  return propsCaches[uid2][parseInt(propsId)];
}
var plugin = {
  install(app) {
    initApp(app);
    app.config.globalProperties.pruneComponentPropsCache = pruneComponentPropsCache;
    const oldMount = app.mount;
    app.mount = function mount(rootContainer) {
      const instance = oldMount.call(app, rootContainer);
      const createApp2 = getCreateApp();
      if (createApp2) {
        createApp2(instance);
      } else {
        if (typeof createMiniProgramApp !== "undefined") {
          createMiniProgramApp(instance);
        }
      }
      return instance;
    };
  }
};
function getCreateApp() {
  const method = "createApp";
  if (typeof global !== "undefined") {
    return global[method];
  } else if (typeof my !== "undefined") {
    return my[method];
  }
}
function vOn(value, key) {
  const instance = getCurrentInstance();
  const ctx = instance.ctx;
  const extraKey = typeof key !== "undefined" && (ctx.$mpPlatform === "mp-weixin" || ctx.$mpPlatform === "mp-qq") && (isString$1(key) || typeof key === "number") ? "_" + key : "";
  const name = "e" + instance.$ei++ + extraKey;
  const mpInstance = ctx.$scope;
  if (!value) {
    delete mpInstance[name];
    return name;
  }
  const existingInvoker = mpInstance[name];
  if (existingInvoker) {
    existingInvoker.value = value;
  } else {
    mpInstance[name] = createInvoker(value, instance);
  }
  return name;
}
function createInvoker(initialValue, instance) {
  const invoker = (e2) => {
    patchMPEvent(e2);
    let args = [e2];
    if (e2.detail && e2.detail.__args__) {
      args = e2.detail.__args__;
    }
    const eventValue = invoker.value;
    const invoke = () => callWithAsyncErrorHandling(patchStopImmediatePropagation(e2, eventValue), instance, 5, args);
    const eventTarget = e2.target;
    const eventSync = eventTarget ? eventTarget.dataset ? String(eventTarget.dataset.eventsync) === "true" : false : false;
    if (bubbles.includes(e2.type) && !eventSync) {
      setTimeout(invoke);
    } else {
      const res = invoke();
      if (e2.type === "input" && (isArray$1(res) || isPromise(res))) {
        return;
      }
      return res;
    }
  };
  invoker.value = initialValue;
  return invoker;
}
const bubbles = [
  // touch事件暂不做延迟，否则在 Android 上会影响性能，比如一些拖拽跟手手势等
  // 'touchstart',
  // 'touchmove',
  // 'touchcancel',
  // 'touchend',
  "tap",
  "longpress",
  "longtap",
  "transitionend",
  "animationstart",
  "animationiteration",
  "animationend",
  "touchforcechange"
];
function patchMPEvent(event) {
  if (event.type && event.target) {
    event.preventDefault = NOOP;
    event.stopPropagation = NOOP;
    event.stopImmediatePropagation = NOOP;
    if (!hasOwn$2(event, "detail")) {
      event.detail = {};
    }
    if (hasOwn$2(event, "markerId")) {
      event.detail = typeof event.detail === "object" ? event.detail : {};
      event.detail.markerId = event.markerId;
    }
    if (isPlainObject$2(event.detail) && hasOwn$2(event.detail, "checked") && !hasOwn$2(event.detail, "value")) {
      event.detail.value = event.detail.checked;
    }
    if (isPlainObject$2(event.detail)) {
      event.target = extend({}, event.target, event.detail);
    }
  }
}
function patchStopImmediatePropagation(e2, value) {
  if (isArray$1(value)) {
    const originalStop = e2.stopImmediatePropagation;
    e2.stopImmediatePropagation = () => {
      originalStop && originalStop.call(e2);
      e2._stopped = true;
    };
    return value.map((fn) => (e3) => !e3._stopped && fn(e3));
  } else {
    return value;
  }
}
function vFor(source, renderItem) {
  let ret;
  if (isArray$1(source) || isString$1(source)) {
    ret = new Array(source.length);
    for (let i = 0, l = source.length; i < l; i++) {
      ret[i] = renderItem(source[i], i, i);
    }
  } else if (typeof source === "number") {
    if (!Number.isInteger(source)) {
      warn$2(`The v-for range expect an integer value but got ${source}.`);
      return [];
    }
    ret = new Array(source);
    for (let i = 0; i < source; i++) {
      ret[i] = renderItem(i + 1, i, i);
    }
  } else if (isObject$2(source)) {
    if (source[Symbol.iterator]) {
      ret = Array.from(source, (item, i) => renderItem(item, i, i));
    } else {
      const keys = Object.keys(source);
      ret = new Array(keys.length);
      for (let i = 0, l = keys.length; i < l; i++) {
        const key = keys[i];
        ret[i] = renderItem(source[key], key, i);
      }
    }
  } else {
    ret = [];
  }
  return ret;
}
function stringifyStyle(value) {
  if (isString$1(value)) {
    return value;
  }
  return stringify(normalizeStyle(value));
}
function stringify(styles) {
  let ret = "";
  if (!styles || isString$1(styles)) {
    return ret;
  }
  for (const key in styles) {
    ret += `${key.startsWith(`--`) ? key : hyphenate(key)}:${styles[key]};`;
  }
  return ret;
}
function setRef(ref2, id, opts = {}) {
  const { $templateRefs } = getCurrentInstance();
  $templateRefs.push({ i: id, r: ref2, k: opts.k, f: opts.f });
}
function setupDevtoolsPlugin() {
}
const o = (value, key) => vOn(value, key);
const f = (source, renderItem) => vFor(source, renderItem);
const s = (value) => stringifyStyle(value);
const e = (target, ...sources) => extend(target, ...sources);
const h = (str) => hyphenate(str);
const n = (value) => normalizeClass(value);
const t = (val) => toDisplayString$1(val);
const p = (props) => renderProps(props);
const sr = (ref2, id, opts) => setRef(ref2, id, opts);
function createApp$1(rootComponent, rootProps = null) {
  rootComponent && (rootComponent.mpType = "app");
  return createVueApp(rootComponent, rootProps).use(plugin);
}
const createSSRApp = createApp$1;
const MP_METHODS = [
  "createSelectorQuery",
  "createIntersectionObserver",
  "selectAllComponents",
  "selectComponent"
];
function createEmitFn(oldEmit, ctx) {
  return function emit2(event, ...args) {
    const scope = ctx.$scope;
    if (scope && event) {
      const detail = { __args__: args };
      {
        scope.triggerEvent(event, detail);
      }
    }
    return oldEmit.apply(this, [event, ...args]);
  };
}
function initBaseInstance(instance, options) {
  const ctx = instance.ctx;
  ctx.mpType = options.mpType;
  ctx.$mpType = options.mpType;
  ctx.$mpPlatform = "mp-weixin";
  ctx.$scope = options.mpInstance;
  ctx.$mp = {};
  {
    ctx._self = {};
  }
  instance.slots = {};
  if (isArray$1(options.slots) && options.slots.length) {
    options.slots.forEach((name) => {
      instance.slots[name] = true;
    });
    if (instance.slots[SLOT_DEFAULT_NAME]) {
      instance.slots.default = true;
    }
  }
  ctx.getOpenerEventChannel = function() {
    {
      return options.mpInstance.getOpenerEventChannel();
    }
  };
  ctx.$hasHook = hasHook;
  ctx.$callHook = callHook;
  instance.emit = createEmitFn(instance.emit, ctx);
}
function initComponentInstance(instance, options) {
  initBaseInstance(instance, options);
  const ctx = instance.ctx;
  MP_METHODS.forEach((method) => {
    ctx[method] = function(...args) {
      const mpInstance = ctx.$scope;
      if (mpInstance && mpInstance[method]) {
        return mpInstance[method].apply(mpInstance, args);
      }
    };
  });
}
function initMocks(instance, mpInstance, mocks2) {
  const ctx = instance.ctx;
  mocks2.forEach((mock) => {
    if (hasOwn$2(mpInstance, mock)) {
      instance[mock] = ctx[mock] = mpInstance[mock];
    }
  });
}
function hasHook(name) {
  const hooks = this.$[name];
  if (hooks && hooks.length) {
    return true;
  }
  return false;
}
function callHook(name, args) {
  if (name === "mounted") {
    callHook.call(this, "bm");
    this.$.isMounted = true;
    name = "m";
  }
  const hooks = this.$[name];
  return hooks && invokeArrayFns(hooks, args);
}
const PAGE_INIT_HOOKS = [
  ON_LOAD,
  ON_SHOW,
  ON_HIDE,
  ON_UNLOAD,
  ON_RESIZE,
  ON_TAB_ITEM_TAP,
  ON_REACH_BOTTOM,
  ON_PULL_DOWN_REFRESH,
  ON_ADD_TO_FAVORITES
  // 'onReady', // lifetimes.ready
  // 'onPageScroll', // 影响性能，开发者手动注册
  // 'onShareTimeline', // 右上角菜单，开发者手动注册
  // 'onShareAppMessage' // 右上角菜单，开发者手动注册
];
function findHooks(vueOptions, hooks = /* @__PURE__ */ new Set()) {
  if (vueOptions) {
    Object.keys(vueOptions).forEach((name) => {
      if (isUniLifecycleHook(name, vueOptions[name])) {
        hooks.add(name);
      }
    });
    {
      const { extends: extendsOptions, mixins } = vueOptions;
      if (mixins) {
        mixins.forEach((mixin) => findHooks(mixin, hooks));
      }
      if (extendsOptions) {
        findHooks(extendsOptions, hooks);
      }
    }
  }
  return hooks;
}
function initHook(mpOptions, hook, excludes) {
  if (excludes.indexOf(hook) === -1 && !hasOwn$2(mpOptions, hook)) {
    mpOptions[hook] = function(args) {
      return this.$vm && this.$vm.$callHook(hook, args);
    };
  }
}
const EXCLUDE_HOOKS = [ON_READY];
function initHooks(mpOptions, hooks, excludes = EXCLUDE_HOOKS) {
  hooks.forEach((hook) => initHook(mpOptions, hook, excludes));
}
function initUnknownHooks(mpOptions, vueOptions, excludes = EXCLUDE_HOOKS) {
  findHooks(vueOptions).forEach((hook) => initHook(mpOptions, hook, excludes));
}
function initRuntimeHooks(mpOptions, runtimeHooks) {
  if (!runtimeHooks) {
    return;
  }
  const hooks = Object.keys(MINI_PROGRAM_PAGE_RUNTIME_HOOKS);
  hooks.forEach((hook) => {
    if (runtimeHooks & MINI_PROGRAM_PAGE_RUNTIME_HOOKS[hook]) {
      initHook(mpOptions, hook, []);
    }
  });
}
const findMixinRuntimeHooks = /* @__PURE__ */ once(() => {
  const runtimeHooks = [];
  const app = isFunction$1(getApp) && getApp({ allowDefault: true });
  if (app && app.$vm && app.$vm.$) {
    const mixins = app.$vm.$.appContext.mixins;
    if (isArray$1(mixins)) {
      const hooks = Object.keys(MINI_PROGRAM_PAGE_RUNTIME_HOOKS);
      mixins.forEach((mixin) => {
        hooks.forEach((hook) => {
          if (hasOwn$2(mixin, hook) && !runtimeHooks.includes(hook)) {
            runtimeHooks.push(hook);
          }
        });
      });
    }
  }
  return runtimeHooks;
});
function initMixinRuntimeHooks(mpOptions) {
  initHooks(mpOptions, findMixinRuntimeHooks());
}
const HOOKS = [
  ON_SHOW,
  ON_HIDE,
  ON_ERROR,
  ON_THEME_CHANGE,
  ON_PAGE_NOT_FOUND,
  ON_UNHANDLE_REJECTION
];
function parseApp(instance, parseAppOptions) {
  const internalInstance = instance.$;
  const appOptions = {
    globalData: instance.$options && instance.$options.globalData || {},
    $vm: instance,
    onLaunch(options) {
      this.$vm = instance;
      const ctx = internalInstance.ctx;
      if (this.$vm && ctx.$scope) {
        return;
      }
      initBaseInstance(internalInstance, {
        mpType: "app",
        mpInstance: this,
        slots: []
      });
      ctx.globalData = this.globalData;
      instance.$callHook(ON_LAUNCH, options);
    }
  };
  initLocale(instance);
  const vueOptions = instance.$.type;
  initHooks(appOptions, HOOKS);
  initUnknownHooks(appOptions, vueOptions);
  {
    const methods = vueOptions.methods;
    methods && extend(appOptions, methods);
  }
  if (parseAppOptions) {
    parseAppOptions.parse(appOptions);
  }
  return appOptions;
}
function initCreateApp(parseAppOptions) {
  return function createApp2(vm) {
    return App(parseApp(vm, parseAppOptions));
  };
}
function initCreateSubpackageApp(parseAppOptions) {
  return function createApp2(vm) {
    const appOptions = parseApp(vm, parseAppOptions);
    const app = isFunction$1(getApp) && getApp({
      allowDefault: true
    });
    if (!app)
      return;
    vm.$.ctx.$scope = app;
    const globalData = app.globalData;
    if (globalData) {
      Object.keys(appOptions.globalData).forEach((name) => {
        if (!hasOwn$2(globalData, name)) {
          globalData[name] = appOptions.globalData[name];
        }
      });
    }
    Object.keys(appOptions).forEach((name) => {
      if (!hasOwn$2(app, name)) {
        app[name] = appOptions[name];
      }
    });
    initAppLifecycle(appOptions, vm);
  };
}
function initAppLifecycle(appOptions, vm) {
  if (isFunction$1(appOptions.onLaunch)) {
    const args = wx.getLaunchOptionsSync && wx.getLaunchOptionsSync();
    appOptions.onLaunch(args);
  }
  if (isFunction$1(appOptions.onShow) && wx.onAppShow) {
    wx.onAppShow((args) => {
      vm.$callHook("onShow", args);
    });
  }
  if (isFunction$1(appOptions.onHide) && wx.onAppHide) {
    wx.onAppHide((args) => {
      vm.$callHook("onHide", args);
    });
  }
}
function initLocale(appVm) {
  const locale = ref(normalizeLocale(wx.getSystemInfoSync().language) || LOCALE_EN);
  Object.defineProperty(appVm, "$locale", {
    get() {
      return locale.value;
    },
    set(v) {
      locale.value = v;
    }
  });
}
function initVueIds(vueIds, mpInstance) {
  if (!vueIds) {
    return;
  }
  const ids = vueIds.split(",");
  const len = ids.length;
  if (len === 1) {
    mpInstance._$vueId = ids[0];
  } else if (len === 2) {
    mpInstance._$vueId = ids[0];
    mpInstance._$vuePid = ids[1];
  }
}
const EXTRAS = ["externalClasses"];
function initExtraOptions(miniProgramComponentOptions, vueOptions) {
  EXTRAS.forEach((name) => {
    if (hasOwn$2(vueOptions, name)) {
      miniProgramComponentOptions[name] = vueOptions[name];
    }
  });
}
const WORKLET_RE = /_(.*)_worklet_factory_/;
function initWorkletMethods(mpMethods, vueMethods) {
  if (vueMethods) {
    Object.keys(vueMethods).forEach((name) => {
      const matches = name.match(WORKLET_RE);
      if (matches) {
        const workletName = matches[1];
        mpMethods[name] = vueMethods[name];
        mpMethods[workletName] = vueMethods[workletName];
      }
    });
  }
}
function initWxsCallMethods(methods, wxsCallMethods) {
  if (!isArray$1(wxsCallMethods)) {
    return;
  }
  wxsCallMethods.forEach((callMethod) => {
    methods[callMethod] = function(args) {
      return this.$vm[callMethod](args);
    };
  });
}
function selectAllComponents(mpInstance, selector, $refs) {
  const components = mpInstance.selectAllComponents(selector);
  components.forEach((component) => {
    const ref2 = component.properties.uR;
    $refs[ref2] = component.$vm || component;
  });
}
function initRefs(instance, mpInstance) {
  Object.defineProperty(instance, "refs", {
    get() {
      const $refs = {};
      selectAllComponents(mpInstance, ".r", $refs);
      const forComponents = mpInstance.selectAllComponents(".r-i-f");
      forComponents.forEach((component) => {
        const ref2 = component.properties.uR;
        if (!ref2) {
          return;
        }
        if (!$refs[ref2]) {
          $refs[ref2] = [];
        }
        $refs[ref2].push(component.$vm || component);
      });
      return $refs;
    }
  });
}
function findVmByVueId(instance, vuePid) {
  const $children = instance.$children;
  for (let i = $children.length - 1; i >= 0; i--) {
    const childVm = $children[i];
    if (childVm.$scope._$vueId === vuePid) {
      return childVm;
    }
  }
  let parentVm;
  for (let i = $children.length - 1; i >= 0; i--) {
    parentVm = findVmByVueId($children[i], vuePid);
    if (parentVm) {
      return parentVm;
    }
  }
}
const builtInProps = [
  // 百度小程序,快手小程序自定义组件不支持绑定动态事件，动态dataset，故通过props传递事件信息
  // event-opts
  "eO",
  // 组件 ref
  "uR",
  // 组件 ref-in-for
  "uRIF",
  // 组件 id
  "uI",
  // 组件类型 m: 小程序组件
  "uT",
  // 组件 props
  "uP",
  // 小程序不能直接定义 $slots 的 props，所以通过 vueSlots 转换到 $slots
  "uS"
];
function initDefaultProps(options, isBehavior = false) {
  const properties = {};
  if (!isBehavior) {
    builtInProps.forEach((name) => {
      properties[name] = {
        type: null,
        value: ""
      };
    });
    properties.uS = {
      type: null,
      value: [],
      observer: function(newVal) {
        const $slots = /* @__PURE__ */ Object.create(null);
        newVal && newVal.forEach((slotName) => {
          $slots[slotName] = true;
        });
        this.setData({
          $slots
        });
      }
    };
  }
  if (options.behaviors) {
    if (options.behaviors.includes("wx://form-field")) {
      properties.name = {
        type: null,
        value: ""
      };
      properties.value = {
        type: null,
        value: ""
      };
    }
  }
  return properties;
}
function initVirtualHostProps(options) {
  const properties = {};
  {
    if (options && options.virtualHost) {
      properties.virtualHostStyle = {
        type: null,
        value: ""
      };
      properties.virtualHostClass = {
        type: null,
        value: ""
      };
    }
  }
  return properties;
}
function initProps(mpComponentOptions) {
  if (!mpComponentOptions.properties) {
    mpComponentOptions.properties = {};
  }
  extend(mpComponentOptions.properties, initDefaultProps(mpComponentOptions), initVirtualHostProps(mpComponentOptions.options));
}
const PROP_TYPES = [String, Number, Boolean, Object, Array, null];
function parsePropType(type, defaultValue) {
  if (isArray$1(type) && type.length === 1) {
    return type[0];
  }
  return type;
}
function normalizePropType(type, defaultValue) {
  const res = parsePropType(type);
  return PROP_TYPES.indexOf(res) !== -1 ? res : null;
}
function initPageProps({ properties }, rawProps) {
  if (isArray$1(rawProps)) {
    rawProps.forEach((key) => {
      properties[key] = {
        type: String,
        value: ""
      };
    });
  } else if (isPlainObject$2(rawProps)) {
    Object.keys(rawProps).forEach((key) => {
      const opts = rawProps[key];
      if (isPlainObject$2(opts)) {
        let value = opts.default;
        if (isFunction$1(value)) {
          value = value();
        }
        const type = opts.type;
        opts.type = normalizePropType(type);
        properties[key] = {
          type: opts.type,
          value
        };
      } else {
        properties[key] = {
          type: normalizePropType(opts)
        };
      }
    });
  }
}
function findPropsData(properties, isPage2) {
  return (isPage2 ? findPagePropsData(properties) : findComponentPropsData(properties.uP)) || {};
}
function findPagePropsData(properties) {
  const propsData = {};
  if (isPlainObject$2(properties)) {
    Object.keys(properties).forEach((name) => {
      if (builtInProps.indexOf(name) === -1) {
        propsData[name] = properties[name];
      }
    });
  }
  return propsData;
}
function initFormField(vm) {
  const vueOptions = vm.$options;
  if (isArray$1(vueOptions.behaviors) && vueOptions.behaviors.includes("uni://form-field")) {
    vm.$watch("modelValue", () => {
      vm.$scope && vm.$scope.setData({
        name: vm.name,
        value: vm.modelValue
      });
    }, {
      immediate: true
    });
  }
}
function initData(_) {
  return {};
}
function initPropsObserver(componentOptions) {
  const observe = function observe2() {
    const up = this.properties.uP;
    if (!up) {
      return;
    }
    if (this.$vm) {
      updateComponentProps(up, this.$vm.$);
    } else if (this.properties.uT === "m") {
      updateMiniProgramComponentProperties(up, this);
    }
  };
  {
    if (!componentOptions.observers) {
      componentOptions.observers = {};
    }
    componentOptions.observers.uP = observe;
  }
}
function updateMiniProgramComponentProperties(up, mpInstance) {
  const prevProps = mpInstance.properties;
  const nextProps = findComponentPropsData(up) || {};
  if (hasPropsChanged(prevProps, nextProps, false)) {
    mpInstance.setData(nextProps);
  }
}
function updateComponentProps(up, instance) {
  const prevProps = toRaw(instance.props);
  const nextProps = findComponentPropsData(up) || {};
  if (hasPropsChanged(prevProps, nextProps)) {
    updateProps(instance, nextProps, prevProps, false);
    if (hasQueueJob(instance.update)) {
      invalidateJob(instance.update);
    }
    {
      instance.update();
    }
  }
}
function hasPropsChanged(prevProps, nextProps, checkLen = true) {
  const nextKeys = Object.keys(nextProps);
  if (checkLen && nextKeys.length !== Object.keys(prevProps).length) {
    return true;
  }
  for (let i = 0; i < nextKeys.length; i++) {
    const key = nextKeys[i];
    if (nextProps[key] !== prevProps[key]) {
      return true;
    }
  }
  return false;
}
function initBehaviors(vueOptions) {
  const vueBehaviors = vueOptions.behaviors;
  let vueProps = vueOptions.props;
  if (!vueProps) {
    vueOptions.props = vueProps = [];
  }
  const behaviors = [];
  if (isArray$1(vueBehaviors)) {
    vueBehaviors.forEach((behavior) => {
      behaviors.push(behavior.replace("uni://", "wx://"));
      if (behavior === "uni://form-field") {
        if (isArray$1(vueProps)) {
          vueProps.push("name");
          vueProps.push("modelValue");
        } else {
          vueProps.name = {
            type: String,
            default: ""
          };
          vueProps.modelValue = {
            type: [String, Number, Boolean, Array, Object, Date],
            default: ""
          };
        }
      }
    });
  }
  return behaviors;
}
function applyOptions(componentOptions, vueOptions) {
  componentOptions.data = initData();
  componentOptions.behaviors = initBehaviors(vueOptions);
}
function parseComponent(vueOptions, { parse: parse2, mocks: mocks2, isPage: isPage2, initRelation: initRelation2, handleLink: handleLink2, initLifetimes: initLifetimes2 }) {
  vueOptions = vueOptions.default || vueOptions;
  const options = {
    multipleSlots: true,
    // styleIsolation: 'apply-shared',
    addGlobalClass: true,
    pureDataPattern: /^uP$/
  };
  if (isArray$1(vueOptions.mixins)) {
    vueOptions.mixins.forEach((item) => {
      if (isObject$2(item.options)) {
        extend(options, item.options);
      }
    });
  }
  if (vueOptions.options) {
    extend(options, vueOptions.options);
  }
  const mpComponentOptions = {
    options,
    lifetimes: initLifetimes2({ mocks: mocks2, isPage: isPage2, initRelation: initRelation2, vueOptions }),
    pageLifetimes: {
      show() {
        this.$vm && this.$vm.$callHook("onPageShow");
      },
      hide() {
        this.$vm && this.$vm.$callHook("onPageHide");
      },
      resize(size2) {
        this.$vm && this.$vm.$callHook("onPageResize", size2);
      }
    },
    methods: {
      __l: handleLink2
    }
  };
  {
    applyOptions(mpComponentOptions, vueOptions);
  }
  initProps(mpComponentOptions);
  initPropsObserver(mpComponentOptions);
  initExtraOptions(mpComponentOptions, vueOptions);
  initWxsCallMethods(mpComponentOptions.methods, vueOptions.wxsCallMethods);
  {
    initWorkletMethods(mpComponentOptions.methods, vueOptions.methods);
  }
  if (parse2) {
    parse2(mpComponentOptions, { handleLink: handleLink2 });
  }
  return mpComponentOptions;
}
function initCreateComponent(parseOptions2) {
  return function createComponent2(vueComponentOptions) {
    return Component(parseComponent(vueComponentOptions, parseOptions2));
  };
}
let $createComponentFn;
let $destroyComponentFn;
function getAppVm() {
  return getApp().$vm;
}
function $createComponent(initialVNode, options) {
  if (!$createComponentFn) {
    $createComponentFn = getAppVm().$createComponent;
  }
  const proxy = $createComponentFn(initialVNode, options);
  return getExposeProxy(proxy.$) || proxy;
}
function $destroyComponent(instance) {
  if (!$destroyComponentFn) {
    $destroyComponentFn = getAppVm().$destroyComponent;
  }
  return $destroyComponentFn(instance);
}
function parsePage(vueOptions, parseOptions2) {
  const { parse: parse2, mocks: mocks2, isPage: isPage2, initRelation: initRelation2, handleLink: handleLink2, initLifetimes: initLifetimes2 } = parseOptions2;
  const miniProgramPageOptions = parseComponent(vueOptions, {
    mocks: mocks2,
    isPage: isPage2,
    initRelation: initRelation2,
    handleLink: handleLink2,
    initLifetimes: initLifetimes2
  });
  initPageProps(miniProgramPageOptions, (vueOptions.default || vueOptions).props);
  const methods = miniProgramPageOptions.methods;
  methods.onLoad = function(query) {
    this.options = query;
    this.$page = {
      fullPath: addLeadingSlash(this.route + stringifyQuery(query))
    };
    return this.$vm && this.$vm.$callHook(ON_LOAD, query);
  };
  initHooks(methods, PAGE_INIT_HOOKS);
  {
    initUnknownHooks(methods, vueOptions);
  }
  initRuntimeHooks(methods, vueOptions.__runtimeHooks);
  initMixinRuntimeHooks(methods);
  parse2 && parse2(miniProgramPageOptions, { handleLink: handleLink2 });
  return miniProgramPageOptions;
}
function initCreatePage(parseOptions2) {
  return function createPage2(vuePageOptions) {
    return Component(parsePage(vuePageOptions, parseOptions2));
  };
}
function initCreatePluginApp(parseAppOptions) {
  return function createApp2(vm) {
    initAppLifecycle(parseApp(vm, parseAppOptions), vm);
  };
}
const MPPage = Page;
const MPComponent = Component;
function initTriggerEvent(mpInstance) {
  const oldTriggerEvent = mpInstance.triggerEvent;
  const newTriggerEvent = function(event, ...args) {
    return oldTriggerEvent.apply(mpInstance, [customizeEvent(event), ...args]);
  };
  try {
    mpInstance.triggerEvent = newTriggerEvent;
  } catch (error) {
    mpInstance._triggerEvent = newTriggerEvent;
  }
}
function initMiniProgramHook(name, options, isComponent) {
  const oldHook = options[name];
  if (!oldHook) {
    options[name] = function() {
      initTriggerEvent(this);
    };
  } else {
    options[name] = function(...args) {
      initTriggerEvent(this);
      return oldHook.apply(this, args);
    };
  }
}
Page = function(options) {
  initMiniProgramHook(ON_LOAD, options);
  return MPPage(options);
};
Component = function(options) {
  initMiniProgramHook("created", options);
  const isVueComponent = options.properties && options.properties.uP;
  if (!isVueComponent) {
    initProps(options);
    initPropsObserver(options);
  }
  return MPComponent(options);
};
function initLifetimes({ mocks: mocks2, isPage: isPage2, initRelation: initRelation2, vueOptions }) {
  return {
    attached() {
      let properties = this.properties;
      initVueIds(properties.uI, this);
      const relationOptions = {
        vuePid: this._$vuePid
      };
      initRelation2(this, relationOptions);
      const mpInstance = this;
      const isMiniProgramPage = isPage2(mpInstance);
      let propsData = properties;
      this.$vm = $createComponent({
        type: vueOptions,
        props: findPropsData(propsData, isMiniProgramPage)
      }, {
        mpType: isMiniProgramPage ? "page" : "component",
        mpInstance,
        slots: properties.uS || {},
        parentComponent: relationOptions.parent && relationOptions.parent.$,
        onBeforeSetup(instance, options) {
          initRefs(instance, mpInstance);
          initMocks(instance, mpInstance, mocks2);
          initComponentInstance(instance, options);
        }
      });
      if (!isMiniProgramPage) {
        initFormField(this.$vm);
      }
    },
    ready() {
      if (this.$vm) {
        {
          this.$vm.$callHook("mounted");
          this.$vm.$callHook(ON_READY);
        }
      }
    },
    detached() {
      if (this.$vm) {
        pruneComponentPropsCache(this.$vm.$.uid);
        $destroyComponent(this.$vm);
      }
    }
  };
}
const mocks = ["__route__", "__wxExparserNodeId__", "__wxWebviewId__"];
function isPage(mpInstance) {
  return !!mpInstance.route;
}
function initRelation(mpInstance, detail) {
  mpInstance.triggerEvent("__l", detail);
}
function handleLink(event) {
  const detail = event.detail || event.value;
  const vuePid = detail.vuePid;
  let parentVm;
  if (vuePid) {
    parentVm = findVmByVueId(this.$vm, vuePid);
  }
  if (!parentVm) {
    parentVm = this.$vm;
  }
  detail.parent = parentVm;
}
var parseOptions = /* @__PURE__ */ Object.freeze({
  __proto__: null,
  handleLink,
  initLifetimes,
  initRelation,
  isPage,
  mocks
});
const createApp = initCreateApp();
const createPage = initCreatePage(parseOptions);
const createComponent = initCreateComponent(parseOptions);
const createPluginApp = initCreatePluginApp();
const createSubpackageApp = initCreateSubpackageApp();
{
  wx.createApp = global.createApp = createApp;
  wx.createPage = createPage;
  wx.createComponent = createComponent;
  wx.createPluginApp = global.createPluginApp = createPluginApp;
  wx.createSubpackageApp = global.createSubpackageApp = createSubpackageApp;
}
var isVue2 = false;
function set(target, key, val) {
  if (Array.isArray(target)) {
    target.length = Math.max(target.length, key);
    target.splice(key, 1, val);
    return val;
  }
  target[key] = val;
  return val;
}
function del(target, key) {
  if (Array.isArray(target)) {
    target.splice(key, 1);
    return;
  }
  delete target[key];
}
/*!
  * pinia v2.0.33
  * (c) 2023 Eduardo San Martin Morote
  * @license MIT
  */
let activePinia;
const setActivePinia = (pinia) => activePinia = pinia;
const getActivePinia = () => getCurrentInstance() && inject(piniaSymbol) || activePinia;
const piniaSymbol = Symbol("pinia");
function isPlainObject$1(o2) {
  return o2 && typeof o2 === "object" && Object.prototype.toString.call(o2) === "[object Object]" && typeof o2.toJSON !== "function";
}
var MutationType;
(function(MutationType2) {
  MutationType2["direct"] = "direct";
  MutationType2["patchObject"] = "patch object";
  MutationType2["patchFunction"] = "patch function";
})(MutationType || (MutationType = {}));
const IS_CLIENT = typeof window !== "undefined";
const USE_DEVTOOLS = IS_CLIENT;
const componentStateTypes = [];
const getStoreType = (id) => "🍍 " + id;
function registerPiniaDevtools(app, pinia) {
}
function addStoreToDevtools(app, store) {
  if (!componentStateTypes.includes(getStoreType(store.$id))) {
    componentStateTypes.push(getStoreType(store.$id));
  }
}
function patchActionForGrouping(store, actionNames) {
  const actions = actionNames.reduce((storeActions, actionName) => {
    storeActions[actionName] = toRaw(store)[actionName];
    return storeActions;
  }, {});
  for (const actionName in actions) {
    store[actionName] = function() {
      const trackedStore = new Proxy(store, {
        get(...args) {
          return Reflect.get(...args);
        },
        set(...args) {
          return Reflect.set(...args);
        }
      });
      return actions[actionName].apply(trackedStore, arguments);
    };
  }
}
function devtoolsPlugin({ app, store, options }) {
  if (store.$id.startsWith("__hot:")) {
    return;
  }
  if (options.state) {
    store._isOptionsAPI = true;
  }
  if (typeof options.state === "function") {
    patchActionForGrouping(
      // @ts-expect-error: can cast the store...
      store,
      Object.keys(options.actions)
    );
    const originalHotUpdate = store._hotUpdate;
    toRaw(store)._hotUpdate = function(newStore) {
      originalHotUpdate.apply(this, arguments);
      patchActionForGrouping(store, Object.keys(newStore._hmrPayload.actions));
    };
  }
  addStoreToDevtools(
    app,
    // FIXME: is there a way to allow the assignment from Store<Id, S, G, A> to StoreGeneric?
    store
  );
}
function createPinia() {
  const scope = effectScope(true);
  const state = scope.run(() => ref({}));
  let _p = [];
  let toBeInstalled = [];
  const pinia = markRaw({
    install(app) {
      setActivePinia(pinia);
      {
        pinia._a = app;
        app.provide(piniaSymbol, pinia);
        app.config.globalProperties.$pinia = pinia;
        toBeInstalled.forEach((plugin2) => _p.push(plugin2));
        toBeInstalled = [];
      }
    },
    use(plugin2) {
      if (!this._a && !isVue2) {
        toBeInstalled.push(plugin2);
      } else {
        _p.push(plugin2);
      }
      return this;
    },
    _p,
    // it's actually undefined here
    // @ts-expect-error
    _a: null,
    _e: scope,
    _s: /* @__PURE__ */ new Map(),
    state
  });
  if (USE_DEVTOOLS && typeof Proxy !== "undefined") {
    pinia.use(devtoolsPlugin);
  }
  return pinia;
}
const isUseStore = (fn) => {
  return typeof fn === "function" && typeof fn.$id === "string";
};
function patchObject(newState, oldState) {
  for (const key in oldState) {
    const subPatch = oldState[key];
    if (!(key in newState)) {
      continue;
    }
    const targetValue = newState[key];
    if (isPlainObject$1(targetValue) && isPlainObject$1(subPatch) && !isRef(subPatch) && !isReactive(subPatch)) {
      newState[key] = patchObject(targetValue, subPatch);
    } else {
      {
        newState[key] = subPatch;
      }
    }
  }
  return newState;
}
function acceptHMRUpdate(initialUseStore, hot) {
  return (newModule) => {
    const pinia = hot.data.pinia || initialUseStore._pinia;
    if (!pinia) {
      return;
    }
    hot.data.pinia = pinia;
    for (const exportName in newModule) {
      const useStore = newModule[exportName];
      if (isUseStore(useStore) && pinia._s.has(useStore.$id)) {
        const id = useStore.$id;
        if (id !== initialUseStore.$id) {
          console.warn(`The id of the store changed from "${initialUseStore.$id}" to "${id}". Reloading.`);
          return hot.invalidate();
        }
        const existingStore = pinia._s.get(id);
        if (!existingStore) {
          console.log(`[Pinia]: skipping hmr because store doesn't exist yet`);
          return;
        }
        useStore(pinia, existingStore);
      }
    }
  };
}
const noop = () => {
};
function addSubscription(subscriptions, callback, detached, onCleanup = noop) {
  subscriptions.push(callback);
  const removeSubscription = () => {
    const idx = subscriptions.indexOf(callback);
    if (idx > -1) {
      subscriptions.splice(idx, 1);
      onCleanup();
    }
  };
  if (!detached && getCurrentScope()) {
    onScopeDispose(removeSubscription);
  }
  return removeSubscription;
}
function triggerSubscriptions(subscriptions, ...args) {
  subscriptions.slice().forEach((callback) => {
    callback(...args);
  });
}
function mergeReactiveObjects(target, patchToApply) {
  if (target instanceof Map && patchToApply instanceof Map) {
    patchToApply.forEach((value, key) => target.set(key, value));
  }
  if (target instanceof Set && patchToApply instanceof Set) {
    patchToApply.forEach(target.add, target);
  }
  for (const key in patchToApply) {
    if (!patchToApply.hasOwnProperty(key))
      continue;
    const subPatch = patchToApply[key];
    const targetValue = target[key];
    if (isPlainObject$1(targetValue) && isPlainObject$1(subPatch) && target.hasOwnProperty(key) && !isRef(subPatch) && !isReactive(subPatch)) {
      target[key] = mergeReactiveObjects(targetValue, subPatch);
    } else {
      target[key] = subPatch;
    }
  }
  return target;
}
const skipHydrateSymbol = Symbol("pinia:skipHydration");
function skipHydrate(obj) {
  return Object.defineProperty(obj, skipHydrateSymbol, {});
}
function shouldHydrate(obj) {
  return !isPlainObject$1(obj) || !obj.hasOwnProperty(skipHydrateSymbol);
}
const { assign: assign$2 } = Object;
function isComputed(o2) {
  return !!(isRef(o2) && o2.effect);
}
function createOptionsStore(id, options, pinia, hot) {
  const { state, actions, getters } = options;
  const initialState = pinia.state.value[id];
  let store;
  function setup() {
    if (!initialState && !hot) {
      {
        pinia.state.value[id] = state ? state() : {};
      }
    }
    const localState = hot ? (
      // use ref() to unwrap refs inside state TODO: check if this is still necessary
      toRefs(ref(state ? state() : {}).value)
    ) : toRefs(pinia.state.value[id]);
    return assign$2(localState, actions, Object.keys(getters || {}).reduce((computedGetters, name) => {
      if (name in localState) {
        console.warn(`[🍍]: A getter cannot have the same name as another state property. Rename one of them. Found with "${name}" in store "${id}".`);
      }
      computedGetters[name] = markRaw(computed(() => {
        setActivePinia(pinia);
        const store2 = pinia._s.get(id);
        return getters[name].call(store2, store2);
      }));
      return computedGetters;
    }, {}));
  }
  store = createSetupStore(id, setup, options, pinia, hot, true);
  return store;
}
function createSetupStore($id, setup, options = {}, pinia, hot, isOptionsStore) {
  let scope;
  const optionsForPlugin = assign$2({ actions: {} }, options);
  if (!pinia._e.active) {
    throw new Error("Pinia destroyed");
  }
  const $subscribeOptions = {
    deep: true
    // flush: 'post',
  };
  {
    $subscribeOptions.onTrigger = (event) => {
      if (isListening) {
        debuggerEvents = event;
      } else if (isListening == false && !store._hotUpdating) {
        if (Array.isArray(debuggerEvents)) {
          debuggerEvents.push(event);
        } else {
          console.error("🍍 debuggerEvents should be an array. This is most likely an internal Pinia bug.");
        }
      }
    };
  }
  let isListening;
  let isSyncListening;
  let subscriptions = markRaw([]);
  let actionSubscriptions = markRaw([]);
  let debuggerEvents;
  const initialState = pinia.state.value[$id];
  if (!isOptionsStore && !initialState && !hot) {
    {
      pinia.state.value[$id] = {};
    }
  }
  const hotState = ref({});
  let activeListener;
  function $patch(partialStateOrMutator) {
    let subscriptionMutation;
    isListening = isSyncListening = false;
    {
      debuggerEvents = [];
    }
    if (typeof partialStateOrMutator === "function") {
      partialStateOrMutator(pinia.state.value[$id]);
      subscriptionMutation = {
        type: MutationType.patchFunction,
        storeId: $id,
        events: debuggerEvents
      };
    } else {
      mergeReactiveObjects(pinia.state.value[$id], partialStateOrMutator);
      subscriptionMutation = {
        type: MutationType.patchObject,
        payload: partialStateOrMutator,
        storeId: $id,
        events: debuggerEvents
      };
    }
    const myListenerId = activeListener = Symbol();
    nextTick$1().then(() => {
      if (activeListener === myListenerId) {
        isListening = true;
      }
    });
    isSyncListening = true;
    triggerSubscriptions(subscriptions, subscriptionMutation, pinia.state.value[$id]);
  }
  const $reset = isOptionsStore ? function $reset2() {
    const { state } = options;
    const newState = state ? state() : {};
    this.$patch(($state) => {
      assign$2($state, newState);
    });
  } : (
    /* istanbul ignore next */
    () => {
      throw new Error(`🍍: Store "${$id}" is built using the setup syntax and does not implement $reset().`);
    }
  );
  function $dispose() {
    scope.stop();
    subscriptions = [];
    actionSubscriptions = [];
    pinia._s.delete($id);
  }
  function wrapAction(name, action) {
    return function() {
      setActivePinia(pinia);
      const args = Array.from(arguments);
      const afterCallbackList = [];
      const onErrorCallbackList = [];
      function after(callback) {
        afterCallbackList.push(callback);
      }
      function onError(callback) {
        onErrorCallbackList.push(callback);
      }
      triggerSubscriptions(actionSubscriptions, {
        args,
        name,
        store,
        after,
        onError
      });
      let ret;
      try {
        ret = action.apply(this && this.$id === $id ? this : store, args);
      } catch (error) {
        triggerSubscriptions(onErrorCallbackList, error);
        throw error;
      }
      if (ret instanceof Promise) {
        return ret.then((value) => {
          triggerSubscriptions(afterCallbackList, value);
          return value;
        }).catch((error) => {
          triggerSubscriptions(onErrorCallbackList, error);
          return Promise.reject(error);
        });
      }
      triggerSubscriptions(afterCallbackList, ret);
      return ret;
    };
  }
  const _hmrPayload = /* @__PURE__ */ markRaw({
    actions: {},
    getters: {},
    state: [],
    hotState
  });
  const partialStore = {
    _p: pinia,
    // _s: scope,
    $id,
    $onAction: addSubscription.bind(null, actionSubscriptions),
    $patch,
    $reset,
    $subscribe(callback, options2 = {}) {
      const removeSubscription = addSubscription(subscriptions, callback, options2.detached, () => stopWatcher());
      const stopWatcher = scope.run(() => watch(() => pinia.state.value[$id], (state) => {
        if (options2.flush === "sync" ? isSyncListening : isListening) {
          callback({
            storeId: $id,
            type: MutationType.direct,
            events: debuggerEvents
          }, state);
        }
      }, assign$2({}, $subscribeOptions, options2)));
      return removeSubscription;
    },
    $dispose
  };
  const store = reactive(
    assign$2(
      {
        _hmrPayload,
        _customProperties: markRaw(/* @__PURE__ */ new Set())
        // devtools custom properties
      },
      partialStore
      // must be added later
      // setupStore
    )
  );
  pinia._s.set($id, store);
  const setupStore = pinia._e.run(() => {
    scope = effectScope();
    return scope.run(() => setup());
  });
  for (const key in setupStore) {
    const prop = setupStore[key];
    if (isRef(prop) && !isComputed(prop) || isReactive(prop)) {
      if (hot) {
        set(hotState.value, key, toRef(setupStore, key));
      } else if (!isOptionsStore) {
        if (initialState && shouldHydrate(prop)) {
          if (isRef(prop)) {
            prop.value = initialState[key];
          } else {
            mergeReactiveObjects(prop, initialState[key]);
          }
        }
        {
          pinia.state.value[$id][key] = prop;
        }
      }
      {
        _hmrPayload.state.push(key);
      }
    } else if (typeof prop === "function") {
      const actionValue = hot ? prop : wrapAction(key, prop);
      {
        setupStore[key] = actionValue;
      }
      {
        _hmrPayload.actions[key] = prop;
      }
      optionsForPlugin.actions[key] = prop;
    } else {
      if (isComputed(prop)) {
        _hmrPayload.getters[key] = isOptionsStore ? (
          // @ts-expect-error
          options.getters[key]
        ) : prop;
        if (IS_CLIENT) {
          const getters = setupStore._getters || // @ts-expect-error: same
          (setupStore._getters = markRaw([]));
          getters.push(key);
        }
      }
    }
  }
  {
    assign$2(store, setupStore);
    assign$2(toRaw(store), setupStore);
  }
  Object.defineProperty(store, "$state", {
    get: () => hot ? hotState.value : pinia.state.value[$id],
    set: (state) => {
      if (hot) {
        throw new Error("cannot set hotState");
      }
      $patch(($state) => {
        assign$2($state, state);
      });
    }
  });
  {
    store._hotUpdate = markRaw((newStore) => {
      store._hotUpdating = true;
      newStore._hmrPayload.state.forEach((stateKey) => {
        if (stateKey in store.$state) {
          const newStateTarget = newStore.$state[stateKey];
          const oldStateSource = store.$state[stateKey];
          if (typeof newStateTarget === "object" && isPlainObject$1(newStateTarget) && isPlainObject$1(oldStateSource)) {
            patchObject(newStateTarget, oldStateSource);
          } else {
            newStore.$state[stateKey] = oldStateSource;
          }
        }
        set(store, stateKey, toRef(newStore.$state, stateKey));
      });
      Object.keys(store.$state).forEach((stateKey) => {
        if (!(stateKey in newStore.$state)) {
          del(store, stateKey);
        }
      });
      isListening = false;
      isSyncListening = false;
      pinia.state.value[$id] = toRef(newStore._hmrPayload, "hotState");
      isSyncListening = true;
      nextTick$1().then(() => {
        isListening = true;
      });
      for (const actionName in newStore._hmrPayload.actions) {
        const action = newStore[actionName];
        set(store, actionName, wrapAction(actionName, action));
      }
      for (const getterName in newStore._hmrPayload.getters) {
        const getter = newStore._hmrPayload.getters[getterName];
        const getterValue = isOptionsStore ? (
          // special handling of options api
          computed(() => {
            setActivePinia(pinia);
            return getter.call(store, store);
          })
        ) : getter;
        set(store, getterName, getterValue);
      }
      Object.keys(store._hmrPayload.getters).forEach((key) => {
        if (!(key in newStore._hmrPayload.getters)) {
          del(store, key);
        }
      });
      Object.keys(store._hmrPayload.actions).forEach((key) => {
        if (!(key in newStore._hmrPayload.actions)) {
          del(store, key);
        }
      });
      store._hmrPayload = newStore._hmrPayload;
      store._getters = newStore._getters;
      store._hotUpdating = false;
    });
  }
  if (USE_DEVTOOLS) {
    const nonEnumerable = {
      writable: true,
      configurable: true,
      // avoid warning on devtools trying to display this property
      enumerable: false
    };
    ["_p", "_hmrPayload", "_getters", "_customProperties"].forEach((p2) => {
      Object.defineProperty(store, p2, assign$2({ value: store[p2] }, nonEnumerable));
    });
  }
  pinia._p.forEach((extender) => {
    if (USE_DEVTOOLS) {
      const extensions = scope.run(() => extender({
        store,
        app: pinia._a,
        pinia,
        options: optionsForPlugin
      }));
      Object.keys(extensions || {}).forEach((key) => store._customProperties.add(key));
      assign$2(store, extensions);
    } else {
      assign$2(store, scope.run(() => extender({
        store,
        app: pinia._a,
        pinia,
        options: optionsForPlugin
      })));
    }
  });
  if (store.$state && typeof store.$state === "object" && typeof store.$state.constructor === "function" && !store.$state.constructor.toString().includes("[native code]")) {
    console.warn(`[🍍]: The "state" must be a plain object. It cannot be
	state: () => new MyClass()
Found in store "${store.$id}".`);
  }
  if (initialState && isOptionsStore && options.hydrate) {
    options.hydrate(store.$state, initialState);
  }
  isListening = true;
  isSyncListening = true;
  return store;
}
function defineStore(idOrOptions, setup, setupOptions) {
  let id;
  let options;
  const isSetupStore = typeof setup === "function";
  if (typeof idOrOptions === "string") {
    id = idOrOptions;
    options = isSetupStore ? setupOptions : setup;
  } else {
    options = idOrOptions;
    id = idOrOptions.id;
  }
  function useStore(pinia, hot) {
    const currentInstance2 = getCurrentInstance();
    pinia = // in test mode, ignore the argument provided as we can always retrieve a
    // pinia instance with getActivePinia()
    pinia || currentInstance2 && inject(piniaSymbol, null);
    if (pinia)
      setActivePinia(pinia);
    if (!activePinia) {
      throw new Error(`[🍍]: getActivePinia was called with no active Pinia. Did you forget to install pinia?
	const pinia = createPinia()
	app.use(pinia)
This will fail in production.`);
    }
    pinia = activePinia;
    if (!pinia._s.has(id)) {
      if (isSetupStore) {
        createSetupStore(id, setup, options, pinia);
      } else {
        createOptionsStore(id, options, pinia);
      }
      {
        useStore._pinia = pinia;
      }
    }
    const store = pinia._s.get(id);
    if (hot) {
      const hotId = "__hot:" + id;
      const newStore = isSetupStore ? createSetupStore(hotId, setup, options, pinia, true) : createOptionsStore(hotId, assign$2({}, options), pinia, true);
      hot._hotUpdate(newStore);
      delete pinia.state.value[hotId];
      pinia._s.delete(hotId);
    }
    if (IS_CLIENT && currentInstance2 && currentInstance2.proxy && // avoid adding stores that are just built for hot module replacement
    !hot) {
      const vm = currentInstance2.proxy;
      const cache2 = "_pStores" in vm ? vm._pStores : vm._pStores = {};
      cache2[id] = store;
    }
    return store;
  }
  useStore.$id = id;
  return useStore;
}
let mapStoreSuffix = "Store";
function setMapStoreSuffix(suffix) {
  mapStoreSuffix = suffix;
}
function mapStores(...stores) {
  if (Array.isArray(stores[0])) {
    console.warn(`[🍍]: Directly pass all stores to "mapStores()" without putting them in an array:
Replace
	mapStores([useAuthStore, useCartStore])
with
	mapStores(useAuthStore, useCartStore)
This will fail in production if not fixed.`);
    stores = stores[0];
  }
  return stores.reduce((reduced, useStore) => {
    reduced[useStore.$id + mapStoreSuffix] = function() {
      return useStore(this.$pinia);
    };
    return reduced;
  }, {});
}
function mapState(useStore, keysOrMapper) {
  return Array.isArray(keysOrMapper) ? keysOrMapper.reduce((reduced, key) => {
    reduced[key] = function() {
      return useStore(this.$pinia)[key];
    };
    return reduced;
  }, {}) : Object.keys(keysOrMapper).reduce((reduced, key) => {
    reduced[key] = function() {
      const store = useStore(this.$pinia);
      const storeKey = keysOrMapper[key];
      return typeof storeKey === "function" ? storeKey.call(this, store) : store[storeKey];
    };
    return reduced;
  }, {});
}
const mapGetters = mapState;
function mapActions(useStore, keysOrMapper) {
  return Array.isArray(keysOrMapper) ? keysOrMapper.reduce((reduced, key) => {
    reduced[key] = function(...args) {
      return useStore(this.$pinia)[key](...args);
    };
    return reduced;
  }, {}) : Object.keys(keysOrMapper).reduce((reduced, key) => {
    reduced[key] = function(...args) {
      return useStore(this.$pinia)[keysOrMapper[key]](...args);
    };
    return reduced;
  }, {});
}
function mapWritableState(useStore, keysOrMapper) {
  return Array.isArray(keysOrMapper) ? keysOrMapper.reduce((reduced, key) => {
    reduced[key] = {
      get() {
        return useStore(this.$pinia)[key];
      },
      set(value) {
        return useStore(this.$pinia)[key] = value;
      }
    };
    return reduced;
  }, {}) : Object.keys(keysOrMapper).reduce((reduced, key) => {
    reduced[key] = {
      get() {
        return useStore(this.$pinia)[keysOrMapper[key]];
      },
      set(value) {
        return useStore(this.$pinia)[keysOrMapper[key]] = value;
      }
    };
    return reduced;
  }, {});
}
function storeToRefs(store) {
  {
    store = toRaw(store);
    const refs = {};
    for (const key in store) {
      const value = store[key];
      if (isRef(value) || isReactive(value)) {
        refs[key] = // ---
        toRef(store, key);
      }
    }
    return refs;
  }
}
const PiniaVuePlugin = function(_Vue) {
  _Vue.mixin({
    beforeCreate() {
      const options = this.$options;
      if (options.pinia) {
        const pinia = options.pinia;
        if (!this._provided) {
          const provideCache = {};
          Object.defineProperty(this, "_provided", {
            get: () => provideCache,
            set: (v) => Object.assign(provideCache, v)
          });
        }
        this._provided[piniaSymbol] = pinia;
        if (!this.$pinia) {
          this.$pinia = pinia;
        }
        pinia._a = this;
        if (IS_CLIENT) {
          setActivePinia(pinia);
        }
        if (USE_DEVTOOLS) {
          registerPiniaDevtools(pinia._a);
        }
      } else if (!this.$pinia && options.parent && options.parent.$pinia) {
        this.$pinia = options.parent.$pinia;
      }
    },
    destroyed() {
      delete this._pStores;
    }
  });
};
const Pinia = /* @__PURE__ */ Object.freeze(/* @__PURE__ */ Object.defineProperty({
  __proto__: null,
  get MutationType() {
    return MutationType;
  },
  PiniaVuePlugin,
  acceptHMRUpdate,
  createPinia,
  defineStore,
  getActivePinia,
  mapActions,
  mapGetters,
  mapState,
  mapStores,
  mapWritableState,
  setActivePinia,
  setMapStoreSuffix,
  skipHydrate,
  storeToRefs
}, Symbol.toStringTag, { value: "Module" }));
/*!
  * @intlify/shared v9.1.9
  * (c) 2021 kazuya kawaguchi
  * Released under the MIT License.
  */
const inBrowser = typeof window !== "undefined";
let mark;
let measure;
{
  const perf2 = inBrowser && window.performance;
  if (perf2 && perf2.mark && perf2.measure && perf2.clearMarks && perf2.clearMeasures) {
    mark = (tag) => perf2.mark(tag);
    measure = (name, startTag, endTag) => {
      perf2.measure(name, startTag, endTag);
      perf2.clearMarks(startTag);
      perf2.clearMarks(endTag);
    };
  }
}
const RE_ARGS = /\{([0-9a-zA-Z]+)\}/g;
function format(message, ...args) {
  if (args.length === 1 && isObject$1(args[0])) {
    args = args[0];
  }
  if (!args || !args.hasOwnProperty) {
    args = {};
  }
  return message.replace(RE_ARGS, (match, identifier) => {
    return args.hasOwnProperty(identifier) ? args[identifier] : "";
  });
}
const hasSymbol = typeof Symbol === "function" && typeof Symbol.toStringTag === "symbol";
const makeSymbol = (name) => hasSymbol ? Symbol(name) : name;
const generateFormatCacheKey = (locale, key, source) => friendlyJSONstringify({ l: locale, k: key, s: source });
const friendlyJSONstringify = (json) => JSON.stringify(json).replace(/\u2028/g, "\\u2028").replace(/\u2029/g, "\\u2029").replace(/\u0027/g, "\\u0027");
const isNumber = (val) => typeof val === "number" && isFinite(val);
const isDate = (val) => toTypeString(val) === "[object Date]";
const isRegExp = (val) => toTypeString(val) === "[object RegExp]";
const isEmptyObject = (val) => isPlainObject(val) && Object.keys(val).length === 0;
function warn(msg, err) {
  if (typeof console !== "undefined") {
    console.warn(`[intlify] ` + msg);
    if (err) {
      console.warn(err.stack);
    }
  }
}
const assign$1 = Object.assign;
let _globalThis;
const getGlobalThis = () => {
  return _globalThis || (_globalThis = typeof globalThis !== "undefined" ? globalThis : typeof self !== "undefined" ? self : typeof window !== "undefined" ? window : typeof global !== "undefined" ? global : {});
};
function escapeHtml(rawText) {
  return rawText.replace(/</g, "&lt;").replace(/>/g, "&gt;").replace(/"/g, "&quot;").replace(/'/g, "&apos;");
}
const hasOwnProperty$1 = Object.prototype.hasOwnProperty;
function hasOwn$1(obj, key) {
  return hasOwnProperty$1.call(obj, key);
}
const isArray = Array.isArray;
const isFunction = (val) => typeof val === "function";
const isString = (val) => typeof val === "string";
const isBoolean = (val) => typeof val === "boolean";
const isObject$1 = (val) => (
  // eslint-disable-line
  val !== null && typeof val === "object"
);
const objectToString = Object.prototype.toString;
const toTypeString = (value) => objectToString.call(value);
const isPlainObject = (val) => toTypeString(val) === "[object Object]";
const toDisplayString = (val) => {
  return val == null ? "" : isArray(val) || isPlainObject(val) && val.toString === objectToString ? JSON.stringify(val, null, 2) : String(val);
};
const RANGE = 2;
function generateCodeFrame(source, start = 0, end = source.length) {
  const lines = source.split(/\r?\n/);
  let count = 0;
  const res = [];
  for (let i = 0; i < lines.length; i++) {
    count += lines[i].length + 1;
    if (count >= start) {
      for (let j = i - RANGE; j <= i + RANGE || end > count; j++) {
        if (j < 0 || j >= lines.length)
          continue;
        const line = j + 1;
        res.push(`${line}${" ".repeat(3 - String(line).length)}|  ${lines[j]}`);
        const lineLength = lines[j].length;
        if (j === i) {
          const pad = start - (count - lineLength) + 1;
          const length = Math.max(1, end > count ? lineLength - pad : end - start);
          res.push(`   |  ` + " ".repeat(pad) + "^".repeat(length));
        } else if (j > i) {
          if (end > count) {
            const length = Math.max(Math.min(end - count, lineLength), 1);
            res.push(`   |  ` + "^".repeat(length));
          }
          count += lineLength + 1;
        }
      }
      break;
    }
  }
  return res.join("\n");
}
function createEmitter() {
  const events = /* @__PURE__ */ new Map();
  const emitter2 = {
    events,
    on(event, handler) {
      const handlers = events.get(event);
      const added = handlers && handlers.push(handler);
      if (!added) {
        events.set(event, [handler]);
      }
    },
    off(event, handler) {
      const handlers = events.get(event);
      if (handlers) {
        handlers.splice(handlers.indexOf(handler) >>> 0, 1);
      }
    },
    emit(event, payload) {
      (events.get(event) || []).slice().map((handler) => handler(payload));
      (events.get("*") || []).slice().map((handler) => handler(event, payload));
    }
  };
  return emitter2;
}
/*!
  * @intlify/message-resolver v9.1.9
  * (c) 2021 kazuya kawaguchi
  * Released under the MIT License.
  */
const hasOwnProperty = Object.prototype.hasOwnProperty;
function hasOwn(obj, key) {
  return hasOwnProperty.call(obj, key);
}
const isObject = (val) => (
  // eslint-disable-line
  val !== null && typeof val === "object"
);
const pathStateMachine = [];
pathStateMachine[
  0
  /* BEFORE_PATH */
] = {
  [
    "w"
    /* WORKSPACE */
  ]: [
    0
    /* BEFORE_PATH */
  ],
  [
    "i"
    /* IDENT */
  ]: [
    3,
    0
    /* APPEND */
  ],
  [
    "["
    /* LEFT_BRACKET */
  ]: [
    4
    /* IN_SUB_PATH */
  ],
  [
    "o"
    /* END_OF_FAIL */
  ]: [
    7
    /* AFTER_PATH */
  ]
};
pathStateMachine[
  1
  /* IN_PATH */
] = {
  [
    "w"
    /* WORKSPACE */
  ]: [
    1
    /* IN_PATH */
  ],
  [
    "."
    /* DOT */
  ]: [
    2
    /* BEFORE_IDENT */
  ],
  [
    "["
    /* LEFT_BRACKET */
  ]: [
    4
    /* IN_SUB_PATH */
  ],
  [
    "o"
    /* END_OF_FAIL */
  ]: [
    7
    /* AFTER_PATH */
  ]
};
pathStateMachine[
  2
  /* BEFORE_IDENT */
] = {
  [
    "w"
    /* WORKSPACE */
  ]: [
    2
    /* BEFORE_IDENT */
  ],
  [
    "i"
    /* IDENT */
  ]: [
    3,
    0
    /* APPEND */
  ],
  [
    "0"
    /* ZERO */
  ]: [
    3,
    0
    /* APPEND */
  ]
};
pathStateMachine[
  3
  /* IN_IDENT */
] = {
  [
    "i"
    /* IDENT */
  ]: [
    3,
    0
    /* APPEND */
  ],
  [
    "0"
    /* ZERO */
  ]: [
    3,
    0
    /* APPEND */
  ],
  [
    "w"
    /* WORKSPACE */
  ]: [
    1,
    1
    /* PUSH */
  ],
  [
    "."
    /* DOT */
  ]: [
    2,
    1
    /* PUSH */
  ],
  [
    "["
    /* LEFT_BRACKET */
  ]: [
    4,
    1
    /* PUSH */
  ],
  [
    "o"
    /* END_OF_FAIL */
  ]: [
    7,
    1
    /* PUSH */
  ]
};
pathStateMachine[
  4
  /* IN_SUB_PATH */
] = {
  [
    "'"
    /* SINGLE_QUOTE */
  ]: [
    5,
    0
    /* APPEND */
  ],
  [
    '"'
    /* DOUBLE_QUOTE */
  ]: [
    6,
    0
    /* APPEND */
  ],
  [
    "["
    /* LEFT_BRACKET */
  ]: [
    4,
    2
    /* INC_SUB_PATH_DEPTH */
  ],
  [
    "]"
    /* RIGHT_BRACKET */
  ]: [
    1,
    3
    /* PUSH_SUB_PATH */
  ],
  [
    "o"
    /* END_OF_FAIL */
  ]: 8,
  [
    "l"
    /* ELSE */
  ]: [
    4,
    0
    /* APPEND */
  ]
};
pathStateMachine[
  5
  /* IN_SINGLE_QUOTE */
] = {
  [
    "'"
    /* SINGLE_QUOTE */
  ]: [
    4,
    0
    /* APPEND */
  ],
  [
    "o"
    /* END_OF_FAIL */
  ]: 8,
  [
    "l"
    /* ELSE */
  ]: [
    5,
    0
    /* APPEND */
  ]
};
pathStateMachine[
  6
  /* IN_DOUBLE_QUOTE */
] = {
  [
    '"'
    /* DOUBLE_QUOTE */
  ]: [
    4,
    0
    /* APPEND */
  ],
  [
    "o"
    /* END_OF_FAIL */
  ]: 8,
  [
    "l"
    /* ELSE */
  ]: [
    6,
    0
    /* APPEND */
  ]
};
const literalValueRE = /^\s?(?:true|false|-?[\d.]+|'[^']*'|"[^"]*")\s?$/;
function isLiteral(exp) {
  return literalValueRE.test(exp);
}
function stripQuotes(str) {
  const a = str.charCodeAt(0);
  const b = str.charCodeAt(str.length - 1);
  return a === b && (a === 34 || a === 39) ? str.slice(1, -1) : str;
}
function getPathCharType(ch) {
  if (ch === void 0 || ch === null) {
    return "o";
  }
  const code = ch.charCodeAt(0);
  switch (code) {
    case 91:
    case 93:
    case 46:
    case 34:
    case 39:
      return ch;
    case 95:
    case 36:
    case 45:
      return "i";
    case 9:
    case 10:
    case 13:
    case 160:
    case 65279:
    case 8232:
    case 8233:
      return "w";
  }
  return "i";
}
function formatSubPath(path) {
  const trimmed = path.trim();
  if (path.charAt(0) === "0" && isNaN(parseInt(path))) {
    return false;
  }
  return isLiteral(trimmed) ? stripQuotes(trimmed) : "*" + trimmed;
}
function parse(path) {
  const keys = [];
  let index2 = -1;
  let mode = 0;
  let subPathDepth = 0;
  let c;
  let key;
  let newChar;
  let type;
  let transition;
  let action;
  let typeMap;
  const actions = [];
  actions[
    0
    /* APPEND */
  ] = () => {
    if (key === void 0) {
      key = newChar;
    } else {
      key += newChar;
    }
  };
  actions[
    1
    /* PUSH */
  ] = () => {
    if (key !== void 0) {
      keys.push(key);
      key = void 0;
    }
  };
  actions[
    2
    /* INC_SUB_PATH_DEPTH */
  ] = () => {
    actions[
      0
      /* APPEND */
    ]();
    subPathDepth++;
  };
  actions[
    3
    /* PUSH_SUB_PATH */
  ] = () => {
    if (subPathDepth > 0) {
      subPathDepth--;
      mode = 4;
      actions[
        0
        /* APPEND */
      ]();
    } else {
      subPathDepth = 0;
      if (key === void 0) {
        return false;
      }
      key = formatSubPath(key);
      if (key === false) {
        return false;
      } else {
        actions[
          1
          /* PUSH */
        ]();
      }
    }
  };
  function maybeUnescapeQuote() {
    const nextChar = path[index2 + 1];
    if (mode === 5 && nextChar === "'" || mode === 6 && nextChar === '"') {
      index2++;
      newChar = "\\" + nextChar;
      actions[
        0
        /* APPEND */
      ]();
      return true;
    }
  }
  while (mode !== null) {
    index2++;
    c = path[index2];
    if (c === "\\" && maybeUnescapeQuote()) {
      continue;
    }
    type = getPathCharType(c);
    typeMap = pathStateMachine[mode];
    transition = typeMap[type] || typeMap[
      "l"
      /* ELSE */
    ] || 8;
    if (transition === 8) {
      return;
    }
    mode = transition[0];
    if (transition[1] !== void 0) {
      action = actions[transition[1]];
      if (action) {
        newChar = c;
        if (action() === false) {
          return;
        }
      }
    }
    if (mode === 7) {
      return keys;
    }
  }
}
const cache = /* @__PURE__ */ new Map();
function resolveValue(obj, path) {
  if (!isObject(obj)) {
    return null;
  }
  let hit = cache.get(path);
  if (!hit) {
    hit = parse(path);
    if (hit) {
      cache.set(path, hit);
    }
  }
  if (!hit) {
    return null;
  }
  const len = hit.length;
  let last = obj;
  let i = 0;
  while (i < len) {
    const val = last[hit[i]];
    if (val === void 0) {
      return null;
    }
    last = val;
    i++;
  }
  return last;
}
function handleFlatJson(obj) {
  if (!isObject(obj)) {
    return obj;
  }
  for (const key in obj) {
    if (!hasOwn(obj, key)) {
      continue;
    }
    if (!key.includes(
      "."
      /* DOT */
    )) {
      if (isObject(obj[key])) {
        handleFlatJson(obj[key]);
      }
    } else {
      const subKeys = key.split(
        "."
        /* DOT */
      );
      const lastIndex = subKeys.length - 1;
      let currentObj = obj;
      for (let i = 0; i < lastIndex; i++) {
        if (!(subKeys[i] in currentObj)) {
          currentObj[subKeys[i]] = {};
        }
        currentObj = currentObj[subKeys[i]];
      }
      currentObj[subKeys[lastIndex]] = obj[key];
      delete obj[key];
      if (isObject(currentObj[subKeys[lastIndex]])) {
        handleFlatJson(currentObj[subKeys[lastIndex]]);
      }
    }
  }
  return obj;
}
/*!
  * @intlify/runtime v9.1.9
  * (c) 2021 kazuya kawaguchi
  * Released under the MIT License.
  */
const DEFAULT_MODIFIER = (str) => str;
const DEFAULT_MESSAGE = (ctx) => "";
const DEFAULT_MESSAGE_DATA_TYPE = "text";
const DEFAULT_NORMALIZE = (values) => values.length === 0 ? "" : values.join("");
const DEFAULT_INTERPOLATE = toDisplayString;
function pluralDefault(choice, choicesLength) {
  choice = Math.abs(choice);
  if (choicesLength === 2) {
    return choice ? choice > 1 ? 1 : 0 : 1;
  }
  return choice ? Math.min(choice, 2) : 0;
}
function getPluralIndex(options) {
  const index2 = isNumber(options.pluralIndex) ? options.pluralIndex : -1;
  return options.named && (isNumber(options.named.count) || isNumber(options.named.n)) ? isNumber(options.named.count) ? options.named.count : isNumber(options.named.n) ? options.named.n : index2 : index2;
}
function normalizeNamed(pluralIndex, props) {
  if (!props.count) {
    props.count = pluralIndex;
  }
  if (!props.n) {
    props.n = pluralIndex;
  }
}
function createMessageContext(options = {}) {
  const locale = options.locale;
  const pluralIndex = getPluralIndex(options);
  const pluralRule = isObject$1(options.pluralRules) && isString(locale) && isFunction(options.pluralRules[locale]) ? options.pluralRules[locale] : pluralDefault;
  const orgPluralRule = isObject$1(options.pluralRules) && isString(locale) && isFunction(options.pluralRules[locale]) ? pluralDefault : void 0;
  const plural = (messages) => messages[pluralRule(pluralIndex, messages.length, orgPluralRule)];
  const _list = options.list || [];
  const list = (index2) => _list[index2];
  const _named = options.named || {};
  isNumber(options.pluralIndex) && normalizeNamed(pluralIndex, _named);
  const named = (key) => _named[key];
  function message(key) {
    const msg = isFunction(options.messages) ? options.messages(key) : isObject$1(options.messages) ? options.messages[key] : false;
    return !msg ? options.parent ? options.parent.message(key) : DEFAULT_MESSAGE : msg;
  }
  const _modifier = (name) => options.modifiers ? options.modifiers[name] : DEFAULT_MODIFIER;
  const normalize = isPlainObject(options.processor) && isFunction(options.processor.normalize) ? options.processor.normalize : DEFAULT_NORMALIZE;
  const interpolate = isPlainObject(options.processor) && isFunction(options.processor.interpolate) ? options.processor.interpolate : DEFAULT_INTERPOLATE;
  const type = isPlainObject(options.processor) && isString(options.processor.type) ? options.processor.type : DEFAULT_MESSAGE_DATA_TYPE;
  const ctx = {
    [
      "list"
      /* LIST */
    ]: list,
    [
      "named"
      /* NAMED */
    ]: named,
    [
      "plural"
      /* PLURAL */
    ]: plural,
    [
      "linked"
      /* LINKED */
    ]: (key, modifier) => {
      const msg = message(key)(ctx);
      return isString(modifier) ? _modifier(modifier)(msg) : msg;
    },
    [
      "message"
      /* MESSAGE */
    ]: message,
    [
      "type"
      /* TYPE */
    ]: type,
    [
      "interpolate"
      /* INTERPOLATE */
    ]: interpolate,
    [
      "normalize"
      /* NORMALIZE */
    ]: normalize
  };
  return ctx;
}
/*!
  * @intlify/message-compiler v9.1.9
  * (c) 2021 kazuya kawaguchi
  * Released under the MIT License.
  */
const errorMessages$2 = {
  // tokenizer error messages
  [
    0
    /* EXPECTED_TOKEN */
  ]: `Expected token: '{0}'`,
  [
    1
    /* INVALID_TOKEN_IN_PLACEHOLDER */
  ]: `Invalid token in placeholder: '{0}'`,
  [
    2
    /* UNTERMINATED_SINGLE_QUOTE_IN_PLACEHOLDER */
  ]: `Unterminated single quote in placeholder`,
  [
    3
    /* UNKNOWN_ESCAPE_SEQUENCE */
  ]: `Unknown escape sequence: \\{0}`,
  [
    4
    /* INVALID_UNICODE_ESCAPE_SEQUENCE */
  ]: `Invalid unicode escape sequence: {0}`,
  [
    5
    /* UNBALANCED_CLOSING_BRACE */
  ]: `Unbalanced closing brace`,
  [
    6
    /* UNTERMINATED_CLOSING_BRACE */
  ]: `Unterminated closing brace`,
  [
    7
    /* EMPTY_PLACEHOLDER */
  ]: `Empty placeholder`,
  [
    8
    /* NOT_ALLOW_NEST_PLACEHOLDER */
  ]: `Not allowed nest placeholder`,
  [
    9
    /* INVALID_LINKED_FORMAT */
  ]: `Invalid linked format`,
  // parser error messages
  [
    10
    /* MUST_HAVE_MESSAGES_IN_PLURAL */
  ]: `Plural must have messages`,
  [
    11
    /* UNEXPECTED_EMPTY_LINKED_MODIFIER */
  ]: `Unexpected empty linked modifier`,
  [
    12
    /* UNEXPECTED_EMPTY_LINKED_KEY */
  ]: `Unexpected empty linked key`,
  [
    13
    /* UNEXPECTED_LEXICAL_ANALYSIS */
  ]: `Unexpected lexical analysis in token: '{0}'`
};
function createCompileError(code, loc, options = {}) {
  const { domain, messages, args } = options;
  const msg = format((messages || errorMessages$2)[code] || "", ...args || []);
  const error = new SyntaxError(String(msg));
  error.code = code;
  if (loc) {
    error.location = loc;
  }
  error.domain = domain;
  return error;
}
/*!
  * @intlify/devtools-if v9.1.9
  * (c) 2021 kazuya kawaguchi
  * Released under the MIT License.
  */
const IntlifyDevToolsHooks = {
  I18nInit: "i18n:init",
  FunctionTranslate: "function:translate"
};
/*!
  * @intlify/core-base v9.1.9
  * (c) 2021 kazuya kawaguchi
  * Released under the MIT License.
  */
let devtools = null;
function setDevToolsHook(hook) {
  devtools = hook;
}
function initI18nDevTools(i18n, version2, meta) {
  devtools && devtools.emit(IntlifyDevToolsHooks.I18nInit, {
    timestamp: Date.now(),
    i18n,
    version: version2,
    meta
  });
}
const translateDevTools = /* @__PURE__ */ createDevToolsHook(IntlifyDevToolsHooks.FunctionTranslate);
function createDevToolsHook(hook) {
  return (payloads) => devtools && devtools.emit(hook, payloads);
}
const warnMessages$1 = {
  [
    0
    /* NOT_FOUND_KEY */
  ]: `Not found '{key}' key in '{locale}' locale messages.`,
  [
    1
    /* FALLBACK_TO_TRANSLATE */
  ]: `Fall back to translate '{key}' key with '{target}' locale.`,
  [
    2
    /* CANNOT_FORMAT_NUMBER */
  ]: `Cannot format a number value due to not supported Intl.NumberFormat.`,
  [
    3
    /* FALLBACK_TO_NUMBER_FORMAT */
  ]: `Fall back to number format '{key}' key with '{target}' locale.`,
  [
    4
    /* CANNOT_FORMAT_DATE */
  ]: `Cannot format a date value due to not supported Intl.DateTimeFormat.`,
  [
    5
    /* FALLBACK_TO_DATE_FORMAT */
  ]: `Fall back to datetime format '{key}' key with '{target}' locale.`
};
function getWarnMessage$1(code, ...args) {
  return format(warnMessages$1[code], ...args);
}
const VERSION$1 = "9.1.9";
const NOT_REOSLVED = -1;
const MISSING_RESOLVE_VALUE = "";
function getDefaultLinkedModifiers() {
  return {
    upper: (val) => isString(val) ? val.toUpperCase() : val,
    lower: (val) => isString(val) ? val.toLowerCase() : val,
    // prettier-ignore
    capitalize: (val) => isString(val) ? `${val.charAt(0).toLocaleUpperCase()}${val.substr(1)}` : val
  };
}
let _compiler;
let _additionalMeta = null;
const setAdditionalMeta = (meta) => {
  _additionalMeta = meta;
};
const getAdditionalMeta = () => _additionalMeta;
let _cid = 0;
function createCoreContext(options = {}) {
  const version2 = isString(options.version) ? options.version : VERSION$1;
  const locale = isString(options.locale) ? options.locale : "en-US";
  const fallbackLocale = isArray(options.fallbackLocale) || isPlainObject(options.fallbackLocale) || isString(options.fallbackLocale) || options.fallbackLocale === false ? options.fallbackLocale : locale;
  const messages = isPlainObject(options.messages) ? options.messages : { [locale]: {} };
  const datetimeFormats = isPlainObject(options.datetimeFormats) ? options.datetimeFormats : { [locale]: {} };
  const numberFormats = isPlainObject(options.numberFormats) ? options.numberFormats : { [locale]: {} };
  const modifiers = assign$1({}, options.modifiers || {}, getDefaultLinkedModifiers());
  const pluralRules = options.pluralRules || {};
  const missing = isFunction(options.missing) ? options.missing : null;
  const missingWarn = isBoolean(options.missingWarn) || isRegExp(options.missingWarn) ? options.missingWarn : true;
  const fallbackWarn = isBoolean(options.fallbackWarn) || isRegExp(options.fallbackWarn) ? options.fallbackWarn : true;
  const fallbackFormat = !!options.fallbackFormat;
  const unresolving = !!options.unresolving;
  const postTranslation = isFunction(options.postTranslation) ? options.postTranslation : null;
  const processor = isPlainObject(options.processor) ? options.processor : null;
  const warnHtmlMessage = isBoolean(options.warnHtmlMessage) ? options.warnHtmlMessage : true;
  const escapeParameter = !!options.escapeParameter;
  const messageCompiler = isFunction(options.messageCompiler) ? options.messageCompiler : _compiler;
  const onWarn = isFunction(options.onWarn) ? options.onWarn : warn;
  const internalOptions = options;
  const __datetimeFormatters = isObject$1(internalOptions.__datetimeFormatters) ? internalOptions.__datetimeFormatters : /* @__PURE__ */ new Map();
  const __numberFormatters = isObject$1(internalOptions.__numberFormatters) ? internalOptions.__numberFormatters : /* @__PURE__ */ new Map();
  const __meta = isObject$1(internalOptions.__meta) ? internalOptions.__meta : {};
  _cid++;
  const context = {
    version: version2,
    cid: _cid,
    locale,
    fallbackLocale,
    messages,
    datetimeFormats,
    numberFormats,
    modifiers,
    pluralRules,
    missing,
    missingWarn,
    fallbackWarn,
    fallbackFormat,
    unresolving,
    postTranslation,
    processor,
    warnHtmlMessage,
    escapeParameter,
    messageCompiler,
    onWarn,
    __datetimeFormatters,
    __numberFormatters,
    __meta
  };
  {
    context.__v_emitter = internalOptions.__v_emitter != null ? internalOptions.__v_emitter : void 0;
  }
  {
    initI18nDevTools(context, version2, __meta);
  }
  return context;
}
function isTranslateFallbackWarn(fallback, key) {
  return fallback instanceof RegExp ? fallback.test(key) : fallback;
}
function isTranslateMissingWarn(missing, key) {
  return missing instanceof RegExp ? missing.test(key) : missing;
}
function handleMissing(context, key, locale, missingWarn, type) {
  const { missing, onWarn } = context;
  {
    const emitter2 = context.__v_emitter;
    if (emitter2) {
      emitter2.emit("missing", {
        locale,
        key,
        type,
        groupId: `${type}:${key}`
      });
    }
  }
  if (missing !== null) {
    const ret = missing(context, locale, key, type);
    return isString(ret) ? ret : key;
  } else {
    if (isTranslateMissingWarn(missingWarn, key)) {
      onWarn(getWarnMessage$1(0, { key, locale }));
    }
    return key;
  }
}
function getLocaleChain(ctx, fallback, start) {
  const context = ctx;
  if (!context.__localeChainCache) {
    context.__localeChainCache = /* @__PURE__ */ new Map();
  }
  let chain = context.__localeChainCache.get(start);
  if (!chain) {
    chain = [];
    let block = [start];
    while (isArray(block)) {
      block = appendBlockToChain(chain, block, fallback);
    }
    const defaults = isArray(fallback) ? fallback : isPlainObject(fallback) ? fallback["default"] ? fallback["default"] : null : fallback;
    block = isString(defaults) ? [defaults] : defaults;
    if (isArray(block)) {
      appendBlockToChain(chain, block, false);
    }
    context.__localeChainCache.set(start, chain);
  }
  return chain;
}
function appendBlockToChain(chain, block, blocks) {
  let follow = true;
  for (let i = 0; i < block.length && isBoolean(follow); i++) {
    const locale = block[i];
    if (isString(locale)) {
      follow = appendLocaleToChain(chain, block[i], blocks);
    }
  }
  return follow;
}
function appendLocaleToChain(chain, locale, blocks) {
  let follow;
  const tokens = locale.split("-");
  do {
    const target = tokens.join("-");
    follow = appendItemToChain(chain, target, blocks);
    tokens.splice(-1, 1);
  } while (tokens.length && follow === true);
  return follow;
}
function appendItemToChain(chain, target, blocks) {
  let follow = false;
  if (!chain.includes(target)) {
    follow = true;
    if (target) {
      follow = target[target.length - 1] !== "!";
      const locale = target.replace(/!/g, "");
      chain.push(locale);
      if ((isArray(blocks) || isPlainObject(blocks)) && blocks[locale]) {
        follow = blocks[locale];
      }
    }
  }
  return follow;
}
function updateFallbackLocale(ctx, locale, fallback) {
  const context = ctx;
  context.__localeChainCache = /* @__PURE__ */ new Map();
  getLocaleChain(ctx, fallback, locale);
}
function createCoreError(code) {
  return createCompileError(code, null, { messages: errorMessages$1 });
}
const errorMessages$1 = {
  [
    14
    /* INVALID_ARGUMENT */
  ]: "Invalid arguments",
  [
    15
    /* INVALID_DATE_ARGUMENT */
  ]: "The date provided is an invalid Date object.Make sure your Date represents a valid date.",
  [
    16
    /* INVALID_ISO_DATE_ARGUMENT */
  ]: "The argument provided is not a valid ISO date string"
};
const NOOP_MESSAGE_FUNCTION = () => "";
const isMessageFunction = (val) => isFunction(val);
function translate(context, ...args) {
  const { fallbackFormat, postTranslation, unresolving, fallbackLocale, messages } = context;
  const [key, options] = parseTranslateArgs(...args);
  const missingWarn = isBoolean(options.missingWarn) ? options.missingWarn : context.missingWarn;
  const fallbackWarn = isBoolean(options.fallbackWarn) ? options.fallbackWarn : context.fallbackWarn;
  const escapeParameter = isBoolean(options.escapeParameter) ? options.escapeParameter : context.escapeParameter;
  const resolvedMessage = !!options.resolvedMessage;
  const defaultMsgOrKey = isString(options.default) || isBoolean(options.default) ? !isBoolean(options.default) ? options.default : key : fallbackFormat ? key : "";
  const enableDefaultMsg = fallbackFormat || defaultMsgOrKey !== "";
  const locale = isString(options.locale) ? options.locale : context.locale;
  escapeParameter && escapeParams(options);
  let [format2, targetLocale, message] = !resolvedMessage ? resolveMessageFormat(context, key, locale, fallbackLocale, fallbackWarn, missingWarn) : [
    key,
    locale,
    messages[locale] || {}
  ];
  let cacheBaseKey = key;
  if (!resolvedMessage && !(isString(format2) || isMessageFunction(format2))) {
    if (enableDefaultMsg) {
      format2 = defaultMsgOrKey;
      cacheBaseKey = format2;
    }
  }
  if (!resolvedMessage && (!(isString(format2) || isMessageFunction(format2)) || !isString(targetLocale))) {
    return unresolving ? NOT_REOSLVED : key;
  }
  if (isString(format2) && context.messageCompiler == null) {
    warn(`The message format compilation is not supported in this build. Because message compiler isn't included. You need to pre-compilation all message format. So translate function return '${key}'.`);
    return key;
  }
  let occurred = false;
  const errorDetector = () => {
    occurred = true;
  };
  const msg = !isMessageFunction(format2) ? compileMessageFormat(context, key, targetLocale, format2, cacheBaseKey, errorDetector) : format2;
  if (occurred) {
    return format2;
  }
  const ctxOptions = getMessageContextOptions(context, targetLocale, message, options);
  const msgContext = createMessageContext(ctxOptions);
  const messaged = evaluateMessage(context, msg, msgContext);
  const ret = postTranslation ? postTranslation(messaged) : messaged;
  {
    const payloads = {
      timestamp: Date.now(),
      key: isString(key) ? key : isMessageFunction(format2) ? format2.key : "",
      locale: targetLocale || (isMessageFunction(format2) ? format2.locale : ""),
      format: isString(format2) ? format2 : isMessageFunction(format2) ? format2.source : "",
      message: ret
    };
    payloads.meta = assign$1({}, context.__meta, getAdditionalMeta() || {});
    translateDevTools(payloads);
  }
  return ret;
}
function escapeParams(options) {
  if (isArray(options.list)) {
    options.list = options.list.map((item) => isString(item) ? escapeHtml(item) : item);
  } else if (isObject$1(options.named)) {
    Object.keys(options.named).forEach((key) => {
      if (isString(options.named[key])) {
        options.named[key] = escapeHtml(options.named[key]);
      }
    });
  }
}
function resolveMessageFormat(context, key, locale, fallbackLocale, fallbackWarn, missingWarn) {
  const { messages, onWarn } = context;
  const locales = getLocaleChain(context, fallbackLocale, locale);
  let message = {};
  let targetLocale;
  let format2 = null;
  let from = locale;
  let to = null;
  const type = "translate";
  for (let i = 0; i < locales.length; i++) {
    targetLocale = to = locales[i];
    if (locale !== targetLocale && isTranslateFallbackWarn(fallbackWarn, key)) {
      onWarn(getWarnMessage$1(1, {
        key,
        target: targetLocale
      }));
    }
    if (locale !== targetLocale) {
      const emitter2 = context.__v_emitter;
      if (emitter2) {
        emitter2.emit("fallback", {
          type,
          key,
          from,
          to,
          groupId: `${type}:${key}`
        });
      }
    }
    message = messages[targetLocale] || {};
    let start = null;
    let startTag;
    let endTag;
    if (inBrowser) {
      start = window.performance.now();
      startTag = "intlify-message-resolve-start";
      endTag = "intlify-message-resolve-end";
      mark && mark(startTag);
    }
    if ((format2 = resolveValue(message, key)) === null) {
      format2 = message[key];
    }
    if (inBrowser) {
      const end = window.performance.now();
      const emitter2 = context.__v_emitter;
      if (emitter2 && start && format2) {
        emitter2.emit("message-resolve", {
          type: "message-resolve",
          key,
          message: format2,
          time: end - start,
          groupId: `${type}:${key}`
        });
      }
      if (startTag && endTag && mark && measure) {
        mark(endTag);
        measure("intlify message resolve", startTag, endTag);
      }
    }
    if (isString(format2) || isFunction(format2))
      break;
    const missingRet = handleMissing(context, key, targetLocale, missingWarn, type);
    if (missingRet !== key) {
      format2 = missingRet;
    }
    from = to;
  }
  return [format2, targetLocale, message];
}
function compileMessageFormat(context, key, targetLocale, format2, cacheBaseKey, errorDetector) {
  const { messageCompiler, warnHtmlMessage } = context;
  if (isMessageFunction(format2)) {
    const msg2 = format2;
    msg2.locale = msg2.locale || targetLocale;
    msg2.key = msg2.key || key;
    return msg2;
  }
  let start = null;
  let startTag;
  let endTag;
  if (inBrowser) {
    start = window.performance.now();
    startTag = "intlify-message-compilation-start";
    endTag = "intlify-message-compilation-end";
    mark && mark(startTag);
  }
  const msg = messageCompiler(format2, getCompileOptions(context, targetLocale, cacheBaseKey, format2, warnHtmlMessage, errorDetector));
  if (inBrowser) {
    const end = window.performance.now();
    const emitter2 = context.__v_emitter;
    if (emitter2 && start) {
      emitter2.emit("message-compilation", {
        type: "message-compilation",
        message: format2,
        time: end - start,
        groupId: `${"translate"}:${key}`
      });
    }
    if (startTag && endTag && mark && measure) {
      mark(endTag);
      measure("intlify message compilation", startTag, endTag);
    }
  }
  msg.locale = targetLocale;
  msg.key = key;
  msg.source = format2;
  return msg;
}
function evaluateMessage(context, msg, msgCtx) {
  let start = null;
  let startTag;
  let endTag;
  if (inBrowser) {
    start = window.performance.now();
    startTag = "intlify-message-evaluation-start";
    endTag = "intlify-message-evaluation-end";
    mark && mark(startTag);
  }
  const messaged = msg(msgCtx);
  if (inBrowser) {
    const end = window.performance.now();
    const emitter2 = context.__v_emitter;
    if (emitter2 && start) {
      emitter2.emit("message-evaluation", {
        type: "message-evaluation",
        value: messaged,
        time: end - start,
        groupId: `${"translate"}:${msg.key}`
      });
    }
    if (startTag && endTag && mark && measure) {
      mark(endTag);
      measure("intlify message evaluation", startTag, endTag);
    }
  }
  return messaged;
}
function parseTranslateArgs(...args) {
  const [arg1, arg2, arg3] = args;
  const options = {};
  if (!isString(arg1) && !isNumber(arg1) && !isMessageFunction(arg1)) {
    throw createCoreError(
      14
      /* INVALID_ARGUMENT */
    );
  }
  const key = isNumber(arg1) ? String(arg1) : isMessageFunction(arg1) ? arg1 : arg1;
  if (isNumber(arg2)) {
    options.plural = arg2;
  } else if (isString(arg2)) {
    options.default = arg2;
  } else if (isPlainObject(arg2) && !isEmptyObject(arg2)) {
    options.named = arg2;
  } else if (isArray(arg2)) {
    options.list = arg2;
  }
  if (isNumber(arg3)) {
    options.plural = arg3;
  } else if (isString(arg3)) {
    options.default = arg3;
  } else if (isPlainObject(arg3)) {
    assign$1(options, arg3);
  }
  return [key, options];
}
function getCompileOptions(context, locale, key, source, warnHtmlMessage, errorDetector) {
  return {
    warnHtmlMessage,
    onError: (err) => {
      errorDetector && errorDetector(err);
      {
        const message = `Message compilation error: ${err.message}`;
        const codeFrame = err.location && generateCodeFrame(source, err.location.start.offset, err.location.end.offset);
        const emitter2 = context.__v_emitter;
        if (emitter2) {
          emitter2.emit("compile-error", {
            message: source,
            error: err.message,
            start: err.location && err.location.start.offset,
            end: err.location && err.location.end.offset,
            groupId: `${"translate"}:${key}`
          });
        }
        console.error(codeFrame ? `${message}
${codeFrame}` : message);
      }
    },
    onCacheKey: (source2) => generateFormatCacheKey(locale, key, source2)
  };
}
function getMessageContextOptions(context, locale, message, options) {
  const { modifiers, pluralRules } = context;
  const resolveMessage = (key) => {
    const val = resolveValue(message, key);
    if (isString(val)) {
      let occurred = false;
      const errorDetector = () => {
        occurred = true;
      };
      const msg = compileMessageFormat(context, key, locale, val, key, errorDetector);
      return !occurred ? msg : NOOP_MESSAGE_FUNCTION;
    } else if (isMessageFunction(val)) {
      return val;
    } else {
      return NOOP_MESSAGE_FUNCTION;
    }
  };
  const ctxOptions = {
    locale,
    modifiers,
    pluralRules,
    messages: resolveMessage
  };
  if (context.processor) {
    ctxOptions.processor = context.processor;
  }
  if (options.list) {
    ctxOptions.list = options.list;
  }
  if (options.named) {
    ctxOptions.named = options.named;
  }
  if (isNumber(options.plural)) {
    ctxOptions.pluralIndex = options.plural;
  }
  return ctxOptions;
}
const intlDefined = typeof Intl !== "undefined";
const Availabilities = {
  dateTimeFormat: intlDefined && typeof Intl.DateTimeFormat !== "undefined",
  numberFormat: intlDefined && typeof Intl.NumberFormat !== "undefined"
};
function datetime(context, ...args) {
  const { datetimeFormats, unresolving, fallbackLocale, onWarn } = context;
  const { __datetimeFormatters } = context;
  if (!Availabilities.dateTimeFormat) {
    onWarn(getWarnMessage$1(
      4
      /* CANNOT_FORMAT_DATE */
    ));
    return MISSING_RESOLVE_VALUE;
  }
  const [key, value, options, overrides] = parseDateTimeArgs(...args);
  const missingWarn = isBoolean(options.missingWarn) ? options.missingWarn : context.missingWarn;
  const fallbackWarn = isBoolean(options.fallbackWarn) ? options.fallbackWarn : context.fallbackWarn;
  const part = !!options.part;
  const locale = isString(options.locale) ? options.locale : context.locale;
  const locales = getLocaleChain(context, fallbackLocale, locale);
  if (!isString(key) || key === "") {
    return new Intl.DateTimeFormat(locale).format(value);
  }
  let datetimeFormat = {};
  let targetLocale;
  let format2 = null;
  let from = locale;
  let to = null;
  const type = "datetime format";
  for (let i = 0; i < locales.length; i++) {
    targetLocale = to = locales[i];
    if (locale !== targetLocale && isTranslateFallbackWarn(fallbackWarn, key)) {
      onWarn(getWarnMessage$1(5, {
        key,
        target: targetLocale
      }));
    }
    if (locale !== targetLocale) {
      const emitter2 = context.__v_emitter;
      if (emitter2) {
        emitter2.emit("fallback", {
          type,
          key,
          from,
          to,
          groupId: `${type}:${key}`
        });
      }
    }
    datetimeFormat = datetimeFormats[targetLocale] || {};
    format2 = datetimeFormat[key];
    if (isPlainObject(format2))
      break;
    handleMissing(context, key, targetLocale, missingWarn, type);
    from = to;
  }
  if (!isPlainObject(format2) || !isString(targetLocale)) {
    return unresolving ? NOT_REOSLVED : key;
  }
  let id = `${targetLocale}__${key}`;
  if (!isEmptyObject(overrides)) {
    id = `${id}__${JSON.stringify(overrides)}`;
  }
  let formatter = __datetimeFormatters.get(id);
  if (!formatter) {
    formatter = new Intl.DateTimeFormat(targetLocale, assign$1({}, format2, overrides));
    __datetimeFormatters.set(id, formatter);
  }
  return !part ? formatter.format(value) : formatter.formatToParts(value);
}
function parseDateTimeArgs(...args) {
  const [arg1, arg2, arg3, arg4] = args;
  let options = {};
  let overrides = {};
  let value;
  if (isString(arg1)) {
    if (!/\d{4}-\d{2}-\d{2}(T.*)?/.test(arg1)) {
      throw createCoreError(
        16
        /* INVALID_ISO_DATE_ARGUMENT */
      );
    }
    value = new Date(arg1);
    try {
      value.toISOString();
    } catch (e2) {
      throw createCoreError(
        16
        /* INVALID_ISO_DATE_ARGUMENT */
      );
    }
  } else if (isDate(arg1)) {
    if (isNaN(arg1.getTime())) {
      throw createCoreError(
        15
        /* INVALID_DATE_ARGUMENT */
      );
    }
    value = arg1;
  } else if (isNumber(arg1)) {
    value = arg1;
  } else {
    throw createCoreError(
      14
      /* INVALID_ARGUMENT */
    );
  }
  if (isString(arg2)) {
    options.key = arg2;
  } else if (isPlainObject(arg2)) {
    options = arg2;
  }
  if (isString(arg3)) {
    options.locale = arg3;
  } else if (isPlainObject(arg3)) {
    overrides = arg3;
  }
  if (isPlainObject(arg4)) {
    overrides = arg4;
  }
  return [options.key || "", value, options, overrides];
}
function clearDateTimeFormat(ctx, locale, format2) {
  const context = ctx;
  for (const key in format2) {
    const id = `${locale}__${key}`;
    if (!context.__datetimeFormatters.has(id)) {
      continue;
    }
    context.__datetimeFormatters.delete(id);
  }
}
function number(context, ...args) {
  const { numberFormats, unresolving, fallbackLocale, onWarn } = context;
  const { __numberFormatters } = context;
  if (!Availabilities.numberFormat) {
    onWarn(getWarnMessage$1(
      2
      /* CANNOT_FORMAT_NUMBER */
    ));
    return MISSING_RESOLVE_VALUE;
  }
  const [key, value, options, overrides] = parseNumberArgs(...args);
  const missingWarn = isBoolean(options.missingWarn) ? options.missingWarn : context.missingWarn;
  const fallbackWarn = isBoolean(options.fallbackWarn) ? options.fallbackWarn : context.fallbackWarn;
  const part = !!options.part;
  const locale = isString(options.locale) ? options.locale : context.locale;
  const locales = getLocaleChain(context, fallbackLocale, locale);
  if (!isString(key) || key === "") {
    return new Intl.NumberFormat(locale).format(value);
  }
  let numberFormat = {};
  let targetLocale;
  let format2 = null;
  let from = locale;
  let to = null;
  const type = "number format";
  for (let i = 0; i < locales.length; i++) {
    targetLocale = to = locales[i];
    if (locale !== targetLocale && isTranslateFallbackWarn(fallbackWarn, key)) {
      onWarn(getWarnMessage$1(3, {
        key,
        target: targetLocale
      }));
    }
    if (locale !== targetLocale) {
      const emitter2 = context.__v_emitter;
      if (emitter2) {
        emitter2.emit("fallback", {
          type,
          key,
          from,
          to,
          groupId: `${type}:${key}`
        });
      }
    }
    numberFormat = numberFormats[targetLocale] || {};
    format2 = numberFormat[key];
    if (isPlainObject(format2))
      break;
    handleMissing(context, key, targetLocale, missingWarn, type);
    from = to;
  }
  if (!isPlainObject(format2) || !isString(targetLocale)) {
    return unresolving ? NOT_REOSLVED : key;
  }
  let id = `${targetLocale}__${key}`;
  if (!isEmptyObject(overrides)) {
    id = `${id}__${JSON.stringify(overrides)}`;
  }
  let formatter = __numberFormatters.get(id);
  if (!formatter) {
    formatter = new Intl.NumberFormat(targetLocale, assign$1({}, format2, overrides));
    __numberFormatters.set(id, formatter);
  }
  return !part ? formatter.format(value) : formatter.formatToParts(value);
}
function parseNumberArgs(...args) {
  const [arg1, arg2, arg3, arg4] = args;
  let options = {};
  let overrides = {};
  if (!isNumber(arg1)) {
    throw createCoreError(
      14
      /* INVALID_ARGUMENT */
    );
  }
  const value = arg1;
  if (isString(arg2)) {
    options.key = arg2;
  } else if (isPlainObject(arg2)) {
    options = arg2;
  }
  if (isString(arg3)) {
    options.locale = arg3;
  } else if (isPlainObject(arg3)) {
    overrides = arg3;
  }
  if (isPlainObject(arg4)) {
    overrides = arg4;
  }
  return [options.key || "", value, options, overrides];
}
function clearNumberFormat(ctx, locale, format2) {
  const context = ctx;
  for (const key in format2) {
    const id = `${locale}__${key}`;
    if (!context.__numberFormatters.has(id)) {
      continue;
    }
    context.__numberFormatters.delete(id);
  }
}
/*!
  * @intlify/vue-devtools v9.1.9
  * (c) 2021 kazuya kawaguchi
  * Released under the MIT License.
  */
const VueDevToolsLabels = {
  [
    "vue-devtools-plugin-vue-i18n"
    /* PLUGIN */
  ]: "Vue I18n devtools",
  [
    "vue-i18n-resource-inspector"
    /* CUSTOM_INSPECTOR */
  ]: "I18n Resources",
  [
    "vue-i18n-timeline"
    /* TIMELINE */
  ]: "Vue I18n"
};
const VueDevToolsPlaceholders = {
  [
    "vue-i18n-resource-inspector"
    /* CUSTOM_INSPECTOR */
  ]: "Search for scopes ..."
};
const VueDevToolsTimelineColors = {
  [
    "vue-i18n-timeline"
    /* TIMELINE */
  ]: 16764185
};
/*!
  * vue-i18n v9.1.9
  * (c) 2022 kazuya kawaguchi
  * Released under the MIT License.
  */
const VERSION = "9.1.9";
function initFeatureFlags() {
  let needWarn = false;
  {
    needWarn = true;
  }
  if (needWarn) {
    console.warn(`You are running the esm-bundler build of vue-i18n. It is recommended to configure your bundler to explicitly replace feature flag globals with boolean literals to get proper tree-shaking in the final bundle.`);
  }
}
const warnMessages = {
  [
    6
    /* FALLBACK_TO_ROOT */
  ]: `Fall back to {type} '{key}' with root locale.`,
  [
    7
    /* NOT_SUPPORTED_PRESERVE */
  ]: `Not supported 'preserve'.`,
  [
    8
    /* NOT_SUPPORTED_FORMATTER */
  ]: `Not supported 'formatter'.`,
  [
    9
    /* NOT_SUPPORTED_PRESERVE_DIRECTIVE */
  ]: `Not supported 'preserveDirectiveContent'.`,
  [
    10
    /* NOT_SUPPORTED_GET_CHOICE_INDEX */
  ]: `Not supported 'getChoiceIndex'.`,
  [
    11
    /* COMPONENT_NAME_LEGACY_COMPATIBLE */
  ]: `Component name legacy compatible: '{name}' -> 'i18n'`,
  [
    12
    /* NOT_FOUND_PARENT_SCOPE */
  ]: `Not found parent scope. use the global scope.`
};
function getWarnMessage(code, ...args) {
  return format(warnMessages[code], ...args);
}
function createI18nError(code, ...args) {
  return createCompileError(code, null, { messages: errorMessages, args });
}
const errorMessages = {
  [
    14
    /* UNEXPECTED_RETURN_TYPE */
  ]: "Unexpected return type in composer",
  [
    15
    /* INVALID_ARGUMENT */
  ]: "Invalid argument",
  [
    16
    /* MUST_BE_CALL_SETUP_TOP */
  ]: "Must be called at the top of a `setup` function",
  [
    17
    /* NOT_INSLALLED */
  ]: "Need to install with `app.use` function",
  [
    22
    /* UNEXPECTED_ERROR */
  ]: "Unexpected error",
  [
    18
    /* NOT_AVAILABLE_IN_LEGACY_MODE */
  ]: "Not available in legacy mode",
  [
    19
    /* REQUIRED_VALUE */
  ]: `Required in value: {0}`,
  [
    20
    /* INVALID_VALUE */
  ]: `Invalid value`,
  [
    21
    /* CANNOT_SETUP_VUE_DEVTOOLS_PLUGIN */
  ]: `Cannot setup vue-devtools plugin`
};
const DEVTOOLS_META = "__INTLIFY_META__";
const TransrateVNodeSymbol = makeSymbol("__transrateVNode");
const DatetimePartsSymbol = makeSymbol("__datetimeParts");
const NumberPartsSymbol = makeSymbol("__numberParts");
const EnableEmitter = makeSymbol("__enableEmitter");
const DisableEmitter = makeSymbol("__disableEmitter");
const SetPluralRulesSymbol = makeSymbol("__setPluralRules");
makeSymbol("__intlifyMeta");
const InejctWithOption = makeSymbol("__injectWithOption");
let composerID = 0;
function defineCoreMissingHandler(missing) {
  return (ctx, locale, key, type) => {
    return missing(locale, key, getCurrentInstance() || void 0, type);
  };
}
function getLocaleMessages(locale, options) {
  const { messages, __i18n } = options;
  const ret = isPlainObject(messages) ? messages : isArray(__i18n) ? {} : { [locale]: {} };
  if (isArray(__i18n)) {
    __i18n.forEach(({ locale: locale2, resource }) => {
      if (locale2) {
        ret[locale2] = ret[locale2] || {};
        deepCopy(resource, ret[locale2]);
      } else {
        deepCopy(resource, ret);
      }
    });
  }
  if (options.flatJson) {
    for (const key in ret) {
      if (hasOwn$1(ret, key)) {
        handleFlatJson(ret[key]);
      }
    }
  }
  return ret;
}
const isNotObjectOrIsArray = (val) => !isObject$1(val) || isArray(val);
function deepCopy(src, des) {
  if (isNotObjectOrIsArray(src) || isNotObjectOrIsArray(des)) {
    throw createI18nError(
      20
      /* INVALID_VALUE */
    );
  }
  for (const key in src) {
    if (hasOwn$1(src, key)) {
      if (isNotObjectOrIsArray(src[key]) || isNotObjectOrIsArray(des[key])) {
        des[key] = src[key];
      } else {
        deepCopy(src[key], des[key]);
      }
    }
  }
}
const getMetaInfo = () => {
  const instance = getCurrentInstance();
  return instance && instance.type[DEVTOOLS_META] ? { [DEVTOOLS_META]: instance.type[DEVTOOLS_META] } : null;
};
function createComposer(options = {}) {
  const { __root } = options;
  const _isGlobal = __root === void 0;
  let _inheritLocale = isBoolean(options.inheritLocale) ? options.inheritLocale : true;
  const _locale = ref(
    // prettier-ignore
    __root && _inheritLocale ? __root.locale.value : isString(options.locale) ? options.locale : "en-US"
  );
  const _fallbackLocale = ref(
    // prettier-ignore
    __root && _inheritLocale ? __root.fallbackLocale.value : isString(options.fallbackLocale) || isArray(options.fallbackLocale) || isPlainObject(options.fallbackLocale) || options.fallbackLocale === false ? options.fallbackLocale : _locale.value
  );
  const _messages = ref(getLocaleMessages(_locale.value, options));
  const _datetimeFormats = ref(isPlainObject(options.datetimeFormats) ? options.datetimeFormats : { [_locale.value]: {} });
  const _numberFormats = ref(isPlainObject(options.numberFormats) ? options.numberFormats : { [_locale.value]: {} });
  let _missingWarn = __root ? __root.missingWarn : isBoolean(options.missingWarn) || isRegExp(options.missingWarn) ? options.missingWarn : true;
  let _fallbackWarn = __root ? __root.fallbackWarn : isBoolean(options.fallbackWarn) || isRegExp(options.fallbackWarn) ? options.fallbackWarn : true;
  let _fallbackRoot = __root ? __root.fallbackRoot : isBoolean(options.fallbackRoot) ? options.fallbackRoot : true;
  let _fallbackFormat = !!options.fallbackFormat;
  let _missing = isFunction(options.missing) ? options.missing : null;
  let _runtimeMissing = isFunction(options.missing) ? defineCoreMissingHandler(options.missing) : null;
  let _postTranslation = isFunction(options.postTranslation) ? options.postTranslation : null;
  let _warnHtmlMessage = isBoolean(options.warnHtmlMessage) ? options.warnHtmlMessage : true;
  let _escapeParameter = !!options.escapeParameter;
  const _modifiers = __root ? __root.modifiers : isPlainObject(options.modifiers) ? options.modifiers : {};
  let _pluralRules = options.pluralRules || __root && __root.pluralRules;
  let _context;
  function getCoreContext() {
    return createCoreContext({
      version: VERSION,
      locale: _locale.value,
      fallbackLocale: _fallbackLocale.value,
      messages: _messages.value,
      messageCompiler: function compileToFunction(source) {
        return (ctx) => {
          return ctx.normalize([source]);
        };
      },
      datetimeFormats: _datetimeFormats.value,
      numberFormats: _numberFormats.value,
      modifiers: _modifiers,
      pluralRules: _pluralRules,
      missing: _runtimeMissing === null ? void 0 : _runtimeMissing,
      missingWarn: _missingWarn,
      fallbackWarn: _fallbackWarn,
      fallbackFormat: _fallbackFormat,
      unresolving: true,
      postTranslation: _postTranslation === null ? void 0 : _postTranslation,
      warnHtmlMessage: _warnHtmlMessage,
      escapeParameter: _escapeParameter,
      __datetimeFormatters: isPlainObject(_context) ? _context.__datetimeFormatters : void 0,
      __numberFormatters: isPlainObject(_context) ? _context.__numberFormatters : void 0,
      __v_emitter: isPlainObject(_context) ? _context.__v_emitter : void 0,
      __meta: { framework: "vue" }
    });
  }
  _context = getCoreContext();
  updateFallbackLocale(_context, _locale.value, _fallbackLocale.value);
  function trackReactivityValues() {
    return [
      _locale.value,
      _fallbackLocale.value,
      _messages.value,
      _datetimeFormats.value,
      _numberFormats.value
    ];
  }
  const locale = computed({
    get: () => _locale.value,
    set: (val) => {
      _locale.value = val;
      _context.locale = _locale.value;
    }
  });
  const fallbackLocale = computed({
    get: () => _fallbackLocale.value,
    set: (val) => {
      _fallbackLocale.value = val;
      _context.fallbackLocale = _fallbackLocale.value;
      updateFallbackLocale(_context, _locale.value, val);
    }
  });
  const messages = computed(() => _messages.value);
  const datetimeFormats = computed(() => _datetimeFormats.value);
  const numberFormats = computed(() => _numberFormats.value);
  function getPostTranslationHandler() {
    return isFunction(_postTranslation) ? _postTranslation : null;
  }
  function setPostTranslationHandler(handler) {
    _postTranslation = handler;
    _context.postTranslation = handler;
  }
  function getMissingHandler() {
    return _missing;
  }
  function setMissingHandler(handler) {
    if (handler !== null) {
      _runtimeMissing = defineCoreMissingHandler(handler);
    }
    _missing = handler;
    _context.missing = _runtimeMissing;
  }
  function isResolvedTranslateMessage(type, arg) {
    return type !== "translate" || !!arg.resolvedMessage === false;
  }
  function wrapWithDeps(fn, argumentParser, warnType, fallbackSuccess, fallbackFail, successCondition) {
    trackReactivityValues();
    let ret;
    {
      try {
        setAdditionalMeta(getMetaInfo());
        ret = fn(_context);
      } finally {
        setAdditionalMeta(null);
      }
    }
    if (isNumber(ret) && ret === NOT_REOSLVED) {
      const [key, arg2] = argumentParser();
      if (__root && isString(key) && isResolvedTranslateMessage(warnType, arg2)) {
        if (_fallbackRoot && (isTranslateFallbackWarn(_fallbackWarn, key) || isTranslateMissingWarn(_missingWarn, key))) {
          warn(getWarnMessage(6, {
            key,
            type: warnType
          }));
        }
        {
          const { __v_emitter: emitter2 } = _context;
          if (emitter2 && _fallbackRoot) {
            emitter2.emit("fallback", {
              type: warnType,
              key,
              to: "global",
              groupId: `${warnType}:${key}`
            });
          }
        }
      }
      return __root && _fallbackRoot ? fallbackSuccess(__root) : fallbackFail(key);
    } else if (successCondition(ret)) {
      return ret;
    } else {
      throw createI18nError(
        14
        /* UNEXPECTED_RETURN_TYPE */
      );
    }
  }
  function t2(...args) {
    return wrapWithDeps((context) => translate(context, ...args), () => parseTranslateArgs(...args), "translate", (root) => root.t(...args), (key) => key, (val) => isString(val));
  }
  function rt(...args) {
    const [arg1, arg2, arg3] = args;
    if (arg3 && !isObject$1(arg3)) {
      throw createI18nError(
        15
        /* INVALID_ARGUMENT */
      );
    }
    return t2(...[arg1, arg2, assign$1({ resolvedMessage: true }, arg3 || {})]);
  }
  function d(...args) {
    return wrapWithDeps((context) => datetime(context, ...args), () => parseDateTimeArgs(...args), "datetime format", (root) => root.d(...args), () => MISSING_RESOLVE_VALUE, (val) => isString(val));
  }
  function n2(...args) {
    return wrapWithDeps((context) => number(context, ...args), () => parseNumberArgs(...args), "number format", (root) => root.n(...args), () => MISSING_RESOLVE_VALUE, (val) => isString(val));
  }
  function normalize(values) {
    return values.map((val) => isString(val) ? createVNode() : val);
  }
  const interpolate = (val) => val;
  const processor = {
    normalize,
    interpolate,
    type: "vnode"
  };
  function transrateVNode(...args) {
    return wrapWithDeps(
      (context) => {
        let ret;
        const _context2 = context;
        try {
          _context2.processor = processor;
          ret = translate(_context2, ...args);
        } finally {
          _context2.processor = null;
        }
        return ret;
      },
      () => parseTranslateArgs(...args),
      "translate",
      // eslint-disable-next-line @typescript-eslint/no-explicit-any
      (root) => root[TransrateVNodeSymbol](...args),
      (key) => [createVNode()],
      (val) => isArray(val)
    );
  }
  function numberParts(...args) {
    return wrapWithDeps(
      (context) => number(context, ...args),
      () => parseNumberArgs(...args),
      "number format",
      // eslint-disable-next-line @typescript-eslint/no-explicit-any
      (root) => root[NumberPartsSymbol](...args),
      () => [],
      (val) => isString(val) || isArray(val)
    );
  }
  function datetimeParts(...args) {
    return wrapWithDeps(
      (context) => datetime(context, ...args),
      () => parseDateTimeArgs(...args),
      "datetime format",
      // eslint-disable-next-line @typescript-eslint/no-explicit-any
      (root) => root[DatetimePartsSymbol](...args),
      () => [],
      (val) => isString(val) || isArray(val)
    );
  }
  function setPluralRules(rules) {
    _pluralRules = rules;
    _context.pluralRules = _pluralRules;
  }
  function te(key, locale2) {
    const targetLocale = isString(locale2) ? locale2 : _locale.value;
    const message = getLocaleMessage(targetLocale);
    return resolveValue(message, key) !== null;
  }
  function resolveMessages(key) {
    let messages2 = null;
    const locales = getLocaleChain(_context, _fallbackLocale.value, _locale.value);
    for (let i = 0; i < locales.length; i++) {
      const targetLocaleMessages = _messages.value[locales[i]] || {};
      const messageValue = resolveValue(targetLocaleMessages, key);
      if (messageValue != null) {
        messages2 = messageValue;
        break;
      }
    }
    return messages2;
  }
  function tm(key) {
    const messages2 = resolveMessages(key);
    return messages2 != null ? messages2 : __root ? __root.tm(key) || {} : {};
  }
  function getLocaleMessage(locale2) {
    return _messages.value[locale2] || {};
  }
  function setLocaleMessage(locale2, message) {
    _messages.value[locale2] = message;
    _context.messages = _messages.value;
  }
  function mergeLocaleMessage(locale2, message) {
    _messages.value[locale2] = _messages.value[locale2] || {};
    deepCopy(message, _messages.value[locale2]);
    _context.messages = _messages.value;
  }
  function getDateTimeFormat(locale2) {
    return _datetimeFormats.value[locale2] || {};
  }
  function setDateTimeFormat(locale2, format2) {
    _datetimeFormats.value[locale2] = format2;
    _context.datetimeFormats = _datetimeFormats.value;
    clearDateTimeFormat(_context, locale2, format2);
  }
  function mergeDateTimeFormat(locale2, format2) {
    _datetimeFormats.value[locale2] = assign$1(_datetimeFormats.value[locale2] || {}, format2);
    _context.datetimeFormats = _datetimeFormats.value;
    clearDateTimeFormat(_context, locale2, format2);
  }
  function getNumberFormat(locale2) {
    return _numberFormats.value[locale2] || {};
  }
  function setNumberFormat(locale2, format2) {
    _numberFormats.value[locale2] = format2;
    _context.numberFormats = _numberFormats.value;
    clearNumberFormat(_context, locale2, format2);
  }
  function mergeNumberFormat(locale2, format2) {
    _numberFormats.value[locale2] = assign$1(_numberFormats.value[locale2] || {}, format2);
    _context.numberFormats = _numberFormats.value;
    clearNumberFormat(_context, locale2, format2);
  }
  composerID++;
  if (__root) {
    watch(__root.locale, (val) => {
      if (_inheritLocale) {
        _locale.value = val;
        _context.locale = val;
        updateFallbackLocale(_context, _locale.value, _fallbackLocale.value);
      }
    });
    watch(__root.fallbackLocale, (val) => {
      if (_inheritLocale) {
        _fallbackLocale.value = val;
        _context.fallbackLocale = val;
        updateFallbackLocale(_context, _locale.value, _fallbackLocale.value);
      }
    });
  }
  const composer = {
    id: composerID,
    locale,
    fallbackLocale,
    get inheritLocale() {
      return _inheritLocale;
    },
    set inheritLocale(val) {
      _inheritLocale = val;
      if (val && __root) {
        _locale.value = __root.locale.value;
        _fallbackLocale.value = __root.fallbackLocale.value;
        updateFallbackLocale(_context, _locale.value, _fallbackLocale.value);
      }
    },
    get availableLocales() {
      return Object.keys(_messages.value).sort();
    },
    messages,
    datetimeFormats,
    numberFormats,
    get modifiers() {
      return _modifiers;
    },
    get pluralRules() {
      return _pluralRules || {};
    },
    get isGlobal() {
      return _isGlobal;
    },
    get missingWarn() {
      return _missingWarn;
    },
    set missingWarn(val) {
      _missingWarn = val;
      _context.missingWarn = _missingWarn;
    },
    get fallbackWarn() {
      return _fallbackWarn;
    },
    set fallbackWarn(val) {
      _fallbackWarn = val;
      _context.fallbackWarn = _fallbackWarn;
    },
    get fallbackRoot() {
      return _fallbackRoot;
    },
    set fallbackRoot(val) {
      _fallbackRoot = val;
    },
    get fallbackFormat() {
      return _fallbackFormat;
    },
    set fallbackFormat(val) {
      _fallbackFormat = val;
      _context.fallbackFormat = _fallbackFormat;
    },
    get warnHtmlMessage() {
      return _warnHtmlMessage;
    },
    set warnHtmlMessage(val) {
      _warnHtmlMessage = val;
      _context.warnHtmlMessage = val;
    },
    get escapeParameter() {
      return _escapeParameter;
    },
    set escapeParameter(val) {
      _escapeParameter = val;
      _context.escapeParameter = val;
    },
    t: t2,
    rt,
    d,
    n: n2,
    te,
    tm,
    getLocaleMessage,
    setLocaleMessage,
    mergeLocaleMessage,
    getDateTimeFormat,
    setDateTimeFormat,
    mergeDateTimeFormat,
    getNumberFormat,
    setNumberFormat,
    mergeNumberFormat,
    getPostTranslationHandler,
    setPostTranslationHandler,
    getMissingHandler,
    setMissingHandler,
    [TransrateVNodeSymbol]: transrateVNode,
    [NumberPartsSymbol]: numberParts,
    [DatetimePartsSymbol]: datetimeParts,
    [SetPluralRulesSymbol]: setPluralRules,
    [InejctWithOption]: options.__injectWithOption
    // eslint-disable-line @typescript-eslint/no-explicit-any
  };
  {
    composer[EnableEmitter] = (emitter2) => {
      _context.__v_emitter = emitter2;
    };
    composer[DisableEmitter] = () => {
      _context.__v_emitter = void 0;
    };
  }
  return composer;
}
function convertComposerOptions(options) {
  const locale = isString(options.locale) ? options.locale : "en-US";
  const fallbackLocale = isString(options.fallbackLocale) || isArray(options.fallbackLocale) || isPlainObject(options.fallbackLocale) || options.fallbackLocale === false ? options.fallbackLocale : locale;
  const missing = isFunction(options.missing) ? options.missing : void 0;
  const missingWarn = isBoolean(options.silentTranslationWarn) || isRegExp(options.silentTranslationWarn) ? !options.silentTranslationWarn : true;
  const fallbackWarn = isBoolean(options.silentFallbackWarn) || isRegExp(options.silentFallbackWarn) ? !options.silentFallbackWarn : true;
  const fallbackRoot = isBoolean(options.fallbackRoot) ? options.fallbackRoot : true;
  const fallbackFormat = !!options.formatFallbackMessages;
  const modifiers = isPlainObject(options.modifiers) ? options.modifiers : {};
  const pluralizationRules = options.pluralizationRules;
  const postTranslation = isFunction(options.postTranslation) ? options.postTranslation : void 0;
  const warnHtmlMessage = isString(options.warnHtmlInMessage) ? options.warnHtmlInMessage !== "off" : true;
  const escapeParameter = !!options.escapeParameterHtml;
  const inheritLocale = isBoolean(options.sync) ? options.sync : true;
  if (options.formatter) {
    warn(getWarnMessage(
      8
      /* NOT_SUPPORTED_FORMATTER */
    ));
  }
  if (options.preserveDirectiveContent) {
    warn(getWarnMessage(
      9
      /* NOT_SUPPORTED_PRESERVE_DIRECTIVE */
    ));
  }
  let messages = options.messages;
  if (isPlainObject(options.sharedMessages)) {
    const sharedMessages = options.sharedMessages;
    const locales = Object.keys(sharedMessages);
    messages = locales.reduce((messages2, locale2) => {
      const message = messages2[locale2] || (messages2[locale2] = {});
      assign$1(message, sharedMessages[locale2]);
      return messages2;
    }, messages || {});
  }
  const { __i18n, __root, __injectWithOption } = options;
  const datetimeFormats = options.datetimeFormats;
  const numberFormats = options.numberFormats;
  const flatJson = options.flatJson;
  return {
    locale,
    fallbackLocale,
    messages,
    flatJson,
    datetimeFormats,
    numberFormats,
    missing,
    missingWarn,
    fallbackWarn,
    fallbackRoot,
    fallbackFormat,
    modifiers,
    pluralRules: pluralizationRules,
    postTranslation,
    warnHtmlMessage,
    escapeParameter,
    inheritLocale,
    __i18n,
    __root,
    __injectWithOption
  };
}
function createVueI18n(options = {}) {
  const composer = createComposer(convertComposerOptions(options));
  const vueI18n = {
    // id
    id: composer.id,
    // locale
    get locale() {
      return composer.locale.value;
    },
    set locale(val) {
      composer.locale.value = val;
    },
    // fallbackLocale
    get fallbackLocale() {
      return composer.fallbackLocale.value;
    },
    set fallbackLocale(val) {
      composer.fallbackLocale.value = val;
    },
    // messages
    get messages() {
      return composer.messages.value;
    },
    // datetimeFormats
    get datetimeFormats() {
      return composer.datetimeFormats.value;
    },
    // numberFormats
    get numberFormats() {
      return composer.numberFormats.value;
    },
    // availableLocales
    get availableLocales() {
      return composer.availableLocales;
    },
    // formatter
    get formatter() {
      warn(getWarnMessage(
        8
        /* NOT_SUPPORTED_FORMATTER */
      ));
      return {
        interpolate() {
          return [];
        }
      };
    },
    set formatter(val) {
      warn(getWarnMessage(
        8
        /* NOT_SUPPORTED_FORMATTER */
      ));
    },
    // missing
    get missing() {
      return composer.getMissingHandler();
    },
    set missing(handler) {
      composer.setMissingHandler(handler);
    },
    // silentTranslationWarn
    get silentTranslationWarn() {
      return isBoolean(composer.missingWarn) ? !composer.missingWarn : composer.missingWarn;
    },
    set silentTranslationWarn(val) {
      composer.missingWarn = isBoolean(val) ? !val : val;
    },
    // silentFallbackWarn
    get silentFallbackWarn() {
      return isBoolean(composer.fallbackWarn) ? !composer.fallbackWarn : composer.fallbackWarn;
    },
    set silentFallbackWarn(val) {
      composer.fallbackWarn = isBoolean(val) ? !val : val;
    },
    // modifiers
    get modifiers() {
      return composer.modifiers;
    },
    // formatFallbackMessages
    get formatFallbackMessages() {
      return composer.fallbackFormat;
    },
    set formatFallbackMessages(val) {
      composer.fallbackFormat = val;
    },
    // postTranslation
    get postTranslation() {
      return composer.getPostTranslationHandler();
    },
    set postTranslation(handler) {
      composer.setPostTranslationHandler(handler);
    },
    // sync
    get sync() {
      return composer.inheritLocale;
    },
    set sync(val) {
      composer.inheritLocale = val;
    },
    // warnInHtmlMessage
    get warnHtmlInMessage() {
      return composer.warnHtmlMessage ? "warn" : "off";
    },
    set warnHtmlInMessage(val) {
      composer.warnHtmlMessage = val !== "off";
    },
    // escapeParameterHtml
    get escapeParameterHtml() {
      return composer.escapeParameter;
    },
    set escapeParameterHtml(val) {
      composer.escapeParameter = val;
    },
    // preserveDirectiveContent
    get preserveDirectiveContent() {
      warn(getWarnMessage(
        9
        /* NOT_SUPPORTED_PRESERVE_DIRECTIVE */
      ));
      return true;
    },
    set preserveDirectiveContent(val) {
      warn(getWarnMessage(
        9
        /* NOT_SUPPORTED_PRESERVE_DIRECTIVE */
      ));
    },
    // pluralizationRules
    get pluralizationRules() {
      return composer.pluralRules || {};
    },
    // for internal
    __composer: composer,
    // t
    t(...args) {
      const [arg1, arg2, arg3] = args;
      const options2 = {};
      let list = null;
      let named = null;
      if (!isString(arg1)) {
        throw createI18nError(
          15
          /* INVALID_ARGUMENT */
        );
      }
      const key = arg1;
      if (isString(arg2)) {
        options2.locale = arg2;
      } else if (isArray(arg2)) {
        list = arg2;
      } else if (isPlainObject(arg2)) {
        named = arg2;
      }
      if (isArray(arg3)) {
        list = arg3;
      } else if (isPlainObject(arg3)) {
        named = arg3;
      }
      return composer.t(key, list || named || {}, options2);
    },
    rt(...args) {
      return composer.rt(...args);
    },
    // tc
    tc(...args) {
      const [arg1, arg2, arg3] = args;
      const options2 = { plural: 1 };
      let list = null;
      let named = null;
      if (!isString(arg1)) {
        throw createI18nError(
          15
          /* INVALID_ARGUMENT */
        );
      }
      const key = arg1;
      if (isString(arg2)) {
        options2.locale = arg2;
      } else if (isNumber(arg2)) {
        options2.plural = arg2;
      } else if (isArray(arg2)) {
        list = arg2;
      } else if (isPlainObject(arg2)) {
        named = arg2;
      }
      if (isString(arg3)) {
        options2.locale = arg3;
      } else if (isArray(arg3)) {
        list = arg3;
      } else if (isPlainObject(arg3)) {
        named = arg3;
      }
      return composer.t(key, list || named || {}, options2);
    },
    // te
    te(key, locale) {
      return composer.te(key, locale);
    },
    // tm
    tm(key) {
      return composer.tm(key);
    },
    // getLocaleMessage
    getLocaleMessage(locale) {
      return composer.getLocaleMessage(locale);
    },
    // setLocaleMessage
    setLocaleMessage(locale, message) {
      composer.setLocaleMessage(locale, message);
    },
    // mergeLocaleMessage
    mergeLocaleMessage(locale, message) {
      composer.mergeLocaleMessage(locale, message);
    },
    // d
    d(...args) {
      return composer.d(...args);
    },
    // getDateTimeFormat
    getDateTimeFormat(locale) {
      return composer.getDateTimeFormat(locale);
    },
    // setDateTimeFormat
    setDateTimeFormat(locale, format2) {
      composer.setDateTimeFormat(locale, format2);
    },
    // mergeDateTimeFormat
    mergeDateTimeFormat(locale, format2) {
      composer.mergeDateTimeFormat(locale, format2);
    },
    // n
    n(...args) {
      return composer.n(...args);
    },
    // getNumberFormat
    getNumberFormat(locale) {
      return composer.getNumberFormat(locale);
    },
    // setNumberFormat
    setNumberFormat(locale, format2) {
      composer.setNumberFormat(locale, format2);
    },
    // mergeNumberFormat
    mergeNumberFormat(locale, format2) {
      composer.mergeNumberFormat(locale, format2);
    },
    // getChoiceIndex
    // eslint-disable-next-line @typescript-eslint/no-unused-vars
    getChoiceIndex(choice, choicesLength) {
      warn(getWarnMessage(
        10
        /* NOT_SUPPORTED_GET_CHOICE_INDEX */
      ));
      return -1;
    },
    // for internal
    __onComponentInstanceCreated(target) {
      const { componentInstanceCreatedListener } = options;
      if (componentInstanceCreatedListener) {
        componentInstanceCreatedListener(target, vueI18n);
      }
    }
  };
  {
    vueI18n.__enableEmitter = (emitter2) => {
      const __composer = composer;
      __composer[EnableEmitter] && __composer[EnableEmitter](emitter2);
    };
    vueI18n.__disableEmitter = () => {
      const __composer = composer;
      __composer[DisableEmitter] && __composer[DisableEmitter]();
    };
  }
  return vueI18n;
}
const baseFormatProps = {
  tag: {
    type: [String, Object]
  },
  locale: {
    type: String
  },
  scope: {
    type: String,
    validator: (val) => val === "parent" || val === "global",
    default: "parent"
  },
  i18n: {
    type: Object
  }
};
const Translation = {
  /* eslint-disable */
  name: "i18n-t",
  props: assign$1({
    keypath: {
      type: String,
      required: true
    },
    plural: {
      type: [Number, String],
      // eslint-disable-next-line @typescript-eslint/no-explicit-any
      validator: (val) => isNumber(val) || !isNaN(val)
    }
  }, baseFormatProps),
  /* eslint-enable */
  setup(props, context) {
    const { slots, attrs } = context;
    const i18n = props.i18n || useI18n({
      useScope: props.scope,
      __useComponent: true
    });
    const keys = Object.keys(slots).filter((key) => key !== "_");
    return () => {
      const options = {};
      if (props.locale) {
        options.locale = props.locale;
      }
      if (props.plural !== void 0) {
        options.plural = isString(props.plural) ? +props.plural : props.plural;
      }
      const arg = getInterpolateArg(context, keys);
      i18n[TransrateVNodeSymbol](props.keypath, arg, options);
      assign$1({}, attrs);
      return isString(props.tag) ? h(props.tag) : isObject$1(props.tag) ? h(props.tag) : h(Fragment);
    };
  }
};
function getInterpolateArg({ slots }, keys) {
  if (keys.length === 1 && keys[0] === "default") {
    return slots.default ? slots.default() : [];
  } else {
    return keys.reduce((arg, key) => {
      const slot = slots[key];
      if (slot) {
        arg[key] = slot();
      }
      return arg;
    }, {});
  }
}
function renderFormatter(props, context, slotKeys, partFormatter) {
  const { slots, attrs } = context;
  return () => {
    const options = { part: true };
    let overrides = {};
    if (props.locale) {
      options.locale = props.locale;
    }
    if (isString(props.format)) {
      options.key = props.format;
    } else if (isObject$1(props.format)) {
      if (isString(props.format.key)) {
        options.key = props.format.key;
      }
      overrides = Object.keys(props.format).reduce((options2, prop) => {
        return slotKeys.includes(prop) ? assign$1({}, options2, { [prop]: props.format[prop] }) : options2;
      }, {});
    }
    const parts = partFormatter(...[props.value, options, overrides]);
    [options.key];
    if (isArray(parts)) {
      parts.map((part, index2) => {
        const slot = slots[part.type];
        return slot ? slot({ [part.type]: part.value, index: index2, parts }) : [part.value];
      });
    }
    assign$1({}, attrs);
    return isString(props.tag) ? h(props.tag) : isObject$1(props.tag) ? h(props.tag) : h(Fragment);
  };
}
const NUMBER_FORMAT_KEYS = [
  "localeMatcher",
  "style",
  "unit",
  "unitDisplay",
  "currency",
  "currencyDisplay",
  "useGrouping",
  "numberingSystem",
  "minimumIntegerDigits",
  "minimumFractionDigits",
  "maximumFractionDigits",
  "minimumSignificantDigits",
  "maximumSignificantDigits",
  "notation",
  "formatMatcher"
];
const NumberFormat = {
  /* eslint-disable */
  name: "i18n-n",
  props: assign$1({
    value: {
      type: Number,
      required: true
    },
    format: {
      type: [String, Object]
    }
  }, baseFormatProps),
  /* eslint-enable */
  setup(props, context) {
    const i18n = props.i18n || useI18n({ useScope: "parent", __useComponent: true });
    return renderFormatter(props, context, NUMBER_FORMAT_KEYS, (...args) => (
      // eslint-disable-next-line @typescript-eslint/no-explicit-any
      i18n[NumberPartsSymbol](...args)
    ));
  }
};
const DATETIME_FORMAT_KEYS = [
  "dateStyle",
  "timeStyle",
  "fractionalSecondDigits",
  "calendar",
  "dayPeriod",
  "numberingSystem",
  "localeMatcher",
  "timeZone",
  "hour12",
  "hourCycle",
  "formatMatcher",
  "weekday",
  "era",
  "year",
  "month",
  "day",
  "hour",
  "minute",
  "second",
  "timeZoneName"
];
const DatetimeFormat = {
  /* eslint-disable */
  name: "i18n-d",
  props: assign$1({
    value: {
      type: [Number, Date],
      required: true
    },
    format: {
      type: [String, Object]
    }
  }, baseFormatProps),
  /* eslint-enable */
  setup(props, context) {
    const i18n = props.i18n || useI18n({ useScope: "parent", __useComponent: true });
    return renderFormatter(props, context, DATETIME_FORMAT_KEYS, (...args) => (
      // eslint-disable-next-line @typescript-eslint/no-explicit-any
      i18n[DatetimePartsSymbol](...args)
    ));
  }
};
function getComposer$2(i18n, instance) {
  const i18nInternal = i18n;
  if (i18n.mode === "composition") {
    return i18nInternal.__getInstance(instance) || i18n.global;
  } else {
    const vueI18n = i18nInternal.__getInstance(instance);
    return vueI18n != null ? vueI18n.__composer : i18n.global.__composer;
  }
}
function vTDirective(i18n) {
  const bind = (el, { instance, value, modifiers }) => {
    if (!instance || !instance.$) {
      throw createI18nError(
        22
        /* UNEXPECTED_ERROR */
      );
    }
    const composer = getComposer$2(i18n, instance.$);
    if (modifiers.preserve) {
      warn(getWarnMessage(
        7
        /* NOT_SUPPORTED_PRESERVE */
      ));
    }
    const parsedValue = parseValue(value);
    el.textContent = composer.t(...makeParams(parsedValue));
  };
  return {
    beforeMount: bind,
    beforeUpdate: bind
  };
}
function parseValue(value) {
  if (isString(value)) {
    return { path: value };
  } else if (isPlainObject(value)) {
    if (!("path" in value)) {
      throw createI18nError(19, "path");
    }
    return value;
  } else {
    throw createI18nError(
      20
      /* INVALID_VALUE */
    );
  }
}
function makeParams(value) {
  const { path, locale, args, choice, plural } = value;
  const options = {};
  const named = args || {};
  if (isString(locale)) {
    options.locale = locale;
  }
  if (isNumber(choice)) {
    options.plural = choice;
  }
  if (isNumber(plural)) {
    options.plural = plural;
  }
  return [path, named, options];
}
function apply(app, i18n, ...options) {
  const pluginOptions = isPlainObject(options[0]) ? options[0] : {};
  const useI18nComponentName = !!pluginOptions.useI18nComponentName;
  const globalInstall = isBoolean(pluginOptions.globalInstall) ? pluginOptions.globalInstall : true;
  if (globalInstall && useI18nComponentName) {
    warn(getWarnMessage(11, {
      name: Translation.name
    }));
  }
  if (globalInstall) {
    app.component(!useI18nComponentName ? Translation.name : "i18n", Translation);
    app.component(NumberFormat.name, NumberFormat);
    app.component(DatetimeFormat.name, DatetimeFormat);
  }
  app.directive("t", vTDirective(i18n));
}
const VUE_I18N_COMPONENT_TYPES = "vue-i18n: composer properties";
let devtoolsApi;
async function enableDevTools(app, i18n) {
  return new Promise((resolve2, reject) => {
    try {
      setupDevtoolsPlugin({
        id: "vue-devtools-plugin-vue-i18n",
        label: VueDevToolsLabels[
          "vue-devtools-plugin-vue-i18n"
          /* PLUGIN */
        ],
        packageName: "vue-i18n",
        homepage: "https://vue-i18n.intlify.dev",
        logo: "https://vue-i18n.intlify.dev/vue-i18n-devtools-logo.png",
        componentStateTypes: [VUE_I18N_COMPONENT_TYPES],
        app
      }, (api) => {
        devtoolsApi = api;
        api.on.visitComponentTree(({ componentInstance, treeNode }) => {
          updateComponentTreeTags(componentInstance, treeNode, i18n);
        });
        api.on.inspectComponent(({ componentInstance, instanceData }) => {
          if (componentInstance.vnode.el.__VUE_I18N__ && instanceData) {
            if (i18n.mode === "legacy") {
              if (componentInstance.vnode.el.__VUE_I18N__ !== i18n.global.__composer) {
                inspectComposer(instanceData, componentInstance.vnode.el.__VUE_I18N__);
              }
            } else {
              inspectComposer(instanceData, componentInstance.vnode.el.__VUE_I18N__);
            }
          }
        });
        api.addInspector({
          id: "vue-i18n-resource-inspector",
          label: VueDevToolsLabels[
            "vue-i18n-resource-inspector"
            /* CUSTOM_INSPECTOR */
          ],
          icon: "language",
          treeFilterPlaceholder: VueDevToolsPlaceholders[
            "vue-i18n-resource-inspector"
            /* CUSTOM_INSPECTOR */
          ]
        });
        api.on.getInspectorTree((payload) => {
          if (payload.app === app && payload.inspectorId === "vue-i18n-resource-inspector") {
            registerScope(payload, i18n);
          }
        });
        api.on.getInspectorState((payload) => {
          if (payload.app === app && payload.inspectorId === "vue-i18n-resource-inspector") {
            inspectScope(payload, i18n);
          }
        });
        api.on.editInspectorState((payload) => {
          if (payload.app === app && payload.inspectorId === "vue-i18n-resource-inspector") {
            editScope(payload, i18n);
          }
        });
        api.addTimelineLayer({
          id: "vue-i18n-timeline",
          label: VueDevToolsLabels[
            "vue-i18n-timeline"
            /* TIMELINE */
          ],
          color: VueDevToolsTimelineColors[
            "vue-i18n-timeline"
            /* TIMELINE */
          ]
        });
        resolve2(true);
      });
    } catch (e2) {
      console.error(e2);
      reject(false);
    }
  });
}
function updateComponentTreeTags(instance, treeNode, i18n) {
  const global2 = i18n.mode === "composition" ? i18n.global : i18n.global.__composer;
  if (instance && instance.vnode.el.__VUE_I18N__) {
    if (instance.vnode.el.__VUE_I18N__ !== global2) {
      const label = instance.type.name || instance.type.displayName || instance.type.__file;
      const tag = {
        label: `i18n (${label} Scope)`,
        textColor: 0,
        backgroundColor: 16764185
      };
      treeNode.tags.push(tag);
    }
  }
}
function inspectComposer(instanceData, composer) {
  const type = VUE_I18N_COMPONENT_TYPES;
  instanceData.state.push({
    type,
    key: "locale",
    editable: true,
    value: composer.locale.value
  });
  instanceData.state.push({
    type,
    key: "availableLocales",
    editable: false,
    value: composer.availableLocales
  });
  instanceData.state.push({
    type,
    key: "fallbackLocale",
    editable: true,
    value: composer.fallbackLocale.value
  });
  instanceData.state.push({
    type,
    key: "inheritLocale",
    editable: true,
    value: composer.inheritLocale
  });
  instanceData.state.push({
    type,
    key: "messages",
    editable: false,
    value: getLocaleMessageValue(composer.messages.value)
  });
  instanceData.state.push({
    type,
    key: "datetimeFormats",
    editable: false,
    value: composer.datetimeFormats.value
  });
  instanceData.state.push({
    type,
    key: "numberFormats",
    editable: false,
    value: composer.numberFormats.value
  });
}
function getLocaleMessageValue(messages) {
  const value = {};
  Object.keys(messages).forEach((key) => {
    const v = messages[key];
    if (isFunction(v) && "source" in v) {
      value[key] = getMessageFunctionDetails(v);
    } else if (isObject$1(v)) {
      value[key] = getLocaleMessageValue(v);
    } else {
      value[key] = v;
    }
  });
  return value;
}
const ESC = {
  "<": "&lt;",
  ">": "&gt;",
  '"': "&quot;",
  "&": "&amp;"
};
function escape(s2) {
  return s2.replace(/[<>"&]/g, escapeChar);
}
function escapeChar(a) {
  return ESC[a] || a;
}
function getMessageFunctionDetails(func) {
  const argString = func.source ? `("${escape(func.source)}")` : `(?)`;
  return {
    _custom: {
      type: "function",
      display: `<span>ƒ</span> ${argString}`
    }
  };
}
function registerScope(payload, i18n) {
  payload.rootNodes.push({
    id: "global",
    label: "Global Scope"
  });
  const global2 = i18n.mode === "composition" ? i18n.global : i18n.global.__composer;
  for (const [keyInstance, instance] of i18n.__instances) {
    const composer = i18n.mode === "composition" ? instance : instance.__composer;
    if (global2 === composer) {
      continue;
    }
    const label = keyInstance.type.name || keyInstance.type.displayName || keyInstance.type.__file;
    payload.rootNodes.push({
      id: composer.id.toString(),
      label: `${label} Scope`
    });
  }
}
function getComposer$1(nodeId, i18n) {
  if (nodeId === "global") {
    return i18n.mode === "composition" ? i18n.global : i18n.global.__composer;
  } else {
    const instance = Array.from(i18n.__instances.values()).find((item) => item.id.toString() === nodeId);
    if (instance) {
      return i18n.mode === "composition" ? instance : instance.__composer;
    } else {
      return null;
    }
  }
}
function inspectScope(payload, i18n) {
  const composer = getComposer$1(payload.nodeId, i18n);
  if (composer) {
    payload.state = makeScopeInspectState(composer);
  }
}
function makeScopeInspectState(composer) {
  const state = {};
  const localeType = "Locale related info";
  const localeStates = [
    {
      type: localeType,
      key: "locale",
      editable: true,
      value: composer.locale.value
    },
    {
      type: localeType,
      key: "fallbackLocale",
      editable: true,
      value: composer.fallbackLocale.value
    },
    {
      type: localeType,
      key: "availableLocales",
      editable: false,
      value: composer.availableLocales
    },
    {
      type: localeType,
      key: "inheritLocale",
      editable: true,
      value: composer.inheritLocale
    }
  ];
  state[localeType] = localeStates;
  const localeMessagesType = "Locale messages info";
  const localeMessagesStates = [
    {
      type: localeMessagesType,
      key: "messages",
      editable: false,
      value: getLocaleMessageValue(composer.messages.value)
    }
  ];
  state[localeMessagesType] = localeMessagesStates;
  const datetimeFormatsType = "Datetime formats info";
  const datetimeFormatsStates = [
    {
      type: datetimeFormatsType,
      key: "datetimeFormats",
      editable: false,
      value: composer.datetimeFormats.value
    }
  ];
  state[datetimeFormatsType] = datetimeFormatsStates;
  const numberFormatsType = "Datetime formats info";
  const numberFormatsStates = [
    {
      type: numberFormatsType,
      key: "numberFormats",
      editable: false,
      value: composer.numberFormats.value
    }
  ];
  state[numberFormatsType] = numberFormatsStates;
  return state;
}
function addTimelineEvent(event, payload) {
  if (devtoolsApi) {
    let groupId;
    if (payload && "groupId" in payload) {
      groupId = payload.groupId;
      delete payload.groupId;
    }
    devtoolsApi.addTimelineEvent({
      layerId: "vue-i18n-timeline",
      event: {
        title: event,
        groupId,
        time: Date.now(),
        meta: {},
        data: payload || {},
        logType: event === "compile-error" ? "error" : event === "fallback" || event === "missing" ? "warning" : "default"
      }
    });
  }
}
function editScope(payload, i18n) {
  const composer = getComposer$1(payload.nodeId, i18n);
  if (composer) {
    const [field] = payload.path;
    if (field === "locale" && isString(payload.state.value)) {
      composer.locale.value = payload.state.value;
    } else if (field === "fallbackLocale" && (isString(payload.state.value) || isArray(payload.state.value) || isObject$1(payload.state.value))) {
      composer.fallbackLocale.value = payload.state.value;
    } else if (field === "inheritLocale" && isBoolean(payload.state.value)) {
      composer.inheritLocale = payload.state.value;
    }
  }
}
function defineMixin(vuei18n, composer, i18n) {
  return {
    beforeCreate() {
      const instance = getCurrentInstance();
      if (!instance) {
        throw createI18nError(
          22
          /* UNEXPECTED_ERROR */
        );
      }
      const options = this.$options;
      if (options.i18n) {
        const optionsI18n = options.i18n;
        if (options.__i18n) {
          optionsI18n.__i18n = options.__i18n;
        }
        optionsI18n.__root = composer;
        if (this === this.$root) {
          this.$i18n = mergeToRoot(vuei18n, optionsI18n);
        } else {
          optionsI18n.__injectWithOption = true;
          this.$i18n = createVueI18n(optionsI18n);
        }
      } else if (options.__i18n) {
        if (this === this.$root) {
          this.$i18n = mergeToRoot(vuei18n, options);
        } else {
          this.$i18n = createVueI18n({
            __i18n: options.__i18n,
            __injectWithOption: true,
            __root: composer
          });
        }
      } else {
        this.$i18n = vuei18n;
      }
      vuei18n.__onComponentInstanceCreated(this.$i18n);
      i18n.__setInstance(instance, this.$i18n);
      this.$t = (...args) => this.$i18n.t(...args);
      this.$rt = (...args) => this.$i18n.rt(...args);
      this.$tc = (...args) => this.$i18n.tc(...args);
      this.$te = (key, locale) => this.$i18n.te(key, locale);
      this.$d = (...args) => this.$i18n.d(...args);
      this.$n = (...args) => this.$i18n.n(...args);
      this.$tm = (key) => this.$i18n.tm(key);
    },
    mounted() {
      {
        this.$el.__VUE_I18N__ = this.$i18n.__composer;
        const emitter2 = this.__v_emitter = createEmitter();
        const _vueI18n = this.$i18n;
        _vueI18n.__enableEmitter && _vueI18n.__enableEmitter(emitter2);
        emitter2.on("*", addTimelineEvent);
      }
    },
    beforeUnmount() {
      const instance = getCurrentInstance();
      if (!instance) {
        throw createI18nError(
          22
          /* UNEXPECTED_ERROR */
        );
      }
      {
        if (this.__v_emitter) {
          this.__v_emitter.off("*", addTimelineEvent);
          delete this.__v_emitter;
        }
        const _vueI18n = this.$i18n;
        _vueI18n.__disableEmitter && _vueI18n.__disableEmitter();
        delete this.$el.__VUE_I18N__;
      }
      delete this.$t;
      delete this.$rt;
      delete this.$tc;
      delete this.$te;
      delete this.$d;
      delete this.$n;
      delete this.$tm;
      i18n.__deleteInstance(instance);
      delete this.$i18n;
    }
  };
}
function mergeToRoot(root, options) {
  root.locale = options.locale || root.locale;
  root.fallbackLocale = options.fallbackLocale || root.fallbackLocale;
  root.missing = options.missing || root.missing;
  root.silentTranslationWarn = options.silentTranslationWarn || root.silentFallbackWarn;
  root.silentFallbackWarn = options.silentFallbackWarn || root.silentFallbackWarn;
  root.formatFallbackMessages = options.formatFallbackMessages || root.formatFallbackMessages;
  root.postTranslation = options.postTranslation || root.postTranslation;
  root.warnHtmlInMessage = options.warnHtmlInMessage || root.warnHtmlInMessage;
  root.escapeParameterHtml = options.escapeParameterHtml || root.escapeParameterHtml;
  root.sync = options.sync || root.sync;
  root.__composer[SetPluralRulesSymbol](options.pluralizationRules || root.pluralizationRules);
  const messages = getLocaleMessages(root.locale, {
    messages: options.messages,
    __i18n: options.__i18n
  });
  Object.keys(messages).forEach((locale) => root.mergeLocaleMessage(locale, messages[locale]));
  if (options.datetimeFormats) {
    Object.keys(options.datetimeFormats).forEach((locale) => root.mergeDateTimeFormat(locale, options.datetimeFormats[locale]));
  }
  if (options.numberFormats) {
    Object.keys(options.numberFormats).forEach((locale) => root.mergeNumberFormat(locale, options.numberFormats[locale]));
  }
  return root;
}
function createI18n(options = {}) {
  const __legacyMode = isBoolean(options.legacy) ? options.legacy : true;
  const __globalInjection = !!options.globalInjection;
  const __instances = /* @__PURE__ */ new Map();
  const __global = __legacyMode ? createVueI18n(options) : createComposer(options);
  const symbol = makeSymbol("vue-i18n");
  const i18n = {
    // mode
    get mode() {
      return __legacyMode ? "legacy" : "composition";
    },
    // install plugin
    async install(app, ...options2) {
      {
        app.__VUE_I18N__ = i18n;
      }
      app.__VUE_I18N_SYMBOL__ = symbol;
      app.provide(app.__VUE_I18N_SYMBOL__, i18n);
      if (!__legacyMode && __globalInjection) {
        injectGlobalFields(app, i18n.global);
      }
      {
        apply(app, i18n, ...options2);
      }
      if (__legacyMode) {
        app.mixin(defineMixin(__global, __global.__composer, i18n));
      }
      {
        const ret = await enableDevTools(app, i18n);
        if (!ret) {
          throw createI18nError(
            21
            /* CANNOT_SETUP_VUE_DEVTOOLS_PLUGIN */
          );
        }
        const emitter2 = createEmitter();
        if (__legacyMode) {
          const _vueI18n = __global;
          _vueI18n.__enableEmitter && _vueI18n.__enableEmitter(emitter2);
        } else {
          const _composer = __global;
          _composer[EnableEmitter] && _composer[EnableEmitter](emitter2);
        }
        emitter2.on("*", addTimelineEvent);
      }
    },
    // global accessor
    get global() {
      return __global;
    },
    // @internal
    __instances,
    // @internal
    __getInstance(component) {
      return __instances.get(component) || null;
    },
    // @internal
    __setInstance(component, instance) {
      __instances.set(component, instance);
    },
    // @internal
    __deleteInstance(component) {
      __instances.delete(component);
    }
  };
  return i18n;
}
function useI18n(options = {}) {
  const instance = getCurrentInstance();
  if (instance == null) {
    throw createI18nError(
      16
      /* MUST_BE_CALL_SETUP_TOP */
    );
  }
  if (!instance.appContext.app.__VUE_I18N_SYMBOL__) {
    throw createI18nError(
      17
      /* NOT_INSLALLED */
    );
  }
  const i18n = inject(instance.appContext.app.__VUE_I18N_SYMBOL__);
  if (!i18n) {
    throw createI18nError(
      22
      /* UNEXPECTED_ERROR */
    );
  }
  const global2 = i18n.mode === "composition" ? i18n.global : i18n.global.__composer;
  const scope = isEmptyObject(options) ? "__i18n" in instance.type ? "local" : "global" : !options.useScope ? "local" : options.useScope;
  if (scope === "global") {
    let messages = isObject$1(options.messages) ? options.messages : {};
    if ("__i18nGlobal" in instance.type) {
      messages = getLocaleMessages(global2.locale.value, {
        messages,
        __i18n: instance.type.__i18nGlobal
      });
    }
    const locales = Object.keys(messages);
    if (locales.length) {
      locales.forEach((locale) => {
        global2.mergeLocaleMessage(locale, messages[locale]);
      });
    }
    if (isObject$1(options.datetimeFormats)) {
      const locales2 = Object.keys(options.datetimeFormats);
      if (locales2.length) {
        locales2.forEach((locale) => {
          global2.mergeDateTimeFormat(locale, options.datetimeFormats[locale]);
        });
      }
    }
    if (isObject$1(options.numberFormats)) {
      const locales2 = Object.keys(options.numberFormats);
      if (locales2.length) {
        locales2.forEach((locale) => {
          global2.mergeNumberFormat(locale, options.numberFormats[locale]);
        });
      }
    }
    return global2;
  }
  if (scope === "parent") {
    let composer2 = getComposer(i18n, instance, options.__useComponent);
    if (composer2 == null) {
      {
        warn(getWarnMessage(
          12
          /* NOT_FOUND_PARENT_SCOPE */
        ));
      }
      composer2 = global2;
    }
    return composer2;
  }
  if (i18n.mode === "legacy") {
    throw createI18nError(
      18
      /* NOT_AVAILABLE_IN_LEGACY_MODE */
    );
  }
  const i18nInternal = i18n;
  let composer = i18nInternal.__getInstance(instance);
  if (composer == null) {
    const type = instance.type;
    const composerOptions = assign$1({}, options);
    if (type.__i18n) {
      composerOptions.__i18n = type.__i18n;
    }
    if (global2) {
      composerOptions.__root = global2;
    }
    composer = createComposer(composerOptions);
    setupLifeCycle(i18nInternal, instance, composer);
    i18nInternal.__setInstance(instance, composer);
  }
  return composer;
}
function getComposer(i18n, target, useComponent = false) {
  let composer = null;
  const root = target.root;
  let current = target.parent;
  while (current != null) {
    const i18nInternal = i18n;
    if (i18n.mode === "composition") {
      composer = i18nInternal.__getInstance(current);
    } else {
      const vueI18n = i18nInternal.__getInstance(current);
      if (vueI18n != null) {
        composer = vueI18n.__composer;
      }
      if (useComponent && composer && !composer[InejctWithOption]) {
        composer = null;
      }
    }
    if (composer != null) {
      break;
    }
    if (root === current) {
      break;
    }
    current = current.parent;
  }
  return composer;
}
function setupLifeCycle(i18n, target, composer) {
  let emitter2 = null;
  onMounted(() => {
    if (target.vnode.el) {
      target.vnode.el.__VUE_I18N__ = composer;
      emitter2 = createEmitter();
      const _composer = composer;
      _composer[EnableEmitter] && _composer[EnableEmitter](emitter2);
      emitter2.on("*", addTimelineEvent);
    }
  }, target);
  onUnmounted(() => {
    if (target.vnode.el && target.vnode.el.__VUE_I18N__) {
      emitter2 && emitter2.off("*", addTimelineEvent);
      const _composer = composer;
      _composer[DisableEmitter] && _composer[DisableEmitter]();
      delete target.vnode.el.__VUE_I18N__;
    }
    i18n.__deleteInstance(target);
  }, target);
}
const globalExportProps = [
  "locale",
  "fallbackLocale",
  "availableLocales"
];
const globalExportMethods = ["t", "rt", "d", "n", "tm"];
function injectGlobalFields(app, composer) {
  const i18n = /* @__PURE__ */ Object.create(null);
  globalExportProps.forEach((prop) => {
    const desc = Object.getOwnPropertyDescriptor(composer, prop);
    if (!desc) {
      throw createI18nError(
        22
        /* UNEXPECTED_ERROR */
      );
    }
    const wrap = isRef(desc.value) ? {
      get() {
        return desc.value.value;
      },
      // eslint-disable-next-line @typescript-eslint/no-explicit-any
      set(val) {
        desc.value.value = val;
      }
    } : {
      get() {
        return desc.get && desc.get();
      }
    };
    Object.defineProperty(i18n, prop, wrap);
  });
  app.config.globalProperties.$i18n = i18n;
  globalExportMethods.forEach((method) => {
    const desc = Object.getOwnPropertyDescriptor(composer, method);
    if (!desc || !desc.value) {
      throw createI18nError(
        22
        /* UNEXPECTED_ERROR */
      );
    }
    Object.defineProperty(app.config.globalProperties, `$${method}`, desc);
  });
}
{
  initFeatureFlags();
}
{
  const target = getGlobalThis();
  target.__INTLIFY__ = true;
  setDevToolsHook(target.__INTLIFY_DEVTOOLS_GLOBAL_HOOK__);
}
const createHook = (lifecycle) => (hook, target = getCurrentInstance()) => {
  !isInSSRComponentSetup && injectHook(lifecycle, hook, target);
};
const onShow = /* @__PURE__ */ createHook(ON_SHOW);
const onLoad = /* @__PURE__ */ createHook(ON_LOAD);
const onShareTimeline = /* @__PURE__ */ createHook(ON_SHARE_TIMELINE);
const onShareAppMessage = /* @__PURE__ */ createHook(ON_SHARE_APP_MESSAGE);
var config = {
  version: "v2.5.0-20230101",
  yAxisWidth: 15,
  xAxisHeight: 22,
  padding: [10, 10, 10, 10],
  rotate: false,
  fontSize: 13,
  fontColor: "#666666",
  dataPointShape: ["circle", "circle", "circle", "circle"],
  color: ["#1890FF", "#91CB74", "#FAC858", "#EE6666", "#73C0DE", "#3CA272", "#FC8452", "#9A60B4", "#ea7ccc"],
  linearColor: ["#0EE2F8", "#2BDCA8", "#FA7D8D", "#EB88E2", "#2AE3A0", "#0EE2F8", "#EB88E2", "#6773E3", "#F78A85"],
  pieChartLinePadding: 15,
  pieChartTextPadding: 5,
  titleFontSize: 20,
  subtitleFontSize: 15,
  radarLabelTextMargin: 13
};
var assign = function(target, ...varArgs) {
  if (target == null) {
    throw new TypeError("[uCharts] Cannot convert undefined or null to object");
  }
  if (!varArgs || varArgs.length <= 0) {
    return target;
  }
  function deepAssign(obj1, obj2) {
    for (let key in obj2) {
      obj1[key] = obj1[key] && obj1[key].toString() === "[object Object]" ? deepAssign(obj1[key], obj2[key]) : obj1[key] = obj2[key];
    }
    return obj1;
  }
  varArgs.forEach((val) => {
    target = deepAssign(target, val);
  });
  return target;
};
var util = {
  toFixed: function toFixed(num, limit) {
    limit = limit || 2;
    if (this.isFloat(num)) {
      num = num.toFixed(limit);
    }
    return num;
  },
  isFloat: function isFloat(num) {
    return num % 1 !== 0;
  },
  approximatelyEqual: function approximatelyEqual(num1, num2) {
    return Math.abs(num1 - num2) < 1e-10;
  },
  isSameSign: function isSameSign(num1, num2) {
    return Math.abs(num1) === num1 && Math.abs(num2) === num2 || Math.abs(num1) !== num1 && Math.abs(num2) !== num2;
  },
  isSameXCoordinateArea: function isSameXCoordinateArea(p1, p2) {
    return this.isSameSign(p1.x, p2.x);
  },
  isCollision: function isCollision(obj1, obj2) {
    obj1.end = {};
    obj1.end.x = obj1.start.x + obj1.width;
    obj1.end.y = obj1.start.y - obj1.height;
    obj2.end = {};
    obj2.end.x = obj2.start.x + obj2.width;
    obj2.end.y = obj2.start.y - obj2.height;
    var flag = obj2.start.x > obj1.end.x || obj2.end.x < obj1.start.x || obj2.end.y > obj1.start.y || obj2.start.y < obj1.end.y;
    return !flag;
  }
};
function hexToRgb(hexValue, opc) {
  var rgx = /^#?([a-f\d])([a-f\d])([a-f\d])$/i;
  var hex = hexValue.replace(rgx, function(m, r2, g2, b2) {
    return r2 + r2 + g2 + g2 + b2 + b2;
  });
  var rgb = /^#?([a-f\d]{2})([a-f\d]{2})([a-f\d]{2})$/i.exec(hex);
  var r = parseInt(rgb[1], 16);
  var g = parseInt(rgb[2], 16);
  var b = parseInt(rgb[3], 16);
  return "rgba(" + r + "," + g + "," + b + "," + opc + ")";
}
function findRange(num, type, limit) {
  if (isNaN(num)) {
    throw new Error("[uCharts] series数据需为Number格式");
  }
  limit = limit || 10;
  type = type ? type : "upper";
  var multiple = 1;
  while (limit < 1) {
    limit *= 10;
    multiple *= 10;
  }
  if (type === "upper") {
    num = Math.ceil(num * multiple);
  } else {
    num = Math.floor(num * multiple);
  }
  while (num % limit !== 0) {
    if (type === "upper") {
      if (num == num + 1) {
        break;
      }
      num++;
    } else {
      num--;
    }
  }
  return num / multiple;
}
function calCandleMA(dayArr, nameArr, colorArr, kdata) {
  let seriesTemp = [];
  for (let k = 0; k < dayArr.length; k++) {
    let seriesItem = {
      data: [],
      name: nameArr[k],
      color: colorArr[k]
    };
    for (let i = 0, len = kdata.length; i < len; i++) {
      if (i < dayArr[k]) {
        seriesItem.data.push(null);
        continue;
      }
      let sum = 0;
      for (let j = 0; j < dayArr[k]; j++) {
        sum += kdata[i - j][1];
      }
      seriesItem.data.push(+(sum / dayArr[k]).toFixed(3));
    }
    seriesTemp.push(seriesItem);
  }
  return seriesTemp;
}
function calValidDistance(self2, distance, chartData, config2, opts) {
  var dataChartAreaWidth = opts.width - opts.area[1] - opts.area[3];
  var dataChartWidth = chartData.eachSpacing * (opts.chartData.xAxisData.xAxisPoints.length - 1);
  if (opts.type == "mount" && opts.extra && opts.extra.mount && opts.extra.mount.widthRatio && opts.extra.mount.widthRatio > 1) {
    if (opts.extra.mount.widthRatio > 2)
      opts.extra.mount.widthRatio = 2;
    dataChartWidth += (opts.extra.mount.widthRatio - 1) * chartData.eachSpacing;
  }
  var validDistance = distance;
  if (distance >= 0) {
    validDistance = 0;
    self2.uevent.trigger("scrollLeft");
    self2.scrollOption.position = "left";
    opts.xAxis.scrollPosition = "left";
  } else if (Math.abs(distance) >= dataChartWidth - dataChartAreaWidth) {
    validDistance = dataChartAreaWidth - dataChartWidth;
    self2.uevent.trigger("scrollRight");
    self2.scrollOption.position = "right";
    opts.xAxis.scrollPosition = "right";
  } else {
    self2.scrollOption.position = distance;
    opts.xAxis.scrollPosition = distance;
  }
  return validDistance;
}
function isInAngleRange(angle, startAngle, endAngle) {
  function adjust(angle2) {
    while (angle2 < 0) {
      angle2 += 2 * Math.PI;
    }
    while (angle2 > 2 * Math.PI) {
      angle2 -= 2 * Math.PI;
    }
    return angle2;
  }
  angle = adjust(angle);
  startAngle = adjust(startAngle);
  endAngle = adjust(endAngle);
  if (startAngle > endAngle) {
    endAngle += 2 * Math.PI;
    if (angle < startAngle) {
      angle += 2 * Math.PI;
    }
  }
  return angle >= startAngle && angle <= endAngle;
}
function createCurveControlPoints(points, i) {
  function isNotMiddlePoint(points2, i2) {
    if (points2[i2 - 1] && points2[i2 + 1]) {
      return points2[i2].y >= Math.max(points2[i2 - 1].y, points2[i2 + 1].y) || points2[i2].y <= Math.min(
        points2[i2 - 1].y,
        points2[i2 + 1].y
      );
    } else {
      return false;
    }
  }
  function isNotMiddlePointX(points2, i2) {
    if (points2[i2 - 1] && points2[i2 + 1]) {
      return points2[i2].x >= Math.max(points2[i2 - 1].x, points2[i2 + 1].x) || points2[i2].x <= Math.min(
        points2[i2 - 1].x,
        points2[i2 + 1].x
      );
    } else {
      return false;
    }
  }
  var a = 0.2;
  var b = 0.2;
  var pAx = null;
  var pAy = null;
  var pBx = null;
  var pBy = null;
  if (i < 1) {
    pAx = points[0].x + (points[1].x - points[0].x) * a;
    pAy = points[0].y + (points[1].y - points[0].y) * a;
  } else {
    pAx = points[i].x + (points[i + 1].x - points[i - 1].x) * a;
    pAy = points[i].y + (points[i + 1].y - points[i - 1].y) * a;
  }
  if (i > points.length - 3) {
    var last = points.length - 1;
    pBx = points[last].x - (points[last].x - points[last - 1].x) * b;
    pBy = points[last].y - (points[last].y - points[last - 1].y) * b;
  } else {
    pBx = points[i + 1].x - (points[i + 2].x - points[i].x) * b;
    pBy = points[i + 1].y - (points[i + 2].y - points[i].y) * b;
  }
  if (isNotMiddlePoint(points, i + 1)) {
    pBy = points[i + 1].y;
  }
  if (isNotMiddlePoint(points, i)) {
    pAy = points[i].y;
  }
  if (isNotMiddlePointX(points, i + 1)) {
    pBx = points[i + 1].x;
  }
  if (isNotMiddlePointX(points, i)) {
    pAx = points[i].x;
  }
  if (pAy >= Math.max(points[i].y, points[i + 1].y) || pAy <= Math.min(points[i].y, points[i + 1].y)) {
    pAy = points[i].y;
  }
  if (pBy >= Math.max(points[i].y, points[i + 1].y) || pBy <= Math.min(points[i].y, points[i + 1].y)) {
    pBy = points[i + 1].y;
  }
  if (pAx >= Math.max(points[i].x, points[i + 1].x) || pAx <= Math.min(points[i].x, points[i + 1].x)) {
    pAx = points[i].x;
  }
  if (pBx >= Math.max(points[i].x, points[i + 1].x) || pBx <= Math.min(points[i].x, points[i + 1].x)) {
    pBx = points[i + 1].x;
  }
  return {
    ctrA: {
      x: pAx,
      y: pAy
    },
    ctrB: {
      x: pBx,
      y: pBy
    }
  };
}
function convertCoordinateOrigin(x, y, center) {
  return {
    x: center.x + x,
    y: center.y - y
  };
}
function avoidCollision(obj, target) {
  if (target) {
    while (util.isCollision(obj, target)) {
      if (obj.start.x > 0) {
        obj.start.y--;
      } else if (obj.start.x < 0) {
        obj.start.y++;
      } else {
        if (obj.start.y > 0) {
          obj.start.y++;
        } else {
          obj.start.y--;
        }
      }
    }
  }
  return obj;
}
function fixPieSeries(series, opts, config2) {
  let pieSeriesArr = [];
  if (series.length > 0 && series[0].data.constructor.toString().indexOf("Array") > -1) {
    opts._pieSeries_ = series;
    let oldseries = series[0].data;
    for (var i = 0; i < oldseries.length; i++) {
      oldseries[i].formatter = series[0].formatter;
      oldseries[i].data = oldseries[i].value;
      pieSeriesArr.push(oldseries[i]);
    }
    opts.series = pieSeriesArr;
  } else {
    pieSeriesArr = series;
  }
  return pieSeriesArr;
}
function fillSeries(series, opts, config2) {
  var index2 = 0;
  for (var i = 0; i < series.length; i++) {
    let item = series[i];
    if (!item.color) {
      item.color = config2.color[index2];
      index2 = (index2 + 1) % config2.color.length;
    }
    if (!item.linearIndex) {
      item.linearIndex = i;
    }
    if (!item.index) {
      item.index = 0;
    }
    if (!item.type) {
      item.type = opts.type;
    }
    if (typeof item.show == "undefined") {
      item.show = true;
    }
    if (!item.type) {
      item.type = opts.type;
    }
    if (!item.pointShape) {
      item.pointShape = "circle";
    }
    if (!item.legendShape) {
      switch (item.type) {
        case "line":
          item.legendShape = "line";
          break;
        case "column":
        case "bar":
          item.legendShape = "rect";
          break;
        case "area":
        case "mount":
          item.legendShape = "triangle";
          break;
        default:
          item.legendShape = "circle";
      }
    }
  }
  return series;
}
function fillCustomColor(linearType, customColor, series, config2) {
  var newcolor = customColor || [];
  if (linearType == "custom" && newcolor.length == 0) {
    newcolor = config2.linearColor;
  }
  if (linearType == "custom" && newcolor.length < series.length) {
    let chazhi = series.length - newcolor.length;
    for (var i = 0; i < chazhi; i++) {
      newcolor.push(config2.linearColor[(i + 1) % config2.linearColor.length]);
    }
  }
  return newcolor;
}
function getDataRange(minData, maxData) {
  var limit = 0;
  var range = maxData - minData;
  if (range >= 1e4) {
    limit = 1e3;
  } else if (range >= 1e3) {
    limit = 100;
  } else if (range >= 100) {
    limit = 10;
  } else if (range >= 10) {
    limit = 5;
  } else if (range >= 1) {
    limit = 1;
  } else if (range >= 0.1) {
    limit = 0.1;
  } else if (range >= 0.01) {
    limit = 0.01;
  } else if (range >= 1e-3) {
    limit = 1e-3;
  } else if (range >= 1e-4) {
    limit = 1e-4;
  } else if (range >= 1e-5) {
    limit = 1e-5;
  } else {
    limit = 1e-6;
  }
  return {
    minRange: findRange(minData, "lower", limit),
    maxRange: findRange(maxData, "upper", limit)
  };
}
function measureText(text, fontSize, context) {
  var width = 0;
  text = String(text);
  if (context !== false && context !== void 0 && context.setFontSize && context.measureText) {
    context.setFontSize(fontSize);
    return context.measureText(text).width;
  } else {
    var text = text.split("");
    for (let i = 0; i < text.length; i++) {
      let item = text[i];
      if (/[a-zA-Z]/.test(item)) {
        width += 7;
      } else if (/[0-9]/.test(item)) {
        width += 5.5;
      } else if (/\./.test(item)) {
        width += 2.7;
      } else if (/-/.test(item)) {
        width += 3.25;
      } else if (/:/.test(item)) {
        width += 2.5;
      } else if (/[\u4e00-\u9fa5]/.test(item)) {
        width += 10;
      } else if (/\(|\)/.test(item)) {
        width += 3.73;
      } else if (/\s/.test(item)) {
        width += 2.5;
      } else if (/%/.test(item)) {
        width += 8;
      } else {
        width += 10;
      }
    }
    return width * fontSize / 10;
  }
}
function dataCombine(series) {
  return series.reduce(function(a, b) {
    return (a.data ? a.data : a).concat(b.data);
  }, []);
}
function dataCombineStack(series, len) {
  var sum = new Array(len);
  for (var j = 0; j < sum.length; j++) {
    sum[j] = 0;
  }
  for (var i = 0; i < series.length; i++) {
    for (var j = 0; j < sum.length; j++) {
      sum[j] += series[i].data[j];
    }
  }
  return series.reduce(function(a, b) {
    return (a.data ? a.data : a).concat(b.data).concat(sum);
  }, []);
}
function getTouches(touches, opts, e2) {
  let x, y;
  if (touches.clientX) {
    if (opts.rotate) {
      y = opts.height - touches.clientX * opts.pix;
      x = (touches.pageY - e2.currentTarget.offsetTop - opts.height / opts.pix / 2 * (opts.pix - 1)) * opts.pix;
    } else {
      x = touches.clientX * opts.pix;
      y = (touches.pageY - e2.currentTarget.offsetTop - opts.height / opts.pix / 2 * (opts.pix - 1)) * opts.pix;
    }
  } else {
    if (opts.rotate) {
      y = opts.height - touches.x * opts.pix;
      x = touches.y * opts.pix;
    } else {
      x = touches.x * opts.pix;
      y = touches.y * opts.pix;
    }
  }
  return {
    x,
    y
  };
}
function getSeriesDataItem(series, index2, group) {
  var data = [];
  var newSeries = [];
  var indexIsArr = index2.constructor.toString().indexOf("Array") > -1;
  if (indexIsArr) {
    let tempSeries = filterSeries(series);
    for (var i = 0; i < group.length; i++) {
      newSeries.push(tempSeries[group[i]]);
    }
  } else {
    newSeries = series;
  }
  for (let i2 = 0; i2 < newSeries.length; i2++) {
    let item = newSeries[i2];
    let tmpindex = -1;
    if (indexIsArr) {
      tmpindex = index2[i2];
    } else {
      tmpindex = index2;
    }
    if (item.data[tmpindex] !== null && typeof item.data[tmpindex] !== "undefined" && item.show) {
      let seriesItem = {};
      seriesItem.color = item.color;
      seriesItem.type = item.type;
      seriesItem.style = item.style;
      seriesItem.pointShape = item.pointShape;
      seriesItem.disableLegend = item.disableLegend;
      seriesItem.legendShape = item.legendShape;
      seriesItem.name = item.name;
      seriesItem.show = item.show;
      seriesItem.data = item.formatter ? item.formatter(item.data[tmpindex]) : item.data[tmpindex];
      data.push(seriesItem);
    }
  }
  return data;
}
function getMaxTextListLength(list, fontSize, context) {
  var lengthList = list.map(function(item) {
    return measureText(item, fontSize, context);
  });
  return Math.max.apply(null, lengthList);
}
function getRadarCoordinateSeries(length) {
  var eachAngle = 2 * Math.PI / length;
  var CoordinateSeries = [];
  for (var i = 0; i < length; i++) {
    CoordinateSeries.push(eachAngle * i);
  }
  return CoordinateSeries.map(function(item) {
    return -1 * item + Math.PI / 2;
  });
}
function getToolTipData(seriesData, opts, index2, group, categories) {
  var option = arguments.length > 5 && arguments[5] !== void 0 ? arguments[5] : {};
  var calPoints = opts.chartData.calPoints ? opts.chartData.calPoints : [];
  let points = {};
  if (group.length > 0) {
    let filterPoints = [];
    for (let i = 0; i < group.length; i++) {
      filterPoints.push(calPoints[group[i]]);
    }
    points = filterPoints[0][index2[0]];
  } else {
    for (let i = 0; i < calPoints.length; i++) {
      if (calPoints[i][index2]) {
        points = calPoints[i][index2];
        break;
      }
    }
  }
  var textList = seriesData.map(function(item) {
    let titleText = null;
    if (opts.categories && opts.categories.length > 0) {
      titleText = categories[index2];
    }
    return {
      text: option.formatter ? option.formatter(item, titleText, index2, opts) : item.name + ": " + item.data,
      color: item.color,
      legendShape: opts.extra.tooltip.legendShape == "auto" ? item.legendShape : opts.extra.tooltip.legendShape
    };
  });
  var offset = {
    x: Math.round(points.x),
    y: Math.round(points.y)
  };
  return {
    textList,
    offset
  };
}
function getMixToolTipData(seriesData, opts, index2, categories) {
  var option = arguments.length > 4 && arguments[4] !== void 0 ? arguments[4] : {};
  var points = opts.chartData.xAxisPoints[index2] + opts.chartData.eachSpacing / 2;
  var textList = seriesData.map(function(item) {
    return {
      text: option.formatter ? option.formatter(item, categories[index2], index2, opts) : item.name + ": " + item.data,
      color: item.color,
      disableLegend: item.disableLegend ? true : false,
      legendShape: opts.extra.tooltip.legendShape == "auto" ? item.legendShape : opts.extra.tooltip.legendShape
    };
  });
  textList = textList.filter(function(item) {
    if (item.disableLegend !== true) {
      return item;
    }
  });
  var offset = {
    x: Math.round(points),
    y: 0
  };
  return {
    textList,
    offset
  };
}
function getCandleToolTipData(series, seriesData, opts, index2, categories, extra) {
  var calPoints = opts.chartData.calPoints;
  let upColor = extra.color.upFill;
  let downColor = extra.color.downFill;
  let color = [upColor, upColor, downColor, upColor];
  var textList = [];
  seriesData.map(function(item) {
    if (index2 == 0) {
      if (item.data[1] - item.data[0] < 0) {
        color[1] = downColor;
      } else {
        color[1] = upColor;
      }
    } else {
      if (item.data[0] < series[index2 - 1][1]) {
        color[0] = downColor;
      }
      if (item.data[1] < item.data[0]) {
        color[1] = downColor;
      }
      if (item.data[2] > series[index2 - 1][1]) {
        color[2] = upColor;
      }
      if (item.data[3] < series[index2 - 1][1]) {
        color[3] = downColor;
      }
    }
    let text1 = {
      text: "开盘：" + item.data[0],
      color: color[0],
      legendShape: opts.extra.tooltip.legendShape == "auto" ? item.legendShape : opts.extra.tooltip.legendShape
    };
    let text2 = {
      text: "收盘：" + item.data[1],
      color: color[1],
      legendShape: opts.extra.tooltip.legendShape == "auto" ? item.legendShape : opts.extra.tooltip.legendShape
    };
    let text3 = {
      text: "最低：" + item.data[2],
      color: color[2],
      legendShape: opts.extra.tooltip.legendShape == "auto" ? item.legendShape : opts.extra.tooltip.legendShape
    };
    let text4 = {
      text: "最高：" + item.data[3],
      color: color[3],
      legendShape: opts.extra.tooltip.legendShape == "auto" ? item.legendShape : opts.extra.tooltip.legendShape
    };
    textList.push(text1, text2, text3, text4);
  });
  var validCalPoints = [];
  var offset = {
    x: 0,
    y: 0
  };
  for (let i = 0; i < calPoints.length; i++) {
    let points = calPoints[i];
    if (typeof points[index2] !== "undefined" && points[index2] !== null) {
      validCalPoints.push(points[index2]);
    }
  }
  offset.x = Math.round(validCalPoints[0][0].x);
  return {
    textList,
    offset
  };
}
function filterSeries(series) {
  let tempSeries = [];
  for (let i = 0; i < series.length; i++) {
    if (series[i].show == true) {
      tempSeries.push(series[i]);
    }
  }
  return tempSeries;
}
function findCurrentIndex(currentPoints, calPoints, opts, config2) {
  var offset = arguments.length > 4 && arguments[4] !== void 0 ? arguments[4] : 0;
  var current = { index: -1, group: [] };
  var spacing = opts.chartData.eachSpacing / 2;
  let xAxisPoints = [];
  if (calPoints && calPoints.length > 0) {
    if (!opts.categories) {
      spacing = 0;
    } else {
      for (let i = 1; i < opts.chartData.xAxisPoints.length; i++) {
        xAxisPoints.push(opts.chartData.xAxisPoints[i] - spacing);
      }
      if ((opts.type == "line" || opts.type == "area") && opts.xAxis.boundaryGap == "justify") {
        xAxisPoints = opts.chartData.xAxisPoints;
      }
    }
    if (isInExactChartArea(currentPoints, opts)) {
      if (!opts.categories) {
        let timePoints = Array(calPoints.length);
        for (let i = 0; i < calPoints.length; i++) {
          timePoints[i] = Array(calPoints[i].length);
          for (let j = 0; j < calPoints[i].length; j++) {
            timePoints[i][j] = Math.abs(calPoints[i][j].x - currentPoints.x);
          }
        }
        let pointValue = Array(timePoints.length);
        let pointIndex = Array(timePoints.length);
        for (let i = 0; i < timePoints.length; i++) {
          pointValue[i] = Math.min.apply(null, timePoints[i]);
          pointIndex[i] = timePoints[i].indexOf(pointValue[i]);
        }
        let minValue = Math.min.apply(null, pointValue);
        current.index = [];
        for (let i = 0; i < pointValue.length; i++) {
          if (pointValue[i] == minValue) {
            current.group.push(i);
            current.index.push(pointIndex[i]);
          }
        }
      } else {
        xAxisPoints.forEach(function(item, index2) {
          if (currentPoints.x + offset + spacing > item) {
            current.index = index2;
          }
        });
      }
    }
  }
  return current;
}
function findBarChartCurrentIndex(currentPoints, calPoints, opts, config2) {
  var offset = arguments.length > 4 && arguments[4] !== void 0 ? arguments[4] : 0;
  var current = { index: -1, group: [] };
  var spacing = opts.chartData.eachSpacing / 2;
  let yAxisPoints = opts.chartData.yAxisPoints;
  if (calPoints && calPoints.length > 0) {
    if (isInExactChartArea(currentPoints, opts)) {
      yAxisPoints.forEach(function(item, index2) {
        if (currentPoints.y + offset + spacing > item) {
          current.index = index2;
        }
      });
    }
  }
  return current;
}
function findLegendIndex(currentPoints, legendData, opts) {
  let currentIndex = -1;
  let gap = 0;
  if (isInExactLegendArea(currentPoints, legendData.area)) {
    let points = legendData.points;
    let index2 = -1;
    for (let i = 0, len = points.length; i < len; i++) {
      let item = points[i];
      for (let j = 0; j < item.length; j++) {
        index2 += 1;
        let area = item[j]["area"];
        if (area && currentPoints.x > area[0] - gap && currentPoints.x < area[2] + gap && currentPoints.y > area[1] - gap && currentPoints.y < area[3] + gap) {
          currentIndex = index2;
          break;
        }
      }
    }
    return currentIndex;
  }
  return currentIndex;
}
function isInExactLegendArea(currentPoints, area) {
  return currentPoints.x > area.start.x && currentPoints.x < area.end.x && currentPoints.y > area.start.y && currentPoints.y < area.end.y;
}
function isInExactChartArea(currentPoints, opts, config2) {
  return currentPoints.x <= opts.width - opts.area[1] + 10 && currentPoints.x >= opts.area[3] - 10 && currentPoints.y >= opts.area[0] && currentPoints.y <= opts.height - opts.area[2];
}
function findRadarChartCurrentIndex(currentPoints, radarData, count) {
  var eachAngleArea = 2 * Math.PI / count;
  var currentIndex = -1;
  if (isInExactPieChartArea(currentPoints, radarData.center, radarData.radius)) {
    var fixAngle = function fixAngle2(angle2) {
      if (angle2 < 0) {
        angle2 += 2 * Math.PI;
      }
      if (angle2 > 2 * Math.PI) {
        angle2 -= 2 * Math.PI;
      }
      return angle2;
    };
    var angle = Math.atan2(radarData.center.y - currentPoints.y, currentPoints.x - radarData.center.x);
    angle = -1 * angle;
    if (angle < 0) {
      angle += 2 * Math.PI;
    }
    var angleList = radarData.angleList.map(function(item) {
      item = fixAngle(-1 * item);
      return item;
    });
    angleList.forEach(function(item, index2) {
      var rangeStart = fixAngle(item - eachAngleArea / 2);
      var rangeEnd = fixAngle(item + eachAngleArea / 2);
      if (rangeEnd < rangeStart) {
        rangeEnd += 2 * Math.PI;
      }
      if (angle >= rangeStart && angle <= rangeEnd || angle + 2 * Math.PI >= rangeStart && angle + 2 * Math.PI <= rangeEnd) {
        currentIndex = index2;
      }
    });
  }
  return currentIndex;
}
function findFunnelChartCurrentIndex(currentPoints, funnelData) {
  var currentIndex = -1;
  for (var i = 0, len = funnelData.series.length; i < len; i++) {
    var item = funnelData.series[i];
    if (currentPoints.x > item.funnelArea[0] && currentPoints.x < item.funnelArea[2] && currentPoints.y > item.funnelArea[1] && currentPoints.y < item.funnelArea[3]) {
      currentIndex = i;
      break;
    }
  }
  return currentIndex;
}
function findWordChartCurrentIndex(currentPoints, wordData) {
  var currentIndex = -1;
  for (var i = 0, len = wordData.length; i < len; i++) {
    var item = wordData[i];
    if (currentPoints.x > item.area[0] && currentPoints.x < item.area[2] && currentPoints.y > item.area[1] && currentPoints.y < item.area[3]) {
      currentIndex = i;
      break;
    }
  }
  return currentIndex;
}
function findMapChartCurrentIndex(currentPoints, opts) {
  var currentIndex = -1;
  var cData = opts.chartData.mapData;
  var data = opts.series;
  var tmp = pointToCoordinate(currentPoints.y, currentPoints.x, cData.bounds, cData.scale, cData.xoffset, cData.yoffset);
  var poi = [tmp.x, tmp.y];
  for (var i = 0, len = data.length; i < len; i++) {
    var item = data[i].geometry.coordinates;
    if (isPoiWithinPoly(poi, item, opts.chartData.mapData.mercator)) {
      currentIndex = i;
      break;
    }
  }
  return currentIndex;
}
function findRoseChartCurrentIndex(currentPoints, pieData, opts) {
  var currentIndex = -1;
  var series = getRoseDataPoints(opts._series_, opts.extra.rose.type, pieData.radius, pieData.radius);
  if (pieData && pieData.center && isInExactPieChartArea(currentPoints, pieData.center, pieData.radius)) {
    var angle = Math.atan2(pieData.center.y - currentPoints.y, currentPoints.x - pieData.center.x);
    angle = -angle;
    if (opts.extra.rose && opts.extra.rose.offsetAngle) {
      angle = angle - opts.extra.rose.offsetAngle * Math.PI / 180;
    }
    for (var i = 0, len = series.length; i < len; i++) {
      if (isInAngleRange(angle, series[i]._start_, series[i]._start_ + series[i]._rose_proportion_ * 2 * Math.PI)) {
        currentIndex = i;
        break;
      }
    }
  }
  return currentIndex;
}
function findPieChartCurrentIndex(currentPoints, pieData, opts) {
  var currentIndex = -1;
  var series = getPieDataPoints(pieData.series);
  if (pieData && pieData.center && isInExactPieChartArea(currentPoints, pieData.center, pieData.radius)) {
    var angle = Math.atan2(pieData.center.y - currentPoints.y, currentPoints.x - pieData.center.x);
    angle = -angle;
    if (opts.extra.pie && opts.extra.pie.offsetAngle) {
      angle = angle - opts.extra.pie.offsetAngle * Math.PI / 180;
    }
    if (opts.extra.ring && opts.extra.ring.offsetAngle) {
      angle = angle - opts.extra.ring.offsetAngle * Math.PI / 180;
    }
    for (var i = 0, len = series.length; i < len; i++) {
      if (isInAngleRange(angle, series[i]._start_, series[i]._start_ + series[i]._proportion_ * 2 * Math.PI)) {
        currentIndex = i;
        break;
      }
    }
  }
  return currentIndex;
}
function isInExactPieChartArea(currentPoints, center, radius) {
  return Math.pow(currentPoints.x - center.x, 2) + Math.pow(currentPoints.y - center.y, 2) <= Math.pow(radius, 2);
}
function splitPoints(points, eachSeries) {
  var newPoints = [];
  var items = [];
  points.forEach(function(item, index2) {
    if (eachSeries.connectNulls) {
      if (item !== null) {
        items.push(item);
      }
    } else {
      if (item !== null) {
        items.push(item);
      } else {
        if (items.length) {
          newPoints.push(items);
        }
        items = [];
      }
    }
  });
  if (items.length) {
    newPoints.push(items);
  }
  return newPoints;
}
function calLegendData(series, opts, config2, chartData, context) {
  let legendData = {
    area: {
      start: {
        x: 0,
        y: 0
      },
      end: {
        x: 0,
        y: 0
      },
      width: 0,
      height: 0,
      wholeWidth: 0,
      wholeHeight: 0
    },
    points: [],
    widthArr: [],
    heightArr: []
  };
  if (opts.legend.show === false) {
    chartData.legendData = legendData;
    return legendData;
  }
  let padding = opts.legend.padding * opts.pix;
  let margin = opts.legend.margin * opts.pix;
  let fontSize = opts.legend.fontSize ? opts.legend.fontSize * opts.pix : config2.fontSize;
  let shapeWidth = 15 * opts.pix;
  let shapeRight = 5 * opts.pix;
  let lineHeight = Math.max(opts.legend.lineHeight * opts.pix, fontSize);
  if (opts.legend.position == "top" || opts.legend.position == "bottom") {
    let legendList = [];
    let widthCount = 0;
    let widthCountArr = [];
    let currentRow = [];
    for (let i = 0; i < series.length; i++) {
      let item = series[i];
      const legendText = item.legendText ? item.legendText : item.name;
      let itemWidth = shapeWidth + shapeRight + measureText(legendText || "undefined", fontSize, context) + opts.legend.itemGap * opts.pix;
      if (widthCount + itemWidth > opts.width - opts.area[1] - opts.area[3]) {
        legendList.push(currentRow);
        widthCountArr.push(widthCount - opts.legend.itemGap * opts.pix);
        widthCount = itemWidth;
        currentRow = [item];
      } else {
        widthCount += itemWidth;
        currentRow.push(item);
      }
    }
    if (currentRow.length) {
      legendList.push(currentRow);
      widthCountArr.push(widthCount - opts.legend.itemGap * opts.pix);
      legendData.widthArr = widthCountArr;
      let legendWidth = Math.max.apply(null, widthCountArr);
      switch (opts.legend.float) {
        case "left":
          legendData.area.start.x = opts.area[3];
          legendData.area.end.x = opts.area[3] + legendWidth + 2 * padding;
          break;
        case "right":
          legendData.area.start.x = opts.width - opts.area[1] - legendWidth - 2 * padding;
          legendData.area.end.x = opts.width - opts.area[1];
          break;
        default:
          legendData.area.start.x = (opts.width - legendWidth) / 2 - padding;
          legendData.area.end.x = (opts.width + legendWidth) / 2 + padding;
      }
      legendData.area.width = legendWidth + 2 * padding;
      legendData.area.wholeWidth = legendWidth + 2 * padding;
      legendData.area.height = legendList.length * lineHeight + 2 * padding;
      legendData.area.wholeHeight = legendList.length * lineHeight + 2 * padding + 2 * margin;
      legendData.points = legendList;
    }
  } else {
    let len = series.length;
    let maxHeight = opts.height - opts.area[0] - opts.area[2] - 2 * margin - 2 * padding;
    let maxLength = Math.min(Math.floor(maxHeight / lineHeight), len);
    legendData.area.height = maxLength * lineHeight + padding * 2;
    legendData.area.wholeHeight = maxLength * lineHeight + padding * 2;
    switch (opts.legend.float) {
      case "top":
        legendData.area.start.y = opts.area[0] + margin;
        legendData.area.end.y = opts.area[0] + margin + legendData.area.height;
        break;
      case "bottom":
        legendData.area.start.y = opts.height - opts.area[2] - margin - legendData.area.height;
        legendData.area.end.y = opts.height - opts.area[2] - margin;
        break;
      default:
        legendData.area.start.y = (opts.height - legendData.area.height) / 2;
        legendData.area.end.y = (opts.height + legendData.area.height) / 2;
    }
    let lineNum = len % maxLength === 0 ? len / maxLength : Math.floor(len / maxLength + 1);
    let currentRow = [];
    for (let i = 0; i < lineNum; i++) {
      let temp = series.slice(i * maxLength, i * maxLength + maxLength);
      currentRow.push(temp);
    }
    legendData.points = currentRow;
    if (currentRow.length) {
      for (let i = 0; i < currentRow.length; i++) {
        let item = currentRow[i];
        let maxWidth = 0;
        for (let j = 0; j < item.length; j++) {
          let itemWidth = shapeWidth + shapeRight + measureText(item[j].name || "undefined", fontSize, context) + opts.legend.itemGap * opts.pix;
          if (itemWidth > maxWidth) {
            maxWidth = itemWidth;
          }
        }
        legendData.widthArr.push(maxWidth);
        legendData.heightArr.push(item.length * lineHeight + padding * 2);
      }
      let legendWidth = 0;
      for (let i = 0; i < legendData.widthArr.length; i++) {
        legendWidth += legendData.widthArr[i];
      }
      legendData.area.width = legendWidth - opts.legend.itemGap * opts.pix + 2 * padding;
      legendData.area.wholeWidth = legendData.area.width + padding;
    }
  }
  switch (opts.legend.position) {
    case "top":
      legendData.area.start.y = opts.area[0] + margin;
      legendData.area.end.y = opts.area[0] + margin + legendData.area.height;
      break;
    case "bottom":
      legendData.area.start.y = opts.height - opts.area[2] - legendData.area.height - margin;
      legendData.area.end.y = opts.height - opts.area[2] - margin;
      break;
    case "left":
      legendData.area.start.x = opts.area[3];
      legendData.area.end.x = opts.area[3] + legendData.area.width;
      break;
    case "right":
      legendData.area.start.x = opts.width - opts.area[1] - legendData.area.width;
      legendData.area.end.x = opts.width - opts.area[1];
      break;
  }
  chartData.legendData = legendData;
  return legendData;
}
function calCategoriesData(categories, opts, config2, eachSpacing, context) {
  var result = {
    angle: 0,
    xAxisHeight: opts.xAxis.lineHeight * opts.pix + opts.xAxis.marginTop * opts.pix
  };
  var fontSize = opts.xAxis.fontSize * opts.pix;
  var categoriesTextLenth = categories.map(function(item, index2) {
    var xitem = opts.xAxis.formatter ? opts.xAxis.formatter(item, index2, opts) : item;
    return measureText(String(xitem), fontSize, context);
  });
  var maxTextLength = Math.max.apply(this, categoriesTextLenth);
  if (opts.xAxis.rotateLabel == true) {
    result.angle = opts.xAxis.rotateAngle * Math.PI / 180;
    let tempHeight = opts.xAxis.marginTop * opts.pix * 2 + Math.abs(maxTextLength * Math.sin(result.angle));
    tempHeight = tempHeight < fontSize + opts.xAxis.marginTop * opts.pix * 2 ? tempHeight + opts.xAxis.marginTop * opts.pix * 2 : tempHeight;
    result.xAxisHeight = tempHeight;
  }
  if (opts.enableScroll && opts.xAxis.scrollShow) {
    result.xAxisHeight += 6 * opts.pix;
  }
  if (opts.xAxis.disabled) {
    result.xAxisHeight = 0;
  }
  return result;
}
function getXAxisTextList(series, opts, config2, stack2) {
  var index2 = arguments.length > 4 && arguments[4] !== void 0 ? arguments[4] : -1;
  var data;
  if (stack2 == "stack") {
    data = dataCombineStack(series, opts.categories.length);
  } else {
    data = dataCombine(series);
  }
  var sorted = [];
  data = data.filter(function(item) {
    if (typeof item === "object" && item !== null) {
      if (item.constructor.toString().indexOf("Array") > -1) {
        return item !== null;
      } else {
        return item.value !== null;
      }
    } else {
      return item !== null;
    }
  });
  data.map(function(item) {
    if (typeof item === "object") {
      if (item.constructor.toString().indexOf("Array") > -1) {
        if (opts.type == "candle") {
          item.map(function(subitem) {
            sorted.push(subitem);
          });
        } else {
          sorted.push(item[0]);
        }
      } else {
        sorted.push(item.value);
      }
    } else {
      sorted.push(item);
    }
  });
  var minData = 0;
  var maxData = 0;
  if (sorted.length > 0) {
    minData = Math.min.apply(this, sorted);
    maxData = Math.max.apply(this, sorted);
  }
  if (index2 > -1) {
    if (typeof opts.xAxis.data[index2].min === "number") {
      minData = Math.min(opts.xAxis.data[index2].min, minData);
    }
    if (typeof opts.xAxis.data[index2].max === "number") {
      maxData = Math.max(opts.xAxis.data[index2].max, maxData);
    }
  } else {
    if (typeof opts.xAxis.min === "number") {
      minData = Math.min(opts.xAxis.min, minData);
    }
    if (typeof opts.xAxis.max === "number") {
      maxData = Math.max(opts.xAxis.max, maxData);
    }
  }
  if (minData === maxData) {
    var rangeSpan = maxData || 10;
    maxData += rangeSpan;
  }
  var minRange = minData;
  var maxRange = maxData;
  var range = [];
  var eachRange = (maxRange - minRange) / opts.xAxis.splitNumber;
  for (var i = 0; i <= opts.xAxis.splitNumber; i++) {
    range.push(minRange + eachRange * i);
  }
  return range;
}
function calXAxisData(series, opts, config2, context) {
  var columnstyle = assign({}, {
    type: ""
  }, opts.extra.bar);
  var result = {
    angle: 0,
    xAxisHeight: opts.xAxis.lineHeight * opts.pix + opts.xAxis.marginTop * opts.pix
  };
  result.ranges = getXAxisTextList(series, opts, config2, columnstyle.type);
  result.rangesFormat = result.ranges.map(function(item) {
    item = util.toFixed(item, 2);
    return item;
  });
  var xAxisScaleValues = result.ranges.map(function(item) {
    item = util.toFixed(item, 2);
    return item;
  });
  result = Object.assign(result, getXAxisPoints(xAxisScaleValues, opts));
  result.eachSpacing;
  xAxisScaleValues.map(function(item) {
    return measureText(item, opts.xAxis.fontSize * opts.pix, context);
  });
  if (opts.xAxis.disabled === true) {
    result.xAxisHeight = 0;
  }
  return result;
}
function getRadarDataPoints(angleList, center, radius, series, opts) {
  var process = arguments.length > 5 && arguments[5] !== void 0 ? arguments[5] : 1;
  var radarOption = opts.extra.radar || {};
  radarOption.max = radarOption.max || 0;
  var maxData = Math.max(radarOption.max, Math.max.apply(null, dataCombine(series)));
  var data = [];
  for (let i = 0; i < series.length; i++) {
    let each = series[i];
    let listItem = {};
    listItem.color = each.color;
    listItem.legendShape = each.legendShape;
    listItem.pointShape = each.pointShape;
    listItem.data = [];
    each.data.forEach(function(item, index2) {
      let tmp = {};
      tmp.angle = angleList[index2];
      tmp.proportion = item / maxData;
      tmp.value = item;
      tmp.position = convertCoordinateOrigin(radius * tmp.proportion * process * Math.cos(tmp.angle), radius * tmp.proportion * process * Math.sin(tmp.angle), center);
      listItem.data.push(tmp);
    });
    data.push(listItem);
  }
  return data;
}
function getPieDataPoints(series, radius) {
  var process = arguments.length > 2 && arguments[2] !== void 0 ? arguments[2] : 1;
  var count = 0;
  var _start_ = 0;
  for (let i = 0; i < series.length; i++) {
    let item = series[i];
    item.data = item.data === null ? 0 : item.data;
    count += item.data;
  }
  for (let i = 0; i < series.length; i++) {
    let item = series[i];
    item.data = item.data === null ? 0 : item.data;
    if (count === 0) {
      item._proportion_ = 1 / series.length * process;
    } else {
      item._proportion_ = item.data / count * process;
    }
    item._radius_ = radius;
  }
  for (let i = 0; i < series.length; i++) {
    let item = series[i];
    item._start_ = _start_;
    _start_ += 2 * item._proportion_ * Math.PI;
  }
  return series;
}
function getFunnelDataPoints(series, radius, option, eachSpacing) {
  var process = arguments.length > 4 && arguments[4] !== void 0 ? arguments[4] : 1;
  for (let i = 0; i < series.length; i++) {
    if (option.type == "funnel") {
      series[i].radius = series[i].data / series[0].data * radius * process;
    } else {
      series[i].radius = eachSpacing * (series.length - i) / (eachSpacing * series.length) * radius * process;
    }
    series[i]._proportion_ = series[i].data / series[0].data;
  }
  return series;
}
function getRoseDataPoints(series, type, minRadius, radius) {
  var process = arguments.length > 4 && arguments[4] !== void 0 ? arguments[4] : 1;
  var count = 0;
  var _start_ = 0;
  var dataArr = [];
  for (let i = 0; i < series.length; i++) {
    let item = series[i];
    item.data = item.data === null ? 0 : item.data;
    count += item.data;
    dataArr.push(item.data);
  }
  var minData = Math.min.apply(null, dataArr);
  var maxData = Math.max.apply(null, dataArr);
  var radiusLength = radius - minRadius;
  for (let i = 0; i < series.length; i++) {
    let item = series[i];
    item.data = item.data === null ? 0 : item.data;
    if (count === 0) {
      item._proportion_ = 1 / series.length * process;
      item._rose_proportion_ = 1 / series.length * process;
    } else {
      item._proportion_ = item.data / count * process;
      if (type == "area") {
        item._rose_proportion_ = 1 / series.length * process;
      } else {
        item._rose_proportion_ = item.data / count * process;
      }
    }
    item._radius_ = minRadius + radiusLength * ((item.data - minData) / (maxData - minData)) || radius;
  }
  for (let i = 0; i < series.length; i++) {
    let item = series[i];
    item._start_ = _start_;
    _start_ += 2 * item._rose_proportion_ * Math.PI;
  }
  return series;
}
function getArcbarDataPoints(series, arcbarOption) {
  var process = arguments.length > 2 && arguments[2] !== void 0 ? arguments[2] : 1;
  if (process == 1) {
    process = 0.999999;
  }
  for (let i = 0; i < series.length; i++) {
    let item = series[i];
    item.data = item.data === null ? 0 : item.data;
    let totalAngle;
    if (arcbarOption.type == "circle") {
      totalAngle = 2;
    } else {
      if (arcbarOption.direction == "ccw") {
        if (arcbarOption.startAngle < arcbarOption.endAngle) {
          totalAngle = 2 + arcbarOption.startAngle - arcbarOption.endAngle;
        } else {
          totalAngle = arcbarOption.startAngle - arcbarOption.endAngle;
        }
      } else {
        if (arcbarOption.endAngle < arcbarOption.startAngle) {
          totalAngle = 2 + arcbarOption.endAngle - arcbarOption.startAngle;
        } else {
          totalAngle = arcbarOption.startAngle - arcbarOption.endAngle;
        }
      }
    }
    item._proportion_ = totalAngle * item.data * process + arcbarOption.startAngle;
    if (arcbarOption.direction == "ccw") {
      item._proportion_ = arcbarOption.startAngle - totalAngle * item.data * process;
    }
    if (item._proportion_ >= 2) {
      item._proportion_ = item._proportion_ % 2;
    }
  }
  return series;
}
function getGaugeArcbarDataPoints(series, arcbarOption) {
  var process = arguments.length > 2 && arguments[2] !== void 0 ? arguments[2] : 1;
  if (process == 1) {
    process = 0.999999;
  }
  for (let i = 0; i < series.length; i++) {
    let item = series[i];
    item.data = item.data === null ? 0 : item.data;
    let totalAngle;
    if (arcbarOption.type == "circle") {
      totalAngle = 2;
    } else {
      if (arcbarOption.endAngle < arcbarOption.startAngle) {
        totalAngle = 2 + arcbarOption.endAngle - arcbarOption.startAngle;
      } else {
        totalAngle = arcbarOption.startAngle - arcbarOption.endAngle;
      }
    }
    item._proportion_ = totalAngle * item.data * process + arcbarOption.startAngle;
    if (item._proportion_ >= 2) {
      item._proportion_ = item._proportion_ % 2;
    }
  }
  return series;
}
function getGaugeAxisPoints(categories, startAngle, endAngle) {
  let totalAngle;
  if (endAngle < startAngle) {
    totalAngle = 2 + endAngle - startAngle;
  } else {
    totalAngle = startAngle - endAngle;
  }
  let tempStartAngle = startAngle;
  for (let i = 0; i < categories.length; i++) {
    categories[i].value = categories[i].value === null ? 0 : categories[i].value;
    categories[i]._startAngle_ = tempStartAngle;
    categories[i]._endAngle_ = totalAngle * categories[i].value + startAngle;
    if (categories[i]._endAngle_ >= 2) {
      categories[i]._endAngle_ = categories[i]._endAngle_ % 2;
    }
    tempStartAngle = categories[i]._endAngle_;
  }
  return categories;
}
function getGaugeDataPoints(series, categories, gaugeOption) {
  let process = arguments.length > 3 && arguments[3] !== void 0 ? arguments[3] : 1;
  for (let i = 0; i < series.length; i++) {
    let item = series[i];
    item.data = item.data === null ? 0 : item.data;
    if (gaugeOption.pointer.color == "auto") {
      for (let i2 = 0; i2 < categories.length; i2++) {
        if (item.data <= categories[i2].value) {
          item.color = categories[i2].color;
          break;
        }
      }
    } else {
      item.color = gaugeOption.pointer.color;
    }
    let totalAngle;
    if (gaugeOption.endAngle < gaugeOption.startAngle) {
      totalAngle = 2 + gaugeOption.endAngle - gaugeOption.startAngle;
    } else {
      totalAngle = gaugeOption.startAngle - gaugeOption.endAngle;
    }
    item._endAngle_ = totalAngle * item.data + gaugeOption.startAngle;
    item._oldAngle_ = gaugeOption.oldAngle;
    if (gaugeOption.oldAngle < gaugeOption.endAngle) {
      item._oldAngle_ += 2;
    }
    if (item.data >= gaugeOption.oldData) {
      item._proportion_ = (item._endAngle_ - item._oldAngle_) * process + gaugeOption.oldAngle;
    } else {
      item._proportion_ = item._oldAngle_ - (item._oldAngle_ - item._endAngle_) * process;
    }
    if (item._proportion_ >= 2) {
      item._proportion_ = item._proportion_ % 2;
    }
  }
  return series;
}
function getPieTextMaxLength(series, config2, context, opts) {
  series = getPieDataPoints(series);
  let maxLength = 0;
  for (let i = 0; i < series.length; i++) {
    let item = series[i];
    let text = item.formatter ? item.formatter(+item._proportion_.toFixed(2)) : util.toFixed(item._proportion_ * 100) + "%";
    maxLength = Math.max(maxLength, measureText(text, item.textSize * opts.pix || config2.fontSize, context));
  }
  return maxLength;
}
function fixColumeData(points, eachSpacing, columnLen, index2, config2, opts) {
  return points.map(function(item) {
    if (item === null) {
      return null;
    }
    var seriesGap = 0;
    var categoryGap = 0;
    if (opts.type == "mix") {
      seriesGap = opts.extra.mix.column.seriesGap * opts.pix || 0;
      categoryGap = opts.extra.mix.column.categoryGap * opts.pix || 0;
    } else {
      seriesGap = opts.extra.column.seriesGap * opts.pix || 0;
      categoryGap = opts.extra.column.categoryGap * opts.pix || 0;
    }
    seriesGap = Math.min(seriesGap, eachSpacing / columnLen);
    categoryGap = Math.min(categoryGap, eachSpacing / columnLen);
    item.width = Math.ceil((eachSpacing - 2 * categoryGap - seriesGap * (columnLen - 1)) / columnLen);
    if (opts.extra.mix && opts.extra.mix.column.width && +opts.extra.mix.column.width > 0) {
      item.width = Math.min(item.width, +opts.extra.mix.column.width * opts.pix);
    }
    if (opts.extra.column && opts.extra.column.width && +opts.extra.column.width > 0) {
      item.width = Math.min(item.width, +opts.extra.column.width * opts.pix);
    }
    if (item.width <= 0) {
      item.width = 1;
    }
    item.x += (index2 + 0.5 - columnLen / 2) * (item.width + seriesGap);
    return item;
  });
}
function fixBarData(points, eachSpacing, columnLen, index2, config2, opts) {
  return points.map(function(item) {
    if (item === null) {
      return null;
    }
    var seriesGap = 0;
    var categoryGap = 0;
    seriesGap = opts.extra.bar.seriesGap * opts.pix || 0;
    categoryGap = opts.extra.bar.categoryGap * opts.pix || 0;
    seriesGap = Math.min(seriesGap, eachSpacing / columnLen);
    categoryGap = Math.min(categoryGap, eachSpacing / columnLen);
    item.width = Math.ceil((eachSpacing - 2 * categoryGap - seriesGap * (columnLen - 1)) / columnLen);
    if (opts.extra.bar && opts.extra.bar.width && +opts.extra.bar.width > 0) {
      item.width = Math.min(item.width, +opts.extra.bar.width * opts.pix);
    }
    if (item.width <= 0) {
      item.width = 1;
    }
    item.y += (index2 + 0.5 - columnLen / 2) * (item.width + seriesGap);
    return item;
  });
}
function fixColumeMeterData(points, eachSpacing, columnLen, index2, config2, opts, border) {
  var categoryGap = opts.extra.column.categoryGap * opts.pix || 0;
  return points.map(function(item) {
    if (item === null) {
      return null;
    }
    item.width = eachSpacing - 2 * categoryGap;
    if (opts.extra.column && opts.extra.column.width && +opts.extra.column.width > 0) {
      item.width = Math.min(item.width, +opts.extra.column.width * opts.pix);
    }
    if (index2 > 0) {
      item.width -= border;
    }
    return item;
  });
}
function fixColumeStackData(points, eachSpacing, columnLen, index2, config2, opts, series) {
  var categoryGap = opts.extra.column.categoryGap * opts.pix || 0;
  return points.map(function(item, indexn) {
    if (item === null) {
      return null;
    }
    item.width = Math.ceil(eachSpacing - 2 * categoryGap);
    if (opts.extra.column && opts.extra.column.width && +opts.extra.column.width > 0) {
      item.width = Math.min(item.width, +opts.extra.column.width * opts.pix);
    }
    if (item.width <= 0) {
      item.width = 1;
    }
    return item;
  });
}
function fixBarStackData(points, eachSpacing, columnLen, index2, config2, opts, series) {
  var categoryGap = opts.extra.bar.categoryGap * opts.pix || 0;
  return points.map(function(item, indexn) {
    if (item === null) {
      return null;
    }
    item.width = Math.ceil(eachSpacing - 2 * categoryGap);
    if (opts.extra.bar && opts.extra.bar.width && +opts.extra.bar.width > 0) {
      item.width = Math.min(item.width, +opts.extra.bar.width * opts.pix);
    }
    if (item.width <= 0) {
      item.width = 1;
    }
    return item;
  });
}
function getXAxisPoints(categories, opts, config2) {
  var spacingValid = opts.width - opts.area[1] - opts.area[3];
  var dataCount = opts.enableScroll ? Math.min(opts.xAxis.itemCount, categories.length) : categories.length;
  if ((opts.type == "line" || opts.type == "area" || opts.type == "scatter" || opts.type == "bubble" || opts.type == "bar") && dataCount > 1 && opts.xAxis.boundaryGap == "justify") {
    dataCount -= 1;
  }
  var widthRatio = 0;
  if (opts.type == "mount" && opts.extra && opts.extra.mount && opts.extra.mount.widthRatio && opts.extra.mount.widthRatio > 1) {
    if (opts.extra.mount.widthRatio > 2)
      opts.extra.mount.widthRatio = 2;
    widthRatio = opts.extra.mount.widthRatio - 1;
    dataCount += widthRatio;
  }
  var eachSpacing = spacingValid / dataCount;
  var xAxisPoints = [];
  var startX = opts.area[3];
  var endX = opts.width - opts.area[1];
  categories.forEach(function(item, index2) {
    xAxisPoints.push(startX + widthRatio / 2 * eachSpacing + index2 * eachSpacing);
  });
  if (opts.xAxis.boundaryGap !== "justify") {
    if (opts.enableScroll === true) {
      xAxisPoints.push(startX + widthRatio * eachSpacing + categories.length * eachSpacing);
    } else {
      xAxisPoints.push(endX);
    }
  }
  return {
    xAxisPoints,
    startX,
    endX,
    eachSpacing
  };
}
function getCandleDataPoints(data, minRange, maxRange, xAxisPoints, eachSpacing, opts, config2) {
  var process = arguments.length > 7 && arguments[7] !== void 0 ? arguments[7] : 1;
  var points = [];
  var validHeight = opts.height - opts.area[0] - opts.area[2];
  data.forEach(function(item, index2) {
    if (item === null) {
      points.push(null);
    } else {
      var cPoints = [];
      item.forEach(function(items, indexs) {
        var point = {};
        point.x = xAxisPoints[index2] + Math.round(eachSpacing / 2);
        var value = items.value || items;
        var height = validHeight * (value - minRange) / (maxRange - minRange);
        height *= process;
        point.y = opts.height - Math.round(height) - opts.area[2];
        cPoints.push(point);
      });
      points.push(cPoints);
    }
  });
  return points;
}
function getDataPoints(data, minRange, maxRange, xAxisPoints, eachSpacing, opts, config2) {
  var process = arguments.length > 7 && arguments[7] !== void 0 ? arguments[7] : 1;
  var boundaryGap = "center";
  if (opts.type == "line" || opts.type == "area" || opts.type == "scatter" || opts.type == "bubble") {
    boundaryGap = opts.xAxis.boundaryGap;
  }
  var points = [];
  var validHeight = opts.height - opts.area[0] - opts.area[2];
  var validWidth = opts.width - opts.area[1] - opts.area[3];
  data.forEach(function(item, index2) {
    if (item === null) {
      points.push(null);
    } else {
      var point = {};
      point.color = item.color;
      point.x = xAxisPoints[index2];
      var value = item;
      if (typeof item === "object" && item !== null) {
        if (item.constructor.toString().indexOf("Array") > -1) {
          let xranges, xminRange, xmaxRange;
          xranges = [].concat(opts.chartData.xAxisData.ranges);
          xminRange = xranges.shift();
          xmaxRange = xranges.pop();
          value = item[1];
          point.x = opts.area[3] + validWidth * (item[0] - xminRange) / (xmaxRange - xminRange);
          if (opts.type == "bubble") {
            point.r = item[2];
            point.t = item[3];
          }
        } else {
          value = item.value;
        }
      }
      if (boundaryGap == "center") {
        point.x += eachSpacing / 2;
      }
      var height = validHeight * (value - minRange) / (maxRange - minRange);
      height *= process;
      point.y = opts.height - height - opts.area[2];
      points.push(point);
    }
  });
  return points;
}
function getLineDataPoints(data, minRange, maxRange, xAxisPoints, eachSpacing, opts, config2, lineOption, process) {
  var process = arguments.length > 8 && arguments[8] !== void 0 ? arguments[8] : 1;
  var boundaryGap = opts.xAxis.boundaryGap;
  var points = [];
  var validHeight = opts.height - opts.area[0] - opts.area[2];
  var validWidth = opts.width - opts.area[1] - opts.area[3];
  data.forEach(function(item, index2) {
    if (item === null) {
      points.push(null);
    } else {
      var point = {};
      point.color = item.color;
      if (lineOption.animation == "vertical") {
        point.x = xAxisPoints[index2];
        var value = item;
        if (typeof item === "object" && item !== null) {
          if (item.constructor.toString().indexOf("Array") > -1) {
            let xranges, xminRange, xmaxRange;
            xranges = [].concat(opts.chartData.xAxisData.ranges);
            xminRange = xranges.shift();
            xmaxRange = xranges.pop();
            value = item[1];
            point.x = opts.area[3] + validWidth * (item[0] - xminRange) / (xmaxRange - xminRange);
          } else {
            value = item.value;
          }
        }
        if (boundaryGap == "center") {
          point.x += eachSpacing / 2;
        }
        var height = validHeight * (value - minRange) / (maxRange - minRange);
        height *= process;
        point.y = opts.height - height - opts.area[2];
        points.push(point);
      } else {
        point.x = xAxisPoints[0] + eachSpacing * index2 * process;
        var value = item;
        if (boundaryGap == "center") {
          point.x += eachSpacing / 2;
        }
        var height = validHeight * (value - minRange) / (maxRange - minRange);
        point.y = opts.height - height - opts.area[2];
        points.push(point);
      }
    }
  });
  return points;
}
function getColumnDataPoints(data, minRange, maxRange, xAxisPoints, eachSpacing, opts, config2, zeroPoints, process) {
  var process = arguments.length > 8 && arguments[8] !== void 0 ? arguments[8] : 1;
  var points = [];
  var validHeight = opts.height - opts.area[0] - opts.area[2];
  var validWidth = opts.width - opts.area[1] - opts.area[3];
  data.forEach(function(item, index2) {
    if (item === null) {
      points.push(null);
    } else {
      var point = {};
      point.color = item.color;
      point.x = xAxisPoints[index2];
      var value = item;
      if (typeof item === "object" && item !== null) {
        if (item.constructor.toString().indexOf("Array") > -1) {
          let xranges, xminRange, xmaxRange;
          xranges = [].concat(opts.chartData.xAxisData.ranges);
          xminRange = xranges.shift();
          xmaxRange = xranges.pop();
          value = item[1];
          point.x = opts.area[3] + validWidth * (item[0] - xminRange) / (xmaxRange - xminRange);
        } else {
          value = item.value;
        }
      }
      point.x += eachSpacing / 2;
      var height = validHeight * (value * process - minRange) / (maxRange - minRange);
      point.y = opts.height - height - opts.area[2];
      points.push(point);
    }
  });
  return points;
}
function getMountDataPoints(series, minRange, maxRange, xAxisPoints, eachSpacing, opts, mountOption, zeroPoints) {
  var process = arguments.length > 8 && arguments[8] !== void 0 ? arguments[8] : 1;
  var points = [];
  var validHeight = opts.height - opts.area[0] - opts.area[2];
  opts.width - opts.area[1] - opts.area[3];
  var mountWidth = eachSpacing * mountOption.widthRatio;
  series.forEach(function(item, index2) {
    if (item === null) {
      points.push(null);
    } else {
      var point = {};
      point.color = item.color;
      point.x = xAxisPoints[index2];
      point.x += eachSpacing / 2;
      var value = item.data;
      var height = validHeight * (value * process - minRange) / (maxRange - minRange);
      point.y = opts.height - height - opts.area[2];
      point.value = value;
      point.width = mountWidth;
      points.push(point);
    }
  });
  return points;
}
function getBarDataPoints(data, minRange, maxRange, yAxisPoints, eachSpacing, opts, config2) {
  var process = arguments.length > 7 && arguments[7] !== void 0 ? arguments[7] : 1;
  var points = [];
  opts.height - opts.area[0] - opts.area[2];
  var validWidth = opts.width - opts.area[1] - opts.area[3];
  data.forEach(function(item, index2) {
    if (item === null) {
      points.push(null);
    } else {
      var point = {};
      point.color = item.color;
      point.y = yAxisPoints[index2];
      var value = item;
      if (typeof item === "object" && item !== null) {
        value = item.value;
      }
      var height = validWidth * (value - minRange) / (maxRange - minRange);
      height *= process;
      point.height = height;
      point.value = value;
      point.x = height + opts.area[3];
      points.push(point);
    }
  });
  return points;
}
function getStackDataPoints(data, minRange, maxRange, xAxisPoints, eachSpacing, opts, config2, seriesIndex, stackSeries) {
  var process = arguments.length > 9 && arguments[9] !== void 0 ? arguments[9] : 1;
  var points = [];
  var validHeight = opts.height - opts.area[0] - opts.area[2];
  data.forEach(function(item, index2) {
    if (item === null) {
      points.push(null);
    } else {
      var point = {};
      point.color = item.color;
      point.x = xAxisPoints[index2] + Math.round(eachSpacing / 2);
      if (seriesIndex > 0) {
        var value = 0;
        for (let i = 0; i <= seriesIndex; i++) {
          value += stackSeries[i].data[index2];
        }
        var value0 = value - item;
        var height = validHeight * (value - minRange) / (maxRange - minRange);
        var height0 = validHeight * (value0 - minRange) / (maxRange - minRange);
      } else {
        var value = item;
        if (typeof item === "object" && item !== null) {
          value = item.value;
        }
        var height = validHeight * (value - minRange) / (maxRange - minRange);
        var height0 = 0;
      }
      var heightc = height0;
      height *= process;
      heightc *= process;
      point.y = opts.height - Math.round(height) - opts.area[2];
      point.y0 = opts.height - Math.round(heightc) - opts.area[2];
      points.push(point);
    }
  });
  return points;
}
function getBarStackDataPoints(data, minRange, maxRange, yAxisPoints, eachSpacing, opts, config2, seriesIndex, stackSeries) {
  var process = arguments.length > 9 && arguments[9] !== void 0 ? arguments[9] : 1;
  var points = [];
  var validHeight = opts.width - opts.area[1] - opts.area[3];
  data.forEach(function(item, index2) {
    if (item === null) {
      points.push(null);
    } else {
      var point = {};
      point.color = item.color;
      point.y = yAxisPoints[index2];
      if (seriesIndex > 0) {
        var value = 0;
        for (let i = 0; i <= seriesIndex; i++) {
          value += stackSeries[i].data[index2];
        }
        var value0 = value - item;
        var height = validHeight * (value - minRange) / (maxRange - minRange);
        var height0 = validHeight * (value0 - minRange) / (maxRange - minRange);
      } else {
        var value = item;
        if (typeof item === "object" && item !== null) {
          value = item.value;
        }
        var height = validHeight * (value - minRange) / (maxRange - minRange);
        var height0 = 0;
      }
      var heightc = height0;
      height *= process;
      heightc *= process;
      point.height = height - heightc;
      point.x = opts.area[3] + height;
      point.x0 = opts.area[3] + heightc;
      points.push(point);
    }
  });
  return points;
}
function getYAxisTextList(series, opts, config2, stack2, yData) {
  var data;
  if (stack2 == "stack") {
    data = dataCombineStack(series, opts.categories.length);
  } else {
    data = dataCombine(series);
  }
  var sorted = [];
  data = data.filter(function(item) {
    if (typeof item === "object" && item !== null) {
      if (item.constructor.toString().indexOf("Array") > -1) {
        return item !== null;
      } else {
        return item.value !== null;
      }
    } else {
      return item !== null;
    }
  });
  data.map(function(item) {
    if (typeof item === "object") {
      if (item.constructor.toString().indexOf("Array") > -1) {
        if (opts.type == "candle") {
          item.map(function(subitem) {
            sorted.push(subitem);
          });
        } else {
          sorted.push(item[1]);
        }
      } else {
        sorted.push(item.value);
      }
    } else {
      sorted.push(item);
    }
  });
  var minData = yData.min || 0;
  var maxData = yData.max || 0;
  if (sorted.length > 0) {
    minData = Math.min.apply(this, sorted);
    maxData = Math.max.apply(this, sorted);
  }
  if (minData === maxData) {
    if (maxData == 0) {
      maxData = 10;
    } else {
      minData = 0;
    }
  }
  var dataRange = getDataRange(minData, maxData);
  var minRange = yData.min === void 0 || yData.min === null ? dataRange.minRange : yData.min;
  var maxRange = yData.max === void 0 || yData.max === null ? dataRange.maxRange : yData.max;
  var eachRange = (maxRange - minRange) / opts.yAxis.splitNumber;
  var range = [];
  for (var i = 0; i <= opts.yAxis.splitNumber; i++) {
    range.push(minRange + eachRange * i);
  }
  return range.reverse();
}
function calYAxisData(series, opts, config2, context) {
  var columnstyle = assign({}, {
    type: ""
  }, opts.extra.column);
  var YLength = opts.yAxis.data.length;
  var newSeries = new Array(YLength);
  if (YLength > 0) {
    for (let i = 0; i < YLength; i++) {
      newSeries[i] = [];
      for (let j = 0; j < series.length; j++) {
        if (series[j].index == i) {
          newSeries[i].push(series[j]);
        }
      }
    }
    var rangesArr = new Array(YLength);
    var rangesFormatArr = new Array(YLength);
    var yAxisWidthArr = new Array(YLength);
    for (let i = 0; i < YLength; i++) {
      let yData = opts.yAxis.data[i];
      if (opts.yAxis.disabled == true) {
        yData.disabled = true;
      }
      if (yData.type === "categories") {
        if (!yData.formatter) {
          yData.formatter = (val, index2, opts2) => {
            return val + (yData.unit || "");
          };
        }
        yData.categories = yData.categories || opts.categories;
        rangesArr[i] = yData.categories;
      } else {
        if (!yData.formatter) {
          yData.formatter = (val, index2, opts2) => {
            return util.toFixed(val, yData.tofix || 0) + (yData.unit || "");
          };
        }
        rangesArr[i] = getYAxisTextList(newSeries[i], opts, config2, columnstyle.type, yData);
      }
      let yAxisFontSizes = yData.fontSize * opts.pix || config2.fontSize;
      yAxisWidthArr[i] = {
        position: yData.position ? yData.position : "left",
        width: 0
      };
      rangesFormatArr[i] = rangesArr[i].map(function(items, index2) {
        items = yData.formatter(items, index2, opts);
        yAxisWidthArr[i].width = Math.max(yAxisWidthArr[i].width, measureText(items, yAxisFontSizes, context) + 5);
        return items;
      });
      let calibration = yData.calibration ? 4 * opts.pix : 0;
      yAxisWidthArr[i].width += calibration + 3 * opts.pix;
      if (yData.disabled === true) {
        yAxisWidthArr[i].width = 0;
      }
    }
  } else {
    var rangesArr = new Array(1);
    var rangesFormatArr = new Array(1);
    var yAxisWidthArr = new Array(1);
    if (opts.type === "bar") {
      rangesArr[0] = opts.categories;
      if (!opts.yAxis.formatter) {
        opts.yAxis.formatter = (val, index2, opts2) => {
          return val + (opts2.yAxis.unit || "");
        };
      }
    } else {
      if (!opts.yAxis.formatter) {
        opts.yAxis.formatter = (val, index2, opts2) => {
          return val.toFixed(opts2.yAxis.tofix) + (opts2.yAxis.unit || "");
        };
      }
      rangesArr[0] = getYAxisTextList(series, opts, config2, columnstyle.type, {});
    }
    yAxisWidthArr[0] = {
      position: "left",
      width: 0
    };
    var yAxisFontSize = opts.yAxis.fontSize * opts.pix || config2.fontSize;
    rangesFormatArr[0] = rangesArr[0].map(function(item, index2) {
      item = opts.yAxis.formatter(item, index2, opts);
      yAxisWidthArr[0].width = Math.max(yAxisWidthArr[0].width, measureText(item, yAxisFontSize, context) + 5);
      return item;
    });
    yAxisWidthArr[0].width += 3 * opts.pix;
    if (opts.yAxis.disabled === true) {
      yAxisWidthArr[0] = {
        position: "left",
        width: 0
      };
      opts.yAxis.data[0] = {
        disabled: true
      };
    } else {
      opts.yAxis.data[0] = {
        disabled: false,
        position: "left",
        max: opts.yAxis.max,
        min: opts.yAxis.min,
        formatter: opts.yAxis.formatter
      };
      if (opts.type === "bar") {
        opts.yAxis.data[0].categories = opts.categories;
        opts.yAxis.data[0].type = "categories";
      }
    }
  }
  return {
    rangesFormat: rangesFormatArr,
    ranges: rangesArr,
    yAxisWidth: yAxisWidthArr
  };
}
function calTooltipYAxisData(point, series, opts, config2, eachSpacing) {
  let ranges = [].concat(opts.chartData.yAxisData.ranges);
  let spacingValid = opts.height - opts.area[0] - opts.area[2];
  let minAxis = opts.area[0];
  let items = [];
  for (let i = 0; i < ranges.length; i++) {
    let maxVal = Math.max.apply(this, ranges[i]);
    let minVal = Math.min.apply(this, ranges[i]);
    let item = maxVal - (maxVal - minVal) * (point - minAxis) / spacingValid;
    item = opts.yAxis.data && opts.yAxis.data[i].formatter ? opts.yAxis.data[i].formatter(item, i, opts) : item.toFixed(0);
    items.push(String(item));
  }
  return items;
}
function calMarkLineData(points, opts) {
  let minRange, maxRange;
  let spacingValid = opts.height - opts.area[0] - opts.area[2];
  for (let i = 0; i < points.length; i++) {
    points[i].yAxisIndex = points[i].yAxisIndex ? points[i].yAxisIndex : 0;
    let range = [].concat(opts.chartData.yAxisData.ranges[points[i].yAxisIndex]);
    minRange = range.pop();
    maxRange = range.shift();
    let height = spacingValid * (points[i].value - minRange) / (maxRange - minRange);
    points[i].y = opts.height - Math.round(height) - opts.area[2];
  }
  return points;
}
function contextRotate(context, opts) {
  if (opts.rotateLock !== true) {
    context.translate(opts.height, 0);
    context.rotate(90 * Math.PI / 180);
  } else if (opts._rotate_ !== true) {
    context.translate(opts.height, 0);
    context.rotate(90 * Math.PI / 180);
    opts._rotate_ = true;
  }
}
function drawPointShape(points, color, shape, context, opts) {
  context.beginPath();
  if (opts.dataPointShapeType == "hollow") {
    context.setStrokeStyle(color);
    context.setFillStyle(opts.background);
    context.setLineWidth(2 * opts.pix);
  } else {
    context.setStrokeStyle("#ffffff");
    context.setFillStyle(color);
    context.setLineWidth(1 * opts.pix);
  }
  if (shape === "diamond") {
    points.forEach(function(item, index2) {
      if (item !== null) {
        context.moveTo(item.x, item.y - 4.5);
        context.lineTo(item.x - 4.5, item.y);
        context.lineTo(item.x, item.y + 4.5);
        context.lineTo(item.x + 4.5, item.y);
        context.lineTo(item.x, item.y - 4.5);
      }
    });
  } else if (shape === "circle") {
    points.forEach(function(item, index2) {
      if (item !== null) {
        context.moveTo(item.x + 2.5 * opts.pix, item.y);
        context.arc(item.x, item.y, 3 * opts.pix, 0, 2 * Math.PI, false);
      }
    });
  } else if (shape === "square") {
    points.forEach(function(item, index2) {
      if (item !== null) {
        context.moveTo(item.x - 3.5, item.y - 3.5);
        context.rect(item.x - 3.5, item.y - 3.5, 7, 7);
      }
    });
  } else if (shape === "triangle") {
    points.forEach(function(item, index2) {
      if (item !== null) {
        context.moveTo(item.x, item.y - 4.5);
        context.lineTo(item.x - 4.5, item.y + 4.5);
        context.lineTo(item.x + 4.5, item.y + 4.5);
        context.lineTo(item.x, item.y - 4.5);
      }
    });
  } else if (shape === "none") {
    return;
  }
  context.closePath();
  context.fill();
  context.stroke();
}
function drawActivePoint(points, color, shape, context, opts, option, seriesIndex) {
  if (!opts.tooltip) {
    return;
  }
  if (opts.tooltip.group.length > 0 && opts.tooltip.group.includes(seriesIndex) == false) {
    return;
  }
  var pointIndex = typeof opts.tooltip.index === "number" ? opts.tooltip.index : opts.tooltip.index[opts.tooltip.group.indexOf(seriesIndex)];
  context.beginPath();
  if (option.activeType == "hollow") {
    context.setStrokeStyle(color);
    context.setFillStyle(opts.background);
    context.setLineWidth(2 * opts.pix);
  } else {
    context.setStrokeStyle("#ffffff");
    context.setFillStyle(color);
    context.setLineWidth(1 * opts.pix);
  }
  if (shape === "diamond") {
    points.forEach(function(item, index2) {
      if (item !== null && pointIndex == index2) {
        context.moveTo(item.x, item.y - 4.5);
        context.lineTo(item.x - 4.5, item.y);
        context.lineTo(item.x, item.y + 4.5);
        context.lineTo(item.x + 4.5, item.y);
        context.lineTo(item.x, item.y - 4.5);
      }
    });
  } else if (shape === "circle") {
    points.forEach(function(item, index2) {
      if (item !== null && pointIndex == index2) {
        context.moveTo(item.x + 2.5 * opts.pix, item.y);
        context.arc(item.x, item.y, 3 * opts.pix, 0, 2 * Math.PI, false);
      }
    });
  } else if (shape === "square") {
    points.forEach(function(item, index2) {
      if (item !== null && pointIndex == index2) {
        context.moveTo(item.x - 3.5, item.y - 3.5);
        context.rect(item.x - 3.5, item.y - 3.5, 7, 7);
      }
    });
  } else if (shape === "triangle") {
    points.forEach(function(item, index2) {
      if (item !== null && pointIndex == index2) {
        context.moveTo(item.x, item.y - 4.5);
        context.lineTo(item.x - 4.5, item.y + 4.5);
        context.lineTo(item.x + 4.5, item.y + 4.5);
        context.lineTo(item.x, item.y - 4.5);
      }
    });
  } else if (shape === "none") {
    return;
  }
  context.closePath();
  context.fill();
  context.stroke();
}
function drawRingTitle(opts, config2, context, center) {
  var titlefontSize = opts.title.fontSize || config2.titleFontSize;
  var subtitlefontSize = opts.subtitle.fontSize || config2.subtitleFontSize;
  var title = opts.title.name || "";
  var subtitle = opts.subtitle.name || "";
  var titleFontColor = opts.title.color || opts.fontColor;
  var subtitleFontColor = opts.subtitle.color || opts.fontColor;
  var titleHeight = title ? titlefontSize : 0;
  var subtitleHeight = subtitle ? subtitlefontSize : 0;
  var margin = 5;
  if (subtitle) {
    var textWidth = measureText(subtitle, subtitlefontSize * opts.pix, context);
    var startX = center.x - textWidth / 2 + (opts.subtitle.offsetX || 0) * opts.pix;
    var startY = center.y + subtitlefontSize * opts.pix / 2 + (opts.subtitle.offsetY || 0) * opts.pix;
    if (title) {
      startY += (titleHeight * opts.pix + margin) / 2;
    }
    context.beginPath();
    context.setFontSize(subtitlefontSize * opts.pix);
    context.setFillStyle(subtitleFontColor);
    context.fillText(subtitle, startX, startY);
    context.closePath();
    context.stroke();
  }
  if (title) {
    var _textWidth = measureText(title, titlefontSize * opts.pix, context);
    var _startX = center.x - _textWidth / 2 + (opts.title.offsetX || 0);
    var _startY = center.y + titlefontSize * opts.pix / 2 + (opts.title.offsetY || 0) * opts.pix;
    if (subtitle) {
      _startY -= (subtitleHeight * opts.pix + margin) / 2;
    }
    context.beginPath();
    context.setFontSize(titlefontSize * opts.pix);
    context.setFillStyle(titleFontColor);
    context.fillText(title, _startX, _startY);
    context.closePath();
    context.stroke();
  }
}
function drawPointText(points, series, config2, context, opts) {
  var data = series.data;
  var textOffset = series.textOffset ? series.textOffset : 0;
  points.forEach(function(item, index2) {
    if (item !== null) {
      context.beginPath();
      var fontSize = series.textSize ? series.textSize * opts.pix : config2.fontSize;
      context.setFontSize(fontSize);
      context.setFillStyle(series.textColor || opts.fontColor);
      var value = data[index2];
      if (typeof data[index2] === "object" && data[index2] !== null) {
        if (data[index2].constructor.toString().indexOf("Array") > -1) {
          value = data[index2][1];
        } else {
          value = data[index2].value;
        }
      }
      var formatVal = series.formatter ? series.formatter(value, index2, series, opts) : value;
      context.setTextAlign("center");
      context.fillText(String(formatVal), item.x, item.y - 4 + textOffset * opts.pix);
      context.closePath();
      context.stroke();
      context.setTextAlign("left");
    }
  });
}
function drawColumePointText(points, series, config2, context, opts) {
  var data = series.data;
  var textOffset = series.textOffset ? series.textOffset : 0;
  var Position = opts.extra.column.labelPosition;
  points.forEach(function(item, index2) {
    if (item !== null) {
      context.beginPath();
      var fontSize = series.textSize ? series.textSize * opts.pix : config2.fontSize;
      context.setFontSize(fontSize);
      context.setFillStyle(series.textColor || opts.fontColor);
      var value = data[index2];
      if (typeof data[index2] === "object" && data[index2] !== null) {
        if (data[index2].constructor.toString().indexOf("Array") > -1) {
          value = data[index2][1];
        } else {
          value = data[index2].value;
        }
      }
      var formatVal = series.formatter ? series.formatter(value, index2, series, opts) : value;
      context.setTextAlign("center");
      var startY = item.y - 4 * opts.pix + textOffset * opts.pix;
      if (item.y > series.zeroPoints) {
        startY = item.y + textOffset * opts.pix + fontSize;
      }
      if (Position == "insideTop") {
        startY = item.y + fontSize + textOffset * opts.pix;
        if (item.y > series.zeroPoints) {
          startY = item.y - textOffset * opts.pix - 4 * opts.pix;
        }
      }
      if (Position == "center") {
        startY = item.y + textOffset * opts.pix + (opts.height - opts.area[2] - item.y + fontSize) / 2;
        if (series.zeroPoints < opts.height - opts.area[2]) {
          startY = item.y + textOffset * opts.pix + (series.zeroPoints - item.y + fontSize) / 2;
        }
        if (item.y > series.zeroPoints) {
          startY = item.y - textOffset * opts.pix - (item.y - series.zeroPoints - fontSize) / 2;
        }
        if (opts.extra.column.type == "stack") {
          startY = item.y + textOffset * opts.pix + (item.y0 - item.y + fontSize) / 2;
        }
      }
      if (Position == "bottom") {
        startY = opts.height - opts.area[2] + textOffset * opts.pix - 4 * opts.pix;
        if (series.zeroPoints < opts.height - opts.area[2]) {
          startY = series.zeroPoints + textOffset * opts.pix - 4 * opts.pix;
        }
        if (item.y > series.zeroPoints) {
          startY = series.zeroPoints - textOffset * opts.pix + fontSize + 2 * opts.pix;
        }
        if (opts.extra.column.type == "stack") {
          startY = item.y0 + textOffset * opts.pix - 4 * opts.pix;
        }
      }
      context.fillText(String(formatVal), item.x, startY);
      context.closePath();
      context.stroke();
      context.setTextAlign("left");
    }
  });
}
function drawMountPointText(points, series, config2, context, opts, zeroPoints) {
  series.data;
  var textOffset = series.textOffset ? series.textOffset : 0;
  opts.extra.mount.labelPosition;
  points.forEach(function(item, index2) {
    if (item !== null) {
      context.beginPath();
      var fontSize = series[index2].textSize ? series[index2].textSize * opts.pix : config2.fontSize;
      context.setFontSize(fontSize);
      context.setFillStyle(series[index2].textColor || opts.fontColor);
      var value = item.value;
      var formatVal = series[index2].formatter ? series[index2].formatter(value, index2, series, opts) : value;
      context.setTextAlign("center");
      var startY = item.y - 4 * opts.pix + textOffset * opts.pix;
      if (item.y > zeroPoints) {
        startY = item.y + textOffset * opts.pix + fontSize;
      }
      context.fillText(String(formatVal), item.x, startY);
      context.closePath();
      context.stroke();
      context.setTextAlign("left");
    }
  });
}
function drawBarPointText(points, series, config2, context, opts) {
  var data = series.data;
  series.textOffset ? series.textOffset : 0;
  points.forEach(function(item, index2) {
    if (item !== null) {
      context.beginPath();
      var fontSize = series.textSize ? series.textSize * opts.pix : config2.fontSize;
      context.setFontSize(fontSize);
      context.setFillStyle(series.textColor || opts.fontColor);
      var value = data[index2];
      if (typeof data[index2] === "object" && data[index2] !== null) {
        value = data[index2].value;
      }
      var formatVal = series.formatter ? series.formatter(value, index2, series, opts) : value;
      context.setTextAlign("left");
      context.fillText(String(formatVal), item.x + 4 * opts.pix, item.y + fontSize / 2 - 3);
      context.closePath();
      context.stroke();
    }
  });
}
function drawGaugeLabel(gaugeOption, radius, centerPosition, opts, config2, context) {
  radius -= gaugeOption.width / 2 + gaugeOption.labelOffset * opts.pix;
  radius = radius < 10 ? 10 : radius;
  let totalAngle;
  if (gaugeOption.endAngle < gaugeOption.startAngle) {
    totalAngle = 2 + gaugeOption.endAngle - gaugeOption.startAngle;
  } else {
    totalAngle = gaugeOption.startAngle - gaugeOption.endAngle;
  }
  let splitAngle = totalAngle / gaugeOption.splitLine.splitNumber;
  let totalNumber = gaugeOption.endNumber - gaugeOption.startNumber;
  let splitNumber = totalNumber / gaugeOption.splitLine.splitNumber;
  let nowAngle = gaugeOption.startAngle;
  let nowNumber = gaugeOption.startNumber;
  for (let i = 0; i < gaugeOption.splitLine.splitNumber + 1; i++) {
    var pos = {
      x: radius * Math.cos(nowAngle * Math.PI),
      y: radius * Math.sin(nowAngle * Math.PI)
    };
    var labelText = gaugeOption.formatter ? gaugeOption.formatter(nowNumber, i, opts) : nowNumber;
    pos.x += centerPosition.x - measureText(labelText, config2.fontSize, context) / 2;
    pos.y += centerPosition.y;
    var startX = pos.x;
    var startY = pos.y;
    context.beginPath();
    context.setFontSize(config2.fontSize);
    context.setFillStyle(gaugeOption.labelColor || opts.fontColor);
    context.fillText(labelText, startX, startY + config2.fontSize / 2);
    context.closePath();
    context.stroke();
    nowAngle += splitAngle;
    if (nowAngle >= 2) {
      nowAngle = nowAngle % 2;
    }
    nowNumber += splitNumber;
  }
}
function drawRadarLabel(angleList, radius, centerPosition, opts, config2, context) {
  var radarOption = opts.extra.radar || {};
  angleList.forEach(function(angle, index2) {
    if (radarOption.labelPointShow === true && opts.categories[index2] !== "") {
      var posPoint = {
        x: radius * Math.cos(angle),
        y: radius * Math.sin(angle)
      };
      var posPointAxis = convertCoordinateOrigin(posPoint.x, posPoint.y, centerPosition);
      context.setFillStyle(radarOption.labelPointColor);
      context.beginPath();
      context.arc(posPointAxis.x, posPointAxis.y, radarOption.labelPointRadius * opts.pix, 0, 2 * Math.PI, false);
      context.closePath();
      context.fill();
    }
    if (radarOption.labelShow === true) {
      var pos = {
        x: (radius + config2.radarLabelTextMargin * opts.pix) * Math.cos(angle),
        y: (radius + config2.radarLabelTextMargin * opts.pix) * Math.sin(angle)
      };
      var posRelativeCanvas = convertCoordinateOrigin(pos.x, pos.y, centerPosition);
      var startX = posRelativeCanvas.x;
      var startY = posRelativeCanvas.y;
      if (util.approximatelyEqual(pos.x, 0)) {
        startX -= measureText(opts.categories[index2] || "", config2.fontSize, context) / 2;
      } else if (pos.x < 0) {
        startX -= measureText(opts.categories[index2] || "", config2.fontSize, context);
      }
      context.beginPath();
      context.setFontSize(config2.fontSize);
      context.setFillStyle(radarOption.labelColor || opts.fontColor);
      context.fillText(opts.categories[index2] || "", startX, startY + config2.fontSize / 2);
      context.closePath();
      context.stroke();
    }
  });
}
function drawPieText(series, opts, config2, context, radius, center) {
  var lineRadius = config2.pieChartLinePadding;
  var textObjectCollection = [];
  var lastTextObject = null;
  var seriesConvert = series.map(function(item, index2) {
    var text = item.formatter ? item.formatter(item, index2, series, opts) : util.toFixed(item._proportion_.toFixed(4) * 100) + "%";
    text = item.labelText ? item.labelText : text;
    var arc = 2 * Math.PI - (item._start_ + 2 * Math.PI * item._proportion_ / 2);
    if (item._rose_proportion_) {
      arc = 2 * Math.PI - (item._start_ + 2 * Math.PI * item._rose_proportion_ / 2);
    }
    var color = item.color;
    var radius2 = item._radius_;
    return {
      arc,
      text,
      color,
      radius: radius2,
      textColor: item.textColor,
      textSize: item.textSize,
      labelShow: item.labelShow
    };
  });
  for (let i = 0; i < seriesConvert.length; i++) {
    let item = seriesConvert[i];
    let orginX1 = Math.cos(item.arc) * (item.radius + lineRadius);
    let orginY1 = Math.sin(item.arc) * (item.radius + lineRadius);
    let orginX2 = Math.cos(item.arc) * item.radius;
    let orginY2 = Math.sin(item.arc) * item.radius;
    let orginX3 = orginX1 >= 0 ? orginX1 + config2.pieChartTextPadding : orginX1 - config2.pieChartTextPadding;
    let orginY3 = orginY1;
    let textWidth = measureText(item.text, item.textSize * opts.pix || config2.fontSize, context);
    let startY = orginY3;
    if (lastTextObject && util.isSameXCoordinateArea(lastTextObject.start, {
      x: orginX3
    })) {
      if (orginX3 > 0) {
        startY = Math.min(orginY3, lastTextObject.start.y);
      } else if (orginX1 < 0) {
        startY = Math.max(orginY3, lastTextObject.start.y);
      } else {
        if (orginY3 > 0) {
          startY = Math.max(orginY3, lastTextObject.start.y);
        } else {
          startY = Math.min(orginY3, lastTextObject.start.y);
        }
      }
    }
    if (orginX3 < 0) {
      orginX3 -= textWidth;
    }
    let textObject = {
      lineStart: {
        x: orginX2,
        y: orginY2
      },
      lineEnd: {
        x: orginX1,
        y: orginY1
      },
      start: {
        x: orginX3,
        y: startY
      },
      width: textWidth,
      height: config2.fontSize,
      text: item.text,
      color: item.color,
      textColor: item.textColor,
      textSize: item.textSize
    };
    lastTextObject = avoidCollision(textObject, lastTextObject);
    textObjectCollection.push(lastTextObject);
  }
  for (let i = 0; i < textObjectCollection.length; i++) {
    if (seriesConvert[i].labelShow === false) {
      continue;
    }
    let item = textObjectCollection[i];
    let lineStartPoistion = convertCoordinateOrigin(item.lineStart.x, item.lineStart.y, center);
    let lineEndPoistion = convertCoordinateOrigin(item.lineEnd.x, item.lineEnd.y, center);
    let textPosition = convertCoordinateOrigin(item.start.x, item.start.y, center);
    context.setLineWidth(1 * opts.pix);
    context.setFontSize(item.textSize * opts.pix || config2.fontSize);
    context.beginPath();
    context.setStrokeStyle(item.color);
    context.setFillStyle(item.color);
    context.moveTo(lineStartPoistion.x, lineStartPoistion.y);
    let curveStartX = item.start.x < 0 ? textPosition.x + item.width : textPosition.x;
    let textStartX = item.start.x < 0 ? textPosition.x - 5 : textPosition.x + 5;
    context.quadraticCurveTo(lineEndPoistion.x, lineEndPoistion.y, curveStartX, textPosition.y);
    context.moveTo(lineStartPoistion.x, lineStartPoistion.y);
    context.stroke();
    context.closePath();
    context.beginPath();
    context.moveTo(textPosition.x + item.width, textPosition.y);
    context.arc(curveStartX, textPosition.y, 2 * opts.pix, 0, 2 * Math.PI);
    context.closePath();
    context.fill();
    context.beginPath();
    context.setFontSize(item.textSize * opts.pix || config2.fontSize);
    context.setFillStyle(item.textColor || opts.fontColor);
    context.fillText(item.text, textStartX, textPosition.y + 3);
    context.closePath();
    context.stroke();
    context.closePath();
  }
}
function drawToolTipSplitLine(offsetX, opts, config2, context) {
  var toolTipOption = opts.extra.tooltip || {};
  toolTipOption.gridType = toolTipOption.gridType == void 0 ? "solid" : toolTipOption.gridType;
  toolTipOption.dashLength = toolTipOption.dashLength == void 0 ? 4 : toolTipOption.dashLength;
  var startY = opts.area[0];
  var endY = opts.height - opts.area[2];
  if (toolTipOption.gridType == "dash") {
    context.setLineDash([toolTipOption.dashLength, toolTipOption.dashLength]);
  }
  context.setStrokeStyle(toolTipOption.gridColor || "#cccccc");
  context.setLineWidth(1 * opts.pix);
  context.beginPath();
  context.moveTo(offsetX, startY);
  context.lineTo(offsetX, endY);
  context.stroke();
  context.setLineDash([]);
  if (toolTipOption.xAxisLabel) {
    let labelText = opts.categories[opts.tooltip.index];
    context.setFontSize(config2.fontSize);
    let textWidth = measureText(labelText, config2.fontSize, context);
    let textX = offsetX - 0.5 * textWidth;
    let textY = endY + 2 * opts.pix;
    context.beginPath();
    context.setFillStyle(hexToRgb(toolTipOption.labelBgColor || config2.toolTipBackground, toolTipOption.labelBgOpacity || config2.toolTipOpacity));
    context.setStrokeStyle(toolTipOption.labelBgColor || config2.toolTipBackground);
    context.setLineWidth(1 * opts.pix);
    context.rect(textX - toolTipOption.boxPadding * opts.pix, textY, textWidth + 2 * toolTipOption.boxPadding * opts.pix, config2.fontSize + 2 * toolTipOption.boxPadding * opts.pix);
    context.closePath();
    context.stroke();
    context.fill();
    context.beginPath();
    context.setFontSize(config2.fontSize);
    context.setFillStyle(toolTipOption.labelFontColor || opts.fontColor);
    context.fillText(String(labelText), textX, textY + toolTipOption.boxPadding * opts.pix + config2.fontSize);
    context.closePath();
    context.stroke();
  }
}
function drawMarkLine(opts, config2, context) {
  let markLineOption = assign({}, {
    type: "solid",
    dashLength: 4,
    data: []
  }, opts.extra.markLine);
  let startX = opts.area[3];
  let endX = opts.width - opts.area[1];
  let points = calMarkLineData(markLineOption.data, opts);
  for (let i = 0; i < points.length; i++) {
    let item = assign({}, {
      lineColor: "#DE4A42",
      showLabel: false,
      labelFontSize: 13,
      labelPadding: 6,
      labelFontColor: "#666666",
      labelBgColor: "#DFE8FF",
      labelBgOpacity: 0.8,
      labelAlign: "left",
      labelOffsetX: 0,
      labelOffsetY: 0
    }, points[i]);
    if (markLineOption.type == "dash") {
      context.setLineDash([markLineOption.dashLength, markLineOption.dashLength]);
    }
    context.setStrokeStyle(item.lineColor);
    context.setLineWidth(1 * opts.pix);
    context.beginPath();
    context.moveTo(startX, item.y);
    context.lineTo(endX, item.y);
    context.stroke();
    context.setLineDash([]);
    if (item.showLabel) {
      let fontSize = item.labelFontSize * opts.pix;
      let labelText = item.labelText ? item.labelText : item.value;
      context.setFontSize(fontSize);
      let textWidth = measureText(labelText, fontSize, context);
      let bgWidth = textWidth + item.labelPadding * opts.pix * 2;
      let bgStartX = item.labelAlign == "left" ? opts.area[3] - bgWidth : opts.width - opts.area[1];
      bgStartX += item.labelOffsetX;
      let bgStartY = item.y - 0.5 * fontSize - item.labelPadding * opts.pix;
      bgStartY += item.labelOffsetY;
      let textX = bgStartX + item.labelPadding * opts.pix;
      item.y;
      context.setFillStyle(hexToRgb(item.labelBgColor, item.labelBgOpacity));
      context.setStrokeStyle(item.labelBgColor);
      context.setLineWidth(1 * opts.pix);
      context.beginPath();
      context.rect(bgStartX, bgStartY, bgWidth, fontSize + 2 * item.labelPadding * opts.pix);
      context.closePath();
      context.stroke();
      context.fill();
      context.setFontSize(fontSize);
      context.setTextAlign("left");
      context.setFillStyle(item.labelFontColor);
      context.fillText(String(labelText), textX, bgStartY + fontSize + item.labelPadding * opts.pix / 2);
      context.stroke();
      context.setTextAlign("left");
    }
  }
}
function drawToolTipHorizentalLine(opts, config2, context, eachSpacing, xAxisPoints) {
  var toolTipOption = assign({}, {
    gridType: "solid",
    dashLength: 4
  }, opts.extra.tooltip);
  var startX = opts.area[3];
  var endX = opts.width - opts.area[1];
  if (toolTipOption.gridType == "dash") {
    context.setLineDash([toolTipOption.dashLength, toolTipOption.dashLength]);
  }
  context.setStrokeStyle(toolTipOption.gridColor || "#cccccc");
  context.setLineWidth(1 * opts.pix);
  context.beginPath();
  context.moveTo(startX, opts.tooltip.offset.y);
  context.lineTo(endX, opts.tooltip.offset.y);
  context.stroke();
  context.setLineDash([]);
  if (toolTipOption.yAxisLabel) {
    let boxPadding = toolTipOption.boxPadding * opts.pix;
    let labelText = calTooltipYAxisData(opts.tooltip.offset.y, opts.series, opts);
    let widthArr = opts.chartData.yAxisData.yAxisWidth;
    let tStartLeft = opts.area[3];
    let tStartRight = opts.width - opts.area[1];
    for (let i = 0; i < labelText.length; i++) {
      context.setFontSize(toolTipOption.fontSize * opts.pix);
      let textWidth = measureText(labelText[i], toolTipOption.fontSize * opts.pix, context);
      let bgStartX, bgEndX, bgWidth;
      if (widthArr[i].position == "left") {
        bgStartX = tStartLeft - (textWidth + boxPadding * 2) - 2 * opts.pix;
        bgEndX = Math.max(bgStartX, bgStartX + textWidth + boxPadding * 2);
      } else {
        bgStartX = tStartRight + 2 * opts.pix;
        bgEndX = Math.max(bgStartX + widthArr[i].width, bgStartX + textWidth + boxPadding * 2);
      }
      bgWidth = bgEndX - bgStartX;
      let textX = bgStartX + (bgWidth - textWidth) / 2;
      let textY = opts.tooltip.offset.y;
      context.beginPath();
      context.setFillStyle(hexToRgb(toolTipOption.labelBgColor || config2.toolTipBackground, toolTipOption.labelBgOpacity || config2.toolTipOpacity));
      context.setStrokeStyle(toolTipOption.labelBgColor || config2.toolTipBackground);
      context.setLineWidth(1 * opts.pix);
      context.rect(bgStartX, textY - 0.5 * config2.fontSize - boxPadding, bgWidth, config2.fontSize + 2 * boxPadding);
      context.closePath();
      context.stroke();
      context.fill();
      context.beginPath();
      context.setFontSize(config2.fontSize);
      context.setFillStyle(toolTipOption.labelFontColor || opts.fontColor);
      context.fillText(labelText[i], textX, textY + 0.5 * config2.fontSize);
      context.closePath();
      context.stroke();
      if (widthArr[i].position == "left") {
        tStartLeft -= widthArr[i].width + opts.yAxis.padding * opts.pix;
      } else {
        tStartRight += widthArr[i].width + opts.yAxis.padding * opts.pix;
      }
    }
  }
}
function drawToolTipSplitArea(offsetX, opts, config2, context, eachSpacing) {
  var toolTipOption = assign({}, {
    activeBgColor: "#000000",
    activeBgOpacity: 0.08,
    activeWidth: eachSpacing
  }, opts.extra.column);
  toolTipOption.activeWidth = toolTipOption.activeWidth > eachSpacing ? eachSpacing : toolTipOption.activeWidth;
  var startY = opts.area[0];
  var endY = opts.height - opts.area[2];
  context.beginPath();
  context.setFillStyle(hexToRgb(toolTipOption.activeBgColor, toolTipOption.activeBgOpacity));
  context.rect(offsetX - toolTipOption.activeWidth / 2, startY, toolTipOption.activeWidth, endY - startY);
  context.closePath();
  context.fill();
  context.setFillStyle("#FFFFFF");
}
function drawBarToolTipSplitArea(offsetX, opts, config2, context, eachSpacing) {
  var toolTipOption = assign({}, {
    activeBgColor: "#000000",
    activeBgOpacity: 0.08
  }, opts.extra.bar);
  var startX = opts.area[3];
  var endX = opts.width - opts.area[1];
  context.beginPath();
  context.setFillStyle(hexToRgb(toolTipOption.activeBgColor, toolTipOption.activeBgOpacity));
  context.rect(startX, offsetX - eachSpacing / 2, endX - startX, eachSpacing);
  context.closePath();
  context.fill();
  context.setFillStyle("#FFFFFF");
}
function drawToolTip(textList, offset, opts, config2, context, eachSpacing, xAxisPoints) {
  var toolTipOption = assign({}, {
    showBox: true,
    showArrow: true,
    showCategory: false,
    bgColor: "#000000",
    bgOpacity: 0.7,
    borderColor: "#000000",
    borderWidth: 0,
    borderRadius: 0,
    borderOpacity: 0.7,
    boxPadding: 3,
    fontColor: "#FFFFFF",
    fontSize: 13,
    lineHeight: 20,
    legendShow: true,
    legendShape: "auto",
    splitLine: true
  }, opts.extra.tooltip);
  if (toolTipOption.showCategory == true && opts.categories) {
    textList.unshift({ text: opts.categories[opts.tooltip.index], color: null });
  }
  var fontSize = toolTipOption.fontSize * opts.pix;
  var lineHeight = toolTipOption.lineHeight * opts.pix;
  var boxPadding = toolTipOption.boxPadding * opts.pix;
  var legendWidth = fontSize;
  var legendMarginRight = 5 * opts.pix;
  if (toolTipOption.legendShow == false) {
    legendWidth = 0;
    legendMarginRight = 0;
  }
  var arrowWidth = toolTipOption.showArrow ? 8 * opts.pix : 0;
  var isOverRightBorder = false;
  if (opts.type == "line" || opts.type == "mount" || opts.type == "area" || opts.type == "candle" || opts.type == "mix") {
    if (toolTipOption.splitLine == true) {
      drawToolTipSplitLine(opts.tooltip.offset.x, opts, config2, context);
    }
  }
  offset = assign({
    x: 0,
    y: 0
  }, offset);
  offset.y -= 8 * opts.pix;
  var textWidth = textList.map(function(item) {
    return measureText(item.text, fontSize, context);
  });
  var toolTipWidth = legendWidth + legendMarginRight + 4 * boxPadding + Math.max.apply(null, textWidth);
  var toolTipHeight = 2 * boxPadding + textList.length * lineHeight;
  if (toolTipOption.showBox == false) {
    return;
  }
  if (offset.x - Math.abs(opts._scrollDistance_ || 0) + arrowWidth + toolTipWidth > opts.width) {
    isOverRightBorder = true;
  }
  if (toolTipHeight + offset.y > opts.height) {
    offset.y = opts.height - toolTipHeight;
  }
  context.beginPath();
  context.setFillStyle(hexToRgb(toolTipOption.bgColor, toolTipOption.bgOpacity));
  context.setLineWidth(toolTipOption.borderWidth * opts.pix);
  context.setStrokeStyle(hexToRgb(toolTipOption.borderColor, toolTipOption.borderOpacity));
  var radius = toolTipOption.borderRadius;
  if (isOverRightBorder) {
    if (toolTipWidth + arrowWidth > opts.width) {
      offset.x = opts.width + Math.abs(opts._scrollDistance_ || 0) + arrowWidth + (toolTipWidth - opts.width);
    }
    if (toolTipWidth > offset.x) {
      offset.x = opts.width + Math.abs(opts._scrollDistance_ || 0) + arrowWidth + (toolTipWidth - opts.width);
    }
    if (toolTipOption.showArrow) {
      context.moveTo(offset.x, offset.y + 10 * opts.pix);
      context.lineTo(offset.x - arrowWidth, offset.y + 10 * opts.pix + 5 * opts.pix);
    }
    context.arc(offset.x - arrowWidth - radius, offset.y + toolTipHeight - radius, radius, 0, Math.PI / 2, false);
    context.arc(
      offset.x - arrowWidth - Math.round(toolTipWidth) + radius,
      offset.y + toolTipHeight - radius,
      radius,
      Math.PI / 2,
      Math.PI,
      false
    );
    context.arc(offset.x - arrowWidth - Math.round(toolTipWidth) + radius, offset.y + radius, radius, -Math.PI, -Math.PI / 2, false);
    context.arc(offset.x - arrowWidth - radius, offset.y + radius, radius, -Math.PI / 2, 0, false);
    if (toolTipOption.showArrow) {
      context.lineTo(offset.x - arrowWidth, offset.y + 10 * opts.pix - 5 * opts.pix);
      context.lineTo(offset.x, offset.y + 10 * opts.pix);
    }
  } else {
    if (toolTipOption.showArrow) {
      context.moveTo(offset.x, offset.y + 10 * opts.pix);
      context.lineTo(offset.x + arrowWidth, offset.y + 10 * opts.pix - 5 * opts.pix);
    }
    context.arc(offset.x + arrowWidth + radius, offset.y + radius, radius, -Math.PI, -Math.PI / 2, false);
    context.arc(
      offset.x + arrowWidth + Math.round(toolTipWidth) - radius,
      offset.y + radius,
      radius,
      -Math.PI / 2,
      0,
      false
    );
    context.arc(
      offset.x + arrowWidth + Math.round(toolTipWidth) - radius,
      offset.y + toolTipHeight - radius,
      radius,
      0,
      Math.PI / 2,
      false
    );
    context.arc(offset.x + arrowWidth + radius, offset.y + toolTipHeight - radius, radius, Math.PI / 2, Math.PI, false);
    if (toolTipOption.showArrow) {
      context.lineTo(offset.x + arrowWidth, offset.y + 10 * opts.pix + 5 * opts.pix);
      context.lineTo(offset.x, offset.y + 10 * opts.pix);
    }
  }
  context.closePath();
  context.fill();
  if (toolTipOption.borderWidth > 0) {
    context.stroke();
  }
  if (toolTipOption.legendShow) {
    textList.forEach(function(item, index2) {
      if (item.color !== null) {
        context.beginPath();
        context.setFillStyle(item.color);
        var startX = offset.x + arrowWidth + 2 * boxPadding;
        var startY = offset.y + (lineHeight - fontSize) / 2 + lineHeight * index2 + boxPadding + 1;
        if (isOverRightBorder) {
          startX = offset.x - toolTipWidth - arrowWidth + 2 * boxPadding;
        }
        switch (item.legendShape) {
          case "line":
            context.moveTo(startX, startY + 0.5 * legendWidth - 2 * opts.pix);
            context.fillRect(startX, startY + 0.5 * legendWidth - 2 * opts.pix, legendWidth, 4 * opts.pix);
            break;
          case "triangle":
            context.moveTo(startX + 7.5 * opts.pix, startY + 0.5 * legendWidth - 5 * opts.pix);
            context.lineTo(startX + 2.5 * opts.pix, startY + 0.5 * legendWidth + 5 * opts.pix);
            context.lineTo(startX + 12.5 * opts.pix, startY + 0.5 * legendWidth + 5 * opts.pix);
            context.lineTo(startX + 7.5 * opts.pix, startY + 0.5 * legendWidth - 5 * opts.pix);
            break;
          case "diamond":
            context.moveTo(startX + 7.5 * opts.pix, startY + 0.5 * legendWidth - 5 * opts.pix);
            context.lineTo(startX + 2.5 * opts.pix, startY + 0.5 * legendWidth);
            context.lineTo(startX + 7.5 * opts.pix, startY + 0.5 * legendWidth + 5 * opts.pix);
            context.lineTo(startX + 12.5 * opts.pix, startY + 0.5 * legendWidth);
            context.lineTo(startX + 7.5 * opts.pix, startY + 0.5 * legendWidth - 5 * opts.pix);
            break;
          case "circle":
            context.moveTo(startX + 7.5 * opts.pix, startY + 0.5 * legendWidth);
            context.arc(startX + 7.5 * opts.pix, startY + 0.5 * legendWidth, 5 * opts.pix, 0, 2 * Math.PI);
            break;
          case "rect":
            context.moveTo(startX, startY + 0.5 * legendWidth - 5 * opts.pix);
            context.fillRect(startX, startY + 0.5 * legendWidth - 5 * opts.pix, 15 * opts.pix, 10 * opts.pix);
            break;
          case "square":
            context.moveTo(startX + 2 * opts.pix, startY + 0.5 * legendWidth - 5 * opts.pix);
            context.fillRect(startX + 2 * opts.pix, startY + 0.5 * legendWidth - 5 * opts.pix, 10 * opts.pix, 10 * opts.pix);
            break;
          default:
            context.moveTo(startX, startY + 0.5 * legendWidth - 5 * opts.pix);
            context.fillRect(startX, startY + 0.5 * legendWidth - 5 * opts.pix, 15 * opts.pix, 10 * opts.pix);
        }
        context.closePath();
        context.fill();
      }
    });
  }
  textList.forEach(function(item, index2) {
    var startX = offset.x + arrowWidth + 2 * boxPadding + legendWidth + legendMarginRight;
    if (isOverRightBorder) {
      startX = offset.x - toolTipWidth - arrowWidth + 2 * boxPadding + legendWidth + legendMarginRight;
    }
    var startY = offset.y + lineHeight * index2 + (lineHeight - fontSize) / 2 - 1 + boxPadding + fontSize;
    context.beginPath();
    context.setFontSize(fontSize);
    context.setTextBaseline("normal");
    context.setFillStyle(toolTipOption.fontColor);
    context.fillText(item.text, startX, startY);
    context.closePath();
    context.stroke();
  });
}
function drawColumnDataPoints(series, opts, config2, context) {
  let process = arguments.length > 4 && arguments[4] !== void 0 ? arguments[4] : 1;
  let xAxisData = opts.chartData.xAxisData, xAxisPoints = xAxisData.xAxisPoints, eachSpacing = xAxisData.eachSpacing;
  let columnOption = assign({}, {
    type: "group",
    width: eachSpacing / 2,
    meterBorder: 4,
    meterFillColor: "#FFFFFF",
    barBorderCircle: false,
    barBorderRadius: [],
    seriesGap: 2,
    linearType: "none",
    linearOpacity: 1,
    customColor: [],
    colorStop: 0,
    labelPosition: "outside"
  }, opts.extra.column);
  let calPoints = [];
  context.save();
  let leftNum = -2;
  let rightNum = xAxisPoints.length + 2;
  if (opts._scrollDistance_ && opts._scrollDistance_ !== 0 && opts.enableScroll === true) {
    context.translate(opts._scrollDistance_, 0);
    leftNum = Math.floor(-opts._scrollDistance_ / eachSpacing) - 2;
    rightNum = leftNum + opts.xAxis.itemCount + 4;
  }
  if (opts.tooltip && opts.tooltip.textList && opts.tooltip.textList.length && process === 1) {
    drawToolTipSplitArea(opts.tooltip.offset.x, opts, config2, context, eachSpacing);
  }
  columnOption.customColor = fillCustomColor(columnOption.linearType, columnOption.customColor, series, config2);
  series.forEach(function(eachSeries, seriesIndex) {
    let ranges, minRange, maxRange;
    ranges = [].concat(opts.chartData.yAxisData.ranges[eachSeries.index]);
    minRange = ranges.pop();
    maxRange = ranges.shift();
    let spacingValid = opts.height - opts.area[0] - opts.area[2];
    let zeroHeight = spacingValid * (0 - minRange) / (maxRange - minRange);
    let zeroPoints = opts.height - Math.round(zeroHeight) - opts.area[2];
    eachSeries.zeroPoints = zeroPoints;
    var data = eachSeries.data;
    switch (columnOption.type) {
      case "group":
        var points = getColumnDataPoints(data, minRange, maxRange, xAxisPoints, eachSpacing, opts, config2, zeroPoints, process);
        var tooltipPoints = getStackDataPoints(data, minRange, maxRange, xAxisPoints, eachSpacing, opts, config2, seriesIndex, series, process);
        calPoints.push(tooltipPoints);
        points = fixColumeData(points, eachSpacing, series.length, seriesIndex, config2, opts);
        for (let i = 0; i < points.length; i++) {
          let item = points[i];
          if (item !== null && i > leftNum && i < rightNum) {
            var startX = item.x - item.width / 2;
            var height = opts.height - item.y - opts.area[2];
            context.beginPath();
            var fillColor = item.color || eachSeries.color;
            var strokeColor = item.color || eachSeries.color;
            if (columnOption.linearType !== "none") {
              var grd = context.createLinearGradient(startX, item.y, startX, zeroPoints);
              if (columnOption.linearType == "opacity") {
                grd.addColorStop(0, hexToRgb(fillColor, columnOption.linearOpacity));
                grd.addColorStop(1, hexToRgb(fillColor, 1));
              } else {
                grd.addColorStop(0, hexToRgb(columnOption.customColor[eachSeries.linearIndex], columnOption.linearOpacity));
                grd.addColorStop(columnOption.colorStop, hexToRgb(columnOption.customColor[eachSeries.linearIndex], columnOption.linearOpacity));
                grd.addColorStop(1, hexToRgb(fillColor, 1));
              }
              fillColor = grd;
            }
            if (columnOption.barBorderRadius && columnOption.barBorderRadius.length === 4 || columnOption.barBorderCircle === true) {
              const left = startX;
              const top = item.y > zeroPoints ? zeroPoints : item.y;
              const width = item.width;
              const height2 = Math.abs(zeroPoints - item.y);
              if (columnOption.barBorderCircle) {
                columnOption.barBorderRadius = [width / 2, width / 2, 0, 0];
              }
              if (item.y > zeroPoints) {
                columnOption.barBorderRadius = [0, 0, width / 2, width / 2];
              }
              let [r0, r1, r2, r3] = columnOption.barBorderRadius;
              let minRadius = Math.min(width / 2, height2 / 2);
              r0 = r0 > minRadius ? minRadius : r0;
              r1 = r1 > minRadius ? minRadius : r1;
              r2 = r2 > minRadius ? minRadius : r2;
              r3 = r3 > minRadius ? minRadius : r3;
              r0 = r0 < 0 ? 0 : r0;
              r1 = r1 < 0 ? 0 : r1;
              r2 = r2 < 0 ? 0 : r2;
              r3 = r3 < 0 ? 0 : r3;
              context.arc(left + r0, top + r0, r0, -Math.PI, -Math.PI / 2);
              context.arc(left + width - r1, top + r1, r1, -Math.PI / 2, 0);
              context.arc(left + width - r2, top + height2 - r2, r2, 0, Math.PI / 2);
              context.arc(left + r3, top + height2 - r3, r3, Math.PI / 2, Math.PI);
            } else {
              context.moveTo(startX, item.y);
              context.lineTo(startX + item.width, item.y);
              context.lineTo(startX + item.width, zeroPoints);
              context.lineTo(startX, zeroPoints);
              context.lineTo(startX, item.y);
              context.setLineWidth(1);
              context.setStrokeStyle(strokeColor);
            }
            context.setFillStyle(fillColor);
            context.closePath();
            context.fill();
          }
        }
        break;
      case "stack":
        var points = getStackDataPoints(data, minRange, maxRange, xAxisPoints, eachSpacing, opts, config2, seriesIndex, series, process);
        calPoints.push(points);
        points = fixColumeStackData(points, eachSpacing, series.length, seriesIndex, config2, opts);
        for (let i = 0; i < points.length; i++) {
          let item = points[i];
          if (item !== null && i > leftNum && i < rightNum) {
            context.beginPath();
            var fillColor = item.color || eachSeries.color;
            var startX = item.x - item.width / 2 + 1;
            var height = opts.height - item.y - opts.area[2];
            var height0 = opts.height - item.y0 - opts.area[2];
            if (seriesIndex > 0) {
              height -= height0;
            }
            context.setFillStyle(fillColor);
            context.moveTo(startX, item.y);
            context.fillRect(startX, item.y, item.width, height);
            context.closePath();
            context.fill();
          }
        }
        break;
      case "meter":
        var points = getDataPoints(data, minRange, maxRange, xAxisPoints, eachSpacing, opts, config2, process);
        calPoints.push(points);
        points = fixColumeMeterData(points, eachSpacing, series.length, seriesIndex, config2, opts, columnOption.meterBorder);
        for (let i = 0; i < points.length; i++) {
          let item = points[i];
          if (item !== null && i > leftNum && i < rightNum) {
            context.beginPath();
            if (seriesIndex == 0 && columnOption.meterBorder > 0) {
              context.setStrokeStyle(eachSeries.color);
              context.setLineWidth(columnOption.meterBorder * opts.pix);
            }
            if (seriesIndex == 0) {
              context.setFillStyle(columnOption.meterFillColor);
            } else {
              context.setFillStyle(item.color || eachSeries.color);
            }
            var startX = item.x - item.width / 2;
            var height = opts.height - item.y - opts.area[2];
            if (columnOption.barBorderRadius && columnOption.barBorderRadius.length === 4 || columnOption.barBorderCircle === true) {
              const left = startX;
              const top = item.y;
              const width = item.width;
              const height2 = zeroPoints - item.y;
              if (columnOption.barBorderCircle) {
                columnOption.barBorderRadius = [width / 2, width / 2, 0, 0];
              }
              let [r0, r1, r2, r3] = columnOption.barBorderRadius;
              let minRadius = Math.min(width / 2, height2 / 2);
              r0 = r0 > minRadius ? minRadius : r0;
              r1 = r1 > minRadius ? minRadius : r1;
              r2 = r2 > minRadius ? minRadius : r2;
              r3 = r3 > minRadius ? minRadius : r3;
              r0 = r0 < 0 ? 0 : r0;
              r1 = r1 < 0 ? 0 : r1;
              r2 = r2 < 0 ? 0 : r2;
              r3 = r3 < 0 ? 0 : r3;
              context.arc(left + r0, top + r0, r0, -Math.PI, -Math.PI / 2);
              context.arc(left + width - r1, top + r1, r1, -Math.PI / 2, 0);
              context.arc(left + width - r2, top + height2 - r2, r2, 0, Math.PI / 2);
              context.arc(left + r3, top + height2 - r3, r3, Math.PI / 2, Math.PI);
              context.fill();
            } else {
              context.moveTo(startX, item.y);
              context.lineTo(startX + item.width, item.y);
              context.lineTo(startX + item.width, zeroPoints);
              context.lineTo(startX, zeroPoints);
              context.lineTo(startX, item.y);
              context.fill();
            }
            if (seriesIndex == 0 && columnOption.meterBorder > 0) {
              context.closePath();
              context.stroke();
            }
          }
        }
        break;
    }
  });
  if (opts.dataLabel !== false && process === 1) {
    series.forEach(function(eachSeries, seriesIndex) {
      let ranges, minRange, maxRange;
      ranges = [].concat(opts.chartData.yAxisData.ranges[eachSeries.index]);
      minRange = ranges.pop();
      maxRange = ranges.shift();
      var data = eachSeries.data;
      switch (columnOption.type) {
        case "group":
          var points = getColumnDataPoints(data, minRange, maxRange, xAxisPoints, eachSpacing, opts, config2, process);
          points = fixColumeData(points, eachSpacing, series.length, seriesIndex, config2, opts);
          drawColumePointText(points, eachSeries, config2, context, opts);
          break;
        case "stack":
          var points = getStackDataPoints(data, minRange, maxRange, xAxisPoints, eachSpacing, opts, config2, seriesIndex, series, process);
          drawColumePointText(points, eachSeries, config2, context, opts);
          break;
        case "meter":
          var points = getDataPoints(data, minRange, maxRange, xAxisPoints, eachSpacing, opts, config2, process);
          drawColumePointText(points, eachSeries, config2, context, opts);
          break;
      }
    });
  }
  context.restore();
  return {
    xAxisPoints,
    calPoints,
    eachSpacing
  };
}
function drawMountDataPoints(series, opts, config2, context) {
  let process = arguments.length > 4 && arguments[4] !== void 0 ? arguments[4] : 1;
  let xAxisData = opts.chartData.xAxisData, xAxisPoints = xAxisData.xAxisPoints, eachSpacing = xAxisData.eachSpacing;
  let mountOption = assign({}, {
    type: "mount",
    widthRatio: 1,
    borderWidth: 1,
    barBorderCircle: false,
    barBorderRadius: [],
    linearType: "none",
    linearOpacity: 1,
    customColor: [],
    colorStop: 0
  }, opts.extra.mount);
  mountOption.widthRatio = mountOption.widthRatio <= 0 ? 0 : mountOption.widthRatio;
  mountOption.widthRatio = mountOption.widthRatio >= 2 ? 2 : mountOption.widthRatio;
  context.save();
  let leftNum = -2;
  let rightNum = xAxisPoints.length + 2;
  if (opts._scrollDistance_ && opts._scrollDistance_ !== 0 && opts.enableScroll === true) {
    context.translate(opts._scrollDistance_, 0);
    leftNum = Math.floor(-opts._scrollDistance_ / eachSpacing) - 2;
    rightNum = leftNum + opts.xAxis.itemCount + 4;
  }
  mountOption.customColor = fillCustomColor(mountOption.linearType, mountOption.customColor, series, config2);
  let ranges, minRange, maxRange;
  ranges = [].concat(opts.chartData.yAxisData.ranges[0]);
  minRange = ranges.pop();
  maxRange = ranges.shift();
  let spacingValid = opts.height - opts.area[0] - opts.area[2];
  let zeroHeight = spacingValid * (0 - minRange) / (maxRange - minRange);
  let zeroPoints = opts.height - Math.round(zeroHeight) - opts.area[2];
  var points = getMountDataPoints(series, minRange, maxRange, xAxisPoints, eachSpacing, opts, mountOption, zeroPoints, process);
  switch (mountOption.type) {
    case "bar":
      for (let i = 0; i < points.length; i++) {
        let item = points[i];
        if (item !== null && i > leftNum && i < rightNum) {
          var startX = item.x - eachSpacing * mountOption.widthRatio / 2;
          var height = opts.height - item.y - opts.area[2];
          context.beginPath();
          var fillColor = item.color || series[i].color;
          var strokeColor = item.color || series[i].color;
          if (mountOption.linearType !== "none") {
            var grd = context.createLinearGradient(startX, item.y, startX, zeroPoints);
            if (mountOption.linearType == "opacity") {
              grd.addColorStop(0, hexToRgb(fillColor, mountOption.linearOpacity));
              grd.addColorStop(1, hexToRgb(fillColor, 1));
            } else {
              grd.addColorStop(0, hexToRgb(mountOption.customColor[series[i].linearIndex], mountOption.linearOpacity));
              grd.addColorStop(mountOption.colorStop, hexToRgb(mountOption.customColor[series[i].linearIndex], mountOption.linearOpacity));
              grd.addColorStop(1, hexToRgb(fillColor, 1));
            }
            fillColor = grd;
          }
          if (mountOption.barBorderRadius && mountOption.barBorderRadius.length === 4 || mountOption.barBorderCircle === true) {
            const left = startX;
            const top = item.y > zeroPoints ? zeroPoints : item.y;
            const width = item.width;
            const height2 = Math.abs(zeroPoints - item.y);
            if (mountOption.barBorderCircle) {
              mountOption.barBorderRadius = [width / 2, width / 2, 0, 0];
            }
            if (item.y > zeroPoints) {
              mountOption.barBorderRadius = [0, 0, width / 2, width / 2];
            }
            let [r0, r1, r2, r3] = mountOption.barBorderRadius;
            let minRadius = Math.min(width / 2, height2 / 2);
            r0 = r0 > minRadius ? minRadius : r0;
            r1 = r1 > minRadius ? minRadius : r1;
            r2 = r2 > minRadius ? minRadius : r2;
            r3 = r3 > minRadius ? minRadius : r3;
            r0 = r0 < 0 ? 0 : r0;
            r1 = r1 < 0 ? 0 : r1;
            r2 = r2 < 0 ? 0 : r2;
            r3 = r3 < 0 ? 0 : r3;
            context.arc(left + r0, top + r0, r0, -Math.PI, -Math.PI / 2);
            context.arc(left + width - r1, top + r1, r1, -Math.PI / 2, 0);
            context.arc(left + width - r2, top + height2 - r2, r2, 0, Math.PI / 2);
            context.arc(left + r3, top + height2 - r3, r3, Math.PI / 2, Math.PI);
          } else {
            context.moveTo(startX, item.y);
            context.lineTo(startX + item.width, item.y);
            context.lineTo(startX + item.width, zeroPoints);
            context.lineTo(startX, zeroPoints);
            context.lineTo(startX, item.y);
          }
          context.setStrokeStyle(strokeColor);
          context.setFillStyle(fillColor);
          if (mountOption.borderWidth > 0) {
            context.setLineWidth(mountOption.borderWidth * opts.pix);
            context.closePath();
            context.stroke();
          }
          context.fill();
        }
      }
      break;
    case "triangle":
      for (let i = 0; i < points.length; i++) {
        let item = points[i];
        if (item !== null && i > leftNum && i < rightNum) {
          var startX = item.x - eachSpacing * mountOption.widthRatio / 2;
          var height = opts.height - item.y - opts.area[2];
          context.beginPath();
          var fillColor = item.color || series[i].color;
          var strokeColor = item.color || series[i].color;
          if (mountOption.linearType !== "none") {
            var grd = context.createLinearGradient(startX, item.y, startX, zeroPoints);
            if (mountOption.linearType == "opacity") {
              grd.addColorStop(0, hexToRgb(fillColor, mountOption.linearOpacity));
              grd.addColorStop(1, hexToRgb(fillColor, 1));
            } else {
              grd.addColorStop(0, hexToRgb(mountOption.customColor[series[i].linearIndex], mountOption.linearOpacity));
              grd.addColorStop(mountOption.colorStop, hexToRgb(mountOption.customColor[series[i].linearIndex], mountOption.linearOpacity));
              grd.addColorStop(1, hexToRgb(fillColor, 1));
            }
            fillColor = grd;
          }
          context.moveTo(startX, zeroPoints);
          context.lineTo(item.x, item.y);
          context.lineTo(startX + item.width, zeroPoints);
          context.setStrokeStyle(strokeColor);
          context.setFillStyle(fillColor);
          if (mountOption.borderWidth > 0) {
            context.setLineWidth(mountOption.borderWidth * opts.pix);
            context.stroke();
          }
          context.fill();
        }
      }
      break;
    case "mount":
      for (let i = 0; i < points.length; i++) {
        let item = points[i];
        if (item !== null && i > leftNum && i < rightNum) {
          var startX = item.x - eachSpacing * mountOption.widthRatio / 2;
          var height = opts.height - item.y - opts.area[2];
          context.beginPath();
          var fillColor = item.color || series[i].color;
          var strokeColor = item.color || series[i].color;
          if (mountOption.linearType !== "none") {
            var grd = context.createLinearGradient(startX, item.y, startX, zeroPoints);
            if (mountOption.linearType == "opacity") {
              grd.addColorStop(0, hexToRgb(fillColor, mountOption.linearOpacity));
              grd.addColorStop(1, hexToRgb(fillColor, 1));
            } else {
              grd.addColorStop(0, hexToRgb(mountOption.customColor[series[i].linearIndex], mountOption.linearOpacity));
              grd.addColorStop(mountOption.colorStop, hexToRgb(mountOption.customColor[series[i].linearIndex], mountOption.linearOpacity));
              grd.addColorStop(1, hexToRgb(fillColor, 1));
            }
            fillColor = grd;
          }
          context.moveTo(startX, zeroPoints);
          context.bezierCurveTo(item.x - item.width / 4, zeroPoints, item.x - item.width / 4, item.y, item.x, item.y);
          context.bezierCurveTo(item.x + item.width / 4, item.y, item.x + item.width / 4, zeroPoints, startX + item.width, zeroPoints);
          context.setStrokeStyle(strokeColor);
          context.setFillStyle(fillColor);
          if (mountOption.borderWidth > 0) {
            context.setLineWidth(mountOption.borderWidth * opts.pix);
            context.stroke();
          }
          context.fill();
        }
      }
      break;
    case "sharp":
      for (let i = 0; i < points.length; i++) {
        let item = points[i];
        if (item !== null && i > leftNum && i < rightNum) {
          var startX = item.x - eachSpacing * mountOption.widthRatio / 2;
          var height = opts.height - item.y - opts.area[2];
          context.beginPath();
          var fillColor = item.color || series[i].color;
          var strokeColor = item.color || series[i].color;
          if (mountOption.linearType !== "none") {
            var grd = context.createLinearGradient(startX, item.y, startX, zeroPoints);
            if (mountOption.linearType == "opacity") {
              grd.addColorStop(0, hexToRgb(fillColor, mountOption.linearOpacity));
              grd.addColorStop(1, hexToRgb(fillColor, 1));
            } else {
              grd.addColorStop(0, hexToRgb(mountOption.customColor[series[i].linearIndex], mountOption.linearOpacity));
              grd.addColorStop(mountOption.colorStop, hexToRgb(mountOption.customColor[series[i].linearIndex], mountOption.linearOpacity));
              grd.addColorStop(1, hexToRgb(fillColor, 1));
            }
            fillColor = grd;
          }
          context.moveTo(startX, zeroPoints);
          context.quadraticCurveTo(item.x - 0, zeroPoints - height / 4, item.x, item.y);
          context.quadraticCurveTo(item.x + 0, zeroPoints - height / 4, startX + item.width, zeroPoints);
          context.setStrokeStyle(strokeColor);
          context.setFillStyle(fillColor);
          if (mountOption.borderWidth > 0) {
            context.setLineWidth(mountOption.borderWidth * opts.pix);
            context.stroke();
          }
          context.fill();
        }
      }
      break;
  }
  if (opts.dataLabel !== false && process === 1) {
    let ranges2, minRange2, maxRange2;
    ranges2 = [].concat(opts.chartData.yAxisData.ranges[0]);
    minRange2 = ranges2.pop();
    maxRange2 = ranges2.shift();
    var points = getMountDataPoints(series, minRange2, maxRange2, xAxisPoints, eachSpacing, opts, mountOption, zeroPoints, process);
    drawMountPointText(points, series, config2, context, opts, zeroPoints);
  }
  context.restore();
  return {
    xAxisPoints,
    calPoints: points,
    eachSpacing
  };
}
function drawBarDataPoints(series, opts, config2, context) {
  let process = arguments.length > 4 && arguments[4] !== void 0 ? arguments[4] : 1;
  let yAxisPoints = [];
  let eachSpacing = (opts.height - opts.area[0] - opts.area[2]) / opts.categories.length;
  for (let i = 0; i < opts.categories.length; i++) {
    yAxisPoints.push(opts.area[0] + eachSpacing / 2 + eachSpacing * i);
  }
  let columnOption = assign({}, {
    type: "group",
    width: eachSpacing / 2,
    meterBorder: 4,
    meterFillColor: "#FFFFFF",
    barBorderCircle: false,
    barBorderRadius: [],
    seriesGap: 2,
    linearType: "none",
    linearOpacity: 1,
    customColor: [],
    colorStop: 0
  }, opts.extra.bar);
  let calPoints = [];
  context.save();
  let leftNum = -2;
  let rightNum = yAxisPoints.length + 2;
  if (opts.tooltip && opts.tooltip.textList && opts.tooltip.textList.length && process === 1) {
    drawBarToolTipSplitArea(opts.tooltip.offset.y, opts, config2, context, eachSpacing);
  }
  columnOption.customColor = fillCustomColor(columnOption.linearType, columnOption.customColor, series, config2);
  series.forEach(function(eachSeries, seriesIndex) {
    let ranges, minRange, maxRange;
    ranges = [].concat(opts.chartData.xAxisData.ranges);
    maxRange = ranges.pop();
    minRange = ranges.shift();
    var data = eachSeries.data;
    switch (columnOption.type) {
      case "group":
        var points = getBarDataPoints(data, minRange, maxRange, yAxisPoints, eachSpacing, opts, config2, process);
        var tooltipPoints = getBarStackDataPoints(data, minRange, maxRange, yAxisPoints, eachSpacing, opts, config2, seriesIndex, series, process);
        calPoints.push(tooltipPoints);
        points = fixBarData(points, eachSpacing, series.length, seriesIndex, config2, opts);
        for (let i = 0; i < points.length; i++) {
          let item = points[i];
          if (item !== null && i > leftNum && i < rightNum) {
            var startX = opts.area[3];
            var startY = item.y - item.width / 2;
            item.height;
            context.beginPath();
            var fillColor = item.color || eachSeries.color;
            var strokeColor = item.color || eachSeries.color;
            if (columnOption.linearType !== "none") {
              var grd = context.createLinearGradient(startX, item.y, item.x, item.y);
              if (columnOption.linearType == "opacity") {
                grd.addColorStop(0, hexToRgb(fillColor, columnOption.linearOpacity));
                grd.addColorStop(1, hexToRgb(fillColor, 1));
              } else {
                grd.addColorStop(0, hexToRgb(columnOption.customColor[eachSeries.linearIndex], columnOption.linearOpacity));
                grd.addColorStop(columnOption.colorStop, hexToRgb(columnOption.customColor[eachSeries.linearIndex], columnOption.linearOpacity));
                grd.addColorStop(1, hexToRgb(fillColor, 1));
              }
              fillColor = grd;
            }
            if (columnOption.barBorderRadius && columnOption.barBorderRadius.length === 4 || columnOption.barBorderCircle === true) {
              const left = startX;
              const width = item.width;
              const top = item.y - item.width / 2;
              const height = item.height;
              if (columnOption.barBorderCircle) {
                columnOption.barBorderRadius = [width / 2, width / 2, 0, 0];
              }
              let [r0, r1, r2, r3] = columnOption.barBorderRadius;
              let minRadius = Math.min(width / 2, height / 2);
              r0 = r0 > minRadius ? minRadius : r0;
              r1 = r1 > minRadius ? minRadius : r1;
              r2 = r2 > minRadius ? minRadius : r2;
              r3 = r3 > minRadius ? minRadius : r3;
              r0 = r0 < 0 ? 0 : r0;
              r1 = r1 < 0 ? 0 : r1;
              r2 = r2 < 0 ? 0 : r2;
              r3 = r3 < 0 ? 0 : r3;
              context.arc(left + r3, top + r3, r3, -Math.PI, -Math.PI / 2);
              context.arc(item.x - r0, top + r0, r0, -Math.PI / 2, 0);
              context.arc(item.x - r1, top + width - r1, r1, 0, Math.PI / 2);
              context.arc(left + r2, top + width - r2, r2, Math.PI / 2, Math.PI);
            } else {
              context.moveTo(startX, startY);
              context.lineTo(item.x, startY);
              context.lineTo(item.x, startY + item.width);
              context.lineTo(startX, startY + item.width);
              context.lineTo(startX, startY);
              context.setLineWidth(1);
              context.setStrokeStyle(strokeColor);
            }
            context.setFillStyle(fillColor);
            context.closePath();
            context.fill();
          }
        }
        break;
      case "stack":
        var points = getBarStackDataPoints(data, minRange, maxRange, yAxisPoints, eachSpacing, opts, config2, seriesIndex, series, process);
        calPoints.push(points);
        points = fixBarStackData(points, eachSpacing, series.length, seriesIndex, config2, opts);
        for (let i = 0; i < points.length; i++) {
          let item = points[i];
          if (item !== null && i > leftNum && i < rightNum) {
            context.beginPath();
            var fillColor = item.color || eachSeries.color;
            var startX = item.x0;
            context.setFillStyle(fillColor);
            context.moveTo(startX, item.y - item.width / 2);
            context.fillRect(startX, item.y - item.width / 2, item.height, item.width);
            context.closePath();
            context.fill();
          }
        }
        break;
    }
  });
  if (opts.dataLabel !== false && process === 1) {
    series.forEach(function(eachSeries, seriesIndex) {
      let ranges, minRange, maxRange;
      ranges = [].concat(opts.chartData.xAxisData.ranges);
      maxRange = ranges.pop();
      minRange = ranges.shift();
      var data = eachSeries.data;
      switch (columnOption.type) {
        case "group":
          var points = getBarDataPoints(data, minRange, maxRange, yAxisPoints, eachSpacing, opts, config2, process);
          points = fixBarData(points, eachSpacing, series.length, seriesIndex, config2, opts);
          drawBarPointText(points, eachSeries, config2, context, opts);
          break;
        case "stack":
          var points = getBarStackDataPoints(data, minRange, maxRange, yAxisPoints, eachSpacing, opts, config2, seriesIndex, series, process);
          drawBarPointText(points, eachSeries, config2, context, opts);
          break;
      }
    });
  }
  return {
    yAxisPoints,
    calPoints,
    eachSpacing
  };
}
function drawCandleDataPoints(series, seriesMA, opts, config2, context) {
  var process = arguments.length > 5 && arguments[5] !== void 0 ? arguments[5] : 1;
  var candleOption = assign({}, {
    color: {},
    average: {}
  }, opts.extra.candle);
  candleOption.color = assign({}, {
    upLine: "#f04864",
    upFill: "#f04864",
    downLine: "#2fc25b",
    downFill: "#2fc25b"
  }, candleOption.color);
  candleOption.average = assign({}, {
    show: false,
    name: [],
    day: [],
    color: config2.color
  }, candleOption.average);
  opts.extra.candle = candleOption;
  let xAxisData = opts.chartData.xAxisData, xAxisPoints = xAxisData.xAxisPoints, eachSpacing = xAxisData.eachSpacing;
  let calPoints = [];
  context.save();
  let leftNum = -2;
  let rightNum = xAxisPoints.length + 2;
  let leftSpace = 0;
  let rightSpace = opts.width + eachSpacing;
  if (opts._scrollDistance_ && opts._scrollDistance_ !== 0 && opts.enableScroll === true) {
    context.translate(opts._scrollDistance_, 0);
    leftNum = Math.floor(-opts._scrollDistance_ / eachSpacing) - 2;
    rightNum = leftNum + opts.xAxis.itemCount + 4;
    leftSpace = -opts._scrollDistance_ - eachSpacing * 2 + opts.area[3];
    rightSpace = leftSpace + (opts.xAxis.itemCount + 4) * eachSpacing;
  }
  if (candleOption.average.show || seriesMA) {
    seriesMA.forEach(function(eachSeries, seriesIndex) {
      let ranges, minRange, maxRange;
      ranges = [].concat(opts.chartData.yAxisData.ranges[eachSeries.index]);
      minRange = ranges.pop();
      maxRange = ranges.shift();
      var data = eachSeries.data;
      var points = getDataPoints(data, minRange, maxRange, xAxisPoints, eachSpacing, opts, config2, process);
      var splitPointList = splitPoints(points, eachSeries);
      for (let i = 0; i < splitPointList.length; i++) {
        let points2 = splitPointList[i];
        context.beginPath();
        context.setStrokeStyle(eachSeries.color);
        context.setLineWidth(1);
        if (points2.length === 1) {
          context.moveTo(points2[0].x, points2[0].y);
          context.arc(points2[0].x, points2[0].y, 1, 0, 2 * Math.PI);
        } else {
          context.moveTo(points2[0].x, points2[0].y);
          let startPoint = 0;
          for (let j = 0; j < points2.length; j++) {
            let item = points2[j];
            if (startPoint == 0 && item.x > leftSpace) {
              context.moveTo(item.x, item.y);
              startPoint = 1;
            }
            if (j > 0 && item.x > leftSpace && item.x < rightSpace) {
              var ctrlPoint = createCurveControlPoints(points2, j - 1);
              context.bezierCurveTo(
                ctrlPoint.ctrA.x,
                ctrlPoint.ctrA.y,
                ctrlPoint.ctrB.x,
                ctrlPoint.ctrB.y,
                item.x,
                item.y
              );
            }
          }
          context.moveTo(points2[0].x, points2[0].y);
        }
        context.closePath();
        context.stroke();
      }
    });
  }
  series.forEach(function(eachSeries, seriesIndex) {
    let ranges, minRange, maxRange;
    ranges = [].concat(opts.chartData.yAxisData.ranges[eachSeries.index]);
    minRange = ranges.pop();
    maxRange = ranges.shift();
    var data = eachSeries.data;
    var points = getCandleDataPoints(data, minRange, maxRange, xAxisPoints, eachSpacing, opts, config2, process);
    calPoints.push(points);
    var splitPointList = splitPoints(points, eachSeries);
    for (let i = 0; i < splitPointList[0].length; i++) {
      if (i > leftNum && i < rightNum) {
        let item = splitPointList[0][i];
        context.beginPath();
        if (data[i][1] - data[i][0] > 0) {
          context.setStrokeStyle(candleOption.color.upLine);
          context.setFillStyle(candleOption.color.upFill);
          context.setLineWidth(1 * opts.pix);
          context.moveTo(item[3].x, item[3].y);
          context.lineTo(item[1].x, item[1].y);
          context.lineTo(item[1].x - eachSpacing / 4, item[1].y);
          context.lineTo(item[0].x - eachSpacing / 4, item[0].y);
          context.lineTo(item[0].x, item[0].y);
          context.lineTo(item[2].x, item[2].y);
          context.lineTo(item[0].x, item[0].y);
          context.lineTo(item[0].x + eachSpacing / 4, item[0].y);
          context.lineTo(item[1].x + eachSpacing / 4, item[1].y);
          context.lineTo(item[1].x, item[1].y);
          context.moveTo(item[3].x, item[3].y);
        } else {
          context.setStrokeStyle(candleOption.color.downLine);
          context.setFillStyle(candleOption.color.downFill);
          context.setLineWidth(1 * opts.pix);
          context.moveTo(item[3].x, item[3].y);
          context.lineTo(item[0].x, item[0].y);
          context.lineTo(item[0].x - eachSpacing / 4, item[0].y);
          context.lineTo(item[1].x - eachSpacing / 4, item[1].y);
          context.lineTo(item[1].x, item[1].y);
          context.lineTo(item[2].x, item[2].y);
          context.lineTo(item[1].x, item[1].y);
          context.lineTo(item[1].x + eachSpacing / 4, item[1].y);
          context.lineTo(item[0].x + eachSpacing / 4, item[0].y);
          context.lineTo(item[0].x, item[0].y);
          context.moveTo(item[3].x, item[3].y);
        }
        context.closePath();
        context.fill();
        context.stroke();
      }
    }
  });
  context.restore();
  return {
    xAxisPoints,
    calPoints,
    eachSpacing
  };
}
function drawAreaDataPoints(series, opts, config2, context) {
  var process = arguments.length > 4 && arguments[4] !== void 0 ? arguments[4] : 1;
  var areaOption = assign({}, {
    type: "straight",
    opacity: 0.2,
    addLine: false,
    width: 2,
    gradient: false,
    activeType: "none"
  }, opts.extra.area);
  let xAxisData = opts.chartData.xAxisData, xAxisPoints = xAxisData.xAxisPoints, eachSpacing = xAxisData.eachSpacing;
  let endY = opts.height - opts.area[2];
  let calPoints = [];
  context.save();
  let leftSpace = 0;
  let rightSpace = opts.width + eachSpacing;
  if (opts._scrollDistance_ && opts._scrollDistance_ !== 0 && opts.enableScroll === true) {
    context.translate(opts._scrollDistance_, 0);
    leftSpace = -opts._scrollDistance_ - eachSpacing * 2 + opts.area[3];
    rightSpace = leftSpace + (opts.xAxis.itemCount + 4) * eachSpacing;
  }
  series.forEach(function(eachSeries, seriesIndex) {
    let ranges, minRange, maxRange;
    ranges = [].concat(opts.chartData.yAxisData.ranges[eachSeries.index]);
    minRange = ranges.pop();
    maxRange = ranges.shift();
    let data = eachSeries.data;
    let points = getDataPoints(data, minRange, maxRange, xAxisPoints, eachSpacing, opts, config2, process);
    calPoints.push(points);
    let splitPointList = splitPoints(points, eachSeries);
    for (let i = 0; i < splitPointList.length; i++) {
      let points2 = splitPointList[i];
      context.beginPath();
      context.setStrokeStyle(hexToRgb(eachSeries.color, areaOption.opacity));
      if (areaOption.gradient) {
        let gradient = context.createLinearGradient(0, opts.area[0], 0, opts.height - opts.area[2]);
        gradient.addColorStop("0", hexToRgb(eachSeries.color, areaOption.opacity));
        gradient.addColorStop("1.0", hexToRgb("#FFFFFF", 0.1));
        context.setFillStyle(gradient);
      } else {
        context.setFillStyle(hexToRgb(eachSeries.color, areaOption.opacity));
      }
      context.setLineWidth(areaOption.width * opts.pix);
      if (points2.length > 1) {
        let firstPoint = points2[0];
        let lastPoint = points2[points2.length - 1];
        context.moveTo(firstPoint.x, firstPoint.y);
        let startPoint = 0;
        if (areaOption.type === "curve") {
          for (let j = 0; j < points2.length; j++) {
            let item = points2[j];
            if (startPoint == 0 && item.x > leftSpace) {
              context.moveTo(item.x, item.y);
              startPoint = 1;
            }
            if (j > 0 && item.x > leftSpace && item.x < rightSpace) {
              let ctrlPoint = createCurveControlPoints(points2, j - 1);
              context.bezierCurveTo(ctrlPoint.ctrA.x, ctrlPoint.ctrA.y, ctrlPoint.ctrB.x, ctrlPoint.ctrB.y, item.x, item.y);
            }
          }
        }
        if (areaOption.type === "straight") {
          for (let j = 0; j < points2.length; j++) {
            let item = points2[j];
            if (startPoint == 0 && item.x > leftSpace) {
              context.moveTo(item.x, item.y);
              startPoint = 1;
            }
            if (j > 0 && item.x > leftSpace && item.x < rightSpace) {
              context.lineTo(item.x, item.y);
            }
          }
        }
        if (areaOption.type === "step") {
          for (let j = 0; j < points2.length; j++) {
            let item = points2[j];
            if (startPoint == 0 && item.x > leftSpace) {
              context.moveTo(item.x, item.y);
              startPoint = 1;
            }
            if (j > 0 && item.x > leftSpace && item.x < rightSpace) {
              context.lineTo(item.x, points2[j - 1].y);
              context.lineTo(item.x, item.y);
            }
          }
        }
        context.lineTo(lastPoint.x, endY);
        context.lineTo(firstPoint.x, endY);
        context.lineTo(firstPoint.x, firstPoint.y);
      } else {
        let item = points2[0];
        context.moveTo(item.x - eachSpacing / 2, item.y);
      }
      context.closePath();
      context.fill();
      if (areaOption.addLine) {
        if (eachSeries.lineType == "dash") {
          let dashLength = eachSeries.dashLength ? eachSeries.dashLength : 8;
          dashLength *= opts.pix;
          context.setLineDash([dashLength, dashLength]);
        }
        context.beginPath();
        context.setStrokeStyle(eachSeries.color);
        context.setLineWidth(areaOption.width * opts.pix);
        if (points2.length === 1) {
          context.moveTo(points2[0].x, points2[0].y);
        } else {
          context.moveTo(points2[0].x, points2[0].y);
          let startPoint = 0;
          if (areaOption.type === "curve") {
            for (let j = 0; j < points2.length; j++) {
              let item = points2[j];
              if (startPoint == 0 && item.x > leftSpace) {
                context.moveTo(item.x, item.y);
                startPoint = 1;
              }
              if (j > 0 && item.x > leftSpace && item.x < rightSpace) {
                let ctrlPoint = createCurveControlPoints(points2, j - 1);
                context.bezierCurveTo(ctrlPoint.ctrA.x, ctrlPoint.ctrA.y, ctrlPoint.ctrB.x, ctrlPoint.ctrB.y, item.x, item.y);
              }
            }
          }
          if (areaOption.type === "straight") {
            for (let j = 0; j < points2.length; j++) {
              let item = points2[j];
              if (startPoint == 0 && item.x > leftSpace) {
                context.moveTo(item.x, item.y);
                startPoint = 1;
              }
              if (j > 0 && item.x > leftSpace && item.x < rightSpace) {
                context.lineTo(item.x, item.y);
              }
            }
          }
          if (areaOption.type === "step") {
            for (let j = 0; j < points2.length; j++) {
              let item = points2[j];
              if (startPoint == 0 && item.x > leftSpace) {
                context.moveTo(item.x, item.y);
                startPoint = 1;
              }
              if (j > 0 && item.x > leftSpace && item.x < rightSpace) {
                context.lineTo(item.x, points2[j - 1].y);
                context.lineTo(item.x, item.y);
              }
            }
          }
          context.moveTo(points2[0].x, points2[0].y);
        }
        context.stroke();
        context.setLineDash([]);
      }
    }
    if (opts.dataPointShape !== false) {
      drawPointShape(points, eachSeries.color, eachSeries.pointShape, context, opts);
    }
    drawActivePoint(points, eachSeries.color, eachSeries.pointShape, context, opts, areaOption, seriesIndex);
  });
  if (opts.dataLabel !== false && process === 1) {
    series.forEach(function(eachSeries, seriesIndex) {
      let ranges, minRange, maxRange;
      ranges = [].concat(opts.chartData.yAxisData.ranges[eachSeries.index]);
      minRange = ranges.pop();
      maxRange = ranges.shift();
      var data = eachSeries.data;
      var points = getDataPoints(data, minRange, maxRange, xAxisPoints, eachSpacing, opts, config2, process);
      drawPointText(points, eachSeries, config2, context, opts);
    });
  }
  context.restore();
  return {
    xAxisPoints,
    calPoints,
    eachSpacing
  };
}
function drawScatterDataPoints(series, opts, config2, context) {
  var process = arguments.length > 4 && arguments[4] !== void 0 ? arguments[4] : 1;
  assign({}, {
    type: "circle"
  }, opts.extra.scatter);
  let xAxisData = opts.chartData.xAxisData, xAxisPoints = xAxisData.xAxisPoints, eachSpacing = xAxisData.eachSpacing;
  var calPoints = [];
  context.save();
  let leftSpace = 0;
  opts.width + eachSpacing;
  if (opts._scrollDistance_ && opts._scrollDistance_ !== 0 && opts.enableScroll === true) {
    context.translate(opts._scrollDistance_, 0);
    leftSpace = -opts._scrollDistance_ - eachSpacing * 2 + opts.area[3];
    leftSpace + (opts.xAxis.itemCount + 4) * eachSpacing;
  }
  series.forEach(function(eachSeries, seriesIndex) {
    let ranges, minRange, maxRange;
    ranges = [].concat(opts.chartData.yAxisData.ranges[eachSeries.index]);
    minRange = ranges.pop();
    maxRange = ranges.shift();
    var data = eachSeries.data;
    var points = getDataPoints(data, minRange, maxRange, xAxisPoints, eachSpacing, opts, config2, process);
    context.beginPath();
    context.setStrokeStyle(eachSeries.color);
    context.setFillStyle(eachSeries.color);
    context.setLineWidth(1 * opts.pix);
    var shape = eachSeries.pointShape;
    if (shape === "diamond") {
      points.forEach(function(item, index2) {
        if (item !== null) {
          context.moveTo(item.x, item.y - 4.5);
          context.lineTo(item.x - 4.5, item.y);
          context.lineTo(item.x, item.y + 4.5);
          context.lineTo(item.x + 4.5, item.y);
          context.lineTo(item.x, item.y - 4.5);
        }
      });
    } else if (shape === "circle") {
      points.forEach(function(item, index2) {
        if (item !== null) {
          context.moveTo(item.x + 2.5 * opts.pix, item.y);
          context.arc(item.x, item.y, 3 * opts.pix, 0, 2 * Math.PI, false);
        }
      });
    } else if (shape === "square") {
      points.forEach(function(item, index2) {
        if (item !== null) {
          context.moveTo(item.x - 3.5, item.y - 3.5);
          context.rect(item.x - 3.5, item.y - 3.5, 7, 7);
        }
      });
    } else if (shape === "triangle") {
      points.forEach(function(item, index2) {
        if (item !== null) {
          context.moveTo(item.x, item.y - 4.5);
          context.lineTo(item.x - 4.5, item.y + 4.5);
          context.lineTo(item.x + 4.5, item.y + 4.5);
          context.lineTo(item.x, item.y - 4.5);
        }
      });
    } else if (shape === "triangle") {
      return;
    }
    context.closePath();
    context.fill();
    context.stroke();
  });
  if (opts.dataLabel !== false && process === 1) {
    series.forEach(function(eachSeries, seriesIndex) {
      let ranges, minRange, maxRange;
      ranges = [].concat(opts.chartData.yAxisData.ranges[eachSeries.index]);
      minRange = ranges.pop();
      maxRange = ranges.shift();
      var data = eachSeries.data;
      var points = getDataPoints(data, minRange, maxRange, xAxisPoints, eachSpacing, opts, config2, process);
      drawPointText(points, eachSeries, config2, context, opts);
    });
  }
  context.restore();
  return {
    xAxisPoints,
    calPoints,
    eachSpacing
  };
}
function drawBubbleDataPoints(series, opts, config2, context) {
  var process = arguments.length > 4 && arguments[4] !== void 0 ? arguments[4] : 1;
  var bubbleOption = assign({}, {
    opacity: 1,
    border: 2
  }, opts.extra.bubble);
  let xAxisData = opts.chartData.xAxisData, xAxisPoints = xAxisData.xAxisPoints, eachSpacing = xAxisData.eachSpacing;
  var calPoints = [];
  context.save();
  let leftSpace = 0;
  opts.width + eachSpacing;
  if (opts._scrollDistance_ && opts._scrollDistance_ !== 0 && opts.enableScroll === true) {
    context.translate(opts._scrollDistance_, 0);
    leftSpace = -opts._scrollDistance_ - eachSpacing * 2 + opts.area[3];
    leftSpace + (opts.xAxis.itemCount + 4) * eachSpacing;
  }
  series.forEach(function(eachSeries, seriesIndex) {
    let ranges, minRange, maxRange;
    ranges = [].concat(opts.chartData.yAxisData.ranges[eachSeries.index]);
    minRange = ranges.pop();
    maxRange = ranges.shift();
    var data = eachSeries.data;
    var points = getDataPoints(data, minRange, maxRange, xAxisPoints, eachSpacing, opts, config2, process);
    context.beginPath();
    context.setStrokeStyle(eachSeries.color);
    context.setLineWidth(bubbleOption.border * opts.pix);
    context.setFillStyle(hexToRgb(eachSeries.color, bubbleOption.opacity));
    points.forEach(function(item, index2) {
      context.moveTo(item.x + item.r, item.y);
      context.arc(item.x, item.y, item.r * opts.pix, 0, 2 * Math.PI, false);
    });
    context.closePath();
    context.fill();
    context.stroke();
    if (opts.dataLabel !== false && process === 1) {
      points.forEach(function(item, index2) {
        context.beginPath();
        var fontSize = eachSeries.textSize * opts.pix || config2.fontSize;
        context.setFontSize(fontSize);
        context.setFillStyle(eachSeries.textColor || "#FFFFFF");
        context.setTextAlign("center");
        context.fillText(String(item.t), item.x, item.y + fontSize / 2);
        context.closePath();
        context.stroke();
        context.setTextAlign("left");
      });
    }
  });
  context.restore();
  return {
    xAxisPoints,
    calPoints,
    eachSpacing
  };
}
function drawLineDataPoints(series, opts, config2, context) {
  var process = arguments.length > 4 && arguments[4] !== void 0 ? arguments[4] : 1;
  var lineOption = assign({}, {
    type: "straight",
    width: 2,
    activeType: "none",
    linearType: "none",
    onShadow: false,
    animation: "vertical"
  }, opts.extra.line);
  lineOption.width *= opts.pix;
  let xAxisData = opts.chartData.xAxisData, xAxisPoints = xAxisData.xAxisPoints, eachSpacing = xAxisData.eachSpacing;
  var calPoints = [];
  context.save();
  let leftSpace = 0;
  let rightSpace = opts.width + eachSpacing;
  if (opts._scrollDistance_ && opts._scrollDistance_ !== 0 && opts.enableScroll === true) {
    context.translate(opts._scrollDistance_, 0);
    leftSpace = -opts._scrollDistance_ - eachSpacing * 2 + opts.area[3];
    rightSpace = leftSpace + (opts.xAxis.itemCount + 4) * eachSpacing;
  }
  series.forEach(function(eachSeries, seriesIndex) {
    context.beginPath();
    context.setStrokeStyle(eachSeries.color);
    context.moveTo(-1e4, -1e4);
    context.lineTo(-10001, -10001);
    context.stroke();
    let ranges, minRange, maxRange;
    ranges = [].concat(opts.chartData.yAxisData.ranges[eachSeries.index]);
    minRange = ranges.pop();
    maxRange = ranges.shift();
    var data = eachSeries.data;
    var points = getLineDataPoints(data, minRange, maxRange, xAxisPoints, eachSpacing, opts, config2, lineOption, process);
    calPoints.push(points);
    var splitPointList = splitPoints(points, eachSeries);
    if (eachSeries.lineType == "dash") {
      let dashLength = eachSeries.dashLength ? eachSeries.dashLength : 8;
      dashLength *= opts.pix;
      context.setLineDash([dashLength, dashLength]);
    }
    context.beginPath();
    var strokeColor = eachSeries.color;
    if (lineOption.linearType !== "none" && eachSeries.linearColor && eachSeries.linearColor.length > 0) {
      var grd = context.createLinearGradient(opts.chartData.xAxisData.startX, opts.height / 2, opts.chartData.xAxisData.endX, opts.height / 2);
      for (var i = 0; i < eachSeries.linearColor.length; i++) {
        grd.addColorStop(eachSeries.linearColor[i][0], hexToRgb(eachSeries.linearColor[i][1], 1));
      }
      strokeColor = grd;
    }
    context.setStrokeStyle(strokeColor);
    if (lineOption.onShadow == true && eachSeries.setShadow && eachSeries.setShadow.length > 0) {
      context.setShadow(eachSeries.setShadow[0], eachSeries.setShadow[1], eachSeries.setShadow[2], eachSeries.setShadow[3]);
    } else {
      context.setShadow(0, 0, 0, "rgba(0,0,0,0)");
    }
    context.setLineWidth(lineOption.width);
    splitPointList.forEach(function(points2, index2) {
      if (points2.length === 1) {
        context.moveTo(points2[0].x, points2[0].y);
      } else {
        context.moveTo(points2[0].x, points2[0].y);
        let startPoint = 0;
        if (lineOption.type === "curve") {
          for (let j = 0; j < points2.length; j++) {
            let item = points2[j];
            if (startPoint == 0 && item.x > leftSpace) {
              context.moveTo(item.x, item.y);
              startPoint = 1;
            }
            if (j > 0 && item.x > leftSpace && item.x < rightSpace) {
              var ctrlPoint = createCurveControlPoints(points2, j - 1);
              context.bezierCurveTo(ctrlPoint.ctrA.x, ctrlPoint.ctrA.y, ctrlPoint.ctrB.x, ctrlPoint.ctrB.y, item.x, item.y);
            }
          }
        }
        if (lineOption.type === "straight") {
          for (let j = 0; j < points2.length; j++) {
            let item = points2[j];
            if (startPoint == 0 && item.x > leftSpace) {
              context.moveTo(item.x, item.y);
              startPoint = 1;
            }
            if (j > 0 && item.x > leftSpace && item.x < rightSpace) {
              context.lineTo(item.x, item.y);
            }
          }
        }
        if (lineOption.type === "step") {
          for (let j = 0; j < points2.length; j++) {
            let item = points2[j];
            if (startPoint == 0 && item.x > leftSpace) {
              context.moveTo(item.x, item.y);
              startPoint = 1;
            }
            if (j > 0 && item.x > leftSpace && item.x < rightSpace) {
              context.lineTo(item.x, points2[j - 1].y);
              context.lineTo(item.x, item.y);
            }
          }
        }
        context.moveTo(points2[0].x, points2[0].y);
      }
    });
    context.stroke();
    context.setLineDash([]);
    if (opts.dataPointShape !== false) {
      drawPointShape(points, eachSeries.color, eachSeries.pointShape, context, opts);
    }
    drawActivePoint(points, eachSeries.color, eachSeries.pointShape, context, opts, lineOption);
  });
  if (opts.dataLabel !== false && process === 1) {
    series.forEach(function(eachSeries, seriesIndex) {
      let ranges, minRange, maxRange;
      ranges = [].concat(opts.chartData.yAxisData.ranges[eachSeries.index]);
      minRange = ranges.pop();
      maxRange = ranges.shift();
      var data = eachSeries.data;
      var points = getDataPoints(data, minRange, maxRange, xAxisPoints, eachSpacing, opts, config2, process);
      drawPointText(points, eachSeries, config2, context, opts);
    });
  }
  context.restore();
  return {
    xAxisPoints,
    calPoints,
    eachSpacing
  };
}
function drawMixDataPoints(series, opts, config2, context) {
  let process = arguments.length > 4 && arguments[4] !== void 0 ? arguments[4] : 1;
  let xAxisData = opts.chartData.xAxisData, xAxisPoints = xAxisData.xAxisPoints, eachSpacing = xAxisData.eachSpacing;
  let columnOption = assign({}, {
    width: eachSpacing / 2,
    barBorderCircle: false,
    barBorderRadius: [],
    seriesGap: 2,
    linearType: "none",
    linearOpacity: 1,
    customColor: [],
    colorStop: 0
  }, opts.extra.mix.column);
  let areaOption = assign({}, {
    opacity: 0.2,
    gradient: false
  }, opts.extra.mix.area);
  let lineOption = assign({}, {
    width: 2
  }, opts.extra.mix.line);
  let endY = opts.height - opts.area[2];
  let calPoints = [];
  var columnIndex = 0;
  var columnLength = 0;
  series.forEach(function(eachSeries, seriesIndex) {
    if (eachSeries.type == "column") {
      columnLength += 1;
    }
  });
  context.save();
  let leftNum = -2;
  let rightNum = xAxisPoints.length + 2;
  let leftSpace = 0;
  let rightSpace = opts.width + eachSpacing;
  if (opts._scrollDistance_ && opts._scrollDistance_ !== 0 && opts.enableScroll === true) {
    context.translate(opts._scrollDistance_, 0);
    leftNum = Math.floor(-opts._scrollDistance_ / eachSpacing) - 2;
    rightNum = leftNum + opts.xAxis.itemCount + 4;
    leftSpace = -opts._scrollDistance_ - eachSpacing * 2 + opts.area[3];
    rightSpace = leftSpace + (opts.xAxis.itemCount + 4) * eachSpacing;
  }
  columnOption.customColor = fillCustomColor(columnOption.linearType, columnOption.customColor, series, config2);
  series.forEach(function(eachSeries, seriesIndex) {
    let ranges, minRange, maxRange;
    ranges = [].concat(opts.chartData.yAxisData.ranges[eachSeries.index]);
    minRange = ranges.pop();
    maxRange = ranges.shift();
    var data = eachSeries.data;
    var points = getDataPoints(data, minRange, maxRange, xAxisPoints, eachSpacing, opts, config2, process);
    calPoints.push(points);
    if (eachSeries.type == "column") {
      points = fixColumeData(points, eachSpacing, columnLength, columnIndex, config2, opts);
      for (let i = 0; i < points.length; i++) {
        let item = points[i];
        if (item !== null && i > leftNum && i < rightNum) {
          var startX = item.x - item.width / 2;
          opts.height - item.y - opts.area[2];
          context.beginPath();
          var fillColor = item.color || eachSeries.color;
          var strokeColor = item.color || eachSeries.color;
          if (columnOption.linearType !== "none") {
            var grd = context.createLinearGradient(startX, item.y, startX, opts.height - opts.area[2]);
            if (columnOption.linearType == "opacity") {
              grd.addColorStop(0, hexToRgb(fillColor, columnOption.linearOpacity));
              grd.addColorStop(1, hexToRgb(fillColor, 1));
            } else {
              grd.addColorStop(0, hexToRgb(columnOption.customColor[eachSeries.linearIndex], columnOption.linearOpacity));
              grd.addColorStop(columnOption.colorStop, hexToRgb(columnOption.customColor[eachSeries.linearIndex], columnOption.linearOpacity));
              grd.addColorStop(1, hexToRgb(fillColor, 1));
            }
            fillColor = grd;
          }
          if (columnOption.barBorderRadius && columnOption.barBorderRadius.length === 4 || columnOption.barBorderCircle) {
            const left = startX;
            const top = item.y;
            const width = item.width;
            const height = opts.height - opts.area[2] - item.y;
            if (columnOption.barBorderCircle) {
              columnOption.barBorderRadius = [width / 2, width / 2, 0, 0];
            }
            let [r0, r1, r2, r3] = columnOption.barBorderRadius;
            let minRadius = Math.min(width / 2, height / 2);
            r0 = r0 > minRadius ? minRadius : r0;
            r1 = r1 > minRadius ? minRadius : r1;
            r2 = r2 > minRadius ? minRadius : r2;
            r3 = r3 > minRadius ? minRadius : r3;
            r0 = r0 < 0 ? 0 : r0;
            r1 = r1 < 0 ? 0 : r1;
            r2 = r2 < 0 ? 0 : r2;
            r3 = r3 < 0 ? 0 : r3;
            context.arc(left + r0, top + r0, r0, -Math.PI, -Math.PI / 2);
            context.arc(left + width - r1, top + r1, r1, -Math.PI / 2, 0);
            context.arc(left + width - r2, top + height - r2, r2, 0, Math.PI / 2);
            context.arc(left + r3, top + height - r3, r3, Math.PI / 2, Math.PI);
          } else {
            context.moveTo(startX, item.y);
            context.lineTo(startX + item.width, item.y);
            context.lineTo(startX + item.width, opts.height - opts.area[2]);
            context.lineTo(startX, opts.height - opts.area[2]);
            context.lineTo(startX, item.y);
            context.setLineWidth(1);
            context.setStrokeStyle(strokeColor);
          }
          context.setFillStyle(fillColor);
          context.closePath();
          context.fill();
        }
      }
      columnIndex += 1;
    }
    if (eachSeries.type == "area") {
      let splitPointList2 = splitPoints(points, eachSeries);
      for (let i = 0; i < splitPointList2.length; i++) {
        let points2 = splitPointList2[i];
        context.beginPath();
        context.setStrokeStyle(eachSeries.color);
        context.setStrokeStyle(hexToRgb(eachSeries.color, areaOption.opacity));
        if (areaOption.gradient) {
          let gradient = context.createLinearGradient(0, opts.area[0], 0, opts.height - opts.area[2]);
          gradient.addColorStop("0", hexToRgb(eachSeries.color, areaOption.opacity));
          gradient.addColorStop("1.0", hexToRgb("#FFFFFF", 0.1));
          context.setFillStyle(gradient);
        } else {
          context.setFillStyle(hexToRgb(eachSeries.color, areaOption.opacity));
        }
        context.setLineWidth(2 * opts.pix);
        if (points2.length > 1) {
          var firstPoint = points2[0];
          let lastPoint = points2[points2.length - 1];
          context.moveTo(firstPoint.x, firstPoint.y);
          let startPoint = 0;
          if (eachSeries.style === "curve") {
            for (let j = 0; j < points2.length; j++) {
              let item = points2[j];
              if (startPoint == 0 && item.x > leftSpace) {
                context.moveTo(item.x, item.y);
                startPoint = 1;
              }
              if (j > 0 && item.x > leftSpace && item.x < rightSpace) {
                var ctrlPoint = createCurveControlPoints(points2, j - 1);
                context.bezierCurveTo(ctrlPoint.ctrA.x, ctrlPoint.ctrA.y, ctrlPoint.ctrB.x, ctrlPoint.ctrB.y, item.x, item.y);
              }
            }
          } else {
            for (let j = 0; j < points2.length; j++) {
              let item = points2[j];
              if (startPoint == 0 && item.x > leftSpace) {
                context.moveTo(item.x, item.y);
                startPoint = 1;
              }
              if (j > 0 && item.x > leftSpace && item.x < rightSpace) {
                context.lineTo(item.x, item.y);
              }
            }
          }
          context.lineTo(lastPoint.x, endY);
          context.lineTo(firstPoint.x, endY);
          context.lineTo(firstPoint.x, firstPoint.y);
        } else {
          let item = points2[0];
          context.moveTo(item.x - eachSpacing / 2, item.y);
        }
        context.closePath();
        context.fill();
      }
    }
    if (eachSeries.type == "line") {
      var splitPointList = splitPoints(points, eachSeries);
      splitPointList.forEach(function(points2, index2) {
        if (eachSeries.lineType == "dash") {
          let dashLength = eachSeries.dashLength ? eachSeries.dashLength : 8;
          dashLength *= opts.pix;
          context.setLineDash([dashLength, dashLength]);
        }
        context.beginPath();
        context.setStrokeStyle(eachSeries.color);
        context.setLineWidth(lineOption.width * opts.pix);
        if (points2.length === 1) {
          context.moveTo(points2[0].x, points2[0].y);
        } else {
          context.moveTo(points2[0].x, points2[0].y);
          let startPoint = 0;
          if (eachSeries.style == "curve") {
            for (let j = 0; j < points2.length; j++) {
              let item = points2[j];
              if (startPoint == 0 && item.x > leftSpace) {
                context.moveTo(item.x, item.y);
                startPoint = 1;
              }
              if (j > 0 && item.x > leftSpace && item.x < rightSpace) {
                var ctrlPoint2 = createCurveControlPoints(points2, j - 1);
                context.bezierCurveTo(
                  ctrlPoint2.ctrA.x,
                  ctrlPoint2.ctrA.y,
                  ctrlPoint2.ctrB.x,
                  ctrlPoint2.ctrB.y,
                  item.x,
                  item.y
                );
              }
            }
          } else {
            for (let j = 0; j < points2.length; j++) {
              let item = points2[j];
              if (startPoint == 0 && item.x > leftSpace) {
                context.moveTo(item.x, item.y);
                startPoint = 1;
              }
              if (j > 0 && item.x > leftSpace && item.x < rightSpace) {
                context.lineTo(item.x, item.y);
              }
            }
          }
          context.moveTo(points2[0].x, points2[0].y);
        }
        context.stroke();
        context.setLineDash([]);
      });
    }
    if (eachSeries.type == "point") {
      eachSeries.addPoint = true;
    }
    if (eachSeries.addPoint == true && eachSeries.type !== "column") {
      drawPointShape(points, eachSeries.color, eachSeries.pointShape, context, opts);
    }
  });
  if (opts.dataLabel !== false && process === 1) {
    var columnIndex = 0;
    series.forEach(function(eachSeries, seriesIndex) {
      let ranges, minRange, maxRange;
      ranges = [].concat(opts.chartData.yAxisData.ranges[eachSeries.index]);
      minRange = ranges.pop();
      maxRange = ranges.shift();
      var data = eachSeries.data;
      var points = getDataPoints(data, minRange, maxRange, xAxisPoints, eachSpacing, opts, config2, process);
      if (eachSeries.type !== "column") {
        drawPointText(points, eachSeries, config2, context, opts);
      } else {
        points = fixColumeData(points, eachSpacing, columnLength, columnIndex, config2, opts);
        drawPointText(points, eachSeries, config2, context, opts);
        columnIndex += 1;
      }
    });
  }
  context.restore();
  return {
    xAxisPoints,
    calPoints,
    eachSpacing
  };
}
function drawToolTipBridge(opts, config2, context, process, eachSpacing, xAxisPoints) {
  var toolTipOption = opts.extra.tooltip || {};
  if (toolTipOption.horizentalLine && opts.tooltip && process === 1 && (opts.type == "line" || opts.type == "area" || opts.type == "column" || opts.type == "mount" || opts.type == "candle" || opts.type == "mix")) {
    drawToolTipHorizentalLine(opts, config2, context);
  }
  context.save();
  if (opts._scrollDistance_ && opts._scrollDistance_ !== 0 && opts.enableScroll === true) {
    context.translate(opts._scrollDistance_, 0);
  }
  if (opts.tooltip && opts.tooltip.textList && opts.tooltip.textList.length && process === 1) {
    drawToolTip(opts.tooltip.textList, opts.tooltip.offset, opts, config2, context);
  }
  context.restore();
}
function drawXAxis(categories, opts, config2, context) {
  let xAxisData = opts.chartData.xAxisData, xAxisPoints = xAxisData.xAxisPoints, startX = xAxisData.startX, endX = xAxisData.endX, eachSpacing = xAxisData.eachSpacing;
  var boundaryGap = "center";
  if (opts.type == "bar" || opts.type == "line" || opts.type == "area" || opts.type == "scatter" || opts.type == "bubble") {
    boundaryGap = opts.xAxis.boundaryGap;
  }
  var startY = opts.height - opts.area[2];
  var endY = opts.area[0];
  if (opts.enableScroll && opts.xAxis.scrollShow) {
    var scrollY = opts.height - opts.area[2] + config2.xAxisHeight;
    var scrollScreenWidth = endX - startX;
    var scrollTotalWidth = eachSpacing * (xAxisPoints.length - 1);
    if (opts.type == "mount" && opts.extra && opts.extra.mount && opts.extra.mount.widthRatio && opts.extra.mount.widthRatio > 1) {
      if (opts.extra.mount.widthRatio > 2)
        opts.extra.mount.widthRatio = 2;
      scrollTotalWidth += (opts.extra.mount.widthRatio - 1) * eachSpacing;
    }
    var scrollWidth = scrollScreenWidth * scrollScreenWidth / scrollTotalWidth;
    var scrollLeft = 0;
    if (opts._scrollDistance_) {
      scrollLeft = -opts._scrollDistance_ * scrollScreenWidth / scrollTotalWidth;
    }
    context.beginPath();
    context.setLineCap("round");
    context.setLineWidth(6 * opts.pix);
    context.setStrokeStyle(opts.xAxis.scrollBackgroundColor || "#EFEBEF");
    context.moveTo(startX, scrollY);
    context.lineTo(endX, scrollY);
    context.stroke();
    context.closePath();
    context.beginPath();
    context.setLineCap("round");
    context.setLineWidth(6 * opts.pix);
    context.setStrokeStyle(opts.xAxis.scrollColor || "#A6A6A6");
    context.moveTo(startX + scrollLeft, scrollY);
    context.lineTo(startX + scrollLeft + scrollWidth, scrollY);
    context.stroke();
    context.closePath();
    context.setLineCap("butt");
  }
  context.save();
  if (opts._scrollDistance_ && opts._scrollDistance_ !== 0) {
    context.translate(opts._scrollDistance_, 0);
  }
  if (opts.xAxis.calibration === true) {
    context.setStrokeStyle(opts.xAxis.gridColor || "#cccccc");
    context.setLineCap("butt");
    context.setLineWidth(1 * opts.pix);
    xAxisPoints.forEach(function(item, index2) {
      if (index2 > 0) {
        context.beginPath();
        context.moveTo(item - eachSpacing / 2, startY);
        context.lineTo(item - eachSpacing / 2, startY + 3 * opts.pix);
        context.closePath();
        context.stroke();
      }
    });
  }
  if (opts.xAxis.disableGrid !== true) {
    context.setStrokeStyle(opts.xAxis.gridColor || "#cccccc");
    context.setLineCap("butt");
    context.setLineWidth(1 * opts.pix);
    if (opts.xAxis.gridType == "dash") {
      context.setLineDash([opts.xAxis.dashLength * opts.pix, opts.xAxis.dashLength * opts.pix]);
    }
    opts.xAxis.gridEval = opts.xAxis.gridEval || 1;
    xAxisPoints.forEach(function(item, index2) {
      if (index2 % opts.xAxis.gridEval == 0) {
        context.beginPath();
        context.moveTo(item, startY);
        context.lineTo(item, endY);
        context.stroke();
      }
    });
    context.setLineDash([]);
  }
  if (opts.xAxis.disabled !== true) {
    let maxXAxisListLength = categories.length;
    if (opts.xAxis.labelCount) {
      if (opts.xAxis.itemCount) {
        maxXAxisListLength = Math.ceil(categories.length / opts.xAxis.itemCount * opts.xAxis.labelCount);
      } else {
        maxXAxisListLength = opts.xAxis.labelCount;
      }
      maxXAxisListLength -= 1;
    }
    let ratio = Math.ceil(categories.length / maxXAxisListLength);
    let newCategories = [];
    let cgLength = categories.length;
    for (let i = 0; i < cgLength; i++) {
      if (i % ratio !== 0) {
        newCategories.push("");
      } else {
        newCategories.push(categories[i]);
      }
    }
    newCategories[cgLength - 1] = categories[cgLength - 1];
    var xAxisFontSize = opts.xAxis.fontSize * opts.pix || config2.fontSize;
    if (config2._xAxisTextAngle_ === 0) {
      newCategories.forEach(function(item, index2) {
        var xitem = opts.xAxis.formatter ? opts.xAxis.formatter(item, index2, opts) : item;
        var offset = -measureText(String(xitem), xAxisFontSize, context) / 2;
        if (boundaryGap == "center") {
          offset += eachSpacing / 2;
        }
        if (opts.xAxis.scrollShow) {
          6 * opts.pix;
        }
        var _scrollDistance_ = opts._scrollDistance_ || 0;
        var truePoints = boundaryGap == "center" ? xAxisPoints[index2] + eachSpacing / 2 : xAxisPoints[index2];
        if (truePoints - Math.abs(_scrollDistance_) >= opts.area[3] - 1 && truePoints - Math.abs(_scrollDistance_) <= opts.width - opts.area[1] + 1) {
          context.beginPath();
          context.setFontSize(xAxisFontSize);
          context.setFillStyle(opts.xAxis.fontColor || opts.fontColor);
          context.fillText(String(xitem), xAxisPoints[index2] + offset, startY + opts.xAxis.marginTop * opts.pix + (opts.xAxis.lineHeight - opts.xAxis.fontSize) * opts.pix / 2 + opts.xAxis.fontSize * opts.pix);
          context.closePath();
          context.stroke();
        }
      });
    } else {
      newCategories.forEach(function(item, index2) {
        var xitem = opts.xAxis.formatter ? opts.xAxis.formatter(item) : item;
        var _scrollDistance_ = opts._scrollDistance_ || 0;
        var truePoints = boundaryGap == "center" ? xAxisPoints[index2] + eachSpacing / 2 : xAxisPoints[index2];
        if (truePoints - Math.abs(_scrollDistance_) >= opts.area[3] - 1 && truePoints - Math.abs(_scrollDistance_) <= opts.width - opts.area[1] + 1) {
          context.save();
          context.beginPath();
          context.setFontSize(xAxisFontSize);
          context.setFillStyle(opts.xAxis.fontColor || opts.fontColor);
          var textWidth = measureText(String(xitem), xAxisFontSize, context);
          var offsetX = xAxisPoints[index2];
          if (boundaryGap == "center") {
            offsetX = xAxisPoints[index2] + eachSpacing / 2;
          }
          if (opts.xAxis.scrollShow) {
            6 * opts.pix;
          }
          var offsetY = startY + opts.xAxis.marginTop * opts.pix + xAxisFontSize - xAxisFontSize * Math.abs(Math.sin(config2._xAxisTextAngle_));
          if (opts.xAxis.rotateAngle < 0) {
            offsetX -= xAxisFontSize / 2;
            textWidth = 0;
          } else {
            offsetX += xAxisFontSize / 2;
            textWidth = -textWidth;
          }
          context.translate(offsetX, offsetY);
          context.rotate(-1 * config2._xAxisTextAngle_);
          context.fillText(String(xitem), textWidth, 0);
          context.closePath();
          context.stroke();
          context.restore();
        }
      });
    }
  }
  context.restore();
  if (opts.xAxis.title) {
    context.beginPath();
    context.setFontSize(opts.xAxis.titleFontSize * opts.pix);
    context.setFillStyle(opts.xAxis.titleFontColor);
    context.fillText(String(opts.xAxis.title), opts.width - opts.area[1] + opts.xAxis.titleOffsetX * opts.pix, opts.height - opts.area[2] + opts.xAxis.marginTop * opts.pix + (opts.xAxis.lineHeight - opts.xAxis.titleFontSize) * opts.pix / 2 + (opts.xAxis.titleFontSize + opts.xAxis.titleOffsetY) * opts.pix);
    context.closePath();
    context.stroke();
  }
  if (opts.xAxis.axisLine) {
    context.beginPath();
    context.setStrokeStyle(opts.xAxis.axisLineColor);
    context.setLineWidth(1 * opts.pix);
    context.moveTo(startX, opts.height - opts.area[2]);
    context.lineTo(endX, opts.height - opts.area[2]);
    context.stroke();
  }
}
function drawYAxisGrid(categories, opts, config2, context) {
  if (opts.yAxis.disableGrid === true) {
    return;
  }
  let spacingValid = opts.height - opts.area[0] - opts.area[2];
  let eachSpacing = spacingValid / opts.yAxis.splitNumber;
  let startX = opts.area[3];
  let xAxisPoints = opts.chartData.xAxisData.xAxisPoints, xAxiseachSpacing = opts.chartData.xAxisData.eachSpacing;
  let TotalWidth = xAxiseachSpacing * (xAxisPoints.length - 1);
  if (opts.type == "mount" && opts.extra && opts.extra.mount && opts.extra.mount.widthRatio && opts.extra.mount.widthRatio > 1) {
    if (opts.extra.mount.widthRatio > 2)
      opts.extra.mount.widthRatio = 2;
    TotalWidth += (opts.extra.mount.widthRatio - 1) * xAxiseachSpacing;
  }
  let endX = startX + TotalWidth;
  let points = [];
  let startY = 1;
  if (opts.xAxis.axisLine === false) {
    startY = 0;
  }
  for (let i = startY; i < opts.yAxis.splitNumber + 1; i++) {
    points.push(opts.height - opts.area[2] - eachSpacing * i);
  }
  context.save();
  if (opts._scrollDistance_ && opts._scrollDistance_ !== 0) {
    context.translate(opts._scrollDistance_, 0);
  }
  if (opts.yAxis.gridType == "dash") {
    context.setLineDash([opts.yAxis.dashLength * opts.pix, opts.yAxis.dashLength * opts.pix]);
  }
  context.setStrokeStyle(opts.yAxis.gridColor);
  context.setLineWidth(1 * opts.pix);
  points.forEach(function(item, index2) {
    context.beginPath();
    context.moveTo(startX, item);
    context.lineTo(endX, item);
    context.stroke();
  });
  context.setLineDash([]);
  context.restore();
}
function drawYAxis(series, opts, config2, context) {
  if (opts.yAxis.disabled === true) {
    return;
  }
  var spacingValid = opts.height - opts.area[0] - opts.area[2];
  var eachSpacing = spacingValid / opts.yAxis.splitNumber;
  var startX = opts.area[3];
  var endX = opts.width - opts.area[1];
  var endY = opts.height - opts.area[2];
  context.beginPath();
  context.setFillStyle(opts.background);
  if (opts.enableScroll == true && opts.xAxis.scrollPosition && opts.xAxis.scrollPosition !== "left") {
    context.fillRect(0, 0, startX, endY + 2 * opts.pix);
  }
  if (opts.enableScroll == true && opts.xAxis.scrollPosition && opts.xAxis.scrollPosition !== "right") {
    context.fillRect(endX, 0, opts.width, endY + 2 * opts.pix);
  }
  context.closePath();
  context.stroke();
  let tStartLeft = opts.area[3];
  let tStartRight = opts.width - opts.area[1];
  let tStartCenter = opts.area[3] + (opts.width - opts.area[1] - opts.area[3]) / 2;
  if (opts.yAxis.data) {
    for (let i = 0; i < opts.yAxis.data.length; i++) {
      let yData = opts.yAxis.data[i];
      var points = [];
      if (yData.type === "categories") {
        for (let i2 = 0; i2 <= yData.categories.length; i2++) {
          points.push(opts.area[0] + spacingValid / yData.categories.length / 2 + spacingValid / yData.categories.length * i2);
        }
      } else {
        for (let i2 = 0; i2 <= opts.yAxis.splitNumber; i2++) {
          points.push(opts.area[0] + eachSpacing * i2);
        }
      }
      if (yData.disabled !== true) {
        let rangesFormat = opts.chartData.yAxisData.rangesFormat[i];
        let yAxisFontSize = yData.fontSize ? yData.fontSize * opts.pix : config2.fontSize;
        let yAxisWidth = opts.chartData.yAxisData.yAxisWidth[i];
        let textAlign = yData.textAlign || "right";
        rangesFormat.forEach(function(item, index2) {
          var pos = points[index2];
          context.beginPath();
          context.setFontSize(yAxisFontSize);
          context.setLineWidth(1 * opts.pix);
          context.setStrokeStyle(yData.axisLineColor || "#cccccc");
          context.setFillStyle(yData.fontColor || opts.fontColor);
          let tmpstrat = 0;
          let gapwidth = 4 * opts.pix;
          if (yAxisWidth.position == "left") {
            if (yData.calibration == true) {
              context.moveTo(tStartLeft, pos);
              context.lineTo(tStartLeft - 3 * opts.pix, pos);
              gapwidth += 3 * opts.pix;
            }
            switch (textAlign) {
              case "left":
                context.setTextAlign("left");
                tmpstrat = tStartLeft - yAxisWidth.width;
                break;
              case "right":
                context.setTextAlign("right");
                tmpstrat = tStartLeft - gapwidth;
                break;
              default:
                context.setTextAlign("center");
                tmpstrat = tStartLeft - yAxisWidth.width / 2;
            }
            context.fillText(String(item), tmpstrat, pos + yAxisFontSize / 2 - 3 * opts.pix);
          } else if (yAxisWidth.position == "right") {
            if (yData.calibration == true) {
              context.moveTo(tStartRight, pos);
              context.lineTo(tStartRight + 3 * opts.pix, pos);
              gapwidth += 3 * opts.pix;
            }
            switch (textAlign) {
              case "left":
                context.setTextAlign("left");
                tmpstrat = tStartRight + gapwidth;
                break;
              case "right":
                context.setTextAlign("right");
                tmpstrat = tStartRight + yAxisWidth.width;
                break;
              default:
                context.setTextAlign("center");
                tmpstrat = tStartRight + yAxisWidth.width / 2;
            }
            context.fillText(String(item), tmpstrat, pos + yAxisFontSize / 2 - 3 * opts.pix);
          } else if (yAxisWidth.position == "center") {
            if (yData.calibration == true) {
              context.moveTo(tStartCenter, pos);
              context.lineTo(tStartCenter - 3 * opts.pix, pos);
              gapwidth += 3 * opts.pix;
            }
            switch (textAlign) {
              case "left":
                context.setTextAlign("left");
                tmpstrat = tStartCenter - yAxisWidth.width;
                break;
              case "right":
                context.setTextAlign("right");
                tmpstrat = tStartCenter - gapwidth;
                break;
              default:
                context.setTextAlign("center");
                tmpstrat = tStartCenter - yAxisWidth.width / 2;
            }
            context.fillText(String(item), tmpstrat, pos + yAxisFontSize / 2 - 3 * opts.pix);
          }
          context.closePath();
          context.stroke();
          context.setTextAlign("left");
        });
        if (yData.axisLine !== false) {
          context.beginPath();
          context.setStrokeStyle(yData.axisLineColor || "#cccccc");
          context.setLineWidth(1 * opts.pix);
          if (yAxisWidth.position == "left") {
            context.moveTo(tStartLeft, opts.height - opts.area[2]);
            context.lineTo(tStartLeft, opts.area[0]);
          } else if (yAxisWidth.position == "right") {
            context.moveTo(tStartRight, opts.height - opts.area[2]);
            context.lineTo(tStartRight, opts.area[0]);
          } else if (yAxisWidth.position == "center") {
            context.moveTo(tStartCenter, opts.height - opts.area[2]);
            context.lineTo(tStartCenter, opts.area[0]);
          }
          context.stroke();
        }
        if (opts.yAxis.showTitle) {
          let titleFontSize = yData.titleFontSize * opts.pix || config2.fontSize;
          let title = yData.title;
          context.beginPath();
          context.setFontSize(titleFontSize);
          context.setFillStyle(yData.titleFontColor || opts.fontColor);
          if (yAxisWidth.position == "left") {
            context.fillText(title, tStartLeft - measureText(title, titleFontSize, context) / 2 + (yData.titleOffsetX || 0), opts.area[0] - (10 - (yData.titleOffsetY || 0)) * opts.pix);
          } else if (yAxisWidth.position == "right") {
            context.fillText(title, tStartRight - measureText(title, titleFontSize, context) / 2 + (yData.titleOffsetX || 0), opts.area[0] - (10 - (yData.titleOffsetY || 0)) * opts.pix);
          } else if (yAxisWidth.position == "center") {
            context.fillText(title, tStartCenter - measureText(title, titleFontSize, context) / 2 + (yData.titleOffsetX || 0), opts.area[0] - (10 - (yData.titleOffsetY || 0)) * opts.pix);
          }
          context.closePath();
          context.stroke();
        }
        if (yAxisWidth.position == "left") {
          tStartLeft -= yAxisWidth.width + opts.yAxis.padding * opts.pix;
        } else {
          tStartRight += yAxisWidth.width + opts.yAxis.padding * opts.pix;
        }
      }
    }
  }
}
function drawLegend(series, opts, config2, context, chartData) {
  if (opts.legend.show === false) {
    return;
  }
  let legendData = chartData.legendData;
  let legendList = legendData.points;
  let legendArea = legendData.area;
  let padding = opts.legend.padding * opts.pix;
  let fontSize = opts.legend.fontSize * opts.pix;
  let shapeWidth = 15 * opts.pix;
  let shapeRight = 5 * opts.pix;
  let itemGap = opts.legend.itemGap * opts.pix;
  let lineHeight = Math.max(opts.legend.lineHeight * opts.pix, fontSize);
  context.beginPath();
  context.setLineWidth(opts.legend.borderWidth * opts.pix);
  context.setStrokeStyle(opts.legend.borderColor);
  context.setFillStyle(opts.legend.backgroundColor);
  context.moveTo(legendArea.start.x, legendArea.start.y);
  context.rect(legendArea.start.x, legendArea.start.y, legendArea.width, legendArea.height);
  context.closePath();
  context.fill();
  context.stroke();
  legendList.forEach(function(itemList, listIndex) {
    let width = 0;
    let height = 0;
    width = legendData.widthArr[listIndex];
    height = legendData.heightArr[listIndex];
    let startX = 0;
    let startY = 0;
    if (opts.legend.position == "top" || opts.legend.position == "bottom") {
      switch (opts.legend.float) {
        case "left":
          startX = legendArea.start.x + padding;
          break;
        case "right":
          startX = legendArea.start.x + legendArea.width - width;
          break;
        default:
          startX = legendArea.start.x + (legendArea.width - width) / 2;
      }
      startY = legendArea.start.y + padding + listIndex * lineHeight;
    } else {
      if (listIndex == 0) {
        width = 0;
      } else {
        width = legendData.widthArr[listIndex - 1];
      }
      startX = legendArea.start.x + padding + width;
      startY = legendArea.start.y + padding + (legendArea.height - height) / 2;
    }
    context.setFontSize(config2.fontSize);
    for (let i = 0; i < itemList.length; i++) {
      let item = itemList[i];
      item.area = [0, 0, 0, 0];
      item.area[0] = startX;
      item.area[1] = startY;
      item.area[3] = startY + lineHeight;
      context.beginPath();
      context.setLineWidth(1 * opts.pix);
      context.setStrokeStyle(item.show ? item.color : opts.legend.hiddenColor);
      context.setFillStyle(item.show ? item.color : opts.legend.hiddenColor);
      switch (item.legendShape) {
        case "line":
          context.moveTo(startX, startY + 0.5 * lineHeight - 2 * opts.pix);
          context.fillRect(startX, startY + 0.5 * lineHeight - 2 * opts.pix, 15 * opts.pix, 4 * opts.pix);
          break;
        case "triangle":
          context.moveTo(startX + 7.5 * opts.pix, startY + 0.5 * lineHeight - 5 * opts.pix);
          context.lineTo(startX + 2.5 * opts.pix, startY + 0.5 * lineHeight + 5 * opts.pix);
          context.lineTo(startX + 12.5 * opts.pix, startY + 0.5 * lineHeight + 5 * opts.pix);
          context.lineTo(startX + 7.5 * opts.pix, startY + 0.5 * lineHeight - 5 * opts.pix);
          break;
        case "diamond":
          context.moveTo(startX + 7.5 * opts.pix, startY + 0.5 * lineHeight - 5 * opts.pix);
          context.lineTo(startX + 2.5 * opts.pix, startY + 0.5 * lineHeight);
          context.lineTo(startX + 7.5 * opts.pix, startY + 0.5 * lineHeight + 5 * opts.pix);
          context.lineTo(startX + 12.5 * opts.pix, startY + 0.5 * lineHeight);
          context.lineTo(startX + 7.5 * opts.pix, startY + 0.5 * lineHeight - 5 * opts.pix);
          break;
        case "circle":
          context.moveTo(startX + 7.5 * opts.pix, startY + 0.5 * lineHeight);
          context.arc(startX + 7.5 * opts.pix, startY + 0.5 * lineHeight, 5 * opts.pix, 0, 2 * Math.PI);
          break;
        case "rect":
          context.moveTo(startX, startY + 0.5 * lineHeight - 5 * opts.pix);
          context.fillRect(startX, startY + 0.5 * lineHeight - 5 * opts.pix, 15 * opts.pix, 10 * opts.pix);
          break;
        case "square":
          context.moveTo(startX + 5 * opts.pix, startY + 0.5 * lineHeight - 5 * opts.pix);
          context.fillRect(startX + 5 * opts.pix, startY + 0.5 * lineHeight - 5 * opts.pix, 10 * opts.pix, 10 * opts.pix);
          break;
        case "none":
          break;
        default:
          context.moveTo(startX, startY + 0.5 * lineHeight - 5 * opts.pix);
          context.fillRect(startX, startY + 0.5 * lineHeight - 5 * opts.pix, 15 * opts.pix, 10 * opts.pix);
      }
      context.closePath();
      context.fill();
      context.stroke();
      startX += shapeWidth + shapeRight;
      let fontTrans = 0.5 * lineHeight + 0.5 * fontSize - 2;
      const legendText = item.legendText ? item.legendText : item.name;
      context.beginPath();
      context.setFontSize(fontSize);
      context.setFillStyle(item.show ? opts.legend.fontColor : opts.legend.hiddenColor);
      context.fillText(legendText, startX, startY + fontTrans);
      context.closePath();
      context.stroke();
      if (opts.legend.position == "top" || opts.legend.position == "bottom") {
        startX += measureText(legendText, fontSize, context) + itemGap;
        item.area[2] = startX;
      } else {
        item.area[2] = startX + measureText(legendText, fontSize, context) + itemGap;
        startX -= shapeWidth + shapeRight;
        startY += lineHeight;
      }
    }
  });
}
function drawPieDataPoints(series, opts, config2, context) {
  var process = arguments.length > 4 && arguments[4] !== void 0 ? arguments[4] : 1;
  var pieOption = assign({}, {
    activeOpacity: 0.5,
    activeRadius: 10,
    offsetAngle: 0,
    labelWidth: 15,
    ringWidth: 30,
    customRadius: 0,
    border: false,
    borderWidth: 2,
    borderColor: "#FFFFFF",
    centerColor: "#FFFFFF",
    linearType: "none",
    customColor: []
  }, opts.type == "pie" ? opts.extra.pie : opts.extra.ring);
  var centerPosition = {
    x: opts.area[3] + (opts.width - opts.area[1] - opts.area[3]) / 2,
    y: opts.area[0] + (opts.height - opts.area[0] - opts.area[2]) / 2
  };
  if (config2.pieChartLinePadding == 0) {
    config2.pieChartLinePadding = pieOption.activeRadius * opts.pix;
  }
  var radius = Math.min((opts.width - opts.area[1] - opts.area[3]) / 2 - config2.pieChartLinePadding - config2.pieChartTextPadding - config2._pieTextMaxLength_, (opts.height - opts.area[0] - opts.area[2]) / 2 - config2.pieChartLinePadding - config2.pieChartTextPadding);
  radius = radius < 10 ? 10 : radius;
  if (pieOption.customRadius > 0) {
    radius = pieOption.customRadius * opts.pix;
  }
  series = getPieDataPoints(series, radius, process);
  var activeRadius = pieOption.activeRadius * opts.pix;
  pieOption.customColor = fillCustomColor(pieOption.linearType, pieOption.customColor, series, config2);
  series = series.map(function(eachSeries) {
    eachSeries._start_ += pieOption.offsetAngle * Math.PI / 180;
    return eachSeries;
  });
  series.forEach(function(eachSeries, seriesIndex) {
    if (opts.tooltip) {
      if (opts.tooltip.index == seriesIndex) {
        context.beginPath();
        context.setFillStyle(hexToRgb(eachSeries.color, pieOption.activeOpacity || 0.5));
        context.moveTo(centerPosition.x, centerPosition.y);
        context.arc(centerPosition.x, centerPosition.y, eachSeries._radius_ + activeRadius, eachSeries._start_, eachSeries._start_ + 2 * eachSeries._proportion_ * Math.PI);
        context.closePath();
        context.fill();
      }
    }
    context.beginPath();
    context.setLineWidth(pieOption.borderWidth * opts.pix);
    context.lineJoin = "round";
    context.setStrokeStyle(pieOption.borderColor);
    var fillcolor = eachSeries.color;
    if (pieOption.linearType == "custom") {
      var grd;
      if (context.createCircularGradient) {
        grd = context.createCircularGradient(centerPosition.x, centerPosition.y, eachSeries._radius_);
      } else {
        grd = context.createRadialGradient(centerPosition.x, centerPosition.y, 0, centerPosition.x, centerPosition.y, eachSeries._radius_);
      }
      grd.addColorStop(0, hexToRgb(pieOption.customColor[eachSeries.linearIndex], 1));
      grd.addColorStop(1, hexToRgb(eachSeries.color, 1));
      fillcolor = grd;
    }
    context.setFillStyle(fillcolor);
    context.moveTo(centerPosition.x, centerPosition.y);
    context.arc(centerPosition.x, centerPosition.y, eachSeries._radius_, eachSeries._start_, eachSeries._start_ + 2 * eachSeries._proportion_ * Math.PI);
    context.closePath();
    context.fill();
    if (pieOption.border == true) {
      context.stroke();
    }
  });
  if (opts.type === "ring") {
    var innerPieWidth = radius * 0.6;
    if (typeof pieOption.ringWidth === "number" && pieOption.ringWidth > 0) {
      innerPieWidth = Math.max(0, radius - pieOption.ringWidth * opts.pix);
    }
    context.beginPath();
    context.setFillStyle(pieOption.centerColor);
    context.moveTo(centerPosition.x, centerPosition.y);
    context.arc(centerPosition.x, centerPosition.y, innerPieWidth, 0, 2 * Math.PI);
    context.closePath();
    context.fill();
  }
  if (opts.dataLabel !== false && process === 1) {
    drawPieText(series, opts, config2, context, radius, centerPosition);
  }
  if (process === 1 && opts.type === "ring") {
    drawRingTitle(opts, config2, context, centerPosition);
  }
  return {
    center: centerPosition,
    radius,
    series
  };
}
function drawRoseDataPoints(series, opts, config2, context) {
  var process = arguments.length > 4 && arguments[4] !== void 0 ? arguments[4] : 1;
  var roseOption = assign({}, {
    type: "area",
    activeOpacity: 0.5,
    activeRadius: 10,
    offsetAngle: 0,
    labelWidth: 15,
    border: false,
    borderWidth: 2,
    borderColor: "#FFFFFF",
    linearType: "none",
    customColor: []
  }, opts.extra.rose);
  if (config2.pieChartLinePadding == 0) {
    config2.pieChartLinePadding = roseOption.activeRadius * opts.pix;
  }
  var centerPosition = {
    x: opts.area[3] + (opts.width - opts.area[1] - opts.area[3]) / 2,
    y: opts.area[0] + (opts.height - opts.area[0] - opts.area[2]) / 2
  };
  var radius = Math.min((opts.width - opts.area[1] - opts.area[3]) / 2 - config2.pieChartLinePadding - config2.pieChartTextPadding - config2._pieTextMaxLength_, (opts.height - opts.area[0] - opts.area[2]) / 2 - config2.pieChartLinePadding - config2.pieChartTextPadding);
  radius = radius < 10 ? 10 : radius;
  var minRadius = roseOption.minRadius || radius * 0.5;
  if (radius < minRadius) {
    radius = minRadius + 10;
  }
  series = getRoseDataPoints(series, roseOption.type, minRadius, radius, process);
  var activeRadius = roseOption.activeRadius * opts.pix;
  roseOption.customColor = fillCustomColor(roseOption.linearType, roseOption.customColor, series, config2);
  series = series.map(function(eachSeries) {
    eachSeries._start_ += (roseOption.offsetAngle || 0) * Math.PI / 180;
    return eachSeries;
  });
  series.forEach(function(eachSeries, seriesIndex) {
    if (opts.tooltip) {
      if (opts.tooltip.index == seriesIndex) {
        context.beginPath();
        context.setFillStyle(hexToRgb(eachSeries.color, roseOption.activeOpacity || 0.5));
        context.moveTo(centerPosition.x, centerPosition.y);
        context.arc(centerPosition.x, centerPosition.y, activeRadius + eachSeries._radius_, eachSeries._start_, eachSeries._start_ + 2 * eachSeries._rose_proportion_ * Math.PI);
        context.closePath();
        context.fill();
      }
    }
    context.beginPath();
    context.setLineWidth(roseOption.borderWidth * opts.pix);
    context.lineJoin = "round";
    context.setStrokeStyle(roseOption.borderColor);
    var fillcolor = eachSeries.color;
    if (roseOption.linearType == "custom") {
      var grd;
      if (context.createCircularGradient) {
        grd = context.createCircularGradient(centerPosition.x, centerPosition.y, eachSeries._radius_);
      } else {
        grd = context.createRadialGradient(centerPosition.x, centerPosition.y, 0, centerPosition.x, centerPosition.y, eachSeries._radius_);
      }
      grd.addColorStop(0, hexToRgb(roseOption.customColor[eachSeries.linearIndex], 1));
      grd.addColorStop(1, hexToRgb(eachSeries.color, 1));
      fillcolor = grd;
    }
    context.setFillStyle(fillcolor);
    context.moveTo(centerPosition.x, centerPosition.y);
    context.arc(centerPosition.x, centerPosition.y, eachSeries._radius_, eachSeries._start_, eachSeries._start_ + 2 * eachSeries._rose_proportion_ * Math.PI);
    context.closePath();
    context.fill();
    if (roseOption.border == true) {
      context.stroke();
    }
  });
  if (opts.dataLabel !== false && process === 1) {
    drawPieText(series, opts, config2, context, radius, centerPosition);
  }
  return {
    center: centerPosition,
    radius,
    series
  };
}
function drawArcbarDataPoints(series, opts, config2, context) {
  var process = arguments.length > 4 && arguments[4] !== void 0 ? arguments[4] : 1;
  var arcbarOption = assign({}, {
    startAngle: 0.75,
    endAngle: 0.25,
    type: "default",
    direction: "cw",
    lineCap: "round",
    width: 12,
    gap: 2,
    linearType: "none",
    customColor: []
  }, opts.extra.arcbar);
  series = getArcbarDataPoints(series, arcbarOption, process);
  var centerPosition;
  if (arcbarOption.centerX || arcbarOption.centerY) {
    centerPosition = {
      x: arcbarOption.centerX ? arcbarOption.centerX : opts.width / 2,
      y: arcbarOption.centerY ? arcbarOption.centerY : opts.height / 2
    };
  } else {
    centerPosition = {
      x: opts.width / 2,
      y: opts.height / 2
    };
  }
  var radius;
  if (arcbarOption.radius) {
    radius = arcbarOption.radius;
  } else {
    radius = Math.min(centerPosition.x, centerPosition.y);
    radius -= 5 * opts.pix;
    radius -= arcbarOption.width / 2;
  }
  radius = radius < 10 ? 10 : radius;
  arcbarOption.customColor = fillCustomColor(arcbarOption.linearType, arcbarOption.customColor, series, config2);
  for (let i = 0; i < series.length; i++) {
    let eachSeries = series[i];
    context.setLineWidth(arcbarOption.width * opts.pix);
    context.setStrokeStyle(arcbarOption.backgroundColor || "#E9E9E9");
    context.setLineCap(arcbarOption.lineCap);
    context.beginPath();
    if (arcbarOption.type == "default") {
      context.arc(centerPosition.x, centerPosition.y, radius - (arcbarOption.width * opts.pix + arcbarOption.gap * opts.pix) * i, arcbarOption.startAngle * Math.PI, arcbarOption.endAngle * Math.PI, arcbarOption.direction == "ccw");
    } else {
      context.arc(centerPosition.x, centerPosition.y, radius - (arcbarOption.width * opts.pix + arcbarOption.gap * opts.pix) * i, 0, 2 * Math.PI, arcbarOption.direction == "ccw");
    }
    context.stroke();
    var fillColor = eachSeries.color;
    if (arcbarOption.linearType == "custom") {
      var grd = context.createLinearGradient(centerPosition.x - radius, centerPosition.y, centerPosition.x + radius, centerPosition.y);
      grd.addColorStop(1, hexToRgb(arcbarOption.customColor[eachSeries.linearIndex], 1));
      grd.addColorStop(0, hexToRgb(eachSeries.color, 1));
      fillColor = grd;
    }
    context.setLineWidth(arcbarOption.width * opts.pix);
    context.setStrokeStyle(fillColor);
    context.setLineCap(arcbarOption.lineCap);
    context.beginPath();
    context.arc(centerPosition.x, centerPosition.y, radius - (arcbarOption.width * opts.pix + arcbarOption.gap * opts.pix) * i, arcbarOption.startAngle * Math.PI, eachSeries._proportion_ * Math.PI, arcbarOption.direction == "ccw");
    context.stroke();
  }
  drawRingTitle(opts, config2, context, centerPosition);
  return {
    center: centerPosition,
    radius,
    series
  };
}
function drawGaugeDataPoints(categories, series, opts, config2, context) {
  var process = arguments.length > 5 && arguments[5] !== void 0 ? arguments[5] : 1;
  var gaugeOption = assign({}, {
    type: "default",
    startAngle: 0.75,
    endAngle: 0.25,
    width: 15,
    labelOffset: 13,
    splitLine: {
      fixRadius: 0,
      splitNumber: 10,
      width: 15,
      color: "#FFFFFF",
      childNumber: 5,
      childWidth: 5
    },
    pointer: {
      width: 15,
      color: "auto"
    }
  }, opts.extra.gauge);
  if (gaugeOption.oldAngle == void 0) {
    gaugeOption.oldAngle = gaugeOption.startAngle;
  }
  if (gaugeOption.oldData == void 0) {
    gaugeOption.oldData = 0;
  }
  categories = getGaugeAxisPoints(categories, gaugeOption.startAngle, gaugeOption.endAngle);
  var centerPosition = {
    x: opts.width / 2,
    y: opts.height / 2
  };
  var radius = Math.min(centerPosition.x, centerPosition.y);
  radius -= 5 * opts.pix;
  radius -= gaugeOption.width / 2;
  radius = radius < 10 ? 10 : radius;
  var innerRadius = radius - gaugeOption.width;
  var totalAngle = 0;
  if (gaugeOption.type == "progress") {
    var pieRadius = radius - gaugeOption.width * 3;
    context.beginPath();
    let gradient = context.createLinearGradient(centerPosition.x, centerPosition.y - pieRadius, centerPosition.x, centerPosition.y + pieRadius);
    gradient.addColorStop("0", hexToRgb(series[0].color, 0.3));
    gradient.addColorStop("1.0", hexToRgb("#FFFFFF", 0.1));
    context.setFillStyle(gradient);
    context.arc(centerPosition.x, centerPosition.y, pieRadius, 0, 2 * Math.PI, false);
    context.fill();
    context.setLineWidth(gaugeOption.width);
    context.setStrokeStyle(hexToRgb(series[0].color, 0.3));
    context.setLineCap("round");
    context.beginPath();
    context.arc(centerPosition.x, centerPosition.y, innerRadius, gaugeOption.startAngle * Math.PI, gaugeOption.endAngle * Math.PI, false);
    context.stroke();
    if (gaugeOption.endAngle < gaugeOption.startAngle) {
      totalAngle = 2 + gaugeOption.endAngle - gaugeOption.startAngle;
    } else {
      totalAngle = gaugeOption.startAngle - gaugeOption.endAngle;
    }
    totalAngle / gaugeOption.splitLine.splitNumber;
    let childAngle = totalAngle / gaugeOption.splitLine.splitNumber / gaugeOption.splitLine.childNumber;
    let startX = -radius - gaugeOption.width * 0.5 - gaugeOption.splitLine.fixRadius;
    let endX = -radius - gaugeOption.width - gaugeOption.splitLine.fixRadius + gaugeOption.splitLine.width;
    context.save();
    context.translate(centerPosition.x, centerPosition.y);
    context.rotate((gaugeOption.startAngle - 1) * Math.PI);
    let len = gaugeOption.splitLine.splitNumber * gaugeOption.splitLine.childNumber + 1;
    let proc = series[0].data * process;
    for (let i = 0; i < len; i++) {
      context.beginPath();
      if (proc > i / len) {
        context.setStrokeStyle(hexToRgb(series[0].color, 1));
      } else {
        context.setStrokeStyle(hexToRgb(series[0].color, 0.3));
      }
      context.setLineWidth(3 * opts.pix);
      context.moveTo(startX, 0);
      context.lineTo(endX, 0);
      context.stroke();
      context.rotate(childAngle * Math.PI);
    }
    context.restore();
    series = getGaugeArcbarDataPoints(series, gaugeOption, process);
    context.setLineWidth(gaugeOption.width);
    context.setStrokeStyle(series[0].color);
    context.setLineCap("round");
    context.beginPath();
    context.arc(centerPosition.x, centerPosition.y, innerRadius, gaugeOption.startAngle * Math.PI, series[0]._proportion_ * Math.PI, false);
    context.stroke();
    let pointerRadius = radius - gaugeOption.width * 2.5;
    context.save();
    context.translate(centerPosition.x, centerPosition.y);
    context.rotate((series[0]._proportion_ - 1) * Math.PI);
    context.beginPath();
    context.setLineWidth(gaugeOption.width / 3);
    let gradient3 = context.createLinearGradient(0, -pointerRadius * 0.6, 0, pointerRadius * 0.6);
    gradient3.addColorStop("0", hexToRgb("#FFFFFF", 0));
    gradient3.addColorStop("0.5", hexToRgb(series[0].color, 1));
    gradient3.addColorStop("1.0", hexToRgb("#FFFFFF", 0));
    context.setStrokeStyle(gradient3);
    context.arc(0, 0, pointerRadius, 0.85 * Math.PI, 1.15 * Math.PI, false);
    context.stroke();
    context.beginPath();
    context.setLineWidth(1);
    context.setStrokeStyle(series[0].color);
    context.setFillStyle(series[0].color);
    context.moveTo(-pointerRadius - gaugeOption.width / 3 / 2, -4);
    context.lineTo(-pointerRadius - gaugeOption.width / 3 / 2 - 4, 0);
    context.lineTo(-pointerRadius - gaugeOption.width / 3 / 2, 4);
    context.lineTo(-pointerRadius - gaugeOption.width / 3 / 2, -4);
    context.stroke();
    context.fill();
    context.restore();
  } else {
    context.setLineWidth(gaugeOption.width);
    context.setLineCap("butt");
    for (let i = 0; i < categories.length; i++) {
      let eachCategories = categories[i];
      context.beginPath();
      context.setStrokeStyle(eachCategories.color);
      context.arc(centerPosition.x, centerPosition.y, radius, eachCategories._startAngle_ * Math.PI, eachCategories._endAngle_ * Math.PI, false);
      context.stroke();
    }
    context.save();
    if (gaugeOption.endAngle < gaugeOption.startAngle) {
      totalAngle = 2 + gaugeOption.endAngle - gaugeOption.startAngle;
    } else {
      totalAngle = gaugeOption.startAngle - gaugeOption.endAngle;
    }
    let splitAngle = totalAngle / gaugeOption.splitLine.splitNumber;
    let childAngle = totalAngle / gaugeOption.splitLine.splitNumber / gaugeOption.splitLine.childNumber;
    let startX = -radius - gaugeOption.width * 0.5 - gaugeOption.splitLine.fixRadius;
    let endX = -radius - gaugeOption.width * 0.5 - gaugeOption.splitLine.fixRadius + gaugeOption.splitLine.width;
    let childendX = -radius - gaugeOption.width * 0.5 - gaugeOption.splitLine.fixRadius + gaugeOption.splitLine.childWidth;
    context.translate(centerPosition.x, centerPosition.y);
    context.rotate((gaugeOption.startAngle - 1) * Math.PI);
    for (let i = 0; i < gaugeOption.splitLine.splitNumber + 1; i++) {
      context.beginPath();
      context.setStrokeStyle(gaugeOption.splitLine.color);
      context.setLineWidth(2 * opts.pix);
      context.moveTo(startX, 0);
      context.lineTo(endX, 0);
      context.stroke();
      context.rotate(splitAngle * Math.PI);
    }
    context.restore();
    context.save();
    context.translate(centerPosition.x, centerPosition.y);
    context.rotate((gaugeOption.startAngle - 1) * Math.PI);
    for (let i = 0; i < gaugeOption.splitLine.splitNumber * gaugeOption.splitLine.childNumber + 1; i++) {
      context.beginPath();
      context.setStrokeStyle(gaugeOption.splitLine.color);
      context.setLineWidth(1 * opts.pix);
      context.moveTo(startX, 0);
      context.lineTo(childendX, 0);
      context.stroke();
      context.rotate(childAngle * Math.PI);
    }
    context.restore();
    series = getGaugeDataPoints(series, categories, gaugeOption, process);
    for (let i = 0; i < series.length; i++) {
      let eachSeries = series[i];
      context.save();
      context.translate(centerPosition.x, centerPosition.y);
      context.rotate((eachSeries._proportion_ - 1) * Math.PI);
      context.beginPath();
      context.setFillStyle(eachSeries.color);
      context.moveTo(gaugeOption.pointer.width, 0);
      context.lineTo(0, -gaugeOption.pointer.width / 2);
      context.lineTo(-innerRadius, 0);
      context.lineTo(0, gaugeOption.pointer.width / 2);
      context.lineTo(gaugeOption.pointer.width, 0);
      context.closePath();
      context.fill();
      context.beginPath();
      context.setFillStyle("#FFFFFF");
      context.arc(0, 0, gaugeOption.pointer.width / 6, 0, 2 * Math.PI, false);
      context.fill();
      context.restore();
    }
    if (opts.dataLabel !== false) {
      drawGaugeLabel(gaugeOption, radius, centerPosition, opts, config2, context);
    }
  }
  drawRingTitle(opts, config2, context, centerPosition);
  if (process === 1 && opts.type === "gauge") {
    opts.extra.gauge.oldAngle = series[0]._proportion_;
    opts.extra.gauge.oldData = series[0].data;
  }
  return {
    center: centerPosition,
    radius,
    innerRadius,
    categories,
    totalAngle
  };
}
function drawRadarDataPoints(series, opts, config2, context) {
  var process = arguments.length > 4 && arguments[4] !== void 0 ? arguments[4] : 1;
  var radarOption = assign({}, {
    gridColor: "#cccccc",
    gridType: "radar",
    gridEval: 1,
    axisLabel: false,
    axisLabelTofix: 0,
    labelShow: true,
    labelColor: "#666666",
    labelPointShow: false,
    labelPointRadius: 3,
    labelPointColor: "#cccccc",
    opacity: 0.2,
    gridCount: 3,
    border: false,
    borderWidth: 2,
    linearType: "none",
    customColor: []
  }, opts.extra.radar);
  var coordinateAngle = getRadarCoordinateSeries(opts.categories.length);
  var centerPosition = {
    x: opts.area[3] + (opts.width - opts.area[1] - opts.area[3]) / 2,
    y: opts.area[0] + (opts.height - opts.area[0] - opts.area[2]) / 2
  };
  var xr = (opts.width - opts.area[1] - opts.area[3]) / 2;
  var yr = (opts.height - opts.area[0] - opts.area[2]) / 2;
  var radius = Math.min(xr - (getMaxTextListLength(opts.categories, config2.fontSize, context) + config2.radarLabelTextMargin), yr - config2.radarLabelTextMargin);
  radius -= config2.radarLabelTextMargin * opts.pix;
  radius = radius < 10 ? 10 : radius;
  radius = radarOption.radius ? radarOption.radius : radius;
  context.beginPath();
  context.setLineWidth(1 * opts.pix);
  context.setStrokeStyle(radarOption.gridColor);
  coordinateAngle.forEach(function(angle, index2) {
    var pos = convertCoordinateOrigin(radius * Math.cos(angle), radius * Math.sin(angle), centerPosition);
    context.moveTo(centerPosition.x, centerPosition.y);
    if (index2 % radarOption.gridEval == 0) {
      context.lineTo(pos.x, pos.y);
    }
  });
  context.stroke();
  context.closePath();
  var _loop = function _loop2(i2) {
    var startPos = {};
    context.beginPath();
    context.setLineWidth(1 * opts.pix);
    context.setStrokeStyle(radarOption.gridColor);
    if (radarOption.gridType == "radar") {
      coordinateAngle.forEach(function(angle, index2) {
        var pos2 = convertCoordinateOrigin(radius / radarOption.gridCount * i2 * Math.cos(angle), radius / radarOption.gridCount * i2 * Math.sin(angle), centerPosition);
        if (index2 === 0) {
          startPos = pos2;
          context.moveTo(pos2.x, pos2.y);
        } else {
          context.lineTo(pos2.x, pos2.y);
        }
      });
      context.lineTo(startPos.x, startPos.y);
    } else {
      var pos = convertCoordinateOrigin(radius / radarOption.gridCount * i2 * Math.cos(1.5), radius / radarOption.gridCount * i2 * Math.sin(1.5), centerPosition);
      context.arc(centerPosition.x, centerPosition.y, centerPosition.y - pos.y, 0, 2 * Math.PI, false);
    }
    context.stroke();
    context.closePath();
  };
  for (var i = 1; i <= radarOption.gridCount; i++) {
    _loop(i);
  }
  radarOption.customColor = fillCustomColor(radarOption.linearType, radarOption.customColor, series, config2);
  var radarDataPoints = getRadarDataPoints(coordinateAngle, centerPosition, radius, series, opts, process);
  radarDataPoints.forEach(function(eachSeries, seriesIndex) {
    context.beginPath();
    context.setLineWidth(radarOption.borderWidth * opts.pix);
    context.setStrokeStyle(eachSeries.color);
    var fillcolor = hexToRgb(eachSeries.color, radarOption.opacity);
    if (radarOption.linearType == "custom") {
      var grd;
      if (context.createCircularGradient) {
        grd = context.createCircularGradient(centerPosition.x, centerPosition.y, radius);
      } else {
        grd = context.createRadialGradient(centerPosition.x, centerPosition.y, 0, centerPosition.x, centerPosition.y, radius);
      }
      grd.addColorStop(0, hexToRgb(radarOption.customColor[series[seriesIndex].linearIndex], radarOption.opacity));
      grd.addColorStop(1, hexToRgb(eachSeries.color, radarOption.opacity));
      fillcolor = grd;
    }
    context.setFillStyle(fillcolor);
    eachSeries.data.forEach(function(item, index2) {
      if (index2 === 0) {
        context.moveTo(item.position.x, item.position.y);
      } else {
        context.lineTo(item.position.x, item.position.y);
      }
    });
    context.closePath();
    context.fill();
    if (radarOption.border === true) {
      context.stroke();
    }
    context.closePath();
    if (opts.dataPointShape !== false) {
      var points = eachSeries.data.map(function(item) {
        return item.position;
      });
      drawPointShape(points, eachSeries.color, eachSeries.pointShape, context, opts);
    }
  });
  if (radarOption.axisLabel === true) {
    const maxData = Math.max(radarOption.max, Math.max.apply(null, dataCombine(series)));
    const stepLength = radius / radarOption.gridCount;
    const fontSize = opts.fontSize * opts.pix;
    context.setFontSize(fontSize);
    context.setFillStyle(opts.fontColor);
    context.setTextAlign("left");
    for (var i = 0; i < radarOption.gridCount + 1; i++) {
      let label = i * maxData / radarOption.gridCount;
      label = label.toFixed(radarOption.axisLabelTofix);
      context.fillText(String(label), centerPosition.x + 3 * opts.pix, centerPosition.y - i * stepLength + fontSize / 2);
    }
  }
  drawRadarLabel(coordinateAngle, radius, centerPosition, opts, config2, context);
  if (opts.dataLabel !== false && process === 1) {
    radarDataPoints.forEach(function(eachSeries, seriesIndex) {
      context.beginPath();
      var fontSize = eachSeries.textSize * opts.pix || config2.fontSize;
      context.setFontSize(fontSize);
      context.setFillStyle(eachSeries.textColor || opts.fontColor);
      eachSeries.data.forEach(function(item, index2) {
        if (Math.abs(item.position.x - centerPosition.x) < 2) {
          if (item.position.y < centerPosition.y) {
            context.setTextAlign("center");
            context.fillText(item.value, item.position.x, item.position.y - 4);
          } else {
            context.setTextAlign("center");
            context.fillText(item.value, item.position.x, item.position.y + fontSize + 2);
          }
        } else {
          if (item.position.x < centerPosition.x) {
            context.setTextAlign("right");
            context.fillText(item.value, item.position.x - 4, item.position.y + fontSize / 2 - 2);
          } else {
            context.setTextAlign("left");
            context.fillText(item.value, item.position.x + 4, item.position.y + fontSize / 2 - 2);
          }
        }
      });
      context.closePath();
      context.stroke();
    });
    context.setTextAlign("left");
  }
  return {
    center: centerPosition,
    radius,
    angleList: coordinateAngle
  };
}
function lonlat2mercator(longitude, latitude) {
  var mercator = Array(2);
  var x = longitude * 2003750834e-2 / 180;
  var y = Math.log(Math.tan((90 + latitude) * Math.PI / 360)) / (Math.PI / 180);
  y = y * 2003750834e-2 / 180;
  mercator[0] = x;
  mercator[1] = y;
  return mercator;
}
function getBoundingBox(data) {
  var bounds = {}, coords;
  bounds.xMin = 180;
  bounds.xMax = 0;
  bounds.yMin = 90;
  bounds.yMax = 0;
  for (var i = 0; i < data.length; i++) {
    var coorda = data[i].geometry.coordinates;
    for (var k = 0; k < coorda.length; k++) {
      coords = coorda[k];
      if (coords.length == 1) {
        coords = coords[0];
      }
      for (var j = 0; j < coords.length; j++) {
        var longitude = coords[j][0];
        var latitude = coords[j][1];
        var point = {
          x: longitude,
          y: latitude
        };
        bounds.xMin = bounds.xMin < point.x ? bounds.xMin : point.x;
        bounds.xMax = bounds.xMax > point.x ? bounds.xMax : point.x;
        bounds.yMin = bounds.yMin < point.y ? bounds.yMin : point.y;
        bounds.yMax = bounds.yMax > point.y ? bounds.yMax : point.y;
      }
    }
  }
  return bounds;
}
function coordinateToPoint(latitude, longitude, bounds, scale, xoffset, yoffset) {
  return {
    x: (longitude - bounds.xMin) * scale + xoffset,
    y: (bounds.yMax - latitude) * scale + yoffset
  };
}
function pointToCoordinate(pointY, pointX, bounds, scale, xoffset, yoffset) {
  return {
    x: (pointX - xoffset) / scale + bounds.xMin,
    y: bounds.yMax - (pointY - yoffset) / scale
  };
}
function isRayIntersectsSegment(poi, s_poi, e_poi) {
  if (s_poi[1] == e_poi[1]) {
    return false;
  }
  if (s_poi[1] > poi[1] && e_poi[1] > poi[1]) {
    return false;
  }
  if (s_poi[1] < poi[1] && e_poi[1] < poi[1]) {
    return false;
  }
  if (s_poi[1] == poi[1] && e_poi[1] > poi[1]) {
    return false;
  }
  if (e_poi[1] == poi[1] && s_poi[1] > poi[1]) {
    return false;
  }
  if (s_poi[0] < poi[0] && e_poi[1] < poi[1]) {
    return false;
  }
  let xseg = e_poi[0] - (e_poi[0] - s_poi[0]) * (e_poi[1] - poi[1]) / (e_poi[1] - s_poi[1]);
  if (xseg < poi[0]) {
    return false;
  } else {
    return true;
  }
}
function isPoiWithinPoly(poi, poly, mercator) {
  let sinsc = 0;
  for (let i = 0; i < poly.length; i++) {
    let epoly = poly[i][0];
    if (poly.length == 1) {
      epoly = poly[i][0];
    }
    for (let j = 0; j < epoly.length - 1; j++) {
      let s_poi = epoly[j];
      let e_poi = epoly[j + 1];
      if (mercator) {
        s_poi = lonlat2mercator(epoly[j][0], epoly[j][1]);
        e_poi = lonlat2mercator(epoly[j + 1][0], epoly[j + 1][1]);
      }
      if (isRayIntersectsSegment(poi, s_poi, e_poi)) {
        sinsc += 1;
      }
    }
  }
  if (sinsc % 2 == 1) {
    return true;
  } else {
    return false;
  }
}
function drawMapDataPoints(series, opts, config2, context) {
  var mapOption = assign({}, {
    border: true,
    mercator: false,
    borderWidth: 1,
    active: true,
    borderColor: "#666666",
    fillOpacity: 0.6,
    activeBorderColor: "#f04864",
    activeFillColor: "#facc14",
    activeFillOpacity: 1
  }, opts.extra.map);
  var coords, point;
  var data = series;
  var bounds = getBoundingBox(data);
  if (mapOption.mercator) {
    var max = lonlat2mercator(bounds.xMax, bounds.yMax);
    var min = lonlat2mercator(bounds.xMin, bounds.yMin);
    bounds.xMax = max[0];
    bounds.yMax = max[1];
    bounds.xMin = min[0];
    bounds.yMin = min[1];
  }
  var xScale = opts.width / Math.abs(bounds.xMax - bounds.xMin);
  var yScale = opts.height / Math.abs(bounds.yMax - bounds.yMin);
  var scale = xScale < yScale ? xScale : yScale;
  var xoffset = opts.width / 2 - Math.abs(bounds.xMax - bounds.xMin) / 2 * scale;
  var yoffset = opts.height / 2 - Math.abs(bounds.yMax - bounds.yMin) / 2 * scale;
  for (var i = 0; i < data.length; i++) {
    context.beginPath();
    context.setLineWidth(mapOption.borderWidth * opts.pix);
    context.setStrokeStyle(mapOption.borderColor);
    context.setFillStyle(hexToRgb(series[i].color, series[i].fillOpacity || mapOption.fillOpacity));
    if (mapOption.active == true && opts.tooltip) {
      if (opts.tooltip.index == i) {
        context.setStrokeStyle(mapOption.activeBorderColor);
        context.setFillStyle(hexToRgb(mapOption.activeFillColor, mapOption.activeFillOpacity));
      }
    }
    var coorda = data[i].geometry.coordinates;
    for (var k = 0; k < coorda.length; k++) {
      coords = coorda[k];
      if (coords.length == 1) {
        coords = coords[0];
      }
      for (var j = 0; j < coords.length; j++) {
        var gaosi = Array(2);
        if (mapOption.mercator) {
          gaosi = lonlat2mercator(coords[j][0], coords[j][1]);
        } else {
          gaosi = coords[j];
        }
        point = coordinateToPoint(gaosi[1], gaosi[0], bounds, scale, xoffset, yoffset);
        if (j === 0) {
          context.beginPath();
          context.moveTo(point.x, point.y);
        } else {
          context.lineTo(point.x, point.y);
        }
      }
      context.fill();
      if (mapOption.border == true) {
        context.stroke();
      }
    }
  }
  if (opts.dataLabel == true) {
    for (var i = 0; i < data.length; i++) {
      var centerPoint = data[i].properties.centroid;
      if (centerPoint) {
        if (mapOption.mercator) {
          centerPoint = lonlat2mercator(data[i].properties.centroid[0], data[i].properties.centroid[1]);
        }
        point = coordinateToPoint(centerPoint[1], centerPoint[0], bounds, scale, xoffset, yoffset);
        let fontSize = data[i].textSize * opts.pix || config2.fontSize;
        let fontColor = data[i].textColor || opts.fontColor;
        if (mapOption.active && mapOption.activeTextColor && opts.tooltip && opts.tooltip.index == i) {
          fontColor = mapOption.activeTextColor;
        }
        let text = data[i].properties.name;
        context.beginPath();
        context.setFontSize(fontSize);
        context.setFillStyle(fontColor);
        context.fillText(text, point.x - measureText(text, fontSize, context) / 2, point.y + fontSize / 2);
        context.closePath();
        context.stroke();
      }
    }
  }
  opts.chartData.mapData = {
    bounds,
    scale,
    xoffset,
    yoffset,
    mercator: mapOption.mercator
  };
  drawToolTipBridge(opts, config2, context, 1);
  context.draw();
}
function normalInt(min, max, iter) {
  iter = iter == 0 ? 1 : iter;
  var arr = [];
  for (var i = 0; i < iter; i++) {
    arr[i] = Math.random();
  }
  return Math.floor(arr.reduce(function(i2, j) {
    return i2 + j;
  }) / iter * (max - min)) + min;
}
function collisionNew(area, points, width, height) {
  var isIn = false;
  for (let i = 0; i < points.length; i++) {
    if (points[i].area) {
      if (area[3] < points[i].area[1] || area[0] > points[i].area[2] || area[1] > points[i].area[3] || area[2] < points[i].area[0]) {
        if (area[0] < 0 || area[1] < 0 || area[2] > width || area[3] > height) {
          isIn = true;
          break;
        } else {
          isIn = false;
        }
      } else {
        isIn = true;
        break;
      }
    }
  }
  return isIn;
}
function getWordCloudPoint(opts, type, context) {
  let points = opts.series;
  switch (type) {
    case "normal":
      for (let i = 0; i < points.length; i++) {
        let text = points[i].name;
        let tHeight = points[i].textSize * opts.pix;
        let tWidth = measureText(text, tHeight, context);
        let x, y;
        let area;
        let breaknum = 0;
        while (true) {
          breaknum++;
          x = normalInt(-opts.width / 2, opts.width / 2, 5) - tWidth / 2;
          y = normalInt(-opts.height / 2, opts.height / 2, 5) + tHeight / 2;
          area = [
            x - 5 + opts.width / 2,
            y - 5 - tHeight + opts.height / 2,
            x + tWidth + 5 + opts.width / 2,
            y + 5 + opts.height / 2
          ];
          let isCollision2 = collisionNew(area, points, opts.width, opts.height);
          if (!isCollision2)
            break;
          if (breaknum == 1e3) {
            area = [-100, -100, -100, -100];
            break;
          }
        }
        points[i].area = area;
      }
      break;
    case "vertical":
      let Spin = function() {
        if (Math.random() > 0.7) {
          return true;
        } else {
          return false;
        }
      };
      for (let i = 0; i < points.length; i++) {
        let text = points[i].name;
        let tHeight = points[i].textSize * opts.pix;
        let tWidth = measureText(text, tHeight, context);
        let isSpin = Spin();
        let x, y, area, areav;
        let breaknum = 0;
        while (true) {
          breaknum++;
          let isCollision2;
          if (isSpin) {
            x = normalInt(-opts.width / 2, opts.width / 2, 5) - tWidth / 2;
            y = normalInt(-opts.height / 2, opts.height / 2, 5) + tHeight / 2;
            area = [y - 5 - tWidth + opts.width / 2, -x - 5 + opts.height / 2, y + 5 + opts.width / 2, -x + tHeight + 5 + opts.height / 2];
            areav = [opts.width - (opts.width / 2 - opts.height / 2) - (-x + tHeight + 5 + opts.height / 2) - 5, opts.height / 2 - opts.width / 2 + (y - 5 - tWidth + opts.width / 2) - 5, opts.width - (opts.width / 2 - opts.height / 2) - (-x + tHeight + 5 + opts.height / 2) + tHeight, opts.height / 2 - opts.width / 2 + (y - 5 - tWidth + opts.width / 2) + tWidth + 5];
            isCollision2 = collisionNew(areav, points, opts.height, opts.width);
          } else {
            x = normalInt(-opts.width / 2, opts.width / 2, 5) - tWidth / 2;
            y = normalInt(-opts.height / 2, opts.height / 2, 5) + tHeight / 2;
            area = [x - 5 + opts.width / 2, y - 5 - tHeight + opts.height / 2, x + tWidth + 5 + opts.width / 2, y + 5 + opts.height / 2];
            isCollision2 = collisionNew(area, points, opts.width, opts.height);
          }
          if (!isCollision2)
            break;
          if (breaknum == 1e3) {
            area = [-1e3, -1e3, -1e3, -1e3];
            break;
          }
        }
        if (isSpin) {
          points[i].area = areav;
          points[i].areav = area;
        } else {
          points[i].area = area;
        }
        points[i].rotate = isSpin;
      }
      break;
  }
  return points;
}
function drawWordCloudDataPoints(series, opts, config2, context) {
  let process = arguments.length > 4 && arguments[4] !== void 0 ? arguments[4] : 1;
  let wordOption = assign({}, {
    type: "normal",
    autoColors: true
  }, opts.extra.word);
  if (!opts.chartData.wordCloudData) {
    opts.chartData.wordCloudData = getWordCloudPoint(opts, wordOption.type, context);
  }
  context.beginPath();
  context.setFillStyle(opts.background);
  context.rect(0, 0, opts.width, opts.height);
  context.fill();
  context.save();
  let points = opts.chartData.wordCloudData;
  context.translate(opts.width / 2, opts.height / 2);
  for (let i = 0; i < points.length; i++) {
    context.save();
    if (points[i].rotate) {
      context.rotate(90 * Math.PI / 180);
    }
    let text = points[i].name;
    let tHeight = points[i].textSize * opts.pix;
    let tWidth = measureText(text, tHeight, context);
    context.beginPath();
    context.setStrokeStyle(points[i].color);
    context.setFillStyle(points[i].color);
    context.setFontSize(tHeight);
    if (points[i].rotate) {
      if (points[i].areav[0] > 0) {
        if (opts.tooltip) {
          if (opts.tooltip.index == i) {
            context.strokeText(text, (points[i].areav[0] + 5 - opts.width / 2) * process - tWidth * (1 - process) / 2, (points[i].areav[1] + 5 + tHeight - opts.height / 2) * process);
          } else {
            context.fillText(text, (points[i].areav[0] + 5 - opts.width / 2) * process - tWidth * (1 - process) / 2, (points[i].areav[1] + 5 + tHeight - opts.height / 2) * process);
          }
        } else {
          context.fillText(text, (points[i].areav[0] + 5 - opts.width / 2) * process - tWidth * (1 - process) / 2, (points[i].areav[1] + 5 + tHeight - opts.height / 2) * process);
        }
      }
    } else {
      if (points[i].area[0] > 0) {
        if (opts.tooltip) {
          if (opts.tooltip.index == i) {
            context.strokeText(text, (points[i].area[0] + 5 - opts.width / 2) * process - tWidth * (1 - process) / 2, (points[i].area[1] + 5 + tHeight - opts.height / 2) * process);
          } else {
            context.fillText(text, (points[i].area[0] + 5 - opts.width / 2) * process - tWidth * (1 - process) / 2, (points[i].area[1] + 5 + tHeight - opts.height / 2) * process);
          }
        } else {
          context.fillText(text, (points[i].area[0] + 5 - opts.width / 2) * process - tWidth * (1 - process) / 2, (points[i].area[1] + 5 + tHeight - opts.height / 2) * process);
        }
      }
    }
    context.stroke();
    context.restore();
  }
  context.restore();
}
function drawFunnelDataPoints(series, opts, config2, context) {
  let process = arguments.length > 4 && arguments[4] !== void 0 ? arguments[4] : 1;
  let funnelOption = assign({}, {
    type: "funnel",
    activeWidth: 10,
    activeOpacity: 0.3,
    border: false,
    borderWidth: 2,
    borderColor: "#FFFFFF",
    fillOpacity: 1,
    minSize: 0,
    labelAlign: "right",
    linearType: "none",
    customColor: []
  }, opts.extra.funnel);
  let eachSpacing = (opts.height - opts.area[0] - opts.area[2]) / series.length;
  let centerPosition = {
    x: opts.area[3] + (opts.width - opts.area[1] - opts.area[3]) / 2,
    y: opts.height - opts.area[2]
  };
  let activeWidth = funnelOption.activeWidth * opts.pix;
  let radius = Math.min((opts.width - opts.area[1] - opts.area[3]) / 2 - activeWidth, (opts.height - opts.area[0] - opts.area[2]) / 2 - activeWidth);
  let seriesNew = getFunnelDataPoints(series, radius, funnelOption, eachSpacing, process);
  context.save();
  context.translate(centerPosition.x, centerPosition.y);
  funnelOption.customColor = fillCustomColor(funnelOption.linearType, funnelOption.customColor, series, config2);
  if (funnelOption.type == "pyramid") {
    for (let i = 0; i < seriesNew.length; i++) {
      if (i == seriesNew.length - 1) {
        if (opts.tooltip) {
          if (opts.tooltip.index == i) {
            context.beginPath();
            context.setFillStyle(hexToRgb(seriesNew[i].color, funnelOption.activeOpacity));
            context.moveTo(-activeWidth, -eachSpacing);
            context.lineTo(-seriesNew[i].radius - activeWidth, 0);
            context.lineTo(seriesNew[i].radius + activeWidth, 0);
            context.lineTo(activeWidth, -eachSpacing);
            context.lineTo(-activeWidth, -eachSpacing);
            context.closePath();
            context.fill();
          }
        }
        seriesNew[i].funnelArea = [centerPosition.x - seriesNew[i].radius, centerPosition.y - eachSpacing * (i + 1), centerPosition.x + seriesNew[i].radius, centerPosition.y - eachSpacing * i];
        context.beginPath();
        context.setLineWidth(funnelOption.borderWidth * opts.pix);
        context.setStrokeStyle(funnelOption.borderColor);
        var fillColor = hexToRgb(seriesNew[i].color, funnelOption.fillOpacity);
        if (funnelOption.linearType == "custom") {
          var grd = context.createLinearGradient(seriesNew[i].radius, -eachSpacing, -seriesNew[i].radius, -eachSpacing);
          grd.addColorStop(0, hexToRgb(seriesNew[i].color, funnelOption.fillOpacity));
          grd.addColorStop(0.5, hexToRgb(funnelOption.customColor[seriesNew[i].linearIndex], funnelOption.fillOpacity));
          grd.addColorStop(1, hexToRgb(seriesNew[i].color, funnelOption.fillOpacity));
          fillColor = grd;
        }
        context.setFillStyle(fillColor);
        context.moveTo(0, -eachSpacing);
        context.lineTo(-seriesNew[i].radius, 0);
        context.lineTo(seriesNew[i].radius, 0);
        context.lineTo(0, -eachSpacing);
        context.closePath();
        context.fill();
        if (funnelOption.border == true) {
          context.stroke();
        }
      } else {
        if (opts.tooltip) {
          if (opts.tooltip.index == i) {
            context.beginPath();
            context.setFillStyle(hexToRgb(seriesNew[i].color, funnelOption.activeOpacity));
            context.moveTo(0, 0);
            context.lineTo(-seriesNew[i].radius - activeWidth, 0);
            context.lineTo(-seriesNew[i + 1].radius - activeWidth, -eachSpacing);
            context.lineTo(seriesNew[i + 1].radius + activeWidth, -eachSpacing);
            context.lineTo(seriesNew[i].radius + activeWidth, 0);
            context.lineTo(0, 0);
            context.closePath();
            context.fill();
          }
        }
        seriesNew[i].funnelArea = [centerPosition.x - seriesNew[i].radius, centerPosition.y - eachSpacing * (i + 1), centerPosition.x + seriesNew[i].radius, centerPosition.y - eachSpacing * i];
        context.beginPath();
        context.setLineWidth(funnelOption.borderWidth * opts.pix);
        context.setStrokeStyle(funnelOption.borderColor);
        var fillColor = hexToRgb(seriesNew[i].color, funnelOption.fillOpacity);
        if (funnelOption.linearType == "custom") {
          var grd = context.createLinearGradient(seriesNew[i].radius, -eachSpacing, -seriesNew[i].radius, -eachSpacing);
          grd.addColorStop(0, hexToRgb(seriesNew[i].color, funnelOption.fillOpacity));
          grd.addColorStop(0.5, hexToRgb(funnelOption.customColor[seriesNew[i].linearIndex], funnelOption.fillOpacity));
          grd.addColorStop(1, hexToRgb(seriesNew[i].color, funnelOption.fillOpacity));
          fillColor = grd;
        }
        context.setFillStyle(fillColor);
        context.moveTo(0, 0);
        context.lineTo(-seriesNew[i].radius, 0);
        context.lineTo(-seriesNew[i + 1].radius, -eachSpacing);
        context.lineTo(seriesNew[i + 1].radius, -eachSpacing);
        context.lineTo(seriesNew[i].radius, 0);
        context.lineTo(0, 0);
        context.closePath();
        context.fill();
        if (funnelOption.border == true) {
          context.stroke();
        }
      }
      context.translate(0, -eachSpacing);
    }
  } else {
    context.translate(0, -(seriesNew.length - 1) * eachSpacing);
    for (let i = 0; i < seriesNew.length; i++) {
      if (i == seriesNew.length - 1) {
        if (opts.tooltip) {
          if (opts.tooltip.index == i) {
            context.beginPath();
            context.setFillStyle(hexToRgb(seriesNew[i].color, funnelOption.activeOpacity));
            context.moveTo(-activeWidth - funnelOption.minSize / 2, 0);
            context.lineTo(-seriesNew[i].radius - activeWidth, -eachSpacing);
            context.lineTo(seriesNew[i].radius + activeWidth, -eachSpacing);
            context.lineTo(activeWidth + funnelOption.minSize / 2, 0);
            context.lineTo(-activeWidth - funnelOption.minSize / 2, 0);
            context.closePath();
            context.fill();
          }
        }
        seriesNew[i].funnelArea = [centerPosition.x - seriesNew[i].radius, centerPosition.y - eachSpacing, centerPosition.x + seriesNew[i].radius, centerPosition.y];
        context.beginPath();
        context.setLineWidth(funnelOption.borderWidth * opts.pix);
        context.setStrokeStyle(funnelOption.borderColor);
        var fillColor = hexToRgb(seriesNew[i].color, funnelOption.fillOpacity);
        if (funnelOption.linearType == "custom") {
          var grd = context.createLinearGradient(seriesNew[i].radius, -eachSpacing, -seriesNew[i].radius, -eachSpacing);
          grd.addColorStop(0, hexToRgb(seriesNew[i].color, funnelOption.fillOpacity));
          grd.addColorStop(0.5, hexToRgb(funnelOption.customColor[seriesNew[i].linearIndex], funnelOption.fillOpacity));
          grd.addColorStop(1, hexToRgb(seriesNew[i].color, funnelOption.fillOpacity));
          fillColor = grd;
        }
        context.setFillStyle(fillColor);
        context.moveTo(0, 0);
        context.lineTo(-funnelOption.minSize / 2, 0);
        context.lineTo(-seriesNew[i].radius, -eachSpacing);
        context.lineTo(seriesNew[i].radius, -eachSpacing);
        context.lineTo(funnelOption.minSize / 2, 0);
        context.lineTo(0, 0);
        context.closePath();
        context.fill();
        if (funnelOption.border == true) {
          context.stroke();
        }
      } else {
        if (opts.tooltip) {
          if (opts.tooltip.index == i) {
            context.beginPath();
            context.setFillStyle(hexToRgb(seriesNew[i].color, funnelOption.activeOpacity));
            context.moveTo(0, 0);
            context.lineTo(-seriesNew[i + 1].radius - activeWidth, 0);
            context.lineTo(-seriesNew[i].radius - activeWidth, -eachSpacing);
            context.lineTo(seriesNew[i].radius + activeWidth, -eachSpacing);
            context.lineTo(seriesNew[i + 1].radius + activeWidth, 0);
            context.lineTo(0, 0);
            context.closePath();
            context.fill();
          }
        }
        seriesNew[i].funnelArea = [centerPosition.x - seriesNew[i].radius, centerPosition.y - eachSpacing * (seriesNew.length - i), centerPosition.x + seriesNew[i].radius, centerPosition.y - eachSpacing * (seriesNew.length - i - 1)];
        context.beginPath();
        context.setLineWidth(funnelOption.borderWidth * opts.pix);
        context.setStrokeStyle(funnelOption.borderColor);
        var fillColor = hexToRgb(seriesNew[i].color, funnelOption.fillOpacity);
        if (funnelOption.linearType == "custom") {
          var grd = context.createLinearGradient(seriesNew[i].radius, -eachSpacing, -seriesNew[i].radius, -eachSpacing);
          grd.addColorStop(0, hexToRgb(seriesNew[i].color, funnelOption.fillOpacity));
          grd.addColorStop(0.5, hexToRgb(funnelOption.customColor[seriesNew[i].linearIndex], funnelOption.fillOpacity));
          grd.addColorStop(1, hexToRgb(seriesNew[i].color, funnelOption.fillOpacity));
          fillColor = grd;
        }
        context.setFillStyle(fillColor);
        context.moveTo(0, 0);
        context.lineTo(-seriesNew[i + 1].radius, 0);
        context.lineTo(-seriesNew[i].radius, -eachSpacing);
        context.lineTo(seriesNew[i].radius, -eachSpacing);
        context.lineTo(seriesNew[i + 1].radius, 0);
        context.lineTo(0, 0);
        context.closePath();
        context.fill();
        if (funnelOption.border == true) {
          context.stroke();
        }
      }
      context.translate(0, eachSpacing);
    }
  }
  context.restore();
  if (opts.dataLabel !== false && process === 1) {
    drawFunnelText(seriesNew, opts, context, eachSpacing, funnelOption.labelAlign, activeWidth, centerPosition);
  }
  if (process === 1) {
    drawFunnelCenterText(seriesNew, opts, context, eachSpacing, funnelOption.labelAlign, activeWidth, centerPosition);
  }
  return {
    center: centerPosition,
    radius,
    series: seriesNew
  };
}
function drawFunnelText(series, opts, context, eachSpacing, labelAlign, activeWidth, centerPosition) {
  for (let i = 0; i < series.length; i++) {
    let item = series[i];
    if (item.labelShow === false) {
      continue;
    }
    let startX, endX, startY, fontSize;
    let text = item.formatter ? item.formatter(item, i, series, opts) : util.toFixed(item._proportion_ * 100) + "%";
    text = item.labelText ? item.labelText : text;
    if (labelAlign == "right") {
      if (i == series.length - 1) {
        startX = (item.funnelArea[2] + centerPosition.x) / 2;
      } else {
        startX = (item.funnelArea[2] + series[i + 1].funnelArea[2]) / 2;
      }
      endX = startX + activeWidth * 2;
      startY = item.funnelArea[1] + eachSpacing / 2;
      fontSize = item.textSize * opts.pix || opts.fontSize * opts.pix;
      context.setLineWidth(1 * opts.pix);
      context.setStrokeStyle(item.color);
      context.setFillStyle(item.color);
      context.beginPath();
      context.moveTo(startX, startY);
      context.lineTo(endX, startY);
      context.stroke();
      context.closePath();
      context.beginPath();
      context.moveTo(endX, startY);
      context.arc(endX, startY, 2 * opts.pix, 0, 2 * Math.PI);
      context.closePath();
      context.fill();
      context.beginPath();
      context.setFontSize(fontSize);
      context.setFillStyle(item.textColor || opts.fontColor);
      context.fillText(text, endX + 5, startY + fontSize / 2 - 2);
      context.closePath();
      context.stroke();
      context.closePath();
    }
    if (labelAlign == "left") {
      if (i == series.length - 1) {
        startX = (item.funnelArea[0] + centerPosition.x) / 2;
      } else {
        startX = (item.funnelArea[0] + series[i + 1].funnelArea[0]) / 2;
      }
      endX = startX - activeWidth * 2;
      startY = item.funnelArea[1] + eachSpacing / 2;
      fontSize = item.textSize * opts.pix || opts.fontSize * opts.pix;
      context.setLineWidth(1 * opts.pix);
      context.setStrokeStyle(item.color);
      context.setFillStyle(item.color);
      context.beginPath();
      context.moveTo(startX, startY);
      context.lineTo(endX, startY);
      context.stroke();
      context.closePath();
      context.beginPath();
      context.moveTo(endX, startY);
      context.arc(endX, startY, 2, 0, 2 * Math.PI);
      context.closePath();
      context.fill();
      context.beginPath();
      context.setFontSize(fontSize);
      context.setFillStyle(item.textColor || opts.fontColor);
      context.fillText(text, endX - 5 - measureText(text, fontSize, context), startY + fontSize / 2 - 2);
      context.closePath();
      context.stroke();
      context.closePath();
    }
  }
}
function drawFunnelCenterText(series, opts, context, eachSpacing, labelAlign, activeWidth, centerPosition) {
  for (let i = 0; i < series.length; i++) {
    let item = series[i];
    let startY, fontSize;
    if (item.centerText) {
      startY = item.funnelArea[1] + eachSpacing / 2;
      fontSize = item.centerTextSize * opts.pix || opts.fontSize * opts.pix;
      context.beginPath();
      context.setFontSize(fontSize);
      context.setFillStyle(item.centerTextColor || "#FFFFFF");
      context.fillText(item.centerText, centerPosition.x - measureText(item.centerText, fontSize, context) / 2, startY + fontSize / 2 - 2);
      context.closePath();
      context.stroke();
      context.closePath();
    }
  }
}
function drawCanvas(opts, context) {
  context.save();
  context.translate(0, 0.5);
  context.restore();
  context.draw();
}
var Timing = {
  easeIn: function easeIn(pos) {
    return Math.pow(pos, 3);
  },
  easeOut: function easeOut(pos) {
    return Math.pow(pos - 1, 3) + 1;
  },
  easeInOut: function easeInOut(pos) {
    if ((pos /= 0.5) < 1) {
      return 0.5 * Math.pow(pos, 3);
    } else {
      return 0.5 * (Math.pow(pos - 2, 3) + 2);
    }
  },
  linear: function linear(pos) {
    return pos;
  }
};
function Animation(opts) {
  this.isStop = false;
  opts.duration = typeof opts.duration === "undefined" ? 1e3 : opts.duration;
  opts.timing = opts.timing || "easeInOut";
  var delay = 17;
  function createAnimationFrame() {
    if (typeof setTimeout !== "undefined") {
      return function(step, delay2) {
        setTimeout(function() {
          var timeStamp = +new Date();
          step(timeStamp);
        }, delay2);
      };
    } else if (typeof requestAnimationFrame !== "undefined") {
      return requestAnimationFrame;
    } else {
      return function(step) {
        step(null);
      };
    }
  }
  var animationFrame = createAnimationFrame();
  var startTimeStamp = null;
  var _step = function step(timestamp) {
    if (timestamp === null || this.isStop === true) {
      opts.onProcess && opts.onProcess(1);
      opts.onAnimationFinish && opts.onAnimationFinish();
      return;
    }
    if (startTimeStamp === null) {
      startTimeStamp = timestamp;
    }
    if (timestamp - startTimeStamp < opts.duration) {
      var process = (timestamp - startTimeStamp) / opts.duration;
      var timingFunction = Timing[opts.timing];
      process = timingFunction(process);
      opts.onProcess && opts.onProcess(process);
      animationFrame(_step, delay);
    } else {
      opts.onProcess && opts.onProcess(1);
      opts.onAnimationFinish && opts.onAnimationFinish();
    }
  };
  _step = _step.bind(this);
  animationFrame(_step, delay);
}
Animation.prototype.stop = function() {
  this.isStop = true;
};
function drawCharts(type, opts, config2, context) {
  var _this = this;
  var series = opts.series;
  if (type === "pie" || type === "ring" || type === "mount" || type === "rose" || type === "funnel") {
    series = fixPieSeries(series, opts);
  }
  var categories = opts.categories;
  if (type === "mount") {
    categories = [];
    for (let j = 0; j < series.length; j++) {
      if (series[j].show !== false)
        categories.push(series[j].name);
    }
    opts.categories = categories;
  }
  series = fillSeries(series, opts, config2);
  var duration = opts.animation ? opts.duration : 0;
  _this.animationInstance && _this.animationInstance.stop();
  var seriesMA = null;
  if (type == "candle") {
    let average = assign({}, opts.extra.candle.average);
    if (average.show) {
      seriesMA = calCandleMA(average.day, average.name, average.color, series[0].data);
      seriesMA = fillSeries(seriesMA, opts, config2);
      opts.seriesMA = seriesMA;
    } else if (opts.seriesMA) {
      seriesMA = opts.seriesMA = fillSeries(opts.seriesMA, opts, config2);
    } else {
      seriesMA = series;
    }
  } else {
    seriesMA = series;
  }
  opts._series_ = series = filterSeries(series);
  opts.area = new Array(4);
  for (let j = 0; j < 4; j++) {
    opts.area[j] = opts.padding[j] * opts.pix;
  }
  var _calLegendData = calLegendData(seriesMA, opts, config2, opts.chartData, context), legendHeight = _calLegendData.area.wholeHeight, legendWidth = _calLegendData.area.wholeWidth;
  switch (opts.legend.position) {
    case "top":
      opts.area[0] += legendHeight;
      break;
    case "bottom":
      opts.area[2] += legendHeight;
      break;
    case "left":
      opts.area[3] += legendWidth;
      break;
    case "right":
      opts.area[1] += legendWidth;
      break;
  }
  let _calYAxisData = {}, yAxisWidth = 0;
  if (opts.type === "line" || opts.type === "column" || opts.type === "mount" || opts.type === "area" || opts.type === "mix" || opts.type === "candle" || opts.type === "scatter" || opts.type === "bubble" || opts.type === "bar") {
    _calYAxisData = calYAxisData(series, opts, config2, context);
    yAxisWidth = _calYAxisData.yAxisWidth;
    if (opts.yAxis.showTitle) {
      let maxTitleHeight = 0;
      for (let i = 0; i < opts.yAxis.data.length; i++) {
        maxTitleHeight = Math.max(maxTitleHeight, opts.yAxis.data[i].titleFontSize ? opts.yAxis.data[i].titleFontSize * opts.pix : config2.fontSize);
      }
      opts.area[0] += maxTitleHeight;
    }
    let rightIndex = 0, leftIndex = 0;
    for (let i = 0; i < yAxisWidth.length; i++) {
      if (yAxisWidth[i].position == "left") {
        if (leftIndex > 0) {
          opts.area[3] += yAxisWidth[i].width + opts.yAxis.padding * opts.pix;
        } else {
          opts.area[3] += yAxisWidth[i].width;
        }
        leftIndex += 1;
      } else if (yAxisWidth[i].position == "right") {
        if (rightIndex > 0) {
          opts.area[1] += yAxisWidth[i].width + opts.yAxis.padding * opts.pix;
        } else {
          opts.area[1] += yAxisWidth[i].width;
        }
        rightIndex += 1;
      }
    }
  } else {
    config2.yAxisWidth = yAxisWidth;
  }
  opts.chartData.yAxisData = _calYAxisData;
  if (opts.categories && opts.categories.length && opts.type !== "radar" && opts.type !== "gauge" && opts.type !== "bar") {
    opts.chartData.xAxisData = getXAxisPoints(opts.categories, opts);
    let _calCategoriesData = calCategoriesData(opts.categories, opts, config2, opts.chartData.xAxisData.eachSpacing, context), xAxisHeight = _calCategoriesData.xAxisHeight, angle = _calCategoriesData.angle;
    config2.xAxisHeight = xAxisHeight;
    config2._xAxisTextAngle_ = angle;
    opts.area[2] += xAxisHeight;
    opts.chartData.categoriesData = _calCategoriesData;
  } else {
    if (opts.type === "line" || opts.type === "area" || opts.type === "scatter" || opts.type === "bubble" || opts.type === "bar") {
      opts.chartData.xAxisData = calXAxisData(series, opts, config2, context);
      categories = opts.chartData.xAxisData.rangesFormat;
      let _calCategoriesData = calCategoriesData(categories, opts, config2, opts.chartData.xAxisData.eachSpacing, context), xAxisHeight = _calCategoriesData.xAxisHeight, angle = _calCategoriesData.angle;
      config2.xAxisHeight = xAxisHeight;
      config2._xAxisTextAngle_ = angle;
      opts.area[2] += xAxisHeight;
      opts.chartData.categoriesData = _calCategoriesData;
    } else {
      opts.chartData.xAxisData = {
        xAxisPoints: []
      };
    }
  }
  if (opts.enableScroll && opts.xAxis.scrollAlign == "right" && opts._scrollDistance_ === void 0) {
    let offsetLeft = 0, xAxisPoints = opts.chartData.xAxisData.xAxisPoints, startX = opts.chartData.xAxisData.startX, endX = opts.chartData.xAxisData.endX, eachSpacing = opts.chartData.xAxisData.eachSpacing;
    let totalWidth = eachSpacing * (xAxisPoints.length - 1);
    let screenWidth = endX - startX;
    offsetLeft = screenWidth - totalWidth;
    _this.scrollOption.currentOffset = offsetLeft;
    _this.scrollOption.startTouchX = offsetLeft;
    _this.scrollOption.distance = 0;
    _this.scrollOption.lastMoveTime = 0;
    opts._scrollDistance_ = offsetLeft;
  }
  if (type === "pie" || type === "ring" || type === "rose") {
    config2._pieTextMaxLength_ = opts.dataLabel === false ? 0 : getPieTextMaxLength(seriesMA, config2, context, opts);
  }
  switch (type) {
    case "word":
      this.animationInstance = new Animation({
        timing: opts.timing,
        duration,
        onProcess: function(process) {
          context.clearRect(0, 0, opts.width, opts.height);
          if (opts.rotate) {
            contextRotate(context, opts);
          }
          drawWordCloudDataPoints(series, opts, config2, context, process);
          drawCanvas(opts, context);
        },
        onAnimationFinish: function onAnimationFinish() {
          _this.uevent.trigger("renderComplete");
        }
      });
      break;
    case "map":
      context.clearRect(0, 0, opts.width, opts.height);
      drawMapDataPoints(series, opts, config2, context);
      setTimeout(() => {
        this.uevent.trigger("renderComplete");
      }, 50);
      break;
    case "funnel":
      this.animationInstance = new Animation({
        timing: opts.timing,
        duration,
        onProcess: function(process) {
          context.clearRect(0, 0, opts.width, opts.height);
          if (opts.rotate) {
            contextRotate(context, opts);
          }
          opts.chartData.funnelData = drawFunnelDataPoints(series, opts, config2, context, process);
          drawLegend(opts.series, opts, config2, context, opts.chartData);
          drawToolTipBridge(opts, config2, context, process);
          drawCanvas(opts, context);
        },
        onAnimationFinish: function onAnimationFinish() {
          _this.uevent.trigger("renderComplete");
        }
      });
      break;
    case "line":
      this.animationInstance = new Animation({
        timing: opts.timing,
        duration,
        onProcess: function onProcess(process) {
          context.clearRect(0, 0, opts.width, opts.height);
          if (opts.rotate) {
            contextRotate(context, opts);
          }
          drawYAxisGrid(categories, opts, config2, context);
          drawXAxis(categories, opts, config2, context);
          var _drawLineDataPoints = drawLineDataPoints(series, opts, config2, context, process), xAxisPoints = _drawLineDataPoints.xAxisPoints, calPoints = _drawLineDataPoints.calPoints, eachSpacing = _drawLineDataPoints.eachSpacing;
          opts.chartData.xAxisPoints = xAxisPoints;
          opts.chartData.calPoints = calPoints;
          opts.chartData.eachSpacing = eachSpacing;
          drawYAxis(series, opts, config2, context);
          if (opts.enableMarkLine !== false && process === 1) {
            drawMarkLine(opts, config2, context);
          }
          drawLegend(opts.series, opts, config2, context, opts.chartData);
          drawToolTipBridge(opts, config2, context, process);
          drawCanvas(opts, context);
        },
        onAnimationFinish: function onAnimationFinish() {
          _this.uevent.trigger("renderComplete");
        }
      });
      break;
    case "scatter":
      this.animationInstance = new Animation({
        timing: opts.timing,
        duration,
        onProcess: function onProcess(process) {
          context.clearRect(0, 0, opts.width, opts.height);
          if (opts.rotate) {
            contextRotate(context, opts);
          }
          drawYAxisGrid(categories, opts, config2, context);
          drawXAxis(categories, opts, config2, context);
          var _drawScatterDataPoints = drawScatterDataPoints(series, opts, config2, context, process), xAxisPoints = _drawScatterDataPoints.xAxisPoints, calPoints = _drawScatterDataPoints.calPoints, eachSpacing = _drawScatterDataPoints.eachSpacing;
          opts.chartData.xAxisPoints = xAxisPoints;
          opts.chartData.calPoints = calPoints;
          opts.chartData.eachSpacing = eachSpacing;
          drawYAxis(series, opts, config2, context);
          if (opts.enableMarkLine !== false && process === 1) {
            drawMarkLine(opts, config2, context);
          }
          drawLegend(opts.series, opts, config2, context, opts.chartData);
          drawToolTipBridge(opts, config2, context, process);
          drawCanvas(opts, context);
        },
        onAnimationFinish: function onAnimationFinish() {
          _this.uevent.trigger("renderComplete");
        }
      });
      break;
    case "bubble":
      this.animationInstance = new Animation({
        timing: opts.timing,
        duration,
        onProcess: function onProcess(process) {
          context.clearRect(0, 0, opts.width, opts.height);
          if (opts.rotate) {
            contextRotate(context, opts);
          }
          drawYAxisGrid(categories, opts, config2, context);
          drawXAxis(categories, opts, config2, context);
          var _drawBubbleDataPoints = drawBubbleDataPoints(series, opts, config2, context, process), xAxisPoints = _drawBubbleDataPoints.xAxisPoints, calPoints = _drawBubbleDataPoints.calPoints, eachSpacing = _drawBubbleDataPoints.eachSpacing;
          opts.chartData.xAxisPoints = xAxisPoints;
          opts.chartData.calPoints = calPoints;
          opts.chartData.eachSpacing = eachSpacing;
          drawYAxis(series, opts, config2, context);
          if (opts.enableMarkLine !== false && process === 1) {
            drawMarkLine(opts, config2, context);
          }
          drawLegend(opts.series, opts, config2, context, opts.chartData);
          drawToolTipBridge(opts, config2, context, process);
          drawCanvas(opts, context);
        },
        onAnimationFinish: function onAnimationFinish() {
          _this.uevent.trigger("renderComplete");
        }
      });
      break;
    case "mix":
      this.animationInstance = new Animation({
        timing: opts.timing,
        duration,
        onProcess: function onProcess(process) {
          context.clearRect(0, 0, opts.width, opts.height);
          if (opts.rotate) {
            contextRotate(context, opts);
          }
          drawYAxisGrid(categories, opts, config2, context);
          drawXAxis(categories, opts, config2, context);
          var _drawMixDataPoints = drawMixDataPoints(series, opts, config2, context, process), xAxisPoints = _drawMixDataPoints.xAxisPoints, calPoints = _drawMixDataPoints.calPoints, eachSpacing = _drawMixDataPoints.eachSpacing;
          opts.chartData.xAxisPoints = xAxisPoints;
          opts.chartData.calPoints = calPoints;
          opts.chartData.eachSpacing = eachSpacing;
          drawYAxis(series, opts, config2, context);
          if (opts.enableMarkLine !== false && process === 1) {
            drawMarkLine(opts, config2, context);
          }
          drawLegend(opts.series, opts, config2, context, opts.chartData);
          drawToolTipBridge(opts, config2, context, process);
          drawCanvas(opts, context);
        },
        onAnimationFinish: function onAnimationFinish() {
          _this.uevent.trigger("renderComplete");
        }
      });
      break;
    case "column":
      this.animationInstance = new Animation({
        timing: opts.timing,
        duration,
        onProcess: function onProcess(process) {
          context.clearRect(0, 0, opts.width, opts.height);
          if (opts.rotate) {
            contextRotate(context, opts);
          }
          drawYAxisGrid(categories, opts, config2, context);
          drawXAxis(categories, opts, config2, context);
          var _drawColumnDataPoints = drawColumnDataPoints(series, opts, config2, context, process), xAxisPoints = _drawColumnDataPoints.xAxisPoints, calPoints = _drawColumnDataPoints.calPoints, eachSpacing = _drawColumnDataPoints.eachSpacing;
          opts.chartData.xAxisPoints = xAxisPoints;
          opts.chartData.calPoints = calPoints;
          opts.chartData.eachSpacing = eachSpacing;
          drawYAxis(series, opts, config2, context);
          if (opts.enableMarkLine !== false && process === 1) {
            drawMarkLine(opts, config2, context);
          }
          drawLegend(opts.series, opts, config2, context, opts.chartData);
          drawToolTipBridge(opts, config2, context, process);
          drawCanvas(opts, context);
        },
        onAnimationFinish: function onAnimationFinish() {
          _this.uevent.trigger("renderComplete");
        }
      });
      break;
    case "mount":
      this.animationInstance = new Animation({
        timing: opts.timing,
        duration,
        onProcess: function onProcess(process) {
          context.clearRect(0, 0, opts.width, opts.height);
          if (opts.rotate) {
            contextRotate(context, opts);
          }
          drawYAxisGrid(categories, opts, config2, context);
          drawXAxis(categories, opts, config2, context);
          var _drawMountDataPoints = drawMountDataPoints(series, opts, config2, context, process), xAxisPoints = _drawMountDataPoints.xAxisPoints, calPoints = _drawMountDataPoints.calPoints, eachSpacing = _drawMountDataPoints.eachSpacing;
          opts.chartData.xAxisPoints = xAxisPoints;
          opts.chartData.calPoints = calPoints;
          opts.chartData.eachSpacing = eachSpacing;
          drawYAxis(series, opts, config2, context);
          if (opts.enableMarkLine !== false && process === 1) {
            drawMarkLine(opts, config2, context);
          }
          drawLegend(opts.series, opts, config2, context, opts.chartData);
          drawToolTipBridge(opts, config2, context, process);
          drawCanvas(opts, context);
        },
        onAnimationFinish: function onAnimationFinish() {
          _this.uevent.trigger("renderComplete");
        }
      });
      break;
    case "bar":
      this.animationInstance = new Animation({
        timing: opts.timing,
        duration,
        onProcess: function onProcess(process) {
          context.clearRect(0, 0, opts.width, opts.height);
          if (opts.rotate) {
            contextRotate(context, opts);
          }
          drawXAxis(categories, opts, config2, context);
          var _drawBarDataPoints = drawBarDataPoints(series, opts, config2, context, process), yAxisPoints = _drawBarDataPoints.yAxisPoints, calPoints = _drawBarDataPoints.calPoints, eachSpacing = _drawBarDataPoints.eachSpacing;
          opts.chartData.yAxisPoints = yAxisPoints;
          opts.chartData.xAxisPoints = opts.chartData.xAxisData.xAxisPoints;
          opts.chartData.calPoints = calPoints;
          opts.chartData.eachSpacing = eachSpacing;
          drawYAxis(series, opts, config2, context);
          if (opts.enableMarkLine !== false && process === 1) {
            drawMarkLine(opts, config2, context);
          }
          drawLegend(opts.series, opts, config2, context, opts.chartData);
          drawToolTipBridge(opts, config2, context, process);
          drawCanvas(opts, context);
        },
        onAnimationFinish: function onAnimationFinish() {
          _this.uevent.trigger("renderComplete");
        }
      });
      break;
    case "area":
      this.animationInstance = new Animation({
        timing: opts.timing,
        duration,
        onProcess: function onProcess(process) {
          context.clearRect(0, 0, opts.width, opts.height);
          if (opts.rotate) {
            contextRotate(context, opts);
          }
          drawYAxisGrid(categories, opts, config2, context);
          drawXAxis(categories, opts, config2, context);
          var _drawAreaDataPoints = drawAreaDataPoints(series, opts, config2, context, process), xAxisPoints = _drawAreaDataPoints.xAxisPoints, calPoints = _drawAreaDataPoints.calPoints, eachSpacing = _drawAreaDataPoints.eachSpacing;
          opts.chartData.xAxisPoints = xAxisPoints;
          opts.chartData.calPoints = calPoints;
          opts.chartData.eachSpacing = eachSpacing;
          drawYAxis(series, opts, config2, context);
          if (opts.enableMarkLine !== false && process === 1) {
            drawMarkLine(opts, config2, context);
          }
          drawLegend(opts.series, opts, config2, context, opts.chartData);
          drawToolTipBridge(opts, config2, context, process);
          drawCanvas(opts, context);
        },
        onAnimationFinish: function onAnimationFinish() {
          _this.uevent.trigger("renderComplete");
        }
      });
      break;
    case "ring":
      this.animationInstance = new Animation({
        timing: opts.timing,
        duration,
        onProcess: function onProcess(process) {
          context.clearRect(0, 0, opts.width, opts.height);
          if (opts.rotate) {
            contextRotate(context, opts);
          }
          opts.chartData.pieData = drawPieDataPoints(series, opts, config2, context, process);
          drawLegend(opts.series, opts, config2, context, opts.chartData);
          drawToolTipBridge(opts, config2, context, process);
          drawCanvas(opts, context);
        },
        onAnimationFinish: function onAnimationFinish() {
          _this.uevent.trigger("renderComplete");
        }
      });
      break;
    case "pie":
      this.animationInstance = new Animation({
        timing: opts.timing,
        duration,
        onProcess: function onProcess(process) {
          context.clearRect(0, 0, opts.width, opts.height);
          if (opts.rotate) {
            contextRotate(context, opts);
          }
          opts.chartData.pieData = drawPieDataPoints(series, opts, config2, context, process);
          drawLegend(opts.series, opts, config2, context, opts.chartData);
          drawToolTipBridge(opts, config2, context, process);
          drawCanvas(opts, context);
        },
        onAnimationFinish: function onAnimationFinish() {
          _this.uevent.trigger("renderComplete");
        }
      });
      break;
    case "rose":
      this.animationInstance = new Animation({
        timing: opts.timing,
        duration,
        onProcess: function onProcess(process) {
          context.clearRect(0, 0, opts.width, opts.height);
          if (opts.rotate) {
            contextRotate(context, opts);
          }
          opts.chartData.pieData = drawRoseDataPoints(series, opts, config2, context, process);
          drawLegend(opts.series, opts, config2, context, opts.chartData);
          drawToolTipBridge(opts, config2, context, process);
          drawCanvas(opts, context);
        },
        onAnimationFinish: function onAnimationFinish() {
          _this.uevent.trigger("renderComplete");
        }
      });
      break;
    case "radar":
      this.animationInstance = new Animation({
        timing: opts.timing,
        duration,
        onProcess: function onProcess(process) {
          context.clearRect(0, 0, opts.width, opts.height);
          if (opts.rotate) {
            contextRotate(context, opts);
          }
          opts.chartData.radarData = drawRadarDataPoints(series, opts, config2, context, process);
          drawLegend(opts.series, opts, config2, context, opts.chartData);
          drawToolTipBridge(opts, config2, context, process);
          drawCanvas(opts, context);
        },
        onAnimationFinish: function onAnimationFinish() {
          _this.uevent.trigger("renderComplete");
        }
      });
      break;
    case "arcbar":
      this.animationInstance = new Animation({
        timing: opts.timing,
        duration,
        onProcess: function onProcess(process) {
          context.clearRect(0, 0, opts.width, opts.height);
          if (opts.rotate) {
            contextRotate(context, opts);
          }
          opts.chartData.arcbarData = drawArcbarDataPoints(series, opts, config2, context, process);
          drawCanvas(opts, context);
        },
        onAnimationFinish: function onAnimationFinish() {
          _this.uevent.trigger("renderComplete");
        }
      });
      break;
    case "gauge":
      this.animationInstance = new Animation({
        timing: opts.timing,
        duration,
        onProcess: function onProcess(process) {
          context.clearRect(0, 0, opts.width, opts.height);
          if (opts.rotate) {
            contextRotate(context, opts);
          }
          opts.chartData.gaugeData = drawGaugeDataPoints(categories, series, opts, config2, context, process);
          drawCanvas(opts, context);
        },
        onAnimationFinish: function onAnimationFinish() {
          _this.uevent.trigger("renderComplete");
        }
      });
      break;
    case "candle":
      this.animationInstance = new Animation({
        timing: opts.timing,
        duration,
        onProcess: function onProcess(process) {
          context.clearRect(0, 0, opts.width, opts.height);
          if (opts.rotate) {
            contextRotate(context, opts);
          }
          drawYAxisGrid(categories, opts, config2, context);
          drawXAxis(categories, opts, config2, context);
          var _drawCandleDataPoints = drawCandleDataPoints(series, seriesMA, opts, config2, context, process), xAxisPoints = _drawCandleDataPoints.xAxisPoints, calPoints = _drawCandleDataPoints.calPoints, eachSpacing = _drawCandleDataPoints.eachSpacing;
          opts.chartData.xAxisPoints = xAxisPoints;
          opts.chartData.calPoints = calPoints;
          opts.chartData.eachSpacing = eachSpacing;
          drawYAxis(series, opts, config2, context);
          if (opts.enableMarkLine !== false && process === 1) {
            drawMarkLine(opts, config2, context);
          }
          if (seriesMA) {
            drawLegend(seriesMA, opts, config2, context, opts.chartData);
          } else {
            drawLegend(opts.series, opts, config2, context, opts.chartData);
          }
          drawToolTipBridge(opts, config2, context, process);
          drawCanvas(opts, context);
        },
        onAnimationFinish: function onAnimationFinish() {
          _this.uevent.trigger("renderComplete");
        }
      });
      break;
  }
}
function uChartsEvent() {
  this.events = {};
}
uChartsEvent.prototype.addEventListener = function(type, listener) {
  this.events[type] = this.events[type] || [];
  this.events[type].push(listener);
};
uChartsEvent.prototype.delEventListener = function(type) {
  this.events[type] = [];
};
uChartsEvent.prototype.trigger = function() {
  for (var _len = arguments.length, args = Array(_len), _key = 0; _key < _len; _key++) {
    args[_key] = arguments[_key];
  }
  var type = args[0];
  var params = args.slice(1);
  if (!!this.events[type]) {
    this.events[type].forEach(function(listener) {
      try {
        listener.apply(null, params);
      } catch (e2) {
      }
    });
  }
};
var uCharts = function uCharts2(opts) {
  opts.pix = opts.pixelRatio ? opts.pixelRatio : 1;
  opts.fontSize = opts.fontSize ? opts.fontSize : 13;
  opts.fontColor = opts.fontColor ? opts.fontColor : config.fontColor;
  if (opts.background == "" || opts.background == "none") {
    opts.background = "#FFFFFF";
  }
  opts.title = assign({}, opts.title);
  opts.subtitle = assign({}, opts.subtitle);
  opts.duration = opts.duration ? opts.duration : 1e3;
  opts.yAxis = assign({}, {
    data: [],
    showTitle: false,
    disabled: false,
    disableGrid: false,
    gridSet: "number",
    splitNumber: 5,
    gridType: "solid",
    dashLength: 4 * opts.pix,
    gridColor: "#cccccc",
    padding: 10,
    fontColor: "#666666"
  }, opts.yAxis);
  opts.xAxis = assign({}, {
    rotateLabel: false,
    rotateAngle: 45,
    disabled: false,
    disableGrid: false,
    splitNumber: 5,
    calibration: false,
    fontColor: "#666666",
    fontSize: 13,
    lineHeight: 20,
    marginTop: 0,
    gridType: "solid",
    dashLength: 4,
    scrollAlign: "left",
    boundaryGap: "center",
    axisLine: true,
    axisLineColor: "#cccccc",
    titleFontSize: 13,
    titleOffsetY: 0,
    titleOffsetX: 0,
    titleFontColor: "#666666"
  }, opts.xAxis);
  opts.xAxis.scrollPosition = opts.xAxis.scrollAlign;
  opts.legend = assign({}, {
    show: true,
    position: "bottom",
    float: "center",
    backgroundColor: "rgba(0,0,0,0)",
    borderColor: "rgba(0,0,0,0)",
    borderWidth: 0,
    padding: 5,
    margin: 5,
    itemGap: 10,
    fontSize: opts.fontSize,
    lineHeight: opts.fontSize,
    fontColor: opts.fontColor,
    formatter: {},
    hiddenColor: "#CECECE"
  }, opts.legend);
  opts.extra = assign({
    tooltip: {
      legendShape: "auto"
    }
  }, opts.extra);
  opts.rotate = opts.rotate ? true : false;
  opts.animation = opts.animation ? true : false;
  opts.rotate = opts.rotate ? true : false;
  opts.canvas2d = opts.canvas2d ? true : false;
  let config$$1 = assign({}, config);
  config$$1.color = opts.color ? opts.color : config$$1.color;
  if (opts.type == "pie") {
    config$$1.pieChartLinePadding = opts.dataLabel === false ? 0 : opts.extra.pie.labelWidth * opts.pix || config$$1.pieChartLinePadding * opts.pix;
  }
  if (opts.type == "ring") {
    config$$1.pieChartLinePadding = opts.dataLabel === false ? 0 : opts.extra.ring.labelWidth * opts.pix || config$$1.pieChartLinePadding * opts.pix;
  }
  if (opts.type == "rose") {
    config$$1.pieChartLinePadding = opts.dataLabel === false ? 0 : opts.extra.rose.labelWidth * opts.pix || config$$1.pieChartLinePadding * opts.pix;
  }
  config$$1.pieChartTextPadding = opts.dataLabel === false ? 0 : config$$1.pieChartTextPadding * opts.pix;
  config$$1.rotate = opts.rotate;
  if (opts.rotate) {
    let tempWidth = opts.width;
    let tempHeight = opts.height;
    opts.width = tempHeight;
    opts.height = tempWidth;
  }
  opts.padding = opts.padding ? opts.padding : config$$1.padding;
  config$$1.yAxisWidth = config.yAxisWidth * opts.pix;
  config$$1.fontSize = opts.fontSize * opts.pix;
  config$$1.titleFontSize = config.titleFontSize * opts.pix;
  config$$1.subtitleFontSize = config.subtitleFontSize * opts.pix;
  if (!opts.context) {
    throw new Error("[uCharts] 未获取到context！注意：v2.0版本后，需要自行获取canvas的绘图上下文并传入opts.context！");
  }
  this.context = opts.context;
  if (!this.context.setTextAlign) {
    this.context.setStrokeStyle = function(e2) {
      return this.strokeStyle = e2;
    };
    this.context.setLineWidth = function(e2) {
      return this.lineWidth = e2;
    };
    this.context.setLineCap = function(e2) {
      return this.lineCap = e2;
    };
    this.context.setFontSize = function(e2) {
      return this.font = e2 + "px sans-serif";
    };
    this.context.setFillStyle = function(e2) {
      return this.fillStyle = e2;
    };
    this.context.setTextAlign = function(e2) {
      return this.textAlign = e2;
    };
    this.context.setTextBaseline = function(e2) {
      return this.textBaseline = e2;
    };
    this.context.setShadow = function(offsetX, offsetY, blur, color) {
      this.shadowColor = color;
      this.shadowOffsetX = offsetX;
      this.shadowOffsetY = offsetY;
      this.shadowBlur = blur;
    };
    this.context.draw = function() {
    };
  }
  if (!this.context.setLineDash) {
    this.context.setLineDash = function(e2) {
    };
  }
  opts.chartData = {};
  this.uevent = new uChartsEvent();
  this.scrollOption = {
    currentOffset: 0,
    startTouchX: 0,
    distance: 0,
    lastMoveTime: 0
  };
  this.opts = opts;
  this.config = config$$1;
  drawCharts.call(this, opts.type, opts, config$$1, this.context);
};
uCharts.prototype.updateData = function() {
  let data = arguments.length > 0 && arguments[0] !== void 0 ? arguments[0] : {};
  this.opts = assign({}, this.opts, data);
  this.opts.updateData = true;
  let scrollPosition = data.scrollPosition || "current";
  switch (scrollPosition) {
    case "current":
      this.opts._scrollDistance_ = this.scrollOption.currentOffset;
      break;
    case "left":
      this.opts._scrollDistance_ = 0;
      this.scrollOption = {
        currentOffset: 0,
        startTouchX: 0,
        distance: 0,
        lastMoveTime: 0
      };
      break;
    case "right":
      let _calYAxisData = calYAxisData(this.opts.series, this.opts, this.config, this.context), yAxisWidth = _calYAxisData.yAxisWidth;
      this.config.yAxisWidth = yAxisWidth;
      let offsetLeft = 0;
      let _getXAxisPoints0 = getXAxisPoints(this.opts.categories, this.opts, this.config), xAxisPoints = _getXAxisPoints0.xAxisPoints, startX = _getXAxisPoints0.startX, endX = _getXAxisPoints0.endX, eachSpacing = _getXAxisPoints0.eachSpacing;
      let totalWidth = eachSpacing * (xAxisPoints.length - 1);
      let screenWidth = endX - startX;
      offsetLeft = screenWidth - totalWidth;
      this.scrollOption = {
        currentOffset: offsetLeft,
        startTouchX: offsetLeft,
        distance: 0,
        lastMoveTime: 0
      };
      this.opts._scrollDistance_ = offsetLeft;
      break;
  }
  drawCharts.call(this, this.opts.type, this.opts, this.config, this.context);
};
uCharts.prototype.zoom = function() {
  var val = arguments.length > 0 && arguments[0] !== void 0 ? arguments[0] : this.opts.xAxis.itemCount;
  if (this.opts.enableScroll !== true) {
    console.log("[uCharts] 请启用滚动条后使用");
    return;
  }
  let centerPoint = Math.round(Math.abs(this.scrollOption.currentOffset) / this.opts.chartData.eachSpacing) + Math.round(this.opts.xAxis.itemCount / 2);
  this.opts.animation = false;
  this.opts.xAxis.itemCount = val.itemCount;
  let _calYAxisData = calYAxisData(this.opts.series, this.opts, this.config, this.context), yAxisWidth = _calYAxisData.yAxisWidth;
  this.config.yAxisWidth = yAxisWidth;
  let offsetLeft = 0;
  let _getXAxisPoints0 = getXAxisPoints(this.opts.categories, this.opts, this.config), xAxisPoints = _getXAxisPoints0.xAxisPoints, startX = _getXAxisPoints0.startX, endX = _getXAxisPoints0.endX, eachSpacing = _getXAxisPoints0.eachSpacing;
  let centerLeft = eachSpacing * centerPoint;
  let screenWidth = endX - startX;
  let MaxLeft = screenWidth - eachSpacing * (xAxisPoints.length - 1);
  offsetLeft = screenWidth / 2 - centerLeft;
  if (offsetLeft > 0) {
    offsetLeft = 0;
  }
  if (offsetLeft < MaxLeft) {
    offsetLeft = MaxLeft;
  }
  this.scrollOption = {
    currentOffset: offsetLeft,
    startTouchX: 0,
    distance: 0,
    lastMoveTime: 0
  };
  calValidDistance(this, offsetLeft, this.opts.chartData, this.config, this.opts);
  this.opts._scrollDistance_ = offsetLeft;
  drawCharts.call(this, this.opts.type, this.opts, this.config, this.context);
};
uCharts.prototype.dobuleZoom = function(e2) {
  if (this.opts.enableScroll !== true) {
    console.log("[uCharts] 请启用滚动条后使用");
    return;
  }
  const tcs = e2.changedTouches;
  if (tcs.length < 2) {
    return;
  }
  for (var i = 0; i < tcs.length; i++) {
    tcs[i].x = tcs[i].x ? tcs[i].x : tcs[i].clientX;
    tcs[i].y = tcs[i].y ? tcs[i].y : tcs[i].clientY;
  }
  const ntcs = [getTouches(tcs[0], this.opts, e2), getTouches(tcs[1], this.opts, e2)];
  const xlength = Math.abs(ntcs[0].x - ntcs[1].x);
  if (!this.scrollOption.moveCount) {
    let cts0 = { changedTouches: [{ x: tcs[0].x, y: this.opts.area[0] / this.opts.pix + 2 }] };
    let cts1 = { changedTouches: [{ x: tcs[1].x, y: this.opts.area[0] / this.opts.pix + 2 }] };
    if (this.opts.rotate) {
      cts0 = { changedTouches: [{ x: this.opts.height / this.opts.pix - this.opts.area[0] / this.opts.pix - 2, y: tcs[0].y }] };
      cts1 = { changedTouches: [{ x: this.opts.height / this.opts.pix - this.opts.area[0] / this.opts.pix - 2, y: tcs[1].y }] };
    }
    const moveCurrent1 = this.getCurrentDataIndex(cts0).index;
    const moveCurrent2 = this.getCurrentDataIndex(cts1).index;
    const moveCount = Math.abs(moveCurrent1 - moveCurrent2);
    this.scrollOption.moveCount = moveCount;
    this.scrollOption.moveCurrent1 = Math.min(moveCurrent1, moveCurrent2);
    this.scrollOption.moveCurrent2 = Math.max(moveCurrent1, moveCurrent2);
    return;
  }
  let currentEachSpacing = xlength / this.scrollOption.moveCount;
  let itemCount = (this.opts.width - this.opts.area[1] - this.opts.area[3]) / currentEachSpacing;
  itemCount = itemCount <= 2 ? 2 : itemCount;
  itemCount = itemCount >= this.opts.categories.length ? this.opts.categories.length : itemCount;
  this.opts.animation = false;
  this.opts.xAxis.itemCount = itemCount;
  let offsetLeft = 0;
  let _getXAxisPoints0 = getXAxisPoints(this.opts.categories, this.opts, this.config), xAxisPoints = _getXAxisPoints0.xAxisPoints, startX = _getXAxisPoints0.startX, endX = _getXAxisPoints0.endX, eachSpacing = _getXAxisPoints0.eachSpacing;
  let currentLeft = eachSpacing * this.scrollOption.moveCurrent1;
  let screenWidth = endX - startX;
  let MaxLeft = screenWidth - eachSpacing * (xAxisPoints.length - 1);
  offsetLeft = -currentLeft + Math.min(ntcs[0].x, ntcs[1].x) - this.opts.area[3] - eachSpacing;
  if (offsetLeft > 0) {
    offsetLeft = 0;
  }
  if (offsetLeft < MaxLeft) {
    offsetLeft = MaxLeft;
  }
  this.scrollOption.currentOffset = offsetLeft;
  this.scrollOption.startTouchX = 0;
  this.scrollOption.distance = 0;
  calValidDistance(this, offsetLeft, this.opts.chartData, this.config, this.opts);
  this.opts._scrollDistance_ = offsetLeft;
  drawCharts.call(this, this.opts.type, this.opts, this.config, this.context);
};
uCharts.prototype.stopAnimation = function() {
  this.animationInstance && this.animationInstance.stop();
};
uCharts.prototype.addEventListener = function(type, listener) {
  this.uevent.addEventListener(type, listener);
};
uCharts.prototype.delEventListener = function(type) {
  this.uevent.delEventListener(type);
};
uCharts.prototype.getCurrentDataIndex = function(e2) {
  var touches = null;
  if (e2.changedTouches) {
    touches = e2.changedTouches[0];
  } else {
    touches = e2.mp.changedTouches[0];
  }
  if (touches) {
    let _touches$ = getTouches(touches, this.opts, e2);
    if (this.opts.type === "pie" || this.opts.type === "ring") {
      return findPieChartCurrentIndex({
        x: _touches$.x,
        y: _touches$.y
      }, this.opts.chartData.pieData, this.opts);
    } else if (this.opts.type === "rose") {
      return findRoseChartCurrentIndex({
        x: _touches$.x,
        y: _touches$.y
      }, this.opts.chartData.pieData, this.opts);
    } else if (this.opts.type === "radar") {
      return findRadarChartCurrentIndex({
        x: _touches$.x,
        y: _touches$.y
      }, this.opts.chartData.radarData, this.opts.categories.length);
    } else if (this.opts.type === "funnel") {
      return findFunnelChartCurrentIndex({
        x: _touches$.x,
        y: _touches$.y
      }, this.opts.chartData.funnelData);
    } else if (this.opts.type === "map") {
      return findMapChartCurrentIndex({
        x: _touches$.x,
        y: _touches$.y
      }, this.opts);
    } else if (this.opts.type === "word") {
      return findWordChartCurrentIndex({
        x: _touches$.x,
        y: _touches$.y
      }, this.opts.chartData.wordCloudData);
    } else if (this.opts.type === "bar") {
      return findBarChartCurrentIndex({
        x: _touches$.x,
        y: _touches$.y
      }, this.opts.chartData.calPoints, this.opts, this.config, Math.abs(this.scrollOption.currentOffset));
    } else {
      return findCurrentIndex({
        x: _touches$.x,
        y: _touches$.y
      }, this.opts.chartData.calPoints, this.opts, this.config, Math.abs(this.scrollOption.currentOffset));
    }
  }
  return -1;
};
uCharts.prototype.getLegendDataIndex = function(e2) {
  var touches = null;
  if (e2.changedTouches) {
    touches = e2.changedTouches[0];
  } else {
    touches = e2.mp.changedTouches[0];
  }
  if (touches) {
    let _touches$ = getTouches(touches, this.opts, e2);
    return findLegendIndex({
      x: _touches$.x,
      y: _touches$.y
    }, this.opts.chartData.legendData);
  }
  return -1;
};
uCharts.prototype.touchLegend = function(e2) {
  var option = arguments.length > 1 && arguments[1] !== void 0 ? arguments[1] : {};
  var touches = null;
  if (e2.changedTouches) {
    touches = e2.changedTouches[0];
  } else {
    touches = e2.mp.changedTouches[0];
  }
  if (touches) {
    getTouches(touches, this.opts, e2);
    var index2 = this.getLegendDataIndex(e2);
    if (index2 >= 0) {
      if (this.opts.type == "candle") {
        this.opts.seriesMA[index2].show = !this.opts.seriesMA[index2].show;
      } else {
        this.opts.series[index2].show = !this.opts.series[index2].show;
      }
      this.opts.animation = option.animation ? true : false;
      this.opts._scrollDistance_ = this.scrollOption.currentOffset;
      drawCharts.call(this, this.opts.type, this.opts, this.config, this.context);
    }
  }
};
uCharts.prototype.showToolTip = function(e2) {
  var option = arguments.length > 1 && arguments[1] !== void 0 ? arguments[1] : {};
  var touches = null;
  if (e2.changedTouches) {
    touches = e2.changedTouches[0];
  } else {
    touches = e2.mp.changedTouches[0];
  }
  if (!touches) {
    console.log("[uCharts] 未获取到event坐标信息");
  }
  var _touches$ = getTouches(touches, this.opts, e2);
  var currentOffset = this.scrollOption.currentOffset;
  var opts = assign({}, this.opts, {
    _scrollDistance_: currentOffset,
    animation: false
  });
  if (this.opts.type === "line" || this.opts.type === "area" || this.opts.type === "column" || this.opts.type === "scatter" || this.opts.type === "bubble") {
    var current = this.getCurrentDataIndex(e2);
    var index2 = option.index == void 0 ? current.index : option.index;
    if (index2 > -1 || index2.length > 0) {
      var seriesData = getSeriesDataItem(this.opts.series, index2, current.group);
      if (seriesData.length !== 0) {
        var _getToolTipData = getToolTipData(seriesData, this.opts, index2, current.group, this.opts.categories, option), textList = _getToolTipData.textList, offset = _getToolTipData.offset;
        offset.y = _touches$.y;
        opts.tooltip = {
          textList: option.textList !== void 0 ? option.textList : textList,
          offset: option.offset !== void 0 ? option.offset : offset,
          option,
          index: index2,
          group: current.group
        };
      }
    }
    drawCharts.call(this, opts.type, opts, this.config, this.context);
  }
  if (this.opts.type === "mount") {
    var index2 = option.index == void 0 ? this.getCurrentDataIndex(e2).index : option.index;
    if (index2 > -1) {
      var opts = assign({}, this.opts, { animation: false });
      var seriesData = assign({}, opts._series_[index2]);
      var textList = [{
        text: option.formatter ? option.formatter(seriesData, void 0, index2, opts) : seriesData.name + ": " + seriesData.data,
        color: seriesData.color,
        legendShape: this.opts.extra.tooltip.legendShape == "auto" ? seriesData.legendShape : this.opts.extra.tooltip.legendShape
      }];
      var offset = {
        x: opts.chartData.calPoints[index2].x,
        y: _touches$.y
      };
      opts.tooltip = {
        textList: option.textList ? option.textList : textList,
        offset: option.offset !== void 0 ? option.offset : offset,
        option,
        index: index2
      };
    }
    drawCharts.call(this, opts.type, opts, this.config, this.context);
  }
  if (this.opts.type === "bar") {
    var current = this.getCurrentDataIndex(e2);
    var index2 = option.index == void 0 ? current.index : option.index;
    if (index2 > -1 || index2.length > 0) {
      var seriesData = getSeriesDataItem(this.opts.series, index2, current.group);
      if (seriesData.length !== 0) {
        var _getToolTipData = getToolTipData(seriesData, this.opts, index2, current.group, this.opts.categories, option), textList = _getToolTipData.textList, offset = _getToolTipData.offset;
        offset.x = _touches$.x;
        opts.tooltip = {
          textList: option.textList !== void 0 ? option.textList : textList,
          offset: option.offset !== void 0 ? option.offset : offset,
          option,
          index: index2
        };
      }
    }
    drawCharts.call(this, opts.type, opts, this.config, this.context);
  }
  if (this.opts.type === "mix") {
    var current = this.getCurrentDataIndex(e2);
    var index2 = option.index == void 0 ? current.index : option.index;
    if (index2 > -1) {
      var currentOffset = this.scrollOption.currentOffset;
      var opts = assign({}, this.opts, {
        _scrollDistance_: currentOffset,
        animation: false
      });
      var seriesData = getSeriesDataItem(this.opts.series, index2);
      if (seriesData.length !== 0) {
        var _getMixToolTipData = getMixToolTipData(seriesData, this.opts, index2, this.opts.categories, option), textList = _getMixToolTipData.textList, offset = _getMixToolTipData.offset;
        offset.y = _touches$.y;
        opts.tooltip = {
          textList: option.textList ? option.textList : textList,
          offset: option.offset !== void 0 ? option.offset : offset,
          option,
          index: index2
        };
      }
    }
    drawCharts.call(this, opts.type, opts, this.config, this.context);
  }
  if (this.opts.type === "candle") {
    var current = this.getCurrentDataIndex(e2);
    var index2 = option.index == void 0 ? current.index : option.index;
    if (index2 > -1) {
      var currentOffset = this.scrollOption.currentOffset;
      var opts = assign({}, this.opts, {
        _scrollDistance_: currentOffset,
        animation: false
      });
      var seriesData = getSeriesDataItem(this.opts.series, index2);
      if (seriesData.length !== 0) {
        var _getToolTipData = getCandleToolTipData(this.opts.series[0].data, seriesData, this.opts, index2, this.opts.categories, this.opts.extra.candle), textList = _getToolTipData.textList, offset = _getToolTipData.offset;
        offset.y = _touches$.y;
        opts.tooltip = {
          textList: option.textList ? option.textList : textList,
          offset: option.offset !== void 0 ? option.offset : offset,
          option,
          index: index2
        };
      }
    }
    drawCharts.call(this, opts.type, opts, this.config, this.context);
  }
  if (this.opts.type === "pie" || this.opts.type === "ring" || this.opts.type === "rose" || this.opts.type === "funnel") {
    var index2 = option.index == void 0 ? this.getCurrentDataIndex(e2) : option.index;
    if (index2 > -1) {
      var opts = assign({}, this.opts, { animation: false });
      var seriesData = assign({}, opts._series_[index2]);
      var textList = [{
        text: option.formatter ? option.formatter(seriesData, void 0, index2, opts) : seriesData.name + ": " + seriesData.data,
        color: seriesData.color,
        legendShape: this.opts.extra.tooltip.legendShape == "auto" ? seriesData.legendShape : this.opts.extra.tooltip.legendShape
      }];
      var offset = {
        x: _touches$.x,
        y: _touches$.y
      };
      opts.tooltip = {
        textList: option.textList ? option.textList : textList,
        offset: option.offset !== void 0 ? option.offset : offset,
        option,
        index: index2
      };
    }
    drawCharts.call(this, opts.type, opts, this.config, this.context);
  }
  if (this.opts.type === "map") {
    var index2 = option.index == void 0 ? this.getCurrentDataIndex(e2) : option.index;
    if (index2 > -1) {
      var opts = assign({}, this.opts, { animation: false });
      var seriesData = assign({}, this.opts.series[index2]);
      seriesData.name = seriesData.properties.name;
      var textList = [{
        text: option.formatter ? option.formatter(seriesData, void 0, index2, this.opts) : seriesData.name,
        color: seriesData.color,
        legendShape: this.opts.extra.tooltip.legendShape == "auto" ? seriesData.legendShape : this.opts.extra.tooltip.legendShape
      }];
      var offset = {
        x: _touches$.x,
        y: _touches$.y
      };
      opts.tooltip = {
        textList: option.textList ? option.textList : textList,
        offset: option.offset !== void 0 ? option.offset : offset,
        option,
        index: index2
      };
    }
    opts.updateData = false;
    drawCharts.call(this, opts.type, opts, this.config, this.context);
  }
  if (this.opts.type === "word") {
    var index2 = option.index == void 0 ? this.getCurrentDataIndex(e2) : option.index;
    if (index2 > -1) {
      var opts = assign({}, this.opts, { animation: false });
      var seriesData = assign({}, this.opts.series[index2]);
      var textList = [{
        text: option.formatter ? option.formatter(seriesData, void 0, index2, this.opts) : seriesData.name,
        color: seriesData.color,
        legendShape: this.opts.extra.tooltip.legendShape == "auto" ? seriesData.legendShape : this.opts.extra.tooltip.legendShape
      }];
      var offset = {
        x: _touches$.x,
        y: _touches$.y
      };
      opts.tooltip = {
        textList: option.textList ? option.textList : textList,
        offset: option.offset !== void 0 ? option.offset : offset,
        option,
        index: index2
      };
    }
    opts.updateData = false;
    drawCharts.call(this, opts.type, opts, this.config, this.context);
  }
  if (this.opts.type === "radar") {
    var index2 = option.index == void 0 ? this.getCurrentDataIndex(e2) : option.index;
    if (index2 > -1) {
      var opts = assign({}, this.opts, { animation: false });
      var seriesData = getSeriesDataItem(this.opts.series, index2);
      if (seriesData.length !== 0) {
        var textList = seriesData.map((item) => {
          return {
            text: option.formatter ? option.formatter(item, this.opts.categories[index2], index2, this.opts) : item.name + ": " + item.data,
            color: item.color,
            legendShape: this.opts.extra.tooltip.legendShape == "auto" ? item.legendShape : this.opts.extra.tooltip.legendShape
          };
        });
        var offset = {
          x: _touches$.x,
          y: _touches$.y
        };
        opts.tooltip = {
          textList: option.textList ? option.textList : textList,
          offset: option.offset !== void 0 ? option.offset : offset,
          option,
          index: index2
        };
      }
    }
    drawCharts.call(this, opts.type, opts, this.config, this.context);
  }
};
uCharts.prototype.translate = function(distance) {
  this.scrollOption = {
    currentOffset: distance,
    startTouchX: distance,
    distance: 0,
    lastMoveTime: 0
  };
  let opts = assign({}, this.opts, {
    _scrollDistance_: distance,
    animation: false
  });
  drawCharts.call(this, this.opts.type, opts, this.config, this.context);
};
uCharts.prototype.scrollStart = function(e2) {
  var touches = null;
  if (e2.changedTouches) {
    touches = e2.changedTouches[0];
  } else {
    touches = e2.mp.changedTouches[0];
  }
  var _touches$ = getTouches(touches, this.opts, e2);
  if (touches && this.opts.enableScroll === true) {
    this.scrollOption.startTouchX = _touches$.x;
  }
};
uCharts.prototype.scroll = function(e2) {
  if (this.scrollOption.lastMoveTime === 0) {
    this.scrollOption.lastMoveTime = Date.now();
  }
  let Limit = this.opts.touchMoveLimit || 60;
  let currMoveTime = Date.now();
  let duration = currMoveTime - this.scrollOption.lastMoveTime;
  if (duration < Math.floor(1e3 / Limit))
    return;
  if (this.scrollOption.startTouchX == 0)
    return;
  this.scrollOption.lastMoveTime = currMoveTime;
  var touches = null;
  if (e2.changedTouches) {
    touches = e2.changedTouches[0];
  } else {
    touches = e2.mp.changedTouches[0];
  }
  if (touches && this.opts.enableScroll === true) {
    var _touches$ = getTouches(touches, this.opts, e2);
    var _distance;
    _distance = _touches$.x - this.scrollOption.startTouchX;
    var currentOffset = this.scrollOption.currentOffset;
    var validDistance = calValidDistance(this, currentOffset + _distance, this.opts.chartData, this.config, this.opts);
    this.scrollOption.distance = _distance = validDistance - currentOffset;
    var opts = assign({}, this.opts, {
      _scrollDistance_: currentOffset + _distance,
      animation: false
    });
    this.opts = opts;
    drawCharts.call(this, opts.type, opts, this.config, this.context);
    return currentOffset + _distance;
  }
};
uCharts.prototype.scrollEnd = function(e2) {
  if (this.opts.enableScroll === true) {
    var _scrollOption = this.scrollOption, currentOffset = _scrollOption.currentOffset, distance = _scrollOption.distance;
    this.scrollOption.currentOffset = currentOffset + distance;
    this.scrollOption.distance = 0;
    this.scrollOption.moveCount = 0;
  }
};
exports.Pinia = Pinia;
exports._export_sfc = _export_sfc;
exports.computed = computed;
exports.createI18n = createI18n;
exports.createPinia = createPinia;
exports.createSSRApp = createSSRApp;
exports.defineComponent = defineComponent;
exports.defineStore = defineStore;
exports.e = e;
exports.f = f;
exports.getCurrentInstance = getCurrentInstance;
exports.index = index;
exports.inject = inject;
exports.isRef = isRef;
exports.n = n;
exports.nextTick$1 = nextTick$1;
exports.o = o;
exports.onBeforeMount = onBeforeMount;
exports.onLoad = onLoad;
exports.onMounted = onMounted;
exports.onShareAppMessage = onShareAppMessage;
exports.onShareTimeline = onShareTimeline;
exports.onShow = onShow;
exports.onUnmounted = onUnmounted;
exports.onUpdated = onUpdated;
exports.p = p;
exports.provide = provide;
exports.ref = ref;
exports.resolveComponent = resolveComponent;
exports.s = s;
exports.sr = sr;
exports.t = t;
exports.uCharts = uCharts;
exports.unref = unref;
exports.watch = watch;
exports.watchEffect = watchEffect;
