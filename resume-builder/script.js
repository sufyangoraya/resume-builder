document.getElementById('resumeForm').addEventListener('submit', function (event) {
    event.preventDefault();

    const nameElement = document.getElementById('name');
    const emailElement = document.getElementById('email');
    const phoneElement = document.getElementById('phone');
    const addressElement = document.getElementById('address');
    const educationElement = document.getElementById('education');
    const experienceElement = document.getElementById('experience');
    const skillsElement = document.getElementById('skills');
    const objectiveElement = document.getElementById('objective');
    const photoElement = document.getElementById('photo');
    const languagesElement = document.getElementById('languages');
    const dobElement = document.getElementById('dob');
    const cnicElement = document.getElementById('cnic');

    let photoUrl = '';
    if (photoElement.files && photoElement.files[0]) {
        const reader = new FileReader();
        reader.onload = function (e) {
            photoUrl = e.target.result; // Get the image URL
            updateResumePreview();
        };
        reader.readAsDataURL(photoElement.files[0]); // Convert image to data URL
    } else {
        updateResumePreview(); // If no photo, just update the rest
    }

    function updateResumePreview() {
        const name = nameElement.value;
        const email = emailElement.value;
        const phone = phoneElement.value;
        const address = addressElement.value;
        const education = educationElement.value;
        const experience = experienceElement.value;
        const skills = skillsElement.value;
        const objective = objectiveElement.value;
        const languages = languagesElement.value;
        const dob = dobElement.value;
        const cnic = cnicElement.value;

        let resumeOutput = `
        <h2>Resume</h2>
        <div class="photo-container">
            ${photoUrl ? `<img src="${photoUrl}" alt="Photo" class="resume-photo" />` : ''}
        </div>
        <p><strong>Name:</strong> ${name}</p>
        <p><strong>Email:</strong> ${email}</p>
        <p><strong>Phone:</strong> ${phone}</p>
        <p><strong>Address:</strong> ${address}</p>
        <p><strong>Date of Birth:</strong> ${dob}</p>
        <p><strong>CNIC:</strong> ${cnic}</p>
        
        <h3>Objective</h3>
        <p>${objective}</p>

        <h3>Education</h3>
        <p>${education}</p>

        <h3>Experience</h3>
        <p>${experience}</p>

        <h3>Skills</h3>
        <p>${skills}</p>

        <h3>Languages</h3>
        <p>${languages}</p>
        `;

        document.getElementById('resumeOutput').innerHTML = resumeOutput;
    }
});

document.getElementById('downloadPdfButton').addEventListener('click', function () {
    const resumeOutputElement = document.getElementById('resumeOutput');
    if (resumeOutputElement) {
        html2canvas(resumeOutputElement, { scale: 2 }).then(function (canvas) {
            const { jsPDF } = window.jspdf;
            const pdf = new jsPDF();
            const imgData = canvas.toDataURL('image/png');
            const imgWidth = 190;
            const imgHeight = (canvas.height * imgWidth) / canvas.width;
            pdf.addImage(imgData, 'PNG', 10, 10, imgWidth, imgHeight);
            pdf.save('resume.pdf');
        });
    }
});

document.getElementById('downloadJpgButton').addEventListener('click', function () {
    const resumeOutputElement = document.getElementById('resumeOutput');
    if (resumeOutputElement) {
        html2canvas(resumeOutputElement, { scale: 2 }).then(function (canvas) {
            const imgData = canvas.toDataURL('image/jpeg', 1.0);
            const a = document.createElement('a');
            a.href = imgData;
            a.download = 'resume.jpg';
            a.click();
        });
    }
});
