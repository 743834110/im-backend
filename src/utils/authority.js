// 使用localStorage去存储权限信息， 在实际项目中它也更可能是由服务器发送而来。
// return localStorage.getItem('antd-pro-authority') || ['admin', 'user'];
// authorityString could be admin, "admin", ["admin"]
export function getAuthority(str) {
  const authorityString =
    typeof str === 'undefined' ? localStorage.getItem('antd-pro-authority') : str;
  console.log('XML', authorityString, str);
  let authority;
  try {
    authority = JSON.parse(authorityString);
  } catch (e) {
    authority = authorityString;
  }
  if (typeof authority === 'string') {
    return [authority];
  }
  return authority || ['admin'];
}

export function setAuthority(authority) {
  const proAuthority = typeof authority === 'string' ? [authority] : authority;
  return localStorage.setItem('antd-pro-authority', JSON.stringify(proAuthority));
}
