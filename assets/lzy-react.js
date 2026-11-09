(()=>{var zw=Object.create;var xy=Object.defineProperty;var Fw=Object.getOwnPropertyDescriptor;var Bw=Object.getOwnPropertyNames;var Hw=Object.getPrototypeOf,Gw=Object.prototype.hasOwnProperty;var Na=(e,t)=>()=>{try{return t||e((t={exports:{}}).exports,t),t.exports}catch(n){throw t=0,n}};var Vw=(e,t,n,i)=>{if(t&&typeof t=="object"||typeof t=="function")for(let a of Bw(t))!Gw.call(e,a)&&a!==n&&xy(e,a,{get:()=>t[a],enumerable:!(i=Fw(t,a))||i.enumerable});return e};var Ce=(e,t,n)=>(n=e!=null?zw(Hw(e)):{},Vw(t||!e||!e.__esModule?xy(n,"default",{value:e,enumerable:!0}):n,e));var Ry=Na(on=>{"use strict";function _m(e,t){var n=e.length;e.push(t);t:for(;0<n;){var i=n-1>>>1,a=e[i];if(0<xf(a,t))e[i]=t,e[n]=a,n=i;else break t}}function La(e){return e.length===0?null:e[0]}function _f(e){if(e.length===0)return null;var t=e[0],n=e.pop();if(n!==t){e[0]=n;t:for(var i=0,a=e.length,r=a>>>1;i<r;){var s=2*(i+1)-1,l=e[s],o=s+1,c=e[o];if(0>xf(l,n))o<a&&0>xf(c,l)?(e[i]=c,e[o]=n,i=o):(e[i]=l,e[s]=n,i=s);else if(o<a&&0>xf(c,n))e[i]=c,e[o]=n,i=o;else break t}}return t}function xf(e,t){var n=e.sortIndex-t.sortIndex;return n!==0?n:e.id-t.id}on.unstable_now=void 0;typeof performance=="object"&&typeof performance.now=="function"?(yy=performance,on.unstable_now=function(){return yy.now()}):(vm=Date,_y=vm.now(),on.unstable_now=function(){return vm.now()-_y});var yy,vm,_y,lr=[],Fr=[],kw=1,ji=null,Zn=3,bm=!1,_c=!1,bc=!1,Sm=!1,My=typeof setTimeout=="function"?setTimeout:null,Ey=typeof clearTimeout=="function"?clearTimeout:null,by=typeof setImmediate<"u"?setImmediate:null;function yf(e){for(var t=La(Fr);t!==null;){if(t.callback===null)_f(Fr);else if(t.startTime<=e)_f(Fr),t.sortIndex=t.expirationTime,_m(lr,t);else break;t=La(Fr)}}function Mm(e){if(bc=!1,yf(e),!_c)if(La(lr)!==null)_c=!0,No||(No=!0,Do());else{var t=La(Fr);t!==null&&Em(Mm,t.startTime-e)}}var No=!1,Sc=-1,Ty=5,wy=-1;function Ay(){return Sm?!0:!(on.unstable_now()-wy<Ty)}function xm(){if(Sm=!1,No){var e=on.unstable_now();wy=e;var t=!0;try{t:{_c=!1,bc&&(bc=!1,Ey(Sc),Sc=-1),bm=!0;var n=Zn;try{e:{for(yf(e),ji=La(lr);ji!==null&&!(ji.expirationTime>e&&Ay());){var i=ji.callback;if(typeof i=="function"){ji.callback=null,Zn=ji.priorityLevel;var a=i(ji.expirationTime<=e);if(e=on.unstable_now(),typeof a=="function"){ji.callback=a,yf(e),t=!0;break e}ji===La(lr)&&_f(lr),yf(e)}else _f(lr);ji=La(lr)}if(ji!==null)t=!0;else{var r=La(Fr);r!==null&&Em(Mm,r.startTime-e),t=!1}}break t}finally{ji=null,Zn=n,bm=!1}t=void 0}}finally{t?Do():No=!1}}}var Do;typeof by=="function"?Do=function(){by(xm)}:typeof MessageChannel<"u"?(ym=new MessageChannel,Sy=ym.port2,ym.port1.onmessage=xm,Do=function(){Sy.postMessage(null)}):Do=function(){My(xm,0)};var ym,Sy;function Em(e,t){Sc=My(function(){e(on.unstable_now())},t)}on.unstable_IdlePriority=5;on.unstable_ImmediatePriority=1;on.unstable_LowPriority=4;on.unstable_NormalPriority=3;on.unstable_Profiling=null;on.unstable_UserBlockingPriority=2;on.unstable_cancelCallback=function(e){e.callback=null};on.unstable_forceFrameRate=function(e){0>e||125<e?console.error("forceFrameRate takes a positive int between 0 and 125, forcing frame rates higher than 125 fps is not supported"):Ty=0<e?Math.floor(1e3/e):5};on.unstable_getCurrentPriorityLevel=function(){return Zn};on.unstable_next=function(e){switch(Zn){case 1:case 2:case 3:var t=3;break;default:t=Zn}var n=Zn;Zn=t;try{return e()}finally{Zn=n}};on.unstable_requestPaint=function(){Sm=!0};on.unstable_runWithPriority=function(e,t){switch(e){case 1:case 2:case 3:case 4:case 5:break;default:e=3}var n=Zn;Zn=e;try{return t()}finally{Zn=n}};on.unstable_scheduleCallback=function(e,t,n){var i=on.unstable_now();switch(typeof n=="object"&&n!==null?(n=n.delay,n=typeof n=="number"&&0<n?i+n:i):n=i,e){case 1:var a=-1;break;case 2:a=250;break;case 5:a=1073741823;break;case 4:a=1e4;break;default:a=5e3}return a=n+a,e={id:kw++,callback:t,priorityLevel:e,startTime:n,expirationTime:a,sortIndex:-1},n>i?(e.sortIndex=n,_m(Fr,e),La(lr)===null&&e===La(Fr)&&(bc?(Ey(Sc),Sc=-1):bc=!0,Em(Mm,n-i))):(e.sortIndex=a,_m(lr,e),_c||bm||(_c=!0,No||(No=!0,Do()))),e};on.unstable_shouldYield=Ay;on.unstable_wrapCallback=function(e){var t=Zn;return function(){var n=Zn;Zn=t;try{return e.apply(this,arguments)}finally{Zn=n}}}});var Dy=Na((dP,Cy)=>{"use strict";Cy.exports=Ry()});var ky=Na(pe=>{"use strict";var Am=Symbol.for("react.transitional.element"),Xw=Symbol.for("react.portal"),Ww=Symbol.for("react.fragment"),qw=Symbol.for("react.strict_mode"),Yw=Symbol.for("react.profiler"),Zw=Symbol.for("react.consumer"),Jw=Symbol.for("react.context"),Kw=Symbol.for("react.forward_ref"),jw=Symbol.for("react.suspense"),Qw=Symbol.for("react.memo"),Oy=Symbol.for("react.lazy"),$w=Symbol.for("react.activity"),tA=Symbol.for("react.view_transition"),Ny=Symbol.iterator;function eA(e){return e===null||typeof e!="object"?null:(e=Ny&&e[Ny]||e["@@iterator"],typeof e=="function"?e:null)}var Py={isMounted:function(){return!1},enqueueForceUpdate:function(){},enqueueReplaceState:function(){},enqueueSetState:function(){}},zy=Object.assign,Fy={};function Uo(e,t,n){this.props=e,this.context=t,this.refs=Fy,this.updater=n||Py}Uo.prototype.isReactComponent={};Uo.prototype.setState=function(e,t){if(typeof e!="object"&&typeof e!="function"&&e!=null)throw Error("takes an object of state variables to update or a function which returns an object of state variables.");this.updater.enqueueSetState(this,e,t,"setState")};Uo.prototype.forceUpdate=function(e){this.updater.enqueueForceUpdate(this,e,"forceUpdate")};function By(){}By.prototype=Uo.prototype;function Rm(e,t,n){this.props=e,this.context=t,this.refs=Fy,this.updater=n||Py}var Cm=Rm.prototype=new By;Cm.constructor=Rm;zy(Cm,Uo.prototype);Cm.isPureReactComponent=!0;var Ly=Array.isArray;function wm(){}var Ke={H:null,A:null,T:null,S:null},Hy=Object.prototype.hasOwnProperty;function Dm(e,t,n){var i=n.ref;return{$$typeof:Am,type:e,key:t,ref:i!==void 0?i:null,props:n}}function nA(e,t){return Dm(e.type,t,e.props)}function Nm(e){return typeof e=="object"&&e!==null&&e.$$typeof===Am}function iA(e){var t={"=":"=0",":":"=2"};return"$"+e.replace(/[=:]/g,function(n){return t[n]})}var Uy=/\/+/g;function Tm(e,t){return typeof e=="object"&&e!==null&&e.key!=null?iA(""+e.key):t.toString(36)}function aA(e){switch(e.status){case"fulfilled":return e.value;case"rejected":throw e.reason;default:switch(typeof e.status=="string"?e.then(wm,wm):(e.status="pending",e.then(function(t){e.status==="pending"&&(e.status="fulfilled",e.value=t)},function(t){e.status==="pending"&&(e.status="rejected",e.reason=t)})),e.status){case"fulfilled":return e.value;case"rejected":throw e.reason}}throw e}function Lo(e,t,n,i,a){var r=typeof e;(r==="undefined"||r==="boolean")&&(e=null);var s=!1;if(e===null)s=!0;else switch(r){case"bigint":case"string":case"number":s=!0;break;case"object":switch(e.$$typeof){case Am:case Xw:s=!0;break;case Oy:return s=e._init,Lo(s(e._payload),t,n,i,a)}}if(s)return a=a(e),s=i===""?"."+Tm(e,0):i,Ly(a)?(n="",s!=null&&(n=s.replace(Uy,"$&/")+"/"),Lo(a,t,n,"",function(c){return c})):a!=null&&(Nm(a)&&(a=nA(a,n+(a.key==null||e&&e.key===a.key?"":(""+a.key).replace(Uy,"$&/")+"/")+s)),t.push(a)),1;s=0;var l=i===""?".":i+":";if(Ly(e))for(var o=0;o<e.length;o++)i=e[o],r=l+Tm(i,o),s+=Lo(i,t,n,r,a);else if(o=eA(e),typeof o=="function")for(e=o.call(e),o=0;!(i=e.next()).done;)i=i.value,r=l+Tm(i,o++),s+=Lo(i,t,n,r,a);else if(r==="object"){if(typeof e.then=="function")return Lo(aA(e),t,n,i,a);throw t=String(e),Error("Objects are not valid as a React child (found: "+(t==="[object Object]"?"object with keys {"+Object.keys(e).join(", ")+"}":t)+"). If you meant to render a collection of children, use an array instead.")}return s}function bf(e,t,n){if(e==null)return e;var i=[],a=0;return Lo(e,i,"","",function(r){return t.call(n,r,a++)}),i}function rA(e){if(e._status===-1){var t=e._result,n=t();n.then(function(i){(e._status===0||e._status===-1)&&(e._status=1,e._result=i,n.status===void 0&&(n.status="fulfilled",n.value=i))},function(i){(e._status===0||e._status===-1)&&(e._status=2,e._result=i,n.status===void 0&&(n.status="rejected",n.reason=i))}),e._status===-1&&(e._status=0,e._result=n)}if(e._status===1)return e._result.default;throw e._result}var Iy=typeof reportError=="function"?reportError:function(e){if(typeof window=="object"&&typeof window.ErrorEvent=="function"){var t=new window.ErrorEvent("error",{bubbles:!0,cancelable:!0,message:typeof e=="object"&&e!==null&&typeof e.message=="string"?String(e.message):String(e),error:e});if(!window.dispatchEvent(t))return}else if(typeof process=="object"&&typeof process.emit=="function"){process.emit("uncaughtException",e);return}console.error(e)};function Gy(e){var t=Ke.T,n={};n.types=t!==null?t.types:null,Ke.T=n;try{var i=e(),a=Ke.S;a!==null&&a(n,i),typeof i=="object"&&i!==null&&typeof i.then=="function"&&i.then(wm,Iy)}catch(r){Iy(r)}finally{t!==null&&n.types!==null&&(t.types=n.types),Ke.T=t}}function Vy(e){var t=Ke.T;if(t!==null){var n=t.types;n===null?t.types=[e]:n.indexOf(e)===-1&&n.push(e)}else Gy(Vy.bind(null,e))}var sA={map:bf,forEach:function(e,t,n){bf(e,function(){t.apply(this,arguments)},n)},count:function(e){var t=0;return bf(e,function(){t++}),t},toArray:function(e){return bf(e,function(t){return t})||[]},only:function(e){if(!Nm(e))throw Error("React.Children.only expected to receive a single React element child.");return e}};pe.Activity=$w;pe.Children=sA;pe.Component=Uo;pe.Fragment=Ww;pe.Profiler=Yw;pe.PureComponent=Rm;pe.StrictMode=qw;pe.Suspense=jw;pe.ViewTransition=tA;pe.__CLIENT_INTERNALS_DO_NOT_USE_OR_WARN_USERS_THEY_CANNOT_UPGRADE=Ke;pe.__COMPILER_RUNTIME={__proto__:null,c:function(e){return Ke.H.useMemoCache(e)}};pe.addTransitionType=Vy;pe.cache=function(e){return function(){return e.apply(null,arguments)}};pe.cacheSignal=function(){return null};pe.cloneElement=function(e,t,n){if(e==null)throw Error("The argument must be a React element, but you passed "+e+".");var i=zy({},e.props),a=e.key;if(t!=null)for(r in t.key!==void 0&&(a=""+t.key),t)!Hy.call(t,r)||r==="key"||r==="__self"||r==="__source"||r==="ref"&&t.ref===void 0||(i[r]=t[r]);var r=arguments.length-2;if(r===1)i.children=n;else if(1<r){for(var s=Array(r),l=0;l<r;l++)s[l]=arguments[l+2];i.children=s}return Dm(e.type,a,i)};pe.createContext=function(e){return e={$$typeof:Jw,_currentValue:e,_currentValue2:e,_threadCount:0,Provider:null,Consumer:null},e.Provider=e,e.Consumer={$$typeof:Zw,_context:e},e};pe.createElement=function(e,t,n){var i,a={},r=null;if(t!=null)for(i in t.key!==void 0&&(r=""+t.key),t)Hy.call(t,i)&&i!=="key"&&i!=="__self"&&i!=="__source"&&(a[i]=t[i]);var s=arguments.length-2;if(s===1)a.children=n;else if(1<s){for(var l=Array(s),o=0;o<s;o++)l[o]=arguments[o+2];a.children=l}if(e&&e.defaultProps)for(i in s=e.defaultProps,s)a[i]===void 0&&(a[i]=s[i]);return Dm(e,r,a)};pe.createRef=function(){return{current:null}};pe.forwardRef=function(e){return{$$typeof:Kw,render:e}};pe.isValidElement=Nm;pe.lazy=function(e){return{$$typeof:Oy,_payload:{_status:-1,_result:e},_init:rA}};pe.memo=function(e,t){return{$$typeof:Qw,type:e,compare:t===void 0?null:t}};pe.startTransition=Gy;pe.unstable_useCacheRefresh=function(){return Ke.H.useCacheRefresh()};pe.use=function(e){return Ke.H.use(e)};pe.useActionState=function(e,t,n){return Ke.H.useActionState(e,t,n)};pe.useCallback=function(e,t){return Ke.H.useCallback(e,t)};pe.useContext=function(e){return Ke.H.useContext(e)};pe.useDebugValue=function(){};pe.useDeferredValue=function(e,t){return Ke.H.useDeferredValue(e,t)};pe.useEffect=function(e,t){return Ke.H.useEffect(e,t)};pe.useEffectEvent=function(e){return Ke.H.useEffectEvent(e)};pe.useId=function(){return Ke.H.useId()};pe.useImperativeHandle=function(e,t,n){return Ke.H.useImperativeHandle(e,t,n)};pe.useInsertionEffect=function(e,t){return Ke.H.useInsertionEffect(e,t)};pe.useLayoutEffect=function(e,t){return Ke.H.useLayoutEffect(e,t)};pe.useMemo=function(e,t){return Ke.H.useMemo(e,t)};pe.useOptimistic=function(e,t){return Ke.H.useOptimistic(e,t)};pe.useReducer=function(e,t,n){return Ke.H.useReducer(e,t,n)};pe.useRef=function(e){return Ke.H.useRef(e)};pe.useState=function(e){return Ke.H.useState(e)};pe.useSyncExternalStore=function(e,t,n){return Ke.H.useSyncExternalStore(e,t,n)};pe.useTransition=function(){return Ke.H.useTransition()};pe.version="19.3.1"});var vi=Na((mP,Xy)=>{"use strict";Xy.exports=ky()});var Yy=Na(Jn=>{"use strict";var oA=vi();function qy(e){var t="https://react.dev/errors/"+e;if(1<arguments.length){t+="?args[]="+encodeURIComponent(arguments[1]);for(var n=2;n<arguments.length;n++)t+="&args[]="+encodeURIComponent(arguments[n])}return"Minified React error #"+e+"; visit "+t+" for the full message or use the non-minified dev environment for full errors and additional helpful warnings."}function Br(){}var ii={d:{f:Br,r:function(){throw Error(qy(522))},D:Br,C:Br,L:Br,m:Br,X:Br,S:Br,M:Br},p:0,findDOMNode:null},lA=Symbol.for("react.portal"),cA=Symbol.for("react.recoverable"),Wy=Symbol.for("react.optimistic_key");function uA(e,t,n){var i=3<arguments.length&&arguments[3]!==void 0?arguments[3]:null;return{$$typeof:lA,key:i==null?null:i===Wy?Wy:""+i,children:e,containerInfo:t,implementation:n}}var Mc=oA.__CLIENT_INTERNALS_DO_NOT_USE_OR_WARN_USERS_THEY_CANNOT_UPGRADE;function Sf(e,t){if(e==="font")return"";if(typeof t=="string")return t==="use-credentials"?t:""}Jn.__DOM_INTERNALS_DO_NOT_USE_OR_WARN_USERS_THEY_CANNOT_UPGRADE=ii;Jn.browser=function(e){return{$$typeof:cA,_reason:e}};Jn.createPortal=function(e,t){var n=2<arguments.length&&arguments[2]!==void 0?arguments[2]:null;if(!t||t.nodeType!==1&&t.nodeType!==9&&t.nodeType!==11)throw Error(qy(299));return uA(e,t,null,n)};Jn.flushSync=function(e){var t=Mc.T,n=ii.p;try{if(Mc.T=null,ii.p=2,e)return e()}finally{Mc.T=t,ii.p=n,ii.d.f()}};Jn.preconnect=function(e,t){typeof e=="string"&&(t?(t=t.crossOrigin,t=typeof t=="string"?t==="use-credentials"?t:"":void 0):t=null,ii.d.C(e,t))};Jn.prefetchDNS=function(e){typeof e=="string"&&ii.d.D(e)};Jn.preinit=function(e,t){if(typeof e=="string"&&t&&typeof t.as=="string"){var n=t.as,i=Sf(n,t.crossOrigin),a=typeof t.integrity=="string"?t.integrity:void 0,r=typeof t.fetchPriority=="string"?t.fetchPriority:void 0;n==="style"?ii.d.S(e,typeof t.precedence=="string"?t.precedence:void 0,{crossOrigin:i,integrity:a,fetchPriority:r}):n==="script"&&ii.d.X(e,{crossOrigin:i,integrity:a,fetchPriority:r,nonce:typeof t.nonce=="string"?t.nonce:void 0})}};Jn.preinitModule=function(e,t){if(typeof e=="string")if(typeof t=="object"&&t!==null){if(t.as==null||t.as==="script"){var n=Sf(t.as,t.crossOrigin);ii.d.M(e,{crossOrigin:n,integrity:typeof t.integrity=="string"?t.integrity:void 0,nonce:typeof t.nonce=="string"?t.nonce:void 0,fetchPriority:typeof t.fetchPriority=="string"?t.fetchPriority:void 0})}}else t==null&&ii.d.M(e)};Jn.preload=function(e,t){if(typeof e=="string"&&typeof t=="object"&&t!==null&&typeof t.as=="string"){var n=t.as,i=Sf(n,t.crossOrigin);ii.d.L(e,n,{crossOrigin:i,integrity:typeof t.integrity=="string"?t.integrity:void 0,nonce:typeof t.nonce=="string"?t.nonce:void 0,type:typeof t.type=="string"?t.type:void 0,fetchPriority:typeof t.fetchPriority=="string"?t.fetchPriority:void 0,referrerPolicy:typeof t.referrerPolicy=="string"?t.referrerPolicy:void 0,imageSrcSet:typeof t.imageSrcSet=="string"?t.imageSrcSet:void 0,imageSizes:typeof t.imageSizes=="string"?t.imageSizes:void 0,media:typeof t.media=="string"?t.media:void 0})}};Jn.preloadModule=function(e,t){if(typeof e=="string")if(t){var n=Sf(t.as,t.crossOrigin);ii.d.m(e,{as:typeof t.as=="string"&&t.as!=="script"?t.as:void 0,crossOrigin:n,integrity:typeof t.integrity=="string"?t.integrity:void 0,nonce:typeof t.nonce=="string"?t.nonce:void 0,fetchPriority:typeof t.fetchPriority=="string"?t.fetchPriority:void 0})}else ii.d.m(e)};Jn.requestFormReset=function(e){ii.d.r(e)};Jn.unstable_batchedUpdates=function(e,t){return e(t)};Jn.useFormState=function(e,t,n){return Mc.H.useFormState(e,t,n)};Jn.useFormStatus=function(){return Mc.H.useHostTransitionStatus()};Jn.version="19.3.1"});var Ky=Na((vP,Jy)=>{"use strict";function Zy(){if(!(typeof __REACT_DEVTOOLS_GLOBAL_HOOK__>"u"||typeof __REACT_DEVTOOLS_GLOBAL_HOOK__.checkDCE!="function"))try{__REACT_DEVTOOLS_GLOBAL_HOOK__.checkDCE(Zy)}catch(e){console.error(e)}}Zy(),Jy.exports=Yy()});var PM=Na(id=>{"use strict";var Tn=Dy(),O1=vi(),fA=Ky();function St(e){var t="https://react.dev/errors/"+e;if(1<arguments.length){t+="?args[]="+encodeURIComponent(arguments[1]);for(var n=2;n<arguments.length;n++)t+="&args[]="+encodeURIComponent(arguments[n])}return"Minified React error #"+e+"; visit "+t+" for the full message or use the non-minified dev environment for full errors and additional helpful warnings."}function P1(e){return!(!e||e.nodeType!==1&&e.nodeType!==9&&e.nodeType!==11)}function uu(e){for(var t=e,n=t;n&&!n.alternate;)t=n,(t.flags&4098)!==0&&(e=t.return),n=t.return;for(;t.return;)t=t.return;return t.tag===3?e:null}function z1(e){if(e.tag===13){var t=e.memoizedState;if(t===null&&(e=e.alternate,e!==null&&(t=e.memoizedState)),t!==null)return t.dehydrated}return null}function F1(e){if(e.tag===31){var t=e.memoizedState;if(t===null&&(e=e.alternate,e!==null&&(t=e.memoizedState)),t!==null)return t.dehydrated}return null}function jy(e){if(uu(e)!==e)throw Error(St(188))}function hA(e){var t=e.alternate;if(!t){if(t=uu(e),t===null)throw Error(St(188));return t!==e?null:e}for(var n=e,i=t;;){var a=n.return;if(a===null)break;var r=a.alternate;if(r===null){if(i=a.return,i!==null){n=i;continue}break}if(a.child===r.child){for(r=a.child;r;){if(r===n)return jy(a),e;if(r===i)return jy(a),t;r=r.sibling}throw Error(St(188))}if(n.return!==i.return)n=a,i=r;else{for(var s=!1,l=a.child;l;){if(l===n){s=!0,n=a,i=r;break}if(l===i){s=!0,i=a,n=r;break}l=l.sibling}if(!s){for(l=r.child;l;){if(l===n){s=!0,n=r,i=a;break}if(l===i){s=!0,i=r,n=a;break}l=l.sibling}if(!s)throw Error(St(189))}}if(n.alternate!==i)throw Error(St(190))}if(n.tag!==3)throw Error(St(188));return n.stateNode.current===n?e:t}function B1(e){var t=e.tag;if(t===5||t===26||t===27||t===6)return e;for(e=e.child;e!==null;){if(t=B1(e),t!==null)return t;e=e.sibling}return null}function Mi(e,t,n,i,a,r){for(;e!==null;){if((e.tag===5||e.tag===27||e.tag===6)&&n(e,i,a,r)||(e.tag!==22||e.memoizedState===null)&&(t||e.tag!==5&&e.tag!==27)&&Mi(e.child,t,n,i,a,r))return!0;e=e.sibling}return!1}function ao(e){for(e=e.return;e!==null;){if(e.tag===3||e.tag===5||e.tag===27)return e;e=e.return}return null}function Qy(e){var t=!1;for(e=e.return;e!==null&&(e.tag===4&&(t=!0),!(e.tag===3||e.tag===5||e.tag===27));)e=e.return;return t}function H1(e){var t=[null,null],n=ao(e);return n===null||G1(t,e,n.child,{foundSelf:!1}),t}function G1(e,t,n,i){for(;n!==null;){if(n===t)i.foundSelf=!0;else if(n.tag===5||n.tag===27||n.tag===6){if(i.foundSelf)return e[1]=n,!0;e[0]=n}else if((n.tag!==22||n.memoizedState===null)&&G1(e,t,n.child,i))return!0;n=n.sibling}return!1}function En(e){switch(e.tag){case 5:case 27:case 6:return e.stateNode;case 3:return e.stateNode.containerInfo;default:throw Error(St(559))}}var Ho=null,c0=null;function dA(e,t,n){return e===n?!0:e===t?(Ho=e,!0):!1}function pA(e,t,n){return e===n?(c0=e,!1):e===t?(c0!==null&&(Ho=e),!0):!1}function $y(e){if(e===null)return null;do e=e===null?null:e.return;while(e&&e.tag!==5&&e.tag!==27&&e.tag!==3);return e||null}function u0(e,t,n){for(var i=0,a=e;a;a=n(a))i++;a=0;for(var r=t;r;r=n(r))a++;for(;0<i-a;)e=n(e),i--;for(;0<a-i;)t=n(t),a--;for(;i--;){if(e===t||t!==null&&e===t.alternate)return e;e=n(e),t=n(t)}return null}var Je=Object.assign,mA=Symbol.for("react.element"),Mf=Symbol.for("react.transitional.element"),Dc=Symbol.for("react.portal"),Go=Symbol.for("react.fragment"),V1=Symbol.for("react.strict_mode"),f0=Symbol.for("react.profiler"),k1=Symbol.for("react.consumer"),Fa=Symbol.for("react.context"),_g=Symbol.for("react.forward_ref"),h0=Symbol.for("react.suspense"),d0=Symbol.for("react.suspense_list"),bg=Symbol.for("react.memo"),kr=Symbol.for("react.lazy"),p0=Symbol.for("react.activity"),gA=Symbol.for("react.legacy_hidden"),vA=Symbol.for("react.memo_cache_sentinel"),m0=Symbol.for("react.view_transition"),xA=Symbol.for("react.recoverable"),t_=Symbol.iterator;function Ec(e){return e===null||typeof e!="object"?null:(e=t_&&e[t_]||e["@@iterator"],typeof e=="function"?e:null)}var yA=Symbol.for("react.client.reference");function g0(e){if(e==null)return null;if(typeof e=="function")return e.$$typeof===yA?null:e.displayName||e.name||null;if(typeof e=="string")return e;switch(e){case Go:return"Fragment";case f0:return"Profiler";case V1:return"StrictMode";case h0:return"Suspense";case d0:return"SuspenseList";case p0:return"Activity";case m0:return"ViewTransition"}if(typeof e=="object")switch(e.$$typeof){case Dc:return"Portal";case Fa:return e.displayName||"Context";case k1:return(e._context.displayName||"Context")+".Consumer";case _g:var t=e.render;return e=e.displayName,e||(e=t.displayName||t.name||"",e=e!==""?"ForwardRef("+e+")":"ForwardRef"),e;case bg:return t=e.displayName||null,t!==null?t:g0(e.type)||"Memo";case kr:t=e._payload,e=e._init;try{return g0(e(t))}catch{}}return null}var Nc=Array.isArray,fe=O1.__CLIENT_INTERNALS_DO_NOT_USE_OR_WARN_USERS_THEY_CANNOT_UPGRADE,Fe=fA.__DOM_INTERNALS_DO_NOT_USE_OR_WARN_USERS_THEY_CANNOT_UPGRADE,Ws={pending:!1,data:null,method:null,action:null},v0=[],Vo=-1;function Wa(e){return{current:e}}function Gn(e){0>Vo||(e.current=v0[Vo],v0[Vo]=null,Vo--)}function $e(e,t){Vo++,v0[Vo]=e.current,e.current=t}var Va=Wa(null),Zc=Wa(null),Qr=Wa(null),ch=Wa(null);function uh(e,t){switch($e(Qr,t),$e(Zc,e),$e(Va,null),t.nodeType){case 9:case 11:e=(e=t.documentElement)&&(e=e.namespaceURI)?p1(e):0;break;default:if(e=t.tagName,t=t.namespaceURI)t=p1(t),e=fM(t,e);else switch(e){case"svg":e=1;break;case"math":e=2;break;default:e=0}}Gn(Va),$e(Va,e)}function ll(){Gn(Va),Gn(Zc),Gn(Qr)}function x0(e){var t=e.memoizedState;t!==null&&(xl._currentValue=t.memoizedState,$e(ch,e)),t=Va.current;var n=fM(t,e.type);t!==n&&($e(Zc,e),$e(Va,n))}function fh(e){Zc.current===e&&(Gn(Va),Gn(Zc)),ch.current===e&&(Gn(ch),xl._currentValue=Ws)}var Lm,e_;function Gr(e){if(Lm===void 0)try{throw Error()}catch(n){var t=n.stack.trim().match(/\n( *(at )?)/);Lm=t&&t[1]||"",e_=-1<n.stack.indexOf(`
    at`)?" (<anonymous>)":-1<n.stack.indexOf("@")?"@unknown:0:0":""}return`
`+Lm+e+e_}var Um=!1;function Im(e,t){if(!e||Um)return"";Um=!0;var n=Error.prepareStackTrace;Error.prepareStackTrace=void 0;try{var i={DetermineComponentFrameRoot:function(){try{if(t){var p=function(){throw Error()};if(Object.defineProperty(p.prototype,"props",{set:function(){throw Error()}}),typeof Reflect=="object"&&Reflect.construct){try{Reflect.construct(p,[])}catch(g){var f=g}Reflect.construct(e,[],p)}else{try{p.call()}catch(g){f=g}p=!1;try{var h=Object.getOwnPropertyDescriptor(e.prototype,"props");Object.defineProperty(e.prototype,"props",{configurable:!0,set:function(){throw Error()}}),p=!0,new e}finally{p&&(h!==void 0?Object.defineProperty(e.prototype,"props",h):delete e.prototype.props)}}}else{try{throw Error()}catch(g){f=g}(p=e())&&typeof p.catch=="function"&&p.catch(function(){})}}catch(g){if(g&&f&&typeof g.stack=="string")return[g.stack,f.stack]}return[null,null]}};i.DetermineComponentFrameRoot.displayName="DetermineComponentFrameRoot";var a=Object.getOwnPropertyDescriptor(i.DetermineComponentFrameRoot,"name");a&&a.configurable&&Object.defineProperty(i.DetermineComponentFrameRoot,"name",{value:"DetermineComponentFrameRoot"});var r=i.DetermineComponentFrameRoot(),s=r[0],l=r[1];if(s&&l){var o=s.split(`
`),c=l.split(`
`);for(a=i=0;i<o.length&&!o[i].includes("DetermineComponentFrameRoot");)i++;for(;a<c.length&&!c[a].includes("DetermineComponentFrameRoot");)a++;if(i===o.length||a===c.length)for(i=o.length-1,a=c.length-1;1<=i&&0<=a&&o[i]!==c[a];)a--;for(;1<=i&&0<=a;i--,a--)if(o[i]!==c[a]){if(i!==1||a!==1)do if(i--,a--,0>a||o[i]!==c[a]){var u=`
`+o[i].replace(" at new "," at ");return e.displayName&&u.includes("<anonymous>")&&(u=u.replace("<anonymous>",e.displayName)),u}while(1<=i&&0<=a);break}}}finally{Um=!1,Error.prepareStackTrace=n}return(n=e?e.displayName||e.name:"")?Gr(n):""}function _A(e,t){switch(e.tag){case 26:case 27:case 5:return Gr(e.type);case 16:return Gr("Lazy");case 13:return e.child!==t&&t!==null?Gr("Suspense Fallback"):Gr("Suspense");case 19:return Gr("SuspenseList");case 0:case 15:return Im(e.type,!1);case 11:return Im(e.type.render,!1);case 1:return Im(e.type,!0);case 31:return Gr("Activity");case 30:return Gr("ViewTransition");default:return""}}function n_(e){try{var t="",n=null;do t+=_A(e,n),n=e,e=e.return;while(e);return t}catch(i){return`
Error generating stack: `+i.message+`
`+i.stack}}var y0=Object.prototype.hasOwnProperty,Sg=Tn.unstable_scheduleCallback,Om=Tn.unstable_cancelCallback,bA=Tn.unstable_shouldYield,SA=Tn.unstable_requestPaint,Ii=Tn.unstable_now,MA=Tn.unstable_getCurrentPriorityLevel,X1=Tn.unstable_ImmediatePriority,W1=Tn.unstable_UserBlockingPriority,hh=Tn.unstable_NormalPriority,EA=Tn.unstable_LowPriority,q1=Tn.unstable_IdlePriority,TA=Tn.log,wA=Tn.unstable_setDisableYieldValue,fu=null,Oi=null;function qr(e){if(typeof TA=="function"&&wA(e),Oi&&typeof Oi.setStrictMode=="function")try{Oi.setStrictMode(fu,e)}catch{}}var Pi=Math.clz32?Math.clz32:CA,AA=Math.log,RA=Math.LN2;function CA(e){return e>>>=0,e===0?32:31-(AA(e)/RA|0)|0}var Ef=256,Tf=262144,wf=4194304;function Hs(e){var t=e&42;if(t!==0)return t;switch(e&-e){case 1:return 1;case 2:return 2;case 4:return 4;case 8:return 8;case 16:return 16;case 32:return 32;case 64:return 64;case 128:return 128;case 256:case 512:case 1024:case 2048:case 4096:case 8192:case 16384:case 32768:case 65536:case 131072:return e&-e;case 262144:case 524288:case 1048576:case 2097152:return e&3932160;case 4194304:case 8388608:case 16777216:case 33554432:return e&62914560;case 67108864:return 67108864;case 134217728:return 134217728;case 268435456:return 268435456;case 536870912:return 536870912;case 1073741824:return 0;default:return e}}function Fh(e,t,n){var i=e.pendingLanes;if(i===0)return 0;var a=0,r=e.suspendedLanes,s=e.pingedLanes;e=e.warmLanes;var l=i&134217727;return l!==0?(i=l&~r,i!==0?a=Hs(i):(s&=l,s!==0?a=Hs(s):n||(n=l&~e,n!==0&&(a=Hs(n))))):(l=i&~r,l!==0?a=Hs(l):s!==0?a=Hs(s):n||(n=i&~e,n!==0&&(a=Hs(n)))),a===0?0:t!==0&&t!==a&&(t&r)===0&&(r=a&-a,n=t&-t,r>=n||r===32&&(n&4194048)!==0)?t:a}function hu(e,t){return(e.pendingLanes&~(e.suspendedLanes&~e.pingedLanes)&t)===0}function Y1(e,t){(t&8)!==0&&(t|=t&32);var n=e.entangledLanes;if(n!==0)for(e=e.entanglements,n&=t;0<n;){var i=31-Pi(n),a=1<<i;t|=e[i],n&=~a}return t}function DA(e,t){switch(e){case 1:case 2:case 4:case 8:case 64:return t+250;case 16:case 32:case 128:case 256:case 512:case 1024:case 2048:case 4096:case 8192:case 16384:case 32768:case 65536:case 131072:case 262144:case 524288:case 1048576:case 2097152:return t+5e3;case 4194304:case 8388608:case 16777216:case 33554432:return-1;case 67108864:case 134217728:case 268435456:case 536870912:case 1073741824:return-1;default:return-1}}function Z1(){var e=wf;return wf<<=1,(wf&62914560)===0&&(wf=4194304),e}function Pm(e){for(var t=[],n=0;31>n;n++)t.push(e);return t}function du(e,t){e.pendingLanes|=t,t!==268435456&&(e.suspendedLanes=0,e.pingedLanes=0,e.warmLanes=0)}function NA(e,t,n,i,a,r){var s=e.pendingLanes;e.pendingLanes=n,e.suspendedLanes=0,e.pingedLanes=0,e.warmLanes=0,e.expiredLanes&=n,e.entangledLanes&=n,e.errorRecoveryDisabledLanes&=n,e.shellSuspendCounter=0;var l=e.entanglements,o=e.expirationTimes,c=e.hiddenUpdates;for(n=s&~n;0<n;){var u=31-Pi(n),p=1<<u;l[u]=0,o[u]=-1;var f=c[u];if(f!==null)for(c[u]=null,u=0;u<f.length;u++){var h=f[u];h!==null&&(h.lane&=-536870913)}n&=~p}i!==0&&J1(e,i,0),r!==0&&a===0&&e.tag!==0&&(e.suspendedLanes|=r&~(s&~t))}function J1(e,t,n){e.pendingLanes|=t,e.suspendedLanes&=~t;var i=31-Pi(t);e.entangledLanes|=t,e.entanglements[i]=e.entanglements[i]|1073741824|n&261930}function K1(e,t){var n=e.entangledLanes|=t;for(e=e.entanglements;n;){var i=31-Pi(n),a=1<<i;a&t|e[i]&t&&(e[i]|=t),n&=~a}}function j1(e,t){var n=t&-t;return n=(n&42)!==0?1:Mg(n),(n&(e.suspendedLanes|t))!==0?0:n}function Mg(e){switch(e){case 2:e=1;break;case 8:e=4;break;case 32:e=16;break;case 256:case 512:case 1024:case 2048:case 4096:case 8192:case 16384:case 32768:case 65536:case 131072:case 262144:case 524288:case 1048576:case 2097152:case 4194304:case 8388608:case 16777216:case 33554432:e=128;break;case 268435456:e=134217728;break;default:e=0}return e}function Eg(e){return e&=-e,2<e?8<e?(e&134217727)!==0?32:268435456:8:2}function Q1(){var e=Fe.p;return e!==0?e:(e=window.event,e===void 0?32:UM(e.type))}function i_(e,t){var n=Fe.p;try{return Fe.p=e,t()}finally{Fe.p=n}}var br=Math.random().toString(36).slice(2),Bn="__reactFiber$"+br,Ei="__reactProps$"+br,bl="__reactContainer$"+br,a_="__reactEvents$"+br,LA="__reactListeners$"+br,UA="__reactHandles$"+br,r_="__reactResources$"+br,pu="__reactMarker$"+br,dh="__reactLoad$"+br;function Bh(e){delete e[Bn],delete e[Ei],delete e[LA],delete e[UA]}function ks(e){var t;if(t=e[Bn])return t;for(var n=e.parentNode;n;){if(t=n[bl]||n[Bn]){if(n=t.alternate,t.child!==null||n!==null&&n.child!==null)for(e=S1(e);e!==null;){if(n=e[Bn])return n;e=S1(e)}return t}e=n,n=e.parentNode}return null}function Sl(e){if(e=e[Bn]||e[bl]){var t=e.tag;if(t===5||t===6||t===13||t===31||t===26||t===27||t===3)return e}return null}function Lc(e){var t=e.tag;if(t===5||t===26||t===27||t===6)return e.stateNode;throw Error(St(33))}function Qo(e){var t=e[r_];return t||(t=e[r_]={hoistableStyles:new Map,hoistableScripts:new Map}),t}function Nn(e){e[pu]=!0}function $1(e){e[dh]=void 0}var tb=new Set,eb={};function ro(e,t){cl(e,t),cl(e+"Capture",t)}function cl(e,t){for(eb[e]=t,e=0;e<t.length;e++)tb.add(t[e])}var IA=RegExp("^[:A-Z_a-z\\u00C0-\\u00D6\\u00D8-\\u00F6\\u00F8-\\u02FF\\u0370-\\u037D\\u037F-\\u1FFF\\u200C-\\u200D\\u2070-\\u218F\\u2C00-\\u2FEF\\u3001-\\uD7FF\\uF900-\\uFDCF\\uFDF0-\\uFFFD][:A-Z_a-z\\u00C0-\\u00D6\\u00D8-\\u00F6\\u00F8-\\u02FF\\u0370-\\u037D\\u037F-\\u1FFF\\u200C-\\u200D\\u2070-\\u218F\\u2C00-\\u2FEF\\u3001-\\uD7FF\\uF900-\\uFDCF\\uFDF0-\\uFFFD\\-.0-9\\u00B7\\u0300-\\u036F\\u203F-\\u2040]*$"),s_={},o_={};function OA(e){return y0.call(o_,e)?!0:y0.call(s_,e)?!1:IA.test(e)?o_[e]=!0:(s_[e]=!0,!1)}var Oe=!1;function l_(){var e=Oe;return Oe=!1,e}function Xf(e,t,n){if(OA(t))if(n===null)e.removeAttribute(t);else{switch(typeof n){case"undefined":case"function":case"symbol":e.removeAttribute(t);return;case"boolean":var i=t.toLowerCase().slice(0,5);if(i!=="data-"&&i!=="aria-"){e.removeAttribute(t);return}}e.setAttribute(t,n)}}function Af(e,t,n){if(n===null)e.removeAttribute(t);else{switch(typeof n){case"undefined":case"function":case"symbol":case"boolean":e.removeAttribute(t);return}e.setAttribute(t,n)}}function cr(e,t,n,i){if(i===null)e.removeAttribute(n);else{switch(typeof i){case"undefined":case"function":case"symbol":case"boolean":e.removeAttribute(n);return}e.setAttributeNS(t,n,i)}}function Di(e){switch(typeof e){case"bigint":case"boolean":case"number":case"string":case"undefined":return e;case"object":return e;default:return""}}function nb(e){var t=e.type;return(e=e.nodeName)&&e.toLowerCase()==="input"&&(t==="checkbox"||t==="radio")}function PA(e,t,n){var i=Object.getOwnPropertyDescriptor(e.constructor.prototype,t);if(!e.hasOwnProperty(t)&&typeof i<"u"&&typeof i.get=="function"&&typeof i.set=="function"){var a=i.get,r=i.set;return Object.defineProperty(e,t,{configurable:!0,get:function(){return a.call(this)},set:function(s){n=""+s,r.call(this,s)}}),Object.defineProperty(e,t,{enumerable:i.enumerable}),{getValue:function(){return n},setValue:function(s){n=""+s},stopTracking:function(){e._valueTracker=null,delete e[t]}}}}function _0(e){if(!e._valueTracker){var t=nb(e)?"checked":"value";e._valueTracker=PA(e,t,""+e[t])}}function ib(e){if(!e)return!1;var t=e._valueTracker;if(!t)return!0;var n=t.getValue(),i="";return e&&(i=nb(e)?e.checked?"true":"false":e.value),e=i,e!==n?(t.setValue(e),!0):!1}var zA=/[\n"\\]/g;function na(e){return e.replace(zA,function(t){return"\\"+t.charCodeAt(0).toString(16)+" "})}function b0(e,t,n,i,a,r,s,l){e.name="",s!=null&&typeof s!="function"&&typeof s!="symbol"&&typeof s!="boolean"?e.type=s:e.removeAttribute("type"),t!=null?s==="number"?(t===0&&e.value===""||e.value!=t)&&(e.value=""+Di(t)):e.value!==""+Di(t)&&(e.value=""+Di(t)):s!=="submit"&&s!=="reset"||e.removeAttribute("value"),t!=null?s==="number"&&e.value==t?zm(e,Di(e.value)):zm(e,Di(t)):n!=null?zm(e,Di(n)):i!=null&&e.removeAttribute("value"),a==null&&r!=null&&(e.defaultChecked=!!r),a!=null&&(e.checked=a&&typeof a!="function"&&typeof a!="symbol"),l!=null&&typeof l!="function"&&typeof l!="symbol"&&typeof l!="boolean"?e.name=""+Di(l):e.removeAttribute("name")}function ab(e,t,n,i,a,r,s,l){if(r!=null&&typeof r!="function"&&typeof r!="symbol"&&typeof r!="boolean"&&(e.type=r),t!=null||n!=null){if(!(r!=="submit"&&r!=="reset"||t!=null)){_0(e);return}n=n!=null?""+Di(n):"",t=t!=null?""+Di(t):n,l||t===e.value||(e.value=t),e.defaultValue=t}i=i??a,i=typeof i!="function"&&typeof i!="symbol"&&!!i,e.checked=l?e.checked:!!i,e.defaultChecked=!!i,s!=null&&typeof s!="function"&&typeof s!="symbol"&&typeof s!="boolean"&&(e.name=s),_0(e)}function zm(e,t){e.defaultValue!==""+t&&(e.defaultValue=""+t)}function $o(e,t,n,i){if(e=e.options,t){t={};for(var a=0;a<n.length;a++)t["$"+n[a]]=!0;for(n=0;n<e.length;n++)a=t.hasOwnProperty("$"+e[n].value),e[n].selected!==a&&(e[n].selected=a),a&&i&&(e[n].defaultSelected=!0)}else{for(n=""+Di(n),t=null,a=0;a<e.length;a++){if(e[a].value===n){e[a].selected=!0,i&&(e[a].defaultSelected=!0);return}t!==null||e[a].disabled||(t=e[a])}t!==null&&(t.selected=!0)}}function rb(e,t,n){if(t!=null&&(t=""+Di(t),t!==e.value&&(e.value=t),n==null)){e.defaultValue!==t&&(e.defaultValue=t);return}e.defaultValue=n!=null?""+Di(n):""}function sb(e,t,n,i){if(t==null){if(i!=null){if(n!=null)throw Error(St(92));if(Nc(i)){if(1<i.length)throw Error(St(93));i=i[0]}n=i}n==null&&(n=""),t=n}n=Di(t),e.defaultValue=n,i=e.textContent,i===n&&i!==""&&i!==null&&(e.value=i),_0(e)}function ul(e,t){if(t){var n=e.firstChild;if(n&&n===e.lastChild&&n.nodeType===3){n.nodeValue=t;return}}e.textContent=t}var FA=new Set("animationIterationCount aspectRatio borderImageOutset borderImageSlice borderImageWidth boxFlex boxFlexGroup boxOrdinalGroup columnCount columns flex flexGrow flexPositive flexShrink flexNegative flexOrder gridArea gridRow gridRowEnd gridRowSpan gridRowStart gridColumn gridColumnEnd gridColumnSpan gridColumnStart fontWeight lineClamp lineHeight opacity order orphans scale tabSize widows zIndex zoom fillOpacity floodOpacity stopOpacity strokeDasharray strokeDashoffset strokeMiterlimit strokeOpacity strokeWidth MozAnimationIterationCount MozBoxFlex MozBoxFlexGroup MozLineClamp msAnimationIterationCount msFlex msZoom msFlexGrow msFlexNegative msFlexOrder msFlexPositive msFlexShrink msGridColumn msGridColumnSpan msGridRow msGridRowSpan WebkitAnimationIterationCount WebkitBoxFlex WebKitBoxFlexGroup WebkitBoxOrdinalGroup WebkitColumnCount WebkitColumns WebkitFlex WebkitFlexGrow WebkitFlexPositive WebkitFlexShrink WebkitLineClamp".split(" "));function c_(e,t,n){var i=t.indexOf("--")===0;n==null||typeof n=="boolean"||n===""?i?e.setProperty(t,""):t==="float"?e.cssFloat="":e[t]="":i?e.setProperty(t,n):typeof n!="number"||n===0||FA.has(t)?t==="float"?e.cssFloat=n:e[t]=(""+n).trim():e[t]=n+"px"}function ob(e,t,n){if(t!=null&&typeof t!="object")throw Error(St(62));if(e=e.style,n!=null){for(var i in n)!n.hasOwnProperty(i)||t!=null&&t.hasOwnProperty(i)||(i.indexOf("--")===0?e.setProperty(i,""):i==="float"?e.cssFloat="":e[i]="",Oe=!0);for(var a in t)i=t[a],t.hasOwnProperty(a)&&n[a]!==i&&(c_(e,a,i),Oe=!0)}else for(var r in t)t.hasOwnProperty(r)&&c_(e,r,t[r])}function Tg(e){if(e.indexOf("-")===-1)return!1;switch(e){case"annotation-xml":case"color-profile":case"font-face":case"font-face-src":case"font-face-uri":case"font-face-format":case"font-face-name":case"missing-glyph":return!1;default:return!0}}var BA=new Map([["acceptCharset","accept-charset"],["htmlFor","for"],["httpEquiv","http-equiv"],["crossOrigin","crossorigin"],["accentHeight","accent-height"],["alignmentBaseline","alignment-baseline"],["arabicForm","arabic-form"],["baselineShift","baseline-shift"],["capHeight","cap-height"],["clipPath","clip-path"],["clipRule","clip-rule"],["colorInterpolation","color-interpolation"],["colorInterpolationFilters","color-interpolation-filters"],["colorProfile","color-profile"],["colorRendering","color-rendering"],["dominantBaseline","dominant-baseline"],["enableBackground","enable-background"],["fillOpacity","fill-opacity"],["fillRule","fill-rule"],["floodColor","flood-color"],["floodOpacity","flood-opacity"],["fontFamily","font-family"],["fontSize","font-size"],["fontSizeAdjust","font-size-adjust"],["fontStretch","font-stretch"],["fontStyle","font-style"],["fontVariant","font-variant"],["fontWeight","font-weight"],["glyphName","glyph-name"],["glyphOrientationHorizontal","glyph-orientation-horizontal"],["glyphOrientationVertical","glyph-orientation-vertical"],["horizAdvX","horiz-adv-x"],["horizOriginX","horiz-origin-x"],["imageRendering","image-rendering"],["letterSpacing","letter-spacing"],["lightingColor","lighting-color"],["markerEnd","marker-end"],["markerMid","marker-mid"],["markerStart","marker-start"],["maskType","mask-type"],["overlinePosition","overline-position"],["overlineThickness","overline-thickness"],["paintOrder","paint-order"],["panose-1","panose-1"],["pointerEvents","pointer-events"],["renderingIntent","rendering-intent"],["shapeRendering","shape-rendering"],["stopColor","stop-color"],["stopOpacity","stop-opacity"],["strikethroughPosition","strikethrough-position"],["strikethroughThickness","strikethrough-thickness"],["strokeDasharray","stroke-dasharray"],["strokeDashoffset","stroke-dashoffset"],["strokeLinecap","stroke-linecap"],["strokeLinejoin","stroke-linejoin"],["strokeMiterlimit","stroke-miterlimit"],["strokeOpacity","stroke-opacity"],["strokeWidth","stroke-width"],["textAnchor","text-anchor"],["textDecoration","text-decoration"],["textRendering","text-rendering"],["transformOrigin","transform-origin"],["underlinePosition","underline-position"],["underlineThickness","underline-thickness"],["unicodeBidi","unicode-bidi"],["unicodeRange","unicode-range"],["unitsPerEm","units-per-em"],["vAlphabetic","v-alphabetic"],["vHanging","v-hanging"],["vIdeographic","v-ideographic"],["vMathematical","v-mathematical"],["vectorEffect","vector-effect"],["vertAdvY","vert-adv-y"],["vertOriginX","vert-origin-x"],["vertOriginY","vert-origin-y"],["wordSpacing","word-spacing"],["writingMode","writing-mode"],["xmlnsXlink","xmlns:xlink"],["xHeight","x-height"]]),HA=/^[\u0000-\u001F ]*j[\r\n\t]*a[\r\n\t]*v[\r\n\t]*a[\r\n\t]*s[\r\n\t]*c[\r\n\t]*r[\r\n\t]*i[\r\n\t]*p[\r\n\t]*t[\r\n\t]*:/i;function Wf(e){return HA.test(""+e)?"javascript:throw new Error('React has blocked a javascript: URL as a security precaution.')":e}function Ba(){}var S0=null;function wg(e){return e=e.target||e.srcElement||window,e.correspondingUseElement&&(e=e.correspondingUseElement),e.nodeType===3?e.parentNode:e}var ko=null,tl=null;function u_(e){var t=Sl(e);if(t&&(e=t.stateNode)){var n=e[Ei]||null;t:switch(e=t.stateNode,t.type){case"input":if(b0(e,n.value,n.defaultValue,n.defaultValue,n.checked,n.defaultChecked,n.type,n.name),t=n.name,n.type==="radio"&&t!=null){for(n=e;n.parentNode;)n=n.parentNode;for(n=n.querySelectorAll('input[name="'+na(""+t)+'"][type="radio"]'),t=0;t<n.length;t++){var i=n[t];if(i!==e&&i.form===e.form){var a=i[Ei]||null;if(!a)throw Error(St(90));b0(i,a.value,a.defaultValue,a.defaultValue,a.checked,a.defaultChecked,a.type,a.name)}}for(t=0;t<n.length;t++)i=n[t],i.form===e.form&&ib(i)}break t;case"textarea":rb(e,n.value,n.defaultValue);break t;case"select":t=n.value,t!=null&&$o(e,!!n.multiple,t,!1)}}}var Fm=!1;function lb(e,t,n){if(Fm)return e(t,n);Fm=!0;try{var i=e(t);return i}finally{if(Fm=!1,(ko!==null||tl!==null)&&($h(),ko&&(t=ko,e=tl,tl=ko=null,u_(t),e)))for(t=0;t<e.length;t++)u_(e[t])}}function Jc(e,t){var n=e.stateNode;if(n===null)return null;var i=n[Ei]||null;if(i===null)return null;n=i[t];t:switch(t){case"onClick":case"onClickCapture":case"onDoubleClick":case"onDoubleClickCapture":case"onMouseDown":case"onMouseDownCapture":case"onMouseMove":case"onMouseMoveCapture":case"onMouseUp":case"onMouseUpCapture":case"onMouseEnter":(i=!i.disabled)||(e=e.type,i=!(e==="button"||e==="input"||e==="select"||e==="textarea")),e=!i;break t;default:e=!1}if(e)return null;if(n&&typeof n!="function")throw Error(St(231,t,typeof n));return n}var mr=!(typeof window>"u"||typeof window.document>"u"||typeof window.document.createElement>"u"),M0=!1;if(mr)try{Io={},Object.defineProperty(Io,"passive",{get:function(){M0=!0}}),window.addEventListener("test",Io,Io),window.removeEventListener("test",Io,Io)}catch{M0=!1}var Io,Yr=null,Ag=null,qf=null;function cb(){if(qf)return qf;var e,t=Ag,n=t.length,i,a="value"in Yr?Yr.value:Yr.textContent,r=a.length;for(e=0;e<n&&t[e]===a[e];e++);var s=n-e;for(i=1;i<=s&&t[n-i]===a[r-i];i++);return qf=a.slice(e,1<i?1-i:void 0)}function Yf(e){var t=e.keyCode;return"charCode"in e?(e=e.charCode,e===0&&t===13&&(e=13)):e=t,e===10&&(e=13),32<=e||e===13?e:0}function Rf(){return!0}function f_(){return!1}function oi(e){function t(n,i,a,r,s){this._reactName=n,this._targetInst=a,this.type=i,this.nativeEvent=r,this.target=s,this.currentTarget=null;for(var l in e)e.hasOwnProperty(l)&&(n=e[l],this[l]=n?n(r):r[l]);return this.isDefaultPrevented=(r.defaultPrevented!=null?r.defaultPrevented:r.returnValue===!1)?Rf:f_,this.isPropagationStopped=f_,this}return Je(t.prototype,{preventDefault:function(){this.defaultPrevented=!0;var n=this.nativeEvent;n&&(n.preventDefault?n.preventDefault():typeof n.returnValue!="unknown"&&(n.returnValue=!1),this.isDefaultPrevented=Rf)},stopPropagation:function(){var n=this.nativeEvent;n&&(n.stopPropagation?n.stopPropagation():typeof n.cancelBubble!="unknown"&&(n.cancelBubble=!0),this.isPropagationStopped=Rf)},persist:function(){},isPersistent:Rf}),t}var ds={eventPhase:0,bubbles:0,cancelable:0,timeStamp:function(e){return e.timeStamp||Date.now()},defaultPrevented:0,isTrusted:0},Hh=oi(ds),mu=Je({},ds,{view:0,detail:0}),GA=oi(mu),Bm,Hm,Tc,Gh=Je({},mu,{screenX:0,screenY:0,clientX:0,clientY:0,pageX:0,pageY:0,ctrlKey:0,shiftKey:0,altKey:0,metaKey:0,getModifierState:Rg,button:0,buttons:0,relatedTarget:function(e){return e.relatedTarget===void 0?e.fromElement===e.srcElement?e.toElement:e.fromElement:e.relatedTarget},movementX:function(e){return"movementX"in e?e.movementX:(e!==Tc&&(Tc&&e.type==="mousemove"?(Bm=e.screenX-Tc.screenX,Hm=e.screenY-Tc.screenY):Hm=Bm=0,Tc=e),Bm)},movementY:function(e){return"movementY"in e?e.movementY:Hm}}),h_=oi(Gh),VA=Je({},Gh,{dataTransfer:0}),kA=oi(VA),XA=Je({},mu,{relatedTarget:0}),Gm=oi(XA),WA=Je({},ds,{animationName:0,elapsedTime:0,pseudoElement:0}),qA=oi(WA),YA=Je({},ds,{clipboardData:function(e){return"clipboardData"in e?e.clipboardData:window.clipboardData}}),ZA=oi(YA),JA=Je({},ds,{data:0}),d_=oi(JA),KA={Esc:"Escape",Spacebar:" ",Left:"ArrowLeft",Up:"ArrowUp",Right:"ArrowRight",Down:"ArrowDown",Del:"Delete",Win:"OS",Menu:"ContextMenu",Apps:"ContextMenu",Scroll:"ScrollLock",MozPrintableKey:"Unidentified"},jA={8:"Backspace",9:"Tab",12:"Clear",13:"Enter",16:"Shift",17:"Control",18:"Alt",19:"Pause",20:"CapsLock",27:"Escape",32:" ",33:"PageUp",34:"PageDown",35:"End",36:"Home",37:"ArrowLeft",38:"ArrowUp",39:"ArrowRight",40:"ArrowDown",45:"Insert",46:"Delete",112:"F1",113:"F2",114:"F3",115:"F4",116:"F5",117:"F6",118:"F7",119:"F8",120:"F9",121:"F10",122:"F11",123:"F12",144:"NumLock",145:"ScrollLock",224:"Meta"},QA={Alt:"altKey",Control:"ctrlKey",Meta:"metaKey",Shift:"shiftKey"};function $A(e){var t=this.nativeEvent;return t.getModifierState?t.getModifierState(e):(e=QA[e])?!!t[e]:!1}function Rg(){return $A}var t2=Je({},mu,{key:function(e){if(e.key){var t=KA[e.key]||e.key;if(t!=="Unidentified")return t}return e.type==="keypress"?(e=Yf(e),e===13?"Enter":String.fromCharCode(e)):e.type==="keydown"||e.type==="keyup"?jA[e.keyCode]||"Unidentified":""},code:0,location:0,ctrlKey:0,shiftKey:0,altKey:0,metaKey:0,repeat:0,locale:0,getModifierState:Rg,charCode:function(e){return e.type==="keypress"?Yf(e):0},keyCode:function(e){return e.type==="keydown"||e.type==="keyup"?e.keyCode:0},which:function(e){return e.type==="keypress"?Yf(e):e.type==="keydown"||e.type==="keyup"?e.keyCode:0}}),e2=oi(t2),n2=Je({},Gh,{pointerId:0,width:0,height:0,pressure:0,tangentialPressure:0,tiltX:0,tiltY:0,twist:0,pointerType:0,isPrimary:0}),p_=oi(n2),i2=Je({},ds,{submitter:0}),a2=oi(i2),r2=Je({},mu,{touches:0,targetTouches:0,changedTouches:0,altKey:0,metaKey:0,ctrlKey:0,shiftKey:0,getModifierState:Rg}),s2=oi(r2),o2=Je({},ds,{propertyName:0,elapsedTime:0,pseudoElement:0}),l2=oi(o2),c2=Je({},Gh,{deltaX:function(e){return"deltaX"in e?e.deltaX:"wheelDeltaX"in e?-e.wheelDeltaX:0},deltaY:function(e){return"deltaY"in e?e.deltaY:"wheelDeltaY"in e?-e.wheelDeltaY:"wheelDelta"in e?-e.wheelDelta:0},deltaZ:0,deltaMode:0}),u2=oi(c2),f2=Je({},ds,{newState:0,oldState:0,source:0}),h2=oi(f2),d2=[9,13,27,32],Cg=mr&&"CompositionEvent"in window,Oc=null;mr&&"documentMode"in document&&(Oc=document.documentMode);var p2=mr&&"TextEvent"in window&&!Oc,ub=mr&&(!Cg||Oc&&8<Oc&&11>=Oc),m_=" ",g_=!1;function fb(e,t){switch(e){case"keyup":return d2.indexOf(t.keyCode)!==-1;case"keydown":return t.keyCode!==229;case"keypress":case"mousedown":case"focusout":return!0;default:return!1}}function hb(e){return e=e.detail,typeof e=="object"&&"data"in e?e.data:null}var Xo=!1;function m2(e,t){switch(e){case"compositionend":return hb(t);case"keypress":return t.which!==32?null:(g_=!0,m_);case"textInput":return e=t.data,e===m_&&g_?null:e;default:return null}}function g2(e,t){if(Xo)return e==="compositionend"||!Cg&&fb(e,t)?(e=cb(),qf=Ag=Yr=null,Xo=!1,e):null;switch(e){case"paste":return null;case"keypress":if(!(t.ctrlKey||t.altKey||t.metaKey)||t.ctrlKey&&t.altKey){if(t.char&&1<t.char.length)return t.char;if(t.which)return String.fromCharCode(t.which)}return null;case"compositionend":return ub&&t.locale!=="ko"?null:t.data;default:return null}}var v2={color:!0,date:!0,datetime:!0,"datetime-local":!0,email:!0,month:!0,number:!0,password:!0,range:!0,search:!0,tel:!0,text:!0,time:!0,url:!0,week:!0};function v_(e){var t=e&&e.nodeName&&e.nodeName.toLowerCase();return t==="input"?!!v2[e.type]:t==="textarea"}function db(e,t,n,i){ko?tl?tl.push(i):tl=[i]:ko=i,t=Oh(t,"onChange"),0<t.length&&(n=new Hh("onChange","change",null,n,i),e.push({event:n,listeners:t}))}var Pc=null,Kc=null;function x2(e){lM(e,0)}function Vh(e){var t=Lc(e);if(ib(t))return e}function x_(e,t){if(e==="change")return t}var pb=!1;mr&&(mr?(Df="oninput"in document,Df||(Vm=document.createElement("div"),Vm.setAttribute("oninput","return;"),Df=typeof Vm.oninput=="function"),Cf=Df):Cf=!1,pb=Cf&&(!document.documentMode||9<document.documentMode));var Cf,Df,Vm;function y_(){Pc&&(Pc.detachEvent("onpropertychange",mb),Kc=Pc=null)}function mb(e){if(e.propertyName==="value"&&Vh(Kc)){var t=[];db(t,Kc,e,wg(e)),lb(x2,t)}}function y2(e,t,n){e==="focusin"?(y_(),Pc=t,Kc=n,Pc.attachEvent("onpropertychange",mb)):e==="focusout"&&y_()}function _2(e){if(e==="selectionchange"||e==="keyup"||e==="keydown")return Vh(Kc)}function b2(e,t){if(e==="click")return Vh(t)}function S2(e,t){if(e==="input"||e==="change")return Vh(t)}function M2(e,t){return e===t&&(e!==0||1/e===1/t)||e!==e&&t!==t}var Fi=typeof Object.is=="function"?Object.is:M2;function jc(e,t){if(Fi(e,t))return!0;if(typeof e!="object"||e===null||typeof t!="object"||t===null)return!1;var n=Object.keys(e),i=Object.keys(t);if(n.length!==i.length)return!1;for(i=0;i<n.length;i++){var a=n[i];if(!y0.call(t,a)||!Fi(e[a],t[a]))return!1}return!0}function E0(e){if(e=e||(typeof document<"u"?document:void 0),typeof e>"u")return null;try{return e.activeElement||e.body}catch{return e.body}}function __(e){for(;e&&e.firstChild;)e=e.firstChild;return e}function b_(e,t){var n=__(e);e=0;for(var i;n;){if(n.nodeType===3){if(i=e+n.textContent.length,e<=t&&i>=t)return{node:n,offset:t-e};e=i}t:{for(;n;){if(n.nextSibling){n=n.nextSibling;break t}n=n.parentNode}n=void 0}n=__(n)}}function gb(e,t){return e&&t?e===t?!0:e&&e.nodeType===3?!1:t&&t.nodeType===3?gb(e,t.parentNode):"contains"in e?e.contains(t):e.compareDocumentPosition?!!(e.compareDocumentPosition(t)&16):!1:!1}function vb(e){e=e!=null&&e.ownerDocument!=null&&e.ownerDocument.defaultView!=null?e.ownerDocument.defaultView:window;for(var t=E0(e.document);t instanceof e.HTMLIFrameElement;){try{var n=typeof t.contentWindow.location.href=="string"}catch{n=!1}if(n)e=t.contentWindow;else break;t=E0(e.document)}return t}function Dg(e){var t=e&&e.nodeName&&e.nodeName.toLowerCase();return t&&(t==="input"&&(e.type==="text"||e.type==="search"||e.type==="tel"||e.type==="url"||e.type==="password")||t==="textarea"||e.contentEditable==="true")}var E2=mr&&"documentMode"in document&&11>=document.documentMode,Wo=null,T0=null,zc=null,w0=!1;function S_(e,t,n){var i=n.window===n?n.document:n.nodeType===9?n:n.ownerDocument;w0||Wo==null||Wo!==E0(i)||(i=Wo,"selectionStart"in i&&Dg(i)?i={start:i.selectionStart,end:i.selectionEnd}:(i=(i.ownerDocument&&i.ownerDocument.defaultView||window).getSelection(),i={anchorNode:i.anchorNode,anchorOffset:i.anchorOffset,focusNode:i.focusNode,focusOffset:i.focusOffset}),zc&&jc(zc,i)||(zc=i,i=Oh(T0,"onSelect"),0<i.length&&(t=new Hh("onSelect","select",null,t,n),e.push({event:t,listeners:i}),t.target=Wo)))}function Fs(e,t){var n={};return n[e.toLowerCase()]=t.toLowerCase(),n["Webkit"+e]="webkit"+t,n["Moz"+e]="moz"+t,n}var qo={animationend:Fs("Animation","AnimationEnd"),animationiteration:Fs("Animation","AnimationIteration"),animationstart:Fs("Animation","AnimationStart"),transitionrun:Fs("Transition","TransitionRun"),transitionstart:Fs("Transition","TransitionStart"),transitioncancel:Fs("Transition","TransitionCancel"),transitionend:Fs("Transition","TransitionEnd")},km={},xb={};mr&&(xb=document.createElement("div").style,"AnimationEvent"in window||(delete qo.animationend.animation,delete qo.animationiteration.animation,delete qo.animationstart.animation),"TransitionEvent"in window||delete qo.transitionend.transition);function so(e){if(km[e])return km[e];if(!qo[e])return e;var t=qo[e],n;for(n in t)if(t.hasOwnProperty(n)&&n in xb)return km[e]=t[n];return e}var yb=so("animationend"),_b=so("animationiteration"),bb=so("animationstart"),T2=so("transitionrun"),w2=so("transitionstart"),A2=so("transitioncancel"),Sb=so("transitionend"),Mb=new Map,A0="abort auxClick beforeToggle cancel canPlay canPlayThrough click close contextMenu copy cut drag dragEnd dragEnter dragExit dragLeave dragOver dragStart drop durationChange emptied encrypted ended error fullscreenChange fullscreenError gotPointerCapture input invalid keyDown keyPress keyUp load loadedData loadedMetadata loadStart lostPointerCapture mouseDown mouseMove mouseOut mouseOver mouseUp paste pause play playing pointerCancel pointerDown pointerMove pointerOut pointerOver pointerUp progress rateChange reset resize seeked seeking stalled submit suspend timeUpdate touchCancel touchEnd touchStart volumeChange scroll toggle touchMove waiting wheel".split(" ");A0.push("scrollEnd");function va(e,t){Mb.set(e,t),ro(t,[e])}var R2=0;function gr(e,t){if(e.name!=null&&e.name!=="auto")return e.name;if(t.autoName!==null)return t.autoName;e=ga.identifierPrefix;var n=R2++;return e="_"+e+"t_"+n.toString(32)+"_",t.autoName=e}function M_(e){if(e==null||typeof e=="string")return e;var t=null,n=ol;if(n!==null)for(var i=0;i<n.length;i++){var a=e[n[i]];if(a!=null){if(a==="none")return"none";t=t==null?a:t+(" "+a)}}return t??e.default}function Sr(e,t){return e=M_(e),t=M_(t),t==null?e==="auto"?null:e:t==="auto"?null:t}var ph=typeof reportError=="function"?reportError:function(e){if(typeof window=="object"&&typeof window.ErrorEvent=="function"){var t=new window.ErrorEvent("error",{bubbles:!0,cancelable:!0,message:typeof e=="object"&&e!==null&&typeof e.message=="string"?String(e.message):String(e),error:e});if(!window.dispatchEvent(t))return}else if(typeof process=="object"&&typeof process.emit=="function"){process.emit("uncaughtException",e);return}console.error(e)},$i=[],Yo=0,Ng=0;function kh(){for(var e=Yo,t=Ng=Yo=0;t<e;){var n=$i[t];$i[t++]=null;var i=$i[t];$i[t++]=null;var a=$i[t];$i[t++]=null;var r=$i[t];if($i[t++]=null,i!==null&&a!==null){var s=i.pending;s===null?a.next=a:(a.next=s.next,s.next=a),i.pending=a}r!==0&&Eb(n,a,r)}}function Xh(e,t,n,i){$i[Yo++]=e,$i[Yo++]=t,$i[Yo++]=n,$i[Yo++]=i,Ng|=i,e.lanes|=i,e=e.alternate,e!==null&&(e.lanes|=i)}function Lg(e,t,n,i){return Xh(e,t,n,i),mh(e)}function oo(e,t){return Xh(e,null,null,t),mh(e)}function Eb(e,t,n){e.lanes|=n;var i=e.alternate;i!==null&&(i.lanes|=n);for(var a=!1,r=e.return;r!==null;)r.childLanes|=n,i=r.alternate,i!==null&&(i.childLanes|=n),r.tag===22&&(e=r.stateNode,e===null||e._visibility&1||(a=!0)),e=r,r=r.return;return e.tag===3?(r=e.stateNode,a&&t!==null&&(a=31-Pi(n),e=r.hiddenUpdates,i=e[a],i===null?e[a]=[t]:i.push(t),t.lane=n|536870912),r):null}function mh(e){if(50<Yc)throw Yc=0,ih=null,Error(St(185));for(var t=e.return;t!==null;)e=t,t=e.return;return e.tag===3?e.stateNode:null}var Zo={};function C2(e,t,n,i){this.tag=e,this.key=n,this.sibling=this.child=this.return=this.stateNode=this.type=this.elementType=null,this.index=0,this.refCleanup=this.ref=null,this.pendingProps=t,this.dependencies=this.memoizedState=this.updateQueue=this.memoizedProps=null,this.mode=i,this.subtreeFlags=this.flags=0,this.deletions=null,this.childLanes=this.lanes=0,this.alternate=null}function bi(e,t,n,i){return new C2(e,t,n,i)}function Ug(e){return e=e.prototype,!(!e||!e.isReactComponent)}function dr(e,t){var n=e.alternate;return n===null?(n=bi(e.tag,t,e.key,e.mode),n.elementType=e.elementType,n.type=e.type,n.stateNode=e.stateNode,n.alternate=e,e.alternate=n):(n.pendingProps=t,n.type=e.type,n.flags=0,n.subtreeFlags=0,n.deletions=null),n.flags=e.flags&1206910976,n.childLanes=e.childLanes,n.lanes=e.lanes,n.child=e.child,n.memoizedProps=e.memoizedProps,n.memoizedState=e.memoizedState,n.updateQueue=e.updateQueue,t=e.dependencies,n.dependencies=t===null?null:{lanes:t.lanes,firstContext:t.firstContext},n.sibling=e.sibling,n.index=e.index,n.ref=e.ref,n.refCleanup=e.refCleanup,n}function Tb(e,t){e.flags&=1206910978;var n=e.alternate;return n===null?(e.childLanes=0,e.lanes=t,e.child=null,e.subtreeFlags=0,e.memoizedProps=null,e.memoizedState=null,e.updateQueue=null,e.dependencies=null,e.stateNode=null):(e.childLanes=n.childLanes,e.lanes=n.lanes,e.child=n.child,e.subtreeFlags=0,e.deletions=null,e.memoizedProps=n.memoizedProps,e.memoizedState=n.memoizedState,e.updateQueue=n.updateQueue,e.type=n.type,t=n.dependencies,e.dependencies=t===null?null:{lanes:t.lanes,firstContext:t.firstContext}),e}function Zf(e,t,n,i,a,r){var s=0;if(i=e,typeof i=="function")Ug(i)&&(s=1);else if(typeof i=="string")s=eC(e,n,Va.current)?26:e==="html"||e==="head"||e==="body"?27:5;else t:switch(i){case p0:return e=bi(31,n,t,a),e.elementType=p0,e.lanes=r,e;case Go:return qs(n.children,a,r,t);case V1:s=8,a|=24;break;case f0:return e=bi(12,n,t,a|2),e.elementType=f0,e.lanes=r,e;case h0:return e=bi(13,n,t,a),e.elementType=h0,e.lanes=r,e;case d0:return e=bi(19,n,t,a),e.elementType=d0,e.lanes=r,e;case gA:case m0:return e=a|32,e=bi(30,n,t,e),e.elementType=m0,e.lanes=r,e.stateNode={autoName:null,paired:null,clones:null,ref:null},e;default:if(typeof i=="object"&&i!==null)switch(i.$$typeof){case Fa:s=10;break t;case k1:s=9;break t;case _g:s=11;break t;case bg:s=14;break t;case kr:s=16,i=null;break t}s=29,n=Error(St(130,e===null?"null":typeof e,"")),i=null}return t=bi(s,n,t,a),t.elementType=e,t.type=i,t.lanes=r,t}function qs(e,t,n,i){return e=bi(7,e,i,t),e.lanes=n,e}function Xm(e,t,n){return e=bi(6,e,null,t),e.lanes=n,e}function wb(e){var t=bi(18,null,null,0);return t.stateNode=e,t}function Wm(e,t,n){return t=bi(4,e.children!==null?e.children:[],e.key,t),t.lanes=n,t.stateNode={containerInfo:e.containerInfo,pendingChildren:null,implementation:e.implementation},t}var E_=new WeakMap;function ia(e,t){if(typeof e=="object"&&e!==null){var n=E_.get(e);return n!==void 0?n:(t={value:e,source:t,stack:n_(t)},E_.set(e,t),t)}return{value:e,source:t,stack:n_(t)}}var Jo=[],Ko=0,gh=null,Qc=0,ta=[],ea=0,ls=null,Ha=1,Ga="";function fr(e,t){Jo[Ko++]=Qc,Jo[Ko++]=gh,gh=e,Qc=t}function Ab(e,t,n){ta[ea++]=Ha,ta[ea++]=Ga,ta[ea++]=ls,ls=e;var i=Ha;e=Ga;var a=32-Pi(i)-1;i&=~(1<<a),n+=1;var r=32-Pi(t)+a;if(30<r){var s=a-a%5;r=(i&(1<<s)-1).toString(32),i>>=s,a-=s,Ha=1<<32-Pi(t)+a|n<<a|i,Ga=r+e}else Ha=1<<r|n<<a|i,Ga=e}function Wh(e){e.return!==null&&(fr(e,1),Ab(e,1,0))}function Ig(e){for(;e===gh;)gh=Jo[--Ko],Jo[Ko]=null,Qc=Jo[--Ko],Jo[Ko]=null;for(;e===ls;)ls=ta[--ea],ta[ea]=null,Ga=ta[--ea],ta[ea]=null,Ha=ta[--ea],ta[ea]=null}function Rb(e,t){ta[ea++]=Ha,ta[ea++]=Ga,ta[ea++]=ls,Ha=t.id,Ga=t.overflow,ls=e}var Ln=null,Qe=null,Me=!1,$r=null,aa=!1,R0=Error(St(519));function cs(e){var t=Error(St(418,1<arguments.length&&arguments[1]!==void 0&&arguments[1]?"text":"HTML",""));throw $c(ia(t,e)),R0}function T_(e){var t=e.stateNode,n=e.type,i=e.memoizedProps;switch(t[Bn]=e,t[Ei]=i,n){case"dialog":Ae("cancel",t),Ae("close",t);break;case"iframe":case"object":case"embed":Ae("load",t);break;case"video":case"audio":for(n=0;n<iu.length;n++)Ae(iu[n],t);break;case"source":Ae("error",t);break;case"img":case"image":case"link":Ae("error",t),Ae("load",t);break;case"details":Ae("toggle",t);break;case"input":Ae("invalid",t),ab(t,i.value,i.defaultValue,i.checked,i.defaultChecked,i.type,i.name,!0);break;case"select":Ae("invalid",t);break;case"textarea":Ae("invalid",t),sb(t,i.value,i.defaultValue,i.children)}n=i.children,typeof n!="string"&&typeof n!="number"&&typeof n!="bigint"||t.textContent===""+n||i.suppressHydrationWarning===!0||uM(t.textContent,n)?(i.popover!=null&&(Ae("beforetoggle",t),Ae("toggle",t)),i.onScroll!=null&&Ae("scroll",t),i.onScrollEnd!=null&&Ae("scrollend",t),i.onClick!=null&&(t.onclick=Ba),t=!0):t=!1,t||cs(e,!0)}function vh(e){for(Ln=e.return;Ln;)switch(Ln.tag){case 5:case 31:case 13:aa=!1;return;case 27:case 3:aa=!0;return;default:Ln=Ln.return}}function Oo(e){if(e!==Ln)return!1;if(!Me)return vh(e),Me=!0,!1;var t=e.tag,n;if((n=t!==3&&t!==27)&&((n=t===5)&&(n=e.type,n=!(n!=="form"&&n!=="button")||hg(e.type,e.memoizedProps)),n=!n),n&&Qe&&cs(e),vh(e),t===13){if(e=e.memoizedState,e=e!==null?e.dehydrated:null,!e)throw Error(St(317));Qe=b1(e)}else if(t===31){if(e=e.memoizedState,e=e!==null?e.dehydrated:null,!e)throw Error(St(317));Qe=b1(e)}else t===27?(t=Qe,ps(e.type)?(e=gg,gg=null,Qe=e):Qe=t):Qe=Ln?ra(e.stateNode.nextSibling):null;return!0}function Ks(){Qe=Ln=null,Me=!1}function qm(){var e=$r;return e!==null&&(yi===null?yi=e:yi.push.apply(yi,e),$r=null),e}function $c(e){$r===null?$r=[e]:$r.push(e)}var C0=Wa(null),lo=null,hr=null;function Zr(e,t,n){$e(C0,t._currentValue),t._currentValue=n}function pr(e){e._currentValue=C0.current,Gn(C0)}function Jf(e,t,n){for(;e!==null;){var i=e.alternate;if((e.childLanes&t)!==t?(e.childLanes|=t,i!==null&&(i.childLanes|=t)):i!==null&&(i.childLanes&t)!==t&&(i.childLanes|=t),e===n)break;e=e.return}}function D0(e,t,n,i){var a=e.child;for(a!==null&&(a.return=e);a!==null;){var r=a.dependencies;if(r!==null){var s=a.child;r=r.firstContext;t:for(;r!==null;){var l=r;r=a;for(var o=0;o<t.length;o++)if(l.context===t[o]){r.lanes|=n,l=r.alternate,l!==null&&(l.lanes|=n),Jf(r.return,n,e),i||(s=null);break t}r=l.next}}else if(a.tag===18){if(s=a.return,s===null)throw Error(St(341));s.lanes|=n,r=s.alternate,r!==null&&(r.lanes|=n),Jf(s,n,e),s=null}else a.tag===13&&a.memoizedState!==null&&a.memoizedState.dehydrated===null?(a.lanes|=n,s=a.alternate,s!==null&&(s.lanes|=n),Jf(a.return,n,e),s=a.child,s=s!==null?s.sibling:null):s=a.child;if(s!==null)s.return=a;else for(s=a;s!==null;){if(s===e){s=null;break}if(a=s.sibling,a!==null){a.return=s.return,s=a;break}s=s.return}a=s}}function js(e,t,n,i){e=null;for(var a=t,r=!1;a!==null;){if(!r){if((a.flags&524288)!==0)r=!0;else if((a.flags&262144)!==0)break}if(a.tag===10){var s=a.alternate;if(s===null)throw Error(St(387));if(s=s.memoizedProps,s!==null){var l=a.type;Fi(a.pendingProps.value,s.value)||(e!==null?e.push(l):e=[l])}}else if(a===ch.current){if(s=a.alternate,s===null)throw Error(St(387));s.memoizedState.memoizedState!==a.memoizedState.memoizedState&&(e!==null?e.push(xl):e=[xl])}a=a.return}return e!==null&&D0(t,e,n,i),t.flags|=262144,e!==null}function xh(e){for(e=e.firstContext;e!==null;){if(!Fi(e.context._currentValue,e.memoizedValue))return!0;e=e.next}return!1}function Qs(e){lo=e,hr=null,e=e.dependencies,e!==null&&(e.firstContext=null)}function Hn(e){return Cb(lo,e)}function Nf(e,t){return lo===null&&Qs(e),Cb(e,t)}function Cb(e,t){var n=t._currentValue;if(t={context:t,memoizedValue:n,next:null},hr===null){if(e===null)throw Error(St(308));hr=t,e.dependencies={lanes:0,firstContext:t},e.flags|=524288}else hr=hr.next=t;return n}var D2=typeof AbortController<"u"?AbortController:function(){var e=[],t=this.signal={aborted:!1,addEventListener:function(n,i){e.push(i)}};this.abort=function(){t.aborted=!0,e.forEach(function(n){return n()})}},N2=Tn.unstable_scheduleCallback,L2=Tn.unstable_NormalPriority,xn={$$typeof:Fa,Consumer:null,Provider:null,_currentValue:null,_currentValue2:null,_threadCount:0};function Og(){return{controller:new D2,data:new Map,refCount:0}}function gu(e){e.refCount--,e.refCount===0&&N2(L2,function(){e.controller.abort()})}function w_(e,t){if((e.pendingLanes&4194048)!==0){var n=e.transitionTypes;for(n===null&&(n=e.transitionTypes=[]),e=0;e<t.length;e++){var i=t[e];n.indexOf(i)===-1&&n.push(i)}}}var Uc=null;function U2(e){var t=e.transitionTypes;return e.transitionTypes=null,t}var Fc=null,N0=0,$s=0,el=null;function I2(e,t){if(Fc===null){var n=Fc=[];N0=0,$s=cv(),el={status:"pending",value:void 0,then:function(i){n.push(i)}}}return N0++,t.then(A_,A_),t}function A_(){if(--N0===0&&(Uc=null,Fc!==null)){el!==null&&(el.status="fulfilled");var e=Fc;Fc=null,$s=0,el=null;for(var t=0;t<e.length;t++)(0,e[t])()}}function O2(e,t){var n=[],i={status:"pending",value:null,reason:null,then:function(a){n.push(a)}};return e.then(function(){i.status="fulfilled",i.value=t;for(var a=0;a<n.length;a++)(0,n[a])(t)},function(a){for(i.status="rejected",i.reason=a,a=0;a<n.length;a++)(0,n[a])(void 0)}),i}var R_=fe.S;fe.S=function(e,t){if(YS=Ii(),typeof t=="object"&&t!==null&&typeof t.then=="function"&&I2(e,t),Uc!==null)for(var n=ml;n!==null;)w_(n,Uc),n=n.next;if(n=e.types,n!==null){for(var i=ml;i!==null;)w_(i,n),i=i.next;if($s!==0){i=Uc,i===null&&(i=Uc=[]);for(var a=0;a<n.length;a++){var r=n[a];i.indexOf(r)===-1&&i.push(r)}}}R_!==null&&R_(e,t)};var Ys=Wa(null);function Pg(){var e=Ys.current;return e!==null?e:Ze.pooledCache}function Kf(e,t){t===null?$e(Ys,Ys.current):$e(Ys,t.pool)}function Db(){var e=Pg();return e===null?null:{parent:xn._currentValue,pool:e}}var Ml=Error(St(460)),zg=Error(St(474)),qh=Error(St(542)),yh={then:function(){}};function C_(e){return e=e.status,e==="fulfilled"||e==="rejected"}function Nb(e,t,n){switch(n=e[n],n===void 0?e.push(t):n!==t&&(t.then(Ba,Ba),t=n),t.status){case"fulfilled":return t.value;case"rejected":throw e=t.reason,N_(e),e===void 0&&!("reason"in t)?Error(St(600)):e;default:if(typeof t.status=="string")t.then(Ba,Ba);else{if(e=Ze,e!==null&&100<e.shellSuspendCounter)throw Error(St(482));e=t,e.status="pending",e.then(function(i){if(t.status==="pending"){var a=t;a.status="fulfilled",a.value=i}},function(i){if(t.status==="pending"){var a=t;a.status="rejected",a.reason=i}})}switch(t.status){case"fulfilled":return t.value;case"rejected":throw e=t.reason,N_(e),e}throw Zs=t,Ml}}function Gs(e){try{var t=e._init;return t(e._payload)}catch(n){throw n!==null&&typeof n=="object"&&typeof n.then=="function"?(Zs=n,Ml):n}}var Zs=null;function D_(){if(Zs===null)throw Error(St(459));var e=Zs;return Zs=null,e}function N_(e){if(e===Ml||e===qh)throw Error(St(483))}var nl=null,tu=0;function Lf(e){var t=tu;return tu+=1,nl===null&&(nl=[]),Nb(nl,e,t)}function Hr(e,t){t=t.props.ref,e.ref=t!==void 0?t:null}function Uf(e,t){throw t.$$typeof===mA?Error(St(525)):(e=Object.prototype.toString.call(t),Error(St(31,e==="[object Object]"?"object with keys {"+Object.keys(t).join(", ")+"}":e)))}function Lb(e){function t(d,x){if(e){var b=d.deletions;b===null?(d.deletions=[x],d.flags|=16):b.push(x)}}function n(d,x){if(!e)return null;for(;x!==null;)t(d,x),x=x.sibling;return null}function i(d){for(var x=new Map;d!==null;)d.key===null?x.set(d.index,d):x.set(d.key,d),d=d.sibling;return x}function a(d,x){return d=dr(d,x),d.index=0,d.sibling=null,d}function r(d,x,b){return d.index=b,e?(b=d.alternate,b!==null?(b=b.index,b<x?(d.flags|=2,x):b):(d.flags|=134217730,x)):(d.flags|=1048576,x)}function s(d){return e&&d.alternate===null&&(d.flags|=134217730),d}function l(d,x,b,y){return x===null||x.tag!==6?(x=Xm(b,d.mode,y),x.return=d,x):(x=a(x,b),x.return=d,x)}function o(d,x,b,y){var w=b.type;return w===Go?(d=u(d,x,b.props.children,y,b.key),Hr(d,b),d):x!==null&&(x.elementType===w||typeof w=="object"&&w!==null&&w.$$typeof===kr&&Gs(w)===x.type)?(x=a(x,b.props),Hr(x,b),x.return=d,x):(x=Zf(b.type,b.key,b.props,null,d.mode,y),Hr(x,b),x.return=d,x)}function c(d,x,b,y){return x===null||x.tag!==4||x.stateNode.containerInfo!==b.containerInfo||x.stateNode.implementation!==b.implementation?(x=Wm(b,d.mode,y),x.return=d,x):(x=a(x,b.children||[]),x.return=d,x)}function u(d,x,b,y,w){return x===null||x.tag!==7?(x=qs(b,d.mode,y,w),x.return=d,x):(x=a(x,b),x.return=d,x)}function p(d,x,b){if(typeof x=="string"&&x!==""||typeof x=="number"||typeof x=="bigint")return x=Xm(""+x,d.mode,b),x.return=d,x;if(typeof x=="object"&&x!==null){switch(x.$$typeof){case Mf:return b=Zf(x.type,x.key,x.props,null,d.mode,b),Hr(b,x),b.return=d,b;case Dc:return x=Wm(x,d.mode,b),x.return=d,x;case kr:return x=Gs(x),p(d,x,b)}if(Nc(x)||Ec(x))return x=qs(x,d.mode,b,null),x.return=d,x;if(typeof x.then=="function")return p(d,Lf(x),b);if(x.$$typeof===Fa)return p(d,Nf(d,x),b);Uf(d,x)}return null}function f(d,x,b,y){var w=x!==null?x.key:null;if(typeof b=="string"&&b!==""||typeof b=="number"||typeof b=="bigint")return w!==null?null:l(d,x,""+b,y);if(typeof b=="object"&&b!==null){switch(b.$$typeof){case Mf:return b.key===w?o(d,x,b,y):null;case Dc:return b.key===w?c(d,x,b,y):null;case kr:return b=Gs(b),f(d,x,b,y)}if(Nc(b)||Ec(b))return w!==null?null:u(d,x,b,y,null);if(typeof b.then=="function")return f(d,x,Lf(b),y);if(b.$$typeof===Fa)return f(d,x,Nf(d,b),y);Uf(d,b)}return null}function h(d,x,b,y,w){if(typeof y=="string"&&y!==""||typeof y=="number"||typeof y=="bigint")return d=d.get(b)||null,l(x,d,""+y,w);if(typeof y=="object"&&y!==null){switch(y.$$typeof){case Mf:return d=d.get(y.key===null?b:y.key)||null,o(x,d,y,w);case Dc:return d=d.get(y.key===null?b:y.key)||null,c(x,d,y,w);case kr:return y=Gs(y),h(d,x,b,y,w)}if(Nc(y)||Ec(y))return d=d.get(b)||null,u(x,d,y,w,null);if(typeof y.then=="function")return h(d,x,b,Lf(y),w);if(y.$$typeof===Fa)return h(d,x,b,Nf(x,y),w);Uf(x,y)}return null}function g(d,x,b,y){for(var w=null,T=null,m=x,S=x=0,C=null;m!==null&&S<b.length;S++){m.index>S?(C=m,m=null):C=m.sibling;var D=f(d,m,b[S],y);if(D===null){m===null&&(m=C);break}e&&m&&D.alternate===null&&t(d,m),x=r(D,x,S),T===null?w=D:T.sibling=D,T=D,m=C}if(S===b.length)return n(d,m),Me&&fr(d,S),w;if(m===null){for(;S<b.length;S++)m=p(d,b[S],y),m!==null&&(x=r(m,x,S),T===null?w=m:T.sibling=m,T=m);return Me&&fr(d,S),w}for(m=i(m);S<b.length;S++)C=h(m,d,S,b[S],y),C!==null&&(e&&(D=C.alternate,D!==null&&m.delete(D.key===null?S:D.key)),x=r(C,x,S),T===null?w=C:T.sibling=C,T=C);return e&&m.forEach(function(R){return t(d,R)}),Me&&fr(d,S),w}function M(d,x,b,y){if(b==null)throw Error(St(151));for(var w=null,T=null,m=x,S=x=0,C=null,D=b.next();m!==null&&!D.done;S++,D=b.next()){m.index>S?(C=m,m=null):C=m.sibling;var R=f(d,m,D.value,y);if(R===null){m===null&&(m=C);break}e&&m&&R.alternate===null&&t(d,m),x=r(R,x,S),T===null?w=R:T.sibling=R,T=R,m=C}if(D.done)return n(d,m),Me&&fr(d,S),w;if(m===null){for(;!D.done;S++,D=b.next())D=p(d,D.value,y),D!==null&&(x=r(D,x,S),T===null?w=D:T.sibling=D,T=D);return Me&&fr(d,S),w}for(m=i(m);!D.done;S++,D=b.next())D=h(m,d,S,D.value,y),D!==null&&(e&&(C=D.alternate,C!==null&&m.delete(C.key===null?S:C.key)),x=r(D,x,S),T===null?w=D:T.sibling=D,T=D);return e&&m.forEach(function(Z){return t(d,Z)}),Me&&fr(d,S),w}function v(d,x,b,y){if(typeof b=="object"&&b!==null&&b.type===Go&&b.key===null&&b.props.ref===void 0&&(b=b.props.children),typeof b=="object"&&b!==null){switch(b.$$typeof){case Mf:t:{for(var w=b.key;x!==null;){if(x.key===w){if(w=b.type,w===Go){if(x.tag===7){n(d,x.sibling),y=a(x,b.props.children),Hr(y,b),y.return=d,d=y;break t}}else if(x.elementType===w||typeof w=="object"&&w!==null&&w.$$typeof===kr&&Gs(w)===x.type){n(d,x.sibling),y=a(x,b.props),Hr(y,b),y.return=d,d=y;break t}n(d,x);break}else t(d,x);x=x.sibling}b.type===Go?(y=qs(b.props.children,d.mode,y,b.key),Hr(y,b),y.return=d,d=y):(y=Zf(b.type,b.key,b.props,null,d.mode,y),Hr(y,b),y.return=d,d=y)}return s(d);case Dc:t:{for(w=b.key;x!==null;){if(x.key===w)if(x.tag===4&&x.stateNode.containerInfo===b.containerInfo&&x.stateNode.implementation===b.implementation){n(d,x.sibling),y=a(x,b.children||[]),y.return=d,d=y;break t}else{n(d,x);break}else t(d,x);x=x.sibling}y=Wm(b,d.mode,y),y.return=d,d=y}return s(d);case kr:return b=Gs(b),v(d,x,b,y)}if(Nc(b))return g(d,x,b,y);if(Ec(b)){if(w=Ec(b),typeof w!="function")throw Error(St(150));return b=w.call(b),M(d,x,b,y)}if(typeof b.then=="function")return v(d,x,Lf(b),y);if(b.$$typeof===Fa)return v(d,x,Nf(d,b),y);Uf(d,b)}return typeof b=="string"&&b!==""||typeof b=="number"||typeof b=="bigint"?(b=""+b,x!==null&&x.tag===6?(n(d,x.sibling),y=a(x,b),y.return=d,d=y):(n(d,x),y=Xm(b,d.mode,y),y.return=d,d=y),s(d)):n(d,x)}return function(d,x,b,y){try{tu=0;var w=v(d,x,b,y);return nl=null,w}catch(m){if(m===Ml||m===qh)throw m;var T=bi(29,m,null,d.mode);return T.lanes=y,T.return=d,T}}}var to=Lb(!0),Ub=Lb(!1),Xr=!1;function Fg(e){e.updateQueue={baseState:e.memoizedState,firstBaseUpdate:null,lastBaseUpdate:null,shared:{pending:null,lanes:0,hiddenCallbacks:null},callbacks:null}}function L0(e,t){e=e.updateQueue,t.updateQueue===e&&(t.updateQueue={baseState:e.baseState,firstBaseUpdate:e.firstBaseUpdate,lastBaseUpdate:e.lastBaseUpdate,shared:e.shared,callbacks:null})}function ts(e){return{lane:e,tag:0,payload:null,callback:null,next:null}}function es(e,t,n){var i=e.updateQueue;if(i===null)return null;if(i=i.shared,(ze&2)!==0){var a=i.pending;return a===null?t.next=t:(t.next=a.next,a.next=t),i.pending=t,t=mh(e),Eb(e,null,n),t}return Xh(e,i,t,n),mh(e)}function Bc(e,t,n){if(t=t.updateQueue,t!==null&&(t=t.shared,(n&4194048)!==0)){var i=t.lanes;i&=e.pendingLanes,n|=i,t.lanes=n,K1(e,n)}}function Ym(e,t){var n=e.updateQueue,i=e.alternate;if(i!==null&&(i=i.updateQueue,n===i)){var a=null,r=null;if(n=n.firstBaseUpdate,n!==null){do{var s={lane:n.lane,tag:n.tag,payload:n.payload,callback:null,next:null};r===null?a=r=s:r=r.next=s,n=n.next}while(n!==null);r===null?a=r=t:r=r.next=t}else a=r=t;n={baseState:i.baseState,firstBaseUpdate:a,lastBaseUpdate:r,shared:i.shared,callbacks:i.callbacks},e.updateQueue=n;return}e=n.lastBaseUpdate,e===null?n.firstBaseUpdate=t:e.next=t,n.lastBaseUpdate=t}var U0=!1;function Hc(){if(U0){var e=el;if(e!==null)throw e}}function Gc(e,t,n,i){U0=!1;var a=e.updateQueue;Xr=!1;var r=a.firstBaseUpdate,s=a.lastBaseUpdate,l=a.shared.pending;if(l!==null){a.shared.pending=null;var o=l,c=o.next;o.next=null,s===null?r=c:s.next=c,s=o;var u=e.alternate;u!==null&&(u=u.updateQueue,l=u.lastBaseUpdate,l!==s&&(l===null?u.firstBaseUpdate=c:l.next=c,u.lastBaseUpdate=o))}if(r!==null){var p=a.baseState;s=0,u=c=o=null,l=r;do{var f=l.lane&-536870913,h=f!==l.lane;if(h?(De&f)===f:(i&f)===f){f!==0&&f===$s&&(U0=!0),u!==null&&(u=u.next={lane:0,tag:l.tag,payload:l.payload,callback:null,next:null});t:{var g=e,M=l;f=t;var v=n;switch(M.tag){case 1:if(g=M.payload,typeof g=="function"){p=g.call(v,p,f);break t}p=g;break t;case 3:g.flags=g.flags&-65537|128;case 0:if(g=M.payload,f=typeof g=="function"?g.call(v,p,f):g,f==null)break t;p=Je({},p,f);break t;case 2:Xr=!0}}f=l.callback,f!==null&&(e.flags|=64,h&&(e.flags|=8192),h=a.callbacks,h===null?a.callbacks=[f]:h.push(f))}else h={lane:f,tag:l.tag,payload:l.payload,callback:l.callback,next:null},u===null?(c=u=h,o=p):u=u.next=h,s|=f;if(l=l.next,l===null){if(l=a.shared.pending,l===null)break;h=l,l=h.next,h.next=null,a.lastBaseUpdate=h,a.shared.pending=null}}while(!0);u===null&&(o=p),a.baseState=o,a.firstBaseUpdate=c,a.lastBaseUpdate=u,r===null&&(a.shared.lanes=0),hs|=s,e.lanes=s,e.memoizedState=p}}function Ib(e,t){if(typeof e!="function")throw Error(St(191,e));e.call(t)}function Ob(e,t){var n=e.callbacks;if(n!==null)for(e.callbacks=null,e=0;e<n.length;e++)Ib(n[e],t)}var us=Wa(null),_h=Wa(0);function L_(e,t){e=_r,$e(_h,e),$e(us,t),_r=e|t.baseLanes}function I0(){$e(_h,_r),$e(us,us.current)}function Bg(){_r=_h.current,Gn(us),Gn(_h)}var Xn=Wa(null),Kn=null;function ns(e){var t=e.alternate;$e(Vn,Vn.current&1),$e(Xn,e),Kn===null&&(t===null||us.current!==null||t.memoizedState!==null)&&(Kn=e)}function O0(e){$e(Vn,Vn.current),$e(Xn,e),Kn===null&&(Kn=e)}function Pb(e){e.tag===22?($e(Vn,Vn.current),$e(Xn,e),Kn===null&&(Kn=e)):is()}function is(){$e(Vn,Vn.current),$e(Xn,Xn.current)}function Ni(e){Gn(Xn),Kn===e&&(Kn=null),Gn(Vn)}var Vn=Wa(0);function eu(e,t){$e(Xn,Xn.current),$e(Vn,t)}function Hg(e){Gn(Vn),Gn(Xn),Kn===e&&(Kn=null)}function bh(e){for(var t=e;t!==null;){if(t.tag===13){var n=t.memoizedState;if(n!==null&&(n=n.dehydrated,n===null||mg(n)||dv(n)))return t}else if(t.tag===19&&t.memoizedProps.revealOrder!=="independent"){if((t.flags&128)!==0)return t}else if(t.child!==null){t.child.return=t,t=t.child;continue}if(t===e)break;for(;t.sibling===null;){if(t.return===null||t.return===e)return null;t=t.return}t.sibling.return=t.return,t=t.sibling}return null}var vr=0,ve=null,qe=null,vn=null,Sh=!1,il=!1,eo=!1,Mh=0,nu=0,al=null,P2=0;function hn(){throw Error(St(321))}function Gg(e,t){if(t===null)return!1;for(var n=0;n<t.length&&n<e.length;n++)if(!Fi(e[n],t[n]))return!1;return!0}function Vg(e,t,n,i,a,r){return vr=r,ve=t,t.memoizedState=null,t.updateQueue=null,t.lanes=0,fe.H=e===null||e.memoizedState===null?dS:pS,eo=!1,r=n(i,a),eo=!1,il&&(r=Fb(t,n,i,a)),zb(e),r}function zb(e){fe.H=Eh;var t=qe!==null&&qe.next!==null;if(vr=0,vn=qe=ve=null,Sh=!1,nu=0,al=null,t)throw Error(St(300));e===null||yn||(e=e.dependencies,e!==null&&xh(e)&&(yn=!0))}function Fb(e,t,n,i){ve=e;var a=0;do{if(il&&(al=null),nu=0,il=!1,25<=a)throw Error(St(301));if(a+=1,vn=qe=null,e.updateQueue!=null){var r=e.updateQueue;r.lastEffect=null,r.events=null,r.stores=null,r.memoCache!=null&&(r.memoCache.index=0)}fe.H=X2,r=t(n,i)}while(il);return r}function z2(){var e=fe.H,t=e.useState()[0];return t=typeof t.then=="function"?vu(t):t,e=e.useState()[0],(qe!==null?qe.memoizedState:null)!==e&&(ve.flags|=1024),t}function kg(){var e=Mh!==0;return Mh=0,e}function Xg(e,t,n){t.updateQueue=e.updateQueue,t.flags&=-2053,e.lanes&=~n}function Wg(e){if(Sh){for(e=e.memoizedState;e!==null;){var t=e.queue;t!==null&&(t.pending=null),e=e.next}Sh=!1}vr=0,vn=qe=ve=null,il=!1,nu=Mh=0,al=null}function si(){var e={memoizedState:null,baseState:null,baseQueue:null,queue:null,next:null};return vn===null?ve.memoizedState=vn=e:vn=vn.next=e,vn}function mn(){if(qe===null){var e=ve.alternate;e=e!==null?e.memoizedState:null}else e=qe.next;var t=vn===null?ve.memoizedState:vn.next;if(t!==null)vn=t,qe=e;else{if(e===null)throw ve.alternate===null?Error(St(467)):Error(St(310));qe=e,e={memoizedState:qe.memoizedState,baseState:qe.baseState,baseQueue:qe.baseQueue,queue:qe.queue,next:null},vn===null?ve.memoizedState=vn=e:vn=vn.next=e}return vn}function Yh(){return{lastEffect:null,events:null,stores:null,memoCache:null}}function vu(e){var t=nu;return nu+=1,al===null&&(al=[]),e=Nb(al,e,t),t=ve,(vn===null?t.memoizedState:vn.next)===null&&(t=t.alternate,fe.H=t===null||t.memoizedState===null?dS:pS),e}function Zh(e){if(e!==null&&typeof e=="object"){if(typeof e.then=="function")return vu(e);if(e.$$typeof===xA)return;if(e.$$typeof===Fa)return Hn(e)}throw Error(St(438,String(e)))}function qg(e){var t=null,n=ve.updateQueue;if(n!==null&&(t=n.memoCache),t==null){var i=ve.alternate;i!==null&&(i=i.updateQueue,i!==null&&(i=i.memoCache,i!=null&&(t={data:i.data.map(function(a){return a.slice()}),index:0})))}if(t==null&&(t={data:[],index:0}),n===null&&(n=Yh(),ve.updateQueue=n),n.memoCache=t,n=t.data[t.index],n===void 0)for(n=t.data[t.index]=Array(e),i=0;i<e;i++)n[i]=vA;return t.index++,n}function xr(e,t){return typeof t=="function"?t(e):t}function jf(e){var t=mn();return Yg(t,qe,e)}function Yg(e,t,n){var i=e.queue;if(i===null)throw Error(St(311));i.lastRenderedReducer=n;var a=e.baseQueue,r=i.pending;if(r!==null){if(a!==null){var s=a.next;a.next=r.next,r.next=s}t.baseQueue=a=r,i.pending=null}if(r=e.baseState,a===null)e.memoizedState=r;else{t=a.next;var l=s=null,o=null,c=t,u=!1;do{var p=c.lane&-536870913;if(p!==c.lane?(De&p)===p:(vr&p)===p){var f=c.revertLane;if(f===0)o!==null&&(o=o.next={lane:0,revertLane:0,gesture:null,action:c.action,hasEagerState:c.hasEagerState,eagerState:c.eagerState,next:null}),p===$s&&(u=!0);else if((vr&f)===f){c=c.next,f===$s&&(u=!0);continue}else p={lane:0,revertLane:c.revertLane,gesture:null,action:c.action,hasEagerState:c.hasEagerState,eagerState:c.eagerState,next:null},o===null?(l=o=p,s=r):o=o.next=p,ve.lanes|=f,hs|=f;p=c.action,eo&&n(r,p),r=c.hasEagerState?c.eagerState:n(r,p)}else f={lane:p,revertLane:c.revertLane,gesture:c.gesture,action:c.action,hasEagerState:c.hasEagerState,eagerState:c.eagerState,next:null},o===null?(l=o=f,s=r):o=o.next=f,ve.lanes|=p,hs|=p;c=c.next}while(c!==null&&c!==t);if(o===null?s=r:o.next=l,!Fi(r,e.memoizedState)&&(yn=!0,u&&(n=el,n!==null)))throw n;e.memoizedState=r,e.baseState=s,e.baseQueue=o,i.lastRenderedState=r}return a===null&&(i.lanes=0),[e.memoizedState,i.dispatch]}function Zm(e){var t=mn(),n=t.queue;if(n===null)throw Error(St(311));n.lastRenderedReducer=e;var i=n.dispatch,a=n.pending,r=t.memoizedState;if(a!==null){n.pending=null;var s=a=a.next;do r=e(r,s.action),s=s.next;while(s!==a);Fi(r,t.memoizedState)||(yn=!0),t.memoizedState=r,t.baseQueue===null&&(t.baseState=r),n.lastRenderedState=r}return[r,i]}function Bb(e,t,n){var i=ve,a=mn(),r=Me;if(r){if(n===void 0)throw Error(St(407));n=n()}else n=t();var s=!Fi((qe||a).memoizedState,n);if(s&&(a.memoizedState=n,yn=!0),a=a.queue,Zg(Vb.bind(null,i,a,e),[e]),e=a.getSnapshot!==t||s||vn!==null&&(vn.memoizedState.tag&1)!==0,fl(e?9:8,{destroy:void 0},Gb.bind(null,i,a,n,t),null),e){if(i.flags|=2048,Ze===null)throw Error(St(349));r||(vr&127)!==0||Hb(i,t,n)}return n}function Hb(e,t,n){e.flags|=16384,e={getSnapshot:t,value:n},t=ve.updateQueue,t===null?(t=Yh(),ve.updateQueue=t,t.stores=[e]):(n=t.stores,n===null?t.stores=[e]:n.push(e))}function Gb(e,t,n,i){t.value=n,t.getSnapshot=i,kb(t)&&Xb(e)}function Vb(e,t,n){return n(function(){kb(t)&&Xb(e)})}function kb(e){var t=e.getSnapshot;e=e.value;try{var n=t();return!Fi(e,n)}catch{return!0}}function Xb(e){var t=oo(e,2);t!==null&&Si(t,e,2)}function P0(e){var t=si();if(typeof e=="function"){var n=e;if(e=n(),eo){qr(!0);try{n()}finally{qr(!1)}}}return t.memoizedState=t.baseState=e,t.queue={pending:null,lanes:0,dispatch:null,lastRenderedReducer:xr,lastRenderedState:e},t}function Wb(e,t,n,i){return e.baseState=n,Yg(e,qe,typeof i=="function"?i:xr)}function F2(e,t,n,i,a){if(Kh(e))throw Error(St(485));if(e=t.action,e!==null){var r={payload:a,action:e,next:null,isTransition:!0,status:"pending",value:null,reason:null,listeners:[],then:function(s){r.listeners.push(s)}};fe.T!==null?n(!0):r.isTransition=!1,i(r),n=t.pending,n===null?(r.next=t.pending=r,qb(t,r)):(r.next=n.next,t.pending=n.next=r)}}function qb(e,t){var n=t.action,i=t.payload,a=e.state;if(t.isTransition){var r=fe.T,s={};s.types=r!==null?r.types:null,fe.T=s;try{var l=n(a,i),o=fe.S;o!==null&&o(s,l),U_(e,t,l)}catch(c){z0(e,t,c)}finally{r!==null&&s.types!==null&&(r.types=s.types),fe.T=r}}else try{r=n(a,i),U_(e,t,r)}catch(c){z0(e,t,c)}}function U_(e,t,n){n!==null&&typeof n=="object"&&typeof n.then=="function"?n.then(function(i){I_(e,t,i)},function(i){return z0(e,t,i)}):I_(e,t,n)}function I_(e,t,n){t.status="fulfilled",t.value=n,Yb(t),e.state=n,t=e.pending,t!==null&&(n=t.next,n===t?e.pending=null:(n=n.next,t.next=n,qb(e,n)))}function z0(e,t,n){var i=e.pending;if(e.pending=null,i!==null){i=i.next;do t.status="rejected",t.reason=n,Yb(t),t=t.next;while(t!==i)}e.action=null}function Yb(e){e=e.listeners;for(var t=0;t<e.length;t++)(0,e[t])()}function Zb(e,t){return t}function O_(e,t){if(Me){var n=Ze.formState;if(n!==null){t:{var i=ve;if(Me){if(Qe){e:{for(var a=Qe,r=aa;a.nodeType!==8;){if(!r){a=null;break e}if(a=ra(a.nextSibling),a===null){a=null;break e}}r=a.data,a=r==="F!"||r==="F"?a:null}if(a){Qe=ra(a.nextSibling),i=a.data==="F!";break t}}cs(i)}i=!1}i&&(t=n[0])}}return n=si(),n.memoizedState=n.baseState=t,i={pending:null,lanes:0,dispatch:null,lastRenderedReducer:Zb,lastRenderedState:t},n.queue=i,n=uS.bind(null,ve,i),i.dispatch=n,i=P0(!1),r=Qg.bind(null,ve,!1,i.queue),i=si(),a={state:t,dispatch:null,action:e,pending:null},i.queue=a,n=F2.bind(null,ve,a,r,n),a.dispatch=n,i.memoizedState=e,[t,n,!1]}function P_(e){var t=mn();return Jb(t,qe,e)}function Jb(e,t,n){if(t=Yg(e,t,Zb)[0],e=jf(xr)[0],typeof t=="object"&&t!==null&&typeof t.then=="function")try{var i=vu(t)}catch(s){throw s===Ml?qh:s}else i=t;t=mn();var a=t.queue,r=a.dispatch;return n!==t.memoizedState&&(ve.flags|=2048,fl(9,{destroy:void 0},B2.bind(null,a,n),null)),[i,r,e]}function B2(e,t){e.action=t}function z_(e){var t=mn(),n=qe;if(n!==null)return Jb(t,n,e);mn(),t=t.memoizedState,n=mn();var i=n.queue.dispatch;return n.memoizedState=e,[t,i,!1]}function fl(e,t,n,i){return e={tag:e,create:n,deps:i,inst:t,next:null},t=ve.updateQueue,t===null&&(t=Yh(),ve.updateQueue=t),n=t.lastEffect,n===null?t.lastEffect=e.next=e:(i=n.next,n.next=e,e.next=i,t.lastEffect=e),e}function Kb(){return mn().memoizedState}function Qf(e,t,n,i){var a=si();ve.flags|=e,a.memoizedState=fl(1|t,{destroy:void 0},n,i===void 0?null:i)}function Jh(e,t,n,i){var a=mn();i=i===void 0?null:i;var r=a.memoizedState.inst;qe!==null&&i!==null&&Gg(i,qe.memoizedState.deps)?a.memoizedState=fl(t,r,n,i):(ve.flags|=e,a.memoizedState=fl(1|t,r,n,i))}function F_(e,t){Qf(8390656,8,e,t)}function Zg(e,t){Jh(2048,8,e,t)}function H2(e){ve.flags|=4;var t=ve.updateQueue;if(t===null)t=Yh(),ve.updateQueue=t,t.events=[e];else{var n=t.events;n===null?t.events=[e]:n.push(e)}}function jb(e){var t=mn().memoizedState;return H2({ref:t,nextImpl:e}),function(){if((ze&2)!==0)throw Error(St(440));return t.impl.apply(void 0,arguments)}}function Qb(e,t){return Jh(4,2,e,t)}function $b(e,t){return Jh(4,4,e,t)}function tS(e,t){if(typeof t=="function"){e=e();var n=t(e);return function(){typeof n=="function"?n():t(null)}}if(t!=null)return e=e(),t.current=e,function(){t.current=null}}function eS(e,t,n){n=n!=null?n.concat([e]):null,Jh(4,4,tS.bind(null,t,e),n)}function Jg(){}function nS(e,t){var n=mn();t=t===void 0?null:t;var i=n.memoizedState;return t!==null&&Gg(t,i[1])?i[0]:(n.memoizedState=[e,t],e)}function iS(e,t){var n=mn();t=t===void 0?null:t;var i=n.memoizedState;if(t!==null&&Gg(t,i[1]))return i[0];if(i=e(),eo){qr(!0);try{e()}finally{qr(!1)}}return n.memoizedState=[i,t],i}function Kg(e,t,n){return n===void 0||(vr&1073741824)!==0&&(De&261930)===0?e.memoizedState=t:(e.memoizedState=n,e=JS(),ve.lanes|=e,hs|=e,n)}function aS(e,t,n,i){return Fi(n,t)?n:us.current!==null?(e=Kg(e,n,i),Fi(e,t)||(yn=!0),e):(vr&106)===0||(vr&1073741824)!==0&&(De&261930)===0?(yn=!0,e.memoizedState=n):(e=JS(),ve.lanes|=e,hs|=e,t)}function rS(e,t,n,i,a){var r=Fe.p;Fe.p=r!==0&&8>r?r:8;var s=fe.T,l={};l.types=s!==null?s.types:null,fe.T=l,Qg(e,!1,t,n);try{var o=a(),c=fe.S;if(c!==null&&c(l,o),o!==null&&typeof o=="object"&&typeof o.then=="function"){var u=O2(o,i);Vc(e,t,u,zi(e))}else Vc(e,t,i,zi(e))}catch(p){Vc(e,t,{then:function(){},status:"rejected",reason:p},zi())}finally{Fe.p=r,s!==null&&l.types!==null&&(s.types=l.types),fe.T=s}}function G2(){}function F0(e,t,n,i){if(e.tag!==5)throw Error(St(476));var a=sS(e).queue;rS(e,a,t,Ws,n===null?G2:function(){return oS(e),n(i)})}function sS(e){var t=e.memoizedState;if(t!==null)return t;t={memoizedState:Ws,baseState:Ws,baseQueue:null,queue:{pending:null,lanes:0,dispatch:null,lastRenderedReducer:xr,lastRenderedState:Ws},next:null};var n={};return t.next={memoizedState:n,baseState:n,baseQueue:null,queue:{pending:null,lanes:0,dispatch:null,lastRenderedReducer:xr,lastRenderedState:n},next:null},e.memoizedState=t,e=e.alternate,e!==null&&(e.memoizedState=t),t}function oS(e){var t=sS(e);t.next===null&&(t=e.alternate.memoizedState),Vc(e,t.next.queue,{},zi())}function jg(){return Hn(xl)}function lS(){return mn().memoizedState}function cS(){return mn().memoizedState}function V2(e){for(var t=e.return;t!==null;){switch(t.tag){case 24:case 3:var n=zi();e=ts(n);var i=es(t,e,n);i!==null&&(Si(i,t,n),Bc(i,t,n)),t={cache:Og()},e.payload=t;return}t=t.return}}function k2(e,t,n){var i=zi();n={lane:i,revertLane:0,gesture:null,action:n,hasEagerState:!1,eagerState:null,next:null},Kh(e)?fS(t,n):(n=Lg(e,t,n,i),n!==null&&(Si(n,e,i),hS(n,t,i)))}function uS(e,t,n){var i=zi();Vc(e,t,n,i)}function Vc(e,t,n,i){var a={lane:i,revertLane:0,gesture:null,action:n,hasEagerState:!1,eagerState:null,next:null};if(Kh(e))fS(t,a);else{var r=e.alternate;if(e.lanes===0&&(r===null||r.lanes===0)&&(r=t.lastRenderedReducer,r!==null))try{var s=t.lastRenderedState,l=r(s,n);if(a.hasEagerState=!0,a.eagerState=l,Fi(l,s))return Xh(e,t,a,0),Ze===null&&kh(),!1}catch{}if(n=Lg(e,t,a,i),n!==null)return Si(n,e,i),hS(n,t,i),!0}return!1}function Qg(e,t,n,i){if(i={lane:2,revertLane:cv(),gesture:null,action:i,hasEagerState:!1,eagerState:null,next:null},Kh(e)){if(t)throw Error(St(479))}else t=Lg(e,n,i,2),t!==null&&Si(t,e,2)}function Kh(e){var t=e.alternate;return e===ve||t!==null&&t===ve}function fS(e,t){il=Sh=!0;var n=e.pending;n===null?t.next=t:(t.next=n.next,n.next=t),e.pending=t}function hS(e,t,n){if((n&4194048)!==0){var i=t.lanes;i&=e.pendingLanes,n|=i,t.lanes=n,K1(e,n)}}var Eh={readContext:Hn,use:Zh,useCallback:hn,useContext:hn,useEffect:hn,useImperativeHandle:hn,useLayoutEffect:hn,useInsertionEffect:hn,useMemo:hn,useReducer:hn,useRef:hn,useState:hn,useDebugValue:hn,useDeferredValue:hn,useTransition:hn,useSyncExternalStore:hn,useId:hn,useHostTransitionStatus:hn,useFormState:hn,useActionState:hn,useOptimistic:hn,useMemoCache:hn,useCacheRefresh:hn,useEffectEvent:hn},dS={readContext:Hn,use:Zh,useCallback:function(e,t){return si().memoizedState=[e,t===void 0?null:t],e},useContext:Hn,useEffect:F_,useImperativeHandle:function(e,t,n){n=n!=null?n.concat([e]):null,Qf(4194308,4,tS.bind(null,t,e),n)},useLayoutEffect:function(e,t){return Qf(4194308,4,e,t)},useInsertionEffect:function(e,t){Qf(4,2,e,t)},useMemo:function(e,t){var n=si();t=t===void 0?null:t;var i=e();if(eo){qr(!0);try{e()}finally{qr(!1)}}return n.memoizedState=[i,t],i},useReducer:function(e,t,n){var i=si();if(n!==void 0){var a=n(t);if(eo){qr(!0);try{n(t)}finally{qr(!1)}}}else a=t;return i.memoizedState=i.baseState=a,e={pending:null,lanes:0,dispatch:null,lastRenderedReducer:e,lastRenderedState:a},i.queue=e,e=e.dispatch=k2.bind(null,ve,e),[i.memoizedState,e]},useRef:function(e){var t=si();return e={current:e},t.memoizedState=e},useState:function(e){e=P0(e);var t=e.queue,n=uS.bind(null,ve,t);return t.dispatch=n,[e.memoizedState,n]},useDebugValue:Jg,useDeferredValue:function(e,t){var n=si();return Kg(n,e,t)},useTransition:function(){var e=P0(!1);return e=rS.bind(null,ve,e.queue,!0,!1),si().memoizedState=e,[!1,e]},useSyncExternalStore:function(e,t,n){var i=ve,a=si();if(Me){if(n===void 0)throw Error(St(407));n=n()}else{if(n=t(),Ze===null)throw Error(St(349));(De&127)!==0||Hb(i,t,n)}a.memoizedState=n;var r={value:n,getSnapshot:t};return a.queue=r,F_(Vb.bind(null,i,r,e),[e]),i.flags|=2048,fl(9,{destroy:void 0},Gb.bind(null,i,r,n,t),null),n},useId:function(){var e=si(),t=Ze.identifierPrefix;if(Me){var n=Ga,i=Ha;n=(i&~(1<<32-Pi(i)-1)).toString(32)+n,t="_"+t+"R_"+n,n=Mh++,0<n&&(t+="H"+n.toString(32)),t+="_"}else n=P2++,t="_"+t+"r_"+n.toString(32)+"_";return e.memoizedState=t},useHostTransitionStatus:jg,useFormState:O_,useActionState:O_,useOptimistic:function(e){var t=si();t.memoizedState=t.baseState=e;var n={pending:null,lanes:0,dispatch:null,lastRenderedReducer:null,lastRenderedState:null};return t.queue=n,t=Qg.bind(null,ve,!0,n),n.dispatch=t,[e,t]},useMemoCache:qg,useCacheRefresh:function(){return si().memoizedState=V2.bind(null,ve)},useEffectEvent:function(e){var t=si(),n={impl:e};return t.memoizedState=n,function(){if((ze&2)!==0)throw Error(St(440));return n.impl.apply(void 0,arguments)}}},pS={readContext:Hn,use:Zh,useCallback:nS,useContext:Hn,useEffect:Zg,useImperativeHandle:eS,useInsertionEffect:Qb,useLayoutEffect:$b,useMemo:iS,useReducer:jf,useRef:Kb,useState:function(){return jf(xr)},useDebugValue:Jg,useDeferredValue:function(e,t){var n=mn();return aS(n,qe.memoizedState,e,t)},useTransition:function(){var e=jf(xr)[0],t=mn().memoizedState;return[typeof e=="boolean"?e:vu(e),t]},useSyncExternalStore:Bb,useId:lS,useHostTransitionStatus:jg,useFormState:P_,useActionState:P_,useOptimistic:function(e,t){var n=mn();return Wb(n,qe,e,t)},useMemoCache:qg,useCacheRefresh:cS,useEffectEvent:jb},X2={readContext:Hn,use:Zh,useCallback:nS,useContext:Hn,useEffect:Zg,useImperativeHandle:eS,useInsertionEffect:Qb,useLayoutEffect:$b,useMemo:iS,useReducer:Zm,useRef:Kb,useState:function(){return Zm(xr)},useDebugValue:Jg,useDeferredValue:function(e,t){var n=mn();return qe===null?Kg(n,e,t):aS(n,qe.memoizedState,e,t)},useTransition:function(){var e=Zm(xr)[0],t=mn().memoizedState;return[typeof e=="boolean"?e:vu(e),t]},useSyncExternalStore:Bb,useId:lS,useHostTransitionStatus:jg,useFormState:z_,useActionState:z_,useOptimistic:function(e,t){var n=mn();return qe!==null?Wb(n,qe,e,t):(n.baseState=e,[e,n.queue.dispatch])},useMemoCache:qg,useCacheRefresh:cS,useEffectEvent:jb};function Jm(e,t,n,i){t=e.memoizedState,n=n(i,t),n=n==null?t:Je({},t,n),e.memoizedState=n,e.lanes===0&&(e.updateQueue.baseState=n)}var B0={enqueueSetState:function(e,t,n){e=e._reactInternals;var i=zi(),a=ts(i);a.payload=t,n!=null&&(a.callback=n),t=es(e,a,i),t!==null&&(Si(t,e,i),Bc(t,e,i))},enqueueReplaceState:function(e,t,n){e=e._reactInternals;var i=zi(),a=ts(i);a.tag=1,a.payload=t,n!=null&&(a.callback=n),t=es(e,a,i),t!==null&&(Si(t,e,i),Bc(t,e,i))},enqueueForceUpdate:function(e,t){e=e._reactInternals;var n=zi(),i=ts(n);i.tag=2,t!=null&&(i.callback=t),t=es(e,i,n),t!==null&&(Si(t,e,n),Bc(t,e,n))}};function B_(e,t,n,i,a,r,s){return e=e.stateNode,typeof e.shouldComponentUpdate=="function"?e.shouldComponentUpdate(i,r,s):t.prototype&&t.prototype.isPureReactComponent?!jc(n,i)||!jc(a,r):!0}function H_(e,t,n,i){e=t.state,typeof t.componentWillReceiveProps=="function"&&t.componentWillReceiveProps(n,i),typeof t.UNSAFE_componentWillReceiveProps=="function"&&t.UNSAFE_componentWillReceiveProps(n,i),t.state!==e&&B0.enqueueReplaceState(t,t.state,null)}function no(e,t){var n=t;if("ref"in t){n={};for(var i in t)i!=="ref"&&(n[i]=t[i])}if(e=e.defaultProps){n===t&&(n=Je({},n));for(var a in e)n[a]===void 0&&(n[a]=e[a])}return n}function mS(e){ph(e)}function gS(e){console.error(e)}function vS(e){ph(e)}function Th(e,t){try{var n=e.onUncaughtError;n(t.value,{componentStack:t.stack})}catch(i){setTimeout(function(){throw i})}}function G_(e,t,n){try{var i=e.onCaughtError;i(n.value,{componentStack:n.stack,errorBoundary:t.tag===1?t.stateNode:null})}catch(a){setTimeout(function(){throw a})}}function H0(e,t,n){return n=ts(n),n.tag=3,n.payload={element:null},n.callback=function(){Th(e,t)},n}function xS(e){return e=ts(e),e.tag=3,e}function yS(e,t,n,i){var a=n.type.getDerivedStateFromError;if(typeof a=="function"){var r=i.value;e.payload=function(){return a(r)},e.callback=function(){G_(t,n,i)}}var s=n.stateNode;s!==null&&typeof s.componentDidCatch=="function"&&(e.callback=function(){G_(t,n,i),typeof a!="function"&&(as===null?as=new Set([this]):as.add(this));var l=i.stack;this.componentDidCatch(i.value,{componentStack:l!==null?l:""})})}function W2(e,t,n,i,a){if(n.flags|=32768,i!==null&&typeof i=="object"&&typeof i.then=="function"){if(t=n.alternate,t!==null&&js(t,n,a,!0),n=Xn.current,n!==null){switch(n.tag){case 31:case 13:case 19:return Kn===null?Uh():n.alternate===null&&dn===0&&(dn=3),n.flags&=-257,n.flags|=65536,n.lanes=a,i===yh?n.flags|=16384:(t=n.updateQueue,t===null?n.updateQueue=new Set([i]):t.add(i),n0(e,i,a)),!1;case 22:return n.flags|=65536,i===yh?n.flags|=16384:(t=n.updateQueue,t===null?(t={transitions:null,markerInstances:null,retryQueue:new Set([i])},n.updateQueue=t):(n=t.retryQueue,n===null?t.retryQueue=new Set([i]):n.add(i)),n0(e,i,a)),!1}throw Error(St(435,n.tag))}return n0(e,i,a),Uh(),!1}if(Me)return t=Xn.current,t!==null?((t.flags&65536)===0&&(t.flags|=256),t.flags|=65536,t.lanes=a,i!==R0&&(e=Error(St(422),{cause:i}),$c(ia(e,n)))):(i!==R0&&(t=Error(St(423),{cause:i}),$c(ia(t,n))),e=e.current.alternate,e.flags|=65536,a&=-a,e.lanes|=a,i=ia(i,n),a=H0(e.stateNode,i,a),Ym(e,a),dn!==4&&(dn=2)),!1;var r=Error(St(520),{cause:i});if(r=ia(r,n),qc===null?qc=[r]:qc.push(r),dn!==4&&(dn=2),t===null)return!0;i=ia(i,n),n=t;do{switch(n.tag){case 3:return n.flags|=65536,e=a&-a,n.lanes|=e,e=H0(n.stateNode,i,e),Ym(n,e),!1;case 1:if(t=n.type,r=n.stateNode,(n.flags&128)===0&&(typeof t.getDerivedStateFromError=="function"||r!==null&&typeof r.componentDidCatch=="function"&&(as===null||!as.has(r))))return n.flags|=65536,a&=-a,n.lanes|=a,a=xS(a),yS(a,e,n,i),Ym(n,a),!1;break;case 22:if(n.memoizedState!==null)return n.flags|=65536,!1}n=n.return}while(n!==null);return!1}var $g=Error(St(461)),yn=!1;function Mn(e,t,n,i){t.child=e===null?Ub(t,null,n,i):to(t,e.child,n,i)}function V_(e,t,n,i,a){n=n.render;var r=t.ref;if("ref"in i){var s={};for(var l in i)l!=="ref"&&(s[l]=i[l])}else s=i;return Qs(t),i=Vg(e,t,n,s,r,a),l=kg(),e!==null&&!yn?(Xg(e,t,a),yr(e,t,a)):(Me&&l&&Wh(t),t.flags|=1,Mn(e,t,i,a),t.child)}function k_(e,t,n,i,a){if(e===null){var r=n.type;return typeof r=="function"&&!Ug(r)&&r.defaultProps===void 0&&n.compare===null?(t.tag=15,t.type=r,_S(e,t,r,i,a)):(e=Zf(n.type,null,i,t,t.mode,a),e.ref=t.ref,e.return=t,t.child=e)}if(r=e.child,!ev(e,a)){var s=r.memoizedProps;if(n=n.compare,n=n!==null?n:jc,n(s,i)&&e.ref===t.ref)return yr(e,t,a)}return t.flags|=1,e=dr(r,i),e.ref=t.ref,e.return=t,t.child=e}function _S(e,t,n,i,a){if(e!==null){var r=e.memoizedProps;if(jc(r,i)&&e.ref===t.ref)if(yn=!1,t.pendingProps=i=r,ev(e,a))(e.flags&131072)!==0&&(yn=!0);else return t.lanes=e.lanes,yr(e,t,a)}return G0(e,t,n,i,a)}function bS(e,t,n,i){var a=i.children,r=e!==null?e.memoizedState:null;if(e===null&&t.stateNode===null&&(t.stateNode={_visibility:1,_pendingMarkers:null,_retryCache:null,_transitions:null}),i.mode==="hidden"){if((t.flags&128)!==0){if(r=r!==null?r.baseLanes|n:n,e!==null){for(i=t.child=e.child,a=0;i!==null;)a=a|i.lanes|i.childLanes,i=i.sibling;i=a&~r}else i=0,t.child=null;return X_(e,t,r,n,i)}if((n&536870912)!==0)t.memoizedState={baseLanes:0,cachePool:null},e!==null&&Kf(t,r!==null?r.cachePool:null),r!==null?L_(t,r):I0(),Pb(t);else return i=t.lanes=536870912,X_(e,t,r!==null?r.baseLanes|n:n,n,i)}else r!==null?(Kf(t,r.cachePool),L_(t,r),is(),t.memoizedState=null):(e!==null&&Kf(t,null),I0(),is());return Mn(e,t,a,n),t.child}function kc(e,t){return e!==null&&e.tag===22||t.stateNode!==null||(t.stateNode={_visibility:1,_pendingMarkers:null,_retryCache:null,_transitions:null}),t.sibling}function X_(e,t,n,i,a){var r=Pg();return r=r===null?null:{parent:xn._currentValue,pool:r},t.memoizedState={baseLanes:n,cachePool:r},e!==null&&Kf(t,null),I0(),Pb(t),e!==null&&js(e,t,i,!0),t.childLanes=a,null}function $f(e,t){return t=jh({mode:t.mode,children:t.children},e.mode),t.ref=e.ref,e.child=t,t.return=e,t}function W_(e,t,n){return to(t,e.child,null,n),e=$f(t,t.pendingProps),e.flags|=2,Ni(t),t.memoizedState=null,e}function q2(e,t,n){var i=t.pendingProps,a=(t.flags&128)!==0;if(t.flags&=-129,e===null){if(Me){if(i.mode==="hidden")return e=$f(t,i),t.lanes=536870912,e.memoizedState={baseLanes:0,cachePool:null},kc(null,e);if(O0(t),(e=Qe)?(e=bM(e,aa),e=e!==null&&e.data==="&"?e:null,e!==null&&(t.memoizedState={dehydrated:e,treeContext:ls!==null?{id:Ha,overflow:Ga}:null,retryLane:536870912,hydrationErrors:null},n=wb(e),n.return=t,t.child=n,Ln=t,Qe=null)):e=null,e===null)throw cs(t);return t.lanes=536870912,null}return $f(t,i)}var r=e.memoizedState;if(r!==null){var s=r.dehydrated;if(O0(t),a)if(t.flags&256)t.flags&=-257,t=W_(e,t,n);else if(t.memoizedState!==null)t.child=e.child,t.flags|=128,t=null;else throw Error(St(558));else if(yn||js(e,t,n,!1),a=(n&e.childLanes)!==0,yn||a){if(us.current===null){if(i=Ze,i!==null&&(s=j1(i,n),s!==0&&s!==r.retryLane))throw r.retryLane=s,oo(e,s),Si(i,e,s),$g;Uh()}t=W_(e,t,n)}else e=r.treeContext,Qe=ra(s.nextSibling),Ln=t,Me=!0,$r=null,aa=!1,e!==null&&Rb(t,e),t=$f(t,i),t.flags|=134221824;return t}return e=dr(e.child,{mode:i.mode,children:i.children}),e.ref=t.ref,t.child=e,e.return=t,e}function zo(e,t){var n=t.ref;if(n===null)e!==null&&e.ref!==null&&(t.flags|=4194816);else{if(typeof n!="function"&&typeof n!="object")throw Error(St(284));(e===null||e.ref!==n)&&(t.flags|=4194816)}}function G0(e,t,n,i,a){return Qs(t),n=Vg(e,t,n,i,void 0,a),i=kg(),e!==null&&!yn?(Xg(e,t,a),yr(e,t,a)):(Me&&i&&Wh(t),t.flags|=1,Mn(e,t,n,a),t.child)}function q_(e,t,n,i,a,r){return Qs(t),t.updateQueue=null,n=Fb(t,i,n,a),zb(e),i=kg(),e!==null&&!yn?(Xg(e,t,r),yr(e,t,r)):(Me&&i&&Wh(t),t.flags|=1,Mn(e,t,n,r),t.child)}function Y_(e,t,n,i,a){if(Qs(t),t.stateNode===null){var r=Zo,s=n.contextType;typeof s=="object"&&s!==null&&(r=Hn(s)),r=new n(i,r),t.memoizedState=r.state!==null&&r.state!==void 0?r.state:null,r.updater=B0,t.stateNode=r,r._reactInternals=t,r=t.stateNode,r.props=i,r.state=t.memoizedState,r.refs={},Fg(t),s=n.contextType,r.context=typeof s=="object"&&s!==null?Hn(s):Zo,r.state=t.memoizedState,s=n.getDerivedStateFromProps,typeof s=="function"&&(Jm(t,n,s,i),r.state=t.memoizedState),typeof n.getDerivedStateFromProps=="function"||typeof r.getSnapshotBeforeUpdate=="function"||typeof r.UNSAFE_componentWillMount!="function"&&typeof r.componentWillMount!="function"||(s=r.state,typeof r.componentWillMount=="function"&&r.componentWillMount(),typeof r.UNSAFE_componentWillMount=="function"&&r.UNSAFE_componentWillMount(),s!==r.state&&B0.enqueueReplaceState(r,r.state,null),Gc(t,i,r,a),Hc(),r.state=t.memoizedState),typeof r.componentDidMount=="function"&&(t.flags|=4194308),i=!0}else if(e===null){r=t.stateNode;var l=t.memoizedProps,o=no(n,l);r.props=o;var c=r.context,u=n.contextType;s=Zo,typeof u=="object"&&u!==null&&(s=Hn(u));var p=n.getDerivedStateFromProps;u=typeof p=="function"||typeof r.getSnapshotBeforeUpdate=="function",l=t.pendingProps!==l,u||typeof r.UNSAFE_componentWillReceiveProps!="function"&&typeof r.componentWillReceiveProps!="function"||(l||c!==s)&&H_(t,r,i,s),Xr=!1;var f=t.memoizedState;r.state=f,Gc(t,i,r,a),Hc(),c=t.memoizedState,l||f!==c||Xr?(typeof p=="function"&&(Jm(t,n,p,i),c=t.memoizedState),(o=Xr||B_(t,n,o,i,f,c,s))?(u||typeof r.UNSAFE_componentWillMount!="function"&&typeof r.componentWillMount!="function"||(typeof r.componentWillMount=="function"&&r.componentWillMount(),typeof r.UNSAFE_componentWillMount=="function"&&r.UNSAFE_componentWillMount()),typeof r.componentDidMount=="function"&&(t.flags|=4194308)):(typeof r.componentDidMount=="function"&&(t.flags|=4194308),t.memoizedProps=i,t.memoizedState=c),r.props=i,r.state=c,r.context=s,i=o):(typeof r.componentDidMount=="function"&&(t.flags|=4194308),i=!1)}else{r=t.stateNode,L0(e,t),s=t.memoizedProps,u=no(n,s),r.props=u,p=t.pendingProps,f=r.context,c=n.contextType,o=Zo,typeof c=="object"&&c!==null&&(o=Hn(c)),l=n.getDerivedStateFromProps,(c=typeof l=="function"||typeof r.getSnapshotBeforeUpdate=="function")||typeof r.UNSAFE_componentWillReceiveProps!="function"&&typeof r.componentWillReceiveProps!="function"||(s!==p||f!==o)&&H_(t,r,i,o),Xr=!1,f=t.memoizedState,r.state=f,Gc(t,i,r,a),Hc();var h=t.memoizedState;s!==p||f!==h||Xr||e!==null&&e.dependencies!==null&&xh(e.dependencies)?(typeof l=="function"&&(Jm(t,n,l,i),h=t.memoizedState),(u=Xr||B_(t,n,u,i,f,h,o)||e!==null&&e.dependencies!==null&&xh(e.dependencies))?(c||typeof r.UNSAFE_componentWillUpdate!="function"&&typeof r.componentWillUpdate!="function"||(typeof r.componentWillUpdate=="function"&&r.componentWillUpdate(i,h,o),typeof r.UNSAFE_componentWillUpdate=="function"&&r.UNSAFE_componentWillUpdate(i,h,o)),typeof r.componentDidUpdate=="function"&&(t.flags|=4),typeof r.getSnapshotBeforeUpdate=="function"&&(t.flags|=1024)):(typeof r.componentDidUpdate!="function"||s===e.memoizedProps&&f===e.memoizedState||(t.flags|=4),typeof r.getSnapshotBeforeUpdate!="function"||s===e.memoizedProps&&f===e.memoizedState||(t.flags|=1024),t.memoizedProps=i,t.memoizedState=h),r.props=i,r.state=h,r.context=o,i=u):(typeof r.componentDidUpdate!="function"||s===e.memoizedProps&&f===e.memoizedState||(t.flags|=4),typeof r.getSnapshotBeforeUpdate!="function"||s===e.memoizedProps&&f===e.memoizedState||(t.flags|=1024),i=!1)}return r=i,zo(e,t),i=(t.flags&128)!==0,r||i?(r=t.stateNode,n=i&&typeof n.getDerivedStateFromError!="function"?null:r.render(),t.flags|=1,e!==null&&i?(t.child=to(t,e.child,null,a),t.child=to(t,null,n,a)):Mn(e,t,n,a),t.memoizedState=r.state,e=t.child):e=yr(e,t,a),e}function Z_(e,t,n,i){return Ks(),t.flags|=256,Mn(e,t,n,i),t.child}var V0={dehydrated:null,treeContext:null,retryLane:0,hydrationErrors:null};function k0(e){return{baseLanes:e,cachePool:Db()}}function X0(e,t,n){return e=e!==null?e.childLanes&~n:0,t&&(e|=Ui),e}function SS(e,t,n){var i=t.pendingProps,a=!1,r=(t.flags&128)!==0,s;if((s=r)||(s=e!==null&&e.memoizedState===null?!1:(Vn.current&2)!==0),s&&(a=!0,t.flags&=-129),s=(t.flags&32)!==0,t.flags&=-33,e===null){if(Me){if(a?ns(t):is(),(e=Qe)?(e=bM(e,aa),e=e!==null&&e.data!=="&"?e:null,e!==null&&(t.memoizedState={dehydrated:e,treeContext:ls!==null?{id:Ha,overflow:Ga}:null,retryLane:536870912,hydrationErrors:null},n=wb(e),n.return=t,t.child=n,Ln=t,Qe=null)):e=null,e===null)throw cs(t);return dv(e)?t.lanes=32:t.lanes=536870912,null}return r=i.children,i=i.fallback,a?(is(),a=t.mode,r=jh({mode:"hidden",children:r},a),i=qs(i,a,n,null),r.return=t,i.return=t,r.sibling=i,t.child=r,i=t.child,i.memoizedState=k0(n),i.childLanes=X0(e,s,n),t.memoizedState=V0,kc(null,i)):(ns(t),tv(t,r))}var l=e.memoizedState;if(l!==null){var o=l.dehydrated;if(o!==null)return Y2(e,t,r,s,i,o,l,n)}return a?(is(),a=i.fallback,r=t.mode,l=e.child,o=l.sibling,i=dr(l,{mode:"hidden",children:i.children}),i.subtreeFlags=l.subtreeFlags&1206910976,o!==null?a=dr(o,a):(a=qs(a,r,n,null),a.flags|=2),a.return=t,i.return=t,i.sibling=a,t.child=i,kc(null,i),i=t.child,a=e.child.memoizedState,a===null?a=k0(n):(r=a.cachePool,r!==null?(l=xn._currentValue,r=r.parent!==l?{parent:l,pool:l}:r):r=Db(),a={baseLanes:a.baseLanes|n,cachePool:r}),i.memoizedState=a,i.childLanes=X0(e,s,n),t.memoizedState=V0,kc(e.child,i)):(ns(t),n=e.child,e=n.sibling,n=dr(n,{mode:"visible",children:i.children}),n.return=t,n.sibling=null,e!==null&&(s=t.deletions,s===null?(t.deletions=[e],t.flags|=16):s.push(e)),t.child=n,t.memoizedState=null,n)}function tv(e,t){return t=jh({mode:"visible",children:t},e.mode),t.return=e,e.child=t}function jh(e,t){return e=bi(22,e,null,t),e.lanes=0,e}function If(e,t,n){return to(t,e.child,null,n),e=tv(t,t.pendingProps.children),e.flags|=2,t.memoizedState=null,e}function Y2(e,t,n,i,a,r,s,l){if(n)return t.flags&256?(ns(t),t.flags&=-257,If(e,t,l)):t.memoizedState!==null?(is(),t.child=e.child,t.flags|=128,null):(is(),r=a.fallback,s=t.mode,a=jh({mode:"visible",children:a.children},s),r=qs(r,s,l,null),r.flags|=2,a.return=t,r.return=t,a.sibling=r,t.child=a,to(t,e.child,null,l),a=t.child,a.memoizedState=k0(l),a.childLanes=X0(e,i,l),t.memoizedState=V0,kc(null,a));if(ns(t),dv(r)){if(i=r.nextSibling&&r.nextSibling.dataset,i)var o=i.dgst;return i=o,i!==""&&(a=Error(St(419)),a.stack="",a.digest=i,$c({value:a,source:null,stack:null})),If(e,t,l)}if(yn||js(e,t,l,!1),i=(l&e.childLanes)!==0,yn||i){if(us.current!==null)return If(e,t,l);if(i=Ze,i!==null&&(a=j1(i,l),a!==0&&a!==s.retryLane))throw s.retryLane=a,oo(e,a),Si(i,e,a),$g;return mg(r)||Uh(),If(e,t,l)}return mg(r)?(t.flags|=192,t.child=e.child,null):(e=s.treeContext,Qe=ra(r.nextSibling),Ln=t,Me=!0,$r=null,aa=!1,e!==null&&Rb(t,e),t=tv(t,a.children),t.flags|=134221824,t)}function J_(e,t,n){e.lanes|=t;var i=e.alternate;i!==null&&(i.lanes|=t),Jf(e.return,t,n)}function K_(e){for(var t=null;e!==null;){var n=e.alternate;n!==null&&bh(n)===null&&(t=e),e=e.sibling}return t}function Of(e,t,n,i,a,r){var s=e.memoizedState;s===null?e.memoizedState={isBackwards:t,rendering:null,renderingStartTime:0,last:i,tail:n,tailMode:a,treeForkCount:r}:(s.isBackwards=t,s.rendering=null,s.renderingStartTime=0,s.last=i,s.tail=n,s.tailMode=a,s.treeForkCount=r)}function Km(e){var t=e.child;for(e.child=null;t!==null;){var n=t.sibling;t.sibling=e.child,e.child=t,t=n}}function W0(e,t,n){var i=t.pendingProps,a=i.revealOrder,r=i.tail;i=i.children;var s=Vn.current;if(t.flags&128)return eu(t,s),null;var l=(s&2)!==0;if(l?(s=s&1|2,t.flags|=128):s&=1,eu(t,s),a==="backwards"&&e!==null?(Km(e),Mn(e,t,i,n),Km(e)):Mn(e,t,i,n),i=Me?Qc:0,!l&&e!==null&&(e.flags&128)!==0)t:for(e=t.child;e!==null;){if(e.tag===13)e.memoizedState!==null&&J_(e,n,t);else if(e.tag===19)J_(e,n,t);else if(e.child!==null){e.child.return=e,e=e.child;continue}if(e===t)break t;for(;e.sibling===null;){if(e.return===null||e.return===t)break t;e=e.return}e.sibling.return=e.return,e=e.sibling}switch(a){case"backwards":n=K_(t.child),n===null?(a=t.child,t.child=null):(a=n.sibling,n.sibling=null,Km(t)),Of(t,!0,a,null,r,i);break;case"unstable_legacy-backwards":for(n=null,a=t.child,t.child=null;a!==null;){if(e=a.alternate,e!==null&&bh(e)===null){t.child=a;break}e=a.sibling,a.sibling=n,n=a,a=e}Of(t,!0,n,null,r,i);break;case"together":Of(t,!1,null,null,void 0,i);break;case"independent":t.memoizedState=null;break;default:n=K_(t.child),n===null?(a=t.child,t.child=null):(a=n.sibling,n.sibling=null),Of(t,!1,a,n,r,i)}return t.child}function j_(e,t,n){var i=t.pendingProps;return Zr(t,t.type,i.value),Mn(e,t,i.children,n),t.child}function yr(e,t,n){if(e!==null&&(t.dependencies=e.dependencies),hs|=t.lanes,(n&t.childLanes)===0)if(e!==null){if(js(e,t,n,!1),(n&t.childLanes)===0)return null}else return null;if(e!==null&&t.child!==e.child)throw Error(St(153));if(t.child!==null){for(e=t.child,n=dr(e,e.pendingProps),t.child=n,n.return=t;e.sibling!==null;)e=e.sibling,n=n.sibling=dr(e,e.pendingProps),n.return=t;n.sibling=null}return t.child}function ev(e,t){return(e.lanes&t)!==0?!0:(e=e.dependencies,!!(e!==null&&xh(e)))}function Z2(e,t,n){switch(t.tag){case 3:uh(t,t.stateNode.containerInfo),Zr(t,xn,e.memoizedState.cache),Ks();break;case 27:case 5:x0(t);break;case 4:uh(t,t.stateNode.containerInfo);break;case 10:Zr(t,t.type,t.memoizedProps.value);break;case 31:if(t.memoizedState!==null)return t.flags|=128,O0(t),null;break;case 13:var i=t.memoizedState;if(i!==null){if(i.dehydrated!==null)return ns(t),t.flags|=128,null;i=js(e,t,n,!1);var a=t.child.childLanes;return i||(n&a)!==0?SS(e,t,n):(ns(t),e=yr(e,t,n),e!==null?e.sibling:null)}ns(t);break;case 19:if(t.flags&128)return W0(e,t,n);if(a=(e.flags&128)!==0,i=(n&t.childLanes)!==0,i||(js(e,t,n,!1),i=(n&t.childLanes)!==0),a){if(i)return W0(e,t,n);t.flags|=128}if(a=t.memoizedState,a!==null&&(a.rendering=null,a.tail=null,a.lastEffect=null),eu(t,Vn.current),i)break;return null;case 22:return t.lanes=0,bS(e,t,n,t.pendingProps);case 24:Zr(t,xn,e.memoizedState.cache)}return yr(e,t,n)}function MS(e,t,n){if(e!==null)if(e.memoizedProps!==t.pendingProps)yn=!0;else{if(!ev(e,n)&&(t.flags&128)===0)return yn=!1,Z2(e,t,n);yn=(e.flags&131072)!==0}else yn=!1,Me&&(t.flags&1048576)!==0&&Ab(t,Qc,t.index);switch(t.lanes=0,t.tag){case 16:t:{var i=t.pendingProps;if(e=Gs(t.elementType),t.type=e,typeof e=="function")Ug(e)?(i=no(e,i),t.tag=1,t=Y_(null,t,e,i,n)):(t.tag=0,t=G0(null,t,e,i,n));else{if(e!=null){var a=e.$$typeof;if(a===_g){t.tag=11,t=V_(null,t,e,i,n);break t}else if(a===bg){t.tag=14,t=k_(null,t,e,i,n);break t}else if(a===Fa){t.tag=10,t.type=e,t=j_(null,t,n);break t}}throw t=g0(e)||e,Error(St(306,t,""))}}return t;case 0:return G0(e,t,t.type,t.pendingProps,n);case 1:return i=t.type,a=no(i,t.pendingProps),Y_(e,t,i,a,n);case 3:t:{if(uh(t,t.stateNode.containerInfo),e===null)throw Error(St(387));i=t.pendingProps;var r=t.memoizedState;a=r.element,L0(e,t),Gc(t,i,null,n);var s=t.memoizedState;if(i=s.cache,Zr(t,xn,i),i!==r.cache&&D0(t,[xn],n,!0),Hc(),i=s.element,r.isDehydrated)if(r={element:i,isDehydrated:!1,cache:s.cache},t.updateQueue.baseState=r,t.memoizedState=r,t.flags&256){t=Z_(e,t,i,n);break t}else if(i!==a){a=ia(Error(St(424)),t),$c(a),t=Z_(e,t,i,n);break t}else for(e=t.stateNode.containerInfo,e.nodeType===9?e=e.body:e=e.nodeName==="HTML"?e.ownerDocument.body:e,Qe=ra(e.firstChild),Ln=t,Me=!0,$r=null,aa=!0,n=Ub(t,null,i,n),t.child=n;n;)n.flags=n.flags&-3|134221824,n=n.sibling;else{if(Ks(),i===a){t=yr(e,t,n);break t}Mn(e,t,i,n)}t=t.child}return t;case 26:return zo(e,t),e===null?(n=E1(t.type,null,t.pendingProps,null))?t.memoizedState=n:Me||(t.stateNode=hM(t.type,t.pendingProps,Qr.current,t)):t.memoizedState=E1(t.type,e.memoizedProps,t.pendingProps,e.memoizedState),null;case 27:return x0(t),e===null&&Me&&(i=t.stateNode=SM(t.type,t.pendingProps,Qr.current),Ln=t,aa=!0,a=Qe,ps(t.type)?(gg=a,Qe=ra(i.firstChild)):Qe=a),Mn(e,t,t.pendingProps.children,n),zo(e,t),e===null&&(t.flags|=4194304),t.child;case 5:return e===null&&Me&&((a=i=Qe)&&(i=HR(i,t.type,t.pendingProps,aa),i!==null?(t.stateNode=i,Ln=t,Qe=ra(i.firstChild),aa=!1,a=!0):a=!1),a||cs(t)),x0(t),a=t.type,r=t.pendingProps,s=e!==null?e.memoizedProps:null,i=r.children,hg(a,r)?i=null:s!==null&&hg(a,s)&&(t.flags|=32),t.memoizedState!==null&&(a=Vg(e,t,z2,null,null,n),xl._currentValue=a),zo(e,t),Mn(e,t,i,n),t.child;case 6:return e===null&&Me&&((e=n=Qe)&&(n=GR(n,t.pendingProps,aa),n!==null?(t.stateNode=n,Ln=t,Qe=null,e=!0):e=!1),e||cs(t)),null;case 13:return SS(e,t,n);case 4:return uh(t,t.stateNode.containerInfo),i=t.pendingProps,e===null?t.child=to(t,null,i,n):Mn(e,t,i,n),t.child;case 11:return V_(e,t,t.type,t.pendingProps,n);case 7:return i=t.pendingProps,zo(e,t),Mn(e,t,i,n),t.child;case 8:return Mn(e,t,t.pendingProps.children,n),t.child;case 12:return Mn(e,t,t.pendingProps.children,n),t.child;case 10:return j_(e,t,n);case 9:return a=t.type._context,i=t.pendingProps.children,Qs(t),a=Hn(a),i=i(a),t.flags|=1,Mn(e,t,i,n),t.child;case 14:return k_(e,t,t.type,t.pendingProps,n);case 15:return _S(e,t,t.type,t.pendingProps,n);case 19:return W0(e,t,n);case 31:return q2(e,t,n);case 22:return bS(e,t,n,t.pendingProps);case 24:return Qs(t),i=Hn(xn),e===null?(a=Pg(),a===null&&(a=Ze,r=Og(),a.pooledCache=r,r.refCount++,r!==null&&(a.pooledCacheLanes|=n),a=r),t.memoizedState={parent:i,cache:a},Fg(t),Zr(t,xn,a)):((e.lanes&n)!==0&&(L0(e,t),Gc(t,null,null,n),Hc()),a=e.memoizedState,r=t.memoizedState,a.parent!==i?(a={parent:i,cache:i},t.memoizedState=a,t.lanes===0&&(t.memoizedState=t.updateQueue.baseState=a),Zr(t,xn,i)):(i=r.cache,Zr(t,xn,i),i!==a.cache&&D0(t,[xn],n,!0))),Mn(e,t,t.pendingProps.children,n),t.child;case 30:return t.stateNode===null&&(t.stateNode={autoName:null,paired:null,clones:null,ref:null}),i=t.pendingProps,i.name!=null&&i.name!=="auto"?t.flags|=e===null?18882560:18874368:Me&&Wh(t),e!==null&&e.memoizedProps.name!==i.name?t.flags|=4194816:zo(e,t),Mn(e,t,i.children,n),t.child;case 29:throw t.pendingProps}throw Error(St(156,t.tag))}function ur(e){e.flags|=4}function jm(e,t,n,i,a){var r;if((r=(e.mode&32)!==0)&&(r=n===null?A1(t,i):A1(t,i)&&(i.src!==n.src||i.srcSet!==n.srcSet)),r){if(e.flags|=16777216,(a&335544128)===a)if(e.stateNode.complete)e.flags|=8192;else if(QS())e.flags|=8192;else throw Zs=yh,zg}else e.flags&=-16777217}function Q_(e,t){if(t.type!=="stylesheet"||(t.state.loading&4)!==0)e.flags&=-16777217;else if(e.flags|=16777216,!wM(t))if(QS())e.flags|=8192;else throw Zs=yh,zg}function Pf(e,t){t!==null&&(e.flags|=4),e.flags&16384&&(t=e.tag!==22?Z1():536870912,e.lanes|=t,hl|=t)}function wc(e,t){if(!Me)switch(e.tailMode){case"visible":break;case"collapsed":for(var n=e.tail,i=null;n!==null;)n.alternate!==null&&(i=n),n=n.sibling;i===null?t||e.tail===null?e.tail=null:e.tail.sibling=null:i.sibling=null;break;default:for(t=e.tail,n=null;t!==null;)t.alternate!==null&&(n=t),t=t.sibling;n===null?e.tail=null:n.sibling=null}}function je(e){var t=e.alternate!==null&&e.alternate.child===e.child,n=0,i=0;if(t)for(var a=e.child;a!==null;)n|=a.lanes|a.childLanes,i|=a.subtreeFlags&1206910976,i|=a.flags&1206910976,a.return=e,a=a.sibling;else for(a=e.child;a!==null;)n|=a.lanes|a.childLanes,i|=a.subtreeFlags,i|=a.flags,a.return=e,a=a.sibling;return e.subtreeFlags|=i,e.childLanes=n,t}function J2(e,t,n){var i=t.pendingProps;switch(Ig(t),t.tag){case 16:case 15:case 0:case 11:case 7:case 8:case 12:case 9:case 14:return je(t),null;case 1:return je(t),null;case 3:return n=t.stateNode,i=null,e!==null&&(i=e.memoizedState.cache),t.memoizedState.cache!==i&&(t.flags|=2048),pr(xn),ll(),n.pendingContext&&(n.context=n.pendingContext,n.pendingContext=null),(e===null||e.child===null)&&(Oo(t)?ur(t):e===null||e.memoizedState.isDehydrated&&(t.flags&256)===0||(t.flags|=1024,qm())),je(t),null;case 26:var a=t.type,r=t.memoizedState;return e===null?(ur(t),r!==null?(je(t),Q_(t,r)):(je(t),jm(t,a,null,i,n))):r?r!==e.memoizedState?(ur(t),je(t),Q_(t,r)):(je(t),t.flags&=-16777217):(e=e.memoizedProps,e!==i&&ur(t),je(t),jm(t,a,e,i,n)),null;case 27:if(fh(t),n=Qr.current,a=t.type,e!==null&&t.stateNode!=null)e.memoizedProps!==i&&ur(t);else{if(!i){if(t.stateNode===null)throw Error(St(166));return je(t),t.subtreeFlags&=-33554433,null}e=Va.current,Oo(t)?T_(t,e):(e=SM(a,i,n),t.stateNode=e,ur(t))}return je(t),t.subtreeFlags&=-33554433,null;case 5:if(fh(t),a=t.type,e!==null&&t.stateNode!=null)e.memoizedProps!==i&&ur(t);else{if(!i){if(t.stateNode===null)throw Error(St(166));return je(t),t.subtreeFlags&=-33554433,null}if(r=Va.current,Oo(t))T_(t,r);else{var s=ru(Qr.current);switch(r){case 1:r=s.createElementNS("http://www.w3.org/2000/svg",a);break;case 2:r=s.createElementNS("http://www.w3.org/1998/Math/MathML",a);break;default:switch(a){case"svg":r=s.createElementNS("http://www.w3.org/2000/svg",a);break;case"math":r=s.createElementNS("http://www.w3.org/1998/Math/MathML",a);break;case"script":r=s.createElement("div"),r.innerHTML="<script><\/script>",r=r.removeChild(r.firstChild);break;case"select":r=typeof i.is=="string"?s.createElement("select",{is:i.is}):s.createElement("select"),i.multiple?r.multiple=!0:i.size&&(r.size=i.size);break;default:r=typeof i.is=="string"?s.createElement(a,{is:i.is}):s.createElement(a)}}r[Bn]=t,r[Ei]=i;t:for(s=t.child;s!==null;){if(s.tag===5||s.tag===6)r.appendChild(s.stateNode);else if(s.tag!==4&&s.tag!==27&&s.child!==null){s.child.return=s,s=s.child;continue}if(s===t)break t;for(;s.sibling===null;){if(s.return===null||s.return===t)break t;s=s.return}s.sibling.return=s.return,s=s.sibling}t.stateNode=r;t:switch(kn(r,a,i),a){case"button":case"input":case"select":case"textarea":i=!!i.autoFocus;break t;case"img":i=!0;break t;default:i=!1}i&&ur(t)}}return je(t),t.subtreeFlags&=-33554433,jm(t,t.type,e===null?null:e.memoizedProps,t.pendingProps,n),null;case 6:if(e&&t.stateNode!=null)e.memoizedProps!==i&&ur(t);else{if(typeof i!="string"&&t.stateNode===null)throw Error(St(166));if(e=Qr.current,Oo(t)){if(e=t.stateNode,n=t.memoizedProps,i=null,a=Ln,a!==null)switch(a.tag){case 27:case 5:i=a.memoizedProps}e[Bn]=t,e=!!(e.nodeValue===n||i!==null&&i.suppressHydrationWarning===!0||uM(e.nodeValue,n)),e||cs(t,!0)}else e=ru(e).createTextNode(i),e[Bn]=t,t.stateNode=e}return je(t),null;case 31:if(n=t.memoizedState,e===null||e.memoizedState!==null){if(i=Oo(t),n!==null){if(e===null){if(!i)throw Error(St(318));if(e=t.memoizedState,e=e!==null?e.dehydrated:null,!e)throw Error(St(557));e[Bn]=t}else Ks(),(t.flags&128)===0&&(t.memoizedState=null),t.flags|=4;je(t),e=!1}else n=qm(),e!==null&&e.memoizedState!==null&&(e.memoizedState.hydrationErrors=n),e=!0;if(!e)return t.flags&256?(Ni(t),t):(Ni(t),null);if((t.flags&128)!==0)throw Error(St(558))}return je(t),null;case 13:if(i=t.memoizedState,e===null||e.memoizedState!==null&&e.memoizedState.dehydrated!==null){if(a=Oo(t),i!==null&&i.dehydrated!==null){if(e===null){if(!a)throw Error(St(318));if(a=t.memoizedState,a=a!==null?a.dehydrated:null,!a)throw Error(St(317));a[Bn]=t}else Ks(),(t.flags&128)===0&&(t.memoizedState=null),t.flags|=4;je(t),a=!1}else a=qm(),e!==null&&e.memoizedState!==null&&(e.memoizedState.hydrationErrors=a),a=!0;if(!a)return t.flags&256?(Ni(t),t):(Ni(t),null)}return Ni(t),(t.flags&128)!==0?(t.lanes=n,t):(n=i!==null,e=e!==null&&e.memoizedState!==null,n&&(i=t.child,a=null,i.alternate!==null&&i.alternate.memoizedState!==null&&i.alternate.memoizedState.cachePool!==null&&(a=i.alternate.memoizedState.cachePool.pool),r=null,i.memoizedState!==null&&i.memoizedState.cachePool!==null&&(r=i.memoizedState.cachePool.pool),r!==a&&(i.flags|=2048)),n!==e&&n&&(t.child.flags|=8192),Pf(t,t.updateQueue),je(t),null);case 4:return ll(),e===null&&uv(t.stateNode.containerInfo),t.flags|=67108864,je(t),null;case 10:return pr(t.type),je(t),null;case 19:if(Hg(t),i=t.memoizedState,i===null)return je(t),null;if(a=(t.flags&128)!==0,r=i.rendering,r===null)if(a)wc(i,!1);else{if(dn!==0||e!==null&&(e.flags&128)!==0)for(e=t.child;e!==null;){if(r=bh(e),r!==null){for(t.flags|=128,wc(i,!1),e=r.updateQueue,t.updateQueue=e,Pf(t,e),t.subtreeFlags=0,e=n,n=t.child;n!==null;)Tb(n,e),n=n.sibling;return eu(t,Vn.current&1|2),Me&&fr(t,i.treeForkCount),t.child}e=e.sibling}i.tail!==null&&Ii()>Nh&&(t.flags|=128,a=!0,wc(i,!1),t.lanes=4194304)}else{if(!a)if(e=bh(r),e!==null){if(t.flags|=128,a=!0,e=e.updateQueue,t.updateQueue=e,Pf(t,e),wc(i,!0),i.tail===null&&i.tailMode!=="collapsed"&&i.tailMode!=="visible"&&!r.alternate&&!Me)return je(t),null}else 2*Ii()-i.renderingStartTime>Nh&&n!==536870912&&(t.flags|=128,a=!0,wc(i,!1),t.lanes=4194304);i.isBackwards?(r.sibling=t.child,t.child=r):(e=i.last,e!==null?e.sibling=r:t.child=r,i.last=r)}if(i.tail!==null){e=i.tail;t:{for(n=e;n!==null;){if(n.alternate!==null){n=!1;break t}n=n.sibling}n=!0}return i.rendering=e,i.tail=e.sibling,i.renderingStartTime=Ii(),e.sibling=null,r=Vn.current,r=a?r&1|2:r&1,i.tailMode==="visible"||i.tailMode==="collapsed"||!n||Me?eu(t,r):(n=r,$e(Xn,t),$e(Vn,n),Kn===null&&(Kn=t)),Me&&fr(t,i.treeForkCount),e}return je(t),null;case 22:case 23:return Ni(t),Bg(),i=t.memoizedState!==null,e!==null?e.memoizedState!==null!==i&&(t.flags|=8192):i&&(t.flags|=8192),i?(n&536870912)!==0&&(t.flags&128)===0&&(je(t),t.subtreeFlags&6&&(t.flags|=8192)):je(t),n=t.updateQueue,n!==null&&Pf(t,n.retryQueue),n=null,e!==null&&e.memoizedState!==null&&e.memoizedState.cachePool!==null&&(n=e.memoizedState.cachePool.pool),i=null,t.memoizedState!==null&&t.memoizedState.cachePool!==null&&(i=t.memoizedState.cachePool.pool),i!==n&&(t.flags|=2048),e!==null&&Gn(Ys),null;case 24:return n=null,e!==null&&(n=e.memoizedState.cache),t.memoizedState.cache!==n&&(t.flags|=2048),pr(xn),je(t),null;case 25:return null;case 30:return t.flags|=33554432,je(t),null}throw Error(St(156,t.tag))}function K2(e,t){switch(Ig(t),t.tag){case 1:return e=t.flags,e&65536?(t.flags=e&-65537|128,t):null;case 3:return pr(xn),ll(),e=t.flags,(e&65536)!==0&&(e&128)===0?(t.flags=e&-65537|128,t):null;case 26:case 27:case 5:return fh(t),null;case 31:if(t.memoizedState!==null){if(Ni(t),t.alternate===null)throw Error(St(340));Ks()}return e=t.flags,e&65536?(t.flags=e&-65537|128,t):null;case 13:if(Ni(t),e=t.memoizedState,e!==null&&e.dehydrated!==null){if(t.alternate===null)throw Error(St(340));Ks()}return e=t.flags,e&65536?(t.flags=e&-65537|128,t):null;case 19:return Hg(t),e=t.flags,e&65536?(t.flags=e&-65537|128,e=t.memoizedState,e!==null&&(e.rendering=null,e.tail=null),t.flags|=4,t):null;case 4:return ll(),null;case 10:return pr(t.type),null;case 22:case 23:return Ni(t),Bg(),e!==null&&Gn(Ys),e=t.flags,e&65536?(t.flags=e&-65537|128,t):null;case 24:return pr(xn),null;case 25:return null;default:return null}}function ES(e,t){switch(Ig(t),t.tag){case 3:pr(xn),ll();break;case 26:case 27:case 5:fh(t);break;case 4:ll();break;case 31:t.memoizedState!==null&&Ni(t);break;case 13:Ni(t);break;case 19:Hg(t);break;case 10:pr(t.type);break;case 22:case 23:Ni(t),Bg(),e!==null&&Gn(Ys);break;case 24:pr(xn)}}function xu(e,t){try{var n=t.updateQueue,i=n!==null?n.lastEffect:null;if(i!==null){var a=i.next;n=a;do{if((n.tag&e)===e){i=void 0;var r=n.create,s=n.inst;i=r(),s.destroy=i}n=n.next}while(n!==a)}}catch(l){Xe(t,t.return,l)}}function fs(e,t,n){try{var i=t.updateQueue,a=i!==null?i.lastEffect:null;if(a!==null){var r=a.next;i=r;do{if((i.tag&e)===e){var s=i.inst,l=s.destroy;if(l!==void 0){s.destroy=void 0,a=t;var o=n,c=l;try{c()}catch(u){Xe(a,o,u)}}}i=i.next}while(i!==r)}}catch(u){Xe(t,t.return,u)}}function TS(e){var t=e.updateQueue;if(t!==null){var n=e.stateNode;try{Ob(t,n)}catch(i){Xe(e,e.return,i)}}}function wS(e,t,n){n.props=no(e.type,e.memoizedProps),n.state=e.memoizedState;try{n.componentWillUnmount()}catch(i){Xe(e,t,i)}}function Pa(e,t){try{var n=e.ref;if(n!==null){switch(e.tag){case 26:case 27:case 5:var i=e.stateNode;break;case 30:var a=e.stateNode,r=gr(e.memoizedProps,a);(a.ref===null||a.ref.name!==r)&&(a.ref=gM(r)),i=a.ref;break;case 7:if(e.stateNode===null){var s=new Bi(e);Mi(e.child,!1,FR,s,void 0,void 0),e.stateNode=s}i=e.stateNode;break;default:i=e.stateNode}typeof n=="function"?e.refCleanup=n(i):n.current=i}}catch(l){Xe(e,t,l)}}function Fn(e,t){var n=e.ref,i=e.refCleanup;if(n!==null)if(typeof i=="function")try{i()}catch(a){Xe(e,t,a)}finally{e.refCleanup=null,e=e.alternate,e!=null&&(e.refCleanup=null)}else if(typeof n=="function")try{n(null)}catch(a){Xe(e,t,a)}else n.current=null}function wh(e,t){if((e.tag===5||e.tag===27||e.tag===6)&&e.alternate===null&&t!==null)for(var n=0;n<t.length;n++)_M(e.stateNode,t[n])}function $_(e){for(var t=e.return;t!==null&&(iv(t)&&_M(e.stateNode,t.stateNode),!nv(t));)t=t.return}function Xc(e){for(var t=e.return;t!==null&&(iv(t)&&BR(e.stateNode,t.stateNode),!nv(t));)t=t.return}function nv(e){return e.tag===5||e.tag===3||e.tag===27}function iv(e){return e&&e.tag===7&&e.stateNode!==null}function q0(e){var t=e.type,n=e.memoizedProps,i=e.stateNode;try{t:switch(t){case"button":case"input":case"select":case"textarea":n.autoFocus&&i.focus();break t;case"img":n.src?i.src=n.src:n.srcSet&&(i.srcset=n.srcSet)}}catch(a){Xe(e,e.return,a)}}function Qm(e,t,n){try{var i=e.stateNode;_R(i,e.type,n,t),i[Ei]=t}catch(a){Xe(e,e.return,a)}}function AS(e){return e.tag===5||e.tag===3||e.tag===26||e.tag===27&&ps(e.type)||e.tag===4}function $m(e){t:for(;;){for(;e.sibling===null;){if(e.return===null||AS(e.return))return null;e=e.return}for(e.sibling.return=e.return,e=e.sibling;e.tag!==5&&e.tag!==6&&e.tag!==18;){if(e.tag===27&&ps(e.type)||e.flags&2||e.child===null||e.tag===4)continue t;e.child.return=e,e=e.child}if(!(e.flags&2))return e.stateNode}}function Y0(e,t,n,i){var a=e.tag;if(a===5||a===6)a=e.stateNode,t?(n.nodeType===9?n.body:n.nodeName==="HTML"?n.ownerDocument.body:n).insertBefore(a,t):(t=n.nodeType===9?n.body:n.nodeName==="HTML"?n.ownerDocument.body:n,t.appendChild(a),n=n._reactRootContainer,n!=null||t.onclick!==null||(t.onclick=Ba)),wh(e,i),Oe=!0;else if(a!==4&&(a===27&&(wh(e,i),i=null,ps(e.type)&&(n=e.stateNode,t=null)),e=e.child,e!==null))for(Y0(e,t,n,i),e=e.sibling;e!==null;)Y0(e,t,n,i),e=e.sibling}function Ah(e,t,n,i){var a=e.tag;if(a===5||a===6)a=e.stateNode,t?n.insertBefore(a,t):n.appendChild(a),wh(e,i),Oe=!0;else if(a!==4&&(a===27&&(wh(e,i),i=null,ps(e.type)&&(n=e.stateNode)),e=e.child,e!==null))for(Ah(e,t,n,i),e=e.sibling;e!==null;)Ah(e,t,n,i),e=e.sibling}function RS(e){var t=e.stateNode,n=e.memoizedProps;try{for(var i=e.type,a=t.attributes;a.length;)t.removeAttributeNode(a[0]);kn(t,i,n),t[Bn]=e,t[Ei]=n}catch(r){Xe(e,e.return,r)}}var Rh=!1,Li=null;function t1(e){(e.tag===30||(e.subtreeFlags&33554432)!==0)&&(Rh=!0)}var za=null;function e1(){var e=za;return za=null,e}var _i=0;function El(e,t,n,i,a){return _i=0,CS(e.child,t,n,i,a)}function CS(e,t,n,i,a){for(var r=!1;e!==null;){if(e.tag===5){var s=e.stateNode;if(i!==null){var l=dg(s);i.push(l),l.view&&(r=!0)}else r||dg(s).view&&(r=!0);Rh=!0,dM(s,_i===0?t:t+"_"+_i,n),_i++}else(e.tag!==22||e.memoizedState===null)&&(e.tag===30&&a||CS(e.child,t,n,i,a)&&(r=!0));e=e.sibling}return r}function Xa(e,t){for(;e!==null;)e.tag===5?pM(e.stateNode,e.memoizedProps):(e.tag!==22||e.memoizedState===null)&&(e.tag===30&&t||Xa(e.child,t)),e=e.sibling}function th(e){if((e.subtreeFlags&18874368)!==0)for(e=e.child;e!==null;){if((e.tag!==22||e.memoizedState===null)&&(th(e),e.tag===30&&(e.flags&18874368)!==0&&e.stateNode.paired)){var t=e.memoizedProps;if(t.name==null||t.name==="auto")throw Error(St(544));var n=t.name;t=Sr(t.default,t.share),t!=="none"&&(El(e,n,t,null,!1)||Xa(e.child,!1))}e=e.sibling}}function Z0(e,t){if(e.tag===30){var n=e.stateNode,i=e.memoizedProps,a=gr(i,n),r=Sr(i.default,n.paired?i.share:i.enter);r!=="none"?El(e,a,r,null,!1)?(th(e),n.paired||t||dl(e,i.onEnter)):Xa(e.child,!1):th(e)}else if((e.subtreeFlags&33554432)!==0)for(e=e.child;e!==null;)Z0(e,t),e=e.sibling;else th(e)}function J0(e){if(Li!==null&&Li.size!==0){var t=Li;if((e.subtreeFlags&18874368)!==0)for(e=e.child;e!==null;){if(e.tag!==22||e.memoizedState===null){if(e.tag===30&&(e.flags&18874368)!==0){var n=e.memoizedProps,i=n.name;if(i!=null&&i!=="auto"){var a=t.get(i);if(a!==void 0){var r=Sr(n.default,n.share);if(r!=="none"&&(El(e,i,r,null,!1)?(r=e.stateNode,a.paired=r,r.paired=a,dl(e,n.onShare)):Xa(e.child,!1)),t.delete(i),t.size===0)break}}}J0(e)}e=e.sibling}}}function K0(e){if(e.tag===30){var t=e.memoizedProps,n=gr(t,e.stateNode),i=Li!==null?Li.get(n):void 0,a=Sr(t.default,i!==void 0?t.share:t.exit);a!=="none"&&(El(e,n,a,null,!1)?i!==void 0?(a=e.stateNode,i.paired=a,a.paired=i,Li.delete(n),dl(e,t.onShare)):dl(e,t.onExit):Xa(e.child,!1)),Li!==null&&J0(e)}else if((e.subtreeFlags&33554432)!==0)for(e=e.child;e!==null;)K0(e),e=e.sibling;else Li!==null&&J0(e)}function DS(e){for(e=e.child;e!==null;){if(e.tag===30){var t=e.memoizedProps,n=gr(t,e.stateNode);t=Sr(t.default,t.update),e.flags&=-5,t!=="none"&&El(e,n,t,e.memoizedState=[],!1)}else(e.subtreeFlags&33554432)!==0&&DS(e);e=e.sibling}}function j0(e){if((e.subtreeFlags&18874368)!==0)for(e=e.child;e!==null;){if(e.tag!==22||e.memoizedState===null){if(e.tag===30&&(e.flags&18874368)!==0){var t=e.stateNode;t.paired!==null&&(t.paired=null,Xa(e.child,!1))}j0(e)}e=e.sibling}}function eh(e){if(e.tag===30)e.stateNode.paired=null,Xa(e.child,!1),j0(e);else if((e.subtreeFlags&33554432)!==0)for(e=e.child;e!==null;)eh(e),e=e.sibling;else j0(e)}function NS(e){for(e=e.child;e!==null;)e.tag===30?Xa(e.child,!1):(e.subtreeFlags&33554432)!==0&&NS(e),e=e.sibling}function av(e,t,n,i,a,r,s){for(var l=!1;t!==null;){if(t.tag===5){var o=t.stateNode;if(r!==null&&_i<r.length){var c=r[_i],u=dg(o);(c.view||u.view)&&(l=!0);var p;if(p=(e.flags&4)===0)if(u.clip)p=!0;else{p=c.rect;var f=u.rect;p=p.y!==f.y||p.x!==f.x||p.height!==f.height||p.width!==f.width}p&&(e.flags|=4),u.abs?u=!c.abs:(c=c.rect,u=u.rect,u=c.height!==u.height||c.width!==u.width),u&&(e.flags|=32)}else e.flags|=32;(e.flags&4)!==0&&dM(o,_i===0?n:n+"_"+_i,a),l&&(e.flags&4)!==0||(za===null&&(za=[]),za.push(o,_i===0?i:i+"_"+_i,t.memoizedProps)),_i++}else(t.tag!==22||t.memoizedState===null)&&(t.tag===30&&s?e.flags|=t.flags&32:av(e,t.child,n,i,a,r,s)&&(l=!0));t=t.sibling}return l}function LS(e,t){for(e=e.child;e!==null;){if(e.tag===30){var n=e.memoizedProps,i=e.stateNode,a=gr(n,i),r=Sr(n.default,n.update);if(t){i=i.clones;var s=i===null?null:i.map(wR)}else s=e.memoizedState,e.memoizedState=null;i=e;var l=e.child;_i=0,a=av(i,l,a,a,r,s,!1),(e.flags&4)!==0&&a&&(t||dl(e,n.onUpdate))}else(e.subtreeFlags&33554432)!==0&&LS(e,t);e=e.sibling}}var Cn=!1,He=!1,Ua=!1,t0=!1,n1=typeof WeakSet=="function"?WeakSet:Set,Dn=null,Ia=!1,Ic=!1,Ch=!1,Q0=!1;function j2(e,t,n){if(e=e.containerInfo,ug=yl,e=vb(e),Dg(e)){if("selectionStart"in e)var i={start:e.selectionStart,end:e.selectionEnd};else t:{i=(i=e.ownerDocument)&&i.defaultView||window;var a=i.getSelection&&i.getSelection();if(a&&a.rangeCount!==0){i=a.anchorNode;var r=a.anchorOffset,s=a.focusNode;a=a.focusOffset;try{i.nodeType,s.nodeType}catch{i=null;break t}var l=0,o=-1,c=-1,u=0,p=0,f=e,h=null;e:for(;;){for(var g;f!==i||r!==0&&f.nodeType!==3||(o=l+r),f!==s||a!==0&&f.nodeType!==3||(c=l+a),f.nodeType===3&&(l+=f.nodeValue.length),(g=f.firstChild)!==null;)h=f,f=g;for(;;){if(f===e)break e;if(h===i&&++u===r&&(o=l),h===s&&++p===a&&(c=l),(g=f.nextSibling)!==null)break;f=h,h=f.parentNode}f=g}i=o===-1||c===-1?null:{start:o,end:c}}else i=null}i=i||{start:0,end:0}}else i=null;for(fg={focusedElem:e,selectionRange:i},yl=!1,n=(n&335544064)===n,Dn=t,t=n?9270:1024;Dn!==null;){if(e=Dn,n&&(i=e.deletions,i!==null))for(r=0;r<i.length;r++)n&&K0(i[r]);if(e.alternate===null&&(e.flags&2)!==0)n&&t1(e),zf(n);else{if(e.tag===22){if(i=e.alternate,e.memoizedState!==null){i!==null&&i.memoizedState===null&&n&&K0(i),zf(n);continue}else if(i!==null&&i.memoizedState!==null){n&&t1(e),zf(n);continue}}i=e.child,(e.subtreeFlags&t)!==0&&i!==null?(i.return=e,Dn=i):(n&&DS(e),zf(n))}}Li=null}function zf(e){for(;Dn!==null;){var t=Dn,n=e,i=t.alternate,a=t.flags;switch(t.tag){case 0:case 11:case 15:break;case 1:if((a&1024)!==0&&i!==null){n=void 0,a=i.memoizedProps,i=i.memoizedState;var r=t.stateNode;try{var s=no(t.type,a);n=r.getSnapshotBeforeUpdate(s,i),r.__reactInternalSnapshotBeforeUpdate=n}catch(l){Xe(t,t.return,l)}}break;case 3:if((a&1024)!==0){if(i=t.stateNode.containerInfo,n=i.nodeType,n===9)pg(i);else if(n===1)switch(i.nodeName){case"HEAD":case"HTML":case"BODY":pg(i);break;default:i.textContent=""}}break;case 5:case 26:case 27:case 6:case 4:case 17:break;case 30:n&&i!==null&&(n=gr(i.memoizedProps,i.stateNode),a=t.memoizedProps,a=Sr(a.default,a.update),a!=="none"&&El(i,n,a,i.memoizedState=[],!0));break;default:if((a&1024)!==0)throw Error(St(163))}if(i=t.sibling,i!==null){i.return=t.return,Dn=i;break}Dn=t.return}}function US(e,t,n){var i=n.flags;switch(n.tag){case 0:case 11:case 15:Oa(e,n),i&4&&xu(5,n);break;case 1:if(Oa(e,n),i&4)if(e=n.stateNode,t===null)try{e.componentDidMount()}catch(s){Xe(n,n.return,s)}else{var a=no(n.type,t.memoizedProps);t=t.memoizedState;try{e.componentDidUpdate(a,t,e.__reactInternalSnapshotBeforeUpdate)}catch(s){Xe(n,n.return,s)}}i&64&&TS(n),i&512&&Pa(n,n.return);break;case 3:if(Oa(e,n),i&64&&(e=n.updateQueue,e!==null)){if(t=null,n.child!==null)switch(n.child.tag){case 27:case 5:t=n.child.stateNode;break;case 1:t=n.child.stateNode}try{Ob(e,t)}catch(s){Xe(n,n.return,s)}}break;case 27:t===null&&i&4&&RS(n);case 26:case 5:Oa(e,n),t===null&&i&4&&q0(n),i&512&&Pa(n,n.return);break;case 12:Oa(e,n);break;case 31:Oa(e,n),i&4&&zS(e,n);break;case 13:Oa(e,n),i&4&&FS(e,n),i&64&&(e=n.memoizedState,e!==null&&(e=e.dehydrated,e!==null&&(n=cR.bind(null,n),VR(e,n))));break;case 22:if(i=n.memoizedState!==null||Cn,!i){var r=t!==null&&t.memoizedState!==null||He;t=Cn,a=He,Cn=i,(He=r)&&!a?(i=2,(n.subtreeFlags&8772)!==0&&(i|=1),da(e,n,i)):Oa(e,n),Cn=t,He=a}break;case 30:Oa(e,n),i&512&&Pa(n,n.return);break;case 7:i&512&&Pa(n,n.return);default:Oa(e,n)}}function $0(e,t){for(e=e.child;e!==null;)IS(e,t),e=e.sibling}function IS(e,t){switch(e.tag){case 5:case 26:try{var n=e.stateNode;if(t){var i=n.style;typeof i.setProperty=="function"?i.setProperty("display","none","important"):i.display="none"}else{var a=e.stateNode,r=e.memoizedProps.style,s=r!=null&&r.hasOwnProperty("display")?r.display:null;a.style.display=s==null||typeof s=="boolean"?"":(""+s).trim()}}catch(o){Xe(e,e.return,o)}tg(e,t);break;case 6:try{e.stateNode.nodeValue=t?"":e.memoizedProps,Oe=!0}catch(o){Xe(e,e.return,o)}break;case 18:try{var l=e.stateNode;t?x1(l,!0):x1(e.stateNode,!1)}catch(o){Xe(e,e.return,o)}break;case 22:case 23:e.memoizedState===null&&$0(e,t);break;default:$0(e,t)}}function tg(e,t){if(e.subtreeFlags&67108864)for(e=e.child;e!==null;){t:{var n=e,i=t;switch(n.tag){case 4:IS(n,i);break t;case 22:n.memoizedState===null&&tg(n,i);break t;default:tg(n,i)}}e=e.sibling}}function OS(e){var t=e.alternate;t!==null&&(e.alternate=null,OS(t)),e.child=null,e.deletions=null,e.sibling=null,e.tag===5&&(t=e.stateNode,t!==null&&Bh(t)),e.stateNode=null,e.return=null,e.dependencies=null,e.memoizedProps=null,e.memoizedState=null,e.pendingProps=null,e.stateNode=null,e.updateQueue=null}var ln=null,xi=!1;function ha(e,t,n){for(n=n.child;n!==null;)PS(e,t,n),n=n.sibling}function PS(e,t,n){if(Oi&&typeof Oi.onCommitFiberUnmount=="function")try{Oi.onCommitFiberUnmount(fu,n)}catch{}switch(n.tag){case 26:He||Fn(n,t),ha(e,t,n),n.memoizedState?n.memoizedState.count--:n.stateNode&&!He&&(n=n.stateNode,n.parentNode.removeChild(n));break;case 27:He||Fn(n,t),Xc(n);var i=ln,a=xi;ps(n.type)&&(ln=n.stateNode,xi=!1),ha(e,t,n),MM(n.stateNode,n.type,n.memoizedProps),ln=i,xi=a;break;case 5:He||Fn(n,t),Xc(n);case 6:if(n.tag===6&&Xc(n),i=ln,a=xi,ln=null,ha(e,t,n),ln=i,xi=a,ln!==null)if(xi)try{(ln.nodeType===9?ln.body:ln.nodeName==="HTML"?ln.ownerDocument.body:ln).removeChild(n.stateNode),Oe=!0}catch(r){Xe(n,t,r)}else try{ln.removeChild(n.stateNode),Oe=!0}catch(r){Xe(n,t,r)}break;case 18:ln!==null&&(xi?(e=ln,v1(e.nodeType===9?e.body:e.nodeName==="HTML"?e.ownerDocument.body:e,n.stateNode),_l(e)):v1(ln,n.stateNode));break;case 4:i=ln,a=xi,ln=n.stateNode.containerInfo,xi=!0,ha(e,t,n),ln=i,xi=a;break;case 0:case 11:case 14:case 15:fs(2,n,t),He||fs(4,n,t),ha(e,t,n);break;case 1:He||(Fn(n,t),i=n.stateNode,typeof i.componentWillUnmount=="function"&&wS(n,t,i)),ha(e,t,n);break;case 21:ha(e,t,n);break;case 22:He=(i=He)||n.memoizedState!==null,ha(e,t,n),He=i;break;case 30:Fn(n,t),ha(e,t,n);break;case 7:He||Fn(n,t),ha(e,t,n);break;default:ha(e,t,n)}}function zS(e,t){if(t.memoizedState===null&&(e=t.alternate,e!==null&&(e=e.memoizedState,e!==null))){e=e.dehydrated;try{_l(e)}catch(n){Xe(t,t.return,n)}}}function FS(e,t){if(t.memoizedState===null&&(e=t.alternate,e!==null&&(e=e.memoizedState,e!==null&&(e=e.dehydrated,e!==null))))try{_l(e)}catch(n){Xe(t,t.return,n)}}function Q2(e){switch(e.tag){case 31:case 13:case 19:var t=e.stateNode;return t===null&&(t=e.stateNode=new n1),t;case 22:return e=e.stateNode,t=e._retryCache,t===null&&(t=e._retryCache=new n1),t;default:throw Error(St(435,e.tag))}}function Ff(e,t){var n=Q2(e);t.forEach(function(i){if(!n.has(i)){n.add(i);var a=uR.bind(null,e,i);i.then(a,a)}})}function ai(e,t,n){var i=t.deletions;if(i!==null)for(var a=0;a<i.length;a++){var r=i[a],s=e,l=t,o=l;t:for(;o!==null;){switch(o.tag){case 27:if(ps(o.type)){ln=o.stateNode,xi=!1;break t}break;case 5:ln=o.stateNode,xi=!1;break t;case 3:case 4:ln=o.stateNode.containerInfo,xi=!0;break t}o=o.return}if(ln===null)throw Error(St(160));PS(s,l,r),ln=null,xi=!1,s=r.alternate,s!==null&&(s.return=null),r.return=null}if(t.subtreeFlags&13886)for(t=t.child;t!==null;)BS(t,e,n),t=t.sibling}var pa=null;function BS(e,t,n){var i=e.alternate,a=e.flags;switch(e.tag){case 0:case 11:case 14:case 15:if(a&4&&(i=e.updateQueue,i=i!==null?i.events:null,i!==null))for(var r=0;r<i.length;r++){var s=i[r];s.ref.impl=s.nextImpl}ai(t,e,n),ri(e),a&4&&(fs(3,e,e.return),xu(3,e),fs(5,e,e.return));break;case 1:ai(t,e,n),ri(e),a&512&&(He||i===null||Fn(i,i.return)),a&64&&Cn&&(e=e.updateQueue,e!==null&&(t=e.callbacks,t!==null&&(n=e.shared.hiddenCallbacks,e.shared.hiddenCallbacks=n===null?t:n.concat(t))));break;case 26:if(r=pa,ai(t,e,n),ri(e),a&512&&(He||i===null||Fn(i,i.return)),a&4)if(a=i!==null?i.memoizedState:null,n=e.memoizedState,i===null)if(n===null)if(e.stateNode===null)if(Cn)e.stateNode=hM(e.type,e.memoizedProps,t.containerInfo,e);else{t:{t=e.type,n=e.memoizedProps,a=r.ownerDocument||r;e:switch(t){case"title":i=a.getElementsByTagName("title")[0],(!i||i[pu]||i[Bn]||i.namespaceURI==="http://www.w3.org/2000/svg"||i.hasAttribute("itemprop"))&&(i=a.createElement(t),a.head.insertBefore(i,a.querySelector("head > title"))),kn(i,t,n),i[Bn]=e,Nn(i),t=i;break t;case"link":if(r=w1("link","href",a).get(t+(n.href||""))){for(s=0;s<r.length;s++)if(i=r[s],i.getAttribute("href")===(n.href==null||n.href===""?null:n.href)&&i.getAttribute("rel")===(n.rel==null?null:n.rel)&&i.getAttribute("title")===(n.title==null?null:n.title)&&i.getAttribute("crossorigin")===(n.crossOrigin==null?null:n.crossOrigin)){r.splice(s,1);break e}}i=a.createElement(t),kn(i,t,n),a.head.appendChild(i);break;case"meta":if(r=w1("meta","content",a).get(t+(n.content||""))){for(s=0;s<r.length;s++)if(i=r[s],i.getAttribute("content")===(n.content==null?null:""+n.content)&&i.getAttribute("name")===(n.name==null?null:n.name)&&i.getAttribute("property")===(n.property==null?null:n.property)&&i.getAttribute("http-equiv")===(n.httpEquiv==null?null:n.httpEquiv)&&i.getAttribute("charset")===(n.charSet==null?null:n.charSet)){r.splice(s,1);break e}}i=a.createElement(t),kn(i,t,n),a.head.appendChild(i);break;default:throw Error(St(468,t))}i[Bn]=e,Nn(i),t=i}e.stateNode=t}else Cn||vg(r,e.type,e.stateNode);else e.stateNode=T1(r,n,e.memoizedProps);else a!==n?(a===null?(t=i.stateNode,t===null||He||t.parentNode.removeChild(t)):a.count--,n===null?Cn||vg(r,e.type,e.stateNode):T1(r,n,e.memoizedProps)):n===null&&e.stateNode!==null&&Qm(e,e.memoizedProps,i.memoizedProps);break;case 27:ai(t,e,n),ri(e),a&512&&(He||i===null||Fn(i,i.return)),i!==null&&a&4&&Qm(e,e.memoizedProps,i.memoizedProps);break;case 5:if(r=Ua,Ua=!1,ai(t,e,n),Ua=r,ri(e),a&512&&(He||i===null||Fn(i,i.return)),e.flags&32){t=e.stateNode;try{ul(t,""),Oe=!0}catch(u){Xe(e,e.return,u)}}a&4&&e.stateNode!=null&&(t=e.memoizedProps,Qm(e,t,i!==null?i.memoizedProps:t)),a&1024&&(t0=!0);break;case 6:if(ai(t,e,n),ri(e),a&4){if(e.stateNode===null)throw Error(St(162));t=e.memoizedProps,n=e.stateNode;try{n.nodeValue=t,Oe=!0}catch(u){Xe(e,e.return,u)}}break;case 3:if(Oe=!1,rh=null,r=pa,pa=su(t.containerInfo),ai(t,e,n),pa=r,ri(e),a&4&&i!==null&&i.memoizedState.isDehydrated)try{_l(t.containerInfo)}catch(u){Xe(e,e.return,u)}t0&&(t0=!1,HS(e)),Oe=!1;break;case 4:a=Ua,Ua=Cn,i=l_(),r=pa,pa=su(e.stateNode.containerInfo),ai(t,e,n),ri(e),pa=r,Oe&&Ic&&(Ch=!0),Oe=i,Ua=a;break;case 12:ai(t,e,n),ri(e);break;case 31:ai(t,e,n),ri(e),a&4&&(t=e.updateQueue,t!==null&&(e.updateQueue=null,Ff(e,t)));break;case 13:ai(t,e,n),ri(e),e.child.flags&8192&&e.memoizedState!==null!=(i!==null&&i.memoizedState!==null)&&(Qh=Ii()),a&4&&(t=e.updateQueue,t!==null&&(e.updateQueue=null,Ff(e,t)));break;case 22:r=e.memoizedState!==null,s=i!==null&&i.memoizedState!==null;var l=Cn,o=He,c=Ua;Cn=l||r,Ua=c||r,He=o||s,ai(t,e,n),He=o,Ua=c,Cn=l,ri(e),a&8192&&(t=e.stateNode,t._visibility=r?t._visibility&-2:t._visibility|1,!r||i===null||s||Cn||He||(t=s||He,n=Cn,i=He,Cn=r||Cn,He=t,Vr(e,2),Cn=n,He=i),!r&&Ua||$0(e,r)),a&4&&(t=e.updateQueue,t!==null&&(n=t.retryQueue,n!==null&&(t.retryQueue=null,Ff(e,n))));break;case 19:ai(t,e,n),ri(e),a&4&&(t=e.updateQueue,t!==null&&(e.updateQueue=null,Ff(e,t)));break;case 30:a&512&&(He||i===null||Fn(i,i.return)),a=l_(),r=Ic,s=(n&335544064)===n,l=e.memoizedProps,Ic=s&&Sr(l.default,l.update)!=="none",ai(t,e,n),ri(e),s&&i!==null&&Oe&&(e.flags|=4),Ic=r,Oe=a;break;case 21:break;case 7:a&512&&(He||i===null||Fn(i,i.return)),i&&i.stateNode!==null&&(i.stateNode._fragmentFiber=e);default:ai(t,e,n),ri(e)}}function ri(e){var t=e.flags;if(t&2){try{for(var n,i=e.return;i!==null;){if(AS(i)){n=i;break}i=i.return}i=null;for(var a=e.return;a!==null;){if(iv(a)){var r=a.stateNode;i===null?i=[r]:i.push(r)}if(nv(a))break;a=a.return}var s=i;if(n==null)throw Error(St(160));switch(n.tag){case 27:var l=n.stateNode,o=$m(e);Ah(e,o,l,s);break;case 5:var c=n.stateNode;n.flags&32&&(ul(c,""),n.flags&=-33);var u=$m(e);Ah(e,u,c,s);break;case 3:case 4:var p=n.stateNode.containerInfo,f=$m(e);Y0(e,f,p,s);break;default:throw Error(St(161))}}catch(h){Xe(e,e.return,h)}e.flags&=-3}t&4096&&(e.flags&=-4097)}function HS(e){if(e.subtreeFlags&1024)for(e=e.child;e!==null;){var t=e;HS(t),t.tag===5&&t.flags&1024&&(t=t.stateNode,yl=!0,t.reset(),yl=!1),e=e.sibling}}function Po(e,t){if(t.subtreeFlags&9270)for(t=t.child;t!==null;)GS(t,e),t=t.sibling;else LS(t,!1)}function GS(e,t){var n=e.alternate;if(n===null)Z0(e,!1);else switch(e.tag){case 3:if(Q0=Ia=!1,e1(),Po(t,e),!Ia&&!Ch){if(e=za,e!==null)for(var i=0;i<e.length;i+=3){n=e[i];var a=e[i+1];pM(n,e[i+2]),n=n.ownerDocument.documentElement,n!==null&&n.animate({opacity:[0,0],pointerEvents:["none","none"]},{duration:0,fill:"forwards",pseudoElement:"::view-transition-group("+a+")"})}e=t.containerInfo,e=e.nodeType===9?e.documentElement:e.ownerDocument.documentElement,e!==null&&e.style.viewTransitionName===""&&(e.style.viewTransitionName="none",e.animate({opacity:[0,0],pointerEvents:["none","none"]},{duration:0,fill:"forwards",pseudoElement:"::view-transition-group(root)"}),e.animate({width:[0,0],height:[0,0]},{duration:0,fill:"forwards",pseudoElement:"::view-transition"})),Q0=!0}za=null;break;case 5:Po(t,e);break;case 4:i=Ia,Ia=!1,Po(t,e),Ia&&(Ch=!0),Ia=i;break;case 22:e.memoizedState===null&&(n.memoizedState!==null?Z0(e,!1):Po(t,e));break;case 30:i=Ia,a=e1(),Ia=!1,Po(t,e),Ia&&(e.flags|=4);var r=e.memoizedProps,s=e.stateNode;t=gr(r,s),s=gr(n.memoizedProps,s);var l=Sr(r.default,r.update);l==="none"?t=!1:(r=n.memoizedState,n.memoizedState=null,n=e.child,_i=0,t=av(e,n,t,s,l,r,!0),_i!==(r===null?0:r.length)&&(e.flags|=32)),(e.flags&4)!==0&&t?(dl(e,e.memoizedProps.onUpdate),za=a):a!==null&&(a.push.apply(a,za),za=a),Ia=(e.flags&32)!==0?!0:i;break;default:Po(t,e)}}function Oa(e,t){if(t.subtreeFlags&8772)for(t=t.child;t!==null;)US(e,t.alternate,t),t=t.sibling}function Vr(e,t){for(e=e.child;e!==null;){var n=e,i=t;switch(n.tag){case 0:case 11:case 14:case 15:fs(4,n,n.return),Vr(n,i);break;case 1:Fn(n,n.return);var a=n.stateNode;typeof a.componentWillUnmount=="function"&&wS(n,n.return,a),Vr(n,i);break;case 27:(i&2)!==0&&MM(n.stateNode,n.type,n.memoizedProps);case 5:Fn(n,n.return),n.tag!==5&&n.tag!==27||Xc(n),Vr(n,i);break;case 6:Xc(n);break;case 26:Fn(n,n.return),a=n.stateNode,n.memoizedState!==null||a===null||He||a.parentNode.removeChild(a),Vr(n,i);break;case 22:n.memoizedState===null&&Vr(n,i);break;case 30:Fn(n,n.return),Vr(n,i);break;case 7:Fn(n,n.return);default:Vr(n,i)}e=e.sibling}}function da(e,t,n){for(n=(t.subtreeFlags&8772)!==0?n:n&-2,t=t.child;t!==null;){var i=t.alternate,a=e,r=t,s=r.flags,l=(n&1)!==0;switch(r.tag){case 0:case 11:case 15:da(a,r,n),xu(4,r);break;case 1:if(da(a,r,n),i=r,a=i.stateNode,typeof a.componentDidMount=="function")try{a.componentDidMount()}catch(u){Xe(i,i.return,u)}if(i=r,a=i.updateQueue,a!==null){var o=i.stateNode;try{var c=a.shared.hiddenCallbacks;if(c!==null)for(a.shared.hiddenCallbacks=null,a=0;a<c.length;a++)Ib(c[a],o)}catch(u){Xe(i,i.return,u)}}l&&s&64&&TS(r),Pa(r,r.return);break;case 27:(n&2)!==0&&RS(r);case 5:r.tag!==5&&r.tag!==27||$_(r),da(a,r,n),l&&i===null&&s&4&&q0(r),Pa(r,r.return);break;case 6:$_(r);break;case 26:o=r.stateNode,r.memoizedState!==null||o===null||Cn||vg(su(o.ownerDocument),r.type,o),da(a,r,n),l&&i===null&&s&4&&q0(r),Pa(r,r.return);break;case 12:da(a,r,n);break;case 31:da(a,r,n),l&&s&4&&zS(a,r);break;case 13:da(a,r,n),l&&s&4&&FS(a,r);break;case 22:r.memoizedState===null&&da(a,r,n),Pa(r,r.return);break;case 30:da(a,r,n),Pa(r,r.return);break;case 7:Pa(r,r.return);default:da(a,r,n)}t=t.sibling}}function rv(e,t){var n=null;e!==null&&e.memoizedState!==null&&e.memoizedState.cachePool!==null&&(n=e.memoizedState.cachePool.pool),e=null,t.memoizedState!==null&&t.memoizedState.cachePool!==null&&(e=t.memoizedState.cachePool.pool),e!==n&&(e!=null&&e.refCount++,n!=null&&gu(n))}function sv(e,t){e=null,t.alternate!==null&&(e=t.alternate.memoizedState.cache),t=t.memoizedState.cache,t!==e&&(t.refCount++,e!=null&&gu(e))}function Qi(e,t,n,i){var a=(n&335544064)===n;if(t.subtreeFlags&(a?10262:10256))for(t=t.child;t!==null;)VS(e,t,n,i),t=t.sibling;else a&&NS(t)}function VS(e,t,n,i){var a=(n&335544064)===n;a&&t.alternate===null&&t.return!==null&&t.return.alternate!==null&&eh(t);var r=t.flags;switch(t.tag){case 0:case 11:case 15:Qi(e,t,n,i),r&2048&&xu(9,t);break;case 1:Qi(e,t,n,i);break;case 3:Qi(e,t,n,i),a&&Q0&&(e=e.containerInfo,e=e.nodeType===9?e.body:e.nodeName==="HTML"?e.ownerDocument.body:e,e.style.viewTransitionName==="root"&&(e.style.viewTransitionName=""),e=e.ownerDocument.documentElement,e!==null&&e.style.viewTransitionName==="none"&&(e.style.viewTransitionName="")),r&2048&&(r=null,t.alternate!==null&&(r=t.alternate.memoizedState.cache),t=t.memoizedState.cache,t!==r&&(t.refCount++,r!=null&&gu(r)));break;case 12:if(r&2048){Qi(e,t,n,i),r=t.stateNode;try{var s=t.memoizedProps,l=s.id,o=s.onPostCommit;typeof o=="function"&&o(l,t.alternate===null?"mount":"update",r.passiveEffectDuration,-0)}catch(c){Xe(t,t.return,c)}}else Qi(e,t,n,i);break;case 31:Qi(e,t,n,i);break;case 13:Qi(e,t,n,i);break;case 23:break;case 22:s=t.stateNode,l=t.alternate,t.memoizedState!==null?(a&&l!==null&&l.memoizedState===null&&eh(l),s._visibility&2?Qi(e,t,n,i):Wc(e,t)):(a&&l!==null&&l.memoizedState!==null&&eh(t),s._visibility&2?Qi(e,t,n,i):(s._visibility|=2,Fo(e,t,n,i,(t.subtreeFlags&10256)!==0||!1))),r&2048&&rv(l,t);break;case 24:Qi(e,t,n,i),r&2048&&sv(t.alternate,t);break;case 30:a&&(r=t.alternate,r!==null&&(Xa(r.child,!0),Xa(t.child,!0))),Qi(e,t,n,i);break;default:Qi(e,t,n,i)}}function Fo(e,t,n,i,a){for(a=a&&((t.subtreeFlags&10256)!==0||!1),t=t.child;t!==null;){var r=e,s=t,l=n,o=i,c=s.flags;switch(s.tag){case 0:case 11:case 15:Fo(r,s,l,o,a),xu(8,s);break;case 23:break;case 22:var u=s.stateNode;s.memoizedState!==null?u._visibility&2?Fo(r,s,l,o,a):Wc(r,s):(u._visibility|=2,Fo(r,s,l,o,a)),a&&c&2048&&rv(s.alternate,s);break;case 24:Fo(r,s,l,o,a),a&&c&2048&&sv(s.alternate,s);break;default:Fo(r,s,l,o,a)}t=t.sibling}}function Wc(e,t){if(t.subtreeFlags&10256)for(t=t.child;t!==null;){var n=e,i=t,a=i.flags;switch(i.tag){case 22:Wc(n,i),a&2048&&rv(i.alternate,i);break;case 24:Wc(n,i),a&2048&&sv(i.alternate,i);break;default:Wc(n,i)}t=t.sibling}}var Vs=8192;function Bs(e,t,n){if(e.subtreeFlags&Vs)for(e=e.child;e!==null;)kS(e,t,n),e=e.sibling}function kS(e,t,n){switch(e.tag){case 26:Bs(e,t,n),e.flags&Vs&&(e.memoizedState!==null?nC(n,pa,e.memoizedState,e.memoizedProps):(e=e.stateNode,(t&335544128)===t&&R1(n,e)));break;case 5:Bs(e,t,n),e.flags&Vs&&(e=e.stateNode,(t&335544128)===t&&R1(n,e));break;case 3:case 4:var i=pa;pa=su(e.stateNode.containerInfo),Bs(e,t,n),pa=i;break;case 22:e.memoizedState===null&&(i=e.alternate,i!==null&&i.memoizedState!==null?(i=Vs,Vs=16777216,Bs(e,t,n),Vs=i):Bs(e,t,n));break;case 30:if((e.flags&Vs)!==0&&(i=e.memoizedProps.name,i!=null&&i!=="auto")){var a=e.stateNode;a.paired=null,Li===null&&(Li=new Map),Li.set(i,a)}Bs(e,t,n);break;default:Bs(e,t,n)}}function XS(e){var t=e.alternate;if(t!==null&&(e=t.child,e!==null)){t.child=null;do t=e.sibling,e.sibling=null,e=t;while(e!==null)}}function Ac(e){var t=e.deletions;if((e.flags&16)!==0){if(t!==null)for(var n=0;n<t.length;n++){var i=t[n];Dn=i,qS(i,e)}XS(e)}if(e.subtreeFlags&10256)for(e=e.child;e!==null;)WS(e),e=e.sibling}function WS(e){switch(e.tag){case 0:case 11:case 15:Ac(e),e.flags&2048&&fs(9,e,e.return);break;case 3:Ac(e);break;case 12:Ac(e);break;case 22:var t=e.stateNode;e.memoizedState!==null&&t._visibility&2&&(e.return===null||e.return.tag!==13)?(t._visibility&=-3,nh(e)):Ac(e);break;default:Ac(e)}}function nh(e){var t=e.deletions;if((e.flags&16)!==0){if(t!==null)for(var n=0;n<t.length;n++){var i=t[n];Dn=i,qS(i,e)}XS(e)}for(e=e.child;e!==null;){switch(t=e,t.tag){case 0:case 11:case 15:fs(8,t,t.return),nh(t);break;case 22:n=t.stateNode,n._visibility&2&&(n._visibility&=-3,nh(t));break;default:nh(t)}e=e.sibling}}function qS(e,t){for(;Dn!==null;){var n=Dn;switch(n.tag){case 0:case 11:case 15:fs(8,n,t);break;case 23:case 22:if(n.memoizedState!==null&&n.memoizedState.cachePool!==null){var i=n.memoizedState.cachePool.pool;i!=null&&i.refCount++}break;case 24:gu(n.memoizedState.cache)}if(i=n.child,i!==null)i.return=n,Dn=i;else t:for(n=e;Dn!==null;){i=Dn;var a=i.sibling,r=i.return;if(OS(i),i===n){Dn=null;break t}if(a!==null){a.return=r,Dn=a;break t}Dn=r}}}var $2={getCacheForType:function(e){var t=Hn(xn),n=t.data.get(e);return n===void 0&&(n=e(),t.data.set(e,n)),n},cacheSignal:function(){return Hn(xn).controller.signal}},tR=typeof WeakMap=="function"?WeakMap:Map,ze=0,Ze=null,Re=null,De=0,Ve=0,Ci=null,Jr=!1,Tl=!1,ov=!1,_r=0,dn=0,hs=0,Js=0,Dh=0,Ui=0,hl=0,qc=null,yi=null,eg=!1,Qh=0,YS=0,Nh=1/0,Lh=null,as=null,un=0,ga=null,io=null,ka=0,ng=0,ig=null,ZS=null,rl=null,sl=null,ol=null,Yc=0,ih=null;function zi(){return(ze&2)!==0&&De!==0?De&-De:fe.T!==null?cv():Q1()}function JS(){if(Ui===0)if((De&536870912)===0||Me){var e=Tf;Tf<<=1,(Tf&3932160)===0&&(Tf=262144),Ui=e}else Ui=536870912;return e=Xn.current,e!==null&&(e.flags|=32),Ui}function dl(e,t){if(t!=null){var n=e.stateNode,i=n.ref;i===null&&(i=n.ref=gM(gr(e.memoizedProps,n))),sl===null&&(sl=[]),sl.push(t.bind(null,i))}}function Si(e,t,n){(e===Ze&&(Ve===2||Ve===9)||e.cancelPendingCommit!==null)&&(pl(e,0),Kr(e,De,Ui,!1)),du(e,n),((ze&2)===0||e!==Ze)&&(e===Ze&&((ze&2)===0&&(Js|=n),dn===4&&Kr(e,De,Ui,!1)),qa(e))}function KS(e,t,n){if((ze&6)!==0)throw Error(St(327));var i=!n&&(t&127)===0&&(t&e.expiredLanes)===0||hu(e,t),a=i?iR(e,t):e0(e,t,!0),r=i;do{if(a===0){Tl&&!i&&Kr(e,t,0,!1);break}else{if(n=e.current.alternate,r&&!eR(n)){a=e0(e,t,!1),r=!1;continue}if(a===2){if(r=t,e.errorRecoveryDisabledLanes&r)var s=0;else s=e.pendingLanes&-536870913,s=s!==0?s:s&536870912?536870912:0;if(s!==0){t=s;t:{var l=e;a=qc;var o=l.current.memoizedState.isDehydrated;if(o&&(pl(l,s).flags|=256),s=e0(l,s,!1),s!==2&&s!==6){if(ov&&!o){l.errorRecoveryDisabledLanes|=r,Js|=r,a=4;break t}r=yi,yi=a,r!==null&&(yi===null?yi=r:yi.push.apply(yi,r))}a=s}if(r=!1,a!==2)continue}}if(a===1){pl(e,0),Kr(e,t,0,!0);break}t:{switch(i=e,r=a,r){case 0:case 1:throw Error(St(345));case 4:if((t&4194048)!==t&&(t&62914560)!==t)break;case 6:Kr(i,t,Ui,!Jr);break t;case 2:yi=null;break;case 3:case 5:break;default:throw Error(St(329))}if((t&62914560)===t&&(a=Qh+300-Ii(),10<a)){if(Kr(i,t,Ui,!Jr),Fh(i,0,!0)!==0)break t;ka=t,i.timeoutHandle=fv(i1.bind(null,i,n,yi,Lh,eg,t,Ui,Js,hl,Jr,r,"Throttled",-0,0),a);break t}i1(i,n,yi,Lh,eg,t,Ui,Js,hl,Jr,r,null,-0,0)}}break}while(!0);qa(e)}function i1(e,t,n,i,a,r,s,l,o,c,u,p,f,h){e.timeoutHandle=-1;var g=t.subtreeFlags,M=(r&335544064)===r;if(p=null,(M||g&8192||(g&16785408)===16785408)&&(p={stylesheets:null,count:0,imgCount:0,imgBytes:0,suspenseyImages:[],waitingForImages:!0,waitingForViewTransition:!1,unsuspend:Ba},Li=null,kS(t,r,p),M&&(g=p,M=e.containerInfo,M=(M.nodeType===9?M:M.ownerDocument).__reactViewTransition,M!=null&&(g.count++,g.waitingForViewTransition=!0,g=ou.bind(g),M.finished.then(g,g))),g=(r&62914560)===r?Qh-Ii():(r&4194048)===r?YS-Ii():0,g=iC(p,g),g!==null)){ka=r,e.cancelPendingCommit=g(r1.bind(null,e,t,r,n,i,a,s,l,o,c,u,p,null,f,h)),Kr(e,r,s,!c);return}r1(e,t,r,n,i,a,s,l,o,c,u,p)}function eR(e){for(var t=e;;){var n=t.tag;if((n===0||n===11||n===15)&&t.flags&16384&&(n=t.updateQueue,n!==null&&(n=n.stores,n!==null)))for(var i=0;i<n.length;i++){var a=n[i],r=a.getSnapshot;a=a.value;try{if(!Fi(r(),a))return!1}catch{return!1}}if(n=t.child,t.subtreeFlags&16384&&n!==null)n.return=t,t=n;else{if(t===e)break;for(;t.sibling===null;){if(t.return===null||t.return===e)return!0;t=t.return}t.sibling.return=t.return,t=t.sibling}}return!0}function Kr(e,t,n,i){t=Y1(e,t),t&=~Dh,t&=~Js,e.suspendedLanes|=t,e.pingedLanes&=~t,i&&(e.warmLanes|=t),i=e.expirationTimes;for(var a=t;0<a;){var r=31-Pi(a),s=1<<r;i[r]=-1,a&=~s}n!==0&&J1(e,n,t)}function $h(){return(ze&6)===0?(yu(0,!1),!1):!0}function lv(){if(Re!==null){if(Ve===0)var e=Re.return;else e=Re,hr=lo=null,Wg(e),nl=null,tu=0,e=Re;for(;e!==null;)ES(e.alternate,e),e=e.return;Re=null}}function pl(e,t){var n=e.timeoutHandle;return n!==-1&&(e.timeoutHandle=-1,MR(n)),n=e.cancelPendingCommit,n!==null&&(e.cancelPendingCommit=null,n()),ka=0,lv(),Ze=e,Re=n=dr(e.current,null),De=t,Ve=0,Ci=null,Jr=!1,Tl=hu(e,t),ov=!1,hl=Ui=Dh=Js=hs=dn=0,yi=qc=null,eg=!1,_r=Y1(e,t),kh(),n}function jS(e,t){ve=null,fe.H=Eh,t===Ml||t===qh?(t=D_(),Ve=3):t===zg?(t=D_(),Ve=4):Ve=t===$g?8:t!==null&&typeof t=="object"&&typeof t.then=="function"?6:1,Ci=t,Re===null&&(dn=1,Th(e,ia(t,e.current)))}function QS(){var e=Xn.current;return e===null?!0:(De&4194048)===De?Kn===null:(De&62914560)===De||(De&536870912)!==0?e===Kn:!1}function $S(){var e=fe.H;return fe.H=Eh,e===null?Eh:e}function tM(){var e=fe.A;return fe.A=$2,e}function Uh(){dn=4,Jr||(De&4194048)!==De&&Xn.current!==null||(Tl=!0),(hs&134217727)===0&&(Js&134217727)===0||Ze===null||Kr(Ze,De,Ui,!1)}function e0(e,t,n){var i=ze;ze|=2;var a=$S(),r=tM();(Ze!==e||De!==t)&&(Lh=null,pl(e,t)),t=!1;var s=dn;t:do try{if(Ve!==0&&Re!==null){var l=Re,o=Ci;switch(Ve){case 8:lv(),s=6;break t;case 3:case 2:case 9:case 6:Xn.current===null&&(t=!0);var c=Ve;if(Ve=0,Ci=null,jo(e,l,o,c),n&&Tl){s=0;break t}break;default:c=Ve,Ve=0,Ci=null,jo(e,l,o,c)}}nR(),s=dn;break}catch(u){jS(e,u)}while(!0);return t&&e.shellSuspendCounter++,hr=lo=null,ze=i,fe.H=a,fe.A=r,Re===null&&(Ze=null,De=0,kh()),s}function nR(){for(;Re!==null;)eM(Re)}function iR(e,t){var n=ze;ze|=2;var i=$S(),a=tM();Ze!==e||De!==t?(Lh=null,Nh=Ii()+500,pl(e,t)):Tl=hu(e,t);t:do try{if(Ve!==0&&Re!==null){t=Re;var r=Ci;e:switch(Ve){case 1:Ve=0,Ci=null,jo(e,t,r,1);break;case 2:case 9:if(C_(r)){Ve=0,Ci=null,a1(t);break}t=function(){Ve!==2&&Ve!==9||Ze!==e||(Ve=7),qa(e)},r.then(t,t);break t;case 3:Ve=7;break t;case 4:Ve=5;break t;case 7:C_(r)?(Ve=0,Ci=null,a1(t)):(Ve=0,Ci=null,jo(e,t,r,7));break;case 5:var s=null;switch(Re.tag){case 26:s=Re.memoizedState;case 5:case 27:var l=Re;if(s?wM(s):l.stateNode.complete){Ve=0,Ci=null;var o=l.sibling;if(o!==null)Re=o;else{var c=l.return;c!==null?(Re=c,td(c)):Re=null}break e}}Ve=0,Ci=null,jo(e,t,r,5);break;case 6:Ve=0,Ci=null,jo(e,t,r,6);break;case 8:lv(),dn=6;break t;default:throw Error(St(462))}}aR();break}catch(u){jS(e,u)}while(!0);return hr=lo=null,fe.H=i,fe.A=a,ze=n,Re!==null?0:(Ze=null,De=0,kh(),dn)}function aR(){for(;Re!==null&&!bA();)eM(Re)}function eM(e){var t=MS(e.alternate,e,_r);e.memoizedProps=e.pendingProps,t===null?td(e):Re=t}function a1(e){var t=e,n=t.alternate;switch(t.tag){case 15:case 0:t=q_(n,t,t.pendingProps,t.type,void 0,De);break;case 11:t=q_(n,t,t.pendingProps,t.type.render,t.ref,De);break;case 5:Wg(t);var i=t;i===Ln&&(Me?(vh(i),i.tag===5&&i.stateNode!=null&&(Qe=i.stateNode)):(vh(i),Me=!0));default:ES(n,t),t=Re=Tb(t,_r),t=MS(n,t,_r)}e.memoizedProps=e.pendingProps,t===null?td(e):Re=t}function jo(e,t,n,i){hr=lo=null,Wg(t),nl=null,tu=0;var a=t.return;try{if(W2(e,a,t,n,De)){dn=1,Th(e,ia(n,e.current)),Re=null;return}}catch(r){if(a!==null)throw Re=a,r;dn=1,Th(e,ia(n,e.current)),Re=null;return}t.flags&32768?(Me||i===1?e=!0:Tl||(De&536870912)!==0?e=!1:(Jr=e=!0,(i===2||i===9||i===3||i===6)&&(i=Xn.current,i!==null&&i.tag===13&&(i.flags|=16384))),nM(t,e)):td(t)}function td(e){var t=e;do{if((t.flags&32768)!==0){nM(t,Jr);return}e=t.return;var n=J2(t.alternate,t,_r);if(n!==null){Re=n;return}if(t=t.sibling,t!==null){Re=t;return}Re=t=e}while(t!==null);dn===0&&(dn=5)}function nM(e,t){do{var n=K2(e.alternate,e);if(n!==null){n.flags&=32767,Re=n;return}if(n=e.return,n!==null&&(n.flags|=32768,n.subtreeFlags=0,n.deletions=null),!t&&(e=e.sibling,e!==null)){Re=e;return}Re=e=n}while(e!==null);dn=6,Re=null}function r1(e,t,n,i,a,r,s,l,o,c,u,p){e.cancelPendingCommit=null;do ed();while(un!==0);if((ze&6)!==0)throw Error(St(327));if(t!==null){if(t===e.current)throw Error(St(177));e===Ze&&(Re=Ze=null,De=0),io=t,ga=e,ka=n,ig=a,ZS=i,rR(e,t,n,s,l,o,p)}}function rR(e,t,n,i,a,r,s){var l=t.lanes|t.childLanes;if(ng=l,l|=Ng,NA(e,n,l,i,a,r),sl=null,(n&335544064)===n?(ol=U2(e),i=10262):(ol=null,i=10256),(t.subtreeFlags&i)!==0||(t.flags&i)!==0?(e.callbackNode=null,e.callbackPriority=0,fR(hh,function(){return og(),null})):(e.callbackNode=null,e.callbackPriority=0),Rh=!1,i=(t.flags&13878)!==0,(t.subtreeFlags&13878)!==0||i){i=fe.T,fe.T=null,a=Fe.p,Fe.p=2,r=ze,ze|=4;try{j2(e,t,n)}finally{ze=r,Fe.p=a,fe.T=i}}un=1,Rh?rl=CR(s,e.containerInfo,ol,ag,rg,oR,sg,og,sR,null,null):(ag(),rg(),sg())}function sR(e){if(un!==0){var t=ga.onRecoverableError;t(e,{componentStack:null})}}function oR(){un===3&&(un=0,GS(io,ga),un=4)}function ag(){if(un===1){un=0;var e=ga,t=io,n=ka,i=(t.flags&13878)!==0;if((t.subtreeFlags&13878)!==0||i){i=fe.T,fe.T=null;var a=Fe.p;Fe.p=2;var r=ze;ze|=4;try{Ic=Ch=!1,BS(t,e,n),n=fg;var s=vb(e.containerInfo),l=n.focusedElem,o=n.selectionRange;if(s!==l&&l&&l.ownerDocument&&gb(l.ownerDocument.documentElement,l)){if(o!==null&&Dg(l)){var c=o.start,u=o.end;if(u===void 0&&(u=c),"selectionStart"in l)l.selectionStart=c,l.selectionEnd=Math.min(u,l.value.length);else{var p=l.ownerDocument||document,f=p&&p.defaultView||window;if(f.getSelection){var h=f.getSelection(),g=l.textContent.length,M=Math.min(o.start,g),v=o.end===void 0?M:Math.min(o.end,g);!h.extend&&M>v&&(s=v,v=M,M=s);var d=b_(l,M),x=b_(l,v);if(d&&x&&(h.rangeCount!==1||h.anchorNode!==d.node||h.anchorOffset!==d.offset||h.focusNode!==x.node||h.focusOffset!==x.offset)){var b=p.createRange();b.setStart(d.node,d.offset),h.removeAllRanges(),M>v?(h.addRange(b),h.extend(x.node,x.offset)):(b.setEnd(x.node,x.offset),h.addRange(b))}}}}for(p=[],h=l;h=h.parentNode;)h.nodeType===1&&p.push({element:h,left:h.scrollLeft,top:h.scrollTop});for(typeof l.focus=="function"&&l.focus(),l=0;l<p.length;l++){var y=p[l];y.element.scrollLeft=y.left,y.element.scrollTop=y.top}}yl=!!ug,fg=ug=null}finally{ze=r,Fe.p=a,fe.T=i}}e.current=t,un=2}}function rg(){if(un===2){un=0;var e=ga,t=io,n=(t.flags&8772)!==0;if((t.subtreeFlags&8772)!==0||n){n=fe.T,fe.T=null;var i=Fe.p;Fe.p=2;var a=ze;ze|=4;try{US(e,t.alternate,t)}finally{ze=a,Fe.p=i,fe.T=n}}un=3}}function sg(){if(un===4||un===3){un=0;var e=rl;rl=null,SA();var t=ga,n=io,i=ka,a=ZS,r=(i&335544064)===i?10262:10256;if((n.subtreeFlags&r)!==0||(n.flags&r)!==0?un=5:(un=0,io=ga=null,iM(t,t.pendingLanes)),r=t.pendingLanes,r===0&&(as=null),Eg(i),n=n.stateNode,Oi&&typeof Oi.onCommitFiberRoot=="function")try{Oi.onCommitFiberRoot(fu,n,void 0,(n.current.flags&128)===128)}catch{}if(a!==null){n=fe.T,r=Fe.p,Fe.p=2,fe.T=null;try{for(var s=t.onRecoverableError,l=0;l<a.length;l++){var o=a[l];s(o.value,{componentStack:o.stack})}}finally{fe.T=n,Fe.p=r}}if(a=sl,s=ol,ol=null,a!==null&&(sl=null,s===null&&(s=[]),e!==null))for(o=0;o<a.length;o++)n=(0,a[o])(s),n!==void 0&&e.finished.finally(n);(ka&3)!==0&&ed(),qa(t),r=t.pendingLanes,(i&261930)!==0&&(r&42)!==0?t===ih?Yc++:(Yc=0,ih=t):(Yc=0,ih=null),yu(0,!1)}}function iM(e,t){(e.pooledCacheLanes&=t)===0&&(t=e.pooledCache,t!=null&&(e.pooledCache=null,gu(t)))}function ed(){return rl!==null&&(rl.skipTransition(),rl=null),ag(),rg(),sg(),og()}function og(){if(un!==5)return!1;var e=ga,t=ng;ng=0;var n=Eg(ka),i=fe.T,a=Fe.p;try{Fe.p=32>n?32:n,fe.T=null,n=ig,ig=null;var r=ga,s=ka;if(un=0,io=ga=null,ka=0,(ze&6)!==0)throw Error(St(331));var l=ze;if(ze|=4,WS(r.current),VS(r,r.current,s,n),ze=l,yu(0,!1),Oi&&typeof Oi.onPostCommitFiberRoot=="function")try{Oi.onPostCommitFiberRoot(fu,r)}catch{}return!0}finally{Fe.p=a,fe.T=i,iM(e,t)}}function s1(e,t,n){t=ia(n,t),t=H0(e.stateNode,t,2),e=es(e,t,2),e!==null&&(du(e,2),qa(e))}function Xe(e,t,n){if(e.tag===3)s1(e,e,n);else for(;t!==null;){if(t.tag===3){s1(t,e,n);break}else if(t.tag===1){var i=t.stateNode;if(typeof t.type.getDerivedStateFromError=="function"||typeof i.componentDidCatch=="function"&&(as===null||!as.has(i))){e=ia(n,e),n=xS(2),i=es(t,n,2),i!==null&&(yS(n,i,t,e),du(i,2),qa(i));break}}t=t.return}}function n0(e,t,n){var i=e.pingCache;if(i===null){i=e.pingCache=new tR;var a=new Set;i.set(t,a)}else a=i.get(t),a===void 0&&(a=new Set,i.set(t,a));a.has(n)||(ov=!0,a.add(n),e=lR.bind(null,e,t,n),t.then(e,e))}function lR(e,t,n){var i=e.pingCache;i!==null&&i.delete(t),e.pingedLanes|=e.suspendedLanes&n,e.warmLanes&=~n,Ze===e&&(De&n)===n&&((dn===4||dn===3&&(De&62914560)===De&&300>Ii()-Qh)&&(ze&2)===0?pl(e,0):Dh|=n,hl===De&&(hl=0)),qa(e)}function aM(e,t){t===0&&(t=Z1()),e=oo(e,t),e!==null&&(du(e,t),qa(e))}function cR(e){var t=e.memoizedState,n=0;t!==null&&(n=t.retryLane),aM(e,n)}function uR(e,t){var n=0;switch(e.tag){case 31:case 13:var i=e.stateNode,a=e.memoizedState;a!==null&&(n=a.retryLane);break;case 19:i=e.stateNode;break;case 22:i=e.stateNode._retryCache;break;default:throw Error(St(314))}i!==null&&i.delete(t),aM(e,n)}function fR(e,t){return Sg(e,t)}var ml=null,Bo=null,lg=!1,Ih=!1,i0=!1,jr=0;function qa(e){e!==Bo&&e.next===null&&(Bo===null?ml=Bo=e:Bo=Bo.next=e),Ih=!0,lg||(lg=!0,dR())}function yu(e,t){if(!i0&&Ih){i0=!0;do for(var n=!1,i=ml;i!==null;){if(!t)if(e!==0){var a=i.pendingLanes;if(a===0)var r=0;else{var s=i.suspendedLanes,l=i.pingedLanes;r=(1<<31-Pi(42|e)+1)-1,r&=a&~(s&~l),r=r&201326741?r&201326741|1:r?r|2:0}r!==0&&(n=!0,o1(i,r))}else r=De,r=Fh(i,i===Ze?r:0,i.cancelPendingCommit!==null||i.timeoutHandle!==-1),(r&3)===0||hu(i,r)||(n=!0,o1(i,r));i=i.next}while(n);i0=!1}}function hR(){rM()}function rM(){Ih=lg=!1;var e=0;jr!==0&&SR()&&(e=jr);for(var t=Ii(),n=null,i=ml;i!==null;){var a=i.next,r=sM(i,t);r===0?(i.next=null,n===null?ml=a:n.next=a,a===null&&(Bo=n)):(n=i,(e!==0||(r&3)!==0)&&(Ih=!0)),i=a}un!==0&&un!==5||yu(e,!1),jr!==0&&(jr=0)}function sM(e,t){for(var n=e.suspendedLanes,i=e.pingedLanes,a=e.expirationTimes,r=e.pendingLanes&-62914561;0<r;){var s=31-Pi(r),l=1<<s,o=a[s];o===-1?((l&n)===0||(l&i)!==0)&&(a[s]=DA(l,t)):o<=t&&(e.expiredLanes|=l),r&=~l}if(t=Ze,n=De,n=Fh(e,e===t?n:0,e.cancelPendingCommit!==null||e.timeoutHandle!==-1),i=e.callbackNode,n===0||e===t&&(Ve===2||Ve===9)||e.cancelPendingCommit!==null)return i!==null&&i!==null&&Om(i),e.callbackNode=null,e.callbackPriority=0;if((n&3)===0||hu(e,n)){if(t=n&-n,t===e.callbackPriority)return t;switch(i!==null&&Om(i),Eg(n)){case 2:case 8:n=W1;break;case 32:n=hh;break;case 268435456:n=q1;break;default:n=hh}return i=oM.bind(null,e),n=Sg(n,i),e.callbackPriority=t,e.callbackNode=n,t}return i!==null&&i!==null&&Om(i),e.callbackPriority=2,e.callbackNode=null,2}function oM(e,t){if(un!==0&&un!==5)return e.callbackNode=null,e.callbackPriority=0,null;var n=e.callbackNode;if(ed()&&e.callbackNode!==n)return null;var i=De;return i=Fh(e,e===Ze?i:0,e.cancelPendingCommit!==null||e.timeoutHandle!==-1),i===0?null:(KS(e,i,t),sM(e,Ii()),e.callbackNode!=null&&e.callbackNode===n?oM.bind(null,e):null)}function o1(e,t){if(ed())return null;KS(e,t,!0)}function dR(){ER(function(){(ze&6)!==0?Sg(X1,hR):rM()})}function cv(){if(jr===0){var e=$s;e===0&&(e=Ef,Ef<<=1,(Ef&261888)===0&&(Ef=256)),jr=e}return jr}function l1(e){return e==null||typeof e=="symbol"||typeof e=="boolean"?null:typeof e=="function"?e:Wf(e)}function pR(e,t,n,i,a){if(t==="submit"&&n&&n.stateNode===a){var r=l1((a[Ei]||null).action),s=i.submitter;s&&(t=(t=s[Ei]||null)?l1(t.formAction):s.getAttribute("formAction"),t!==null&&(r=t,s=null));var l=new Hh("action","action",null,i,a);e.push({event:l,listeners:[{instance:null,listener:function(){if(i.defaultPrevented){if(jr!==0){var o=new FormData(a,s);F0(n,{pending:!0,data:o,method:a.method,action:r},null,o)}}else typeof r=="function"&&(l.preventDefault(),o=new FormData(a,s),F0(n,{pending:!0,data:o,method:a.method,action:r},r,o))},currentTarget:a}]})}}for(Bf=0;Bf<A0.length;Bf++)Hf=A0[Bf],c1=Hf.toLowerCase(),u1=Hf[0].toUpperCase()+Hf.slice(1),va(c1,"on"+u1);var Hf,c1,u1,Bf;va(yb,"onAnimationEnd");va(_b,"onAnimationIteration");va(bb,"onAnimationStart");va("dblclick","onDoubleClick");va("focusin","onFocus");va("focusout","onBlur");va(T2,"onTransitionRun");va(w2,"onTransitionStart");va(A2,"onTransitionCancel");va(Sb,"onTransitionEnd");cl("onMouseEnter",["mouseout","mouseover"]);cl("onMouseLeave",["mouseout","mouseover"]);cl("onPointerEnter",["pointerout","pointerover"]);cl("onPointerLeave",["pointerout","pointerover"]);ro("onChange","change click focusin focusout input keydown keyup selectionchange".split(" "));ro("onSelect","focusout contextmenu dragend focusin keydown keyup mousedown mouseup selectionchange".split(" "));ro("onBeforeInput",["compositionend","keypress","textInput","paste"]);ro("onCompositionEnd","compositionend focusout keydown keypress keyup mousedown".split(" "));ro("onCompositionStart","compositionstart focusout keydown keypress keyup mousedown".split(" "));ro("onCompositionUpdate","compositionupdate focusout keydown keypress keyup mousedown".split(" "));var iu="abort canplay canplaythrough durationchange emptied encrypted ended error loadeddata loadedmetadata loadstart pause play playing progress ratechange resize seeked seeking stalled suspend timeupdate volumechange waiting".split(" "),mR=new Set("beforetoggle cancel close invalid load scroll scrollend toggle".split(" ").concat(iu));function lM(e,t){t=(t&4)!==0;for(var n=0;n<e.length;n++){var i=e[n],a=i.event;i=i.listeners;t:{var r=void 0;if(t)for(var s=i.length-1;0<=s;s--){var l=i[s],o=l.instance,c=l.currentTarget;if(l=l.listener,o!==r&&a.isPropagationStopped())break t;r=l,a.currentTarget=c;try{r(a)}catch(u){ph(u)}a.currentTarget=null,r=o}else for(s=0;s<i.length;s++){if(l=i[s],o=l.instance,c=l.currentTarget,l=l.listener,o!==r&&a.isPropagationStopped())break t;r=l,a.currentTarget=c;try{r(a)}catch(u){ph(u)}a.currentTarget=null,r=o}}}}function Ae(e,t){var n=t[a_];n===void 0&&(n=t[a_]=new Set);var i=e+"__bubble";n.has(i)||(cM(t,e,2,!1),n.add(i))}function a0(e,t,n){var i=0;t&&(i|=4),cM(n,e,i,t)}var Gf="_reactListening"+Math.random().toString(36).slice(2);function uv(e){if(!e[Gf]){e[Gf]=!0,tb.forEach(function(n){n!=="selectionchange"&&(mR.has(n)||a0(n,!1,e),a0(n,!0,e))});var t=e.nodeType===9?e:e.ownerDocument;t===null||t[Gf]||(t[Gf]=!0,a0("selectionchange",!1,t))}}function cM(e,t,n,i){switch(UM(t)){case 2:var a=oC;break;case 8:a=lC;break;default:a=vv}n=a.bind(null,t,n,e),a=void 0,!M0||t!=="touchstart"&&t!=="touchmove"&&t!=="wheel"||(a=!0),i?a!==void 0?e.addEventListener(t,n,{capture:!0,passive:a}):e.addEventListener(t,n,!0):a!==void 0?e.addEventListener(t,n,{passive:a}):e.addEventListener(t,n,!1)}function r0(e,t,n,i,a){var r=i;if((t&1)===0&&(t&2)===0&&i!==null)t:for(;;){if(i===null)return;var s=i.tag;if(s===3||s===4){var l=i.stateNode.containerInfo;if(l===a)break;if(s===4)for(s=i.return;s!==null;){var o=s.tag;if((o===3||o===4)&&s.stateNode.containerInfo===a)return;s=s.return}for(;l!==null;){if(s=ks(l),s===null)return;if(o=s.tag,o===5||o===6||o===26||o===27){i=r=s;continue t}l=l.parentNode}}i=i.return}lb(function(){var c=r,u=wg(n),p=[];t:{var f=Mb.get(e);if(f!==void 0){var h=Hh,g=e;switch(e){case"keypress":if(Yf(n)===0)break t;case"keydown":case"keyup":h=e2;break;case"focusin":g="focus",h=Gm;break;case"focusout":g="blur",h=Gm;break;case"beforeblur":case"afterblur":h=Gm;break;case"click":if(n.button===2)break t;case"auxclick":case"dblclick":case"mousedown":case"mousemove":case"mouseup":case"mouseout":case"mouseover":case"contextmenu":h=h_;break;case"drag":case"dragend":case"dragenter":case"dragexit":case"dragleave":case"dragover":case"dragstart":case"drop":h=kA;break;case"touchcancel":case"touchend":case"touchmove":case"touchstart":h=s2;break;case yb:case _b:case bb:h=qA;break;case Sb:h=l2;break;case"scroll":case"scrollend":h=GA;break;case"wheel":h=u2;break;case"copy":case"cut":case"paste":h=ZA;break;case"gotpointercapture":case"lostpointercapture":case"pointercancel":case"pointerdown":case"pointermove":case"pointerout":case"pointerover":case"pointerup":h=p_;break;case"submit":h=a2;break;case"toggle":case"beforetoggle":h=h2}var M=(t&4)!==0,v=!M&&(e==="scroll"||e==="scrollend"),d=M?f!==null?f+"Capture":null:f;M=[];for(var x=c,b;x!==null;){var y=x;if(b=y.stateNode,y=y.tag,y!==5&&y!==26&&y!==27||b===null||d===null||(y=Jc(x,d),y!=null&&M.push(au(x,y,b))),v)break;x=x.return}0<M.length&&(f=new h(f,g,null,n,u),p.push({event:f,listeners:M}))}}if((t&7)===0){t:{if(h=e==="mouseover"||e==="pointerover",f=e==="mouseout"||e==="pointerout",h&&n!==S0&&(g=n.relatedTarget||n.fromElement)&&(ks(g)||g[bl]))break t;(f||h)&&(g=u.window===u?u:(h=u.ownerDocument)?h.defaultView||h.parentWindow:window,f?(h=n.relatedTarget||n.toElement,f=c,h=h?ks(h):null,h!==null&&(v=uu(h),M=h.tag,h!==v||M!==5&&M!==27&&M!==6)&&(h=null)):(f=null,h=c),f!==h&&(M=h_,y="onMouseLeave",d="onMouseEnter",x="mouse",(e==="pointerout"||e==="pointerover")&&(M=p_,y="onPointerLeave",d="onPointerEnter",x="pointer"),v=f==null?g:Lc(f),b=h==null?g:Lc(h),g=new M(y,x+"leave",f,n,u),g.target=v,g.relatedTarget=b,y=null,ks(u)===c&&(M=new M(d,x+"enter",h,n,u),M.target=b,M.relatedTarget=v,y=M),v=y,M=f&&h?u0(f,h,gR):null,f!==null&&f1(p,g,f,M,!1),h!==null&&v!==null&&f1(p,v,h,M,!0)))}t:{if(f=c?Lc(c):window,h=f.nodeName&&f.nodeName.toLowerCase(),h==="select"||h==="input"&&f.type==="file")var w=x_;else if(v_(f))if(pb)w=S2;else{w=_2;var T=y2}else h=f.nodeName,!h||h.toLowerCase()!=="input"||f.type!=="checkbox"&&f.type!=="radio"?c&&Tg(c.elementType)&&(w=x_):w=b2;if(w&&(w=w(e,c))){db(p,w,n,u);break t}T&&T(e,f,c)}switch(T=c?Lc(c):window,e){case"focusin":(v_(T)||T.contentEditable==="true")&&(Wo=T,T0=c,zc=null);break;case"focusout":zc=T0=Wo=null;break;case"mousedown":w0=!0;break;case"contextmenu":case"mouseup":case"dragend":w0=!1,S_(p,n,u);break;case"selectionchange":if(E2)break;case"keydown":case"keyup":S_(p,n,u)}var m;if(Cg)t:{switch(e){case"compositionstart":var S="onCompositionStart";break t;case"compositionend":S="onCompositionEnd";break t;case"compositionupdate":S="onCompositionUpdate";break t}S=void 0}else Xo?fb(e,n)&&(S="onCompositionEnd"):e==="keydown"&&n.keyCode===229&&(S="onCompositionStart");S&&(ub&&n.locale!=="ko"&&(Xo||S!=="onCompositionStart"?S==="onCompositionEnd"&&Xo&&(m=cb()):(Yr=u,Ag="value"in Yr?Yr.value:Yr.textContent,Xo=!0)),T=Oh(c,S),0<T.length&&(S=new d_(S,e,null,n,u),p.push({event:S,listeners:T}),m?S.data=m:(m=hb(n),m!==null&&(S.data=m)))),(m=p2?m2(e,n):g2(e,n))&&(S=Oh(c,"onBeforeInput"),0<S.length&&(T=new d_("onBeforeInput","beforeinput",null,n,u),p.push({event:T,listeners:S}),T.data=m)),pR(p,e,c,n,u)}lM(p,t)})}function au(e,t,n){return{instance:e,listener:t,currentTarget:n}}function Oh(e,t){for(var n=t+"Capture",i=[];e!==null;){var a=e,r=a.stateNode;if(a=a.tag,a!==5&&a!==26&&a!==27||r===null||(a=Jc(e,n),a!=null&&i.unshift(au(e,a,r)),a=Jc(e,t),a!=null&&i.push(au(e,a,r))),e.tag===3)return i;e=e.return}return[]}function gR(e){if(e===null)return null;do e=e.return;while(e&&e.tag!==5&&e.tag!==27);return e||null}function f1(e,t,n,i,a){for(var r=t._reactName,s=[];n!==null&&n!==i;){var l=n,o=l.alternate,c=l.stateNode;if(l=l.tag,o!==null&&o===i)break;l!==5&&l!==26&&l!==27||c===null||(o=c,a?(c=Jc(n,r),c!=null&&s.unshift(au(n,c,o))):a||(c=Jc(n,r),c!=null&&s.push(au(n,c,o)))),n=n.return}s.length!==0&&e.push({event:t,listeners:s})}var vR=/\r\n?/g,xR=/\u0000|\uFFFD/g;function h1(e){return(typeof e=="string"?e:""+e).replace(vR,`
`).replace(xR,"")}function uM(e,t){return t=h1(t),h1(e)===t}function ke(e,t,n,i,a,r){switch(n){case"children":if(typeof i=="string")t==="body"||t==="textarea"&&i===""||ul(e,i);else if(typeof i=="number"||typeof i=="bigint")t!=="body"&&ul(e,""+i);else return;break;case"className":Af(e,"class",i);break;case"tabIndex":Af(e,"tabindex",i);break;case"dir":case"role":case"viewBox":case"width":case"height":Af(e,n,i);break;case"style":ob(e,i,r);return;case"data":if(t!=="object"){Af(e,"data",i);break}case"src":case"href":if(i===""&&(t!=="a"||n!=="href")){e.removeAttribute(n);break}if(i==null||typeof i=="function"||typeof i=="symbol"||typeof i=="boolean"){e.removeAttribute(n);break}i=Wf(i),e.setAttribute(n,i);break;case"action":case"formAction":if(typeof i=="function"){e.setAttribute(n,"javascript:throw new Error('A React form was unexpectedly submitted. If you called form.submit() manually, consider using form.requestSubmit() instead. If you\\'re trying to use event.stopPropagation() in a submit event handler, consider also calling event.preventDefault().')");break}else typeof r=="function"&&(n==="formAction"?(t!=="input"&&ke(e,t,"name",a.name,a,null),ke(e,t,"formEncType",a.formEncType,a,null),ke(e,t,"formMethod",a.formMethod,a,null),ke(e,t,"formTarget",a.formTarget,a,null)):(ke(e,t,"encType",a.encType,a,null),ke(e,t,"method",a.method,a,null),ke(e,t,"target",a.target,a,null)));if(i==null||typeof i=="symbol"||typeof i=="boolean"){e.removeAttribute(n);break}i=Wf(i),e.setAttribute(n,i);break;case"onClick":i!=null&&(e.onclick=Ba);return;case"onScroll":i!=null&&Ae("scroll",e);return;case"onScrollEnd":i!=null&&Ae("scrollend",e);return;case"dangerouslySetInnerHTML":if(i!=null){if(typeof i!="object"||!("__html"in i))throw Error(St(61));if(n=i.__html,n!=null){if(a.children!=null)throw Error(St(60));r?.__html!==n&&(e.innerHTML=n)}}break;case"multiple":e.multiple=i&&typeof i!="function"&&typeof i!="symbol";break;case"muted":e.muted=i&&typeof i!="function"&&typeof i!="symbol";break;case"suppressContentEditableWarning":case"suppressHydrationWarning":case"defaultValue":case"defaultChecked":case"innerHTML":case"ref":break;case"autoFocus":break;case"xlinkHref":if(i==null||typeof i=="function"||typeof i=="boolean"||typeof i=="symbol"){e.removeAttribute("xlink:href");break}n=Wf(i),e.setAttributeNS("http://www.w3.org/1999/xlink","xlink:href",n);break;case"contentEditable":case"spellCheck":case"draggable":case"value":case"autoReverse":case"externalResourcesRequired":case"focusable":case"preserveAlpha":i!=null&&typeof i!="function"&&typeof i!="symbol"?e.setAttribute(n,i):e.removeAttribute(n);break;case"inert":case"allowFullScreen":case"async":case"autoPlay":case"controls":case"credentialless":case"default":case"defer":case"disabled":case"disablePictureInPicture":case"disableRemotePlayback":case"formNoValidate":case"hidden":case"loop":case"noModule":case"noValidate":case"open":case"playsInline":case"readOnly":case"required":case"reversed":case"scoped":case"seamless":case"itemScope":i&&typeof i!="function"&&typeof i!="symbol"?e.setAttribute(n,""):e.removeAttribute(n);break;case"capture":case"download":i===!0?e.setAttribute(n,""):i!==!1&&i!=null&&typeof i!="function"&&typeof i!="symbol"?e.setAttribute(n,i):e.removeAttribute(n);break;case"cols":case"rows":case"size":case"span":i!=null&&typeof i!="function"&&typeof i!="symbol"&&!isNaN(i)&&1<=i?e.setAttribute(n,i):e.removeAttribute(n);break;case"rowSpan":case"start":i==null||typeof i=="function"||typeof i=="symbol"||isNaN(i)?e.removeAttribute(n):e.setAttribute(n,i);break;case"popover":Ae("beforetoggle",e),Ae("toggle",e),Xf(e,"popover",i);break;case"xlinkActuate":cr(e,"http://www.w3.org/1999/xlink","xlink:actuate",i);break;case"xlinkArcrole":cr(e,"http://www.w3.org/1999/xlink","xlink:arcrole",i);break;case"xlinkRole":cr(e,"http://www.w3.org/1999/xlink","xlink:role",i);break;case"xlinkShow":cr(e,"http://www.w3.org/1999/xlink","xlink:show",i);break;case"xlinkTitle":cr(e,"http://www.w3.org/1999/xlink","xlink:title",i);break;case"xlinkType":cr(e,"http://www.w3.org/1999/xlink","xlink:type",i);break;case"xmlBase":cr(e,"http://www.w3.org/XML/1998/namespace","xml:base",i);break;case"xmlLang":cr(e,"http://www.w3.org/XML/1998/namespace","xml:lang",i);break;case"xmlSpace":cr(e,"http://www.w3.org/XML/1998/namespace","xml:space",i);break;case"is":Xf(e,"is",i);break;case"innerText":case"textContent":return;default:if(!(2<n.length)||n[0]!=="o"&&n[0]!=="O"||n[1]!=="n"&&n[1]!=="N")n=BA.get(n)||n,Xf(e,n,i);else return}Oe=!0}function cg(e,t,n,i,a,r){switch(n){case"style":ob(e,i,r);return;case"dangerouslySetInnerHTML":if(i!=null){if(typeof i!="object"||!("__html"in i))throw Error(St(61));if(n=i.__html,n!=null){if(a.children!=null)throw Error(St(60));r?.__html!==n&&(e.innerHTML=n)}}break;case"children":if(typeof i=="string")ul(e,i);else if(typeof i=="number"||typeof i=="bigint")ul(e,""+i);else return;break;case"onScroll":i!=null&&Ae("scroll",e);return;case"onScrollEnd":i!=null&&Ae("scrollend",e);return;case"onClick":i!=null&&(e.onclick=Ba);return;case"suppressContentEditableWarning":case"suppressHydrationWarning":case"innerHTML":case"ref":return;case"innerText":case"textContent":return;default:if(!eb.hasOwnProperty(n))t:{if(n[0]==="o"&&n[1]==="n"&&(a=n.endsWith("Capture"),r=n.slice(2,a?n.length-7:void 0),t=e[Ei]||null,t=t!=null?t[n]:null,typeof t=="function"&&e.removeEventListener(r,t,a),typeof i=="function")){typeof t!="function"&&t!==null&&(n in e?e[n]=null:e.hasAttribute(n)&&e.removeAttribute(n)),e.addEventListener(r,i,a);break t}Oe=!0,n in e?e[n]=i:i===!0?e.setAttribute(n,""):Xf(e,n,i)}return}Oe=!0}function kn(e,t,n){switch(t){case"div":case"span":case"svg":case"path":case"a":case"g":case"p":case"li":break;case"img":Ae("error",e),Ae("load",e);var i=!1,a=!1,r;for(r in n)if(n.hasOwnProperty(r)){var s=n[r];if(s!=null)switch(r){case"src":i=!0;break;case"srcSet":a=!0;break;case"children":case"dangerouslySetInnerHTML":throw Error(St(137,t));default:ke(e,t,r,s,n,null)}}a&&ke(e,t,"srcSet",n.srcSet,n,null),i&&ke(e,t,"src",n.src,n,null);return;case"input":Ae("invalid",e);var l=r=s=a=null,o=null,c=null;for(i in n)if(n.hasOwnProperty(i)){var u=n[i];if(u!=null)switch(i){case"name":a=u;break;case"type":s=u;break;case"checked":o=u;break;case"defaultChecked":c=u;break;case"value":r=u;break;case"defaultValue":l=u;break;case"children":case"dangerouslySetInnerHTML":if(u!=null)throw Error(St(137,t));break;default:ke(e,t,i,u,n,null)}}ab(e,r,l,o,c,s,a,!1);return;case"select":Ae("invalid",e),i=s=r=null;for(a in n)if(n.hasOwnProperty(a)&&(l=n[a],l!=null))switch(a){case"value":r=l;break;case"defaultValue":s=l;break;case"multiple":i=l;default:ke(e,t,a,l,n,null)}t=r,n=s,e.multiple=!!i,t!=null?$o(e,!!i,t,!1):n!=null&&$o(e,!!i,n,!0);return;case"textarea":Ae("invalid",e),r=a=i=null;for(s in n)if(n.hasOwnProperty(s)&&(l=n[s],l!=null))switch(s){case"value":i=l;break;case"defaultValue":a=l;break;case"children":r=l;break;case"dangerouslySetInnerHTML":if(l!=null)throw Error(St(91));break;default:ke(e,t,s,l,n,null)}sb(e,i,a,r);return;case"option":for(o in n)n.hasOwnProperty(o)&&(i=n[o],i!=null)&&(o==="selected"?e.selected=i&&typeof i!="function"&&typeof i!="symbol":ke(e,t,o,i,n,null));return;case"dialog":Ae("beforetoggle",e),Ae("toggle",e),Ae("cancel",e),Ae("close",e);break;case"iframe":case"object":Ae("load",e);break;case"video":case"audio":for(i=0;i<iu.length;i++)Ae(iu[i],e);break;case"image":Ae("error",e),Ae("load",e);break;case"details":Ae("toggle",e);break;case"embed":case"source":case"link":Ae("error",e),Ae("load",e);case"area":case"base":case"br":case"col":case"hr":case"keygen":case"meta":case"param":case"track":case"wbr":case"menuitem":for(c in n)if(n.hasOwnProperty(c)&&(i=n[c],i!=null))switch(c){case"children":case"dangerouslySetInnerHTML":throw Error(St(137,t));default:ke(e,t,c,i,n,null)}return;default:if(Tg(t)){for(u in n)n.hasOwnProperty(u)&&(i=n[u],i!==void 0&&cg(e,t,u,i,n,void 0));return}}for(l in n)n.hasOwnProperty(l)&&(i=n[l],i!=null&&ke(e,t,l,i,n,null))}var yR={};function _R(e,t,n,i){switch(t){case"div":case"span":case"svg":case"path":case"a":case"g":case"p":case"li":break;case"input":var a=null,r=null,s=null,l=null,o=null,c=null,u=null;for(h in n){var p=n[h];if(n.hasOwnProperty(h)&&p!=null)switch(h){case"checked":break;case"value":break;case"defaultValue":o=p;default:i.hasOwnProperty(h)||ke(e,t,h,null,i,p)}}for(var f in i){var h=i[f];if(p=n[f],i.hasOwnProperty(f)&&(h!=null||p!=null))switch(f){case"type":h!==p&&(Oe=!0),r=h;break;case"name":h!==p&&(Oe=!0),a=h;break;case"checked":h!==p&&(Oe=!0),c=h;break;case"defaultChecked":h!==p&&(Oe=!0),u=h;break;case"value":h!==p&&(Oe=!0),s=h;break;case"defaultValue":h!==p&&(Oe=!0),l=h;break;case"children":case"dangerouslySetInnerHTML":if(h!=null)throw Error(St(137,t));break;default:h!==p&&ke(e,t,f,h,i,p)}}b0(e,s,l,o,c,u,r,a);return;case"select":h=s=l=f=null;for(r in n)if(o=n[r],n.hasOwnProperty(r)&&o!=null)switch(r){case"value":break;case"multiple":h=o;default:i.hasOwnProperty(r)||ke(e,t,r,null,i,o)}for(a in i)if(r=i[a],o=n[a],i.hasOwnProperty(a)&&(r!=null||o!=null))switch(a){case"value":r!==o&&(Oe=!0),f=r;break;case"defaultValue":r!==o&&(Oe=!0),l=r;break;case"multiple":r!==o&&(Oe=!0),s=r;default:r!==o&&ke(e,t,a,r,i,o)}t=l,n=s,i=h,f!=null?$o(e,!!n,f,!1):!!i!=!!n&&(t!=null?$o(e,!!n,t,!0):$o(e,!!n,n?[]:"",!1));return;case"textarea":h=f=null;for(l in n)if(a=n[l],n.hasOwnProperty(l)&&a!=null&&!i.hasOwnProperty(l))switch(l){case"value":break;case"children":break;default:ke(e,t,l,null,i,a)}for(s in i)if(a=i[s],r=n[s],i.hasOwnProperty(s)&&(a!=null||r!=null))switch(s){case"value":a!==r&&(Oe=!0),f=a;break;case"defaultValue":a!==r&&(Oe=!0),h=a;break;case"children":break;case"dangerouslySetInnerHTML":if(a!=null)throw Error(St(91));break;default:a!==r&&ke(e,t,s,a,i,r)}rb(e,f,h);return;case"option":for(var g in n)f=n[g],n.hasOwnProperty(g)&&f!=null&&!i.hasOwnProperty(g)&&(g==="selected"?e.selected=!1:ke(e,t,g,null,i,f));for(o in i)f=i[o],h=n[o],i.hasOwnProperty(o)&&f!==h&&(f!=null||h!=null)&&(o==="selected"?(f!==h&&(Oe=!0),e.selected=f&&typeof f!="function"&&typeof f!="symbol"):ke(e,t,o,f,i,h));return;case"img":case"link":case"area":case"base":case"br":case"col":case"embed":case"hr":case"keygen":case"meta":case"param":case"source":case"track":case"wbr":case"menuitem":for(var M in n)f=n[M],n.hasOwnProperty(M)&&f!=null&&!i.hasOwnProperty(M)&&ke(e,t,M,null,i,f);for(c in i)if(f=i[c],h=n[c],i.hasOwnProperty(c)&&f!==h&&(f!=null||h!=null))switch(c){case"children":case"dangerouslySetInnerHTML":if(f!=null)throw Error(St(137,t));break;default:ke(e,t,c,f,i,h)}return;default:if(Tg(t)){for(var v in n)f=n[v],n.hasOwnProperty(v)&&f!==void 0&&!i.hasOwnProperty(v)&&cg(e,t,v,void 0,i,f);for(u in i)f=i[u],h=n[u],!i.hasOwnProperty(u)||f===h||f===void 0&&h===void 0||cg(e,t,u,f,i,h);return}}for(var d in n)f=n[d],n.hasOwnProperty(d)&&f!=null&&!i.hasOwnProperty(d)&&ke(e,t,d,null,i,f);for(p in i)f=i[p],h=n[p],!i.hasOwnProperty(p)||f===h||f==null&&h==null||ke(e,t,p,f,i,h)}function d1(e){switch(e){case"css":case"script":case"font":case"img":case"image":case"input":case"link":return!0;default:return!1}}function bR(){if(typeof performance.getEntriesByType=="function"){for(var e=0,t=0,n=performance.getEntriesByType("resource"),i=0;i<n.length;i++){var a=n[i],r=a.transferSize,s=a.initiatorType,l=a.duration;if(r&&l&&d1(s)){for(s=0,l=a.responseEnd,i+=1;i<n.length;i++){var o=n[i],c=o.startTime;if(c>l)break;var u=o.transferSize,p=o.initiatorType;u&&d1(p)&&(o=o.responseEnd,s+=u*(o<l?1:(l-c)/(o-c)))}if(--i,t+=8*(r+s)/(a.duration/1e3),e++,10<e)break}}if(0<e)return t/e/1e6}return navigator.connection&&(e=navigator.connection.downlink,typeof e=="number")?e:5}var ug=null,fg=null;function ru(e){return e.nodeType===9?e:e.ownerDocument}function p1(e){switch(e){case"http://www.w3.org/2000/svg":return 1;case"http://www.w3.org/1998/Math/MathML":return 2;default:return 0}}function fM(e,t){if(e===0)switch(t){case"svg":return 1;case"math":return 2;default:return 0}return e===1&&t==="foreignObject"?0:e}function hM(e,t,n,i){return n=ru(n).createElement(e),n[Bn]=i,n[Ei]=t,kn(n,e,t),Nn(n),n}function hg(e,t){return e==="textarea"||e==="noscript"||typeof t.children=="string"||typeof t.children=="number"||typeof t.children=="bigint"||typeof t.dangerouslySetInnerHTML=="object"&&t.dangerouslySetInnerHTML!==null&&t.dangerouslySetInnerHTML.__html!=null}var s0=null;function SR(){var e=window.event;return e&&e.type==="popstate"?e===s0?!1:(s0=e,!0):(s0=null,!1)}var fv=typeof setTimeout=="function"?setTimeout:void 0,MR=typeof clearTimeout=="function"?clearTimeout:void 0,m1=typeof Promise=="function"?Promise:void 0,g1=typeof requestAnimationFrame=="function"?requestAnimationFrame:fv,ER=typeof queueMicrotask=="function"?queueMicrotask:typeof m1<"u"?function(e){return m1.resolve(null).then(e).catch(TR)}:fv;function TR(e){setTimeout(function(){throw e})}function ps(e){return e==="head"}function v1(e,t){var n=t,i=0;do{var a=n.nextSibling;if(e.removeChild(n),a&&a.nodeType===8)if(n=a.data,n==="/$"||n==="/&"){if(i===0){e.removeChild(a),_l(t);return}i--}else if(n==="$"||n==="$?"||n==="$~"||n==="$!"||n==="&")i++;else if(n==="html")l0(e.ownerDocument.documentElement);else if(n==="head"){n=e.ownerDocument.head,l0(n);for(var r=n.firstChild;r;){var s=r.nextSibling,l=r.nodeName;r[pu]||l==="SCRIPT"||l==="STYLE"||l==="LINK"&&r.rel.toLowerCase()==="stylesheet"||n.removeChild(r),r=s}}else n==="body"&&l0(e.ownerDocument.body);n=a}while(n);_l(t)}function x1(e,t){var n=e;e=0;do{var i=n.nextSibling;if(n.nodeType===1?t?(n._stashedDisplay=n.style.display,n.style.display="none"):(n.style.display=n._stashedDisplay||"",n.getAttribute("style")===""&&n.removeAttribute("style")):n.nodeType===3&&(t?(n._stashedText=n.nodeValue,n.nodeValue=""):n.nodeValue=n._stashedText||""),i&&i.nodeType===8)if(n=i.data,n==="/$"){if(e===0)break;e--}else n!=="$"&&n!=="$?"&&n!=="$~"&&n!=="$!"||e++;n=i}while(n)}function dM(e,t,n){if(t=CSS.escape(t)!==t?"r-"+btoa(t).replace(/=/g,""):t,e.style.viewTransitionName=t,n!=null&&(e.style.viewTransitionClass=n),n=getComputedStyle(e),n.display==="inline"){if(t=e.getClientRects(),t.length===1)var i=1;else for(var a=i=0;a<t.length;a++){var r=t[a];0<r.width&&0<r.height&&i++}i===1&&(e=e.style,e.display=t.length===1?"inline-block":"block",e.marginTop="-"+n.paddingTop,e.marginBottom="-"+n.paddingBottom)}}function pM(e,t){e=e.style,t=t.style;var n=t!=null?t.hasOwnProperty("viewTransitionName")?t.viewTransitionName:t.hasOwnProperty("view-transition-name")?t["view-transition-name"]:null:null;e.viewTransitionName=n==null||typeof n=="boolean"?"":(""+n).trim(),n=t!=null?t.hasOwnProperty("viewTransitionClass")?t.viewTransitionClass:t.hasOwnProperty("view-transition-class")?t["view-transition-class"]:null:null,e.viewTransitionClass=n==null||typeof n=="boolean"?"":(""+n).trim(),e.display==="inline-block"&&(t==null?e.display=e.margin="":(n=t.display,e.display=n==null||typeof n=="boolean"?"":n,n=t.margin,n!=null?e.margin=n:(n=t.hasOwnProperty("marginTop")?t.marginTop:t["margin-top"],e.marginTop=n==null||typeof n=="boolean"?"":n,t=t.hasOwnProperty("marginBottom")?t.marginBottom:t["margin-bottom"],e.marginBottom=t==null||typeof t=="boolean"?"":t)))}function mM(e,t,n){return n=n.ownerDocument.defaultView,{rect:e,abs:t.position==="absolute"||t.position==="fixed",clip:t.clipPath!=="none"||t.overflow!=="visible"||t.filter!=="none"||t.mask!=="none"||t.mask!=="none"||t.borderRadius!=="0px",view:0<=e.bottom&&0<=e.right&&e.top<=n.innerHeight&&e.left<=n.innerWidth}}function dg(e){var t=e.getBoundingClientRect(),n=getComputedStyle(e);return mM(t,n,e)}function wR(e){var t=e.getBoundingClientRect();t=new DOMRect(t.x+2e4,t.y+2e4,t.width,t.height);var n=getComputedStyle(e);return mM(t,n,e)}function AR(e){return e.documentElement.clientHeight}function RR(e){this.addEventListener("load",e),this.addEventListener("error",e)}function CR(e,t,n,i,a,r,s,l,o){var c=t.nodeType===9?t:t.ownerDocument;try{var u=c.startViewTransition({update:function(){var f=c.defaultView,h=f.navigation&&f.navigation.transition,g=c.fonts.status;i();var M=[];if(g==="loaded"&&(AR(c),c.fonts.status==="loading"&&M.push(c.fonts.ready)),g=M.length,e!==null)for(var v=e.suspenseyImages,d=0,x=0;x<v.length;x++){var b=v[x];if(!b.complete){var y=b.getBoundingClientRect();if(0<y.bottom&&0<y.right&&y.top<f.innerHeight&&y.left<f.innerWidth){if(d+=AM(b),d>sh){M.length=g;break}b=new Promise(RR.bind(b)),M.push(b)}}}if(0<M.length)return f=Promise.race([Promise.all(M),new Promise(function(w){return setTimeout(w,500)})]).then(a,a),(h?Promise.allSettled([h.finished,f]):f).then(r,r);if(a(),h)return h.finished.then(r,r);r()},types:n});c.__reactViewTransition=u;var p=[];return u.ready.then(function(){for(var f=c.documentElement.getAnimations({subtree:!0}),h=0;h<f.length;h++){var g=f[h],M=g.effect,v=M.pseudoElement;if(v!=null&&v.startsWith("::view-transition")){p.push(g),g=M.getKeyframes();for(var d=v=void 0,x=!0,b=0;b<g.length;b++){var y=g[b],w=y.width;if(v===void 0)v=w;else if(v!==w){x=!1;break}if(w=y.height,d===void 0)d=w;else if(d!==w){x=!1;break}delete y.width,delete y.height,y.transform==="none"&&delete y.transform}x&&v!==void 0&&d!==void 0&&(M.setKeyframes(g),x=getComputedStyle(M.target,M.pseudoElement),x.width!==v||x.height!==d)&&(x=g[0],x.width=v,x.height=d,x=g[g.length-1],x.width=v,x.height=d,M.setKeyframes(g))}}s()},function(f){c.__reactViewTransition===u&&(c.__reactViewTransition=null);try{typeof f=="object"&&f!==null&&f.name==="InvalidStateError"&&(f.message==="View transition was skipped because document visibility state is hidden."||f.message==="Skipping view transition because document visibility state has become hidden."||f.message==="Skipping view transition because viewport size changed."||f.message==="Transition was aborted because of invalid state")&&(f=null),f!==null&&o(f)}finally{i(),a(),s()}}),u.finished.finally(function(){for(var f=0;f<p.length;f++)p[f].cancel();c.__reactViewTransition===u&&(c.__reactViewTransition=null),l()}),u}catch{return i(),a(),s(),null}}function Xs(e,t){this._scope=document.documentElement,this._selector="::view-transition-"+e+"("+t+")"}Xs.prototype.animate=function(e,t){return t=typeof t=="number"?{duration:t}:Je({},t),t.pseudoElement=this._selector,this._scope.animate(e,t)};Xs.prototype.getAnimations=function(){for(var e=this._scope,t=this._selector,n=e.getAnimations({subtree:!0}),i=[],a=0;a<n.length;a++){var r=n[a].effect;r!==null&&r.target===e&&r.pseudoElement===t&&i.push(n[a])}return i};Xs.prototype.getComputedStyle=function(){return getComputedStyle(this._scope,this._selector)};function gM(e){return{name:e,group:new Xs("group",e),imagePair:new Xs("image-pair",e),old:new Xs("old",e),new:new Xs("new",e)}}function Bi(e){this._fragmentFiber=e,this._observers=this._eventListeners=null}Bi.prototype.addEventListener=function(e,t,n){var i=null,a=null;if(!(n!=null&&typeof n!="boolean"&&(i=n.signal||null,i!==null&&i.aborted))){this._eventListeners===null&&(this._eventListeners=[]);var r=this._eventListeners;if(vM(r,e,t,n)===-1){var s=this,l=t;n!=null&&typeof n!="boolean"&&n.once===!0&&(l=function(o){s.removeEventListener(e,t,n),typeof t=="function"?t.call(this,o):t.handleEvent(o)}),i!==null&&(a=s.removeEventListener.bind(s,e,t,n),i.addEventListener("abort",a,{once:!0}),a=i.removeEventListener.bind(i,"abort",a)),i=gl(n),r.push({type:e,listener:t,optionsOrUseCapture:n,attachedListener:l,cleanup:a}),Mi(this._fragmentFiber.child,!1,DR,e,l,i)}this._eventListeners=r}};function DR(e,t,n,i){return En(e).addEventListener(t,n,i),!1}Bi.prototype.removeEventListener=function(e,t,n){var i=this._eventListeners;if(i!==null&&(t=vM(i,e,t,n),t!==-1)){var a=i[t];n=a.attachedListener;var r=a.cleanup;a=gl(a.optionsOrUseCapture),Mi(this._fragmentFiber.child,!1,NR,e,n,a),i.splice(t,1),r!==null&&r()}};function NR(e,t,n,i){return En(e).removeEventListener(t,n,i),!1}function gl(e){return e!=null&&typeof e!="boolean"&&(e.once===!0||e.signal instanceof AbortSignal)?{capture:e.capture,passive:e.passive}:e}function y1(e){return e==null?"c=0":typeof e=="boolean"?"c="+(e?"1":"0"):"c="+(e.capture?"1":"0")}function vM(e,t,n,i){if(e.length===0)return-1;i=y1(i);for(var a=0;a<e.length;a++){var r=e[a];if(r.type===t&&r.listener===n&&y1(r.optionsOrUseCapture)===i)return a}return-1}Bi.prototype.dispatchEvent=function(e){var t=ao(this._fragmentFiber);if(t===null)return!0;t=En(t);var n=this._eventListeners;if(n!==null&&0<n.length||!e.bubbles){var i=t.nodeType===9?t.createComment(""):document.createTextNode("");if(n)for(var a=0;a<n.length;a++){var r=n[a];i.addEventListener(r.type,r.attachedListener,gl(r.optionsOrUseCapture))}if(t.appendChild(i),e=i.dispatchEvent(e),n)for(a=0;a<n.length;a++)r=n[a],i.removeEventListener(r.type,r.attachedListener,gl(r.optionsOrUseCapture));return t.removeChild(i),e}return t.dispatchEvent(e)};Bi.prototype.focus=function(e){Mi(this._fragmentFiber.child,!0,xM,e,void 0,void 0)};function xM(e,t){return e.tag===6?!1:(e=En(e),kR(e,t))}Bi.prototype.focusLast=function(e){var t=[];Mi(this._fragmentFiber.child,!0,hv,t,void 0,void 0);for(var n=t.length-1;0<=n&&!xM(t[n],e);n--);};function hv(e,t){return t.push(e),!1}Bi.prototype.blur=function(){var e=ao(this._fragmentFiber);e!==null&&(e=En(e),e=ru(e).activeElement,e!==null&&Mi(this._fragmentFiber.child,!1,LR,e,void 0,void 0))};function LR(e,t){return e.tag===6?!1:(e=En(e),e===t||e.contains(t)?(t.blur(),!0):!1)}Bi.prototype.observeUsing=function(e){this._observers===null&&(this._observers=new Set),this._observers.add(e),Mi(this._fragmentFiber.child,!1,UR,e,void 0,void 0)};function UR(e,t){return e.tag===6||(e=En(e),t.observe(e)),!1}Bi.prototype.unobserveUsing=function(e){var t=this._observers;if(t!==null&&t.has(e)){t.delete(e),Mi(this._fragmentFiber.child,!1,IR,e,void 0,void 0);for(var n=t=0;n<ma.length;n++){var i=ma[n];i.fragmentInstance===this&&i.observer===e?e.unobserve(i.instance):ma[t++]=i}ma.length=t}};function IR(e,t){return e.tag===6||(e=En(e),t.unobserve(e)),!1}var ma=[],o0=!1;function OR(e,t,n){ma.push({fragmentInstance:e,observer:t,instance:n}),o0||(o0=!0,XR(function(){o0=!1;var i=ma;ma=[];for(var a=0;a<i.length;a++){var r=i[a];r.observer.unobserve(r.instance)}}))}Bi.prototype.getClientRects=function(){var e=[];return Mi(this._fragmentFiber.child,!1,PR,e,void 0,void 0),e};function PR(e,t){if(e.tag===6){e=e.stateNode;var n=e.ownerDocument.createRange();n.selectNodeContents(e),t.push.apply(t,n.getClientRects())}else e=En(e),t.push.apply(t,e.getClientRects());return!1}Bi.prototype.getRootNode=function(e){var t=ao(this._fragmentFiber);return t===null?this:En(t).getRootNode(e)};Bi.prototype.compareDocumentPosition=function(e){var t=ao(this._fragmentFiber);if(t===null)return Node.DOCUMENT_POSITION_DISCONNECTED;var n=[];Mi(this._fragmentFiber.child,!1,hv,n,void 0,void 0);var i=En(t);if(n.length===0){if(n=i,Qy(this._fragmentFiber)){t:{for(t=this._fragmentFiber.return;t!==null;){if(t.tag===4){t=t.stateNode.containerInfo;break t}if(t.tag===3||t.tag===5||t.tag===27)break;t=t.return}t=null}t!=null&&(n=t)}t=this._fragmentFiber;var a=i=n.compareDocumentPosition(e);return n===e?a=Node.DOCUMENT_POSITION_CONTAINS:i&Node.DOCUMENT_POSITION_CONTAINED_BY&&(n=H1(t)[1],n===null?a=Node.DOCUMENT_POSITION_PRECEDING:(e=En(n).compareDocumentPosition(e),a=e===0||e&Node.DOCUMENT_POSITION_FOLLOWING?Node.DOCUMENT_POSITION_FOLLOWING:Node.DOCUMENT_POSITION_PRECEDING)),a|=Node.DOCUMENT_POSITION_IMPLEMENTATION_SPECIFIC}t=En(n[0]),a=En(n[n.length-1]);var r=Qy(this._fragmentFiber)?t.parentElement:i;if(r==null)return Node.DOCUMENT_POSITION_DISCONNECTED;i=r.compareDocumentPosition(t)&Node.DOCUMENT_POSITION_CONTAINED_BY,r=r.compareDocumentPosition(a)&Node.DOCUMENT_POSITION_CONTAINED_BY;var s=t.compareDocumentPosition(e),l=a.compareDocumentPosition(e),o=s&Node.DOCUMENT_POSITION_CONTAINED_BY||l&Node.DOCUMENT_POSITION_CONTAINED_BY;return l=i&&r&&s&Node.DOCUMENT_POSITION_FOLLOWING&&l&Node.DOCUMENT_POSITION_PRECEDING,t=i&&t===e||r&&a===e||o||l?Node.DOCUMENT_POSITION_CONTAINED_BY:!i&&t===e||!r&&a===e?Node.DOCUMENT_POSITION_IMPLEMENTATION_SPECIFIC:s,t&Node.DOCUMENT_POSITION_DISCONNECTED||t&Node.DOCUMENT_POSITION_IMPLEMENTATION_SPECIFIC||zR(t,this._fragmentFiber,n[0],n[n.length-1],e)?t:Node.DOCUMENT_POSITION_IMPLEMENTATION_SPECIFIC};function zR(e,t,n,i,a){var r=ks(a);if(e&Node.DOCUMENT_POSITION_CONTAINED_BY){if(n=!!r)t:{for(;r!==null;){if(r.tag===7&&(r===t||r.alternate===t)){n=!0;break t}r=r.return}n=!1}return n}if(e&Node.DOCUMENT_POSITION_CONTAINS){if(r===null)return r=a.ownerDocument,a===r||a===r.documentElement||a===r.body;t:{for(r=t,t=ao(t);r!==null;){if(!(r.tag!==5&&r.tag!==3&&r.tag!==27||r!==t&&r.alternate!==t)){r=!0;break t}r=r.return}r=!1}return r}return e&Node.DOCUMENT_POSITION_PRECEDING?((t=!!r)&&!(t=r===n)&&(t=u0(n,r,$y),t===null?t=!1:(Mi(t,!0,dA,r,n),r=Ho,Ho=null,t=r!==null)),t):e&Node.DOCUMENT_POSITION_FOLLOWING?((t=!!r)&&!(t=r===i)&&(t=u0(i,r,$y),t===null?t=!1:(Mi(t,!0,pA,r,i),r=Ho,c0=Ho=null,t=r!==null)),t):!1}function _1(e,t){var n=e.ownerDocument.createRange();n.selectNodeContents(e),e=n.getBoundingClientRect(),window.scrollTo(window.scrollX+e.left,t?window.scrollY+e.top:window.scrollY+e.bottom-window.innerHeight)}Bi.prototype.scrollIntoView=function(e){if(typeof e=="object")throw Error(St(566));var t=[];Mi(this._fragmentFiber.child,!1,hv,t,void 0,void 0);var n=e!==!1;if(t.length===0){var i=H1(this._fragmentFiber);if(i=n?i[1]||i[0]||ao(this._fragmentFiber):i[0]||i[1],i===null)return;if(i.tag===6){e=En(i),_1(e,n);return}if(i=En(i),i.nodeType!==9){if(i.nodeType===11){n="host"in i?i.host:null,n!==null&&n.scrollIntoView(e);return}i.scrollIntoView(e)}}for(i=n?t.length-1:0;i!==(n?-1:t.length);){var a=t[i];a.tag===6?(a=En(a),_1(a,n)):En(a).scrollIntoView(e),i+=n?-1:1}};function FR(e,t){return e=En(e),yM(e,t),!1}function yM(e,t){e.reactFragments==null&&(e.reactFragments=new Set),e.reactFragments.add(t)}function _M(e,t){var n=t._eventListeners;if(n!==null)for(var i=0;i<n.length;i++){var a=n[i];e.addEventListener(a.type,a.attachedListener,gl(a.optionsOrUseCapture))}e.nodeType!==3&&(n=t._observers,n!==null&&n.forEach(function(r){for(var s=0,l=0;l<ma.length;l++){var o=ma[l];(o.fragmentInstance!==t||o.observer!==r||o.instance!==e)&&(ma[s++]=o)}ma.length=s,r.observe(e)}),yM(e,t))}function BR(e,t){var n=t._eventListeners;if(n!==null)for(var i=0;i<n.length;i++){var a=n[i];e.removeEventListener(a.type,a.attachedListener,gl(a.optionsOrUseCapture))}e.nodeType!==3&&(n=t._observers,n!==null&&n.forEach(function(r){typeof r.rootMargin=="string"?OR(t,r,e):r.unobserve(e)}),e.reactFragments!=null&&e.reactFragments.delete(t))}function pg(e){var t=e.firstChild;for(t&&t.nodeType===10&&(t=t.nextSibling);t;){var n=t;switch(t=t.nextSibling,n.nodeName){case"HTML":case"HEAD":case"BODY":pg(n),Bh(n);continue;case"SCRIPT":case"STYLE":continue;case"LINK":if(n.rel.toLowerCase()==="stylesheet")continue}e.removeChild(n)}}function HR(e,t,n,i){for(;e.nodeType===1;){var a=n;if(e.nodeName.toLowerCase()!==t.toLowerCase()){if(!i&&(e.nodeName!=="INPUT"||e.type!=="hidden"))break}else if(i){if(!e[pu])switch(t){case"meta":if(!e.hasAttribute("itemprop"))break;return e;case"link":if(r=e.getAttribute("rel"),r==="stylesheet"&&e.hasAttribute("data-precedence"))break;if(r!==a.rel||e.getAttribute("href")!==(a.href==null||a.href===""?null:a.href)||e.getAttribute("crossorigin")!==(a.crossOrigin==null?null:a.crossOrigin)||e.getAttribute("title")!==(a.title==null?null:a.title))break;return e;case"style":if(e.hasAttribute("data-precedence"))break;return e;case"script":if(r=e.getAttribute("src"),(r!==(a.src==null?null:a.src)||e.getAttribute("type")!==(a.type==null?null:a.type)||e.getAttribute("crossorigin")!==(a.crossOrigin==null?null:a.crossOrigin))&&r&&e.hasAttribute("async")&&!e.hasAttribute("itemprop"))break;return e;default:return e}}else if(t==="input"&&e.type==="hidden"){var r=a.name==null?null:""+a.name;if(a.type==="hidden"&&e.getAttribute("name")===r)return e}else return e;if(e=ra(e.nextSibling),e===null)break}return null}function GR(e,t,n){if(t==="")return null;for(;e.nodeType!==3;)if((e.nodeType!==1||e.nodeName!=="INPUT"||e.type!=="hidden")&&!n||(e=ra(e.nextSibling),e===null))return null;return e}function bM(e,t){for(;e.nodeType!==8;)if((e.nodeType!==1||e.nodeName!=="INPUT"||e.type!=="hidden")&&!t||(e=ra(e.nextSibling),e===null))return null;return e}function mg(e){return e.data==="$?"||e.data==="$~"}function dv(e){return e.data==="$!"||e.data==="$?"&&e.ownerDocument.readyState!=="loading"}function VR(e,t){var n=e.ownerDocument;if(e.data==="$~")e._reactRetry=t;else if(e.data!=="$?"||n.readyState!=="loading")t();else{var i=function(){t(),n.removeEventListener("DOMContentLoaded",i)};n.addEventListener("DOMContentLoaded",i),e._reactRetry=i}}function ra(e){for(;e!=null;e=e.nextSibling){var t=e.nodeType;if(t===1||t===3)break;if(t===8){if(t=e.data,t==="$"||t==="$!"||t==="$?"||t==="$~"||t==="&"||t==="F!"||t==="F")break;if(t==="/$"||t==="/&")return null}}return e}var gg=null;function b1(e){e=e.nextSibling;for(var t=0;e;){if(e.nodeType===8){var n=e.data;if(n==="/$"||n==="/&"){if(t===0)return ra(e.nextSibling);t--}else n!=="$"&&n!=="$!"&&n!=="$?"&&n!=="$~"&&n!=="&"||t++}e=e.nextSibling}return null}function S1(e){e=e.previousSibling;for(var t=0;e;){if(e.nodeType===8){var n=e.data;if(n==="$"||n==="$!"||n==="$?"||n==="$~"||n==="&"){if(t===0)return e;t--}else n!=="/$"&&n!=="/&"||t++}e=e.previousSibling}return null}function kR(e,t){function n(){i=!0}if(e.ownerDocument.activeElement===e)return!0;var i=!1;try{e.ownerDocument.addEventListener("focus",n,!0),(e.focus||HTMLElement.prototype.focus).call(e,t)}finally{e.ownerDocument.removeEventListener("focus",n,!0)}return i}function XR(e){g1(function(){g1(function(t){return e(t)})})}function SM(e,t,n){switch(t=ru(n),e){case"html":if(e=t.documentElement,!e)throw Error(St(452));return e;case"head":if(e=t.head,!e)throw Error(St(453));return e;case"body":if(e=t.body,!e)throw Error(St(454));return e;default:throw Error(St(451))}}function MM(e,t,n){for(var i in n){var a=n[i];n.hasOwnProperty(i)&&a!=null&&ke(e,t,i,null,yR,a)}n.dangerouslySetInnerHTML!=null&&(e.textContent=""),e.onclick===Ba&&(e.onclick=null),Bh(e)}function l0(e){for(var t=e.attributes;t.length;)e.removeAttributeNode(t[0]);Bh(e)}var sa=new Map,M1=new Set;function su(e){if(typeof e.getRootNode=="function"){var t=e.getRootNode();if(t.nodeType===9||t.nodeType===11)return t}return e.nodeType===9?e:e.ownerDocument}var Mr=Fe.d;Fe.d={f:WR,r:qR,D:YR,C:ZR,L:JR,m:KR,X:QR,S:jR,M:$R};function WR(){var e=Mr.f(),t=$h();return e||t}function qR(e){var t=Sl(e);t!==null&&t.tag===5&&t.type==="form"?oS(t):Mr.r(e)}var wl=typeof document>"u"?null:document;function EM(e,t,n){var i=wl;if(i&&typeof t=="string"&&t){var a=na(t);a='link[rel="'+e+'"][href="'+a+'"]',typeof n=="string"&&(a+='[crossorigin="'+n+'"]'),M1.has(a)||(M1.add(a),e={rel:e,crossOrigin:n,href:t},i.querySelector(a)===null&&(t=i.createElement("link"),kn(t,"link",e),Nn(t),i.head.appendChild(t)))}}function YR(e){Mr.D(e),EM("dns-prefetch",e,null)}function ZR(e,t){Mr.C(e,t),EM("preconnect",e,t)}function JR(e,t,n){Mr.L(e,t,n);var i=wl;if(i&&e&&t){var a='link[rel="preload"][as="'+na(t)+'"]';t==="image"&&n&&n.imageSrcSet?(a+='[imagesrcset="'+na(n.imageSrcSet)+'"]',typeof n.imageSizes=="string"&&(a+='[imagesizes="'+na(n.imageSizes)+'"]')):a+='[href="'+na(e)+'"]';var r=a;switch(t){case"style":r=vl(e);break;case"script":r=Al(e)}if(!(sa.has(r)||(e=Je({rel:"preload",href:t==="image"&&n&&n.imageSrcSet?void 0:e,as:t},n),sa.set(r,e),i.querySelector(a)!==null||t==="style"&&i.querySelector(_u(r))||t==="script"&&i.querySelector(bu(r))))){var s=i.createElement("link");kn(s,"link",e),t==="style"&&(s[dh]=!0,s.onload=s.onerror=function(){$1(s)}),Nn(s),i.head.appendChild(s)}}}function KR(e,t){Mr.m(e,t);var n=wl;if(n&&e){var i=t&&typeof t.as=="string"?t.as:"script",a='link[rel="modulepreload"][as="'+na(i)+'"][href="'+na(e)+'"]',r=a;switch(i){case"audioworklet":case"paintworklet":case"serviceworker":case"sharedworker":case"worker":case"script":r=Al(e)}if(!sa.has(r)&&(e=Je({rel:"modulepreload",href:e},t),sa.set(r,e),n.querySelector(a)===null)){switch(i){case"audioworklet":case"paintworklet":case"serviceworker":case"sharedworker":case"worker":case"script":if(n.querySelector(bu(r)))return}i=n.createElement("link"),kn(i,"link",e),Nn(i),n.head.appendChild(i)}}}function jR(e,t,n){Mr.S(e,t,n);var i=wl;if(i&&e){var a=Qo(i).hoistableStyles,r=vl(e);t=t||"default";var s=a.get(r);if(!s){var l={loading:0,preload:null};if(s=i.querySelector(_u(r)))l.loading=5;else{e=Je({rel:"stylesheet",href:e,"data-precedence":t},n),(n=sa.get(r))&&pv(e,n);var o=s=i.createElement("link");Nn(o),kn(o,"link",e),o._p=new Promise(function(c,u){o.onload=c,o.onerror=u}),o.addEventListener("load",function(){l.loading|=1}),o.addEventListener("error",function(){l.loading|=2}),l.loading|=4,ah(s,t,i)}s={type:"stylesheet",instance:s,count:1,state:l},a.set(r,s)}}}function QR(e,t){Mr.X(e,t);var n=wl;if(n&&e){var i=Qo(n).hoistableScripts,a=Al(e),r=i.get(a);r||(r=n.querySelector(bu(a)),r||(e=Je({src:e,async:!0},t),(t=sa.get(a))&&mv(e,t),r=n.createElement("script"),Nn(r),kn(r,"link",e),n.head.appendChild(r)),r={type:"script",instance:r,count:1,state:null},i.set(a,r))}}function $R(e,t){Mr.M(e,t);var n=wl;if(n&&e){var i=Qo(n).hoistableScripts,a=Al(e),r=i.get(a);r||(r=n.querySelector(bu(a)),r||(e=Je({src:e,async:!0,type:"module"},t),(t=sa.get(a))&&mv(e,t),r=n.createElement("script"),Nn(r),kn(r,"link",e),n.head.appendChild(r)),r={type:"script",instance:r,count:1,state:null},i.set(a,r))}}function E1(e,t,n,i){var a=(a=Qr.current)?su(a):null;if(!a)throw Error(St(446));switch(e){case"meta":case"title":return null;case"style":return typeof n.precedence=="string"&&typeof n.href=="string"?(n=vl(n.href),t=Qo(a).hoistableStyles,i=t.get(n),i||(i={type:"style",instance:null,count:0,state:null},t.set(n,i)),i):{type:"void",instance:null,count:0,state:null};case"link":if(n.rel==="stylesheet"&&typeof n.href=="string"&&typeof n.precedence=="string"){e=vl(n.href);var r=Qo(a).hoistableStyles,s=r.get(e);if(s||(a=a.ownerDocument||a,s={type:"stylesheet",instance:null,count:0,state:{loading:0,preload:null}},r.set(e,s),(r=a.querySelector(_u(e)))?r._p||(s.instance=r,s.state.loading=5):(r=sa.get(e),r||(r={rel:"preload",as:"style",href:n.href,crossOrigin:n.crossOrigin,integrity:n.integrity,media:n.media,hrefLang:n.hrefLang,referrerPolicy:n.referrerPolicy},sa.set(e,r)),tC(a,e,r,s.state))),t&&i===null)throw Error(St(528,""));return s}if(t&&i!==null)throw Error(St(529,""));return null;case"script":return t=n.async,n=n.src,typeof n=="string"&&t&&typeof t!="function"&&typeof t!="symbol"?(n=Al(n),t=Qo(a).hoistableScripts,i=t.get(n),i||(i={type:"script",instance:null,count:0,state:null},t.set(n,i)),i):{type:"void",instance:null,count:0,state:null};default:throw Error(St(444,e))}}function vl(e){return'href="'+na(e)+'"'}function _u(e){return'link[rel="stylesheet"]['+e+"]"}function TM(e){return Je({},e,{"data-precedence":e.precedence,precedence:null})}function tC(e,t,n,i){if(t=e.querySelector('link[rel="preload"][as="style"]['+t+"]")){if(t[dh]!==!0){i.loading=1;return}}else t=e.createElement("link"),t[dh]=!0,t.onload=t.onerror=$1.bind(null,t),kn(t,"link",n),Nn(t),e.head.appendChild(t);i.preload=t,t.addEventListener("load",function(){return i.loading|=1}),t.addEventListener("error",function(){return i.loading|=2})}function Al(e){return'[src="'+na(e)+'"]'}function bu(e){return"script[async]"+e}function T1(e,t,n){if(t.count++,t.instance===null)switch(t.type){case"style":var i=e.querySelector('style[data-href~="'+na(n.href)+'"]');if(i)return t.instance=i,Nn(i),i;var a=Je({},n,{"data-href":n.href,"data-precedence":n.precedence,href:null,precedence:null});return i=(e.ownerDocument||e).createElement("style"),Nn(i),kn(i,"style",a),ah(i,n.precedence,e),t.instance=i;case"stylesheet":a=vl(n.href);var r=e.querySelector(_u(a));if(r)return t.state.loading|=4,t.instance=r,Nn(r),r;i=TM(n),(a=sa.get(a))&&pv(i,a),r=(e.ownerDocument||e).createElement("link"),Nn(r);var s=r;return s._p=new Promise(function(l,o){s.onload=l,s.onerror=o}),kn(r,"link",i),t.state.loading|=4,ah(r,n.precedence,e),t.instance=r;case"script":return r=Al(n.src),(a=e.querySelector(bu(r)))?(t.instance=a,Nn(a),a):(i=n,(a=sa.get(r))&&(i=Je({},n),mv(i,a)),e=e.ownerDocument||e,a=e.createElement("script"),Nn(a),kn(a,"link",i),e.head.appendChild(a),t.instance=a);case"void":return null;default:throw Error(St(443,t.type))}else t.type==="stylesheet"&&(t.state.loading&4)===0&&(i=t.instance,t.state.loading|=4,ah(i,n.precedence,e));return t.instance}function ah(e,t,n){for(var i=n.querySelectorAll('link[rel="stylesheet"][data-precedence],style[data-precedence]'),a=i.length?i[i.length-1]:null,r=a,s=0;s<i.length;s++){var l=i[s];if(l.dataset.precedence===t)r=l;else if(r!==a)break}r?r.parentNode.insertBefore(e,r.nextSibling):(t=n.nodeType===9?n.head:n,t.insertBefore(e,t.firstChild))}function pv(e,t){e.crossOrigin==null&&(e.crossOrigin=t.crossOrigin),e.referrerPolicy==null&&(e.referrerPolicy=t.referrerPolicy),e.title==null&&(e.title=t.title)}function mv(e,t){e.crossOrigin==null&&(e.crossOrigin=t.crossOrigin),e.referrerPolicy==null&&(e.referrerPolicy=t.referrerPolicy),e.integrity==null&&(e.integrity=t.integrity)}var rh=null;function w1(e,t,n){if(rh===null){var i=new Map,a=rh=new Map;a.set(n,i)}else a=rh,i=a.get(n),i||(i=new Map,a.set(n,i));if(i.has(e))return i;for(i.set(e,null),n=n.getElementsByTagName(e),a=0;a<n.length;a++){var r=n[a];if(!(r[pu]||r[Bn]||e==="link"&&r.getAttribute("rel")==="stylesheet")&&r.namespaceURI!=="http://www.w3.org/2000/svg"){var s=r.getAttribute(t)||"";s=e+s;var l=i.get(s);l?l.push(r):i.set(s,[r])}}return i}function vg(e,t,n){e=e.ownerDocument||e,e.head.insertBefore(n,t==="title"?e.querySelector("head > title"):null)}function eC(e,t,n){if(n===1||t.itemProp!=null)return!1;switch(e){case"meta":case"title":return!0;case"style":if(typeof t.precedence!="string"||typeof t.href!="string"||t.href==="")break;return!0;case"link":if(typeof t.rel!="string"||typeof t.href!="string"||t.href===""||t.onLoad||t.onError)break;return t.rel==="stylesheet"?(e=t.disabled,typeof t.precedence=="string"&&e==null):!0;case"script":if(t.async&&typeof t.async!="function"&&typeof t.async!="symbol"&&!t.onLoad&&!t.onError&&t.src&&typeof t.src=="string")return!0}return!1}function A1(e,t){return e==="img"&&t.src!=null&&t.src!==""&&t.onLoad==null&&t.loading!=="lazy"}function wM(e){return!(e.type==="stylesheet"&&(e.state.loading&3)===0)}function AM(e){return(e.width||100)*(e.height||100)*(typeof devicePixelRatio=="number"?devicePixelRatio:1)*.25}function R1(e,t){typeof t.decode=="function"&&(e.imgCount++,t.complete||(e.imgBytes+=AM(t),e.suspenseyImages.push(t)),e=aC.bind(e),t.decode().then(e,e))}function nC(e,t,n,i){if(n.type==="stylesheet"&&(typeof i.media!="string"||matchMedia(i.media).matches!==!1)&&(n.state.loading&4)===0){if(n.instance===null){var a=vl(i.href),r=t.querySelector(_u(a));if(r){t=r._p,t!==null&&typeof t=="object"&&typeof t.then=="function"&&(e.count++,e=ou.bind(e),t.then(e,e)),n.state.loading|=4,n.instance=r,Nn(r);return}r=t.ownerDocument||t,i=TM(i),(a=sa.get(a))&&pv(i,a),r=r.createElement("link"),Nn(r);var s=r;s._p=new Promise(function(l,o){s.onload=l,s.onerror=o}),kn(r,"link",i),n.instance=r}e.stylesheets===null&&(e.stylesheets=new Map),e.stylesheets.set(n,t),(t=n.state.preload)&&(n.state.loading&3)===0&&(e.count++,n=ou.bind(e),t.addEventListener("load",n),t.addEventListener("error",n))}}var sh=0;function iC(e,t){return e.stylesheets&&e.count===0&&oh(e,e.stylesheets),0<e.count||0<e.imgCount?function(n){var i=setTimeout(function(){if(e.stylesheets&&oh(e,e.stylesheets),e.unsuspend){var r=e.unsuspend;e.unsuspend=null,r()}},6e4+t);0<e.imgBytes&&sh===0&&(sh=62500*bR());var a=setTimeout(function(){if(e.waitingForImages=!1,e.count===0&&(e.stylesheets&&oh(e,e.stylesheets),e.unsuspend)){var r=e.unsuspend;e.unsuspend=null,r()}},(e.imgBytes>sh?50:800)+t);return e.unsuspend=n,function(){e.unsuspend=null,clearTimeout(i),clearTimeout(a)}}:null}function RM(e){if(e.count===0&&(e.imgCount===0||!e.waitingForImages)){if(e.stylesheets)oh(e,e.stylesheets);else if(e.unsuspend){var t=e.unsuspend;e.unsuspend=null,t()}}}function ou(){this.count--,RM(this)}function aC(){this.imgCount--,RM(this)}var Ph=null;function oh(e,t){e.stylesheets=null,e.unsuspend!==null&&(e.count++,Ph=new Map,t.forEach(rC,e),Ph=null,ou.call(e))}function rC(e,t){if(!(t.state.loading&4)){var n=Ph.get(e);if(n)var i=n.get(null);else{n=new Map,Ph.set(e,n);for(var a=e.querySelectorAll("link[data-precedence],style[data-precedence]"),r=0;r<a.length;r++){var s=a[r];(s.nodeName==="LINK"||s.getAttribute("media")!=="not all")&&(n.set(s.dataset.precedence,s),i=s)}i&&n.set(null,i)}a=t.instance,s=a.getAttribute("data-precedence"),r=n.get(s)||i,r===i&&n.set(null,a),n.set(s,a),this.count++,i=ou.bind(this),a.addEventListener("load",i),a.addEventListener("error",i),r?r.parentNode.insertBefore(a,r.nextSibling):(e=e.nodeType===9?e.head:e,e.insertBefore(a,e.firstChild)),t.state.loading|=4}}var xl={$$typeof:Fa,Provider:null,Consumer:null,_currentValue:Ws,_currentValue2:Ws,_threadCount:0};function sC(e,t,n,i,a,r,s,l,o){this.tag=1,this.containerInfo=e,this.pingCache=this.current=this.pendingChildren=null,this.timeoutHandle=-1,this.callbackNode=this.next=this.pendingContext=this.context=this.cancelPendingCommit=null,this.callbackPriority=0,this.expirationTimes=Pm(-1),this.entangledLanes=this.shellSuspendCounter=this.errorRecoveryDisabledLanes=this.expiredLanes=this.warmLanes=this.pingedLanes=this.suspendedLanes=this.pendingLanes=0,this.entanglements=Pm(0),this.hiddenUpdates=Pm(null),this.identifierPrefix=i,this.onUncaughtError=a,this.onCaughtError=r,this.onRecoverableError=s,this.pooledCache=null,this.pooledCacheLanes=0,this.formState=o,this.transitionTypes=null,this.incompleteTransitions=new Map}function CM(e,t,n,i,a,r,s,l,o,c,u,p){return e=new sC(e,t,n,s,o,c,u,p,l),t=1,r===!0&&(t|=24),r=bi(3,null,null,t),e.current=r,r.stateNode=e,t=Og(),t.refCount++,e.pooledCache=t,t.refCount++,r.memoizedState={element:i,isDehydrated:n,cache:t},Fg(r),e}function DM(e){return e?(e=Zo,e):Zo}function NM(e,t,n,i,a,r){a=DM(a),i.context===null?i.context=a:i.pendingContext=a,i=ts(t),i.payload={element:n},r=r===void 0?null:r,r!==null&&(i.callback=r),n=es(e,i,t),n!==null&&(Si(n,e,t),Bc(n,e,t))}function C1(e,t){if(e=e.memoizedState,e!==null&&e.dehydrated!==null){var n=e.retryLane;e.retryLane=n!==0&&n<t?n:t}}function gv(e,t){C1(e,t),(e=e.alternate)&&C1(e,t)}function LM(e){if(e.tag===13||e.tag===31){var t=oo(e,67108864);t!==null&&Si(t,e,67108864),gv(e,67108864)}}function D1(e){if(e.tag===13||e.tag===31){var t=zi();t=Mg(t);var n=oo(e,t);n!==null&&Si(n,e,t),gv(e,t)}}var yl=!0;function oC(e,t,n,i){var a=fe.T;fe.T=null;var r=Fe.p;try{Fe.p=2,vv(e,t,n,i)}finally{Fe.p=r,fe.T=a}}function lC(e,t,n,i){var a=fe.T;fe.T=null;var r=Fe.p;try{Fe.p=8,vv(e,t,n,i)}finally{Fe.p=r,fe.T=a}}function vv(e,t,n,i){if(yl){var a=xg(i);if(a===null)r0(e,t,i,zh,n),N1(e,i);else if(uC(a,e,t,n,i))i.stopPropagation();else if(N1(e,i),t&4&&-1<cC.indexOf(e)){for(;a!==null;){var r=Sl(a);if(r!==null)switch(r.tag){case 3:if(r=r.stateNode,r.current.memoizedState.isDehydrated){var s=Hs(r.pendingLanes);if(s!==0){var l=r;for(l.pendingLanes|=2,l.entangledLanes|=2;s;){var o=1<<31-Pi(s);l.entanglements[1]|=o,s&=~o}qa(r),(ze&6)===0&&(Nh=Ii()+500,yu(0,!1))}}break;case 31:case 13:l=oo(r,2),l!==null&&Si(l,r,2),$h(),gv(r,2)}if(r=xg(i),r===null&&r0(e,t,i,zh,n),r===a)break;a=r}a!==null&&i.stopPropagation()}else r0(e,t,i,null,n)}}function xg(e){return e=wg(e),xv(e)}var zh=null;function xv(e){if(zh=null,e=ks(e),e!==null){var t=uu(e);if(t===null)e=null;else{var n=t.tag;if(n===13){if(e=z1(t),e!==null)return e;e=null}else if(n===31){if(e=F1(t),e!==null)return e;e=null}else if(n===3){if(t.stateNode.current.memoizedState.isDehydrated)return t.tag===3?t.stateNode.containerInfo:null;e=null}else t!==e&&(e=null)}}return zh=e,null}function UM(e){switch(e){case"beforetoggle":case"cancel":case"click":case"close":case"contextmenu":case"copy":case"cut":case"auxclick":case"dblclick":case"dragend":case"dragstart":case"drop":case"focusin":case"focusout":case"input":case"invalid":case"keydown":case"keypress":case"keyup":case"mousedown":case"mouseup":case"paste":case"pause":case"play":case"pointercancel":case"pointerdown":case"pointerup":case"ratechange":case"reset":case"seeked":case"submit":case"toggle":case"touchcancel":case"touchend":case"touchstart":case"volumechange":case"change":case"selectionchange":case"textInput":case"compositionstart":case"compositionend":case"compositionupdate":case"beforeblur":case"afterblur":case"beforeinput":case"blur":case"fullscreenchange":case"fullscreenerror":case"focus":case"hashchange":case"popstate":case"select":case"selectstart":return 2;case"drag":case"dragenter":case"dragexit":case"dragleave":case"dragover":case"mousemove":case"mouseout":case"mouseover":case"pointermove":case"pointerout":case"pointerover":case"resize":case"scroll":case"touchmove":case"wheel":case"mouseenter":case"mouseleave":case"pointerenter":case"pointerleave":return 8;case"message":switch(MA()){case X1:return 2;case W1:return 8;case hh:case EA:return 32;case q1:return 268435456;default:return 32}default:return 32}}var yg=!1,rs=null,ss=null,os=null,lu=new Map,cu=new Map,Wr=[],cC="mousedown mouseup touchcancel touchend touchstart auxclick dblclick pointercancel pointerdown pointerup dragend dragstart drop compositionend compositionstart keydown keypress keyup input textInput copy cut paste click change contextmenu reset".split(" ");function N1(e,t){switch(e){case"focusin":case"focusout":rs=null;break;case"dragenter":case"dragleave":ss=null;break;case"mouseover":case"mouseout":os=null;break;case"pointerover":case"pointerout":lu.delete(t.pointerId);break;case"gotpointercapture":case"lostpointercapture":cu.delete(t.pointerId)}}function Rc(e,t,n,i,a,r){return e===null||e.nativeEvent!==r?(e={blockedOn:t,domEventName:n,eventSystemFlags:i,nativeEvent:r,targetContainers:[a]},t!==null&&(t=Sl(t),t!==null&&LM(t)),e):(e.eventSystemFlags|=i,t=e.targetContainers,a!==null&&t.indexOf(a)===-1&&t.push(a),e)}function uC(e,t,n,i,a){switch(t){case"focusin":return rs=Rc(rs,e,t,n,i,a),!0;case"dragenter":return ss=Rc(ss,e,t,n,i,a),!0;case"mouseover":return os=Rc(os,e,t,n,i,a),!0;case"pointerover":var r=a.pointerId;return lu.set(r,Rc(lu.get(r)||null,e,t,n,i,a)),!0;case"gotpointercapture":return r=a.pointerId,cu.set(r,Rc(cu.get(r)||null,e,t,n,i,a)),!0}return!1}function IM(e){var t=ks(e.target);if(t!==null){var n=uu(t);if(n!==null){if(t=n.tag,t===13){if(t=z1(n),t!==null){e.blockedOn=t,i_(e.priority,function(){D1(n)});return}}else if(t===31){if(t=F1(n),t!==null){e.blockedOn=t,i_(e.priority,function(){D1(n)});return}}else if(t===3&&n.stateNode.current.memoizedState.isDehydrated){e.blockedOn=n.tag===3?n.stateNode.containerInfo:null;return}}}e.blockedOn=null}function lh(e){if(e.blockedOn!==null)return!1;for(var t=e.targetContainers;0<t.length;){var n=xg(e.nativeEvent);if(n===null){n=e.nativeEvent;var i=new n.constructor(n.type,n);S0=i,n.target.dispatchEvent(i),S0=null}else return t=Sl(n),t!==null&&LM(t),e.blockedOn=n,!1;t.shift()}return!0}function L1(e,t,n){lh(e)&&n.delete(t)}function fC(){yg=!1,rs!==null&&lh(rs)&&(rs=null),ss!==null&&lh(ss)&&(ss=null),os!==null&&lh(os)&&(os=null),lu.forEach(L1),cu.forEach(L1)}function Vf(e,t){e.blockedOn===t&&(e.blockedOn=null,yg||(yg=!0,Tn.unstable_scheduleCallback(Tn.unstable_NormalPriority,fC)))}var kf=null;function U1(e){kf!==e&&(kf=e,Tn.unstable_scheduleCallback(Tn.unstable_NormalPriority,function(){kf===e&&(kf=null);for(var t=0;t<e.length;t+=3){var n=e[t],i=e[t+1],a=e[t+2];if(typeof i!="function"){if(xv(i||n)===null)continue;break}var r=Sl(n);r!==null&&(e.splice(t,3),t-=3,F0(r,{pending:!0,data:a,method:n.method,action:i},i,a))}}))}function _l(e){function t(o){return Vf(o,e)}rs!==null&&Vf(rs,e),ss!==null&&Vf(ss,e),os!==null&&Vf(os,e),lu.forEach(t),cu.forEach(t);for(var n=0;n<Wr.length;n++){var i=Wr[n];i.blockedOn===e&&(i.blockedOn=null)}for(;0<Wr.length&&(n=Wr[0],n.blockedOn===null);)IM(n),n.blockedOn===null&&Wr.shift();if(n=(e.ownerDocument||e).$$reactFormReplay,n!=null)for(i=0;i<n.length;i+=3){var a=n[i],r=n[i+1],s=a[Ei]||null;if(typeof r=="function")s||U1(n);else if(s){var l=null;if(r&&r.hasAttribute("formAction")){if(a=r,s=r[Ei]||null)l=s.formAction;else if(xv(a)!==null)continue}else l=s.action;typeof l=="function"?n[i+1]=l:(n.splice(i,3),i-=3),U1(n)}}}function OM(){function e(r){r.canIntercept&&r.info==="react-transition"&&r.intercept({handler:function(){return new Promise(function(s){return a=s})},focusReset:"manual",scroll:"manual"})}function t(){a!==null&&(a(),a=null),i||setTimeout(n,20)}function n(){if(!i&&!navigation.transition){var r=navigation.currentEntry;r&&r.url!=null&&navigation.navigate(r.url,{state:r.getState(),info:"react-transition",history:"replace"})}}if(typeof navigation=="object"){var i=!1,a=null;return navigation.addEventListener("navigate",e),navigation.addEventListener("navigatesuccess",t),navigation.addEventListener("navigateerror",t),setTimeout(n,100),function(){i=!0,navigation.removeEventListener("navigate",e),navigation.removeEventListener("navigatesuccess",t),navigation.removeEventListener("navigateerror",t),a!==null&&(a(),a=null)}}}function yv(e){this._internalRoot=e}nd.prototype.render=yv.prototype.render=function(e){var t=this._internalRoot;if(t===null)throw Error(St(409));var n=t.current,i=zi();NM(n,i,e,t,null,null)};nd.prototype.unmount=yv.prototype.unmount=function(){var e=this._internalRoot;if(e!==null){this._internalRoot=null;var t=e.containerInfo;NM(e.current,2,null,e,null,null),$h(),t[bl]=null}};function nd(e){this._internalRoot=e}nd.prototype.unstable_scheduleHydration=function(e){if(e){var t=Q1();e={blockedOn:null,target:e,priority:t};for(var n=0;n<Wr.length&&t!==0&&t<Wr[n].priority;n++);Wr.splice(n,0,e),n===0&&IM(e)}};var I1=O1.version;if(I1!=="19.3.1")throw Error(St(527,I1,"19.3.1"));Fe.findDOMNode=function(e){var t=e._reactInternals;if(t===void 0)throw typeof e.render=="function"?Error(St(188)):(e=Object.keys(e).join(","),Error(St(268,e)));return e=hA(t),e=e!==null?B1(e):null,e=e===null?null:e.stateNode,e};var hC={bundleType:0,version:"19.3.1",rendererPackageName:"react-dom",currentDispatcherRef:fe,reconcilerVersion:"19.3.1"};if(typeof __REACT_DEVTOOLS_GLOBAL_HOOK__<"u"&&(Cc=__REACT_DEVTOOLS_GLOBAL_HOOK__,!Cc.isDisabled&&Cc.supportsFiber))try{fu=Cc.inject(hC),Oi=Cc}catch{}var Cc;id.createRoot=function(e,t){if(!P1(e))throw Error(St(299));var n=!1,i="",a=mS,r=gS,s=vS;return t!=null&&(t.unstable_strictMode===!0&&(n=!0),t.identifierPrefix!==void 0&&(i=t.identifierPrefix),t.onUncaughtError!==void 0&&(a=t.onUncaughtError),t.onCaughtError!==void 0&&(r=t.onCaughtError),t.onRecoverableError!==void 0&&(s=t.onRecoverableError)),t=CM(e,1,!1,null,null,n,i,null,a,r,s,OM),e[bl]=t.current,uv(e),new yv(t)};id.hydrateRoot=function(e,t,n){if(!P1(e))throw Error(St(299));var i=!1,a="",r=mS,s=gS,l=vS,o=null;return n!=null&&(n.unstable_strictMode===!0&&(i=!0),n.identifierPrefix!==void 0&&(a=n.identifierPrefix),n.onUncaughtError!==void 0&&(r=n.onUncaughtError),n.onCaughtError!==void 0&&(s=n.onCaughtError),n.onRecoverableError!==void 0&&(l=n.onRecoverableError),n.formState!==void 0&&(o=n.formState)),t=CM(e,1,!0,t,n??null,i,a,o,r,s,l,OM),t.context=DM(null),n=t.current,i=zi(),i=Mg(i),a=ts(i),a.callback=null,es(n,a,i),n=i,t.current.lanes=n,du(t,n),qa(t),e[bl]=t.current,uv(e),new nd(t)};id.version="19.3.1"});var BM=Na((yP,FM)=>{"use strict";function zM(){if(!(typeof __REACT_DEVTOOLS_GLOBAL_HOOK__>"u"||typeof __REACT_DEVTOOLS_GLOBAL_HOOK__.checkDCE!="function"))try{__REACT_DEVTOOLS_GLOBAL_HOOK__.checkDCE(zM)}catch(e){console.error(e)}}zM(),FM.exports=PM()});var VT=Na(em=>{"use strict";var uI=Symbol.for("react.transitional.element"),fI=Symbol.for("react.fragment");function GT(e,t,n){var i=null;if(n!==void 0&&(i=""+n),t.key!==void 0&&(i=""+t.key),"key"in t){n={};for(var a in t)a!=="key"&&(n[a]=t[a])}else n=t;return t=n.ref,{$$typeof:uI,type:e,key:i,ref:t!==void 0?t:null,props:n}}em.Fragment=fI;em.jsx=GT;em.jsxs=GT});var an=Na((V4,kT)=>{"use strict";kT.exports=VT()});var Iw=Ce(BM(),1);var Ls=Ce(vi(),1);var vE=0,ix=1,xE=2;var Qu=1,yE=2,oc=3,Cs=0,hi=1,qi=2,yo=0,lc=1,ax=2,rx=3,sx=4,_E=5;var _o=100,bE=101,SE=102,ME=103,EE=104,TE=200,wE=201,AE=202,RE=203,ox=204,lx=205,CE=206,DE=207,NE=208,LE=209,UE=210,IE=211,OE=212,PE=213,zE=214,Rd=0,Cd=1,Dd=2,Vl=3,Nd=4,Ld=5,Ud=6,Id=7,cx=0,FE=1,BE=2,$a=0,ux=1,fx=2,hx=3,dx=4,px=5,mx=6,$u=7;var gx=300,bo=301,cc=302,up=303,fp=304,Ka=1e3,la=1001,Od=1002,In=1003,HE=1004;var tf=1005;var qn=1006,hp=1007;var Sa=1008;var wi=1009,vx=1010,xx=1011,uc=1012,dp=1013,Ma=1014,Ea=1015,Ta=1016,pp=1017,mp=1018,So=1020,yx=35902,_x=35899,bx=1021,Sx=1022,wa=1023,Dr=1026,Ur=1027,Mx=1028,gp=1029,Ds=1030,vp=1031;var xp=1033,ef=33776,nf=33777,af=33778,rf=33779,yp=35840,_p=35841,bp=35842,Sp=35843,Mp=36196,Ep=37492,Tp=37496,wp=37488,Ap=37489,sf=37490,Rp=37491,Cp=37808,Dp=37809,Np=37810,Lp=37811,Up=37812,Ip=37813,Op=37814,Pp=37815,zp=37816,Fp=37817,Bp=37818,Hp=37819,Gp=37820,Vp=37821,kp=36492,Xp=36494,Wp=36495,qp=36283,Yp=36284,of=36285,Zp=36286;var Cu=2300,Pd=2301,wd=2302,Wv=2303,qv=2400,Yv=2401,Zv=2402;var GE=3200;var Jp=0,VE=1,Ir="",Wn="srgb",Du="srgb-linear",Nu="linear",Ge="srgb";var Ad=7680;var kE=519,XE=512,WE=513,qE=514,Ex=515,YE=516,ZE=517,Tx=518,wx=519,JE=35044;var Ax="300 es",ca=2e3,kl=2001;function dC(e){for(let t=e.length-1;t>=0;--t)if(e[t]>=65535)return!0;return!1}function pC(e){return ArrayBuffer.isView(e)&&!(e instanceof DataView)}function Lu(e){return document.createElementNS("http://www.w3.org/1999/xhtml",e)}function KE(){let e=Lu("canvas");return e.style.display="block",e}var HM={},Xl=null;function Rx(...e){let t="THREE."+e.shift();Xl?Xl("log",t,...e):console.log(t,...e)}function jE(e){let t=e[0];if(typeof t=="string"&&t.startsWith("TSL:")){let n=e[1];n&&n.isStackTrace?e[0]+=" "+n.getLocation():e[1]='Stack trace not available. Enable "THREE.Node.captureStackTrace" to capture stack traces.'}return e}function ce(...e){e=jE(e);let t="THREE."+e.shift();if(Xl)Xl("warn",t,...e);else{let n=e[0];n&&n.isStackTrace?console.warn(n.getError(t)):console.warn(t,...e)}}function ue(...e){e=jE(e);let t="THREE."+e.shift();if(Xl)Xl("error",t,...e);else{let n=e[0];n&&n.isStackTrace?console.error(n.getError(t)):console.error(t,...e)}}function po(...e){let t=e.join(" ");t in HM||(HM[t]=!0,ce(...e))}function QE(e,t,n){return new Promise(function(i,a){function r(){switch(e.clientWaitSync(t,e.SYNC_FLUSH_COMMANDS_BIT,0)){case e.WAIT_FAILED:a();break;case e.TIMEOUT_EXPIRED:setTimeout(r,n);break;default:i()}}setTimeout(r,n)})}var $E={[Rd]:Rd,[Dd]:Ud,[Nd]:Nd,[Vl]:Ld,[Cd]:Cd,[Ud]:Dd,[Id]:Id,[Ld]:Vl},ja=class{addEventListener(t,n){this._listeners===void 0&&(this._listeners={});let i=this._listeners;i[t]===void 0&&(i[t]=[]),i[t].indexOf(n)===-1&&i[t].push(n)}hasEventListener(t,n){let i=this._listeners;return i===void 0?!1:i[t]!==void 0&&i[t].indexOf(n)!==-1}removeEventListener(t,n){let i=this._listeners;if(i===void 0)return;let a=i[t];if(a!==void 0){let r=a.indexOf(n);r!==-1&&a.splice(r,1)}}dispatchEvent(t){let n=this._listeners;if(n===void 0)return;let i=n[t.type];if(i!==void 0){t.target=this;let a=i.slice(0);for(let r=0,s=a.length;r<s;r++)a[r].call(this,t);t.target=null}}},jn=["00","01","02","03","04","05","06","07","08","09","0a","0b","0c","0d","0e","0f","10","11","12","13","14","15","16","17","18","19","1a","1b","1c","1d","1e","1f","20","21","22","23","24","25","26","27","28","29","2a","2b","2c","2d","2e","2f","30","31","32","33","34","35","36","37","38","39","3a","3b","3c","3d","3e","3f","40","41","42","43","44","45","46","47","48","49","4a","4b","4c","4d","4e","4f","50","51","52","53","54","55","56","57","58","59","5a","5b","5c","5d","5e","5f","60","61","62","63","64","65","66","67","68","69","6a","6b","6c","6d","6e","6f","70","71","72","73","74","75","76","77","78","79","7a","7b","7c","7d","7e","7f","80","81","82","83","84","85","86","87","88","89","8a","8b","8c","8d","8e","8f","90","91","92","93","94","95","96","97","98","99","9a","9b","9c","9d","9e","9f","a0","a1","a2","a3","a4","a5","a6","a7","a8","a9","aa","ab","ac","ad","ae","af","b0","b1","b2","b3","b4","b5","b6","b7","b8","b9","ba","bb","bc","bd","be","bf","c0","c1","c2","c3","c4","c5","c6","c7","c8","c9","ca","cb","cc","cd","ce","cf","d0","d1","d2","d3","d4","d5","d6","d7","d8","d9","da","db","dc","dd","de","df","e0","e1","e2","e3","e4","e5","e6","e7","e8","e9","ea","eb","ec","ed","ee","ef","f0","f1","f2","f3","f4","f5","f6","f7","f8","f9","fa","fb","fc","fd","fe","ff"];var _v=Math.PI/180,zd=180/Math.PI;function fc(){let e=Math.random()*4294967295|0,t=Math.random()*4294967295|0,n=Math.random()*4294967295|0,i=Math.random()*4294967295|0;return(jn[e&255]+jn[e>>8&255]+jn[e>>16&255]+jn[e>>24&255]+"-"+jn[t&255]+jn[t>>8&255]+"-"+jn[t>>16&15|64]+jn[t>>24&255]+"-"+jn[n&63|128]+jn[n>>8&255]+"-"+jn[n>>16&255]+jn[n>>24&255]+jn[i&255]+jn[i>>8&255]+jn[i>>16&255]+jn[i>>24&255]).toLowerCase()}function Te(e,t,n){return Math.max(t,Math.min(n,e))}function mC(e,t){return(e%t+t)%t}function bv(e,t,n){return(1-n)*e+n*t}function tT(e){return Math.pow(2,Math.floor(Math.log(e)/Math.LN2))}function Cx(e){switch(e.constructor){case Uint32Array:return 4294967295;case Uint16Array:return 65535;case Uint8Array:case Uint8ClampedArray:return 255;case Int32Array:return 2147483647;case Int16Array:return 32767;case Int8Array:return 127;default:return}}function gC(e,t){if(t.constructor===Float32Array)return e;let n=Cx(t);if(n===void 0)throw new Error("THREE.MathUtils: Invalid component type.");return Math.max(e/n,-1)}function vC(e,t){if(t.constructor===Float32Array)return e;let n=Cx(t);if(n===void 0)throw new Error("THREE.MathUtils: Invalid component type.");return Math.round(e*n)}var Ox=class Ox{constructor(t=0,n=0){this.x=t,this.y=n}get width(){return this.x}set width(t){this.x=t}get height(){return this.y}set height(t){this.y=t}set(t,n){return this.x=t,this.y=n,this}setScalar(t){return this.x=t,this.y=t,this}setX(t){return this.x=t,this}setY(t){return this.y=t,this}setComponent(t,n){switch(t){case 0:this.x=n;break;case 1:this.y=n;break;default:throw new Error("THREE.Vector2: index is out of range: "+t)}return this}getComponent(t){switch(t){case 0:return this.x;case 1:return this.y;default:throw new Error("THREE.Vector2: index is out of range: "+t)}}clone(){return new this.constructor(this.x,this.y)}copy(t){return this.x=t.x,this.y=t.y,this}add(t){return this.x+=t.x,this.y+=t.y,this}addScalar(t){return this.x+=t,this.y+=t,this}addVectors(t,n){return this.x=t.x+n.x,this.y=t.y+n.y,this}addScaledVector(t,n){return this.x+=t.x*n,this.y+=t.y*n,this}sub(t){return this.x-=t.x,this.y-=t.y,this}subScalar(t){return this.x-=t,this.y-=t,this}subVectors(t,n){return this.x=t.x-n.x,this.y=t.y-n.y,this}multiply(t){return this.x*=t.x,this.y*=t.y,this}multiplyScalar(t){return this.x*=t,this.y*=t,this}divide(t){return this.x/=t.x,this.y/=t.y,this}divideScalar(t){return this.multiplyScalar(1/t)}applyMatrix3(t){let n=this.x,i=this.y,a=t.elements;return this.x=a[0]*n+a[3]*i+a[6],this.y=a[1]*n+a[4]*i+a[7],this}min(t){return this.x=Math.min(this.x,t.x),this.y=Math.min(this.y,t.y),this}max(t){return this.x=Math.max(this.x,t.x),this.y=Math.max(this.y,t.y),this}clamp(t,n){return this.x=Te(this.x,t.x,n.x),this.y=Te(this.y,t.y,n.y),this}clampScalar(t,n){return this.x=Te(this.x,t,n),this.y=Te(this.y,t,n),this}clampLength(t,n){let i=this.length();return this.divideScalar(i||1).multiplyScalar(Te(i,t,n))}floor(){return this.x=Math.floor(this.x),this.y=Math.floor(this.y),this}ceil(){return this.x=Math.ceil(this.x),this.y=Math.ceil(this.y),this}round(){return this.x=Math.round(this.x),this.y=Math.round(this.y),this}roundToZero(){return this.x=Math.trunc(this.x),this.y=Math.trunc(this.y),this}negate(){return this.x=-this.x,this.y=-this.y,this}dot(t){return this.x*t.x+this.y*t.y}cross(t){return this.x*t.y-this.y*t.x}lengthSq(){return this.x*this.x+this.y*this.y}length(){return Math.sqrt(this.x*this.x+this.y*this.y)}manhattanLength(){return Math.abs(this.x)+Math.abs(this.y)}normalize(){return this.divideScalar(this.length()||1)}angle(){return Math.atan2(-this.y,-this.x)+Math.PI}angleTo(t){let n=Math.sqrt(this.lengthSq()*t.lengthSq());if(n===0)return Math.PI/2;let i=this.dot(t)/n;return Math.acos(Te(i,-1,1))}distanceTo(t){return Math.sqrt(this.distanceToSquared(t))}distanceToSquared(t){let n=this.x-t.x,i=this.y-t.y;return n*n+i*i}manhattanDistanceTo(t){return Math.abs(this.x-t.x)+Math.abs(this.y-t.y)}setLength(t){return this.normalize().multiplyScalar(t)}lerp(t,n){return this.x+=(t.x-this.x)*n,this.y+=(t.y-this.y)*n,this}lerpVectors(t,n,i){return this.x=t.x+(n.x-t.x)*i,this.y=t.y+(n.y-t.y)*i,this}equals(t){return t.x===this.x&&t.y===this.y}fromArray(t,n=0){return this.x=t[n],this.y=t[n+1],this}toArray(t=[],n=0){return t[n]=this.x,t[n+1]=this.y,t}fromBufferAttribute(t,n){return this.x=t.getX(n),this.y=t.getY(n),this}rotateAround(t,n){let i=Math.cos(n),a=Math.sin(n),r=this.x-t.x,s=this.y-t.y;return this.x=r*i-s*a+t.x,this.y=r*a+s*i+t.y,this}random(){return this.x=Math.random(),this.y=Math.random(),this}*[Symbol.iterator](){yield this.x,yield this.y}};Ox.prototype.isVector2=!0;var Ot=Ox,ci=class{constructor(t=0,n=0,i=0,a=1){this.isQuaternion=!0,this._x=t,this._y=n,this._z=i,this._w=a}static slerpFlat(t,n,i,a,r,s,l){let o=i[a+0],c=i[a+1],u=i[a+2],p=i[a+3],f=r[s+0],h=r[s+1],g=r[s+2],M=r[s+3];if(p!==M||o!==f||c!==h||u!==g){let v=o*f+c*h+u*g+p*M;v<0&&(f=-f,h=-h,g=-g,M=-M,v=-v);let d=1-l;if(v<.9995){let x=Math.acos(v),b=Math.sin(x);d=Math.sin(d*x)/b,l=Math.sin(l*x)/b,o=o*d+f*l,c=c*d+h*l,u=u*d+g*l,p=p*d+M*l}else{o=o*d+f*l,c=c*d+h*l,u=u*d+g*l,p=p*d+M*l;let x=1/Math.sqrt(o*o+c*c+u*u+p*p);o*=x,c*=x,u*=x,p*=x}}t[n]=o,t[n+1]=c,t[n+2]=u,t[n+3]=p}static multiplyQuaternionsFlat(t,n,i,a,r,s){let l=i[a],o=i[a+1],c=i[a+2],u=i[a+3],p=r[s],f=r[s+1],h=r[s+2],g=r[s+3];return t[n]=l*g+u*p+o*h-c*f,t[n+1]=o*g+u*f+c*p-l*h,t[n+2]=c*g+u*h+l*f-o*p,t[n+3]=u*g-l*p-o*f-c*h,t}get x(){return this._x}set x(t){this._x=t,this._onChangeCallback()}get y(){return this._y}set y(t){this._y=t,this._onChangeCallback()}get z(){return this._z}set z(t){this._z=t,this._onChangeCallback()}get w(){return this._w}set w(t){this._w=t,this._onChangeCallback()}set(t,n,i,a){return this._x=t,this._y=n,this._z=i,this._w=a,this._onChangeCallback(),this}clone(){return new this.constructor(this._x,this._y,this._z,this._w)}copy(t){return this._x=t.x,this._y=t.y,this._z=t.z,this._w=t.w,this._onChangeCallback(),this}setFromEuler(t,n=!0){let i=t._x,a=t._y,r=t._z,s=t._order,l=Math.cos,o=Math.sin,c=l(i/2),u=l(a/2),p=l(r/2),f=o(i/2),h=o(a/2),g=o(r/2);switch(s){case"XYZ":this._x=f*u*p+c*h*g,this._y=c*h*p-f*u*g,this._z=c*u*g+f*h*p,this._w=c*u*p-f*h*g;break;case"YXZ":this._x=f*u*p+c*h*g,this._y=c*h*p-f*u*g,this._z=c*u*g-f*h*p,this._w=c*u*p+f*h*g;break;case"ZXY":this._x=f*u*p-c*h*g,this._y=c*h*p+f*u*g,this._z=c*u*g+f*h*p,this._w=c*u*p-f*h*g;break;case"ZYX":this._x=f*u*p-c*h*g,this._y=c*h*p+f*u*g,this._z=c*u*g-f*h*p,this._w=c*u*p+f*h*g;break;case"YZX":this._x=f*u*p+c*h*g,this._y=c*h*p+f*u*g,this._z=c*u*g-f*h*p,this._w=c*u*p-f*h*g;break;case"XZY":this._x=f*u*p-c*h*g,this._y=c*h*p-f*u*g,this._z=c*u*g+f*h*p,this._w=c*u*p+f*h*g;break;default:ce("Quaternion: .setFromEuler() encountered an unknown order: "+s)}return n===!0&&this._onChangeCallback(),this}setFromAxisAngle(t,n){let i=n/2,a=Math.sin(i);return this._x=t.x*a,this._y=t.y*a,this._z=t.z*a,this._w=Math.cos(i),this._onChangeCallback(),this}setFromRotationMatrix(t){let n=t.elements,i=n[0],a=n[4],r=n[8],s=n[1],l=n[5],o=n[9],c=n[2],u=n[6],p=n[10],f=i+l+p;if(f>0){let h=.5/Math.sqrt(f+1);this._w=.25/h,this._x=(u-o)*h,this._y=(r-c)*h,this._z=(s-a)*h}else if(i>l&&i>p){let h=2*Math.sqrt(1+i-l-p);this._w=(u-o)/h,this._x=.25*h,this._y=(a+s)/h,this._z=(r+c)/h}else if(l>p){let h=2*Math.sqrt(1+l-i-p);this._w=(r-c)/h,this._x=(a+s)/h,this._y=.25*h,this._z=(o+u)/h}else{let h=2*Math.sqrt(1+p-i-l);this._w=(s-a)/h,this._x=(r+c)/h,this._y=(o+u)/h,this._z=.25*h}return this._onChangeCallback(),this}setFromUnitVectors(t,n){let i=t.dot(n)+1;return i<1e-8?(i=0,Math.abs(t.x)>Math.abs(t.z)?(this._x=-t.y,this._y=t.x,this._z=0,this._w=i):(this._x=0,this._y=-t.z,this._z=t.y,this._w=i)):(this._x=t.y*n.z-t.z*n.y,this._y=t.z*n.x-t.x*n.z,this._z=t.x*n.y-t.y*n.x,this._w=i),this.normalize()}angleTo(t){return 2*Math.acos(Math.abs(Te(this.dot(t),-1,1)))}rotateTowards(t,n){let i=this.angleTo(t);if(i===0)return this;let a=Math.min(1,n/i);return this.slerp(t,a),this}identity(){return this.set(0,0,0,1)}invert(){return this.conjugate()}conjugate(){return this._x*=-1,this._y*=-1,this._z*=-1,this._onChangeCallback(),this}dot(t){return this._x*t._x+this._y*t._y+this._z*t._z+this._w*t._w}lengthSq(){return this._x*this._x+this._y*this._y+this._z*this._z+this._w*this._w}length(){return Math.sqrt(this._x*this._x+this._y*this._y+this._z*this._z+this._w*this._w)}normalize(){let t=this.length();return t===0?(this._x=0,this._y=0,this._z=0,this._w=1):(t=1/t,this._x=this._x*t,this._y=this._y*t,this._z=this._z*t,this._w=this._w*t),this._onChangeCallback(),this}multiply(t){return this.multiplyQuaternions(this,t)}premultiply(t){return this.multiplyQuaternions(t,this)}multiplyQuaternions(t,n){let i=t._x,a=t._y,r=t._z,s=t._w,l=n._x,o=n._y,c=n._z,u=n._w;return this._x=i*u+s*l+a*c-r*o,this._y=a*u+s*o+r*l-i*c,this._z=r*u+s*c+i*o-a*l,this._w=s*u-i*l-a*o-r*c,this._onChangeCallback(),this}slerp(t,n){let i=t._x,a=t._y,r=t._z,s=t._w,l=this.dot(t);l<0&&(i=-i,a=-a,r=-r,s=-s,l=-l);let o=1-n;if(l<.9995){let c=Math.acos(l),u=Math.sin(c);o=Math.sin(o*c)/u,n=Math.sin(n*c)/u,this._x=this._x*o+i*n,this._y=this._y*o+a*n,this._z=this._z*o+r*n,this._w=this._w*o+s*n,this._onChangeCallback()}else this._x=this._x*o+i*n,this._y=this._y*o+a*n,this._z=this._z*o+r*n,this._w=this._w*o+s*n,this.normalize();return this}slerpQuaternions(t,n,i){return this.copy(t).slerp(n,i)}random(){let t=2*Math.PI*Math.random(),n=2*Math.PI*Math.random(),i=Math.random(),a=Math.sqrt(1-i),r=Math.sqrt(i);return this.set(a*Math.sin(t),a*Math.cos(t),r*Math.sin(n),r*Math.cos(n))}equals(t){return t._x===this._x&&t._y===this._y&&t._z===this._z&&t._w===this._w}fromArray(t,n=0){return this._x=t[n],this._y=t[n+1],this._z=t[n+2],this._w=t[n+3],this._onChangeCallback(),this}toArray(t=[],n=0){return t[n]=this._x,t[n+1]=this._y,t[n+2]=this._z,t[n+3]=this._w,t}fromBufferAttribute(t,n){return this._x=t.getX(n),this._y=t.getY(n),this._z=t.getZ(n),this._w=t.getW(n),this._onChangeCallback(),this}toJSON(){return this.toArray()}_onChange(t){return this._onChangeCallback=t,this}_onChangeCallback(){}*[Symbol.iterator](){yield this._x,yield this._y,yield this._z,yield this._w}},Px=class Px{constructor(t=0,n=0,i=0){this.x=t,this.y=n,this.z=i}set(t,n,i){return i===void 0&&(i=this.z),this.x=t,this.y=n,this.z=i,this}setScalar(t){return this.x=t,this.y=t,this.z=t,this}setX(t){return this.x=t,this}setY(t){return this.y=t,this}setZ(t){return this.z=t,this}setComponent(t,n){switch(t){case 0:this.x=n;break;case 1:this.y=n;break;case 2:this.z=n;break;default:throw new Error("THREE.Vector3: index is out of range: "+t)}return this}getComponent(t){switch(t){case 0:return this.x;case 1:return this.y;case 2:return this.z;default:throw new Error("THREE.Vector3: index is out of range: "+t)}}clone(){return new this.constructor(this.x,this.y,this.z)}copy(t){return this.x=t.x,this.y=t.y,this.z=t.z,this}add(t){return this.x+=t.x,this.y+=t.y,this.z+=t.z,this}addScalar(t){return this.x+=t,this.y+=t,this.z+=t,this}addVectors(t,n){return this.x=t.x+n.x,this.y=t.y+n.y,this.z=t.z+n.z,this}addScaledVector(t,n){return this.x+=t.x*n,this.y+=t.y*n,this.z+=t.z*n,this}sub(t){return this.x-=t.x,this.y-=t.y,this.z-=t.z,this}subScalar(t){return this.x-=t,this.y-=t,this.z-=t,this}subVectors(t,n){return this.x=t.x-n.x,this.y=t.y-n.y,this.z=t.z-n.z,this}multiply(t){return this.x*=t.x,this.y*=t.y,this.z*=t.z,this}multiplyScalar(t){return this.x*=t,this.y*=t,this.z*=t,this}multiplyVectors(t,n){return this.x=t.x*n.x,this.y=t.y*n.y,this.z=t.z*n.z,this}applyEuler(t){return this.applyQuaternion(GM.setFromEuler(t))}applyAxisAngle(t,n){return this.applyQuaternion(GM.setFromAxisAngle(t,n))}applyMatrix3(t){let n=this.x,i=this.y,a=this.z,r=t.elements;return this.x=r[0]*n+r[3]*i+r[6]*a,this.y=r[1]*n+r[4]*i+r[7]*a,this.z=r[2]*n+r[5]*i+r[8]*a,this}applyNormalMatrix(t){return this.applyMatrix3(t).normalize()}applyMatrix4(t){let n=this.x,i=this.y,a=this.z,r=t.elements,s=1/(r[3]*n+r[7]*i+r[11]*a+r[15]);return this.x=(r[0]*n+r[4]*i+r[8]*a+r[12])*s,this.y=(r[1]*n+r[5]*i+r[9]*a+r[13])*s,this.z=(r[2]*n+r[6]*i+r[10]*a+r[14])*s,this}applyQuaternion(t){let n=this.x,i=this.y,a=this.z,r=t.x,s=t.y,l=t.z,o=t.w,c=2*(s*a-l*i),u=2*(l*n-r*a),p=2*(r*i-s*n);return this.x=n+o*c+s*p-l*u,this.y=i+o*u+l*c-r*p,this.z=a+o*p+r*u-s*c,this}project(t){return this.applyMatrix4(t.matrixWorldInverse).applyMatrix4(t.projectionMatrix)}unproject(t){return this.applyMatrix4(t.projectionMatrixInverse).applyMatrix4(t.matrixWorld)}transformDirection(t){let n=this.x,i=this.y,a=this.z,r=t.elements;return this.x=r[0]*n+r[4]*i+r[8]*a,this.y=r[1]*n+r[5]*i+r[9]*a,this.z=r[2]*n+r[6]*i+r[10]*a,this.normalize()}divide(t){return this.x/=t.x,this.y/=t.y,this.z/=t.z,this}divideScalar(t){return this.multiplyScalar(1/t)}min(t){return this.x=Math.min(this.x,t.x),this.y=Math.min(this.y,t.y),this.z=Math.min(this.z,t.z),this}max(t){return this.x=Math.max(this.x,t.x),this.y=Math.max(this.y,t.y),this.z=Math.max(this.z,t.z),this}clamp(t,n){return this.x=Te(this.x,t.x,n.x),this.y=Te(this.y,t.y,n.y),this.z=Te(this.z,t.z,n.z),this}clampScalar(t,n){return this.x=Te(this.x,t,n),this.y=Te(this.y,t,n),this.z=Te(this.z,t,n),this}clampLength(t,n){let i=this.length();return this.divideScalar(i||1).multiplyScalar(Te(i,t,n))}floor(){return this.x=Math.floor(this.x),this.y=Math.floor(this.y),this.z=Math.floor(this.z),this}ceil(){return this.x=Math.ceil(this.x),this.y=Math.ceil(this.y),this.z=Math.ceil(this.z),this}round(){return this.x=Math.round(this.x),this.y=Math.round(this.y),this.z=Math.round(this.z),this}roundToZero(){return this.x=Math.trunc(this.x),this.y=Math.trunc(this.y),this.z=Math.trunc(this.z),this}negate(){return this.x=-this.x,this.y=-this.y,this.z=-this.z,this}dot(t){return this.x*t.x+this.y*t.y+this.z*t.z}lengthSq(){return this.x*this.x+this.y*this.y+this.z*this.z}length(){return Math.sqrt(this.x*this.x+this.y*this.y+this.z*this.z)}manhattanLength(){return Math.abs(this.x)+Math.abs(this.y)+Math.abs(this.z)}normalize(){return this.divideScalar(this.length()||1)}setLength(t){return this.normalize().multiplyScalar(t)}lerp(t,n){return this.x+=(t.x-this.x)*n,this.y+=(t.y-this.y)*n,this.z+=(t.z-this.z)*n,this}lerpVectors(t,n,i){return this.x=t.x+(n.x-t.x)*i,this.y=t.y+(n.y-t.y)*i,this.z=t.z+(n.z-t.z)*i,this}cross(t){return this.crossVectors(this,t)}crossVectors(t,n){let i=t.x,a=t.y,r=t.z,s=n.x,l=n.y,o=n.z;return this.x=a*o-r*l,this.y=r*s-i*o,this.z=i*l-a*s,this}projectOnVector(t){let n=t.lengthSq();if(n===0)return this.set(0,0,0);let i=t.dot(this)/n;return this.copy(t).multiplyScalar(i)}projectOnPlane(t){return Sv.copy(this).projectOnVector(t),this.sub(Sv)}reflect(t){return this.sub(Sv.copy(t).multiplyScalar(2*this.dot(t)))}angleTo(t){let n=Math.sqrt(this.lengthSq()*t.lengthSq());if(n===0)return Math.PI/2;let i=this.dot(t)/n;return Math.acos(Te(i,-1,1))}distanceTo(t){return Math.sqrt(this.distanceToSquared(t))}distanceToSquared(t){let n=this.x-t.x,i=this.y-t.y,a=this.z-t.z;return n*n+i*i+a*a}manhattanDistanceTo(t){return Math.abs(this.x-t.x)+Math.abs(this.y-t.y)+Math.abs(this.z-t.z)}setFromSpherical(t){return this.setFromSphericalCoords(t.radius,t.phi,t.theta)}setFromSphericalCoords(t,n,i){let a=Math.sin(n)*t;return this.x=a*Math.sin(i),this.y=Math.cos(n)*t,this.z=a*Math.cos(i),this}setFromCylindrical(t){return this.setFromCylindricalCoords(t.radius,t.theta,t.y)}setFromCylindricalCoords(t,n,i){return this.x=t*Math.sin(n),this.y=i,this.z=t*Math.cos(n),this}setFromMatrixPosition(t){let n=t.elements;return this.x=n[12],this.y=n[13],this.z=n[14],this}setFromMatrixScale(t){let n=this.setFromMatrixColumn(t,0).length(),i=this.setFromMatrixColumn(t,1).length(),a=this.setFromMatrixColumn(t,2).length();return this.x=n,this.y=i,this.z=a,this}setFromMatrixColumn(t,n){return this.fromArray(t.elements,n*4)}setFromMatrix3Column(t,n){return this.fromArray(t.elements,n*3)}setFromEuler(t){return this.x=t._x,this.y=t._y,this.z=t._z,this}setFromColor(t){return this.x=t.r,this.y=t.g,this.z=t.b,this}equals(t){return t.x===this.x&&t.y===this.y&&t.z===this.z}fromArray(t,n=0){return this.x=t[n],this.y=t[n+1],this.z=t[n+2],this}toArray(t=[],n=0){return t[n]=this.x,t[n+1]=this.y,t[n+2]=this.z,t}fromBufferAttribute(t,n){return this.x=t.getX(n),this.y=t.getY(n),this.z=t.getZ(n),this}random(){return this.x=Math.random(),this.y=Math.random(),this.z=Math.random(),this}randomDirection(){let t=Math.random()*Math.PI*2,n=Math.random()*2-1,i=Math.sqrt(1-n*n);return this.x=i*Math.cos(t),this.y=n,this.z=i*Math.sin(t),this}*[Symbol.iterator](){yield this.x,yield this.y,yield this.z}};Px.prototype.isVector3=!0;var q=Px,Sv=new q,GM=new ci,zx=class zx{constructor(t,n,i,a,r,s,l,o,c){this.elements=[1,0,0,0,1,0,0,0,1],t!==void 0&&this.set(t,n,i,a,r,s,l,o,c)}set(t,n,i,a,r,s,l,o,c){let u=this.elements;return u[0]=t,u[1]=a,u[2]=l,u[3]=n,u[4]=r,u[5]=o,u[6]=i,u[7]=s,u[8]=c,this}identity(){return this.set(1,0,0,0,1,0,0,0,1),this}copy(t){let n=this.elements,i=t.elements;return n[0]=i[0],n[1]=i[1],n[2]=i[2],n[3]=i[3],n[4]=i[4],n[5]=i[5],n[6]=i[6],n[7]=i[7],n[8]=i[8],this}extractBasis(t,n,i){return t.setFromMatrix3Column(this,0),n.setFromMatrix3Column(this,1),i.setFromMatrix3Column(this,2),this}setFromMatrix4(t){let n=t.elements;return this.set(n[0],n[4],n[8],n[1],n[5],n[9],n[2],n[6],n[10]),this}multiply(t){return this.multiplyMatrices(this,t)}premultiply(t){return this.multiplyMatrices(t,this)}multiplyMatrices(t,n){let i=t.elements,a=n.elements,r=this.elements,s=i[0],l=i[3],o=i[6],c=i[1],u=i[4],p=i[7],f=i[2],h=i[5],g=i[8],M=a[0],v=a[3],d=a[6],x=a[1],b=a[4],y=a[7],w=a[2],T=a[5],m=a[8];return r[0]=s*M+l*x+o*w,r[3]=s*v+l*b+o*T,r[6]=s*d+l*y+o*m,r[1]=c*M+u*x+p*w,r[4]=c*v+u*b+p*T,r[7]=c*d+u*y+p*m,r[2]=f*M+h*x+g*w,r[5]=f*v+h*b+g*T,r[8]=f*d+h*y+g*m,this}multiplyScalar(t){let n=this.elements;return n[0]*=t,n[3]*=t,n[6]*=t,n[1]*=t,n[4]*=t,n[7]*=t,n[2]*=t,n[5]*=t,n[8]*=t,this}determinant(){let t=this.elements,n=t[0],i=t[1],a=t[2],r=t[3],s=t[4],l=t[5],o=t[6],c=t[7],u=t[8];return n*s*u-n*l*c-i*r*u+i*l*o+a*r*c-a*s*o}invert(){let t=this.elements,n=t[0],i=t[1],a=t[2],r=t[3],s=t[4],l=t[5],o=t[6],c=t[7],u=t[8],p=u*s-l*c,f=l*o-u*r,h=c*r-s*o,g=n*p+i*f+a*h;if(g===0)return this.set(0,0,0,0,0,0,0,0,0);let M=1/g;return t[0]=p*M,t[1]=(a*c-u*i)*M,t[2]=(l*i-a*s)*M,t[3]=f*M,t[4]=(u*n-a*o)*M,t[5]=(a*r-l*n)*M,t[6]=h*M,t[7]=(i*o-c*n)*M,t[8]=(s*n-i*r)*M,this}transpose(){let t,n=this.elements;return t=n[1],n[1]=n[3],n[3]=t,t=n[2],n[2]=n[6],n[6]=t,t=n[5],n[5]=n[7],n[7]=t,this}getNormalMatrix(t){return this.setFromMatrix4(t).invert().transpose()}transposeIntoArray(t){let n=this.elements;return t[0]=n[0],t[1]=n[3],t[2]=n[6],t[3]=n[1],t[4]=n[4],t[5]=n[7],t[6]=n[2],t[7]=n[5],t[8]=n[8],this}setUvTransform(t,n,i,a,r,s,l){let o=Math.cos(r),c=Math.sin(r);return this.set(i*o,i*c,-i*(o*s+c*l)+s+t,-a*c,a*o,-a*(-c*s+o*l)+l+n,0,0,1),this}scale(t,n){return po("Matrix3: .scale() is deprecated. Use .makeScale() instead."),this.premultiply(Mv.makeScale(t,n)),this}rotate(t){return po("Matrix3: .rotate() is deprecated. Use .makeRotation() instead."),this.premultiply(Mv.makeRotation(-t)),this}translate(t,n){return po("Matrix3: .translate() is deprecated. Use .makeTranslation() instead."),this.premultiply(Mv.makeTranslation(t,n)),this}makeTranslation(t,n){return t.isVector2?this.set(1,0,t.x,0,1,t.y,0,0,1):this.set(1,0,t,0,1,n,0,0,1),this}makeRotation(t){let n=Math.cos(t),i=Math.sin(t);return this.set(n,-i,0,i,n,0,0,0,1),this}makeScale(t,n){return this.set(t,0,0,0,n,0,0,0,1),this}equals(t){let n=this.elements,i=t.elements;for(let a=0;a<9;a++)if(n[a]!==i[a])return!1;return!0}fromArray(t,n=0){for(let i=0;i<9;i++)this.elements[i]=t[i+n];return this}toArray(t=[],n=0){let i=this.elements;return t[n]=i[0],t[n+1]=i[1],t[n+2]=i[2],t[n+3]=i[3],t[n+4]=i[4],t[n+5]=i[5],t[n+6]=i[6],t[n+7]=i[7],t[n+8]=i[8],t}clone(){return new this.constructor().fromArray(this.elements)}};zx.prototype.isMatrix3=!0;var de=zx,Mv=new de,VM=new de().set(.4123908,.3575843,.1804808,.212639,.7151687,.0721923,.0193308,.1191948,.9505322),kM=new de().set(3.2409699,-1.5373832,-.4986108,-.9692436,1.8759675,.0415551,.0556301,-.203977,1.0569715);function xC(){let e={enabled:!0,workingColorSpace:Du,spaces:{},convert:function(a,r,s){return this.enabled===!1||r===s||!r||!s||(this.spaces[r].transfer===Ge&&(a.r=Cr(a.r),a.g=Cr(a.g),a.b=Cr(a.b)),this.spaces[r].primaries!==this.spaces[s].primaries&&(a.applyMatrix3(this.spaces[r].toXYZ),a.applyMatrix3(this.spaces[s].fromXYZ)),this.spaces[s].transfer===Ge&&(a.r=Gl(a.r),a.g=Gl(a.g),a.b=Gl(a.b))),a},workingToColorSpace:function(a,r){return this.convert(a,this.workingColorSpace,r)},colorSpaceToWorking:function(a,r){return this.convert(a,r,this.workingColorSpace)},getPrimaries:function(a){return this.spaces[a].primaries},getTransfer:function(a){return a===Ir?Nu:this.spaces[a].transfer},getToneMappingMode:function(a){return this.spaces[a].outputColorSpaceConfig.toneMappingMode||"standard"},getLuminanceCoefficients:function(a,r=this.workingColorSpace){return a.fromArray(this.spaces[r].luminanceCoefficients)},define:function(a){Object.assign(this.spaces,a)},_getMatrix:function(a,r,s){return a.copy(this.spaces[s].fromXYZ).multiply(this.spaces[r].toXYZ)},_getDrawingBufferColorSpace:function(a){return this.spaces[a].outputColorSpaceConfig.drawingBufferColorSpace},_getUnpackColorSpace:function(a=this.workingColorSpace){return this.spaces[a].workingColorSpaceConfig.unpackColorSpace}},t=[.64,.33,.3,.6,.15,.06],n=[.2126,.7152,.0722],i=[.3127,.329];return e.define({[Du]:{primaries:t,whitePoint:i,transfer:Nu,toXYZ:VM,fromXYZ:kM,luminanceCoefficients:n,workingColorSpaceConfig:{unpackColorSpace:Wn},outputColorSpaceConfig:{drawingBufferColorSpace:Wn}},[Wn]:{primaries:t,whitePoint:i,transfer:Ge,toXYZ:VM,fromXYZ:kM,luminanceCoefficients:n,outputColorSpaceConfig:{drawingBufferColorSpace:Wn}}}),e}var Ne=xC();function Cr(e){return e<.04045?e*.0773993808:Math.pow(e*.9478672986+.0521327014,2.4)}function Gl(e){return e<.0031308?e*12.92:1.055*Math.pow(e,.41666)-.055}var Rl,Fd=class{static getDataURL(t,n="image/png"){if(/^data:/i.test(t.src)||typeof HTMLCanvasElement>"u")return t.src;let i;if(t instanceof HTMLCanvasElement)i=t;else{Rl===void 0&&(Rl=Lu("canvas")),Rl.width=t.width,Rl.height=t.height;let a=Rl.getContext("2d");t instanceof ImageData?a.putImageData(t,0,0):a.drawImage(t,0,0,t.width,t.height),i=Rl}return i.toDataURL(n)}static sRGBToLinear(t){if(typeof HTMLImageElement<"u"&&t instanceof HTMLImageElement||typeof HTMLCanvasElement<"u"&&t instanceof HTMLCanvasElement||typeof ImageBitmap<"u"&&t instanceof ImageBitmap){let n=Lu("canvas");n.width=t.width,n.height=t.height;let i=n.getContext("2d");i.drawImage(t,0,0,t.width,t.height);let a=i.getImageData(0,0,t.width,t.height),r=a.data;for(let s=0;s<r.length;s++)r[s]=Cr(r[s]/255)*255;return i.putImageData(a,0,0),n}else if(t.data){let n=t.data.slice(0);for(let i=0;i<n.length;i++)n instanceof Uint8Array||n instanceof Uint8ClampedArray?n[i]=Math.floor(Cr(n[i]/255)*255):n[i]=Cr(n[i]);return{data:n,width:t.width,height:t.height}}else return ce("ImageUtils.sRGBToLinear(): Unsupported image type. No color space conversion applied."),t}},yC=0,Wl=class{constructor(t=null){this.isTextureSource=!0,Object.defineProperty(this,"id",{value:yC++}),this.uuid=fc(),this.data=t,this.dataReady=!0,this.version=0}getSize(t){let n=this.data;return typeof HTMLVideoElement<"u"&&n instanceof HTMLVideoElement?t.set(n.videoWidth,n.videoHeight,0):typeof VideoFrame<"u"&&n instanceof VideoFrame?t.set(n.displayWidth,n.displayHeight,0):n!==null?t.set(n.width||0,n.height||0,n.depth||0):t.set(0,0,0),t}set needsUpdate(t){t===!0&&this.version++}toJSON(t){let n=t===void 0||typeof t=="string";if(!n&&t.images[this.uuid]!==void 0)return t.images[this.uuid];let i={uuid:this.uuid,url:""},a=this.data;if(a!==null){let r;if(Array.isArray(a)){r=[];for(let s=0,l=a.length;s<l;s++)a[s].isDataTexture?r.push(Ev(a[s].image)):r.push(Ev(a[s]))}else r=Ev(a);i.url=r}return n||(t.images[this.uuid]=i),i}};function Ev(e){return typeof HTMLImageElement<"u"&&e instanceof HTMLImageElement||typeof HTMLCanvasElement<"u"&&e instanceof HTMLCanvasElement||typeof ImageBitmap<"u"&&e instanceof ImageBitmap?Fd.getDataURL(e):e.data?{data:Array.from(e.data),width:e.width,height:e.height,type:e.data.constructor.name}:(ce("Texture: Unable to serialize Texture."),{})}var _C=0,Tv=new q,ui=class e extends ja{constructor(t=e.DEFAULT_IMAGE,n=e.DEFAULT_MAPPING,i=la,a=la,r=qn,s=Sa,l=wa,o=wi,c=e.DEFAULT_ANISOTROPY,u=Ir){super(),this.isTexture=!0,Object.defineProperty(this,"id",{value:_C++}),this.uuid=fc(),this.name="",this.source=new Wl(t),this.mipmaps=[],this.mapping=n,this.channel=0,this.wrapS=i,this.wrapT=a,this.magFilter=r,this.minFilter=s,this.anisotropy=c,this.format=l,this.internalFormat=null,this.type=o,this.offset=new Ot(0,0),this.repeat=new Ot(1,1),this.center=new Ot(0,0),this.rotation=0,this.matrixAutoUpdate=!0,this.matrix=new de,this.generateMipmaps=!0,this.mipmapsAutoUpdate=!0,this.premultiplyAlpha=!1,this.flipY=!0,this.unpackAlignment=4,this.colorSpace=u,this.userData={},this.updateRanges=[],this.version=0,this.onUpdate=null,this.renderTarget=null,this.isRenderTargetTexture=!1,this.isArrayTexture=!!(t&&t.depth&&t.depth>1),this.pmremVersion=0,this.isPMREMTexture=!1,this.normalized=!1}get width(){return this.source.getSize(Tv).x}get height(){return this.source.getSize(Tv).y}get depth(){return this.source.getSize(Tv).z}get image(){return this.source.data}set image(t){this.source.data=t}updateMatrix(){this.matrix.setUvTransform(this.offset.x,this.offset.y,this.repeat.x,this.repeat.y,this.rotation,this.center.x,this.center.y)}addUpdateRange(t,n){this.updateRanges.push({start:t,count:n})}clearUpdateRanges(){this.updateRanges.length=0}clone(){return new this.constructor().copy(this)}copy(t){return this.name=t.name,this.source=t.source,this.mipmaps=t.mipmaps.slice(0),this.mapping=t.mapping,this.channel=t.channel,this.wrapS=t.wrapS,this.wrapT=t.wrapT,this.magFilter=t.magFilter,this.minFilter=t.minFilter,this.anisotropy=t.anisotropy,this.format=t.format,this.internalFormat=t.internalFormat,this.type=t.type,this.normalized=t.normalized,this.offset.copy(t.offset),this.repeat.copy(t.repeat),this.center.copy(t.center),this.rotation=t.rotation,this.matrixAutoUpdate=t.matrixAutoUpdate,this.matrix.copy(t.matrix),this.generateMipmaps=t.generateMipmaps,this.mipmapsAutoUpdate=t.mipmapsAutoUpdate,this.premultiplyAlpha=t.premultiplyAlpha,this.flipY=t.flipY,this.unpackAlignment=t.unpackAlignment,this.colorSpace=t.colorSpace,this.renderTarget=t.renderTarget,this.isRenderTargetTexture=t.isRenderTargetTexture,this.isPMREMTexture=t.isPMREMTexture,this.isArrayTexture=t.isArrayTexture,this.userData=JSON.parse(JSON.stringify(t.userData)),this.needsUpdate=!0,this}setValues(t){for(let n in t){let i=t[n];if(i===void 0){ce(`Texture.setValues(): parameter '${n}' has value of undefined.`);continue}let a=this[n];if(a===void 0){ce(`Texture.setValues(): property '${n}' does not exist.`);continue}a&&i&&a.isVector2&&i.isVector2||a&&i&&a.isVector3&&i.isVector3||a&&i&&a.isMatrix3&&i.isMatrix3?a.copy(i):this[n]=i}}toJSON(t){let n=t===void 0||typeof t=="string";if(!n&&t.textures[this.uuid]!==void 0)return t.textures[this.uuid];let i={metadata:{version:4.7,type:"Texture",generator:"Texture.toJSON"},uuid:this.uuid,name:this.name,image:this.source.toJSON(t).uuid,mapping:this.mapping,channel:this.channel,repeat:[this.repeat.x,this.repeat.y],offset:[this.offset.x,this.offset.y],center:[this.center.x,this.center.y],rotation:this.rotation,wrap:[this.wrapS,this.wrapT],format:this.format,internalFormat:this.internalFormat,type:this.type,normalized:this.normalized,colorSpace:this.colorSpace,minFilter:this.minFilter,magFilter:this.magFilter,anisotropy:this.anisotropy,flipY:this.flipY,generateMipmaps:this.generateMipmaps,mipmapsAutoUpdate:this.mipmapsAutoUpdate,premultiplyAlpha:this.premultiplyAlpha,unpackAlignment:this.unpackAlignment};return Object.keys(this.userData).length>0&&(i.userData=this.userData),n||(t.textures[this.uuid]=i),i}dispose(){this.dispatchEvent({type:"dispose"})}transformUv(t){if(this.mapping!==gx)return t;if(t.applyMatrix3(this.matrix),t.x<0||t.x>1)switch(this.wrapS){case Ka:t.x=t.x-Math.floor(t.x);break;case la:t.x=t.x<0?0:1;break;case Od:Math.abs(Math.floor(t.x)%2)===1?t.x=Math.ceil(t.x)-t.x:t.x=t.x-Math.floor(t.x);break}if(t.y<0||t.y>1)switch(this.wrapT){case Ka:t.y=t.y-Math.floor(t.y);break;case la:t.y=t.y<0?0:1;break;case Od:Math.abs(Math.floor(t.y)%2)===1?t.y=Math.ceil(t.y)-t.y:t.y=t.y-Math.floor(t.y);break}return this.flipY&&(t.y=1-t.y),t}set needsUpdate(t){t===!0&&(this.version++,this.source.needsUpdate=!0)}set needsPMREMUpdate(t){t===!0&&this.pmremVersion++}};ui.DEFAULT_IMAGE=null;ui.DEFAULT_MAPPING=gx;ui.DEFAULT_ANISOTROPY=1;var Fx=class Fx{constructor(t=0,n=0,i=0,a=1){this.x=t,this.y=n,this.z=i,this.w=a}get width(){return this.z}set width(t){this.z=t}get height(){return this.w}set height(t){this.w=t}set(t,n,i,a){return this.x=t,this.y=n,this.z=i,this.w=a,this}setScalar(t){return this.x=t,this.y=t,this.z=t,this.w=t,this}setX(t){return this.x=t,this}setY(t){return this.y=t,this}setZ(t){return this.z=t,this}setW(t){return this.w=t,this}setComponent(t,n){switch(t){case 0:this.x=n;break;case 1:this.y=n;break;case 2:this.z=n;break;case 3:this.w=n;break;default:throw new Error("THREE.Vector4: index is out of range: "+t)}return this}getComponent(t){switch(t){case 0:return this.x;case 1:return this.y;case 2:return this.z;case 3:return this.w;default:throw new Error("THREE.Vector4: index is out of range: "+t)}}clone(){return new this.constructor(this.x,this.y,this.z,this.w)}copy(t){return this.x=t.x,this.y=t.y,this.z=t.z,this.w=t.w!==void 0?t.w:1,this}add(t){return this.x+=t.x,this.y+=t.y,this.z+=t.z,this.w+=t.w,this}addScalar(t){return this.x+=t,this.y+=t,this.z+=t,this.w+=t,this}addVectors(t,n){return this.x=t.x+n.x,this.y=t.y+n.y,this.z=t.z+n.z,this.w=t.w+n.w,this}addScaledVector(t,n){return this.x+=t.x*n,this.y+=t.y*n,this.z+=t.z*n,this.w+=t.w*n,this}sub(t){return this.x-=t.x,this.y-=t.y,this.z-=t.z,this.w-=t.w,this}subScalar(t){return this.x-=t,this.y-=t,this.z-=t,this.w-=t,this}subVectors(t,n){return this.x=t.x-n.x,this.y=t.y-n.y,this.z=t.z-n.z,this.w=t.w-n.w,this}multiply(t){return this.x*=t.x,this.y*=t.y,this.z*=t.z,this.w*=t.w,this}multiplyScalar(t){return this.x*=t,this.y*=t,this.z*=t,this.w*=t,this}applyMatrix4(t){let n=this.x,i=this.y,a=this.z,r=this.w,s=t.elements;return this.x=s[0]*n+s[4]*i+s[8]*a+s[12]*r,this.y=s[1]*n+s[5]*i+s[9]*a+s[13]*r,this.z=s[2]*n+s[6]*i+s[10]*a+s[14]*r,this.w=s[3]*n+s[7]*i+s[11]*a+s[15]*r,this}divide(t){return this.x/=t.x,this.y/=t.y,this.z/=t.z,this.w/=t.w,this}divideScalar(t){return this.multiplyScalar(1/t)}setAxisAngleFromQuaternion(t){this.w=2*Math.acos(t.w);let n=Math.sqrt(1-t.w*t.w);return n<1e-4?(this.x=1,this.y=0,this.z=0):(this.x=t.x/n,this.y=t.y/n,this.z=t.z/n),this}setAxisAngleFromRotationMatrix(t){let n,i,a,r,o=t.elements,c=o[0],u=o[4],p=o[8],f=o[1],h=o[5],g=o[9],M=o[2],v=o[6],d=o[10];if(Math.abs(u-f)<.01&&Math.abs(p-M)<.01&&Math.abs(g-v)<.01){if(Math.abs(u+f)<.1&&Math.abs(p+M)<.1&&Math.abs(g+v)<.1&&Math.abs(c+h+d-3)<.1)return this.set(1,0,0,0),this;n=Math.PI;let b=(c+1)/2,y=(h+1)/2,w=(d+1)/2,T=(u+f)/4,m=(p+M)/4,S=(g+v)/4;return b>y&&b>w?b<.01?(i=0,a=.707106781,r=.707106781):(i=Math.sqrt(b),a=T/i,r=m/i):y>w?y<.01?(i=.707106781,a=0,r=.707106781):(a=Math.sqrt(y),i=T/a,r=S/a):w<.01?(i=.707106781,a=.707106781,r=0):(r=Math.sqrt(w),i=m/r,a=S/r),this.set(i,a,r,n),this}let x=Math.sqrt((v-g)*(v-g)+(p-M)*(p-M)+(f-u)*(f-u));return Math.abs(x)<.001&&(x=1),this.x=(v-g)/x,this.y=(p-M)/x,this.z=(f-u)/x,this.w=Math.acos((c+h+d-1)/2),this}setFromMatrixPosition(t){let n=t.elements;return this.x=n[12],this.y=n[13],this.z=n[14],this.w=n[15],this}min(t){return this.x=Math.min(this.x,t.x),this.y=Math.min(this.y,t.y),this.z=Math.min(this.z,t.z),this.w=Math.min(this.w,t.w),this}max(t){return this.x=Math.max(this.x,t.x),this.y=Math.max(this.y,t.y),this.z=Math.max(this.z,t.z),this.w=Math.max(this.w,t.w),this}clamp(t,n){return this.x=Te(this.x,t.x,n.x),this.y=Te(this.y,t.y,n.y),this.z=Te(this.z,t.z,n.z),this.w=Te(this.w,t.w,n.w),this}clampScalar(t,n){return this.x=Te(this.x,t,n),this.y=Te(this.y,t,n),this.z=Te(this.z,t,n),this.w=Te(this.w,t,n),this}clampLength(t,n){let i=this.length();return this.divideScalar(i||1).multiplyScalar(Te(i,t,n))}floor(){return this.x=Math.floor(this.x),this.y=Math.floor(this.y),this.z=Math.floor(this.z),this.w=Math.floor(this.w),this}ceil(){return this.x=Math.ceil(this.x),this.y=Math.ceil(this.y),this.z=Math.ceil(this.z),this.w=Math.ceil(this.w),this}round(){return this.x=Math.round(this.x),this.y=Math.round(this.y),this.z=Math.round(this.z),this.w=Math.round(this.w),this}roundToZero(){return this.x=Math.trunc(this.x),this.y=Math.trunc(this.y),this.z=Math.trunc(this.z),this.w=Math.trunc(this.w),this}negate(){return this.x=-this.x,this.y=-this.y,this.z=-this.z,this.w=-this.w,this}dot(t){return this.x*t.x+this.y*t.y+this.z*t.z+this.w*t.w}lengthSq(){return this.x*this.x+this.y*this.y+this.z*this.z+this.w*this.w}length(){return Math.sqrt(this.x*this.x+this.y*this.y+this.z*this.z+this.w*this.w)}manhattanLength(){return Math.abs(this.x)+Math.abs(this.y)+Math.abs(this.z)+Math.abs(this.w)}normalize(){return this.divideScalar(this.length()||1)}setLength(t){return this.normalize().multiplyScalar(t)}lerp(t,n){return this.x+=(t.x-this.x)*n,this.y+=(t.y-this.y)*n,this.z+=(t.z-this.z)*n,this.w+=(t.w-this.w)*n,this}lerpVectors(t,n,i){return this.x=t.x+(n.x-t.x)*i,this.y=t.y+(n.y-t.y)*i,this.z=t.z+(n.z-t.z)*i,this.w=t.w+(n.w-t.w)*i,this}equals(t){return t.x===this.x&&t.y===this.y&&t.z===this.z&&t.w===this.w}fromArray(t,n=0){return this.x=t[n],this.y=t[n+1],this.z=t[n+2],this.w=t[n+3],this}toArray(t=[],n=0){return t[n]=this.x,t[n+1]=this.y,t[n+2]=this.z,t[n+3]=this.w,t}fromBufferAttribute(t,n){return this.x=t.getX(n),this.y=t.getY(n),this.z=t.getZ(n),this.w=t.getW(n),this}random(){return this.x=Math.random(),this.y=Math.random(),this.z=Math.random(),this.w=Math.random(),this}*[Symbol.iterator](){yield this.x,yield this.y,yield this.z,yield this.w}};Fx.prototype.isVector4=!0;var cn=Fx,Bd=class extends ja{constructor(t=1,n=1,i={}){super(),i=Object.assign({generateMipmaps:!1,internalFormat:null,minFilter:qn,depthBuffer:!0,stencilBuffer:!1,resolveColorBuffer:!0,resolveDepthBuffer:!0,resolveStencilBuffer:!0,storeMultisampledColorBuffer:!0,storeMultisampledDepthBuffer:!0,storeMultisampledStencilBuffer:!0,depthTexture:null,samples:0,count:1,depth:1,multiview:!1,useArrayDepthTexture:!1},i),this.isRenderTarget=!0,this.width=t,this.height=n,this.depth=i.depth,this.scissor=new cn(0,0,t,n),this.scissorTest=!1,this.viewport=new cn(0,0,t,n),this.textures=[];let a=i.count;for(let r=0;r<a;r++)this.textures[r]=new ui({width:t,height:n,depth:i.depth}),this.textures[r].isRenderTargetTexture=!0,this.textures[r].renderTarget=this;this._setTextureOptions(i),this.depthBuffer=i.depthBuffer,this.stencilBuffer=i.stencilBuffer,this.resolveColorBuffer=i.resolveColorBuffer,this.resolveDepthBuffer=i.resolveDepthBuffer,this.resolveStencilBuffer=i.resolveStencilBuffer,this.storeMultisampledColorBuffer=i.storeMultisampledColorBuffer,this.storeMultisampledDepthBuffer=i.storeMultisampledDepthBuffer,this.storeMultisampledStencilBuffer=i.storeMultisampledStencilBuffer,this._depthTexture=null,this.depthTexture=i.depthTexture,this.samples=i.samples,this.multiview=i.multiview,this.useArrayDepthTexture=i.useArrayDepthTexture}_setTextureOptions(t={}){let n={minFilter:qn,generateMipmaps:!1,flipY:!1,internalFormat:null};t.mapping!==void 0&&(n.mapping=t.mapping),t.wrapS!==void 0&&(n.wrapS=t.wrapS),t.wrapT!==void 0&&(n.wrapT=t.wrapT),t.wrapR!==void 0&&(n.wrapR=t.wrapR),t.magFilter!==void 0&&(n.magFilter=t.magFilter),t.minFilter!==void 0&&(n.minFilter=t.minFilter),t.format!==void 0&&(n.format=t.format),t.type!==void 0&&(n.type=t.type),t.anisotropy!==void 0&&(n.anisotropy=t.anisotropy),t.colorSpace!==void 0&&(n.colorSpace=t.colorSpace),t.flipY!==void 0&&(n.flipY=t.flipY),t.generateMipmaps!==void 0&&(n.generateMipmaps=t.generateMipmaps),t.mipmapsAutoUpdate!==void 0&&(n.mipmapsAutoUpdate=t.mipmapsAutoUpdate),t.internalFormat!==void 0&&(n.internalFormat=t.internalFormat);for(let i=0;i<this.textures.length;i++)this.textures[i].setValues(n)}get texture(){return this.textures[0]}set texture(t){this.textures[0]=t}set depthTexture(t){this._depthTexture!==null&&this._depthTexture.renderTarget===this&&(this._depthTexture.renderTarget=null),t!==null&&t.renderTarget===null&&(t.renderTarget=this),this._depthTexture=t}get depthTexture(){return this._depthTexture}setSize(t,n,i=1){if(this.width!==t||this.height!==n||this.depth!==i){this.width=t,this.height=n,this.depth=i;for(let a=0,r=this.textures.length;a<r;a++)this.textures[a].image.width=t,this.textures[a].image.height=n,this.textures[a].image.depth=i,this.textures[a].isData3DTexture!==!0&&(this.textures[a].isArrayTexture=this.textures[a].image.depth>1);this.dispose()}this.viewport.set(0,0,t,n),this.scissor.set(0,0,t,n)}clone(){return new this.constructor().copy(this)}copy(t){this.width=t.width,this.height=t.height,this.depth=t.depth,this.scissor.copy(t.scissor),this.scissorTest=t.scissorTest,this.viewport.copy(t.viewport),this.textures.length=0;for(let n=0,i=t.textures.length;n<i;n++){this.textures[n]=t.textures[n].clone(),this.textures[n].isRenderTargetTexture=!0,this.textures[n].renderTarget=this;let a=Object.assign({},t.textures[n].image);this.textures[n].source=new Wl(a)}if(this.depthBuffer=t.depthBuffer,this.stencilBuffer=t.stencilBuffer,this.resolveColorBuffer=t.resolveColorBuffer,this.resolveDepthBuffer=t.resolveDepthBuffer,this.resolveStencilBuffer=t.resolveStencilBuffer,this.storeMultisampledColorBuffer=t.storeMultisampledColorBuffer,this.storeMultisampledDepthBuffer=t.storeMultisampledDepthBuffer,this.storeMultisampledStencilBuffer=t.storeMultisampledStencilBuffer,t.depthTexture!==null)if(t.depthTexture.renderTarget===t){let n=t.depthTexture.clone();n.renderTarget=null,this.depthTexture=n}else this.depthTexture=t.depthTexture;else this.depthTexture=null;return this.samples=t.samples,this.multiview=t.multiview,this.useArrayDepthTexture=t.useArrayDepthTexture,this}dispose(){this.dispatchEvent({type:"dispose"})}},Vi=class extends Bd{constructor(t=1,n=1,i={}){super(t,n,i),this.isWebGLRenderTarget=!0}},Uu=class extends ui{constructor(t=null,n=1,i=1,a=1){super(null),this.isDataArrayTexture=!0,this.image={data:t,width:n,height:i,depth:a},this.magFilter=In,this.minFilter=In,this.wrapR=la,this.generateMipmaps=!1,this.flipY=!1,this.unpackAlignment=1,this.layerUpdates=new Set}copy(t){return super.copy(t),this.wrapR=t.wrapR,this}addLayerUpdate(t){this.layerUpdates.add(t)}clearLayerUpdates(){this.layerUpdates.clear()}};var Hd=class extends ui{constructor(t=null,n=1,i=1,a=1){super(null),this.isData3DTexture=!0,this.image={data:t,width:n,height:i,depth:a},this.magFilter=In,this.minFilter=In,this.wrapR=la,this.generateMipmaps=!1,this.flipY=!1,this.unpackAlignment=1}copy(t){return super.copy(t),this.wrapR=t.wrapR,this}};var cp=class cp{constructor(t,n,i,a,r,s,l,o,c,u,p,f,h,g,M,v){this.elements=[1,0,0,0,0,1,0,0,0,0,1,0,0,0,0,1],t!==void 0&&this.set(t,n,i,a,r,s,l,o,c,u,p,f,h,g,M,v)}set(t,n,i,a,r,s,l,o,c,u,p,f,h,g,M,v){let d=this.elements;return d[0]=t,d[4]=n,d[8]=i,d[12]=a,d[1]=r,d[5]=s,d[9]=l,d[13]=o,d[2]=c,d[6]=u,d[10]=p,d[14]=f,d[3]=h,d[7]=g,d[11]=M,d[15]=v,this}identity(){return this.set(1,0,0,0,0,1,0,0,0,0,1,0,0,0,0,1),this}clone(){return new cp().fromArray(this.elements)}copy(t){let n=this.elements,i=t.elements;return n[0]=i[0],n[1]=i[1],n[2]=i[2],n[3]=i[3],n[4]=i[4],n[5]=i[5],n[6]=i[6],n[7]=i[7],n[8]=i[8],n[9]=i[9],n[10]=i[10],n[11]=i[11],n[12]=i[12],n[13]=i[13],n[14]=i[14],n[15]=i[15],this}copyPosition(t){let n=this.elements,i=t.elements;return n[12]=i[12],n[13]=i[13],n[14]=i[14],this}setFromMatrix3(t){let n=t.elements;return this.set(n[0],n[3],n[6],0,n[1],n[4],n[7],0,n[2],n[5],n[8],0,0,0,0,1),this}extractBasis(t,n,i){return this.determinantAffine()===0?(t.set(1,0,0),n.set(0,1,0),i.set(0,0,1),this):(t.setFromMatrixColumn(this,0),n.setFromMatrixColumn(this,1),i.setFromMatrixColumn(this,2),this)}makeBasis(t,n,i){return this.set(t.x,n.x,i.x,0,t.y,n.y,i.y,0,t.z,n.z,i.z,0,0,0,0,1),this}extractRotation(t){if(t.determinantAffine()===0)return this.identity();let n=this.elements,i=t.elements,a=1/Cl.setFromMatrixColumn(t,0).length(),r=1/Cl.setFromMatrixColumn(t,1).length(),s=1/Cl.setFromMatrixColumn(t,2).length();return n[0]=i[0]*a,n[1]=i[1]*a,n[2]=i[2]*a,n[3]=0,n[4]=i[4]*r,n[5]=i[5]*r,n[6]=i[6]*r,n[7]=0,n[8]=i[8]*s,n[9]=i[9]*s,n[10]=i[10]*s,n[11]=0,n[12]=0,n[13]=0,n[14]=0,n[15]=1,this}makeRotationFromEuler(t){let n=this.elements,i=t.x,a=t.y,r=t.z,s=Math.cos(i),l=Math.sin(i),o=Math.cos(a),c=Math.sin(a),u=Math.cos(r),p=Math.sin(r);if(t.order==="XYZ"){let f=s*u,h=s*p,g=l*u,M=l*p;n[0]=o*u,n[4]=-o*p,n[8]=c,n[1]=h+g*c,n[5]=f-M*c,n[9]=-l*o,n[2]=M-f*c,n[6]=g+h*c,n[10]=s*o}else if(t.order==="YXZ"){let f=o*u,h=o*p,g=c*u,M=c*p;n[0]=f+M*l,n[4]=g*l-h,n[8]=s*c,n[1]=s*p,n[5]=s*u,n[9]=-l,n[2]=h*l-g,n[6]=M+f*l,n[10]=s*o}else if(t.order==="ZXY"){let f=o*u,h=o*p,g=c*u,M=c*p;n[0]=f-M*l,n[4]=-s*p,n[8]=g+h*l,n[1]=h+g*l,n[5]=s*u,n[9]=M-f*l,n[2]=-s*c,n[6]=l,n[10]=s*o}else if(t.order==="ZYX"){let f=s*u,h=s*p,g=l*u,M=l*p;n[0]=o*u,n[4]=g*c-h,n[8]=f*c+M,n[1]=o*p,n[5]=M*c+f,n[9]=h*c-g,n[2]=-c,n[6]=l*o,n[10]=s*o}else if(t.order==="YZX"){let f=s*o,h=s*c,g=l*o,M=l*c;n[0]=o*u,n[4]=M-f*p,n[8]=g*p+h,n[1]=p,n[5]=s*u,n[9]=-l*u,n[2]=-c*u,n[6]=h*p+g,n[10]=f-M*p}else if(t.order==="XZY"){let f=s*o,h=s*c,g=l*o,M=l*c;n[0]=o*u,n[4]=-p,n[8]=c*u,n[1]=f*p+M,n[5]=s*u,n[9]=h*p-g,n[2]=g*p-h,n[6]=l*u,n[10]=M*p+f}return n[3]=0,n[7]=0,n[11]=0,n[12]=0,n[13]=0,n[14]=0,n[15]=1,this}makeRotationFromQuaternion(t){return this.compose(bC,t,SC)}lookAt(t,n,i){let a=this.elements;return Hi.subVectors(t,n),Hi.lengthSq()===0&&(Hi.z=1),Hi.normalize(),ms.crossVectors(i,Hi),ms.lengthSq()===0&&(Math.abs(i.z)===1?Hi.x+=1e-4:Hi.z+=1e-4,Hi.normalize(),ms.crossVectors(i,Hi)),ms.normalize(),ad.crossVectors(Hi,ms),a[0]=ms.x,a[4]=ad.x,a[8]=Hi.x,a[1]=ms.y,a[5]=ad.y,a[9]=Hi.y,a[2]=ms.z,a[6]=ad.z,a[10]=Hi.z,this}multiply(t){return this.multiplyMatrices(this,t)}premultiply(t){return this.multiplyMatrices(t,this)}multiplyMatrices(t,n){let i=t.elements,a=n.elements,r=this.elements,s=i[0],l=i[4],o=i[8],c=i[12],u=i[1],p=i[5],f=i[9],h=i[13],g=i[2],M=i[6],v=i[10],d=i[14],x=i[3],b=i[7],y=i[11],w=i[15],T=a[0],m=a[4],S=a[8],C=a[12],D=a[1],R=a[5],Z=a[9],tt=a[13],z=a[2],J=a[6],j=a[10],B=a[14],ot=a[3],k=a[7],Y=a[11],N=a[15];return r[0]=s*T+l*D+o*z+c*ot,r[4]=s*m+l*R+o*J+c*k,r[8]=s*S+l*Z+o*j+c*Y,r[12]=s*C+l*tt+o*B+c*N,r[1]=u*T+p*D+f*z+h*ot,r[5]=u*m+p*R+f*J+h*k,r[9]=u*S+p*Z+f*j+h*Y,r[13]=u*C+p*tt+f*B+h*N,r[2]=g*T+M*D+v*z+d*ot,r[6]=g*m+M*R+v*J+d*k,r[10]=g*S+M*Z+v*j+d*Y,r[14]=g*C+M*tt+v*B+d*N,r[3]=x*T+b*D+y*z+w*ot,r[7]=x*m+b*R+y*J+w*k,r[11]=x*S+b*Z+y*j+w*Y,r[15]=x*C+b*tt+y*B+w*N,this}multiplyScalar(t){let n=this.elements;return n[0]*=t,n[4]*=t,n[8]*=t,n[12]*=t,n[1]*=t,n[5]*=t,n[9]*=t,n[13]*=t,n[2]*=t,n[6]*=t,n[10]*=t,n[14]*=t,n[3]*=t,n[7]*=t,n[11]*=t,n[15]*=t,this}determinant(){let t=this.elements,n=t[0],i=t[4],a=t[8],r=t[12],s=t[1],l=t[5],o=t[9],c=t[13],u=t[2],p=t[6],f=t[10],h=t[14],g=t[3],M=t[7],v=t[11],d=t[15],x=o*h-c*f,b=l*h-c*p,y=l*f-o*p,w=s*h-c*u,T=s*f-o*u,m=s*p-l*u;return n*(M*x-v*b+d*y)-i*(g*x-v*w+d*T)+a*(g*b-M*w+d*m)-r*(g*y-M*T+v*m)}determinantAffine(){let t=this.elements,n=t[0],i=t[4],a=t[8],r=t[1],s=t[5],l=t[9],o=t[2],c=t[6],u=t[10];return n*(s*u-l*c)-i*(r*u-l*o)+a*(r*c-s*o)}transpose(){let t=this.elements,n;return n=t[1],t[1]=t[4],t[4]=n,n=t[2],t[2]=t[8],t[8]=n,n=t[6],t[6]=t[9],t[9]=n,n=t[3],t[3]=t[12],t[12]=n,n=t[7],t[7]=t[13],t[13]=n,n=t[11],t[11]=t[14],t[14]=n,this}setPosition(t,n,i){let a=this.elements;return t.isVector3?(a[12]=t.x,a[13]=t.y,a[14]=t.z):(a[12]=t,a[13]=n,a[14]=i),this}invert(){let t=this.elements,n=t[0],i=t[1],a=t[2],r=t[3],s=t[4],l=t[5],o=t[6],c=t[7],u=t[8],p=t[9],f=t[10],h=t[11],g=t[12],M=t[13],v=t[14],d=t[15],x=n*l-i*s,b=n*o-a*s,y=n*c-r*s,w=i*o-a*l,T=i*c-r*l,m=a*c-r*o,S=u*M-p*g,C=u*v-f*g,D=u*d-h*g,R=p*v-f*M,Z=p*d-h*M,tt=f*d-h*v,z=x*tt-b*Z+y*R+w*D-T*C+m*S;if(z===0)return this.set(0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0);let J=1/z;return t[0]=(l*tt-o*Z+c*R)*J,t[1]=(a*Z-i*tt-r*R)*J,t[2]=(M*m-v*T+d*w)*J,t[3]=(f*T-p*m-h*w)*J,t[4]=(o*D-s*tt-c*C)*J,t[5]=(n*tt-a*D+r*C)*J,t[6]=(v*y-g*m-d*b)*J,t[7]=(u*m-f*y+h*b)*J,t[8]=(s*Z-l*D+c*S)*J,t[9]=(i*D-n*Z-r*S)*J,t[10]=(g*T-M*y+d*x)*J,t[11]=(p*y-u*T-h*x)*J,t[12]=(l*C-s*R-o*S)*J,t[13]=(n*R-i*C+a*S)*J,t[14]=(M*b-g*w-v*x)*J,t[15]=(u*w-p*b+f*x)*J,this}scale(t){let n=this.elements,i=t.x,a=t.y,r=t.z;return n[0]*=i,n[4]*=a,n[8]*=r,n[1]*=i,n[5]*=a,n[9]*=r,n[2]*=i,n[6]*=a,n[10]*=r,n[3]*=i,n[7]*=a,n[11]*=r,this}getMaxScaleOnAxis(){let t=this.elements,n=t[0]*t[0]+t[1]*t[1]+t[2]*t[2],i=t[4]*t[4]+t[5]*t[5]+t[6]*t[6],a=t[8]*t[8]+t[9]*t[9]+t[10]*t[10];return Math.sqrt(Math.max(n,i,a))}makeTranslation(t,n,i){return t.isVector3?this.set(1,0,0,t.x,0,1,0,t.y,0,0,1,t.z,0,0,0,1):this.set(1,0,0,t,0,1,0,n,0,0,1,i,0,0,0,1),this}makeRotationX(t){let n=Math.cos(t),i=Math.sin(t);return this.set(1,0,0,0,0,n,-i,0,0,i,n,0,0,0,0,1),this}makeRotationY(t){let n=Math.cos(t),i=Math.sin(t);return this.set(n,0,i,0,0,1,0,0,-i,0,n,0,0,0,0,1),this}makeRotationZ(t){let n=Math.cos(t),i=Math.sin(t);return this.set(n,-i,0,0,i,n,0,0,0,0,1,0,0,0,0,1),this}makeRotationAxis(t,n){let i=Math.cos(n),a=Math.sin(n),r=1-i,s=t.x,l=t.y,o=t.z,c=r*s,u=r*l;return this.set(c*s+i,c*l-a*o,c*o+a*l,0,c*l+a*o,u*l+i,u*o-a*s,0,c*o-a*l,u*o+a*s,r*o*o+i,0,0,0,0,1),this}makeScale(t,n,i){return this.set(t,0,0,0,0,n,0,0,0,0,i,0,0,0,0,1),this}makeShear(t,n,i,a,r,s){return this.set(1,i,r,0,t,1,s,0,n,a,1,0,0,0,0,1),this}compose(t,n,i){let a=this.elements,r=n._x,s=n._y,l=n._z,o=n._w,c=r+r,u=s+s,p=l+l,f=r*c,h=r*u,g=r*p,M=s*u,v=s*p,d=l*p,x=o*c,b=o*u,y=o*p,w=i.x,T=i.y,m=i.z;return a[0]=(1-(M+d))*w,a[1]=(h+y)*w,a[2]=(g-b)*w,a[3]=0,a[4]=(h-y)*T,a[5]=(1-(f+d))*T,a[6]=(v+x)*T,a[7]=0,a[8]=(g+b)*m,a[9]=(v-x)*m,a[10]=(1-(f+M))*m,a[11]=0,a[12]=t.x,a[13]=t.y,a[14]=t.z,a[15]=1,this}decompose(t,n,i){let a=this.elements;t.x=a[12],t.y=a[13],t.z=a[14];let r=this.determinantAffine();if(r===0)return i.set(1,1,1),n.identity(),this;let s=Cl.set(a[0],a[1],a[2]).length(),l=Cl.set(a[4],a[5],a[6]).length(),o=Cl.set(a[8],a[9],a[10]).length();r<0&&(s=-s),xa.copy(this);let c=1/s,u=1/l,p=1/o;return xa.elements[0]*=c,xa.elements[1]*=c,xa.elements[2]*=c,xa.elements[4]*=u,xa.elements[5]*=u,xa.elements[6]*=u,xa.elements[8]*=p,xa.elements[9]*=p,xa.elements[10]*=p,n.setFromRotationMatrix(xa),i.x=s,i.y=l,i.z=o,this}makePerspective(t,n,i,a,r,s,l=ca,o=!1){let c=this.elements,u=2*r/(n-t),p=2*r/(i-a),f=(n+t)/(n-t),h=(i+a)/(i-a),g,M;if(o)g=r/(s-r),M=s*r/(s-r);else if(l===ca)g=-(s+r)/(s-r),M=-2*s*r/(s-r);else if(l===kl)g=-s/(s-r),M=-s*r/(s-r);else throw new Error("THREE.Matrix4.makePerspective(): Invalid coordinate system: "+l);return c[0]=u,c[4]=0,c[8]=f,c[12]=0,c[1]=0,c[5]=p,c[9]=h,c[13]=0,c[2]=0,c[6]=0,c[10]=g,c[14]=M,c[3]=0,c[7]=0,c[11]=-1,c[15]=0,this}makeOrthographic(t,n,i,a,r,s,l=ca,o=!1){let c=this.elements,u=2/(n-t),p=2/(i-a),f=-(n+t)/(n-t),h=-(i+a)/(i-a),g,M;if(o)g=1/(s-r),M=s/(s-r);else if(l===ca)g=-2/(s-r),M=-(s+r)/(s-r);else if(l===kl)g=-1/(s-r),M=-r/(s-r);else throw new Error("THREE.Matrix4.makeOrthographic(): Invalid coordinate system: "+l);return c[0]=u,c[4]=0,c[8]=0,c[12]=f,c[1]=0,c[5]=p,c[9]=0,c[13]=h,c[2]=0,c[6]=0,c[10]=g,c[14]=M,c[3]=0,c[7]=0,c[11]=0,c[15]=1,this}equals(t){let n=this.elements,i=t.elements;for(let a=0;a<16;a++)if(n[a]!==i[a])return!1;return!0}fromArray(t,n=0){for(let i=0;i<16;i++)this.elements[i]=t[i+n];return this}toArray(t=[],n=0){let i=this.elements;return t[n]=i[0],t[n+1]=i[1],t[n+2]=i[2],t[n+3]=i[3],t[n+4]=i[4],t[n+5]=i[5],t[n+6]=i[6],t[n+7]=i[7],t[n+8]=i[8],t[n+9]=i[9],t[n+10]=i[10],t[n+11]=i[11],t[n+12]=i[12],t[n+13]=i[13],t[n+14]=i[14],t[n+15]=i[15],t}};cp.prototype.isMatrix4=!0;var Ye=cp,Cl=new q,xa=new Ye,bC=new q(0,0,0),SC=new q(1,1,1),ms=new q,ad=new q,Hi=new q,XM=new Ye,WM=new ci,Nr=class e{constructor(t=0,n=0,i=0,a=e.DEFAULT_ORDER){this.isEuler=!0,this._x=t,this._y=n,this._z=i,this._order=a}get x(){return this._x}set x(t){this._x=t,this._onChangeCallback()}get y(){return this._y}set y(t){this._y=t,this._onChangeCallback()}get z(){return this._z}set z(t){this._z=t,this._onChangeCallback()}get order(){return this._order}set order(t){this._order=t,this._onChangeCallback()}set(t,n,i,a=this._order){return this._x=t,this._y=n,this._z=i,this._order=a,this._onChangeCallback(),this}clone(){return new this.constructor(this._x,this._y,this._z,this._order)}copy(t){return this._x=t._x,this._y=t._y,this._z=t._z,this._order=t._order,this._onChangeCallback(),this}setFromRotationMatrix(t,n=this._order,i=!0){let a=t.elements,r=a[0],s=a[4],l=a[8],o=a[1],c=a[5],u=a[9],p=a[2],f=a[6],h=a[10];switch(n){case"XYZ":this._y=Math.asin(Te(l,-1,1)),Math.abs(l)<.9999999?(this._x=Math.atan2(-u,h),this._z=Math.atan2(-s,r)):(this._x=Math.atan2(f,c),this._z=0);break;case"YXZ":this._x=Math.asin(-Te(u,-1,1)),Math.abs(u)<.9999999?(this._y=Math.atan2(l,h),this._z=Math.atan2(o,c)):(this._y=Math.atan2(-p,r),this._z=0);break;case"ZXY":this._x=Math.asin(Te(f,-1,1)),Math.abs(f)<.9999999?(this._y=Math.atan2(-p,h),this._z=Math.atan2(-s,c)):(this._y=0,this._z=Math.atan2(o,r));break;case"ZYX":this._y=Math.asin(-Te(p,-1,1)),Math.abs(p)<.9999999?(this._x=Math.atan2(f,h),this._z=Math.atan2(o,r)):(this._x=0,this._z=Math.atan2(-s,c));break;case"YZX":this._z=Math.asin(Te(o,-1,1)),Math.abs(o)<.9999999?(this._x=Math.atan2(-u,c),this._y=Math.atan2(-p,r)):(this._x=0,this._y=Math.atan2(l,h));break;case"XZY":this._z=Math.asin(-Te(s,-1,1)),Math.abs(s)<.9999999?(this._x=Math.atan2(f,c),this._y=Math.atan2(l,r)):(this._x=Math.atan2(-u,h),this._y=0);break;default:ce("Euler: .setFromRotationMatrix() encountered an unknown order: "+n)}return this._order=n,i===!0&&this._onChangeCallback(),this}setFromQuaternion(t,n,i){return XM.makeRotationFromQuaternion(t),this.setFromRotationMatrix(XM,n,i)}setFromVector3(t,n=this._order){return this.set(t.x,t.y,t.z,n)}reorder(t){return WM.setFromEuler(this),this.setFromQuaternion(WM,t)}equals(t){return t._x===this._x&&t._y===this._y&&t._z===this._z&&t._order===this._order}fromArray(t){return this._x=t[0],this._y=t[1],this._z=t[2],t[3]!==void 0&&(this._order=t[3]),this._onChangeCallback(),this}toArray(t=[],n=0){return t[n]=this._x,t[n+1]=this._y,t[n+2]=this._z,t[n+3]=this._order,t}_onChange(t){return this._onChangeCallback=t,this}_onChangeCallback(){}*[Symbol.iterator](){yield this._x,yield this._y,yield this._z,yield this._order}};Nr.DEFAULT_ORDER="XYZ";var ql=class{constructor(){this.mask=1}set(t){this.mask=(1<<t|0)>>>0}enable(t){this.mask|=1<<t|0}enableAll(){this.mask=-1}toggle(t){this.mask^=1<<t|0}disable(t){this.mask&=~(1<<t|0)}disableAll(){this.mask=0}test(t){return(this.mask&t.mask)!==0}isEnabled(t){return(this.mask&(1<<t|0))!==0}},MC=0,qM=new q,Dl=new ci,Er=new Ye,rd=new q,Su=new q,EC=new q,TC=new ci,YM=new q(1,0,0),ZM=new q(0,1,0),JM=new q(0,0,1),KM={type:"added"},wC={type:"removed"},Nl={type:"childadded",child:null},wv={type:"childremoved",child:null},fi=class e extends ja{constructor(){super(),this.isObject3D=!0,Object.defineProperty(this,"id",{value:MC++}),this.uuid=fc(),this.name="",this.type="Object3D",this.parent=null,this.children=[],this.up=e.DEFAULT_UP.clone();let t=new q,n=new Nr,i=new ci,a=new q(1,1,1);function r(){i.setFromEuler(n,!1)}function s(){n.setFromQuaternion(i,void 0,!1)}n._onChange(r),i._onChange(s),Object.defineProperties(this,{position:{configurable:!0,enumerable:!0,value:t},rotation:{configurable:!0,enumerable:!0,value:n},quaternion:{configurable:!0,enumerable:!0,value:i},scale:{configurable:!0,enumerable:!0,value:a},modelViewMatrix:{value:new Ye},normalMatrix:{value:new de}}),this.matrix=new Ye,this.matrixWorld=new Ye,this.matrixAutoUpdate=e.DEFAULT_MATRIX_AUTO_UPDATE,this.matrixWorldAutoUpdate=e.DEFAULT_MATRIX_WORLD_AUTO_UPDATE,this.matrixWorldNeedsUpdate=!1,this.layers=new ql,this.visible=!0,this.castShadow=!1,this.receiveShadow=!1,this.frustumCulled=!0,this.renderOrder=0,this.animations=[],this.customDepthMaterial=void 0,this.customDistanceMaterial=void 0,this.static=!1,this.userData={},this.pivot=null}onBeforeShadow(){}onAfterShadow(){}onBeforeRender(){}onAfterRender(){}applyMatrix4(t){this.matrixAutoUpdate&&this.updateMatrix(),this.matrix.premultiply(t),this.matrix.decompose(this.position,this.quaternion,this.scale),this.pivot!==null&&this.position.copy(this.pivot).applyMatrix4(this.matrix).sub(this.pivot)}applyQuaternion(t){return this.quaternion.premultiply(t),this}setRotationFromAxisAngle(t,n){this.quaternion.setFromAxisAngle(t,n)}setRotationFromEuler(t){this.quaternion.setFromEuler(t,!0)}setRotationFromMatrix(t){this.quaternion.setFromRotationMatrix(t)}setRotationFromQuaternion(t){this.quaternion.copy(t)}rotateOnAxis(t,n){return Dl.setFromAxisAngle(t,n),this.quaternion.multiply(Dl),this}rotateOnWorldAxis(t,n){return Dl.setFromAxisAngle(t,n),this.quaternion.premultiply(Dl),this}rotateX(t){return this.rotateOnAxis(YM,t)}rotateY(t){return this.rotateOnAxis(ZM,t)}rotateZ(t){return this.rotateOnAxis(JM,t)}translateOnAxis(t,n){return qM.copy(t).applyQuaternion(this.quaternion),this.position.add(qM.multiplyScalar(n)),this}translateX(t){return this.translateOnAxis(YM,t)}translateY(t){return this.translateOnAxis(ZM,t)}translateZ(t){return this.translateOnAxis(JM,t)}localToWorld(t){return this.updateWorldMatrix(!0,!1),t.applyMatrix4(this.matrixWorld)}worldToLocal(t){return this.updateWorldMatrix(!0,!1),t.applyMatrix4(Er.copy(this.matrixWorld).invert())}lookAt(t,n,i){t.isVector3?rd.copy(t):rd.set(t,n,i);let a=this.parent;this.updateWorldMatrix(!0,!1),Su.setFromMatrixPosition(this.matrixWorld),this.isCamera||this.isLight?Er.lookAt(Su,rd,this.up):Er.lookAt(rd,Su,this.up),this.quaternion.setFromRotationMatrix(Er),a&&(Er.extractRotation(a.matrixWorld),Dl.setFromRotationMatrix(Er),this.quaternion.premultiply(Dl.invert()))}add(t){if(arguments.length>1){for(let n=0;n<arguments.length;n++)this.add(arguments[n]);return this}return t===this?(ue("Object3D.add: object can't be added as a child of itself.",t),this):(t&&t.isObject3D?(t.removeFromParent(),t.parent=this,this.children.push(t),t.dispatchEvent(KM),Nl.child=t,this.dispatchEvent(Nl),Nl.child=null):ue("Object3D.add: object not an instance of THREE.Object3D.",t),this)}remove(t){if(arguments.length>1){for(let i=0;i<arguments.length;i++)this.remove(arguments[i]);return this}let n=this.children.indexOf(t);return n!==-1&&(t.parent=null,this.children.splice(n,1),t.dispatchEvent(wC),wv.child=t,this.dispatchEvent(wv),wv.child=null),this}removeFromParent(){let t=this.parent;return t!==null&&t.remove(this),this}clear(){return this.remove(...this.children)}attach(t){return this.updateWorldMatrix(!0,!1),Er.copy(this.matrixWorld).invert(),t.parent!==null&&(t.parent.updateWorldMatrix(!0,!1),Er.multiply(t.parent.matrixWorld)),t.applyMatrix4(Er),t.removeFromParent(),t.parent=this,this.children.push(t),t.updateWorldMatrix(!1,!0),t.dispatchEvent(KM),Nl.child=t,this.dispatchEvent(Nl),Nl.child=null,this}getObjectById(t){return this.getObjectByProperty("id",t)}getObjectByName(t){return this.getObjectByProperty("name",t)}getObjectByProperty(t,n){if(this[t]===n)return this;for(let i=0,a=this.children.length;i<a;i++){let s=this.children[i].getObjectByProperty(t,n);if(s!==void 0)return s}}getObjectsByProperty(t,n,i=[]){this[t]===n&&i.push(this);let a=this.children;for(let r=0,s=a.length;r<s;r++)a[r].getObjectsByProperty(t,n,i);return i}getWorldPosition(t){return this.updateWorldMatrix(!0,!1),t.setFromMatrixPosition(this.matrixWorld)}getWorldQuaternion(t){return this.updateWorldMatrix(!0,!1),this.matrixWorld.decompose(Su,t,EC),t}getWorldScale(t){return this.updateWorldMatrix(!0,!1),this.matrixWorld.decompose(Su,TC,t),t}getWorldDirection(t){this.updateWorldMatrix(!0,!1);let n=this.matrixWorld.elements;return t.set(n[8],n[9],n[10]).normalize()}raycast(){}intersectsFrustum(){return!0}traverse(t){t(this);let n=this.children;for(let i=0,a=n.length;i<a;i++)n[i].traverse(t)}traverseVisible(t){if(this.visible===!1)return;t(this);let n=this.children;for(let i=0,a=n.length;i<a;i++)n[i].traverseVisible(t)}traverseAncestors(t){let n=this.parent;n!==null&&(t(n),n.traverseAncestors(t))}updateMatrix(){this.matrix.compose(this.position,this.quaternion,this.scale);let t=this.pivot;if(t!==null){let n=t.x,i=t.y,a=t.z,r=this.matrix.elements;r[12]+=n-r[0]*n-r[4]*i-r[8]*a,r[13]+=i-r[1]*n-r[5]*i-r[9]*a,r[14]+=a-r[2]*n-r[6]*i-r[10]*a}this.matrixWorldNeedsUpdate=!0}updateMatrixWorld(t){this.matrixAutoUpdate&&this.updateMatrix(),(this.matrixWorldNeedsUpdate||t)&&(this.matrixWorldAutoUpdate===!0&&(this.parent===null?this.matrixWorld.copy(this.matrix):this.matrixWorld.multiplyMatrices(this.parent.matrixWorld,this.matrix)),this.matrixWorldNeedsUpdate=!1,t=!0);let n=this.children;for(let i=0,a=n.length;i<a;i++)n[i].updateMatrixWorld(t)}updateWorldMatrix(t,n,i=!1){let a=this.parent;if(t===!0&&a!==null&&a.updateWorldMatrix(!0,!1),this.matrixAutoUpdate&&this.updateMatrix(),(this.matrixWorldNeedsUpdate||i)&&(this.matrixWorldAutoUpdate===!0&&(this.parent===null?this.matrixWorld.copy(this.matrix):this.matrixWorld.multiplyMatrices(this.parent.matrixWorld,this.matrix)),this.matrixWorldNeedsUpdate=!1,i=!0),n===!0){let r=this.children;for(let s=0,l=r.length;s<l;s++)r[s].updateWorldMatrix(!1,!0,i)}}toJSON(t){let n=t===void 0||typeof t=="string",i={};n&&(t={geometries:{},materials:{},textures:{},images:{},shapes:{},skeletons:{},animations:{},nodes:{}},i.metadata={version:4.7,type:"Object",generator:"Object3D.toJSON"});let a={};a.uuid=this.uuid,a.type=this.type,a.name=this.name,a.castShadow=this.castShadow,a.receiveShadow=this.receiveShadow,a.visible=this.visible,a.frustumCulled=this.frustumCulled,a.renderOrder=this.renderOrder,a.static=this.static,a.matrixAutoUpdate=this.matrixAutoUpdate,Object.keys(this.userData).length>0&&(a.userData=this.userData),a.layers=this.layers.mask,a.matrix=this.matrix.toArray(),a.up=this.up.toArray(),this.pivot!==null&&(a.pivot=this.pivot.toArray()),this.morphTargetDictionary!==void 0&&(a.morphTargetDictionary=Object.assign({},this.morphTargetDictionary)),this.morphTargetInfluences!==void 0&&(a.morphTargetInfluences=this.morphTargetInfluences.slice()),this.isInstancedMesh&&(a.type="InstancedMesh",a.count=this.count,a.instanceMatrix=this.instanceMatrix.toJSON(),this.instanceColor!==null&&(a.instanceColor=this.instanceColor.toJSON())),this.isBatchedMesh&&(a.type="BatchedMesh",a.perObjectFrustumCulled=this.perObjectFrustumCulled,a.sortObjects=this.sortObjects,a.drawRanges=this._drawRanges,a.reservedRanges=this._reservedRanges,a.geometryInfo=this._geometryInfo.map(l=>({...l,boundingBox:l.boundingBox?l.boundingBox.toJSON():void 0,boundingSphere:l.boundingSphere?l.boundingSphere.toJSON():void 0})),a.instanceInfo=this._instanceInfo.map(l=>({...l})),a.availableInstanceIds=this._availableInstanceIds.slice(),a.availableGeometryIds=this._availableGeometryIds.slice(),a.nextIndexStart=this._nextIndexStart,a.nextVertexStart=this._nextVertexStart,a.geometryCount=this._geometryCount,a.maxInstanceCount=this._maxInstanceCount,a.maxVertexCount=this._maxVertexCount,a.maxIndexCount=this._maxIndexCount,a.geometryInitialized=this._geometryInitialized,a.matricesTexture=this._matricesTexture.toJSON(t),a.indirectTexture=this._indirectTexture.toJSON(t),this._colorsTexture!==null&&(a.colorsTexture=this._colorsTexture.toJSON(t)),this.boundingSphere!==null&&(a.boundingSphere=this.boundingSphere.toJSON()),this.boundingBox!==null&&(a.boundingBox=this.boundingBox.toJSON()));function r(l,o){return l[o.uuid]===void 0&&(l[o.uuid]=o.toJSON(t)),o.uuid}if(this.isScene)this.background&&(this.background.isColor?a.background=this.background.toJSON():this.background.isTexture&&(a.background=this.background.toJSON(t).uuid)),this.environment&&this.environment.isTexture&&this.environment.isRenderTargetTexture!==!0&&(a.environment=this.environment.toJSON(t).uuid);else if(this.isMesh||this.isLine||this.isPoints){a.geometry=r(t.geometries,this.geometry);let l=this.geometry.parameters;if(l!==void 0&&l.shapes!==void 0){let o=l.shapes;if(Array.isArray(o))for(let c=0,u=o.length;c<u;c++){let p=o[c];r(t.shapes,p)}else r(t.shapes,o)}}if(this.isSkinnedMesh&&(a.bindMode=this.bindMode,a.bindMatrix=this.bindMatrix.toArray(),this.skeleton!==void 0&&(r(t.skeletons,this.skeleton),a.skeleton=this.skeleton.uuid)),this.material!==void 0)if(Array.isArray(this.material)){let l=[];for(let o=0,c=this.material.length;o<c;o++)l.push(r(t.materials,this.material[o]));a.material=l}else a.material=r(t.materials,this.material);if(this.children.length>0){a.children=[];for(let l=0;l<this.children.length;l++)a.children.push(this.children[l].toJSON(t).object)}if(this.animations.length>0){a.animations=[];for(let l=0;l<this.animations.length;l++){let o=this.animations[l];a.animations.push(r(t.animations,o))}}if(n){let l=s(t.geometries),o=s(t.materials),c=s(t.textures),u=s(t.images),p=s(t.shapes),f=s(t.skeletons),h=s(t.animations),g=s(t.nodes);l.length>0&&(i.geometries=l),o.length>0&&(i.materials=o),c.length>0&&(i.textures=c),u.length>0&&(i.images=u),p.length>0&&(i.shapes=p),f.length>0&&(i.skeletons=f),h.length>0&&(i.animations=h),g.length>0&&(i.nodes=g)}return i.object=a,i;function s(l){let o=[];for(let c in l){let u=l[c];delete u.metadata,o.push(u)}return o}}clone(t){return new this.constructor().copy(this,t)}copy(t,n=!0){if(this.name=t.name,this.up.copy(t.up),this.position.copy(t.position),this.rotation.order=t.rotation.order,this.quaternion.copy(t.quaternion),this.scale.copy(t.scale),this.pivot=t.pivot!==null?t.pivot.clone():null,this.matrix.copy(t.matrix),this.matrixWorld.copy(t.matrixWorld),this.matrixAutoUpdate=t.matrixAutoUpdate,this.matrixWorldAutoUpdate=t.matrixWorldAutoUpdate,this.matrixWorldNeedsUpdate=t.matrixWorldNeedsUpdate,this.layers.mask=t.layers.mask,this.visible=t.visible,this.castShadow=t.castShadow,this.receiveShadow=t.receiveShadow,this.frustumCulled=t.frustumCulled,this.renderOrder=t.renderOrder,this.static=t.static,this.animations=t.animations.slice(),this.userData=JSON.parse(JSON.stringify(t.userData)),n===!0)for(let i=0;i<t.children.length;i++){let a=t.children[i];this.add(a.clone())}return this}dispose(){this.dispatchEvent({type:"dispose"})}};fi.DEFAULT_UP=new q(0,1,0);fi.DEFAULT_MATRIX_AUTO_UPDATE=!0;fi.DEFAULT_MATRIX_WORLD_AUTO_UPDATE=!0;var Za=class extends fi{constructor(){super(),this.isGroup=!0,this.type="Group"}},AC={type:"move"},Yl=class{constructor(){this._targetRay=null,this._grip=null,this._hand=null}getHandSpace(){return this._hand===null&&(this._hand=new Za,this._hand.matrixAutoUpdate=!1,this._hand.visible=!1,this._hand.joints={},this._hand.inputState={pinching:!1}),this._hand}getTargetRaySpace(){return this._targetRay===null&&(this._targetRay=new Za,this._targetRay.matrixAutoUpdate=!1,this._targetRay.visible=!1,this._targetRay.hasLinearVelocity=!1,this._targetRay.linearVelocity=new q,this._targetRay.hasAngularVelocity=!1,this._targetRay.angularVelocity=new q),this._targetRay}getGripSpace(){return this._grip===null&&(this._grip=new Za,this._grip.matrixAutoUpdate=!1,this._grip.visible=!1,this._grip.hasLinearVelocity=!1,this._grip.linearVelocity=new q,this._grip.hasAngularVelocity=!1,this._grip.angularVelocity=new q,this._grip.eventsEnabled=!1),this._grip}dispatchEvent(t){return this._targetRay!==null&&this._targetRay.dispatchEvent(t),this._grip!==null&&this._grip.dispatchEvent(t),this._hand!==null&&this._hand.dispatchEvent(t),this}connect(t){if(t&&t.hand){let n=this._hand;if(n)for(let i of t.hand.values())this._getHandJoint(n,i)}return this.dispatchEvent({type:"connected",data:t}),this}disconnect(t){return this.dispatchEvent({type:"disconnected",data:t}),this._targetRay!==null&&(this._targetRay.visible=!1),this._grip!==null&&(this._grip.visible=!1),this._hand!==null&&(this._hand.visible=!1),this}update(t,n,i){let a=null,r=null,s=null,l=this._targetRay,o=this._grip,c=this._hand;if(t&&n.session.visibilityState!=="visible-blurred"){if(c&&t.hand){s=!0;for(let M of t.hand.values()){let v=n.getJointPose(M,i),d=this._getHandJoint(c,M);v!==null&&(d.matrix.fromArray(v.transform.matrix),d.matrix.decompose(d.position,d.quaternion,d.scale),d.matrixWorldNeedsUpdate=!0,d.jointRadius=v.radius),d.visible=v!==null}let u=c.joints["index-finger-tip"],p=c.joints["thumb-tip"],f=u.position.distanceTo(p.position),h=.02,g=.005;c.inputState.pinching&&f>h+g?(c.inputState.pinching=!1,this.dispatchEvent({type:"pinchend",handedness:t.handedness,target:this})):!c.inputState.pinching&&f<=h-g&&(c.inputState.pinching=!0,this.dispatchEvent({type:"pinchstart",handedness:t.handedness,target:this}))}else o!==null&&t.gripSpace&&(r=n.getPose(t.gripSpace,i),r!==null&&(o.matrix.fromArray(r.transform.matrix),o.matrix.decompose(o.position,o.quaternion,o.scale),o.matrixWorldNeedsUpdate=!0,r.linearVelocity?(o.hasLinearVelocity=!0,o.linearVelocity.copy(r.linearVelocity)):o.hasLinearVelocity=!1,r.angularVelocity?(o.hasAngularVelocity=!0,o.angularVelocity.copy(r.angularVelocity)):o.hasAngularVelocity=!1,o.eventsEnabled&&o.dispatchEvent({type:"gripUpdated",data:t,target:this})));l!==null&&(a=n.getPose(t.targetRaySpace,i),a===null&&r!==null&&(a=r),a!==null&&(l.matrix.fromArray(a.transform.matrix),l.matrix.decompose(l.position,l.quaternion,l.scale),l.matrixWorldNeedsUpdate=!0,a.linearVelocity?(l.hasLinearVelocity=!0,l.linearVelocity.copy(a.linearVelocity)):l.hasLinearVelocity=!1,a.angularVelocity?(l.hasAngularVelocity=!0,l.angularVelocity.copy(a.angularVelocity)):l.hasAngularVelocity=!1,this.dispatchEvent(AC)))}return l!==null&&(l.visible=a!==null),o!==null&&(o.visible=r!==null),c!==null&&(c.visible=s!==null),this}_getHandJoint(t,n){if(t.joints[n.jointName]===void 0){let i=new Za;i.matrixAutoUpdate=!1,i.visible=!1,t.joints[n.jointName]=i,t.add(i)}return t.joints[n.jointName]}},eT={aliceblue:15792383,antiquewhite:16444375,aqua:65535,aquamarine:8388564,azure:15794175,beige:16119260,bisque:16770244,black:0,blanchedalmond:16772045,blue:255,blueviolet:9055202,brown:10824234,burlywood:14596231,cadetblue:6266528,chartreuse:8388352,chocolate:13789470,coral:16744272,cornflowerblue:6591981,cornsilk:16775388,crimson:14423100,cyan:65535,darkblue:139,darkcyan:35723,darkgoldenrod:12092939,darkgray:11119017,darkgreen:25600,darkgrey:11119017,darkkhaki:12433259,darkmagenta:9109643,darkolivegreen:5597999,darkorange:16747520,darkorchid:10040012,darkred:9109504,darksalmon:15308410,darkseagreen:9419919,darkslateblue:4734347,darkslategray:3100495,darkslategrey:3100495,darkturquoise:52945,darkviolet:9699539,deeppink:16716947,deepskyblue:49151,dimgray:6908265,dimgrey:6908265,dodgerblue:2003199,firebrick:11674146,floralwhite:16775920,forestgreen:2263842,fuchsia:16711935,gainsboro:14474460,ghostwhite:16316671,gold:16766720,goldenrod:14329120,gray:8421504,green:32768,greenyellow:11403055,grey:8421504,honeydew:15794160,hotpink:16738740,indianred:13458524,indigo:4915330,ivory:16777200,khaki:15787660,lavender:15132410,lavenderblush:16773365,lawngreen:8190976,lemonchiffon:16775885,lightblue:11393254,lightcoral:15761536,lightcyan:14745599,lightgoldenrodyellow:16448210,lightgray:13882323,lightgreen:9498256,lightgrey:13882323,lightpink:16758465,lightsalmon:16752762,lightseagreen:2142890,lightskyblue:8900346,lightslategray:7833753,lightslategrey:7833753,lightsteelblue:11584734,lightyellow:16777184,lime:65280,limegreen:3329330,linen:16445670,magenta:16711935,maroon:8388608,mediumaquamarine:6737322,mediumblue:205,mediumorchid:12211667,mediumpurple:9662683,mediumseagreen:3978097,mediumslateblue:8087790,mediumspringgreen:64154,mediumturquoise:4772300,mediumvioletred:13047173,midnightblue:1644912,mintcream:16121850,mistyrose:16770273,moccasin:16770229,navajowhite:16768685,navy:128,oldlace:16643558,olive:8421376,olivedrab:7048739,orange:16753920,orangered:16729344,orchid:14315734,palegoldenrod:15657130,palegreen:10025880,paleturquoise:11529966,palevioletred:14381203,papayawhip:16773077,peachpuff:16767673,peru:13468991,pink:16761035,plum:14524637,powderblue:11591910,purple:8388736,rebeccapurple:6697881,red:16711680,rosybrown:12357519,royalblue:4286945,saddlebrown:9127187,salmon:16416882,sandybrown:16032864,seagreen:3050327,seashell:16774638,sienna:10506797,silver:12632256,skyblue:8900331,slateblue:6970061,slategray:7372944,slategrey:7372944,snow:16775930,springgreen:65407,steelblue:4620980,tan:13808780,teal:32896,thistle:14204888,tomato:16737095,turquoise:4251856,violet:15631086,wheat:16113331,white:16777215,whitesmoke:16119285,yellow:16776960,yellowgreen:10145074},gs={h:0,s:0,l:0},sd={h:0,s:0,l:0};function Av(e,t,n){return n<0&&(n+=1),n>1&&(n-=1),n<1/6?e+(t-e)*6*n:n<1/2?t:n<2/3?e+(t-e)*6*(2/3-n):e}var me=class{constructor(t,n,i){return this.isColor=!0,this.r=1,this.g=1,this.b=1,this.set(t,n,i)}set(t,n,i){if(n===void 0&&i===void 0){let a=t;a&&a.isColor?this.copy(a):typeof a=="number"?this.setHex(a):typeof a=="string"&&this.setStyle(a)}else this.setRGB(t,n,i);return this}setScalar(t){return this.r=t,this.g=t,this.b=t,this}setHex(t,n=Wn){return t=Math.floor(t),this.r=(t>>16&255)/255,this.g=(t>>8&255)/255,this.b=(t&255)/255,Ne.colorSpaceToWorking(this,n),this}setRGB(t,n,i,a=Ne.workingColorSpace){return this.r=t,this.g=n,this.b=i,Ne.colorSpaceToWorking(this,a),this}setHSL(t,n,i,a=Ne.workingColorSpace){if(t=mC(t,1),n=Te(n,0,1),i=Te(i,0,1),n===0)this.r=this.g=this.b=i;else{let r=i<=.5?i*(1+n):i+n-i*n,s=2*i-r;this.r=Av(s,r,t+1/3),this.g=Av(s,r,t),this.b=Av(s,r,t-1/3)}return Ne.colorSpaceToWorking(this,a),this}setStyle(t,n=Wn){function i(r){r!==void 0&&parseFloat(r)<1&&ce("Color: Alpha component of "+t+" will be ignored.")}let a;if(a=/^(\w+)\(([^\)]*)\)/.exec(t)){let r,s=a[1],l=a[2];switch(s){case"rgb":case"rgba":if(r=/^\s*(\d+)\s*,\s*(\d+)\s*,\s*(\d+)\s*(?:,\s*(\d+(?:\.\d+)?|\.\d+)\s*)?$/.exec(l))return i(r[4]),this.setRGB(Math.min(255,parseInt(r[1],10))/255,Math.min(255,parseInt(r[2],10))/255,Math.min(255,parseInt(r[3],10))/255,n);if(r=/^\s*(\d+(?:\.\d+)?|\.\d+)\%\s*,\s*(\d+(?:\.\d+)?|\.\d+)\%\s*,\s*(\d+(?:\.\d+)?|\.\d+)\%\s*(?:,\s*(\d+(?:\.\d+)?|\.\d+)\s*)?$/.exec(l))return i(r[4]),this.setRGB(Math.min(100,parseFloat(r[1]))/100,Math.min(100,parseFloat(r[2]))/100,Math.min(100,parseFloat(r[3]))/100,n);break;case"hsl":case"hsla":if(r=/^\s*([+-]?(?:\d+(?:\.\d+)?|\.\d+))\s*,\s*(\d+(?:\.\d+)?|\.\d+)\%\s*,\s*(\d+(?:\.\d+)?|\.\d+)\%\s*(?:,\s*(\d+(?:\.\d+)?|\.\d+)\s*)?$/.exec(l))return i(r[4]),this.setHSL(parseFloat(r[1])/360,parseFloat(r[2])/100,parseFloat(r[3])/100,n);break;default:ce("Color: Unknown color model "+t)}}else if(a=/^\#([A-Fa-f\d]+)$/.exec(t)){let r=a[1],s=r.length;if(s===3)return this.setRGB(parseInt(r.charAt(0),16)/15,parseInt(r.charAt(1),16)/15,parseInt(r.charAt(2),16)/15,n);if(s===6)return this.setHex(parseInt(r,16),n);ce("Color: Invalid hex color "+t)}else if(t&&t.length>0)return this.setColorName(t,n);return this}setColorName(t,n=Wn){let i=eT[t.toLowerCase()];return i!==void 0?this.setHex(i,n):ce("Color: Unknown color "+t),this}clone(){return new this.constructor(this.r,this.g,this.b)}copy(t){return this.r=t.r,this.g=t.g,this.b=t.b,this}copySRGBToLinear(t){return this.r=Cr(t.r),this.g=Cr(t.g),this.b=Cr(t.b),this}copyLinearToSRGB(t){return this.r=Gl(t.r),this.g=Gl(t.g),this.b=Gl(t.b),this}convertSRGBToLinear(){return this.copySRGBToLinear(this),this}convertLinearToSRGB(){return this.copyLinearToSRGB(this),this}getHex(t=Wn){return Ne.workingToColorSpace(Qn.copy(this),t),Math.round(Te(Qn.r*255,0,255))*65536+Math.round(Te(Qn.g*255,0,255))*256+Math.round(Te(Qn.b*255,0,255))}getHexString(t=Wn){return("000000"+this.getHex(t).toString(16)).slice(-6)}getHSL(t,n=Ne.workingColorSpace){Ne.workingToColorSpace(Qn.copy(this),n);let i=Qn.r,a=Qn.g,r=Qn.b,s=Math.max(i,a,r),l=Math.min(i,a,r),o,c,u=(l+s)/2;if(l===s)o=0,c=0;else{let p=s-l;switch(c=u<=.5?p/(s+l):p/(2-s-l),s){case i:o=(a-r)/p+(a<r?6:0);break;case a:o=(r-i)/p+2;break;case r:o=(i-a)/p+4;break}o/=6}return t.h=o,t.s=c,t.l=u,t}getRGB(t,n=Ne.workingColorSpace){return Ne.workingToColorSpace(Qn.copy(this),n),t.r=Qn.r,t.g=Qn.g,t.b=Qn.b,t}getStyle(t=Wn){Ne.workingToColorSpace(Qn.copy(this),t);let n=Qn.r,i=Qn.g,a=Qn.b;return t!==Wn?`color(${t} ${n.toFixed(3)} ${i.toFixed(3)} ${a.toFixed(3)})`:`rgb(${Math.round(n*255)},${Math.round(i*255)},${Math.round(a*255)})`}offsetHSL(t,n,i){return this.getHSL(gs),this.setHSL(gs.h+t,gs.s+n,gs.l+i)}add(t){return this.r+=t.r,this.g+=t.g,this.b+=t.b,this}addColors(t,n){return this.r=t.r+n.r,this.g=t.g+n.g,this.b=t.b+n.b,this}addScalar(t){return this.r+=t,this.g+=t,this.b+=t,this}sub(t){return this.r=Math.max(0,this.r-t.r),this.g=Math.max(0,this.g-t.g),this.b=Math.max(0,this.b-t.b),this}multiply(t){return this.r*=t.r,this.g*=t.g,this.b*=t.b,this}multiplyScalar(t){return this.r*=t,this.g*=t,this.b*=t,this}lerp(t,n){return this.r+=(t.r-this.r)*n,this.g+=(t.g-this.g)*n,this.b+=(t.b-this.b)*n,this}lerpColors(t,n,i){return this.r=t.r+(n.r-t.r)*i,this.g=t.g+(n.g-t.g)*i,this.b=t.b+(n.b-t.b)*i,this}lerpHSL(t,n){this.getHSL(gs),t.getHSL(sd);let i=bv(gs.h,sd.h,n),a=bv(gs.s,sd.s,n),r=bv(gs.l,sd.l,n);return this.setHSL(i,a,r),this}setFromVector3(t){return this.r=t.x,this.g=t.y,this.b=t.z,this}applyMatrix3(t){let n=this.r,i=this.g,a=this.b,r=t.elements;return this.r=r[0]*n+r[3]*i+r[6]*a,this.g=r[1]*n+r[4]*i+r[7]*a,this.b=r[2]*n+r[5]*i+r[8]*a,this}equals(t){return t.r===this.r&&t.g===this.g&&t.b===this.b}fromArray(t,n=0){return this.r=t[n],this.g=t[n+1],this.b=t[n+2],this}toArray(t=[],n=0){return t[n]=this.r,t[n+1]=this.g,t[n+2]=this.b,t}fromBufferAttribute(t,n){return this.r=t.getX(n),this.g=t.getY(n),this.b=t.getZ(n),this}toJSON(){return this.getHex()}*[Symbol.iterator](){yield this.r,yield this.g,yield this.b}},Qn=new me;me.NAMES=eT;var Zl=class extends fi{constructor(){super(),this.isScene=!0,this.type="Scene",this.background=null,this.environment=null,this.fog=null,this.backgroundBlurriness=0,this.backgroundIntensity=1,this.backgroundRotation=new Nr,this.environmentIntensity=1,this.environmentRotation=new Nr,this.overrideMaterial=null,typeof __THREE_DEVTOOLS__<"u"&&__THREE_DEVTOOLS__.dispatchEvent(new CustomEvent("observe",{detail:this}))}copy(t,n){return super.copy(t,n),this.background=t.background!==null?t.background.clone():null,this.environment=t.environment!==null?t.environment.clone():null,this.fog=t.fog!==null?t.fog.clone():null,this.backgroundBlurriness=t.backgroundBlurriness,this.backgroundIntensity=t.backgroundIntensity,this.backgroundRotation.copy(t.backgroundRotation),this.environmentIntensity=t.environmentIntensity,this.environmentRotation.copy(t.environmentRotation),this.overrideMaterial=t.overrideMaterial!==null?t.overrideMaterial.clone():null,this.matrixAutoUpdate=t.matrixAutoUpdate,this}toJSON(t){let n=super.toJSON(t);return this.fog!==null&&(n.object.fog=this.fog.toJSON()),n.object.backgroundBlurriness=this.backgroundBlurriness,n.object.backgroundIntensity=this.backgroundIntensity,n.object.backgroundRotation=this.backgroundRotation.toArray(),n.object.environmentIntensity=this.environmentIntensity,n.object.environmentRotation=this.environmentRotation.toArray(),n}},ya=new q,Tr=new q,Rv=new q,wr=new q,Ll=new q,Ul=new q,jM=new q,Cv=new q,Dv=new q,Nv=new q,Lv=new cn,Uv=new cn,Iv=new cn,_s=class e{constructor(t=new q,n=new q,i=new q){this.a=t,this.b=n,this.c=i}static getNormal(t,n,i,a){a.subVectors(i,n),ya.subVectors(t,n),a.cross(ya);let r=a.lengthSq();return r>0?a.multiplyScalar(1/Math.sqrt(r)):a.set(0,0,0)}static getBarycoord(t,n,i,a,r){ya.subVectors(a,n),Tr.subVectors(i,n),Rv.subVectors(t,n);let s=ya.dot(ya),l=ya.dot(Tr),o=ya.dot(Rv),c=Tr.dot(Tr),u=Tr.dot(Rv),p=s*c-l*l;if(p===0)return r.set(0,0,0),null;let f=1/p,h=(c*o-l*u)*f,g=(s*u-l*o)*f;return r.set(1-h-g,g,h)}static containsPoint(t,n,i,a){return this.getBarycoord(t,n,i,a,wr)===null?!1:wr.x>=0&&wr.y>=0&&wr.x+wr.y<=1}static getInterpolation(t,n,i,a,r,s,l,o){return this.getBarycoord(t,n,i,a,wr)===null?(o.x=0,o.y=0,"z"in o&&(o.z=0),"w"in o&&(o.w=0),null):(o.setScalar(0),o.addScaledVector(r,wr.x),o.addScaledVector(s,wr.y),o.addScaledVector(l,wr.z),o)}static getInterpolatedAttribute(t,n,i,a,r,s){return Lv.setScalar(0),Uv.setScalar(0),Iv.setScalar(0),Lv.fromBufferAttribute(t,n),Uv.fromBufferAttribute(t,i),Iv.fromBufferAttribute(t,a),s.setScalar(0),s.addScaledVector(Lv,r.x),s.addScaledVector(Uv,r.y),s.addScaledVector(Iv,r.z),s}static isFrontFacing(t,n,i,a){return ya.subVectors(i,n),Tr.subVectors(t,n),ya.cross(Tr).dot(a)<0}set(t,n,i){return this.a.copy(t),this.b.copy(n),this.c.copy(i),this}setFromPointsAndIndices(t,n,i,a){return this.a.copy(t[n]),this.b.copy(t[i]),this.c.copy(t[a]),this}setFromAttributeAndIndices(t,n,i,a){return this.a.fromBufferAttribute(t,n),this.b.fromBufferAttribute(t,i),this.c.fromBufferAttribute(t,a),this}clone(){return new this.constructor().copy(this)}copy(t){return this.a.copy(t.a),this.b.copy(t.b),this.c.copy(t.c),this}getArea(){return ya.subVectors(this.c,this.b),Tr.subVectors(this.a,this.b),ya.cross(Tr).length()*.5}getMidpoint(t){return t.addVectors(this.a,this.b).add(this.c).multiplyScalar(1/3)}getNormal(t){return e.getNormal(this.a,this.b,this.c,t)}getPlane(t){return t.setFromCoplanarPoints(this.a,this.b,this.c)}getBarycoord(t,n){return e.getBarycoord(t,this.a,this.b,this.c,n)}getInterpolation(t,n,i,a,r){return e.getInterpolation(t,this.a,this.b,this.c,n,i,a,r)}containsPoint(t){return e.containsPoint(t,this.a,this.b,this.c)}isFrontFacing(t){return e.isFrontFacing(this.a,this.b,this.c,t)}intersectsBox(t){return t.intersectsTriangle(this)}closestPointToPoint(t,n){let i=this.a,a=this.b,r=this.c,s,l;Ll.subVectors(a,i),Ul.subVectors(r,i),Cv.subVectors(t,i);let o=Ll.dot(Cv),c=Ul.dot(Cv);if(o<=0&&c<=0)return n.copy(i);Dv.subVectors(t,a);let u=Ll.dot(Dv),p=Ul.dot(Dv);if(u>=0&&p<=u)return n.copy(a);let f=o*p-u*c;if(f<=0&&o>=0&&u<=0&&o-u>0)return s=o/(o-u),n.copy(i).addScaledVector(Ll,s);Nv.subVectors(t,r);let h=Ll.dot(Nv),g=Ul.dot(Nv);if(g>=0&&h<=g)return n.copy(r);let M=h*c-o*g;if(M<=0&&c>=0&&g<=0)return l=c/(c-g),n.copy(i).addScaledVector(Ul,l);let v=u*g-h*p;if(v<=0&&p-u>=0&&h-g>=0)return jM.subVectors(r,a),l=(p-u)/(p-u+(h-g)),n.copy(a).addScaledVector(jM,l);let d=1/(v+M+f);return s=M*d,l=f*d,n.copy(i).addScaledVector(Ll,s).addScaledVector(Ul,l)}equals(t){return t.a.equals(this.a)&&t.b.equals(this.b)&&t.c.equals(this.c)}},bs=class{constructor(t=new q(1/0,1/0,1/0),n=new q(-1/0,-1/0,-1/0)){this.isBox3=!0,this.min=t,this.max=n}set(t,n){return this.min.copy(t),this.max.copy(n),this}setFromArray(t){this.makeEmpty();for(let n=0,i=t.length;n<i;n+=3)this.expandByPoint(_a.fromArray(t,n));return this}setFromBufferAttribute(t){this.makeEmpty();for(let n=0,i=t.count;n<i;n++)this.expandByPoint(_a.fromBufferAttribute(t,n));return this}setFromPoints(t){this.makeEmpty();for(let n=0,i=t.length;n<i;n++)this.expandByPoint(t[n]);return this}setFromCenterAndSize(t,n){let i=_a.copy(n).multiplyScalar(.5);return this.min.copy(t).sub(i),this.max.copy(t).add(i),this}setFromObject(t,n=!1){return this.makeEmpty(),this.expandByObject(t,n)}clone(){return new this.constructor().copy(this)}copy(t){return this.min.copy(t.min),this.max.copy(t.max),this}makeEmpty(){return this.min.x=this.min.y=this.min.z=1/0,this.max.x=this.max.y=this.max.z=-1/0,this}isEmpty(){return this.max.x<this.min.x||this.max.y<this.min.y||this.max.z<this.min.z}getCenter(t){return this.isEmpty()?t.set(0,0,0):t.addVectors(this.min,this.max).multiplyScalar(.5)}getSize(t){return this.isEmpty()?t.set(0,0,0):t.subVectors(this.max,this.min)}expandByPoint(t){return this.min.min(t),this.max.max(t),this}expandByVector(t){return this.min.sub(t),this.max.add(t),this}expandByScalar(t){return this.min.addScalar(-t),this.max.addScalar(t),this}expandByObject(t,n=!1){t.updateWorldMatrix(!1,!1);let i=t.geometry;if(i!==void 0){let r=i.getAttribute("position");if(n===!0&&r!==void 0&&t.isInstancedMesh!==!0&&t.isBatchedMesh!==!0)for(let s=0,l=r.count;s<l;s++)t.isMesh===!0?t.getVertexPosition(s,_a):_a.fromBufferAttribute(r,s),_a.applyMatrix4(t.matrixWorld),this.expandByPoint(_a);else t.boundingBox!==void 0?(t.boundingBox===null&&t.computeBoundingBox(),od.copy(t.boundingBox)):(i.boundingBox===null&&i.computeBoundingBox(),od.copy(i.boundingBox)),od.applyMatrix4(t.matrixWorld),this.union(od)}let a=t.children;for(let r=0,s=a.length;r<s;r++)this.expandByObject(a[r],n);return this}containsPoint(t){return t.x>=this.min.x&&t.x<=this.max.x&&t.y>=this.min.y&&t.y<=this.max.y&&t.z>=this.min.z&&t.z<=this.max.z}containsBox(t){return this.min.x<=t.min.x&&t.max.x<=this.max.x&&this.min.y<=t.min.y&&t.max.y<=this.max.y&&this.min.z<=t.min.z&&t.max.z<=this.max.z}getParameter(t,n){return n.set((t.x-this.min.x)/(this.max.x-this.min.x),(t.y-this.min.y)/(this.max.y-this.min.y),(t.z-this.min.z)/(this.max.z-this.min.z))}intersectsBox(t){return t.max.x>=this.min.x&&t.min.x<=this.max.x&&t.max.y>=this.min.y&&t.min.y<=this.max.y&&t.max.z>=this.min.z&&t.min.z<=this.max.z}intersectsSphere(t){return this.clampPoint(t.center,_a),_a.distanceToSquared(t.center)<=t.radius*t.radius}intersectsPlane(t){let n,i;return t.normal.x>0?(n=t.normal.x*this.min.x,i=t.normal.x*this.max.x):(n=t.normal.x*this.max.x,i=t.normal.x*this.min.x),t.normal.y>0?(n+=t.normal.y*this.min.y,i+=t.normal.y*this.max.y):(n+=t.normal.y*this.max.y,i+=t.normal.y*this.min.y),t.normal.z>0?(n+=t.normal.z*this.min.z,i+=t.normal.z*this.max.z):(n+=t.normal.z*this.max.z,i+=t.normal.z*this.min.z),n<=-t.constant&&i>=-t.constant}intersectsTriangle(t){if(this.isEmpty())return!1;this.getCenter(Mu),ld.subVectors(this.max,Mu),Il.subVectors(t.a,Mu),Ol.subVectors(t.b,Mu),Pl.subVectors(t.c,Mu),vs.subVectors(Ol,Il),xs.subVectors(Pl,Ol),co.subVectors(Il,Pl);let n=[0,-vs.z,vs.y,0,-xs.z,xs.y,0,-co.z,co.y,vs.z,0,-vs.x,xs.z,0,-xs.x,co.z,0,-co.x,-vs.y,vs.x,0,-xs.y,xs.x,0,-co.y,co.x,0];return!Ov(n,Il,Ol,Pl,ld)||(n=[1,0,0,0,1,0,0,0,1],!Ov(n,Il,Ol,Pl,ld))?!1:(cd.crossVectors(vs,xs),n=[cd.x,cd.y,cd.z],Ov(n,Il,Ol,Pl,ld))}clampPoint(t,n){return n.copy(t).clamp(this.min,this.max)}distanceToPoint(t){return this.clampPoint(t,_a).distanceTo(t)}getBoundingSphere(t){return this.isEmpty()?t.makeEmpty():(this.getCenter(t.center),t.radius=this.getSize(_a).length()*.5),t}intersect(t){return this.min.max(t.min),this.max.min(t.max),this.isEmpty()&&this.makeEmpty(),this}union(t){return this.min.min(t.min),this.max.max(t.max),this}applyMatrix4(t){return this.isEmpty()?this:(Ar[0].set(this.min.x,this.min.y,this.min.z).applyMatrix4(t),Ar[1].set(this.min.x,this.min.y,this.max.z).applyMatrix4(t),Ar[2].set(this.min.x,this.max.y,this.min.z).applyMatrix4(t),Ar[3].set(this.min.x,this.max.y,this.max.z).applyMatrix4(t),Ar[4].set(this.max.x,this.min.y,this.min.z).applyMatrix4(t),Ar[5].set(this.max.x,this.min.y,this.max.z).applyMatrix4(t),Ar[6].set(this.max.x,this.max.y,this.min.z).applyMatrix4(t),Ar[7].set(this.max.x,this.max.y,this.max.z).applyMatrix4(t),this.setFromPoints(Ar),this)}translate(t){return this.min.add(t),this.max.add(t),this}equals(t){return t.min.equals(this.min)&&t.max.equals(this.max)}toJSON(){return{min:this.min.toArray(),max:this.max.toArray()}}fromJSON(t){return this.min.fromArray(t.min),this.max.fromArray(t.max),this}},Ar=[new q,new q,new q,new q,new q,new q,new q,new q],_a=new q,od=new bs,Il=new q,Ol=new q,Pl=new q,vs=new q,xs=new q,co=new q,Mu=new q,ld=new q,cd=new q,uo=new q;function Ov(e,t,n,i,a){for(let r=0,s=e.length-3;r<=s;r+=3){uo.fromArray(e,r);let l=a.x*Math.abs(uo.x)+a.y*Math.abs(uo.y)+a.z*Math.abs(uo.z),o=t.dot(uo),c=n.dot(uo),u=i.dot(uo);if(Math.max(-Math.max(o,c,u),Math.min(o,c,u))>l)return!1}return!0}var _n=new q,ud=new Ot,RC=0,Ti=class extends ja{constructor(t,n,i=!1){if(super(),Array.isArray(t))throw new TypeError("THREE.BufferAttribute: array should be a Typed Array.");this.isBufferAttribute=!0,Object.defineProperty(this,"id",{value:RC++}),this.name="",this.array=t,this.itemSize=n,this.count=t!==void 0?t.length/n:0,this.normalized=i,this.usage=JE,this.updateRanges=[],this.gpuType=Ea,this.version=0,this._normalizationScale=t!==void 0?Cx(t):void 0}onUploadCallback(){}set needsUpdate(t){t===!0&&this.version++}setUsage(t){return this.usage=t,this}addUpdateRange(t,n){this.updateRanges.push({start:t,count:n})}clearUpdateRanges(){this.updateRanges.length=0}copy(t){return this.name=t.name,this.array=new t.array.constructor(t.array),this.itemSize=t.itemSize,this.count=t.count,this.normalized=t.normalized,this.usage=t.usage,this.gpuType=t.gpuType,this._normalizationScale=t._normalizationScale,this}copyAt(t,n,i){t*=this.itemSize,i*=n.itemSize;for(let a=0,r=this.itemSize;a<r;a++)this.array[t+a]=n.array[i+a];return this}copyArray(t){return this.array.set(t),this}applyMatrix3(t){if(this.itemSize===2)for(let n=0,i=this.count;n<i;n++)ud.fromBufferAttribute(this,n),ud.applyMatrix3(t),this.setXY(n,ud.x,ud.y);else if(this.itemSize===3)for(let n=0,i=this.count;n<i;n++)_n.fromBufferAttribute(this,n),_n.applyMatrix3(t),this.setXYZ(n,_n.x,_n.y,_n.z);return this}applyMatrix4(t){for(let n=0,i=this.count;n<i;n++)_n.fromBufferAttribute(this,n),_n.applyMatrix4(t),this.setXYZ(n,_n.x,_n.y,_n.z);return this}applyNormalMatrix(t){for(let n=0,i=this.count;n<i;n++)_n.fromBufferAttribute(this,n),_n.applyNormalMatrix(t),this.setXYZ(n,_n.x,_n.y,_n.z);return this}transformDirection(t){for(let n=0,i=this.count;n<i;n++)_n.fromBufferAttribute(this,n),_n.transformDirection(t),this.setXYZ(n,_n.x,_n.y,_n.z);return this}set(t,n=0){return this.array.set(t,n),this}getComponent(t,n){let i=this.array[t*this.itemSize+n];return this.normalized&&(i=this._denormalize(i)),i}setComponent(t,n,i){return this.normalized&&(i=this._normalize(i)),this.array[t*this.itemSize+n]=i,this}getX(t){let n=this.array[t*this.itemSize];return this.normalized&&(n=this._denormalize(n)),n}setX(t,n){return this.normalized&&(n=this._normalize(n)),this.array[t*this.itemSize]=n,this}getY(t){let n=this.array[t*this.itemSize+1];return this.normalized&&(n=this._denormalize(n)),n}setY(t,n){return this.normalized&&(n=this._normalize(n)),this.array[t*this.itemSize+1]=n,this}getZ(t){let n=this.array[t*this.itemSize+2];return this.normalized&&(n=this._denormalize(n)),n}setZ(t,n){return this.normalized&&(n=this._normalize(n)),this.array[t*this.itemSize+2]=n,this}getW(t){let n=this.array[t*this.itemSize+3];return this.normalized&&(n=this._denormalize(n)),n}setW(t,n){return this.normalized&&(n=this._normalize(n)),this.array[t*this.itemSize+3]=n,this}setXY(t,n,i){return t*=this.itemSize,this.normalized&&(n=this._normalize(n),i=this._normalize(i)),this.array[t+0]=n,this.array[t+1]=i,this}setXYZ(t,n,i,a){return t*=this.itemSize,this.normalized&&(n=this._normalize(n),i=this._normalize(i),a=this._normalize(a)),this.array[t+0]=n,this.array[t+1]=i,this.array[t+2]=a,this}setXYZW(t,n,i,a,r){return t*=this.itemSize,this.normalized&&(n=this._normalize(n),i=this._normalize(i),a=this._normalize(a),r=this._normalize(r)),this.array[t+0]=n,this.array[t+1]=i,this.array[t+2]=a,this.array[t+3]=r,this}onUpload(t){return this.onUploadCallback=t,this}clone(){return new this.constructor(this.array,this.itemSize).copy(this)}toJSON(){let t={itemSize:this.itemSize,type:this.array.constructor.name,array:Array.from(this.array),normalized:this.normalized};return t.name=this.name,t.usage=this.usage,t.gpuType=this.gpuType,t}dispose(){this.dispatchEvent({type:"dispose"})}_denormalize(t){let n=this._normalizationScale;return n!==void 0?Math.max(t/n,-1):gC(t,this.array)}_normalize(t){let n=this._normalizationScale;return n!==void 0?Math.round(t*n):vC(t,this.array)}};var Iu=class extends Ti{constructor(t,n,i){super(new Uint16Array(t),n,i)}};var Ou=class extends Ti{constructor(t,n,i){super(new Uint32Array(t),n,i)}};var bn=class extends Ti{constructor(t,n,i){super(new Float32Array(t),n,i)}},CC=new bs,Eu=new q,Pv=new q,Jl=class{constructor(t=new q,n=-1){this.isSphere=!0,this.center=t,this.radius=n}set(t,n){return this.center.copy(t),this.radius=n,this}setFromPoints(t,n){let i=this.center;n!==void 0?i.copy(n):CC.setFromPoints(t).getCenter(i);let a=0;for(let r=0,s=t.length;r<s;r++)a=Math.max(a,i.distanceToSquared(t[r]));return this.radius=Math.sqrt(a),this}copy(t){return this.center.copy(t.center),this.radius=t.radius,this}isEmpty(){return this.radius<0}makeEmpty(){return this.center.set(0,0,0),this.radius=-1,this}containsPoint(t){return t.distanceToSquared(this.center)<=this.radius*this.radius}distanceToPoint(t){return t.distanceTo(this.center)-this.radius}intersectsSphere(t){let n=this.radius+t.radius;return t.center.distanceToSquared(this.center)<=n*n}intersectsBox(t){return t.intersectsSphere(this)}intersectsPlane(t){return Math.abs(t.distanceToPoint(this.center))<=this.radius}clampPoint(t,n){let i=this.center.distanceToSquared(t);return n.copy(t),i>this.radius*this.radius&&(n.sub(this.center).normalize(),n.multiplyScalar(this.radius).add(this.center)),n}getBoundingBox(t){return this.isEmpty()?(t.makeEmpty(),t):(t.set(this.center,this.center),t.expandByScalar(this.radius),t)}applyMatrix4(t){return this.center.applyMatrix4(t),this.radius=this.radius*t.getMaxScaleOnAxis(),this}translate(t){return this.center.add(t),this}expandByPoint(t){if(this.isEmpty())return this.center.copy(t),this.radius=0,this;Eu.subVectors(t,this.center);let n=Eu.lengthSq();if(n>this.radius*this.radius){let i=Math.sqrt(n),a=(i-this.radius)*.5;this.center.addScaledVector(Eu,a/i),this.radius+=a}return this}union(t){return t.isEmpty()?this:this.isEmpty()?(this.copy(t),this):(this.center.equals(t.center)===!0?this.radius=Math.max(this.radius,t.radius):(Pv.subVectors(t.center,this.center).setLength(t.radius),this.expandByPoint(Eu.copy(t.center).add(Pv)),this.expandByPoint(Eu.copy(t.center).sub(Pv))),this)}equals(t){return t.center.equals(this.center)&&t.radius===this.radius}clone(){return new this.constructor().copy(this)}toJSON(){return{radius:this.radius,center:this.center.toArray()}}fromJSON(t){return this.radius=t.radius,this.center.fromArray(t.center),this}},DC=0,oa=new Ye,zv=new fi,zl=new q,Gi=new bs,Tu=new bs,Un=new q,ki=class e extends ja{constructor(){super(),this.isBufferGeometry=!0,Object.defineProperty(this,"id",{value:DC++}),this.uuid=fc(),this.name="",this.type="BufferGeometry",this.index=null,this.indirect=null,this.indirectOffset=0,this.attributes={},this.morphAttributes={},this.morphTargetsRelative=!1,this.groups=[],this.boundingBox=null,this.boundingSphere=null,this.drawRange={start:0,count:1/0},this.userData={},this._transformed=!1}getIndex(){return this.index}setIndex(t){return Array.isArray(t)?this.index=new(dC(t)?Ou:Iu)(t,1):this.index=t,this}setIndirect(t,n=0){return this.indirect=t,this.indirectOffset=n,this}getIndirect(){return this.indirect}getAttribute(t){return this.attributes[t]}setAttribute(t,n){return this.attributes[t]=n,this}deleteAttribute(t){return delete this.attributes[t],this}hasAttribute(t){return this.attributes[t]!==void 0}addGroup(t,n,i=0){this.groups.push({start:t,count:n,materialIndex:i})}clearGroups(){this.groups=[]}setDrawRange(t,n){this.drawRange.start=t,this.drawRange.count=n}applyMatrix4(t){let n=this.attributes.position;n!==void 0&&(n.applyMatrix4(t),n.needsUpdate=!0);let i=this.attributes.normal;if(i!==void 0){let r=new de().getNormalMatrix(t);i.applyNormalMatrix(r),i.needsUpdate=!0}let a=this.attributes.tangent;return a!==void 0&&(a.transformDirection(t),a.needsUpdate=!0),this.boundingBox!==null&&this.computeBoundingBox(),this.boundingSphere!==null&&this.computeBoundingSphere(),this._transformed=!0,this}applyQuaternion(t){return oa.makeRotationFromQuaternion(t),this.applyMatrix4(oa),this}rotateX(t){return oa.makeRotationX(t),this.applyMatrix4(oa),this}rotateY(t){return oa.makeRotationY(t),this.applyMatrix4(oa),this}rotateZ(t){return oa.makeRotationZ(t),this.applyMatrix4(oa),this}translate(t,n,i){return oa.makeTranslation(t,n,i),this.applyMatrix4(oa),this}scale(t,n,i){return oa.makeScale(t,n,i),this.applyMatrix4(oa),this}lookAt(t){return zv.lookAt(t),zv.updateMatrix(),this.applyMatrix4(zv.matrix),this}center(){return this.computeBoundingBox(),this.boundingBox.getCenter(zl).negate(),this.translate(zl.x,zl.y,zl.z),this}setFromPoints(t){let n=this.getAttribute("position");if(n===void 0){let i=[];for(let a=0,r=t.length;a<r;a++){let s=t[a];i.push(s.x,s.y,s.z||0)}this.setAttribute("position",new bn(i,3))}else{let i=Math.min(t.length,n.count);for(let a=0;a<i;a++){let r=t[a];n.setXYZ(a,r.x,r.y,r.z||0)}t.length>n.count&&ce("BufferGeometry: Buffer size too small for points data. Use .dispose() and create a new geometry."),n.needsUpdate=!0}return this}computeBoundingBox(){this.boundingBox===null&&(this.boundingBox=new bs);let t=this.attributes.position,n=this.morphAttributes.position;if(t&&t.isGLBufferAttribute){ue("BufferGeometry.computeBoundingBox(): GLBufferAttribute requires a manual bounding box.",this),this.boundingBox.set(new q(-1/0,-1/0,-1/0),new q(1/0,1/0,1/0));return}if(t!==void 0){if(this.boundingBox.setFromBufferAttribute(t),n)for(let i=0,a=n.length;i<a;i++){let r=n[i];Gi.setFromBufferAttribute(r),this.morphTargetsRelative?(Un.addVectors(this.boundingBox.min,Gi.min),this.boundingBox.expandByPoint(Un),Un.addVectors(this.boundingBox.max,Gi.max),this.boundingBox.expandByPoint(Un)):(this.boundingBox.expandByPoint(Gi.min),this.boundingBox.expandByPoint(Gi.max))}}else this.boundingBox.makeEmpty();(isNaN(this.boundingBox.min.x)||isNaN(this.boundingBox.min.y)||isNaN(this.boundingBox.min.z))&&ue('BufferGeometry.computeBoundingBox(): Computed min/max have NaN values. The "position" attribute is likely to have NaN values.',this)}computeBoundingSphere(){this.boundingSphere===null&&(this.boundingSphere=new Jl);let t=this.attributes.position,n=this.morphAttributes.position;if(t&&t.isGLBufferAttribute){ue("BufferGeometry.computeBoundingSphere(): GLBufferAttribute requires a manual bounding sphere.",this),this.boundingSphere.set(new q,1/0);return}if(t){let i=this.boundingSphere.center;if(Gi.setFromBufferAttribute(t),n)for(let r=0,s=n.length;r<s;r++){let l=n[r];Tu.setFromBufferAttribute(l),this.morphTargetsRelative?(Un.addVectors(Gi.min,Tu.min),Gi.expandByPoint(Un),Un.addVectors(Gi.max,Tu.max),Gi.expandByPoint(Un)):(Gi.expandByPoint(Tu.min),Gi.expandByPoint(Tu.max))}Gi.getCenter(i);let a=0;for(let r=0,s=t.count;r<s;r++)Un.fromBufferAttribute(t,r),a=Math.max(a,i.distanceToSquared(Un));if(n)for(let r=0,s=n.length;r<s;r++){let l=n[r],o=this.morphTargetsRelative;for(let c=0,u=l.count;c<u;c++)Un.fromBufferAttribute(l,c),o&&(zl.fromBufferAttribute(t,c),Un.add(zl)),a=Math.max(a,i.distanceToSquared(Un))}this.boundingSphere.radius=Math.sqrt(a),isNaN(this.boundingSphere.radius)&&ue('BufferGeometry.computeBoundingSphere(): Computed radius is NaN. The "position" attribute is likely to have NaN values.',this)}}computeTangents(){let t=this.index,n=this.attributes;if(t===null||n.position===void 0||n.normal===void 0||n.uv===void 0){ue("BufferGeometry: .computeTangents() failed. Missing required attributes (index, position, normal or uv)");return}let i=n.position,a=n.normal,r=n.uv,s=this.getAttribute("tangent");(s===void 0||s.count!==i.count)&&(s=new Ti(new Float32Array(4*i.count),4),this.setAttribute("tangent",s));let l=[],o=[],c=new Uint8Array(i.count);for(let C=0;C<i.count;C++)l[C]=new q,o[C]=new q;let u=new q,p=new q,f=new q,h=new Ot,g=new Ot,M=new Ot,v=new q,d=new q;function x(C,D,R){c[C]=c[D]=c[R]=1,u.fromBufferAttribute(i,C),p.fromBufferAttribute(i,D),f.fromBufferAttribute(i,R),h.fromBufferAttribute(r,C),g.fromBufferAttribute(r,D),M.fromBufferAttribute(r,R),p.sub(u),f.sub(u),g.sub(h),M.sub(h);let Z=1/(g.x*M.y-M.x*g.y);isFinite(Z)&&(v.copy(p).multiplyScalar(M.y).addScaledVector(f,-g.y).multiplyScalar(Z),d.copy(f).multiplyScalar(g.x).addScaledVector(p,-M.x).multiplyScalar(Z),l[C].add(v),l[D].add(v),l[R].add(v),o[C].add(d),o[D].add(d),o[R].add(d))}let b=this.groups;b.length===0&&(b=[{start:0,count:t.count}]);for(let C=0,D=b.length;C<D;++C){let R=b[C],Z=R.start,tt=R.count;for(let z=Z,J=Z+tt;z<J;z+=3)x(t.getX(z+0),t.getX(z+1),t.getX(z+2))}let y=new q,w=new q,T=new q,m=new q;function S(C){T.fromBufferAttribute(a,C),m.copy(T);let D=l[C];y.copy(D),y.sub(T.multiplyScalar(T.dot(D))).normalize(),w.crossVectors(m,D);let Z=w.dot(o[C])<0?-1:1;s.setXYZW(C,y.x,y.y,y.z,Z)}for(let C=0,D=i.count;C<D;++C)c[C]&&S(C);this._transformed=!0}computeVertexNormals(){let t=this.index,n=this.getAttribute("position");if(n!==void 0){let i=this.getAttribute("normal");if(i===void 0||i.count!==n.count)i=new Ti(new Float32Array(n.count*3),3),this.setAttribute("normal",i);else for(let f=0,h=i.count;f<h;f++)i.setXYZ(f,0,0,0);let a=new q,r=new q,s=new q,l=new q,o=new q,c=new q,u=new q,p=new q;if(t)for(let f=0,h=t.count;f<h;f+=3){let g=t.getX(f+0),M=t.getX(f+1),v=t.getX(f+2);a.fromBufferAttribute(n,g),r.fromBufferAttribute(n,M),s.fromBufferAttribute(n,v),u.subVectors(s,r),p.subVectors(a,r),u.cross(p),l.fromBufferAttribute(i,g),o.fromBufferAttribute(i,M),c.fromBufferAttribute(i,v),l.add(u),o.add(u),c.add(u),i.setXYZ(g,l.x,l.y,l.z),i.setXYZ(M,o.x,o.y,o.z),i.setXYZ(v,c.x,c.y,c.z)}else for(let f=0,h=n.count;f<h;f+=3)a.fromBufferAttribute(n,f+0),r.fromBufferAttribute(n,f+1),s.fromBufferAttribute(n,f+2),u.subVectors(s,r),p.subVectors(a,r),u.cross(p),i.setXYZ(f+0,u.x,u.y,u.z),i.setXYZ(f+1,u.x,u.y,u.z),i.setXYZ(f+2,u.x,u.y,u.z);this.normalizeNormals(),i.needsUpdate=!0}}normalizeNormals(){let t=this.attributes.normal;for(let n=0,i=t.count;n<i;n++)Un.fromBufferAttribute(t,n),Un.normalize(),t.setXYZ(n,Un.x,Un.y,Un.z)}toNonIndexed(){function t(l,o){let c=l.array,u=l.itemSize,p=l.normalized,f=new c.constructor(o.length*u),h=0,g=0;for(let M=0,v=o.length;M<v;M++){l.isInterleavedBufferAttribute?h=o[M]*l.data.stride+l.offset:h=o[M]*u;for(let d=0;d<u;d++)f[g++]=c[h++]}return new Ti(f,u,p)}if(this.index===null)return ce("BufferGeometry.toNonIndexed(): BufferGeometry is already non-indexed."),this;let n=new e,i=this.index.array,a=this.attributes;for(let l in a){let o=a[l],c=t(o,i);n.setAttribute(l,c)}let r=this.morphAttributes;for(let l in r){let o=[],c=r[l];for(let u=0,p=c.length;u<p;u++){let f=c[u],h=t(f,i);o.push(h)}n.morphAttributes[l]=o}n.morphTargetsRelative=this.morphTargetsRelative;let s=this.groups;for(let l=0,o=s.length;l<o;l++){let c=s[l];n.addGroup(c.start,c.count,c.materialIndex)}return n}toJSON(){let t={metadata:{version:4.7,type:"BufferGeometry",generator:"BufferGeometry.toJSON"}};if(t.uuid=this.uuid,t.type=this.parameters!==void 0&&this._transformed===!0?"BufferGeometry":this.type,t.name=this.name,Object.keys(this.userData).length>0&&(t.userData=this.userData),this.parameters!==void 0&&this._transformed!==!0){let o=this.parameters;for(let c in o)o[c]!==void 0&&(t[c]=o[c]);return t}t.data={attributes:{}};let n=this.index;n!==null&&(t.data.index={type:n.array.constructor.name,array:Array.prototype.slice.call(n.array)});let i=this.attributes;for(let o in i){let c=i[o];t.data.attributes[o]=c.toJSON(t.data)}let a={},r=!1;for(let o in this.morphAttributes){let c=this.morphAttributes[o],u=[];for(let p=0,f=c.length;p<f;p++){let h=c[p];u.push(h.toJSON(t.data))}u.length>0&&(a[o]=u,r=!0)}r&&(t.data.morphAttributes=a,t.data.morphTargetsRelative=this.morphTargetsRelative);let s=this.groups;s.length>0&&(t.data.groups=JSON.parse(JSON.stringify(s)));let l=this.boundingSphere;return l!==null&&(t.data.boundingSphere=l.toJSON()),t}clone(){return new this.constructor().copy(this)}copy(t){this.index=null,this.attributes={},this.morphAttributes={},this.groups=[],this.boundingBox=null,this.boundingSphere=null;let n={};this.name=t.name;let i=t.index;i!==null&&this.setIndex(i.clone());let a=t.attributes;for(let c in a){let u=a[c];this.setAttribute(c,u.clone(n))}let r=t.morphAttributes;for(let c in r){let u=[],p=r[c];for(let f=0,h=p.length;f<h;f++)u.push(p[f].clone(n));this.morphAttributes[c]=u}this.morphTargetsRelative=t.morphTargetsRelative;let s=t.groups;for(let c=0,u=s.length;c<u;c++){let p=s[c];this.addGroup(p.start,p.count,p.materialIndex)}let l=t.boundingBox;l!==null&&(this.boundingBox=l.clone());let o=t.boundingSphere;return o!==null&&(this.boundingSphere=o.clone()),this.drawRange.start=t.drawRange.start,this.drawRange.count=t.drawRange.count,this.userData=t.userData,this._transformed=t._transformed,this}dispose(){this.dispatchEvent({type:"dispose"})}};var Fv=new q,NC=new q,LC=new de,ba=class{constructor(t=new q(1,0,0),n=0){this.isPlane=!0,this.normal=t,this.constant=n}set(t,n){return this.normal.copy(t),this.constant=n,this}setComponents(t,n,i,a){return this.normal.set(t,n,i),this.constant=a,this}setFromNormalAndCoplanarPoint(t,n){return this.normal.copy(t),this.constant=-n.dot(this.normal),this}setFromCoplanarPoints(t,n,i){let a=Fv.subVectors(i,n).cross(NC.subVectors(t,n)).normalize();return this.setFromNormalAndCoplanarPoint(a,t),this}copy(t){return this.normal.copy(t.normal),this.constant=t.constant,this}normalize(){let t=1/this.normal.length();return this.normal.multiplyScalar(t),this.constant*=t,this}negate(){return this.constant*=-1,this.normal.negate(),this}distanceToPoint(t){return this.normal.dot(t)+this.constant}distanceToSphere(t){return this.distanceToPoint(t.center)-t.radius}projectPoint(t,n){return n.copy(t).addScaledVector(this.normal,-this.distanceToPoint(t))}intersectLine(t,n,i=!0){let a=t.delta(Fv),r=this.normal.dot(a);if(r===0)return this.distanceToPoint(t.start)===0?n.copy(t.start):null;let s=-(t.start.dot(this.normal)+this.constant)/r;return i===!0&&(s<0||s>1)?null:n.copy(t.start).addScaledVector(a,s)}intersectsLine(t){let n=this.distanceToPoint(t.start),i=this.distanceToPoint(t.end);return n<0&&i>0||i<0&&n>0}intersectsBox(t){return t.intersectsPlane(this)}intersectsSphere(t){return t.intersectsPlane(this)}coplanarPoint(t){return t.copy(this.normal).multiplyScalar(-this.constant)}applyMatrix4(t,n){let i=n||LC.getNormalMatrix(t),a=this.coplanarPoint(Fv).applyMatrix4(t),r=this.normal.applyMatrix3(i).normalize();return this.constant=-a.dot(r),this}translate(t){return this.constant-=t.dot(this.normal),this}equals(t){return t.normal.equals(this.normal)&&t.constant===this.constant}clone(){return new this.constructor().copy(this)}toJSON(){return{normal:this.normal.toArray(),constant:this.constant}}fromJSON(t){return this.normal.fromArray(t.normal),this.constant=t.constant,this}},UC=0,Ss=class extends ja{constructor(){super(),this.isMaterial=!0,Object.defineProperty(this,"id",{value:UC++}),this.uuid=fc(),this.name="",this.type="Material",this.blending=lc,this.side=Cs,this.vertexColors=!1,this.opacity=1,this.transparent=!1,this.alphaHash=!1,this.blendSrc=ox,this.blendDst=lx,this.blendEquation=_o,this.blendSrcAlpha=null,this.blendDstAlpha=null,this.blendEquationAlpha=null,this.blendColor=new me(0,0,0),this.blendAlpha=0,this.depthFunc=Vl,this.depthTest=!0,this.depthWrite=!0,this.stencilWriteMask=255,this.stencilFunc=kE,this.stencilRef=0,this.stencilFuncMask=255,this.stencilFail=Ad,this.stencilZFail=Ad,this.stencilZPass=Ad,this.stencilWrite=!1,this.clippingPlanes=null,this.clipIntersection=!1,this.clipShadows=!1,this.shadowSide=null,this.colorWrite=!0,this.precision=null,this.polygonOffset=!1,this.polygonOffsetFactor=0,this.polygonOffsetUnits=0,this.dithering=!1,this.alphaToCoverage=!1,this.premultipliedAlpha=!1,this.forceSinglePass=!1,this.allowOverride=!0,this.visible=!0,this.toneMapped=!0,this.userData={},this.version=0,this._alphaTest=0}get alphaTest(){return this._alphaTest}set alphaTest(t){this._alphaTest>0!=t>0&&this.version++,this._alphaTest=t}onBeforeRender(){}onBeforeCompile(){}customProgramCacheKey(){return this.onBeforeCompile.toString()}setValues(t){if(t!==void 0)for(let n in t){let i=t[n];if(i===void 0){ce(`Material: parameter '${n}' has value of undefined.`);continue}let a=this[n];if(a===void 0){ce(`Material: '${n}' is not a property of THREE.${this.type}.`);continue}a&&a.isColor?a.set(i):a&&a.isVector2&&i&&i.isVector2||a&&a.isEuler&&i&&i.isEuler||a&&a.isVector3&&i&&i.isVector3?a.copy(i):this[n]=i}}toJSON(t){let n=t===void 0||typeof t=="string";n&&(t={textures:{},images:{}});let i={metadata:{version:4.7,type:"Material",generator:"Material.toJSON"}};i.uuid=this.uuid,i.type=this.type,i.blending=this.blending,i.side=this.side,i.shadowSide=this.shadowSide,i.vertexColors=this.vertexColors,i.opacity=this.opacity,i.transparent=this.transparent,i.blendSrc=this.blendSrc,i.blendDst=this.blendDst,i.blendEquation=this.blendEquation,i.blendSrcAlpha=this.blendSrcAlpha,i.blendDstAlpha=this.blendDstAlpha,i.blendEquationAlpha=this.blendEquationAlpha,i.blendColor=this.blendColor.getHex(),i.blendAlpha=this.blendAlpha,i.depthFunc=this.depthFunc,i.depthTest=this.depthTest,i.depthWrite=this.depthWrite,i.colorWrite=this.colorWrite,i.clipIntersection=this.clipIntersection,i.clipShadows=this.clipShadows,i.stencilWriteMask=this.stencilWriteMask,i.stencilFunc=this.stencilFunc,i.stencilRef=this.stencilRef,i.stencilFuncMask=this.stencilFuncMask,i.stencilFail=this.stencilFail,i.stencilZFail=this.stencilZFail,i.stencilZPass=this.stencilZPass,i.stencilWrite=this.stencilWrite,i.polygonOffset=this.polygonOffset,i.polygonOffsetFactor=this.polygonOffsetFactor,i.polygonOffsetUnits=this.polygonOffsetUnits,i.dithering=this.dithering,i.alphaTest=this.alphaTest,i.alphaHash=this.alphaHash,i.alphaToCoverage=this.alphaToCoverage,i.premultipliedAlpha=this.premultipliedAlpha,i.forceSinglePass=this.forceSinglePass,i.allowOverride=this.allowOverride,i.visible=this.visible,i.toneMapped=this.toneMapped,i.name=this.name,this.color&&this.color.isColor&&(i.color=this.color.getHex()),this.roughness!==void 0&&(i.roughness=this.roughness),this.metalness!==void 0&&(i.metalness=this.metalness),this.sheen!==void 0&&(i.sheen=this.sheen),this.sheenColor&&this.sheenColor.isColor&&(i.sheenColor=this.sheenColor.getHex()),this.sheenRoughness!==void 0&&(i.sheenRoughness=this.sheenRoughness),this.emissive&&this.emissive.isColor&&(i.emissive=this.emissive.getHex()),this.emissiveIntensity!==void 0&&(i.emissiveIntensity=this.emissiveIntensity),this.specular&&this.specular.isColor&&(i.specular=this.specular.getHex()),this.specularIntensity!==void 0&&(i.specularIntensity=this.specularIntensity),this.specularColor&&this.specularColor.isColor&&(i.specularColor=this.specularColor.getHex()),this.shininess!==void 0&&(i.shininess=this.shininess),this.clearcoat!==void 0&&(i.clearcoat=this.clearcoat),this.clearcoatRoughness!==void 0&&(i.clearcoatRoughness=this.clearcoatRoughness),this.diffuseRoughness!==void 0&&(i.diffuseRoughness=this.diffuseRoughness),this.diffuseRoughnessMap&&this.diffuseRoughnessMap.isTexture&&(i.diffuseRoughnessMap=this.diffuseRoughnessMap.toJSON(t).uuid),this.clearcoatMap&&this.clearcoatMap.isTexture&&(i.clearcoatMap=this.clearcoatMap.toJSON(t).uuid),this.clearcoatRoughnessMap&&this.clearcoatRoughnessMap.isTexture&&(i.clearcoatRoughnessMap=this.clearcoatRoughnessMap.toJSON(t).uuid),this.clearcoatNormalMap&&this.clearcoatNormalMap.isTexture&&(i.clearcoatNormalMap=this.clearcoatNormalMap.toJSON(t).uuid,i.clearcoatNormalScale=this.clearcoatNormalScale.toArray()),this.sheenColorMap&&this.sheenColorMap.isTexture&&(i.sheenColorMap=this.sheenColorMap.toJSON(t).uuid),this.sheenRoughnessMap&&this.sheenRoughnessMap.isTexture&&(i.sheenRoughnessMap=this.sheenRoughnessMap.toJSON(t).uuid),this.dispersion!==void 0&&(i.dispersion=this.dispersion),this.retroreflectivity!==void 0&&(i.retroreflectivity=this.retroreflectivity),this.iridescence!==void 0&&(i.iridescence=this.iridescence),this.iridescenceIOR!==void 0&&(i.iridescenceIOR=this.iridescenceIOR),this.iridescenceThicknessMinimum!==void 0&&(i.iridescenceThicknessMinimum=this.iridescenceThicknessMinimum),this.iridescenceThicknessMaximum!==void 0&&(i.iridescenceThicknessMaximum=this.iridescenceThicknessMaximum),this.iridescenceMap&&this.iridescenceMap.isTexture&&(i.iridescenceMap=this.iridescenceMap.toJSON(t).uuid),this.iridescenceThicknessMap&&this.iridescenceThicknessMap.isTexture&&(i.iridescenceThicknessMap=this.iridescenceThicknessMap.toJSON(t).uuid),this.anisotropy!==void 0&&(i.anisotropy=this.anisotropy),this.anisotropyRotation!==void 0&&(i.anisotropyRotation=this.anisotropyRotation),this.anisotropyMap&&this.anisotropyMap.isTexture&&(i.anisotropyMap=this.anisotropyMap.toJSON(t).uuid),this.map&&this.map.isTexture&&(i.map=this.map.toJSON(t).uuid),this.matcap&&this.matcap.isTexture&&(i.matcap=this.matcap.toJSON(t).uuid),this.alphaMap&&this.alphaMap.isTexture&&(i.alphaMap=this.alphaMap.toJSON(t).uuid),this.lightMap&&this.lightMap.isTexture&&(i.lightMap=this.lightMap.toJSON(t).uuid,i.lightMapIntensity=this.lightMapIntensity),this.aoMap&&this.aoMap.isTexture&&(i.aoMap=this.aoMap.toJSON(t).uuid,i.aoMapIntensity=this.aoMapIntensity),this.bumpMap&&this.bumpMap.isTexture&&(i.bumpMap=this.bumpMap.toJSON(t).uuid,i.bumpScale=this.bumpScale),this.normalMap&&this.normalMap.isTexture&&(i.normalMap=this.normalMap.toJSON(t).uuid,i.normalMapType=this.normalMapType,i.normalScale=this.normalScale.toArray()),this.displacementMap&&this.displacementMap.isTexture&&(i.displacementMap=this.displacementMap.toJSON(t).uuid,i.displacementScale=this.displacementScale,i.displacementBias=this.displacementBias),this.roughnessMap&&this.roughnessMap.isTexture&&(i.roughnessMap=this.roughnessMap.toJSON(t).uuid),this.metalnessMap&&this.metalnessMap.isTexture&&(i.metalnessMap=this.metalnessMap.toJSON(t).uuid),this.emissiveMap&&this.emissiveMap.isTexture&&(i.emissiveMap=this.emissiveMap.toJSON(t).uuid),this.specularMap&&this.specularMap.isTexture&&(i.specularMap=this.specularMap.toJSON(t).uuid),this.specularIntensityMap&&this.specularIntensityMap.isTexture&&(i.specularIntensityMap=this.specularIntensityMap.toJSON(t).uuid),this.specularColorMap&&this.specularColorMap.isTexture&&(i.specularColorMap=this.specularColorMap.toJSON(t).uuid),this.envMap&&this.envMap.isTexture&&(i.envMap=this.envMap.toJSON(t).uuid,this.combine!==void 0&&(i.combine=this.combine)),this.envMapRotation!==void 0&&(i.envMapRotation=this.envMapRotation.toArray()),this.envMapIntensity!==void 0&&(i.envMapIntensity=this.envMapIntensity),this.reflectivity!==void 0&&(i.reflectivity=this.reflectivity),this.refractionRatio!==void 0&&(i.refractionRatio=this.refractionRatio),this.gradientMap&&this.gradientMap.isTexture&&(i.gradientMap=this.gradientMap.toJSON(t).uuid),this.transmission!==void 0&&(i.transmission=this.transmission),this.transmissionMap&&this.transmissionMap.isTexture&&(i.transmissionMap=this.transmissionMap.toJSON(t).uuid),this.thickness!==void 0&&(i.thickness=this.thickness),this.thicknessMap&&this.thicknessMap.isTexture&&(i.thicknessMap=this.thicknessMap.toJSON(t).uuid),this.attenuationDistance!==void 0&&(i.attenuationDistance=this.attenuationDistance),this.attenuationColor!==void 0&&(i.attenuationColor=this.attenuationColor.getHex()),this.size!==void 0&&(i.size=this.size),this.sizeAttenuation!==void 0&&(i.sizeAttenuation=this.sizeAttenuation),Array.isArray(this.clippingPlanes)&&this.clippingPlanes.length>0&&(i.clippingPlanes=this.clippingPlanes.map(r=>r.toJSON())),this.rotation!==void 0&&(i.rotation=this.rotation),this.depthPacking!==void 0&&(i.depthPacking=this.depthPacking),this.linewidth!==void 0&&(i.linewidth=this.linewidth),this.linecap!==void 0&&(i.linecap=this.linecap),this.linejoin!==void 0&&(i.linejoin=this.linejoin),this.dashSize!==void 0&&(i.dashSize=this.dashSize),this.gapSize!==void 0&&(i.gapSize=this.gapSize),this.scale!==void 0&&(i.scale=this.scale),this.wireframe!==void 0&&(i.wireframe=this.wireframe),this.wireframeLinewidth!==void 0&&(i.wireframeLinewidth=this.wireframeLinewidth),this.wireframeLinecap!==void 0&&(i.wireframeLinecap=this.wireframeLinecap),this.wireframeLinejoin!==void 0&&(i.wireframeLinejoin=this.wireframeLinejoin),this.flatShading!==void 0&&(i.flatShading=this.flatShading),this.fog!==void 0&&(i.fog=this.fog),Object.keys(this.userData).length>0&&(i.userData=this.userData);function a(r){let s=[];for(let l in r){let o=r[l];delete o.metadata,s.push(o)}return s}if(n){let r=a(t.textures),s=a(t.images);r.length>0&&(i.textures=r),s.length>0&&(i.images=s)}return i}fromJSON(t,n){if(t.uuid!==void 0&&(this.uuid=t.uuid),t.name!==void 0&&(this.name=t.name),t.color!==void 0&&this.color!==void 0&&this.color.setHex(t.color),t.roughness!==void 0&&(this.roughness=t.roughness),t.metalness!==void 0&&(this.metalness=t.metalness),t.sheen!==void 0&&(this.sheen=t.sheen),t.sheenColor!==void 0&&(this.sheenColor=new me().setHex(t.sheenColor)),t.sheenRoughness!==void 0&&(this.sheenRoughness=t.sheenRoughness),t.emissive!==void 0&&this.emissive!==void 0&&this.emissive.setHex(t.emissive),t.specular!==void 0&&this.specular!==void 0&&this.specular.setHex(t.specular),t.specularIntensity!==void 0&&(this.specularIntensity=t.specularIntensity),t.specularColor!==void 0&&this.specularColor!==void 0&&this.specularColor.setHex(t.specularColor),t.shininess!==void 0&&(this.shininess=t.shininess),t.clearcoat!==void 0&&(this.clearcoat=t.clearcoat),t.clearcoatRoughness!==void 0&&(this.clearcoatRoughness=t.clearcoatRoughness),t.diffuseRoughness!==void 0&&(this.diffuseRoughness=t.diffuseRoughness),t.dispersion!==void 0&&(this.dispersion=t.dispersion),t.retroreflectivity!==void 0&&(this.retroreflectivity=t.retroreflectivity),t.iridescence!==void 0&&(this.iridescence=t.iridescence),t.iridescenceIOR!==void 0&&(this.iridescenceIOR=t.iridescenceIOR),t.iridescenceThicknessMinimum!==void 0&&(this.iridescenceThicknessMinimum=t.iridescenceThicknessMinimum),t.iridescenceThicknessMaximum!==void 0&&(this.iridescenceThicknessMaximum=t.iridescenceThicknessMaximum),t.iridescenceThicknessRange!==void 0&&(this.iridescenceThicknessMinimum=t.iridescenceThicknessRange[0],this.iridescenceThicknessMaximum=t.iridescenceThicknessRange[1]),t.transmission!==void 0&&(this.transmission=t.transmission),t.thickness!==void 0&&(this.thickness=t.thickness),t.attenuationDistance!==void 0&&(this.attenuationDistance=t.attenuationDistance),t.attenuationColor!==void 0&&this.attenuationColor!==void 0&&this.attenuationColor.setHex(t.attenuationColor),t.anisotropy!==void 0&&(this.anisotropy=t.anisotropy),t.anisotropyRotation!==void 0&&(this.anisotropyRotation=t.anisotropyRotation),t.fog!==void 0&&(this.fog=t.fog),t.flatShading!==void 0&&(this.flatShading=t.flatShading),t.blending!==void 0&&(this.blending=t.blending),t.combine!==void 0&&(this.combine=t.combine),t.side!==void 0&&(this.side=t.side),t.shadowSide!==void 0&&(this.shadowSide=t.shadowSide),t.opacity!==void 0&&(this.opacity=t.opacity),t.transparent!==void 0&&(this.transparent=t.transparent),t.alphaTest!==void 0&&(this.alphaTest=t.alphaTest),t.alphaHash!==void 0&&(this.alphaHash=t.alphaHash),t.depthFunc!==void 0&&(this.depthFunc=t.depthFunc),t.depthTest!==void 0&&(this.depthTest=t.depthTest),t.depthWrite!==void 0&&(this.depthWrite=t.depthWrite),t.colorWrite!==void 0&&(this.colorWrite=t.colorWrite),t.clippingPlanes!==void 0&&(this.clippingPlanes=t.clippingPlanes.map(i=>new ba().fromJSON(i))),t.clipIntersection!==void 0&&(this.clipIntersection=t.clipIntersection),t.clipShadows!==void 0&&(this.clipShadows=t.clipShadows),t.depthPacking!==void 0&&(this.depthPacking=t.depthPacking),t.blendSrc!==void 0&&(this.blendSrc=t.blendSrc),t.blendDst!==void 0&&(this.blendDst=t.blendDst),t.blendEquation!==void 0&&(this.blendEquation=t.blendEquation),t.blendSrcAlpha!==void 0&&(this.blendSrcAlpha=t.blendSrcAlpha),t.blendDstAlpha!==void 0&&(this.blendDstAlpha=t.blendDstAlpha),t.blendEquationAlpha!==void 0&&(this.blendEquationAlpha=t.blendEquationAlpha),t.blendColor!==void 0&&this.blendColor!==void 0&&this.blendColor.setHex(t.blendColor),t.blendAlpha!==void 0&&(this.blendAlpha=t.blendAlpha),t.stencilWriteMask!==void 0&&(this.stencilWriteMask=t.stencilWriteMask),t.stencilFunc!==void 0&&(this.stencilFunc=t.stencilFunc),t.stencilRef!==void 0&&(this.stencilRef=t.stencilRef),t.stencilFuncMask!==void 0&&(this.stencilFuncMask=t.stencilFuncMask),t.stencilFail!==void 0&&(this.stencilFail=t.stencilFail),t.stencilZFail!==void 0&&(this.stencilZFail=t.stencilZFail),t.stencilZPass!==void 0&&(this.stencilZPass=t.stencilZPass),t.stencilWrite!==void 0&&(this.stencilWrite=t.stencilWrite),t.wireframe!==void 0&&(this.wireframe=t.wireframe),t.wireframeLinewidth!==void 0&&(this.wireframeLinewidth=t.wireframeLinewidth),t.wireframeLinecap!==void 0&&(this.wireframeLinecap=t.wireframeLinecap),t.wireframeLinejoin!==void 0&&(this.wireframeLinejoin=t.wireframeLinejoin),t.rotation!==void 0&&(this.rotation=t.rotation),t.linewidth!==void 0&&(this.linewidth=t.linewidth),t.linecap!==void 0&&(this.linecap=t.linecap),t.linejoin!==void 0&&(this.linejoin=t.linejoin),t.dashSize!==void 0&&(this.dashSize=t.dashSize),t.gapSize!==void 0&&(this.gapSize=t.gapSize),t.scale!==void 0&&(this.scale=t.scale),t.polygonOffset!==void 0&&(this.polygonOffset=t.polygonOffset),t.polygonOffsetFactor!==void 0&&(this.polygonOffsetFactor=t.polygonOffsetFactor),t.polygonOffsetUnits!==void 0&&(this.polygonOffsetUnits=t.polygonOffsetUnits),t.dithering!==void 0&&(this.dithering=t.dithering),t.alphaToCoverage!==void 0&&(this.alphaToCoverage=t.alphaToCoverage),t.premultipliedAlpha!==void 0&&(this.premultipliedAlpha=t.premultipliedAlpha),t.forceSinglePass!==void 0&&(this.forceSinglePass=t.forceSinglePass),t.allowOverride!==void 0&&(this.allowOverride=t.allowOverride),t.visible!==void 0&&(this.visible=t.visible),t.toneMapped!==void 0&&(this.toneMapped=t.toneMapped),t.userData!==void 0&&(this.userData=t.userData),t.vertexColors!==void 0&&(typeof t.vertexColors=="number"?this.vertexColors=t.vertexColors>0:this.vertexColors=t.vertexColors),t.size!==void 0&&(this.size=t.size),t.sizeAttenuation!==void 0&&(this.sizeAttenuation=t.sizeAttenuation),t.map!==void 0&&(this.map=n[t.map]||null),t.matcap!==void 0&&(this.matcap=n[t.matcap]||null),t.alphaMap!==void 0&&(this.alphaMap=n[t.alphaMap]||null),t.bumpMap!==void 0&&(this.bumpMap=n[t.bumpMap]||null),t.bumpScale!==void 0&&(this.bumpScale=t.bumpScale),t.normalMap!==void 0&&(this.normalMap=n[t.normalMap]||null),t.normalMapType!==void 0&&(this.normalMapType=t.normalMapType),t.normalScale!==void 0){let i=t.normalScale;Array.isArray(i)===!1&&(i=[i,i]),this.normalScale=new Ot().fromArray(i)}return t.displacementMap!==void 0&&(this.displacementMap=n[t.displacementMap]||null),t.displacementScale!==void 0&&(this.displacementScale=t.displacementScale),t.displacementBias!==void 0&&(this.displacementBias=t.displacementBias),t.roughnessMap!==void 0&&(this.roughnessMap=n[t.roughnessMap]||null),t.metalnessMap!==void 0&&(this.metalnessMap=n[t.metalnessMap]||null),t.emissiveMap!==void 0&&(this.emissiveMap=n[t.emissiveMap]||null),t.emissiveIntensity!==void 0&&(this.emissiveIntensity=t.emissiveIntensity),t.specularMap!==void 0&&(this.specularMap=n[t.specularMap]||null),t.specularIntensityMap!==void 0&&(this.specularIntensityMap=n[t.specularIntensityMap]||null),t.specularColorMap!==void 0&&(this.specularColorMap=n[t.specularColorMap]||null),t.envMap!==void 0&&(this.envMap=n[t.envMap]||null),t.envMapRotation!==void 0&&this.envMapRotation.fromArray(t.envMapRotation),t.envMapIntensity!==void 0&&(this.envMapIntensity=t.envMapIntensity),t.reflectivity!==void 0&&(this.reflectivity=t.reflectivity),t.refractionRatio!==void 0&&(this.refractionRatio=t.refractionRatio),t.lightMap!==void 0&&(this.lightMap=n[t.lightMap]||null),t.lightMapIntensity!==void 0&&(this.lightMapIntensity=t.lightMapIntensity),t.aoMap!==void 0&&(this.aoMap=n[t.aoMap]||null),t.aoMapIntensity!==void 0&&(this.aoMapIntensity=t.aoMapIntensity),t.gradientMap!==void 0&&(this.gradientMap=n[t.gradientMap]||null),t.clearcoatMap!==void 0&&(this.clearcoatMap=n[t.clearcoatMap]||null),t.clearcoatRoughnessMap!==void 0&&(this.clearcoatRoughnessMap=n[t.clearcoatRoughnessMap]||null),t.clearcoatNormalMap!==void 0&&(this.clearcoatNormalMap=n[t.clearcoatNormalMap]||null),t.clearcoatNormalScale!==void 0&&(this.clearcoatNormalScale=new Ot().fromArray(t.clearcoatNormalScale)),t.diffuseRoughnessMap!==void 0&&(this.diffuseRoughnessMap=n[t.diffuseRoughnessMap]||null),t.iridescenceMap!==void 0&&(this.iridescenceMap=n[t.iridescenceMap]||null),t.iridescenceThicknessMap!==void 0&&(this.iridescenceThicknessMap=n[t.iridescenceThicknessMap]||null),t.transmissionMap!==void 0&&(this.transmissionMap=n[t.transmissionMap]||null),t.thicknessMap!==void 0&&(this.thicknessMap=n[t.thicknessMap]||null),t.anisotropyMap!==void 0&&(this.anisotropyMap=n[t.anisotropyMap]||null),t.sheenColorMap!==void 0&&(this.sheenColorMap=n[t.sheenColorMap]||null),t.sheenRoughnessMap!==void 0&&(this.sheenRoughnessMap=n[t.sheenRoughnessMap]||null),this}clone(){return new this.constructor().copy(this)}copy(t){this.name=t.name,this.blending=t.blending,this.side=t.side,this.vertexColors=t.vertexColors,this.opacity=t.opacity,this.transparent=t.transparent,this.blendSrc=t.blendSrc,this.blendDst=t.blendDst,this.blendEquation=t.blendEquation,this.blendSrcAlpha=t.blendSrcAlpha,this.blendDstAlpha=t.blendDstAlpha,this.blendEquationAlpha=t.blendEquationAlpha,this.blendColor.copy(t.blendColor),this.blendAlpha=t.blendAlpha,this.depthFunc=t.depthFunc,this.depthTest=t.depthTest,this.depthWrite=t.depthWrite,this.stencilWriteMask=t.stencilWriteMask,this.stencilFunc=t.stencilFunc,this.stencilRef=t.stencilRef,this.stencilFuncMask=t.stencilFuncMask,this.stencilFail=t.stencilFail,this.stencilZFail=t.stencilZFail,this.stencilZPass=t.stencilZPass,this.stencilWrite=t.stencilWrite;let n=t.clippingPlanes,i=null;if(n!==null){let a=n.length;i=new Array(a);for(let r=0;r!==a;++r)i[r]=n[r].clone()}return this.clippingPlanes=i,this.clipIntersection=t.clipIntersection,this.clipShadows=t.clipShadows,this.shadowSide=t.shadowSide,this.colorWrite=t.colorWrite,this.precision=t.precision,this.polygonOffset=t.polygonOffset,this.polygonOffsetFactor=t.polygonOffsetFactor,this.polygonOffsetUnits=t.polygonOffsetUnits,this.dithering=t.dithering,this.alphaTest=t.alphaTest,this.alphaHash=t.alphaHash,this.alphaToCoverage=t.alphaToCoverage,this.premultipliedAlpha=t.premultipliedAlpha,this.forceSinglePass=t.forceSinglePass,this.allowOverride=t.allowOverride,this.visible=t.visible,this.toneMapped=t.toneMapped,this.userData=JSON.parse(JSON.stringify(t.userData)),this}dispose(){this.dispatchEvent({type:"dispose"})}set needsUpdate(t){t===!0&&this.version++}};var Rr=new q,Bv=new q,fd=new q,hd=new q,Pu=class{constructor(t=new q,n=new q(0,0,-1)){this.origin=t,this.direction=n}set(t,n){return this.origin.copy(t),this.direction.copy(n),this}copy(t){return this.origin.copy(t.origin),this.direction.copy(t.direction),this}at(t,n){return n.copy(this.origin).addScaledVector(this.direction,t)}lookAt(t){return this.direction.copy(t).sub(this.origin).normalize(),this}recast(t){return this.origin.copy(this.at(t,Rr)),this}closestPointToPoint(t,n){n.subVectors(t,this.origin);let i=n.dot(this.direction);return i<0?n.copy(this.origin):n.copy(this.origin).addScaledVector(this.direction,i)}distanceToPoint(t){return Math.sqrt(this.distanceSqToPoint(t))}distanceSqToPoint(t){let n=Rr.subVectors(t,this.origin).dot(this.direction);return n<0?this.origin.distanceToSquared(t):(Rr.copy(this.origin).addScaledVector(this.direction,n),Rr.distanceToSquared(t))}distanceSqToSegment(t,n,i,a){Bv.copy(t).add(n).multiplyScalar(.5),fd.copy(n).sub(t).normalize(),hd.copy(this.origin).sub(Bv);let r=t.distanceTo(n)*.5,s=-this.direction.dot(fd),l=hd.dot(this.direction),o=-hd.dot(fd),c=hd.lengthSq(),u=Math.abs(1-s*s),p,f,h,g;if(u>0)if(p=s*o-l,f=s*l-o,g=r*u,p>=0)if(f>=-g)if(f<=g){let M=1/u;p*=M,f*=M,h=p*(p+s*f+2*l)+f*(s*p+f+2*o)+c}else f=r,p=Math.max(0,-(s*f+l)),h=-p*p+f*(f+2*o)+c;else f=-r,p=Math.max(0,-(s*f+l)),h=-p*p+f*(f+2*o)+c;else f<=-g?(p=Math.max(0,-(-s*r+l)),f=p>0?-r:Math.min(Math.max(-r,-o),r),h=-p*p+f*(f+2*o)+c):f<=g?(p=0,f=Math.min(Math.max(-r,-o),r),h=f*(f+2*o)+c):(p=Math.max(0,-(s*r+l)),f=p>0?r:Math.min(Math.max(-r,-o),r),h=-p*p+f*(f+2*o)+c);else f=s>0?-r:r,p=Math.max(0,-(s*f+l)),h=-p*p+f*(f+2*o)+c;return i&&i.copy(this.origin).addScaledVector(this.direction,p),a&&a.copy(Bv).addScaledVector(fd,f),h}intersectSphere(t,n){if(t.radius<0)return null;Rr.subVectors(t.center,this.origin);let i=Rr.dot(this.direction),a=Rr.dot(Rr)-i*i,r=t.radius*t.radius;if(a>r)return null;let s=Math.sqrt(r-a),l=i-s,o=i+s;return o<0?null:l<0?this.at(o,n):this.at(l,n)}intersectsSphere(t){return t.radius<0?!1:this.distanceSqToPoint(t.center)<=t.radius*t.radius}distanceToPlane(t){let n=t.normal.dot(this.direction);if(n===0)return t.distanceToPoint(this.origin)===0?0:null;let i=-(this.origin.dot(t.normal)+t.constant)/n;return i>=0?i:null}intersectPlane(t,n){let i=this.distanceToPlane(t);return i===null?null:this.at(i,n)}intersectsPlane(t){let n=t.distanceToPoint(this.origin);return n===0||t.normal.dot(this.direction)*n<0}intersectBox(t,n){let i,a,r,s,l,o,c=1/this.direction.x,u=1/this.direction.y,p=1/this.direction.z,f=this.origin;return c>=0?(i=(t.min.x-f.x)*c,a=(t.max.x-f.x)*c):(i=(t.max.x-f.x)*c,a=(t.min.x-f.x)*c),u>=0?(r=(t.min.y-f.y)*u,s=(t.max.y-f.y)*u):(r=(t.max.y-f.y)*u,s=(t.min.y-f.y)*u),i>s||r>a||((r>i||isNaN(i))&&(i=r),(s<a||isNaN(a))&&(a=s),p>=0?(l=(t.min.z-f.z)*p,o=(t.max.z-f.z)*p):(l=(t.max.z-f.z)*p,o=(t.min.z-f.z)*p),i>o||l>a)||((l>i||i!==i)&&(i=l),(o<a||a!==a)&&(a=o),a<0)?null:this.at(i>=0?i:a,n)}intersectsBox(t){return this.intersectBox(t,Rr)!==null}intersectTriangle(t,n,i,a,r){let s=this.origin,l=this.direction,o=l.x,c=l.y,u=l.z,p=t.x-s.x,f=t.y-s.y,h=t.z-s.z,g=n.x-s.x,M=n.y-s.y,v=n.z-s.z,d=i.x-s.x,x=i.y-s.y,b=i.z-s.z,y=Math.abs(o),w=Math.abs(c),T=Math.abs(u),m,S,C,D,R,Z,tt,z,J,j,B,ot;if(y>=w&&y>=T?(C=o,Z=p,J=g,ot=d,o>=0?(m=c,S=u,D=f,R=h,tt=M,z=v,j=x,B=b):(m=u,S=c,D=h,R=f,tt=v,z=M,j=b,B=x)):w>=T?(C=c,Z=f,J=M,ot=x,c>=0?(m=u,S=o,D=h,R=p,tt=v,z=g,j=b,B=d):(m=o,S=u,D=p,R=h,tt=g,z=v,j=d,B=b)):(C=u,Z=h,J=v,ot=b,u>=0?(m=o,S=c,D=p,R=f,tt=g,z=M,j=d,B=x):(m=c,S=o,D=f,R=p,tt=M,z=g,j=x,B=d)),C===0)return null;let k=m/C,Y=S/C,N=1/C,yt=D-k*Z,Dt=R-Y*Z,lt=tt-k*J,_t=z-Y*J,Ct=j-k*ot,Ft=B-Y*ot,Lt=Ct*_t-Ft*lt,gt=yt*Ft-Dt*Ct,Zt=lt*Dt-_t*yt;if(a){if(Lt<0||gt<0||Zt<0)return null}else if((Lt<0||gt<0||Zt<0)&&(Lt>0||gt>0||Zt>0))return null;let I=Lt+gt+Zt;if(I===0)return null;let jt=N*(Lt*Z+gt*J+Zt*ot);return(I>0?jt<0:jt>0)?null:this.at(jt/I,r)}applyMatrix4(t){return this.origin.applyMatrix4(t),this.direction.transformDirection(t),this}equals(t){return t.origin.equals(this.origin)&&t.direction.equals(this.direction)}clone(){return new this.constructor().copy(this)}},Kl=class extends Ss{constructor(t){super(),this.isMeshBasicMaterial=!0,this.type="MeshBasicMaterial",this.color=new me(16777215),this.map=null,this.lightMap=null,this.lightMapIntensity=1,this.aoMap=null,this.aoMapIntensity=1,this.specularMap=null,this.alphaMap=null,this.envMap=null,this.envMapRotation=new Nr,this.combine=cx,this.reflectivity=1,this.refractionRatio=.98,this.wireframe=!1,this.wireframeLinewidth=1,this.wireframeLinecap="round",this.wireframeLinejoin="round",this.fog=!0,this.setValues(t)}copy(t){return super.copy(t),this.color.copy(t.color),this.map=t.map,this.lightMap=t.lightMap,this.lightMapIntensity=t.lightMapIntensity,this.aoMap=t.aoMap,this.aoMapIntensity=t.aoMapIntensity,this.specularMap=t.specularMap,this.alphaMap=t.alphaMap,this.envMap=t.envMap,this.envMapRotation.copy(t.envMapRotation),this.combine=t.combine,this.reflectivity=t.reflectivity,this.refractionRatio=t.refractionRatio,this.wireframe=t.wireframe,this.wireframeLinewidth=t.wireframeLinewidth,this.wireframeLinecap=t.wireframeLinecap,this.wireframeLinejoin=t.wireframeLinejoin,this.fog=t.fog,this}},QM=new Ye,fo=new Pu,dd=new Jl,$M=new q,pd=new q,md=new q,gd=new q,Hv=new q,vd=new q,tE=new q,xd=new q,wn=class extends fi{constructor(t=new ki,n=new Kl){super(),this.isMesh=!0,this.type="Mesh",this.geometry=t,this.material=n,this.morphTargetDictionary=void 0,this.morphTargetInfluences=void 0,this.count=1,this.updateMorphTargets()}copy(t,n){return super.copy(t,n),t.morphTargetInfluences!==void 0?this.morphTargetInfluences=t.morphTargetInfluences.slice():this.morphTargetInfluences=void 0,t.morphTargetDictionary!==void 0?this.morphTargetDictionary=Object.assign({},t.morphTargetDictionary):this.morphTargetDictionary=void 0,this.material=Array.isArray(t.material)?t.material.slice():t.material,this.geometry=t.geometry,this}updateMorphTargets(){let n=this.geometry.morphAttributes,i=Object.keys(n);if(i.length>0){let a=n[i[0]];if(a!==void 0){this.morphTargetInfluences=[],this.morphTargetDictionary={};for(let r=0,s=a.length;r<s;r++){let l=a[r].name||String(r);this.morphTargetInfluences.push(0),this.morphTargetDictionary[l]=r}}}}getVertexPosition(t,n){let i=this.geometry,a=i.attributes.position,r=i.morphAttributes.position,s=i.morphTargetsRelative;n.fromBufferAttribute(a,t);let l=this.morphTargetInfluences;if(r&&l){vd.set(0,0,0);for(let o=0,c=r.length;o<c;o++){let u=l[o],p=r[o];u!==0&&(Hv.fromBufferAttribute(p,t),s?vd.addScaledVector(Hv,u):vd.addScaledVector(Hv.sub(n),u))}n.add(vd)}return n}intersectsFrustum(t){return t.intersectsObject(this)}raycast(t,n){let i=this.geometry,a=this.material,r=this.matrixWorld;a!==void 0&&(i.boundingSphere===null&&i.computeBoundingSphere(),dd.copy(i.boundingSphere),dd.applyMatrix4(r),fo.copy(t.ray).recast(t.near),!(dd.containsPoint(fo.origin)===!1&&(fo.intersectSphere(dd,$M)===null||fo.origin.distanceToSquared($M)>(t.far-t.near)**2))&&(QM.copy(r).invert(),fo.copy(t.ray).applyMatrix4(QM),!(i.boundingBox!==null&&fo.intersectsBox(i.boundingBox)===!1)&&this._computeIntersections(t,n,fo)))}_computeIntersections(t,n,i){let a,r=this.geometry,s=this.material,l=r.index,o=r.attributes.position,c=r.attributes.uv,u=r.attributes.uv1,p=r.attributes.normal,f=r.groups,h=r.drawRange;if(l!==null)if(Array.isArray(s))for(let g=0,M=f.length;g<M;g++){let v=f[g],d=s[v.materialIndex],x=Math.max(v.start,h.start),b=Math.min(l.count,Math.min(v.start+v.count,h.start+h.count));for(let y=x,w=b;y<w;y+=3){let T=l.getX(y),m=l.getX(y+1),S=l.getX(y+2);a=yd(this,d,t,i,c,u,p,T,m,S),a&&(a.faceIndex=Math.floor(y/3),a.face.materialIndex=v.materialIndex,n.push(a))}}else{let g=Math.max(0,h.start),M=Math.min(l.count,h.start+h.count);for(let v=g,d=M;v<d;v+=3){let x=l.getX(v),b=l.getX(v+1),y=l.getX(v+2);a=yd(this,s,t,i,c,u,p,x,b,y),a&&(a.faceIndex=Math.floor(v/3),n.push(a))}}else if(o!==void 0)if(Array.isArray(s))for(let g=0,M=f.length;g<M;g++){let v=f[g],d=s[v.materialIndex],x=Math.max(v.start,h.start),b=Math.min(o.count,Math.min(v.start+v.count,h.start+h.count));for(let y=x,w=b;y<w;y+=3){let T=y,m=y+1,S=y+2;a=yd(this,d,t,i,c,u,p,T,m,S),a&&(a.faceIndex=Math.floor(y/3),a.face.materialIndex=v.materialIndex,n.push(a))}}else{let g=Math.max(0,h.start),M=Math.min(o.count,h.start+h.count);for(let v=g,d=M;v<d;v+=3){let x=v,b=v+1,y=v+2;a=yd(this,s,t,i,c,u,p,x,b,y),a&&(a.faceIndex=Math.floor(v/3),n.push(a))}}}};function IC(e,t,n,i,a,r,s,l){let o;if(t.side===hi?o=i.intersectTriangle(s,r,a,!0,l):o=i.intersectTriangle(a,r,s,t.side===Cs,l),o===null)return null;xd.copy(l),xd.applyMatrix4(e.matrixWorld);let c=n.ray.origin.distanceTo(xd);return c<n.near||c>n.far?null:{distance:c,point:xd.clone(),object:e}}function yd(e,t,n,i,a,r,s,l,o,c){e.getVertexPosition(l,pd),e.getVertexPosition(o,md),e.getVertexPosition(c,gd);let u=IC(e,t,n,i,pd,md,gd,tE);if(u){let p=new q;_s.getBarycoord(tE,pd,md,gd,p),a&&(u.uv=_s.getInterpolatedAttribute(a,l,o,c,p,new Ot)),r&&(u.uv1=_s.getInterpolatedAttribute(r,l,o,c,p,new Ot)),s&&(u.normal=_s.getInterpolatedAttribute(s,l,o,c,p,new q),u.normal.dot(i.direction)>0&&u.normal.multiplyScalar(-1));let f={a:l,b:o,c,normal:new q,materialIndex:0};_s.getNormal(pd,md,gd,f.normal),u.face=f,u.barycoord=p}return u}var jl=class extends ui{constructor(t=null,n=1,i=1,a,r,s,l,o,c=In,u=In,p,f){super(null,s,l,o,c,u,a,r,p,f),this.isDataTexture=!0,this.image={data:t,width:n,height:i},this.generateMipmaps=!1,this.flipY=!1,this.unpackAlignment=1}};var ho=new Jl,OC=new Ot(.5,.5),_d=new q,Ms=class{constructor(t=new ba,n=new ba,i=new ba,a=new ba,r=new ba,s=new ba){this.planes=[t,n,i,a,r,s]}set(t,n,i,a,r,s){let l=this.planes;return l[0].copy(t),l[1].copy(n),l[2].copy(i),l[3].copy(a),l[4].copy(r),l[5].copy(s),this}copy(t){let n=this.planes;for(let i=0;i<6;i++)n[i].copy(t.planes[i]);return this}setFromProjectionMatrix(t,n=ca,i=!1){let a=this.planes,r=t.elements,s=r[0],l=r[1],o=r[2],c=r[3],u=r[4],p=r[5],f=r[6],h=r[7],g=r[8],M=r[9],v=r[10],d=r[11],x=r[12],b=r[13],y=r[14],w=r[15];if(a[0].setComponents(c-s,h-u,d-g,w-x).normalize(),a[1].setComponents(c+s,h+u,d+g,w+x).normalize(),a[2].setComponents(c+l,h+p,d+M,w+b).normalize(),a[3].setComponents(c-l,h-p,d-M,w-b).normalize(),i)a[4].setComponents(o,f,v,y).normalize(),a[5].setComponents(c-o,h-f,d-v,w-y).normalize();else if(a[4].setComponents(c-o,h-f,d-v,w-y).normalize(),n===ca)a[5].setComponents(c+o,h+f,d+v,w+y).normalize();else if(n===kl)a[5].setComponents(o,f,v,y).normalize();else throw new Error("THREE.Frustum.setFromProjectionMatrix(): Invalid coordinate system: "+n);return this}intersectsObject(t){if(t.boundingSphere!==void 0)t.boundingSphere===null&&t.computeBoundingSphere(),ho.copy(t.boundingSphere).applyMatrix4(t.matrixWorld);else{let n=t.geometry;n.boundingSphere===null&&n.computeBoundingSphere(),ho.copy(n.boundingSphere).applyMatrix4(t.matrixWorld)}return this.intersectsSphere(ho)}intersectsSprite(t){ho.center.set(0,0,0);let n=OC.distanceTo(t.center);return ho.radius=.7071067811865476+n,ho.applyMatrix4(t.matrixWorld),this.intersectsSphere(ho)}intersectsSphere(t){let n=this.planes,i=t.center,a=-t.radius;for(let r=0;r<6;r++)if(n[r].distanceToPoint(i)<a)return!1;return!0}intersectsBox(t){let n=this.planes;for(let i=0;i<6;i++){let a=n[i];if(_d.x=a.normal.x>0?t.max.x:t.min.x,_d.y=a.normal.y>0?t.max.y:t.min.y,_d.z=a.normal.z>0?t.max.z:t.min.z,a.distanceToPoint(_d)<0)return!1}return!0}containsPoint(t){let n=this.planes;for(let i=0;i<6;i++)if(n[i].distanceToPoint(t)<0)return!1;return!0}clone(){return new this.constructor().copy(this)}},eE=new Ye,Gd=class e{constructor(){this.coordinateSystem=ca,this._frustums=[],this._count=0}setFromArrayCamera(t){let n=t.cameras,i=this._frustums;for(let a=0;a<n.length;a++){let r=n[a];eE.multiplyMatrices(r.projectionMatrix,r.matrixWorldInverse),i[a]===void 0&&(i[a]=new Ms),i[a].setFromProjectionMatrix(eE,r.coordinateSystem,r.reversedDepth)}return this._count=n.length,this}getFrustum(t){return this._frustums[t]}intersectsObject(t){let n=this._frustums;for(let i=0;i<this._count;i++)if(n[i].intersectsObject(t))return!0;return!1}intersectsSprite(t){let n=this._frustums;for(let i=0;i<this._count;i++)if(n[i].intersectsSprite(t))return!0;return!1}intersectsSphere(t){let n=this._frustums;for(let i=0;i<this._count;i++)if(n[i].intersectsSphere(t))return!0;return!1}intersectsBox(t){let n=this._frustums;for(let i=0;i<this._count;i++)if(n[i].intersectsBox(t))return!0;return!1}containsPoint(t){let n=this._frustums;for(let i=0;i<this._count;i++)if(n[i].containsPoint(t))return!0;return!1}copy(t){this.coordinateSystem=t.coordinateSystem;let n=this._frustums,i=t._frustums;for(let a=0;a<t._count;a++)n[a]===void 0&&(n[a]=new Ms),n[a].copy(i[a]);return this._count=t._count,this}clone(){return new e().copy(this)}};var zu=class extends ui{constructor(t=[],n=bo,i,a,r,s,l,o,c,u){super(t,n,i,a,r,s,l,o,c,u),this.isCubeTexture=!0,this.flipY=!1}get images(){return this.image}set images(t){this.image=t}},mo=class extends ui{constructor(t,n,i,a,r,s,l,o,c){super(t,n,i,a,r,s,l,o,c),this.isCanvasTexture=!0,this.needsUpdate=!0}};var Lr=class extends ui{constructor(t,n,i=Ma,a,r,s,l=In,o=In,c,u=Dr,p=1){if(u!==Dr&&u!==Ur)throw new Error("THREE.DepthTexture: format must be either THREE.DepthFormat or THREE.DepthStencilFormat");let f={width:t,height:n,depth:p};super(f,a,r,s,l,o,u,i,c),this.isDepthTexture=!0,this.flipY=!1,this.generateMipmaps=!1,this.compareFunction=null}copy(t){return super.copy(t),this.source=new Wl(Object.assign({},t.image)),this.compareFunction=t.compareFunction,this}toJSON(t){let n=super.toJSON(t);return n.compareFunction=this.compareFunction,n}},Fu=class extends Lr{constructor(t,n=Ma,i=bo,a,r,s=In,l=In,o,c=Dr){let u={width:t,height:t,depth:1},p=[u,u,u,u,u,u];super(t,t,n,i,a,r,s,l,o,c),this.image=p,this.isCubeDepthTexture=!0,this.isCubeTexture=!0}get images(){return this.image}set images(t){this.image=t}},Bu=class extends ui{constructor(t=null){super(),this.sourceTexture=t,this.isExternalTexture=!0}copy(t){return super.copy(t),this.sourceTexture=t.sourceTexture,this}},Ql=class e extends ki{constructor(t=1,n=1,i=1,a=1,r=1,s=1){super(),this.type="BoxGeometry",this.parameters={width:t,height:n,depth:i,widthSegments:a,heightSegments:r,depthSegments:s};let l=this;a=Math.floor(a),r=Math.floor(r),s=Math.floor(s);let o=[],c=[],u=[],p=[],f=0,h=0;g("z","y","x",-1,-1,i,n,t,s,r,0),g("z","y","x",1,-1,i,n,-t,s,r,1),g("x","z","y",1,1,t,i,n,a,s,2),g("x","z","y",1,-1,t,i,-n,a,s,3),g("x","y","z",1,-1,t,n,i,a,r,4),g("x","y","z",-1,-1,t,n,-i,a,r,5),this.setIndex(o),this.setAttribute("position",new bn(c,3)),this.setAttribute("normal",new bn(u,3)),this.setAttribute("uv",new bn(p,2));function g(M,v,d,x,b,y,w,T,m,S,C){let D=y/m,R=w/S,Z=y/2,tt=w/2,z=T/2,J=m+1,j=S+1,B=0,ot=0,k=new q;for(let Y=0;Y<j;Y++){let N=Y*R-tt;for(let yt=0;yt<J;yt++){let Dt=yt*D-Z;k[M]=Dt*x,k[v]=N*b,k[d]=z,c.push(k.x,k.y,k.z),k[M]=0,k[v]=0,k[d]=T>0?1:-1,u.push(k.x,k.y,k.z),p.push(yt/m),p.push(1-Y/S),B+=1}}for(let Y=0;Y<S;Y++)for(let N=0;N<m;N++){let yt=f+N+J*Y,Dt=f+N+J*(Y+1),lt=f+(N+1)+J*(Y+1),_t=f+(N+1)+J*Y;o.push(yt,Dt,_t),o.push(Dt,lt,_t),ot+=6}l.addGroup(h,ot,C),h+=ot,f+=B}}copy(t){return super.copy(t),this.parameters=Object.assign({},t.parameters),this}static fromJSON(t){return new e(t.width,t.height,t.depth,t.widthSegments,t.heightSegments,t.depthSegments)}};var Xi=class{constructor(){this.type="Curve",this.arcLengthDivisions=200,this.needsUpdate=!1,this.cacheArcLengths=null}getPoint(){ce("Curve: .getPoint() not implemented.")}getPointAt(t,n){let i=this.getUtoTmapping(t);return this.getPoint(i,n)}getPoints(t=5){let n=[];for(let i=0;i<=t;i++)n.push(this.getPoint(i/t));return n}getSpacedPoints(t=5){let n=[];for(let i=0;i<=t;i++)n.push(this.getPointAt(i/t));return n}getLength(){let t=this.getLengths();return t[t.length-1]}getLengths(t=this.arcLengthDivisions){if(this.cacheArcLengths&&this.cacheArcLengths.length===t+1&&!this.needsUpdate)return this.cacheArcLengths;this.needsUpdate=!1;let n=[],i,a=this.getPoint(0),r=0;n.push(0);for(let s=1;s<=t;s++)i=this.getPoint(s/t),r+=i.distanceTo(a),n.push(r),a=i;return this.cacheArcLengths=n,n}updateArcLengths(){this.needsUpdate=!0,this.getLengths()}getUtoTmapping(t,n=null){let i=this.getLengths(),a=0,r=i.length,s;n?s=n:s=t*i[r-1];let l=0,o=r-1,c;for(;l<=o;)if(a=Math.floor(l+(o-l)/2),c=i[a]-s,c<0)l=a+1;else if(c>0)o=a-1;else{o=a;break}if(a=o,i[a]===s)return a/(r-1);let u=i[a],f=i[a+1]-u,h=(s-u)/f;return(a+h)/(r-1)}getTangent(t,n){let a=t-1e-4,r=t+1e-4;a<0&&(a=0),r>1&&(r=1);let s=this.getPoint(a),l=this.getPoint(r),o=n||(s.isVector2?new Ot:new q);return o.copy(l).sub(s).normalize(),o}getTangentAt(t,n){let i=this.getUtoTmapping(t);return this.getTangent(i,n)}computeFrenetFrames(t,n=!1){let i=new q,a=[],r=[],s=[],l=new q,o=new Ye;for(let h=0;h<=t;h++){let g=h/t;a[h]=this.getTangentAt(g,new q)}r[0]=new q,s[0]=new q;let c=Number.MAX_VALUE,u=Math.abs(a[0].x),p=Math.abs(a[0].y),f=Math.abs(a[0].z);u<=c&&(c=u,i.set(1,0,0)),p<=c&&(c=p,i.set(0,1,0)),f<=c&&i.set(0,0,1),l.crossVectors(a[0],i).normalize(),r[0].crossVectors(a[0],l),s[0].crossVectors(a[0],r[0]);for(let h=1;h<=t;h++){if(r[h]=r[h-1].clone(),s[h]=s[h-1].clone(),l.crossVectors(a[h-1],a[h]),l.length()>Number.EPSILON){l.normalize();let g=Math.acos(Te(a[h-1].dot(a[h]),-1,1));r[h].applyMatrix4(o.makeRotationAxis(l,g))}s[h].crossVectors(a[h],r[h])}if(n===!0){let h=Math.acos(Te(r[0].dot(r[t]),-1,1));h/=t,a[0].dot(l.crossVectors(r[0],r[t]))>0&&(h=-h);for(let g=1;g<=t;g++)r[g].applyMatrix4(o.makeRotationAxis(a[g],h*g)),s[g].crossVectors(a[g],r[g])}return{tangents:a,normals:r,binormals:s}}clone(){return new this.constructor().copy(this)}copy(t){return this.arcLengthDivisions=t.arcLengthDivisions,this.cacheArcLengths=null,this}toJSON(){let t={metadata:{version:4.7,type:"Curve",generator:"Curve.toJSON"}};return t.arcLengthDivisions=this.arcLengthDivisions,t.type=this.type,t}fromJSON(t){return this.arcLengthDivisions=t.arcLengthDivisions,this.cacheArcLengths=null,this}},$l=class extends Xi{constructor(t=0,n=0,i=1,a=1,r=0,s=Math.PI*2,l=!1,o=0){super(),this.isEllipseCurve=!0,this.type="EllipseCurve",this.aX=t,this.aY=n,this.xRadius=i,this.yRadius=a,this.aStartAngle=r,this.aEndAngle=s,this.aClockwise=l,this.aRotation=o}getPoint(t,n=new Ot){let i=n,a=Math.PI*2,r=this.aEndAngle-this.aStartAngle,s=Math.abs(r)<Number.EPSILON;for(;r<0;)r+=a;for(;r>a;)r-=a;r<Number.EPSILON&&(s?r=0:r=a),this.aClockwise===!0&&!s&&(r===a?r=-a:r=r-a);let l=this.aStartAngle+t*r,o=this.aX+this.xRadius*Math.cos(l),c=this.aY+this.yRadius*Math.sin(l);if(this.aRotation!==0){let u=Math.cos(this.aRotation),p=Math.sin(this.aRotation),f=o-this.aX,h=c-this.aY;o=f*u-h*p+this.aX,c=f*p+h*u+this.aY}return i.set(o,c)}copy(t){return super.copy(t),this.aX=t.aX,this.aY=t.aY,this.xRadius=t.xRadius,this.yRadius=t.yRadius,this.aStartAngle=t.aStartAngle,this.aEndAngle=t.aEndAngle,this.aClockwise=t.aClockwise,this.aRotation=t.aRotation,this}toJSON(){let t=super.toJSON();return t.aX=this.aX,t.aY=this.aY,t.xRadius=this.xRadius,t.yRadius=this.yRadius,t.aStartAngle=this.aStartAngle,t.aEndAngle=this.aEndAngle,t.aClockwise=this.aClockwise,t.aRotation=this.aRotation,t}fromJSON(t){return super.fromJSON(t),this.aX=t.aX,this.aY=t.aY,this.xRadius=t.xRadius,this.yRadius=t.yRadius,this.aStartAngle=t.aStartAngle,this.aEndAngle=t.aEndAngle,this.aClockwise=t.aClockwise,this.aRotation=t.aRotation,this}},Vd=class extends $l{constructor(t,n,i,a,r,s){super(t,n,i,i,a,r,s),this.isArcCurve=!0,this.type="ArcCurve"}};function Dx(){let e=0,t=0,n=0,i=0;function a(r,s,l,o){e=r,t=l,n=-3*r+3*s-2*l-o,i=2*r-2*s+l+o}return{initCatmullRom:function(r,s,l,o,c){a(s,l,c*(l-r),c*(o-s))},initNonuniformCatmullRom:function(r,s,l,o,c,u,p){let f=(s-r)/c-(l-r)/(c+u)+(l-s)/u,h=(l-s)/u-(o-s)/(u+p)+(o-l)/p;f*=u,h*=u,a(s,l,f,h)},calc:function(r){let s=r*r,l=s*r;return e+t*r+n*s+i*l}}}var nE=new q,iE=new q,Gv=new Dx,Vv=new Dx,kv=new Dx,tc=class extends Xi{constructor(t=[],n=!1,i="centripetal",a=.5){super(),this.isCatmullRomCurve3=!0,this.type="CatmullRomCurve3",this.points=t,this.closed=n,this.curveType=i,this.tension=a}getPoint(t,n=new q){let i=n,a=this.points,r=a.length,s=(r-(this.closed?0:1))*t,l=Math.floor(s),o=s-l;this.closed?l+=l>0?0:(Math.floor(Math.abs(l)/r)+1)*r:o===0&&l===r-1&&(l=r-2,o=1);let c,u;this.closed||l>0?c=a[(l-1)%r]:(iE.subVectors(a[0],a[1]).add(a[0]),c=iE);let p=a[l%r],f=a[(l+1)%r];if(this.closed||l+2<r?u=a[(l+2)%r]:(nE.subVectors(a[r-1],a[r-2]).add(a[r-1]),u=nE),this.curveType==="centripetal"||this.curveType==="chordal"){let h=this.curveType==="chordal"?.5:.25,g=Math.pow(c.distanceToSquared(p),h),M=Math.pow(p.distanceToSquared(f),h),v=Math.pow(f.distanceToSquared(u),h);M<1e-4&&(M=1),g<1e-4&&(g=M),v<1e-4&&(v=M),Gv.initNonuniformCatmullRom(c.x,p.x,f.x,u.x,g,M,v),Vv.initNonuniformCatmullRom(c.y,p.y,f.y,u.y,g,M,v),kv.initNonuniformCatmullRom(c.z,p.z,f.z,u.z,g,M,v)}else this.curveType==="catmullrom"&&(Gv.initCatmullRom(c.x,p.x,f.x,u.x,this.tension),Vv.initCatmullRom(c.y,p.y,f.y,u.y,this.tension),kv.initCatmullRom(c.z,p.z,f.z,u.z,this.tension));return i.set(Gv.calc(o),Vv.calc(o),kv.calc(o)),i}copy(t){super.copy(t),this.points=[];for(let n=0,i=t.points.length;n<i;n++){let a=t.points[n];this.points.push(a.clone())}return this.closed=t.closed,this.curveType=t.curveType,this.tension=t.tension,this}toJSON(){let t=super.toJSON();t.points=[];for(let n=0,i=this.points.length;n<i;n++){let a=this.points[n];t.points.push(a.toArray())}return t.closed=this.closed,t.curveType=this.curveType,t.tension=this.tension,t}fromJSON(t){super.fromJSON(t),this.points=[];for(let n=0,i=t.points.length;n<i;n++){let a=t.points[n];this.points.push(new q().fromArray(a))}return this.closed=t.closed,this.curveType=t.curveType,this.tension=t.tension,this}};function aE(e,t,n,i,a){let r=(i-t)*.5,s=(a-n)*.5,l=e*e,o=e*l;return(2*n-2*i+r+s)*o+(-3*n+3*i-2*r-s)*l+r*e+n}function PC(e,t){let n=1-e;return n*n*t}function zC(e,t){return 2*(1-e)*e*t}function FC(e,t){return e*e*t}function Au(e,t,n,i){return PC(e,t)+zC(e,n)+FC(e,i)}function BC(e,t){let n=1-e;return n*n*n*t}function HC(e,t){let n=1-e;return 3*n*n*e*t}function GC(e,t){return 3*(1-e)*e*e*t}function VC(e,t){return e*e*e*t}function Ru(e,t,n,i,a){return BC(e,t)+HC(e,n)+GC(e,i)+VC(e,a)}var Hu=class extends Xi{constructor(t=new Ot,n=new Ot,i=new Ot,a=new Ot){super(),this.isCubicBezierCurve=!0,this.type="CubicBezierCurve",this.v0=t,this.v1=n,this.v2=i,this.v3=a}getPoint(t,n=new Ot){let i=n,a=this.v0,r=this.v1,s=this.v2,l=this.v3;return i.set(Ru(t,a.x,r.x,s.x,l.x),Ru(t,a.y,r.y,s.y,l.y)),i}copy(t){return super.copy(t),this.v0.copy(t.v0),this.v1.copy(t.v1),this.v2.copy(t.v2),this.v3.copy(t.v3),this}toJSON(){let t=super.toJSON();return t.v0=this.v0.toArray(),t.v1=this.v1.toArray(),t.v2=this.v2.toArray(),t.v3=this.v3.toArray(),t}fromJSON(t){return super.fromJSON(t),this.v0.fromArray(t.v0),this.v1.fromArray(t.v1),this.v2.fromArray(t.v2),this.v3.fromArray(t.v3),this}},kd=class extends Xi{constructor(t=new q,n=new q,i=new q,a=new q){super(),this.isCubicBezierCurve3=!0,this.type="CubicBezierCurve3",this.v0=t,this.v1=n,this.v2=i,this.v3=a}getPoint(t,n=new q){let i=n,a=this.v0,r=this.v1,s=this.v2,l=this.v3;return i.set(Ru(t,a.x,r.x,s.x,l.x),Ru(t,a.y,r.y,s.y,l.y),Ru(t,a.z,r.z,s.z,l.z)),i}copy(t){return super.copy(t),this.v0.copy(t.v0),this.v1.copy(t.v1),this.v2.copy(t.v2),this.v3.copy(t.v3),this}toJSON(){let t=super.toJSON();return t.v0=this.v0.toArray(),t.v1=this.v1.toArray(),t.v2=this.v2.toArray(),t.v3=this.v3.toArray(),t}fromJSON(t){return super.fromJSON(t),this.v0.fromArray(t.v0),this.v1.fromArray(t.v1),this.v2.fromArray(t.v2),this.v3.fromArray(t.v3),this}},Gu=class extends Xi{constructor(t=new Ot,n=new Ot){super(),this.isLineCurve=!0,this.type="LineCurve",this.v1=t,this.v2=n}getPoint(t,n=new Ot){let i=n;return t===1?i.copy(this.v2):(i.copy(this.v2).sub(this.v1),i.multiplyScalar(t).add(this.v1)),i}getPointAt(t,n){return this.getPoint(t,n)}getTangent(t,n=new Ot){return n.subVectors(this.v2,this.v1).normalize()}getTangentAt(t,n){return this.getTangent(t,n)}copy(t){return super.copy(t),this.v1.copy(t.v1),this.v2.copy(t.v2),this}toJSON(){let t=super.toJSON();return t.v1=this.v1.toArray(),t.v2=this.v2.toArray(),t}fromJSON(t){return super.fromJSON(t),this.v1.fromArray(t.v1),this.v2.fromArray(t.v2),this}},Xd=class extends Xi{constructor(t=new q,n=new q){super(),this.isLineCurve3=!0,this.type="LineCurve3",this.v1=t,this.v2=n}getPoint(t,n=new q){let i=n;return t===1?i.copy(this.v2):(i.copy(this.v2).sub(this.v1),i.multiplyScalar(t).add(this.v1)),i}getPointAt(t,n){return this.getPoint(t,n)}getTangent(t,n=new q){return n.subVectors(this.v2,this.v1).normalize()}getTangentAt(t,n){return this.getTangent(t,n)}copy(t){return super.copy(t),this.v1.copy(t.v1),this.v2.copy(t.v2),this}toJSON(){let t=super.toJSON();return t.v1=this.v1.toArray(),t.v2=this.v2.toArray(),t}fromJSON(t){return super.fromJSON(t),this.v1.fromArray(t.v1),this.v2.fromArray(t.v2),this}},Vu=class extends Xi{constructor(t=new Ot,n=new Ot,i=new Ot){super(),this.isQuadraticBezierCurve=!0,this.type="QuadraticBezierCurve",this.v0=t,this.v1=n,this.v2=i}getPoint(t,n=new Ot){let i=n,a=this.v0,r=this.v1,s=this.v2;return i.set(Au(t,a.x,r.x,s.x),Au(t,a.y,r.y,s.y)),i}copy(t){return super.copy(t),this.v0.copy(t.v0),this.v1.copy(t.v1),this.v2.copy(t.v2),this}toJSON(){let t=super.toJSON();return t.v0=this.v0.toArray(),t.v1=this.v1.toArray(),t.v2=this.v2.toArray(),t}fromJSON(t){return super.fromJSON(t),this.v0.fromArray(t.v0),this.v1.fromArray(t.v1),this.v2.fromArray(t.v2),this}},Wd=class extends Xi{constructor(t=new q,n=new q,i=new q){super(),this.isQuadraticBezierCurve3=!0,this.type="QuadraticBezierCurve3",this.v0=t,this.v1=n,this.v2=i}getPoint(t,n=new q){let i=n,a=this.v0,r=this.v1,s=this.v2;return i.set(Au(t,a.x,r.x,s.x),Au(t,a.y,r.y,s.y),Au(t,a.z,r.z,s.z)),i}copy(t){return super.copy(t),this.v0.copy(t.v0),this.v1.copy(t.v1),this.v2.copy(t.v2),this}toJSON(){let t=super.toJSON();return t.v0=this.v0.toArray(),t.v1=this.v1.toArray(),t.v2=this.v2.toArray(),t}fromJSON(t){return super.fromJSON(t),this.v0.fromArray(t.v0),this.v1.fromArray(t.v1),this.v2.fromArray(t.v2),this}},ku=class extends Xi{constructor(t=[]){super(),this.isSplineCurve=!0,this.type="SplineCurve",this.points=t}getPoint(t,n=new Ot){let i=n,a=this.points,r=(a.length-1)*t,s=Math.floor(r),l=r-s,o=a[s===0?s:s-1],c=a[s],u=a[s>a.length-2?a.length-1:s+1],p=a[s>a.length-3?a.length-1:s+2];return i.set(aE(l,o.x,c.x,u.x,p.x),aE(l,o.y,c.y,u.y,p.y)),i}copy(t){super.copy(t),this.points=[];for(let n=0,i=t.points.length;n<i;n++){let a=t.points[n];this.points.push(a.clone())}return this}toJSON(){let t=super.toJSON();t.points=[];for(let n=0,i=this.points.length;n<i;n++){let a=this.points[n];t.points.push(a.toArray())}return t}fromJSON(t){super.fromJSON(t),this.points=[];for(let n=0,i=t.points.length;n<i;n++){let a=t.points[n];this.points.push(new Ot().fromArray(a))}return this}},Jv=Object.freeze({__proto__:null,ArcCurve:Vd,CatmullRomCurve3:tc,CubicBezierCurve:Hu,CubicBezierCurve3:kd,EllipseCurve:$l,LineCurve:Gu,LineCurve3:Xd,QuadraticBezierCurve:Vu,QuadraticBezierCurve3:Wd,SplineCurve:ku}),qd=class extends Xi{constructor(){super(),this.type="CurvePath",this.curves=[],this.autoClose=!1,this.cacheLengths=null}add(t){this.curves.push(t)}closePath(){let t=this.curves[0].getPoint(0),n=this.curves[this.curves.length-1].getPoint(1);if(!t.equals(n)){let i=t.isVector2===!0?"LineCurve":"LineCurve3";this.curves.push(new Jv[i](n,t))}return this}getPoint(t,n){let i=t*this.getLength(),a=this.getCurveLengths(),r=0;for(;r<a.length;){if(a[r]>=i){let s=a[r]-i,l=this.curves[r],o=l.getLength(),c=o===0?0:1-s/o;return l.getPointAt(c,n)}r++}return null}getLength(){let t=this.getCurveLengths();return t[t.length-1]}updateArcLengths(){this.needsUpdate=!0,this.cacheLengths=null,this.getCurveLengths()}getCurveLengths(){if(this.cacheLengths&&this.cacheLengths.length===this.curves.length)return this.cacheLengths;let t=[],n=0;for(let i=0,a=this.curves.length;i<a;i++)n+=this.curves[i].getLength(),t.push(n);return this.cacheLengths=t,t}getSpacedPoints(t=40){let n=[];for(let i=0;i<=t;i++)n.push(this.getPoint(i/t));return this.autoClose&&n.push(n[0]),n}getPoints(t=12){let n=[],i;for(let a=0,r=this.curves;a<r.length;a++){let s=r[a],l=s.isEllipseCurve?t*2:s.isLineCurve||s.isLineCurve3?1:s.isSplineCurve?t*s.points.length:t,o=s.getPoints(l);for(let c=0;c<o.length;c++){let u=o[c];i&&i.equals(u)||(n.push(u),i=u)}}return this.autoClose&&n.length>1&&!n[n.length-1].equals(n[0])&&n.push(n[0]),n}copy(t){super.copy(t),this.curves=[];for(let n=0,i=t.curves.length;n<i;n++){let a=t.curves[n];this.curves.push(a.clone())}return this.autoClose=t.autoClose,this.cacheLengths=null,this}toJSON(){let t=super.toJSON();t.autoClose=this.autoClose,t.curves=[];for(let n=0,i=this.curves.length;n<i;n++){let a=this.curves[n];t.curves.push(a.toJSON())}return t}fromJSON(t){super.fromJSON(t),this.autoClose=t.autoClose,this.curves=[];for(let n=0,i=t.curves.length;n<i;n++){let a=t.curves[n];this.curves.push(new Jv[a.type]().fromJSON(a))}return this.cacheLengths=null,this}},go=class extends qd{constructor(t){super(),this.type="Path",this.currentPoint=new Ot,t&&this.setFromPoints(t)}setFromPoints(t){this.moveTo(t[0].x,t[0].y);for(let n=1,i=t.length;n<i;n++)this.lineTo(t[n].x,t[n].y);return this}moveTo(t,n){return this.currentPoint.set(t,n),this}lineTo(t,n){let i=new Gu(this.currentPoint.clone(),new Ot(t,n));return this.curves.push(i),this.currentPoint.set(t,n),this}quadraticCurveTo(t,n,i,a){let r=new Vu(this.currentPoint.clone(),new Ot(t,n),new Ot(i,a));return this.curves.push(r),this.currentPoint.set(i,a),this}bezierCurveTo(t,n,i,a,r,s){let l=new Hu(this.currentPoint.clone(),new Ot(t,n),new Ot(i,a),new Ot(r,s));return this.curves.push(l),this.currentPoint.set(r,s),this}splineThru(t){let n=[this.currentPoint.clone()].concat(t),i=new ku(n);return this.curves.push(i),this.currentPoint.copy(t[t.length-1]),this}arc(t,n,i,a,r,s){let l=this.currentPoint.x,o=this.currentPoint.y;return this.absarc(t+l,n+o,i,a,r,s),this}absarc(t,n,i,a,r,s){return this.absellipse(t,n,i,i,a,r,s),this}ellipse(t,n,i,a,r,s,l,o){let c=this.currentPoint.x,u=this.currentPoint.y;return this.absellipse(t+c,n+u,i,a,r,s,l,o),this}absellipse(t,n,i,a,r,s,l,o){let c=new $l(t,n,i,a,r,s,l,o);if(this.curves.length>0){let p=c.getPoint(0);p.equals(this.currentPoint)||this.lineTo(p.x,p.y)}this.curves.push(c);let u=c.getPoint(1);return this.currentPoint.copy(u),this}copy(t){return super.copy(t),this.currentPoint.copy(t.currentPoint),this}toJSON(){let t=super.toJSON();return t.currentPoint=this.currentPoint.toArray(),t}fromJSON(t){return super.fromJSON(t),this.currentPoint.fromArray(t.currentPoint),this}},Es=class extends go{constructor(t){super(t),this.uuid=fc(),this.type="Shape",this.holes=[]}getPointsHoles(t){let n=[];for(let i=0,a=this.holes.length;i<a;i++)n[i]=this.holes[i].getPoints(t);return n}extractPoints(t){return{shape:this.getPoints(t),holes:this.getPointsHoles(t)}}copy(t){super.copy(t),this.holes=[];for(let n=0,i=t.holes.length;n<i;n++){let a=t.holes[n];this.holes.push(a.clone())}return this}toJSON(){let t=super.toJSON();t.uuid=this.uuid,t.holes=[];for(let n=0,i=this.holes.length;n<i;n++){let a=this.holes[n];t.holes.push(a.toJSON())}return t}fromJSON(t){super.fromJSON(t),this.uuid=t.uuid,this.holes=[];for(let n=0,i=t.holes.length;n<i;n++){let a=t.holes[n];this.holes.push(new go().fromJSON(a))}return this}};function kC(e,t,n=2){let i=t&&t.length,a=i?t[0]*n:e.length,r=nT(e,0,a,n,!0),s=[];if(!r||r.next===r.prev)return s;let l,o,c;if(i&&(r=ZC(e,t,r,n)),e.length>80*n){l=e[0],o=e[1];let u=l,p=o;for(let f=n;f<a;f+=n){let h=e[f],g=e[f+1];h<l&&(l=h),g<o&&(o=g),h>u&&(u=h),g>p&&(p=g)}c=Math.max(u-l,p-o),c=c!==0?32767/c:0}return Xu(r,s,n,l,o,c,0),s}function nT(e,t,n,i,a){let r;if(a===r3(e,t,n,i)>0)for(let s=t;s<n;s+=i)r=rE(s/i|0,e[s],e[s+1],r);else for(let s=n-i;s>=t;s-=i)r=rE(s/i|0,e[s],e[s+1],r);return r&&ec(r,r.next)&&(qu(r),r=r.next),r}function vo(e,t){if(!e)return e;t||(t=e);let n=e,i;do if(i=!1,!n.steiner&&(ec(n,n.next)||fn(n.prev,n,n.next)===0)){if(qu(n),n=t=n.prev,n===n.next)break;i=!0}else n=n.next;while(i||n!==t);return t}function Xu(e,t,n,i,a,r,s){if(!e)return;!s&&r&&$C(e,i,a,r);let l=e;for(;e.prev!==e.next;){let o=e.prev,c=e.next;if(r?WC(e,i,a,r):XC(e)){t.push(o.i,e.i,c.i),qu(e),e=c.next,l=c.next;continue}if(e=c,e===l){s?s===1?(e=qC(vo(e),t),Xu(e,t,n,i,a,r,2)):s===2&&YC(e,t,n,i,a,r):Xu(vo(e),t,n,i,a,r,1);break}}}function XC(e){let t=e.prev,n=e,i=e.next;if(fn(t,n,i)>=0)return!1;let a=t.x,r=n.x,s=i.x,l=t.y,o=n.y,c=i.y,u=Math.min(a,r,s),p=Math.min(l,o,c),f=Math.max(a,r,s),h=Math.max(l,o,c),g=i.next;for(;g!==t;){if(g.x>=u&&g.x<=f&&g.y>=p&&g.y<=h&&wu(a,l,r,o,s,c,g.x,g.y)&&fn(g.prev,g,g.next)>=0)return!1;g=g.next}return!0}function WC(e,t,n,i){let a=e.prev,r=e,s=e.next;if(fn(a,r,s)>=0)return!1;let l=a.x,o=r.x,c=s.x,u=a.y,p=r.y,f=s.y,h=Math.min(l,o,c),g=Math.min(u,p,f),M=Math.max(l,o,c),v=Math.max(u,p,f),d=Kv(h,g,t,n,i),x=Kv(M,v,t,n,i),b=e.prevZ,y=e.nextZ;for(;b&&b.z>=d&&y&&y.z<=x;){if(b.x>=h&&b.x<=M&&b.y>=g&&b.y<=v&&b!==a&&b!==s&&wu(l,u,o,p,c,f,b.x,b.y)&&fn(b.prev,b,b.next)>=0||(b=b.prevZ,y.x>=h&&y.x<=M&&y.y>=g&&y.y<=v&&y!==a&&y!==s&&wu(l,u,o,p,c,f,y.x,y.y)&&fn(y.prev,y,y.next)>=0))return!1;y=y.nextZ}for(;b&&b.z>=d;){if(b.x>=h&&b.x<=M&&b.y>=g&&b.y<=v&&b!==a&&b!==s&&wu(l,u,o,p,c,f,b.x,b.y)&&fn(b.prev,b,b.next)>=0)return!1;b=b.prevZ}for(;y&&y.z<=x;){if(y.x>=h&&y.x<=M&&y.y>=g&&y.y<=v&&y!==a&&y!==s&&wu(l,u,o,p,c,f,y.x,y.y)&&fn(y.prev,y,y.next)>=0)return!1;y=y.nextZ}return!0}function qC(e,t){let n=e;do{let i=n.prev,a=n.next.next;!ec(i,a)&&aT(i,n,n.next,a)&&Wu(i,a)&&Wu(a,i)&&(t.push(i.i,n.i,a.i),qu(n),qu(n.next),n=e=a),n=n.next}while(n!==e);return vo(n)}function YC(e,t,n,i,a,r){let s=e;do{let l=s.next.next;for(;l!==s.prev;){if(s.i!==l.i&&n3(s,l)){let o=rT(s,l);s=vo(s,s.next),o=vo(o,o.next),Xu(s,t,n,i,a,r,0),Xu(o,t,n,i,a,r,0);return}l=l.next}s=s.next}while(s!==e)}function ZC(e,t,n,i){let a=[];for(let r=0,s=t.length;r<s;r++){let l=t[r]*i,o=r<s-1?t[r+1]*i:e.length,c=nT(e,l,o,i,!1);c===c.next&&(c.steiner=!0),a.push(e3(c))}a.sort(JC);for(let r=0;r<a.length;r++)n=KC(a[r],n);return n}function JC(e,t){let n=e.x-t.x;if(n===0&&(n=e.y-t.y,n===0)){let i=(e.next.y-e.y)/(e.next.x-e.x),a=(t.next.y-t.y)/(t.next.x-t.x);n=i-a}return n}function KC(e,t){let n=jC(e,t);if(!n)return t;let i=rT(n,e);return vo(i,i.next),vo(n,n.next)}function jC(e,t){let n=t,i=e.x,a=e.y,r=-1/0,s;if(ec(e,n))return n;do{if(ec(e,n.next))return n.next;if(a<=n.y&&a>=n.next.y&&n.next.y!==n.y){let p=n.x+(a-n.y)*(n.next.x-n.x)/(n.next.y-n.y);if(p<=i&&p>r&&(r=p,s=n.x<n.next.x?n:n.next,p===i))return s}n=n.next}while(n!==t);if(!s)return null;let l=s,o=s.x,c=s.y,u=1/0;n=s;do{if(i>=n.x&&n.x>=o&&i!==n.x&&iT(a<c?i:r,a,o,c,a<c?r:i,a,n.x,n.y)){let p=Math.abs(a-n.y)/(i-n.x);Wu(n,e)&&(p<u||p===u&&(n.x>s.x||n.x===s.x&&QC(s,n)))&&(s=n,u=p)}n=n.next}while(n!==l);return s}function QC(e,t){return fn(e.prev,e,t.prev)<0&&fn(t.next,e,e.next)<0}function $C(e,t,n,i){let a=e;do a.z===0&&(a.z=Kv(a.x,a.y,t,n,i)),a.prevZ=a.prev,a.nextZ=a.next,a=a.next;while(a!==e);a.prevZ.nextZ=null,a.prevZ=null,t3(a)}function t3(e){let t,n=1;do{let i=e,a;e=null;let r=null;for(t=0;i;){t++;let s=i,l=0;for(let c=0;c<n&&(l++,s=s.nextZ,!!s);c++);let o=n;for(;l>0||o>0&&s;)l!==0&&(o===0||!s||i.z<=s.z)?(a=i,i=i.nextZ,l--):(a=s,s=s.nextZ,o--),r?r.nextZ=a:e=a,a.prevZ=r,r=a;i=s}r.nextZ=null,n*=2}while(t>1);return e}function Kv(e,t,n,i,a){return e=(e-n)*a|0,t=(t-i)*a|0,e=(e|e<<8)&16711935,e=(e|e<<4)&252645135,e=(e|e<<2)&858993459,e=(e|e<<1)&1431655765,t=(t|t<<8)&16711935,t=(t|t<<4)&252645135,t=(t|t<<2)&858993459,t=(t|t<<1)&1431655765,e|t<<1}function e3(e){let t=e,n=e;do(t.x<n.x||t.x===n.x&&t.y<n.y)&&(n=t),t=t.next;while(t!==e);return n}function iT(e,t,n,i,a,r,s,l){return(a-s)*(t-l)>=(e-s)*(r-l)&&(e-s)*(i-l)>=(n-s)*(t-l)&&(n-s)*(r-l)>=(a-s)*(i-l)}function wu(e,t,n,i,a,r,s,l){return!(e===s&&t===l)&&iT(e,t,n,i,a,r,s,l)}function n3(e,t){return e.next.i!==t.i&&e.prev.i!==t.i&&!i3(e,t)&&(Wu(e,t)&&Wu(t,e)&&a3(e,t)&&(fn(e.prev,e,t.prev)||fn(e,t.prev,t))||ec(e,t)&&fn(e.prev,e,e.next)>0&&fn(t.prev,t,t.next)>0)}function fn(e,t,n){return(t.y-e.y)*(n.x-t.x)-(t.x-e.x)*(n.y-t.y)}function ec(e,t){return e.x===t.x&&e.y===t.y}function aT(e,t,n,i){let a=Sd(fn(e,t,n)),r=Sd(fn(e,t,i)),s=Sd(fn(n,i,e)),l=Sd(fn(n,i,t));return!!(a!==r&&s!==l||a===0&&bd(e,n,t)||r===0&&bd(e,i,t)||s===0&&bd(n,e,i)||l===0&&bd(n,t,i))}function bd(e,t,n){return t.x<=Math.max(e.x,n.x)&&t.x>=Math.min(e.x,n.x)&&t.y<=Math.max(e.y,n.y)&&t.y>=Math.min(e.y,n.y)}function Sd(e){return e>0?1:e<0?-1:0}function i3(e,t){let n=e;do{if(n.i!==e.i&&n.next.i!==e.i&&n.i!==t.i&&n.next.i!==t.i&&aT(n,n.next,e,t))return!0;n=n.next}while(n!==e);return!1}function Wu(e,t){return fn(e.prev,e,e.next)<0?fn(e,t,e.next)>=0&&fn(e,e.prev,t)>=0:fn(e,t,e.prev)<0||fn(e,e.next,t)<0}function a3(e,t){let n=e,i=!1,a=(e.x+t.x)/2,r=(e.y+t.y)/2;do n.y>r!=n.next.y>r&&n.next.y!==n.y&&a<(n.next.x-n.x)*(r-n.y)/(n.next.y-n.y)+n.x&&(i=!i),n=n.next;while(n!==e);return i}function rT(e,t){let n=jv(e.i,e.x,e.y),i=jv(t.i,t.x,t.y),a=e.next,r=t.prev;return e.next=t,t.prev=e,n.next=a,a.prev=n,i.next=n,n.prev=i,r.next=i,i.prev=r,i}function rE(e,t,n,i){let a=jv(e,t,n);return i?(a.next=i.next,a.prev=i,i.next.prev=a,i.next=a):(a.prev=a,a.next=a),a}function qu(e){e.next.prev=e.prev,e.prev.next=e.next,e.prevZ&&(e.prevZ.nextZ=e.nextZ),e.nextZ&&(e.nextZ.prevZ=e.prevZ)}function jv(e,t,n){return{i:e,x:t,y:n,prev:null,next:null,z:0,prevZ:null,nextZ:null,steiner:!1}}function r3(e,t,n,i){let a=0;for(let r=t,s=n-i;r<n;r+=i)a+=(e[s]-e[r])*(e[r+1]+e[s+1]),s=r;return a}var Qv=class{static triangulate(t,n,i=2){return kC(t,n,i)}},Ja=class e{static area(t){let n=t.length,i=0;for(let a=n-1,r=0;r<n;a=r++)i+=t[a].x*t[r].y-t[r].x*t[a].y;return i*.5}static isClockWise(t){return e.area(t)<0}static triangulateShape(t,n){let i=[],a=[],r=[];sE(t),oE(i,t);let s=t.length;n.forEach(sE);for(let o=0;o<n.length;o++)a.push(s),s+=n[o].length,oE(i,n[o]);let l=Qv.triangulate(i,a);for(let o=0;o<l.length;o+=3)r.push(l.slice(o,o+3));return r}};function sE(e){let t=e.length;t>2&&e[t-1].equals(e[0])&&e.pop()}function oE(e,t){for(let n=0;n<t.length;n++)e.push(t[n].x),e.push(t[n].y)}var nc=class e extends ki{constructor(t=new Es([new Ot(.5,.5),new Ot(-.5,.5),new Ot(-.5,-.5),new Ot(.5,-.5)]),n={}){super(),this.type="ExtrudeGeometry",this.parameters={shapes:t,options:n},t=Array.isArray(t)?t:[t];let i=this,a=[],r=[];for(let l=0,o=t.length;l<o;l++){let c=t[l];s(c)}this.setAttribute("position",new bn(a,3)),this.setAttribute("uv",new bn(r,2)),this.computeVertexNormals();function s(l){let o=[],c=n.curveSegments!==void 0?n.curveSegments:12,u=n.steps!==void 0?n.steps:1,p=n.depth!==void 0?n.depth:1,f=n.bevelEnabled!==void 0?n.bevelEnabled:!0,h=n.bevelThickness!==void 0?n.bevelThickness:.2,g=n.bevelSize!==void 0?n.bevelSize:h-.1,M=n.bevelOffset!==void 0?n.bevelOffset:0,v=n.bevelSegments!==void 0?n.bevelSegments:3,d=n.extrudePath,x=n.UVGenerator!==void 0?n.UVGenerator:s3,b,y=!1,w,T,m,S;if(d){b=d.getSpacedPoints(u),y=!0,f=!1;let ht=d.isCatmullRomCurve3?d.closed:!1;w=d.computeFrenetFrames(u,ht),T=new q,m=new q,S=new q}f||(v=0,h=0,g=0,M=0);let C=l.extractPoints(c),D=C.shape,R=C.holes;if(!Ja.isClockWise(D)){D=D.reverse();for(let ht=0,Tt=R.length;ht<Tt;ht++){let wt=R[ht];Ja.isClockWise(wt)&&(R[ht]=wt.reverse())}}function tt(ht){let wt=10000000000000001e-36,At=ht[0];for(let Mt=1;Mt<=ht.length;Mt++){let Yt=Mt%ht.length,zt=ht[Yt],re=zt.x-At.x,Jt=zt.y-At.y,Vt=re*re+Jt*Jt,H=Math.max(Math.abs(zt.x),Math.abs(zt.y),Math.abs(At.x),Math.abs(At.y)),ie=wt*H*H;if(Vt<=ie){ht.splice(Yt,1),Mt--;continue}At=zt}}tt(D),R.forEach(tt);let z=R.length,J=D;for(let ht=0;ht<z;ht++){let Tt=R[ht];D=D.concat(Tt)}function j(ht,Tt,wt){return Tt||ue("ExtrudeGeometry: vec does not exist"),ht.clone().addScaledVector(Tt,wt)}let B=D.length;function ot(ht,Tt,wt){let At,Mt,Yt,zt=ht.x-Tt.x,re=ht.y-Tt.y,Jt=wt.x-ht.x,Vt=wt.y-ht.y,H=zt*zt+re*re,ie=zt*Vt-re*Jt;if(Math.abs(ie)>Number.EPSILON){let Nt=Math.sqrt(H),se=Math.sqrt(Jt*Jt+Vt*Vt),K=Tt.x-re/Nt,V=Tt.y+zt/Nt,Q=wt.x-Vt/se,at=wt.y+Jt/se,E=((Q-K)*Vt-(at-V)*Jt)/(zt*Vt-re*Jt);At=K+zt*E-ht.x,Mt=V+re*E-ht.y;let _=At*At+Mt*Mt;if(_<=2)return new Ot(At,Mt);Yt=Math.sqrt(_/2)}else{let Nt=!1;zt>Number.EPSILON?Jt>Number.EPSILON&&(Nt=!0):zt<-Number.EPSILON?Jt<-Number.EPSILON&&(Nt=!0):Math.sign(re)===Math.sign(Vt)&&(Nt=!0),Nt?(At=-re,Mt=zt,Yt=Math.sqrt(H)):(At=zt,Mt=re,Yt=Math.sqrt(H/2))}return new Ot(At/Yt,Mt/Yt)}let k=[];for(let ht=0,Tt=J.length,wt=Tt-1,At=ht+1;ht<Tt;ht++,wt++,At++)wt===Tt&&(wt=0),At===Tt&&(At=0),k[ht]=ot(J[ht],J[wt],J[At]);let Y=[],N,yt=k.concat();for(let ht=0,Tt=z;ht<Tt;ht++){let wt=R[ht];N=[];for(let At=0,Mt=wt.length,Yt=Mt-1,zt=At+1;At<Mt;At++,Yt++,zt++)Yt===Mt&&(Yt=0),zt===Mt&&(zt=0),N[At]=ot(wt[At],wt[Yt],wt[zt]);Y.push(N),yt=yt.concat(N)}let Dt;if(v===0)Dt=Ja.triangulateShape(J,R);else{let ht=[],Tt=[];for(let wt=0;wt<v;wt++){let At=wt/v,Mt=h*Math.cos(At*Math.PI/2),Yt=g*Math.sin(At*Math.PI/2)+M;for(let zt=0,re=J.length;zt<re;zt++){let Jt=j(J[zt],k[zt],Yt);gt(Jt.x,Jt.y,-Mt),At===0&&ht.push(Jt)}for(let zt=0,re=z;zt<re;zt++){let Jt=R[zt];N=Y[zt];let Vt=[];for(let H=0,ie=Jt.length;H<ie;H++){let Nt=j(Jt[H],N[H],Yt);gt(Nt.x,Nt.y,-Mt),At===0&&Vt.push(Nt)}At===0&&Tt.push(Vt)}}Dt=Ja.triangulateShape(ht,Tt)}let lt=Dt.length,_t=g+M;for(let ht=0;ht<B;ht++){let Tt=f?j(D[ht],yt[ht],_t):D[ht];y?(m.copy(w.normals[0]).multiplyScalar(Tt.x),T.copy(w.binormals[0]).multiplyScalar(Tt.y),S.copy(b[0]).add(m).add(T),gt(S.x,S.y,S.z)):gt(Tt.x,Tt.y,0)}for(let ht=1;ht<=u;ht++)for(let Tt=0;Tt<B;Tt++){let wt=f?j(D[Tt],yt[Tt],_t):D[Tt];y?(m.copy(w.normals[ht]).multiplyScalar(wt.x),T.copy(w.binormals[ht]).multiplyScalar(wt.y),S.copy(b[ht]).add(m).add(T),gt(S.x,S.y,S.z)):gt(wt.x,wt.y,p/u*ht)}for(let ht=v-1;ht>=0;ht--){let Tt=ht/v,wt=h*Math.cos(Tt*Math.PI/2),At=g*Math.sin(Tt*Math.PI/2)+M;for(let Mt=0,Yt=J.length;Mt<Yt;Mt++){let zt=j(J[Mt],k[Mt],At);gt(zt.x,zt.y,p+wt)}for(let Mt=0,Yt=R.length;Mt<Yt;Mt++){let zt=R[Mt];N=Y[Mt];for(let re=0,Jt=zt.length;re<Jt;re++){let Vt=j(zt[re],N[re],At);y?gt(Vt.x,Vt.y+b[u-1].y,b[u-1].x+wt):gt(Vt.x,Vt.y,p+wt)}}}Ct(),Ft();function Ct(){let ht=a.length/3;if(f){let Tt=0,wt=B*Tt;for(let At=0;At<lt;At++){let Mt=Dt[At];Zt(Mt[2]+wt,Mt[1]+wt,Mt[0]+wt)}Tt=u+v*2,wt=B*Tt;for(let At=0;At<lt;At++){let Mt=Dt[At];Zt(Mt[0]+wt,Mt[1]+wt,Mt[2]+wt)}}else{for(let Tt=0;Tt<lt;Tt++){let wt=Dt[Tt];Zt(wt[2],wt[1],wt[0])}for(let Tt=0;Tt<lt;Tt++){let wt=Dt[Tt];Zt(wt[0]+B*u,wt[1]+B*u,wt[2]+B*u)}}i.addGroup(ht,a.length/3-ht,0)}function Ft(){let ht=a.length/3,Tt=0;Lt(J,Tt),Tt+=J.length;for(let wt=0,At=R.length;wt<At;wt++){let Mt=R[wt];Lt(Mt,Tt),Tt+=Mt.length}i.addGroup(ht,a.length/3-ht,1)}function Lt(ht,Tt){let wt=ht.length;for(;--wt>=0;){let At=wt,Mt=wt-1;Mt<0&&(Mt=ht.length-1);for(let Yt=0,zt=u+v*2;Yt<zt;Yt++){let re=B*Yt,Jt=B*(Yt+1),Vt=Tt+At+re,H=Tt+Mt+re,ie=Tt+Mt+Jt,Nt=Tt+At+Jt;I(Vt,H,ie,Nt)}}}function gt(ht,Tt,wt){o.push(ht),o.push(Tt),o.push(wt)}function Zt(ht,Tt,wt){jt(ht),jt(Tt),jt(wt);let At=a.length/3,Mt=x.generateTopUV(i,a,At-3,At-2,At-1);$t(Mt[0]),$t(Mt[1]),$t(Mt[2])}function I(ht,Tt,wt,At){jt(ht),jt(Tt),jt(At),jt(Tt),jt(wt),jt(At);let Mt=a.length/3,Yt=x.generateSideWallUV(i,a,Mt-6,Mt-3,Mt-2,Mt-1);$t(Yt[0]),$t(Yt[1]),$t(Yt[3]),$t(Yt[1]),$t(Yt[2]),$t(Yt[3])}function jt(ht){a.push(o[ht*3+0]),a.push(o[ht*3+1]),a.push(o[ht*3+2])}function $t(ht){r.push(ht.x),r.push(ht.y)}}}copy(t){return super.copy(t),this.parameters=Object.assign({},t.parameters),this}toJSON(){let t=super.toJSON(),n=this.parameters.shapes,i=this.parameters.options;return o3(n,i,t)}static fromJSON(t,n){let i=[];for(let r=0,s=t.shapes.length;r<s;r++){let l=n[t.shapes[r]];i.push(l)}let a=t.options.extrudePath;return a!==void 0&&(t.options.extrudePath=new Jv[a.type]().fromJSON(a)),new e(i,t.options)}},s3={generateTopUV:function(e,t,n,i,a){let r=t[n*3],s=t[n*3+1],l=t[i*3],o=t[i*3+1],c=t[a*3],u=t[a*3+1];return[new Ot(r,s),new Ot(l,o),new Ot(c,u)]},generateSideWallUV:function(e,t,n,i,a,r){let s=t[n*3],l=t[n*3+1],o=t[n*3+2],c=t[i*3],u=t[i*3+1],p=t[i*3+2],f=t[a*3],h=t[a*3+1],g=t[a*3+2],M=t[r*3],v=t[r*3+1],d=t[r*3+2];return Math.abs(l-u)<Math.abs(s-c)?[new Ot(s,1-o),new Ot(c,1-p),new Ot(f,1-g),new Ot(M,1-d)]:[new Ot(l,1-o),new Ot(u,1-p),new Ot(h,1-g),new Ot(v,1-d)]}};function o3(e,t,n){if(n.shapes=[],Array.isArray(e))for(let i=0,a=e.length;i<a;i++){let r=e[i];n.shapes.push(r.uuid)}else n.shapes.push(e.uuid);return n.options=Object.assign({},t),t.extrudePath!==void 0&&(n.options.extrudePath=t.extrudePath.toJSON()),n}var xo=class e extends ki{constructor(t=1,n=1,i=1,a=1){super(),this.type="PlaneGeometry",this.parameters={width:t,height:n,widthSegments:i,heightSegments:a};let r=t/2,s=n/2,l=Math.floor(i),o=Math.floor(a),c=l+1,u=o+1,p=t/l,f=n/o,h=[],g=[],M=[],v=[];for(let d=0;d<u;d++){let x=d*f-s;for(let b=0;b<c;b++){let y=b*p-r;g.push(y,-x,0),M.push(0,0,1),v.push(b/l),v.push(1-d/o)}}for(let d=0;d<o;d++)for(let x=0;x<l;x++){let b=x+c*d,y=x+c*(d+1),w=x+1+c*(d+1),T=x+1+c*d;h.push(b,y,T),h.push(y,w,T)}this.setIndex(h),this.setAttribute("position",new bn(g,3)),this.setAttribute("normal",new bn(M,3)),this.setAttribute("uv",new bn(v,2))}copy(t){return super.copy(t),this.parameters=Object.assign({},t.parameters),this}static fromJSON(t){return new e(t.width,t.height,t.widthSegments,t.heightSegments)}};var Yu=class e extends ki{constructor(t=new Es([new Ot(0,.5),new Ot(-.5,-.5),new Ot(.5,-.5)]),n=12){super(),this.type="ShapeGeometry",this.parameters={shapes:t,curveSegments:n};let i=[],a=[],r=[],s=[],l=0,o=0;if(Array.isArray(t)===!1)c(t);else for(let u=0;u<t.length;u++)c(t[u]),this.addGroup(l,o,u),l+=o,o=0;this.setIndex(i),this.setAttribute("position",new bn(a,3)),this.setAttribute("normal",new bn(r,3)),this.setAttribute("uv",new bn(s,2));function c(u){let p=a.length/3,f=u.extractPoints(n),h=f.shape,g=f.holes;Ja.isClockWise(h)===!1&&(h=h.reverse());for(let v=0,d=g.length;v<d;v++){let x=g[v];Ja.isClockWise(x)===!0&&(g[v]=x.reverse())}let M=Ja.triangulateShape(h,g);for(let v=0,d=g.length;v<d;v++){let x=g[v];h=h.concat(x)}for(let v=0,d=h.length;v<d;v++){let x=h[v];a.push(x.x,x.y,0),r.push(0,0,1),s.push(x.x,x.y)}for(let v=0,d=M.length;v<d;v++){let x=M[v],b=x[0]+p,y=x[1]+p,w=x[2]+p;i.push(b,y,w),o+=3}}}copy(t){return super.copy(t),this.parameters=Object.assign({},t.parameters),this}toJSON(){let t=super.toJSON(),n=this.parameters.shapes;return l3(n,t)}static fromJSON(t,n){let i=[];for(let a=0,r=t.shapes.length;a<r;a++){let s=n[t.shapes[a]];i.push(s)}return new e(i,t.curveSegments)}};function l3(e,t){if(t.shapes=[],Array.isArray(e))for(let n=0,i=e.length;n<i;n++){let a=e[n];t.shapes.push(a.uuid)}else t.shapes.push(e.uuid);return t}var ic=class e extends ki{constructor(t=1,n=.4,i=12,a=48,r=Math.PI*2,s=0,l=Math.PI*2){super(),this.type="TorusGeometry",this.parameters={radius:t,tube:n,radialSegments:i,tubularSegments:a,arc:r,thetaStart:s,thetaLength:l},i=Math.floor(i),a=Math.floor(a);let o=[],c=[],u=[],p=[],f=new q,h=new q,g=new q;for(let M=0;M<=i;M++){let v=s+M/i*l;for(let d=0;d<=a;d++){let x=d/a*r;h.x=(t+n*Math.cos(v))*Math.cos(x),h.y=(t+n*Math.cos(v))*Math.sin(x),h.z=n*Math.sin(v),c.push(h.x,h.y,h.z),f.x=t*Math.cos(x),f.y=t*Math.sin(x),g.subVectors(h,f).normalize(),u.push(g.x,g.y,g.z),p.push(d/a),p.push(M/i)}}for(let M=1;M<=i;M++)for(let v=1;v<=a;v++){let d=(a+1)*M+v-1,x=(a+1)*(M-1)+v-1,b=(a+1)*(M-1)+v,y=(a+1)*M+v;o.push(d,x,y),o.push(x,b,y)}this.setIndex(o),this.setAttribute("position",new bn(c,3)),this.setAttribute("normal",new bn(u,3)),this.setAttribute("uv",new bn(p,2))}copy(t){return super.copy(t),this.parameters=Object.assign({},t.parameters),this}static fromJSON(t){return new e(t.radius,t.tube,t.radialSegments,t.tubularSegments,t.arc,t.thetaStart,t.thetaLength)}};function Mo(e){let t={};for(let n in e){t[n]={};for(let i in e[n]){let a=e[n][i];if(lE(a))a.isRenderTargetTexture?(ce("UniformsUtils: Textures of render targets cannot be cloned via cloneUniforms() or mergeUniforms()."),t[n][i]=null):t[n][i]=a.clone();else if(Array.isArray(a))if(lE(a[0])){let r=[];for(let s=0,l=a.length;s<l;s++)r[s]=a[s].clone();t[n][i]=r}else t[n][i]=a.slice();else t[n][i]=a}}return t}function $n(e){let t={};for(let n=0;n<e.length;n++){let i=Mo(e[n]);for(let a in i)t[a]=i[a]}return t}function lE(e){return e&&(e.isColor||e.isMatrix3||e.isMatrix4||e.isVector2||e.isVector3||e.isVector4||e.isTexture||e.isQuaternion)}function c3(e){let t=[];for(let n=0;n<e.length;n++)t.push(e[n].clone());return t}function Nx(e){let t=e.getRenderTarget();return t===null?e.outputColorSpace:t.isXRRenderTarget===!0?t.texture.colorSpace:Ne.workingColorSpace}var sT={clone:Mo,merge:$n},u3=`void main() {
	gl_Position = projectionMatrix * modelViewMatrix * vec4( position, 1.0 );
}`,f3=`void main() {
	gl_FragColor = vec4( 1.0, 0.0, 0.0, 1.0 );
}`,Qa=class extends Ss{constructor(t){super(),this.isShaderMaterial=!0,this.type="ShaderMaterial",this.defines={},this.uniforms={},this.uniformsGroups=[],this.vertexShader=u3,this.fragmentShader=f3,this.linewidth=1,this.wireframe=!1,this.wireframeLinewidth=1,this.fog=!1,this.lights=!1,this.clipping=!1,this.forceSinglePass=!0,this.extensions={clipCullDistance:!1,multiDraw:!1},this.defaultAttributeValues={color:[1,1,1],uv:[0,0],uv1:[0,0]},this.index0AttributeName=void 0,this.uniformsNeedUpdate=!1,this.glslVersion=null,t!==void 0&&this.setValues(t)}copy(t){return super.copy(t),this.fragmentShader=t.fragmentShader,this.vertexShader=t.vertexShader,this.uniforms=Mo(t.uniforms),this.uniformsGroups=c3(t.uniformsGroups),this.defines=Object.assign({},t.defines),this.wireframe=t.wireframe,this.wireframeLinewidth=t.wireframeLinewidth,this.fog=t.fog,this.lights=t.lights,this.clipping=t.clipping,this.extensions=Object.assign({},t.extensions),this.glslVersion=t.glslVersion,this.defaultAttributeValues=Object.assign({},t.defaultAttributeValues),this.index0AttributeName=t.index0AttributeName,this.uniformsNeedUpdate=t.uniformsNeedUpdate,this}toJSON(t){let n=super.toJSON(t);n.glslVersion=this.glslVersion,n.uniforms={};for(let a in this.uniforms){let s=this.uniforms[a].value;s&&s.isTexture?n.uniforms[a]={type:"t",value:s.toJSON(t).uuid}:s&&s.isColor?n.uniforms[a]={type:"c",value:s.getHex()}:s&&s.isVector2?n.uniforms[a]={type:"v2",value:s.toArray()}:s&&s.isVector3?n.uniforms[a]={type:"v3",value:s.toArray()}:s&&s.isVector4?n.uniforms[a]={type:"v4",value:s.toArray()}:s&&s.isMatrix3?n.uniforms[a]={type:"m3",value:s.toArray()}:s&&s.isMatrix4?n.uniforms[a]={type:"m4",value:s.toArray()}:n.uniforms[a]={value:s}}Object.keys(this.defines).length>0&&(n.defines=this.defines),n.vertexShader=this.vertexShader,n.fragmentShader=this.fragmentShader,n.lights=this.lights,n.clipping=this.clipping;let i={};for(let a in this.extensions)this.extensions[a]===!0&&(i[a]=!0);return Object.keys(i).length>0&&(n.extensions=i),n}fromJSON(t,n){if(super.fromJSON(t,n),t.uniforms!==void 0)for(let i in t.uniforms){let a=t.uniforms[i];switch(this.uniforms[i]={},a.type){case"t":this.uniforms[i].value=n[a.value]||null;break;case"c":this.uniforms[i].value=new me().setHex(a.value);break;case"v2":this.uniforms[i].value=new Ot().fromArray(a.value);break;case"v3":this.uniforms[i].value=new q().fromArray(a.value);break;case"v4":this.uniforms[i].value=new cn().fromArray(a.value);break;case"m3":this.uniforms[i].value=new de().fromArray(a.value);break;case"m4":this.uniforms[i].value=new Ye().fromArray(a.value);break;default:this.uniforms[i].value=a.value}}if(t.defines!==void 0&&(this.defines=t.defines),t.vertexShader!==void 0&&(this.vertexShader=t.vertexShader),t.fragmentShader!==void 0&&(this.fragmentShader=t.fragmentShader),t.glslVersion!==void 0&&(this.glslVersion=t.glslVersion),t.extensions!==void 0)for(let i in t.extensions)this.extensions[i]=t.extensions[i];return t.lights!==void 0&&(this.lights=t.lights),t.clipping!==void 0&&(this.clipping=t.clipping),this}},Yd=class extends Qa{constructor(t){super(t),this.isRawShaderMaterial=!0,this.type="RawShaderMaterial"}},ac=class extends Ss{constructor(t){super(),this.isMeshStandardMaterial=!0,this.type="MeshStandardMaterial",this.defines={STANDARD:""},this.color=new me(16777215),this.roughness=1,this.metalness=0,this.map=null,this.lightMap=null,this.lightMapIntensity=1,this.aoMap=null,this.aoMapIntensity=1,this.emissive=new me(0),this.emissiveIntensity=1,this.emissiveMap=null,this.bumpMap=null,this.bumpScale=1,this.normalMap=null,this.normalMapType=Jp,this.normalScale=new Ot(1,1),this.displacementMap=null,this.displacementScale=1,this.displacementBias=0,this.roughnessMap=null,this.metalnessMap=null,this.alphaMap=null,this.envMap=null,this.envMapRotation=new Nr,this.envMapIntensity=1,this.wireframe=!1,this.wireframeLinewidth=1,this.wireframeLinecap="round",this.wireframeLinejoin="round",this.flatShading=!1,this.fog=!0,this.setValues(t)}copy(t){return super.copy(t),this.defines={STANDARD:""},this.color.copy(t.color),this.roughness=t.roughness,this.metalness=t.metalness,this.map=t.map,this.lightMap=t.lightMap,this.lightMapIntensity=t.lightMapIntensity,this.aoMap=t.aoMap,this.aoMapIntensity=t.aoMapIntensity,this.emissive.copy(t.emissive),this.emissiveMap=t.emissiveMap,this.emissiveIntensity=t.emissiveIntensity,this.bumpMap=t.bumpMap,this.bumpScale=t.bumpScale,this.normalMap=t.normalMap,this.normalMapType=t.normalMapType,this.normalScale.copy(t.normalScale),this.displacementMap=t.displacementMap,this.displacementScale=t.displacementScale,this.displacementBias=t.displacementBias,this.roughnessMap=t.roughnessMap,this.metalnessMap=t.metalnessMap,this.alphaMap=t.alphaMap,this.envMap=t.envMap,this.envMapRotation.copy(t.envMapRotation),this.envMapIntensity=t.envMapIntensity,this.wireframe=t.wireframe,this.wireframeLinewidth=t.wireframeLinewidth,this.wireframeLinecap=t.wireframeLinecap,this.wireframeLinejoin=t.wireframeLinejoin,this.flatShading=t.flatShading,this.fog=t.fog,this}},Ts=class extends ac{constructor(t){super(),this.isMeshPhysicalMaterial=!0,this.defines={STANDARD:"",PHYSICAL:""},this.type="MeshPhysicalMaterial",this.anisotropyRotation=0,this.anisotropyMap=null,this.clearcoatMap=null,this.clearcoatRoughness=0,this.clearcoatRoughnessMap=null,this.clearcoatNormalScale=new Ot(1,1),this.clearcoatNormalMap=null,this.diffuseRoughnessMap=null,this.ior=1.5,Object.defineProperty(this,"reflectivity",{get:function(){return Te(2.5*(this.ior-1)/(this.ior+1),0,1)},set:function(n){this.ior=(1+.4*n)/(1-.4*n)}}),this.iridescenceMap=null,this.iridescenceIOR=1.3,this.iridescenceThicknessMinimum=100,this.iridescenceThicknessMaximum=400,this.iridescenceThicknessMap=null,this.sheenColor=new me(0),this.sheenColorMap=null,this.sheenRoughness=1,this.sheenRoughnessMap=null,this.transmissionMap=null,this.thickness=0,this.thicknessMap=null,this.attenuationDistance=1/0,this.attenuationColor=new me(1,1,1),this.specularIntensity=1,this.specularIntensityMap=null,this.specularColor=new me(1,1,1),this.specularColorMap=null,this._anisotropy=0,this._clearcoat=0,this._diffuseRoughness=0,this._dispersion=0,this._iridescence=0,this._retroreflectivity=0,this._sheen=0,this._transmission=0,this.setValues(t)}get anisotropy(){return this._anisotropy}set anisotropy(t){this._anisotropy>0!=t>0&&this.version++,this._anisotropy=t}get clearcoat(){return this._clearcoat}set clearcoat(t){this._clearcoat>0!=t>0&&this.version++,this._clearcoat=t}get diffuseRoughness(){return this._diffuseRoughness}set diffuseRoughness(t){this._diffuseRoughness>0!=t>0&&this.version++,this._diffuseRoughness=t}get iridescence(){return this._iridescence}set iridescence(t){this._iridescence>0!=t>0&&this.version++,this._iridescence=t}get dispersion(){return this._dispersion}set dispersion(t){this._dispersion>0!=t>0&&this.version++,this._dispersion=t}get retroreflectivity(){return this._retroreflectivity}set retroreflectivity(t){this._retroreflectivity>0!=t>0&&this.version++,this._retroreflectivity=t}get sheen(){return this._sheen}set sheen(t){this._sheen>0!=t>0&&this.version++,this._sheen=t}get transmission(){return this._transmission}set transmission(t){this._transmission>0!=t>0&&this.version++,this._transmission=t}get iridescenceThicknessRange(){return po('MeshPhysicalMaterial: The "iridescenceThicknessRange" property has been replaced by "iridescenceThicknessMinimum" and "iridescenceThicknessMaximum".'),[this.iridescenceThicknessMinimum,this.iridescenceThicknessMaximum]}set iridescenceThicknessRange(t){po('MeshPhysicalMaterial: The "iridescenceThicknessRange" property has been replaced by "iridescenceThicknessMinimum" and "iridescenceThicknessMaximum".'),this.iridescenceThicknessMinimum=t[0],this.iridescenceThicknessMaximum=t[1]}copy(t){return super.copy(t),this.defines={STANDARD:"",PHYSICAL:""},this.anisotropy=t.anisotropy,this.anisotropyRotation=t.anisotropyRotation,this.anisotropyMap=t.anisotropyMap,this.clearcoat=t.clearcoat,this.clearcoatMap=t.clearcoatMap,this.clearcoatRoughness=t.clearcoatRoughness,this.clearcoatRoughnessMap=t.clearcoatRoughnessMap,this.clearcoatNormalMap=t.clearcoatNormalMap,this.clearcoatNormalScale.copy(t.clearcoatNormalScale),this.diffuseRoughness=t.diffuseRoughness,this.diffuseRoughnessMap=t.diffuseRoughnessMap,this.dispersion=t.dispersion,this.ior=t.ior,this.iridescence=t.iridescence,this.iridescenceMap=t.iridescenceMap,this.iridescenceIOR=t.iridescenceIOR,this.iridescenceThicknessMinimum=t.iridescenceThicknessMinimum,this.iridescenceThicknessMaximum=t.iridescenceThicknessMaximum,this.iridescenceThicknessMap=t.iridescenceThicknessMap,this.retroreflectivity=t.retroreflectivity,this.sheen=t.sheen,this.sheenColor.copy(t.sheenColor),this.sheenColorMap=t.sheenColorMap,this.sheenRoughness=t.sheenRoughness,this.sheenRoughnessMap=t.sheenRoughnessMap,this.transmission=t.transmission,this.transmissionMap=t.transmissionMap,this.thickness=t.thickness,this.thicknessMap=t.thicknessMap,this.attenuationDistance=t.attenuationDistance,this.attenuationColor.copy(t.attenuationColor),this.specularIntensity=t.specularIntensity,this.specularIntensityMap=t.specularIntensityMap,this.specularColor.copy(t.specularColor),this.specularColorMap=t.specularColorMap,this}};var Zd=class extends Ss{constructor(t){super(),this.isMeshDepthMaterial=!0,this.type="MeshDepthMaterial",this.depthPacking=GE,this.map=null,this.alphaMap=null,this.displacementMap=null,this.displacementScale=1,this.displacementBias=0,this.wireframe=!1,this.wireframeLinewidth=1,this.setValues(t)}copy(t){return super.copy(t),this.depthPacking=t.depthPacking,this.map=t.map,this.alphaMap=t.alphaMap,this.displacementMap=t.displacementMap,this.displacementScale=t.displacementScale,this.displacementBias=t.displacementBias,this.wireframe=t.wireframe,this.wireframeLinewidth=t.wireframeLinewidth,this}},Jd=class extends Ss{constructor(t){super(),this.isMeshDistanceMaterial=!0,this.type="MeshDistanceMaterial",this.map=null,this.alphaMap=null,this.displacementMap=null,this.displacementScale=1,this.displacementBias=0,this.setValues(t)}copy(t){return super.copy(t),this.map=t.map,this.alphaMap=t.alphaMap,this.displacementMap=t.displacementMap,this.displacementScale=t.displacementScale,this.displacementBias=t.displacementBias,this}};function Fl(e,t){return!e||e.constructor===t?e:typeof t.BYTES_PER_ELEMENT=="number"?new t(e):Array.prototype.slice.call(e)}function Md(e){return e!==void 0&&e.inTangents!==void 0&&e.outTangents!==void 0}var ws=class{constructor(t,n,i,a){this.parameterPositions=t,this._cachedIndex=0,this.resultBuffer=a!==void 0?a:new n.constructor(i),this.sampleValues=n,this.valueSize=i,this.settings=null,this.DefaultSettings_={}}evaluate(t){let n=this.parameterPositions,i=this._cachedIndex,a=n[i],r=n[i-1];t:{e:{let s;n:{i:if(!(t<a)){for(let l=i+2;;){if(a===void 0){if(t<r)break i;return i=n.length,this._cachedIndex=i,this.copySampleValue_(i-1)}if(i===l)break;if(r=a,a=n[++i],t<a)break e}s=n.length;break n}if(!(t>=r)){let l=n[1];t<l&&(i=2,r=l);for(let o=i-2;;){if(r===void 0)return this._cachedIndex=0,this.copySampleValue_(0);if(i===o)break;if(a=r,r=n[--i-1],t>=r)break e}s=i,i=0;break n}break t}for(;i<s;){let l=i+s>>>1;t<n[l]?s=l:i=l+1}if(a=n[i],r=n[i-1],r===void 0)return this._cachedIndex=0,this.copySampleValue_(0);if(a===void 0)return i=n.length,this._cachedIndex=i,this.copySampleValue_(i-1)}this._cachedIndex=i,this.intervalChanged_(i,r,a)}return this.interpolate_(i,r,t,a)}getSettings_(){return this.settings||this.DefaultSettings_}copySampleValue_(t){let n=this.resultBuffer,i=this.sampleValues,a=this.valueSize,r=t*a;for(let s=0;s!==a;++s)n[s]=i[r+s];return n}interpolate_(){throw new Error("THREE.Interpolant: Call to abstract method.")}intervalChanged_(){}},Kd=class extends ws{constructor(t,n,i,a){super(t,n,i,a),this._weightPrev=-0,this._offsetPrev=-0,this._weightNext=-0,this._offsetNext=-0,this.DefaultSettings_={endingStart:qv,endingEnd:qv}}intervalChanged_(t,n,i){let a=this.parameterPositions,r=t-2,s=t+1,l=a[r],o=a[s];if(l===void 0)switch(this.getSettings_().endingStart){case Yv:r=t,l=2*n-i;break;case Zv:r=a.length-2,l=n+a[r]-a[r+1];break;default:r=t,l=i}if(o===void 0)switch(this.getSettings_().endingEnd){case Yv:s=t,o=2*i-n;break;case Zv:s=1,o=i+a[1]-a[0];break;default:s=t-1,o=n}let c=(i-n)*.5,u=this.valueSize;this._weightPrev=c/(n-l),this._weightNext=c/(o-i),this._offsetPrev=r*u,this._offsetNext=s*u}interpolate_(t,n,i,a){let r=this.resultBuffer,s=this.sampleValues,l=this.valueSize,o=t*l,c=o-l,u=this._offsetPrev,p=this._offsetNext,f=this._weightPrev,h=this._weightNext,g=(i-n)/(a-n),M=g*g,v=M*g,d=-f*v+2*f*M-f*g,x=(1+f)*v+(-1.5-2*f)*M+(-.5+f)*g+1,b=(-1-h)*v+(1.5+h)*M+.5*g,y=h*v-h*M;for(let w=0;w!==l;++w)r[w]=d*s[u+w]+x*s[c+w]+b*s[o+w]+y*s[p+w];return r}},jd=class extends ws{constructor(t,n,i,a){super(t,n,i,a)}interpolate_(t,n,i,a){let r=this.resultBuffer,s=this.sampleValues,l=this.valueSize,o=t*l,c=o-l,u=(i-n)/(a-n),p=1-u;for(let f=0;f!==l;++f)r[f]=s[c+f]*p+s[o+f]*u;return r}},Qd=class extends ws{constructor(t,n,i,a){super(t,n,i,a)}interpolate_(t){return this.copySampleValue_(t-1)}},$d=class extends ws{interpolate_(t,n,i,a){let r=this.resultBuffer,s=this.sampleValues,l=this.valueSize,o=t*l,c=o-l,u=this.inTangents,p=this.outTangents;if(!u||!p){let g=(i-n)/(a-n),M=1-g;for(let v=0;v!==l;++v)r[v]=s[c+v]*M+s[o+v]*g;return r}let f=l*2,h=t-1;for(let g=0;g!==l;++g){let M=s[c+g],v=s[o+g],d=h*f+g*2,x=p[d],b=p[d+1],y=t*f+g*2,w=u[y],T=u[y+1],m=d3(i,n,x,w,a);r[g]=oT(m,M,b,T,v)}return r}};function oT(e,t,n,i,a){let r=1-e;return r*r*r*t+3*r*r*e*n+3*r*e*e*i+e*e*e*a}function h3(e,t,n,i,a){let r=1-e;return 3*r*r*(n-t)+6*r*e*(i-n)+3*e*e*(a-i)}function d3(e,t,n,i,a){let r=(e-t)/(a-t);for(let s=0;s<8;s++){let l=oT(r,t,n,i,a)-e;if(Math.abs(l)<1e-10)break;let o=h3(r,t,n,i,a);if(Math.abs(o)<1e-10)break;r=Math.max(0,Math.min(1,r-l/o))}return r}var Wi=class{constructor(t,n,i,a){if(t===void 0)throw new Error("THREE.KeyframeTrack: track name is undefined");if(n===void 0||n.length===0)throw new Error("THREE.KeyframeTrack: no keyframes in track named "+t);this.name=t,this.times=Fl(n,this.TimeBufferType),this.values=Fl(i,this.ValueBufferType),this.setInterpolation(a||this.DefaultInterpolation)}static toJSON(t){let n=t.constructor,i;if(n.toJSON!==this.toJSON)i=n.toJSON(t);else{i={name:t.name,times:Fl(t.times,Array),values:Fl(t.values,Array)};let a=t.getInterpolation();a!==t.DefaultInterpolation&&(i.interpolation=a),Md(t.settings)&&(i.settings={inTangents:Fl(t.settings.inTangents,Array),outTangents:Fl(t.settings.outTangents,Array)})}return i.type=t.ValueTypeName,i}InterpolantFactoryMethodDiscrete(t){return new Qd(this.times,this.values,this.getValueSize(),t)}InterpolantFactoryMethodLinear(t){return new jd(this.times,this.values,this.getValueSize(),t)}InterpolantFactoryMethodSmooth(t){return new Kd(this.times,this.values,this.getValueSize(),t)}InterpolantFactoryMethodBezier(t){let n=new $d(this.times,this.values,this.getValueSize(),t);return this.settings&&(n.inTangents=this.settings.inTangents,n.outTangents=this.settings.outTangents),n}setInterpolation(t){let n;switch(t){case Cu:n=this.InterpolantFactoryMethodDiscrete;break;case Pd:n=this.InterpolantFactoryMethodLinear;break;case wd:n=this.InterpolantFactoryMethodSmooth;break;case Wv:n=this.InterpolantFactoryMethodBezier;break}if(n===void 0){let i="unsupported interpolation for "+this.ValueTypeName+" keyframe track named "+this.name;if(this.createInterpolant===void 0)if(t!==this.DefaultInterpolation)this.setInterpolation(this.DefaultInterpolation);else throw new Error(i);return ce("KeyframeTrack:",i),this}return this.createInterpolant=n,this}getInterpolation(){switch(this.createInterpolant){case this.InterpolantFactoryMethodDiscrete:return Cu;case this.InterpolantFactoryMethodLinear:return Pd;case this.InterpolantFactoryMethodSmooth:return wd;case this.InterpolantFactoryMethodBezier:return Wv}}getValueSize(){return this.values.length/this.times.length}shift(t){if(t!==0){let n=this.times;for(let i=0,a=n.length;i!==a;++i)n[i]+=t;Md(this.settings)&&(cE(this.settings.inTangents,t),cE(this.settings.outTangents,t))}return this}scale(t){if(t!==1){let n=this.times;for(let i=0,a=n.length;i!==a;++i)n[i]*=t;Md(this.settings)&&(uE(this.settings.inTangents,t),uE(this.settings.outTangents,t))}return this}trim(t,n){let i=this.times,a=i.length,r=0,s=a-1;for(;r!==a&&i[r]<t;)++r;for(;s!==-1&&i[s]>n;)--s;if(++s,r!==0||s!==a){r>=s&&(s=Math.max(s,1),r=s-1);let l=this.getValueSize();this.times=i.slice(r,s),this.values=this.values.slice(r*l,s*l)}return this}validate(){let t=!0,n=this.getValueSize();n-Math.floor(n)!==0&&(ue("KeyframeTrack: Invalid value size in track.",this),t=!1);let i=this.times,a=this.values,r=i.length;r===0&&(ue("KeyframeTrack: Track is empty.",this),t=!1);let s=null;for(let l=0;l!==r;l++){let o=i[l];if(typeof o=="number"&&isNaN(o)){ue("KeyframeTrack: Time is not a valid number.",this,l,o),t=!1;break}if(s!==null&&s>o){ue("KeyframeTrack: Out of order keys.",this,l,o,s),t=!1;break}s=o}if(a!==void 0&&pC(a))for(let l=0,o=a.length;l!==o;++l){let c=a[l];if(isNaN(c)){ue("KeyframeTrack: Value is not a valid number.",this,l,c),t=!1;break}}return t}optimize(){let t=this.times.slice(),n=this.values.slice(),i=this.getValueSize(),a=this.getInterpolation()===wd,r=t.length-1,s=1;for(let l=1;l<r;++l){let o=!1,c=t[l],u=t[l+1];if(c!==u&&(l!==1||c!==t[0]))if(a)o=!0;else{let p=l*i,f=p-i,h=p+i;for(let g=0;g!==i;++g){let M=n[p+g];if(M!==n[f+g]||M!==n[h+g]){o=!0;break}}}if(o){if(l!==s){t[s]=t[l];let p=l*i,f=s*i;for(let h=0;h!==i;++h)n[f+h]=n[p+h]}++s}}if(r>0){t[s]=t[r];for(let l=r*i,o=s*i,c=0;c!==i;++c)n[o+c]=n[l+c];++s}return s!==t.length?(this.times=t.slice(0,s),this.values=n.slice(0,s*i)):(this.times=t,this.values=n),this}clone(){let t=this.times.slice(),n=this.values.slice(),i=this.constructor,a=new i(this.name,t,n);return a.createInterpolant=this.createInterpolant,Md(this.settings)&&(a.settings={inTangents:this.settings.inTangents.slice(),outTangents:this.settings.outTangents.slice()}),a}};function cE(e,t){for(let n=0,i=e.length;n!==i;n+=2)e[n]+=t}function uE(e,t){for(let n=0,i=e.length;n!==i;n+=2)e[n]*=t}Wi.prototype.ValueTypeName="";Wi.prototype.TimeBufferType=Float32Array;Wi.prototype.ValueBufferType=Float32Array;Wi.prototype.DefaultInterpolation=Pd;var As=class extends Wi{constructor(t,n,i){super(t,n,i)}};As.prototype.ValueTypeName="bool";As.prototype.ValueBufferType=Array;As.prototype.DefaultInterpolation=Cu;As.prototype.InterpolantFactoryMethodLinear=void 0;As.prototype.InterpolantFactoryMethodSmooth=void 0;var tp=class extends Wi{constructor(t,n,i,a){super(t,n,i,a)}};tp.prototype.ValueTypeName="color";var ep=class extends Wi{constructor(t,n,i,a){super(t,n,i,a)}};ep.prototype.ValueTypeName="number";var np=class extends ws{constructor(t,n,i,a){super(t,n,i,a)}interpolate_(t,n,i,a){let r=this.resultBuffer,s=this.sampleValues,l=this.valueSize,o=(i-n)/(a-n),c=t*l;for(let u=c+l;c!==u;c+=4)ci.slerpFlat(r,0,s,c-l,s,c,o);return r}},Zu=class extends Wi{constructor(t,n,i,a){super(t,n,i,a)}InterpolantFactoryMethodLinear(t){return new np(this.times,this.values,this.getValueSize(),t)}};Zu.prototype.ValueTypeName="quaternion";Zu.prototype.InterpolantFactoryMethodSmooth=void 0;var Rs=class extends Wi{constructor(t,n,i){super(t,n,i)}};Rs.prototype.ValueTypeName="string";Rs.prototype.ValueBufferType=Array;Rs.prototype.DefaultInterpolation=Cu;Rs.prototype.InterpolantFactoryMethodLinear=void 0;Rs.prototype.InterpolantFactoryMethodSmooth=void 0;var ip=class extends Wi{constructor(t,n,i,a){super(t,n,i,a)}};ip.prototype.ValueTypeName="vector";var ap=class{constructor(t,n,i){let a=this,r=!1,s=0,l=0,o,c=[];this.onStart=void 0,this.onLoad=t,this.onProgress=n,this.onError=i,this._abortController=null,this.itemStart=function(u){l++,r===!1&&a.onStart!==void 0&&a.onStart(u,s,l),r=!0},this.itemEnd=function(u){s++,a.onProgress!==void 0&&a.onProgress(u,s,l),s===l&&(r=!1,a.onLoad!==void 0&&a.onLoad())},this.itemError=function(u){a.onError!==void 0&&a.onError(u)},this.resolveURL=function(u){return u=u.normalize("NFC"),o?o(u):u},this.setURLModifier=function(u){return o=u,this},this.addHandler=function(u,p){return c.push(u,p),this},this.removeHandler=function(u){let p=c.indexOf(u);return p!==-1&&c.splice(p,2),this},this.getHandler=function(u){for(let p=0,f=c.length;p<f;p+=2){let h=c[p],g=c[p+1];if(h.global&&(h.lastIndex=0),h.test(u))return g}return null},this.abort=function(){return this.abortController.abort(),this._abortController=null,this}}get abortController(){return this._abortController||(this._abortController=new AbortController),this._abortController}},lT=new ap,rp=class{constructor(t){this.manager=t!==void 0?t:lT,this.crossOrigin="anonymous",this.withCredentials=!1,this.path="",this.resourcePath="",this.requestHeader={},this.priority="auto",this.cache="default",typeof __THREE_DEVTOOLS__<"u"&&__THREE_DEVTOOLS__.dispatchEvent(new CustomEvent("observe",{detail:this}))}load(){}loadAsync(t,n){let i=this;return new Promise(function(a,r){i.load(t,a,n,r)})}parse(){}setCrossOrigin(t){return this.crossOrigin=t,this}setWithCredentials(t){return this.withCredentials=t,this}setPath(t){return this.path=t,this}setResourcePath(t){return this.resourcePath=t,this}setRequestHeader(t){return this.requestHeader=t,this}setPriority(t){return this.priority=t,this}setCache(t){return this.cache=t,this}abort(){return this}};rp.DEFAULT_MATERIAL_NAME="__DEFAULT";var sp=class extends fi{static registerNode(t){this.prototype._lightNode=t}constructor(t,n=1){super(),this.isLight=!0,this.type="Light",this.color=new me(t),this.intensity=n}copy(t,n){return super.copy(t,n),this.color.copy(t.color),this.intensity=t.intensity,this}toJSON(t){let n=super.toJSON(t);return n.object.color=this.color.getHex(),n.object.intensity=this.intensity,n}};var Xv=new Ye,fE=new q,hE=new q,op=class{constructor(t){this.camera=t,this.intensity=1,this.bias=0,this.biasNode=null,this.normalBias=0,this.radius=1,this.blurSamples=8,this.mapSize=new Ot(512,512),this.mapType=wi,this.map=null,this.mapPass=null,this.matrix=new Ye,this.autoUpdate=!0,this.needsUpdate=!1,this._frustum=new Ms,this._frameExtents=new Ot(1,1),this._viewportCount=1,this._viewports=[new cn(0,0,1,1)]}getViewportCount(){return this._viewportCount}getCamera(){return this.camera}getFrustum(){return this._frustum}updateMatrices(t){let n=this.camera;fE.setFromMatrixPosition(t.matrixWorld),n.position.copy(fE),hE.setFromMatrixPosition(t.target.matrixWorld),n.lookAt(hE),n.updateMatrixWorld(),this._updateMatrix(n,this.matrix,this._frustum)}_updateMatrix(t,n,i,a){Xv.multiplyMatrices(t.projectionMatrix,t.matrixWorldInverse),i.setFromProjectionMatrix(Xv,t.coordinateSystem,t.reversedDepth);let r=this._frameExtents,s=a?a.z/r.x:1,l=a?a.w/r.y:1,o=a?a.x/r.x:0,c=a?a.y/r.y:0;t.coordinateSystem===kl||t.reversedDepth?n.set(.5*s,0,0,.5*s+o,0,.5*l,0,.5*l+c,0,0,1,0,0,0,0,1):n.set(.5*s,0,0,.5*s+o,0,.5*l,0,.5*l+c,0,0,.5,.5,0,0,0,1),n.multiply(Xv)}getViewport(t){return this._viewports[t]}getFrameExtents(){return this._frameExtents}dispose(){this.map&&this.map.dispose(),this.mapPass&&this.mapPass.dispose()}copy(t){return this.camera=t.camera.clone(),this.intensity=t.intensity,this.bias=t.bias,this.radius=t.radius,this.autoUpdate=t.autoUpdate,this.needsUpdate=t.needsUpdate,this.normalBias=t.normalBias,this.blurSamples=t.blurSamples,this.mapSize.copy(t.mapSize),this.mapType=t.mapType,this.biasNode=t.biasNode,this}clone(){return new this.constructor().copy(this)}toJSON(){let t={};return t.intensity=this.intensity,t.bias=this.bias,t.normalBias=this.normalBias,t.radius=this.radius,t.blurSamples=this.blurSamples,t.mapSize=this.mapSize.toArray(),t.mapType=this.mapType,t.camera=this.camera.toJSON(!1).object,delete t.camera.matrix,t}},Ed=new q,Td=new ci,Ya=new q,Ju=class extends fi{constructor(){super(),this.isCamera=!0,this.type="Camera",this.matrixWorldInverse=new Ye,this.projectionMatrix=new Ye,this.projectionMatrixInverse=new Ye,this.coordinateSystem=ca,this._reversedDepth=!1}get reversedDepth(){return this._reversedDepth}copy(t,n){return super.copy(t,n),this.matrixWorldInverse.copy(t.matrixWorldInverse),this.projectionMatrix.copy(t.projectionMatrix),this.projectionMatrixInverse.copy(t.projectionMatrixInverse),this.coordinateSystem=t.coordinateSystem,this}getWorldDirection(t){return super.getWorldDirection(t).negate()}updateMatrixWorld(t){super.updateMatrixWorld(t),this.matrixWorld.decompose(Ed,Td,Ya),Ya.x===1&&Ya.y===1&&Ya.z===1?this.matrixWorldInverse.copy(this.matrixWorld).invert():this.matrixWorldInverse.compose(Ed,Td,Ya.set(1,1,1)).invert()}updateWorldMatrix(t,n,i=!1){super.updateWorldMatrix(t,n,i),this.matrixWorld.decompose(Ed,Td,Ya),Ya.x===1&&Ya.y===1&&Ya.z===1?this.matrixWorldInverse.copy(this.matrixWorld).invert():this.matrixWorldInverse.compose(Ed,Td,Ya.set(1,1,1)).invert()}clone(){return new this.constructor().copy(this)}},ys=new q,dE=new Ot,pE=new Ot,li=class extends Ju{constructor(t=50,n=1,i=.1,a=2e3){super(),this.isPerspectiveCamera=!0,this.type="PerspectiveCamera",this.fov=t,this.zoom=1,this.near=i,this.far=a,this.focus=10,this.aspect=n,this.view=null,this.filmGauge=35,this.filmOffset=0,this.updateProjectionMatrix()}copy(t,n){return super.copy(t,n),this.fov=t.fov,this.zoom=t.zoom,this.near=t.near,this.far=t.far,this.focus=t.focus,this.aspect=t.aspect,this.view=t.view===null?null:Object.assign({},t.view),this.filmGauge=t.filmGauge,this.filmOffset=t.filmOffset,this}setFocalLength(t){let n=.5*this.getFilmHeight()/t;this.fov=zd*2*Math.atan(n),this.updateProjectionMatrix()}getFocalLength(){let t=Math.tan(_v*.5*this.fov);return .5*this.getFilmHeight()/t}getEffectiveFOV(){return zd*2*Math.atan(Math.tan(_v*.5*this.fov)/this.zoom)}getFilmWidth(){return this.filmGauge*Math.min(this.aspect,1)}getFilmHeight(){return this.filmGauge/Math.max(this.aspect,1)}getViewBounds(t,n,i){ys.set(-1,-1,.5).applyMatrix4(this.projectionMatrixInverse),n.set(ys.x,ys.y).multiplyScalar(-t/ys.z),ys.set(1,1,.5).applyMatrix4(this.projectionMatrixInverse),i.set(ys.x,ys.y).multiplyScalar(-t/ys.z)}getViewSize(t,n){return this.getViewBounds(t,dE,pE),n.subVectors(pE,dE)}setViewOffset(t,n,i,a,r,s){this.aspect=t/n,this.view===null&&(this.view={enabled:!0,fullWidth:1,fullHeight:1,offsetX:0,offsetY:0,width:1,height:1}),this.view.enabled=!0,this.view.fullWidth=t,this.view.fullHeight=n,this.view.offsetX=i,this.view.offsetY=a,this.view.width=r,this.view.height=s,this.updateProjectionMatrix()}clearViewOffset(){this.view!==null&&(this.view.enabled=!1),this.updateProjectionMatrix()}updateProjectionMatrix(){let t=this.near,n=t*Math.tan(_v*.5*this.fov)/this.zoom,i=2*n,a=this.aspect*i,r=-.5*a,s=this.view;if(this.view!==null&&this.view.enabled){let o=s.fullWidth,c=s.fullHeight;r+=s.offsetX*a/o,n-=s.offsetY*i/c,a*=s.width/o,i*=s.height/c}let l=this.filmOffset;l!==0&&(r+=t*l/this.getFilmWidth()),this.projectionMatrix.makePerspective(r,r+a,n,n-i,t,this.far,this.coordinateSystem,this.reversedDepth),this.projectionMatrixInverse.copy(this.projectionMatrix).invert()}toJSON(t){let n=super.toJSON(t);return n.object.fov=this.fov,n.object.zoom=this.zoom,n.object.near=this.near,n.object.far=this.far,n.object.focus=this.focus,n.object.aspect=this.aspect,this.view!==null&&(n.object.view=Object.assign({},this.view)),n.object.filmGauge=this.filmGauge,n.object.filmOffset=this.filmOffset,n}};var Ku=class extends Ju{constructor(t=-1,n=1,i=1,a=-1,r=.1,s=2e3){super(),this.isOrthographicCamera=!0,this.type="OrthographicCamera",this.zoom=1,this.view=null,this.left=t,this.right=n,this.top=i,this.bottom=a,this.near=r,this.far=s,this.updateProjectionMatrix()}copy(t,n){return super.copy(t,n),this.left=t.left,this.right=t.right,this.top=t.top,this.bottom=t.bottom,this.near=t.near,this.far=t.far,this.zoom=t.zoom,this.view=t.view===null?null:Object.assign({},t.view),this}setViewOffset(t,n,i,a,r,s){this.view===null&&(this.view={enabled:!0,fullWidth:1,fullHeight:1,offsetX:0,offsetY:0,width:1,height:1}),this.view.enabled=!0,this.view.fullWidth=t,this.view.fullHeight=n,this.view.offsetX=i,this.view.offsetY=a,this.view.width=r,this.view.height=s,this.updateProjectionMatrix()}clearViewOffset(){this.view!==null&&(this.view.enabled=!1),this.updateProjectionMatrix()}updateProjectionMatrix(){let t=(this.right-this.left)/(2*this.zoom),n=(this.top-this.bottom)/(2*this.zoom),i=(this.right+this.left)/2,a=(this.top+this.bottom)/2,r=i-t,s=i+t,l=a+n,o=a-n;if(this.view!==null&&this.view.enabled){let c=(this.right-this.left)/this.view.fullWidth/this.zoom,u=(this.top-this.bottom)/this.view.fullHeight/this.zoom;r+=c*this.view.offsetX,s=r+c*this.view.width,l-=u*this.view.offsetY,o=l-u*this.view.height}this.projectionMatrix.makeOrthographic(r,s,l,o,this.near,this.far,this.coordinateSystem,this.reversedDepth),this.projectionMatrixInverse.copy(this.projectionMatrix).invert()}toJSON(t){let n=super.toJSON(t);return n.object.zoom=this.zoom,n.object.left=this.left,n.object.right=this.right,n.object.top=this.top,n.object.bottom=this.bottom,n.object.near=this.near,n.object.far=this.far,this.view!==null&&(n.object.view=Object.assign({},this.view)),n}},$v=class extends op{constructor(){super(new Ku(-5,5,5,-5,.5,500)),this.isDirectionalLightShadow=!0}},rc=class extends sp{constructor(t,n){super(t,n),this.isDirectionalLight=!0,this.type="DirectionalLight",this.position.copy(fi.DEFAULT_UP),this.updateMatrix(),this.target=new fi,this.shadow=new $v}dispose(){super.dispose(),this.shadow.dispose()}copy(t){return super.copy(t),this.target=t.target.clone(),this.shadow=t.shadow.clone(),this}toJSON(t){let n=super.toJSON(t);return n.object.shadow=this.shadow.toJSON(),n.object.target=this.target.uuid,n}};var Bl=-90,Hl=1,sc=class extends fi{constructor(t,n,i){super(),this.type="CubeCamera",this.renderTarget=i,this.coordinateSystem=null,this.activeMipmapLevel=0;let a=new li(Bl,Hl,t,n);a.layers=this.layers,this.add(a);let r=new li(Bl,Hl,t,n);r.layers=this.layers,this.add(r);let s=new li(Bl,Hl,t,n);s.layers=this.layers,this.add(s);let l=new li(Bl,Hl,t,n);l.layers=this.layers,this.add(l);let o=new li(Bl,Hl,t,n);o.layers=this.layers,this.add(o);let c=new li(Bl,Hl,t,n);c.layers=this.layers,this.add(c)}updateCoordinateSystem(){let t=this.coordinateSystem,n=this.children.concat(),[i,a,r,s,l,o]=n;for(let c of n)this.remove(c);if(t===ca)i.up.set(0,1,0),i.lookAt(1,0,0),a.up.set(0,1,0),a.lookAt(-1,0,0),r.up.set(0,0,-1),r.lookAt(0,1,0),s.up.set(0,0,1),s.lookAt(0,-1,0),l.up.set(0,1,0),l.lookAt(0,0,1),o.up.set(0,1,0),o.lookAt(0,0,-1);else if(t===kl)i.up.set(0,-1,0),i.lookAt(-1,0,0),a.up.set(0,-1,0),a.lookAt(1,0,0),r.up.set(0,0,1),r.lookAt(0,1,0),s.up.set(0,0,-1),s.lookAt(0,-1,0),l.up.set(0,-1,0),l.lookAt(0,0,1),o.up.set(0,-1,0),o.lookAt(0,0,-1);else throw new Error("THREE.CubeCamera.updateCoordinateSystem(): Invalid coordinate system: "+t);for(let c of n)this.add(c),c.updateMatrixWorld()}update(t,n){this.parent===null&&this.updateMatrixWorld();let{renderTarget:i,activeMipmapLevel:a}=this;this.coordinateSystem!==t.coordinateSystem&&(this.coordinateSystem=t.coordinateSystem,this.updateCoordinateSystem());let[r,s,l,o,c,u]=this.children,p=t.getRenderTarget(),f=t.getActiveCubeFace(),h=t.getActiveMipmapLevel(),g=t.xr.enabled;t.xr.enabled=!1;let M=i.texture.mipmapsAutoUpdate;i.texture.mipmapsAutoUpdate=!1;let v=!1;t.isWebGLRenderer===!0?v=t.state.buffers.depth.getReversed():v=t.reversedDepthBuffer,t.setRenderTarget(i,0,a),v&&t.autoClear===!1&&t.clearDepth(),t.render(n,r),t.setRenderTarget(i,1,a),v&&t.autoClear===!1&&t.clearDepth(),t.render(n,s),t.setRenderTarget(i,2,a),v&&t.autoClear===!1&&t.clearDepth(),t.render(n,l),t.setRenderTarget(i,3,a),v&&t.autoClear===!1&&t.clearDepth(),t.render(n,o),t.setRenderTarget(i,4,a),v&&t.autoClear===!1&&t.clearDepth(),t.render(n,c),i.texture.mipmapsAutoUpdate=M,t.setRenderTarget(i,5,a),v&&t.autoClear===!1&&t.clearDepth(),t.render(n,u),t.setRenderTarget(p,f,h),t.xr.enabled=g,i.texture.needsPMREMUpdate=!0}},lp=class extends li{constructor(t=[]){super(),this.isArrayCamera=!0,this.isMultiViewCamera=!1,this.cameras=t,this.perCameraFrustumCulled=!1}};var Lx="\\[\\]\\.:\\/",p3=new RegExp("["+Lx+"]","g"),Ux="[^"+Lx+"]",m3="[^"+Lx.replace("\\.","")+"]",g3=/((?:WC+[\/:])*)/.source.replace("WC",Ux),v3=/(WCOD+)?/.source.replace("WCOD",m3),x3=/(?:\.(WC+)(?:\[(.+)\])?)?/.source.replace("WC",Ux),y3=/\.(WC+)(?:\[(.+)\])?/.source.replace("WC",Ux),_3=new RegExp("^"+g3+v3+x3+y3+"$"),b3=["material","materials","bones","map"],tx=class{constructor(t,n,i){let a=i||nn.parseTrackName(n);this._targetGroup=t,this._bindings=t.subscribe_(n,a)}getValue(t,n){this.bind();let i=this._targetGroup.nCachedObjects_,a=this._bindings[i];a!==void 0&&a.getValue(t,n)}setValue(t,n){let i=this._bindings;for(let a=this._targetGroup.nCachedObjects_,r=i.length;a!==r;++a)i[a].setValue(t,n)}bind(){let t=this._bindings;for(let n=this._targetGroup.nCachedObjects_,i=t.length;n!==i;++n)t[n].bind()}unbind(){let t=this._bindings;for(let n=this._targetGroup.nCachedObjects_,i=t.length;n!==i;++n)t[n].unbind()}},nn=class e{constructor(t,n,i){this.path=n,this.parsedPath=i||e.parseTrackName(n),this.node=e.findNode(t,this.parsedPath.nodeName),this.rootNode=t,this.getValue=this._getValue_unbound,this.setValue=this._setValue_unbound}static create(t,n,i){return t&&t.isAnimationObjectGroup?new e.Composite(t,n,i):new e(t,n,i)}static sanitizeNodeName(t){return t.replace(/\s/g,"_").replace(p3,"")}static parseTrackName(t){let n=_3.exec(t);if(n===null)throw new Error("THREE.PropertyBinding: Cannot parse trackName: "+t);let i={nodeName:n[2],objectName:n[3],objectIndex:n[4],propertyName:n[5],propertyIndex:n[6]},a=i.nodeName&&i.nodeName.lastIndexOf(".");if(a!==void 0&&a!==-1){let r=i.nodeName.substring(a+1);b3.indexOf(r)!==-1&&(i.nodeName=i.nodeName.substring(0,a),i.objectName=r)}if(i.propertyName===null||i.propertyName.length===0)throw new Error("THREE.PropertyBinding: can not parse propertyName from trackName: "+t);return i}static findNode(t,n){if(n===void 0||n===""||n==="."||n===-1||n===t.name||n===t.uuid)return t;if(t.skeleton){let i=t.skeleton.getBoneByName(n);if(i!==void 0)return i}if(t.children){let i=function(r){for(let s=0;s<r.length;s++){let l=r[s];if(l.name===n||l.uuid===n)return l;let o=i(l.children);if(o)return o}return null},a=i(t.children);if(a)return a}return null}_getValue_unavailable(){}_setValue_unavailable(){}_getValue_direct(t,n){t[n]=this.targetObject[this.propertyName]}_getValue_array(t,n){let i=this.resolvedProperty;for(let a=0,r=i.length;a!==r;++a)t[n++]=i[a]}_getValue_arrayElement(t,n){t[n]=this.resolvedProperty[this.propertyIndex]}_getValue_toArray(t,n){this.resolvedProperty.toArray(t,n)}_setValue_direct(t,n){this.targetObject[this.propertyName]=t[n]}_setValue_direct_setNeedsUpdate(t,n){this.targetObject[this.propertyName]=t[n],this.targetObject.needsUpdate=!0}_setValue_direct_setMatrixWorldNeedsUpdate(t,n){this.targetObject[this.propertyName]=t[n],this.targetObject.matrixWorldNeedsUpdate=!0}_setValue_array(t,n){let i=this.resolvedProperty;for(let a=0,r=i.length;a!==r;++a)i[a]=t[n++]}_setValue_array_setNeedsUpdate(t,n){let i=this.resolvedProperty;for(let a=0,r=i.length;a!==r;++a)i[a]=t[n++];this.targetObject.needsUpdate=!0}_setValue_array_setMatrixWorldNeedsUpdate(t,n){let i=this.resolvedProperty;for(let a=0,r=i.length;a!==r;++a)i[a]=t[n++];this.targetObject.matrixWorldNeedsUpdate=!0}_setValue_arrayElement(t,n){this.resolvedProperty[this.propertyIndex]=t[n]}_setValue_arrayElement_setNeedsUpdate(t,n){this.resolvedProperty[this.propertyIndex]=t[n],this.targetObject.needsUpdate=!0}_setValue_arrayElement_setMatrixWorldNeedsUpdate(t,n){this.resolvedProperty[this.propertyIndex]=t[n],this.targetObject.matrixWorldNeedsUpdate=!0}_setValue_fromArray(t,n){this.resolvedProperty.fromArray(t,n)}_setValue_fromArray_setNeedsUpdate(t,n){this.resolvedProperty.fromArray(t,n),this.targetObject.needsUpdate=!0}_setValue_fromArray_setMatrixWorldNeedsUpdate(t,n){this.resolvedProperty.fromArray(t,n),this.targetObject.matrixWorldNeedsUpdate=!0}_getValue_unbound(t,n){this.bind(),this.getValue(t,n)}_setValue_unbound(t,n){this.bind(),this.setValue(t,n)}bind(){let t=this.node,n=this.parsedPath,i=n.objectName,a=n.propertyName,r=n.propertyIndex;if(t||(t=e.findNode(this.rootNode,n.nodeName),this.node=t),this.getValue=this._getValue_unavailable,this.setValue=this._setValue_unavailable,!t){ce("PropertyBinding: No target node found for track: "+this.path+".");return}if(i){let c=n.objectIndex;switch(i){case"materials":if(!t.material){ue("PropertyBinding: Can not bind to material as node does not have a material.",this);return}if(!t.material.materials){ue("PropertyBinding: Can not bind to material.materials as node.material does not have a materials array.",this);return}t=t.material.materials;break;case"bones":if(!t.skeleton){ue("PropertyBinding: Can not bind to bones as node does not have a skeleton.",this);return}t=t.skeleton.bones;for(let u=0;u<t.length;u++)if(t[u].name===c){c=u;break}break;case"map":if("map"in t){t=t.map;break}if(!t.material){ue("PropertyBinding: Can not bind to material as node does not have a material.",this);return}if(!t.material.map){ue("PropertyBinding: Can not bind to material.map as node.material does not have a map.",this);return}t=t.material.map;break;default:if(t[i]===void 0){ue("PropertyBinding: Can not bind to objectName of node undefined.",this);return}t=t[i]}if(c!==void 0){if(t[c]===void 0){ue("PropertyBinding: Trying to bind to objectIndex of objectName, but is undefined.",this,t);return}t=t[c]}}let s=t[a];if(s===void 0){let c=n.nodeName;ue("PropertyBinding: Trying to update property for track: "+c+"."+a+" but it wasn't found.",t);return}let l=this.Versioning.None;this.targetObject=t,t.isMaterial===!0?l=this.Versioning.NeedsUpdate:t.isObject3D===!0&&(l=this.Versioning.MatrixWorldNeedsUpdate);let o=this.BindingType.Direct;if(r!==void 0){if(a==="morphTargetInfluences"){if(!t.geometry){ue("PropertyBinding: Can not bind to morphTargetInfluences because node does not have a geometry.",this);return}if(!t.geometry.morphAttributes){ue("PropertyBinding: Can not bind to morphTargetInfluences because node does not have a geometry.morphAttributes.",this);return}t.morphTargetDictionary[r]!==void 0&&(r=t.morphTargetDictionary[r])}o=this.BindingType.ArrayElement,this.resolvedProperty=s,this.propertyIndex=r}else s.fromArray!==void 0&&s.toArray!==void 0?(o=this.BindingType.HasFromToArray,this.resolvedProperty=s):Array.isArray(s)?(o=this.BindingType.EntireArray,this.resolvedProperty=s):this.propertyName=a;this.getValue=this.GetterByBindingType[o],this.setValue=this.SetterByBindingTypeAndVersioning[o][l]}unbind(){this.node=null,this.getValue=this._getValue_unbound,this.setValue=this._setValue_unbound}};nn.Composite=tx;nn.prototype.BindingType={Direct:0,EntireArray:1,ArrayElement:2,HasFromToArray:3};nn.prototype.Versioning={None:0,NeedsUpdate:1,MatrixWorldNeedsUpdate:2};nn.prototype.GetterByBindingType=[nn.prototype._getValue_direct,nn.prototype._getValue_array,nn.prototype._getValue_arrayElement,nn.prototype._getValue_toArray];nn.prototype.SetterByBindingTypeAndVersioning=[[nn.prototype._setValue_direct,nn.prototype._setValue_direct_setNeedsUpdate,nn.prototype._setValue_direct_setMatrixWorldNeedsUpdate],[nn.prototype._setValue_array,nn.prototype._setValue_array_setNeedsUpdate,nn.prototype._setValue_array_setMatrixWorldNeedsUpdate],[nn.prototype._setValue_arrayElement,nn.prototype._setValue_arrayElement_setNeedsUpdate,nn.prototype._setValue_arrayElement_setMatrixWorldNeedsUpdate],[nn.prototype._setValue_fromArray,nn.prototype._setValue_fromArray_setNeedsUpdate,nn.prototype._setValue_fromArray_setMatrixWorldNeedsUpdate]];var _P=new Float32Array(1);var mE=new Ye,ju=class{constructor(t,n,i=0,a=1/0){this.ray=new Pu(t,n),this.near=i,this.far=a,this.camera=null,this.layers=new ql,this.params={Mesh:{},Line:{threshold:1},LOD:{},Points:{threshold:1},Sprite:{}}}set(t,n){this.ray.set(t,n)}setFromCamera(t,n){n.isPerspectiveCamera?(this.ray.origin.setFromMatrixPosition(n.matrixWorld),this.ray.direction.set(t.x,t.y,.5).unproject(n).sub(this.ray.origin).normalize(),this.camera=n):n.isOrthographicCamera?(this.ray.origin.set(t.x,t.y,n.projectionMatrix.elements[14]).unproject(n),this.ray.direction.set(0,0,-1).transformDirection(n.matrixWorld),this.camera=n):ue("Raycaster: Unsupported camera type: "+n.type)}setFromXRController(t){return mE.identity().extractRotation(t.matrixWorld),this.ray.origin.setFromMatrixPosition(t.matrixWorld),this.ray.direction.set(0,0,-1).applyMatrix4(mE),this}intersectObject(t,n=!0,i=[]){return ex(t,this,i,n),i.sort(gE),i}intersectObjects(t,n=!0,i=[]){for(let a=0,r=t.length;a<r;a++)ex(t[a],this,i,n);return i.sort(gE),i}};function gE(e,t){return e.distance-t.distance}function ex(e,t,n,i){let a=!0;if(e.layers.test(t.layers)&&e.raycast(t,n)===!1&&(a=!1),a===!0&&i===!0){let r=e.children;for(let s=0,l=r.length;s<l;s++)ex(r[s],t,n,!0)}}var Bx=class Bx{constructor(t,n,i,a){this.elements=[1,0,0,1],t!==void 0&&this.set(t,n,i,a)}identity(){return this.set(1,0,0,1),this}fromArray(t,n=0){for(let i=0;i<4;i++)this.elements[i]=t[i+n];return this}set(t,n,i,a){let r=this.elements;return r[0]=t,r[2]=n,r[1]=i,r[3]=a,this}};Bx.prototype.isMatrix2=!0;var nx=Bx;function Ix(e,t,n,i){let a=S3(i);switch(n){case bx:return e*t;case Mx:return e*t/a.components*a.byteLength;case gp:return e*t/a.components*a.byteLength;case Ds:return e*t*2/a.components*a.byteLength;case vp:return e*t*2/a.components*a.byteLength;case Sx:return e*t*3/a.components*a.byteLength;case wa:return e*t*4/a.components*a.byteLength;case xp:return e*t*4/a.components*a.byteLength;case ef:case nf:return Math.floor((e+3)/4)*Math.floor((t+3)/4)*8;case af:case rf:return Math.floor((e+3)/4)*Math.floor((t+3)/4)*16;case _p:case Sp:return Math.max(e,16)*Math.max(t,8)/4;case yp:case bp:return Math.max(e,8)*Math.max(t,8)/2;case Mp:case Ep:case wp:case Ap:return Math.floor((e+3)/4)*Math.floor((t+3)/4)*8;case Tp:case sf:case Rp:return Math.floor((e+3)/4)*Math.floor((t+3)/4)*16;case Cp:return Math.floor((e+3)/4)*Math.floor((t+3)/4)*16;case Dp:return Math.floor((e+4)/5)*Math.floor((t+3)/4)*16;case Np:return Math.floor((e+4)/5)*Math.floor((t+4)/5)*16;case Lp:return Math.floor((e+5)/6)*Math.floor((t+4)/5)*16;case Up:return Math.floor((e+5)/6)*Math.floor((t+5)/6)*16;case Ip:return Math.floor((e+7)/8)*Math.floor((t+4)/5)*16;case Op:return Math.floor((e+7)/8)*Math.floor((t+5)/6)*16;case Pp:return Math.floor((e+7)/8)*Math.floor((t+7)/8)*16;case zp:return Math.floor((e+9)/10)*Math.floor((t+4)/5)*16;case Fp:return Math.floor((e+9)/10)*Math.floor((t+5)/6)*16;case Bp:return Math.floor((e+9)/10)*Math.floor((t+7)/8)*16;case Hp:return Math.floor((e+9)/10)*Math.floor((t+9)/10)*16;case Gp:return Math.floor((e+11)/12)*Math.floor((t+9)/10)*16;case Vp:return Math.floor((e+11)/12)*Math.floor((t+11)/12)*16;case kp:case Xp:case Wp:return Math.ceil(e/4)*Math.ceil(t/4)*16;case qp:case Yp:return Math.ceil(e/4)*Math.ceil(t/4)*8;case of:case Zp:return Math.ceil(e/4)*Math.ceil(t/4)*16}throw new Error(`Unable to determine texture byte length for ${n} format.`)}function S3(e){switch(e){case wi:case vx:return{byteLength:1,components:1};case uc:case xx:case Ta:return{byteLength:2,components:1};case pp:case mp:return{byteLength:2,components:4};case Ma:case dp:case Ea:return{byteLength:4,components:1};case yx:case _x:return{byteLength:4,components:3}}throw new Error(`THREE.TextureUtils: Unknown texture type ${e}.`)}typeof __THREE_DEVTOOLS__<"u"&&__THREE_DEVTOOLS__.dispatchEvent(new CustomEvent("register",{detail:{revision:"187"}}));typeof window<"u"&&(window.__THREE__?ce("WARNING: Multiple instances of Three.js being imported."):window.__THREE__="187");function DT(){let e=null,t=!1,n=null,i=null;function a(r,s){i=e.requestAnimationFrame(a),n(r,s)}return{start:function(){t!==!0&&n!==null&&e!==null&&(i=e.requestAnimationFrame(a),t=!0)},stop:function(){e!==null&&e.cancelAnimationFrame(i),t=!1},setAnimationLoop:function(r){n=r},setContext:function(r){e=r}}}function E3(e){let t=new WeakMap;function n(l,o){let c=l.array,u=l.usage,p=c.byteLength,f=e.createBuffer();e.bindBuffer(o,f),e.bufferData(o,c,u),l.onUploadCallback();let h;if(c instanceof Float32Array)h=e.FLOAT;else if(typeof Float16Array<"u"&&c instanceof Float16Array)h=e.HALF_FLOAT;else if(c instanceof Uint16Array)l.isFloat16BufferAttribute?h=e.HALF_FLOAT:h=e.UNSIGNED_SHORT;else if(c instanceof Int16Array)h=e.SHORT;else if(c instanceof Uint32Array)h=e.UNSIGNED_INT;else if(c instanceof Int32Array)h=e.INT;else if(c instanceof Int8Array)h=e.BYTE;else if(c instanceof Uint8Array)h=e.UNSIGNED_BYTE;else if(c instanceof Uint8ClampedArray)h=e.UNSIGNED_BYTE;else throw new Error("THREE.WebGLAttributes: Unsupported buffer data format: "+c);return{buffer:f,type:h,bytesPerElement:c.BYTES_PER_ELEMENT,version:l.version,size:p}}function i(l,o,c){let u=o.array,p=o.updateRanges;if(e.bindBuffer(c,l),p.length===0)e.bufferSubData(c,0,u);else{p.sort((h,g)=>h.start-g.start);let f=0;for(let h=1;h<p.length;h++){let g=p[f],M=p[h];M.start<=g.start+g.count+1?g.count=Math.max(g.count,M.start+M.count-g.start):(++f,p[f]=M)}p.length=f+1;for(let h=0,g=p.length;h<g;h++){let M=p[h];e.bufferSubData(c,M.start*u.BYTES_PER_ELEMENT,u,M.start,M.count)}o.clearUpdateRanges()}o.onUploadCallback()}function a(l){return l.isInterleavedBufferAttribute&&(l=l.data),t.get(l)}function r(l){l.isInterleavedBufferAttribute&&(l=l.data);let o=t.get(l);o&&(e.deleteBuffer(o.buffer),t.delete(l))}function s(l,o){if(l.isInterleavedBufferAttribute&&(l=l.data),l.isGLBufferAttribute){let u=t.get(l);(!u||u.version<l.version)&&t.set(l,{buffer:l.buffer,type:l.type,bytesPerElement:l.elementSize,version:l.version});return}let c=t.get(l);if(c===void 0)t.set(l,n(l,o));else if(c.version<l.version){if(c.size!==l.array.byteLength)throw new Error("THREE.WebGLAttributes: The size of the buffer attribute's array buffer does not match the original size. Resizing buffer attributes is not supported.");i(c.buffer,l,o),c.version=l.version}}return{get:a,remove:r,update:s}}var T3=`#ifdef USE_ALPHAHASH
	if ( diffuseColor.a < getAlphaHashThreshold( vPosition ) ) discard;
#endif`,w3=`#ifdef USE_ALPHAHASH
	const float ALPHA_HASH_SCALE = 0.05;
	float hash2D( vec2 value ) {
		return fract( 1.0e4 * sin( 17.0 * value.x + 0.1 * value.y ) * ( 0.1 + abs( sin( 13.0 * value.y + value.x ) ) ) );
	}
	float hash3D( vec3 value ) {
		return hash2D( vec2( hash2D( value.xy ), value.z ) );
	}
	float getAlphaHashThreshold( vec3 position ) {
		float maxDeriv = max(
			length( dFdx( position.xyz ) ),
			length( dFdy( position.xyz ) )
		);
		float pixScale = 1.0 / ( ALPHA_HASH_SCALE * maxDeriv );
		vec2 pixScales = vec2(
			exp2( floor( log2( pixScale ) ) ),
			exp2( ceil( log2( pixScale ) ) )
		);
		vec2 alpha = vec2(
			hash3D( floor( pixScales.x * position.xyz ) ),
			hash3D( floor( pixScales.y * position.xyz ) )
		);
		float lerpFactor = fract( log2( pixScale ) );
		float x = ( 1.0 - lerpFactor ) * alpha.x + lerpFactor * alpha.y;
		float a = min( lerpFactor, 1.0 - lerpFactor );
		vec3 cases = vec3(
			x * x / ( 2.0 * a * ( 1.0 - a ) ),
			( x - 0.5 * a ) / ( 1.0 - a ),
			1.0 - ( ( 1.0 - x ) * ( 1.0 - x ) / ( 2.0 * a * ( 1.0 - a ) ) )
		);
		float threshold = ( x < ( 1.0 - a ) )
			? ( ( x < a ) ? cases.x : cases.y )
			: cases.z;
		return clamp( threshold , 1.0e-6, 1.0 );
	}
#endif`,A3=`#ifdef USE_ALPHAMAP
	diffuseColor.a *= texture2D( alphaMap, vAlphaMapUv ).g;
#endif`,R3=`#ifdef USE_ALPHAMAP
	uniform sampler2D alphaMap;
#endif`,C3=`#ifdef USE_ALPHATEST
	#ifdef ALPHA_TO_COVERAGE
	diffuseColor.a = smoothstep( alphaTest, alphaTest + fwidth( diffuseColor.a ), diffuseColor.a );
	if ( diffuseColor.a == 0.0 ) discard;
	#else
	if ( diffuseColor.a < alphaTest ) discard;
	#endif
#endif`,D3=`#ifdef USE_ALPHATEST
	uniform float alphaTest;
#endif`,N3=`#ifdef USE_AOMAP
	float ambientOcclusion = ( texture2D( aoMap, vAoMapUv ).r - 1.0 ) * aoMapIntensity + 1.0;
	reflectedLight.indirectDiffuse *= ambientOcclusion;
	#if defined( USE_CLEARCOAT ) 
		clearcoatSpecularIndirect *= ambientOcclusion;
	#endif
	#if defined( USE_SHEEN ) 
		sheenSpecularIndirect *= ambientOcclusion;
	#endif
	#if defined( USE_ENVMAP ) && defined( STANDARD )
		float dotNV = saturate( dot( geometryNormal, geometryViewDir ) );
		reflectedLight.indirectSpecular *= computeSpecularOcclusion( dotNV, ambientOcclusion, material.roughness );
	#endif
#endif`,L3=`#ifdef USE_AOMAP
	uniform sampler2D aoMap;
	uniform float aoMapIntensity;
#endif`,U3=`#ifdef USE_BATCHING
	#if ! defined( GL_ANGLE_multi_draw )
	#define gl_DrawID _gl_DrawID
	uniform int _gl_DrawID;
	#endif
	uniform highp sampler2D batchingTexture;
	uniform highp usampler2D batchingIdTexture;
	mat4 getBatchingMatrix( const in float i ) {
		int size = textureSize( batchingTexture, 0 ).x;
		int j = int( i ) * 4;
		int x = j % size;
		int y = j / size;
		vec4 v1 = texelFetch( batchingTexture, ivec2( x, y ), 0 );
		vec4 v2 = texelFetch( batchingTexture, ivec2( x + 1, y ), 0 );
		vec4 v3 = texelFetch( batchingTexture, ivec2( x + 2, y ), 0 );
		vec4 v4 = texelFetch( batchingTexture, ivec2( x + 3, y ), 0 );
		return mat4( v1, v2, v3, v4 );
	}
	float getIndirectIndex( const in int i ) {
		int size = textureSize( batchingIdTexture, 0 ).x;
		int x = i % size;
		int y = i / size;
		return float( texelFetch( batchingIdTexture, ivec2( x, y ), 0 ).r );
	}
#endif
#ifdef USE_BATCHING_COLOR
	uniform sampler2D batchingColorTexture;
	vec4 getBatchingColor( const in float i ) {
		int size = textureSize( batchingColorTexture, 0 ).x;
		int j = int( i );
		int x = j % size;
		int y = j / size;
		return texelFetch( batchingColorTexture, ivec2( x, y ), 0 );
	}
#endif`,I3=`#ifdef USE_BATCHING
	mat4 batchingMatrix = getBatchingMatrix( getIndirectIndex( gl_DrawID ) );
#endif`,O3=`vec3 transformed = vec3( position );
#ifdef USE_ALPHAHASH
	vPosition = vec3( position );
#endif`,P3=`vec3 objectNormal = vec3( normal );
#ifdef USE_TANGENT
	vec3 objectTangent = vec3( tangent.xyz );
#endif`,z3=`float G_BlinnPhong_Implicit( ) {
	return 0.25;
}
float D_BlinnPhong( const in float shininess, const in float dotNH ) {
	return RECIPROCAL_PI * ( shininess * 0.5 + 1.0 ) * pow( dotNH, shininess );
}
vec3 BRDF_BlinnPhong( const in vec3 lightDir, const in vec3 viewDir, const in vec3 normal, const in vec3 specularColor, const in float shininess ) {
	vec3 halfDir = normalize( lightDir + viewDir );
	float dotNH = saturate( dot( normal, halfDir ) );
	float dotVH = saturate( dot( viewDir, halfDir ) );
	vec3 F = F_Schlick( specularColor, 1.0, dotVH );
	float G = G_BlinnPhong_Implicit( );
	float D = D_BlinnPhong( shininess, dotNH );
	return F * ( G * D );
} // validated`,F3=`#ifdef USE_IRIDESCENCE
	const mat3 XYZ_TO_REC709 = mat3(
		 3.2404542, -0.9692660,  0.0556434,
		-1.5371385,  1.8760108, -0.2040259,
		-0.4985314,  0.0415560,  1.0572252
	);
	vec3 Fresnel0ToIor( vec3 fresnel0 ) {
		vec3 sqrtF0 = sqrt( fresnel0 );
		return ( vec3( 1.0 ) + sqrtF0 ) / ( vec3( 1.0 ) - sqrtF0 );
	}
	vec3 IorToFresnel0( vec3 transmittedIor, float incidentIor ) {
		return pow2( ( transmittedIor - vec3( incidentIor ) ) / ( transmittedIor + vec3( incidentIor ) ) );
	}
	float IorToFresnel0( float transmittedIor, float incidentIor ) {
		return pow2( ( transmittedIor - incidentIor ) / ( transmittedIor + incidentIor ));
	}
	vec3 evalSensitivity( float OPD, vec3 shift ) {
		float phase = 2.0 * PI * OPD * 1.0e-9;
		vec3 val = vec3( 5.4856e-13, 4.4201e-13, 5.2481e-13 );
		vec3 pos = vec3( 1.6810e+06, 1.7953e+06, 2.2084e+06 );
		vec3 var = vec3( 4.3278e+09, 9.3046e+09, 6.6121e+09 );
		vec3 xyz = val * sqrt( 2.0 * PI * var ) * cos( pos * phase + shift ) * exp( - pow2( phase ) * var );
		xyz.x += 9.7470e-14 * sqrt( 2.0 * PI * 4.5282e+09 ) * cos( 2.2399e+06 * phase + shift[ 0 ] ) * exp( - 4.5282e+09 * pow2( phase ) );
		xyz /= 1.0685e-7;
		vec3 rgb = XYZ_TO_REC709 * xyz;
		return rgb;
	}
	vec3 evalIridescence( float outsideIOR, float eta2, float cosTheta1, float thinFilmThickness, vec3 baseF0 ) {
		vec3 I;
		float iridescenceIOR = mix( outsideIOR, eta2, smoothstep( 0.0, 0.03, thinFilmThickness ) );
		float sinTheta2Sq = pow2( outsideIOR / iridescenceIOR ) * ( 1.0 - pow2( cosTheta1 ) );
		float cosTheta2Sq = 1.0 - sinTheta2Sq;
		if ( cosTheta2Sq < 0.0 ) {
			return vec3( 1.0 );
		}
		float cosTheta2 = sqrt( cosTheta2Sq );
		float R0 = IorToFresnel0( iridescenceIOR, outsideIOR );
		float R12 = F_Schlick( R0, 1.0, cosTheta1 );
		float T121 = 1.0 - R12;
		float phi12 = 0.0;
		if ( iridescenceIOR < outsideIOR ) phi12 = PI;
		float phi21 = PI - phi12;
		vec3 baseIOR = Fresnel0ToIor( clamp( baseF0, 0.0, 0.9999 ) );		vec3 R1 = IorToFresnel0( baseIOR, iridescenceIOR );
		vec3 R23 = F_Schlick( R1, 1.0, cosTheta2 );
		vec3 phi23 = vec3( 0.0 );
		if ( baseIOR[ 0 ] < iridescenceIOR ) phi23[ 0 ] = PI;
		if ( baseIOR[ 1 ] < iridescenceIOR ) phi23[ 1 ] = PI;
		if ( baseIOR[ 2 ] < iridescenceIOR ) phi23[ 2 ] = PI;
		float OPD = 2.0 * iridescenceIOR * thinFilmThickness * cosTheta2;
		vec3 phi = vec3( phi21 ) + phi23;
		vec3 R123 = clamp( R12 * R23, 1e-5, 0.9999 );
		vec3 r123 = sqrt( R123 );
		vec3 Rs = pow2( T121 ) * R23 / ( vec3( 1.0 ) - R123 );
		vec3 C0 = R12 + Rs;
		I = C0;
		vec3 Cm = Rs - T121;
		for ( int m = 1; m <= 2; ++ m ) {
			Cm *= r123;
			vec3 Sm = 2.0 * evalSensitivity( float( m ) * OPD, float( m ) * phi );
			I += Cm * Sm;
		}
		return max( I, vec3( 0.0 ) );
	}
#endif`,B3=`#ifdef USE_BUMPMAP
	uniform sampler2D bumpMap;
	uniform float bumpScale;
	vec2 dHdxy_fwd() {
		vec2 dSTdx = dFdx( vBumpMapUv );
		vec2 dSTdy = dFdy( vBumpMapUv );
		float Hll = bumpScale * texture2D( bumpMap, vBumpMapUv ).x;
		float dBx = bumpScale * texture2D( bumpMap, vBumpMapUv + dSTdx ).x - Hll;
		float dBy = bumpScale * texture2D( bumpMap, vBumpMapUv + dSTdy ).x - Hll;
		return vec2( dBx, dBy );
	}
	vec3 perturbNormalArb( vec3 surf_pos, vec3 surf_norm, vec2 dHdxy, float faceDirection ) {
		vec3 vSigmaX = normalize( dFdx( surf_pos.xyz ) );
		vec3 vSigmaY = normalize( dFdy( surf_pos.xyz ) );
		vec3 vN = surf_norm;
		vec3 R1 = cross( vSigmaY, vN );
		vec3 R2 = cross( vN, vSigmaX );
		float fDet = dot( vSigmaX, R1 ) * faceDirection;
		vec3 vGrad = sign( fDet ) * ( dHdxy.x * R1 + dHdxy.y * R2 );
		return normalize( abs( fDet ) * surf_norm - vGrad );
	}
#endif`,H3=`#if NUM_CLIPPING_PLANES > 0
	vec4 plane;
	#ifdef ALPHA_TO_COVERAGE
		float distanceToPlane, distanceGradient;
		float clipOpacity = 1.0;
		#pragma unroll_loop_start
		for ( int i = 0; i < UNION_CLIPPING_PLANES; i ++ ) {
			plane = clippingPlanes[ i ];
			distanceToPlane = - dot( vClipPosition, plane.xyz ) + plane.w;
			distanceGradient = fwidth( distanceToPlane ) / 2.0;
			clipOpacity *= smoothstep( - distanceGradient, distanceGradient, distanceToPlane );
			if ( clipOpacity == 0.0 ) discard;
		}
		#pragma unroll_loop_end
		#if UNION_CLIPPING_PLANES < NUM_CLIPPING_PLANES
			float unionClipOpacity = 1.0;
			#pragma unroll_loop_start
			for ( int i = UNION_CLIPPING_PLANES; i < NUM_CLIPPING_PLANES; i ++ ) {
				plane = clippingPlanes[ i ];
				distanceToPlane = - dot( vClipPosition, plane.xyz ) + plane.w;
				distanceGradient = fwidth( distanceToPlane ) / 2.0;
				unionClipOpacity *= 1.0 - smoothstep( - distanceGradient, distanceGradient, distanceToPlane );
			}
			#pragma unroll_loop_end
			clipOpacity *= 1.0 - unionClipOpacity;
		#endif
		diffuseColor.a *= clipOpacity;
		if ( diffuseColor.a == 0.0 ) discard;
	#else
		#pragma unroll_loop_start
		for ( int i = 0; i < UNION_CLIPPING_PLANES; i ++ ) {
			plane = clippingPlanes[ i ];
			if ( dot( vClipPosition, plane.xyz ) > plane.w ) discard;
		}
		#pragma unroll_loop_end
		#if UNION_CLIPPING_PLANES < NUM_CLIPPING_PLANES
			bool clipped = true;
			#pragma unroll_loop_start
			for ( int i = UNION_CLIPPING_PLANES; i < NUM_CLIPPING_PLANES; i ++ ) {
				plane = clippingPlanes[ i ];
				clipped = ( dot( vClipPosition, plane.xyz ) > plane.w ) && clipped;
			}
			#pragma unroll_loop_end
			if ( clipped ) discard;
		#endif
	#endif
#endif`,G3=`#if NUM_CLIPPING_PLANES > 0
	varying vec3 vClipPosition;
	uniform vec4 clippingPlanes[ NUM_CLIPPING_PLANES ];
#endif`,V3=`#if NUM_CLIPPING_PLANES > 0
	varying vec3 vClipPosition;
#endif`,k3=`#if NUM_CLIPPING_PLANES > 0
	vClipPosition = - mvPosition.xyz;
#endif`,X3=`#if defined( USE_COLOR ) || defined( USE_COLOR_ALPHA )
	diffuseColor *= vColor;
#endif`,W3=`#if defined( USE_COLOR ) || defined( USE_COLOR_ALPHA )
	varying vec4 vColor;
#endif`,q3=`#if defined( USE_COLOR ) || defined( USE_COLOR_ALPHA ) || defined( USE_INSTANCING_COLOR ) || defined( USE_BATCHING_COLOR )
	varying vec4 vColor;
#endif`,Y3=`#if defined( USE_COLOR ) || defined( USE_COLOR_ALPHA ) || defined( USE_INSTANCING_COLOR ) || defined( USE_BATCHING_COLOR )
	vColor = vec4( 1.0 );
#endif
#ifdef USE_COLOR_ALPHA
	vColor *= color;
#elif defined( USE_COLOR )
	vColor.rgb *= color;
#endif
#ifdef USE_INSTANCING_COLOR
	vColor.rgb *= instanceColor.rgb;
#endif
#ifdef USE_BATCHING_COLOR
	vColor *= getBatchingColor( getIndirectIndex( gl_DrawID ) );
#endif`,Z3=`#define PI 3.141592653589793
#define PI2 6.283185307179586
#define PI_HALF 1.5707963267948966
#define RECIPROCAL_PI 0.3183098861837907
#define RECIPROCAL_PI2 0.15915494309189535
#define EPSILON 1e-6
#ifndef saturate
#define saturate( a ) clamp( a, 0.0, 1.0 )
#endif
#define whiteComplement( a ) ( 1.0 - saturate( a ) )
float pow2( const in float x ) { return x*x; }
vec3 pow2( const in vec3 x ) { return x*x; }
float pow3( const in float x ) { return x*x*x; }
float pow4( const in float x ) { float x2 = x*x; return x2*x2; }
float max3( const in vec3 v ) { return max( max( v.x, v.y ), v.z ); }
float average( const in vec3 v ) { return dot( v, vec3( 0.3333333 ) ); }
highp float rand( const in vec2 uv ) {
	const highp float a = 12.9898, b = 78.233, c = 43758.5453;
	highp float dt = dot( uv.xy, vec2( a,b ) ), sn = mod( dt, PI );
	return fract( sin( sn ) * c );
}
#ifdef HIGH_PRECISION
	float precisionSafeLength( vec3 v ) { return length( v ); }
#else
	float precisionSafeLength( vec3 v ) {
		float maxComponent = max3( abs( v ) );
		return length( v / maxComponent ) * maxComponent;
	}
#endif
struct IncidentLight {
	vec3 color;
	vec3 direction;
	bool visible;
};
struct ReflectedLight {
	vec3 directDiffuse;
	vec3 directSpecular;
	vec3 indirectDiffuse;
	vec3 indirectSpecular;
};
#ifdef USE_ALPHAHASH
	varying vec3 vPosition;
#endif
vec3 transformDirection( in vec3 dir, in mat4 matrix ) {
	return normalize( ( matrix * vec4( dir, 0.0 ) ).xyz );
}
#define inverseTransformDirection transformDirectionByInverseViewMatrix
vec3 transformNormalByInverseViewMatrix( in vec3 normal, in mat4 viewMatrix ) {
	return normalize( ( vec4( normal, 0.0 ) * viewMatrix ).xyz );
}
vec3 transformDirectionByInverseViewMatrix( in vec3 dir, in mat4 viewMatrix ) {
	return normalize( ( vec4( dir, 0.0 ) * viewMatrix ).xyz );
}
bool isPerspectiveMatrix( mat4 m ) {
	return m[ 2 ][ 3 ] == - 1.0;
}
vec2 equirectUv( in vec3 dir ) {
	float u = atan( dir.z, dir.x ) * RECIPROCAL_PI2 + 0.5;
	float v = asin( clamp( dir.y, - 1.0, 1.0 ) ) * RECIPROCAL_PI + 0.5;
	return vec2( u, v );
}
vec3 BRDF_Lambert( const in vec3 diffuseColor ) {
	return RECIPROCAL_PI * diffuseColor;
}
vec3 F_Schlick( const in vec3 f0, const in float f90, const in float dotVH ) {
	float fresnel = exp2( ( - 5.55473 * dotVH - 6.98316 ) * dotVH );
	return f0 * ( 1.0 - fresnel ) + ( f90 * fresnel );
}
float F_Schlick( const in float f0, const in float f90, const in float dotVH ) {
	float fresnel = exp2( ( - 5.55473 * dotVH - 6.98316 ) * dotVH );
	return f0 * ( 1.0 - fresnel ) + ( f90 * fresnel );
} // validated`,J3=`vec3 transformedNormal = objectNormal;
#ifdef USE_TANGENT
	vec3 transformedTangent = objectTangent;
#endif
#ifdef USE_BATCHING
	mat3 bm = mat3( batchingMatrix );
	transformedNormal /= vec3( dot( bm[ 0 ], bm[ 0 ] ), dot( bm[ 1 ], bm[ 1 ] ), dot( bm[ 2 ], bm[ 2 ] ) );
	transformedNormal = bm * transformedNormal;
	#ifdef USE_TANGENT
		transformedTangent = bm * transformedTangent;
	#endif
#endif
#ifdef USE_INSTANCING
	mat3 im = mat3( instanceMatrix );
	transformedNormal /= vec3( dot( im[ 0 ], im[ 0 ] ), dot( im[ 1 ], im[ 1 ] ), dot( im[ 2 ], im[ 2 ] ) );
	transformedNormal = im * transformedNormal;
	#ifdef USE_TANGENT
		transformedTangent = im * transformedTangent;
	#endif
#endif
transformedNormal = normalMatrix * transformedNormal;
#ifdef FLIP_SIDED
	transformedNormal = - transformedNormal;
#endif
#ifdef USE_TANGENT
	transformedTangent = ( modelViewMatrix * vec4( transformedTangent, 0.0 ) ).xyz;
#endif`,K3=`#ifdef USE_DISPLACEMENTMAP
	uniform sampler2D displacementMap;
	uniform float displacementScale;
	uniform float displacementBias;
#endif`,j3=`#ifdef USE_DISPLACEMENTMAP
	transformed += normalize( objectNormal ) * ( texture2D( displacementMap, vDisplacementMapUv ).x * displacementScale + displacementBias );
#endif`,Q3=`#ifdef USE_EMISSIVEMAP
	vec4 emissiveColor = texture2D( emissiveMap, vEmissiveMapUv );
	#ifdef DECODE_VIDEO_TEXTURE_EMISSIVE
		emissiveColor = sRGBTransferEOTF( emissiveColor );
	#endif
	totalEmissiveRadiance *= emissiveColor.rgb;
#endif`,$3=`#ifdef USE_EMISSIVEMAP
	uniform sampler2D emissiveMap;
#endif`,tD="gl_FragColor = linearToOutputTexel( gl_FragColor );",eD=`vec4 LinearTransferOETF( in vec4 value ) {
	return value;
}
vec4 sRGBTransferEOTF( in vec4 value ) {
	return vec4( mix( pow( value.rgb * 0.9478672986 + vec3( 0.0521327014 ), vec3( 2.4 ) ), value.rgb * 0.0773993808, vec3( lessThanEqual( value.rgb, vec3( 0.04045 ) ) ) ), value.a );
}
vec4 sRGBTransferOETF( in vec4 value ) {
	return vec4( mix( pow( value.rgb, vec3( 0.41666 ) ) * 1.055 - vec3( 0.055 ), value.rgb * 12.92, vec3( lessThanEqual( value.rgb, vec3( 0.0031308 ) ) ) ), value.a );
}`,nD=`#ifdef USE_ENVMAP
	#ifdef ENV_WORLDPOS
		vec3 cameraToFrag;
		if ( isOrthographic ) {
			cameraToFrag = normalize( vec3( - viewMatrix[ 0 ][ 2 ], - viewMatrix[ 1 ][ 2 ], - viewMatrix[ 2 ][ 2 ] ) );
		} else {
			cameraToFrag = normalize( vWorldPosition - cameraPosition );
		}
		vec3 worldNormal = transformNormalByInverseViewMatrix( normal, viewMatrix );
		#ifdef ENVMAP_MODE_REFLECTION
			vec3 reflectVec = reflect( cameraToFrag, worldNormal );
		#else
			vec3 reflectVec = refract( cameraToFrag, worldNormal, refractionRatio );
		#endif
	#else
		vec3 reflectVec = vReflect;
	#endif
	#ifdef ENVMAP_TYPE_CUBE
		vec4 envColor = textureCube( envMap, envMapRotation * reflectVec );
		#ifdef ENVMAP_BLENDING_MULTIPLY
			outgoingLight = mix( outgoingLight, outgoingLight * envColor.xyz, specularStrength * reflectivity );
		#elif defined( ENVMAP_BLENDING_MIX )
			outgoingLight = mix( outgoingLight, envColor.xyz, specularStrength * reflectivity );
		#elif defined( ENVMAP_BLENDING_ADD )
			outgoingLight += envColor.xyz * specularStrength * reflectivity;
		#endif
	#endif
#endif`,iD=`#ifdef USE_ENVMAP
	uniform float envMapIntensity;
	uniform mat3 envMapRotation;
	uniform samplerCube envMap;
	#ifdef ENVMAP_TYPE_PMREM
		float roughnessToMip( const in float roughness ) {
			float r = clamp( roughness, 0.0, 1.0 );
			return ENVMAP_MAX_LOD * r * ( 2.0 - r );
		}
	#endif
#endif`,aD=`#ifdef USE_ENVMAP
	uniform float reflectivity;
	#if defined( USE_BUMPMAP ) || defined( USE_NORMALMAP ) || defined( PHONG ) || defined( LAMBERT )
		#define ENV_WORLDPOS
	#endif
	#ifdef ENV_WORLDPOS
		varying vec3 vWorldPosition;
		uniform float refractionRatio;
	#else
		varying vec3 vReflect;
	#endif
#endif`,rD=`#ifdef USE_ENVMAP
	#if defined( USE_BUMPMAP ) || defined( USE_NORMALMAP ) || defined( PHONG ) || defined( LAMBERT )
		#define ENV_WORLDPOS
	#endif
	#ifdef ENV_WORLDPOS
		
		varying vec3 vWorldPosition;
	#else
		varying vec3 vReflect;
		uniform float refractionRatio;
	#endif
#endif`,sD=`#ifdef USE_ENVMAP
	#ifdef ENV_WORLDPOS
		vWorldPosition = worldPosition.xyz;
	#else
		vec3 cameraToVertex;
		if ( isOrthographic ) {
			cameraToVertex = normalize( vec3( - viewMatrix[ 0 ][ 2 ], - viewMatrix[ 1 ][ 2 ], - viewMatrix[ 2 ][ 2 ] ) );
		} else {
			cameraToVertex = normalize( worldPosition.xyz - cameraPosition );
		}
		vec3 worldNormal = transformNormalByInverseViewMatrix( transformedNormal, viewMatrix );
		#ifdef ENVMAP_MODE_REFLECTION
			vReflect = reflect( cameraToVertex, worldNormal );
		#else
			vReflect = refract( cameraToVertex, worldNormal, refractionRatio );
		#endif
	#endif
#endif`,oD=`#ifdef USE_FOG
	vFogDepth = - mvPosition.z;
#endif`,lD=`#ifdef USE_FOG
	varying float vFogDepth;
#endif`,cD=`#ifdef USE_FOG
	#ifdef FOG_EXP2
		float fogFactor = 1.0 - exp( - fogDensity * fogDensity * vFogDepth * vFogDepth );
	#else
		float fogFactor = smoothstep( fogNear, fogFar, vFogDepth );
	#endif
	gl_FragColor.rgb = mix( gl_FragColor.rgb, fogColor, fogFactor );
#endif`,uD=`#ifdef USE_FOG
	uniform vec3 fogColor;
	varying float vFogDepth;
	#ifdef FOG_EXP2
		uniform float fogDensity;
	#else
		uniform float fogNear;
		uniform float fogFar;
	#endif
#endif`,fD=`#ifdef USE_GRADIENTMAP
	uniform sampler2D gradientMap;
#endif
vec3 getGradientIrradiance( vec3 normal, vec3 lightDirection ) {
	float dotNL = dot( normal, lightDirection );
	vec2 coord = vec2( dotNL * 0.5 + 0.5, 0.0 );
	#ifdef USE_GRADIENTMAP
		return vec3( texture2D( gradientMap, coord ).r );
	#else
		vec2 fw = fwidth( coord ) * 0.5;
		return mix( vec3( 0.7 ), vec3( 1.0 ), smoothstep( 0.7 - fw.x, 0.7 + fw.x, coord.x ) );
	#endif
}`,hD=`#ifdef USE_LIGHTMAP
	uniform sampler2D lightMap;
	uniform float lightMapIntensity;
#endif`,dD=`LambertMaterial material;
material.diffuseColor = diffuseColor.rgb;
material.specularStrength = specularStrength;`,pD=`varying vec3 vViewPosition;
struct LambertMaterial {
	vec3 diffuseColor;
	float specularStrength;
};
void RE_Direct_Lambert( const in IncidentLight directLight, const in vec3 geometryPosition, const in vec3 geometryNormal, const in vec3 geometryViewDir, const in vec3 geometryClearcoatNormal, const in LambertMaterial material, inout ReflectedLight reflectedLight ) {
	float dotNL = saturate( dot( geometryNormal, directLight.direction ) );
	vec3 irradiance = dotNL * directLight.color;
	reflectedLight.directDiffuse += irradiance * BRDF_Lambert( material.diffuseColor );
}
void RE_IndirectDiffuse_Lambert( const in vec3 irradiance, const in vec3 geometryPosition, const in vec3 geometryNormal, const in vec3 geometryViewDir, const in vec3 geometryClearcoatNormal, const in LambertMaterial material, inout ReflectedLight reflectedLight ) {
	reflectedLight.indirectDiffuse += irradiance * BRDF_Lambert( material.diffuseColor );
}
#define RE_Direct				RE_Direct_Lambert
#define RE_IndirectDiffuse		RE_IndirectDiffuse_Lambert`,mD=`uniform bool receiveShadow;
uniform vec3 ambientLightColor;
#if defined( USE_LIGHT_PROBES )
	uniform vec3 lightProbe[ 9 ];
#endif
vec3 shGetIrradianceAt( in vec3 normal, in vec3 shCoefficients[ 9 ] ) {
	float x = normal.x, y = normal.y, z = normal.z;
	vec3 result = shCoefficients[ 0 ] * 0.886227;
	result += shCoefficients[ 1 ] * 2.0 * 0.511664 * y;
	result += shCoefficients[ 2 ] * 2.0 * 0.511664 * z;
	result += shCoefficients[ 3 ] * 2.0 * 0.511664 * x;
	result += shCoefficients[ 4 ] * 2.0 * 0.429043 * x * y;
	result += shCoefficients[ 5 ] * 2.0 * 0.429043 * y * z;
	result += shCoefficients[ 6 ] * ( 0.743125 * z * z - 0.247708 );
	result += shCoefficients[ 7 ] * 2.0 * 0.429043 * x * z;
	result += shCoefficients[ 8 ] * 0.429043 * ( x * x - y * y );
	return result;
}
vec3 getLightProbeIrradiance( const in vec3 lightProbe[ 9 ], const in vec3 normal ) {
	vec3 worldNormal = transformNormalByInverseViewMatrix( normal, viewMatrix );
	vec3 irradiance = shGetIrradianceAt( worldNormal, lightProbe );
	return irradiance;
}
vec3 getAmbientLightIrradiance( const in vec3 ambientLightColor ) {
	vec3 irradiance = ambientLightColor;
	return irradiance;
}
float getDistanceAttenuation( const in float lightDistance, const in float cutoffDistance, const in float decayExponent ) {
	float distanceFalloff = 1.0 / max( pow( lightDistance, decayExponent ), 0.01 );
	if ( cutoffDistance > 0.0 ) {
		distanceFalloff *= pow2( saturate( 1.0 - pow4( lightDistance / cutoffDistance ) ) );
	}
	return distanceFalloff;
}
float getSpotAttenuation( const in float coneCosine, const in float penumbraCosine, const in float angleCosine ) {
	return smoothstep( coneCosine, penumbraCosine, angleCosine );
}
#if NUM_SUN_LIGHTS > 0
	struct SunLight {
		vec3 direction;
		vec3 color;
	};
	uniform SunLight sunLights[ NUM_SUN_LIGHTS ];
	void getSunLightInfo( const in SunLight sunLight, out IncidentLight light ) {
		light.color = sunLight.color;
		light.direction = sunLight.direction;
		light.visible = true;
	}
#endif
#if NUM_DIR_LIGHTS > 0
	struct DirectionalLight {
		vec3 direction;
		vec3 color;
	};
	uniform DirectionalLight directionalLights[ NUM_DIR_LIGHTS ];
	void getDirectionalLightInfo( const in DirectionalLight directionalLight, out IncidentLight light ) {
		light.color = directionalLight.color;
		light.direction = directionalLight.direction;
		light.visible = true;
	}
#endif
#if NUM_POINT_LIGHTS > 0
	struct PointLight {
		vec3 position;
		vec3 color;
		float distance;
		float decay;
	};
	uniform PointLight pointLights[ NUM_POINT_LIGHTS ];
	void getPointLightInfo( const in PointLight pointLight, const in vec3 geometryPosition, out IncidentLight light ) {
		vec3 lVector = pointLight.position - geometryPosition;
		light.direction = normalize( lVector );
		float lightDistance = length( lVector );
		light.color = pointLight.color;
		light.color *= getDistanceAttenuation( lightDistance, pointLight.distance, pointLight.decay );
		light.visible = ( light.color != vec3( 0.0 ) );
	}
#endif
#if NUM_SPOT_LIGHTS > 0
	struct SpotLight {
		vec3 position;
		vec3 direction;
		vec3 color;
		float distance;
		float decay;
		float coneCos;
		float penumbraCos;
	};
	uniform SpotLight spotLights[ NUM_SPOT_LIGHTS ];
	void getSpotLightInfo( const in SpotLight spotLight, const in vec3 geometryPosition, out IncidentLight light ) {
		vec3 lVector = spotLight.position - geometryPosition;
		light.direction = normalize( lVector );
		float angleCos = dot( light.direction, spotLight.direction );
		float spotAttenuation = getSpotAttenuation( spotLight.coneCos, spotLight.penumbraCos, angleCos );
		if ( spotAttenuation > 0.0 ) {
			float lightDistance = length( lVector );
			light.color = spotLight.color * spotAttenuation;
			light.color *= getDistanceAttenuation( lightDistance, spotLight.distance, spotLight.decay );
			light.visible = ( light.color != vec3( 0.0 ) );
		} else {
			light.color = vec3( 0.0 );
			light.visible = false;
		}
	}
#endif
#if NUM_RECT_AREA_LIGHTS > 0
	struct RectAreaLight {
		vec3 color;
		vec3 position;
		vec3 halfWidth;
		vec3 halfHeight;
	};
	uniform sampler2D ltc_1;	uniform sampler2D ltc_2;
	uniform RectAreaLight rectAreaLights[ NUM_RECT_AREA_LIGHTS ];
#endif
#if NUM_HEMI_LIGHTS > 0
	struct HemisphereLight {
		vec3 direction;
		vec3 skyColor;
		vec3 groundColor;
	};
	uniform HemisphereLight hemisphereLights[ NUM_HEMI_LIGHTS ];
	vec3 getHemisphereLightIrradiance( const in HemisphereLight hemiLight, const in vec3 normal ) {
		float dotNL = dot( normal, hemiLight.direction );
		float hemiDiffuseWeight = 0.5 * dotNL + 0.5;
		vec3 irradiance = mix( hemiLight.groundColor, hemiLight.skyColor, hemiDiffuseWeight );
		return irradiance;
	}
#endif
#include <lightprobes_pars_fragment>`,gD=`#ifdef USE_ENVMAP
	vec3 getIBLIrradiance( const in vec3 normal ) {
		#ifdef ENVMAP_TYPE_PMREM
			vec3 worldNormal = transformNormalByInverseViewMatrix( normal, viewMatrix );
			vec4 envMapColor = textureLod( envMap, envMapRotation * worldNormal, ENVMAP_MAX_LOD );
			return PI * envMapColor.rgb * envMapIntensity;
		#else
			return vec3( 0.0 );
		#endif
	}
	vec3 getIBLRadiance( const in vec3 viewDir, const in vec3 normal, const in float roughness ) {
		#ifdef ENVMAP_TYPE_PMREM
			vec3 reflectVec = reflect( - viewDir, normal );
			reflectVec = normalize( mix( reflectVec, normal, pow4( roughness ) ) );
			reflectVec = transformDirectionByInverseViewMatrix( reflectVec, viewMatrix );
			vec4 envMapColor = textureLod( envMap, envMapRotation * reflectVec, roughnessToMip( roughness ) );
			return envMapColor.rgb * envMapIntensity;
		#else
			return vec3( 0.0 );
		#endif
	}
	#ifdef USE_RETROREFLECTION
		vec3 getIBLRetroRadiance( const in vec3 viewDir, const in vec3 normal, const in float roughness ) {
			#ifdef ENVMAP_TYPE_PMREM
				vec3 retroVec = normalize( mix( viewDir, normal, pow4( roughness ) ) );
				retroVec = transformDirectionByInverseViewMatrix( retroVec, viewMatrix );
				vec4 envMapColor = textureLod( envMap, envMapRotation * retroVec, roughnessToMip( roughness ) );
				return envMapColor.rgb * envMapIntensity;
			#else
				return vec3( 0.0 );
			#endif
		}
	#endif
	#ifdef USE_ANISOTROPY
		vec3 getIBLAnisotropyRadiance( const in vec3 viewDir, const in vec3 normal, const in float roughness, const in vec3 bitangent, const in float anisotropy ) {
			#ifdef ENVMAP_TYPE_PMREM
				vec3 bentNormal = cross( bitangent, viewDir );
				bentNormal = normalize( cross( bentNormal, bitangent ) );
				bentNormal = normalize( mix( bentNormal, normal, pow2( pow2( 1.0 - anisotropy * ( 1.0 - roughness ) ) ) ) );
				return getIBLRadiance( viewDir, bentNormal, roughness );
			#else
				return vec3( 0.0 );
			#endif
		}
		#ifdef USE_RETROREFLECTION
			vec3 getIBLAnisotropyRetroRadiance( const in vec3 viewDir, const in vec3 normal, const in float roughness, const in vec3 bitangent, const in float anisotropy ) {
				#ifdef ENVMAP_TYPE_PMREM
					vec3 bentNormal = cross( bitangent, viewDir );
					bentNormal = normalize( cross( bentNormal, bitangent ) );
					bentNormal = normalize( mix( bentNormal, normal, pow2( pow2( 1.0 - anisotropy * ( 1.0 - roughness ) ) ) ) );
					return getIBLRetroRadiance( viewDir, bentNormal, roughness );
				#else
					return vec3( 0.0 );
				#endif
			}
		#endif
	#endif
#endif`,vD=`ToonMaterial material;
material.diffuseColor = diffuseColor.rgb;`,xD=`varying vec3 vViewPosition;
struct ToonMaterial {
	vec3 diffuseColor;
};
void RE_Direct_Toon( const in IncidentLight directLight, const in vec3 geometryPosition, const in vec3 geometryNormal, const in vec3 geometryViewDir, const in vec3 geometryClearcoatNormal, const in ToonMaterial material, inout ReflectedLight reflectedLight ) {
	vec3 irradiance = getGradientIrradiance( geometryNormal, directLight.direction ) * directLight.color;
	reflectedLight.directDiffuse += irradiance * BRDF_Lambert( material.diffuseColor );
}
void RE_IndirectDiffuse_Toon( const in vec3 irradiance, const in vec3 geometryPosition, const in vec3 geometryNormal, const in vec3 geometryViewDir, const in vec3 geometryClearcoatNormal, const in ToonMaterial material, inout ReflectedLight reflectedLight ) {
	reflectedLight.indirectDiffuse += irradiance * BRDF_Lambert( material.diffuseColor );
}
#define RE_Direct				RE_Direct_Toon
#define RE_IndirectDiffuse		RE_IndirectDiffuse_Toon`,yD=`BlinnPhongMaterial material;
material.diffuseColor = diffuseColor.rgb;
material.specularColor = specular;
material.specularShininess = shininess;
material.specularStrength = specularStrength;`,_D=`varying vec3 vViewPosition;
struct BlinnPhongMaterial {
	vec3 diffuseColor;
	vec3 specularColor;
	float specularShininess;
	float specularStrength;
};
void RE_Direct_BlinnPhong( const in IncidentLight directLight, const in vec3 geometryPosition, const in vec3 geometryNormal, const in vec3 geometryViewDir, const in vec3 geometryClearcoatNormal, const in BlinnPhongMaterial material, inout ReflectedLight reflectedLight ) {
	float dotNL = saturate( dot( geometryNormal, directLight.direction ) );
	vec3 irradiance = dotNL * directLight.color;
	reflectedLight.directDiffuse += irradiance * BRDF_Lambert( material.diffuseColor );
	reflectedLight.directSpecular += irradiance * BRDF_BlinnPhong( directLight.direction, geometryViewDir, geometryNormal, material.specularColor, material.specularShininess ) * material.specularStrength;
}
void RE_IndirectDiffuse_BlinnPhong( const in vec3 irradiance, const in vec3 geometryPosition, const in vec3 geometryNormal, const in vec3 geometryViewDir, const in vec3 geometryClearcoatNormal, const in BlinnPhongMaterial material, inout ReflectedLight reflectedLight ) {
	reflectedLight.indirectDiffuse += irradiance * BRDF_Lambert( material.diffuseColor );
}
#define RE_Direct				RE_Direct_BlinnPhong
#define RE_IndirectDiffuse		RE_IndirectDiffuse_BlinnPhong`,bD=`PhysicalMaterial material;
material.diffuseColor = diffuseColor.rgb;
material.diffuseContribution = diffuseColor.rgb * ( 1.0 - metalnessFactor );
material.metalness = metalnessFactor;
vec3 dxy = max( abs( dFdx( nonPerturbedNormal ) ), abs( dFdy( nonPerturbedNormal ) ) );
float geometryRoughness = max( max( dxy.x, dxy.y ), dxy.z );
material.roughness = max( roughnessFactor, 0.045 );
material.roughness += geometryRoughness;
material.roughness = min( material.roughness, 1.0 );
#ifdef USE_DIFFUSE_ROUGHNESS
	float diffuseRoughnessFactor = diffuseRoughness;
	#ifdef USE_DIFFUSE_ROUGHNESSMAP
		diffuseRoughnessFactor *= texture2D( diffuseRoughnessMap, vDiffuseRoughnessMapUv ).r;
	#endif
	material.diffuseRoughness = saturate( diffuseRoughnessFactor );
#endif
#ifdef IOR
	material.ior = ior;
	#ifdef USE_SPECULAR
		float specularIntensityFactor = specularIntensity;
		vec3 specularColorFactor = specularColor;
		#ifdef USE_SPECULAR_COLORMAP
			specularColorFactor *= texture2D( specularColorMap, vSpecularColorMapUv ).rgb;
		#endif
		#ifdef USE_SPECULAR_INTENSITYMAP
			specularIntensityFactor *= texture2D( specularIntensityMap, vSpecularIntensityMapUv ).a;
		#endif
		material.specularF90 = mix( specularIntensityFactor, 1.0, metalnessFactor );
	#else
		float specularIntensityFactor = 1.0;
		vec3 specularColorFactor = vec3( 1.0 );
		material.specularF90 = 1.0;
	#endif
	material.specularColor = min( pow2( ( material.ior - 1.0 ) / ( material.ior + 1.0 ) ) * specularColorFactor, vec3( 1.0 ) ) * specularIntensityFactor;
	material.specularColorBlended = mix( material.specularColor, diffuseColor.rgb, metalnessFactor );
#else
	material.specularColor = vec3( 0.04 );
	material.specularColorBlended = mix( material.specularColor, diffuseColor.rgb, metalnessFactor );
	material.specularF90 = 1.0;
#endif
#ifdef USE_CLEARCOAT
	material.clearcoat = clearcoat;
	material.clearcoatRoughness = clearcoatRoughness;
	material.clearcoatF0 = vec3( 0.04 );
	material.clearcoatF90 = 1.0;
	#ifdef USE_CLEARCOATMAP
		material.clearcoat *= texture2D( clearcoatMap, vClearcoatMapUv ).x;
	#endif
	#ifdef USE_CLEARCOAT_ROUGHNESSMAP
		material.clearcoatRoughness *= texture2D( clearcoatRoughnessMap, vClearcoatRoughnessMapUv ).y;
	#endif
	material.clearcoat = saturate( material.clearcoat );	material.clearcoatRoughness = max( material.clearcoatRoughness, 0.045 );
	material.clearcoatRoughness += geometryRoughness;
	material.clearcoatRoughness = min( material.clearcoatRoughness, 1.0 );
#endif
#ifdef USE_DISPERSION
	material.dispersion = dispersion;
#endif
#ifdef USE_RETROREFLECTION
	material.retroreflectivity = retroreflectivity;
#endif
#ifdef USE_IRIDESCENCE
	material.iridescence = iridescence;
	material.iridescenceIOR = iridescenceIOR;
	#ifdef USE_IRIDESCENCEMAP
		material.iridescence *= texture2D( iridescenceMap, vIridescenceMapUv ).r;
	#endif
	#ifdef USE_IRIDESCENCE_THICKNESSMAP
		material.iridescenceThickness = (iridescenceThicknessMaximum - iridescenceThicknessMinimum) * texture2D( iridescenceThicknessMap, vIridescenceThicknessMapUv ).g + iridescenceThicknessMinimum;
	#else
		material.iridescenceThickness = iridescenceThicknessMaximum;
	#endif
#endif
#ifdef USE_SHEEN
	material.sheenColor = sheenColor;
	#ifdef USE_SHEEN_COLORMAP
		material.sheenColor *= texture2D( sheenColorMap, vSheenColorMapUv ).rgb;
	#endif
	material.sheenRoughness = clamp( sheenRoughness, 0.0001, 1.0 );
	#ifdef USE_SHEEN_ROUGHNESSMAP
		material.sheenRoughness *= texture2D( sheenRoughnessMap, vSheenRoughnessMapUv ).a;
	#endif
#endif
#ifdef USE_ANISOTROPY
	#ifdef USE_ANISOTROPYMAP
		mat2 anisotropyMat = mat2( anisotropyVector.x, anisotropyVector.y, - anisotropyVector.y, anisotropyVector.x );
		vec3 anisotropyPolar = texture2D( anisotropyMap, vAnisotropyMapUv ).rgb;
		vec2 anisotropyV = anisotropyMat * normalize( 2.0 * anisotropyPolar.rg - vec2( 1.0 ) ) * anisotropyPolar.b;
	#else
		vec2 anisotropyV = anisotropyVector;
	#endif
	material.anisotropy = length( anisotropyV );
	if( material.anisotropy == 0.0 ) {
		anisotropyV = vec2( 1.0, 0.0 );
	} else {
		anisotropyV /= material.anisotropy;
		material.anisotropy = saturate( material.anisotropy );
	}
	material.alphaT = mix( pow2( material.roughness ), 1.0, pow2( material.anisotropy ) );
	material.anisotropyT = tbn[ 0 ] * anisotropyV.x + tbn[ 1 ] * anisotropyV.y;
	material.anisotropyB = tbn[ 1 ] * anisotropyV.x - tbn[ 0 ] * anisotropyV.y;
#endif`,SD=`uniform sampler2D dfgLUT;
struct PhysicalMaterial {
	vec3 diffuseColor;
	vec3 diffuseContribution;
	vec3 specularColor;
	vec3 specularColorBlended;
	float roughness;
	float metalness;
	float specularF90;
	float dispersion;
	vec2 dfg;
	vec3 multiScatteringCompensation;
	#ifdef USE_DIFFUSE_ROUGHNESS
		float diffuseRoughness;
	#endif
	#ifdef USE_RETROREFLECTION
		float retroreflectivity;
	#endif
	#ifdef USE_CLEARCOAT
		float clearcoat;
		float clearcoatRoughness;
		vec3 clearcoatF0;
		float clearcoatF90;
	#endif
	#ifdef USE_IRIDESCENCE
		float iridescence;
		float iridescenceIOR;
		float iridescenceThickness;
		vec3 iridescenceFresnel;
		vec3 iridescenceF0Dielectric;
		vec3 iridescenceF0Metallic;
	#endif
	#ifdef USE_SHEEN
		vec3 sheenColor;
		float sheenRoughness;
	#endif
	#ifdef IOR
		float ior;
	#endif
	#ifdef USE_TRANSMISSION
		float transmission;
		float transmissionAlpha;
		float thickness;
		float attenuationDistance;
		vec3 attenuationColor;
	#endif
	#ifdef USE_ANISOTROPY
		float anisotropy;
		float alphaT;
		vec3 anisotropyT;
		vec3 anisotropyB;
	#endif
};
vec3 clearcoatSpecularDirect = vec3( 0.0 );
vec3 clearcoatSpecularIndirect = vec3( 0.0 );
vec3 sheenSpecularDirect = vec3( 0.0 );
vec3 sheenSpecularIndirect = vec3(0.0 );
vec3 Schlick_to_F0( const in vec3 f, const in float f90, const in float dotVH ) {
    float x = clamp( 1.0 - dotVH, 0.0, 1.0 );
    float x2 = x * x;
    float x5 = clamp( x * x2 * x2, 0.0, 0.9999 );
    return ( f - vec3( f90 ) * x5 ) / ( 1.0 - x5 );
}
#ifdef USE_DIFFUSE_ROUGHNESS
	const float EON_EPSILON = 1e-7;
	float FON_DirectionalAlbedo( const in float mu, const in float roughness, const in float A ) {
		float muComp = 1.0 - mu;
		float gOverPi = muComp * ( 0.0571085289 + muComp * ( 0.491881867 + muComp * ( - 0.332181442 + muComp * 0.0714429953 ) ) );
		return A * ( 1.0 + roughness * gOverPi );
	}
	vec3 BRDF_EON( const in vec3 lightDir, const in vec3 viewDir, const in vec3 normal, const in vec3 diffuseColor, const in float roughness ) {
		vec3 rho = saturate( diffuseColor );
		if ( roughness <= EON_EPSILON ) return BRDF_Lambert( rho );
		float dotNL = saturate( dot( normal, lightDir ) );
		float dotNV = saturate( dot( normal, viewDir ) );
		float s = dot( lightDir, viewDir ) - dotNL * dotNV;
		float sOverT = ( s > 0.0 ) ? s / max( max( dotNL, dotNV ), EON_EPSILON ) : s;
		float A = 1.0 / ( 1.0 + ( 0.5 - 2.0 / ( 3.0 * PI ) ) * roughness );
		vec3 singleScatter = rho * RECIPROCAL_PI * A * ( 1.0 + roughness * sOverT );
		float averageAlbedo = A * ( 1.0 + ( 2.0 / 3.0 - 28.0 / ( 15.0 * PI ) ) * roughness );
		float albedoV = FON_DirectionalAlbedo( dotNV, roughness, A );
		float albedoL = FON_DirectionalAlbedo( dotNL, roughness, A );
		vec3 rhoMultiScatter = rho * rho * averageAlbedo / max( vec3( EON_EPSILON ), vec3( 1.0 ) - rho * ( 1.0 - averageAlbedo ) );
		vec3 multiScatter = rhoMultiScatter * RECIPROCAL_PI
			* max( EON_EPSILON, 1.0 - albedoV )
			* max( EON_EPSILON, 1.0 - albedoL )
			/ max( EON_EPSILON, 1.0 - averageAlbedo );
		return singleScatter + multiScatter;
	}
	vec3 EON_DirectionalAlbedo( const in vec3 diffuseColor, const in float roughness, const in float dotNV ) {
		vec3 rho = saturate( diffuseColor );
		if ( roughness <= EON_EPSILON ) return rho;
		float A = 1.0 / ( 1.0 + ( 0.5 - 2.0 / ( 3.0 * PI ) ) * roughness );
		float directionalAlbedo = FON_DirectionalAlbedo( dotNV, roughness, A );
		float averageAlbedo = A * ( 1.0 + ( 2.0 / 3.0 - 28.0 / ( 15.0 * PI ) ) * roughness );
		vec3 rhoMultiScatter = rho * rho * averageAlbedo / max( vec3( EON_EPSILON ), vec3( 1.0 ) - rho * ( 1.0 - averageAlbedo ) );
		return rho * directionalAlbedo + rhoMultiScatter * ( 1.0 - directionalAlbedo );
	}
#endif
float V_GGX_SmithCorrelated( const in float alpha, const in float dotNL, const in float dotNV ) {
	float a2 = pow2( alpha );
	float gv = dotNL * sqrt( a2 + ( 1.0 - a2 ) * pow2( dotNV ) );
	float gl = dotNV * sqrt( a2 + ( 1.0 - a2 ) * pow2( dotNL ) );
	return 0.5 / max( gv + gl, EPSILON );
}
float D_GGX( const in float alpha, const in float dotNH ) {
	float a2 = pow2( alpha );
	float denom = pow2( dotNH ) * ( a2 - 1.0 ) + 1.0;
	return RECIPROCAL_PI * a2 / pow2( denom );
}
#ifdef USE_ANISOTROPY
	float V_GGX_SmithCorrelated_Anisotropic( const in float alphaT, const in float alphaB, const in float dotTV, const in float dotBV, const in float dotTL, const in float dotBL, const in float dotNV, const in float dotNL ) {
		float gv = dotNL * length( vec3( alphaT * dotTV, alphaB * dotBV, dotNV ) );
		float gl = dotNV * length( vec3( alphaT * dotTL, alphaB * dotBL, dotNL ) );
		return 0.5 / max( gv + gl, EPSILON );
	}
	float D_GGX_Anisotropic( const in float alphaT, const in float alphaB, const in float dotNH, const in float dotTH, const in float dotBH ) {
		float a2 = alphaT * alphaB;
		highp vec3 v = vec3( alphaB * dotTH, alphaT * dotBH, a2 * dotNH );
		highp float v2 = dot( v, v );
		float w2 = a2 / v2;
		return RECIPROCAL_PI * a2 * pow2 ( w2 );
	}
#endif
#ifdef USE_CLEARCOAT
	vec3 BRDF_GGX_Clearcoat( const in vec3 lightDir, const in vec3 viewDir, const in vec3 normal, const in PhysicalMaterial material) {
		vec3 f0 = material.clearcoatF0;
		float f90 = material.clearcoatF90;
		float roughness = max( material.clearcoatRoughness, 0.045 );
		float alpha = pow2( roughness );
		vec3 halfDir = normalize( lightDir + viewDir );
		float dotNL = saturate( dot( normal, lightDir ) );
		float dotNV = saturate( dot( normal, viewDir ) );
		float dotNH = saturate( dot( normal, halfDir ) );
		float dotVH = saturate( dot( viewDir, halfDir ) );
		vec3 F = F_Schlick( f0, f90, dotVH );
		float V = V_GGX_SmithCorrelated( alpha, dotNL, dotNV );
		float D = D_GGX( alpha, dotNH );
		return F * ( V * D );
	}
#endif
vec3 BRDF_GGX( const in vec3 lightDir, const in vec3 viewDir, const in vec3 normal, const in PhysicalMaterial material ) {
	vec3 f0 = material.specularColorBlended;
	float f90 = material.specularF90;
	float roughness = max( material.roughness, 0.045 );
	float alpha = pow2( roughness );
	vec3 halfDir = normalize( lightDir + viewDir );
	float dotNL = saturate( dot( normal, lightDir ) );
	float dotNV = saturate( dot( normal, viewDir ) );
	float dotNH = saturate( dot( normal, halfDir ) );
	float dotVH = saturate( dot( viewDir, halfDir ) );
	vec3 F = F_Schlick( f0, f90, dotVH );
	#ifdef USE_IRIDESCENCE
		F = mix( F, material.iridescenceFresnel, material.iridescence );
	#endif
	#ifdef USE_ANISOTROPY
		float dotTL = dot( material.anisotropyT, lightDir );
		float dotTV = dot( material.anisotropyT, viewDir );
		float dotTH = dot( material.anisotropyT, halfDir );
		float dotBL = dot( material.anisotropyB, lightDir );
		float dotBV = dot( material.anisotropyB, viewDir );
		float dotBH = dot( material.anisotropyB, halfDir );
		float alphaT = max( material.alphaT, alpha );
		float V = V_GGX_SmithCorrelated_Anisotropic( alphaT, alpha, dotTV, dotBV, dotTL, dotBL, dotNV, dotNL );
		float D = D_GGX_Anisotropic( alphaT, alpha, dotNH, dotTH, dotBH );
	#else
		float V = V_GGX_SmithCorrelated( alpha, dotNL, dotNV );
		float D = D_GGX( alpha, dotNH );
	#endif
	return F * ( V * D );
}
vec2 LTC_Uv( const in vec3 N, const in vec3 V, const in float roughness ) {
	const float LUT_SIZE = 64.0;
	const float LUT_SCALE = ( LUT_SIZE - 1.0 ) / LUT_SIZE;
	const float LUT_BIAS = 0.5 / LUT_SIZE;
	float dotNV = saturate( dot( N, V ) );
	vec2 uv = vec2( roughness, sqrt( 1.0 - dotNV ) );
	uv = uv * LUT_SCALE + LUT_BIAS;
	return uv;
}
float LTC_ClippedSphereFormFactor( const in vec3 f ) {
	float l = length( f );
	return max( ( l * l + f.z ) / ( l + 1.0 ), 0.0 );
}
vec3 LTC_EdgeVectorFormFactor( const in vec3 v1, const in vec3 v2 ) {
	float x = dot( v1, v2 );
	float y = abs( x );
	float a = 0.8543985 + ( 0.4965155 + 0.0145206 * y ) * y;
	float b = 3.4175940 + ( 4.1616724 + y ) * y;
	float v = a / b;
	float theta_sintheta = ( x > 0.0 ) ? v : 0.5 * inversesqrt( max( 1.0 - x * x, 1e-7 ) ) - v;
	return cross( v1, v2 ) * theta_sintheta;
}
vec3 LTC_Evaluate( const in vec3 N, const in vec3 V, const in vec3 P, const in mat3 mInv, const in vec3 rectCoords[ 4 ] ) {
	vec3 v1 = rectCoords[ 1 ] - rectCoords[ 0 ];
	vec3 v2 = rectCoords[ 3 ] - rectCoords[ 0 ];
	vec3 lightNormal = cross( v1, v2 );
	if( dot( lightNormal, P - rectCoords[ 0 ] ) < 0.0 ) return vec3( 0.0 );
	vec3 T1, T2;
	T1 = normalize( V - N * dot( V, N ) );
	T2 = - cross( N, T1 );
	mat3 mat = mInv * transpose( mat3( T1, T2, N ) );
	vec3 coords[ 4 ];
	coords[ 0 ] = mat * ( rectCoords[ 0 ] - P );
	coords[ 1 ] = mat * ( rectCoords[ 1 ] - P );
	coords[ 2 ] = mat * ( rectCoords[ 2 ] - P );
	coords[ 3 ] = mat * ( rectCoords[ 3 ] - P );
	coords[ 0 ] = normalize( coords[ 0 ] );
	coords[ 1 ] = normalize( coords[ 1 ] );
	coords[ 2 ] = normalize( coords[ 2 ] );
	coords[ 3 ] = normalize( coords[ 3 ] );
	vec3 vectorFormFactor = vec3( 0.0 );
	vectorFormFactor += LTC_EdgeVectorFormFactor( coords[ 0 ], coords[ 1 ] );
	vectorFormFactor += LTC_EdgeVectorFormFactor( coords[ 1 ], coords[ 2 ] );
	vectorFormFactor += LTC_EdgeVectorFormFactor( coords[ 2 ], coords[ 3 ] );
	vectorFormFactor += LTC_EdgeVectorFormFactor( coords[ 3 ], coords[ 0 ] );
	float result = LTC_ClippedSphereFormFactor( vectorFormFactor );
	return vec3( result );
}
#if defined( USE_SHEEN )
float D_Charlie( float roughness, float dotNH ) {
	float alpha = pow2( roughness );
	float invAlpha = 1.0 / alpha;
	float cos2h = dotNH * dotNH;
	float sin2h = max( 1.0 - cos2h, 0.0078125 );
	return ( 2.0 + invAlpha ) * pow( sin2h, invAlpha * 0.5 ) / ( 2.0 * PI );
}
float V_Neubelt( float dotNV, float dotNL ) {
	return saturate( 1.0 / ( 4.0 * ( dotNL + dotNV - dotNL * dotNV ) ) );
}
vec3 BRDF_Sheen( const in vec3 lightDir, const in vec3 viewDir, const in vec3 normal, vec3 sheenColor, const in float sheenRoughness ) {
	vec3 halfDir = normalize( lightDir + viewDir );
	float dotNL = saturate( dot( normal, lightDir ) );
	float dotNV = saturate( dot( normal, viewDir ) );
	float dotNH = saturate( dot( normal, halfDir ) );
	float D = D_Charlie( sheenRoughness, dotNH );
	float V = V_Neubelt( dotNV, dotNL );
	return sheenColor * ( D * V );
}
#endif
float IBLSheenBRDF( const in vec3 normal, const in vec3 viewDir, const in float roughness ) {
	float dotNV = saturate( dot( normal, viewDir ) );
	float r2 = roughness * roughness;
	float rInv = 1.0 / ( roughness + 0.1 );
	float a = -1.9362 + 1.0678 * roughness + 0.4573 * r2 - 0.8469 * rInv;
	float b = -0.6014 + 0.5538 * roughness - 0.4670 * r2 - 0.1255 * rInv;
	float DG = exp( a * dotNV + b );
	return saturate( DG );
}
vec3 EnvironmentBRDF( const in vec3 normal, const in vec3 viewDir, const in vec3 specularColor, const in float specularF90, const in float roughness ) {
	float dotNV = saturate( dot( normal, viewDir ) );
	vec2 fab = texture2D( dfgLUT, vec2( roughness, dotNV ) ).rg;
	return specularColor * fab.x + specularF90 * fab.y;
}
#ifdef USE_IRIDESCENCE
void computeMultiscatteringIridescence( const in vec2 fab, const in vec3 specularColor, const in float specularF90, const in float iridescence, const in vec3 iridescenceF0, inout vec3 singleScatter, inout vec3 multiScatter ) {
#else
void computeMultiscattering( const in vec2 fab, const in vec3 specularColor, const in float specularF90, inout vec3 singleScatter, inout vec3 multiScatter ) {
#endif
	#ifdef USE_IRIDESCENCE
		vec3 Fr = mix( specularColor, iridescenceF0, iridescence );
	#else
		vec3 Fr = specularColor;
	#endif
	vec3 FssEss = Fr * fab.x + specularF90 * fab.y;
	float Ess = fab.x + fab.y;
	float Ems = 1.0 - Ess;
	vec3 Favg = Fr + ( 1.0 - Fr ) * 0.047619;	vec3 Fms = FssEss * Favg / ( 1.0 - Ems * Favg );
	singleScatter += FssEss;
	multiScatter += Fms * Ems;
}
#if NUM_RECT_AREA_LIGHTS > 0
	void RE_Direct_RectArea_Physical( const in RectAreaLight rectAreaLight, const in vec3 geometryPosition, const in vec3 geometryNormal, const in vec3 geometryViewDir, const in vec3 geometryClearcoatNormal, const in PhysicalMaterial material, inout ReflectedLight reflectedLight ) {
		vec3 normal = geometryNormal;
		vec3 viewDir = geometryViewDir;
		vec3 position = geometryPosition;
		vec3 lightPos = rectAreaLight.position;
		vec3 halfWidth = rectAreaLight.halfWidth;
		vec3 halfHeight = rectAreaLight.halfHeight;
		vec3 lightColor = rectAreaLight.color;
		float roughness = material.roughness;
		vec3 rectCoords[ 4 ];
		rectCoords[ 0 ] = lightPos + halfWidth - halfHeight;		rectCoords[ 1 ] = lightPos - halfWidth - halfHeight;
		rectCoords[ 2 ] = lightPos - halfWidth + halfHeight;
		rectCoords[ 3 ] = lightPos + halfWidth + halfHeight;
		vec2 uv = LTC_Uv( normal, viewDir, roughness );
		vec4 t1 = texture2D( ltc_1, uv );
		vec4 t2 = texture2D( ltc_2, uv );
		mat3 mInv = mat3(
			vec3( t1.x, 0, t1.y ),
			vec3(    0, 1,    0 ),
			vec3( t1.z, 0, t1.w )
		);
		vec3 fresnel = ( material.specularColorBlended * t2.x + ( material.specularF90 - material.specularColorBlended ) * t2.y );
		reflectedLight.directSpecular += lightColor * fresnel * LTC_Evaluate( normal, viewDir, position, mInv, rectCoords );
		reflectedLight.directDiffuse += lightColor * material.diffuseContribution * LTC_Evaluate( normal, viewDir, position, mat3( 1.0 ), rectCoords );
		#ifdef USE_CLEARCOAT
			vec3 Ncc = geometryClearcoatNormal;
			vec2 uvClearcoat = LTC_Uv( Ncc, viewDir, material.clearcoatRoughness );
			vec4 t1Clearcoat = texture2D( ltc_1, uvClearcoat );
			vec4 t2Clearcoat = texture2D( ltc_2, uvClearcoat );
			mat3 mInvClearcoat = mat3(
				vec3( t1Clearcoat.x, 0, t1Clearcoat.y ),
				vec3(             0, 1,             0 ),
				vec3( t1Clearcoat.z, 0, t1Clearcoat.w )
			);
			vec3 fresnelClearcoat = material.clearcoatF0 * t2Clearcoat.x + ( material.clearcoatF90 - material.clearcoatF0 ) * t2Clearcoat.y;
			clearcoatSpecularDirect += lightColor * fresnelClearcoat * LTC_Evaluate( Ncc, viewDir, position, mInvClearcoat, rectCoords );
		#endif
	}
#endif
void RE_Direct_Physical( const in IncidentLight directLight, const in vec3 geometryPosition, const in vec3 geometryNormal, const in vec3 geometryViewDir, const in vec3 geometryClearcoatNormal, const in PhysicalMaterial material, inout ReflectedLight reflectedLight ) {
	float dotNL = saturate( dot( geometryNormal, directLight.direction ) );
	vec3 irradiance = dotNL * directLight.color;
	#ifdef USE_CLEARCOAT
		float dotNLcc = saturate( dot( geometryClearcoatNormal, directLight.direction ) );
		vec3 ccIrradiance = dotNLcc * directLight.color;
		clearcoatSpecularDirect += ccIrradiance * BRDF_GGX_Clearcoat( directLight.direction, geometryViewDir, geometryClearcoatNormal, material );
	#endif
	#ifdef USE_SHEEN
 
 		sheenSpecularDirect += irradiance * BRDF_Sheen( directLight.direction, geometryViewDir, geometryNormal, material.sheenColor, material.sheenRoughness );
 
 		float sheenAlbedoV = IBLSheenBRDF( geometryNormal, geometryViewDir, material.sheenRoughness );
 		float sheenAlbedoL = IBLSheenBRDF( geometryNormal, directLight.direction, material.sheenRoughness );
 
 		float sheenEnergyComp = 1.0 - max3( material.sheenColor ) * max( sheenAlbedoV, sheenAlbedoL );
 
 		irradiance *= sheenEnergyComp;
 
 	#endif
	vec3 specularBRDF = BRDF_GGX( directLight.direction, geometryViewDir, geometryNormal, material );
	#ifdef USE_RETROREFLECTION
		vec3 retroViewDir = reflect( - geometryViewDir, geometryNormal );
		vec3 retroSpecularBRDF = BRDF_GGX( directLight.direction, retroViewDir, geometryNormal, material );
		specularBRDF = mix( specularBRDF, retroSpecularBRDF, saturate( material.retroreflectivity ) );
	#endif
	reflectedLight.directSpecular += irradiance * specularBRDF * material.multiScatteringCompensation;
	vec3 halfDir = normalize( directLight.direction + geometryViewDir );
	float dotVH = saturate( dot( geometryViewDir, halfDir ) );
	vec3 F = F_Schlick( material.specularColor, material.specularF90, dotVH );
	#ifdef USE_RETROREFLECTION
		vec3 retroHalfDir = normalize( directLight.direction + retroViewDir );
		float dotRetroVH = saturate( dot( retroViewDir, retroHalfDir ) );
		vec3 retroF = F_Schlick( material.specularColor, material.specularF90, dotRetroVH );
		F = mix( F, retroF, saturate( material.retroreflectivity ) );
	#endif
	#ifdef USE_DIFFUSE_ROUGHNESS
		vec3 diffuseBRDF = BRDF_EON( directLight.direction, geometryViewDir, geometryNormal, material.diffuseColor, material.diffuseRoughness ) * ( 1.0 - material.metalness );
	#else
		vec3 diffuseBRDF = BRDF_Lambert( material.diffuseContribution );
	#endif
	reflectedLight.directDiffuse += irradiance * diffuseBRDF * ( 1.0 - F );
}
void RE_IndirectDiffuse_Physical( const in vec3 irradiance, const in vec3 geometryPosition, const in vec3 geometryNormal, const in vec3 geometryViewDir, const in vec3 geometryClearcoatNormal, const in PhysicalMaterial material, inout ReflectedLight reflectedLight ) {
	vec3 singleScattering = vec3( 0.0 );
	vec3 multiScattering = vec3( 0.0 );
	#ifdef USE_IRIDESCENCE
		computeMultiscatteringIridescence( material.dfg, material.specularColor, material.specularF90, material.iridescence, material.iridescenceF0Dielectric, singleScattering, multiScattering );
	#else
		computeMultiscattering( material.dfg, material.specularColor, material.specularF90, singleScattering, multiScattering );
	#endif
	#ifdef USE_DIFFUSE_ROUGHNESS
		float dotNV = saturate( dot( geometryNormal, geometryViewDir ) );
		vec3 diffuseAlbedo = EON_DirectionalAlbedo( material.diffuseColor, material.diffuseRoughness, dotNV ) * ( 1.0 - material.metalness );
		vec3 diffuse = irradiance * RECIPROCAL_PI * diffuseAlbedo * ( 1.0 - singleScattering - multiScattering );
	#else
		vec3 diffuse = irradiance * BRDF_Lambert( material.diffuseContribution ) * ( 1.0 - singleScattering - multiScattering );
	#endif
	#ifdef USE_SHEEN
		float sheenAlbedo = IBLSheenBRDF( geometryNormal, geometryViewDir, material.sheenRoughness );
		sheenSpecularIndirect += irradiance * material.sheenColor * sheenAlbedo * RECIPROCAL_PI;
		float sheenEnergyComp = 1.0 - max3( material.sheenColor ) * sheenAlbedo;
		diffuse *= sheenEnergyComp;
	#endif
	reflectedLight.indirectDiffuse += diffuse;
}
void RE_IndirectSpecular_Physical( const in vec3 radiance, const in vec3 irradiance, const in vec3 clearcoatRadiance, const in vec3 geometryPosition, const in vec3 geometryNormal, const in vec3 geometryViewDir, const in vec3 geometryClearcoatNormal, const in PhysicalMaterial material, inout ReflectedLight reflectedLight) {
	#ifdef USE_CLEARCOAT
		clearcoatSpecularIndirect += clearcoatRadiance * EnvironmentBRDF( geometryClearcoatNormal, geometryViewDir, material.clearcoatF0, material.clearcoatF90, material.clearcoatRoughness );
	#endif
	#ifdef USE_SHEEN
		sheenSpecularIndirect += irradiance * material.sheenColor * IBLSheenBRDF( geometryNormal, geometryViewDir, material.sheenRoughness ) * RECIPROCAL_PI;
 	#endif
	vec3 singleScatteringDielectric = vec3( 0.0 );
	vec3 multiScatteringDielectric = vec3( 0.0 );
	vec3 singleScatteringMetallic = vec3( 0.0 );
	vec3 multiScatteringMetallic = vec3( 0.0 );
	#ifdef USE_IRIDESCENCE
		computeMultiscatteringIridescence( material.dfg, material.specularColor, material.specularF90, material.iridescence, material.iridescenceF0Dielectric, singleScatteringDielectric, multiScatteringDielectric );
		computeMultiscatteringIridescence( material.dfg, material.diffuseColor, material.specularF90, material.iridescence, material.iridescenceF0Metallic, singleScatteringMetallic, multiScatteringMetallic );
	#else
		computeMultiscattering( material.dfg, material.specularColor, material.specularF90, singleScatteringDielectric, multiScatteringDielectric );
		computeMultiscattering( material.dfg, material.diffuseColor, material.specularF90, singleScatteringMetallic, multiScatteringMetallic );
	#endif
	vec3 singleScattering = mix( singleScatteringDielectric, singleScatteringMetallic, material.metalness );
	vec3 multiScattering = mix( multiScatteringDielectric, multiScatteringMetallic, material.metalness );
	vec3 totalScatteringDielectric = singleScatteringDielectric + multiScatteringDielectric;
	#ifdef USE_DIFFUSE_ROUGHNESS
		float dotNV = saturate( dot( geometryNormal, geometryViewDir ) );
		vec3 diffuse = EON_DirectionalAlbedo( material.diffuseColor, material.diffuseRoughness, dotNV ) * ( 1.0 - material.metalness ) * ( 1.0 - totalScatteringDielectric );
	#else
		vec3 diffuse = material.diffuseContribution * ( 1.0 - totalScatteringDielectric );
	#endif
	vec3 cosineWeightedIrradiance = irradiance * RECIPROCAL_PI;
	vec3 indirectSpecular = radiance * singleScattering;
	indirectSpecular += multiScattering * cosineWeightedIrradiance;
	vec3 indirectDiffuse = diffuse * cosineWeightedIrradiance;
	#ifdef USE_SHEEN
		float sheenAlbedo = IBLSheenBRDF( geometryNormal, geometryViewDir, material.sheenRoughness );
		float sheenEnergyComp = 1.0 - max3( material.sheenColor ) * sheenAlbedo;
		indirectSpecular *= sheenEnergyComp;
		indirectDiffuse *= sheenEnergyComp;
	#endif
	reflectedLight.indirectSpecular += indirectSpecular;
	reflectedLight.indirectDiffuse += indirectDiffuse;
}
#define RE_Direct				RE_Direct_Physical
#define RE_Direct_RectArea		RE_Direct_RectArea_Physical
#define RE_IndirectDiffuse		RE_IndirectDiffuse_Physical
#define RE_IndirectSpecular		RE_IndirectSpecular_Physical
float computeSpecularOcclusion( const in float dotNV, const in float ambientOcclusion, const in float roughness ) {
	return saturate( pow( dotNV + ambientOcclusion, exp2( - 16.0 * roughness - 1.0 ) ) - 1.0 + ambientOcclusion );
}`,MD=`
vec3 geometryPosition = - vViewPosition;
vec3 geometryNormal = normal;
vec3 geometryViewDir = ( isOrthographic ) ? vec3( 0, 0, 1 ) : normalize( vViewPosition );
vec3 geometryClearcoatNormal = vec3( 0.0 );
#ifdef USE_CLEARCOAT
	geometryClearcoatNormal = clearcoatNormal;
#endif
#ifdef USE_IRIDESCENCE
	float dotNVi = saturate( dot( normal, geometryViewDir ) );
	if ( material.iridescenceThickness == 0.0 ) {
		material.iridescence = 0.0;
	} else {
		material.iridescence = saturate( material.iridescence );
	}
	if ( material.iridescence > 0.0 ) {
		vec3 iridescenceFresnelDielectric = evalIridescence( 1.0, material.iridescenceIOR, dotNVi, material.iridescenceThickness, material.specularColor );
		vec3 iridescenceFresnelMetallic = evalIridescence( 1.0, material.iridescenceIOR, dotNVi, material.iridescenceThickness, material.diffuseColor );
		material.iridescenceFresnel = mix( iridescenceFresnelDielectric, iridescenceFresnelMetallic, material.metalness );
		material.iridescenceF0Dielectric = Schlick_to_F0( iridescenceFresnelDielectric, 1.0, dotNVi );
		material.iridescenceF0Metallic = Schlick_to_F0( iridescenceFresnelMetallic, 1.0, dotNVi );
	}
#endif
#ifdef STANDARD
	float dotNVms = saturate( dot( geometryNormal, geometryViewDir ) );
	material.dfg = texture2D( dfgLUT, vec2( material.roughness, dotNVms ) ).rg;
	#if ( NUM_SUN_LIGHTS > 0 || NUM_DIR_LIGHTS > 0 || NUM_POINT_LIGHTS > 0 || NUM_SPOT_LIGHTS > 0 )
		float EssMs = material.dfg.x + material.dfg.y;
		material.multiScatteringCompensation = 1.0 + material.specularColorBlended * ( 1.0 / EssMs - 1.0 );
	#endif
#endif
IncidentLight directLight;
#if ( NUM_POINT_LIGHTS > 0 ) && defined( RE_Direct )
	PointLight pointLight;
	#if defined( USE_SHADOWMAP ) && NUM_POINT_LIGHT_SHADOWS > 0
	PointLightShadow pointLightShadow;
	#endif
	#pragma unroll_loop_start
	for ( int i = 0; i < NUM_POINT_LIGHTS; i ++ ) {
		pointLight = pointLights[ i ];
		getPointLightInfo( pointLight, geometryPosition, directLight );
		#if defined( USE_SHADOWMAP ) && ( UNROLLED_LOOP_INDEX < NUM_POINT_LIGHT_SHADOWS ) && ( defined( SHADOWMAP_TYPE_PCF ) || defined( SHADOWMAP_TYPE_BASIC ) )
		pointLightShadow = pointLightShadows[ i ];
		directLight.color *= ( directLight.visible && receiveShadow ) ? getPointShadow( pointShadowMap[ i ], pointLightShadow.shadowMapSize, pointLightShadow.shadowIntensity, pointLightShadow.shadowBias, pointLightShadow.shadowRadius, vPointShadowCoord[ i ], pointLightShadow.shadowCameraNear, pointLightShadow.shadowCameraFar ) : 1.0;
		#endif
		RE_Direct( directLight, geometryPosition, geometryNormal, geometryViewDir, geometryClearcoatNormal, material, reflectedLight );
	}
	#pragma unroll_loop_end
#endif
#if ( NUM_SPOT_LIGHTS > 0 ) && defined( RE_Direct )
	SpotLight spotLight;
	vec4 spotColor;
	vec3 spotLightCoord;
	bool inSpotLightMap;
	#if defined( USE_SHADOWMAP ) && NUM_SPOT_LIGHT_SHADOWS > 0
	SpotLightShadow spotLightShadow;
	#endif
	#pragma unroll_loop_start
	for ( int i = 0; i < NUM_SPOT_LIGHTS; i ++ ) {
		spotLight = spotLights[ i ];
		getSpotLightInfo( spotLight, geometryPosition, directLight );
		#if ( UNROLLED_LOOP_INDEX < NUM_SPOT_LIGHT_SHADOWS_WITH_MAPS )
		#define SPOT_LIGHT_MAP_INDEX UNROLLED_LOOP_INDEX
		#elif ( UNROLLED_LOOP_INDEX < NUM_SPOT_LIGHT_SHADOWS )
		#define SPOT_LIGHT_MAP_INDEX NUM_SPOT_LIGHT_MAPS
		#else
		#define SPOT_LIGHT_MAP_INDEX ( UNROLLED_LOOP_INDEX - NUM_SPOT_LIGHT_SHADOWS + NUM_SPOT_LIGHT_SHADOWS_WITH_MAPS )
		#endif
		#if ( SPOT_LIGHT_MAP_INDEX < NUM_SPOT_LIGHT_MAPS )
			spotLightCoord = vSpotLightCoord[ i ].xyz / vSpotLightCoord[ i ].w;
			inSpotLightMap = all( lessThan( abs( spotLightCoord * 2. - 1. ), vec3( 1.0 ) ) );
			spotColor = texture2D( spotLightMap[ SPOT_LIGHT_MAP_INDEX ], spotLightCoord.xy );
			directLight.color = inSpotLightMap ? directLight.color * spotColor.rgb : directLight.color;
		#endif
		#undef SPOT_LIGHT_MAP_INDEX
		#if defined( USE_SHADOWMAP ) && ( UNROLLED_LOOP_INDEX < NUM_SPOT_LIGHT_SHADOWS )
		spotLightShadow = spotLightShadows[ i ];
		directLight.color *= ( directLight.visible && receiveShadow ) ? getShadow( spotShadowMap[ i ], spotLightShadow.shadowMapSize, spotLightShadow.shadowIntensity, spotLightShadow.shadowBias, spotLightShadow.shadowRadius, vSpotLightCoord[ i ] ) : 1.0;
		#endif
		RE_Direct( directLight, geometryPosition, geometryNormal, geometryViewDir, geometryClearcoatNormal, material, reflectedLight );
	}
	#pragma unroll_loop_end
#endif
#if ( NUM_SUN_LIGHTS > 0 ) && defined( RE_Direct )
	SunLight sunLight;
	#if defined( USE_SHADOWMAP ) && NUM_SUN_LIGHT_SHADOWS > 0
	SunLightShadow sunLightShadow;
	#endif
	#pragma unroll_loop_start
	for ( int i = 0; i < NUM_SUN_LIGHTS; i ++ ) {
		sunLight = sunLights[ i ];
		getSunLightInfo( sunLight, directLight );
		#if defined( USE_SHADOWMAP ) && ( UNROLLED_LOOP_INDEX < NUM_SUN_LIGHT_SHADOWS )
		sunLightShadow = sunLightShadows[ i ];
		directLight.color *= ( directLight.visible && receiveShadow ) ? getSunShadow( sunShadowMap[ i ], sunLightShadow, UNROLLED_LOOP_INDEX ) : 1.0;
		#endif
		RE_Direct( directLight, geometryPosition, geometryNormal, geometryViewDir, geometryClearcoatNormal, material, reflectedLight );
	}
	#pragma unroll_loop_end
#endif
#if ( NUM_DIR_LIGHTS > 0 ) && defined( RE_Direct )
	DirectionalLight directionalLight;
	#if defined( USE_SHADOWMAP ) && NUM_DIR_LIGHT_SHADOWS > 0
	DirectionalLightShadow directionalLightShadow;
	#endif
	#pragma unroll_loop_start
	for ( int i = 0; i < NUM_DIR_LIGHTS; i ++ ) {
		directionalLight = directionalLights[ i ];
		getDirectionalLightInfo( directionalLight, directLight );
		#if defined( USE_SHADOWMAP ) && ( UNROLLED_LOOP_INDEX < NUM_DIR_LIGHT_SHADOWS )
		directionalLightShadow = directionalLightShadows[ i ];
		directLight.color *= ( directLight.visible && receiveShadow ) ? getShadow( directionalShadowMap[ i ], directionalLightShadow.shadowMapSize, directionalLightShadow.shadowIntensity, directionalLightShadow.shadowBias, directionalLightShadow.shadowRadius, vDirectionalShadowCoord[ i ] ) : 1.0;
		#endif
		RE_Direct( directLight, geometryPosition, geometryNormal, geometryViewDir, geometryClearcoatNormal, material, reflectedLight );
	}
	#pragma unroll_loop_end
#endif
#if ( NUM_RECT_AREA_LIGHTS > 0 ) && defined( RE_Direct_RectArea )
	RectAreaLight rectAreaLight;
	#pragma unroll_loop_start
	for ( int i = 0; i < NUM_RECT_AREA_LIGHTS; i ++ ) {
		rectAreaLight = rectAreaLights[ i ];
		RE_Direct_RectArea( rectAreaLight, geometryPosition, geometryNormal, geometryViewDir, geometryClearcoatNormal, material, reflectedLight );
	}
	#pragma unroll_loop_end
#endif
#if defined( RE_IndirectDiffuse )
	vec3 iblIrradiance = vec3( 0.0 );
	vec3 irradiance = getAmbientLightIrradiance( ambientLightColor );
	#if defined( USE_LIGHT_PROBES )
		irradiance += getLightProbeIrradiance( lightProbe, geometryNormal );
	#endif
	#if ( NUM_HEMI_LIGHTS > 0 )
		#pragma unroll_loop_start
		for ( int i = 0; i < NUM_HEMI_LIGHTS; i ++ ) {
			irradiance += getHemisphereLightIrradiance( hemisphereLights[ i ], geometryNormal );
		}
		#pragma unroll_loop_end
	#endif
	#if NUM_LIGHT_PROBE_GRIDS > 0
		vec3 probeWorldPos = ( ( vec4( geometryPosition, 1.0 ) - viewMatrix[ 3 ] ) * viewMatrix ).xyz;
		vec3 probeWorldNormal = transformNormalByInverseViewMatrix( geometryNormal, viewMatrix );
		int probeGrid = - 1;
		#pragma unroll_loop_start
		for ( int i = 0; i < NUM_LIGHT_PROBE_GRIDS; i ++ ) {
			if ( isInsideLightProbeGrid( probeWorldPos, probeWorldNormal, probesMin[ i ], probesMax[ i ], probesResolution[ i ] ) ) probeGrid = UNROLLED_LOOP_INDEX;
		}
		#pragma unroll_loop_end
		#pragma unroll_loop_start
		for ( int i = 0; i < NUM_LIGHT_PROBE_GRIDS; i ++ ) {
			if ( probeGrid == UNROLLED_LOOP_INDEX ) irradiance += getLightProbeGridIrradiance( probesSH[ i ], probesMin[ i ], probesMax[ i ], probesResolution[ i ], probeWorldPos, probeWorldNormal );
		}
		#pragma unroll_loop_end
	#endif
#endif
#if defined( RE_IndirectSpecular )
	vec3 radiance = vec3( 0.0 );
	vec3 clearcoatRadiance = vec3( 0.0 );
#endif`,ED=`#if defined( RE_IndirectDiffuse )
	#ifdef USE_LIGHTMAP
		vec4 lightMapTexel = texture2D( lightMap, vLightMapUv );
		vec3 lightMapIrradiance = lightMapTexel.rgb * lightMapIntensity;
		irradiance += lightMapIrradiance;
	#endif
	#if defined( USE_ENVMAP ) && defined( ENVMAP_TYPE_PMREM )
		#if defined( STANDARD ) || defined( LAMBERT ) || defined( PHONG )
			iblIrradiance += getIBLIrradiance( geometryNormal );
		#endif
	#endif
#endif
#if defined( USE_ENVMAP ) && defined( RE_IndirectSpecular )
	#ifdef USE_ANISOTROPY
		vec3 iblRadiance = getIBLAnisotropyRadiance( geometryViewDir, geometryNormal, material.roughness, material.anisotropyB, material.anisotropy );
	#else
		vec3 iblRadiance = getIBLRadiance( geometryViewDir, geometryNormal, material.roughness );
	#endif
	#ifdef USE_RETROREFLECTION
		#ifdef USE_ANISOTROPY
			vec3 retroIBLRadiance = getIBLAnisotropyRetroRadiance( geometryViewDir, geometryNormal, material.roughness, material.anisotropyB, material.anisotropy );
		#else
			vec3 retroIBLRadiance = getIBLRetroRadiance( geometryViewDir, geometryNormal, material.roughness );
		#endif
		iblRadiance = mix( iblRadiance, retroIBLRadiance, saturate( material.retroreflectivity ) );
	#endif
	radiance += iblRadiance;
	#ifdef USE_CLEARCOAT
		clearcoatRadiance += getIBLRadiance( geometryViewDir, geometryClearcoatNormal, material.clearcoatRoughness );
	#endif
#endif`,TD=`#if defined( RE_IndirectDiffuse )
	#if defined( LAMBERT ) || defined( PHONG )
		irradiance += iblIrradiance;
	#endif
	RE_IndirectDiffuse( irradiance, geometryPosition, geometryNormal, geometryViewDir, geometryClearcoatNormal, material, reflectedLight );
#endif
#if defined( RE_IndirectSpecular )
	RE_IndirectSpecular( radiance, iblIrradiance, clearcoatRadiance, geometryPosition, geometryNormal, geometryViewDir, geometryClearcoatNormal, material, reflectedLight );
#endif`,wD=`#if NUM_LIGHT_PROBE_GRIDS > 0
uniform highp sampler3D probesSH[ NUM_LIGHT_PROBE_GRIDS ];
uniform vec3 probesMin[ NUM_LIGHT_PROBE_GRIDS ];
uniform vec3 probesMax[ NUM_LIGHT_PROBE_GRIDS ];
uniform vec3 probesResolution[ NUM_LIGHT_PROBE_GRIDS ];
bool isInsideLightProbeGrid( vec3 worldPos, vec3 worldNormal, vec3 probesMin, vec3 probesMax, vec3 probesResolution ) {
	vec3 spacing = ( probesMax - probesMin ) / probesResolution;
	vec3 samplePos = worldPos + worldNormal * spacing * 0.5;
	vec3 margin = spacing * 0.01;
	return all( greaterThanEqual( samplePos, probesMin - margin ) ) && all( lessThanEqual( samplePos, probesMax + margin ) );
}
vec3 getLightProbeGridIrradiance( highp sampler3D probesSH, vec3 probesMin, vec3 probesMax, vec3 probesResolution, vec3 worldPos, vec3 worldNormal ) {
	vec3 res = probesResolution;
	vec3 gridRange = probesMax - probesMin;
	vec3 probeSpacing = gridRange / res;
	vec3 samplePos = worldPos + worldNormal * probeSpacing * 0.5;
	vec3 uvw = clamp( ( samplePos - probesMin ) / gridRange, 0.5 / res, 1.0 - 0.5 / res );
	float nz          = res.z;
	float paddedSlices = nz + 2.0;
	float atlasDepth  = 7.0 * paddedSlices;
	float uvZBase     = uvw.z * nz + 1.0;
	vec4 s0 = texture( probesSH, vec3( uvw.xy, ( uvZBase                       ) / atlasDepth ) );
	vec4 s1 = texture( probesSH, vec3( uvw.xy, ( uvZBase +       paddedSlices   ) / atlasDepth ) );
	vec4 s2 = texture( probesSH, vec3( uvw.xy, ( uvZBase + 2.0 * paddedSlices   ) / atlasDepth ) );
	vec4 s3 = texture( probesSH, vec3( uvw.xy, ( uvZBase + 3.0 * paddedSlices   ) / atlasDepth ) );
	vec4 s4 = texture( probesSH, vec3( uvw.xy, ( uvZBase + 4.0 * paddedSlices   ) / atlasDepth ) );
	vec4 s5 = texture( probesSH, vec3( uvw.xy, ( uvZBase + 5.0 * paddedSlices   ) / atlasDepth ) );
	vec4 s6 = texture( probesSH, vec3( uvw.xy, ( uvZBase + 6.0 * paddedSlices   ) / atlasDepth ) );
	vec3 c0 = s0.xyz;
	vec3 c1 = vec3( s0.w, s1.xy );
	vec3 c2 = vec3( s1.zw, s2.x );
	vec3 c3 = s2.yzw;
	vec3 c4 = s3.xyz;
	vec3 c5 = vec3( s3.w, s4.xy );
	vec3 c6 = vec3( s4.zw, s5.x );
	vec3 c7 = s5.yzw;
	vec3 c8 = s6.xyz;
	float x = worldNormal.x, y = worldNormal.y, z = worldNormal.z;
	vec3 result = c0 * 0.886227;
	result += c1 * 2.0 * 0.511664 * y;
	result += c2 * 2.0 * 0.511664 * z;
	result += c3 * 2.0 * 0.511664 * x;
	result += c4 * 2.0 * 0.429043 * x * y;
	result += c5 * 2.0 * 0.429043 * y * z;
	result += c6 * ( 0.743125 * z * z - 0.247708 );
	result += c7 * 2.0 * 0.429043 * x * z;
	result += c8 * 0.429043 * ( x * x - y * y );
	return max( result, vec3( 0.0 ) );
}
#endif`,AD=`#if defined( USE_LOGARITHMIC_DEPTH_BUFFER )
	gl_FragDepth = vIsPerspective == 0.0 ? gl_FragCoord.z : log2( vFragDepth ) * logDepthBufFC * 0.5;
#endif`,RD=`#if defined( USE_LOGARITHMIC_DEPTH_BUFFER )
	uniform float logDepthBufFC;
	varying float vFragDepth;
	varying float vIsPerspective;
#endif`,CD=`#ifdef USE_LOGARITHMIC_DEPTH_BUFFER
	varying float vFragDepth;
	varying float vIsPerspective;
#endif`,DD=`#ifdef USE_LOGARITHMIC_DEPTH_BUFFER
	vFragDepth = 1.0 + gl_Position.w;
	vIsPerspective = float( isPerspectiveMatrix( projectionMatrix ) );
#endif`,ND=`#ifdef USE_MAP
	vec4 sampledDiffuseColor = texture2D( map, vMapUv );
	#ifdef DECODE_VIDEO_TEXTURE
		sampledDiffuseColor = sRGBTransferEOTF( sampledDiffuseColor );
	#endif
	diffuseColor *= sampledDiffuseColor;
#endif`,LD=`#ifdef USE_MAP
	uniform sampler2D map;
#endif`,UD=`#if defined( USE_MAP ) || defined( USE_ALPHAMAP )
	#if defined( USE_POINTS_UV )
		vec2 uv = vUv;
	#else
		vec2 uv = ( uvTransform * vec3( gl_PointCoord.x, 1.0 - gl_PointCoord.y, 1 ) ).xy;
	#endif
#endif
#ifdef USE_MAP
	diffuseColor *= texture2D( map, uv );
#endif
#ifdef USE_ALPHAMAP
	diffuseColor.a *= texture2D( alphaMap, uv ).g;
#endif`,ID=`#if defined( USE_POINTS_UV )
	varying vec2 vUv;
#else
	#if defined( USE_MAP ) || defined( USE_ALPHAMAP )
		uniform mat3 uvTransform;
	#endif
#endif
#ifdef USE_MAP
	uniform sampler2D map;
#endif
#ifdef USE_ALPHAMAP
	uniform sampler2D alphaMap;
#endif`,OD=`float metalnessFactor = metalness;
#ifdef USE_METALNESSMAP
	vec4 texelMetalness = texture2D( metalnessMap, vMetalnessMapUv );
	metalnessFactor *= texelMetalness.b;
#endif`,PD=`#ifdef USE_METALNESSMAP
	uniform sampler2D metalnessMap;
#endif`,zD=`#ifdef USE_INSTANCING_MORPH
	float morphTargetInfluences[ MORPHTARGETS_COUNT ];
	float morphTargetBaseInfluence = texelFetch( morphTexture, ivec2( 0, gl_InstanceID ), 0 ).r;
	for ( int i = 0; i < MORPHTARGETS_COUNT; i ++ ) {
		morphTargetInfluences[i] =  texelFetch( morphTexture, ivec2( i + 1, gl_InstanceID ), 0 ).r;
	}
#endif`,FD=`#if defined( USE_MORPHCOLORS )
	#if defined( USE_COLOR_ALPHA )
		vColor *= morphTargetBaseInfluence;
	#elif defined( USE_COLOR )
		vColor.rgb *= morphTargetBaseInfluence;
	#endif
	for ( int i = 0; i < MORPHTARGETS_COUNT; i ++ ) {
		#if defined( USE_COLOR_ALPHA )
			if ( morphTargetInfluences[ i ] != 0.0 ) vColor += getMorph( gl_VertexID, i, 2 ) * morphTargetInfluences[ i ];
		#elif defined( USE_COLOR )
			if ( morphTargetInfluences[ i ] != 0.0 ) vColor.rgb += getMorph( gl_VertexID, i, 2 ).rgb * morphTargetInfluences[ i ];
		#endif
	}
#endif`,BD=`#ifdef USE_MORPHNORMALS
	objectNormal *= morphTargetBaseInfluence;
	for ( int i = 0; i < MORPHTARGETS_COUNT; i ++ ) {
		if ( morphTargetInfluences[ i ] != 0.0 ) objectNormal += getMorph( gl_VertexID, i, 1 ).xyz * morphTargetInfluences[ i ];
	}
#endif`,HD=`#ifdef USE_MORPHTARGETS
	#ifndef USE_INSTANCING_MORPH
		uniform float morphTargetBaseInfluence;
		uniform float morphTargetInfluences[ MORPHTARGETS_COUNT ];
	#endif
	uniform sampler2DArray morphTargetsTexture;
	uniform ivec2 morphTargetsTextureSize;
	vec4 getMorph( const in int vertexIndex, const in int morphTargetIndex, const in int offset ) {
		int texelIndex = vertexIndex * MORPHTARGETS_TEXTURE_STRIDE + offset;
		int y = texelIndex / morphTargetsTextureSize.x;
		int x = texelIndex - y * morphTargetsTextureSize.x;
		ivec3 morphUV = ivec3( x, y, morphTargetIndex );
		return texelFetch( morphTargetsTexture, morphUV, 0 );
	}
#endif`,GD=`#ifdef USE_MORPHTARGETS
	transformed *= morphTargetBaseInfluence;
	for ( int i = 0; i < MORPHTARGETS_COUNT; i ++ ) {
		if ( morphTargetInfluences[ i ] != 0.0 ) transformed += getMorph( gl_VertexID, i, 0 ).xyz * morphTargetInfluences[ i ];
	}
#endif`,VD=`float faceDirection = gl_FrontFacing ? 1.0 : - 1.0;
#ifdef FLAT_SHADED
	vec3 fdx = dFdx( vViewPosition );
	vec3 fdy = dFdy( vViewPosition );
	vec3 normal = normalize( cross( fdx, fdy ) );
#else
	vec3 normal = normalize( vNormal );
	#ifdef DOUBLE_SIDED
		normal *= faceDirection;
	#endif
#endif
#if defined( USE_NORMALMAP_TANGENTSPACE ) || defined( USE_CLEARCOAT_NORMALMAP ) || defined( USE_ANISOTROPY )
	#ifdef USE_TANGENT
		mat3 tbn = mat3( normalize( vTangent ), normalize( vBitangent ), normal );
	#else
		mat3 tbn = getTangentFrame( - vViewPosition, normal,
		#if defined( USE_NORMALMAP )
			vNormalMapUv
		#elif defined( USE_CLEARCOAT_NORMALMAP )
			vClearcoatNormalMapUv
		#else
			vUv
		#endif
		);
	#endif
	#ifdef DOUBLE_SIDED
		tbn[0] *= faceDirection;
		tbn[1] *= faceDirection;
	#endif
#endif
#ifdef USE_CLEARCOAT_NORMALMAP
	#ifdef USE_TANGENT
		mat3 tbn2 = mat3( normalize( vTangent ), normalize( vBitangent ), normal );
	#else
		mat3 tbn2 = getTangentFrame( - vViewPosition, normal, vClearcoatNormalMapUv );
	#endif
	#ifdef DOUBLE_SIDED
		tbn2[0] *= faceDirection;
		tbn2[1] *= faceDirection;
	#endif
#endif
vec3 nonPerturbedNormal = normal;`,kD=`#ifdef USE_NORMALMAP_OBJECTSPACE
	normal = texture2D( normalMap, vNormalMapUv ).xyz * 2.0 - 1.0;
	#ifdef FLIP_SIDED
		normal = - normal;
	#endif
	#ifdef DOUBLE_SIDED
		normal = normal * faceDirection;
	#endif
	normal = normalize( normalMatrix * normal );
#elif defined( USE_NORMALMAP_TANGENTSPACE )
	vec3 mapN = texture2D( normalMap, vNormalMapUv ).xyz * 2.0 - 1.0;
	#if defined( USE_PACKED_NORMALMAP )
		mapN = vec3( mapN.xy, sqrt( saturate( 1.0 - dot( mapN.xy, mapN.xy ) ) ) );
	#endif
	mapN.xy *= normalScale;
	normal = normalize( tbn * mapN );
#elif defined( USE_BUMPMAP )
	normal = perturbNormalArb( - vViewPosition, normal, dHdxy_fwd(), faceDirection );
#endif`,XD=`#ifndef FLAT_SHADED
	varying vec3 vNormal;
	#ifdef USE_TANGENT
		varying vec3 vTangent;
		varying vec3 vBitangent;
	#endif
#endif`,WD=`#ifndef FLAT_SHADED
	varying vec3 vNormal;
	#ifdef USE_TANGENT
		varying vec3 vTangent;
		varying vec3 vBitangent;
	#endif
#endif`,qD=`#ifndef FLAT_SHADED
	vNormal = normalize( transformedNormal );
	#ifdef USE_TANGENT
		vTangent = normalize( transformedTangent );
		vBitangent = normalize( cross( vNormal, vTangent ) * tangent.w );
		#ifdef FLIP_SIDED
			vBitangent = - vBitangent;
		#endif
	#endif
#endif`,YD=`#ifdef USE_NORMALMAP
	uniform sampler2D normalMap;
	uniform vec2 normalScale;
#endif
#ifdef USE_NORMALMAP_OBJECTSPACE
	uniform mat3 normalMatrix;
#endif
#if ! defined ( USE_TANGENT ) && ( defined ( USE_NORMALMAP_TANGENTSPACE ) || defined ( USE_CLEARCOAT_NORMALMAP ) || defined( USE_ANISOTROPY ) )
	mat3 getTangentFrame( vec3 eye_pos, vec3 surf_norm, vec2 uv ) {
		vec3 q0 = dFdx( eye_pos.xyz );
		vec3 q1 = dFdy( eye_pos.xyz );
		vec2 st0 = dFdx( uv.st );
		vec2 st1 = dFdy( uv.st );
		vec3 N = surf_norm;
		vec3 q1perp = cross( q1, N );
		vec3 q0perp = cross( N, q0 );
		vec3 T = q1perp * st0.x + q0perp * st1.x;
		vec3 B = q1perp * st0.y + q0perp * st1.y;
		float det = max( dot( T, T ), dot( B, B ) );
		float scale = ( det == 0.0 ) ? 0.0 : inversesqrt( det );
		return mat3( T * scale, B * scale, N );
	}
#endif`,ZD=`#ifdef USE_CLEARCOAT
	vec3 clearcoatNormal = nonPerturbedNormal;
#endif`,JD=`#ifdef USE_CLEARCOAT_NORMALMAP
	vec3 clearcoatMapN = texture2D( clearcoatNormalMap, vClearcoatNormalMapUv ).xyz * 2.0 - 1.0;
	clearcoatMapN.xy *= clearcoatNormalScale;
	clearcoatNormal = normalize( tbn2 * clearcoatMapN );
#endif`,KD=`#ifdef USE_CLEARCOATMAP
	uniform sampler2D clearcoatMap;
#endif
#ifdef USE_CLEARCOAT_NORMALMAP
	uniform sampler2D clearcoatNormalMap;
	uniform vec2 clearcoatNormalScale;
#endif
#ifdef USE_CLEARCOAT_ROUGHNESSMAP
	uniform sampler2D clearcoatRoughnessMap;
#endif`,jD=`#ifdef USE_IRIDESCENCEMAP
	uniform sampler2D iridescenceMap;
#endif
#ifdef USE_IRIDESCENCE_THICKNESSMAP
	uniform sampler2D iridescenceThicknessMap;
#endif`,QD=`#ifdef OPAQUE
diffuseColor.a = 1.0;
#endif
#ifdef USE_TRANSMISSION
diffuseColor.a *= material.transmissionAlpha;
#endif
gl_FragColor = vec4( outgoingLight, diffuseColor.a );`,$D=`vec3 packNormalToRGB( const in vec3 normal ) {
	return normalize( normal ) * 0.5 + 0.5;
}
vec3 unpackRGBToNormal( const in vec3 rgb ) {
	return 2.0 * rgb.xyz - 1.0;
}
const float PackUpscale = 256. / 255.;const float UnpackDownscale = 255. / 256.;const float ShiftRight8 = 1. / 256.;
const float Inv255 = 1. / 255.;
const vec4 PackFactors = vec4( 1.0, 256.0, 256.0 * 256.0, 256.0 * 256.0 * 256.0 );
const vec2 UnpackFactors2 = vec2( UnpackDownscale, 1.0 / PackFactors.g );
const vec3 UnpackFactors3 = vec3( UnpackDownscale / PackFactors.rg, 1.0 / PackFactors.b );
const vec4 UnpackFactors4 = vec4( UnpackDownscale / PackFactors.rgb, 1.0 / PackFactors.a );
vec4 packDepthToRGBA( const in float v ) {
	if( v <= 0.0 )
		return vec4( 0., 0., 0., 0. );
	if( v >= 1.0 )
		return vec4( 1., 1., 1., 1. );
	float vuf;
	float af = modf( v * PackFactors.a, vuf );
	float bf = modf( vuf * ShiftRight8, vuf );
	float gf = modf( vuf * ShiftRight8, vuf );
	return vec4( vuf * Inv255, gf * PackUpscale, bf * PackUpscale, af );
}
vec3 packDepthToRGB( const in float v ) {
	if( v <= 0.0 )
		return vec3( 0., 0., 0. );
	if( v >= 1.0 )
		return vec3( 1., 1., 1. );
	float vuf;
	float bf = modf( v * PackFactors.b, vuf );
	float gf = modf( vuf * ShiftRight8, vuf );
	return vec3( vuf * Inv255, gf * PackUpscale, bf );
}
vec2 packDepthToRG( const in float v ) {
	if( v <= 0.0 )
		return vec2( 0., 0. );
	if( v >= 1.0 )
		return vec2( 1., 1. );
	float vuf;
	float gf = modf( v * 256., vuf );
	return vec2( vuf * Inv255, gf );
}
float unpackRGBAToDepth( const in vec4 v ) {
	return dot( v, UnpackFactors4 );
}
float unpackRGBToDepth( const in vec3 v ) {
	return dot( v, UnpackFactors3 );
}
float unpackRGToDepth( const in vec2 v ) {
	return v.r * UnpackFactors2.r + v.g * UnpackFactors2.g;
}
vec4 pack2HalfToRGBA( const in vec2 v ) {
	vec4 r = vec4( v.x, fract( v.x * 255.0 ), v.y, fract( v.y * 255.0 ) );
	return vec4( r.x - r.y / 255.0, r.y, r.z - r.w / 255.0, r.w );
}
vec2 unpackRGBATo2Half( const in vec4 v ) {
	return vec2( v.x + ( v.y / 255.0 ), v.z + ( v.w / 255.0 ) );
}
float viewZToOrthographicDepth( const in float viewZ, const in float near, const in float far ) {
	return ( viewZ + near ) / ( near - far );
}
float orthographicDepthToViewZ( const in float depth, const in float near, const in float far ) {
	#ifdef USE_REVERSED_DEPTH_BUFFER
	
		return depth * ( far - near ) - far;
	#else
		return depth * ( near - far ) - near;
	#endif
}
float viewZToPerspectiveDepth( const in float viewZ, const in float near, const in float far ) {
	return ( ( near + viewZ ) * far ) / ( ( far - near ) * viewZ );
}
float perspectiveDepthToViewZ( const in float depth, const in float near, const in float far ) {
	
	#ifdef USE_REVERSED_DEPTH_BUFFER
		return ( near * far ) / ( ( near - far ) * depth - near );
	#else
		return ( near * far ) / ( ( far - near ) * depth - far );
	#endif
}`,tN=`#ifdef PREMULTIPLIED_ALPHA
	gl_FragColor.rgb *= gl_FragColor.a;
#endif`,eN=`vec4 mvPosition = vec4( transformed, 1.0 );
#ifdef USE_BATCHING
	mvPosition = batchingMatrix * mvPosition;
#endif
#ifdef USE_INSTANCING
	mvPosition = instanceMatrix * mvPosition;
#endif
mvPosition = modelViewMatrix * mvPosition;
gl_Position = projectionMatrix * mvPosition;`,nN=`#ifdef DITHERING
	gl_FragColor.rgb = dithering( gl_FragColor.rgb );
#endif`,iN=`#ifdef DITHERING
	vec3 dithering( vec3 color ) {
		float grid_position = rand( gl_FragCoord.xy );
		vec3 dither_shift_RGB = vec3( 0.25 / 255.0, -0.25 / 255.0, 0.25 / 255.0 );
		dither_shift_RGB = mix( 2.0 * dither_shift_RGB, -2.0 * dither_shift_RGB, grid_position );
		return color + dither_shift_RGB;
	}
#endif`,aN=`float roughnessFactor = roughness;
#ifdef USE_ROUGHNESSMAP
	vec4 texelRoughness = texture2D( roughnessMap, vRoughnessMapUv );
	roughnessFactor *= texelRoughness.g;
#endif`,rN=`#ifdef USE_ROUGHNESSMAP
	uniform sampler2D roughnessMap;
#endif`,sN=`#if NUM_SPOT_LIGHT_COORDS > 0
	varying vec4 vSpotLightCoord[ NUM_SPOT_LIGHT_COORDS ];
#endif
#if NUM_SPOT_LIGHT_MAPS > 0
	uniform sampler2D spotLightMap[ NUM_SPOT_LIGHT_MAPS ];
#endif
#ifdef USE_SHADOWMAP
	#if NUM_SUN_LIGHT_SHADOWS > 0
		#define SUN_LIGHT_CASCADES 2
		#if defined( SHADOWMAP_TYPE_PCF )
			uniform sampler2DShadow sunShadowMap[ NUM_SUN_LIGHT_SHADOWS ];
		#else
			uniform sampler2D sunShadowMap[ NUM_SUN_LIGHT_SHADOWS ];
		#endif
		uniform mat4 sunShadowMatrix[ NUM_SUN_LIGHT_SHADOWS * SUN_LIGHT_CASCADES ];
		uniform vec4 sunShadowCascade[ NUM_SUN_LIGHT_SHADOWS * SUN_LIGHT_CASCADES ];
		varying vec4 vSunShadowWorldPosition;
		varying vec3 vSunShadowWorldNormal;
		struct SunLightShadow {
			float shadowIntensity;
			float shadowBias;
			float shadowNormalBias;
			float shadowRadius;
			vec2 shadowMapSize;
		};
		uniform SunLightShadow sunLightShadows[ NUM_SUN_LIGHT_SHADOWS ];
	#endif
	#if NUM_DIR_LIGHT_SHADOWS > 0
		#if defined( SHADOWMAP_TYPE_PCF )
			uniform sampler2DShadow directionalShadowMap[ NUM_DIR_LIGHT_SHADOWS ];
		#else
			uniform sampler2D directionalShadowMap[ NUM_DIR_LIGHT_SHADOWS ];
		#endif
		varying vec4 vDirectionalShadowCoord[ NUM_DIR_LIGHT_SHADOWS ];
		struct DirectionalLightShadow {
			float shadowIntensity;
			float shadowBias;
			float shadowNormalBias;
			float shadowRadius;
			vec2 shadowMapSize;
		};
		uniform DirectionalLightShadow directionalLightShadows[ NUM_DIR_LIGHT_SHADOWS ];
	#endif
	#if NUM_SPOT_LIGHT_SHADOWS > 0
		#if defined( SHADOWMAP_TYPE_PCF )
			uniform sampler2DShadow spotShadowMap[ NUM_SPOT_LIGHT_SHADOWS ];
		#else
			uniform sampler2D spotShadowMap[ NUM_SPOT_LIGHT_SHADOWS ];
		#endif
		struct SpotLightShadow {
			float shadowIntensity;
			float shadowBias;
			float shadowNormalBias;
			float shadowRadius;
			vec2 shadowMapSize;
		};
		uniform SpotLightShadow spotLightShadows[ NUM_SPOT_LIGHT_SHADOWS ];
	#endif
	#if NUM_POINT_LIGHT_SHADOWS > 0
		#if defined( SHADOWMAP_TYPE_PCF )
			uniform samplerCubeShadow pointShadowMap[ NUM_POINT_LIGHT_SHADOWS ];
		#elif defined( SHADOWMAP_TYPE_BASIC )
			uniform samplerCube pointShadowMap[ NUM_POINT_LIGHT_SHADOWS ];
		#endif
		varying vec4 vPointShadowCoord[ NUM_POINT_LIGHT_SHADOWS ];
		struct PointLightShadow {
			float shadowIntensity;
			float shadowBias;
			float shadowNormalBias;
			float shadowRadius;
			vec2 shadowMapSize;
			float shadowCameraNear;
			float shadowCameraFar;
		};
		uniform PointLightShadow pointLightShadows[ NUM_POINT_LIGHT_SHADOWS ];
	#endif
	#if defined( SHADOWMAP_TYPE_PCF )
		float interleavedGradientNoise( vec2 position ) {
			return fract( 52.9829189 * fract( dot( position, vec2( 0.06711056, 0.00583715 ) ) ) );
		}
		vec2 vogelDiskSample( int sampleIndex, int samplesCount, float phi ) {
			const float goldenAngle = 2.399963229728653;
			float r = sqrt( ( float( sampleIndex ) + 0.5 ) / float( samplesCount ) );
			float theta = float( sampleIndex ) * goldenAngle + phi;
			return vec2( cos( theta ), sin( theta ) ) * r;
		}
	#endif
	#if defined( SHADOWMAP_TYPE_PCF )
		float getShadow( sampler2DShadow shadowMap, vec2 shadowMapSize, float shadowIntensity, float shadowBias, float shadowRadius, vec4 shadowCoord ) {
			float shadow = 1.0;
			shadowCoord.xyz /= shadowCoord.w;
			#ifdef USE_REVERSED_DEPTH_BUFFER
				shadowCoord.z -= shadowBias;
			#else
				shadowCoord.z += shadowBias;
			#endif
			bool inFrustum = shadowCoord.x >= 0.0 && shadowCoord.x <= 1.0 && shadowCoord.y >= 0.0 && shadowCoord.y <= 1.0;
			bool frustumTest = inFrustum && shadowCoord.z <= 1.0;
			if ( frustumTest ) {
				vec2 texelSize = vec2( 1.0 ) / shadowMapSize;
				vec2 radius = shadowRadius * texelSize;
				float phi = interleavedGradientNoise( gl_FragCoord.xy ) * PI2;
				shadow = (
					texture( shadowMap, vec3( shadowCoord.xy + vogelDiskSample( 0, 5, phi ) * radius, shadowCoord.z ) ) +
					texture( shadowMap, vec3( shadowCoord.xy + vogelDiskSample( 1, 5, phi ) * radius, shadowCoord.z ) ) +
					texture( shadowMap, vec3( shadowCoord.xy + vogelDiskSample( 2, 5, phi ) * radius, shadowCoord.z ) ) +
					texture( shadowMap, vec3( shadowCoord.xy + vogelDiskSample( 3, 5, phi ) * radius, shadowCoord.z ) ) +
					texture( shadowMap, vec3( shadowCoord.xy + vogelDiskSample( 4, 5, phi ) * radius, shadowCoord.z ) )
				) * 0.2;
			}
			return mix( 1.0, shadow, shadowIntensity );
		}
	#elif defined( SHADOWMAP_TYPE_VSM )
		float getShadow( sampler2D shadowMap, vec2 shadowMapSize, float shadowIntensity, float shadowBias, float shadowRadius, vec4 shadowCoord ) {
			float shadow = 1.0;
			shadowCoord.xyz /= shadowCoord.w;
			#ifdef USE_REVERSED_DEPTH_BUFFER
				shadowCoord.z -= shadowBias;
			#else
				shadowCoord.z += shadowBias;
			#endif
			bool inFrustum = shadowCoord.x >= 0.0 && shadowCoord.x <= 1.0 && shadowCoord.y >= 0.0 && shadowCoord.y <= 1.0;
			bool frustumTest = inFrustum && shadowCoord.z <= 1.0;
			if ( frustumTest ) {
				vec2 distribution = texture2D( shadowMap, shadowCoord.xy ).rg;
				float mean = distribution.x;
				float variance = distribution.y * distribution.y;
				#ifdef USE_REVERSED_DEPTH_BUFFER
					float hard_shadow = step( mean, shadowCoord.z );
				#else
					float hard_shadow = step( shadowCoord.z, mean );
				#endif
				
				if ( hard_shadow == 1.0 ) {
					shadow = 1.0;
				} else {
					variance = max( variance, 0.0000001 );
					float d = shadowCoord.z - mean;
					float p_max = variance / ( variance + d * d );
					p_max = clamp( ( p_max - 0.3 ) / 0.65, 0.0, 1.0 );
					shadow = max( hard_shadow, p_max );
				}
			}
			return mix( 1.0, shadow, shadowIntensity );
		}
	#else
		float getShadow( sampler2D shadowMap, vec2 shadowMapSize, float shadowIntensity, float shadowBias, float shadowRadius, vec4 shadowCoord ) {
			float shadow = 1.0;
			shadowCoord.xyz /= shadowCoord.w;
			#ifdef USE_REVERSED_DEPTH_BUFFER
				shadowCoord.z -= shadowBias;
			#else
				shadowCoord.z += shadowBias;
			#endif
			bool inFrustum = shadowCoord.x >= 0.0 && shadowCoord.x <= 1.0 && shadowCoord.y >= 0.0 && shadowCoord.y <= 1.0;
			bool frustumTest = inFrustum && shadowCoord.z <= 1.0;
			if ( frustumTest ) {
				float depth = texture2D( shadowMap, shadowCoord.xy ).r;
				#ifdef USE_REVERSED_DEPTH_BUFFER
					shadow = step( depth, shadowCoord.z );
				#else
					shadow = step( shadowCoord.z, depth );
				#endif
			}
			return mix( 1.0, shadow, shadowIntensity );
		}
	#endif
	#if NUM_SUN_LIGHT_SHADOWS > 0
		float getSunShadow(
			#if defined( SHADOWMAP_TYPE_PCF )
				sampler2DShadow shadowMap,
			#else
				sampler2D shadowMap,
			#endif
			SunLightShadow sunLightShadow,
			int shadowIndex
		) {
			vec4 shadowWorldPosition = vec4( vSunShadowWorldPosition.xyz + vSunShadowWorldNormal * sunLightShadow.shadowNormalBias, 1.0 );
			float viewDepth = vSunShadowWorldPosition.w;
			int cascadeOffset = shadowIndex * SUN_LIGHT_CASCADES;
			float shadow = 1.0;
			for ( int i = SUN_LIGHT_CASCADES - 1; i >= 0; i -- ) {
				vec4 cascade = sunShadowCascade[ cascadeOffset + i ];
				if ( viewDepth >= cascade.x && viewDepth < cascade.y ) {
					float cascadeShadow = getShadow(
						shadowMap,
						sunLightShadow.shadowMapSize,
						sunLightShadow.shadowIntensity,
						sunLightShadow.shadowBias,
						sunLightShadow.shadowRadius,
						sunShadowMatrix[ cascadeOffset + i ] * shadowWorldPosition
					);
					shadow = mix( cascadeShadow, shadow, smoothstep( cascade.z, cascade.y, viewDepth ) );
				}
			}
			return shadow;
		}
	#endif
	#if NUM_POINT_LIGHT_SHADOWS > 0
	#if defined( SHADOWMAP_TYPE_PCF )
	float getPointShadow( samplerCubeShadow shadowMap, vec2 shadowMapSize, float shadowIntensity, float shadowBias, float shadowRadius, vec4 shadowCoord, float shadowCameraNear, float shadowCameraFar ) {
		float shadow = 1.0;
		vec3 lightToPosition = shadowCoord.xyz;
		vec3 bd3D = normalize( lightToPosition );
		vec3 absVec = abs( lightToPosition );
		float viewSpaceZ = max( max( absVec.x, absVec.y ), absVec.z );
		if ( viewSpaceZ - shadowCameraFar <= 0.0 && viewSpaceZ - shadowCameraNear >= 0.0 ) {
			float lightDistance = length( lightToPosition );
			float depthRange = shadowCameraFar - shadowCameraNear;
			#ifdef USE_REVERSED_DEPTH_BUFFER
				float depthA = - shadowCameraNear / depthRange - shadowBias;
				float depthB = shadowCameraNear * shadowCameraFar / ( depthRange * lightDistance );
			#else
				float depthA = shadowCameraFar / depthRange + shadowBias;
				float depthB = - shadowCameraNear * shadowCameraFar / ( depthRange * lightDistance );
			#endif
			float texelSize = shadowRadius / shadowMapSize.x;
			vec3 absDir = abs( bd3D );
			vec3 tangent = absDir.x > absDir.z ? vec3( 0.0, 1.0, 0.0 ) : vec3( 1.0, 0.0, 0.0 );
			tangent = normalize( cross( bd3D, tangent ) );
			vec3 bitangent = cross( bd3D, tangent );
			float phi = interleavedGradientNoise( gl_FragCoord.xy ) * PI2;
			shadow = 0.0;
			for ( int i = 0; i < 5; i ++ ) {
				vec2 offset = vogelDiskSample( i, 5, phi );
				vec3 direction = bd3D + ( tangent * offset.x + bitangent * offset.y ) * texelSize;
				vec3 absDirection = abs( direction );
				float dp = depthA + depthB / max( max( absDirection.x, absDirection.y ), absDirection.z );
				shadow += texture( shadowMap, vec4( direction, dp ) );
			}
			shadow *= 0.2;
		}
		return mix( 1.0, shadow, shadowIntensity );
	}
	#elif defined( SHADOWMAP_TYPE_BASIC )
	float getPointShadow( samplerCube shadowMap, vec2 shadowMapSize, float shadowIntensity, float shadowBias, float shadowRadius, vec4 shadowCoord, float shadowCameraNear, float shadowCameraFar ) {
		float shadow = 1.0;
		vec3 lightToPosition = shadowCoord.xyz;
		vec3 absVec = abs( lightToPosition );
		float viewSpaceZ = max( max( absVec.x, absVec.y ), absVec.z );
		if ( viewSpaceZ - shadowCameraFar <= 0.0 && viewSpaceZ - shadowCameraNear >= 0.0 ) {
			float dp = ( shadowCameraFar * ( viewSpaceZ - shadowCameraNear ) ) / ( viewSpaceZ * ( shadowCameraFar - shadowCameraNear ) );
			dp += shadowBias;
			vec3 bd3D = normalize( lightToPosition );
			float depth = textureCube( shadowMap, bd3D ).r;
			#ifdef USE_REVERSED_DEPTH_BUFFER
				depth = 1.0 - depth;
			#endif
			shadow = step( dp, depth );
		}
		return mix( 1.0, shadow, shadowIntensity );
	}
	#endif
	#endif
#endif`,oN=`#if NUM_SPOT_LIGHT_COORDS > 0
	uniform mat4 spotLightMatrix[ NUM_SPOT_LIGHT_COORDS ];
	varying vec4 vSpotLightCoord[ NUM_SPOT_LIGHT_COORDS ];
#endif
#ifdef USE_SHADOWMAP
	#if NUM_SUN_LIGHT_SHADOWS > 0
		varying vec4 vSunShadowWorldPosition;
		varying vec3 vSunShadowWorldNormal;
	#endif
	#if NUM_DIR_LIGHT_SHADOWS > 0
		uniform mat4 directionalShadowMatrix[ NUM_DIR_LIGHT_SHADOWS ];
		varying vec4 vDirectionalShadowCoord[ NUM_DIR_LIGHT_SHADOWS ];
		struct DirectionalLightShadow {
			float shadowIntensity;
			float shadowBias;
			float shadowNormalBias;
			float shadowRadius;
			vec2 shadowMapSize;
		};
		uniform DirectionalLightShadow directionalLightShadows[ NUM_DIR_LIGHT_SHADOWS ];
	#endif
	#if NUM_SPOT_LIGHT_SHADOWS > 0
		struct SpotLightShadow {
			float shadowIntensity;
			float shadowBias;
			float shadowNormalBias;
			float shadowRadius;
			vec2 shadowMapSize;
		};
		uniform SpotLightShadow spotLightShadows[ NUM_SPOT_LIGHT_SHADOWS ];
	#endif
	#if NUM_POINT_LIGHT_SHADOWS > 0
		uniform mat4 pointShadowMatrix[ NUM_POINT_LIGHT_SHADOWS ];
		varying vec4 vPointShadowCoord[ NUM_POINT_LIGHT_SHADOWS ];
		struct PointLightShadow {
			float shadowIntensity;
			float shadowBias;
			float shadowNormalBias;
			float shadowRadius;
			vec2 shadowMapSize;
			float shadowCameraNear;
			float shadowCameraFar;
		};
		uniform PointLightShadow pointLightShadows[ NUM_POINT_LIGHT_SHADOWS ];
	#endif
#endif`,lN=`#if ( defined( USE_SHADOWMAP ) && ( NUM_DIR_LIGHT_SHADOWS > 0 || NUM_SUN_LIGHT_SHADOWS > 0 || NUM_POINT_LIGHT_SHADOWS > 0 ) ) || ( NUM_SPOT_LIGHT_COORDS > 0 )
	#ifdef HAS_NORMAL
		vec3 shadowWorldNormal = transformNormalByInverseViewMatrix( transformedNormal, viewMatrix );
	#else
		vec3 shadowWorldNormal = vec3( 0.0 );
	#endif
	vec4 shadowWorldPosition;
#endif
#if defined( USE_SHADOWMAP )
	#if NUM_SUN_LIGHT_SHADOWS > 0
		vSunShadowWorldPosition = vec4( worldPosition.xyz, - mvPosition.z );
		vSunShadowWorldNormal = shadowWorldNormal;
	#endif
	#if NUM_DIR_LIGHT_SHADOWS > 0
		#pragma unroll_loop_start
		for ( int i = 0; i < NUM_DIR_LIGHT_SHADOWS; i ++ ) {
			shadowWorldPosition = worldPosition + vec4( shadowWorldNormal * directionalLightShadows[ i ].shadowNormalBias, 0 );
			vDirectionalShadowCoord[ i ] = directionalShadowMatrix[ i ] * shadowWorldPosition;
		}
		#pragma unroll_loop_end
	#endif
	#if NUM_POINT_LIGHT_SHADOWS > 0
		#pragma unroll_loop_start
		for ( int i = 0; i < NUM_POINT_LIGHT_SHADOWS; i ++ ) {
			shadowWorldPosition = worldPosition + vec4( shadowWorldNormal * pointLightShadows[ i ].shadowNormalBias, 0 );
			vPointShadowCoord[ i ] = pointShadowMatrix[ i ] * shadowWorldPosition;
		}
		#pragma unroll_loop_end
	#endif
#endif
#if NUM_SPOT_LIGHT_COORDS > 0
	#pragma unroll_loop_start
	for ( int i = 0; i < NUM_SPOT_LIGHT_COORDS; i ++ ) {
		shadowWorldPosition = worldPosition;
		#if ( defined( USE_SHADOWMAP ) && UNROLLED_LOOP_INDEX < NUM_SPOT_LIGHT_SHADOWS )
			shadowWorldPosition.xyz += shadowWorldNormal * spotLightShadows[ i ].shadowNormalBias;
		#endif
		vSpotLightCoord[ i ] = spotLightMatrix[ i ] * shadowWorldPosition;
	}
	#pragma unroll_loop_end
#endif`,cN=`float getShadowMask() {
	float shadow = 1.0;
	#ifdef USE_SHADOWMAP
	#if NUM_SUN_LIGHT_SHADOWS > 0
	SunLightShadow sunLight;
	#pragma unroll_loop_start
	for ( int i = 0; i < NUM_SUN_LIGHT_SHADOWS; i ++ ) {
		sunLight = sunLightShadows[ i ];
		shadow *= receiveShadow ? getSunShadow( sunShadowMap[ i ], sunLight, UNROLLED_LOOP_INDEX ) : 1.0;
	}
	#pragma unroll_loop_end
	#endif
	#if NUM_DIR_LIGHT_SHADOWS > 0
	DirectionalLightShadow directionalLight;
	#pragma unroll_loop_start
	for ( int i = 0; i < NUM_DIR_LIGHT_SHADOWS; i ++ ) {
		directionalLight = directionalLightShadows[ i ];
		shadow *= receiveShadow ? getShadow( directionalShadowMap[ i ], directionalLight.shadowMapSize, directionalLight.shadowIntensity, directionalLight.shadowBias, directionalLight.shadowRadius, vDirectionalShadowCoord[ i ] ) : 1.0;
	}
	#pragma unroll_loop_end
	#endif
	#if NUM_SPOT_LIGHT_SHADOWS > 0
	SpotLightShadow spotLight;
	#pragma unroll_loop_start
	for ( int i = 0; i < NUM_SPOT_LIGHT_SHADOWS; i ++ ) {
		spotLight = spotLightShadows[ i ];
		shadow *= receiveShadow ? getShadow( spotShadowMap[ i ], spotLight.shadowMapSize, spotLight.shadowIntensity, spotLight.shadowBias, spotLight.shadowRadius, vSpotLightCoord[ i ] ) : 1.0;
	}
	#pragma unroll_loop_end
	#endif
	#if NUM_POINT_LIGHT_SHADOWS > 0 && ( defined( SHADOWMAP_TYPE_PCF ) || defined( SHADOWMAP_TYPE_BASIC ) )
	PointLightShadow pointLight;
	#pragma unroll_loop_start
	for ( int i = 0; i < NUM_POINT_LIGHT_SHADOWS; i ++ ) {
		pointLight = pointLightShadows[ i ];
		shadow *= receiveShadow ? getPointShadow( pointShadowMap[ i ], pointLight.shadowMapSize, pointLight.shadowIntensity, pointLight.shadowBias, pointLight.shadowRadius, vPointShadowCoord[ i ], pointLight.shadowCameraNear, pointLight.shadowCameraFar ) : 1.0;
	}
	#pragma unroll_loop_end
	#endif
	#endif
	return shadow;
}`,uN=`#ifdef USE_SKINNING
	mat4 boneMatX = getBoneMatrix( skinIndex.x );
	mat4 boneMatY = getBoneMatrix( skinIndex.y );
	mat4 boneMatZ = getBoneMatrix( skinIndex.z );
	mat4 boneMatW = getBoneMatrix( skinIndex.w );
#endif`,fN=`#ifdef USE_SKINNING
	uniform mat4 bindMatrix;
	uniform mat4 bindMatrixInverse;
	uniform highp sampler2D boneTexture;
	mat4 getBoneMatrix( const in float i ) {
		int size = textureSize( boneTexture, 0 ).x;
		int j = int( i ) * 4;
		int x = j % size;
		int y = j / size;
		vec4 v1 = texelFetch( boneTexture, ivec2( x, y ), 0 );
		vec4 v2 = texelFetch( boneTexture, ivec2( x + 1, y ), 0 );
		vec4 v3 = texelFetch( boneTexture, ivec2( x + 2, y ), 0 );
		vec4 v4 = texelFetch( boneTexture, ivec2( x + 3, y ), 0 );
		return mat4( v1, v2, v3, v4 );
	}
#endif`,hN=`#ifdef USE_SKINNING
	vec4 skinVertex = bindMatrix * vec4( transformed, 1.0 );
	vec4 skinned = vec4( 0.0 );
	skinned += boneMatX * skinVertex * skinWeight.x;
	skinned += boneMatY * skinVertex * skinWeight.y;
	skinned += boneMatZ * skinVertex * skinWeight.z;
	skinned += boneMatW * skinVertex * skinWeight.w;
	transformed = ( bindMatrixInverse * skinned ).xyz;
#endif`,dN=`#ifdef USE_SKINNING
	mat4 skinMatrix = mat4( 0.0 );
	skinMatrix += skinWeight.x * boneMatX;
	skinMatrix += skinWeight.y * boneMatY;
	skinMatrix += skinWeight.z * boneMatZ;
	skinMatrix += skinWeight.w * boneMatW;
	skinMatrix = bindMatrixInverse * skinMatrix * bindMatrix;
	objectNormal = vec4( skinMatrix * vec4( objectNormal, 0.0 ) ).xyz;
	#ifdef USE_TANGENT
		objectTangent = vec4( skinMatrix * vec4( objectTangent, 0.0 ) ).xyz;
	#endif
#endif`,pN=`float specularStrength;
#ifdef USE_SPECULARMAP
	vec4 texelSpecular = texture2D( specularMap, vSpecularMapUv );
	specularStrength = texelSpecular.r;
#else
	specularStrength = 1.0;
#endif`,mN=`#ifdef USE_SPECULARMAP
	uniform sampler2D specularMap;
#endif`,gN=`#if defined( TONE_MAPPING )
	gl_FragColor.rgb = toneMapping( gl_FragColor.rgb );
#endif`,vN=`#ifndef saturate
#define saturate( a ) clamp( a, 0.0, 1.0 )
#endif
uniform float toneMappingExposure;
vec3 LinearToneMapping( vec3 color ) {
	return saturate( toneMappingExposure * color );
}
vec3 ReinhardToneMapping( vec3 color ) {
	color *= toneMappingExposure;
	return saturate( color / ( vec3( 1.0 ) + color ) );
}
vec3 CineonToneMapping( vec3 color ) {
	color *= toneMappingExposure;
	color = max( vec3( 0.0 ), color - 0.004 );
	return pow( ( color * ( 6.2 * color + 0.5 ) ) / ( color * ( 6.2 * color + 1.7 ) + 0.06 ), vec3( 2.2 ) );
}
vec3 RRTAndODTFit( vec3 v ) {
	vec3 a = v * ( v + 0.0245786 ) - 0.000090537;
	vec3 b = v * ( 0.983729 * v + 0.4329510 ) + 0.238081;
	return a / b;
}
vec3 ACESFilmicToneMapping( vec3 color ) {
	const mat3 ACESInputMat = mat3(
		vec3( 0.59719, 0.07600, 0.02840 ),		vec3( 0.35458, 0.90834, 0.13383 ),
		vec3( 0.04823, 0.01566, 0.83777 )
	);
	const mat3 ACESOutputMat = mat3(
		vec3(  1.60475, -0.10208, -0.00327 ),		vec3( -0.53108,  1.10813, -0.07276 ),
		vec3( -0.07367, -0.00605,  1.07602 )
	);
	color *= toneMappingExposure / 0.6;
	color = ACESInputMat * color;
	color = RRTAndODTFit( color );
	color = ACESOutputMat * color;
	return saturate( color );
}
const mat3 LINEAR_REC2020_TO_LINEAR_SRGB = mat3(
	vec3( 1.6605, - 0.1246, - 0.0182 ),
	vec3( - 0.5876, 1.1329, - 0.1006 ),
	vec3( - 0.0728, - 0.0083, 1.1187 )
);
const mat3 LINEAR_SRGB_TO_LINEAR_REC2020 = mat3(
	vec3( 0.6274, 0.0691, 0.0164 ),
	vec3( 0.3293, 0.9195, 0.0880 ),
	vec3( 0.0433, 0.0113, 0.8956 )
);
vec3 agxDefaultContrastApprox( vec3 x ) {
	vec3 x2 = x * x;
	vec3 x4 = x2 * x2;
	return + 15.5 * x4 * x2
		- 40.14 * x4 * x
		+ 31.96 * x4
		- 6.868 * x2 * x
		+ 0.4298 * x2
		+ 0.1191 * x
		- 0.00232;
}
vec3 AgXToneMapping( vec3 color ) {
	const mat3 AgXInsetMatrix = mat3(
		vec3( 0.856627153315983, 0.137318972929847, 0.11189821299995 ),
		vec3( 0.0951212405381588, 0.761241990602591, 0.0767994186031903 ),
		vec3( 0.0482516061458583, 0.101439036467562, 0.811302368396859 )
	);
	const mat3 AgXOutsetMatrix = mat3(
		vec3( 1.1271005818144368, - 0.1413297634984383, - 0.14132976349843826 ),
		vec3( - 0.11060664309660323, 1.157823702216272, - 0.11060664309660294 ),
		vec3( - 0.016493938717834573, - 0.016493938717834257, 1.2519364065950405 )
	);
	const float AgxMinEv = - 12.47393;	const float AgxMaxEv = 4.026069;
	color *= toneMappingExposure;
	color = LINEAR_SRGB_TO_LINEAR_REC2020 * color;
	color = AgXInsetMatrix * color;
	color = max( color, 1e-10 );	color = log2( color );
	color = ( color - AgxMinEv ) / ( AgxMaxEv - AgxMinEv );
	color = clamp( color, 0.0, 1.0 );
	color = agxDefaultContrastApprox( color );
	color = AgXOutsetMatrix * color;
	color = pow( max( vec3( 0.0 ), color ), vec3( 2.2 ) );
	color = LINEAR_REC2020_TO_LINEAR_SRGB * color;
	color = clamp( color, 0.0, 1.0 );
	return color;
}
vec3 NeutralToneMapping( vec3 color ) {
	const float StartCompression = 0.8 - 0.04;
	const float Desaturation = 0.15;
	color *= toneMappingExposure;
	float x = min( color.r, min( color.g, color.b ) );
	float offset = x < 0.08 ? x - 6.25 * x * x : 0.04;
	color -= offset;
	float peak = max( color.r, max( color.g, color.b ) );
	if ( peak < StartCompression ) return color;
	float d = 1. - StartCompression;
	float newPeak = 1. - d * d / ( peak + d - StartCompression );
	color *= newPeak / peak;
	float g = 1. - 1. / ( Desaturation * ( peak - newPeak ) + 1. );
	return mix( color, vec3( newPeak ), g );
}
vec3 CustomToneMapping( vec3 color ) { return color; }`,xN=`#ifdef USE_TRANSMISSION
	material.transmission = transmission;
	material.transmissionAlpha = 1.0;
	material.thickness = thickness;
	material.attenuationDistance = attenuationDistance;
	material.attenuationColor = attenuationColor;
	#ifdef USE_TRANSMISSIONMAP
		material.transmission *= texture2D( transmissionMap, vTransmissionMapUv ).r;
	#endif
	#ifdef USE_THICKNESSMAP
		material.thickness *= texture2D( thicknessMap, vThicknessMapUv ).g;
	#endif
	vec3 pos = vWorldPosition;
	vec3 v = normalize( cameraPosition - pos );
	vec3 n = transformNormalByInverseViewMatrix( normal, viewMatrix );
	vec4 transmitted = getIBLVolumeRefraction(
		n, v, material.roughness, material.diffuseContribution, material.specularColorBlended, material.specularF90,
		pos, modelMatrix, viewMatrix, projectionMatrix, material.dispersion, material.ior, material.thickness,
		material.attenuationColor, material.attenuationDistance );
	material.transmissionAlpha = mix( material.transmissionAlpha, transmitted.a, material.transmission );
	totalDiffuse = mix( totalDiffuse, transmitted.rgb, material.transmission );
#endif`,yN=`#ifdef USE_TRANSMISSION
	uniform float transmission;
	uniform float thickness;
	uniform float attenuationDistance;
	uniform vec3 attenuationColor;
	#ifdef USE_TRANSMISSIONMAP
		uniform sampler2D transmissionMap;
	#endif
	#ifdef USE_THICKNESSMAP
		uniform sampler2D thicknessMap;
	#endif
	uniform vec2 transmissionSamplerSize;
	uniform sampler2D transmissionSamplerMap;
	uniform mat4 modelMatrix;
	uniform mat4 projectionMatrix;
	varying vec3 vWorldPosition;
	float w0( float a ) {
		return ( 1.0 / 6.0 ) * ( a * ( a * ( - a + 3.0 ) - 3.0 ) + 1.0 );
	}
	float w1( float a ) {
		return ( 1.0 / 6.0 ) * ( a *  a * ( 3.0 * a - 6.0 ) + 4.0 );
	}
	float w2( float a ){
		return ( 1.0 / 6.0 ) * ( a * ( a * ( - 3.0 * a + 3.0 ) + 3.0 ) + 1.0 );
	}
	float w3( float a ) {
		return ( 1.0 / 6.0 ) * ( a * a * a );
	}
	float g0( float a ) {
		return w0( a ) + w1( a );
	}
	float g1( float a ) {
		return w2( a ) + w3( a );
	}
	float h0( float a ) {
		return - 1.0 + w1( a ) / ( w0( a ) + w1( a ) );
	}
	float h1( float a ) {
		return 1.0 + w3( a ) / ( w2( a ) + w3( a ) );
	}
	vec4 bicubic( sampler2D tex, vec2 uv, vec4 texelSize, float lod ) {
		uv = uv * texelSize.zw + 0.5;
		vec2 iuv = floor( uv );
		vec2 fuv = fract( uv );
		float g0x = g0( fuv.x );
		float g1x = g1( fuv.x );
		float h0x = h0( fuv.x );
		float h1x = h1( fuv.x );
		float h0y = h0( fuv.y );
		float h1y = h1( fuv.y );
		vec2 p0 = ( vec2( iuv.x + h0x, iuv.y + h0y ) - 0.5 ) * texelSize.xy;
		vec2 p1 = ( vec2( iuv.x + h1x, iuv.y + h0y ) - 0.5 ) * texelSize.xy;
		vec2 p2 = ( vec2( iuv.x + h0x, iuv.y + h1y ) - 0.5 ) * texelSize.xy;
		vec2 p3 = ( vec2( iuv.x + h1x, iuv.y + h1y ) - 0.5 ) * texelSize.xy;
		return g0( fuv.y ) * ( g0x * textureLod( tex, p0, lod ) + g1x * textureLod( tex, p1, lod ) ) +
			g1( fuv.y ) * ( g0x * textureLod( tex, p2, lod ) + g1x * textureLod( tex, p3, lod ) );
	}
	vec4 textureBicubic( sampler2D sampler, vec2 uv, float lod ) {
		vec2 fLodSize = vec2( textureSize( sampler, int( lod ) ) );
		vec2 cLodSize = vec2( textureSize( sampler, int( lod + 1.0 ) ) );
		vec2 fLodSizeInv = 1.0 / fLodSize;
		vec2 cLodSizeInv = 1.0 / cLodSize;
		vec4 fSample = bicubic( sampler, uv, vec4( fLodSizeInv, fLodSize ), floor( lod ) );
		vec4 cSample = bicubic( sampler, uv, vec4( cLodSizeInv, cLodSize ), ceil( lod ) );
		return mix( fSample, cSample, fract( lod ) );
	}
	vec3 getVolumeTransmissionRay( const in vec3 n, const in vec3 v, const in float thickness, const in float ior, const in mat4 modelMatrix ) {
		vec3 refractionVector = refract( - v, normalize( n ), 1.0 / ior );
		vec3 modelScale;
		modelScale.x = length( vec3( modelMatrix[ 0 ].xyz ) );
		modelScale.y = length( vec3( modelMatrix[ 1 ].xyz ) );
		modelScale.z = length( vec3( modelMatrix[ 2 ].xyz ) );
		return normalize( refractionVector ) * thickness * modelScale;
	}
	float applyIorToRoughness( const in float roughness, const in float ior ) {
		return roughness * clamp( ior * 2.0 - 2.0, 0.0, 1.0 );
	}
	vec4 getTransmissionSample( const in vec2 fragCoord, const in float roughness, const in float ior ) {
		float lod = log2( transmissionSamplerSize.x ) * applyIorToRoughness( roughness, ior );
		return textureBicubic( transmissionSamplerMap, fragCoord.xy, lod );
	}
	vec3 volumeAttenuation( const in float transmissionDistance, const in vec3 attenuationColor, const in float attenuationDistance ) {
		if ( isinf( attenuationDistance ) ) {
			return vec3( 1.0 );
		} else {
			vec3 attenuationCoefficient = -log( attenuationColor ) / attenuationDistance;
			vec3 transmittance = exp( - attenuationCoefficient * transmissionDistance );			return transmittance;
		}
	}
	vec4 getIBLVolumeRefraction( const in vec3 n, const in vec3 v, const in float roughness, const in vec3 diffuseColor,
		const in vec3 specularColor, const in float specularF90, const in vec3 position, const in mat4 modelMatrix,
		const in mat4 viewMatrix, const in mat4 projMatrix, const in float dispersion, const in float ior, const in float thickness,
		const in vec3 attenuationColor, const in float attenuationDistance ) {
		vec4 transmittedLight;
		vec3 transmittance;
		#ifdef USE_DISPERSION
			float halfSpread = ( ior - 1.0 ) * 0.025 * dispersion;
			vec3 iors = vec3( ior - halfSpread, ior, ior + halfSpread );
			for ( int i = 0; i < 3; i ++ ) {
				vec3 transmissionRay = getVolumeTransmissionRay( n, v, thickness, iors[ i ], modelMatrix );
				vec3 refractedRayExit = position + transmissionRay;
				vec4 ndcPos = projMatrix * viewMatrix * vec4( refractedRayExit, 1.0 );
				vec2 refractionCoords = ndcPos.xy / ndcPos.w;
				refractionCoords += 1.0;
				refractionCoords /= 2.0;
				vec4 transmissionSample = getTransmissionSample( refractionCoords, roughness, iors[ i ] );
				transmittedLight[ i ] = transmissionSample[ i ];
				transmittedLight.a += transmissionSample.a;
				transmittance[ i ] = diffuseColor[ i ] * volumeAttenuation( length( transmissionRay ), attenuationColor, attenuationDistance )[ i ];
			}
			transmittedLight.a /= 3.0;
		#else
			vec3 transmissionRay = getVolumeTransmissionRay( n, v, thickness, ior, modelMatrix );
			vec3 refractedRayExit = position + transmissionRay;
			vec4 ndcPos = projMatrix * viewMatrix * vec4( refractedRayExit, 1.0 );
			vec2 refractionCoords = ndcPos.xy / ndcPos.w;
			refractionCoords += 1.0;
			refractionCoords /= 2.0;
			transmittedLight = getTransmissionSample( refractionCoords, roughness, ior );
			transmittance = diffuseColor * volumeAttenuation( length( transmissionRay ), attenuationColor, attenuationDistance );
		#endif
		vec3 attenuatedColor = transmittance * transmittedLight.rgb;
		vec3 F = EnvironmentBRDF( n, v, specularColor, specularF90, roughness );
		float transmittanceFactor = ( transmittance.r + transmittance.g + transmittance.b ) / 3.0;
		return vec4( ( 1.0 - F ) * attenuatedColor, 1.0 - ( 1.0 - transmittedLight.a ) * transmittanceFactor );
	}
#endif`,_N=`#if defined( USE_UV ) || defined( USE_ANISOTROPY )
	varying vec2 vUv;
#endif
#ifdef USE_MAP
	varying vec2 vMapUv;
#endif
#ifdef USE_ALPHAMAP
	varying vec2 vAlphaMapUv;
#endif
#ifdef USE_LIGHTMAP
	varying vec2 vLightMapUv;
#endif
#ifdef USE_AOMAP
	varying vec2 vAoMapUv;
#endif
#ifdef USE_BUMPMAP
	varying vec2 vBumpMapUv;
#endif
#ifdef USE_NORMALMAP
	varying vec2 vNormalMapUv;
#endif
#ifdef USE_EMISSIVEMAP
	varying vec2 vEmissiveMapUv;
#endif
#ifdef USE_METALNESSMAP
	varying vec2 vMetalnessMapUv;
#endif
#ifdef USE_ROUGHNESSMAP
	varying vec2 vRoughnessMapUv;
#endif
#ifdef USE_DIFFUSE_ROUGHNESSMAP
	varying vec2 vDiffuseRoughnessMapUv;
#endif
#ifdef USE_ANISOTROPYMAP
	varying vec2 vAnisotropyMapUv;
#endif
#ifdef USE_CLEARCOATMAP
	varying vec2 vClearcoatMapUv;
#endif
#ifdef USE_CLEARCOAT_NORMALMAP
	varying vec2 vClearcoatNormalMapUv;
#endif
#ifdef USE_CLEARCOAT_ROUGHNESSMAP
	varying vec2 vClearcoatRoughnessMapUv;
#endif
#ifdef USE_IRIDESCENCEMAP
	varying vec2 vIridescenceMapUv;
#endif
#ifdef USE_IRIDESCENCE_THICKNESSMAP
	varying vec2 vIridescenceThicknessMapUv;
#endif
#ifdef USE_SHEEN_COLORMAP
	varying vec2 vSheenColorMapUv;
#endif
#ifdef USE_SHEEN_ROUGHNESSMAP
	varying vec2 vSheenRoughnessMapUv;
#endif
#ifdef USE_SPECULARMAP
	varying vec2 vSpecularMapUv;
#endif
#ifdef USE_SPECULAR_COLORMAP
	varying vec2 vSpecularColorMapUv;
#endif
#ifdef USE_SPECULAR_INTENSITYMAP
	varying vec2 vSpecularIntensityMapUv;
#endif
#ifdef USE_TRANSMISSIONMAP
	uniform mat3 transmissionMapTransform;
	varying vec2 vTransmissionMapUv;
#endif
#ifdef USE_THICKNESSMAP
	uniform mat3 thicknessMapTransform;
	varying vec2 vThicknessMapUv;
#endif`,bN=`#if defined( USE_UV ) || defined( USE_ANISOTROPY )
	varying vec2 vUv;
#endif
#ifdef USE_MAP
	uniform mat3 mapTransform;
	varying vec2 vMapUv;
#endif
#ifdef USE_ALPHAMAP
	uniform mat3 alphaMapTransform;
	varying vec2 vAlphaMapUv;
#endif
#ifdef USE_LIGHTMAP
	uniform mat3 lightMapTransform;
	varying vec2 vLightMapUv;
#endif
#ifdef USE_AOMAP
	uniform mat3 aoMapTransform;
	varying vec2 vAoMapUv;
#endif
#ifdef USE_BUMPMAP
	uniform mat3 bumpMapTransform;
	varying vec2 vBumpMapUv;
#endif
#ifdef USE_NORMALMAP
	uniform mat3 normalMapTransform;
	varying vec2 vNormalMapUv;
#endif
#ifdef USE_DISPLACEMENTMAP
	uniform mat3 displacementMapTransform;
	varying vec2 vDisplacementMapUv;
#endif
#ifdef USE_EMISSIVEMAP
	uniform mat3 emissiveMapTransform;
	varying vec2 vEmissiveMapUv;
#endif
#ifdef USE_METALNESSMAP
	uniform mat3 metalnessMapTransform;
	varying vec2 vMetalnessMapUv;
#endif
#ifdef USE_ROUGHNESSMAP
	uniform mat3 roughnessMapTransform;
	varying vec2 vRoughnessMapUv;
#endif
#ifdef USE_DIFFUSE_ROUGHNESSMAP
	uniform mat3 diffuseRoughnessMapTransform;
	varying vec2 vDiffuseRoughnessMapUv;
#endif
#ifdef USE_ANISOTROPYMAP
	uniform mat3 anisotropyMapTransform;
	varying vec2 vAnisotropyMapUv;
#endif
#ifdef USE_CLEARCOATMAP
	uniform mat3 clearcoatMapTransform;
	varying vec2 vClearcoatMapUv;
#endif
#ifdef USE_CLEARCOAT_NORMALMAP
	uniform mat3 clearcoatNormalMapTransform;
	varying vec2 vClearcoatNormalMapUv;
#endif
#ifdef USE_CLEARCOAT_ROUGHNESSMAP
	uniform mat3 clearcoatRoughnessMapTransform;
	varying vec2 vClearcoatRoughnessMapUv;
#endif
#ifdef USE_SHEEN_COLORMAP
	uniform mat3 sheenColorMapTransform;
	varying vec2 vSheenColorMapUv;
#endif
#ifdef USE_SHEEN_ROUGHNESSMAP
	uniform mat3 sheenRoughnessMapTransform;
	varying vec2 vSheenRoughnessMapUv;
#endif
#ifdef USE_IRIDESCENCEMAP
	uniform mat3 iridescenceMapTransform;
	varying vec2 vIridescenceMapUv;
#endif
#ifdef USE_IRIDESCENCE_THICKNESSMAP
	uniform mat3 iridescenceThicknessMapTransform;
	varying vec2 vIridescenceThicknessMapUv;
#endif
#ifdef USE_SPECULARMAP
	uniform mat3 specularMapTransform;
	varying vec2 vSpecularMapUv;
#endif
#ifdef USE_SPECULAR_COLORMAP
	uniform mat3 specularColorMapTransform;
	varying vec2 vSpecularColorMapUv;
#endif
#ifdef USE_SPECULAR_INTENSITYMAP
	uniform mat3 specularIntensityMapTransform;
	varying vec2 vSpecularIntensityMapUv;
#endif
#ifdef USE_TRANSMISSIONMAP
	uniform mat3 transmissionMapTransform;
	varying vec2 vTransmissionMapUv;
#endif
#ifdef USE_THICKNESSMAP
	uniform mat3 thicknessMapTransform;
	varying vec2 vThicknessMapUv;
#endif`,SN=`#if defined( USE_UV ) || defined( USE_ANISOTROPY )
	vUv = vec3( uv, 1 ).xy;
#endif
#ifdef USE_MAP
	vMapUv = ( mapTransform * vec3( MAP_UV, 1 ) ).xy;
#endif
#ifdef USE_ALPHAMAP
	vAlphaMapUv = ( alphaMapTransform * vec3( ALPHAMAP_UV, 1 ) ).xy;
#endif
#ifdef USE_LIGHTMAP
	vLightMapUv = ( lightMapTransform * vec3( LIGHTMAP_UV, 1 ) ).xy;
#endif
#ifdef USE_AOMAP
	vAoMapUv = ( aoMapTransform * vec3( AOMAP_UV, 1 ) ).xy;
#endif
#ifdef USE_BUMPMAP
	vBumpMapUv = ( bumpMapTransform * vec3( BUMPMAP_UV, 1 ) ).xy;
#endif
#ifdef USE_NORMALMAP
	vNormalMapUv = ( normalMapTransform * vec3( NORMALMAP_UV, 1 ) ).xy;
#endif
#ifdef USE_DISPLACEMENTMAP
	vDisplacementMapUv = ( displacementMapTransform * vec3( DISPLACEMENTMAP_UV, 1 ) ).xy;
#endif
#ifdef USE_EMISSIVEMAP
	vEmissiveMapUv = ( emissiveMapTransform * vec3( EMISSIVEMAP_UV, 1 ) ).xy;
#endif
#ifdef USE_METALNESSMAP
	vMetalnessMapUv = ( metalnessMapTransform * vec3( METALNESSMAP_UV, 1 ) ).xy;
#endif
#ifdef USE_ROUGHNESSMAP
	vRoughnessMapUv = ( roughnessMapTransform * vec3( ROUGHNESSMAP_UV, 1 ) ).xy;
#endif
#ifdef USE_DIFFUSE_ROUGHNESSMAP
	vDiffuseRoughnessMapUv = ( diffuseRoughnessMapTransform * vec3( DIFFUSE_ROUGHNESSMAP_UV, 1 ) ).xy;
#endif
#ifdef USE_ANISOTROPYMAP
	vAnisotropyMapUv = ( anisotropyMapTransform * vec3( ANISOTROPYMAP_UV, 1 ) ).xy;
#endif
#ifdef USE_CLEARCOATMAP
	vClearcoatMapUv = ( clearcoatMapTransform * vec3( CLEARCOATMAP_UV, 1 ) ).xy;
#endif
#ifdef USE_CLEARCOAT_NORMALMAP
	vClearcoatNormalMapUv = ( clearcoatNormalMapTransform * vec3( CLEARCOAT_NORMALMAP_UV, 1 ) ).xy;
#endif
#ifdef USE_CLEARCOAT_ROUGHNESSMAP
	vClearcoatRoughnessMapUv = ( clearcoatRoughnessMapTransform * vec3( CLEARCOAT_ROUGHNESSMAP_UV, 1 ) ).xy;
#endif
#ifdef USE_IRIDESCENCEMAP
	vIridescenceMapUv = ( iridescenceMapTransform * vec3( IRIDESCENCEMAP_UV, 1 ) ).xy;
#endif
#ifdef USE_IRIDESCENCE_THICKNESSMAP
	vIridescenceThicknessMapUv = ( iridescenceThicknessMapTransform * vec3( IRIDESCENCE_THICKNESSMAP_UV, 1 ) ).xy;
#endif
#ifdef USE_SHEEN_COLORMAP
	vSheenColorMapUv = ( sheenColorMapTransform * vec3( SHEEN_COLORMAP_UV, 1 ) ).xy;
#endif
#ifdef USE_SHEEN_ROUGHNESSMAP
	vSheenRoughnessMapUv = ( sheenRoughnessMapTransform * vec3( SHEEN_ROUGHNESSMAP_UV, 1 ) ).xy;
#endif
#ifdef USE_SPECULARMAP
	vSpecularMapUv = ( specularMapTransform * vec3( SPECULARMAP_UV, 1 ) ).xy;
#endif
#ifdef USE_SPECULAR_COLORMAP
	vSpecularColorMapUv = ( specularColorMapTransform * vec3( SPECULAR_COLORMAP_UV, 1 ) ).xy;
#endif
#ifdef USE_SPECULAR_INTENSITYMAP
	vSpecularIntensityMapUv = ( specularIntensityMapTransform * vec3( SPECULAR_INTENSITYMAP_UV, 1 ) ).xy;
#endif
#ifdef USE_TRANSMISSIONMAP
	vTransmissionMapUv = ( transmissionMapTransform * vec3( TRANSMISSIONMAP_UV, 1 ) ).xy;
#endif
#ifdef USE_THICKNESSMAP
	vThicknessMapUv = ( thicknessMapTransform * vec3( THICKNESSMAP_UV, 1 ) ).xy;
#endif`,MN=`#if defined( USE_ENVMAP ) || defined( DISTANCE ) || defined ( USE_SHADOWMAP ) || defined ( USE_TRANSMISSION ) || NUM_SPOT_LIGHT_COORDS > 0
	vec4 worldPosition = vec4( transformed, 1.0 );
	#ifdef USE_BATCHING
		worldPosition = batchingMatrix * worldPosition;
	#endif
	#ifdef USE_INSTANCING
		worldPosition = instanceMatrix * worldPosition;
	#endif
	worldPosition = modelMatrix * worldPosition;
#endif`,EN=`varying vec2 vUv;
uniform mat3 uvTransform;
void main() {
	vUv = ( uvTransform * vec3( uv, 1 ) ).xy;
	gl_Position = vec4( position.xy, 1.0, 1.0 );
}`,TN=`uniform sampler2D t2D;
uniform float backgroundIntensity;
varying vec2 vUv;
void main() {
	vec4 texColor = texture2D( t2D, vUv );
	#ifdef DECODE_VIDEO_TEXTURE
		texColor = vec4( mix( pow( texColor.rgb * 0.9478672986 + vec3( 0.0521327014 ), vec3( 2.4 ) ), texColor.rgb * 0.0773993808, vec3( lessThanEqual( texColor.rgb, vec3( 0.04045 ) ) ) ), texColor.w );
	#endif
	texColor.rgb *= backgroundIntensity;
	gl_FragColor = texColor;
	#include <tonemapping_fragment>
	#include <colorspace_fragment>
}`,wN=`varying vec3 vWorldDirection;
#include <common>
void main() {
	vWorldDirection = transformDirection( position, modelMatrix );
	#include <begin_vertex>
	#include <project_vertex>
	gl_Position.z = gl_Position.w;
}`,AN=`uniform float backgroundBlurriness;
uniform float backgroundIntensity;
uniform mat3 backgroundRotation;
varying vec3 vWorldDirection;
#include <envmap_common_pars_fragment>
void main() {
	#ifdef ENVMAP_TYPE_PMREM
		vec4 texColor = textureLod( envMap, backgroundRotation * vWorldDirection, roughnessToMip( backgroundBlurriness ) );
	#else
		vec4 texColor = textureCube( envMap, backgroundRotation * vWorldDirection );
	#endif
	texColor.rgb *= backgroundIntensity;
	gl_FragColor = texColor;
	#include <tonemapping_fragment>
	#include <colorspace_fragment>
}`,RN=`varying vec3 vWorldDirection;
#include <common>
void main() {
	vWorldDirection = transformDirection( position, modelMatrix );
	#include <begin_vertex>
	#include <project_vertex>
	gl_Position.z = gl_Position.w;
}`,CN=`uniform samplerCube tCube;
uniform float tFlip;
uniform float opacity;
varying vec3 vWorldDirection;
void main() {
	vec4 texColor = textureCube( tCube, vec3( tFlip * vWorldDirection.x, vWorldDirection.yz ) );
	gl_FragColor = texColor;
	gl_FragColor.a *= opacity;
	#include <tonemapping_fragment>
	#include <colorspace_fragment>
}`,DN=`#include <common>
#include <batching_pars_vertex>
#include <uv_pars_vertex>
#include <displacementmap_pars_vertex>
#include <morphtarget_pars_vertex>
#include <skinning_pars_vertex>
#include <logdepthbuf_pars_vertex>
#include <clipping_planes_pars_vertex>
varying vec2 vHighPrecisionZW;
void main() {
	#include <uv_vertex>
	#include <batching_vertex>
	#include <skinbase_vertex>
	#include <morphinstance_vertex>
	#ifdef USE_DISPLACEMENTMAP
		#include <beginnormal_vertex>
		#include <morphnormal_vertex>
		#include <skinnormal_vertex>
	#endif
	#include <begin_vertex>
	#include <morphtarget_vertex>
	#include <skinning_vertex>
	#include <displacementmap_vertex>
	#include <project_vertex>
	#include <logdepthbuf_vertex>
	#include <clipping_planes_vertex>
	vHighPrecisionZW = gl_Position.zw;
}`,NN=`#if DEPTH_PACKING == 3200
	uniform float opacity;
#endif
#include <common>
#include <packing>
#include <uv_pars_fragment>
#include <map_pars_fragment>
#include <alphamap_pars_fragment>
#include <alphatest_pars_fragment>
#include <alphahash_pars_fragment>
#include <logdepthbuf_pars_fragment>
#include <clipping_planes_pars_fragment>
varying vec2 vHighPrecisionZW;
void main() {
	vec4 diffuseColor = vec4( 1.0 );
	#include <clipping_planes_fragment>
	#if DEPTH_PACKING == 3200
		diffuseColor.a = opacity;
	#endif
	#include <map_fragment>
	#include <alphamap_fragment>
	#include <alphatest_fragment>
	#include <alphahash_fragment>
	#include <logdepthbuf_fragment>
	#ifdef USE_REVERSED_DEPTH_BUFFER
		float fragCoordZ = vHighPrecisionZW[ 0 ] / vHighPrecisionZW[ 1 ];
	#else
		float fragCoordZ = 0.5 * vHighPrecisionZW[ 0 ] / vHighPrecisionZW[ 1 ] + 0.5;
	#endif
	#if DEPTH_PACKING == 3200
		gl_FragColor = vec4( vec3( 1.0 - fragCoordZ ), opacity );
	#elif DEPTH_PACKING == 3201
		gl_FragColor = packDepthToRGBA( fragCoordZ );
	#elif DEPTH_PACKING == 3202
		gl_FragColor = vec4( packDepthToRGB( fragCoordZ ), 1.0 );
	#elif DEPTH_PACKING == 3203
		gl_FragColor = vec4( packDepthToRG( fragCoordZ ), 0.0, 1.0 );
	#endif
}`,LN=`#define DISTANCE
varying vec3 vWorldPosition;
#include <common>
#include <batching_pars_vertex>
#include <uv_pars_vertex>
#include <displacementmap_pars_vertex>
#include <morphtarget_pars_vertex>
#include <skinning_pars_vertex>
#include <clipping_planes_pars_vertex>
void main() {
	#include <uv_vertex>
	#include <batching_vertex>
	#include <skinbase_vertex>
	#include <morphinstance_vertex>
	#ifdef USE_DISPLACEMENTMAP
		#include <beginnormal_vertex>
		#include <morphnormal_vertex>
		#include <skinnormal_vertex>
	#endif
	#include <begin_vertex>
	#include <morphtarget_vertex>
	#include <skinning_vertex>
	#include <displacementmap_vertex>
	#include <project_vertex>
	#include <worldpos_vertex>
	#include <clipping_planes_vertex>
	vWorldPosition = worldPosition.xyz;
}`,UN=`#define DISTANCE
uniform vec3 referencePosition;
uniform float nearDistance;
uniform float farDistance;
varying vec3 vWorldPosition;
#include <common>
#include <uv_pars_fragment>
#include <map_pars_fragment>
#include <alphamap_pars_fragment>
#include <alphatest_pars_fragment>
#include <alphahash_pars_fragment>
#include <clipping_planes_pars_fragment>
void main() {
	vec4 diffuseColor = vec4( 1.0 );
	#include <clipping_planes_fragment>
	#include <map_fragment>
	#include <alphamap_fragment>
	#include <alphatest_fragment>
	#include <alphahash_fragment>
	float dist = length( vWorldPosition - referencePosition );
	dist = ( dist - nearDistance ) / ( farDistance - nearDistance );
	dist = saturate( dist );
	gl_FragColor = vec4( dist, 0.0, 0.0, 1.0 );
}`,IN=`varying vec3 vWorldDirection;
#include <common>
void main() {
	vWorldDirection = transformDirection( position, modelMatrix );
	#include <begin_vertex>
	#include <project_vertex>
}`,ON=`uniform sampler2D tEquirect;
varying vec3 vWorldDirection;
#include <common>
void main() {
	vec3 direction = normalize( vWorldDirection );
	vec2 sampleUV = equirectUv( direction );
	gl_FragColor = texture2D( tEquirect, sampleUV );
	#include <tonemapping_fragment>
	#include <colorspace_fragment>
}`,PN=`uniform float scale;
attribute float lineDistance;
varying float vLineDistance;
#include <common>
#include <uv_pars_vertex>
#include <color_pars_vertex>
#include <fog_pars_vertex>
#include <morphtarget_pars_vertex>
#include <logdepthbuf_pars_vertex>
#include <clipping_planes_pars_vertex>
void main() {
	vLineDistance = scale * lineDistance;
	#include <uv_vertex>
	#include <color_vertex>
	#include <morphinstance_vertex>
	#include <morphcolor_vertex>
	#include <begin_vertex>
	#include <morphtarget_vertex>
	#include <project_vertex>
	#include <logdepthbuf_vertex>
	#include <clipping_planes_vertex>
	#include <fog_vertex>
}`,zN=`uniform vec3 diffuse;
uniform float opacity;
uniform float dashSize;
uniform float totalSize;
varying float vLineDistance;
#include <common>
#include <color_pars_fragment>
#include <uv_pars_fragment>
#include <map_pars_fragment>
#include <fog_pars_fragment>
#include <logdepthbuf_pars_fragment>
#include <clipping_planes_pars_fragment>
void main() {
	vec4 diffuseColor = vec4( diffuse, opacity );
	#include <clipping_planes_fragment>
	if ( mod( vLineDistance, totalSize ) > dashSize ) {
		discard;
	}
	vec3 outgoingLight = vec3( 0.0 );
	#include <logdepthbuf_fragment>
	#include <map_fragment>
	#include <color_fragment>
	outgoingLight = diffuseColor.rgb;
	#include <opaque_fragment>
	#include <tonemapping_fragment>
	#include <colorspace_fragment>
	#include <fog_fragment>
	#include <premultiplied_alpha_fragment>
}`,FN=`#include <common>
#include <batching_pars_vertex>
#include <uv_pars_vertex>
#include <envmap_pars_vertex>
#include <color_pars_vertex>
#include <fog_pars_vertex>
#include <morphtarget_pars_vertex>
#include <skinning_pars_vertex>
#include <logdepthbuf_pars_vertex>
#include <clipping_planes_pars_vertex>
void main() {
	#include <uv_vertex>
	#include <color_vertex>
	#include <morphinstance_vertex>
	#include <morphcolor_vertex>
	#include <batching_vertex>
	#if defined ( USE_ENVMAP ) || defined ( USE_SKINNING )
		#include <beginnormal_vertex>
		#include <morphnormal_vertex>
		#include <skinbase_vertex>
		#include <skinnormal_vertex>
		#include <defaultnormal_vertex>
	#endif
	#include <begin_vertex>
	#include <morphtarget_vertex>
	#include <skinning_vertex>
	#include <project_vertex>
	#include <logdepthbuf_vertex>
	#include <clipping_planes_vertex>
	#include <worldpos_vertex>
	#include <envmap_vertex>
	#include <fog_vertex>
}`,BN=`uniform vec3 diffuse;
uniform float opacity;
#ifndef FLAT_SHADED
	varying vec3 vNormal;
#endif
#include <common>
#include <dithering_pars_fragment>
#include <color_pars_fragment>
#include <uv_pars_fragment>
#include <map_pars_fragment>
#include <alphamap_pars_fragment>
#include <alphatest_pars_fragment>
#include <alphahash_pars_fragment>
#include <aomap_pars_fragment>
#include <lightmap_pars_fragment>
#include <envmap_common_pars_fragment>
#include <envmap_pars_fragment>
#include <fog_pars_fragment>
#include <specularmap_pars_fragment>
#include <logdepthbuf_pars_fragment>
#include <clipping_planes_pars_fragment>
void main() {
	vec4 diffuseColor = vec4( diffuse, opacity );
	#include <clipping_planes_fragment>
	#include <logdepthbuf_fragment>
	#include <map_fragment>
	#include <color_fragment>
	#include <alphamap_fragment>
	#include <alphatest_fragment>
	#include <alphahash_fragment>
	#include <specularmap_fragment>
	ReflectedLight reflectedLight = ReflectedLight( vec3( 0.0 ), vec3( 0.0 ), vec3( 0.0 ), vec3( 0.0 ) );
	#ifdef USE_LIGHTMAP
		vec4 lightMapTexel = texture2D( lightMap, vLightMapUv );
		reflectedLight.indirectDiffuse += lightMapTexel.rgb * lightMapIntensity * RECIPROCAL_PI;
	#else
		reflectedLight.indirectDiffuse += vec3( 1.0 );
	#endif
	#include <aomap_fragment>
	reflectedLight.indirectDiffuse *= diffuseColor.rgb;
	vec3 outgoingLight = reflectedLight.indirectDiffuse;
	#include <envmap_fragment>
	#include <opaque_fragment>
	#include <tonemapping_fragment>
	#include <colorspace_fragment>
	#include <fog_fragment>
	#include <premultiplied_alpha_fragment>
	#include <dithering_fragment>
}`,HN=`#define LAMBERT
varying vec3 vViewPosition;
#include <common>
#include <batching_pars_vertex>
#include <uv_pars_vertex>
#include <displacementmap_pars_vertex>
#include <envmap_pars_vertex>
#include <color_pars_vertex>
#include <fog_pars_vertex>
#include <normal_pars_vertex>
#include <morphtarget_pars_vertex>
#include <skinning_pars_vertex>
#include <shadowmap_pars_vertex>
#include <logdepthbuf_pars_vertex>
#include <clipping_planes_pars_vertex>
void main() {
	#include <uv_vertex>
	#include <color_vertex>
	#include <morphinstance_vertex>
	#include <morphcolor_vertex>
	#include <batching_vertex>
	#include <beginnormal_vertex>
	#include <morphnormal_vertex>
	#include <skinbase_vertex>
	#include <skinnormal_vertex>
	#include <defaultnormal_vertex>
	#include <normal_vertex>
	#include <begin_vertex>
	#include <morphtarget_vertex>
	#include <skinning_vertex>
	#include <displacementmap_vertex>
	#include <project_vertex>
	#include <logdepthbuf_vertex>
	#include <clipping_planes_vertex>
	vViewPosition = - mvPosition.xyz;
	#include <worldpos_vertex>
	#include <envmap_vertex>
	#include <shadowmap_vertex>
	#include <fog_vertex>
}`,GN=`#define LAMBERT
uniform vec3 diffuse;
uniform vec3 emissive;
uniform float opacity;
#include <common>
#include <dithering_pars_fragment>
#include <color_pars_fragment>
#include <uv_pars_fragment>
#include <map_pars_fragment>
#include <alphamap_pars_fragment>
#include <alphatest_pars_fragment>
#include <alphahash_pars_fragment>
#include <aomap_pars_fragment>
#include <lightmap_pars_fragment>
#include <emissivemap_pars_fragment>
#include <envmap_common_pars_fragment>
#include <envmap_pars_fragment>
#include <envmap_physical_pars_fragment>
#include <fog_pars_fragment>
#include <bsdfs>
#include <lights_pars_begin>
#include <normal_pars_fragment>
#include <lights_lambert_pars_fragment>
#include <shadowmap_pars_fragment>
#include <bumpmap_pars_fragment>
#include <normalmap_pars_fragment>
#include <specularmap_pars_fragment>
#include <logdepthbuf_pars_fragment>
#include <clipping_planes_pars_fragment>
void main() {
	vec4 diffuseColor = vec4( diffuse, opacity );
	#include <clipping_planes_fragment>
	ReflectedLight reflectedLight = ReflectedLight( vec3( 0.0 ), vec3( 0.0 ), vec3( 0.0 ), vec3( 0.0 ) );
	vec3 totalEmissiveRadiance = emissive;
	#include <logdepthbuf_fragment>
	#include <map_fragment>
	#include <color_fragment>
	#include <alphamap_fragment>
	#include <alphatest_fragment>
	#include <alphahash_fragment>
	#include <specularmap_fragment>
	#include <normal_fragment_begin>
	#include <normal_fragment_maps>
	#include <emissivemap_fragment>
	#include <lights_lambert_fragment>
	#include <lights_fragment_begin>
	#include <lights_fragment_maps>
	#include <lights_fragment_end>
	#include <aomap_fragment>
	vec3 outgoingLight = reflectedLight.directDiffuse + reflectedLight.indirectDiffuse + totalEmissiveRadiance;
	#include <envmap_fragment>
	#include <opaque_fragment>
	#include <tonemapping_fragment>
	#include <colorspace_fragment>
	#include <fog_fragment>
	#include <premultiplied_alpha_fragment>
	#include <dithering_fragment>
}`,VN=`#define MATCAP
varying vec3 vViewPosition;
#include <common>
#include <batching_pars_vertex>
#include <uv_pars_vertex>
#include <color_pars_vertex>
#include <displacementmap_pars_vertex>
#include <fog_pars_vertex>
#include <normal_pars_vertex>
#include <morphtarget_pars_vertex>
#include <skinning_pars_vertex>
#include <logdepthbuf_pars_vertex>
#include <clipping_planes_pars_vertex>
void main() {
	#include <uv_vertex>
	#include <color_vertex>
	#include <morphinstance_vertex>
	#include <morphcolor_vertex>
	#include <batching_vertex>
	#include <beginnormal_vertex>
	#include <morphnormal_vertex>
	#include <skinbase_vertex>
	#include <skinnormal_vertex>
	#include <defaultnormal_vertex>
	#include <normal_vertex>
	#include <begin_vertex>
	#include <morphtarget_vertex>
	#include <skinning_vertex>
	#include <displacementmap_vertex>
	#include <project_vertex>
	#include <logdepthbuf_vertex>
	#include <clipping_planes_vertex>
	#include <fog_vertex>
	vViewPosition = - mvPosition.xyz;
}`,kN=`#define MATCAP
uniform vec3 diffuse;
uniform float opacity;
uniform sampler2D matcap;
varying vec3 vViewPosition;
#include <common>
#include <dithering_pars_fragment>
#include <color_pars_fragment>
#include <uv_pars_fragment>
#include <map_pars_fragment>
#include <alphamap_pars_fragment>
#include <alphatest_pars_fragment>
#include <alphahash_pars_fragment>
#include <fog_pars_fragment>
#include <normal_pars_fragment>
#include <bumpmap_pars_fragment>
#include <normalmap_pars_fragment>
#include <logdepthbuf_pars_fragment>
#include <clipping_planes_pars_fragment>
void main() {
	vec4 diffuseColor = vec4( diffuse, opacity );
	#include <clipping_planes_fragment>
	#include <logdepthbuf_fragment>
	#include <map_fragment>
	#include <color_fragment>
	#include <alphamap_fragment>
	#include <alphatest_fragment>
	#include <alphahash_fragment>
	#include <normal_fragment_begin>
	#include <normal_fragment_maps>
	vec3 viewDir = normalize( vViewPosition );
	vec3 x = normalize( vec3( viewDir.z, 0.0, - viewDir.x ) );
	vec3 y = cross( viewDir, x );
	vec2 uv = vec2( dot( x, normal ), dot( y, normal ) ) * 0.495 + 0.5;
	#ifdef USE_MATCAP
		vec4 matcapColor = texture2D( matcap, uv );
	#else
		vec4 matcapColor = vec4( vec3( mix( 0.2, 0.8, uv.y ) ), 1.0 );
	#endif
	vec3 outgoingLight = diffuseColor.rgb * matcapColor.rgb;
	#include <opaque_fragment>
	#include <tonemapping_fragment>
	#include <colorspace_fragment>
	#include <fog_fragment>
	#include <premultiplied_alpha_fragment>
	#include <dithering_fragment>
}`,XN=`#define NORMAL
#if defined( FLAT_SHADED ) || defined( USE_BUMPMAP ) || defined( USE_NORMALMAP_TANGENTSPACE )
	varying vec3 vViewPosition;
#endif
#include <common>
#include <batching_pars_vertex>
#include <uv_pars_vertex>
#include <displacementmap_pars_vertex>
#include <normal_pars_vertex>
#include <morphtarget_pars_vertex>
#include <skinning_pars_vertex>
#include <logdepthbuf_pars_vertex>
#include <clipping_planes_pars_vertex>
void main() {
	#include <uv_vertex>
	#include <batching_vertex>
	#include <beginnormal_vertex>
	#include <morphinstance_vertex>
	#include <morphnormal_vertex>
	#include <skinbase_vertex>
	#include <skinnormal_vertex>
	#include <defaultnormal_vertex>
	#include <normal_vertex>
	#include <begin_vertex>
	#include <morphtarget_vertex>
	#include <skinning_vertex>
	#include <displacementmap_vertex>
	#include <project_vertex>
	#include <logdepthbuf_vertex>
	#include <clipping_planes_vertex>
#if defined( FLAT_SHADED ) || defined( USE_BUMPMAP ) || defined( USE_NORMALMAP_TANGENTSPACE )
	vViewPosition = - mvPosition.xyz;
#endif
}`,WN=`#define NORMAL
uniform float opacity;
#if defined( FLAT_SHADED ) || defined( USE_BUMPMAP ) || defined( USE_NORMALMAP_TANGENTSPACE )
	varying vec3 vViewPosition;
#endif
#include <uv_pars_fragment>
#include <normal_pars_fragment>
#include <bumpmap_pars_fragment>
#include <normalmap_pars_fragment>
#include <logdepthbuf_pars_fragment>
#include <clipping_planes_pars_fragment>
void main() {
	vec4 diffuseColor = vec4( 0.0, 0.0, 0.0, opacity );
	#include <clipping_planes_fragment>
	#include <logdepthbuf_fragment>
	#include <normal_fragment_begin>
	#include <normal_fragment_maps>
	gl_FragColor = vec4( normalize( normal ) * 0.5 + 0.5, diffuseColor.a );
	#ifdef OPAQUE
		gl_FragColor.a = 1.0;
	#endif
}`,qN=`#define PHONG
varying vec3 vViewPosition;
#include <common>
#include <batching_pars_vertex>
#include <uv_pars_vertex>
#include <displacementmap_pars_vertex>
#include <envmap_pars_vertex>
#include <color_pars_vertex>
#include <fog_pars_vertex>
#include <normal_pars_vertex>
#include <morphtarget_pars_vertex>
#include <skinning_pars_vertex>
#include <shadowmap_pars_vertex>
#include <logdepthbuf_pars_vertex>
#include <clipping_planes_pars_vertex>
void main() {
	#include <uv_vertex>
	#include <color_vertex>
	#include <morphcolor_vertex>
	#include <batching_vertex>
	#include <beginnormal_vertex>
	#include <morphinstance_vertex>
	#include <morphnormal_vertex>
	#include <skinbase_vertex>
	#include <skinnormal_vertex>
	#include <defaultnormal_vertex>
	#include <normal_vertex>
	#include <begin_vertex>
	#include <morphtarget_vertex>
	#include <skinning_vertex>
	#include <displacementmap_vertex>
	#include <project_vertex>
	#include <logdepthbuf_vertex>
	#include <clipping_planes_vertex>
	vViewPosition = - mvPosition.xyz;
	#include <worldpos_vertex>
	#include <envmap_vertex>
	#include <shadowmap_vertex>
	#include <fog_vertex>
}`,YN=`#define PHONG
uniform vec3 diffuse;
uniform vec3 emissive;
uniform vec3 specular;
uniform float shininess;
uniform float opacity;
#include <common>
#include <dithering_pars_fragment>
#include <color_pars_fragment>
#include <uv_pars_fragment>
#include <map_pars_fragment>
#include <alphamap_pars_fragment>
#include <alphatest_pars_fragment>
#include <alphahash_pars_fragment>
#include <aomap_pars_fragment>
#include <lightmap_pars_fragment>
#include <emissivemap_pars_fragment>
#include <envmap_common_pars_fragment>
#include <envmap_pars_fragment>
#include <envmap_physical_pars_fragment>
#include <fog_pars_fragment>
#include <bsdfs>
#include <lights_pars_begin>
#include <normal_pars_fragment>
#include <lights_phong_pars_fragment>
#include <shadowmap_pars_fragment>
#include <bumpmap_pars_fragment>
#include <normalmap_pars_fragment>
#include <specularmap_pars_fragment>
#include <logdepthbuf_pars_fragment>
#include <clipping_planes_pars_fragment>
void main() {
	vec4 diffuseColor = vec4( diffuse, opacity );
	#include <clipping_planes_fragment>
	ReflectedLight reflectedLight = ReflectedLight( vec3( 0.0 ), vec3( 0.0 ), vec3( 0.0 ), vec3( 0.0 ) );
	vec3 totalEmissiveRadiance = emissive;
	#include <logdepthbuf_fragment>
	#include <map_fragment>
	#include <color_fragment>
	#include <alphamap_fragment>
	#include <alphatest_fragment>
	#include <alphahash_fragment>
	#include <specularmap_fragment>
	#include <normal_fragment_begin>
	#include <normal_fragment_maps>
	#include <emissivemap_fragment>
	#include <lights_phong_fragment>
	#include <lights_fragment_begin>
	#include <lights_fragment_maps>
	#include <lights_fragment_end>
	#include <aomap_fragment>
	vec3 outgoingLight = reflectedLight.directDiffuse + reflectedLight.indirectDiffuse + reflectedLight.directSpecular + reflectedLight.indirectSpecular + totalEmissiveRadiance;
	#include <envmap_fragment>
	#include <opaque_fragment>
	#include <tonemapping_fragment>
	#include <colorspace_fragment>
	#include <fog_fragment>
	#include <premultiplied_alpha_fragment>
	#include <dithering_fragment>
}`,ZN=`#define STANDARD
varying vec3 vViewPosition;
#ifdef USE_TRANSMISSION
	varying vec3 vWorldPosition;
#endif
#include <common>
#include <batching_pars_vertex>
#include <uv_pars_vertex>
#include <displacementmap_pars_vertex>
#include <color_pars_vertex>
#include <fog_pars_vertex>
#include <normal_pars_vertex>
#include <morphtarget_pars_vertex>
#include <skinning_pars_vertex>
#include <shadowmap_pars_vertex>
#include <logdepthbuf_pars_vertex>
#include <clipping_planes_pars_vertex>
void main() {
	#include <uv_vertex>
	#include <color_vertex>
	#include <morphinstance_vertex>
	#include <morphcolor_vertex>
	#include <batching_vertex>
	#include <beginnormal_vertex>
	#include <morphnormal_vertex>
	#include <skinbase_vertex>
	#include <skinnormal_vertex>
	#include <defaultnormal_vertex>
	#include <normal_vertex>
	#include <begin_vertex>
	#include <morphtarget_vertex>
	#include <skinning_vertex>
	#include <displacementmap_vertex>
	#include <project_vertex>
	#include <logdepthbuf_vertex>
	#include <clipping_planes_vertex>
	vViewPosition = - mvPosition.xyz;
	#include <worldpos_vertex>
	#include <shadowmap_vertex>
	#include <fog_vertex>
#ifdef USE_TRANSMISSION
	vWorldPosition = worldPosition.xyz;
#endif
}`,JN=`#define STANDARD
#ifdef PHYSICAL
	#define IOR
	#define USE_SPECULAR
#endif
uniform vec3 diffuse;
uniform vec3 emissive;
uniform float roughness;
uniform float metalness;
uniform float opacity;
#ifdef IOR
	uniform float ior;
#endif
#ifdef USE_SPECULAR
	uniform float specularIntensity;
	uniform vec3 specularColor;
	#ifdef USE_SPECULAR_COLORMAP
		uniform sampler2D specularColorMap;
	#endif
	#ifdef USE_SPECULAR_INTENSITYMAP
		uniform sampler2D specularIntensityMap;
	#endif
#endif
#ifdef USE_CLEARCOAT
	uniform float clearcoat;
	uniform float clearcoatRoughness;
#endif
#ifdef USE_DIFFUSE_ROUGHNESS
	uniform float diffuseRoughness;
	#ifdef USE_DIFFUSE_ROUGHNESSMAP
		uniform sampler2D diffuseRoughnessMap;
	#endif
#endif
#ifdef USE_DISPERSION
	uniform float dispersion;
#endif
#ifdef USE_RETROREFLECTION
	uniform float retroreflectivity;
#endif
#ifdef USE_IRIDESCENCE
	uniform float iridescence;
	uniform float iridescenceIOR;
	uniform float iridescenceThicknessMinimum;
	uniform float iridescenceThicknessMaximum;
#endif
#ifdef USE_SHEEN
	uniform vec3 sheenColor;
	uniform float sheenRoughness;
	#ifdef USE_SHEEN_COLORMAP
		uniform sampler2D sheenColorMap;
	#endif
	#ifdef USE_SHEEN_ROUGHNESSMAP
		uniform sampler2D sheenRoughnessMap;
	#endif
#endif
#ifdef USE_ANISOTROPY
	uniform vec2 anisotropyVector;
	#ifdef USE_ANISOTROPYMAP
		uniform sampler2D anisotropyMap;
	#endif
#endif
varying vec3 vViewPosition;
#include <common>
#include <dithering_pars_fragment>
#include <color_pars_fragment>
#include <uv_pars_fragment>
#include <map_pars_fragment>
#include <alphamap_pars_fragment>
#include <alphatest_pars_fragment>
#include <alphahash_pars_fragment>
#include <aomap_pars_fragment>
#include <lightmap_pars_fragment>
#include <emissivemap_pars_fragment>
#include <iridescence_fragment>
#include <envmap_common_pars_fragment>
#include <envmap_physical_pars_fragment>
#include <fog_pars_fragment>
#include <lights_pars_begin>
#include <normal_pars_fragment>
#include <lights_physical_pars_fragment>
#include <transmission_pars_fragment>
#include <shadowmap_pars_fragment>
#include <bumpmap_pars_fragment>
#include <normalmap_pars_fragment>
#include <clearcoat_pars_fragment>
#include <iridescence_pars_fragment>
#include <roughnessmap_pars_fragment>
#include <metalnessmap_pars_fragment>
#include <logdepthbuf_pars_fragment>
#include <clipping_planes_pars_fragment>
void main() {
	vec4 diffuseColor = vec4( diffuse, opacity );
	#include <clipping_planes_fragment>
	ReflectedLight reflectedLight = ReflectedLight( vec3( 0.0 ), vec3( 0.0 ), vec3( 0.0 ), vec3( 0.0 ) );
	vec3 totalEmissiveRadiance = emissive;
	#include <logdepthbuf_fragment>
	#include <map_fragment>
	#include <color_fragment>
	#include <alphamap_fragment>
	#include <alphatest_fragment>
	#include <alphahash_fragment>
	#include <roughnessmap_fragment>
	#include <metalnessmap_fragment>
	#include <normal_fragment_begin>
	#include <normal_fragment_maps>
	#include <clearcoat_normal_fragment_begin>
	#include <clearcoat_normal_fragment_maps>
	#include <emissivemap_fragment>
	#include <lights_physical_fragment>
	#include <lights_fragment_begin>
	#include <lights_fragment_maps>
	#include <lights_fragment_end>
	#include <aomap_fragment>
	vec3 totalDiffuse = reflectedLight.directDiffuse + reflectedLight.indirectDiffuse;
	vec3 totalSpecular = reflectedLight.directSpecular + reflectedLight.indirectSpecular;
	#include <transmission_fragment>
	vec3 outgoingLight = totalDiffuse + totalSpecular + totalEmissiveRadiance;
	#ifdef USE_SHEEN
 
		outgoingLight = outgoingLight + sheenSpecularDirect + sheenSpecularIndirect;
 
 	#endif
	#ifdef USE_CLEARCOAT
		float dotNVcc = saturate( dot( geometryClearcoatNormal, geometryViewDir ) );
		vec3 Fcc = F_Schlick( material.clearcoatF0, material.clearcoatF90, dotNVcc );
		outgoingLight = outgoingLight * ( 1.0 - material.clearcoat * Fcc ) + ( clearcoatSpecularDirect + clearcoatSpecularIndirect ) * material.clearcoat;
	#endif
	#include <opaque_fragment>
	#include <tonemapping_fragment>
	#include <colorspace_fragment>
	#include <fog_fragment>
	#include <premultiplied_alpha_fragment>
	#include <dithering_fragment>
}`,KN=`#define TOON
varying vec3 vViewPosition;
#include <common>
#include <batching_pars_vertex>
#include <uv_pars_vertex>
#include <displacementmap_pars_vertex>
#include <color_pars_vertex>
#include <fog_pars_vertex>
#include <normal_pars_vertex>
#include <morphtarget_pars_vertex>
#include <skinning_pars_vertex>
#include <shadowmap_pars_vertex>
#include <logdepthbuf_pars_vertex>
#include <clipping_planes_pars_vertex>
void main() {
	#include <uv_vertex>
	#include <color_vertex>
	#include <morphinstance_vertex>
	#include <morphcolor_vertex>
	#include <batching_vertex>
	#include <beginnormal_vertex>
	#include <morphnormal_vertex>
	#include <skinbase_vertex>
	#include <skinnormal_vertex>
	#include <defaultnormal_vertex>
	#include <normal_vertex>
	#include <begin_vertex>
	#include <morphtarget_vertex>
	#include <skinning_vertex>
	#include <displacementmap_vertex>
	#include <project_vertex>
	#include <logdepthbuf_vertex>
	#include <clipping_planes_vertex>
	vViewPosition = - mvPosition.xyz;
	#include <worldpos_vertex>
	#include <shadowmap_vertex>
	#include <fog_vertex>
}`,jN=`#define TOON
uniform vec3 diffuse;
uniform vec3 emissive;
uniform float opacity;
#include <common>
#include <dithering_pars_fragment>
#include <color_pars_fragment>
#include <uv_pars_fragment>
#include <map_pars_fragment>
#include <alphamap_pars_fragment>
#include <alphatest_pars_fragment>
#include <alphahash_pars_fragment>
#include <aomap_pars_fragment>
#include <lightmap_pars_fragment>
#include <emissivemap_pars_fragment>
#include <gradientmap_pars_fragment>
#include <fog_pars_fragment>
#include <bsdfs>
#include <lights_pars_begin>
#include <normal_pars_fragment>
#include <lights_toon_pars_fragment>
#include <shadowmap_pars_fragment>
#include <bumpmap_pars_fragment>
#include <normalmap_pars_fragment>
#include <logdepthbuf_pars_fragment>
#include <clipping_planes_pars_fragment>
void main() {
	vec4 diffuseColor = vec4( diffuse, opacity );
	#include <clipping_planes_fragment>
	ReflectedLight reflectedLight = ReflectedLight( vec3( 0.0 ), vec3( 0.0 ), vec3( 0.0 ), vec3( 0.0 ) );
	vec3 totalEmissiveRadiance = emissive;
	#include <logdepthbuf_fragment>
	#include <map_fragment>
	#include <color_fragment>
	#include <alphamap_fragment>
	#include <alphatest_fragment>
	#include <alphahash_fragment>
	#include <normal_fragment_begin>
	#include <normal_fragment_maps>
	#include <emissivemap_fragment>
	#include <lights_toon_fragment>
	#include <lights_fragment_begin>
	#include <lights_fragment_maps>
	#include <lights_fragment_end>
	#include <aomap_fragment>
	vec3 outgoingLight = reflectedLight.directDiffuse + reflectedLight.indirectDiffuse + totalEmissiveRadiance;
	#include <opaque_fragment>
	#include <tonemapping_fragment>
	#include <colorspace_fragment>
	#include <fog_fragment>
	#include <premultiplied_alpha_fragment>
	#include <dithering_fragment>
}`,QN=`uniform float size;
uniform float scale;
#include <common>
#include <color_pars_vertex>
#include <fog_pars_vertex>
#include <morphtarget_pars_vertex>
#include <logdepthbuf_pars_vertex>
#include <clipping_planes_pars_vertex>
#ifdef USE_POINTS_UV
	varying vec2 vUv;
	uniform mat3 uvTransform;
#endif
void main() {
	#ifdef USE_POINTS_UV
		vUv = ( uvTransform * vec3( uv, 1 ) ).xy;
	#endif
	#include <color_vertex>
	#include <morphinstance_vertex>
	#include <morphcolor_vertex>
	#include <begin_vertex>
	#include <morphtarget_vertex>
	#include <project_vertex>
	gl_PointSize = size;
	#ifdef USE_SIZEATTENUATION
		bool isPerspective = isPerspectiveMatrix( projectionMatrix );
		if ( isPerspective ) gl_PointSize *= ( scale / - mvPosition.z );
	#endif
	#include <logdepthbuf_vertex>
	#include <clipping_planes_vertex>
	#include <worldpos_vertex>
	#include <fog_vertex>
}`,$N=`uniform vec3 diffuse;
uniform float opacity;
#include <common>
#include <color_pars_fragment>
#include <map_particle_pars_fragment>
#include <alphatest_pars_fragment>
#include <alphahash_pars_fragment>
#include <fog_pars_fragment>
#include <logdepthbuf_pars_fragment>
#include <clipping_planes_pars_fragment>
void main() {
	vec4 diffuseColor = vec4( diffuse, opacity );
	#include <clipping_planes_fragment>
	vec3 outgoingLight = vec3( 0.0 );
	#include <logdepthbuf_fragment>
	#include <map_particle_fragment>
	#include <color_fragment>
	#include <alphatest_fragment>
	#include <alphahash_fragment>
	outgoingLight = diffuseColor.rgb;
	#include <opaque_fragment>
	#include <tonemapping_fragment>
	#include <colorspace_fragment>
	#include <fog_fragment>
	#include <premultiplied_alpha_fragment>
}`,tL=`#include <common>
#include <batching_pars_vertex>
#include <fog_pars_vertex>
#include <morphtarget_pars_vertex>
#include <skinning_pars_vertex>
#include <logdepthbuf_pars_vertex>
#include <shadowmap_pars_vertex>
void main() {
	#include <batching_vertex>
	#include <beginnormal_vertex>
	#include <morphinstance_vertex>
	#include <morphnormal_vertex>
	#include <skinbase_vertex>
	#include <skinnormal_vertex>
	#include <defaultnormal_vertex>
	#include <begin_vertex>
	#include <morphtarget_vertex>
	#include <skinning_vertex>
	#include <project_vertex>
	#include <logdepthbuf_vertex>
	#include <worldpos_vertex>
	#include <shadowmap_vertex>
	#include <fog_vertex>
}`,eL=`uniform vec3 color;
uniform float opacity;
#include <common>
#include <fog_pars_fragment>
#include <bsdfs>
#include <lights_pars_begin>
#include <logdepthbuf_pars_fragment>
#include <shadowmap_pars_fragment>
#include <shadowmask_pars_fragment>
void main() {
	#include <logdepthbuf_fragment>
	gl_FragColor = vec4( color, opacity * ( 1.0 - getShadowMask() ) );
	#include <tonemapping_fragment>
	#include <colorspace_fragment>
	#include <fog_fragment>
	#include <premultiplied_alpha_fragment>
}`,nL=`uniform float rotation;
uniform vec2 center;
#include <common>
#include <uv_pars_vertex>
#include <fog_pars_vertex>
#include <logdepthbuf_pars_vertex>
#include <clipping_planes_pars_vertex>
void main() {
	#include <uv_vertex>
	vec4 mvPosition = modelViewMatrix[ 3 ];
	vec2 scale = vec2( length( modelMatrix[ 0 ].xyz ), length( modelMatrix[ 1 ].xyz ) );
	#ifndef USE_SIZEATTENUATION
		bool isPerspective = isPerspectiveMatrix( projectionMatrix );
		if ( isPerspective ) scale *= - mvPosition.z;
	#endif
	vec2 alignedPosition = ( position.xy - ( center - vec2( 0.5 ) ) ) * scale;
	vec2 rotatedPosition;
	rotatedPosition.x = cos( rotation ) * alignedPosition.x - sin( rotation ) * alignedPosition.y;
	rotatedPosition.y = sin( rotation ) * alignedPosition.x + cos( rotation ) * alignedPosition.y;
	mvPosition.xy += rotatedPosition;
	gl_Position = projectionMatrix * mvPosition;
	#include <logdepthbuf_vertex>
	#include <clipping_planes_vertex>
	#include <fog_vertex>
}`,iL=`uniform vec3 diffuse;
uniform float opacity;
#include <common>
#include <uv_pars_fragment>
#include <map_pars_fragment>
#include <alphamap_pars_fragment>
#include <alphatest_pars_fragment>
#include <alphahash_pars_fragment>
#include <fog_pars_fragment>
#include <logdepthbuf_pars_fragment>
#include <clipping_planes_pars_fragment>
void main() {
	vec4 diffuseColor = vec4( diffuse, opacity );
	#include <clipping_planes_fragment>
	vec3 outgoingLight = vec3( 0.0 );
	#include <logdepthbuf_fragment>
	#include <map_fragment>
	#include <alphamap_fragment>
	#include <alphatest_fragment>
	#include <alphahash_fragment>
	outgoingLight = diffuseColor.rgb;
	#include <opaque_fragment>
	#include <tonemapping_fragment>
	#include <colorspace_fragment>
	#include <fog_fragment>
}`,be={alphahash_fragment:T3,alphahash_pars_fragment:w3,alphamap_fragment:A3,alphamap_pars_fragment:R3,alphatest_fragment:C3,alphatest_pars_fragment:D3,aomap_fragment:N3,aomap_pars_fragment:L3,batching_pars_vertex:U3,batching_vertex:I3,begin_vertex:O3,beginnormal_vertex:P3,bsdfs:z3,iridescence_fragment:F3,bumpmap_pars_fragment:B3,clipping_planes_fragment:H3,clipping_planes_pars_fragment:G3,clipping_planes_pars_vertex:V3,clipping_planes_vertex:k3,color_fragment:X3,color_pars_fragment:W3,color_pars_vertex:q3,color_vertex:Y3,common:Z3,defaultnormal_vertex:J3,displacementmap_pars_vertex:K3,displacementmap_vertex:j3,emissivemap_fragment:Q3,emissivemap_pars_fragment:$3,colorspace_fragment:tD,colorspace_pars_fragment:eD,envmap_fragment:nD,envmap_common_pars_fragment:iD,envmap_pars_fragment:aD,envmap_pars_vertex:rD,envmap_physical_pars_fragment:gD,envmap_vertex:sD,fog_vertex:oD,fog_pars_vertex:lD,fog_fragment:cD,fog_pars_fragment:uD,gradientmap_pars_fragment:fD,lightmap_pars_fragment:hD,lights_lambert_fragment:dD,lights_lambert_pars_fragment:pD,lights_pars_begin:mD,lights_toon_fragment:vD,lights_toon_pars_fragment:xD,lights_phong_fragment:yD,lights_phong_pars_fragment:_D,lights_physical_fragment:bD,lights_physical_pars_fragment:SD,lights_fragment_begin:MD,lights_fragment_maps:ED,lights_fragment_end:TD,lightprobes_pars_fragment:wD,logdepthbuf_fragment:AD,logdepthbuf_pars_fragment:RD,logdepthbuf_pars_vertex:CD,logdepthbuf_vertex:DD,map_fragment:ND,map_pars_fragment:LD,map_particle_fragment:UD,map_particle_pars_fragment:ID,metalnessmap_fragment:OD,metalnessmap_pars_fragment:PD,morphinstance_vertex:zD,morphcolor_vertex:FD,morphnormal_vertex:BD,morphtarget_pars_vertex:HD,morphtarget_vertex:GD,normal_fragment_begin:VD,normal_fragment_maps:kD,normal_pars_fragment:XD,normal_pars_vertex:WD,normal_vertex:qD,normalmap_pars_fragment:YD,clearcoat_normal_fragment_begin:ZD,clearcoat_normal_fragment_maps:JD,clearcoat_pars_fragment:KD,iridescence_pars_fragment:jD,opaque_fragment:QD,packing:$D,premultiplied_alpha_fragment:tN,project_vertex:eN,dithering_fragment:nN,dithering_pars_fragment:iN,roughnessmap_fragment:aN,roughnessmap_pars_fragment:rN,shadowmap_pars_fragment:sN,shadowmap_pars_vertex:oN,shadowmap_vertex:lN,shadowmask_pars_fragment:cN,skinbase_vertex:uN,skinning_pars_vertex:fN,skinning_vertex:hN,skinnormal_vertex:dN,specularmap_fragment:pN,specularmap_pars_fragment:mN,tonemapping_fragment:gN,tonemapping_pars_fragment:vN,transmission_fragment:xN,transmission_pars_fragment:yN,uv_pars_fragment:_N,uv_pars_vertex:bN,uv_vertex:SN,worldpos_vertex:MN,background_vert:EN,background_frag:TN,backgroundCube_vert:wN,backgroundCube_frag:AN,cube_vert:RN,cube_frag:CN,depth_vert:DN,depth_frag:NN,distance_vert:LN,distance_frag:UN,equirect_vert:IN,equirect_frag:ON,linedashed_vert:PN,linedashed_frag:zN,meshbasic_vert:FN,meshbasic_frag:BN,meshlambert_vert:HN,meshlambert_frag:GN,meshmatcap_vert:VN,meshmatcap_frag:kN,meshnormal_vert:XN,meshnormal_frag:WN,meshphong_vert:qN,meshphong_frag:YN,meshphysical_vert:ZN,meshphysical_frag:JN,meshtoon_vert:KN,meshtoon_frag:jN,points_vert:QN,points_frag:$N,shadow_vert:tL,shadow_frag:eL,sprite_vert:nL,sprite_frag:iL},Wt={common:{diffuse:{value:new me(16777215)},opacity:{value:1},map:{value:null},mapTransform:{value:new de},alphaMap:{value:null},alphaMapTransform:{value:new de},alphaTest:{value:0}},specularmap:{specularMap:{value:null},specularMapTransform:{value:new de}},envmap:{envMap:{value:null},envMapRotation:{value:new de},reflectivity:{value:1},ior:{value:1.5},refractionRatio:{value:.98},dfgLUT:{value:null}},aomap:{aoMap:{value:null},aoMapIntensity:{value:1},aoMapTransform:{value:new de}},lightmap:{lightMap:{value:null},lightMapIntensity:{value:1},lightMapTransform:{value:new de}},bumpmap:{bumpMap:{value:null},bumpMapTransform:{value:new de},bumpScale:{value:1}},normalmap:{normalMap:{value:null},normalMapTransform:{value:new de},normalScale:{value:new Ot(1,1)}},displacementmap:{displacementMap:{value:null},displacementMapTransform:{value:new de},displacementScale:{value:1},displacementBias:{value:0}},emissivemap:{emissiveMap:{value:null},emissiveMapTransform:{value:new de}},metalnessmap:{metalnessMap:{value:null},metalnessMapTransform:{value:new de}},roughnessmap:{roughnessMap:{value:null},roughnessMapTransform:{value:new de}},gradientmap:{gradientMap:{value:null}},fog:{fogDensity:{value:25e-5},fogNear:{value:1},fogFar:{value:2e3},fogColor:{value:new me(16777215)}},lights:{ambientLightColor:{value:[]},lightProbe:{value:[]},sunLights:{value:[],properties:{direction:{},color:{}}},sunLightShadows:{value:[],properties:{shadowIntensity:1,shadowBias:{},shadowNormalBias:{},shadowRadius:{},shadowMapSize:{}}},sunShadowMatrix:{value:[]},sunShadowCascade:{value:[]},directionalLights:{value:[],properties:{direction:{},color:{}}},directionalLightShadows:{value:[],properties:{shadowIntensity:1,shadowBias:{},shadowNormalBias:{},shadowRadius:{},shadowMapSize:{}}},directionalShadowMatrix:{value:[]},spotLights:{value:[],properties:{color:{},position:{},direction:{},distance:{},coneCos:{},penumbraCos:{},decay:{}}},spotLightShadows:{value:[],properties:{shadowIntensity:1,shadowBias:{},shadowNormalBias:{},shadowRadius:{},shadowMapSize:{}}},spotLightMap:{value:[]},spotLightMatrix:{value:[]},pointLights:{value:[],properties:{color:{},position:{},decay:{},distance:{}}},pointLightShadows:{value:[],properties:{shadowIntensity:1,shadowBias:{},shadowNormalBias:{},shadowRadius:{},shadowMapSize:{},shadowCameraNear:{},shadowCameraFar:{}}},pointShadowMatrix:{value:[]},hemisphereLights:{value:[],properties:{direction:{},skyColor:{},groundColor:{}}},rectAreaLights:{value:[],properties:{color:{},position:{},width:{},height:{}}},ltc_1:{value:null},ltc_2:{value:null},probesSH:{value:[]},probesMin:{value:[]},probesMax:{value:[]},probesResolution:{value:[]}},points:{diffuse:{value:new me(16777215)},opacity:{value:1},size:{value:1},scale:{value:1},map:{value:null},alphaMap:{value:null},alphaMapTransform:{value:new de},alphaTest:{value:0},uvTransform:{value:new de}},sprite:{diffuse:{value:new me(16777215)},opacity:{value:1},center:{value:new Ot(.5,.5)},rotation:{value:0},map:{value:null},mapTransform:{value:new de},alphaMap:{value:null},alphaMapTransform:{value:new de},alphaTest:{value:0}}},er={basic:{uniforms:$n([Wt.common,Wt.specularmap,Wt.envmap,Wt.aomap,Wt.lightmap,Wt.fog]),vertexShader:be.meshbasic_vert,fragmentShader:be.meshbasic_frag},lambert:{uniforms:$n([Wt.common,Wt.specularmap,Wt.envmap,Wt.aomap,Wt.lightmap,Wt.emissivemap,Wt.bumpmap,Wt.normalmap,Wt.displacementmap,Wt.fog,Wt.lights,{emissive:{value:new me(0)},envMapIntensity:{value:1}}]),vertexShader:be.meshlambert_vert,fragmentShader:be.meshlambert_frag},phong:{uniforms:$n([Wt.common,Wt.specularmap,Wt.envmap,Wt.aomap,Wt.lightmap,Wt.emissivemap,Wt.bumpmap,Wt.normalmap,Wt.displacementmap,Wt.fog,Wt.lights,{emissive:{value:new me(0)},specular:{value:new me(1118481)},shininess:{value:30},envMapIntensity:{value:1}}]),vertexShader:be.meshphong_vert,fragmentShader:be.meshphong_frag},standard:{uniforms:$n([Wt.common,Wt.envmap,Wt.aomap,Wt.lightmap,Wt.emissivemap,Wt.bumpmap,Wt.normalmap,Wt.displacementmap,Wt.roughnessmap,Wt.metalnessmap,Wt.fog,Wt.lights,{emissive:{value:new me(0)},roughness:{value:1},metalness:{value:0},envMapIntensity:{value:1}}]),vertexShader:be.meshphysical_vert,fragmentShader:be.meshphysical_frag},toon:{uniforms:$n([Wt.common,Wt.aomap,Wt.lightmap,Wt.emissivemap,Wt.bumpmap,Wt.normalmap,Wt.displacementmap,Wt.gradientmap,Wt.fog,Wt.lights,{emissive:{value:new me(0)}}]),vertexShader:be.meshtoon_vert,fragmentShader:be.meshtoon_frag},matcap:{uniforms:$n([Wt.common,Wt.bumpmap,Wt.normalmap,Wt.displacementmap,Wt.fog,{matcap:{value:null}}]),vertexShader:be.meshmatcap_vert,fragmentShader:be.meshmatcap_frag},points:{uniforms:$n([Wt.points,Wt.fog]),vertexShader:be.points_vert,fragmentShader:be.points_frag},dashed:{uniforms:$n([Wt.common,Wt.fog,{scale:{value:1},dashSize:{value:1},totalSize:{value:2}}]),vertexShader:be.linedashed_vert,fragmentShader:be.linedashed_frag},depth:{uniforms:$n([Wt.common,Wt.displacementmap]),vertexShader:be.depth_vert,fragmentShader:be.depth_frag},normal:{uniforms:$n([Wt.common,Wt.bumpmap,Wt.normalmap,Wt.displacementmap,{opacity:{value:1}}]),vertexShader:be.meshnormal_vert,fragmentShader:be.meshnormal_frag},sprite:{uniforms:$n([Wt.sprite,Wt.fog]),vertexShader:be.sprite_vert,fragmentShader:be.sprite_frag},background:{uniforms:{uvTransform:{value:new de},t2D:{value:null},backgroundIntensity:{value:1}},vertexShader:be.background_vert,fragmentShader:be.background_frag},backgroundCube:{uniforms:{envMap:{value:null},backgroundBlurriness:{value:0},backgroundIntensity:{value:1},backgroundRotation:{value:new de}},vertexShader:be.backgroundCube_vert,fragmentShader:be.backgroundCube_frag},cube:{uniforms:{tCube:{value:null},tFlip:{value:-1},opacity:{value:1}},vertexShader:be.cube_vert,fragmentShader:be.cube_frag},equirect:{uniforms:{tEquirect:{value:null}},vertexShader:be.equirect_vert,fragmentShader:be.equirect_frag},distance:{uniforms:$n([Wt.common,Wt.displacementmap,{referencePosition:{value:new q},nearDistance:{value:1},farDistance:{value:1e3}}]),vertexShader:be.distance_vert,fragmentShader:be.distance_frag},shadow:{uniforms:$n([Wt.lights,Wt.fog,{color:{value:new me(0)},opacity:{value:1}}]),vertexShader:be.shadow_vert,fragmentShader:be.shadow_frag}};er.physical={uniforms:$n([er.standard.uniforms,{clearcoat:{value:0},clearcoatMap:{value:null},clearcoatMapTransform:{value:new de},clearcoatNormalMap:{value:null},clearcoatNormalMapTransform:{value:new de},clearcoatNormalScale:{value:new Ot(1,1)},clearcoatRoughness:{value:0},clearcoatRoughnessMap:{value:null},clearcoatRoughnessMapTransform:{value:new de},diffuseRoughness:{value:0},diffuseRoughnessMap:{value:null},diffuseRoughnessMapTransform:{value:new de},dispersion:{value:0},retroreflectivity:{value:0},iridescence:{value:0},iridescenceMap:{value:null},iridescenceMapTransform:{value:new de},iridescenceIOR:{value:1.3},iridescenceThicknessMinimum:{value:100},iridescenceThicknessMaximum:{value:400},iridescenceThicknessMap:{value:null},iridescenceThicknessMapTransform:{value:new de},sheen:{value:0},sheenColor:{value:new me(0)},sheenColorMap:{value:null},sheenColorMapTransform:{value:new de},sheenRoughness:{value:1},sheenRoughnessMap:{value:null},sheenRoughnessMapTransform:{value:new de},transmission:{value:0},transmissionMap:{value:null},transmissionMapTransform:{value:new de},transmissionSamplerSize:{value:new Ot},transmissionSamplerMap:{value:null},thickness:{value:0},thicknessMap:{value:null},thicknessMapTransform:{value:new de},attenuationDistance:{value:0},attenuationColor:{value:new me(0)},specularColor:{value:new me(1,1,1)},specularColorMap:{value:null},specularColorMapTransform:{value:new de},specularIntensity:{value:1},specularIntensityMap:{value:null},specularIntensityMapTransform:{value:new de},anisotropyVector:{value:new Ot},anisotropyMap:{value:null},anisotropyMapTransform:{value:new de}}]),vertexShader:be.meshphysical_vert,fragmentShader:be.meshphysical_frag};var Kp={r:0,b:0,g:0},aL=new Ye,NT=new de;NT.set(-1,0,0,0,1,0,0,0,1);function rL(e,t,n,i,a,r){let s=new me(0),l=a===!0?0:1,o,c,u=null,p=0,f=null;function h(x){let b=x.isScene===!0?x.background:null;if(b&&b.isTexture){let y=x.backgroundBlurriness>0;b=t.get(b,y)}return b}function g(x){let b=!1,y=h(x);y===null?v(s,l):y&&y.isColor&&(v(y,1),b=!0);let w=e.xr.getEnvironmentBlendMode();w==="additive"?n.buffers.color.setClear(0,0,0,1,r):w==="alpha-blend"&&n.buffers.color.setClear(0,0,0,0,r),(e.autoClear||b)&&(n.buffers.depth.setTest(!0),n.buffers.depth.setMask(!0),n.buffers.color.setMask(!0),e.clear(e.autoClearColor,e.autoClearDepth,e.autoClearStencil))}function M(x,b){let y=h(b);y&&y.isCubeTexture?(c===void 0&&(c=new wn(new Ql(1,1,1),new Qa({name:"BackgroundCubeMaterial",uniforms:Mo(er.backgroundCube.uniforms),vertexShader:er.backgroundCube.vertexShader,fragmentShader:er.backgroundCube.fragmentShader,side:hi,depthTest:!1,depthWrite:!1,fog:!1,allowOverride:!1})),c.geometry.deleteAttribute("normal"),c.geometry.deleteAttribute("uv"),c.onBeforeRender=function(w,T,m){this.matrixWorld.copyPosition(m.matrixWorld)},Object.defineProperty(c.material,"envMap",{get:function(){return this.uniforms.envMap.value}}),i.update(c)),c.material.uniforms.envMap.value=y,c.material.uniforms.backgroundBlurriness.value=b.backgroundBlurriness,c.material.uniforms.backgroundIntensity.value=b.backgroundIntensity,c.material.uniforms.backgroundRotation.value.setFromMatrix4(aL.makeRotationFromEuler(b.backgroundRotation)).transpose(),y.isRenderTargetTexture===!1&&c.material.uniforms.backgroundRotation.value.premultiply(NT),c.material.toneMapped=Ne.getTransfer(y.colorSpace)!==Ge,(u!==y||p!==y.version||f!==e.toneMapping)&&(c.material.needsUpdate=!0,u=y,p=y.version,f=e.toneMapping),c.layers.enableAll(),x.unshift(c,c.geometry,c.material,0,0,null)):y&&y.isTexture&&(o===void 0&&(o=new wn(new xo(2,2),new Qa({name:"BackgroundMaterial",uniforms:Mo(er.background.uniforms),vertexShader:er.background.vertexShader,fragmentShader:er.background.fragmentShader,side:Cs,depthTest:!1,depthWrite:!1,fog:!1,allowOverride:!1})),o.geometry.deleteAttribute("normal"),Object.defineProperty(o.material,"map",{get:function(){return this.uniforms.t2D.value}}),i.update(o)),o.material.uniforms.t2D.value=y,o.material.uniforms.backgroundIntensity.value=b.backgroundIntensity,o.material.toneMapped=Ne.getTransfer(y.colorSpace)!==Ge,y.matrixAutoUpdate===!0&&y.updateMatrix(),o.material.uniforms.uvTransform.value.copy(y.matrix),(u!==y||p!==y.version||f!==e.toneMapping)&&(o.material.needsUpdate=!0,u=y,p=y.version,f=e.toneMapping),o.layers.enableAll(),x.unshift(o,o.geometry,o.material,0,0,null))}function v(x,b){x.getRGB(Kp,Nx(e)),n.buffers.color.setClear(Kp.r,Kp.g,Kp.b,b,r)}function d(){c!==void 0&&(c.geometry.dispose(),c.material.dispose(),c=void 0),o!==void 0&&(o.geometry.dispose(),o.material.dispose(),o=void 0)}return{getClearColor:function(){return s},setClearColor:function(x,b=1){s.set(x),l=b,v(s,l)},getClearAlpha:function(){return l},setClearAlpha:function(x){l=x,v(s,l)},render:g,addToRenderList:M,dispose:d}}function sL(e,t){let n=e.getParameter(e.MAX_VERTEX_ATTRIBS),i={},a=f(null),r=a,s=!1;function l(R,Z,tt,z,J){let j=!1,B=p(R,z,tt,Z);r!==B&&(r=B,c(r.object)),j=h(R,z,tt,J),j&&g(R,z,tt,J),J!==null&&t.update(J,e.ELEMENT_ARRAY_BUFFER),(j||s)&&(s=!1,y(R,Z,tt,z),J!==null&&e.bindBuffer(e.ELEMENT_ARRAY_BUFFER,t.get(J).buffer))}function o(){return e.createVertexArray()}function c(R){return e.bindVertexArray(R)}function u(R){return e.deleteVertexArray(R)}function p(R,Z,tt,z){let J=z.wireframe===!0,j=i[Z.id];j===void 0&&(j={},i[Z.id]=j);let B=R.isInstancedMesh===!0?R.id:0,ot=j[B];ot===void 0&&(ot={},j[B]=ot);let k=ot[tt.id];k===void 0&&(k={},ot[tt.id]=k);let Y=k[J];return Y===void 0&&(Y=f(o()),k[J]=Y),Y}function f(R){let Z=[],tt=[],z=[];for(let J=0;J<n;J++)Z[J]=0,tt[J]=0,z[J]=0;return{geometry:null,program:null,wireframe:!1,newAttributes:Z,enabledAttributes:tt,attributeDivisors:z,object:R,attributes:{},index:null}}function h(R,Z,tt,z){let J=r.attributes,j=Z.attributes,B=0,ot=tt.getAttributes();for(let k in ot)if(ot[k].location>=0){let N=J[k],yt=j[k];if(yt===void 0&&(k==="instanceMatrix"&&R.instanceMatrix&&(yt=R.instanceMatrix),k==="instanceColor"&&R.instanceColor&&(yt=R.instanceColor)),N===void 0||N.attribute!==yt||yt&&N.data!==yt.data)return!0;B++}return r.attributesNum!==B||r.index!==z}function g(R,Z,tt,z){let J={},j=Z.attributes,B=0,ot=tt.getAttributes();for(let k in ot)if(ot[k].location>=0){let N=j[k];N===void 0&&(k==="instanceMatrix"&&R.instanceMatrix&&(N=R.instanceMatrix),k==="instanceColor"&&R.instanceColor&&(N=R.instanceColor));let yt={};yt.attribute=N,N&&N.data&&(yt.data=N.data),J[k]=yt,B++}r.attributes=J,r.attributesNum=B,r.index=z}function M(){let R=r.newAttributes;for(let Z=0,tt=R.length;Z<tt;Z++)R[Z]=0}function v(R){d(R,0)}function d(R,Z){let tt=r.newAttributes,z=r.enabledAttributes,J=r.attributeDivisors;tt[R]=1,z[R]===0&&(e.enableVertexAttribArray(R),z[R]=1),J[R]!==Z&&(e.vertexAttribDivisor(R,Z),J[R]=Z)}function x(){let R=r.newAttributes,Z=r.enabledAttributes;for(let tt=0,z=Z.length;tt<z;tt++)Z[tt]!==R[tt]&&(e.disableVertexAttribArray(tt),Z[tt]=0)}function b(R,Z,tt,z,J,j,B){B===!0?e.vertexAttribIPointer(R,Z,tt,J,j):e.vertexAttribPointer(R,Z,tt,z,J,j)}function y(R,Z,tt,z){M();let J=z.attributes,j=tt.getAttributes(),B=Z.defaultAttributeValues;for(let ot in j){let k=j[ot];if(k.location>=0){let Y=J[ot];if(Y===void 0&&(ot==="instanceMatrix"&&R.instanceMatrix&&(Y=R.instanceMatrix),ot==="instanceColor"&&R.instanceColor&&(Y=R.instanceColor)),Y!==void 0){let N=Y.normalized,yt=Y.itemSize,Dt=t.get(Y);if(Dt===void 0)continue;let lt=Dt.buffer,_t=Dt.type,Ct=Dt.bytesPerElement,Ft=_t===e.INT||_t===e.UNSIGNED_INT||Y.gpuType===dp;if(Y.isInterleavedBufferAttribute){let Lt=Y.data,gt=Lt.isInterleavedBuffer===!0?Lt.stride:Lt.itemSize,Zt=Y.offset;if(Lt.isInstancedInterleavedBuffer||Lt.isInstancedBufferAttribute){for(let I=0;I<k.locationSize;I++)d(k.location+I,Lt.meshPerAttribute);R.isInstancedMesh!==!0&&z._maxInstanceCount===void 0&&(z._maxInstanceCount=Lt.meshPerAttribute*Lt.count)}else for(let I=0;I<k.locationSize;I++)v(k.location+I);e.bindBuffer(e.ARRAY_BUFFER,lt);for(let I=0;I<k.locationSize;I++)b(k.location+I,yt/k.locationSize,_t,N,gt*Ct,(Zt+yt/k.locationSize*I)*Ct,Ft)}else{if(Y.isInstancedBufferAttribute){for(let Lt=0;Lt<k.locationSize;Lt++)d(k.location+Lt,Y.meshPerAttribute);R.isInstancedMesh!==!0&&z._maxInstanceCount===void 0&&(z._maxInstanceCount=Y.meshPerAttribute*Y.count)}else for(let Lt=0;Lt<k.locationSize;Lt++)v(k.location+Lt);e.bindBuffer(e.ARRAY_BUFFER,lt);for(let Lt=0;Lt<k.locationSize;Lt++)b(k.location+Lt,yt/k.locationSize,_t,N,yt*Ct,yt/k.locationSize*Lt*Ct,Ft)}}else if(B!==void 0){let N=B[ot];if(N!==void 0)switch(N.length){case 2:e.vertexAttrib2fv(k.location,N);break;case 3:e.vertexAttrib3fv(k.location,N);break;case 4:e.vertexAttrib4fv(k.location,N);break;default:e.vertexAttrib1fv(k.location,N)}}}}x()}function w(){C();for(let R in i){let Z=i[R];for(let tt in Z){let z=Z[tt];for(let J in z){let j=z[J];for(let B in j)u(j[B].object),delete j[B];delete z[J]}}delete i[R]}}function T(R){if(i[R.id]===void 0)return;let Z=i[R.id];for(let tt in Z){let z=Z[tt];for(let J in z){let j=z[J];for(let B in j)u(j[B].object),delete j[B];delete z[J]}}delete i[R.id]}function m(R){for(let Z in i){let tt=i[Z];for(let z in tt){let J=tt[z];if(J[R.id]===void 0)continue;let j=J[R.id];for(let B in j)u(j[B].object),delete j[B];delete J[R.id]}}}function S(R){for(let Z in i){let tt=i[Z],z=R.isInstancedMesh===!0?R.id:0,J=tt[z];if(J!==void 0){for(let j in J){let B=J[j];for(let ot in B)u(B[ot].object),delete B[ot];delete J[j]}delete tt[z],Object.keys(tt).length===0&&delete i[Z]}}}function C(){D(),s=!0,r!==a&&(r=a,c(r.object))}function D(){a.geometry=null,a.program=null,a.wireframe=!1}return{setup:l,reset:C,resetDefaultState:D,dispose:w,releaseStatesOfGeometry:T,releaseStatesOfObject:S,releaseStatesOfProgram:m,initAttributes:M,enableAttribute:v,disableUnusedAttributes:x}}function oL(e,t,n){let i;function a(o){i=o}function r(o,c){e.drawArrays(i,o,c),n.update(c,i,1)}function s(o,c,u){u!==0&&(e.drawArraysInstanced(i,o,c,u),n.update(c,i,u))}function l(o,c,u){if(u===0)return;t.get("WEBGL_multi_draw").multiDrawArraysWEBGL(i,o,0,c,0,u);let f=0;for(let h=0;h<u;h++)f+=c[h];n.update(f,i,1)}this.setMode=a,this.render=r,this.renderInstances=s,this.renderMultiDraw=l}function lL(e,t,n,i){let a;function r(){if(a!==void 0)return a;if(t.has("EXT_texture_filter_anisotropic")===!0){let m=t.get("EXT_texture_filter_anisotropic");a=e.getParameter(m.MAX_TEXTURE_MAX_ANISOTROPY_EXT)}else a=0;return a}function s(m){return!(m!==wa&&i.convert(m)!==e.getParameter(e.IMPLEMENTATION_COLOR_READ_FORMAT))}function l(m){let S=m===Ta&&(t.has("EXT_color_buffer_half_float")||t.has("EXT_color_buffer_float"));return!(m!==wi&&m!==Ea&&!S&&i.convert(m)!==e.getParameter(e.IMPLEMENTATION_COLOR_READ_TYPE))}function o(m){if(m==="highp"){if(e.getShaderPrecisionFormat(e.VERTEX_SHADER,e.HIGH_FLOAT).precision>0&&e.getShaderPrecisionFormat(e.FRAGMENT_SHADER,e.HIGH_FLOAT).precision>0)return"highp";m="mediump"}return m==="mediump"&&e.getShaderPrecisionFormat(e.VERTEX_SHADER,e.MEDIUM_FLOAT).precision>0&&e.getShaderPrecisionFormat(e.FRAGMENT_SHADER,e.MEDIUM_FLOAT).precision>0?"mediump":"lowp"}let c=n.precision!==void 0?n.precision:"highp",u=o(c);u!==c&&(ce("WebGLRenderer:",c,"not supported, using",u,"instead."),c=u);let p=n.reversedDepthBuffer===!0&&t.has("EXT_clip_control"),f=n.logarithmicDepthBuffer===!0&&p===!1;n.reversedDepthBuffer===!0&&p===!1&&ce("WebGLRenderer: Unable to use reversed depth buffer due to missing EXT_clip_control extension. Fallback to default depth buffer."),n.logarithmicDepthBuffer===!0&&p===!0&&ce("WebGLRenderer: Logarithmic depth buffer is ignored when reversed depth buffer is enabled.");let h=e.getParameter(e.MAX_TEXTURE_IMAGE_UNITS),g=e.getParameter(e.MAX_VERTEX_TEXTURE_IMAGE_UNITS),M=e.getParameter(e.MAX_TEXTURE_SIZE),v=e.getParameter(e.MAX_CUBE_MAP_TEXTURE_SIZE),d=e.getParameter(e.MAX_VERTEX_ATTRIBS),x=e.getParameter(e.MAX_VERTEX_UNIFORM_VECTORS),b=e.getParameter(e.MAX_VARYING_VECTORS),y=e.getParameter(e.MAX_FRAGMENT_UNIFORM_VECTORS),w=e.getParameter(e.MAX_SAMPLES),T=e.getParameter(e.SAMPLES);return{isWebGL2:!0,getMaxAnisotropy:r,getMaxPrecision:o,textureFormatReadable:s,textureTypeReadable:l,precision:c,logarithmicDepthBuffer:f,reversedDepthBuffer:p,maxTextures:h,maxVertexTextures:g,maxTextureSize:M,maxCubemapSize:v,maxAttributes:d,maxVertexUniforms:x,maxVaryings:b,maxFragmentUniforms:y,maxSamples:w,samples:T}}function cL(e){let t=this,n=null,i=0,a=!1,r=!1,s=new ba,l=new de,o={value:null,needsUpdate:!1};this.uniform=o,this.numPlanes=0,this.numIntersection=0,this.init=function(p,f){let h=p.length!==0||f||i!==0||a;return a=f,i=p.length,h},this.beginShadows=function(){r=!0,u(null)},this.endShadows=function(){r=!1},this.setGlobalState=function(p,f){n=u(p,f,0)},this.setState=function(p,f,h){let g=p.clippingPlanes,M=p.clipIntersection,v=p.clipShadows,d=e.get(p);if(!a||g===null||g.length===0||r&&!v)r?u(null):c();else{let x=r?0:i,b=x*4,y=d.clippingState||null;o.value=y,y=u(g,f,b,h);for(let w=0;w!==b;++w)y[w]=n[w];d.clippingState=y,this.numIntersection=M?this.numPlanes:0,this.numPlanes+=x}};function c(){o.value!==n&&(o.value=n,o.needsUpdate=i>0),t.numPlanes=i,t.numIntersection=0}function u(p,f,h,g){let M=p!==null?p.length:0,v=null;if(M!==0){if(v=o.value,g!==!0||v===null){let d=h+M*4,x=f.matrixWorldInverse;l.getNormalMatrix(x),(v===null||v.length<d)&&(v=new Float32Array(d));for(let b=0,y=h;b!==M;++b,y+=4)s.copy(p[b]).applyMatrix4(x,l),s.normal.toArray(v,y),v[y+3]=s.constant}o.value=v,o.needsUpdate=!0}return t.numPlanes=M,t.numIntersection=0,v}}var uf=class extends Vi{constructor(t=1,n={}){super(t,t,n),this.isWebGLCubeRenderTarget=!0;let i={width:t,height:t,depth:1},a=[i,i,i,i,i,i];this.texture=new zu(a),this._setTextureOptions(n),this.texture.isRenderTargetTexture=!0}fromEquirectangularTexture(t,n){this.texture.type=n.type,this.texture.colorSpace=n.colorSpace,this.texture.generateMipmaps=n.generateMipmaps,this.texture.minFilter=n.minFilter,this.texture.magFilter=n.magFilter;let i={uniforms:{tEquirect:{value:null}},vertexShader:`

				varying vec3 vWorldDirection;

				vec3 transformDirection( in vec3 dir, in mat4 matrix ) {

					return normalize( ( matrix * vec4( dir, 0.0 ) ).xyz );

				}

				void main() {

					vWorldDirection = transformDirection( position, modelMatrix );

					#include <begin_vertex>
					#include <project_vertex>

				}
			`,fragmentShader:`

				uniform sampler2D tEquirect;

				varying vec3 vWorldDirection;

				#include <common>

				void main() {

					vec3 direction = normalize( vWorldDirection );

					vec2 sampleUV = equirectUv( direction );

					gl_FragColor = texture2D( tEquirect, sampleUV );

				}
			`},a=new Ql(5,5,5),r=new Qa({name:"CubemapFromEquirect",uniforms:Mo(i.uniforms),vertexShader:i.vertexShader,fragmentShader:i.fragmentShader,side:hi,blending:yo});r.uniforms.tEquirect.value=n;let s=new wn(a,r),l=n.minFilter;return n.minFilter===Sa&&(n.minFilter=qn),new sc(1,10,this).update(t,s),n.minFilter=l,s.geometry.dispose(),s.material.dispose(),this}clear(t,n=!0,i=!0,a=!0){let r=t.getRenderTarget();for(let s=0;s<6;s++)t.setRenderTarget(this,s),t.clear(n,i,a);t.setRenderTarget(r)}},cT=256,uL=3,fL=20,LT=256,UT=16,hL=3,dL=new q,pL=new me,dc=class e{constructor(t){this._renderer=t,this._cubeSize=0,this._sourceTarget=null,this._cubeCamera=new sc(1,10,null),this._boxMesh=new wn(new Ql(5,5,5),null),this._cubemapMaterial=null,this._equirectMaterial=null,this._blurMaterial=null,this._ggxMaterial=null,this._integrationMaterial=null}fromScene(t,n=0,i=.1,a=100,r={}){let{size:s=256,position:l=dL}=r,o=this._renderer;this._setSize(s);let c=this._allocateTarget(),u=this._getSourceTarget(!0);n>0&&(u.texture.mipmapsAutoUpdate=!1);let p=o.autoClear,f=o.autoClearColor,h=o.autoClearDepth,g=o.autoClearStencil,M=t.background;o.autoClear=!0,o.autoClearColor=!0,o.autoClearDepth=!0,o.autoClearStencil=!0,M===null&&(t.background=o.getClearColor(pL));let v=new sc(i,a,u);return v.position.copy(l),v.update(o,t),o.autoClear=p,o.autoClearColor=f,o.autoClearDepth=h,o.autoClearStencil=g,t.background=M,n>0&&(u.texture.mipmapsAutoUpdate=!0,this._blur(c,n)),this._applyPMREM(c),c}fromEquirectangular(t,n=null){return this._fromTexture(t,n)}fromCubemap(t,n=null){return this._fromTexture(t,n)}compileCubemapShader(){this._cubemapMaterial===null&&(this._cubemapMaterial=hT(),this._compileMaterial(this._cubemapMaterial))}compileEquirectangularShader(){this._equirectMaterial===null&&(this._equirectMaterial=fT(),this._compileMaterial(this._equirectMaterial))}dispose(){this._sourceTarget!==null&&this._sourceTarget.dispose(),this._cubemapMaterial!==null&&this._cubemapMaterial.dispose(),this._equirectMaterial!==null&&this._equirectMaterial.dispose(),this._blurMaterial!==null&&this._blurMaterial.dispose(),this._ggxMaterial!==null&&this._ggxMaterial.dispose(),this._integrationMaterial!==null&&this._integrationMaterial.dispose(),this._boxMesh.geometry.dispose()}static lodToRoughness(t,n){return n>0?1-Math.sqrt(1-t/n):0}_setSize(t){this._cubeSize=Math.max(cT,tT(t))}_fromTexture(t,n){t.mapping===bo||t.mapping===cc?this._setSize(t.image.length===0?cT:t.image[0].width||t.image[0].image.width):this._setSize(t.image.width/4);let i=n||this._allocateTarget();return this._textureToCubemap(t),this._applyPMREM(i),i}_allocateTarget(){let t=this._cubeSize,n=uT(t,!1,!1),i=Math.log2(t)-uL;for(let a=0;a<=i;a++)n.texture.mipmaps.push({width:t>>a,height:t>>a});return n.texture.name="PMREM",n.texture.isPMREMTexture=!0,n}_getSourceTarget(t=!1){let n=this._cubeSize,i=this._sourceTarget;return(i===null||i.width!==n||t&&i.depthBuffer===!1)&&(i!==null&&i.dispose(),this._sourceTarget=uT(n,!0,t)),this._sourceTarget}_compileMaterial(t){this._boxMesh.material=t,this._renderer.compile(this._boxMesh,this._cubeCamera.children[0])}_renderCube(t,n,i){let a=this._boxMesh,r=this._cubeCamera;a.material=i,r.renderTarget=t,r.activeMipmapLevel=n;let s=t.width>>n;t.viewport.set(0,0,s,s),r.update(this._renderer,a),t.viewport.set(0,0,t.width,t.height)}_textureToCubemap(t){let n;t.mapping===bo||t.mapping===cc?(this._cubemapMaterial===null&&(this._cubemapMaterial=hT()),n=this._cubemapMaterial,n.uniforms.flipEnvMap.value=t.isRenderTargetTexture===!1?-1:1):(this._equirectMaterial===null&&(this._equirectMaterial=fT()),n=this._equirectMaterial),n.uniforms.envMap.value=t,this._renderCube(this._getSourceTarget(),0,n)}_applyPMREM(t){this._ggxMaterial===null&&(this._ggxMaterial=mL(),this._integrationMaterial=gL());let n=this._cubeSize,i=t.texture.mipmaps.length-1,a=this._ggxMaterial.uniforms;a.envMap.value=this._sourceTarget.texture;let r=this._integrationMaterial.uniforms;r.envMap.value=this._sourceTarget.texture,r.sourceLod.value=Math.log2(n/UT);for(let s=0;s<=i;s++){let l=e.lodToRoughness(s,i);if(s>i-hL)r.roughness.value=l,this._renderCube(t,s,this._integrationMaterial);else{let o=l>0?Math.log2(n)+.5*Math.log2(6/(LT*Math.pow(l,4)))+.5:0;a.roughness.value=l,a.lodBias.value=o,this._renderCube(t,s,this._ggxMaterial)}}}_blur(t,n){this._blurMaterial===null&&(this._blurMaterial=vL());let i=this._blurMaterial,a=i.uniforms,r=this._sourceTarget;a.sigma.value=Math.min(n,Math.PI)/Math.SQRT2,a.envMap.value=r.texture,this._renderCube(t,0,i),a.envMap.value=t.texture,this._renderCube(r,0,i)}};function uT(e,t,n){return new uf(e,{minFilter:Sa,generateMipmaps:t,type:Ta,colorSpace:Du,depthBuffer:n})}function ff(e,t,n){return new Qa({name:e,uniforms:t,vertexShader:be.cube_vert,fragmentShader:n,side:hi,blending:yo,depthTest:!1,depthWrite:!1})}function mL(){return ff("PMREMGGXConvolution",{envMap:{value:null},roughness:{value:0},lodBias:{value:0}},`

		#define GGX_SAMPLES ${LT}u

		varying vec3 vWorldDirection;

		uniform samplerCube envMap;
		uniform float roughness;
		uniform float lodBias;

		#include <common>

		// Van der Corput radical inverse
		float radicalInverse_VdC( uint bits ) {

			bits = ( bits << 16u ) | ( bits >> 16u );
			bits = ( ( bits & 0x55555555u ) << 1u ) | ( ( bits & 0xAAAAAAAAu ) >> 1u );
			bits = ( ( bits & 0x33333333u ) << 2u ) | ( ( bits & 0xCCCCCCCCu ) >> 2u );
			bits = ( ( bits & 0x0F0F0F0Fu ) << 4u ) | ( ( bits & 0xF0F0F0F0u ) >> 4u );
			bits = ( ( bits & 0x00FF00FFu ) << 8u ) | ( ( bits & 0xFF00FF00u ) >> 8u );
			return float( bits ) * 2.3283064365386963e-10; // / 0x100000000

		}

		// Hammersley sequence
		vec2 hammersley( uint i, uint N ) {

			return vec2( float( i ) / float( N ), radicalInverse_VdC( i ) );

		}

		void main() {

			vec3 N = normalize( vWorldDirection );

			// For very low roughness, just sample the environment directly
			if ( roughness < 0.001 ) {

				gl_FragColor = vec4( textureLod( envMap, N, 0.0 ).rgb, 1.0 );
				return;

			}

			float alpha = roughness * roughness;
			float alpha2 = alpha * alpha;

			// Tangent space basis for VNDF sampling
			vec3 up = abs( N.z ) < 0.999 ? vec3( 0.0, 0.0, 1.0 ) : vec3( 1.0, 0.0, 0.0 );
			vec3 tangent = normalize( cross( up, N ) );
			vec3 bitangent = cross( N, tangent );

			vec3 prefilteredColor = vec3( 0.0 );
			float totalWeight = 0.0;

			for ( uint i = 0u; i < GGX_SAMPLES; i ++ ) {

				vec2 Xi = hammersley( i, GGX_SAMPLES );

				// With V = N, sample the reflected direction directly.
				float invQ = 1.0 / ( 1.0 - Xi.x + alpha2 * Xi.x );
				float NdotL = ( 1.0 - Xi.x - alpha2 * Xi.x ) * invQ;

				if ( NdotL > 0.0 ) {

					float phi = 2.0 * PI * Xi.y;
					float sinTheta = 2.0 * alpha * sqrt( Xi.x * ( 1.0 - Xi.x ) ) * invQ;
					vec3 L = N * NdotL + ( tangent * cos( phi ) + bitangent * sin( phi ) ) * sinTheta;

					// Match the source mip to the sample's solid angle. The terms
					// independent of the sample are precomputed in lodBias.
					float d = alpha2 * invQ;
					float lod = max( log2( d ) + lodBias, 0.0 );

					// Weight by NdotL for the split-sum approximation
					prefilteredColor += textureLod( envMap, L, lod ).rgb * NdotL;
					totalWeight += NdotL;

				}

			}

			gl_FragColor = vec4( prefilteredColor / totalWeight, 1.0 );

		}
	`)}function gL(){return ff("PMREMGGXIntegration",{envMap:{value:null},roughness:{value:0},sourceLod:{value:0},sourceSize:{value:UT}},`

		varying vec3 vWorldDirection;

		uniform samplerCube envMap;
		uniform float roughness;
		uniform float sourceLod;
		uniform int sourceSize;

		void main() {

			vec3 N = normalize( vWorldDirection );

			float alpha = roughness * roughness;
			float alpha2 = alpha * alpha;

			float texelSize = 2.0 / float( sourceSize );

			vec3 prefilteredColor = vec3( 0.0 );
			float totalWeight = 0.0;

			// Pair opposite texels: only the one in N's hemisphere contributes.
			for ( int face = 0; face < 3; face ++ ) {

				for ( int y = 0; y < sourceSize; y ++ ) {

					for ( int x = 0; x < sourceSize; x ++ ) {

						vec2 uv = ( vec2( x, y ) + 0.5 ) * texelSize - 1.0;
						vec3 texelDirection = face == 0 ? vec3( 1.0, uv ) : ( face == 1 ? vec3( uv.x, 1.0, uv.y ) : vec3( uv, 1.0 ) );

						float invDistance = inversesqrt( 1.0 + dot( uv, uv ) );
						float NdotL = dot( N, texelDirection );
						texelDirection *= NdotL < 0.0 ? - 1.0 : 1.0;
						NdotL = abs( NdotL ) * invDistance;

						// With V = N, NdotH squared is ( 1 + NdotL ) / 2. Common factors
						// in the GGX distribution and texel solid angle cancel when normalized.
						float d = 1.0 + alpha2 + ( alpha2 - 1.0 ) * NdotL;
						float weight = NdotL * invDistance * invDistance * invDistance / ( d * d );

						prefilteredColor += textureLod( envMap, texelDirection, sourceLod ).rgb * weight;
						totalWeight += weight;

					}

				}

			}

			gl_FragColor = vec4( prefilteredColor / totalWeight, 1.0 );

		}
	`)}function vL(){return ff("PMREMSphericalGaussianBlur",{envMap:{value:null},sigma:{value:0}},`

		#define SAMPLES ${fL}
		#define GOLDEN_ANGLE 2.39996322973

		varying vec3 vWorldDirection;

		uniform samplerCube envMap;
		uniform float sigma;

		#include <common>

		void main() {

			vec3 outputDirection = normalize( vWorldDirection );

			vec3 up = abs( outputDirection.z ) < 0.999 ? vec3( 0.0, 0.0, 1.0 ) : vec3( 1.0, 0.0, 0.0 );
			vec3 tangent = normalize( cross( up, outputDirection ) );
			vec3 bitangent = cross( outputDirection, tangent );

			// Truncate the kernel at three standard deviations or at the antipode.
			float thetaMax = min( 3.0 * sigma, PI );
			float truncation = 1.0 - exp( - 0.5 * thetaMax * thetaMax / ( sigma * sigma ) );

			vec3 accumColor = vec3( 0.0 );
			float accumWeight = 0.0;

			for ( int i = 0; i < SAMPLES; i ++ ) {

				// Stratified inverse-CDF sampling of the Gaussian, placed on a golden-angle spiral.
				float stratum = ( float( i ) + 0.5 ) / float( SAMPLES );
				float theta = sigma * sqrt( - 2.0 * log( 1.0 - stratum * truncation ) );
				float phi = float( i ) * GOLDEN_ANGLE;

				vec3 offset = cos( phi ) * tangent + sin( phi ) * bitangent;
				vec3 sampleDirection = cos( theta ) * outputDirection + sin( theta ) * offset;

				// Correct the planar sample density to solid angle.
				float weight = sin( theta ) / theta;

				accumColor += weight * textureLod( envMap, sampleDirection, 0.0 ).rgb;
				accumWeight += weight;

			}

			gl_FragColor = vec4( accumColor / accumWeight, 1.0 );

		}
	`)}function fT(){return ff("PMREMEquirectangularToCubemap",{envMap:{value:null}},`

		varying vec3 vWorldDirection;

		uniform sampler2D envMap;

		#include <common>

		void main() {

			// Average four subpixel samples to preserve small, bright features.
			vec3 direction = normalize( vWorldDirection );
			vec3 dx = dFdx( direction ) * 0.25;
			vec3 dy = dFdy( direction ) * 0.25;

			vec3 color = textureLod( envMap, equirectUv( normalize( direction - dx - dy ) ), 0.0 ).rgb;
			color += textureLod( envMap, equirectUv( normalize( direction + dx - dy ) ), 0.0 ).rgb;
			color += textureLod( envMap, equirectUv( normalize( direction - dx + dy ) ), 0.0 ).rgb;
			color += textureLod( envMap, equirectUv( normalize( direction + dx + dy ) ), 0.0 ).rgb;
			gl_FragColor = vec4( color * 0.25, 1.0 );

		}
	`)}function hT(){return ff("PMREMCubemapToCubemap",{envMap:{value:null},flipEnvMap:{value:-1}},`

		varying vec3 vWorldDirection;

		uniform samplerCube envMap;
		uniform float flipEnvMap;

		void main() {

			gl_FragColor = vec4( textureCube( envMap, vec3( flipEnvMap * vWorldDirection.x, vWorldDirection.yz ) ).rgb, 1.0 );

		}
	`)}function xL(e){let t=new WeakMap,n=new WeakMap,i=null;function a(f,h=!1){return f==null?null:h?s(f):r(f)}function r(f){if(f&&f.isTexture){let h=f.mapping;if(h===up||h===fp)if(t.has(f)){let g=t.get(f).texture;return l(g,f.mapping)}else{let g=f.image;if(g&&g.height>0){let M=new uf(g.height);return M.fromEquirectangularTexture(e,f),t.set(f,M),f.addEventListener("dispose",c),l(M.texture,f.mapping)}else return null}}return f}function s(f){if(f&&f.isTexture&&f.isPMREMTexture!==!0){let h=f.mapping,g=h===up||h===fp,M=h===bo||h===cc;if(g||M){let v=n.get(f),d=v!==void 0?v.texture.pmremVersion:0;if(f.isRenderTargetTexture&&f.pmremVersion!==d)return i===null&&(i=new dc(e)),v=g?i.fromEquirectangular(f,v):i.fromCubemap(f,v),v.texture.pmremVersion=f.pmremVersion,n.set(f,v),v.texture;if(v!==void 0)return v.texture;{let x=f.image;return g&&x&&x.height>0||M&&x&&o(x)?(i===null&&(i=new dc(e)),v=g?i.fromEquirectangular(f):i.fromCubemap(f),v.texture.pmremVersion=f.pmremVersion,n.set(f,v),f.addEventListener("dispose",u),v.texture):null}}}return f}function l(f,h){return h===up?f.mapping=bo:h===fp&&(f.mapping=cc),f}function o(f){let h=0,g=6;for(let M=0;M<g;M++)f[M]!==void 0&&h++;return h===g}function c(f){let h=f.target;h.removeEventListener("dispose",c);let g=t.get(h);g!==void 0&&(t.delete(h),g.dispose())}function u(f){let h=f.target;h.removeEventListener("dispose",u);let g=n.get(h);g!==void 0&&(n.delete(h),g.dispose())}function p(){t=new WeakMap,n=new WeakMap,i!==null&&(i.dispose(),i=null)}return{get:a,dispose:p}}function yL(e){let t={};function n(i){if(t[i]!==void 0)return t[i];let a=e.getExtension(i);return t[i]=a,a}return{has:function(i){return n(i)!==null},init:function(){n("EXT_color_buffer_float"),n("WEBGL_clip_cull_distance"),n("OES_texture_float_linear"),n("EXT_color_buffer_half_float"),n("WEBGL_multisampled_render_to_texture"),n("WEBGL_render_shared_exponent")},get:function(i){let a=n(i);return a===null&&po("WebGLRenderer: "+i+" extension not supported."),a}}}function _L(e,t,n,i){let a={},r=new WeakMap,s=new FinalizationRegistry(g=>delete a[g]);function l(g){o(g.target)}function o(g){g.index!==null&&t.remove(g.index);for(let v in g.attributes)t.remove(g.attributes[v]);g.removeEventListener("dispose",l),delete a[g.id],s.unregister(g);let M=r.get(g);M&&(t.remove(M),r.delete(g)),i.releaseStatesOfGeometry(g),g.isInstancedBufferGeometry===!0&&delete g._maxInstanceCount,n.memory.geometries--}function c(g,M){return a[M.id]!==void 0||(M.addEventListener("dispose",l),a[M.id]=new WeakRef(M),s.register(M,M.id,M),n.memory.geometries++),M}function u(g){let M=g.attributes;for(let v in M)t.update(M[v],e.ARRAY_BUFFER)}function p(g){let M=g.index,v=g.attributes.position,d=0;if(v===void 0)return;let x=M!==null?M.array.length:v.array.length/3-1,b=v.count>=65535?Ou:Iu,y=new b(Math.ceil(x/3)*6,1),w=y.array;if(M!==null){let m=M.array;d=M.version;for(let S=0,C=0;S<x;S+=3){let D=m[S+0],R=m[S+1],Z=m[S+2];w[C++]=D,w[C++]=R,w[C++]=R,w[C++]=Z,w[C++]=Z,w[C++]=D}}else{d=v.version;for(let m=0,S=0;m<x;m+=3){let C=m+0,D=m+1,R=m+2;w[S++]=C,w[S++]=D,w[S++]=D,w[S++]=R,w[S++]=R,w[S++]=C}}y.version=d;let T=r.get(g);T&&t.remove(T),r.set(g,y)}function f(g){let M=r.get(g);if(M){let v=g.index;v!==null&&M.version<v.version&&p(g)}else p(g);return r.get(g)}function h(){for(let g in a){let M=a[g].deref();M!==void 0&&o(M)}}return{get:c,update:u,getWireframeAttribute:f,dispose:h}}function bL(e,t,n){let i;function a(p){i=p}let r,s;function l(p){r=p.type,s=p.bytesPerElement}function o(p,f){e.drawElements(i,f,r,p*s),n.update(f,i,1)}function c(p,f,h){h!==0&&(e.drawElementsInstanced(i,f,r,p*s,h),n.update(f,i,h))}function u(p,f,h){if(h===0)return;t.get("WEBGL_multi_draw").multiDrawElementsWEBGL(i,f,0,r,p,0,h);let M=0;for(let v=0;v<h;v++)M+=f[v];n.update(M,i,1)}this.setMode=a,this.setIndex=l,this.render=o,this.renderInstances=c,this.renderMultiDraw=u}function SL(e){let t={geometries:0,textures:0},n={frame:0,calls:0,triangles:0,points:0,lines:0};function i(r,s,l){switch(n.calls++,s){case e.TRIANGLES:n.triangles+=l*(r/3);break;case e.LINES:n.lines+=l*(r/2);break;case e.LINE_STRIP:n.lines+=l*(r-1);break;case e.LINE_LOOP:n.lines+=l*r;break;case e.POINTS:n.points+=l*r;break;default:ue("WebGLInfo: Unknown draw mode:",s);break}}function a(){n.calls=0,n.triangles=0,n.points=0,n.lines=0}return{memory:t,render:n,programs:null,autoReset:!0,reset:a,update:i}}function ML(e,t,n){let i=new WeakMap,a=new cn;function r(s,l,o){let c=s.morphTargetInfluences,u=l.morphAttributes.position||l.morphAttributes.normal||l.morphAttributes.color,p=u!==void 0?u.length:0,f=i.get(l);if(f===void 0||f.count!==p){let C=function(){m.dispose(),i.delete(l),l.removeEventListener("dispose",C)};f!==void 0&&f.texture.dispose();let h=l.morphAttributes.position!==void 0,g=l.morphAttributes.normal!==void 0,M=l.morphAttributes.color!==void 0,v=l.morphAttributes.position||[],d=l.morphAttributes.normal||[],x=l.morphAttributes.color||[],b=0;h===!0&&(b=1),g===!0&&(b=2),M===!0&&(b=3);let y=l.attributes.position.count*b,w=1;y>t.maxTextureSize&&(w=Math.ceil(y/t.maxTextureSize),y=t.maxTextureSize);let T=new Float32Array(y*w*4*p),m=new Uu(T,y,w,p);m.type=Ea,m.needsUpdate=!0;let S=b*4;for(let D=0;D<p;D++){let R=v[D],Z=d[D],tt=x[D],z=y*w*4*D;for(let J=0;J<R.count;J++){let j=J*S;h===!0&&(a.fromBufferAttribute(R,J),T[z+j+0]=a.x,T[z+j+1]=a.y,T[z+j+2]=a.z,T[z+j+3]=0),g===!0&&(a.fromBufferAttribute(Z,J),T[z+j+4]=a.x,T[z+j+5]=a.y,T[z+j+6]=a.z,T[z+j+7]=0),M===!0&&(a.fromBufferAttribute(tt,J),T[z+j+8]=a.x,T[z+j+9]=a.y,T[z+j+10]=a.z,T[z+j+11]=tt.itemSize===4?a.w:1)}}f={count:p,texture:m,size:new Ot(y,w)},i.set(l,f),l.addEventListener("dispose",C)}if(s.isInstancedMesh===!0&&s.morphTexture!==null)o.getUniforms().setValue(e,"morphTexture",s.morphTexture,n);else{let h=0;for(let M=0;M<c.length;M++)h+=c[M];let g=l.morphTargetsRelative?1:1-h;o.getUniforms().setValue(e,"morphTargetBaseInfluence",g),o.getUniforms().setValue(e,"morphTargetInfluences",c)}o.getUniforms().setValue(e,"morphTargetsTexture",f.texture,n),o.getUniforms().setValue(e,"morphTargetsTextureSize",f.size)}return{update:r}}function EL(e,t,n,i,a){let r=new WeakMap;function s(c){let u=a.render.frame,p=c.geometry,f=t.get(c,p);if(r.get(f)!==u&&(t.update(f),r.set(f,u)),c.isInstancedMesh&&(c.hasEventListener("dispose",o)===!1&&c.addEventListener("dispose",o),r.get(c)!==u&&(n.update(c.instanceMatrix,e.ARRAY_BUFFER),c.instanceColor!==null&&n.update(c.instanceColor,e.ARRAY_BUFFER),r.set(c,u))),c.isSkinnedMesh){let h=c.skeleton;r.get(h)!==u&&(h.update(),r.set(h,u))}return f}function l(){r=new WeakMap}function o(c){let u=c.target;u.removeEventListener("dispose",o),i.releaseStatesOfObject(u),n.remove(u.instanceMatrix),u.instanceColor!==null&&n.remove(u.instanceColor)}return{update:s,dispose:l}}var TL={[ux]:"LINEAR_TONE_MAPPING",[fx]:"REINHARD_TONE_MAPPING",[hx]:"CINEON_TONE_MAPPING",[dx]:"ACES_FILMIC_TONE_MAPPING",[mx]:"AGX_TONE_MAPPING",[$u]:"NEUTRAL_TONE_MAPPING",[px]:"CUSTOM_TONE_MAPPING"};function wL(e,t,n,i,a,r){let s=new Vi(t,n,{type:e,depthBuffer:a,stencilBuffer:r,samples:i?4:0,storeMultisampledDepthBuffer:!1,storeMultisampledStencilBuffer:!1,resolveDepthBuffer:!1,resolveStencilBuffer:!1}),l=null,o=null,c=null,u=new ki;u.setAttribute("position",new bn([-1,3,0,-1,-1,0,3,-1,0],3)),u.setAttribute("uv",new bn([0,2,0,0,2,0],2));let p=new Yd({uniforms:{tDiffuse:{value:null}},vertexShader:`
			precision highp float;

			uniform mat4 modelViewMatrix;
			uniform mat4 projectionMatrix;

			attribute vec3 position;
			attribute vec2 uv;

			varying vec2 vUv;

			void main() {
				vUv = uv;
				gl_Position = projectionMatrix * modelViewMatrix * vec4( position, 1.0 );
			}`,fragmentShader:`
			precision highp float;

			uniform sampler2D tDiffuse;

			varying vec2 vUv;

			#include <tonemapping_pars_fragment>
			#include <colorspace_pars_fragment>

			void main() {
				gl_FragColor = texture2D( tDiffuse, vUv );

				#ifdef LINEAR_TONE_MAPPING
					gl_FragColor.rgb = LinearToneMapping( gl_FragColor.rgb );
				#elif defined( REINHARD_TONE_MAPPING )
					gl_FragColor.rgb = ReinhardToneMapping( gl_FragColor.rgb );
				#elif defined( CINEON_TONE_MAPPING )
					gl_FragColor.rgb = CineonToneMapping( gl_FragColor.rgb );
				#elif defined( ACES_FILMIC_TONE_MAPPING )
					gl_FragColor.rgb = ACESFilmicToneMapping( gl_FragColor.rgb );
				#elif defined( AGX_TONE_MAPPING )
					gl_FragColor.rgb = AgXToneMapping( gl_FragColor.rgb );
				#elif defined( NEUTRAL_TONE_MAPPING )
					gl_FragColor.rgb = NeutralToneMapping( gl_FragColor.rgb );
				#elif defined( CUSTOM_TONE_MAPPING )
					gl_FragColor.rgb = CustomToneMapping( gl_FragColor.rgb );
				#endif

				#ifdef SRGB_TRANSFER
					gl_FragColor = sRGBTransferOETF( gl_FragColor );
				#endif
			}`,depthTest:!1,depthWrite:!1}),f=new wn(u,p),h=new Ku(-1,1,1,-1,0,1),g=null,M=null,v=!1,d,x=null,b=[],y=!1;this.setSize=function(w,T){s.setSize(w,T),l!==null&&l.setSize(w,T),o!==null&&o.setSize(w,T);for(let m=0;m<b.length;m++){let S=b[m];S.setSize&&S.setSize(w,T)}},this.setEffects=function(w){b=w,y=b.length>0&&b[0].isRenderPass===!0;let T=s.width,m=s.height;b.length>0&&l===null&&(l=new Vi(T,m,{type:Ta,depthBuffer:!1,stencilBuffer:!1}),o=new Vi(T,m,{type:Ta,depthBuffer:!1,stencilBuffer:!1}));let S=a===!0&&b.some(C=>C.needsDepthTexture===!0);S!==(s.depthTexture!==null)&&(S===!0&&c===null&&(c=new Lr(T,m),r===!0&&(c.format=Ur,c.type=So)),s.dispose(),s.depthTexture=S?c:null,s.resolveDepthBuffer=S,s.storeMultisampledDepthBuffer=S);for(let C=0;C<b.length;C++){let D=b[C];D.setSize&&D.setSize(T,m),S&&D.needsDepthTexture===!0&&D.setDepthTexture&&D.setDepthTexture(c)}},this.begin=function(w,T){if(v||w.toneMapping===$a&&b.length===0)return!1;if(x=T,T!==null){let m=T.width,S=T.height;(s.width!==m||s.height!==S)&&this.setSize(m,S)}return y===!1&&w.setRenderTarget(s),d=w.toneMapping,w.toneMapping=$a,!0},this.hasRenderPass=function(){return y},this.end=function(w,T){w.toneMapping=d,v=!0;let m=s,S=l;for(let C=0;C<b.length;C++){let D=b[C];D.enabled!==!1&&(D.render(w,S,m,T),D.needsSwap!==!1&&(m=S,S=S===l?o:l))}if(g!==w.outputColorSpace||M!==w.toneMapping){g=w.outputColorSpace,M=w.toneMapping,p.defines={},Ne.getTransfer(g)===Ge&&(p.defines.SRGB_TRANSFER="");let C=TL[M];C&&(p.defines[C]=""),p.needsUpdate=!0}p.uniforms.tDiffuse.value=m.texture,w.setRenderTarget(x),w.render(f,h),x=null,v=!1},this.isCompositing=function(){return v},this.dispose=function(){s.dispose(),l!==null&&l.dispose(),o!==null&&o.dispose(),u.dispose(),p.dispose()}}var IT=new ui,OT=new Lr(1,1),PT=new Fu(1),zT=new Uu,FT=new Hd,BT=new zu,dT=[],pT=[],mT=new Float32Array(16),gT=new Float32Array(9),vT=new Float32Array(4);function pc(e,t,n){let i=e[0];if(i<=0||i>0)return e;let a=t*n,r=dT[a];if(r===void 0&&(r=new Float32Array(a),dT[a]=r),t!==0){i.toArray(r,0);for(let s=1,l=0;s!==t;++s)l+=n,e[s].toArray(r,l)}return r}function An(e,t){if(e.length!==t.length)return!1;for(let n=0,i=e.length;n<i;n++)if(e[n]!==t[n])return!1;return!0}function Rn(e,t){for(let n=0,i=t.length;n<i;n++)e[n]=t[n]}function $p(e,t){let n=pT[t];n===void 0&&(n=new Int32Array(t),pT[t]=n);for(let i=0;i!==t;++i)n[i]=e.allocateTextureUnit();return n}function AL(e,t){let n=this.cache;n[0]!==t&&(e.uniform1f(this.addr,t),n[0]=t)}function RL(e,t){let n=this.cache;if(t.x!==void 0)(n[0]!==t.x||n[1]!==t.y)&&(e.uniform2f(this.addr,t.x,t.y),n[0]=t.x,n[1]=t.y);else{if(An(n,t))return;e.uniform2fv(this.addr,t),Rn(n,t)}}function CL(e,t){let n=this.cache;if(t.x!==void 0)(n[0]!==t.x||n[1]!==t.y||n[2]!==t.z)&&(e.uniform3f(this.addr,t.x,t.y,t.z),n[0]=t.x,n[1]=t.y,n[2]=t.z);else if(t.r!==void 0)(n[0]!==t.r||n[1]!==t.g||n[2]!==t.b)&&(e.uniform3f(this.addr,t.r,t.g,t.b),n[0]=t.r,n[1]=t.g,n[2]=t.b);else{if(An(n,t))return;e.uniform3fv(this.addr,t),Rn(n,t)}}function DL(e,t){let n=this.cache;if(t.x!==void 0)(n[0]!==t.x||n[1]!==t.y||n[2]!==t.z||n[3]!==t.w)&&(e.uniform4f(this.addr,t.x,t.y,t.z,t.w),n[0]=t.x,n[1]=t.y,n[2]=t.z,n[3]=t.w);else{if(An(n,t))return;e.uniform4fv(this.addr,t),Rn(n,t)}}function NL(e,t){let n=this.cache,i=t.elements;if(i===void 0){if(An(n,t))return;e.uniformMatrix2fv(this.addr,!1,t),Rn(n,t)}else{if(An(n,i))return;vT.set(i),e.uniformMatrix2fv(this.addr,!1,vT),Rn(n,i)}}function LL(e,t){let n=this.cache,i=t.elements;if(i===void 0){if(An(n,t))return;e.uniformMatrix3fv(this.addr,!1,t),Rn(n,t)}else{if(An(n,i))return;gT.set(i),e.uniformMatrix3fv(this.addr,!1,gT),Rn(n,i)}}function UL(e,t){let n=this.cache,i=t.elements;if(i===void 0){if(An(n,t))return;e.uniformMatrix4fv(this.addr,!1,t),Rn(n,t)}else{if(An(n,i))return;mT.set(i),e.uniformMatrix4fv(this.addr,!1,mT),Rn(n,i)}}function IL(e,t){let n=this.cache;n[0]!==t&&(e.uniform1i(this.addr,t),n[0]=t)}function OL(e,t){let n=this.cache;if(t.x!==void 0)(n[0]!==t.x||n[1]!==t.y)&&(e.uniform2i(this.addr,t.x,t.y),n[0]=t.x,n[1]=t.y);else{if(An(n,t))return;e.uniform2iv(this.addr,t),Rn(n,t)}}function PL(e,t){let n=this.cache;if(t.x!==void 0)(n[0]!==t.x||n[1]!==t.y||n[2]!==t.z)&&(e.uniform3i(this.addr,t.x,t.y,t.z),n[0]=t.x,n[1]=t.y,n[2]=t.z);else{if(An(n,t))return;e.uniform3iv(this.addr,t),Rn(n,t)}}function zL(e,t){let n=this.cache;if(t.x!==void 0)(n[0]!==t.x||n[1]!==t.y||n[2]!==t.z||n[3]!==t.w)&&(e.uniform4i(this.addr,t.x,t.y,t.z,t.w),n[0]=t.x,n[1]=t.y,n[2]=t.z,n[3]=t.w);else{if(An(n,t))return;e.uniform4iv(this.addr,t),Rn(n,t)}}function FL(e,t){let n=this.cache;n[0]!==t&&(e.uniform1ui(this.addr,t),n[0]=t)}function BL(e,t){let n=this.cache;if(t.x!==void 0)(n[0]!==t.x||n[1]!==t.y)&&(e.uniform2ui(this.addr,t.x,t.y),n[0]=t.x,n[1]=t.y);else{if(An(n,t))return;e.uniform2uiv(this.addr,t),Rn(n,t)}}function HL(e,t){let n=this.cache;if(t.x!==void 0)(n[0]!==t.x||n[1]!==t.y||n[2]!==t.z)&&(e.uniform3ui(this.addr,t.x,t.y,t.z),n[0]=t.x,n[1]=t.y,n[2]=t.z);else{if(An(n,t))return;e.uniform3uiv(this.addr,t),Rn(n,t)}}function GL(e,t){let n=this.cache;if(t.x!==void 0)(n[0]!==t.x||n[1]!==t.y||n[2]!==t.z||n[3]!==t.w)&&(e.uniform4ui(this.addr,t.x,t.y,t.z,t.w),n[0]=t.x,n[1]=t.y,n[2]=t.z,n[3]=t.w);else{if(An(n,t))return;e.uniform4uiv(this.addr,t),Rn(n,t)}}function tm(e){return e.version===0&&(e.compareFunction=wx,e.needsUpdate=!0),e}function VL(e,t,n){let i=this.cache,a=n.allocateTextureUnit();i[0]!==a&&(e.uniform1i(this.addr,a),i[0]=a);let r;this.type===e.SAMPLER_2D_SHADOW?r=tm(OT):r=IT,n.setTexture2D(t||r,a)}function kL(e,t,n){let i=this.cache,a=n.allocateTextureUnit();i[0]!==a&&(e.uniform1i(this.addr,a),i[0]=a),n.setTexture3D(t||FT,a)}function XL(e,t,n){let i=this.cache,a=n.allocateTextureUnit();i[0]!==a&&(e.uniform1i(this.addr,a),i[0]=a);let r;this.type===e.SAMPLER_CUBE_SHADOW?r=tm(PT):r=BT,n.setTextureCube(t||r,a)}function WL(e,t,n){let i=this.cache,a=n.allocateTextureUnit();i[0]!==a&&(e.uniform1i(this.addr,a),i[0]=a),n.setTexture2DArray(t||zT,a)}function qL(e){switch(e){case 5126:return AL;case 35664:return RL;case 35665:return CL;case 35666:return DL;case 35674:return NL;case 35675:return LL;case 35676:return UL;case 5124:case 35670:return IL;case 35667:case 35671:return OL;case 35668:case 35672:return PL;case 35669:case 35673:return zL;case 5125:return FL;case 36294:return BL;case 36295:return HL;case 36296:return GL;case 35678:case 36198:case 36298:case 36306:case 35682:return VL;case 35679:case 36299:case 36307:return kL;case 35680:case 36300:case 36308:case 36293:return XL;case 36289:case 36303:case 36311:case 36292:return WL}}function YL(e,t){e.uniform1fv(this.addr,t)}function ZL(e,t){let n=pc(t,this.size,2);e.uniform2fv(this.addr,n)}function JL(e,t){let n=pc(t,this.size,3);e.uniform3fv(this.addr,n)}function KL(e,t){let n=pc(t,this.size,4);e.uniform4fv(this.addr,n)}function jL(e,t){let n=pc(t,this.size,4);e.uniformMatrix2fv(this.addr,!1,n)}function QL(e,t){let n=pc(t,this.size,9);e.uniformMatrix3fv(this.addr,!1,n)}function $L(e,t){let n=pc(t,this.size,16);e.uniformMatrix4fv(this.addr,!1,n)}function tU(e,t){e.uniform1iv(this.addr,t)}function eU(e,t){e.uniform2iv(this.addr,t)}function nU(e,t){e.uniform3iv(this.addr,t)}function iU(e,t){e.uniform4iv(this.addr,t)}function aU(e,t){e.uniform1uiv(this.addr,t)}function rU(e,t){e.uniform2uiv(this.addr,t)}function sU(e,t){e.uniform3uiv(this.addr,t)}function oU(e,t){e.uniform4uiv(this.addr,t)}function lU(e,t,n){let i=this.cache,a=t.length,r=$p(n,a);An(i,r)||(e.uniform1iv(this.addr,r),Rn(i,r));let s;this.type===e.SAMPLER_2D_SHADOW?s=tm(OT):s=IT;for(let l=0;l!==a;++l)n.setTexture2D(t[l]||s,r[l])}function cU(e,t,n){let i=this.cache,a=t.length,r=$p(n,a);An(i,r)||(e.uniform1iv(this.addr,r),Rn(i,r));for(let s=0;s!==a;++s)n.setTexture3D(t[s]||FT,r[s])}function uU(e,t,n){let i=this.cache,a=t.length,r=$p(n,a);An(i,r)||(e.uniform1iv(this.addr,r),Rn(i,r));let s;this.type===e.SAMPLER_CUBE_SHADOW?s=tm(PT):s=BT;for(let l=0;l!==a;++l)n.setTextureCube(t[l]||s,r[l])}function fU(e,t,n){let i=this.cache,a=t.length,r=$p(n,a);An(i,r)||(e.uniform1iv(this.addr,r),Rn(i,r));for(let s=0;s!==a;++s)n.setTexture2DArray(t[s]||zT,r[s])}function hU(e){switch(e){case 5126:return YL;case 35664:return ZL;case 35665:return JL;case 35666:return KL;case 35674:return jL;case 35675:return QL;case 35676:return $L;case 5124:case 35670:return tU;case 35667:case 35671:return eU;case 35668:case 35672:return nU;case 35669:case 35673:return iU;case 5125:return aU;case 36294:return rU;case 36295:return sU;case 36296:return oU;case 35678:case 36198:case 36298:case 36306:case 35682:return lU;case 35679:case 36299:case 36307:return cU;case 35680:case 36300:case 36308:case 36293:return uU;case 36289:case 36303:case 36311:case 36292:return fU}}var Vx=class{constructor(t,n,i){this.id=t,this.addr=i,this.cache=[],this.type=n.type,this.setValue=qL(n.type)}},kx=class{constructor(t,n,i){this.id=t,this.addr=i,this.cache=[],this.type=n.type,this.size=n.size,this.setValue=hU(n.type)}},Xx=class{constructor(t){this.id=t,this.seq=[],this.map={}}setValue(t,n,i){let a=this.seq;for(let r=0,s=a.length;r!==s;++r){let l=a[r];l.setValue(t,n[l.id],i)}}},Hx=/(\w+)(\])?(\[|\.)?/g;function xT(e,t){e.seq.push(t),e.map[t.id]=t}function dU(e,t,n){let i=e.name,a=i.length;for(Hx.lastIndex=0;;){let r=Hx.exec(i),s=Hx.lastIndex,l=r[1],o=r[2]==="]",c=r[3];if(o&&(l=l|0),c===void 0||c==="["&&s+2===a){xT(n,c===void 0?new Vx(l,e,t):new kx(l,e,t));break}else{let p=n.map[l];p===void 0&&(p=new Xx(l),xT(n,p)),n=p}}}var hc=class{constructor(t,n){this.seq=[],this.map={};let i=t.getProgramParameter(n,t.ACTIVE_UNIFORMS);for(let s=0;s<i;++s){let l=t.getActiveUniform(n,s),o=t.getUniformLocation(n,l.name);dU(l,o,this)}let a=[],r=[];for(let s of this.seq)s.type===t.SAMPLER_2D_SHADOW||s.type===t.SAMPLER_CUBE_SHADOW||s.type===t.SAMPLER_2D_ARRAY_SHADOW?a.push(s):r.push(s);a.length>0&&(this.seq=a.concat(r))}setValue(t,n,i,a){let r=this.map[n];r!==void 0&&r.setValue(t,i,a)}setOptional(t,n,i){let a=n[i];a!==void 0&&this.setValue(t,i,a)}static upload(t,n,i,a){for(let r=0,s=n.length;r!==s;++r){let l=n[r],o=i[l.id];o.needsUpdate!==!1&&l.setValue(t,o.value,a)}}static seqWithValue(t,n){let i=[];for(let a=0,r=t.length;a!==r;++a){let s=t[a];s.id in n&&i.push(s)}return i}};function yT(e,t,n){let i=e.createShader(t);return e.shaderSource(i,n),e.compileShader(i),i}var pU=37297,mU=0;function gU(e,t){let n=e.split(`
`),i=[],a=Math.max(t-6,0),r=Math.min(t+6,n.length);for(let s=a;s<r;s++){let l=s+1;i.push(`${l===t?">":" "} ${l}: ${n[s]}`)}return i.join(`
`)}var _T=new de;function vU(e){Ne._getMatrix(_T,Ne.workingColorSpace,e);let t=`mat3( ${_T.elements.map(n=>n.toFixed(4))} )`;switch(Ne.getTransfer(e)){case Nu:return[t,"LinearTransferOETF"];case Ge:return[t,"sRGBTransferOETF"];default:return ce("WebGLProgram: Unsupported color space: ",e),[t,"LinearTransferOETF"]}}function bT(e,t,n){let i=e.getShaderParameter(t,e.COMPILE_STATUS),r=(e.getShaderInfoLog(t)||"").trim();if(i&&r==="")return"";let s=/ERROR: 0:(\d+)/.exec(r);if(s){let l=parseInt(s[1]);return n.toUpperCase()+`

`+r+`

`+gU(e.getShaderSource(t),l)}else return r}function xU(e,t){let n=vU(t);return[`vec4 ${e}( vec4 value ) {`,`	return ${n[1]}( vec4( ${n[0]} * value.rgb, value.a ) );`,"}"].join(`
`)}var yU={[ux]:"Linear",[fx]:"Reinhard",[hx]:"Cineon",[dx]:"ACESFilmic",[mx]:"AgX",[$u]:"Neutral",[px]:"Custom"};function _U(e,t){let n=yU[t];return n===void 0?(ce("WebGLProgram: Unsupported toneMapping:",t),"vec3 "+e+"( vec3 color ) { return LinearToneMapping( color ); }"):"vec3 "+e+"( vec3 color ) { return "+n+"ToneMapping( color ); }"}var jp=new q;function bU(){Ne.getLuminanceCoefficients(jp);let e=jp.x.toFixed(4),t=jp.y.toFixed(4),n=jp.z.toFixed(4);return["float luminance( const in vec3 rgb ) {",`	const vec3 weights = vec3( ${e}, ${t}, ${n} );`,"	return dot( weights, rgb );","}"].join(`
`)}function SU(e){return[e.extensionClipCullDistance?"#extension GL_ANGLE_clip_cull_distance : require":"",e.extensionMultiDraw?"#extension GL_ANGLE_multi_draw : require":""].filter(cf).join(`
`)}function MU(e){let t=[];for(let n in e){let i=e[n];i!==!1&&t.push("#define "+n+" "+i)}return t.join(`
`)}function EU(e,t){let n={},i=e.getProgramParameter(t,e.ACTIVE_ATTRIBUTES);for(let a=0;a<i;a++){let r=e.getActiveAttrib(t,a),s=r.name,l=1;r.type===e.FLOAT_MAT2&&(l=2),r.type===e.FLOAT_MAT3&&(l=3),r.type===e.FLOAT_MAT4&&(l=4),n[s]={type:r.type,location:e.getAttribLocation(t,s),locationSize:l}}return n}function cf(e){return e!==""}function ST(e,t){let n=t.numSpotLightShadows+t.numSpotLightMaps-t.numSpotLightShadowsWithMaps;return e.replace(/NUM_SUN_LIGHTS/g,t.numSunLights).replace(/NUM_DIR_LIGHTS/g,t.numDirLights).replace(/NUM_SPOT_LIGHTS/g,t.numSpotLights).replace(/NUM_SPOT_LIGHT_MAPS/g,t.numSpotLightMaps).replace(/NUM_SPOT_LIGHT_COORDS/g,n).replace(/NUM_RECT_AREA_LIGHTS/g,t.numRectAreaLights).replace(/NUM_POINT_LIGHTS/g,t.numPointLights).replace(/NUM_HEMI_LIGHTS/g,t.numHemiLights).replace(/NUM_SUN_LIGHT_SHADOWS/g,t.numSunLightShadows).replace(/NUM_DIR_LIGHT_SHADOWS/g,t.numDirLightShadows).replace(/NUM_SPOT_LIGHT_SHADOWS_WITH_MAPS/g,t.numSpotLightShadowsWithMaps).replace(/NUM_SPOT_LIGHT_SHADOWS/g,t.numSpotLightShadows).replace(/NUM_POINT_LIGHT_SHADOWS/g,t.numPointLightShadows).replace(/NUM_LIGHT_PROBE_GRIDS/g,t.numLightProbeGrids)}function MT(e,t){return e.replace(/NUM_CLIPPING_PLANES/g,t.numClippingPlanes).replace(/UNION_CLIPPING_PLANES/g,t.numClippingPlanes-t.numClipIntersection)}var TU=/^[ \t]*#include +<([\w\d./]+)>/gm;function Wx(e){return e.replace(TU,wU)}function wU(e,t){let n=be[t];if(n===void 0)throw new Error("THREE.WebGLProgram: Can not resolve #include <"+t+">");return Wx(n)}var AU=/#pragma unroll_loop_start\s+for\s*\(\s*int\s+i\s*=\s*(\d+)\s*;\s*i\s*<\s*(\d+)\s*;\s*i\s*\+\+\s*\)\s*{([\s\S]+?)}\s+#pragma unroll_loop_end/g;function ET(e){return e.replace(AU,RU)}function RU(e,t,n,i){let a="";for(let r=parseInt(t);r<parseInt(n);r++)a+=i.replace(/\[\s*i\s*\]/g,"[ "+r+" ]").replace(/UNROLLED_LOOP_INDEX/g,r);return a}function TT(e){let t=`precision ${e.precision} float;
	precision ${e.precision} int;
	precision ${e.precision} sampler2D;
	precision ${e.precision} samplerCube;
	precision ${e.precision} sampler3D;
	precision ${e.precision} sampler2DArray;
	precision ${e.precision} sampler2DShadow;
	precision ${e.precision} samplerCubeShadow;
	precision ${e.precision} sampler2DArrayShadow;
	precision ${e.precision} isampler2D;
	precision ${e.precision} isampler3D;
	precision ${e.precision} isamplerCube;
	precision ${e.precision} isampler2DArray;
	precision ${e.precision} usampler2D;
	precision ${e.precision} usampler3D;
	precision ${e.precision} usamplerCube;
	precision ${e.precision} usampler2DArray;
	`;return e.precision==="highp"?t+=`
#define HIGH_PRECISION`:e.precision==="mediump"?t+=`
#define MEDIUM_PRECISION`:e.precision==="lowp"&&(t+=`
#define LOW_PRECISION`),t}var CU={[Qu]:"SHADOWMAP_TYPE_PCF",[oc]:"SHADOWMAP_TYPE_VSM"};function DU(e){return CU[e.shadowMapType]||"SHADOWMAP_TYPE_BASIC"}var NU={[cc]:"ENVMAP_MODE_REFRACTION"};function LU(e){return e.envMap===!1?"ENVMAP_MODE_REFLECTION":NU[e.envMapMode]||"ENVMAP_MODE_REFLECTION"}var UU={[cx]:"ENVMAP_BLENDING_MULTIPLY",[FE]:"ENVMAP_BLENDING_MIX",[BE]:"ENVMAP_BLENDING_ADD"};function IU(e){return e.envMap===!1?"ENVMAP_BLENDING_NONE":UU[e.combine]||"ENVMAP_BLENDING_NONE"}function OU(e,t,n,i){let a=e.getContext(),r=n.defines,s=n.vertexShader,l=n.fragmentShader,o=DU(n),c=n.envMapPMREM===!0?"ENVMAP_TYPE_PMREM":"ENVMAP_TYPE_CUBE",u=LU(n),p=IU(n),f=SU(n),h=MU(r),g=a.createProgram(),M,v,d=n.glslVersion?"#version "+n.glslVersion+`
`:"";n.isRawShaderMaterial?(M=["#define SHADER_TYPE "+n.shaderType,"#define SHADER_NAME "+n.shaderName,h].filter(cf).join(`
`),M.length>0&&(M+=`
`),v=["#define SHADER_TYPE "+n.shaderType,"#define SHADER_NAME "+n.shaderName,h].filter(cf).join(`
`),v.length>0&&(v+=`
`)):(M=[TT(n),"#define SHADER_TYPE "+n.shaderType,"#define SHADER_NAME "+n.shaderName,h,n.extensionClipCullDistance?"#define USE_CLIP_DISTANCE":"",n.batching?"#define USE_BATCHING":"",n.batchingColor?"#define USE_BATCHING_COLOR":"",n.instancing?"#define USE_INSTANCING":"",n.instancingColor?"#define USE_INSTANCING_COLOR":"",n.instancingMorph?"#define USE_INSTANCING_MORPH":"",n.useFog&&n.fog?"#define USE_FOG":"",n.useFog&&n.fogExp2?"#define FOG_EXP2":"",n.map?"#define USE_MAP":"",n.envMap?"#define USE_ENVMAP":"",n.envMap?"#define "+u:"",n.lightMap?"#define USE_LIGHTMAP":"",n.aoMap?"#define USE_AOMAP":"",n.bumpMap?"#define USE_BUMPMAP":"",n.normalMap?"#define USE_NORMALMAP":"",n.normalMapObjectSpace?"#define USE_NORMALMAP_OBJECTSPACE":"",n.normalMapTangentSpace?"#define USE_NORMALMAP_TANGENTSPACE":"",n.displacementMap?"#define USE_DISPLACEMENTMAP":"",n.emissiveMap?"#define USE_EMISSIVEMAP":"",n.anisotropy?"#define USE_ANISOTROPY":"",n.anisotropyMap?"#define USE_ANISOTROPYMAP":"",n.clearcoatMap?"#define USE_CLEARCOATMAP":"",n.clearcoatRoughnessMap?"#define USE_CLEARCOAT_ROUGHNESSMAP":"",n.clearcoatNormalMap?"#define USE_CLEARCOAT_NORMALMAP":"",n.diffuseRoughnessMap?"#define USE_DIFFUSE_ROUGHNESSMAP":"",n.iridescenceMap?"#define USE_IRIDESCENCEMAP":"",n.iridescenceThicknessMap?"#define USE_IRIDESCENCE_THICKNESSMAP":"",n.specularMap?"#define USE_SPECULARMAP":"",n.specularColorMap?"#define USE_SPECULAR_COLORMAP":"",n.specularIntensityMap?"#define USE_SPECULAR_INTENSITYMAP":"",n.roughnessMap?"#define USE_ROUGHNESSMAP":"",n.metalnessMap?"#define USE_METALNESSMAP":"",n.alphaMap?"#define USE_ALPHAMAP":"",n.alphaHash?"#define USE_ALPHAHASH":"",n.transmission?"#define USE_TRANSMISSION":"",n.transmissionMap?"#define USE_TRANSMISSIONMAP":"",n.thicknessMap?"#define USE_THICKNESSMAP":"",n.sheenColorMap?"#define USE_SHEEN_COLORMAP":"",n.sheenRoughnessMap?"#define USE_SHEEN_ROUGHNESSMAP":"",n.mapUv?"#define MAP_UV "+n.mapUv:"",n.alphaMapUv?"#define ALPHAMAP_UV "+n.alphaMapUv:"",n.lightMapUv?"#define LIGHTMAP_UV "+n.lightMapUv:"",n.aoMapUv?"#define AOMAP_UV "+n.aoMapUv:"",n.emissiveMapUv?"#define EMISSIVEMAP_UV "+n.emissiveMapUv:"",n.bumpMapUv?"#define BUMPMAP_UV "+n.bumpMapUv:"",n.normalMapUv?"#define NORMALMAP_UV "+n.normalMapUv:"",n.displacementMapUv?"#define DISPLACEMENTMAP_UV "+n.displacementMapUv:"",n.metalnessMapUv?"#define METALNESSMAP_UV "+n.metalnessMapUv:"",n.roughnessMapUv?"#define ROUGHNESSMAP_UV "+n.roughnessMapUv:"",n.anisotropyMapUv?"#define ANISOTROPYMAP_UV "+n.anisotropyMapUv:"",n.clearcoatMapUv?"#define CLEARCOATMAP_UV "+n.clearcoatMapUv:"",n.clearcoatNormalMapUv?"#define CLEARCOAT_NORMALMAP_UV "+n.clearcoatNormalMapUv:"",n.clearcoatRoughnessMapUv?"#define CLEARCOAT_ROUGHNESSMAP_UV "+n.clearcoatRoughnessMapUv:"",n.diffuseRoughnessMapUv?"#define DIFFUSE_ROUGHNESSMAP_UV "+n.diffuseRoughnessMapUv:"",n.iridescenceMapUv?"#define IRIDESCENCEMAP_UV "+n.iridescenceMapUv:"",n.iridescenceThicknessMapUv?"#define IRIDESCENCE_THICKNESSMAP_UV "+n.iridescenceThicknessMapUv:"",n.sheenColorMapUv?"#define SHEEN_COLORMAP_UV "+n.sheenColorMapUv:"",n.sheenRoughnessMapUv?"#define SHEEN_ROUGHNESSMAP_UV "+n.sheenRoughnessMapUv:"",n.specularMapUv?"#define SPECULARMAP_UV "+n.specularMapUv:"",n.specularColorMapUv?"#define SPECULAR_COLORMAP_UV "+n.specularColorMapUv:"",n.specularIntensityMapUv?"#define SPECULAR_INTENSITYMAP_UV "+n.specularIntensityMapUv:"",n.transmissionMapUv?"#define TRANSMISSIONMAP_UV "+n.transmissionMapUv:"",n.thicknessMapUv?"#define THICKNESSMAP_UV "+n.thicknessMapUv:"",n.vertexTangents&&n.flatShading===!1?"#define USE_TANGENT":"",n.vertexNormals?"#define HAS_NORMAL":"",n.vertexColors?"#define USE_COLOR":"",n.vertexAlphas?"#define USE_COLOR_ALPHA":"",n.vertexUv1s?"#define USE_UV1":"",n.vertexUv2s?"#define USE_UV2":"",n.vertexUv3s?"#define USE_UV3":"",n.pointsUvs?"#define USE_POINTS_UV":"",n.flatShading?"#define FLAT_SHADED":"",n.skinning?"#define USE_SKINNING":"",n.morphTargets?"#define USE_MORPHTARGETS":"",n.morphNormals&&n.flatShading===!1?"#define USE_MORPHNORMALS":"",n.morphColors?"#define USE_MORPHCOLORS":"",n.morphTargetsCount>0?"#define MORPHTARGETS_TEXTURE_STRIDE "+n.morphTextureStride:"",n.morphTargetsCount>0?"#define MORPHTARGETS_COUNT "+n.morphTargetsCount:"",n.doubleSided?"#define DOUBLE_SIDED":"",n.flipSided?"#define FLIP_SIDED":"",n.shadowMapEnabled?"#define USE_SHADOWMAP":"",n.shadowMapEnabled?"#define "+o:"",n.sizeAttenuation?"#define USE_SIZEATTENUATION":"",n.numLightProbes>0?"#define USE_LIGHT_PROBES":"",n.logarithmicDepthBuffer?"#define USE_LOGARITHMIC_DEPTH_BUFFER":"",n.reversedDepthBuffer?"#define USE_REVERSED_DEPTH_BUFFER":"","uniform mat4 modelMatrix;","uniform mat4 modelViewMatrix;","uniform mat4 projectionMatrix;","uniform mat4 viewMatrix;","uniform mat3 normalMatrix;","uniform vec3 cameraPosition;","uniform bool isOrthographic;","#ifdef USE_INSTANCING","	attribute mat4 instanceMatrix;","#endif","#ifdef USE_INSTANCING_COLOR","	attribute vec3 instanceColor;","#endif","#ifdef USE_INSTANCING_MORPH","	uniform sampler2D morphTexture;","#endif","attribute vec3 position;","attribute vec3 normal;","attribute vec2 uv;","#ifdef USE_UV1","	attribute vec2 uv1;","#endif","#ifdef USE_UV2","	attribute vec2 uv2;","#endif","#ifdef USE_UV3","	attribute vec2 uv3;","#endif","#ifdef USE_TANGENT","	attribute vec4 tangent;","#endif","#if defined( USE_COLOR_ALPHA )","	attribute vec4 color;","#elif defined( USE_COLOR )","	attribute vec3 color;","#endif","#ifdef USE_SKINNING","	attribute vec4 skinIndex;","	attribute vec4 skinWeight;","#endif",`
`].filter(cf).join(`
`),v=[TT(n),"#define SHADER_TYPE "+n.shaderType,"#define SHADER_NAME "+n.shaderName,h,n.useFog&&n.fog?"#define USE_FOG":"",n.useFog&&n.fogExp2?"#define FOG_EXP2":"",n.alphaToCoverage?"#define ALPHA_TO_COVERAGE":"",n.map?"#define USE_MAP":"",n.matcap?"#define USE_MATCAP":"",n.envMap?"#define USE_ENVMAP":"",n.envMap?"#define "+c:"",n.envMap?"#define "+u:"",n.envMap?"#define "+p:"",n.envMapPMREM?"#define ENVMAP_MAX_LOD "+n.envMapMaxLod+".0":"",n.envMapPMREM?"#define ENVMAP_SIZE "+n.envMapSize+".0":"",n.lightMap?"#define USE_LIGHTMAP":"",n.aoMap?"#define USE_AOMAP":"",n.bumpMap?"#define USE_BUMPMAP":"",n.normalMap?"#define USE_NORMALMAP":"",n.normalMapObjectSpace?"#define USE_NORMALMAP_OBJECTSPACE":"",n.normalMapTangentSpace?"#define USE_NORMALMAP_TANGENTSPACE":"",n.packedNormalMap?"#define USE_PACKED_NORMALMAP":"",n.emissiveMap?"#define USE_EMISSIVEMAP":"",n.anisotropy?"#define USE_ANISOTROPY":"",n.anisotropyMap?"#define USE_ANISOTROPYMAP":"",n.clearcoat?"#define USE_CLEARCOAT":"",n.clearcoatMap?"#define USE_CLEARCOATMAP":"",n.clearcoatRoughnessMap?"#define USE_CLEARCOAT_ROUGHNESSMAP":"",n.clearcoatNormalMap?"#define USE_CLEARCOAT_NORMALMAP":"",n.diffuseRoughness?"#define USE_DIFFUSE_ROUGHNESS":"",n.diffuseRoughnessMap?"#define USE_DIFFUSE_ROUGHNESSMAP":"",n.dispersion?"#define USE_DISPERSION":"",n.retroreflection?"#define USE_RETROREFLECTION":"",n.iridescence?"#define USE_IRIDESCENCE":"",n.iridescenceMap?"#define USE_IRIDESCENCEMAP":"",n.iridescenceThicknessMap?"#define USE_IRIDESCENCE_THICKNESSMAP":"",n.specularMap?"#define USE_SPECULARMAP":"",n.specularColorMap?"#define USE_SPECULAR_COLORMAP":"",n.specularIntensityMap?"#define USE_SPECULAR_INTENSITYMAP":"",n.roughnessMap?"#define USE_ROUGHNESSMAP":"",n.metalnessMap?"#define USE_METALNESSMAP":"",n.alphaMap?"#define USE_ALPHAMAP":"",n.alphaTest?"#define USE_ALPHATEST":"",n.alphaHash?"#define USE_ALPHAHASH":"",n.sheen?"#define USE_SHEEN":"",n.sheenColorMap?"#define USE_SHEEN_COLORMAP":"",n.sheenRoughnessMap?"#define USE_SHEEN_ROUGHNESSMAP":"",n.transmission?"#define USE_TRANSMISSION":"",n.transmissionMap?"#define USE_TRANSMISSIONMAP":"",n.thicknessMap?"#define USE_THICKNESSMAP":"",n.vertexTangents&&n.flatShading===!1?"#define USE_TANGENT":"",n.vertexColors||n.instancingColor?"#define USE_COLOR":"",n.vertexAlphas||n.batchingColor?"#define USE_COLOR_ALPHA":"",n.vertexUv1s?"#define USE_UV1":"",n.vertexUv2s?"#define USE_UV2":"",n.vertexUv3s?"#define USE_UV3":"",n.pointsUvs?"#define USE_POINTS_UV":"",n.gradientMap?"#define USE_GRADIENTMAP":"",n.flatShading?"#define FLAT_SHADED":"",n.doubleSided?"#define DOUBLE_SIDED":"",n.flipSided?"#define FLIP_SIDED":"",n.shadowMapEnabled?"#define USE_SHADOWMAP":"",n.shadowMapEnabled?"#define "+o:"",n.premultipliedAlpha?"#define PREMULTIPLIED_ALPHA":"",n.numLightProbes>0?"#define USE_LIGHT_PROBES":"",n.decodeVideoTexture?"#define DECODE_VIDEO_TEXTURE":"",n.decodeVideoTextureEmissive?"#define DECODE_VIDEO_TEXTURE_EMISSIVE":"",n.logarithmicDepthBuffer?"#define USE_LOGARITHMIC_DEPTH_BUFFER":"",n.reversedDepthBuffer?"#define USE_REVERSED_DEPTH_BUFFER":"","uniform mat4 viewMatrix;","uniform vec3 cameraPosition;","uniform bool isOrthographic;",n.toneMapping!==$a?"#define TONE_MAPPING":"",n.toneMapping!==$a?be.tonemapping_pars_fragment:"",n.toneMapping!==$a?_U("toneMapping",n.toneMapping):"",n.dithering?"#define DITHERING":"",n.opaque?"#define OPAQUE":"",be.colorspace_pars_fragment,xU("linearToOutputTexel",n.outputColorSpace),bU(),n.useDepthPacking?"#define DEPTH_PACKING "+n.depthPacking:"",`
`].filter(cf).join(`
`)),s=Wx(s),s=ST(s,n),s=MT(s,n),l=Wx(l),l=ST(l,n),l=MT(l,n),s=ET(s),l=ET(l),n.isRawShaderMaterial!==!0&&(d=`#version 300 es
`,M=[f,"#define attribute in","#define varying out","#define texture2D texture"].join(`
`)+`
`+M,v=["#define varying in",n.glslVersion===Ax?"":"layout(location = 0) out highp vec4 pc_fragColor;",n.glslVersion===Ax?"":"#define gl_FragColor pc_fragColor","#define gl_FragDepthEXT gl_FragDepth","#define texture2D texture","#define textureCube texture","#define texture2DProj textureProj","#define texture2DLodEXT textureLod","#define texture2DProjLodEXT textureProjLod","#define textureCubeLodEXT textureLod","#define texture2DGradEXT textureGrad","#define texture2DProjGradEXT textureProjGrad","#define textureCubeGradEXT textureGrad"].join(`
`)+`
`+v);let x=d+M+s,b=d+v+l,y=yT(a,a.VERTEX_SHADER,x),w=yT(a,a.FRAGMENT_SHADER,b);a.attachShader(g,y),a.attachShader(g,w),n.index0AttributeName!==void 0?a.bindAttribLocation(g,0,n.index0AttributeName):n.hasPositionAttribute===!0&&a.bindAttribLocation(g,0,"position"),a.linkProgram(g);function T(D){if(e.debug.checkShaderErrors){let R=a.getProgramInfoLog(g)||"",Z=a.getShaderInfoLog(y)||"",tt=a.getShaderInfoLog(w)||"",z=R.trim(),J=Z.trim(),j=tt.trim(),B=!0,ot=!0;if(a.getProgramParameter(g,a.LINK_STATUS)===!1)if(B=!1,typeof e.debug.onShaderError=="function")e.debug.onShaderError(a,g,y,w);else{let k=bT(a,y,"vertex"),Y=bT(a,w,"fragment");ue("WebGLProgram: Shader Error "+a.getError()+" - VALIDATE_STATUS "+a.getProgramParameter(g,a.VALIDATE_STATUS)+`

Material Name: `+D.name+`
Material Type: `+D.type+`

Program Info Log: `+z+`
`+k+`
`+Y)}else z!==""?ce("WebGLProgram: Program Info Log:",z):(J===""||j==="")&&(ot=!1);ot&&(D.diagnostics={runnable:B,programLog:z,vertexShader:{log:J,prefix:M},fragmentShader:{log:j,prefix:v}})}a.deleteShader(y),a.deleteShader(w),m=new hc(a,g),S=EU(a,g)}let m;this.getUniforms=function(){return m===void 0&&T(this),m};let S;this.getAttributes=function(){return S===void 0&&T(this),S};let C=n.rendererExtensionParallelShaderCompile===!1;return this.isReady=function(){return C===!1&&(C=a.getProgramParameter(g,pU)),C},this.destroy=function(){i.releaseStatesOfProgram(this),a.deleteProgram(g),this.program=void 0},this.type=n.shaderType,this.name=n.shaderName,this.id=mU++,this.cacheKey=t,this.usedTimes=1,this.program=g,this.vertexShader=y,this.fragmentShader=w,this}var PU=0,qx=class{constructor(){this.shaderCache=new Map,this.materialCache=new Map}update(t,n,i){let a=this._getShaderCacheForMaterial(t);return a.has(n)===!1&&(a.add(n),n.usedTimes++),a.has(i)===!1&&(a.add(i),i.usedTimes++),this}remove(t){let n=this.materialCache.get(t);for(let i of n)i.usedTimes--,i.usedTimes===0&&this.shaderCache.delete(i.code);return this.materialCache.delete(t),this}getVertexShaderStage(t){return this._getShaderStage(t.vertexShader)}getFragmentShaderStage(t){return this._getShaderStage(t.fragmentShader)}dispose(){this.shaderCache.clear(),this.materialCache.clear()}_getShaderCacheForMaterial(t){let n=this.materialCache,i=n.get(t);return i===void 0&&(i=new Set,n.set(t,i)),i}_getShaderStage(t){let n=this.shaderCache,i=n.get(t);return i===void 0&&(i=new Yx(t),n.set(t,i)),i}},Yx=class{constructor(t){this.id=PU++,this.code=t,this.usedTimes=0}};function zU(e){return e===Ds||e===sf||e===of}function FU(e,t,n,i,a,r){let s=new ql,l=new qx,o=new Set,c=[],u=new Map,p=i.logarithmicDepthBuffer,f={MeshDepthMaterial:"depth",MeshDistanceMaterial:"distance",MeshNormalMaterial:"normal",MeshBasicMaterial:"basic",MeshLambertMaterial:"lambert",MeshPhongMaterial:"phong",MeshToonMaterial:"toon",MeshStandardMaterial:"physical",MeshPhysicalMaterial:"physical",MeshMatcapMaterial:"matcap",LineBasicMaterial:"basic",LineDashedMaterial:"dashed",PointsMaterial:"points",ShadowMaterial:"shadow",SpriteMaterial:"sprite"};function h(m){return o.add(m),m===0?"uv":`uv${m}`}function g(m,S,C,D,R,Z){let tt=D.fog,z=R.geometry,J=m.isMeshStandardMaterial||m.isMeshLambertMaterial||m.isMeshPhongMaterial?D.environment:null,j=m.isMeshStandardMaterial||m.isMeshLambertMaterial&&!m.envMap||m.isMeshPhongMaterial&&!m.envMap,B=t.get(m.envMap||J,j),ot=f[m.type],k=i.precision;m.precision!==null&&(k=i.getMaxPrecision(m.precision),k!==m.precision&&ce("WebGLProgram.getParameters:",m.precision,"not supported, using",k,"instead."));let Y=z.morphAttributes.position||z.morphAttributes.normal||z.morphAttributes.color,N=Y!==void 0?Y.length:0,yt=0;z.morphAttributes.position!==void 0&&(yt=1),z.morphAttributes.normal!==void 0&&(yt=2),z.morphAttributes.color!==void 0&&(yt=3);let Dt,lt,_t,Ct;if(ot){let mt=er[ot];Dt=mt.vertexShader,lt=mt.fragmentShader}else{Dt=m.vertexShader,lt=m.fragmentShader;let mt=l.getVertexShaderStage(m),Gt=l.getFragmentShaderStage(m);l.update(m,mt,Gt),_t=mt.id,Ct=Gt.id}let Ft=e.getRenderTarget(),Lt=e.state.buffers.depth.getReversed(),gt=R.isInstancedMesh===!0,Zt=R.isBatchedMesh===!0,I=!!m.map,jt=!!m.matcap,$t=!!B,ht=$t&&B.isPMREMTexture===!0,Tt=!!m.aoMap,wt=!!m.lightMap,At=!!m.bumpMap&&m.wireframe===!1,Mt=!!m.normalMap,Yt=!!m.displacementMap,zt=!!m.emissiveMap,re=!!m.metalnessMap,Jt=!!m.roughnessMap,Vt=m.anisotropy>0,H=m.clearcoat>0,ie=m.diffuseRoughness>0,Nt=m.dispersion>0,se=m.retroreflectivity>0,K=m.iridescence>0,V=m.sheen>0,Q=m.transmission>0,at=Vt&&!!m.anisotropyMap,E=H&&!!m.clearcoatMap,_=H&&!!m.clearcoatNormalMap,P=H&&!!m.clearcoatRoughnessMap,X=ie&&!!m.diffuseRoughnessMap,it=K&&!!m.iridescenceMap,dt=K&&!!m.iridescenceThicknessMap,xt=V&&!!m.sheenColorMap,$=V&&!!m.sheenRoughnessMap,G=!!m.specularMap,et=!!m.specularColorMap,L=!!m.specularIntensityMap,U=Q&&!!m.transmissionMap,O=Q&&!!m.thicknessMap,st=!!m.gradientMap,ft=!!m.alphaMap,vt=m.alphaTest>0,Ut=!!m.alphaHash,Bt=!!m.extensions,F=$a;m.toneMapped&&(Ft===null||Ft.isXRRenderTarget===!0)&&(F=e.toneMapping);let ct=ht?B.isCompressedCubeTexture?B.image[0].mipmaps:B.mipmaps:null,bt={shaderID:ot,shaderType:m.type,shaderName:m.name,vertexShader:Dt,fragmentShader:lt,defines:m.defines,customVertexShaderID:_t,customFragmentShaderID:Ct,isRawShaderMaterial:m.isRawShaderMaterial===!0,glslVersion:m.glslVersion,precision:k,batching:Zt,batchingColor:Zt&&R._colorsTexture!==null,instancing:gt,instancingColor:gt&&R.instanceColor!==null,instancingMorph:gt&&R.morphTexture!==null,outputColorSpace:Ft===null?e.outputColorSpace:Ft.isXRRenderTarget===!0?Ft.texture.colorSpace:Ne.workingColorSpace,alphaToCoverage:!!m.alphaToCoverage,map:I,matcap:jt,envMap:$t,envMapMode:$t&&B.mapping,envMapPMREM:ht,envMapMaxLod:ht?ct.length-1:null,envMapSize:ht?ct[0].width:null,aoMap:Tt,lightMap:wt,bumpMap:At,normalMap:Mt,displacementMap:Yt,emissiveMap:zt,normalMapObjectSpace:Mt&&m.normalMapType===VE,normalMapTangentSpace:Mt&&m.normalMapType===Jp,packedNormalMap:Mt&&m.normalMapType===Jp&&zU(m.normalMap.format),metalnessMap:re,roughnessMap:Jt,anisotropy:Vt,anisotropyMap:at,clearcoat:H,clearcoatMap:E,clearcoatNormalMap:_,clearcoatRoughnessMap:P,diffuseRoughness:ie,diffuseRoughnessMap:X,dispersion:Nt,retroreflection:se,iridescence:K,iridescenceMap:it,iridescenceThicknessMap:dt,sheen:V,sheenColorMap:xt,sheenRoughnessMap:$,specularMap:G,specularColorMap:et,specularIntensityMap:L,transmission:Q,transmissionMap:U,thicknessMap:O,gradientMap:st,opaque:m.transparent===!1&&m.blending===lc&&m.alphaToCoverage===!1,alphaMap:ft,alphaTest:vt,alphaHash:Ut,combine:m.combine,mapUv:I&&h(m.map.channel),aoMapUv:Tt&&h(m.aoMap.channel),lightMapUv:wt&&h(m.lightMap.channel),bumpMapUv:At&&h(m.bumpMap.channel),normalMapUv:Mt&&h(m.normalMap.channel),displacementMapUv:Yt&&h(m.displacementMap.channel),emissiveMapUv:zt&&h(m.emissiveMap.channel),metalnessMapUv:re&&h(m.metalnessMap.channel),roughnessMapUv:Jt&&h(m.roughnessMap.channel),anisotropyMapUv:at&&h(m.anisotropyMap.channel),clearcoatMapUv:E&&h(m.clearcoatMap.channel),clearcoatNormalMapUv:_&&h(m.clearcoatNormalMap.channel),clearcoatRoughnessMapUv:P&&h(m.clearcoatRoughnessMap.channel),diffuseRoughnessMapUv:X&&h(m.diffuseRoughnessMap.channel),iridescenceMapUv:it&&h(m.iridescenceMap.channel),iridescenceThicknessMapUv:dt&&h(m.iridescenceThicknessMap.channel),sheenColorMapUv:xt&&h(m.sheenColorMap.channel),sheenRoughnessMapUv:$&&h(m.sheenRoughnessMap.channel),specularMapUv:G&&h(m.specularMap.channel),specularColorMapUv:et&&h(m.specularColorMap.channel),specularIntensityMapUv:L&&h(m.specularIntensityMap.channel),transmissionMapUv:U&&h(m.transmissionMap.channel),thicknessMapUv:O&&h(m.thicknessMap.channel),alphaMapUv:ft&&h(m.alphaMap.channel),vertexTangents:!!z.attributes.tangent&&(Mt||Vt),vertexNormals:!!z.attributes.normal,vertexColors:m.vertexColors,vertexAlphas:m.vertexColors===!0&&!!z.attributes.color&&z.attributes.color.itemSize===4,pointsUvs:R.isPoints===!0&&!!z.attributes.uv&&(I||ft),fog:!!tt,useFog:m.fog===!0,fogExp2:!!tt&&tt.isFogExp2,flatShading:m.wireframe===!1&&(m.flatShading===!0||z.attributes.normal===void 0&&Mt===!1&&(m.isMeshLambertMaterial||m.isMeshPhongMaterial||m.isMeshStandardMaterial||m.isMeshPhysicalMaterial)),sizeAttenuation:m.sizeAttenuation===!0,logarithmicDepthBuffer:p,reversedDepthBuffer:Lt,skinning:R.isSkinnedMesh===!0,hasPositionAttribute:z.attributes.position!==void 0,morphTargets:z.morphAttributes.position!==void 0,morphNormals:z.morphAttributes.normal!==void 0,morphColors:z.morphAttributes.color!==void 0,morphTargetsCount:N,morphTextureStride:yt,numSunLights:S.sun.length,numDirLights:S.directional.length,numPointLights:S.point.length,numSpotLights:S.spot.length,numSpotLightMaps:S.spotLightMap.length,numRectAreaLights:S.rectArea.length,numHemiLights:S.hemi.length,numSunLightShadows:S.sunShadowMap.length,numDirLightShadows:S.directionalShadowMap.length,numPointLightShadows:S.pointShadowMap.length,numSpotLightShadows:S.spotShadowMap.length,numSpotLightShadowsWithMaps:S.numSpotLightShadowsWithMaps,numLightProbes:S.numLightProbes,numLightProbeGrids:Z.filter(mt=>mt.texture!==null).length,numClippingPlanes:r.numPlanes,numClipIntersection:r.numIntersection,dithering:m.dithering,shadowMapEnabled:e.shadowMap.enabled&&C.length>0,shadowMapType:e.shadowMap.type,toneMapping:F,decodeVideoTexture:I&&m.map.isVideoTexture===!0&&Ne.getTransfer(m.map.colorSpace)===Ge,decodeVideoTextureEmissive:zt&&m.emissiveMap.isVideoTexture===!0&&Ne.getTransfer(m.emissiveMap.colorSpace)===Ge,premultipliedAlpha:m.premultipliedAlpha,doubleSided:m.side===qi,flipSided:m.side===hi,useDepthPacking:m.depthPacking>=0,depthPacking:m.depthPacking||0,index0AttributeName:m.index0AttributeName,extensionClipCullDistance:Bt&&m.extensions.clipCullDistance===!0&&n.has("WEBGL_clip_cull_distance"),extensionMultiDraw:(Bt&&m.extensions.multiDraw===!0||Zt)&&n.has("WEBGL_multi_draw"),rendererExtensionParallelShaderCompile:n.has("KHR_parallel_shader_compile"),customProgramCacheKey:m.customProgramCacheKey()};return bt.vertexUv1s=o.has(1),bt.vertexUv2s=o.has(2),bt.vertexUv3s=o.has(3),o.clear(),bt}function M(m){let S=[];if(m.shaderID?S.push(m.shaderID):(S.push(m.customVertexShaderID),S.push(m.customFragmentShaderID)),m.defines!==void 0)for(let C in m.defines)S.push(C),S.push(m.defines[C]);return m.isRawShaderMaterial===!1&&(v(S,m),d(S,m),S.push(e.outputColorSpace)),S.push(m.customProgramCacheKey),S.join()}function v(m,S){m.push(S.precision),m.push(S.outputColorSpace),m.push(S.envMapMode),m.push(S.envMapPMREM),m.push(S.envMapMaxLod),m.push(S.envMapSize),m.push(S.mapUv),m.push(S.alphaMapUv),m.push(S.lightMapUv),m.push(S.aoMapUv),m.push(S.bumpMapUv),m.push(S.normalMapUv),m.push(S.displacementMapUv),m.push(S.emissiveMapUv),m.push(S.metalnessMapUv),m.push(S.roughnessMapUv),m.push(S.anisotropyMapUv),m.push(S.clearcoatMapUv),m.push(S.clearcoatNormalMapUv),m.push(S.clearcoatRoughnessMapUv),m.push(S.diffuseRoughnessMapUv),m.push(S.iridescenceMapUv),m.push(S.iridescenceThicknessMapUv),m.push(S.sheenColorMapUv),m.push(S.sheenRoughnessMapUv),m.push(S.specularMapUv),m.push(S.specularColorMapUv),m.push(S.specularIntensityMapUv),m.push(S.transmissionMapUv),m.push(S.thicknessMapUv),m.push(S.combine),m.push(S.fogExp2),m.push(S.sizeAttenuation),m.push(S.morphTargetsCount),m.push(S.numSunLights),m.push(S.numDirLights),m.push(S.numPointLights),m.push(S.numSpotLights),m.push(S.numSpotLightMaps),m.push(S.numHemiLights),m.push(S.numRectAreaLights),m.push(S.numSunLightShadows),m.push(S.numDirLightShadows),m.push(S.numPointLightShadows),m.push(S.numSpotLightShadows),m.push(S.numSpotLightShadowsWithMaps),m.push(S.numLightProbes),m.push(S.numLightProbeGrids),m.push(S.shadowMapType),m.push(S.toneMapping),m.push(S.numClippingPlanes),m.push(S.numClipIntersection),m.push(S.depthPacking)}function d(m,S){s.disableAll(),S.instancing&&s.enable(0),S.instancingColor&&s.enable(1),S.instancingMorph&&s.enable(2),S.matcap&&s.enable(3),S.envMap&&s.enable(4),S.normalMapObjectSpace&&s.enable(5),S.normalMapTangentSpace&&s.enable(6),S.clearcoat&&s.enable(7),S.iridescence&&s.enable(8),S.alphaTest&&s.enable(9),S.vertexColors&&s.enable(10),S.vertexAlphas&&s.enable(11),S.vertexUv1s&&s.enable(12),S.vertexUv2s&&s.enable(13),S.vertexUv3s&&s.enable(14),S.vertexTangents&&s.enable(15),S.anisotropy&&s.enable(16),S.alphaHash&&s.enable(17),S.batching&&s.enable(18),S.dispersion&&s.enable(19),S.retroreflection&&s.enable(24),S.diffuseRoughness&&s.enable(25),S.batchingColor&&s.enable(20),S.gradientMap&&s.enable(21),S.packedNormalMap&&s.enable(22),S.vertexNormals&&s.enable(23),m.push(s.mask),s.disableAll(),S.fog&&s.enable(0),S.useFog&&s.enable(1),S.flatShading&&s.enable(2),S.logarithmicDepthBuffer&&s.enable(3),S.reversedDepthBuffer&&s.enable(4),S.skinning&&s.enable(5),S.morphTargets&&s.enable(6),S.morphNormals&&s.enable(7),S.morphColors&&s.enable(8),S.premultipliedAlpha&&s.enable(9),S.shadowMapEnabled&&s.enable(10),S.doubleSided&&s.enable(11),S.flipSided&&s.enable(12),S.useDepthPacking&&s.enable(13),S.dithering&&s.enable(14),S.transmission&&s.enable(15),S.sheen&&s.enable(16),S.opaque&&s.enable(17),S.pointsUvs&&s.enable(18),S.decodeVideoTexture&&s.enable(19),S.decodeVideoTextureEmissive&&s.enable(20),S.alphaToCoverage&&s.enable(21),S.numLightProbeGrids>0&&s.enable(22),S.hasPositionAttribute&&s.enable(23),m.push(s.mask)}function x(m){let S=f[m.type],C;if(S){let D=er[S];C=sT.clone(D.uniforms)}else C=m.uniforms;return C}function b(m,S){let C=u.get(S);return C!==void 0?++C.usedTimes:(C=new OU(e,S,m,a),c.push(C),u.set(S,C)),C}function y(m){if(--m.usedTimes===0){let S=c.indexOf(m);c[S]=c[c.length-1],c.pop(),u.delete(m.cacheKey),m.destroy()}}function w(m){l.remove(m)}function T(){l.dispose()}return{getParameters:g,getProgramCacheKey:M,getUniforms:x,acquireProgram:b,releaseProgram:y,releaseShaderCache:w,programs:c,dispose:T}}function BU(){let e=new WeakMap;function t(s){return e.has(s)}function n(s){let l=e.get(s);return l===void 0&&(l={},e.set(s,l)),l}function i(s){e.delete(s)}function a(s,l,o){e.get(s)[l]=o}function r(){e=new WeakMap}return{has:t,get:n,remove:i,update:a,dispose:r}}function HU(e,t){return e.groupOrder!==t.groupOrder?e.groupOrder-t.groupOrder:e.renderOrder!==t.renderOrder?e.renderOrder-t.renderOrder:e.material.id!==t.material.id?e.material.id-t.material.id:e.materialVariant!==t.materialVariant?e.materialVariant-t.materialVariant:e.z!==t.z?e.z-t.z:e.id-t.id}function wT(e,t){return e.groupOrder!==t.groupOrder?e.groupOrder-t.groupOrder:e.renderOrder!==t.renderOrder?e.renderOrder-t.renderOrder:e.z!==t.z?t.z-e.z:e.id-t.id}function AT(){let e=[],t=0,n=[],i=[],a=[];function r(){t=0,n.length=0,i.length=0,a.length=0}function s(f){let h=0;return f.isInstancedMesh&&(h+=2),f.isSkinnedMesh&&(h+=1),h}function l(f,h,g,M,v,d){let x=e[t];return x===void 0?(x={id:f.id,object:f,geometry:h,material:g,materialVariant:s(f),groupOrder:M,renderOrder:f.renderOrder,z:v,group:d},e[t]=x):(x.id=f.id,x.object=f,x.geometry=h,x.material=g,x.materialVariant=s(f),x.groupOrder=M,x.renderOrder=f.renderOrder,x.z=v,x.group=d),t++,x}function o(f,h,g,M,v,d,x){x.reversedDepth===!0&&(v=-v);let b=l(f,h,g,M,v,d);g.transmission>0?i.push(b):g.transparent===!0?a.push(b):n.push(b)}function c(f,h,g,M,v,d){let x=l(f,h,g,M,v,d);g.transmission>0?i.unshift(x):g.transparent===!0?a.unshift(x):n.unshift(x)}function u(f,h){n.length>1&&n.sort(f||HU),i.length>1&&i.sort(h||wT),a.length>1&&a.sort(h||wT)}function p(){for(let f=t,h=e.length;f<h;f++){let g=e[f];if(g.id===null)break;g.id=null,g.object=null,g.geometry=null,g.material=null,g.group=null}}return{opaque:n,transmissive:i,transparent:a,init:r,push:o,unshift:c,finish:p,sort:u}}function GU(){let e=new WeakMap;function t(i,a){let r=e.get(i),s;return r===void 0?(s=new AT,e.set(i,[s])):a>=r.length?(s=new AT,r.push(s)):s=r[a],s}function n(){e=new WeakMap}return{get:t,dispose:n}}function VU(){let e={};return{get:function(t){if(e[t.id]!==void 0)return e[t.id];let n;switch(t.type){case"SunLight":case"DirectionalLight":n={direction:new q,color:new me};break;case"SpotLight":n={position:new q,direction:new q,color:new me,distance:0,coneCos:0,penumbraCos:0,decay:0};break;case"PointLight":n={position:new q,color:new me,distance:0,decay:0};break;case"HemisphereLight":n={direction:new q,skyColor:new me,groundColor:new me};break;case"RectAreaLight":n={color:new me,position:new q,halfWidth:new q,halfHeight:new q};break}return e[t.id]=n,n}}}function kU(){let e={};return{get:function(t){if(e[t.id]!==void 0)return e[t.id];let n;switch(t.type){case"SunLight":case"DirectionalLight":n={shadowIntensity:1,shadowBias:0,shadowNormalBias:0,shadowRadius:1,shadowMapSize:new Ot};break;case"SpotLight":n={shadowIntensity:1,shadowBias:0,shadowNormalBias:0,shadowRadius:1,shadowMapSize:new Ot};break;case"PointLight":n={shadowIntensity:1,shadowBias:0,shadowNormalBias:0,shadowRadius:1,shadowMapSize:new Ot,shadowCameraNear:1,shadowCameraFar:1e3};break}return e[t.id]=n,n}}}var XU=0;function WU(e,t){return(t.castShadow?2:0)-(e.castShadow?2:0)+(t.map?1:0)-(e.map?1:0)}function qU(e){let t=new VU,n=kU(),i={version:0,hash:{sunLength:-1,directionalLength:-1,pointLength:-1,spotLength:-1,rectAreaLength:-1,hemiLength:-1,numSunShadows:-1,numDirectionalShadows:-1,numPointShadows:-1,numSpotShadows:-1,numSpotMaps:-1,numLightProbes:-1},ambient:[0,0,0],probe:[],sun:[],sunShadow:[],sunShadowMap:[],sunShadowMatrix:[],sunShadowCascade:[],directional:[],directionalShadow:[],directionalShadowMap:[],directionalShadowMatrix:[],spot:[],spotLightMap:[],spotShadow:[],spotShadowMap:[],spotLightMatrix:[],rectArea:[],rectAreaLTC1:null,rectAreaLTC2:null,point:[],pointShadow:[],pointShadowMap:[],pointShadowMatrix:[],hemi:[],numSpotLightShadowsWithMaps:0,numLightProbes:0};for(let c=0;c<9;c++)i.probe.push(new q);let a=new q,r=new Ye,s=new Ye;function l(c){let u=0,p=0,f=0;for(let Z=0;Z<9;Z++)i.probe[Z].set(0,0,0);let h=0,g=0,M=0,v=0,d=0,x=0,b=0,y=0,w=0,T=0,m=0,S=0,C=0,D=0;c.sort(WU);for(let Z=0,tt=c.length;Z<tt;Z++){let z=c[Z],J=z.color,j=z.intensity,B=z.distance,ot=null;if(z.shadow&&z.shadow.map&&(z.shadow.map.texture.format===Ds?ot=z.shadow.map.texture:ot=z.shadow.map.depthTexture||z.shadow.map.texture),z.isAmbientLight)u+=J.r*j,p+=J.g*j,f+=J.b*j;else if(z.isLightProbe){for(let k=0;k<9;k++)i.probe[k].addScaledVector(z.sh.coefficients[k],j);D++}else if(z.isSunLight){let k=t.get(z);if(k.color.copy(z.color).multiplyScalar(z.intensity),z.castShadow){let Y=z.shadow,N=n.get(z);N.shadowIntensity=Y.intensity,N.shadowBias=Y.bias,N.shadowNormalBias=Y.normalBias,N.shadowRadius=Y.radius,N.shadowMapSize.copy(Y.mapSize).multiply(Y.getFrameExtents()),i.sunShadow[g]=N,i.sunShadowMap[g]=ot;let yt=Y.getViewportCount();for(let Dt=0;Dt<yt;Dt++)i.sunShadowMatrix[M+Dt]=Y.getMatrix(Dt),i.sunShadowCascade[M+Dt]=Y._cascadeData[Dt];M+=yt,g++}i.sun[h]=k,h++}else if(z.isDirectionalLight){let k=t.get(z);if(k.color.copy(z.color).multiplyScalar(z.intensity),z.castShadow){let Y=z.shadow,N=n.get(z);N.shadowIntensity=Y.intensity,N.shadowBias=Y.bias,N.shadowNormalBias=Y.normalBias,N.shadowRadius=Y.radius,N.shadowMapSize=Y.mapSize,i.directionalShadow[v]=N,i.directionalShadowMap[v]=ot,i.directionalShadowMatrix[v]=z.shadow.matrix,w++}i.directional[v]=k,v++}else if(z.isSpotLight){let k=t.get(z);k.position.setFromMatrixPosition(z.matrixWorld),k.color.copy(J).multiplyScalar(j),k.distance=B,k.coneCos=Math.cos(z.angle),k.penumbraCos=Math.cos(z.angle*(1-z.penumbra)),k.decay=z.decay,i.spot[x]=k;let Y=z.shadow;if(z.map&&(i.spotLightMap[S]=z.map,S++,Y.updateMatrices(z),z.castShadow&&C++),i.spotLightMatrix[x]=Y.matrix,z.castShadow){let N=n.get(z);N.shadowIntensity=Y.intensity,N.shadowBias=Y.bias,N.shadowNormalBias=Y.normalBias,N.shadowRadius=Y.radius,N.shadowMapSize=Y.mapSize,i.spotShadow[x]=N,i.spotShadowMap[x]=ot,m++}x++}else if(z.isRectAreaLight){let k=t.get(z);k.color.copy(J).multiplyScalar(j),k.halfWidth.set(z.width*.5,0,0),k.halfHeight.set(0,z.height*.5,0),i.rectArea[b]=k,b++}else if(z.isPointLight){let k=t.get(z);if(k.color.copy(z.color).multiplyScalar(z.intensity),k.distance=z.distance,k.decay=z.decay,z.castShadow){let Y=z.shadow,N=n.get(z);N.shadowIntensity=Y.intensity,N.shadowBias=Y.bias,N.shadowNormalBias=Y.normalBias,N.shadowRadius=Y.radius,N.shadowMapSize=Y.mapSize,N.shadowCameraNear=Y.camera.near,N.shadowCameraFar=Y.camera.far,i.pointShadow[d]=N,i.pointShadowMap[d]=ot,i.pointShadowMatrix[d]=z.shadow.matrix,T++}i.point[d]=k,d++}else if(z.isHemisphereLight){let k=t.get(z);k.skyColor.copy(z.color).multiplyScalar(j),k.groundColor.copy(z.groundColor).multiplyScalar(j),i.hemi[y]=k,y++}}b>0&&(e.has("OES_texture_float_linear")===!0?(i.rectAreaLTC1=Wt.LTC_FLOAT_1,i.rectAreaLTC2=Wt.LTC_FLOAT_2):(i.rectAreaLTC1=Wt.LTC_HALF_1,i.rectAreaLTC2=Wt.LTC_HALF_2)),i.ambient[0]=u,i.ambient[1]=p,i.ambient[2]=f;let R=i.hash;(R.sunLength!==h||R.directionalLength!==v||R.pointLength!==d||R.spotLength!==x||R.rectAreaLength!==b||R.hemiLength!==y||R.numSunShadows!==g||R.numDirectionalShadows!==w||R.numPointShadows!==T||R.numSpotShadows!==m||R.numSpotMaps!==S||R.numLightProbes!==D)&&(i.sun.length=h,i.directional.length=v,i.spot.length=x,i.rectArea.length=b,i.point.length=d,i.hemi.length=y,i.sunShadow.length=g,i.sunShadowMap.length=g,i.sunShadowMatrix.length=M,i.sunShadowCascade.length=M,i.directionalShadow.length=w,i.directionalShadowMap.length=w,i.directionalShadowMatrix.length=w,i.pointShadow.length=T,i.pointShadowMap.length=T,i.pointShadowMatrix.length=T,i.spotShadow.length=m,i.spotShadowMap.length=m,i.spotLightMatrix.length=m+S-C,i.spotLightMap.length=S,i.numSpotLightShadowsWithMaps=C,i.numLightProbes=D,R.sunLength=h,R.directionalLength=v,R.pointLength=d,R.spotLength=x,R.rectAreaLength=b,R.hemiLength=y,R.numSunShadows=g,R.numDirectionalShadows=w,R.numPointShadows=T,R.numSpotShadows=m,R.numSpotMaps=S,R.numLightProbes=D,i.version=XU++)}function o(c,u){let p=0,f=0,h=0,g=0,M=0,v=0,d=u.matrixWorldInverse;for(let x=0,b=c.length;x<b;x++){let y=c[x];if(y.isSunLight){let w=i.sun[p];w.direction.setFromMatrixPosition(y.matrixWorld),w.direction.transformDirection(d),p++}else if(y.isDirectionalLight){let w=i.directional[f];w.direction.setFromMatrixPosition(y.matrixWorld),a.setFromMatrixPosition(y.target.matrixWorld),w.direction.sub(a),w.direction.transformDirection(d),f++}else if(y.isSpotLight){let w=i.spot[g];w.position.setFromMatrixPosition(y.matrixWorld),w.position.applyMatrix4(d),w.direction.setFromMatrixPosition(y.matrixWorld),a.setFromMatrixPosition(y.target.matrixWorld),w.direction.sub(a),w.direction.transformDirection(d),g++}else if(y.isRectAreaLight){let w=i.rectArea[M];w.position.setFromMatrixPosition(y.matrixWorld),w.position.applyMatrix4(d),s.identity(),r.copy(y.matrixWorld),r.premultiply(d),s.extractRotation(r),w.halfWidth.set(y.width*.5,0,0),w.halfHeight.set(0,y.height*.5,0),w.halfWidth.applyMatrix4(s),w.halfHeight.applyMatrix4(s),M++}else if(y.isPointLight){let w=i.point[h];w.position.setFromMatrixPosition(y.matrixWorld),w.position.applyMatrix4(d),h++}else if(y.isHemisphereLight){let w=i.hemi[v];w.direction.setFromMatrixPosition(y.matrixWorld),w.direction.transformDirection(d),v++}}}return{setup:l,setupView:o,state:i}}function RT(e){let t=new qU(e),n=[],i=[],a=[];function r(p){u.camera=p,n.length=0,i.length=0,a.length=0}function s(p){p.isLightProbeGrid?a.push(p):n.push(p)}function l(p){i.push(p)}function o(){t.setup(n),a.sort((p,f)=>p.priority-f.priority||p.id-f.id)}function c(p){t.setupView(n,p)}let u={lightsArray:n,shadowsArray:i,lightProbeGridArray:a,camera:null,lights:t,transmissionRenderTarget:{},textureUnits:0};return{init:r,state:u,setupLights:o,setupLightsView:c,pushLight:s,pushShadow:l}}function YU(e){let t=new WeakMap;function n(a,r=0){let s=t.get(a),l;return s===void 0?(l=new RT(e),t.set(a,[l])):r>=s.length?(l=new RT(e),s.push(l)):l=s[r],l}function i(){t=new WeakMap}return{get:n,dispose:i}}var ZU=`void main() {
	gl_Position = vec4( position, 1.0 );
}`,JU=`uniform sampler2D shadow_pass;
uniform vec2 resolution;
uniform float radius;
void main() {
	const float samples = float( VSM_SAMPLES );
	float mean = 0.0;
	float squared_mean = 0.0;
	float uvStride = samples <= 1.0 ? 0.0 : 2.0 / ( samples - 1.0 );
	float uvStart = samples <= 1.0 ? 0.0 : - 1.0;
	for ( float i = 0.0; i < samples; i ++ ) {
		float uvOffset = uvStart + i * uvStride;
		#ifdef HORIZONTAL_PASS
			vec2 distribution = texture2D( shadow_pass, ( gl_FragCoord.xy + vec2( uvOffset, 0.0 ) * radius ) / resolution ).rg;
			mean += distribution.x;
			squared_mean += distribution.y * distribution.y + distribution.x * distribution.x;
		#else
			float depth = texture2D( shadow_pass, ( gl_FragCoord.xy + vec2( 0.0, uvOffset ) * radius ) / resolution ).r;
			mean += depth;
			squared_mean += depth * depth;
		#endif
	}
	mean = mean / samples;
	squared_mean = squared_mean / samples;
	float std_dev = sqrt( max( 0.0, squared_mean - mean * mean ) );
	gl_FragColor = vec4( mean, std_dev, 0.0, 1.0 );
}`,KU=[new q(1,0,0),new q(-1,0,0),new q(0,1,0),new q(0,-1,0),new q(0,0,1),new q(0,0,-1)],jU=[new q(0,-1,0),new q(0,-1,0),new q(0,0,1),new q(0,0,-1),new q(0,-1,0),new q(0,-1,0)],CT=new Ye,lf=new q,Gx=new q;function QU(e,t,n){let i=new Ms,a=new Ot,r=new Ot,s=new cn,l=new Zd,o=new Jd,c={},u=n.maxTextureSize,p={[Cs]:hi,[hi]:Cs,[qi]:qi},f=new Qa({defines:{VSM_SAMPLES:8},uniforms:{shadow_pass:{value:null},resolution:{value:new Ot},radius:{value:4}},vertexShader:ZU,fragmentShader:JU}),h=f.clone();h.defines.HORIZONTAL_PASS=1;let g=new ki;g.setAttribute("position",new Ti(new Float32Array([-1,-1,.5,3,-1,.5,-1,3,.5]),3));let M=new wn(g,f),v=this;this.enabled=!1,this.autoUpdate=!0,this.needsUpdate=!1,this.type=Qu;let d=this.type;this.render=function(T,m,S){if(v.enabled===!1||v.autoUpdate===!1&&v.needsUpdate===!1||T.length===0)return;this.type===yE&&(ce("WebGLShadowMap: PCFSoftShadowMap has been removed. Using PCFShadowMap instead."),this.type=Qu);let C=e.getRenderTarget(),D=e.getActiveCubeFace(),R=e.getActiveMipmapLevel(),Z=e.state;Z.setBlending(yo),Z.buffers.depth.getReversed()===!0?Z.buffers.color.setClear(0,0,0,0):Z.buffers.color.setClear(1,1,1,1),Z.buffers.depth.setTest(!0),Z.setScissorTest(!1);let tt=d!==this.type;tt&&m.traverse(function(z){z.material&&(Array.isArray(z.material)?z.material.forEach(J=>J.needsUpdate=!0):z.material.needsUpdate=!0)});for(let z=0,J=T.length;z<J;z++){let j=T[z],B=j.shadow;if(B===void 0){ce("WebGLShadowMap:",j,"has no shadow.");continue}if(B.autoUpdate===!1&&B.needsUpdate===!1)continue;a.copy(B.mapSize);let ot=B.getFrameExtents();a.multiply(ot),r.copy(B.mapSize),(a.x>u||a.y>u)&&(a.x>u&&(r.x=Math.floor(u/ot.x),a.x=r.x*ot.x,B.mapSize.x=r.x),a.y>u&&(r.y=Math.floor(u/ot.y),a.y=r.y*ot.y,B.mapSize.y=r.y));let k=e.state.buffers.depth.getReversed();if(B.camera._reversedDepth=k,B.map===null||tt===!0){if(B.map!==null&&(B.map.depthTexture!==null&&(B.map.depthTexture.dispose(),B.map.depthTexture=null),B.map.dispose()),this.type===oc){if(j.isPointLight){ce("WebGLShadowMap: VSM shadow maps are not supported for PointLights. Use PCF or BasicShadowMap instead.");continue}B.map=new Vi(a.x,a.y,{format:Ds,type:Ta,minFilter:qn,magFilter:qn,generateMipmaps:!1}),B.map.texture.name=j.name+".shadowMap",B.map.depthTexture=new Lr(a.x,a.y,Ea),B.map.depthTexture.name=j.name+".shadowMapDepth",B.map.depthTexture.format=Dr,B.map.depthTexture.compareFunction=null,B.map.depthTexture.minFilter=In,B.map.depthTexture.magFilter=In}else j.isPointLight?(B.map=new uf(a.x),B.map.depthTexture=new Fu(a.x,Ma)):(B.map=new Vi(a.x,a.y),B.map.depthTexture=new Lr(a.x,a.y,Ma)),B.map.depthTexture.name=j.name+".shadowMap",B.map.depthTexture.format=Dr,this.type===Qu?(B.map.depthTexture.compareFunction=k?Tx:Ex,B.map.depthTexture.minFilter=qn,B.map.depthTexture.magFilter=qn):(B.map.depthTexture.compareFunction=null,B.map.depthTexture.minFilter=In,B.map.depthTexture.magFilter=In);B.camera.updateProjectionMatrix()}B.map.isWebGLCubeRenderTarget!==!0&&(B.map.width!==a.x||B.map.height!==a.y)&&B.map.setSize(a.x,a.y);let Y=B.map.isWebGLCubeRenderTarget?6:B.getViewportCount();j.isPointLight!==!0&&B.updateMatrices(j,S);let N=(B.camera.layers.mask&4294967294)!==0?B.camera.layers:S.layers;for(let yt=0;yt<Y;yt++){let Dt=B.getCamera(yt);if(j.isPointLight){let lt=B.camera,_t=B.matrix,Ct=j.distance||lt.far;Ct!==lt.far&&(lt.far=Ct,lt.updateProjectionMatrix()),lf.setFromMatrixPosition(j.matrixWorld),lt.position.copy(lf),Gx.copy(lt.position),Gx.add(KU[yt]),lt.up.copy(jU[yt]),lt.lookAt(Gx),lt.updateMatrixWorld(),_t.makeTranslation(-lf.x,-lf.y,-lf.z),CT.multiplyMatrices(lt.projectionMatrix,lt.matrixWorldInverse),B._frustum.setFromProjectionMatrix(CT,lt.coordinateSystem,lt.reversedDepth)}if(B.map.isWebGLCubeRenderTarget)e.setRenderTarget(B.map,yt),e.clear();else{yt===0&&(e.setRenderTarget(B.map),e.clear());let lt=B.getViewport(yt);s.set(r.x*lt.x,r.y*lt.y,r.x*lt.z,r.y*lt.w),Z.viewport(s)}i=B.getFrustum(yt),y(m,S,Dt,j,N,this.type)}B.isPointLightShadow!==!0&&this.type===oc&&x(B,S),B.needsUpdate=!1}d=this.type,v.needsUpdate=!1,e.setRenderTarget(C,D,R)};function x(T,m){let S=t.update(M);f.defines.VSM_SAMPLES!==T.blurSamples&&(f.defines.VSM_SAMPLES=T.blurSamples,h.defines.VSM_SAMPLES=T.blurSamples,f.needsUpdate=!0,h.needsUpdate=!0),T.mapPass===null?T.mapPass=new Vi(a.x,a.y,{format:Ds,type:Ta}):(T.mapPass.width!==T.map.width||T.mapPass.height!==T.map.height)&&T.mapPass.setSize(T.map.width,T.map.height),f.uniforms.shadow_pass.value=T.map.depthTexture,f.uniforms.resolution.value.set(T.map.width,T.map.height),f.uniforms.radius.value=T.radius,e.setRenderTarget(T.mapPass),e.clear(),e.renderBufferDirect(m,null,S,f,M,null),h.uniforms.shadow_pass.value=T.mapPass.texture,h.uniforms.resolution.value.set(T.map.width,T.map.height),h.uniforms.radius.value=T.radius,e.setRenderTarget(T.map),e.clear(),e.renderBufferDirect(m,null,S,h,M,null)}function b(T,m,S,C){let D=null,R=S.isPointLight===!0?T.customDistanceMaterial:T.customDepthMaterial;if(R!==void 0)D=R;else if(D=S.isPointLight===!0?o:l,e.localClippingEnabled&&m.clipShadows===!0&&Array.isArray(m.clippingPlanes)&&m.clippingPlanes.length!==0||m.displacementMap&&m.displacementScale!==0||m.alphaMap&&m.alphaTest>0||m.map&&m.alphaTest>0||m.alphaToCoverage===!0){let Z=D.uuid,tt=m.uuid,z=c[Z];z===void 0&&(z={},c[Z]=z);let J=z[tt];J===void 0&&(J=D.clone(),z[tt]=J,m.addEventListener("dispose",w)),D=J}if(D.visible=m.visible,D.wireframe=m.wireframe,C===oc?D.side=m.shadowSide!==null?m.shadowSide:m.side:D.side=m.shadowSide!==null?m.shadowSide:p[m.side],D.alphaMap=m.alphaMap,D.alphaTest=m.alphaToCoverage===!0?.5:m.alphaTest,D.map=m.map,D.clipShadows=m.clipShadows,D.clippingPlanes=m.clippingPlanes,D.clipIntersection=m.clipIntersection,D.displacementMap=m.displacementMap,D.displacementScale=m.displacementScale,D.displacementBias=m.displacementBias,D.wireframeLinewidth=m.wireframeLinewidth,D.linewidth=m.linewidth,S.isPointLight===!0&&D.isMeshDistanceMaterial===!0){let Z=e.properties.get(D);Z.light=S}return D}function y(T,m,S,C,D,R){if(T.visible===!1)return;if(T.layers.test(D)&&(T.isMesh||T.isLine||T.isPoints)&&(T.castShadow||T.receiveShadow&&R===oc)&&(!T.frustumCulled||T.intersectsFrustum(i))){T.modelViewMatrix.multiplyMatrices(S.matrixWorldInverse,T.matrixWorld);let z=t.update(T),J=T.material;if(Array.isArray(J)){let j=z.groups;for(let B=0,ot=j.length;B<ot;B++){let k=j[B],Y=J[k.materialIndex];if(Y&&Y.visible){let N=b(T,Y,C,R);T.onBeforeShadow(e,T,m,S,z,N,k),e.renderBufferDirect(S,null,z,N,T,k),T.onAfterShadow(e,T,m,S,z,N,k)}}}else if(J.visible){let j=b(T,J,C,R);T.onBeforeShadow(e,T,m,S,z,j,null),e.renderBufferDirect(S,null,z,j,T,null),T.onAfterShadow(e,T,m,S,z,j,null)}}let tt=T.children;for(let z=0,J=tt.length;z<J;z++)y(tt[z],m,S,C,D,R)}function w(T){T.target.removeEventListener("dispose",w);for(let S in c){let C=c[S],D=T.target.uuid;D in C&&(C[D].dispose(),delete C[D])}}}function $U(e,t){function n(){let L=!1,U=new cn,O=null,st=new cn(0,0,0,0);return{setMask:function(ft){O!==ft&&!L&&(e.colorMask(ft,ft,ft,ft),O=ft)},setLocked:function(ft){L=ft},setClear:function(ft,vt,Ut,Bt,F){F===!0&&(ft*=Bt,vt*=Bt,Ut*=Bt),U.set(ft,vt,Ut,Bt),st.equals(U)===!1&&(e.clearColor(ft,vt,Ut,Bt),st.copy(U))},reset:function(){L=!1,O=null,st.set(-1,0,0,0)}}}function i(){let L=!1,U=!1,O=null,st=null,ft=null;return{setReversed:function(vt){if(U!==vt){let Ut=t.get("EXT_clip_control");vt?Ut.clipControlEXT(Ut.LOWER_LEFT_EXT,Ut.ZERO_TO_ONE_EXT):Ut.clipControlEXT(Ut.LOWER_LEFT_EXT,Ut.NEGATIVE_ONE_TO_ONE_EXT),U=vt;let Bt=ft;ft=null,this.setClear(Bt)}},getReversed:function(){return U},setTest:function(vt){vt?Lt(e.DEPTH_TEST):gt(e.DEPTH_TEST)},setMask:function(vt){O!==vt&&!L&&(e.depthMask(vt),O=vt)},setFunc:function(vt){if(U&&(vt=$E[vt]),st!==vt){switch(vt){case Rd:e.depthFunc(e.NEVER);break;case Cd:e.depthFunc(e.ALWAYS);break;case Dd:e.depthFunc(e.LESS);break;case Vl:e.depthFunc(e.LEQUAL);break;case Nd:e.depthFunc(e.EQUAL);break;case Ld:e.depthFunc(e.GEQUAL);break;case Ud:e.depthFunc(e.GREATER);break;case Id:e.depthFunc(e.NOTEQUAL);break;default:e.depthFunc(e.LEQUAL)}st=vt}},setLocked:function(vt){L=vt},setClear:function(vt){ft!==vt&&(ft=vt,U&&(vt=1-vt),e.clearDepth(vt))},reset:function(){L=!1,O=null,st=null,ft=null,U=!1}}}function a(){let L=!1,U=null,O=null,st=null,ft=null,vt=null,Ut=null,Bt=null,F=null;return{setTest:function(ct){L||(ct?Lt(e.STENCIL_TEST):gt(e.STENCIL_TEST))},setMask:function(ct){U!==ct&&!L&&(e.stencilMask(ct),U=ct)},setFunc:function(ct,bt,mt){(O!==ct||st!==bt||ft!==mt)&&(e.stencilFunc(ct,bt,mt),O=ct,st=bt,ft=mt)},setOp:function(ct,bt,mt){(vt!==ct||Ut!==bt||Bt!==mt)&&(e.stencilOp(ct,bt,mt),vt=ct,Ut=bt,Bt=mt)},setLocked:function(ct){L=ct},setClear:function(ct){F!==ct&&(e.clearStencil(ct),F=ct)},reset:function(){L=!1,U=null,O=null,st=null,ft=null,vt=null,Ut=null,Bt=null,F=null}}}let r=new n,s=new i,l=new a,o={},c=new WeakMap,u={},p={},f={},h=new WeakMap,g=[],M=null,v=!1,d=null,x=null,b=null,y=null,w=null,T=null,m=null,S=new me(0,0,0),C=0,D=!1,R=null,Z=null,tt=null,z=null,J=null,j=e.getParameter(e.MAX_COMBINED_TEXTURE_IMAGE_UNITS),B=!1,ot=0,k=e.getParameter(e.VERSION);k.indexOf("WebGL")!==-1?(ot=parseFloat(/^WebGL (\d)/.exec(k)[1]),B=ot>=1):k.indexOf("OpenGL ES")!==-1&&(ot=parseFloat(/^OpenGL ES (\d)/.exec(k)[1]),B=ot>=2);let Y=null,N={},yt=e.getParameter(e.SCISSOR_BOX),Dt=e.getParameter(e.VIEWPORT),lt=new cn().fromArray(yt),_t=new cn().fromArray(Dt);function Ct(L,U,O,st){let ft=new Uint8Array(4),vt=e.createTexture();e.bindTexture(L,vt),e.texParameteri(L,e.TEXTURE_MIN_FILTER,e.NEAREST),e.texParameteri(L,e.TEXTURE_MAG_FILTER,e.NEAREST);for(let Ut=0;Ut<O;Ut++)L===e.TEXTURE_3D||L===e.TEXTURE_2D_ARRAY?e.texImage3D(U,0,e.RGBA,1,1,st,0,e.RGBA,e.UNSIGNED_BYTE,ft):e.texImage2D(U+Ut,0,e.RGBA,1,1,0,e.RGBA,e.UNSIGNED_BYTE,ft);return vt}let Ft={};Ft[e.TEXTURE_2D]=Ct(e.TEXTURE_2D,e.TEXTURE_2D,1),Ft[e.TEXTURE_CUBE_MAP]=Ct(e.TEXTURE_CUBE_MAP,e.TEXTURE_CUBE_MAP_POSITIVE_X,6),Ft[e.TEXTURE_2D_ARRAY]=Ct(e.TEXTURE_2D_ARRAY,e.TEXTURE_2D_ARRAY,1,1),Ft[e.TEXTURE_3D]=Ct(e.TEXTURE_3D,e.TEXTURE_3D,1,1),r.setClear(0,0,0,1),s.setClear(1),l.setClear(0),Lt(e.DEPTH_TEST),s.setFunc(Vl),At(!1),Mt(ix),Lt(e.CULL_FACE),Tt(yo);function Lt(L){u[L]!==!0&&(e.enable(L),u[L]=!0)}function gt(L){u[L]!==!1&&(e.disable(L),u[L]=!1)}function Zt(L,U){return f[L]!==U?(e.bindFramebuffer(L,U),f[L]=U,L===e.DRAW_FRAMEBUFFER&&(f[e.FRAMEBUFFER]=U),L===e.FRAMEBUFFER&&(f[e.DRAW_FRAMEBUFFER]=U),!0):!1}function I(L,U){let O=g,st=!1;if(L){O=h.get(U),O===void 0&&(O=[],h.set(U,O));let ft=L.textures;if(O.length!==ft.length||O[0]!==e.COLOR_ATTACHMENT0){for(let vt=0,Ut=ft.length;vt<Ut;vt++)O[vt]=e.COLOR_ATTACHMENT0+vt;O.length=ft.length,st=!0}}else O[0]!==e.BACK&&(O[0]=e.BACK,st=!0);st&&e.drawBuffers(O)}function jt(L){return M!==L?(e.useProgram(L),M=L,!0):!1}let $t={[_o]:e.FUNC_ADD,[bE]:e.FUNC_SUBTRACT,[SE]:e.FUNC_REVERSE_SUBTRACT};$t[ME]=e.MIN,$t[EE]=e.MAX;let ht={[TE]:e.ZERO,[wE]:e.ONE,[AE]:e.SRC_COLOR,[ox]:e.SRC_ALPHA,[UE]:e.SRC_ALPHA_SATURATE,[NE]:e.DST_COLOR,[CE]:e.DST_ALPHA,[RE]:e.ONE_MINUS_SRC_COLOR,[lx]:e.ONE_MINUS_SRC_ALPHA,[LE]:e.ONE_MINUS_DST_COLOR,[DE]:e.ONE_MINUS_DST_ALPHA,[IE]:e.CONSTANT_COLOR,[OE]:e.ONE_MINUS_CONSTANT_COLOR,[PE]:e.CONSTANT_ALPHA,[zE]:e.ONE_MINUS_CONSTANT_ALPHA};function Tt(L,U,O,st,ft,vt,Ut,Bt,F,ct){if(L===yo){v===!0&&(gt(e.BLEND),v=!1);return}if(v===!1&&(Lt(e.BLEND),v=!0),L!==_E){if(L!==d||ct!==D){if((x!==_o||w!==_o)&&(e.blendEquation(e.FUNC_ADD),x=_o,w=_o),ct)switch(L){case lc:e.blendFuncSeparate(e.ONE,e.ONE_MINUS_SRC_ALPHA,e.ONE,e.ONE_MINUS_SRC_ALPHA);break;case ax:e.blendFunc(e.ONE,e.ONE);break;case rx:e.blendFuncSeparate(e.ZERO,e.ONE_MINUS_SRC_COLOR,e.ZERO,e.ONE);break;case sx:e.blendFuncSeparate(e.DST_COLOR,e.ONE_MINUS_SRC_ALPHA,e.ZERO,e.ONE);break;default:ue("WebGLState: Invalid blending: ",L);break}else switch(L){case lc:e.blendFuncSeparate(e.SRC_ALPHA,e.ONE_MINUS_SRC_ALPHA,e.ONE,e.ONE_MINUS_SRC_ALPHA);break;case ax:e.blendFuncSeparate(e.SRC_ALPHA,e.ONE,e.ONE,e.ONE);break;case rx:ue("WebGLState: SubtractiveBlending requires material.premultipliedAlpha = true");break;case sx:ue("WebGLState: MultiplyBlending requires material.premultipliedAlpha = true");break;default:ue("WebGLState: Invalid blending: ",L);break}b=null,y=null,T=null,m=null,S.set(0,0,0),C=0,d=L,D=ct}return}ft=ft||U,vt=vt||O,Ut=Ut||st,(U!==x||ft!==w)&&(e.blendEquationSeparate($t[U],$t[ft]),x=U,w=ft),(O!==b||st!==y||vt!==T||Ut!==m)&&(e.blendFuncSeparate(ht[O],ht[st],ht[vt],ht[Ut]),b=O,y=st,T=vt,m=Ut),(Bt.equals(S)===!1||F!==C)&&(e.blendColor(Bt.r,Bt.g,Bt.b,F),S.copy(Bt),C=F),d=L,D=!1}function wt(L,U){L.side===qi?gt(e.CULL_FACE):Lt(e.CULL_FACE);let O=L.side===hi;U&&(O=!O),At(O),L.blending===lc&&L.transparent===!1?Tt(yo):Tt(L.blending,L.blendEquation,L.blendSrc,L.blendDst,L.blendEquationAlpha,L.blendSrcAlpha,L.blendDstAlpha,L.blendColor,L.blendAlpha,L.premultipliedAlpha),s.setFunc(L.depthFunc),s.setTest(L.depthTest),s.setMask(L.depthWrite),r.setMask(L.colorWrite);let st=L.stencilWrite;l.setTest(st),st&&(l.setMask(L.stencilWriteMask),l.setFunc(L.stencilFunc,L.stencilRef,L.stencilFuncMask),l.setOp(L.stencilFail,L.stencilZFail,L.stencilZPass)),zt(L.polygonOffset,L.polygonOffsetFactor,L.polygonOffsetUnits),L.alphaToCoverage===!0?Lt(e.SAMPLE_ALPHA_TO_COVERAGE):gt(e.SAMPLE_ALPHA_TO_COVERAGE)}function At(L){R!==L&&(L?e.frontFace(e.CW):e.frontFace(e.CCW),R=L)}function Mt(L){L!==vE?(Lt(e.CULL_FACE),L!==Z&&(L===ix?e.cullFace(e.BACK):L===xE?e.cullFace(e.FRONT):e.cullFace(e.FRONT_AND_BACK))):gt(e.CULL_FACE),Z=L}function Yt(L){L!==tt&&(B&&e.lineWidth(L),tt=L)}function zt(L,U,O){L?(Lt(e.POLYGON_OFFSET_FILL),(z!==U||J!==O)&&(z=U,J=O,s.getReversed()&&(U=-U,O=-O),e.polygonOffset(U,O))):gt(e.POLYGON_OFFSET_FILL)}function re(L){L?Lt(e.SCISSOR_TEST):gt(e.SCISSOR_TEST)}function Jt(L){L===void 0&&(L=e.TEXTURE0+j-1),Y!==L&&(e.activeTexture(L),Y=L)}function Vt(L,U,O){O===void 0&&(Y===null?O=e.TEXTURE0+j-1:O=Y);let st=N[O];st===void 0&&(st={type:void 0,texture:void 0},N[O]=st),(st.type!==L||st.texture!==U)&&(Y!==O&&(e.activeTexture(O),Y=O),e.bindTexture(L,U||Ft[L]),st.type=L,st.texture=U)}function H(){let L=N[Y];L!==void 0&&L.type!==void 0&&(e.bindTexture(L.type,null),L.type=void 0,L.texture=void 0)}function ie(){try{e.compressedTexImage2D(...arguments)}catch(L){ue("WebGLState:",L)}}function Nt(){try{e.compressedTexImage3D(...arguments)}catch(L){ue("WebGLState:",L)}}function se(){try{e.texSubImage2D(...arguments)}catch(L){ue("WebGLState:",L)}}function K(){try{e.texSubImage3D(...arguments)}catch(L){ue("WebGLState:",L)}}function V(){try{e.compressedTexSubImage2D(...arguments)}catch(L){ue("WebGLState:",L)}}function Q(){try{e.compressedTexSubImage3D(...arguments)}catch(L){ue("WebGLState:",L)}}function at(){try{e.texStorage2D(...arguments)}catch(L){ue("WebGLState:",L)}}function E(){try{e.texStorage3D(...arguments)}catch(L){ue("WebGLState:",L)}}function _(){try{e.texImage2D(...arguments)}catch(L){ue("WebGLState:",L)}}function P(){try{e.texImage3D(...arguments)}catch(L){ue("WebGLState:",L)}}function X(L){return p[L]!==void 0?p[L]:e.getParameter(L)}function it(L,U){p[L]!==U&&(e.pixelStorei(L,U),p[L]=U)}function dt(L){lt.equals(L)===!1&&(e.scissor(L.x,L.y,L.z,L.w),lt.copy(L))}function xt(L){_t.equals(L)===!1&&(e.viewport(L.x,L.y,L.z,L.w),_t.copy(L))}function $(L,U){let O=c.get(U);O===void 0&&(O=new WeakMap,c.set(U,O));let st=O.get(L);st===void 0&&(st=e.getUniformBlockIndex(U,L.name),e.uniformBlockBinding(U,st,st),O.set(L,st))}function G(L,U,O){let ft=c.get(U).get(L);o[ft]!==O&&(e.bindBufferBase(e.UNIFORM_BUFFER,ft,O),o[ft]=O)}function et(){e.disable(e.BLEND),e.disable(e.CULL_FACE),e.disable(e.DEPTH_TEST),e.disable(e.POLYGON_OFFSET_FILL),e.disable(e.SCISSOR_TEST),e.disable(e.STENCIL_TEST),e.disable(e.SAMPLE_ALPHA_TO_COVERAGE),e.blendEquation(e.FUNC_ADD),e.blendFunc(e.ONE,e.ZERO),e.blendFuncSeparate(e.ONE,e.ZERO,e.ONE,e.ZERO),e.blendColor(0,0,0,0),e.colorMask(!0,!0,!0,!0),e.clearColor(0,0,0,0),e.depthMask(!0),e.depthFunc(e.LESS),s.setReversed(!1),e.clearDepth(1),e.stencilMask(4294967295),e.stencilFunc(e.ALWAYS,0,4294967295),e.stencilOp(e.KEEP,e.KEEP,e.KEEP),e.clearStencil(0),e.cullFace(e.BACK),e.frontFace(e.CCW),e.polygonOffset(0,0),e.activeTexture(e.TEXTURE0),e.bindFramebuffer(e.FRAMEBUFFER,null),e.bindFramebuffer(e.DRAW_FRAMEBUFFER,null),e.bindFramebuffer(e.READ_FRAMEBUFFER,null),e.useProgram(null),e.lineWidth(1),e.scissor(0,0,e.canvas.width,e.canvas.height),e.viewport(0,0,e.canvas.width,e.canvas.height),e.pixelStorei(e.PACK_ALIGNMENT,4),e.pixelStorei(e.UNPACK_ALIGNMENT,4),e.pixelStorei(e.UNPACK_FLIP_Y_WEBGL,!1),e.pixelStorei(e.UNPACK_PREMULTIPLY_ALPHA_WEBGL,!1),e.pixelStorei(e.UNPACK_COLORSPACE_CONVERSION_WEBGL,e.BROWSER_DEFAULT_WEBGL),e.pixelStorei(e.PACK_ROW_LENGTH,0),e.pixelStorei(e.PACK_SKIP_PIXELS,0),e.pixelStorei(e.PACK_SKIP_ROWS,0),e.pixelStorei(e.UNPACK_ROW_LENGTH,0),e.pixelStorei(e.UNPACK_IMAGE_HEIGHT,0),e.pixelStorei(e.UNPACK_SKIP_PIXELS,0),e.pixelStorei(e.UNPACK_SKIP_ROWS,0),e.pixelStorei(e.UNPACK_SKIP_IMAGES,0),u={},p={},Y=null,N={},f={},o={},h=new WeakMap,g=[],M=null,v=!1,d=null,x=null,b=null,y=null,w=null,T=null,m=null,S=new me(0,0,0),C=0,D=!1,R=null,Z=null,tt=null,z=null,J=null,lt.set(0,0,e.canvas.width,e.canvas.height),_t.set(0,0,e.canvas.width,e.canvas.height),r.reset(),s.reset(),l.reset()}return{buffers:{color:r,depth:s,stencil:l},enable:Lt,disable:gt,bindFramebuffer:Zt,drawBuffers:I,useProgram:jt,setBlending:Tt,setMaterial:wt,setFlipSided:At,setCullFace:Mt,setLineWidth:Yt,setPolygonOffset:zt,setScissorTest:re,activeTexture:Jt,bindTexture:Vt,unbindTexture:H,compressedTexImage2D:ie,compressedTexImage3D:Nt,texImage2D:_,texImage3D:P,pixelStorei:it,getParameter:X,updateUBOMapping:$,uniformBlockBinding:G,texStorage2D:at,texStorage3D:E,texSubImage2D:se,texSubImage3D:K,compressedTexSubImage2D:V,compressedTexSubImage3D:Q,scissor:dt,viewport:xt,reset:et}}function tI(e,t,n,i,a,r,s){let l=t.has("WEBGL_multisampled_render_to_texture")?t.get("WEBGL_multisampled_render_to_texture"):null,o=typeof navigator>"u"?!1:/OculusBrowser/g.test(navigator.userAgent),c=new Ot,u=new WeakMap,p=new Set,f,h=new WeakMap,g=new Set,M=new FinalizationRegistry(E=>g.delete(E)),v=!1;try{v=typeof OffscreenCanvas<"u"&&new OffscreenCanvas(1,1).getContext("2d")!==null}catch{}function d(E,_){return v?new OffscreenCanvas(E,_):Lu("canvas")}function x(E,_,P){let X=1,it=at(E);if((it.width>P||it.height>P)&&(X=P/Math.max(it.width,it.height)),X<1)if(typeof HTMLImageElement<"u"&&E instanceof HTMLImageElement||typeof HTMLCanvasElement<"u"&&E instanceof HTMLCanvasElement||typeof ImageBitmap<"u"&&E instanceof ImageBitmap||typeof VideoFrame<"u"&&E instanceof VideoFrame){let dt=Math.floor(X*it.width),xt=Math.floor(X*it.height);f===void 0&&(f=d(dt,xt));let $=_?d(dt,xt):f;return $.width=dt,$.height=xt,$.getContext("2d").drawImage(E,0,0,dt,xt),ce("WebGLRenderer: Texture has been resized from ("+it.width+"x"+it.height+") to ("+dt+"x"+xt+")."),$}else return"data"in E&&ce("WebGLRenderer: Image in DataTexture is too big ("+it.width+"x"+it.height+")."),E;return E}function b(E){return E.generateMipmaps}function y(E){e.generateMipmap(E)}function w(E){return E.isWebGLCubeRenderTarget?e.TEXTURE_CUBE_MAP:E.isWebGL3DRenderTarget?e.TEXTURE_3D:E.isWebGLArrayRenderTarget||E.isCompressedArrayTexture?e.TEXTURE_2D_ARRAY:e.TEXTURE_2D}function T(E,_,P,X,it,dt=!1){if(E!==null){if(e[E]!==void 0)return e[E];ce("WebGLRenderer: Attempt to use non-existing WebGL internal format '"+E+"'")}let xt;X&&(xt=t.get("EXT_texture_norm16"),xt||ce("WebGLRenderer: Unable to use normalized textures without EXT_texture_norm16 extension"));let $=_;if(_===e.RED&&(P===e.FLOAT&&($=e.R32F),P===e.HALF_FLOAT&&($=e.R16F),P===e.UNSIGNED_BYTE&&($=e.R8),P===e.UNSIGNED_SHORT&&xt&&($=xt.R16_EXT),P===e.SHORT&&xt&&($=xt.R16_SNORM_EXT)),_===e.RED_INTEGER&&(P===e.UNSIGNED_BYTE&&($=e.R8UI),P===e.UNSIGNED_SHORT&&($=e.R16UI),P===e.UNSIGNED_INT&&($=e.R32UI),P===e.BYTE&&($=e.R8I),P===e.SHORT&&($=e.R16I),P===e.INT&&($=e.R32I)),_===e.RG&&(P===e.FLOAT&&($=e.RG32F),P===e.HALF_FLOAT&&($=e.RG16F),P===e.UNSIGNED_BYTE&&($=e.RG8),P===e.UNSIGNED_SHORT&&xt&&($=xt.RG16_EXT),P===e.SHORT&&xt&&($=xt.RG16_SNORM_EXT)),_===e.RG_INTEGER&&(P===e.UNSIGNED_BYTE&&($=e.RG8UI),P===e.UNSIGNED_SHORT&&($=e.RG16UI),P===e.UNSIGNED_INT&&($=e.RG32UI),P===e.BYTE&&($=e.RG8I),P===e.SHORT&&($=e.RG16I),P===e.INT&&($=e.RG32I)),_===e.RGB_INTEGER&&(P===e.UNSIGNED_BYTE&&($=e.RGB8UI),P===e.UNSIGNED_SHORT&&($=e.RGB16UI),P===e.UNSIGNED_INT&&($=e.RGB32UI),P===e.BYTE&&($=e.RGB8I),P===e.SHORT&&($=e.RGB16I),P===e.INT&&($=e.RGB32I)),_===e.RGBA_INTEGER&&(P===e.UNSIGNED_BYTE&&($=e.RGBA8UI),P===e.UNSIGNED_SHORT&&($=e.RGBA16UI),P===e.UNSIGNED_INT&&($=e.RGBA32UI),P===e.BYTE&&($=e.RGBA8I),P===e.SHORT&&($=e.RGBA16I),P===e.INT&&($=e.RGBA32I)),_===e.RGB&&(P===e.UNSIGNED_SHORT&&xt&&($=xt.RGB16_EXT),P===e.SHORT&&xt&&($=xt.RGB16_SNORM_EXT),P===e.UNSIGNED_INT_5_9_9_9_REV&&($=e.RGB9_E5),P===e.UNSIGNED_INT_10F_11F_11F_REV&&($=e.R11F_G11F_B10F)),_===e.RGBA){let G=dt?Nu:Ne.getTransfer(it);P===e.FLOAT&&($=e.RGBA32F),P===e.HALF_FLOAT&&($=e.RGBA16F),P===e.UNSIGNED_BYTE&&($=G===Ge?e.SRGB8_ALPHA8:e.RGBA8),P===e.UNSIGNED_SHORT&&xt&&($=xt.RGBA16_EXT),P===e.SHORT&&xt&&($=xt.RGBA16_SNORM_EXT),P===e.UNSIGNED_SHORT_4_4_4_4&&($=e.RGBA4),P===e.UNSIGNED_SHORT_5_5_5_1&&($=e.RGB5_A1)}return($===e.R16F||$===e.R32F||$===e.RG16F||$===e.RG32F||$===e.RGBA16F||$===e.RGBA32F)&&t.get("EXT_color_buffer_float"),$}function m(E,_){let P;return E?_===null||_===Ma||_===So?P=e.DEPTH24_STENCIL8:_===Ea?P=e.DEPTH32F_STENCIL8:_===uc&&(P=e.DEPTH24_STENCIL8,ce("DepthTexture: 16 bit depth attachment is not supported with stencil. Using 24-bit attachment.")):_===null||_===Ma||_===So?P=e.DEPTH_COMPONENT24:_===Ea?P=e.DEPTH_COMPONENT32F:_===uc&&(P=e.DEPTH_COMPONENT16),P}function S(E,_){return b(E)===!0||E.isFramebufferTexture&&E.minFilter!==In&&E.minFilter!==qn?Math.log2(Math.max(_.width,_.height))+1:E.mipmaps.length>0?E.mipmaps.length:E.isCompressedTexture&&Array.isArray(E.image)?_.mipmaps.length:1}function C(E){let _=new WeakRef(E);i.get(E).__ref=_,g.add(_),M.register(E,_,_)}function D(E){let _=i.get(E).__ref;_!==void 0&&(g.delete(_),M.unregister(_))}function R(E){tt(E.target)}function Z(E){z(E.target)}function tt(E){E.removeEventListener("dispose",R),D(E),j(E),E.isVideoTexture&&u.delete(E),E.isHTMLTexture&&p.delete(E)}function z(E){E.removeEventListener("dispose",Z),D(E),ot(E)}function J(){for(let E of g){let _=E.deref();_!==void 0&&(_.isRenderTarget===!0?z(_):tt(_))}g.clear(),p.clear()}function j(E){let _=i.get(E);if(_.__webglInit===void 0)return;let P=E.source,X=h.get(P);if(X){let it=X[_.__cacheKey];it.usedTimes--,it.usedTimes===0&&B(E),Object.keys(X).length===0&&h.delete(P)}i.remove(E)}function B(E){let _=i.get(E);e.deleteTexture(_.__webglTexture);let P=E.source,X=h.get(P);delete X[_.__cacheKey],s.memory.textures--}function ot(E){let _=i.get(E);_.__depthDisposeCallback&&_.__depthDisposeCallback();let P=E.depthTexture;if(P&&P.renderTarget===E&&tt(P),E.isWebGLCubeRenderTarget)for(let it=0;it<6;it++){if(Array.isArray(_.__webglFramebuffer[it]))for(let dt=0;dt<_.__webglFramebuffer[it].length;dt++)e.deleteFramebuffer(_.__webglFramebuffer[it][dt]);else e.deleteFramebuffer(_.__webglFramebuffer[it]);_.__webglDepthbuffer&&e.deleteRenderbuffer(_.__webglDepthbuffer[it])}else{if(Array.isArray(_.__webglFramebuffer))for(let it=0;it<_.__webglFramebuffer.length;it++)e.deleteFramebuffer(_.__webglFramebuffer[it]);else e.deleteFramebuffer(_.__webglFramebuffer);if(_.__webglDepthbuffer&&e.deleteRenderbuffer(_.__webglDepthbuffer),_.__webglMultisampledFramebuffer&&e.deleteFramebuffer(_.__webglMultisampledFramebuffer),_.__webglColorRenderbuffer)for(let it=0;it<_.__webglColorRenderbuffer.length;it++)_.__webglColorRenderbuffer[it]&&e.deleteRenderbuffer(_.__webglColorRenderbuffer[it]);_.__webglDepthRenderbuffer&&e.deleteRenderbuffer(_.__webglDepthRenderbuffer)}let X=E.textures;for(let it=0,dt=X.length;it<dt;it++){let xt=i.get(X[it]);xt.__webglTexture&&(e.deleteTexture(xt.__webglTexture),s.memory.textures--),i.remove(X[it])}i.remove(E)}let k=0;function Y(){k=0}function N(){return k}function yt(E){k=E}function Dt(){let E=k;return E>=a.maxTextures&&ce("WebGLTextures: Trying to use "+(E+1)+" texture units while this GPU supports only "+a.maxTextures),k+=1,E}function lt(E){let _=[];return _.push(E.wrapS),_.push(E.wrapT),_.push(E.wrapR||0),_.push(E.magFilter),_.push(E.minFilter),_.push(E.anisotropy),_.push(E.internalFormat),_.push(E.format),_.push(E.type),_.push(E.generateMipmaps),_.push(E.mipmapsAutoUpdate),_.push(E.premultiplyAlpha),_.push(E.flipY),_.push(E.unpackAlignment),_.push(E.colorSpace),_.join()}function _t(E,_){let P=i.get(E);if(E.isVideoTexture&&V(E),E.isRenderTargetTexture===!1&&E.isExternalTexture!==!0&&E.version>0&&P.__version!==E.version){let X=E.image;if(X===null)ce("WebGLRenderer: Texture marked for update but no image data found.");else if(X.complete===!1)ce("WebGLRenderer: Texture marked for update but image is incomplete");else{wt(P,E,_);return}}else E.isExternalTexture&&(P.__webglTexture=E.sourceTexture?E.sourceTexture:null);n.bindTexture(e.TEXTURE_2D,P.__webglTexture,e.TEXTURE0+_)}function Ct(E,_){let P=i.get(E);if(E.isRenderTargetTexture===!1&&E.version>0&&P.__version!==E.version){wt(P,E,_);return}else E.isExternalTexture&&(P.__webglTexture=E.sourceTexture?E.sourceTexture:null);n.bindTexture(e.TEXTURE_2D_ARRAY,P.__webglTexture,e.TEXTURE0+_)}function Ft(E,_){let P=i.get(E);if(E.isRenderTargetTexture===!1&&E.version>0&&P.__version!==E.version){wt(P,E,_);return}n.bindTexture(e.TEXTURE_3D,P.__webglTexture,e.TEXTURE0+_)}function Lt(E,_){let P=i.get(E);if(E.version>0&&P.__version!==E.version){At(P,E,_);return}n.bindTexture(e.TEXTURE_CUBE_MAP,P.__webglTexture,e.TEXTURE0+_)}let gt={[Ka]:e.REPEAT,[la]:e.CLAMP_TO_EDGE,[Od]:e.MIRRORED_REPEAT},Zt={[In]:e.NEAREST,[HE]:e.NEAREST_MIPMAP_NEAREST,[tf]:e.NEAREST_MIPMAP_LINEAR,[qn]:e.LINEAR,[hp]:e.LINEAR_MIPMAP_NEAREST,[Sa]:e.LINEAR_MIPMAP_LINEAR},I={[XE]:e.NEVER,[wx]:e.ALWAYS,[WE]:e.LESS,[Ex]:e.LEQUAL,[qE]:e.EQUAL,[Tx]:e.GEQUAL,[YE]:e.GREATER,[ZE]:e.NOTEQUAL};function jt(E,_){if(_.type===Ea&&t.has("OES_texture_float_linear")===!1&&(_.magFilter===qn||_.magFilter===hp||_.magFilter===tf||_.magFilter===Sa||_.minFilter===qn||_.minFilter===hp||_.minFilter===tf||_.minFilter===Sa)&&ce("WebGLRenderer: Unable to use linear filtering with floating point textures. OES_texture_float_linear not supported on this device."),e.texParameteri(E,e.TEXTURE_WRAP_S,gt[_.wrapS]),e.texParameteri(E,e.TEXTURE_WRAP_T,gt[_.wrapT]),(E===e.TEXTURE_3D||E===e.TEXTURE_2D_ARRAY)&&e.texParameteri(E,e.TEXTURE_WRAP_R,gt[_.wrapR]),e.texParameteri(E,e.TEXTURE_MAG_FILTER,Zt[_.magFilter]),e.texParameteri(E,e.TEXTURE_MIN_FILTER,Zt[_.minFilter]),_.compareFunction&&(e.texParameteri(E,e.TEXTURE_COMPARE_MODE,e.COMPARE_REF_TO_TEXTURE),e.texParameteri(E,e.TEXTURE_COMPARE_FUNC,I[_.compareFunction])),t.has("EXT_texture_filter_anisotropic")===!0){if(_.magFilter===In||_.minFilter!==tf&&_.minFilter!==Sa||_.type===Ea&&t.has("OES_texture_float_linear")===!1)return;if(_.anisotropy>1||i.get(_).__currentAnisotropy){let P=t.get("EXT_texture_filter_anisotropic");e.texParameterf(E,P.TEXTURE_MAX_ANISOTROPY_EXT,Math.min(_.anisotropy,a.getMaxAnisotropy())),i.get(_).__currentAnisotropy=_.anisotropy}}}function $t(E,_){let P=!1;E.__webglInit===void 0&&(E.__webglInit=!0,_.addEventListener("dispose",R),C(_));let X=_.source,it=h.get(X);it===void 0&&(it={},h.set(X,it));let dt=lt(_);if(dt!==E.__cacheKey){it[dt]===void 0&&(it[dt]={texture:e.createTexture(),usedTimes:0},s.memory.textures++,P=!0),it[dt].usedTimes++;let xt=it[E.__cacheKey];xt!==void 0&&(it[E.__cacheKey].usedTimes--,xt.usedTimes===0&&B(_)),E.__cacheKey=dt,E.__webglTexture=it[dt].texture}return P}function ht(E,_,P){return Math.floor(Math.floor(E/P)/_)}function Tt(E,_,P,X){let dt=E.updateRanges;if(dt.length===0)n.texSubImage2D(e.TEXTURE_2D,0,0,0,_.width,_.height,P,X,_.data);else{dt.sort((L,U)=>L.start-U.start);let xt=0;for(let L=1;L<dt.length;L++){let U=dt[xt],O=dt[L],st=U.start+U.count,ft=ht(O.start,_.width,4),vt=ht(U.start,_.width,4);O.start<=st+1&&ft===vt&&ht(O.start+O.count-1,_.width,4)===ft?U.count=Math.max(U.count,O.start+O.count-U.start):(++xt,dt[xt]=O)}dt.length=xt+1;let $=n.getParameter(e.UNPACK_ROW_LENGTH),G=n.getParameter(e.UNPACK_SKIP_PIXELS),et=n.getParameter(e.UNPACK_SKIP_ROWS);n.pixelStorei(e.UNPACK_ROW_LENGTH,_.width);for(let L=0,U=dt.length;L<U;L++){let O=dt[L],st=Math.floor(O.start/4),ft=Math.ceil(O.count/4),vt=st%_.width,Ut=Math.floor(st/_.width),Bt=ft,F=1;n.pixelStorei(e.UNPACK_SKIP_PIXELS,vt),n.pixelStorei(e.UNPACK_SKIP_ROWS,Ut),n.texSubImage2D(e.TEXTURE_2D,0,vt,Ut,Bt,F,P,X,_.data)}E.clearUpdateRanges(),n.pixelStorei(e.UNPACK_ROW_LENGTH,$),n.pixelStorei(e.UNPACK_SKIP_PIXELS,G),n.pixelStorei(e.UNPACK_SKIP_ROWS,et)}}function wt(E,_,P){let X=e.TEXTURE_2D;(_.isDataArrayTexture||_.isCompressedArrayTexture)&&(X=e.TEXTURE_2D_ARRAY),_.isData3DTexture&&(X=e.TEXTURE_3D);let it=$t(E,_),dt=_.source;n.bindTexture(X,E.__webglTexture,e.TEXTURE0+P);let xt=i.get(dt);if(dt.version!==xt.__version||it===!0){if(n.activeTexture(e.TEXTURE0+P),(typeof ImageBitmap<"u"&&_.image instanceof ImageBitmap)===!1){let F=Ne.getPrimaries(Ne.workingColorSpace),ct=_.colorSpace===Ir?null:Ne.getPrimaries(_.colorSpace),bt=_.colorSpace===Ir||F===ct?e.NONE:e.BROWSER_DEFAULT_WEBGL;n.pixelStorei(e.UNPACK_FLIP_Y_WEBGL,_.flipY),n.pixelStorei(e.UNPACK_PREMULTIPLY_ALPHA_WEBGL,_.premultiplyAlpha),n.pixelStorei(e.UNPACK_COLORSPACE_CONVERSION_WEBGL,bt)}n.pixelStorei(e.UNPACK_ALIGNMENT,_.unpackAlignment);let G=x(_.image,!1,a.maxTextureSize);G=Q(_,G);let et=r.convert(_.format,_.colorSpace),L=r.convert(_.type),U=T(_.internalFormat,et,L,_.normalized,_.colorSpace,_.isVideoTexture);jt(X,_);let O,st=_.mipmaps,ft=_.isVideoTexture!==!0,vt=xt.__version===void 0||it===!0,Ut=dt.dataReady,Bt=S(_,G);if(_.isDepthTexture)U=m(_.format===Ur,_.type),vt&&(ft?n.texStorage2D(e.TEXTURE_2D,1,U,G.width,G.height):n.texImage2D(e.TEXTURE_2D,0,U,G.width,G.height,0,et,L,null));else if(_.isDataTexture)if(st.length>0){ft&&vt&&n.texStorage2D(e.TEXTURE_2D,Bt,U,st[0].width,st[0].height);for(let F=0,ct=st.length;F<ct;F++)O=st[F],ft?Ut&&n.texSubImage2D(e.TEXTURE_2D,F,0,0,O.width,O.height,et,L,O.data):n.texImage2D(e.TEXTURE_2D,F,U,O.width,O.height,0,et,L,O.data);_.generateMipmaps=!1}else ft?(vt&&n.texStorage2D(e.TEXTURE_2D,Bt,U,G.width,G.height),Ut&&Tt(_,G,et,L)):n.texImage2D(e.TEXTURE_2D,0,U,G.width,G.height,0,et,L,G.data);else if(_.isCompressedTexture)if(_.isCompressedArrayTexture){ft&&vt&&n.texStorage3D(e.TEXTURE_2D_ARRAY,Bt,U,st[0].width,st[0].height,G.depth);for(let F=0,ct=st.length;F<ct;F++)if(O=st[F],_.format!==wa)if(et!==null)if(ft){if(Ut)if(_.layerUpdates.size>0){let bt=Ix(O.width,O.height,_.format,_.type);for(let mt of _.layerUpdates){let Gt=O.data.subarray(mt*bt/O.data.BYTES_PER_ELEMENT,(mt+1)*bt/O.data.BYTES_PER_ELEMENT);n.compressedTexSubImage3D(e.TEXTURE_2D_ARRAY,F,0,0,mt,O.width,O.height,1,et,Gt)}}else n.compressedTexSubImage3D(e.TEXTURE_2D_ARRAY,F,0,0,0,O.width,O.height,G.depth,et,O.data)}else n.compressedTexImage3D(e.TEXTURE_2D_ARRAY,F,U,O.width,O.height,G.depth,0,O.data,0,0);else ce("WebGLRenderer: Attempt to load unsupported compressed texture format in .uploadTexture()");else ft?Ut&&n.texSubImage3D(e.TEXTURE_2D_ARRAY,F,0,0,0,O.width,O.height,G.depth,et,L,O.data):n.texImage3D(e.TEXTURE_2D_ARRAY,F,U,O.width,O.height,G.depth,0,et,L,O.data);_.layerUpdates.size>0&&_.clearLayerUpdates()}else{ft&&vt&&n.texStorage2D(e.TEXTURE_2D,Bt,U,st[0].width,st[0].height);for(let F=0,ct=st.length;F<ct;F++)O=st[F],_.format!==wa?et!==null?ft?Ut&&n.compressedTexSubImage2D(e.TEXTURE_2D,F,0,0,O.width,O.height,et,O.data):n.compressedTexImage2D(e.TEXTURE_2D,F,U,O.width,O.height,0,O.data):ce("WebGLRenderer: Attempt to load unsupported compressed texture format in .uploadTexture()"):ft?Ut&&n.texSubImage2D(e.TEXTURE_2D,F,0,0,O.width,O.height,et,L,O.data):n.texImage2D(e.TEXTURE_2D,F,U,O.width,O.height,0,et,L,O.data)}else if(_.isDataArrayTexture)if(ft){if(vt&&n.texStorage3D(e.TEXTURE_2D_ARRAY,Bt,U,G.width,G.height,G.depth),Ut)if(_.layerUpdates.size>0){let F=Ix(G.width,G.height,_.format,_.type);for(let ct of _.layerUpdates){let bt=G.data.subarray(ct*F/G.data.BYTES_PER_ELEMENT,(ct+1)*F/G.data.BYTES_PER_ELEMENT);n.texSubImage3D(e.TEXTURE_2D_ARRAY,0,0,0,ct,G.width,G.height,1,et,L,bt)}_.clearLayerUpdates()}else n.texSubImage3D(e.TEXTURE_2D_ARRAY,0,0,0,0,G.width,G.height,G.depth,et,L,G.data)}else n.texImage3D(e.TEXTURE_2D_ARRAY,0,U,G.width,G.height,G.depth,0,et,L,G.data);else if(_.isData3DTexture)ft?(vt&&n.texStorage3D(e.TEXTURE_3D,Bt,U,G.width,G.height,G.depth),Ut&&n.texSubImage3D(e.TEXTURE_3D,0,0,0,0,G.width,G.height,G.depth,et,L,G.data)):n.texImage3D(e.TEXTURE_3D,0,U,G.width,G.height,G.depth,0,et,L,G.data);else if(_.isFramebufferTexture){if(vt)if(ft)n.texStorage2D(e.TEXTURE_2D,Bt,U,G.width,G.height);else{let F=G.width,ct=G.height;for(let bt=0;bt<Bt;bt++)n.texImage2D(e.TEXTURE_2D,bt,U,F,ct,0,et,L,null),F>>=1,ct>>=1}}else if(_.isHTMLTexture){if("texElementImage2D"in e){let F=e.canvas;if(F.hasAttribute("layoutsubtree")||F.setAttribute("layoutsubtree","true"),G.parentNode!==F){F.appendChild(G),p.add(_),F.onpaint=ct=>{let bt=ct.changedElements;for(let mt of p)bt.includes(mt.image)&&(mt.needsUpdate=!0)},F.requestPaint();return}if(e.texElementImage2D.length===3)e.texElementImage2D(e.TEXTURE_2D,e.RGBA8,G);else{let bt=e.RGBA,mt=e.RGBA,Gt=e.UNSIGNED_BYTE;e.texElementImage2D(e.TEXTURE_2D,0,bt,mt,Gt,G)}e.texParameteri(e.TEXTURE_2D,e.TEXTURE_MIN_FILTER,e.LINEAR),e.texParameteri(e.TEXTURE_2D,e.TEXTURE_WRAP_S,e.CLAMP_TO_EDGE),e.texParameteri(e.TEXTURE_2D,e.TEXTURE_WRAP_T,e.CLAMP_TO_EDGE)}}else if(st.length>0){if(ft&&vt){let F=at(st[0]);n.texStorage2D(e.TEXTURE_2D,Bt,U,F.width,F.height)}for(let F=0,ct=st.length;F<ct;F++)O=st[F],ft?Ut&&n.texSubImage2D(e.TEXTURE_2D,F,0,0,et,L,O):n.texImage2D(e.TEXTURE_2D,F,U,et,L,O);_.generateMipmaps=!1}else if(ft){if(vt){let F=at(G);n.texStorage2D(e.TEXTURE_2D,Bt,U,F.width,F.height)}Ut&&n.texSubImage2D(e.TEXTURE_2D,0,0,0,et,L,G)}else n.texImage2D(e.TEXTURE_2D,0,U,et,L,G);b(_)&&_.mipmapsAutoUpdate===!0&&y(X),xt.__version=dt.version,_.onUpdate&&_.onUpdate(_)}E.__version=_.version}function At(E,_,P){if(_.image.length!==6)return;let X=$t(E,_),it=_.source;n.bindTexture(e.TEXTURE_CUBE_MAP,E.__webglTexture,e.TEXTURE0+P);let dt=i.get(it);if(it.version!==dt.__version||X===!0){n.activeTexture(e.TEXTURE0+P);let xt=Ne.getPrimaries(Ne.workingColorSpace),$=_.colorSpace===Ir?null:Ne.getPrimaries(_.colorSpace),G=_.colorSpace===Ir||xt===$?e.NONE:e.BROWSER_DEFAULT_WEBGL;n.pixelStorei(e.UNPACK_FLIP_Y_WEBGL,_.flipY),n.pixelStorei(e.UNPACK_PREMULTIPLY_ALPHA_WEBGL,_.premultiplyAlpha),n.pixelStorei(e.UNPACK_ALIGNMENT,_.unpackAlignment),n.pixelStorei(e.UNPACK_COLORSPACE_CONVERSION_WEBGL,G);let et=_.isCompressedTexture||_.image[0].isCompressedTexture,L=_.image[0]&&_.image[0].isDataTexture,U=[];for(let mt=0;mt<6;mt++)!et&&!L?U[mt]=x(_.image[mt],!0,a.maxCubemapSize):U[mt]=L?_.image[mt].image:_.image[mt],U[mt]=Q(_,U[mt]);let O=U[0],st=r.convert(_.format,_.colorSpace),ft=r.convert(_.type),vt=T(_.internalFormat,st,ft,_.normalized,_.colorSpace),Ut=_.isVideoTexture!==!0,Bt=dt.__version===void 0||X===!0,F=it.dataReady,ct=S(_,O);jt(e.TEXTURE_CUBE_MAP,_);let bt;if(_.isDepthTexture){if(vt=m(_.format===Ur,_.type),Bt)if(Ut)n.texStorage2D(e.TEXTURE_CUBE_MAP,1,vt,O.width,O.height);else for(let mt=0;mt<6;mt++)n.texImage2D(e.TEXTURE_CUBE_MAP_POSITIVE_X+mt,0,vt,O.width,O.height,0,st,ft,null)}else if(et){Ut&&Bt&&n.texStorage2D(e.TEXTURE_CUBE_MAP,ct,vt,O.width,O.height);for(let mt=0;mt<6;mt++){bt=U[mt].mipmaps;for(let Gt=0;Gt<bt.length;Gt++){let qt=bt[Gt];_.format!==wa?st!==null?Ut?F&&n.compressedTexSubImage2D(e.TEXTURE_CUBE_MAP_POSITIVE_X+mt,Gt,0,0,qt.width,qt.height,st,qt.data):n.compressedTexImage2D(e.TEXTURE_CUBE_MAP_POSITIVE_X+mt,Gt,vt,qt.width,qt.height,0,qt.data):ce("WebGLRenderer: Attempt to load unsupported compressed texture format in .setTextureCube()"):Ut?F&&n.texSubImage2D(e.TEXTURE_CUBE_MAP_POSITIVE_X+mt,Gt,0,0,qt.width,qt.height,st,ft,qt.data):n.texImage2D(e.TEXTURE_CUBE_MAP_POSITIVE_X+mt,Gt,vt,qt.width,qt.height,0,st,ft,qt.data)}}}else{if(bt=_.mipmaps,Ut&&Bt){bt.length>0&&ct++;let mt=at(U[0]);n.texStorage2D(e.TEXTURE_CUBE_MAP,ct,vt,mt.width,mt.height)}for(let mt=0;mt<6;mt++)if(L){Ut?F&&n.texSubImage2D(e.TEXTURE_CUBE_MAP_POSITIVE_X+mt,0,0,0,U[mt].width,U[mt].height,st,ft,U[mt].data):n.texImage2D(e.TEXTURE_CUBE_MAP_POSITIVE_X+mt,0,vt,U[mt].width,U[mt].height,0,st,ft,U[mt].data);for(let Gt=0;Gt<bt.length;Gt++){let le=bt[Gt].image[mt].image;Ut?F&&n.texSubImage2D(e.TEXTURE_CUBE_MAP_POSITIVE_X+mt,Gt+1,0,0,le.width,le.height,st,ft,le.data):n.texImage2D(e.TEXTURE_CUBE_MAP_POSITIVE_X+mt,Gt+1,vt,le.width,le.height,0,st,ft,le.data)}}else{Ut?F&&n.texSubImage2D(e.TEXTURE_CUBE_MAP_POSITIVE_X+mt,0,0,0,st,ft,U[mt]):n.texImage2D(e.TEXTURE_CUBE_MAP_POSITIVE_X+mt,0,vt,st,ft,U[mt]);for(let Gt=0;Gt<bt.length;Gt++){let qt=bt[Gt];Ut?F&&n.texSubImage2D(e.TEXTURE_CUBE_MAP_POSITIVE_X+mt,Gt+1,0,0,st,ft,qt.image[mt]):n.texImage2D(e.TEXTURE_CUBE_MAP_POSITIVE_X+mt,Gt+1,vt,st,ft,qt.image[mt])}}}b(_)&&_.mipmapsAutoUpdate===!0&&y(e.TEXTURE_CUBE_MAP),dt.__version=it.version,_.onUpdate&&_.onUpdate(_)}E.__version=_.version}function Mt(E,_,P,X,it,dt){let xt=r.convert(P.format,P.colorSpace),$=r.convert(P.type),G=T(P.internalFormat,xt,$,P.normalized,P.colorSpace),et=i.get(_),L=i.get(P);if(L.__renderTarget=_,!et.__hasExternalTextures){let U=Math.max(1,_.width>>dt),O=Math.max(1,_.height>>dt);it===e.TEXTURE_3D||it===e.TEXTURE_2D_ARRAY?n.texImage3D(it,dt,G,U,O,_.depth,0,xt,$,null):n.texImage2D(it,dt,G,U,O,0,xt,$,null)}n.bindFramebuffer(e.FRAMEBUFFER,E),K(_)?l.framebufferTexture2DMultisampleEXT(e.FRAMEBUFFER,X,it,L.__webglTexture,0,se(_)):(it===e.TEXTURE_2D||it>=e.TEXTURE_CUBE_MAP_POSITIVE_X&&it<=e.TEXTURE_CUBE_MAP_NEGATIVE_Z)&&e.framebufferTexture2D(e.FRAMEBUFFER,X,it,L.__webglTexture,dt),n.bindFramebuffer(e.FRAMEBUFFER,null)}function Yt(E,_,P){if(e.bindRenderbuffer(e.RENDERBUFFER,E),_.depthBuffer){let X=_.depthTexture,it=X&&X.isDepthTexture?X.type:null,dt=m(_.stencilBuffer,it),xt=_.stencilBuffer?e.DEPTH_STENCIL_ATTACHMENT:e.DEPTH_ATTACHMENT;K(_)?l.renderbufferStorageMultisampleEXT(e.RENDERBUFFER,se(_),dt,_.width,_.height):P?e.renderbufferStorageMultisample(e.RENDERBUFFER,se(_),dt,_.width,_.height):e.renderbufferStorage(e.RENDERBUFFER,dt,_.width,_.height),e.framebufferRenderbuffer(e.FRAMEBUFFER,xt,e.RENDERBUFFER,E)}else{let X=_.textures;for(let it=0;it<X.length;it++){let dt=X[it],xt=r.convert(dt.format,dt.colorSpace),$=r.convert(dt.type),G=T(dt.internalFormat,xt,$,dt.normalized,dt.colorSpace);K(_)?l.renderbufferStorageMultisampleEXT(e.RENDERBUFFER,se(_),G,_.width,_.height):P?e.renderbufferStorageMultisample(e.RENDERBUFFER,se(_),G,_.width,_.height):e.renderbufferStorage(e.RENDERBUFFER,G,_.width,_.height)}}e.bindRenderbuffer(e.RENDERBUFFER,null)}function zt(E,_,P){let X=_.isWebGLCubeRenderTarget===!0;if(n.bindFramebuffer(e.FRAMEBUFFER,E),!(_.depthTexture&&_.depthTexture.isDepthTexture))throw new Error("THREE.WebGLTextures: renderTarget.depthTexture must be an instance of THREE.DepthTexture.");let it=i.get(_.depthTexture);it.__renderTarget=_;let dt=X?_.depthTexture.image[0]:_.depthTexture.image;(!it.__webglTexture||dt.width!==_.width||dt.height!==_.height)&&(dt.width=_.width,dt.height=_.height,_.depthTexture.needsUpdate=!0),X?Lt(_.depthTexture,0):_t(_.depthTexture,0);let xt=it.__webglTexture,$=se(_),G=X?e.TEXTURE_CUBE_MAP_POSITIVE_X+P:e.TEXTURE_2D,et=_.depthTexture.format===Ur?e.DEPTH_STENCIL_ATTACHMENT:e.DEPTH_ATTACHMENT;if(_.depthTexture.format===Dr)K(_)?l.framebufferTexture2DMultisampleEXT(e.FRAMEBUFFER,et,G,xt,0,$):e.framebufferTexture2D(e.FRAMEBUFFER,et,G,xt,0);else if(_.depthTexture.format===Ur)K(_)?l.framebufferTexture2DMultisampleEXT(e.FRAMEBUFFER,et,G,xt,0,$):e.framebufferTexture2D(e.FRAMEBUFFER,et,G,xt,0);else throw new Error("THREE.WebGLTextures: Unknown depthTexture format.")}function re(E){let _=i.get(E),P=E.isWebGLCubeRenderTarget===!0;if(_.__boundDepthTexture!==E.depthTexture){let X=E.depthTexture;if(_.__depthDisposeCallback&&_.__depthDisposeCallback(),X){let it=()=>{delete _.__boundDepthTexture,delete _.__depthDisposeCallback,X.removeEventListener("dispose",it)};X.addEventListener("dispose",it),_.__depthDisposeCallback=it}_.__boundDepthTexture=X}if(E.depthTexture&&!_.__autoAllocateDepthBuffer)if(P)for(let X=0;X<6;X++)zt(_.__webglFramebuffer[X],E,X);else E.texture.mipmaps.length>0?zt(_.__webglFramebuffer[0],E,0):zt(_.__webglFramebuffer,E,0);else if(P){_.__webglDepthbuffer=[];for(let X=0;X<6;X++)if(n.bindFramebuffer(e.FRAMEBUFFER,_.__webglFramebuffer[X]),_.__webglDepthbuffer[X]===void 0)_.__webglDepthbuffer[X]=e.createRenderbuffer(),Yt(_.__webglDepthbuffer[X],E,!1);else{let it=E.stencilBuffer?e.DEPTH_STENCIL_ATTACHMENT:e.DEPTH_ATTACHMENT,dt=_.__webglDepthbuffer[X];e.bindRenderbuffer(e.RENDERBUFFER,dt),e.framebufferRenderbuffer(e.FRAMEBUFFER,it,e.RENDERBUFFER,dt)}}else if(E.texture.mipmaps.length>0?n.bindFramebuffer(e.FRAMEBUFFER,_.__webglFramebuffer[0]):n.bindFramebuffer(e.FRAMEBUFFER,_.__webglFramebuffer),_.__webglDepthbuffer===void 0)_.__webglDepthbuffer=e.createRenderbuffer(),Yt(_.__webglDepthbuffer,E,!1);else{let it=E.stencilBuffer?e.DEPTH_STENCIL_ATTACHMENT:e.DEPTH_ATTACHMENT,dt=_.__webglDepthbuffer;e.bindRenderbuffer(e.RENDERBUFFER,dt),e.framebufferRenderbuffer(e.FRAMEBUFFER,it,e.RENDERBUFFER,dt)}n.bindFramebuffer(e.FRAMEBUFFER,null)}function Jt(E,_,P){let X=i.get(E);_!==void 0&&Mt(X.__webglFramebuffer,E,E.texture,e.COLOR_ATTACHMENT0,e.TEXTURE_2D,0),P!==void 0&&re(E)}function Vt(E){let _=E.texture,P=i.get(E),X=i.get(_);E.addEventListener("dispose",Z),C(E);let it=E.textures,dt=E.isWebGLCubeRenderTarget===!0,xt=it.length>1;if(xt||(X.__webglTexture===void 0&&(X.__webglTexture=e.createTexture()),X.__version=_.version,s.memory.textures++),dt){P.__webglFramebuffer=[];for(let $=0;$<6;$++)if(_.mipmaps.length>0){P.__webglFramebuffer[$]=[];for(let G=0;G<_.mipmaps.length;G++)P.__webglFramebuffer[$][G]=e.createFramebuffer()}else P.__webglFramebuffer[$]=e.createFramebuffer()}else{if(_.mipmaps.length>0){P.__webglFramebuffer=[];for(let $=0;$<_.mipmaps.length;$++)P.__webglFramebuffer[$]=e.createFramebuffer()}else P.__webglFramebuffer=e.createFramebuffer();if(xt)for(let $=0,G=it.length;$<G;$++){let et=i.get(it[$]);et.__webglTexture===void 0&&(et.__webglTexture=e.createTexture(),s.memory.textures++)}if(E.samples>0&&K(E)===!1){P.__webglMultisampledFramebuffer=e.createFramebuffer(),P.__webglColorRenderbuffer=[],n.bindFramebuffer(e.FRAMEBUFFER,P.__webglMultisampledFramebuffer);for(let $=0;$<it.length;$++){let G=it[$];P.__webglColorRenderbuffer[$]=e.createRenderbuffer(),e.bindRenderbuffer(e.RENDERBUFFER,P.__webglColorRenderbuffer[$]);let et=r.convert(G.format,G.colorSpace),L=r.convert(G.type),U=T(G.internalFormat,et,L,G.normalized,G.colorSpace,E.isXRRenderTarget===!0),O=se(E);e.renderbufferStorageMultisample(e.RENDERBUFFER,O,U,E.width,E.height),e.framebufferRenderbuffer(e.FRAMEBUFFER,e.COLOR_ATTACHMENT0+$,e.RENDERBUFFER,P.__webglColorRenderbuffer[$])}e.bindRenderbuffer(e.RENDERBUFFER,null),E.depthBuffer&&(P.__webglDepthRenderbuffer=e.createRenderbuffer(),Yt(P.__webglDepthRenderbuffer,E,!0)),n.bindFramebuffer(e.FRAMEBUFFER,null)}}if(dt){n.bindTexture(e.TEXTURE_CUBE_MAP,X.__webglTexture),jt(e.TEXTURE_CUBE_MAP,_);for(let $=0;$<6;$++)if(_.mipmaps.length>0)for(let G=0;G<_.mipmaps.length;G++)Mt(P.__webglFramebuffer[$][G],E,_,e.COLOR_ATTACHMENT0,e.TEXTURE_CUBE_MAP_POSITIVE_X+$,G);else Mt(P.__webglFramebuffer[$],E,_,e.COLOR_ATTACHMENT0,e.TEXTURE_CUBE_MAP_POSITIVE_X+$,0);b(_)?y(e.TEXTURE_CUBE_MAP):_.mipmaps.length>0&&e.texParameteri(e.TEXTURE_CUBE_MAP,e.TEXTURE_MAX_LEVEL,_.mipmaps.length-1),n.unbindTexture()}else if(xt){for(let $=0,G=it.length;$<G;$++){let et=it[$],L=i.get(et),U=e.TEXTURE_2D;(E.isWebGL3DRenderTarget||E.isWebGLArrayRenderTarget)&&(U=E.isWebGL3DRenderTarget?e.TEXTURE_3D:e.TEXTURE_2D_ARRAY),n.bindTexture(U,L.__webglTexture),jt(U,et),Mt(P.__webglFramebuffer,E,et,e.COLOR_ATTACHMENT0+$,U,0),b(et)&&y(U)}n.unbindTexture()}else{let $=e.TEXTURE_2D;if((E.isWebGL3DRenderTarget||E.isWebGLArrayRenderTarget)&&($=E.isWebGL3DRenderTarget?e.TEXTURE_3D:e.TEXTURE_2D_ARRAY),n.bindTexture($,X.__webglTexture),jt($,_),_.mipmaps.length>0)for(let G=0;G<_.mipmaps.length;G++)Mt(P.__webglFramebuffer[G],E,_,e.COLOR_ATTACHMENT0,$,G);else Mt(P.__webglFramebuffer,E,_,e.COLOR_ATTACHMENT0,$,0);b(_)?y($):_.mipmaps.length>0&&e.texParameteri($,e.TEXTURE_MAX_LEVEL,_.mipmaps.length-1),n.unbindTexture()}E.depthBuffer&&re(E)}function H(E){let _=E.textures;for(let P=0,X=_.length;P<X;P++){let it=_[P];if(b(it)&&it.mipmapsAutoUpdate===!0){let dt=w(E),xt=i.get(it).__webglTexture;n.bindTexture(dt,xt),y(dt),n.unbindTexture()}}}let ie=[];function Nt(E){if(E.samples>0){if(K(E)===!1){let _=E.textures,P=E.width,X=E.height,it=e.COLOR_BUFFER_BIT,dt=E.stencilBuffer?e.DEPTH_STENCIL_ATTACHMENT:e.DEPTH_ATTACHMENT,xt=i.get(E),$=_.length>1;if($)for(let et=0;et<_.length;et++)n.bindFramebuffer(e.FRAMEBUFFER,xt.__webglMultisampledFramebuffer),e.framebufferRenderbuffer(e.FRAMEBUFFER,e.COLOR_ATTACHMENT0+et,e.RENDERBUFFER,null),n.bindFramebuffer(e.FRAMEBUFFER,xt.__webglFramebuffer),e.framebufferTexture2D(e.DRAW_FRAMEBUFFER,e.COLOR_ATTACHMENT0+et,e.TEXTURE_2D,null,0);n.bindFramebuffer(e.READ_FRAMEBUFFER,xt.__webglMultisampledFramebuffer),E.texture.mipmaps.length>0?n.bindFramebuffer(e.DRAW_FRAMEBUFFER,xt.__webglFramebuffer[0]):n.bindFramebuffer(e.DRAW_FRAMEBUFFER,xt.__webglFramebuffer);for(let et=0;et<_.length;et++){if(E.resolveDepthBuffer&&(E.depthBuffer&&(it|=e.DEPTH_BUFFER_BIT),E.stencilBuffer&&E.resolveStencilBuffer&&(it|=e.STENCIL_BUFFER_BIT)),$){e.framebufferRenderbuffer(e.READ_FRAMEBUFFER,e.COLOR_ATTACHMENT0,e.RENDERBUFFER,xt.__webglColorRenderbuffer[et]);let L=i.get(_[et]).__webglTexture;e.framebufferTexture2D(e.DRAW_FRAMEBUFFER,e.COLOR_ATTACHMENT0,e.TEXTURE_2D,L,0)}e.blitFramebuffer(0,0,P,X,0,0,P,X,it,e.NEAREST),o===!0&&(ie.length=0,ie.push(e.COLOR_ATTACHMENT0+et),E.depthBuffer&&E.storeMultisampledDepthBuffer===!1&&ie.push(dt),e.invalidateFramebuffer(e.READ_FRAMEBUFFER,ie))}if(n.bindFramebuffer(e.READ_FRAMEBUFFER,null),n.bindFramebuffer(e.DRAW_FRAMEBUFFER,null),$)for(let et=0;et<_.length;et++){n.bindFramebuffer(e.FRAMEBUFFER,xt.__webglMultisampledFramebuffer),e.framebufferRenderbuffer(e.FRAMEBUFFER,e.COLOR_ATTACHMENT0+et,e.RENDERBUFFER,xt.__webglColorRenderbuffer[et]);let L=i.get(_[et]).__webglTexture;n.bindFramebuffer(e.FRAMEBUFFER,xt.__webglFramebuffer),e.framebufferTexture2D(e.DRAW_FRAMEBUFFER,e.COLOR_ATTACHMENT0+et,e.TEXTURE_2D,L,0)}n.bindFramebuffer(e.DRAW_FRAMEBUFFER,xt.__webglMultisampledFramebuffer)}else if(E.depthBuffer&&E.storeMultisampledDepthBuffer===!1&&o){let _=E.stencilBuffer?e.DEPTH_STENCIL_ATTACHMENT:e.DEPTH_ATTACHMENT;e.invalidateFramebuffer(e.DRAW_FRAMEBUFFER,[_])}}}function se(E){return Math.min(a.maxSamples,E.samples)}function K(E){let _=i.get(E);return E.samples>0&&t.has("WEBGL_multisampled_render_to_texture")===!0&&_.__useRenderToTexture!==!1}function V(E){let _=s.render.frame;u.get(E)!==_&&(u.set(E,_),E.update())}function Q(E,_){let P=E.colorSpace,X=E.format,it=E.type;return E.isCompressedTexture===!0||E.isVideoTexture===!0||P!==Du&&P!==Ir&&(Ne.getTransfer(P)===Ge?(X!==wa||it!==wi)&&ce("WebGLTextures: sRGB encoded textures have to use RGBAFormat and UnsignedByteType."):ue("WebGLTextures: Unsupported texture color space:",P)),_}function at(E){return typeof HTMLImageElement<"u"&&E instanceof HTMLImageElement?(c.width=E.naturalWidth||E.width,c.height=E.naturalHeight||E.height):typeof VideoFrame<"u"&&E instanceof VideoFrame?(c.width=E.displayWidth,c.height=E.displayHeight):(c.width=E.width,c.height=E.height),c}this.allocateTextureUnit=Dt,this.resetTextureUnits=Y,this.getTextureUnits=N,this.setTextureUnits=yt,this.setTexture2D=_t,this.setTexture2DArray=Ct,this.setTexture3D=Ft,this.setTextureCube=Lt,this.rebindTextures=Jt,this.setupRenderTarget=Vt,this.updateRenderTargetMipmap=H,this.updateMultisampleRenderTarget=Nt,this.setupDepthRenderbuffer=re,this.setupFrameBufferTexture=Mt,this.useMultisampledRTT=K,this.dispose=J}function eI(e,t){function n(i,a=Ir){let r,s=Ne.getTransfer(a);if(i===wi)return e.UNSIGNED_BYTE;if(i===pp)return e.UNSIGNED_SHORT_4_4_4_4;if(i===mp)return e.UNSIGNED_SHORT_5_5_5_1;if(i===yx)return e.UNSIGNED_INT_5_9_9_9_REV;if(i===_x)return e.UNSIGNED_INT_10F_11F_11F_REV;if(i===vx)return e.BYTE;if(i===xx)return e.SHORT;if(i===uc)return e.UNSIGNED_SHORT;if(i===dp)return e.INT;if(i===Ma)return e.UNSIGNED_INT;if(i===Ea)return e.FLOAT;if(i===Ta)return e.HALF_FLOAT;if(i===bx)return e.ALPHA;if(i===Sx)return e.RGB;if(i===wa)return e.RGBA;if(i===Dr)return e.DEPTH_COMPONENT;if(i===Ur)return e.DEPTH_STENCIL;if(i===Mx)return e.RED;if(i===gp)return e.RED_INTEGER;if(i===Ds)return e.RG;if(i===vp)return e.RG_INTEGER;if(i===xp)return e.RGBA_INTEGER;if(i===ef||i===nf||i===af||i===rf)if(s===Ge)if(r=t.get("WEBGL_compressed_texture_s3tc_srgb"),r!==null){if(i===ef)return r.COMPRESSED_SRGB_S3TC_DXT1_EXT;if(i===nf)return r.COMPRESSED_SRGB_ALPHA_S3TC_DXT1_EXT;if(i===af)return r.COMPRESSED_SRGB_ALPHA_S3TC_DXT3_EXT;if(i===rf)return r.COMPRESSED_SRGB_ALPHA_S3TC_DXT5_EXT}else return null;else if(r=t.get("WEBGL_compressed_texture_s3tc"),r!==null){if(i===ef)return r.COMPRESSED_RGB_S3TC_DXT1_EXT;if(i===nf)return r.COMPRESSED_RGBA_S3TC_DXT1_EXT;if(i===af)return r.COMPRESSED_RGBA_S3TC_DXT3_EXT;if(i===rf)return r.COMPRESSED_RGBA_S3TC_DXT5_EXT}else return null;if(i===yp||i===_p||i===bp||i===Sp)if(r=t.get("WEBGL_compressed_texture_pvrtc"),r!==null){if(i===yp)return r.COMPRESSED_RGB_PVRTC_4BPPV1_IMG;if(i===_p)return r.COMPRESSED_RGB_PVRTC_2BPPV1_IMG;if(i===bp)return r.COMPRESSED_RGBA_PVRTC_4BPPV1_IMG;if(i===Sp)return r.COMPRESSED_RGBA_PVRTC_2BPPV1_IMG}else return null;if(i===Mp||i===Ep||i===Tp||i===wp||i===Ap||i===sf||i===Rp)if(r=t.get("WEBGL_compressed_texture_etc"),r!==null){if(i===Mp||i===Ep)return s===Ge?r.COMPRESSED_SRGB8_ETC2:r.COMPRESSED_RGB8_ETC2;if(i===Tp)return s===Ge?r.COMPRESSED_SRGB8_ALPHA8_ETC2_EAC:r.COMPRESSED_RGBA8_ETC2_EAC;if(i===wp)return r.COMPRESSED_R11_EAC;if(i===Ap)return r.COMPRESSED_SIGNED_R11_EAC;if(i===sf)return r.COMPRESSED_RG11_EAC;if(i===Rp)return r.COMPRESSED_SIGNED_RG11_EAC}else return null;if(i===Cp||i===Dp||i===Np||i===Lp||i===Up||i===Ip||i===Op||i===Pp||i===zp||i===Fp||i===Bp||i===Hp||i===Gp||i===Vp)if(r=t.get("WEBGL_compressed_texture_astc"),r!==null){if(i===Cp)return s===Ge?r.COMPRESSED_SRGB8_ALPHA8_ASTC_4x4_KHR:r.COMPRESSED_RGBA_ASTC_4x4_KHR;if(i===Dp)return s===Ge?r.COMPRESSED_SRGB8_ALPHA8_ASTC_5x4_KHR:r.COMPRESSED_RGBA_ASTC_5x4_KHR;if(i===Np)return s===Ge?r.COMPRESSED_SRGB8_ALPHA8_ASTC_5x5_KHR:r.COMPRESSED_RGBA_ASTC_5x5_KHR;if(i===Lp)return s===Ge?r.COMPRESSED_SRGB8_ALPHA8_ASTC_6x5_KHR:r.COMPRESSED_RGBA_ASTC_6x5_KHR;if(i===Up)return s===Ge?r.COMPRESSED_SRGB8_ALPHA8_ASTC_6x6_KHR:r.COMPRESSED_RGBA_ASTC_6x6_KHR;if(i===Ip)return s===Ge?r.COMPRESSED_SRGB8_ALPHA8_ASTC_8x5_KHR:r.COMPRESSED_RGBA_ASTC_8x5_KHR;if(i===Op)return s===Ge?r.COMPRESSED_SRGB8_ALPHA8_ASTC_8x6_KHR:r.COMPRESSED_RGBA_ASTC_8x6_KHR;if(i===Pp)return s===Ge?r.COMPRESSED_SRGB8_ALPHA8_ASTC_8x8_KHR:r.COMPRESSED_RGBA_ASTC_8x8_KHR;if(i===zp)return s===Ge?r.COMPRESSED_SRGB8_ALPHA8_ASTC_10x5_KHR:r.COMPRESSED_RGBA_ASTC_10x5_KHR;if(i===Fp)return s===Ge?r.COMPRESSED_SRGB8_ALPHA8_ASTC_10x6_KHR:r.COMPRESSED_RGBA_ASTC_10x6_KHR;if(i===Bp)return s===Ge?r.COMPRESSED_SRGB8_ALPHA8_ASTC_10x8_KHR:r.COMPRESSED_RGBA_ASTC_10x8_KHR;if(i===Hp)return s===Ge?r.COMPRESSED_SRGB8_ALPHA8_ASTC_10x10_KHR:r.COMPRESSED_RGBA_ASTC_10x10_KHR;if(i===Gp)return s===Ge?r.COMPRESSED_SRGB8_ALPHA8_ASTC_12x10_KHR:r.COMPRESSED_RGBA_ASTC_12x10_KHR;if(i===Vp)return s===Ge?r.COMPRESSED_SRGB8_ALPHA8_ASTC_12x12_KHR:r.COMPRESSED_RGBA_ASTC_12x12_KHR}else return null;if(i===kp||i===Xp||i===Wp)if(r=t.get("EXT_texture_compression_bptc"),r!==null){if(i===kp)return s===Ge?r.COMPRESSED_SRGB_ALPHA_BPTC_UNORM_EXT:r.COMPRESSED_RGBA_BPTC_UNORM_EXT;if(i===Xp)return r.COMPRESSED_RGB_BPTC_SIGNED_FLOAT_EXT;if(i===Wp)return r.COMPRESSED_RGB_BPTC_UNSIGNED_FLOAT_EXT}else return null;if(i===qp||i===Yp||i===of||i===Zp)if(r=t.get("EXT_texture_compression_rgtc"),r!==null){if(i===qp)return r.COMPRESSED_RED_RGTC1_EXT;if(i===Yp)return r.COMPRESSED_SIGNED_RED_RGTC1_EXT;if(i===of)return r.COMPRESSED_RED_GREEN_RGTC2_EXT;if(i===Zp)return r.COMPRESSED_SIGNED_RED_GREEN_RGTC2_EXT}else return null;return i===So?e.UNSIGNED_INT_24_8:e[i]!==void 0?e[i]:null}return{convert:n}}var nI=`
void main() {

	gl_Position = vec4( position, 1.0 );

}`,iI=`
uniform sampler2DArray depthColor;
uniform float depthWidth;
uniform float depthHeight;

void main() {

	vec2 coord = vec2( gl_FragCoord.x / depthWidth, gl_FragCoord.y / depthHeight );

	if ( coord.x >= 1.0 ) {

		gl_FragDepth = texture( depthColor, vec3( coord.x - 1.0, coord.y, 1 ) ).r;

	} else {

		gl_FragDepth = texture( depthColor, vec3( coord.x, coord.y, 0 ) ).r;

	}

}`,Zx=class{constructor(){this.texture=null,this.mesh=null,this.depthNear=0,this.depthFar=0}init(t,n){if(this.texture===null){let i=new Bu(t.texture);(t.depthNear!==n.depthNear||t.depthFar!==n.depthFar)&&(this.depthNear=t.depthNear,this.depthFar=t.depthFar),this.texture=i}}getMesh(t){if(this.texture!==null&&this.mesh===null){let n=t.cameras[0].viewport,i=new Qa({vertexShader:nI,fragmentShader:iI,uniforms:{depthColor:{value:this.texture},depthWidth:{value:n.z},depthHeight:{value:n.w}}});this.mesh=new wn(new xo(20,20),i)}return this.mesh}reset(){this.texture=null,this.mesh=null}getDepthTexture(){return this.texture}},Jx=class extends ja{constructor(t,n){super();let i=this,a=null,r=1,s=null,l="local-floor",o=1,c=null,u=null,p=null,f=null,h=null,g=null,M=typeof XRWebGLBinding<"u",v=new Zx,d={},x=n.getContextAttributes(),b=null,y=null,w=[],T=[],m=new Ot,S=null,C=null,D=new li;D.viewport=new cn;let R=new li;R.viewport=new cn;let Z=[D,R],tt=new lp,z=null,J=null;this.cameraAutoUpdate=!0,this.enabled=!1,this.isPresenting=!1,this.getController=function(lt){let _t=w[lt];return _t===void 0&&(_t=new Yl,w[lt]=_t),_t.getTargetRaySpace()},this.getControllerGrip=function(lt){let _t=w[lt];return _t===void 0&&(_t=new Yl,w[lt]=_t),_t.getGripSpace()},this.getHand=function(lt){let _t=w[lt];return _t===void 0&&(_t=new Yl,w[lt]=_t),_t.getHandSpace()};function j(lt){let _t=T.indexOf(lt.inputSource);if(_t===-1)return;let Ct=w[_t];Ct!==void 0&&(Ct.update(lt.inputSource,lt.frame,c||s),Ct.dispatchEvent({type:lt.type,data:lt.inputSource}))}function B(){a.removeEventListener("select",j),a.removeEventListener("selectstart",j),a.removeEventListener("selectend",j),a.removeEventListener("squeeze",j),a.removeEventListener("squeezestart",j),a.removeEventListener("squeezeend",j),a.removeEventListener("end",B),a.removeEventListener("inputsourceschange",ot);for(let lt=0;lt<w.length;lt++){let _t=T[lt];_t!==null&&(T[lt]=null,w[lt].disconnect(_t))}z=null,J=null,v.reset();for(let lt in d)delete d[lt];if(t.setRenderTarget(b),h=null,f=null,p=null,a=null,y=null,Dt.stop(),i.isPresenting=!1,t.setPixelRatio(S),t.setSize(m.width,m.height,!1),C!==null){let lt=C.camera;lt.fov=C.fov,lt.zoom=C.zoom,lt.updateProjectionMatrix(),C=null}i.dispatchEvent({type:"sessionend"})}this.setFramebufferScaleFactor=function(lt){r=lt,i.isPresenting===!0&&ce("WebXRManager: Cannot change framebuffer scale while presenting.")},this.setReferenceSpaceType=function(lt){l=lt,i.isPresenting===!0&&ce("WebXRManager: Cannot change reference space type while presenting.")},this.getReferenceSpace=function(){return c||s},this.setReferenceSpace=function(lt){c=lt},this.getBaseLayer=function(){return f!==null?f:h},this.getBinding=function(){return p===null&&M&&(p=new XRWebGLBinding(a,n)),p},this.getFrame=function(){return g},this.getSession=function(){return a},this.setSession=async function(lt){if(a=lt,a!==null){if(b=t.getRenderTarget(),a.addEventListener("select",j),a.addEventListener("selectstart",j),a.addEventListener("selectend",j),a.addEventListener("squeeze",j),a.addEventListener("squeezestart",j),a.addEventListener("squeezeend",j),a.addEventListener("end",B),a.addEventListener("inputsourceschange",ot),x.xrCompatible!==!0&&await n.makeXRCompatible(),S=t.getPixelRatio(),t.getSize(m),M&&"createProjectionLayer"in XRWebGLBinding.prototype){let Ct=null,Ft=null,Lt=null;x.depth&&(Lt=x.stencil?n.DEPTH24_STENCIL8:n.DEPTH_COMPONENT24,Ct=x.stencil?Ur:Dr,Ft=x.stencil?So:Ma);let gt={colorFormat:n.RGBA8,depthFormat:Lt,scaleFactor:r};p=this.getBinding(),f=p.createProjectionLayer(gt),a.updateRenderState({layers:[f]}),t.setPixelRatio(1),t.setSize(f.textureWidth,f.textureHeight,!1),y=new Vi(f.textureWidth,f.textureHeight,{format:wa,type:wi,depthTexture:new Lr(f.textureWidth,f.textureHeight,Ft,void 0,void 0,void 0,void 0,void 0,void 0,Ct),stencilBuffer:x.stencil,colorSpace:t.outputColorSpace,samples:x.antialias?4:0,resolveDepthBuffer:f.ignoreDepthValues===!1,resolveStencilBuffer:f.ignoreDepthValues===!1,storeMultisampledDepthBuffer:f.ignoreDepthValues===!1,storeMultisampledStencilBuffer:f.ignoreDepthValues===!1})}else{let Ct={antialias:x.antialias,alpha:!0,depth:x.depth,stencil:x.stencil,framebufferScaleFactor:r};h=new XRWebGLLayer(a,n,Ct),a.updateRenderState({baseLayer:h}),t.setPixelRatio(1),t.setSize(h.framebufferWidth,h.framebufferHeight,!1),y=new Vi(h.framebufferWidth,h.framebufferHeight,{format:wa,type:wi,colorSpace:t.outputColorSpace,stencilBuffer:x.stencil,resolveDepthBuffer:h.ignoreDepthValues===!1,resolveStencilBuffer:h.ignoreDepthValues===!1,storeMultisampledDepthBuffer:h.ignoreDepthValues===!1,storeMultisampledStencilBuffer:h.ignoreDepthValues===!1})}y.isXRRenderTarget=!0,this.setFoveation(o),c=null,s=await a.requestReferenceSpace(l),Dt.setContext(a),Dt.start(),i.isPresenting=!0,i.dispatchEvent({type:"sessionstart"})}},this.getEnvironmentBlendMode=function(){if(a!==null)return a.environmentBlendMode},this.getDepthTexture=function(){return v.getDepthTexture()};function ot(lt){for(let _t=0;_t<lt.removed.length;_t++){let Ct=lt.removed[_t],Ft=T.indexOf(Ct);Ft>=0&&(T[Ft]=null,w[Ft].disconnect(Ct))}for(let _t=0;_t<lt.added.length;_t++){let Ct=lt.added[_t],Ft=T.indexOf(Ct);if(Ft===-1){for(let gt=0;gt<w.length;gt++)if(gt>=T.length){T.push(Ct),Ft=gt;break}else if(T[gt]===null){T[gt]=Ct,Ft=gt;break}if(Ft===-1)break}let Lt=w[Ft];Lt&&Lt.connect(Ct)}}function k(lt,_t){_t===null?lt.matrixWorld.copy(lt.matrix):lt.matrixWorld.multiplyMatrices(_t.matrixWorld,lt.matrix),lt.matrixWorldInverse.copy(lt.matrixWorld).invert()}this.updateCamera=function(lt){if(a===null)return;let _t=lt.near,Ct=lt.far;v.texture!==null&&(v.depthNear>0&&(_t=v.depthNear),v.depthFar>0&&(Ct=v.depthFar)),tt.near=R.near=D.near=_t,tt.far=R.far=D.far=Ct,(z!==tt.near||J!==tt.far)&&(a.updateRenderState({depthNear:tt.near,depthFar:tt.far}),z=tt.near,J=tt.far),tt.layers.mask=lt.layers.mask|6,D.layers.mask=tt.layers.mask&-5,R.layers.mask=tt.layers.mask&-3;let Ft=lt.parent,Lt=tt.cameras;k(tt,Ft);for(let gt=0;gt<Lt.length;gt++)k(Lt[gt],Ft);tt.projectionMatrix.copy(D.projectionMatrix),tt.projectionMatrixInverse.copy(D.projectionMatrixInverse),C===null&&lt.isPerspectiveCamera&&(C={camera:lt,fov:lt.fov,zoom:lt.zoom}),Y(lt,tt,Ft)};function Y(lt,_t,Ct){Ct===null?lt.matrix.copy(_t.matrixWorld):(lt.matrix.copy(Ct.matrixWorld),lt.matrix.invert(),lt.matrix.multiply(_t.matrixWorld)),lt.matrix.decompose(lt.position,lt.quaternion,lt.scale),lt.updateMatrixWorld(!0),lt.projectionMatrix.copy(_t.projectionMatrix),lt.projectionMatrixInverse.copy(_t.projectionMatrixInverse),lt.isPerspectiveCamera&&(lt.fov=zd*2*Math.atan(1/lt.projectionMatrix.elements[5]),lt.zoom=1)}this.getCamera=function(){return tt},this.getFoveation=function(){if(!(f===null&&h===null))return o},this.setFoveation=function(lt){o=lt,f!==null&&(f.fixedFoveation=lt),h!==null&&h.fixedFoveation!==void 0&&(h.fixedFoveation=lt)},this.hasDepthSensing=function(){return v.texture!==null},this.getDepthSensingMesh=function(){return v.getMesh(tt)},this.getCameraTexture=function(lt){return d[lt]};let N=null;function yt(lt,_t){if(u=_t.getViewerPose(c||s),g=_t,u!==null){let Ct=u.views;h!==null&&(t.setRenderTargetFramebuffer(y,h.framebuffer),t.setRenderTarget(y));let Ft=!1;Ct.length!==tt.cameras.length&&(tt.cameras.length=0,Ft=!0);for(let I=0;I<Ct.length;I++){let jt=Ct[I],$t=null;if(h!==null)$t=h.getViewport(jt);else{let Tt=p.getViewSubImage(f,jt);$t=Tt.viewport,I===0&&(t.setRenderTargetTextures(y,Tt.colorTexture,Tt.depthStencilTexture),t.setRenderTarget(y))}let ht=Z[I];ht===void 0&&(ht=new li,ht.layers.enable(I),ht.viewport=new cn,Z[I]=ht),ht.matrix.fromArray(jt.transform.matrix),ht.matrix.decompose(ht.position,ht.quaternion,ht.scale),ht.projectionMatrix.fromArray(jt.projectionMatrix),ht.projectionMatrixInverse.copy(ht.projectionMatrix).invert(),ht.viewport.set($t.x,$t.y,$t.width,$t.height),I===0&&(tt.matrix.copy(ht.matrix),tt.matrix.decompose(tt.position,tt.quaternion,tt.scale)),Ft===!0&&tt.cameras.push(ht)}let Lt=a.enabledFeatures;if(Lt&&Lt.includes("depth-sensing")&&a.depthUsage=="gpu-optimized"&&M){p=i.getBinding();let I=p.getDepthInformation(Ct[0]);I&&I.isValid&&I.texture&&v.init(I,a.renderState)}if(Lt&&Lt.includes("camera-access")&&M){t.state.unbindTexture(),p=i.getBinding();for(let I=0;I<Ct.length;I++){let jt=Ct[I].camera;if(jt){let $t=d[jt];$t||($t=new Bu,d[jt]=$t);let ht=p.getCameraImage(jt);$t.sourceTexture=ht}}}}for(let Ct=0;Ct<w.length;Ct++){let Ft=T[Ct],Lt=w[Ct];Ft!==null&&Lt!==void 0&&Lt.update(Ft,_t,c||s)}N&&N(lt,_t),_t.detectedPlanes&&i.dispatchEvent({type:"planesdetected",data:_t}),g=null}let Dt=new DT;Dt.setAnimationLoop(yt),this.setAnimationLoop=function(lt){N=lt},this.dispose=function(){}}},aI=new Ye,HT=new de;HT.set(-1,0,0,0,1,0,0,0,1);function rI(e,t){function n(v,d){v.matrixAutoUpdate===!0&&v.updateMatrix(),d.value.copy(v.matrix)}function i(v,d){d.color.getRGB(v.fogColor.value,Nx(e)),d.isFog?(v.fogNear.value=d.near,v.fogFar.value=d.far):d.isFogExp2&&(v.fogDensity.value=d.density)}function a(v,d,x,b,y){d.isNodeMaterial?d.uniformsNeedUpdate=!1:d.isMeshBasicMaterial?r(v,d):d.isMeshLambertMaterial?(r(v,d),d.envMap&&(v.envMapIntensity.value=d.envMapIntensity)):d.isMeshToonMaterial?(r(v,d),p(v,d)):d.isMeshPhongMaterial?(r(v,d),u(v,d),d.envMap&&(v.envMapIntensity.value=d.envMapIntensity)):d.isMeshStandardMaterial?(r(v,d),f(v,d),d.isMeshPhysicalMaterial&&h(v,d,y)):d.isMeshMatcapMaterial?(r(v,d),g(v,d)):d.isMeshDepthMaterial?r(v,d):d.isMeshDistanceMaterial?(r(v,d),M(v,d)):d.isMeshNormalMaterial?r(v,d):d.isLineBasicMaterial?(s(v,d),d.isLineDashedMaterial&&l(v,d)):d.isPointsMaterial?o(v,d,x,b):d.isSpriteMaterial?c(v,d):d.isShadowMaterial?(v.color.value.copy(d.color),v.opacity.value=d.opacity):d.isShaderMaterial&&(d.uniformsNeedUpdate=!1)}function r(v,d){v.opacity.value=d.opacity,d.color&&v.diffuse.value.copy(d.color),d.emissive&&v.emissive.value.copy(d.emissive).multiplyScalar(d.emissiveIntensity),d.map&&(v.map.value=d.map,n(d.map,v.mapTransform)),d.alphaMap&&(v.alphaMap.value=d.alphaMap,n(d.alphaMap,v.alphaMapTransform)),d.bumpMap&&(v.bumpMap.value=d.bumpMap,n(d.bumpMap,v.bumpMapTransform),v.bumpScale.value=d.bumpScale,d.side===hi&&(v.bumpScale.value*=-1)),d.normalMap&&(v.normalMap.value=d.normalMap,n(d.normalMap,v.normalMapTransform),v.normalScale.value.copy(d.normalScale),d.side===hi&&v.normalScale.value.negate()),d.displacementMap&&(v.displacementMap.value=d.displacementMap,n(d.displacementMap,v.displacementMapTransform),v.displacementScale.value=d.displacementScale,v.displacementBias.value=d.displacementBias),d.emissiveMap&&(v.emissiveMap.value=d.emissiveMap,n(d.emissiveMap,v.emissiveMapTransform)),d.specularMap&&(v.specularMap.value=d.specularMap,n(d.specularMap,v.specularMapTransform)),d.alphaTest>0&&(v.alphaTest.value=d.alphaTest);let x=t.get(d),b=x.envMap,y=x.envMapRotation;b&&(v.envMap.value=b,v.envMapRotation.value.setFromMatrix4(aI.makeRotationFromEuler(y)).transpose(),b.isCubeTexture&&b.isRenderTargetTexture===!1&&v.envMapRotation.value.premultiply(HT),v.reflectivity.value=d.reflectivity,v.ior.value=d.ior,v.refractionRatio.value=d.refractionRatio),d.lightMap&&(v.lightMap.value=d.lightMap,v.lightMapIntensity.value=d.lightMapIntensity,n(d.lightMap,v.lightMapTransform)),d.aoMap&&(v.aoMap.value=d.aoMap,v.aoMapIntensity.value=d.aoMapIntensity,n(d.aoMap,v.aoMapTransform))}function s(v,d){v.diffuse.value.copy(d.color),v.opacity.value=d.opacity,d.map&&(v.map.value=d.map,n(d.map,v.mapTransform))}function l(v,d){v.dashSize.value=d.dashSize,v.totalSize.value=d.dashSize+d.gapSize,v.scale.value=d.scale}function o(v,d,x,b){v.diffuse.value.copy(d.color),v.opacity.value=d.opacity,v.size.value=d.size*x,v.scale.value=b*.5,d.map&&(v.map.value=d.map,n(d.map,v.uvTransform)),d.alphaMap&&(v.alphaMap.value=d.alphaMap,n(d.alphaMap,v.alphaMapTransform)),d.alphaTest>0&&(v.alphaTest.value=d.alphaTest)}function c(v,d){v.diffuse.value.copy(d.color),v.opacity.value=d.opacity,v.rotation.value=d.rotation,d.map&&(v.map.value=d.map,n(d.map,v.mapTransform)),d.alphaMap&&(v.alphaMap.value=d.alphaMap,n(d.alphaMap,v.alphaMapTransform)),d.alphaTest>0&&(v.alphaTest.value=d.alphaTest)}function u(v,d){v.specular.value.copy(d.specular),v.shininess.value=Math.max(d.shininess,1e-4)}function p(v,d){d.gradientMap&&(v.gradientMap.value=d.gradientMap)}function f(v,d){v.metalness.value=d.metalness,d.metalnessMap&&(v.metalnessMap.value=d.metalnessMap,n(d.metalnessMap,v.metalnessMapTransform)),v.roughness.value=d.roughness,d.roughnessMap&&(v.roughnessMap.value=d.roughnessMap,n(d.roughnessMap,v.roughnessMapTransform)),d.envMap&&(v.envMapIntensity.value=d.envMapIntensity)}function h(v,d,x){v.ior.value=d.ior,d.diffuseRoughness>0&&(v.diffuseRoughness.value=d.diffuseRoughness,d.diffuseRoughnessMap&&(v.diffuseRoughnessMap.value=d.diffuseRoughnessMap,n(d.diffuseRoughnessMap,v.diffuseRoughnessMapTransform))),d.sheen>0&&(v.sheenColor.value.copy(d.sheenColor).multiplyScalar(d.sheen),v.sheenRoughness.value=d.sheenRoughness,d.sheenColorMap&&(v.sheenColorMap.value=d.sheenColorMap,n(d.sheenColorMap,v.sheenColorMapTransform)),d.sheenRoughnessMap&&(v.sheenRoughnessMap.value=d.sheenRoughnessMap,n(d.sheenRoughnessMap,v.sheenRoughnessMapTransform))),d.clearcoat>0&&(v.clearcoat.value=d.clearcoat,v.clearcoatRoughness.value=d.clearcoatRoughness,d.clearcoatMap&&(v.clearcoatMap.value=d.clearcoatMap,n(d.clearcoatMap,v.clearcoatMapTransform)),d.clearcoatRoughnessMap&&(v.clearcoatRoughnessMap.value=d.clearcoatRoughnessMap,n(d.clearcoatRoughnessMap,v.clearcoatRoughnessMapTransform)),d.clearcoatNormalMap&&(v.clearcoatNormalMap.value=d.clearcoatNormalMap,n(d.clearcoatNormalMap,v.clearcoatNormalMapTransform),v.clearcoatNormalScale.value.copy(d.clearcoatNormalScale),d.side===hi&&v.clearcoatNormalScale.value.negate())),d.dispersion>0&&(v.dispersion.value=d.dispersion),d.retroreflectivity>0&&(v.retroreflectivity.value=d.retroreflectivity),d.iridescence>0&&(v.iridescence.value=d.iridescence,v.iridescenceIOR.value=d.iridescenceIOR,v.iridescenceThicknessMinimum.value=d.iridescenceThicknessMinimum,v.iridescenceThicknessMaximum.value=d.iridescenceThicknessMaximum,d.iridescenceMap&&(v.iridescenceMap.value=d.iridescenceMap,n(d.iridescenceMap,v.iridescenceMapTransform)),d.iridescenceThicknessMap&&(v.iridescenceThicknessMap.value=d.iridescenceThicknessMap,n(d.iridescenceThicknessMap,v.iridescenceThicknessMapTransform))),d.transmission>0&&(v.transmission.value=d.transmission,v.transmissionSamplerMap.value=x.texture,v.transmissionSamplerSize.value.set(x.width,x.height),d.transmissionMap&&(v.transmissionMap.value=d.transmissionMap,n(d.transmissionMap,v.transmissionMapTransform)),v.thickness.value=d.thickness,d.thicknessMap&&(v.thicknessMap.value=d.thicknessMap,n(d.thicknessMap,v.thicknessMapTransform)),v.attenuationDistance.value=d.attenuationDistance,v.attenuationColor.value.copy(d.attenuationColor)),d.anisotropy>0&&(v.anisotropyVector.value.set(d.anisotropy*Math.cos(d.anisotropyRotation),d.anisotropy*Math.sin(d.anisotropyRotation)),d.anisotropyMap&&(v.anisotropyMap.value=d.anisotropyMap,n(d.anisotropyMap,v.anisotropyMapTransform))),v.specularIntensity.value=d.specularIntensity,v.specularColor.value.copy(d.specularColor),d.specularColorMap&&(v.specularColorMap.value=d.specularColorMap,n(d.specularColorMap,v.specularColorMapTransform)),d.specularIntensityMap&&(v.specularIntensityMap.value=d.specularIntensityMap,n(d.specularIntensityMap,v.specularIntensityMapTransform))}function g(v,d){d.matcap&&(v.matcap.value=d.matcap)}function M(v,d){let x=t.get(d).light;v.referencePosition.value.setFromMatrixPosition(x.matrixWorld),v.nearDistance.value=x.shadow.camera.near,v.farDistance.value=x.shadow.camera.far}return{refreshFogUniforms:i,refreshMaterialUniforms:a}}function sI(e,t,n,i){let a={},r={};function s(x,b){let y=b.program;i.uniformBlockBinding(x,y,a[x.id])}function l(x,b){let y=a[x.id];y===void 0&&(g(x),y=o(x),a[x.id]=y,x.addEventListener("dispose",v));let w=b.program;i.updateUBOMapping(x,w);let T=t.render.frame;r[x.id]!==T&&(c(x),r[x.id]=T)}function o(x){let b=e.createBuffer(),y=x.__size,w=x.usage;return e.bindBuffer(e.UNIFORM_BUFFER,b),e.bufferData(e.UNIFORM_BUFFER,y,w),e.bindBuffer(e.UNIFORM_BUFFER,null),b}function c(x){let b=a[x.id],y=x.uniforms,w=x.__cache;e.bindBuffer(e.UNIFORM_BUFFER,b);for(let T=0,m=y.length;T<m;T++){let S=y[T];if(Array.isArray(S))for(let C=0,D=S.length;C<D;C++)u(S[C],T,C,w);else u(S,T,0,w)}e.bindBuffer(e.UNIFORM_BUFFER,null)}function u(x,b,y,w){if(f(x,b,y,w)===!0){let T=x.__offset,m=x.value;if(Array.isArray(m)){let S=0;for(let C=0;C<m.length;C++){let D=m[C],R=M(D,!0);p(D,x.__data,S),S+=R.storage/Float32Array.BYTES_PER_ELEMENT}}else p(m,x.__data,0);e.bufferSubData(e.UNIFORM_BUFFER,T,x.__data)}}function p(x,b,y){typeof x=="number"||typeof x=="boolean"?b[y]=x:x.isMatrix3?(b[y]=x.elements[0],b[y+1]=x.elements[1],b[y+2]=x.elements[2],b[y+3]=0,b[y+4]=x.elements[3],b[y+5]=x.elements[4],b[y+6]=x.elements[5],b[y+7]=0,b[y+8]=x.elements[6],b[y+9]=x.elements[7],b[y+10]=x.elements[8],b[y+11]=0):ArrayBuffer.isView(x)?b.set(x.subarray(0,b.length-y),y):x.toArray(b,y)}function f(x,b,y,w){let T=x.value,m=b+"_"+y;if(Array.isArray(T)){w[m]===void 0&&(w[m]=[]);let S=w[m],C=!1;for(let D=0;D<T.length;D++)h(T[D],S,D)===!0&&(C=!0);return C}return h(T,w,m)}function h(x,b,y){if(b[y]===void 0)return typeof x=="number"||typeof x=="boolean"?b[y]=x:ArrayBuffer.isView(x)?b[y]=x.slice():b[y]=x.clone(),!0;{let w=b[y];if(typeof x=="number"||typeof x=="boolean"){if(w!==x)return b[y]=x,!0}else{if(ArrayBuffer.isView(x))return!0;if(w.equals(x)===!1)return w.copy(x),!0}}return!1}function g(x){let b=x.uniforms,y=0,w=16;for(let m=0,S=b.length;m<S;m++){let C=Array.isArray(b[m])?b[m]:[b[m]];for(let D=0,R=C.length;D<R;D++){let Z=C[D],tt=Array.isArray(Z.value)?Z.value:[Z.value],z=Array.isArray(b[m])||Array.isArray(Z.value),J=y;for(let B=0,ot=tt.length;B<ot;B++){let k=tt[B],Y=M(k,z),N=y%w,yt=N%Y.boundary,Dt=N+yt;y+=yt,Dt!==0&&w-Dt<Y.storage&&(y+=w-Dt),B===0&&(J=y),y+=Y.storage}let j=Z.type==="int"?Int32Array:Z.type==="uint"?Uint32Array:Float32Array;Z.__data=new j((y-J)/Float32Array.BYTES_PER_ELEMENT),Z.__offset=J}}let T=y%w;return T>0&&(y+=w-T),x.__size=y,x.__cache={},this}function M(x,b){let y={boundary:0,storage:0};return typeof x=="number"||typeof x=="boolean"?(y.boundary=4,y.storage=4):x.isVector2?(y.boundary=8,y.storage=8):x.isVector3||x.isColor?(y.boundary=16,y.storage=12):x.isVector4?(y.boundary=16,y.storage=16):x.isMatrix3?(y.boundary=16,y.storage=48):x.isMatrix4?(y.boundary=16,y.storage=64):x.isTexture?ce("WebGLRenderer: Texture samplers can not be part of an uniforms group."):ArrayBuffer.isView(x)?(y.boundary=16,y.storage=x.byteLength):ce("WebGLRenderer: Unsupported uniform value type.",x),b===!0&&(y.boundary=16,y.storage=Math.ceil(y.storage/16)*16),y}function v(x){let b=x.target;b.removeEventListener("dispose",v),e.deleteBuffer(a[b.id]),delete a[b.id],delete r[b.id]}function d(){for(let x in a)e.deleteBuffer(a[x]);a={},r={}}return{bind:s,update:l,dispose:d}}var oI=new Uint16Array([12469,15057,12620,14925,13266,14620,13807,14376,14323,13990,14545,13625,14713,13328,14840,12882,14931,12528,14996,12233,15039,11829,15066,11525,15080,11295,15085,10976,15082,10705,15073,10495,13880,14564,13898,14542,13977,14430,14158,14124,14393,13732,14556,13410,14702,12996,14814,12596,14891,12291,14937,11834,14957,11489,14958,11194,14943,10803,14921,10506,14893,10278,14858,9960,14484,14039,14487,14025,14499,13941,14524,13740,14574,13468,14654,13106,14743,12678,14818,12344,14867,11893,14889,11509,14893,11180,14881,10751,14852,10428,14812,10128,14765,9754,14712,9466,14764,13480,14764,13475,14766,13440,14766,13347,14769,13070,14786,12713,14816,12387,14844,11957,14860,11549,14868,11215,14855,10751,14825,10403,14782,10044,14729,9651,14666,9352,14599,9029,14967,12835,14966,12831,14963,12804,14954,12723,14936,12564,14917,12347,14900,11958,14886,11569,14878,11247,14859,10765,14828,10401,14784,10011,14727,9600,14660,9289,14586,8893,14508,8533,15111,12234,15110,12234,15104,12216,15092,12156,15067,12010,15028,11776,14981,11500,14942,11205,14902,10752,14861,10393,14812,9991,14752,9570,14682,9252,14603,8808,14519,8445,14431,8145,15209,11449,15208,11451,15202,11451,15190,11438,15163,11384,15117,11274,15055,10979,14994,10648,14932,10343,14871,9936,14803,9532,14729,9218,14645,8742,14556,8381,14461,8020,14365,7603,15273,10603,15272,10607,15267,10619,15256,10631,15231,10614,15182,10535,15118,10389,15042,10167,14963,9787,14883,9447,14800,9115,14710,8665,14615,8318,14514,7911,14411,7507,14279,7198,15314,9675,15313,9683,15309,9712,15298,9759,15277,9797,15229,9773,15166,9668,15084,9487,14995,9274,14898,8910,14800,8539,14697,8234,14590,7790,14479,7409,14367,7067,14178,6621,15337,8619,15337,8631,15333,8677,15325,8769,15305,8871,15264,8940,15202,8909,15119,8775,15022,8565,14916,8328,14804,8009,14688,7614,14569,7287,14448,6888,14321,6483,14088,6171,15350,7402,15350,7419,15347,7480,15340,7613,15322,7804,15287,7973,15229,8057,15148,8012,15046,7846,14933,7611,14810,7357,14682,7069,14552,6656,14421,6316,14251,5948,14007,5528,15356,5942,15356,5977,15353,6119,15348,6294,15332,6551,15302,6824,15249,7044,15171,7122,15070,7050,14949,6861,14818,6611,14679,6349,14538,6067,14398,5651,14189,5311,13935,4958,15359,4123,15359,4153,15356,4296,15353,4646,15338,5160,15311,5508,15263,5829,15188,6042,15088,6094,14966,6001,14826,5796,14678,5543,14527,5287,14377,4985,14133,4586,13869,4257,15360,1563,15360,1642,15358,2076,15354,2636,15341,3350,15317,4019,15273,4429,15203,4732,15105,4911,14981,4932,14836,4818,14679,4621,14517,4386,14359,4156,14083,3795,13808,3437,15360,122,15360,137,15358,285,15355,636,15344,1274,15322,2177,15281,2765,15215,3223,15120,3451,14995,3569,14846,3567,14681,3466,14511,3305,14344,3121,14037,2800,13753,2467,15360,0,15360,1,15359,21,15355,89,15346,253,15325,479,15287,796,15225,1148,15133,1492,15008,1749,14856,1882,14685,1886,14506,1783,14324,1608,13996,1398,13702,1183]),tr=null;function lI(){return tr===null&&(tr=new jl(oI,16,16,Ds,Ta),tr.name="DFG_LUT",tr.minFilter=qn,tr.magFilter=qn,tr.wrapS=la,tr.wrapT=la,tr.generateMipmaps=!1,tr.needsUpdate=!0),tr}var Qp=class{constructor(t={}){let{canvas:n=KE(),context:i=null,depth:a=!0,stencil:r=!1,alpha:s=!1,antialias:l=!1,premultipliedAlpha:o=!0,preserveDrawingBuffer:c=!1,powerPreference:u="default",failIfMajorPerformanceCaveat:p=!1,reversedDepthBuffer:f=!1,outputBufferType:h=wi}=t;this.isWebGLRenderer=!0;let g;if(i!==null){if(typeof WebGLRenderingContext<"u"&&i instanceof WebGLRenderingContext)throw new Error("THREE.WebGLRenderer: WebGL 1 is not supported since r163.");g=i.getContextAttributes().alpha}else g=s;let M=h,v=new Set([xp,vp,gp]),d=new Set([wi,Ma,uc,So,pp,mp]),x=new Uint32Array(4),b=new Int32Array(4),y={textures:[],min:[],max:[],resolution:[]},w=null,T=null,m=[],S=[],C=null;this.domElement=n,this.debug={checkShaderErrors:!0,diagnostics:{keywords:!1},onShaderError:null},this.autoClear=!0,this.autoClearColor=!0,this.autoClearDepth=!0,this.autoClearStencil=!0,this.sortObjects=!0,this.clippingPlanes=[],this.localClippingEnabled=!1,this.toneMapping=$a,this.toneMappingExposure=1,this.transmissionResolutionScale=1;let D=this,R=!1,Z=null,tt=null,z=null,J=null;this._outputColorSpace=Wn;let j=0,B=0,ot=null,k=-1,Y=null,N=new cn,yt=new cn,Dt=null,lt=new me(0),_t=0,Ct=n.width,Ft=n.height,Lt=1,gt=null,Zt=null,I=new cn(0,0,Ct,Ft),jt=new cn(0,0,Ct,Ft),$t=!1,ht=new Ms,Tt=new Gd,wt=!1,At=!1,Mt=new Ye,Yt=new q,zt=new cn,re={background:null,fog:null,environment:null,overrideMaterial:null,isScene:!0},Jt=!1;function Vt(){return ot===null?Lt:1}let H=i;function ie(A,W){return n.getContext(A,W)}let Nt,se,K,V,Q,at,E,_,P,X,it,dt,xt,$,G,et,L,U,O,st,ft,vt,Ut;try{let A={alpha:!0,depth:a,stencil:r,antialias:l,premultipliedAlpha:o,preserveDrawingBuffer:c,powerPreference:u,failIfMajorPerformanceCaveat:p};if("setAttribute"in n&&n.setAttribute("data-engine",`three.js r${"187"}`),n.addEventListener("webglcontextlost",ct,!1),n.addEventListener("webglcontextrestored",bt,!1),n.addEventListener("webglcontextcreationerror",mt,!1),H===null){let W="webgl2";if(H=ie(W,A),H===null)throw ie(W)?new Error("THREE.WebGLRenderer: Error creating WebGL context with your selected attributes."):new Error("THREE.WebGLRenderer: Error creating WebGL context.")}Bt()}catch(A){throw n.removeEventListener("webglcontextlost",ct,!1),n.removeEventListener("webglcontextrestored",bt,!1),n.removeEventListener("webglcontextcreationerror",mt,!1),ue("WebGLRenderer: "+A.message),A}function Bt(){Nt=new yL(H),Nt.init(),ft=new eI(H,Nt),se=new lL(H,Nt,t,ft),K=new $U(H,Nt),se.reversedDepthBuffer&&f&&K.buffers.depth.setReversed(!0),tt=H.createFramebuffer(),z=H.createFramebuffer(),J=H.createFramebuffer(),V=new SL(H),Q=new BU,at=new tI(H,Nt,K,Q,se,ft,V),E=new xL(D),_=new E3(H),vt=new sL(H,_),P=new _L(H,_,V,vt),X=new EL(H,P,_,vt,V),U=new ML(H,se,at),G=new cL(Q),it=new FU(D,E,Nt,se,vt,G),dt=new rI(D,Q),xt=new GU,$=new YU(Nt),L=new rL(D,E,K,X,g,o),et=new QU(D,X,se),Ut=new sI(H,V,se,K),O=new oL(H,Nt,V),st=new bL(H,Nt,V),V.programs=it.programs,D.capabilities=se,D.extensions=Nt,D.properties=Q,D.renderLists=xt,D.shadowMap=et,D.state=K,D.info=V}M!==wi&&(C=new wL(M,n.width,n.height,l,a,r));let F=new Jx(D,H);this.xr=F,this.getContext=function(){return H},this.getContextAttributes=function(){return H.getContextAttributes()},this.forceContextLoss=function(){let A=Nt.get("WEBGL_lose_context");A&&A.loseContext()},this.forceContextRestore=function(){let A=Nt.get("WEBGL_lose_context");A&&A.restoreContext()},this.getPixelRatio=function(){return Lt},this.setPixelRatio=function(A){A!==void 0&&(Lt=A,this.setSize(Ct,Ft,!1))},this.getSize=function(A){return A.set(Ct,Ft)},this.setSize=function(A,W,ut=!0){if(F.isPresenting){ce("WebGLRenderer: Can't change size while VR device is presenting.");return}Ct=A,Ft=W,n.width=Math.floor(A*Lt),n.height=Math.floor(W*Lt),ut===!0&&(n.style.width=A+"px",n.style.height=W+"px"),C!==null&&C.setSize(n.width,n.height),this.setViewport(0,0,A,W)},this.getDrawingBufferSize=function(A){return A.set(Ct*Lt,Ft*Lt).floor()},this.setDrawingBufferSize=function(A,W,ut){Ct=A,Ft=W,Lt=ut,n.width=Math.floor(A*ut),n.height=Math.floor(W*ut),this.setViewport(0,0,A,W)},this.setEffects=function(A){if(M===wi){ue("WebGLRenderer: setEffects() requires outputBufferType set to HalfFloatType or FloatType.");return}if(A){for(let W=0;W<A.length;W++)if(A[W].isOutputPass===!0){ce("WebGLRenderer: OutputPass is not needed in setEffects(). Tone mapping and color space conversion are applied automatically.");break}}C.setEffects(A||[])},this.getCurrentViewport=function(A){return A.copy(N)},this.getViewport=function(A){return A.copy(I)},this.setViewport=function(A,W,ut,nt){A.isVector4?I.set(A.x,A.y,A.z,A.w):I.set(A,W,ut,nt),K.viewport(N.copy(I).multiplyScalar(Vt()).round())},this.getScissor=function(A){return A.copy(jt)},this.setScissor=function(A,W,ut,nt){A.isVector4?jt.set(A.x,A.y,A.z,A.w):jt.set(A,W,ut,nt),K.scissor(yt.copy(jt).multiplyScalar(Vt()).round())},this.getScissorTest=function(){return $t},this.setScissorTest=function(A){K.setScissorTest($t=A)},this.setOpaqueSort=function(A){gt=A},this.setTransparentSort=function(A){Zt=A},this.getClearColor=function(A){return A.copy(L.getClearColor())},this.setClearColor=function(){L.setClearColor(...arguments)},this.getClearAlpha=function(){return L.getClearAlpha()},this.setClearAlpha=function(){L.setClearAlpha(...arguments)},this.clear=function(A=!0,W=!0,ut=!0){let nt=0;if(A){let rt=!1;if(ot!==null){let Pt=ot.texture.format;rt=v.has(Pt)}if(rt){let Pt=ot.texture.type,Kt=d.has(Pt),It=L.getClearColor(),kt=L.getClearAlpha(),te=It.r,he=It.g,Se=It.b;Kt?(x[0]=te,x[1]=he,x[2]=Se,x[3]=kt,H.clearBufferuiv(H.COLOR,0,x)):(b[0]=te,b[1]=he,b[2]=Se,b[3]=kt,H.clearBufferiv(H.COLOR,0,b))}else nt|=H.COLOR_BUFFER_BIT}W&&(nt|=H.DEPTH_BUFFER_BIT,this.state.buffers.depth.setMask(!0)),ut&&(nt|=H.STENCIL_BUFFER_BIT,this.state.buffers.stencil.setMask(4294967295)),nt!==0&&H.clear(nt)},this.clearColor=function(){this.clear(!0,!1,!1)},this.clearDepth=function(){this.clear(!1,!0,!1)},this.clearStencil=function(){this.clear(!1,!1,!0)},this.setNodesHandler=function(A){A.setRenderer(this),Z=A},this.dispose=function(){n.removeEventListener("webglcontextlost",ct,!1),n.removeEventListener("webglcontextrestored",bt,!1),n.removeEventListener("webglcontextcreationerror",mt,!1),L.dispose(),xt.dispose(),$.dispose(),at.dispose(),Q.dispose(),E.dispose(),X.dispose(),P.dispose(),vt.dispose(),Ut.dispose(),it.dispose(),F.dispose(),F.removeEventListener("sessionstart",xe),F.removeEventListener("sessionend",Pe),Et.stop()};function ct(A){A.preventDefault(),Rx("WebGLRenderer: Context Lost."),R=!0}function bt(){Rx("WebGLRenderer: Context Restored."),R=!1;let A=V.autoReset,W=et.enabled,ut=et.autoUpdate,nt=et.needsUpdate,rt=et.type;Bt(),V.autoReset=A,et.enabled=W,et.autoUpdate=ut,et.needsUpdate=nt,et.type=rt}function mt(A){ue("WebGLRenderer: A WebGL context could not be created. Reason: ",A.statusMessage)}function Gt(A){let W=A.target;W.removeEventListener("dispose",Gt),qt(W)}function qt(A){le(A),Q.remove(A)}function le(A){let W=Q.get(A).programs;W!==void 0&&(W.forEach(function(ut){it.releaseProgram(ut)}),A.isShaderMaterial&&it.releaseShaderCache(A))}this.renderBufferDirect=function(A,W,ut,nt,rt,Pt){W===null&&(W=re);let Kt=rt.isMesh&&rt.matrixWorld.determinantAffine()<0,It=vf(A,W,ut,nt,rt);K.setMaterial(nt,Kt);let kt=ut.index,te=1;if(nt.wireframe===!0){if(kt=P.getWireframeAttribute(ut),kt===void 0)return;te=2}let he=ut.drawRange,Se=ut.attributes.position,Qt=he.start*te,pt=(he.start+he.count)*te;Pt!==null&&(Qt=Math.max(Qt,Pt.start*te),pt=Math.min(pt,(Pt.start+Pt.count)*te)),kt!==null?(Qt=Math.max(Qt,0),pt=Math.min(pt,kt.count)):Se!=null&&(Qt=Math.max(Qt,0),pt=Math.min(pt,Se.count));let ee=pt-Qt;if(ee<0||ee===1/0)return;vt.setup(rt,nt,It,ut,kt);let ae,ne=O;if(kt!==null&&(ae=_.get(kt),ne=st,ne.setIndex(ae)),rt.isMesh)nt.wireframe===!0?(K.setLineWidth(nt.wireframeLinewidth*Vt()),ne.setMode(H.LINES)):ne.setMode(H.TRIANGLES);else if(rt.isLine){let Le=nt.linewidth;Le===void 0&&(Le=1),K.setLineWidth(Le*Vt()),rt.isLineSegments?ne.setMode(H.LINES):rt.isLineLoop?ne.setMode(H.LINE_LOOP):ne.setMode(H.LINE_STRIP)}else rt.isPoints?ne.setMode(H.POINTS):rt.isSprite&&ne.setMode(H.TRIANGLES);if(rt.isBatchedMesh)if(Nt.get("WEBGL_multi_draw"))ne.renderMultiDraw(rt._multiDrawStarts,rt._multiDrawCounts,rt._multiDrawCount);else{let Le=rt._multiDrawStarts,Xt=rt._multiDrawCounts,tn=rt._multiDrawCount,Ee=kt?_.get(kt).bytesPerElement:1,en=Q.get(nt).currentProgram.getUniforms();for(let rn=0;rn<tn;rn++)en.setValue(H,"_gl_DrawID",rn),ne.render(Le[rn]/Ee,Xt[rn])}else if(rt.isInstancedMesh)ne.renderInstances(Qt,ee,rt.count);else if(ut.isInstancedBufferGeometry){let Le=ut._maxInstanceCount!==void 0?ut._maxInstanceCount:1/0,Xt=Math.min(ut.instanceCount,Le);ne.renderInstances(Qt,ee,Xt)}else ne.render(Qt,ee)};function oe(A,W,ut,nt){Z!==null&&A.isNodeMaterial&&Z.setObject(nt,A),wt===!0&&G.setState(A,ut,!1),A.transparent===!0&&A.side===qi&&A.forceSinglePass===!1?(A.side=hi,A.needsUpdate=!0,Ri(A,W,nt),A.side=Cs,A.needsUpdate=!0,Ri(A,W,nt),A.side=qi):Ri(A,W,nt)}this.compile=function(A,W,ut=null){ut===null&&(ut=A),Z!==null&&Z.renderStart(A,W,ut),T=$.get(ut),T.init(W),S.push(T),ut.traverseVisible(function(rt){rt.isLight&&rt.layers.test(W.layers)&&(T.pushLight(rt),rt.castShadow&&T.pushShadow(rt))}),A!==ut&&A.traverseVisible(function(rt){rt.isLight&&rt.layers.test(W.layers)&&(T.pushLight(rt),rt.castShadow&&T.pushShadow(rt))}),T.setupLights(),Z!==null&&Z.updateLights(T.state.lightsArray),At=this.localClippingEnabled,wt=G.init(this.clippingPlanes,At),wt===!0&&G.setGlobalState(this.clippingPlanes,W),Z!==null&&et.render(T.state.shadowsArray,ut,W);let nt=new Set;return A.traverse(function(rt){if(!(rt.isMesh||rt.isPoints||rt.isLine||rt.isSprite))return;let Pt=rt.material;if(Pt)if(Array.isArray(Pt))for(let Kt=0;Kt<Pt.length;Kt++){let It=Pt[Kt];oe(It,ut,W,rt),nt.add(It)}else oe(Pt,ut,W,rt),nt.add(Pt)}),T=S.pop(),Z!==null&&Z.renderEnd(),nt},this.compileAsync=function(A,W,ut=null){let nt=this.compile(A,W,ut);return new Promise(rt=>{function Pt(){if(nt.forEach(function(Kt){let kt=Q.get(Kt).currentProgram;(kt===void 0||kt.isReady())&&nt.delete(Kt)}),nt.size===0){rt(A);return}setTimeout(Pt,10)}Nt.get("KHR_parallel_shader_compile")!==null?Pt():setTimeout(Pt,10)})};let _e=null;function Ht(A){_e&&_e(A)}function xe(){Et.stop()}function Pe(){Et.start()}let Et=new DT;Et.setAnimationLoop(Ht),typeof self<"u"&&Et.setContext(self),this.setAnimationLoop=function(A){_e=A,F.setAnimationLoop(A),A===null?Et.stop():Et.start()},F.addEventListener("sessionstart",xe),F.addEventListener("sessionend",Pe),this.render=function(A,W){if(W!==void 0&&W.isCamera!==!0){ue("WebGLRenderer.render: camera is not an instance of THREE.Camera.");return}if(R===!0)return;Z!==null&&Z.renderStart(A,W);let ut=F.enabled===!0&&F.isPresenting===!0,nt=C!==null&&(ot===null||ut)&&C.begin(D,ot);if(A.matrixWorldAutoUpdate===!0&&A.updateMatrixWorld(),W.parent===null&&W.matrixWorldAutoUpdate===!0&&W.updateMatrixWorld(),F.enabled===!0&&F.isPresenting===!0&&(C===null||C.isCompositing()===!1)&&(F.cameraAutoUpdate===!0&&F.updateCamera(W),W=F.getCamera()),A.isScene===!0&&A.onBeforeRender(D,A,W,ot),T=$.get(A,S.length),T.init(W),T.state.textureUnits=at.getTextureUnits(),S.push(T),Mt.multiplyMatrices(W.projectionMatrix,W.matrixWorldInverse),W.isArrayCamera?Tt.setFromArrayCamera(W):ht.setFromProjectionMatrix(Mt,ca,W.reversedDepth),At=this.localClippingEnabled,wt=G.init(this.clippingPlanes,At),w=xt.get(A,m.length),w.init(),m.push(w),this.info.render.frame++,F.enabled===!0&&F.isPresenting===!0){let Kt=D.xr.getDepthSensingMesh();Kt!==null&&Rt(Kt,W,-1/0,D.sortObjects)}Rt(A,W,0,D.sortObjects),w.finish(),Z!==null&&Z.updateLights(T.state.lightsArray),D.sortObjects===!0&&w.sort(gt,Zt),Jt=F.enabled===!1||F.isPresenting===!1||F.hasDepthSensing()===!1,Jt&&L.addToRenderList(w,A),this.info.autoReset===!0&&this.info.reset(),wt===!0&&G.beginShadows();let rt=T.state.shadowsArray;if(et.render(rt,A,W),wt===!0&&G.endShadows(),(nt&&C.hasRenderPass())===!1){let Kt=w.opaque,It=w.transmissive;if(T.setupLights(),W.isArrayCamera){let kt=W.cameras;if(It.length>0)for(let te=0,he=kt.length;te<he;te++){let Se=kt[te];pn(Kt,It,A,Se)}Jt&&L.render(A);for(let te=0,he=kt.length;te<he;te++){let Se=kt[te];we(w,A,Se,Se.viewport)}}else It.length>0&&pn(Kt,It,A,W),Jt&&L.render(A),we(w,A,W)}ot!==null&&B===0&&(at.updateMultisampleRenderTarget(ot),at.updateRenderTargetMipmap(ot)),nt&&C.end(D),A.isScene===!0&&A.onAfterRender(D,A,W),vt.resetDefaultState(),k=-1,Y=null,S.pop(),S.length>0?(T=S[S.length-1],at.setTextureUnits(T.state.textureUnits),wt===!0&&G.setGlobalState(D.clippingPlanes,T.state.camera)):T=null,m.pop(),m.length>0?w=m[m.length-1]:w=null,Z!==null&&Z.renderEnd()};function Rt(A,W,ut,nt){if(A.visible===!1)return;if(A.layers.test(W.layers)){if(A.isGroup)ut=A.renderOrder;else if(A.isLOD)A.autoUpdate===!0&&A.update(W);else if(A.isLight)T.pushLight(A),A.castShadow&&T.pushShadow(A);else if(A.isSprite){let Kt=W.isArrayCamera?Tt:ht;if(!A.frustumCulled||A.intersectsFrustum(Kt)){nt&&zt.setFromMatrixPosition(A.matrixWorld).applyMatrix4(Mt);let It=X.update(A),kt=A.material;kt.visible&&w.push(A,It,kt,ut,zt.z,null,W)}}else if(A.isMesh||A.isLine||A.isPoints){let Kt=W.isArrayCamera?Tt:ht;if(!A.frustumCulled||A.intersectsFrustum(Kt)){let It=X.update(A),kt=A.material;if(nt&&(A.boundingSphere!==void 0?(A.boundingSphere===null&&A.computeBoundingSphere(),zt.copy(A.boundingSphere.center)):(It.boundingSphere===null&&It.computeBoundingSphere(),zt.copy(It.boundingSphere.center)),zt.applyMatrix4(A.matrixWorld).applyMatrix4(Mt)),Array.isArray(kt)){let te=It.groups;for(let he=0,Se=te.length;he<Se;he++){let Qt=te[he],pt=kt[Qt.materialIndex];pt&&pt.visible&&w.push(A,It,pt,ut,zt.z,Qt,W)}}else kt.visible&&w.push(A,It,kt,ut,zt.z,null,W)}}}let Pt=A.children;for(let Kt=0,It=Pt.length;Kt<It;Kt++)Rt(Pt[Kt],W,ut,nt)}function we(A,W,ut,nt){let{opaque:rt,transmissive:Pt,transparent:Kt}=A;T.setupLightsView(ut),wt===!0&&G.setGlobalState(D.clippingPlanes,ut),nt&&K.viewport(N.copy(nt)),rt.length>0&&Ai(rt,W,ut),Pt.length>0&&Ai(Pt,W,ut),Kt.length>0&&Ai(Kt,W,ut),K.buffers.depth.setTest(!0),K.buffers.depth.setMask(!0),K.buffers.color.setMask(!0),K.setPolygonOffset(!1)}function pn(A,W,ut,nt){if((ut.isScene===!0?ut.overrideMaterial:null)!==null)return;if(T.state.transmissionRenderTarget[nt.id]===void 0){let Qt=Nt.has("EXT_color_buffer_half_float")||Nt.has("EXT_color_buffer_float");T.state.transmissionRenderTarget[nt.id]=new Vi(1,1,{generateMipmaps:!0,type:Qt?Ta:wi,minFilter:Sa,samples:Math.max(4,se.samples),stencilBuffer:r,resolveDepthBuffer:!1,resolveStencilBuffer:!1,storeMultisampledDepthBuffer:!1,storeMultisampledStencilBuffer:!1,colorSpace:Ne.workingColorSpace})}let Pt=T.state.transmissionRenderTarget[nt.id],Kt=nt.viewport||N;Pt.setSize(Kt.z*D.transmissionResolutionScale,Kt.w*D.transmissionResolutionScale);let It=D.getRenderTarget(),kt=D.getActiveCubeFace(),te=D.getActiveMipmapLevel();D.setRenderTarget(Pt),D.getClearColor(lt),_t=D.getClearAlpha(),_t<1&&D.setClearColor(16777215,.5),D.clear(),Jt&&L.render(ut);let he=D.toneMapping;D.toneMapping=$a;let Se=nt.viewport;if(nt.viewport!==void 0&&(nt.viewport=void 0),T.setupLightsView(nt),wt===!0&&G.setGlobalState(D.clippingPlanes,nt),Ai(A,ut,nt),at.updateMultisampleRenderTarget(Pt),at.updateRenderTargetMipmap(Pt),Nt.has("WEBGL_multisampled_render_to_texture")===!1){let Qt=!1;for(let pt=0,ee=W.length;pt<ee;pt++){let ae=W[pt],{object:ne,geometry:Le,material:Xt,group:tn}=ae;if(Xt.side===qi&&ne.layers.test(nt.layers)){let Ee=Xt.side;Xt.side=hi,Xt.needsUpdate=!0,fa(ne,ut,nt,Le,Xt,tn),Xt.side=Ee,Xt.needsUpdate=!0,Qt=!0}}Qt===!0&&(at.updateMultisampleRenderTarget(Pt),at.updateRenderTargetMipmap(Pt))}D.setRenderTarget(It,kt,te),D.setClearColor(lt,_t),Se!==void 0&&(nt.viewport=Se),D.toneMapping=he}function Ai(A,W,ut){let nt=W.isScene===!0?W.overrideMaterial:null;for(let rt=0,Pt=A.length;rt<Pt;rt++){let Kt=A[rt],{object:It,geometry:kt,group:te}=Kt,he=Kt.material;he.allowOverride===!0&&nt!==null&&(he=nt),It.layers.test(ut.layers)&&fa(It,W,ut,kt,he,te)}}function fa(A,W,ut,nt,rt,Pt){Z!==null&&rt.isNodeMaterial&&Z.setObject(A,rt),A.onBeforeRender(D,W,ut,nt,rt,Pt),A.modelViewMatrix.multiplyMatrices(ut.matrixWorldInverse,A.matrixWorld),A.normalMatrix.getNormalMatrix(A.modelViewMatrix),rt.onBeforeRender(D,W,ut,nt,A,Pt),rt.transparent===!0&&rt.side===qi&&rt.forceSinglePass===!1?(rt.side=hi,rt.needsUpdate=!0,D.renderBufferDirect(ut,W,nt,rt,A,Pt),rt.side=Cs,rt.needsUpdate=!0,D.renderBufferDirect(ut,W,nt,rt,A,Pt),rt.side=qi):D.renderBufferDirect(ut,W,nt,rt,A,Pt),A.onAfterRender(D,W,ut,nt,rt,Pt)}function Ca(A){let W=0;for(let ut of A)ut.texture!==null&&W++;return W}function Ri(A,W,ut){W.isScene!==!0&&(W=re);let nt=Q.get(A),rt=T.state.lights,Pt=T.state.shadowsArray,Kt=rt.state.version,It=it.getParameters(A,rt.state,Pt,W,ut,T.state.lightProbeGridArray),kt=it.getProgramCacheKey(It),te=nt.programs;nt.environment=A.isMeshStandardMaterial||A.isMeshLambertMaterial||A.isMeshPhongMaterial?W.environment:null,nt.fog=W.fog;let he=A.isMeshStandardMaterial||A.isMeshLambertMaterial&&!A.envMap||A.isMeshPhongMaterial&&!A.envMap;nt.envMap=E.get(A.envMap||nt.environment,he),nt.envMapRotation=nt.environment!==null&&A.envMap===null?W.environmentRotation:A.envMapRotation,te===void 0&&(A.addEventListener("dispose",Gt),te=new Map,nt.programs=te,nt.programVariants=new Map);let Se=te.get(kt);if(Se!==void 0){if(nt.currentProgram===Se&&nt.lightsStateVersion===Kt)return Ao(A,It),Se}else It.uniforms=it.getUniforms(A),Z!==null&&A.isNodeMaterial&&Z.build(A,ut,It),A.onBeforeCompile(It,D),Se=it.acquireProgram(It,kt),te.set(kt,Se),nt.uniforms=It.uniforms;let Qt=nt.uniforms;return(!A.isShaderMaterial&&!A.isRawShaderMaterial||A.clipping===!0)&&(Qt.clippingPlanes=G.uniform),Ao(A,It),nt.needsLights=xc(A),nt.lightsStateVersion=Kt,nt.needsLights&&(Qt.ambientLightColor.value=rt.state.ambient,Qt.lightProbe.value=rt.state.probe,Qt.sunLights.value=rt.state.sun,Qt.sunLightShadows.value=rt.state.sunShadow,Qt.directionalLights.value=rt.state.directional,Qt.directionalLightShadows.value=rt.state.directionalShadow,Qt.spotLights.value=rt.state.spot,Qt.spotLightShadows.value=rt.state.spotShadow,Qt.rectAreaLights.value=rt.state.rectArea,Qt.ltc_1.value=rt.state.rectAreaLTC1,Qt.ltc_2.value=rt.state.rectAreaLTC2,Qt.pointLights.value=rt.state.point,Qt.pointLightShadows.value=rt.state.pointShadow,Qt.hemisphereLights.value=rt.state.hemi,Qt.sunShadowMatrix.value=rt.state.sunShadowMatrix,Qt.sunShadowCascade.value=rt.state.sunShadowCascade,Qt.directionalShadowMatrix.value=rt.state.directionalShadowMatrix,Qt.spotLightMatrix.value=rt.state.spotLightMatrix,Qt.spotLightMap.value=rt.state.spotLightMap,Qt.pointShadowMatrix.value=rt.state.pointShadowMatrix),nt.numLightProbeGrids=Ca(T.state.lightProbeGridArray),nt.currentProgram=Se,nt.uniformsList=null,Se}function zs(A,W,ut,nt,rt){let Pt=Q.get(A),Kt=Pt.currentProgram.id+","+nt+","+rt,It=Pt.programVariants.get(Kt);return It===void 0?(It=Ri(A,W,ut),Pt.programVariants.set(Kt,It)):(Pt.currentProgram=It,Pt.uniformsList=null,Pt.outputColorSpace=nt,Pt.toneMapping=rt),It}function ni(A){if(A.uniformsList===null){let W=A.currentProgram.getUniforms();A.uniformsList=hc.seqWithValue(W.seq,A.uniforms)}return A.uniformsList}function Ao(A,W){let ut=Q.get(A);ut.outputColorSpace=W.outputColorSpace,ut.batching=W.batching,ut.batchingColor=W.batchingColor,ut.instancing=W.instancing,ut.instancingColor=W.instancingColor,ut.instancingMorph=W.instancingMorph,ut.skinning=W.skinning,ut.morphTargets=W.morphTargets,ut.morphNormals=W.morphNormals,ut.morphColors=W.morphColors,ut.morphTargetsCount=W.morphTargetsCount,ut.numClippingPlanes=W.numClippingPlanes,ut.numIntersection=W.numClipIntersection,ut.vertexAlphas=W.vertexAlphas,ut.vertexTangents=W.vertexTangents,ut.toneMapping=W.toneMapping}function vf(A,W,ut,nt,rt){W.isScene!==!0&&(W=re),at.resetTextureUnits();let Pt=W.fog,Kt=nt.isMeshStandardMaterial||nt.isMeshLambertMaterial||nt.isMeshPhongMaterial?W.environment:null,It=ot===null?D.outputColorSpace:ot.isXRRenderTarget===!0?ot.texture.colorSpace:Ne.workingColorSpace,kt=nt.isMeshStandardMaterial||nt.isMeshLambertMaterial&&!nt.envMap||nt.isMeshPhongMaterial&&!nt.envMap,te=E.get(nt.envMap||Kt,kt),he=nt.vertexColors===!0&&!!ut.attributes.color&&ut.attributes.color.itemSize===4,Se=!!ut.attributes.tangent&&(!!nt.normalMap||nt.anisotropy>0),Qt=!!ut.morphAttributes.position,pt=!!ut.morphAttributes.normal,ee=!!ut.morphAttributes.color,ae=$a;nt.toneMapped&&(ot===null||ot.isXRRenderTarget===!0)&&(ae=D.toneMapping);let ne=ut.morphAttributes.position||ut.morphAttributes.normal||ut.morphAttributes.color,Le=ne!==void 0?ne.length:0,Xt=Q.get(nt),tn=T.state.lights;if(wt===!0&&(At===!0||A!==Y)){let Ie=A===Y&&nt.id===k;G.setState(nt,A,Ie)}let Ee=!1,en=!1;nt.version===Xt.__version?Xt.needsLights&&Xt.lightsStateVersion!==tn.state.version||rt.isBatchedMesh&&Xt.batching===!1||!rt.isBatchedMesh&&Xt.batching===!0||rt.isBatchedMesh&&Xt.batchingColor===!0&&rt._colorsTexture===null||rt.isBatchedMesh&&Xt.batchingColor===!1&&rt._colorsTexture!==null||rt.isInstancedMesh&&Xt.instancing===!1||!rt.isInstancedMesh&&Xt.instancing===!0||rt.isSkinnedMesh&&Xt.skinning===!1||!rt.isSkinnedMesh&&Xt.skinning===!0||rt.isInstancedMesh&&Xt.instancingColor===!0&&rt.instanceColor===null||rt.isInstancedMesh&&Xt.instancingColor===!1&&rt.instanceColor!==null||rt.isInstancedMesh&&Xt.instancingMorph===!0&&rt.morphTexture===null||rt.isInstancedMesh&&Xt.instancingMorph===!1&&rt.morphTexture!==null||Xt.envMap!==te||nt.fog===!0&&Xt.fog!==Pt||Xt.numClippingPlanes!==void 0&&(Xt.numClippingPlanes!==G.numPlanes||Xt.numIntersection!==G.numIntersection)||Xt.vertexAlphas!==he||Xt.vertexTangents!==Se||Xt.morphTargets!==Qt||Xt.morphNormals!==pt||Xt.morphColors!==ee||Xt.morphTargetsCount!==Le||Xt.numLightProbeGrids!==Ca(T.state.lightProbeGridArray)?Ee=!0:(Xt.outputColorSpace!==It||Xt.toneMapping!==ae)&&(en=!0):(Ee=!0,Xt.__version=nt.version);let rn=Xt.currentProgram;(Ee===!0||en===!0)&&(rn=en===!0?zs(nt,W,rt,It,ae):Ri(nt,W,rt),Z&&nt.isNodeMaterial&&Z.onUpdateProgram(nt,rn,Xt));let Da=!1,Ki=!1,or=!1,ye=rn.getUniforms(),gn=Xt.uniforms;if(K.useProgram(rn.program)&&(Da=!0,Ki=!0,or=!0),nt.id!==k&&(k=nt.id,Ki=!0),Da||Y!==A){K.buffers.depth.getReversed()&&A.reversedDepth!==!0&&(A._reversedDepth=!0,A.updateProjectionMatrix()),ye.setValue(H,"projectionMatrix",A.projectionMatrix),ye.setValue(H,"viewMatrix",A.matrixWorldInverse);let ge=ye.map.cameraPosition;ge!==void 0&&ge.setValue(H,Yt.setFromMatrixPosition(A.matrixWorld)),se.logarithmicDepthBuffer&&ye.setValue(H,"logDepthBufFC",2/(Math.log(A.far+1)/Math.LN2)),(nt.isMeshPhongMaterial||nt.isMeshToonMaterial||nt.isMeshLambertMaterial||nt.isMeshBasicMaterial||nt.isMeshStandardMaterial||nt.isShaderMaterial)&&ye.setValue(H,"isOrthographic",A.isOrthographicCamera===!0),Y!==A&&(Y=A,Ki=!0,or=!0)}if(Xt.needsLights&&(tn.state.sunShadowMap.length>0&&ye.setValue(H,"sunShadowMap",tn.state.sunShadowMap,at),tn.state.directionalShadowMap.length>0&&ye.setValue(H,"directionalShadowMap",tn.state.directionalShadowMap,at),tn.state.spotShadowMap.length>0&&ye.setValue(H,"spotShadowMap",tn.state.spotShadowMap,at),tn.state.pointShadowMap.length>0&&ye.setValue(H,"pointShadowMap",tn.state.pointShadowMap,at)),rt.isSkinnedMesh){ye.setOptional(H,rt,"bindMatrix"),ye.setOptional(H,rt,"bindMatrixInverse");let Ie=rt.skeleton;Ie&&(Ie.boneTexture===null&&Ie.computeBoneTexture(),ye.setValue(H,"boneTexture",Ie.boneTexture,at))}rt.isBatchedMesh&&(ye.setOptional(H,rt,"batchingTexture"),ye.setValue(H,"batchingTexture",rt._matricesTexture,at),ye.setOptional(H,rt,"batchingIdTexture"),ye.setValue(H,"batchingIdTexture",rt._indirectTexture,at),ye.setOptional(H,rt,"batchingColorTexture"),rt._colorsTexture!==null&&ye.setValue(H,"batchingColorTexture",rt._colorsTexture,at));let sn=ut.morphAttributes;if((sn.position!==void 0||sn.normal!==void 0||sn.color!==void 0)&&U.update(rt,ut,rn),(Ki||Xt.receiveShadow!==rt.receiveShadow)&&(Xt.receiveShadow=rt.receiveShadow,ye.setValue(H,"receiveShadow",rt.receiveShadow)),(nt.isMeshStandardMaterial||nt.isMeshLambertMaterial||nt.isMeshPhongMaterial)&&nt.envMap===null&&W.environment!==null&&(gn.envMapIntensity.value=W.environmentIntensity),gn.dfgLUT!==void 0&&(gn.dfgLUT.value=lI()),Ki){if(ye.setValue(H,"toneMappingExposure",D.toneMappingExposure),Xt.needsLights&&vc(gn,or),Pt&&nt.fog===!0&&dt.refreshFogUniforms(gn,Pt),dt.refreshMaterialUniforms(gn,nt,Lt,Ft,T.state.transmissionRenderTarget[A.id]),Xt.needsLights&&Xt.numLightProbeGrids>0){let Ie=y,ge=0;for(let zn of T.state.lightProbeGridArray)zn.texture!==null&&(Ie.textures[ge]=zn.texture,Ie.min[ge]=zn.boundingBox.min,Ie.max[ge]=zn.boundingBox.max,Ie.resolution[ge]=zn.resolution,ge++);for(let zn in Ie)Ie[zn].length=ge;gn.probesSH.value=Ie.textures,gn.probesMin.value=Ie.min,gn.probesMax.value=Ie.max,gn.probesResolution.value=Ie.resolution}hc.upload(H,ni(Xt),gn,at)}if(nt.isShaderMaterial&&nt.uniformsNeedUpdate===!0&&(hc.upload(H,ni(Xt),gn,at),nt.uniformsNeedUpdate=!1),nt.isSpriteMaterial&&ye.setValue(H,"center",rt.center),ye.setValue(H,"modelViewMatrix",rt.modelViewMatrix),ye.setValue(H,"normalMatrix",rt.normalMatrix),ye.setValue(H,"modelMatrix",rt.matrixWorld),nt.uniformsGroups!==void 0){let Ie=nt.uniformsGroups;for(let ge=0,zn=Ie.length;ge<zn;ge++){let yc=Ie[ge];Ut.update(yc,rn),Ut.bind(yc,rn)}}return rn}function vc(A,W){A.ambientLightColor.needsUpdate=W,A.lightProbe.needsUpdate=W,A.sunLights.needsUpdate=W,A.sunLightShadows.needsUpdate=W,A.directionalLights.needsUpdate=W,A.directionalLightShadows.needsUpdate=W,A.pointLights.needsUpdate=W,A.pointLightShadows.needsUpdate=W,A.spotLights.needsUpdate=W,A.spotLightShadows.needsUpdate=W,A.rectAreaLights.needsUpdate=W,A.hemisphereLights.needsUpdate=W}function xc(A){return A.isMeshLambertMaterial||A.isMeshToonMaterial||A.isMeshPhongMaterial||A.isMeshStandardMaterial||A.isShadowMaterial||A.isShaderMaterial&&A.lights===!0}this.getActiveCubeFace=function(){return j},this.getActiveMipmapLevel=function(){return B},this.getRenderTarget=function(){return ot},this.setRenderTargetTextures=function(A,W,ut){let nt=Q.get(A);nt.__autoAllocateDepthBuffer=A.resolveDepthBuffer===!1,nt.__autoAllocateDepthBuffer===!1&&(nt.__useRenderToTexture=!1),Q.get(A.texture).__webglTexture=W,Q.get(A.depthTexture).__webglTexture=nt.__autoAllocateDepthBuffer?void 0:ut,nt.__hasExternalTextures=!0},this.setRenderTargetFramebuffer=function(A,W){let ut=Q.get(A);ut.__webglFramebuffer=W,ut.__useDefaultFramebuffer=W===void 0},this.setRenderTarget=function(A,W=0,ut=0){ot=A,j=W,B=ut;let nt=null,rt=!1,Pt=!1;if(A){let It=Q.get(A);if(It.__useDefaultFramebuffer!==void 0){K.bindFramebuffer(H.FRAMEBUFFER,It.__webglFramebuffer),N.copy(A.viewport),yt.copy(A.scissor),Dt=A.scissorTest,K.viewport(N),K.scissor(yt),K.setScissorTest(Dt),k=-1;return}else if(It.__webglFramebuffer===void 0)at.setupRenderTarget(A);else if(It.__hasExternalTextures)at.rebindTextures(A,Q.get(A.texture).__webglTexture,Q.get(A.depthTexture).__webglTexture);else if(A.depthBuffer){let he=A.depthTexture;if(It.__boundDepthTexture!==he){if(he!==null&&Q.has(he)&&(A.width!==he.image.width||A.height!==he.image.height))throw new Error("THREE.WebGLRenderer: Attached DepthTexture is initialized to the incorrect size.");at.setupDepthRenderbuffer(A)}}let kt=A.texture;(kt.isData3DTexture||kt.isDataArrayTexture||kt.isCompressedArrayTexture)&&(Pt=!0);let te=Q.get(A).__webglFramebuffer;A.isWebGLCubeRenderTarget?(Array.isArray(te[W])?nt=te[W][ut]:nt=te[W],rt=!0):A.samples>0&&at.useMultisampledRTT(A)===!1?nt=Q.get(A).__webglMultisampledFramebuffer:Array.isArray(te)?nt=te[ut]:nt=te,N.copy(A.viewport),yt.copy(A.scissor),Dt=A.scissorTest}else N.copy(I).multiplyScalar(Lt).floor(),yt.copy(jt).multiplyScalar(Lt).floor(),Dt=$t;if(ut!==0&&(nt=tt),K.bindFramebuffer(H.FRAMEBUFFER,nt)&&K.drawBuffers(A,nt),K.viewport(N),K.scissor(yt),K.setScissorTest(Dt),rt){let It=Q.get(A.texture);H.framebufferTexture2D(H.FRAMEBUFFER,H.COLOR_ATTACHMENT0,H.TEXTURE_CUBE_MAP_POSITIVE_X+W,It.__webglTexture,ut)}else if(Pt){let It=W;for(let kt=0;kt<A.textures.length;kt++){let te=Q.get(A.textures[kt]);H.framebufferTextureLayer(H.FRAMEBUFFER,H.COLOR_ATTACHMENT0+kt,te.__webglTexture,ut,It)}}else if(A!==null&&ut!==0){let It=Q.get(A.texture);H.framebufferTexture2D(H.FRAMEBUFFER,H.COLOR_ATTACHMENT0,H.TEXTURE_2D,It.__webglTexture,ut)}k=-1};function Ro(A){let W=Q.get(A);return(W.__readFormat!==A.format||W.__readType!==A.type)&&(W.__readFormat=A.format,W.__readType=A.type,W.__formatReadable=se.textureFormatReadable(A.format),W.__typeReadable=se.textureTypeReadable(A.type)),W}this.readRenderTargetPixels=function(A,W,ut,nt,rt,Pt,Kt,It=0){if(!(A&&A.isWebGLRenderTarget)){ue("WebGLRenderer.readRenderTargetPixels: renderTarget is not THREE.WebGLRenderTarget.");return}let kt=Q.get(A).__webglFramebuffer;if(A.isWebGLCubeRenderTarget&&Kt!==void 0&&(kt=kt[Kt],Array.isArray(kt)&&(kt=kt[0])),kt){K.bindFramebuffer(H.FRAMEBUFFER,kt);try{let te=A.textures[It],he=te.format,Se=te.type;A.textures.length>1&&H.readBuffer(H.COLOR_ATTACHMENT0+It);let Qt=Ro(te);if(Qt.__formatReadable===!1){ue("WebGLRenderer.readRenderTargetPixels: renderTarget is not in RGBA or implementation defined format.");return}if(Qt.__typeReadable===!1){ue("WebGLRenderer.readRenderTargetPixels: renderTarget is not in UnsignedByteType or implementation defined type.");return}W>=0&&W<=A.width-nt&&ut>=0&&ut<=A.height-rt&&H.readPixels(W,ut,nt,rt,ft.convert(he),ft.convert(Se),Pt)}finally{let te=ot!==null?Q.get(ot).__webglFramebuffer:null;K.bindFramebuffer(H.FRAMEBUFFER,te)}}},this.readRenderTargetPixelsAsync=async function(A,W,ut,nt,rt,Pt,Kt,It=0){if(!(A&&A.isWebGLRenderTarget))throw new Error("THREE.WebGLRenderer.readRenderTargetPixels: renderTarget is not THREE.WebGLRenderTarget.");let kt=Q.get(A).__webglFramebuffer;if(A.isWebGLCubeRenderTarget&&Kt!==void 0&&(kt=kt[Kt],Array.isArray(kt)&&(kt=kt[0])),kt)if(W>=0&&W<=A.width-nt&&ut>=0&&ut<=A.height-rt){K.bindFramebuffer(H.FRAMEBUFFER,kt);let te=A.textures[It],he=te.format,Se=te.type;A.textures.length>1&&H.readBuffer(H.COLOR_ATTACHMENT0+It);let Qt=Ro(te);if(Qt.__formatReadable===!1)throw new Error("THREE.WebGLRenderer.readRenderTargetPixelsAsync: renderTarget is not in RGBA or implementation defined format.");if(Qt.__typeReadable===!1)throw new Error("THREE.WebGLRenderer.readRenderTargetPixelsAsync: renderTarget is not in UnsignedByteType or implementation defined type.");let pt=H.createBuffer();H.bindBuffer(H.PIXEL_PACK_BUFFER,pt),H.bufferData(H.PIXEL_PACK_BUFFER,Pt.byteLength,H.STREAM_READ),H.readPixels(W,ut,nt,rt,ft.convert(he),ft.convert(Se),0),H.bindBuffer(H.PIXEL_PACK_BUFFER,null);let ee=ot!==null?Q.get(ot).__webglFramebuffer:null;K.bindFramebuffer(H.FRAMEBUFFER,ee);let ae=H.fenceSync(H.SYNC_GPU_COMMANDS_COMPLETE,0);return H.flush(),await QE(H,ae,4),H.bindBuffer(H.PIXEL_PACK_BUFFER,pt),H.getBufferSubData(H.PIXEL_PACK_BUFFER,0,Pt),H.bindBuffer(H.PIXEL_PACK_BUFFER,null),H.deleteBuffer(pt),H.deleteSync(ae),Pt}else throw new Error("THREE.WebGLRenderer.readRenderTargetPixelsAsync: requested read bounds are out of range.")},this.copyFramebufferToTexture=function(A,W=null,ut=0){let nt=Math.pow(2,-ut),rt=Math.floor(A.image.width*nt),Pt=Math.floor(A.image.height*nt),Kt=W!==null?W.x:0,It=W!==null?W.y:0;at.setTexture2D(A,0),H.copyTexSubImage2D(H.TEXTURE_2D,ut,0,0,Kt,It,rt,Pt),K.unbindTexture()},this.copyTextureToTexture=function(A,W,ut=null,nt=null,rt=0,Pt=0){let Kt,It,kt,te,he,Se,Qt,pt,ee,ae=A.isCompressedTexture?A.mipmaps[Pt]:A.image;if(ut!==null)Kt=ut.max.x-ut.min.x,It=ut.max.y-ut.min.y,kt=ut.isBox3?ut.max.z-ut.min.z:1,te=ut.min.x,he=ut.min.y,Se=ut.isBox3?ut.min.z:0;else{let ye=Math.pow(2,-rt);Kt=Math.floor(ae.width*ye),It=Math.floor(ae.height*ye),A.isDataArrayTexture?kt=ae.depth:A.isData3DTexture?kt=Math.floor(ae.depth*ye):kt=1,te=0,he=0,Se=0}nt!==null?(Qt=nt.x,pt=nt.y,ee=nt.z):(Qt=0,pt=0,ee=0);let ne=ft.convert(W.format),Le=ft.convert(W.type),Xt;W.isData3DTexture?(at.setTexture3D(W,0),Xt=H.TEXTURE_3D):W.isDataArrayTexture||W.isCompressedArrayTexture?(at.setTexture2DArray(W,0),Xt=H.TEXTURE_2D_ARRAY):(at.setTexture2D(W,0),Xt=H.TEXTURE_2D),K.activeTexture(H.TEXTURE0),K.pixelStorei(H.UNPACK_FLIP_Y_WEBGL,W.flipY),K.pixelStorei(H.UNPACK_PREMULTIPLY_ALPHA_WEBGL,W.premultiplyAlpha),K.pixelStorei(H.UNPACK_ALIGNMENT,W.unpackAlignment);let tn=K.getParameter(H.UNPACK_ROW_LENGTH),Ee=K.getParameter(H.UNPACK_IMAGE_HEIGHT),en=K.getParameter(H.UNPACK_SKIP_PIXELS),rn=K.getParameter(H.UNPACK_SKIP_ROWS),Da=K.getParameter(H.UNPACK_SKIP_IMAGES);K.pixelStorei(H.UNPACK_ROW_LENGTH,ae.width),K.pixelStorei(H.UNPACK_IMAGE_HEIGHT,ae.height),K.pixelStorei(H.UNPACK_SKIP_PIXELS,te),K.pixelStorei(H.UNPACK_SKIP_ROWS,he),K.pixelStorei(H.UNPACK_SKIP_IMAGES,Se);let Ki=A.isDataArrayTexture||A.isData3DTexture,or=W.isDataArrayTexture||W.isData3DTexture;if(A.isDepthTexture){let ye=Q.get(A),gn=Q.get(W),sn=Q.get(ye.__renderTarget),Ie=Q.get(gn.__renderTarget);K.bindFramebuffer(H.READ_FRAMEBUFFER,sn.__webglFramebuffer),K.bindFramebuffer(H.DRAW_FRAMEBUFFER,Ie.__webglFramebuffer);for(let ge=0;ge<kt;ge++)Ki&&(H.framebufferTextureLayer(H.READ_FRAMEBUFFER,H.COLOR_ATTACHMENT0,Q.get(A).__webglTexture,rt,Se+ge),H.framebufferTextureLayer(H.DRAW_FRAMEBUFFER,H.COLOR_ATTACHMENT0,Q.get(W).__webglTexture,Pt,ee+ge)),H.blitFramebuffer(te,he,te+Kt,he+It,Qt,pt,Qt+Kt,pt+It,H.DEPTH_BUFFER_BIT,H.NEAREST);K.bindFramebuffer(H.READ_FRAMEBUFFER,null),K.bindFramebuffer(H.DRAW_FRAMEBUFFER,null)}else if(rt!==0||A.isRenderTargetTexture||Q.has(A)){let ye=Q.get(A),gn=Q.get(W);K.bindFramebuffer(H.READ_FRAMEBUFFER,z),K.bindFramebuffer(H.DRAW_FRAMEBUFFER,J);for(let sn=0;sn<kt;sn++)Ki?H.framebufferTextureLayer(H.READ_FRAMEBUFFER,H.COLOR_ATTACHMENT0,ye.__webglTexture,rt,Se+sn):H.framebufferTexture2D(H.READ_FRAMEBUFFER,H.COLOR_ATTACHMENT0,H.TEXTURE_2D,ye.__webglTexture,rt),or?H.framebufferTextureLayer(H.DRAW_FRAMEBUFFER,H.COLOR_ATTACHMENT0,gn.__webglTexture,Pt,ee+sn):H.framebufferTexture2D(H.DRAW_FRAMEBUFFER,H.COLOR_ATTACHMENT0,H.TEXTURE_2D,gn.__webglTexture,Pt),rt!==0?H.blitFramebuffer(te,he,te+Kt,he+It,Qt,pt,Qt+Kt,pt+It,H.COLOR_BUFFER_BIT,H.NEAREST):or?H.copyTexSubImage3D(Xt,Pt,Qt,pt,ee+sn,te,he,Kt,It):H.copyTexSubImage2D(Xt,Pt,Qt,pt,te,he,Kt,It);K.bindFramebuffer(H.READ_FRAMEBUFFER,null),K.bindFramebuffer(H.DRAW_FRAMEBUFFER,null)}else or?A.isDataTexture||A.isData3DTexture?H.texSubImage3D(Xt,Pt,Qt,pt,ee,Kt,It,kt,ne,Le,ae.data):W.isCompressedArrayTexture?H.compressedTexSubImage3D(Xt,Pt,Qt,pt,ee,Kt,It,kt,ne,ae.data):H.texSubImage3D(Xt,Pt,Qt,pt,ee,Kt,It,kt,ne,Le,ae):A.isDataTexture?H.texSubImage2D(H.TEXTURE_2D,Pt,Qt,pt,Kt,It,ne,Le,ae.data):A.isCompressedTexture?H.compressedTexSubImage2D(H.TEXTURE_2D,Pt,Qt,pt,ae.width,ae.height,ne,ae.data):H.texSubImage2D(H.TEXTURE_2D,Pt,Qt,pt,Kt,It,ne,Le,ae);K.pixelStorei(H.UNPACK_ROW_LENGTH,tn),K.pixelStorei(H.UNPACK_IMAGE_HEIGHT,Ee),K.pixelStorei(H.UNPACK_SKIP_PIXELS,en),K.pixelStorei(H.UNPACK_SKIP_ROWS,rn),K.pixelStorei(H.UNPACK_SKIP_IMAGES,Da),Pt===0&&W.generateMipmaps===!0&&W.mipmapsAutoUpdate===!0&&H.generateMipmap(Xt),K.unbindTexture()},this.initRenderTarget=function(A){Q.get(A).__webglFramebuffer===void 0&&at.setupRenderTarget(A)},this.initTexture=function(A){A.isCubeTexture?at.setTextureCube(A,0):A.isData3DTexture?at.setTexture3D(A,0):A.isDataArrayTexture||A.isCompressedArrayTexture?at.setTexture2DArray(A,0):at.setTexture2D(A,0),K.unbindTexture()},this.resetState=function(){j=0,B=0,ot=null,K.reset(),vt.reset()},typeof __THREE_DEVTOOLS__<"u"&&__THREE_DEVTOOLS__.dispatchEvent(new CustomEvent("observe",{detail:this}))}get coordinateSystem(){return ca}get outputColorSpace(){return this._outputColorSpace}set outputColorSpace(t){this._outputColorSpace=t;let n=this.getContext();n.drawingBufferColorSpace=Ne._getDrawingBufferColorSpace(t),n.unpackColorSpace=Ne._getUnpackColorSpace()}};var rw=Ce(an(),1),XT={portrait:[1.6,2.25],landscape:[2.25,1.6]},hI={left:.27,center:.5,right:.73},mf=.018,di=.007,Sn=4,WT=1/.05,dI=1/960,pI=2,Or=72,qT=24,Kx=.36,$T=.095,mI=.0135,nm=.036,pf=.15,YT=1024,ZT={glossy:{roughness:.42,metalness:0,clearcoat:1,clearcoatRoughness:.06,foil:0,anisotropy:0},matte:{roughness:.85,metalness:0,clearcoat:0,clearcoatRoughness:.6,foil:0,anisotropy:0},holographic:{roughness:.3,metalness:0,clearcoat:1,clearcoatRoughness:.04,foil:1,anisotropy:0},metallic:{roughness:.36,metalness:.75,clearcoat:.5,clearcoatRoughness:.18,foil:0,anisotropy:.7}},im=[0,.07,.93,1],gI=[-.95,-.28,.28,.95],vI=9,xI=`
varying vec2 vFoilUv;
varying vec3 vFoilX;
varying vec3 vFoilY;
`,yI=`
vFoilUv = uv;
vFoilX = normalize((modelViewMatrix * vec4(1.0, 0.0, 0.0, 0.0)).xyz);
vFoilY = normalize((modelViewMatrix * vec4(0.0, 1.0, 0.0, 0.0)).xyz);
`,_I=`
uniform float foilStrength;
uniform float foilAspect;
uniform vec3 foilKey;
uniform vec3 foilFill;
uniform vec3 foilTop;
varying vec2 vFoilUv;
varying vec3 vFoilX;
varying vec3 vFoilY;

float foilHash(vec2 p) {
  p = fract(p * vec2(234.34, 435.345));
  p += dot(p, p + 34.23);
  return fract(p.x * p.y);
}

float foilBump(float t, float center, float width) {
  float x = (t - center) / width;
  return max(0.0, 1.0 - x * x);
}

vec3 foilSpectrum(float t) {
  return vec3(
    foilBump(t, 0.82, 0.32) + 0.4 * foilBump(t, 0.02, 0.12),
    foilBump(t, 0.5, 0.26),
    foilBump(t, 0.18, 0.24)
  );
}

vec3 foilGrating(float u, float spacing) {
  vec3 color = vec3(0.0);
  for (int m = 1; m <= 2; m++) {
    float order = float(m);
    float t = (spacing * abs(u) / order - 0.38) / 0.32;
    color += foilSpectrum(t) / order;
  }
  return color;
}

vec3 foilShard(vec2 p) {
  vec2 base = floor(p);
  float best = 9.0;
  float edge = 9.0;
  vec2 id = base;
  for (int j = -1; j <= 1; j++) {
    for (int i = -1; i <= 1; i++) {
      vec2 cell = base + vec2(float(i), float(j));
      vec2 site = cell + vec2(foilHash(cell), foilHash(cell + 7.31)) * 0.9 + 0.05;
      float d = length(site - p);
      if (d < best) {
        edge = best;
        best = d;
        id = cell;
      } else if (d < edge) {
        edge = d;
      }
    }
  }
  return vec3(foilHash(id + 3.17), foilHash(id + 11.73), edge - best);
}
`,bI=`
if (foilStrength > 0.0) {
  vec3 foilView = normalize(vViewPosition);
  vec3 foilNormal = normalize(normal);
  vec2 foilP = vec2(vFoilUv.x, vFoilUv.y * foilAspect);
  vec3 shard = foilShard(foilP * 26.0);
  vec2 ray = foilP - vec2(-1.6, 2.6 * foilAspect);
  float angle = atan(ray.y, ray.x) + (shard.x - 0.5) * 0.16;
  vec3 grating = normalize(vFoilX * cos(angle) + vFoilY * sin(angle));
  float spacing = 1.7 * (0.95 + shard.y * 0.1);
  vec3 rainbow = foilGrating(dot(foilKey + foilView, grating), spacing);
  rainbow += 0.6 * foilGrating(dot(foilTop + foilView, grating), spacing);
  rainbow *= 0.8 + 0.2 * smoothstep(0.0, 0.04, shard.z);
  rainbow = max(rainbow - 0.35 * min(rainbow.r, min(rainbow.g, rainbow.b)), 0.0);
  vec2 grid = foilP * 64.0;
  vec2 cell = floor(grid);
  vec2 jitter = vec2(foilHash(cell + 1.7), foilHash(cell + 9.2));
  float flake = smoothstep(0.32, 0.06, length(fract(grid) - jitter * 0.6 - 0.2)) * step(0.45, foilHash(cell + 4.4));
  vec3 facet = normalize(foilNormal + (vFoilX * (jitter.x - 0.5) + vFoilY * (jitter.y - 0.5)) * 0.8);
  float glint = pow(max(dot(reflect(-foilKey, facet), foilView), 0.0), 28.0);
  glint += 0.7 * pow(max(dot(reflect(-foilTop, facet), foilView), 0.0), 28.0);
  float fine = 1.0 - smoothstep(0.35, 0.9, max(fwidth(grid.x), fwidth(grid.y)));
  vec3 sparkle = flake * glint * fine * (vec3(0.7) + foilGrating(dot(foilKey + foilView, grating) + jitter.x * 0.4, spacing));
  float ink = dot(diffuseColor.rgb, vec3(0.2126, 0.7152, 0.0722));
  float foil = foilStrength * (0.08 + 0.92 * smoothstep(0.04, 0.7, ink));
  float facing = clamp(dot(foilNormal, foilView), 0.0, 1.0);
  float tint = clamp(dot(rainbow, vec3(0.4)), 0.0, 1.0);
  outgoingLight = outgoingLight * (1.0 - foil * (0.3 + 0.32 * tint)) + (rainbow * 0.62 * (0.4 + 0.6 * facing) + sparkle * 1.6) * foil;
}
`,JT={silver:{color:"#d9dce2",roughness:.16},gold:{color:"#e4b965",roughness:.2},graphite:{color:"#4d4f55",roughness:.28}},Ns=(e,t,n)=>Math.min(n,Math.max(t,e)),df=(e,t,n)=>e+(t-e)*n,jx=(e,t)=>{try{let n=document.createElement("canvas").getContext("2d");if(!n)return t;n.fillStyle="#000000",n.fillStyle=e;let i=n.fillStyle;if(i.startsWith("#")){let r=parseInt(i.slice(1),16);return[(r>>16&255)/255,(r>>8&255)/255,(r&255)/255]}let a=i.match(/[\d.]+/g);return!a||a.length<3?t:[Number(a[0])/255,Number(a[1])/255,Number(a[2])/255]}catch{return t}},SI=e=>.2126*e[0]+.7152*e[1]+.0722*e[2],am=(e,t=1)=>`rgba(${Math.round(e[0]*255)}, ${Math.round(e[1]*255)}, ${Math.round(e[2]*255)}, ${t})`,tw=e=>{let t=e>>>0;return()=>{t=t+1831565813>>>0;let n=t;return n=Math.imul(n^n>>>15,n|1),n^=n+Math.imul(n^n>>>7,n|61),((n^n>>>14)>>>0)/4294967296}},ty=(e,t,n,i,a,r)=>{let s=Math.max(0,Math.min(r,i/2,a/2)),l=s*.4477;e.moveTo(t+s,n),e.lineTo(t+i-s,n),e.bezierCurveTo(t+i-l,n,t+i,n+l,t+i,n+s),e.lineTo(t+i,n+a-s),e.bezierCurveTo(t+i,n+a-l,t+i-l,n+a,t+i-s,n+a),e.lineTo(t+s,n+a),e.bezierCurveTo(t+l,n+a,t,n+a-l,t,n+a-s),e.lineTo(t,n+s),e.bezierCurveTo(t,n+l,t+l,n,t+s,n)},Qx=(e,t)=>{if(!t)return Promise.resolve(null);let n=e.get(t);if(n)return n;let i=new Promise(a=>{let r=new Image;r.crossOrigin="anonymous",r.decoding="async",r.onload=()=>a(r),r.onerror=()=>a(null),r.src=t});return e.set(t,i),i},KT=(e,t)=>{let[n,i]=XT[e]||XT.portrait,a=df(.03,Math.min(n,i)*.2,Ns(t,0,1)),r={width:.34,height:.07,y:i/2-.13},s=i/2-.055;return{width:n,height:i,radius:a,slot:r,ringY:s,hangY:s+$T}},MI=e=>{let{width:t,height:n,radius:i,slot:a}=e,r=new Es;ty(r,-t/2+di,-n/2+di,t-di*2,n-di*2,Math.max(i-di,.005));let s=new go;ty(s,-a.width/2-di,a.y-a.height/2-di,a.width+di*2,a.height+di*2,a.height/2+di),r.holes.push(s);let l=new nc(r,{depth:mf,bevelEnabled:!0,bevelThickness:di,bevelSize:di,bevelSegments:5,curveSegments:24});l.translate(0,0,-mf/2);let o=new Yu(r,24),c=o.getAttribute("position"),u=o.getAttribute("uv");for(let p=0;p<c.count;p++)u.setXY(p,(c.getX(p)+t/2)/t,(c.getY(p)+n/2)/n);return u.needsUpdate=!0,{body:l,face:o}},jT=e=>{let t=new Es,n=e*1.16;ty(t,-n/2+.014,-pf/2+.014,n-.028,pf-.028,.024);let i=new nc(t,{depth:.02,bevelEnabled:!0,bevelThickness:.014,bevelSize:.014,bevelSegments:6,curveSegments:10});return i.translate(0,0,-.01),i},EI=e=>{let t=im.length,n=new ki;n.setAttribute("position",new Ti(new Float32Array(e*t*3),3)),n.setAttribute("normal",new Ti(new Float32Array(e*t*3),3)),n.setAttribute("uv",new Ti(new Float32Array(e*t*2),2));let i=[];for(let a=0;a<e-1;a++)for(let r=0;r<t-1;r++){let s=a*t+r;i.push(s,s+t,s+1,s+1,s+t,s+t+1)}return n.setIndex(i),n},TI=e=>{let t=new Zl;t.background=new me(.035,.035,.04);let n=new xo(1,1),i=[],a=(l,o,c,u=0)=>{let p=new Kl({color:new me(l,l,l),side:qi});i.push(p);let f=new wn(n,p);f.position.set(...o),f.scale.set(c[0],c[1],1),f.lookAt(0,0,0),f.rotateZ(u),t.add(f)};a(2.6,[0,4.5,8],[9,4]),a(6,[-5.5,.5,7],[.9,14]),a(4,[5,-.5,8],[.6,14]),a(3.5,[0,-1,9],[24,.35],Math.PI/3),a(2.5,[1,2.5,9],[24,.2],Math.PI/3),a(1.4,[0,6,-6],[12,4]),a(.5,[0,-7,1],[16,6]),a(.9,[8,0,-2],[4,10]);let r=new dc(e),s=r.fromScene(t,.035);return r.dispose(),n.dispose(),i.forEach(l=>l.dispose()),s},$x=(e,t)=>{let n=new mo(e);return n.colorSpace=Wn,n.anisotropy=t,n},wI=()=>{let t=document.createElement("canvas");t.width=128,t.height=128;let n=t.getContext("2d");if(!n)return new mo(t);let i=tw(7),a=Float32Array.from({length:16384},()=>i()),r=(o,c)=>{let u=0;for(let p=-1;p<=1;p++)for(let f=-1;f<=1;f++)u+=a[(c+p+128)%128*128+(o+f+128)%128];return u/9*1.6},s=n.createImageData(128,128);for(let o=0;o<128;o++)for(let c=0;c<128;c++){let u=r((c-1+128)%128,o)-r((c+1)%128,o),p=r(c,(o-1+128)%128)-r(c,(o+1)%128),f=Math.hypot(u,p,1),h=(o*128+c)*4;s.data[h]=(u/f*.5+.5)*255,s.data[h+1]=(p/f*.5+.5)*255,s.data[h+2]=(1/f*.5+.5)*255,s.data[h+3]=255}n.putImageData(s,0,0);let l=new mo(t);return l.wrapS=Ka,l.wrapT=Ka,l.repeat.set(5,7),l},AI=()=>{let n=tw(19),i=Float32Array.from({length:16384},()=>n()),a=o=>Math.sqrt(Math.max(0,1-4*o*o)),r=(o,c)=>{let u=(o%128+128)%128,p=(c%128+128)%128,f=u/128*8,h=p/128*8,g=Math.floor(f),M=Math.floor(h),v=f-g-.5,d=h-M-.5,x=(g+M)%2===0,b=a(v)*(.55+.45*Math.cos(d*Math.PI*(x?1:.6))),y=a(d)*(.55+.45*Math.cos(v*Math.PI*(x?.6:1)));return(x?Math.max(b,y*.7):Math.max(y,b*.7))+i[p*128+u]*.08},s=new Uint8Array(16384*4);for(let o=0;o<128;o++)for(let c=0;c<128;c++){let u=(r(c-1,o)-r(c+1,o))*1.6,p=(r(c,o-1)-r(c,o+1))*1.6,f=Math.hypot(u,p,1),h=(o*128+c)*4;s[h]=(u/f*.5+.5)*255,s[h+1]=(p/f*.5+.5)*255,s[h+2]=(1/f*.5+.5)*255,s[h+3]=255}let l=new jl(s,128,128);return l.wrapS=Ka,l.wrapT=Ka,l.magFilter=qn,l.minFilter=Sa,l.generateMipmaps=!0,l.needsUpdate=!0,l},RI=(e,t,n,i,a)=>{let r=(a==="contain"?Math.min:Math.max)(n/t.width,i/t.height),s=t.width*r,l=t.height*r;e.drawImage(t,(n-s)/2,(i-l)/2,s,l)},QT=(e,t,n,i)=>{let a=e.getContext("2d");if(!a)throw new Error("Lanyard face canvas context unavailable");a.fillStyle=am(n),a.fillRect(0,0,e.width,e.height),t&&RI(a,t,e.width,e.height,i)},CI=(e,t,n)=>{let a=t?Math.max(64,Math.round(t.width/t.height*192)):384;e.width=192,e.height=a;let r=e.getContext("2d");if(!r)return a/192;if(r.fillStyle=am(n),r.fillRect(0,0,192,a),t)return r.save(),r.translate(192,0),r.rotate(Math.PI/2),r.drawImage(t,0,0,a,192),r.restore(),a/192;let s=SI(n)>.5?[0,0,0]:[1,1,1];r.fillStyle=am(s,.05);for(let l=0;l<a;l+=4)r.fillRect(0,l,192,1);r.fillStyle=am(s,.2);for(let l=0;l<a;l+=14)r.fillRect(192*.075,l,2,8),r.fillRect(192*.925-2,l,2,8);return a/192},DI=()=>{let e=()=>Array.from({length:Sn+1},()=>new q);return{nodes:e(),previous:e(),velocities:e(),lengths:new Float64Array(Sn),impulses:new Float64Array(Sn),rest:1,anchor:new q,body:{position:new q,previous:new q,velocity:new q,quaternion:new ci,previousQuaternion:new ci,angular:new q,mass:1,inverseInertia:new q(1,1,1),hang:new q},grab:null,turn:0,twist:0,twistRaw:0,calm:0}},We={a:new q,b:new q,c:new q,d:new q,e:new q,f:new q,g:new q,pin:new q,q:new ci,r:new ci},ey=(e,t,n)=>(We.r.copy(e.quaternion).invert(),n.copy(t).applyQuaternion(We.r),n.set(n.x*e.inverseInertia.x,n.y*e.inverseInertia.y,n.z*e.inverseInertia.z),n.applyQuaternion(e.quaternion)),ew=(e,t)=>{let{x:n,y:i,z:a,w:r}=e;e.x+=.5*(t.x*r+t.y*a-t.z*i),e.y+=.5*(t.y*r+t.z*n-t.x*a),e.z+=.5*(t.z*r+t.x*i-t.y*n),e.w+=.5*(-t.x*n-t.y*i-t.z*a),e.normalize()},nw=(e,t,n)=>{let i=We.c.crossVectors(t,n);return 1/e.mass+i.dot(ey(e,i,We.d))},iw=(e,t,n)=>{e.position.addScaledVector(n,1/e.mass),ew(e.quaternion,ey(e,We.e.crossVectors(t,n),We.f))},NI=(e,t,n,i)=>{let{nodes:a,body:r}=e,s=a[t],l=t===0?0:WT,o=t===Sn-1,c=We.g,u=a[t+1];o&&(c.copy(r.hang).applyQuaternion(r.quaternion),u=We.b.copy(r.position).add(c));let p=We.a.subVectors(u,s),f=p.length(),h=f-e.rest;if(h<=0||f<1e-9)return;let g=p.divideScalar(f),M=o?nw(r,c,g):WT,v=(f-e.lengths[t])/n,x=(i.hold*Math.tanh(i.stiffness*h/i.hold)+i.spring*h+i.bandDamping*Math.max(0,v))*n*n-e.impulses[t];if(x<=0)return;let b=Math.min(h/(l+M),x);e.impulses[t]+=b,l&&s.addScaledVector(g,b*l),o?iw(r,c,g.multiplyScalar(-b)):u.addScaledVector(g,-b*M)},LI=(e,t,n)=>{let i=We.g.copy(t.local).applyQuaternion(e.quaternion),a=We.a.copy(n).sub(e.position).sub(i),r=a.length();if(r<1e-9)return;let s=a.divideScalar(r),l=r/nw(e,i,s);iw(e,i,s.multiplyScalar(l))},hf=(e,t,n)=>{let{nodes:i,previous:a,velocities:r,body:s,anchor:l}=e;i[0].copy(l);for(let c=1;c<=Sn;c++)i[c].copy(i[c-1]),n?(i[c].x+=e.rest*.6,i[c].y+=e.rest*.8):i[c].y-=e.rest;s.quaternion.identity(),n&&s.quaternion.setFromAxisAngle(new q(0,0,1),Math.PI/2),s.hang.set(0,t.hangY,0);let o=We.a.copy(s.hang).applyQuaternion(s.quaternion);s.position.copy(i[Sn]).sub(o),s.previous.copy(s.position),s.previousQuaternion.copy(s.quaternion),s.velocity.set(0,0,0),s.angular.set(0,0,0);for(let c=0;c<=Sn;c++)a[c].copy(i[c]),r[c].set(0,0,0);e.lengths.fill(e.rest),e.turn=0,e.twist=0,e.twistRaw=0,e.calm=0},UI=(e,t,n)=>{e.rest=n/Sn;let{width:i,height:a}=t,r=e.body,s=mf+di*2;r.mass=1,r.inverseInertia.set(12/(a*a+s*s),12/(i*i+s*s),12/(i*i+a*a)),r.hang.set(0,t.hangY,0)},II=(e,t,n,i)=>{let a=Math.max(1,Math.ceil(t/dI-1e-6)),r=t/a,{nodes:s,previous:l,velocities:o,body:c}=e,u=n.breeze*(Math.sin(i*.53)*.7+Math.sin(i*1.31+1.7)*.3)*3,p=n.breeze*Math.sin(i*.37+.6)*2,f=e.grab,h=We.pin,g=Math.exp(-n.nodeDrag*r),M=Math.exp(-n.linearDrag*r),v=Math.exp(-n.angularDrag*r);for(let x=0;x<a;x++){for(let D=1;D<Sn;D++){let R=o[D];R.y-=n.gravity*r,R.x+=u*r,R.z+=p*r,l[D].copy(s[D]),s[D].addScaledVector(R,r)}c.previous.copy(c.position),c.previousQuaternion.copy(c.quaternion);let b=c.quaternion;if(f){let D=We.q.copy(f.rotation).multiply(We.r.copy(b).invert());D.w<0&&D.set(-D.x,-D.y,-D.z,-D.w);let R=We.a.set(D.x,D.y,D.z).multiplyScalar(2*n.grip);R.addScaledVector(c.angular,-n.gripDamping),c.angular.addScaledVector(ey(c,R,We.b),r)}let y=We.a.set(0,1,0).applyQuaternion(b),w=We.b.set(-y.x*y.z,-y.y*y.z,1-y.z*y.z);if(w.lengthSq()>.001){let D=We.d.set(0,0,1).applyQuaternion(b),R=Math.atan2(We.e.crossVectors(w,D).dot(y),w.dot(D)),Z=R-e.twistRaw;Z>Math.PI?Z-=Math.PI*2:Z<-Math.PI&&(Z+=Math.PI*2),e.twist+=Z,e.twistRaw=R}if(!f){let D=c.angular.dot(y);c.angular.addScaledVector(y,(n.twist*(e.turn-e.twist)-n.twistDamping*D)*r)}c.velocity.y-=n.gravity*r,c.velocity.x+=u*.35*r,c.velocity.z+=p*.35*r,c.position.addScaledVector(c.velocity,r),ew(c.quaternion,We.f.copy(c.angular).multiplyScalar(r)),e.impulses.fill(0),f&&h.lerpVectors(f.from,f.target,(x+1)/a);for(let D=0;D<pI;D++){for(let R=0;R<Sn;R++)NI(e,R,r,n);f&&LI(c,f,h)}for(let D=1;D<Sn;D++){let R=o[D].subVectors(s[D],l[D]).divideScalar(r).multiplyScalar(g);R.multiplyScalar(1/(1+n.nodeAir*R.length()*r))}c.velocity.subVectors(c.position,c.previous).divideScalar(r);let T=We.q.copy(c.previousQuaternion).invert().premultiply(c.quaternion);c.angular.set(T.x,T.y,T.z).multiplyScalar(2/r*(T.w<0?-1:1));let m=We.a.set(0,0,1).applyQuaternion(c.quaternion),S=c.velocity.dot(m),C=We.b.copy(c.velocity).addScaledVector(m,-S);C.multiplyScalar(1/(1+n.air*C.length()*r)),c.velocity.copy(C).addScaledVector(m,S/(1+n.broadside*Math.abs(S)*r)).multiplyScalar(M),c.angular.multiplyScalar(v/(1+n.spinAir*c.angular.length()*r)),c.velocity.lengthSq()>3600&&c.velocity.setLength(60),c.angular.lengthSq()>1600&&c.angular.setLength(40),s[Sn].copy(c.hang).applyQuaternion(c.quaternion).add(c.position);for(let D=0;D<Sn;D++)e.lengths[D]=s[D].distanceTo(s[D+1])}f&&f.from.copy(f.target);let d=c.velocity.lengthSq()+c.angular.lengthSq()*.3;for(let x=1;x<Sn;x++)d+=o[x].lengthSq()*.05;e.calm=d<2e-4?e.calm+t:0},OI=({frontImage:e,backImage:t,imageFit:n="cover",cardColor:i="#ffffff",orientation:a="portrait",finish:r="glossy",cornerRadius:s=.3,size:l=.6,anchor:o="center",strapLength:c=.5,strapImage:u,strapColor:p="#111111",strapWidth:f=.65,metal:h="silver",gravity:g=1,damping:M=.5,elasticity:v=.5,breeze:d=.5,interactive:x=!0,intro:b=!0,className:y="",style:w,onReady:T,onError:m})=>{let S=(0,Ls.useRef)(null),C=(0,Ls.useRef)(null),D=(0,Ls.useRef)(null),R=(0,Ls.useRef)(null);return R.current={onReady:T,onError:m},C.current={frontImage:e,backImage:t,imageFit:n==="contain"?"contain":"cover",cardColor:i,orientation:a==="landscape"?"landscape":"portrait",finish:r,cornerRadius:s,size:l,anchor:o,strapLength:c,strapImage:u,strapColor:p,strapWidth:f,metal:h,gravity:g,damping:M,elasticity:v,breeze:d,interactive:x,intro:b},(0,Ls.useEffect)(()=>{D.current?.()}),(0,Ls.useEffect)(()=>{let Z=S.current;if(!Z)return;let tt,z,J=!0,j=!1,B=!1,ot=!1,k=0,Y=N=>{!J||j||(j=!0,cancelAnimationFrame(k),R.current.onError?.(N instanceof Error?N:new Error(String(N))))};try{tt=new Qp({antialias:!0,alpha:!0,powerPreference:"high-performance"}),tt.debug.onShaderError=(pt,ee,ae,ne)=>{let Le=[pt.getProgramInfoLog(ee),pt.getShaderInfoLog(ae),pt.getShaderInfoLog(ne)].filter(Boolean).join(`
`);Y(new Error(`Lanyard shader failed${Le?`: ${Le}`:""}`))},tt.setClearColor(0,0),tt.outputColorSpace=Wn,tt.toneMapping=$u,tt.toneMappingExposure=1;let N=tt.domElement;N.className="lanyard-canvas",N.setAttribute("aria-hidden","true"),Z.appendChild(N);let yt=Math.min(8,tt.capabilities.getMaxAnisotropy()),Dt=new Zl,lt=TI(tt);Dt.environment=lt.texture;let _t=new li(qT,1,.1,200),Ct=new rc(16777215,1.6);Ct.position.set(-2.5,4,6);let Ft=new rc(16777215,.35);Ft.position.set(3,-1,4),Dt.add(Ct,Ft);let Lt=new Map,gt={front:null,back:null,strap:null},Zt=document.createElement("canvas"),I=document.createElement("canvas"),jt=document.createElement("canvas"),$t=$x(Zt,yt),ht=$x(I,yt),Tt=$x(jt,yt);Tt.wrapS=la,Tt.wrapT=Ka;let wt=wI(),At=AI(),Mt={foilStrength:{value:0},foilAspect:{value:1.4},foilKey:{value:new q},foilFill:{value:new q},foilTop:{value:new q}},Yt=pt=>{Object.assign(pt.uniforms,Mt),pt.vertexShader=pt.vertexShader.replace("#include <common>",`#include <common>
${xI}`).replace("#include <project_vertex>",`#include <project_vertex>
${yI}`),pt.fragmentShader=pt.fragmentShader.replace("#include <common>",`#include <common>
${_I}`).replace("#include <opaque_fragment>",`${bI}
#include <opaque_fragment>`)},zt=new Ts({map:$t,normalMap:wt,normalScale:new Ot(.06,.06)}),re=new Ts({map:ht,normalMap:wt,normalScale:new Ot(.06,.06)});zt.onBeforeCompile=Yt,re.onBeforeCompile=Yt;let Jt=new Ts,Vt=new ac({metalness:1}),H=new Ts({map:Tt,normalMap:At,normalScale:new Ot(.7,.7),roughness:.68,sheen:1,sheenRoughness:.42,sheenColor:new me(.32,.32,.34),side:qi}),ie=new Za,Nt=new wn(void 0,Jt),se=new wn(void 0,zt),K=new wn(void 0,re),V=new wn(new ic($T,mI,18,72),Vt);V.rotation.y=Math.PI/2-.7,ie.add(Nt,se,K,V),Dt.add(ie);let Q=EI(Or),at=new wn(Q,H);at.frustumCulled=!1,Dt.add(at);let E=new Za,_=new wn(jT(Kx),Vt);_.position.y=nm+pf/2-.004;let P=new wn(new ic(nm,.0105,14,40),Vt);E.add(_,P),Dt.add(E);let X=DI(),it=[],dt=new q,xt=new q,$=new tc(it,!1,"centripetal"),G={width:1,height:1},et=KT("portrait",.3),L={},U=Kx,O=2,st=performance.now(),ft=0,vt=!1,Ut=!1,Bt=!1,F=null,ct=0,bt=!C.current.intro,mt=!1,Gt=window.matchMedia?.("(prefers-reduced-motion: reduce)"),qt=Gt?.matches??!1,le=()=>{let pt=C.current,ee=jx(pt.cardColor,[1,1,1]),ae=YT,ne=Math.round(YT*et.height/et.width);(Zt.width!==ae||Zt.height!==ne)&&(Zt.width=ae,Zt.height=ne,I.width=ae,I.height=ne,$t.dispose(),ht.dispose()),QT(Zt,gt.front,ee,pt.imageFit),QT(I,gt.back||gt.front,ee,pt.imageFit),$t.needsUpdate=!0,ht.needsUpdate=!0,ni()},oe=()=>{let pt=C.current;O=CI(jt,gt.strap,jx(pt.strapColor,[.07,.07,.07])),At.repeat.set(2,2*O),Tt.dispose(),Tt.needsUpdate=!0,ni()},_e=()=>{let pt=C.current,ee=G.width/G.height,ae=et.height/Ns(pt.size,.15,.9),ne=et.width/.72;ae*ee<ne&&(ae=ne/ee);let Le=ae*ee;_t.aspect=ee,_t.position.set(0,0,ae/2/Math.tan(qT*Math.PI/360)),_t.lookAt(0,0,0),_t.updateProjectionMatrix(),_t.updateMatrixWorld(),Mt.foilKey.value.set(-2.5,4,6).normalize().transformDirection(_t.matrixWorldInverse),Mt.foilFill.value.set(3,-1,4).normalize().transformDirection(_t.matrixWorldInverse),Mt.foilTop.value.set(.5,4.5,8).normalize().transformDirection(_t.matrixWorldInverse);let Xt=((hI[pt.anchor]??.5)-.5)*Le,tn=ae/2+.2,en=ae/2-ae*df(.12,.42,Ns(pt.strapLength,0,1))+(et.hangY-et.height/2);X.anchor.set(Xt,tn,0),UI(X,et,tn-en),X.nodes[0].copy(X.anchor),X.previous[0].copy(X.anchor)},Ht=()=>{let pt=C.current,ee=`${pt.orientation}|${pt.cornerRadius}`;if(ee!==L.layoutKey){et=KT(pt.orientation,pt.cornerRadius);let en=MI(et);Nt.geometry.dispose(),se.geometry.dispose(),K.geometry.dispose(),Nt.geometry=en.body,se.geometry=en.face,K.geometry=en.face.clone(),se.position.z=mf/2+di+6e-4,K.rotation.y=Math.PI,K.position.z=-(mf/2+di+6e-4),V.position.set(0,et.ringY,0),L.framingKey=""}let ae=`${ee}|${pt.size}|${pt.anchor}|${pt.strapLength}|${G.width}|${G.height}`;ae!==L.framingKey&&(_e(),Ut?ee!==L.layoutKey&&hf(X,et,!1):(hf(X,et,!1),Ut=!0));let ne=`${pt.frontImage}|${pt.backImage}|${pt.strapImage}`;if(ne!==L.imageKey){let en=++ct;ot=!1,Promise.all([Qx(Lt,pt.frontImage),Qx(Lt,pt.backImage),Qx(Lt,pt.strapImage)]).then(([rn,Da,Ki])=>{if(!(!J||j||en!==ct)){if(pt.frontImage&&!rn)throw new Error("Lanyard front image failed to load");if(pt.backImage&&!Da)throw new Error("Lanyard back image failed to load");gt.front=rn,gt.back=Da,gt.strap=Ki,le(),oe(),tt.initTexture($t),tt.initTexture(ht),ot=!0,pn(),ni()}}).catch(rn=>{en===ct&&Y(rn)})}let Le=`${ee}|${pt.cardColor}|${pt.imageFit}`;Le!==L.faceKey&&le(),pt.strapColor!==L.strapColor&&oe();let Xt=ZT[pt.finish]||ZT.glossy,tn=jx(pt.cardColor,[1,1,1]);[zt,re].forEach(en=>{en.roughness=Xt.roughness,en.metalness=Xt.metalness,en.clearcoat=Xt.clearcoat,en.clearcoatRoughness=Xt.clearcoatRoughness,en.anisotropy=Xt.anisotropy}),Mt.foilStrength.value=Xt.foil,Mt.foilAspect.value=et.height/et.width,Jt.color.setRGB(tn[0]*.92,tn[1]*.92,tn[2]*.92,Wn),Jt.roughness=Math.min(Xt.roughness,.35),Jt.metalness=Xt.metalness,Jt.clearcoat=1,Jt.clearcoatRoughness=.08;let Ee=JT[pt.metal]||JT.silver;Vt.color.set(Ee.color),Vt.roughness=Ee.roughness,U=Kx*Ns(pt.strapWidth,.4,2),U!==L.strapScale&&(_.geometry.dispose(),_.geometry=jT(U)),N.style.touchAction=pt.interactive?"pan-y":"auto",L={layoutKey:ee,framingKey:ae,imageKey:ne,faceKey:Le,strapColor:pt.strapColor,strapScale:U},ni()},xe=Array.from({length:Or},()=>new q),Pe=Array.from({length:Or},()=>new q),Et=gI.map(pt=>[Math.cos(pt),Math.sin(pt)]),Rt={tangent:new q,toCamera:new q,basis:new Ye,up:new q,across:new q,facing:new q,end:new q},we=()=>{let pt=X.nodes[Sn],ee=nm+pf+.05,ae=Sn-1;for(;ae>0&&X.nodes[ae].distanceTo(pt)<ee*1.1;)ae--;let ne=Rt.up.subVectors(X.nodes[ae],pt);ne.lengthSq()<1e-8&&ne.set(0,1,0).applyQuaternion(X.body.quaternion),ne.normalize(),dt.copy(pt).addScaledVector(ne,ee),xt.copy(pt).addScaledVector(ne,nm+pf*.35),it.length=0;for(let ge=0;ge<=ae;ge++)it.push(X.nodes[ge]);it.push(dt,xt),$.updateArcLengths();for(let ge=0;ge<Or;ge++)$.getPointAt(ge/(Or-1),xe[ge]);let Le=$.getLength(),Xt=1-dt.distanceTo(xt)/Math.max(Le,.001),tn=Q.getAttribute("position"),Ee=Q.getAttribute("normal"),en=Q.getAttribute("uv"),rn=im.length,Da=X.rest*Sn,Ki=Da/(U*O),or=U/Math.pow(Math.max(1,Le/Math.max(Da,.001)),.35),{tangent:ye,toCamera:gn,across:sn,facing:Ie}=Rt;for(let ge=0;ge<Or;ge++){ye.subVectors(xe[Math.min(Or-1,ge+1)],xe[Math.max(0,ge-1)]),ye.lengthSq()<1e-12&&ye.set(0,-1,0),ye.normalize(),gn.subVectors(_t.position,xe[ge]).normalize();let zn=Pe[ge].crossVectors(gn,ye);zn.lengthSq()<1e-10&&zn.copy(ge>0?Pe[ge-1]:We.a.set(1,0,0)),zn.normalize(),ge>0&&zn.dot(Pe[ge-1])<0&&zn.negate();let yc=-X.twist*Math.pow(Math.min(1,ge/(Or-1)/Xt),1.3);Ie.crossVectors(ye,zn),sn.copy(zn).multiplyScalar(Math.cos(yc)).addScaledVector(Ie,Math.sin(yc)),Ie.crossVectors(ye,sn);let hm=xe[ge],Pw=(1-ge/(Or-1))*Ki;for(let Co=0;Co<rn;Co++){let dm=ge*rn+Co,pm=(im[Co]-.5)*or,[mm,gm]=Et[Co];tn.setXYZ(dm,hm.x+sn.x*pm,hm.y+sn.y*pm,hm.z+sn.z*pm),Ee.setXYZ(dm,Ie.x*mm+sn.x*gm,Ie.y*mm+sn.y*gm,Ie.z*mm+sn.z*gm),en.setXY(dm,im[Co],Pw)}}Rt.end.copy(sn),tn.needsUpdate=!0,Ee.needsUpdate=!0,en.needsUpdate=!0,sn.copy(Rt.end).addScaledVector(ne,-Rt.end.dot(ne)).normalize(),Ie.crossVectors(sn,ne).normalize(),Rt.basis.makeBasis(sn,ne,Ie),E.quaternion.setFromRotationMatrix(Rt.basis),E.position.copy(pt)},pn=()=>{if(!(!J||j)){try{if(ie.position.copy(X.body.position),ie.quaternion.copy(X.body.quaternion),we(),tt.render(Dt,_t),tt.getContext().isContextLost())throw new Error("Lanyard WebGL context lost")}catch(pt){Y(pt);return}J&&!j&&ot&&!B&&(B=!0,R.current.onReady?.())}},Ai=()=>{let pt=C.current,ee=40*Ns(pt.gravity,0,3),ae=Math.max(ee,20),ne=Ns(pt.elasticity,0,1),Le=Ns(pt.damping,0,1);return{gravity:ee,hold:ae*df(2.2,5.5,ne),stiffness:ae*10*Sn,spring:ae*df(.1,.4,ne)*Sn,bandDamping:ae*df(.3,.08,ne)*Sn,linearDrag:.25*Math.pow(16,Le),angularDrag:.5*Math.pow(12,Le),air:.15,broadside:.5,spinAir:.03,nodeDrag:2,nodeAir:.2,twist:30,twistDamping:3,grip:40,gripDamping:6,breeze:qt?0:Ns(pt.breeze,0,1)}},fa=()=>vt&&!document.hidden&&Z.getClientRects().length>0,Ca=()=>{!mt||!ot||!fa()||(mt=!1,bt=!0,X.grab=null,F=null,hf(X,et,C.current.intro&&!qt),ft=0)},Ri=pt=>{if(k=0,!J||j||!fa()||(Ca(),!bt||!ot))return;let ee=Math.min(1/30,Math.max(1/240,(pt-st)/1e3));st=pt,ft+=ee;let ae=Ai();(!qt||X.grab)&&II(X,ee,ae,ft);let ne=X.body;Number.isFinite(ne.position.x+ne.position.y+ne.position.z+ne.quaternion.w)||(X.grab=null,hf(X,et,!1)),pn();let Le=qt&&!X.grab||X.calm>1.2&&!X.grab&&ae.breeze===0;!j&&fa()&&!Le&&(k=requestAnimationFrame(Ri))},zs=()=>{cancelAnimationFrame(k),k=0},ni=()=>{k||!fa()||!J||j||(X.calm=0,st=performance.now(),k=requestAnimationFrame(Ri))},Ao=new ju,vf=new Ot,vc=pt=>{let ee=N.getBoundingClientRect();vf.set((pt.clientX-ee.left)/ee.width*2-1,-((pt.clientY-ee.top)/ee.height)*2+1),Ao.setFromCamera(vf,_t)},xc=()=>(ie.updateMatrixWorld(),Ao.intersectObjects([Nt,se,K],!1)[0]||null),Ro=pt=>{N.style.cursor!==pt&&(N.style.cursor=pt)},A=pt=>{let ee=X.body,ae=We.a.set(0,1,0).applyQuaternion(ee.quaternion),ne=X.turn>0?-1:1;if(X.turn===0){let Le=We.c.subVectors(pt,_t.position).normalize();ne=We.b.subVectors(pt,ee.position).cross(Le).dot(ae)<0?-1:1}X.turn=X.turn===0?Math.PI*ne:0,qt?(ee.quaternion.setFromAxisAngle(new q(0,1,0),X.turn),ee.angular.set(0,0,0),X.twist=X.turn,X.twistRaw=X.turn):ee.angular.addScaledVector(ae,vI*ne)},W=pt=>{if(!C.current.interactive||pt.button>0)return;vc(pt);let ee=xc();ee&&(X.grab={local:ee.point.clone().sub(X.body.position).applyQuaternion(X.body.quaternion.clone().invert()),rotation:X.body.quaternion.clone(),reach:ee.distance,from:ee.point.clone(),target:ee.point.clone()},F={x:pt.clientX,y:pt.clientY,time:performance.now(),point:ee.point.clone()},N.setPointerCapture?.(pt.pointerId),Ro("grabbing"),pt.preventDefault(),ni())},ut=pt=>{if(C.current.interactive){if(vc(pt),X.grab){F&&Math.hypot(pt.clientX-F.x,pt.clientY-F.y)>6&&(F=null),Ao.ray.at(X.grab.reach,X.grab.target),ni();return}pt.pointerType!=="touch"&&(Bt=!!xc(),Ro(Bt?"grab":""))}},nt=pt=>{X.grab&&(X.grab=null,F&&pt.type==="pointerup"&&performance.now()-F.time<450&&A(F.point),F=null,N.releasePointerCapture?.(pt.pointerId),Ro(Bt&&pt.pointerType!=="touch"?"grab":""),ni())},rt=pt=>{!C.current.interactive||pt.touches.length!==1||(vc(pt.touches[0]),xc()&&pt.preventDefault())};N.addEventListener("pointerdown",W),N.addEventListener("pointermove",ut),N.addEventListener("pointerup",nt),N.addEventListener("pointercancel",nt),N.addEventListener("lostpointercapture",nt),N.addEventListener("touchstart",rt,{passive:!1});let Pt=()=>{if(!(!J||j))try{G.width=Math.max(1,Z.clientWidth),G.height=Math.max(1,Z.clientHeight),tt.setPixelRatio(Math.min(window.devicePixelRatio||1,2)),tt.setSize(G.width,G.height,!1),Ht(),pn()}catch(pt){Y(pt)}},Kt=new ResizeObserver(Pt);Kt.observe(Z);let It=new IntersectionObserver(([pt])=>{vt=pt.isIntersecting,vt?ni():zs()});It.observe(Z);let kt=()=>{document.hidden?zs():ni()};document.addEventListener("visibilitychange",kt);let te=()=>Y(new Error("Lanyard WebGL context lost"));N.addEventListener("webglcontextlost",te);let he=()=>{!J||j||!B||!C.current.interactive||X.grab||(A(X.body.position),ni())},Se=()=>{!J||j||(mt=!0,ni())},Qt=pt=>{qt=pt.matches,qt&&(X.grab=null,hf(X,et,!1)),ni()};Z.addEventListener("lzy-flip",he),Z.addEventListener("lzy-enter",Se),Gt?.addEventListener("change",Qt),z=()=>{J=!1,Z.removeEventListener("lzy-flip",he),Z.removeEventListener("lzy-enter",Se),Gt?.removeEventListener("change",Qt),cancelAnimationFrame(k),D.current=null,Kt.disconnect(),It.disconnect(),document.removeEventListener("visibilitychange",kt),N.removeEventListener("pointerdown",W),N.removeEventListener("pointermove",ut),N.removeEventListener("pointerup",nt),N.removeEventListener("pointercancel",nt),N.removeEventListener("lostpointercapture",nt),N.removeEventListener("touchstart",rt),[Nt,se,K,V,_,P,at].forEach(pt=>pt.geometry?.dispose()),[zt,re,Jt,Vt,H].forEach(pt=>pt.dispose()),[$t,ht,Tt,wt,At].forEach(pt=>pt.dispose()),lt.dispose(),tt.dispose(),N.removeEventListener("webglcontextlost",te),N.parentNode&&N.parentNode.removeChild(N)},D.current=()=>{if(!(!J||j))try{Ht()}catch(pt){Y(pt)}},Pt()}catch(N){Y(N),z?z():(J=!1,cancelAnimationFrame(k),tt?.dispose(),tt?.domElement?.remove());return}return z},[]),(0,rw.jsx)("div",{ref:S,className:`lanyard ${y}`.trim(),style:w})},aw=OI;var Us=Ce(vi(),1);var ry=Ce(an(),1),sw=2400,ny=5,rm=2.6,gf=7.5,uw=.56,ay=24,PI={focus:0,part:1,none:2},zI={dots:0,dashes:.45,lines:1},FI={depth:0,along:1,across:2},BI=[0,.75,.35],ow=[[0,0,0,0],[1.9,-4.6,-.08,2.4],[-1.05,2,.12,4.1]],HI=[1,.5,.55],GI=Math.PI/180,VI=1/(2*Math.tan(uw/2)),Is=`#version 300 es
precision highp float;
`,kI=`
uniform float uTime;
uniform float uTwist;
uniform float uRoll;
uniform float uWaves;
uniform float uWidth;
uniform float uRibbon;
uniform mat3 uOrient;
uniform float uScale;
uniform vec4 uPlace;
uniform float uVolume;

float hash11(float n) {
  return fract(sin(n * 91.3458) * 47453.5453);
}

vec3 centerLocal(float s) {
  float t = uTime;
  float ph = uPlace.w;
  float x = s * ${ay.toFixed(1)};
  float y = uWaves * (0.52 * sin(x * 0.43 + t * 0.31 + ph) + 0.26 * sin(x * 0.79 - t * 0.23 + 1.3 + ph * 0.7)) + uPlace.x + x * uPlace.z;
  float z = uWaves * 0.65 * sin(x * 0.33 + t * 0.19 + 0.7 + ph * 1.3) + uPlace.y;
  return vec3(x, y, z);
}

float twistAt(float s, float layer) {
  float x = s * ${ay.toFixed(1)};
  return uTwist * 0.483 * x + uRoll + uPlace.w * 0.6 + layer * uVolume * 0.42 + 0.5 * sin(x * 0.26 + uTime * 0.27 + uPlace.w);
}

vec3 ribbonPoint(float s, float v, float n, float layer, out vec3 normal) {
  vec3 c0 = centerLocal(s);
  vec3 c1 = centerLocal(s + 0.004);
  vec3 tangent = normalize(c1 - c0);
  vec3 up = vec3(0.0, 1.0, 0.0);
  vec3 n0 = normalize(up - tangent * dot(up, tangent));
  vec3 b0 = cross(tangent, n0);
  float th = twistAt(s, layer);
  vec3 across = cos(th) * n0 + sin(th) * b0;
  vec3 sheet = -sin(th) * n0 + cos(th) * b0;
  float halfWidth = uWidth * (0.78 + 0.22 * cos(s * 3.14159));
  vec3 local = c0 + across * v * halfWidth + sheet * (n + layer * uVolume * 0.16) * halfWidth;
  normal = uOrient * sheet;
  return uOrient * (local * uScale);
}
`,XI=`${Is}
${kI}
uniform mat4 uViewProj;
uniform vec3 uEye;
uniform vec2 uViewport;
uniform float uDpr;
uniform float uFibers;
uniform float uDots;
uniform float uFlow;
uniform float uSize;
uniform float uFocus;
uniform float uDof;
uniform float uMaxCoc;
uniform float uFocal;
uniform float uIntro;
uniform vec4 uPulse;
uniform vec4 uHover;
uniform float uPart;
uniform float uDotLength;
uniform float uSparkle;
uniform float uDepthSpread;
uniform float uGain;
uniform float uTips;
uniform float uTint;
uniform float uGradient;
uniform float uFold;

out vec2 vLocal;
out float vRadius;
out float vSegment;
out vec3 vLight;
out float vTint;

vec3 project(vec3 world, out float depth) {
  vec4 clip = uViewProj * vec4(world, 1.0);
  depth = clip.w;
  vec2 ndc = clip.xy / clip.w;
  return vec3((ndc * 0.5 + 0.5) * uViewport, clip.w);
}

vec2 part(vec2 px) {
  if (uPart <= 0.0 || uHover.w <= 0.0) return px;
  vec2 away = px - uHover.xy;
  float dist = length(away);
  float radius = uHover.z;
  float push = uPart * uHover.w * radius * 0.55 * exp(-dist * dist / (radius * radius));
  return px + away / max(dist, 1e-3) * push * smoothstep(0.0, radius * 0.25, dist);
}

void main() {
  int perFiber = int(uDots);
  int fiber = gl_InstanceID / perFiber;
  int bead = gl_InstanceID - fiber * perFiber;
  float fi = float(fiber);
  float fk = float(bead);

  float seed = hash11(fi * 1.731 + uRibbon * 17.0);
  float s = fract((fk + uFlow + seed * uDots) / uDots) - 0.5;
  float sNext = s + 1.0 / uDots;
  float layer = mod(fi, 3.0) - 1.0;
  float slot = floor(fi / 3.0);
  float perLayer = max(floor(uFibers / 3.0), 1.0);
  float v = ((slot + 0.5) / perLayer) * 2.0 - 1.0 + (hash11(fi * 3.113 + 4.0) - 0.5) * (1.6 / perLayer) + layer * 0.12 / perLayer;
  float depthOffset = (hash11(fi * 7.919 + 2.0) - 0.5) * uDepthSpread * (0.35 + 6.0 * s * s);

  vec3 normal;
  vec3 world = ribbonPoint(s, v, depthOffset, layer, normal);
  vec3 nextNormal;
  vec3 nextWorld = ribbonPoint(sNext, v, depthOffset, layer, nextNormal);

  float depth;
  vec3 p0 = project(world, depth);
  float nextDepth;
  vec3 p1 = project(nextWorld, nextDepth);
  vec2 px = part(p0.xy);
  vec2 pxNext = part(p1.xy);

  float baseRadius = max(0.5 * uSize * uDpr * uFocal / max(depth, 0.1), 0.45);
  float coc = min(uDof * abs(1.0 - uFocus / max(depth, 0.1)) * uViewport.y * 0.035, uMaxCoc * uDpr);
  float radius = baseRadius + coc;
  float spill = max(10.0 * uDpr, baseRadius);
  float energy = pow(baseRadius / min(radius, spill), 1.25) * pow(min(1.0, spill / radius), 2.0);

  vec3 toEye = normalize(uEye - world);
  float facing = abs(dot(normalize(normal), toEye));
  float focalPx = uViewport.y * ${VI.toFixed(5)} / max(depth, 0.1);
  float widthPx = 2.0 * uWidth * uScale * focalPx;
  float stack = (widthPx * facing + 2.0 * baseRadius) / (widthPx + 2.0 * baseRadius);
  float spacingFace = length(nextWorld - world) * focalPx;
  float trail = (length(p1.xy - p0.xy) + 2.0 * baseRadius) / (spacingFace + 2.0 * baseRadius);
  float crowd = sqrt(clamp(stack * trail, 0.002, 1.0));
  float fold = pow(1.0 - facing, 6.0) * uFold;
  float endFade = smoothstep(0.5, 0.4, abs(s)) * smoothstep(1.6, 4.2, depth);
  float tipEnd = mix(0.6, 0.06 + 0.26 * hash11(fi * 9.137 + uPlace.w * 3.0), uTips);
  float tip = exp(-pow((s - tipEnd) / 0.0065, 2.0)) * uTips;
  endFade *= smoothstep(tipEnd + 0.003, tipEnd - 0.001, s);
  float appear = smoothstep(0.0, 0.12, uIntro * 1.3 - (s + 0.5) - seed * 0.12);
  float twinklePhase = hash11(fi * 13.7 + fk * 0.917 + uRibbon * 3.0);
  float twinkle = pow(max(sin(uTime * (1.2 + 2.6 * twinklePhase) * 3.0 + twinklePhase * 61.0), 0.0), 36.0) * uSparkle * (1.0 - 0.85 * uDotLength);
  float pulseGap = abs(s - uPulse.x) - uPulse.y * 0.42;
  float pulse = uPulse.z * exp(-pulseGap * pulseGap / 0.0018) * (abs(uPulse.w - uRibbon) < 0.5 ? 1.0 : 0.35);
  float strength = mix(0.45, 1.0, hash11(fi * 5.37 + 1.0)) * mix(1.0, 0.72, abs(layer) * uVolume);
  float intensity = energy * crowd * strength * endFade * appear * 0.8 * uGain * (1.0 + fold * 7.0 + twinkle * 5.0 + pulse * 4.0 + tip * 7.0);
  float highlight = clamp(fold * 0.55 + twinkle + pulse + tip, 0.0, 1.0);

  vec2 segment = (pxNext - px) * uDotLength;
  float segmentLength = length(segment);
  intensity *= mix(1.0, (2.0 * radius) / (segmentLength + 2.0 * radius) * 1.6, uDotLength);
  vec2 axis = segmentLength > 1e-3 ? segment / segmentLength : vec2(1.0, 0.0);
  vec2 perp = vec2(-axis.y, axis.x);
  vec2 corner = vec2(gl_VertexID == 1 || gl_VertexID == 3 ? 1.0 : 0.0, gl_VertexID >= 2 ? 1.0 : 0.0);
  float along = mix(-radius, segmentLength + radius, corner.x);
  float across = mix(-radius, radius, corner.y);
  vec2 position = px + axis * along + perp * across;

  vLocal = vec2(along, across);
  vRadius = radius;
  vSegment = segmentLength;
  vLight = vec3(intensity, highlight, coc / max(radius, 1e-3));
  float depthTint = clamp(uTint + smoothstep(uFocus, uFocus + 5.0, depth) * 0.5, 0.0, 1.0);
  vTint = uGradient < 0.5 ? depthTint : uGradient < 1.5 ? smoothstep(-0.42, 0.42, s) : clamp(v * 0.5 + 0.5, 0.0, 1.0);
  if (intensity < 0.0005) position = vec2(-1e4);
  gl_Position = vec4(position / uViewport * 2.0 - 1.0, 0.0, 1.0);
}`,WI=`${Is}
uniform mat4 uViewProj;
uniform vec2 uViewport;
uniform float uDpr;
uniform float uTime;
uniform float uSize;
uniform float uFocus;
uniform float uDof;
uniform float uMaxCoc;
uniform float uFocal;
uniform float uIntro;
uniform float uSparkle;
uniform float uScale;
uniform float uGradient;
uniform float uGain;

out vec2 vLocal;
out float vRadius;
out float vSegment;
out vec3 vLight;
out float vTint;

float hash11(float n) {
  return fract(sin(n * 91.3458) * 47453.5453);
}

void main() {
  float id = float(gl_InstanceID);
  vec3 seed = vec3(hash11(id * 1.37 + 0.3), hash11(id * 2.91 + 1.7), hash11(id * 4.17 + 2.9));
  vec3 box = vec3(9.0, 5.4, 6.0);
  vec3 p = (seed - 0.5) * box;
  p.z -= 0.6;
  p += 0.18 * vec3(sin(uTime * 0.21 + seed.x * 40.0), sin(uTime * 0.17 + seed.y * 40.0), sin(uTime * 0.13 + seed.z * 40.0));
  p *= mix(1.0, uScale, 0.5);
  vec4 clip = uViewProj * vec4(p, 1.0);
  float depth = clip.w;
  vec2 px = (clip.xy / clip.w * 0.5 + 0.5) * uViewport;
  float size = uSize * mix(0.5, 1.4, hash11(id * 7.7));
  float baseRadius = max(0.5 * size * uDpr * uFocal / max(depth, 0.1), 0.45);
  float coc = min(uDof * abs(1.0 - uFocus / max(depth, 0.1)) * uViewport.y * 0.035, uMaxCoc * uDpr * 1.6);
  float radius = baseRadius + coc;
  float spill = max(10.0 * uDpr, baseRadius);
  float energy = pow(baseRadius / min(radius, spill), 0.9) * pow(min(1.0, spill / radius), 2.0);
  float twinkle = pow(max(sin(uTime * (0.8 + 1.6 * seed.y) * 2.0 + seed.z * 50.0), 0.0), 8.0);
  float intensity = energy * (0.35 + 0.65 * twinkle) * mix(0.4, 1.0, seed.x) * smoothstep(0.3, 1.0, uIntro) * (depth > 0.2 ? 1.0 : 0.0);
  vec2 corner = vec2(gl_VertexID == 1 || gl_VertexID == 3 ? 1.0 : 0.0, gl_VertexID >= 2 ? 1.0 : 0.0) * 2.0 - 1.0;
  vec2 position = px + corner * radius;
  vLocal = corner * radius;
  vRadius = radius;
  vSegment = 0.0;
  vLight = vec3(intensity * 0.8 * uGain, 0.3 + 0.6 * twinkle * uSparkle, coc / max(radius, 1e-3));
  vTint = uGradient < 0.5 ? 0.45 + 0.55 * seed.y : seed.y;
  gl_Position = vec4(position / uViewport * 2.0 - 1.0, 0.0, 1.0);
}`,lw=`${Is}
uniform vec3 uGlowColor;
uniform vec3 uLineColor;
uniform vec3 uSecondaryColor;
in vec2 vLocal;
in float vRadius;
in float vSegment;
in vec3 vLight;
in float vTint;
out vec4 outColor;
void main() {
  float along = clamp(vLocal.x, 0.0, vSegment);
  float d = length(vec2(vLocal.x - along, vLocal.y));
  float rho = d / max(vRadius, 1e-3);
  if (rho > 1.0) discard;
  float soft = clamp(2.6 / max(vRadius, 1e-3), 0.14, 1.0);
  float disk = 1.0 - smoothstep(1.0 - soft, 1.0, rho);
  float bokeh = disk * (0.94 + 0.08 * smoothstep(0.55, 0.95, rho));
  float core = exp(-rho * rho * 3.2);
  float shape = mix(core, bokeh, smoothstep(0.25, 0.7, vLight.z));
  vec3 color = mix(mix(uGlowColor, uSecondaryColor, vTint), uLineColor, vLight.y);
  outColor = vec4(color * shape * vLight.x, shape * vLight.x);
}`,sm=`${Is}
out vec2 vUv;
void main() {
  vec2 p = vec2(gl_VertexID == 1 ? 3.0 : -1.0, gl_VertexID == 2 ? 3.0 : -1.0);
  vUv = p * 0.5 + 0.5;
  gl_Position = vec4(p, 0.0, 1.0);
}`,qI=`${Is}
uniform sampler2D uSource;
uniform vec2 uTexel;
in vec2 vUv;
out vec4 outColor;
vec3 pick(vec2 uv) {
  vec3 c = texture(uSource, uv).rgb;
  float peak = max(max(c.r, c.g), c.b);
  return c * smoothstep(0.35, 1.2, peak);
}
void main() {
  vec2 o = uTexel;
  vec3 c = pick(vUv + vec2(-o.x, -o.y)) + pick(vUv + vec2(o.x, -o.y)) + pick(vUv + vec2(-o.x, o.y)) + pick(vUv + vec2(o.x, o.y));
  outColor = vec4(c * 0.25, 1.0);
}`,YI=`${Is}
uniform sampler2D uSource;
uniform vec2 uTexel;
in vec2 vUv;
out vec4 outColor;
void main() {
  vec2 o = uTexel;
  vec3 c = texture(uSource, vUv).rgb * 4.0;
  c += texture(uSource, vUv + vec2(-o.x, -o.y)).rgb;
  c += texture(uSource, vUv + vec2(o.x, -o.y)).rgb;
  c += texture(uSource, vUv + vec2(-o.x, o.y)).rgb;
  c += texture(uSource, vUv + vec2(o.x, o.y)).rgb;
  outColor = vec4(c / 8.0, 1.0);
}`,ZI=`${Is}
uniform sampler2D uSource;
uniform vec2 uTexel;
in vec2 vUv;
out vec4 outColor;
void main() {
  vec2 o = uTexel;
  vec3 c = texture(uSource, vUv + vec2(-o.x * 2.0, 0.0)).rgb;
  c += texture(uSource, vUv + vec2(-o.x, o.y)).rgb * 2.0;
  c += texture(uSource, vUv + vec2(0.0, o.y * 2.0)).rgb;
  c += texture(uSource, vUv + vec2(o.x, o.y)).rgb * 2.0;
  c += texture(uSource, vUv + vec2(o.x * 2.0, 0.0)).rgb;
  c += texture(uSource, vUv + vec2(o.x, -o.y)).rgb * 2.0;
  c += texture(uSource, vUv + vec2(0.0, -o.y * 2.0)).rgb;
  c += texture(uSource, vUv + vec2(-o.x, -o.y)).rgb * 2.0;
  outColor = vec4(c / 12.0, 1.0);
}`,JI=`${Is}
uniform sampler2D uScene;
uniform sampler2D uBloom;
uniform float uGlow;
uniform float uBrightness;
uniform float uLightMode;
uniform float uGrain;
uniform float uVignette;
uniform float uFrame;
uniform vec2 uView;
uniform float uDpr;
in vec2 vUv;
out vec4 outColor;

float hash(vec2 p) {
  vec3 q = fract(vec3(p.xyx) * 0.1031);
  q += dot(q, q.yzx + 33.33);
  return fract((q.x + q.y) * q.z);
}

float smoother(float x) {
  x = clamp(x, 0.0, 1.0);
  return x * x * x * (x * (x * 6.0 - 15.0) + 10.0);
}

void main() {
  vec4 scene = texture(uScene, vUv);
  vec3 bloom = texture(uBloom, vUv).rgb;
  vec3 light = (scene.rgb + bloom * uGlow) * uBrightness;
  float reach = max(uVignette * 0.3, 1e-4);
  float mask = uVignette > 0.0 ? smoother(vUv.x / reach) * smoother((1.0 - vUv.x) / reach) * smoother(vUv.y / reach) * smoother((1.0 - vUv.y) / reach) : 1.0;
  vec2 cell = floor(vUv * uView / max(uDpr, 1.0));
  float grain = hash(cell + uFrame * 17.31) + hash(cell * 1.31 + uFrame * 3.7 + 9.1) - 1.0;
  if (uLightMode > 0.5) {
    float amount = scene.a * uBrightness;
    float ink = (1.0 - exp(-amount * 1.5)) * mask;
    ink = clamp(ink * (1.0 + grain * uGrain * 2.0), 0.0, 1.0);
    vec3 hue = clamp(scene.rgb / max(scene.a, 1e-4), 0.0, 1.0);
    vec3 tone = hue * mix(1.0, 0.72, clamp(amount * 0.35, 0.0, 1.0));
    outColor = vec4(tone * ink, ink);
    return;
  }
  vec3 color = (1.0 - exp(-light * 1.25)) * mask;
  float peak = max(color.r, max(color.g, color.b));
  color = max(color + grain * uGrain * (0.25 + 0.75 * sqrt(peak)), 0.0);
  outColor = vec4(color, max(color.r, max(color.g, color.b)));
}`,KI=["uTime","uTwist","uRoll","uWaves","uWidth","uRibbon","uOrient","uScale","uPlace","uVolume"],jI=[...KI,"uViewProj","uEye","uViewport","uDpr","uFibers","uDots","uFlow","uSize","uFocus","uDof","uMaxCoc","uFocal","uIntro","uPulse","uHover","uPart","uDotLength","uSparkle","uDepthSpread","uGain","uTips","uTint","uGradient","uFold","uGlowColor","uLineColor","uSecondaryColor"],QI=["uViewProj","uViewport","uDpr","uTime","uSize","uFocus","uDof","uMaxCoc","uFocal","uIntro","uSparkle","uScale","uGradient","uGain","uGlowColor","uLineColor","uSecondaryColor"],iy=["uSource","uTexel"],$I=["uScene","uBloom","uGlow","uBrightness","uLightMode","uGrain","uVignette","uFrame","uView","uDpr"],On=(e,t,n)=>Math.min(n,Math.max(t,e)),cw=(e,t,n)=>{let i=e.createShader(t);return i?(e.shaderSource(i,n),e.compileShader(i),e.getShaderParameter(i,e.COMPILE_STATUS)?i:(e.deleteShader(i),null)):null},mc=(e,t,n,i)=>{let a=cw(e,e.VERTEX_SHADER,t),r=cw(e,e.FRAGMENT_SHADER,n),s=e.createProgram();if(!a||!r||!s)return null;if(e.attachShader(s,a),e.attachShader(s,r),e.linkProgram(s),e.deleteShader(a),e.deleteShader(r),!e.getProgramParameter(s,e.LINK_STATUS))return e.deleteProgram(s),null;let l={};for(let o of i)l[o]=e.getUniformLocation(s,o);return{program:s,uniforms:l}},tO=(e,t,n,i)=>{let a=1/Math.tan(e/2),r=1/(n-i);return[a/t,0,0,0,0,a,0,0,0,0,(i+n)*r,-1,0,0,2*i*n*r,0]},eO=(e,t)=>{let n=new Array(16);for(let i=0;i<4;i+=1)for(let a=0;a<4;a+=1)n[i*4+a]=e[a]*t[i*4]+e[4+a]*t[i*4+1]+e[8+a]*t[i*4+2]+e[12+a]*t[i*4+3];return n},nO=(e,t,n)=>{let i=Math.cos(e),a=Math.sin(e),r=Math.cos(t),s=Math.sin(t),l=Math.cos(n),o=Math.sin(n),c=[i,0,-a,0,1,0,a,0,i],u=[1,0,0,0,r,s,0,-s,r],p=[l,o,0,-o,l,0,0,0,1],f=(h,g)=>{let M=new Array(9);for(let v=0;v<3;v+=1)for(let d=0;d<3;d+=1)M[v*3+d]=h[d]*g[v*3]+h[3+d]*g[v*3+1]+h[6+d]*g[v*3+2];return M};return f(p,f(u,c))},iO=(e,t)=>[e[0]*t[0]+e[3]*t[1]+e[6]*t[2],e[1]*t[0]+e[4]*t[1]+e[7]*t[2],e[2]*t[0]+e[5]*t[1]+e[8]*t[2]],aO=({glowColor:e="#8b5cf6",lineColor:t,secondaryColor:n,gradient:i="depth",speed:a=.5,scale:r=1,rotation:s=18,rollSpeed:l=.15,layers:o=3,waves:c=1,twist:u=1.2,threads:p=72,volume:f=.7,spread:h=1,density:g=1,thickness:M=1,flow:v=.4,fiberStyle:d="dots",tips:x=0,foldGlow:b=1,perspective:y=.65,depthOfField:w=.85,focusDepth:T=0,particles:m=.5,sparkle:S=.5,glow:C=.8,brightness:D=1,vignette:R=.3,grain:Z=.06,mouseInteraction:tt=!0,hoverEffect:z="focus",mouseStrength:J=1,pulseOnClick:j=!0,intro:B=!0,lightMode:ot=!1,paused:k=!1,dpr:Y,...N})=>{let yt=(0,Us.useRef)(null),Dt=(0,Us.useRef)(null),lt=(0,Us.useRef)(null),_t={glowColor:String(e),lineColor:t?String(t):"",secondaryColor:n?String(n):"",gradient:FI[i]??0,speed:Math.max(0,a),scale:On(r,.3,3),rotation:s*GI,rollSpeed:l,layers:On(Math.round(o),1,3),waves:Math.max(0,c),twist:Math.max(0,u),threads:On(Math.round(p),6,180),volume:On(f,0,2),spread:On(h,.2,3),density:On(g,.2,3),thickness:On(M,.2,4),flow:v,dotLength:zI[d]??0,tips:On(x,0,1),foldGlow:On(b,0,3),perspective:On(y,0,1),depthOfField:On(w,0,2),focusDepth:On(T,-1,1),particles:On(m,0,2),sparkle:On(S,0,2),glow:Math.max(0,C),brightness:Math.max(0,D),vignette:On(R,0,1),grain:Math.max(0,Z),mouseInteraction:tt,hover:PI[z]??0,mouseStrength:Math.max(0,J),pulseOnClick:j,intro:B,lightMode:ot,paused:k,dpr:Y},Ct=(0,Us.useRef)(_t);Ct.current=_t,(0,Us.useEffect)(()=>{let gt=yt.current,Zt=Dt.current,I=Zt?.getContext("webgl2",{alpha:!0,premultipliedAlpha:!0,antialias:!1,depth:!1,stencil:!1});if(!gt||!Zt||!I)return;let jt=!!I.getExtension("EXT_color_buffer_float"),$t=mc(I,XI,lw,jI),ht=mc(I,WI,lw,QI),Tt=mc(I,sm,qI,iy),wt=mc(I,sm,YI,iy),At=mc(I,sm,ZI,iy),Mt=mc(I,sm,JI,$I);if(!$t||!ht||!Tt||!wt||!At||!Mt)return;let Yt=jt?I.RGBA16F:I.RGBA8,zt=()=>({texture:null,framebuffer:I.createFramebuffer(),width:0,height:0}),re=(F,ct,bt)=>{if(F.texture&&F.width===ct&&F.height===bt)return;F.texture&&I.deleteTexture(F.texture);let mt=I.createTexture();I.bindTexture(I.TEXTURE_2D,mt),I.texStorage2D(I.TEXTURE_2D,1,Yt,ct,bt),I.texParameteri(I.TEXTURE_2D,I.TEXTURE_MIN_FILTER,I.LINEAR),I.texParameteri(I.TEXTURE_2D,I.TEXTURE_MAG_FILTER,I.LINEAR),I.texParameteri(I.TEXTURE_2D,I.TEXTURE_WRAP_S,I.CLAMP_TO_EDGE),I.texParameteri(I.TEXTURE_2D,I.TEXTURE_WRAP_T,I.CLAMP_TO_EDGE),I.bindFramebuffer(I.FRAMEBUFFER,F.framebuffer),I.framebufferTexture2D(I.FRAMEBUFFER,I.COLOR_ATTACHMENT0,I.TEXTURE_2D,mt,0),F.texture=mt,F.width=ct,F.height=bt},Jt=zt(),Vt=Array.from({length:ny},zt),H=I.createVertexArray(),ie=document.createElement("canvas");ie.width=1,ie.height=1;let Nt=ie.getContext("2d",{willReadFrequently:!0}),se=window.matchMedia?.("(prefers-reduced-motion: reduce)").matches??!1,K={time:0,roll:0,flow:0,frame:0,intro:Ct.current.intro&&!se?0:rm,width:1,height:1,fit:1,colorKey:"",glow:[.55,.36,.96],line:[1,.85,.98],secondary:[.44,.29,.77],pointer:{x:0,y:0,inside:!1},hover:{x:0,y:0,presence:0,placed:!1},look:{x:0,y:0,vx:0,vy:0},focus:gf+Ct.current.focusDepth*3,pulse:{s:0,age:9,strength:0,ribbon:0},camera:null},V=0,Q=0,at=!0,E=!0,_=(F,ct)=>{if(!Nt||!F)return ct;let bt=/^[0-9a-f]{3,8}$/i.test(F)?`#${F}`:F;Nt.clearRect(0,0,1,1),Nt.fillStyle="#000000",Nt.fillStyle=bt,Nt.fillRect(0,0,1,1);let[mt,Gt,qt]=Nt.getImageData(0,0,1,1).data;return[mt/255,Gt/255,qt/255]},P=F=>{let ct=`${F.glowColor}|${F.lineColor}|${F.secondaryColor}|${F.lightMode}`;ct!==K.colorKey&&(K.colorKey=ct,K.glow=_(F.glowColor,[.55,.36,.96]),K.secondary=F.secondaryColor?_(F.secondaryColor,K.glow):K.glow.map(bt=>bt*.8),F.lineColor?K.line=_(F.lineColor,K.glow):K.line=F.lightMode?K.glow:K.glow.map(bt=>bt+(1-bt)*.72))},X=(F,ct,bt,mt)=>{let Gt=ow[bt],qt=Gt[3],le=F*ay,oe=mt*(.52*Math.sin(le*.43+ct*.31+qt)+.26*Math.sin(le*.79-ct*.23+1.3+qt*.7))+Gt[0]+le*Gt[2],_e=mt*.65*Math.sin(le*.33+ct*.19+.7+qt*1.3)+Gt[1];return[le,oe,_e]},it=F=>{let ct=K.width/Math.max(K.height,1),bt=[0,0,gf],mt=tO(uw,ct,.1,60),Gt=[1,0,0,0,0,1,0,0,0,0,1,0,-bt[0],-bt[1],-bt[2],1],qt=nO(F.perspective*.85+K.look.x*.22,.12-K.look.y*.14,F.rotation);return{eye:bt,viewProj:eO(mt,Gt),orient:qt}},dt=(F,ct)=>{let bt=F.viewProj,mt=bt[0]*ct[0]+bt[4]*ct[1]+bt[8]*ct[2]+bt[12],Gt=bt[1]*ct[0]+bt[5]*ct[1]+bt[9]*ct[2]+bt[13],qt=bt[3]*ct[0]+bt[7]*ct[1]+bt[11]*ct[2]+bt[15];return{x:(mt/qt*.5+.5)*K.width,y:(.5-Gt/qt*.5)*K.height,depth:qt}},xt=(F,ct,bt)=>{let mt=K.camera;if(!mt)return null;let Gt=null;for(let qt=0;qt<F.layers;qt+=1)for(let le=0;le<=96;le+=1){let oe=le/96-.5,_e=X(oe,K.time,qt,F.waves).map(Et=>Et*F.scale*K.fit),Ht=iO(mt.orient,_e),xe=dt(mt,Ht),Pe=Math.hypot(xe.x-ct,xe.y-bt);(!Gt||Pe<Gt.gap)&&(Gt={gap:Pe,s:oe,ribbon:qt,depth:xe.depth})}return Gt},$=()=>{let F=Ct.current,ct=Math.max(1,gt.clientWidth),bt=Math.max(1,gt.clientHeight),mt=Math.min(F.dpr||window.devicePixelRatio||1,2),Gt=Math.max(ct,bt)*mt,qt=Gt>sw?mt*sw/Gt:mt,le=Math.max(1,Math.round(ct*qt)),oe=Math.max(1,Math.round(bt*qt));(Zt.width!==le||Zt.height!==oe)&&(Zt.width=le,Zt.height=oe),K.width=ct,K.height=bt,K.fit=On(ct/bt/1.5,.6,1),et()},G=(F,ct,bt,mt)=>{I.bindFramebuffer(I.FRAMEBUFFER,ct.framebuffer),I.viewport(0,0,ct.width,ct.height),I.useProgram(F.program),I.activeTexture(I.TEXTURE0),I.bindTexture(I.TEXTURE_2D,bt.texture),I.uniform1i(F.uniforms.uSource,0),I.uniform2f(F.uniforms.uTexel,mt[0],mt[1]),I.drawArrays(I.TRIANGLES,0,3)},et=()=>{let F=Ct.current;P(F);let ct=it(F);K.camera=ct;let bt=Zt.height/Math.max(K.height,1),mt=F.paused||se?1:On(K.intro/rm,0,1),Gt=1-(1-mt)*(1-mt)*(1-mt);re(Jt,Zt.width,Zt.height),I.bindVertexArray(H),I.bindFramebuffer(I.FRAMEBUFFER,Jt.framebuffer),I.viewport(0,0,Zt.width,Zt.height),I.clearColor(0,0,0,0),I.clear(I.COLOR_BUFFER_BIT),I.enable(I.BLEND),I.blendFunc(I.ONE,I.ONE);let qt=Math.round(260*F.density),le=22*On(Math.sqrt(56e3/(F.threads*qt*F.layers)),.45,1),oe=Math.max(.8*F.thickness,.45)**2/.64,_e=Math.pow(F.threads/72*F.density*oe,-.75);I.useProgram($t.program);let Ht=$t.uniforms;I.uniform1f(Ht.uTime,K.time),I.uniform1f(Ht.uTwist,F.twist),I.uniform1f(Ht.uRoll,K.roll),I.uniform1f(Ht.uWaves,F.waves),I.uniform1f(Ht.uWidth,.62*F.spread),I.uniformMatrix3fv(Ht.uOrient,!1,ct.orient),I.uniform1f(Ht.uScale,F.scale*K.fit),I.uniformMatrix4fv(Ht.uViewProj,!1,ct.viewProj),I.uniform3f(Ht.uEye,ct.eye[0],ct.eye[1],ct.eye[2]),I.uniform2f(Ht.uViewport,Zt.width,Zt.height),I.uniform1f(Ht.uDpr,bt),I.uniform1f(Ht.uFibers,F.threads),I.uniform1f(Ht.uDots,qt),I.uniform1f(Ht.uFlow,K.flow),I.uniform1f(Ht.uSize,1.6*F.thickness),I.uniform1f(Ht.uFocus,K.focus),I.uniform1f(Ht.uDof,F.depthOfField),I.uniform1f(Ht.uMaxCoc,le),I.uniform1f(Ht.uFocal,gf),I.uniform1f(Ht.uIntro,Gt),I.uniform4f(Ht.uPulse,K.pulse.s,K.pulse.age,K.pulse.strength,K.pulse.ribbon),I.uniform4f(Ht.uHover,K.hover.x*bt,(K.height-K.hover.y)*bt,140*bt,K.hover.presence*F.mouseStrength),I.uniform1f(Ht.uPart,F.hover===1?1:0),I.uniform1f(Ht.uDotLength,F.dotLength),I.uniform1f(Ht.uSparkle,F.sparkle),I.uniform1f(Ht.uDepthSpread,.12),I.uniform1f(Ht.uVolume,F.volume),I.uniform3f(Ht.uGlowColor,K.glow[0],K.glow[1],K.glow[2]),I.uniform3f(Ht.uLineColor,K.line[0],K.line[1],K.line[2]),I.uniform3f(Ht.uSecondaryColor,K.secondary[0],K.secondary[1],K.secondary[2]),I.uniform1f(Ht.uTips,F.tips),I.uniform1f(Ht.uGradient,F.gradient),I.uniform1f(Ht.uFold,F.foldGlow);for(let Rt=0;Rt<F.layers;Rt+=1){let we=ow[Rt];I.uniform1f(Ht.uRibbon,Rt),I.uniform4f(Ht.uPlace,we[0],we[1],we[2],we[3]),I.uniform1f(Ht.uGain,HI[Rt]*_e),I.uniform1f(Ht.uTint,BI[Rt]),I.drawArraysInstanced(I.TRIANGLE_STRIP,0,4,F.threads*qt)}let xe=Math.round(420*F.particles);if(xe>0){I.useProgram(ht.program);let Rt=ht.uniforms;I.uniformMatrix4fv(Rt.uViewProj,!1,ct.viewProj),I.uniform2f(Rt.uViewport,Zt.width,Zt.height),I.uniform1f(Rt.uDpr,bt),I.uniform1f(Rt.uTime,K.time),I.uniform1f(Rt.uSize,2.2*F.thickness),I.uniform1f(Rt.uFocus,K.focus),I.uniform1f(Rt.uDof,F.depthOfField),I.uniform1f(Rt.uMaxCoc,22),I.uniform1f(Rt.uFocal,gf),I.uniform1f(Rt.uIntro,Gt),I.uniform1f(Rt.uSparkle,F.sparkle),I.uniform1f(Rt.uScale,F.scale*K.fit),I.uniform1f(Rt.uGradient,F.gradient),I.uniform1f(Rt.uGain,1/F.thickness),I.uniform3f(Rt.uGlowColor,K.glow[0],K.glow[1],K.glow[2]),I.uniform3f(Rt.uLineColor,K.line[0],K.line[1],K.line[2]),I.uniform3f(Rt.uSecondaryColor,K.secondary[0],K.secondary[1],K.secondary[2]),I.drawArraysInstanced(I.TRIANGLE_STRIP,0,4,xe)}I.disable(I.BLEND);let Pe=F.glow>.001&&!F.lightMode;if(I.bindVertexArray(H),Pe){Vt.forEach((Rt,we)=>{re(Rt,Math.max(1,Math.round(Zt.width/2**(we+1))),Math.max(1,Math.round(Zt.height/2**(we+1))))}),G(Tt,Vt[0],Jt,[.5/Jt.width,.5/Jt.height]);for(let Rt=1;Rt<ny;Rt+=1)G(wt,Vt[Rt],Vt[Rt-1],[1/Vt[Rt-1].width,1/Vt[Rt-1].height]);I.enable(I.BLEND),I.blendFunc(I.ONE,I.ONE);for(let Rt=ny-1;Rt>0;Rt-=1)G(At,Vt[Rt-1],Vt[Rt],[.5/Vt[Rt].width,.5/Vt[Rt].height]);I.disable(I.BLEND)}I.bindFramebuffer(I.FRAMEBUFFER,null),I.viewport(0,0,Zt.width,Zt.height),I.clearColor(0,0,0,0),I.clear(I.COLOR_BUFFER_BIT),I.useProgram(Mt.program);let Et=Mt.uniforms;I.activeTexture(I.TEXTURE0),I.bindTexture(I.TEXTURE_2D,Jt.texture),I.activeTexture(I.TEXTURE1),I.bindTexture(I.TEXTURE_2D,Pe?Vt[0].texture:Jt.texture),I.uniform1i(Et.uScene,0),I.uniform1i(Et.uBloom,1),I.uniform1f(Et.uGlow,Pe?F.glow:0),I.uniform1f(Et.uBrightness,F.brightness),I.uniform1f(Et.uLightMode,F.lightMode?1:0),I.uniform1f(Et.uGrain,F.grain),I.uniform1f(Et.uVignette,F.vignette),I.uniform1f(Et.uFrame,K.frame%977),I.uniform2f(Et.uView,Zt.width,Zt.height),I.uniform1f(Et.uDpr,bt),I.drawArrays(I.TRIANGLES,0,3),I.activeTexture(I.TEXTURE1),I.bindTexture(I.TEXTURE_2D,null),I.activeTexture(I.TEXTURE0),I.bindTexture(I.TEXTURE_2D,null),I.bindVertexArray(null)},L=F=>{if(V=0,!E||!at||document.hidden)return;let ct=Ct.current,bt=Q?(F-Q)/1e3:1/60,mt=Math.min(.05,bt);Q=F;let Gt=!ct.paused&&!se;Gt?(K.frame+=1,K.time+=mt*ct.speed,K.roll+=mt*ct.speed*ct.rollSpeed,K.flow+=mt*ct.flow*12,K.intro+=Math.min(bt,1)):K.intro<rm&&(K.intro=rm),K.pulse.age+=mt,K.pulse.strength=Math.max(0,1-K.pulse.age/1.8)**2;let{pointer:qt,hover:le,look:oe}=K,_e=ct.mouseInteraction&&qt.inside&&!se;_e&&!le.placed&&(le.x=qt.x,le.y=qt.y,le.placed=!0),le.x+=(qt.x-le.x)*(1-Math.exp(-mt/.08)),le.y+=(qt.y-le.y)*(1-Math.exp(-mt/.08));let Ht=_e?1:0;le.presence+=(Ht-le.presence)*(1-Math.exp(-mt/(Ht>le.presence?.3:.6))),!_e&&le.presence<.001&&(le.placed=!1);let xe=_e?(qt.x/K.width-.5)*.5:0,Pe=_e?(.5-qt.y/K.height)*.5:0;oe.vx+=(30*(xe-oe.x)-11*oe.vx)*mt,oe.vy+=(30*(Pe-oe.y)-11*oe.vy)*mt,oe.x+=oe.vx*mt,oe.y+=oe.vy*mt;let Et=gf+ct.focusDepth*3,Rt=Et;if(_e&&ct.hover===0){let pn=xt(ct,le.x,le.y);pn&&(Rt=Et+(pn.depth-Et)*le.presence*Math.min(1,ct.mouseStrength))}K.focus+=(Rt-K.focus)*(1-Math.exp(-mt/.35)),et();let we=Math.abs(Ht-le.presence)>.002||Math.abs(xe-oe.x)>2e-4||Math.abs(Pe-oe.y)>2e-4||Math.abs(Rt-K.focus)>.001||K.pulse.strength>.001;Gt||we?V=requestAnimationFrame(L):Q=0},U=()=>{!V&&E&&at&&!document.hidden&&(V=requestAnimationFrame(L))},O=F=>{let ct=gt.getBoundingClientRect(),bt=F.clientX-ct.left,mt=F.clientY-ct.top;K.pointer.x=bt,K.pointer.y=mt,K.pointer.inside=bt>=0&&mt>=0&&bt<=ct.width&&mt<=ct.height,U()},st=F=>{let ct=Ct.current;if(!ct.mouseInteraction||!ct.pulseOnClick||F.button!==0||se||F.target instanceof Element&&F.target.closest('a, button, input, textarea, select, label, [role="button"]'))return;let bt=gt.getBoundingClientRect(),mt=F.clientX-bt.left,Gt=F.clientY-bt.top;if(mt<0||Gt<0||mt>bt.width||Gt>bt.height)return;let qt=xt(ct,mt,Gt);qt&&(K.pulse={s:qt.s,age:0,strength:1,ribbon:qt.ribbon}),U()},ft=()=>{K.pointer.inside=!1,U()},vt=()=>{Q=0,U()},Ut=new ResizeObserver($);Ut.observe(gt);let Bt=new IntersectionObserver(F=>{at=F.some(ct=>ct.isIntersecting),at&&(Q=0,U())});return Bt.observe(gt),window.addEventListener("pointermove",O,{passive:!0}),window.addEventListener("pointerdown",st),document.documentElement.addEventListener("pointerleave",ft),document.addEventListener("visibilitychange",vt),$(),U(),lt.current=()=>{V||et(),U()},()=>{E=!1,cancelAnimationFrame(V),lt.current=null,Ut.disconnect(),Bt.disconnect(),window.removeEventListener("pointermove",O),window.removeEventListener("pointerdown",st),document.documentElement.removeEventListener("pointerleave",ft),document.removeEventListener("visibilitychange",vt),I.deleteVertexArray(H),[Jt,...Vt].forEach(F=>{F.texture&&I.deleteTexture(F.texture),I.deleteFramebuffer(F.framebuffer)}),[$t,ht,Tt,wt,At,Mt].forEach(F=>I.deleteProgram(F.program))}},[]),(0,Us.useEffect)(()=>{lt.current?.()});let{className:Ft="",...Lt}=N;return(0,ry.jsx)("div",{ref:yt,className:`ghost-fibers-container${Ft?` ${Ft}`:""}`,...Lt,children:(0,ry.jsx)("canvas",{ref:Dt,className:"ghost-fibers-canvas","aria-hidden":"true"})})},fw=aO;var Os=Ce(vi(),1);var sy=Ce(an(),1),rO=1.8,sO=`#version 300 es
in vec2 aPosition;
void main() {
  gl_Position = vec4(aPosition, 0.0, 1.0);
}`,oO=`#version 300 es
precision highp float;
uniform vec2 uResolution;
uniform vec2 uCenter;
uniform float uScale;
uniform float uRatio;
uniform float uTime;
uniform float uDrift;
uniform vec2 uSteer;
uniform float uBend;
uniform float uCount;
uniform float uSwing;
uniform float uWave;
uniform float uWidth;
uniform float uPulseWidth;
uniform float uHead;
uniform float uTail;
uniform float uChance;
uniform float uSpacing;
uniform float uPulseSpeed;
uniform float uFlow;
uniform float uHalo;
uniform float uGlow;
uniform float uBrightness;
uniform float uVariance;
uniform float uBody;
uniform float uFadeNear;
uniform float uFadeFar;
uniform vec3 uCable;
uniform vec3 uPulse;
uniform vec3 uTunnel;
uniform vec3 uSurge;
uniform float uReveal;
uniform float uGrain;
uniform float uSeed;
uniform float uLight;
uniform float uOpacity;
out vec4 outColor;

const float TAU = 6.2831853;

vec3 inkOf(vec3 color, float depthOfInk) {
  float luma = dot(color, vec3(0.2126, 0.7152, 0.0722));
  float peak = max(color.r, max(color.g, color.b));
  float chroma = (peak - min(color.r, min(color.g, color.b))) / max(peak, 0.001);
  return color * min(1.0, mix(depthOfInk, depthOfInk * 1.7, chroma) / max(luma, 0.001));
}

float hash(float n) {
  return fract(sin(n * 127.1 + uSeed * 311.7) * 43758.5453);
}

vec2 bendAt(float depth) {
  float reach = 1.0 - exp(-max(depth, 0.0) * 0.55);
  vec2 wobble = vec2(sin(uDrift * 0.37 + depth * 0.31), cos(uDrift * 0.29 + depth * 0.23)) * uBend;
  return (wobble + uSteer) * reach;
}

void main() {
  vec2 p = (gl_FragCoord.xy - 0.5 * uResolution - uCenter) / uScale;
  float depth = -log(max(length(p), 1e-5));
  vec2 q = p;
  for (int i = 0; i < 4; i++) {
    q = p - bendAt(depth);
    depth = -log(max(length(q), 1e-5));
  }
  float r = length(q);
  float px = r * uScale;
  float turn = atan(q.y, q.x) / TAU;
  float s = turn - uSwing - uWave * sin(depth * 1.2 + uDrift * 0.5);
  float cell = floor(s * uCount);
  float spacing = TAU * px / uCount;
  float near = smoothstep(0.55, 1.25, r);
  float width = uWidth * (1.0 + near * 1.2);
  float soft = uRatio * (0.55 + near * 0.9);
  float tight = uRatio * uHalo * (1.0 + near);
  float wide = tight * 4.5;

  float lines = 0.0;
  float body = 0.0;
  vec3 glow = vec3(0.0);
  float strokes = 0.0;
  for (int k = -3; k <= 3; k++) {
    float i = cell + float(k);
    float id = mod(i, uCount);
    float h1 = hash(id);
    float h2 = hash(id + 17.0);
    float h3 = hash(id + 41.0);
    float h4 = hash(id + 73.0);
    float center = (i + 0.5 + (h1 - 0.5) * 0.55) / uCount;
    center += 0.12 * sin(depth * (0.8 + h2 * 0.9) + uDrift * (0.4 + h3 * 0.5) + h4 * TAU) / uCount;
    float d = abs(s - center) * TAU * px;
    float shade = 1.0 + uVariance * (h3 - 0.5) * 0.9;
    float reach = smoothstep(spacing * 2.4, spacing * 1.4, d);

    lines += smoothstep(width + soft, width - soft, d) * shade;
    body += exp(-d / max(spacing * 0.22, 0.001)) * shade * reach;

    float x = depth * uSpacing + uTime * uPulseSpeed * (0.55 + h2 * 0.6) * uFlow + h4 * 7.0;
    float lead = (fract(x) - 0.5) / uSpacing * uFlow;
    float lit = step(hash(id * 3.7 + floor(x) * 13.1), uChance);
    float limit = 0.5 / uSpacing;
    float head = exp(-pow(max(-lead, 0.0) / uHead, 2.0)) * smoothstep(-limit, -limit * 0.8, lead);
    float tail = exp(-max(lead, 0.0) / uTail) * smoothstep(limit, limit * 0.55, lead);
    float pulse = (lead < 0.0 ? head : tail) * lit;
    float ring = uSurge.y * exp(-pow((depth - uSurge.x) / uSurge.z, 2.0));
    pulse = max(pulse, ring);
    float hot = pulse * (lead < 0.0 ? 1.0 : exp(-max(lead, 0.0) / (uTail * 0.35)));

    float core = uPulseWidth * width + 0.35 * uRatio;
    float stroke = smoothstep(core + soft, core - soft, d);
    float bloom = (exp(-d / tight) * 0.7 + exp(-d / wide) * 0.18) * uGlow * reach;
    vec3 tint = mix(uPulse, vec3(1.0), hot * 0.55 * (1.0 - uLight));
    glow += tint * pulse * (stroke * 1.5 + bloom) * shade;
    strokes += pulse * stroke * shade;
  }

  float lod = smoothstep(4.0, 1.2, spacing);
  float average = min(2.0 * uWidth / max(spacing, 0.001), 1.0);
  lines = mix(lines, average, lod);
  glow = mix(glow, uPulse * average * 0.6 * uChance, lod);
  strokes = mix(strokes, average * 0.6 * uChance, lod);
  body = mix(body, 1.0, lod) * uBody;

  float rr = r * 0.25;
  float fade = smoothstep(0.0, uFadeNear, rr) * smoothstep(uFadeFar, uFadeFar * 0.55, rr);
  fade *= smoothstep(uReveal - 0.6, uReveal, depth);

  float grain = 1.0;
  if (uGrain > 0.0) {
    grain += (fract(sin(dot(gl_FragCoord.xy, vec2(12.9898, 78.233)) + uTime * 7.0) * 43758.5453) - 0.5) * uGrain * 4.0;
  }

  if (uLight > 0.5) {
    float hairline = clamp(lines * 0.26 + body * 0.2, 0.0, 1.0);
    float stroke = clamp(strokes * 1.6, 0.0, 1.0);
    float haze = clamp(length(glow) * 0.12, 0.0, 0.25);
    float ink = clamp(hairline + stroke + haze, 0.0, 1.0) * fade * uOpacity * grain;
    vec3 tone = mix(inkOf(uCable, 0.3), inkOf(uPulse, 0.16), clamp(stroke + haze * 2.0, 0.0, 1.0));
    tone = mix(tone, inkOf(uTunnel, 0.3), clamp(body * uBody, 0.0, 1.0) * 0.5);
    outColor = vec4(tone * ink, ink);
    return;
  }

  vec3 light = (uCable * lines * 0.12 + uTunnel * body * 0.35 + glow) * uBrightness * fade * grain;
  vec3 mapped = (1.0 - exp(-light * 1.4)) * uOpacity;
  outColor = vec4(mapped, max(mapped.r, max(mapped.g, mapped.b)));
}`,nr=(e,t,n)=>Math.min(n,Math.max(t,e)),hw=(e,t,n)=>{let i=e.createShader(t);return i?(e.shaderSource(i,n),e.compileShader(i),e.getShaderParameter(i,e.COMPILE_STATUS)?i:(e.deleteShader(i),null)):null},lO=e=>{let t=hw(e,e.VERTEX_SHADER,sO),n=hw(e,e.FRAGMENT_SHADER,oO),i=e.createProgram();if(!t||!n||!i)return null;if(e.attachShader(i,t),e.attachShader(i,n),e.bindAttribLocation(i,0,"aPosition"),e.linkProgram(i),e.deleteShader(t),e.deleteShader(n),!e.getProgramParameter(i,e.LINK_STATUS))return e.deleteProgram(i),null;let a={},r=e.getProgramParameter(i,e.ACTIVE_UNIFORMS);for(let s=0;s<r;s++){let l=e.getActiveUniform(i,s);l&&(a[l.name]=e.getUniformLocation(i,l.name))}return{program:i,uniforms:a}},cO=({cableColor:e="#ffffff",pulseColor:t="#ffffff",tunnelColor:n="#ffffff",tunnelOpacity:i=0,speed:a=.1,flowDirection:r="inward",pulseSpeed:s=2,pulseLength:l=.28,pulseBlend:o=.6,pulseWidth:c=1,pulseDensity:u=.5,cableCount:p=56,thickness:f=.35,rimWidth:h=.15,waviness:g=.3,sway:M=.5,bend:v=.4,size:d=1,centerX:x=0,centerY:b=0,glow:y=1,fadeNear:w=.5,fadeFar:T=2,brightness:m=1,colorVariance:S=!0,grain:C=!1,grainIntensity:D=.05,opacity:R=1,mouseInteraction:Z=!0,mouseStrength:tt=.1,clickSurge:z=!0,intro:J=!0,variation:j=0,lightMode:B=!1,dpr:ot,className:k="",style:Y,...N})=>{let yt=(0,Os.useRef)(null),Dt=(0,Os.useRef)(null),lt=(0,Os.useRef)(null),_t={cableColor:e,pulseColor:t,tunnelColor:n,tunnelOpacity:nr(i,0,1),speed:Math.max(0,a),flow:r==="outward"?1:-1,pulseSpeed:Math.max(0,s),pulseLength:nr(l,.02,1),pulseBlend:nr(o,0,1),pulseWidth:nr(c,.1,3),pulseDensity:nr(u,0,1),cableCount:nr(Math.round(p),4,200),thickness:nr(f,.05,2),rimWidth:nr(h,0,1),waviness:Math.max(0,g),sway:Math.max(0,M),bend:Math.max(0,v),size:Math.max(.05,d),centerX:x,centerY:b,glow:Math.max(0,y),fadeNear:Math.max(.001,w),fadeFar:Math.max(.01,T),brightness:Math.max(0,m),colorVariance:S,grain:C,grainIntensity:Math.max(0,D),opacity:nr(R,0,1),mouseInteraction:Z,mouseStrength:Math.max(0,tt),clickSurge:z,intro:J,variation:j,lightMode:B,dpr:ot},Ct=(0,Os.useRef)(_t);return Ct.current=_t,(0,Os.useEffect)(()=>{let Ft=yt.current,Lt=Dt.current,gt=Lt?.getContext("webgl2",{alpha:!0,premultipliedAlpha:!0,antialias:!1,depth:!1,stencil:!1});if(!Ft||!Lt||!gt)return;let Zt=lO(gt);if(!Zt)return;let I=Zt.uniforms,jt=gt.createBuffer(),$t=gt.createVertexArray();gt.bindVertexArray($t),gt.bindBuffer(gt.ARRAY_BUFFER,jt),gt.bufferData(gt.ARRAY_BUFFER,new Float32Array([-1,-1,3,-1,-1,3]),gt.STATIC_DRAW),gt.enableVertexAttribArray(0),gt.vertexAttribPointer(0,2,gt.FLOAT,!1,0,0);let ht=document.createElement("canvas").getContext("2d",{willReadFrequently:!0}),Tt=new Map,wt=(G,et)=>{if(!G)return et;let L=String(G);if(Tt.has(L))return Tt.get(L);let U=et;if(ht){ht.clearRect(0,0,1,1),ht.fillStyle="#000000",ht.fillStyle=L,ht.fillRect(0,0,1,1);let[O,st,ft]=ht.getImageData(0,0,1,1).data;U=[O/255,st/255,ft/255]}return Tt.set(L,U),U},At=window.matchMedia?.("(prefers-reduced-motion: reduce)").matches??!1,Mt={x:0,y:0,inside:!1},Yt={x:0,y:0},zt={age:10},re=0,Jt=0,Vt=Ct.current.intro&&!At?0:1,H=0,ie=0,Nt=!0,se=()=>{let G=Ct.current,et=Lt.width,L=Lt.height,U=et/Math.max(1,Ft.clientWidth),O=Math.min(et,L),st=G.flow,ft=3.4,vt=zt.age*2.6,Ut=st>0?ft-vt:-.6+vt,Bt=zt.age<2.4?Math.min(1,zt.age/.12)*Math.exp(-zt.age*1.1):0,F=Vt*Vt*(3-2*Vt);gt.viewport(0,0,et,L),gt.useProgram(Zt.program),gt.bindVertexArray($t),gt.uniform2f(I.uResolution,et,L),gt.uniform2f(I.uCenter,G.centerX*O,G.centerY*O),gt.uniform1f(I.uScale,O*.5*G.size),gt.uniform1f(I.uRatio,U),gt.uniform1f(I.uTime,re),gt.uniform1f(I.uDrift,Jt),gt.uniform2f(I.uSteer,Yt.x,Yt.y),gt.uniform1f(I.uBend,G.bend*.45),gt.uniform1f(I.uCount,G.cableCount),gt.uniform1f(I.uSwing,Math.sin(Jt*.9)*G.sway*.5/(Math.PI*2)),gt.uniform1f(I.uWave,G.waviness*.15),gt.uniform1f(I.uWidth,(.25+G.thickness*1.5)*U),gt.uniform1f(I.uPulseWidth,.6+G.pulseWidth*.9);let ct=G.pulseLength*1.2;gt.uniform1f(I.uHead,ct*(.08+G.pulseBlend*.22)),gt.uniform1f(I.uTail,ct*(.5+G.pulseBlend*.7)),gt.uniform1f(I.uChance,G.pulseDensity),gt.uniform1f(I.uSpacing,.4),gt.uniform1f(I.uPulseSpeed,G.pulseSpeed*4),gt.uniform1f(I.uFlow,st),gt.uniform1f(I.uHalo,1.2+G.rimWidth*8),gt.uniform1f(I.uGlow,G.glow),gt.uniform1f(I.uBrightness,G.brightness),gt.uniform1f(I.uVariance,G.colorVariance?1:0),gt.uniform1f(I.uBody,G.tunnelOpacity),gt.uniform1f(I.uFadeNear,G.fadeNear),gt.uniform1f(I.uFadeFar,G.fadeFar),gt.uniform3fv(I.uCable,wt(G.cableColor,[1,1,1])),gt.uniform3fv(I.uPulse,wt(G.pulseColor,[1,1,1])),gt.uniform3fv(I.uTunnel,wt(G.tunnelColor,[1,1,1])),gt.uniform3f(I.uSurge,Ut,Bt,.22),gt.uniform1f(I.uReveal,1.7-F*3.6),gt.uniform1f(I.uGrain,G.grain?G.grainIntensity:0),gt.uniform1f(I.uSeed,G.variation),gt.uniform1f(I.uLight,G.lightMode?1:0),gt.uniform1f(I.uOpacity,G.opacity),gt.drawArrays(gt.TRIANGLES,0,3)},K=G=>{if(H=0,!Nt||document.hidden)return;let et=Ct.current,L=ie?nr((G-ie)/1e3,5e-4,.05):1/60;ie=G;let U=At?0:1;re+=L*et.speed*U,Jt+=L*(et.speed+.2)*U,zt.age+=L,et.intro&&!At&&Vt<1?Vt=Math.min(1,Vt+L/rO):(!et.intro||At)&&(Vt=1);let O=et.mouseInteraction&&Mt.inside&&!At,st=et.mouseStrength*2.5,ft=O?[Mt.x*st,Mt.y*st]:[0,0],vt=1-Math.exp(-L/.6);Yt.x+=(ft[0]-Yt.x)*vt,Yt.y+=(ft[1]-Yt.y)*vt,se();let Ut=Math.abs(ft[0]-Yt.x)<5e-4&&Math.abs(ft[1]-Yt.y)<5e-4;U>0||!Ut||Vt<1||zt.age<2.4?H=requestAnimationFrame(K):ie=0},V=()=>{!H&&Nt&&!document.hidden&&(H=requestAnimationFrame(K))},Q=()=>{let G=Ct.current,et=Math.max(1,Ft.clientWidth),L=Math.max(1,Ft.clientHeight),U=Math.min(G.dpr||window.devicePixelRatio||1,2);Lt.width=Math.max(1,Math.round(et*U)),Lt.height=Math.max(1,Math.round(L*U)),se(),V()},at=G=>{let et=Ft.getBoundingClientRect(),L=G.clientX-et.left,U=G.clientY-et.top;Mt.inside=L>=0&&U>=0&&L<=et.width&&U<=et.height;let O=Math.min(et.width,et.height)*.5;Mt.x=(L-et.width/2)/Math.max(1,O),Mt.y=(et.height/2-U)/Math.max(1,O)},E=G=>{at(G),V()},_=G=>{at(G),!(!Mt.inside||!Ct.current.clickSurge||At)&&(zt.age=0,V())},P=G=>{G.pointerType!=="mouse"&&(Mt.inside=!1)},X=()=>{Mt.inside=!1},it=()=>{ie=0,V()},dt=new ResizeObserver(Q);dt.observe(Ft);let xt=new IntersectionObserver(G=>{Nt=G.some(et=>et.isIntersecting),Nt&&(ie=0,V())});xt.observe(Ft),window.addEventListener("pointermove",E,{passive:!0}),window.addEventListener("pointerdown",_,{passive:!0}),window.addEventListener("pointerup",P,{passive:!0}),window.addEventListener("pointercancel",P,{passive:!0}),document.documentElement.addEventListener("pointerleave",X),document.addEventListener("visibilitychange",it),Q();let $=Ct.current.dpr;return lt.current=()=>{let G=Ct.current;if(G.dpr!==$){$=G.dpr,Q();return}H||se(),V()},()=>{cancelAnimationFrame(H),lt.current=null,dt.disconnect(),xt.disconnect(),window.removeEventListener("pointermove",E),window.removeEventListener("pointerdown",_),window.removeEventListener("pointerup",P),window.removeEventListener("pointercancel",P),document.documentElement.removeEventListener("pointerleave",X),document.removeEventListener("visibilitychange",it),gt.deleteProgram(Zt.program),gt.deleteBuffer(jt),gt.deleteVertexArray($t),gt.getExtension("WEBGL_lose_context")?.loseContext()}},[]),(0,Os.useEffect)(()=>{lt.current?.()}),(0,sy.jsx)("div",{ref:yt,className:`light-tunnel-container${k?` ${k}`:""}`,style:Y,...N,children:(0,sy.jsx)("canvas",{ref:Dt,className:"light-tunnel-canvas","aria-hidden":"true"})})},dw=cO;var pi=Ce(vi(),1);var Pr=Ce(an(),1),pw={dark:{tile:"#1b1922",text:"rgba(255, 255, 255, 0.78)",border:"rgba(255, 255, 255, 0.07)"},light:{tile:"#f4f4f5",text:"#3f3f46",border:"rgba(24, 24, 27, 0.08)"}},uO=["alternate","left","right"],fO=/^(https?:\/\/|\/\/|\/|\.\.?\/|data:image\/|blob:)|\.(avif|gif|jpe?g|png|svg|webp)(\?.*)?$/i,mw=[.42,.32,.26,.22],gw=[1,.86,1.12,.94],ir=(e,t,n)=>Math.min(n,Math.max(t,e)),hO=(e,t)=>(e%t+t)%t,dO=(e,t,n)=>{let i=ir((n-e)/(t-e),0,1);return i*i*(3-2*i)},vw=(e,t)=>{let n=[];for(let a=0;a<=12;a++){let r=a/12,s=r*r*r*(r*(r*6-15)+10);n.push(`rgba(0, 0, 0, ${s.toFixed(4)}) ${(r*t).toFixed(2)}%`)}let i=n.map((a,r)=>{let s=(12-r)/12;return`rgba(0, 0, 0, ${(s*s*s*(s*(s*6-15)+10)).toFixed(4)}) ${(100-s*t).toFixed(2)}%`});return`linear-gradient(${e}, ${n.join(", ")}, ${i.join(", ")})`},pO=e=>{if(e==null||e===!1)return{kind:"empty"};if((0,pi.isValidElement)(e))return{kind:"node",node:e};if(typeof e=="object"&&"src"in e&&typeof e.src=="string")return{kind:"image",src:e.src,alt:e.alt??""};let t=String(e).trim();return fO.test(t)?{kind:"image",src:t,alt:""}:{kind:"text",text:t}},mO={kind:"empty"},gO=({tile:e})=>(0,Pr.jsxs)("div",{className:"grid-motion__tile",children:[e.kind==="image"&&(0,Pr.jsx)("img",{src:e.src,alt:e.alt,draggable:!1,decoding:"async"}),e.kind==="text"&&(0,Pr.jsx)("span",{className:"grid-motion__text",children:e.text}),e.kind==="node"&&e.node]}),vO=({items:e=[],rows:t=4,aspectRatio:n=1.33,gap:i=16,radius:a=14,angle:r=-12,tilt:s=0,speed:l=24,direction:o="alternate",parallax:c=.5,spotlight:u=.6,dim:p=.35,grayscale:f=!1,fade:h=.5,tileColor:g,textColor:M,theme:v="dark",className:d="",style:x})=>{let b=(0,pi.useRef)(null),y=(0,pi.useRef)(null),w=(0,pi.useRef)({offsets:[],shifts:[],intro:0,pointer:{x:0,y:0,active:!1}}),[T,m]=(0,pi.useState)({width:0,height:0}),S=pw[v]??pw.dark,C={rows:ir(Math.round(t),1,12),aspect:ir(n,.3,4),gap:Math.max(0,i),angle:r,tilt:ir(s,0,75),speed:l,direction:uO.includes(o)?o:"alternate",parallax:ir(c,0,1),spotlight:ir(u,0,1),dim:ir(p,0,1),fade:ir(h,0,1)},D=(0,pi.useRef)(C);D.current=C;let R=(0,pi.useMemo)(()=>{let{width:J,height:j}=T;if(!J||!j)return null;let B=C.angle*Math.PI/180,ot=C.tilt*Math.PI/180,k=Math.abs(Math.cos(B)),Y=Math.abs(Math.sin(B)),N=(J*Y+j*k)/Math.max(.3,Math.cos(ot))*1.12,yt=(J*k+j*Y)*(1+Math.sin(ot)*.9)*1.12,Dt=Math.max(16,(N-C.gap*(C.rows-1))/C.rows),lt=Dt*C.aspect,_t=lt+C.gap,Ct=Math.max(Math.ceil(yt/_t)+1,Math.ceil(e.length/C.rows)),Ft=Ct*_t;return{planeWidth:yt,planeHeight:N,tileWidth:lt,tileHeight:Dt,step:_t,perRow:Ct,period:Ft,copies:Math.ceil(yt/Ft)+2,top:(N-C.rows*Dt-(C.rows-1)*C.gap)/2,perspective:Math.max(J,j)*1.5}},[T,C.angle,C.tilt,C.rows,C.gap,C.aspect,e.length]),Z=(0,pi.useMemo)(()=>e.map(pO),[e]);(0,pi.useEffect)(()=>{let J=b.current;if(!J)return;let j=new ResizeObserver(()=>{let N=Math.round(J.clientWidth),yt=Math.round(J.clientHeight);m(Dt=>Dt.width===N&&Dt.height===yt?Dt:{width:N,height:yt})});j.observe(J);let B=w.current,ot=N=>{B.pointer.x=N.clientX,B.pointer.y=N.clientY,B.pointer.active=!0},k=N=>{N.pointerType==="touch"&&(B.pointer.active=!1)},Y=()=>{B.pointer.active=!1};return window.addEventListener("pointermove",ot,{passive:!0}),window.addEventListener("pointerdown",ot,{passive:!0}),window.addEventListener("pointerup",k),window.addEventListener("blur",Y),document.documentElement.addEventListener("pointerleave",Y),()=>{j.disconnect(),window.removeEventListener("pointermove",ot),window.removeEventListener("pointerdown",ot),window.removeEventListener("pointerup",k),window.removeEventListener("blur",Y),document.documentElement.removeEventListener("pointerleave",Y)}},[]),(0,pi.useEffect)(()=>{let J=b.current,j=y.current;if(!J||!j||!R)return;let B=window.matchMedia?.("(prefers-reduced-motion: reduce)"),ot=B?.matches??!1,k=I=>{ot=I.matches};B?.addEventListener("change",k);let Y=w.current,N=Array.from(j.children),yt=N.map(I=>Array.from(I.children)),Dt=yt.map(I=>new Float32Array(I.length)),lt=yt.map(I=>new Float32Array(I.length)),_t=0,Ct=performance.now(),Ft=!0,Lt=!0;Y.intro>=1&&(j.style.opacity="1");let gt=I=>{if(_t=0,!Lt)return;let jt=D.current,$t=Math.min(.05,Math.max(.001,(I-Ct)/1e3));Ct=I,Y.intro<1&&(Y.intro=Math.min(1,Y.intro+$t/.9),j.style.opacity=String(1-(1-Y.intro)**3));let ht=J.getBoundingClientRect(),Tt=ht.width?J.clientWidth/ht.width:1,wt=J.clientWidth/2||1,At=J.clientHeight/2||1,Mt=(Y.pointer.x-ht.left)*Tt-wt,Yt=(Y.pointer.y-ht.top)*Tt-At,zt=Y.pointer.active&&Math.abs(Mt)<=wt&&Math.abs(Yt)<=At,re=jt.tilt*Math.PI/180,Jt=jt.angle*Math.PI/180,Vt=R.perspective,H=Yt,ie=Mt;re>1e-4&&(H=Yt*Vt/(Vt*Math.cos(re)+Yt*Math.sin(re)),ie=Mt*(Vt-H*Math.sin(re))/Vt);let Nt=ie*Math.cos(Jt)+H*Math.sin(Jt),se=-ie*Math.sin(Jt)+H*Math.cos(Jt),K=Y.pointer.active?ir(Mt/wt,-1,1):0,V=(.6+2.2*jt.spotlight)*Math.max(R.tileWidth,R.tileHeight),Q=1-Math.exp(-$t/.22);N.forEach((at,E)=>{let _=jt.direction==="left"?-1:jt.direction==="right"||E%2?1:-1;Y.offsets[E]===void 0&&(Y.offsets[E]=E*R.step*.37,Y.shifts[E]=0),ot||(Y.offsets[E]+=jt.speed*_*gw[E%gw.length]*$t);let P=ot?0:jt.parallax*R.tileWidth*1.2*K*(E%2?-1:1);Y.shifts[E]+=(P-Y.shifts[E])*(1-Math.exp(-$t/mw[E%mw.length]));let X=-R.period+hO(Y.offsets[E]+Y.shifts[E],R.period);at.style.transform=`translate3d(${X.toFixed(2)}px, 0, 0)`;let it=R.top+E*(R.tileHeight+jt.gap)+R.tileHeight/2-R.planeHeight/2,dt=X-R.planeWidth/2+R.tileWidth/2,xt=yt[E],$=Dt[E],G=lt[E];for(let et=0;et<xt.length;et++){let L=0;if(zt&&jt.spotlight>0){let U=Math.hypot(dt+et*R.step-Nt,it-se)/V;L=1-dO(.25,1,U)}$[et]+=(L-$[et])*Q,(Math.abs($[et]-G[et])>.004||L===0&&$[et]<.004&&G[et]!==0)&&(G[et]=$[et]<.004?0:$[et],xt[et].style.setProperty("--spot",G[et].toFixed(3)))}}),Ft&&(_t=requestAnimationFrame(gt))},Zt=new IntersectionObserver(I=>{Ft=I.some(jt=>jt.isIntersecting),Ft&&!_t&&(Ct=performance.now(),_t=requestAnimationFrame(gt))});return Zt.observe(J),_t=requestAnimationFrame(gt),()=>{Lt=!1,cancelAnimationFrame(_t),Zt.disconnect(),B?.removeEventListener("change",k)}},[R,Z]);let tt=R?Array.from({length:C.rows},(J,j)=>Array.from({length:R.perRow},(B,ot)=>Z.length?Z[(j*R.perRow+ot)%Z.length]:mO)):[],z=C.fade>0?`${vw("to right",C.fade*34)}, ${vw("to bottom",C.fade*44)}`:void 0;return(0,Pr.jsx)("div",{ref:b,className:`grid-motion${f?" grid-motion--gray":""}${d?` ${d}`:""}`,style:{"--gm-tile":g??S.tile,"--gm-text":M??S.text,"--gm-border":S.border,"--gm-radius":`${Math.max(0,a)}px`,"--gm-dim":C.dim,perspective:R&&C.tilt>0?`${R.perspective}px`:void 0,maskImage:z,WebkitMaskImage:z,maskComposite:z?"intersect":void 0,WebkitMaskComposite:z?"source-in":void 0,...x},children:R&&(0,Pr.jsx)("div",{ref:y,className:"grid-motion__plane",style:{width:R.planeWidth,height:R.planeHeight,transform:`translate(-50%, -50%) rotateX(${C.tilt}deg) rotateZ(${C.angle}deg)`,"--gm-gap":`${C.gap}px`,"--gm-tile-w":`${R.tileWidth}px`,"--gm-tile-h":`${R.tileHeight}px`,"--gm-font":`${ir(R.tileHeight*.12,12,32)}px`},children:tt.map((J,j)=>(0,Pr.jsx)("div",{className:"grid-motion__row",style:{top:R.top+j*(R.tileHeight+C.gap)},children:Array.from({length:R.copies*R.perRow},(B,ot)=>(0,Pr.jsx)(gO,{tile:J[ot%R.perRow]},ot))},j))})})},om=vO;var Yi=Ce(vi(),1);var ti=Ce(vi(),1);var ar=Ce(vi(),1);var Pn=Ce(an(),1),xw=6,xO=16,yO=e=>new Set(Array.isArray(e)?e:e>=0?[e]:[]);function oy({items:e=[],defaultOpen:t=0,active:n="",onSelect:i,onEscape:a,color:r="var(--ink, #f2f0ea)",accentColor:s="var(--cyan, #78cfc5)",lineColor:l="var(--line, #454549)",width:o=320,rowHeight:c=44,indent:u=40,trunk:p=14,radius:f=10,lineWidth:h=1.5,drawDuration:g=400,foldDuration:M=300,className:v=""}){let[d,x]=(0,ar.useState)(()=>yO(t)),b=(0,ar.useId)(),y=(0,ar.useRef)(null),w=(0,ar.useRef)([]),T=(0,ar.useRef)(null),m=e.findIndex(B=>B.children?.some(ot=>ot.value===n)),S=m>=0&&d.has(m);(0,ar.useLayoutEffect)(()=>{let B=()=>{let k=T.current,Y=w.current[m];k&&(S&&Y&&(k.style.top=`${Y.offsetTop+(Y.offsetHeight-xO)/2}px`),k.toggleAttribute("data-on",!!(S&&Y)))};B();let ot=new ResizeObserver(B);return y.current&&ot.observe(y.current),()=>ot.disconnect()},[m,S,e]);let C=B=>x(ot=>{let k=new Set(ot);return k.has(B)?k.delete(B):k.add(B),k}),D=B=>{if(B.key==="Escape"){B.preventDefault(),B.stopPropagation(),a?.();return}let ot=[...y.current.querySelectorAll("button")].filter(Dt=>Dt.tabIndex>=0),k=ot.indexOf(document.activeElement),Y;B.key==="ArrowDown"&&(Y=(k+1)%ot.length),B.key==="ArrowUp"&&(Y=(k-1+ot.length)%ot.length),B.key==="Home"&&(Y=0),B.key==="End"&&(Y=ot.length-1),Y!==void 0&&(B.preventDefault(),ot[Y]?.focus());let N=B.target.closest("[data-section]");if(!N)return;let yt=Number(N.dataset.section);B.key==="ArrowLeft"&&d.has(yt)&&(B.preventDefault(),C(yt),w.current[yt]?.focus()),B.key==="ArrowRight"&&e[yt].children&&(B.preventDefault(),d.has(yt)?N.querySelector(".branched-menu__item")?.focus():C(yt))},R=Math.min(f,c/2-2),Z=u-8,tt=B=>xw+B*c+c/2,z=B=>`M ${p} ${tt(B)-R} A ${R} ${R} 0 0 0 ${p+R} ${tt(B)} H ${Z}`,J=B=>`M ${p} 0 V ${tt(B)-R} A ${R} ${R} 0 0 0 ${p+R} ${tt(B)} H ${Z}`,j=B=>tt(B)-R+Math.PI*R/2+Z-p-R;return(0,Pn.jsxs)("nav",{ref:y,className:`branched-menu ${v}`,role:"menu","aria-label":"\u6309\u7167\u7247\u5206\u7C7B\u7B5B\u9009",onKeyDown:D,style:{"--bm-w":`${o}px`,"--bm-ink":r,"--bm-accent":s,"--bm-line":l,"--bm-row":`${c}px`,"--bm-indent":`${u}px`,"--bm-line-w":h,"--bm-draw":`${g}ms`,"--bm-fold":`${M}ms`},children:[(0,Pn.jsx)("span",{ref:T,className:"branched-menu__marker","aria-hidden":"true"}),e.map((B,ot)=>{let k=B.children,Y=!!(k&&d.has(ot)),N=k?xw*2+k.length*c:0;return(0,Pn.jsxs)("div",{role:"none","data-section":ot,className:"branched-menu__section","data-open":Y?"":void 0,children:[(0,Pn.jsxs)("button",{ref:yt=>{w.current[ot]=yt},type:"button",className:"branched-menu__head",role:k?"menuitem":"menuitemradio","aria-expanded":k?Y:void 0,"aria-controls":k?`${b}-${ot}`:void 0,"aria-checked":k?void 0:B.value===n,"data-active":!k&&B.value===n?"":void 0,onClick:()=>k?C(ot):i?.(B.value,B),children:[(0,Pn.jsx)("span",{children:B.label}),(0,Pn.jsx)("span",{"aria-hidden":"true",children:k?Y?"\u2212":"+":B.value===n?"\u2713":""})]}),k&&(0,Pn.jsx)("div",{id:`${b}-${ot}`,className:"branched-menu__body","aria-hidden":!Y,inert:!Y,children:(0,Pn.jsx)("div",{className:"branched-menu__fold",children:(0,Pn.jsxs)("div",{className:"branched-menu__tree",role:"group","aria-label":B.label,style:{height:N},children:[(0,Pn.jsxs)("svg",{className:"branched-menu__lines",width:u,height:N,"aria-hidden":"true",children:[(0,Pn.jsx)("path",{className:"branched-menu__base",d:`M ${p} 0 V ${tt(k.length-1)-R}`}),k.map((yt,Dt)=>(0,Pn.jsx)("path",{className:"branched-menu__base",d:z(Dt)},yt.value)),k.map((yt,Dt)=>(0,Pn.jsx)("path",{className:"branched-menu__reach",d:J(Dt),style:{strokeDasharray:j(Dt),strokeDashoffset:yt.value===n?0:j(Dt)}},yt.value))]}),k.map(yt=>(0,Pn.jsxs)("button",{type:"button",role:"menuitemradio","aria-checked":yt.value===n,className:"branched-menu__item","data-active":yt.value===n?"":void 0,tabIndex:Y?0:-1,onClick:()=>i?.(yt.value,yt),children:[(0,Pn.jsx)("span",{className:"branched-menu__label",children:yt.label}),(0,Pn.jsx)("span",{className:"branched-menu__count",children:yt.count})]},yt.value))]})})})]},B.value??B.label)})]})}var Be=Ce(an(),1),yw={dark:{"--chroma-frame":"rgba(17, 24, 28, 0.66)","--chroma-frame-edge":"rgba(255, 255, 255, 0.08)","--chroma-frame-highlight":"rgba(255, 255, 255, 0.07)","--chroma-frame-shadow":"0 22px 44px -20px rgba(0, 0, 0, 0.8), 0 6px 16px -8px rgba(0, 0, 0, 0.5)","--chroma-tile":"linear-gradient(180deg, #1d292d 0%, #131b20 100%)","--chroma-tile-edge":"rgba(255, 255, 255, 0.07)","--chroma-tile-highlight":"rgba(255, 255, 255, 0.12)","--chroma-tile-shadow":"0 4px 10px -4px rgba(0, 0, 0, 0.7)","--chroma-media-edge":"rgba(255, 255, 255, 0.06)","--chroma-well":"rgba(255, 255, 255, 0.08)","--chroma-ink":"#f4f4f5","--chroma-muted":"rgba(244, 244, 245, 0.55)","--chroma-hover":"brightness(1.12)","--chroma-press":"brightness(0.85)"},light:{"--chroma-frame":"rgba(240, 240, 243, 0.8)","--chroma-frame-edge":"rgba(24, 24, 27, 0.07)","--chroma-frame-highlight":"rgba(255, 255, 255, 0.95)","--chroma-frame-shadow":"0 22px 44px -22px rgba(24, 24, 27, 0.3), 0 6px 16px -10px rgba(24, 24, 27, 0.16)","--chroma-tile":"linear-gradient(180deg, #ffffff 0%, #f6f6f8 100%)","--chroma-tile-edge":"rgba(24, 24, 27, 0.08)","--chroma-tile-highlight":"rgba(255, 255, 255, 1)","--chroma-tile-shadow":"0 4px 10px -5px rgba(24, 24, 27, 0.25)","--chroma-media-edge":"rgba(24, 24, 27, 0.06)","--chroma-well":"rgba(24, 24, 27, 0.05)","--chroma-ink":"#27272a","--chroma-muted":"rgba(39, 39, 42, 0.55)","--chroma-hover":"brightness(0.97)","--chroma-press":"brightness(0.92)"}},_O=[],Eo=(e,t,n)=>Math.min(n,Math.max(t,e)),bO=e=>{let t=Eo(1-e,0,.95),n=[];for(let i=0;i<=12;i++){let a=i/12,r=Eo((a-t)/Math.max(1e-4,1-t),0,1),s=1-r*r*r*(r*(r*6-15)+10);n.push(`rgba(0, 0, 0, ${s.toFixed(3)}) ${(a*100).toFixed(1)}%`)}return n.join(", ")},SO=({items:e,columns:t=3,minCardWidth:n=180,gap:i=12,radius:a=260,softness:r=.6,damping:s=.45,fadeOut:l=.6,grayscale:o=1,dim:c=.12,glow:u=.5,borderGlow:p=1,reveal:f="spotlight",aspectRatio:h="3 / 2",cardRadius:g=22,showInfo:M=!0,frame:v=!1,theme:d="dark",className:x="",onOpen:b=y=>window.openLightbox(y.imgId||y.id,y.caption||y.title)})=>{let y=(0,ti.useRef)(null),w=(0,ti.useRef)(null),T=(0,ti.useRef)(null),m=e?.length?e:_O;w.current={damping:s,fadeOut:l,spotlight:f!=="card"},(0,ti.useEffect)(()=>{let C=y.current;if(!C)return;let D=window.matchMedia?.("(prefers-reduced-motion: reduce)").matches??!1,R={x:0,y:0,tx:0,ty:0,power:0,target:0,primed:!1},Z=0,tt=0,z=()=>{let Y=C.getBoundingClientRect();C.querySelectorAll("[data-chroma-area]").forEach(N=>{let yt=N.getBoundingClientRect();N.style.setProperty("--chroma-ox",`${yt.left-Y.left}px`),N.style.setProperty("--chroma-oy",`${yt.top-Y.top}px`)})};T.current=z;let J=Y=>{Z=0;let N=w.current;if(!N)return;let yt=tt?Math.min(.05,(Y-tt)/1e3):1/60;tt=Y;let Dt=D?1:1-Math.exp(-yt/Math.max(.01,N.damping*.32));R.x+=(R.tx-R.x)*Dt,R.y+=(R.ty-R.y)*Dt;let lt=R.target>R.power?.1:Math.max(.02,N.fadeOut*.35);R.power+=(R.target-R.power)*(D?1:1-Math.exp(-yt/lt)),C.style.setProperty("--chroma-x",`${R.x.toFixed(2)}px`),C.style.setProperty("--chroma-y",`${R.y.toFixed(2)}px`),C.style.setProperty("--chroma-power",R.power.toFixed(4)),Math.abs(R.tx-R.x)<.1&&Math.abs(R.ty-R.y)<.1&&Math.abs(R.target-R.power)<.002?(R.power=R.target,C.style.setProperty("--chroma-power",R.power.toFixed(4)),tt=0):Z=requestAnimationFrame(J)},j=()=>{Z||(Z=requestAnimationFrame(J))},B=Y=>{if(!w.current?.spotlight||Y.pointerType==="touch")return;let N=C.getBoundingClientRect();R.tx=Y.clientX-N.left,R.ty=Y.clientY-N.top,(!R.primed||R.power<.02)&&(R.x=R.tx,R.y=R.ty,R.primed=!0),R.target=1,j()},ot=()=>{R.target=0,j()},k=new ResizeObserver(z);return k.observe(C),C.addEventListener("pointermove",B),C.addEventListener("pointerdown",B),C.addEventListener("pointerleave",ot),C.addEventListener("pointercancel",ot),z(),()=>{cancelAnimationFrame(Z),k.disconnect(),C.removeEventListener("pointermove",B),C.removeEventListener("pointerdown",B),C.removeEventListener("pointerleave",ot),C.removeEventListener("pointercancel",ot),T.current=null}},[]),(0,ti.useLayoutEffect)(()=>{T.current?.()});let S={...yw[d]??yw.dark,"--chroma-cols":Math.max(1,Math.round(t)),"--chroma-min":`${Math.max(80,n)}px`,"--chroma-gap":`${Math.max(0,i)}px`,"--chroma-r":`${Math.max(20,a)}px`,"--chroma-stops":bO(Eo(r,0,1)),"--chroma-gray":Eo(o,0,1),"--chroma-dim":Eo(c,0,.9),"--chroma-glow":Eo(u,0,1),"--chroma-border":Eo(p,0,1),"--chroma-fade":`${Math.max(0,l)}s`,"--chroma-ratio":h,"--chroma-radius":`${Math.max(0,g)}px`};return(0,Be.jsxs)("div",{ref:y,className:`chroma-grid${v?" has-frame":""}${x?` ${x}`:""}`,"data-reveal":f==="card"?"card":"spotlight",style:S,children:[(0,Be.jsx)("div",{className:"chroma-grid-inner",children:m.map((C,D)=>{let R=C.accent??C.borderColor??"#ffffff",Z=C.imgId||C.id||`${C.title}-${D}`,tt={"--chroma-accent":R},z=(0,Be.jsxs)(Be.Fragment,{children:[(0,Be.jsx)("span",{className:"chroma-wash","aria-hidden":"true"}),(0,Be.jsxs)("div",{className:"chroma-media","data-chroma-area":"",children:[(0,Be.jsx)("img",{className:"chroma-mono",src:C.image||C.src,alt:C.alt??C.title??"",loading:"lazy"}),(0,Be.jsx)("img",{className:"chroma-color",src:C.image||C.src,alt:"","aria-hidden":"true",loading:"lazy"}),(0,Be.jsx)("span",{className:"chroma-media-rim","aria-hidden":"true"})]}),M&&(C.title||C.subtitle)&&(0,Be.jsxs)("div",{className:"chroma-info",children:[C.title&&(0,Be.jsxs)("span",{className:"chroma-title",children:[C.no&&(0,Be.jsxs)("b",{className:"chroma-number",children:[C.no," \xB7 "]}),C.title]}),C.subtitle&&(0,Be.jsx)("span",{className:"chroma-subtitle",children:C.subtitle})]}),(0,Be.jsx)("span",{className:"chroma-card-rim","aria-hidden":"true"}),(0,Be.jsx)("span",{className:"chroma-card-glow","aria-hidden":"true"})]});return C.url?(0,Be.jsx)("a",{className:"chroma-card","data-chroma-area":"",style:tt,href:C.url,target:"_blank",rel:"noopener noreferrer",children:z},Z):(0,Be.jsx)("button",{type:"button",className:"chroma-card","data-chroma-area":"","data-img-id":C.imgId||C.id,style:tt,title:C.caption||C.title,"aria-label":`\u67E5\u770B\u5B8C\u6574\u539F\u56FE\uFF1A${C.caption||C.title}`,"aria-haspopup":"dialog",onClick:()=>b(C),children:z},Z)})}),v&&(0,Be.jsx)("span",{className:"chroma-frame-rim","aria-hidden":"true"})]})},MO=({items:e=[],onOpen:t,...n})=>{let[i,a]=(0,ti.useState)("all"),[r,s]=(0,ti.useState)(!1),l=(0,ti.useRef)(null),o=(0,ti.useRef)(null),c=(0,ti.useId)(),u=[...new Map(e.map(g=>[g.category||"other",g.categoryLabel||g.category||"\u5176\u4ED6"])).entries()],p=i==="all"?e:e.filter(g=>(g.category||"other")===i),f=i==="all"?"\u5B8C\u6574\u76F8\u518C":u.find(([g])=>g===i)?.[1],h=()=>{s(!1),l.current?.focus()};return(0,ti.useEffect)(()=>{r&&o.current?.querySelector("button")?.focus()},[r]),(0,Be.jsxs)("section",{className:"chroma-gallery","aria-label":"\u5168\u90E8\u5C65\u5386\u7167\u7247",children:[(0,Be.jsxs)("div",{className:"chroma-gallery-toolbar",children:[(0,Be.jsxs)("p",{className:"chroma-gallery-count",role:"status",children:[f," \xB7 ",p.length," / ",e.length," \u5F20"]}),(0,Be.jsxs)("button",{ref:l,className:"chroma-gallery-filter-toggle",type:"button","aria-haspopup":"menu","aria-expanded":r,"aria-controls":c,onClick:()=>s(g=>!g),onKeyDown:g=>{g.key==="ArrowDown"&&(g.preventDefault(),s(!0)),g.key==="Escape"&&r&&(g.preventDefault(),g.stopPropagation(),h())},children:["\u5206\u7C7B\u7B5B\u9009",(0,Be.jsx)("span",{"aria-hidden":"true",children:r?"\u2212":"+"})]})]}),r&&(0,Be.jsxs)("div",{ref:o,id:c,className:"chroma-gallery-menu",children:[(0,Be.jsx)(oy,{active:i,defaultOpen:1,items:[{value:"all",label:`\u5168\u90E8\u7167\u7247 \xB7 ${e.length}`},{label:"\u5C65\u5386\u5206\u7C7B",children:u.map(([g,M])=>({value:g,label:M,count:e.filter(v=>(v.category||"other")===g).length}))}],onSelect:g=>a(g),onEscape:h}),(0,Be.jsx)("button",{type:"button",className:"chroma-gallery-menu-close",onClick:h,children:"\u6536\u8D77\u5206\u7C7B"})]}),(0,Be.jsx)("p",{className:"chroma-gallery-hint",children:"\u70B9\u51FB\u7167\u7247\u67E5\u770B\u5B8C\u6574\u539F\u56FE \xB7 \u805A\u5149\u6D4F\u89C8\u4FDD\u7559\u539F\u5206\u7C7B\u8272"}),(0,Be.jsx)(SO,{columns:6,minCardWidth:110,gap:10,cardRadius:8,frame:!0,...n,items:p,onOpen:t})]})},_w=MO;var ei=Ce(an(),1),EO=({item:e,drifting:t=!1})=>(0,ei.jsxs)("button",{type:"button",className:"drift-gallery__photo",tabIndex:t?-1:0,"aria-label":`\u67E5\u770B\u5927\u56FE\uFF1A${e.caption||e.alt||e.imgId}`,onClick:()=>window.openLightbox(e.imgId,e.caption||e.alt||""),children:[(0,ei.jsx)("img",{src:e.src,alt:e.alt||e.caption||"",loading:"lazy",decoding:"async",draggable:!1}),!t&&e.caption&&(0,ei.jsx)("span",{className:"drift-gallery__caption",children:e.caption})]}),TO=({items:e=[],className:t="",...n})=>{let[i,a]=(0,Yi.useState)(!1),[r,s]=(0,Yi.useState)(()=>window.LZY_CHROMA_ITEMS||e),l=(0,Yi.useRef)(null),o=(0,Yi.useId)();(0,Yi.useEffect)(()=>{let u=p=>s(p.detail?.items||window.LZY_CHROMA_ITEMS||e);return s(window.LZY_CHROMA_ITEMS||e),window.addEventListener("lzy:chroma-ready",u),()=>window.removeEventListener("lzy:chroma-ready",u)},[e]);let c=(0,Yi.useMemo)(()=>e.map((u,p)=>!(0,Yi.isValidElement)(u)&&u&&typeof u=="object"&&typeof u.src=="string"?(0,ei.jsx)(EO,{item:u,drifting:!0},u.imgId??p):u),[e]);return(0,ei.jsxs)("div",{className:`drift-gallery${t?` ${t}`:""}`,children:[(0,ei.jsx)("div",{className:"drift-gallery__wall",role:"group","aria-label":"\u6F02\u79FB\u7167\u7247\u5899\uFF0C\u5B8C\u6574\u952E\u76D8\u6D4F\u89C8\u8BF7\u4F7F\u7528\u4E0B\u65B9\u76F8\u518C",children:(0,ei.jsx)(om,{rows:4,angle:-7,tilt:0,dim:0,grayscale:!1,spotlight:0,fade:.12,tileColor:"transparent",...n,items:c})}),(0,ei.jsxs)("section",{className:"drift-gallery__browse","aria-label":"\u5B8C\u6574\u76F8\u518C",onKeyDown:u=>{u.key==="Escape"&&i&&(u.preventDefault(),u.stopPropagation(),a(!1),l.current?.focus())},children:[(0,ei.jsxs)("button",{ref:l,className:"drift-gallery__browse-toggle",type:"button","aria-expanded":i,"aria-controls":o,onClick:()=>a(u=>!u),children:[(0,ei.jsxs)("span",{children:[i?"\u6536\u8D77\u5168\u90E8\u7167\u7247":"\u67E5\u770B\u5168\u90E8\u7167\u7247",(0,ei.jsxs)("small",{children:[r.length," \u5F20\u5C65\u5386\u5F71\u50CF"]})]}),(0,ei.jsx)("span",{"aria-hidden":"true",children:i?"\u2212":"+"})]}),(0,ei.jsx)("div",{id:o,hidden:!i,children:i&&(0,ei.jsx)(_w,{items:r})})]})]})},bw=TO;var Ps=Ce(vi(),1);var ua=Ce(vi(),1);var Ji=Ce(an(),1),mi=1100,Aw=380,wO=10,Zi=mi/(2*Aw),AO=5,gi=4,Sw=.55,ly=mi*.75,cy=.42,cm={small:{h:36,px:16,fs:13,k:.82},medium:{h:44,px:22,fs:14,k:1},large:{h:52,px:26,fs:16,k:1.18},"extra-large":{h:60,px:30,fs:18,k:1.36}},Ue=(e,t,n)=>Math.min(n,Math.max(t,e)),zr=(e,t)=>Number.isFinite(Number(e))&&e!==null&&e!==""?Number(e):t,To=e=>{let t=Ue(e,0,1);return t*t*(3-2*t)},Mw=e=>{let t=Ue(e,0,1);return t*t*t*(10+t*(6*t-15))},Ew=e=>{let t=Ue(e,0,1);return 30*t*t*(1-t)*(1-t)},RO=e=>{let t=Ue(e,0,1);return 60*t*(1-t)*(1-2*t)},lm=(e,t)=>Math.sin(e*1.31+t)*.5+Math.sin(e*2.73+t*1.7)*.3+Math.sin(e*5.19+t*2.3)*.2,CO=(e,t)=>Math.cos(e*1.31+t)*.655+Math.cos(e*2.73+t*1.7)*.819+Math.cos(e*5.19+t*2.3)*1.038,Tw=e=>{let t=String(e||"").replace("#",""),n=t.length===3?t.replace(/(.)/g,"$1$1"):t.padEnd(6,"0").slice(0,6),i=parseInt(n,16);return Number.isFinite(i)?[(i>>16&255)/255,(i>>8&255)/255,(i&255)/255]:[1,1,1]},DO=`#version 300 es
out vec2 vUv;
void main() {
  vec2 p = vec2(float((gl_VertexID << 1) & 2), float(gl_VertexID & 2));
  vUv = p;
  gl_Position = vec4(p * 2.0 - 1.0, 0.0, 1.0);
}`,Aa=`#version 300 es
precision highp float;
precision highp sampler2D;
in vec2 vUv;
out vec4 outColor;
`,uy=`
uniform vec4 uJetA[${gi}];
uniform vec4 uJetB[${gi}];
uniform float uJetBend[${gi}];
float jetWeight(vec2 p, vec4 a, vec4 b, out float along) {
  vec2 rel = p - a.xy;
  along = dot(rel, a.zw);
  vec2 off = rel - a.zw * clamp(along, 0.0, b.z);
  return exp(-dot(off, off) / (b.y * b.y)) * smoothstep(-b.y, 0.0, along);
}
`,fy=`
float hash(vec2 p) {
  p = fract(p * vec2(123.34, 456.21));
  p += dot(p, p + 45.32);
  return fract(p.x * p.y);
}
float noise(vec2 p) {
  vec2 i = floor(p);
  vec2 f = fract(p);
  f = f * f * (3.0 - 2.0 * f);
  return mix(mix(hash(i), hash(i + vec2(1.0, 0.0)), f.x), mix(hash(i + vec2(0.0, 1.0)), hash(i + vec2(1.0, 1.0)), f.x), f.y);
}
`,NO=`${Aa}
uniform sampler2D uVelocity;
uniform sampler2D uSource;
uniform vec2 uWorld;
uniform float uDt;
uniform float uKeep;
void main() {
  vec2 v = textureLod(uVelocity, vUv, 0.0).xy;
  if (!(abs(v.x) < 4000.0 && abs(v.y) < 4000.0)) v = vec2(0.0);
  vec4 c = textureLod(uSource, vUv - uDt * v / uWorld, 0.0) * uKeep;
  outColor = all(lessThan(abs(c), vec4(1e4))) ? c : vec4(0.0);
}`,LO=`${Aa}
uniform sampler2D uVelocity;
uniform sampler2D uDye;
uniform vec2 uWorld;
uniform float uDt;
uniform float uBuoyancy;
uniform float uLift;
uniform float uDamping;
uniform float uSpread;
uniform float uSplash;
uniform float uFriction;
uniform float uWind;
uniform vec3 uKick;
uniform vec4 uCraft;
uniform vec4 uCraftMotion;
uniform vec2 uTurb;
uniform float uTime;
uniform float uObstacle;
${uy}
${fy}
vec2 curlNoise(vec2 p) {
  float e = 0.35;
  float a = noise(p + vec2(0.0, e));
  float b = noise(p - vec2(0.0, e));
  float c = noise(p + vec2(e, 0.0));
  float d = noise(p - vec2(e, 0.0));
  return vec2(a - b, d - c) / (2.0 * e);
}
void main() {
  vec2 p = vUv * uWorld;
  vec2 v = textureLod(uVelocity, vUv, 0.0).xy;
  vec2 d = textureLod(uDye, vUv, 1.0).xy;
  float smokeHere = smoothstep(0.02, 0.4, d.x + d.y);
  vec2 tq = p / uTurb.y;
  vec2 turb = curlNoise(tq + vec2(uTime * 0.21, -uTime * 0.37)) + 0.5 * curlNoise(tq * 2.3 + vec2(-uTime * 0.53, uTime * 0.29) + 7.0);
  v += turb * uTurb.x * smokeHere * uDt;
  v.y += (uBuoyancy * d.y + uLift * d.x) * uDt;
  v /= 1.0 + uDamping * uDt;
  v.x /= 1.0 + uFriction * exp(-p.y / 18.0) * uDt;
  v.x += (uWind - v.x) * (1.0 - exp(-0.35 * uDt)) * smoothstep(0.0, 60.0, p.y);
  for (int i = 0; i < ${gi}; i++) {
    vec4 b = uJetB[i];
    if (b.w <= 0.0) continue;
    vec4 a = uJetA[i];
    vec2 rel = p - a.xy;
    float along = dot(rel, a.zw);
    float across = dot(rel, vec2(-a.w, a.z));
    float reach = a.w < -0.2 ? a.y / -a.w : max(b.z, 1.0);
    float bn = clamp(along / max(reach, 1.0), 0.0, 1.0);
    across -= uJetBend[i] * bn * bn;
    vec2 dir = normalize(a.zw + vec2(-a.w, a.z) * (2.0 * uJetBend[i] * bn / max(reach, 1.0)));
    float sN = clamp(along / max(b.z, 1.0), 0.0, 1.0);
    float R = b.y + uSpread * clamp(along, 0.0, b.z);
    float wr = exp(-across * across / (R * R));
    float wa = smoothstep(-b.y, 0.0, along) * (1.0 - smoothstep(0.55, 1.0, sN));
    float rate = mix(46.0, 7.0, sN);
    float w = (1.0 - exp(-uDt * rate)) * wr * wa * clamp(b.w * 3.0, 0.0, 1.0);
    float U = b.x * sqrt(b.y / R);
    v = mix(v, dir * U, w);
  }
  for (int i = 0; i < ${gi}; i++) {
    vec4 b = uJetB[i];
    if (b.w <= 0.0) continue;
    vec4 a = uJetA[i];
    if (a.w > -0.2) continue;
    float reach = a.y / -a.w;
    float gx = a.x + a.z * reach - a.w * uJetBend[i];
    float near = exp(-reach / uKick.x);
    float sx = uKick.y + reach * 0.25;
    float kx = (p.x - gx) / (sx * 1.6);
    float ky = p.y / (uKick.z * 1.5);
    float k = exp(-kx * kx - ky * ky);
    float side = clamp((p.x - gx) / sx, -1.0, 1.0);
    v += uDt * uSplash * b.w * near * k * vec2(side * 0.7, 0.9);
  }
  vec2 q = p - uCraft.xy;
  float c = cos(uCraftMotion.z);
  float s = sin(uCraftMotion.z);
  vec2 lq = vec2(c * q.x + s * q.y, -s * q.x + c * q.y);
  vec2 e = abs(lq) - uCraft.zw + uCraft.w;
  float sd = length(max(e, 0.0)) + min(max(e.x, e.y), 0.0) - uCraft.w;
  float inside = smoothstep(2.0, -2.0, sd) * uObstacle;
  vec2 cv = uCraftMotion.xy + uCraftMotion.w * vec2(-q.y, q.x);
  v = mix(v, cv, inside);
  float speed = length(v);
  if (!(speed < 1e5)) v = vec2(0.0);
  else if (speed > 2600.0) v *= 2600.0 / speed;
  outColor = vec4(v, 0.0, 1.0);
}`,UO=`${Aa}
uniform sampler2D uVelocity;
uniform vec2 uTexel;
void main() {
  float L = textureLod(uVelocity, vUv - vec2(uTexel.x, 0.0), 0.0).y;
  float R = textureLod(uVelocity, vUv + vec2(uTexel.x, 0.0), 0.0).y;
  float B = textureLod(uVelocity, vUv - vec2(0.0, uTexel.y), 0.0).x;
  float T = textureLod(uVelocity, vUv + vec2(0.0, uTexel.y), 0.0).x;
  outColor = vec4(0.5 * (R - L - T + B), 0.0, 0.0, 1.0);
}`,IO=`${Aa}
uniform sampler2D uVelocity;
uniform sampler2D uCurl;
uniform vec2 uTexel;
uniform float uStrength;
uniform float uDt;
void main() {
  float L = textureLod(uCurl, vUv - vec2(uTexel.x, 0.0), 0.0).x;
  float R = textureLod(uCurl, vUv + vec2(uTexel.x, 0.0), 0.0).x;
  float B = textureLod(uCurl, vUv - vec2(0.0, uTexel.y), 0.0).x;
  float T = textureLod(uCurl, vUv + vec2(0.0, uTexel.y), 0.0).x;
  float C = textureLod(uCurl, vUv, 0.0).x;
  vec2 f = 0.5 * vec2(abs(T) - abs(B), abs(R) - abs(L));
  f /= length(f) + 1e-4;
  f *= uStrength * C;
  f.y *= -1.0;
  vec2 v = textureLod(uVelocity, vUv, 0.0).xy + f * uDt;
  if (!(abs(v.x) < 4000.0 && abs(v.y) < 4000.0)) v = vec2(0.0);
  outColor = vec4(v, 0.0, 1.0);
}`,OO=`${Aa}
uniform sampler2D uVelocity;
uniform vec2 uTexel;
void main() {
  vec2 C = textureLod(uVelocity, vUv, 0.0).xy;
  float L = textureLod(uVelocity, vUv - vec2(uTexel.x, 0.0), 0.0).x;
  float R = textureLod(uVelocity, vUv + vec2(uTexel.x, 0.0), 0.0).x;
  float B = textureLod(uVelocity, vUv - vec2(0.0, uTexel.y), 0.0).y;
  float T = textureLod(uVelocity, vUv + vec2(0.0, uTexel.y), 0.0).y;
  if (vUv.y - uTexel.y < 0.0) B = -C.y;
  outColor = vec4(0.5 * (R - L + T - B), 0.0, 0.0, 1.0);
}`,Rw=`
float pressureAt(sampler2D tex, vec2 uv, vec2 texel, float c, int side) {
  if (side == 0 && uv.x - texel.x < 0.0) return 0.0;
  if (side == 1 && uv.x + texel.x > 1.0) return 0.0;
  if (side == 2 && uv.y - texel.y < 0.0) return c;
  if (side == 3 && uv.y + texel.y > 1.0) return 0.0;
  vec2 o = side == 0 ? vec2(-texel.x, 0.0) : side == 1 ? vec2(texel.x, 0.0) : side == 2 ? vec2(0.0, -texel.y) : vec2(0.0, texel.y);
  return textureLod(tex, uv + o, 0.0).x;
}
`,PO=`${Aa}
uniform sampler2D uPressure;
uniform sampler2D uDivergence;
uniform vec2 uTexel;
${Rw}
void main() {
  float C = textureLod(uPressure, vUv, 0.0).x;
  float L = pressureAt(uPressure, vUv, uTexel, C, 0);
  float R = pressureAt(uPressure, vUv, uTexel, C, 1);
  float B = pressureAt(uPressure, vUv, uTexel, C, 2);
  float T = pressureAt(uPressure, vUv, uTexel, C, 3);
  float div = textureLod(uDivergence, vUv, 0.0).x;
  float pr = (L + R + B + T - div) * 0.25;
  outColor = vec4(abs(pr) < 1e6 ? pr : 0.0, 0.0, 0.0, 1.0);
}`,zO=`${Aa}
uniform sampler2D uPressure;
uniform sampler2D uVelocity;
uniform vec2 uTexel;
${Rw}
void main() {
  float C = textureLod(uPressure, vUv, 0.0).x;
  float L = pressureAt(uPressure, vUv, uTexel, C, 0);
  float R = pressureAt(uPressure, vUv, uTexel, C, 1);
  float B = pressureAt(uPressure, vUv, uTexel, C, 2);
  float T = pressureAt(uPressure, vUv, uTexel, C, 3);
  vec2 v = textureLod(uVelocity, vUv, 0.0).xy - 0.5 * vec2(R - L, T - B);
  if (vUv.y - uTexel.y < 0.0) v.y = max(v.y, 0.0);
  if (!(abs(v.x) < 4000.0 && abs(v.y) < 4000.0)) v = vec2(0.0);
  outColor = vec4(v, 0.0, 1.0);
}`,FO=`${Aa}
uniform sampler2D uSource;
uniform vec2 uStep;
void main() {
  vec2 c = textureLod(uSource, vUv, 0.0).xy * 0.2270270;
  c += textureLod(uSource, vUv + uStep * 1.3846154, 0.0).xy * 0.3162162;
  c += textureLod(uSource, vUv - uStep * 1.3846154, 0.0).xy * 0.3162162;
  c += textureLod(uSource, vUv + uStep * 3.2307692, 0.0).xy * 0.0702703;
  c += textureLod(uSource, vUv - uStep * 3.2307692, 0.0).xy * 0.0702703;
  outColor = vec4(c, 0.0, 1.0);
}`,BO=`${Aa}
uniform sampler2D uSource;
uniform float uScale;
void main() {
  outColor = textureLod(uSource, vUv, 0.0) * uScale;
}`,HO=`${Aa}
uniform sampler2D uVelocity;
uniform sampler2D uSource;
uniform vec2 uWorld;
uniform float uDt;
uniform vec2 uKeep;
uniform vec4 uRate;
uniform vec4 uCol;
uniform vec3 uKick;
uniform float uDisperse;
uniform float uDispV;
uniform vec4 uCraft;
uniform vec4 uCraftMotion;
uniform vec2 uGap;
uniform float uJetX[${gi}];
uniform float uJetN;
uniform float uFloor;
uniform float uTime;
${uy}
${fy}
void main() {
  vec2 v = textureLod(uVelocity, vUv, 0.0).xy;
  vec2 val = textureLod(uSource, vUv - uDt * v / uWorld, 0.0).xy * uKeep;
  val.x *= exp(-uDisperse * max(length(v) - uDispV, 0.0) * 0.01 * uDt);
  {
    vec2 q = vUv * uWorld - uCraft.xy;
    float c = cos(uCraftMotion.z);
    float sn = sin(uCraftMotion.z);
    vec2 lq = vec2(c * q.x + sn * q.y, -sn * q.x + c * q.y);
    float belly = uCraft.y - uCraft.w - 7.0;
    float depth = 0.68 * belly * smoothstep(40.0, 110.0, belly);
    float below = -lq.y - uCraft.w;
    float wy = smoothstep(-4.0, 6.0, below) * (1.0 - smoothstep(depth * 0.7, depth, below));
    float nearest = 1e4;
    float outer = 0.0;
    for (int k = 0; k < ${gi}; k++) {
      if (float(k) >= uJetN) break;
      nearest = min(nearest, abs(lq.x - uJetX[k]));
      outer = max(outer, abs(uJetX[k]));
    }
    float wx = uGap.x > 1.0 ? smoothstep(uGap.x * 0.22, uGap.x * 0.4, nearest) * (1.0 - smoothstep(outer - uGap.x * 0.1, outer, abs(lq.x))) : 0.0;
    val.x *= exp(-uGap.y * wx * wy * uDt);
  }
  val.x = max(val.x - uFloor * uDt, 0.0);
  vec2 p = vUv * uWorld;
  for (int i = 0; i < ${gi}; i++) {
    vec4 jb = uJetB[i];
    if (jb.w <= 0.0) continue;
    vec4 ja = uJetA[i];
    vec2 rel = p - ja.xy;
    float along = dot(rel, ja.zw);
    float across = dot(rel, vec2(-ja.w, ja.z));
    vec2 off = rel - ja.zw * clamp(along, 0.0, 6.0);
    float wn = exp(-dot(off, off) / (jb.y * jb.y)) * smoothstep(-jb.y, 0.0, along);
    float pulse = 0.6 + 0.8 * noise(vec2(uTime * 6.0 + float(i) * 13.1, along * 0.06 + float(i)));
    val.x += uRate.x * jb.w * wn * pulse * uDt;
    val.y += uRate.y * jb.w * wn * uDt;
    float reach = ja.w < -0.2 ? ja.y / -ja.w : 1e4;
    float sN = clamp(along / max(reach, 1.0), 0.0, 1.0);
    across -= uJetBend[i] * sN * sN;
    float R = uCol.y + uCol.x * clamp(along, 0.0, reach);
    float wc = exp(-across * across / (R * R)) * smoothstep(0.45, 0.8, sN) * (1.0 - step(reach + 2.0, along));
    float grain = 0.45 + 1.1 * noise(vec2(across * 0.12 + float(i) * 3.0, along * 0.05 - uTime * 9.0));
    val.x += uRate.w * jb.w * wc * grain * uDt;
    val.y += uRate.y * 0.25 * jb.w * wc * uDt;
    if (reach < 1e3) {
      float gx = ja.x + ja.z * reach - ja.w * uJetBend[i];
      float near = exp(-reach / uKick.x);
      float spread = uKick.y + reach * 0.25;
      float kx = (p.x - gx) / spread;
      float ky = p.y / uKick.z;
      float k = exp(-kx * kx - ky * ky);
      float g2 = 0.5 + noise(vec2(p.x * 0.08, uTime * 4.0 + float(i) * 9.0));
      val.x += uRate.z * jb.w * near * k * g2 * uDt;
      val.y += uRate.y * 0.4 * jb.w * near * k * uDt;
    }
  }
  if (!(val.x < 1e3 && val.y < 1e3 && val.x >= 0.0 && val.y >= 0.0)) val = vec2(0.0);
  outColor = vec4(val, 0.0, 1.0);
}`,GO=`${Aa}
uniform sampler2D uDye;
uniform vec2 uWorld;
uniform vec2 uDyeSize;
uniform float uTime;
uniform float uLightTheme;
uniform vec3 uSmoke;
uniform vec3 uShade;
uniform vec3 uThrust;
uniform vec4 uLook;
uniform vec4 uLook2;
uniform vec4 uLook3;
uniform vec4 uCol;
uniform float uGamma;
uniform float uTone;
uniform vec3 uLight2;
uniform float uThreshold;
uniform float uScale;
uniform vec4 uCraft;
uniform vec4 uCraftMotion;
${uy}
${fy}
float dens(vec2 p, float lod) {
  return textureLod(uDye, p / uWorld, lod).x;
}
float hash1(float n) {
  return fract(sin(n * 127.1) * 43758.5453);
}
float fbm2(vec2 p) {
  return noise(p) * 0.65 + noise(p * 2.13 + 17.0) * 0.35;
}
float flowNoise(float q, float xn, float t, float id, float rate) {
  float c = t / 0.7;
  float f1 = fract(c);
  float f2 = fract(c + 0.5);
  float k1 = floor(c);
  float k2 = floor(c + 0.5);
  float n1 = fbm2(vec2(q - f1 * 0.7 * rate + hash1(k1 + id * 7.0) * 41.0, xn * 1.15 + id * 3.7));
  float n2 = fbm2(vec2(q - f2 * 0.7 * rate + hash1(k2 + id * 7.0 + 0.5) * 41.0, xn * 1.15 + id * 3.7 + 11.0));
  float w1 = 1.0 - abs(2.0 * f1 - 1.0);
  float w2 = 1.0 - w1;
  return 0.5 + (n1 * w1 + n2 * w2 - 0.5) / sqrt(w1 * w1 + w2 * w2);
}
float column(vec2 p, vec4 a, float str, float id, float t, float bend, out float xn, out float s) {
  vec2 rel = p - a.xy;
  s = dot(rel, a.zw);
  float x = dot(rel, vec2(-a.w, a.z));
  float S = a.w < -0.2 ? a.y / -a.w : 1e4;
  float bn = clamp(s / max(S, 1.0), 0.0, 1.0);
  x -= bend * bn * bn;
  xn = 0.0;
  if (s < -4.0 || s > S + 6.0) return 0.0;
  float sc = clamp(s, 0.0, S);
  float R = uCol.y + uCol.x * sc;
  float flare = smoothstep(S - 32.0 * uScale, S + 2.0, sc);
  R *= 1.0 + 1.3 * flare * flare;
  xn = x / R;
  if (abs(xn) > 3.2) return 0.0;
  float q = log(1.0 + 0.22 * sc / (9.0 * uScale)) / 0.22;
  float lam = 9.0 * uScale + 0.22 * sc;
  float U = uCol.w * sqrt(str) * sqrt(uCol.y / R);
  float n = flowNoise(q, xn, t, id, U / lam);
  float amp = 0.12 + 0.5 * smoothstep(4.0, 70.0, sc);
  float u = abs(xn) * (1.0 - amp * (n - 0.5) * 1.8);
  float prof = exp(-u * u * 1.7);
  float dil = pow(uCol.y / R, 0.5);
  float onset = smoothstep(2.0 * uScale, 16.0 * uScale, s);
  float tail = 1.0 - smoothstep(S - 2.0, S + 6.0, s);
  return uCol.z * str * prof * dil * onset * tail * (0.7 + 0.6 * n);
}
float shape(vec2 p, float lod) {
  return log(1.0 + 3.0 * dens(p, lod));
}
void main() {
  vec2 p = vUv * uWorld;
  float texel = uWorld.x / uDyeSize.x;
  float D = textureLod(uDye, vUv, uLook.w).x;
  float heat = textureLod(uDye, vUv, 0.5).y;

  float e = uLook3.x;
  float lodN = max(log2(e / texel), 0.0) + uLook3.y;
  vec2 g = vec2(shape(p + vec2(e, 0.0), lodN) - shape(p - vec2(e, 0.0), lodN), shape(p + vec2(0.0, e), lodN) - shape(p - vec2(0.0, e), lodN)) / (2.0 * e);
  float e2 = e * 3.0;
  float lodB = lodN + 1.6;
  vec2 g2 = vec2(shape(p + vec2(e2, 0.0), lodB) - shape(p - vec2(e2, 0.0), lodB), shape(p + vec2(0.0, e2), lodB) - shape(p - vec2(0.0, e2), lodB)) / (2.0 * e2);
  vec3 nS = normalize(vec3(-(g * uLook3.z + g2 * uLook3.w) * uLook.y, 1.0));

  float colD = 0.0;
  vec2 colN = vec2(0.0);
  float colHot = 0.0;
  float colNear = 0.0;
  for (int i = 0; i < ${gi}; i++) {
    vec4 jb = uJetB[i];
    if (jb.w <= 0.0) continue;
    vec4 ja = uJetA[i];
    float xn;
    float sa;
    float cd = column(p, ja, min(jb.w, 1.6), float(i), uTime, uJetBend[i], xn, sa);
    colD += cd;
    colN += vec2(-ja.w, ja.z) * clamp(xn, -1.6, 1.6) * cd;
    colHot += cd * exp(-max(sa, 0.0) / 45.0);
    colNear += cd * exp(-max(sa, 0.0) / 16.0);
  }
  float Dt = D + colD;
  float alpha = 1.0 - exp(-uLook.x * pow(max(D - uThreshold, 0.0) + colD, uGamma));
  vec2 cn = colD > 1e-5 ? colN / colD : vec2(0.0);
  vec3 nC = normalize(vec3(cn * 0.85, sqrt(max(1.0 - dot(cn, cn) * 0.72, 0.08))));
  float wC = colD / max(Dt, 1e-5);
  vec3 n = normalize(mix(nS, nC, wC));
  vec3 L = normalize(vec3(-0.38, 0.6, 0.72));
  float diff = clamp((dot(n, L) + uLook2.z) / (1.0 + uLook2.z), 0.0, 1.0);

  vec2 ld = normalize(L.xy);
  float tau = 0.0;
  float dist = 2.0;
  float stepLen = 3.0;
  for (int i = 0; i < 9; i++) {
    float lod = max(log2(stepLen / texel), 0.0);
    tau += dens(p + ld * dist, lod) * stepLen;
    dist += stepLen;
    stepLen *= 1.4;
  }
  float sun = mix(exp(-uLook.z * tau), 1.0, wC * 0.6);
  float ao = mix(exp(-uLook2.w * dens(p, 4.5)), 1.0, wC);

  vec3 amb = vec3(0.84, 0.88, 1.0) * uLook2.x;
  vec3 key = vec3(1.0, 0.985, 0.96) * uLook2.y;
  vec3 lit = amb * ao + key * sun * diff;

  vec3 jl = vec3(0.0);
  vec3 core = vec3(0.0);
  for (int i = 0; i < ${gi}; i++) {
    vec4 jb = uJetB[i];
    if (jb.w <= 0.0) continue;
    vec4 ja = uJetA[i];
    vec2 rel = p - ja.xy;
    float along = dot(rel, ja.zw);
    float across = dot(rel, vec2(-ja.w, ja.z));
    float str = min(jb.w, 1.6);
    float flick = 0.9 + 0.2 * noise(vec2(uTime * 38.0, float(i) * 5.0));
    float len = (8.0 + 12.0 * str) * flick * uScale;
    float sN = along / len;
    float wid = 3.2 * uScale * (0.9 - 0.5 * clamp(sN, 0.0, 1.0)) + 0.3;
    float radial = exp(-across * across / (wid * wid));
    float axial = smoothstep(-0.12, 0.04, sN) * pow(clamp(1.0 - sN, 0.0, 1.0), 1.5);
    float c = radial * axial * str;
    core += mix(uThrust, vec3(1.0), smoothstep(0.25, 0.9, c)) * c * 1.3;
    float d = length(rel - ja.zw * clamp(along, 0.0, len));
    core += uThrust * str * (0.22 * exp(-d / (5.0 * uScale)) + 0.06 * exp(-d / (18.0 * uScale)));
    jl += uThrust * str * uLight2.x * (exp(-d / (30.0 * uScale)) + 0.45 * exp(-d / (100.0 * uScale)));
  }

  vec3 jlNear = jl * 0.35 + uThrust * colNear / max(Dt, 1e-4) * 0.9;
  jl += uThrust * colHot / max(Dt, 1e-4) * 0.9;
  if (uLightTheme > 0.5) {
    float shade = dot(lit + jl * 0.8, vec3(0.3333)) * uLight2.z;
    vec3 ink = mix(uShade, uSmoke, smoothstep(0.15, 1.2, shade));
    alpha = 1.0 - pow(1.0 - alpha, 1.25);
    ink = mix(ink, uThrust, clamp(dot(jlNear, vec3(0.3333)) * 0.5, 0.0, 0.3));
    float ca = clamp(max(core.r, max(core.g, core.b)) * 0.85, 0.0, 1.0);
    vec3 coreInk = mix(uThrust, vec3(1.0), 0.35 * smoothstep(0.7, 1.0, ca));
    vec3 lc = ink * alpha * (1.0 - ca) + coreInk * ca;
    float la = alpha + ca * (1.0 - alpha);
    outColor = vec4(lc, la);
    return;
  }
  vec3 smoke = uSmoke * (lit + jl) * uLight2.z;
  smoke = mix(smoke / (1.0 + 0.35 * max(smoke - 0.8, 0.0)), 1.0 - exp(-smoke * 1.35), uTone);
  vec3 emit = mix(uThrust, vec3(1.0), 0.5) * heat * heat * uLight2.y;
  vec3 col = (smoke + emit) * alpha + core;
  float a = clamp(max(alpha, max(col.r, max(col.g, col.b))), 0.0, 1.0);
  col = min(col, vec3(a));
  col += (hash(gl_FragCoord.xy + fract(uTime) * 61.0) - 0.5) / 255.0 * a;
  outColor = vec4(max(col, 0.0), a);
}`,um={colSpread:.1,colR:3.6,colD:1.25,colU:420,splash:400,friction:5,disperse:.6,dispV:60,gap:10,wind:8,turb:350,turbScale:34,jetLight:.3,threshold:.035,blur:3,emit:0,exposure:1.3,tone:1,gamma:.6,kickNear:45,kickW:18,kickH:14,vort:6,spread:.1,floor:.02,keepD:.3,keepIdle:.45,keepH:1.6,rateN:0,rateH:6,rateK:20,rateC:3,buoy:330,lift:22,damp:.55,radius:6,speed:380,reach:.9,forceMax:240,alphaK:4,relief:9,shadow:.026,alphaLod:0,ambient:.58,key:.82,wrap:.35,ao:.35,normalE:3,normalLod:-.8,fine:.35,broad:.9,iters:28};function VO({root:e,canvas:t,button:n,cursor:i,ramp:a,props:r}){let s=null;try{s=t.getContext("webgl2",{alpha:!0,premultipliedAlpha:!0,antialias:!1,depth:!1,stencil:!1,powerPreference:"high-performance"})}catch(V){console.warn("FlyingButton WebGL2 unavailable:",V)}let l=typeof window<"u"&&window.matchMedia?window.matchMedia("(prefers-reduced-motion: reduce)"):null,o={W:0,H:0,dpr:1,bw:0,bh:0,x:0,vx:0,y:-Zi,vy:0,th:0,w:0,fvx:0,fvy:0,thrust:[0,0,0,0],delay:[0,0,0,0],phase:"rest",pt:0,clock:0,seed:Math.random()*100,wind:1,alt:160,climbT:1.6,y0:0,vrPrev:0,hold:2.4,xRef:0,landX:0,boost:!1,contact:!0,placed:!1,track:null,back:null,flip:null,rampKey:"",rampGeo:null,strip:null,u:0,v:0,target:{x:0,y:0},pointer:{in:!1,x:0,y:0,type:"mouse"},off:{x:0,y:0},attached:!1,hover:!1,armed:!0,carry:!1,pressed:!1,press:null,drag:null,suppress:!1,lastC:null,lastTh:0,quiet:0,running:!1,last:0,raf:0,simTime:0,activity:0},c=null,u=!1,p=()=>r.current.onMotionStatus?.(l?.matches?"reduced":c?"ready":"unavailable");if(s&&!l?.matches&&(s.getExtension("EXT_color_buffer_float")||s.getExtension("EXT_color_buffer_half_float")))try{c=ww(s)}catch(Q){console.warn("FlyingButton smoke unavailable:",Q),c=null}let f=()=>!!(l&&l.matches),h=()=>(cm[r.current.size]||cm.medium).k,g=()=>AO*h(),M=()=>Ue(Math.round(zr(r.current.jets,2)),1,gi),v=()=>{let V=M();if(V===1)return[0];let Q=o.bw*(V===2?.3:.34);return Array.from({length:V},(at,E)=>Q*(2*E/(V-1)-1))},d=()=>{let V=v();return V.length>1?[V[0],V[V.length-1]]:[-.3*o.bw,.3*o.bw]},x=()=>o.thrust[0]+o.thrust[1]+o.thrust[2]+o.thrust[3],b=()=>o.phase==="ignite"||o.phase==="climb"||o.phase==="hover"||o.phase==="descend"||o.phase==="drag",y=()=>o.phase==="drive"||o.phase==="loop"||o.phase==="flip"||o.phase==="return",w=()=>[o.bw/2+4,Math.max(o.bw/2+4,o.W-o.bw/2-4)],T=()=>!!r.current.ramp,m=()=>{let V=g()+o.bh/2,Q=`${o.W}|${o.H}|${o.bw}|${V}`;if(o.rampKey===Q&&o.rampGeo)return o.rampGeo;let at=Math.max(o.H*.24,g()+o.bh+40),E=1/at,_=at*.4,P=at*Math.PI/2-_,X=(ft,vt)=>{let Ut=[[_,0,E],[P,E,E],[_,E,0],[ft,0,0],[_,0,E],[P,E,E],[_,E,0],[vt,0,0]],Bt={ss:[0],xs:[0],ys:[0],ps:[0],ks:[0]},F=0,ct=0,bt=0,mt=0;return Ut.forEach(([Gt,qt,le])=>{let oe=Math.max(1,Math.round(Gt/1.5)),_e=Gt/oe;for(let Ht=0;Ht<oe;Ht+=1){let xe=qt+(le-qt)*((Ht+.5)/oe),Pe=bt+xe*_e/2;F+=Math.cos(Pe)*_e,ct+=Math.sin(Pe)*_e,bt+=xe*_e,mt+=_e,Bt.ss.push(mt),Bt.xs.push(F),Bt.ys.push(ct),Bt.ps.push(bt),Bt.ks.push(qt+(le-qt)*((Ht+1)/oe))}}),Bt},it=X(0,0),dt=Math.max(0,o.H*.66-Math.max(...it.ys)),xt=X(dt,Math.max(48,o.W*.16)),$=Ue(at*.12,8,16),G=o.W-Math.max(18,o.W*.05)-$-Math.max(...xt.xs),et=xt.xs.map(ft=>ft+G),L=xt.ss.length-1,U=xt.ys.findIndex(ft=>ft>3),O=U<0?et[L]:et[U],st={...xt,xs:et,r:at,T:$,x0:G,foot:O,S:xt.ss[L],clear:Math.min(O,et[L])-12,ok:Math.max(...xt.ys)+$<o.H-8};return o.rampKey=Q,o.rampGeo=st,st},S=()=>{let[V,Q]=w();if(!T())return Ue(o.W/2,V,Q);let at=m();return Ue(Math.min(at.foot*.5,at.x0-90,at.clear-o.bw/2-40),V,Q)},C=()=>({x:o.x,y:g()+o.bh/2+o.y+Zi}),D=()=>{let V=C(),Q=Math.cos(o.th),at=Math.sin(o.th),E=r.current.thrusters?-(o.bh/2+g())+1:-(o.bh/2)+2;return v().map(_=>({x:V.x+_*Q-E*at,y:V.y+_*at+E*Q,dx:at,dy:-Q}))},R=()=>{let V=C();return{x:V.x,y:o.H-V.y}},Z=(V,Q,at,E,_,P,X)=>{let it=_[0]-P[0],dt=X[0]-P[0],xt=E[0]-_[0]+P[0]-X[0],$=_[1]-P[1],G=X[1]-P[1],et=E[1]-_[1]+P[1]-X[1],L=it*G-dt*$||1e-6,U=(xt*G-dt*et)/L,O=(it*et-xt*$)/L,st=_[0]-E[0]+U*_[0],ft=X[0]-E[0]+O*X[0],vt=_[1]-E[1]+U*_[1],Ut=X[1]-E[1]+O*X[1],Bt=E[0]-st*V/Q,F=E[1]-vt*V/Q;return Math.abs(U)<1e-7&&Math.abs(O)<1e-7?`matrix(${[st/Q,vt/Q,ft/at,Ut/at,Bt,F].map(bt=>bt.toFixed(6)).join(",")})`:`matrix3d(${[st/Q,vt/Q,0,U/Q,ft/at,Ut/at,0,O/at,0,0,1,0,Bt,F,0,1-U*V/Q].map(bt=>bt.toFixed(6)).join(",")})`},tt=()=>{o.strip&&(o.strip.wrap.remove(),o.strip.ink.remove(),o.strip=null,n.style.visibility="")},z=()=>{tt();let V=o.track;if(!V)return;let Q=V.geo,at=g()+o.bh/2,E=[0];for(let U=1;U<Q.ss.length;U+=1){let O=(Q.ks[U]+Q.ks[U-1])/2;E.push(E[U-1]+(Q.ss[U]-Q.ss[U-1])*Math.max(1-O*at,.2))}let _=Ue(Math.round(o.bw/8),8,32),P=document.createElement("div");P.setAttribute("aria-hidden","true"),P.style.cssText="position:absolute;inset:0;z-index:1;pointer-events:none";let X=document.createElement("div");X.setAttribute("aria-hidden","true"),X.style.cssText="position:absolute;inset:0;z-index:2;pointer-events:none;will-change:transform";let it=Array.from(n.children),dt=it[1],xt=it.slice(2).map(U=>{let O=U.cloneNode(!0);return O.style.left="0px",O.style.top="0px",O.style.transformOrigin="0 0",P.appendChild(O),{el:O,x:U.offsetLeft,y:U.offsetTop+U.offsetHeight/2,k:1}}),$=[];for(let U=0;U<_;U+=1){let O=n.cloneNode(!0);O.removeAttribute("data-hover"),O.removeAttribute("data-pressed"),O.setAttribute("tabindex","-1"),O.setAttribute("inert",""),Array.from(O.children).slice(1).forEach(vt=>{vt.style.visibility="hidden"});let st=o.bw*U/_-(U?.75:2),ft=o.bw*(U+1)/_+(U<_-1?.75:2);O.style.visibility="visible",O.style.transformOrigin="0 0",O.style.clipPath=`polygon(${st}px -2px, ${ft}px -2px, ${ft}px ${o.bh+2}px, ${st}px ${o.bh+2}px)`,P.appendChild(O),$.push(O)}let G=[],et=dt&&dt.textContent||"",L=document.createElement("canvas").getContext("2d");if(dt&&L&&et.trim()&&!dt.children.length){let U=getComputedStyle(dt),O=`${U.fontStyle} ${U.fontWeight} ${U.fontSize} ${U.fontFamily}`;L.font=O;let st=Array.from(et),ft=Bt=>L.measureText(st.slice(0,Bt).join("")).width,vt=ft(st.length)||1,Ut=dt.offsetTop+dt.offsetHeight/2;st.forEach((Bt,F)=>{let ct=document.createElement("span");ct.textContent=Bt,ct.style.cssText=`position:absolute;left:0;top:0;white-space:pre;line-height:1;transform-origin:0 0;font:${O};color:${U.color}`,X.appendChild(ct),G.push({el:ct,x:dt.offsetLeft+(ft(F)+ft(F+1))/2*(dt.offsetWidth/vt),y:Ut,k:.5})})}else if(dt){let U=dt.cloneNode(!0);U.style.position="absolute",U.style.left="0px",U.style.top="0px",U.style.transformOrigin="0 0",X.appendChild(U),G.push({el:U,x:dt.offsetLeft+dt.offsetWidth/2,y:dt.offsetTop+dt.offsetHeight/2,k:0})}e.appendChild(P),e.appendChild(X),n.style.visibility="hidden",o.strip={wrap:P,ink:X,parts:$,n:_,sn:E,pods:xt,items:G}},J=()=>{let V=o.strip,Q=o.track;if(!V||!Q)return;let at=Q.geo,E=at.ss[at.ss.length-1],_=V.sn[V.sn.length-1],P=(O,st,ft)=>{let vt=0,Ut=O.length-1;for(;Ut-vt>1;){let Bt=vt+Ut>>1;O[Bt]<=ft?vt=Bt:Ut=Bt}return st[vt]+(st[Ut]-st[vt])*((ft-O[vt])/(O[Ut]-O[vt]))},X=O=>O<=0?O:O>=E?_+O-E:P(at.ss,V.sn,O),it=O=>O<=0?O:O>=_?E+O-_:P(V.sn,at.ss,O),dt=X(o.u),xt=g(),$=(O,st)=>{let[ft,vt,Ut]=lt(at,it(dt+O-o.bw/2)),Bt=xt+o.bh-st;return[ft-Math.sin(Ut)*Bt,o.H-vt-Math.cos(Ut)*Bt,Ut]},G=(O,st,ft,vt)=>{O.style.transform=`translate(${st.toFixed(2)}px, ${ft.toFixed(2)}px) rotate(${(-vt).toFixed(4)}rad) translate(-50%, -50%)`},et=o.bw/V.n,L=[],U=[];for(let O=0;O<=V.n;O+=1)L.push($(O*et,0)),U.push($(O*et,o.bh));V.parts.forEach((O,st)=>{O.style.transform=Z(st*et,et,o.bh,L[st],L[st+1],U[st+1],U[st])}),V.pods.forEach(O=>{let[st,ft,vt]=$(O.x,O.y);G(O.el,st,ft,vt)}),V.items.forEach(O=>{let[st,ft,vt]=$(O.x,O.y),[Ut,Bt,F]=$(o.bw/2,O.y),ct=O.x-o.bw/2,bt=Ut+Math.cos(F)*ct,mt=Bt-Math.sin(F)*ct;G(O.el,bt+(st-bt)*O.k,mt+(ft-mt)*O.k,F+(vt-F)*O.k)})},j=()=>{o.strip&&J();let V=C(),Q=V.x-o.bw/2,at=o.H-V.y-o.bh/2;n.style.transform=`translate3d(${Q.toFixed(2)}px, ${at.toFixed(2)}px, 0) rotate(${(-o.th).toFixed(5)}rad)`,e.style.setProperty("--fly-thrust",Ue(x()*.9,0,1.2).toFixed(3))},B=()=>{if(!a)return;let V=m(),Q=a.querySelectorAll("path"),at=Q[0],E=Q[1],_=X=>X.toFixed(1),P=X=>{let it=[];for(let xt=0;xt<V.ss.length;xt+=2){let $=V.ps[xt];it.push(`${_(V.xs[xt]+Math.sin($)*X)} ${_(o.H-V.ys[xt]+Math.cos($)*X)}`)}let dt=V.ps[V.ss.length-1];return it.push(`${_(V.xs[V.ss.length-1]+Math.sin(dt)*X)} ${_(o.H-V.ys[V.ss.length-1]+Math.cos(dt)*X)}`),`M ${it.join(" L ")}`};a.setAttribute("viewBox",`0 0 ${_(o.W)} ${_(o.H)}`),a.style.visibility=V.ok?"":"hidden",at&&(at.setAttribute("d",P(V.T/2)),at.setAttribute("stroke-width",_(V.T))),E&&E.setAttribute("d",P(.75))},ot=V=>{let Q=new Float32Array(gi*4),at=new Float32Array(gi*4),E=[0,0,0,0],_=V.length,P=um,X=h();return V.forEach((it,dt)=>{let xt=Ue(o.thrust[dt]*_,0,2),$=it.dy<-.2?it.y/-it.dy:P.forceMax;Q.set([it.x,it.y,it.dx,it.dy],dt*4),at.set([P.speed*Math.sqrt(xt),P.radius*X,Math.min(P.forceMax,$*P.reach),xt>.004?xt:0],dt*4);let G=o.fvx*-it.dy+o.fvy*it.dx;E[dt]=Ue(-G*.22,-.55*$,.55*$)}),{a:Q,b:at,bend:E}},k=V=>{if(!c)return;let Q=r.current,at=D(),E=ot(at),_=C(),P=v(),X=h(),it=[_.x,_.y,o.bw/2,o.bh/2],dt=[o.vx,o.vy,o.th,o.w],xt=(1-To((Math.abs(o.fvx)-40)/100))*(1-To((Math.abs(o.th)-.1)/.2))*(y()?0:1);V>0&&(o.simTime+=V,c.step(V,{jets:E,craft:it,motion:dt,calm:xt,scale:X,activity:o.activity,jetX:[0,1,2,3].map(G=>G<P.length?P[G]:0),jetN:P.length,spacing:P.length>1?P[1]-P[0]:0,wind:o.wind*um.wind,time:o.simTime,smoke:Ue(zr(Q.smoke,1),0,3),turbulence:Ue(zr(Q.turbulence,1),0,3)}));let $=Tw(Q.smokeColor);c.render(t.width,t.height,{jets:E,craft:it,motion:dt,scale:X,activity:o.activity,time:o.simTime,light:Q.theme==="light",smokeColor:$,shadeColor:$.map((G,et)=>G*.74+[0,.012,.045][et]),thrustColor:Tw(Q.thrustColor)})},Y=()=>{let V=e.getBoundingClientRect(),Q=o.W;if(o.W=Math.max(1,V.width),o.H=Math.max(1,V.height),o.bw=n.offsetWidth,o.bh=n.offsetHeight,o.placed?Q>0&&Q!==o.W&&(o.x*=o.W/Q):(o.x=S(),o.placed=!0),!y()){let[_,P]=w();o.x=Ue(o.x,_,P)}o.dpr=Math.min(window.devicePixelRatio||1,2);let at=Math.round(o.W*o.dpr),E=Math.round(o.H*o.dpr);if((t.width!==at||t.height!==E)&&(t.width=at,t.height=E),c)try{c.resize(o.W,o.H)}catch(_){console.warn("FlyingButton smoke unavailable:",_),c.dispose(),c=null,p()}B(),e.dataset.ready="",j(),o.running||k(0)},N=(V,Q,at=0)=>{let E=R(),_=o.th,P=V-E.x,X=Q-E.y,it=P*Math.cos(_)-X*Math.sin(_),dt=P*Math.sin(_)+X*Math.cos(_);return Math.abs(it)<=o.bw/2+2+at&&dt>=-o.bh/2-2-at&&dt<=o.bh/2+g()+at},yt=()=>{o.pt=0,o.armed=!1,o.seed=Math.random()*100,o.wind=Math.random()<.5?-1-Math.random():1+Math.random(),o.vrPrev=0,o.quiet=0,o.boost=!1},Dt=()=>{if(o.phase!=="rest"||f())return!1;let V=r.current;yt(),o.phase="ignite",o.delay=o.delay.map(()=>Math.random()*.07);let Q=o.H-o.bh-g()-30-Zi;return o.alt=Ue(o.y+zr(V.altitude,170),o.y+24,Math.max(o.y+24,Q)),o.climbT=1.15+(o.alt-o.y)/420,o.hold=Math.max(0,zr(V.hoverTime,2.4)),o.xRef=o.x,I(),!0},lt=(V,Q)=>{if(Q<=0)return[V.x0+Q,0,0,0];let at=0,E=V.ss.length-1;if(Q>=V.ss[E]){let P=V.ps[E];return[V.xs[E]+Math.cos(P)*(Q-V.ss[E]),V.ys[E]+Math.sin(P)*(Q-V.ss[E]),P,0]}for(;E-at>1;){let P=at+E>>1;V.ss[P]<=Q?at=P:E=P}let _=(Q-V.ss[at])/(V.ss[E]-V.ss[at]);return[V.xs,V.ys,V.ps,V.ks].map(P=>P[at]+(P[E]-P[at])*_)},_t=(V,Q)=>{let[at,E,_,P]=lt(V.geo,Q);return{x:at-Math.sin(_)*V.base,cy:E+Math.cos(_)*V.base,th:_,bend:P*V.base}},Ct=()=>{if(o.phase!=="rest"||f()||!T())return!1;let V=m(),Q=V.x0-o.x;if(Q<60||!V.ok)return Dt();yt();let at=g()+o.bh/2,E=Math.max(...V.ys)-2*at,_=Math.sqrt(2*ly*E+2.2*ly*(V.r-at));return o.track={geo:V,base:at,v0:_,acc:_*_/(2*Q)},o.phase="drive",o.u=-Q,o.v=0,o.thrust=[0,0,0,0],z(),I(),!0},Ft=V=>{let[Q,at]=w(),E=o.x+V;T()&&(E=Math.min(E,m().clear-o.bw/2)),o.landX=Ue(E,Q,at)},Lt=V=>{let Q=r.current,at=Ue(zr(Q.wobble,1),0,3);if(o.pt+=V,o.clock+=V,o.phase==="return"){let Et=o.back,Rt=Math.min(o.pt/Et.time,1);o.x=Et.from+(Et.to-Et.from)*Mw(Rt),o.vx=(Et.to-Et.from)*Ew(Rt)/Et.time,o.y=-Zi,o.vy=0,o.th=0,o.w=0,Rt>=1&&(o.phase="rest",o.pt=0,o.vx=0);return}if(o.phase==="drive"||o.phase==="loop"){let Et=o.track,Rt=_t(Et,o.u);o.phase==="drive"?o.v=Math.min(Et.v0,o.v+Et.acc*V):o.v=Math.sqrt(Math.max(Et.v0*Et.v0-2*ly*(Rt.cy-Et.base),.2*Et.v0*Et.v0)),o.u+=o.v*V/Math.max(1-Rt.bend,.25),o.phase==="drive"&&o.u>=0&&(o.phase="loop");let we=_t(Et,o.u);o.vx=(we.x-Rt.x)/V,o.vy=(we.cy-Rt.cy)/V,o.w=(we.th-Rt.th)/V,o.x=we.x,o.y=we.cy-g()-o.bh/2-Zi,o.th=we.th,o.thrust=o.thrust.map(pn=>pn*Math.exp(-V/.1)),o.phase==="loop"&&o.u>=Et.geo.S&&(tt(),o.phase="flip",o.pt=0,o.flip={th:o.th,w:o.w});return}let E=(o.bw*o.bw+o.bh*o.bh)/12,_=Math.max(Math.cos(o.th),.5),P=0,X=!1,it=o.xRef,dt=3,xt=3.6,$=null;if(o.phase==="flip"){let Et=Math.min(o.pt/cy,1),Rt=o.flip,we=Math.PI*2;$={th:(2*Et*Et*Et-3*Et*Et+1)*Rt.th+(Et*Et*Et-2*Et*Et+Et)*cy*Rt.w+(3*Et*Et-2*Et*Et*Et)*we,w:(6*Et*Et-6*Et)*(Rt.th-we)/cy+(3*Et*Et-4*Et+1)*Rt.w},P=2.4*To((Math.cos($.th)-.8)/.15);let pn=o.y+Zi<o.bh*.6;(Et>=1||pn)&&($=null,o.th-=Math.PI*2*Math.round(o.th/(Math.PI*2)),o.phase="descend",o.pt=0,o.boost=!0,o.vrPrev=o.vy,Ft(o.vx*Math.abs(o.vx)/700))}if(o.phase==="ignite"&&(P=.9*To(o.pt/.5),o.pt>=.5&&(o.phase="climb",o.pt=0,o.y0=o.y)),o.phase==="climb"){let Et=o.pt/o.climbT,Rt=o.alt-o.y0,we=o.y0+Rt*Mw(Et),pn=Rt*Ew(Et)/o.climbT,Ai=Rt*RO(Et)/(o.climbT*o.climbT);P=(mi+Ai+30*(we-o.y)+8*(pn-o.vy))/(mi*_),X=!0,Et>=1&&(o.phase="hover",o.pt=0)}else if(o.phase==="hover"){let Et=o.clock*.8,Rt=o.alt+3.5*at*lm(Et,o.seed),we=3.5*at*.8*CO(Et,o.seed);P=(mi+30*(Rt-o.y)+8*(we-o.vy))/(mi*_),X=!0,o.pt>=o.hold&&(o.phase="descend",o.pt=0,o.vrPrev=0,Ft(0))}else if(o.phase==="drag"){let Et=o.target.y-g()-o.bh/2-Zi;P=(mi+34*(Et-o.y)-10*o.vy)/(mi*_),X=!0}else if(o.phase==="descend"){it=o.landX,dt=o.boost?5:4,xt=o.boost?4.6:4.2;let Et=170,Rt=32,we=o.boost?To((Math.abs(o.landX-o.x)-20)/40):To((Math.abs(o.landX-o.x)-3)/23),pn=Math.max(o.y+Zi,0),Ai=(Rt+(Et-Rt)*(1-Math.exp(-pn/52)))*(1-(o.boost?.45:.88)*we),fa=o.boost?Et*3:Et*To(o.pt/.9)+1,Ca=-Math.min(Ai,fa),Ri=Ue((Ca-o.vrPrev)/Math.max(V,1e-4),-600,600);o.vrPrev=Ca,P=(mi+Ri+(o.boost?9:7)*(Ca-o.vy))/(mi*_),X=!0,o.contact&&o.pt>.3&&(o.phase="landed",o.pt=0,o.boost=!1)}else if(o.phase==="landed"&&(P=0,o.pt>.6&&x()<.03)){let Et=T()&&o.track?S():o.x;o.phase=Math.abs(Et-o.x)>6?"return":"rest",o.pt=0,o.thrust=[0,0,0,0],o.vy=0,o.w=0,o.vx=0,o.track=null,o.back={from:o.x,to:Et,time:Ue(Math.abs(Et-o.x)/200,.7,1.8)}}P=Number.isFinite(P)?Ue(P,0,o.boost||o.phase==="flip"?2.6:1.9):1;let G=v(),et=G.length,L=G.reduce((Et,Rt)=>Et+Rt*Rt,0),U=o.phase==="drag"?Ue(100*(o.target.x-o.x)-17*o.vx,-2400,2400):0,O=0;if(X){let Et=.8*at*lm(o.clock*1.7,o.seed+3),Rt=o.phase==="drag"?U*.75:dt*(it-o.x)-xt*o.vx,we=o.boost?.45:.32,pn=Ue(-Math.atan2(Rt,mi),-we,we);O=-81*(o.th-pn)-14*o.w-Et}let st=(o.boost||o.phase==="flip"?2.6:2.4)/et,ft=(Et,Rt)=>Et+(Rt-Et)*(1-Math.exp(-V/(Rt>Et?.08:.17))),vt=L>1?O*E/(mi*L):0,Ut=Math.abs(vt)*Math.max(0,...G.map(Math.abs)),Bt=Math.min(P/et,Math.max(st-Ut,st*.5)),F=0;for(let Et=0;Et<gi;Et+=1){let Rt=0;Et<et&&(Rt=Ue(Bt+vt*G[Et],0,st),o.phase==="ignite"&&o.pt<o.delay[Et]&&(Rt=0)),o.thrust[Et]=ft(o.thrust[Et],Rt),Et<et&&(F+=o.thrust[Et]*G[Et])}let ct=x()*mi,bt=o.phase==="drag"?U:-ct*Math.sin(o.th)-.8*o.vx,mt=ct*Math.cos(o.th)-mi-.3*o.vy,Gt=o.phase==="flip"?0:F*mi/E-1.2*o.w;X&&(o.phase!=="drag"&&(bt+=12*at*lm(o.clock*.7,o.seed+7)),Gt+=.9*at*lm(o.clock*2.3,o.seed+11),L<1&&(Gt+=O),Math.abs(o.th)>.35&&(Gt-=(o.th-Math.sign(o.th)*.35)*160));let qt=C(),le=Math.cos(o.th),oe=Math.sin(o.th),_e=-(o.bh/2+g()),Ht=!1;o.phase!=="flip"&&d().forEach(Et=>{let Rt=Et*le-_e*oe,we=Et*oe+_e*le,pn=qt.y+we,Ai=Zi-pn;if(Ai>0){Ht=!0;let fa=o.vy+o.w*Rt,Ca=o.vx-o.w*we,Ri=Math.max(0,Aw*Ai-wO*fa),zs=-10*Ca;mt+=Ri,bt+=zs,Gt+=(Rt*Ri-we*zs)/E}}),o.contact=Ht,o.vx=Ue(o.vx+bt*V,-1500,1500),o.vy=Ue(o.vy+mt*V,-1500,1500),o.w=Ue(o.w+Gt*V,-14,14),o.x+=o.vx*V,o.y+=o.vy*V,o.th+=o.w*V,$&&(o.th=$.th,o.w=$.w),o.phase!=="flip"&&Math.abs(o.th)>Sw&&(o.th=Math.sign(o.th)*Sw,o.w*o.th>0&&(o.w=0));let[xe,Pe]=w();(o.x<xe||o.x>Pe)&&(o.x=Ue(o.x,xe,Pe),o.vx=0),o.y+Zi<-40&&(o.y=-Zi,o.vy=0),Number.isFinite(o.y+o.x+o.th+o.vy+o.vx+o.w+x())||(Object.assign(o,{x:o.W/2,vx:0,y:-Zi,vy:0,th:0,w:0,thrust:[0,0,0,0],phase:"rest"}),o.drag=null)},gt=V=>{let Q=r.current,at=o.pointer,E=R();if(o.attached&&!o.drag&&o.lastC){let dt=at.x+o.off.x,xt=at.y+o.off.y,$=-(o.th-o.lastTh),G=dt-o.lastC.x,et=xt-o.lastC.y,L=E.x+G*Math.cos($)-et*Math.sin($),U=E.y+G*Math.sin($)+et*Math.cos($);o.off.x+=L-dt,o.off.y+=U-xt}o.lastC=E,o.lastTh=o.th;let _=at.x+o.off.x,P=at.y+o.off.y,X=at.in&&N(_,P,o.attached||o.drag?10:0);if(X!==o.hover&&(o.hover=X,X?n.dataset.hover="":delete n.dataset.hover),!X&&!o.drag&&(o.attached=!1,o.phase==="rest"&&(o.armed=!0)),X&&o.armed&&o.phase==="rest"&&at.type==="mouse"&&Q.trigger!=="click"&&!T()&&Dt()&&(o.attached=!!Q.carryCursor),o.phase==="rest"&&Math.abs(o.off.x)+Math.abs(o.off.y)<12){let dt=Math.exp(-V*6);o.off.x*=dt,o.off.y*=dt}Math.abs(o.off.x)+Math.abs(o.off.y)<.3&&(!o.attached||o.phase==="rest")&&(o.off.x=0,o.off.y=0,o.phase==="rest"&&(o.attached=!1));let it=!!Q.carryCursor&&at.in&&at.type==="mouse"&&(o.attached||!!o.drag||o.off.x!==0||o.off.y!==0);it!==o.carry&&(o.carry=it,it?e.dataset.carry="":delete e.dataset.carry),it&&i&&(i.style.transform=`translate3d(${(_-1.8).toFixed(2)}px, ${(P-1.75).toFixed(2)}px, 0)`)},Zt=V=>{if(o.raf=0,u||f()||document.hidden){o.running=!1,o.last=0;return}let Q=o.last?Ue((V-o.last)/1e3,0,1/30):1/60;if(o.last=V,Q>0){if(o.phase!=="rest")for(let X=0;X<6;X+=1)Lt(Q/6);let at=1-Math.exp(-Q/.12);o.fvx+=(o.vx-o.fvx)*at,o.fvy+=(o.vy-o.fvy)*at,gt(Q),j(),k(Q);let E=x();o.quiet=E>.01||o.phase!=="rest"?0:o.quiet+Q;let _=E>.05?1:0;o.activity+=(_-o.activity)*(1-Math.exp(-Q/(_?.25:1.6)))}o.phase!=="rest"||o.quiet<7||o.carry?o.raf=requestAnimationFrame(Zt):(o.running=!1,o.last=0,c&&c.clear(),k(0))},I=()=>{o.raf||u||f()||document.hidden||(o.running=!0,o.raf=requestAnimationFrame(Zt))},jt=V=>{let Q=e.getBoundingClientRect();return{x:V.clientX-Q.left,y:V.clientY-Q.top}},$t=()=>{let V=o.pointer,Q=V.type==="mouse";return{x:V.x+(Q?o.off.x:0),y:V.y+(Q?o.off.y:0)}},ht=()=>{if(!o.drag)return;let V=$t(),[Q,at]=w(),E=g()+o.bh/2;o.target.x=Ue(V.x-o.drag.gx,Q,at),o.target.y=Ue(o.H-(V.y-o.drag.gy),E,Math.max(E,o.H-o.bh/2-6))},Tt=V=>{let Q=$t(),at=R();o.drag={gx:Q.x-at.x,gy:Q.y-at.y},o.phase="drag",o.pt=0,o.attached=!1,o.pressed=!1,o.suppress=!0,o.boost=!1,delete n.dataset.pressed,e.dataset.dragging="";try{e.setPointerCapture(V.pointerId)}catch{}ht()},wt=V=>{o.drag=null,o.press=null,delete e.dataset.dragging;try{e.releasePointerCapture(V.pointerId)}catch{}o.phase="hover",o.pt=0,o.alt=o.y;let[Q,at]=w();o.xRef=Ue(o.x+o.vx*.3,Q,at),o.hold=Math.min(Math.max(0,zr(r.current.hoverTime,2.4)),.9)},At=V=>{V?.pointerId!==void 0&&o.press&&V.pointerId!==o.press.id||(o.drag&&wt({pointerId:o.press?.id}),o.press=null,o.pressed=!1,delete n.dataset.pressed)},Mt=V=>{o.press&&V.pointerId===o.press.id&&!(V.buttons&1)&&At(V);let Q=jt(V),at=o.pointer;if(at.in&&!o.attached&&!o.drag&&(o.off.x||o.off.y)){let E=Math.exp(-Math.hypot(Q.x-at.x,Q.y-at.y)/110);o.off.x*=E,o.off.y*=E}at.x=Q.x,at.y=Q.y,at.in=!0,at.type=V.pointerType||"mouse",o.press&&!o.drag&&b()&&Math.hypot(Q.x-o.press.x,Q.y-o.press.y)>4&&Tt(V),o.drag&&ht(),gt(0),(o.carry||o.phase!=="rest")&&I()},Yt=()=>{o.drag||(o.pointer.in=!1,o.attached=!1,o.off.x=0,o.off.y=0,gt(0))},zt=V=>{if(f()||V.button!==0)return;let Q=jt(V),at=o.pointer;at.x=Q.x,at.y=Q.y,at.in=!0,at.type=V.pointerType||"mouse",o.suppress=!1;let E=$t();N(E.x,E.y,o.attached?10:0)&&(at.type!=="mouse"&&o.phase==="rest"&&r.current.trigger!=="click"&&!T()&&Dt(),o.press={x:Q.x,y:Q.y,id:V.pointerId},o.carry&&at.type==="mouse"&&(o.pressed=!0,n.dataset.pressed=""))},re=V=>{if(!o.press||V.pointerId!==o.press.id)return;if(o.drag){At(V);return}let Q=o.pressed;At(V),Q&&o.carry&&o.hover&&(o.phase==="rest"&&T()?Ct():r.current.trigger==="click"&&Dt()&&(o.attached=!!r.current.carryCursor),r.current.onClick&&r.current.onClick(V))},Jt=V=>{if(o.suppress){o.suppress=!1,V.stopPropagation(),V.preventDefault();return}if(o.phase==="rest"){if(T()){Ct();return}Dt()&&o.pointer.type==="mouse"&&o.pointer.in&&o.hover&&(o.attached=!!r.current.carryCursor)}},Vt=()=>{o.drag&&o.press?.id!==void 0&&e.hasPointerCapture(o.press.id)&&e.releasePointerCapture(o.press.id),o.raf&&cancelAnimationFrame(o.raf),o.raf=0,o.running=!1,o.last=0,tt(),Object.assign(o,{phase:"rest",x:S(),y:-Zi,vx:0,vy:0,th:0,w:0,thrust:[0,0,0,0],drag:null,press:null,pressed:!1,attached:!1,carry:!1,off:{x:0,y:0},activity:0}),delete e.dataset.dragging,delete e.dataset.carry,delete n.dataset.pressed,c&&!s.isContextLost()&&c.clear(),j(),s?.isContextLost()||k(0)},H=()=>{if(Vt(),!f()&&!c&&s&&!s.isContextLost()&&s.getExtension("EXT_color_buffer_float"))try{c=ww(s),Y()}catch(V){console.warn("FlyingButton smoke unavailable:",V)}p()},ie=()=>{document.hidden&&Vt()},Nt=V=>{V.preventDefault(),c=null,Vt(),p()},se=()=>H();t.addEventListener("webglcontextlost",Nt),t.addEventListener("webglcontextrestored",se),l?.addEventListener("change",H),document.addEventListener("visibilitychange",ie),e.addEventListener("pointermove",Mt),e.addEventListener("pointerenter",Mt),e.addEventListener("pointerleave",Yt),e.addEventListener("pointerdown",zt),e.addEventListener("pointerup",re),e.addEventListener("pointercancel",At),window.addEventListener("pointerup",At),window.addEventListener("pointercancel",At),window.addEventListener("blur",At),n.addEventListener("click",Jt);let K=new ResizeObserver(Y);return K.observe(e),K.observe(n),Y(),p(),{refresh:Y,rehome(){Y(),o.phase==="rest"&&(o.x=S(),j(),o.running||k(0))},destroy(){Vt(),u=!0,t.removeEventListener("webglcontextlost",Nt),t.removeEventListener("webglcontextrestored",se),l?.removeEventListener("change",H),document.removeEventListener("visibilitychange",ie),K.disconnect(),tt(),o.raf&&cancelAnimationFrame(o.raf),e.removeEventListener("pointermove",Mt),e.removeEventListener("pointerenter",Mt),e.removeEventListener("pointerleave",Yt),e.removeEventListener("pointerdown",zt),e.removeEventListener("pointerup",re),e.removeEventListener("pointercancel",At),window.removeEventListener("pointerup",At),window.removeEventListener("pointercancel",At),window.removeEventListener("blur",At),n.removeEventListener("click",Jt),c&&c.dispose()}}}function ww(e){let t=(w,T)=>{let m=e.createShader(w);if(e.shaderSource(m,T),e.compileShader(m),!e.getShaderParameter(m,e.COMPILE_STATUS)){let S=e.getShaderInfoLog(m);throw e.deleteShader(m),new Error(S)}return m},n=t(e.VERTEX_SHADER,DO),i=[],a=w=>{let T=t(e.FRAGMENT_SHADER,w),m=e.createProgram();if(e.attachShader(m,n),e.attachShader(m,T),e.linkProgram(m),!e.getProgramParameter(m,e.LINK_STATUS)){let R=e.getProgramInfoLog(m);throw e.deleteShader(T),e.deleteProgram(m),new Error(R)}e.deleteShader(T);let S={},C=e.getProgramParameter(m,e.ACTIVE_UNIFORMS);for(let R=0;R<C;R+=1){let Z=e.getActiveUniform(m,R);S[Z.name.replace(/\[0\]$/,"")]=e.getUniformLocation(m,Z.name)}let D={p:m,u:S};return i.push(D),D},r;try{r={advect:a(NO),force:a(LO),curl:a(UO),vorticity:a(IO),divergence:a(OO),pressure:a(PO),gradient:a(zO),scale:a(BO),blur:a(FO),dye:a(HO),render:a(GO)}}catch(w){throw i.forEach(T=>e.deleteProgram(T.p)),e.deleteShader(n),w}let s=e.createVertexArray(),l=[],o=(w,T,m,S)=>{let C=e.createTexture();e.bindTexture(e.TEXTURE_2D,C);let D=S?Math.floor(Math.log2(Math.max(w,T)))+1:1;e.texStorage2D(e.TEXTURE_2D,D,m,w,T),e.texParameteri(e.TEXTURE_2D,e.TEXTURE_MIN_FILTER,S?e.LINEAR_MIPMAP_LINEAR:e.LINEAR),e.texParameteri(e.TEXTURE_2D,e.TEXTURE_MAG_FILTER,e.LINEAR),e.texParameteri(e.TEXTURE_2D,e.TEXTURE_WRAP_S,e.CLAMP_TO_EDGE),e.texParameteri(e.TEXTURE_2D,e.TEXTURE_WRAP_T,e.CLAMP_TO_EDGE);let R=e.createFramebuffer();if(e.bindFramebuffer(e.FRAMEBUFFER,R),e.framebufferTexture2D(e.FRAMEBUFFER,e.COLOR_ATTACHMENT0,e.TEXTURE_2D,C,0),e.checkFramebufferStatus(e.FRAMEBUFFER)!==e.FRAMEBUFFER_COMPLETE)throw e.deleteTexture(C),e.deleteFramebuffer(R),new Error("Floating-point framebuffer is unsupported");e.viewport(0,0,w,T),e.clearColor(0,0,0,0),e.clear(e.COLOR_BUFFER_BIT);let Z={tex:C,fbo:R,w,h:T,mips:S};return l.push(Z),Z},c=(w,T,m,S)=>{let C={read:o(w,T,m,S),write:o(w,T,m,S)};return C.swap=()=>{let D=C.read;C.read=C.write,C.write=D},C},u=null,p=[1,1],f=()=>{l.forEach(w=>{e.deleteTexture(w.tex),e.deleteFramebuffer(w.fbo)}),l.length=0},h=(w,T)=>{let m=Math.max(2,w/520,T/300),S=Math.max(16,Math.round(w/m)),C=Math.max(16,Math.round(T/m)),D=Math.max(16,Math.round(w/(m/2))),R=Math.max(16,Math.round(T/(m/2)));p=[w,T],!(u&&u.vw===S&&u.vh===C&&u.dw===D&&u.dh===R)&&(f(),u={vw:S,vh:C,dw:D,dh:R,velocity:c(S,C,e.RG16F,!1),pressure:c(S,C,e.R16F,!1),divergence:o(S,C,e.R16F,!1),curl:o(S,C,e.R16F,!1),dye:c(D,R,e.RG16F,!1),soft:o(D,R,e.RG16F,!0),temp:o(D,R,e.RG16F,!1)})},g=0,M=(w,T)=>{e.useProgram(w.p),g=0,Object.entries(T).forEach(([m,S])=>{let C=w.u[m];C!=null&&(typeof S=="number"?e.uniform1f(C,S):S.f1?e.uniform1fv(C,S.f1):S.tex?(e.activeTexture(e.TEXTURE0+g),e.bindTexture(e.TEXTURE_2D,S.tex),e.uniform1i(C,g),g+=1):S.length===2?e.uniform2fv(C,S):S.length===3?e.uniform3fv(C,S):e.uniform4fv(C,S))})},v=(w,T,m)=>{M(w,T),m&&(e.bindFramebuffer(e.FRAMEBUFFER,m.fbo),e.viewport(0,0,m.w,m.h)),e.bindVertexArray(s),e.drawArrays(e.TRIANGLES,0,3)};return{step:(w,T)=>{if(!u)return;let m=um;e.disable(e.BLEND);let S=[1/u.vw,1/u.vh];v(r.advect,{uVelocity:u.velocity.read,uSource:u.velocity.read,uWorld:p,uDt:w,uKeep:1},u.velocity.write),u.velocity.swap(),v(r.force,{uVelocity:u.velocity.read,uDye:u.soft,uWorld:p,uDt:w,uBuoyancy:m.buoy,uLift:m.lift,uDamping:m.damp,uSpread:m.spread,uSplash:m.splash,uFriction:m.friction,uWind:T.wind,uTurb:[m.turb*(.35+.65*T.activity),m.turbScale],uTime:T.time,uObstacle:T.calm,uKick:[m.kickNear*T.scale,m.kickW*T.scale,m.kickH*T.scale],uCraft:T.craft,uCraftMotion:T.motion,uJetA:T.jets.a,uJetB:T.jets.b,uJetBend:{f1:T.jets.bend}},u.velocity.write),u.velocity.swap(),v(r.curl,{uVelocity:u.velocity.read,uTexel:S},u.curl),v(r.vorticity,{uVelocity:u.velocity.read,uCurl:u.curl,uTexel:S,uStrength:m.vort*T.turbulence*(.4+.6*T.activity),uDt:w},u.velocity.write),u.velocity.swap(),v(r.divergence,{uVelocity:u.velocity.read,uTexel:S},u.divergence),v(r.scale,{uSource:u.pressure.read,uScale:.8},u.pressure.write),u.pressure.swap();for(let D=0;D<m.iters;D+=1)v(r.pressure,{uPressure:u.pressure.read,uDivergence:u.divergence,uTexel:S},u.pressure.write),u.pressure.swap();v(r.gradient,{uPressure:u.pressure.read,uVelocity:u.velocity.read,uTexel:S},u.velocity.write),u.velocity.swap(),v(r.dye,{uVelocity:u.velocity.read,uSource:u.dye.read,uWorld:p,uDt:w,uKeep:[Math.exp(-(m.keepD+m.keepIdle*(1-T.activity))*w),Math.exp(-m.keepH*w)],uRate:[m.rateN*T.smoke,m.rateH,m.rateK*T.smoke,m.rateC*T.smoke],uSpread:m.spread,uCol:[m.colSpread,m.colR*T.scale,m.colD,m.colU],uKick:[m.kickNear*T.scale,m.kickW*T.scale,m.kickH*T.scale],uDisperse:m.disperse,uDispV:m.dispV,uCraft:T.craft,uCraftMotion:T.motion,uGap:[T.spacing,m.gap*T.calm],uJetX:{f1:T.jetX},uJetN:T.jetN,uFloor:m.floor,uTime:T.time,uJetA:T.jets.a,uJetB:T.jets.b,uJetBend:{f1:T.jets.bend}},u.dye.write),u.dye.swap();let C=m.blur/2;v(r.blur,{uSource:u.dye.read,uStep:[C/u.dw,0]},u.temp),v(r.blur,{uSource:u.temp,uStep:[0,C/u.dh]},u.soft),e.bindTexture(e.TEXTURE_2D,u.soft.tex),e.generateMipmap(e.TEXTURE_2D)},render:(w,T,m)=>{if(!u)return;let S=um;e.bindFramebuffer(e.FRAMEBUFFER,null),e.viewport(0,0,w,T),e.disable(e.BLEND),v(r.render,{uDye:u.soft,uWorld:p,uDyeSize:[u.dw,u.dh],uTime:m.time,uLightTheme:m.light?1:0,uSmoke:m.smokeColor,uShade:m.shadeColor,uThrust:m.thrustColor,uLook:[S.alphaK*(.6+.4*m.activity),S.relief,S.shadow,S.alphaLod],uLook2:[S.ambient,S.key,S.wrap,S.ao],uLook3:[S.normalE,S.normalLod,S.fine,S.broad],uCol:[S.colSpread,S.colR*m.scale,S.colD,S.colU],uScale:m.scale,uGamma:S.gamma,uTone:S.tone,uLight2:[S.jetLight,S.emit,S.exposure],uThreshold:S.threshold*(.3+.7*m.activity),uCraft:m.craft,uCraftMotion:m.motion,uJetA:m.jets.a,uJetB:m.jets.b,uJetBend:{f1:m.jets.bend}})},resize:h,clear:()=>{u&&([u.velocity.read,u.velocity.write,u.pressure.read,u.pressure.write,u.dye.read,u.dye.write,u.soft,u.temp].forEach(w=>{e.bindFramebuffer(e.FRAMEBUFFER,w.fbo),e.clearColor(0,0,0,0),e.clear(e.COLOR_BUFFER_BIT)}),e.bindTexture(e.TEXTURE_2D,u.soft.tex),e.generateMipmap(e.TEXTURE_2D))},dispose:()=>{f(),i.forEach(w=>e.deleteProgram(w.p)),e.deleteShader(n),e.deleteVertexArray(s)}}}function hy({children:e="Take off",onClick:t,onMotionStatus:n,buttonProps:i={},theme:a="dark",size:r="medium",radius:s,altitude:l=170,hoverTime:o=2.4,jets:c=2,thrusters:u=!0,trigger:p="hover",carryCursor:f=!0,ramp:h=!1,rampColor:g,smoke:M=1,turbulence:v=1,wobble:d=1,thrustColor:x,smokeColor:b,buttonColor:y,textColor:w,className:T="",style:m}){let S=(0,ua.useRef)(null),C=(0,ua.useRef)(null),D=(0,ua.useRef)(null),R=(0,ua.useRef)(null),Z=(0,ua.useRef)(null),tt=(0,ua.useRef)(null),z=(0,ua.useRef)({}),J=a==="light",j=cm[r]||cm.medium,B=x||(J?"#4f8cff":"#8ec5ff"),ot=b||(J?"#e9ebf0":"#eef1f6"),k=y||(J?"#18181b":"#27272a"),Y=w||(J?"#fafafa":"#f5f5f5"),N=g||(J?"#ececf0":"#25222b"),yt=Ue(Math.round(zr(c,2)),1,gi),Dt=yt===1?0:yt===2?.3:.34,lt=u?Array.from({length:yt},(_t,Ct)=>yt===1?50:50+Dt*100*(2*Ct/(yt-1)-1)):[];return z.current={size:r,altitude:l,hoverTime:o,jets:yt,thrusters:!!u,trigger:p,carryCursor:f,ramp:!!h,smoke:M,turbulence:v,wobble:d,thrustColor:B,smokeColor:ot,theme:a,onMotionStatus:n,onClick:t},(0,ua.useEffect)(()=>{let _t=VO({root:S.current,canvas:C.current,button:D.current,cursor:R.current,ramp:Z.current,props:z});return tt.current=_t,()=>{tt.current=null,_t.destroy()}},[]),(0,ua.useEffect)(()=>{tt.current&&tt.current.refresh()},[r,yt,u,s]),(0,ua.useEffect)(()=>{tt.current&&tt.current.rehome()},[h]),(0,Ji.jsxs)("div",{ref:S,className:`flying-button ${T}`.trim(),"data-theme":a,"data-trigger":h?"click":p,style:{"--fly-bg":k,"--fly-ink":Y,"--fly-glow":B,"--fly-ramp":N,"--fly-h":`${j.h}px`,"--fly-px":`${j.px}px`,"--fly-fs":`${j.fs}px`,"--fly-scale":j.k,...s!=null?{"--fly-radius":`${zr(s,0)}px`}:{},...m},children:[(0,Ji.jsxs)("svg",{ref:Z,className:"flying-button__ramp",style:h?void 0:{display:"none"},"aria-hidden":"true",children:[(0,Ji.jsx)("path",{className:"flying-button__ramp-body"}),(0,Ji.jsx)("path",{className:"flying-button__ramp-edge"})]}),(0,Ji.jsx)("canvas",{ref:C,className:"flying-button__smoke","aria-hidden":"true"}),(0,Ji.jsxs)("button",{...i,ref:D,type:"button",className:"flying-button__craft",onClick:_t=>z.current.onClick&&z.current.onClick(_t),children:[(0,Ji.jsx)("span",{className:"flying-button__face","aria-hidden":"true"}),(0,Ji.jsx)("span",{className:"flying-button__label",children:e}),lt.map(_t=>(0,Ji.jsx)("span",{className:"flying-button__pod",style:{left:`${_t}%`},"aria-hidden":"true"},_t))]}),(0,Ji.jsx)("svg",{ref:R,className:"flying-button__cursor",viewBox:"0 0 24 34","aria-hidden":"true",children:(0,Ji.jsx)("path",{d:"M2.2 2.1v24.6l6.1-5.9 4.1 9.6 4.4-1.9-4.1-9.4h8.6z",fill:"#0a0a0c",stroke:"#fff",strokeWidth:"1.9",strokeLinejoin:"round"})})]})}var Yn=Ce(an(),1),dy="https://github.com/jefferyshadowcmwl-dot/my-introduce";function py(){let e=(0,Ps.useId)(),t=(0,Ps.useRef)(null),[n,i]=(0,Ps.useState)(!1),[a,r]=(0,Ps.useState)("checking"),[s,l]=(0,Ps.useState)(""),o=async()=>{try{if(!navigator.clipboard?.writeText)throw new Error("Clipboard unavailable");await navigator.clipboard.writeText(dy),l("\u94FE\u63A5\u5DF2\u590D\u5236\uFF0C\u53EF\u7C98\u8D34\u5230\u4F60\u9009\u62E9\u7684\u6D4F\u89C8\u5668\u3002")}catch{t.current?.focus(),t.current?.select(),l("\u81EA\u52A8\u590D\u5236\u5931\u8D25\uFF0C\u94FE\u63A5\u5DF2\u9009\u4E2D\u3002\u8BF7\u6309 Ctrl+C / \u2318C\uFF0C\u6216\u957F\u6309\u94FE\u63A5\u9009\u62E9\u590D\u5236\u3002")}};return(0,Yn.jsxs)("div",{className:"cz-launch",children:[(0,Yn.jsxs)("div",{className:"cz-launch__heading",children:[(0,Yn.jsx)("span",{className:"cz-launch__eyebrow",children:"NEXT SIGNAL / \u4E0B\u4E00\u6BB5\u4FE1\u53F7"}),(0,Yn.jsx)("p",{className:"cz-launch__intro",children:"\u70B9\u51FB\u8D77\u98DE\uFF0C\u83B7\u53D6\u516C\u5F00\u9879\u76EE\u5165\u53E3"})]}),(0,Yn.jsxs)("div",{className:"cz-launch__stage",children:[(0,Yn.jsx)("span",{className:"cz-launch__coordinate","aria-hidden":"true",children:"SIGNAL PAD \xB7 0324"}),(0,Yn.jsx)(hy,{theme:"dark",size:"medium",altitude:145,hoverTime:1.8,jets:2,thrusters:!0,trigger:"click",carryCursor:!1,smoke:.8,turbulence:.8,wobble:.6,thrustColor:"#78cfc5",smokeColor:"#c1d5d2",buttonColor:"#1b292d",textColor:"#f2f0ea",onMotionStatus:r,onClick:()=>i(!0),buttonProps:{"aria-expanded":n,"aria-controls":e},children:"\u8BA9\u4E0B\u4E00\u6BB5\u4FE1\u53F7\u8D77\u98DE"})]}),(0,Yn.jsx)("p",{className:"cz-launch__motion",role:"status",children:a==="unavailable"?"\u70DF\u96FE\u52A8\u6548\u5DF2\u964D\u7EA7\uFF1AWebGL2 \u4E0D\u53EF\u7528\u6216\u6E32\u67D3\u5931\u8D25\u3002\u6309\u94AE\u4E0E\u94FE\u63A5\u590D\u5236\u4ECD\u53EF\u4F7F\u7528\u3002":a==="reduced"?"\u5DF2\u9075\u5FAA\u51CF\u5C11\u52A8\u6001\u6548\u679C\u504F\u597D\uFF0C\u505C\u7528\u8D77\u98DE\u4E0E\u70DF\u96FE\uFF1B\u516C\u5F00\u94FE\u63A5\u4E0E\u590D\u5236\u529F\u80FD\u6B63\u5E38\u3002":a==="ready"?"\u8D77\u98DE\u540E\u53EF\u62D6\u52A8\u6309\u94AE\uFF0C\u677E\u624B\u964D\u843D\u3002\u8FD9\u91CC\u53EA\u5C55\u793A\u516C\u5F00\u9879\u76EE\u5165\u53E3\uFF0C\u4E0D\u4F1A\u81EA\u52A8\u53D1\u9001\u6D88\u606F\u3002":"\u6B63\u5728\u68C0\u67E5\u52A8\u6548\u652F\u6301\uFF1B\u70B9\u51FB\u5373\u53EF\u83B7\u53D6\u516C\u5F00\u9879\u76EE\u5165\u53E3\u3002"}),(0,Yn.jsxs)("div",{id:e,className:"cz-launch__panel",hidden:!n,children:[(0,Yn.jsx)("label",{className:"cz-launch__label",htmlFor:`${e}-link`,children:"\u516C\u5F00\u9879\u76EE\u5165\u53E3"}),(0,Yn.jsx)("a",{href:dy,target:"_blank",rel:"noopener noreferrer",children:"\u6253\u5F00 GitHub \u4ED3\u5E93 \u2197"}),(0,Yn.jsxs)("div",{className:"cz-launch__email-row",children:[(0,Yn.jsx)("input",{ref:t,id:`${e}-link`,className:"cz-launch__email",value:dy,readOnly:!0,spellCheck:!1,onFocus:c=>c.target.select()}),(0,Yn.jsx)("button",{className:"cz-launch__copy",type:"button",onClick:o,children:"\u590D\u5236\u94FE\u63A5"})]}),(0,Yn.jsx)("p",{className:"cz-launch__feedback",role:"status",children:s||"\u9009\u62E9\u9002\u5408\u4F60\u7684\u65F6\u673A\uFF0C\u6D4F\u89C8\u516C\u5F00\u9879\u76EE\u3002"})]})]})}var sr=Ce(vi(),1);var rr=Ce(vi(),1);var vy=Ce(an(),1),my=8,Cw=4,kO=`#version 300 es
in vec2 aPosition;
void main() {
  gl_Position = vec4(aPosition, 0.0, 1.0);
}`,XO=`#version 300 es
precision highp float;
uniform vec2 uView;
uniform float uZoom;
uniform float uPhase;
uniform float uTwinkleClock;
uniform float uRings;
uniform vec3 uColors[8];
uniform int uColorCount;
uniform int uStreakCount;
uniform int uColumns;
uniform float uWidth;
uniform float uTail;
uniform float uTwinkle;
uniform float uHead;
uniform float uDepth;
uniform vec4 uMouse;
uniform vec3 uLens;
uniform float uLightMode;
uniform float uEncode;
out vec4 outColor;

const vec3 CAMERA = vec3(0.0, -0.8888889, -0.2222222);
const float TAU = 6.28318530718;
const float SPACING = 0.005;
const float REACH = 0.32;

uint scramble(uint x) {
  x ^= x >> 16;
  x *= 0x7feb352du;
  x ^= x >> 15;
  x *= 0x846ca68bu;
  x ^= x >> 16;
  return x;
}

float unit(uint x) {
  return float(x & 0xffffu) / 65535.0;
}

float stroke(float d, float w) {
  float s = max(0.75 * w, 0.55);
  return 0.75 * w / s * exp(-0.5 * d * d / (s * s));
}

float orb(float d, float r) {
  float s = max(0.6 * r, 0.7);
  float e = 0.6 * r / s;
  return e * e * exp(-0.5 * d * d / (s * s));
}

void main() {
  vec2 frag = gl_FragCoord.xy;
  vec2 screen = (2.0 * frag - uView) / uView.x;
  vec2 p = screen;
  mat2 warp = mat2(1.0);
  if (uLens.z > 0.0) {
    vec2 o = p - uLens.xy;
    float e = uLens.z * exp(-dot(o, o) / (REACH * REACH));
    p -= o * e;
    warp = mat2(1.0 - e) + outerProduct(o, o) * (2.0 * e / (REACH * REACH));
  }

  vec3 dir = vec3(p, uZoom);
  vec3 exits = (1.0 - CAMERA * sign(dir)) / max(abs(dir), vec3(1e-6));
  float u = min(exits.x, min(exits.y, exits.z));
  for (int i = 0; i < 5; i++) {
    vec3 h = CAMERA + u * dir;
    vec3 h2 = h * h;
    u -= (dot(h2, h2) - 1.0) / (4.0 * dot(dir, h2 * h));
  }
  vec3 hit = CAMERA + u * dir;
  vec3 normal = hit * hit * hit;
  float facing = dot(normal, dir);
  vec3 stepX = u * (vec3(1.0, 0.0, 0.0) - dir * (normal.x / facing));
  vec3 stepY = u * (vec3(0.0, 1.0, 0.0) - dir * (normal.y / facing));
  float ring = hit.y * hit.y + hit.z * hit.z;
  float theta = atan(hit.z, hit.y);
  mat2 jacobian = mat2(
    stepX.x,
    (hit.y * stepX.z - hit.z * stepX.y) / ring,
    stepY.x,
    (hit.y * stepY.z - hit.z * stepY.y) / ring
  ) * warp * (2.0 / uView.x);

  vec2 gradX = vec2(jacobian[0][0], jacobian[1][0]);
  vec2 gradTheta = vec2(jacobian[0][1], jacobian[1][1]);
  float scale = max(length(gradX), 1e-8);
  float det = max(abs(gradX.x * gradTheta.y - gradX.y * gradTheta.x), 1e-12);
  float along = scale / det;
  float skew = dot(gradX, gradTheta) / det;
  float spacing = SPACING / scale;
  float detail = smoothstep(1.6, 3.2, spacing);
  if (detail <= 0.0) {
    outColor = vec4(0.0, 0.0, 0.0, 1.0);
    return;
  }
  float halfWidth = min(uWidth / scale, 0.2 * spacing);
  float headRadius = min(2.0 * uWidth / scale, 0.35 * spacing);
  float headReach = 4.0 * max(0.6 * headRadius, 0.7);
  float edge = uColumns > 1 ? 1.0 : 0.5;
  float period = TAU / uRings;
  float fog = exp(-max(u * length(dir) - 0.6, 0.0) * 1.6 * uDepth);

  float boost = 1.0;
  if (uMouse.z > 0.0) {
    vec2 m = screen - uMouse.xy;
    boost += 2.0 * uMouse.z * exp(-dot(m, m) / max(uMouse.w * uMouse.w, 1e-4));
  }

  int count = max(uColorCount, 1);
  vec3 total = vec3(0.0);
  for (int layer = 0; layer < 16; layer++) {
    if (layer >= uStreakCount) break;
    float x = hit.x + float(layer) * SPACING / 8.0;
    float nearest = floor(x / SPACING + 0.5);
    float side = x >= nearest * SPACING ? 1.0 : -1.0;
    for (int k = 0; k < 2; k++) {
      if (k >= uColumns) break;
      float column = nearest + side * float(k);
      float across = (x - column * SPACING) / scale;
      uint seed = scramble(uint(int(column) + 65536) + uint(layer) * 0x9e3779b9u);
      uint next = scramble(seed);
      float hue = unit(seed >> 16);
      float delta = theta - uPhase * (1.0 + floor(unit(seed) * 16.0) / 16.0) - unit(next) * period;
      delta -= period * floor(delta / period + 0.5);
      float ahead = delta * along - across * skew;
      if (abs(ahead) > headReach && (delta > 0.0 || -delta * uTail > 3.2)) continue;
      float behind = max(-delta, 0.0);
      float fall = exp(-uTail * behind) * (1.0 - smoothstep(0.5, 0.95, behind / (0.5 * period)));
      fall *= 1.0 - smoothstep(1.2, 3.2, uTail * behind);
      float reach = length(vec2(across, ahead));
      float trail = stroke(ahead > 0.0 ? reach : abs(across), halfWidth * mix(0.4, 1.0, fall)) * fall;
      float glint = orb(reach, headRadius) * mix(3.0, 1.8, uLightMode);
      float weight = mix(1.5, 1.0 + sin(uTwinkleClock + 7.0 * hue + 4.0), uTwinkle);
      weight *= 1.0 - smoothstep(0.72 * edge, edge, abs(across) / spacing);
      vec3 color = uColors[min(int(hue * float(count)), count - 1)];
      vec3 hot = mix(color, vec3(1.0), uHead * (1.0 - uLightMode));
      total += (trail * color + glint * hot) * weight;
    }
  }

  outColor = vec4(total * fog * boost * detail * uEncode, 1.0);
}`,WO=`#version 300 es
precision highp float;
uniform sampler2D uSource;
uniform vec2 uTarget;
uniform vec2 uTexel;
uniform float uLimit;
out vec4 outColor;

void main() {
  vec2 uv = gl_FragCoord.xy / uTarget;
  vec3 color = texture(uSource, uv - uTexel).rgb;
  color += texture(uSource, uv + uTexel).rgb;
  color += texture(uSource, uv + vec2(uTexel.x, -uTexel.y)).rgb;
  color += texture(uSource, uv + vec2(-uTexel.x, uTexel.y)).rgb;
  outColor = vec4(min(color * 0.25, vec3(uLimit)), 1.0);
}`,qO=`#version 300 es
precision highp float;
uniform sampler2D uSource;
uniform vec2 uTarget;
uniform vec2 uStep;
out vec4 outColor;

void main() {
  vec2 uv = gl_FragCoord.xy / uTarget;
  vec3 color = texture(uSource, uv).rgb * 0.181862;
  color += (texture(uSource, uv + uStep * 1.423135).rgb + texture(uSource, uv - uStep * 1.423135).rgb) * 0.284316;
  color += (texture(uSource, uv + uStep * 3.326702).rgb + texture(uSource, uv - uStep * 3.326702).rgb) * 0.106598;
  color += (texture(uSource, uv + uStep * 5.242989).rgb + texture(uSource, uv - uStep * 5.242989).rgb) * 0.018156;
  outColor = vec4(color, 1.0);
}`,YO=`#version 300 es
precision highp float;
uniform sampler2D uScene;
uniform sampler2D uBloom0;
uniform sampler2D uBloom1;
uniform sampler2D uBloom2;
uniform sampler2D uBloom3;
uniform vec2 uView;
uniform float uDecode;
uniform float uGlow;
uniform float uBloom;
uniform float uPresence;
uniform float uOpacity;
uniform float uFade;
uniform float uLightMode;
uniform vec3 uTopColor;
uniform float uTopGlow;
out vec4 outColor;

float smootherstep01(float t) {
  t = clamp(t, 0.0, 1.0);
  return t * t * t * (t * (t * 6.0 - 15.0) + 10.0);
}

void main() {
  vec2 uv = gl_FragCoord.xy / uView;
  vec3 light = texelFetch(uScene, ivec2(gl_FragCoord.xy), 0).rgb;
  if (uBloom > 0.0) {
    vec3 halo = texture(uBloom0, uv).rgb * 0.42;
    halo += texture(uBloom1, uv).rgb * 0.3;
    halo += texture(uBloom2, uv).rgb * 0.18;
    halo += texture(uBloom3, uv).rgb * 0.1;
    light += halo * uBloom * (uLightMode > 0.5 ? 0.2 : 1.0);
  }
  light *= uDecode * uGlow * uPresence;

  if (uLightMode < 0.5 && uTopGlow > 0.0) {
    float aspect = uView.x / uView.y;
    vec2 q = vec2((uv.x - 0.5) * aspect, 1.04 - uv.y);
    float spread = 0.34 * max(aspect, 0.75);
    float core = exp(-q.x * q.x / (spread * spread) - q.y * q.y / 0.06);
    float halo = exp(-q.x * q.x / (3.6 * spread * spread) - q.y * q.y / 0.18);
    light += uTopColor * uTopGlow * (core * 0.85 + halo * 0.3) * uPresence;
  }

  vec3 lit = max(light, 0.0);
  vec3 mapped = sqrt(1.0 - exp(-1.3 * lit * lit / (lit + 0.025)));
  float peak = max(mapped.r, max(mapped.g, mapped.b));

  float mask = uOpacity;
  float edge = uFade * 0.5;
  if (edge > 0.0) {
    mask *= smootherstep01(uv.x / edge) * smootherstep01((1.0 - uv.x) / edge);
    mask *= smootherstep01(uv.y / edge) * smootherstep01((1.0 - uv.y) / edge);
  }
  float grain = (fract(52.9829189 * fract(dot(gl_FragCoord.xy, vec2(0.06711056, 0.00583715)))) - 0.5) / 255.0;

  if (uLightMode > 0.5) {
    float coverage = clamp(smoothstep(0.0, 0.5, peak) * mask * 0.94 + grain, 0.0, 1.0);
    vec3 chroma = sqrt(clamp(lit / max(max(lit.r, max(lit.g, lit.b)), 1e-6), 0.0, 1.0));
    chroma = pow(chroma, vec3(1.35));
    chroma /= max(max(chroma.r, max(chroma.g, chroma.b)), 1e-4);
    float saturation = 1.0 - min(chroma.r, min(chroma.g, chroma.b));
    chroma = mix(vec3(0.3), chroma, smoothstep(0.08, 0.35, saturation));
    outColor = vec4(chroma * coverage, coverage);
  } else {
    vec3 color = clamp(mapped + grain, 0.0, 1.0) * mask;
    outColor = vec4(color, max(color.r, max(color.g, color.b)));
  }
}`,ZO=2.6,JO=9,gy=Math.PI*2,gc=(e,t,n)=>Math.min(n,Math.max(t,e)),Dw=(e,t,n)=>{let i=e.createShader(t);return i?(e.shaderSource(i,n),e.compileShader(i),e.getShaderParameter(i,e.COMPILE_STATUS)?i:(e.deleteShader(i),null)):null},fm=(e,t)=>{let n=Dw(e,e.VERTEX_SHADER,kO),i=Dw(e,e.FRAGMENT_SHADER,t),a=e.createProgram();if(!n||!i||!a)return null;if(e.attachShader(a,n),e.attachShader(a,i),e.bindAttribLocation(a,0,"aPosition"),e.linkProgram(a),e.deleteShader(n),e.deleteShader(i),!e.getProgramParameter(a,e.LINK_STATUS))return e.deleteProgram(a),null;let r={},s=e.getProgramParameter(a,e.ACTIVE_UNIFORMS);for(let l=0;l<s;l++){let o=e.getActiveUniform(a,l);o&&(r[o.name.replace(/\[0\]$/,"")]=e.getUniformLocation(a,o.name))}return{program:a,uniforms:r}},KO=({colors:e=["#ffffff"],backgroundColor:t="#94a3b8",speed:n=.3,streakCount:i=2,streakWidth:a=.8,streakLength:r=1,glow:s=1,density:l=.6,twinkle:o=.3,zoom:c=3,backgroundGlow:u=.1,headGlow:p=.6,depth:f=.5,bloom:h=.35,opacity:g=1,mouseInteraction:M=!0,mouseStrength:v=.4,mouseRadius:d=.45,mouseDampening:x=.15,lens:b=.5,holdToWarp:y=!0,intro:w=!0,fade:T=0,lightMode:m=!1,mixBlendMode:S,paused:C=!1,dpr:D,className:R="",style:Z})=>{let tt=(0,rr.useRef)(null),z=(0,rr.useRef)(null),J=(0,rr.useRef)(null),j=(0,rr.useRef)(null),[B,ot]=(0,rr.useState)(0);return j.current={colors:(Array.isArray(e)&&e.length?e:["#ffffff"]).slice(0,my).map(String),backgroundColor:String(t),speed:n,streakCount:Math.round(gc(i,1,16)),streakWidth:Math.max(.05,a),streakLength:Math.max(.05,r),glow:Math.max(0,s),density:l,twinkle:gc(o,0,1),zoom:Math.max(.1,c),backgroundGlow:Math.max(0,u),headGlow:gc(p,0,1),depth:Math.max(0,f),bloom:Math.max(0,h),opacity:gc(g,0,1),mouseInteraction:M,mouseStrength:Math.max(0,v),mouseRadius:Math.max(.01,d),mouseDampening:Math.max(0,x),lens:gc(b,0,1),holdToWarp:y,intro:w,fade:gc(T,0,1),lightMode:m,paused:C,dpr:D},(0,rr.useEffect)(()=>{let k=tt.current,Y=z.current,N=Y?.getContext("webgl2",{alpha:!0,premultipliedAlpha:!0,antialias:!1,depth:!1,stencil:!1,powerPreference:"high-performance"});if(!k||!Y||!N)return;let yt=!!N.getExtension("EXT_color_buffer_float"),Dt=fm(N,XO),lt=fm(N,WO),_t=fm(N,qO),Ct=fm(N,YO);if(!Dt||!lt||!_t||!Ct)return;let Ft=U=>{U.preventDefault()},Lt=()=>ot(U=>U+1);Y.addEventListener("webglcontextlost",Ft),Y.addEventListener("webglcontextrestored",Lt);let gt=N.createBuffer(),Zt=N.createVertexArray();N.bindVertexArray(Zt),N.bindBuffer(N.ARRAY_BUFFER,gt),N.bufferData(N.ARRAY_BUFFER,new Float32Array([-1,-1,3,-1,-1,3]),N.STATIC_DRAW),N.enableVertexAttribArray(0),N.vertexAttribPointer(0,2,N.FLOAT,!1,0,0);let I=yt?N.RGBA16F:N.RGBA8,jt=yt?1:.25,$t=()=>({texture:null,framebuffer:N.createFramebuffer(),width:0,height:0}),ht=$t(),Tt=Array.from({length:Cw},()=>[$t(),$t()]),wt=(U,O,st)=>{U.texture&&U.width===O&&U.height===st||(U.texture&&N.deleteTexture(U.texture),U.texture=N.createTexture(),U.width=O,U.height=st,N.bindTexture(N.TEXTURE_2D,U.texture),N.texStorage2D(N.TEXTURE_2D,1,I,O,st),N.texParameteri(N.TEXTURE_2D,N.TEXTURE_MIN_FILTER,N.LINEAR),N.texParameteri(N.TEXTURE_2D,N.TEXTURE_MAG_FILTER,N.LINEAR),N.texParameteri(N.TEXTURE_2D,N.TEXTURE_WRAP_S,N.CLAMP_TO_EDGE),N.texParameteri(N.TEXTURE_2D,N.TEXTURE_WRAP_T,N.CLAMP_TO_EDGE),N.bindFramebuffer(N.FRAMEBUFFER,U.framebuffer),N.framebufferTexture2D(N.FRAMEBUFFER,N.COLOR_ATTACHMENT0,N.TEXTURE_2D,U.texture,0))},At=(U,O)=>(N.bindFramebuffer(N.FRAMEBUFFER,U?U.framebuffer:null),N.viewport(0,0,U?U.width:Y.width,U?U.height:Y.height),N.useProgram(O.program),O.uniforms),Mt=(U,O)=>{N.activeTexture(N.TEXTURE0+U),N.bindTexture(N.TEXTURE_2D,O)},Yt=document.createElement("canvas").getContext("2d",{willReadFrequently:!0}),zt=new Map,re=U=>{if(zt.has(U))return zt.get(U);let O=[1,1,1];if(Yt){Yt.clearRect(0,0,1,1),Yt.fillStyle="#ffffff",Yt.fillStyle=U,Yt.fillRect(0,0,1,1);let[st,ft,vt]=Yt.getImageData(0,0,1,1).data;O=[st/255,ft/255,vt/255]}return zt.set(U,O),O},Jt=U=>re(U).map(O=>O*O),Vt=window.matchMedia?.("(prefers-reduced-motion: reduce)").matches??!1,H=new Float32Array(my*3),ie={x:0,y:0,inside:!1,held:!1},Nt={travel:0,intro:j.current.intro&&!Vt?0:1,mouseX:0,mouseY:0,lensX:0,lensY:0,touch:0,warp:0},se=0,K=0,V=!0,Q=()=>{let U=j.current,O=Y.width,st=Y.height,ft=Math.max(1,k.clientWidth),vt=Math.max(1,k.clientHeight);N.bindVertexArray(Zt),wt(ht,O,st),Tt.forEach((Ht,xe)=>{let Pe=Math.max(1,Math.round(ft/2**(xe+1))),Et=Math.max(1,Math.round(vt/2**(xe+1)));wt(Ht[0],Pe,Et),wt(Ht[1],Pe,Et)});let Ut=Nt.intro,Bt=Math.min(1,Ut*2.2),F=1+5*Math.pow(1-Ut,2)+2.5*Nt.warp,ct=Math.max(1,Math.floor(gy*Math.max(U.density,.05)+.5)),bt=gy/ct,mt=9+Nt.travel,Gt=U.colors.map(Jt);H.fill(0);for(let Ht=0;Ht<my;Ht++)H.set(Gt[Math.min(Ht,Gt.length-1)],Ht*3);let qt=Ht=>(2*Ht-O)/O,le=Ht=>(2*Ht-st)/O,oe=At(ht,Dt);if(N.uniform2f(oe.uView,O,st),N.uniform1f(oe.uZoom,U.zoom),N.uniform1f(oe.uPhase,mt%(16*bt)),N.uniform1f(oe.uTwinkleClock,mt%gy),N.uniform1f(oe.uRings,ct),N.uniform3fv(oe.uColors,H),N.uniform1i(oe.uColorCount,Gt.length),N.uniform1i(oe.uStreakCount,U.streakCount),N.uniform1i(oe.uColumns,U.streakWidth>1?2:1),N.uniform1f(oe.uWidth,5e-4*U.streakWidth),N.uniform1f(oe.uTail,19/(U.streakLength*F)),N.uniform1f(oe.uTwinkle,U.twinkle),N.uniform1f(oe.uHead,U.headGlow),N.uniform1f(oe.uDepth,U.depth),N.uniform4f(oe.uMouse,qt(Nt.mouseX),le(Nt.mouseY),U.mouseInteraction?U.mouseStrength*Nt.touch:0,U.mouseRadius),N.uniform3f(oe.uLens,qt(Nt.lensX),le(Nt.lensY),U.mouseInteraction?.5*U.lens*Nt.touch:0),N.uniform1f(oe.uLightMode,U.lightMode?1:0),N.uniform1f(oe.uEncode,jt),N.drawArrays(N.TRIANGLES,0,3),U.bloom>0){let Ht=ht;Tt.forEach(([xe,Pe])=>{let Et=At(xe,lt);Mt(0,Ht.texture),N.uniform1i(Et.uSource,0),N.uniform2f(Et.uTarget,xe.width,xe.height),N.uniform2f(Et.uTexel,1/Ht.width,1/Ht.height),N.uniform1f(Et.uLimit,4*jt),N.drawArrays(N.TRIANGLES,0,3);let Rt=At(Pe,_t);Mt(0,xe.texture),N.uniform1i(Rt.uSource,0),N.uniform2f(Rt.uTarget,Pe.width,Pe.height),N.uniform2f(Rt.uStep,1/xe.width,0),N.drawArrays(N.TRIANGLES,0,3),Rt=At(xe,_t),Mt(0,Pe.texture),N.uniform1i(Rt.uSource,0),N.uniform2f(Rt.uTarget,xe.width,xe.height),N.uniform2f(Rt.uStep,0,1/Pe.height),N.drawArrays(N.TRIANGLES,0,3),Ht=xe})}let _e=At(null,Ct);Mt(0,ht.texture),N.uniform1i(_e.uScene,0),Tt.forEach(([Ht],xe)=>{Mt(xe+1,Ht.texture),N.uniform1i(_e[`uBloom${xe}`],xe+1)}),N.uniform2f(_e.uView,O,st),N.uniform1f(_e.uDecode,1/jt),N.uniform1f(_e.uGlow,U.glow),N.uniform1f(_e.uBloom,U.bloom),N.uniform1f(_e.uPresence,Bt),N.uniform1f(_e.uOpacity,U.opacity),N.uniform1f(_e.uFade,U.fade),N.uniform1f(_e.uLightMode,U.lightMode?1:0),N.uniform3fv(_e.uTopColor,Jt(U.backgroundColor)),N.uniform1f(_e.uTopGlow,U.backgroundGlow),N.drawArrays(N.TRIANGLES,0,3);for(let Ht=Cw;Ht>=0;Ht--)Mt(Ht,null)},at=U=>{if(se=0,!V||document.hidden)return;let O=j.current,st=K?Math.min(.05,(U-K)/1e3):1/60;K=U,!O.intro||Vt?Nt.intro=1:Nt.intro<1&&(Nt.intro=Math.min(1,Nt.intro+st/ZO));let ft=O.holdToWarp&&ie.held&&ie.inside&&!Vt;Nt.warp+=((ft?1:0)-Nt.warp)*(1-Math.exp(-st*(ft?2.2:1.6)));let vt=JO*Math.pow(1-Nt.intro,2)+6*Nt.warp,Ut=!O.paused&&!Vt;Ut&&(Nt.travel+=st*.1*O.speed*(1+vt));let Bt=Y.width/Math.max(1,k.clientWidth),F=ie.x*Bt,ct=(k.clientHeight-ie.y)*Bt,bt=O.mouseInteraction&&ie.inside&&!Vt;bt&&Nt.touch<.01&&(Nt.mouseX=F,Nt.mouseY=ct,Nt.lensX=F,Nt.lensY=ct);let mt=O.mouseDampening>0?1-Math.exp(-st/O.mouseDampening):1;Nt.mouseX+=(F-Nt.mouseX)*mt,Nt.mouseY+=(ct-Nt.mouseY)*mt;let Gt=1-Math.exp(-st*6);Nt.lensX+=(F-Nt.lensX)*Gt,Nt.lensY+=(ct-Nt.lensY)*Gt,Nt.touch+=((bt?1:0)-Nt.touch)*(1-Math.exp(-st*(bt?4:2))),Q();let qt=Nt.intro<1||Nt.warp>.001||Math.abs((bt?1:0)-Nt.touch)>.002;Ut&&O.speed!==0||qt?se=requestAnimationFrame(at):K=0},E=()=>{!se&&V&&!document.hidden&&(se=requestAnimationFrame(at))},_=()=>{let U=j.current,O=Math.max(1,k.clientWidth),st=Math.max(1,k.clientHeight),ft=Math.min(U.dpr||window.devicePixelRatio||1,2);Y.width=Math.max(1,Math.round(O*ft)),Y.height=Math.max(1,Math.round(st*ft)),se||Q(),E()},P=U=>{let O=k.getBoundingClientRect(),st=U.clientX-O.left,ft=U.clientY-O.top;return{x:st,y:ft,inside:st>=0&&ft>=0&&st<=O.width&&ft<=O.height}},X=U=>{let O=P(U);ie.x=O.x,ie.y=O.y,ie.inside=O.inside,E()},it=U=>{let O=P(U);O.inside&&(ie.x=O.x,ie.y=O.y,ie.inside=!0,ie.held=!0,E())},dt=()=>{ie.held=!1,E()},xt=()=>{ie.inside=!1,ie.held=!1,E()},$=()=>{K=0,E()},G=new ResizeObserver(_);G.observe(k);let et=new IntersectionObserver(U=>{V=U.some(O=>O.isIntersecting),V&&(K=0,E())});et.observe(k),window.addEventListener("pointermove",X,{passive:!0}),window.addEventListener("pointerdown",it,{passive:!0}),window.addEventListener("pointerup",dt,{passive:!0}),window.addEventListener("pointercancel",dt,{passive:!0}),document.documentElement.addEventListener("pointerleave",xt),document.addEventListener("visibilitychange",$),_();let L=j.current.dpr;return J.current=()=>{let U=j.current;if(U.dpr!==L){L=U.dpr,_();return}se||Q(),E()},()=>{cancelAnimationFrame(se),J.current=null,Y.removeEventListener("webglcontextlost",Ft),Y.removeEventListener("webglcontextrestored",Lt),G.disconnect(),et.disconnect(),window.removeEventListener("pointermove",X),window.removeEventListener("pointerdown",it),window.removeEventListener("pointerup",dt),window.removeEventListener("pointercancel",dt),document.documentElement.removeEventListener("pointerleave",xt),document.removeEventListener("visibilitychange",$),[ht,...Tt.flat()].forEach(U=>{U.texture&&N.deleteTexture(U.texture),N.deleteFramebuffer(U.framebuffer)}),[Dt,lt,_t,Ct].forEach(U=>N.deleteProgram(U.program)),N.deleteBuffer(gt),N.deleteVertexArray(Zt),N.isContextLost()||N.getExtension("WEBGL_lose_context")?.loseContext()}},[B]),(0,rr.useEffect)(()=>{J.current?.()}),(0,vy.jsx)("div",{ref:tt,className:`lightfall-container${R?` ${R}`:""}`,style:{...S?{mixBlendMode:S}:null,...Z},children:(0,vy.jsx)("canvas",{ref:z,className:"lightfall-canvas","aria-hidden":"true"})})},Nw=KO;var Ra=Ce(an(),1),jO={colors:["#0B0F12","#173238","#78CFC5","#C8B285"],shape:"horizon",characters:" =+xX0S8#@",cellSize:20,density:.46,glyphOpacity:.34,gradientOpacity:.2,glow:.08,depthOfField:.38,flicker:.08,softness:.72,scale:1.08,flow:.32,speed:.18,grain:.025,variation:3,mouseInteraction:!1,clickEffect:"none",intro:!0,lightMode:!1,fontFamily:'"JetBrains Mono", ui-monospace, SFMono-Regular, Menlo, Consolas, monospace'},QO={colors:["#78CFC5","#C8B285"],backgroundColor:"#78CFC5",speed:.22,streakCount:2,streakWidth:.58,streakLength:.82,glow:.55,density:.48,twinkle:.16,zoom:3.4,backgroundGlow:.055,headGlow:.22,depth:.78,bloom:.16,opacity:.42,mouseInteraction:!0,mouseStrength:.12,mouseRadius:.38,mouseDampening:.24,lens:.18,holdToWarp:!1,intro:!0,fade:.72,lightMode:!1,paused:!1},Lw=(e,t)=>{(0,sr.useEffect)(()=>{let n=e.current?.closest("section")||e.current?.parentElement;if(n)return n.classList.add("da-atmosphere-host",`da-${t}-host`),()=>{n.classList.remove("da-atmosphere-host",`da-${t}-host`)}},[e,t])},$O=({options:e=jO,paused:t=!1,className:n="",style:i})=>{let a=(0,sr.useRef)(null),r=(0,sr.useRef)(null),s=(0,sr.useRef)(null),l=(0,sr.useRef)(null);return l.current={...e,speed:t?0:e.speed,mouseInteraction:t?!1:e.mouseInteraction},Lw(a,"gallery"),(0,sr.useEffect)(()=>{let o=r.current,c=window.LZY?.Comp?.GradientASCII;if(!o||!c?.init){o&&(o.dataset.effect="unavailable"),console.warn("[DetailAtmosphere] GradientASCII \u672A\u52A0\u8F7D\uFF0C#gallery \u4FDD\u7559\u539F\u59CB\u80CC\u666F\u3002");return}return s.current=c.init(o,l.current),o.dataset.effect=o.querySelector(".cz-ascii__canvas")?"ready":"unavailable",()=>{s.current?.destroy(),s.current=null,delete o.dataset.effect}},[]),(0,sr.useEffect)(()=>{s.current?.setOptions(l.current)}),(0,Ra.jsxs)("div",{ref:a,className:`da-atmosphere da-gallery-atmosphere${n?` ${n}`:""}`,style:i,"aria-hidden":"true",children:[(0,Ra.jsx)("div",{ref:r,className:"da-effect"}),(0,Ra.jsx)("div",{className:"da-text-mask"})]})},tP=({lightfallProps:e=QO,paused:t=!1,className:n="",style:i})=>{let a=(0,sr.useRef)(null);return Lw(a,"awards"),(0,Ra.jsxs)("div",{ref:a,className:`da-atmosphere da-awards-atmosphere${n?` ${n}`:""}`,style:i,"aria-hidden":"true",children:[(0,Ra.jsx)("div",{className:"da-effect",children:(0,Ra.jsx)(Nw,{...e,paused:t||e.paused})}),(0,Ra.jsx)("div",{className:"da-text-mask"})]})},eP=({variant:e="gallery",...t})=>e==="awards"?(0,Ra.jsx)(tP,{...t}):(0,Ra.jsx)($O,{...t}),Uw=eP;var Ow=Ce(an(),1),nP={frontImage:"assets/liuzhiyuan.jpg",backImage:"assets/lzy-badge-back.png",finish:"glossy",metal:"gold",strapColor:"#20282a",anchor:"center"},iP={glowColor:"#78CFC5",secondaryColor:"#C8B285",layers:3,fiberStyle:"lines",depthOfField:.85,particles:.35},wo=(e,t,n,i={})=>{if(!n||n.nodeType!==1)throw new TypeError("A DOM element is required.");let a=(0,Iw.createRoot)(n),r={...t,...i},s=!0,l=()=>{s&&a.render((0,Ow.jsx)(e,{...r}))},o={setOptions(c={}){return r={...r,...c},l(),o},unmount(){s&&(s=!1,a.unmount())}};return l(),o},aP=(e,t)=>wo(aw,nP,e,t),rP=(e,t)=>wo(fw,iP,e,t),sP=(e,t={})=>wo(dw,{cableColor:"#DDF8F3",pulseColor:"#C8B285",tunnelColor:"#78CFC5",tunnelOpacity:.12,speed:.16,flowDirection:"inward",opacity:.72,mouseStrength:.08,clickSurge:!0,intro:!0},e,t),oP=(e,t="gallery",n={})=>wo(Uw,{variant:t},e,n),lP=(e,t={})=>wo(om,{},e,t),cP=(e,t={})=>wo(bw,{},e,t),uP=(e,t={})=>wo(py,{},e,t);window.LZYReact=Object.assign(window.LZYReact||{},{mountLanyard:aP,mountGhostFibers:rP,mountLightTunnel:sP,mountDetailAtmosphere:oP,mountGridMotion:lP,mountDriftGallery:cP,mountContactLaunch:uP});})();
