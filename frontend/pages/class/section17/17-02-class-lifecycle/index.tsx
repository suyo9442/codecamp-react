import { Component } from "react";
export default class ClassCounterPage extends Component<any, any> {
  state = {
    count: 0,
  };

  componentDidMount() {
    console.log("렌더링 직후 실행");
  }

  componentDidUpdate() {
    console.log("상태가 변경되면 실행");
  }

  componentWillUnmount() {
    console.log("언마운트 시 실행");
  }

  onCountUp = (): void => {
    this.setState({
      count: this.state.count + 1,
    });
  };

  render(): JSX.Element {
    return (
      <>
        <div>{this.state.count}</div>
        <button onClick={this.onCountUp}>COUNT UP</button>
      </>
    );
  }
}
