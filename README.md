# JSBooty
JSBooty is a very light weight javascript - meant to be light reusable for small / medium projects

# Real Usages

JSBooty loads your modules / libraries with dependencies simply learn what you need to do:

````
MYMODULE = {
    wrapper: '',
    requires: [],
    options: {},
    
    init: function(wrapper, options)
    {
        // Your Code here
    }
}
````

If MyModule is going to display some MODAL windows you should have some MODULE and you add to MYMODULE.requires the name of that module, for example:

````
MYMODULE.require.push('MODAL_MODULE')
````

Dont forget to update the app.js module stack:

````
# https://github.com/joshlopes/JSBooty/blob/master/app.js#L9
modules: [
    {file: '/path/to/your/mymodal.js', module: 'MYMODULE'},
    {file: '/path/to/your/module.js', module: 'MODAL_MODULE'},
],
````

It will only load one time in BG process and after he loads all dependencies it initiates.

# Advanced Usage

Sometimes you want to pass some arguments in the constructor to a module, you can also do that with JSBooty
````
# /path/js/my_modules/my_product.js
MY_PRODUCT = {

  init: function(product) {
    this.product = product
  }
}

# product.html.twig
product = {id: 1, name: "product", stock: 10};
APP.init();
APP.loadModule([
  {module: MY_PRODUCT, args: [product]}
]);
````

# How to Install JSBooty

Include the JSBooty in your head
````
<script src="/path/to/jsbooty/app.js' type="text/javascript"></script>
````

Init and load the modules you are going to use
````
APP.init()
APP.loadmodule([
   'NAME_MODULE'
   {module: 'NAME_MODULE', args: ['argument1', {option_1: true}]}
])
````
