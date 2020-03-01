<script>
  {{Error Wrapper - Function -- Library Error Wrapper}}('All Pages - Visibility - Infra -- Promotions Impressions',
  	function() {

  	  var bloco = [];
  	  var gtmDl = google_tag_manager[{{Cointainer ID}}].dataLayer;
  	  if(!gtmDl.get("GTMpromos"))	gtmDl.set('GTMpromos', []);

  	  var img = {{Element}};
  	  var url = {{Page URL}};
  	  var promo_imgs = [];
  	  var getClosest = {{Get Closest Parent Element By Selector - Function}};

  	  var notClickable = getClosest(img, 'a');
  	    notClickable = notClickable.href.split('#')[0];
  	    notClickable = notClickable == url ? true : notClickable;

  	  var checkClass = getClosest(img, '.hide-mobile');
  	    notClickable = checkClass ? true : notClickable;

  	    if(!notClickable) {
  	      var posicao = getClosest(img, li[class*=posicao]);
  	      posicao = posicao ? posicao.className : undefined;

  	      if(posicao != undefined){
  	      	if(posicao.indexOf("carousel") >= 0) {
  	      		posicao = posicao.match(/posicao\d/)[0] + '-carousel'
  	      	}
  	      };

  	      var promo = {
  	      	'name': getClosest(img, 'a').href,
  	      	'id': img.src,
  	      	'position': posicao
  	      };

  	      var promos = gtmDl.get('GTMpromos');
  	      promos.push(promo);
  	      gtmDl.set('GTMpromos', promos);

  	    } else return;

  	    var lastPromoSent;

  	    promos.forEach(function(promo){
  	      if(promo.hasFired) lastPromoSent = promo.hasFired	
  	    });
  	    var position = !lastPromoSent ? 0 : lastPromoSent;
  	      position = position != 0 ? position + 1 : position;

  	      setTimeout(function(){
  	      	if(position >= 0) 
  	      		bloco.filter(function(promo){
  	      			return promo.hasFired == undefined
  	      		});
  	      	if(bloco.length){
  	      		dataLayer.push({
  	      			'event': 'gtmpromotions',
  	      			'ecommerce': {
  	      				'promoView': {
  	      					'promotions': bloco
  	      				}
  	      			}
  	      		});

  	      		for(var i = 0; i < promos.length; i++){
  	      			if(promos[i].hasFired == undefined){
  	      				promos[i]['hasFired'] = p2++;
  	      			}
  	      		}
  	      	}
  	      }, 1000);

  	      gtmDl.set('GTMpromos', promos);


  	}, undefined, {{HTML ID}});
  </script>