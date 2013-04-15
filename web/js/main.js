
  App.populator('newMeme',function(page){
      
      //Variable intialization
      var canvas = $(page).find('#myCanvas')[0];
      //Sample image commented out
     	//var image = $(page).find('#sampleMeme')[0];
     	var topline = $(page).find('#top-line');
     	var bottomline = $(page).find('#bottom-line');
     	var create = $(page).find('#create');
      var pickedMeme;
      var kik = $(page).find('#kikButton');
      var save = $(page).find('#save');

      //$(page).find('#myCanvas').clickable();
      //$(page).find('#myCanvas').on('click',function(){
      
      //Making the canvas clickable to intiate the photo
      //picker for the Kik application

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
        //Creating the Meme
        pickedMeme = Meme(photos[0],canvas, 300);
      }
    });
      });

       //Clicking the create button updates the bottom and 
       //top texts with the texts in the text fields

       create.on('click',function(){

        pickedMeme.updateText(topline.val(),bottomline.val());

        
      });

       //Save button to save the meme to the native gallery

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

       //Kiking the meme to your friends

       kik.on('click',function(){
        if(!(canvas.width  == 0 && canvas.height == 0)){
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
      }
  });

  });

  
  //Populating the viewer page which is initiated
  //When opening from a Kik

  App.populator('viewer',function(page, data){

    var home = $(page).find('#home');
    var vcanvas = $(page).find('#viewCanvas')[0];
    var savepic = $(page).find('#savepic');
    var forward = $(page).find('#forward');

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

       if (cards.browser && cards.browser.linkData) {
      // Card was launched by a conversation
      App.load('viewer', { url : cards.browser.linkData });
      //cards.kik.returnToConversation(); // return to conversation
    }else {
      App.load('newMeme');
    }
  