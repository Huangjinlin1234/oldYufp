/* Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 * 
 *      http://www.apache.org/licenses/LICENSE-2.0
 * 
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 */
'use strict';

var KISBPM = KISBPM || {};
KISBPM.TOOLBAR = {
    ACTIONS: {
    	
        saveModel: function (services) {
            var json = services.$scope.editor.getJSON();
            json = JSON.stringify(json);
            
            //services.$scope.status.loading = true;
    
            var params = {
                bizFlowId: services.bizFlowId,
            	bizEventId: services.bizEventId,
                eventChartJson: json
            };
            
            var modelId = '11';
            yufp.service.request({
                url: backend.flowService + '/api/biz/event/chart/save',
                method: 'POST',
                data: params,
                callback: function (code, message, response) {
                	if(code == 0 && response.code == 0) {
                        services.$scope.editor.handleEvents({ type: ORYX.CONFIG.EVENT_SAVED });
                        services.message({message: '操作成功', type: 'success'});
                        //services.$scope.status.loading = false;
                        //$scope.$hide();
        
                        // Fire event to all who is listening
                        var saveEvent = {
                            type: KISBPM.eventBus.EVENT_TYPE_MODEL_SAVED,
                            model: params,
                            modelId: modelId,
                            eventType: 'update-model'
                        };
                        KISBPM.eventBus.dispatch(KISBPM.eventBus.EVENT_TYPE_MODEL_SAVED, saveEvent);
        
                        // Reset state
                        services.$scope.error = undefined;
                        //services.$scope.status.loading = false;
                	} else {
                		services.message({message: '操作失败', type: 'error'});
                	}
                }
            });
        },

        undo: function (services) {

            // Get the last commands
            var lastCommands = services.$scope.undoStack.pop();

            if (lastCommands) {
                // Add the commands to the redo stack
                services.$scope.redoStack.push(lastCommands);

                // Force refresh of selection, might be that the undo command
                // impacts properties in the selected item
                if (services.$rootScope && services.$rootScope.forceSelectionRefresh) 
                {
                	services.$rootScope.forceSelectionRefresh = true;
                }
                
                // Rollback every command
                for (var i = lastCommands.length - 1; i >= 0; --i) {
                    lastCommands[i].rollback();
                }
                
                // Update and refresh the canvas
                services.$scope.editor.handleEvents({
                    type: ORYX.CONFIG.EVENT_UNDO_ROLLBACK,
                    commands: lastCommands
                });
                
                // Update
                services.$scope.editor.getCanvas().update();
                services.$scope.editor.updateSelection();
            }
            
            var toggleUndo = false;
            if (services.$scope.undoStack.length == 0)
            {
            	toggleUndo = true;
            }
            
            var toggleRedo = false;
            if (services.$scope.redoStack.length > 0)
            {
            	toggleRedo = true;
            }

            if (toggleUndo || toggleRedo) {
                for (var i = 0; i < services.$scope.items.length; i++) {
                    var item = services.$scope.items[i];
                    if (toggleUndo && item.action === 'KISBPM.TOOLBAR.ACTIONS.undo') {
                        services.$scope.safeApply(function () {
                            item.enabled = false;
                        });
                    }
                    else if (toggleRedo && item.action === 'KISBPM.TOOLBAR.ACTIONS.redo') {
                        services.$scope.safeApply(function () {
                            item.enabled = true;
                        });
                    }
                }
            }
        },

        redo: function (services) {

            // Get the last commands from the redo stack
            var lastCommands = services.$scope.redoStack.pop();

            if (lastCommands) {
                // Add this commands to the undo stack
                services.$scope.undoStack.push(lastCommands);
                
                // Force refresh of selection, might be that the redo command
                // impacts properties in the selected item
                if (services.$rootScope && services.$rootScope.forceSelectionRefresh) 
                {
                	services.$rootScope.forceSelectionRefresh = true;
                }

                // Execute those commands
                lastCommands.each(function (command) {
                    command.execute();
                });

                // Update and refresh the canvas
                services.$scope.editor.handleEvents({
                    type: ORYX.CONFIG.EVENT_UNDO_EXECUTE,
                    commands: lastCommands
                });

                // Update
                services.$scope.editor.getCanvas().update();
                services.$scope.editor.updateSelection();
            }

            var toggleUndo = false;
            if (services.$scope.undoStack.length > 0) {
                toggleUndo = true;
            }

            var toggleRedo = false;
            if (services.$scope.redoStack.length == 0) {
                toggleRedo = true;
            }

            if (toggleUndo || toggleRedo) {
                for (var i = 0; i < services.$scope.items.length; i++) {
                    var item = services.$scope.items[i];
                    if (toggleUndo && item.action === 'KISBPM.TOOLBAR.ACTIONS.undo') {
                        services.$scope.safeApply(function () {
                            item.enabled = true;
                        });
                    }
                    else if (toggleRedo && item.action === 'KISBPM.TOOLBAR.ACTIONS.redo') {
                        services.$scope.safeApply(function () {
                            item.enabled = false;
                        });
                    }
                }
            }
        },

        cut: function (services) {
            KISBPM.TOOLBAR.ACTIONS._getOryxEditPlugin(services.$scope).editCut();
            for (var i = 0; i < services.$scope.items.length; i++) {
                var item = services.$scope.items[i];
                if (item.action === 'KISBPM.TOOLBAR.ACTIONS.paste') {
                    services.$scope.safeApply(function () {
                        item.enabled = true;
                    });
                }
            }
        },

        copy: function (services) {
            KISBPM.TOOLBAR.ACTIONS._getOryxEditPlugin(services.$scope).editCopy();
            for (var i = 0; i < services.$scope.items.length; i++) {
                var item = services.$scope.items[i];
                if (item.action === 'KISBPM.TOOLBAR.ACTIONS.paste') {
                    services.$scope.safeApply(function () {
                        item.enabled = true;
                    });
                }
            }
        },

        paste: function (services) {
            KISBPM.TOOLBAR.ACTIONS._getOryxEditPlugin(services.$scope).editPaste();
        },

        deleteItem: function (services) {
            KISBPM.TOOLBAR.ACTIONS._getOryxEditPlugin(services.$scope).editDelete();
        },

        addBendPoint: function (services) {

            // Show the tutorial the first time
            ACTIVITI_EDITOR_TOUR.sequenceFlowBendpoint(services.$scope, services.$translate, services.$q, true);

            var dockerPlugin = KISBPM.TOOLBAR.ACTIONS._getOryxDockerPlugin(services.$scope);

            var enableAdd = !dockerPlugin.enabledAdd();
            dockerPlugin.setEnableAdd(enableAdd);
            if (enableAdd)
            {
            	dockerPlugin.setEnableRemove(false);
            	document.body.style.cursor = 'pointer';
            }
            else
            {
            	document.body.style.cursor = 'default';
            }
        },

        removeBendPoint: function (services) {

            // Show the tutorial the first time
            ACTIVITI_EDITOR_TOUR.sequenceFlowBendpoint(services.$scope, services.$translate, services.$q, true);

            var dockerPlugin = KISBPM.TOOLBAR.ACTIONS._getOryxDockerPlugin(services.$scope);

            var enableRemove = !dockerPlugin.enabledRemove();
            dockerPlugin.setEnableRemove(enableRemove);
            if (enableRemove)
            {
            	dockerPlugin.setEnableAdd(false);
            	document.body.style.cursor = 'pointer';
            }
            else
            {
            	document.body.style.cursor = 'default';
            }
        },

        /**
         * Helper method: fetches the Oryx Edit plugin from the provided scope,
         * if not on the scope, it is created and put on the scope for further use.
         *
         * It's important to reuse the same EditPlugin while the same scope is active,
         * as the clipboard is stored for the whole lifetime of the scope.
         */
        _getOryxEditPlugin: function ($scope) {
            if ($scope.oryxEditPlugin === undefined || $scope.oryxEditPlugin === null) {
                $scope.oryxEditPlugin = new ORYX.Plugins.Edit($scope.editor);
            }
            return $scope.oryxEditPlugin;
        },

        zoomIn: function (services) {
            KISBPM.TOOLBAR.ACTIONS._getOryxViewPlugin(services.$scope).zoom([1.0 + ORYX.CONFIG.ZOOM_OFFSET]);
        },

        zoomOut: function (services) {
            KISBPM.TOOLBAR.ACTIONS._getOryxViewPlugin(services.$scope).zoom([1.0 - ORYX.CONFIG.ZOOM_OFFSET]);
        },
        
        zoomActual: function (services) {
            KISBPM.TOOLBAR.ACTIONS._getOryxViewPlugin(services.$scope).setAFixZoomLevel(1);
        },
        
        zoomFit: function (services) {
        	KISBPM.TOOLBAR.ACTIONS._getOryxViewPlugin(services.$scope).zoomFitToModel();
        },
        
        alignVertical: function (services) {
        	KISBPM.TOOLBAR.ACTIONS._getOryxArrangmentPlugin(services.$scope).alignShapes([ORYX.CONFIG.EDITOR_ALIGN_MIDDLE]);
        },
        
        alignHorizontal: function (services) {
        	KISBPM.TOOLBAR.ACTIONS._getOryxArrangmentPlugin(services.$scope).alignShapes([ORYX.CONFIG.EDITOR_ALIGN_CENTER]);
        },
        
        sameSize: function (services) {
        	KISBPM.TOOLBAR.ACTIONS._getOryxArrangmentPlugin(services.$scope).alignShapes([ORYX.CONFIG.EDITOR_ALIGN_SIZE]);
        },

        help: function (services) {
            ACTIVITI_EDITOR_TOUR.gettingStarted(services.$scope, services.$translate, services.$q);
        },
        
        /**
         * Helper method: fetches the Oryx View plugin from the provided scope,
         * if not on the scope, it is created and put on the scope for further use.
         */
        _getOryxViewPlugin: function ($scope) {
            if ($scope.oryxViewPlugin === undefined || $scope.oryxViewPlugin === null) {
                $scope.oryxViewPlugin = new ORYX.Plugins.View($scope.editor);
            }
            return $scope.oryxViewPlugin;
        },
        
        _getOryxArrangmentPlugin: function ($scope) {
            if ($scope.oryxArrangmentPlugin === undefined || $scope.oryxArrangmentPlugin === null) {
                $scope.oryxArrangmentPlugin = new ORYX.Plugins.Arrangement($scope.editor);
            }
            return $scope.oryxArrangmentPlugin;
        },

        _getOryxDockerPlugin: function ($scope) {
            if ($scope.oryxDockerPlugin === undefined || $scope.oryxDockerPlugin === null) {
                $scope.oryxDockerPlugin = new ORYX.Plugins.AddDocker($scope.editor);
            }
            return $scope.oryxDockerPlugin;
        }
    }
};