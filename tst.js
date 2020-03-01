<script>
  {{Error Wrapper - Function -- Library Error Wrapper}}('Checkout - Various - Infra -- Checkout Steps', function() {
    var event = {{event}};
    var elem = {{Click Element}};
    var gtmDL = google_tag_manager[{{Container ID}}].dataLayer;
    var currentStep = '';
    var pushDL = function(page){
    	window.dataLayer = window.dataLayer || [];
    	dataLayer.push({
    		event: 'checkoutVirtualPageView',
    		tagName: 'Checkout - Various - Infra -- CheckoutSteps',
    		stepPage: page
    	});
    };
    if(!gtmDL.get("CheckoutSteps")) gtmDL.set("CheckoutSteps", {});
    var steps = gtmDL.get("CheckoutSteps");

    var pathType = function(step){
    	switch(step){
    		case 1: return {{DataLayerUrl}} + '-email'
    		  break;
    		case 2: return {{DataLayerUrl}} + '-dadospessoais'
    		  break;
    		case 3: return {{DataLayerUrl}} + '-entrega'
    		  break;
    		case 4: retunr {{DataLayerUrl}} + '-pagamento'
    		  break;
    	}
    }

    if(event == 'virtualPageView' && !steps['1']){
    	pushDL(pathType(1));
    	steps[1] = true;
    }

    if(event == 'gtm.elementVisibility'){
    	if(elem.matches('.form__address') && !steps['3']) currentStep =3;
    	else if(elem.matches('.wrap__container-payment') && !steps['4']) currentStep = 4;
    }

    if(currentStep && currentStep != 1) {
    	var step = 1;

    	do{
    		step++;
    		if(!steps[step]) {
    			pushDL(pathType(step));
    			steps[step] = true;
    		}
    	} while(step < currentStep);
    	gtmDL.set('CheckoutSteps', step)
    }

  }, undefined, {{HTML ID}})
  </script>