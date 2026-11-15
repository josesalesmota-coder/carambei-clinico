/* Carambeí Clínico · chip do paciente pediátrico (mostra peso/idade ao rolar) */
(function(){
  var chip=document.createElement('button');chip.id='cc-patient-chip';chip.type='button';
  chip.setAttribute('aria-label','Voltar aos dados do paciente');
  function attach(){ if(!document.body.contains(chip)) document.body.appendChild(chip); }
  function read(){
    var panel=document.querySelector('.pediatric-page .patient-panel');
    if(!panel){chip.classList.remove('is-visible');return;}
    var ins=panel.querySelectorAll('input');
    var w=ins[0]&&ins[0].value.trim(), a=ins[1]&&ins[1].value.trim();
    var unitSel=panel.querySelector('[role=combobox], select');
    var unit=(unitSel&&/ano/i.test(unitSel.textContent||unitSel.value||''))?'anos':'meses';
    var r=panel.getBoundingClientRect(); var hidden=r.bottom<60||r.top>window.innerHeight;
    if(w&&hidden){chip.innerHTML='Paciente: <b>'+w+' kg</b>'+(a?' · <b>'+a+' '+unit+'</b>':'');chip.classList.add('is-visible');}
    else chip.classList.remove('is-visible');
  }
  chip.addEventListener('click',function(){var p=document.querySelector('.pediatric-page .patient-panel');if(p){p.scrollIntoView({behavior:'smooth',block:'start'});var i=p.querySelector('input');if(i)setTimeout(function(){i.focus({preventScroll:true})},350);}});
  var t;function sched(){clearTimeout(t);t=setTimeout(read,80);}
  function init(){attach();read();window.addEventListener('scroll',sched,{passive:true});document.addEventListener('input',sched,true);window.addEventListener('popstate',sched);new MutationObserver(sched).observe(document.getElementById('root')||document.body,{childList:true,subtree:true});}
  if(document.readyState==='loading')document.addEventListener('DOMContentLoaded',init);else init();
})();
