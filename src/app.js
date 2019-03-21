import fetch from 'dva/fetch';

export const dva = {
  config: {
    onError(err) {
      err.preventDefault();
    },
  },
};

let authRoutes = {};

function ergodicRoutes(routes, authKey, authority) {
  routes.forEach(element => {
    if (element.path === authKey) {
      if (!element.authority) element.authority = []; // eslint-disable-line
      Object.assign(element.authority, authority || []);
    } else if (element.routes) {
      ergodicRoutes(element.routes, authKey, authority);
    }
    return element;
  });
}

/**
 * 可以对传过来的路由进行修改，
 * 从而能够达到动态渲染菜单的效果。
 * @param routes
 */
export function patchRoutes(routes) {

  Object.keys(authRoutes).map((authKey, index, array) =>
    ergodicRoutes(routes, authKey, authRoutes[authKey].authority)
  );
  window.g_routes = routes;
}

/**
 * 从服务器中获取网络链接路由。
 * @param oldRender
 */
export function render(oldRender) {
  fetch('/api/auth_routes')
    .then(res => res.json())
    .then(
      ret => {
        console.log("render......", oldRender);
        authRoutes = ret;
        oldRender(authRoutes);
      },
      () => {
        oldRender();
      }
    );
}
