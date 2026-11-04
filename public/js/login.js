// Alternar entre pestaña de Login y pestaña de Registro
function cambiarVista(vista) {
  const formLogin = document.getElementById('formLogin');
  const formRegistro = document.getElementById('formRegistro');
  const btnTabLogin = document.getElementById('btnTabLogin');
  const btnTabRegistro = document.getElementById('btnTabRegistro');
  const mensaje = document.getElementById('mensajeEstado');

  mensaje.textContent = '';

  if (vista === 'login') {
    formLogin.style.display = 'block';
    formRegistro.style.display = 'none';
    btnTabLogin.classList.add('active');
    btnTabRegistro.classList.remove('active');
  } else {
    formLogin.style.display = 'none';
    formRegistro.style.display = 'block';
    btnTabRegistro.classList.add('active');
    btnTabLogin.classList.remove('active');
  }
}

// 1. Conexión con POST /auth/login (Iniciar Sesión)
document.getElementById('formLogin').addEventListener('submit', async function (e) {
  e.preventDefault();
  const email = document.getElementById('loginEmail').value.trim();
  const password = document.getElementById('loginPassword').value;
  const mensaje = document.getElementById('mensajeEstado');

  try {
    const respuesta = await fetch('/auth/login', {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({ email, password }),
    });

    const data = await respuesta.json();

    if (!respuesta.ok) {
      mensaje.style.color = '#e6185e';
      mensaje.textContent = data.message || 'Correo o contraseña incorrectos';
      return;
    }

    // Guardar token JWT y datos del usuario en el navegador
    localStorage.setItem('token', data.access_token);
    localStorage.setItem('usuario', JSON.stringify(data.usuario));

    // Regresar al inicio para elegir Nuevo Ingreso o Reingreso
    window.location.href = '/index.html';
  } catch (error) {
    mensaje.textContent = 'Error al conectar con el servidor';
  }
});

// 2. Conexión con POST /users (Registrar nuevo tutor)
document.getElementById('formRegistro').addEventListener('submit', async function (e) {
  e.preventDefault();
  const nombre = document.getElementById('regNombre').value.trim();
  const email = document.getElementById('regEmail').value.trim();
  const password = document.getElementById('regPassword').value;
  const mensaje = document.getElementById('mensajeEstado');

  try {
    const respuesta = await fetch('/users', {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({ nombre, email, password }),
    });

    const data = await respuesta.json();

    if (!respuesta.ok) {
      mensaje.style.color = '#e6185e';
      mensaje.textContent = data.message || 'No se pudo registrar el usuario';
      return;
    }

    mensaje.style.color = '#118652';
    mensaje.textContent = '¡Cuenta creada con éxito! Ahora inicia sesión.';
    document.getElementById('formRegistro').reset();
    setTimeout(() => cambiarVista('login'), 1200);
  } catch (error) {
    mensaje.textContent = 'Error al conectar con el servidor';
  }
});