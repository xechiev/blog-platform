export default class ApiService {
  _domain = "https://conduit-api-realworld.herokuapp.com/api/";

  _domain2 = "https://api.realworld.io/api/";

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

  async getArticle(slug) {
    const result = await this.getResourse(`articles/${slug}`);
    return result;
  }

  async registerUser(data) {
    let result = await fetch(`${this._domain2}${"users"}`, {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({ user: data }),
    });

    if (result.status === 422) {
      result = "error";
      return result;
    }
    return result.json();
  }

  async authenticationUser(data) {
    const result = await fetch(`${this._domain2}${"users/login"}`, {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({ user: data }),
    });
    const request = result.json();
    return request;
  }

  async updatedUser(data, token) {
    const result = await fetch(`${this._domain2}${"user"}`, {
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

  async createArticle(data, token) {
    let result = await fetch(`${this._domain2}${"articles"}`, {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
        Authorization: `Token ${token}`,
      },
      body: JSON.stringify({ article: data }),
    });

    if (result.status === 422) {
      result = "error";
      return result;
    }

    return result.json();
  }

  async updatedArticle(data, slug, token) {
    const result = await fetch(`${this._domain2}${"articles"}${slug}`, {
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

  async deleteArticle(slug, token) {
    const result = await fetch(`${this._domain}${"articles/"}${slug}`, {
      method: "DELETE",
      headers: {
        "Content-Type": "application/json",
        Authorization: `Token ${token}`,
      },
    });

    const request = result.json();
    return request;
  }

  async favoriteArticle(slug, token) {
    const result = await fetch(
      `${this._domain}${"articles/"}${slug}/favorite`,
      {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
          Authorization: `Token ${token}`,
        },
        body: "",
      }
    );
    const request = result.json();
    return request;
  }

  async unFavoriteArticle(slug, token) {
    const result = await fetch(
      `${this._domain}${"articles/"}${slug}/favorite`,
      {
        method: "DELETE",
        headers: {
          "Content-Type": "application/json",
          Authorization: `Token ${token}`,
        },
      }
    );
    const request = result.json();
    return request;
  }
}
