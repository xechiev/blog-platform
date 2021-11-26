export default class ApiService {
  _domain = "https://api.realworld.io/api/";

  _userInfo = localStorage.getItem("user");

  _info = JSON.parse(this._userInfo);

  async getResourse(url, page = 1) {
    const result = await fetch(
      `${this._domain}${url}?limit=5&offset=${(page - 1) * 5}`
    );

    if (!result.ok) {
      throw new Error(`Возникла ошибка ${result.status}`);
    }
    // eslint-disable-next-line no-return-await
    return await result.json();
  }

  async getPostsData(token, page = 0) {
    let result = [];
    if (token) {
      result = await fetch(
        `${this._domain}${"articles"}?limit=5&offset=${page - 1}`,
        {
          method: "GET",
          headers: {
            "Content-Type": "application/json; charset = utf-8",
            Authorization: `Token ${token}`,
          },
        }
      );

      if (!result.ok) {
        throw new Error(`Возникла ошибка ${result.status}`);
      }
    } else {
      result = await fetch(`${this._domain}${"articles"}?limit=5&offset=${0}`);

      if (!result.ok) {
        throw new Error(`Возникла ошибка ${result.status}`);
      }
    }

    return result.json();
  }

  async getArticle(slug) {
    const result = await this.getResourse(`articles/${slug}`);
    return result;
  }

  async registerUser(data) {
    let result = await fetch(`${this._domain}${"users"}`, {
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
    const result = await fetch(`${this._domain}${"users/login"}`, {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({ user: data }),
    });
    const request = result.json();
    return request;
  }

  async updatedUser(data, token) {
    let result = await fetch(`${this._domain}${"user"}`, {
      method: "PUT",
      headers: {
        "Content-Type": "application/json",
        Authorization: `Token ${token}`,
      },
      body: JSON.stringify({ user: data }),
    });

    if (result.status === 500) {
      result = "error";
      return result;
    }

    return result.json();
  }

  async createArticle(data, token) {
    let result = await fetch(`${this._domain}${"articles"}`, {
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
    const result = await fetch(`${this._domain}${"articles/"}${slug}`, {
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

  async deleteArticle(slug) {
    let result = await fetch(`${this._domain}${"articles/"}${slug}`, {
      method: "DELETE",
      headers: {
        "Content-Type": "application/json",
        Authorization: `Token ${this._info.token}`,
      },
    });

    if (result.status === 204) {
      result = "ok";
      return result;
    }

    return result.json();
  }

  async favoriteArticle(slug) {
    const result = await fetch(`${this._domain}articles/${slug}/favorite`, {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
        Authorization: `Token ${this._info.token}`,
      },
    });
    const request = await result.json();

    return request;
  }

  async unFavoriteArticle(slug) {
    const result = await fetch(`${this._domain}articles/${slug}/favorite`, {
      method: "DELETE",
      headers: {
        "Content-Type": "application/json",
        Authorization: `Token ${this._info.token}`,
      },
    });
    const request = await result.json();
    return request;
  }
}
