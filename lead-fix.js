// Fix lead popup buttons
(function(){
  function openLead(){
    var lead = document.getElementById('lead');
    if(!lead) return;
    lead.classList.add('open');
    document.body.classList.add('lead-open');
    document.body.style.overflow = 'hidden';
  }
  function closeLead(){
    var lead = document.getElementById('lead');
    if(!lead) return;
    lead.classList.remove('open');
    document.body.classList.remove('lead-open');
    document.body.style.overflow = '';
  }
  window.openLead = openLead;
  window.closeLead = closeLead;

  document.addEventListener('click', function(e){
    var link = e.target.closest('a[href="#lead"], button[data-open-lead], [data-open-lead]');
    if(link){
      e.preventDefault();
      e.stopPropagation();
      if(document.body.classList.contains('pm-open') && typeof window.closeProj === 'function'){
        try{ window.closeProj(); }catch(_){}
      }
      openLead();
      return false;
    }

    var lead = document.getElementById('lead');
    if(lead && e.target === lead){
      closeLead();
    }
  }, true);

  document.addEventListener('DOMContentLoaded', function(){
    var closeBtn = document.getElementById('leadClose');
    if(closeBtn){
      closeBtn.addEventListener('click', function(e){
        e.preventDefault();
        closeLead();
      });
    }
  });

  document.addEventListener('keydown', function(e){
    if(e.key === 'Escape') closeLead();
  });
})();
