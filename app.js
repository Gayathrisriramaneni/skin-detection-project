// Comprehensive Skincare Platform Application
class SkinCareApp {
    constructor() {
        this.currentUser = null;
        this.currentSection = 'homeSection';
        this.cart = [];
        this.skinAnalysisResults = null;
        this.cameraStream = null;
        this.arStream = null;
        this.progressChart = null;
        
        // Application data
        this.skinConditions = {
            "acneTypes": [
                {"name": "Blackheads", "severity": "mild", "treatment": ["Salicylic Acid", "Retinoids"]},
                {"name": "Whiteheads", "severity": "mild", "treatment": ["Benzoyl Peroxide", "Salicylic Acid"]},
                {"name": "Papules", "severity": "moderate", "treatment": ["Benzoyl Peroxide", "Topical Antibiotics"]},
                {"name": "Pustules", "severity": "moderate", "treatment": ["Benzoyl Peroxide", "Clindamycin"]},
                {"name": "Nodules", "severity": "severe", "treatment": ["Prescription Retinoids", "Oral Antibiotics"]},
                {"name": "Cysts", "severity": "severe", "treatment": ["Isotretinoin", "Corticosteroid Injections"]},
                {"name": "Acne Scars", "severity": "post-inflammatory", "treatment": ["Vitamin C", "Chemical Peels"]}
            ],
            "skinTypes": [
                {"type": "Normal", "characteristics": "Balanced oil and moisture", "routine": "gentle"},
                {"type": "Dry", "characteristics": "Low oil production, tight feeling", "routine": "hydrating"},
                {"type": "Oily", "characteristics": "Excess sebum, enlarged pores", "routine": "oil-control"},
                {"type": "Combination", "characteristics": "Oily T-zone, dry cheeks", "routine": "balanced"},
                {"type": "Sensitive", "characteristics": "Reactive to products, redness", "routine": "gentle-sensitive"}
            ]
        };

        this.products = [
            {
                "id": 1, "name": "CeraVe Acne Foaming Cream Cleanser", "brand": "CeraVe", "category": "Cleanser",
                "price": 12.99, "rating": 4.5, "skinTypes": ["Oily", "Combination"], 
                "activeIngredients": ["Benzoyl Peroxide 4%"], "concerns": ["Acne", "Blackheads"],
                "description": "Gentle foaming cleanser with benzoyl peroxide to clear acne without over-drying",
                "inStock": true, "reviews": 1205
            },
            {
                "id": 2, "name": "The Ordinary Niacinamide 10% + Zinc 1%", "brand": "The Ordinary", "category": "Serum",
                "price": 6.20, "rating": 4.3, "skinTypes": ["Oily", "Combination", "Normal"],
                "activeIngredients": ["Niacinamide 10%", "Zinc 1%"], "concerns": ["Oil Control", "Pores", "Blemishes"],
                "description": "High-strength niacinamide serum to reduce sebum production and minimize pores",
                "inStock": true, "reviews": 8934
            },
            {
                "id": 3, "name": "La Roche-Posay Toleriane Double Repair Face Moisturizer", "brand": "La Roche-Posay", "category": "Moisturizer",
                "price": 19.99, "rating": 4.6, "skinTypes": ["Sensitive", "Dry", "Normal"],
                "activeIngredients": ["Ceramides", "Niacinamide"], "concerns": ["Hydration", "Barrier Repair"],
                "description": "Lightweight moisturizer with ceramides and niacinamide for sensitive skin",
                "inStock": true, "reviews": 2156
            },
            {
                "id": 4, "name": "Paula's Choice Skin Perfecting 2% BHA Liquid Exfoliant", "brand": "Paula's Choice", "category": "Exfoliant",
                "price": 32.00, "rating": 4.7, "skinTypes": ["Oily", "Combination"],
                "activeIngredients": ["Salicylic Acid 2%"], "concerns": ["Blackheads", "Texture", "Pores"],
                "description": "Cult-favorite BHA exfoliant that unclogs pores and smooths skin texture",
                "inStock": true, "reviews": 12847
            },
            {
                "id": 5, "name": "Differin Adapalene Gel 0.1%", "brand": "Differin", "category": "Treatment",
                "price": 13.69, "rating": 4.4, "skinTypes": ["Oily", "Combination"],
                "activeIngredients": ["Adapalene 0.1%"], "concerns": ["Acne", "Post-acne marks"],
                "description": "OTC retinoid treatment for acne and skin texture improvement",
                "inStock": true, "reviews": 5623
            }
        ];

        this.init();
    }

    init() {
        console.log('Initializing SkinCare App...');
        this.loadUserData();
        this.loadCartData();
        this.setupEventListeners();
        this.updateCartDisplay();
        this.updateAuthUI();
        this.renderProducts();
        
        // Initialize with a slight delay to ensure DOM is ready
        setTimeout(() => {
            this.initializeProgressChart();
        }, 100);
    }

    setupEventListeners() {
        console.log('Setting up event listeners...');
        
        // Wait for DOM to be fully loaded
        if (document.readyState === 'loading') {
            document.addEventListener('DOMContentLoaded', () => {
                this.bindAllEvents();
            });
        } else {
            this.bindAllEvents();
        }
    }

    bindAllEvents() {
        // Navigation
        this.setupNavigation();
        
        // Authentication
        this.setupAuth();
        
        // Skin Analysis
        this.setupSkinAnalysis();
        
        // Products & Cart
        this.setupProductsAndCart();
        
        // Routine tabs
        this.setupRoutineTabs();
        
        // AR Try-on
        this.setupARTryOn();
        
        // Consultation booking
        this.setupConsultation();
        
        // Modal management
        this.setupModals();

        console.log('All event listeners bound successfully');
    }

