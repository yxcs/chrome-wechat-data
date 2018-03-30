// 脚本注入用以维持登录状态

if (location.href.indexOf('a.weixin.qq.com/client') !== -1) {
  setInterval(_ => {
    location.reload(true);
  }, 60 * 1000 * 10)
}

chrome.runtime.onMessage.addListener((req, sender, sendRes) => {
  console.log('发起请求')
  console.log(req.type)
  switch (req.type) {
    case 'check-login':
      console.log('判断登录')
      setTimeout(_ => {
        console.log('获取登录框')
        let loginContainer = document.querySelector('#login_container iframe')
        console.log(loginContainer)
        if (loginContainer) {
          chrome.runtime.sendMessage({
            type: 'check-login',
            login: false,
            data: document.querySelector('#login_container iframe').src
          })
        } else {
          chrome.runtime.sendMessage({
            type: 'check-login',
            login: true,
            data: null
          })
        }
      }, 8000)
      break;
    case 'exit-account':
      console.log('退出操作')
      let retry = 0;
      let logoutBtn = null;
      let intervalId = setInterval(_ => {
        logoutBtn = document.querySelector('.mod-header__account-logout');
        if (retry < 100) {
          retry++;
          if (logoutBtn) {
            console.log('获取到按钮')
            clearInterval(intervalId);
            chrome.runtime.sendMessage({
              type: 'exit-account',
              exit: true
            })
            logoutBtn.click();
          }
        } else {
          chrome.runtime.sendMessage({
            type: 'exit-account',
            exit: false
          })
        }
      }, 800)
      break;
    case 'get-cookie':
      chrome.runtime.sendMessage({
        type: 'get-cookie',
        data: document.cookie
      })
      break;
    default:
      break;
  }

})

setTimeout(_ => {
  document.body.click()
}, 15 * 1000)