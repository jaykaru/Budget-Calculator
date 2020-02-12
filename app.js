//IIFE to make it private and return an empty object of its method which is made public
//Creates new scope which is not accessbile from outside scope 

//BUDGET CONTROLLER 
var budgetController = (function () {
    
    //function constructor
    var Expense = function(id, description, value) {
        this.id = id;
        this.description = description;
        this.value = value;
        this.percentage = -1;
    };
    
     var Income = function(id, description, value) {
        this.id = id;
        this.description = description;
        this.value = value;
    };
    
    //added to protoype so all object can access to it 
    Expense.prototype.calcPercent = function (totalIncome) {
        
        if (totalIncome > 0) {
             this.percentage = Math.round((this.value / totalIncome) * 100); 
        } else {
             this.percentage = -1;
        }  
    };
    
    Expense.prototype.getPercent = function() {
        return this.percentage;
    };
    
    //calculate total
    var calculateTotal = function(type) {
        var sum;
        sum = 0;
        data.allItems[type].forEach(function(current) {
            sum += current.value;
        });
        data.totals[type] = sum;
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
        },
        budget: 0,
        percentage: -1 // -1 means percentage not exists
    };
    
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
        
        deleteItem: function(type, id) {
            var ids, index;
            //id = 6;
            //data.allItems[type].id; , this will go in order but we wanted to select any id selcted to delte 
            // ids = [2,4,6,8]
            // index = 2
            //map method will create a new array with same lenghth of old array
            ids = data.allItems[type].map(function(current) {
                        return current.id; 
            });
            
            
            index = ids.indexOf(id);
            
            if (index !== -1) {
                data.allItems[type].splice(index, 1);
            }
                    
        },
        
        calculateBudget: function() {
            //calculate total income and expenses 
            calculateTotal('inc');
            calculateTotal('exp');
            
            //calculate the budget: income - expenses
            data.budget = data.totals.inc - data.totals.exp;
            
            //calculate the percentage of income we spent
            // Ex Expenses 100 and Income 200 50% spent  100/200 * 100
            if (data.totals.inc > 0) {
                data.percentage = Math.round((data.totals.exp / data.totals.inc) * 100);
            } else {
                data.percentage = -1;
            }
            
        },
        
        calculatePercentage: function() {
            /*
            Expenses 
            a = 10
            b = 20
            c = 30
            income = 100
            percentage
            --------
            a = 10/100
            b = 20/100
            c = 30/100
            */
            
            data.allItems.exp.forEach(function(current) {
                current.calcPercent(data.totals.inc);
                
            });
        },
        
        getPercentage : function() {
            var allPerc = data.allItems.exp.map(function(current) {
                return current.getPercent();
            });
            
            return allPerc;
        },
        
        getBudget: function() {
            return {
                budget: data.budget,
                totalInc: data.totals.inc,
                totalExp: data.totals.exp,
                percentage: data.percentage
            }
        }
         ,
        
        
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
       expensesContainer: '.expenses__list',
       budgetLabel: '.budget__value',
       incomeLabel: '.budget__income--value',
       expensesLabel: '.budget__expenses--value',
       percentageLabel: '.budget__expenses--percentage',
       container: '.container',
       expensePercentageLabel: '.item__percentage',
       dateLabel: '.budget__title--month'
   }
   
   var formatNumber = function(num, type) {
            
            var numSplit, int, dec;
            
            /*
            + or - before number 
            exactly 2 decimal 
            comma separating the thousands 
            23,456.34
            
            
            */
            
            num = Math.abs(num);
            num = num.toFixed(2);
            numSplit = num.split('.');
            int = numSplit[0];
            if (int.length > 3) {
                int = int.substr(0, int.length - 3) + ',' + int.substr(int.length - 3, 3);
            }
            
            dec = numSplit[1];
            
            return (type === 'inc' ? '+' : '-') + ' ' + int + '.'  + dec; 
            
            
    };
    
    var nodeListForEach = function(list, callback) {
                for (var i = 0; i < list.length; i++) {
                    callback(list[i], i);
                }  
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
                
                html = '<div class="item clearfix" id="inc-%id%"><div class="item__description">%description%</div><div class="right clearfix"><div class="item__value">%value%</div><div class="item__delete"><button class="item__delete--btn"><i class="ion-ios-close-outline"></i></button></div></div></div>';
                
            } else if (type === 'exp') {
                element = DOMStrings.expensesContainer;   
                
                html = '<div class="item clearfix" id="exp-%id%"><div class="item__description">%description%</div><div class="right clearfix"><div class="item__value">%value%</div><div class="item__percentage">21%</div><div class="item__delete"><button class="item__delete--btn"><i class="ion-ios-close-outline"></i></button></div></div></div>';
            }
            
            //Replace the placeholder text  with some actual data
            
            newHtml = html.replace('%id%', obj.id);
            newHtml = newHtml.replace('%description%', obj.description);
            newHtml = newHtml.replace('%value%', formatNumber(obj.value, type));
            
            //Insert the HTML into the DOM 
            document.querySelector(element).insertAdjacentHTML('beforeend', newHtml);
        },
        
        deleteListItems: function(selectorID) {
            
            var el =  document.getElementById(selectorID);
                el.parentNode.removeChild(el);
            
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
        
        displayBudget: function(obj) {
            var type;
            
//           obj.budget > 0 ? type ='inc' : type = 'exp';
            if (obj.budget > 0)  {
                type = 'inc';
            } else {
                type = 'exp';
            }
            
            document.querySelector(DOMStrings.budgetLabel).textContent = formatNumber(obj.budget, type);
            document.querySelector(DOMStrings.incomeLabel).textContent = formatNumber(obj.totalInc, 'inc');
            document.querySelector(DOMStrings.expensesLabel).textContent = formatNumber(obj.totalExp, 'exp');
            
            if (obj.percentage > 0) { 
                document.querySelector(DOMStrings.percentageLabel).textContent = obj.percentage + '%'; 
            } else {
               document.querySelector(DOMStrings.percentageLabel).textContent = '--'; 
            }    
        },
        
        displayPercentage: function(percentage) {
            
            var fields = document.querySelectorAll(DOMStrings.expensePercentageLabel);
            
            
            nodeListForEach(fields, function(current, index) {
                
                if (percentage[index] > 0 ) {
                    current.textContent = percentage[index] + '%';
                } else {
                    current.textContent = '--';
                }
                   
            });
            
        },
        
        displayDate: function() {
            
            var now, month, months, year;
            now = new Date();
            //var christmas = new Date(2020, 2, 12);
            month = now.getMonth();
            year = now.getFullYear();
            months = ['Jan','Feb','Mar','Apr','May','June','July','Aug','Sep','Oct','Nov','Dec'];
            
            document.querySelector(DOMStrings.dateLabel).textContent = months[month] + ' ' + year;
            
            
            
        },
        
        changeType: function() {
            var fields;
            
            fields =  document.querySelectorAll(
                DOMStrings.inputType + ',' + 
                DOMStrings.inputDescription + ',' + 
                DOMStrings.inputValue);
            
            nodeListForEach(fields, function(current) {
                current.classList.toggle('red-focus');
            });
            
            document.querySelector(DOMStrings.inputBtn).classList.toggle('red');
            
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
        
        document.querySelector(DOM.container).addEventListener('click', ctrlDeleteItem);
        
        document.querySelector(DOM.inputType).addEventListener('change', UICtrl.changeType);
    };
    
    //this is called each time a new item added
    var updateBudget = function() {
        // 1. calculate the budget 
        budgetCtrl.calculateBudget()
        
        // 2. Return the budget
        var budget = budgetCtrl.getBudget();
        
        // 3. Display the budget on UI  
        UICtrl.displayBudget(budget);
    };
    
    var updatePercentage = function() {
        //1. Calculate percentages
        budgetCtrl.calculatePercentage();
        //2. Read percentage from budget controller
        var percentage = budgetCtrl.getPercentage();
        //3. Update the UI with new percentages
        //console.log(percentage);
        UICtrl.displayPercentage(percentage);
    };
       
    var ctrlAddEvent = function() {
        var input, newItem;
        
        // 1. Get the field input data from the user 
        input = UICtrl.getInput();
        
//        var letters = /^[A-Za-z]+$/;
//        input.description.match(letters)
        
        if ( isNaN(input.description) && input.description !== "" && !isNaN(input.value) && input.value > 0 ) {
            // 2. Add the items to budget calculator
            newItem = budgetCtrl.addItem(input.type, input.description, input.value);
        
            // 3. Add the items to UI
            UICtrl.addListItems(newItem, input.type);
        
            // 4. Clear the fields
            UICtrl.clearFields();
        
            //5. Calculate and Update Budget 
            updateBudget();
            
            //6. Calculate and update percentages 
            updatePercentage();
        }
        
    };
    
    var ctrlDeleteItem = function(event) {
        var itemID, splitID, type, ID;
        
        itemID = event.target.parentNode.parentNode.parentNode.parentNode.id;
        console.log(itemID);
        
        if (itemID) {
            
            //inc-1
            splitID = itemID.split('-');
            //because after split it becomes an array splitid[0] will get you the type and id separate
            type = splitID[0];
            ID = parseInt(splitID[1]);
            
            // 1. Delete the item from data structure
            budgetCtrl.deleteItem(type, ID);
            
            // 2. Delete the item from UI
            UICtrl.deleteListItems(itemID);
            
            // 3. Update the budget
            updateBudget();
            
            //4. Calculate and update percentages 
            updatePercentage();
        }
         
    };
    
    return {
        //initialisation 
        init: function() {
            console.log('Application has started');
            UICtrl.displayDate();
            UICtrl.displayBudget({ 
                budget: 0,
                totalInc: 0,
                totalExp: 0,
                percentage: 0 
            });
            setupEventListener();
        }
    }
      
})(budgetController, UIController);

controller.init();







































