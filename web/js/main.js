



  App.populator('newMeme',function(page){
    var canvas = $(page).find('#myCanvas')[0];
     	//var image = $(page).find('#sampleMeme')[0];
     	var topline = $(page).find('#top-line');
     	var bottomline = $(page).find('#bottom-line');
     	var create = $(page).find('#create');
      var pickedMeme;
      var kik = $(page).find('#kikButton');
      var save = $(page).find('#save');

      //$(page).find('#myCanvas').clickable();
      //$(page).find('#myCanvas').on('click',function(){
      $(page).find('#pic').on('click',function(){  
        cards.photo.get({
      quality    : 0.7  , // number between 0-1
      minResults : 1    , // number between 0-25
      maxResults : 1   , // number between 1-25
      maxHeight  : 300 , // number in pixels between 0-1280
      maxWidth   : 300 , // number in pixels between 0-1280
    }, function (photos) {
      // do something with the photos
      if(!photos){

      }else{
        pickedMeme = Meme(photos[0],canvas,300);
      }
    });
      });
  		//$(topline, bottomline).keyup(function() {
       create.on('click',function(){

        pickedMeme.updateText(topline.val(),bottomline.val());

        
      });

       save.on('click',function(){

        if(canvas.width == 0 && canvas.height == 0){

        }else {

        cards.photo.saveToGallery(canvas.toDataURL(), function (status) {
          if (status) {
          // save succeeded
          alert('Image Saved');
        }
        else {
          // save failed
          alert('Save Failed. Please Try Again');
        }
      });
      }

      });



       kik.on('click',function(){
        var url = canvas.toDataURL();
        FPAPI.save(url, function (link) {
      // link is a normal url can hosts the image
      cards.kik.send({
          title    : 'Message title'        ,
          text     : 'Message body'         ,
          pic      : link ,       // optional
          big      : true                   ,       // optional
          linkData : link
        });
    });
  });

     	//Meme(image, canvas, 'Buy pizza', 'Pay in snakes');
       /*$(page).on('appLayout',function(){
       	setTimeout(function(){
       		console.log(image.width,image.height);
       		Meme(image, canvas, 'Buy pizza', 'Pay in snakes');
       	},1000);
  });*/

  });


  App.populator('viewer',function(page, data){

    var home = $(page).find('#home');
    var vcanvas = $(page).find('#viewCanvas')[0];
    var savepic = $(page).find('#savepic');
    var forward = $(page).find('#forward');
    
    //$(page).find('img').attr('src', data.url);

    Meme(data.url,vcanvas,300); 
    
    home.on('click',function(){

      App.load('newMeme');

    });

    savepic.on('click',function(){

      cards.photo.saveToGallery(data.url, function (status) {
          if (status) {
          // save succeeded
          alert('Image Saved');
        }
        else {
          // save failed
          alert('Save Failed. Please Try Again');
        }
      });

    });

    forward.on('click',function(){

      cards.kik.send({
          title    : 'Message title'        ,
          text     : 'Message body'         ,
          pic      : data.url ,       // optional
          big      : true                   ,       // optional
          linkData : data.url
        });
    });

  



  }); 


    /*    try {
          App.restore();
        }
        catch (err) {
          App.load('newMeme');
        }*/


       if (cards.browser && cards.browser.linkData) {
      // Card was launched by a conversation
      App.load('viewer', { url : cards.browser.linkData });
      //cards.kik.returnToConversation(); // return to conversation
    }else {
      App.load('newMeme');
    }
    //App.load('viewer');