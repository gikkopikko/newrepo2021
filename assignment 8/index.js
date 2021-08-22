const tbody = document.querySelector("tbody");

document.getElementById("add-user-btn").addEventListener("click", async (e) => {
  const id = document.getElementById("createId").value;
  const fname = document.getElementById("createFName").value;
  const lname = document.getElementById("createLName").value;
  const email = document.getElementById("createEmail").value;
  const phone = document.getElementById("createPhone").value;
  e.preventDefault();
  if (
    id === "" ||
    fname === "" ||
    lname === "" ||
    email === "" ||
    phone === ""
  ) {
    alert("Please enter all details!");
  } else {
    const newUser = {
      id: id,
      first_name: fname,
      last_name: lname,
      email: email,
      phone: phone,
    };
    try {
      const response = await fetch("http://localhost:3000/users", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify(newUser),
      });
      alert("Student successfully added");
    } catch (err) {
      console.error(err);
    }
  }
});
const fetchAllUsers = async () => {
  const response = await fetch("http://localhost:3000/users");
  const data = await response.json();
  console.log(data);

  tbody.innerHTML = "";

  data.forEach((item) => {
    console.log(item);

    tbody.innerHTML += `<tr><td scope="row">${item.id}</td>
							<td>${item.first_name}</td>
							<td>${item.last_name}</td>
              <td>${item.email}</td>
              <td>${item.phone}</td>
              
               <td>
                        <a href="#" id="${item.id}" class="btn btn-success btn-sm rounded-pill py-0 editLink" data-toggle="modal" data-target="#editUserModal">Edit</a>

                        <a href="#" id="${item.id}" class="btn btn-danger btn-sm rounded-pill py-0 deleteLink">Delete</a>
                      </td></tr>`;
  });
};
fetchAllUsers();

tbody.addEventListener("click", (e) => {
  if (e.target && e.target.matches("a.editLink")) {
    e.preventDefault();
    let id = e.target.getAttribute("id");
    editUser(id);
  }
});
const deltUser = async (id) => {
  try {
    const response = await fetch(`http://localhost:3000/users/${id}`, {
      method: "DELETE",
    });
  } catch (err) {
    console.error(err);
  }
};

tbody.addEventListener("click", (e) => {
  if (e.target && e.target.matches("a.deleteLink")) {
    e.preventDefault();
    let id = e.target.getAttribute("id");
    console.log(id);
    deltUser(id);
  }
});
const editUser = async (id) => {
  const response = await fetch(`http://localhost:3000/users/${id}`, {
    method: "GET",
  });
  const data = await response.json();
  document.getElementById("id").value = data.id;
  document.getElementById("fname").value = data.first_name;
  document.getElementById("lname").value = data.last_name;
  document.getElementById("email").value = data.email;
  document.getElementById("phone").value = data.phone;
};

document
  .getElementById("edit-user-btn")
  .addEventListener("click", async (e) => {
    e.preventDefault();
    let editedUser = {};
    editedUser.id = document.getElementById("id").value;
    editedUser.first_name = document.getElementById("fname").value;
    editedUser.last_name = document.getElementById("lname").value;
    editedUser.email = document.getElementById("email").value;
    editedUser.phone = document.getElementById("phone").value;

    console.log(editedUser);
    try {
      const response = await fetch(
        `http://localhost:3000/users/${editedUser.id}`,
        {
          method: "PUT",
          headers: {
            "Content-Type": "application/json",
          },
          body: JSON.stringify(editedUser),
        }
      );
      if (response.status === 404) {
        alert("The requested ID was not found!");
      }
      // fetchAllUsers();
    } catch (err) {
      console.error(err);
    }
  });
