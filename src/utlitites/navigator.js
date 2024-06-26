export function getMaicAccess() {
    return navigator.mediaDevices.getUserMedia({
        audio: true
    });
}