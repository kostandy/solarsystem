import 'aframe';

const THREE = require('three');

document.addEventListener('DOMContentLoaded', function () { // Аналог $(document).ready(function(){
  // радиус объекта - в 1000 км
  // масса - в кг

  const day = 24.0 * 60 * 60;
  const dt = day / 3;
  const god = 365 * day;
  const G = 6.67e-11;

  const scene = document.querySelector('a-scene');
  const solar_system = [];

  solar_system.push(document.createElement('a-sphere'));//Солнце
  solar_system[0].dist = 0;
  solar_system[0].setAttribute('radius', '20.510');//нереальный
  solar_system[0].setAttribute('src', '#sun');
  solar_system[0].mass = 1.989e30;

  solar_system.push(document.createElement('a-sphere'));//Меркурий
  solar_system[1].dist = 57.910e9;
  solar_system[1].setAttribute('radius', '2.4397');
  solar_system[1].setAttribute('src', '#mercury');
  solar_system[1].mass = 3.285e23;
  solar_system[1].T = 88 * day;

  solar_system.push(document.createElement('a-sphere'));//Венера
  solar_system[2].dist = 108.2e9;
  solar_system[2].setAttribute('radius', '6.0518');
  solar_system[2].setAttribute('src', '#venus');
  solar_system[2].mass = 4.876e24;
  solar_system[2].T = 224.7 * day;

  solar_system.push(document.createElement('a-sphere'));//Земля
  solar_system[3].dist = 149.6e9;
  solar_system[3].setAttribute('radius', '6.371');
  solar_system[3].setAttribute('src', '#earth');
  solar_system[3].mass = 6e24;
  solar_system[3].T = god;

  solar_system.push(document.createElement('a-sphere'));//Марс
  solar_system[4].dist = 227.9e9;
  solar_system[4].setAttribute('radius', '3.3895');
  solar_system[4].setAttribute('src', '#mars');
  solar_system[4].mass = 6.4e23;
  solar_system[4].T = 687 * day;

  solar_system.push(document.createElement('a-sphere'));//Юпитер
  solar_system[5].dist = 778.5e9;
  solar_system[5].setAttribute('radius', '69.911');
  solar_system[5].setAttribute('src', '#jupiter');
  solar_system[5].mass = 1.9e24;
  solar_system[5].T = 12 * god;

  solar_system.push(document.createElement('a-sphere'));//Сатурн
  solar_system[6].dist = 1434e9;
  solar_system[6].setAttribute('radius', '58.232');
  solar_system[6].setAttribute('src', '#saturn');
  solar_system[6].mass = 5.683e26;
  solar_system[6].T = 29 * god;

  solar_system.push(document.createElement('a-sphere'));//Уран
  solar_system[7].dist = 2871e9;
  solar_system[7].setAttribute('radius', '25.362');
  solar_system[7].setAttribute('src', '#uranus');
  solar_system[7].mass = 8.681e25;
  solar_system[7].T = 84 * god;

  solar_system.push(document.createElement('a-sphere'));//Нептун
  solar_system[8].dist = 4495e9;
  solar_system[8].setAttribute('radius', '24.622');
  solar_system[8].setAttribute('src', '#neptune');
  solar_system[8].mass = 1.024e26;
  solar_system[8].T = 165 * god;

  /*
    solar_system.push(document.createElement('a-sphere'));//Плутон
    solar_system[9].dist = 5906e9;
    solar_system[9].setAttribute('radius', '1.1883');
    solar_system[9].setAttribute('src', '#pluton');
    solar_system[9].mass = 1.303e22;
    solar_system[9].T = 248 * god;
  */

  /*
    solar_system.push(document.createElement('a-sphere'));//Нибиру
    solar_system[5].dist = 200e9;
    solar_system[5].setAttribute('radius', '2');
    solar_system[5].setAttribute('color','brown');
    solar_system[5].mass = 1e28;
    solar_system[5].T = 4*god;
  */

  // создание цикла для членов последовательности
  for (let i = 0; i < solar_system.length; i++) {
    solar_system[i].v = new THREE.Vector3(0, 0, 0);
    solar_system[i].a = new THREE.Vector3(0, 0, 0);
    solar_system[i].pos = new THREE.Vector3(solar_system[i].dist, 0, 0);
    solar_system[i].setAttribute('position', `${String(solar_system[i].pos.x / 1e9)} 0 0`);
    if (i != 0) solar_system[i].v.y = 2 * Math.PI * solar_system[i].dist / solar_system[i].T;
    scene.appendChild(solar_system[i]);
  }
  function render() {
    // создание цикла для членов последовательности
    for (let i = 0; i < solar_system.length; i++) {
      solar_system[i].a.setScalar(0);
      for (let j = 0; j < solar_system.length; j++)
        if (i != j) {
          const rij = new THREE.Vector3(0, 0, 0).subVectors(solar_system[j].pos, solar_system[i].pos);
          const r = rij.length();
          const s = G * solar_system[j].mass / (r ** 3);
          solar_system[i].a.add(rij.multiplyScalar(s));
        }
      const a = solar_system[i].a.clone();
      solar_system[i].v.add(a.multiplyScalar(dt));
      const v = solar_system[i].v.clone();
      solar_system[i].pos.add(v.multiplyScalar(dt));
      solar_system[i].setAttribute('position', `${solar_system[i].pos.x / 1e9} ${solar_system[i].pos.y / 1e9} ${solar_system[i].pos.z / 1e9}`);
    }
    requestAnimationFrame(render);
  }
  render();
});