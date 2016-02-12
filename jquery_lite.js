(function(){

  window.$l = function(arg){

    var NodeList;

    if(arg instanceof HTMLElement){
      NodeList = arg;
    } else{
      NodeList = Array.from(document.querySelectorAll(arg));
    }

    var collection = new DOMNodeCollection(NodeList);
    return collection;
  };

  function DOMNodeCollection (array) {
    this.array = array;
  }

  DOMNodeCollection.prototype.html = function (string) {

    if (string) {
      for (var i = 0; i < this.array.length; i++) {
        this.array[i].innerHTML = string;
      }
    } else {
      return this.array[0].innerHTML;
    }

  };

  DOMNodeCollection.prototype.empty = function () {
    this.html("");
  };

  DOMNodeCollection.prototype.append = function (toAdd) {

    if(typeof toAdd === "string"){
      this.array.forEach(function(el){
          el.innerHTML += toAdd;
      });
    } else if (toAdd instanceof HTMLElement){
      this.array.forEach(function(el){
          el.innerHTML += toAdd.outerHTML;
      });
     } else {
       for (var i = 0; i < toAdd.array.length; i++) {
         this.array.forEach(function(el) {
             el.innerHTML += toAdd.array[i].outerHTML;
         } );
       }
    }

  };

  DOMNodeCollection.prototype.attr = function (attrName) {
    return this.array.firstChild.getAttribute(attrName);
  };

  DOMNodeCollection.prototype.addClass = function (value) {
    for (var i = 0; i < this.array.length; i++) {
      this.array[i].classList.add(value);
    }
  };

  DOMNodeCollection.prototype.removeClass = function (classes) {
    var classArray = classes.split(" ");

    for (var i = 0; i < this.array.length; i++) {
      classArray.forEach(function(el){
        this.array[i].classList.remove(el);
      }.bind(this));
    }

  };

  DOMNodeCollection.prototype.children = function() {
    var array = [];
    for (var i = 0; i < this.array.length; i++) {
      array.push(this.array[i].children);
    }
    return new DOMNodeCollection(array[0]);
  };

  DOMNodeCollection.prototype.parent = function() {
    var array = [];
    for (var i = 0; i < this.array.length; i++) {
      array.push(this.array[i].parentNode);
    }
    return new DOMNodeCollection(array);
  };

  DOMNodeCollection.prototype.find = function(search) {
    var children = this.children();
    var result = [];
    // children.array.forEach(function(el){
    //   result.push(el.querySelectorAll(search));
    // });
    return children.array;
  };

  DOMNodeCollection.prototype.remove = function() {
    var array = [];
    for (var i = 0; i < this.array.length; i++) {
      array.push(this.array[i].parentNode);
    }
    return array;
  };

})();
