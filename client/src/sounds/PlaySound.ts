
export default function PlaySound(name: 'click'|'bubble'|'hit'|'miss'|'head'|'win'|'lose'|'draw') {
    new Audio(`/src/sounds/${name}.mp3`).play();
}