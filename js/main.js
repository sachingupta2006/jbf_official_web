// Jay Bajrang Foods - Handcrafted Natural Site Script

document.addEventListener('DOMContentLoaded', () => {
  // Mobile Menu Toggle
  const mobileMenuBtn = document.getElementById('mobileMenuBtn');
  const mobileMenu = document.getElementById('mobileMenu');

  if (mobileMenuBtn && mobileMenu) {
    mobileMenuBtn.addEventListener('click', () => {
      mobileMenu.classList.toggle('hidden');
    });

    const links = mobileMenu.querySelectorAll('a');
    links.forEach(link => {
      link.addEventListener('click', () => {
        mobileMenu.classList.add('hidden');
      });
    });
  }

  // Product Category Filter
  const filterBtns = document.querySelectorAll('.product-filter-btn');
  const productCards = document.querySelectorAll('.product-card-item');

  filterBtns.forEach(btn => {
    btn.addEventListener('click', () => {
      filterBtns.forEach(b => {
        b.classList.remove('bg-red-800', 'text-white', 'border-red-900');
        b.classList.add('bg-white', 'text-gray-700', 'border-gray-300');
      });
      btn.classList.add('bg-red-800', 'text-white', 'border-red-900');
      btn.classList.remove('bg-white', 'text-gray-700', 'border-gray-300');

      const filter = btn.getAttribute('data-filter');

      productCards.forEach(card => {
        if (filter === 'all' || card.getAttribute('data-category') === filter) {
          card.classList.remove('hidden');
        } else {
          card.classList.add('hidden');
        }
      });
    });
  });

  // Pre-fill Product in Quote Form
  const quoteBtns = document.querySelectorAll('.request-quote-btn');
  const productSelect = document.getElementById('productSelect');
  const inquirySection = document.getElementById('inquiry');

  quoteBtns.forEach(btn => {
    btn.addEventListener('click', () => {
      const prodName = btn.getAttribute('data-product');
      if (productSelect && prodName) {
        productSelect.value = prodName;
      }
      if (inquirySection) {
        inquirySection.scrollIntoView({ behavior: 'smooth' });
      }
    });
  });

  // WhatsApp Message Generator (Natural & Respectful)
  const sendWhatsappBtn = document.getElementById('sendWhatsappBtn');
  if (sendWhatsappBtn) {
    sendWhatsappBtn.addEventListener('click', () => {
      const name = document.getElementById('senderName')?.value || '';
      const firm = document.getElementById('senderFirm')?.value || '';
      const phone = document.getElementById('senderPhone')?.value || '';
      const city = document.getElementById('senderLocation')?.value || '';
      const product = document.getElementById('productSelect')?.value || 'Nylon Sev / Mumra / Bombay Bhel';
      const quantity = document.getElementById('senderQuantity')?.value || '';
      const note = document.getElementById('senderMessage')?.value || '';

      let text = `Namaste Sunil Ji (Jay Bajrang Foods),%0A%0AMy name is ${encodeURIComponent(name || 'Customer')}`;
      if (firm) text += ` from *${encodeURIComponent(firm)}*`;
      if (city) text += `, Location: *${encodeURIComponent(city)}*`;
      if (phone) text += `%0AContact: *${encodeURIComponent(phone)}*`;
      text += `%0A%0A*Requirement:* ${encodeURIComponent(product)}`;
      if (quantity) text += `%0A*Quantity:* ${encodeURIComponent(quantity)}`;
      if (note) text += `%0A*Note:* ${encodeURIComponent(note)}`;
      text += `%0A%0APlease share wholesale price list and sample availability. Thank you!`;

      window.open(`https://wa.me/917666564623?text=${text}`, '_blank');
    });
  }

  // Inquiry Form Submission via FormSubmit AJAX with fallback
  const inquiryForm = document.getElementById('inquiryForm');
  const formSuccess = document.getElementById('formSuccess');
  const formSubmitBtn = document.getElementById('formSubmitBtn');

  if (inquiryForm) {
    inquiryForm.addEventListener('submit', async (e) => {
      e.preventDefault();

      if (formSubmitBtn) {
        formSubmitBtn.disabled = true;
        formSubmitBtn.textContent = 'Submitting your requirement...';
      }

      const formData = new FormData(inquiryForm);
      const jsonPayload = {};
      formData.forEach((val, key) => {
        jsonPayload[key] = val;
      });

      try {
        const response = await fetch('https://formsubmit.co/ajax/jbd.guddubhai@gmail.com', {
          method: 'POST',
          headers: {
            'Content-Type': 'application/json',
            'Accept': 'application/json'
          },
          body: JSON.stringify(jsonPayload)
        });

        if (response.ok) {
          if (formSuccess) formSuccess.classList.remove('hidden');
          inquiryForm.reset();
        } else {
          inquiryForm.submit();
        }
      } catch (err) {
        inquiryForm.submit();
      } finally {
        if (formSubmitBtn) {
          formSubmitBtn.disabled = false;
          formSubmitBtn.textContent = 'Submit Inquiry to Sunil Gupta';
        }
      }
    });
  }

  // Year in Footer
  const yearEl = document.getElementById('currentYear');
  if (yearEl) {
    yearEl.textContent = new Date().getFullYear();
  }
});
