//IIFE to make it private and return an empty object of its method which is made public
//Creates new scope which is not accessbile from outside scope 


var budgetController = (function () {
    
    var x = 5;
    var add = function(a) {
        return a + x;
    }
    
    return {
        publicTest: function(b) {
            return add(b);
        }
    }
    
})();

var UIController = (function() {
    
    //some code 
    
})();


var controller = (function(budgetCtrl, UICtrl) {
    
    var z = budgetCtrl.publicTest(10);
    
    return {
        anotherPublic: function() {
            console.log(z);
        }
    }
    
})(budgetController, UIController);









































