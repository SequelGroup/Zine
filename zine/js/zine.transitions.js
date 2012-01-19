// JavaScript Document

//========================================================================================================================================
//	Slide Off (right)
//========================================================================================================================================
		Zine.transitions.slide_off_right = function( targetIndex )
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
				$(current).animate({ left: Zine.width },{ duration: Zine.slideTime, complete: function(){
							Zine.transitionComplete();																   
						}});
			}//


//========================================================================================================================================
//	Slide Off (up)
//========================================================================================================================================
		Zine.transitions.slide_off_up = function( targetIndex )
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
				$(current).animate({ top: -Zine.height+"px" },{ duration: Zine.slideTime, complete: function(){
							Zine.transitionComplete();																   
						}});
			}//

//========================================================================================================================================
//	Slide Off (down)
//========================================================================================================================================
		Zine.transitions.slide_off_down = function( targetIndex )
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
				$(current).animate({ top: Zine.height+"px" },{ duration: Zine.slideTime, complete: function(){
							Zine.transitionComplete();																   
						}});
			}//


//========================================================================================================================================
//	Slide Over (left)
//========================================================================================================================================
Zine.transitions.slide_over_left = function( targetIndex )
	{
		var target = Zine.Pages[targetIndex];
		var current = Zine.Pages[Zine.activePageIndex];
		
		// Set target index
		Zine.targetPageIndex = targetIndex;
		
		// Put target page to the right of current
		$(target).css({top:"0px", left:Zine.width+"px"});
		
		
		// Make sure target is on top
		$(target).before(current);
		
		
		// Un-hide target
		$(target).removeClass('hidden');
		
		$(target).animate({left: "0px"},{duration:Zine.slideTime, complete:function(){
				Zine.transitionComplete();																	
			}});
		
		
	}//
	
//========================================================================================================================================
//	Slide Over (right)
//========================================================================================================================================
Zine.transitions.slide_over_right = function( targetIndex )
	{
		var target = Zine.Pages[targetIndex];
		var current = Zine.Pages[Zine.activePageIndex];
		
		// Set target index
		Zine.targetPageIndex = targetIndex;
		
		// Put target page to the left of current
		$(target).css({top:"0px", left:-Zine.width+"px"});
		
		// Make sure target is on top
		$(target).before(current);
		
		// Un-hide target
		$(target).removeClass('hidden');
		
		// Animate!
		$(target).animate({left: "0px"},{duration:Zine.slideTime, complete:function(){
				Zine.transitionComplete();																	
			}});
	}//
	
//========================================================================================================================================
//	Slide Over (down)
//========================================================================================================================================
Zine.transitions.slide_over_down = function( targetIndex )
	{
		var target = Zine.Pages[targetIndex];
		var current = Zine.Pages[Zine.activePageIndex];
		
		// Set target index
		Zine.targetPageIndex = targetIndex;
		
		// Put target page above of current
		$(target).css({top:-Zine.height+"px", left:"0px"});
		
		// Make sure target is on top
		$(target).before(current);
		
		// Un-hide target
		$(target).removeClass('hidden');
		
		// Animate!
		$(target).animate({top: "0px"},{duration:Zine.slideTime, complete:function(){
				Zine.transitionComplete();																	
			}});
	}//
	
//========================================================================================================================================
//	Slide Over (up)
//========================================================================================================================================
Zine.transitions.slide_over_up = function( targetIndex )
	{
		var target = Zine.Pages[targetIndex];
		var current = Zine.Pages[Zine.activePageIndex];
		
		// Set target index
		Zine.targetPageIndex = targetIndex;
		
		// Put target page above of current
		$(target).css({top:Zine.height+"px", left:"0px"});
		
		// Make sure target is on top
		$(target).before(current);
		
		// Un-hide target
		$(target).removeClass('hidden');
		
		// Animate!
		$(target).animate({top: "0px"},{duration:Zine.slideTime, complete:function(){
				Zine.transitionComplete();																	
			}});
	}//
	
	
