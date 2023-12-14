export default function PlaySound(type: string='click') {
    new Audio(`/src/sounds/${type}.mp3`).play();
}