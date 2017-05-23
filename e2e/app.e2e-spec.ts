import { FootCampsPage } from './app.po';

describe('foot-camps App', () => {
  let page: FootCampsPage;

  beforeEach(() => {
    page = new FootCampsPage();
  });

  it('should display message saying app works', () => {
    page.navigateTo();
    expect(page.getParagraphText()).toEqual('app works!');
  });
});
