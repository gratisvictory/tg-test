import React, { useState, useEffect } from 'react';

interface User {
  id: string;
  name: string;
  completedTasks: number;
}

// Типы для Telegram WebApp API
declare global {
  interface Window {
    Telegram?: {
      WebApp?: {
        initDataUnsafe?: {
          user?: {
            id: string;
            first_name: string;
          }
        }
      }
    }
  }
}

const ProfileView: React.FC = () => {
  const [user, setUser] = useState<User>({
    id: '',
    name: '',
    completedTasks: 0
  });

  useEffect(() => {
    const fetchProfile = async () => {
      try {
        const tg_user = window.Telegram?.WebApp?.initDataUnsafe?.user;
        if (!tg_user) {
          console.error('Telegram user not found');
          return;
        }

        const response = await fetch(`https://refactored-fishstick-jj7qgwww9x94cq4r6-8000.app.github.dev/api/main/${tg_user.id}`);
        const data = await response.json();

        setUser({
          id: tg_user.id,
          name: tg_user.first_name,
          completedTasks: data.completedTasks
        });
      } catch (error) {
        console.log(error);
      }
    };

    fetchProfile();
  }, []);

  return (
    <div className="profile-container">
      <h2>Профиль</h2>
      <div className="profile-info">
        <p><strong>ID:</strong> {user.id}</p>
        <p><strong>Имя:</strong> {user.name}</p>
        <p><strong>Выполнено задач:</strong> {user.completedTasks}</p>
      </div>

      <style>{`
        .profile-container {
          flex: 1;
          display: flex;
          flex-direction: column;
          justify-content: flex-start;
          align-items: center;
          padding: 16px;
        }

        .profile-info {
          background-color: #ffffffcc;
          backdrop-filter: blur(8px);
          padding: 16px;
          border-radius: 8px;
          text-align: left;
          box-shadow: 0 2px 8px rgba(0,0,0,0.05);
          margin-top: 16px;
          width: 100%;
          max-width: 320px;
        }
      `}</style>
    </div>
  );
};

export { ProfileView };
