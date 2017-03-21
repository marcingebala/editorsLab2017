function getSelectionText() {
  var text = "";
  if (window.getSelection) {
      text = window.getSelection().toString();
  } else if (document.selection && document.selection.type != "Control") {
      text = document.selection.createRange().text;
  }
  return text;
}

var commentFn = {
	i : 1,
	
	myName : 'Marcin Gębala',

	data : [
		{
			text : 'AECR i New Direction otrzymały łącznie 3,2 mln euro',
			author: {
				name : 'Tomasz Bielecki',
				company : 'WYBORCZA.PL',
				comment : 'Partie polityczne w Parlamencie Europejskim muszą upubliczniac swoje finanse. W załączeniu zdjęcie z dokumentu EPP, do którego nalezy PO i widać, że nie ma donatorów.<img src="assets/info.png" />',
			},
			users : [
				{
					name : 'Jan Kowalski',
					comment : 'Pokażcie ile pieniędzy zebrało PO w Parlamencie Europejskim ?',
				}
			]
		},
		{
			text : 'Polacy nagle wpłacili na te organizacje 200 tys. euro',
			author: {
				name : 'Tomasz Bielecki',
				company : 'WYBORCZA.PL',
				comment : 'Finanse partii politycznych w Parlamencie Europejskim muszą być transaprentne. Sprawozdania można pobrać ze strony parlamentu.',
			},
			users : [
				{
					name : 'Jan Kowalski',
					comment : 'Gdzie można te dokumenty przeczytać?',
				},
				{
					name : 'Artur Berkow',
					comment : 'Skąd wiadomo kto i ile wpłaca na partie, czy wyborcza nie wymyśliła tych darczyńców, albo kwot wpłacanych?!',
				}
			]
		}
	],

	add : function(e){
		
		this.i++;
		
		var oldText = $('article').html();
		var selectText = getSelectionText();
		var text = $('article').html().replace( selectText, '<span class="textComment" index="'+this.i+'">'+selectText+'</span>')
		$('article').html( text );
				
		if((oldText != $('article').html() ) && (selectText != '')){

			this.data.push({
				text : selectText,
				author: null,
				users : []
			})
		
			this.show(this.i);
		
		}
		else{
			this.i--;
		}

	},

	addComment : function(i){
		var val = $('.comment.user textarea').val();

		this.data[i].users.unshift({
			name : commentFn.myName,
			comment : val
		});

		$('.comment.user .save').fadeOut(500);
		$('.comment.user .count').fadeOut(500);
		$('.comment.user textarea').fadeOut(500,function(){
			$('.comments-scroll > .comment.user').eq(0).find('.right').append('<p>'+val+'</p>');	
		});

	},

	show : function(i){

		$('#comment-box > h2 > span').html( '„'+commentFn.data[i].text+'”' );
		
		var text = '';

		if(commentFn.data[i].author != null){
			text+='<div class="left">';
			text+='<div class="thumbnail">';
			text+='<h2>'+commentFn.data[i].author.name+'</h2>';
			text+='<h3>'+commentFn.data[i].author.company+'</h3>';
			text+='</div>';
			text+='<div class="ico"></div>';
			text+='</div>';

			text+='<div class="right">';
			text+='<h2>Od autora:</h2>';
			text+='<p>'+commentFn.data[i].author.comment+'</p>';
			text+='</div>';

			$('#comment-box .comment.author').html( text );
		}
		else{
			$('#comment-box .comment.author').html('');
		}

		var text = '';
		drawTextArea = false;

		if(commentFn.data[i].users.length > 0){
			if(commentFn.data[i].users[0].name != commentFn.myName){
				drawTextArea = true;
			}
		}
		else{
			drawTextArea = true;
		}

		if(drawTextArea){
			text+='<div class="comment user">';
			text+='<div class="left">';
			text+='<div class="thumbnail">';
			text+='<h2>'+commentFn.myName+'</h2>';
			text+='</div>';
			text+='<div class="ico"></div>';
			text+='</div>';
			text+='<div class="right">';
			text+='<h2>komentarz:</h2>';
			text+='<textarea placeholder="wpisz komentarz"></textarea><span class="count">140</span>';
			text+='<span class="save" style="color:#f7921e" index="'+i+'">zapisz</span>';
			text+='</div>';
			text+='</div>';
		}

		for(var j = 0, j_max = commentFn.data[i].users.length; j < j_max; j++){
			text+='<div class="comment user">';
			text+='<div class="left">';
			text+='<div class="thumbnail">';
			text+='<h2>'+commentFn.data[i].users[j].name+'</h2>';
			text+='</div>';
			text+='<div class="ico"></div>';
			text+='</div>';
			text+='<div class="right">';
			text+='<h2>komentarz:</h2>';
			text+='<p>'+commentFn.data[i].users[j].comment+'</p>';
			text+='</div>';
			text+='</div>';
		}
		
		$('#comment-box .comments-scroll').html( text );

		$('#comment-box').css({'top':$(window).scrollTop()+$(window).height()/2-$('#comment-box').height()/2+'px','left':50%+'%'})
		$('#comment-box').slideToggle(500);
	},

	hide : function(){
		$('#comment-box').slideToggle(500);
	},

	setCount : function(e){
		$('.count').html(parseInt(140 - $(e.target).val().length) );

		if( $(e.target).val().length > 140 ){
			$('.count').css('color','#e3022c');
		}else{
			$('.count').css('color','#f7921e');
		}
	}

}

$(document).ready(function(){

	$('#menu-left div').click(function(){ commentFn.add(); });

	$('.close').click(function(){ commentFn.hide(); });
	$('article').on('click','.textComment',function(e){ commentFn.show( $(e.target).attr('index') ); }); 
	$('#comment-box').on('click','.save',function(e){ commentFn.addComment( $(e.target).attr('index') ); }); 

	$('#comment-box').on('click','.ico',function(e){ $('#inputFile').click(); }); 

	$('#comment-box').on('keyup','textarea',function(e){ commentFn.setCount(e); }); 

});


$( window ).scroll(function() {
	if( $(window).scrollTop() < 952){
		$('#menu-left').css({'position':'absolute', 'top':'1052px'});
	}
	else{
		$('#menu-left').css({'position':'fixed', 'top':'100px'});
	}
});
