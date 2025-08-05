// toggle-panels.js

// ✅ DOM fully loaded before anything runs
// Ensures all DOM elements are available

document.addEventListener("DOMContentLoaded", () => {
  /** ------------------- PANEL TOGGLE ------------------- */
  const panels = document.querySelectorAll(".panel");
  const navLinks = document.querySelectorAll('nav a[href^="#"]');
  const goBackBtn = document.getElementById("goBackBtn");

  // ✅ Show or hide the goBack button on scroll (except mobile)
  if (goBackBtn) {
   window.addEventListener("scroll", () => {
  const isMobile = window.innerWidth <= 768;

  if (!isMobile && window.scrollY <= 10) {
    goBackBtn.style.display = "block";
  } else {
    goBackBtn.style.display = "none";
  }
});

    if (window.innerWidth <= 768) goBackBtn.style.display = "none";
  }

  // ✅ Switch visible panels based on nav click
  navLinks.forEach(link => {
    link.addEventListener("click", function (event) {
      event.preventDefault();
      const targetSelector = this.getAttribute("href");
      const targetPanel = document.querySelector(targetSelector);

      if (!targetPanel) return;

      panels.forEach(panel => {
        if (panel === targetPanel) {
          panel.classList.remove("hidden");
          panel.removeAttribute("aria-hidden");
        } else {
          panel.classList.add("hidden");
          panel.setAttribute("aria-hidden", "true");
        }
      });
    });
  });

  /** ------------------- CONTACT FORM ------------------- */
  const form = document.getElementById("contactForm");
  const formStatus = document.getElementById("formStatus");
  const emailNotice = document.getElementById("emailNotice");
  const departmentSelect = document.getElementById("departmentSelect");

  // ✅ Department to Email Map
  const emailMap = {
    Sales: "sales@skahm-ltd.com",
    Design: "design@skahm-ltd.com",
    Support: "support@skahm-ltd.com",
    Contact: "contact@skahm-ltd.com"
  };

  // ✅ Change displayed email based on department selected
  if (departmentSelect && emailNotice) {
    departmentSelect.addEventListener("change", () => {
      const selected = departmentSelect.value;
      const email = emailMap[selected] || "sales@skahm-ltd.com";
      emailNotice.innerHTML = ` Message will be sent to: ${email}`;
    });
  }

  // ✅ Submit form via Webhook
  if (form) {
    form.addEventListener("submit", async function (e) {
      e.preventDefault();

      const name = document.getElementById("nameInput").value;
      const email = document.getElementById("emailInput").value;
      const department = departmentSelect.value;
      const message = document.getElementById("messageInput").value;
      const website = document.getElementById("website").value;
      const submittedDate = new Date().toISOString().split("T")[0];

      const payload = { name, email, department, message, website, submittedDate };
      const webhookURL = "https://hook.eu2.make.com/icbhvacpejcsejcn0ylxjgjndygirig3";

      try {
        const res = await fetch(webhookURL, {
          method: "POST",
          headers: { "Content-Type": "application/json" },
          body: JSON.stringify(payload)
        });

        const data = await res.text();

       if (res.ok) {
       alert("✅ We will get back to you soon 💬");

        // Optional visual confirmation (can be hidden on mobile if needed)
        formStatus.textContent = "We will get back to you soon 💬";
         emailNotice.style.display = "block";

           // Reload to homepage after short delay (works on desktop + mobile)
          setTimeout(() => {
           window.location.href = "index.html"; // Or "/" if deployed root
           }, 1500);



          form.reset();
        } else {
          alert("❌ Failed to send message.");
          console.error("Response not OK:", data);
        }
          } catch (err) {
        // Silent fail — no alert, no console log
        // Optionally, you can show a fallback message inside the formStatus if needed
       // formStatus.textContent = "Something went wrong. Please try again later.";
         }
    });
  }

  /** ------------------- RIPPLE EFFECT ------------------- */
  const isMobile = /iPhone|iPad|iPod|Android/i.test(navigator.userAgent);
  if (!isMobile) {
    const rippleColors = ['#7a5cf4', '#00ffe3', '#ff6ec4', '#ffdd00', '#00e0ff', '#ff3c41', '#8aff5c', '#ffa36c', '#c3f584', '#b784f5', '#6cd4ff', '#ff00aa'];
    document.addEventListener("mousemove", function (e) {
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

  /** ------------------- FADE IN BODY ------------------- */
  document.body.classList.add("fade-in");

  /** ------------------- TYPEWRITER ------------------- */
  const typeText = "Our AI Integration service empowers your business using modern tools like ChatGPT, APIs, n8n, and Make.com.";
  let charIndex = 0;
  function typeWriter() {
    const el = document.getElementById("typewriter-text");
    if (el && charIndex < typeText.length) {
      el.innerHTML += typeText.charAt(charIndex++);
      setTimeout(typeWriter, 30);
    }
  }
  typeWriter();
});

