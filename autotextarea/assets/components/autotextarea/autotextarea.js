;(function($) {



	var autotextarea = function(wrap) {
		this.wrap = wrap;
		this.checkOverprint = function(e, element) {
			
			if (e.keyCode === 13) {
				var sstart = element.selectionStart;
				
		    	var value = $(element).val();
		    	
		    	var first = value.substring(0, element.selectionStart);
		    	var l = first.split("\n");
		    	l.pop();
		    	var lp = l.pop();
		    	var tabs = '';
		    	(lp.length>0 && /^[\t]*/.test(lp)) && (tabs = lp.match(/^([\t]*)/)[1]);
		    	
		    	var last = value.substring(element.selectionStart, value.length);
		    	$(element).val(first+tabs+last);
		    	element.selectionStart = sstart+tabs.length;
		    	element.selectionEnd = sstart+tabs.length;
		    	//$(this).val()
		    }
			
			this.FitToContent($(element)[0], false);
		}
		this.build = function() {
			var that = this;
			if ($(wrap)[0].tagName!="TEXTAREA")
			this.wrap = $(this.wrap).find('>textarea');
			
			$(this.wrap).css({
				'transition': 'height 200ms ease'
			});

			// > make textarea tababble
			$(this.wrap).keydown(function(e) {
					
			    if(e.keyCode === 9) { // tab was pressed
			        // get caret position/selection

			        var start = this.selectionStart;
			        var end = this.selectionEnd;

			        var $this = $(this);
			        var value = $this.val();

			        // set textarea value to: text before caret + tab + text after caret
			        $this.val(value.substring(0, start)
			                    + "\t"
			                    + value.substring(end));

			        // put caret at right position again (add one for the tab)
			        this.selectionStart = this.selectionEnd = start + 1;

			        // prevent the focus lose
			        e.preventDefault();
			    }

			   

			   
			})
			.keyup(function(e) { // Tab support
				that.checkOverprint(e, this);
			});
			
			// Fit to content
			setTimeout(function() { that.FitToContent($(that.wrap)[0], false); }, 150);

			// > create container
			this.container = $(this.wrap).wrapAll($('<div />', {
				"ui-brahma-post-container": true
			})).css({'overflow':'hidden'}).parent();

			// > put textarea to wrapper
			this.textcontainer = $(this.wrap).wrapAll($('<div />', {
				'class': 'textarea-inside'
			})).parent();

			// > add preview div
			this.previewwrap = $(this.textcontainer).and($('<div />', {
				"class": "preview"
			})).hide();

		
		};



		this.FitToContent = function(element, maxHeight)
		{
		   var text = element;
		   if ( !text ) {
		      return;
		   }
		  
		   var adjustedHeight = text.clientHeight;
		   
		   if ( !maxHeight || maxHeight > adjustedHeight )
		   {

		      adjustedHeight = Math.max(text.scrollHeight, adjustedHeight);
		      if ( maxHeight )
		         adjustedHeight = Math.min(maxHeight, adjustedHeight);
		      if ( adjustedHeight > text.clientHeight )
		         text.style.height = adjustedHeight + "px";
		   }
		}

		this.build();
	};

	$.fn.autotextarea = function() {
		return $(this).each(function() {
			new autotextarea(this);
		});
	}
})(jQuery);