import './styles.css';

import ResultCard from 'components/ResultCard';
import { useState } from 'react';
import axios from 'axios';

type FormData = {
  login: string;
};

type UserData = {
  avatar_url: string;
  url: string;
  followers: string;
  location: string;
  name: string;
};

const UserSearch = () => {
  const [formData, setFormData] = useState<FormData>({
    login: '',
  });

  const [userData, setUserData] = useState<UserData>();

  const handleChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    const name = event.target.name;
    const value = event.target.value;

    setFormData({ ...formData, [name]: value });
  };

  const handleSubmit = (event: React.FormEvent<HTMLFormElement>) => {
    event.preventDefault();
    axios
      .get(`https://api.github.com/users/${formData.login}`)
      .then((response) => {
        setUserData(response.data);
        console.log(response.data);
      })
      .catch((error) => {
        setUserData(undefined);
        console.log(error);
      });
  };

  return (
    <div className="userName-search-container">
      <div className="container search-container">
        <h1>Encontre um perfil Github</h1>
        <form onSubmit={handleSubmit}>
          <div className="form-container">
            <input
              type="text"
              name="login"
              value={formData.login}
              className="search-input"
              placeholder="Usuário Github"
              onChange={handleChange}
            />
            <button type="submit" className="btn btn-primary search-button">
              Encontrar
            </button>
          </div>
        </form>

        {userData && (
          <div className="result-main-container">
            <div className="avatar-content">
                  <img title="img-profile" src={userData.avatar_url} alt="" />
            </div>
            <div className="result-second-container">
              <div className="result-form-content">
                <h1>Informações</h1>
                <>
                  <ResultCard title="Perfil:" description={userData.url} />

                  <ResultCard title="Seguidores:" description={userData.followers} />

                  <ResultCard title="Localidade:" description={userData.location} />

                  <ResultCard title="Nome:" description={userData.name} />
                </>
              </div>
            </div>
          </div>
        )}
      </div>
    </div>
  );
};

export default UserSearch;
