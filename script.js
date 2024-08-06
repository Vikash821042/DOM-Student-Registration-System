document.addEventListener('DOMContentLoaded', () => {
    const form = document.getElementById('studentForm');
    const studentIdInput = document.getElementById('studentId');
    const studentsTable = document.getElementById('studentsTable').getElementsByTagName('tbody')[0];
    let students = [];
    let currentEditIndex = null;

    // Load students from localStorage
    function loadStudents() {
        const storedStudents = localStorage.getItem('students');
        if (storedStudents) {
            students = JSON.parse(storedStudents);
        }
        renderTable();
    }

    // Save students to localStorage
    function saveStudents() {
        localStorage.setItem('students', JSON.stringify(students));
    }

    form.addEventListener('submit', function(event) {
        event.preventDefault();

        const student = {
            id: studentIdInput.value || Date.now(),
            name: document.getElementById('name').value,
            class: document.getElementById('class').value,
            address: document.getElementById('address').value,
            contact: document.getElementById('contact').value
        };

        if (currentEditIndex !== null) {
            students[currentEditIndex] = student;
            currentEditIndex = null;
        } else {
            students.push(student);
        }

        saveStudents();
        renderTable();
        form.reset();
        studentIdInput.value = '';
    });

    function renderTable() {
        studentsTable.innerHTML = '';
        students.forEach((student, index) => {
            const row = studentsTable.insertRow();
            row.innerHTML = `
                <td>${student.name}</td>
                <td>${student.class}</td>
                <td>${student.address}</td>
                <td>${student.contact}</td>
                <td class="action-buttons">
                    <button class="edit-button" onclick="editStudent(${index})">Edit</button>
                    <button class="delete-button" onclick="deleteStudent(${index})">Delete</button>
                </td>
            `;
        });
    }

    window.editStudent = function(index) {
        const student = students[index];
        document.getElementById('name').value = student.name;
        document.getElementById('class').value = student.class;
        document.getElementById('address').value = student.address;
        document.getElementById('contact').value = student.contact;
        document.getElementById('studentId').value = student.id;
        currentEditIndex = index;
    };

    window.deleteStudent = function(index) {
        students.splice(index, 1);
        saveStudents();
        renderTable();
    };


    loadStudents();
});
