var e=(e,t,n)=>(r,i)=>{let a=-1;return o(0);async function o(s){if(s<=a)throw Error(`next() called multiple times`);a=s;let c,l=!1,u;if(e[s]?(u=e[s][0][0],r.req.routeIndex=s):u=s===e.length&&i||void 0,u)try{c=await u(r,()=>o(s+1))}catch(e){if(e instanceof Error&&t)r.error=e,c=await t(e,r),l=!0;else throw e}else r.finalized===!1&&n&&(c=await n(r));return c&&(r.finalized===!1||l)&&(r.res=c),r}},t=class extends Error{res;status;constructor(e=500,t){super(t?.message,{cause:t?.cause}),this.res=t?.res,this.status=e}getResponse(){return this.res?new Response(this.res.body,{status:this.status,headers:this.res.headers}):new Response(this.message,{status:this.status})}},n=Symbol(),r=async(e,t=Object.create(null))=>{let{all:n=!1,dot:r=!1}=t,a=(e instanceof se?e.raw.headers:e.headers).get(`Content-Type`);return a?.startsWith(`multipart/form-data`)||a?.startsWith(`application/x-www-form-urlencoded`)?i(e,{all:n,dot:r}):{}};async function i(e,t){let n=await e.formData();return n?a(n,t):{}}function a(e,t){let n=Object.create(null);return e.forEach((e,r)=>{t.all||r.endsWith(`[]`)?o(n,r,e):n[r]=e}),t.dot&&Object.entries(n).forEach(([e,t])=>{e.includes(`.`)&&(s(n,e,t),delete n[e])}),n}var o=(e,t,n)=>{e[t]===void 0?t.endsWith(`[]`)?e[t]=[n]:e[t]=n:Array.isArray(e[t])?e[t].push(n):e[t]=[e[t],n]},s=(e,t,n)=>{if(/(?:^|\.)__proto__\./.test(t))return;let r=e,i=t.split(`.`);i.forEach((e,t)=>{t===i.length-1?r[e]=n:((!r[e]||typeof r[e]!=`object`||Array.isArray(r[e])||r[e]instanceof File)&&(r[e]=Object.create(null)),r=r[e])})},c=e=>{let t=e.split(`/`);return t[0]===``&&t.shift(),t},l=e=>{let{groups:t,path:n}=u(e);return d(c(n),t)},u=e=>{let t=[];return e=e.replace(/\{[^}]+\}/g,(e,n)=>{let r=`@${n}`;return t.push([r,e]),r}),{groups:t,path:e}},d=(e,t)=>{for(let n=t.length-1;n>=0;n--){let[r]=t[n];for(let i=e.length-1;i>=0;i--)if(e[i].includes(r)){e[i]=e[i].replace(r,t[n][1]);break}}return e},f={},p=(e,t)=>{if(e===`*`)return`*`;let n=e.match(/^\:([^\{\}]+)(?:\{(.+)\})?$/);if(n){let r=`${e}#${t}`;return f[r]||(n[2]?f[r]=t&&t[0]!==`:`&&t[0]!==`*`?[r,n[1],RegExp(`^${n[2]}(?=/${t})`)]:[e,n[1],RegExp(`^${n[2]}$`)]:f[r]=[e,n[1],!0]),f[r]}return null},m=(e,t)=>{try{return t(e)}catch{return e.replace(/(?:%[0-9A-Fa-f]{2})+/g,e=>{try{return t(e)}catch{return e}})}},h=e=>m(e,decodeURI),g=e=>{let t=e.url,n=t.indexOf(`/`,t.indexOf(`:`)+4),r=n;for(;r<t.length;r++){let e=t.charCodeAt(r);if(e===37){let e=t.indexOf(`?`,r),i=t.indexOf(`#`,r),a=e===-1?i===-1?void 0:i:i===-1?e:Math.min(e,i),o=t.slice(n,a);return h(o.includes(`%25`)?o.replace(/%25/g,`%2525`):o)}else if(e===63||e===35)break}return t.slice(n,r)},_=e=>{let t=g(e);return t.length>1&&t.at(-1)===`/`?t.slice(0,-1):t},v=(e,t,...n)=>(n.length&&(t=v(t,...n)),`${e?.[0]===`/`?``:`/`}${e}${t===`/`?``:`${e?.at(-1)===`/`?``:`/`}${t?.[0]===`/`?t.slice(1):t}`}`),ee=e=>{if(e.charCodeAt(e.length-1)!==63||!e.includes(`:`))return null;let t=e.split(`/`),n=[],r=``;return t.forEach(e=>{if(e!==``&&!/\:/.test(e))r+=`/`+e;else if(/\:/.test(e))if(/\?/.test(e)){n.length===0&&r===``?n.push(`/`):n.push(r);let t=e.replace(`?`,``);r+=`/`+t,n.push(r)}else r+=`/`+e}),n.filter((e,t,n)=>n.indexOf(e)===t)},te=e=>/[%+]/.test(e)?(e.indexOf(`+`)!==-1&&(e=e.replace(/\+/g,` `)),e.indexOf(`%`)===-1?e:m(e,ae)):e,ne=(e,t,n)=>{let r;if(!n&&t&&!/[%+]/.test(t)){let n=e.indexOf(`?`,8);if(n===-1)return;for(e.startsWith(t,n+1)||(n=e.indexOf(`&${t}`,n+1));n!==-1;){let r=e.charCodeAt(n+t.length+1);if(r===61){let r=n+t.length+2,i=e.indexOf(`&`,r);return te(e.slice(r,i===-1?void 0:i))}else if(r==38||isNaN(r))return``;n=e.indexOf(`&${t}`,n+1)}if(r=/[%+]/.test(e),!r)return}let i={};r??=/[%+]/.test(e);let a=e.indexOf(`?`,8);for(;a!==-1;){let t=e.indexOf(`&`,a+1),o=e.indexOf(`=`,a);o>t&&t!==-1&&(o=-1);let s=e.slice(a+1,o===-1?t===-1?void 0:t:o);if(r&&(s=te(s)),a=t,s===``)continue;let c;o===-1?c=``:(c=e.slice(o+1,t===-1?void 0:t),r&&(c=te(c))),n?(i[s]&&Array.isArray(i[s])||(i[s]=[]),i[s].push(c)):i[s]??=c}return t?i[t]:i},re=ne,ie=(e,t)=>ne(e,t,!0),ae=decodeURIComponent,oe=e=>m(e,ae),se=class{raw;#e;#t;routeIndex=0;path;bodyCache={};constructor(e,t=`/`,n=[[]]){this.raw=e,this.path=t,this.#t=n,this.#e={}}param(e){return e?this.#n(e):this.#r()}#n(e){let t=this.#t[0][this.routeIndex][1][e],n=this.#i(t);return n&&/\%/.test(n)?oe(n):n}#r(){let e={},t=Object.keys(this.#t[0][this.routeIndex][1]);for(let n of t){let t=this.#i(this.#t[0][this.routeIndex][1][n]);t!==void 0&&(e[n]=/\%/.test(t)?oe(t):t)}return e}#i(e){return this.#t[1]?this.#t[1][e]:e}query(e){return re(this.url,e)}queries(e){return ie(this.url,e)}header(e){if(e)return this.raw.headers.get(e)??void 0;let t={};return this.raw.headers.forEach((e,n)=>{t[n]=e}),t}async parseBody(e){return r(this,e)}#a=e=>{let{bodyCache:t,raw:n}=this,r=t[e];if(r)return r;let i=Object.keys(t)[0];return i?t[i].then(t=>(i===`json`&&(t=JSON.stringify(t)),new Response(t)[e]())):t[e]=n[e]()};json(){return this.#a(`text`).then(e=>JSON.parse(e))}text(){return this.#a(`text`)}arrayBuffer(){return this.#a(`arrayBuffer`)}blob(){return this.#a(`blob`)}formData(){return this.#a(`formData`)}addValidatedData(e,t){this.#e[e]=t}valid(e){return this.#e[e]}get url(){return this.raw.url}get method(){return this.raw.method}get[n](){return this.#t}get matchedRoutes(){return this.#t[0].map(([[,e]])=>e)}get routePath(){return this.#t[0].map(([[,e]])=>e)[this.routeIndex].path}},ce={Stringify:1,BeforeStream:2,Stream:3},le=(e,t)=>{let n=new String(e);return n.isEscaped=!0,n.callbacks=t,n},ue=async(e,t,n,r,i)=>{typeof e==`object`&&!(e instanceof String)&&(e instanceof Promise||(e=e.toString()),e instanceof Promise&&(e=await e));let a=e.callbacks;if(!a?.length)return Promise.resolve(e);i?i[0]+=e:i=[e];let o=Promise.all(a.map(e=>e({phase:t,buffer:i,context:r}))).then(e=>Promise.all(e.filter(Boolean).map(e=>ue(e,t,!1,r,i))).then(()=>i[0]));return n?le(await o,a):o},de=`text/plain; charset=UTF-8`,fe=(e,t)=>({"Content-Type":e,...t}),y=(e,t)=>new Response(e,t),pe=class{#e;#t;env={};#n;finalized=!1;error;#r;#i;#a;#o;#s;#c;#l;#u;#d;constructor(e,t){this.#e=e,t&&(this.#i=t.executionCtx,this.env=t.env,this.#c=t.notFoundHandler,this.#d=t.path,this.#u=t.matchResult)}get req(){return this.#t??=new se(this.#e,this.#d,this.#u),this.#t}get event(){if(this.#i&&`respondWith`in this.#i)return this.#i;throw Error(`This context has no FetchEvent`)}get executionCtx(){if(this.#i)return this.#i;throw Error(`This context has no ExecutionContext`)}get res(){return this.#a||=y(null,{headers:this.#l??=new Headers})}set res(e){if(this.#a&&e){e=y(e.body,e);for(let[t,n]of this.#a.headers.entries())if(t!==`content-type`)if(t===`set-cookie`){let t=this.#a.headers.getSetCookie();e.headers.delete(`set-cookie`);for(let n of t)e.headers.append(`set-cookie`,n)}else e.headers.set(t,n)}this.#a=e,this.finalized=!0}render=(...e)=>(this.#s??=e=>this.html(e),this.#s(...e));setLayout=e=>this.#o=e;getLayout=()=>this.#o;setRenderer=e=>{this.#s=e};header=(e,t,n)=>{this.finalized&&(this.#a=y(this.#a.body,this.#a));let r=this.#a?this.#a.headers:this.#l??=new Headers;t===void 0?r.delete(e):n?.append?r.append(e,t):r.set(e,t)};status=e=>{this.#r=e};set=(e,t)=>{this.#n??=new Map,this.#n.set(e,t)};get=e=>this.#n?this.#n.get(e):void 0;get var(){return this.#n?Object.fromEntries(this.#n):{}}#f(e,t,n){let r=this.#a?new Headers(this.#a.headers):this.#l??new Headers;if(typeof t==`object`&&`headers`in t){let e=t.headers instanceof Headers?t.headers:new Headers(t.headers);for(let[t,n]of e)t.toLowerCase()===`set-cookie`?r.append(t,n):r.set(t,n)}if(n)for(let[e,t]of Object.entries(n))if(typeof t==`string`)r.set(e,t);else{r.delete(e);for(let n of t)r.append(e,n)}return y(e,{status:typeof t==`number`?t:t?.status??this.#r,headers:r})}newResponse=(...e)=>this.#f(...e);body=(e,t,n)=>this.#f(e,t,n);text=(e,t,n)=>!this.#l&&!this.#r&&!t&&!n&&!this.finalized?new Response(e):this.#f(e,t,fe(de,n));json=(e,t,n)=>this.#f(JSON.stringify(e),t,fe(`application/json`,n));html=(e,t,n)=>{let r=e=>this.#f(e,t,fe(`text/html; charset=UTF-8`,n));return typeof e==`object`?ue(e,ce.Stringify,!1,{}).then(r):r(e)};redirect=(e,t)=>{let n=String(e);return this.header(`Location`,/[^\x00-\xFF]/.test(n)?encodeURI(n):n),this.newResponse(null,t??302)};notFound=()=>(this.#c??=()=>y(),this.#c(this))},me=[`get`,`post`,`put`,`delete`,`options`,`patch`],he=`Can not add a route since the matcher is already built.`,ge=class extends Error{},_e=`__COMPOSED_HANDLER`,ve=e=>e.text(`404 Not Found`,404),ye=(e,t)=>{if(`getResponse`in e){let n=e.getResponse();return t.newResponse(n.body,n)}return console.error(e),t.text(`Internal Server Error`,500)},be=class t{get;post;put;delete;options;patch;all;on;use;router;getPath;_basePath=`/`;#e=`/`;routes=[];constructor(e={}){[...me,`all`].forEach(e=>{this[e]=(t,...n)=>(typeof t==`string`?this.#e=t:this.#r(e,this.#e,t),n.forEach(t=>{this.#r(e,this.#e,t)}),this)}),this.on=(e,t,...n)=>{for(let r of[t].flat()){this.#e=r;for(let t of[e].flat())n.map(e=>{this.#r(t.toUpperCase(),this.#e,e)})}return this},this.use=(e,...t)=>(typeof e==`string`?this.#e=e:(this.#e=`*`,t.unshift(e)),t.forEach(e=>{this.#r(`ALL`,this.#e,e)}),this);let{strict:t,...n}=e;Object.assign(this,n),this.getPath=t??!0?e.getPath??g:_}#t(){let e=new t({router:this.router,getPath:this.getPath});return e.errorHandler=this.errorHandler,e.#n=this.#n,e.routes=this.routes,e}#n=ve;errorHandler=ye;route(t,n){let r=this.basePath(t);return n.routes.map(t=>{let i;n.errorHandler===ye?i=t.handler:(i=async(r,i)=>(await e([],n.errorHandler)(r,()=>t.handler(r,i))).res,i[_e]=t.handler),r.#r(t.method,t.path,i)}),this}basePath(e){let t=this.#t();return t._basePath=v(this._basePath,e),t}onError=e=>(this.errorHandler=e,this);notFound=e=>(this.#n=e,this);mount(e,t,n){let r,i;n&&(typeof n==`function`?i=n:(i=n.optionHandler,r=n.replaceRequest===!1?e=>e:n.replaceRequest));let a=i?e=>{let t=i(e);return Array.isArray(t)?t:[t]}:e=>{let t;try{t=e.executionCtx}catch{}return[e.env,t]};return r||=(()=>{let t=v(this._basePath,e),n=t===`/`?0:t.length;return e=>{let t=new URL(e.url);return t.pathname=t.pathname.slice(n)||`/`,new Request(t,e)}})(),this.#r(`ALL`,v(e,`*`),async(e,n)=>{let i=await t(r(e.req.raw),...a(e));if(i)return i;await n()}),this}#r(e,t,n){e=e.toUpperCase(),t=v(this._basePath,t);let r={basePath:this._basePath,path:t,method:e,handler:n};this.router.add(e,t,[n,r]),this.routes.push(r)}#i(e,t){if(e instanceof Error)return this.errorHandler(e,t);throw e}#a(t,n,r,i){if(i===`HEAD`)return(async()=>new Response(null,await this.#a(t,n,r,`GET`)))();let a=this.getPath(t,{env:r}),o=this.router.match(i,a),s=new pe(t,{path:a,matchResult:o,env:r,executionCtx:n,notFoundHandler:this.#n});if(o[0].length===1){let e;try{e=o[0][0][0][0](s,async()=>{s.res=await this.#n(s)})}catch(e){return this.#i(e,s)}return e instanceof Promise?e.then(e=>e||(s.finalized?s.res:this.#n(s))).catch(e=>this.#i(e,s)):e??this.#n(s)}let c=e(o[0],this.errorHandler,this.#n);return(async()=>{try{let e=await c(s);if(!e.finalized)throw Error("Context is not finalized. Did you forget to return a Response object or `await next()`?");return e.res}catch(e){return this.#i(e,s)}})()}fetch=(e,...t)=>this.#a(e,t[1],t[0],e.method);request=(e,t,n,r)=>e instanceof Request?this.fetch(t?new Request(e,t):e,n,r):(e=e.toString(),this.fetch(new Request(/^https?:\/\//.test(e)?e:`http://localhost${v(`/`,e)}`,t),n,r));fire=()=>{addEventListener(`fetch`,e=>{e.respondWith(this.#a(e.request,e,void 0,e.request.method))})}},xe=[];function Se(e,t){let n=this.buildAllMatchers(),r=((e,t)=>{let r=n[e]||n.ALL,i=r[2][t];if(i)return i;let a=t.match(r[0]);if(!a)return[[],xe];let o=a.indexOf(``,1);return[r[1][o],a]});return this.match=r,r(e,t)}var Ce=`[^/]+`,b=`.*`,we=`(?:|/.*)`,x=Symbol(),Te=new Set(`.\\+*[^]$()`);function Ee(e,t){return e.length===1?t.length===1?e<t?-1:1:-1:t.length===1||e===b||e===we?1:t===b||t===we?-1:e===Ce?1:t===Ce?-1:e.length===t.length?e<t?-1:1:t.length-e.length}var De=class e{#e;#t;#n=Object.create(null);insert(t,n,r,i,a){if(t.length===0){if(this.#e!==void 0)throw x;if(a)return;this.#e=n;return}let[o,...s]=t,c=o===`*`?s.length===0?[``,``,b]:[``,``,Ce]:o===`/*`?[``,``,we]:o.match(/^\:([^\{\}]+)(?:\{(.+)\})?$/),l;if(c){let t=c[1],n=c[2]||Ce;if(t&&c[2]&&(n===`.*`||(n=n.replace(/^\((?!\?:)(?=[^)]+\)$)/,`(?:`),/\((?!\?:)/.test(n))))throw x;if(l=this.#n[n],!l){if(Object.keys(this.#n).some(e=>e!==b&&e!==we))throw x;if(a)return;l=this.#n[n]=new e,t!==``&&(l.#t=i.varIndex++)}!a&&t!==``&&r.push([t,l.#t])}else if(l=this.#n[o],!l){if(Object.keys(this.#n).some(e=>e.length>1&&e!==b&&e!==we))throw x;if(a)return;l=this.#n[o]=new e}l.insert(s,n,r,i,a)}buildRegExpStr(){let e=Object.keys(this.#n).sort(Ee).map(e=>{let t=this.#n[e];return(typeof t.#t==`number`?`(${e})@${t.#t}`:Te.has(e)?`\\${e}`:e)+t.buildRegExpStr()});return typeof this.#e==`number`&&e.unshift(`#${this.#e}`),e.length===0?``:e.length===1?e[0]:`(?:`+e.join(`|`)+`)`}},Oe=class{#e={varIndex:0};#t=new De;insert(e,t,n){let r=[],i=[];for(let t=0;;){let n=!1;if(e=e.replace(/\{[^}]+\}/g,e=>{let r=`@\\${t}`;return i[t]=[r,e],t++,n=!0,r}),!n)break}let a=e.match(/(?::[^\/]+)|(?:\/\*$)|./g)||[];for(let e=i.length-1;e>=0;e--){let[t]=i[e];for(let n=a.length-1;n>=0;n--)if(a[n].indexOf(t)!==-1){a[n]=a[n].replace(t,i[e][1]);break}}return this.#t.insert(a,t,r,this.#e,n),r}buildRegExp(){let e=this.#t.buildRegExpStr();if(e===``)return[/^$/,[],[]];let t=0,n=[],r=[];return e=e.replace(/#(\d+)|@(\d+)|\.\*\$/g,(e,i,a)=>i===void 0?(a===void 0||(r[Number(a)]=++t),``):(n[++t]=Number(i),`$()`)),[RegExp(`^${e}`),n,r]}},ke=[/^$/,[],Object.create(null)],Ae=Object.create(null);function je(e){return Ae[e]??=RegExp(e===`*`?``:`^${e.replace(/\/\*$|([.\\+*[^\]$()])/g,(e,t)=>t?`\\${t}`:`(?:|/.*)`)}$`)}function Me(){Ae=Object.create(null)}function Ne(e){let t=new Oe,n=[];if(e.length===0)return ke;let r=e.map(e=>[!/\*|\/:/.test(e[0]),...e]).sort(([e,t],[n,r])=>e?1:n?-1:t.length-r.length),i=Object.create(null);for(let e=0,a=-1,o=r.length;e<o;e++){let[o,s,c]=r[e];o?i[s]=[c.map(([e])=>[e,Object.create(null)]),xe]:a++;let l;try{l=t.insert(s,a,o)}catch(e){throw e===x?new ge(s):e}o||(n[a]=c.map(([e,t])=>{let n=Object.create(null);for(--t;t>=0;t--){let[e,r]=l[t];n[e]=r}return[e,n]}))}let[a,o,s]=t.buildRegExp();for(let e=0,t=n.length;e<t;e++)for(let t=0,r=n[e].length;t<r;t++){let r=n[e][t]?.[1];if(!r)continue;let i=Object.keys(r);for(let e=0,t=i.length;e<t;e++)r[i[e]]=s[r[i[e]]]}let c=[];for(let e in o)c[e]=n[o[e]];return[a,c,i]}function S(e,t){if(e){for(let n of Object.keys(e).sort((e,t)=>t.length-e.length))if(je(n).test(t))return[...e[n]]}}var Pe=class{name=`RegExpRouter`;#e;#t;constructor(){this.#e={ALL:Object.create(null)},this.#t={ALL:Object.create(null)}}add(e,t,n){let r=this.#e,i=this.#t;if(!r||!i)throw Error(he);r[e]||[r,i].forEach(t=>{t[e]=Object.create(null),Object.keys(t.ALL).forEach(n=>{t[e][n]=[...t.ALL[n]]})}),t===`/*`&&(t=`*`);let a=(t.match(/\/:/g)||[]).length;if(/\*$/.test(t)){let o=je(t);e===`ALL`?Object.keys(r).forEach(e=>{r[e][t]||=S(r[e],t)||S(r.ALL,t)||[]}):r[e][t]||=S(r[e],t)||S(r.ALL,t)||[],Object.keys(r).forEach(t=>{(e===`ALL`||e===t)&&Object.keys(r[t]).forEach(e=>{o.test(e)&&r[t][e].push([n,a])})}),Object.keys(i).forEach(t=>{(e===`ALL`||e===t)&&Object.keys(i[t]).forEach(e=>o.test(e)&&i[t][e].push([n,a]))});return}let o=ee(t)||[t];for(let t=0,s=o.length;t<s;t++){let c=o[t];Object.keys(i).forEach(o=>{(e===`ALL`||e===o)&&(i[o][c]||=[...S(r[o],c)||S(r.ALL,c)||[]],i[o][c].push([n,a-s+t+1]))})}}match=Se;buildAllMatchers(){let e=Object.create(null);return Object.keys(this.#t).concat(Object.keys(this.#e)).forEach(t=>{e[t]||=this.#n(t)}),this.#e=this.#t=void 0,Me(),e}#n(e){let t=[],n=e===`ALL`;return[this.#e,this.#t].forEach(r=>{let i=r[e]?Object.keys(r[e]).map(t=>[t,r[e][t]]):[];i.length===0?e!==`ALL`&&t.push(...Object.keys(r.ALL).map(e=>[e,r.ALL[e]])):(n||=!0,t.push(...i))}),n?Ne(t):null}},Fe=class{name=`SmartRouter`;#e=[];#t=[];constructor(e){this.#e=e.routers}add(e,t,n){if(!this.#t)throw Error(he);this.#t.push([e,t,n])}match(e,t){if(!this.#t)throw Error(`Fatal error`);let n=this.#e,r=this.#t,i=n.length,a=0,o;for(;a<i;a++){let i=n[a];try{for(let e=0,t=r.length;e<t;e++)i.add(...r[e]);o=i.match(e,t)}catch(e){if(e instanceof ge)continue;throw e}this.match=i.match.bind(i),this.#e=[i],this.#t=void 0;break}if(a===i)throw Error(`Fatal error`);return this.name=`SmartRouter + ${this.activeRouter.name}`,o}get activeRouter(){if(this.#t||this.#e.length!==1)throw Error(`No active router has been determined yet.`);return this.#e[0]}},C=Object.create(null),Ie=e=>{for(let t in e)return!0;return!1},Le=class e{#e;#t;#n;#r=0;#i=C;constructor(e,t,n){if(this.#t=n||Object.create(null),this.#e=[],e&&t){let n=Object.create(null);n[e]={handler:t,possibleKeys:[],score:0},this.#e=[n]}this.#n=[]}insert(t,n,r){this.#r=++this.#r;let i=this,a=l(n),o=[];for(let t=0,n=a.length;t<n;t++){let n=a[t],r=a[t+1],s=p(n,r),c=Array.isArray(s)?s[0]:n;if(c in i.#t){i=i.#t[c],s&&o.push(s[1]);continue}i.#t[c]=new e,s&&(i.#n.push(s),o.push(s[1])),i=i.#t[c]}return i.#e.push({[t]:{handler:r,possibleKeys:o.filter((e,t,n)=>n.indexOf(e)===t),score:this.#r}}),i}#a(e,t,n,r,i){for(let a=0,o=t.#e.length;a<o;a++){let o=t.#e[a],s=o[n]||o.ALL,c={};if(s!==void 0&&(s.params=Object.create(null),e.push(s),r!==C||i&&i!==C))for(let e=0,t=s.possibleKeys.length;e<t;e++){let t=s.possibleKeys[e],n=c[s.score];s.params[t]=i?.[t]&&!n?i[t]:r[t]??i?.[t],c[s.score]=!0}}}search(e,t){let n=[];this.#i=C;let r=[this],i=c(t),a=[],o=i.length,s=null;for(let c=0;c<o;c++){let l=i[c],u=c===o-1,d=[];for(let f=0,p=r.length;f<p;f++){let p=r[f],m=p.#t[l];m&&(m.#i=p.#i,u?(m.#t[`*`]&&this.#a(n,m.#t[`*`],e,p.#i),this.#a(n,m,e,p.#i)):d.push(m));for(let r=0,f=p.#n.length;r<f;r++){let f=p.#n[r],m=p.#i===C?{}:{...p.#i};if(f===`*`){let t=p.#t[`*`];t&&(this.#a(n,t,e,p.#i),t.#i=m,d.push(t));continue}let[h,g,_]=f;if(!l&&!(_ instanceof RegExp))continue;let v=p.#t[h];if(_ instanceof RegExp){if(s===null){s=Array(o);let e=+(t[0]===`/`);for(let t=0;t<o;t++)s[t]=e,e+=i[t].length+1}let r=t.substring(s[c]),l=_.exec(r);if(l){if(m[g]=l[0],this.#a(n,v,e,p.#i,m),Ie(v.#t)){v.#i=m;let e=l[0].match(/\//)?.length??0;(a[e]||=[]).push(v)}continue}}(_===!0||_.test(l))&&(m[g]=l,u?(this.#a(n,v,e,m,p.#i),v.#t[`*`]&&this.#a(n,v.#t[`*`],e,m,p.#i)):(v.#i=m,d.push(v)))}}let f=a.shift();r=f?d.concat(f):d}return n.length>1&&n.sort((e,t)=>e.score-t.score),[n.map(({handler:e,params:t})=>[e,t])]}},Re=class{name=`TrieRouter`;#e;constructor(){this.#e=new Le}add(e,t,n){let r=ee(t);if(r){for(let t=0,i=r.length;t<i;t++)this.#e.insert(e,r[t],n);return}this.#e.insert(e,t,n)}match(e,t){return this.#e.search(e,t)}},ze=class extends be{constructor(e={}){super(e),this.router=e.router??new Fe({routers:[new Pe,new Re]})}},Be=e=>{let t={origin:`*`,allowMethods:[`GET`,`HEAD`,`PUT`,`POST`,`DELETE`,`PATCH`],allowHeaders:[],exposeHeaders:[],...e},n=(e=>typeof e==`string`?e===`*`?t.credentials?e=>e||null:()=>e:t=>e===t?t:null:typeof e==`function`?e:t=>e.includes(t)?t:null)(t.origin),r=(e=>typeof e==`function`?e:Array.isArray(e)?()=>e:()=>[])(t.allowMethods);return async function(e,i){function a(t,n){e.res.headers.set(t,n)}let o=await n(e.req.header(`origin`)||``,e);if(o&&a(`Access-Control-Allow-Origin`,o),t.credentials&&a(`Access-Control-Allow-Credentials`,`true`),t.exposeHeaders?.length&&a(`Access-Control-Expose-Headers`,t.exposeHeaders.join(`,`)),e.req.method===`OPTIONS`){(t.origin!==`*`||t.credentials)&&a(`Vary`,`Origin`),t.maxAge!=null&&a(`Access-Control-Max-Age`,t.maxAge.toString());let n=await r(e.req.header(`origin`)||``,e);n.length&&a(`Access-Control-Allow-Methods`,n.join(`,`));let i=t.allowHeaders;if(!i?.length){let t=e.req.header(`Access-Control-Request-Headers`);t&&(i=t.split(/\s*,\s*/))}return i?.length&&(a(`Access-Control-Allow-Headers`,i.join(`,`)),e.res.headers.append(`Vary`,`Access-Control-Request-Headers`)),e.res.headers.delete(`Content-Length`),e.res.headers.delete(`Content-Type`),new Response(null,{headers:e.res.headers,status:204,statusText:`No Content`})}await i(),(t.origin!==`*`||t.credentials)&&e.header(`Vary`,`Origin`,{append:!0})}};function Ve(){return Be({origin:`*`,allowMethods:[`GET`,`POST`,`PUT`,`DELETE`,`OPTIONS`],allowHeaders:[`Content-Type`,`Authorization`],maxAge:86400})}async function He(e,n){if(e instanceof t)return n.json({message:e.message},e.status);let r=e?.message||`Internal Server Error`;return console.error(`[error]`,e),n.json({message:r},500)}function Ue(){let{process:e,Deno:t}=globalThis;return!(typeof t?.noColor==`boolean`?t.noColor:e!==void 0&&`NO_COLOR`in e?.env)}async function We(){let{navigator:e}=globalThis;return!(e!==void 0&&e.userAgent===`Cloudflare-Workers`?await(async()=>{try{return`NO_COLOR`in((await import(`cloudflare:workers`)).env??{})}catch{return!1}})():!Ue())}var Ge=e=>{let[t,n]=[`,`,`.`];return e.map(e=>e.replace(/(\d)(?=(\d\d\d)+(?!\d))/g,`$1`+t)).join(n)},Ke=e=>{let t=Date.now()-e;return Ge([t<1e3?t+`ms`:Math.round(t/1e3)+`s`])},qe=async e=>{if(await We())switch(e/100|0){case 5:return`\x1B[31m${e}\x1B[0m`;case 4:return`\x1B[33m${e}\x1B[0m`;case 3:return`\x1B[36m${e}\x1B[0m`;case 2:return`\x1B[32m${e}\x1B[0m`}return`${e}`};async function Je(e,t,n,r,i=0,a){e(t===`<--`?`${t} ${n} ${r}`:`${t} ${n} ${r} ${await qe(i)} ${a}`)}var Ye=(e=console.log)=>async function(t,n){let{method:r,url:i}=t.req,a=i.slice(i.indexOf(`/`,8));await Je(e,`<--`,r,a);let o=Date.now();await n(),await Je(e,`-->`,r,a,t.res.status,Ke(o))};function Xe(){return Ye()}function Ze(e){return async(t,n)=>{t.set(`repo`,e),await n()}}function Qe(){return[{label:`Emoji`,value:`emoji`},{label:`Clash新字段`,value:`new_name`},{label:`UDP`,value:`udp`},{label:`排序节点`,value:`sort`},{label:`TFO`,value:`tfo`},{label:`关闭证书检查`,value:`scv`},{label:`节点类型`,value:`append_type`},{label:`仅输出节点信息`,value:`list`}]}function $e(e,t){let{origin:n}=new URL(e.url);return t.DEFAULT_BACKEND||n}function et(e,t){let{origin:n}=new URL(e.url);return(t.CUSTOM_BACKEND?.split(`
`).filter(Boolean)??[]).reduce((e,t)=>(e.push({label:t,value:t}),e),[{label:n,value:n}]).concat({label:`肥羊增强型后端【vless+hysteria】`,value:`https://url.v1.mk`},{label:`肥羊备用后端【vless+hysteria】`,value:`https://sub.d1.mk`},{label:`品云提供后端【实验性】`,value:`https://v.id9.cc`},{label:`つつ-多地防失联【负载均衡+国内优化】`,value:`https://api.tsutsu.one`},{label:`nameless13提供`,value:`https://www.nameless13.com`},{label:`subconverter作者提供`,value:`https://sub.xeton.dev`},{label:`sub-web作者提供`,value:`https://api.wcc.best`},{label:`sub作者&lhie1提供`,value:`https://api.dler.io`})}function tt(){return[{label:`AnyTLS`,value:`anytls`},{label:`Vless`,value:`vless`},{label:`Vmess`,value:`vmess`},{label:`Trojan`,value:`trojan`},{label:`Shadowsocks`,value:`shadowsocks`},{label:`ShadowsocksR`,value:`shadowsocksr`},{label:`Hysteria`,value:`hysteria`},{label:`Hysteria2`,value:`hysteria2`},{label:`HY2`,value:`hy2`},{label:`TUIC`,value:`tuic`}]}function nt(e){return(e.REMOTE_CONFIG?.split(`
`).filter(Boolean)??[]).reduce((e,t)=>(e.unshift({label:t,value:t}),e),[{label:`ACL4SSR_Online 默认版 分组比较全 (与Github同步)`,value:`https://raw.githubusercontent.com/ACL4SSR/ACL4SSR/master/Clash/config/ACL4SSR_Online.ini`},{label:`ACL4SSR_Online_AdblockPlus 更多去广告 (与Github同步)`,value:`https://raw.githubusercontent.com/ACL4SSR/ACL4SSR/master/Clash/config/ACL4SSR_Online_AdblockPlus.ini`},{label:`ACL4SSR_Online_NoAuto 无自动测速 (与Github同步)`,value:`https://raw.githubusercontent.com/ACL4SSR/ACL4SSR/master/Clash/config/ACL4SSR_Online_NoAuto.ini`},{label:`ACL4SSR_Online_NoReject 无广告拦截规则 (与Github同步)`,value:`https://raw.githubusercontent.com/ACL4SSR/ACL4SSR/master/Clash/config/ACL4SSR_Online_NoReject.ini`},{label:`ACL4SSR_Online_Mini 精简版 (与Github同步)`,value:`https://raw.githubusercontent.com/ACL4SSR/ACL4SSR/master/Clash/config/ACL4SSR_Online_Mini.ini`},{label:`ACL4SSR_Online_Mini_AdblockPlus.ini 精简版 更多去广告 (与Github同步)`,value:`https://raw.githubusercontent.com/ACL4SSR/ACL4SSR/master/Clash/config/ACL4SSR_Online_Mini_AdblockPlus.ini`},{label:`ACL4SSR_Online_Mini_NoAuto.ini 精简版 不带自动测速 (与Github同步)`,value:`https://raw.githubusercontent.com/ACL4SSR/ACL4SSR/master/Clash/config/ACL4SSR_Online_Mini_NoAuto.ini`},{label:`ACL4SSR_Online_Mini_Fallback.ini 精简版 带故障转移 (与Github同步)`,value:`https://raw.githubusercontent.com/ACL4SSR/ACL4SSR/master/Clash/config/ACL4SSR_Online_Mini_Fallback.ini`},{label:`ACL4SSR_Online_Mini_MultiMode.ini 精简版 自动测速、故障转移、负载均衡 (与Github同步)`,value:`https://raw.githubusercontent.com/ACL4SSR/ACL4SSR/master/Clash/config/ACL4SSR_Online_Mini_MultiMode.ini`},{label:`ACL4SSR_Online_Full 全分组 重度用户使用 (与Github同步)`,value:`https://raw.githubusercontent.com/ACL4SSR/ACL4SSR/master/Clash/config/ACL4SSR_Online_Full.ini`},{label:`ACL4SSR_Online_Full_NoAuto.ini 全分组 无自动测速 重度用户使用 (与Github同步)`,value:`https://raw.githubusercontent.com/ACL4SSR/ACL4SSR/master/Clash/config/ACL4SSR_Online_Full_NoAuto.ini`},{label:`ACL4SSR_Online_Full_AdblockPlus 全分组 重度用户使用 更多去广告 (与Github同步)`,value:`https://raw.githubusercontent.com/ACL4SSR/ACL4SSR/master/Clash/config/ACL4SSR_Online_Full_AdblockPlus.ini`},{label:`ACL4SSR_Online_Full_Netflix 全分组 重度用户使用 奈飞全量 (与Github同步)`,value:`https://raw.githubusercontent.com/ACL4SSR/ACL4SSR/master/Clash/config/ACL4SSR_Online_Full_Netflix.ini`}])}function rt(e,t){if(!t.SHORT_URL_ENABLED)return[];let{origin:n}=new URL(e.url);return[{label:n,value:n}]}function it(){return[{label:`Clash`,value:`clash`},{label:`Sing-box`,value:`singbox`},{label:`v2ray`,value:`v2ray`}]}var at=class e{static#e=[{label:`中国香港`,value:`ZH_HK`,rules:`港|HK|Hong Kong|HongKong|HKG`},{label:`中国台湾`,value:`ZH_TW`,rules:`台|新北|彰化|TW|Taiwan|TPE|KHH`},{label:`中国澳门`,value:`ZH_MO`,rules:`澳|MAC|Macao|macau|MACAU`},{label:`韩国`,value:`KR`,rules:`KR|Korea|KOR|Seoul|首尔|春川|韩|韓|ICN`},{label:`日本`,value:`JP`,rules:`日本|川日|东京|大阪|泉日|埼玉|沪日|深日|[^-]日|JP|Japan|Tokyo|NRT|KIX`},{label:`新加坡`,value:`SG`,rules:`新加坡|坡|狮城|SG|Singapore|SIN`},{label:`美国`,value:`US`,rules:`美|波特兰|达拉斯|俄勒冈|凤凰城|费利蒙|硅谷|拉斯维加斯|洛杉矶|圣何塞|圣克拉拉|西雅图|芝加哥|US|United States|ATL|BUF|DFW|EWR|IAD|LAX|MCI|MIA|ORD|PHX|PDX|SEA|SJC`}];static#t=null;static#n(e){let t=e.split(`|`).map(e=>/^[A-Z0-9][A-Z0-9 ]*$/i.test(e)?`\\b${e}\\b`:e).join(`|`);return new RegExp(t,`i`)}static#r(){return e.#t||=e.#e.map(t=>({value:t.value,regexp:e.#n(t.rules)})),e.#t}getTag(t){if(!t)return null;let n=decodeURIComponent(t);for(let{value:t,regexp:r}of e.#r())if(r.test(n))return t;return null}get excludeRules(){return e.#e}};function ot(){return new at().excludeRules.map(e=>({label:e.label,value:e.value}))}function st(e,t){if(e.length!==t.length)return!1;let n=0;for(let r=0;r<e.length;r++)n|=e.charCodeAt(r)^t.charCodeAt(r);return n===0}function ct(e){return e.SHORT_URL_KEY?.trim()||null}function lt(){return`
        <script>
            class SubButton extends HTMLElement {
                static get observedAttributes() {
                    return ['disabled', 'readonly', 'type'];
                }

                constructor() {
                    super();
                    this.attachShadow({ mode: 'open' });
                    this.#render();
                }

                #injectStyle() {
                    const style = document.createElement('style');
                    style.textContent = \`
                        :host {
                            display: inline-block;
                        }

                        .sub-button {
                            position: relative;
                            display: inline-flex;
                            align-items: center;
                            justify-content: center;
                            padding: 4px 15px;
                            font-size: 14px;
                            border-radius: var(--radius);
                            border: 1px solid var(--border-color);
                            background: var(--background);
                            color: var(--text-primary);
                            cursor: pointer;
                            transition: all 0.2s cubic-bezier(0.645, 0.045, 0.355, 1);
                            user-select: none;
                            height: 32px;
                            min-width: 88px;
                            white-space: nowrap;
                            gap: 6px;
                        }

                        .sub-button:not(:disabled):not([readonly]):hover {
                            color: var(--primary-color);
                            border-color: var(--primary-color);
                        }

                        .sub-button:not(:disabled):not([readonly]):active {
                            opacity: 0.8;
                        }

                        .sub-button[type="primary"] {
                            background: var(--primary-color);
                            border-color: var(--primary-color);
                            color: #fff;
                        }

                        .sub-button[type="primary"]:not(:disabled):not([readonly]):hover {
                            background: var(--primary-hover);
                            border-color: var(--primary-hover);
                            color: #fff;
                        }

                        .sub-button:disabled,
                        .sub-button[readonly] {
                            cursor: not-allowed;
                            background-color: var(--background-disabled);
                            border-color: var(--border-color);
                            color: var(--text-disabled);
                        }

                        /* 波纹效果 */
                        .sub-button::after {
                            content: '';
                            position: absolute;
                            inset: -1px;
                            border-radius: inherit;
                            opacity: 0;
                            transition: all 0.2s;
                            background-color: var(--primary-color);
                        }

                        .sub-button:not(:disabled):not([readonly]):active::after {
                            opacity: 0.1;
                            transition: 0s;
                        }

                        /* 图标样式 */
                        ::slotted(svg) {
                            width: 16px;
                            height: 16px;
                            fill: currentColor;
                        }
                    \`;
                    this.shadowRoot.appendChild(style);
                }

                #injectElement() {
                    const button = document.createElement('button');
                    button.className = 'sub-button';

                    // 添加插槽
                    const slot = document.createElement('slot');
                    button.appendChild(slot);

                    this.shadowRoot.appendChild(button);
                }

                #render() {
                    this.#injectStyle();
                    this.#injectElement();
                }

                attributeChangedCallback(name, oldValue, newValue) {
                    if (oldValue === newValue) return;

                    const button = this.shadowRoot.querySelector('.sub-button');
                    if (!button) return;

                    switch (name) {
                        case 'disabled':
                            button.disabled = this.hasAttribute('disabled');
                            break;
                        case 'readonly':
                            button.setAttribute('readonly', '');
                            break;
                        case 'type':
                            button.setAttribute('type', newValue);
                            break;
                    }
                }
            }

            customElements.define('sub-button', SubButton);
        <\/script>
    `}function ut(){return`
    <script>
        class SubForm extends HTMLElement {
            static get observedAttributes() {
                return ['model', 'label-width'];
            }

            constructor() {
                super();
                this.attachShadow({ mode: 'open' });
                this.model = {};
            }

            attributeChangedCallback(name, oldValue, newValue) {
                if (name === 'model' && oldValue !== newValue) {
                    try {
                        this.model = JSON.parse(newValue);
                        // 更新所有子组件的值
                        this.#updateChildrenValues();
                    } catch (e) {
                        console.error('Invalid model:', e);
                    }
                }
            }

            #updateChildrenValues() {
                // 找到所有带有 key 属性的子组件
                this.querySelectorAll('[key]').forEach(child => {
                    const key = child.getAttribute('key');
                    if (key && this.model[key] !== undefined) {
                        // 根据值的类型设置不同的格式
                        if (Array.isArray(this.model[key])) {
                            child.setAttribute('value', JSON.stringify(this.model[key]));
                        } else {
                            child.setAttribute('value', this.model[key]);
                        }
                    }
                });
            }

            connectedCallback() {
                const modelStr = this.getAttribute('model');
                if (modelStr) {
                    this.model = JSON.parse(modelStr);
                }

                this.addEventListener('update:value', e => {
                    const key = e.target.getAttribute('key');
                    if (key && this.model) {
                        this.model[key] = e.detail.value;
                        this.dispatchEvent(
                            new CustomEvent('form:change', {
                                detail: {
                                    key,
                                    value: e.detail.value,
                                    formData: this.model
                                },
                                bubbles: true
                            })
                        );
                    }
                });

                this.#render();
            }

            #injectStyle() {
                const style = document.createElement('style');
                const labelWidth = this.getAttribute('label-width') || '80px';
                style.textContent = \`
                    :host {
                        display: block;
                    }
                    form {
                        margin: 0;
                        padding: 0;
                    }
                    ::slotted(sub-form-item) {
                        --label-width: \${labelWidth};
                    }
                \`;
                this.shadowRoot.appendChild(style);
            }

            #injectElement() {
                const form = document.createElement('form');
                const slot = document.createElement('slot');
                form.appendChild(slot);
                this.shadowRoot.appendChild(form);

                this.#bindEvents(form);
            }

            #bindEvents(form) {
                form.addEventListener('submit', e => {
                    e.preventDefault();
                    if (this.validate()) {
                        this.dispatchEvent(
                            new CustomEvent('submit', {
                                detail: this.getFormData(),
                                bubbles: true
                            })
                        );
                    }
                });
            }

            #render() {
                this.#injectStyle();
                this.#injectElement();
                this.#bindEvents(this.shadowRoot.querySelector('form'));
            }
        }
        customElements.define('sub-form', SubForm);
    <\/script>
    `}function dt(){return`
    <script>
        class SubFormItem extends HTMLElement {
            constructor() {
                super();
                this.attachShadow({ mode: 'open' });
            }

            connectedCallback() {
                this.#render();
            }

            #render() {
                const style = document.createElement('style');
                style.textContent = \`
                    :host {
                        display: block;
                        margin-bottom: 24px;
                    }
                    .sub-form-item {
                        display: flex;
                        align-items: flex-start;
                        position: relative;
                    }
                    .sub-form-item__label {
                        flex: 0 0 auto;
                        width: var(--label-width, 80px);
                        text-align: right;
                        padding: 6px 12px 0 0;
                        color: var(--text-secondary);
                        font-size: 14px;
                        line-height: 20px;
                        font-weight: 500;
                        transition: var(--transition);
                        white-space: nowrap;
                        overflow: hidden;
                        text-overflow: ellipsis;
                    }
                    .sub-form-item__content {
                        flex: 1;
                        min-width: 0;
                        position: relative;
                        transition: var(--transition);
                    }
                    .sub-form-item__label.required::before {
                        content: '*';
                        color: #ff4d4f;
                        margin-right: 4px;
                    }
                    :host([disabled]) .sub-form-item__label {
                        color: var(--text-disabled);
                    }
                    :host([error]) .sub-form-item__label {
                        color: #ff4d4f;
                    }
                \`;

                const template = document.createElement('div');
                template.className = 'sub-form-item';

                const label = document.createElement('label');
                label.className = 'sub-form-item__label';
                label.textContent = this.getAttribute('label') || '';

                const content = document.createElement('div');
                content.className = 'sub-form-item__content';
                content.appendChild(document.createElement('slot'));

                template.appendChild(label);
                template.appendChild(content);

                this.shadowRoot.appendChild(style);
                this.shadowRoot.appendChild(template);
            }
        }
        customElements.define('sub-form-item', SubFormItem);
    <\/script>
    `}function ft(){return`
        <style>
            /* 添加通知组件样式 */
            .notification-container {
                position: fixed;
                top: 8px;
                left: 50%;
                transform: translateX(-50%);
                z-index: 9999;
                display: flex;
                flex-direction: column;
                align-items: center;
                pointer-events: none;
            }

            .notification {
                padding: 9px 12px;
                margin-bottom: 8px;
                border-radius: 4px;
                background: var(--background);
                box-shadow: 0 6px 16px 0 rgba(0, 0, 0, 0.08), 0 3px 6px -4px rgba(0, 0, 0, 0.12), 0 9px 28px 8px rgba(0, 0, 0, 0.05);
                display: inline-flex;
                align-items: center;
                gap: 8px;
                pointer-events: auto;
                animation: messageMove 0.3s cubic-bezier(0.645, 0.045, 0.355, 1);
            }

            .notification-icon {
                font-size: 16px;
                line-height: 1;
            }

            .notification.success .notification-icon {
                color: #52c41a;
            }

            .notification.error .notification-icon {
                color: #ff4d4f;
            }

            .notification.info .notification-icon {
                color: var(--primary-color);
            }

            .notification-content {
                color: var(--text-primary);
                font-size: 14px;
                line-height: 1.5;
            }

            @keyframes messageMove {
                0% {
                    padding: 6px 12px;
                    opacity: 0;
                    transform: translateY(-100%);
                }
                100% {
                    padding: 9px 12px;
                    opacity: 1;
                    transform: translateY(0);
                }
            }
        </style>


        <script>
            class SubNotification {
                static instance = null;

                constructor() {
                    if (SubNotification.instance) {
                        return SubNotification.instance;
                    }
                    this.init();
                    SubNotification.instance = this;
                }

                init() {
                    const container = document.createElement('div');
                    container.className = 'notification-container';
                    document.body.appendChild(container);
                    this.container = container;
                }

                show(message, type = 'info', duration = 3000) {
                    const notification = document.createElement('div');
                    notification.className = \`notification \${type}\`;

                    // 添加图标
                    const icon = document.createElement('span');
                    icon.className = 'notification-icon';
                    icon.innerHTML = this.#getIconByType(type);

                    const content = document.createElement('span');
                    content.className = 'notification-content';
                    content.textContent = message;

                    notification.appendChild(icon);
                    notification.appendChild(content);
                    this.container.appendChild(notification);

                    const close = () => {
                        notification.style.opacity = '0';
                        notification.style.transform = 'translateY(-100%)';
                        notification.style.transition = 'all .3s cubic-bezier(.645,.045,.355,1)';
                        setTimeout(() => {
                            this.container.removeChild(notification);
                        }, 300);
                    };

                    if (duration > 0) {
                        setTimeout(close, duration);
                    }
                }

                static success(message, duration = 3000) {
                    if (!this.instance) {
                        new SubNotification();
                    }
                    this.instance.show(message, 'success', duration);
                }

                static error(message, duration = 3000) {
                    if (!this.instance) {
                        new SubNotification();
                    }
                    this.instance.show(message, 'error', duration);
                }

                static info(message, duration = 3000) {
                    if (!this.instance) {
                        new SubNotification();
                    }
                    this.instance.show(message, 'info', duration);
                }

                #getIconByType(type) {
                    const icons = {
                        success: \`<svg viewBox="64 64 896 896" width="1em" height="1em">
                            <path d="M512 64C264.6 64 64 264.6 64 512s200.6 448 448 448 448-200.6 448-448S759.4 64 512 64zm193.5 301.7l-210.6 292a31.8 31.8 0 01-51.7 0L318.5 484.9c-3.8-5.3 0-12.7 6.5-12.7h46.9c10.2 0 19.9 4.9 25.9 13.3l71.2 98.8 157.2-218c6-8.3 15.6-13.3 25.9-13.3H699c6.5 0 10.3 7.4 6.5 12.7z" fill="currentColor"/>
                        </svg>\`,
                        error: \`<svg viewBox="64 64 896 896" width="1em" height="1em">
                            <path d="M512 64C264.6 64 64 264.6 64 512s200.6 448 448 448 448-200.6 448-448S759.4 64 512 64zm165.4 618.2l-66-.3L512 563.4l-99.3 118.4-66.1.3c-4.4 0-8-3.5-8-8 0-1.9.7-3.7 1.9-5.2l130.1-155L340.5 359a8.32 8.32 0 01-1.9-5.2c0-4.4 3.6-8 8-8l66.1.3L512 464.6l99.3-118.4 66-.3c4.4 0 8 3.5 8 8 0 1.9-.7 3.7-1.9 5.2L553.5 514l130 155c1.2 1.5 1.9 3.3 1.9 5.2 0 4.4-3.6 8-8 8z" fill="currentColor"/>
                        </svg>\`,
                        info: \`<svg viewBox="64 64 896 896" width="1em" height="1em">
                            <path d="M512 64C264.6 64 64 264.6 64 512s200.6 448 448 448 448-200.6 448-448S759.4 64 512 64zm32 664c0 4.4-3.6 8-8 8h-48c-4.4 0-8-3.6-8-8V456c0-4.4 3.6-8 8-8h48c4.4 0 8 3.6 8 8v272zm-32-344a48.01 48.01 0 010-96 48.01 48.01 0 010 96z" fill="currentColor"/>
                        </svg>\`
                    };
                    return icons[type] || icons.info;
                }
            }

            // 添加到全局
            window.notification = SubNotification;
        <\/script>
    
    
    `}function pt(){return`
    <script>
        class SubModal extends HTMLElement {
            static get observedAttributes() {
                return ['open', 'title'];
            }

            #onKeydown;

            constructor() {
                super();
                this.attachShadow({ mode: 'open' });
                this.#onKeydown = e => {
                    if (e.key === 'Escape' && this.open) this.#close();
                };
                this.#render();
            }

            connectedCallback() {
                this.#syncOpen();
                this.#syncTitle();
            }

            attributeChangedCallback(name, oldValue, newValue) {
                if (oldValue === newValue) return;
                if (name === 'open') this.#syncOpen();
                if (name === 'title') this.#syncTitle();
            }

            get open() {
                return this.hasAttribute('open');
            }

            set open(value) {
                if (value) {
                    this.setAttribute('open', '');
                } else {
                    this.removeAttribute('open');
                }
            }

            #injectStyle() {
                const style = document.createElement('style');
                style.textContent = \`
                    :host {
                        display: none;
                    }
                    :host([open]) {
                        display: block;
                    }
                    .sub-modal__mask {
                        position: fixed;
                        inset: 0;
                        z-index: 1000;
                        background: rgba(0, 0, 0, 0.45);
                        display: flex;
                        align-items: center;
                        justify-content: center;
                        padding: 24px;
                        box-sizing: border-box;
                    }
                    .sub-modal__panel {
                        width: min(520px, 100%);
                        max-height: min(80vh, 640px);
                        overflow: auto;
                        background: var(--background);
                        color: var(--text-primary);
                        border: 1px solid var(--border-color);
                        border-radius: var(--radius);
                        box-shadow: 0 8px 24px rgba(0, 0, 0, 0.2);
                    }
                    .sub-modal__header {
                        display: flex;
                        align-items: center;
                        justify-content: space-between;
                        gap: 12px;
                        padding: 14px 16px;
                        border-bottom: 1px solid var(--border-color);
                    }
                    .sub-modal__title {
                        font-size: 16px;
                        font-weight: 600;
                        color: var(--text-primary);
                    }
                    .sub-modal__close {
                        appearance: none;
                        border: none;
                        background: transparent;
                        color: var(--text-secondary, var(--text-primary));
                        cursor: pointer;
                        font-size: 18px;
                        line-height: 1;
                        padding: 4px 6px;
                        border-radius: var(--radius);
                    }
                    .sub-modal__close:hover {
                        color: var(--primary-color);
                    }
                    .sub-modal__body {
                        padding: 16px;
                    }
                    .sub-modal__footer {
                        display: flex;
                        justify-content: flex-end;
                        align-items: center;
                        gap: 10px;
                        padding: 12px 16px 16px;
                    }
                    .sub-modal__footer:empty {
                        display: none;
                    }
                \`;
                this.shadowRoot.appendChild(style);
            }

            #injectElement() {
                const mask = document.createElement('div');
                mask.className = 'sub-modal__mask';
                mask.innerHTML = \`
                    <div class="sub-modal__panel" role="dialog" aria-modal="true">
                        <div class="sub-modal__header">
                            <div class="sub-modal__title"></div>
                            <button type="button" class="sub-modal__close" aria-label="关闭">×</button>
                        </div>
                        <div class="sub-modal__body">
                            <slot></slot>
                        </div>
                        <div class="sub-modal__footer">
                            <slot name="footer"></slot>
                        </div>
                    </div>
                \`;
                this.shadowRoot.appendChild(mask);

                mask.addEventListener('click', e => {
                    if (e.target === mask) this.#close();
                });
                mask.querySelector('.sub-modal__close').addEventListener('click', () => this.#close());
                mask.querySelector('.sub-modal__panel').addEventListener('click', e => e.stopPropagation());
            }

            #close() {
                this.open = false;
                this.dispatchEvent(
                    new CustomEvent('modal:close', {
                        bubbles: true
                    })
                );
            }

            #syncOpen() {
                const isOpen = this.hasAttribute('open');
                if (isOpen) {
                    document.addEventListener('keydown', this.#onKeydown);
                    this.dispatchEvent(
                        new CustomEvent('modal:open', {
                            bubbles: true
                        })
                    );
                } else {
                    document.removeEventListener('keydown', this.#onKeydown);
                }
            }

            #syncTitle() {
                const titleEl = this.shadowRoot.querySelector('.sub-modal__title');
                if (titleEl) {
                    titleEl.textContent = this.getAttribute('title') || '';
                }
            }

            #render() {
                this.#injectStyle();
                this.#injectElement();
            }

            disconnectedCallback() {
                document.removeEventListener('keydown', this.#onKeydown);
            }
        }
        customElements.define('sub-modal', SubModal);
    <\/script>
    `}function mt(){return`
    <script>
        class SubTable extends HTMLElement {
            static get observedAttributes() {
                return ['columns', 'data', 'row-key', 'empty-text', 'loading', 'actions'];
            }

            constructor() {
                super();
                this.attachShadow({ mode: 'open' });
                this.state = {
                    columns: [],
                    data: [],
                    actions: [],
                    rowKey: 'id',
                    emptyText: '暂无数据',
                    loading: false
                };
                this.#render();
            }

            #parseJson(value, fallback) {
                if (!value) return fallback;
                try {
                    return JSON.parse(value);
                } catch (e) {
                    console.error('Invalid JSON for sub-table:', e);
                    return fallback;
                }
            }

            #syncFromAttributes() {
                this.state.columns = this.#parseJson(this.getAttribute('columns'), []);
                this.state.data = this.#parseJson(this.getAttribute('data'), []);
                this.state.actions = this.#parseJson(this.getAttribute('actions'), []);
                this.state.rowKey = this.getAttribute('row-key') || 'id';
                this.state.emptyText = this.getAttribute('empty-text') || '暂无数据';
                this.state.loading = this.hasAttribute('loading');
            }

            connectedCallback() {
                this.#syncFromAttributes();
                this.#updateBody();
            }

            attributeChangedCallback(name, oldValue, newValue) {
                if (oldValue === newValue) return;
                this.#syncFromAttributes();
                this.#updateBody();
            }

            #injectStyle() {
                const style = document.createElement('style');
                style.textContent = \`
                    :host {
                        display: block;
                        width: 100%;
                        height: 100%;
                        min-height: 0;
                        font-size: 14px;
                        color: var(--text-primary);
                    }
                    .sub-table {
                        width: 100%;
                        height: 100%;
                        border: 1px solid var(--border-color);
                        border-radius: var(--radius);
                        overflow: auto;
                        background: var(--background);
                        box-sizing: border-box;
                    }
                    table {
                        width: 100%;
                        border-collapse: collapse;
                        table-layout: fixed;
                    }
                    thead th {
                        text-align: left;
                        padding: 10px 12px;
                        background: var(--background-secondary, var(--background));
                        border-bottom: 1px solid var(--border-color);
                        color: var(--text-secondary, var(--text-primary));
                        font-weight: 600;
                        white-space: nowrap;
                        position: sticky;
                        top: 0;
                        z-index: 1;
                    }
                    tbody td {
                        padding: 10px 12px;
                        border-bottom: 1px solid var(--border-color);
                        color: var(--text-primary);
                        vertical-align: middle;
                    }
                    tbody tr:last-child td {
                        border-bottom: none;
                    }
                    tbody tr:hover td {
                        background: var(--background-secondary, rgba(127,127,127,0.08));
                    }
                    .ellipsis {
                        overflow: hidden;
                        text-overflow: ellipsis;
                        white-space: nowrap;
                    }
                    .actions {
                        display: flex;
                        align-items: center;
                        gap: 8px;
                        flex-wrap: wrap;
                    }
                    .action-btn {
                        appearance: none;
                        background: transparent;
                        border: none;
                        padding: 0;
                        color: var(--primary-color);
                        cursor: pointer;
                        font-size: 14px;
                        line-height: 1.4;
                    }
                    .action-btn:hover {
                        opacity: 0.8;
                    }
                    .action-btn.danger {
                        color: #ff4d4f;
                    }
                    .empty,
                    .loading {
                        padding: 28px 12px;
                        text-align: center;
                        color: var(--text-secondary, var(--text-disabled));
                    }
                \`;
                this.shadowRoot.appendChild(style);
            }

            #injectElement() {
                const root = document.createElement('div');
                root.className = 'sub-table';
                root.innerHTML = \`
                    <table>
                        <thead><tr></tr></thead>
                        <tbody></tbody>
                    </table>
                    <div class="empty" hidden></div>
                    <div class="loading" hidden>加载中...</div>
                \`;
                this.shadowRoot.appendChild(root);
                root.addEventListener('click', e => {
                    const btn = e.target.closest('[data-action]');
                    if (!btn) return;
                    const action = btn.getAttribute('data-action');
                    const rowKey = btn.getAttribute('data-row-key');
                    const row = this.state.data.find(item => String(item[this.state.rowKey]) === String(rowKey));
                    if (!row) return;
                    this.dispatchEvent(
                        new CustomEvent('table:action', {
                            detail: { action, row, rowKey },
                            bubbles: true
                        })
                    );
                });
            }

            #updateBody() {
                const table = this.shadowRoot.querySelector('table');
                const theadRow = this.shadowRoot.querySelector('thead tr');
                const tbody = this.shadowRoot.querySelector('tbody');
                const empty = this.shadowRoot.querySelector('.empty');
                const loading = this.shadowRoot.querySelector('.loading');
                if (!table || !theadRow || !tbody || !empty || !loading) return;

                theadRow.innerHTML = '';
                this.state.columns.forEach(col => {
                    const th = document.createElement('th');
                    th.textContent = col.title || '';
                    if (col.width) th.style.width = col.width;
                    theadRow.appendChild(th);
                });

                tbody.innerHTML = '';
                if (this.state.loading) {
                    table.hidden = true;
                    empty.hidden = true;
                    loading.hidden = false;
                    return;
                }

                loading.hidden = true;
                if (!this.state.data.length) {
                    table.hidden = true;
                    empty.hidden = false;
                    empty.textContent = this.state.emptyText;
                    return;
                }

                table.hidden = false;
                empty.hidden = true;

                this.state.data.forEach(row => {
                    const tr = document.createElement('tr');
                    const rowKey = row[this.state.rowKey];
                    this.state.columns.forEach(col => {
                        const td = document.createElement('td');
                        if (col.type === 'actions') {
                            const wrap = document.createElement('div');
                            wrap.className = 'actions';
                            this.state.actions.forEach(action => {
                                const btn = document.createElement('button');
                                btn.type = 'button';
                                btn.className = action.danger ? 'action-btn danger' : 'action-btn';
                                btn.textContent = action.label || action.key;
                                btn.setAttribute('data-action', action.key);
                                btn.setAttribute('data-row-key', String(rowKey));
                                wrap.appendChild(btn);
                            });
                            td.appendChild(wrap);
                        } else {
                            const text = row[col.key] == null ? '' : String(row[col.key]);
                            td.textContent = text;
                            td.title = text;
                            if (col.ellipsis) td.classList.add('ellipsis');
                        }
                        if (col.width) td.style.width = col.width;
                        tr.appendChild(td);
                    });
                    tbody.appendChild(tr);
                });
            }

            #render() {
                this.#injectStyle();
                this.#injectElement();
            }
        }
        customElements.define('sub-table', SubTable);
    <\/script>
    `}function ht(){return`
    <script>
        class SubTextarea extends HTMLElement {
            static get observedAttributes() {
                return ['value', 'placeholder', 'disabled', 'rows', 'key'];
            }

            constructor() {
                super();
                this.attachShadow({ mode: 'open' });
                this.state = {
                    value: this.getAttribute('value') || ''
                };
                this.#render();
            }

            #injectStyle() {
                const style = document.createElement('style');
                style.textContent = \`
                    :host {
                        display: inline-block;
                        width: 100%;
                        vertical-align: bottom;
                        font-size: 14px;
                    }
                    .sub-textarea {
                        position: relative;
                        display: inline-block;
                        width: 100%;
                    }
                    .sub-textarea__inner {
                        display: block;
                        resize: vertical;
                        padding: 5px 15px;
                        line-height: 1.5;
                        box-sizing: border-box;
                        width: 100%;
                        font-size: inherit;
                        color: var(--text-primary);
                        background-color: var(--background);
                        background-image: none;
                        border: 1px solid var(--border-color);
                        border-radius: var(--radius);
                        transition: border-color 0.2s cubic-bezier(0.645, 0.045, 0.355, 1);
                        font-family: inherit;
                    }
                    .sub-textarea__inner:hover {
                        border-color: var(--border-hover);
                    }
                    .sub-textarea__inner:focus {
                        outline: none;
                        border-color: var(--primary-color);
                        box-shadow: 0 0 0 2px var(--shadow);
                    }
                    .sub-textarea__inner::placeholder {
                        color: var(--text-secondary);
                    }
                    .sub-textarea__inner:disabled {
                        background-color: var(--background-disabled);
                        border-color: var(--border-color);
                        color: var(--text-disabled);
                        cursor: not-allowed;
                    }
                \`;
                this.shadowRoot.appendChild(style);
            }

            #injectElement() {
                const wrapper = document.createElement('div');
                wrapper.className = 'sub-textarea';

                const textarea = document.createElement('textarea');
                textarea.className = 'sub-textarea__inner';
                textarea.value = this.state.value;
                textarea.placeholder = this.getAttribute('placeholder') || '';
                textarea.rows = this.getAttribute('rows') || 2;
                textarea.disabled = this.hasAttribute('disabled');

                wrapper.appendChild(textarea);
                this.shadowRoot.appendChild(wrapper);

                this.#bindEvents(textarea);
            }

            #bindEvents(textarea) {
                textarea.addEventListener('input', e => {
                    this.state.value = e.target.value;
                    // 触发原生事件
                    this.dispatchEvent(new Event('input', { bubbles: true }));
                    this.dispatchEvent(new Event('change', { bubbles: true }));
                    // 触发自定义事件
                    this.dispatchEvent(
                        new CustomEvent('update:value', {
                            detail: {
                                value: e.target.value
                            },
                            bubbles: true
                        })
                    );
                });
            }

            #render() {
                this.#injectStyle();
                this.#injectElement();
            }

            // 提供 value 的 getter/setter
            get value() {
                return this.state.value;
            }

            set value(val) {
                if (val !== this.state.value) {
                    this.state.value = val;
                    const textarea = this.shadowRoot.querySelector('textarea');
                    if (textarea) {
                        textarea.value = val;
                    }
                }
            }

            attributeChangedCallback(name, oldValue, newValue) {
                if (oldValue === newValue) return;

                const textarea = this.shadowRoot.querySelector('textarea');
                if (!textarea) return;

                switch (name) {
                    case 'value':
                        this.value = newValue;
                        break;
                    case 'placeholder':
                        textarea.placeholder = newValue;
                        break;
                    case 'disabled':
                        textarea.disabled = this.hasAttribute('disabled');
                        break;
                    case 'rows':
                        textarea.rows = newValue;
                        break;
                }
            }
        }
        customElements.define('sub-textarea', SubTextarea);
    <\/script>
    `}function gt(e,t){let n=t.SHORT_URL_ENABLED===!0,r=ct(t)!==null,i=`
    <!DOCTYPE html>
        <html lang="zh-CN" class="short-url-page">
            <head>
                <meta charset="UTF-8" />
                <meta name="viewport" content="width=device-width, initial-scale=1.0" />
                <title>短链管理</title>
                <link rel="preconnect" href="https://fonts.googleapis.com" />
                <link rel="preconnect" href="https://fonts.gstatic.com" crossorigin />
                <style>
                    /*
                     * 主题变量：与首页（subconvert 转换页）保持一致的设计令牌。
                     * 通过 body.light-mode / body.dark-mode 切换。
                     */
                    body.light-mode .subconverter-page {
                        --page-surface: #d8e0e5;
                        --page-grid: rgba(51, 65, 85, 0.05);
                        --bg: rgba(241, 245, 247, 0.84);
                        --panel: rgba(246, 249, 250, 0.92);
                        --soft: #e5ecef;
                        --text: #000;
                        --muted: rgba(15, 23, 42, 0.66);
                        --line: rgba(51, 65, 85, 0.12);
                        --accent: #2f6f68;
                        --accent-strong: #4e708b;
                        --accent-fog: rgba(78, 112, 139, 0.12);
                        --accent-ring: rgba(78, 112, 139, 0.16);
                        --accent-outline: rgba(78, 112, 139, 0.42);
                        --shadow: 0 24px 56px rgba(51, 65, 85, 0.12);
                    }

                    body.dark-mode .subconverter-page {
                        --page-surface: transparent;
                        --page-grid: rgba(148, 163, 184, 0.05);
                        --bg: rgba(7, 16, 30, 0.78);
                        --panel: rgba(8, 20, 38, 0.92);
                        --soft: rgba(15, 23, 42, 0.7);
                        --text: #f8fbff;
                        --muted: rgba(226, 232, 240, 0.7);
                        --line: rgba(148, 163, 184, 0.16);
                        --accent: #38bdf8;
                        --accent-strong: #67e8f9;
                        --accent-fog: rgba(56, 189, 248, 0.16);
                        --accent-ring: rgba(56, 189, 248, 0.14);
                        --accent-outline: rgba(56, 189, 248, 0.45);
                        --shadow: 0 30px 80px rgba(2, 6, 23, 0.52);
                    }

                    /*
                     * 将旧设计系统（sub-* 组件）使用的令牌映射到首页主题令牌，
                     * 使 sub-table / sub-modal / sub-button / sub-form 等组件一套皮肤。
                     */
                    .subconverter-page {
                        --background: var(--bg);
                        --background-primary: var(--panel);
                        --background-secondary: var(--soft);
                        --background-disabled: var(--soft);
                        --border-color: var(--line);
                        --border-hover: var(--accent-outline);
                        --text-primary: var(--text);
                        --text-secondary: var(--muted);
                        --text-disabled: var(--muted);
                        --primary-color: var(--accent);
                        --primary-hover: var(--accent-strong);
                        --primary-active: var(--accent);
                        --shadow: rgba(2, 6, 23, 0.4);
                        --radius: 12px;
                        --transition: all 0.2s cubic-bezier(0.645, 0.045, 0.355, 1);
                    }

                    * { box-sizing: border-box; }

                    /* 移除点击/聚焦时的浏览器默认蓝色焦点框 */
                    button:focus, a:focus, input:focus, textarea:focus, select:focus, [tabindex]:focus { outline: none; }

                    html, body { margin: 0; padding: 0; }
                    body.light-mode, body.dark-mode {
                        background: var(--page-surface, #0b1120);
                        font-family: "Noto Sans SC", -apple-system, BlinkMacSystemFont, "Segoe UI", "PingFang SC", "Microsoft YaHei", sans-serif;
                    }

                    .subconverter-page {
                        position: relative;
                        min-height: 100vh;
                        padding: 28px 18px 104px;
                        color: var(--text);
                        overflow-x: hidden;
                        background-color: var(--page-surface, #0b1120);
                        background-image:
                            linear-gradient(var(--page-grid, rgba(148,163,184,0.05)) 1px, transparent 1px),
                            linear-gradient(90deg, var(--page-grid, rgba(148,163,184,0.05)) 1px, transparent 1px);
                        background-size: 24px 24px;
                        transition: background-color 0.3s ease;
                    }

                    .subconverter-glow {
                        position: absolute;
                        border-radius: 999px;
                        filter: blur(18px);
                        pointer-events: none;
                    }
                    .subconverter-glow--one { left: -120px; top: 20px; width: 320px; height: 320px; background: radial-gradient(circle, rgba(34,211,238,0.24) 0, rgba(34,211,238,0) 72%); }
                    .subconverter-glow--two { right: -120px; bottom: 40px; width: 360px; height: 360px; background: radial-gradient(circle, rgba(16,185,129,0.18) 0, rgba(16,185,129,0) 72%); }
                    body.light-mode .subconverter-glow { display: none; }

                    .subconverter-topbar {
                        position: relative;
                        z-index: 2;
                        max-width: 1032px;
                        margin: 0 auto 0;
                        padding: 0 16px;
                        display: flex;
                        justify-content: space-between;
                        align-items: center;
                        gap: 12px;
                    }
                    .subconverter-topbar__link {
                        color: var(--muted);
                        font-size: 13px;
                        font-weight: 600;
                        text-decoration: none;
                        padding: 8px 12px;
                        border: 1px solid var(--line);
                        border-radius: 12px;
                        background: var(--bg);
                        transition: color 0.18s ease, border-color 0.18s ease;
                    }
                    .subconverter-topbar__link:hover { color: var(--accent); border-color: var(--accent-outline); }

                    .subconverter-theme-btn {
                        display: inline-flex;
                        align-items: center;
                        justify-content: center;
                        width: 38px;
                        height: 38px;
                        border: 1px solid var(--line);
                        border-radius: 12px;
                        background: var(--bg);
                        color: var(--text);
                        cursor: pointer;
                        font-size: 20px;
                        font-family: ui-monospace, monospace;
                        font-weight: 700;
                        line-height: 1;
                        transition: color 0.18s ease, border-color 0.18s ease;
                    }
                    .subconverter-theme-btn:hover { color: var(--accent); border-color: var(--accent-outline); }

                    .subconverter-layout {
                        position: relative;
                        z-index: 1;
                        width: 100%;
                        max-width: 1032px;
                        margin: 18px auto 0;
                        padding: 16px;
                    }

                    .subconverter-card {
                        border: 1px solid var(--line);
                        border-radius: 28px;
                        background: var(--bg);
                        box-shadow: var(--shadow);
                        backdrop-filter: blur(18px) saturate(180%);
                        overflow: hidden;
                    }
                    .subconverter-card__header {
                        padding: 28px 28px 20px;
                        border-bottom: 1px solid var(--line);
                    }
                    .subconverter-card__body { padding: 22px 28px 28px; }

                    .subconverter-hero { display: flex; flex-direction: column; gap: 10px; }
                    .subconverter-hero__eyebrow {
                        display: inline-flex;
                        font: 700 12px/1 "Space Grotesk", "Noto Sans SC", sans-serif;
                        letter-spacing: 0.24em;
                        text-transform: uppercase;
                        color: var(--accent);
                    }
                    .short-url-titlebar {
                        display: flex;
                        justify-content: space-between;
                        align-items: center;
                        gap: 16px;
                        flex-wrap: wrap;
                    }
                    .short-url-title {
                        margin: 0;
                        font: 700 30px/1.1 "Space Grotesk", "Noto Sans SC", sans-serif;
                        letter-spacing: -0.02em;
                        color: var(--text);
                    }
                    .short-url-desc { margin: 8px 0 0; color: var(--muted); font-size: 14px; line-height: 1.7; }

                    .short-url-toolbar { margin: 0 0 18px; display: flex; justify-content: flex-end; }

                    /* 分页 */
                    .short-url-pagination {
                        display: flex;
                        align-items: center;
                        justify-content: flex-end;
                        gap: 8px;
                        margin-top: 18px;
                        flex-wrap: wrap;
                    }
                    .short-url-pagination span { color: var(--muted); font-size: 13px; }
                    .short-url-pagination button {
                        padding: 6px 14px;
                        border: 1px solid var(--line);
                        border-radius: 10px;
                        background: var(--panel);
                        color: var(--text);
                        font-size: 13px;
                        font-weight: 600;
                        cursor: pointer;
                        transition: color 0.18s ease, border-color 0.18s ease, opacity 0.18s ease;
                    }
                    .short-url-pagination button:hover:not(:disabled) { color: var(--accent); border-color: var(--accent-outline); }
                    .short-url-pagination button:disabled { opacity: 0.4; cursor: not-allowed; }

                    .admin-key-input {
                        width: 100%;
                        min-height: 40px;
                        padding: 8px 14px;
                        border: 1px solid transparent;
                        border-radius: 14px;
                        background: var(--soft);
                        color: var(--text);
                        box-sizing: border-box;
                        font-size: 14px;
                        transition: border-color 0.18s ease, box-shadow 0.18s ease;
                    }
                    .admin-key-input:focus { border-color: var(--accent); box-shadow: 0 0 0 2px var(--accent-ring); }
                    .admin-key-input::placeholder { color: var(--muted); }

                    .modal-form-actions {
                        display: flex;
                        justify-content: flex-end;
                        align-items: center;
                        gap: 10px;
                    }

                    #short-url-main[hidden] { display: none !important; }

                    @media (max-width: 640px) {
                        .subconverter-page { padding: 16px 10px 92px; }
                        .subconverter-card__header, .subconverter-card__body { padding-left: 18px; padding-right: 18px; }
                        .subconverter-layout { padding: 0; }
                    }
                </style>
            </head>
            <body class="dark-mode">
                <div class="subconverter-page">
                    <div class="subconverter-glow subconverter-glow--one"></div>
                    <div class="subconverter-glow subconverter-glow--two"></div>

                    <div class="subconverter-topbar">
                        <span></span>
                        <div style="display:flex;align-items:center;gap:10px;">
                            <a class="subconverter-topbar__link" href="/">订阅转换</a>
                            <button class="subconverter-theme-btn" type="button" id="theme-toggle" aria-label="切换主题" title="切换主题">
                                <span id="theme-icon">☾</span>
                            </button>
                        </div>
                    </div>

                    <div class="subconverter-layout">
                        <div class="subconverter-card" id="short-url-main" hidden>
                            <div class="subconverter-card__header">
                                <div class="subconverter-hero">
                                    <span class="subconverter-hero__eyebrow">Short Links</span>
                                    <div class="short-url-titlebar">
                                        <h2 class="short-url-title">短链管理</h2>
                                        <div class="short-url-toolbar">
                                            <sub-button id="open-create-modal-btn" type="primary">+ 生成短链</sub-button>
                                        </div>
                                    </div>
                                    <p class="short-url-desc">创建、复制与删除你的短链记录。</p>
                                </div>
                            </div>
                            <div class="subconverter-card__body">
                                <sub-table
                                    id="short-url-table"
                                    row-key="short_code"
                                    columns='${JSON.stringify([{key:`short_url`,title:`短链`},{key:`long_url`,title:`长链`,ellipsis:!0},{key:`created_at`,title:`创建时间`,width:`170px`},{type:`actions`,title:`操作`,width:`120px`}])}'
                                    actions='${JSON.stringify([{key:`copy`,label:`复制`},{key:`delete`,label:`删除`,danger:!0}])}'
                                    data="[]"
                                    empty-text="暂无数据"
                                ></sub-table>
                                <div class="short-url-pagination" id="short-url-pagination">
                                    <span id="pagination-total">共 0 条</span>
                                    <button type="button" id="pagination-prev" disabled>上一页</button>
                                    <span id="pagination-page">第 1/1 页</span>
                                    <button type="button" id="pagination-next" disabled>下一页</button>
                                </div>
                            </div>
                        </div>
                    </div>
                </div>

                <sub-modal id="auth-modal" title="管理验证">
                    <sub-form-item label="管理密钥">
                        <input
                            id="admin-key-input"
                            class="admin-key-input"
                            type="password"
                            placeholder="请输入管理密钥"
                            autocomplete="current-password"
                        />
                    </sub-form-item>
                    <div class="modal-form-actions" slot="footer">
                        <sub-button id="auth-cancel-btn" type="default">取消</sub-button>
                        <sub-button id="auth-submit-btn" type="default">进入</sub-button>
                    </div>
                </sub-modal>

                <sub-modal id="create-modal" title="生成短链">
                    <sub-form id="short-url-form" label-width="100px">
                        <sub-form-item label="长链地址">
                            <sub-textarea
                                key="long_url"
                                placeholder="输入需要缩短的完整 URL"
                                rows="4"
                            ></sub-textarea>
                        </sub-form-item>
                    </sub-form>
                    <div class="modal-form-actions" slot="footer">
                        <sub-button id="cancel-create-btn" type="default">取消</sub-button>
                        <sub-button id="create-short-url-btn" type="primary">生成短链</sub-button>
                    </div>
                </sub-modal>

                ${ht()}
                ${dt()}
                ${ut()}
                ${lt()}
                ${mt()}
                ${pt()}
                ${ft()}

                <script>
                    // ---- 主题（与首页一致：手动 + 自动跟随系统） ----
                    function initTheme() {
                        var body = document.body;
                        var icon = document.getElementById('theme-icon');
                        function apply(theme) {
                            body.classList.remove('light-mode', 'dark-mode');
                            body.classList.add(theme);
                            icon.textContent = theme === 'dark-mode' ? '☾' : '☀';
                        }
                        function detect() {
                            var saved = window.localStorage.getItem('localTheme');
                            if (saved === 'light-mode' || saved === 'dark-mode') { apply(saved); return; }
                            var h = new Date().getHours();
                            var theme = (h >= 19 || h < 7) ? 'dark-mode' : 'light-mode';
                            if (window.matchMedia && window.matchMedia('(prefers-color-scheme: dark)').matches) theme = 'dark-mode';
                            if (window.matchMedia && window.matchMedia('(prefers-color-scheme: light)').matches) theme = 'light-mode';
                            apply(theme);
                        }
                        document.getElementById('theme-toggle').addEventListener('click', function () {
                            var isDark = body.classList.contains('dark-mode');
                            var next = isDark ? 'light-mode' : 'dark-mode';
                            window.localStorage.setItem('localTheme', next);
                            apply(next);
                        });
                        if (window.matchMedia) {
                            var mq = window.matchMedia('(prefers-color-scheme: dark)');
                            var cb = function () { if (!window.localStorage.getItem('localTheme')) detect(); };
                            if (mq.addEventListener) mq.addEventListener('change', cb);
                            else if (mq.addListener) mq.addListener(cb);
                        }
                        detect();
                    }

                    class ShortUrlManager {
                        #enabled = ${n};
                        #hasAdminKey = ${r};
                        #authenticated = false;
                        #adminKey = '';
                        #page = 1;
                        #pageSize = 20;
                        #total = 0;
                        #model = { long_url: '' };
                        #storageKey = 'short_url_admin_key';

                        #main = document.querySelector('#short-url-main');
                        #authModal = document.querySelector('#auth-modal');
                        #adminKeyInput = document.querySelector('#admin-key-input');
                        #authCancelBtn = document.querySelector('#auth-cancel-btn');
                        #authSubmitBtn = document.querySelector('#auth-submit-btn');
                        #form = document.querySelector('#short-url-form');
                        #modal = document.querySelector('#create-modal');
                        #openModalBtn = document.querySelector('#open-create-modal-btn');
                        #cancelBtn = document.querySelector('#cancel-create-btn');
                        #createBtn = document.querySelector('#create-short-url-btn');
                        #table = document.querySelector('#short-url-table');
                        #prevBtn = document.querySelector('#pagination-prev');
                        #nextBtn = document.querySelector('#pagination-next');
                        #totalEl = document.querySelector('#pagination-total');
                        #pageEl = document.querySelector('#pagination-page');

                        constructor() {
                            this.#bindEvents();
                            this.#bootstrap();
                        }

                        async #bootstrap() {
                            if (!this.#enabled) {
                                notification.error('短链服务未启用');
                                setTimeout(() => {
                                    location.href = '/';
                                }, 800);
                                return;
                            }

                            if (!this.#hasAdminKey) {
                                notification.error('请先配置 SHORT_URL_KEY');
                                setTimeout(() => {
                                    location.href = '/';
                                }, 1200);
                                return;
                            }

                            const cached = sessionStorage.getItem(this.#storageKey) || '';
                            if (cached) {
                                const ok = await this.#verifyKey(cached, false);
                                if (ok) {
                                    this.#enter(cached);
                                    return;
                                }
                                sessionStorage.removeItem(this.#storageKey);
                            }

                            this.#authModal.setAttribute('open', '');
                            setTimeout(() => this.#adminKeyInput?.focus(), 0);
                        }

                        #bindEvents() {
                            this.#form?.addEventListener('form:change', e => {
                                this.#model[e.detail.key] = e.detail.value;
                                this.#form.setAttribute('model', JSON.stringify(this.#model));
                            });

                            this.#form?.setAttribute('model', JSON.stringify(this.#model));

                            this.#authSubmitBtn?.addEventListener('click', () => this.#submitAuth());
                            this.#authCancelBtn?.addEventListener('click', () => this.#goHome());
                            this.#adminKeyInput?.addEventListener('keydown', e => {
                                if (e.key === 'Enter') this.#submitAuth();
                            });
                            this.#authModal?.addEventListener('modal:close', () => {
                                if (!this.#authenticated) this.#goHome();
                            });

                            this.#openModalBtn?.addEventListener('click', () => this.#openModal());
                            this.#cancelBtn?.addEventListener('click', () => this.#closeModal());
                            this.#createBtn?.addEventListener('click', () => this.#create());

                            this.#prevBtn?.addEventListener('click', () => {
                                if (this.#page > 1) {
                                    this.#page -= 1;
                                    this.#loadList();
                                }
                            });
                            this.#nextBtn?.addEventListener('click', () => {
                                if (this.#page < this.#totalPages()) {
                                    this.#page += 1;
                                    this.#loadList();
                                }
                            });

                            this.#table?.addEventListener('table:action', e => {
                                const { action, row } = e.detail;
                                if (action === 'copy') this.#copy(row.short_url);
                                if (action === 'delete') this.#delete(row.short_code);
                            });
                        }

                        #goHome() {
                            location.href = '/';
                        }

                        async #submitAuth() {
                            const key = (this.#adminKeyInput?.value || '').trim();
                            if (!key) {
                                notification.error('请输入管理密钥');
                                return;
                            }

                            const ok = await this.#verifyKey(key, true);
                            if (!ok) {
                                notification.error('密钥不正确');
                                setTimeout(() => this.#goHome(), 800);
                                return;
                            }

                            sessionStorage.setItem(this.#storageKey, key);
                            this.#enter(key);
                        }

                        async #verifyKey(key, silentNetworkError) {
                            try {
                                const res = await fetch('/api/admin/verify', {
                                    method: 'POST',
                                    headers: { 'Content-Type': 'application/json' },
                                    body: JSON.stringify({ key })
                                });
                                if (res.ok) return true;
                                if (res.status === 401) return false;
                                let message = '验证失败';
                                try {
                                    const err = await res.json();
                                    message = err.message || message;
                                } catch (_) {}
                                if (!silentNetworkError) notification.error(message);
                                return false;
                            } catch (error) {
                                if (!silentNetworkError) {
                                    notification.error(error.message || '验证失败');
                                }
                                return false;
                            }
                        }

                        #enter(key) {
                            this.#adminKey = key;
                            this.#authenticated = true;
                            this.#authModal.removeAttribute('open');
                            this.#main.hidden = false;
                            this.#loadList();
                        }

                        #adminHeaders(extra = {}) {
                            return {
                                ...extra,
                                'X-Admin-Key': this.#adminKey
                            };
                        }

                        #openModal() {
                            this.#modal.setAttribute('open', '');
                        }

                        #closeModal() {
                            this.#modal.removeAttribute('open');
                        }

                        #formatTime(value) {
                            if (!value) return '-';
                            const date = new Date(value);
                            if (Number.isNaN(date.getTime())) return String(value);
                            const pad = n => String(n).padStart(2, '0');
                            return \`\${date.getFullYear()}-\${pad(date.getMonth() + 1)}-\${pad(date.getDate())} \${pad(date.getHours())}:\${pad(date.getMinutes())}:\${pad(date.getSeconds())}\`;
                        }

                        #totalPages() {
                            return Math.max(1, Math.ceil(this.#total / this.#pageSize) || 1);
                        }

                        #updatePagination() {
                            const totalPages = this.#totalPages();
                            this.#totalEl.textContent = \`共 \${this.#total} 条\`;
                            this.#pageEl.textContent = \`第 \${this.#page}/\${totalPages} 页\`;
                            this.#prevBtn.disabled = this.#page <= 1;
                            this.#nextBtn.disabled = this.#page >= totalPages;
                        }

                        async #loadList() {
                            if (!this.#authenticated) return;
                            this.#table.setAttribute('loading', '');
                            try {
                                const res = await fetch(\`/api/queryList?page=\${this.#page}&pageSize=\${this.#pageSize}\`, {
                                    headers: this.#adminHeaders()
                                });
                                if (!res.ok) throw new Error('加载失败');
                                const json = await res.json();
                                const data = json.data || { total: 0, items: [] };
                                this.#total = data.total || 0;
                                const totalPages = this.#totalPages();
                                if (this.#page > totalPages) {
                                    this.#page = totalPages;
                                    return this.#loadList();
                                }
                                this.#table.setAttribute(
                                    'data',
                                    JSON.stringify(
                                        (data.items || []).map(item => ({
                                            ...item,
                                            created_at: this.#formatTime(item.created_at)
                                        }))
                                    )
                                );
                                this.#updatePagination();
                            } catch (error) {
                                this.#table.setAttribute('data', '[]');
                                notification.error(error.message || '加载列表失败');
                            } finally {
                                this.#table.removeAttribute('loading');
                            }
                        }

                        async #create() {
                            const longUrl = (this.#model.long_url || '').trim();
                            if (!longUrl) {
                                notification.error('请输入长链地址');
                                return;
                            }

                            const serve = \`\${location.protocol}//\${location.host}\`;
                            try {
                                const res = await fetch('/api/add', {
                                    method: 'POST',
                                    headers: { 'Content-Type': 'application/json' },
                                    body: JSON.stringify({ long_url: longUrl, serve })
                                });
                                if (!res.ok) {
                                    let message = '生成短链失败';
                                    try {
                                        const err = await res.json();
                                        message = err.message || message;
                                    } catch (_) {}
                                    throw new Error(message);
                                }
                                notification.success('生成短链成功');
                                this.#model.long_url = '';
                                this.#form.setAttribute('model', JSON.stringify(this.#model));
                                this.#closeModal();
                                this.#page = 1;
                                await this.#loadList();
                            } catch (error) {
                                notification.error(error.message || '生成短链失败');
                            }
                        }

                        async #copy(text) {
                            if (!text) {
                                notification.error('复制内容不能为空');
                                return;
                            }
                            try {
                                if (navigator.clipboard && window.isSecureContext) {
                                    await navigator.clipboard.writeText(text);
                                } else {
                                    const textArea = document.createElement('textarea');
                                    textArea.value = text;
                                    textArea.style.position = 'fixed';
                                    textArea.style.left = '-999999px';
                                    document.body.appendChild(textArea);
                                    textArea.select();
                                    const ok = document.execCommand('copy');
                                    textArea.remove();
                                    if (!ok) throw new Error('复制失败');
                                }
                                notification.success('复制成功');
                            } catch (error) {
                                notification.error('复制失败: ' + (error.message || '未知错误'));
                            }
                        }

                        async #delete(code) {
                            if (!code) return;
                            if (!confirm('确认删除该短链？')) return;
                            try {
                                const res = await fetch(\`/api/delete?code=\${encodeURIComponent(code)}\`, {
                                    method: 'DELETE',
                                    headers: this.#adminHeaders()
                                });
                                if (!res.ok) throw new Error('删除失败');
                                notification.success('删除成功');
                                await this.#loadList();
                            } catch (error) {
                                notification.error(error.message || '删除失败');
                            }
                        }
                    }

                    document.addEventListener('DOMContentLoaded', () => {
                        initTheme();
                        new ShortUrlManager();
                    });
                <\/script>
            </body>
        </html>
    `;return new Response(i,{headers:new Headers({"Content-Type":`text/html; charset=UTF-8`,"Cache-Control":`no-store, no-cache, must-revalidate`})})}function _t(e,t){let n=nt(t),r=et(e,t),i=rt(e,t),a=it(),o=Qe(),s=tt(),c=ot(),l=$e(e,t),u=t.SHORT_URL_ENABLED===!0,d=`
    <!DOCTYPE html>
        <html lang="zh-CN">
            <head>
                <meta charset="UTF-8" />
                <meta name="viewport" content="width=device-width, initial-scale=1.0" />
                <meta name="color-scheme" content="light dark" />
                <title>在线订阅转换工具</title>
                <style>
                    :root {
                        color-scheme: light dark;
                    }
                    /*
                     * 主题变量：沿用 sub-web-modify 的设计令牌。
                     * 通过 body.light-mode / body.dark-mode 切换。
                     */
                    body.light-mode .subconverter-page {
                        --page-surface: #d8e0e5;
                        --page-grid: rgba(51, 65, 85, 0.05);
                        --bg: rgba(241, 245, 247, 0.84);
                        --panel: rgba(246, 249, 250, 0.92);
                        --soft: #e5ecef;
                        --text: #000;
                        --muted: rgba(15, 23, 42, 0.66);
                        --line: rgba(51, 65, 85, 0.12);
                        --accent: #2f6f68;
                        --accent-strong: #4e708b;
                        --accent-fog: rgba(78, 112, 139, 0.12);
                        --accent-ring: rgba(78, 112, 139, 0.16);
                        --accent-outline: rgba(78, 112, 139, 0.42);
                        --shadow: 0 24px 56px rgba(51, 65, 85, 0.12);
                    }

                    body.dark-mode .subconverter-page {
                        --page-surface: transparent;
                        --page-grid: rgba(148, 163, 184, 0.05);
                        --bg: rgba(7, 16, 30, 0.78);
                        --panel: rgba(8, 20, 38, 0.92);
                        --soft: rgba(15, 23, 42, 0.7);
                        --text: #f8fbff;
                        --muted: rgba(226, 232, 240, 0.7);
                        --line: rgba(148, 163, 184, 0.16);
                        --accent: #38bdf8;
                        --accent-strong: #67e8f9;
                        --accent-fog: rgba(56, 189, 248, 0.16);
                        --accent-ring: rgba(56, 189, 248, 0.14);
                        --accent-outline: rgba(56, 189, 248, 0.45);
                        --shadow: 0 30px 80px rgba(2, 6, 23, 0.52);
                    }

                    * { box-sizing: border-box; }

                    /* 移除点击/聚焦时的浏览器默认蓝色焦点框 */
                    button:focus, a:focus, input:focus, textarea:focus, select:focus, [tabindex]:focus,
                    button:focus-visible, a:focus-visible, input:focus-visible, textarea:focus-visible, select:focus-visible, [tabindex]:focus-visible { outline: none; }
                    .ctl__box:focus, .sub-ghost-btn:focus, .subconverter-main-btn:focus, .sub-checkbox:focus,
                    .subconverter-topbar__link:focus, .subconverter-social-btn:focus, .sub-dialog__close:focus,
                    .subconverter-advanced__trigger:focus,
                    .ctl__box:focus-visible, .sub-ghost-btn:focus-visible, .subconverter-main-btn:focus-visible, .sub-checkbox:focus-visible,
                    .subconverter-topbar__link:focus-visible, .subconverter-social-btn:focus-visible, .sub-dialog__close:focus-visible,
                    .subconverter-advanced__trigger:focus-visible { outline: none; box-shadow: none; }

                    html, body { margin: 0; padding: 0; }
                    body.light-mode, body.dark-mode {
                        background: var(--page-surface, #0b1120);
                    }

                    .subconverter-page {
                        position: relative;
                        min-height: 100vh;
                        padding: 28px 18px 104px;
                        color: var(--text);
                        font-family: "Noto Sans SC", -apple-system, BlinkMacSystemFont, "Segoe UI", "PingFang SC", "Microsoft YaHei", sans-serif;
                        overflow-x: hidden;
                        background-color: var(--page-surface, #0b1120);
                        background-image:
                            linear-gradient(var(--page-grid, rgba(148,163,184,0.05)) 1px, transparent 1px),
                            linear-gradient(90deg, var(--page-grid, rgba(148,163,184,0.05)) 1px, transparent 1px);
                        background-size: 24px 24px;
                        transition: background-color 0.3s ease;
                    }

                    .subconverter-glow {
                        position: absolute;
                        border-radius: 999px;
                        filter: blur(18px);
                        pointer-events: none;
                    }
                    .subconverter-glow--one { left: -120px; top: 20px; width: 320px; height: 320px; background: radial-gradient(circle, rgba(34,211,238,0.24) 0, rgba(34,211,238,0) 72%); }
                    .subconverter-glow--two { right: -120px; bottom: 40px; width: 360px; height: 360px; background: radial-gradient(circle, rgba(16,185,129,0.18) 0, rgba(16,185,129,0) 72%); }
                    body.light-mode .subconverter-glow { display: none; }

                    .subconverter-topbar {
                        position: relative;
                        z-index: 2;
                        max-width: 1032px;
                        margin: 0 auto 0;
                        padding: 0 16px;
                        display: flex;
                        justify-content: flex-end;
                    }
                    .subconverter-topbar__link {
                        color: var(--muted);
                        font-size: 13px;
                        font-weight: 600;
                        text-decoration: none;
                        padding: 8px 12px;
                        border: 1px solid var(--line);
                        border-radius: 12px;
                        background: var(--bg);
                        transition: color 0.18s ease, border-color 0.18s ease;
                    }
                    .subconverter-topbar__link:hover { color: var(--accent); border-color: var(--accent-outline); }

                    .subconverter-layout {
                        position: relative;
                        z-index: 1;
                        width: 100%;
                        max-width: 1032px;
                        margin: 18px auto 0;
                        padding: 16px;
                    }

                    .subconverter-card {
                        border: 1px solid var(--line);
                        border-radius: 28px;
                        background: var(--bg);
                        box-shadow: var(--shadow);
                        backdrop-filter: blur(18px) saturate(180%);
                        overflow: hidden;
                    }
                    .subconverter-card__header {
                        padding: 28px 28px 20px;
                        border-bottom: 1px solid var(--line);
                    }
                    .subconverter-card__body { padding: 22px 28px 28px; }

                    .subconverter-hero { display: flex; flex-direction: column; gap: 18px; }
                    .subconverter-hero__eyebrow {
                        display: inline-flex;
                        font: 700 12px/1 "Space Grotesk", "Noto Sans SC", sans-serif;
                        letter-spacing: 0.24em;
                        text-transform: uppercase;
                        color: var(--accent);
                    }
                    .subconverter-hero__topline { display: flex; justify-content: space-between; gap: 16px; align-items: stretch; margin-top: 10px; }
                    .subconverter-hero__title {
                        margin: 0;
                        display: flex;
                        flex: 1 1 auto;
                        align-items: center;
                        min-height: 88px;
                        font: 700 clamp(2.8rem, 6vw, 5.4rem)/0.92 "Space Grotesk", "Noto Sans SC", sans-serif;
                        letter-spacing: -0.04em;
                        color: var(--text) !important;
                    }
                    .subconverter-hero__desc { margin: 14px 0 0; color: var(--muted); line-height: 1.7; }
                    .subconverter-hero__stats { flex: 0 0 clamp(320px, 34vw, 420px); width: clamp(320px, 34vw, 420px); min-width: clamp(320px, 34vw, 420px); max-width: clamp(320px, 34vw, 420px); }
                    .subconverter-stat {
                        box-sizing: border-box;
                        display: flex;
                        flex-direction: column;
                        justify-content: center;
                        width: 100%;
                        height: 88px;
                        padding: 16px 18px;
                        overflow: hidden;
                        border: 1px solid var(--line);
                        border-radius: 20px;
                        background: linear-gradient(135deg, var(--accent-fog), transparent 60%), var(--panel);
                    }
                    .subconverter-stat span { display: block; font-size: 12px; color: var(--muted); }
                    .subconverter-stat strong { display: block; width: 100%; margin-top: 8px; font: 700 15px/1.4 "Space Grotesk", "Noto Sans SC", sans-serif; color: var(--text); overflow: hidden; text-overflow: ellipsis; white-space: nowrap; }
                    .subconverter-stat--backend strong { font-size: 18px; letter-spacing: 0.01em; }
                    .subconverter-stat strong.is-off { font-size: 14px; color: var(--muted); font-weight: 500; }

                    /* 表单 */
                    .subconverter-field { margin-bottom: 18px; }
                    .subconverter-field__label {
                        display: block;
                        text-align: left;
                        color: var(--text);
                        font-weight: 700;
                        padding-bottom: 8px;
                        font-size: 14px;
                    }
                    .subconverter-field__label .req { color: #e5484d; margin-right: 2px; }

                    .subconverter-textarea, .subconverter-input {
                        width: 100%;
                        border: 1px solid transparent;
                        border-radius: 16px;
                        background: var(--soft);
                        color: var(--text);
                        font-family: "JetBrains Mono", ui-monospace, SFMono-Regular, Menlo, Consolas, monospace;
                        font-size: 14px;
                        transition: border-color 0.18s ease, box-shadow 0.18s ease, background 0.18s ease;
                        outline: none;
                    }
                    .subconverter-textarea { padding: 14px 16px; resize: vertical; min-height: 90px; line-height: 1.6; }
                    .subconverter-input { height: 46px; padding: 0 16px; }
                    .subconverter-textarea::placeholder, .subconverter-input::placeholder { color: var(--muted); }
                    .subconverter-textarea:focus, .subconverter-input:focus {
                        border-color: var(--accent-outline);
                        box-shadow: 0 0 0 4px var(--accent-ring);
                    }

                    /* 下拉控件 */
                    .ctl {
                        position: relative;
                        width: 100%;
                    }
                    .ctl__box {
                        position: relative;
                        display: flex;
                        align-items: center;
                        width: 100%;
                        height: 46px;
                        padding: 0 38px 0 16px;
                        border: 1px solid transparent;
                        border-radius: 16px;
                        background: var(--soft);
                        color: var(--text);
                        cursor: pointer;
                        font-family: "JetBrains Mono", ui-monospace, SFMono-Regular, Menlo, Consolas, monospace;
                        font-size: 14px;
                        transition: border-color 0.18s ease, box-shadow 0.18s ease;
                    }
                    .ctl__box.is-open, .ctl__box:hover { border-color: var(--accent-outline); }
                    .ctl__box.is-disabled { cursor: not-allowed; opacity: 0.6; }
                    .ctl__box input {
                        flex: 1;
                        min-width: 0;
                        border: 0;
                        background: transparent;
                        color: var(--text);
                        font: inherit;
                        outline: none;
                    }
                    .ctl__box input::placeholder { color: var(--muted); }
                    .ctl__box input[readonly] { cursor: pointer; }
                    .ctl__value { flex: 1; min-width: 0; overflow: hidden; text-overflow: ellipsis; white-space: nowrap; }
                    .ctl__arrow { position: absolute; right: 14px; top: 50%; transform: translateY(-50%) rotate(0deg); transition: transform 0.25s ease; color: var(--muted); display: flex; }
                    .ctl.is-open .ctl__arrow { transform: translateY(-50%) rotate(180deg); }
                    .ctl__dropdown {
                        position: absolute;
                        top: calc(100% + 8px);
                        left: 0;
                        right: 0;
                        max-height: 274px;
                        padding: 6px;
                        overflow-y: auto;
                        background: var(--panel);
                        border: 1px solid var(--line);
                        border-radius: 16px;
                        box-shadow: var(--shadow);
                        z-index: 50;
                        display: none;
                    }
                    .ctl.is-open .ctl__dropdown { display: block; }
                    .ctl__opt {
                        display: flex;
                        align-items: center;
                        gap: 8px;
                        padding: 9px 12px;
                        border-radius: 10px;
                        color: var(--text);
                        font-size: 14px;
                        cursor: pointer;
                        white-space: nowrap;
                        overflow: hidden;
                        text-overflow: ellipsis;
                    }
                    .ctl__opt:hover { background: var(--accent-fog); }
                    .ctl__opt.is-selected { color: var(--accent); font-weight: 600; }
                    .ctl__opt.is-create { color: var(--accent); }
                    .ctl__opt .ck {
                        width: 16px; height: 16px; flex: none;
                        border: 1.5px solid var(--accent-outline);
                        border-radius: 5px; position: relative;
                    }
                    .ctl__opt.is-selected .ck { background: var(--accent); border-color: var(--accent); }
                    .ctl__opt.is-selected .ck::after {
                        content: ''; position: absolute; top: 2px; left: 5px;
                        width: 4px; height: 8px;
                        border: solid #fff; border-width: 0 2px 2px 0;
                        transform: rotate(45deg);
                    }
                    .ctl__empty { padding: 24px 0; text-align: center; color: var(--muted); font-size: 13px; }

                    /* 高级功能折叠区 */
                    .subconverter-advanced__wrap {
                        margin-top: 10px;
                        padding: 14px 16px 0;
                        border: 1px solid var(--line);
                        border-radius: 24px;
                        background: linear-gradient(180deg, var(--accent-fog), transparent 86%);
                    }
                    .subconverter-advanced__trigger {
                        display: flex;
                        align-items: center;
                        justify-content: space-between;
                        width: 100%;
                        padding: 4px 2px 14px;
                        border: 0;
                        background: transparent;
                        cursor: pointer;
                        color: var(--text);
                        font: 700 14px/1 "Noto Sans SC", sans-serif;
                    }
                    .subconverter-advanced__trigger .arrow { transition: transform 0.25s ease; color: var(--muted); display: flex; }
                    .subconverter-advanced__trigger.is-open .arrow { transform: rotate(180deg); }
                    .subconverter-advanced__body { display: none; padding-bottom: 14px; }
                    .subconverter-advanced__wrap.is-open .subconverter-advanced__body { display: block; }
                    .subconverter-advanced__body .subconverter-field:first-child { margin-top: 4px; }

                    /* 复选框行 */
                    .subconverter-extras {
                        display: flex;
                        align-items: center;
                        gap: 18px;
                        flex-wrap: wrap;
                        margin-top: 6px;
                    }
                    .sub-checkbox {
                        display: inline-flex;
                        align-items: center;
                        gap: 8px;
                        cursor: pointer;
                        user-select: none;
                        color: var(--text);
                        font-size: 14px;
                    }
                    .sub-checkbox input { display: none; }
                    .sub-checkbox .box {
                        width: 18px; height: 18px;
                        border: 1.5px solid var(--accent-outline);
                        border-radius: 6px;
                        display: inline-flex; align-items: center; justify-content: center;
                        transition: background 0.15s ease, border-color 0.15s ease;
                        flex: none;
                    }
                    .sub-checkbox input:checked + .box { background: var(--accent); border-color: var(--accent); }
                    .sub-checkbox input:checked + .box::after {
                        content: ''; width: 5px; height: 9px;
                        border: solid #fff; border-width: 0 2px 2px 0;
                        transform: rotate(45deg) translate(-1px, -1px);
                    }
                    .sub-checkbox--border .box { border-width: 2px; }
                    .sub-ghost-btn {
                        height: 40px;
                        padding: 0 16px;
                        border: 1px solid var(--line);
                        border-radius: 12px;
                        background: var(--panel);
                        color: var(--text);
                        font-size: 13px;
                        cursor: pointer;
                        transition: border-color 0.18s ease, color 0.18s ease;
                    }
                    .sub-ghost-btn:hover { border-color: var(--accent-outline); color: var(--accent); }

                    /* 更多选项弹层 */
                    .sub-popover { position: relative; display: inline-block; }
                    .sub-popover__panel {
                        position: absolute;
                        z-index: 60;
                        left: 0;
                        bottom: calc(100% + 10px);
                        width: 420px;
                        max-width: 82vw;
                        padding: 16px;
                        background: var(--panel);
                        border: 1px solid var(--line);
                        border-radius: 20px;
                        box-shadow: var(--shadow);
                        display: none;
                    }
                    .sub-popover.is-open .sub-popover__panel { display: block; }
                    .sub-popover__grid { display: grid; grid-template-columns: 1fr 1fr; gap: 10px; }
                    .sub-popover__backdrop {
                        position: fixed; inset: 0; z-index: 55; background: transparent;
                    }

                    /* 输出框 */
                    .subconverter-output {
                        margin-bottom: 18px;
                        padding: 16px;
                        border: 1px solid var(--line);
                        border-radius: 22px;
                        background: var(--panel);
                    }
                    .subconverter-output .subconverter-field__label { padding-bottom: 8px; }
                    .output-group { display: flex; gap: 10px; align-items: stretch; }
                    .output-group .subconverter-input { flex: 1; min-width: 0; }
                    .output-group .output-copy {
                        flex: none;
                        height: 46px;
                        padding: 0 20px;
                        border: 0;
                        border-radius: 12px;
                        background: #0f172a;
                        color: #fff;
                        font-size: 14px;
                        font-weight: 600;
                        cursor: pointer;
                        display: inline-flex;
                        align-items: center;
                        gap: 6px;
                        transition: opacity 0.18s ease, transform 0.12s ease;
                    }
                    body.dark-mode .output-group .output-copy { background: #e2e8f0; color: #020617; }
                    .output-group .output-copy:hover { opacity: 0.88; }
                    .output-group .output-copy:active { transform: scale(0.97); }
                    .output-group .output-copy svg { width: 16px; height: 16px; }

                    /* 操作按钮 */
                    .subconverter-action-row { margin-top: 34px; text-align: center; }
                    .action-btns { display: flex; justify-content: center; gap: 14px; flex-wrap: wrap; }
                    .subconverter-main-btn {
                        width: 160px;
                        height: 48px;
                        border: 0;
                        border-radius: 16px;
                        cursor: pointer;
                        font: 700 15px/1 "Noto Sans SC", sans-serif;
                        color: #fff;
                        background: linear-gradient(135deg, var(--accent-strong) 0, var(--accent) 100%);
                        transition: opacity 0.18s ease, transform 0.12s ease, box-shadow 0.18s ease;
                    }
                    .subconverter-main-btn--alt { background: linear-gradient(135deg, rgba(15,23,42,0.92) 0, rgba(51,65,85,0.92) 100%); }
                    .subconverter-main-btn--parse { background: linear-gradient(135deg, #0369a1 0, #0ea5e9 100%); }
                    .subconverter-main-btn:hover:not(:disabled) { box-shadow: 0 8px 24px var(--shadow); transform: translateY(-1px); }
                    .subconverter-main-btn:disabled { opacity: 0.45; cursor: not-allowed; }
                    .subconverter-main-btn.is-loading { opacity: 0.7; pointer-events: none; }

                    /* 右下角快捷入口 */
                    .subconverter-social-dock {
                        position: fixed;
                        right: 20px;
                        bottom: 20px;
                        z-index: 40;
                        display: flex;
                        gap: 10px;
                        padding: 9px;
                        border: 1px solid var(--line);
                        border-radius: 999px;
                        background: var(--bg);
                        box-shadow: 0 18px 42px rgba(15,23,42,0.12);
                        backdrop-filter: blur(18px) saturate(180%);
                    }
                    .subconverter-social-btn {
                        position: relative;
                        display: inline-flex;
                        align-items: center;
                        justify-content: center;
                        width: 48px;
                        height: 48px;
                        padding: 0;
                        border: 1px solid var(--line);
                        border-radius: 16px;
                        background: linear-gradient(135deg, var(--accent-fog), transparent 65%), var(--panel);
                        color: var(--text);
                        cursor: pointer;
                        transition: transform 0.18s ease, border-color 0.18s ease, box-shadow 0.18s ease;
                    }
                    .subconverter-social-btn:hover { transform: translateY(-2px); border-color: var(--accent-outline); box-shadow: 0 12px 28px rgba(15,23,42,0.16); }
                    .subconverter-social-btn__icon { width: 20px; height: 20px; display: block; }
                    .subconverter-theme-toggle-icon { font-size: 20px; font-family: ui-monospace, monospace; font-weight: 700; line-height: 1; }

                    /* 弹窗 */
                    .sub-dialog { position: fixed; inset: 0; z-index: 100; display: none; }
                    .sub-dialog.is-open { display: flex; align-items: flex-start; justify-content: center; padding-top: 20vh; }
                    .sub-dialog__backdrop { position: absolute; inset: 0; background: rgba(0,0,0,0.45); backdrop-filter: blur(2px); }
                    .sub-dialog__panel {
                        position: relative;
                        z-index: 1;
                        width: min(560px, 92vw);
                        background: var(--panel);
                        border: 1px solid var(--line);
                        border-radius: 24px;
                        box-shadow: var(--shadow);
                        overflow: hidden;
                        color: var(--text);
                    }
                    .sub-dialog__header {
                        display: flex; align-items: center; justify-content: space-between;
                        padding: 18px 22px;
                        border-bottom: 1px solid var(--line);
                        font: 700 17px/1.2 "Space Grotesk", "Noto Sans SC", sans-serif;
                    }
                    .sub-dialog__close { border: 0; background: transparent; color: var(--muted); font-size: 22px; cursor: pointer; line-height: 1; padding: 4px; }
                    .sub-dialog__close:hover { color: var(--text); }
                    .sub-dialog__body { padding: 20px 22px; }
                    .sub-dialog__footer { display: flex; justify-content: flex-end; gap: 10px; padding: 0 22px 20px; }
                    .sub-dialog__footer .sub-ghost-btn { height: 40px; }

                    /* 提示条 */
                    .sub-toast {
                        position: fixed;
                        top: 24px;
                        left: 50%;
                        transform: translateX(-50%) translateY(-12px);
                        z-index: 200;
                        padding: 11px 20px;
                        border-radius: 14px;
                        background: var(--panel);
                        border: 1px solid var(--line);
                        box-shadow: var(--shadow);
                        color: var(--text);
                        font-size: 14px;
                        opacity: 0;
                        pointer-events: none;
                        transition: opacity 0.25s ease, transform 0.25s ease;
                    }
                    .sub-toast.is-show { opacity: 1; transform: translateX(-50%) translateY(0); }
                    .sub-toast.is-error { border-color: rgba(232, 93, 78, 0.5); }
                    .sub-toast.is-error .dot, .sub-toast .dot { display:none }

                    @media (max-width: 760px) {
                        .subconverter-page { padding: 16px 10px 92px; }
                        .subconverter-card__header, .subconverter-card__body { padding-left: 18px; padding-right: 18px; }
                        .subconverter-layout { padding: 0; }
                        .subconverter-hero__topline { flex-direction: column; align-items: flex-start; }
                        .subconverter-hero__title { min-height: 0; }
                        .subconverter-hero__stats { flex-basis: min(100%, 420px); width: min(100%, 420px); min-width: 0; max-width: 100%; }
                        .action-btns { flex-direction: column; align-items: stretch; }
                        .subconverter-main-btn { width: 100%; }
                        .subconverter-social-dock { right: 12px; bottom: 12px; padding: 8px; gap: 8px; }
                        .subconverter-social-btn { width: 44px; height: 44px; }
                        .output-group { flex-direction: column; }
                        .output-group .output-copy { width: 100%; justify-content: center; }
                    }
                </style>
            </head>
            <body class="dark-mode">
                <div class="subconverter-page">
                    <div class="subconverter-glow subconverter-glow--one"></div>
                    <div class="subconverter-glow subconverter-glow--two"></div>

                    <div class="subconverter-topbar">
                        <a class="subconverter-topbar__link" href="/shortUrl">短链管理</a>
                    </div>

                    <div class="subconverter-layout">
                        <div class="subconverter-card">
                            <div class="subconverter-card__header">
                                <div class="subconverter-hero">
                                    <div class="subconverter-hero__copy">
                                        <span class="subconverter-hero__eyebrow">SUB WEB / NEXT</span>
                                        <div class="subconverter-hero__topline">
                                            <h1 class="subconverter-hero__title">订阅转换</h1>
                                            <div class="subconverter-hero__stats">
                                                <div class="subconverter-stat subconverter-stat--backend">
                                                    <span>后端版本</span>
                                                    <strong id="backend-version">等待检测</strong>
                                                </div>
                                            </div>
                                        </div>
                                        <p class="subconverter-hero__desc">
                                            在线订阅转换场景，适配 Clash、Sing-Box、V2Ray 等常见使用环境。
                                        </p>
                                    </div>
                                </div>
                            </div>
                            <div class="subconverter-card__body">
                                <form id="sub-convert-form" autocomplete="off">
                                    <div class="subconverter-field">
                                        <label class="subconverter-field__label"><span class="req">*</span>订阅链接:</label>
                                        <textarea id="f-url" class="subconverter-textarea" rows="3" placeholder="支持各种订阅链接或单节点链接，多个链接每行一个或用 | 分隔"></textarea>
                                    </div>

                                    <div class="subconverter-field">
                                        <label class="subconverter-field__label"><span class="req">*</span>生成类型:</label>
                                        <div class="ctl" id="f-target" data-single data-filterable="false" data-placeholder="请选择"></div>
                                    </div>

                                    <div class="subconverter-field">
                                        <label class="subconverter-field__label">后端地址:</label>
                                        <div class="ctl" id="f-backend" data-single data-filterable="true" data-placeholder="选择或输入后端地址"></div>
                                    </div>

                                    <div class="subconverter-field">
                                        <label class="subconverter-field__label">短链地址:</label>
                                        <div class="ctl" id="f-short" data-single data-filterable="false" data-placeholder="${u?`请选择`:`未配置数据库`}"></div>
                                    </div>

                                    <div class="subconverter-field">
                                        <label class="subconverter-field__label">远程配置:</label>
                                        <div class="ctl" id="f-config" data-single data-filterable="true" data-placeholder="选择或输入配置链接"></div>
                                    </div>

                                    <div class="subconverter-field">
                                        <label class="subconverter-field__label">节点协议:</label>
                                        <div class="ctl" id="f-protocol" data-multi data-placeholder="请选择需要保留的协议"></div>
                                    </div>

                                    <div class="subconverter-field subconverter-advanced__wrap" id="adv-wrap">
                                        <button type="button" class="subconverter-advanced__trigger" id="adv-trigger">
                                            <span>高级功能:</span>
                                            <span class="arrow">
                                                <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2"><path d="m6 9 6 6 6-6"/></svg>
                                            </span>
                                        </button>
                                        <div class="subconverter-advanced__body">
                                            <div class="subconverter-field">
                                                <label class="subconverter-field__label">包含节点:</label>
                                                <input id="f-include" class="subconverter-input" placeholder="要保留的节点，支持正则" />
                                            </div>
                                            <div class="subconverter-field">
                                                <label class="subconverter-field__label">排除节点:</label>
                                                <div class="ctl" id="f-exclude" data-multi data-placeholder="请选择要排除的节点规则"></div>
                                            </div>
                                            <div class="subconverter-field">
                                                <label class="subconverter-field__label">节点命名:</label>
                                                <input id="f-rename" class="subconverter-input" placeholder="举例：'a@b''1@2'，|符可用\\转义" />
                                            </div>
                                            <div class="subconverter-field">
                                                <label class="subconverter-field__label">远程设备:</label>
                                                <input id="f-devid" class="subconverter-input" placeholder="用于设置QuantumultX的远程设备ID" />
                                            </div>
                                            <div class="subconverter-field">
                                                <label class="subconverter-field__label">更新间隔:</label>
                                                <input id="f-interval" class="subconverter-input" type="number" min="0" placeholder="用于设置托管配置更新间隔，单位为天" />
                                            </div>
                                            <div class="subconverter-field">
                                                <label class="subconverter-field__label">订阅命名:</label>
                                                <input id="f-filename" class="subconverter-input" placeholder="返回的订阅文件名，可以在支持文件名的客户端中显示出来" />
                                            </div>
                                            <div class="subconverter-field">
                                                <div class="subconverter-extras">
                                                    <label class="sub-checkbox sub-checkbox--border">
                                                        <input type="checkbox" data-toggle="list" />
                                                        <span class="box"></span>
                                                        <span>仅输出节点信息</span>
                                                    </label>
                                                    <span class="sub-popover" id="more-popover">
                                                        <button type="button" class="sub-ghost-btn" id="more-btn">更多选项</button>
                                                        <div class="sub-popover__panel" id="more-panel">
                                                            <div class="sub-popover__grid" id="more-grid"></div>
                                                        </div>
                                                    </span>
                                                </div>
                                            </div>
                                        </div>
                                    </div>

                                    <div class="subconverter-field subconverter-output">
                                        <label class="subconverter-field__label">定制订阅:</label>
                                        <div class="output-group">
                                            <input id="form-subscribe" class="subconverter-input" readonly placeholder="生成后展示可复制的订阅链接" />
                                            <button type="button" class="output-copy" data-copy="form-subscribe">
                                                <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2"><rect x="9" y="9" width="12" height="12" rx="2"/><path d="M5 15V5a2 2 0 0 1 2-2h10"/></svg>
                                                复制
                                            </button>
                                        </div>
                                    </div>

                                    <div class="subconverter-field subconverter-output">
                                        <label class="subconverter-field__label">订阅短链:</label>
                                        <div class="output-group">
                                            <input id="form-short-url" class="subconverter-input" placeholder="输入自定义短链接后缀，点击生成短链可反复生成" />
                                            <button type="button" class="output-copy" data-copy="form-short-url">
                                                <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2"><rect x="9" y="9" width="12" height="12" rx="2"/><path d="M5 15V5a2 2 0 0 1 2-2h10"/></svg>
                                                复制
                                            </button>
                                        </div>
                                    </div>

                                    <div class="subconverter-field subconverter-action-row">
                                        <div class="action-btns">
                                            <button type="button" id="generate-sub-btn" class="subconverter-main-btn" disabled>生成订阅链接</button>
                                            <button type="button" id="generate-short-url-btn" class="subconverter-main-btn subconverter-main-btn--alt" disabled>生成短链接</button>
                                            <button type="button" id="parse-btn" class="subconverter-main-btn subconverter-main-btn--parse">从URL解析</button>
                                        </div>
                                    </div>
                                </form>
                            </div>
                        </div>
                    </div>

                    <div class="subconverter-social-dock" aria-label="页面快捷入口">
                        <button class="subconverter-social-btn" type="button" id="social-github" aria-label="GitHub" title="GitHub">
                            <svg viewBox="0 0 24 24" fill="none" class="subconverter-social-btn__icon" aria-hidden="true">
                                <path d="M9.2 19.1v-3.2c-3.2.7-3.9-1.4-3.9-1.4-.5-1.2-1.2-1.5-1.2-1.5-1-.7.1-.7.1-.7 1.1.1 1.7 1.1 1.7 1.1 1 .1 1.6.8 1.9 1.4.9.4 1.8.3 2.5.1.1-.7.4-1.2.7-1.5-2.6-.3-5.3-1.3-5.3-5.7 0-1.3.5-2.3 1.1-3.1-.1-.3-.5-1.5.1-3 0 0 .9-.3 3.2 1.2a10.7 10.7 0 0 1 5.8 0c2.2-1.5 3.2-1.2 3.2-1.2.6 1.5.2 2.7.1 3 .7.8 1.1 1.8 1.1 3.1 0 4.4-2.7 5.3-5.3 5.7.4.4.8 1 .8 2.1v3.6" stroke="currentColor" stroke-width="1.7" stroke-linecap="round" stroke-linejoin="round"/>
                                <path d="M8.9 18.8c-3.5 1.1-6-1.4-6-1.4" stroke="currentColor" stroke-width="1.7" stroke-linecap="round"/>
                            </svg>
                        </button>
                        <button class="subconverter-social-btn subconverter-social-btn--theme" type="button" id="theme-toggle" aria-label="切换主题" title="切换主题">
                            <span class="subconverter-theme-toggle-icon" id="theme-icon">☾</span>
                        </button>
                    </div>

                    <!-- 从URL解析 -->
                    <div class="sub-dialog" id="parse-dialog">
                        <div class="sub-dialog__backdrop" data-close="parse-dialog"></div>
                        <div class="sub-dialog__panel">
                            <div class="sub-dialog__header">
                                <span>从 URL 解析订阅信息</span>
                                <button type="button" class="sub-dialog__close" data-close="parse-dialog">&times;</button>
                            </div>
                            <div class="sub-dialog__body">
                                <p style="margin:0 0 12px;color:var(--muted);font-size:13px;">可以从生成的长/短链接中解析信息，自动填入页面。</p>
                                <textarea id="parse-input" class="subconverter-textarea" rows="6" placeholder="将订阅长链接或短链接粘贴到此处"></textarea>
                            </div>
                            <div class="sub-dialog__footer">
                                <button type="button" class="sub-ghost-btn" data-close="parse-dialog">取 消</button>
                                <button type="button" class="sub-ghost-btn" id="parse-confirm">确 定</button>
                            </div>
                        </div>
                    </div>

                    <div class="sub-toast" id="toast"></div>
                </div>

                <script>
                    (function () {
                        'use strict';

                        var CONFIG = {
                            target: ${JSON.stringify(a)},
                            backend: ${JSON.stringify(r)},
                            short: ${JSON.stringify(i)},
                            config: ${JSON.stringify(n)},
                            protocol: ${JSON.stringify(s)},
                            exclude: ${JSON.stringify(c)}
                        };
                        var DEFAULT_BACKEND = ${JSON.stringify(l)};
                        var HAS_DB = ${u};
                        var GITHUB_URL = ${JSON.stringify(`https://github.com/yjhup/sub-convert`)};
                        var ADVANCED = ${JSON.stringify(o.map(function(e){return{label:e.label,value:e.value}}))};

                        // 自定义逻辑映射：更多选项（覆盖 project1 高级选项 + project2 扩展项）
                        var TOGGLES = {
                            emoji: { label: 'Emoji', def: true },
                            new_name: { label: 'Clash新字段', def: true },
                            udp: { label: '启用 UDP', def: true },
                            sort: { label: '基础节点排序', def: false },
                            tfo: { label: '启用 TFO', def: false },
                            scv: { label: '跳过证书验证', def: false },
                            append_type: { label: '插入节点类型', def: false },
                            tls13: { label: '开启TLS_1.3', def: false },
                            xudp: { label: '启用 XUDP', def: false },
                            fdn: { label: '过滤不支持节点', def: false },
                            expand: { label: '展开规则全文', def: true },
                            clash_doh: { label: 'Clash.DoH', def: false },
                            surge_doh: { label: 'Surge.DoH', def: false },
                            singbox_ipv6: { label: 'Sing-Box支持IPV6', def: false }
                        };
                        // project1 始终写入 true/false 的高级参数（保持原生成逻辑不变）
                        var P1_ALWAYS = ['emoji', 'new_name', 'udp', 'sort', 'tfo', 'scv', 'append_type', 'list'];
                        // 仅当开启时才附加的参数 -> 请求参数名
                        var EXTRA_MAP = {
                            tls13: 'tls13',
                            xudp: 'xudp',
                            fdn: 'fdn',
                            expand: 'expand',
                            clash_doh: 'clash.doh',
                            surge_doh: 'surge.doh',
                            singbox_ipv6: 'singbox.ipv6'
                        };

                        var model = {
                            url: '',
                            target: '',
                            backend: DEFAULT_BACKEND,
                            shortServe: CONFIG.short.length ? CONFIG.short[0].value : '',
                            config: CONFIG.config.length ? CONFIG.config[0].value : '',
                            protocol: CONFIG.protocol.map(function (o) { return o.value; }),
                            exclude: [],
                            include: '',
                            rename: '',
                            devid: '',
                            interval: '',
                            filename: '',
                            list: false,
                            toggles: {},
                            subUrl: '',
                            shortUrl: ''
                        };
                        Object.keys(TOGGLES).forEach(function (k) { model.toggles[k] = TOGGLES[k].def; });

                        var el = {
                            url: document.getElementById('f-url'),
                            include: document.getElementById('f-include'),
                            rename: document.getElementById('f-rename'),
                            devid: document.getElementById('f-devid'),
                            interval: document.getElementById('f-interval'),
                            filename: document.getElementById('f-filename'),
                            formSubscribe: document.getElementById('form-subscribe'),
                            formShortUrl: document.getElementById('form-short-url'),
                            generateSub: document.getElementById('generate-sub-btn'),
                            generateShort: document.getElementById('generate-short-url-btn'),
                            parseBtn: document.getElementById('parse-btn'),
                            versionEl: document.getElementById('backend-version')
                        };

                        // ------- 提示 -------
                        var toastTimer = null;
                        function toast(msg, isError) {
                            var t = document.getElementById('toast');
                            t.textContent = msg;
                            t.classList.toggle('is-error', !!isError);
                            t.classList.add('is-show');
                            clearTimeout(toastTimer);
                            toastTimer = setTimeout(function () { t.classList.remove('is-show'); }, 2600);
                        }

                        // ------- 通用下拉控件（单选 + 可过滤 + 多选） -------
                        function closeAllCtl(except) {
                            document.querySelectorAll('.ctl.is-open').forEach(function (c) {
                                if (c !== except) {
                                    c.classList.remove('is-open');
                                    var inp = c.querySelector('input');
                                    if (inp && inp.dataset && inp.dataset.restore !== undefined) {
                                        try { inp.value = inp.dataset.restore; } catch (e) {}
                                    }
                                }
                            });
                        }
                        document.addEventListener('click', function (e) {
                            if (!e.target.closest || !e.target.closest('.ctl')) closeAllCtl(null);
                        });

                        var ctlState = {};
                        function initSingle(id, key, onPickImpl) {
                            var root = document.getElementById(id);
                            var valueKey = key;
                            var options = CONFIG[key];
                            var filterable = root.getAttribute('data-filterable') === 'true';
                            var placeholder = root.getAttribute('data-placeholder') || '请选择';
                            defaultVal(id, options);

                            var box = document.createElement('div');
                            box.className = 'ctl__box';
                            var input = document.createElement('input');
                            input.dataset.restore = '';
                            box.appendChild(input);
                            var arrow = document.createElement('span');
                            arrow.className = 'ctl__arrow';
                            arrow.innerHTML = '<svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2"><path d="m6 9 6 6 6-6"/></svg>';
                            box.appendChild(arrow);
                            var drop = document.createElement('div');
                            drop.className = 'ctl__dropdown';
                            root.appendChild(box);
                            root.appendChild(drop);

                            var state = { options: options, filterable: filterable, placeholder: placeholder, picked: null };
                            ctlState[id] = state;

                            function setValue(val) {
                                state.picked = val;
                                var label = '';
                                var found = options.filter(function (o) { return o.value === val; })[0];
                                label = found ? found.label : val;
                                input.value = label;
                                input.dataset.restore = label;
                                input.classList.add('has-value');
                                model[key] = val;
                                if (onPickImpl) onPickImpl(val, label);
                                afterChange(key);
                            }

                            function open() {
                                closeAllCtl(root);
                                root.classList.toggle('is-open');
                                if (filterable) {
                                    input.dataset.restore = input.value || '';
                                    input.value = '';
                                    input.focus();
                                }
                                renderSelect();
                            }

                            function renderSelect() {
                                drop.innerHTML = '';
                                var q = filterable ? input.value : '';
                                options.forEach(function (opt) {
                                    if (q && opt.label.toLowerCase().indexOf(q.toLowerCase()) < 0 && opt.value.toLowerCase().indexOf(q.toLowerCase()) < 0) return;
                                    var d = document.createElement('div');
                                    d.className = 'ctl__opt' + (state.picked === opt.value ? ' is-selected' : '');
                                    d.textContent = opt.label;
                                    d.addEventListener('click', function (e) { e.stopPropagation(); onPick(opt.value, opt.label); });
                                    drop.appendChild(d);
                                });
                                if (filterable && q) {
                                    var cd = document.createElement('div');
                                    cd.className = 'ctl__opt is-create';
                                    cd.textContent = '直接使用：' + q;
                                    cd.addEventListener('click', function (e) { e.stopPropagation(); onPick(q, q); });
                                    drop.appendChild(cd);
                                }
                                if (drop.children.length === 0) {
                                    var empty = document.createElement('div');
                                    empty.className = 'ctl__empty';
                                    empty.textContent = filterable ? '无匹配项，可输入自定义值' : '暂无数据';
                                    drop.appendChild(empty);
                                }
                            }

                            function onPick(val, label) {
                                setValue(val);
                                root.classList.remove('is-open');
                                input.blur();
                            }

                            box.addEventListener('click', function (e) {
                                e.stopPropagation();
                                open();
                            });
                            if (filterable) {
                                input.addEventListener('input', function () {
                                    if (root.classList.contains('is-open')) renderSelect();
                                });
                            } else {
                                input.readOnly = true;
                            }
                            if (options.length === 0) {
                                box.classList.add('is-disabled');
                                input.placeholder = placeholder;
                                input.readOnly = true;
                            }
                            setValue(state.picked !== null ? state.picked : (options[0] ? options[0].value : (key === 'backend' ? DEFAULT_BACKEND : '')));
                        }

                        function defaultVal(id, options) {
                            if (!options.length) return;
                            if (ctlState[id] && ctlState[id].picked !== null) return;
                        }

                        function initMulti(id, key, isProtocol) {
                            var root = document.getElementById(id);
                            var options = CONFIG[key];
                            var placeholder = root.getAttribute('data-placeholder') || '请选择';
                            var box = document.createElement('div');
                            box.className = 'ctl__box';
                            box.style.height = 'auto';
                            box.style.minHeight = '46px';
                            box.style.flexWrap = 'wrap';
                            box.style.paddingTop = '6px';
                            box.style.paddingBottom = '6px';
                            box.style.gap = '6px';
                            var show = document.createElement('div');
                            show.className = 'ctl__value';
                            show.style.flex = '1';
                            var arrow = document.createElement('span');
                            arrow.className = 'ctl__arrow';
                            arrow.style.top = '50%';
                            arrow.innerHTML = '<svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2"><path d="m6 9 6 6 6-6"/></svg>';
                            box.appendChild(show);
                            box.appendChild(arrow);
                            var drop = document.createElement('div');
                            drop.className = 'ctl__dropdown';
                            root.appendChild(box);
                            root.appendChild(drop);

                            var selected = isProtocol ? model.protocol.slice() : model.exclude.slice();

                            function renderValue() {
                                show.innerHTML = '';
                                if (selected.length === 0) {
                                    var p = document.createElement('span');
                                    p.textContent = placeholder;
                                    p.style.color = 'var(--muted)';
                                    show.appendChild(p);
                                    return;
                                }
                                selected.forEach(function (v) {
                                    var opt = options.filter(function (o) { return o.value === v; })[0];
                                    var tag = document.createElement('span');
                                    tag.style.cssText = 'display:inline-flex;align-items:center;gap:4px;background:var(--soft);border:1px solid var(--line);border-radius:8px;padding:2px 8px;font-size:12px;line-height:22px;';
                                    tag.textContent = opt ? opt.label : v;
                                    show.appendChild(tag);
                                });
                            }

                            function commit() {
                                if (isProtocol) model.protocol = selected.slice();
                                else model.exclude = selected.slice();
                                afterChange(key);
                            }

                            function open() {
                                closeAllCtl(root);
                                root.classList.toggle('is-open');
                                renderOptionsList();
                            }

                            function renderOptionsList() {
                                drop.innerHTML = '';
                                options.forEach(function (opt) {
                                    var d = document.createElement('div');
                                    var on = selected.indexOf(opt.value) >= 0;
                                    d.className = 'ctl__opt' + (on ? ' is-selected' : '');
                                    var ck = document.createElement('span');
                                    ck.className = 'ck';
                                    d.insertBefore(ck, d.firstChild);
                                    d.appendChild(document.createTextNode(opt.label));
                                    d.addEventListener('click', function (e) {
                                        e.stopPropagation();
                                        var i = selected.indexOf(opt.value);
                                        if (i >= 0) selected.splice(i, 1); else selected.push(opt.value);
                                        renderValue();
                                        renderOptionsList();
                                        commit();
                                    });
                                    drop.appendChild(d);
                                });
                                if (options.length === 0) {
                                    var empty = document.createElement('div');
                                    empty.className = 'ctl__empty';
                                    empty.textContent = '暂无数据';
                                    drop.appendChild(empty);
                                }
                            }

                            box.addEventListener('click', function (e) { e.stopPropagation(); open(); });
                            renderValue();
                            if (options.length === 0) box.classList.add('is-disabled');
                            ctlState[id] = { options: options };
                        }

                        // ------- 变更后的响应处理 -------
                        function afterChange() {
                            if (model.url && model.target) {
                                el.generateSub.removeAttribute('disabled');
                            } else {
                                el.generateSub.setAttribute('disabled', '');
                            }
                            if (model.subUrl) {
                                el.generateShort.removeAttribute('disabled');
                            } else {
                                el.generateShort.setAttribute('disabled', '');
                            }
                        }

                        function buildSubUrl() {
                            var base = model.backend || DEFAULT_BACKEND;
                            var u = new URL(base.replace(/\\/+$/, '') + '/sub');
                            u.searchParams.set('target', model.target);
                            u.searchParams.set('url', model.url);
                            u.searchParams.set('insert', 'true');
                            u.searchParams.set('config', model.config || '');
                            u.searchParams.set('protocol', JSON.stringify(model.protocol));
                            u.searchParams.set('exclude', JSON.stringify(model.exclude));
                            P1_ALWAYS.forEach(function (k) {
                                var v = (k === 'list') ? model.list : model.toggles[k];
                                u.searchParams.set(k, v ? 'true' : 'false');
                            });
                            if (model.include) u.searchParams.set('include', model.include);
                            if (model.rename) u.searchParams.set('rename', model.rename);
                            if (model.devid) u.searchParams.set('dev_id', model.devid);
                            if (model.interval) u.searchParams.set('interval', String(Number(model.interval) * 86400));
                            if (model.filename) u.searchParams.set('filename', model.filename);
                            Object.keys(EXTRA_MAP).forEach(function (k) {
                                if (model.toggles[k]) u.searchParams.set(EXTRA_MAP[k], k === 'singbox_ipv6' ? '1' : 'true');
                            });
                            return u.toString();
                        }

                        // ------- 生成订阅链接 -------
                        el.generateSub.addEventListener('click', function () {
                            if (!model.url || !model.target) { toast('订阅链接与生成类型为必填项', true); return; }
                            model.subUrl = buildSubUrl();
                            el.formSubscribe.value = model.subUrl;
                            copyText(model.subUrl);
                            toast('定制订阅已复制到剪贴板');
                            afterChange();
                        });

                        // ------- 生成短链（保持 project1 原有的 /api/add 逻辑） -------
                        el.generateShort.addEventListener('click', async function () {
                            if (!model.shortServe) { toast('短链服务不存在', true); return; }
                            if (!model.subUrl) { toast('请先生成订阅链接', true); return; }
                            el.generateShort.classList.add('is-loading');
                            var requestData = { serve: model.shortServe, long_url: model.subUrl };
                            try {
                                var resp = await fetch(model.shortServe + '/api/add', {
                                    method: 'POST',
                                    headers: { 'Content-Type': 'application/json' },
                                    body: JSON.stringify(requestData)
                                });
                                if (resp.ok) {
                                    var data = await resp.json();
                                    if (data && data.data && data.data.short_url) {
                                        el.formShortUrl.value = data.data.short_url;
                                        model.shortUrl = data.data.short_url;
                                        toast('生成短链接成功');
                                    } else {
                                        toast('生成短链接失败：返回数据异常', true);
                                    }
                                } else {
                                    toast('生成短链接失败', true);
                                }
                            } catch (err) {
                                toast('生成短链接失败：' + (err && err.message ? err.message : '网络错误'), true);
                            } finally {
                                el.generateShort.classList.remove('is-loading');
                            }
                        });

                        // ------- 复制 -------
                        function copyText(text) {
                            if (!text) { toast('复制内容不能为空', true); return; }
                            function fallback() {
                                var ta = document.createElement('textarea');
                                ta.value = text;
                                ta.style.position = 'fixed';
                                ta.style.left = '-999999px';
                                ta.style.top = '-999999px';
                                document.body.appendChild(ta);
                                ta.focus();
                                ta.select();
                                var ok = false;
                                try { ok = document.execCommand('copy'); } catch (e) {}
                                ta.remove();
                                return ok;
                            }
                            if (navigator.clipboard && window.isSecureContext) {
                                navigator.clipboard.writeText(text).then(function () {
                                    toast('复制成功');
                                }).catch(function () {
                                    if (fallback()) toast('复制成功'); else toast('复制失败', true);
                                });
                            } else {
                                toast(fallback() ? '复制成功' : '复制失败');
                            }
                        }
                        document.querySelectorAll('[data-copy]').forEach(function (btn) {
                            btn.addEventListener('click', function () {
                                copyText(document.getElementById(btn.getAttribute('data-copy')).value);
                            });
                        });

                        // ------- 输入绑定 -------
                        function bindInput(id, key) {
                            el[id].addEventListener('input', function () {
                                model[key] = el[id].value;
                                afterChange();
                            });
                            model[key] = el[id].value;
                        }
                        bindInput('url', 'url');
                        bindInput('include', 'include');
                        bindInput('rename', 'rename');
                        bindInput('devid', 'devid');
                        bindInput('interval', 'interval');
                        bindInput('filename', 'filename');
                        // 订阅短链输入框：既用于展示，也可手动输入后缀（可反复生成）
                        el.formShortUrl.addEventListener('input', function () {
                            model.shortUrl = el.formShortUrl.value;
                        });

                        // ------- 复选框：仅输出节点信息 -------
                        document.querySelectorAll('input[data-toggle]').forEach(function (cb) {
                            cb.addEventListener('change', function () {
                                model[cb.getAttribute('data-toggle')] = cb.checked;
                                afterChange();
                            });
                        });

                        // ------- 高级功能折叠 -------
                        var advWrap = document.getElementById('adv-wrap');
                        var advTrigger = document.getElementById('adv-trigger');
                        advTrigger.addEventListener('click', function () {
                            advWrap.classList.toggle('is-open');
                            advTrigger.classList.toggle('is-open');
                        });

                        // ------- 更多选项弹层 ----
                        (function () {
                            var pop = document.getElementById('more-popover');
                            var btn = document.getElementById('more-btn');
                            var grid = document.getElementById('more-grid');
                            var panel = document.getElementById('more-panel');
                            var list = Object.keys(TOGGLES);
                            list.forEach(function (k) {
                                var label = document.createElement('label');
                                label.className = 'sub-checkbox';
                                var cb = document.createElement('input');
                                cb.type = 'checkbox';
                                cb.checked = model.toggles[k];
                                var box = document.createElement('span');
                                box.className = 'box';
                                var txt = document.createElement('span');
                                txt.textContent = TOGGLES[k].label;
                                label.appendChild(cb);
                                label.appendChild(box);
                                label.appendChild(txt);
                                cb.addEventListener('change', function () {
                                    model.toggles[k] = cb.checked;
                                });
                                grid.appendChild(label);
                            });
                            btn.addEventListener('click', function (e) {
                                e.stopPropagation();
                                pop.classList.toggle('is-open');
                            });
                            document.addEventListener('click', function (e) {
                                if (!pop.contains(e.target)) pop.classList.remove('is-open');
                            });
                        })();

                        // ------- 后端版本检测（project1 /version 兼容） -------
                        function detectVersion(backend) {
                            var url = (backend || DEFAULT_BACKEND).replace(/\\/+$/, '') + '/version';
                            var strong = el.versionEl;
                            strong.textContent = '检测中…';
                            strong.classList.remove('is-off');
                            fetch(url, { redirect: 'follow' }).then(function (res) {
                                return res.text();
                            }).then(function (text) {
                                var v = (text || '').replace(/backend\\n$/gm, '').replace('subconverter', 'SubConverter').replace(/\\s+$/, '');
                                if (v) { strong.textContent = v; strong.classList.remove('is-off'); }
                                else { strong.textContent = '后端可用'; strong.classList.remove('is-off'); }
                            }).catch(function () {
                                strong.textContent = '后端不可用';
                                strong.classList.add('is-off');
                            });
                        }

                        // ------- 从URL解析 -------
                        var parseDialog = document.getElementById('parse-dialog');
                        el.parseBtn.addEventListener('click', function () {
                            parseDialog.classList.add('is-open');
                            var inp = document.getElementById('parse-input');
                            inp.value = '';
                            setTimeout(function () { inp.focus(); }, 50);
                        });
                        function closeDialog(id) { document.getElementById(id).classList.remove('is-open'); }
                        document.querySelectorAll('[data-close]').forEach(function (btn) {
                            btn.addEventListener('click', function () { closeDialog(btn.getAttribute('data-close')); });
                        });
                        document.getElementById('parse-confirm').addEventListener('click', function () {
                            var raw = document.getElementById('parse-input').value.trim();
                            if (!raw || raw.indexOf('http') < 0) { toast('待解析的订阅链接不合法', true); return; }
                            (async function () {
                                var target = raw;
                                if (target.indexOf('target') < 0) {
                                    try {
                                        el.parseBtn.classList.add('is-loading');
                                        var resp = await fetch(raw, { redirect: 'follow' });
                                        target = resp.url || raw;
                                    } catch (e) {
                                        toast('解析短链接失败：' + (e && e.message ? e.message : '网络错误'), true);
                                        return;
                                    } finally {
                                        el.parseBtn.classList.remove('is-loading');
                                    }
                                }
                                var u;
                                try { u = new URL(target); } catch (e) { toast('请输入正确的订阅地址', true); return; }
                                model.backend = u.origin;
                                setSelectValue('f-backend', u.origin);
                                var param = new URLSearchParams(u.search);
                                if (param.get('target')) model.target = param.get('target');
                                if (param.get('url')) { model.url = param.get('url'); el.url.value = param.get('url'); }
                                if (param.get('config')) { model.config = param.get('config'); setSelectValue('f-config', param.get('config')); }
                                if (param.get('exclude')) refreshExcludeFromJSON(param.get('exclude'));
                                if (param.get('protocol')) {
                                    try { model.protocol = JSON.parse(param.get('protocol')); setMultiValue('f-protocol', model.protocol); } catch (e) {}
                                }
                                if (param.get('include')) { model.include = param.get('include'); el.include.value = model.include; }
                                if (param.get('rename')) { model.rename = param.get('rename'); el.rename.value = model.rename; }
                                if (param.get('dev_id')) { model.devid = param.get('dev_id'); el.devid.value = model.devid; }
                                if (param.get('filename')) { model.filename = param.get('filename'); el.filename.value = model.filename; }
                                if (param.get('interval')) { model.interval = String(Math.ceil(Number(param.get('interval')) / 86400)); el.interval.value = model.interval; }
                                ['list','sort','tfo','scv','fdn','expand','tls13','xudp'].forEach(function (k) {
                                    if (param.get(k)) model.toggles[k] = param.get(k) === 'true';
                                });
                                if (param.get('emoji')) model.toggles.emoji = param.get('emoji') === 'true';
                                if (param.get('new_name')) model.toggles.new_name = param.get('new_name') === 'true';
                                if (param.get('udp')) model.toggles.udp = param.get('udp') === 'true';
                                if (param.get('append_type')) model.toggles.append_type = param.get('append_type') === 'true';
                                if (param.get('clash.doh')) model.toggles.clash_doh = param.get('clash.doh') === 'true';
                                if (param.get('surge.doh')) model.toggles.surge_doh = param.get('surge.doh') === 'true';
                                if (param.get('singbox.ipv6')) model.toggles.singbox_ipv6 = param.get('singbox.ipv6') === '1';
                                syncToggleCheckboxes();
                                closeDialog('parse-dialog');
                                toast('长/短链接已成功解析为订阅信息');
                                afterChange();
                            })();
                        });

                        function setSelectValue(id, val) {
                            var root = document.getElementById(id);
                            var cb = root.querySelector('.ctl__box input');
                            if (!cb) return;
                            var key = id.replace('f-', '');
                            model[key] = val;
                            cb.value = '';
                            cb.dataset.restore = val;
                            var found = (CONFIG[key] || []).filter(function (o) { return o.value === val; })[0];
                            cb.value = found ? found.label : val;
                            if (ctlState[id]) ctlState[id].picked = val;
                        }
                        function setMultiValue(id, arr) {
                            // 由刷新下拉实现（重写多选的状态）
                            var sv = arr;
                            var root = document.getElementById(id);
                            var show = root.querySelector('.ctl__value');
                            if (!show) return;
                            var key = id.replace('f-', '');
                            var ctl = ctlState[id];
                            var isProtocol = id === 'f-protocol';
                            if (isProtocol) model.protocol = sv.slice(); else model.exclude = sv.slice();
                            rerenderMulti(root, show, key, sv);
                        }
                        function rerenderMulti(root, show, key, selected) {
                            var options = CONFIG[key] || [];
                            show.innerHTML = '';
                            if (selected.length === 0) {
                                var p = document.createElement('span');
                                p.style.color = 'var(--muted)';
                                p.textContent = root.getAttribute('data-placeholder') || '请选择';
                                show.appendChild(p);
                                return;
                            }
                            selected.forEach(function (v) {
                                var opt = options.filter(function (o) { return o.value === v; })[0];
                                var tag = document.createElement('span');
                                tag.style.cssText = 'display:inline-flex;align-items:center;gap:4px;background:var(--soft);border:1px solid var(--line);border-radius:8px;padding:2px 8px;font-size:12px;line-height:22px;';
                                tag.textContent = opt ? opt.label : v;
                                show.appendChild(tag);
                            });
                        }
                        function refreshExcludeFromJSON(str) {
                            var arr = [];
                            try { arr = JSON.parse(str); if (!Array.isArray(arr)) arr = String(arr).split(/\\|\\n/); } catch (e) { arr = String(str).split(/\\|\\n/); }
                            arr = arr.filter(Boolean);
                            model.exclude = arr.slice();
                            var root = document.getElementById('f-exclude');
                            var show = root.querySelector('.ctl__value');
                            if (show) rerenderMulti(root, show, 'exclude', arr);
                        }
                        function syncToggleCheckboxes() {
                            document.querySelectorAll('input[data-toggle]').forEach(function (cb) {
                                cb.checked = model[cb.getAttribute('data-toggle')];
                            });
                            document.querySelectorAll('#more-grid .sub-checkbox input').forEach(function (cb) {
                                var label = cb.parentElement.querySelector(':scope > span:last-child').textContent;
                                var key = Object.keys(TOGGLES).filter(function (k) { return TOGGLES[k].label === label; })[0];
                                if (key) cb.checked = model.toggles[key];
                            });
                        }

                        // ------- 初始化 -------
                        function init() {
                            initSingle('f-target', 'target', null);
                            initSingle('f-backend', 'backend', function (val) { detectVersion(val); });
                            initSingle('f-short', 'short', null);
                            initSingle('f-config', 'config', null);
                            initMulti('f-protocol', 'protocol', true);
                            initMulti('f-exclude', 'exclude', false);

                            // 未配置数据库时禁用短链地址
                            if (!HAS_DB) {
                                var shortBox = document.getElementById('f-short').querySelector('.ctl__box');
                                if (shortBox) shortBox.classList.add('is-disabled');
                            }

                            document.getElementById('social-github').addEventListener('click', function () {
                                window.open(GITHUB_URL, '_blank');
                            });

                            // 主题初始化
                            initTheme();

                            // 后端版本检测
                            detectVersion(model.backend);

                            afterChange();
                        }

                        // ------- 主题 ----
                        function initTheme() {
                            var body = document.body;
                            var icon = document.getElementById('theme-icon');
                            function apply(theme) {
                                body.classList.remove('light-mode', 'dark-mode');
                                body.classList.add(theme);
                                icon.textContent = theme === 'dark-mode' ? '☾' : '☀';
                            }
                            function detect() {
                                var saved = window.localStorage.getItem('localTheme');
                                if (saved === 'light-mode' || saved === 'dark-mode') { apply(saved); return; }
                                var h = new Date().getHours();
                                var theme = (h >= 19 || h < 7) ? 'dark-mode' : 'light-mode';
                                if (window.matchMedia && window.matchMedia('(prefers-color-scheme: dark)').matches) theme = 'dark-mode';
                                if (window.matchMedia && window.matchMedia('(prefers-color-scheme: light)').matches) theme = 'light-mode';
                                apply(theme);
                            }
                            document.getElementById('theme-toggle').addEventListener('click', function () {
                                var isDark = body.classList.contains('dark-mode');
                                var next = isDark ? 'light-mode' : 'dark-mode';
                                window.localStorage.setItem('localTheme', next);
                                apply(next);
                            });
                            if (window.matchMedia) {
                                var mq = window.matchMedia('(prefers-color-scheme: dark)');
                                var cb = function () {
                                    if (!window.localStorage.getItem('localTheme')) detect();
                                };
                                if (mq.addEventListener) mq.addEventListener('change', cb);
                                else if (mq.addListener) mq.addListener(cb);
                            }
                            detect();
                        }

                        document.addEventListener('DOMContentLoaded', init);
                    })();
                <\/script>
            </body>
        </html>
    `;return new Response(d,{headers:new Headers({"Content-Type":`text/html; charset=UTF-8`,"Cache-Control":`no-store, no-cache, must-revalidate`})})}const vt=new ze;vt.get(`/`,e=>_t(e.req.raw,e.env)),vt.get(`/shortUrl`,e=>gt(e.req.raw,e.env)),vt.get(`/favicon.ico`,e=>e.body(null,204));var yt=class{constructor(e){this.service=e}async toSub(e){let n=e.req.query(`target`);if(!n)throw new t(400,{message:`Unsupported client type`});let r=it().map(e=>e.value);if(!r.includes(n))throw new t(400,{message:`Unsupported client type, support list: ${r.join(`, `)}`});let{body:i,contentType:a}=await this.service.toSub(e.req.raw,e.env,n);return e.body(i,200,{"Content-Type":a,"Cache-Control":`no-store`})}async getVersion(e){let t=this.service.getVersionRedirect(e.req.raw,e.env);return e.redirect(t,302)}async add(e){let n=await e.req.json();if(!n?.long_url)throw new t(400,{message:`Missing long_url`});let r=new URL(e.req.url),i=n.serve||`${r.protocol}//${r.host}`,a=await this.service.add(n.long_url,i);return e.json({data:a})}async verifyAdmin(e){if(e.env.SHORT_URL_ENABLED!==!0)throw new t(503,{message:`短链服务未启用`});let n=ct(e.env);if(!n)throw new t(503,{message:`请先配置 SHORT_URL_KEY`});let r=(await e.req.json().catch(()=>({key:``})))?.key?.trim()??``;if(!r||!st(r,n))throw new t(401,{message:`密钥不正确`});return e.json({data:{ok:!0}})}async delete(e){this.assertAdminKey(e);let n=e.req.query(`code`);if(!n)throw new t(400,{message:`Missing code`});return await this.service.deleteByCode(n),e.json({data:{deleted:!0}})}async queryByCode(e){this.assertAdminKey(e);let n=e.req.query(`code`);if(!n)throw new t(400,{message:`Missing code`});let r=await this.service.getByCode(n);if(!r)throw new t(404,{message:`Not found`});return e.json({data:r})}async queryList(e){this.assertAdminKey(e);let t=Number.parseInt(e.req.query(`page`)||`1`,10),n=Number.parseInt(e.req.query(`pageSize`)||`20`,10),r=await this.service.getList(t,n);return e.json({data:r})}async redirect(e){let n=e.req.param(`code`);if(!n)throw new t(400,{message:`Invalid short URL`});let r=await this.service.getByCode(n);if(!r)throw new t(404,{message:`Not found`});return e.redirect(r.long_url,302)}assertAdminKey(e){let n=ct(e.env);if(!n)throw new t(503,{message:`请先配置 SHORT_URL_KEY`});let r=(e.req.header(`X-Admin-Key`)??``).trim();if(!r||!st(r,n))throw new t(401,{message:`密钥不正确`})}};
