/**
 * @create by xxx on 2018-xx-xx
 * @description xx
 */
(function(vue, $) {

	vue.directive('jq-draggable', {
		bind : function(el, bind, vNode) {
			var options = bind.value;
			var zIndex, startXY;
			$(el)
			.draggable(options)
			.draggable({
				start : function(event, ui) {
                    zIndex = $(options.helper ? ui.helper : this).css('z-index');
                    $(options.helper ? ui.helper : this).css('z-index', 9999);
                    //startXY = angular.element(this)[dragSettings.containment || 'offset']();
				    if(options && options.onStart && (typeof(options.onStart) == 'function')) {
				    	options.onStart(event, ui);
				    }
				},
				drag : function(event, ui) {
					$(options.helper ? ui.helper : this).css('z-index', zIndex);
					if(options && options.onDrag && (typeof(options.onDrag) == 'function')) {
                        options.onDrag(event, ui);
                    }
				},
				stop : function(event, ui) {
					if(options && options.onStop && (typeof(options.onStop) == 'function')) {
                        options.onStop(event, ui);
                    }
				}
			});
			//$(el).css({'position' : 'absolute'});
		}
	});

	vue.directive('jq-droppable', {
		bind : function(el, bind, vNode) {
			var options = bind.value;
			$(el).droppable({
			     over: function(event, ui){
			     	if(options && options.onOver && (typeof(options.onOver) == 'function')) {
                        options.onOver(event, ui);
                    }
			     },
			     drop: function(event, ui) {
			     	if(options && options.onDrop && (typeof(options.onDrop) == 'function')) {
                        options.onDrop(event, ui);
                    }
			     },
			     out: function(event, ui) {
			     	if(options && options.onOut && (typeof(options.onOut) == 'function')) {
                        options.onOut(event, ui);
                    }
			     }
			});
		}
	});

})(Vue, yufp.$);