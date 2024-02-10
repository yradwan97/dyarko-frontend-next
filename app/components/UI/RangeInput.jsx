'use client'
import React from "react";
import ReactSlider from "react-slider"
import "./style.css";
import format from "../../utils/utils"

function RangeInput({ value, setValue, activeCategory }) {

  return (
    <>
      <ReactSlider
        className="horizontal-slider"
        thumbClassName="custom-thumb"
        trackClassName="custom-track"
        defaultValue={value}
        onChange={(e) => setValue(e)}
        value={value}
        ariaLabel={['Lower thumb', 'Upper thumb']}
        ariaValuetext={state => `Thumb value ${state.valueNow}`}
        renderThumb={(props, state) => <div {...props}>
          <p className="mt-4 text-center mr-3 pr-3">${state.valueNow}</p>
        </div>}
        pearling
        minDistance={10}
        min={activeCategory === "rent" ? 10 : 200}
        max={activeCategory === "rent" ? 5000 : 1000000}
      />

    </>
  );
}

export default RangeInput;
