// Get the input elements
        var previousCGPA = document.getElementById("previousCGPA");
        var previousCredit = document.getElementById("previousCredit");
        var currentTotalCredit = document.getElementById("currentTotalCredit");
        var totalCourses = document.getElementById("totalCourses");
        var addCourses = document.getElementById("addCourses");
        var courses = document.getElementById("courses");
        var calculate = document.getElementById("calculate");
        var result = document.getElementById("result");

        // Add an event listener to the addCourses button
        addCourses.addEventListener("click", function() {
            // Clear the courses div
            courses.innerHTML = "";
            // Get the number of courses
            var n = parseInt(totalCourses.value);
            // Check if the number is valid
            if (isNaN(n) || n < 0 || n > 10) {
                alert("Please enter a valid number of courses (0-10)");
                return;
            }
            // Create a table for the courses
            var table = document.createElement("table");
            // Add a header row
            var tr = document.createElement("tr");
            var th1 = document.createElement("th");
            th1.textContent = "Course";
            var th2 = document.createElement("th");
            th2.textContent = "Grade";
            var th3 = document.createElement("th");
            th3.textContent = "Credit";
            tr.appendChild(th1);
            tr.appendChild(th2);
            tr.appendChild(th3);
            table.appendChild(tr);
            // Add a row for each course
            for (var i = 1; i <= n; i++) {
                var tr = document.createElement("tr");
                var td1 = document.createElement("td");
                td1.textContent = "Course " + i;
                var td2 = document.createElement("td");
                var input1 = document.createElement("input");
                input1.type = "text";
                input1.id = "courseGrade" + i;
                td2.appendChild(input1);
                var td3 = document.createElement("td");
                var input2 = document.createElement("input");
                input2.type = "number";
                input2.min = "0";
                input2.max = "10";
                input2.step = "1";
                input2.id = "courseCredit" + i;
                td3.appendChild(input2);
                tr.appendChild(td1);
                tr.appendChild(td2);
                tr.appendChild(td3);
                table.appendChild(tr);
            }
            // Append the table to the courses div
            courses.appendChild(table);
        });

        // Add an event listener to the calculate button
        calculate.addEventListener("click", function() {
            // Get the previous CGPA and credit
            var pCGPA = parseFloat(previousCGPA.value);
            var pCredit = parseInt(previousCredit.value);
            // Check if they are valid
            if (isNaN(pCGPA) || pCGPA < 0 || pCGPA > 10) {
                alert("Please enter a valid previous CGPA (0-10)");
                return;
            }
            if (isNaN(pCredit) || pCredit < 0 || pCredit > 200) {
                alert("Please enter a valid total credit completed (0-200)");
                return;
            }
            // Get the current semester total credit and number of courses
            var cTotalCredit = parseInt(currentTotalCredit.value);
            var n = parseInt(totalCourses.value);
            // Check if they are valid
            if (isNaN(cTotalCredit) || cTotalCredit < 0 || cTotalCredit > 50) {
                alert("Please enter a valid current semester total credit (0-50)");
                return;
            }
            if (isNaN(n) || n < 0 || n > 10) {
                alert("Please enter a valid number of courses (0-10)");
                return;
            }
            // Initialize variables for current semester calculation
            var cCGPA = 0;
            var cCredit = 0;
            // Loop to get the input for each course
            for (var i = 1; i <= n; i++) {
                // Get the course grade and credit
                var courseGrade = document.getElementById("courseGrade" + i).value;
                var courseCredit = parseInt(document.getElementById("courseCredit" + i).value);
                // Check if they are valid
                if (!courseGrade.match(/^[A-FIUW][+]?$/)) {
                    alert("Please enter a valid grade for Course " + i + " (A+, A, B+, B, C+, C, D+, D, F, I, W, UW)");
                    return;
                }
                if (isNaN(courseCredit) || courseCredit < 0 || courseCredit > 10) {
                    alert("Please enter a valid credit for Course " + i + " (0-10)");
                    return;
                }
                // Convert the grade to CGPA
                var courseCGPA = 0;
                switch (courseGrade) {
                    case "A+":
                        courseCGPA = 4.00;
                        break;
                    case "A":
                        courseCGPA = 3.75;
                        break;
                    case "B+":
                        courseCGPA = 3.50;
                        break;
                    case "B":
                        courseCGPA = 3.25;
                        break;
                    case "C+":
                        courseCGPA = 3.00;
                        break;
                    case "C":
                        courseCGPA = 2.75;
                        break;
                    case "D+":
                        courseCGPA = 2.50;
                        break;
                    case "D":
                        courseCGPA = 2.25;
                        break;
                    case "F":
                        courseCGPA = 0.00;
                        break;
                    case "I":
                    case "W":
                    case "UW":
                        courseCGPA = null;
                        break;
                }
                // Add the current course CGPA * Credit to the current semester variables
                if (courseCGPA != null) {
                    cCGPA += courseCGPA * courseCredit;
                    cCredit += courseCredit;
                }
            }
            // Check if the current semester credit matches the input
            if (cCredit != cTotalCredit) {
                alert("The current semester total credit does not match the sum of the course credits");
                return;
            }
            // Calculate the overall CGPA
            var oCGPA = ((pCGPA * pCredit) + cCGPA) / (pCredit + cCredit);
            // Display the result
            result.textContent = "Your Overall CGPA is: " + oCGPA.toFixed(2);
            // Check if the overall CGPA is lower than 2.50
            if (oCGPA < 2.50) {
                // Change the color of the result to red
                result.style.color = "red";
                // Display a message that the user is in probation
                alert("You are in Probation Now");
            }
        });
    