    setupNavigation() {
        // Bottom navigation
        const navItems = document.querySelectorAll('.nav-item');
        console.log('Found nav items:', navItems.length);
        
        navItems.forEach(item => {
            item.addEventListener('click', (e) => {
                e.preventDefault();
                const targetSection = item.dataset.section;
                console.log('Navigation clicked:', targetSection);
                this.showSection(targetSection);
                
                // Update active nav item
                navItems.forEach(nav => nav.classList.remove('active'));
                item.classList.add('active');
            });
        });

        // Hero buttons
        const startAnalysisBtn = document.getElementById('startAnalysisBtn');
        const browseProductsBtn = document.getElementById('browseProductsBtn');
        
        if (startAnalysisBtn) {
            console.log('Binding start analysis button');
            startAnalysisBtn.addEventListener('click', () => {
                console.log('Start analysis clicked');
                this.showSection('analysisSection');
                this.updateActiveNavItem('analysisSection');
            });
        }
        
        if (browseProductsBtn) {
            console.log('Binding browse products button');
            browseProductsBtn.addEventListener('click', () => {
                console.log('Browse products clicked');
                this.showSection('productsSection');
                this.updateActiveNavItem('productsSection');
            });
        }

        // Brand logo - home navigation
        const navBrand = document.querySelector('.nav-brand');
        if (navBrand) {
            navBrand.addEventListener('click', () => {
                this.showSection('homeSection');
                this.updateActiveNavItem('homeSection');
            });
            navBrand.style.cursor = 'pointer';
        }
    }

    updateActiveNavItem(sectionId) {
        const navItems = document.querySelectorAll('.nav-item');
        navItems.forEach(item => {
            if (item.dataset.section === sectionId) {
                item.classList.add('active');
            } else {
                item.classList.remove('active');
            }
        });
    }

    setupAuth() {
        const loginBtn = document.getElementById('loginBtn');
        const showRegisterBtn = document.getElementById('showRegisterBtn');
        const showLoginBtn = document.getElementById('showLoginBtn');
        const loginForm = document.getElementById('loginForm');
        const registerForm = document.getElementById('registerForm');

        if (loginBtn) {
            console.log('Binding login button');
            loginBtn.addEventListener('click', () => {
                console.log('Login button clicked, current user:', this.currentUser);
                if (this.currentUser) {
                    this.logout();
                } else {
                    this.showSection('loginSection');
                    this.updateActiveNavItem('homeSection'); // Keep home active for auth
                }
            });
        }

        if (showRegisterBtn) {
            showRegisterBtn.addEventListener('click', () => {
                console.log('Show register clicked');
                this.showSection('registerSection');
            });
        }

        if (showLoginBtn) {
            showLoginBtn.addEventListener('click', () => {
                console.log('Show login clicked');
                this.showSection('loginSection');
            });
        }

        if (loginForm) {
            loginForm.addEventListener('submit', (e) => {
                e.preventDefault();
                console.log('Login form submitted');
                this.handleLogin();
            });
        }

        if (registerForm) {
            registerForm.addEventListener('submit', (e) => {
                e.preventDefault();
                console.log('Register form submitted');
                this.handleRegister();
            });
        }
    }

    setupSkinAnalysis() {
        const startCameraBtn = document.getElementById('startCameraBtn');
        const stopCameraBtn = document.getElementById('stopCameraBtn');
        const captureBtn = document.getElementById('captureBtn');
        const uploadPhotoBtn = document.getElementById('uploadPhotoBtn');
        const photoUpload = document.getElementById('photoUpload');
        const analyzeUploadBtn = document.getElementById('analyzeUploadBtn');
        const getProductsBtn = document.getElementById('getProductsBtn');

        if (startCameraBtn) {
            startCameraBtn.addEventListener('click', () => {
                console.log('Start camera clicked');
                this.startCamera();
            });
        }

        if (stopCameraBtn) {
            stopCameraBtn.addEventListener('click', () => this.stopCamera());
        }

        if (captureBtn) {
            captureBtn.addEventListener('click', () => this.captureAndAnalyze());
        }

        if (uploadPhotoBtn) {
            uploadPhotoBtn.addEventListener('click', () => {
                console.log('Upload photo clicked');
                if (photoUpload) photoUpload.click();
            });
        }

        if (photoUpload) {
            photoUpload.addEventListener('change', (e) => this.handlePhotoUpload(e));
        }

        if (analyzeUploadBtn) {
            analyzeUploadBtn.addEventListener('click', () => this.analyzeUploadedPhoto());
        }

        if (getProductsBtn) {
            getProductsBtn.addEventListener('click', () => {
                this.showSection('productsSection');
                this.updateActiveNavItem('productsSection');
                this.filterProductsByAnalysis();
            });
        }
    }

    setupProductsAndCart() {
        const cartBtn = document.getElementById('cartBtn');
        const categoryFilter = document.getElementById('categoryFilter');
        const priceFilter = document.getElementById('priceFilter');

        if (cartBtn) {
            console.log('Binding cart button');
            cartBtn.addEventListener('click', () => {
                console.log('Cart button clicked');
                this.showModal('cartModal');
            });
        }

        if (categoryFilter) {
            categoryFilter.addEventListener('change', () => this.filterProducts());
        }

        if (priceFilter) {
            priceFilter.addEventListener('change', () => this.filterProducts());
        }
    }

    setupRoutineTabs() {
        const tabBtns = document.querySelectorAll('.tab-btn');
        tabBtns.forEach(btn => {
            btn.addEventListener('click', () => {
                const tab = btn.dataset.tab;
                this.showRoutineTab(tab);
                
                tabBtns.forEach(b => b.classList.remove('active'));
                btn.classList.add('active');
            });
        });
    }

    setupARTryOn() {
        const startArBtn = document.getElementById('startArBtn');
        const stopArBtn = document.getElementById('stopArBtn');
        const captureArBtn = document.getElementById('captureArBtn');
        const arProductItems = document.querySelectorAll('.ar-product-item');

        if (startArBtn) {
            startArBtn.addEventListener('click', () => this.startAR());
        }

        if (stopArBtn) {
            stopArBtn.addEventListener('click', () => this.stopAR());
        }

        if (captureArBtn) {
            captureArBtn.addEventListener('click', () => this.captureAR());
        }

        arProductItems.forEach(item => {
            item.addEventListener('click', () => {
                arProductItems.forEach(i => i.classList.remove('active'));
                item.classList.add('active');
                this.applyAREffect(item.dataset.product);
            });
        });
    }

    setupConsultation() {
        const bookBtns = document.querySelectorAll('.book-btn');
        const bookingForm = document.getElementById('bookingForm');

        bookBtns.forEach(btn => {
            btn.addEventListener('click', () => {
                const doctorName = btn.dataset.doctor;
                const doctorInput = document.getElementById('selectedDoctor');
                if (doctorInput) {
                    doctorInput.value = doctorName;
                }
                this.showModal('bookingModal');
            });
        });

        if (bookingForm) {
            bookingForm.addEventListener('submit', (e) => {
                e.preventDefault();
                this.handleBooking();
            });
        }
    }

