// Initial student data matching the weekend mission preview
const initialStudents = [
  { id: 1, name: "Abel", department: "Software", year: 4 },
  { id: 2, name: "Hana", department: "Electrical", year: 2 },
  { id: 3, name: "Surafel", department: "Software", year: 3 }
];

// App State
let students = [...initialStudents];
let currentFilter = "All";

// DOM Elements
const studentForm = document.getElementById("studentForm");
const studentNameInput = document.getElementById("studentName");
const studentDeptSelect = document.getElementById("studentDepartment");
const studentYearSelect = document.getElementById("studentYear");
const studentList = document.getElementById("studentList");
const studentCounter = document.getElementById("studentCounter");
const filterButtons = document.querySelectorAll(".filter-btn");
const themeToggleBtn = document.getElementById("themeToggleBtn");
const themeIcon = document.getElementById("themeIcon");
const themeLabel = document.getElementById("themeLabel");

// Render students using .filter(), destructuring, ternary badge, and .map()
function renderStudents() {
  // Filter students based on selected department
  const filteredStudents = students.filter(
    (student) => currentFilter === "All" || student.department === currentFilter
  );

  // Update footer student count
  studentCounter.textContent = `Showing ${filteredStudents.length} of ${students.length} students`;

  // Handle empty state
  if (filteredStudents.length === 0) {
    studentList.innerHTML = `<div class="empty-state">No students found in ${currentFilter} department.</div>`;
    return;
  }

  // Map into Flexbox cards using object destructuring and ternary operator
  studentList.innerHTML = filteredStudents
    .map(({ id, name, department, year }) => {
      // Ternary operator for Senior vs Junior badge
      const isSenior = year >= 4;
      const badgeClass = isSenior ? "badge-senior" : "badge-junior";
      const badgeText = isSenior ? "Senior" : "Junior";
      const initial = name.trim().charAt(0).toUpperCase();

      return `
        <article class="student-card" data-id="${id}">
          <div class="card-left">
            <div class="avatar">${initial}</div>
            <div class="student-info">
              <h3>${escapeHtml(name)}</h3>
              <p>${escapeHtml(department)} • Y${year}</p>
            </div>
          </div>
          <div class="card-right">
            <span class="${badgeClass}">${badgeText}</span>
            <button class="delete-btn" onclick="removeStudent(${id})" aria-label="Delete ${escapeHtml(name)}">✕</button>
          </div>
        </article>
      `;
    })
    .join("");
}

// Add new student from form submission
studentForm.addEventListener("submit", (e) => {
  e.preventDefault();

  const name = studentNameInput.value.trim();
  const department = studentDeptSelect.value;
  const year = parseInt(studentYearSelect.value, 10);

  if (!name) return;

  const newStudent = {
    id: Date.now(),
    name,
    department,
    year
  };

  students.push(newStudent);
  studentForm.reset();
  studentNameInput.focus();
  renderStudents();
});

// Remove student by ID
function removeStudent(id) {
  students = students.filter((student) => student.id !== id);
  renderStudents();
}

// Handle department filter button clicks
filterButtons.forEach((btn) => {
  btn.addEventListener("click", () => {
    filterButtons.forEach((b) => b.classList.remove("active"));
    btn.classList.add("active");
    currentFilter = btn.dataset.department;
    renderStudents();
  });
});

// Toggle Dark / Light mode
function updateThemeUI(theme) {
  document.documentElement.setAttribute("data-theme", theme);
  localStorage.setItem("theme", theme);

  if (theme === "dark") {
    themeIcon.textContent = "🔅";
    themeLabel.textContent = "Light";
  } else {
    themeIcon.textContent = "🌙";
    themeLabel.textContent = "Dark";
  }
}

themeToggleBtn.addEventListener("click", () => {
  const activeTheme = document.documentElement.getAttribute("data-theme") || "dark";
  const newTheme = activeTheme === "dark" ? "light" : "dark";
  updateThemeUI(newTheme);
});

// Helper function to prevent XSS
function escapeHtml(str) {
  return str
    .replace(/&/g, "&amp;")
    .replace(/</g, "&lt;")
    .replace(/>/g, "&gt;")
    .replace(/"/g, "&quot;")
    .replace(/'/g, "&#039;");
}

// Initialize theme & load initial students
const savedTheme = localStorage.getItem("theme") || "dark";
updateThemeUI(savedTheme);
renderStudents();
