// Function to scroll to hero section
function scrollToHero() {
    const heroSection = document.querySelector('#home');
    if (heroSection) {
        heroSection.scrollIntoView({
            behavior: 'smooth',
            block: 'start'
        });
    }
}

// Smooth scrolling for navigation links
document.addEventListener('DOMContentLoaded', function() {
    // Smooth scrolling for navigation links
    const navLinks = document.querySelectorAll('.nav-link');
    
    navLinks.forEach(link => {
        link.addEventListener('click', function(e) {
            e.preventDefault();
            const targetId = this.getAttribute('href');
            const targetSection = document.querySelector(targetId);
            
            if (targetSection) {
                targetSection.scrollIntoView({
                    behavior: 'smooth',
                    block: 'start'
                });
            }
        });
    });

    // Mobile navigation toggle
    const hamburger = document.querySelector('.hamburger');
    const navMenu = document.querySelector('.nav-menu');
    const navActions = document.querySelector('.nav-actions');
    
    if (hamburger) {
        hamburger.addEventListener('click', function() {
            this.classList.toggle('active');
            
            // Toggle mobile menu
            if (navMenu) navMenu.classList.toggle('active');
            if (navActions) navActions.classList.toggle('active');
        });
    }

    // Navbar background change on scroll
    const navbar = document.querySelector('.navbar');
    
    window.addEventListener('scroll', function() {
        if (window.scrollY > 100) {
            navbar.classList.add('scrolled');
        } else {
            navbar.classList.remove('scrolled');
        }
    });

    // Search functionality
    const searchInput = document.querySelector('.search-box input');
    const searchButton = document.querySelector('.search-box button');
    
    if (searchButton) {
        searchButton.addEventListener('click', function() {
            performSearch();
        });
    }
    
    if (searchInput) {
        searchInput.addEventListener('keypress', function(e) {
            if (e.key === 'Enter') {
                performSearch();
            }
        });
    }

    // Property card interactions
    const propertyCards = document.querySelectorAll('.property-card');
    
    propertyCards.forEach(card => {
        card.addEventListener('click', function() {
            // Add click effect
            this.style.transform = 'scale(0.98)';
            setTimeout(() => {
                this.style.transform = '';
            }, 150);
            
            // Here you would typically navigate to a property detail page
            console.log('Property clicked:', this.querySelector('h3').textContent);
        });
    });

    // Contact form handling
    const contactForm = document.querySelector('.contact-form');
    
    if (contactForm) {
        contactForm.addEventListener('submit', function(e) {
            e.preventDefault();
            handleContactForm();
        });
    }

    // Newsletter form handling
    const newsletterForm = document.querySelector('.newsletter-form');
    
    if (newsletterForm) {
        newsletterForm.addEventListener('submit', function(e) {
            e.preventDefault();
            handleNewsletterForm();
        });
    }

    // Intersection Observer for animations
    const observerOptions = {
        threshold: 0.1,
        rootMargin: '0px 0px -50px 0px'
    };

    const observer = new IntersectionObserver(function(entries) {
        entries.forEach(entry => {
            if (entry.isIntersecting) {
                entry.target.classList.add('animate-in');
                // Add staggered animation delays
                const children = entry.target.querySelectorAll('.property-card, .feature-card, .amenity-item');
                children.forEach((child, index) => {
                    child.style.animationDelay = `${index * 0.1}s`;
                });
            }
        });
    }, observerOptions);

    // Observe elements for animation
    const animateElements = document.querySelectorAll('.property-card, .feature-card, .about-content, .contact-content, .properties-grid, .features-grid');
    animateElements.forEach(el => observer.observe(el));

    // Moving dots are now handled by CSS animations

    // Parallax effect for hero section
    const hero = document.querySelector('.hero');
    
    if (hero) {
        window.addEventListener('scroll', function() {
            const scrolled = window.pageYOffset;
            const rate = scrolled * -0.5;
            hero.style.transform = `translateY(${rate}px)`;
        });
    }

    // Property availability (placeholder for future functionality)
    const viewMoreButton = document.querySelector('.view-more .btn-secondary');
    
    if (viewMoreButton) {
        viewMoreButton.addEventListener('click', function() {
            // Simulate checking availability
            this.textContent = 'Checking...';
            this.disabled = true;
            
            setTimeout(() => {
                this.textContent = 'View Availability';
                this.disabled = false;
                console.log('Checking property availability...');
            }, 2000);
        });
    }

    // Smooth reveal animations for sections
    const sections = document.querySelectorAll('section');
    
    const sectionObserver = new IntersectionObserver(function(entries) {
        entries.forEach(entry => {
            if (entry.isIntersecting) {
                entry.target.classList.add('section-visible');
            }
        });
    }, { threshold: 0.2 });

    sections.forEach(section => sectionObserver.observe(section));
});

