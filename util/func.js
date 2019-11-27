let func = {
  mSleep(ms) {
    return new Promise((resolve, reject) => {
      setTimeout(() => {
        resolve();
      }, ms);
    });
  },
};

uni.$func = func;
