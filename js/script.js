/*eslint-env browser*/

//GLOBAL VARIABLES:
var storage;
var list = "";
var task;
var tasks = [];

// GET DOM ELEMENTS
var $ = function (id) {
    "use strict";
    return window.document.getElementById(id);
};

function displayTaskList() {
    "use strict";
    //IF THERE ARE NO TASKS IN TASKS ATTAY< CHECK STORAGE
    if (tasks.length === 0) {
        //GET TASKS FROM STORAGE OR EMPTY STRING
        storage = localStorage.getItem("tasks") || "";
        // IF NOT EMPTY, SPLIT ARRAY TO STRING AND STORE IN GLOBAL VARIABLE
        if (storage.length > 0) {
            tasks = storage.split("|");
        }
    }
    
    //IF THERE ARE TASKS IN THE ARRAY SORT AND CREATE TASKS STRING
    if (tasks.length > 0) {
        tasks.sort();
        list = tasks.join("\n");
    }
    $("task_list").value = list;
}

//ADD A TASK 
function addToTaskList() {
    "use strict";
    task = $("task");
    if (task.value === "") {
        window.alert("Please enter a task.");
    } else {
        // ADD TASK STO ARRAY AND ADD TO LOCAL STORAGE
        tasks.push(task.value);   //check the plural at the first task on this line.
        localStorage.tasks = tasks.join("|");
        //CLEAR TEXT BOX AND UPDATE TASK LIST
        task.value = "";
        displayTaskList();
    }
}

//CLEAR TASK LIST
function clearTaskList() {
    "use strict";
    tasks.length = 0;
    localStorage.tasks = "";
    $("task_list").value = "";
}

//WIRE UP EVENT HANDLERS AND DISPLAY TASK LIST
window.addEventListener("load", function () {
    "use strict";
    $("add_task").addEventListener("click", addToTaskList);
    $("clear_tasks").addEventListener("click", clearTaskList);
    displayTaskList();
});
