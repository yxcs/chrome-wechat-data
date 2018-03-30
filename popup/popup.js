let form = document.querySelector('.config');
// 获取notification权限
if (Notification.permission !== 'granted') {
  Notification.requestPermission();
}
form.addEventListener('submit', function (e) {
  e.preventDefault();
  let str = form.env.value === 'PRODUCTION' ? '运行环境切换到线上环境' :
    '运行环境切换到测试环境'
  new Notification(str);
  chrome.runtime.sendMessage({
    type: 'CHANGE_ENV',
    env: form.env.value
  })
})