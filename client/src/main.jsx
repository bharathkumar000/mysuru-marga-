import { StrictMode } from 'react'
import { createRoot } from 'react-dom/client'
import './index.css'
import './i18n'
import App from './App.jsx'

// Seed mock users for Admin/Partner demo
const mockUsers = [
  { fullName: 'Rahul Sharma', email: 'rahul@example.com', role: 'user', joinedAt: new Date().toISOString() },
  { fullName: 'Mysore Karanji Official', email: 'partner@test.com', role: 'partner', joinedAt: new Date().toISOString() },
  { fullName: 'Guru Raja', email: 'guru@example.com', role: 'partner', joinedAt: new Date().toISOString() },
  { fullName: 'Admin Core', email: 'admin@test.com', role: 'admin', joinedAt: new Date().toISOString() }
];

const existingUsers = JSON.parse(localStorage.getItem('usersDB') || '[]');
// Ensure our core test accounts exist by merging
const updatedUsers = [...existingUsers];
mockUsers.forEach(mock => {
  if (!updatedUsers.find(u => u.email === mock.email)) {
    updatedUsers.push(mock);
  }
});
localStorage.setItem('usersDB', JSON.stringify(updatedUsers));


createRoot(document.getElementById('root')).render(
  <StrictMode>
    <App />
  </StrictMode>,
)