    setupModals() {
        const closeBtns = document.querySelectorAll('.close-btn');
        const checkoutBtn = document.getElementById('checkoutBtn');
        const closeCartBtn = document.getElementById('closeCartBtn');
        const closeBookingBtn = document.getElementById('closeBookingBtn');

        closeBtns.forEach(btn => {
            btn.addEventListener('click', () => {
                const modal = btn.closest('.modal');
                if (modal) {
                    this.hideModal(modal.id);
                }
            });
        });

        if (closeCartBtn) {
            closeCartBtn.addEventListener('click', () => this.hideModal('cartModal'));
        }

        if (closeBookingBtn) {
            closeBookingBtn.addEventListener('click', () => this.hideModal('bookingModal'));
        }

        if (checkoutBtn) {
            checkoutBtn.addEventListener('click', () => this.handleCheckout());
        }

        // Close modals when clicking outside
        document.addEventListener('click', (e) => {
            const modals = document.querySelectorAll('.modal:not(.hidden)');
            modals.forEach(modal => {
                if (e.target === modal) {
                    this.hideModal(modal.id);
                }
            });
        });
    }

    showSection(sectionId) {
        console.log('Showing section:', sectionId);
        
        // Hide all sections
        const sections = document.querySelectorAll('.section');
        sections.forEach(section => {
            section.classList.remove('active');
        });

        // Show target section
        const targetSection = document.getElementById(sectionId);
        if (targetSection) {
            targetSection.classList.add('active');
            this.currentSection = sectionId;
            console.log('Successfully showed section:', sectionId);
        } else {
            console.error('Section not found:', sectionId);
        }
    }

    showModal(modalId) {
        console.log('Showing modal:', modalId);
        const modal = document.getElementById(modalId);
        if (modal) {
            modal.classList.remove('hidden');
        }
    }

    hideModal(modalId) {
        console.log('Hiding modal:', modalId);
        const modal = document.getElementById(modalId);
        if (modal) {
            modal.classList.add('hidden');
        }
    }

    // Authentication Methods
    handleLogin() {
        const emailInput = document.getElementById('loginEmail');
        const passwordInput = document.getElementById('loginPassword');
        
        if (!emailInput || !passwordInput) {
            console.error('Login form elements not found');
            return;
        }

        const email = emailInput.value;
        const password = passwordInput.value;

        console.log('Handling login for:', email);

        // Simulate login validation
        if (email && password) {
            this.currentUser = {
                email: email,
                name: email.split('@')[0],
                skinType: 'Normal'
            };
            this.saveUserData();
            this.updateAuthUI();
            this.showSection('homeSection');
            this.updateActiveNavItem('homeSection');
            this.showMessage('Login successful! Welcome back!', 'success');
            
            // Clear form
            emailInput.value = '';
            passwordInput.value = '';
        } else {
            this.showMessage('Please fill in all fields', 'error');
        }
    }

    handleRegister() {
        const nameInput = document.getElementById('registerName');
        const emailInput = document.getElementById('registerEmail');
        const passwordInput = document.getElementById('registerPassword');
        const skinTypeSelect = document.getElementById('skinType');

        if (!nameInput || !emailInput || !passwordInput || !skinTypeSelect) {
            console.error('Register form elements not found');
            return;
        }

        const name = nameInput.value;
        const email = emailInput.value;
        const password = passwordInput.value;
        const skinType = skinTypeSelect.value;

        console.log('Handling registration for:', email);

        if (name && email && password && skinType) {
            this.currentUser = {
                email: email,
                name: name,
                skinType: skinType
            };
            this.saveUserData();
            this.updateAuthUI();
            this.showSection('homeSection');
            this.updateActiveNavItem('homeSection');
            this.showMessage(`Welcome ${name}! Your account has been created successfully.`, 'success');
            
            // Clear form
            nameInput.value = '';
            emailInput.value = '';
            passwordInput.value = '';
            skinTypeSelect.value = '';
        } else {
            this.showMessage('Please fill in all fields', 'error');
        }
    }

    logout() {
        console.log('Logging out user');
        this.currentUser = null;
        this.saveUserData();
        this.updateAuthUI();
        this.showSection('homeSection');
        this.updateActiveNavItem('homeSection');
        this.showMessage('You have been logged out successfully', 'info');
    }

    updateAuthUI() {
        const loginBtn = document.getElementById('loginBtn');
        if (loginBtn) {
            if (this.currentUser) {
                loginBtn.textContent = `Hello, ${this.currentUser.name}`;
                loginBtn.title = 'Click to logout';
            } else {
                loginBtn.textContent = 'Login';
                loginBtn.title = 'Click to login';
            }
        }
    }

    // Skin Analysis Methods
    async startCamera() {
        try {
            console.log('Starting camera...');
            this.cameraStream = await navigator.mediaDevices.getUserMedia({
                video: { width: 640, height: 480, facingMode: 'user' }
            });
            
            const video = document.getElementById('videoElement');
            const cameraView = document.getElementById('cameraView');
            
            if (video && cameraView) {
                video.srcObject = this.cameraStream;
                cameraView.classList.remove('hidden');
                this.showMessage('Camera started successfully! Position your face in the frame.', 'success');
                console.log('Camera started successfully');
            }
        } catch (error) {
            console.error('Camera error:', error);
            this.showMessage('Unable to access camera. Please check permissions and try again.', 'error');
        }
    }

    stopCamera() {
        if (this.cameraStream) {
            console.log('Stopping camera...');
            this.cameraStream.getTracks().forEach(track => track.stop());
            this.cameraStream = null;
            
            const cameraView = document.getElementById('cameraView');
            if (cameraView) {
                cameraView.classList.add('hidden');
            }
            
            this.showMessage('Camera stopped.', 'info');
        }
    }

