SCAPP = {

    loadedPlugins: [],
    loadedModules: [],
    debug: false,
    wrapper: document,

    modules: [
        {file: '/path/to/your/module.js', module: 'NAME_MODULE'},
        {file: '/path/to/your/module.js', module: 'NAME_MODULE2'},
    ],

    init: function(wrapper, debug)
    {
        var me = this;
        if (debug === false || debug === true) {
            me.debug = debug;
        }

        if(SC.isEmpty(wrapper)) {
            wrapper = 'body';
        }
        if(!wrapper.jquery) {
            wrapper = $(wrapper);
        }
        if(!$(wrapper).length) {
            me.log(['Wrapper was not found',wrapper],'error');
            wrapper = $('body');
        }
        me.wrapper = wrapper;
    },

    setDebug: function (debug)
    {
        this.debug = debug;
    },

    findIndex: function (module2Search)
    {
        var me = this;
        var idx = false;
        $.each(me.modules, function(i,e) {
            module2Search = module2Search.toLowerCase();
            var file = e.file.toLowerCase();
            var module = e.module.toLowerCase();
            if (file == module2Search || module == module2Search) {
                idx = i;
                return;
            }
        });
        if (idx !== false)
            return idx;

        console.error('Module ' + module2Search + ' was not found!');
        return false;
    },

    loadModules: function(modules)
    {
        var me = this;
        if (typeof modules === "string") {
            modules = [modules];
        }
        $.each(modules, function(moduleIndex, module) {
            var args = [];
            if (typeof module === 'object') {
                if (module.hasOwnProperty('args')) {
                    args = module.args;
                }
                module = module.module;
            }
            me.log('Loading the module ' + module + '...');
            var idx = me.findIndex(module);
            if (idx === false) {
                return;
            }
            if (me.loadedModules.hasOwnProperty(idx)) {
                me.log('Module ' + module + ' is already loaded');
                return;
            }
            // Mark it as loaded
            me.loadedModules[idx] = 1;

            $.getScript(me.modules[idx].file, function () {
                var variableName = me.modules[idx].module;
                // Load Required Modules
                me.loadRequired(variableName);
                // Init the module
                me.initModule(variableName,args);

                $(window).trigger('loaded' + variableName);
                me.log('Module ' + variableName + ' is now loaded and initiciated!');
            });

        });
    },

    loadRequired: function(module)
    {
        var me = this;

        if (window.hasOwnProperty(module) && window[module].hasOwnProperty('requires') && !SC.isEmpty(window[module].requires)) {
            $.each(window[module].requires, function (i, e) {
                me.loadModules(e);
            });
        }
    },

    initModule: function(module, args)
    {
        var me = this;

        me.log(['init module: ' + module, args]);
        window[module].wrapper = me.wrapper;
        window[module].debug = me.debug;
        window[module].init.apply(window[module],args);
    },

    log: function(args, level)
    {
        if (typeof args === "string") {
            args = [args];
        }
        if (SC.isEmpty(level)) {
            level = "log";
        }
        if (this.debug) {
            console[level].apply(console, args);
        }
    }

}