// Search functionality
function performSearch() {
    const searchInput = document.querySelector('.search-box input');
    const searchTerm = searchInput.value.trim();
    
    if (searchTerm) {
        // Add loading state
        const searchButton = document.querySelector('.search-box button');
        const originalText = searchButton.textContent;
        searchButton.textContent = 'Searching...';
        searchButton.disabled = true;
        
        // Simulate search
        setTimeout(() => {
            searchButton.textContent = originalText;
            searchButton.disabled = false;
            
            // Show search results (placeholder)
            showSearchResults(searchTerm);
        }, 1500);
    } else {
        // Show error message
        showNotification('Please enter a search term', 'error');
    }
}

// Show search results (placeholder)
function showSearchResults(searchTerm) {
    console.log(`Checking guest count: ${searchTerm}`);
    showNotification(`Finding properties available for ${searchTerm} guests...`, 'success');
    
    // Here you would typically filter properties by guest capacity
    // For now, just scroll to properties section
    const propertiesSection = document.querySelector('#properties');
    if (propertiesSection) {
        propertiesSection.scrollIntoView({ behavior: 'smooth' });
    }
}

// Contact form handling
function handleContactForm() {
    const form = document.querySelector('.contact-form');
    const formData = new FormData(form);
    
    // Get form values
    const name = formData.get('name') || form.querySelector('input[type="text"]').value;
    const email = formData.get('email') || form.querySelector('input[type="email"]').value;
    const subject = formData.get('subject') || form.querySelectorAll('input[type="text"]')[1].value;
    const message = formData.get('message') || form.querySelector('textarea').value;
    
    if (name && email && subject && message) {
        // Simulate form submission
        const submitButton = form.querySelector('button[type="submit"]');
        const originalText = submitButton.textContent;
        submitButton.textContent = 'Sending...';
        submitButton.disabled = true;
        
        setTimeout(() => {
            submitButton.textContent = originalText;
            submitButton.disabled = false;
            
            // Show success message
            showNotification('Message sent successfully! We\'ll get back to you soon.', 'success');
            
            // Reset form
            form.reset();
        }, 2000);
    } else {
        showNotification('Please fill in all fields', 'error');
    }
}

// Newsletter form handling
function handleNewsletterForm() {
    const form = document.querySelector('.newsletter-form');
    const emailInput = form.querySelector('input[type="email"]');
    const email = emailInput.value.trim();
    
    if (email && isValidEmail(email)) {
        const button = form.querySelector('button');
        const originalText = button.textContent;
        button.textContent = 'Subscribing...';
        button.disabled = true;
        
        setTimeout(() => {
            button.textContent = originalText;
            button.disabled = false;
            
            showNotification('Successfully subscribed to newsletter!', 'success');
            emailInput.value = '';
        }, 1500);
    } else {
        showNotification('Please enter a valid email address', 'error');
    }
}

// Email validation
function isValidEmail(email) {
    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    return emailRegex.test(email);
}

// Notification system
function showNotification(message, type = 'info') {
    // Remove existing notifications
    const existingNotifications = document.querySelectorAll('.notification');
    existingNotifications.forEach(notification => notification.remove());
    
    // Create notification element
    const notification = document.createElement('div');
    notification.className = `notification notification-${type}`;
    notification.innerHTML = `
        <div class="notification-content">
            <span class="notification-message">${message}</span>
            <button class="notification-close">&times;</button>
        </div>
    `;
    
    // Add styles
    notification.style.cssText = `
        position: fixed;
        top: 100px;
        right: 20px;
        background: ${type === 'success' ? '#4CAF50' : type === 'error' ? '#f44336' : '#2196F3'};
        color: white;
        padding: 16px 20px;
        border-radius: 8px;
        box-shadow: 0 4px 12px rgba(0,0,0,0.15);
        z-index: 10000;
        max-width: 400px;
        animation: slideIn 0.3s ease-out;
    `;
    
    // Add animation styles
    const style = document.createElement('style');
    style.textContent = `
        @keyframes slideIn {
            from { transform: translateX(100%); opacity: 0; }
            to { transform: translateX(0); opacity: 1; }
        }
        .notification-content {
            display: flex;
            justify-content: space-between;
            align-items: center;
        }
        .notification-close {
            background: none;
            border: none;
            color: white;
            font-size: 20px;
            cursor: pointer;
            margin-left: 16px;
        }
    `;
    document.head.appendChild(style);
    
    // Add to page
    document.body.appendChild(notification);
    
    // Close button functionality
    const closeButton = notification.querySelector('.notification-close');
    closeButton.addEventListener('click', () => {
        notification.remove();
    });
    
    // Auto-remove after 5 seconds
    setTimeout(() => {
        if (notification.parentNode) {
            notification.remove();
        }
    }, 5000);
}

