class Ax extends Object {
  constructor(props) {
    super();
    this.baseURL = props.baseURL;
    this.token = null;
  }

  async login() {
    let [err, res] = await uni.request({
      url: `${this.baseURL}/session`,
      method: 'POST',
      data: {
        name: 'root',
        pwd: '123456780',
      },
    });
    if (err) {
      throw err;
    }
    this.token = res.data.token;
  }

  async request(data) {
    let req = Object.assign(data, {
      url: `${this.baseURL}${data.url}`,
      header: {
        Authorization: `Bearer ${this.token}`,
      },
    });
    let [err, res] = await uni.request(req);
    if (err) {
      throw err;
    }
    return res;
  }
}

uni.$ax = new Ax({
  baseURL: 'http://nats-sh.unisoc.com:30001/app',
});
