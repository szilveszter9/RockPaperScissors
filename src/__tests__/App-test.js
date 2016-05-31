'use runtime-nodent';
jest.disableAutomock();
import App from '../app/App.js';

describe('App', () => {
  let app = new App();

  let appContainer = document.createElement('div');
  appContainer.setAttribute('id', 'app');
  document.body.appendChild(appContainer);

  it('should render', async () => {
    await app.render();
    expect(appContainer.textContent).toContain('testing');
  });
});

describe('Can I play', () => {
  let app = new App();

  let appContainer = document.createElement('div');
  appContainer.setAttribute('id', 'app');
  document.body.appendChild(appContainer);

  it('Player vs Computer?', async () => {
    await app.render();
    expect(false).toBeTruthy();
  });
  it('Computer vs Computer?', async () => {
    await app.render();
    expect(false).toBeTruthy();
  });
  it('a different game each time?', async () => {
    await app.render();
    expect(false).toBeTruthy();
  });
});
