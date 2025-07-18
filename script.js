// script.js

// Keep your existing functions first
function addRecommendation() {
    // Get the message of the new recommendation
    let recommendation = document.getElementById("new_recommendation");
    // If the user has left a recommendation, display a pop-up
    if (recommendation.value != null && recommendation.value.trim() != "") {
        console.log("New recommendation added");
        showPopup(true);

        // Create a new 'recommendation' element and set it's value to the user's message
        var element = document.createElement("div");
        element.setAttribute("class", "recommendation");
        element.innerHTML = "\<span\>&#8220;\</span\>" + recommendation.value + "\<span\>&#8221;\</span\>";
        // Add this element to the end of the list of recommendations
        document.getElementById("all_recommendations").appendChild(element);

        // Reset the value of the textarea
        recommendation.value = "";
    }
}

function showPopup(bool) {
    if (bool) {
        document.getElementById('popup').style.visibility = 'visible';
    } else {
        document.getElementById('popup').style.visibility = 'hidden';
    }
}

document.addEventListener('DOMContentLoaded', function() {
    const ANIMATION_SETTINGS = {
        baseDelay: 200,
        threshold: 0.2 // Increased trigger area
    };

    const animateOnScroll = (selector) => {
        const elements = document.querySelectorAll(selector);

        const observer = new IntersectionObserver((entries) => {
            entries.forEach((entry, index) => {
                // Trigger both when scrolling down AND up
                if (entry.isIntersecting || entry.boundingClientRect.top > 0) {
                    const delay = ANIMATION_SETTINGS.baseDelay * (index + 1);

                    setTimeout(() => {
                        entry.target.classList.toggle('active', entry.isIntersecting);
                    }, delay);
                }
            });
        }, {
            threshold: ANIMATION_SETTINGS.threshold,
            rootMargin: "0px 0px -100px 0px" // 100px early trigger
        });

        elements.forEach(el => {
            observer.observe(el);
            // Initialize already-visible elements
            if (el.getBoundingClientRect().top < window.innerHeight) {
                el.classList.add('active');
            }
        });
    };

    animateOnScroll('.skill');
    animateOnScroll('.recommendation');


    // --- DARK MODE JAVASCRIPT ---
    const themeToggle = document.getElementById('theme-toggle');
    const body = document.body;
    const localStorageKey = 'theme-preference'; // Key for localStorage

    // Function to set the theme (dark or light)
    function setTheme(theme) {
        if (theme === 'dark') {
            body.classList.add('dark-mode');
            body.classList.remove('light-mode'); // Ensure light-mode is removed if it exists
            themeToggle.textContent = 'Toggle Light Mode'; // Update button text
        } else {
            body.classList.remove('dark-mode');
            body.classList.add('light-mode'); // Add light-mode for explicit light choice (overrides system preference)
            themeToggle.textContent = 'Toggle Dark Mode'; // Update button text
        }
        localStorage.setItem(localStorageKey, theme); // Save preference to localStorage
    }

    // Function to get the theme preference
    function getPreferredTheme() {
        // 1. Check localStorage first for user's explicit choice
        const storedTheme = localStorage.getItem(localStorageKey);
        if (storedTheme) {
            return storedTheme;
        }

        // 2. If no localStorage preference, check system preference
        if (window.matchMedia && window.matchMedia('(prefers-color-scheme: dark)').matches) {
            return 'dark';
        }

        // 3. Default to light mode if no preference found anywhere
        return 'light';
    }

    // Apply the correct theme when the page loads
    setTheme(getPreferredTheme());

    // Event listener for the theme toggle button
    themeToggle.addEventListener('click', () => {
        const currentTheme = body.classList.contains('dark-mode') ? 'dark' : 'light';
        const newTheme = currentTheme === 'dark' ? 'light' : 'dark'; // Toggle the theme
        setTheme(newTheme); // Apply and save the new theme
    });

    // Optional: Listen for changes in the system's color scheme (e.g., user changes OS theme)
    window.matchMedia('(prefers-color-scheme: dark)').addEventListener('change', (e) => {
        // Only react to system changes if the user hasn't explicitly set a preference
        // This ensures a manual toggle overrides the system setting until it's changed again
        if (!localStorage.getItem(localStorageKey)) {
            setTheme(e.matches ? 'dark' : 'light');
        }
    });
    // --- END DARK MODE JAVASCRIPT ---
});