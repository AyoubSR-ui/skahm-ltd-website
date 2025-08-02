document.addEventListener('DOMContentLoaded', function () {
  const panels = document.querySelectorAll('.panel');
  const navLinks = document.querySelectorAll('nav a[href^="#"]');

  navLinks.forEach(link => {
    link.addEventListener('click', function (event) {
      event.preventDefault();
      const targetSelector = this.getAttribute('href');
      const targetPanel = document.querySelector(targetSelector);

      if (!targetPanel) return;

      panels.forEach(panel => {
        if (panel === targetPanel) {
          panel.classList.remove('hidden');
          panel.removeAttribute('aria-hidden');
        } else {
          panel.classList.add('hidden');
          panel.setAttribute('aria-hidden', 'true');
        }
      });

      // Focus for accessibility
      targetPanel.setAttribute('tabindex', '-1');
      targetPanel.focus();
      targetPanel.removeAttribute('tabindex');
    });
  });

  // ✅ Hide panel when clicking outside
  document.addEventListener('click', function (event) {
    const isClickInsidePanel = [...panels].some(panel => panel.contains(event.target));
    const isClickOnNav = [...navLinks].some(link => link.contains(event.target));

    if (!isClickInsidePanel && !isClickOnNav) {
      panels.forEach(panel => {
        panel.classList.add('hidden');
        panel.setAttribute('aria-hidden', 'true');
      });
    }
  });
});

 // Handle nav click to show section and scroll
  document.querySelectorAll('.nav-link').forEach(link => {
    link.addEventListener('click', e => {
      e.preventDefault();
      const targetId = link.getAttribute('data-target');
      const panel = document.getElementById(targetId);

      // Scroll to section 3
      document.getElementById('section-3').scrollIntoView({ behavior: 'smooth' });

      // Hide other panels
      document.querySelectorAll('.panel').forEach(p => {
        if (p !== panel) p.classList.add('hidden');
      });

      // Show the clicked panel
      panel.classList.remove('hidden');
    });
  });

  // Hide panel if click outside
  document.addEventListener('click', function (e) {
  setTimeout(() => {
    const isPanel = e.target.closest('.panel');
    const isNavLink = e.target.closest('a[href^="#"]');

    if (!isPanel && !isNavLink) {
      document.querySelectorAll('.panel').forEach(panel => {
        panel.classList.add('hidden');
      });
    }
  }, 100); // ✅ Small delay to let nav link activate panel first
});






// 🔄 Auto-rotate service card images
const services = {
  'ai-img': ['assets/images/ai1.png', 'assets/images/ai2.png', 'assets/images/ai3.png'],
  'chatbot-img': ['assets/images/chatbot1.png', 'assets/images/chatbot2.png', 'assets/images/chatbot3.png'],
  'trading-img': ['assets/images/trading1.png', 'assets/images/trading2.png', 'assets/images/trading3.png'],
  'dapp-img': ['assets/images/dapp1.png', 'assets/images/dapp2.png', 'assets/images/dapp3.png'],
  'Web-img': ['assets/images/web1.png', 'assets/images/web2.png', 'assets/images/web3.png'],
  'hosting-img': ['assets/images/hosting1.png', 'assets/images/hosting2.png', 'assets/images/hosting3.png']
};

const goBackBtn = document.getElementById("goBackBtn");

  window.addEventListener("scroll", () => {
    if (window.scrollY <= 10) {
      goBackBtn.style.display = "block";
    } else {
      goBackBtn.style.display = "none";
    }
    });

Object.keys(services).forEach(id => {
  const img = document.getElementById(id);
  const images = services[id];
  let index = 0;

  if (img) {
    setInterval(() => {
      index = (index + 1) % images.length;
      img.src = images[index];
    }, 2000); // Rotate every 1 second
  }
  });
     window.addEventListener('DOMContentLoaded', () => {
  document.body.classList.add('fade-in');

  // ✅ Define your text and speed here
  const text = "Our AI Integration service empowers your business using modern tools like ChatGPT, APIs, n8n, and Make.com. Whether you want to automate customer service, marketing, operations, or backend tasks — we have you covered.";
  const speed = 30;
  let index = 0;

  function typeWriter() {
    if (index < text.length) {
      document.getElementById("typewriter-text").innerHTML += text.charAt(index);
      index++;
      setTimeout(typeWriter, speed);
    }
  }

  // ✅ Start the typewriter animation
  typeWriter();
});

document.addEventListener('click', function (e) {
  const ripple = document.createElement("span");
  ripple.className = "ripple";
  ripple.style.left = `${e.pageX}px`;
  ripple.style.top = `${e.pageY}px`;
  document.body.appendChild(ripple);
  setTimeout(() => ripple.remove(), 600);
});
const rippleColors = [
  '#7a5cf4', '#00ffe3', '#ff6ec4', '#ffdd00',
  '#00e0ff', '#ff3c41', '#8aff5c', '#ffa36c',
  '#c3f584', '#b784f5', '#6cd4ff', '#ff00aa'
];

