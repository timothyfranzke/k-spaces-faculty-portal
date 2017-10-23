(function ()
{
    'use strict';

    /**
     * Main module of the Fuse
     */
    angular
        .module('fuse', [

            // Core
            'app.core',

            // Navigation
            'app.navigation',

            // Toolbar
            'app.toolbar',

            // Quick Panel
            'app.quick-panel',

            //Pages
            'app.pages',

            // Apps
            'app.calendar',
            'app.chat',
            'app.mail',
            'app.notes',
            'app.configuration',
            'app.manager',
            //Services
            'app.common',
            'app.avatar-generator'
        ]);
})();
