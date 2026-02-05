// Replace with your Render backend URL after deployment
// For local testing: http://127.0.0.1:8000
// For Render: https://fullstack-backend.onrender.com
const API = "https://fullstack-backend.onrender.com";

const ADMIN_KEY = "zuheer123";

function getAuthHeaders() {
    const key = sessionStorage.getItem("auth");
    if (!key) return {};
    return {
        "X-API-Key": key
    };
}

/* ---------- DOM REFERENCES ---------- */
const profileView = document.getElementById("profileView");
const skills = document.getElementById("skills");
const projects = document.getElementById("projects");

const pName = document.getElementById("pName");
const pEmail = document.getElementById("pEmail");
const pEdu = document.getElementById("pEdu");

const skillName = document.getElementById("skillName");
const skillProf = document.getElementById("skillProf");

const projTitle = document.getElementById("projTitle");
const projDesc = document.getElementById("projDesc");
const projLink = document.getElementById("projLink");

function login() {
    const key = prompt("Enter admin key:");
    if (key === ADMIN_KEY) {
        sessionStorage.setItem("auth", key);
        alert("Logged in as Admin");
        updateUI();
    } else {
        alert("Invalid key");
    }
}

function logout() {
    sessionStorage.removeItem("auth");
    alert("Logged out");
    updateUI();
}

function updateUI() {
    const loggedIn = sessionStorage.getItem("auth");

    document.querySelectorAll(".edit-box").forEach(box => {
        box.style.display = loggedIn ? "block" : "none";
    });
  // Logout button
    const logoutBtn = document.getElementById("logoutBtn");
    if (logoutBtn) {
        logoutBtn.style.display = loggedIn ? "inline-block" : "none";
    }
    const badge = document.getElementById("adminBadge");
    if (badge) {
        badge.style.display = loggedIn ? "inline-block" : "none";
    }
}


/* ---------- TOGGLE SECTION ---------- */
function toggleSection(id) {
    const el = document.getElementById(id);
    if (el.style.display === "none" || el.style.display === "") {
        el.style.display = "block";
        return true;
    } else {
        el.style.display = "none";
        return false;
    }
}

/* ---------- PROFILE ---------- */
function toggleProfile() {
    loadProfile();
}

function loadProfile() {
    if (!toggleSection("profileView")) return;

    fetch(`${API}/profile`)
        .then(r => r.json())
        .then(p => {
            profileView.innerHTML = `
                <p><b>Name:</b> ${p.name}</p>
                <p><b>Email:</b> ${p.email}</p>
                <p><b>Education:</b> ${p.education}</p>
            `;
            pName.value = p.name || "";
            pEmail.value = p.email || "";
            pEdu.value = p.education || "";
        })
        .catch(err => {
            profileView.innerHTML = '<p><button onclick="createDefaultProfile()">Create Profile</button></p>';
        });
}

function createDefaultProfile() {
    fetch(`${API}/profile`, {
        method: "POST",
        headers: {"Content-Type":"application/json"},
        body: JSON.stringify({
            name: "Your Name",
            email: "your.email@example.com",
            education: "Your Education"
        })
    }).then(() => loadProfile());
}

function saveProfile() {
    if (!sessionStorage.getItem("auth")) {
        alert("You must be logged in as admin to save");
        return;
    }
    fetch(`${API}/profile`, {
        method: "PATCH",
        headers: {"Content-Type":"application/json",...getAuthHeaders()},
        body: JSON.stringify({
            name: pName.value,
            email: pEmail.value,
            education: pEdu.value
        })
    }).then(r => {
        if (!r.ok) alert("Failed to save profile");
        else loadProfile();
    }).catch(err => alert("Error: " + err));
}

/* ---------- SKILLS ---------- */
function toggleloadSkills() {
    loadSkills();
}

function loadSkills() {
    if (!toggleSection("skills")) return;

    fetch(`${API}/skills`)
        .then(r => r.json())
        .then(data => {
            skills.innerHTML = "";
            data.forEach(s => {
                skills.innerHTML += `
                    <li>
                        <strong>${s.name}</strong>
                        <span class="badge ${s.proficiency.toLowerCase()}">
                            ${s.proficiency}
                        </span>
                        <button onclick="deleteSkill(${s.id})">❌</button>
                    </li>
                `;
            });
        });
}

function addSkill() {
    if (!sessionStorage.getItem("auth")) {
        alert("You must be logged in as admin to add skills");
        return;
    }
    if (!skillName.value || !skillProf.value) {
        alert("Please enter skill name and proficiency");
        return;
    }

    fetch(`${API}/skills`, {
        method: "POST",
        headers: {
            "Content-Type": "application/json",
            ...getAuthHeaders()
        },
        body: JSON.stringify({
            name: skillName.value,
            proficiency: skillProf.value
        })
    }).then(r => {
        if (!r.ok) throw new Error("Failed to add skill");
        skillName.value = "";
        skillProf.value = "";
        loadSkills();
    }).catch(err => alert("Error: " + err));
}


function deleteSkill(id) {
    if (!sessionStorage.getItem("auth")) {
        alert("You must be logged in as admin to delete");
        return;
    }
    fetch(`${API}/skills/${id}`, {
        method: "DELETE",
        headers: { ...getAuthHeaders() }
    }).then(r => {
        if (!r.ok) throw new Error("Failed to delete");
        loadSkills();
    }).catch(err => alert("Error: " + err));
}

/* ---------- PROJECTS ---------- */
function toggleloadProjects() {
    loadProjects();
}

function loadProjects() {
    if (!toggleSection("projects")) return;

    fetch(`${API}/projects`)
        .then(r => r.json())
        .then(data => {
            projects.innerHTML = "";
            data.forEach(p => {
                projects.innerHTML += `
                    <div class="project">
                        <h3>${p.title}</h3>
                        <p>${p.description}</p>
                        <a href="${p.links?.link || "#"}" target="_blank">Open</a><br>
                        <button onclick="deleteProject(${p.id})">Delete</button>
                    </div>
                `;
            });
        });
}

function addProject() {
    if (!sessionStorage.getItem("auth")) {
        alert("You must be logged in as admin to add projects");
        return;
    }
    if (!projTitle.value || !projDesc.value) {
        alert("Please enter project title and description");
        return;
    }
    fetch(`${API}/projects`, {
        method: "POST",
        headers: {"Content-Type":"application/json", ...getAuthHeaders()},
        body: JSON.stringify({
            title: projTitle.value,
            description: projDesc.value,
            links: { link: projLink.value || "" }
        })
    }).then(r => {
        if (!r.ok) throw new Error("Failed to add project");
        projTitle.value = "";
        projDesc.value = "";
        projLink.value = "";
        loadProjects();
    }).catch(err => alert("Error: " + err));
}

function deleteProject(id) {
    if (!sessionStorage.getItem("auth")) {
        alert("You must be logged in as admin to delete");
        return;
    }
    fetch(`${API}/projects/${id}`, { method: "DELETE",headers:{...getAuthHeaders()} })
        .then(r => {
            if (!r.ok) throw new Error("Failed to delete");
            loadProjects();
        })
        .catch(err => alert("Error: " + err));
}
updateUI();

