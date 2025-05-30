// Navigation functionality
document.addEventListener('DOMContentLoaded', function() {
    const navLinks = document.querySelectorAll('.nav-link');
    const sections = document.querySelectorAll('.content-section');
    
    // Navigation handler
    navLinks.forEach(link => {
        link.addEventListener('click', function(e) {
            e.preventDefault();
            
            // Remove active class from all nav links
            navLinks.forEach(nl => nl.classList.remove('active'));
            // Add active class to clicked link
            this.classList.add('active');
            
            // Hide all sections
            sections.forEach(section => section.classList.remove('active'));
            
            // Show target section
            const targetId = this.getAttribute('href').substring(1);
            const targetSection = document.getElementById(targetId);
            if (targetSection) {
                targetSection.classList.add('active');
                // Smooth scroll to top
                window.scrollTo({ top: 0, behavior: 'smooth' });
            }
        });
    });
    
    // Initialize interactive effects
    initInteractiveEffects();
});

// Show article function - reads content from hidden HTML divs
function showArticle(articleId) {
    const contentDiv = document.getElementById(articleId + '-content');
    if (contentDiv) {
        const title = getArticleTitle(articleId);
        showModal(title, contentDiv.innerHTML);
    } else {
        alert('Artikel sedang dalam pengembangan. Coming soon!');
    }
}

// Show reference function - reads content from hidden HTML divs
function showReference(refId) {
    const contentDiv = document.getElementById(refId + '-content');
    if (contentDiv) {
        const title = getReferenceTitle(refId);
        showModal(title, contentDiv.innerHTML);
    } else {
        alert('Referensi sedang dalam pengembangan. Coming soon!');
    }
}

// Helper functions to get titles
function getArticleTitle(articleId) {
    const titles = {
        'linux-intro': 'Apa itu Linux?',
        'linux-distro': 'Memilih Distribusi Linux',
        'ubuntu-install': 'Instalasi Linux Ubuntu',
        'desktop-env': 'Desktop Environment Linux',
        'terminal-intro': 'Pengantar Terminal Linux',
        'filesystem': 'File System Linux',
        'user-management': 'User & Group Management',
        'package-mgmt': 'Package Management',
        'process-mgmt': 'Process Management',
        'networking': 'Networking di Linux',
        'shell-scripting': 'Shell Scripting Basics',
        'systemd': 'System Services & Systemd',
        'security': 'Linux Security Hardening',
        'server-admin': 'Server Administration',
        'docker': 'Container & Docker',
        'automation': 'Automation & Scripting',
        'performance': 'Performance Tuning',
        'backup': 'Backup & Recovery'
    };
    return titles[articleId] || 'Artikel Linux';
}

function getReferenceTitle(refId) {
    const titles = {
        'commands': 'Command Line Cheat Sheet',
        'sysadmin': 'System Administration Quick Reference',
        'networking': 'Networking Tools & Commands',
        'bash': 'Bash Scripting Reference',
        'security': 'Security Checklist',
        'resources': 'Useful Resources'
    };
    return titles[refId] || 'Referensi Linux';
}

// Modal functionality
function showModal(title, content) {
    // Create modal if doesn't exist
    let modal = document.getElementById('article-modal');
    if (!modal) {
        modal = document.createElement('div');
        modal.id = 'article-modal';
        modal.className = 'article-modal';
        modal.innerHTML = `
            <div class="article-content">
                <button class="close-btn" aria-label="Close">&times;</button>
                <div id="modal-content"></div>
            </div>
        `;
        document.body.appendChild(modal);
        
        // Close modal handlers
        modal.addEventListener('click', function(e) {
            if (e.target === modal) {
                closeModal();
            }
        });
        
        modal.querySelector('.close-btn').addEventListener('click', closeModal);
        
        // ESC key to close
        document.addEventListener('keydown', function(e) {
            if (e.key === 'Escape' && modal.style.display === 'block') {
                closeModal();
            }
        });
    }
    
    // Set content and show
    document.getElementById('modal-content').innerHTML = content;
    modal.style.display = 'block';
    document.body.style.overflow = 'hidden'; // Prevent background scrolling
    
    // Focus management for accessibility
    modal.querySelector('.close-btn').focus();
}

