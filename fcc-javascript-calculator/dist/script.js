const values = [
{ id: "one", value: 1 },
{ id: "two", value: 2 },
{ id: "three", value: 3 },
{ id: "four", value: 4 },
{ id: "five", value: 5 },
{ id: "six", value: 6 },
{ id: "seven", value: 7 },
{ id: "eight", value: 8 },
{ id: "nine", value: 9 },
{ id: "zero", value: 0 },
{ id: "decimal", value: "." },
{ id: "add", value: "+" },
{ id: "subtract", value: "-" },
{ id: "multiply", value: "*" },
{ id: "divide", value: "/" },
{ id: "equals", value: "=" },
{ id: "clear", value: "clear" }];


const inputDisplay = document.querySelector("#input");
const resultDisplay = document.querySelector("#result");

class Buttons extends React.Component {
  constructor(props) {
    super(props);
    this.myRef = React.createRef();
    this.sendValue = this.sendValue.bind(this);
  }
  sendValue() {
    this.props.parentCallback(this.props.value);
  }
  render() {
    return (
      React.createElement("button", { id: this.props.id, onClick: this.sendValue, ref: this.myRef }, this.props.value));

  }}


class App extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      input: 0 };

    this.callback = this.callback.bind(this);
    this.fixInput = this.fixInput.bind(this);
  }
  callback(childData) {
    if (childData == "clear") {
      this.setState({
        input: 0 });

    } else if (childData == "=") {
      this.setState({
        input: eval(this.state.input) });

    } else {
      let temp = "" + this.state.input + childData;
      this.fixInput(temp);
    }
  }
  fixInput(string) {
    let regex = /^0\d/;
    let test = regex.test(string);
    let regexTwo = /\.[^\+\-\*\/]*(\.)$/;
    let testTwo = regexTwo.test(string);
    let regexThree = /[\+\*\/]{2}|\-[\+\*\/]|[\+\-\*\/]0[^\+\-\*\/\.]|\.[\+\-\*\/]|\-{3}|[\+\*\/]\-{2}/;
    let testThree = regexThree.test(string);
    if (test) {
      this.setState({
        input: string.slice(1) });

      string = string.slice(1);
    }
    if (testTwo) {
      this.setState({
        input: string.slice(0, -1) });

      string = string.slice(0, -1);
    }
    if (testThree) {
      let x = string[string.length - 2];
      this.setState({
        input: string.replace(x, "") });

      string = string.replace(x, "");
      let reTest = regexThree.test(string);
      if (reTest) {
        x = string[string.length - 2];
        this.setState({
          input: string.replace(x, "") });

        string = string.replace(x, "");
      }
    }
    if (!test && !testTwo && !testThree) {
      this.setState({
        input: string });

    }
  }
  render() {
    return (
      React.createElement("div", { id: "calculator" },
      React.createElement("div", { id: "display" }, this.state.input),
      values.map((v) =>
      React.createElement(Buttons, {
        id: v.id,
        value: v.value,
        parentCallback: this.callback }))));



  }}


ReactDOM.render(React.createElement(App, null), document.querySelector("#root"));