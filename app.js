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
    
    return {
        addItem: function(type, des, val) {
            
            var newItem, ID;
            
            // [1,2,3,4], next ID = 5
            //ID = last ID + 1
            
            //Create new ID
            if (data.allItems[type].length > 0) {
                ID = data.allItems[type][data.allItems[type].length - 1].id + 1;
            } else {
                ID = 0;
            }
            
            
            
            // Create new item based on item based on 'Inc' or 'exp type
            if (type === 'exp') {
                newItem = new Expense(ID, des, val);
            } else if (type === 'inc') {
                newItem = new  Income(ID, des, val);     
            }
            
            //Push it into our data structure
            data.allItems[type].push(newItem);
            
            //Return the new element
            return newItem;
        }, 
        
        //This is to test data on console
//        testData: function() {
//            console.log(data);
//        }
    }
    
    
    
    
})();



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
        var input, newItem;
        
        // 1. Get the field input data from the user 
        input = UICtrl.getInput();
        
        // 2. Add the items to UI
        newItem = budgetCtrl.addItem(input.type, input.description, input.value);
        
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







































