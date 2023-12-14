
self.addEventListener('push', event => {
    const options = {
        body: 'This notification was generated from a push!',
        icon: '/public/logo-128x128.webp',
    };
    // send the notification:

    // @ts-ignore
    event.waitUntil(self.registration.showNotification('Push Notification', options));
    // to see the notification, you need to click on the notification icon in the address bar:
});