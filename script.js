document.addEventListener('DOMContentLoaded', () => {
    const noBtn = document.getElementById('noBtn');
    const yesBtn = document.getElementById('yesBtn');
    const mainCard = document.getElementById('mainCard');
    const nameCard = document.getElementById('nameCard');
    const messageContainer = document.getElementById('messageContainer');
    const successContainer = document.getElementById('successContainer');
    const nameInput = document.getElementById('nameInput');
    const submitNameBtn = document.getElementById('submitNameBtn');

    let attempts = 0;
    const maxAttempts = 5;
    let userName = '';

    // Initialize Supabase
    if (typeof initSupabase === 'function') {
        initSupabase();
    }

    // Handle Name Submission
    submitNameBtn.addEventListener('click', () => {
        const name = nameInput.value.trim();
        if (name) {
            userName = name;
            nameCard.style.display = 'none';
            mainCard.style.display = 'block';
        } else {
            alert('Please enter your name!');
        }
    });

    // Handle Enter key in input
    nameInput.addEventListener('keypress', (e) => {
        if (e.key === 'Enter') {
            submitNameBtn.click();
        }
    });

    // Helper to get random position (Full Screen Random)
    const getRandomPosition = (element) => {
        const viewportWidth = window.innerWidth;
        const viewportHeight = window.innerHeight;
        const btnRect = element.getBoundingClientRect();

        const padding = 50;
        const maxLeft = viewportWidth - btnRect.width - padding;
        const maxTop = viewportHeight - btnRect.height - padding;

        const randomLeft = Math.max(padding, Math.floor(Math.random() * maxLeft));
        const randomTop = Math.max(padding, Math.floor(Math.random() * maxTop));

        return { left: randomLeft, top: randomTop };
    };

    const runAway = () => {
        attempts++;

        if (noBtn.parentNode !== document.body) {
            document.body.appendChild(noBtn);
        }

        const newPos = getRandomPosition(noBtn);
        noBtn.style.position = 'fixed';
        noBtn.style.left = `${newPos.left}px`;
        noBtn.style.top = `${newPos.top}px`;
        noBtn.style.zIndex = '9999';

        if (attempts >= maxAttempts) {
            showMessage();
            // Save response to DB (No limit reached)
            if (typeof saveResponse === 'function' && userName) {
                saveResponse(userName, 'No (Limit Reached)');
            }
        }
    };

    const showMessage = () => {
        if (noBtn.parentNode === document.body) {
            noBtn.remove();
        } else {
            noBtn.style.display = 'none';
        }

        if (noBtn.parentNode) {
            noBtn.parentNode.removeChild(noBtn);
        }

        messageContainer.style.display = 'block';

        // Set the distinct puppy image
        const img = document.getElementById('catImg');
        img.src = 'teary_puppy.jpg';
        img.onerror = () => {
            console.log('Image failed to load, switching to JPEG fallback');
            img.src = 'download (1).jpeg';
        };
    };

    noBtn.addEventListener('mouseover', runAway);
    noBtn.addEventListener('click', runAway);

    yesBtn.addEventListener('click', () => {
        mainCard.style.display = 'none';
        successContainer.style.display = 'block';
        launchConfetti();

        if (noBtn && noBtn.parentNode) {
            noBtn.parentNode.removeChild(noBtn);
        }

        // Save response to DB (Yes)
        if (typeof saveResponse === 'function' && userName) {
            saveResponse(userName, 'Yes');
        }
    });

    const launchConfetti = () => {
        document.body.style.background = 'linear-gradient(135deg, #ff9a9e 0%, #ff5e62 100%)';
    };
});
