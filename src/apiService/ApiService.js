export default class ApiService {
  _domain = "https://api.realworld.io/api/";

  async getResourse(url, page = 1, t = "") {
    const result = await fetch(
      `${this._domain}${url}?limit=5&offset=${(page - 1) * 5}`,
      {
        method: "GET",
        headers: {
          "Content-Type": "application/json",
          Authorization: `Token ${t}`,
        }
      }
    );

    if (!result.ok) {
      throw new Error(`Возникла ошибка ${result.status}`);
    }
    // eslint-disable-next-line no-return-await
    return await result.json();
  }

  async fetchPatternUser(url, m, t, b) {
    let result = await fetch(`${this._domain}${url}`, {
      method: m,
      headers: {
        "Content-Type": "application/json",
        Authorization: `Token ${t}`,
      },
      body: JSON.stringify({ user: b }),
    });

    if (result.status === 422 || result.status === 500) {
      result = "error";
      return result;
    }

    return result.json();
  }

  async fetchPatternArticle(url, m, t, b) {
    let result = await fetch(`${this._domain}${url}`, {
      method: m,
      headers: {
        "Content-Type": "application/json",
        Authorization: `Token ${t}`,
      },
      body: JSON.stringify({ article: b }),
    });

    if (result.status === 422) {
      result = "error";
      return result;
    }

    if (result.status === 204) {
      result = "ok";
      return result;
    }

    return result.json();
  }

  async getPostsData(page) {
    let result = [];
    if (localStorage.getItem("user")) {
      const marker = JSON.parse(localStorage.getItem("user")).token;
      result = await this.getResourse("articles", page, marker);
    } else {
      result = await this.getResourse("articles");
    }

    return result;
  }

  async getArticle(slug) {
    const result = await this.getResourse(`articles/${slug}`);
    return result;
  }

  async registerUser(data) {
    const result = await this.fetchPatternUser("users", "POST", "", data);
    return result;
  }

  async authenticationUser(data) {
    const result = await this.fetchPatternUser("users/login", "POST", "", data);
    return result;
  }

  async updatedUser(data) {
    const marker = JSON.parse(localStorage.getItem("user")).token;
    const result = await this.fetchPatternUser("user", "PUT", marker, data);
    return result;
  }

  async createArticle(data) {
    const marker = JSON.parse(localStorage.getItem("user")).token;
    const result = await this.fetchPatternArticle(
      "articles",
      "POST",
      marker,
      data
    );
    return result;
  }

  async updatedArticle(data, slug) {
    const marker = JSON.parse(localStorage.getItem("user")).token;
    const result = await this.fetchPatternArticle(
      `${"articles/"}${slug}`,
      "PUT",
      marker,
      data
    );
    return result;
  }

  async deleteArticle(slug) {
    const marker = JSON.parse(localStorage.getItem("user")).token;
    const result = await this.fetchPatternArticle(
      `${"articles/"}${slug}`,
      "DELETE",
      marker,
      ""
    );
    return result;
  }

  async favoriteArticle(slug) {
    const marker = JSON.parse(localStorage.getItem("user")).token;
    const result = await this.fetchPatternArticle(
      `articles/${slug}/favorite`,
      "POST",
      marker,
      ""
    );
    return result;
  }

  async unFavoriteArticle(slug) {
    const marker = JSON.parse(localStorage.getItem("user")).token;
    const result = await this.fetchPatternArticle(
      `articles/${slug}/favorite`,
      "DELETE",
      marker,
      ""
    );
    return result;
  }
}