// Add CSS for navbar scroll effect
const navbarStyles = `
    .navbar.scrolled {
        background: rgba(255, 255, 255, 0.95);
        backdrop-filter: blur(20px);
        box-shadow: 0 4px 20px rgba(0, 0, 0, 0.1);
    }
    
    .section-visible {
        animation: fadeInUp 0.8s ease-out;
    }
    
    @keyframes fadeInUp {
        from {
            opacity: 0;
            transform: translateY(30px);
        }
        to {
            opacity: 1;
            transform: translateY(0);
        }
    }
    
    .animate-in {
        animation: slideInUp 0.6s ease-out;
    }
    
    @keyframes slideInUp {
        from {
            opacity: 0;
            transform: translateY(40px);
        }
        to {
            opacity: 1;
            transform: translateY(0);
        }
    }
    
    @media (max-width: 768px) {
        .nav-menu.active,
        .nav-actions.active {
            display: flex;
            flex-direction: column;
            position: absolute;
            top: 80px;
            left: 0;
            right: 0;
            background: white;
            box-shadow: 0 4px 20px rgba(0,0,0,0.1);
            padding: 2rem;
            gap: 1rem;
        }
        
        .hamburger.active span:nth-child(1) {
            transform: rotate(45deg) translate(5px, 5px);
        }
        
        .hamburger.active span:nth-child(2) {
            opacity: 0;
        }
        
        .hamburger.active span:nth-child(3) {
            transform: rotate(-45deg) translate(7px, -6px);
        }
    }
`;

// Inject navbar styles
const navbarStyleSheet = document.createElement('style');
navbarStyleSheet.textContent = navbarStyles;
document.head.appendChild(navbarStyleSheet);


// Add some interactive hover effects
document.addEventListener('DOMContentLoaded', function() {
    // Add hover effects to property cards
    const propertyCards = document.querySelectorAll('.property-card');
    
    propertyCards.forEach(card => {
        card.addEventListener('mouseenter', function() {
            this.style.transform = 'translateY(-10px) scale(1.02)';
        });
        
        card.addEventListener('mouseleave', function() {
            this.style.transform = 'translateY(0) scale(1)';
        });
    });
    
    // Add click ripple effect to buttons
    const buttons = document.querySelectorAll('.btn-primary, .btn-secondary');
    
    buttons.forEach(button => {
        button.addEventListener('click', function(e) {
            const ripple = document.createElement('span');
            const rect = this.getBoundingClientRect();
            const size = Math.max(rect.width, rect.height);
            const x = e.clientX - rect.left - size / 2;
            const y = e.clientY - rect.top - size / 2;
            
            ripple.style.cssText = `
                position: absolute;
                width: ${size}px;
                height: ${size}px;
                left: ${x}px;
                top: ${y}px;
                background: rgba(255, 255, 255, 0.3);
                border-radius: 50%;
                transform: scale(0);
                animation: ripple 0.6s linear;
                pointer-events: none;
            `;
            
            this.style.position = 'relative';
            this.style.overflow = 'hidden';
            this.appendChild(ripple);
            
            setTimeout(() => {
                ripple.remove();
            }, 600);
        });
    });
    
    // Add ripple animation
    const rippleStyle = document.createElement('style');
    rippleStyle.textContent = `
        @keyframes ripple {
            to {
                transform: scale(4);
                opacity: 0;
            }
        }
    `;
    document.head.appendChild(rippleStyle);
});

// Mock property data with availability
const propertiesData = [
    {
        name: 'Modern Mountain Retreat',
        maxGuests: 8,
        bookedRanges: [
            { start: new Date('2024-10-01'), end: new Date('2024-10-05') },
            { start: new Date('2024-10-10'), end: new Date('2024-10-15') }
        ]
    },
    {
        name: 'Oceanfront Beach House',
        maxGuests: 6,
        bookedRanges: [
            { start: new Date('2024-10-03'), end: new Date('2024-10-07') }
        ]
    },
    {
        name: 'Cozy Forest Cabin',
        maxGuests: 4,
        bookedRanges: []
    },
    {
        name: 'Luxury Desert Villa',
        maxGuests: 10,
        bookedRanges: [
            { start: new Date('2024-10-20'), end: new Date('2024-10-25') }
        ]
    }
];

