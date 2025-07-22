// ✅ Define your forms and their corresponding service names
const forms = [
  { id: "automationForm", service: "AI Integration" },
  { id: "chatbotForm", service: "Custom Chatbot" },
  { id: "webForm", service: "Website & Hosting" },
  { id: "brandingForm", service: "Web development" },
  
];

// ✅ Replace with your real Make.com webhook URL
const WEBHOOK_URL = "https://hook.eu2.make.com/o1o84pye85hn86h9126wd2awr8sfehf8";  // <-- update this

forms.forEach(({ id, service }) => {
  const form = document.getElementById(id);
  if (!form) return; // Skip if the form doesn't exist on this page

  form.addEventListener("submit", async function (e) {
    e.preventDefault();

    const formData = new FormData(form);

    // ✅ Structure the payload for webhook
    const data = {
      name: formData.get("name"),
      email: formData.get("email"),
      website: formData.get("website") || "N/A",
      service: formData.get("service") || "N/A",
      message: formData.get("message") || "No message",
      submittedDate: new Date().toISOString().split("T")[0],
    };

    try {
      const res = await fetch(WEBHOOK_URL, {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(data),
      });

      if (res.ok) {
        alert("✅ Thank you! Your request has been sent.");
        form.reset();
      } else {
        alert("❌ Something went wrong. Please try again later.");
      }
    } catch (err) {
      console.error("Error sending form:", err);
      alert("❌ Error submitting form. Check your internet or try again.");
    }
  });
});
