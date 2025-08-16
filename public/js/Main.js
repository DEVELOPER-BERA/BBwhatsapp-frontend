// Mobile menu toggle
document.addEventListener('DOMContentLoaded', function() {
    const menuToggle = document.getElementById('menu-toggle');
    const mobileMenu = document.getElementById('mobile-menu');

    if (menuToggle && mobileMenu) {
        menuToggle.addEventListener('click', function() {
            mobileMenu.classList.toggle('hidden');
        });
    }

    // Handle contact selection in mobile view
    const contacts = document.querySelectorAll('.contact');
    const chatArea = document.querySelector('.chat-area');

    contacts.forEach(contact => {
        contact.addEventListener('click', function() {
            if (window.innerWidth <= 768) {
                document.querySelector('.sidebar').classList.add('hidden');
                chatArea.classList.add('active');
            }
        });
    });

    // Back button for mobile chat
    const backButton = document.getElementById('back-button');
    if (backButton) {
        backButton.addEventListener('click', function() {
            document.querySelector('.sidebar').classList.remove('hidden');
            chatArea.classList.remove('active');
        });
    }
});
