// Contadores
let eyeCount = 0, mouthCount = 0, browCount = 0;

// Estados previos
let prevEyesClosed = false, prevMouthOpen = false, prevBrowsRaised = false;

// Función para calcular distancia entre dos puntos
function distance(a, b) {
  return Math.hypot(a.x - b.x, a.y - b.y);
}

// Función para detectar movimientos
function detectMovements(landmarks) {
  // Parpadeo (párpados)
  const rightEyeDist = distance(landmarks[159], landmarks[145]);
  const leftEyeDist = distance(landmarks[386], landmarks[374]);
  const eyesClosed = rightEyeDist < 0.015 && leftEyeDist < 0.015;
  if (!prevEyesClosed && eyesClosed) eyeCount++;
  prevEyesClosed = eyesClosed;

  // Boca abierta
  const mouthDist = distance(landmarks[13], landmarks[14]);
  const mouthOpen = mouthDist > 0.03;
  if (!prevMouthOpen && mouthOpen) mouthCount++;
  prevMouthOpen = mouthOpen;

  // Escala de la cara: distancia entre las esquinas de los ojos
  const eyeCornerDist = distance(landmarks[33], landmarks[263]);

  // Cejas levantadas: distancia entre cejas y párpados (promedio)
  const rightBrowDist = distance(landmarks[65], landmarks[159]);
  const leftBrowDist = distance(landmarks[295], landmarks[386]);
  const avgBrowDist = (rightBrowDist + leftBrowDist) / 2;

  // Umbral dinámico proporcional a la escala de la cara
  const browThreshold = eyeCornerDist * 0.35; // Ajustar si es necesario

  const browsRaised = avgBrowDist > browThreshold;
  if (!prevBrowsRaised && browsRaised) browCount++;
  prevBrowsRaised = browsRaised;

  // Actualizar en DOM
  document.getElementById("eyeCount").innerText = eyeCount;
  document.getElementById("mouthCount").innerText = mouthCount;
  document.getElementById("browCount").innerText = browCount;
}
