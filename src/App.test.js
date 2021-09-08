import React from "react";
import Enzyme, { shallow, mount } from "enzyme";
import sinon from "sinon";
import { Button, ButtonGroup } from "@material-ui/core";

import Adapter from "@wojtekmaj/enzyme-adapter-react-17";
import App from "./App";

Enzyme.configure({ adapter: new Adapter() });

const findByTestAttr = (wrapper, val) => {
  return wrapper.find(`[data-test="${val}"]`);
};

const mockTabButton = jest.fn();

const initialState = {
  loading: true,
};

test("renders without crashing", () => {
  const wrapper = shallow(<App />);
  const appComponent = findByTestAttr(wrapper, "component-app");
  expect(appComponent.length).toBe(1);
});

test("initial state of App component", () => {
  const wrapper = shallow(<App />);
  const initialLoadingState = wrapper.state("loading");
  const initialJobsState = wrapper.state("jobs");
  const initialValueState = wrapper.state("value");
  expect(initialLoadingState).toBe(true);
  expect(initialJobsState).toEqual([]);
  expect(initialValueState).toBe(0);
});

test("calls componentDidMount", () => {
  const wrapper = shallow(<App />);
  const instance = wrapper.instance();
  jest.spyOn(instance, "fetchJobs");
  instance.componentDidMount();
  expect(instance.fetchJobs).toHaveBeenCalledTimes(1);
});

test("length of tab buttons", () => {
  const wrapper = mount(<App {...initialState} />);
  wrapper.setState({ loading: false });
  expect(wrapper.find("[data-test='btn-container']").children()).toHaveLength(
    2
  );
});

test("length of duties in Card", () => {
  const wrapper = mount(<App {...initialState} />);
  wrapper.setState({ loading: false });
  expect(
    wrapper.find("[data-test='duties-container']").children()
  ).toHaveLength(2);
});
