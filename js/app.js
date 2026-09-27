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
        userInfo.textContent = `Logged in as: ${user.email}`;
    }
}

checkUser();


/* =========================
   LOGOUT
========================= */

const logoutButton = document.getElementById("logout-button");

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
   CREATE TASK
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
   SUBMIT TASK
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


        /* Get current session */

        const { data: { session }, error: sessionError } =
            await supabaseClient.auth.getSession();


        /* Debug authentication */

        console.log("========== TASK DEBUG ==========");
        console.log("Auth user ID:", user.id);
        console.log("Session user ID:", session?.user?.id);
        console.log(
            "IDs match:",
            user.id === session?.user?.id
        );
        console.log("Session exists:", !!session);
        console.log("================================");


        if (sessionError) {

            console.error(
                "Session error:",
                sessionError
            );

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


        /* Handle database error */

        if (error) {

            console.error(
                "Task creation error:",
                error
            );

            taskMessage.textContent =
                error.message;

            return;
        }


        /* Successful task creation */

        console.log(
            "Created task:",
            data
        );

        taskMessage.textContent =
            "Task created successfully!";

        taskForm.reset();

    });

}
