(function() {

    const params = new URLSearchParams(window.location.search);
    
    
    const applicationInfo = {
        firstName: params.get('firstName') || 'N/A',
        lastName: params.get('lastName') || 'N/A',
        studentID: params.get('studentID') || 'N/A',
        gender: params.get('gender') || 'N/A',
        gpa: params.get('gpa') || 'N/A',
        comments: params.get('comments') || 'No comments provided'
    };

 
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

    function escapeHtml(text) {
        const div = document.createElement('div');
        div.textContent = text;
        return div.innerHTML;
    }
})();