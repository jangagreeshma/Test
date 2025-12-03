// ============================================
// GPA Calculator Module
// ============================================

(function() {
    // Grade mapping configuration
    const GRADE_MAP = {
        'A': 4.0,
        'B': 3.0,
        'C': 2.0,
        'D': 1.0,
        'F': 0.0
    };

    const CONFIG = {
        maxCourses: 5,
        minRequired: 2
    };

    // Initialize focus when document loads
    if (document.getElementById('ch1')) {
        window.addEventListener('load', () => {
            document.getElementById('ch1').focus();
        });
    }

    // Convert letter grade to numerical value
    const convertGrade = (letter) => {
        if (!letter) return null;
        const normalized = letter.trim().toUpperCase();
        return GRADE_MAP[normalized] !== undefined ? GRADE_MAP[normalized] : null;
    };

    // Validate credit hours
    const validateCredits = (value, courseNum) => {
        const numValue = parseFloat(value);
        if (isNaN(numValue) || numValue <= 0) {
            throw new Error(`Invalid credit hours for Course ${courseNum}. Must be a positive number.`);
        }
        return numValue;
    };

    // Validate grade letter
    const validateGrade = (value, courseNum) => {
        const gradeValue = convertGrade(value);
        if (gradeValue === null) {
            throw new Error(`Invalid grade for Course ${courseNum}. Use A, B, C, D, or F.`);
        }
        return gradeValue;
    };

    // Check if both fields are empty
    const areBothEmpty = (credit, grade) => credit === '' && grade === '';

    // Check if only one field is filled
    const isPartiallyFilled = (credit, grade) => 
        (credit === '' && grade !== '') || (credit !== '' && grade === '');

    // Main calculation function
    window.calculateGPA = function() {
        try {
            const courses = [];
            
            for (let idx = 1; idx <= CONFIG.maxCourses; idx++) {
                const creditField = document.getElementById(`ch${idx}`).value;
                const gradeField = document.getElementById(`gr${idx}`).value;
                
                if (areBothEmpty(creditField, gradeField)) continue;
                
                if (isPartiallyFilled(creditField, gradeField)) {
                    throw new Error(`Course ${idx} requires BOTH credit hours and grade.`);
                }
                
                const creditVal = validateCredits(creditField, idx);
                const gradeVal = validateGrade(gradeField, idx);
                
                courses.push({ credit: creditVal, grade: gradeVal });
            }
            
            if (courses.length < CONFIG.minRequired) {
                throw new Error(`Minimum ${CONFIG.minRequired} courses required.`);
            }
            
            let sumCredits = 0;
            let sumGradePoints = 0;
            
            courses.forEach(course => {
                sumCredits += course.credit;
                sumGradePoints += (course.credit * course.grade);
            });
            
            const finalGPA = (sumGradePoints / sumCredits).toFixed(2);
            document.getElementById('avgGpa').value = finalGPA;
            
        } catch (error) {
            alert(error.message);
            document.getElementById('avgGpa').value = '';
        }
    };

    // Reset function
    window.resetGPA = function() {
        for (let idx = 1; idx <= CONFIG.maxCourses; idx++) {
            document.getElementById(`ch${idx}`).value = '';
            document.getElementById(`gr${idx}`).value = '';
        }
        document.getElementById('avgGpa').value = '';
        document.getElementById('ch1').focus();
    };
})();


// ============================================
// Teaching Assistant Application Module
// ============================================

(function() {
    const maleCheckbox = document.querySelector('input[name="gender"][value="Male"]');
    const femaleCheckbox = document.querySelector('input[name="gender"][value="Female"]');

    if (maleCheckbox && femaleCheckbox) {
        // Exclusive checkbox selection
        maleCheckbox.addEventListener('change', function() {
            if (this.checked) {
                femaleCheckbox.checked = false;
            }
        });

        femaleCheckbox.addEventListener('change', function() {
            if (this.checked) {
                maleCheckbox.checked = false;
            }
        });

        // Form validation on submit
        const applicationForm = document.querySelector('form');
        if (applicationForm) {
            applicationForm.addEventListener('submit', function(evt) {
                const maleSelected = maleCheckbox.checked;
                const femaleSelected = femaleCheckbox.checked;
                
                if (!maleSelected && !femaleSelected) {
                    evt.preventDefault();
                    alert('Please select a gender (M or F)');
                }
            });
        }
    }
})();


// ============================================
// Survey Data Display Module
// ============================================

(function() {
    // Get URL parameters
    const params = new URLSearchParams(window.location.search);
    
    // Extract application information
    const applicationInfo = {
        firstName: params.get('firstName') || 'N/A',
        lastName: params.get('lastName') || 'N/A',
        studentID: params.get('studentID') || 'N/A',
        gender: params.get('gender') || 'N/A',
        gpa: params.get('gpa') || 'N/A',
        comments: params.get('comments') || 'No comments provided'
    };

    // Display data when page loads
    window.addEventListener('DOMContentLoaded', function() {
        const displayArea = document.getElementById('submissionData');
        
        if (displayArea) {
            displayArea.innerHTML = `
                <div class="info-row">
                    <span class="info-label">First Name:</span>
                    <span class="info-value">${escapeHtml(applicationInfo.firstName)}</span>
                </div>
                <div class="info-row">
                    <span class="info-label">Last Name:</span>
                    <span class="info-value">${escapeHtml(applicationInfo.lastName)}</span>
                </div>
                <div class="info-row">
                    <span class="info-label">Student ID:</span>
                    <span class="info-value">${escapeHtml(applicationInfo.studentID)}</span>
                </div>
                <div class="info-row">
                    <span class="info-label">Gender:</span>
                    <span class="info-value">${escapeHtml(applicationInfo.gender)}</span>
                </div>
                <div class="info-row">
                    <span class="info-label">GPA:</span>
                    <span class="info-value">${escapeHtml(applicationInfo.gpa)}</span>
                </div>
                <div class="info-row comment-content">
                    <span class="info-label">Comments:</span>
                    <span class="info-value">${escapeHtml(applicationInfo.comments)}</span>
                </div>
            `;
        }
    });

    // Helper function to escape HTML and prevent XSS
    function escapeHtml(text) {
        const div = document.createElement('div');
        div.textContent = text;
        return div.innerHTML;
    }
})();