$(function() {
    
    $(".testimonials").owlCarousel({
        slideSpeed : 500,
        paginationSpeed : 500,
        singleItem:true   
    });
    
    
    
    
    var portfolio = $('.portfolio_wrapper'),
        portfolio_item_selector = '.portfolio-item',
        transitionDuration = '0.5',
        filterButtons = $('.portfolio_filter_buttons > button'),
        currentCategory = '*';
    
    if(portfolio.length > 0) {
        portfolio.imagesLoaded( function() {
            setTimeout(function(){
                 portfolio.isotope({
                    itemSelector: portfolio_item_selector,
        			resizable : true,
        			layoutMode: 'fitRows'
        		}).bind("resize.rainbows", function(){
        			portfolio.isotope('reLayout');
        		});
            },1000);
        });
        
        filterButtons.on( 'click', function() {
            var _this = $(this);
            var category = _this.attr('data-filter');
            
            if(currentCategory != category){
                filterButtons.removeClass('current-category');
                _this.addClass('current-category');
                currentCategory = category;
                if(category != '*') category = '.'+category;
                portfolio.isotope({ filter: category});
            }
        });
        
        
        $('.portfolio_wrapper .portfolio-item .thumbnail').magnificPopup({
    		delegate: 'a.enlarge-icon',
    		type: 'image',
    		removalDelay: 500,
    		mainClass: 'mfp-zoom-in',
    		callbacks: {
    			beforeOpen: function() {
    				// just a hack that adds mfp-anim class to markup 
    				this.st.image.markup = this.st.image.markup.replace('mfp-figure', 'mfp-figure mfp-with-anim');
    			},
                open: function() {
                  not_resizes = true;
                },
                close: function() {
                  not_resizes = false;
                }
    		},
    		gallery: {enabled:true}
    	});
    } 

    var _window = $(window),
        contentHolder = $('.content-holder > .container'),
        FWObjects = $('.fullwidth'),
        not_resizes = false;
  
    if(FWObjects.length > 0) {
        FWObjectsResize();
        _window.resize(FWObjectsResize);
    }
    
    function FWObjectsResize(){
        if(!not_resizes){
            var _windowWidth = _window.width(),
                contentHolderWidth = contentHolder.width();
             
            FWObjects.css({width:_windowWidth + 5, left:-(_windowWidth-contentHolderWidth)/2});
        }
    }
    
    setTimeout(function(){
        $('section.parallax_section').css({visibility:"visible", opacity:0}).stop().animate({opacity:1}, 800);   
    },10);
     
    
    var MSIE9 = false;
    if($.browser.msie){
         if(parseInt($.browser.version) <= 9){
            MSIE9 = true;
         }
    }
    
    $('.skills > .skills-item').not('.skills-item-with-appearance').each(function(){
		var element = $(this),
            skill_progress = element.find('>.skill-progress'),
		    skill_level = parseFloat(skill_progress.data("level")),
			base_color = skill_progress.data("chart-bg-color"),
			skill_color = skill_progress.data("chart-progress-color");
            
        if(!MSIE9){   
            var doughnutOption = {
    			animationSteps: 0,
    			segmentShowStroke : false,
    			percentageInnerCutout  : 86,
    			segmentStrokeColor  : base_color,
    			animationEasing: "easeOutExpo"
    		}
    
    		var doughnutData = [
    			{
    				value: skill_level,
    				color: skill_color
    			},
    			{
    				value : 100-skill_level,
    				color : base_color
    			}
    		];
            
    		var ctx = $(".skill-canvas", skill_progress).get(0).getContext("2d");
    		var myDoughnut = new Chart(ctx).Doughnut(doughnutData, doughnutOption);
        }
    })
    
    var windowHeight = window.innerHeight,
        skillsProgressbars = $('.skills-item-with-appearance'),
        appearanceObject = $('.experience-item-with-appearance, .education-item-with-appearance');
        
    _window.on('resize', onWindowResize);
    
    function onWindowResize()
    {
        windowHeight = window.innerHeight;
    }
        
    if(!device.mobile() && !device.tablet() && !MSIE9){
        skillsProgressbars.each( function()
        {
            var element = $(this),
                skill_progress = element.find('>.skill-progress'),
    			skill_level = parseFloat(skill_progress.data("level")),
    			base_color = skill_progress.data("chart-bg-color"),
    			skill_color = skill_progress.data("chart-progress-color"),
                skill_number = skill_progress.find('.skill-number'),
                index = element.index(),
                delayOffset = 150;
            
            skill_number.hide();
            
            inViewport(element, showProgressbars);
            
            function showProgressbars(){
                var duration = 800,
                    delay = 200 + (index*delayOffset);
                
                setTimeout(function()
                {
        			var doughnutOption = {
        				animationSteps: 50,
        				segmentShowStroke : false,
        				percentageInnerCutout  : 86,
        				segmentStrokeColor  : base_color,
        				animationEasing: "easeOutExpo"
        			}
            
            		var doughnutData = [
            			{
            				value: skill_level,
            				color: skill_color
            			},
            			{
            				value : 100-skill_level,
            				color : base_color
            			}
            		];
                    
            		var ctx = $(".skill-canvas", skill_progress).get(0).getContext("2d");
            		var myDoughnut = new Chart(ctx).Doughnut(doughnutData, doughnutOption);
            
                    skill_number.show(duration);
                    skill_number.CountUpCircle({
                        duration: duration,
                        opacity_anim: false,
                        step_divider: 5
                    });
                    
                    element.removeClass('object-hidden');
                    
                }, delay);
            }
        });  
        appearanceObject.each( function()
        {
            var element = $(this);
    
            inViewport(element, showProgressbars);
            
            function showProgressbars(){
                var delay = 100;
                
                setTimeout(function()
                {
                    element.removeClass('object-hidden');
                }, delay);
            }
        }); 
    } else {
        appearanceObject.each( function()
        {
            var element = $(this);
            element.removeClass('object-hidden');
        });
        skillsProgressbars.each( function()
        {
            var element = $(this);
            element.removeClass('object-hidden');
            element.find('.skill-progress').addClass('inline-progress');
        }); 
    }
    
    function inViewport(element, callbackFn)
    {
        _window.on('scroll', onWindowScroll);
        onWindowScroll();
        
        function onWindowScroll()
        {
            var element_top = element.offset().top,
                buffer = windowHeight/4;
            
            bottom_of_window = $(window).scrollTop() + windowHeight;
            if( bottom_of_window > element_top + buffer) {
                _window.off('scroll', onWindowScroll);
                callbackFn();
            }
        }
    }
});