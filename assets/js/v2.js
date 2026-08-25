(function(){
  function rafThrottle(fn){
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

  function initTimeline(){
    var timeline=document.querySelector('.timeline');
    if(!timeline) return;

    var items=[].slice.call(timeline.querySelectorAll('li'));
    var reduceMotion=window.matchMedia && window.matchMedia('(prefers-reduced-motion: reduce)').matches;
    if(reduceMotion) return;

    function update(){
      var rect=timeline.getBoundingClientRect();
      var trigger=window.innerHeight*0.58;
      var fill=Math.max(0,Math.min(rect.height,trigger-rect.top));
      timeline.style.setProperty('--fill',fill+'px');

      items.forEach(function(item){
        var itemRect=item.getBoundingClientRect();
        var circleY=itemRect.top+8;
        item.classList.toggle('on',circleY<=trigger);
      });
    }

    var onScroll=rafThrottle(update);
    window.addEventListener('scroll',onScroll,{passive:true});
    window.addEventListener('resize',onScroll,{passive:true});
    update();
  }

  if(document.readyState==='loading'){
    document.addEventListener('DOMContentLoaded',initTimeline);
  }else{
    initTimeline();
  }
})();
