function g(){}const dt=t=>t;function ht(t,e){for(const n in e)t[n]=e[n];return t}function Y(t){return t()}function K(){return Object.create(null)}function v(t){t.forEach(Y)}function P(t){return typeof t=="function"}function It(t,e){return t!=t?e==e:t!==e||t&&typeof t=="object"||typeof t=="function"}let S;function Jt(t,e){return S||(S=document.createElement("a")),S.href=e,t===S.href}function Kt(t,e){return t!=t?e==e:t!==e}function mt(t){return Object.keys(t).length===0}function Z(t,...e){if(t==null)return g;const n=t.subscribe(...e);return n.unsubscribe?()=>n.unsubscribe():n}function Qt(t){let e;return Z(t,n=>e=n)(),e}function Ut(t,e,n){t.$$.on_destroy.push(Z(e,n))}function Vt(t,e,n,i){if(t){const s=tt(t,e,n,i);return t[0](s)}}function tt(t,e,n,i){return t[1]&&i?ht(n.ctx.slice(),t[1](i(e))):n.ctx}function Xt(t,e,n,i){if(t[2]&&i){const s=t[2](i(n));if(e.dirty===void 0)return s;if(typeof s=="object"){const l=[],r=Math.max(e.dirty.length,s.length);for(let o=0;o<r;o+=1)l[o]=e.dirty[o]|s[o];return l}return e.dirty|s}return e.dirty}function Yt(t,e,n,i,s,l){if(s){const r=tt(e,n,i,l);t.p(r,s)}}function Zt(t){if(t.ctx.length>32){const e=[],n=t.ctx.length/32;for(let i=0;i<n;i++)e[i]=-1;return e}return-1}function te(t){const e={};for(const n in t)n[0]!=="$"&&(e[n]=t[n]);return e}function ee(t,e){const n={};e=new Set(e);for(const i in t)!e.has(i)&&i[0]!=="$"&&(n[i]=t[i]);return n}function ne(t){const e={};for(const n in t)e[n]=!0;return e}function ie(t){return t??""}function se(t,e,n){return t.set(n),e}function re(t){return t&&P(t.destroy)?t.destroy:g}function oe(t){const e=typeof t=="string"&&t.match(/^\s*(-?[\d.]+)([^\s]*)\s*$/);return e?[parseFloat(e[1]),e[2]||"px"]:[t,"px"]}const et=typeof window<"u";let pt=et?()=>window.performance.now():()=>Date.now(),G=et?t=>requestAnimationFrame(t):g;const w=new Set;function nt(t){w.forEach(e=>{e.c(t)||(w.delete(e),e.f())}),w.size!==0&&G(nt)}function yt(t){let e;return w.size===0&&G(nt),{promise:new Promise(n=>{w.add(e={c:t,f:n})}),abort(){w.delete(e)}}}let H=!1;function gt(){H=!0}function $t(){H=!1}function xt(t,e,n,i){for(;t<e;){const s=t+(e-t>>1);n(s)<=i?t=s+1:e=s}return t}function bt(t){if(t.hydrate_init)return;t.hydrate_init=!0;let e=t.childNodes;if(t.nodeName==="HEAD"){const c=[];for(let u=0;u<e.length;u++){const _=e[u];_.claim_order!==void 0&&c.push(_)}e=c}const n=new Int32Array(e.length+1),i=new Int32Array(e.length);n[0]=-1;let s=0;for(let c=0;c<e.length;c++){const u=e[c].claim_order,_=(s>0&&e[n[s]].claim_order<=u?s+1:xt(1,s,h=>e[n[h]].claim_order,u))-1;i[c]=n[_]+1;const a=_+1;n[a]=c,s=Math.max(a,s)}const l=[],r=[];let o=e.length-1;for(let c=n[s]+1;c!=0;c=i[c-1]){for(l.push(e[c-1]);o>=c;o--)r.push(e[o]);o--}for(;o>=0;o--)r.push(e[o]);l.reverse(),r.sort((c,u)=>c.claim_order-u.claim_order);for(let c=0,u=0;c<r.length;c++){for(;u<l.length&&r[c].claim_order>=l[u].claim_order;)u++;const _=u<l.length?l[u]:null;t.insertBefore(r[c],_)}}function wt(t,e){t.appendChild(e)}function it(t){if(!t)return document;const e=t.getRootNode?t.getRootNode():t.ownerDocument;return e&&e.host?e:t.ownerDocument}function Et(t){const e=W("style");return vt(it(t),e),e.sheet}function vt(t,e){return wt(t.head||t,e),e.sheet}function Nt(t,e){if(H){for(bt(t),(t.actual_end_child===void 0||t.actual_end_child!==null&&t.actual_end_child.parentNode!==t)&&(t.actual_end_child=t.firstChild);t.actual_end_child!==null&&t.actual_end_child.claim_order===void 0;)t.actual_end_child=t.actual_end_child.nextSibling;e!==t.actual_end_child?(e.claim_order!==void 0||e.parentNode!==t)&&t.insertBefore(e,t.actual_end_child):t.actual_end_child=e.nextSibling}else(e.parentNode!==t||e.nextSibling!==null)&&t.appendChild(e)}function Tt(t,e,n){t.insertBefore(e,n||null)}function At(t,e,n){H&&!n?Nt(t,e):(e.parentNode!==t||e.nextSibling!=n)&&t.insertBefore(e,n||null)}function A(t){t.parentNode&&t.parentNode.removeChild(t)}function ce(t,e){for(let n=0;n<t.length;n+=1)t[n]&&t[n].d(e)}function W(t){return document.createElement(t)}function st(t){return document.createElementNS("http://www.w3.org/2000/svg",t)}function I(t){return document.createTextNode(t)}function le(){return I(" ")}function ue(){return I("")}function ae(t,e,n,i){return t.addEventListener(e,n,i),()=>t.removeEventListener(e,n,i)}function kt(t,e,n){n==null?t.removeAttribute(e):t.getAttribute(e)!==n&&t.setAttribute(e,n)}const Mt=["width","height"];function fe(t,e){const n=Object.getOwnPropertyDescriptors(t.__proto__);for(const i in e)e[i]==null?t.removeAttribute(i):i==="style"?t.style.cssText=e[i]:i==="__value"?t.value=t[i]=e[i]:n[i]&&n[i].set&&Mt.indexOf(i)===-1?t[i]=e[i]:kt(t,i,e[i])}function _e(t){return t===""?null:+t}function St(t){return Array.from(t.childNodes)}function rt(t){t.claim_info===void 0&&(t.claim_info={last_index:0,total_claimed:0})}function ot(t,e,n,i,s=!1){rt(t);const l=(()=>{for(let r=t.claim_info.last_index;r<t.length;r++){const o=t[r];if(e(o)){const c=n(o);return c===void 0?t.splice(r,1):t[r]=c,s||(t.claim_info.last_index=r),o}}for(let r=t.claim_info.last_index-1;r>=0;r--){const o=t[r];if(e(o)){const c=n(o);return c===void 0?t.splice(r,1):t[r]=c,s?c===void 0&&t.claim_info.last_index--:t.claim_info.last_index=r,o}}return i()})();return l.claim_order=t.claim_info.total_claimed,t.claim_info.total_claimed+=1,l}function ct(t,e,n,i){return ot(t,s=>s.nodeName===e,s=>{const l=[];for(let r=0;r<s.attributes.length;r++){const o=s.attributes[r];n[o.name]||l.push(o.name)}l.forEach(r=>s.removeAttribute(r))},()=>i(e))}function de(t,e,n){return ct(t,e,n,W)}function he(t,e,n){return ct(t,e,n,st)}function jt(t,e){return ot(t,n=>n.nodeType===3,n=>{const i=""+e;if(n.data.startsWith(i)){if(n.data.length!==i.length)return n.splitText(i.length)}else n.data=i},()=>I(e),!0)}function me(t){return jt(t," ")}function Q(t,e,n){for(let i=n;i<t.length;i+=1){const s=t[i];if(s.nodeType===8&&s.textContent.trim()===e)return i}return t.length}function pe(t,e){const n=Q(t,"HTML_TAG_START",0),i=Q(t,"HTML_TAG_END",n);if(n===i)return new U(void 0,e);rt(t);const s=t.splice(n,i-n+1);A(s[0]),A(s[s.length-1]);const l=s.slice(1,s.length-1);for(const r of l)r.claim_order=t.claim_info.total_claimed,t.claim_info.total_claimed+=1;return new U(l,e)}function ye(t,e){e=""+e,t.data!==e&&(t.data=e)}function ge(t,e){t.value=e??""}function $e(t,e,n,i){n==null?t.style.removeProperty(e):t.style.setProperty(e,n,i?"important":"")}function xe(t,e,n){t.classList[n?"add":"remove"](e)}function lt(t,e,{bubbles:n=!1,cancelable:i=!1}={}){const s=document.createEvent("CustomEvent");return s.initCustomEvent(t,n,i,e),s}function be(t,e){const n=[];let i=0;for(const s of e.childNodes)if(s.nodeType===8){const l=s.textContent.trim();l===`HEAD_${t}_END`?(i-=1,n.push(s)):l===`HEAD_${t}_START`&&(i+=1,n.push(s))}else i>0&&n.push(s);return n}class Ct{constructor(e=!1){this.is_svg=!1,this.is_svg=e,this.e=this.n=null}c(e){this.h(e)}m(e,n,i=null){this.e||(this.is_svg?this.e=st(n.nodeName):this.e=W(n.nodeType===11?"TEMPLATE":n.nodeName),this.t=n.tagName!=="TEMPLATE"?n:n.content,this.c(e)),this.i(i)}h(e){this.e.innerHTML=e,this.n=Array.from(this.e.nodeName==="TEMPLATE"?this.e.content.childNodes:this.e.childNodes)}i(e){for(let n=0;n<this.n.length;n+=1)Tt(this.t,this.n[n],e)}p(e){this.d(),this.h(e),this.i(this.a)}d(){this.n.forEach(A)}}class U extends Ct{constructor(e,n=!1){super(n),this.e=this.n=null,this.l=e}c(e){this.l?this.n=this.l:super.c(e)}i(e){for(let n=0;n<this.n.length;n+=1)At(this.t,this.n[n],e)}}function we(t,e){return new t(e)}const C=new Map;let D=0;function Dt(t){let e=5381,n=t.length;for(;n--;)e=(e<<5)-e^t.charCodeAt(n);return e>>>0}function Lt(t,e){const n={stylesheet:Et(e),rules:{}};return C.set(t,n),n}function V(t,e,n,i,s,l,r,o=0){const c=16.666/i;let u=`{
`;for(let y=0;y<=1;y+=c){const $=e+(n-e)*l(y);u+=y*100+`%{${r($,1-$)}}
`}const _=u+`100% {${r(n,1-n)}}
}`,a=`__svelte_${Dt(_)}_${o}`,h=it(t),{stylesheet:f,rules:d}=C.get(h)||Lt(h,t);d[a]||(d[a]=!0,f.insertRule(`@keyframes ${a} ${_}`,f.cssRules.length));const m=t.style.animation||"";return t.style.animation=`${m?`${m}, `:""}${a} ${i}ms linear ${s}ms 1 both`,D+=1,a}function Pt(t,e){const n=(t.style.animation||"").split(", "),i=n.filter(e?l=>l.indexOf(e)<0:l=>l.indexOf("__svelte")===-1),s=n.length-i.length;s&&(t.style.animation=i.join(", "),D-=s,D||Ht())}function Ht(){G(()=>{D||(C.forEach(t=>{const{ownerNode:e}=t.stylesheet;e&&A(e)}),C.clear())})}let k;function T(t){k=t}function J(){if(!k)throw new Error("Function called outside component initialization");return k}function Ee(t){J().$$.on_mount.push(t)}function ve(t){J().$$.after_update.push(t)}function Ne(){const t=J();return(e,n,{cancelable:i=!1}={})=>{const s=t.$$.callbacks[e];if(s){const l=lt(e,n,{cancelable:i});return s.slice().forEach(r=>{r.call(t,l)}),!l.defaultPrevented}return!0}}function Te(t,e){const n=t.$$.callbacks[e.type];n&&n.slice().forEach(i=>i.call(this,e))}const b=[],X=[];let E=[];const z=[],ut=Promise.resolve();let F=!1;function at(){F||(F=!0,ut.then(ft))}function Ae(){return at(),ut}function L(t){E.push(t)}function ke(t){z.push(t)}const q=new Set;let x=0;function ft(){if(x!==0)return;const t=k;do{try{for(;x<b.length;){const e=b[x];x++,T(e),Ot(e.$$)}}catch(e){throw b.length=0,x=0,e}for(T(null),b.length=0,x=0;X.length;)X.pop()();for(let e=0;e<E.length;e+=1){const n=E[e];q.has(n)||(q.add(n),n())}E.length=0}while(b.length);for(;z.length;)z.pop()();F=!1,q.clear(),T(t)}function Ot(t){if(t.fragment!==null){t.update(),v(t.before_update);const e=t.dirty;t.dirty=[-1],t.fragment&&t.fragment.p(t.ctx,e),t.after_update.forEach(L)}}function Rt(t){const e=[],n=[];E.forEach(i=>t.indexOf(i)===-1?e.push(i):n.push(i)),n.forEach(i=>i()),E=e}let N;function qt(){return N||(N=Promise.resolve(),N.then(()=>{N=null})),N}function B(t,e,n){t.dispatchEvent(lt(`${e?"intro":"outro"}${n}`))}const j=new Set;let p;function Me(){p={r:0,c:[],p}}function Se(){p.r||v(p.c),p=p.p}function Bt(t,e){t&&t.i&&(j.delete(t),t.i(e))}function je(t,e,n,i){if(t&&t.o){if(j.has(t))return;j.add(t),p.c.push(()=>{j.delete(t),i&&(n&&t.d(1),i())}),t.o(e)}else i&&i()}const zt={duration:0};function Ce(t,e,n,i){const s={direction:"both"};let l=e(t,n,s),r=i?0:1,o=null,c=null,u=null;function _(){u&&Pt(t,u)}function a(f,d){const m=f.b-r;return d*=Math.abs(m),{a:r,b:f.b,d:m,duration:d,start:f.start,end:f.start+d,group:f.group}}function h(f){const{delay:d=0,duration:m=300,easing:y=dt,tick:$=g,css:O}=l||zt,R={start:pt()+d,b:f};f||(R.group=p,p.r+=1),o||c?c=R:(O&&(_(),u=V(t,r,f,m,d,y,O)),f&&$(0,1),o=a(R,m),L(()=>B(t,f,"start")),yt(M=>{if(c&&M>c.start&&(o=a(c,m),c=null,B(t,o.b,"start"),O&&(_(),u=V(t,r,o.b,o.duration,0,y,l.css))),o){if(M>=o.end)$(r=o.b,1-r),B(t,o.b,"end"),c||(o.b?_():--o.group.r||v(o.group.c)),o=null;else if(M>=o.start){const _t=M-o.start;r=o.a+o.d*y(_t/o.duration),$(r,1-r)}}return!!(o||c)}))}return{run(f){P(l)?qt().then(()=>{l=l(s),h(f)}):h(f)},end(){_(),o=c=null}}}function De(t,e){const n={},i={},s={$$scope:1};let l=t.length;for(;l--;){const r=t[l],o=e[l];if(o){for(const c in r)c in o||(i[c]=1);for(const c in o)s[c]||(n[c]=o[c],s[c]=1);t[l]=o}else for(const c in r)s[c]=1}for(const r in i)r in n||(n[r]=void 0);return n}function Le(t){return typeof t=="object"&&t!==null?t:{}}function Pe(t,e,n){const i=t.$$.props[e];i!==void 0&&(t.$$.bound[i]=n,n(t.$$.ctx[i]))}function He(t){t&&t.c()}function Oe(t,e){t&&t.l(e)}function Ft(t,e,n,i){const{fragment:s,after_update:l}=t.$$;s&&s.m(e,n),i||L(()=>{const r=t.$$.on_mount.map(Y).filter(P);t.$$.on_destroy?t.$$.on_destroy.push(...r):v(r),t.$$.on_mount=[]}),l.forEach(L)}function Gt(t,e){const n=t.$$;n.fragment!==null&&(Rt(n.after_update),v(n.on_destroy),n.fragment&&n.fragment.d(e),n.on_destroy=n.fragment=null,n.ctx=[])}function Wt(t,e){t.$$.dirty[0]===-1&&(b.push(t),at(),t.$$.dirty.fill(0)),t.$$.dirty[e/31|0]|=1<<e%31}function Re(t,e,n,i,s,l,r,o=[-1]){const c=k;T(t);const u=t.$$={fragment:null,ctx:[],props:l,update:g,not_equal:s,bound:K(),on_mount:[],on_destroy:[],on_disconnect:[],before_update:[],after_update:[],context:new Map(e.context||(c?c.$$.context:[])),callbacks:K(),dirty:o,skip_bound:!1,root:e.target||c.$$.root};r&&r(u.root);let _=!1;if(u.ctx=n?n(t,e.props||{},(a,h,...f)=>{const d=f.length?f[0]:h;return u.ctx&&s(u.ctx[a],u.ctx[a]=d)&&(!u.skip_bound&&u.bound[a]&&u.bound[a](d),_&&Wt(t,a)),h}):[],u.update(),_=!0,v(u.before_update),u.fragment=i?i(u.ctx):!1,e.target){if(e.hydrate){gt();const a=St(e.target);u.fragment&&u.fragment.l(a),a.forEach(A)}else u.fragment&&u.fragment.c();e.intro&&Bt(t.$$.fragment),Ft(t,e.target,e.anchor,e.customElement),$t(),ft()}T(c)}class qe{$destroy(){Gt(this,1),this.$destroy=g}$on(e,n){if(!P(n))return g;const i=this.$$.callbacks[e]||(this.$$.callbacks[e]=[]);return i.push(n),()=>{const s=i.indexOf(n);s!==-1&&i.splice(s,1)}}$set(e){this.$$set&&!mt(e)&&(this.$$.skip_bound=!0,this.$$set(e),this.$$.skip_bound=!1)}}export{Jt as $,Ft as A,Gt as B,Vt as C,Nt as D,ae as E,Yt as F,Zt as G,Xt as H,ne as I,ht as J,te as K,Te as L,fe as M,ge as N,De as O,v as P,ee as Q,ce as R,qe as S,_e as T,Ut as U,Ne as V,g as W,re as X,L as Y,Ce as Z,Le as _,le as a,U as a0,pe as a1,Pe as a2,P as a3,ke as a4,se as a5,be as a6,Kt as a7,st as a8,he as a9,pt as aa,yt as ab,ie as ac,xe as ad,Qt as ae,dt as af,oe as ag,At as b,me as c,je as d,ue as e,Se as f,Bt as g,A as h,Re as i,ve as j,W as k,de as l,St as m,kt as n,Ee as o,$e as p,I as q,jt as r,It as s,Ae as t,ye as u,Me as v,X as w,we as x,He as y,Oe as z};