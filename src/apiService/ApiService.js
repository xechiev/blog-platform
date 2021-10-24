export default class ApiService {
  _domain = "https://cirosantilli-realworld-express.herokuapp.com/api/";

  async getResourse(url) {
    const result = await fetch(`${this._domain}${url}`);

    if (!result.ok) {
      throw new Error(`Возникла ошибка ${result.status}`);
    }
    // eslint-disable-next-line no-return-await
    return await result.json();
  }

  async getPostsData() {
    const result = await this.getResourse("articles");
    return result;
  }

  async registerUser(data) {
    const result = await fetch(`${this._domain}${"users"}`, {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({ user: data }),
    });
    const request = result.json();
    return request;
  }

  async authenticationUser(data) {
    const result = await fetch(`${this._domain}${"users/login"}`, {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({ user: data }),
    });
    const request = result.json();
    return request;
  }

  async updatedUser(data, token) {
    const result = await fetch(`${this._domain}${"users"}`, {
      method: "PUT",
      headers: {
        "Content-Type": "application/json",
        Authorization: `Token ${token}`,
      },
      body: JSON.stringify({ user: data }),
    });
    const request = result.json();
    return request;
  }

  async updatedArticle(data) {
    const result = await fetch(`${this._domain}${"articles"}`, {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({ user: data }),
    });
    const request = result.json();
    return request;
  }

  // async getArticle(value) {
  //   const result = await this.getResourse(`articles/${value}`);
  //   return result;
  // }
}
