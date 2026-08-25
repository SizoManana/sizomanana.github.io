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
        var markerY=n.offsetTop+8;
        if(fill>=markerY){n.classList.add('on');}else{n.classList.remove('on');}
      });
    };

    var on=raf(tick);
    window.addEventListener('scroll',on,{passive:true});
    window.addEventListener('resize',on,{passive:true});
    window.addEventListener('load',tick);
    tick();
  }

  function stickyMiniNav(){
    var navs=[].slice.call(document.querySelectorAll('.v2-mini-nav'));
    if(!navs.length) return;

    navs.forEach(function(nav){
      if(!nav.querySelector('.v2-top-link')){
        var topLink=document.createElement('a');
        topLink.href='#main';
        topLink.className='v2-top-link';
        topLink.textContent='Top ↑';
        topLink.setAttribute('aria-label','Back to the top of the page');
        nav.insertBefore(topLink,nav.firstChild);
        topLink.addEventListener('click',function(e){
          e.preventDefault();
          var reduce=window.matchMedia('(prefers-reduced-motion: reduce)').matches;
          window.scrollTo({top:0,behavior:reduce?'auto':'smooth'});
        });
      }

      var spacer=document.createElement('div');
      spacer.className='v2-mini-nav-spacer';
      spacer.setAttribute('aria-hidden','true');
      nav.parentNode.insertBefore(spacer,nav);

      var stuck=false;
      var sidebar=document.querySelector('.sidebar');
      var sectionLinks=[].slice.call(nav.querySelectorAll('a[href^="#"]')).filter(function(a){
        return !a.classList.contains('v2-top-link') && document.getElementById(a.getAttribute('href').slice(1));
      });

      function topOffset(){
        if(window.innerWidth>=1080) return 12;
        return (sidebar ? sidebar.getBoundingClientRect().height : 0)+8;
      }

      function pinnedHeight(){
        return stuck ? nav.offsetHeight : 56;
      }

      sectionLinks.forEach(function(a){
        a.addEventListener('click',function(e){
          var id=a.getAttribute('href').slice(1);
          var target=document.getElementById(id);
          if(!target) return;
          e.preventDefault();
          var reduce=window.matchMedia('(prefers-reduced-motion: reduce)').matches;
          var y=target.getBoundingClientRect().top+window.scrollY-topOffset()-pinnedHeight()-16;
          window.scrollTo({top:Math.max(0,y),behavior:reduce?'auto':'smooth'});
          if(window.history && history.pushState){history.pushState(null,'','#'+id);}else{location.hash=id;}
        });
      });

      function syncActive(offset){
        var threshold=window.scrollY+offset+(stuck?nav.offsetHeight:0)+32;
        var active=null;
        sectionLinks.forEach(function(a){
          var target=document.getElementById(a.getAttribute('href').slice(1));
          if(target && target.offsetTop<=threshold) active=a;
        });
        sectionLinks.forEach(function(a){a.classList.toggle('on',a===active);});
      }

      function unstick(){
        stuck=false;
        nav.classList.remove('is-stuck');
        nav.style.top='';
        nav.style.left='';
        nav.style.width='';
        spacer.style.height='0px';
      }

      function tick(){
        var offset=topOffset();
        var origin=window.scrollY+spacer.getBoundingClientRect().top;
        var shouldStick=window.scrollY+offset>=origin;

        if(shouldStick){
          var r=spacer.getBoundingClientRect();
          if(!stuck){
            stuck=true;
            nav.classList.add('is-stuck');
          }
          nav.style.top=offset+'px';
          nav.style.left=r.left+'px';
          nav.style.width=r.width+'px';
          spacer.style.height=(nav.offsetHeight+24)+'px';
        }else if(stuck){
          unstick();
        }

        syncActive(offset);
      }

      var on=raf(tick);
      window.addEventListener('scroll',on,{passive:true});
      window.addEventListener('resize',on,{passive:true});
      window.addEventListener('load',tick);
      tick();
    });
  }

  function boot(){
    timeline();
    stickyMiniNav();
  }

  if(document.readyState!=='loading'){
    boot();
  }else{
    document.addEventListener('DOMContentLoaded',boot);
  }
})();