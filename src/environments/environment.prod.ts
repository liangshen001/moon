
export function getHttpUrl(uri) {
    return `http://${environment.host}/chat/${uri}`;
}
export function getStompUrl() {
    return `ws://${environment.host}/chat/stomp`;
}
export const environment = {
    production: true,
    dev: false,
    host: 'www.liangshen.sit',
    getHttpUrl,
    getStompUrl
};
