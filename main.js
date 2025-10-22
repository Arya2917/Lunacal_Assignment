// ===========================
// TAB SWITCHING FUNCTIONALITY
// ===========================

document.addEventListener('DOMContentLoaded', function() {
    
    // Get all tab buttons and tab panes
    const tabs = document.querySelectorAll('.tab');
    const tabPanes = document.querySelectorAll('.tab-pane');
    
    // Add click event to each tab
    tabs.forEach(tab => {
        tab.addEventListener('click', function() {
            const targetTab = this.getAttribute('data-tab');
            
            // Remove active class from all tabs and panes
            tabs.forEach(t => t.classList.remove('active'));
            tabPanes.forEach(pane => pane.classList.remove('active'));
            
            // Add active class to clicked tab
            this.classList.add('active');
            
            // Show corresponding tab pane
            const targetPane = document.getElementById(targetTab);
            if (targetPane) {
                targetPane.classList.add('active');
            }
        });
    });
    
    
    // ===========================
    // GALLERY NAVIGATION
    // ===========================
    
    const imageStrip = document.getElementById('imageStrip');
    const prevButton = document.getElementById('prev-arrow');
    const nextButton = document.getElementById('next-arrow');
    
    let currentPosition = 0;
    const scrollAmount = 170; // Width of thumbnail + gap
    
    // Next button click
    nextButton.addEventListener('click', function() {
        const maxScroll = imageStrip.scrollWidth - imageStrip.parentElement.clientWidth;
        
        if (currentPosition < maxScroll) {
            currentPosition += scrollAmount;
            if (currentPosition > maxScroll) {
                currentPosition = maxScroll;
            }
            imageStrip.style.transform = `translateX(-${currentPosition}px)`;
        }
    });
    
    // Previous button click
    prevButton.addEventListener('click', function() {
        if (currentPosition > 0) {
            currentPosition -= scrollAmount;
            if (currentPosition < 0) {
                currentPosition = 0;
            }
            imageStrip.style.transform = `translateX(-${currentPosition}px)`;
        }
    });
    
    
    // ===========================
    // ADD IMAGE FUNCTIONALITY
    // ===========================
    
    const addImageButton = document.querySelector('.btn-add-image');
    
    addImageButton.addEventListener('click', function() {
        // Create file input element
        const input = document.createElement('input');
        input.type = 'file';
        input.accept = 'image/*';
        
        // Handle file selection
        input.addEventListener('change', function(e) {
            const file = e.target.files[0];
            
            if (file && file.type.startsWith('image/')) {
                const reader = new FileReader();
                
                reader.onload = function(event) {
                    // Create new thumbnail
                    const newThumbnail = document.createElement('div');
                    newThumbnail.className = 'image-thumbnail';
                    
                    const img = document.createElement('img');
                    img.src = event.target.result;
                    img.alt = 'Uploaded Image';
                    
                    newThumbnail.appendChild(img);
                    imageStrip.appendChild(newThumbnail);
                    
                    // Add hover effect to new thumbnail
                    newThumbnail.addEventListener('click', function() {
                        showImageModal(img.src);
                    });
                };
                
                reader.readAsDataURL(file);
            } else {
                alert('Please select a valid image file.');
            }
        });
        
        // Trigger file selection
        input.click();
    });
    
    
    // ===========================
    // IMAGE CLICK - MODAL VIEW (Optional Enhancement)
    // ===========================
    
    const thumbnails = document.querySelectorAll('.image-thumbnail');
    
    thumbnails.forEach(thumbnail => {
        thumbnail.addEventListener('click', function() {
            const img = this.querySelector('img');
            if (img) {
                showImageModal(img.src);
            }
        });
    });
    
    function showImageModal(imageSrc) {
        // Create modal overlay
        const modal = document.createElement('div');
        modal.style.cssText = `
            position: fixed;
            top: 0;
            left: 0;
            width: 100vw;
            height: 100vh;
            background: rgba(0, 0, 0, 0.9);
            display: flex;
            align-items: center;
            justify-content: center;
            z-index: 1000;
            cursor: pointer;
        `;
        
        // Create image element
        const img = document.createElement('img');
        img.src = imageSrc;
        img.style.cssText = `
            max-width: 90%;
            max-height: 90%;
            border-radius: 10px;
            box-shadow: 0 8px 32px rgba(0, 0, 0, 0.5);
        `;
        
        modal.appendChild(img);
        document.body.appendChild(modal);
        
        // Close modal on click
        modal.addEventListener('click', function() {
            document.body.removeChild(modal);
        });
        
        // Prevent body scroll
        document.body.style.overflow = 'hidden';
        
        // Restore scroll when modal is removed
        modal.addEventListener('click', function() {
            document.body.style.overflow = 'auto';
        });
    }
    
    
    // ===========================
    // SMOOTH SCROLL RESET ON LOAD
    // ===========================
    
    window.addEventListener('load', function() {
        imageStrip.style.transform = 'translateX(0)';
        currentPosition = 0;
    });
    
});


// ===========================
// KEYBOARD NAVIGATION (Optional Enhancement)
// ===========================

document.addEventListener('keydown', function(e) {
    const prevButton = document.getElementById('prev-arrow');
    const nextButton = document.getElementById('next-arrow');
    
    // Left arrow key
    if (e.key === 'ArrowLeft') {
        prevButton.click();
    }
    
    // Right arrow key
    if (e.key === 'ArrowRight') {
        nextButton.click();
    }
});