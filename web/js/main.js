  /* 
   if (cards.kik.returnToConversation) {
    // Card was launched by a conversation
    App.load('viewer');
}
*/

   App.populator('favorites', function (page) {
        // put stuff here
      });
   App.populator('newMeme',function(page){
   	var canvas = $(page).find('#myCanvas')[0];
   	//var image = $(page).find('#sampleMeme')[0];
   	var topline = $(page).find('#top-line');
   	var bottomline = $(page).find('#bottom-line');
   	var create = $(page).find('#create');
    var pickedMeme;
    var kik = $(page).find('#kikButton');
    var save = $(page).find('#save');

    $(page).find('#myCanvas').clickable();
    $(page).find('#myCanvas').on('click',function(){
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

        });

       kik.on('click',function(){
        var url = canvas.toDataURL();
        cards.kik.send({
    title    : 'Message title'        ,
    text     : 'Message body'         ,
    pic      : url ,       // optional
    big      : true                   ,       // optional
    //linkData : 'data to propagate to my card' // optional
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

  
    App.populator('viewer',function(page){

    }); 



      try {
        App.restore();
      }
      catch (err) {
        App.load('favorites');
      }