document.addEventListener('mousemove', function (e) {
  const ripple = document.createElement("span");
  ripple.className = "mouse-ripple";

  const color = rippleColors[Math.floor(Math.random() * rippleColors.length)];
  ripple.style.background = `radial-gradient(circle, ${color} 15%, transparent 70%)`;

  ripple.style.left = `${e.pageX}px`;
  ripple.style.top = `${e.pageY}px`;

  document.body.appendChild(ripple);
  setTimeout(() => ripple.remove(), 800); // Adjust for effect duration
});

 // Scroll to contact section and set service dropdown
    document.querySelectorAll('.clickable').forEach(item => {
      item.addEventListener('click', () => {
        const service = item.getAttribute('data-service');
        document.getElementById('service').value = service;
        document.getElementById('contact').scrollIntoView({ behavior: 'smooth' });
      });
    });

    document.addEventListener("DOMContentLoaded", () => {
  const form = document.getElementById("contactForm");
  const formStatus = document.getElementById("formStatus");
  const emailNotice = document.getElementById("emailNotice");
  const departmentSelect = document.getElementById("departmentSelect");

  const emailMap = {
    Sales: "sales@skahm-ltd.com",
    Design: "design@skahm-ltd.com",
    Support: "support@skahm-ltd.com",
    Contact: "contact@skahm-ltd.com",
  };

  departmentSelect.addEventListener("change", () => {
    const selected = departmentSelect.value;
    const email = emailMap[selected] || "sales@skahm-ltd.com";
    emailNotice.innerHTML = ` Message will be sent to: ${email}`;
  });

  form.addEventListener("submit", async function (e) {
    e.preventDefault();

    const name = document.getElementById("nameInput").value;
    const email = document.getElementById("emailInput").value;
    const department = departmentSelect.value;
    const message = document.getElementById("messageInput").value;
    const website = document.getElementById("website").value;

    const webhookURL = "https://hook.eu2.make.com/icbhvacpejcsejcn0ylxjgjndygirig3";
    const submittedDate = new Date().toISOString().split("T")[0];

    const payload = {
      name,
      email,
      department,
      message,
      website,
      submittedDate,
    };

    try {
      const res = await fetch(webhookURL, {
        method: "POST",
        headers: {
          "Content-Type": "application/json"
        },
        body: JSON.stringify(payload)
      });

      if (res.ok) {
        alert("✅ Message sent successfully!");
        formStatus.textContent = "We will get back to you soon 💬";
        emailNotice.style.display = "block";

        setTimeout(() => {
          formStatus.textContent = "";
          emailNotice.style.display = "none";
        }, 3000);

        form.reset(); // optional reset
      } else {
        alert("❌ Failed to send message.");
      }
    } catch (err) {
      alert("❌ Error sending message.");
      console.error(err);
    }
  });
});


deptSelect.addEventListener("change", () => {
  const selected = deptSelect.value;

  if (deptToEmail[selected]) {
    emailNotice.style.display = "block";
    emailTarget.textContent = deptToEmail[selected];
  } else {
    emailNotice.style.display = "none";
  }
});


/////////email Notice hidden

emailNotice.classList.add("show");
setTimeout(() => {
  emailNotice.classList.remove("show");
  emailNotice.classList.add("hide");
}, 3000);




// Scroll to contact form when a service card is clicked
 // Wait for the DOM to load
  document.addEventListener("DOMContentLoaded", () => {
    // Select all feature cards
    const featureItems = document.querySelectorAll(".feature-item");
    
    // Get the contact section
    const contactSection = document.getElementById("contact-section");

    // Attach click event to each card
    featureItems.forEach(item => {
      item.addEventListener("click", () => {
        contactSection.scrollIntoView({ behavior: "smooth" });
      });
    });
  });

const isMobile = /iPhone|iPad|iPod|Android/i.test(navigator.userAgent);

// Add this condition around ripple effects
if (!isMobile) {
  document.addEventListener('mousemove', function (e) {
    const ripple = document.createElement("span");
    ripple.className = "mouse-ripple";

    const color = rippleColors[Math.floor(Math.random() * rippleColors.length)];
    ripple.style.background = `radial-gradient(circle, ${color} 15%, transparent 70%)`;
    ripple.style.left = `${e.pageX}px`;
    ripple.style.top = `${e.pageY}px`;

    document.body.appendChild(ripple);
    setTimeout(() => ripple.remove(), 800);
  });
}


  const menu = document.getElementById("mobileMenu");
  const openBtn = document.getElementById("hamburger");
  const closeBtn = document.getElementById("closeBtn");

  openBtn.addEventListener("click", () => {
    menu.style.right = "0";
  });

  closeBtn.addEventListener("click", () => {
    menu.style.right = "-100%";
  });

  function toggleMenu() {
  const menu = document.querySelector('.nav-links');
  menu.classList.toggle('show');
}
 
 
function toggleMenu() {
  const menu = document.getElementById("mobileMenu");
  const hamburger = document.querySelector(".hamburger");
  const bars = document.querySelectorAll(".bar");

  menu.classList.toggle("active");

  // Animate hamburger to X
  bars.forEach((bar, i) => {
    if (menu.classList.contains("active")) {
      bar.style.transform = i === 0 ? "rotate(45deg) translateY(9px)" :
                         i === 1 ? "scale(0)" :
                         "rotate(-45deg) translateY(-9px)";
    } else {
      bar.style.transform = "none";
    }
  });
}

document.addEventListener("DOMContentLoaded", function () {
  const hamburger = document.getElementById("hamburger");
  const mobileMenu = document.getElementById("mobileMenu");
  const closeMenu = document.getElementById("closeMenu");
  const navLinks = document.querySelectorAll("#mobileMenu .nav-link");

  // Show menu
  hamburger.addEventListener("click", () => {
    mobileMenu.classList.add("show");
  });

  // Hide menu on ❌ click
  closeMenu.addEventListener("click", () => {
    mobileMenu.classList.remove("show");
  });

  // Hide menu on link click and scroll to section
  navLinks.forEach((link) => {
    link.addEventListener("click", () => {
      mobileMenu.classList.remove("show");
    });
  });
});









