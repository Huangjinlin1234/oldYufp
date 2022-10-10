/**
 * @create by xxx on 2018-xx-xx
 * @description xx
 */
define(	[
		'./libs/jquery-ui/jquery-ui-1.10.3.custom.min.js',
		'./libs/editor/libs/prototype-1.5.1.js',
		'./libs/editor/libs/jquery.autogrow-textarea.js',
		'./libs/editor/libs/path_parser.js',
		'./libs/editor/editor/oryx.debug.js',
		'./libs/editor/editor/i18n/translation_en_us.js',
		'./libs/editor/editor/i18n/translation_signavio_en_us.js',
		'./libs/editor/eventbus.js',
		'./libs/editor/createcommand.js',
		'./libs/editor/toolbar.js',
		'./libs/editor/toolbar-default-actions.js',
		'./custom/plugins/yufp.directive.js',
		// './libs/editor/i18n/en.json',
		'./libs/editor/editor/css/editor.css?v=2',
		'./libs/bootstrap_3.1.1/css/bootstrap.min.css',
		'./libs/editor/styles/style-common.css',
		'./libs/editor/styles/style-editor.css',
		'./libs/editor/styles/style.css'], function(require, exports) {

	// page加载完成后调用ready方法
	exports.ready = function(hashCode, data, cite) {

		var $rootScope = {};
		$rootScope.editorFactory = yufp.$.Deferred();
		$rootScope.forceSelectionRefresh = false;
		$rootScope.ignoreChanges = false; // by default never ignore
											// changes
		$rootScope.staticIncludeVersion = Date.now();
		
		var toolbarItems = KISBPM.TOOLBAR_CONFIG.items;
//        $scope.items = [];
//        for (var i = 0; i < toolbarItems.length; i++)  {
//            if ($rootScope.modelData.model.modelType === 'form') {
//                if (!toolbarItems[i].disableInForm) {
//                    $scope.items.push(toolbarItems[i]);
//                }
//            } else {
//                $scope.items.push(toolbarItems[i]);
//            }
//        }
		
		var executeFunctionByName = function(functionName, context /*, args */) {
            var args = Array.prototype.slice.call(arguments).splice(2);
            var namespaces = functionName.split(".");
            var func = namespaces.pop();
            for(var i = 0; i < namespaces.length; i++) {
                context = context[namespaces[i]];
            }
            console.log(context[func]);
            console.log(args);
            return context[func].apply(this, args);
        };

		var vm = yufp.custom.vue({
					el : cite.el,
					data : function() {
						return {
							height: 460,
							deleteTitle : "",// BUTTON.ACTION.DELETE.TOOLTIP,
							morphTitle : "",// BUTTON.ACTION.MORPH.TOOLTIP
							quickMenuItems : null,
							toolBarItems: KISBPM.TOOLBAR_CONFIG.items,

							draggableOptions : {
								onStart : function(event, ui) {
									$rootScope
											.startDragCallbackQuickMenu(event, ui);
								},
								onDrag : function(event, ui) {
									$rootScope
											.dragCallbackQuickMenu(event, ui);
								}
							},
							droppableOptions : {
								onDrop : function(event, ui) {
									$rootScope.dropCallback(event, ui);
								},
								onOver : function(event, ui) {
								    $rootScope.overCallback(event, ui);
								},
								onOut : function(event, ui) {
									$rootScope.outCallback(event, ui);
								}
							}
						}
					},
					methods : {
						deleteShapeFn : function() {
							if ($rootScope.oryxEditPlugin === undefined || $rootScope.oryxEditPlugin === null) {
                                $rootScope.oryxEditPlugin = new ORYX.Plugins.Edit($rootScope.editor);
                            }
                            $rootScope.oryxEditPlugin.editDelete();
						},

						morphShapeFn : function() {
						},
						quickAddItem : function(id) {
							$rootScope.quickAddItem(id);
						},
						toolbarButtonClicked : function(buttonIndex) {
							// Default behaviour
                            var buttonClicked = this.toolBarItems[buttonIndex];
                            var services = { '$scope' : $rootScope, '$rootScope' : $rootScope};
                            executeFunctionByName(buttonClicked.action, window, services);
                
                            // Other events
                            var event = {
                                type : KISBPM.eventBus.EVENT_TYPE_TOOLBAR_BUTTON_CLICKED,
                                toolbarItem : buttonClicked
                            };
                            KISBPM.eventBus.dispatch(event.type, event);
						}
					}
				});

		$rootScope.dropCallback = function(event, ui) {

			$rootScope.editor.handleEvents({
						type : ORYX.CONFIG.EVENT_HIGHLIGHT_HIDE,
						highlightId : "shapeRepo.attached"
					});
			$rootScope.editor.handleEvents({
						type : ORYX.CONFIG.EVENT_HIGHLIGHT_HIDE,
						highlightId : "shapeRepo.added"
					});

			$rootScope.editor.handleEvents({
						type : ORYX.CONFIG.EVENT_HIGHLIGHT_HIDE,
						highlightId : "shapeMenu"
					});

			KISBPM.eventBus
					.dispatch(KISBPM.eventBus.EVENT_TYPE_HIDE_SHAPE_BUTTONS);

			if ($rootScope.dragCanContain) {

				var item = $rootScope
						.getStencilItemById(ui.draggable[0].id);

				var pos = {
					x : event.pageX,
					y : event.pageY
				};

				var additionalIEZoom = 1;
				if (!isNaN(screen.logicalXDPI)
						&& !isNaN(screen.systemXDPI)) {
					var ua = navigator.userAgent;
					if (ua.indexOf('MSIE') >= 0) {
						// IE 10 and below
						var zoom = Math
								.round((screen.deviceXDPI / screen.logicalXDPI)
										* 100);
						if (zoom !== 100) {
							additionalIEZoom = zoom / 100;
						}
					}
				}

				var screenCTM = $rootScope.editor.getCanvas().node
						.getScreenCTM();

				// Correcting the UpperLeft-Offset
				pos.x -= (screenCTM.e / additionalIEZoom);
				pos.y -= (screenCTM.f / additionalIEZoom);
				// Correcting the Zoom-Factor
				pos.x /= screenCTM.a;
				pos.y /= screenCTM.d;

				// Correcting the ScrollOffset
				pos.x -= document.documentElement.scrollLeft;
				pos.y -= document.documentElement.scrollTop;

				var parentAbs = $rootScope.dragCurrentParent
						.absoluteXY();
				pos.x -= parentAbs.x;
				pos.y -= parentAbs.y;

				var containedStencil = undefined;
				var stencilSets = $rootScope.editor.getStencilSets()
						.values();
				for (var i = 0; i < stencilSets.length; i++) {
					var stencilSet = stencilSets[i];
					var nodes = stencilSet.nodes();
					for (var j = 0; j < nodes.length; j++) {
						if (nodes[j].idWithoutNs() === ui.draggable[0].id) {
							containedStencil = nodes[j];
							break;
						}
					}

					if (!containedStencil) {
						var edges = stencilSet.edges();
						for (var j = 0; j < edges.length; j++) {
							if (edges[j].idWithoutNs() === ui.draggable[0].id) {
								containedStencil = edges[j];
								break;
							}
						}
					}
				}

				if (!containedStencil)
					return;

				if ($rootScope.quickMenu) {
					var shapes = $rootScope.editor.getSelection();
					if (shapes && shapes.length == 1) {
						var currentSelectedShape = shapes.first();

						var option = {};
						option.type = currentSelectedShape.getStencil()
								.namespace()
								+ ui.draggable[0].id;
						option.namespace = currentSelectedShape
								.getStencil().namespace();
						option.connectedShape = currentSelectedShape;
						option.parent = $rootScope.dragCurrentParent;
						option.containedStencil = containedStencil;

						// If the ctrl key is not pressed,
						// snapp the new shape to the center
						// if it is near to the center of the other
						// shape
						if (!event.ctrlKey) {
							// Get the center of the shape
							var cShape = currentSelectedShape.bounds
									.center();
							// Snapp +-20 Pixel horizontal to the center
							if (20 > Math.abs(cShape.x - pos.x)) {
								pos.x = cShape.x;
							}
							// Snapp +-20 Pixel vertical to the center
							if (20 > Math.abs(cShape.y - pos.y)) {
								pos.y = cShape.y;
							}
						}

						option.position = pos;

						if (containedStencil.idWithoutNs() !== 'SequenceFlow'
								&& containedStencil.idWithoutNs() !== 'Association'
								&& containedStencil.idWithoutNs() !== 'MessageFlow'
								&& containedStencil.idWithoutNs() !== 'DataAssociation') {
							var args = {
								sourceShape : currentSelectedShape,
								targetStencil : containedStencil
							};
							var targetStencil = $scope.editor
									.getRules().connectMorph(args);
							if (!targetStencil) {
								return;
							}// Check if there can be a target shape
							option.connectingType = targetStencil.id();
						}

						var command = new KISBPM.CreateCommand(option,
								$rootScope.dropTargetElement, pos,
								$rootScope.editor);

						$rootScope.editor.executeCommands([command]);
					}
				} else {
					var canAttach = false;
					if (containedStencil.idWithoutNs() === 'BoundaryErrorEvent'
							|| containedStencil.idWithoutNs() === 'BoundaryTimerEvent'
							|| containedStencil.idWithoutNs() === 'BoundarySignalEvent'
							|| containedStencil.idWithoutNs() === 'BoundaryMessageEvent'
							|| containedStencil.idWithoutNs() === 'BoundaryCancelEvent'
							|| containedStencil.idWithoutNs() === 'BoundaryCompensationEvent') {
						// Modify position, otherwise boundary event
						// will get position related to left corner of
						// the canvas instead of the container
						pos = $rootScope.editor.eventCoordinates(event);
						canAttach = true;
					}

					var option = {};
					option['type'] = $rootScope.modelData.model.stencilset.namespace
							+ item.id;
					option['namespace'] = $rootScope.modelData.model.stencilset.namespace;
					option['position'] = pos;
					option['parent'] = $rootScope.dragCurrentParent;

					var commandClass = ORYX.Core.Command.extend({
						construct : function(option, dockedShape,
								canAttach, position, facade) {
							this.option = option;
							this.docker = null;
							this.dockedShape = dockedShape;
							this.dockedShapeParent = dockedShape.parent
									|| facade.getCanvas();
							this.position = position;
							this.facade = facade;
							this.selection = this.facade.getSelection();
							this.shape = null;
							this.parent = null;
							this.canAttach = canAttach;
						},
						execute : function() {
							if (!this.shape) {
								this.shape = this.facade
										.createShape(option);
								this.parent = this.shape.parent;
							} else if (this.parent) {
								this.parent.add(this.shape);
							}

							if (this.canAttach && this.shape.dockers
									&& this.shape.dockers.length) {
								this.docker = this.shape.dockers[0];

								this.dockedShapeParent
										.add(this.docker.parent);

								// Set the Docker to the new Shape
								this.docker.setDockedShape(undefined);
								this.docker.bounds
										.centerMoveTo(this.position);
								if (this.dockedShape !== this.facade
										.getCanvas()) {
									this.docker
											.setDockedShape(this.dockedShape);
								}
								this.facade
										.setSelection([this.docker.parent]);
							}

							this.facade.getCanvas().update();
							this.facade.updateSelection();

						},
						rollback : function() {
							if (this.shape) {
								this.facade.setSelection(this.selection
										.without(this.shape));
								this.facade.deleteShape(this.shape);
							}
							if (this.canAttach && this.docker) {
								this.docker.setDockedShape(undefined);
							}
							this.facade.getCanvas().update();
							this.facade.updateSelection();

						}
					});

					// Update canvas
					var command = new commandClass(option,
							$rootScope.dragCurrentParent, canAttach, pos,
							$rootScope.editor);
					$rootScope.editor.executeCommands([command]);

					// Fire event to all who want to know about this
					var dropEvent = {
						type : KISBPM.eventBus.EVENT_TYPE_ITEM_DROPPED,
						droppedItem : item,
						position : pos
					};
					KISBPM.eventBus.dispatch(dropEvent.type, dropEvent);
				}
			}

			$rootScope.dragCurrentParent = undefined;
			$rootScope.dragCurrentParentId = undefined;
			$rootScope.dragCurrentParentStencil = undefined;
			$rootScope.dragCanContain = undefined;
			$rootScope.quickMenu = undefined;
			$rootScope.dropTargetElement = undefined;
		};
		
		$rootScope.overCallback = function (event, ui) {
            $rootScope.dragModeOver = true;
        };

        $rootScope.outCallback = function (event, ui) {
            $rootScope.dragModeOver = false;
        };

		$rootScope.startDragCallbackQuickMenu = function(event, ui) {
			$rootScope.dragModeOver = false;
			$rootScope.quickMenu = true;
		};

		$rootScope.dragCallbackQuickMenu = function(event, ui) {
			if ($rootScope.dragModeOver != false) {
				var coord = $rootScope.editor.eventCoordinatesXY(
						event.pageX, event.pageY);

				var additionalIEZoom = 1;
				if (!isNaN(screen.logicalXDPI)
						&& !isNaN(screen.systemXDPI)) {
					var ua = navigator.userAgent;
					if (ua.indexOf('MSIE') >= 0) {
						// IE 10 and below
						var zoom = Math
								.round((screen.deviceXDPI / screen.logicalXDPI)
										* 100);
						if (zoom !== 100) {
							additionalIEZoom = zoom / 100
						}
					}
				}

				if (additionalIEZoom !== 1) {
					coord.x = coord.x / additionalIEZoom;
					coord.y = coord.y / additionalIEZoom;
				}

				var aShapes = $rootScope.editor.getCanvas()
						.getAbstractShapesAtPosition(coord);

				if (aShapes.length <= 0) {
					if (event.helper) {
						$scope.dragCanContain = false;
						return false;
					}
				}

				if (aShapes[0] instanceof ORYX.Core.Canvas) {
					$rootScope.editor.getCanvas()
							.setHightlightStateBasedOnX(coord.x);
				}

				var stencil = undefined;
				var stencilSets = $rootScope.editor.getStencilSets()
						.values();
						
				for (var i = 0; i < stencilSets.length; i++) {
					var stencilSet = stencilSets[i];
					var nodes = stencilSet.nodes();
					for (var j = 0; j < nodes.length; j++) {
						if (nodes[j].idWithoutNs() === event.target.id) {
							stencil = nodes[j];
							break;
						}
					}

					if (!stencil) {
						var edges = stencilSet.edges();
						for (var j = 0; j < edges.length; j++) {
							if (edges[j].idWithoutNs() === event.target.id) {
								stencil = edges[j];
								break;
							}
						}
					}
				}

				var candidate = aShapes.last();

				var isValid = false;
				if (stencil.type() === "node") {
					// check containment rules
					var canContain = $rootScope.editor.getRules()
							.canContain({
										containingShape : candidate,
										containedStencil : stencil
									});

					var parentCandidate = aShapes.reverse().find(
							function(candidate) {
								return (candidate instanceof ORYX.Core.Canvas
										|| candidate instanceof ORYX.Core.Node || candidate instanceof ORYX.Core.Edge);
							});

					if (!parentCandidate) {
						$rootScope.dragCanContain = false;
						return false;
					}

					$rootScope.dragCurrentParent = parentCandidate;
					$rootScope.dragCurrentParentId = parentCandidate.id;
					$rootScope.dragCurrentParentStencil = parentCandidate
							.getStencil().id();
					$rootScope.dragCanContain = canContain;
					$rootScope.dropTargetElement = parentCandidate;
					isValid = canContain;

				} else { // Edge

					var shapes = $rootScope.editor.getSelection();
					if (shapes && shapes.length == 1) {
						var currentSelectedShape = shapes.first();
						var curCan = candidate;
						var canConnect = false;

						var targetStencil = $rootScope
								.getStencilItemById(curCan.getStencil()
										.idWithoutNs());
						if (targetStencil) {
							var associationConnect = false;
							if (stencil.idWithoutNs() === 'Association'
									&& (curCan.getStencil()
											.idWithoutNs() === 'TextAnnotation' || curCan
											.getStencil().idWithoutNs() === 'BoundaryCompensationEvent')) {
								associationConnect = true;
							} else if (stencil.idWithoutNs() === 'DataAssociation'
									&& curCan.getStencil()
											.idWithoutNs() === 'DataStore') {
								associationConnect = true;
							}

							if (targetStencil.canConnectTo
									|| associationConnect) {
								while (!canConnect
										&& curCan
										&& !(curCan instanceof ORYX.Core.Canvas)) {
									candidate = curCan;
									// check connection rules
									canConnect = $rootScope.editor
											.getRules().canConnect({
												sourceShape : currentSelectedShape,
												edgeStencil : stencil,
												targetShape : curCan
											});
									curCan = curCan.parent;
								}
							}
						}
						var parentCandidate = $rootScope.editor.getCanvas();

						isValid = canConnect;
						$rootScope.dragCurrentParent = parentCandidate;
						$rootScope.dragCurrentParentId = parentCandidate.id;
						$rootScope.dragCurrentParentStencil = parentCandidate
								.getStencil().id();
						$rootScope.dragCanContain = canConnect;
						$rootScope.dropTargetElement = candidate;
					}

				}

				$rootScope.editor.handleEvents({
							type : ORYX.CONFIG.EVENT_HIGHLIGHT_SHOW,
							highlightId : 'shapeMenu',
							elements : [candidate],
							color : isValid
									? ORYX.CONFIG.SELECTION_VALID_COLOR
									: ORYX.CONFIG.SELECTION_INVALID_COLOR
						});
			}
		};

		/**
		 * Initialize the event bus: couple all Oryx events with a
		 * dispatch of the event of the event bus. This way, it gets
		 * much easier to attach custom logic to any event.
		 */

		/* Helper method to fetch model from server (always needed) */
		function fetchModel() {

			var modelUrl;
			// if ($routeParams.modelId) {
			// modelUrl = KISBPM.URL.getModel($routeParams.modelId);
			// } else {
			// modelUrl = KISBPM.URL.newModelInfo();
			// }

			var dataStr = '{"modelId":"4d9bc274-84f0-48d6-b3e4-badf21776a7d","name":"dd","key":"dd","description":"","lastUpdated":"2018-05-26T23:38:11.501+0000","lastUpdatedBy":"admin","model":{"id":"canvas","resourceId":"canvas","stencilset":{"namespace":"http://b3mn.org/stencilset/bpmn2.0#"},"properties":{"process_id":"dd","name":"dd"},"childShapes":[{"bounds":{"lowerRight":{"x":130,"y":193},"upperLeft":{"x":100,"y":163}},"childShapes":[],"dockers":[],"outgoing":[],"resourceId":"startEvent1","stencil":{"id":"StartNoneEvent"}}],"modelType":"model"}}';
			var data = JSON.parse(dataStr);
			$rootScope.editor = new ORYX.Editor(data);
			$rootScope.modelData = data;
			// $http({method: 'GET', url: modelUrl}).
			// success(function (data, status, headers, config) {
			// $rootScope.editor = new ORYX.Editor(data);
			// $rootScope.modelData = angular.fromJson(data);
			// $rootScope.editorFactory.resolve();
			// }).
			// error(function (data, status, headers, config) {
			// $location.path("/processes/");
			// });
		}

		function initScrollHandling() {
			var canvasSection = yufp.$('#canvasSection');
			canvasSection.scroll(function() {

				// Hides the resizer and quick menu items during
				// scrolling

				var selectedElements = $rootScope.editor.selection;
				var subSelectionElements = $rootScope.editor._subSelection;

				$rootScope.selectedElements = selectedElements;
				$rootScope.subSelectionElements = subSelectionElements;
				if (selectedElements && selectedElements.length > 0) {
					$rootScope.selectedElementBeforeScrolling = selectedElements[0];
				}

				jQuery('.Oryx_button').each(function(i, obj) {
					$rootScope.orginalOryxButtonStyle = obj.style.display;
					obj.style.display = 'none';
				});
				jQuery('.resizer_southeast').each(function(i, obj) {
					$rootScope.orginalResizerSEStyle = obj.style.display;
					obj.style.display = 'none';
				});
				jQuery('.resizer_northwest').each(function(i, obj) {
					$rootScope.orginalResizerNWStyle = obj.style.display;
					obj.style.display = 'none';
				});
				$rootScope.editor.handleEvents({
							type : ORYX.CONFIG.EVENT_CANVAS_SCROLL
						});
			});

			canvasSection.scrollStopped(function() {

						// Puts the quick menu items and resizer back
						// when scroll is stopped.

						$rootScope.editor.setSelection([]); // needed
															// cause it
															// checks
															// for
															// element
															// changes
															// and does
															// nothing
															// if the
															// elements
															// are the
															// same
						$rootScope.editor.setSelection(
								$rootScope.selectedElements,
								$rootScope.subSelectionElements);
						$rootScope.selectedElements = undefined;
						$rootScope.subSelectionElements = undefined;

						function handleDisplayProperty(obj) {
							if (jQuery(obj).position().top > 0) {
								obj.style.display = 'block';
							} else {
								obj.style.display = 'none';
							}
						}

						jQuery('.Oryx_button').each(function(i, obj) {
									handleDisplayProperty(obj);
								});
						jQuery('.resizer_southeast').each(
								function(i, obj) {
									handleDisplayProperty(obj);
								});
						jQuery('.resizer_northwest').each(
								function(i, obj) {
									handleDisplayProperty(obj);
								});

					});
		}

		/**
		 * Initialize the Oryx Editor when the content has been loaded
		 */
		if (true) {

			ORYX._loadPlugins();

			fetchModel();

			/**
			 * A 'safer' apply that avoids concurrent updates (which
			 * $apply allows).
			 */
			$rootScope.safeApply = function(fn) {
				fn()
				// if (this.$root) {
				// var phase = this.$root.$$phase;
				// if(phase == '$apply' || phase == '$digest') {
				// if(fn && (typeof(fn) === 'function')) {
				// fn();
				// }
				// } else {
				// this.$apply(fn);
				// }
				//                    
				// } else {
				// this.$apply(fn);
				// }
			};

			/**
			 * Initialize the event bus: couple all Oryx events with a
			 * dispatch of the event of the event bus. This way, it gets
			 * much easier to attach custom logic to any event.
			 */

			$rootScope.editorFactory.then(function() {

				$rootScope.formItems = undefined;

				KISBPM.eventBus.editor = $rootScope.editor;

				var eventMappings = [{
					oryxType : ORYX.CONFIG.EVENT_SELECTION_CHANGED,
					kisBpmType : KISBPM.eventBus.EVENT_TYPE_SELECTION_CHANGE
				}, {
					oryxType : ORYX.CONFIG.EVENT_DBLCLICK,
					kisBpmType : KISBPM.eventBus.EVENT_TYPE_DOUBLE_CLICK
				}, {
					oryxType : ORYX.CONFIG.EVENT_MOUSEOUT,
					kisBpmType : KISBPM.eventBus.EVENT_TYPE_MOUSE_OUT
				}, {
					oryxType : ORYX.CONFIG.EVENT_MOUSEOVER,
					kisBpmType : KISBPM.eventBus.EVENT_TYPE_MOUSE_OVER
				}

				];

				eventMappings.forEach(function(eventMapping) {
					$rootScope.editor.registerOnEvent(
							eventMapping.oryxType, function(event) {
								KISBPM.eventBus.dispatch(
										eventMapping.kisBpmType, event);
							});
				});

				// The Oryx canvas is ready (we know since we're in this
				// promise callback) and the
				// event bus is ready. The editor is now ready for use
				KISBPM.eventBus.dispatch(
						KISBPM.eventBus.EVENT_TYPE_EDITOR_READY, {
							type : KISBPM.eventBus.EVENT_TYPE_EDITOR_READY
						});

				// Show getting started if this is the first time
				// (boolean true for use local storage)
				ACTIVITI_EDITOR_TOUR.gettingStarted($scope, $translate,
						$q, true);

			});

			// Hook in resizing of main panels when window resizes
			// TODO: perhaps move to a separate JS-file?
			yufp.$(window).resize(function() {

				// Calculate the offset based on the bottom of the
				// module header
				var offset = jQuery("#editor-header").offset();
				var propSectionHeight = jQuery('#propertySection')
						.height();
				var canvas = jQuery('#canvasSection');
				var mainHeader = jQuery('#main-header');

				if (offset == undefined || offset === null
						|| propSectionHeight === undefined
						|| propSectionHeight === null
						|| canvas === undefined || canvas === null
						|| mainHeader === null) {
					return;
				}

				if ($rootScope.editor) {
					var selectedElements = $rootScope.editor.selection;
					var subSelectionElements = $rootScope.editor._subSelection;

					$scope.selectedElements = selectedElements;
					$scope.subSelectionElements = subSelectionElements;
					if (selectedElements && selectedElements.length > 0) {
						$rootScope.selectedElementBeforeScrolling = selectedElements[0];

						$rootScope.editor.setSelection([]); // needed
															// cause it
															// checks
															// for
															// element
															// changes
															// and does
															// nothing
															// if the
															// elements
															// are the
															// same
						$rootScope.editor.setSelection(
								$scope.selectedElements,
								$scope.subSelectionElements);
						$scope.selectedElements = undefined;
						$scope.subSelectionElements = undefined;
					}
				}

				var totalAvailable = jQuery(window).height()
						- offset.top - mainHeader.height() - 21;
				canvas.height(totalAvailable - propSectionHeight);
				jQuery('#paletteSection').height(totalAvailable);

				// Update positions of the resize-markers, according to
				// the canvas

				var actualCanvas = null;
				if (canvas && canvas[0].children[1]) {
					actualCanvas = canvas[0].children[1];
				}

				var canvasTop = canvas.position().top;
				var canvasLeft = canvas.position().left;
				var canvasHeight = canvas[0].clientHeight;
				var canvasWidth = canvas[0].clientWidth;
				var iconCenterOffset = 8;
				var widthDiff = 0;

				var actualWidth = 0;
				if (actualCanvas) {
					// In some browsers, the SVG-element clientwidth
					// isn't available, so we revert to the parent
					actualWidth = actualCanvas.clientWidth
							|| actualCanvas.parentNode.clientWidth;
				}

				if (actualWidth < canvas[0].clientWidth) {
					widthDiff = actualWidth - canvas[0].clientWidth;
					// In case the canvas is smaller than the actual
					// viewport, the resizers should be moved
					canvasLeft -= widthDiff / 2;
					canvasWidth += widthDiff;
				}

				var iconWidth = 17;
				var iconOffset = 20;

				var north = jQuery('#canvas-grow-N');
				north.css('top', canvasTop + iconOffset + 'px');
				north.css('left', canvasLeft - 10
								+ (canvasWidth - iconWidth) / 2 + 'px');

				var south = jQuery('#canvas-grow-S');
				south
						.css(
								'top',
								(canvasTop + canvasHeight - iconOffset - iconCenterOffset)
										+ 'px');
				south.css('left', canvasLeft - 10
								+ (canvasWidth - iconWidth) / 2 + 'px');

				var east = jQuery('#canvas-grow-E');
				east
						.css('top', canvasTop - 10
										+ (canvasHeight - iconWidth)
										/ 2 + 'px');
				east
						.css(
								'left',
								(canvasLeft + canvasWidth - iconOffset - iconCenterOffset)
										+ 'px');

				var west = jQuery('#canvas-grow-W');
				west
						.css('top', canvasTop - 10
										+ (canvasHeight - iconWidth)
										/ 2 + 'px');
				west.css('left', canvasLeft + iconOffset + 'px');

				north = jQuery('#canvas-shrink-N');
				north.css('top', canvasTop + iconOffset + 'px');
				north.css('left', canvasLeft + 10
								+ (canvasWidth - iconWidth) / 2 + 'px');

				south = jQuery('#canvas-shrink-S');
				south
						.css(
								'top',
								(canvasTop + canvasHeight - iconOffset - iconCenterOffset)
										+ 'px');
				south.css('left', canvasLeft + 10
								+ (canvasWidth - iconWidth) / 2 + 'px');

				east = jQuery('#canvas-shrink-E');
				east
						.css('top', canvasTop + 10
										+ (canvasHeight - iconWidth)
										/ 2 + 'px');
				east
						.css(
								'left',
								(canvasLeft + canvasWidth - iconOffset - iconCenterOffset)
										+ 'px');

				west = jQuery('#canvas-shrink-W');
				west
						.css('top', canvasTop + 10
										+ (canvasHeight - iconWidth)
										/ 2 + 'px');
				west.css('left', canvasLeft + iconOffset + 'px');
			});

			yufp.$(window).trigger('resize');

			jQuery.fn.scrollStopped = function(callback) {
				jQuery(this).scroll(function() {
					var self = this, $this = jQuery(self);
					if ($this.data('scrollTimeout')) {
						clearTimeout($this.data('scrollTimeout'));
					}
					$this.data('scrollTimeout', setTimeout(callback,
									50, self));
				});
			};

			$rootScope.editorInitialized = true;

		} else {

			// Editor is already defined and in memory, we just need to
			// fetch the model.
			fetchModel();

		}

		// $scope.$on('$locationChangeStart', function(event, next,
		// current) {
		// if ($rootScope.editor && !$rootScope.ignoreChanges) {
		// var plugins = $rootScope.editor.loadedPlugins;
		//    
		// var savePlugin;
		// for (var i=0; i<plugins.length; i++) {
		// if (plugins[i].type == 'ORYX.Plugins.Save') {
		// savePlugin = plugins[i];
		// break;
		// }
		// }
		//    
		// if (savePlugin && savePlugin.hasChanges()) {
		// // Always prevent location from changing. We'll use a popup
		// to determine the action we want to take
		// event.preventDefault();
		//    
		// if (!$scope.unsavedChangesModalInstance) {
		//    
		// var handleResponseFunction = function (discard) {
		// $scope.unsavedChangesModalInstance = undefined;
		// if (discard) {
		// $rootScope.ignoreChanges = true;
		// $location.url(next.substring(next.indexOf('/#') + 2));
		// } else {
		// $rootScope.ignoreChanges = false;
		// $rootScope.setMainPageById('processes');
		// }
		// };
		//    
		// $scope.handleResponseFunction = handleResponseFunction;
		//    
		// _internalCreateModal({
		// template: 'editor-app/popups/unsaved-changes.html',
		// scope: $scope
		// }, $modal, $scope);
		// }
		// }
		// }
		// });

		// Always needed, cause the DOM element on wich the scroll event
		// listeners are attached are changed for every new model
		initScrollHandling();

		/**
		 * Helper method to find a stencil item.
		 */
		$rootScope.getStencilItemById = function(stencilItemId) {
			for (var i = 0; i < $rootScope.stencilItemGroups.length; i++) {
				var element = $rootScope.stencilItemGroups[i];

				// Real group
				if (element.items !== null
						&& element.items !== undefined) {
					var item = $rootScope.findStencilItemInGroup(
							stencilItemId, element);
					if (item) {
						return item;
					}
				} else { // Root stencil item
					if (element.id === stencilItemId) {
						return element;
					}
				}
			}
			return undefined;
		};

		/**
		 * Helper method that searches a group for an item with the
		 * given id. If not found, will return undefined.
		 */
		$rootScope.findStencilItemInGroup = function(stencilItemId,
				group) {

			var item;

			// Check all items directly in this group
			for (var j = 0; j < group.items.length; j++) {
				item = group.items[j];
				if (item.id === stencilItemId) {
					return item;
				}
			}

			// Check the child groups
			if (group.groups && group.groups.length > 0) {
				for (var k = 0; k < group.groups.length; k++) {
					item = $scope.findStencilItemInGroup(stencilItemId,
							group.groups[k]);
					if (item) {
						return item;
					}
				}
			}

			return undefined;
		};

		$rootScope.quickAddItem = function(newItemId) {
			$rootScope.safeApply(function() {

				var shapes = $rootScope.editor.getSelection();
				if (shapes && shapes.length == 1) {
					$rootScope.currentSelectedShape = shapes.first();

					var containedStencil = undefined;
					var stencilSets = $rootScope.editor
							.getStencilSets().values();
					for (var i = 0; i < stencilSets.length; i++) {
						var stencilSet = stencilSets[i];
						var nodes = stencilSet.nodes();
						for (var j = 0; j < nodes.length; j++) {
							if (nodes[j].idWithoutNs() === newItemId) {
								containedStencil = nodes[j];
								break;
							}
						}
					}

					if (!containedStencil)
						return;

					var option = {
						type : $rootScope.currentSelectedShape
								.getStencil().namespace()
								+ newItemId,
						namespace : $rootScope.currentSelectedShape
								.getStencil().namespace()
					};
					option['connectedShape'] = $rootScope.currentSelectedShape;
					option['parent'] = $rootScope.currentSelectedShape.parent;
					option['containedStencil'] = containedStencil;

					var args = {
						sourceShape : $rootScope.currentSelectedShape,
						targetStencil : containedStencil
					};
					var targetStencil = $rootScope.editor.getRules()
							.connectMorph(args);
					if (!targetStencil) {
						return;
					}// Check if there can be a target shape
					option['connectingType'] = targetStencil.id();

					var command = new KISBPM.CreateCommand(option,
							undefined, undefined, $rootScope.editor);

					$rootScope.editor.executeCommands([command]);
				}
			});
		};

		// alert(1);
		// $rootScope.editorFactory.then(function () {

		/* Build stencil item list */

		// Build simple json representation of stencil set
		var stencilItemGroups = [];

		// Helper method: find a group in an array
		var findGroup = function(name, groupArray) {
			for (var index = 0; index < groupArray.length; index++) {
				if (groupArray[index].name === name) {
					return groupArray[index];
				}
			}
			return null;
		};

		// Helper method: add a new group to an array of groups
		var addGroup = function(groupName, groupArray) {
			var group = {
				name : groupName,
				items : [],
				paletteItems : [],
				groups : [],
				visible : true
			};
			groupArray.push(group);
			return group;
		};

		// $rootScope.stencilItemGroups = stencilItemGroups;

		yufp.service.request({
					method : 'GET',
					url : 'app/rest/stencil-sets/editor',
					data : null,
					callback : function(code, message, response) {
						configStencilInfo(response.data);
					}
				});
		var configStencilInfo = function(data) {
			data.stencils = JSON.parse(data.stencils);
			// /*
			// StencilSet items
			// */
			// $http({method: 'GET', url:
			// KISBPM.URL.getStencilSet($scope.modelData.stencilSetId)}).success(function
			// (data, status, headers, config) {
			//
			var quickMenuDefinition = ['UserTask', 'EndNoneEvent',
					'ExclusiveGateway', 'CatchTimerEvent',
					'ThrowNoneEvent', 'TextAnnotation', 'SequenceFlow',
					'Association'];
			var ignoreForPaletteDefinition = ['SequenceFlow',
					'MessageFlow', 'Association', 'DataAssociation',
					'DataStore', 'SendTask'];
			var quickMenuItems = [];

			var morphRoles = [];
			for (var i = 0; i < data.rules.morphingRules.length; i++) {
				var role = data.rules.morphingRules[i].role;
				var roleItem = {
					'role' : role,
					'morphOptions' : []
				};
				morphRoles.push(roleItem);
			}

			// Check all received items
			for (var stencilIndex = 0; stencilIndex < data.stencils.length; stencilIndex++) {
				// Check if the root group is the 'diagram' group. If
				// so, this item should not be shown.
				var currentGroupName = data.stencils[stencilIndex].groups[0];
				if (currentGroupName === 'Diagram'
						|| currentGroupName === 'Form') {
					continue; // go to next item
				}

				var removed = false;
				if (data.stencils[stencilIndex].removed) {
					removed = true;
				}

				var currentGroup = undefined;
				if (!removed) {
					// Check if this group already exists. If not, we
					// create a new one

					if (currentGroupName !== null
							&& currentGroupName !== undefined
							&& currentGroupName.length > 0) {

						currentGroup = findGroup(currentGroupName,
								stencilItemGroups); // Find group in
													// root groups array
						if (currentGroup === null) {
							currentGroup = addGroup(currentGroupName,
									stencilItemGroups);
						}

						// Add all child groups (if any)
						for (var groupIndex = 1; groupIndex < data.stencils[stencilIndex].groups.length; groupIndex++) {
							var childGroupName = data.stencils[stencilIndex].groups[groupIndex];
							var childGroup = findGroup(childGroupName,
									currentGroup.groups);
							if (childGroup === null) {
								childGroup = addGroup(childGroupName,
										currentGroup.groups);
							}

							// The current group variable holds the
							// parent of the next group (if any),
							// and is basically the last element in the
							// array of groups defined in the stencil
							// item
							currentGroup = childGroup;

						}

					}
				}

				// Construct the stencil item
				var stencilItem = {
					'id' : data.stencils[stencilIndex].id,
					'name' : data.stencils[stencilIndex].title,
					'description' : data.stencils[stencilIndex].description,
					'icon' : data.stencils[stencilIndex].icon,
					'type' : data.stencils[stencilIndex].type,
					'roles' : data.stencils[stencilIndex].roles,
					'removed' : removed,
					'customIcon' : false,
					'canConnect' : false,
					'canConnectTo' : false,
					'canConnectAssociation' : false
				};

				if (data.stencils[stencilIndex].customIconId
						&& data.stencils[stencilIndex].customIconId > 0) {
					stencilItem.customIcon = true;
					stencilItem.icon = data.stencils[stencilIndex].customIconId;
				}

				if (!removed) {
					if (quickMenuDefinition.indexOf(stencilItem.id) >= 0) {
						quickMenuItems[quickMenuDefinition
								.indexOf(stencilItem.id)] = stencilItem;
					}
				}

				if (stencilItem.id === 'TextAnnotation'
						|| stencilItem.id === 'BoundaryCompensationEvent') {
					stencilItem.canConnectAssociation = true;
				}

				for (var i = 0; i < data.stencils[stencilIndex].roles.length; i++) {
					var stencilRole = data.stencils[stencilIndex].roles[i];
					if (stencilRole === 'sequence_start') {
						stencilItem.canConnect = true;
					} else if (stencilRole === 'sequence_end') {
						stencilItem.canConnectTo = true;
					}

					for (var j = 0; j < morphRoles.length; j++) {
						if (stencilRole === morphRoles[j].role) {
							if (!removed) {
								morphRoles[j].morphOptions
										.push(stencilItem);
							}
							stencilItem.morphRole = morphRoles[j].role;
							break;
						}
					}
				}

				if (currentGroup) {
					// Add the stencil item to the correct group
					currentGroup.items.push(stencilItem);
					if (ignoreForPaletteDefinition
							.indexOf(stencilItem.id) < 0) {
						currentGroup.paletteItems.push(stencilItem);
					}

				} else {
					// It's a root stencil element
					if (!removed) {
						stencilItemGroups.push(stencilItem);
					}
				}
			}

			for (var i = 0; i < stencilItemGroups.length; i++) {
				if (stencilItemGroups[i].paletteItems
						&& stencilItemGroups[i].paletteItems.length == 0) {
					stencilItemGroups[i].visible = false;
				}
			}

			$rootScope.stencilItemGroups = stencilItemGroups;

			var containmentRules = [];
			for (var i = 0; i < data.rules.containmentRules.length; i++) {
				var rule = data.rules.containmentRules[i];
				containmentRules.push(rule);
			}
			$rootScope.containmentRules = containmentRules;

			// remove quick menu items which are not available anymore
			// due to custom pallette
			var availableQuickMenuItems = [];
			for (var i = 0; i < quickMenuItems.length; i++) {
				if (quickMenuItems[i]) {
					availableQuickMenuItems[availableQuickMenuItems.length] = quickMenuItems[i];
				}
			}

			$rootScope.quickMenuItems = availableQuickMenuItems;
			vm.quickMenuItems = availableQuickMenuItems;
			$rootScope.morphRoles = morphRoles;
			// }).
			//            
			// error(function (data, status, headers, config) {
			// console.log('Something went wrong when fetching stencil
			// items:' + JSON.stringify(data));
			// });
		};

		/*
		 * Listen to selection change events: show properties
		 */
		$rootScope.editor.registerOnEvent(
				ORYX.CONFIG.EVENT_SELECTION_CHANGED, function(event) {
					var shapes = event.elements;
					var canvasSelected = false;
					if (shapes && shapes.length == 0) {
						shapes = [$rootScope.editor.getCanvas()];
						canvasSelected = true;
					}
					if (shapes && shapes.length > 0) {

						var selectedShape = shapes.first();
						var stencil = selectedShape.getStencil();

						if ($rootScope.selectedElementBeforeScrolling
								&& stencil.id().indexOf('BPMNDiagram') !== -1) {
							// ignore canvas event because of empty
							// selection when scrolling stops
							return;
						}

						if ($rootScope.selectedElementBeforeScrolling
								&& $rootScope.selectedElementBeforeScrolling
										.getId() === selectedShape
										.getId()) {
							$rootScope.selectedElementBeforeScrolling = null;
							return;
						}

						// Store previous selection
						$rootScope.previousSelectedShape = $rootScope.selectedShape;

						// Only do something if another element is
						// selected (Oryx fires this event multiple
						// times)
						if ($rootScope.selectedShape !== undefined
								&& $rootScope.selectedShape.getId() === selectedShape
										.getId()) {
							if ($rootScope.forceSelectionRefresh) {
								// Switch the flag again, this run will
								// force refresh
								$rootScope.forceSelectionRefresh = false;
							} else {
								// Selected the same element again, no
								// need to update anything
								return;
							}
						}

						var selectedItem = {
							'title' : '',
							'properties' : []
						};

						if (canvasSelected) {
							selectedItem.auditData = {
								'author' : $rootScope.modelData.createdByUser,
								'createDate' : $rootScope.modelData.createDate
							};
						}

						/*
						 * // Gather properties of selected item var
						 * properties = stencil.properties(); for (var i =
						 * 0; i < properties.length; i++) { var property =
						 * properties[i]; if (property.popular() ==
						 * false) continue; var key = property.prefix() +
						 * "-" + property.id();
						 * 
						 * if (key === 'oryx-name') { selectedItem.title =
						 * selectedShape.properties[key]; }
						 *  // First we check if there is a config for
						 * 'key-type' and then for 'type' alone var
						 * propertyConfig = KISBPM.PROPERTY_CONFIG[key +
						 * '-' + property.type()]; if (propertyConfig
						 * === undefined || propertyConfig === null) {
						 * propertyConfig =
						 * KISBPM.PROPERTY_CONFIG[property.type()]; }
						 * 
						 * if (propertyConfig === undefined ||
						 * propertyConfig === null) {
						 * console.log('WARNING: no property
						 * configuration defined for ' + key + ' of type ' +
						 * property.type()); } else {
						 * 
						 * if (selectedShape.properties[key] === 'true') {
						 * selectedShape.properties[key] = true; }
						 * 
						 * if (KISBPM.CONFIG.showRemovedProperties ==
						 * false && property.isHidden()) { continue; }
						 * 
						 * var currentProperty = { 'key': key, 'title':
						 * property.title(), 'description':
						 * property.description(), 'type':
						 * property.type(), 'mode': 'read', 'hidden':
						 * property.isHidden(), 'value':
						 * selectedShape.properties[key] };
						 * 
						 * if ((currentProperty.type === 'complex' ||
						 * currentProperty.type === 'multiplecomplex') &&
						 * currentProperty.value &&
						 * currentProperty.value.length > 0) { try {
						 * currentProperty.value =
						 * JSON.parse(currentProperty.value); } catch
						 * (err) { // ignore } }
						 * 
						 * if (propertyConfig.readModeTemplateUrl !==
						 * undefined &&
						 * propertyConfig.readModeTemplateUrl !== null) {
						 * currentProperty.readModeTemplateUrl =
						 * propertyConfig.readModeTemplateUrl +
						 * '?version=' +
						 * $rootScope.staticIncludeVersion; } if
						 * (propertyConfig.writeModeTemplateUrl !== null &&
						 * propertyConfig.writeModeTemplateUrl !== null) {
						 * currentProperty.writeModeTemplateUrl =
						 * propertyConfig.writeModeTemplateUrl +
						 * '?version=' +
						 * $rootScope.staticIncludeVersion; }
						 * 
						 * if (propertyConfig.templateUrl !== undefined &&
						 * propertyConfig.templateUrl !== null) {
						 * currentProperty.templateUrl =
						 * propertyConfig.templateUrl + '?version=' +
						 * $rootScope.staticIncludeVersion;
						 * currentProperty.hasReadWriteMode = false; }
						 * else { currentProperty.hasReadWriteMode =
						 * true; }
						 * 
						 * if (currentProperty.value === undefined ||
						 * currentProperty.value === null ||
						 * currentProperty.value.length == 0) {
						 * currentProperty.noValue = true; }
						 * 
						 * selectedItem.properties.push(currentProperty); } }
						 */

						// Need to wrap this in an $apply block, see
						// http://jimhoskins.com/2012/12/17/angularjs-and-apply.html
						$rootScope.safeApply(function() {
									$rootScope.selectedItem = selectedItem;
									$rootScope.selectedShape = selectedShape;
								});

					} else {
						$sco$rootScopepe.safeApply(function() {
									$rootScope.selectedItem = {};
									$rootScope.selectedShape = null;
								});
					}
				});

		$rootScope.editor.registerOnEvent(
				ORYX.CONFIG.EVENT_SELECTION_CHANGED, function(event) {

					KISBPM.eventBus
							.dispatch(KISBPM.eventBus.EVENT_TYPE_HIDE_SHAPE_BUTTONS);
					var shapes = event.elements;

					if (shapes && shapes.length == 1) {

						var selectedShape = shapes.first();

						var a = $rootScope.editor.getCanvas().node
								.getScreenCTM();

						var absoluteXY = selectedShape.absoluteXY();

						absoluteXY.x *= a.a;
						absoluteXY.y *= a.d;

						var additionalIEZoom = 1;
						if (!isNaN(screen.logicalXDPI)
								&& !isNaN(screen.systemXDPI)) {
							var ua = navigator.userAgent;
							if (ua.indexOf('MSIE') >= 0) {
								// IE 10 and below
								var zoom = Math
										.round((screen.deviceXDPI / screen.logicalXDPI)
												* 100);
								if (zoom !== 100) {
									additionalIEZoom = zoom / 100
								}
							}
						}

						if (additionalIEZoom === 1) {
							absoluteXY.y = absoluteXY.y
									- jQuery("#canvasSection").offset().top
									+ 5;
							absoluteXY.x = absoluteXY.x
									- jQuery("#canvasSection").offset().left;

						} else {
							var canvasOffsetLeft = jQuery("#canvasSection")
									.offset().left;
							var canvasScrollLeft = jQuery("#canvasSection")
									.scrollLeft();
							var canvasScrollTop = jQuery("#canvasSection")
									.scrollTop();

							var offset = a.e
									- (canvasOffsetLeft * additionalIEZoom);
							var additionaloffset = 0;
							if (offset > 10) {
								additionaloffset = (offset / additionalIEZoom)
										- offset;
							}
							absoluteXY.y = absoluteXY.y
									- (jQuery("#canvasSection")
											.offset().top * additionalIEZoom)
									+ 5
									+ ((canvasScrollTop * additionalIEZoom) - canvasScrollTop);
							absoluteXY.x = absoluteXY.x
									- (canvasOffsetLeft * additionalIEZoom)
									+ additionaloffset
									+ ((canvasScrollLeft * additionalIEZoom) - canvasScrollLeft);
						}

						var bounds = new ORYX.Core.Bounds(a.e
										+ absoluteXY.x, a.f
										+ absoluteXY.y, a.e
										+ absoluteXY.x + a.a
										* selectedShape.bounds.width(),
								a.f + absoluteXY.y + a.d
										* selectedShape.bounds.height());
						var shapeXY = bounds.upperLeft();

						var stencilItem = $rootScope
								.getStencilItemById(selectedShape
										.getStencil().idWithoutNs());
						var morphShapes = [];
						if (stencilItem && stencilItem.morphRole) {
							for (var i = 0; i < $rootScope.morphRoles.length; i++) {
								if ($rootScope.morphRoles[i].role === stencilItem.morphRole) {
									morphShapes = $rootScope.morphRoles[i].morphOptions;
								}
							}
						}

						var x = shapeXY.x;
						if (bounds.width() < 48) {
							x -= 24;
						}

						if (morphShapes && morphShapes.length > 0) {
							// In case the element is not wide enough,
							// start the 2 bottom-buttons more to the
							// left
							// to prevent overflow in the right-menu

							var morphButton = document
									.getElementById('morph-button');
							morphButton.style.display = "block";
							morphButton.style.left = x + 24 + 'px';
							morphButton.style.top = (shapeXY.y
									+ bounds.height() + 2)
									+ 'px';
						}

						var deleteButton = document
								.getElementById('delete-button');
						deleteButton.style.display = "block";
						deleteButton.style.left = x + 'px';
						deleteButton.style.top = (shapeXY.y
								+ bounds.height() + 2)
								+ 'px';

						if (stencilItem
								&& (stencilItem.canConnect || stencilItem.canConnectAssociation)) {
							var quickButtonCounter = 0;
							var quickButtonX = shapeXY.x
									+ bounds.width() + 5;
							var quickButtonY = shapeXY.y;
							jQuery('.Oryx_button').each(
									function(i, obj) {
										if (obj.id !== 'morph-button'
												&& obj.id != 'delete-button') {
											quickButtonCounter++;
											if (quickButtonCounter > 3) {
												quickButtonX = shapeXY.x
														+ bounds
																.width()
														+ 5;
												quickButtonY += 24;
												quickButtonCounter = 1;
											} else if (quickButtonCounter > 1) {
												quickButtonX += 24;
											}
											obj.style.display = "block";
											obj.style.left = quickButtonX
													+ 'px';
											obj.style.top = quickButtonY
													+ 'px';
										}
									});
						}
					}
				});

		if (true) {
			KISBPM.eventBus.addListener(
					KISBPM.eventBus.EVENT_TYPE_HIDE_SHAPE_BUTTONS,
					function(event) {
						jQuery('.Oryx_button').each(function(i, obj) {
									obj.style.display = "none";
								});
					});

			/*
			 * Listen to property updates and act upon them
			 */
			KISBPM.eventBus.addListener(
					KISBPM.eventBus.EVENT_TYPE_PROPERTY_VALUE_CHANGED,
					function(event) {
						if (event.property && event.property.key) {
							// If the name property is been updated, we
							// also need to change the title of the
							// currently selected item
							if (event.property.key === 'oryx-name'
									&& $scope.selectedItem !== undefined
									&& $scope.selectedItem !== null) {
								$scope.selectedItem.title = event.newValue;
							}

							// Update "no value" flag
							event.property.noValue = (event.property.value === undefined
									|| event.property.value === null || event.property.value.length == 0);
						}
					});

			KISBPM.eventBus.addListener(
					KISBPM.eventBus.EVENT_TYPE_SHOW_VALIDATION_POPUP,
					function(event) {
						// Method to open validation dialog
						var showValidationDialog = function() {
							$rootScope.currentValidationId = event.validationId;
							$rootScope.isOnProcessLevel = event.onProcessLevel;

							_internalCreateModal({
								template : 'editor-app/popups/validation-errors.html?version='
										+ Date.now()
							}, $modal, $rootScope);
						};

						showValidationDialog();
					});

			KISBPM.eventBus.addListener(
					KISBPM.eventBus.EVENT_TYPE_NAVIGATE_TO_PROCESS,
					function(event) {
						var modelMetaData = $rootScope.editor
								.getModelMetaData();
						$rootScope.editorHistory.push({
									id : modelMetaData.modelId,
									name : modelMetaData.name,
									type : 'bpmnmodel'
								});
						$window.location.href = "../editor/#/editor/"
								+ event.processId;
					});

			$rootScope.stencilInitialized = true;
		}

		$rootScope.morphShape = function() {
			$rootScope.safeApply(function() {

				var shapes = $rootScope.editor.getSelection();
				if (shapes && shapes.length == 1) {
					$rootScope.currentSelectedShape = shapes.first();
					var stencilItem = $rootScope
							.getStencilItemById($rootScope.currentSelectedShape
									.getStencil().idWithoutNs());
					var morphShapes = [];
					for (var i = 0; i < $rootScope.morphRoles.length; i++) {
						if ($rootScope.morphRoles[i].role === stencilItem.morphRole) {
							morphShapes = $rootScope.morphRoles[i].morphOptions
									.slice();
						}
					}

					// Method to open shape select dialog (used later
					// on)
					var showSelectShapeDialog = function() {
						$rootScope.morphShapes = morphShapes;
						_internalCreateModal({
							backdrop : false,
							keyboard : true,
							template : 'editor-app/popups/select-shape.html?version='
									+ Date.now()
						}, $modal, $rootScope);
					};

					showSelectShapeDialog();
				}
			});
		};

		$rootScope.deleteShape = function() {
			KISBPM.TOOLBAR.ACTIONS.deleteItem({
						'$scope' : $scope
					});
		};

		$rootScope.quickAddItem = function(newItemId) {
			$rootScope.safeApply(function() {

				var shapes = $rootScope.editor.getSelection();
				if (shapes && shapes.length == 1) {
					$rootScope.currentSelectedShape = shapes.first();

					var containedStencil = undefined;
					var stencilSets = $rootScope.editor
							.getStencilSets().values();
					for (var i = 0; i < stencilSets.length; i++) {
						var stencilSet = stencilSets[i];
						var nodes = stencilSet.nodes();
						for (var j = 0; j < nodes.length; j++) {
							if (nodes[j].idWithoutNs() === newItemId) {
								containedStencil = nodes[j];
								break;
							}
						}
					}

					if (!containedStencil)
						return;

					var option = {
						type : $rootScope.currentSelectedShape
								.getStencil().namespace()
								+ newItemId,
						namespace : $rootScope.currentSelectedShape
								.getStencil().namespace()
					};
					option['connectedShape'] = $rootScope.currentSelectedShape;
					option['parent'] = $rootScope.currentSelectedShape.parent;
					option['containedStencil'] = containedStencil;

					var args = {
						sourceShape : $rootScope.currentSelectedShape,
						targetStencil : containedStencil
					};
					var targetStencil = $rootScope.editor.getRules()
							.connectMorph(args);
					if (!targetStencil) {
						return;
					}// Check if there can be a target shape
					option['connectingType'] = targetStencil.id();

					var command = new KISBPM.CreateCommand(option,
							undefined, undefined, $rootScope.editor);

					$rootScope.editor.executeCommands([command]);
				}
			});
		};

		// }); // end of $scope.editorFactory.promise block

	};
	// 消息处理
	exports.onmessage = function(type, message) {

	};
	// page销毁时触发destroy方法
	exports.destroy = function(id, cite) {

	}
});
