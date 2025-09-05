document.addEventListener('DOMContentLoaded', function() {
    // Clock functionality
    function updateClock() {
        const now = new Date();
        const timeString = now.toLocaleTimeString('en-US', {
            hour12: false,
            hour: '2-digit',
            minute: '2-digit',
            second: '2-digit'
        });
        const dateString = now.toLocaleDateString('en-US', {
            weekday: 'long',
            year: 'numeric',
            month: 'long',
            day: 'numeric'
        });
        
        document.getElementById('clock').textContent = timeString;
        document.getElementById('date').textContent = dateString;
    }
    
    updateClock();
    setInterval(updateClock, 1000);

    // Color generator
    function generateRandomColor() {
        const colors = [
            '#FF6B6B', '#4ECDC4', '#45B7D1', '#FFA07A', '#98D8C8',
            '#F7DC6F', '#BB8FCE', '#85C1E9', '#F8C471', '#82E0AA',
            '#FF9F43', '#6C5CE7', '#A29BFE', '#FD79A8', '#00B894'
        ];
        return colors[Math.floor(Math.random() * colors.length)];
    }
    
    function updateColorDisplay() {
        const color = generateRandomColor();
        const colorDisplay = document.getElementById('colorDisplay');
        const colorCode = document.getElementById('colorCode');
        
        colorDisplay.style.backgroundColor = color;
        colorCode.textContent = color;
        
        // Add a subtle animation
        colorDisplay.style.transform = 'scale(0.95)';
        setTimeout(() => {
            colorDisplay.style.transform = 'scale(1)';
        }, 150);
    }
    
    document.getElementById('generateColor').addEventListener('click', updateColorDisplay);
    updateColorDisplay(); // Initial color

    // Counter functionality
    let counter = 0;
    const counterElement = document.getElementById('counter');
    
    function updateCounter() {
        counterElement.textContent = counter;
        counterElement.style.transform = 'scale(1.1)';
        setTimeout(() => {
            counterElement.style.transform = 'scale(1)';
        }, 200);
    }
    
    document.getElementById('increment').addEventListener('click', () => {
        counter++;
        updateCounter();
    });
    
    document.getElementById('decrement').addEventListener('click', () => {
        counter--;
        updateCounter();
    });
    
    document.getElementById('reset').addEventListener('click', () => {
        counter = 0;
        updateCounter();
    });

    // Calculator functionality
    document.getElementById('calculate').addEventListener('click', () => {
        const num1 = parseFloat(document.getElementById('num1').value);
        const num2 = parseFloat(document.getElementById('num2').value);
        const operation = document.getElementById('operation').value;
        const resultElement = document.getElementById('result');
        
        if (isNaN(num1) || isNaN(num2)) {
            resultElement.textContent = 'Please enter valid numbers';
            return;
        }
        
        let result;
        switch (operation) {
            case '+':
                result = num1 + num2;
                break;
            case '-':
                result = num1 - num2;
                break;
            case '*':
                result = num1 * num2;
                break;
            case '/':
                if (num2 === 0) {
                    resultElement.textContent = 'Cannot divide by zero';
                    return;
                }
                result = num1 / num2;
                break;
        }
        
        resultElement.textContent = result.toFixed(2).replace(/\.?0+$/, '');
    });

    // Text effects functionality
    const textInput = document.getElementById('textInput');
    const textOutput = document.getElementById('textOutput');
    
    function updateTextOutput(text) {
        textOutput.textContent = text || 'Your text will appear here...';
    }
    
    textInput.addEventListener('input', () => {
        updateTextOutput(textInput.value);
    });
    
    document.getElementById('uppercase').addEventListener('click', () => {
        const text = textInput.value.toUpperCase();
        textInput.value = text;
        updateTextOutput(text);
    });
    
    document.getElementById('lowercase').addEventListener('click', () => {
        const text = textInput.value.toLowerCase();
        textInput.value = text;
        updateTextOutput(text);
    });
    
    document.getElementById('reverse').addEventListener('click', () => {
        const text = textInput.value.split('').reverse().join('');
        textInput.value = text;
        updateTextOutput(text);
    });
    
    updateTextOutput('');

    // Browser info
    function getBrowserInfo() {
        const userAgent = navigator.userAgent;
        let browserName = 'Unknown';
        
        if (userAgent.includes('Chrome') && !userAgent.includes('Edg')) {
            browserName = 'Chrome';
        } else if (userAgent.includes('Firefox')) {
            browserName = 'Firefox';
        } else if (userAgent.includes('Safari') && !userAgent.includes('Chrome')) {
            browserName = 'Safari';
        } else if (userAgent.includes('Edg')) {
            browserName = 'Edge';
        }
        
        return browserName;
    }
    
    document.getElementById('browserInfo').textContent = getBrowserInfo();
    document.getElementById('platformInfo').textContent = navigator.platform;
    document.getElementById('languageInfo').textContent = navigator.language;
    document.getElementById('onlineStatus').textContent = navigator.onLine ? '✅ Online' : '❌ Offline';
    
    // Update online status when it changes
    window.addEventListener('online', () => {
        document.getElementById('onlineStatus').textContent = '✅ Online';
    });
    
    window.addEventListener('offline', () => {
        document.getElementById('onlineStatus').textContent = '❌ Offline';
    });

    // Page views counter (using localStorage)
    let pageViews = parseInt(localStorage.getItem('pageViews') || '0') + 1;
    localStorage.setItem('pageViews', pageViews.toString());
    document.getElementById('pageViews').textContent = pageViews;

    // Session timer
    const startTime = Date.now();
    
    function updateSessionTime() {
        const elapsed = Math.floor((Date.now() - startTime) / 1000);
        const minutes = Math.floor(elapsed / 60);
        const seconds = elapsed % 60;
        document.getElementById('sessionTime').textContent = 
            `${minutes}:${seconds.toString().padStart(2, '0')}`;
    }
    
    updateSessionTime();
    setInterval(updateSessionTime, 1000);

    // Add some interactive effects
    document.querySelectorAll('.card').forEach(card => {
        card.addEventListener('mouseenter', function() {
            this.style.transform = 'translateY(-8px) scale(1.02)';
        });
        
        card.addEventListener('mouseleave', function() {
            this.style.transform = 'translateY(0) scale(1)';
        });
    });

    // Keyboard shortcuts
    document.addEventListener('keydown', (e) => {
        if (e.ctrlKey || e.metaKey) {
            switch(e.key) {
                case 'ArrowUp':
                    e.preventDefault();
                    counter++;
                    updateCounter();
                    break;
                case 'ArrowDown':
                    e.preventDefault();
                    counter--;
                    updateCounter();
                    break;
                case ' ':
                    e.preventDefault();
                    updateColorDisplay();
                    break;
            }
        }
    });

    // Add a welcome message
    console.log('🎉 Welcome to the Cloudflare Pages Demo!');
    console.log('💡 Try these keyboard shortcuts:');
    console.log('   - Ctrl/Cmd + ↑ : Increment counter');
    console.log('   - Ctrl/Cmd + ↓ : Decrement counter');
    console.log('   - Ctrl/Cmd + Space : Generate new color');
});