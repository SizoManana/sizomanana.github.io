(function(){
  function raf(fn){
    var queued=false;
    return function(){
      if(queued) return;
      queued=true;
      requestAnimationFrame(function(){
        fn();
        queued=false;
      });
    };
  }

  function timeline(){
    var tl=document.querySelector('.timeline');
    if(!tl) return;

    var nodes=[].slice.call(tl.querySelectorAll('li'));

    var tick=function(){
      var r=tl.getBoundingClientRect();
      var mid=window.innerHeight*0.58;
      var fill=Math.max(0,Math.min(r.height,mid-r.top));

      tl.style.setProperty('--fill',fill+'px');

      nodes.forEach(function(n){
        var markerY=(n.offsetTop+8);
        if(fill>=markerY){
          n.classList.add('on');
        }else{
          n.classList.remove('on');
        }
      });
    };

    var on=raf(tick);
    window.addEventListener('scroll',on,{passive:true});
    window.addEventListener('resize',on,{passive:true});
    window.addEventListener('load',tick);
    tick();
  }

  function boot(){timeline();}
  if(document.readyState!=='loading'){
    boot();
  }else{
    document.addEventListener('DOMContentLoaded',boot);
  }
})();