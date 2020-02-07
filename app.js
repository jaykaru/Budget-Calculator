//IIFE to make it private and return an empty object of its method which is made public
//Creates new scope which is not accessbile from outside scope 

//BUDGET CONTROLLER 
var budgetController = (function () {
    
    // some code 
    
})();

//UI CONTROLLER 
var UIController = (function() {
    
    //some code 
    
})();


//GLOBAL APP CONTROLLER 
var controller = (function(budgetCtrl, UICtrl) {
    
    var ctrlAddEvent = function() {
        
        // 1. Get the field data from the user 
        // 2. Add the items to UI
        // 3. Add the items to budget calculator
        // 4. calculate the budget 
        // 5. Add the items to budget UI
        console.log('test event');    
    };
    
    document.querySelector('.add__btn').addEventListener('click', ctrlAddEvent);
    
    
    document.addEventListener('keypress', function(event) {
        if (event.keyCode === 13) { 
            ctrlAddEvent();
        }
        
        
    })
    
    
})(budgetController, UIController);









































