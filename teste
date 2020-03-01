<script>
  {{Error Wrapper - Function -- Library Error Wrapper}}('Checkout - Various - Infra -- Checkout Steps', function(){
    var event = {{event}}
      , elem = {{Click Element}}
      , gtmDL = google_tag_manager[{{Container ID}}].dataLayer
      , currentStep
      , pushDL = function(page){ // funcao que da push no dataLayer do checkoutStep 
          window.dataLayer = window.dataLayer || [];
          dataLayer.push({
            event: 'checkoutVirtualPageview',
            tagName: 'Checkout - Various - Infra -- Checkout Steps',
            stepPage: page
          });
        }; 
    if(!gtmDL.get("checkoutSteps")) gtmDL.set("checkoutSteps", {});
    var steps = gtmDL.get("checkoutSteps");
	
    var pathType = function(step){ 
      switch(step){
        case 1: return {{DataLayer_Url}} + '-email'
          break;
        case 2: return {{DataLayer_Url}} + '-dadospessoais'
          break;
        case 3: return {{DataLayer_Url}} + '-entrega'
          break;
        case 4: return {{DataLayer_Url}} + '-pagamento'
          break;
      }
    }
    
    if(event == "virtualPageView" && !steps["1"]){
      pushDL(pathType(1));
      steps[1] = true;
    }
  
  	if(event == "gtm.elementVisibility"){
      if(elem.matches('.form__cadastro') && !steps["2"]) currentStep = 2;
      else if(elem.matches('.form__address') && !steps["3"]) currentStep = 3;
      else if(elem.matches('.wrap__container-payment') && !steps["4"]) currentStep = 4;
    }
  

    if(currentStep && currentStep != 1){
      // da o push no dl para os steps que nao foram disparados ainda ate o step atual
      var step = 1;
      do {
        step++;
        if(!steps[step]) {
          pushDL(pathType(step));
          steps[step] = true;
        }
      }while(step < currentStep);
      
      gtmDL.set("checkoutSteps", steps); 
    }  
  }, undefined, {{HTML ID}})
</script>

