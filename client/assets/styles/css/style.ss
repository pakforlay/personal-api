@charset "UTF-8";
/**
    RESET
**/
html, body, div, span, applet, object, iframe,
h1, h2, h3, h4, h5, h6, p, blockquote, pre,
a, abbr, acronym, address, big, cite, code,
del, dfn, em, img, ins, kbd, q, s, samp,
small, strike, strong, sub, sup, tt, var,
b, u, i, center,
dl, dt, dd, ol, ul, li,
fieldset, form, label, legend,
table, caption, tbody, tfoot, thead, tr, th, td,
article, aside, canvas, details, figcaption, figure,
footer, header, hgroup, menu, nav, section, summary,
time, mark, audio, video {
  margin: 0;
  padding: 0;
  border: 0;
  outline: 0;
  font-size: 100%;
  font: inherit;
  vertical-align: baseline;
}

/* HTML5 display-role reset for older browsers */
article, aside, details, figcaption, figure,
footer, header, hgroup, menu, nav, section {
  display: block;
}

body {
  line-height: 1;
}

ol, ul {
  list-style: none;
}

blockquote, q {
  quotes: none;
}

blockquote:before, blockquote:after,
q:before, q:after {
  content: ’’;
  content: none;
}

/* remember to define visible focus styles! 
:focus{
    outline:?????;
} */
/* remember to highlight inserts somehow! */
ins {
  text-decoration: none;
}

del {
  text-decoration: line-through;
}

table {
  border-collapse: collapse;
  border-spacing: 0;
}

a {
  text-decoration: none;
}

.text-highlight {
  color: #007FFF;
}

h1 {
  font-size: 2em;
  margin: 0.67em 0;
  line-height: 2.5em;
}

h2 {
  font-size: 1.5em;
  margin: 0.75em 0;
}

h3 {
  font-size: 1.17em;
  margin: 0.83em 0;
}

h5 {
  font-size: 0.83em;
  margin: 1.5em 0;
}

h6 {
  font-size: 0.75em;
  margin: 1.67em 0;
}

h1.bold, h2.bold, h3.bold, h4.bold, h5.bold, h6.bold {
  font-weight: bolder;
}
h1.capitalize, h2.capitalize, h3.capitalize, h4.capitalize, h5.capitalize, h6.capitalize {
  text-transform: capitalize;
}

html, body {
  font-family: "Nunito", sans-serif;
}

/**
    MAIN
**/
.container-wrap {
  max-width: 1100px;
  margin: 0 auto;
}

.header .container-wrap {
  display: flex;
  flex-wrap: wrap;
  justify-content: space-between;
  align-items: center;
  padding: 50px 0;
}
.header .nav-links {
  display: flex;
  flex-wrap: wrap;
  justify-content: space-between;
}
.header .nav-links.left {
  justify-content: flex-start;
}
.header .nav-links.right {
  justify-content: flex-end;
}
.header .nav-links li a {
  color: #007FFF;
  text-transform: uppercase;
  font-size: 12px;
  letter-spacing: 1px;
  margin: 0 50px;
}
.header .nav-links li a:first-child {
  margin-left: 0;
}
.header .nav-links li a:last-child {
  margin-left: 0;
}

.profile {
  width: 50px;
  height: 100%;
  border-radius: 100px;
}

.hero {
  display: block;
  text-align: center;
  height: 45vh;
  display: flex;
  flex-direction: column;
  flex-wrap: wrap;
  align-items: center;
  justify-content: center;
}

.social-bar {
  margin: 25px 0;
}
.social-bar a {
  margin: 0 10px;
}

/*# sourceMappingURL=style.ss.map */