function closeModal() {
    const modal = document.getElementById('article-modal');
    if (modal) {
        modal.style.display = 'none';
        document.body.style.overflow = 'auto'; // Restore scrolling
    }
}

// Interactive effects
function initInteractiveEffects() {
    // Add hover effects to cards
    const cards = document.querySelectorAll('.article-card, .reference-card, .stat-item');
    cards.forEach(card => {
        card.addEventListener('mouseenter', function() {
            this.style.transform = 'translateY(-8px)';
            this.style.transition = 'transform 0.3s ease, box-shadow 0.3s ease';
        });
        
        card.addEventListener('mouseleave', function() {
            this.style.transform = 'translateY(0)';
        });
    });
    
    // Add click animation to buttons
    const buttons = document.querySelectorAll('button');
    buttons.forEach(button => {
        button.addEventListener('click', function() {
            this.style.transform = 'scale(0.95)';
            setTimeout(() => {
                this.style.transform = 'scale(1)';
            }, 150);
        });
    });
    
    // Add reading progress indicator
    addReadingProgress();
    
    // Add scroll to top button
    addScrollToTop();
}

// Reading progress indicator
function addReadingProgress() {
    const progressBar = document.createElement('div');
    progressBar.id = 'reading-progress';
    progressBar.style.cssText = `
        position: fixed;
        top: 0;
        left: 0;
        width: 0%;
        height: 3px;
        background: linear-gradient(90deg, #3498db, #2c3e50);
        z-index: 9999;
        transition: width 0.3s ease;
    `;
    document.body.appendChild(progressBar);
    
    // Update progress on scroll
    window.addEventListener('scroll', function() {
        const scrollPercent = (window.scrollY / (document.documentElement.scrollHeight - window.innerHeight)) * 100;
        progressBar.style.width = Math.min(scrollPercent, 100) + '%';
    });
}

// Scroll to top button
function addScrollToTop() {
    const scrollButton = document.createElement('button');
    scrollButton.innerHTML = '↑';
    scrollButton.id = 'scroll-to-top';
    scrollButton.setAttribute('aria-label', 'Scroll to top');
    scrollButton.style.cssText = `
        position: fixed;
        bottom: 30px;
        right: 30px;
        width: 50px;
        height: 50px;
        border-radius: 50%;
        background: linear-gradient(135deg, #3498db, #2c3e50);
        color: white;
        border: none;
        font-size: 1.5em;
        cursor: pointer;
        opacity: 0;
        visibility: hidden;
        transition: all 0.3s ease;
        z-index: 1000;
        box-shadow: 0 4px 12px rgba(0,0,0,0.3);
    `;
    
    scrollButton.addEventListener('click', function() {
        window.scrollTo({ top: 0, behavior: 'smooth' });
    });
    
    // Show/hide based on scroll position
    window.addEventListener('scroll', function() {
        if (window.scrollY > 300) {
            scrollButton.style.opacity = '1';
            scrollButton.style.visibility = 'visible';
        } else {
            scrollButton.style.opacity = '0';
            scrollButton.style.visibility = 'hidden';
        }
    });
    
    document.body.appendChild(scrollButton);
}