// Function to check if date range is available
function isAvailable(property, checkin, checkout) {
    for (const range of property.unavailableRanges || []) {
        if (checkin < range.end && checkout > range.start) {
            return false;
        }
    }
    return true;
}

// Function to fetch booked ranges from Google Calendar
async function fetchBookedRangesFromCalendar(homeName) {
    const apiKey = localStorage.getItem('googleApiKey');
    const calendarId = localStorage.getItem('googleCalendarId');
    
    if (!apiKey || !calendarId) return [];
    
    await gapi.load('client', async () => {
        await gapi.client.init({
            apiKey: apiKey,
            discoveryDocs: ['https://www.googleapis.com/discovery/v1/apis/calendar/v3/rest'],
        });
    });
    
    const timeMin = new Date().toISOString();
    const timeMax = new Date(Date.now() + 365 * 24 * 60 * 60 * 1000).toISOString(); // Next year
    
    const response = await gapi.client.calendar.events.list({
        calendarId: calendarId,
        timeMin: timeMin,
        timeMax: timeMax,
        singleEvents: true,
        orderBy: 'startTime',
    });
    
    const events = response.result.items || [];
    return events
        .filter(event => event.summary.toLowerCase().includes(homeName.toLowerCase()))
        .map(event => ({
            start: new Date(event.start.date || event.start.dateTime),
            end: new Date(event.end.date || event.end.dateTime)
        }));
}

// Initialize properties in localStorage if not exists
if (!localStorage.getItem('properties')) {
    const initialProperties = [
        {
            name: 'Oceanfront Beach House',
            location: 'Maui, HI',
            beds: 3,
            baths: 2,
            maxGuests: 6,
            price: 400,
            imageUrl: 'https://images.unsplash.com/photo-1571896349842-33c89424de2d?w=400&h=300&fit=crop',
            color: '#2196F3',
            unavailableRanges: [
                { start: new Date('2024-10-03'), end: new Date('2024-10-07') }
            ]
        },
        {
            name: 'Cozy Country Chalet Between Downtown & Ski Resort',
            location: 'Durango, CO',
            beds: 3,
            bedrooms: 2,
            baths: 1,
            maxGuests: 4,
            price: 485,
            imageUrl: 'A frame 1.avif',
            images: [
                'A frame 0.avif',
                'A frame 1.avif',
                'A frame 2.avif',
                'A frame 3.avif',
                'A frame 4.avif',
                'A frame 5.avif',
                'A frame 6.jpeg',
                'A frame 7.avif',
                'A frame 8.avif',
                'A frame 9.avif',
                'A frame 10.avif',
                'A frame 11.avif',
                'A frame 12.avif',
                'A frame 13.avif',
                'A frame 14.avif',
                'A frame 15.avif',
                'A frame 16.avif',
                'A frame 17.webp',
                'A frame 19.avif',
                'A frame 21.avif',
                'A frame 22.avif',
                'A frame 23.avif'
            ],
            color: '#FFC107',
            unavailableRanges: [],
            amenities: {
                'Scenic views': [
                    'Mountain view'
                ],
                'Bathroom': [
                    'Hair dryer',
                    'Shampoo',
                    'Hot water'
                ],
                'Bedroom and laundry': [
                    'Essentials - Towels, bed sheets, soap, and toilet paper',
                    'Hangers',
                    'Iron'
                ],
                'Entertainment': [
                    'TV'
                ],
                'Heating and cooling': [
                    'Heating'
                ],
                'Home safety': [
                    'Smoke alarm',
                    'Carbon monoxide alarm',
                    'Fire extinguisher'
                ],
                'Internet and office': [
                    'Wifi'
                ],
                'Kitchen and dining': [
                    'Kitchen - Space where guests can cook their own meals',
                    'Refrigerator',
                    'Microwave',
                    'Cooking basics - Pots and pans, oil, salt and pepper',
                    'Dishes and silverware - Bowls, chopsticks, plates, cups, etc.',
                    'Coffee maker'
                ],
                'Location features': [
                    'Private entrance - Separate street or building entrance'
                ],
                'Outdoor': [
                    'Patio or balcony'
                ],
                'Parking and facilities': [
                    'Free parking on premises'
                ],
                'Services': [
                    'Pets allowed - Assistance animals are always allowed',
                    'Self check-in - Keypad',
                    'Check yourself into the home with a door code'
                ]
            },
            notIncluded: [
                'Washer',
                'Dryer',
                'Air conditioning'
            ]
        },
        {
            name: 'Luxury Desert Villa',
            location: 'Palm Springs, CA',
            beds: 5,
            baths: 4,
            maxGuests: 10,
            price: 600,
            imageUrl: 'https://images.unsplash.com/photo-1600607687939-ce8a6c25118c?w=400&h=300&fit=crop',
            color: '#E91E63',
            unavailableRanges: [
                { start: new Date('2024-10-20'), end: new Date('2024-10-25') }
            ]
        }
    ];
    localStorage.setItem('properties', JSON.stringify(initialProperties));
}

