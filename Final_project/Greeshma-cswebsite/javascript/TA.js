(function() {
    const maleCheckbox = document.querySelector('input[name="gender"][value="Male"]');
    const femaleCheckbox = document.querySelector('input[name="gender"][value="Female"]');

    if (maleCheckbox && femaleCheckbox) {
        // Exclusive checkbox selection - only one can be selected at a time
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
                
                // Ensure at least one gender is selected
                if (!maleSelected && !femaleSelected) {
                    evt.preventDefault();
                    alert('Please select a gender (M or F)');
                }
            });
        }
    }
})();