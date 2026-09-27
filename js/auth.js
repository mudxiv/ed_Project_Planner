const registerForm = document.getElementById("register-form");
const loginForm = document.getElementById("login-form");


/* =========================
   REGISTER
========================= */

if (registerForm) {

    registerForm.addEventListener("submit", async function (event) {

        event.preventDefault();

        const email = document.getElementById("email").value;
        const password = document.getElementById("password").value;
        const message = document.getElementById("message");

        const { data, error } = await supabaseClient.auth.signUp({
            email: email,
            password: password
        });

        if (error) {
            message.textContent = error.message;
            return;
        }

        message.textContent = "Account created successfully!";

        console.log("Registered user:", data.user);
    });
}


/* =========================
   LOGIN
========================= */

if (loginForm) {

    loginForm.addEventListener("submit", async function (event) {

        event.preventDefault();

        const email = document.getElementById("email").value;
        const password = document.getElementById("password").value;
        const message = document.getElementById("message");

        const { data, error } = await supabaseClient.auth.signInWithPassword({
            email: email,
            password: password
        });

        if (error) {
            message.textContent = error.message;
            return;
        }

        message.textContent = "Login successful!";

        window.location.href = "dashboard.html";

        console.log("Logged in user:", data.user);
    });
}
