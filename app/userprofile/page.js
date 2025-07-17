'use client';
import { useEffect, useState } from 'react';
import styles from '@/styles/UserProfile.module.css';
import { useRouter } from 'next/navigation';

export default function UserProfile() {
  const router = useRouter();
  const [user, setUser] = useState(null);
  const [editMode, setEditMode] = useState(false);
  const [formData, setFormData] = useState({
    username: '',
    interest: [],
    profilePic: ''
  });

  useEffect(() => {
    const storedUser = JSON.parse(localStorage.getItem('user'));
    if (!storedUser) {
      alert('Please login to view your profile');
      router.push('/login');
    } else {
      // Ensure interest is always an array
      const interestArray = Array.isArray(storedUser.interest)
        ? storedUser.interest
        : typeof storedUser.interest === 'string'
        ? [storedUser.interest]
        : [];

      const userWithSafeInterest = {
        ...storedUser,
        interest: interestArray,
      };

      setUser(userWithSafeInterest);
      setFormData({
        username: userWithSafeInterest.username || '',
        interest: userWithSafeInterest.interest,
        profilePic: userWithSafeInterest.profilePic || '',
      });
    }
  }, []);

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData(prev => ({ ...prev, [name]: value }));
  };

  const handleInterestChange = (e) => {
    const selected = Array.from(e.target.selectedOptions, opt => opt.value);
    setFormData(prev => ({ ...prev, interest: selected }));
  };

  const handleImageUpload = (e) => {
    const file = e.target.files[0];
    if (!file) return;

    const reader = new FileReader();
    reader.onloadend = () => {
      setFormData(prev => ({ ...prev, profilePic: reader.result }));
    };
    reader.readAsDataURL(file);
  };

  const handleSave = () => {
    const updatedUser = { ...user, ...formData };
    localStorage.setItem('user', JSON.stringify(updatedUser));
    setUser(updatedUser);
    setEditMode(false);
    alert('Profile updated!');
  };

  if (!user) return null;

  return (
    <div className={styles.profileContainer}>
      <h1 className={styles.title}>User Profile</h1>

      <img
        src={formData.profilePic || '/default-avatar.png'}
        alt="Profile"
        className={styles.profileImage}
      />

      {editMode && (
        <input
          type="file"
          accept="image/*"
          onChange={handleImageUpload}
          className={styles.input}
        />
      )}

      <div className={styles.fieldGroup}>
        <label>Username:{" "}</label>
        {editMode ? (
          <input
            type="text"
            name="username"
            value={formData.username}
            onChange={handleChange}
            className={styles.input}
          />
        ) : (
          <span className={styles.text}>{user.username}</span>
        )}
      </div>

      <div className={styles.fieldGroup}>
        <label>Interested Blog Fields:</label>
        {editMode ? (
            <div className={styles.checkboxGroup}>
            {['Tech', 'AI/ML', 'Travel', 'Food', 'Design'].map((interestOption) => (
                <label key={interestOption} className={styles.checkboxLabel}>
                <input
                    type="checkbox"
                    value={interestOption}
                    checked={formData.interest.includes(interestOption)}
                    onChange={(e) => {
                    const { value, checked } = e.target;
                    setFormData((prev) => {
                        const newInterest = checked
                        ? [...prev.interest, value]
                        : prev.interest.filter((i) => i !== value);
                        return { ...prev, interest: newInterest };
                    });
                    }}
                />
                {interestOption}
                </label>
            ))}
            </div>
        ) : (
            <ul className={styles.list}>
            {Array.isArray(user.interest) && user.interest.length > 0 ? (
                user.interest.map((field, idx) => <li key={idx}>{field}</li>)
            ) : (
                <li>None</li>
            )}
            </ul>
        )}
      </div>


      <div className={styles.buttonRow}>
        {editMode ? (
          <>
            <button onClick={handleSave}>Save</button>
            <button onClick={() => setEditMode(false)}>Cancel</button>
          </>
        ) : (
          <button onClick={() => setEditMode(true)}>Edit Profile</button>
        )}
      </div>
    </div>
  );
}