//========================================================================================================================================
//	Fade
//========================================================================================================================================
Zine.transitions.fade = function( targetIndex )
	{
		var target = Zine.Pages[targetIndex];
		var current = Zine.Pages[Zine.activePageIndex];
		
		// Set target index
		Zine.targetPageIndex = targetIndex;
		
		// Make target transparent
		$(target).css({opacity:0});
		
		// Put target at 0,0
		$(target).css({top:"0px", left:"0px"});
		
		// Make sure target is on top
		$(target).before(current);
		
		// Un-hide target
		$(target).removeClass('hidden');
		
		// Animate!
		$(target).animate({opacity:1},{duration:Zine.slideTime, complete:function(){
				Zine.transitionComplete();																	
			}});
	}//
	


//========================================================================================================================================
//	Scroll (left)
//========================================================================================================================================
Zine.transitions.scroll_left = function( targetIndex )
	{
		var target = Zine.Pages[targetIndex];
		var current = Zine.Pages[Zine.activePageIndex];
		
		// Set target index
		Zine.targetPageIndex = targetIndex;
		
		// Put target page right of current
		$(target).css({top:"0px", left:Zine.width+"px"});
		
		// Make sure target is on top
		$(target).before(current);
		
		// Un-hide target
		$(target).removeClass('hidden');
		
		// Animate!
		$(target).animate({left: "0px"},{duration:Zine.slideTime, avoidTransforms:false, complete:function(){
																			
			}});
		$(current).animate({left: (-Zine.width)+"px"},{duration:Zine.slideTime, avoidTransforms:false, complete:function(){
				Zine.transitionComplete();																	
			}});
	}//


//========================================================================================================================================
//	Scroll (right)
//========================================================================================================================================
Zine.transitions.scroll_right = function( targetIndex )
	{
		var target = Zine.Pages[targetIndex];
		var current = Zine.Pages[Zine.activePageIndex];
		
		// Set target index
		Zine.targetPageIndex = targetIndex;
		
		// Put target page right of current
		$(target).css({top:"0px", left:-Zine.width+"px"});
		
		// Make sure target is on top
		$(target).before(current);
		
		// Un-hide target
		$(target).removeClass('hidden');
		
		// Animate!
		$(target).animate({left: "0px"},{duration:Zine.slideTime, complete:function(){
																			
			}});
		$(current).animate({left: (Zine.width)+"px"},{duration:Zine.slideTime, complete:function(){
				Zine.transitionComplete();																	
			}});
	}//


//========================================================================================================================================
//	Scroll (up)
//========================================================================================================================================
Zine.transitions.scroll_up = function( targetIndex )
	{
		var target = Zine.Pages[targetIndex];
		var current = Zine.Pages[Zine.activePageIndex];
		
		// Set target index
		Zine.targetPageIndex = targetIndex;
		
		// Put target page below of current
		$(target).css({top:Zine.height+"px", left:"0px"});
		
		// Make sure target is on top
		$(target).before(current);
		
		// Un-hide target
		$(target).removeClass('hidden');
		
		// Animate!
		$(target).animate({top: "0px"},{duration:Zine.slideTime, complete:function(){
																			
			}});
		$(current).animate({top: (-Zine.height)+"px"},{duration:Zine.slideTime, complete:function(){
				Zine.transitionComplete();																	
			}});
	}//


//========================================================================================================================================
//	Scroll (down)
//========================================================================================================================================
Zine.transitions.scroll_down = function( targetIndex )
	{
		var target = Zine.Pages[targetIndex];
		var current = Zine.Pages[Zine.activePageIndex];
		
		// Set target index
		Zine.targetPageIndex = targetIndex;
		
		// Put target page below of current
		$(target).css({top:-Zine.height+"px", left:"0px"});
		
		// Make sure target is on top
		$(target).before(current);
		
		// Un-hide target
		$(target).removeClass('hidden');
		
		// Animate!
		$(target).animate({top: "0px"},{duration:Zine.slideTime, complete:function(){
																			
			}});
		$(current).animate({top: (Zine.height)+"px"},{duration:Zine.slideTime, complete:function(){
				Zine.transitionComplete();																	
			}});
	}//


//========================================================================================================================================
//========================================================================================================================================
	
	
	
	
	