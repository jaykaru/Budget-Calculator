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
        testData: function() {
            console.log(data);
        }
    }
    
    
    
    
})();



//UI CONTROLLER 
var UIController = (function() {
    
   var DOMStrings = {
       inputType: '.add__type',
       inputDescription: '.add__description',
       inputValue: '.add__value',
       inputBtn: '.add__btn',
       incomeContainer: '.income__list',
       expensesContainer: '.expenses__list'
   }
    return {
        getInput: function() {
            return {
                type: document.querySelector(DOMStrings.inputType).value, // will be either inc or exp
                description: document.querySelector(DOMStrings.inputDescription).value,
                value: parseFloat(document.querySelector(DOMStrings.inputValue).value)
            }
        },
        addListItems : function(obj, type) {
            var element, html, newHtml;
            
            //Create HTML string with placeholder text
            
            if (type === 'inc') {
                
                element = DOMStrings.incomeContainer;
                
                html = '<div class="item clearfix" id="income-%id%"><div class="item__description">%description%</div><div class="right clearfix"><div class="item__value">%value%</div><div class="item__delete"><button class="item__delete--btn"><i class="ion-ios-close-outline"></i></button></div></div></div>';
                
            } else if (type === 'exp') {
                element = DOMStrings.expensesContainer;   
                
                html = '<div class="item clearfix" id="expense-%id%"><div class="item__description">%description%</div><div class="right clearfix"><div class="item__value">%value%</div><div class="item__percentage">21%</div><div class="item__delete"><button class="item__delete--btn"><i class="ion-ios-close-outline"></i></button></div></div></div>';
            }
            
            //Replace the placeholder text  with some actual data
            
            newHtml = html.replace('%id%', obj.id);
            newHtml = newHtml.replace('%description%', obj.description);
            newHtml = newHtml.replace('%value%', obj.value);
            
            //Insert the HTML into the DOM 
            document.querySelector(element).insertAdjacentHTML('beforeend', newHtml);
        },
        clearFields: function() {
            var fields, fieldsArray;
            
            fields = document.querySelectorAll(DOMStrings.inputDescription + ',' + DOMStrings.inputValue);
                        
                        //change list to array
            fieldsArray = Array.prototype.slice.call(fields);
                        //foreach loops through the array and callback fn have acces to those arguments
            fieldsArray.forEach(function(current, index, array) {
                current.value = "";
            });
            
            fieldsArray[0].focus();
            
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
    
    var updateBudget = function() {
        // 1. calculate the budget 
        
        // 2. Return the budget
        
        // 3. Display the budget on UI  
    }
       
    var ctrlAddEvent = function() {
        var input, newItem;
        
        // 1. Get the field input data from the user 
        input = UICtrl.getInput();
        
        var letters = /^[A-Za-z]+$/;
        
        if (input.description.match(letters) && input.description !== "" && !isNaN(input.value) && input.value > 0 ) {
            // 2. Add the items to budget calculator
            newItem = budgetCtrl.addItem(input.type, input.description, input.value);
        
            // 3. Add the items to UI
            UICtrl.addListItems(newItem, input.type);
        
            // 4. Clear the fields
            UICtrl.clearFields();
        
            //5. Calculate and Update Budget 
            updateBudget();
        }
        
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







































