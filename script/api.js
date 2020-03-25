!function(e){var n={},t=/android/gi.test(navigator.appVersion),r=function(){var n=e.localStorage;return t&&(n=os.localStorage()),n};function a(e,n,t,r){return"function"==typeof n&&(r=t,t=n,n=void 0),"function"!=typeof t&&(r=t,t=void 0),{url:e,data:n,fnSuc:t,dataType:r}}n.trim=function(e){return String.prototype.trim?null==e?"":String.prototype.trim.call(e):e.replace(/(^\s*)|(\s*$)/g,"")},n.trimAll=function(e){return e.replace(/\s*/g,"")},n.isElement=function(e){return!(!e||1!=e.nodeType)},n.isArray=function(e){return Array.isArray?Array.isArray(e):e instanceof Array},n.isEmptyObject=function(e){return"{}"===JSON.stringify(e)},n.addEvt=function(e,t,r,a){n.isElement(e)?(a=a||!1,e.addEventListener&&e.addEventListener(t,r,a)):console.warn("$api.addEvt Function need el param, el param must be DOM Element")},n.rmEvt=function(e,t,r,a){n.isElement(e)?(a=a||!1,e.removeEventListener&&e.removeEventListener(t,r,a)):console.warn("$api.rmEvt Function need el param, el param must be DOM Element")},n.one=function(e,t,r,a){if(n.isElement(e)){a=a||!1;var i=this,o=function(){r&&r(),i.rmEvt(e,t,o,a)};i.addEvt(e,t,o,a)}else console.warn("$api.one Function need el param, el param must be DOM Element")},n.dom=function(e,n){if(1===arguments.length&&"string"==typeof arguments[0]){if(document.querySelector)return document.querySelector(arguments[0])}else if(2===arguments.length&&e.querySelector)return e.querySelector(n)},n.domAll=function(e,n){if(1===arguments.length&&"string"==typeof arguments[0]){if(document.querySelectorAll)return document.querySelectorAll(arguments[0])}else if(2===arguments.length&&e.querySelectorAll)return e.querySelectorAll(n)},n.byId=function(e){return document.getElementById(e)},n.first=function(e,t){return 1===arguments.length?n.isElement(e)?e.children[0]:void console.warn("$api.first Function need el param, el param must be DOM Element"):2===arguments.length?this.dom(e,t+":first-child"):void 0},n.last=function(e,t){if(1===arguments.length){if(!n.isElement(e))return void console.warn("$api.last Function need el param, el param must be DOM Element");var r=e.children;return r[r.length-1]}if(2===arguments.length)return this.dom(e,t+":last-child")},n.eq=function(e,n){return this.dom(e,":nth-child("+n+")")},n.not=function(e,n){return this.domAll(e,":not("+n+")")},n.prev=function(e){if(n.isElement(e)){var t=e.previousSibling;return t.nodeType&&3===t.nodeType?t=t.previousSibling:void 0}console.warn("$api.prev Function need el param, el param must be DOM Element")},n.next=function(e){if(n.isElement(e)){var t=e.nextSibling;return t.nodeType&&3===t.nodeType?t=t.nextSibling:void 0}console.warn("$api.next Function need el param, el param must be DOM Element")},n.closest=function(e,t){if(n.isElement(e)){var r,a,i=function(e,t){for(r=n.domAll(e.parentNode,t),a=function(e,n){for(var t=0,r=e.length;t<r;t++)if(e[t].isSameNode(n))return e[t];return!1}(r,e);!a;){if(null!=(e=e.parentNode)&&e.nodeType==e.DOCUMENT_NODE)return!1;i(e,t)}return a};return i(e,t)}console.warn("$api.closest Function need el param, el param must be DOM Element")},n.contains=function(e,n){var t=!1;if(n===e)return t=!0;do{if((n=n.parentNode)===e)return t=!0}while(n===document.body||n===document.documentElement);return t},n.remove=function(e){e&&e.parentNode&&e.parentNode.removeChild(e)},n.attr=function(e,t,r){if(n.isElement(e))return 2==arguments.length?e.getAttribute(t):3==arguments.length?(e.setAttribute(t,r),e):void 0;console.warn("$api.attr Function need el param, el param must be DOM Element")},n.removeAttr=function(e,t){n.isElement(e)?2===arguments.length&&e.removeAttribute(t):console.warn("$api.removeAttr Function need el param, el param must be DOM Element")},n.hasCls=function(e,t){if(n.isElement(e))return e.className.indexOf(t)>-1;console.warn("$api.hasCls Function need el param, el param must be DOM Element")},n.addCls=function(e,t){if(n.isElement(e)){if("classList"in e)e.classList.add(t);else{var r=e.className+" "+t;e.className=r}return e}console.warn("$api.addCls Function need el param, el param must be DOM Element")},n.removeCls=function(e,t){if(n.isElement(e)){if("classList"in e)e.classList.remove(t);else{var r=e.className.replace(t,"");e.className=r}return e}console.warn("$api.removeCls Function need el param, el param must be DOM Element")},n.toggleCls=function(e,t){if(n.isElement(e))return"classList"in e?e.classList.toggle(t):n.hasCls(e,t)?n.removeCls(e,t):n.addCls(e,t),e;console.warn("$api.toggleCls Function need el param, el param must be DOM Element")},n.val=function(e,t){if(n.isElement(e)){if(1===arguments.length)switch(e.tagName){case"SELECT":return e.options[e.selectedIndex].value;case"INPUT":case"TEXTAREA":return e.value}if(2===arguments.length)switch(e.tagName){case"SELECT":return e.options[e.selectedIndex].value=t,e;case"INPUT":case"TEXTAREA":return e.value=t,e}}else console.warn("$api.val Function need el param, el param must be DOM Element")},n.prepend=function(e,t){if(n.isElement(e))return e.insertAdjacentHTML("afterbegin",t),e;console.warn("$api.prepend Function need el param, el param must be DOM Element")},n.append=function(e,t){if(n.isElement(e))return e.insertAdjacentHTML("beforeend",t),e;console.warn("$api.append Function need el param, el param must be DOM Element")},n.before=function(e,t){if(n.isElement(e))return e.insertAdjacentHTML("beforebegin",t),e;console.warn("$api.before Function need el param, el param must be DOM Element")},n.after=function(e,t){if(n.isElement(e))return e.insertAdjacentHTML("afterend",t),e;console.warn("$api.after Function need el param, el param must be DOM Element")},n.html=function(e,t){if(n.isElement(e))return 1===arguments.length?e.innerHTML:2===arguments.length?(e.innerHTML=t,e):void 0;console.warn("$api.html Function need el param, el param must be DOM Element")},n.text=function(e,t){if(n.isElement(e))return 1===arguments.length?e.textContent:2===arguments.length?(e.textContent=t,e):void 0;console.warn("$api.text Function need el param, el param must be DOM Element")},n.offset=function(e){if(n.isElement(e)){var t=Math.max(document.documentElement.scrollLeft,document.body.scrollLeft),r=Math.max(document.documentElement.scrollTop,document.body.scrollTop),a=e.getBoundingClientRect();return{l:a.left+t,t:a.top+r,w:e.offsetWidth,h:e.offsetHeight}}console.warn("$api.offset Function need el param, el param must be DOM Element")},n.css=function(e,t){n.isElement(e)?"string"==typeof t&&t.indexOf(":")>0&&e.style&&(e.style.cssText+=";"+t):console.warn("$api.css Function need el param, el param must be DOM Element")},n.cssVal=function(t,r){if(n.isElement(t)){if(2===arguments.length)return e.getComputedStyle(t,null).getPropertyValue(r)}else console.warn("$api.cssVal Function need el param, el param must be DOM Element")},n.jsonToStr=function(e){if("object"==typeof e)return JSON&&JSON.stringify(e)},n.strToJson=function(e){if("string"==typeof e)return JSON&&JSON.parse(e)},n.setStorage=function(e,n){if(2===arguments.length){var t=n;t="object"==typeof t?"obj-"+(t=JSON.stringify(t)):"str-"+t;var a=r();a&&a.setItem(e,t)}},n.getStorage=function(e){var n=r();if(n){var t=n.getItem(e);if(!t)return;if(0===t.indexOf("obj-"))return t=t.slice(4),JSON.parse(t);if(0===t.indexOf("str-"))return t.slice(4)}},n.rmStorage=function(e){var n=r();n&&e&&n.removeItem(e)},n.clearStorage=function(){var e=r();e&&e.clear()},n.fixIos7Bar=function(e){return n.fixStatusBar(e)},n.fixStatusBar=function(e){return n.isElement(e)?(e.style.paddingTop=api.safeArea.top+"px",e.offsetHeight):(console.warn("$api.fixStatusBar Function need el param, el param must be DOM Element"),0)},n.fixTabBar=function(e){return n.isElement(e)?(e.style.paddingBottom=api.safeArea.bottom+"px",e.offsetHeight):(console.warn("$api.fixTabBarFunction need el param, el param must be DOM Element"),0)},n.toast=function(e,n,t){var r={},a=function(e,n){api.showProgress(e),setTimeout(function(){api.hideProgress()},n)};if(1===arguments.length){t=t||500;"number"==typeof e?t=e:r.title=e+"",a(r,t)}else if(2===arguments.length){t=t||500;if("number"==typeof(n=n))t=n,n=null;e&&(r.title=e),n&&(r.text=n),a(r,t)}e&&(r.title=e),n&&(r.text=n),a(r,t=t||500)},n.post=function(){var e=a.apply(null,arguments),n={},t=e.fnSuc;if(e.url&&(n.url=e.url),e.data&&(n.data=e.data),e.dataType){var r=e.dataType.toLowerCase();"text"!=r&&"json"!=r||(n.dataType=r)}else n.dataType="json";n.method="post",api.ajax(n,function(e,n){e&&t&&t(e)})},n.get=function(){var e=a.apply(null,arguments),n={},t=e.fnSuc;if(e.url&&(n.url=e.url),e.dataType){var r=e.dataType.toLowerCase();"text"!=r&&"json"!=r||(n.dataType=r)}else n.dataType="text";n.method="get",api.ajax(n,function(e,n){e&&t&&t(e)})},e.$api=n}(window);
