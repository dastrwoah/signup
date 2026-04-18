// ==================== MAIN VALIDATION FUNCTION ====================
function validateForm() {
    // 1. Clear all previous error messages and success message
    const errorSpans = document.querySelectorAll('.error-span');
    errorSpans.forEach(span => span.innerHTML = '');
    const successDiv = document.getElementById('successMessage');
    if (successDiv) successDiv.innerHTML = '';

    let isValid = true;

    // ========== SECTION 1: PERSONAL INFORMATION ==========
    // Full Name
    const fullname = document.getElementById('fullname').value.trim();
    const fullnameError = document.getElementById('fullnameError');
    if (fullname === '') {
        fullnameError.innerHTML = 'Full name cannot be empty.';
        isValid = false;
    } else if (fullname.length < 2) {
        fullnameError.innerHTML = 'Full name must be at least 2 characters.';
        isValid = false;
    }

    // Birthdate (must be not empty AND age > 13 years old)
    const birthdate = document.getElementById('birthdate').value;
    const birthdateError = document.getElementById('birthdateError');
    if (birthdate === '') {
        birthdateError.innerHTML = 'Birthdate is required.';
        isValid = false;
    } else {
        const today = new Date();
        const birthDateObj = new Date(birthdate);
        let age = today.getFullYear() - birthDateObj.getFullYear();
        const monthDiff = today.getMonth() - birthDateObj.getMonth();
        if (monthDiff < 0 || (monthDiff === 0 && today.getDate() < birthDateObj.getDate())) {
            age--;
        }
        if (age < 13) {
            birthdateError.innerHTML = 'You must be older than 13 years old to sign up.';
            isValid = false;
        }
        // Note: The requirement says "user must be more than 13" i.e., older than 13.
        // So age > 13 is valid. If age < 13 -> invalid.
    }

    // Sex (radio group) - loop through getElementsByName
    const sexRadios = document.getElementsByName('sex');
    let sexSelected = false;
    for (let i = 0; i < sexRadios.length; i++) {
        if (sexRadios[i].checked) {
            sexSelected = true;
            break;
        }
    }
    const sexError = document.getElementById('sexError');
    if (!sexSelected) {
        sexError.innerHTML = 'Please select your sex.';
        isValid = false;
    }

    // ========== SECTION 2: ACCOUNT DETAILS ==========
    // Email: not empty, must contain @ and a dot after it
    const email = document.getElementById('email').value.trim();
    const emailError = document.getElementById('emailError');
    if (email === '') {
        emailError.innerHTML = 'Email cannot be empty.';
        isValid = false;
    } else {
        const atIndex = email.indexOf('@');
        const dotAfterAt = email.indexOf('.', atIndex + 1);
        if (atIndex === -1 || dotAfterAt === -1) {
            emailError.innerHTML = 'Email must contain "@" and a dot after it (e.g., name@domain.com).';
            isValid = false;
        }
    }

    // Username: 8–20 characters; letters and digits only
    const username = document.getElementById('username').value.trim();
    const usernameError = document.getElementById('usernameError');
    if (username === '') {
        usernameError.innerHTML = 'Username cannot be empty.';
        isValid = false;
    } else if (username.length < 8 || username.length > 20) {
        usernameError.innerHTML = 'Username must be 8–20 characters long.';
        isValid = false;
    } else if (!/^[a-zA-Z0-9]+$/.test(username)) {
        usernameError.innerHTML = 'Username can only contain letters and digits (no spaces or symbols).';
        isValid = false;
    }

    // Password: at least 10 chars; at least one uppercase, one lowercase, one digit
    const password = document.getElementById('password').value;
    const passwordError = document.getElementById('passwordError');
    if (password.length < 10) {
        passwordError.innerHTML = 'Password must be at least 10 characters long.';
        isValid = false;
    } else {
        let hasUpper = false, hasLower = false, hasDigit = false;
        for (let i = 0; i < password.length; i++) {
            const ch = password[i];
            if (ch >= 'A' && ch <= 'Z') hasUpper = true;
            else if (ch >= 'a' && ch <= 'z') hasLower = true;
            else if (ch >= '0' && ch <= '9') hasDigit = true;
        }
        if (!hasUpper || !hasLower || !hasDigit) {
            passwordError.innerHTML = 'Password must include at least one uppercase letter, one lowercase letter, and one digit.';
            isValid = false;
        }
    }

    // Confirm Password: must match password
    const confirmPassword = document.getElementById('confirmPassword').value;
    const confirmError = document.getElementById('confirmError');
    if (password !== confirmPassword) {
        confirmError.innerHTML = 'Passwords do not match.';
        isValid = false;
    }

    // ========== SECTION 3: TOPIC QUESTIONS (Water for All) ==========
    // 1. Dropdown: not left on blank default
    const waterIssue = document.getElementById('waterIssue');
    const waterIssueError = document.getElementById('waterIssueError');
    if (waterIssue.value === '') {
        waterIssueError.innerHTML = 'Please select an urgent water issue.';
        isValid = false;
    }

    // 2. Checkbox list (same name="solutions") – at least one checked (loop)
    const solutionChecks = document.getElementsByName('solutions');
    let atLeastOneChecked = false;
    for (let i = 0; i < solutionChecks.length; i++) {
        if (solutionChecks[i].checked) {
            atLeastOneChecked = true;
            break;
        }
    }
    const solutionsError = document.getElementById('solutionsError');
    if (!atLeastOneChecked) {
        solutionsError.innerHTML = 'Please select at least one solution that interests you.';
        isValid = false;
    }

    // 3. Third question (textarea) – not empty (simple validation for engagement)
    const commitment = document.getElementById('commitment').value.trim();
    const commitmentError = document.getElementById('commitmentError');
    if (commitment === '') {
        commitmentError.innerHTML = 'Please share one action you can commit to for clean water.';
        isValid = false;
    }

    // ========== DISPLAY SUCCESS MESSAGE IF VALID ==========
    if (isValid) {
        successDiv.innerHTML = '✅ Thank you for joining Water for All! Together we can achieve SDG 6.';
        // Optional: you could also reset the form here, but not required.
        // The instruction only asks to show success message.
    }

    return isValid;
}