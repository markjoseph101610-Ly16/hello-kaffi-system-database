// public/login.js
import {
  auth,
  googleProvider,
  signInWithPopup,
  signInWithEmailAndPassword,
  onAuthStateChanged
} from "./firebase-config.js";

const params = new URLSearchParams(location.search);
const next = params.get("next") || "menu.html";

const usernameInput = document.getElementById("username");
const passwordInput = document.getElementById("password");
const loginBtn = document.getElementById("loginBtn");
const googleBtn = document.getElementById("googleBtn");
const errorBox = document.getElementById("errorBox");
const termsCheckbox = document.getElementById("terms");

function showError(msg) {
  if (!errorBox) return alert(msg);
  errorBox.textContent = msg;
  errorBox.style.display = "block";
}

function clearError() {
  if (errorBox) errorBox.style.display = "none";
}

function friendlyError(err) {
  switch (err.code) {
    case "auth/unauthorized-domain":
      return "This domain isn't authorized in Firebase yet. Add it under Authentication > Settings > Authorized domains.";
    case "auth/popup-closed-by-user":
      return "The Google window was closed before finishing.";
    case "auth/popup-blocked":
      return "Your browser blocked the popup. Allow popups and try again.";
    case "auth/invalid-credential":
    case "auth/wrong-password":
    case "auth/user-not-found":
      return "Incorrect username/email or password.";
    case "auth/too-many-requests":
      return "Too many attempts. Please wait a bit and try again.";
    case "auth/operation-not-allowed":
      return "This sign-in method isn't enabled in Firebase yet.";
    default:
      return err.message || "Something went wrong. Please try again.";
  }
}

// Redirect if already logged in
onAuthStateChanged(auth, (user) => {
  if (user) location.href = next;
});

// Email/password login
// NOTE: Firebase Auth needs an email. If your users type a username,
// convert it to an email here (or look it up in Firestore) before signing in.
loginBtn?.addEventListener("click", async (e) => {
  e.preventDefault();
  clearError();

  if (termsCheckbox && !termsCheckbox.checked) {
    return showError("Please agree to the Terms and Conditions.");
  }

  const id = usernameInput.value.trim();
  const password = passwordInput.value;
  if (!id || !password) return showError("Please enter your username and password.");

  const email = id.includes("@") ? id : `${id.toLowerCase()}@hellokaffi.app`;

  loginBtn.disabled = true;
  try {
    await signInWithEmailAndPassword(auth, email, password);
    location.href = next;
  } catch (err) {
    showError(friendlyError(err));
  } finally {
    loginBtn.disabled = false;
  }
});

// Google login
googleBtn?.addEventListener("click", async (e) => {
  e.preventDefault();
  clearError();

  if (termsCheckbox && !termsCheckbox.checked) {
    return showError("Please agree to the Terms and Conditions.");
  }

  googleBtn.disabled = true;
  try {
    await signInWithPopup(auth, googleProvider);
    location.href = next;
  } catch (err) {
    showError(friendlyError(err));
  } finally {
    googleBtn.disabled = false;
  }
});

// Show/hide password
document.getElementById("togglePassword")?.addEventListener("click", (e) => {
  const isHidden = passwordInput.type === "password";
  passwordInput.type = isHidden ? "text" : "password";
  e.target.textContent = isHidden ? "Hide" : "Show";
});