// Function to render properties
function renderProperties(propertiesToShow) {
    const grid = document.querySelector('.properties-grid');
    grid.innerHTML = '';
    
    propertiesToShow.forEach(property => {
        const card = document.createElement('div');
        card.className = 'property-card';
        card.innerHTML = `
            <a href="property-detail.html?home=${encodeURIComponent(property.name)}" class="property-card-link">
                <div class="property-image">
                    <img src="${property.imageUrl}" alt="${property.name}">
                    <div class="property-badge">Popular</div>
                </div>
                <div class="property-content">
                    <h3>${property.name}</h3>
                    <p class="location"><i class="fas fa-map-marker-alt"></i> ${property.location}</p>
                    <div class="amenities">
                        <span><i class="fas fa-bed"></i> ${property.beds} beds</span>
                        <span><i class="fas fa-bath"></i> ${property.baths} baths</span>
                        <span><i class="fas fa-users"></i> ${property.maxGuests} guests</span>
                    </div>
                    <div class="property-footer">
                        <div class="rating">
                            <i class="fas fa-star"></i>
                            <span>4.8</span>
                        </div>
                        <span class="price">$${property.price}/night</span>
                    </div>
                </div>
            </a>
        `;
        grid.appendChild(card);
    });
}

// Update search handling to fetch calendar data
document.addEventListener('DOMContentLoaded', function() {
    const properties = JSON.parse(localStorage.getItem('properties')) || [];
    renderProperties(properties);
    
    // Set minimum dates
    const today = new Date().toISOString().split('T')[0];
    const checkinInput = document.getElementById('search-checkin');
    const checkoutInput = document.getElementById('search-checkout');
    if (checkinInput) checkinInput.min = today;
    if (checkoutInput) checkoutInput.min = today;

    if (checkinInput) {
        checkinInput.addEventListener('change', function() {
            const checkinDate = new Date(this.value);
            checkinDate.setDate(checkinDate.getDate() + 1);
            const minCheckout = checkinDate.toISOString().split('T')[0];
            if (checkoutInput) checkoutInput.min = minCheckout;
        });
    }

    // Update search handling to use dynamic properties
    const searchForm = document.getElementById('hero-search-form');
    if (searchForm) {
        searchForm.addEventListener('submit', async function(e) {
            e.preventDefault();
            const checkinStr = document.getElementById('search-checkin').value;
            const checkoutStr = document.getElementById('search-checkout').value;
            const guests = parseInt(document.getElementById('search-guests').value);

            if (!checkinStr || !checkoutStr || isNaN(guests)) {
                showNotification('Please fill all fields', 'error');
                return;
            }

            const checkin = new Date(checkinStr);
            const checkout = new Date(checkoutStr);

            if (checkout <= checkin) {
                showNotification('Check-out must be after check-in', 'error');
                return;
            }

            let properties = JSON.parse(localStorage.getItem('properties')) || [];
            
            // Update bookedRanges from calendar
            for (let property of properties) {
                const calendarRanges = await fetchBookedRangesFromCalendar(property.name);
                property.unavailableRanges = [...property.unavailableRanges, ...calendarRanges];
            }

            const filtered = properties.filter(property => 
                property.maxGuests >= guests && isAvailable(property, checkin, checkout)
            );

            renderProperties(filtered);
            showNotification(`Found ${filtered.length} available properties for ${guests} guests from ${checkinStr} to ${checkoutStr}`, 'success');

            const propertiesSection = document.querySelector('#properties');
            if (propertiesSection) {
                propertiesSection.scrollIntoView({ behavior: 'smooth' });
            }
        });
    }
});




