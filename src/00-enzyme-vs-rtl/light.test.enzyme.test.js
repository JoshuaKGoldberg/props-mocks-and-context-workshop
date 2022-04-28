import React from "react";
import Enzyme, { mount } from "enzyme";
import Adapter from "@wojtekmaj/enzyme-adapter-react-17";

import { Light } from "./light";

Enzyme.configure({ adapter: new Adapter() });

import "jest-enzyme";

describe(Light, () => {
  it("renders a happy message when happy is true", () => {
    const wrapper = mount(<Light happy />);

    // In theory this assertion would be more appropriate for Enzyme:
    // expect(wrapper).toHaveHTML(<div>I am happy!</div>);
    // ...in practice I can't get Enzyme to work with React 17 anymore. 🤷‍♂️

    expect(wrapper.html()).toEqual("<div>I am happy!</div>");
  });

  it("renders a sad message when happy is false", () => {
    const wrapper = mount(<Light happy={false} />);

    // In theory this assertion would be more appropriate for Enzyme:
    // expect(wrapper).toHaveHTML(<div>I am sad...</div>);
    // ...in practice I can't get Enzyme to work with React 17 anymore. 🤷‍♂️

    expect(wrapper.html()).toEqual("<div>I am sad...</div>");
  });
});
