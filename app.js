//IIFE to make it private and return an empty object of its method which is made public
//Creates new scope which is not accessbile from outside scope 

//BUDGET CONTROLLER 
var budgetController = (function () {
    
    //function constructor
    var Expense = function(id, description, value) {
        this.id = id;
        this.description = description;
        this.value = value;
    };
    
     var Income = function(id, description, value) {
        this.id = id;
        this.description = description;
        this.value = value;
    };
    
    //data structure
    var allExpenses = [];
    var allIncomes = [];
    var totalExpenses = 0;
    var totalIncomes = 0;
    
    //to have a simplified data structure create an object 
    var data = {
        allItems: {
            exp: [],
            inc: []
        },
        totals: {
            exp: 0,
            inc: 0
        }
    }
    
    
    
    
})();

//just for testing on console
var Income = function(id, description, value) {
        this.id = id;
        this.description = description;
        this.value = value;
    };

//UI CONTROLLER 
var UIController = (function() {
    
   var DOMStrings = {
       inputType: '.add__type',
       inputDescription: '.add__description',
       inputValue: '.add__value',
       inputBtn: '.add__btn'
   }
    return {
        getInput: function() {
            return {
                type: document.querySelector(DOMStrings.inputType).value, // will be either inc or exp
                description: document.querySelector(DOMStrings.inputDescription).value,
                value: document.querySelector(DOMStrings.inputValue).value
            }
        },
        getDOMString: function() {
            return DOMStrings;
        
        }
    }
    
    
})();


//GLOBAL APP CONTROLLER 
var controller = (function(budgetCtrl, UICtrl) {
    
    var setupEventListener = function () {
         var DOM = UICtrl.getDOMString();
         document.querySelector(DOM.inputBtn).addEventListener('click', ctrlAddEvent);
         document.addEventListener('keypress', function(event) {
            if (event.keyCode === 13) { 
                ctrlAddEvent();
            }    
         }) 
    }
       
    var ctrlAddEvent = function() {
        
        // 1. Get the field input data from the user 
        var input = UICtrl.getInput();
        
        // 2. Add the items to UI
        // 3. Add the items to budget calculator
        // 4. calculate the budget 
        // 5. Display the budget on UI       
    };
    
    return {
        //initialisation 
        init: function() {
            console.log('Application has started');
            setupEventListener();
        }
    }
      
})(budgetController, UIController);

controller.init();







































