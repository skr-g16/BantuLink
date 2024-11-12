/* eslint-disable linebreak-style */
const loadSignupPage = () => {
  const signupCard = document.getElementById('signupCard');
  signupCard.innerHTML = `
    <div class="card">
        <div class="card2">
            <form class="form" id="signupForm">
                <p id="heading">Sign Up</p>
                <div class="field">
                    <input type="text" class="input-field" name="first-name" placeholder="Nama Depan" required />
                </div>
                <div class="field">
                    <input type="text" class="input-field" name="last-name" placeholder="Nama Belakang" required />
                </div>
                <div class="field">
                    <input type="email" class="input-field" name="email" placeholder="Email" required />
                </div>
                <div class="field">
                    <input type="password" class="input-field" name="password" placeholder="Password" required />
                </div>
                <div class="btn">
                    <button type="submit" class="button1">Sign Up</button>
                    <button type="button" class="button2" onclick="loadPage('login')">Back to Login</button>
                </div>
            </form>
        </div>
    </div>
    `;

  // Menangani submit form signup setelah elemen ditambahkan ke DOM
  document.getElementById('signupForm').addEventListener('submit', (event) => {
    event.preventDefault(); // Mencegah reload
    const formData = new FormData(event.target);
    const firstName = formData.get('first-name');
    const lastName = formData.get('last-name');
    const email = formData.get('email');
    const password = formData.get('password');
    console.log('Nama Depan:', firstName, 'Nama Belakang:', lastName, 'Email:', email, 'Password:', password);
    loadPage('home'); // Pindah ke halaman home setelah signup
  });
};

export default loadSignupPage;