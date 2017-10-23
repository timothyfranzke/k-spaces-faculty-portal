(function ()
{
    'use strict';

    angular
        .module('app.manager',
            [
                // 3rd Party Dependencies
                'wipImageZoom',
                'datatables',
                'flow',
                'nvd3',
                'textAngular',
                'uiGmapgoogle-maps',
                'xeditable',
                'ngEventEmitter'
            ]
        )
        .config(config)
        .filter("inArray", filter);

    /** @ngInject */
    function config($stateProvider, $translatePartialLoaderProvider, msApiProvider, msNavigationServiceProvider, config)
    {
        // State
        $stateProvider
            .state('app.manager', {
                abstract: true,
                url     : '/manager'
            })

          .state('app.manager.spaces', {
            url      : '/spaces',
            views    : {
              'content@app': {
                templateUrl: 'app/main/manager/views/spaces/spaces.html',
                controller : 'SpacesController as vm'
              }
            },
            resolve  : {
              Spaces: function (managerService)
              {
                return managerService.getSpaces();
              }
            },
            bodyClass: 'spaces'
          })
          .state('app.manager.spaces.detail', {
            url      : '/:id',
            views    : {
              'content@app': {
                templateUrl: 'app/main/manager/views/space/space.html',
                controller : 'SpaceDetailController as vm'
              }
            },
            resolve  : {
              Space        : function ($stateParams, managerService)
              {
                return managerService.getSpace($stateParams.id);
              },
              Locations   : function ($stateParams, managerService)
              {
                return managerService.getLocations();
              },
              StudentUsers  : function ($stateParams, managerService)
              {
                return managerService.getStudentUsers();
              },
              FacultyUsers  : function ($stateParams, managerService)
              {
                return managerService.getFacultyUsers();
              }
            },
            bodyClass: 'space'
          })
          .state('app.manager.spaces.add', {
            url      : '/add',
            views    : {
              'content@app': {
                templateUrl: 'app/main/manager/views/space/space.html',
                controller : 'SpaceDetailController as vm'
              }
            },
            resolve  : {
              Space        : function ($stateParams, managerService)
              {
                return managerService.newSpace();
              },
              Locations   : function ($stateParams, managerService)
              {
                return managerService.getLocations();
              },
              StudentUsers  : function ($stateParams, managerService)
              {
                return managerService.getStudentUsers();
              },
              FacultyUsers  : function ($stateParams, managerService)
              {
                return managerService.getFacultyUsers();
              }
            },
            bodyClass: 'space'
          })
          .state('app.manager.tier', {
      url      : '/tiers',
      views    : {
        'content@app': {
          templateUrl: 'app/main/manager/views/tiers/tiers.html',
          controller : 'TiersController as vm'
        }
      },
      resolve  : {
        Tiers: function (managerService)
        {
          return managerService.getTiers();
        }
      },
      bodyClass: 'pricingTier'
    })
      .state('app.manager.tier.add', {
        url      : '/add',
        views    : {
          'content@app': {
            templateUrl: 'app/main/manager/views/tier/tier.html',
            controller : 'TierController as vm'
          }
        },
        resolve: {
          Tier: function (managerService)
          {
            return managerService.newTier();
          },
          Locations: function(managerService){
            return managerService.getLocations();
          },
          Students: function(managerService){
            return managerService.getStudentUsers();
          }
        },
        bodyClass: 'pricingTier'
      })
      .state('app.manager.tier.detail', {
        url      : '/:id',
        views    : {
          'content@app': {
            templateUrl: 'app/main/manager/views/tier/tier.html',
            controller : 'TierController as vm'
          }
        },
        resolve  : {
          Tier: function (managerService, $stateParams)
          {
            return managerService.getTier($stateParams.id);
          },
          Locations: function(managerService){
            return managerService.getLocations();
          },
          Students: function(managerService){
            return managerService.getStudentUsers();
          }
        },
        bodyClass: 'pricingTier'
      })
          .state('app.manager.users', {
            url      : '/users',
            views    : {
              'content@app': {
                templateUrl: 'app/main/manager/views/users/users.html',
                controller : 'UsersController as vm'
              }
            },
            resolve  : {
              Users: function (managerService)
              {
                return managerService.getUsers();
              },
                Entity: function(managerService){
                  return managerService.getEntities()
                }
            },
            bodyClass: 'users'
          })
          .state('app.manager.users.add', {
            url      : '/add',
            views    : {
              'content@app': {
                templateUrl: 'app/main/manager/views/user/user.html',
                controller : 'UserController as vm'
              }
            },
            resolve: {
              User: function (managerService)
              {
                return managerService.newUser();
              },
              Students: function(managerService){
                return managerService.getStudentUsers();
              }
            },
            bodyClass: 'user'
          })
          .state('app.manager.users.detail', {
            url      : '/:id',
            views    : {
              'content@app': {
                templateUrl: 'app/main/manager/views/user/user.html',
                controller : 'UserController as vm'
              }
            },
            resolve  : {
              User: function ($stateParams, managerService)
              {
                return managerService.getUser($stateParams.id);
              },
              Students: function(managerService){
                return managerService.getStudentUsers();
              }
            },
            bodyClass: 'user'
          });

        // Translation
        $translatePartialLoaderProvider.addPart('app/main/manager');

      // Api
      msApiProvider.register('manager.locations', [config.api.baseUrl + config.api.location]);
      msApiProvider.register('manager.spaces', [config.api.baseUrl + config.api.spaces]);
      msApiProvider.register('manager.users', [config.api.baseUrl + config.api.user]);
      msApiProvider.register('manager.entities', [config.api.baseUrl + config.api.entities]);

        // Navigation
        msNavigationServiceProvider.saveItem('manager', {
            title : 'Manage',
            icon  : 'icon-account-multiple',
            weight: 1
        });
        msNavigationServiceProvider.saveItem('manager.spaces', {
          title: 'Activity',
          state: 'app.manager.spaces'
        });
        msNavigationServiceProvider.saveItem('manager.users', {
            title: 'Users',
            state: 'app.manager.users'
        });
    };

    function filter($filter) {
        return function (list, arrayFilter, element) {
            if (arrayFilter) {
                console.log("filter list ")
                console.log(list);
                console.log("filter arrayFilter ");
                 console.log(arrayFilter);
                console.log("filter element " + element);
                return $filter("filter")(list, function (listItem) {
                    return arrayFilter.indexOf(listItem[element]) != -1;
                });
            }
        };
    };
})();
