const detail = {
  namespaced: true,
  state: {
    err: 'NA',
    app: 'NA',
    status: 'NA',
    pro: 'NA',
    ins: 'NA',
    onlineStatus: '*',
    offlineStatus: '*',
    docs: [],
  },
  mutations: {
    setErr(state, err) {
      state.err = err;
    },
    setApp(state, app) {
      state.app = app;
    },
    setPro(state, pro) {
      state.pro = pro;
    },
    setIns(state, ins) {
      state.ins = ins;
    },
    setDocs(state, docs) {
      state.docs = docs;
    },
    setOnlineStatus(state, status) {
      state.onlineStatus = status;
    },
    setOfflineStatus(state, status) {
      state.offlineStatus = status;
    },
  },
  actions: {
    async setApp({commit, state, rootState}, app) {
      try {
        let res = await uni.$ax.request({
          url: `/task/${app}`,
          method: 'GET',
        });
        let docs = res.data;
        if (docs.length == 0) {
          commit('setErr', '不存在!');
          return;
        }
        let status = 'passed';
        for (let item of docs) {
          if (item.status.name != 'passed') {
            status = 'failed';
          }
        }
        let doc = docs[0];
        let pro = doc.element.project;
        let ins = doc.element.instrument ? doc.element.instrument : '*';
        commit('setApp', app);
        // commit('setStatus', status);
        state.status = status;
        commit('setPro', pro);
        commit('setIns', ins);
        commit('setDocs', docs);
      } catch (e) {
        commit('setErr', e);
      }
    },
  },
  getters: {
    proIns(state) {
      let proIns = [];
      let value = 0;
      for (let [idx, item] of state.docs.entries()) {
        let pro = item.element.project;
        if (
          proIns.find((item, idx) => {
            return item.label && item.label == pro;
          })
        ) {
          continue;
        }
        let children = [];
        let childValue = 0;
        for (let [subIdx, subItem] of state.docs.entries()) {
          if (subItem.element.project !== state.pro) {
            continue;
          }
          let ins = subItem.element.instrument
            ? subItem.element.instrument
            : '*';
          children.push({
            label: ins,
            childValue,
          });
          childValue++;
        }
        proIns.push({
          label: pro,
          value,
          children,
        });
        value++;
      }
      // console.log(proIns);
      return proIns;
    },
    doc(state) {
      function formartCase(cases, status) {
        let data = {};
        function prehandle(module, category) {
          if (!data[module]) {
            data[module] = {};
          }
          if (!data[module][category]) {
            data[module][category] = [];
          }
        }
        for (let [idx, item] of cases.entries()) {
          let module = item.module;
          let category = item.category;
          switch (status) {
            case '*':
              prehandle(module, category);
              data[module][category].push({...item, idx});
              break;
            case 'confirm':
              if (
                item.status1.name == 'failed' &&
                item.status1.doName == 'NA'
              ) {
                prehandle(module, category);
                data[module][category].push({...item, idx});
              }
              break;
            case 'bug':
              if (item.status1.bugs.length > 0) {
                prehandle(module, category);
                data[module][category].push({...item, idx});
              }
              break;
            case 'failed':
              if (item.status1.doName == 'failed') {
                prehandle(module, category);
                data[module][category].push({...item, idx});
              }
              break;
            case 'ongoing':
              if (
                item.status1.assigned &&
                !['passed', 'failed'].includes(item.status1.name)
              ) {
                prehandle(module, category);
                data[item.module][category].push({...item, idx});
              }
              break;
          }
        }
        return data;
      }
      let doc = null;
      for (let [idx, item] of state.docs.entries()) {
        let pro = item.element.project;
        let ins = item.element.instrument ? item.element.instrument : '*';
        if (pro != state.pro || ins != state.ins) {
          continue;
        }
        doc = JSON.parse(JSON.stringify(item));
        doc.idx = idx;
        doc.archive.cases.online = formartCase(
          item.archive.cases.online,
          state.onlineStatus,
        );
        doc.archive.cases.offline = formartCase(
          item.archive.cases.offline,
          state.offlineStatus,
        );
      }
      return doc;
    },
  },
};

export {detail};
