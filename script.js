// Listen for the form submission
var _a;
(_a = document.getElementById('resumeForm')) === null || _a === void 0 ? void 0 : _a.addEventListener('submit', function (event) {
    event.preventDefault();

    // Get form values
    var nameElement = document.getElementById('name');
    var emailElement = document.getElementById('email');
    var phoneElement = document.getElementById('phone');
    var addressElement = document.getElementById('address');
    var educationElement = document.getElementById('education');
    var experienceElement = document.getElementById('experience');
    var skillsElement = document.getElementById('skills');
    var objectiveElement = document.getElementById('objective');
    var photoElement = document.getElementById('photo');
    var languagesElement = document.getElementById('languages');
    var dobElement = document.getElementById('dob');
    var cnicElement = document.getElementById('cnic');

    if (nameElement && emailElement && phoneElement && educationElement && experienceElement && skillsElement && objectiveElement) {
        var name_1 = nameElement.value;
        var email = emailElement.value;
        var phone = phoneElement.value;
        var address = addressElement.value;
        var education = educationElement.value;
        var experience = experienceElement.value;
        var skills = skillsElement.value;
        var objective = objectiveElement.value; // Objective
        var photo = photoElement.files[0]; // Photo upload
        var languages = languagesElement.value; // Languages
        var dob = dobElement.value; // Date of Birth
        var cnic = cnicElement.value; // CNIC

        // Create resume output
        var resumeOutput = `
        <h2>Resume</h2>
        <p><strong>Name:</strong> <span id="edit-name" class="editable">${name_1}</span></p>
        <p><strong>Email:</strong> <span id="edit-email" class="editable">${email}</span></p>
        <p><strong>Phone:</strong> <span id="edit-phone" class="editable">${phone}</span></p>
        <p><strong>Address:</strong> <span id="edit-address" class="editable">${address}</span></p>
        <p><strong>Date of Birth:</strong> <span id="edit-dob" class="editable">${dob}</span></p>
        <p><strong>CNIC:</strong> <span id="edit-cnic" class="editable">${cnic}</span></p>

        <!-- Objective Section -->
        <h3>Objective</h3>
        <p id="edit-objective" class="editable">${objective}</p>

        <h3>Education</h3>
        <p id="edit-education" class="editable">${education}</p>

        <h3>Experience</h3>
        <p id="edit-experience" class="editable">${experience}</p>

        <h3>Skills</h3>
        <p id="edit-skills" class="editable">${skills}</p>

        <h3>Languages</h3>
        <p id="edit-languages" class="editable">${languages}</p>
        `;

        // If a photo is uploaded, include it in the resume
        if (photo) {
            var reader = new FileReader();
            reader.onload = function (e) {
                var photoURL = e.target.result;
                resumeOutput = `
                    <img src="${photoURL}" alt="Profile Photo" style="width: 150px; height: 150px; border-radius: 50%; margin-bottom: 20px;">
                    ${resumeOutput}
                `;
                // Display resume output
                var resumeOutputElement = document.getElementById('resumeOutput');
                if (resumeOutputElement) {
                    resumeOutputElement.innerHTML = resumeOutput;
                    makeEditable();
                } else {
                    console.error('The resume output element is missing');
                }
            };
            reader.readAsDataURL(photo);
        } else {
            // Display resume output without photo
            var resumeOutputElement = document.getElementById('resumeOutput');
            if (resumeOutputElement) {
                resumeOutputElement.innerHTML = resumeOutput;
                makeEditable();
            } else {
                console.error('The resume output element is missing');
            }
        }
    } else {
        console.error('One or more elements are missing');
    }
});

// Make content editable
function makeEditable() {
    var editableElements = document.querySelectorAll('.editable');
    editableElements.forEach(function (element) {
        element.addEventListener('click', function () {
            var currentElement = element;
            var currentValue = currentElement.textContent || "";

            // Replace content with an input field
            if (currentElement.tagName === "P" || currentElement.tagName === 'SPAN') {
                var input_1 = document.createElement('input');
                input_1.type = 'text';
                input_1.value = currentValue;
                input_1.classList.add('editing-input');
                input_1.addEventListener('blur', function () {
                    currentElement.textContent = input_1.value;
                    currentElement.style.display = 'inline';
                    input_1.remove();
                });
                currentElement.style.display = 'none';
                currentElement.parentNode?.insertBefore(input_1, currentElement);
                input_1.focus();
            }
        });
    });
}

// Download functionality (HTML)
document.getElementById('downloadHtmlButton')?.addEventListener('click', function () {
    var resumeOutputElement = document.getElementById('resumeOutput');
    if (resumeOutputElement) {
        var resumeContent = resumeOutputElement.innerHTML;
        var blob = new Blob([resumeContent], { type: 'text/html' });
        var url = URL.createObjectURL(blob);

        var a = document.createElement('a');
        a.href = url;
        a.download = 'resume.html';
        document.body.appendChild(a);
        a.click();

        document.body.removeChild(a);
        URL.revokeObjectURL(url);
    } else {
        console.error('Resume output element is missing.');
    }
});

// Download functionality (PDF)
document.getElementById('downloadPdfButton')?.addEventListener('click', function () {
    var resumeOutputElement = document.getElementById('resumeOutput');
    if (resumeOutputElement) {
        const { jsPDF } = window.jspdf;
        const doc = new jsPDF();

        // Capture the resume content and add to PDF
        doc.html(resumeOutputElement, {
            callback: function (doc) {
                doc.save('resume.pdf');
            }
        });
    } else {
        console.error('Resume output element is missing.');
    }
});

// Download functionality (JPG)
document.getElementById('downloadJpgButton')?.addEventListener('click', function () {
    var resumeOutputElement = document.getElementById('resumeOutput');
    if (resumeOutputElement) {
        html2canvas(resumeOutputElement).then(function (canvas) {
            var imgData = canvas.toDataURL('image/jpeg');
            var a = document.createElement('a');
            a.href = imgData;
            a.download = 'resume.jpg';
            a.click();
        });
    } else {
        console.error('Resume output element is missing.');
    }
});