    captureAndAnalyze() {
        const video = document.getElementById('videoElement');
        if (!video || !video.srcObject) {
            this.showMessage('No camera feed available. Please start the camera first.', 'error');
            return;
        }

        console.log('Capturing and analyzing image...');
        
        // Create canvas for capture
        const canvas = document.createElement('canvas');
        canvas.width = 640;
        canvas.height = 480;
        
        const ctx = canvas.getContext('2d');
        ctx.drawImage(video, 0, 0);
        
        // Perform analysis
        this.performSkinAnalysis(canvas);
    }

    handlePhotoUpload(event) {
        const file = event.target.files[0];
        if (file && file.type.startsWith('image/')) {
            console.log('Handling photo upload:', file.name);
            
            const reader = new FileReader();
            reader.onload = (e) => {
                const img = document.getElementById('previewImage');
                const uploadPreview = document.getElementById('uploadPreview');
                
                if (img && uploadPreview) {
                    img.src = e.target.result;
                    uploadPreview.classList.remove('hidden');
                    this.showMessage('Photo uploaded successfully! Click "Analyze Photo" to continue.', 'success');
                }
            };
            reader.onerror = () => {
                this.showMessage('Error reading file. Please try again.', 'error');
            };
            reader.readAsDataURL(file);
        } else {
            this.showMessage('Please select a valid image file.', 'error');
        }
    }

    analyzeUploadedPhoto() {
        const img = document.getElementById('previewImage');
        if (!img || !img.src) {
            this.showMessage('No image to analyze. Please upload an image first.', 'error');
            return;
        }

        console.log('Analyzing uploaded photo...');
        
        const canvas = document.createElement('canvas');
        canvas.width = 640;
        canvas.height = 480;
        
        const ctx = canvas.getContext('2d');
        
        // Create a new image element to ensure it's loaded
        const tempImg = new Image();
        tempImg.onload = () => {
            ctx.drawImage(tempImg, 0, 0, 640, 480);
            this.performSkinAnalysis(canvas);
        };
        tempImg.src = img.src;
    }

    performSkinAnalysis(canvas) {
        console.log('Performing skin analysis...');
        this.showMessage('Analyzing your skin... This may take a moment.', 'info');
        
        // Show loading state
        const resultsContainer = document.getElementById('analysisResults');
        if (resultsContainer) {
            resultsContainer.innerHTML = `
                <div class="analysis-loading">
                    <div class="spinner"></div>
                    <p>AI is analyzing your skin...</p>
                </div>
            `;
        }
        
        // Simulate AI analysis with realistic delay
        setTimeout(() => {
            const analysisResults = this.simulateAIAnalysis();
            this.displayAnalysisResults(analysisResults);
            this.skinAnalysisResults = analysisResults;
        }, 3000);
    }

    simulateAIAnalysis() {
        console.log('Simulating AI analysis...');
        
        // Simulate realistic analysis results
        const detectedConditions = [];
        const acneTypes = this.skinConditions.acneTypes;
        
        // Randomly detect 1-4 conditions with weighted probabilities
        const numConditions = Math.floor(Math.random() * 3) + 1;
        const availableConditions = [...acneTypes];
        
        for (let i = 0; i < numConditions && availableConditions.length > 0; i++) {
            const randomIndex = Math.floor(Math.random() * availableConditions.length);
            const condition = availableConditions[randomIndex];
            
            detectedConditions.push({
                ...condition,
                confidence: Math.floor(Math.random() * 25) + 75, // 75-100% confidence
                area: Math.floor(Math.random() * 15) + 5 // 5-20% of face area
            });
            
            // Remove selected condition to avoid duplicates
            availableConditions.splice(randomIndex, 1);
        }

        const skinType = this.currentUser?.skinType || 
                        this.skinConditions.skinTypes[Math.floor(Math.random() * this.skinConditions.skinTypes.length)].type;

        return {
            timestamp: new Date().toISOString(),
            skinType: skinType,
            conditions: detectedConditions,
            metrics: {
                clarity: Math.floor(Math.random() * 30) + 60,    // 60-90%
                hydration: Math.floor(Math.random() * 30) + 60,  // 60-90%
                overallHealth: Math.floor(Math.random() * 30) + 60, // 60-90%
                acneCount: detectedConditions.length > 0 ? Math.floor(Math.random() * 20) + 5 : 0
            },
            recommendations: this.generateRecommendations(detectedConditions, skinType)
        };
    }

    generateRecommendations(conditions, skinType) {
        const recommendations = [
            'Use gentle, non-comedogenic products suitable for your skin type',
            'Apply broad-spectrum sunscreen with SPF 30+ daily',
            'Maintain a consistent skincare routine'
        ];

        // Add condition-specific recommendations
        conditions.forEach(condition => {
            if (condition.name.includes('Blackheads') || condition.name.includes('Whiteheads')) {
                recommendations.push('Consider adding a BHA (salicylic acid) exfoliant 2-3 times per week');
            }
            if (condition.name.includes('Papules') || condition.name.includes('Pustules')) {
                recommendations.push('Use products with benzoyl peroxide to reduce bacterial growth');
            }
            if (condition.severity === 'severe') {
                recommendations.push('Consider consulting with a dermatologist for prescription treatments');
            }
        });

        // Add skin type specific recommendations
        if (skinType === 'Dry') {
            recommendations.push('Use a rich moisturizer and avoid over-cleansing');
        } else if (skinType === 'Oily') {
            recommendations.push('Use lightweight, oil-free moisturizers and gentle cleansing');
        } else if (skinType === 'Sensitive') {
            recommendations.push('Introduce new products gradually and patch test first');
        }

        return recommendations.slice(0, 6); // Limit to 6 recommendations
    }

    displayAnalysisResults(results) {
        console.log('Displaying analysis results:', results);
        
        const resultsContainer = document.getElementById('analysisResults');
        if (!resultsContainer) return;

        resultsContainer.innerHTML = `
            <div class="analysis-summary">
                <div class="analysis-header">
                    <h4>✅ Analysis Complete</h4>
                    <div class="analysis-timestamp">
                        ${new Date(results.timestamp).toLocaleString()}
                    </div>
                </div>
                <div class="summary-stats">
                    <div class="summary-stat">
                        <span class="stat-label">Skin Type</span>
                        <span class="stat-value">${results.skinType}</span>
                    </div>
                    <div class="summary-stat">
                        <span class="stat-label">Conditions Found</span>
                        <span class="stat-value">${results.conditions.length}</span>
                    </div>
                    <div class="summary-stat">
                        <span class="stat-label">Overall Health</span>
                        <span class="stat-value">${results.metrics.overallHealth}%</span>
                    </div>
                    <div class="summary-stat">
                        <span class="stat-label">Avg. Confidence</span>
                        <span class="stat-value">${Math.floor(results.conditions.reduce((sum, c) => sum + c.confidence, 0) / results.conditions.length || 0)}%</span>
                    </div>
                </div>
            </div>
        `;

        this.displayDetailedReport(results);
        
        const skinReport = document.getElementById('skinReport');
        if (skinReport) {
            skinReport.classList.remove('hidden');
        }
        
        this.showMessage('Skin analysis complete! Check your detailed report below.', 'success');
    }

