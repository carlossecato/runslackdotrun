<script>
  {{Error Wrapper - Function -- Library Error Wrapper}}('All Pages - Visibility - Infra -- Promotion Impressions', function() {
   
    var bloco = [];
    var gtmDl = google_tag_manager[{{Container ID}}].dataLayer;
  		if(!gtmDl.get("GTMpromos")) gtmDl.set("GTMpromos", []);  
    var img = {{Element}}; 
    var url = {{Page URL}};
    var promo_imgs = [];
    var getClosest = {{Get Closest Parent Element By Selector - Function}};
  	//faz a verificacao de banners que nao possuem href de promocoes, portanto sao nao passiveis de clique
	var notClickable = getClosest(img,'a');
  		notClickable = notClickable.href.split('#')[0];
  		notClickable = (notClickable == url) ? true : false;
  	//verifica banners que ficam escondidos para mobile 
  	var checkClass = getClosest(img, '.hide-mobile'); 
  		notClickable = checkClass ? true : notClickable;		
  
  	//se e possivel clicar, seta a posicao da promocao que esta no DOM do site
  	if(!notClickable) {
      var posicao = getClosest(img, 'li[class*=posicao]');
      posicao = posicao ? posicao.className : undefined;

      if(posicao != undefined){
        if(posicao.indexOf("carousel") >= 0){
          posicao = posicao.match(/posicao\d/)[0] + "-carousel"
        }
      };
      
      //deixa a promocao no padrao 
      var promo = {
        'name': getClosest(img,'a').href,
	    'id': img.src,
        'position': posicao
      };	
     	
      //armazana as promocoes visualizadas em um vetor de objetos
      var promos = gtmDl.get('GTMpromos');
      promos.push(promo);
      gtmDl.set('GTMpromos', promos);
      
    } else return;
  
  	//seta a ultima promocao vista e marca sua posicao de disparo
  	var lastPromoSent;
    promos.forEach(function(promo){if(promo.hasFired) lastPromoSent = promo.hasFired});
    var position = !lastPromoSent ? 0 : lastPromoSent;
    position = position != 0 ? position + 1: position;

  	//aguarda um tempo para que seja formado o bloco de promocoes que disparem proximas
    setTimeout(function(){
      if(position >= 0) bloco = promos.filter(function(promo){ return promo.hasFired == undefined});
      if(bloco.length){
        dataLayer.push({
          'event': 'gtmpromotions',
          'ecommerce': {
            'promoView': {
              'promotions': bloco 
             }
           }
        });
        //atualiza a posicao para os proximos disparos
        var p2 = position;
        for(var i = 0; i < promos.length; i++){
          if(promos[i].hasFired == undefined){
            promos[i]["hasFired"] = p2++;
          }
        }
      }
    }, 1000);
  
    gtmDl.set('GTMpromos', promos);
  }, undefined, {{HTML ID}});
</script>
