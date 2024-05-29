var employeeData;
let selectedEmployee = 1;

const employeeList = document.querySelector(".employeeList");
const employeeInfo = document.querySelector(".employeeInfo");

async function fetchData() {
  const response = await fetch("./data.json");
  const data = await response.json();
  employeeData = data;
}

async function initializeApp() {
  await fetchData();
  renderEmployeeList(employeeData);
}

function renderEmployeeList(employes) {
  employeeList.innerHTML = "";
  employes.forEach((emp) => {
    const newDiv = document.createElement("div");
    newDiv.classList = "employeeContainer";
    newDiv.id = emp.id;
    newDiv.innerHTML = `<h1 class="employeeContainer-title">${emp.name}</h1> <span class="deleteBtn">❌</span>`;

    employeeList.appendChild(newDiv);
    if (selectedEmployee === emp.id) {
      newDiv.classList.add("selected");
    }
  });

  renderEmployeeProfile(employes[0]);
}

function renderEmployeeProfile(employee) {
  employeeInfo.innerHTML = "";

  const name = document.createElement("h1");
  const age = document.createElement("p");
  const address = document.createElement("p");
  const position = document.createElement("P");
  const department = document.createElement("P");
  const email = document.createElement("P");
  const phone = document.createElement("P");

  name.textContent = employee.name;
  age.textContent = employee.age;
  address.textContent = employee.address;
  position.textContent = employee.position;
  department.textContent = employee.department;
  email.textContent = employee.email;
  phone.textContent = employee.phone;

  const children = [name, age, address, position, department, email, phone];

  children.forEach((child) => {
    employeeInfo.appendChild(child);
  });
}

// Call initializeApp to start the application
initializeApp();

document
  .getElementById("employeeForm")
  .addEventListener("submit", function (e) {
    e.preventDefault();
    const newEmployee = {
      id: employeeData.length + 1,
      name: document.getElementById("name").value,
      age: document.getElementById("age").value,
      position: document.getElementById("position").value,
      department: document.getElementById("department").value,
      email: document.getElementById("email").value,
      phone: document.getElementById("phone").value,
      addresss: document.getElementById("address").value,
    };

    employeeData.push(newEmployee);
    renderEmployeeList(employeeData);
    document.querySelector(".form-container").style.display = "none";
    document.querySelector(".main-container").style.display = "flex";
  });

document.querySelector(".addEmployeeBtn").addEventListener("click", () => {
  document.querySelector(".main-container").style.display = "none";
  document.querySelector(".form-container").style.display = "block";
  console.log("clicked");
});

employeeList.addEventListener("click", (e) => {
  if (e.target.classList.contains("deleteBtn")) {
    const idToDelete = e.target.parentElement.id;

    employeeData = employeeData.filter((emp) => emp.id != idToDelete);
    renderEmployeeList(employeeData);
  }
  if (e.target.classList.contains("employeeContainer-title")) {
    const profileId = parseInt(e.target.parentElement.id, 10);
    const profileToDisplay = employeeData.find((emp) => emp.id === profileId);
    renderEmployeeProfile(profileToDisplay);
    selectedEmployee = profileId;
  }
});
