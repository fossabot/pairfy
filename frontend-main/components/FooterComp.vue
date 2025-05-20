<template>
  <footer class="footer" role="contentinfo">
    <div class="footer-container">
      <nav class="footer-columns" aria-label="Footer Navigation">

        <!-- Company -->
        <div class="footer-column">
          <h2 class="footer-title">Company</h2>
          <ul>
            <li><a href="/about">About Us</a></li>
            <li><a href="/team">Our Team</a></li>
            <li><a href="/blog">Blog & News</a></li>
            <li><a href="/careers">Careers</a></li>
            <li><a href="/partners">Partners</a></li>
          </ul>
        </div>

        <!-- Help -->
        <div class="footer-column">
          <h2 class="footer-title">Customer Support</h2>
          <ul>
            <li><a href="/faq">FAQs</a></li>
            <li><a href="/support">Help Center</a></li>
            <li><a href="/shipping">Shipping Info</a></li>
            <li><a href="/returns">Returns & Refunds</a></li>
            <li><a href="/contact">Contact Us</a></li>
          </ul>
        </div>

        <!-- Legal -->
        <div class="footer-column">
          <h2 class="footer-title">Legal</h2>
          <ul>
            <li><a href="/terms">Terms of Service</a></li>
            <li><a href="/privacy">Privacy Policy</a></li>
            <li><a href="/cookies">Cookie Settings</a></li>
            <li><a href="/security">Security</a></li>
          </ul>
        </div>

        <!-- Contact -->
        <div class="footer-column">
          <h2 class="footer-title">Contact</h2>
          <ul>
            <li><a href="mailto:support@yourshop.com">support@yourshop.com</a></li>
            <li>Mon–Fri: 9am–6pm</li>
            <li>+1 234 567 890</li>
            <li>Bogotá, Colombia</li>
          </ul>
        </div>

        <!-- Social -->
        <div class="footer-column">
          <h2 class="footer-title">Follow Us</h2>
          <ul class="social-links">
            <li><a href="#" aria-label="YouTube">YouTube</a></li>
            <li><a href="#" aria-label="Instagram">Instagram</a></li>
            <li><a href="#" aria-label="Facebook">Facebook</a></li>
            <li><a href="#" aria-label="X (Twitter)">X</a></li>
            <li><a href="#" aria-label="GitHub">GitHub</a></li>
          </ul>
        </div>

      </nav>

      <div class="footer-bottom">
        <p>&copy; 2025 Pairfy LLC. All rights reserved.</p>
        <div class="payment-icons">
          <!-- Optional: Add payment method icons here -->
        </div>
      </div>
    </div>
  </footer>
</template>

<script setup>

</script>

<style scoped>
.footer {
  background-color: var(--background-b);
  font-size: var(--text-size-1);
  color: var(--text-a);
  padding: 4rem 1rem;
  margin-top: 4rem;
}

.footer-container {
  max-width: var(--body-a);
  margin: 0 auto;
  display: flex;
  flex-direction: column;
  gap: 2rem;
}

.footer-columns {
  display: grid;
  grid-template-columns: repeat(5, 1fr);
  gap: 2rem;
}

.footer-column {
  display: flex;
  flex-direction: column;
}

.footer-title {
  font-size: var(--text-size-2);
  font-weight: 700;
  margin-bottom: 1rem;
}

.footer-column ul {
  list-style: none;
  padding: 0;
  margin: 0;
}

.footer-column ul li {
  margin-bottom: 0.75rem;
}

.footer-column ul li a {
  color: var(--text-a);
  text-decoration: none;
  transition: color 0.3s ease;
}

.footer-column ul li a:hover {
  color: var(--primary-a);
}

.social-links li {
  display: flex;
  align-items: center;
}

.footer-bottom {
  border-top: 1px solid var(--border-a);
  padding-top: 1rem;
  display: flex;
  justify-content: space-between;
  align-items: center;
  flex-wrap: wrap;
  gap: 1rem;
  font-size: var(--text-size-1);
}

@media (max-width: 768px) {
  .footer-bottom {
    flex-direction: column;
    text-align: center;
  }
}
</style>