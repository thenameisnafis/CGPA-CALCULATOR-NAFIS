const previousCGPA = document.getElementById("previousCGPA");
const previousCredit = document.getElementById("previousCredit");
const currentTotalCredit = document.getElementById("currentTotalCredit");
const totalCourses = document.getElementById("totalCourses");
const addCourses = document.getElementById("addCourses");
const courses = document.getElementById("courses");
const calculate = document.getElementById("calculate");
const result = document.getElementById("result");
const reset = document.getElementById("reset");
const semesterInfo = document.getElementById("semesterInfo");

addCourses.addEventListener("click", function () {
  courses.innerHTML = "";
  const n = parseInt(totalCourses.value);
  if (isNaN(n) || n < 0 || n > 10) {
    alert("Please enter a valid number of courses (0-10)");
    return;
  }

  const table = document.createElement("table");
  table.className = "table-auto w-full text-center border border-collapse";

  const headerRow = document.createElement("tr");
  ["Course", "Grade", "Credit"].forEach(text => {
    const th = document.createElement("th");
    th.textContent = text;
    th.className = "p-2 bg-gray-100 text-[#002E6D] font-semibold";
    headerRow.appendChild(th);
  });
  table.appendChild(headerRow);

  for (let i = 1; i <= n; i++) {
    const tr = document.createElement("tr");

    const td1 = document.createElement("td");
    td1.textContent = `Course ${i}`;
    td1.className = "p-2";

    const td2 = document.createElement("td");
    const inputGrade = document.createElement("input");
    inputGrade.type = "text";
    inputGrade.id = `courseGrade${i}`;
    inputGrade.className = "w-full border px-2 py-1 text-center";
    td2.appendChild(inputGrade);
    td2.className = "p-2";

    const td3 = document.createElement("td");
    const inputCredit = document.createElement("input");
    inputCredit.type = "number";
    inputCredit.min = "0";
    inputCredit.max = "10";
    inputCredit.step = "1";
    inputCredit.id = `courseCredit${i}`;
    inputCredit.className = "w-full border px-2 py-1 text-center";
    td3.appendChild(inputCredit);
    td3.className = "p-2";

    tr.appendChild(td1);
    tr.appendChild(td2);
    tr.appendChild(td3);
    table.appendChild(tr);
  }

  courses.appendChild(table);
});

calculate.addEventListener("click", function () {
  const pCGPA = parseFloat(previousCGPA.value);
  const pCredit = parseInt(previousCredit.value);
  const cTotalCredit = parseInt(currentTotalCredit.value);
  const n = parseInt(totalCourses.value);

  if (isNaN(pCGPA) || pCGPA < 0 || pCGPA > 10 || isNaN(pCredit) || pCredit < 0 || pCredit > 200 || isNaN(cTotalCredit) || cTotalCredit < 0 || cTotalCredit > 50 || isNaN(n) || n < 0 || n > 10) {
    alert("Please enter valid inputs for all fields.");
    return;
  }

  let cCGPA = 0;
  let cCredit = 0;

  for (let i = 1; i <= n; i++) {
    const courseGrade = document.getElementById(`courseGrade${i}`).value;
    const courseCredit = parseInt(document.getElementById(`courseCredit${i}`).value);

    if (!courseGrade.match(/^[A-FIUW][+]?$/) || isNaN(courseCredit) || courseCredit < 0 || courseCredit > 10) {
      alert(`Invalid entry in Course ${i}`);
      return;
    }

    let courseCGPA = {
      "A+": 4.00,
      "A": 3.75,
      "B+": 3.50,
      "B": 3.25,
      "C+": 3.00,
      "C": 2.75,
      "D+": 2.50,
      "D": 2.25,
      "F": 0.00,
      "I": null,
      "W": null,
      "UW": null,
    }[courseGrade];

    if (courseCGPA != null) {
      cCGPA += courseCGPA * courseCredit;
      cCredit += courseCredit;
    }
  }

  if (cCredit != cTotalCredit) {
    alert("Total credit mismatch");
    return;
  }

  const oCGPA = ((pCGPA * pCredit) + cCGPA) / (pCredit + cCredit);
  result.textContent = `Your Overall CGPA is: ${oCGPA.toFixed(2)}`;
  result.style.fontWeight = "bold";
  result.style.color = oCGPA < 2.50 ? "red" : "#002E6D";

  if (oCGPA < 2.50) alert("You are in Probation Now");
});

reset.addEventListener("click", function () {
  previousCGPA.value = "";
  previousCredit.value = "";
  currentTotalCredit.value = "";
  totalCourses.value = "";
  courses.innerHTML = "";
  result.textContent = "";
  semesterInfo.innerHTML = "";
});
