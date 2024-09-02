<script>
import { ref } from 'vue';
import { useRouter } from 'vue-router';

export default {
  name: "Register",
  setup() {
    const form = ref({
      nombre: '',
      email: '',
      telefono: '',
      contraseña: '',
      img: "https://i.imgur.com/36d7HFU.png"
      // targeta_vip: false,
      // admin: false
    });

    const router = useRouter();

    const registerUser = async () => {
      try {
        const response = await fetch('http://localhost:3001/api/createclient', {
          method: 'POST',
          headers: {
            'Content-Type': 'application/json'
          },
          body: JSON.stringify(form.value)
        });

        const data = await response.json();

        if (response.ok) {
          alert(`¡ Te has registrado correctamente ${form.value.nombre} !`);
          router.push({ name: 'Home' });
        } else {
          alert('Error de autenticación: ' + (data.message || 'Credenciales incorrectas'));
          console.error('Error de autenticación:', data.message);
        }
      } catch (error) {
        console.error('Error al autenticar usuario:', error);
      }
    };

    return { form, registerUser };
  }
}
</script>

<template>
  <div class="align">
    <img src="/frontend/public/assets/icons/back.svg" class="back" @click="$router.go(-1)">

    <img src="../../public/assets/images/cinecampuspng.png" class="cinecampusimg">
    <div class="grid">
      <form class="form register" @submit.prevent="registerUser">

        <!-- Usuario -->
        <div class="form__field">
          <label for="register__username">
            <img src="../../public/assets/icons/user.svg" alt="User Icon" class="icon" />
            <span class="hidden">Usuario</span>
          </label>
          <input
            id="register__username"
            type="text"
            name="username"
            class="form__input"
            placeholder="Usuario"
            v-model="form.nombre"
            required
          />
        </div>

        <!-- Email -->
        <div class="form__field">
          <label for="register__email">
            <img src="../../public/assets/icons/email.svg" alt="User Icon" class="icon" />
            <span class="hidden">E-mail</span>
          </label>
          <input
            id="register__email"
            type="email"
            name="email"
            class="form__input"
            placeholder="E-Mail"
            v-model="form.email"
            required
          />
        </div>

        <!-- Telefono -->
        <div class="form__field">
          <label for="register__phone">
            <img src="../../public/assets/icons/phone.svg" alt="User Icon" class="icon" />
            <span class="hidden">Telefono</span>
          </label>
          <input
            id="register__phone"
            type="number"
            name="phone"
            class="form__input"
            placeholder="Telefono"
            v-model="form.telefono"
            required
          />
        </div>

        <!-- Contraseña -->
        <div class="form__field">
          <label for="register__password">
            <img src="../../public/assets/icons/lock.png" alt="Lock Icon" class="icon" />
            <span class="hidden">Contraseña</span>
          </label>
          <input
            id="register__password"
            type="password"
            name="password"
            class="form__input"
            placeholder="Contraseña"
            v-model="form.contraseña"
            required
          />
        </div>

        <!-- Targeta VIP -->
        <!-- <div class="form__field">
          <label for="register__vip">
            Targeta VIP
          </label>
          <input
            id="register__vip"
            type="checkbox"
            name="targeta_vip"
            v-model="form.targeta_vip"
          />
        </div> -->

        <!-- Admin -->
        <!-- <div class="form__field">
          <label for="register__admin">
            Admin
          </label>
          <input
            id="register__admin"
            type="checkbox"
            name="admin"
            v-model="form.admin"
          />
        </div> -->

        <div class="form__field">
          <input type="submit" value="Registrate" />
        </div>
      </form>
    </div>
  </div>
</template>

  
<style scoped>

    .cinecampusimg {
        position: absolute;
        top: 30px;
        width: 60%;
    }

    .back {
      width: 10%;
      position: absolute;
      top: 30px;
      left: 30px;
    }

    .align {
    display: flex;
    align-items: center;
    justify-content: center;
    flex-direction: column;
    height: 100vh;
    background-color: #121212;
        font-family: 'Arial', sans-serif;
    }

    .grid {
    max-width: 320px;
    width: 90%;
    }

    .hidden {
    border: 0;
    clip: rect(0, 0, 0, 0);
    height: 1px;
    margin: -1px;
    overflow: hidden;
    padding: 0;
    position: absolute;
    width: 1px;
    }

    .icon {
    display: inline-block;
    width: 1em;
    height: 1em;
    vertical-align: middle;
    }

    a {
    color: #ff0000;
    text-decoration: none;
    }

    a:focus,
    a:hover {
    text-decoration: underline;
    }

    input {
    background-image: none;
    border: 0;
    color: inherit;
    font: inherit;
    margin: 0;
    outline: 0;
    padding: 0;
    transition: background-color 0.3s;
    }

    input[type='submit'] {
    cursor: pointer;
    }

    .form {
    margin: 0;
    }

    .form input[type='password'],
    .register input[type='email'],
    .form input[type='text'],
    .form input[type='submit'] {
    width: 100%;
    }

    .form__field {
    display: flex;
    margin: 0.875rem;
    }

    .form__input {
    flex: 1;
    }

    .register {
    color: #eee;
    }

    .register label,
    .register input[type='text'],
    .register input[type='email'],
    .register input[type='password'],
    .register input[type='submit'] {
    border-radius: 0.25rem;
    padding: 1rem;
    }

    .register label {
    background-color: #363b41;
    border-bottom-right-radius: 0;
    border-top-right-radius: 0;
    padding-left: 1.25rem;
    }

    .register input[type='password'],
    .register input[type='email'],
    .register input[type='text'] {
    background-color: #3b4148;
    border-bottom-left-radius: 0;
    border-top-left-radius: 0;
    }

    .register input[type='password']:focus,
    .register input[type='email']:focus,
    .register input[type='password']:hover,
    .register input[type='text']:focus,
    .register input[type='text']:hover {
    background-color: #434a52;
    }

    .register input[type='submit'] {
    background-color: #ff0000;
    color: #eee;
    font-weight: 700;
    text-transform: uppercase;
    }

    .register input[type='submit']:focus,
    .register input[type='submit']:hover {
    background-color: #d44179;
    }

    p {
    margin: 1.5rem 0;
    }
</style>