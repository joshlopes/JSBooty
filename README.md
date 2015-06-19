# JSBooty
JSBooty is a very light weight javascript - meant to be light reusable for small / medium projects.

JSBooty will handle your dependencies among all your module and will load them in Background.

# Simple Usage

Lets suppose we have two modules - POPOVER and PRODUCT, the PRODUCT module will load some content using POPOVER's methods / functions so its dependable.

````
PRODUCT = {
    wrapper: '',
    requires: ['POPOVER'], // It requires the POPOVER module
    options: {},
    
    init: function(wrapper, options)
    {
        // Your Code here
    }
}
````

When you initiate the PRODUCT module, JSBooty will also load POPOVER module and all POPOVER dependencies, everything is done in the background. You should add all your dependencies to requires array of each module

````
MYMODULE.requires.push('MODAL_MODULE'); // Avoid doing this!
````

Dont forget to add your modules to the app.js module stack:

````
# https://github.com/joshlopes/JSBooty/blob/master/app.js#L9
modules: [
    {file: '/path/to/your/mymodal.js', module: 'MYMODULE'},
    {file: '/path/to/your/module.js', module: 'MODAL_MODULE'},
],
````

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