    displayDetailedReport(results) {
        // Conditions
        const conditionsList = document.getElementById('conditionsList');
        if (conditionsList) {
            if (results.conditions.length === 0) {
                conditionsList.innerHTML = `
                    <div class="no-conditions">
                        <span class="success-icon">✨</span>
                        <p>Great news! No significant skin conditions detected.</p>
                    </div>
                `;
            } else {
                conditionsList.innerHTML = results.conditions.map(condition => `
                    <div class="condition-item">
                        <div class="condition-main">
                            <strong>${condition.name}</strong>
                            <span class="severity-badge severity-${condition.severity}">${condition.severity}</span>
                        </div>
                        <div class="condition-details">
                            <span class="confidence-score">${condition.confidence}% confidence</span>
                            <span class="area-coverage">~${condition.area}% area</span>
                        </div>
                    </div>
                `).join('');
            }
        }

        // Metrics
        const metricsGrid = document.getElementById('metricsGrid');
        if (metricsGrid) {
            metricsGrid.innerHTML = `
                <div class="metric-item">
                    <span class="metric-label">Skin Clarity</span>
                    <div class="metric-bar">
                        <div class="metric-fill" style="width: ${results.metrics.clarity}%"></div>
                    </div>
                    <span class="metric-value">${results.metrics.clarity}%</span>
                </div>
                <div class="metric-item">
                    <span class="metric-label">Hydration Level</span>
                    <div class="metric-bar">
                        <div class="metric-fill" style="width: ${results.metrics.hydration}%"></div>
                    </div>
                    <span class="metric-value">${results.metrics.hydration}%</span>
                </div>
                <div class="metric-item">
                    <span class="metric-label">Overall Health</span>
                    <div class="metric-bar">
                        <div class="metric-fill" style="width: ${results.metrics.overallHealth}%"></div>
                    </div>
                    <span class="metric-value">${results.metrics.overallHealth}%</span>
                </div>
                ${results.metrics.acneCount > 0 ? `
                <div class="metric-item">
                    <span class="metric-label">Acne Count</span>
                    <div class="metric-simple">
                        <span class="metric-number">${results.metrics.acneCount}</span>
                    </div>
                </div>
                ` : ''}
            `;
        }

        // Recommendations
        const aiRecommendations = document.getElementById('aiRecommendations');
        if (aiRecommendations) {
            aiRecommendations.innerHTML = results.recommendations.map((rec, index) => `
                <div class="recommendation-item">
                    <span class="rec-number">${index + 1}</span>
                    <span class="rec-text">${rec}</span>
                </div>
            `).join('');
        }
    }

    // Product Methods
    renderProducts() {
        const productsGrid = document.getElementById('productsGrid');
        if (!productsGrid) {
            console.log('Products grid not found');
            return;
        }

        console.log('Rendering products...');

        productsGrid.innerHTML = this.products.map(product => `
            <div class="product-card" data-category="${product.category}" data-price="${product.price}">
                <div class="product-image">
                    ${this.getProductEmoji(product.category)}
                </div>
                <div class="product-brand">${product.brand}</div>
                <div class="product-name">${product.name}</div>
                <div class="product-price">$${product.price.toFixed(2)}</div>
                <div class="product-rating">
                    <span>⭐ ${product.rating}</span>
                    <span>(${product.reviews.toLocaleString()} reviews)</span>
                </div>
                <div class="product-concerns">
                    ${product.concerns.map(concern => `<span class="concern-tag">${concern}</span>`).join('')}
                </div>
                <div class="product-actions">
                    <button class="btn btn--primary btn--sm add-to-cart-btn" data-product-id="${product.id}">
                        Add to Cart
                    </button>
                    <button class="btn btn--outline btn--sm add-to-wishlist-btn" data-product-id="${product.id}" title="Add to wishlist">
                        ♡
                    </button>
                </div>
            </div>
        `).join('');

        // Add event listeners to buttons
        this.bindProductEvents();
    }

    getProductEmoji(category) {
        const emojiMap = {
            'Cleanser': '🧼',
            'Serum': '💧',
            'Moisturizer': '🧴',
            'Treatment': '💊',
            'Exfoliant': '✨',
            'Sunscreen': '☀️'
        };
        return emojiMap[category] || '🧴';
    }

    bindProductEvents() {
        // Remove existing listeners and bind new ones
        document.querySelectorAll('.add-to-cart-btn').forEach(btn => {
            btn.addEventListener('click', (e) => {
                e.stopPropagation();
                const productId = parseInt(btn.dataset.productId);
                this.addToCart(productId);
            });
        });

        document.querySelectorAll('.add-to-wishlist-btn').forEach(btn => {
            btn.addEventListener('click', (e) => {
                e.stopPropagation();
                const productId = parseInt(btn.dataset.productId);
                this.addToWishlist(productId);
            });
        });
    }

    filterProducts() {
        const categoryFilter = document.getElementById('categoryFilter');
        const priceFilter = document.getElementById('priceFilter');
        const productCards = document.querySelectorAll('.product-card');

        if (!categoryFilter || !priceFilter) return;

        const selectedCategory = categoryFilter.value;
        const selectedPriceRange = priceFilter.value;

        let visibleCount = 0;

        productCards.forEach(card => {
            let showCard = true;

            // Category filter
            if (selectedCategory && card.dataset.category !== selectedCategory) {
                showCard = false;
            }

            // Price filter
            if (selectedPriceRange && showCard) {
                const price = parseFloat(card.dataset.price);
                const [min, max] = selectedPriceRange.split('-').map(p => parseFloat(p) || Infinity);
                
                if (max === Infinity) {
                    showCard = price >= min;
                } else {
                    showCard = price >= min && price <= max;
                }
            }

            if (showCard) {
                card.style.display = 'block';
                visibleCount++;
            } else {
                card.style.display = 'none';
            }
        });

        this.showMessage(`Showing ${visibleCount} products`, 'info');
    }