/*! js-yaml 4.1.1 https://github.com/nodeca/js-yaml @license MIT */
function bt(e){return e==null}function xt(e){return typeof e==`object`&&!!e}function St(e){return Array.isArray(e)?e:bt(e)?[]:[e]}function Ct(e,t){var n,r,i,a;if(t)for(a=Object.keys(t),n=0,r=a.length;n<r;n+=1)i=a[n],e[i]=t[i];return e}function wt(e,t){var n=``,r;for(r=0;r<t;r+=1)n+=e;return n}function Tt(e){return e===0&&1/e==-1/0}var w={isNothing:bt,isObject:xt,toArray:St,repeat:wt,isNegativeZero:Tt,extend:Ct};function Et(e,t){var n=``,r=e.reason||`(unknown reason)`;return e.mark?(e.mark.name&&(n+=`in "`+e.mark.name+`" `),n+=`(`+(e.mark.line+1)+`:`+(e.mark.column+1)+`)`,!t&&e.mark.snippet&&(n+=`

`+e.mark.snippet),r+` `+n):r}function T(e,t){Error.call(this),this.name=`YAMLException`,this.reason=e,this.mark=t,this.message=Et(this,!1),Error.captureStackTrace?Error.captureStackTrace(this,this.constructor):this.stack=Error().stack||``}T.prototype=Object.create(Error.prototype),T.prototype.constructor=T,T.prototype.toString=function(e){return this.name+`: `+Et(this,e)};var E=T;function Dt(e,t,n,r,i){var a=``,o=``,s=Math.floor(i/2)-1;return r-t>s&&(a=` ... `,t=r-s+a.length),n-r>s&&(o=` ...`,n=r+s-o.length),{str:a+e.slice(t,n).replace(/\t/g,`→`)+o,pos:r-t+a.length}}function Ot(e,t){return w.repeat(` `,t-e.length)+e}function kt(e,t){if(t=Object.create(t||null),!e.buffer)return null;t.maxLength||=79,typeof t.indent!=`number`&&(t.indent=1),typeof t.linesBefore!=`number`&&(t.linesBefore=3),typeof t.linesAfter!=`number`&&(t.linesAfter=2);for(var n=/\r?\n|\r|\0/g,r=[0],i=[],a,o=-1;a=n.exec(e.buffer);)i.push(a.index),r.push(a.index+a[0].length),e.position<=a.index&&o<0&&(o=r.length-2);o<0&&(o=r.length-1);var s=``,c,l,u=Math.min(e.line+t.linesAfter,i.length).toString().length,d=t.maxLength-(t.indent+u+3);for(c=1;c<=t.linesBefore&&!(o-c<0);c++)l=Dt(e.buffer,r[o-c],i[o-c],e.position-(r[o]-r[o-c]),d),s=w.repeat(` `,t.indent)+Ot((e.line-c+1).toString(),u)+` | `+l.str+`
`+s;for(l=Dt(e.buffer,r[o],i[o],e.position,d),s+=w.repeat(` `,t.indent)+Ot((e.line+1).toString(),u)+` | `+l.str+`
`,s+=w.repeat(`-`,t.indent+u+3+l.pos)+`^
`,c=1;c<=t.linesAfter&&!(o+c>=i.length);c++)l=Dt(e.buffer,r[o+c],i[o+c],e.position-(r[o]-r[o+c]),d),s+=w.repeat(` `,t.indent)+Ot((e.line+c+1).toString(),u)+` | `+l.str+`
`;return s.replace(/\n$/,``)}var At=kt,jt=[`kind`,`multi`,`resolve`,`construct`,`instanceOf`,`predicate`,`represent`,`representName`,`defaultStyle`,`styleAliases`],Mt=[`scalar`,`sequence`,`mapping`];function Nt(e){var t={};return e!==null&&Object.keys(e).forEach(function(n){e[n].forEach(function(e){t[String(e)]=n})}),t}function Pt(e,t){if(t||={},Object.keys(t).forEach(function(t){if(jt.indexOf(t)===-1)throw new E(`Unknown option "`+t+`" is met in definition of "`+e+`" YAML type.`)}),this.options=t,this.tag=e,this.kind=t.kind||null,this.resolve=t.resolve||function(){return!0},this.construct=t.construct||function(e){return e},this.instanceOf=t.instanceOf||null,this.predicate=t.predicate||null,this.represent=t.represent||null,this.representName=t.representName||null,this.defaultStyle=t.defaultStyle||null,this.multi=t.multi||!1,this.styleAliases=Nt(t.styleAliases||null),Mt.indexOf(this.kind)===-1)throw new E(`Unknown kind "`+this.kind+`" is specified for "`+e+`" YAML type.`)}var D=Pt;function Ft(e,t){var n=[];return e[t].forEach(function(e){var t=n.length;n.forEach(function(n,r){n.tag===e.tag&&n.kind===e.kind&&n.multi===e.multi&&(t=r)}),n[t]=e}),n}function It(){var e={scalar:{},sequence:{},mapping:{},fallback:{},multi:{scalar:[],sequence:[],mapping:[],fallback:[]}},t,n;function r(t){t.multi?(e.multi[t.kind].push(t),e.multi.fallback.push(t)):e[t.kind][t.tag]=e.fallback[t.tag]=t}for(t=0,n=arguments.length;t<n;t+=1)arguments[t].forEach(r);return e}function Lt(e){return this.extend(e)}Lt.prototype.extend=function(e){var t=[],n=[];if(e instanceof D)n.push(e);else if(Array.isArray(e))n=n.concat(e);else if(e&&(Array.isArray(e.implicit)||Array.isArray(e.explicit)))e.implicit&&(t=t.concat(e.implicit)),e.explicit&&(n=n.concat(e.explicit));else throw new E(`Schema.extend argument should be a Type, [ Type ], or a schema definition ({ implicit: [...], explicit: [...] })`);t.forEach(function(e){if(!(e instanceof D))throw new E(`Specified list of YAML types (or a single Type object) contains a non-Type object.`);if(e.loadKind&&e.loadKind!==`scalar`)throw new E(`There is a non-scalar type in the implicit list of a schema. Implicit resolving of such types is not supported.`);if(e.multi)throw new E(`There is a multi type in the implicit list of a schema. Multi tags can only be listed as explicit.`)}),n.forEach(function(e){if(!(e instanceof D))throw new E(`Specified list of YAML types (or a single Type object) contains a non-Type object.`)});var r=Object.create(Lt.prototype);return r.implicit=(this.implicit||[]).concat(t),r.explicit=(this.explicit||[]).concat(n),r.compiledImplicit=Ft(r,`implicit`),r.compiledExplicit=Ft(r,`explicit`),r.compiledTypeMap=It(r.compiledImplicit,r.compiledExplicit),r};var Rt=new Lt({explicit:[new D(`tag:yaml.org,2002:str`,{kind:`scalar`,construct:function(e){return e===null?``:e}}),new D(`tag:yaml.org,2002:seq`,{kind:`sequence`,construct:function(e){return e===null?[]:e}}),new D(`tag:yaml.org,2002:map`,{kind:`mapping`,construct:function(e){return e===null?{}:e}})]});function zt(e){if(e===null)return!0;var t=e.length;return t===1&&e===`~`||t===4&&(e===`null`||e===`Null`||e===`NULL`)}function Bt(){return null}function Vt(e){return e===null}var Ht=new D(`tag:yaml.org,2002:null`,{kind:`scalar`,resolve:zt,construct:Bt,predicate:Vt,represent:{canonical:function(){return`~`},lowercase:function(){return`null`},uppercase:function(){return`NULL`},camelcase:function(){return`Null`},empty:function(){return``}},defaultStyle:`lowercase`});function Ut(e){if(e===null)return!1;var t=e.length;return t===4&&(e===`true`||e===`True`||e===`TRUE`)||t===5&&(e===`false`||e===`False`||e===`FALSE`)}function Wt(e){return e===`true`||e===`True`||e===`TRUE`}function Gt(e){return Object.prototype.toString.call(e)===`[object Boolean]`}var Kt=new D(`tag:yaml.org,2002:bool`,{kind:`scalar`,resolve:Ut,construct:Wt,predicate:Gt,represent:{lowercase:function(e){return e?`true`:`false`},uppercase:function(e){return e?`TRUE`:`FALSE`},camelcase:function(e){return e?`True`:`False`}},defaultStyle:`lowercase`});function qt(e){return 48<=e&&e<=57||65<=e&&e<=70||97<=e&&e<=102}function Jt(e){return 48<=e&&e<=55}function Yt(e){return 48<=e&&e<=57}function Xt(e){if(e===null)return!1;var t=e.length,n=0,r=!1,i;if(!t)return!1;if(i=e[n],(i===`-`||i===`+`)&&(i=e[++n]),i===`0`){if(n+1===t)return!0;if(i=e[++n],i===`b`){for(n++;n<t;n++)if(i=e[n],i!==`_`){if(i!==`0`&&i!==`1`)return!1;r=!0}return r&&i!==`_`}if(i===`x`){for(n++;n<t;n++)if(i=e[n],i!==`_`){if(!qt(e.charCodeAt(n)))return!1;r=!0}return r&&i!==`_`}if(i===`o`){for(n++;n<t;n++)if(i=e[n],i!==`_`){if(!Jt(e.charCodeAt(n)))return!1;r=!0}return r&&i!==`_`}}if(i===`_`)return!1;for(;n<t;n++)if(i=e[n],i!==`_`){if(!Yt(e.charCodeAt(n)))return!1;r=!0}return!(!r||i===`_`)}function Zt(e){var t=e,n=1,r;if(t.indexOf(`_`)!==-1&&(t=t.replace(/_/g,``)),r=t[0],(r===`-`||r===`+`)&&(r===`-`&&(n=-1),t=t.slice(1),r=t[0]),t===`0`)return 0;if(r===`0`){if(t[1]===`b`)return n*parseInt(t.slice(2),2);if(t[1]===`x`)return n*parseInt(t.slice(2),16);if(t[1]===`o`)return n*parseInt(t.slice(2),8)}return n*parseInt(t,10)}function Qt(e){return Object.prototype.toString.call(e)===`[object Number]`&&e%1==0&&!w.isNegativeZero(e)}var $t=new D(`tag:yaml.org,2002:int`,{kind:`scalar`,resolve:Xt,construct:Zt,predicate:Qt,represent:{binary:function(e){return e>=0?`0b`+e.toString(2):`-0b`+e.toString(2).slice(1)},octal:function(e){return e>=0?`0o`+e.toString(8):`-0o`+e.toString(8).slice(1)},decimal:function(e){return e.toString(10)},hexadecimal:function(e){return e>=0?`0x`+e.toString(16).toUpperCase():`-0x`+e.toString(16).toUpperCase().slice(1)}},defaultStyle:`decimal`,styleAliases:{binary:[2,`bin`],octal:[8,`oct`],decimal:[10,`dec`],hexadecimal:[16,`hex`]}}),en=RegExp(`^(?:[-+]?(?:[0-9][0-9_]*)(?:\\.[0-9_]*)?(?:[eE][-+]?[0-9]+)?|\\.[0-9_]+(?:[eE][-+]?[0-9]+)?|[-+]?\\.(?:inf|Inf|INF)|\\.(?:nan|NaN|NAN))$`);function tn(e){return!(e===null||!en.test(e)||e[e.length-1]===`_`)}function nn(e){var t=e.replace(/_/g,``).toLowerCase(),n=t[0]===`-`?-1:1;return`+-`.indexOf(t[0])>=0&&(t=t.slice(1)),t===`.inf`?n===1?1/0:-1/0:t===`.nan`?NaN:n*parseFloat(t,10)}var rn=/^[-+]?[0-9]+e/;function an(e,t){var n;if(isNaN(e))switch(t){case`lowercase`:return`.nan`;case`uppercase`:return`.NAN`;case`camelcase`:return`.NaN`}else if(e===1/0)switch(t){case`lowercase`:return`.inf`;case`uppercase`:return`.INF`;case`camelcase`:return`.Inf`}else if(e===-1/0)switch(t){case`lowercase`:return`-.inf`;case`uppercase`:return`-.INF`;case`camelcase`:return`-.Inf`}else if(w.isNegativeZero(e))return`-0.0`;return n=e.toString(10),rn.test(n)?n.replace(`e`,`.e`):n}function on(e){return Object.prototype.toString.call(e)===`[object Number]`&&(e%1!=0||w.isNegativeZero(e))}var sn=new D(`tag:yaml.org,2002:float`,{kind:`scalar`,resolve:tn,construct:nn,predicate:on,represent:an,defaultStyle:`lowercase`}),cn=Rt.extend({implicit:[Ht,Kt,$t,sn]}),ln=RegExp(`^([0-9][0-9][0-9][0-9])-([0-9][0-9])-([0-9][0-9])$`),un=RegExp(`^([0-9][0-9][0-9][0-9])-([0-9][0-9]?)-([0-9][0-9]?)(?:[Tt]|[ \\t]+)([0-9][0-9]?):([0-9][0-9]):([0-9][0-9])(?:\\.([0-9]*))?(?:[ \\t]*(Z|([-+])([0-9][0-9]?)(?::([0-9][0-9]))?))?$`);function dn(e){return e===null?!1:ln.exec(e)!==null||un.exec(e)!==null}function fn(e){var t,n,r,i,a,o,s,c=0,l=null,u,d,f;if(t=ln.exec(e),t===null&&(t=un.exec(e)),t===null)throw Error(`Date resolve error`);if(n=+t[1],r=t[2]-1,i=+t[3],!t[4])return new Date(Date.UTC(n,r,i));if(a=+t[4],o=+t[5],s=+t[6],t[7]){for(c=t[7].slice(0,3);c.length<3;)c+=`0`;c=+c}return t[9]&&(u=+t[10],d=+(t[11]||0),l=(u*60+d)*6e4,t[9]===`-`&&(l=-l)),f=new Date(Date.UTC(n,r,i,a,o,s,c)),l&&f.setTime(f.getTime()-l),f}function pn(e){return e.toISOString()}var mn=new D(`tag:yaml.org,2002:timestamp`,{kind:`scalar`,resolve:dn,construct:fn,instanceOf:Date,represent:pn});function hn(e){return e===`<<`||e===null}var gn=new D(`tag:yaml.org,2002:merge`,{kind:`scalar`,resolve:hn}),_n=`ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz0123456789+/=
\r`;function vn(e){if(e===null)return!1;var t,n,r=0,i=e.length,a=_n;for(n=0;n<i;n++)if(t=a.indexOf(e.charAt(n)),!(t>64)){if(t<0)return!1;r+=6}return r%8==0}function yn(e){var t,n,r=e.replace(/[\r\n=]/g,``),i=r.length,a=_n,o=0,s=[];for(t=0;t<i;t++)t%4==0&&t&&(s.push(o>>16&255),s.push(o>>8&255),s.push(o&255)),o=o<<6|a.indexOf(r.charAt(t));return n=i%4*6,n===0?(s.push(o>>16&255),s.push(o>>8&255),s.push(o&255)):n===18?(s.push(o>>10&255),s.push(o>>2&255)):n===12&&s.push(o>>4&255),new Uint8Array(s)}function bn(e){var t=``,n=0,r,i,a=e.length,o=_n;for(r=0;r<a;r++)r%3==0&&r&&(t+=o[n>>18&63],t+=o[n>>12&63],t+=o[n>>6&63],t+=o[n&63]),n=(n<<8)+e[r];return i=a%3,i===0?(t+=o[n>>18&63],t+=o[n>>12&63],t+=o[n>>6&63],t+=o[n&63]):i===2?(t+=o[n>>10&63],t+=o[n>>4&63],t+=o[n<<2&63],t+=o[64]):i===1&&(t+=o[n>>2&63],t+=o[n<<4&63],t+=o[64],t+=o[64]),t}function xn(e){return Object.prototype.toString.call(e)===`[object Uint8Array]`}var Sn=new D(`tag:yaml.org,2002:binary`,{kind:`scalar`,resolve:vn,construct:yn,predicate:xn,represent:bn}),Cn=Object.prototype.hasOwnProperty,wn=Object.prototype.toString;function Tn(e){if(e===null)return!0;var t=[],n,r,i,a,o,s=e;for(n=0,r=s.length;n<r;n+=1){if(i=s[n],o=!1,wn.call(i)!==`[object Object]`)return!1;for(a in i)if(Cn.call(i,a))if(!o)o=!0;else return!1;if(!o)return!1;if(t.indexOf(a)===-1)t.push(a);else return!1}return!0}function En(e){return e===null?[]:e}var Dn=new D(`tag:yaml.org,2002:omap`,{kind:`sequence`,resolve:Tn,construct:En}),On=Object.prototype.toString;function kn(e){if(e===null)return!0;var t,n,r,i,a,o=e;for(a=Array(o.length),t=0,n=o.length;t<n;t+=1){if(r=o[t],On.call(r)!==`[object Object]`||(i=Object.keys(r),i.length!==1))return!1;a[t]=[i[0],r[i[0]]]}return!0}function An(e){if(e===null)return[];var t,n,r,i,a,o=e;for(a=Array(o.length),t=0,n=o.length;t<n;t+=1)r=o[t],i=Object.keys(r),a[t]=[i[0],r[i[0]]];return a}var jn=new D(`tag:yaml.org,2002:pairs`,{kind:`sequence`,resolve:kn,construct:An}),Mn=Object.prototype.hasOwnProperty;function Nn(e){if(e===null)return!0;var t,n=e;for(t in n)if(Mn.call(n,t)&&n[t]!==null)return!1;return!0}function Pn(e){return e===null?{}:e}var Fn=new D(`tag:yaml.org,2002:set`,{kind:`mapping`,resolve:Nn,construct:Pn}),In=cn.extend({implicit:[mn,gn],explicit:[Sn,Dn,jn,Fn]}),O=Object.prototype.hasOwnProperty,Ln=1,Rn=2,zn=3,Bn=4,Vn=1,Hn=2,Un=3,Wn=/[\x00-\x08\x0B\x0C\x0E-\x1F\x7F-\x84\x86-\x9F\uFFFE\uFFFF]|[\uD800-\uDBFF](?![\uDC00-\uDFFF])|(?:[^\uD800-\uDBFF]|^)[\uDC00-\uDFFF]/,Gn=/[\x85\u2028\u2029]/,Kn=/[,\[\]\{\}]/,qn=/^(?:!|!!|![a-z\-]+!)$/i,Jn=/^(?:!|[^,\[\]\{\}])(?:%[0-9a-f]{2}|[0-9a-z\-#;\/\?:@&=\+\$,_\.!~\*'\(\)\[\]])*$/i;function Yn(e){return Object.prototype.toString.call(e)}function k(e){return e===10||e===13}function A(e){return e===9||e===32}function j(e){return e===9||e===32||e===10||e===13}function M(e){return e===44||e===91||e===93||e===123||e===125}function Xn(e){var t;return 48<=e&&e<=57?e-48:(t=e|32,97<=t&&t<=102?t-97+10:-1)}function Zn(e){return e===120?2:e===117?4:e===85?8:0}function Qn(e){return 48<=e&&e<=57?e-48:-1}function $n(e){return e===48?`\0`:e===97?`\x07`:e===98?`\b`:e===116||e===9?`	`:e===110?`
`:e===118?`\v`:e===102?`\f`:e===114?`\r`:e===101?`\x1B`:e===32?` `:e===34?`"`:e===47?`/`:e===92?`\\`:e===78?``:e===95?`\xA0`:e===76?`\u2028`:e===80?`\u2029`:``}function er(e){return e<=65535?String.fromCharCode(e):String.fromCharCode((e-65536>>10)+55296,(e-65536&1023)+56320)}function tr(e,t,n){t===`__proto__`?Object.defineProperty(e,t,{configurable:!0,enumerable:!0,writable:!0,value:n}):e[t]=n}for(var nr=Array(256),rr=Array(256),N=0;N<256;N++)nr[N]=+!!$n(N),rr[N]=$n(N);function ir(e,t){this.input=e,this.filename=t.filename||null,this.schema=t.schema||In,this.onWarning=t.onWarning||null,this.legacy=t.legacy||!1,this.json=t.json||!1,this.listener=t.listener||null,this.implicitTypes=this.schema.compiledImplicit,this.typeMap=this.schema.compiledTypeMap,this.length=e.length,this.position=0,this.line=0,this.lineStart=0,this.lineIndent=0,this.firstTabInLine=-1,this.documents=[]}function ar(e,t){var n={name:e.filename,buffer:e.input.slice(0,-1),position:e.position,line:e.line,column:e.position-e.lineStart};return n.snippet=At(n),new E(t,n)}function P(e,t){throw ar(e,t)}function or(e,t){e.onWarning&&e.onWarning.call(null,ar(e,t))}var sr={YAML:function(e,t,n){var r,i,a;e.version!==null&&P(e,`duplication of %YAML directive`),n.length!==1&&P(e,`YAML directive accepts exactly one argument`),r=/^([0-9]+)\.([0-9]+)$/.exec(n[0]),r===null&&P(e,`ill-formed argument of the YAML directive`),i=parseInt(r[1],10),a=parseInt(r[2],10),i!==1&&P(e,`unacceptable YAML version of the document`),e.version=n[0],e.checkLineBreaks=a<2,a!==1&&a!==2&&or(e,`unsupported YAML version of the document`)},TAG:function(e,t,n){var r,i;n.length!==2&&P(e,`TAG directive accepts exactly two arguments`),r=n[0],i=n[1],qn.test(r)||P(e,`ill-formed tag handle (first argument) of the TAG directive`),O.call(e.tagMap,r)&&P(e,`there is a previously declared suffix for "`+r+`" tag handle`),Jn.test(i)||P(e,`ill-formed tag prefix (second argument) of the TAG directive`);try{i=decodeURIComponent(i)}catch{P(e,`tag prefix is malformed: `+i)}e.tagMap[r]=i}};function F(e,t,n,r){var i,a,o,s;if(t<n){if(s=e.input.slice(t,n),r)for(i=0,a=s.length;i<a;i+=1)o=s.charCodeAt(i),o===9||32<=o&&o<=1114111||P(e,`expected valid JSON character`);else Wn.test(s)&&P(e,`the stream contains non-printable characters`);e.result+=s}}function cr(e,t,n,r){var i,a,o,s;for(w.isObject(n)||P(e,`cannot merge mappings; the provided source object is unacceptable`),i=Object.keys(n),o=0,s=i.length;o<s;o+=1)a=i[o],O.call(t,a)||(tr(t,a,n[a]),r[a]=!0)}function I(e,t,n,r,i,a,o,s,c){var l,u;if(Array.isArray(i))for(i=Array.prototype.slice.call(i),l=0,u=i.length;l<u;l+=1)Array.isArray(i[l])&&P(e,`nested arrays are not supported inside keys`),typeof i==`object`&&Yn(i[l])===`[object Object]`&&(i[l]=`[object Object]`);if(typeof i==`object`&&Yn(i)===`[object Object]`&&(i=`[object Object]`),i=String(i),t===null&&(t={}),r===`tag:yaml.org,2002:merge`)if(Array.isArray(a))for(l=0,u=a.length;l<u;l+=1)cr(e,t,a[l],n);else cr(e,t,a,n);else !e.json&&!O.call(n,i)&&O.call(t,i)&&(e.line=o||e.line,e.lineStart=s||e.lineStart,e.position=c||e.position,P(e,`duplicated mapping key`)),tr(t,i,a),delete n[i];return t}function lr(e){var t=e.input.charCodeAt(e.position);t===10?e.position++:t===13?(e.position++,e.input.charCodeAt(e.position)===10&&e.position++):P(e,`a line break is expected`),e.line+=1,e.lineStart=e.position,e.firstTabInLine=-1}function L(e,t,n){for(var r=0,i=e.input.charCodeAt(e.position);i!==0;){for(;A(i);)i===9&&e.firstTabInLine===-1&&(e.firstTabInLine=e.position),i=e.input.charCodeAt(++e.position);if(t&&i===35)do i=e.input.charCodeAt(++e.position);while(i!==10&&i!==13&&i!==0);if(k(i))for(lr(e),i=e.input.charCodeAt(e.position),r++,e.lineIndent=0;i===32;)e.lineIndent++,i=e.input.charCodeAt(++e.position);else break}return n!==-1&&r!==0&&e.lineIndent<n&&or(e,`deficient indentation`),r}function ur(e){var t=e.position,n=e.input.charCodeAt(t);return!!((n===45||n===46)&&n===e.input.charCodeAt(t+1)&&n===e.input.charCodeAt(t+2)&&(t+=3,n=e.input.charCodeAt(t),n===0||j(n)))}function dr(e,t){t===1?e.result+=` `:t>1&&(e.result+=w.repeat(`
`,t-1))}function fr(e,t,n){var r,i,a,o,s,c,l,u,d=e.kind,f=e.result,p=e.input.charCodeAt(e.position);if(j(p)||M(p)||p===35||p===38||p===42||p===33||p===124||p===62||p===39||p===34||p===37||p===64||p===96||(p===63||p===45)&&(i=e.input.charCodeAt(e.position+1),j(i)||n&&M(i)))return!1;for(e.kind=`scalar`,e.result=``,a=o=e.position,s=!1;p!==0;){if(p===58){if(i=e.input.charCodeAt(e.position+1),j(i)||n&&M(i))break}else if(p===35){if(r=e.input.charCodeAt(e.position-1),j(r))break}else if(e.position===e.lineStart&&ur(e)||n&&M(p))break;else if(k(p))if(c=e.line,l=e.lineStart,u=e.lineIndent,L(e,!1,-1),e.lineIndent>=t){s=!0,p=e.input.charCodeAt(e.position);continue}else{e.position=o,e.line=c,e.lineStart=l,e.lineIndent=u;break}s&&=(F(e,a,o,!1),dr(e,e.line-c),a=o=e.position,!1),A(p)||(o=e.position+1),p=e.input.charCodeAt(++e.position)}return F(e,a,o,!1),e.result?!0:(e.kind=d,e.result=f,!1)}function pr(e,t){var n=e.input.charCodeAt(e.position),r,i;if(n!==39)return!1;for(e.kind=`scalar`,e.result=``,e.position++,r=i=e.position;(n=e.input.charCodeAt(e.position))!==0;)if(n===39)if(F(e,r,e.position,!0),n=e.input.charCodeAt(++e.position),n===39)r=e.position,e.position++,i=e.position;else return!0;else k(n)?(F(e,r,i,!0),dr(e,L(e,!1,t)),r=i=e.position):e.position===e.lineStart&&ur(e)?P(e,`unexpected end of the document within a single quoted scalar`):(e.position++,i=e.position);P(e,`unexpected end of the stream within a single quoted scalar`)}function mr(e,t){var n,r,i,a,o,s=e.input.charCodeAt(e.position);if(s!==34)return!1;for(e.kind=`scalar`,e.result=``,e.position++,n=r=e.position;(s=e.input.charCodeAt(e.position))!==0;)if(s===34)return F(e,n,e.position,!0),e.position++,!0;else if(s===92){if(F(e,n,e.position,!0),s=e.input.charCodeAt(++e.position),k(s))L(e,!1,t);else if(s<256&&nr[s])e.result+=rr[s],e.position++;else if((o=Zn(s))>0){for(i=o,a=0;i>0;i--)s=e.input.charCodeAt(++e.position),(o=Xn(s))>=0?a=(a<<4)+o:P(e,`expected hexadecimal character`);e.result+=er(a),e.position++}else P(e,`unknown escape sequence`);n=r=e.position}else k(s)?(F(e,n,r,!0),dr(e,L(e,!1,t)),n=r=e.position):e.position===e.lineStart&&ur(e)?P(e,`unexpected end of the document within a double quoted scalar`):(e.position++,r=e.position);P(e,`unexpected end of the stream within a double quoted scalar`)}function hr(e,t){var n=!0,r,i,a,o=e.tag,s,c=e.anchor,l,u,d,f,p,m=Object.create(null),h,g,_,v=e.input.charCodeAt(e.position);if(v===91)u=93,p=!1,s=[];else if(v===123)u=125,p=!0,s={};else return!1;for(e.anchor!==null&&(e.anchorMap[e.anchor]=s),v=e.input.charCodeAt(++e.position);v!==0;){if(L(e,!0,t),v=e.input.charCodeAt(e.position),v===u)return e.position++,e.tag=o,e.anchor=c,e.kind=p?`mapping`:`sequence`,e.result=s,!0;n?v===44&&P(e,`expected the node content, but found ','`):P(e,`missed comma between flow collection entries`),g=h=_=null,d=f=!1,v===63&&(l=e.input.charCodeAt(e.position+1),j(l)&&(d=f=!0,e.position++,L(e,!0,t))),r=e.line,i=e.lineStart,a=e.position,R(e,t,Ln,!1,!0),g=e.tag,h=e.result,L(e,!0,t),v=e.input.charCodeAt(e.position),(f||e.line===r)&&v===58&&(d=!0,v=e.input.charCodeAt(++e.position),L(e,!0,t),R(e,t,Ln,!1,!0),_=e.result),p?I(e,s,m,g,h,_,r,i,a):d?s.push(I(e,null,m,g,h,_,r,i,a)):s.push(h),L(e,!0,t),v=e.input.charCodeAt(e.position),v===44?(n=!0,v=e.input.charCodeAt(++e.position)):n=!1}P(e,`unexpected end of the stream within a flow collection`)}function gr(e,t){var n,r,i=Vn,a=!1,o=!1,s=t,c=0,l=!1,u,d=e.input.charCodeAt(e.position);if(d===124)r=!1;else if(d===62)r=!0;else return!1;for(e.kind=`scalar`,e.result=``;d!==0;)if(d=e.input.charCodeAt(++e.position),d===43||d===45)Vn===i?i=d===43?Un:Hn:P(e,`repeat of a chomping mode identifier`);else if((u=Qn(d))>=0)u===0?P(e,`bad explicit indentation width of a block scalar; it cannot be less than one`):o?P(e,`repeat of an indentation width identifier`):(s=t+u-1,o=!0);else break;if(A(d)){do d=e.input.charCodeAt(++e.position);while(A(d));if(d===35)do d=e.input.charCodeAt(++e.position);while(!k(d)&&d!==0)}for(;d!==0;){for(lr(e),e.lineIndent=0,d=e.input.charCodeAt(e.position);(!o||e.lineIndent<s)&&d===32;)e.lineIndent++,d=e.input.charCodeAt(++e.position);if(!o&&e.lineIndent>s&&(s=e.lineIndent),k(d)){c++;continue}if(e.lineIndent<s){i===Un?e.result+=w.repeat(`
`,a?1+c:c):i===Vn&&a&&(e.result+=`
`);break}for(r?A(d)?(l=!0,e.result+=w.repeat(`
`,a?1+c:c)):l?(l=!1,e.result+=w.repeat(`
`,c+1)):c===0?a&&(e.result+=` `):e.result+=w.repeat(`
`,c):e.result+=w.repeat(`
`,a?1+c:c),a=!0,o=!0,c=0,n=e.position;!k(d)&&d!==0;)d=e.input.charCodeAt(++e.position);F(e,n,e.position,!1)}return!0}function _r(e,t){var n,r=e.tag,i=e.anchor,a=[],o,s=!1,c;if(e.firstTabInLine!==-1)return!1;for(e.anchor!==null&&(e.anchorMap[e.anchor]=a),c=e.input.charCodeAt(e.position);c!==0&&(e.firstTabInLine!==-1&&(e.position=e.firstTabInLine,P(e,`tab characters must not be used in indentation`)),!(c!==45||(o=e.input.charCodeAt(e.position+1),!j(o))));){if(s=!0,e.position++,L(e,!0,-1)&&e.lineIndent<=t){a.push(null),c=e.input.charCodeAt(e.position);continue}if(n=e.line,R(e,t,zn,!1,!0),a.push(e.result),L(e,!0,-1),c=e.input.charCodeAt(e.position),(e.line===n||e.lineIndent>t)&&c!==0)P(e,`bad indentation of a sequence entry`);else if(e.lineIndent<t)break}return s?(e.tag=r,e.anchor=i,e.kind=`sequence`,e.result=a,!0):!1}function vr(e,t,n){var r,i,a,o,s,c,l=e.tag,u=e.anchor,d={},f=Object.create(null),p=null,m=null,h=null,g=!1,_=!1,v;if(e.firstTabInLine!==-1)return!1;for(e.anchor!==null&&(e.anchorMap[e.anchor]=d),v=e.input.charCodeAt(e.position);v!==0;){if(!g&&e.firstTabInLine!==-1&&(e.position=e.firstTabInLine,P(e,`tab characters must not be used in indentation`)),r=e.input.charCodeAt(e.position+1),a=e.line,(v===63||v===58)&&j(r))v===63?(g&&(I(e,d,f,p,m,null,o,s,c),p=m=h=null),_=!0,g=!0,i=!0):g?(g=!1,i=!0):P(e,`incomplete explicit mapping pair; a key node is missed; or followed by a non-tabulated empty line`),e.position+=1,v=r;else{if(o=e.line,s=e.lineStart,c=e.position,!R(e,n,Rn,!1,!0))break;if(e.line===a){for(v=e.input.charCodeAt(e.position);A(v);)v=e.input.charCodeAt(++e.position);if(v===58)v=e.input.charCodeAt(++e.position),j(v)||P(e,`a whitespace character is expected after the key-value separator within a block mapping`),g&&(I(e,d,f,p,m,null,o,s,c),p=m=h=null),_=!0,g=!1,i=!1,p=e.tag,m=e.result;else if(_)P(e,`can not read an implicit mapping pair; a colon is missed`);else return e.tag=l,e.anchor=u,!0}else if(_)P(e,`can not read a block mapping entry; a multiline key may not be an implicit key`);else return e.tag=l,e.anchor=u,!0}if((e.line===a||e.lineIndent>t)&&(g&&(o=e.line,s=e.lineStart,c=e.position),R(e,t,Bn,!0,i)&&(g?m=e.result:h=e.result),g||(I(e,d,f,p,m,h,o,s,c),p=m=h=null),L(e,!0,-1),v=e.input.charCodeAt(e.position)),(e.line===a||e.lineIndent>t)&&v!==0)P(e,`bad indentation of a mapping entry`);else if(e.lineIndent<t)break}return g&&I(e,d,f,p,m,null,o,s,c),_&&(e.tag=l,e.anchor=u,e.kind=`mapping`,e.result=d),_}function yr(e){var t,n=!1,r=!1,i,a,o=e.input.charCodeAt(e.position);if(o!==33)return!1;if(e.tag!==null&&P(e,`duplication of a tag property`),o=e.input.charCodeAt(++e.position),o===60?(n=!0,o=e.input.charCodeAt(++e.position)):o===33?(r=!0,i=`!!`,o=e.input.charCodeAt(++e.position)):i=`!`,t=e.position,n){do o=e.input.charCodeAt(++e.position);while(o!==0&&o!==62);e.position<e.length?(a=e.input.slice(t,e.position),o=e.input.charCodeAt(++e.position)):P(e,`unexpected end of the stream within a verbatim tag`)}else{for(;o!==0&&!j(o);)o===33&&(r?P(e,`tag suffix cannot contain exclamation marks`):(i=e.input.slice(t-1,e.position+1),qn.test(i)||P(e,`named tag handle cannot contain such characters`),r=!0,t=e.position+1)),o=e.input.charCodeAt(++e.position);a=e.input.slice(t,e.position),Kn.test(a)&&P(e,`tag suffix cannot contain flow indicator characters`)}a&&!Jn.test(a)&&P(e,`tag name cannot contain such characters: `+a);try{a=decodeURIComponent(a)}catch{P(e,`tag name is malformed: `+a)}return n?e.tag=a:O.call(e.tagMap,i)?e.tag=e.tagMap[i]+a:i===`!`?e.tag=`!`+a:i===`!!`?e.tag=`tag:yaml.org,2002:`+a:P(e,`undeclared tag handle "`+i+`"`),!0}function br(e){var t,n=e.input.charCodeAt(e.position);if(n!==38)return!1;for(e.anchor!==null&&P(e,`duplication of an anchor property`),n=e.input.charCodeAt(++e.position),t=e.position;n!==0&&!j(n)&&!M(n);)n=e.input.charCodeAt(++e.position);return e.position===t&&P(e,`name of an anchor node must contain at least one character`),e.anchor=e.input.slice(t,e.position),!0}function xr(e){var t,n,r=e.input.charCodeAt(e.position);if(r!==42)return!1;for(r=e.input.charCodeAt(++e.position),t=e.position;r!==0&&!j(r)&&!M(r);)r=e.input.charCodeAt(++e.position);return e.position===t&&P(e,`name of an alias node must contain at least one character`),n=e.input.slice(t,e.position),O.call(e.anchorMap,n)||P(e,`unidentified alias "`+n+`"`),e.result=e.anchorMap[n],L(e,!0,-1),!0}function R(e,t,n,r,i){var a,o,s,c=1,l=!1,u=!1,d,f,p,m,h,g;if(e.listener!==null&&e.listener(`open`,e),e.tag=null,e.anchor=null,e.kind=null,e.result=null,a=o=s=Bn===n||zn===n,r&&L(e,!0,-1)&&(l=!0,e.lineIndent>t?c=1:e.lineIndent===t?c=0:e.lineIndent<t&&(c=-1)),c===1)for(;yr(e)||br(e);)L(e,!0,-1)?(l=!0,s=a,e.lineIndent>t?c=1:e.lineIndent===t?c=0:e.lineIndent<t&&(c=-1)):s=!1;if(s&&=l||i,(c===1||Bn===n)&&(h=Ln===n||Rn===n?t:t+1,g=e.position-e.lineStart,c===1?s&&(_r(e,g)||vr(e,g,h))||hr(e,h)?u=!0:(o&&gr(e,h)||pr(e,h)||mr(e,h)?u=!0:xr(e)?(u=!0,(e.tag!==null||e.anchor!==null)&&P(e,`alias node should not have any properties`)):fr(e,h,Ln===n)&&(u=!0,e.tag===null&&(e.tag=`?`)),e.anchor!==null&&(e.anchorMap[e.anchor]=e.result)):c===0&&(u=s&&_r(e,g))),e.tag===null)e.anchor!==null&&(e.anchorMap[e.anchor]=e.result);else if(e.tag===`?`){for(e.result!==null&&e.kind!==`scalar`&&P(e,`unacceptable node kind for !<?> tag; it should be "scalar", not "`+e.kind+`"`),d=0,f=e.implicitTypes.length;d<f;d+=1)if(m=e.implicitTypes[d],m.resolve(e.result)){e.result=m.construct(e.result),e.tag=m.tag,e.anchor!==null&&(e.anchorMap[e.anchor]=e.result);break}}else if(e.tag!==`!`){if(O.call(e.typeMap[e.kind||`fallback`],e.tag))m=e.typeMap[e.kind||`fallback`][e.tag];else for(m=null,p=e.typeMap.multi[e.kind||`fallback`],d=0,f=p.length;d<f;d+=1)if(e.tag.slice(0,p[d].tag.length)===p[d].tag){m=p[d];break}m||P(e,`unknown tag !<`+e.tag+`>`),e.result!==null&&m.kind!==e.kind&&P(e,`unacceptable node kind for !<`+e.tag+`> tag; it should be "`+m.kind+`", not "`+e.kind+`"`),m.resolve(e.result,e.tag)?(e.result=m.construct(e.result,e.tag),e.anchor!==null&&(e.anchorMap[e.anchor]=e.result)):P(e,`cannot resolve a node with !<`+e.tag+`> explicit tag`)}return e.listener!==null&&e.listener(`close`,e),e.tag!==null||e.anchor!==null||u}function Sr(e){var t=e.position,n,r,i,a=!1,o;for(e.version=null,e.checkLineBreaks=e.legacy,e.tagMap=Object.create(null),e.anchorMap=Object.create(null);(o=e.input.charCodeAt(e.position))!==0&&(L(e,!0,-1),o=e.input.charCodeAt(e.position),!(e.lineIndent>0||o!==37));){for(a=!0,o=e.input.charCodeAt(++e.position),n=e.position;o!==0&&!j(o);)o=e.input.charCodeAt(++e.position);for(r=e.input.slice(n,e.position),i=[],r.length<1&&P(e,`directive name must not be less than one character in length`);o!==0;){for(;A(o);)o=e.input.charCodeAt(++e.position);if(o===35){do o=e.input.charCodeAt(++e.position);while(o!==0&&!k(o));break}if(k(o))break;for(n=e.position;o!==0&&!j(o);)o=e.input.charCodeAt(++e.position);i.push(e.input.slice(n,e.position))}o!==0&&lr(e),O.call(sr,r)?sr[r](e,r,i):or(e,`unknown document directive "`+r+`"`)}if(L(e,!0,-1),e.lineIndent===0&&e.input.charCodeAt(e.position)===45&&e.input.charCodeAt(e.position+1)===45&&e.input.charCodeAt(e.position+2)===45?(e.position+=3,L(e,!0,-1)):a&&P(e,`directives end mark is expected`),R(e,e.lineIndent-1,Bn,!1,!0),L(e,!0,-1),e.checkLineBreaks&&Gn.test(e.input.slice(t,e.position))&&or(e,`non-ASCII line breaks are interpreted as content`),e.documents.push(e.result),e.position===e.lineStart&&ur(e)){e.input.charCodeAt(e.position)===46&&(e.position+=3,L(e,!0,-1));return}if(e.position<e.length-1)P(e,`end of the stream or a document separator is expected`);else return}function Cr(e,t){e=String(e),t||={},e.length!==0&&(e.charCodeAt(e.length-1)!==10&&e.charCodeAt(e.length-1)!==13&&(e+=`
`),e.charCodeAt(0)===65279&&(e=e.slice(1)));var n=new ir(e,t),r=e.indexOf(`\0`);for(r!==-1&&(n.position=r,P(n,`null byte is not allowed in input`)),n.input+=`\0`;n.input.charCodeAt(n.position)===32;)n.lineIndent+=1,n.position+=1;for(;n.position<n.length-1;)Sr(n);return n.documents}function wr(e,t,n){typeof t==`object`&&t&&n===void 0&&(n=t,t=null);var r=Cr(e,n);if(typeof t!=`function`)return r;for(var i=0,a=r.length;i<a;i+=1)t(r[i])}function Tr(e,t){var n=Cr(e,t);if(n.length!==0){if(n.length===1)return n[0];throw new E(`expected a single document in the stream, but found more`)}}var Er={loadAll:wr,load:Tr},Dr=Object.prototype.toString,Or=Object.prototype.hasOwnProperty,kr=65279,Ar=9,z=10,jr=13,Mr=32,Nr=33,Pr=34,Fr=35,Ir=37,Lr=38,Rr=39,zr=42,Br=44,Vr=45,Hr=58,Ur=61,Wr=62,Gr=63,Kr=64,qr=91,Jr=93,Yr=96,Xr=123,Zr=124,Qr=125,B={};B[0]=`\\0`,B[7]=`\\a`,B[8]=`\\b`,B[9]=`\\t`,B[10]=`\\n`,B[11]=`\\v`,B[12]=`\\f`,B[13]=`\\r`,B[27]=`\\e`,B[34]=`\\"`,B[92]=`\\\\`,B[133]=`\\N`,B[160]=`\\_`,B[8232]=`\\L`,B[8233]=`\\P`;var $r=[`y`,`Y`,`yes`,`Yes`,`YES`,`on`,`On`,`ON`,`n`,`N`,`no`,`No`,`NO`,`off`,`Off`,`OFF`],ei=/^[-+]?[0-9_]+(?::[0-9_]+)+(?:\.[0-9_]*)?$/;function ti(e,t){var n,r,i,a,o,s,c;if(t===null)return{};for(n={},r=Object.keys(t),i=0,a=r.length;i<a;i+=1)o=r[i],s=String(t[o]),o.slice(0,2)===`!!`&&(o=`tag:yaml.org,2002:`+o.slice(2)),c=e.compiledTypeMap.fallback[o],c&&Or.call(c.styleAliases,s)&&(s=c.styleAliases[s]),n[o]=s;return n}function ni(e){var t=e.toString(16).toUpperCase(),n,r;if(e<=255)n=`x`,r=2;else if(e<=65535)n=`u`,r=4;else if(e<=4294967295)n=`U`,r=8;else throw new E(`code point within a string may not be greater than 0xFFFFFFFF`);return`\\`+n+w.repeat(`0`,r-t.length)+t}var ri=1,V=2;function ii(e){this.schema=e.schema||In,this.indent=Math.max(1,e.indent||2),this.noArrayIndent=e.noArrayIndent||!1,this.skipInvalid=e.skipInvalid||!1,this.flowLevel=w.isNothing(e.flowLevel)?-1:e.flowLevel,this.styleMap=ti(this.schema,e.styles||null),this.sortKeys=e.sortKeys||!1,this.lineWidth=e.lineWidth||80,this.noRefs=e.noRefs||!1,this.noCompatMode=e.noCompatMode||!1,this.condenseFlow=e.condenseFlow||!1,this.quotingType=e.quotingType===`"`?V:ri,this.forceQuotes=e.forceQuotes||!1,this.replacer=typeof e.replacer==`function`?e.replacer:null,this.implicitTypes=this.schema.compiledImplicit,this.explicitTypes=this.schema.compiledExplicit,this.tag=null,this.result=``,this.duplicates=[],this.usedDuplicates=null}function ai(e,t){for(var n=w.repeat(` `,t),r=0,i=-1,a=``,o,s=e.length;r<s;)i=e.indexOf(`
`,r),i===-1?(o=e.slice(r),r=s):(o=e.slice(r,i+1),r=i+1),o.length&&o!==`
`&&(a+=n),a+=o;return a}function oi(e,t){return`
`+w.repeat(` `,e.indent*t)}function si(e,t){var n,r,i;for(n=0,r=e.implicitTypes.length;n<r;n+=1)if(i=e.implicitTypes[n],i.resolve(t))return!0;return!1}function ci(e){return e===Mr||e===Ar}function H(e){return 32<=e&&e<=126||161<=e&&e<=55295&&e!==8232&&e!==8233||57344<=e&&e<=65533&&e!==kr||65536<=e&&e<=1114111}function li(e){return H(e)&&e!==kr&&e!==jr&&e!==z}function ui(e,t,n){var r=li(e),i=r&&!ci(e);return(n?r:r&&e!==Br&&e!==qr&&e!==Jr&&e!==Xr&&e!==Qr)&&e!==Fr&&!(t===Hr&&!i)||li(t)&&!ci(t)&&e===Fr||t===Hr&&i}function di(e){return H(e)&&e!==kr&&!ci(e)&&e!==Vr&&e!==Gr&&e!==Hr&&e!==Br&&e!==qr&&e!==Jr&&e!==Xr&&e!==Qr&&e!==Fr&&e!==Lr&&e!==zr&&e!==Nr&&e!==Zr&&e!==Ur&&e!==Wr&&e!==Rr&&e!==Pr&&e!==Ir&&e!==Kr&&e!==Yr}function fi(e){return!ci(e)&&e!==Hr}function U(e,t){var n=e.charCodeAt(t),r;return n>=55296&&n<=56319&&t+1<e.length&&(r=e.charCodeAt(t+1),r>=56320&&r<=57343)?(n-55296)*1024+r-56320+65536:n}function pi(e){return/^\n* /.test(e)}var mi=1,hi=2,gi=3,_i=4,W=5;function vi(e,t,n,r,i,a,o,s){var c,l=0,u=null,d=!1,f=!1,p=r!==-1,m=-1,h=di(U(e,0))&&fi(U(e,e.length-1));if(t||o)for(c=0;c<e.length;l>=65536?c+=2:c++){if(l=U(e,c),!H(l))return W;h&&=ui(l,u,s),u=l}else{for(c=0;c<e.length;l>=65536?c+=2:c++){if(l=U(e,c),l===z)d=!0,p&&(f||=c-m-1>r&&e[m+1]!==` `,m=c);else if(!H(l))return W;h&&=ui(l,u,s),u=l}f||=p&&c-m-1>r&&e[m+1]!==` `}return!d&&!f?h&&!o&&!i(e)?mi:a===V?W:hi:n>9&&pi(e)?W:o?a===V?W:hi:f?_i:gi}function yi(e,t,n,r,i){e.dump=function(){if(t.length===0)return e.quotingType===V?`""`:`''`;if(!e.noCompatMode&&($r.indexOf(t)!==-1||ei.test(t)))return e.quotingType===V?`"`+t+`"`:`'`+t+`'`;var a=e.indent*Math.max(1,n),o=e.lineWidth===-1?-1:Math.max(Math.min(e.lineWidth,40),e.lineWidth-a),s=r||e.flowLevel>-1&&n>=e.flowLevel;function c(t){return si(e,t)}switch(vi(t,s,e.indent,o,c,e.quotingType,e.forceQuotes&&!r,i)){case mi:return t;case hi:return`'`+t.replace(/'/g,`''`)+`'`;case gi:return`|`+bi(t,e.indent)+xi(ai(t,a));case _i:return`>`+bi(t,e.indent)+xi(ai(Si(t,o),a));case W:return`"`+wi(t)+`"`;default:throw new E(`impossible error: invalid scalar style`)}}()}function bi(e,t){var n=pi(e)?String(t):``,r=e[e.length-1]===`
`;return n+(r&&(e[e.length-2]===`
`||e===`
`)?`+`:r?``:`-`)+`
`}function xi(e){return e[e.length-1]===`
`?e.slice(0,-1):e}function Si(e,t){for(var n=/(\n+)([^\n]*)/g,r=function(){var r=e.indexOf(`
`);return r=r===-1?e.length:r,n.lastIndex=r,Ci(e.slice(0,r),t)}(),i=e[0]===`
`||e[0]===` `,a,o;o=n.exec(e);){var s=o[1],c=o[2];a=c[0]===` `,r+=s+(!i&&!a&&c!==``?`
`:``)+Ci(c,t),i=a}return r}function Ci(e,t){if(e===``||e[0]===` `)return e;for(var n=/ [^ ]/g,r,i=0,a,o=0,s=0,c=``;r=n.exec(e);)s=r.index,s-i>t&&(a=o>i?o:s,c+=`
`+e.slice(i,a),i=a+1),o=s;return c+=`
`,e.length-i>t&&o>i?c+=e.slice(i,o)+`
`+e.slice(o+1):c+=e.slice(i),c.slice(1)}function wi(e){for(var t=``,n=0,r,i=0;i<e.length;n>=65536?i+=2:i++)n=U(e,i),r=B[n],!r&&H(n)?(t+=e[i],n>=65536&&(t+=e[i+1])):t+=r||ni(n);return t}function Ti(e,t,n){var r=``,i=e.tag,a,o,s;for(a=0,o=n.length;a<o;a+=1)s=n[a],e.replacer&&(s=e.replacer.call(n,String(a),s)),(G(e,t,s,!1,!1)||s===void 0&&G(e,t,null,!1,!1))&&(r!==``&&(r+=`,`+(e.condenseFlow?``:` `)),r+=e.dump);e.tag=i,e.dump=`[`+r+`]`}function Ei(e,t,n,r){var i=``,a=e.tag,o,s,c;for(o=0,s=n.length;o<s;o+=1)c=n[o],e.replacer&&(c=e.replacer.call(n,String(o),c)),(G(e,t+1,c,!0,!0,!1,!0)||c===void 0&&G(e,t+1,null,!0,!0,!1,!0))&&((!r||i!==``)&&(i+=oi(e,t)),e.dump&&z===e.dump.charCodeAt(0)?i+=`-`:i+=`- `,i+=e.dump);e.tag=a,e.dump=i||`[]`}function Di(e,t,n){var r=``,i=e.tag,a=Object.keys(n),o,s,c,l,u;for(o=0,s=a.length;o<s;o+=1)u=``,r!==``&&(u+=`, `),e.condenseFlow&&(u+=`"`),c=a[o],l=n[c],e.replacer&&(l=e.replacer.call(n,c,l)),G(e,t,c,!1,!1)&&(e.dump.length>1024&&(u+=`? `),u+=e.dump+(e.condenseFlow?`"`:``)+`:`+(e.condenseFlow?``:` `),G(e,t,l,!1,!1)&&(u+=e.dump,r+=u));e.tag=i,e.dump=`{`+r+`}`}function Oi(e,t,n,r){var i=``,a=e.tag,o=Object.keys(n),s,c,l,u,d,f;if(e.sortKeys===!0)o.sort();else if(typeof e.sortKeys==`function`)o.sort(e.sortKeys);else if(e.sortKeys)throw new E(`sortKeys must be a boolean or a function`);for(s=0,c=o.length;s<c;s+=1)f=``,(!r||i!==``)&&(f+=oi(e,t)),l=o[s],u=n[l],e.replacer&&(u=e.replacer.call(n,l,u)),G(e,t+1,l,!0,!0,!0)&&(d=e.tag!==null&&e.tag!==`?`||e.dump&&e.dump.length>1024,d&&(e.dump&&z===e.dump.charCodeAt(0)?f+=`?`:f+=`? `),f+=e.dump,d&&(f+=oi(e,t)),G(e,t+1,u,!0,d)&&(e.dump&&z===e.dump.charCodeAt(0)?f+=`:`:f+=`: `,f+=e.dump,i+=f));e.tag=a,e.dump=i||`{}`}function ki(e,t,n){var r,i=n?e.explicitTypes:e.implicitTypes,a,o,s,c;for(a=0,o=i.length;a<o;a+=1)if(s=i[a],(s.instanceOf||s.predicate)&&(!s.instanceOf||typeof t==`object`&&t instanceof s.instanceOf)&&(!s.predicate||s.predicate(t))){if(n?s.multi&&s.representName?e.tag=s.representName(t):e.tag=s.tag:e.tag=`?`,s.represent){if(c=e.styleMap[s.tag]||s.defaultStyle,Dr.call(s.represent)===`[object Function]`)r=s.represent(t,c);else if(Or.call(s.represent,c))r=s.represent[c](t,c);else throw new E(`!<`+s.tag+`> tag resolver accepts not "`+c+`" style`);e.dump=r}return!0}return!1}function G(e,t,n,r,i,a,o){e.tag=null,e.dump=n,ki(e,n,!1)||ki(e,n,!0);var s=Dr.call(e.dump),c=r,l;r&&=e.flowLevel<0||e.flowLevel>t;var u=s===`[object Object]`||s===`[object Array]`,d,f;if(u&&(d=e.duplicates.indexOf(n),f=d!==-1),(e.tag!==null&&e.tag!==`?`||f||e.indent!==2&&t>0)&&(i=!1),f&&e.usedDuplicates[d])e.dump=`*ref_`+d;else{if(u&&f&&!e.usedDuplicates[d]&&(e.usedDuplicates[d]=!0),s===`[object Object]`)r&&Object.keys(e.dump).length!==0?(Oi(e,t,e.dump,i),f&&(e.dump=`&ref_`+d+e.dump)):(Di(e,t,e.dump),f&&(e.dump=`&ref_`+d+` `+e.dump));else if(s===`[object Array]`)r&&e.dump.length!==0?(e.noArrayIndent&&!o&&t>0?Ei(e,t-1,e.dump,i):Ei(e,t,e.dump,i),f&&(e.dump=`&ref_`+d+e.dump)):(Ti(e,t,e.dump),f&&(e.dump=`&ref_`+d+` `+e.dump));else if(s===`[object String]`)e.tag!==`?`&&yi(e,e.dump,t,a,c);else if(s===`[object Undefined]`)return!1;else{if(e.skipInvalid)return!1;throw new E(`unacceptable kind of an object to dump `+s)}e.tag!==null&&e.tag!==`?`&&(l=encodeURI(e.tag[0]===`!`?e.tag.slice(1):e.tag).replace(/!/g,`%21`),l=e.tag[0]===`!`?`!`+l:l.slice(0,18)===`tag:yaml.org,2002:`?`!!`+l.slice(18):`!<`+l+`>`,e.dump=l+` `+e.dump)}return!0}function Ai(e,t){var n=[],r=[],i,a;for(ji(e,n,r),i=0,a=r.length;i<a;i+=1)t.duplicates.push(n[r[i]]);t.usedDuplicates=Array(a)}function ji(e,t,n){var r,i,a;if(typeof e==`object`&&e)if(i=t.indexOf(e),i!==-1)n.indexOf(i)===-1&&n.push(i);else if(t.push(e),Array.isArray(e))for(i=0,a=e.length;i<a;i+=1)ji(e[i],t,n);else for(r=Object.keys(e),i=0,a=r.length;i<a;i+=1)ji(e[r[i]],t,n)}function Mi(e,t){t||={};var n=new ii(t);n.noRefs||Ai(e,n);var r=e;return n.replacer&&(r=n.replacer.call({"":r},``,r)),G(n,0,r,!0,!0)?n.dump+`
`:``}var Ni={dump:Mi},Pi=Er.load;Er.loadAll;var Fi=Ni.dump;const K={BACKEND:`https://url.v1.mk`,LOCK_BACKEND:!1,REMOTE_CONFIG:``,CHUNK_COUNT:`20`};function Ii(e,t=10){let n=[],r=[];return e.forEach((e,i)=>{r.push(e),(i+1)%t===0&&(n.push(r.join(`|`)),r=[])}),r.length>0&&n.push(r.join(`|`)),n}function Li(e){try{return JSON.parse(e),!0}catch{return!1}}function q(e,t){return Object.hasOwn(e,t)}const J={retries:0,retryDelay:1e3,maxRetryDelay:3e4,timeout:1e4,retryOn:[408,429,500,502,503,504],exponentialBackoff:!0,jitter:.1},Ri={timeout:0};var zi=class{requestInterceptors=[];responseInterceptors=[];useRequestInterceptor(e){this.requestInterceptors.push(e)}useResponseInterceptor(e){this.responseInterceptors.push(e)}async request(e,t={}){let n,r;e instanceof Request?(r=e.url,n={...t,retries:J.retries,url:r,method:e.method||`GET`,headers:Object.fromEntries(e.headers.entries())}):typeof e==`string`||e instanceof URL?(r=e.toString(),n={...t,retries:J.retries,url:r}):(r=e.url,n={...e,...t,retries:t.retries??J.retries}),n.retries=n.retries??J.retries,n.retryDelay=n.retryDelay??J.retryDelay,n.timeout=n.timeout??Ri.timeout,n.method=n.method||`GET`;for(let e of this.requestInterceptors)n=await e(n);if(n.params){let e=new URLSearchParams(n.params).toString();n.url+=(n.url.includes(`?`)?`&`:`?`)+e}let i=0,a=new AbortController,o=t.signal||a.signal,s=async()=>{i++;let e;n.timeout&&n.timeout>0&&(e=setTimeout(()=>{a.abort()},n.timeout));try{let t=new Request(n.url,{method:n.method,headers:n.headers,body:n.body?JSON.stringify(n.body):void 0,signal:o}),r=await fetch(t);e&&clearTimeout(e);let a;switch(n.responseType){case`text`:a=await r.text();break;case`blob`:a=await r.blob();break;case`arrayBuffer`:a=await r.arrayBuffer();break;case`formData`:a=await r.formData();break;case`stream`:if(!r.body)throw Error(`Response body is null`);a=r.body;break;default:a=await r.json();break}let c={data:a,status:r.status,statusText:r.statusText,headers:Object.fromEntries(r.headers.entries()),config:n,ok:r.ok};for(let e of this.responseInterceptors)c=await e(c);return!r.ok&&n.retries>0&&i<n.retries?(await new Promise(e=>setTimeout(e,n.retryDelay)),s()):c}catch(t){if(e&&clearTimeout(e),t.name===`AbortError`)throw Error(`请求超时`);if(n.retries>0&&i<n.retries)return await new Promise(e=>setTimeout(e,n.retryDelay)),s();throw t}};return s()}get(e,t){return this.request(e,{...t,method:`GET`})}post(e,t,n){return this.request(e,{...n,method:`POST`,body:t})}put(e,t,n){return this.request(e,{...n,method:`PUT`,body:t})}delete(e,t){return this.request(e,{...t,method:`DELETE`})}patch(e,t,n){return this.request(e,{...n,method:`PATCH`,body:t})}async fetchJson(e,t){return await this.request(e,{...t,headers:{Accept:`application/json`,...t?.headers}})}async fetchBlob(e,t){let n=await fetch(new Request(e,t));return{data:await n.blob(),status:n.status,statusText:n.statusText,headers:Object.fromEntries(n.headers.entries()),config:{url:n.url,...t},ok:n.ok}}async fetchText(e,t){let n=await fetch(new Request(e,t));return{data:await n.text(),status:n.status,statusText:n.statusText,headers:Object.fromEntries(n.headers.entries()),config:{url:n.url,...t},ok:n.ok}}async fetchArrayBuffer(e,t){let n=await fetch(new Request(e,t));return{data:await n.arrayBuffer(),status:n.status,statusText:n.statusText,headers:Object.fromEntries(n.headers.entries()),config:{url:n.url,...t},ok:n.ok}}async fetchFormData(e,t){let n=await fetch(new Request(e,t));return{data:await n.formData(),status:n.status,statusText:n.statusText,headers:Object.fromEntries(n.headers.entries()),config:{url:n.url,...t},ok:n.ok}}async fetchStream(e,t){let n=await fetch(new Request(e,t));if(!n.body)throw Error(`Response body is null`);return{data:n.body,status:n.status,statusText:n.statusText,headers:Object.fromEntries(n.headers.entries()),config:{url:n.url,...t},ok:n.ok}}},Bi=class extends Error{constructor(e,t,n,r){super(e),this.message=e,this.status=t,this.response=n,this.attempt=r,this.name=`FetchRetryError`}};function Vi(e,t){let n=t.retryDelay;if(t.exponentialBackoff&&(n*=2**(e-1)),t.jitter>0){let e=t.jitter*Math.random();n*=1+e}return Math.min(n,t.maxRetryDelay)}function Hi(e){return new Promise((t,n)=>{setTimeout(()=>{n(new Bi(`请求超时 (${e}ms)`))},e)})}async function Ui(e,t={}){let n={...J,...t,retries:t.retries===1/0?30:Math.min(t.retries||J.retries||0,30)},r=0,i=async()=>{r++;try{let a,o;if(e instanceof Request){o=e.url;let n=e.clone();a=new Request(n,{...n,...t})}else o=e.toString(),a=new Request(o,t);let s=fetch(a),c=n.timeout?Hi(n.timeout):null,l=await(c?Promise.race([s,c]):s),u={status:l.status,statusText:l.statusText,headers:Object.fromEntries(l.headers.entries()),data:l,config:{url:o,...t},ok:l.ok};if(n.retries>0&&r<=n.retries&&(typeof n.retryOn==`function`?n.retryOn(l):n.retryOn.includes(l.status))){let e=Vi(r,n);if(n.onRetry&&await n.onRetry(r,e),n.onError){let e=new Bi(`请求失败，状态码 ${u.status}`,u.status,l,r);await n.onError(e,r)}return await new Promise(t=>setTimeout(t,e)),i()}return u}catch(e){let t=e instanceof Bi?e:new Bi(e.message||`请求失败`,void 0,void 0,r);if(n.onError&&await n.onError(t,r),n.retries>0&&r<=n.retries){let e=Vi(r,n);return n.onRetry&&await n.onRetry(r,e),await new Promise(t=>setTimeout(t,e)),i()}throw t}};return i()}new zi;function Wi(e){if(!e)return e;let t=atob(e),n=new Uint8Array(t.length);for(let e=0;e<t.length;e++)n[e]=t.charCodeAt(e);return new TextDecoder().decode(n)}function Gi(e,t){let n=t||(e=>e);try{return e?Wi(e.toString()):n(e)}catch{return n(e)}}function Y(e){if(!e)return e;let t=new TextEncoder().encode(e.trim()),n=``;for(let e=0;e<t.length;e+=1)n+=String.fromCharCode(t[e]);return btoa(n)}function Ki(e,t){let n=t||(e=>e);try{return e?Y(e.toString()):n(e)}catch{return n(e)}}var qi=class{existVps=[];existVpsMap=new Map;constructor(e=[]){this.existVps=e,this.updateExist(this.existVps)}updateExist(e=[]){for(let t of e){let e=this.getParser(t);e&&this.setExistVpsMap(e)}}updateVpsPs(e){let t=this.getParser(e);if(!t)return null;let n=t.originPs,[r,i]=n.split(`#`);if(!i)return e;let a=this.existVpsMap.get(i)||0,o=a===0?n:`${r}#${i} ${a}`;return t.updateOriginConfig(o),this.existVpsMap.set(i,a+1),t.originLink}setExistVpsMap(e){let[,t]=e.originPs.split(`#`);if(!t)return;let[n,r]=t.split(` `),i=r?Number.parseInt(r)>>>0:0,a=this.existVpsMap.get(n)||0;this.existVpsMap.set(n,Math.max(a,i+1))}getParser(e){return e.startsWith(`anytls://`)?new Yi(e):e.startsWith(`vless://`)?new ta(e):e.startsWith(`vmess://`)?new na(e):e.startsWith(`trojan://`)?new $i(e):e.startsWith(`ss://`)?new Zi(e):e.startsWith(`ssr://`)?new Qi(e):e.startsWith(`hysteria2://`)||e.startsWith(`hysteria://`)||e.startsWith(`hy2://`)?new Xi(e):e.startsWith(`tuic://`)?new ea(e):null}},Ji=class extends qi{constructor(e=[]){super(e)}},X=class extends at{constructor(){super()}#e=[`localhost`,`127.0.0.1`,`abc.cba.com`];#t=[`AES_256_GCM`,`CHACHA20_POLY1305`,`AES_128_GCM`,`CHACHA20_IETF`];#n=1024;#r=65535;getUUID(){return crypto.randomUUID()}getUsername(){return this.getUUID()}getPassword(){return this.getUUID()}getHost(){return`${this.getHostName()}:${this.getPort()}`}getHostName(){return this.#e[Math.floor(Math.random()*this.#e.length)]}getPort(){return Math.floor(Math.random()*(this.#r-this.#n+1)+this.#n).toString()}getEncrtptionProtocol(){return this.#t[Math.floor(Math.random()*this.#t.length)]}},Z=class e{static#e=`^LINK_TO^`;static#t=new Map;static getPs(t){let n=t.split(e.#e);return[n[0],n[1]]}static setPs(t,n){return[this.formatPs(t),n].join(e.#e)}static formatPs(e){return e?e.replace(/\|/g,`-`):crypto.randomUUID()}static getPrefix(t){if(!t?.includes(e.#e))return null;if(e.#t.has(t))return e.#t.get(t);let[n]=e.getPs(t);if(n){let r=n.trim();return e.#t.set(t,r),r}return null}static isConfigType(e){return e.includes(this.#e)}static clearCache(){this.#t.clear()}},Yi=class extends X{#e=``;#t=``;#n={};#r={};#i=``;#a=``;#o=``;constructor(e){super(),this.#a=crypto.randomUUID(),this.setOriginConfig(e),this.setConfuseConfig(e)}setOriginConfig(e){this.#e=e,this.#n=new URL(e),this.#i=this.#n.hash??``,this.#o=this.getTag(this.#n.hash)??``}updateOriginConfig(e){this.#n.hash=e,this.#i=e,this.#e=this.#n.href,this.setConfuseConfig(this.#e)}setConfuseConfig(e){this.#r=new URL(e),this.#r.username=this.getUsername(),this.#r.host=this.getHost(),this.#r.hostname=this.getHostName(),this.#r.port=this.getPort(),this.#r.hash=Z.setPs(this.#i,this.#a),this.#t=this.#r.href}restoreClash(e,t){return e.name=t,e.server=this.originConfig.hostname??``,e.port=Number(this.originConfig.port??0),e.password=this.originConfig.username??``,this.originConfig.searchParams?.has(`sni`)&&(e.sni=this.originConfig.searchParams.get(`sni`)??``),this.originConfig.searchParams?.has(`insecure`)&&(e[`skip-cert-verify`]=this.originConfig.searchParams.get(`insecure`)===`1`),e}restoreSingbox(e,t){return e.tag=t,e.server=this.originConfig.hostname??``,e.server_port=Number(this.originConfig.port??0),e.password=this.originConfig.username??``,e.tls?.server_name&&this.originConfig.searchParams?.has(`sni`)&&(e.tls.server_name=this.originConfig.searchParams.get(`sni`)??``),e.tls&&this.originConfig.searchParams?.has(`insecure`)&&(e.tls.insecure=this.originConfig.searchParams.get(`insecure`)===`1`),e}get originPs(){return this.#i}get originLink(){return this.#e}get originConfig(){return this.#n}get confusePs(){return encodeURIComponent(this.#a)}get confuseLink(){return this.#t}get confuseConfig(){return this.#r}get tag(){return this.#o??null}},Xi=class extends X{#e=``;#t=``;#n={};#r={};#i=``;#a=``;#o=``;constructor(e){super(),this.#a=crypto.randomUUID(),this.setOriginConfig(e),this.setConfuseConfig(e)}setOriginConfig(e){this.#e=e,this.#n=new URL(e),this.#i=this.#n.hash??``,this.#o=this.getTag(this.#n.hash)??``}updateOriginConfig(e){this.#n.hash=e,this.#i=e,this.#e=this.#n.href,this.setConfuseConfig(this.#e)}setConfuseConfig(e){this.#r=new URL(e),this.#r.username=this.getUsername(),this.#r.host=this.getHost(),this.#r.hostname=this.getHostName(),this.#r.port=this.getPort(),this.#r.hash=Z.setPs(this.#i,this.#a),this.#t=this.#r.href}restoreClash(e,t){return e.name=t,e.server=this.originConfig.hostname??``,e.port=Number(this.originConfig.port??0),e.type===`hysteria2`&&q(e,`password`)&&(e.password=this.originConfig?.searchParams?.get(`password`)??this.originConfig.username??``),e.type===`hysteria2`&&q(e,`auth`)&&(e.auth=this.originConfig?.searchParams?.get(`auth`)??this.originConfig.username??``),q(e,`down`)&&(e.down=e.down===``?this.originConfig.searchParams?.get(`down`)??this.originConfig.searchParams?.get(`downmbps`)??0:e.down,e.down=decodeURIComponent(e.down)),q(e,`up`)&&(e.up=e.up===``?this.originConfig.searchParams?.get(`up`)??this.originConfig.searchParams?.get(`upmbps`)??0:e.up,e.up=decodeURIComponent(e.up)),q(e,`delay`)&&(e.delay=this.originConfig.searchParams?.get(`delay`)??0),this.originConfig.searchParams?.has(`sni`)&&(e.sni=this.originConfig.searchParams?.get(`sni`)??``),this.originConfig.searchParams?.has(`insecure`)&&(e[`skip-cert-verify`]=this.originConfig.searchParams.get(`insecure`)===`1`),e}restoreSingbox(e,t){return e.password=this.originConfig?.searchParams?.get(`password`)??``,e.server=this.originConfig.hostname??``,e.server_port=Number(this.originConfig.port??0),e.tag=t,e.down&&=decodeURIComponent(e.down),e.up&&=decodeURIComponent(e.up),e.tls&&this.originConfig.searchParams?.has(`insecure`)&&(e.tls.insecure=this.originConfig.searchParams.get(`insecure`)===`1`),e}get originPs(){return this.#i}get originLink(){return this.#e}get originConfig(){return this.#n}get confusePs(){return encodeURIComponent(this.#a)}get confuseLink(){return this.#t}get confuseConfig(){return this.#r}get tag(){return this.#o??null}},Zi=class extends X{#e=``;#t=``;#n={};#r={};#i=``;#a=``;#o=``;constructor(e){super(),this.#a=crypto.randomUUID(),this.setOriginConfig(e),this.setConfuseConfig(e)}setOriginConfig(e){let t=this.toStandard(e);this.#e=t,this.#n=new URL(t),this.#i=this.#n.hash??``,this.#o=this.getTag(this.#n.hash)??``}updateOriginConfig(e){this.#n.hash=e,this.#i=e,this.#e=this.#n.href,this.setConfuseConfig(this.#e)}setConfuseConfig(e){this.#r=new URL(this.toStandard(e)),this.#r.username=this.getUsername(),this.#r.host=this.getHost(),this.#r.hostname=this.getHostName(),this.#r.port=this.getPort(),this.#r.hash=Z.setPs(this.#i,this.#a),this.#t=`ss://${decodeURIComponent(this.#n.username)}@${this.#r.hostname}:${this.#r.port}${this.#r.search}#${this.#r.hash}`}restoreClash(e,t){return e.name=t,e.server=this.originConfig.hostname??``,e.port=Number(this.originConfig?.port??0),e}restoreSingbox(e,t){return e.server=this.originConfig.hostname??``,e.server_port=Number(this.originConfig.port??0),e.tag=t,e}get originPs(){return this.#i}get originLink(){return this.#e}get originConfig(){return this.#n}get confusePs(){return this.#a}get confuseLink(){return this.#t}get confuseConfig(){return this.#r}get tag(){return this.#o??null}toStandard(e){let t=e.match(/#(.*)$/),n=t?`#${t[1]}`:``,r=e.replace(/#.*$/,``);if(!r.startsWith(`ss://`))return e;let i=r.substring(5);if(i.includes(`@`))return e;try{let e=Wi(i),t=e.lastIndexOf(`@`);if(t===-1)throw Error(`Invalid SIP002 format: missing @ separator`);let r=e.substring(0,t),a=e.substring(t+1),o=r.indexOf(`:`);if(o===-1)throw Error(`Invalid user info: missing colon separator`);let s=r.substring(0,o),c=r.substring(o+1),l=a.lastIndexOf(`:`);if(l===-1)throw Error(`Invalid server info: missing port`);let u=a.substring(0,l),d=a.substring(l+1);if(!s||!c||!u||!d)throw Error(`Invalid format: missing required fields`);let f=`ss://${Y(`${s}:${c}`)}@${u}:${d}`;return f+=`?type=tcp`,n&&(f+=n),f}catch{return e}}},Qi=class extends X{#e=``;#t=``;#n={};#r={};#i=``;#a=``;#o=``;constructor(e){super(),this.#a=crypto.randomUUID(),this.setOriginConfig(e),this.setConfuseConfig()}setOriginConfig(e){let[t,n]=e.match(/ssr:\/\/(.*)/)||[];this.#e=e,this.#n=this.getOriginConfig(Wi(n)),this.#i=this.#n.remarks??``,this.#o=this.getTag(this.#n.remarks)??``}getOriginConfig(e){let[t,n,r,i,a,o]=e.split(`:`),s=new URL(e);return{server:t,port:n,protocol:r,method:i,obfs:a,password_base64:o.replace(s.search,``),remarks:Gi(s.searchParams.get(`remarks`)?.replace(`-`,`+`)||``),params:s.search.replace(`?remarks=${s.searchParams.get(`remarks`)}`,``)}}updateOriginConfig(e){this.#n.remarks=e,this.#i=e,this.#e=`ssr://${Y(`${this.#n.server}:${this.#n.port}:${this.#n.protocol}:${this.#n.method}:${this.#n.obfs}:${this.#n.password_base64}?remarks=${this.#n.remarks}${this.#n.params}`)}`,this.setConfuseConfig()}setConfuseConfig(){this.#r=structuredClone(this.#n),this.#r.server=this.getHostName(),this.#r.port=this.getPort(),this.#r.remarks=Y(Z.setPs(this.#i,this.#a)),this.#t=`ssr://${Y(`${this.#r.server}:${this.#r.port}:${this.#r.protocol}:${this.#r.method}:${this.#r.obfs}:${this.#r.password_base64}?remarks=${this.#r.remarks}${this.#r.params}`)}`}restoreClash(e,t){return e.name=t,e.server=this.originConfig.server??``,e.port=Number(this.originConfig?.port??0),e}restoreSingbox(e,t){return e.server=this.originConfig.server??``,e.server_port=Number(this.originConfig.port??0),e.tag=t,e.tls?.server_name&&(e.tls.server_name=this.originConfig.add??``),e}get originPs(){return this.#i}get originLink(){return this.#e}get originConfig(){return this.#n}get confusePs(){return this.#a}get confuseLink(){return this.#t}get confuseConfig(){return this.#r}get tag(){return this.#o??null}},$i=class extends X{#e=``;#t=``;#n={};#r={};#i=``;#a=``;#o=``;constructor(e){super(),this.#a=crypto.randomUUID(),this.setOriginConfig(e),this.setConfuseConfig(e)}setOriginConfig(e){this.#e=e,this.#n=new URL(e),this.#i=Z.formatPs(this.#n.hash)??``,this.#o=this.getTag(this.#n.hash)??``}updateOriginConfig(e){this.#n.hash=Z.formatPs(e),this.#i=Z.formatPs(e),this.#e=this.#n.href,this.setConfuseConfig(this.#e)}setConfuseConfig(e){this.#r=new URL(e),this.#r.username=this.getUsername(),this.#r.host=this.getHost(),this.#r.hostname=this.getHostName(),this.#r.port=this.getPort(),this.#r.hash=Z.setPs(this.#i,this.#a),this.#t=this.#r.href}restoreClash(e,t){return e.name=t,e.server=this.originConfig.hostname??``,e.port=Number(this.originConfig.port??0),e.password=this.originConfig?.username??``,e.alpn=e.alpn?e.alpn.map(e=>decodeURIComponent(e)):e.alpn,e}restoreSingbox(e,t){return e.password=this.originConfig?.username??``,e.server=this.originConfig.hostname??``,e.server_port=Number(this.originConfig.port??0),e.tag=t,e.tls?.server_name&&(e.tls.server_name=this.originConfig.hostname??``),e.tls?.alpn&&(e.tls.alpn=e.tls.alpn.map(e=>decodeURIComponent(e))),e}get originPs(){return this.#i}get originLink(){return this.#e}get originConfig(){return this.#n}get confusePs(){return encodeURIComponent(this.#a)}get confuseLink(){return this.#t}get confuseConfig(){return this.#r}get tag(){return this.#o??null}},ea=class extends X{#e=``;#t=``;#n={};#r={};#i=``;#a=``;#o=``;constructor(e){super(),this.#a=crypto.randomUUID(),this.setOriginConfig(e),this.setConfuseConfig(e)}setOriginConfig(e){this.#e=e,this.#n=new URL(e),this.#i=this.#n.hash??``,this.#o=this.getTag(this.#n.hash)??``}updateOriginConfig(e){this.#n.hash=e,this.#i=e,this.#e=this.#n.href,this.setConfuseConfig(this.#e)}setConfuseConfig(e){this.#r=new URL(e),this.#r.username=this.getUsername(),this.#r.password=this.getPassword(),this.#r.host=this.getHost(),this.#r.hostname=this.getHostName(),this.#r.port=this.getPort(),this.#r.hash=Z.setPs(this.#i,this.#a),this.#t=this.#r.href}restoreClash(e,t){return e.name=t,e.server=this.originConfig.hostname??``,e.port=Number(this.originConfig.port??0),e.uuid=this.originConfig.username??``,e.password=this.originConfig.password??``,this.originConfig.searchParams?.has(`sni`)&&(e.sni=this.originConfig.searchParams?.get(`sni`)??``),this.originConfig.searchParams?.has(`allow_insecure`)&&(e[`skip-cert-verify`]=this.originConfig.searchParams.get(`allow_insecure`)===`1`),e}restoreSingbox(e,t){return e.tag=t,e.server=this.originConfig.hostname??``,e.server_port=Number(this.originConfig.port??0),e.uuid=this.originConfig.username??``,e.password=this.originConfig.password??``,e.tls?.server_name&&this.originConfig.searchParams?.has(`sni`)&&(e.tls.server_name=this.originConfig.searchParams?.get(`sni`)??``),e.tls&&this.originConfig.searchParams?.has(`allow_insecure`)&&(e.tls.insecure=this.originConfig.searchParams.get(`allow_insecure`)===`1`),e}get originPs(){return this.#i}get originLink(){return this.#e}get originConfig(){return this.#n}get confusePs(){return encodeURIComponent(this.#a)}get confuseLink(){return this.#t}get confuseConfig(){return this.#r}get tag(){return this.#o??null}},ta=class extends X{#e=``;#t=``;#n={};#r={};#i=``;#a=``;#o=``;constructor(e){super(),this.#a=crypto.randomUUID(),this.setOriginConfig(e),this.setConfuseConfig(e)}setOriginConfig(e){this.#e=e,this.#n=new URL(e),this.#i=Z.formatPs(this.#n.hash)??``,this.#o=this.getTag(this.#n.hash)??``}updateOriginConfig(e){this.#n.hash=Z.formatPs(e),this.#i=Z.formatPs(e),this.#e=this.#n.href,this.setConfuseConfig(this.#e)}setConfuseConfig(e){this.#r=new URL(e),this.#r.username=this.getUsername(),this.#r.host=this.getHost(),this.#r.hostname=this.getHostName(),this.#r.port=this.getPort(),this.#r.hash=Z.setPs(this.#i,this.#a),this.#t=this.#r.href}#s(e){return q(e,`Host`)?{...e,Host:e.Host||this.originConfig.add||``}:e}#c(e){e.network===`ws`&&(e[`ws-opts`]={...e[`ws-opts`],headers:this.#s(e[`ws-opts`].headers),path:decodeURIComponent(this.originConfig.searchParams?.get(`path`)??`/`)})}restoreClash(e,t){return this.#c(e),e.name=t,e.server=this.originConfig.hostname??``,e.port=Number(this.originConfig?.port??0),e.uuid=this.originConfig.username??``,e.alpn=e.alpn?e.alpn?.map(e=>decodeURIComponent(decodeURIComponent(e))):e.alpn,e}restoreSingbox(e,t){return e.tag=t,e.server=this.originConfig.hostname??``,e.server_port=Number(this.originConfig.port??0),e.uuid=this.originConfig.username??``,e.tls?.server_name&&(e.tls.server_name=this.originConfig.hostname??``),e.tls?.alpn&&(e.tls.alpn=e.tls.alpn.map(e=>decodeURIComponent(decodeURIComponent(e)))),e}get originPs(){return this.#i}get originLink(){return this.#e}get originConfig(){return this.#n}get confusePs(){return this.#a}get confuseLink(){return this.#t}get confuseConfig(){return this.#r}get tag(){return this.#o??null}},na=class extends X{#e=``;#t=``;#n={};#r={};#i=``;#a=``;#o=``;constructor(e){super(),this.#a=crypto.randomUUID(),this.setOriginConfig(e),this.setConfuseConfig()}setOriginConfig(e){let[t,n]=e.match(/vmess:\/\/(.*)/)||[];this.#e=e,this.#n=JSON.parse(Wi(n)),this.#i=this.#n.ps??``,this.#o=this.getTag(this.#n.ps)??``}updateOriginConfig(e){this.#n.ps=e,this.#i=e,this.#e=`vmess://${Y(JSON.stringify(this.#n))}`,this.setConfuseConfig()}setConfuseConfig(){this.#r=structuredClone(this.#n),this.#r.add=this.getHostName(),this.#r.port=this.getPort(),this.#r.id=this.getPassword(),this.#r.ps=Z.setPs(this.#i,this.#a),this.#t=`vmess://${Y(JSON.stringify(this.#r))}`}#s(e){return q(e,`Host`)?{...e,Host:e.Host||this.originConfig.add||``}:e}#c(e){e.network===`ws`&&(e[`ws-opts`]={...e[`ws-opts`],headers:this.#s(e[`ws-opts`].headers),path:this.originConfig.path})}restoreClash(e,t){return this.#c(e),e.name=t,e.server=this.originConfig.add??``,e.port=Number(this.originConfig?.port??0),e.uuid=this.originConfig?.id??``,q(e,`servername`)&&(e.servername=this.originConfig.add??``),e}restoreSingbox(e,t){return e.server=this.originConfig.add??``,e.server_port=Number(this.originConfig.port??0),e.tag=t,e.tls?.server_name&&(e.tls.server_name=this.originConfig.add??``),e.uuid=this.originConfig?.id??``,e}get originPs(){return this.#i}get originLink(){return this.#e}get originConfig(){return this.#n}get confusePs(){return this.#a}get confuseLink(){return this.#t}get confuseConfig(){return this.#r}get tag(){return this.#o??null}};function ra(e){if(!e?.server||!e.port||!e.password)throw Error(`AnyTLS configuration object must contain server, port, and password.`);let t=new URLSearchParams,n=(e,n)=>{n!=null&&n!==``&&t.set(e,String(n))};n(`sni`,e.sni??e.servername),n(`alpn`,Array.isArray(e.alpn)?e.alpn.join(`,`):e.alpn),n(`fp`,e[`client-fingerprint`]??e.fingerprint);let r=e.insecure??e[`skip-cert-verify`];typeof r==`boolean`&&t.set(`insecure`,r?`1`:`0`),n(`idle_session_check_interval`,e[`idle-session-check-interval`]??e.idle_session_check_interval),n(`idle_session_timeout`,e[`idle-session-timeout`]??e.idle_session_timeout),n(`min_idle_session`,e[`min-idle-session`]??e.min_idle_session);let i=t.toString(),a=e.name?`#${encodeURIComponent(e.name)}`:``;return`anytls://${encodeURIComponent(e.password)}@${encodeURIComponent(e.server)}:${e.port}${i?`?${i}`:``}${a}`}function ia(e){let t=e.password||e.auth||e.auth_str;if(!e||!e.server||!e.port||!t)throw Error(`Hysteria configuration object must contain server, port, and authentication (password, auth, or auth_str).`);let n=e.server,r=e.port,i=e.name||``,a=new URLSearchParams;a.append(`auth`,t),e.peerCA&&a.append(`peerCA`,Y(e.peerCA).replace(/\+/g,`-`).replace(/\//g,`_`).replace(/=/g,``));let o=e.insecure??e[`skip-cert-verify`];typeof o==`boolean`&&a.append(`insecure`,o?`1`:`0`),e.alpn&&(typeof e.alpn==`string`||Array.isArray(e.alpn))&&a.append(`alpn`,Array.isArray(e.alpn)?e.alpn.join(`,`):e.alpn),e.upmbps!==void 0&&e.upmbps!==null&&a.append(`upmbps`,e.upmbps.toString()),e.downmbps!==void 0&&e.downmbps!==null&&a.append(`downmbps`,e.downmbps.toString()),e.obfs&&a.append(`obfs`,e.obfs),e[`obfs-param`]&&a.append(`obfs-param`,e[`obfs-param`]),q(e,`up`)&&a.append(`up`,e.up),q(e,`down`)&&a.append(`down`,e.down),q(e,`delay`)&&a.append(`delay`,e.delay),q(e,`sni`)&&a.append(`sni`,e.sni);let s=a.toString(),c=encodeURIComponent(n),l=encodeURIComponent(i),u=`hysteria://${c}:${r}`;return s&&(u+=`?${s}`),i&&(u+=`#${l}`),u}function aa(e){if(!e||!e.server||!e.port||!e.password)throw Error(`Hysteria2 configuration object must contain server, port, and password.`);let t=e.server,n=e.port,r=e.password,i=e.name||``,a=new URLSearchParams;a.append(`password`,r);let o=e.sni||e.servername||e.server;o&&a.append(`sni`,o);let s=e.insecure??e[`skip-cert-verify`];typeof s==`boolean`&&a.append(`insecure`,s?`1`:`0`),e.alpn&&(typeof e.alpn==`string`||Array.isArray(e.alpn))&&a.append(`alpn`,Array.isArray(e.alpn)?e.alpn.join(`,`):e.alpn),e.obfs&&a.append(`obfs`,e.obfs),e[`obfs-param`]&&a.append(`obfs-param`,e[`obfs-param`]),e[`obfs-password`]&&a.append(`obfs-password`,e[`obfs-password`]);let c=a.toString(),l=encodeURIComponent(t),u=encodeURIComponent(i),d=`hysteria2://${l}:${n}`;return c&&(d+=`?${c}`),i&&(d+=`#${u}`),d}function oa(e){if(!e||!e.server||!e.port||!e.cipher||!e.password)throw Error(`Shadowsocks configuration object must contain server, port, cipher, and password.`);let t=e.cipher,n=e.password,r=e.server,i=e.port,a=e.name||``,o=Y(`${t}:${n}`),s=new URLSearchParams,c=e.network||`tcp`;if((c!==`tcp`||e.network)&&s.append(`type`,c),e.tls){s.append(`security`,`tls`);let t=e.sni||e.servername||e.server;t&&s.append(`sni`,t),e[`client-fingerprint`]&&s.append(`fp`,e[`client-fingerprint`]),e[`skip-cert-verify`]&&s.append(`allowInsecure`,`1`)}switch(c){case`ws`:case`http`:{let t=e[`ws-opts`]||e[`http-opts`]||{},n;n=t.headers&&t.headers.Host?t.headers.Host:e.sni||e.servername?e.sni||e.servername:e.server,n&&s.append(`host`,n);let r=t.path||`/`;r!==`/`&&s.append(`path`,r);break}case`grpc`:{let t=e[`grpc-opts`]||{};t.serviceName&&s.append(`serviceName`,t.serviceName);break}}e.tfo&&s.append(`tfo`,`1`),e.udp&&s.append(`udp`,`1`);let l=`ss://${o}@${encodeURIComponent(r)}:${i}`,u=s.toString();return u&&(l+=`?${u}`),a&&(l+=`#${encodeURIComponent(a)}`),l}function sa(e){return Y(e).replace(/\+/g,`-`).replace(/\//g,`_`).replace(/=/g,``)}function ca(e){if(!e||!e.server||!e.port||!e.protocol||!e.method||!e.obfs||!e.password)throw Error(`ShadowsocksR configuration object must contain server, port, protocol, method, obfs, and password.`);let t=e.server,n=e.port,r=e.protocol,i=e.method||e.cipher,a=e.obfs,o=e.password,s=e[`obfs-param`]||``,c=e[`protocol-param`]||``,l=e.name||``,u=`${t}:${n}:${r}:${i}:${a}:${sa(o)}/`,d=new URLSearchParams;if(s){let e=sa(s);d.append(`obfsparam`,e)}if(c){let e=sa(c);d.append(`protoparam`,e)}let f=d.toString();f&&(u+=`?${f}`);let p=sa(u),m=encodeURIComponent(l),h=`ssr://${p}`;return l&&(h+=`#${m}`),h}function la(e){if(!e||!e.server||!e.port||!e.password)throw Error(`Trojan configuration object must contain server, port, and password.`);let t=e.password,n=e.server,r=e.port,i=e.name||``,a=new URLSearchParams,o=e.sni||e.servername||e.server;o&&a.append(`sni`,o),e[`skip-cert-verify`]&&a.append(`allowInsecure`,`1`);let s=e.network||`tcp`;switch(a.append(`type`,s),s){case`ws`:case`http`:{let t=e[`ws-opts`]||e[`http-opts`]||{},n;n=t.headers&&t.headers.Host?t.headers.Host:e.sni||e.servername?e.sni||e.servername:e.server,n&&a.append(`host`,n);let r=t.path||`/`;r!==`/`&&a.append(`path`,r);break}case`grpc`:{let t=e[`grpc-opts`]||{};t.serviceName&&a.append(`serviceName`,t.serviceName);break}}e.flow&&a.append(`flow`,e.flow),e.tfo&&a.append(`tfo`,`1`),e.udp&&a.append(`udp`,`1`),e[`client-fingerprint`]&&a.append(`fp`,e[`client-fingerprint`]);let c=`trojan://${encodeURIComponent(t)}@${encodeURIComponent(n)}:${r}`,l=a.toString();return l&&(c+=`?${l}`),i&&(c+=`#${encodeURIComponent(i)}`),c}function ua(e){if(!e||!e.server||!e.port||!e.uuid)throw Error(`TUIC configuration object must contain server, port, and uuid.`);let t=e.server,n=e.port,r=e.uuid,i=e.password??``,a=e.name||``,o=new URLSearchParams,s=e[`congestion-controller`]||e.congestion_control;s&&o.append(`congestion_control`,s);let c=e[`udp-relay-mode`]||e.udp_relay_mode;c&&o.append(`udp_relay_mode`,c),e.alpn&&(typeof e.alpn==`string`||Array.isArray(e.alpn))&&o.append(`alpn`,Array.isArray(e.alpn)?e.alpn.join(`,`):e.alpn);let l=e.sni||e.servername;l&&o.append(`sni`,l);let u=e.insecure??e[`skip-cert-verify`];typeof u==`boolean`&&o.append(`allow_insecure`,u?`1`:`0`),e[`disable-sni`]&&o.append(`disable_sni`,`1`);let d=o.toString(),f=`${encodeURIComponent(r)}:${encodeURIComponent(i)}`,p=encodeURIComponent(t),m=encodeURIComponent(a),h=`tuic://${f}@${p}:${n}`;return d&&(h+=`?${d}`),a&&(h+=`#${m}`),h}function da(e){if(e.type!==`vless`)throw Error(`Configuration type must be "vless"`);if(!e.uuid||!e.server||!e.port)throw Error(`Missing required fields: uuid, server, or port`);let t=e.uuid,n=e.server,r=e.port,i=`#${encodeURIComponent(e.name||`vless-node`)}`,a=new URLSearchParams,o=e.network||`tcp`,s=`none`;if(e.security===`reality`||e[`reality-opts`]?s=`reality`:(e.security===`tls`||e.tls===!0)&&(s=`tls`),(o!==`tcp`||o===`tcp`&&e[`tcp-opts`]?.header?.type&&e[`tcp-opts`].header.type!==`none`)&&a.set(`type`,o),s===`tls`){a.set(`security`,`tls`),e.servername&&a.set(`sni`,e.servername),Array.isArray(e.alpn)&&e.alpn.length>0&&a.set(`alpn`,encodeURIComponent(e.alpn.join(`,`)));let t=e[`client-fingerprint`]||e.fingerprint;t&&a.set(`fp`,encodeURIComponent(t)),e[`skip-cert-verify`]===!0&&a.set(`allowInsecure`,`1`),e.flow&&a.set(`flow`,e.flow)}else if(s===`reality`){a.set(`security`,`reality`),e.servername&&a.set(`sni`,e.servername);let t=e[`reality-opts`]||{},n=t[`public-key`]||t.publicKey,r=t[`short-id`]||t.shortId;n&&a.set(`pbk`,encodeURIComponent(n)),r&&a.set(`sid`,encodeURIComponent(r));let i=e[`client-fingerprint`]||e.fingerprint;i&&a.set(`fp`,encodeURIComponent(i))}switch(o){case`tcp`:e[`tcp-opts`]?.header?.type&&e[`tcp-opts`].header.type!==`none`&&a.set(`headerType`,e[`tcp-opts`].header.type);break;case`ws`:e[`ws-opts`]&&(e[`ws-opts`].headers?.Host&&a.set(`host`,e[`ws-opts`].headers.Host),e[`ws-opts`].path&&a.set(`path`,encodeURIComponent(e[`ws-opts`].path)));break;case`grpc`:if(e[`grpc-opts`]){(e[`grpc-opts`][`grpc-mode`]||e[`grpc-opts`].mode)===`multi`&&a.set(`mode`,`multi`);let t=e[`grpc-opts`][`grpc-service-name`];t&&a.set(`serviceName`,encodeURIComponent(t))}break;case`quic`:s!==`tls`&&s!==`reality`&&(a.has(`security`)||a.set(`security`,`tls`)),e[`quic-opts`]&&(e[`quic-opts`].security&&e[`quic-opts`].security!==`none`&&a.set(`quicSecurity`,encodeURIComponent(e[`quic-opts`].security)),e[`quic-opts`].key&&a.set(`key`,encodeURIComponent(e[`quic-opts`].key)),e[`quic-opts`].header?.type&&e[`quic-opts`].header.type!==`none`&&a.set(`headerType`,e[`quic-opts`].header.type));break;case`httpupgrade`:e[`httpupgrade-opts`]&&(e[`httpupgrade-opts`].host&&a.set(`host`,e[`httpupgrade-opts`].host),e[`httpupgrade-opts`].path&&a.set(`path`,encodeURIComponent(e[`httpupgrade-opts`].path)));break;case`h2`:if(s!==`tls`&&s!==`reality`&&(a.has(`security`)||a.set(`security`,`tls`)),e[`h2-opts`]){let t=e[`h2-opts`].host;Array.isArray(t)&&t.length>0?a.set(`host`,encodeURIComponent(t.join(`,`))):typeof t==`string`&&a.set(`host`,encodeURIComponent(t)),e[`h2-opts`].path&&a.set(`path`,encodeURIComponent(e[`h2-opts`].path))}break;default:console.warn(`Unsupported network type for URL generation: ${o}`)}e.tfo===!0&&a.set(`tfo`,`1`);let c=a.toString();return`vless://${t}@${n}:${r}${c?`?${c}`:``}${i}`}function fa(e){if(!e||!e.server||!e.port||!e.uuid)throw Error(`Vmess configuration object must contain server, port, and uuid.`);let t={v:`2`,ps:e.name||``,add:e.server,port:e.port,id:e.uuid,aid:e.alterId||0,scy:e.cipher||`auto`,net:e.network||`tcp`};switch(e.tls?(t.tls=`tls`,t.sni=e.servername||e.server,e[`client-fingerprint`]&&(t.fp=e[`client-fingerprint`])):t.tls=``,t.net){case`ws`:case`http`:{let n=e[`ws-opts`]||e[`http-opts`]||{};n.headers&&n.headers.Host?t.host=n.headers.Host:t.sni?t.host=t.sni:t.host=t.add,t.path=n.path||`/`,t.net===`http`&&!e.tls?t.type=`http`:t.net===`ws`&&!e.tls&&(t.type=`ws`);break}case`tcp`:e.tls||(t.type=`none`);break;case`grpc`:e[`grpc-opts`]&&e[`grpc-opts`].serviceName&&(t.serviceName=e[`grpc-opts`].serviceName),t.type=`grpc`;break}return(t.type===`none`||t.net===t.type&&!e.tls)&&delete t.type,t.tfo=e.tfo?`1`:`0`,t.udp=e.udp?`1`:`0`,`vmess://${Y(JSON.stringify(t))}`}function pa(e){let t=[];for(let n of e)try{n.type===`anytls`&&t.push(ra(n)),n.type===`vmess`&&t.push(fa(n)),n.type===`trojan`&&t.push(la(n)),n.type===`vless`&&t.push(da(n)),n.type===`ss`&&t.push(oa(n)),n.type===`ssr`&&t.push(ca(n)),(n.type===`hysteria2`||n.type===`hy2`)&&t.push(aa(n)),n.type===`hysteria`&&t.push(ia(n)),n.type===`tuic`&&t.push(ua(n))}catch{continue}return t}var ma=class extends Ji{urlSet=new Set;vpsStore=new Map;originUrls=new Set;vps=[];includeProtocol=[];excludeTag=[];constructor(e,t=[],n=``,r=``){super(t),this.vps=e,this.includeProtocol=n?JSON.parse(n):[],this.excludeTag=r?JSON.parse(r):[]}async parse(e=this.vps){for await(let t of e)try{let e=this.updateVpsPs(t);if(e){let t=null;e.startsWith(`anytls://`)&&this.hasProtocol(`anytls`)?t=new Yi(e):e.startsWith(`vless://`)&&this.hasProtocol(`vless`)?t=new ta(e):e.startsWith(`vmess://`)&&this.hasProtocol(`vmess`)?t=new na(e):e.startsWith(`trojan://`)&&this.hasProtocol(`trojan`)?t=new $i(e):e.startsWith(`ss://`)&&this.hasProtocol(`shadowsocks`)?t=new Zi(e):e.startsWith(`ssr://`)&&this.hasProtocol(`shadowsocksr`)?t=new Qi(e):this.isHysteria2(e)&&this.hasProtocol(`hysteria`,`hysteria2`,`hy2`)?t=new Xi(e):e.startsWith(`tuic://`)&&this.hasProtocol(`tuic`)&&(t=new ea(e)),t&&this.setStore(e,t)}if(t.startsWith(`https://`)||t.startsWith(`http://`)){let e=await Ui(t,{retries:3}).then(async e=>e.data.text()),{subType:n,content:r}=this.getSubType(e);if(n===`base64`&&r&&(this.updateExist(Array.from(this.originUrls)),await this.parse(r.split(`
`).filter(Boolean))),n===`yaml`&&r){let e=r.proxies;if(e.length){this.updateExist(Array.from(this.originUrls));let t=pa(e);await this.parse(t.filter(Boolean))}}}}catch{continue}}setStore(e,t){let n=t.tag;n&&this.excludeTag.includes(n)||(this.urlSet.add(t.confuseLink),this.originUrls.add(e),this.vpsStore.set(t.confusePs,t))}getSubType(e){try{return{subType:`base64`,content:Wi(e)}}catch{try{return{subType:`yaml`,content:Pi(e)}}catch{try{let t=JSON.parse(e);return{subType:`json`,content:JSON.stringify(t)}}catch{return{subType:`unknown`,content:e}}}}}isHysteria2(e){return e.startsWith(`hysteria2://`)||e.startsWith(`hysteria://`)||e.startsWith(`hy2://`)}hasProtocol(...e){return this.includeProtocol.length===0||e.some(e=>this.includeProtocol.includes(e))}get urls(){return Array.from(this.urlSet)}get vpsMap(){return this.vpsStore}get originVps(){return Array.from(this.originUrls)}},ha=class{async getConfig(e){try{let t=(await Promise.all(e.map(e=>Ui(e,{retries:3}).then(e=>e.data.text())))).map(e=>Pi(e));return this.mergeClashConfig(t)}catch(e){throw Error(`Failed to get clash config: ${e.message||e}`)}}isSameProxies(e,t){if(e.length!==t.length)return!1;let n=new Set(e);return t.every(e=>n.has(e))}mergeGroupProxies(e,t){let n=new Set(e),r=[...e];for(let e of t)n.has(e)||(n.add(e),r.push(e));return r}mergeClashConfig(e=[]){try{if(!e.length)return{};if(e.length===1)return e[0];let t=[];for(let n of e)n.proxies?.length&&t.push(...n.proxies);let n=new Map,r=[];for(let t of e)if(t[`proxy-groups`]?.length)for(let e of t[`proxy-groups`]){let t=n.get(e.name);if(!t)n.set(e.name,{...e,proxies:[...e.proxies||[]]}),r.push(e.name);else{let n=t.proxies||[],r=e.proxies||[];this.isSameProxies(n,r)||(t.proxies=this.mergeGroupProxies(n,r))}}return{...e[0],proxies:t,"proxy-groups":r.map(e=>n.get(e))}}catch(e){throw Error(`Failed to merge clash config: ${e.message||e}`)}}},ga=class{async getConfig(e){try{let t=(await Promise.all(e.map(e=>Ui(e,{retries:3}).then(e=>e.data.text())))).filter(e=>Li(e)).map(e=>JSON.parse(e));return this.mergeConfig(t)}catch(e){throw Error(`Failed to get singbox config: ${e.message||e}`)}}mergeConfig(e){try{if(e.length===0)return{};let t=structuredClone(e[0]),n=[],r=new Set,i=new Map;for(let t of e)if(t.outbounds?.length){for(let e of t.outbounds)if(e.outbounds){let t=`${e.type}:${e.tag}`;if(!i.has(t)){let n=new Set(e.outbounds.filter(e=>!Z.isConfigType(e)));i.set(t,{base:e,baseOutbounds:n,linkOutbounds:new Set})}e.outbounds.forEach(e=>{Z.isConfigType(e)&&i.get(t)?.linkOutbounds.add(e)})}}for(let t of e)if(t.outbounds?.length){for(let e of t.outbounds)if(!e.outbounds)if(Z.isConfigType(e.tag))n.push(e);else{let t=`${e.type}:${e.tag}`;r.has(t)||(r.add(t),n.push(e))}}for(let[e,t]of i){let e={...t.base},r=new Set([...t.baseOutbounds,...t.linkOutbounds]);e.outbounds=Array.from(r),n.push(e)}return t.outbounds=n,t}catch(e){throw Error(`Failed to merge singbox config: ${e.message||e}`)}}},_a=class extends ma{async getConfig(e,t){try{return await this.parse(t),Ki(this.originVps.join(`
`))}catch(e){throw Error(`Failed to get v2ray config: ${e.message||e}`)}}},va=class{urls=[];vps=[];chunkCount=Number(K.CHUNK_COUNT);backend=K.BACKEND;parser=null;clashClient=new ha;singboxClient=new ga;v2rayClient=new _a(this.vps);constructor(e){this.chunkCount=Number(e.CHUNK_COUNT??K.CHUNK_COUNT),this.backend=e.BACKEND??K.BACKEND,this.parser=null}async setSubUrls(e){let{searchParams:t}=new URL(e.url),n=t.get(`url`),r=t.get(`protocol`),i=t.get(`exclude`);this.backend=t.get(`backend`)??this.backend;let a=n.split(/\||\n/).filter(Boolean);this.parser=new ma(a,[],r,i),this.vps=a,await this.parser.parse(a);let o=Ii(Array.from(this.parser.urls),Number(this.chunkCount));this.urls=o.map(t=>{let n=new URL(`${this.backend}/sub`),{searchParams:r}=new URL(e.url);return r.set(`url`,t),n.search=r.toString(),n.toString()})}async getClashConfig(){return await this.clashClient.getConfig(this.urls)}async getSingboxConfig(){return await this.singboxClient.getConfig(this.urls)}async getV2RayConfig(){return await this.v2rayClient.getConfig(this.urls,this.vps)}get vpsStore(){return this.parser?.vpsMap}},ya=class{confuseConfig;constructor(e){this.confuseConfig=e}getOriginConfig(e){try{return this.confuseConfig.proxies=this.restoreProxies(this.confuseConfig.proxies,e),this.confuseConfig[`proxy-groups`]=this.confuseConfig?.[`proxy-groups`]?.map(e=>(e.proxies&&=this.updateProxiesGroups(e.proxies),e)),this.confuseConfig}catch(e){throw Error(`Get origin config failed: ${e.message||e}, function trace: ${e.stack}`)}}restoreProxies(e,t){let n=[];if(!e)return n;for(let r of e)try{let[e,i]=Z.getPs(r.name);t.has(i)&&(t.get(i)?.restoreClash(r,e),n.push(r))}catch(e){console.warn(`Restore proxies failed: ${e.message||e}, function trace: ${e.stack}`);continue}return n}updateProxiesGroups(e){try{return e.map(e=>{let[t]=Z.getPs(e);return t})}catch(e){throw Error(`Update proxies groups failed: ${e.message||e}, function trace: ${e.stack}`)}}},ba=class{confuseConfig;constructor(e){this.confuseConfig=e}getOriginConfig(e){try{return this.confuseConfig.outbounds=this.restoreOutbounds(this.confuseConfig.outbounds,e),this.confuseConfig}catch(e){throw Error(`Get origin config failed: ${e.message||e}, function trace: ${e.stack}`)}}restoreOutbounds(e=[],t){let n=[];if(!e)return n;for(let r of e)try{if(this.isConfuseVps(r.tag)){let[e,n]=Z.getPs(r.tag);t.get(n)?.restoreSingbox(r,e)}Reflect.has(r,`outbounds`)&&(r.outbounds=this.updateOutbouns(r.outbounds)),n.push(r)}catch(e){console.warn(`Restore outbounds failed: ${e.message||e}, function trace: ${e.stack}`);continue}return n}updateOutbouns(e=[]){try{return e.map(e=>{if(this.isConfuseVps(e)){let[t]=Z.getPs(e);return t}return e})}catch(e){throw Error(`Update outbounds failed: ${e.message||e}, function trace: ${e.stack}`)}}isConfuseVps(e){return Z.isConfigType(e)}},xa=class{confuseConfig;constructor(e){this.confuseConfig=e}getOriginConfig(){try{return this.confuseConfig}catch(e){throw Error(`Get origin config failed: ${e.message||e}, function trace: ${e.stack}`)}}},Sa=class{constructor(e){this.confuse=e,this.confuse=e}async getClashConfig(){return new ya(await this.confuse.getClashConfig()).getOriginConfig(this.confuse.vpsStore)}async getSingboxConfig(){return new ba(await this.confuse.getSingboxConfig()).getOriginConfig(this.confuse.vpsStore)}async getV2RayConfig(){return new xa(await this.confuse.getV2RayConfig()).getOriginConfig()}},Ca=class{constructor(e){this.repo=e}async toSub(e,t,n){let r=new va(t);await r.setSubUrls(e);let i=new Sa(r);if([`clash`,`clashr`].includes(n))return{body:Fi(await i.getClashConfig(),{indent:2,lineWidth:-1,flowLevel:2}),contentType:`text/yaml; charset=UTF-8`};if(n===`singbox`){let e=await i.getSingboxConfig();return{body:JSON.stringify(e),contentType:`text/plain; charset=UTF-8`}}if(n===`v2ray`)return{body:await i.getV2RayConfig(),contentType:`text/plain; charset=UTF-8`};throw Error(`Unsupported client type, support list: clash, singbox, v2ray`)}getVersionRedirect(e,t){let{searchParams:n}=new URL(e.url);return`${n.get(`backend`)??t.BACKEND??K.BACKEND}/version`}async add(e,t){return this.ensureRepo(),this.repo.add(e,t)}async deleteByCode(e){return this.ensureRepo(),this.repo.deleteByCode(e)}async getByCode(e){return this.ensureRepo(),this.repo.getByCode(e)}async getList(e=1,t=20){return this.ensureRepo(),this.repo.getList(e,t)}ensureRepo(){if(!this.repo)throw Error(`Short URL service is not enabled (no repository configured)`)}};const Q=new ze;function $(e){let n=e.get(`repo`);if(!n)throw new t(503,{message:`Short URL service is not enabled`});return new yt(new Ca(n))}Q.post(`/api/add`,e=>$(e).add(e)),Q.post(`/api/admin/verify`,e=>$(e).verifyAdmin(e)),Q.delete(`/api/delete`,e=>$(e).delete(e)),Q.get(`/api/queryByCode`,e=>$(e).queryByCode(e)),Q.get(`/api/queryList`,e=>$(e).queryList(e)),Q.get(`/:code`,e=>$(e).redirect(e));const wa=new ze;wa.get(`/sub`,e=>new yt(new Ca(e.get(`repo`))).toSub(e)),wa.get(`/version`,e=>new yt(new Ca(e.get(`repo`))).getVersion(e));function Ta(e){e.route(`/`,vt),e.route(`/`,wa),e.route(`/`,Q)}function Ea(e){let t=new ze;return t.use(`*`,Xe()),t.use(`*`,Ve()),t.use(`*`,Ze(e.repo)),t.onError(He),t.notFound(e=>e.json({error:`Not Found`},404)),Ta(t),t}function Da(){return crypto.randomUUID().substring(0,8)}var Oa=class{constructor(e){this.db=e}async ensureSchema(){await this.db.prepare(`CREATE TABLE IF NOT EXISTS short_url (
                    id INTEGER PRIMARY KEY,
                    short_code TEXT,
                    short_url TEXT,
                    long_url TEXT,
                    created_at TEXT
                )`).run(),(await this.db.prepare(`SELECT COUNT(*) as c FROM pragma_table_info('short_url') WHERE name = 'created_at'`).first())?.c||await this.db.prepare(`ALTER TABLE short_url ADD COLUMN created_at TEXT`).run()}async add(e,t){let n=Da(),r=`${t}/${n}`,i=new Date().toISOString(),a=await this.db.prepare(`INSERT INTO short_url (short_code, short_url, long_url, created_at) VALUES (?, ?, ?, ?) RETURNING id`).bind(n,r,e,i).first();if(!a?.id)throw Error(`Failed to create short URL`);return{id:a.id,short_code:n,short_url:r,long_url:e,created_at:i}}async deleteByCode(e){await this.db.prepare(`DELETE FROM short_url WHERE short_code = ?`).bind(e).run()}async getByCode(e){return await this.db.prepare(`SELECT id, short_code, short_url, long_url, created_at FROM short_url WHERE short_code = ?`).bind(e).first()}async getList(e,t){let n=(e-1)*t,[r,i]=await Promise.all([this.db.prepare(`SELECT COUNT(*) as count FROM short_url`).first(),this.db.prepare(`SELECT id, short_code, short_url, long_url, created_at
                     FROM short_url
                     ORDER BY created_at IS NULL, created_at DESC, id DESC
                     LIMIT ? OFFSET ?`).bind(t,n).all()]);return{total:r?.count||0,items:i?.results||[]}}};function ka(e){return e?new Oa(e):null}const Aa=`__sub_convert_d1_schema_ready__`;var ja={async fetch(e,t,n){let r=ka(t.DB);r&&!globalThis[Aa]&&(await r.ensureSchema(),globalThis[Aa]=!0);let i=Ea({repo:r}),a={...t,SHORT_URL_ENABLED:r!==null};return i.fetch(e,a,n)}};export{ja as default};