var b=Object.defineProperty;var E=(t,e,n)=>e in t?b(t,e,{enumerable:!0,configurable:!0,writable:!0,value:n}):t[e]=n;var _=(t,e,n)=>(E(t,typeof e!="symbol"?e+"":e,n),n);import{G as $,y as c,a2 as x,h as I,d as O,a3 as C,I as v,a4 as j,O as p,a5 as B,a6 as G,a7 as w,a8 as L,a9 as M,aa as N,ab as P,ac as R}from"./scheduler.5f8d496a.js";const o=new Set;let d;function J(){d={r:0,c:[],p:d}}function K(){d.r||$(d.c),d=d.p}function U(t,e){t&&t.i&&(o.delete(t),t.i(e))}function Q(t,e,n,a){if(t&&t.o){if(o.has(t))return;o.add(t),d.c.push(()=>{o.delete(t),a&&(n&&t.d(1),a())}),t.o(e)}else a&&a()}function T(t,e,n){const a=t.$$.props[e];a!==void 0&&(t.$$.bound[a]=n,n(t.$$.ctx[a]))}function W(t){t&&t.c()}function X(t,e){t&&t.l(e)}function V(t,e,n){const{fragment:a,after_update:i}=t.$$;a&&a.m(e,n),p(()=>{const f=t.$$.on_mount.map(L).filter(v);t.$$.on_destroy?t.$$.on_destroy.push(...f):$(f),t.$$.on_mount=[]}),i.forEach(p)}function z(t,e){const n=t.$$;n.fragment!==null&&(B(n.after_update),$(n.on_destroy),n.fragment&&n.fragment.d(e),n.on_destroy=n.fragment=null,n.ctx=[])}function A(t,e){t.$$.dirty[0]===-1&&(M.push(t),N(),t.$$.dirty.fill(0)),t.$$.dirty[e/31|0]|=1<<e%31}function Y(t,e,n,a,i,f,h=null,S=[-1]){const u=G;w(t);const s=t.$$={fragment:null,ctx:[],props:f,update:c,not_equal:i,bound:x(),on_mount:[],on_destroy:[],on_disconnect:[],before_update:[],after_update:[],context:new Map(e.context||(u?u.$$.context:[])),callbacks:x(),dirty:S,skip_bound:!1,root:e.target||u.$$.root};h&&h(s.root);let l=!1;if(s.ctx=n?n(t,e.props||{},(r,g,...y)=>{const m=y.length?y[0]:g;return s.ctx&&i(s.ctx[r],s.ctx[r]=m)&&(!s.skip_bound&&s.bound[r]&&s.bound[r](m),l&&A(t,r)),g}):[],s.update(),l=!0,$(s.before_update),s.fragment=a?a(s.ctx):!1,e.target){if(e.hydrate){P();const r=I(e.target);s.fragment&&s.fragment.l(r),r.forEach(O)}else s.fragment&&s.fragment.c();e.intro&&U(t.$$.fragment),V(t,e.target,e.anchor),R(),C()}w(u)}class Z{constructor(){_(this,"$$");_(this,"$$set")}$destroy(){z(this,1),this.$destroy=c}$on(e,n){if(!v(n))return c;const a=this.$$.callbacks[e]||(this.$$.callbacks[e]=[]);return a.push(n),()=>{const i=a.indexOf(n);i!==-1&&a.splice(i,1)}}$set(e){this.$$set&&!j(e)&&(this.$$.skip_bound=!0,this.$$set(e),this.$$.skip_bound=!1)}}const D="4";typeof window<"u"&&(window.__svelte||(window.__svelte={v:new Set})).v.add(D);export{Z as S,U as a,W as b,K as c,X as d,z as e,T as f,J as g,Y as i,V as m,Q as t};
