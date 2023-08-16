import { Link } from "react-router-dom"
export default function HomePage(){
    return(
    <div class="navbar navbar-inverse navbar-fixed-top">
        <button>
            <Link to="/example">To the example</Link>
        </button>
      <div class="navbar-inner">
        <div class="container">
          <button type="button" class="btn btn-navbar" data-toggle="collapse" data-target=".nav-collapse">
            <span class="icon-bar"></span>
            <span class="icon-bar"></span>
            <span class="icon-bar"></span>
          </button>
          <a class="brand" href="./index.html">Bootstrap</a>
          <div class="nav-collapse collapse">
            <ul class="nav">
              <li class="">
                <a href="./index.html">Home</a>
              </li>
              <li class="">
                <a href="./getting-started.html">Get started</a>
              </li>
              <li class="">
                <a href="./scaffolding.html">Scaffolding</a>
              </li>
              <li class="">
                <a href="./base-css.html">Base CSS</a>
              </li>
              <li class="active">
                <a href="./components.html">Components</a>
              </li>
              <li class="">
                <a href="./javascript.html">JavaScript</a>
              </li>
              <li class="">
                <a href="./customize.html">Customize</a>
              </li>
            </ul>
          </div>
        </div>
      </div>
    <header class="jumbotron subhead" id="overview">
        <div class="container">
            <h1>Components</h1>
            <p class="lead">Dozens of reusable components built to provide navigation, alerts, popovers, and more.</p>
        </div>
    </header>
    {/* <div class="row">
      <div class="span3 bs-docs-sidebar">
        <ul class="nav nav-list bs-docs-sidenav">
          <li><a href="#dropdowns"><i class="icon-chevron-right"></i> Dropdowns</a></li>
          <li><a href="#buttonGroups"><i class="icon-chevron-right"></i> Button groups</a></li>
          <li><a href="#buttonDropdowns"><i class="icon-chevron-right"></i> Button dropdowns</a></li>
          <li><a href="#navs"><i class="icon-chevron-right"></i> Navs</a></li>
          <li><a href="#navbar"><i class="icon-chevron-right"></i> Navbar</a></li>
          <li><a href="#breadcrumbs"><i class="icon-chevron-right"></i> Breadcrumbs</a></li>
          <li><a href="#pagination"><i class="icon-chevron-right"></i> Pagination</a></li>
          <li><a href="#labels-badges"><i class="icon-chevron-right"></i> Labels and badges</a></li>
          <li><a href="#typography"><i class="icon-chevron-right"></i> Typography</a></li>
          <li><a href="#thumbnails"><i class="icon-chevron-right"></i> Thumbnails</a></li>
          <li><a href="#alerts"><i class="icon-chevron-right"></i> Alerts</a></li>
          <li><a href="#progress"><i class="icon-chevron-right"></i> Progress bars</a></li>
          <li><a href="#media"><i class="icon-chevron-right"></i> Media object</a></li>
          <li><a href="#misc"><i class="icon-chevron-right"></i> Misc</a></li>
        </ul>
      </div>
    </div> */}
    {/* <pre class="prettyprint linenums">
        &lt;ul class="dropdown-menu" role="menu" aria-labelledby="dropdownMenu"&gt;
        &lt;li&gt;&lt;a tabindex="-1" href="#"&gt;Action&lt;/a&gt;&lt;/li&gt;
        &lt;li&gt;&lt;a tabindex="-1" href="#"&gt;Another action&lt;/a&gt;&lt;/li&gt;
        &lt;li&gt;&lt;a tabindex="-1" href="#"&gt;Something else here&lt;/a&gt;&lt;/li&gt;
        &lt;li class="divider"&gt;&lt;/li&gt;
        &lt;li&gt;&lt;a tabindex="-1" href="#"&gt;Separated link&lt;/a&gt;&lt;/li&gt;
        &lt;/ul&gt;
    </pre> */}
    </div>
    )
}