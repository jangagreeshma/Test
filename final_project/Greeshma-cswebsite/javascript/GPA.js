
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
            
            // Loop through all course inputs
            for (let idx = 1; idx <= CONFIG.maxCourses; idx++) {
                const creditField = document.getElementById(`ch${idx}`).value;
                const gradeField = document.getElementById(`gr${idx}`).value;
                
                // Skip if both fields are empty
                if (areBothEmpty(creditField, gradeField)) continue;
                
                // Validate that both fields are filled
                if (isPartiallyFilled(creditField, gradeField)) {
                    throw new Error(`Course ${idx} requires BOTH credit hours and grade.`);
                }
                
                // Validate and store course data
                const creditVal = validateCredits(creditField, idx);
                const gradeVal = validateGrade(gradeField, idx);
                
                courses.push({ credit: creditVal, grade: gradeVal });
            }
            
            // Check minimum course requirement
            if (courses.length < CONFIG.minRequired) {
                throw new Error(`Minimum ${CONFIG.minRequired} courses required.`);
            }
            
            // Calculate GPA
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

    // Reset function - clears all inputs
    window.resetGPA = function() {
        for (let idx = 1; idx <= CONFIG.maxCourses; idx++) {
            document.getElementById(`ch${idx}`).value = '';
            document.getElementById(`gr${idx}`).value = '';
        }
        document.getElementById('avgGpa').value = '';
        document.getElementById('ch1').focus();
    };
})();