// Simple search functionality
function initSearch() {
    const searchContainer = document.createElement('div');
    searchContainer.style.cssText = `
        position: fixed;
        top: 80px;
        right: 20px;
        z-index: 1000;
        background: white;
        border-radius: 25px;
        box-shadow: 0 4px 12px rgba(0,0,0,0.1);
        padding: 0.5rem;
    `;
    
    const searchInput = document.createElement('input');
    searchInput.type = 'text';
    searchInput.placeholder = 'Cari artikel...';
    searchInput.style.cssText = `
        padding: 0.7rem 1rem;
        border: 2px solid #3498db;
        border-radius: 25px;
        background: white;
        outline: none;
        width: 250px;
        font-size: 0.9em;
    `;
    
    const clearButton = document.createElement('button');
    clearButton.innerHTML = '✕';
    clearButton.style.cssText = `
        background: none;
        border: none;
        position: absolute;
        right: 15px;
        top: 50%;
        transform: translateY(-50%);
        cursor: pointer;
        color: #7f8c8d;
        display: none;
    `;
    
    searchContainer.appendChild(searchInput);
    searchContainer.appendChild(clearButton);
    
    let searchResults = null;
    
    searchInput.addEventListener('input', function() {
        const query = this.value.toLowerCase().trim();
        
        if (query.length > 0) {
            clearButton.style.display = 'block';
            performSearch(query);
        } else {
            clearButton.style.display = 'none';
            clearSearch();
        }
    });
    
    clearButton.addEventListener('click', function() {
        searchInput.value = '';
        clearButton.style.display = 'none';
        clearSearch();
        searchInput.focus();
    });
    
    function performSearch(query) {
        const articles = document.querySelectorAll('.article-card, .reference-card');
        let hasResults = false;
        
        articles.forEach(card => {
            const title = card.querySelector('h3').textContent.toLowerCase();
            const excerpt = card.querySelector('p:not(.article-meta)').textContent.toLowerCase();
            
            if (title.includes(query) || excerpt.includes(query)) {
                card.style.display = 'block';
                card.style.opacity = '1';
                hasResults = true;
                
                // Highlight search terms
                highlightText(card, query);
            } else {
                card.style.display = 'none';
                card.style.opacity = '0.3';
            }
        });
        
        // Show "no results" message if needed
        if (!hasResults) {
            showNoResults(query);
        } else {
            hideNoResults();
        }
    }
    
    function clearSearch() {
        const articles = document.querySelectorAll('.article-card, .reference-card');
        articles.forEach(card => {
            card.style.display = 'block';
            card.style.opacity = '1';
            // Remove highlights
            removeHighlights(card);
        });
        hideNoResults();
    }
    
    function highlightText(element, query) {
        // Simple highlight implementation
        const textElements = element.querySelectorAll('h3, p:not(.article-meta)');
        textElements.forEach(el => {
            const text = el.textContent;
            const highlightedText = text.replace(
                new RegExp(query, 'gi'), 
                `<mark style="background: #ffeb3b; padding: 2px;">$&</mark>`
            );
            if (text !== highlightedText) {
                el.innerHTML = highlightedText;
            }
        });
    }
    
    function removeHighlights(element) {
        const marks = element.querySelectorAll('mark');
        marks.forEach(mark => {
            mark.outerHTML = mark.textContent;
        });
    }
    
    function showNoResults(query) {
        hideNoResults();
        const noResultsDiv = document.createElement('div');
        noResultsDiv.id = 'no-results';
        noResultsDiv.innerHTML = `
            <div style="text-align: center; padding: 2rem; color: #7f8c8d;">
                <h3>Tidak ada hasil untuk "${query}"</h3>
                <p>Coba kata kunci lain atau browse kategori di navigation menu.</p>
            </div>
        `;
        document.querySelector('main .container').appendChild(noResultsDiv);
    }
    
    function hideNoResults() {
        const noResultsDiv = document.getElementById('no-results');
        if (noResultsDiv) {
            noResultsDiv.remove();
        }
    }
    
    document.body.appendChild(searchContainer);
}

// Smooth scrolling for internal links
document.querySelectorAll('a[href^="#"]').forEach(anchor => {
    anchor.addEventListener('click', function (e) {
        e.preventDefault();
        const target = document.querySelector(this.getAttribute('href'));
        if (target) {
            target.scrollIntoView({
                behavior: 'smooth',
                block: 'start'
            });
        }
    });
});

// Initialize additional features
document.addEventListener