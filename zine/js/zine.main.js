
	if(console == null){
		var console = {
			log: function(){}
		};
	};



	Zine = {
		transitionLock: false	,
		slideTime: 500,
		pageFolder: 'pages/',
		scriptsToLoad: 0,
		scriptsLoaded: 0
	};
	
	
	
	
	Zine.init = function( args ){
		
		this.frameId = args.frameId;
		this.pageClass = args.pageClass;
		
		if(args.pageFolder != null){
			this.pageFolder = args.pageFolder;
		};
		
		
		this.frame = $('#'+this.frameId);
		this.frame.addClass('zine-frame');
		
		
		this.width = this.frame.width();
		this.height = this.frame.height();
		
		
		this.loopNav = args.loop;
		if(args.loopSkipsHomepage){
			this.firstPage = 1;
		} else {
			this.firstPage = 0;
		};
		
		
		
		// Gather and prepare pages
		this.getPages();
		
		// Put pages in frame
		this.frame.append(this.Pages);
		
		
		// Check for navbars
		if(args.bottomNav != null){
			this.setBottomNav(args.bottomNav);
		};
		
		
		// Put first page in place
		this.activePageIndex = 0;
		$(this.Pages[this.activePageIndex]).removeClass('hidden');
		
		
	}//
	
	
	
//------------------------------------------------------------------------------------------------------------------	
	Zine.getPages = function()
	{
		var Ps = $('.'+this.pageClass);
		
		// Check for dynamic content
		Ps.each(function(){
			// Get dynamic content -------------------------
			if( $(this).attr('data-content') !== undefined ){
				
				var content = $(this).attr('data-content');
				var bits = content.split('::');
				var type = bits.shift();
				var data = bits.join();
				
				switch(type){
					case 'load'		:	Zine.loadContent_Ajax(this, data);	break;
				};
				
			};
			
			// Get extra stylesheets -------------------------
			if( $(this).attr('data-stylesheet') !== undefined ){
				var path = $(this).attr('data-stylesheet');
				var style= document.createElement('link');
					style.type = 'text/css';
					style.rel = 'stylesheet';
					style.href = Zine.pageFolder+path+"/"+ path+".css";
				document.getElementsByTagName('head')[0].appendChild(style);
			};
			
			// Get extra javascripts -------------------------
			if( $(this).attr('data-javascript') !== undefined ){
				var path = $(this).attr('data-javascript');
				this.objName = path;
				
				Zine.scriptsToLoad ++;

								
				$.getScript(Zine.pageFolder+path+"/"+ path+".js", function(){
						Zine.scriptsLoaded++;
						if(Zine.scriptsLoaded == Zine.scriptsToLoad){
							Zine.initialisePages();
						};
					});
			};			
			
		});
		
		
		for(var k=0; k<Ps.length; k++)
		{
			Ps[k] = this.parsePage(Ps[k]);
			Ps[k].ind = k;
		};
		
		
		this.Pages = Ps;
	}//


//------------------------------------------------------------------------------------------------------------------	
	Zine.initialisePages = function()
	{
		for( var k=0; k < this.Pages.length; k++)
		{
			if(this.Pages[k].objName!= undefined){
				eval(this.Pages[k].objName+".init()");
			}
		};
	}//




//------------------------------------------------------------------------------------------------------------------	
	Zine.loadContent_Ajax = function( pageObj, fileName )
	{
		$.ajax({
			type: 'get',
			url: Zine.pageFolder+ fileName +'/'+ fileName+".html",
			context: pageObj,
			success: function(){
				this.innerHTML = arguments[0];
			},
			   
		});
	}//

//------------------------------------------------------------------------------------------------------------------	
	Zine.parsePage = function( P )
	{
		$(P).addClass('zine-page')
			.css({
				width: this.width+"px",
				height: this.height+"px"
			});
		
		
		// wrap page in another element to preserve positioning
		var wrap = document.createElement("div");
			wrap.className = "zine-page-wrap hidden";
			wrap.appendChild(P);
			
			wrap.setAttribute('data-onprepare',$(P).attr('data-onprepare'));
			wrap.setAttribute('data-onshow',$(P).attr('data-onshow'));
			
			wrap.objName = P.objName;
			
			
					
		// Register event handlers -------------------------
		if( $(P).attr('data-onshow') !== undefined ){
			$(wrap).bind('onActive',function(){
				eval( $(this).attr('data-onshow') );			
			});
		};
			
		if( $(P).attr('data-onprepare') !== undefined ){
			$(wrap).bind('onPrepare',function(){
				eval( $(this).attr('data-onprepare') );			
			});
		};
			

		
		return wrap;
	}//
	
	
	
	
