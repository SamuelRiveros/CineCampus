<script>

export default {
    name: "Register",
    setup() {
        const goToHome = () => {
            router.push({ name: 'Home' });
        };
    }
}

</script>

<template>
      <div class="align">
          <img src="../../public/assets/images/cinecampuspng.png" class="cinecampusimg">
          <div class="grid">
              <form class="form login">
                <div class="form__field">
              <label for="login__username">
                <img src="../../public/assets/icons/user.svg" alt="User Icon" class="icon" />
                <span class="hidden">Usuario</span>
              </label>
              <input
                id="login__username"
                type="text"
                name="username"
                class="form__input"
                placeholder="Usuario"
                required
              />
            </div>
  
            <div class="form__field">
              <label for="login__password">
                <img src="../../public/assets/icons/lock.png" alt="Lock Icon" class="icon" />
                <span class="hidden">Contraseña</span>
                </label>
                <input
                    id="login__password"
                    type="password"
                    name="password"
                    class="form__input"
                    placeholder="Contraseña"
                    required
              />
            </div>
  
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

    .login {
    color: #eee;
    }

    .login label,
    .login input[type='text'],
    .login input[type='password'],
    .login input[type='submit'] {
    border-radius: 0.25rem;
    padding: 1rem;
    }

    .login label {
    background-color: #363b41;
    border-bottom-right-radius: 0;
    border-top-right-radius: 0;
    padding-left: 1.25rem;
    }

    .login input[type='password'],
    .login input[type='text'] {
    background-color: #3b4148;
    border-bottom-left-radius: 0;
    border-top-left-radius: 0;
    }

    .login input[type='password']:focus,
    .login input[type='password']:hover,
    .login input[type='text']:focus,
    .login input[type='text']:hover {
    background-color: #434a52;
    }

    .login input[type='submit'] {
    background-color: #ff0000;
    color: #eee;
    font-weight: 700;
    text-transform: uppercase;
    }

    .login input[type='submit']:focus,
    .login input[type='submit']:hover {
    background-color: #d44179;
    }

    p {
    margin: 1.5rem 0;
    }
</style>