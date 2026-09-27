const userInfo = document.getElementById("user-info");


/* =========================
   CHECK USER
========================= */

async function checkUser() {

    const { data: { user }, error } =
        await supabaseClient.auth.getUser();

    if (error) {

        console.error("Auth error:", error);

        window.location.href = "login.html";

        return;
    }

    if (!user) {

        window.location.href = "login.html";

        return;
    }

    console.log("Authenticated user:", user);
    console.log("User ID:", user.id);

    if (userInfo) {

        userInfo.textContent =
            `Logged in as: ${user.email}`;

    }
}

checkUser();


/* =========================
   LOGOUT
========================= */

const logoutButton =
    document.getElementById("logout-button");

if (logoutButton) {

    logoutButton.addEventListener("click", async function () {

        const { error } =
            await supabaseClient.auth.signOut();

        if (error) {

            console.error("Logout error:", error);

            return;
        }

        window.location.href = "login.html";

    });

}


/* =========================
   CREATE TASK ELEMENTS
========================= */

const newTaskButton =
    document.getElementById("new-task-button");

const taskFormContainer =
    document.getElementById("task-form-container");

const taskForm =
    document.getElementById("task-form");

const cancelTaskButton =
    document.getElementById("cancel-task-button");

const taskMessage =
    document.getElementById("task-message");


/* =========================
   SHOW TASK FORM
========================= */

if (newTaskButton) {

    newTaskButton.addEventListener("click", function () {

        taskFormContainer.style.display = "block";

    });

}


/* =========================
   HIDE TASK FORM
========================= */

if (cancelTaskButton) {

    cancelTaskButton.addEventListener("click", function () {

        taskFormContainer.style.display = "none";

        taskForm.reset();

        taskMessage.textContent = "";

    });

}


/* =========================
   CREATE TASK
========================= */

if (taskForm) {

    taskForm.addEventListener("submit", async function (event) {

        event.preventDefault();


        /* Get form values */

        const title =
            document.getElementById("title").value;

        const description =
            document.getElementById("description").value;

        const status =
            document.getElementById("status").value;

        const priority =
            document.getElementById("priority").value;

        const dueDate =
            document.getElementById("due_date").value;


        /* Get authenticated user */

        const { data: { user }, error: userError } =
            await supabaseClient.auth.getUser();

        if (userError || !user) {

            console.error(
                "Could not get authenticated user:",
                userError
            );

            window.location.href = "login.html";

            return;
        }


        /* Insert task */

        const { data, error } =
            await supabaseClient
                .from("tasks")
                .insert([
                    {
                        user_id: user.id,
                        title: title,
                        description: description,
                        status: status,
                        priority: priority,
                        due_date: dueDate
                    }
                ])
                .select();


        /* Handle error */

        if (error) {

            console.error(
                "Task creation error:",
                error
            );

            taskMessage.textContent =
                error.message;

            return;
        }


        /* Success */

        console.log(
            "Created task:",
            data
        );

        taskMessage.textContent =
            "Task created successfully!";

        taskForm.reset();


        /* Refresh task list */

        loadTasks();

    });

}


/* =========================
   LOAD TASKS
========================= */

async function loadTasks() {

    const taskList =
        document.getElementById("task-list");

    if (!taskList) {
        return;
    }


    /* Get authenticated user */

    const { data: { user }, error: userError } =
        await supabaseClient.auth.getUser();

    if (userError || !user) {

        console.error(
            "Could not get user:",
            userError
        );

        return;
    }


    /* Get user's tasks */

    const { data: tasks, error } =
        await supabaseClient
            .from("tasks")
            .select("*")
            .eq("user_id", user.id)
            .order("created_at", {
                ascending: false
            });


    /* Handle database error */

    if (error) {

        console.error(
            "Error loading tasks:",
            error
        );

        taskList.innerHTML =
            "<p>Could not load tasks.</p>";

        return;
    }


    /* No tasks */

    if (tasks.length === 0) {

        taskList.innerHTML =
            "<p>No tasks yet.</p>";

        return;
    }


    /* Clear existing tasks */

    taskList.innerHTML = "";


    /* Display tasks */

    tasks.forEach(function (task) {

        const taskElement =
            document.createElement("div");

        taskElement.classList.add("task-card");


        taskElement.innerHTML = `
            <h3>${task.title}</h3>

            <p>
                ${task.description || ""}
            </p>

            <p>
                <strong>Status:</strong>
                ${task.status}
            </p>

            <p>
                <strong>Priority:</strong>
                ${task.priority}
            </p>

            <p>
                <strong>Due:</strong>
                ${task.due_date || "No due date"}
            </p>

            <button
                class="edit-task-button"
                data-id="${task.id}">
                Edit
            </button>

            <button
                class="delete-task-button"
                data-id="${task.id}">
                Delete
            </button>
        `;


        taskList.appendChild(taskElement);

    });

}


/* =========================
   UPDATE TASK
========================= */

