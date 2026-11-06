// 1. Grab all the HTML elements we need to talk to
const taskInput = document.getElementById('taskInput');
const addTaskBtn = document.getElementById('addTaskBtn');
const taskList = document.getElementById('taskList');
const taskCounter = document.getElementById('taskCounter');
const errorMessage = document.getElementById('errorMessage');
const clearCompletedBtn = document.getElementById('clearCompletedBtn');

const filterAll = document.getElementById('filterAll');
const filterActive = document.getElementById('filterActive');
const filterCompleted = document.getElementById('filterCompleted');

// We will use this variable to remember which tab is currently selected
let currentFilter = 'all';

// 2. Handle adding a new task when the button is clicked
addTaskBtn.addEventListener('click', function() {
    
    // Grab the text and remove any accidental spaces at the beginning or end
    let taskText = taskInput.value.trim();

    // Task 6: Stop the user if they try to submit a blank task[cite: 4]
    if (taskText === "") {
        errorMessage.classList.remove('d-none'); // Show the error
        return; // Stop the function right here
    }
    
    // If the text is valid, hide the error message
    errorMessage.classList.add('d-none'); 

    // Build the main list item (the <li> tag)
    let li = document.createElement('li');
    li.className = 'list-group-item task-item d-flex justify-content-between align-items-center';
    li.dataset.status = 'active'; // We tag it as 'active' by default

    // Build a container for the checkbox and the task text
    let leftSideContainer = document.createElement('div');
    
    // Create the checkbox
    let checkbox = document.createElement('input');
    checkbox.type = 'checkbox';
    checkbox.className = 'form-check-input me-2';
    
    // Create the text element
    let span = document.createElement('span');
    span.className = 'task-text';
    span.innerText = taskText;

    // Put the checkbox and text into their container
    leftSideContainer.appendChild(checkbox);
    leftSideContainer.appendChild(span);

    // Task 5: Create the red delete button[cite: 3]
    let deleteBtn = document.createElement('button');
    deleteBtn.className = 'btn btn-danger btn-sm';
    deleteBtn.innerText = 'Delete';

    // Assemble the whole row
    li.appendChild(leftSideContainer);
    li.appendChild(deleteBtn);

    // Task 4: Listen for when the user clicks the checkbox[cite: 2]
    checkbox.addEventListener('change', function() {
        if (checkbox.checked) {
            li.classList.add('completed-task'); // Adds the strikethrough CSS
            li.dataset.status = 'completed';
        } else {
            li.classList.remove('completed-task'); // Removes the strikethrough CSS
            li.dataset.status = 'active';
        }
        
        // Update the counter and filters every time a checkbox is clicked
        updateCounter();
        applyFilter(); 
    });

    // Listen for when the user clicks the delete button
    deleteBtn.addEventListener('click', function() {
        li.remove(); // Removes the item from the screen
        updateCounter(); // Recalculate the remaining tasks
    });

    // Task 3: Finally, add our newly built task to the list on the screen[cite: 2]
    taskList.appendChild(li);
    
    // Clear the input box so the user can type the next task[cite: 2]
    taskInput.value = "";
    
    // Run these to make sure our math and filters are up to date
    updateCounter();
    applyFilter();
});

// Task 8: Count how many tasks are still active[cite: 4]
function updateCounter() {
    let allTasks = taskList.children; // Get every task on the screen
    let activeCount = 0;
    
    // Standard loop to check each task one by one
    for (let i = 0; i < allTasks.length; i++) {
        if (allTasks[i].dataset.status === 'active') {
            activeCount++;
        }
    }
    
    // Update the text on the screen
    taskCounter.innerText = activeCount + " remaining";
}

// Task 8: Remove all completed tasks at once[cite: 4]
clearCompletedBtn.addEventListener('click', function() {
    let allTasks = taskList.children;
    
    // We loop backwards when deleting items to avoid messing up the index order
    for (let i = allTasks.length - 1; i >= 0; i--) {
        if (allTasks[i].dataset.status === 'completed') {
            allTasks[i].remove();
        }
    }
});

// Task 7: Update our filter variable when the user clicks a tab[cite: 4]
filterAll.addEventListener('change', function() { 
    currentFilter = 'all'; 
    applyFilter(); 
});
filterActive.addEventListener('change', function() { 
    currentFilter = 'active'; 
    applyFilter(); 
});
filterCompleted.addEventListener('change', function() { 
    currentFilter = 'completed'; 
    applyFilter(); 
});

// Run through the list and hide/show tasks based on the selected tab
function applyFilter() {
    let allTasks = taskList.children;
    
    for (let i = 0; i < allTasks.length; i++) {
        let task = allTasks[i];
        
        if (currentFilter === 'all') {
            task.style.setProperty('display', 'flex', 'important'); 
        } 
        else if (currentFilter === 'active') {
            if (task.dataset.status === 'completed') {
                task.style.setProperty('display', 'none', 'important'); // Hide it
            } else {
                task.style.setProperty('display', 'flex', 'important'); // Show it
            }
        } 
        else if (currentFilter === 'completed') {
            if (task.dataset.status === 'completed') {
                task.style.setProperty('display', 'flex', 'important'); // Show it
            } else {
                task.style.setProperty('display', 'none', 'important'); // Hide it
            }
        }
    }
}