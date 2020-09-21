import React, { Component } from "react";
import styled from "styled-components";

export default class Slider extends Component {
  constructor(props) {
    super(props);
    this.state = {
      step: props.initialSlide || 0,
    };
  }

  setSlide = (index) => {
    this.setState({ step: index });
  };

  nextSlide = (e) => {
    this.setState({ step: this.state.step + 1 });
  };

  prevSlide = () => {
    this.setState({ step: this.state.step > 0 ? this.state.step - 1 : 0 });
  };

  modifyChild = (child, index) => {
    const className = "slide__content";
    const slider = {
      setSlide: this.setSlide,
      nextSlide: this.nextSlide,
      prevSlide: this.prevSlide,
    };
    const props = {
      className,
      slider,
    };
    return (
      <div
        className="slide"
        style={{ opacity: this.state.step === index ? 1 : 0 }}
      >
        {React.cloneElement(child, props)}
      </div>
    );
  };

  render() {
    return (
      <SliderContainer>
        <div
          className="slides"
          style={{ transform: `translateX(${this.state.step * -100}%)` }}
        >
          {React.Children.map(this.props.children, (child, index) =>
            this.modifyChild(child, index)
          )}
        </div>
        <SlideNav>
          {React.Children.map(this.props.children, (child, index) => (
            <div
              style={{ opacity: this.state.step === index ? 1 : 0.4 }}
              data-index={index + 1}
            />
          ))}
        </SlideNav>
      </SliderContainer>
    );
  }
}

const SliderContainer = styled.div`
  width: 100%;
  display: flex;
  flex-direction: column;
  opacity: 0;
  animation: opacity 0.5s forwards;

  @keyframes opacity {
    from {
      opacity: 0;
    }

    to {
      opacity: 1;
    }
  }

  .slides {
    display: flex;
    flex-direction: row;
    transition: transform 0.5s;

    .slide {
      width: 100%;
      height: 100%;
      flex-shrink: 0;
      display: flex;
      justify-content: center;
      align-items: center;
      transition: opacity 0.5s;

      .slide__content {
        max-width: 350px;
      }
    }
  }
`;

const SlideNav = styled.nav`
  width: 350px;
  align-self: center;
  margin-top: 40px;
  display: flex;
  flex-direction: row;
  align-items: center;

  div {
    flex: 1;
    height: 10px;
    border-radius: 5px;
    background: var(--primary-color);
    transition: 0.4s;
    position: relative;
    cursor: default;

    &::before {
      content: attr(data-index);
      position: absolute;
      margin-top: -7px;
      margin-left: 50%;
      height: 20px;
      width: 20px;
      border-radius: 10px;
      display: flex;
      align-items: center;
      justify-content: center;
      color: white;
      font-weight: bold;
      padding: 2px;

      background: var(--primary-color);
      transform: translateX(-50%);
    }

    &:not(:first-child) {
      margin-left: 10px;
    }
  }
`;