    filterProductsByAnalysis() {
        if (!this.skinAnalysisResults) {
            this.showMessage('No skin analysis data available. Please complete a skin analysis first.', 'info');
            return;
        }

        console.log('Filtering products by analysis...');

        const productCards = document.querySelectorAll('.product-card');
        const userSkinType = this.skinAnalysisResults.skinType;
        const detectedConditions = this.skinAnalysisResults.conditions.map(c => c.name.toLowerCase());

        let recommendedCount = 0;

        productCards.forEach(card => {
            const productId = parseInt(card.querySelector('.add-to-cart-btn').dataset.productId);
            const product = this.products.find(p => p.id === productId);
            
            if (product) {
                let isRecommended = false;
                
                // Check if product matches skin type
                if (product.skinTypes.includes(userSkinType)) {
                    isRecommended = true;
                }
                
                // Check if product addresses detected conditions
                const productConcerns = product.concerns.map(c => c.toLowerCase());
                const hasMatchingConcern = detectedConditions.some(condition => 
                    productConcerns.some(concern => 
                        concern.includes(condition) || 
                        condition.includes(concern) ||
                        (condition.includes('acne') && concern.includes('acne')) ||
                        (condition.includes('blackhead') && concern.includes('blackhead'))
                    )
                );
                
                if (hasMatchingConcern) {
                    isRecommended = true;
                }

                // Style recommended products
                if (isRecommended) {
                    card.style.border = '2px solid var(--color-primary)';
                    card.style.backgroundColor = 'var(--color-bg-1)';
                    card.style.position = 'relative';
                    recommendedCount++;
                    
                    // Add recommended badge if not already present
                    if (!card.querySelector('.recommended-badge')) {
                        const badge = document.createElement('div');
                        badge.className = 'recommended-badge';
                        badge.innerHTML = '⭐ Recommended';
                        badge.style.cssText = `
                            position: absolute;
                            top: 8px;
                            right: 8px;
                            background: var(--color-primary);
                            color: var(--color-btn-primary-text);
                            padding: 4px 8px;
                            border-radius: 12px;
                            font-size: 11px;
                            font-weight: 500;
                            z-index: 1;
                        `;
                        card.appendChild(badge);
                    }
                } else {
                    // Reset non-recommended products
                    card.style.border = '';
                    card.style.backgroundColor = '';
                    const badge = card.querySelector('.recommended-badge');
                    if (badge) {
                        badge.remove();
                    }
                }
            }
        });

        this.showMessage(`${recommendedCount} products recommended based on your skin analysis!`, 'success');
    }

    // Cart Methods
    addToCart(productId) {
        const product = this.products.find(p => p.id === productId);
        if (!product) {
            console.error('Product not found:', productId);
            return;
        }

        console.log('Adding to cart:', product.name);

        const existingItem = this.cart.find(item => item.id === productId);
        if (existingItem) {
            existingItem.quantity += 1;
            this.showMessage(`Increased quantity of ${product.name} in cart`, 'success');
        } else {
            this.cart.push({ ...product, quantity: 1 });
            this.showMessage(`${product.name} added to cart!`, 'success');
        }

        this.updateCartDisplay();
        this.saveCartData();
    }

    addToWishlist(productId) {
        const product = this.products.find(p => p.id === productId);
        if (product) {
            this.showMessage(`${product.name} added to wishlist!`, 'success');
            // In a real app, this would save to a wishlist array
        }
    }

    updateCartDisplay() {
        const cartCount = document.getElementById('cartCount');
        const cartItems = document.getElementById('cartItems');
        const cartTotal = document.getElementById('cartTotal');

        if (cartCount) {
            const totalItems = this.cart.reduce((sum, item) => sum + item.quantity, 0);
            cartCount.textContent = totalItems;
        }

        if (cartItems) {
            if (this.cart.length === 0) {
                cartItems.innerHTML = `
                    <div class="empty-cart">
                        <span class="empty-icon">🛒</span>
                        <p>Your cart is empty</p>
                        <p style="font-size: 14px; color: var(--color-text-secondary); margin-top: 8px;">
                            Browse our products and add items to get started!
                        </p>
                    </div>
                `;
            } else {
                cartItems.innerHTML = this.cart.map(item => `
                    <div class="cart-item">
                        <div class="cart-item-image">${this.getProductEmoji(item.category)}</div>
                        <div class="cart-item-details">
                            <div class="cart-item-name">${item.name}</div>
                            <div class="cart-item-brand">${item.brand}</div>
                            <div class="cart-item-price">$${item.price.toFixed(2)}</div>
                        </div>
                        <div class="cart-item-controls">
                            <button class="quantity-btn" onclick="window.app.updateQuantity(${item.id}, -1)" title="Decrease quantity">-</button>
                            <input type="number" class="quantity-input" value="${item.quantity}" readonly>
                            <button class="quantity-btn" onclick="window.app.updateQuantity(${item.id}, 1)" title="Increase quantity">+</button>
                            <button class="quantity-btn remove-btn" onclick="window.app.removeFromCart(${item.id})" title="Remove item">×</button>
                        </div>
                    </div>
                `).join('');
            }
        }

        if (cartTotal) {
            const total = this.cart.reduce((sum, item) => sum + (item.price * item.quantity), 0);
            cartTotal.textContent = total.toFixed(2);
        }
    }

    updateQuantity(productId, change) {
        const item = this.cart.find(item => item.id === productId);
        if (item) {
            const newQuantity = item.quantity + change;
            if (newQuantity <= 0) {
                this.removeFromCart(productId);
            } else {
                item.quantity = newQuantity;
                this.updateCartDisplay();
                this.saveCartData();
            }
        }
    }

    removeFromCart(productId) {
        const item = this.cart.find(item => item.id === productId);
        if (item) {
            this.cart = this.cart.filter(item => item.id !== productId);
            this.updateCartDisplay();
            this.saveCartData();
            this.showMessage(`${item.name} removed from cart`, 'info');
        }
    }

