const style = `
* {
  font-family:-apple-system,BlinkMacSystemFont,"Segoe UI",Roboto,Helvetica,Arial,sans-serif,"Apple Color Emoji","Segoe UI Emoji","Segoe UI Symbol";
  color: #333;
  margin: 0;
  padding: 0;
  box-sizing: border-box;
}

body {
  background: #F9FCFE;
}

a {
  text-decoration: none;
}

a:hover {
  text-decoration: underline;
}

ul {
  list-style: none;
  padding-left: 0;
}

li {
  margin-bottom: 2rem;
}

body {
  max-width: 40rem;
  margin: auto;
  padding: 1rem;
}

.tab-list {
  display: none;
  position: absolute;
  top: 80px;
  left: 0;
  right: 0;
}

.label {
  background: #f4f7f9;
  border: 1px solid #e5e8ea;
  color: #97a2aa;
  display: block;
  font-size: 1.25rem;
  padding: 10px;
  text-align: center;
}

.radio:checked + .label {
  background: #f9fcfe;
  border-bottom: none;
  color: #396a86;
}

.label__RK {
  border-right: none;
  border-top-left-radius: 5px;
}

.label__GK {
  border-top-right-radius: 5px;
}

input:checked + label + .tab-list {
  display: block;
}

.radio {
  display: none;
}

.news {
  position: relative;
}

.tab {
  width: 50%;
  float: left;
}

.radio-more,
.more-content {
  display: none;
}
.attribution {
  font-size: 1rem;
  margin-bottom: 1rem;
  color: #8c8c8c;
}
footer {
  text-align: center;
}
footer a {
  padding: 1rem;
  display: inline-block;
  color: #3399ff;
}
`;

module.exports = style;
