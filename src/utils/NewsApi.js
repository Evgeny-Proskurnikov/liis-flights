export class NewsApi {
  constructor(config) {
    this._url = config.url;
    this._pastDate = config.pastDate;
    this._curDate = config.currentDate;
  }

  getNews(query) {
    return fetch(
      `${this._url}q=${query}&from=${this._pastDate}&to=${this._curDate}
      &pageSize=100&language=ru`,
      {
        method: 'GET',
        headers: {
          'Authorization': `Bearer ${newsApiKey}`,
        }
      }
    )
      .then(res => {
        if (res.ok) {
          return res.json();
        }
        return Promise.reject(`Ошибка: ${res.status}`);
      })
  }
}

const newsRequest = new NewsApi({
  url: 'http://newsapi.org/v2/everything?',
  pastDate: new Date(Date.now() - 7 * 24 * 60 * 60 * 1000).toISOString(),
  currentDate: new Date(Date.now()).toISOString(),
})

const newsApiKey = '2778c8b448474427b69e22b20d7c0ee0'

export default newsRequest;
