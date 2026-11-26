(function(){
var $=function(s,r){return(r||document).querySelector(s)},$$=function(s,r){return[].slice.call((r||document).querySelectorAll(s))};
var RM=matchMedia('(prefers-reduced-motion: reduce)').matches,clamp=function(v,a,b){return Math.min(b,Math.max(a,v))};
var nav=$('#nav'),themed=$$('[data-t]').filter(function(e){return e!==nav});
function navTheme(){var t='dark';for(var i=0;i<themed.length;i++){var r=themed[i].getBoundingClientRect();if(r.top<=34&&r.bottom>34){t=themed[i].dataset.t;break}}if(nav.dataset.t!==t)nav.dataset.t=t}
var prog=$('#prog'),tt=$('#toTop');
function onScroll(){navTheme();var h=document.documentElement.scrollHeight-innerHeight;if(prog)prog.style.transform='scaleX('+(h>0?scrollY/h:0)+')';if(tt)tt.classList.toggle('show',scrollY>900)}
addEventListener('scroll',onScroll,{passive:true});addEventListener('resize',onScroll);onScroll();
if(tt)tt.addEventListener('click',function(){scrollTo({top:0,behavior:RM?'auto':'smooth'})});
var burger=$('#burger'),sheet=$('#sheet');
function setMenu(o){sheet.classList.toggle('open',o);burger.setAttribute('aria-expanded',String(o));burger.textContent=o?'CERRAR':'MENÚ';document.body.style.overflow=o?'hidden':''}
burger.addEventListener('click',function(){setMenu(!sheet.classList.contains('open'))});
$$('a',sheet).forEach(function(a){a.addEventListener('click',function(){setMenu(false)})});
addEventListener('keydown',function(e){if(e.key==='Escape'&&sheet.classList.contains('open')){setMenu(false);burger.focus()}});
/* titulares por palabras */
function split(el){var n=0;(function walk(node){[].slice.call(node.childNodes).forEach(function(c){
 if(c.nodeType===3){var fr=document.createDocumentFragment();c.textContent.split(/(\s+)/).forEach(function(t){if(!t)return;if(/^\s+$/.test(t)){fr.appendChild(document.createTextNode(' '));return}
  var w=document.createElement('span');w.className='w';var i=document.createElement('span');i.textContent=t;i.style.transitionDelay=(n++*70)+'ms';w.appendChild(i);fr.appendChild(w)});c.replaceWith(fr)}
 else if(c.nodeType===1&&c.tagName!=='BR')walk(c)})})(el)}
$$('.h.rv').forEach(split);
var io=new IntersectionObserver(function(es){es.forEach(function(e){if(!e.isIntersecting)return;e.target.classList.add('in');io.unobserve(e.target);
 var b=$('b[data-to]',e.target);if(b&&!RM){var to=+b.dataset.to,t0=performance.now();(function f(t){var k=clamp((t-t0)/1300,0,1);b.textContent=Math.round(to*(1-Math.pow(1-k,3)));if(k<1)requestAnimationFrame(f)})(t0)}})},{threshold:.15,rootMargin:'0px 0px -6% 0px'});
$$('.rv').forEach(function(e){io.observe(e)});
/* halftone reactivo */
$$('.ph canvas').forEach(function(cv){
 var ctx=cv.getContext('2d'),W=0,H=0,dpr=Math.min(2,devicePixelRatio||1),mx=-999,my=-999,tx=-999,ty=-999,vis=true,CELL=34;
 function rs(){var r=cv.getBoundingClientRect();W=r.width;H=r.height;cv.width=W*dpr;cv.height=H*dpr;ctx.setTransform(dpr,0,0,dpr,0,0)}
 rs();addEventListener('resize',rs);
 var ph=cv.parentNode;ph.addEventListener('pointermove',function(e){var r=cv.getBoundingClientRect();tx=e.clientX-r.left;ty=e.clientY-r.top});
 ph.addEventListener('pointerleave',function(){tx=-999;ty=-999});
 new IntersectionObserver(function(es){vis=es[0].isIntersecting}).observe(cv);
 function draw(t){requestAnimationFrame(draw);if(!vis)return;
  mx+=(tx-mx)*.12;my+=(ty-my)*.12;ctx.clearRect(0,0,W,H);ctx.fillStyle='#f2f1ec';
  var R=Math.max(240,W*.18),cols=Math.ceil(W/CELL)+1,rows=Math.ceil(H/CELL)+1,s=t*.0007;
  for(var j=0;j<rows;j++)for(var i=0;i<cols;i++){var x=i*CELL+(j%2?CELL/2:0),y=j*CELL;
   var d=Math.hypot(x-mx,y-my),k=clamp(1-d/R,0,1);
   var w=.5+.5*Math.sin(x*.006+y*.004+s*3);
   var fade=clamp((x/W)*.7+(1-y/H)*.5,0,1);
   var r=CELL*.5*(.06+.2*w*fade+.8*k*k);
   if(r<.6)continue;ctx.beginPath();ctx.arc(x,y,r,0,6.2832);ctx.fill()}}
 if(RM){tx=W*.7;ty=H*.4;mx=tx;my=ty;draw(0);}else requestAnimationFrame(draw)});
/* foco del cursor en tarjetas */
$$('.pc').forEach(function(c){c.addEventListener('pointermove',function(e){var r=c.getBoundingClientRect();c.style.setProperty('--mx',(e.clientX-r.left)+'px');c.style.setProperty('--my',(e.clientY-r.top)+'px')})});
if(!RM&&matchMedia('(hover:hover)').matches)$$('.btn,.nav-cta').forEach(function(b){b.addEventListener('pointermove',function(e){var r=b.getBoundingClientRect();b.style.transform='translate('+((e.clientX-r.left-r.width/2)*.16)+'px,'+((e.clientY-r.top-r.height/2)*.28-2)+'px)'});b.addEventListener('pointerleave',function(){b.style.transform=''})});
/* barra Únete */
var jb=$('#joinbar'),jx=$('#joinx');if(jb){var off=false;try{off=sessionStorage.getItem('jb')==='1'}catch(e){}
 var chk=function(){if(off){jb.classList.remove('on');return}var c=$('#contacto')||$('footer'),r=c.getBoundingClientRect();jb.classList.toggle('on',scrollY>innerHeight*.9&&r.top>innerHeight*.9)};
 addEventListener('scroll',chk,{passive:true});chk();jx.addEventListener('click',function(){off=true;try{sessionStorage.setItem('jb','1')}catch(e){}jb.classList.remove('on')})}
var y=$('#year');if(y)y.textContent=new Date().getFullYear();
/* buscador del glosario */
var gi=$('#gsearch');if(gi){var rows=$$('.gr'),groups=$$('.lg'),cnt=$('#gcount'),emp=$('#gempty'),az=$$('.az a');
 var norm=function(s){return s.toLowerCase().normalize('NFD').replace(/[̀-ͯ]/g,'')};
 gi.addEventListener('input',function(){var q=norm(gi.value.trim()),n=0;rows.forEach(function(r){var m=!q||r.dataset.k.indexOf(q)>-1;r.hidden=!m;if(m)n++});
  groups.forEach(function(g){var any=$$('.gr',g).some(function(r){return!r.hidden});g.hidden=!any;var a=az.filter(function(x){return x.getAttribute('href')==='#'+g.id})[0];if(a)a.classList.toggle('off',!any)});
  cnt.textContent=n;emp.hidden=n>0});
 var q0=new URLSearchParams(location.search).get('q');if(q0){gi.value=q0;gi.dispatchEvent(new Event('input'))}}
/* teclas ← → en términos */
var pv=$('[data-prev]'),nx=$('[data-next]');if(pv||nx)addEventListener('keydown',function(e){if(/INPUT|TEXTAREA/.test(document.activeElement.tagName)||e.metaKey||e.ctrlKey||e.altKey)return;if(e.key==='ArrowLeft'&&pv)location.href=pv.href;if(e.key==='ArrowRight'&&nx)location.href=nx.href});
})();