    handleCheckout() {
        if (this.cart.length === 0) {
            this.showMessage('Your cart is empty! Add some products first.', 'error');
            return;
        }

        if (!this.currentUser) {
            this.showMessage('Please login to proceed with checkout', 'error');
            this.hideModal('cartModal');
            this.showSection('loginSection');
            return;
        }

        // Simulate checkout process
        const total = this.cart.reduce((sum, item) => sum + (item.price * item.quantity), 0);
        const itemCount = this.cart.reduce((sum, item) => sum + item.quantity, 0);
        
        // Show processing
        this.showMessage('Processing your order...', 'info');
        
        setTimeout(() => {
            this.showMessage(
                `🎉 Order placed successfully! ${itemCount} items totaling $${total.toFixed(2)} will be shipped soon.`, 
                'success'
            );
            
            // Clear cart
            this.cart = [];
            this.updateCartDisplay();
            this.saveCartData();
            this.hideModal('cartModal');
        }, 2000);
    }

    // Routine Methods
    showRoutineTab(tab) {
        const contents = document.querySelectorAll('.routine-content');
        contents.forEach(content => content.classList.remove('active'));
        
        const targetContent = document.getElementById(`${tab}Routine`);
        if (targetContent) {
            targetContent.classList.add('active');
        }
    }

    // AR Methods
    async startAR() {
        try {
            console.log('Starting AR camera...');
            this.arStream = await navigator.mediaDevices.getUserMedia({
                video: { width: 640, height: 480, facingMode: 'user' }
            });
            
            const video = document.getElementById('arVideo');
            const overlay = document.querySelector('.ar-overlay');
            
            if (video && overlay) {
                video.srcObject = this.arStream;
                video.classList.remove('hidden');
                overlay.style.display = 'none';
                this.showMessage('AR camera started! Select a product to try virtually.', 'success');
            }
        } catch (error) {
            console.error('AR camera error:', error);
            this.showMessage('Unable to access camera for AR. Please check permissions.', 'error');
        }
    }

    stopAR() {
        if (this.arStream) {
            console.log('Stopping AR camera...');
            this.arStream.getTracks().forEach(track => track.stop());
            this.arStream = null;
            
            const video = document.getElementById('arVideo');
            const overlay = document.querySelector('.ar-overlay');
            
            if (video && overlay) {
                video.classList.add('hidden');
                overlay.style.display = 'flex';
            }
            
            this.showMessage('AR camera stopped', 'info');
        }
    }

    applyAREffect(product) {
        console.log('Applying AR effect:', product);
        this.showMessage(`Applied ${product} virtual effect! Looking great!`, 'success');
    }

    captureAR() {
        const video = document.getElementById('arVideo');
        if (video && !video.classList.contains('hidden') && this.arStream) {
            // Simulate AR capture
            this.showMessage('📸 AR photo captured and saved to your device!', 'success');
        } else {
            this.showMessage('Please start AR camera first', 'error');
        }
    }

    // Consultation Methods
    handleBooking() {
        const doctorInput = document.getElementById('selectedDoctor');
        const dateInput = document.getElementById('consultDate');
        const timeInput = document.getElementById('consultTime');
        const reasonInput = document.getElementById('consultReason');

        if (!doctorInput || !dateInput || !timeInput || !reasonInput) {
            console.error('Booking form elements not found');
            return;
        }

        const doctor = doctorInput.value;
        const date = dateInput.value;
        const time = timeInput.value;
        const reason = reasonInput.value;

        if (doctor && date && time) {
            this.showMessage(
                `✅ Consultation booked successfully!\nDoctor: ${doctor}\nDate: ${new Date(date).toDateString()}\nTime: ${time}`, 
                'success'
            );
            this.hideModal('bookingModal');
            
            // Reset form
            dateInput.value = '';
            timeInput.value = '';
            reasonInput.value = '';
        } else {
            this.showMessage('Please fill in all required fields', 'error');
        }
    }

    // Progress Tracking
    initializeProgressChart() {
        const canvas = document.getElementById('progressChart');
        if (!canvas) {
            console.log('Progress chart canvas not found');
            return;
        }

        try {
            const ctx = canvas.getContext('2d');
            
            // Generate sample progress data
            const labels = ['Week 1', 'Week 2', 'Week 3', 'Week 4', 'Week 5', 'Week 6'];
            const clarityData = [60, 65, 70, 75, 78, 82];
            const hydrationData = [55, 62, 68, 72, 76, 80];

            this.progressChart = new Chart(ctx, {
                type: 'line',
                data: {
                    labels: labels,
                    datasets: [{
                        label: 'Skin Clarity',
                        data: clarityData,
                        borderColor: '#1FB8CD',
                        backgroundColor: 'rgba(31, 184, 205, 0.1)',
                        tension: 0.4,
                        fill: true
                    }, {
                        label: 'Hydration Level',
                        data: hydrationData,
                        borderColor: '#FFC185',
                        backgroundColor: 'rgba(255, 193, 133, 0.1)',
                        tension: 0.4,
                        fill: true
                    }]
                },
                options: {
                    responsive: true,
                    maintainAspectRatio: false,
                    plugins: {
                        legend: {
                            position: 'top',
                        },
                        title: {
                            display: true,
                            text: 'Your Skin Health Progress'
                        }
                    },
                    scales: {
                        y: {
                            beginAtZero: true,
                            max: 100,
                            title: {
                                display: true,
                                text: 'Health Score (%)'
                            }
                        },
                        x: {
                            title: {
                                display: true,
                                text: 'Time Period'
                            }
                        }
                    }
                }
            });
            
            console.log('Progress chart initialized successfully');
        } catch (error) {
            console.error('Error initializing progress chart:', error);
        }
    }

