import{j as e,a as d,t as n,L as m,S as x}from"./app-VGJVna0a.js";import{A as h}from"./app-layout-PX2fj3n7.js";import{C as p}from"./cpu-C0hR75iX.js";import{S as u,M as f,W as j,a as g}from"./wifi-DCtdzRa-.js";import{c as r}from"./createLucideIcon-pvh0QA_T.js";import{S as y}from"./smartphone-cwdzYXyz.js";import{T as k,U as b}from"./upload-CXiHVEpp.js";import"./button-DYBiV7nY.js";import"./index-B0_tpuzR.js";import"./index-Dl7v7C3P.js";import"./chevron-right-CsJWzgCw.js";import"./app-logo-icon-8Fyd6NBS.js";/**
 * @license lucide-react v0.475.0 - ISC
 *
 * This source code is licensed under the ISC license.
 * See the LICENSE file in the root directory of this source tree.
 */const v=[["path",{d:"m12 19-7-7 7-7",key:"1l729n"}],["path",{d:"M19 12H5",key:"x3x0zl"}]],N=r("ArrowLeft",v);/**
 * @license lucide-react v0.475.0 - ISC
 *
 * This source code is licensed under the ISC license.
 * See the LICENSE file in the root directory of this source tree.
 */const C=[["circle",{cx:"12",cy:"12",r:"10",key:"1mglay"}],["polyline",{points:"12 6 12 12 16.5 12",key:"1aq6pp"}]],l=r("Clock3",C);/**
 * @license lucide-react v0.475.0 - ISC
 *
 * This source code is licensed under the ISC license.
 * See the LICENSE file in the root directory of this source tree.
 */const M=[["circle",{cx:"12",cy:"12",r:"10",key:"1mglay"}],["path",{d:"M12 2a14.5 14.5 0 0 0 0 20 14.5 14.5 0 0 0 0-20",key:"13o1zl"}],["path",{d:"M2 12h20",key:"9i4pu4"}]],w=r("Globe",M);/**
 * @license lucide-react v0.475.0 - ISC
 *
 * This source code is licensed under the ISC license.
 * See the LICENSE file in the root directory of this source tree.
 */const _=[["path",{d:"M4.9 19.1C1 15.2 1 8.8 4.9 4.9",key:"1vaf9d"}],["path",{d:"M7.8 16.2c-2.3-2.3-2.3-6.1 0-8.5",key:"u1ii0m"}],["circle",{cx:"12",cy:"12",r:"2",key:"1c9p78"}],["path",{d:"M16.2 7.8c2.3 2.3 2.3 6.1 0 8.5",key:"1j5fej"}],["path",{d:"M19.1 4.9C23 8.8 23 15.1 19.1 19",key:"10b0cb"}]],$=r("Radio",_);/**
 * @license lucide-react v0.475.0 - ISC
 *
 * This source code is licensed under the ISC license.
 * See the LICENSE file in the root directory of this source tree.
 */const S=[["path",{d:"M21 12a9 9 0 0 0-9-9 9.75 9.75 0 0 0-6.74 2.74L3 8",key:"14sxne"}],["path",{d:"M3 3v5h5",key:"1xhq8a"}],["path",{d:"M3 12a9 9 0 0 0 9 9 9.75 9.75 0 0 0 6.74-2.74L21 16",key:"1hlbsb"}],["path",{d:"M16 16h5v5",key:"ccwih5"}]],R=r("RefreshCcw",S);/**
 * @license lucide-react v0.475.0 - ISC
 *
 * This source code is licensed under the ISC license.
 * See the LICENSE file in the root directory of this source tree.
 */const A=[["path",{d:"M3 12a9 9 0 1 0 9-9 9.75 9.75 0 0 0-6.74 2.74L3 8",key:"1357e3"}],["path",{d:"M3 3v5h5",key:"1xhq8a"}]],L=r("RotateCcw",A);function z(s){return s?`${(s/1024).toFixed(0)} KB`:"-"}function U(s){if(!s)return"-";const t=Math.floor(s/86400),i=Math.floor(s%86400/3600),a=Math.floor(s%3600/60);return t>0?`${t}d ${i}h`:i>0?`${i}h ${a}m`:`${a}m`}function o({icon:s,title:t,value:i}){return e.jsxs("div",{className:"rounded-xl border bg-white p-5 shadow-sm",children:[e.jsxs("div",{className:"mb-4 flex items-center gap-2 text-gray-500",children:[s,e.jsx("span",{className:"text-sm",children:t})]}),e.jsx("h2",{className:"text-2xl font-bold",children:i})]})}function q({gateway:s}){return e.jsxs("div",{className:"grid gap-5 sm:grid-cols-2 xl:grid-cols-3",children:[e.jsx(o,{icon:e.jsx(p,{className:"h-5 w-5"}),title:"Firmware",value:`v${s.firmware_version}`}),e.jsx(o,{icon:e.jsx(u,{className:"h-5 w-5"}),title:"Signal",value:`${s.signal} dBm`}),e.jsx(o,{icon:e.jsx(f,{className:"h-5 w-5"}),title:"Heap",value:z(s.free_heap)}),e.jsx(o,{icon:e.jsx(l,{className:"h-5 w-5"}),title:"Uptime",value:U(s.uptime)}),e.jsx(o,{icon:e.jsx(w,{className:"h-5 w-5"}),title:"IP Address",value:s.ip}),e.jsx(o,{icon:e.jsx(y,{className:"h-5 w-5"}),title:"SIM",value:s.sim_operator})]})}function c({icon:s,title:t,color:i,onClick:a}){return e.jsxs("button",{onClick:a,className:`flex items-center justify-center gap-2 rounded-xl px-5 py-4 font-semibold text-white transition hover:opacity-90 ${i}`,children:[s,t]})}function B({gateway:s}){const t=async i=>{try{await d.post("/api/gateway/command",{device:s.device,command:i}),n.success(`${i} queued successfully.`)}catch{n.error("Unable to send command.")}};return e.jsxs("div",{className:"rounded-xl border bg-white p-6 shadow-sm",children:[e.jsx("h2",{className:"mb-5 text-lg font-bold",children:"Quick Actions"}),e.jsxs("div",{className:"grid gap-4 sm:grid-cols-2 xl:grid-cols-3",children:[e.jsx(c,{title:"Restart ESP32",color:"bg-red-600",icon:e.jsx(L,{size:18}),onClick:()=>t("restart")}),e.jsx(c,{title:"Restart GSM",color:"bg-orange-600",icon:e.jsx($,{size:18}),onClick:()=>t("restart_gsm")}),e.jsx(c,{title:"Refresh Signal",color:"bg-blue-600",icon:e.jsx(R,{size:18}),onClick:()=>t("refresh_signal")}),e.jsx(c,{title:"Sync Time",color:"bg-green-600",icon:e.jsx(l,{size:18}),onClick:()=>t("sync_time")}),e.jsx(c,{title:"Clear Queue",color:"bg-gray-700",icon:e.jsx(k,{size:18}),onClick:()=>t("clear_queue")}),e.jsx(c,{title:"OTA Update",color:"bg-purple-600",icon:e.jsx(b,{size:18}),onClick:()=>t("ota")})]})]})}function J({gateway:s,commands:t,logs:i,smsHistory:a}){return e.jsxs(h,{children:[e.jsx(m,{title:s.device}),e.jsxs("div",{className:"space-y-6 p-6",children:[e.jsxs("div",{className:"flex flex-col gap-4 lg:flex-row lg:items-center lg:justify-between",children:[e.jsxs("div",{children:[e.jsxs("button",{onClick:()=>x.visit("/gateway-manager"),className:"mb-3 flex items-center gap-2 text-sm text-gray-500 transition hover:text-black",children:[e.jsx(N,{className:"h-4 w-4"}),"Back to Gateway Manager"]}),e.jsx("h1",{className:"text-3xl font-bold",children:s.device}),e.jsx("p",{className:"mt-1 text-gray-500",children:s.ip})]}),e.jsxs("div",{className:`flex items-center gap-2 rounded-full px-5 py-3 font-semibold ${s.status==="online"?"bg-green-100 text-green-700":"bg-red-100 text-red-700"}`,children:[s.status==="online"?e.jsx(j,{className:"h-5 w-5"}):e.jsx(g,{className:"h-5 w-5"}),s.status.toUpperCase()]})]}),e.jsx(q,{gateway:s}),e.jsx(B,{gateway:s})]})]})}export{J as default};
