/**
 * @jest-environment jsdom
 */

describe('moverMetro()', () => {
    beforeEach(() => {
      // Monta um DOM mínimo
      document.body.innerHTML = `
        <div id="Progresso" style="position: relative; width: 200px; height: 20px;">
          <img id="metrozinho" style="position: absolute;" />
        </div>
        <span id="timer"></span>
      `;
  
      // Force offsetWidth
      const progresso = document.getElementById('Progresso');
      const metrozinho = document.getElementById('metrozinho');
      Object.defineProperty(progresso, 'offsetWidth', { value: 200, configurable: true });
      Object.defineProperty(metrozinho, 'offsetWidth', { value: 20, configurable: true });
  
      // Usa timers falsos pra controlar o setInterval
      jest.useFakeTimers();
  
      // Carrega seu código (ajuste o caminho se for outro nome/dir)
      require('./script.js');
    });
  
    afterEach(() => {
      jest.useRealTimers();
      jest.resetModules();
      document.body.innerHTML = '';
    });
  
    test('inicia o timer em 15:00 e metrô fica em 0px após 1s', () => {
      // Simula onload
      window.onload();
      // Avança 1 segundo
      jest.advanceTimersByTime(1000);
  
      const timer = document.getElementById('timer');
      const metro = document.getElementById('metrozinho');
  
      expect(timer.textContent).toBe('15:00');
      expect(metro.style.left).toBe('0px');
    });
  
    test('após 2s mostra 14:59 e move o metrô proporcionalmente', () => {
      window.onload();
      jest.advanceTimersByTime(2000);
  
      const timer = document.getElementById('timer');
      const metro = document.getElementById('metrozinho');
  
      expect(timer.textContent).toBe('14:59');
      // cálculo: (900 − 899) / 900 × (200−20) = 1/900×180 ≈ 0.2px
      expect(parseFloat(metro.style.left)).toBeCloseTo(0.2, 5);
    });
  });
  