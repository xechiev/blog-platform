export default class ApiService {
  _domain = "https://conduit-api-realworld.herokuapp.com/api/";

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

  async getArticle(value) {
    const result = await this.getResourse(`articles/${value}`);
    return result;
  }
}
