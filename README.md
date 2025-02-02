# FabiolaDisIntWeb
## Practica 1
- Logo
- Mapa
- Maquetacion
  
## Practica 2
.html
.css

## Practica 3
1. Dispositivos pequeños (similar a móvil).
2. Dispositivos medianos (similar a tablet).
3. Dispositivos grandes (similar a portátil u ordenador de mesa).

## Practica 4

El objetivo de la práctica es crear la “página de inicio” de una empresa. Es decir, la clásica página de inicio con imágenes, sonido, vídeo y animaciones...

La carpeta video tiene archivos no funcionables ya que daba error al subir a Git por el peso.

He usado Streamble para subir los archivos TutorialRamo.mp4 y Tutorial.ogv, los que están en GIT son vacíos.

Link Drive: https://drive.google.com/drive/folders/1pKSGH9C2Uhn5mB_kTJRStuPnCIbJ_-pH?usp=drive_link

Y funcionaría con lo siguiente en HTML
<video class ="transicionVideo" controls width="350">
    <source src="video/TutorialRamo.mp4" type="video/mp4">
    <source src="video/TutorialRamo.ogv" type="video/ogv"> 
    El navegador no soporta el vídeo.
</video>

Pero para que funcione visualmente he utilizado <iframe>
<iframe class="transicionVideo" src="https://streamable.com/e/58nl2n" width="500" height="500" frameborder="0" allowfullscreen></iframe>
