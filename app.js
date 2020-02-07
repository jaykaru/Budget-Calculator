//IIFE to make it private and return an empty object of its method which is made public
//Creates new scope which is not accessbile from outside scope 

//BUDGET CONTROLLER 
var budgetController = (function () {
    
    // some code 
    
})();

//UI CONTROLLER 
var UIController = (function() {
    
    return {
        getInput: function() {
            return {
                type: document.querySelector('.add__type').value, // will be either inc or exp
                description: document.querySelector('.add__description').value,
                value: document.querySelector('.add__value').value
            }
        }
    }
    
})();


//GLOBAL APP CONTROLLER 
var controller = (function(budgetCtrl, UICtrl) {
    
    var ctrlAddEvent = function() {
        
        // 1. Get the field input data from the user 
        // 2. Add the items to UI
        // 3. Add the items to budget calculator
        // 4. calculate the budget 
        // 5. Display the budget on UI
        
        console.log('test event');    
    };
    
    document.querySelector('.add__btn').addEventListener('click', ctrlAddEvent);
    
    
    document.addEventListener('keypress', function(event) {
        if (event.keyCode === 13) { 
            ctrlAddEvent();
        }
        
        
    })
    
    
})(budgetController, UIController);









