async function updateTask(taskId) {

    const editButton =
        document.querySelector(
            `.edit-task-button[data-id="${taskId}"]`
        );

    if (!editButton) {
        return;
    }

    const taskCard =
        editButton.closest(".task-card");

    if (!taskCard) {
        return;
    }


    /* Get current task */

    const { data: task, error } =
        await supabaseClient
            .from("tasks")
            .select("*")
            .eq("id", taskId)
            .single();

    if (error) {

        console.error(
            "Error loading task for edit:",
            error
        );

        return;
    }


    /* Change card into edit mode */

    taskCard.innerHTML = `

        <label>
            Title:
            <input
                type="text"
                class="edit-title"
                value="${task.title || ""}">
        </label>

        <br><br>

        <label>
            Description:
            <textarea
                class="edit-description"
            >${task.description || ""}</textarea>
        </label>

        <br><br>

        <label>
            Status:

            <select class="edit-status">

                <option value="todo"
                    ${task.status === "todo" ? "selected" : ""}>
                    Todo
                </option>

                <option value="in-progress"
                    ${task.status === "in-progress" ? "selected" : ""}>
                    In Progress
                </option>

                <option value="completed"
                    ${task.status === "completed" ? "selected" : ""}>
                    Completed
                </option>

            </select>

        </label>

        <br><br>

        <label>
            Priority:

            <select class="edit-priority">

                <option value="low"
                    ${task.priority === "low" ? "selected" : ""}>
                    Low
                </option>

                <option value="medium"
                    ${task.priority === "medium" ? "selected" : ""}>
                    Medium
                </option>

                <option value="high"
                    ${task.priority === "high" ? "selected" : ""}>
                    High
                </option>

            </select>

        </label>

        <br><br>

        <label>
            Due Date:

            <input
                type="date"
                class="edit-due-date"
                value="${task.due_date || ""}">
        </label>

        <br><br>

        <button
            class="save-task-button"
            data-id="${task.id}">
            Save
        </button>

        <button
            class="cancel-edit-button"
            data-id="${task.id}">
            Cancel
        </button>

    `;

}


/* =========================
   SAVE UPDATED TASK
========================= */

async function saveTask(taskId) {

    const saveButton =
        document.querySelector(
            `.save-task-button[data-id="${taskId}"]`
        );

    if (!saveButton) {
        return;
    }

    const taskCard =
        saveButton.closest(".task-card");

    if (!taskCard) {
        return;
    }


    /* Get edited values */

    const title =
        taskCard
            .querySelector(".edit-title")
            .value
            .trim();

    const description =
        taskCard
            .querySelector(".edit-description")
            .value
            .trim();

    const status =
        taskCard
            .querySelector(".edit-status")
            .value;

    const priority =
        taskCard
            .querySelector(".edit-priority")
            .value;

    const dueDate =
        taskCard
            .querySelector(".edit-due-date")
            .value;


    /* Validate title */

    if (title === "") {

        alert("Task title cannot be empty.");

        return;
    }


    /* Update database */

    const { data, error } =
        await supabaseClient
            .from("tasks")
            .update({
                title: title,
                description: description,
                status: status,
                priority: priority,
                due_date: dueDate || null
            })
            .eq("id", taskId)
            .select();


    /* Handle error */

    if (error) {

        console.error(
            "Task update error:",
            error
        );

        alert(
            "Could not update task: " +
            error.message
        );

        return;
    }


    /* Success */

    console.log(
        "Updated task:",
        data
    );


    /* Reload task list */

    loadTasks();

}


/* =========================
   DELETE TASK
========================= */

async function deleteTask(taskId) {

    const confirmed =
        confirm("Are you sure you want to delete this task?");

    if (!confirmed) {
        return;
    }


    const { error } =
        await supabaseClient
            .from("tasks")
            .delete()
            .eq("id", taskId);


    if (error) {

        console.error(
            "Task deletion error:",
            error
        );

        return;
    }


    console.log(
        "Task deleted:",
        taskId
    );


    /* Reload tasks */

    loadTasks();

}


/* =========================
   EDIT / SAVE / CANCEL / DELETE BUTTONS
========================= */

document.addEventListener("click", function (event) {

    /* Edit */

    if (
        event.target.classList.contains(
            "edit-task-button"
        )
    ) {

        const taskId =
            event.target.dataset.id;

        updateTask(taskId);

    }


    /* Save */

    if (
        event.target.classList.contains(
            "save-task-button"
        )
    ) {

        const taskId =
            event.target.dataset.id;

        saveTask(taskId);

    }


    /* Cancel Edit */

    if (
        event.target.classList.contains(
            "cancel-edit-button"
        )
    ) {

        loadTasks();

    }


    /* Delete */

    if (
        event.target.classList.contains(
            "delete-task-button"
        )
    ) {

        const taskId =
            event.target.dataset.id;

        deleteTask(taskId);

    }

});


/* =========================
   INITIAL LOAD
========================= */

loadTasks();
