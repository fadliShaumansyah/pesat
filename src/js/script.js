AOS.init({
  once: true,
  duration: 600,
});

const texts = [
  "Advanced Industrial Solutions",
  "Innovative Waste Management",
  "Sustainable Energy Solutions",
];
let index = 0;
const textEl = document.getElementById("changing-text");

setInterval(() => {
  textEl.classList.add("opacity-0");
  setTimeout(() => {
    textEl.innerText = texts[index];
    textEl.classList.remove("opacity-0");
    index = (index + 1) % texts.length;
  }, 500); // durasi fade-out
}, 3000); // total durasi antar teks

// contanct form

const form = document.getElementById("contact-form");
const toast = document.getElementById("success-toast");

form.addEventListener("submit", function (e) {
  e.preventDefault();

  const scriptURL =
    "https://script.google.com/macros/s/AKfycbwiUhFOwU43GtHg0ZiskUBa1fyOXsB_ClgB1yzzOpIQ_zv2W7_hsBJezz4nFSZhBDqm/exec";
  const formData = new FormData(form);

  // Mengirimkan data form ke server menggunakan fetch
  fetch(scriptURL, { method: "POST", body: formData })
    .then((response) => {
      // Cek status code respons dan pastikan ini adalah JSON
      if (!response.ok) {
        throw new Error("Terjadi kesalahan di server.");
      }
      return response.json(); // Parse respons ke format JSON
    })
    .then((data) => {
      // Cek apakah status berhasil
      if (data.status === "success") {
        // Tampilkan toast sukses
        toast.classList.remove("opacity-0", "pointer-events-none");
        toast.classList.add("opacity-100");

        // Reset form
        form.reset();

        // Sembunyikan toast setelah 3 detik
        setTimeout(() => {
          toast.classList.remove("opacity-100");
          toast.classList.add("opacity-0", "pointer-events-none");
        }, 3000);
      } else {
        alert("Gagal mengirim pesan. Silakan coba lagi.");
      }
    })
    .catch((error) => {
      // Menangani error jika fetch gagal
      console.error("Error!", error.message);
      alert("Terjadi kesalahan. Silakan coba lagi.");
    });
});

// scrip gspreed sheet
// function doPost(e) {
//     var sheet = SpreadsheetApp.getActiveSheet();
//     var name = e.parameter.name;
//     var email = e.parameter.email;
//     var message = e.parameter.message;

//     sheet.appendRow([new Date(), name, email, message]);

//     // Respons sukses dalam format JSON
//     return ContentService.createTextOutput(
//       JSON.stringify({ status: 'success', message: 'Data berhasil disimpan!' })
//     ).setMimeType(ContentService.MimeType.JSON);
//   }

//darkmode
const toggle = document.getElementById("dark-toggle");

// Cek localStorage saat pertama kali
if (localStorage.theme === "dark") {
  document.documentElement.classList.add("dark");
} else {
  document.documentElement.classList.remove("dark");
}

// Fungsi toggle
toggle.addEventListener("click", () => {
  document.documentElement.classList.toggle("dark");

  // Simpan preferensi
  if (document.documentElement.classList.contains("dark")) {
    localStorage.theme = "dark";
  } else {
    localStorage.theme = "light";
  }
});