//------------------------------------------------------------------------------------------------------------------	
	Zine.setBottomNav = function( $id ){
		this.bottomNav = $($id);
		if(this.bottomNav.length<1){return};
		
		this.frame.append(this.bottomNav);
		
		this.bottomNav.addClass('zine-bottom-nav');
		
		// Absolute position it at bottom
		this.bottomNav.css({
			width: Zine.width+"px",
			position: "absolute",
			left: "0px",
			bottom: "0px"
		});
		
		var blobs = Array();
		var blobwrap = $('<div class="zine-nav-blobwrap"></div>');
		
		// Count number of pages
		for(var k=0;k<this.Pages.length;k++){
			var outer = document.createElement('div');
				outer.className = "zine-nav-blob-outer";
			var inner = document.createElement('div');
				inner.className = "zine-nav-blob-inner";
			outer.appendChild(inner);
			
			outer.pageID = k;
			
			$(outer).bind('click',function(){
				Zine.goTo(this.pageID);			
			});
			
			blobs.push(outer);
		};
		this.bottomNav.append(blobwrap.append(blobs));
		
		$(blobs[0]).addClass('active');
		
		blobwrap.css({
			width: (blobs.length * ($(blobs[0]).width() + 3))	+"px"	 
		});
		
		// Hook pagechange to update nav highlighting 
		$(this).bind('onBeforePageChange',function(a, index){
			$('.zine-nav-blob-outer').removeClass('active');
			$( $('.zine-nav-blob-outer')[index]).addClass('active');
		});
		
		
		// bind next/prev buttons
		this.bottomNav.find('.arrow-prev').bind('click',function(){ Zine.prev() });
		this.bottomNav.find('.arrow-next').bind('click',function(){ Zine.next() });
		
	}//
	
	
	
	
	// Alias of Transition
	Zine.goTo = function( targetIndex, type ){ 
		if(targetIndex > this.activePageIndex){
			type = "scroll_left";
		} else
		{
			type = "scroll_right";
		};
		this.transition(targetIndex,type);
	
	};//
	
	// Transition to next page
	Zine.next = function( type ){
		var nxt = this.activePageIndex+1;
		if(nxt >= this.Pages.length){ 
			if(this.loopNav){
				nxt = this.firstPage;
			} else {
				nxt = this.Pages.length - 1;
			};
		};
		this.transition(nxt, 'scroll_left');	
	}//
	
	// Transition to previous page
	Zine.prev = function( type ){
		var nxt = this.activePageIndex-1;
		if(nxt < 0){ 
			if(this.loopNav){
				nxt = this.Pages.length-1;
			} else {
				nxt = this.firstPage;
			};
		};
		this.transition(nxt, 'scroll_right');	
	}//
	
	// Transition to a new page
	Zine.transition = function( targetIndex, type )
	{
		if(targetIndex == this.activePageIndex){return;};
		if(this.transitionLock){return;};
		
		// Lock transitions until complete
		this.transitionLock = true;
		
		if(type==null){type="slide_off_left"};
		
		// Prepare target page
		$(this.Pages[targetIndex]).trigger('onPrepare');
		$(this).trigger('onBeforePageChange',targetIndex);
		
		this.transitions[type]( targetIndex );
		
	}//
	
	
	Zine.transitionComplete = function()
	{
		//Hide old current page
		$(this.Pages[this.activePageIndex]).addClass('hidden');
		
		// Grab index of old page (now hidden)
		var oldIndex = this.activePageIndex;
		
		// Set old target as new active
		this.activePageIndex = this.targetPageIndex;
		
		// Trigger event for page now active
		$(this.Pages[this.activePageIndex]).trigger('onActive');
		
		// Trigger event for page now inactive
		this.trigger('onInactive',oldIndex);

		
		// Unlock
		this.transitionLock = false;
	};
	
	
	
	
	Zine.trigger = function( event, targetIndex )
	{
		$(this.Pages[targetIndex]).find('.'+this.pageClass).trigger(event);
	};
	
	
	
	
	Zine.transitions = {
	// Transition to a new page
		slide_off_left: function( targetIndex )
			{
				var target  = Zine.Pages[targetIndex];
				var current = Zine.Pages[Zine.activePageIndex];
				
				// Set target index
				Zine.targetPageIndex = targetIndex;
				
				// Put target page behind current one
				$(current).before(target);
				
				// Ensure target is at 0,0
				$(target).css({left:"0px",top:"0px"});
				
				// un-hide the target
				$(target).removeClass("hidden");
				
				// slide current off to the left
				$(current).animate({ left: -Zine.width },{ duration: Zine.slideTime, complete: function(){
							Zine.transitionComplete();																   
						}});
			}//
	};
	
	
	