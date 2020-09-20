import React from "react";
import styled from "styled-components";
import { Lock } from "@Icons";
import ErrorMessage from "./ErrorMessage";

const PasswordInput = React.forwardRef((props, ref) => (
  <FormSection>
    <label htmlFor={props.id}>Password</label>
    {props.error && (
      <ErrorMessage htmlFor={props.id} error={props.error.message} />
    )}
    <div className="form-input__container">
      <input
        ref={ref}
        {...props}
        className={props.error && "error"}
        placeholder="Password"
        type="password"
        autoComplete="current-password"
      />
      <Lock />
    </div>
  </FormSection>
));

export default PasswordInput;

const FormSection = styled.div`
  display: flex;
  flex-direction: column;
  width: 100%;

  &:not(:first-child) {
    margin-top: 15px;
  }

  label {
    font-weight: bold;
    font-size: 0.9em;
    margin-bottom: 7px;
    align-self: flex-start;
  }

  .form-input__container {
    width: 100%;
    display: flex;
    flex-direction: row;
    align-items: center;
    position: relative;

    input {
      padding-left: 45px;

      &:focus + svg {
        fill: var(--primary-color);
      }

      &.error:focus + svg {
        fill: red;
      }
    }

    svg {
      position: absolute;
      font-size: 25px;
      left: 10px;
      fill: var(--text-secondary, black);
      transition: fill 0.2s;
    }
  }
`;