    // Utility Methods
    showMessage(message, type = 'info') {
        console.log(`${type.toUpperCase()}: ${message}`);
        
        // Remove existing toasts
        const existingToasts = document.querySelectorAll('.toast');
        existingToasts.forEach(toast => toast.remove());
        
        // Create toast notification
        const toast = document.createElement('div');
        toast.className = `toast toast--${type}`;
        
        const iconMap = {
            'success': '✅',
            'error': '❌',
            'warning': '⚠️',
            'info': 'ℹ️'
        };
        
        toast.innerHTML = `
            <span class="toast-icon">${iconMap[type] || 'ℹ️'}</span>
            <span class="toast-message">${message}</span>
        `;
        
        // Styling
        toast.style.cssText = `
            position: fixed;
            top: 100px;
            right: 20px;
            background: var(--color-surface);
            border: 1px solid var(--color-border);
            border-radius: var(--radius-base);
            padding: var(--space-12) var(--space-16);
            box-shadow: var(--shadow-lg);
            z-index: 10000;
            max-width: 350px;
            animation: slideInRight 0.3s ease-out;
            display: flex;
            align-items: center;
            gap: var(--space-8);
            word-wrap: break-word;
            white-space: pre-line;
        `;
        
        // Type-specific styling
        if (type === 'success') {
            toast.style.borderLeftColor = 'var(--color-success)';
            toast.style.borderLeftWidth = '4px';
        } else if (type === 'error') {
            toast.style.borderLeftColor = 'var(--color-error)';
            toast.style.borderLeftWidth = '4px';
        } else if (type === 'warning') {
            toast.style.borderLeftColor = 'var(--color-warning)';
            toast.style.borderLeftWidth = '4px';
        }
        
        document.body.appendChild(toast);
        
        // Auto-dismiss
        setTimeout(() => {
            if (toast.parentNode) {
                toast.style.animation = 'slideOutRight 0.3s ease-in forwards';
                setTimeout(() => {
                    if (toast.parentNode) {
                        toast.remove();
                    }
                }, 300);
            }
        }, 4000);
    }

    // Data persistence
    saveUserData() {
        try {
            localStorage.setItem('skincare_user', JSON.stringify(this.currentUser));
        } catch (error) {
            console.error('Error saving user data:', error);
        }
    }

    loadUserData() {
        try {
            const userData = localStorage.getItem('skincare_user');
            if (userData) {
                this.currentUser = JSON.parse(userData);
                console.log('User data loaded:', this.currentUser);
            }
        } catch (error) {
            console.error('Error loading user data:', error);
        }
    }

    saveCartData() {
        try {
            localStorage.setItem('skincare_cart', JSON.stringify(this.cart));
        } catch (error) {
            console.error('Error saving cart data:', error);
        }
    }

    loadCartData() {
        try {
            const cartData = localStorage.getItem('skincare_cart');
            if (cartData) {
                this.cart = JSON.parse(cartData);
                console.log('Cart data loaded:', this.cart.length, 'items');
            }
        } catch (error) {
            console.error('Error loading cart data:', error);
        }
    }
}

// CSS for toast animations and additional styles
const style = document.createElement('style');
style.textContent = `
    @keyframes slideInRight {
        from { transform: translateX(100%); opacity: 0; }
        to { transform: translateX(0); opacity: 1; }
    }
    
    @keyframes slideOutRight {
        from { transform: translateX(0); opacity: 1; }
        to { transform: translateX(100%); opacity: 0; }
    }
    
    .toast-icon {
        flex-shrink: 0;
        font-size: 16px;
    }
    
    .toast-message {
        flex: 1;
        line-height: 1.4;
    }
    
    .concern-tag {
        display: inline-block;
        background: var(--color-bg-2);
        color: var(--color-text-secondary);
        padding: 2px 6px;
        border-radius: 4px;
        font-size: 10px;
        margin: 2px;
    }
    
    .analysis-loading {
        text-align: center;
        padding: var(--space-32);
    }
    
    .spinner {
        width: 40px;
        height: 40px;
        border: 3px solid rgba(var(--color-primary-rgb, 33, 128, 141), 0.2);
        border-top: 3px solid var(--color-primary);
        border-radius: 50%;
        animation: spin 1s linear infinite;
        margin: 0 auto var(--space-16);
    }
    
    @keyframes spin {
        0% { transform: rotate(0deg); }
        100% { transform: rotate(360deg); }
    }
    
    .summary-stats {
        display: grid;
        grid-template-columns: repeat(2, 1fr);
        gap: var(--space-12);
        margin-top: var(--space-16);
    }
    
    .summary-stat {
        text-align: center;
        padding: var(--space-8);
        background: var(--color-bg-1);
        border-radius: var(--radius-base);
    }
    
    .analysis-timestamp {
        font-size: var(--font-size-xs);
        color: var(--color-text-secondary);
        margin-top: var(--space-4);
    }
    
    .condition-details {
        display: flex;
        gap: var(--space-8);
        font-size: var(--font-size-xs);
        color: var(--color-text-secondary);
        margin-top: var(--space-4);
    }
    
    .rec-number {
        background: var(--color-primary);
        color: var(--color-btn-primary-text);
        width: 20px;
        height: 20px;
        border-radius: 50%;
        display: flex;
        align-items: center;
        justify-content: center;
        font-size: var(--font-size-xs);
        font-weight: var(--font-weight-bold);
        flex-shrink: 0;
    }
    
    .rec-text {
        flex: 1;
        line-height: 1.4;
    }
    
    .cart-item-brand {
        font-size: var(--font-size-xs);
        color: var(--color-text-secondary);
        margin-bottom: var(--space-2);
    }
    
    .remove-btn {
        background: var(--color-error) !important;
        color: white !important;
        margin-left: var(--space-8);
    }
    
    .remove-btn:hover {
        background: var(--color-error) !important;
        opacity: 0.8;
    }
    
    .no-conditions {
        text-align: center;
        padding: var(--space-24);
        color: var(--color-success);
    }
    
    .success-icon {
        font-size: 2rem;
        display: block;
        margin-bottom: var(--space-8);
    }
    
    .metric-simple {
        display: flex;
        align-items: center;
        justify-content: center;
        height: 40px;
    }
    
    .metric-number {
        font-size: var(--font-size-xl);
        font-weight: var(--font-weight-bold);
        color: var(--color-primary);
    }
`;
document.head.appendChild(style);

// Global app instance
let app;

// Initialize the application
function initApp() {
    console.log('DOM loaded, initializing app...');
    app = new SkinCareApp();
    
    // Make app globally accessible for onclick handlers
    window.app = app;
}

// Initialize when DOM is ready
if (document.readyState === 'loading') {
    document.addEventListener('DOMContentLoaded', initApp);
} else {
    initApp();
}