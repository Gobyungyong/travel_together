import axios from "axios";

class AuthFunc {
  setUserInLocalStorage(access, refresh) {
    localStorage.setItem("access_token", access);
    localStorage.setItem("refresh_token", refresh);
  }

  async login(username, password) {
    const response = await axios.post(
      "http://localhost:8000/api/v1/users/login/",
      {
        username,
        password,
      }
    );

    if (response.status !== 200) {
      return;
    }

    this.setUserInLocalStorage(response.data.access, response.data.refresh);

    return response.data.access;
  }

  async logout() {
    try {
      const refresh = localStorage.getItem("refresh_token");

      const response = await axios.post(
        "http://localhost:8000/api/v1/users/logout/",
        {
          refresh,
        }
      );
      localStorage.clear();
      return response;
    } catch {
      localStorage.clear();
      throw new Error("이미 만료된 리프레쉬 토큰");
    }
  }

  async getCurrentUser() {
    const access_token = localStorage.getItem("access_token");
    const response = await axios.get("api/v1/users/myinfo/", {
      headers: { Authorization: `Bearer ${access_token}` },
    });
    return { ...response.data, token: access_token };
  }
}

export default new AuthFunc();
