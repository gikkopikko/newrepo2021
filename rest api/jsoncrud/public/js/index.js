function addDept() {
  let dept = {
    id: 2,
    dname: "HRkfjdlkfjdlk",
    loc: "delhi",
  };
  fetch("http://localhost:3000/dept/", {
    method: "POST",
    headers: {
      "Content-Type": "application/json",
    },
    body: JSON.stringify(dept),
  }).then((res) => {
    console.log(res);
  });
}

//Updating the Data in db.json using json server
function editDept() {
  let dept = {
    id: 2,
    dname: "Quality",
    loc: "Kolkatta",
  };
  fetch("http://localhost:3000/dept/2", {
    method: "PUT",
    headers: {
      "Content-Type": "application/json",
    },
    body: JSON.stringify(dept),
  }).then((res) => {
    console.log(res);
  });
}

//Deleting Data in db.json using json server
function deleteDept() {
  fetch("http://localhost:3000/dept/2", {
    method: "DELETE",
    headers: {
      "Content-Type": "application/json",
    },
  }).then((res) => {
    console.log(res);
  });
}

//Fetching the Data from db.json using json server
function getDept() {
  fetch("http://localhost:3000/dept")
    .then((res) => {
      return res.json();
    })
    .then((dept) => {
      console.log(dept);
    });
}

async function updateDept() {
  var id = Number(prompt("Enter Modified ID"));
  var dname = prompt("Enter Modified Department Name");
  var loc = prompt("Enter Modified Location");

  var newRecord = {
    id: id,
    dname: dname,
    loc: loc,
  };

  console.log(newRecord);
  console.log(newRecord.id);
  console.log(newRecord.dname);
  console.log(newRecord.loc);

  fetch(`http://localhost:3000/dept/${id}`, {
    method: "PUT",
    headers: {
      "Content-Type": "application/json",
    },
    body: JSON.stringify(newRecord),
  }).then((res) => {
    console.log(res);
  });

  // fetch(`http://localhost:3000/dept/${id}`, {
  //     method: "PUT",
  //     body: JSON.stringify(newRecord),
  //     headers:{
  //         'Content-Type':'application/json'
  //     },
  // }).then((response) => {
  //     console.warn(response);
  //     return response.json();
  // })
}
