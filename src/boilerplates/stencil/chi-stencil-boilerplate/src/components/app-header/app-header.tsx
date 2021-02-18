import { Component, h } from '@stencil/core';

declare const chi: any;

@Component({
  tag: 'app-header',
  shadow: false,
})
export class AppHeader {
  componentDidLoad() {
    chi.drawer(document.getElementById('drawer-portal-with-navbar'));
    chi.dropdown(
      document.getElementById('button-site-portal-with-navbar')
    );
    chi.dropdown(
      document.getElementById('button-user-portal-with-navbar')
    );
    chi.dropdown(
      document.getElementById('button-eid-portal-with-navbar')
    );
  }
  render() {
    return (
      <div>
        <header class="chi-header -portal -navbar -position--fixed-top">
          <nav class="chi-header__content">
            <div class="chi-header__brand">
              <a class="chi-brand" href="#" aria-label="Lumen">
                <svg
                  viewBox="0 0 145 20"
                  xmlns="http://www.w3.org/2000/svg"
                  aria-hidden="true"
                >
                  <path
                    d="M0 1.4332C0 .61497895.65465263.00138947 1.55466316.00138947c.94108421 0 1.55466316.61358948 1.55466316 1.43181053v14.1059263c0 .4910737.2046421.7364421.7364421.7364421H17.0602316c1.0639368 0 1.6775158.4910737 1.6775158 1.4318105 0 .9821369-.613579 1.4321474-1.6775158 1.4321474H1.67751579C.57286316 19.1395263 0 18.6895263 0 17.7073789V1.4332zm26.4292842 10.5716737c0 5.2775789 2.8639579 4.639021 8.0597474 4.639021 5.1957895 0 8.0597473.7203579 8.0597473-4.6390105V1.43330526c0-.81822105.6135895-1.4321579 1.5546632-1.4321579.9407368 0 1.5546632.61392632 1.5546632 1.4321579V12.2913053c0 6.5868736-4.0914737 7.3390526-11.1690737 7.3390526-7.0779474 0-11.1690737-.752179-11.1690737-7.3390526V1.43329474c0-.81822106.6135895-1.43214737 1.5546632-1.43214737.9410736 0 1.5546631.61391579 1.5546631 1.43214737V12.0048737zm49.5442421-7.21691581h-.1228631l-7.5276106 7.13509471c-.7579894.6447263-1.1114947 1.1864421-1.8003684 1.1864421-.5482316 0-1.0783053-.5194736-1.7589684-1.1864421l-7.5690105-7.17615786h-.163579V17.9531579c0 .8589474-.6135895 1.4318105-1.5546631 1.4318105-.9000106 0-1.5546632-.5728631-1.5546632-1.4318105V2.12864211C53.9218.9422 55.0165368.00111579 55.9264737.00111579c.9102842 0 1.6823158.54822105 2.7003895 1.59572632l7.9368947 7.78974736h.0407263l7.9372316-7.83081052C75.5772526.60853685 76.0488105.00111579 77.1189053.00111579c1.1296421 0 1.9639473.94108421 1.9639473 2.12752632V17.9531474c0 .8589473-.6135789 1.431821-1.5546631 1.431821-.9000106 0-1.5546632-.5728737-1.5546632-1.431821V4.78795789zm11.4553369 3.53818948l13.3373048.0376421c1.104653 0 1.677516.5318 1.677516 1.43181053 0 .9410737-.572863 1.4321474-1.677516 1.4321474H90.5381789v4.3115158c0 .4907368.2046422.7364421.7364422.7364421h13.5419679c1.06359 0 1.636453.4907263 1.636453 1.4318105 0 .9818-.572863 1.4318105-1.636453 1.4318105H89.1063789c-1.1046526 0-1.6775157-.4500105-1.6775157-1.4318105V8.32614737zm48.6445048 9.21771583c0 1.0636-.816863 1.8411052-1.88181 1.8411052-1.055716 0-1.762726-.8117263-2.782179-1.6775158L116.190242 4.62438947V17.9531579c0 .8182316-.613926 1.4318105-1.554663 1.4318105-.900347 0-1.554663-.6135895-1.554663-1.4318105V2.12864211c0-1.39108421.731305-2.12752632 1.840747-2.12752632 1.011242 0 1.600526.66628421 2.659316 1.55466316l15.383053 12.91983155V1.43327368c0-.81822105.613589-1.4321579 1.554663-1.4321579.900021 0 1.554673.61392632 1.554673 1.4321579V17.5438632zm2.167569-14.93333688v-.01413685c0-1.34223158 1.088147-2.47245263 2.458484-2.47245263 1.384842 0 2.458484 1.11607369 2.458484 2.45830527v.01414736c0 1.34223158-1.087789 2.47262106-2.458484 2.47262106-1.384495 0-2.458484-1.11625264-2.458484-2.45848421zm4.6344-.01413685v-.01414736c0-1.20094737-.932537-2.18989474-2.175916-2.18989474-1.229232 0-2.175916 1.00309474-2.175916 2.2040421v.01413685c0 1.20094736.932537 2.19006315 2.175916 2.19006315 1.229242 0 2.175916-1.00325263 2.175916-2.2042zm-3.136748-1.2998h1.130569c.550968 0 .960821.26841053.960821.79126316 0 .40968421-.240463.6639579-.57959.7628l.664127.94668421h-.579253l-.59341-.86181052h-.522674v.86181052h-.48059V1.29658947zm1.088137 1.24338948c.325 0 .508537-.16956842.508537-.40986316 0-.26841053-.183537-.40968421-.508537-.40968421h-.607537v.81954737h.607537z"
                    fill="#000"
                  />
                  <path
                    d="M106.330232 1.71966316c0-.94108421-.572874-1.47287369-1.677516-1.47287369H89.1060842c-1.1043263 0-1.6771789.53178948-1.6771789 1.47287369v1.42565263l17.2648737-.0345579c1.063579-.00001052 1.636453-.49107368 1.636453-1.39109473"
                    fill="#0C9ED9"
                  />
                </svg>
              </a>
            </div>
            <div class="chi-header__start">
              <div class="-d--flex -d-lg--none">
                <button
                  class="chi-button -icon -flat chi-drawer__trigger"
                  id="drawer-portal-with-navbar"
                  data-target="#drawer-1"
                  aria-label="Toggle navigation"
                >
                  <div class="chi-button__content">
                    <i class="chi-icon -sm--2 icon-menu"></i>
                  </div>
                </button>
              </div>
              <div class="chi-dropdown -d--none -d-lg--flex">
                <button
                  class="chi-button -flat chi-dropdown__trigger -text--xl -px--1 -animate"
                  id="button-site-portal-with-navbar"
                >
                  App name
              </button>
                <div class="chi-dropdown__menu -list -w--lg">
                  <a class="chi-dropdown__menu-item -h--auto -active" href="#">
                    <span class="chi-dropdown__menu-item_title">App name</span>
                    <span class="chi-dropdown__menu-item_text"
                    >App description</span
                    >
                  </a>
                  <a class="chi-dropdown__menu-item -h--auto" href="#">
                    <span class="chi-dropdown__menu-item_title">App name 2</span>
                    <span class="chi-dropdown__menu-item_text"
                    >App description</span
                    >
                  </a>
                  <a class="chi-dropdown__menu-item -h--auto" href="#">
                    <span class="chi-dropdown__menu-item_title">App name 3</span>
                    <span class="chi-dropdown__menu-item_text"
                    >App description</span
                    >
                  </a>
                </div>
              </div>
            </div>
            <div class="chi-header__end">
              <div class="-d--none -d-lg--flex">
                <button class="chi-button -flat -icon" aria-label="Notifcations">
                  <div class="chi-button__content">
                    <i class="chi-icon icon-bell-outline" aria-hidden="true"></i>
                    <div class="chi-badge -primary -xs">2</div>
                  </div>
                </button>
                <button class="chi-button -flat -icon" aria-label="Support">
                  <div class="chi-button__content">
                    <i
                      class="chi-icon icon-circle-question-outline"
                      aria-hidden="true"
                    ></i>
                  </div>
                </button>
                <div class="chi-divider -vertical"></div>
                <div class="chi-dropdown -d--none -d-lg--flex">
                  <button
                    class="chi-button -flat chi-dropdown__trigger -px--1 -animate"
                    id="button-user-portal-with-navbar"
                    data-position="bottom-end"
                  >
                    Menu
                </button>
                  <div class="chi-dropdown__menu -w--sm">
                    <a class="chi-dropdown__menu-item" href="#">
                      <i class="chi-icon icon-user"></i>
                      <span>Item 1</span>
                    </a>
                    <a class="chi-dropdown__menu-item" href="#">
                      <i class="chi-icon icon-logout"></i>
                      <span>Item 2</span>
                    </a>
                  </div>
                </div>
                <div class="chi-dropdown -d--none -d-lg--flex">
                  <button
                    class="chi-button -flat chi-dropdown__trigger -px--1 -animate"
                    id="button-eid-portal-with-navbar"
                    data-position="bottom-end"
                  >
                    Menu
                </button>
                  <div class="chi-dropdown__menu -w--sm">
                    <a class="chi-dropdown__menu-item" href="#">
                      <i class="chi-icon icon-user"></i>
                      <span>Item 1</span>
                    </a>
                    <a class="chi-dropdown__menu-item" href="#">
                      <i class="chi-icon icon-logout"></i>
                      <span>Item 2</span></a
                    >
                  </div>
                </div>
              </div>
            </div>
          </nav>
          <nav class="chi-header__navbar">
            <div class="chi-header__start">
              <div class="-d--none -d-lg--flex">
                <ul class="chi-tabs -inverse -xs">
                  <li class="-active"><a href="#">Home</a></li>
                  <li><a href="#">Admin</a></li>
                  <li><a href="#">Inventory</a></li>
                  <li><a href="#">Orders</a></li>
                </ul>
              </div>
            </div>
            <div class="chi-header__end">
              <ul class="chi-header__navbar-menu">
                <li><a href="#" target="_blank">Explore Lumen</a></li>
                <li><a href="#" target="_blank">Help</a></li>
                <li>
                  <a href="#" target="_blank">
                    Contact Us
                  <i class="chi-icon icon-chevron-right -xs"></i>
                  </a>
                </li>
              </ul>
            </div>
          </nav>
        </header>

        <div class="chi-backdrop -closed">
          <div class="chi-backdrop__wrapper">
            <div class="chi-drawer -left -menu -position--absolute" id="drawer-1">
              <div class="chi-drawer__header">
                <button class="chi-button -icon -close" aria-label="Close">
                  <div class="chi-button__content">
                    <i class="chi-icon icon-x"></i>
                  </div>
                </button>
              </div>
              <div class="chi-drawer__content">
                <div class="-px--2 -text">Drawer content here</div>
              </div>
            </div>
          </div>
        </div>
      </div>
    );
  }
}
