!function(n,i){n.directive("jq-draggable",{bind:function(n,o,t){var e,r=o.value;i(n).draggable(r).draggable({start:function(n,o){e=i(r.helper?o.helper:this).css("z-index"),i(r.helper?o.helper:this).css("z-index",9999),r&&r.onStart&&"function"==typeof r.onStart&&r.onStart(n,o)},drag:function(n,o){i(r.helper?o.helper:this).css("z-index",e),r&&r.onDrag&&"function"==typeof r.onDrag&&r.onDrag(n,o)},stop:function(n,o){r&&r.onStop&&"function"==typeof r.onStop&&r.onStop(n,o)}})}}),n.directive("jq-droppable",{bind:function(n,o,t){var e=o.value;i(n).droppable({over:function(n,o){e&&e.onOver&&"function"==typeof e.onOver&&e.onOver(n,o)},drop:function(n,o){e&&e.onDrop&&"function"==typeof e.onDrop&&e.onDrop(n,o)},out:function(n,o){e&&e.onOut&&"function"==typeof e.onOut&&e.onOut(n,o)}})}})}(Vue,yufp.$);