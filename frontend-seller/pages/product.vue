<template>
    <main class="page">
      <section class="hero">
        <h1 class="title">Descubre [Nombre del Producto]</h1>
        <p class="subtitle">Tecnología avanzada para mejorar tu productividad.</p>
        <button class="cta">Buy Now</button>
      </section>
  
      <section class="features">
        <h2 class="section-title">¿Por qué elegirnos?</h2>
        <div class="feature-list">
          <div class="feature">
            <h3>🚀 Alto Rendimiento</h3>
            <p>Diseñado para velocidad y eficiencia.</p>
          </div>
          <div class="feature">
            <h3>🔐 Seguridad</h3>
            <p>Protección total de tus datos.</p>
          </div>
          <div class="feature">
            <h3>💬 Soporte 24/7</h3>
            <p>Te acompañamos en todo momento.</p>
          </div>
        </div>
      </section>
  
      <section class="testimonials">
        <h2 class="section-title">Opiniones de Clientes</h2>
        <p class="testimonial">"Una herramienta indispensable en nuestro día a día." — Carla R.</p>
        <p class="testimonial">"Impresionante cómo nos ayudó a crecer tan rápido." — Juan V.</p>
      </section>
  
      <section class="cta-section">
        <h2>¿Listo para avanzar?</h2>
        <button class="cta">Crear Cuenta</button>
      </section>
  
      <footer class="footer">
        © 2025 TuEmpresa. Todos los derechos reservados.
      </footer>
    </main>
  </template>
  
  <script setup>
  // No requiere lógica por ahora
  </script>
  
  <style scoped>
  .page {

    color: #1f1f1f;
    line-height: 1.6;
  }
  
  /* Hero */
  .hero {
    background: linear-gradient(135deg, #4f46e5, #7c3aed);
    color: white;
    text-align: center;
    padding: 80px 20px;
  }
  
  .title {
    font-size: 2.5rem;
    margin-bottom: 20px;
  }
  
  .subtitle {
    font-size: 1.25rem;
    margin-bottom: 30px;
  }
  
  .cta {
    background: white;
    color: #4f46e5;
    border: none;
    padding: 14px 28px;
    font-weight: bold;
    font-size: 1rem;
    border-radius: 8px;
    cursor: pointer;
    transition: background 0.3s;
  }
  
  .cta:hover {
    background: #e0e7ff;
  }
  
  /* Features */
  .features {
    padding: 60px 20px;
    text-align: center;
  }
  
  .section-title {
    font-size: 2rem;
    margin-bottom: 40px;
  }
  
  .feature-list {
    display: flex;
    flex-wrap: wrap;
    justify-content: center;
    gap: 40px;
  }
  
  .feature {
    max-width: 280px;
  }
  
  /* Testimonials */
  .testimonials {
    background: #f9fafb;
    padding: 60px 20px;
    text-align: center;
  }
  
  .testimonial {
    font-style: italic;
    margin: 12px 0;
  }
  
  /* CTA Final */
  .cta-section {
    text-align: center;
    padding: 60px 20px;
  }
  
  /* Footer */
  .footer {
    text-align: center;
    font-size: 0.875rem;
    color: #888;
    padding: 20px;
    background: #f0f0f0;
  }
  
  /* Responsive */
  @media (max-width: 768px) {
    .title {
      font-size: 2rem;
    }
    .feature-list {
      flex-direction: column;
      align-items: center;
    }
  }
  </style>
  