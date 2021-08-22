document.addEventListener("DOMContentLoaded", () => {
  document.getElementById("createBtn").addEventListener("click", async (e) => {
    const id = document.getElementById("createID").value;
    const name = document.getElementById("createName").value;
    const grade = document.getElementById("createHOD").value;
    if (id === "" || name === "" || grade === "") {
      alert("Please enter all details!");
    } else {
      const dept = {
        id: id,
        name: name,
        grade: grade,
      };
      try {
        const response = await fetch("http://localhost:3000/db", {
          method: "POST",
          headers: {
            "Content-Type": "application/json",
          },
          body: JSON.stringify(dept),
        });
        alert("Student successfully added");
      } catch (err) {
        console.error(err);
      }
    }
  });

  document
    .getElementById("retrieveBtn")
    .addEventListener("click", async (e) => {
      const id = document.getElementById("retrieveID").value;
      if (id === "") {
        alert("Please enter all details!");
      } else {
        try {
          const response = await fetch("http://localhost:3000/db");
          const data = await response.json();
          const dept = data.db;
          const item = dept.find((ele) => {
            return ele.id === id;
          });

          document.getElementById(
            "result-table"
          ).innerHTML = `<tr><td scope="row">${item.id}</td>
							<td>${item.name}</td>
							<td>${item.grade}</td></tr>`;
        } catch (err) {
          console.error(err);
        }
      }
    });

  document
    .getElementById("retrieveAll")
    .addEventListener("click", async (e) => {
      try {
        const response = await fetch("http://localhost:3000/db");
        const data = await response.json();
        const dept = data.db;
        document.getElementById("result-table").innerHTML = "";
        dept.forEach((item) => {
          console.log(item);

          document.getElementById(
            "result-table"
          ).innerHTML += `<tr><td scope="row">${item.id}</td>
							<td>${item.name}</td>
							<td>${item.grade}</td></tr>`;
        });
      } catch (err) {
        console.error(err);
      }
    });

  document.getElementById("updateBtn").addEventListener("click", async (e) => {
    const id = document.getElementById("updateID").value;
    const name = document.getElementById("updateName").value;
    const grade = document.getElementById("updateHOD").value;
    if (id === "" || name === "" || grade === "") {
      alert("Please enter all details!");
    } else {
      const dept = {
        id: id,
        name: name,
        grade: grade,
      };
      try {
        const response = await fetch(`http://localhost:3000/db/${id}`, {
          method: "PUT",
          headers: {
            "Content-Type": "application/json",
          },
          body: JSON.stringify(dept),
        });
        if (response.status === 404) {
          alert("The requested ID was not found!");
        }
      } catch (err) {
        console.error(err);
      }
    }
  });

  document.getElementById("deleteBtn").addEventListener("click", async (e) => {
    const id = document.getElementById("deleteID").value;
    if (id === "") {
      alert("Please enter all details!");
    }
    try {
      const response = await fetch(`http://localhost:3000/db/${id}`, {
        method: "DELETE",
      });
    } catch (err) {
      console.error(err);
    }
  });
});
